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
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AppSidebar({ userRole, membershipStatus, activeTab, onTabChange }: AppSidebarProps) {
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

  const isActive = (tab: string) => activeTab === tab
  const getNavCls = (tab: string) =>
    isActive(tab) ? "bg-muted text-primary font-medium" : "hover:bg-muted/50"

  const handleNavClick = (tab: string) => {
    onTabChange(tab)
  }

  // เมนูหลัก
  const mainItems = [
    { title: "แดชบอร์ด", tab: "overview", icon: Home },
    { title: "ผลงาน", tab: "portfolio", icon: Star },
  ]

  // พรีเมี่ยม (คอร์สเรียน)
  const premiumItems = [
    { title: "คอร์สออนไลน์", tab: "courses", icon: BookOpen },
    { title: "Pattern Chart", tab: "pattern-chart", icon: Target },
    { title: "Money Management", tab: "money-management", icon: BarChart3 },
    { title: "VIP Program", tab: "vip", icon: Gift },
  ]

  // สำหรับ Admin
  const adminItems = [
    { title: "จัดการคอร์ส", tab: "course-management", icon: BookOpen },
    { title: "จัดการผู้ใช้", tab: "user-management", icon: Users },
    { title: "รายการแจ้งชำระ", tab: "payment-confirmations", icon: CreditCard },
    { title: "จัดการสมาชิก", tab: "admin-members", icon: Users },
    { title: "รายงานสถิติ", tab: "admin-report", icon: BarChart3 },
  ]

  // BONUS
  const bonusItems = [
    { title: "Template การวางแผนการเทรด", tab: "trading-template", icon: Target },
    { title: "VDO Backtest", tab: "vdo-backtest", icon: Video },
  ]

  // การจัดการบัญชี
  const accountItems = [
    { title: "การชำระเงิน", tab: "payment", icon: CreditCard },
    { title: "โปรไฟล์", tab: "profile", icon: User },
    { title: "Mindset", tab: "mindset", icon: User },
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
              <span className="text-white font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">Stay Ready</span>
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
                  <SidebarMenuButton 
                    onClick={() => handleNavClick(item.tab)}
                    className={getNavCls(item.tab)}
                  >
                    <item.icon className="h-4 w-4" />
                    {!isCollapsed && <span className="text-slate-300">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* พรีเมี่ยม - แสดงเฉพาะสมาชิกพรีเมี่ยม */}
        {(isPremium || isAdmin) && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-400">พรีเมี่ยม</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {premiumItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      onClick={() => handleNavClick(item.tab)}
                      className={getNavCls(item.tab)}
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span className="text-slate-300">{item.title}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Admin - แสดงเฉพาะผู้ดูแลระบบ */}
        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-400">จัดการระบบ</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      onClick={() => handleNavClick(item.tab)}
                      className={getNavCls(item.tab)}
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span className="text-slate-300">{item.title}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* BONUS */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400">BONUS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {bonusItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => handleNavClick(item.tab)}
                    className={getNavCls(item.tab)}
                  >
                    <item.icon className="h-4 w-4" />
                    {!isCollapsed && <span className="text-slate-300">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* การจัดการบัญชี */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400">การจัดการบัญชี</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => handleNavClick(item.tab)}
                    className={getNavCls(item.tab)}
                  >
                    <item.icon className="h-4 w-4" />
                    {!isCollapsed && <span className="text-slate-300">{item.title}</span>}
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