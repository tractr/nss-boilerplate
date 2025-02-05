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
import { Home, User2, Monitor, LogOut, Utensils, ChevronDown, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { SettingsModal } from '@/components/settings-modal';
import { useRouter } from 'next/navigation';

const items = [
  {
    titleKey: 'navigation.menus',
    url: '/',
    icon: Utensils,
  },
];

export function MainNav() {
  const currentUser = useCurrentUser();
  const pathname = usePathname();
  const [showSettings, setShowSettings] = useState(false);
  const t = useTranslations();
  const triggerRef = useRef<HTMLDivElement>(null);
  const { menus, activeMenuId, setActiveMenuId, isLoading } = useMenus();
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
          <Image src="/images/logo.svg" alt={t('common.logo')} width={100} height={40} />
          <nav className="flex items-center space-x-4">
            {items.map(item => (
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
            ))}
          </nav>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <div className="w-[200px]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  ref={triggerRef}
                  className="flex items-center space-x-2 rounded-md border bg-white px-3 py-2 hover:bg-accent/50 cursor-pointer"
                >
                  <span className="text-sm">
                    {menus?.find(m => m.id === activeMenuId)?.label ?? t('menus.selectMenu')}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                {isLoading ? (
                  <DropdownMenuItem disabled>{t('common.loading')}</DropdownMenuItem>
                ) : (
                  menus?.map(menu => (
                    <DropdownMenuItem
                      key={menu.id}
                      onClick={() => {
                        setActiveMenuId(menu.id);
                        router.push(`/menu/${menu.id}`);
                      }}
                      className="cursor-pointer"
                    >
                      {menu.label}
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button asChild size="sm">
            <Link href="/menus/new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {t('menus.createMenu')}
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
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
