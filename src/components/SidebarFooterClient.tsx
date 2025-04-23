'use client'
import React, { useEffect, useState } from 'react'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { ChevronUp, User2 } from 'lucide-react'
import SignOut from './SignOut'

function SidebarFooterClient() {
    const [username,setUsername] = useState<string>('')   
    useEffect(()=>{
        if(typeof window !== 'undefined'){
           const email:string | null =  window.localStorage.getItem('email');
           setUsername(email as string);
        }
    },[username])

    console.log(username)

  return (
    <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton>
            <User2 /> {username}
            <ChevronUp className="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          className="w-[--radix-popper-anchor-width]"
        >
          <DropdownMenuItem>
          <SignOut/>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
  )
}

export default SidebarFooterClient