'use client';

import { ReactNode } from 'react';
import { Header } from './Header';
import Link from 'next/link';
import { Map, Info, User, BarChart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
}

export const LayoutSimple = ({ children }: LayoutProps) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16 pb-16 md:pb-0">{children}</main>

      {/* Navigation mobile */}
      <nav className="block md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-inner">
        <div className="flex justify-around items-center h-16">
          <Link
            href="/"
            className={cn(
              'flex flex-col items-center justify-center hover:text-blue-500',
              pathname === '/' ? 'text-blue-500' : 'text-gray-600'
            )}
          >
            <Map className="h-6 w-6" />
            <span className="text-xs mt-1">Carte</span>
          </Link>

          <Link
            href="/a-propos"
            className={cn(
              'flex flex-col items-center justify-center hover:text-blue-500',
              pathname === '/a-propos' ? 'text-blue-500' : 'text-gray-600'
            )}
          >
            <Info className="h-6 w-6" />
            <span className="text-xs mt-1">À propos</span>
          </Link>
          <Link
            href="/statistiques"
            className={cn(
              'flex flex-col items-center justify-center hover:text-blue-500',
              pathname === '/statistiques' ? 'text-blue-500' : 'text-gray-600'
            )}
          >
            <BarChart className="h-6 w-6" />
            <span className="text-xs mt-1">Statistiques</span>
          </Link>
          <Link
            href="/profile"
            className={cn(
              'flex flex-col items-center justify-center hover:text-blue-500',
              pathname === '/profile' ? 'text-blue-500' : 'text-gray-600'
            )}
          >
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};
