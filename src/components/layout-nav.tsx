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
      <main
        className={cn(
          "flex-1 flex flex-col overflow-auto p-4 md:p-6",
          !isSidebarMode && "pt-[80px] md:pt-[88px]",
          isSidebarMode && "pt-[80px] md:pt-6 md:pl-[17.5rem]",
          containerClassName
        )}
      >
        <div className={cn("flex-1 w-full max-w-7xl mx-auto", className)}>
          <div className={cn("flex-1", contentClassName)}>{children}</div>
        </div>
      </main>
    </div>
  );
}
