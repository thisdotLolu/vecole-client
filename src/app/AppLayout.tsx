'use client'
import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

function AppLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const isAuthPage = pathname === '/signin' || pathname === '/signup';
    return (
        <SidebarProvider
        >
            {!isAuthPage && (
                <>
                    <AppSidebar />
                    <SidebarTrigger />
                </>
            )}
            {children}
            <Toaster
                position="top-right"
                richColors
            />
        </SidebarProvider>
    )
}

export default AppLayout