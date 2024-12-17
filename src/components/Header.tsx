import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
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

        <button className="p-2 hover:bg-gray-100 rounded-full" aria-label="Menu">
          <Menu className="h-8 w-8 text-black" />
        </button>
      </div>
    </header>
  );
};
