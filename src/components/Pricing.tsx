import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Rocket, Brain } from "lucide-react";

const plans = [
  {
    id: "basic",
    name: "คอร์สฟอเร็กซ์เบสิก",
    subtitle: "คอร์สจับมือเทรด ปูพื้นฐาน เอาตัวรอดในตลาด",
    price: 4990,
    originalPrice: 6990,
    period: "ครั้งเดียว",
    description: "มือใหม่ที่อยากเริ่มแบบถูกวิธี",
    popular: false,
    color: "from-indigo-600 to-blue-600",
    icon: Zap,
    features: [
      "พื้นฐานตลาดฟอเร็กซ์",
      "การใช้แพลตฟอร์มเทรด",
      "วิเคราะห์เบื้องต้น",
      "กลยุทธ์ง่าย ๆ",
      "Risk Management",
      "Bonus: Signal Room"
    ]
  },
  {
    id: "scalping",
    name: "คอร์สพาซิ่ง สำหรับคนทุนน้อย",
    subtitle: "เข้าไว ปิดไว Timeframe สั้น ทำกำไรเร็ว",
    price: 15990,
    originalPrice: 21990,
    period: "ครั้งเดียว",
    description: "คนที่อยากเทรดไว ปิดไว",
    popular: true,
    color: "from-cyan-600 to-teal-600",
    icon: Crown,
    features: [
      "Scalping M1–M5",
      "MSS เวอร์ชันเร็ว",
      "OB/FVG Strategy",
      "Tight Stop Loss",
      "Partial Take Profit"
    ]
  },
  {
    id: "advanced",
    name: "คอร์สแอดวานซ์ เทรดแบบเทพสายรอ",
    subtitle: "Timeframe ใหญ่ SL เล็ก TP 500–1000 จุด",
    price: 24990,
    originalPrice: 31990,
    period: "ครั้งเดียว",
    description: "คนที่จริงจัง อยากเทรดสายยาว",
    popular: false,
    color: "from-violet-600 to-purple-600",
    icon: Rocket,
    features: [
      "Swing Trading",
      "MSS H1–H4",
      "Demand/Supply ใหญ่",
      "Fibonacci Retracement",
      "Trailing Stop Strategy"
    ]
  },
  {
    id: "ema",
    name: "คอร์สถอดสมอง เทรดสบายสำหรับสายขี้เกียจ",
    subtitle: "ง่าย สะดวก ใช้ EMA Indicator เดียว",
    price: 29990,
    originalPrice: 37990,
    period: "ครั้งเดียว",
    description: "คนที่อยากเทรดแบบง่าย ๆ",
    popular: false,
    color: "from-amber-600 to-yellow-600",
    icon: Brain,
    features: [
      "EMA 20/50/200",
      "Trend-Following Strategy",
      "Pullback Entry",
      "Multi-TF EMA System",
      "Template + Alert System"
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
                ⚡ SPECIAL OFFER - โปรโมชั่นพิเศษ ลดสูงสุด 35% ⚡
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.id}
              className={`
                relative overflow-hidden transition-all duration-500 hover:scale-105 cursor-pointer animate-slide-up
                ${plan.popular 
                  ? 'ring-2 ring-purple-500 shadow-2xl shadow-purple-500/25 bg-slate-800/80' 
                  : 'bg-slate-800/50 hover:bg-slate-800/70'
                } border-slate-700 backdrop-blur-sm
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                      <Crown className="w-4 h-4" />
                      ยอดนิยม #1
                    </div>
                  </div>
                </>
              )}

              <CardHeader className="text-center pt-8">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                <p className="text-lg font-semibold text-slate-300 mb-2">{plan.subtitle}</p>
                <p className="text-slate-400">{plan.description}</p>
                
                <div className="mt-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-lg text-slate-400 line-through">฿{plan.originalPrice.toLocaleString()}</span>
                    <Badge className="bg-red-600 text-white">ลด {Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100)}%</Badge>
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-white">฿{plan.price.toLocaleString()}</span>
                    <span className="text-slate-400">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-green-400 mt-2">💰 ประหยัด ฿{(plan.originalPrice - plan.price).toLocaleString()}</p>
                </div>
              </CardHeader>

              <CardContent className="px-6 pb-8">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full text-sm py-4 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 shadow-lg shadow-cyan-500/25' 
                      : `bg-gradient-to-r ${plan.color} hover:opacity-90`
                  }`}
                  onClick={() => window.location.href = '/payment'}
                >
                  {plan.popular ? '🚀' : '⚡'} เลือกคอร์สนี้
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