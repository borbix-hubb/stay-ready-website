import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Clock, Users, PlayCircle, Search, Filter } from "lucide-react";

const courses = [
  {
    title: "Bitcoin & Cryptocurrency Fundamentals",
    description: "เรียนรู้พื้นฐานของ Bitcoin และสกุลเงินดิจิทัลอื่นๆ ตั้งแต่เริ่มต้น",
    image: "🪙",
    duration: "8 ชั่วโมง",
    students: 15420,
    rating: 4.9,
    level: "เริ่มต้น",
    price: "ฟรี",
    category: "พื้นฐาน",
    features: ["พื้นฐาน Blockchain", "วิธีการซื้อขาย", "การจัดเก็บที่ปลอดภัย"]
  },
  {
    title: "Advanced Trading Strategies",
    description: "กลยุทธ์การเทรดขั้นสูงสำหรับมืออาชีพ รวมถึงการวิเคราะห์ทางเทคนิค",
    image: "📈",
    duration: "12 ชั่วโมง",
    students: 8930,
    rating: 4.8,
    level: "ขั้นสูง",
    price: "2,999฿",
    category: "เทรดดิ้ง",
    features: ["Technical Analysis", "Risk Management", "Portfolio Optimization"]
  },
  {
    title: "DeFi & Yield Farming",
    description: "เข้าใจระบบการเงินแบบกระจายอำนาจและวิธีการทำกำไรจาก DeFi",
    image: "🌾",
    duration: "10 ชั่วโมง", 
    students: 6540,
    rating: 4.7,
    level: "กลาง",
    price: "1,999฿",
    category: "DeFi",
    features: ["Liquidity Mining", "Staking", "Smart Contracts"]
  },
  {
    title: "NFT & Web3 Development",
    description: "สร้างและเทรด NFT รวมถึงการพัฒนาแอปพลิเคชัน Web3",
    image: "🎨",
    duration: "15 ชั่วโมง",
    students: 4320,
    rating: 4.6,
    level: "ขั้นสูง", 
    price: "3,999฿",
    category: "พัฒนา",
    features: ["NFT Creation", "Smart Contract Dev", "Web3 Integration"]
  },
  {
    title: "Cryptocurrency Tax & Legal",
    description: "เรียนรู้เรื่องภาษีและกฎหมายที่เกี่ยวข้องกับการเทรดคริปโต",
    image: "⚖️",
    duration: "6 ชั่วโมง",
    students: 3210,
    rating: 4.5,
    level: "กลาง",
    price: "1,499฿",
    category: "กฎหมาย",
    features: ["Tax Planning", "Legal Compliance", "Record Keeping"]
  },
  {
    title: "Institutional Trading",
    description: "การเทรดแบบสถาบัน เรียนรู้กลยุทธ์ที่ใช้ในองค์กรขนาดใหญ่",
    image: "🏛️",
    duration: "20 ชั่วโมง",
    students: 1890,
    rating: 4.9,
    level: "ผู้เชี่ยวชาญ",
    price: "9,999฿",
    category: "เทรดดิ้ง",
    features: ["Algorithmic Trading", "Institutional Tools", "Advanced Analytics"]
  },
  {
    title: "Blockchain Development",
    description: "เรียนรู้การพัฒนา Blockchain และ Smart Contract ตั้งแต่พื้นฐาน",
    image: "⛓️",
    duration: "18 ชั่วโมง",
    students: 2560,
    rating: 4.7,
    level: "ขั้นสูง",
    price: "4,999฿",
    category: "พัฒนา",
    features: ["Solidity Programming", "Blockchain Architecture", "Security Auditing"]
  },
  {
    title: "Cryptocurrency Mining",
    description: "เข้าใจกระบวนการขุดเหรียญและการจัดการฟาร์มขุด",
    image: "⛏️",
    duration: "14 ชั่วโมง",
    students: 3890,
    rating: 4.6,
    level: "กลาง",
    price: "2,499฿",
    category: "การขุด",
    features: ["Mining Hardware", "Pool Mining", "Profitability Analysis"]
  }
];

const Courses = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                คอร์สเรียน{" "}
                <span className="gradient-text">ครบครัน</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                เรียนรู้จากผู้เชี่ยวชาญด้วยคอร์สที่ออกแบบมาเพื่อให้คุณเป็นมืออาชีพ
                ไม่ว่าจะเป็นมือใหม่หรือเทรดเดอร์ที่มีประสบการณ์
              </p>
            </div>

            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="ค้นหาคอร์สที่ต้องการ..." 
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="ระดับความยาก" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทุกระดับ</SelectItem>
                    <SelectItem value="beginner">เริ่มต้น</SelectItem>
                    <SelectItem value="intermediate">กลาง</SelectItem>
                    <SelectItem value="advanced">ขั้นสูง</SelectItem>
                    <SelectItem value="expert">ผู้เชี่ยวชาญ</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="หมวดหมู่" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทุกหมวดหมู่</SelectItem>
                    <SelectItem value="basic">พื้นฐาน</SelectItem>
                    <SelectItem value="trading">เทรดดิ้ง</SelectItem>
                    <SelectItem value="defi">DeFi</SelectItem>
                    <SelectItem value="development">พัฒนา</SelectItem>
                    <SelectItem value="legal">กฎหมาย</SelectItem>
                    <SelectItem value="mining">การขุด</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {courses.map((course, index) => (
                <Card 
                  key={course.title} 
                  className="crypto-card hover:scale-105 transition-all duration-300 animate-slide-up group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl mb-2">{course.image}</div>
                      <Badge 
                        variant="secondary" 
                        className={`
                          ${course.level === 'เริ่มต้น' ? 'bg-crypto-success/20 text-crypto-success' : ''}
                          ${course.level === 'กลาง' ? 'bg-crypto-warning/20 text-crypto-warning' : ''}
                          ${course.level === 'ขั้นสูง' ? 'bg-crypto-primary/20 text-crypto-primary' : ''}
                          ${course.level === 'ผู้เชี่ยวชาญ' ? 'bg-crypto-secondary/20 text-crypto-secondary' : ''}
                        `}
                      >
                        {course.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mb-2 group-hover:text-crypto-primary transition-colors line-clamp-2">
                      {course.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {course.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.students.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-crypto-warning text-crypto-warning" />
                        <span className="font-medium">{course.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({course.students.toLocaleString()} รีวิว)
                      </span>
                    </div>

                    <div className="space-y-2">
                      {course.features.slice(0, 2).map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-crypto-accent" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-crypto-primary/20">
                      <div className="text-xl font-bold text-crypto-accent">
                        {course.price}
                      </div>
                      <Button className="crypto-button group" size="sm">
                        <PlayCircle className="w-4 h-4 mr-2" />
                        เริ่มเรียน
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-16">
              <Button className="crypto-button" size="lg">
                โหลดคอร์สเพิ่มเติม
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;