import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, BookOpen, Award, Menu, Cpu, Activity, Zap, Shield, Globe, Database, Sparkles, ChevronRight, User, CheckCircle, Users } from "lucide-react";
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
import MoneyManagementTab from "@/components/MoneyManagementTab";

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
            <div className="flex-1 p-6 relative">
            <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
              {/* ซ่อน TabsList เพราะใช้ sidebar แทน */}
              <div className="hidden">
                <TabsList>
                  <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
                </TabsList>
              </div>

            <TabsContent value="overview" className="space-y-6">
              {/* Welcome Bar */}
              <div className="bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 rounded-xl border border-cyan-500/30 backdrop-blur-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-cyan-400 mb-1">
                      สวัสดี คุณ {user?.email?.split('@')[0] || 'ผู้ใช้'}
                    </h1>
                    <p className="text-slate-400">ยินดีต้อนรับสู่ Stay Ready Dashboard</p>
                  </div>
                  <Button 
                    onClick={() => handleTabChange('profile')}
                    variant="outline" 
                    className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                  >
                    <User className="w-4 h-4 mr-2" />
                    แก้ไขข้อมูล
                  </Button>
                </div>
              </div>

              {/* Progress Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">ความคืบหน้าทั้งหมด</h3>
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">เสร็จแล้ว</span>
                      <span className="text-green-400">65%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">คอร์สที่เรียน</h3>
                    <BookOpen className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-1">3</div>
                    <div className="text-slate-400 text-sm">จาก 5 คอร์ส</div>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">เกียรติบัตร</h3>
                    <Award className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-1">2</div>
                    <div className="text-slate-400 text-sm">ใบประกาศนียบัตร</div>
                  </div>
                </div>
              </div>

              {/* My Courses */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">คอร์สของฉัน</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Course Card 1 */}
                  <div className="bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden group hover:border-cyan-500/50 transition-all">
                    <div className="h-48 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 p-4 flex items-center justify-center">
                      <div className="text-center">
                        <Database className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                        <h3 className="font-bold text-white">พื้นฐาน Forex</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400 text-sm">ความคืบหน้า</span>
                        <span className="text-cyan-400 text-sm">80%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                        <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                      <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                        เข้าเรียนต่อ
                      </Button>
                    </div>
                  </div>

                  {/* Course Card 2 */}
                  <div className="bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden group hover:border-purple-500/50 transition-all">
                    <div className="h-48 bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-4 flex items-center justify-center">
                      <div className="text-center">
                        <Activity className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                        <h3 className="font-bold text-white">Chart Pattern</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400 text-sm">ความคืบหน้า</span>
                        <span className="text-purple-400 text-sm">45%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                        <div className="bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        เข้าเรียนต่อ
                      </Button>
                    </div>
                  </div>

                  {/* Course Card 3 */}
                  <div className="bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden group hover:border-green-500/50 transition-all">
                    <div className="h-48 bg-gradient-to-br from-green-600/20 to-emerald-600/20 p-4 flex items-center justify-center">
                      <div className="text-center">
                        <Shield className="w-12 h-12 text-green-400 mx-auto mb-2" />
                        <h3 className="font-bold text-white">Money Management</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400 text-sm">ความคืบหน้า</span>
                        <span className="text-green-400 text-sm">100%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                        <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full w-full"></div>
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700" disabled>
                        เรียนจบแล้ว ✓
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Lesson / To-do */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-cyan-400" />
                    บทเรียนถัดไป
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-slate-800/50 rounded-lg border border-slate-600">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">4</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">Support & Resistance</h4>
                        <p className="text-slate-400 text-sm">Chart Pattern - บทที่ 4</p>
                      </div>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        เรียนต่อ
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-yellow-400" />
                    รายการที่ต้องทำ
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-slate-800/50 rounded-lg border border-slate-600">
                      <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm">Q</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">Quiz: Forex Basics</h4>
                        <p className="text-slate-400 text-sm">10 คำถาม - เหลือเวลา 3 วัน</p>
                      </div>
                      <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                        ทำ Quiz
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-400" />
                  ความสำเร็จ
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center p-4 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg border border-yellow-500/30">
                    <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mr-4">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">First Step</h4>
                      <p className="text-yellow-400 text-sm">จบคอร์สแรก</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg border border-blue-500/30">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Quick Learner</h4>
                      <p className="text-blue-400 text-sm">เรียนจบใน 7 วัน</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-slate-800/50 rounded-lg border border-slate-600 opacity-50">
                    <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mr-4">
                      <TrendingUp className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-400">Expert Trader</h4>
                      <p className="text-slate-500 text-sm">จบทุกคอร์ส</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Announcements */}
              <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-cyan-400" />
                  ข่าวสารและกิจกรรม
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start p-4 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-lg border border-cyan-500/30">
                    <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">Live Trading Session</h4>
                        <span className="text-cyan-400 text-xs">2 ชม. ที่แล้ว</span>
                      </div>
                      <p className="text-slate-300 text-sm mb-3">เข้าร่วม Live Session ทุกวันพุธ เวลา 20:00 น. เรียนรู้การวิเคราะห์ตลาดแบบ Real-time</p>
                      <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                        เข้าร่วม
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-lg border border-purple-500/30">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">Community Challenge</h4>
                        <span className="text-purple-400 text-xs">1 วัน ที่แล้ว</span>
                      </div>
                      <p className="text-slate-300 text-sm mb-3">ท้าทายความรู้ในกลุ่ม Discord รางวัล 1,000 บาท สำหรับผู้ชนะ</p>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        ดูรายละเอียด
                      </Button>
                    </div>
                  </div>
                </div>
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
                <MoneyManagementTab />
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