'use client';

import { cn } from '@/lib/utils';
import { NavigationWrapper } from './navigation-wrapper';
import { useNavigationStore } from '@/store/use-navigation-store';

export default function LayoutNav({
  children,
  className,
  containerClassName,
  contentClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  contentClassName?: string;
}) {
  const isSidebarMode = useNavigationStore((state) => state.isSidebarMode);

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationWrapper />
      <main className={cn(
        "flex-1 flex flex-col overflow-auto",
        !isSidebarMode && "pt-[64px]",
        isSidebarMode && "pl-[16rem]",
        containerClassName
      )}>
        <div className={cn("flex-1", className)}>
          <div className={cn("flex-1", contentClassName)}>{children}</div>
        </div>
      </main>
    </div>
  );
}
