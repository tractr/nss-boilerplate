'use client'

import { useNavigationStore } from '@/store/use-navigation-store'
import { useNavigationShortcut } from '@/hooks/use-navigation-shortcut'
import { MainNav } from './main-nav'
import MainSidebar from './main-sidebar'
import { SidebarProvider } from './ui/sidebar'

export function NavigationWrapper() {
  const isSidebarMode = useNavigationStore((state) => state.isSidebarMode)
  useNavigationShortcut()

  return (
    <>
      {!isSidebarMode && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <MainNav />
        </div>
      )}
      {isSidebarMode && (
        <div className="fixed left-0 top-0 h-screen z-50 hidden md:block">
          <SidebarProvider>
            <MainSidebar />
          </SidebarProvider>
        </div>
      )}
    </>
  )
}
