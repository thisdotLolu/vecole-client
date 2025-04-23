'use client'
import React, { useEffect, useState } from 'react'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

function SidebarMenuClient({ items }: { items: any }) {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = window.localStorage.getItem('role');
      setRole(storedRole);
  
      if (storedRole === 'admin') {
        setFilteredItems(items.filter((item: any) => item.title === 'Teachers'));
      } else if (storedRole === 'teacher') {
        setFilteredItems(items.filter((item: any) =>
          ['Students', 'Classes'].includes(item.title)
        ));
      } else {
        setFilteredItems([]);
      }
    }
  }, [items]);
  

  return (
    <SidebarMenu>
      {filteredItems.map((item: any) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            className={clsx(
              'hover:bg-primary hover:text-white text-primary',
              item.url === pathname ? 'bg-primary text-white' : ''
            )}
            asChild
          >
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
