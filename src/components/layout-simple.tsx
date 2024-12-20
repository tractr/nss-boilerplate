import { ReactNode } from 'react';
import { Header } from './Header';
import Link from 'next/link';
import { Map, Info, User } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const LayoutSimple = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16 pb-16">{children}</main>

      {/* Navigation mobile */}
      <nav className="block md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center h-16">
          <Link
            href="/"
            className="flex flex-col items-center justify-center text-gray-600 hover:text-blue-500 "
          >
            <Map className="h-6 w-6" />
            <span className="text-xs mt-1">Carte</span>
          </Link>

          <Link
            href="/about"
            className="flex flex-col items-center justify-center text-gray-600 hover:text-blue-500 pointer-events-none opacity-50"
          >
            <Info className="h-6 w-6" />
            <span className="text-xs mt-1">À propos</span>
          </Link>
          <Link
            href="/profile"
            className="flex flex-col items-center justify-center text-gray-600 hover:text-blue-500 pointer-events-none opacity-50"
          >
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};
