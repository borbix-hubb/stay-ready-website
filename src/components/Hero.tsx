import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import cryptoHero from "@/assets/crypto-trading-bg.jpg";
import Header from "@/components/Header";

const Hero = () => {
  return (
    <>
      <Header />
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-crypto-dark">
      {/* Clean Subtle Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--crypto-primary)/0.05)_0%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground mb-8">
            <Zap className="w-4 h-4 text-crypto-accent" />
            <span>แพลตฟอร์มสอนคริปโต #1 ในไทย</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            เรียนรู้{" "}
            <span className="bg-gradient-to-r from-crypto-primary to-crypto-accent bg-clip-text text-transparent">
              คริปโต
            </span>
            <br />
            แบบมืออาชีพ
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            ปลดล็อกความลับของการเทรดคริปโต การลงทุน และเทคโนโลยี Blockchain 
            พร้อมคอร์สเรียนที่ครบครันที่สุด
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-crypto-accent">
              <TrendingUp className="w-5 h-5" />
              <span>กลยุทธ์การเทรดขั้นสูง</span>
            </div>
            <div className="flex items-center gap-2 text-crypto-accent">
              <Shield className="w-5 h-5" />
              <span>การจัดการความเสี่ยง</span>
            </div>
            <div className="flex items-center gap-2 text-crypto-accent">
              <Zap className="w-5 h-5" />
              <span>เทรดแบบ Real-time</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-crypto-primary to-crypto-secondary hover:from-crypto-secondary hover:to-crypto-primary text-white font-medium px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group" size="lg">
              เริ่มเรียนฟรี
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
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