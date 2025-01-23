'use client';

import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentUser } from '@/hooks/use-current-user';
import LayoutSidebar from '@/components/layout-sidebar';
import { useTranslations } from 'next-intl';
import { useMenus } from '@/hooks/use-menus';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  const { data: currentUser, isLoading: userLoading } = useCurrentUser();
  const { menus, activeMenuId, isLoading: menuLoading } = useMenus();
  const t = useTranslations('home');
  const activeMenu = menus?.find(menu => menu.id === activeMenuId);

  return (
    <LayoutSidebar>
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <h1 className="relative text-3xl font-bold tracking-tighter sm:text-4xl">
              <span className={userLoading ? 'opacity-0' : 'opacity-100'}>
                {t('welcome', {
                  email: currentUser?.email || 'john.doe@example.com',
                })}
              </span>
              {userLoading && <Skeleton className="absolute inset-0" />}
            </h1>
            <p className="text-muted-foreground">{t('description')}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('activeMenu.title')}</CardTitle>
              <CardDescription>{t('activeMenu.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              {menuLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              ) : activeMenu ? (
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      {t('activeMenu.name')}
                    </div>
                    <div className="text-lg font-semibold">{activeMenu.label}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      {t('activeMenu.id')}
                    </div>
                    <div className="font-mono text-sm">{activeMenu.id}</div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{t('activeMenu.noMenu')}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </LayoutSidebar>
  );
}
