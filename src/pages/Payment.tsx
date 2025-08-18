import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Shield, Clock, Users, ArrowRight, Zap, Target, TrendingUp, Brain, Sparkles, Package, Gift, ShieldCheck, Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import Header from "@/components/Header";

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('individual');

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'pricing', 'bundles', 'guarantee'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (sectionId === 'pricing') setActiveTab('individual');
            else if (sectionId === 'bundles') setActiveTab('bundle');
            else if (sectionId === 'guarantee') setActiveTab('guarantee');
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePurchase = async (courseId: string, courseName: string) => {
    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "เลือกคอร์สเรียบร้อย",
        description: `คุณได้เลือก ${courseName} แล้ว กำลังไปหน้ายืนยันการชำระเงิน`,
      });
      
      // Navigate to payment confirmation with course data
      navigate('/payment-confirm', { 
        state: { 
          courseId, 
          courseName,
          selectedCourse: courseId
        } 
      });
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถดำเนินการได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
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
      color: 'from-indigo-600 to-blue-600',
      borderColor: 'border-indigo-500/50',
      shadowColor: 'shadow-indigo-500/20',
      buttonColor: 'from-indigo-600 to-blue-600',
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
      color: 'from-cyan-600 to-teal-600',
      borderColor: 'border-cyan-500/50',
      shadowColor: 'shadow-cyan-500/20',
      buttonColor: 'from-cyan-600 to-teal-600',
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
      color: 'from-violet-600 to-purple-600',
      borderColor: 'border-violet-500/50',
      shadowColor: 'shadow-violet-500/20',
      buttonColor: 'from-violet-600 to-purple-600',
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
      color: 'from-amber-600 to-yellow-600',
      borderColor: 'border-amber-500/50',
      shadowColor: 'shadow-amber-500/20',
      buttonColor: 'from-amber-600 to-yellow-600',
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
      savings: '990',
      discount: '5%',
      color: 'from-indigo-600 to-cyan-600'
    },
    {
      id: 'advanced-ema',
      title: 'Advanced + EMA',
      tagline: 'รอเป็น ยิงยาว แต่ใช้ชีวิตชิว',
      price: '49,990',
      originalPrice: '54,980',
      courses: ['Advanced', 'EMA'],
      savings: '4,990',
      discount: '9%',
      color: 'from-violet-600 to-amber-600'
    },
    {
      id: 'all-in-one',
      title: 'All-in-One (4 คอร์ส)',
      tagline: 'ครบทุกสไตล์ ตั้งแต่พื้นฐานถึงขั้นสูง',
      price: '69,990',
      originalPrice: '92,960',
      courses: ['Basic', 'Scalping', 'Advanced', 'EMA'],
      savings: '22,970',
      discount: '25%',
      bestValue: true,
      color: 'from-rose-600 to-pink-600'
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen relative overflow-hidden">
      {/* Space Background with Stars */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black">
        {/* Animated Stars */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>
        
        {/* Large Glowing Stars */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={`glow-${i}`}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 4 + 3}s`,
              }}
            >
              <Sparkles 
                className="text-amber-400/30" 
                style={{ 
                  width: `${Math.random() * 20 + 10}px`, 
                  height: `${Math.random() * 20 + 10}px` 
                }} 
              />
            </div>
          ))}
        </div>

        {/* Nebula Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-cyan-900/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.15),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(6,182,212,0.1),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.08),transparent_50%)]" />
      </div>

      {/* Fixed Navigation Tab */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Title with Home Button */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full px-3 py-1.5 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden md:inline">กลับหน้าแรก</span>
                <span className="md:hidden">กลับ</span>
              </Button>
              <div className="hidden md:flex items-center gap-3 ml-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Forex Course
                </h2>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => scrollToSection('pricing')}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeTab === 'individual' 
                    ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Package className="w-4 h-4 mr-2" />
                คอร์สเดี่ยว
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('bundles')}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeTab === 'bundle' 
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Gift className="w-4 h-4 mr-2" />
                Bundle Package
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('guarantee')}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeTab === 'guarantee' 
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <ShieldCheck className="w-4 h-4 mr-2" />
                การันตี
              </Button>
            </nav>

            {/* CTA Button */}
            <Button 
              onClick={scrollToPricing}
              className="hidden lg:flex bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-black font-bold px-6 py-2 rounded-full shadow-lg shadow-amber-500/20 transition-all duration-300 hover:scale-105"
            >
              ดูคอร์ส
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2 pb-3 overflow-x-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection('pricing')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                activeTab === 'individual' 
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              คอร์สเดี่ยว
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection('bundles')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                activeTab === 'bundle' 
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Bundle
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection('guarantee')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                activeTab === 'guarantee' 
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              การันตี
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-16">
        {/* Hero Section */}
        <section id="hero" className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            {/* Promotion Badge */}
            <Badge className="mb-8 bg-gradient-to-r from-amber-600 to-orange-600 text-black font-bold text-lg px-6 py-2 rounded-full shadow-lg shadow-amber-500/25">
              ⚡ โปรโมชั่นพิเศษ – ลดสูงสุด 35%
            </Badge>
            
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-amber-100 bg-clip-text text-transparent leading-tight">
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
              <div className="flex items-center gap-2 text-cyan-400">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">ผู้เรียนมากกว่า 1,500 คน</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">รับประกันคืนเงิน 7 วัน</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400">
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent">
                เลือกคอร์สที่เหมาะกับคุณ
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                แต่ละคอร์สออกแบบมาเพื่อสไตล์การเทรดที่แตกต่างกัน ให้คุณเลือกได้ตามความต้องการ
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
              {courses.map((course) => (
                <Card key={course.id} className={`relative bg-slate-900/80 backdrop-blur-sm border-2 ${course.borderColor} overflow-visible group hover:scale-105 transition-all duration-300 ${course.popular ? 'ring-2 ring-amber-500 mt-4' : ''} flex flex-col h-full`}>
                  {course.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                      <Badge className="bg-gradient-to-r from-amber-600 to-orange-600 text-black font-bold px-4 py-1 shadow-lg">
                        🔥 ยอดนิยม
                      </Badge>
                    </div>
                  )}
                  
                  {/* Gradient Border Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${course.color} rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300`} />
                  
                  <CardHeader className="relative z-10 flex-shrink-0">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${course.color} flex items-center justify-center mb-6 shadow-lg ${course.shadowColor}`}>
                      <course.icon className="w-10 h-10 text-white" />
                    </div>
                    
                    <CardTitle className="text-xl font-bold text-white mb-3 leading-tight min-h-[56px]">
                      {course.title}
                    </CardTitle>
                    
                    <CardDescription className="text-slate-400 text-sm leading-relaxed mb-6 min-h-[48px]">
                      {course.tagline}
                    </CardDescription>
                    
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className={`text-3xl font-bold bg-gradient-to-r ${course.color} bg-clip-text text-transparent`}>
                          ฿{course.price}
                        </span>
                        <span className="text-lg text-slate-500 line-through">
                          ฿{course.originalPrice}
                        </span>
                      </div>
                      <Badge variant="secondary" className={`bg-gradient-to-r ${course.color} text-white border-0`}>
                        ประหยัด {course.discount}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 flex-grow flex flex-col">
                    <ul className="space-y-3 mb-8 flex-grow">
                      {course.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      onClick={() => handlePurchase(course.id, course.title)}
                      disabled={loading}
                      className={`w-full bg-gradient-to-r ${course.buttonColor} hover:opacity-90 text-white font-bold py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 border-0 text-base`}
                    >
                      {loading ? 'กำลังดำเนินการ...' : 'เลือกคอร์สนี้'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Bundle Package Section */}
        <section id="bundles" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-amber-400 bg-clip-text text-transparent">
                Bundle Package – ซื้อเป็นแพ็ก ประหยัดกว่า
              </h2>
              <p className="text-xl text-slate-400">
                รวมหลายคอร์สในราคาพิเศษ คุ้มค่ากว่าซื้อแยก
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
              {bundles.map((bundle) => (
                <Card key={bundle.id} className={`relative bg-slate-900/80 backdrop-blur-sm border-2 border-slate-700 overflow-visible group hover:scale-105 transition-all duration-300 ${bundle.bestValue ? 'ring-2 ring-rose-500 mt-4' : ''} flex flex-col h-full`}>
                  {bundle.bestValue && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                      <Badge className="bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold px-4 py-1 shadow-lg">
                        👑 คุ้มที่สุด
                      </Badge>
                    </div>
                  )}
                  
                  {/* Gradient Border Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${bundle.color} rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300`} />
                  
                  <CardHeader className="relative z-10 flex-shrink-0">
                    <CardTitle className="text-2xl font-bold text-white mb-3 min-h-[64px]">
                      {bundle.title}
                    </CardTitle>
                    
                    <CardDescription className="text-slate-400 text-base mb-4 min-h-[48px]">
                      {bundle.tagline}
                    </CardDescription>
                    
                    <div className="mb-6 min-h-[60px]">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {bundle.courses.map((course, index) => (
                          <Badge key={index} variant="outline" className="border-amber-500 text-amber-400">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className={`text-4xl font-bold bg-gradient-to-r ${bundle.color} bg-clip-text text-transparent`}>
                          ฿{bundle.price}
                        </span>
                        <span className="text-lg text-slate-500 line-through">
                          ฿{bundle.originalPrice}
                        </span>
                      </div>
                      <Badge variant="secondary" className={`bg-gradient-to-r ${bundle.color} text-white border-0`}>
                        ประหยัด {bundle.discount}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 flex-grow flex flex-col justify-end">
                    <Button 
                      onClick={() => handlePurchase(bundle.id, bundle.title)}
                      disabled={loading}
                      className={`w-full bg-gradient-to-r ${bundle.color} text-white font-bold py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 border-0 text-base`}
                    >
                      {loading ? 'กำลังดำเนินการ...' : 'เลือกแพ็กเกจนี้'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantee & Special Offer Section */}
        <section id="guarantee" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-slate-900/80 backdrop-blur-sm border-2 border-amber-500/30 shadow-2xl shadow-amber-500/10 relative overflow-hidden">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg blur opacity-20" />
              
              <CardContent className="p-12 text-center relative z-10">
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
                    <Users className="w-12 h-12 text-violet-400 mx-auto mb-3" />
                    <h4 className="font-bold text-white mb-2">เข้ากลุ่มลับ</h4>
                    <p className="text-slate-400 text-sm">แลกเปลี่ยนประสบการณ์กับเทรดเดอร์</p>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
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
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default Payment;