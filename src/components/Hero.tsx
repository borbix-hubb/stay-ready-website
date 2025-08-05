import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import cryptoHero from "@/assets/crypto-trading-bg.jpg";
import Header from "@/components/Header";

const Hero = () => {
  return (
    <>
      <Header />
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-crypto-dark to-background">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--crypto-primary)/0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,hsl(var(--crypto-secondary)/0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,hsl(var(--crypto-accent)/0.03)_50%,transparent_75%)]" />
      </div>

      {/* Dynamic Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-crypto-primary/20 to-crypto-accent/20 rounded-full animate-float crypto-glow backdrop-blur-sm" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-r from-crypto-secondary/20 to-crypto-primary/20 rounded-full animate-float animation-delay-1000 backdrop-blur-sm" />
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-gradient-to-r from-crypto-accent/20 to-crypto-secondary/20 rounded-full animate-float animation-delay-2000 backdrop-blur-sm" />
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-crypto-primary/15 to-crypto-accent/15 rounded-full animate-float animation-delay-500 backdrop-blur-sm" />
      <div className="absolute top-40 right-1/3 w-12 h-12 bg-gradient-to-r from-crypto-secondary/25 to-crypto-primary/25 rounded-full animate-float animation-delay-1500 backdrop-blur-sm" />

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-crypto-primary/10 to-crypto-secondary/10 backdrop-blur-sm border border-crypto-primary/30 rounded-full px-6 py-3 mb-8 hover:from-crypto-primary/20 hover:to-crypto-secondary/20 transition-all duration-300">
            <Zap className="w-4 h-4 text-crypto-accent animate-pulse" />
            <span className="text-sm font-medium bg-gradient-to-r from-crypto-primary to-crypto-accent bg-clip-text text-transparent">
              แพลตฟอร์มสอนคริปโต #1 ในไทย
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            เรียนรู้{" "}
            <span className="bg-gradient-to-r from-crypto-primary via-crypto-accent to-crypto-secondary bg-clip-text text-transparent animate-glow-pulse">
              คริปโต
            </span>
            <br />
            <span className="bg-gradient-to-r from-crypto-secondary to-crypto-primary bg-clip-text text-transparent">
              แบบมืออาชีพ
            </span>
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
            <Button className="bg-gradient-to-r from-crypto-primary via-crypto-accent to-crypto-secondary hover:from-crypto-secondary hover:via-crypto-primary hover:to-crypto-accent text-white font-bold px-8 py-4 rounded-xl shadow-crypto-lg hover:shadow-glow transition-all duration-300 hover:scale-105 group" size="lg">
              เริ่มเรียนฟรี
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-crypto-primary/50 text-crypto-primary hover:bg-crypto-primary/10 hover:border-crypto-primary hover:scale-105 transition-all duration-300 px-8 py-4 rounded-xl backdrop-blur-sm">
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