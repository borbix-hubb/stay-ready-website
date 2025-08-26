import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      {/* Space Background */}
      <div className="fixed inset-0">
        {/* Animated Stars */}
        <div className="absolute inset-0">
          {[...Array(150)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 4 + 3}s`,
              }}
            />
          ))}
        </div>
        
        {/* Large Glowing Stars */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={`glow-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 2}px`,
                height: `${Math.random() * 3 + 2}px`,
                background: `radial-gradient(circle, ${
                  ['#06b6d4', '#8b5cf6', '#f59e0b', '#ec4899'][Math.floor(Math.random() * 4)]
                }, transparent)`,
                animation: `pulse ${Math.random() * 4 + 3}s infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Nebula Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-cyan-900/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(245,158,11,0.06),transparent_40%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <Footer />
      </div>
    </div>
  );
};

export default Index;