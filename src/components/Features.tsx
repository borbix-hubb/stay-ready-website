import { Brain, Target, Users, Shield, Zap, Trophy, BookOpen, TrendingUp } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "คอร์สครบครัน 4 ระดับ",
    description: "จากมือใหม่ถึงขั้นสูง ครอบคลุมทุกกลยุทธ์การเทรดฟอเร็กซ์",
    color: "from-indigo-600 to-blue-600"
  },
  {
    icon: Target,
    title: "กลยุทธ์พิสูจน์แล้ว",
    description: "MSS, Scalping, EMA System ที่ใช้งานได้จริงและสร้างกำไรสม่ำเสมอ",
    color: "from-cyan-600 to-teal-600"
  },
  {
    icon: Shield,
    title: "Risk Management ขั้นสูง",
    description: "เรียนรู้การป้องกันขาดทุนและจัดการความเสี่ยงอย่างมืออาชีพ",
    color: "from-violet-600 to-purple-600"
  },
  {
    icon: Zap,
    title: "เทรดทุกรูปแบบ",
    description: "Scalping, Swing Trading, Day Trading - เลือกสไตล์ที่เหมาะกับคุณ",
    color: "from-amber-600 to-orange-600"
  },
  {
    icon: Users,
    title: "คอมมูนิตี้เทรดเดอร์",
    description: "เข้าร่วมกลุ่มลับ แชร์ประสบการณ์ และเรียนรู้จากผู้เชี่ยวชาญ",
    color: "from-green-600 to-emerald-600"
  },
  {
    icon: TrendingUp,
    title: "สัญญาณเทรดพรีเมี่ยม",
    description: "รับสัญญาณเทรดคุณภาพสูงและเครื่องมือวิเคราะห์ขั้นสูง",
    color: "from-pink-600 to-rose-600"
  }
];

const Features = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              ทำไมต้องเลือก
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              คอร์สเทรดของเรา?
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            ระบบการเรียนรู้ที่ออกแบบมาเพื่อให้คุณเทรดได้อย่างมืออาชีพ
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent font-semibold">
              ด้วยเทคนิคที่ใช้งานได้จริงในตลาดปัจจุบัน
            </span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:scale-105 transition-all duration-500 hover:border-slate-600"
              style={{ 
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500`} />
              
              {/* Content */}
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300`}
                     style={{
                       boxShadow: `0 10px 30px -10px ${feature.color.includes('indigo') ? '#4f46e5' : 
                                                      feature.color.includes('cyan') ? '#06b6d4' :
                                                      feature.color.includes('violet') ? '#8b5cf6' :
                                                      feature.color.includes('amber') ? '#f59e0b' :
                                                      feature.color.includes('green') ? '#10b981' : '#ec4899'}40`
                     }}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-white transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stats */}
        <div className="bg-gradient-to-r from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                ผลลัพธ์ที่พิสูจน์ได้
              </span>
            </h3>
            <p className="text-xl text-slate-300">จากนักเรียนที่เรียนจบคอร์สแล้ว</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-all duration-300">
                92%
              </div>
              <div className="text-slate-400">นักเรียนทำกำไรได้ในเดือนแรก</div>
            </div>
            
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-all duration-300">
                15-30%
              </div>
              <div className="text-slate-400">ผลตอบแทนเฉลี่ยต่อเดือน</div>
            </div>
            
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-all duration-300">
                5+
              </div>
              <div className="text-slate-400">ปีประสบการณ์ในตลาด</div>
            </div>
            
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-all duration-300">
                10K+
              </div>
              <div className="text-slate-400">นักเรียนทั่วโลก</div>
            </div>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">รับประกันคืนเงิน</h4>
              <p className="text-slate-400 text-sm">7 วันแรก หากไม่พอใจ</p>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">เรียนได้ตลอดชีพ</h4>
              <p className="text-slate-400 text-sm">อัปเดตเนื้อหาฟรีตลอดไป</p>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-sm border border-violet-500/30 rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">ซัพพอร์ตตลอด 24/7</h4>
              <p className="text-slate-400 text-sm">ทีมงานพร้อมช่วยเหลือ</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;