'use client';

import * as React from 'react';
import LayoutSidebar from '@/components/layout-sidebar';
import AppIframe from '@/components/app-iframe';
import Navbar from '@/components/horizontal-navbar';
import { usePathname } from 'next/navigation';

export default function IframePage() {
  const pathname = usePathname();

  return (
    <>
      <Navbar />
      <LayoutSidebar hideTrigger className="p-0 h-fit" contentClassName="h-full w-full min-w-full">
        <AppIframe pathname={pathname} />
      </LayoutSidebar>
    </>
  );
}
