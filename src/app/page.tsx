'use client';

import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentUser } from '@/hooks/use-current-user';
import LayoutSidebar from '@/components/layout-sidebar';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const { data: currentUser, isLoading: userLoading } = useCurrentUser();
  const t = useTranslations('home');

  return (
    <LayoutSidebar>
      <div className="container py-8">
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
      </div>
    </LayoutSidebar>
  );
}
