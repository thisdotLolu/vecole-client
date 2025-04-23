import { ChevronUp, PersonStandingIcon, Search, Settings, User2 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import SidebarMenuClient from "./SidebarMenu"
import SidebarFooterClient from "./SidebarFooterClient"

const items = [
  {
    title: "Teachers",
    url: "/teachers",
    icon: PersonStandingIcon,
  }
]

export function AppSidebar() {

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel
          className="text-primary"
          >Management</SidebarGroupLabel>
          <SidebarGroupContent>
          <SidebarMenuClient
          items={items}
          />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
         <SidebarFooterClient/>
        </SidebarFooter>
    </Sidebar>
  )
}
