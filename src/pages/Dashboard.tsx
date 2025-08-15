import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, BookOpen, Award, Menu, Cpu, Activity, Zap, Shield, Globe, Database, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserManagement from "@/components/UserManagement";
import CourseManagement from "@/components/CourseManagement";
import PaymentConfirmations from "@/components/PaymentConfirmations";
import AdminMembers from "@/components/AdminMembers";
import AdminReport from "@/components/AdminReport";
import ProfileSection from "@/components/ProfileSection";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Portfolio from "./Portfolio";
import PatternChart from "./PatternChart";
import Courses from "./Courses";
import Payment from "./Payment";
import ForexBasicsTab from "@/components/ForexBasicsTab";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [userRole, setUserRole] = useState<string>('user');
  const [membershipStatus, setMembershipStatus] = useState<string>('free');
  const [currentTime, setCurrentTime] = useState(new Date());
  
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

  // Update time every second for futuristic clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchUserRole = async () => {
    if (!user) return;
    
    try {
      // ตรวจสอบ role และ membership_status จาก profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('role, membership_status')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching user role:', error);
        return;
      }
      
      if (data?.role) {
        setUserRole(data.role);
      }
      if (data?.membership_status) {
        setMembershipStatus(data.membership_status);
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  const isAdmin = userRole === 'admin';

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

  // Futuristic stat card component
  const FuturisticCard = ({ title, value, subtitle, icon: Icon, color, delay = 0 }: any) => (
    <div>
      <Card className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 border border-cyan-500/30 backdrop-blur-xl overflow-hidden group hover:border-cyan-400/60 transition-all duration-300">
        {/* Animated border glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -skew-x-12" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, 0.05) 25%, rgba(0, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.05) 75%, rgba(0, 255, 255, 0.05) 76%, transparent 77%, transparent),
                             linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, 0.05) 25%, rgba(0, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.05) 75%, rgba(0, 255, 255, 0.05) 76%, transparent 77%, transparent)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <CardContent className="p-6 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-cyan-400 font-mono uppercase tracking-wider mb-1">
                {title}
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {value}
                </p>
                <span className="text-xs text-green-400 font-mono">
                  ●
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">{subtitle}</p>
            </div>
            <div className={`relative w-16 h-16 ${color} rounded-xl flex items-center justify-center`}>
              {/* Animated hexagon background */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 " />
              <Icon className="h-8 w-8 text-cyan-400 relative z-10" />
            </div>
          </div>

          {/* Holographic shine effect */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        </CardContent>
      </Card>
    </div>
  );

  return (
    <SidebarProvider>
      <ParticleBackground />
      <div className="min-h-screen flex w-full relative">
        <AppSidebar 
          userRole={userRole} 
          membershipStatus={membershipStatus}
          activeTab={currentTab}
          onTabChange={handleTabChange}
        />
        
        <main className="flex-1 flex flex-col relative">
          {/* Futuristic header */}
          <header className="h-20 flex items-center border-b border-cyan-500/20 bg-slate-900/50 backdrop-blur-xl relative overflow-hidden">
            {/* Scanline */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/10 to-transparent" />
            
            <div className="flex items-center justify-between w-full px-6 relative z-10">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-cyan-400 hover:text-cyan-300 transition-colors" />
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Stay Ready Dashboard
                  </h1>
                  <p className="text-xs text-cyan-400/60 font-mono">SYSTEM.CONTROL.PANEL.v2.0</p>
                </div>
              </div>
              
              {/* Futuristic clock */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-cyan-400/60 font-mono">SYSTEM.TIME</p>
                  <p className="text-lg font-mono text-cyan-400">
                    {currentTime.toLocaleTimeString('en-US', { hour12: false })}
                  </p>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full" />
              </div>
            </div>
          </header>

          <div className="flex-1 p-6 relative">
            <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
              {/* ซ่อน TabsList เพราะใช้ sidebar แทน */}
              <div className="hidden">
                <TabsList>
                  <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
                </TabsList>
              </div>

            <TabsContent value="overview" className="space-y-8">
              {/* Welcome message */}
              <div className="relative p-6 bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 rounded-xl border border-cyan-500/30 backdrop-blur-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-cyan-400 mb-2">
                    WELCOME TO THE FUTURE
                  </h2>
                  <p className="text-slate-400 font-mono text-sm">
                    <span>
                      INITIALIZING NEURAL INTERFACE... 
                    </span>
                    <span className="text-green-400 ml-2">
                      [CONNECTED]
                    </span>
                  </p>
                </div>
              </div>

              {/* Stats Cards with futuristic design */}
              <div className="grid md:grid-cols-3 gap-6">
                <FuturisticCard
                  title="TOTAL.COURSES"
                  value="0"
                  subtitle="COURSES.ENROLLED"
                  icon={Database}
                  color="bg-gradient-to-br from-blue-600/20 to-cyan-600/20"
                  delay={0.1}
                />
                
                <FuturisticCard
                  title="ACTIVE.LEARNING"
                  value="0"
                  subtitle="IN.PROGRESS"
                  icon={Activity}
                  color="bg-gradient-to-br from-purple-600/20 to-pink-600/20"
                  delay={0.2}
                />
                
                <FuturisticCard
                  title="COMPLETED"
                  value="0"
                  subtitle="MISSIONS.COMPLETE"
                  icon={Shield}
                  color="bg-gradient-to-br from-green-600/20 to-emerald-600/20"
                  delay={0.3}
                />
              </div>

              {/* Neural Network visualization */}
              <div>
                <Card className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 border border-cyan-500/30 backdrop-blur-xl overflow-hidden">
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-cyan-400 flex items-center gap-2">
                          <Cpu className="w-5 h-5" />
                          NEURAL.NETWORK.STATUS
                        </CardTitle>
                        <CardDescription className="text-slate-400 font-mono text-xs mt-1">
                          LEARNING.MATRIX.VISUALIZATION
                        </CardDescription>
                      </div>
                      <div>
                        <Sparkles className="w-6 h-6 text-cyan-400" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-64 flex items-center justify-center">
                      {/* Animated grid background */}
                      <div className="absolute inset-0">
                        <svg className="w-full h-full opacity-20">
                          <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="cyan" strokeWidth="0.5" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                      </div>

                      {/* Central hub */}
                      <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                          <Globe className="w-16 h-16 text-cyan-400" />
                        </div>
                        
                        {/* Elements */}
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="absolute w-4 h-4 bg-cyan-400 rounded-full"
                            style={{
                              top: "50%",
                              left: "50%",
                              transform: `translate(${Math.cos(i * Math.PI / 2) * 60}px, ${Math.sin(i * Math.PI / 2) * 60}px)`,
                            }}
                          />
                        ))}
                      </div>

                      {/* Status text */}
                      <div className="absolute bottom-4 left-4 font-mono text-xs">
                        <p className="text-green-400">SYSTEM.ONLINE</p>
                        <p className="text-cyan-400/60">QUANTUM.CORES: 8/8</p>
                      </div>

                      {/* Action button */}
                      <div className="absolute bottom-4 right-4">
                        <Button 
                          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border border-cyan-400/30 text-cyan-300 font-mono text-xs px-6"
                          onClick={() => navigate('/courses')}
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          INITIALIZE.LEARNING
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

              {isAdmin && (
                <TabsContent value="course-management">
                  <CourseManagement />
                </TabsContent>
              )}

              {isAdmin && (
                <TabsContent value="user-management">
                  <UserManagement />
                </TabsContent>
              )}

              {isAdmin && (
                <TabsContent value="payment-confirmations">
                  <PaymentConfirmations />
                </TabsContent>
              )}

              {isAdmin && (
                <TabsContent value="admin-members">
                  <AdminMembers />
                </TabsContent>
              )}

              {isAdmin && (
                <TabsContent value="admin-report">
                  <AdminReport />
                </TabsContent>
              )}

              <TabsContent value="profile">
                <ProfileSection userRole={userRole} membershipStatus={membershipStatus} />
              </TabsContent>

              <TabsContent value="management">
                <UserManagement />
              </TabsContent>

              <TabsContent value="portfolio">
                <Portfolio />
              </TabsContent>

              <TabsContent value="pattern-chart">
                <PatternChart />
              </TabsContent>

              <TabsContent value="forex-basics">
                <ForexBasicsTab />
              </TabsContent>

              <TabsContent value="courses">
                <Courses />
              </TabsContent>

              <TabsContent value="payment">
                <Payment />
              </TabsContent>

              <TabsContent value="money-management">
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Money Management</h2>
                  <p className="text-muted-foreground">หน้า Money Management กำลังพัฒนา</p>
                </div>
              </TabsContent>

              <TabsContent value="vip">
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-foreground mb-4">VIP Program</h2>
                  <p className="text-muted-foreground">หน้า VIP Program กำลังพัฒนา</p>
                </div>
              </TabsContent>

              <TabsContent value="trading-template">
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Template การวางแผนการเทรด</h2>
                  <p className="text-muted-foreground">หน้า Trading Template กำลังพัฒนา</p>
                </div>
              </TabsContent>

              <TabsContent value="vdo-backtest">
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-foreground mb-4">VDO Backtest</h2>
                  <p className="text-muted-foreground">หน้า VDO Backtest กำลังพัฒนา</p>
                </div>
              </TabsContent>

              <TabsContent value="mindset">
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Mindset</h2>
                  <p className="text-muted-foreground">หน้า Mindset กำลังพัฒนา</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;