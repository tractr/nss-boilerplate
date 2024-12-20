'use client';

import { useState, useEffect } from 'react';
import { Menu, Map, Info, User } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Scroll vers le bas
      } else {
        setIsVisible(true); // Scroll vers le haut
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 bg-white z-50 transition-transform duration-300 shadow-sm ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-center md:justify-between">
        <div className="flex items-center">
          <Image
            src="/images/logo-molluscan.png"
            alt="Logo"
            width={120}
            height={40}
            className="w-auto h-10 hover:cursor-pointer"
            onClick={() => router.push('/')}
            loading="eager"
          />
        </div>

        <div className="hidden md:block w-12">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hover:bg-gray-100 rounded-full" aria-label="Menu">
                <Menu className="h-8 w-8 text-black" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/" className="flex items-center gap-2">
                  <Map className="h-4 w-4" />
                  <span>Carte</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="opacity-50 pointer-events-none">
                <Link href="/about" className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  <span>À propos</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="opacity-50 pointer-events-none">
                <Link href="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Profil</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
