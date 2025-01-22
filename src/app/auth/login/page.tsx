'use client';

import * as React from 'react';
import LayoutSidebar from '@/components/layout-sidebar';
import AppIframe from '@/components/app-iframe';

export default function IframePage() {
  return (
    <>
      <LayoutSidebar hideTrigger className="p-0 h-full" contentClassName="h-full w-full min-w-full">
        <AppIframe pathname="/en/login" />
      </LayoutSidebar>
    </>
  );
}
