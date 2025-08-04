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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 gradient-text">แดชบอร์ด</h1>
            <p className="text-muted-foreground">จัดการการเรียนรู้และระบบของคุณ</p>
          </div>

          {/* Profile Section */}
          <div className="mb-8">
            <Card className="crypto-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-crypto-primary/20 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-crypto-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{user?.email}</h3>
                    <p className="text-muted-foreground">สถานะสมาชิก</p>
                    <Badge variant={userRole === 'admin' ? 'destructive' : userRole === 'instructor' ? 'secondary' : 'outline'} className="mt-2">
                      {userRole === 'admin' ? 'แอดมิน' : userRole === 'instructor' ? 'ผู้สอน' : 'ผู้ใช้ทั่วไป'}
                    </Badge>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {!isAdmin && (
                      <Button
                        onClick={() => navigate('/payment')}
                        className="crypto-button flex items-center gap-2"
                        size="sm"
                      >
                        <CreditCard className="w-4 h-4" />
                        💎 อัพเกรด
                      </Button>
                    )}
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">เข้าร่วมเมื่อ</p>
                      <p className="font-medium">{new Date().toLocaleDateString('th-TH')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue={isAdmin ? "courses" : "overview"} className="w-full">
            <TabsList className={`grid w-full ${isAdmin ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {!isAdmin && (
                <>
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    ภาพรวม
                  </TabsTrigger>
                  <TabsTrigger value="learning" className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    การเรียน
                  </TabsTrigger>
                </>
              )}
              {isAdmin && (
                <TabsTrigger value="courses" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  จัดการคอร์ส
                </TabsTrigger>
              )}
              <TabsTrigger value="management" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                ข้อมูลผู้ใช้
              </TabsTrigger>
            </TabsList>

            {!isAdmin && (
              <TabsContent value="overview" className="space-y-8">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="crypto-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">คอร์สที่เรียนจบ</p>
                          <p className="text-2xl font-bold">3</p>
                        </div>
                        <Award className="h-8 w-8 text-crypto-accent" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="crypto-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">คอร์สที่กำลังเรียน</p>
                          <p className="text-2xl font-bold">2</p>
                        </div>
                        <BookOpen className="h-8 w-8 text-crypto-primary" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="crypto-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">เวลาเรียนรวม</p>
                          <p className="text-2xl font-bold">42 ชม.</p>
                        </div>
                        <Clock className="h-8 w-8 text-crypto-success" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="crypto-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">คะแนนเฉลี่ย</p>
                          <p className="text-2xl font-bold">87%</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-crypto-warning" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            )}

            {!isAdmin && (
              <TabsContent value="learning" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Current Courses */}
                  <Card className="crypto-card">
                    <CardHeader>
                      <CardTitle>คอร์สที่กำลังเรียน</CardTitle>
                      <CardDescription>ความก้าวหน้าคอร์สปัจจุบัน</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Technical Analysis ขั้นสูง</h4>
                          <Badge variant="secondary">65%</Badge>
                        </div>
                        <Progress value={65} className="h-2" />
                        <p className="text-sm text-muted-foreground">บทที่ 8 จาก 12 บท</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Risk Management</h4>
                          <Badge variant="secondary">40%</Badge>
                        </div>
                        <Progress value={40} className="h-2" />
                        <p className="text-sm text-muted-foreground">บทที่ 4 จาก 10 บท</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Achievements */}
                  <Card className="crypto-card">
                    <CardHeader>
                      <CardTitle>ผลงานล่าสุด</CardTitle>
                      <CardDescription>รางวัลและความสำเร็จ</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-4 p-3 bg-crypto-primary/10 rounded-lg">
                        <Award className="h-8 w-8 text-crypto-primary" />
                        <div>
                          <h4 className="font-medium">ผู้เชี่ยวชาญ Candlestick</h4>
                          <p className="text-sm text-muted-foreground">ได้คะแนนเต็มในแบบทดสอบ</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 p-3 bg-crypto-accent/10 rounded-lg">
                        <BookOpen className="h-8 w-8 text-crypto-accent" />
                        <div>
                          <h4 className="font-medium">นักเรียนขยัน</h4>
                          <p className="text-sm text-muted-foreground">เรียนติดต่อกัน 7 วัน</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 p-3 bg-crypto-success/10 rounded-lg">
                        <TrendingUp className="h-8 w-8 text-crypto-success" />
                        <div>
                          <h4 className="font-medium">นักวิเคราะห์มือใหม่</h4>
                          <p className="text-sm text-muted-foreground">จบคอร์สพื้นฐาน</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            )}

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