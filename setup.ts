import { spawn } from 'child_process';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import { SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import readline from 'readline';

interface SupabaseConfig {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  SUPABASE_DB_URL: string;
}
async function verifyTypeGeneration(): Promise<boolean> {
  const TYPE_FILE_PATH = 'src/types/database.ts';
  const migrationsDir = 'supabase/migrations/';

  try {
    // Find the latest schema file
    const files = await fs.readdir(migrationsDir);
    const sqlFiles = files.filter(file => file.endsWith('.sql'));
    if (sqlFiles.length === 0) {
      console.log('No schema files found in migrations directory.');
      return false;
    }

    let latestFile = '';
    let latestMtime = 0;
    for (const file of sqlFiles) {
      const filePath = `${migrationsDir}${file}`;
      const stats = await fs.stat(filePath);
      if (stats.mtimeMs > latestMtime) {
        latestMtime = stats.mtimeMs;
        latestFile = filePath;
      }
    }

    if (!latestFile) {
      console.log('No valid schema file found.');
      return false;
    }

    // Check if the types file exists
    await fs.access(TYPE_FILE_PATH);

    // Get stats for the types file
    const typeStats = await fs.stat(TYPE_FILE_PATH);
    if (typeStats.size === 0) {
      console.log('Types file is empty. Regenerating types...');
      return false;
    }
    const schemaStats = await fs.stat(latestFile);
    if (schemaStats.mtime > typeStats.mtime) {
      console.log('Schema has been updated. Regenerating types...');
      return false;
    }
    console.log('✓ Database types are up to date.');
    return true;
  } catch (error: unknown) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      console.log('Types file or schema file not found. Generating types...');
    } else {
      console.error('Error verifying type generation:', error);
    }
    return false;
  }
}

async function generateTypes(): Promise<void> {
  console.log('Generating database types...');
  const typegen = spawn('npx', ['supabase', 'gen', 'types', 'typescript', '--local']);

  return new Promise<void>((resolve, reject) => {
    let output = '';

    typegen.stdout.on('data', (data: Buffer) => {
      output += data.toString();
    });

    typegen.on('close', async (code: number) => {
      if (code === 0) {
        await fs.writeFile('src/types/database.ts', output);
        console.log('✓ Database types generated successfully');
        resolve();
      } else {
        console.error('Failed to generate database types');
        reject();
      }
    });
  });
}
async function createPublicBucket(client: SupabaseClient) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const createBucket = await new Promise<string>(resolve => {
    rl.question(
      'Would you like to create a new storage bucket in your Supabase project? (y/n): ',
      resolve
    );
  });

  if (createBucket.toLowerCase() === 'y') {
    const bucketName = await new Promise<string>(resolve => {
      rl.question('Please enter a name for your new bucket: ', resolve);
    });

    const isPublic = await new Promise<string>(resolve => {
      rl.question('Would you like this bucket to be publicly accessible? (y/n): ', resolve);
    });

    const { data: bucketData } = await client.storage.getBucket(bucketName);
    if (!bucketData) {
      const { error: createError } = await client.storage.createBucket(bucketName, {
        public: isPublic.toLowerCase() === 'y',
      });
      if (createError) {
        console.error('Error creating bucket:', createError);
      } else {
        console.log(`✓ Great! The storage bucket "${bucketName}" has been created successfully.`);
      }
    } else {
      console.log(`⚠ It looks like the bucket "${bucketName}" already exists. No changes made.`);
    }
  } else {
    console.log('No problem! We will skip bucket creation.');
    rl.close();
  }
  rl.close();
}
async function promptUser(): Promise<{ email: string; password: string }> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const email = await new Promise<string>(resolve => {
    rl.question('Please enter an email address for your initial admin user: ', answer => {
      resolve(answer.trim());
    });
  });
  if (!email) {
    console.log('Email cannot be empty. Please try again.');
    rl.close();
    return await promptUser();
  }

  const password = await new Promise<string>(resolve => {
    rl.question('Please enter a password for your initial admin user: ', answer => {
      resolve(answer.trim());
    });
  });
  if (!password) {
    console.log('Password cannot be empty. Please try again.');
    rl.close();
    return await promptUser();
  }

  rl.close();
  return { email, password };
}

