import { Brain, BarChart3, Users, Shield, Zap, Trophy } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "ใช้ปัญญาประดิษฐ์วิเคราะห์ตลาดและแนะนำกลยุทธ์การเทรดที่เหมาะกับคุณ",
    color: "text-crypto-primary"
  },
  {
    icon: BarChart3,
    title: "Real-Time Trading",
    description: "เทรดแบบเรียลไทม์พร้อมเครื่องมือวิเคราะห์ทางเทคนิคขั้นสูง",
    color: "text-crypto-accent"
  },
  {
    icon: Users,
    title: "Community Learning",
    description: "เรียนรู้ร่วมกับชุมชนเทรดเดอร์มืออาชีพและแบ่งปันประสบการณ์",
    color: "text-crypto-secondary"
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "เรียนรู้การจัดการความเสี่ยงและป้องกันการสูญเสียในการลงทุน",
    color: "text-crypto-warning"
  },
  {
    icon: Zap,
    title: "Fast Execution",
    description: "ระบบการเทรดที่รวดเร็วและเสถียร ไม่พลาดโอกาสทำกำไร",
    color: "text-crypto-success"
  },
  {
    icon: Trophy,
    title: "Proven Results",
    description: "นักเรียนของเราทำกำไรเฉลี่ย 15-25% ต่อเดือนอย่างต่อเนื่อง",
    color: "text-crypto-primary"
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-card/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ทำไมต้อง{" "}
            <span className="gradient-text">CryptoLearn Pro</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            แพลตฟอร์มการเรียนรู้คริปโตที่ออกแบบมาเพื่อให้คุณประสบความสำเร็จ
            ด้วยเทคโนโลยีล้ำสมัยและประสบการณ์การเรียนรู้ที่เหนือชั้น
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="crypto-card p-6 hover:scale-105 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg bg-card ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Stats Section */}
        <div className="mt-20 crypto-card p-8 text-center">
          <h3 className="text-2xl font-bold mb-8 gradient-text">
            ความสำเร็จที่พิสูจน์ได้
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-crypto-success mb-2">95%</div>
              <div className="text-sm text-muted-foreground">นักเรียนประสบความสำเร็จ</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-crypto-accent mb-2">24%</div>
              <div className="text-sm text-muted-foreground">ผลตอบแทนเฉลี่ยต่อเดือน</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-crypto-primary mb-2">5 ปี</div>
              <div className="text-sm text-muted-foreground">ประสบการณ์ในตลาด</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-crypto-warning mb-2">0.1%</div>
              <div className="text-sm text-muted-foreground">อัตราความเสี่ยงต่อการสูญเสีย</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;