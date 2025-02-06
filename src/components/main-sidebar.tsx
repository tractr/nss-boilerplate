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
import { LayoutDashboard, User2, ChevronUp, Monitor, LogOut, LucideProps, Info, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import supabaseClient from '@/lib/supabase-client';
import { useCurrentUser } from '@/hooks/use-current-user';
import { usePathname } from 'next/navigation';
import { ForwardRefExoticComponent, RefAttributes, useState } from 'react';
import { SettingsModal } from '@/components/settings-modal';
import { useTranslations } from 'next-intl';

// Menu items
const items: Array<{
  titleKey: string;
  url: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  external?: boolean;
}> = [
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

export default function MainSidebar() {
  const currentUser = useCurrentUser();
  const pathname = usePathname();
  const [showSettings, setShowSettings] = useState(false);
  const t = useTranslations();

  const _logout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      alert(error.message);
    }
    window.location.reload();
  };

  return (
    <Sidebar className="bg-background shadow-md">
      <SidebarHeader>
        <div className="flex-1 flex items-center justify-center p-4">
          <Image src="/images/logo.svg" alt={t('common.logo')} width={130} height={100} />
        </div>
        <div className="px-4 pb-4">
          <Link href="/menus/new" className="w-full">
            <Button
              variant="outline"
              size="default"
              className="w-full bg-brand hover:bg-brand/90 text-brand-foreground border-0"
            >
              <Plus className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">{t('menus.add')}</span>
            </Button>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('navigation.mainMenu')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.titleKey}>
                  <SidebarMenuButton
                    asChild
                    className={!item.external && pathname === item.url ? 'bg-accent' : ''}
                  >
                    <Link
                      href={item.url}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                    >
                      <item.icon className="h-[1.2rem] w-[1.2rem]" />
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
