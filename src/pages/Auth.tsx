import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "เกิดข้อผิดพลาด",
            description: error.message === "Invalid login credentials" 
              ? "อีเมลหรือรหัสผ่านไม่ถูกต้อง" 
              : error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "เข้าสู่ระบบสำเร็จ",
            description: "ยินดีต้อนรับกลับมา!",
          });
          navigate("/dashboard");
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes("User already registered")) {
            toast({
              title: "ผู้ใช้นี้มีอยู่แล้ว",
              description: "กรุณาใช้อีเมลอื่น หรือเข้าสู่ระบบ",
              variant: "destructive",
            });
          } else {
            toast({
              title: "เกิดข้อผิดพลาด",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "สมัครสมาชิกสำเร็จ",
            description: "กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี",
          });
          setIsLogin(true);
        }
      }
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="crypto-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl gradient-text">
              {isLogin ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? "เข้าสู่ระบบเพื่อเริ่มเรียนรู้การเทรด Crypto" 
                : "สร้างบัญชีใหม่เพื่อเริ่มต้นการเรียนรู้"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="text-sm font-medium mb-2 block">ชื่อเต็ม</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="text" 
                      placeholder="ชื่อ นามสกุล" 
                      className="pl-10"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium mb-2 block">อีเมล</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="email" 
                    placeholder="email@example.com" 
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">รหัสผ่าน</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••" 
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>จดจำฉัน</span>
                  </label>
                  <Link to="#" className="text-crypto-primary hover:underline">
                    ลืมรหัสผ่าน?
                  </Link>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full crypto-button" 
                disabled={loading}
              >
                {loading ? "กำลังโหลด..." : (isLogin ? "เข้าสู่ระบบ" : "สมัครสมาชิก")}
              </Button>

              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                  หรือ
                </span>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                {isLogin ? "ยังไม่มีบัญชี? " : "มีบัญชีแล้ว? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-crypto-primary hover:underline"
                >
                  {isLogin ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
                </button>
              </p>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground text-sm">
            ← กลับสู่หน้าแรก
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;