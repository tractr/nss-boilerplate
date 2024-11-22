'use client';

import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentUser } from '@/hooks/use-current-user';
import LayoutSidebar from '@/components/layout-sidebar';

export default function HomePage() {
  const { data: currentUser, isLoading: userLoading } = useCurrentUser();

  return (
    <LayoutSidebar>
      <div className="w-full max-w-7xl space-y-6 px-4">
        {/* Header Section with improved spacing */}
        <div className="flex flex-col gap-1">
          <h1 className="relative text-3xl font-bold tracking-tighter sm:text-4xl">
            <span className={userLoading ? 'opacity-0' : 'opacity-100'}>
              Welcome back, {currentUser?.email || 'john.doe@example.com'}
            </span>
            {userLoading && <Skeleton className="absolute inset-0" />}
          </h1>
          <p className="text-muted-foreground">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos atque nisi
            necessitatibus neque voluptates libero aperiam nam repellat quam, ab perferendis cum
            animi repellendus ratione eius dolores et iure rerum!
          </p>
        </div>
      </div>
    </LayoutSidebar>
  );
}
