import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Shield, Clock, Users, ArrowRight, Zap, Target, TrendingUp, Brain } from "lucide-react";

const SalesPage = () => {
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const courses = [
    {
      id: 'basic',
      title: 'คอร์สฟอเร็กซ์เบสิกสำหรับมือใหม่',
      tagline: 'คอร์สจับมือเทรด ปูพื้นฐาน เอาตัวรอดในตลาด',
      price: '4,990',
      originalPrice: '6,990',
      discount: '29%',
      icon: Users,
      color: 'from-blue-600 to-purple-600',
      features: [
        'พื้นฐานตลาดฟอเร็กซ์',
        'การใช้แพลตฟอร์มเทรด',
        'วิเคราะห์เบื้องต้น',
        'กลยุทธ์ง่าย ๆ',
        'Risk Management',
        'Bonus: Signal Room'
      ]
    },
    {
      id: 'scalping',
      title: 'คอร์สพาซิ่ง สำหรับคนทุนน้อย',
      tagline: 'เข้าไว ปิดไว Timeframe สั้น ทำกำไรเร็ว',
      price: '15,990',
      originalPrice: '21,990',
      discount: '27%',
      icon: Zap,
      color: 'from-green-600 to-emerald-600',
      popular: true,
      features: [
        'Scalping M1–M5',
        'MSS เวอร์ชันเร็ว',
        'OB/FVG Strategy',
        'Tight Stop Loss',
        'Partial Take Profit'
      ]
    },
    {
      id: 'advanced',
      title: 'คอร์สแอดวานซ์ เทรดแบบเทพสายรอ',
      tagline: 'Timeframe ใหญ่ SL เล็ก TP 500–1000 จุด',
      price: '24,990',
      originalPrice: '31,990',
      discount: '22%',
      icon: Target,
      color: 'from-purple-600 to-pink-600',
      features: [
        'Swing Trading',
        'MSS H1–H4',
        'Demand/Supply ใหญ่',
        'Fibonacci Retracement',
        'Trailing Stop Strategy'
      ]
    },
    {
      id: 'ema',
      title: 'คอร์สถอดสมอง เทรดสบายสำหรับสายขี้เกียจ',
      tagline: 'ง่าย สะดวก ใช้ EMA Indicator เดียว',
      price: '29,990',
      originalPrice: '37,990',
      discount: '21%',
      icon: Brain,
      color: 'from-amber-600 to-orange-600',
      features: [
        'EMA 20/50/200',
        'Trend-Following Strategy',
        'Pullback Entry',
        'Multi-TF EMA System',
        'Template + Alert System'
      ]
    }
  ];

  const bundles = [
    {
      id: 'basic-scalping',
      title: 'Basic + Scalping',
      tagline: 'จากศูนย์สู่เทรดไว ปิดไว',
      price: '19,990',
      originalPrice: '20,980',
      courses: ['Basic', 'Scalping'],
      savings: '990'
    },
    {
      id: 'advanced-ema',
      title: 'Advanced + EMA',
      tagline: 'รอเป็น ยิงยาว แต่ใช้ชีวิตชิว',
      price: '49,990',
      originalPrice: '54,980',
      courses: ['Advanced', 'EMA'],
      savings: '4,990'
    },
    {
      id: 'all-in-one',
      title: 'All-in-One (4 คอร์ส)',
      tagline: 'ครบทุกสไตล์ ตั้งแต่พื้นฐานถึงขั้นสูง',
      price: '69,990',
      originalPrice: '92,960',
      courses: ['Basic', 'Scalping', 'Advanced', 'EMA'],
      savings: '22,970',
      bestValue: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-amber-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent)]" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Promotion Badge */}
          <Badge className="mb-8 bg-gradient-to-r from-amber-600 to-orange-600 text-black font-bold text-lg px-6 py-2 rounded-full shadow-lg shadow-amber-500/25">
            ⚡ โปรโมชั่นพิเศษ – ลดสูงสุด 35%
          </Badge>
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-amber-100 to-purple-200 bg-clip-text text-transparent leading-tight">
            ยกระดับการเทรดของคุณ<br />
            เลือกคอร์สที่ใช่ แล้วเริ่มทำกำไร
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            คัดมา 4 คอร์ส ครอบคลุมทุกสไตล์ ตั้งแต่มือใหม่ ทุนน้อย เทพรอสายยาว 
            ไปจนถึงสายขี้เกียจที่รักความง่าย
          </p>
          
          {/* Guarantee Points */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">ผู้เรียนมากกว่า 1,500 คน</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">รับประกันคืนเงิน 7 วัน</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">เรียนได้ทุกอุปกรณ์</span>
            </div>
          </div>
          
          {/* CTA Button */}
          <Button 
            onClick={scrollToPricing}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-black font-bold text-xl px-12 py-6 rounded-full shadow-2xl shadow-amber-500/30 transition-all duration-300 hover:scale-105"
          >
            ดูแพ็กเกจคอร์ส
            <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
        </div>
      </section>

      {/* Pricing Table - Individual Courses */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
              เลือกคอร์สที่เหมาะกับคุณ
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              แต่ละคอร์สออกแบบมาเพื่อสไตล์การเทรดที่แตกต่างกัน ให้คุณเลือกได้ตามความต้องการ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className={`relative bg-gradient-to-b from-slate-900 to-slate-950 border-slate-700 overflow-hidden group hover:scale-105 transition-all duration-300 ${course.popular ? 'ring-2 ring-amber-500' : ''}`}>
                {course.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-gradient-to-r from-amber-600 to-orange-600 text-black font-bold px-4 py-1">
                      🔥 ยอดนิยม
                    </Badge>
                  </div>
                )}
                
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${course.color} p-[1px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <div className="h-full w-full bg-gradient-to-b from-slate-900 to-slate-950 rounded-lg" />
                </div>
                
                <CardHeader className="relative z-10">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${course.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <course.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    {course.title}
                  </CardTitle>
                  
                  <CardDescription className="text-slate-400 text-base leading-relaxed">
                    {course.tagline}
                  </CardDescription>
                  
                  <div className="mt-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                        ฿{course.price}
                      </span>
                      <span className="text-lg text-slate-500 line-through">
                        ฿{course.originalPrice}
                      </span>
                    </div>
                    <Badge variant="secondary" className={`bg-gradient-to-r ${course.color} text-white`}>
                      ประหยัด {course.discount}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <ul className="space-y-3 mb-8">
                    {course.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className={`w-full bg-gradient-to-r ${course.color} hover:opacity-90 text-white font-bold py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg`}>
                    เลือกคอร์สนี้
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle Package Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
              Bundle Package – ซื้อเป็นแพ็ก ประหยัดกว่า
            </h2>
            <p className="text-xl text-slate-400">
              รวมหลายคอร์สในราคาพิเศษ คุ้มค่ากว่าซื้อแยก
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bundles.map((bundle) => (
              <Card key={bundle.id} className={`relative bg-gradient-to-b from-slate-900 to-slate-950 border-slate-700 overflow-hidden group hover:scale-105 transition-all duration-300 ${bundle.bestValue ? 'ring-2 ring-purple-500' : ''}`}>
                {bundle.bestValue && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-4 py-1">
                      👑 คุ้มที่สุด
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="relative z-10">
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    {bundle.title}
                  </CardTitle>
                  
                  <CardDescription className="text-slate-400 text-base mb-4">
                    {bundle.tagline}
                  </CardDescription>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {bundle.courses.map((course, index) => (
                        <Badge key={index} variant="outline" className="border-amber-500 text-amber-400">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                        ฿{bundle.price}
                      </span>
                      <span className="text-lg text-slate-500 line-through">
                        ฿{bundle.originalPrice}
                      </span>
                    </div>
                    <div className="text-green-400 font-semibold">
                      ประหยัด ฿{bundle.savings}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <Button className={`w-full ${bundle.bestValue ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700'} text-white font-bold py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg`}>
                    เลือกแพ็กเกจนี้
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee & Special Offer Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-amber-500/30 shadow-2xl shadow-amber-500/10">
            <CardContent className="p-12 text-center">
              <div className="mb-8">
                <Shield className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-4">
                  รับประกันความพอใจ 100%
                </h3>
                <p className="text-xl text-slate-300 mb-8">
                  <strong className="text-amber-400">คืนเงินภายใน 7 วัน</strong> ถ้าไม่พอใจ ไม่มีเงื่อนไขซ่อนเร้น
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <Users className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                  <h4 className="font-bold text-white mb-2">เข้ากลุ่มลับ</h4>
                  <p className="text-slate-400 text-sm">แลกเปลี่ยนประสบการณ์กับเทรดเดอร์</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <h4 className="font-bold text-white mb-2">Live Workshop</h4>
                  <p className="text-slate-400 text-sm">เรียนแบบสดกับผู้เชี่ยวชาญ</p>
                </div>
                <div className="text-center">
                  <Star className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                  <h4 className="font-bold text-white mb-2">อัปเดตตลอดชีพ</h4>
                  <p className="text-slate-400 text-sm">เนื้อหาใหม่ ๆ ไม่มีค่าใช้จ่ายเพิ่ม</p>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-bold text-white mb-4">รองรับการชำระเงิน</h4>
                <div className="flex justify-center gap-4 text-slate-400">
                  <span>💳 บัตรเครดิต</span>
                  <span>🏦 โอนธนาคาร</span>
                  <span>📱 ผ่อน 0%</span>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:via-orange-500 hover:to-red-500 text-white font-bold text-2xl px-16 py-6 rounded-full shadow-2xl shadow-amber-500/30 transition-all duration-300 hover:scale-110">
                🚀 สมัครเรียนวันนี้
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default SalesPage;