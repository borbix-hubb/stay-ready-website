import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, BookOpen, Award, Clock } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">แดชบอร์ด</h1>
            <p className="text-muted-foreground">ติดตามความก้าวหน้าการเรียนรู้ของคุณ</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">คอร์สที่เรียนจบ</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <Award className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-accent/10 to-accent/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">คอร์สที่กำลังเรียน</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500/10 to-green-500/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">เวลาเรียนรวม</p>
                    <p className="text-2xl font-bold">42 ชม.</p>
                  </div>
                  <Clock className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500/10 to-orange-500/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">คะแนนเฉลี่ย</p>
                    <p className="text-2xl font-bold">87%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Current Courses */}
            <Card>
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
            <Card>
              <CardHeader>
                <CardTitle>ผลงานล่าสุด</CardTitle>
                <CardDescription>รางวัลและความสำเร็จ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-primary/5 rounded-lg">
                  <Award className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-medium">ผู้เชี่ยวชาญ Candlestick</h4>
                    <p className="text-sm text-muted-foreground">ได้คะแนนเต็มในแบบทดสอบ</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-accent/5 rounded-lg">
                  <BookOpen className="h-8 w-8 text-accent" />
                  <div>
                    <h4 className="font-medium">นักเรียนขยัน</h4>
                    <p className="text-sm text-muted-foreground">เรียนติดต่อกัน 7 วัน</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-green-500/5 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-green-500" />
                  <div>
                    <h4 className="font-medium">นักวิเคราะห์มือใหม่</h4>
                    <p className="text-sm text-muted-foreground">จบคอร์สพื้นฐาน</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;