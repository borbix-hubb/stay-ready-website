import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ติดต่อเรา
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              พร้อมช่วยเหลือและตอบคำถามเกี่ยวกับการเทรด Crypto ทุกเรื่อง
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>ส่งข้อความถึงเรา</CardTitle>
                <CardDescription>
                  กรอกข้อมูลและข้อความ เราจะติดต่อกลับภายใน 24 ชั่วโมง
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">ชื่อ</label>
                    <Input placeholder="ชื่อของคุณ" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">นามสกุล</label>
                    <Input placeholder="นามสกุลของคุณ" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">อีเมล</label>
                  <Input type="email" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">หัวข้อ</label>
                  <Input placeholder="หัวข้อที่ต้องการสอบถาม" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">ข้อความ</label>
                  <Textarea 
                    placeholder="รายละเอียดที่ต้องการสอบถาม..."
                    className="min-h-32"
                  />
                </div>
                <Button className="w-full">ส่งข้อความ</Button>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card className="bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">อีเมล</h3>
                      <p className="text-muted-foreground">support@cryptoacademy.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">โทรศัพท์</h3>
                      <p className="text-muted-foreground">02-123-4567</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">ที่อยู่</h3>
                      <p className="text-muted-foreground">
                        123 ถนนสุขุมวิท แขวงคลองตัน<br />
                        เขตวัฒนา กรุงเทพฯ 10110
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">เวลาทำการ</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>จันทร์ - ศุกร์: 9:00 - 18:00</p>
                    <p>เสาร์ - อาทิตย์: 10:00 - 16:00</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;