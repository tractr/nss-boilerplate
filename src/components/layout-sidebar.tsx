import { cn } from '@/lib/utils';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useCurrentUser } from '@/hooks/use-current-user';
import MainSidebar from './main-sidebar';

export default function LayoutSidebar({
  children,
  className,
  containerClassName,
  contentClassName,
  isOpen,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  contentClassName?: string;
  isOpen?: boolean;
}) {
  const currentUser = useCurrentUser();
  const sidebarOpen = isOpen ?? (currentUser.data?.id || currentUser.isLoading ? undefined : false);

  return (
    <SidebarProvider open={sidebarOpen}>
      <MainSidebar />

      <main className={cn('flex-1 flex flex-col overflow-auto', containerClassName)}>
        {/* {sidebarOpen !== false ? <SidebarTrigger className="mx-3 mt-2" /> : null} */}
        <div className={cn('flex-1 px-4 py-2', className)}>
          <div className={cn('flex-1 container max-w-screen-lg mx-auto', contentClassName)}>
            {children}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
