import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import cryptoHero from "@/assets/crypto-trading-bg.jpg";
import Header from "@/components/Header";

const Hero = () => {
  return (
    <>
      <Header />
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-crypto-dark via-background to-crypto-darker">
      {/* Chart Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={cryptoHero} 
          alt="Trading Chart Background" 
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-crypto-dark/70 via-background/80 to-crypto-darker/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--crypto-primary)/0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,hsl(var(--crypto-accent)/0.08)_0%,transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-sm font-medium text-crypto-accent/90 mb-8">
            <Zap className="w-4 h-4 text-crypto-accent animate-pulse" />
            <span>แพลตฟอร์มสำหรับมือใหม่หารายได้เสริม</span>
          </div>

          {/* Main Heading with Animations */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
  <span className="block mb-2">
    <span className="text-white">เรียนรู้</span>{" "}
    <span className="bg-gradient-to-r from-crypto-primary via-crypto-accent to-crypto-secondary bg-clip-text text-transparent animate-glow-pulse">
      การเทรด
    </span>
  </span>
  <span className="block bg-gradient-to-r from-crypto-accent to-crypto-primary bg-clip-text text-transparent animate-fade-in">
    แบบมืออาชีพ
  </span>
</h1>


          {/* Subheading with Animation */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up">
            ปลดล็อกความลับของการเทรดทั้งคริปโตและฟอเร็กซ์ 
            พร้อมคอร์สเรียนที่ง่ายที่สุดสำหรับมือใหม่และคนที่อยากเทรดให้ดีขึ้นโดยไม่ต้องคิดเยอะ
          </p>

          {/* Features with Animation */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 animate-fade-in">
            <div className="flex items-center gap-2 text-crypto-accent animate-float">
              <TrendingUp className="w-5 h-5" />
              <span>กลยุทธ์การเทรดขั้นสูง</span>
            </div>
            <div className="flex items-center gap-2 text-crypto-accent animate-float animation-delay-500">
              <Shield className="w-5 h-5" />
              <span>การจัดการความเสี่ยง</span>
            </div>
            <div className="flex items-center gap-2 text-crypto-accent animate-float animation-delay-1000">
              <Zap className="w-5 h-5" />
              <span>เทรดแบบ Real-time</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button variant="outline" size="lg" className="border border-crypto-primary/30 text-crypto-primary hover:bg-crypto-primary/5 hover:border-crypto-primary/50 transition-all duration-300 px-8 py-4 rounded-lg">
              ดูคอร์สทั้งหมด
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-8 border-t border-crypto-primary/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-crypto-accent mb-2">50,000+</div>
              <div className="text-muted-foreground">นักเรียนที่ประสบความสำเร็จ</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-crypto-accent mb-2">100+</div>
              <div className="text-muted-foreground">คอร์สเรียนครบครัน</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-crypto-accent mb-2">24/7</div>
              <div className="text-muted-foreground">สนับสนุนตลอดเวลา</div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-5" />
    </section>
    </>
  );
};

export default Hero;