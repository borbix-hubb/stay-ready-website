import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, BookOpen, Award, Menu } from "lucide-react";
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

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [userRole, setUserRole] = useState<string>('user');
  const [membershipStatus, setMembershipStatus] = useState<string>('free');
  
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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar 
          userRole={userRole} 
          membershipStatus={membershipStatus}
          activeTab={currentTab}
          onTabChange={handleTabChange}
        />
        
        <main className="flex-1 flex flex-col">
          {/* Header with sidebar trigger */}
          <header className="h-16 flex items-center border-b border bg-card/80 backdrop-blur-sm">
            <div className="flex items-center gap-4 px-6">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground">จัดการการเรียนรู้และระบบของคุณ</p>
              </div>
            </div>
          </header>

          <div className="flex-1 p-6">
            <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
              {/* ซ่อน TabsList เพราะใช้ sidebar แทน */}
              <div className="hidden">
                <TabsList>
                  <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
                </TabsList>
              </div>

            <TabsContent value="overview" className="space-y-8">
              {/* Stats Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-card border backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">คอร์สที่มีทั้งหมด</p>
                        <p className="text-3xl font-bold text-foreground">0</p>
                        <p className="text-xs text-muted-foreground">คอร์สที่เข้าร่วม</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-blue-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">คอร์สที่กำลังเรียน</p>
                        <p className="text-3xl font-bold text-foreground">0</p>
                        <p className="text-xs text-muted-foreground">คอร์สที่กำลังเรียน</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                        <Award className="h-6 w-6 text-purple-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">คอร์สที่เสร็จแล้ว</p>
                        <p className="text-3xl font-bold text-foreground">0</p>
                        <p className="text-xs text-muted-foreground">คอร์สที่เรียนจบแล้ว</p>
                      </div>
                      <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Course Statistics */}
              <Card className="bg-card border backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-foreground">📈 คอร์สสถิติการดูที่เข้าร่วม</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    คอร์สที่คุณเข้าร่วมล่าสุด
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">ยังไม่มีคอร์สที่เข้าร่วม</p>
                    <Button 
                      className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      onClick={() => navigate('/courses')}
                    >
                      เรียนดูคอร์ส
                    </Button>
                  </div>
                </CardContent>
              </Card>
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