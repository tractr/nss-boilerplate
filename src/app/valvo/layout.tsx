'use client';

import { LayoutSimple } from '@/components/layout-simple';
import { ReactNode } from 'react';

export default function ValvoLayout({ children }: { children: ReactNode }) {
  return <LayoutSimple>{children}</LayoutSimple>;
}
