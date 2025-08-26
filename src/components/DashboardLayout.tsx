import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams, useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Home, LogOut, ChevronDown } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [userRole, setUserRole] = useState<string>('user');
  const [membershipStatus, setMembershipStatus] = useState<string>('free');
  const [userProfile, setUserProfile] = useState<any>(null);
  
  // ดึง tab จาก URL parameter
  const currentTab = searchParams.get('tab') || 'overview';

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  useEffect(() => {
    if (user) {
      fetchUserRole();
    }
  }, [user]);

  const fetchUserRole = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role, membership_status, full_name, avatar_url')
        .eq('id', user?.id)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        return;
      }

      if (data) {
        setUserRole(data.role || 'user');
        setMembershipStatus(data.membership_status || 'free');
        setUserProfile(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getUserDisplayName = () => {
    if (userProfile?.full_name) {
      return userProfile.full_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'ผู้ใช้';
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name.charAt(0).toUpperCase();
  };

  // Animated background particles
  const ParticleBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/20 to-pink-950/20" />
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          style={{
            left: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
            top: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
          }}
        />
      ))}
    </div>
  );

  return (
    <SidebarProvider>
      <ParticleBackground />
      <div className="flex min-h-screen w-full bg-slate-950 relative">
        <AppSidebar 
          userRole={userRole} 
          membershipStatus={membershipStatus}
          activeTab={currentTab}
          onTabChange={handleTabChange}
        />
        <main className="flex-1 overflow-auto relative z-10" style={{ width: '100%', maxWidth: '100%', padding: '0', margin: '0' }}>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;