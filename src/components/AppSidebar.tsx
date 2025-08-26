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
        {/* Logo - Clickable to Homepage */}
        <div className="p-4 border-b border-slate-800">
          {!isCollapsed ? (
            <div 
              className="flex items-center gap-3 cursor-pointer group transition-all duration-200 hover:bg-slate-800/50 rounded-lg p-2"
              onClick={() => window.location.href = '/'}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center border border-blue-400/20 group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all">
                  Stay Ready
                </h1>
                <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">Trading System</p>
              </div>
            </div>
          ) : (
            <div 
              className="flex justify-center cursor-pointer group transition-all duration-200 hover:bg-slate-800/50 rounded-lg p-2"
              onClick={() => window.location.href = '/'}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center border border-blue-400/20 group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-lg">S</span>
              </div>
            </div>
          )}
        </div>

        {/* หน้าหลัก */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-300 px-4 py-2 text-sm font-semibold tracking-wide uppercase border-b border-slate-800 mb-2">หน้าหลัก</SidebarGroupLabel>
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
            <SidebarGroupLabel className="text-slate-300 px-4 py-2 text-sm font-semibold tracking-wide uppercase border-b border-slate-800 mb-2">
              คอร์สเรียน
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
            <SidebarGroupLabel className="text-slate-300 px-4 py-2 text-sm font-semibold tracking-wide uppercase border-b border-slate-800 mb-2">ระบบจัดการ</SidebarGroupLabel>
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

        {/* เรียนสด & คอมมูนิตี้ */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-300 px-4 py-2 text-sm font-semibold tracking-wide uppercase border-b border-slate-800 mb-2">ชุมชน</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => window.open('https://discord.gg/your-discord-link', '_blank')}
                  className="mx-2 rounded-lg transition-colors duration-200 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  {!isCollapsed && <span>เรียนสด (Discord)</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => window.open('https://line.me/ti/g/your-line-link', '_blank')}
                  className="mx-2 rounded-lg transition-colors duration-200 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.28 2 11.53c0 2.57 1.3 4.91 3.42 6.62c-.18.56-.46 1.47-.57 1.85c-.14.5.18.53.49.36c.38-.21 2.37-1.58 2.99-2c1.03.29 2.13.44 3.27.44c5.52 0 10-4.28 10-9.53S17.52 2 12 2zm-5.5 9.67c0 .21-.17.38-.38.38s-.38-.17-.38-.38V8.33c0-.21.17-.38.38-.38s.38.17.38.38v3.34zm2.75.38c-.21 0-.38-.17-.38-.38V8.33c0-.21.17-.38.38-.38s.38.17.38.38v3.34c0 .21-.17.38-.38.38zm3.35 0c-.15 0-.28-.09-.34-.22l-1.57-3.05v2.89c0 .21-.17.38-.38.38s-.38-.17-.38-.38V8.33c0-.17.11-.31.27-.36c.16-.05.33.02.41.17l1.57 3.05V8.33c0-.21.17-.38.38-.38s.38.17.38.38v3.34c0 .17-.11.31-.27.36c-.02.01-.05.01-.07.01v.01zm3.21-.38H14.5v1.13c0 .21-.17.38-.38.38s-.38-.17-.38-.38V8.33c0-.21.17-.38.38-.38h1.31c.21 0 .38.17.38.38s-.17.38-.38.38H14.5v.87h.87c.21 0 .38.17.38.38s-.17.38-.38.38h-.87v.93h1.31c.21 0 .38.17.38.38s-.17.38-.38.38z"/>
                  </svg>
                  {!isCollapsed && <span>คอมมูนิตี้ (LINE)</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* BONUS */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-300 px-4 py-2 text-sm font-semibold tracking-wide uppercase border-b border-slate-800 mb-2">BONUS</SidebarGroupLabel>
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
          <SidebarGroupLabel className="text-slate-300 px-4 py-2 text-sm font-semibold tracking-wide uppercase border-b border-slate-800 mb-2">การจัดการบัญชี</SidebarGroupLabel>
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