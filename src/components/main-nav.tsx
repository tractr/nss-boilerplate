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
import { LayoutDashboard, User2, Monitor, LogOut, Utensils, ChevronDown, Plus, Info } from 'lucide-react';
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
    icon: LayoutDashboard,
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
    <div className="shadow-md bg-white">
      <div className="flex h-16 items-center mx-auto px-6">
        {/* Logo */}
        <Link href="/" className="hover:opacity-80 transition-all mr-8">
          <Image src="/images/logo.svg" alt={t('common.logo')} width={100} height={40} />
        </Link>

        {/* Espace flexible */}
        <div className="flex-1" />

        {/* Menu Principal, Profil et CTA */}
        <nav className="flex items-center space-x-4">
          {items.map(item => (
            item.external ? (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center space-x-2 px-3 h-9 text-sm font-medium transition-colors hover:text-primary rounded-md',
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
                  'flex items-center space-x-2 px-3 h-9 text-sm font-medium transition-colors hover:text-primary rounded-md',
                  pathname === item.url ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{t(item.titleKey)}</span>
              </Link>
            )
          ))}

          {/* Menu Profil */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 h-9 px-3 text-sm font-medium text-muted-foreground hover:text-primary"
              >
                <User2 className="h-4 w-4" />
                <span>{t('navigation.profile')}</span>
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

          {/* CTA Nouveau Menu */}
          <Link href="/menus/new">
            <Button
              variant="outline"
              size="default"
              asChild
              className="h-9 px-3 bg-brand hover:bg-brand/90 text-brand-foreground border-0"
            >
              <div className="flex items-center space-x-1">
                <Plus className="h-4 w-4" />
                <span className="text-sm font-medium">{t('menus.add')}</span>
              </div>
            </Button>
          </Link>
        </nav>
      </div>
      <SettingsModal open={showSettings} onOpenChange={setShowSettings} />
    </div>
  );
}
