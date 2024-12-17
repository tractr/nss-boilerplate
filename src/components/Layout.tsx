import { ReactNode } from 'react';
import { Header } from './header';

interface LayoutProps {
  children: ReactNode;
}

export const LayoutSimple = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">{children}</main>
    </div>
  );
};
