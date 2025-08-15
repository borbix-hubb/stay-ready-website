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
  Briefcase,
  Database,
  Activity,
  Shield,
  Cpu,
  Globe,
  Zap,
  Terminal,
  Code2,
  Brain
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

  const handleNavClick = (tab: string) => {
    onTabChange(tab)
  }

  // เมนูหลัก
  const mainItems = [
    { title: "แดชบอร์ด", tab: "overview", icon: Home },
    { title: "พอร์ตโฟลิโอ", tab: "portfolio", icon: Database },
  ]

  // คอร์สเรียนตามระดับ
  const premiumItems = [
    { title: "พื้นฐาน Forex", tab: "forex-basics", icon: Globe },
    { title: "คอร์สเรียน", tab: "courses", icon: BookOpen },
    { title: "Chart Pattern", tab: "pattern-chart", icon: Activity },
    { title: "Money Management", tab: "money-management", icon: Shield },
    { title: "โปรแกรม VIP", tab: "vip", icon: Star },
  ]

  // สำหรับ Admin
  const adminItems = [
    { title: "จัดการคอร์ส", tab: "course-management", icon: BookOpen },
    { title: "จัดการผู้ใช้", tab: "user-management", icon: Users },
    { title: "ระบบชำระเงิน", tab: "payment-confirmations", icon: CreditCard },
    { title: "จัดการสมาชิก", tab: "admin-members", icon: Cpu },
    { title: "รายงานสถิติ", tab: "admin-report", icon: BarChart3 },
  ]

  // BONUS
  const bonusItems = [
    { title: "เทมเพลตเทรด", tab: "trading-template", icon: Code2 },
    { title: "VDO Backtest", tab: "vdo-backtest", icon: Video },
  ]

  // การจัดการบัญชี
  const accountItems = [
    { title: "การชำระเงิน", tab: "payment", icon: CreditCard },
    { title: "โปรไฟล์", tab: "profile", icon: User },
    { title: "Mindset", tab: "mindset", icon: Brain },
  ]

  return (
    <Sidebar
      className="bg-slate-950 border-slate-800"
      collapsible="icon"
    >
      <SidebarContent className="bg-slate-950">
        {/* Logo */}
        <div className="p-4 border-b border-slate-800">
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center border border-blue-400/20">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Stay Ready
                </h1>
                <p className="text-xs text-slate-500">Trading System</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center border border-blue-400/20">
                <span className="text-white font-bold text-lg">S</span>
              </div>
            </div>
          )}
        </div>

        {/* หน้าหลัก */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 px-4">หน้าหลัก</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => handleNavClick(item.tab)}
                    className={`
                      mx-2 rounded-lg transition-colors duration-200
                      ${isActive(item.tab) 
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* คอร์สเรียน - แสดงตามระดับสมาชิก */}
        {(isPremium || isAdmin || true) && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-400 px-4">
              {membershipStatus === 'basic' ? 'Basic Course' : 
               membershipStatus === 'scalping' ? 'Scalping Course' :
               membershipStatus === 'advanced' ? 'Advanced Course' :
               membershipStatus === 'ema' ? 'EMA Course' :
               membershipStatus === 'bundle' ? 'All-in-One Package' :
               'คอร์สเรียน'}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {premiumItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      onClick={() => handleNavClick(item.tab)}
                      className={`
                        mx-2 rounded-lg transition-colors duration-200
                        ${isActive(item.tab) 
                          ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                        }
                      `}
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* สำหรับ Admin */}
        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-400 px-4">ระบบจัดการ</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      onClick={() => handleNavClick(item.tab)}
                      className={`
                        mx-2 rounded-lg transition-colors duration-200
                        ${isActive(item.tab) 
                          ? 'bg-red-600/20 text-red-400 border border-red-500/30' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                        }
                      `}
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* BONUS */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 px-4">BONUS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {bonusItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => handleNavClick(item.tab)}
                    className={`
                      mx-2 rounded-lg transition-colors duration-200
                      ${isActive(item.tab) 
                        ? 'bg-green-600/20 text-green-400 border border-green-500/30' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* การจัดการบัญชี */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 px-4">การจัดการบัญชี</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => handleNavClick(item.tab)}
                    className={`
                      mx-2 rounded-lg transition-colors duration-200
                      ${isActive(item.tab) 
                        ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ออกจากระบบ */}
        <SidebarGroup className="mt-auto border-t border-slate-800">
          <SidebarGroupContent className="pt-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={handleSignOut} 
                  className="mx-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5" />
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