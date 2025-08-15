import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Zap, Star, Brain, Target } from "lucide-react";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleViewCourses = () => {
    navigate('/payment');
  };

  return (
    <>
      <Header />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Content */}
        <div className="container mx-auto px-4 z-10 text-center">
          <div className="max-w-6xl mx-auto">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 text-sm font-medium bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30 rounded-full px-6 py-3 mb-12 backdrop-blur-sm">
              <Star className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent font-bold">
                แพลตฟอร์มเทรดฟอเร็กซ์ระดับพรีเมี่ยม
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="block mb-4">
                <span className="bg-gradient-to-r from-white via-cyan-100 to-amber-100 bg-clip-text text-transparent">
                  ปลดล็อก
                </span>
              </span>
              <span className="block mb-4">
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  ความลับ
                </span>
              </span>
              <span className="block">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  การเทรดฟอเร็กซ์
                </span>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-3xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              เรียนรู้เทคนิคการเทรดแบบมืออาชีพ สร้างกำไรสม่ำเสมอ 
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent font-semibold">
                ด้วยกลยุทธ์ที่พิสูจน์แล้วจากผู้เชี่ยวชาญ
              </span>
            </p>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
              <div className="bg-slate-800/40 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6 group hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">เทคนิคขั้นสูง</h3>
                <p className="text-slate-400">กลยุทธ์เทรดที่ใช้งานได้จริง จากประสบการณ์ตรง</p>
              </div>
              
              <div className="bg-slate-800/40 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 group hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">การจัดการความเสี่ยง</h3>
                <p className="text-slate-400">เรียนรู้การป้องกันขาดทุน และเพิ่มกำไรอย่างปลอดภัย</p>
              </div>
              
              <div className="bg-slate-800/40 backdrop-blur-sm border border-amber-500/30 rounded-xl p-6 group hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-amber-500/30 transition-all duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">ผลลัพธ์ที่วัดได้</h3>
                <p className="text-slate-400">ระบบเทรดที่ให้ผลตอบแทนสม่ำเสมอและยั่งยืน</p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="space-y-8">
              <Button 
                onClick={handleViewCourses}
                size="lg" 
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-black font-bold text-xl px-12 py-6 rounded-full shadow-2xl shadow-amber-500/30 transition-all duration-300 hover:scale-105 border-0"
              >
                เริ่มเรียนเลย - ดูคอร์สทั้งหมด
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-cyan-400">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span>ผู้เรียนมากกว่า 10,000+ คน</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>รับประกันคืนเงิน 7 วัน</span>
                </div>
                <div className="flex items-center gap-2 text-violet-400">
                  <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
                  <span>เรียนได้ทุกอุปกรณ์ 24/7</span>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-slate-700/50">
              <div className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300">
                  10K+
                </div>
                <div className="text-slate-400 text-sm">นักเรียนที่ประสบความสำเร็จ</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300">
                  95%
                </div>
                <div className="text-slate-400 text-sm">ความพึงพอใจ</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300">
                  4.9
                </div>
                <div className="text-slate-400 text-sm">คะแนนรีวิว</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300">
                  24/7
                </div>
                <div className="text-slate-400 text-sm">สนับสนุนตลอดเวลา</div>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-5 pointer-events-none" />
      </section>
    </>
  );
};

export default Hero;