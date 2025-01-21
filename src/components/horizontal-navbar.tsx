import {
  FileText,
  ChevronDown,
  Plus,
  Search,
  Home,
  ArrowUpDown,
  User,
  LayoutDashboard,
  WandSparkles,
  Users,
  CheckSquare,
  Calendar,
  DollarSign,
} from 'lucide-react';
import Link from 'next/link';
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

const menuItems = [
  { value: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { value: 'extractor', label: 'Extractor', icon: WandSparkles },
  { value: 'drive', label: 'Drive', icon: FileText },
  { value: 'contacts', label: 'Contacts', icon: Users },
  { value: 'todos', label: 'Todos', icon: CheckSquare },
  { value: 'calendar', label: 'Calendar', icon: Calendar },
  { value: 'finance', label: 'Finance', icon: DollarSign },
];

const Navbar = () => {
  return (
    <div className="sticky z-10 top-0 w-full">
      <nav className="bg-white">
        <div className="px-8 h-16 flex items-center">
          <Link href="/" className="flex-shrink-0 flex items-center space-x-2 mr-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_1-pp43oODXmZFKxLifCO5k7464LyAlSW.svg"
              alt="Edwix Logo"
              className="h-8 w-auto"
              width={32}
              height={32}
            />
          </Link>

          <div className="w-48">
            <Select defaultValue="drive">
              <SelectTrigger className="w-[180px] justify-start rounded-full">
                <SelectValue placeholder="Drive" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Links</SelectLabel>
                  {menuItems.map(item => (
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
          <div className="flex-grow"></div>
          <div className="flex items-center space-x-4">
            <button className="bg-[#2CAACE] text-black border-2 border-black rounded-full font-semibold justify-center filter drop-shadow-[-4px_4px_0px_rgba(0,0,0,1)] text-sm py-1 px-3 h-8 flex items-center">
              <span
                className="bg-black rounded-full p-1 mr-2 flex items-center justify-center"
                style={{ width: '20px', height: '20px' }}
              >
                <Plus className="h-3 w-3 text-white" />
              </span>
              Add...
            </button>
            <button className="inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent h-10 w-10 text-black hover:text-gray-700">
              <Search className="h-5 w-5" />
            </button>
            <Select>
              <SelectTrigger className="rounded-full w-[150px]">
                <Home className="mr-2 h-4 w-4" />
                <SelectValue placeholder="LaKaz" />
              </SelectTrigger>
              <SelectContent>
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
            <button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground relative h-8 w-8 rounded-full p-1">
              <User className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
