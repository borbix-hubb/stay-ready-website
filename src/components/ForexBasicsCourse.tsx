import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  Globe, 
  BarChart3, 
  Calculator,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Info,
  Target,
  Zap,
  Award,
  Users,
  Star
} from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  duration: string;
  icon: any;
  description: string;
  content: React.ReactNode;
}

const ForexBasicsCourse = () => {
  const [selectedChapter, setSelectedChapter] = useState<string>("intro");
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);

  const markAsComplete = (chapterId: string) => {
    if (!completedChapters.includes(chapterId)) {
      setCompletedChapters([...completedChapters, chapterId]);
    }
  };

  const chapters: Chapter[] = [
    {
      id: "intro",
      title: "บทนำ: ทำความรู้จัก Forex",
      duration: "15 นาที",
      icon: Globe,
      description: "เรียนรู้พื้นฐานและโครงสร้างตลาด Forex",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 p-6 rounded-xl border border-blue-500/30">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Globe className="w-8 h-8 text-blue-400" />
              Forex คืออะไร?
            </h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              <strong className="text-cyan-400">Forex (Foreign Exchange)</strong> คือตลาดแลกเปลี่ยนเงินตราต่างประเทศที่ใหญ่ที่สุดในโลก 
              มีมูลค่าการซื้อขายต่อวันมากกว่า <span className="text-amber-400 font-bold">6.6 ล้านล้านดอลลาร์สหรัฐ</span>
            </p>
            
            <div className="bg-slate-900/50 p-4 rounded-lg mb-4">
              <h4 className="text-lg font-semibold text-cyan-400 mb-3">🎯 หลักการทำงาน</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <span className="text-slate-300">ซื้อสกุลเงินหนึ่ง และขายอีกสกุลหนึ่งพร้อมกัน</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <span className="text-slate-300">เทรดเป็นคู่เงิน เช่น EUR/USD, GBP/JPY</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <span className="text-slate-300">ตลาดเปิด 24 ชั่วโมง จันทร์-ศุกร์</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-slate-900/50 border-green-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-400 text-lg">✅ ข้อดีของ Forex</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li>• สภาพคล่องสูงมาก</li>
                    <li>• ค่าธรรมเนียมต่ำ</li>
                    <li>• ใช้ Leverage ได้</li>
                    <li>• เทรดได้ทั้งขาขึ้นและขาลง</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-amber-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-amber-400 text-lg">⚠️ สิ่งที่ต้องระวัง</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li>• ความผันผวนสูง</li>
                    <li>• ต้องใช้ความรู้และประสบการณ์</li>
                    <li>• มีความเสี่ยงจาก Leverage</li>
                    <li>• ต้องติดตามข่าวสารตลอด</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-6 rounded-xl border border-purple-500/30">
            <h3 className="text-xl font-bold text-white mb-4">💡 ตัวอย่างการเทรด</h3>
            <div className="bg-slate-900/50 p-4 rounded-lg">
              <p className="text-slate-300 mb-2">
                สมมติคุณคิดว่า <span className="text-cyan-400">ยูโร (EUR)</span> จะแข็งค่าเทียบกับ <span className="text-amber-400">ดอลลาร์สหรัฐ (USD)</span>
              </p>
              <div className="space-y-2 mt-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600">ซื้อ</Badge>
                  <span className="text-slate-300">EUR/USD ที่ราคา 1.0800</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600">รอ</Badge>
                  <span className="text-slate-300">ราคาขึ้นไปที่ 1.0900</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-600">ขาย</Badge>
                  <span className="text-slate-300">ทำกำไร 100 pips!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "comparison",
      title: "เปรียบเทียบ Forex vs หุ้น vs คริปโต",
      duration: "20 นาที",
      icon: BarChart3,
      description: "เข้าใจความแตกต่างของแต่ละตลาด",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-4">📊 เปรียบเทียบ 3 ตลาดยอดนิยม</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left p-3 text-slate-400">หัวข้อ</th>
                  <th className="text-center p-3 text-cyan-400">💱 Forex</th>
                  <th className="text-center p-3 text-green-400">📈 หุ้น</th>
                  <th className="text-center p-3 text-amber-400">🪙 คริปโต</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <td className="p-3 font-semibold">เวลาเทรด</td>
                  <td className="p-3 text-center">24 ชม. (จ-ศ)</td>
                  <td className="p-3 text-center">ตามตลาดหุ้น</td>
                  <td className="p-3 text-center">24/7</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="p-3 font-semibold">สภาพคล่อง</td>
                  <td className="p-3 text-center text-green-400">สูงมาก</td>
                  <td className="p-3 text-center text-amber-400">ปานกลาง-สูง</td>
                  <td className="p-3 text-center text-amber-400">ปานกลาง</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="p-3 font-semibold">ความผันผวน</td>
                  <td className="p-3 text-center text-amber-400">ปานกลาง</td>
                  <td className="p-3 text-center text-green-400">ต่ำ-ปานกลาง</td>
                  <td className="p-3 text-center text-red-400">สูงมาก</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="p-3 font-semibold">Leverage</td>
                  <td className="p-3 text-center">1:100-1:500</td>
                  <td className="p-3 text-center">1:2-1:10</td>
                  <td className="p-3 text-center">1:2-1:100</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="p-3 font-semibold">เงินขั้นต่ำ</td>
                  <td className="p-3 text-center text-green-400">ต่ำ ($10+)</td>
                  <td className="p-3 text-center">ปานกลาง</td>
                  <td className="p-3 text-center text-green-400">ต่ำ ($10+)</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="p-3 font-semibold">การควบคุม</td>
                  <td className="p-3 text-center">มีหน่วยงานกำกับ</td>
                  <td className="p-3 text-center">มีหน่วยงานกำกับ</td>
                  <td className="p-3 text-center text-amber-400">น้อย/ไม่มี</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-cyan-400">💱 Forex เหมาะกับ</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>✓ ผู้ที่ชอบเทรดระยะสั้น</li>
                  <li>✓ ต้องการสภาพคล่องสูง</li>
                  <li>✓ มีเวลาเทรดไม่แน่นอน</li>
                  <li>✓ ชอบวิเคราะห์เศรษฐกิจมหภาค</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400">📈 หุ้นเหมาะกับ</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>✓ นักลงทุนระยะยาว</li>
                  <li>✓ ชอบวิเคราะห์บริษัท</li>
                  <li>✓ ต้องการเงินปันผล</li>
                  <li>✓ เน้นความมั่นคง</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 border-amber-500/30">
              <CardHeader>
                <CardTitle className="text-amber-400">🪙 คริปโตเหมาะกับ</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>✓ ชอบความท้าทาย</li>
                  <li>✓ รับความเสี่ยงได้สูง</li>
                  <li>✓ สนใจเทคโนโลยี</li>
                  <li>✓ ต้องการผลตอบแทนสูง</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: "pairs",
      title: "ประเภทคู่เงิน Major, Minor, Exotic",
      duration: "25 นาที",
      icon: DollarSign,
      description: "รู้จักคู่เงินแต่ละประเภทและวิธีเลือกเทรด",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-4">💰 ประเภทของคู่เงิน</h3>

          {/* Major Pairs */}
          <Card className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 text-xl flex items-center gap-2">
                <Star className="w-6 h-6" />
                Major Pairs (คู่เงินหลัก)
              </CardTitle>
              <CardDescription className="text-slate-400">
                คู่เงินที่มี USD และเป็นคู่ที่นิยมเทรดมากที่สุด
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {[
                  { pair: "EUR/USD", name: "ยูโร/ดอลลาร์", spread: "0.1-0.3" },
                  { pair: "GBP/USD", name: "ปอนด์/ดอลลาร์", spread: "0.5-1.0" },
                  { pair: "USD/JPY", name: "ดอลลาร์/เยน", spread: "0.2-0.5" },
                  { pair: "USD/CHF", name: "ดอลลาร์/ฟรังก์", spread: "0.5-1.0" },
                  { pair: "AUD/USD", name: "ดอลลาร์ออส/ดอลลาร์", spread: "0.3-0.7" },
                  { pair: "USD/CAD", name: "ดอลลาร์/ดอลลาร์แคนาดา", spread: "0.5-1.0" },
                  { pair: "NZD/USD", name: "ดอลลาร์นิวซีแลนด์/ดอลลาร์", spread: "0.8-1.5" }
                ].map((item) => (
                  <div key={item.pair} className="bg-slate-900/50 p-3 rounded-lg">
                    <div className="font-bold text-cyan-400">{item.pair}</div>
                    <div className="text-xs text-slate-400">{item.name}</div>
                    <div className="text-xs text-green-400 mt-1">Spread: {item.spread} pips</div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-900/50 p-3 rounded-lg">
                <p className="text-sm text-slate-300">
                  <strong className="text-green-400">ข้อดี:</strong> สภาพคล่องสูง, Spread ต่ำ, ข่าวสารหาง่าย, เหมาะมือใหม่
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Minor Pairs */}
          <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400 text-xl flex items-center gap-2">
                <Target className="w-6 h-6" />
                Minor Pairs (คู่เงินรอง)
              </CardTitle>
              <CardDescription className="text-slate-400">
                คู่เงินสกุลหลักที่ไม่มี USD
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {[
                  { pair: "EUR/GBP", name: "ยูโร/ปอนด์", spread: "0.8-2.0" },
                  { pair: "EUR/JPY", name: "ยูโร/เยน", spread: "1.0-2.5" },
                  { pair: "GBP/JPY", name: "ปอนด์/เยน", spread: "1.5-3.0" },
                  { pair: "EUR/CHF", name: "ยูโร/ฟรังก์", spread: "1.0-2.0" },
                  { pair: "GBP/CHF", name: "ปอนด์/ฟรังก์", spread: "2.0-4.0" },
                  { pair: "AUD/JPY", name: "ดอลลาร์ออส/เยน", spread: "1.2-2.5" }
                ].map((item) => (
                  <div key={item.pair} className="bg-slate-900/50 p-3 rounded-lg">
                    <div className="font-bold text-blue-400">{item.pair}</div>
                    <div className="text-xs text-slate-400">{item.name}</div>
                    <div className="text-xs text-amber-400 mt-1">Spread: {item.spread} pips</div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-900/50 p-3 rounded-lg">
                <p className="text-sm text-slate-300">
                  <strong className="text-blue-400">ข้อดี:</strong> ความผันผวนปานกลาง, โอกาสทำกำไรดี
                </p>
                <p className="text-sm text-slate-300 mt-1">
                  <strong className="text-amber-400">ข้อควรระวัง:</strong> Spread กว้างกว่า Major, สภาพคล่องน้อยกว่า
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Exotic Pairs */}
          <Card className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400 text-xl flex items-center gap-2">
                <Zap className="w-6 h-6" />
                Exotic Pairs (คู่เงินแปลกใหม่)
              </CardTitle>
              <CardDescription className="text-slate-400">
                คู่เงินที่มีสกุลเงินจากประเทศกำลังพัฒนา
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {[
                  { pair: "USD/THB", name: "ดอลลาร์/บาท", spread: "20-50" },
                  { pair: "USD/MXN", name: "ดอลลาร์/เปโซ", spread: "50-200" },
                  { pair: "USD/ZAR", name: "ดอลลาร์/แรนด์", spread: "80-300" },
                  { pair: "EUR/TRY", name: "ยูโร/ลีรา", spread: "100-500" },
                  { pair: "USD/SGD", name: "ดอลลาร์/ดอลลาร์สิงคโปร์", spread: "3-10" },
                  { pair: "USD/HKD", name: "ดอลลาร์/ดอลลาร์ฮ่องกง", spread: "5-15" }
                ].map((item) => (
                  <div key={item.pair} className="bg-slate-900/50 p-3 rounded-lg">
                    <div className="font-bold text-red-400">{item.pair}</div>
                    <div className="text-xs text-slate-400">{item.name}</div>
                    <div className="text-xs text-red-400 mt-1">Spread: {item.spread} pips</div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-900/50 p-3 rounded-lg">
                <p className="text-sm text-slate-300">
                  <strong className="text-amber-400">⚠️ คำเตือน:</strong> Spread สูงมาก, ความผันผวนสูง, เหมาะกับมือโปรเท่านั้น
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <div className="bg-gradient-to-r from-amber-600/20 to-yellow-600/20 p-4 rounded-xl border border-amber-500/30">
            <h4 className="text-amber-400 font-bold mb-2 flex items-center gap-2">
              <Info className="w-5 h-5" />
              💡 เคล็ดลับการเลือกคู่เงิน
            </h4>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• <strong>มือใหม่:</strong> เริ่มจาก Major Pairs เช่น EUR/USD</li>
              <li>• <strong>ทุนน้อย:</strong> เลือกคู่ที่ Spread ต่ำ</li>
              <li>• <strong>ชอบความท้าทาย:</strong> ลอง Minor Pairs</li>
              <li>• <strong>หลีกเลี่ยง Exotic:</strong> จนกว่าจะมีประสบการณ์มากพอ</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "sessions",
      title: "เวลาเปิด-ปิดตลาด & ช่วงเวลาทอง",
      duration: "20 นาที",
      icon: Clock,
      description: "เรียนรู้เวลาที่เหมาะสมในการเทรด",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-4">⏰ ตารางเวลาตลาด Forex</h3>

          {/* Market Sessions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-400">🏙️ Sydney Session</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-slate-300">
                  <p><strong>เวลาไทย:</strong> 04:00 - 13:00 น.</p>
                  <p><strong>คู่เงินที่เคลื่อนไหว:</strong> AUD, NZD pairs</p>
                  <p className="text-sm text-amber-400">💡 ตลาดค่อนข้างเงียบ เหมาะกับ Scalping</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-600/20 to-pink-600/20 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-400">🗾 Tokyo Session</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-slate-300">
                  <p><strong>เวลาไทย:</strong> 07:00 - 16:00 น.</p>
                  <p><strong>คู่เงินที่เคลื่อนไหว:</strong> JPY, AUD pairs</p>
                  <p className="text-sm text-amber-400">💡 สภาพคล่องปานกลาง เหมาะกับ Asian Range</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400">🏰 London Session</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-slate-300">
                  <p><strong>เวลาไทย:</strong> 14:00 - 23:00 น. (ฤดูร้อน)</p>
                  <p><strong>เวลาไทย:</strong> 15:00 - 00:00 น. (ฤดูหนาว)</p>
                  <p><strong>คู่เงินที่เคลื่อนไหว:</strong> EUR, GBP, CHF pairs</p>
                  <p className="text-sm text-green-400">⭐ สภาพคล่องสูงสุด! เหมาะกับทุกสไตล์</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600/20 to-violet-600/20 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400">🗽 New York Session</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-slate-300">
                  <p><strong>เวลาไทย:</strong> 19:00 - 04:00 น. (ฤดูร้อน)</p>
                  <p><strong>เวลาไทย:</strong> 20:00 - 05:00 น. (ฤดูหนาว)</p>
                  <p><strong>คู่เงินที่เคลื่อนไหว:</strong> USD, CAD pairs</p>
                  <p className="text-sm text-purple-400">⭐ สภาพคล่องสูง โดยเฉพาะช่วง Overlap</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Golden Hours */}
          <Card className="bg-gradient-to-r from-amber-600/20 to-yellow-600/20 border-amber-500/30">
            <CardHeader>
              <CardTitle className="text-amber-400 text-xl">🏆 ช่วงเวลาทอง (Golden Hours)</CardTitle>
              <CardDescription className="text-slate-400">
                ช่วงที่ตลาดซ้อนกัน มีสภาพคล่องสูงสุด
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="text-green-400 font-bold mb-2">✨ London-New York Overlap</h4>
                  <p className="text-slate-300">⏰ เวลาไทย: 19:00 - 23:00 น. (ฤดูร้อน) / 20:00 - 00:00 น. (ฤดูหนาว)</p>
                  <p className="text-sm text-slate-400 mt-1">สภาพคล่องสูงที่สุดของวัน! มีการเคลื่อนไหว 70% ของปริมาณการซื้อขายทั้งหมด</p>
                  <Badge className="mt-2 bg-green-600">แนะนำมากที่สุด</Badge>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="text-blue-400 font-bold mb-2">🌅 Tokyo-London Overlap</h4>
                  <p className="text-slate-300">⏰ เวลาไทย: 14:00 - 16:00 น.</p>
                  <p className="text-sm text-slate-400 mt-1">สภาพคล่องปานกลาง เหมาะกับคู่เงิน EUR/JPY, GBP/JPY</p>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-purple-500">
                  <h4 className="text-purple-400 font-bold mb-2">🌏 Sydney-Tokyo Overlap</h4>
                  <p className="text-slate-300">⏰ เวลาไทย: 07:00 - 13:00 น.</p>
                  <p className="text-sm text-slate-400 mt-1">เหมาะกับคู่เงิน AUD, NZD, JPY</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Times to Avoid */}
          <Card className="bg-gradient-to-r from-red-600/20 to-rose-600/20 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400">⚠️ ช่วงเวลาที่ควรหลีกเลี่ยง</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                  <div>
                    <strong>วันศุกร์หลัง 22:00 น.:</strong> ตลาดเริ่มเบาบาง Spread กว้าง
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                  <div>
                    <strong>วันจันทร์ก่อน 07:00 น.:</strong> ตลาดเพิ่งเปิด มี Gap Risk
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                  <div>
                    <strong>ช่วงข่าวสำคัญ:</strong> NFP, FOMC, Central Bank Meetings
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                  <div>
                    <strong>วันหยุดสำคัญ:</strong> Christmas, New Year, Bank Holidays
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "lotsize",
      title: "Lot Size, Pip, Point และการคำนวณ",
      duration: "30 นาที",
      icon: Calculator,
      description: "เข้าใจหน่วยและการคำนวณพื้นฐาน",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-4">📏 หน่วยพื้นฐานใน Forex</h3>

          {/* Lot Size */}
          <Card className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400 text-xl">📦 Lot Size (ขนาดสัญญา)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="text-cyan-400 font-bold mb-2">Standard Lot</h4>
                  <p className="text-2xl font-bold text-white">100,000</p>
                  <p className="text-sm text-slate-400">หน่วยสกุลเงินฐาน</p>
                  <p className="text-xs text-amber-400 mt-2">1 pip = $10</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="text-green-400 font-bold mb-2">Mini Lot</h4>
                  <p className="text-2xl font-bold text-white">10,000</p>
                  <p className="text-sm text-slate-400">หน่วยสกุลเงินฐาน</p>
                  <p className="text-xs text-amber-400 mt-2">1 pip = $1</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="text-purple-400 font-bold mb-2">Micro Lot</h4>
                  <p className="text-2xl font-bold text-white">1,000</p>
                  <p className="text-sm text-slate-400">หน่วยสกุลเงินฐาน</p>
                  <p className="text-xs text-amber-400 mt-2">1 pip = $0.10</p>
                </div>
              </div>

              <div className="bg-amber-600/20 p-4 rounded-lg border border-amber-500/30">
                <p className="text-sm text-slate-300">
                  <strong className="text-amber-400">💡 เคล็ดลับ:</strong> มือใหม่ควรเริ่มจาก Micro Lot (0.01) เพื่อจำกัดความเสี่ยง
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Pip & Point */}
          <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 text-xl">🎯 Pip และ Point</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="text-pink-400 font-bold mb-3">Pip (Percentage in Point)</h4>
                  <p className="text-slate-300 text-sm mb-2">หน่วยที่เล็กที่สุดของการเคลื่อนไหวราคา</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">EUR/USD</span>
                      <span className="text-cyan-400">1.08<span className="text-amber-400 font-bold">5</span>4</span>
                    </div>
                    <p className="text-xs text-slate-500">ตำแหน่งที่ 4 (0.0001)</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="text-purple-400 font-bold mb-3">Point</h4>
                  <p className="text-slate-300 text-sm mb-2">ตำแหน่งทศนิยมที่ 5 (1 pip = 10 points)</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">EUR/USD</span>
                      <span className="text-cyan-400">1.085<span className="text-green-400 font-bold">4</span></span>
                    </div>
                    <p className="text-xs text-slate-500">ตำแหน่งที่ 5 (0.00001)</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-slate-900/50 p-4 rounded-lg">
                <h4 className="text-amber-400 font-bold mb-2">⚠️ ข้อยกเว้น: คู่เงินที่มี JPY</h4>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">USD/JPY</span>
                  <span className="text-cyan-400">110.<span className="text-amber-400 font-bold">5</span>6</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Pip อยู่ที่ตำแหน่งที่ 2 (0.01)</p>
              </div>
            </CardContent>
          </Card>

          {/* Calculation Examples */}
          <Card className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 text-xl">🧮 ตัวอย่างการคำนวณกำไร/ขาดทุน</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="text-cyan-400 font-bold mb-3">📈 ตัวอย่างที่ 1: EUR/USD</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-slate-300">• ซื้อ 0.1 Lot (10,000 units) ที่ 1.0850</p>
                    <p className="text-slate-300">• ขายที่ 1.0900</p>
                    <p className="text-slate-300">• กำไร = 50 pips</p>
                    <div className="mt-2 p-2 bg-green-600/20 rounded">
                      <p className="text-green-400 font-bold">💰 กำไร = 50 pips × $1 = $50</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="text-purple-400 font-bold mb-3">📉 ตัวอย่างที่ 2: GBP/JPY</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-slate-300">• ขาย 0.01 Lot (1,000 units) ที่ 150.50</p>
                    <p className="text-slate-300">• ปิดที่ 151.00</p>
                    <p className="text-slate-300">• ขาดทุน = 50 pips</p>
                    <div className="mt-2 p-2 bg-red-600/20 rounded">
                      <p className="text-red-400 font-bold">💸 ขาดทุน = 50 pips × $0.10 = $5</p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-600/20 p-4 rounded-lg border border-amber-500/30">
                  <h4 className="text-amber-400 font-bold mb-2">📝 สูตรคำนวณ</h4>
                  <code className="text-cyan-400 text-sm">
                    กำไร/ขาดทุน = (ราคาปิด - ราคาเปิด) × Lot Size × Contract Size
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "fees",
      title: "ค่าธรรมเนียม: Spread, Commission, Swap",
      duration: "15 นาที",
      icon: TrendingUp,
      description: "เข้าใจต้นทุนการเทรดทั้งหมด",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-4">💸 ค่าธรรมเนียมในการเทรด Forex</h3>

          {/* Spread */}
          <Card className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400 text-xl">📊 Spread (ส่วนต่างราคา)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900/50 p-4 rounded-lg mb-4">
                <p className="text-slate-300 mb-3">
                  Spread คือส่วนต่างระหว่างราคา <span className="text-green-400 font-bold">Bid</span> (ขาย) และ <span className="text-red-400 font-bold">Ask</span> (ซื้อ)
                </p>
                <div className="flex items-center justify-center gap-4 p-4 bg-slate-950/50 rounded">
                  <div className="text-center">
                    <p className="text-sm text-slate-400">Bid (ขาย)</p>
                    <p className="text-2xl font-bold text-green-400">1.0850</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-slate-400">Ask (ซื้อ)</p>
                    <p className="text-2xl font-bold text-red-400">1.0852</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-slate-400">Spread</p>
                    <p className="text-2xl font-bold text-amber-400">2 pips</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-600/20 p-3 rounded-lg">
                  <h4 className="text-green-400 font-bold mb-2">Fixed Spread</h4>
                  <p className="text-sm text-slate-300">• Spread คงที่ตลอด</p>
                  <p className="text-sm text-slate-300">• เหมาะกับมือใหม่</p>
                  <p className="text-sm text-slate-300">• แพงกว่าเล็กน้อย</p>
                </div>
                <div className="bg-blue-600/20 p-3 rounded-lg">
                  <h4 className="text-blue-400 font-bold mb-2">Variable Spread</h4>
                  <p className="text-sm text-slate-300">• Spread เปลี่ยนตามตลาด</p>
                  <p className="text-sm text-slate-300">• ถูกกว่าในช่วงปกติ</p>
                  <p className="text-sm text-slate-300">• กว้างช่วงข่าว</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commission */}
          <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 text-xl">💰 Commission (ค่าคอมมิชชั่น)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900/50 p-4 rounded-lg">
                <p className="text-slate-300 mb-3">
                  ค่าธรรมเนียมที่โบรกเกอร์เรียกเก็บต่อการเทรด (บางโบรกเกอร์)
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">ECN Account</span>
                    <span className="text-purple-400">$3-7 ต่อ 1 Lot (รอบ)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Standard Account</span>
                    <span className="text-green-400">ไม่มี Commission (Spread อาจสูงกว่า)</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-amber-600/20 rounded-lg">
                <p className="text-sm text-slate-300">
                  <strong className="text-amber-400">💡 เคล็ดลับ:</strong> เปรียบเทียบ Spread + Commission รวมกันเพื่อหาต้นทุนที่แท้จริง
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Swap */}
          <Card className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-400 text-xl">🔄 Swap (ดอกเบี้ยข้ามคืน)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900/50 p-4 rounded-lg">
                <p className="text-slate-300 mb-3">
                  ค่าธรรมเนียมหรือผลตอบแทนจากการถือสถานะข้ามคืน (Rollover)
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-green-600/20 rounded">
                    <p className="text-green-400 font-bold mb-1">Positive Swap (+)</p>
                    <p className="text-sm text-slate-300">ได้รับดอกเบี้ย เมื่อสกุลเงินที่ซื้อมีดอกเบี้ยสูงกว่า</p>
                  </div>
                  <div className="p-3 bg-red-600/20 rounded">
                    <p className="text-red-400 font-bold mb-1">Negative Swap (-)</p>
                    <p className="text-sm text-slate-300">จ่ายดอกเบี้ย เมื่อสกุลเงินที่ซื้อมีดอกเบี้ยต่ำกว่า</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-slate-900/50 rounded-lg">
                <h4 className="text-amber-400 font-bold mb-2">⏰ Triple Swap</h4>
                <p className="text-sm text-slate-300">
                  วันพุธ Swap จะคิด 3 เท่า (รวมวันเสาร์-อาทิตย์)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cost Summary */}
          <Card className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 text-xl">📋 สรุปต้นทุนการเทรด</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900/50 p-4 rounded-lg">
                <h4 className="text-cyan-400 font-bold mb-3">ตัวอย่างการคำนวณต้นทุน</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-300">เทรด EUR/USD 1 Lot (100,000 units)</p>
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Spread (2 pips)</span>
                      <span className="text-amber-400">$20</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Commission</span>
                      <span className="text-amber-400">$5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Swap (ถือ 1 คืน)</span>
                      <span className="text-amber-400">-$2</span>
                    </div>
                    <div className="border-t border-slate-700 pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span className="text-slate-300">ต้นทุนรวม</span>
                        <span className="text-red-400">$27</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-green-600/20 rounded-lg">
                  <h4 className="text-green-400 font-bold mb-1">✅ วิธีลดต้นทุน</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• เทรดช่วง Spread แคบ</li>
                    <li>• เลือกโบรกเกอร์ค่าธรรมเนียมต่ำ</li>
                    <li>• ไม่ถือข้ามคืนถ้า Swap ติดลบ</li>
                  </ul>
                </div>
                <div className="p-3 bg-amber-600/20 rounded-lg">
                  <h4 className="text-amber-400 font-bold mb-1">⚠️ ข้อควรระวัง</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Spread กว้างช่วงข่าว</li>
                    <li>• Commission แฝง</li>
                    <li>• Swap สูงคู่ Exotic</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "tools",
      title: "เครื่องมือและแพลตฟอร์มการเทรด Forex",
      duration: "25 นาที",
      icon: Users,
      description: "เลือกโบรกเกอร์และแพลตฟอร์มที่เหมาะสม",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-4">🔧 เครื่องมือและแพลตฟอร์มการเทรด Forex</h3>

          {/* Broker Selection */}
          <Card className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400 text-xl">🏦 วิธีเลือกโบรกเกอร์</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Regulation (การควบคุม)
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>✅ <strong>FCA (UK)</strong> - เข้มงวดสุด</li>
                      <li>✅ <strong>CYSEC (Cyprus)</strong> - มาตรฐานยุโรป</li>
                      <li>✅ <strong>ASIC (Australia)</strong> - น่าเชื่อถือ</li>
                      <li>⚠️ <strong>Offshore</strong> - ตรวจสอบให้ดี</li>
                    </ul>
                  </div>
                  
                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h4 className="text-amber-400 font-bold mb-2 flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      ค่าธรรมเนียม
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• <strong>Spread:</strong> 0.1-3.0 pips</li>
                      <li>• <strong>Commission:</strong> $0-7/lot</li>
                      <li>• <strong>Deposit/Withdrawal:</strong> ฟรี-3%</li>
                      <li>• <strong>Inactivity Fee:</strong> ตรวจสอบ</li>
                    </ul>
                  </div>
                  
                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h4 className="text-purple-400 font-bold mb-2 flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      ความน่าเชื่อถือ
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• <strong>Segregated Accounts</strong></li>
                      <li>• <strong>Negative Balance Protection</strong></li>
                      <li>• <strong>Insurance Fund</strong></li>
                      <li>• <strong>Review จากผู้ใช้</strong></li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-amber-600/20 p-4 rounded-lg border border-amber-500/30">
                  <h4 className="text-amber-400 font-bold mb-2">💡 เคล็ดลับการเลือกโบรกเกอร์</h4>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li>1. ตรวจสอบ License จากหน่วยงานกำกับดูแลที่น่าเชื่อถือ</li>
                    <li>2. เทสกับ Demo Account ก่อน</li>
                    <li>3. อ่านรีวิวจากหลายแหล่ง</li>
                    <li>4. ทดสอบ Customer Support</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trading Platforms */}
          <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 text-xl">📱 แพลตฟอร์มการเทรดยอดนิยม</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* MT4 */}
                  <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      MetaTrader 4 (MT4)
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="text-green-400">✅ ข้อดี:</div>
                      <ul className="text-slate-300 space-y-1">
                        <li>• ใช้งานง่าย เสถียร</li>
                        <li>• Expert Advisor (EA) เยอะ</li>
                        <li>• Custom Indicator หลากหลาย</li>
                        <li>• โบรกเกอร์รองรับมาก</li>
                      </ul>
                      <div className="text-amber-400 mt-3">⚠️ ข้อจำกัด:</div>
                      <ul className="text-slate-300 space-y-1">
                        <li>• ไม่อัปเดตแล้ว</li>
                        <li>• ไม่รองรับ Timeframe ใหม่</li>
                      </ul>
                    </div>
                  </div>

                  {/* MT5 */}
                  <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="text-green-400 font-bold mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      MetaTrader 5 (MT5)
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="text-green-400">✅ ข้อดี:</div>
                      <ul className="text-slate-300 space-y-1">
                        <li>• Timeframe ครบ (21 TF)</li>
                        <li>• Economic Calendar ในตัว</li>
                        <li>• Depth of Market</li>
                        <li>• การจัดการออเดอร์ดีกว่า</li>
                      </ul>
                      <div className="text-amber-400 mt-3">⚠️ ข้อจำกัด:</div>
                      <ul className="text-slate-300 space-y-1">
                        <li>• EA น้อยกว่า MT4</li>
                        <li>• โบรกเกอร์รองรับน้อยกว่า</li>
                      </ul>
                    </div>
                  </div>

                  {/* TradingView */}
                  <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-cyan-500">
                    <h4 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      TradingView
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="text-green-400">✅ ข้อดี:</div>
                      <ul className="text-slate-300 space-y-1">
                        <li>• Chart สวยที่สุด</li>
                        <li>• Indicator เยอะมาก</li>
                        <li>• Social Trading</li>
                        <li>• Multi-market รวมอยู่</li>
                      </ul>
                      <div className="text-amber-400 mt-3">⚠️ ข้อจำกัด:</div>
                      <ul className="text-slate-300 space-y-1">
                        <li>• เทรดผ่าน Broker บางราย</li>
                        <li>• ฟีเจอร์ครบต้องจ่าย</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="text-blue-400 font-bold mb-2">🎯 แนะนำสำหรับมือใหม่</h4>
                  <p className="text-sm text-slate-300">
                    เริ่มด้วย <strong className="text-cyan-400">MT4</strong> เพื่อเรียนรู้พื้นฐาน → 
                    ย้ายไป <strong className="text-green-400">MT5</strong> เมื่อต้องการฟีเจอร์มากขึ้น → 
                    ใช้ <strong className="text-purple-400">TradingView</strong> สำหรับวิเคราะห์
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chart Setup */}
          <Card className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 text-xl">📊 วิธีตั้งค่า Chart และ Indicator พื้นฐาน</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="text-cyan-400 font-bold mb-3">🎨 การตั้งค่า Chart</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-amber-400 font-semibold mb-2">Timeframe แนะนำ:</h5>
                      <ul className="space-y-1 text-sm text-slate-300">
                        <li>• <strong>H4:</strong> สำหรับแนวโน้มหลัก</li>
                        <li>• <strong>H1:</strong> Entry point หลัก</li>
                        <li>• <strong>M15:</strong> Fine-tune entry</li>
                        <li>• <strong>M5:</strong> สำหรับ Scalping</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-purple-400 font-semibold mb-2">Chart Type:</h5>
                      <ul className="space-y-1 text-sm text-slate-300">
                        <li>• <strong>Candlestick:</strong> แนะนำมากสุด</li>
                        <li>• <strong>Bar Chart:</strong> สำหรับมือโปร</li>
                        <li>• <strong>Line Chart:</strong> ดูแนวโน้มรวม</li>
                        <li>• <strong>Heikin Ashi:</strong> ลดสัญญาณรบกวน</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="text-pink-400 font-bold mb-3">📈 Indicator พื้นฐานที่ควรรู้</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-green-400 font-semibold mb-2">Trend Following:</h5>
                      <div className="space-y-2 text-sm">
                        <div className="p-2 bg-slate-800/50 rounded">
                          <p className="text-cyan-400 font-medium">Moving Average (MA)</p>
                          <p className="text-slate-300">• EMA 20, 50, 200</p>
                          <p className="text-xs text-slate-400">ดูแนวโน้มและแนวรับ-ต้าน</p>
                        </div>
                        <div className="p-2 bg-slate-800/50 rounded">
                          <p className="text-purple-400 font-medium">Bollinger Bands</p>
                          <p className="text-slate-300">• Period 20, Deviation 2</p>
                          <p className="text-xs text-slate-400">วัดความผันผวนและ Support/Resistance</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-amber-400 font-semibold mb-2">Oscillators:</h5>
                      <div className="space-y-2 text-sm">
                        <div className="p-2 bg-slate-800/50 rounded">
                          <p className="text-blue-400 font-medium">RSI (14)</p>
                          <p className="text-slate-300">• Overbought: &gt;70</p>
                          <p className="text-slate-300">• Oversold: &lt;30</p>
                        </div>
                        <div className="p-2 bg-slate-800/50 rounded">
                          <p className="text-orange-400 font-medium">MACD</p>
                          <p className="text-slate-300">• 12, 26, 9</p>
                          <p className="text-xs text-slate-400">สัญญาณ Crossover และ Divergence</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 p-4 rounded-lg border border-amber-500/30">
                  <h4 className="text-amber-400 font-bold mb-2">⭐ Setup Chart สำหรับมือใหม่</h4>
                  <div className="text-sm text-slate-300 space-y-1">
                    <p>1. <strong>Base:</strong> Candlestick Chart, H1 Timeframe</p>
                    <p>2. <strong>Trend:</strong> EMA 20 (Blue), EMA 50 (Red)</p>
                    <p>3. <strong>Momentum:</strong> RSI (14) ในหน้าต่างล่าง</p>
                    <p>4. <strong>Support/Resistance:</strong> วาดเส้นด้วยมือ</p>
                    <p className="text-amber-300 font-medium mt-2">📝 หมายเหตุ: เริ่มจากน้อยไปมาก อย่าใส่ Indicator เยอะเกินไป!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "analysis",
      title: "พื้นฐานการวิเคราะห์ตลาด Forex", 
      duration: "30 นาที",
      icon: BarChart3,
      description: "เรียนรู้การวิเคราะห์ทางเทคนิคและปัจจัยพื้นฐาน",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-4">📊 พื้นฐานการวิเคราะห์ตลาด Forex</h3>

          {/* Technical vs Fundamental */}
          <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400 text-xl">⚖️ Technical Analysis vs Fundamental Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-cyan-500">
                  <h4 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Technical Analysis (การวิเคราะห์ทางเทคนิค)
                  </h4>
                  <div className="space-y-3">
                    <p className="text-slate-300 text-sm">
                      วิเคราะห์จาก <strong>กราฟราคา</strong> และ <strong>ปริมาณการซื้อขาย</strong> ในอดีต เพื่อคาดการณ์ทิศทางในอนาคต
                    </p>
                    
                    <div>
                      <p className="text-green-400 font-semibold mb-2">✅ เครื่องมือหลัก:</p>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• Chart Patterns (Head & Shoulders, Triangle)</li>
                        <li>• Candlestick Patterns (Pin Bar, Engulfing)</li>
                        <li>• Support & Resistance Lines</li>
                        <li>• Technical Indicators (MA, RSI, MACD)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-blue-400 font-semibold mb-2">🎯 เหมาะกับ:</p>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• การเทรดระยะสั้น (Scalping, Day Trading)</li>
                        <li>• หา Entry/Exit Point ที่แม่นยำ</li>
                        <li>• คนที่ชอบดูกราฟ</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-amber-500">
                  <h4 className="text-amber-400 font-bold mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Fundamental Analysis (การวิเคราะห์ปัจจัยพื้นฐาน)
                  </h4>
                  <div className="space-y-3">
                    <p className="text-slate-300 text-sm">
                      วิเคราะห์จาก <strong>ข้อมูลเศรษฐกิจ</strong>, <strong>การเมือง</strong>, และ <strong>เหตุการณ์สำคัญ</strong> ที่ส่งผลต่อค่าเงิน
                    </p>
                    
                    <div>
                      <p className="text-green-400 font-semibold mb-2">✅ ปัจจัยหลัก:</p>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• อัตราดอกเบี้ย (Interest Rates)</li>
                        <li>• ข้อมูลเศรษฐกิจ (GDP, Inflation, Employment)</li>
                        <li>• นโยบายธนาคารกลาง</li>
                        <li>• เหตุการณ์การเมือง/ภูมิศาสตร์</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-amber-400 font-semibold mb-2">🎯 เหมาะกับ:</p>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• การลงทุนระยะยาว</li>
                        <li>• หาทิศทางใหญ่ของตลาด</li>
                        <li>• คนที่ชอบติดตามข่าวเศรษฐกิจ</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-4 rounded-lg border border-purple-500/30">
                <h4 className="text-purple-400 font-bold mb-2">🔄 การผสมผสาน (Mixed Analysis)</h4>
                <p className="text-sm text-slate-300 mb-2">
                  <strong>นักเทรดมืออาชีพ</strong> มักใช้ทั้งสองแบบร่วมกัน:
                </p>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• ใช้ <span className="text-amber-400">Fundamental</span> หาทิศทางหลัก</li>
                  <li>• ใช้ <span className="text-cyan-400">Technical</span> หาจุด Entry/Exit</li>
                  <li>• เช่น: รู้ว่า USD แข็งค่าจาก Fed ขึ้นดอกเบี้ย → ใช้ Technical หาจุดซื้อ USD</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Economic News */}
          <Card className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-500/30">
            <CardHeader>
              <CardTitle className="text-amber-400 text-xl">📰 ข่าวเศรษฐกิจสำคัญที่มีผลต่อค่าเงิน</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* High Impact News */}
                  <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-red-500">
                    <h4 className="text-red-400 font-bold mb-3">🔥 ข่าวผลกระทบสูง (High Impact)</h4>
                    <div className="space-y-3 text-sm">
                      <div className="p-2 bg-slate-800/50 rounded">
                        <p className="text-cyan-400 font-medium">NFP (Non-Farm Payrolls)</p>
                        <p className="text-slate-300">• ออกวันศุกร์แรกของเดือน</p>
                        <p className="text-xs text-slate-400">จำนวนงานนอกภาคการเกษตรของสหรัฐ → ส่งผลต่อ USD</p>
                      </div>
                      
                      <div className="p-2 bg-slate-800/50 rounded">
                        <p className="text-purple-400 font-medium">CPI (Consumer Price Index)</p>
                        <p className="text-slate-300">• ออกเดือนละครั้ง</p>
                        <p className="text-xs text-slate-400">วัดอัตราเงินเฟ้อ → ส่งผลต่อนโยบายดอกเบี้ย</p>
                      </div>
                      
                      <div className="p-2 bg-slate-800/50 rounded">
                        <p className="text-green-400 font-medium">Interest Rate Decision</p>
                        <p className="text-slate-300">• Fed, ECB, BOE, etc.</p>
                        <p className="text-xs text-slate-400">การเปลี่ยนอัตราดอกเบี้ย → กระทบค่าเงินโดยตรง</p>
                      </div>
                    </div>
                  </div>

                  {/* Medium Impact News */}
                  <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-amber-500">
                    <h4 className="text-amber-400 font-bold mb-3">⚠️ ข่าวผลกระทบปานกลาง (Medium Impact)</h4>
                    <div className="space-y-3 text-sm">
                      <div className="p-2 bg-slate-800/50 rounded">
                        <p className="text-blue-400 font-medium">GDP (Gross Domestic Product)</p>
                        <p className="text-slate-300">• ออกไตรมาสละครั้ง</p>
                        <p className="text-xs text-slate-400">วัดการเติบโตทางเศรษฐกิจ</p>
                      </div>
                      
                      <div className="p-2 bg-slate-800/50 rounded">
                        <p className="text-orange-400 font-medium">Unemployment Rate</p>
                        <p className="text-slate-300">• ออกเดือนละครั้ง</p>
                        <p className="text-xs text-slate-400">อัตราการว่างงาน → ส่งผลต่อนโยบายเศรษฐกิจ</p>
                      </div>
                      
                      <div className="p-2 bg-slate-800/50 rounded">
                        <p className="text-pink-400 font-medium">Retail Sales</p>
                        <p className="text-slate-300">• ออกเดือนละครั้ง</p>
                        <p className="text-xs text-slate-400">ยอดขายค้าปลีก → วัดความแข็งแกร่งเศรษฐกิจ</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-600/20 to-rose-600/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    💀 ข่าวที่ต้องระวัง (Avoid Trading)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-amber-400 font-semibold mb-2">Central Bank Events:</p>
                      <ul className="text-slate-300 space-y-1">
                        <li>• FOMC Meeting (Fed)</li>
                        <li>• ECB Press Conference</li>
                        <li>• BOE Rate Decision</li>
                        <li>• BOJ Policy Meeting</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-red-400 font-semibold mb-2">Special Events:</p>
                      <ul className="text-slate-300 space-y-1">
                        <li>• Election Results</li>
                        <li>• Brexit Votes</li>
                        <li>• Trade War News</li>
                        <li>• Natural Disasters</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="text-blue-400 font-bold mb-2">📅 Economic Calendar แนะนำ</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• <strong>ForexFactory.com</strong> - ครบถ้วน แม่นยำ</li>
                    <li>• <strong>Investing.com</strong> - มี Mobile App</li>
                    <li>• <strong>DailyFX.com</strong> - มีการวิเคราะห์เพิ่มเติม</li>
                    <li>• <strong>TradingView Economic Calendar</strong> - ในแพลตฟอร์มเดียวกัน</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeframe Analysis */}
          <Card className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 text-xl">⏰ Timeframe และ Multi-timeframe Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="text-cyan-400 font-bold mb-3">🎯 Timeframe คืออะไร?</h4>
                  <p className="text-slate-300 text-sm mb-4">
                    Timeframe คือ <strong>ช่วงเวลาที่แต่ละเทียน (Candlestick) แทน</strong> 
                    เช่น M1 = 1 นาที, H1 = 1 ชั่วโมง, D1 = 1 วัน
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { tf: "M1", name: "1 นาที", use: "Scalping" },
                      { tf: "M5", name: "5 นาที", use: "Scalping" },
                      { tf: "M15", name: "15 นาที", use: "Day Trading" },
                      { tf: "M30", name: "30 นาที", use: "Day Trading" },
                      { tf: "H1", name: "1 ชั่วโมง", use: "Intraday" },
                      { tf: "H4", name: "4 ชั่วโมง", use: "Swing Trading" },
                      { tf: "D1", name: "1 วัน", use: "Position Trading" },
                      { tf: "W1", name: "1 สัปดาห์", use: "Long-term" }
                    ].map((item) => (
                      <div key={item.tf} className="bg-slate-800/50 p-2 rounded text-center">
                        <p className="text-cyan-400 font-bold text-sm">{item.tf}</p>
                        <p className="text-slate-300 text-xs">{item.name}</p>
                        <p className="text-amber-400 text-xs">{item.use}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="text-purple-400 font-bold mb-3">🔍 Multi-timeframe Analysis</h4>
                  <p className="text-slate-300 text-sm mb-4">
                    การวิเคราะห์หลาย Timeframe พร้อมกัน เพื่อให้เห็นภาพรวมที่ชัดเจนยิ่งขึ้น
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-3 rounded border border-blue-500/20">
                      <h5 className="text-blue-400 font-semibold mb-2">📊 Top-Down Approach</h5>
                      <div className="text-sm text-slate-300 space-y-1">
                        <p>1. <strong className="text-amber-400">Weekly (W1):</strong> ดูแนวโน้มใหญ่</p>
                        <p>2. <strong className="text-green-400">Daily (D1):</strong> หาทิศทางหลัก และ Key Levels</p>
                        <p>3. <strong className="text-cyan-400">4 Hour (H4):</strong> วางแผน Entry/Exit</p>
                        <p>4. <strong className="text-purple-400">1 Hour (H1):</strong> หา Entry Point ที่แม่นยำ</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-green-600/20 rounded border border-green-500/30">
                        <h5 className="text-green-400 font-semibold mb-2">✅ ตัวอย่างสัญญาณดี</h5>
                        <ul className="text-sm text-slate-300 space-y-1">
                          <li>• Weekly: Uptrend</li>
                          <li>• Daily: ทะลุ Resistance</li>
                          <li>• H4: Pullback เสร็จ</li>
                          <li>• H1: Pin Bar ขาขึ้น</li>
                          <li className="text-green-400 font-medium">→ สัญญาณ BUY แข็งแกร่ง!</li>
                        </ul>
                      </div>
                      
                      <div className="p-3 bg-red-600/20 rounded border border-red-500/30">
                        <h5 className="text-red-400 font-semibold mb-2">❌ ตัวอย่างสัญญาณขัดแย้ง</h5>
                        <ul className="text-sm text-slate-300 space-y-1">
                          <li>• Weekly: Downtrend</li>
                          <li>• Daily: ยัง Downtrend</li>
                          <li>• H4: Bounce เล็กน้อย</li>
                          <li>• H1: Pin Bar ขาขึ้น</li>
                          <li className="text-red-400 font-medium">→ อย่า BUY! อาจเป็นแค่ Pullback</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-600/20 to-yellow-600/20 p-4 rounded-lg border border-amber-500/30">
                  <h4 className="text-amber-400 font-bold mb-2">💡 เคล็ดลับ Multi-timeframe Analysis</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>1. <strong>Rule of 4:</strong> ดู Timeframe ใหญ่กว่า 4 เท่าเสมอ (M15→H1→H4→D1)</li>
                    <li>2. <strong>Trend Direction:</strong> เทรดไปในทิศทางเดียวกับ Higher Timeframe</li>
                    <li>3. <strong>Key Levels:</strong> S&R จาก Higher TF แม่นกว่า</li>
                    <li>4. <strong>Risk Management:</strong> Stop Loss ตาม Higher TF, Take Profit ตาม Lower TF</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "structure",
      title: "การอ่านกราฟและโครงสร้างตลาด Forex",
      duration: "35 นาที", 
      icon: TrendingUp,
      description: "เข้าใจ Market Structure และ Chart Patterns",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-4">📈 การอ่านกราฟและโครงสร้างตลาด Forex</h3>

          {/* Market Structure */}
          <Card className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400 text-xl">🏗️ Market Structure คืออะไร?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <p className="text-slate-300 text-sm mb-3">
                    <strong className="text-cyan-400">Market Structure</strong> คือการจัดระเบียบของราคาในตลาด 
                    ประกอบด้วย <span className="text-green-400">Higher Highs (HH)</span>, <span className="text-red-400">Lower Lows (LL)</span>, 
                    <span className="text-purple-400">Higher Lows (HL)</span>, และ <span className="text-orange-400">Lower Highs (LH)</span>
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-600/20 p-3 rounded border border-green-500/30">
                      <h4 className="text-green-400 font-bold mb-2">📈 Uptrend (แนวโน้มขาขึ้น)</h4>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• <strong>HH:</strong> จุดสูงที่สูงกว่าเดิม</li>
                        <li>• <strong>HL:</strong> จุดต่ำที่สูงกว่าเดิม</li>
                        <li>• ราคาเคลื่อนไหวขาขึ้นแบบ Zigzag</li>
                        <li>• Pullback มาหา Support แล้วขึ้นต่อ</li>
                      </ul>
                    </div>
                    
                    <div className="bg-red-600/20 p-3 rounded border border-red-500/30">
                      <h4 className="text-red-400 font-bold mb-2">📉 Downtrend (แนวโน้มขาลง)</h4>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• <strong>LH:</strong> จุดสูงที่ต่ำกว่าเดิม</li>
                        <li>• <strong>LL:</strong> จุดต่ำที่ต่ำกว่าเดิม</li>
                        <li>• ราคาเคลื่อนไหวขาลงแบบ Zigzag</li>
                        <li>• Pullback มาหา Resistance แล้วลงต่อ</li>
                      </ul>
                    </div>
                    
                    <div className="bg-amber-600/20 p-3 rounded border border-amber-500/30">
                      <h4 className="text-amber-400 font-bold mb-2">➡️ Sideway (ไปข้าง)</h4>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• ไม่มีการสร้าง HH หรือ LL ชัดเจน</li>
                        <li>• ราคาอยู่ในช่วง (Range)</li>
                        <li>• แกว่งระหว่าง Support-Resistance</li>
                        <li>• รอ Breakout เพื่อเทรดต่อ</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-600/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-bold mb-2">🎯 วิธีใช้ Market Structure ในการเทรด</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-green-400 font-semibold mb-2">✅ Entry Points:</p>
                      <ul className="text-slate-300 space-y-1">
                        <li>• BUY ที่ HL ใน Uptrend</li>
                        <li>• SELL ที่ LH ใน Downtrend</li>
                        <li>• รอ Confirmation ก่อนเข้าเสมอ</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-red-400 font-semibold mb-2">❌ ข้อควรระวัง:</p>
                      <ul className="text-slate-300 space-y-1">
                        <li>• อย่าเทรดกับ Trend</li>
                        <li>• ระวัง False Breakout</li>
                        <li>• ใช้ Stop Loss ป้องกันความเสี่ยง</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support & Resistance */}
          <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 text-xl">⚖️ Support & Resistance + Supply & Demand Zones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="text-cyan-400 font-bold mb-3">📊 Support & Resistance (แนวรับและแนวต้าน)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-green-600/20 rounded border border-green-500/30">
                      <h5 className="text-green-400 font-semibold mb-2">🛡️ Support (แนวรับ)</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• ราคาที่ <strong>กั้นไม่ให้ลงต่อ</strong></li>
                        <li>• มีแรง <strong>ซื้อ</strong> เข้ามามากช่วงนี้</li>
                        <li>• เมื่อทะลุ → กลายเป็น Resistance</li>
                        <li>• ยิ่งแตะบ่อย ยิ่งแข็งแกร่ง</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-red-600/20 rounded border border-red-500/30">
                      <h5 className="text-red-400 font-semibold mb-2">⚡ Resistance (แนวต้าน)</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• ราคาที่ <strong>กั้นไม่ให้ขึ้นต่อ</strong></li>
                        <li>• มีแรง <strong>ขาย</strong> เข้ามามากช่วงนี้</li>
                        <li>• เมื่อทะลุ → กลายเป็น Support</li>
                        <li>• มักอยู่ที่ Previous High</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-600/20 rounded border border-blue-500/30">
                    <h5 className="text-blue-400 font-semibold mb-2">🔍 วิธีหา S&R:</h5>
                    <ul className="text-sm text-slate-300 space-y-1">
                      <li>• <strong>Swing High/Low:</strong> จุดสูง/ต่ำที่สำคัญ</li>
                      <li>• <strong>Round Numbers:</strong> 1.1000, 1.2000 (Psychological Level)</li>
                      <li>• <strong>Previous Day High/Low:</strong> เฝ้าดูแบร์คของวันก่อน</li>
                      <li>• <strong>Moving Average:</strong> EMA 200, 50 มักทำหน้าที่ S&R</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="text-amber-400 font-bold mb-3">🎯 Supply & Demand Zones</h4>
                  <p className="text-slate-300 text-sm mb-3">
                    <strong>โซนอุปทาน-อุปสงค์</strong> เป็นแนวคิดที่ทันสมัยกว่า S&R แบบเส้นตรง 
                    มองเป็น <strong>"พื้นที่"</strong> แทนที่จะเป็นเส้น
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-green-600/20 rounded border border-green-500/30">
                      <h5 className="text-green-400 font-semibold mb-2">🟢 Demand Zone (โซนอุปสงค์)</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• พื้นที่ที่มี<strong>ความต้องการซื้อ</strong>สูง</li>
                        <li>• ราคาเด้งขึ้นจากโซนนี้</li>
                        <li>• หา Base ก่อนราคาไปขาขึ้น</li>
                        <li>• เทรด BUY เมื่อราคากลับมาทดสอบ</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-red-600/20 rounded border border-red-500/30">
                      <h5 className="text-red-400 font-semibold mb-2">🔴 Supply Zone (โซนอุปทาน)</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• พื้นที่ที่มี<strong>แรงขาย</strong>สูง</li>
                        <li>• ราคาดิ่งลงจากโซนนี้</li>
                        <li>• หา Distribution ก่อนราคาไปขาลง</li>
                        <li>• เทรด SELL เมื่อราคากลับมาทดสอบ</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chart Patterns */}
          <Card className="bg-gradient-to-r from-green-600/20 to-teal-600/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 text-xl">📐 Chart Patterns ที่พบบ่อย</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="text-cyan-400 font-bold mb-3">🔄 Reversal Patterns (แพทเทิร์นกลับตัว)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-600/20 rounded border border-blue-500/30">
                      <h5 className="text-blue-400 font-semibold mb-2">👑 Head and Shoulders</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• <strong>โครงสร้าง:</strong> หัวไหล่ซ้าย-หัว-หัวไหล่ขวา</li>
                        <li>• <strong>Neckline:</strong> เส้นเชื่อมจุดต่ำ 2 จุด</li>
                        <li>• <strong>Target:</strong> ระยะจากหัวถึง Neckline</li>
                        <li>• <strong>คอนเฟิร์ม:</strong> ทะลุ Neckline + Volume</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-purple-600/20 rounded border border-purple-500/30">
                      <h5 className="text-purple-400 font-semibold mb-2">⬆️⬇️ Double Top/Bottom</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• <strong>Double Top:</strong> 2 จุดสูงเท่ากัน → ขาลง</li>
                        <li>• <strong>Double Bottom:</strong> 2 จุดต่ำเท่ากัน → ขาขึ้น</li>
                        <li>• <strong>คอนเฟิร์ม:</strong> ทะลุระดับกลาง</li>
                        <li>• <strong>False Break:</strong> ระวังการทะลุหลอก</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="text-amber-400 font-bold mb-3">➡️ Continuation Patterns (แพทเทิร์นต่อเนื่อง)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-green-600/20 rounded border border-green-500/30">
                      <h5 className="text-green-400 font-semibold mb-2">🔺 Triangle</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• <strong>Ascending:</strong> Bullish</li>
                        <li>• <strong>Descending:</strong> Bearish</li>
                        <li>• <strong>Symmetrical:</strong> ดูเทรนด์</li>
                        <li>• รอ Breakout แล้วเทรด</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-blue-600/20 rounded border border-blue-500/30">
                      <h5 className="text-blue-400 font-semibold mb-2">📏 Rectangle</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• ราคาอยู่ในกรอบ</li>
                        <li>• แกว่ง Support-Resistance</li>
                        <li>• เทรด Range หรือ รอ Breakout</li>
                        <li>• Volume ลดลงในช่วงนี้</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-orange-600/20 rounded border border-orange-500/30">
                      <h5 className="text-orange-400 font-semibold mb-2">🚩 Flag & Pennant</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• หลัง Strong Move</li>
                        <li>• <strong>Flag:</strong> Pullback แบบขนาน</li>
                        <li>• <strong>Pennant:</strong> รูปสามเหลี่ยมเล็ก</li>
                        <li>• เทรดตาม Trend เดิม</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Candlestick Patterns */}
          <Card className="bg-gradient-to-r from-red-600/20 to-rose-600/20 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400 text-xl">🕯️ Candlestick Patterns พื้นฐาน</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="text-cyan-400 font-bold mb-3">🔄 Single Candlestick Patterns</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-blue-600/20 rounded border border-blue-500/30">
                      <h5 className="text-blue-400 font-semibold mb-2">📍 Pin Bar (Hammer/Shooting Star)</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• <strong>Body เล็ก:</strong> Open ≈ Close</li>
                        <li>• <strong>Shadow ยาว:</strong> อย่างน้อย 2 เท่า Body</li>
                        <li>• <strong>Hammer:</strong> ขาขึ้น (Shadow ล่างยาว)</li>
                        <li>• <strong>Shooting Star:</strong> ขาลง (Shadow บนยาว)</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-purple-600/20 rounded border border-purple-500/30">
                      <h5 className="text-purple-400 font-semibold mb-2">➕ Doji</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• <strong>Open = Close</strong> (หรือใกล้เคียง)</li>
                        <li>• แสดงความไม่แน่นอนของตลาด</li>
                        <li>• <strong>ที่ Support/Resistance:</strong> อาจกลับตัว</li>
                        <li>• <strong>ที่กลาง Trend:</strong> อาจหยุดชั่วคราว</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-green-600/20 rounded border border-green-500/30">
                      <h5 className="text-green-400 font-semibold mb-2">🟢🔴 Marubozu</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• <strong>ไม่มี Shadow</strong> (หรือมีน้อยมาก)</li>
                        <li>• <strong>Bullish Marubozu:</strong> เปิดต่ำ ปิดสูง</li>
                        <li>• <strong>Bearish Marubozu:</strong> เปิดสูง ปิดต่ำ</li>
                        <li>• แสดงแรงกดดัน/ซื้อขายที่ชัดเจน</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="text-amber-400 font-bold mb-3">👥 Multiple Candlestick Patterns</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-green-600/20 rounded border border-green-500/30">
                      <h5 className="text-green-400 font-semibold mb-2">🔥 Engulfing Pattern</h5>
                      <div className="space-y-2 text-sm text-slate-300">
                        <div>
                          <p className="text-cyan-400 font-medium">Bullish Engulfing:</p>
                          <p>• เทียน 1: Bearish (แดง)</p>
                          <p>• เทียน 2: Bullish (เขียว) ที่ใหญ่กว่า</p>
                          <p>• Body เทียน 2 ครอบ Body เทียน 1</p>
                        </div>
                        <div className="mt-2">
                          <p className="text-red-400 font-medium">Bearish Engulfing:</p>
                          <p>• เทียน 1: Bullish (เขียว)</p>
                          <p>• เทียน 2: Bearish (แดง) ที่ใหญ่กว่า</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-blue-600/20 rounded border border-blue-500/30">
                      <h5 className="text-blue-400 font-semibold mb-2">⭐ Morning/Evening Star</h5>
                      <div className="space-y-2 text-sm text-slate-300">
                        <div>
                          <p className="text-green-400 font-medium">Morning Star (ขาขึ้น):</p>
                          <p>• เทียน 1: Bearish ใหญ่</p>
                          <p>• เทียน 2: Doji/เล็ก (Gap Down)</p>
                          <p>• เทียน 3: Bullish ใหญ่</p>
                        </div>
                        <div className="mt-2">
                          <p className="text-red-400 font-medium">Evening Star (ขาลง):</p>
                          <p>• เทียน 1: Bullish ใหญ่</p>
                          <p>• เทียน 2: Doji/เล็ก (Gap Up)</p>
                          <p>• เทียน 3: Bearish ใหญ่</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-600/20 to-yellow-600/20 p-4 rounded-lg border border-amber-500/30">
                  <h4 className="text-amber-400 font-bold mb-2 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    💡 เคล็ดลับการใช้ Candlestick Patterns
                  </h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>1. <strong>Context คือสิ่งสำคัญ:</strong> Pattern ที่ S&R แข็งแกร่งกว่า</li>
                    <li>2. <strong>Confirmation:</strong> รอเทียนถัดไป confirm ก่อนเทรด</li>
                    <li>3. <strong>Volume:</strong> Pattern + Volume สูง = แข็งแกร่งกว่า</li>
                    <li>4. <strong>Multiple Timeframes:</strong> Pattern ใน Higher TF แม่นกว่า</li>
                    <li>5. <strong>Risk Management:</strong> ใส่ Stop Loss ที่เหมาะสมเสมอ</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "advanced",
      title: "เครื่องมือและแนวคิดการวิเคราะห์ขั้นสูง",
      duration: "40 นาที",
      icon: Zap,
      description: "Price Action, Divergence, FVG, Premium & Discount, Fibonacci",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-4">⚡ เครื่องมือและแนวคิดการวิเคราะห์ขั้นสูงในตลาด Forex</h3>

          {/* Price Action */}
          <Card className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400 text-xl">🎯 Price Action (การวิเคราะห์จากความเคลื่อนไหวของราคา)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <p className="text-slate-300 text-sm mb-4">
                    <strong className="text-cyan-400">Price Action</strong> คือการวิเคราะห์ตลาดโดยมองที่ <strong>ความเคลื่อนไหวของราคา</strong> เท่านั้น 
                    ไม่ใช้ Indicator ใดๆ เพื่อให้เห็นพฤติกรรมของผู้ซื้อขายอย่างแท้จริง
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-green-400 font-bold mb-3">✅ หลักการของ Price Action:</h4>
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li>• <strong>Market Structure:</strong> ดู HH, LL, HL, LH</li>
                        <li>• <strong>Key Levels:</strong> Support & Resistance ที่สำคัญ</li>
                        <li>• <strong>Candlestick Patterns:</strong> Pin Bar, Engulfing, Doji</li>
                        <li>• <strong>Volume:</strong> ดูปริมาณการซื้อขาย</li>
                        <li>• <strong>Context:</strong> เข้าใจสถานการณ์ตลาด</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-blue-400 font-bold mb-3">🎯 ข้อดีของ Price Action:</h4>
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li>• ไม่มี Lag (ไม่ช้า)</li>
                        <li>• เห็นพฤติกรรมผู้ซื้อขายจริงๆ</li>
                        <li>• ใช้ได้ทุก Market, ทุก Timeframe</li>
                        <li>• ไม่ซับซ้อน (แต่ต้องใช้ประสบการณ์)</li>
                        <li>• เข้าใจตลาดลึกซึ้งกว่า</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="text-purple-400 font-bold mb-3">🔥 Key Price Action Concepts</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-green-600/20 rounded border border-green-500/30">
                      <h5 className="text-green-400 font-semibold mb-2">📊 Market Sentiment</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• <strong>Bullish:</strong> ราคาขึ้น, HH + HL</li>
                        <li>• <strong>Bearish:</strong> ราคาลง, LH + LL</li>
                        <li>• <strong>Neutral:</strong> Sideway, Range</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-blue-600/20 rounded border border-blue-500/30">
                      <h5 className="text-blue-400 font-semibold mb-2">⚡ Rejection</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• Pin Bar ที่ S&R</li>
                        <li>• Double Top/Bottom</li>
                        <li>• False Breakout</li>
                        <li>• Volume Spike + Reversal</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-amber-600/20 rounded border border-amber-500/30">
                      <h5 className="text-amber-400 font-semibold mb-2">🎯 Confluence</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• S&R + Fibonacci</li>
                        <li>• Pin Bar + Key Level</li>
                        <li>• Multiple TF Alignment</li>
                        <li>• News + Technical</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Divergence */}
          <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 text-xl">📈📉 Divergence (ความแตกต่าง)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <p className="text-slate-300 text-sm mb-4">
                    <strong className="text-purple-400">Divergence</strong> เกิดขึ้นเมื่อ <strong>ราคา</strong> และ <strong>Oscillator</strong> 
                    (RSI, MACD, Stochastic) เคลื่อนไหว <strong>ในทิศทางตรงข้ามกัน</strong> 
                    เป็นสัญญาณเตือนว่าแนวโน้มปัจจุบันอาจจะเปลี่ยน
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-red-600/20 rounded border border-red-500/30">
                      <h4 className="text-red-400 font-bold mb-3">📉 Bearish Divergence</h4>
                      <div className="space-y-2 text-sm text-slate-300">
                        <p>• <strong>ราคา:</strong> สร้าง Higher High (HH)</p>
                        <p>• <strong>Oscillator:</strong> สร้าง Lower High (LH)</p>
                        <p>• <strong>ความหมาย:</strong> แรงขาขึ้นลดลง</p>
                        <p>• <strong>สัญญาณ:</strong> อาจจะกลับขาลง</p>
                        <div className="mt-3 p-2 bg-slate-800/50 rounded">
                          <p className="text-xs text-red-300">
                            <strong>ตัวอย่าง:</strong> EUR/USD ทำ High ใหม่ที่ 1.1200 
                            แต่ RSI ไม่สามารถทำ High ใหม่ได้ → อาจจะลงเร็วๆ นี้
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-600/20 rounded border border-green-500/30">
                      <h4 className="text-green-400 font-bold mb-3">📈 Bullish Divergence</h4>
                      <div className="space-y-2 text-sm text-slate-300">
                        <p>• <strong>ราคา:</strong> สร้าง Lower Low (LL)</p>
                        <p>• <strong>Oscillator:</strong> สร้าง Higher Low (HL)</p>
                        <p>• <strong>ความหมาย:</strong> แรงขาลงลดลง</p>
                        <p>• <strong>สัญญาณ:</strong> อาจจะกลับขาขึ้น</p>
                        <div className="mt-3 p-2 bg-slate-800/50 rounded">
                          <p className="text-xs text-green-300">
                            <strong>ตัวอย่าง:</strong> GBP/USD ทำ Low ใหม่ที่ 1.2500 
                            แต่ MACD ทำ Low ที่สูงกว่าเดิม → อาจจะขึ้นเร็วๆ นี้
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-600/20 p-4 rounded-lg border border-amber-500/30">
                  <h4 className="text-amber-400 font-bold mb-2">⚠️ ข้อควรระวัง Divergence</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• <strong>ไม่ใช่สัญญาณ Entry:</strong> เป็นแค่ "เตือน" ให้ระวัง</li>
                    <li>• <strong>รอ Confirmation:</strong> ต้องมี Price Action ยืนยัน</li>
                    <li>• <strong>Hidden Divergence:</strong> มีทั้งแบบ Regular และ Hidden</li>
                    <li>• <strong>False Signal:</strong> ในแนวโน้มแข็งแกร่งอาจไม่ได้ผล</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FVG */}
          <Card className="bg-gradient-to-r from-green-600/20 to-teal-600/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 text-xl">⚡ FVG (Fair Value Gap) - ช่องว่างราคา</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <p className="text-slate-300 text-sm mb-4">
                    <strong className="text-green-400">FVG (Fair Value Gap)</strong> เป็นแนวคิดจาก Smart Money Theory 
                    หมายถึง <strong>"ช่องว่าง"</strong> ในราคาที่เกิดจากการเคลื่อนไหวอย่างรวดเร็ว 
                    ตลาดมักจะ <strong>"กลับมาเติม"</strong> ช่องว่างนี้ในภายหลัง
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-blue-600/20 rounded border border-blue-500/30">
                      <h4 className="text-blue-400 font-bold mb-3">🔍 วิธีหา FVG</h4>
                      <div className="space-y-2 text-sm text-slate-300">
                        <p><strong>โครงสร้าง 3 เทียน:</strong></p>
                        <p>• <strong>เทียน 1:</strong> เทียนก่อนหน้า</p>
                        <p>• <strong>เทียน 2:</strong> เทียนที่ขยับมาก (ไม่แตะเทียน 1 และ 3)</p>
                        <p>• <strong>เทียน 3:</strong> เทียนถัดไป</p>
                        <div className="mt-3 p-2 bg-slate-800/50 rounded">
                          <p className="text-xs text-blue-300">
                            <strong>Gap:</strong> ระหว่าง High ของเทียน 1 กับ Low ของเทียน 3
                            (สำหรับ Bullish FVG)
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-purple-600/20 rounded border border-purple-500/30">
                      <h4 className="text-purple-400 font-bold mb-3">🎯 วิธีเทรด FVG</h4>
                      <div className="space-y-2 text-sm text-slate-300">
                        <p><strong>กลยุทธ์หลัก:</strong></p>
                        <p>• รอราคา <strong>กลับมาเติม FVG</strong></p>
                        <p>• เข้า <strong>ตามทิศทาง Trend</strong> เดิม</p>
                        <p>• ใส่ <strong>Stop Loss</strong> นอก FVG Zone</p>
                        <p>• <strong>Take Profit</strong> ที่ S&R ถัดไป</p>
                        <div className="mt-3 p-2 bg-slate-800/50 rounded">
                          <p className="text-xs text-purple-300">
                            <strong>ตัวอย่าง:</strong> หา Bullish FVG ใน Uptrend 
                            → รอราคาลงมาเติม → BUY → Target ที่ Resistance
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="text-cyan-400 font-bold mb-3">🔥 ประเภทของ FVG</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-green-600/20 rounded border border-green-500/30">
                      <h5 className="text-green-400 font-semibold mb-2">📈 Bullish FVG</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• เกิดในขา<strong>ขึ้น</strong></li>
                        <li>• เทียน 2 Gap ขึ้นแรง</li>
                        <li>• ใช้เป็น <strong>Support</strong></li>
                        <li>• เทรด <strong>BUY</strong> เมื่อกลับมาเติม</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-red-600/20 rounded border border-red-500/30">
                      <h5 className="text-red-400 font-semibold mb-2">📉 Bearish FVG</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• เกิดในขา<strong>ลง</strong></li>
                        <li>• เทียน 2 Gap ลงแรง</li>
                        <li>• ใช้เป็น <strong>Resistance</strong></li>
                        <li>• เทรด <strong>SELL</strong> เมื่อกลับมาเติม</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-amber-600/20 rounded border border-amber-500/30">
                      <h5 className="text-amber-400 font-semibold mb-2">⭐ Premium FVG</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• FVG ใน <strong>Higher TF</strong></li>
                        <li>• แข็งแกร่งกว่า FVG ธรรมดา</li>
                        <li>• <strong>ไม่เติมง่าย</strong></li>
                        <li>• Target ที่ดีสำหรับ TP</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Premium & Discount + Fibonacci */}
          <Card className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-500/30">
            <CardHeader>
              <CardTitle className="text-amber-400 text-xl">💰 Premium & Discount + Fibonacci Retracement & Extension</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="text-cyan-400 font-bold mb-3">💎 Premium & Discount Zones</h4>
                  <p className="text-slate-300 text-sm mb-4">
                    แนวคิดจาก Smart Money Theory ที่แบ่งช่วงราคาออกเป็น 3 โซน 
                    โดยใช้ <strong>Fibonacci 61.8%</strong> และ <strong>38.2%</strong> เป็นเส้นแบ่ง
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-red-600/20 rounded border border-red-500/30">
                      <h5 className="text-red-400 font-bold mb-2">🔥 Premium Zone</h5>
                      <div className="text-sm text-slate-300 space-y-2">
                        <p><strong>ช่วง:</strong> 61.8% - 100%</p>
                        <p><strong>ความหมาย:</strong> ราคา "แพง"</p>
                        <p><strong>กลยุทธ์:</strong> หาจุด <strong>SELL</strong></p>
                        <p><strong>ระวัง:</strong> อย่า BUY ในโซนนี้</p>
                        <div className="mt-2 p-2 bg-slate-800/50 rounded">
                          <p className="text-xs text-red-300">
                            เหมาะกับ Counter-trend หรือ Retracement Play
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-600/20 rounded border border-blue-500/30">
                      <h5 className="text-blue-400 font-bold mb-2">⚖️ Equilibrium</h5>
                      <div className="text-sm text-slate-300 space-y-2">
                        <p><strong>ช่วง:</strong> 38.2% - 61.8%</p>
                        <p><strong>ความหมาย:</strong> ราคา "ปกติ"</p>
                        <p><strong>กลยุทธ์:</strong> รอให้ราคาออกจากโซน</p>
                        <p><strong>ระวัง:</strong> อาจเป็น Ranging</p>
                        <div className="mt-2 p-2 bg-slate-800/50 rounded">
                          <p className="text-xs text-blue-300">
                            บ่อยครั้งเป็นโซน Consolidation
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-600/20 rounded border border-green-500/30">
                      <h5 className="text-green-400 font-bold mb-2">💚 Discount Zone</h5>
                      <div className="text-sm text-slate-300 space-y-2">
                        <p><strong>ช่วง:</strong> 0% - 38.2%</p>
                        <p><strong>ความหมาย:</strong> ราคา "ถูก"</p>
                        <p><strong>กลยุทธ์:</strong> หาจุด <strong>BUY</strong></p>
                        <p><strong>ระวัง:</strong> อย่า SELL ในโซนนี้</p>
                        <div className="mt-2 p-2 bg-slate-800/50 rounded">
                          <p className="text-xs text-green-300">
                            เหมาะกับ Trend Following หรือ Value Buying
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="text-purple-400 font-bold mb-3">📏 Fibonacci Retracement & Extension</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-amber-400 font-semibold mb-3">📉 Fibonacci Retracement</h5>
                      <div className="space-y-2 text-sm text-slate-300">
                        <p><strong>ใช้เมื่อ:</strong> ราคา Pullback ใน Trend</p>
                        <p><strong>วิธีวาด:</strong> จาก Swing Low → Swing High (Uptrend)</p>
                        <p><strong>ระดับสำคัญ:</strong></p>
                        <ul className="ml-4 space-y-1">
                          <li>• <span className="text-green-400">23.6%</span> - Shallow Pullback</li>
                          <li>• <span className="text-blue-400">38.2%</span> - Normal Pullback</li>
                          <li>• <span className="text-purple-400">50.0%</span> - Deep Pullback</li>
                          <li>• <span className="text-amber-400">61.8%</span> - Golden Ratio</li>
                          <li>• <span className="text-red-400">78.6%</span> - Very Deep</li>
                        </ul>
                        <div className="mt-3 p-2 bg-amber-600/20 rounded">
                          <p className="text-xs text-amber-300">
                            <strong>กลยุทธ์:</strong> BUY ที่ 38.2% หรือ 61.8% ใน Uptrend
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-green-400 font-semibold mb-3">📈 Fibonacci Extension</h5>
                      <div className="space-y-2 text-sm text-slate-300">
                        <p><strong>ใช้เมื่อ:</strong> หา Take Profit Target</p>
                        <p><strong>วิธีวาด:</strong> จาก 3 จุด (A-B-C Pattern)</p>
                        <p><strong>ระดับสำคัญ:</strong></p>
                        <ul className="ml-4 space-y-1">
                          <li>• <span className="text-green-400">127.2%</span> - Target แรก</li>
                          <li>• <span className="text-blue-400">161.8%</span> - Golden Target</li>
                          <li>• <span className="text-purple-400">200.0%</span> - Strong Extension</li>
                          <li>• <span className="text-amber-400">261.8%</span> - Maximum Extension</li>
                        </ul>
                        <div className="mt-3 p-2 bg-green-600/20 rounded">
                          <p className="text-xs text-green-300">
                            <strong>กลยุทธ์:</strong> TP ที่ 127.2% และ 161.8%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-bold mb-2">💡 เคล็ดลับการใช้ Fibonacci</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>1. <strong>Confluence:</strong> ใช้ร่วมกับ S&R, Trendline, MA</li>
                    <li>2. <strong>Multiple TF:</strong> Fib ใน Higher TF แข็งแกร่งกว่า</li>
                    <li>3. <strong>61.8% Rule:</strong> ระดับ Golden Ratio แม่นที่สุด</li>
                    <li>4. <strong>Round Numbers:</strong> เช็ค Psychological Level ใกล้ๆ</li>
                    <li>5. <strong>Volume:</strong> ดู Volume ที่ระดับ Fib สำคัญ</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "strategies",
      title: "กลยุทธ์การเทรด Forex",
      duration: "45 นาที",
      icon: Target,
      description: "Trend Following, Counter-trend, Breakout, Scalping, Day Trading, Swing Trading",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-4">🎯 กลยุทธ์การเทรด Forex สำหรับผู้เริ่มต้น</h3>

          {/* Trend Following */}
          <Card className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 text-xl">📈 Trend Following Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <p className="text-slate-300 text-sm mb-4">
                    <strong className="text-green-400">Trend Following</strong> คือการเทรดไป <strong>"ตามทิศทางของกระแส"</strong> 
                    เป็นกลยุทธ์พื้นฐานที่เหมาะสำหรับมือใหม่ เพราะมีอัตราชนะสูงและความเสี่ยงต่ำ
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-cyan-400 font-bold mb-3">✅ ข้อดี:</h4>
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li>• <strong>อัตราชนะสูง:</strong> 60-70%</li>
                        <li>• <strong>Risk:Reward ดี:</strong> 1:2 หรือ 1:3</li>
                        <li>• <strong>จิตใจสบาย:</strong> เทรดตามธรรมชาติตลาด</li>
                        <li>• <strong>เหมาะมือใหม่:</strong> ง่ายต่อการเรียนรู้</li>
                        <li>• <strong>ใช้ได้ทุก TF:</strong> จาก H1 ถึง Daily</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-amber-400 font-bold mb-3">⚠️ ข้อเสีย:</h4>
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li>• <strong>Entry ช้า:</strong> มักเข้าหลังจาก Trend เริ่มแล้ว</li>
                        <li>• <strong>Whipsaw:</strong> โดน False Breakout บ่อย</li>
                        <li>• <strong>ใช้ไม่ได้ใน Range:</strong> ตลาด Sideway แย่</li>
                        <li>• <strong>Stop Loss ไกล:</strong> ต้องให้ Space</li>
                        <li>• <strong>Pullback Stress:</strong> กลัวราคากลับ</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="text-purple-400 font-bold mb-3">🎯 วิธีเทรด Trend Following</h4>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-600/20 rounded border border-blue-500/30">
                      <h5 className="text-blue-400 font-semibold mb-2">📊 1. ระบุแนวโน้ม (Trend Identification)</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• ใช้ Higher Timeframe (H4, Daily) ดู Trend ใหญ่</li>
                        <li>• มอง Market Structure: HH+HL = Uptrend, LH+LL = Downtrend</li>
                        <li>• ใช้ Moving Average: ราคาเหนือ EMA 50/200 = Uptrend</li>
                        <li>• ดู Trendline: แนวโน้มชัดเจนหรือไม่</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-green-600/20 rounded border border-green-500/30">
                      <h5 className="text-green-400 font-semibold mb-2">⚡ 2. รอ Entry Signal</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• <strong>Pullback Play:</strong> รอราคา Pullback มา S&R</li>
                        <li>• <strong>Breakout Play:</strong> รอทะลุ Resistance/Support</li>
                        <li>• <strong>Pattern Play:</strong> Flag, Pennant, Triangle</li>
                        <li>• <strong>MA Bounce:</strong> ราคาแตะ EMA แล้วเด้ง</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-amber-600/20 rounded border border-amber-500/30">
                      <h5 className="text-amber-400 font-semibold mb-2">🎲 3. Risk Management</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• <strong>Stop Loss:</strong> ใต้/เหนือ Swing Point ที่สำคัญ</li>
                        <li>• <strong>Take Profit:</strong> ที่ Resistance/Support ถัดไป</li>
                        <li>• <strong>Risk:Reward:</strong> อย่างน้อย 1:2</li>
                        <li>• <strong>Trailing Stop:</strong> ใช้เมื่อกำไร 1:1 แล้ว</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-green-600/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-bold mb-2">💡 ตัวอย่าง Trend Following Setup</h4>
                  <div className="text-sm text-slate-300 space-y-1">
                    <p><strong>Scenario:</strong> EUR/USD อยู่ใน Strong Uptrend</p>
                    <p>1. <strong>Confirm Trend:</strong> Daily chart แสดง HH + HL ชัดเจน</p>
                    <p>2. <strong>Wait Pullback:</strong> ราคา Pullback มาหา EMA 50 ที่ H1</p>
                    <p>3. <strong>Entry Signal:</strong> Pin Bar ขาขึ้นที่ EMA 50</p>
                    <p>4. <strong>Risk Management:</strong> SL ใต้ Pin Bar, TP ที่ Previous High</p>
                    <p>5. <strong>Result:</strong> R:R = 1:3, ชนะ 7/10 ครั้ง</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Counter-trend */}
          <Card className="bg-gradient-to-r from-red-600/20 to-rose-600/20 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400 text-xl">🔄 Counter-trend Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <p className="text-slate-300 text-sm mb-4">
                    <strong className="text-red-400">Counter-trend</strong> คือการเทรด <strong>"กับทิศทางของกระแส"</strong> 
                    หรือการจับ <strong>Reversal</strong> เป็นกลยุทธ์ที่ให้ผลตอบแทนสูง แต่ <strong>ความเสี่ยงสูงมาก</strong>
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-green-400 font-bold mb-3">✅ ข้อดี:</h4>
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li>• <strong>Risk:Reward สูง:</strong> 1:5 ถึง 1:10</li>
                        <li>• <strong>Entry แม่นยำ:</strong> เข้าใกล้ Top/Bottom</li>
                        <li>• <strong>กำไรเร็ว:</strong> Reversal มาแรงมาก</li>
                        <li>• <strong>Stop Loss ใกล้:</strong> ขาดทุนจำกัด</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-red-400 font-bold mb-3">❌ ข้อเสีย:</h4>
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li>• <strong>อัตราชนะต่ำ:</strong> 30-40%</li>
                        <li>• <strong>จิตใจแย่:</strong> เทรดกับกระแส</li>
                        <li>• <strong>Timing ยาก:</strong> ต้องใช้ประสบการณ์</li>
                        <li>• <strong>False Signal เยอะ:</strong> Trend อาจยาวกว่าคิด</li>
                        <li>• <strong>ไม่เหมาะมือใหม่:</strong> ต้องใช้ skill สูง</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-red-600/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    🚨 เมื่อไหร่ควรเทรด Counter-trend
                  </h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• <strong>Over Extension:</strong> ราคาไปไกลจาก MA มากผิดปกติ</li>
                    <li>• <strong>Divergence:</strong> RSI/MACD ทำ Divergence ชัดเจน</li>
                    <li>• <strong>Key Resistance/Support:</strong> ราคาถึงระดับสำคัญมาก</li>
                    <li>• <strong>Round Numbers:</strong> 1.2000, 1.3000 + Rejection</li>
                    <li>• <strong>News Reversal:</strong> ข่าวใหญ่ที่เปลี่ยนทิศทาง</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Breakout & Retest */}
          <Card className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400 text-xl">⚡ Breakout & Retest Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <p className="text-slate-300 text-sm mb-4">
                    <strong className="text-blue-400">Breakout & Retest</strong> คือการเทรดตอนที่ราคา <strong>"ทะลุ"</strong> 
                    ระดับสำคัญ แล้ว <strong>"กลับมาทดสอบ"</strong> ระดับเดิม เป็นหนึ่งในกลยุทธ์ที่ได้ผลดีที่สุด
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-purple-600/20 rounded border border-purple-500/30">
                      <h4 className="text-purple-400 font-semibold mb-2">🔥 1. Breakout</h4>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• ราคาทะลุ S&R แรงๆ</li>
                        <li>• Volume สูงผิดปกติ</li>
                        <li>• Close เหนือ/ใต้ระดับชัดเจน</li>
                        <li>• ไม่ใช่ Fake Breakout</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-amber-600/20 rounded border border-amber-500/30">
                      <h4 className="text-amber-400 font-semibold mb-2">🔄 2. Retest</h4>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• ราคากลับมาทดสอบระดับเดิม</li>
                        <li>• <strong>S&R Flip:</strong> Support → Resistance</li>
                        <li>• Volume ลดลง (Normal)</li>
                        <li>• รอ Rejection Signal</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-green-600/20 rounded border border-green-500/30">
                      <h4 className="text-green-400 font-semibold mb-2">🎯 3. Entry</h4>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• เข้าหลัง Retest สำเร็จ</li>
                        <li>• ใช้ Pin Bar, Engulfing</li>
                        <li>• SL นอกเขต Retest</li>
                        <li>• TP ที่ S&R ถัดไป</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="text-blue-400 font-bold mb-2">💎 ตัวอย่าง Breakout & Retest</h4>
                  <div className="text-sm text-slate-300 space-y-1">
                    <p><strong>Setup:</strong> GBP/USD ทะลุ Resistance ที่ 1.3000</p>
                    <p>1. <strong>Breakout:</strong> ราคาปิดเหนือ 1.3000 ด้วย Volume สูง</p>
                    <p>2. <strong>Wait:</strong> รอ 2-3 เทียน ให้ตลาดสงบ</p>
                    <p>3. <strong>Retest:</strong> ราคากลับลงมาที่ 1.3000 (Support ใหม่)</p>
                    <p>4. <strong>Signal:</strong> Pin Bar Bullish ที่ 1.3000</p>
                    <p>5. <strong>Entry:</strong> BUY ที่ 1.3010, SL: 1.2980, TP: 1.3200</p>
                    <p>6. <strong>R:R:</strong> 30 pips risk, 190 pips reward = 1:6.3</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supply-Demand Strategy */}
          <Card className="bg-gradient-to-r from-purple-600/20 to-violet-600/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 text-xl">🎯 Supply & Demand Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <p className="text-slate-300 text-sm mb-4">
                    <strong className="text-purple-400">Supply & Demand</strong> มองตลาดในมุมของ <strong>"อุปทาน-อุปสงค์"</strong> 
                    หาโซนที่มีแรงซื้อ/ขายแฝงอยู่ เพื่อเทรดตอนราคากลับมาทดสอบโซนเหล่านั้น
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-green-600/20 rounded border border-green-500/30">
                      <h4 className="text-green-400 font-semibold mb-2">🟢 Demand Zone (BUY Zone)</h4>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• หาโซนที่ราคา <strong>เด้งขึ้นแรงๆ</strong></li>
                        <li>• มี <strong>Base/Consolidation</strong> ก่อนขึ้น</li>
                        <li>• <strong>Fresh Zone:</strong> ยังไม่เคยทดสอบ</li>
                        <li>• <strong>Volume Spike:</strong> มีปริมาณมาก</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-red-600/20 rounded border border-red-500/30">
                      <h4 className="text-red-400 font-semibold mb-2">🔴 Supply Zone (SELL Zone)</h4>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• หาโซนที่ราคา <strong>ดิ่งลงแรงๆ</strong></li>
                        <li>• มี <strong>Distribution</strong> ก่อนลง</li>
                        <li>• <strong>Fresh Zone:</strong> ยังไม่เคยทดสอบ</li>
                        <li>• <strong>Rejection Pattern:</strong> มี Pin Bar</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trading Styles */}
          <Card className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-400 text-xl">⏰ สไตล์การเทรด: Scalping, Day Trade, Swing Trade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-red-600/20 rounded border border-red-500/30">
                    <h4 className="text-red-400 font-bold mb-3">⚡ Scalping</h4>
                    <div className="space-y-2 text-sm text-slate-300">
                      <p><strong>ระยะเวลา:</strong> 1-15 นาที</p>
                      <p><strong>Timeframe:</strong> M1, M5</p>
                      <p><strong>Target:</strong> 5-20 pips</p>
                      <p><strong>Trades/Day:</strong> 10-50 รอบ</p>
                      <div className="mt-3">
                        <p className="text-green-400 text-xs mb-1">✅ เหมาะกับ:</p>
                        <ul className="text-xs space-y-1">
                          <li>• คนที่มีเวลาเต็มตัว</li>
                          <li>• ใจเย็น ตัดสินใจเร็ว</li>
                          <li>• ชอบความตื่นเต้น</li>
                        </ul>
                      </div>
                      <div className="mt-3">
                        <p className="text-red-400 text-xs mb-1">❌ ข้อเสีย:</p>
                        <ul className="text-xs space-y-1">
                          <li>• Spread กินกำไร</li>
                          <li>• Stress สูงมาก</li>
                          <li>• ต้องใช้ Leverage สูง</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-600/20 rounded border border-blue-500/30">
                    <h4 className="text-blue-400 font-bold mb-3">📊 Day Trading</h4>
                    <div className="space-y-2 text-sm text-slate-300">
                      <p><strong>ระยะเวลา:</strong> ในวันเดียว</p>
                      <p><strong>Timeframe:</strong> M15, M30, H1</p>
                      <p><strong>Target:</strong> 30-100 pips</p>
                      <p><strong>Trades/Day:</strong> 1-5 รอบ</p>
                      <div className="mt-3">
                        <p className="text-green-400 text-xs mb-1">✅ เหมาะกับ:</p>
                        <ul className="text-xs space-y-1">
                          <li>• คนทำงาน Part-time</li>
                          <li>• ไม่อยากถือข้ามคืน</li>
                          <li>• เริ่มต้นเทรด</li>
                        </ul>
                      </div>
                      <div className="mt-3">
                        <p className="text-blue-400 text-xs mb-1">🎯 กลยุทธ์:</p>
                        <ul className="text-xs space-y-1">
                          <li>• Breakout Morning Session</li>
                          <li>• London/NY Overlap</li>
                          <li>• News Trading</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-600/20 rounded border border-green-500/30">
                    <h4 className="text-green-400 font-bold mb-3">📈 Swing Trading</h4>
                    <div className="space-y-2 text-sm text-slate-300">
                      <p><strong>ระยะเวลา:</strong> 2-10 วัน</p>
                      <p><strong>Timeframe:</strong> H4, Daily</p>
                      <p><strong>Target:</strong> 100-500+ pips</p>
                      <p><strong>Trades/Week:</strong> 1-3 รอบ</p>
                      <div className="mt-3">
                        <p className="text-green-400 text-xs mb-1">✅ เหมาะกับ:</p>
                        <ul className="text-xs space-y-1">
                          <li>• คนมีงานประจำ</li>
                          <li>• มีทุนมาก</li>
                          <li>• ไม่มีเวลามอง Chart</li>
                        </ul>
                      </div>
                      <div className="mt-3">
                        <p className="text-green-400 text-xs mb-1">🎯 กลยุทธ์:</p>
                        <ul className="text-xs space-y-1">
                          <li>• Major Trend Following</li>
                          <li>• Weekly S&R</li>
                          <li>• Fundamental + Technical</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-600/20 to-yellow-600/20 p-4 rounded-lg border border-amber-500/30">
                  <h4 className="text-amber-400 font-bold mb-2">💡 เลือกสไตล์ให้เหมาะกับตัวเอง</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
                    <div>
                      <p className="text-green-400 font-semibold mb-2">🎯 พิจารณาปัจจัย:</p>
                      <ul className="space-y-1">
                        <li>• <strong>เวลาที่มี:</strong> มากน้อยแค่ไหน</li>
                        <li>• <strong>ทุนที่มี:</strong> Scalping ต้องทุนมาก</li>
                        <li>• <strong>บุคลิกภาพ:</strong> ใจร้อน หรือ ใจเย็น</li>
                        <li>• <strong>ประสบการณ์:</strong> มือใหม่ควรเริ่ม Swing</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-purple-400 font-semibold mb-2">⭐ คำแนะนำ:</p>
                      <ul className="space-y-1">
                        <li>• <strong>มือใหม่:</strong> เริ่มจาก Day Trading</li>
                        <li>• <strong>มีงานประจำ:</strong> Swing Trading</li>
                        <li>• <strong>มีเวลาเต็มตัว:</strong> Scalping/Day Trading</li>
                        <li>• <strong>ทุนน้อย:</strong> Day Trading ขึ้นไป</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:scale-105 transition-all duration-300 bg-gradient-to-br from-slate-900 to-slate-800 border-cyan-500/30 hover:border-cyan-400/50 group w-full max-w-md mx-auto">
          {/* Course Image */}
          <div className="relative h-40 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-t-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-transparent to-blue-600/10" />
            
            {/* Animated Character */}
            <div className="absolute top-4 left-4 z-10">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                  <div className="text-lg">👨‍💼</div>
                </div>
                {/* Speech bubble */}
                <div className="absolute -right-1 -top-1 bg-white rounded-full p-1 animate-pulse">
                  <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">💰</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Animation */}
            <div className="absolute top-3 right-3">
              <div className="bg-slate-900/80 backdrop-blur-sm rounded p-1.5">
                <div className="flex items-end gap-0.5">
                  {[2, 5, 3, 6, 4, 7, 4].map((height, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-t from-green-500 to-green-400 w-1.5 rounded-sm animate-pulse"
                      style={{
                        height: `${height * 2}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center animate-spin-slow">
                  <span className="text-white text-xs font-bold">$</span>
                </div>
                <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-white text-xs">€</span>
                </div>
                <div className="w-6 h-6 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-white text-xs font-bold">¥</span>
                </div>
              </div>
            </div>

            {/* Level Badge */}
            <div className="absolute top-3 left-3">
              <Badge className="bg-green-600/90 text-white font-bold backdrop-blur-sm text-xs">
                พื้นฐาน
              </Badge>
            </div>
          </div>

          <CardContent className="p-6 text-center">
            <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors mb-2">
              พื้นฐานตลาด Forex
            </CardTitle>
            <CardDescription className="text-slate-400 text-sm mb-4">
              เรียนรู้พื้นฐานการเทรด Forex ตั้งแต่เริ่มต้น
            </CardDescription>
            
            <div className="mb-4">
              <div className="text-xs text-slate-400 mb-2">ความคืบหน้า {Math.round((completedChapters.length / chapters.length) * 100)}%</div>
              <div className="bg-slate-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 transition-all duration-500"
                  style={{ width: `${(completedChapters.length / chapters.length) * 100}%` }}
                />
              </div>
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 rounded-full"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              เริ่มเรียน
            </Button>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-full max-h-full w-screen h-screen p-0 m-0 bg-slate-950 border-none rounded-none overflow-hidden">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-50 bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-white backdrop-blur-sm"
          onClick={() => window.location.reload()} // Simple close for now
        >
          ×
        </Button>

        <div className="flex h-full">
          {/* Left Sidebar */}
          <div className="w-80 bg-slate-900/95 backdrop-blur-md border-r border-slate-800/50 flex flex-col">
            {/* Course Header */}
            <div className="p-6 border-b border-slate-800/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">พื้นฐานตลาด Forex</h2>
                  <p className="text-sm text-slate-400">6 บทเรียน • 2 ชั่วโมง</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">ความคืบหน้า</span>
                  <span className="text-cyan-400 font-bold">
                    {Math.round((completedChapters.length / chapters.length) * 100)}%
                  </span>
                </div>
                <div className="bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 transition-all duration-500"
                    style={{ width: `${(completedChapters.length / chapters.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Chapter List */}
            <ScrollArea className="flex-1 px-3 py-4">
              <div className="space-y-2">
                {chapters.map((chapter, index) => (
                  <button
                    key={chapter.id}
                    onClick={() => setSelectedChapter(chapter.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 group ${
                      selectedChapter === chapter.id
                        ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
                        : 'hover:bg-slate-800/50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg transition-colors ${
                        completedChapters.includes(chapter.id)
                          ? 'bg-green-600/20 border border-green-500/30'
                          : selectedChapter === chapter.id
                          ? 'bg-cyan-600/20 border border-cyan-500/30'
                          : 'bg-slate-800/50 border border-slate-700/50'
                      }`}>
                        {completedChapters.includes(chapter.id) ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <chapter.icon className={`w-4 h-4 ${
                            selectedChapter === chapter.id ? 'text-cyan-400' : 'text-slate-400'
                          }`} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-sm mb-1 line-clamp-2 ${
                          selectedChapter === chapter.id ? 'text-cyan-400' : 'text-slate-300 group-hover:text-white'
                        }`}>
                          บทที่ {index + 1}: {chapter.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 mb-2">
                          {chapter.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-slate-600" />
                          <span className="text-xs text-slate-600">{chapter.duration}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>

            {/* Rewards Section */}
            <div className="p-3 border-t border-slate-800/50">
              <div className="bg-gradient-to-r from-amber-600/10 to-orange-600/10 border border-amber-500/20 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-amber-400 animate-pulse" />
                  <div>
                    <p className="text-sm font-semibold text-amber-400">รับ 500 XP</p>
                    <p className="text-xs text-slate-400">เมื่อเรียนจบทุกบท</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col bg-slate-950">
            {/* Header */}
            <div className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800/50 p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {chapters.find(c => c.id === selectedChapter)?.title}
                  </h1>
                  <p className="text-slate-400 max-w-2xl">
                    {chapters.find(c => c.id === selectedChapter)?.description}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => markAsComplete(selectedChapter)}
                    className={`${
                      completedChapters.includes(selectedChapter)
                        ? 'bg-green-600/90 hover:bg-green-700/90 border border-green-500/30'
                        : 'bg-cyan-600/90 hover:bg-cyan-700/90 border border-cyan-500/30'
                    } backdrop-blur-sm`}
                  >
                    {completedChapters.includes(selectedChapter) ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        เรียนจบแล้ว
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        ทำเครื่องหมายว่าจบ
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ maxHeight: 'calc(100vh - 180px)' }}>
              <div className="p-8 max-w-4xl mx-auto">
                <div className="prose prose-invert max-w-none prose-sm">
                  {chapters.find(c => c.id === selectedChapter)?.content}
                </div>
                
                {/* Navigation */}
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-800">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const currentIndex = chapters.findIndex(c => c.id === selectedChapter);
                      if (currentIndex > 0) {
                        setSelectedChapter(chapters[currentIndex - 1].id);
                      }
                    }}
                    disabled={chapters.findIndex(c => c.id === selectedChapter) === 0}
                    className="border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 bg-slate-900/50 backdrop-blur-sm"
                  >
                    บทก่อนหน้า
                  </Button>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span>บทที่ {chapters.findIndex(c => c.id === selectedChapter) + 1} จาก {chapters.length}</span>
                  </div>
                  
                  <Button
                    onClick={() => {
                      const currentIndex = chapters.findIndex(c => c.id === selectedChapter);
                      if (currentIndex < chapters.length - 1) {
                        markAsComplete(selectedChapter);
                        setSelectedChapter(chapters[currentIndex + 1].id);
                      }
                    }}
                    disabled={chapters.findIndex(c => c.id === selectedChapter) === chapters.length - 1}
                    className="bg-cyan-600/90 hover:bg-cyan-700/90 border border-cyan-500/30 backdrop-blur-sm"
                  >
                    บทถัดไป
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ForexBasicsCourse;