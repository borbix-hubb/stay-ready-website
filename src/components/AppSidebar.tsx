import { useState } from "react"
import { 
  BarChart3, 
  BookOpen, 
  Users, 
  CreditCard, 
  User, 
  Settings,
  LogOut,
  Menu,
  Home,
  Star,
  Gift,
  Target,
  Gamepad2,
  Video,
  Briefcase
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/integrations/supabase/client"
import { useEffect } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

interface AppSidebarProps {
  userRole: string;
  membershipStatus: string;
}

export function AppSidebar({ userRole, membershipStatus }: AppSidebarProps) {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const { signOut } = useAuth()
  const isAdmin = userRole === 'admin'
  const isPremium = membershipStatus === 'premium'
  const isCollapsed = state === 'collapsed'

  const handleSignOut = async () => {
    await signOut()
  }

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-muted text-primary font-medium" : "hover:bg-muted/50"

  // เมนูหลัก
  const mainItems = [
    { title: "แดshboard", url: "/dashboard", icon: Home },
    { title: "เครื่องมือ AI ทั้งหมด", url: "/ai-tools", icon: Star },
    { title: "TikTok แฟบริก", url: "/tiktok", icon: Video },
  ]

  // โมเมนต์ (คอร์สเรียน)
  const courseItems = [
    { title: "คอร์สออนไลน์", url: "/courses", icon: BookOpen },
    { title: "คอร์สพิเศษ กอร์ก", url: "/special-courses", icon: Target },
    { title: "นอก โปรแกรมต่าง", url: "/external-programs", icon: Gamepad2 },
    { title: "Custom GPT", url: "/custom-gpt", icon: Briefcase },
    { title: "VIP Program", url: "/vip", icon: Gift },
  ]

  // ระบบบัณฑิตพยาบาล
  const systemItems = [
    { title: "รายรับ-รายจ่าย", url: "/income-expense", icon: BarChart3 },
    { title: "จัดการสินค้า", url: "/manage-products", icon: Settings },
    { title: "จัดการรายคำ", url: "/manage-items", icon: Settings },
    { title: "จัดการสื่อสินค้า", url: "/manage-media", icon: Video },
    { title: "วิพจก", url: "/reports", icon: BarChart3 },
  ]

  // การจัดการบัญชี
  const accountItems = [
    { title: "การชำระเงิน", url: "/payment", icon: CreditCard },
    { title: "โปรไฟล์", url: "/dashboard?tab=profile", icon: User },
    { title: "ค้นค่า", url: "/settings", icon: Settings },
    { title: "ข่าวสารและประกาศ", url: "/news", icon: Settings },
  ]

  return (
    <Sidebar
      className="bg-slate-900 border-slate-700"
      collapsible="icon"
    >
      <SidebarContent className="bg-slate-900">
        {/* Logo */}
        <div className="p-4 border-b border-slate-700">
          {!isCollapsed ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-white font-bold">AI Unlocked</span>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
            </div>
          )}
        </div>

        {/* หน้าหลัก */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400">หน้าหลัก</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span className="text-slate-300">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* โมเมนต์ (คอร์สเรียน) - แสดงเฉพาะสมาชิก */}
        {(isPremium || isAdmin) && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-400">โมเมนต์</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {courseItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="h-4 w-4" />
                        {!isCollapsed && <span className="text-slate-300">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* ระบบบัณฑิตพยาบาล - แสดงเฉพาะ admin */}
        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-400">ระบบบัณฑิตพยาบาล</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {systemItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="h-4 w-4" />
                        {!isCollapsed && <span className="text-slate-300">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* การจัดการบัญชี */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400">การจัดการบัญชี</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span className="text-slate-300">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ออกจากระบบ */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleSignOut} className="text-red-400 hover:bg-red-500/10">
                  <LogOut className="h-4 w-4" />
                  {!isCollapsed && <span>ออกจากระบบ</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}