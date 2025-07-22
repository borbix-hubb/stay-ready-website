import { Bitcoin, Mail, Phone, MapPin, Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-card/30 border-t border-crypto-primary/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bitcoin className="w-8 h-8 text-crypto-primary" />
              <span className="text-2xl font-bold gradient-text">CryptoLearn Pro</span>
            </div>
            <p className="text-muted-foreground">
              แพลตฟอร์มสอนคริปโตที่ครบครันที่สุดในไทย 
              พร้อมนำคุณสู่ความสำเร็จในโลกของสกุลเงินดิจิทัล
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="border-crypto-primary/30">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-crypto-primary/30">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-crypto-primary/30">
                <Youtube className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-crypto-primary/30">
                <Instagram className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-crypto-accent">เมนูหลัก</h3>
            <div className="space-y-3">
              <a href="#" className="block text-muted-foreground hover:text-crypto-primary transition-colors">
                หน้าแรก
              </a>
              <a href="#" className="block text-muted-foreground hover:text-crypto-primary transition-colors">
                คอร์สเรียน
              </a>
              <a href="#" className="block text-muted-foreground hover:text-crypto-primary transition-colors">
                แพ็กเกจ
              </a>
              <a href="#" className="block text-muted-foreground hover:text-crypto-primary transition-colors">
                เกี่ยวกับเรา
              </a>
              <a href="#" className="block text-muted-foreground hover:text-crypto-primary transition-colors">
                ติดต่อ
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-crypto-accent">การสนับสนุน</h3>
            <div className="space-y-3">
              <a href="#" className="block text-muted-foreground hover:text-crypto-primary transition-colors">
                คำถามที่พบบ่อย
              </a>
              <a href="#" className="block text-muted-foreground hover:text-crypto-primary transition-colors">
                ศูนย์ช่วยเหลือ
              </a>
              <a href="#" className="block text-muted-foreground hover:text-crypto-primary transition-colors">
                คอมมูนิตี้
              </a>
              <a href="#" className="block text-muted-foreground hover:text-crypto-primary transition-colors">
                นโยบายความเป็นส่วนตัว
              </a>
              <a href="#" className="block text-muted-foreground hover:text-crypto-primary transition-colors">
                เงื่อนไขการใช้งาน
              </a>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-crypto-accent">ติดต่อเรา</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-crypto-primary" />
                <span className="text-muted-foreground">support@cryptolearnpro.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-crypto-primary" />
                <span className="text-muted-foreground">02-xxx-xxxx</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-crypto-primary" />
                <span className="text-muted-foreground">Bangkok, Thailand</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">รับข่าวสารล่าสุด</h4>
              <div className="flex gap-2">
                <Input 
                  placeholder="อีเมลของคุณ" 
                  className="bg-card border-crypto-primary/30 text-sm"
                />
                <Button className="crypto-button px-4">
                  สมัคร
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                รับข้อมูลตลาด signal และข่าวสารใหม่ๆ ก่อนใคร
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-crypto-primary/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 CryptoLearn Pro. สงวนลิขสิทธิ์ทุกประการ
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="text-crypto-success">✓ SSL Secured</span>
            <span className="text-crypto-success">✓ 24/7 Support</span>
            <span className="text-crypto-success">✓ Money Back Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;