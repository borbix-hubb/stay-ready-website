import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, BookOpen, Award, Clock, BarChart3, Users, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import UserManagement from "@/components/UserManagement";
import CourseManagement from "@/components/CourseManagement";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string>('user');

  useEffect(() => {
    if (user) {
      fetchUserRole();
    }
  }, [user]);

  const fetchUserRole = async () => {
    if (!user) return;
    
    try {
      // ตรวจสอบ role จาก profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching user role:', error);
        return;
      }
      
      if (data?.role) {
        setUserRole(data.role);
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  const isAdmin = userRole === 'admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-slate-400">จัดการการเรียนรู้และระบบของคุณ</p>
            </div>
            <Button
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              ออกจากระบบ
            </Button>
          </div>

          {/* Profile Section */}
          <div className="mb-8">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">👋 ข้อมูลผู้ใช้</h3>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-slate-400">ชื่อ-นามสกุล</p>
                        <p className="text-white font-medium">aa ss</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">อีเมล</p>
                        <p className="text-white font-medium">{user?.email || 'a1@a.c'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">แพลตฟอร์ม</p>
                        <p className="text-white font-medium">ไมโครซอฟต์</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">สถานะสมาชิก</p>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-purple-600 hover:bg-purple-700 text-white">
                            👑 ฟรี
                          </Badge>
                          {!isAdmin && (
                            <Button
                              onClick={() => navigate('/payment')}
                              size="sm"
                              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-xs"
                            >
                              💎 อัพเกรด
                            </Button>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">บทบาท</p>
                        <p className="text-white font-medium">ผู้ดูแลระบบ</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue={isAdmin ? "courses" : "overview"} className="w-full">
            <TabsList className="bg-slate-800/50 border-slate-700 mb-8">
              <TabsTrigger 
                value="overview" 
                className="text-slate-300 data-[state=active]:bg-slate-700 data-[state=active]:text-white"
              >
                📊 ภาพรวม
              </TabsTrigger>
               <TabsTrigger 
                 value="courses" 
                 className="text-slate-300 data-[state=active]:bg-slate-700 data-[state=active]:text-white"
               >
                 📚 จัดการคอร์ส
               </TabsTrigger>
              <TabsTrigger 
                value="management" 
                className="text-slate-300 data-[state=active]:bg-slate-700 data-[state=active]:text-white"
              >
                👤 จัดการข้อมูล
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* Stats Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400">คอร์สที่มีทั้งหมด</p>
                        <p className="text-3xl font-bold text-white">0</p>
                        <p className="text-xs text-slate-500">คอร์สที่เข้าร่วม</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-blue-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400">คอร์สที่กำลังเรียน</p>
                        <p className="text-3xl font-bold text-white">0</p>
                        <p className="text-xs text-slate-500">คอร์สที่กำลังเรียน</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                        <Award className="h-6 w-6 text-purple-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400">คอร์สที่เสร็จแล้ว</p>
                        <p className="text-3xl font-bold text-white">0</p>
                        <p className="text-xs text-slate-500">คอร์สที่เรียนจบแล้ว</p>
                      </div>
                      <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Course Statistics */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">📈 คอร์สสถิติการดูที่เข้าร่วม</CardTitle>
                  <CardDescription className="text-slate-400">
                    คอร์สที่คุณเข้าร่วมล่าสุด
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">ยังไม่มีคอร์สที่เข้าร่วม</p>
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
              <TabsContent value="courses">
                <CourseManagement />
              </TabsContent>
            )}

            <TabsContent value="management">
              <UserManagement />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;