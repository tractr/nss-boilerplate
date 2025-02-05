'use client';

import { useCurrentUser } from '@/hooks/use-current-user';
import { useMenus } from '@/hooks/use-menus';
import { cn } from '@/lib/utils';
import supabaseClient from '@/lib/supabase-client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Home, User2, Monitor, LogOut, Utensils, ChevronDown, Plus, Info } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { SettingsModal } from '@/components/settings-modal';
import { useRouter } from 'next/navigation';

const items = [
  {
    titleKey: 'navigation.home',
    url: '/',
    icon: Home,
  },
  {
    titleKey: 'navigation.about',
    url: 'http://afoodi.io/',
    icon: Info,
    external: true,
  },
];

export function MainNav() {
  const currentUser = useCurrentUser();
  const pathname = usePathname();
  const [showSettings, setShowSettings] = useState(false);
  const t = useTranslations();
  const router = useRouter();

  const logout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      alert(error.message);
    }
    window.location.reload();
  };

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:opacity-80 transition-all">
            <Image src="/images/logo.svg" alt={t('common.logo')} width={100} height={40} />
          </Link>
        </div>

        <nav className="flex-1 flex justify-center items-center space-x-8">
          {items.map(item => (
            item.external ? (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary',
                  'text-muted-foreground'
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{t(item.titleKey)}</span>
              </a>
            ) : (
              <Link
                key={item.url}
                href={item.url}
                className={cn(
                  'flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.url ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{t(item.titleKey)}</span>
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/menus/new">
            <Button
              variant="outline"
              size="default"
              asChild
              className="h-[38px] px-3 bg-brand hover:bg-brand/90 text-brand-foreground border-0"
            >
              <div className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>{t('menus.add')}</span>
              </div>
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full"
                size="icon"
              >
                <User2 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowSettings(true)}>
                <Monitor className="mr-2 h-4 w-4" />
                <span>{t('navigation.settings')}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t('navigation.logout')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <SettingsModal open={showSettings} onOpenChange={setShowSettings} />
    </div>
  );
}
