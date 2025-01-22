import {
  FileText,
  Plus,
  Search,
  Home,
  User,
  LayoutDashboard,
  Wand2,
  Users,
  CheckSquare,
  Calendar,
  DollarSign,
  Bell,
  LogOut,
  Link as LinkIcon,
  Mail,
  CreditCard,
  HelpCircle,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTheme } from 'next-themes';

interface MenuItem {
  value: string;
  label: string;
  icon: React.ElementType;
  href?: string;
}

interface UserMenuItem {
  profile: {
    name: string;
    email: string;
  };
  mainItems: MenuItem[];
  settingsItems: MenuItem[];
  supportItems: MenuItem[];
}

const LogoSection = () => {
  return (
    <Link href="/" className="flex-shrink-0 flex items-center space-x-2 mr-4">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_1-pp43oODXmZFKxLifCO5k7464LyAlSW.svg"
        alt="Edwix Logo"
        className="h-8 w-auto"
        width={32}
        height={32}
      />
    </Link>
  );
};

const MainMenuSelect = ({
  theme,
  menuItems,
}: {
  theme: string | undefined;
  menuItems: MenuItem[];
}) => {
  return (
    <div className="w-48">
      <Select defaultValue="drive">
        <SelectTrigger
          className={`w-[180px]  justify-start rounded-full ${
            theme === 'dark' ? 'bg-gray-800 text-white' : ''
          }`}
        >
          <SelectValue placeholder="Drive" />
        </SelectTrigger>

        <SelectContent className={theme === 'dark' ? 'bg-gray-800 text-white' : ''}>
          <SelectGroup>
            <SelectLabel>Links</SelectLabel>
            {menuItems.map((item: MenuItem) => (
              <SelectItem key={item.value} value={item.value}>
                <div className="flex items-center">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

const AddButton = () => {
  return (
    <button className="bg-[#2CAACE] text-black border-2 border-black rounded-full font-semibold justify-center filter drop-shadow-[-4px_4px_0px_rgba(0,0,0,1)] text-sm py-1 px-3 h-8 flex items-center">
      <span
        className="bg-black rounded-full p-1 mr-2 flex items-center justify-center"
        style={{ width: '20px', height: '20px' }}
      >
        <Plus className="h-3 w-3 text-white" />
      </span>
      Add...
    </button>
  );
};

const SearchButton = ({ theme }: { theme: string | undefined }) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent h-10 w-10 ${
        theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'
      }`}
    >
      <Search className="h-5 w-5" />
    </button>
  );
};

const PropertySelect = ({ theme }: { theme: string | undefined }) => {
  return (
    <Select>
      <SelectTrigger
        className={`rounded-full  w-[150px] ${theme === 'dark' ? 'bg-gray-800 text-white' : ''}`}
      >
        <Home className="mr-2 h-4 w-4" />
        <SelectValue placeholder="LaKaz" />
      </SelectTrigger>
      <SelectContent className={theme === 'dark' ? 'bg-gray-800 text-white' : ''}>
        <SelectGroup>
          <SelectLabel>Properties</SelectLabel>
          <SelectItem value="lakaz">LaKaz</SelectItem>
          <SelectItem value="office">Office</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Personal</SelectLabel>
          <SelectItem value="home">Home</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectItem value="new">Add New Property</SelectItem>
      </SelectContent>
    </Select>
  );
};
const NotificationsSelect = ({ theme }: { theme: string | undefined }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex border shadow-none border-gray-200 items-center justify-center text-sm font-medium w-10 relative rounded-full p-1 ${
          theme === 'dark' ? 'bg-gray-800' : ''
        }`}
      >
        <Bell
          className={`h boder-none shadow-none w-5 ${
            theme === 'dark' ? 'text-white' : 'text-gray-700'
          }`}
        />
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center rounded-full bg-red-500 text-xs text-white font-medium bg-red ring-red dark:ring-gray-800">
          2
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className={`w-72 ${theme === 'dark' ? 'bg-gray-800 text-white' : ''}`}>
        <div className="px-2 py-1.5">
          <h4 className="text-sm font-semibold">New Notifications</h4>
        </div>
        <DropdownMenuItem>
          <div className="flex items-center">
            <Bell className="mr-2 h-4 w-4 text-red-500" />
            <div>
              <p className="text-sm">New message from John</p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                2 minutes ago
              </p>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center">
            <Bell className="mr-2 h-4 w-4 text-red-500" />
            <div>
              <p className="text-sm">Document shared by Sarah</p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                1 hour ago
              </p>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5">
          <h4 className="text-sm font-semibold">Read</h4>
        </div>
        <DropdownMenuItem>
          <div className="flex items-center">
            <Bell className="mr-2 h-4 w-4 text-gray-400" />
            <div>
              <p className="text-sm">Task completed</p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Yesterday
              </p>
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const UserMenuSelect = ({
  theme,
  userMenuItems,
}: {
  theme: string | undefined;
  userMenuItems: UserMenuItem;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`rounded-full w-[40px] p-0 border-0 ${theme === 'dark' ? 'bg-gray-800' : ''}`}
      >
        <User className={`h-5 w-5 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`w-56 ${theme === 'dark' ? 'bg-gray-800 text-white' : ''}`}>
        <div className="px-2 py-1.5 text-sm font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userMenuItems.profile.name}</p>
            <p
              className={`text-xs leading-none ${
                theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'
              }`}
            >
              {userMenuItems.profile.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator className="-mx-1 my-1 h-px bg-gray-200" />
        {userMenuItems.mainItems.map((item: MenuItem) => (
          <DropdownMenuItem key={item.value} asChild>
            <Link href={item.href || ''} className="flex items-center">
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="-mx-1 my-1 h-px bg-gray-200" />
        {userMenuItems.settingsItems.map((item: MenuItem) => (
          <DropdownMenuItem key={item.value} asChild>
            <Link href={item.href || ''} className="flex items-center">
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="-mx-1 my-1 h-px bg-gray-200" />
        {userMenuItems.supportItems.map((item: MenuItem) => (
          <DropdownMenuItem key={item.value} asChild>
            <Link href={item.href || ''} className="flex items-center">
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="-mx-1 my-1 h-px bg-gray-200" />
        <DropdownMenuItem>
          <div className="flex items-center">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Navbar = () => {
  const menuItems = [
    { value: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { value: 'extractor', label: 'Extractor', icon: Wand2 },
    { value: 'drive', label: 'Drive', icon: FileText },
    { value: 'contacts', label: 'Contacts', icon: Users },
    { value: 'todos', label: 'Todos', icon: CheckSquare },
    { value: 'calendar', label: 'Calendar', icon: Calendar },
    { value: 'finance', label: 'Finance', icon: DollarSign },
  ];

  const userMenuItems = {
    profile: {
      name: 'Olivier',
      email: 'olivier@example.com',
    },
    mainItems: [
      { value: 'connectors', label: 'Connectors', icon: LinkIcon, href: '/connectors' },
      { value: 'goemail', label: 'GoEmail', icon: Mail, href: '/goemail' },
      { value: 'properties', label: 'Properties', icon: Home, href: '/properties' },
    ],
    settingsItems: [
      { value: 'profile', label: 'Profile', icon: User, href: '/parameters/profile' },
      { value: 'billing', label: 'Billing', icon: CreditCard, href: '/billing' },
    ],
    supportItems: [
      { value: 'support', label: 'Support', icon: HelpCircle, href: '/support' },
      { value: 'feedback', label: 'Feedback', icon: MessageSquare, href: '/feedback' },
    ],
  };

  const { theme } = useTheme();
  console.log(theme);
  return (
    <div className="  z-50 top-0 w-full sticky">
      <nav className={`bg-background w-full`}>
        <div className="px-8 h-16 flex items-center">
          <LogoSection />
          {/* <MainMenuSelect theme={theme} menuItems={menuItems} /> */}

          <div className="flex-grow"></div>
          <div className="flex items-center space-x-4">
            <AddButton />
            <SearchButton theme={theme} />
            <PropertySelect theme={theme} />
            <NotificationsSelect theme={theme} />
            <UserMenuSelect theme={theme} userMenuItems={userMenuItems} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
