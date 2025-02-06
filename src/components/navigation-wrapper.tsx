'use client'

import { useNavigationStore } from '@/store/use-navigation-store'
import { useNavigationShortcut } from '@/hooks/use-navigation-shortcut'
import { MainNav } from './main-nav'
import MainSidebar from './main-sidebar'
import { SidebarProvider, useSidebar } from './ui/sidebar'
import { Button } from './ui/button'
import { Menu, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export function NavigationWrapper() {
  const isSidebarMode = useNavigationStore((state) => state.isSidebarMode)
  useNavigationShortcut()
  const t = useTranslations()

  return (
    <>
      {!isSidebarMode && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <MainNav />
        </div>
      )}
      {isSidebarMode && (
        <>
          {/* Mobile Header */}
          <div className="fixed top-0 left-0 right-0 z-[60] md:hidden bg-white shadow-md">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center space-x-2">
                <SidebarProvider>
                  <MobileHeader />
                </SidebarProvider>
                <Link href="/" className="hover:opacity-80 transition-all">
                  <Image src="/images/logo.svg" alt={t('common.logo')} width={100} height={40} />
                </Link>
              </div>
              <Link href="/menus/new">
                <Button
                  variant="outline"
                  size="default"
                  className="h-9 px-3 bg-brand hover:bg-brand/90 text-brand-foreground border-0"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">{t('menus.add')}</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="fixed left-0 top-0 h-screen z-50 hidden md:block">
            <SidebarProvider>
              <MainSidebar />
            </SidebarProvider>
          </div>

          {/* Mobile Sidebar */}
          <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] z-50 md:hidden">
            <SidebarProvider>
              <MainSidebar />
            </SidebarProvider>
          </div>
        </>
      )}
    </>
  )
}

function MobileHeader() {
  const { setOpenMobile } = useSidebar()

  return (
    <Button variant="ghost" size="icon" onClick={() => setOpenMobile(true)}>
      <Menu className="h-5 w-5" />
    </Button>
  )
}
