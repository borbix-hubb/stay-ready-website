import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Payment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 599,
      period: "เดือน",
      description: "เหมาะสำหรับผู้เริ่มต้น",
      popular: false,
      features: [
        "เข้าถึงคอร์สพื้นฐาน 10 คอร์ส",
        "วิดีโอคุณภาพ HD",
        "ใบประกาศนียบัตร",
        "รองรับ 1 อุปกรณ์"
      ]
    },
    {
      id: "premium",
      name: "Premium",
      price: 999,
      period: "เดือน",
      description: "ตัวเลือกที่ได้รับความนิยมมากที่สุด",
      popular: true,
      features: [
        "เข้าถึงคอร์สทั้งหมด",
        "วิดีโอคุณภาพ 4K",
        "ใบประกาศนียบัตร",
        "เครื่องมือเทรดขั้นสูง",
        "การสนับสนุน 24/7",
        "รองรับ 3 อุปกรณ์"
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 1999,
      period: "เดือน",
      description: "สำหรับผู้ใช้ระดับมืออาชีพ",
      popular: false,
      features: [
        "เข้าถึงคอร์สทั้งหมด + Exclusive",
        "วิดีโอคุณภาพ 4K",
        "ใบประกาศนียบัตร Premium",
        "เครื่องมือเทรดขั้นสูงทั้งหมด",
        "การปรึกษา 1-on-1",
        "การสนับสนุน VIP",
        "รองรับไม่จำกัดอุปกรณ์"
      ]
    }
  ];

  const handleSubscribe = async (planId: string, planName: string, price: number) => {
    if (!user) {
      toast({
        title: "กรุณาเข้าสู่ระบบ",
        description: "คุณต้องเข้าสู่ระบบก่อนทำการสมัครสมาชิก",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      // จำลองการประมวลผลการชำระเงิน
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "การสมัครสมาชิกสำเร็จ!",
        description: `คุณได้สมัครแพ็ค ${planName} เรียบร้อยแล้ว`,
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถดำเนินการได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            กลับ
          </Button>
          <div>
            <h1 className="text-3xl font-bold">💳 เลือกแพ็คเกจของคุณ</h1>
            <p className="text-muted-foreground">อัพเกรดเพื่อเข้าถึงเนื้อหาพิเศษและคุณสมบัติขั้นสูง</p>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                plan.popular 
                  ? 'border-primary shadow-lg scale-105 bg-gradient-to-br from-primary/5 to-primary/10' 
                  : 'hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 rounded-bl-lg">
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Star className="w-3 h-3" />
                    ยอดนิยม
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">฿{plan.price.toLocaleString()}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary/90' 
                      : 'crypto-button'
                  }`}
                  size="lg"
                  onClick={() => handleSubscribe(plan.id, plan.name, plan.price)}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent"></div>
                      กำลังประมวลผล...
                    </div>
                  ) : (
                    `เลือกแพ็ค ${plan.name}`
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl">❓ คำถามที่พบบ่อย</CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <div>
                <h4 className="font-semibold">สามารถยกเลิกการสมัครสมาชิกได้หรือไม่?</h4>
                <p className="text-sm text-muted-foreground">ได้ คุณสามารถยกเลิกได้ตลอดเวลาโดยไม่มีค่าปรับ</p>
              </div>
              <div>
                <h4 className="font-semibold">สามารถเปลี่ยนแพ็คเกจได้หรือไม่?</h4>
                <p className="text-sm text-muted-foreground">ได้ คุณสามารถอัพเกรดหรือดาวน์เกรดแพ็คเกจได้ตลอดเวลา</p>
              </div>
              <div>
                <h4 className="font-semibold">มีการรับประกันคืนเงินหรือไม่?</h4>
                <p className="text-sm text-muted-foreground">มีการรับประกันคืนเงิน 30 วัน หากไม่พอใจ</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;