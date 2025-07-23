import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import cryptoHero from "@/assets/crypto-trading-bg.jpg";
import Header from "@/components/Header";

const Hero = () => {
  return (
    <>
      <Header />
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-dark">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={cryptoHero} 
          alt="Crypto Trading Dashboard" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/80" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-crypto-primary/10 rounded-full animate-float crypto-glow" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-crypto-accent/10 rounded-full animate-float animation-delay-1000" />
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-crypto-secondary/10 rounded-full animate-float animation-delay-2000" />

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-card/30 backdrop-blur-sm border border-crypto-primary/20 rounded-full px-4 py-2 mb-8">
            <Zap className="w-4 h-4 text-crypto-accent" />
            <span className="text-sm font-medium">แพลตฟอร์มสอนคริปโต #1 ในไทย</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            เรียนรู้{" "}
            <span className="gradient-text">คริปโต</span>
            <br />
            แบบมืออาชีพ
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
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
            <Button className="crypto-button group" size="lg">
              เริ่มเรียนฟรี
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="border-crypto-primary/50 text-crypto-primary hover:bg-crypto-primary/10">
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