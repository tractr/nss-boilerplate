'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Home, User2, ChevronUp, Monitor, LogOut, LucideProps, Utensils, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import supabaseClient from '@/lib/supabase-client';
import { useCurrentUser } from '@/hooks/use-current-user';
import { usePathname } from 'next/navigation';
import { ForwardRefExoticComponent, RefAttributes, useState, useRef } from 'react';
import { SettingsModal } from '@/components/settings-modal';
import { useTranslations } from 'next-intl';
import { useMenus } from '@/hooks/use-menus';

// Menu items
const items: Array<{
  titleKey: string;
  url: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
}> = [
  {
    titleKey: 'navigation.home',
    url: '/',
    icon: Home,
  },
  {
    titleKey: 'navigation.menus',
    url: '/menus',
    icon: Utensils,
  },
];

export default function MainSidebar() {
  const currentUser = useCurrentUser();
  const pathname = usePathname();
  const [showSettings, setShowSettings] = useState(false);
  const t = useTranslations();
  const triggerRef = useRef<HTMLDivElement>(null);
  const { menus, activeMenuId, setActiveMenuId, isLoading } = useMenus();

  const _logout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      alert(error.message);
    }

    window.location.reload();
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex-1 flex items-center justify-center p-4">
          <Image src="/images/logo.svg" alt={t('common.logo')} width={130} height={100} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="px-2 py-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div
                    ref={triggerRef}
                    className="w-full flex flex-col items-start p-3 border rounded-md bg-white hover:bg-accent/50 cursor-pointer"
                  >
                    <div className="text-xs font-medium text-muted-foreground mb-1">
                      {t('menus.activeMenu')}
                    </div>
                    <div className="text-sm">
                      {menus?.find(m => m.id === activeMenuId)?.label ?? t('menus.selectMenu')}
                    </div>
                    <button type="button" className="mt-1 text-xs text-blue-600 hover:underline">
                      {t('menus.changeMenu')}
                    </button>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  style={{ width: triggerRef.current ? triggerRef.current.offsetWidth : undefined }}
                >
                  {isLoading ? (
                    <DropdownMenuItem disabled>{t('common.loading')}</DropdownMenuItem>
                  ) : (
                    <>
                      {menus?.map(menu => (
                        <DropdownMenuItem key={menu.id} onClick={() => setActiveMenuId(menu.id)}>
                          {menu.label}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuItem asChild className="border-t">
                        <Link href="/menus/new" className="flex items-center">
                          <Plus className="w-4 h-4 mr-2" />
                          {t('menus.createMenu')}
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>{t('navigation.mainMenu')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.titleKey}>
                  <SidebarMenuButton asChild className={pathname === item.url ? 'bg-accent' : ''}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{t(item.titleKey)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between gap-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton data-testid="user-button">
                    <User2 />
                    {currentUser?.data?.email ? (
                      <span className="h-6 inline-flex items-center text-sm truncate flex-shrink">
                        {currentUser?.data?.email}
                      </span>
                    ) : (
                      <Skeleton className="h-6 w-full" />
                    )}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                  <DropdownMenuItem onClick={_logout}>
                    <LogOut className="h-[1.2rem] w-[1.2rem]" />
                    <span data-testid="logout-button">{t('actions.logout')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowSettings(true)}>
                    <Monitor className="h-[1.2rem] w-[1.2rem]" />
                    <span>{t('actions.openSettings')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>

          <SettingsModal open={showSettings} onOpenChange={setShowSettings} />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
