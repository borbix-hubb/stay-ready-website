import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Star, Zap, Shield, Clock, Users, Trophy, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Payment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("premium");

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 299,
      originalPrice: 599,
      period: "เดือน",
      description: "เหมาะสำหรับผู้เริ่มต้น",
      popular: false,
      color: "from-blue-500 to-cyan-500",
      features: [
        "เข้าถึงคอร์สพื้นฐาน 15 คอร์ส",
        "วิดีโอคุณภาพ HD 1080p",
        "ใบประกาศนียบัตรดิจิทัล",
        "แชทสนับสนุนพื้นฐาน",
        "เครื่องมือเทรดเบื้องต้น",
        "รองรับ 2 อุปกรณ์"
      ]
    },
    {
      id: "premium",
      name: "Premium",
      price: 599,
      originalPrice: 1199,
      period: "เดือน",
      description: "🔥 ตัวเลือกที่ได้รับความนิยมมากที่สุด",
      popular: true,
      color: "from-purple-500 to-pink-500",
      features: [
        "เข้าถึงคอร์สทั้งหมด 50+ คอร์ส",
        "วิดีโอคุณภาพ 4K Ultra HD",
        "ใบประกาศนียบัตรระดับมืออาชีพ",
        "เครื่องมือเทรดขั้นสูงครบชุด",
        "การสนับสนุน 24/7 แบบ VIP",
        "กลุ่ม Telegram VIP",
        "สัญญาณเทรดรายวัน",
        "รองรับไม่จำกัดอุปกรณ์"
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 999,
      originalPrice: 1999,
      period: "เดือน",
      description: "สำหรับผู้ใช้ระดับมืออาชีพ",
      popular: false,
      color: "from-amber-500 to-orange-500",
      features: [
        "เข้าถึงคอร์สทั้งหมด + Exclusive",
        "เนื้อหาเฉพาะ Mastermind",
        "การปรึกษา 1-on-1 กับผู้เชี่ยวชาญ",
        "Portfolio Review ส่วนตัว",
        "เข้าร่วม Live Trading Session",
        "การสนับสนุน Priority",
        "แอปมือถือเฉพาะ Enterprise",
        "รายงานการลงทุนส่วนตัว"
      ]
    }
  ];

  const testimonials = [
    {
      name: "นายชาคริต อินทรา",
      role: "นักลงทุน",
      image: "👨‍💼",
      text: "เรียนแค่ 3 เดือน กำไรเพิ่มขึ้น 250% คุ้มค่ามากครับ!"
    },
    {
      name: "นางสาวพิมพ์ใจ รุ่งเรือง",
      role: "Day Trader",
      image: "👩‍💻",
      text: "สัญญาณเทรดแม่นมาก ได้กำไรทุกวันเลย ขอบคุณครับ"
    },
    {
      name: "นายสมศักดิ์ วิชัย",
      role: "นักลงทุนมือใหม่",
      image: "👨‍🎓",
      text: "จากที่ไม่รู้อะไรเลย ตอนนี้เทรดได้กำไรแล้ว"
    }
  ];

  const handleSubscribe = async (planId: string, planName: string, price: number) => {
    if (!user) {
      toast({
        title: "กรุณาเข้าสู่ระบบ",
        description: "คุณต้องเข้าสู่ระบบก่อนทำการสมัครสมาชิก",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setLoading(true);
    try {
      // จำลองการประมวลผลการชำระเงิน
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "🎉 การสมัครสมาชิกสำเร็จ!",
        description: `ยินดีต้อนรับสู่แพ็ค ${planName} เริ่มเรียนได้เลย!`,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/c3b49b05-fbe1-44a0-9781-dc44422344b2.png')] opacity-5"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(-1)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              กลับ
            </Button>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">โปรโมชั่นพิเศษ - ลด 50%</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              🚀 ยกระดับการเทรดของคุณ
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              เข้าร่วมกับนักเทรดมืออาชีพกว่า <span className="text-purple-400 font-bold">10,000+</span> คน 
              และเริ่มสร้างกำไรจากการเทรดแบบมืออาชีพ
            </p>
            <div className="flex justify-center gap-8 text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>ผู้เรียนกว่า 15,000+ คน</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>อัตราสำเร็จ 94%</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>รับประกันผลลัพธ์</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden transition-all duration-500 hover:scale-105 cursor-pointer ${
                plan.popular 
                  ? 'ring-2 ring-purple-500 shadow-2xl shadow-purple-500/25 bg-slate-800/80' 
                  : 'bg-slate-800/50 hover:bg-slate-800/70'
              } border-slate-700 backdrop-blur-sm ${
                selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      ยอดนิยม #1
                    </div>
                  </div>
                </>
              )}
              
              <CardHeader className="text-center pt-8">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4`}>
                  {plan.id === 'basic' && <Shield className="w-8 h-8 text-white" />}
                  {plan.id === 'premium' && <Zap className="w-8 h-8 text-white" />}
                  {plan.id === 'enterprise' && <Trophy className="w-8 h-8 text-white" />}
                </div>
                <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                <CardDescription className="text-slate-400">{plan.description}</CardDescription>
                
                <div className="mt-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-lg text-slate-400 line-through">฿{plan.originalPrice.toLocaleString()}</span>
                    <Badge className="bg-red-600 text-white">ลด 50%</Badge>
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
                  className={`w-full text-lg py-6 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/25' 
                      : `bg-gradient-to-r ${plan.color} hover:opacity-90`
                  }`}
                  onClick={() => handleSubscribe(plan.id, plan.name, plan.price)}
                  disabled={loading}
                >
                  {loading && selectedPlan === plan.id ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      กำลังประมวลผล...
                    </div>
                  ) : (
                    <>
                      {plan.popular ? '🚀' : '⚡'} เลือกแพ็ค {plan.name}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-slate-800/50 rounded-2xl p-8 mb-16 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white text-center mb-8">🏆 ผลลัพธ์ที่น่าประทับใจ</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">15,000+</div>
              <div className="text-slate-400">นักเรียน</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">94%</div>
              <div className="text-slate-400">อัตราสำเร็จ</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">50+</div>
              <div className="text-slate-400">คอร์สเรียน</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">4.9/5</div>
              <div className="text-slate-400">คะแนนรีวิว</div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">💬 เสียงจากนักเรียน</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
                      {testimonial.image}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-slate-400">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-slate-300 italic">"{testimonial.text}"</p>
                  <div className="flex gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 mb-16 backdrop-blur-sm">
          <h3 className="text-3xl font-bold text-white text-center mb-12">✨ ทำไมต้องเลือกเรา?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">ชุมชนนักเทรด</h4>
              <p className="text-slate-400">เข้าร่วมกลุ่ม VIP กับนักเทรดมืออาชีพ แชร์ประสบการณ์และเทคนิค</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">สัญญาณแบบเรียลไทม์</h4>
              <p className="text-slate-400">รับสัญญาณเทรดที่แม่นยำจากทีมวิเคราะห์มืออาชีพ 24/7</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">รับประกันผลลัพธ์</h4>
              <p className="text-slate-400">หากไม่พอใจภายใน 30 วัน คืนเงิน 100% ไม่มีเงื่อนไข</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">❓ คำถามที่พบบ่อย</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-2">สามารถยกเลิกการสมัครสมาชิกได้หรือไม่?</h4>
                <p className="text-sm text-slate-400">ได้ครับ คุณสามารถยกเลิกได้ตลอดเวลาโดยไม่มีค่าปรับ และสามารถใช้งานได้จนถึงวันหมดอายุ</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">มีการรับประกันคืนเงินหรือไม่?</h4>
                <p className="text-sm text-slate-400">มีการรับประกันคืนเงิน 30 วันเต็ม หากไม่พอใจด้วยเหตุผลใดก็ตาม</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">สามารถเปลี่ยนแพ็คเกจได้หรือไม่?</h4>
                <p className="text-sm text-slate-400">ได้ครับ คุณสามารถอัพเกรดหรือดาวน์เกรดแพ็คเกจได้ตลอดเวลา</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">รองรับการชำระเงินแบบไหนบ้าง?</h4>
                <p className="text-sm text-slate-400">รองรับบัตรเครดิต, ดेबิตการ์ด, โอนผ่านธนาคาร และ PromptPay</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payment;