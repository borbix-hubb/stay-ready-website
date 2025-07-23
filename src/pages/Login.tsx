import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto">
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">เข้าสู่ระบบ</CardTitle>
                <CardDescription>
                  เข้าสู่ระบบเพื่อเริ่มเรียนรู้การเทรด Crypto
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
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
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>จดจำฉัน</span>
                  </label>
                  <Link to="#" className="text-primary hover:underline">
                    ลืมรหัสผ่าน?
                  </Link>
                </div>

                <Button className="w-full">เข้าสู่ระบบ</Button>

                <div className="relative">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                    หรือ
                  </span>
                </div>

                <Button variant="outline" className="w-full">
                  เข้าสู่ระบบด้วย Google
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  ยังไม่มีบัญชี?{" "}
                  <Link to="/register" className="text-primary hover:underline">
                    สมัครสมาชิก
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

export default Login;