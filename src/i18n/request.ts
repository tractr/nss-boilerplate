import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';
import { cookies } from 'next/headers';
import { LANGUAGE_COOKIE } from '@/lib/cookies';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');
  const defaultLocale = 'en';

  // First check cookie, then accept-language header
  let locale =
    cookieStore.get(LANGUAGE_COOKIE)?.value || acceptLanguage?.split('-')[0] || defaultLocale;

  const localePath = path.join(process.cwd(), `../../messages/${locale}.json`);
  if (
    !(await fs
      .access(localePath)
      .then(() => true)
      .catch(() => false))
  ) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
