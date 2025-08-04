import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "ฟรี",
    duration: "ตลอดไป",
    description: "เหมาะสำหรับผู้เริ่มต้น",
    icon: Zap,
    color: "text-crypto-success",
    bgColor: "bg-crypto-success/10",
    borderColor: "border-crypto-success/20",
    features: [
      "คอร์สพื้นฐาน 3 คอร์ส",
      "วิดีโอบทเรียน 20+ ชั่วโมง",
      "คอมมูนิตี้ทั่วไป",
      "การสนับสนุนพื้นฐาน",
      "อัปเดตรายสัปดาห์"
    ],
    limitations: [
      "ไม่มีคอร์สขั้นสูง",
      "ไม่มี 1-on-1 mentoring",
      "ไม่มี trading signals"
    ]
  },
  {
    name: "Pro",
    price: "999",
    duration: "ต่อเดือน",
    description: "สำหรับเทรดเดอร์จริงจัง",
    icon: Crown,
    color: "text-crypto-primary",
    bgColor: "bg-crypto-primary/10",
    borderColor: "border-crypto-primary/20",
    popular: true,
    features: [
      "คอร์สทั้งหมด 100+ คอร์ส",
      "Trading signals แบบเรียลไทม์",
      "คอมมูนิตี้ VIP",
      "1-on-1 mentoring รายเดือน",
      "เครื่องมือวิเคราะห์ขั้นสูง",
      "การสนับสนุน 24/7",
      "Portfolio tracking",
      "การแจ้งเตือนราคา"
    ]
  },
  {
    name: "Elite",
    price: "2,999",
    duration: "ต่อเดือน", 
    description: "สำหรับนักลงทุนมืออาชีพ",
    icon: Rocket,
    color: "text-crypto-secondary",
    bgColor: "bg-crypto-secondary/10", 
    borderColor: "border-crypto-secondary/20",
    features: [
      "ทุกอย่างใน Pro Plan",
      "AI-powered trading bot",
      "การวิเคราะห์แบบสถาบัน",
      "Weekly 1-on-1 coaching",
      "ข้อมูลภายในจากผู้เชี่ยวชาญ",
      "การเข้าถึง exclusive events",
      "Custom trading strategies",
      "Risk management tools",
      "Tax optimization guidance"
    ]
  }
];

const Pricing = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-card/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            แพ็กเกจที่{" "}
            <span className="gradient-text">เหมาะกับคุณ</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            เลือกแพ็กเกจที่ตรงกับความต้องการของคุณ
            เริ่มต้นฟรีหรือปลดล็อกฟีเจอร์เต็มรูปแบบสำหรับการเทรดแบบมืออาชีพ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`
                relative crypto-card hover:scale-105 transition-all duration-300 animate-slide-up
                ${plan.popular ? 'ring-2 ring-crypto-primary scale-105' : ''}
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-crypto-primary text-white">
                  แนะนำ
                </Badge>
              )}

              <CardHeader className="text-center">
                <div className={`inline-flex p-3 rounded-full ${plan.bgColor} ${plan.color} mx-auto mb-4`}>
                  <plan.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <div className="text-4xl font-bold mb-2">
                  {plan.price === "ฟรี" ? (
                    <span className="text-crypto-success">{plan.price}</span>
                  ) : (
                    <>
                      <span className={plan.color}>{plan.price}</span>
                      <span className="text-lg font-normal text-muted-foreground">฿</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{plan.duration}</p>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-crypto-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations && (
                  <div className="space-y-2 pt-4 border-t border-crypto-primary/20">
                    <p className="text-xs text-muted-foreground font-medium">ข้อจำกัด:</p>
                    {plan.limitations.map((limitation) => (
                      <div key={limitation} className="flex items-start gap-2">
                        <div className="w-3 h-3 rounded-full bg-muted mt-2 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}

                <Button 
                  className={`
                    w-full mt-6
                    ${plan.name === 'Starter' ? 'border-crypto-success text-crypto-success hover:bg-crypto-success/10' : 'crypto-button'}
                  `}
                  variant={plan.name === 'Starter' ? 'outline' : 'default'}
                  size="lg"
                  asChild
                >
                  <Link to={plan.name === 'Starter' ? '/auth' : '/payment'}>
                    {plan.name === 'Starter' ? 'เริ่มใช้ฟรี' : 'เริ่มใช้งาน'}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-12 crypto-card p-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-crypto-success/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-crypto-success" />
            </div>
            <h3 className="text-xl font-semibold">รับประกันเงินคืน 30 วัน</h3>
          </div>
          <p className="text-muted-foreground">
            หากไม่พอใจด้วยเหตุผลใดๆ เราจะคืนเงินให้ 100% ภายใน 30 วัน
            ไม่มีเงื่อนไขซับซ้อน ไม่ต้องตอบคำถาม
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;