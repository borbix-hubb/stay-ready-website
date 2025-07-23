import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Mail, Lock, User, Eye } from "lucide-react";

const Register = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto">
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">สมัครสมาชิก</CardTitle>
                <CardDescription>
                  สร้างบัญชีเพื่อเริ่มต้นการเรียนรู้
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">ชื่อ</label>
                      <Input placeholder="ชื่อของคุณ" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">นามสกุล</label>
                      <Input placeholder="นามสกุล" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">ชื่อผู้ใช้</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="username" 
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">อีเมล</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="email" 
                        placeholder="email@example.com" 
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">รหัสผ่าน</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        className="pl-10 pr-10"
                      />
                      <Eye className="absolute right-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">ยืนยันรหัสผ่าน</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        className="pl-10 pr-10"
                      />
                      <Eye className="absolute right-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer" />
                    </div>
                  </div>
                </div>

                <div className="text-sm">
                  <label className="flex items-start space-x-2">
                    <input type="checkbox" className="rounded mt-1" />
                    <span className="text-muted-foreground">
                      ฉันยอมรับ{" "}
                      <Link to="#" className="text-primary hover:underline">
                        ข้อกำหนดการใช้งาน
                      </Link>{" "}
                      และ{" "}
                      <Link to="#" className="text-primary hover:underline">
                        นโยบายความเป็นส่วนตัว
                      </Link>
                    </span>
                  </label>
                </div>

                <Button className="w-full">สมัครสมาชิก</Button>

                <div className="relative">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                    หรือ
                  </span>
                </div>

                <Button variant="outline" className="w-full">
                  สมัครด้วย Google
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  มีบัญชีอยู่แล้ว?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    เข้าสู่ระบบ
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;