async function createInitialUser(client: SupabaseClient) {
  // Check if any users exist
  const { data: existingUsers, error: usersError } = await client.auth.admin.listUsers();

  if (usersError) {
    console.error('Error checking for existing users:', usersError);
    return;
  }
  if (!existingUsers.users || existingUsers.users.length === 0) {
    const { email, password } = await promptUser();

    const { data, error } = await client.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto verify the email
    });

    if (error) {
      console.error('Error creating user:', error);
    } else {
      console.log(`✓ Admin user created successfully: ${data.user.email} `);
    }
  } else {
    console.log('✓ We found existing users in your project. Skipping admin user creation.');
  }
}

async function logSetupSummary(config: SupabaseConfig) {
  const client = new SupabaseClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);
  const { data: userData } = await client.auth.admin.listUsers();

  console.log('\n=== Supabase Setup Summary ===');
  console.log(`Supabase URL: ${config.SUPABASE_URL} `);
  console.log(`Anon Key: ${config.SUPABASE_ANON_KEY ? '✔️ Set' : '❌ Not Set'} `);
  console.log(`Service Role Key: ${config.SUPABASE_SERVICE_ROLE_KEY ? '✔️ Set' : '❌ Not Set'} `);
  console.log(`Database URL: ${config.SUPABASE_DB_URL} `);
  console.log('Active User:', userData?.users[0]?.email || 'You currently have no active user.');
  console.log('==============================\n');
}

// Load existing env vars if .env exists
if (existsSync('.env')) {
  console.log('Loading existing Supabase configuration...');
  dotenv.config();
  const client = new SupabaseClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  console.log('✓ Loaded environment variables from .env');

  await createInitialUser(client);
  await createPublicBucket(client);
  const env = process.env as unknown as SupabaseConfig;
  const status = await verifyTypeGeneration();
  console.log('✓ Type generation status:', status ? 'completed' : 'stale');
  if (status == false) {
    await generateTypes();
  }

  await logSetupSummary(env);

  console.log('Setup complete.');
  process.exit(0);
}

// No .env file, start Supabase and create one
console.log('Starting new Supabase project...');
const supabaseStart = spawn('npx', ['supabase', 'start']);

supabaseStart.stdout.on('data', async data => {
  const output: string = data.toString();
  console.log(output); // Display real-time output from Supabase start

  const config: SupabaseConfig = {
    SUPABASE_URL: '',
    SUPABASE_ANON_KEY: '',
    SUPABASE_SERVICE_ROLE_KEY: '',
    SUPABASE_DB_URL: '',
  };

  const lines = output.split('\n');
  for (const line of lines) {
    if (line.includes('API URL:')) {
      config.SUPABASE_URL = line.replace('API URL: ', '').trim();
      console.log(`Parsed SUPABASE_URL: ${config.SUPABASE_URL} `);
    }
    if (line.includes('anon key:')) {
      config.SUPABASE_ANON_KEY = line.replace('anon key: ', '').trim();
      console.log('Parsed SUPABASE_ANON_KEY');
    }
    if (line.includes('service_role key:')) {
      config.SUPABASE_SERVICE_ROLE_KEY = line.replace('service_role key: ', '').trim();
      console.log('Parsed SUPABASE_SERVICE_ROLE_KEY');
    }
    if (line.includes('DB URL:')) {
      config.SUPABASE_DB_URL = line.replace('DB URL: ', '').trim();
      console.log(`Parsed SUPABASE_DB_URL: ${config.SUPABASE_DB_URL} `);
    }
  }
  let env = `SUPABASE_URL = ${config.SUPABASE_URL}
             SUPABASE_ANON_KEY = ${config.SUPABASE_ANON_KEY}
             SUPABASE_SERVICE_ROLE_KEY = ${config.SUPABASE_SERVICE_ROLE_KEY}
             SUPABASE_DB_URL = ${config.SUPABASE_DB_URL} `;
  env = env.replace(/^\s+/gm, '');
  await fs.writeFile('.env', env);
  console.log('✓ Environment variables written to .env');
  const client = new SupabaseClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);
  console.log('✓ Supabase client initialized');
  await createPublicBucket(client);
  await createInitialUser(client);
  const status = await verifyTypeGeneration();
  console.log('✓ Type generation status:', status);
  if (status == false) {
    await generateTypes();
  }

  await logSetupSummary(config);
  console.log('✓ Supabase project setup complete.');
});
