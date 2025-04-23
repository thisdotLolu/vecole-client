'use client'
import React from 'react'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

function SidebarMenuClient({items}:{items:any}) {
    const pathname = usePathname()
  return (
    <SidebarMenu>
    {items.map((item:any) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton 
        className={clsx("hover:bg-primary hover:text-white text-primary",item.url === pathname ? 'bg-primary text-white':'')}
        asChild>
          <a href={item.url}>
            <item.icon />
            <span>{item.title}</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ))}
  </SidebarMenu>
  )
}

export default SidebarMenuClient