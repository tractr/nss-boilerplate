import { cn } from '@/lib/utils';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useCurrentUser } from '@/hooks/use-current-user';
import MainSidebar from './main-sidebar';

export default function LayoutSidebar({
  children,
  className,
  containerClassName,
  contentClassName,
  isOpen,
  hideTrigger,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  contentClassName?: string;
  isOpen?: boolean;
  hideTrigger?: boolean;
}) {
  const currentUser = useCurrentUser();
  const sidebarOpen = isOpen ?? (currentUser.data || currentUser.isLoading ? undefined : false);

  return (
    <SidebarProvider open={sidebarOpen}>
      <MainSidebar />
      <main className={cn('flex-1 flex flex-col', containerClassName)}>
        {!hideTrigger && sidebarOpen !== false ? <SidebarTrigger className="mx-3 mt-2" /> : null}
        <div className={cn('flex-1 px-4 py-2', className)}>
          <div className={cn('flex-1 container mx-auto', contentClassName)}>{children}</div>
        </div>
      </main>
    </SidebarProvider>
  );
}
