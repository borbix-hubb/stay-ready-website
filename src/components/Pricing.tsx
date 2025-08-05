import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Rocket } from "lucide-react";

const plans = [
  {
    name: "Rookie Mode",
    subtitle: "เทรดเข้าใจ ไม่หลงทาง",
    price: "1,499",
    originalPrice: "2,999", 
    duration: "ต่อเดือน",
    description: "มือใหม่ที่อยากเริ่มแบบถูกวิธี",
    icon: Zap,
    color: "text-[hsl(var(--crypto-warning))]",
    bgColor: "bg-[hsl(var(--crypto-warning)/0.1)]",
    borderColor: "border-[hsl(var(--crypto-warning)/0.2)]",
    features: [
      "คอร์สพื้นฐาน Rookie Mode",
      "เรียนรู้การอ่านกราฟเบื้องต้น",
      "เทคนิคการเทรดขั้นพื้นฐาน",
      "การจัดการความเสี่ยง",
      "คอมมูนิตี้ผู้เริ่มต้น",
      "การสนับสนุนพื้นฐาน"
    ],
    limitations: [
      "ไม่มีคอร์สขั้นสูง",
      "ไม่มี 1-on-1 mentoring",
      "ไม่มี trading signals"
    ]
  },
  {
    name: "Strategy Mode",
    subtitle: "เทรดมีแผน ทำกำไรสม่ำเสมอ",
    price: "2,499",
    originalPrice: "4,999",
    duration: "ต่อเดือน",
    description: "คนที่อยากมีระบบเทรดของตัวเอง",
    icon: Crown,
    color: "text-[hsl(var(--crypto-primary))]",
    bgColor: "bg-[hsl(var(--crypto-primary)/0.1)]",
    borderColor: "border-[hsl(var(--crypto-primary)/0.2)]",
    popular: true,
    features: [
      "คอร์ส Strategy Mode ครบชุด",
      "สร้างกลยุทธ์เทรดส่วนตัว",
      "การวิเคราะห์เชิงเทคนิค",
      "เครื่องมือเทรดขั้นสูง",
      "คอมมูนิตี้ VIP",
      "การสนับสนุน 24/7",
      "ระบบ Backtesting",
      "Portfolio tracking"
    ]
  },
  {
    name: "Full System Access",
    subtitle: "ระบบเทรดทำเงินจริง",
    price: "7,499",
    originalPrice: "14,999", 
    duration: "ต่อเดือน",
    description: "คนที่จริงจัง อยากได้สูตรสำเร็จพร้อมใช้",
    icon: Rocket,
    color: "text-[hsl(var(--crypto-secondary))]",
    bgColor: "bg-[hsl(var(--crypto-secondary)/0.1)]", 
    borderColor: "border-[hsl(var(--crypto-secondary)/0.2)]",
    features: [
      "ทุกอย่างใน Strategy Mode",
      "ระบบเทรดสำเร็จรูป",
      "AI-powered trading signals",
      "การวิเคราะห์แบบสถาบัน",
      "1-on-1 coaching รายสัปดาห์",
      "ข้อมูลภายในจากผู้เชี่ยวชาญ",
      "การเข้าถึง exclusive events",
      "Custom trading strategies",
      "Risk management tools ขั้นสูง"
    ]
  }
];

const Pricing = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        {/* Special Offer Banner */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 rounded-full border-2 border-yellow-400 shadow-2xl shadow-red-500/50 backdrop-blur-sm mb-6 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
            <div className="relative flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
              <span className="text-white font-bold text-lg tracking-wide animate-pulse">
                ⚡ SPECIAL OFFER - โปรโมชั่นพิเศษ ลดสูงสุด 75% ⚡
              </span>
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>
        </div>

        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            แพ็กเกจที่{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">เหมาะกับคุณ</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            เลือกแพ็กเกจที่ตรงกับความต้องการของคุณ
            เริ่มต้นเทรดแบบมืออาชีพและสร้างกำไรอย่างต่อเนื่อง
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`
                relative bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:scale-105 transition-all duration-300 animate-slide-up hover:bg-slate-800/70
                ${plan.popular ? 'ring-2 ring-purple-500 scale-105 shadow-2xl shadow-purple-500/25' : ''}
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                    ⭐ แนะนำ #1
                  </Badge>
                </>
              )}

              <CardHeader className="text-center pt-8">
                <div className={`w-16 h-16 mx-auto rounded-full ${plan.bgColor} flex items-center justify-center mb-4`}>
                  <plan.icon className={`w-8 h-8 ${plan.color}`} />
                </div>
                <CardTitle className="text-2xl mb-2 text-white">{plan.name}</CardTitle>
                <p className="text-lg font-semibold text-slate-300 mb-4">{plan.subtitle}</p>
                
                {plan.originalPrice && (
                  <div className="mb-2">
                    <span className="text-lg text-slate-400 line-through">฿{plan.originalPrice}</span>
                    <span className="ml-2 text-sm bg-red-600 text-white px-3 py-1 rounded-full">
                      ลด 75%
                    </span>
                  </div>
                )}
                
                <div className="text-4xl font-bold mb-2">
                  <span className={`${plan.color} text-white`}>฿{plan.price}</span>
                </div>
                <p className="text-sm text-slate-400">{plan.duration}</p>
                <p className="text-slate-300 mt-3 font-medium">💰 ประหยัด ฿{(parseInt(plan.originalPrice.replace(',', '')) - parseInt(plan.price.replace(',', ''))).toLocaleString()}</p>
                <p className="text-slate-400 mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6 px-6 pb-8">
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations && (
                  <div className="space-y-2 pt-4 border-t border-slate-600">
                    <p className="text-xs text-slate-400 font-medium">ข้อจำกัด:</p>
                    {plan.limitations.map((limitation) => (
                      <div key={limitation} className="flex items-start gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-600 mt-2 flex-shrink-0" />
                        <span className="text-xs text-slate-400">{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}

                <Button 
                  className={`w-full mt-6 text-lg py-6 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/25' 
                      : 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600'
                  }`}
                  size="lg"
                  onClick={() => window.location.href = '/payment-confirm'}
                >
                  {plan.popular ? '🚀' : '⚡'} เลือกแพ็คเกจ
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-12 bg-slate-800/50 border border-slate-700 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">🛡️ รับประกันเงินคืน 30 วัน</h3>
          </div>
          <p className="text-slate-300">
            หากไม่พอใจด้วยเหตุผลใดๆ เราจะคืนเงินให้ <span className="text-green-400 font-bold">100%</span> ภายใน 30 วัน
            <br />ไม่มีเงื่อนไขซับซ้อน ไม่ต้องตอบคำถาม
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;