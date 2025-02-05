import { cn } from '@/lib/utils';
import { MainNav } from './main-nav';

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
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      <main className={cn('flex-1 flex flex-col overflow-auto', containerClassName)}>
        <div className={cn('flex-1 px-4 py-2', className)}>
          <div className={cn('flex-1 container mx-auto', contentClassName)}>{children}</div>
        </div>
      </main>
    </div>
  );
}
