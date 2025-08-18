import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Globe, BookOpen, Camera } from "lucide-react";

const ForexBasicsTab = () => {
  console.log("ForexBasicsTab component rendered");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header Section */}
      <div className="relative p-8 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 border-b border-slate-800/50">
        <div className="max-w-2xl mx-auto text-center">
          {/* Profile Image */}
          <div className="relative mb-6 flex justify-center">
            <div 
              onClick={handleImageClick}
              className="relative w-32 h-32 cursor-pointer group"
            >
              {selectedImage ? (
                <img 
                  src={selectedImage} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-cyan-500/30 group-hover:border-cyan-400/50 transition-all duration-300"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center border-4 border-cyan-500/30 group-hover:border-cyan-400/50 transition-all duration-300">
                  <Globe className="w-16 h-16 text-white" />
                </div>
              )}
              
              {/* Upload Overlay */}
              <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white">
                  <Camera className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-xs">เปลี่ยนรูป</span>
                </div>
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Badge className="bg-green-600/20 text-green-400 border-green-500/30">
                พื้นฐาน
              </Badge>
              <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30">
                11 บทเรียน
              </Badge>
              <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/30">
                3 ชั่วโมง
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              พื้นฐานตลาด Forex
            </h1>
            
            <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
              เริ่มต้นการเรียนรู้ Forex ตั้งแต่เริ่มต้น เข้าใจโครงสร้างตลาด ประเภทคู่เงิน 
              และพื้นฐานที่จำเป็นสำหรับการเทรดที่ประสบความสำเร็จ
            </p>

            {/* Trading Chart Visualization */}
            <div className="mt-8 mb-6">
              <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-slate-400">Live Market Data</span>
                </div>
                
                <div className="flex items-end justify-center gap-2 h-20 mb-4">
                  {[
                    { height: 25, color: 'from-green-500 to-green-400', delay: '0s' },
                    { height: 45, color: 'from-blue-500 to-blue-400', delay: '0.1s' },
                    { height: 35, color: 'from-purple-500 to-purple-400', delay: '0.2s' },
                    { height: 60, color: 'from-cyan-500 to-cyan-400', delay: '0.3s' },
                    { height: 40, color: 'from-pink-500 to-pink-400', delay: '0.4s' },
                    { height: 55, color: 'from-amber-500 to-amber-400', delay: '0.5s' },
                    { height: 30, color: 'from-indigo-500 to-indigo-400', delay: '0.6s' },
                    { height: 50, color: 'from-teal-500 to-teal-400', delay: '0.7s' },
                  ].map((bar, i) => (
                    <div
                      key={i}
                      className={`w-6 bg-gradient-to-t ${bar.color} rounded-t-sm animate-pulse transition-all duration-500 hover:scale-110`}
                      style={{
                        height: `${bar.height}px`,
                        animationDelay: bar.delay,
                        animationDuration: '2s'
                      }}
                    />
                  ))}
                </div>

                {/* Currency pairs */}
                <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>EUR/USD</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>GBP/USD</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>USD/JPY</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <span>AUD/USD</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>ตลาดโลก 6.6 ล้านล้านดอลลาร์</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span>เนื้อหาครบถ้วน</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <div className="grid gap-4">
            <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-cyan-400">📚 บทเรียนพื้นฐาน Forex</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid gap-3">
                    {/* บทที่ 1: ความหมายและโครงสร้างของตลาด Forex */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-start bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-blue-500/30 hover:border-blue-400/50 text-blue-400 hover:text-blue-300">
                          <BookOpen className="w-4 h-4 mr-2" />
                          บทที่ 1: ความหมายและโครงสร้างของตลาด Forex
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-5xl max-h-[90vh]">
                        <ScrollArea className="h-[85vh] pr-4">
                          <div className="p-6">
                            <h1 className="text-3xl font-bold text-blue-400 mb-8 text-center">🌍 ความหมายและโครงสร้างของตลาด Forex</h1>
                            
                            {/* ความหมายของ Forex */}
                            <div className="bg-blue-600/10 p-6 rounded-xl border border-blue-500/30 mb-8">
                              <h2 className="text-2xl font-bold text-blue-300 mb-4">💱 Forex คืออะไร?</h2>
                              <p className="text-slate-300 leading-relaxed text-lg mb-4">
                                <strong className="text-cyan-400">Foreign Exchange (Forex)</strong> คือตลาดแลกเปลี่ยนเงินตราต่างประเทศที่ใหญ่ที่สุดในโลก 
                                เป็นตลาดที่มีการซื้อขายเงินตราของประเทศต่างๆ โดยมีมูลค่าการซื้อขายมากกว่า <strong className="text-green-400">6.6 ล้านล้านดอลลาร์สหรัฐต่อวัน</strong>
                              </p>
                              
                              <div className="bg-slate-900/50 p-4 rounded-lg">
                                <h3 className="text-cyan-400 font-semibold mb-3">🔄 หลักการทำงาน</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                  การเทรด Forex คือการซื้อเงินสกุลหนึ่งและขายเงินสกุลอื่นพร้อมกัน เช่น ซื้อ EUR และขาย USD ในคู่เงิน EUR/USD 
                                  โดยหวังว่าค่าเงิน EUR จะแข็งขึ้นเทียบกับ USD
                                </p>
                              </div>
                            </div>

                            {/* เปรียบเทียบกับตลาดอื่น */}
                            <div className="bg-slate-800/30 p-6 rounded-xl mb-8">
                              <h2 className="text-2xl font-bold text-cyan-300 mb-6">⚖️ เปรียบเทียบ Forex vs หุ้น vs คริปโต</h2>
                              
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="border-b border-slate-600">
                                      <th className="text-left p-3 text-cyan-400">หัวข้อ</th>
                                      <th className="text-left p-3 text-blue-400">Forex</th>
                                      <th className="text-left p-3 text-green-400">หุ้น</th>
                                      <th className="text-left p-3 text-purple-400">คริปโต</th>
                                    </tr>
                                  </thead>
                                  <tbody className="text-slate-300">
                                    <tr className="border-b border-slate-700">
                                      <td className="p-3 font-semibold">เวลาเปิดซื้อขาย</td>
                                      <td className="p-3">24 ชม. 5 วัน</td>
                                      <td className="p-3">6-8 ชม./วัน</td>
                                      <td className="p-3">24/7</td>
                                    </tr>
                                    <tr className="border-b border-slate-700">
                                      <td className="p-3 font-semibold">สภาพคล่อง</td>
                                      <td className="p-3">สูงมาก</td>
                                      <td className="p-3">ปานกลาง-สูง</td>
                                      <td className="p-3">ผันแปร</td>
                                    </tr>
                                    <tr className="border-b border-slate-700">
                                      <td className="p-3 font-semibold">ความผันผวน</td>
                                      <td className="p-3">ปานกลาง</td>
                                      <td className="p-3">ปานกลาง</td>
                                      <td className="p-3">สูงมาก</td>
                                    </tr>
                                    <tr className="border-b border-slate-700">
                                      <td className="p-3 font-semibold">Leverage</td>
                                      <td className="p-3">1:30-1:500</td>
                                      <td className="p-3">1:2-1:5</td>
                                      <td className="p-3">1:2-1:100</td>
                                    </tr>
                                    <tr>
                                      <td className="p-3 font-semibold">ตัวอย่าง</td>
                                      <td className="p-3">EUR/USD</td>
                                      <td className="p-3">AAPL, TSLA</td>
                                      <td className="p-3">BTC/USDT</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            {/* โครงสร้างตลาด */}
                            <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 p-6 rounded-xl border border-cyan-500/30 mb-8">
                              <h2 className="text-2xl font-bold text-cyan-300 mb-6">🏗️ โครงสร้างตลาด Forex</h2>
                              
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div className="bg-slate-900/50 p-4 rounded-lg">
                                    <h3 className="text-green-400 font-semibold mb-2">🏦 Interbank Market</h3>
                                    <p className="text-slate-300 text-sm">ธนาคารใหญ่ซื้อขายกันโดยตรง มีสเปรดต่ำที่สุด</p>
                                  </div>
                                  
                                  <div className="bg-slate-900/50 p-4 rounded-lg">
                                    <h3 className="text-blue-400 font-semibold mb-2">🏢 Prime Brokers</h3>
                                    <p className="text-slate-300 text-sm">โบรกเกอร์ใหญ่ที่เชื่อมต่อกับธนาคาร</p>
                                  </div>
                                </div>
                                
                                <div className="space-y-4">
                                  <div className="bg-slate-900/50 p-4 rounded-lg">
                                    <h3 className="text-purple-400 font-semibold mb-2">💼 Retail Brokers</h3>
                                    <p className="text-slate-300 text-sm">โบรกเกอร์รายย่อยสำหรับผู้เทรดทั่วไป</p>
                                  </div>
                                  
                                  <div className="bg-slate-900/50 p-4 rounded-lg">
                                    <h3 className="text-amber-400 font-semibold mb-2">👤 Retail Traders</h3>
                                    <p className="text-slate-300 text-sm">ผู้เทรดรายย่อย (เราคือกลุมนี้)</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* สรุปประเด็นสำคัญ */}
                            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 p-6 rounded-xl border border-green-500/30">
                              <h2 className="text-xl font-bold text-green-300 mb-4">📋 สรุปประเด็นสำคัญ</h2>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <h3 className="text-cyan-400 font-semibold">✅ ข้อดี:</h3>
                                  <ul className="text-slate-300 space-y-1 text-sm">
                                    <li>• ตลาดใหญ่ที่สุดในโลก</li>
                                    <li>• เปิดซื้อขายตลอด 24 ชั่วโมง</li>
                                    <li>• สภาพคล่องสูง</li>
                                    <li>• ค่าธรรมเนียมต่ำ</li>
                                    <li>• มี Leverage สูง</li>
                                  </ul>
                                </div>
                                
                                <div className="space-y-2">
                                  <h3 className="text-red-400 font-semibold">⚠️ ข้อควรระวัง:</h3>
                                  <ul className="text-slate-300 space-y-1 text-sm">
                                    <li>• ต้องมีความรู้เฉพาะทาง</li>
                                    <li>• Leverage เพิ่มความเสี่ยง</li>
                                    <li>• อิทธิพลจากข่าวเศรษฐกิจ</li>
                                    <li>• ต้องจัดการอารมณ์</li>
                                    <li>• อาจสูญเสียเงินทุน</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>

                    {/* บทที่ 2: ชนิดของคู่เงิน */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-start bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30 hover:border-green-400/50 text-green-400 hover:text-green-300">
                          <BookOpen className="w-4 h-4 mr-2" />
                          บทที่ 2: ชนิดของคู่เงิน (Major, Minor, Exotic)
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-5xl max-h-[90vh]">
                        <ScrollArea className="h-[85vh] pr-4">
                          <div className="p-6">
                            <h1 className="text-3xl font-bold text-green-400 mb-8 text-center">💱 ชนิดของคู่เงิน Forex</h1>
                            
                            {/* คู่เงินหลัก (Major Pairs) */}
                            <div className="bg-green-600/10 p-6 rounded-xl border border-green-500/30 mb-8">
                              <h2 className="text-2xl font-bold text-green-300 mb-6">👑 คู่เงินหลัก (Major Pairs)</h2>
                              <p className="text-slate-300 leading-relaxed mb-6">
                                คู่เงินหลักคือคู่เงินที่มีปริมาณการซื้อขายสูงที่สุด มีสภาพคล่องดี และสเปรดต่ำ 
                                ประกอบด้วย <strong className="text-cyan-400">7 คู่เงินหลัก</strong> ที่ทุกคู่มี USD อยู่ด้วย
                              </p>
                              
                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-4 rounded-lg border border-blue-500/30">
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-blue-400 font-bold text-lg">EUR/USD</h3>
                                    <span className="text-xs bg-blue-600/30 px-2 py-1 rounded">ยุโรป/อเมริกา</span>
                                  </div>
                                  <p className="text-slate-300 text-sm mb-1">ยูโร / ดอลลาร์สหรัฐ</p>
                                  <p className="text-blue-300 text-xs">คู่เงินที่นิยมเทรดมากที่สุดในโลก 🏆</p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 p-4 rounded-lg border border-red-500/30">
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-red-400 font-bold text-lg">GBP/USD</h3>
                                    <span className="text-xs bg-red-600/30 px-2 py-1 rounded">อังกฤษ/อเมริกา</span>
                                  </div>
                                  <p className="text-slate-300 text-sm mb-1">ปอนด์ / ดอลลาร์สหรัฐ</p>
                                  <p className="text-red-300 text-xs">มีความผันผวนสูง เรียกว่า "Cable" 📡</p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 p-4 rounded-lg border border-yellow-500/30">
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-yellow-400 font-bold text-lg">USD/JPY</h3>
                                    <span className="text-xs bg-yellow-600/30 px-2 py-1 rounded">อเมริกา/ญี่ปุ่น</span>
                                  </div>
                                  <p className="text-slate-300 text-sm mb-1">ดอลลาร์สหรัฐ / เยน</p>
                                  <p className="text-yellow-300 text-xs">เสถียรภาพดี มีสภาพคล่องสูง 🏯</p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 p-4 rounded-lg border border-purple-500/30">
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-purple-400 font-bold text-lg">USD/CHF</h3>
                                    <span className="text-xs bg-purple-600/30 px-2 py-1 rounded">อเมริกา/สวิส</span>
                                  </div>
                                  <p className="text-slate-300 text-sm mb-1">ดอลลาร์สหรัฐ / ฟรังก์</p>
                                  <p className="text-purple-300 text-xs">Safe Haven เรียกว่า "Swissie" 🏔️</p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-cyan-600/20 to-teal-600/20 p-4 rounded-lg border border-cyan-500/30">
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-cyan-400 font-bold text-lg">AUD/USD</h3>
                                    <span className="text-xs bg-cyan-600/30 px-2 py-1 rounded">ออสเตรเลีย/อเมริกา</span>
                                  </div>
                                  <p className="text-slate-300 text-sm mb-1">ดอลลาร์ออสเตรเลีย / ดอลลาร์สหรัฐ</p>
                                  <p className="text-cyan-300 text-xs">เรียกว่า "Aussie" 🦘</p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-red-500/20 to-red-700/20 p-4 rounded-lg border border-red-400/30">
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-red-300 font-bold text-lg">USD/CAD</h3>
                                    <span className="text-xs bg-red-500/30 px-2 py-1 rounded">อเมริกา/แคนาดา</span>
                                  </div>
                                  <p className="text-slate-300 text-sm mb-1">ดอลลาร์สหรัฐ / ดอลลาร์แคนาดา</p>
                                  <p className="text-red-200 text-xs">เรียกว่า "Loonie" 🍁</p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 p-4 rounded-lg border border-green-500/30">
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-green-400 font-bold text-lg">NZD/USD</h3>
                                    <span className="text-xs bg-green-600/30 px-2 py-1 rounded">นิวซีแลนด์/อเมริกา</span>
                                  </div>
                                  <p className="text-slate-300 text-sm mb-1">ดอลลาร์นิวซีแลนด์ / ดอลลาร์สหรัฐ</p>
                                  <p className="text-green-300 text-xs">เรียกว่า "Kiwi" 🥝</p>
                                </div>
                              </div>
                              
                              <div className="bg-slate-900/50 p-4 rounded-lg">
                                <h3 className="text-cyan-400 font-semibold mb-3">✅ ข้อดีของคู่เงินหลัก:</h3>
                                <ul className="text-slate-300 space-y-1 text-sm">
                                  <li>• สเปรดต่ำ (โดยทั่วไป 0.5-3 pips)</li>
                                  <li>• สภาพคล่องสูง (ซื้อขายได้ง่าย)</li>
                                  <li>• ความผันผวนปานกลาง (เหมาะมือใหม่)</li>
                                  <li>• ข้อมูลข่าวสารเยอะ วิเคราะห์ได้ง่าย</li>
                                </ul>
                              </div>
                            </div>

                            {/* คู่เงินรอง (Minor Pairs) */}
                            <div className="bg-amber-600/10 p-6 rounded-xl border border-amber-500/30 mb-8">
                              <h2 className="text-2xl font-bold text-amber-300 mb-6">🥈 คู่เงินรอง (Minor Pairs / Cross Currency)</h2>
                              <p className="text-slate-300 leading-relaxed mb-6">
                                คู่เงินรองคือคู่เงินที่<strong className="text-red-400">ไม่มี USD</strong> แต่ประกอบด้วยสกุลเงินหลักอื่นๆ 
                                มีสภาพคล่องรองลงมา และสเปรดกว้างกว่าคู่เงินหลัก
                              </p>
                              
                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                <div className="bg-gradient-to-br from-blue-500/20 to-green-500/20 p-4 rounded-lg border border-blue-400/30">
                                  <h3 className="text-blue-300 font-bold text-lg">EUR/GBP</h3>
                                  <p className="text-slate-300 text-sm">ยูโร / ปอนด์</p>
                                  <p className="text-blue-200 text-xs">ยุโรปกับอังกฤษ 🇪🇺🇬🇧</p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-blue-500/20 to-yellow-500/20 p-4 rounded-lg border border-blue-400/30">
                                  <h3 className="text-blue-300 font-bold text-lg">EUR/JPY</h3>
                                  <p className="text-slate-300 text-sm">ยูโร / เยน</p>
                                  <p className="text-blue-200 text-xs">ยุโรปกับญี่ปุ่น 🇪🇺🇯🇵</p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-red-500/20 to-yellow-500/20 p-4 rounded-lg border border-red-400/30">
                                  <h3 className="text-red-300 font-bold text-lg">GBP/JPY</h3>
                                  <p className="text-slate-300 text-sm">ปอนด์ / เยน</p>
                                  <p className="text-red-200 text-xs">ผันผวนสูงมาก! 🎢</p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-4 rounded-lg border border-cyan-400/30">
                                  <h3 className="text-cyan-300 font-bold text-lg">AUD/CHF</h3>
                                  <p className="text-slate-300 text-sm">ดอลลาร์ออสซี / ฟรังก์</p>
                                  <p className="text-cyan-200 text-xs">Cross แปลกใหม่ 🤔</p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-green-500/20 to-red-500/20 p-4 rounded-lg border border-green-400/30">
                                  <h3 className="text-green-300 font-bold text-lg">NZD/CAD</h3>
                                  <p className="text-slate-300 text-sm">ดอลลาร์กีวี่ / ดอลลาร์แคนาดา</p>
                                  <p className="text-green-200 text-xs">Commodity Currencies 🏭</p>
                                </div>
                              </div>
                              
                              <div className="bg-slate-900/50 p-4 rounded-lg">
                                <h3 className="text-amber-400 font-semibold mb-3">⚠️ ข้อควรระวัง:</h3>
                                <ul className="text-slate-300 space-y-1 text-sm">
                                  <li>• สเปรดกว้างกว่า (3-8 pips)</li>
                                  <li>• สภาพคล่องต่ำกว่าคู่เงินหลัก</li>
                                  <li>• ความผันผวนสูงกว่า (โดยเฉพาะ GBP/JPY)</li>
                                  <li>• เหมาะสำหรับเทรดเดอร์ที่มีประสบการณ์</li>
                                </ul>
                              </div>
                            </div>

                            {/* คู่เงินแปลกใหม่ (Exotic Pairs) */}
                            <div className="bg-purple-600/10 p-6 rounded-xl border border-purple-500/30 mb-8">
                              <h2 className="text-2xl font-bold text-purple-300 mb-6">🥉 คู่เงินแปลกใหม่ (Exotic Pairs)</h2>
                              <p className="text-slate-300 leading-relaxed mb-6">
                                คู่เงินแปลกใหม่คือคู่เงินที่ประกอบด้วย<strong className="text-cyan-400">สกุลเงินหลัก 1 ตัว + สกุลเงินประเทศกำลังพัฒนา</strong> 
                                มีความเสี่ยงสูง สเปรดกว้าง และสภาพคล่องต่ำ
                              </p>
                              
                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                <div className="bg-gradient-to-br from-blue-600/20 to-red-600/20 p-4 rounded-lg border border-blue-500/30">
                                  <h3 className="text-blue-400 font-bold text-lg">USD/THB</h3>
                                  <p className="text-slate-300 text-sm">ดอลลาร์สหรัฐ / บาทไทย</p>
                                  <p className="text-blue-300 text-xs">ของเราเอง! 🇹🇭</p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-green-600/20 to-yellow-600/20 p-4 rounded-lg border border-green-500/30">
                                  <h3 className="text-green-400 font-bold text-lg">EUR/TRY</h3>
                                  <p className="text-slate-300 text-sm">ยูโร / ลีราตุรกี</p>
                                  <p className="text-green-300 text-xs">ผันผวนมาก! 📈📉</p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-red-600/20 to-orange-600/20 p-4 rounded-lg border border-red-500/30">
                                  <h3 className="text-red-400 font-bold text-lg">USD/ZAR</h3>
                                  <p className="text-slate-300 text-sm">ดอลลาร์สหรัฐ / แรนด์แอฟริกาใต้</p>
                                  <p className="text-red-300 text-xs">High Risk, High Return 🎰</p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-4 rounded-lg border border-purple-500/30">
                                  <h3 className="text-purple-400 font-bold text-lg">GBP/MXN</h3>
                                  <p className="text-slate-300 text-sm">ปอนด์ / เปโซเม็กซิโก</p>
                                  <p className="text-purple-300 text-xs">สเปรดกว้างมาก 😵</p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-teal-600/20 to-blue-600/20 p-4 rounded-lg border border-teal-500/30">
                                  <h3 className="text-teal-400 font-bold text-lg">USD/SGD</h3>
                                  <p className="text-slate-300 text-sm">ดอลลาร์สหรัฐ / ดอลลาร์สิงคโปร์</p>
                                  <p className="text-teal-300 text-xs">เสถียรกว่า Exotic อื่น 🏙️</p>
                                </div>
                              </div>
                              
                              <div className="bg-slate-900/50 p-4 rounded-lg">
                                <h3 className="text-red-400 font-semibold mb-3">🚨 ความเสี่ยงสูง:</h3>
                                <ul className="text-slate-300 space-y-1 text-sm">
                                  <li>• สเปรดกว้างมาก (10-50+ pips)</li>
                                  <li>• สภาพคล่องต่ำ (อาจเทรดไม่ได้บางช่วง)</li>
                                  <li>• ความผันผวนสูงมาก</li>
                                  <li>• ได้รับผลกระทบจากปัจจัยในประเทศมาก</li>
                                  <li>• <strong className="text-red-300">ไม่แนะนำสำหรับมือใหม่</strong></li>
                                </ul>
                              </div>
                            </div>

                            {/* สรุปและคำแนะนำ */}
                            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 p-6 rounded-xl border border-green-500/30">
                              <h2 className="text-xl font-bold text-green-300 mb-4">📋 สรุปและคำแนะนำ</h2>
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div className="bg-green-600/20 p-4 rounded-lg">
                                    <h3 className="text-green-400 font-semibold mb-2">✅ สำหรับมือใหม่:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• เริ่มจาก <strong>Major Pairs</strong></li>
                                      <li>• แนะนำ EUR/USD, GBP/USD</li>
                                      <li>• สเปรดต่ำ ข้อมูลเยอะ</li>
                                      <li>• เรียนรู้ได้ง่าย</li>
                                    </ul>
                                  </div>
                                  
                                  <div className="bg-amber-600/20 p-4 rounded-lg">
                                    <h3 className="text-amber-400 font-semibold mb-2">⚖️ สำหรับมีประสบการณ์:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• ลอง <strong>Minor Pairs</strong></li>
                                      <li>• EUR/JPY, GBP/JPY</li>
                                      <li>• โอกาสกำไรมากขึ้น</li>
                                      <li>• ต้องระวังความเสี่ยง</li>
                                    </ul>
                                  </div>
                                </div>
                                
                                <div className="space-y-4">
                                  <div className="bg-red-600/20 p-4 rounded-lg">
                                    <h3 className="text-red-400 font-semibold mb-2">🚫 ควรหลีกเลี่ยง:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• <strong>Exotic Pairs</strong> ถ้าเป็นมือใหม่</li>
                                      <li>• สเปรดกว้าง ความเสี่ยงสูง</li>
                                      <li>• อาจสูญเสียเงินทุนง่าย</li>
                                      <li>• เก็บไว้ทีหลัง</li>
                                    </ul>
                                  </div>
                                  
                                  <div className="bg-blue-600/20 p-4 rounded-lg">
                                    <h3 className="text-blue-400 font-semibold mb-2">💡 เคล็ดลับ:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• เทรดไม่เกิน 2-3 คู่เงิน</li>
                                      <li>• เรียนรู้ให้ลึกแทนที่กว้าง</li>
                                      <li>• ติดตามข่าวประเทศเจ้าของสกุลเงิน</li>
                                      <li>• ฝึกใน Demo ก่อนใช้เงินจริง</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>

                    {/* บทที่ 3: เครื่องมือและแพลตฟอร์มการเทรด Forex */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-start bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30 hover:border-purple-400/50 text-purple-400 hover:text-purple-300">
                          <BookOpen className="w-4 h-4 mr-2" />
                          บทที่ 3: เครื่องมือและแพลตฟอร์มการเทรด Forex
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-5xl max-h-[90vh]">
                        <ScrollArea className="h-[85vh] pr-4">
                          <div className="p-6">
                            <h1 className="text-3xl font-bold text-purple-400 mb-8 text-center">🛠️ เครื่องมือและแพลตฟอร์มการเทรด Forex</h1>
                            
                            {/* วิธีเลือกโบรกเกอร์ */}
                            <div className="bg-purple-600/10 p-6 rounded-xl border border-purple-500/30 mb-8">
                              <h2 className="text-2xl font-bold text-purple-300 mb-6">🏦 วิธีเลือกโบรกเกอร์ Forex</h2>
                              <p className="text-slate-300 leading-relaxed mb-6">
                                การเลือก<strong className="text-cyan-400">โบรกเกอร์</strong>เป็นขั้นตอนสำคัญที่สุดในการเริ่มเทรด Forex 
                                เพราะโบรกเกอร์คือตัวกลางที่ให้เราเข้าถึงตลาด Forex
                              </p>
                              
                              <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                                {/* Regulation */}
                                <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-6 rounded-lg border border-blue-500/30">
                                  <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-blue-600/30 rounded-full flex items-center justify-center mr-4">
                                      <span className="text-2xl">🛡️</span>
                                    </div>
                                    <h3 className="text-blue-400 font-bold text-lg">Regulation (การกำกับดูแล)</h3>
                                  </div>
                                  <ul className="text-slate-300 space-y-2 text-sm">
                                    <li><strong className="text-cyan-400">FCA (UK):</strong> มาตรฐานสูงที่สุด</li>
                                    <li><strong className="text-green-400">CySEC (Cyprus):</strong> ยุโรป เชื่อถือได้</li>
                                    <li><strong className="text-yellow-400">ASIC (Australia):</strong> เข้มงวด</li>
                                    <li><strong className="text-red-400">หลีกเลี่ยง:</strong> ไม่มี License</li>
                                  </ul>
                                  <div className="mt-4 p-3 bg-blue-900/30 rounded">
                                    <p className="text-blue-300 text-xs">
                                      <strong>💡 เคล็ดลับ:</strong> ตรวจสอบใน website หน่วยงานกำกับดูแลโดยตรง
                                    </p>
                                  </div>
                                </div>

                                {/* ค่าธรรมเนียม */}
                                <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 p-6 rounded-lg border border-green-500/30">
                                  <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-green-600/30 rounded-full flex items-center justify-center mr-4">
                                      <span className="text-2xl">💰</span>
                                    </div>
                                    <h3 className="text-green-400 font-bold text-lg">ค่าธรรมเนียม</h3>
                                  </div>
                                  <ul className="text-slate-300 space-y-2 text-sm">
                                    <li><strong className="text-cyan-400">Spread:</strong> 0.5-3 pips (Major)</li>
                                    <li><strong className="text-yellow-400">Commission:</strong> $0-7 ต่อ Lot</li>
                                    <li><strong className="text-purple-400">Swap:</strong> ค่าดอกเบี้ยค้างคืน</li>
                                    <li><strong className="text-red-400">Hidden Fees:</strong> ระวัง!</li>
                                  </ul>
                                  <div className="mt-4 p-3 bg-green-900/30 rounded">
                                    <p className="text-green-300 text-xs">
                                      <strong>💡 เคล็ดลับ:</strong> เปรียบเทียบ Total Cost ไม่ใช่แค่ Spread
                                    </p>
                                  </div>
                                </div>

                                {/* ความน่าเชื่อถือ */}
                                <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 p-6 rounded-lg border border-amber-500/30">
                                  <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-amber-600/30 rounded-full flex items-center justify-center mr-4">
                                      <span className="text-2xl">⭐</span>
                                    </div>
                                    <h3 className="text-amber-400 font-bold text-lg">ความน่าเชื่อถือ</h3>
                                  </div>
                                  <ul className="text-slate-300 space-y-2 text-sm">
                                    <li><strong className="text-cyan-400">เก่าแก่:</strong> ดำเนินงาน 5+ ปี</li>
                                    <li><strong className="text-green-400">รีวิว:</strong> ความคิดเห็นจริง</li>
                                    <li><strong className="text-blue-400">Support:</strong> ตอบกลับเร็ว</li>
                                    <li><strong className="text-purple-400">Execution:</strong> ไม่ Slippage</li>
                                  </ul>
                                  <div className="mt-4 p-3 bg-amber-900/30 rounded">
                                    <p className="text-amber-300 text-xs">
                                      <strong>💡 เคล็ดลับ:</strong> ทดสอบ Demo Account ก่อน
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* เช็คลิสต์เลือกโบรกเกอร์ */}
                              <div className="bg-slate-900/50 p-6 rounded-lg">
                                <h3 className="text-cyan-400 font-semibold mb-4">📋 เช็คลิสต์เลือกโบรกเกอร์:</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <div className="flex items-center">
                                      <span className="text-green-400 mr-2">✅</span>
                                      <span className="text-slate-300 text-sm">มี Regulation ที่น่าเชื่อถือ</span>
                                    </div>
                                    <div className="flex items-center">
                                      <span className="text-green-400 mr-2">✅</span>
                                      <span className="text-slate-300 text-sm">Spread แคบ Commission ต่ำ</span>
                                    </div>
                                    <div className="flex items-center">
                                      <span className="text-green-400 mr-2">✅</span>
                                      <span className="text-slate-300 text-sm">Deposit/Withdraw ง่าย</span>
                                    </div>
                                    <div className="flex items-center">
                                      <span className="text-green-400 mr-2">✅</span>
                                      <span className="text-slate-300 text-sm">แพลตฟอร์มเสถียร</span>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex items-center">
                                      <span className="text-green-400 mr-2">✅</span>
                                      <span className="text-slate-300 text-sm">Support ภาษาไทย</span>
                                    </div>
                                    <div className="flex items-center">
                                      <span className="text-green-400 mr-2">✅</span>
                                      <span className="text-slate-300 text-sm">Demo Account ฟรี</span>
                                    </div>
                                    <div className="flex items-center">
                                      <span className="text-green-400 mr-2">✅</span>
                                      <span className="text-slate-300 text-sm">เงินฝากขั้นต่ำเหมาะสม</span>
                                    </div>
                                    <div className="flex items-center">
                                      <span className="text-green-400 mr-2">✅</span>
                                      <span className="text-slate-300 text-sm">มี Educational Resources</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* แพลตฟอร์มยอดนิยม */}
                            <div className="bg-slate-800/30 p-6 rounded-xl mb-8">
                              <h2 className="text-2xl font-bold text-cyan-300 mb-6">🖥️ แพลตฟอร์มการเทรดยอดนิยม</h2>
                              
                              <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                                {/* MetaTrader 4 */}
                                <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 p-6 rounded-lg border border-blue-500/30">
                                  <div className="flex items-center mb-4">
                                    <div className="w-16 h-16 bg-blue-600/30 rounded-xl flex items-center justify-center mr-4">
                                      <span className="text-3xl font-bold text-blue-400">MT4</span>
                                    </div>
                                    <div>
                                      <h3 className="text-blue-400 font-bold text-lg">MetaTrader 4</h3>
                                      <p className="text-slate-400 text-sm">มาตรฐานอุตสาหกรรม</p>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <div className="bg-green-600/20 p-3 rounded">
                                      <h4 className="text-green-400 font-semibold text-sm mb-1">✅ ข้อดี:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• เสถียร ใช้ง่าย</li>
                                        <li>• EA (Expert Advisor) เยอะ</li>
                                        <li>• Indicator ครบครัน</li>
                                        <li>• Community ใหญ่</li>
                                      </ul>
                                    </div>
                                    
                                    <div className="bg-red-600/20 p-3 rounded">
                                      <h4 className="text-red-400 font-semibold text-sm mb-1">❌ ข้อเสีย:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• UI ดูเก่า</li>
                                        <li>• ช้ากว่า MT5</li>
                                        <li>• Timeframe จำกัด</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>

                                {/* MetaTrader 5 */}
                                <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 p-6 rounded-lg border border-green-500/30">
                                  <div className="flex items-center mb-4">
                                    <div className="w-16 h-16 bg-green-600/30 rounded-xl flex items-center justify-center mr-4">
                                      <span className="text-3xl font-bold text-green-400">MT5</span>
                                    </div>
                                    <div>
                                      <h3 className="text-green-400 font-bold text-lg">MetaTrader 5</h3>
                                      <p className="text-slate-400 text-sm">รุ่นใหม่ ฟีเจอร์เยอะ</p>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <div className="bg-green-600/20 p-3 rounded">
                                      <h4 className="text-green-400 font-semibold text-sm mb-1">✅ ข้อดี:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• เร็วกว่า MT4</li>
                                        <li>• Timeframe หลากหลาย</li>
                                        <li>• กราฟสวย วิเคราะห์ดี</li>
                                        <li>• Support หุ้น Crypto</li>
                                      </ul>
                                    </div>
                                    
                                    <div className="bg-red-600/20 p-3 rounded">
                                      <h4 className="text-red-400 font-semibold text-sm mb-1">❌ ข้อเสีย:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• EA น้อยกว่า MT4</li>
                                        <li>• ซับซ้อนสำหรับมือใหม่</li>
                                        <li>• โบรกเกอร์รองรับน้อย</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>

                                {/* TradingView */}
                                <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-6 rounded-lg border border-purple-500/30">
                                  <div className="flex items-center mb-4">
                                    <div className="w-16 h-16 bg-purple-600/30 rounded-xl flex items-center justify-center mr-4">
                                      <span className="text-2xl">📊</span>
                                    </div>
                                    <div>
                                      <h3 className="text-purple-400 font-bold text-lg">TradingView</h3>
                                      <p className="text-slate-400 text-sm">วิเคราะห์กราฟขั้นสูง</p>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <div className="bg-green-600/20 p-3 rounded">
                                      <h4 className="text-green-400 font-semibold text-sm mb-1">✅ ข้อดี:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• กราฟสวยที่สุด</li>
                                        <li>• Indicator เยอะมาก</li>
                                        <li>• Web-based ใช้ทุกที่</li>
                                        <li>• Social Trading</li>
                                      </ul>
                                    </div>
                                    
                                    <div className="bg-red-600/20 p-3 rounded">
                                      <h4 className="text-red-400 font-semibold text-sm mb-1">❌ ข้อเสีย:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• ค่าใช้จ่ายสูง (Pro)</li>
                                        <li>• ไม่ใช่แพลตฟอร์มเทรด</li>
                                        <li>• ต้องใช้ร่วมกับ MT4/5</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-slate-900/50 p-4 rounded-lg">
                                <h3 className="text-amber-400 font-semibold mb-3">🎯 คำแนะนำสำหรับมือใหม่:</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                  <ul className="text-slate-300 space-y-1 text-sm">
                                    <li>• <strong className="text-green-400">เริ่มต้น:</strong> MT4 เรียนรู้ง่าย</li>
                                    <li>• <strong className="text-blue-400">ต้องการความเร็ว:</strong> MT5</li>
                                  </ul>
                                  <ul className="text-slate-300 space-y-1 text-sm">
                                    <li>• <strong className="text-purple-400">วิเคราะห์:</strong> TradingView</li>
                                    <li>• <strong className="text-cyan-400">ฝึกฝน:</strong> Demo Account ฟรี</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* วิธีตั้งค่า Chart และ Indicator */}
                            <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 p-6 rounded-xl border border-indigo-500/30 mb-8">
                              <h2 className="text-2xl font-bold text-indigo-300 mb-6">⚙️ วิธีตั้งค่า Chart และ Indicator พื้นฐาน</h2>
                              
                              {/* การตั้งค่า Chart */}
                              <div className="mb-6">
                                <h3 className="text-xl font-bold text-cyan-400 mb-4">📈 การตั้งค่า Chart</h3>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div className="bg-slate-900/50 p-4 rounded-lg">
                                    <h4 className="text-green-400 font-semibold mb-3">🕰️ Timeframe แนะนำ:</h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-slate-300">M1 (1 นาที)</span>
                                        <span className="text-red-400">Scalping เท่านั้น</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-300">M5 (5 นาที)</span>
                                        <span className="text-yellow-400">Day Trading</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-300">M15 (15 นาที)</span>
                                        <span className="text-green-400">เริ่มต้นดี</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-300">H1 (1 ชั่วโมง)</span>
                                        <span className="text-blue-400">แนะนำมือใหม่</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-300">H4 (4 ชั่วโมง)</span>
                                        <span className="text-purple-400">Swing Trading</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-300">D1 (รายวัน)</span>
                                        <span className="text-cyan-400">Long Term</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="bg-slate-900/50 p-4 rounded-lg">
                                    <h4 className="text-blue-400 font-semibold mb-3">🎨 ตั้งค่ากราห:</h4>
                                    <ul className="text-slate-300 space-y-2 text-sm">
                                      <li>• <strong>Chart Type:</strong> Candlestick</li>
                                      <li>• <strong>Background:</strong> สีดำ/เทาเข้ม</li>
                                      <li>• <strong>Candle Color:</strong></li>
                                      <li className="ml-4">- Bullish: เขียว/ขาว</li>
                                      <li className="ml-4">- Bearish: แดง/ดำ</li>
                                      <li>• <strong>Grid:</strong> เปิดเพื่อดูระดับง่าย</li>
                                      <li>• <strong>Volume:</strong> เปิดดูปริมาณ</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              {/* Indicator พื้นฐาน */}
                              <div className="mb-6">
                                <h3 className="text-xl font-bold text-cyan-400 mb-4">📊 Indicator พื้นฐาน สำหรับมือใหม่</h3>
                                
                                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4">
                                  {/* Moving Average */}
                                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-4 rounded-lg border border-blue-500/30">
                                    <h4 className="text-blue-400 font-bold mb-2">📈 Moving Average (MA)</h4>
                                    <div className="space-y-2 text-sm">
                                      <p className="text-slate-300"><strong>ไว้ทำไม:</strong> ดูแนวโน้ม</p>
                                      <div className="bg-slate-900/50 p-2 rounded">
                                        <p className="text-cyan-400 font-semibold">การตั้งค่า:</p>
                                        <ul className="text-slate-300 text-xs space-y-1">
                                          <li>• MA 20 (สีแดง) - ระยะสั้น</li>
                                          <li>• MA 50 (สีเขียว) - ระยะกลาง</li>
                                          <li>• MA 200 (สีน้ำเงิน) - ระยะยาว</li>
                                        </ul>
                                      </div>
                                      <p className="text-green-300 text-xs">💡 ราคาอยู่เหนือ MA = แนวโน้มขาขึ้น</p>
                                    </div>
                                  </div>

                                  {/* RSI */}
                                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 p-4 rounded-lg border border-purple-500/30">
                                    <h4 className="text-purple-400 font-bold mb-2">⚡ RSI (14)</h4>
                                    <div className="space-y-2 text-sm">
                                      <p className="text-slate-300"><strong>ไว้ทำไม:</strong> หา Overbought/Oversold</p>
                                      <div className="bg-slate-900/50 p-2 rounded">
                                        <p className="text-cyan-400 font-semibold">การอ่าน:</p>
                                        <ul className="text-slate-300 text-xs space-y-1">
                                          <li>• RSI &gt; 70 = <span className="text-red-400">Overbought</span></li>
                                          <li>• RSI &lt; 30 = <span className="text-green-400">Oversold</span></li>
                                          <li>• RSI 30-70 = Normal</li>
                                        </ul>
                                      </div>
                                      <p className="text-green-300 text-xs">💡 ใช้หาจุดกลับตัว</p>
                                    </div>
                                  </div>

                                  {/* MACD */}
                                  <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 p-4 rounded-lg border border-green-500/30">
                                    <h4 className="text-green-400 font-bold mb-2">📊 MACD (12,26,9)</h4>
                                    <div className="space-y-2 text-sm">
                                      <p className="text-slate-300"><strong>ไว้ทำไม:</strong> หา Momentum</p>
                                      <div className="bg-slate-900/50 p-2 rounded">
                                        <p className="text-cyan-400 font-semibold">สัญญาณ:</p>
                                        <ul className="text-slate-300 text-xs space-y-1">
                                          <li>• MACD ข้าม Signal = <span className="text-green-400">Buy</span></li>
                                          <li>• Signal ข้าม MACD = <span className="text-red-400">Sell</span></li>
                                          <li>• Histogram เปลี่ยนสี = เตือน</li>
                                        </ul>
                                      </div>
                                      <p className="text-green-300 text-xs">💡 ยืนยันสัญญาณ Entry/Exit</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* ขั้นตอนการตั้งค่า */}
                              <div className="bg-slate-900/50 p-6 rounded-lg">
                                <h3 className="text-amber-400 font-semibold mb-4">🔧 ขั้นตอนการตั้งค่า MT4/MT5:</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div className="space-y-3">
                                    <div className="flex items-start">
                                      <span className="bg-blue-600/30 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                                      <div>
                                        <h4 className="text-cyan-400 font-semibold">เปิด Chart</h4>
                                        <p className="text-slate-300 text-sm">File → New Chart → เลือกคู่เงิน</p>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-start">
                                      <span className="bg-blue-600/30 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                                      <div>
                                        <h4 className="text-cyan-400 font-semibold">เลือก Timeframe</h4>
                                        <p className="text-slate-300 text-sm">Toolbar หรือ กด F5-F12</p>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-start">
                                      <span className="bg-blue-600/30 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                                      <div>
                                        <h4 className="text-cyan-400 font-semibold">เพิ่ม Indicator</h4>
                                        <p className="text-slate-300 text-sm">Insert → Indicators → เลือกตามต้องการ</p>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <div className="flex items-start">
                                      <span className="bg-green-600/30 text-green-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                                      <div>
                                        <h4 className="text-cyan-400 font-semibold">ปรับแต่งสี</h4>
                                        <p className="text-slate-300 text-sm">คลิกขวาบน Chart → Properties</p>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-start">
                                      <span className="bg-green-600/30 text-green-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
                                      <div>
                                        <h4 className="text-cyan-400 font-semibold">บันทึก Template</h4>
                                        <p className="text-slate-300 text-sm">Chart → Template → Save Template</p>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-start">
                                      <span className="bg-green-600/30 text-green-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">6</span>
                                      <div>
                                        <h4 className="text-cyan-400 font-semibold">ใช้ Template</h4>
                                        <p className="text-slate-300 text-sm">Chart → Template → Load Template</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* สรุปและคำแนะนำ */}
                            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 p-6 rounded-xl border border-green-500/30">
                              <h2 className="text-xl font-bold text-green-300 mb-4">📋 สรุปประเด็นสำคัญ</h2>
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div className="bg-green-600/20 p-4 rounded-lg">
                                    <h3 className="text-green-400 font-semibold mb-2">✅ สำหรับมือใหม่:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• เลือกโบรกเกอร์ที่มี Regulation</li>
                                      <li>• เริ่มด้วย Demo Account</li>
                                      <li>• ใช้ MT4 เรียนรู้ง่าย</li>
                                      <li>• Indicator พื้นฐาน 3 ตัว: MA, RSI, MACD</li>
                                    </ul>
                                  </div>
                                  
                                  <div className="bg-blue-600/20 p-4 rounded-lg">
                                    <h3 className="text-blue-400 font-semibold mb-2">💡 เคล็ดลับ:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• อย่าใส่ Indicator เยอะเกินไป</li>
                                      <li>• บันทึก Template ไว้ใช้</li>
                                      <li>• ฝึกใช้ Hotkey เพื่อความเร็ว</li>
                                      <li>• Backtest กลยุทธ์ก่อนใช้จริง</li>
                                    </ul>
                                  </div>
                                </div>
                                
                                <div className="space-y-4">
                                  <div className="bg-red-600/20 p-4 rounded-lg">
                                    <h3 className="text-red-400 font-semibold mb-2">🚫 ข้อควรระวัง:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• ไม่เลือกโบรกเกอร์แค่ดู Spread</li>
                                      <li>• ไม่ใส่ Indicator มากเกินไป</li>
                                      <li>• ไม่ฝาก Real Money ก่อนทดสอบ</li>
                                      <li>• ไม่เชื่อ Bonus ที่ดูดีเกินจริง</li>
                                    </ul>
                                  </div>
                                  
                                  <div className="bg-amber-600/20 p-4 rounded-lg">
                                    <h3 className="text-amber-400 font-semibold mb-2">🎯 ขั้นตอนต่อไป:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• ฝึกใช้แพลตฟอร์มใน Demo</li>
                                      <li>• เรียนรู้การวิเคราะห์เทคนิค</li>
                                      <li>• ศึกษา Risk Management</li>
                                      <li>• หากลยุทธ์ที่เหมาะกับตัวเอง</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>

                    {/* บทที่ 4: ตารางเวลาเปิด-ปิดตลาดและเซสชั่นการเทรด */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-start bg-gradient-to-r from-amber-600/20 to-yellow-600/20 border-amber-500/30 hover:border-amber-400/50 text-amber-400 hover:text-amber-300">
                          <BookOpen className="w-4 h-4 mr-2" />
                          บทที่ 4: ตารางเวลาเปิด-ปิดตลาดและเซสชั่นการเทรด
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-5xl max-h-[90vh]">
                        <ScrollArea className="h-[85vh] pr-4">
                          <div className="p-6">
                            <h1 className="text-3xl font-bold text-amber-400 mb-8 text-center">🌍 ตารางเวลาเปิด-ปิดตลาดและเซสชั่นการเทรด</h1>
                            
                            {/* ความสำคัญของเวลาเทรด */}
                            <div className="bg-amber-600/10 p-6 rounded-xl border border-amber-500/30 mb-8">
                              <h2 className="text-2xl font-bold text-amber-300 mb-6">⏰ ทำไมเวลาถึงสำคัญใน Forex?</h2>
                              <p className="text-slate-300 leading-relaxed mb-6">
                                ตลาด Forex <strong className="text-cyan-400">เปิดตลอด 24 ชั่วโมง 5 วัน</strong> แต่ไม่ได้หมายความว่าทุกเวลาจะดีสำหรับการเทรด
                                การรู้จักเวลาที่เหมาะสมจะช่วยให้คุณหากำไรได้มากขึ้นและหลีกเลี่ยงช่วงที่เสี่ยง
                              </p>
                              
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-slate-900/50 p-4 rounded-lg">
                                  <h3 className="text-green-400 font-semibold mb-3">✅ ช่วงเวลาดี:</h3>
                                  <ul className="text-slate-300 space-y-1 text-sm">
                                    <li>• สภาพคล่องสูง (Volume เยอะ)</li>
                                    <li>• Spread แคบ (ต้นทุนต่ำ)</li>
                                    <li>• ความผันผวนเหมาะสม</li>
                                    <li>• สัญญาณชัดเจน</li>
                                  </ul>
                                </div>
                                
                                <div className="bg-slate-900/50 p-4 rounded-lg">
                                  <h3 className="text-red-400 font-semibold mb-3">❌ ช่วงเวลาควรหลีกเลี่ยง:</h3>
                                  <ul className="text-slate-300 space-y-1 text-sm">
                                    <li>• สภาพคล่องต่ำ</li>
                                    <li>• Spread กว้าง (ต้นทุนสูง)</li>
                                    <li>• เคลื่อนไหวผิดปกติ</li>
                                    <li>• สัญญาณเท็จ</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* 4 เซสชั่นหลัก */}
                            <div className="bg-slate-800/30 p-6 rounded-xl mb-8">
                              <h2 className="text-2xl font-bold text-cyan-300 mb-6">🌏 4 เซสชั่นการเทรดหลัก</h2>
                              
                              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
                                {/* Sydney Session */}
                                <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 p-6 rounded-lg border border-green-500/30">
                                  <div className="flex items-center mb-4">
                                    <div className="w-16 h-16 bg-green-600/30 rounded-xl flex items-center justify-center mr-4">
                                      <span className="text-2xl">🇦🇺</span>
                                    </div>
                                    <div>
                                      <h3 className="text-green-400 font-bold text-lg">Sydney Session</h3>
                                      <p className="text-slate-400 text-sm">Asia-Pacific เริ่มต้น</p>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-cyan-400 font-semibold text-sm mb-2">⏰ เวลาเทรด (GMT+7):</h4>
                                      <p className="text-slate-300 text-sm"><strong>06:00 - 15:00</strong></p>
                                      <p className="text-slate-400 text-xs">วันจันทร์-ศุกร์</p>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-green-400 font-semibold text-sm mb-2">💱 คู่เงินแอคทีฟ:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• AUD/USD, AUD/JPY</li>
                                        <li>• NZD/USD, AUD/NZD</li>
                                        <li>• USD/JPY (ในระดับหนึ่ง)</li>
                                      </ul>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-amber-400 font-semibold text-sm mb-2">📊 ลักษณะ:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• Volume ต่ำที่สุด</li>
                                        <li>• เหมาะ Range Trading</li>
                                        <li>• ระวัง Sunday Gap</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>

                                {/* Tokyo Session */}
                                <div className="bg-gradient-to-br from-red-600/20 to-pink-600/20 p-6 rounded-lg border border-red-500/30">
                                  <div className="flex items-center mb-4">
                                    <div className="w-16 h-16 bg-red-600/30 rounded-xl flex items-center justify-center mr-4">
                                      <span className="text-2xl">🇯🇵</span>
                                    </div>
                                    <div>
                                      <h3 className="text-red-400 font-bold text-lg">Tokyo Session</h3>
                                      <p className="text-slate-400 text-sm">Asian Market หลัก</p>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-cyan-400 font-semibold text-sm mb-2">⏰ เวลาเทรด (GMT+7):</h4>
                                      <p className="text-slate-300 text-sm"><strong>08:00 - 17:00</strong></p>
                                      <p className="text-slate-400 text-xs">วันจันทร์-ศุกร์</p>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-red-400 font-semibold text-sm mb-2">💱 คู่เงินแอคทีฟ:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• USD/JPY, EUR/JPY</li>
                                        <li>• GBP/JPY, AUD/JPY</li>
                                        <li>• Asian Crosses</li>
                                      </ul>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-amber-400 font-semibold text-sm mb-2">📊 ลักษณะ:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• Volume ปานกลาง</li>
                                        <li>• การเคลื่อนไหวนุ่มนวล</li>
                                        <li>• BOJ Intervention</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>

                                {/* London Session */}
                                <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 p-6 rounded-lg border border-blue-500/30">
                                  <div className="flex items-center mb-4">
                                    <div className="w-16 h-16 bg-blue-600/30 rounded-xl flex items-center justify-center mr-4">
                                      <span className="text-2xl">🇬🇧</span>
                                    </div>
                                    <div>
                                      <h3 className="text-blue-400 font-bold text-lg">London Session</h3>
                                      <p className="text-slate-400 text-sm">Volume สูงที่สุด</p>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-cyan-400 font-semibold text-sm mb-2">⏰ เวลาเทรด (GMT+7):</h4>
                                      <p className="text-slate-300 text-sm"><strong>15:00 - 00:00</strong></p>
                                      <p className="text-slate-400 text-xs">วันจันทร์-ศุกร์</p>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-blue-400 font-semibold text-sm mb-2">💱 คู่เงินแอคทีฟ:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• EUR/USD, GBP/USD</li>
                                        <li>• USD/CHF, EUR/GBP</li>
                                        <li>• All Major Pairs</li>
                                      </ul>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-amber-400 font-semibold text-sm mb-2">📊 ลักษณะ:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• Volume สูงที่สุด</li>
                                        <li>• Breakout ชัดเจน</li>
                                        <li>• ECB, BOE News</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>

                                {/* New York Session */}
                                <div className="bg-gradient-to-br from-purple-600/20 to-violet-600/20 p-6 rounded-lg border border-purple-500/30">
                                  <div className="flex items-center mb-4">
                                    <div className="w-16 h-16 bg-purple-600/30 rounded-xl flex items-center justify-center mr-4">
                                      <span className="text-2xl">🇺🇸</span>
                                    </div>
                                    <div>
                                      <h3 className="text-purple-400 font-bold text-lg">New York Session</h3>
                                      <p className="text-slate-400 text-sm">USD dominance</p>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-cyan-400 font-semibold text-sm mb-2">⏰ เวลาเทรด (GMT+7):</h4>
                                      <p className="text-slate-300 text-sm"><strong>20:00 - 05:00</strong></p>
                                      <p className="text-slate-400 text-xs">วันจันทร์-ศุกร์</p>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-purple-400 font-semibold text-sm mb-2">💱 คู่เงินแอคทีฟ:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• All Major Pairs</li>
                                        <li>• USD/CAD, USD/MXN</li>
                                        <li>• Commodity Pairs</li>
                                      </ul>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-amber-400 font-semibold text-sm mb-2">📊 ลักษณะ:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• Volume สูงมาก</li>
                                        <li>• News Impact แรง</li>
                                        <li>• Fed Minutes</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* ช่วงเวลาที่ดีที่สุด */}
                            <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 p-6 rounded-xl border border-green-500/30 mb-8">
                              <h2 className="text-2xl font-bold text-green-300 mb-6">🚀 ช่วงเวลาที่ดีที่สุดสำหรับเทรด</h2>
                              
                              <div className="grid md:grid-cols-2 gap-6 mb-6">
                                {/* London + New York Overlap */}
                                <div className="bg-gradient-to-br from-gold-600/20 to-yellow-600/20 p-6 rounded-lg border border-yellow-500/30">
                                  <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-yellow-600/30 rounded-full flex items-center justify-center mr-3">
                                      <span className="text-xl">👑</span>
                                    </div>
                                    <h3 className="text-yellow-400 font-bold text-lg">London + NY Overlap</h3>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-cyan-400 font-semibold text-sm mb-1">⏰ เวลา:</h4>
                                      <p className="text-slate-300 text-sm"><strong>20:00 - 00:00</strong> (GMT+7)</p>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-yellow-400 font-semibold text-sm mb-2">⭐ ข้อดี:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• Volume สูงที่สุดในวัน</li>
                                        <li>• Spread แคบที่สุด</li>
                                        <li>• Breakout ชัดเจน</li>
                                        <li>• News Impact แรง</li>
                                        <li>• เหมาะทุกกลยุทธ์</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>

                                {/* Tokyo + London Overlap */}
                                <div className="bg-gradient-to-br from-teal-600/20 to-cyan-600/20 p-6 rounded-lg border border-teal-500/30">
                                  <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-teal-600/30 rounded-full flex items-center justify-center mr-3">
                                      <span className="text-xl">🥈</span>
                                    </div>
                                    <h3 className="text-teal-400 font-bold text-lg">Tokyo + London Overlap</h3>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-cyan-400 font-semibold text-sm mb-1">⏰ เวลา:</h4>
                                      <p className="text-slate-300 text-sm"><strong>15:00 - 17:00</strong> (GMT+7)</p>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-teal-400 font-semibold text-sm mb-2">⭐ ข้อดี:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• Volume ดี</li>
                                        <li>• EUR/USD, GBP/USD แอคทีฟ</li>
                                        <li>• เหมาะ Trend Following</li>
                                        <li>• European Open</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* ตารางสรุปเวลา */}
                              <div className="bg-slate-900/50 p-6 rounded-lg">
                                <h3 className="text-cyan-400 font-semibold mb-4">📅 ตารางสรุปเวลาเทรด (GMT+7):</h3>
                                
                                <div className="overflow-x-auto">
                                  <table className="w-full text-sm">
                                    <thead>
                                      <tr className="border-b border-slate-600">
                                        <th className="text-left p-3 text-cyan-400">เซสชั่น</th>
                                        <th className="text-left p-3 text-green-400">เวลาเปิด</th>
                                        <th className="text-left p-3 text-red-400">เวลาปิด</th>
                                        <th className="text-left p-3 text-amber-400">Volume</th>
                                        <th className="text-left p-3 text-purple-400">เหมาะสำหรับ</th>
                                      </tr>
                                    </thead>
                                    <tbody className="text-slate-300">
                                      <tr className="border-b border-slate-700">
                                        <td className="p-3 font-semibold">Sydney</td>
                                        <td className="p-3">06:00</td>
                                        <td className="p-3">15:00</td>
                                        <td className="p-3 text-red-400">ต่ำ</td>
                                        <td className="p-3">Range Trading</td>
                                      </tr>
                                      <tr className="border-b border-slate-700">
                                        <td className="p-3 font-semibold">Tokyo</td>
                                        <td className="p-3">08:00</td>
                                        <td className="p-3">17:00</td>
                                        <td className="p-3 text-yellow-400">ปานกลาง</td>
                                        <td className="p-3">JPY Pairs</td>
                                      </tr>
                                      <tr className="border-b border-slate-700">
                                        <td className="p-3 font-semibold">London</td>
                                        <td className="p-3">15:00</td>
                                        <td className="p-3">00:00</td>
                                        <td className="p-3 text-green-400">สูงมาก</td>
                                        <td className="p-3">Breakout</td>
                                      </tr>
                                      <tr>
                                        <td className="p-3 font-semibold">New York</td>
                                        <td className="p-3">20:00</td>
                                        <td className="p-3">05:00</td>
                                        <td className="p-3 text-green-400">สูงมาก</td>
                                        <td className="p-3">News Trading</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>

                            {/* ข้อควรระวัง */}
                            <div className="bg-gradient-to-r from-red-600/20 to-pink-600/20 p-6 rounded-xl border border-red-500/30">
                              <h2 className="text-xl font-bold text-red-300 mb-4">⚠️ ข้อควรระวังเรื่องเวลา</h2>
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div className="bg-red-600/20 p-4 rounded-lg">
                                    <h3 className="text-red-400 font-semibold mb-2">🚫 ช่วงเวลาที่ควรหลีกเลี่ยง:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• วันศุกร์ 22:00 น. เป็นต้นไป</li>
                                      <li>• วันอาทิตย์ช่วงเย็น (Sunday Gap)</li>
                                      <li>• วันหยุดประจำชาติ (US, EU, UK)</li>
                                      <li>• ช่วงกลางคืน (02:00-06:00)</li>
                                    </ul>
                                  </div>
                                  
                                  <div className="bg-amber-600/20 p-4 rounded-lg">
                                    <h3 className="text-amber-400 font-semibold mb-2">📰 High Impact News:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• NFP (Non-Farm Payroll) - วันศุกร์</li>
                                      <li>• Fed Meeting - ตามกำหนดการ</li>
                                      <li>• ECB, BOE Decision</li>
                                      <li>• ระวัง 30 นาทีก่อน-หลังข่าว</li>
                                    </ul>
                                  </div>
                                </div>
                                
                                <div className="space-y-4">
                                  <div className="bg-blue-600/20 p-4 rounded-lg">
                                    <h3 className="text-blue-400 font-semibold mb-2">💡 เคล็ดลับ:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• ใช้ Economic Calendar</li>
                                      <li>• ระวัง Daylight Saving Time</li>
                                      <li>• ปรับเวลาตามแพลตฟอร์ม</li>
                                      <li>• เรียนรู้นิสัยแต่ละเซสชั่น</li>
                                    </ul>
                                  </div>
                                  
                                  <div className="bg-green-600/20 p-4 rounded-lg">
                                    <h3 className="text-green-400 font-semibold mb-2">🎯 สำหรับมือใหม่:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• เริ่มจาก London Session</li>
                                      <li>• หลีกเลี่ยง News Trading</li>
                                      <li>• เทรดช่วง Overlap</li>
                                      <li>• บันทึกเวลาที่ประสบความสำเร็จ</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>

                    {/* บทที่ 5: การคำนวณขนาด Lot, Pip, Point และค่าธรรมเนียม */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-start bg-gradient-to-r from-red-600/20 to-pink-600/20 border-red-500/30 hover:border-red-400/50 text-red-400 hover:text-red-300">
                          <BookOpen className="w-4 h-4 mr-2" />
                          บทที่ 5: การคำนวณขนาด Lot, Pip, Point และค่าธรรมเนียม
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-5xl max-h-[90vh]">
                        <ScrollArea className="h-[85vh] pr-4">
                          <div className="p-6">
                            <h1 className="text-3xl font-bold text-red-400 mb-8 text-center">💰 การคำนวณขนาด Lot, Pip, Point และค่าธรรมเนียม</h1>
                            
                            {/* ความสำคัญของการคำนวณ */}
                            <div className="bg-red-600/10 p-6 rounded-xl border border-red-500/30 mb-8">
                              <h2 className="text-2xl font-bold text-red-300 mb-6">🧮 ทำไมต้องเข้าใจการคำนวณ?</h2>
                              <p className="text-slate-300 leading-relaxed mb-6">
                                การเข้าใจ <strong className="text-cyan-400">Lot, Pip, Point และ ค่าธรรมเนียม</strong> เป็นพื้นฐานสำคัญที่จะช่วยให้คุณ:
                              </p>
                              
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-slate-900/50 p-4 rounded-lg">
                                  <h3 className="text-green-400 font-semibold mb-3">✅ ประโยชน์:</h3>
                                  <ul className="text-slate-300 space-y-1 text-sm">
                                    <li>• คำนวณกำไร-ขาดทุนได้ถูกต้อง</li>
                                    <li>• จัดการความเสี่ยงอย่างมีประสิทธิภาพ</li>
                                    <li>• เลือกขนาดการเทรดที่เหมาะสม</li>
                                    <li>• ประเมินต้นทุนการเทรดได้แม่นยำ</li>
                                  </ul>
                                </div>
                                
                                <div className="bg-slate-900/50 p-4 rounded-lg">
                                  <h3 className="text-red-400 font-semibold mb-3">❌ หากไม่เข้าใจ:</h3>
                                  <ul className="text-slate-300 space-y-1 text-sm">
                                    <li>• เทรดขนาดใหญ่เกินไป = ล้มละลาย</li>
                                    <li>• คำนวณผิด = สูญเสียเงินทุน</li>
                                    <li>• ไม่รู้ต้นทุนจริง = กำไรหาย</li>
                                    <li>• ไม่สามารถวางแผนการเทรด</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* Lot Size */}
                            <div className="bg-slate-800/30 p-6 rounded-xl mb-8">
                              <h2 className="text-2xl font-bold text-cyan-300 mb-6">📦 ขนาด Lot คืออะไร?</h2>
                              <p className="text-slate-300 leading-relaxed mb-6">
                                <strong className="text-cyan-400">Lot</strong> คือหน่วยมาตรฐานในการซื้อขายเงินตรา 1 Lot มาตรฐาน = <strong className="text-green-400">100,000 หน่วยของสกุลเงินหลัก</strong>
                              </p>
                              
                              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                {/* Standard Lot */}
                                <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-4 rounded-lg border border-blue-500/30">
                                  <div className="text-center mb-3">
                                    <div className="w-12 h-12 bg-blue-600/30 rounded-xl flex items-center justify-center mx-auto mb-2">
                                      <span className="text-xl font-bold text-blue-400">1</span>
                                    </div>
                                    <h3 className="text-blue-400 font-bold">Standard Lot</h3>
                                  </div>
                                  <div className="space-y-2 text-sm">
                                    <p className="text-slate-300"><strong>ขนาด:</strong> 100,000 หน่วย</p>
                                    <p className="text-slate-300"><strong>ตัวอย่าง:</strong> EUR/USD</p>
                                    <p className="text-slate-300">= 100,000 EUR</p>
                                    <p className="text-green-400 text-xs">💰 เหมาะสำหรับมืออาชีพ</p>
                                  </div>
                                </div>

                                {/* Mini Lot */}
                                <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 p-4 rounded-lg border border-green-500/30">
                                  <div className="text-center mb-3">
                                    <div className="w-12 h-12 bg-green-600/30 rounded-xl flex items-center justify-center mx-auto mb-2">
                                      <span className="text-lg font-bold text-green-400">0.1</span>
                                    </div>
                                    <h3 className="text-green-400 font-bold">Mini Lot</h3>
                                  </div>
                                  <div className="space-y-2 text-sm">
                                    <p className="text-slate-300"><strong>ขนาด:</strong> 10,000 หน่วย</p>
                                    <p className="text-slate-300"><strong>ตัวอย่าง:</strong> EUR/USD</p>
                                    <p className="text-slate-300">= 10,000 EUR</p>
                                    <p className="text-green-400 text-xs">👍 เหมาะสำหรับมือใหม่</p>
                                  </div>
                                </div>

                                {/* Micro Lot */}
                                <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 p-4 rounded-lg border border-amber-500/30">
                                  <div className="text-center mb-3">
                                    <div className="w-12 h-12 bg-amber-600/30 rounded-xl flex items-center justify-center mx-auto mb-2">
                                      <span className="text-lg font-bold text-amber-400">0.01</span>
                                    </div>
                                    <h3 className="text-amber-400 font-bold">Micro Lot</h3>
                                  </div>
                                  <div className="space-y-2 text-sm">
                                    <p className="text-slate-300"><strong>ขนาด:</strong> 1,000 หน่วย</p>
                                    <p className="text-slate-300"><strong>ตัวอย่าง:</strong> EUR/USD</p>
                                    <p className="text-slate-300">= 1,000 EUR</p>
                                    <p className="text-green-400 text-xs">🎓 เหมาะสำหรับฝึกหัด</p>
                                  </div>
                                </div>

                                {/* Nano Lot */}
                                <div className="bg-gradient-to-br from-purple-600/20 to-violet-600/20 p-4 rounded-lg border border-purple-500/30">
                                  <div className="text-center mb-3">
                                    <div className="w-12 h-12 bg-purple-600/30 rounded-xl flex items-center justify-center mx-auto mb-2">
                                      <span className="text-sm font-bold text-purple-400">0.001</span>
                                    </div>
                                    <h3 className="text-purple-400 font-bold">Nano Lot</h3>
                                  </div>
                                  <div className="space-y-2 text-sm">
                                    <p className="text-slate-300"><strong>ขนาด:</strong> 100 หน่วย</p>
                                    <p className="text-slate-300"><strong>ตัวอย่าง:</strong> EUR/USD</p>
                                    <p className="text-slate-300">= 100 EUR</p>
                                    <p className="text-green-400 text-xs">🔬 ทดสอบกลยุทธ์</p>
                                  </div>
                                </div>
                              </div>

                              {/* ตัวอย่างการคำนวณ */}
                              <div className="bg-slate-900/50 p-6 rounded-lg">
                                <h3 className="text-cyan-400 font-semibold mb-4">📊 ตัวอย่างการคำนวณ Lot Size:</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div className="space-y-3">
                                    <h4 className="text-green-400 font-semibold">💡 สถานการณ์:</h4>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• เงินทุน: $1,000</li>
                                      <li>• ยินเสียเสี่ยง: 2% = $20</li>
                                      <li>• Stop Loss: 20 pips</li>
                                      <li>• คู่เงิน: EUR/USD</li>
                                    </ul>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <h4 className="text-amber-400 font-semibold">🔢 การคำนวณ:</h4>
                                    <div className="bg-slate-800/50 p-3 rounded text-sm">
                                      <p className="text-slate-300">Lot Size = Risk ($20) ÷ (Stop Loss × Pip Value)</p>
                                      <p className="text-slate-300">= $20 ÷ (20 × $1)</p>
                                      <p className="text-green-400 font-bold">= 1 Mini Lot (0.10)</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Pip และ Point */}
                            <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 p-6 rounded-xl border border-purple-500/30 mb-8">
                              <h2 className="text-2xl font-bold text-purple-300 mb-6">📏 Pip และ Point คืออะไร?</h2>
                              
                              <div className="grid md:grid-cols-2 gap-6 mb-6">
                                {/* PIP */}
                                <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 p-6 rounded-lg border border-blue-500/30">
                                  <h3 className="text-blue-400 font-bold text-xl mb-4">📍 PIP (Point in Percentage)</h3>
                                  <div className="space-y-4">
                                    <div className="bg-slate-900/50 p-4 rounded">
                                      <h4 className="text-cyan-400 font-semibold mb-2">📖 ความหมาย:</h4>
                                      <p className="text-slate-300 text-sm leading-relaxed">
                                        หน่วยที่เล็กที่สุดของการเปลี่ยนแปลงราคาในตลาด Forex 
                                        สำหรับคู่เงินส่วนใหญ่ = <strong className="text-green-400">ทศนิยมตำแหน่งที่ 4</strong>
                                      </p>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-4 rounded">
                                      <h4 className="text-blue-400 font-semibold mb-2">🎯 ตัวอย่าง:</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="text-slate-300">EUR/USD: 1.1234</span>
                                          <span className="text-green-400">4 ก็คือ 1 Pip</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-slate-300">USD/JPY: 110.34</span>
                                          <span className="text-green-400">4 ก็คือ 1 Pip</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-slate-300">GBP/JPY: 150.789</span>
                                          <span className="text-amber-400">พิเศษ 3 ตำแหน่ง</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Point */}
                                <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 p-6 rounded-lg border border-green-500/30">
                                  <h3 className="text-green-400 font-bold text-xl mb-4">📌 POINT (Pipette)</h3>
                                  <div className="space-y-4">
                                    <div className="bg-slate-900/50 p-4 rounded">
                                      <h4 className="text-cyan-400 font-semibold mb-2">📖 ความหมาย:</h4>
                                      <p className="text-slate-300 text-sm leading-relaxed">
                                        หน่วยที่เล็กกว่า Pip อีก 10 เท่า = <strong className="text-green-400">ทศนิยมตำแหน่งที่ 5</strong>
                                        บางโบรกเกอร์แสดงราคาแบบ 5 ตำแหน่ง
                                      </p>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-4 rounded">
                                      <h4 className="text-green-400 font-semibold mb-2">🎯 ตัวอย่าง:</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="text-slate-300">EUR/USD: 1.12345</span>
                                          <span className="text-green-400">5 คือ 1 Point</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-slate-300">10 Points</span>
                                          <span className="text-cyan-400">= 1 Pip</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-slate-300">สเปรด 15 Points</span>
                                          <span className="text-amber-400">= 1.5 Pips</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* ตารางค่า Pip */}
                              <div className="bg-slate-900/50 p-6 rounded-lg">
                                <h3 className="text-cyan-400 font-semibold mb-4">💲 ค่า Pip ในแต่ละ Lot Size:</h3>
                                
                                <div className="overflow-x-auto">
                                  <table className="w-full text-sm">
                                    <thead>
                                      <tr className="border-b border-slate-600">
                                        <th className="text-left p-3 text-cyan-400">Lot Size</th>
                                        <th className="text-left p-3 text-green-400">หน่วย</th>
                                        <th className="text-left p-3 text-blue-400">1 Pip (USD Base)</th>
                                        <th className="text-left p-3 text-amber-400">ตัวอย่าง</th>
                                      </tr>
                                    </thead>
                                    <tbody className="text-slate-300">
                                      <tr className="border-b border-slate-700">
                                        <td className="p-3 font-semibold">1.00 (Standard)</td>
                                        <td className="p-3">100,000</td>
                                        <td className="p-3 text-green-400">$10</td>
                                        <td className="p-3">10 pips = $100</td>
                                      </tr>
                                      <tr className="border-b border-slate-700">
                                        <td className="p-3 font-semibold">0.10 (Mini)</td>
                                        <td className="p-3">10,000</td>
                                        <td className="p-3 text-green-400">$1</td>
                                        <td className="p-3">10 pips = $10</td>
                                      </tr>
                                      <tr className="border-b border-slate-700">
                                        <td className="p-3 font-semibold">0.01 (Micro)</td>
                                        <td className="p-3">1,000</td>
                                        <td className="p-3 text-green-400">$0.10</td>
                                        <td className="p-3">10 pips = $1</td>
                                      </tr>
                                      <tr>
                                        <td className="p-3 font-semibold">0.001 (Nano)</td>
                                        <td className="p-3">100</td>
                                        <td className="p-3 text-green-400">$0.01</td>
                                        <td className="p-3">10 pips = $0.10</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>

                            {/* ค่าธรรมเนียม */}
                            <div className="bg-gradient-to-r from-amber-600/10 to-orange-600/10 p-6 rounded-xl border border-amber-500/30 mb-8">
                              <h2 className="text-2xl font-bold text-amber-300 mb-6">💸 ค่าธรรมเนียมในการเทรด Forex</h2>
                              
                              <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                                {/* Spread */}
                                <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 p-6 rounded-lg border border-red-500/30">
                                  <div className="text-center mb-4">
                                    <div className="w-16 h-16 bg-red-600/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                                      <span className="text-2xl">📊</span>
                                    </div>
                                    <h3 className="text-red-400 font-bold text-lg">Spread</h3>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-cyan-400 font-semibold text-sm mb-2">📖 คืออะไร:</h4>
                                      <p className="text-slate-300 text-xs leading-relaxed">
                                        ผลต่างระหว่างราคา Bid (ขาย) กับ Ask (ซื้อ) เป็นค่าธรรมเนียมหลักของโบรกเกอร์
                                      </p>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-red-400 font-semibold text-sm mb-2">💰 ตัวอย่าง:</h4>
                                      <div className="text-xs space-y-1">
                                        <p className="text-slate-300">EUR/USD: 1.1234/1.1236</p>
                                        <p className="text-green-400">Spread = 2 pips</p>
                                        <p className="text-amber-400">0.10 Lot = $2</p>
                                      </div>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-amber-400 font-semibold text-sm mb-2">📊 ช่วงปกติ:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• EUR/USD: 0.5-2 pips</li>
                                        <li>• GBP/USD: 1-3 pips</li>
                                        <li>• Exotic: 10-50 pips</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>

                                {/* Commission */}
                                <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-6 rounded-lg border border-blue-500/30">
                                  <div className="text-center mb-4">
                                    <div className="w-16 h-16 bg-blue-600/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                                      <span className="text-2xl">💼</span>
                                    </div>
                                    <h3 className="text-blue-400 font-bold text-lg">Commission</h3>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-cyan-400 font-semibold text-sm mb-2">📖 คืออะไร:</h4>
                                      <p className="text-slate-300 text-xs leading-relaxed">
                                        ค่าธรรมเนียมคงที่ที่โบรกเกอร์เก็บแยกจาก Spread โดยคิดต่อ Lot
                                      </p>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-blue-400 font-semibold text-sm mb-2">💰 ตัวอย่าง:</h4>
                                      <div className="text-xs space-y-1">
                                        <p className="text-slate-300">Commission: $7 ต่อ Lot</p>
                                        <p className="text-green-400">Round Turn: $3.50</p>
                                        <p className="text-amber-400">0.10 Lot = $0.70</p>
                                      </div>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-amber-400 font-semibold text-sm mb-2">⚖️ ข้อดี-เสีย:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• ✅ Spread แคบกว่า</li>
                                        <li>• ✅ โปร่งใส</li>
                                        <li>• ❌ ค่าใช้จ่ายเพิ่ม</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>

                                {/* Swap */}
                                <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 p-6 rounded-lg border border-purple-500/30">
                                  <div className="text-center mb-4">
                                    <div className="w-16 h-16 bg-purple-600/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                                      <span className="text-2xl">🌙</span>
                                    </div>
                                    <h3 className="text-purple-400 font-bold text-lg">Swap (Overnight)</h3>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-cyan-400 font-semibold text-sm mb-2">📖 คืออะไร:</h4>
                                      <p className="text-slate-300 text-xs leading-relaxed">
                                        ค่าดอกเบี้ยที่เก็บหรือจ่ายเมื่อถือ Position ข้ามคืน (22:00 GMT+7)
                                      </p>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-purple-400 font-semibold text-sm mb-2">💰 ตัวอย่าง:</h4>
                                      <div className="text-xs space-y-1">
                                        <p className="text-slate-300">AUD/USD Long: +0.5%</p>
                                        <p className="text-green-400">ได้รับ Swap</p>
                                        <p className="text-slate-300">USD/JPY Short: -0.8%</p>
                                        <p className="text-red-400">จ่าย Swap</p>
                                      </div>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-amber-400 font-semibold text-sm mb-2">⚠️ ข้อควรระวัง:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• วันพุธ = x3 เท่า</li>
                                        <li>• วันหยุดธนาคาร</li>
                                        <li>• Currency Carry Trade</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* การคำนวณต้นทุนรวม */}
                              <div className="bg-slate-900/50 p-6 rounded-lg">
                                <h3 className="text-cyan-400 font-semibold mb-4">🧮 การคำนวณต้นทุนรวม:</h3>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div className="space-y-3">
                                    <h4 className="text-green-400 font-semibold">💡 สถานการณ์:</h4>
                                    <div className="bg-slate-800/50 p-3 rounded text-sm">
                                      <ul className="text-slate-300 space-y-1">
                                        <li>• เทรด EUR/USD 0.10 Lot</li>
                                        <li>• Spread: 2 pips = $2</li>
                                        <li>• Commission: $0.70</li>
                                        <li>• ถือข้ามคืน 1 วัน</li>
                                        <li>• Swap: -$0.50</li>
                                      </ul>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <h4 className="text-amber-400 font-semibold">🔢 ต้นทุนรวม:</h4>
                                    <div className="bg-slate-800/50 p-3 rounded text-sm">
                                      <div className="space-y-1 text-slate-300">
                                        <p>Spread: <span className="text-red-400">-$2.00</span></p>
                                        <p>Commission: <span className="text-red-400">-$0.70</span></p>
                                        <p>Swap: <span className="text-red-400">-$0.50</span></p>
                                        <hr className="border-slate-600 my-2" />
                                        <p className="font-bold">รวม: <span className="text-red-400">-$3.20</span></p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* เคล็ดลับและคำแนะนำ */}
                            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 p-6 rounded-xl border border-green-500/30">
                              <h2 className="text-xl font-bold text-green-300 mb-4">💡 เคล็ดลับและคำแนะนำ</h2>
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div className="bg-green-600/20 p-4 rounded-lg">
                                    <h3 className="text-green-400 font-semibold mb-2">✅ สำหรับมือใหม่:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• เริ่มต้นด้วย <strong>Micro Lot (0.01)</strong></li>
                                      <li>• เรียนรู้ตารางค่า Pip Value</li>
                                      <li>• ใช้ Position Size Calculator</li>
                                      <li>• ฝึกคำนวณใน Demo Account</li>
                                    </ul>
                                  </div>
                                  
                                  <div className="bg-blue-600/20 p-4 rounded-lg">
                                    <h3 className="text-blue-400 font-semibold mb-2">📊 Risk Management:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• <strong>เสี่ยงไม่เกิน 1-2%</strong> ต่อเทรด</li>
                                      <li>• คำนวณ Lot Size ก่อนเข้าเทรด</li>
                                      <li>• รวม Spread + Commission</li>
                                      <li>• พิจารณา Swap สำหรับ Swing Trading</li>
                                    </ul>
                                  </div>
                                </div>
                                
                                <div className="space-y-4">
                                  <div className="bg-red-600/20 p-4 rounded-lg">
                                    <h3 className="text-red-400 font-semibold mb-2">🚫 ข้อควรระวัง:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• <strong>อย่าเทรดขนาดใหญ่</strong> ตั้งแต่เริ่มต้น</li>
                                      <li>• อย่าลืมนับ Spread เป็นต้นทุน</li>
                                      <li>• ระวัง Swap ติดลบสำหรับ Position ยาว</li>
                                      <li>• อย่าใช้ Leverage สูงเกินไป</li>
                                    </ul>
                                  </div>
                                  
                                  <div className="bg-amber-600/20 p-4 rounded-lg">
                                    <h3 className="text-amber-400 font-semibold mb-2">🎯 เป้าหมาย:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• เข้าใจการคำนวณให้ชำนาญ</li>
                                      <li>• ใช้เครื่องมือ Calculator</li>
                                      <li>• ติดตามต้นทุนทุกเทรด</li>
                                      <li>• เลือกโบรกเกอร์ต้นทุนต่ำ</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>

                    {/* บทที่ 6: พื้นฐานการวิเคราะห์ตลาด Forex */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-start bg-gradient-to-r from-teal-600/20 to-cyan-600/20 border-teal-500/30 hover:border-teal-400/50 text-teal-400 hover:text-teal-300">
                          <BookOpen className="w-4 h-4 mr-2" />
                          บทที่ 6: พื้นฐานการวิเคราะห์ตลาด Forex
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-5xl max-h-[90vh]">
                        <ScrollArea className="h-[85vh] pr-4">
                          <div className="p-6">
                            <h1 className="text-3xl font-bold text-teal-400 mb-8 text-center">📊 พื้นฐานการวิเคราะห์ตลาด Forex</h1>
                            
                            {/* ความสำคัญของการวิเคราะห์ */}
                            <div className="bg-teal-600/10 p-6 rounded-xl border border-teal-500/30 mb-8">
                              <h2 className="text-2xl font-bold text-teal-300 mb-6">🎯 ทำไมต้องวิเคราะห์ตลาด?</h2>
                              <p className="text-slate-300 leading-relaxed mb-6">
                                การวิเคราะห์ตลาด Forex คือ <strong className="text-cyan-400">"เข็มทิศ"</strong> ที่จะช่วยให้คุณตัดสินใจซื้อขายได้อย่างมีเหตุผล 
                                แทนการเดาหรือพึ่งโชคเท่านั้น
                              </p>
                              
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-slate-900/50 p-4 rounded-lg">
                                  <h3 className="text-green-400 font-semibold mb-3">✅ การวิเคราะห์ช่วย:</h3>
                                  <ul className="text-slate-300 space-y-1 text-sm">
                                    <li>• เพิ่มโอกาสทำกำไร</li>
                                    <li>• ลดความเสี่ยงจากการเดา</li>
                                    <li>• สร้างกลยุทธ์ที่ชัดเจน</li>
                                    <li>• เข้าใจพฤติกรรมตลาด</li>
                                  </ul>
                                </div>
                                
                                <div className="bg-slate-900/50 p-4 rounded-lg">
                                  <h3 className="text-red-400 font-semibold mb-3">❌ หากไม่วิเคราะห์:</h3>
                                  <ul className="text-slate-300 space-y-1 text-sm">
                                    <li>• เทรดแบบเดา = เสี่ยงสูญเสีย</li>
                                    <li>• ไม่รู้จุดเข้า-ออก</li>
                                    <li>• ไม่มีแผนการเทรด</li>
                                    <li>• อารมณ์ครอบงำการตัดสินใจ</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* 2 ประเภทการวิเคราะห์ */}
                            <div className="bg-slate-800/30 p-6 rounded-xl mb-8">
                              <h2 className="text-2xl font-bold text-cyan-300 mb-6">⚖️ 2 ประเภทการวิเคราะห์หลัก</h2>
                              
                              <div className="grid md:grid-cols-2 gap-6 mb-6">
                                {/* Technical Analysis */}
                                <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 p-6 rounded-lg border border-blue-500/30">
                                  <div className="flex items-center mb-4">
                                    <div className="w-16 h-16 bg-blue-600/30 rounded-xl flex items-center justify-center mr-4">
                                      <span className="text-2xl">📈</span>
                                    </div>
                                    <div>
                                      <h3 className="text-blue-400 font-bold text-lg">Technical Analysis</h3>
                                      <p className="text-slate-400 text-sm">การวิเคราะห์ทางเทคนิค</p>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <div className="bg-slate-900/50 p-4 rounded">
                                      <h4 className="text-cyan-400 font-semibold mb-2">📖 หลักการ:</h4>
                                      <p className="text-slate-300 text-sm leading-relaxed">
                                        วิเคราะห์จาก<strong className="text-green-400">ประวัติราคา, กราฟ และ Indicator</strong> 
                                        โดยเชื่อว่าราคาสะท้อนข้อมูลทั้งหมดแล้ว
                                      </p>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-4 rounded">
                                      <h4 className="text-blue-400 font-semibold mb-2">🛠️ เครื่องมือ:</h4>
                                      <ul className="text-slate-300 text-sm space-y-1">
                                        <li>• Candlestick Pattern</li>
                                        <li>• Support & Resistance</li>
                                        <li>• Moving Average</li>
                                        <li>• RSI, MACD, Bollinger Bands</li>
                                        <li>• Trend Lines</li>
                                      </ul>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-4 rounded">
                                      <h4 className="text-green-400 font-semibold mb-2">👍 ข้อดี:</h4>
                                      <ul className="text-slate-300 text-sm space-y-1">
                                        <li>• ใช้ได้ทุก Timeframe</li>
                                        <li>• สัญญาณรวดเร็ว</li>
                                        <li>• ไม่ต้องรอข่าว</li>
                                        <li>• เหมาะ Day Trading</li>
                                      </ul>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-4 rounded">
                                      <h4 className="text-red-400 font-semibold mb-2">👎 ข้อเสีย:</h4>
                                      <ul className="text-slate-300 text-sm space-y-1">
                                        <li>• False Signal บ่อย</li>
                                        <li>• ไม่รู้สาเหตุแท้จริง</li>
                                        <li>• ไม่ทำงานในข่าวใหญ่</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>

                                {/* Fundamental Analysis */}
                                <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 p-6 rounded-lg border border-green-500/30">
                                  <div className="flex items-center mb-4">
                                    <div className="w-16 h-16 bg-green-600/30 rounded-xl flex items-center justify-center mr-4">
                                      <span className="text-2xl">📰</span>
                                    </div>
                                    <div>
                                      <h3 className="text-green-400 font-bold text-lg">Fundamental Analysis</h3>
                                      <p className="text-slate-400 text-sm">การวิเคราะห์ปัจจัยพื้นฐาน</p>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <div className="bg-slate-900/50 p-4 rounded">
                                      <h4 className="text-cyan-400 font-semibold mb-2">📖 หลักการ:</h4>
                                      <p className="text-slate-300 text-sm leading-relaxed">
                                        วิเคราะห์จาก<strong className="text-green-400">เศรษฐกิจ การเมือง สังคม</strong> 
                                        เพื่อหาค่าที่แท้จริงของสกุลเงิน
                                      </p>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-4 rounded">
                                      <h4 className="text-green-400 font-semibold mb-2">🛠️ เครื่องมือ:</h4>
                                      <ul className="text-slate-300 text-sm space-y-1">
                                        <li>• Economic Calendar</li>
                                        <li>• Interest Rate</li>
                                        <li>• GDP, CPI, NFP</li>
                                        <li>• Central Bank Policy</li>
                                        <li>• Political Events</li>
                                      </ul>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-4 rounded">
                                      <h4 className="text-green-400 font-semibold mb-2">👍 ข้อดี:</h4>
                                      <ul className="text-slate-300 text-sm space-y-1">
                                        <li>• ทิศทางระยะยาวชัดเจน</li>
                                        <li>• เข้าใจสาเหตุแท้จริง</li>
                                        <li>• การเคลื่อนไหวใหญ่</li>
                                        <li>• เหมาะ Swing Trading</li>
                                      </ul>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-4 rounded">
                                      <h4 className="text-red-400 font-semibold mb-2">👎 ข้อเสีย:</h4>
                                      <ul className="text-slate-300 text-sm space-y-1">
                                        <li>• ช้า ต้องรอข่าว</li>
                                        <li>• ซับซ้อน ต้องเข้าใจเศรษฐกิจ</li>
                                        <li>• ไม่เหมาะ Scalping</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* เปรียบเทียบ */}
                              <div className="bg-slate-900/50 p-6 rounded-lg">
                                <h3 className="text-cyan-400 font-semibold mb-4">📊 เปรียบเทียบการใช้งาน:</h3>
                                
                                <div className="overflow-x-auto">
                                  <table className="w-full text-sm">
                                    <thead>
                                      <tr className="border-b border-slate-600">
                                        <th className="text-left p-3 text-cyan-400">หัวข้อ</th>
                                        <th className="text-left p-3 text-blue-400">Technical</th>
                                        <th className="text-left p-3 text-green-400">Fundamental</th>
                                      </tr>
                                    </thead>
                                    <tbody className="text-slate-300">
                                      <tr className="border-b border-slate-700">
                                        <td className="p-3 font-semibold">เวลาในการวิเคราะห์</td>
                                        <td className="p-3">รวดเร็ว (5-15 นาที)</td>
                                        <td className="p-3">ช้า (1-2 ชั่วโมง)</td>
                                      </tr>
                                      <tr className="border-b border-slate-700">
                                        <td className="p-3 font-semibold">เหมาะกับ Timeframe</td>
                                        <td className="p-3">M1-H4</td>
                                        <td className="p-3">H4-Monthly</td>
                                      </tr>
                                      <tr className="border-b border-slate-700">
                                        <td className="p-3 font-semibold">ความแม่นยำ</td>
                                        <td className="p-3">70-80%</td>
                                        <td className="p-3">80-90% (ระยะยาว)</td>
                                      </tr>
                                      <tr className="border-b border-slate-700">
                                        <td className="p-3 font-semibold">การเคลื่อนไหว</td>
                                        <td className="p-3">10-50 pips</td>
                                        <td className="p-3">50-500+ pips</td>
                                      </tr>
                                      <tr>
                                        <td className="p-3 font-semibold">เหมาะสำหรับ</td>
                                        <td className="p-3">มือใหม่, Day Trading</td>
                                        <td className="p-3">มีประสบการณ์, Long-term</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>

                            {/* ข่าวเศรษฐกิจสำคัญ */}
                            <div className="bg-gradient-to-r from-amber-600/10 to-orange-600/10 p-6 rounded-xl border border-amber-500/30 mb-8">
                              <h2 className="text-2xl font-bold text-amber-300 mb-6">📰 ข่าวเศรษฐกิจสำคัญที่มีผลต่อค่าเงิน</h2>
                              
                              <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                                {/* US Economic Data */}
                                <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-6 rounded-lg border border-blue-500/30">
                                  <div className="text-center mb-4">
                                    <div className="w-16 h-16 bg-blue-600/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                                      <span className="text-2xl">🇺🇸</span>
                                    </div>
                                    <h3 className="text-blue-400 font-bold text-lg">US Economic Data</h3>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-red-400 font-semibold text-sm mb-2">🚨 High Impact:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li><strong>NFP:</strong> Non-Farm Payroll (วันศุกร์แรก)</li>
                                        <li><strong>CPI:</strong> อัตราเงินเฟ้อ (กลางเดือน)</li>
                                        <li><strong>Fed Rate:</strong> อัตราดอกเบี้ย (8 ครั้ง/ปี)</li>
                                        <li><strong>FOMC:</strong> การประชุม Fed</li>
                                      </ul>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-amber-400 font-semibold text-sm mb-2">⚠️ Medium Impact:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li><strong>GDP:</strong> การเติบโตทางเศรษฐกิจ</li>
                                        <li><strong>Retail Sales:</strong> ยอดขายปลีก</li>
                                        <li><strong>PPI:</strong> ดัชนีราคาผู้ผลิต</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>

                                {/* European Economic Data */}
                                <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 p-6 rounded-lg border border-green-500/30">
                                  <div className="text-center mb-4">
                                    <div className="w-16 h-16 bg-green-600/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                                      <span className="text-2xl">🇪🇺</span>
                                    </div>
                                    <h3 className="text-green-400 font-bold text-lg">European Economic Data</h3>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-red-400 font-semibold text-sm mb-2">🚨 High Impact:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li><strong>ECB Rate:</strong> ดอกเบี้ย ECB</li>
                                        <li><strong>EU CPI:</strong> เงินเฟ้อยุโรป</li>
                                        <li><strong>German GDP:</strong> GDP เยอรมนี</li>
                                        <li><strong>UK GDP & CPI:</strong> ข้อมูลอังกฤษ</li>
                                      </ul>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-amber-400 font-semibold text-sm mb-2">⚠️ Medium Impact:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li><strong>PMI:</strong> ดัชนีการจัดซื้อ</li>
                                        <li><strong>Employment:</strong> การจ้างงาน</li>
                                        <li><strong>Trade Balance:</strong> ดุลการค้า</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>

                                {/* Asian Economic Data */}
                                <div className="bg-gradient-to-br from-purple-600/20 to-violet-600/20 p-6 rounded-lg border border-purple-500/30">
                                  <div className="text-center mb-4">
                                    <div className="w-16 h-16 bg-purple-600/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                                      <span className="text-2xl">🏯</span>
                                    </div>
                                    <h3 className="text-purple-400 font-bold text-lg">Asian Economic Data</h3>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-red-400 font-semibold text-sm mb-2">🚨 High Impact:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li><strong>BOJ Rate:</strong> ดอกเบี้ยญี่ปุ่น</li>
                                        <li><strong>China GDP:</strong> GDP จีน</li>
                                        <li><strong>RBA Rate:</strong> ดอกเบี้ยออสเตรเลีย</li>
                                        <li><strong>RBNZ Rate:</strong> ดอกเบี้ยนิวซีแลนด์</li>
                                      </ul>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <h4 className="text-amber-400 font-semibold text-sm mb-2">⚠️ Medium Impact:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li><strong>Tankan Survey:</strong> ความเชื่อมั่นธุรกิจ</li>
                                        <li><strong>AU Employment:</strong> การจ้างงานออสซี่</li>
                                        <li><strong>Trade Data:</strong> ข้อมูลการค้า</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* รายละเอียดข่าวสำคัญ */}
                              <div className="bg-slate-900/50 p-6 rounded-lg mb-6">
                                <h3 className="text-cyan-400 font-semibold mb-4">📋 รายละเอียดข่าวเศรษฐกิจสำคัญ:</h3>
                                
                                <div className="space-y-6">
                                  {/* NFP */}
                                  <div className="bg-gradient-to-r from-red-600/10 to-red-800/10 p-4 rounded-lg border border-red-500/20">
                                    <div className="flex items-center mb-3">
                                      <div className="w-8 h-8 bg-red-600/30 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-red-400 font-bold text-sm">NFP</span>
                                      </div>
                                      <h4 className="text-red-400 font-bold">Non-Farm Payroll (NFP)</h4>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                                      <div>
                                        <h5 className="text-cyan-400 font-semibold mb-2">📖 คืออะไร:</h5>
                                        <p className="text-slate-300 text-xs">จำนวนงานใหม่ที่เพิ่มขึ้นในภาคเอกชน (ไม่รวมเกษตรกรรม) สะท้อนความแข็งแกร่งของเศรษฐกิจ</p>
                                      </div>
                                      <div>
                                        <h5 className="text-green-400 font-semibold mb-2">📊 ผลกระทบ:</h5>
                                        <ul className="text-slate-300 text-xs space-y-1">
                                          <li>• สูงกว่าคาด = USD แข็งค่า</li>
                                          <li>• ต่ำกว่าคาด = USD อ่อนค่า</li>
                                          <li>• เคลื่อนไหว 50-200 pips</li>
                                        </ul>
                                      </div>
                                      <div>
                                        <h5 className="text-amber-400 font-semibold mb-2">📅 เวลา:</h5>
                                        <p className="text-slate-300 text-xs">วันศุกร์แรกของเดือน 21:30 น. (GMT+7)</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* CPI */}
                                  <div className="bg-gradient-to-r from-orange-600/10 to-orange-800/10 p-4 rounded-lg border border-orange-500/20">
                                    <div className="flex items-center mb-3">
                                      <div className="w-8 h-8 bg-orange-600/30 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-orange-400 font-bold text-sm">CPI</span>
                                      </div>
                                      <h4 className="text-orange-400 font-bold">Consumer Price Index (CPI)</h4>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                                      <div>
                                        <h5 className="text-cyan-400 font-semibold mb-2">📖 คืออะไร:</h5>
                                        <p className="text-slate-300 text-xs">ดัชนีราคาผู้บริโภค วัดอัตราเงินเฟ้อ Fed ใช้ตัดสินใจดอกเบี้ย</p>
                                      </div>
                                      <div>
                                        <h5 className="text-green-400 font-semibold mb-2">📊 ผลกระทบ:</h5>
                                        <ul className="text-slate-300 text-xs space-y-1">
                                          <li>• เงินเฟ้อสูง = Fed อาจขึ้นดอกเบี้ย</li>
                                          <li>• USD แข็งค่า (ระยะสั้น)</li>
                                          <li>• เคลื่อนไหว 30-100 pips</li>
                                        </ul>
                                      </div>
                                      <div>
                                        <h5 className="text-amber-400 font-semibold mb-2">📅 เวลา:</h5>
                                        <p className="text-slate-300 text-xs">วันที่ 10-15 ของเดือน 21:30 น. (GMT+7)</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Fed Rate */}
                                  <div className="bg-gradient-to-r from-green-600/10 to-green-800/10 p-4 rounded-lg border border-green-500/20">
                                    <div className="flex items-center mb-3">
                                      <div className="w-8 h-8 bg-green-600/30 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-green-400 font-bold text-xs">FED</span>
                                      </div>
                                      <h4 className="text-green-400 font-bold">Federal Reserve Interest Rate Decision</h4>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                                      <div>
                                        <h5 className="text-cyan-400 font-semibold mb-2">📖 คืออะไร:</h5>
                                        <p className="text-slate-300 text-xs">อัตราดอกเบี้ยนโยบาย Fed กำหนด มีผลต่อดอกเบี้ยทั่วประเทศ</p>
                                      </div>
                                      <div>
                                        <h5 className="text-green-400 font-semibold mb-2">📊 ผลกระทบ:</h5>
                                        <ul className="text-slate-300 text-xs space-y-1">
                                          <li>• ขึ้นดอกเบี้ย = USD แข็งมาก</li>
                                          <li>• ลดดอกเบี้ย = USD อ่อนมาก</li>
                                          <li>• เคลื่อนไหว 100-500+ pips</li>
                                        </ul>
                                      </div>
                                      <div>
                                        <h5 className="text-amber-400 font-semibold mb-2">📅 เวลา:</h5>
                                        <p className="text-slate-300 text-xs">8 ครั้ง/ปี ตามปฏิทิน FOMC 03:00 น. (GMT+7)</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* GDP */}
                                  <div className="bg-gradient-to-r from-blue-600/10 to-blue-800/10 p-4 rounded-lg border border-blue-500/20">
                                    <div className="flex items-center mb-3">
                                      <div className="w-8 h-8 bg-blue-600/30 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-blue-400 font-bold text-sm">GDP</span>
                                      </div>
                                      <h4 className="text-blue-400 font-bold">Gross Domestic Product (GDP)</h4>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                                      <div>
                                        <h5 className="text-cyan-400 font-semibold mb-2">📖 คืออะไร:</h5>
                                        <p className="text-slate-300 text-xs">มูลค่าการผลิตทั้งหมดของประเทศ วัดการเติบโตทางเศรษฐกิจ</p>
                                      </div>
                                      <div>
                                        <h5 className="text-green-400 font-semibold mb-2">📊 ผลกระทบ:</h5>
                                        <ul className="text-slate-300 text-xs space-y-1">
                                          <li>• เติบโตสูง = สกุลเงินแข็งค่า</li>
                                          <li>• หดตัว = สกุลเงินอ่อนค่า</li>
                                          <li>• เคลื่อนไหว 20-80 pips</li>
                                        </ul>
                                      </div>
                                      <div>
                                        <h5 className="text-amber-400 font-semibold mb-2">📅 เวลา:</h5>
                                        <p className="text-slate-300 text-xs">ทุกไตรมาส (3 เดือน) เวลาแตกต่างกันแต่ละประเทศ</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* ECB Rate */}
                                  <div className="bg-gradient-to-r from-purple-600/10 to-purple-800/10 p-4 rounded-lg border border-purple-500/20">
                                    <div className="flex items-center mb-3">
                                      <div className="w-8 h-8 bg-purple-600/30 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-purple-400 font-bold text-xs">ECB</span>
                                      </div>
                                      <h4 className="text-purple-400 font-bold">European Central Bank Interest Rate</h4>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                                      <div>
                                        <h5 className="text-cyan-400 font-semibold mb-2">📖 คืออะไร:</h5>
                                        <p className="text-slate-300 text-xs">อัตราดอกเบี้ยของธนาคารกลางยุโรป ส่งผลต่อ EUR ทั้งหมด</p>
                                      </div>
                                      <div>
                                        <h5 className="text-green-400 font-semibold mb-2">📊 ผลกระทบ:</h5>
                                        <ul className="text-slate-300 text-xs space-y-1">
                                          <li>• Hawkish (เข้มงวด) = EUR แข็ง</li>
                                          <li>• Dovish (อ่อนนวล) = EUR อ่อน</li>
                                          <li>• เคลื่อนไหว 50-300 pips</li>
                                        </ul>
                                      </div>
                                      <div>
                                        <h5 className="text-amber-400 font-semibold mb-2">📅 เวลา:</h5>
                                        <p className="text-slate-300 text-xs">8 ครั้ง/ปี วันพฤหัสบดี 20:45 น. (GMT+7)</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* BOJ Rate */}
                                  <div className="bg-gradient-to-r from-indigo-600/10 to-indigo-800/10 p-4 rounded-lg border border-indigo-500/20">
                                    <div className="flex items-center mb-3">
                                      <div className="w-8 h-8 bg-indigo-600/30 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-indigo-400 font-bold text-xs">BOJ</span>
                                      </div>
                                      <h4 className="text-indigo-400 font-bold">Bank of Japan Interest Rate Decision</h4>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                                      <div>
                                        <h5 className="text-cyan-400 font-semibold mb-2">📖 คืออะไร:</h5>
                                        <p className="text-slate-300 text-xs">อัตราดอกเบี้ยของธนาคารกลางญี่ปุ่น มักจะติดลบ (Negative Rate)</p>
                                      </div>
                                      <div>
                                        <h5 className="text-green-400 font-semibold mb-2">📊 ผลกระทบ:</h5>
                                        <ul className="text-slate-300 text-xs space-y-1">
                                          <li>• การแทรกแซง (Intervention) สำคัญ</li>
                                          <li>• นโยบาย YCC มีผลต่อ JPY</li>
                                          <li>• เคลื่อนไหว 30-150 pips</li>
                                        </ul>
                                      </div>
                                      <div>
                                        <h5 className="text-amber-400 font-semibold mb-2">📅 เวลา:</h5>
                                        <p className="text-slate-300 text-xs">8 ครั้ง/ปี เวลาไม่แน่นอน ประมาณ 11:00-15:00 น.</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* ตัวอย่างการใช้งาน */}
                              <div className="bg-slate-900/50 p-6 rounded-lg">
                                <h3 className="text-cyan-400 font-semibold mb-4">📈 ตัวอย่างการใช้งานจริง:</h3>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div className="space-y-3">
                                    <h4 className="text-green-400 font-semibold">💡 สถานการณ์:</h4>
                                    <div className="bg-slate-800/50 p-3 rounded text-sm">
                                      <ul className="text-slate-300 space-y-1">
                                        <li>• <strong>ข่าว:</strong> NFP ออกมา 250K (คาด 180K)</li>
                                        <li>• <strong>ความหมาย:</strong> เศรษฐกิจ US แข็งแกร่งกว่าคาด</li>
                                        <li>• <strong>ผลกระทบ:</strong> USD แข็งค่าทันที</li>
                                        <li>• <strong>Action:</strong> ซื้อ USD/JPY, EUR/USD Short</li>
                                      </ul>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <h4 className="text-amber-400 font-semibold">🕐 Timeline:</h4>
                                    <div className="bg-slate-800/50 p-3 rounded text-sm">
                                      <div className="space-y-1 text-slate-300">
                                        <p><strong>21:30:</strong> ข่าว NFP ออก</p>
                                        <p><strong>21:31-21:35:</strong> ตลาดผันผวนสูงมาก</p>
                                        <p><strong>21:35-22:00:</strong> ทิศทาง USD ชัดเจน</p>
                                        <p><strong>22:00+:</strong> Trend ใหม่คงอยู่หลายวัน</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* เคล็ดลับการเทรดข่าว */}
                                <div className="mt-6 p-4 bg-amber-600/10 rounded-lg border border-amber-500/20">
                                  <h4 className="text-amber-400 font-semibold mb-3">💡 เคล็ดลับการเทรดข่าว:</h4>
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <h5 className="text-green-400 font-semibold mb-2 text-sm">✅ ควรทำ:</h5>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• รอ 2-3 นาทีหลังข่าวออก</li>
                                        <li>• ดูทิศทางให้ชัดเจนก่อน</li>
                                        <li>• ใช้ Stop Loss กว้างกว่าปกติ</li>
                                        <li>• เทรดตามทิศทางใหญ่</li>
                                      </ul>
                                    </div>
                                    <div>
                                      <h5 className="text-red-400 font-semibold mb-2 text-sm">❌ ไม่ควรทำ:</h5>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• เทรดก่อนข่าวออก (เสี่ยง Gap)</li>
                                        <li>• ใช้ Leverage สูงเกินไป</li>
                                        <li>• ตั้ง Stop Loss แคบ</li>
                                        <li>• เทรดทุกข่าว (เลือกข่าวใหญ่)</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Timeframe Analysis */}
                            <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 p-6 rounded-xl border border-indigo-500/30 mb-8">
                              <h2 className="text-2xl font-bold text-indigo-300 mb-6">⏰ Timeframe และ Multi-timeframe Analysis</h2>
                              
                              {/* Timeframe คืออะไร */}
                              <div className="mb-6">
                                <h3 className="text-xl font-bold text-cyan-400 mb-4">📅 Timeframe คืออะไร?</h3>
                                <p className="text-slate-300 leading-relaxed mb-4">
                                  <strong className="text-cyan-400">Timeframe</strong> คือช่วงเวลาที่แต่ละ Candlestick แสดง 
                                  เช่น H1 = 1 เทียน = 1 ชั่วโมง, D1 = 1 เทียน = 1 วัน
                                </p>
                                
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                  {/* Short Term */}
                                  <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 p-4 rounded-lg border border-red-500/30">
                                    <h4 className="text-red-400 font-bold mb-2">🏃 Short Term</h4>
                                    <div className="space-y-2 text-sm">
                                      <p className="text-slate-300"><strong>M1-M15</strong></p>
                                      <ul className="text-slate-400 text-xs space-y-1">
                                        <li>• Scalping</li>
                                        <li>• กำไรเล็กๆ เร็ว</li>
                                        <li>• เสี่ยงสูง</li>
                                        <li>• ต้องดูหน้าจอตลอด</li>
                                      </ul>
                                    </div>
                                  </div>

                                  {/* Medium Term */}
                                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-4 rounded-lg border border-blue-500/30">
                                    <h4 className="text-blue-400 font-bold mb-2">🚶 Medium Term</h4>
                                    <div className="space-y-2 text-sm">
                                      <p className="text-slate-300"><strong>H1-H4</strong></p>
                                      <ul className="text-slate-400 text-xs space-y-1">
                                        <li>• Day Trading</li>
                                        <li>• สมดุลกำไร-เสี่ยง</li>
                                        <li>• เหมาะมือใหม่</li>
                                        <li>• ดูหน้าจอไม่ตลอด</li>
                                      </ul>
                                    </div>
                                  </div>

                                  {/* Long Term */}
                                  <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 p-4 rounded-lg border border-green-500/30">
                                    <h4 className="text-green-400 font-bold mb-2">🧘 Long Term</h4>
                                    <div className="space-y-2 text-sm">
                                      <p className="text-slate-300"><strong>D1-W1</strong></p>
                                      <ul className="text-slate-400 text-xs space-y-1">
                                        <li>• Swing Trading</li>
                                        <li>• กำไรใหญ่</li>
                                        <li>• เสี่ยงต่ำ</li>
                                        <li>• เหมาะคนทำงาน</li>
                                      </ul>
                                    </div>
                                  </div>

                                  {/* Very Long Term */}
                                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 p-4 rounded-lg border border-purple-500/30">
                                    <h4 className="text-purple-400 font-bold mb-2">🏔️ Very Long Term</h4>
                                    <div className="space-y-2 text-sm">
                                      <p className="text-slate-300"><strong>Monthly+</strong></p>
                                      <ul className="text-slate-400 text-xs space-y-1">
                                        <li>• Position Trading</li>
                                        <li>• กำไรมหาศาล</li>
                                        <li>• ใช้เงินทุนเยอะ</li>
                                        <li>• สำหรับนักลงทุน</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Multi-timeframe Analysis */}
                              <div className="mb-6">
                                <h3 className="text-xl font-bold text-cyan-400 mb-4">🔍 Multi-timeframe Analysis</h3>
                                <p className="text-slate-300 leading-relaxed mb-6">
                                  การวิเคราะห์<strong className="text-cyan-400">หลาย Timeframe พร้อมกัน</strong> เพื่อเพิ่มความแม่นยำ 
                                  โดยใช้หลัก <strong className="text-green-400">"Top-Down Approach"</strong>
                                </p>
                                
                                <div className="grid md:grid-cols-3 gap-4 mb-6">
                                  {/* Step 1 */}
                                  <div className="bg-slate-900/50 p-4 rounded-lg">
                                    <div className="flex items-center mb-3">
                                      <div className="w-8 h-8 bg-blue-600/30 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-blue-400 font-bold">1</span>
                                      </div>
                                      <h4 className="text-blue-400 font-semibold">Higher Timeframe</h4>
                                    </div>
                                    <div className="text-sm">
                                      <p className="text-slate-300 mb-2"><strong>D1-W1:</strong> ดู Trend หลัก</p>
                                      <ul className="text-slate-400 text-xs space-y-1">
                                        <li>• ทิศทางแนวโน้มยาว</li>
                                        <li>• Support/Resistance สำคัญ</li>
                                        <li>• Market Structure</li>
                                      </ul>
                                    </div>
                                  </div>

                                  {/* Step 2 */}
                                  <div className="bg-slate-900/50 p-4 rounded-lg">
                                    <div className="flex items-center mb-3">
                                      <div className="w-8 h-8 bg-green-600/30 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-green-400 font-bold">2</span>
                                      </div>
                                      <h4 className="text-green-400 font-semibold">Medium Timeframe</h4>
                                    </div>
                                    <div className="text-sm">
                                      <p className="text-slate-300 mb-2"><strong>H4-H1:</strong> หาจุดเข้า</p>
                                      <ul className="text-slate-400 text-xs space-y-1">
                                        <li>• Pullback Pattern</li>
                                        <li>• Entry Setup</li>
                                        <li>• Risk/Reward ดี</li>
                                      </ul>
                                    </div>
                                  </div>

                                  {/* Step 3 */}
                                  <div className="bg-slate-900/50 p-4 rounded-lg">
                                    <div className="flex items-center mb-3">
                                      <div className="w-8 h-8 bg-amber-600/30 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-amber-400 font-bold">3</span>
                                      </div>
                                      <h4 className="text-amber-400 font-semibold">Lower Timeframe</h4>
                                    </div>
                                    <div className="text-sm">
                                      <p className="text-slate-300 mb-2"><strong>M15-M5:</strong> จุดเข้าแม่นยำ</p>
                                      <ul className="text-slate-400 text-xs space-y-1">
                                        <li>• Fine-tune Entry</li>
                                        <li>• Stop Loss แคบ</li>
                                        <li>• Timing เข้าออเดอร์</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* ตัวอย่างการใช้งาน Multi-timeframe */}
                              <div className="bg-slate-900/50 p-6 rounded-lg">
                                <h3 className="text-cyan-400 font-semibold mb-4">📊 ตัวอย่าง Multi-timeframe Analysis:</h3>
                                
                                <div className="grid md:grid-cols-3 gap-6">
                                  <div className="space-y-3">
                                    <h4 className="text-blue-400 font-semibold">📈 D1 (Daily):</h4>
                                    <div className="bg-slate-800/50 p-3 rounded text-sm">
                                      <ul className="text-slate-300 space-y-1">
                                        <li>• <strong>EUR/USD</strong> อยู่ใน Uptrend</li>
                                        <li>• ราคาอยู่เหนือ MA 200</li>
                                        <li>• Support ที่ 1.1000</li>
                                        <li>• <span className="text-green-400">✅ Bullish Bias</span></li>
                                      </ul>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <h4 className="text-green-400 font-semibold">📊 H4 (4-Hour):</h4>
                                    <div className="bg-slate-800/50 p-3 rounded text-sm">
                                      <ul className="text-slate-300 space-y-1">
                                        <li>• ราคา Pullback ลงมา</li>
                                        <li>• ชน Support ที่ 1.1050</li>
                                        <li>• RSI Oversold</li>
                                        <li>• <span className="text-yellow-400">⏳ รอสัญญาณ Reversal</span></li>
                                      </ul>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <h4 className="text-amber-400 font-semibold">⚡ M15 (15-Min):</h4>
                                    <div className="bg-slate-800/50 p-3 rounded text-sm">
                                      <ul className="text-slate-300 space-y-1">
                                        <li>• เกิด Bullish Engulfing</li>
                                        <li>• เข้า Buy ที่ 1.1055</li>
                                        <li>• SL: 1.1040 (15 pips)</li>
                                        <li>• <span className="text-green-400">🚀 TP: 1.1100 (45 pips)</span></li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* สรุปและคำแนะนำ */}
                            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 p-6 rounded-xl border border-green-500/30">
                              <h2 className="text-xl font-bold text-green-300 mb-4">💡 สรุปและคำแนะนำ</h2>
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div className="bg-green-600/20 p-4 rounded-lg">
                                    <h3 className="text-green-400 font-semibold mb-2">✅ สำหรับมือใหม่:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• เริ่มจาก <strong>Technical Analysis</strong></li>
                                      <li>• ใช้ H1-H4 เป็นหลัก</li>
                                      <li>• ติดตาม Economic Calendar</li>
                                      <li>• หลีกเลี่ยงช่วงข่าวใหญ่</li>
                                    </ul>
                                  </div>
                                  
                                  <div className="bg-blue-600/20 p-4 rounded-lg">
                                    <h3 className="text-blue-400 font-semibold mb-2">🎯 เป้าหมายพัฒนา:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• เรียนรู้ Technical + Fundamental</li>
                                      <li>• ฝึก Multi-timeframe Analysis</li>
                                      <li>• เข้าใจ Market Psychology</li>
                                      <li>• สร้างระบบการวิเคราะห์ของตัวเอง</li>
                                    </ul>
                                  </div>
                                </div>
                                
                                <div className="space-y-4">
                                  <div className="bg-red-600/20 p-4 rounded-lg">
                                    <h3 className="text-red-400 font-semibold mb-2">🚫 ข้อควรระวัง:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• <strong>อย่าใช้แค่วิธีเดียว</strong> - ผสมทั้งสองแบบ</li>
                                      <li>• อย่าวิเคราะห์เยอะเกินไป</li>
                                      <li>• ระวัง False Signal</li>
                                      <li>• อย่าเทรดขณะข่าวสำคัญ</li>
                                    </ul>
                                  </div>
                                  
                                  <div className="bg-amber-600/20 p-4 rounded-lg">
                                    <h3 className="text-amber-400 font-semibold mb-2">📚 ขั้นตอนต่อไป:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• ฝึกวิเคราะห์ในกราฟจริง</li>
                                      <li>• บันทึกผลการวิเคราะห์</li>
                                      <li>• หาจุดแข็ง-จุดอ่อนของตัวเอง</li>
                                      <li>• พัฒนา Trading Plan</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>

                    {/* บทที่ 7: การบริหารความเสี่ยงและการเงินในการเทรด Forex */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-start bg-gradient-to-r from-rose-600/20 to-red-600/20 border-rose-500/30 hover:border-rose-400/50 text-rose-400 hover:text-rose-300">
                          <BookOpen className="w-4 h-4 mr-2" />
                          บทที่ 7: การบริหารความเสี่ยงและการเงินในการเทรด Forex
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-5xl max-h-[90vh]">
                        <ScrollArea className="h-[85vh] pr-4">
                          <div className="p-6">
                            <h1 className="text-3xl font-bold text-rose-400 mb-8 text-center">🛡️ การบริหารความเสี่ยงและการเงินในการเทรด Forex</h1>
                            
                            {/* ความสำคัญของ Risk Management */}
                            <div className="bg-rose-600/10 p-6 rounded-xl border border-rose-500/30 mb-8">
                              <h2 className="text-2xl font-bold text-rose-300 mb-6">🎯 ทำไม Risk Management ถึงสำคัญ?</h2>
                              <p className="text-slate-300 leading-relaxed mb-6">
                                <strong className="text-cyan-400">Risk Management</strong> คือ <strong className="text-green-400">"หัวใจสำคัญ"</strong> ของการเทรดที่ประสบความสำเร็จ 
                                มีความสำคัญมากกว่าการวิเคราะห์หรือกลยุทธ์การเทรด เพราะเป็นตัวกำหนดว่าคุณจะอยู่ในตลาดได้นานแค่ไหน
                              </p>
                              
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-slate-900/50 p-4 rounded-lg">
                                  <h3 className="text-green-400 font-semibold mb-3">✅ ประโยชน์ของ Risk Management:</h3>
                                  <ul className="text-slate-300 space-y-1 text-sm">
                                    <li>• <strong>ปกป้องเงินทุน</strong> - หลีกเลี่ยงการสูญเสียใหญ่</li>
                                    <li>• <strong>เทรดได้นาน</strong> - ไม่มีวันล้มละลาย</li>
                                    <li>• <strong>กำไรสะสม</strong> - Compound Effect</li>
                                    <li>• <strong>จิตใจมั่นคง</strong> - ไม่เครียด</li>
                                  </ul>
                                </div>
                                
                                <div className="bg-slate-900/50 p-4 rounded-lg">
                                  <h3 className="text-red-400 font-semibold mb-3">❌ หากไม่มี Risk Management:</h3>
                                  <ul className="text-slate-300 space-y-1 text-sm">
                                    <li>• <strong>ล้มละลายเร็ว</strong> - 1-2 เทรดผิดก็จบ</li>
                                    <li>• <strong>Revenge Trading</strong> - ซื้อขายแบบอารมณ์</li>
                                    <li>• <strong>Over-leverage</strong> - ใช้เงินกู้เกินขีดจำกัด</li>
                                    <li>• <strong>สุขภาพจิตแย่</strong> - เครียด นอนไม่หลับ</li>
                                  </ul>
                                </div>
                              </div>
                              
                              {/* สถิติน่ากลัว */}
                              <div className="mt-6 p-4 bg-red-600/10 rounded-lg border border-red-500/30">
                                <h3 className="text-red-400 font-semibold mb-3">📊 สถิติที่น่าสะเทือนใจ:</h3>
                                <div className="grid md:grid-cols-3 gap-4 text-sm">
                                  <div className="text-center">
                                    <p className="text-3xl font-bold text-red-400">80%</p>
                                    <p className="text-slate-400">ของเทรดเดอร์แรกเข้าขาดทุนใน 1 ปีแรก</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-3xl font-bold text-red-400">95%</p>
                                    <p className="text-slate-400">ล้มละลายภายใน 2 ปี เพราะไม่มี Risk Management</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-3xl font-bold text-green-400">5%</p>
                                    <p className="text-slate-400">เท่านั้นที่รอดและทำกำไรได้ในระยะยาว</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Stop Loss และ Take Profit */}
                            <div className="bg-slate-800/30 p-6 rounded-xl mb-8">
                              <h2 className="text-2xl font-bold text-cyan-300 mb-6">🛡️ Stop Loss และ Take Profit</h2>
                              
                              <div className="grid md:grid-cols-2 gap-6 mb-6">
                                {/* Stop Loss */}
                                <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 p-6 rounded-lg border border-red-500/30">
                                  <div className="flex items-center mb-4">
                                    <div className="w-16 h-16 bg-red-600/30 rounded-xl flex items-center justify-center mr-4">
                                      <span className="text-2xl">🛑</span>
                                    </div>
                                    <div>
                                      <h3 className="text-red-400 font-bold text-lg">Stop Loss (SL)</h3>
                                      <p className="text-slate-400 text-sm">จำกัดความสูญเสีย</p>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <div className="bg-slate-900/50 p-4 rounded">
                                      <h4 className="text-cyan-400 font-semibold mb-2">📖 คืออะไร:</h4>
                                      <p className="text-slate-300 text-sm leading-relaxed">
                                        คำสั่งที่ตั้งไว้เพื่อ<strong className="text-red-400">ปิดออเดอร์อัตโนมัติ</strong>เมื่อขาดทุนถึงระดับที่กำหนด 
                                        ป้องกันไม่ให้สูญเสียเกินที่รับได้
                                      </p>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-4 rounded">
                                      <h4 className="text-red-400 font-semibold mb-2">🎯 วิธีตั้ง Stop Loss:</h4>
                                      <ul className="text-slate-300 text-sm space-y-1">
                                        <li>• <strong>Technical:</strong> ใต้ Support/เหนือ Resistance</li>
                                        <li>• <strong>Percentage:</strong> 1-2% ของเงินทุน</li>
                                        <li>• <strong>ATR:</strong> ใช้ Average True Range</li>
                                        <li>• <strong>Fixed Pips:</strong> 20-50 pips (ขึ้นกับ Timeframe)</li>
                                      </ul>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-4 rounded">
                                      <h4 className="text-green-400 font-semibold mb-2">✅ ข้อดี:</h4>
                                      <ul className="text-slate-300 text-sm space-y-1">
                                        <li>• ป้องกันความสูญเสียใหญ่</li>
                                        <li>• ควบคุมอารมณ์</li>
                                        <li>• นอนหลับสบาย</li>
                                      </ul>
                                    </div>
                                    
                                    <div className="bg-red-600/20 p-3 rounded">
                                      <h4 className="text-red-400 font-semibold text-sm mb-2">⚠️ ข้อควรระวัง:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• อย่าตั้งแคบเกินไป (ถูกจับบ่อย)</li>
                                        <li>• อย่าเลื่อน SL ออกไป</li>
                                        <li>• ระวัง Slippage ในข่าวใหญ่</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>

                                {/* Take Profit */}
                                <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 p-6 rounded-lg border border-green-500/30">
                                  <div className="flex items-center mb-4">
                                    <div className="w-16 h-16 bg-green-600/30 rounded-xl flex items-center justify-center mr-4">
                                      <span className="text-2xl">🎯</span>
                                    </div>
                                    <div>
                                      <h3 className="text-green-400 font-bold text-lg">Take Profit (TP)</h3>
                                      <p className="text-slate-400 text-sm">ล็อคกำไร</p>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <div className="bg-slate-900/50 p-4 rounded">
                                      <h4 className="text-cyan-400 font-semibold mb-2">📖 คืออะไร:</h4>
                                      <p className="text-slate-300 text-sm leading-relaxed">
                                        คำสั่งที่ตั้งไว้เพื่อ<strong className="text-green-400">ปิดออเดอร์อัตโนมัติ</strong>เมื่อกำไรถึงเป้าหมาย 
                                        ล็อคกำไรไม่ให้หลุดมือ
                                      </p>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-4 rounded">
                                      <h4 className="text-green-400 font-semibold mb-2">🎯 วิธีตั้ง Take Profit:</h4>
                                      <ul className="text-slate-300 text-sm space-y-1">
                                        <li>• <strong>Technical:</strong> ที่ Resistance/Support</li>
                                        <li>• <strong>Risk:Reward:</strong> 1:2 หรือ 1:3</li>
                                        <li>• <strong>Fibonacci:</strong> ระดับ 61.8%, 78.6%</li>
                                        <li>• <strong>Round Number:</strong> 1.1000, 110.00</li>
                                      </ul>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-4 rounded">
                                      <h4 className="text-green-400 font-semibold mb-2">✅ ข้อดี:</h4>
                                      <ul className="text-slate-300 text-sm space-y-1">
                                        <li>• ล็อคกำไรแน่นอน</li>
                                        <li>• ไม่ต้องคอยดู</li>
                                        <li>• ป้องกันการ Reverse</li>
                                      </ul>
                                    </div>
                                    
                                    <div className="bg-green-600/20 p-3 rounded">
                                      <h4 className="text-green-400 font-semibold text-sm mb-2">💡 เคล็ดลับ:</h4>
                                      <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• ใช้ Partial TP (ปิดทีละส่วน)</li>
                                        <li>• เลื่อน SL เป็น Breakeven</li>
                                        <li>• TP ควรมากกว่า SL อย่างน้อย 1.5 เท่า</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* ตัวอย่างการตั้ง SL/TP */}
                              <div className="bg-slate-900/50 p-6 rounded-lg">
                                <h3 className="text-cyan-400 font-semibold mb-4">📊 ตัวอย่างการตั้ง Stop Loss & Take Profit:</h3>
                                
                                <div className="grid md:grid-cols-3 gap-6">
                                  <div className="space-y-3">
                                    <h4 className="text-blue-400 font-semibold">🎯 สถานการณ์:</h4>
                                    <div className="bg-slate-800/50 p-3 rounded text-sm">
                                      <ul className="text-slate-300 space-y-1">
                                        <li>• <strong>คู่เงิน:</strong> EUR/USD</li>
                                        <li>• <strong>Entry:</strong> 1.1050 (Buy)</li>
                                        <li>• <strong>Support:</strong> 1.1020</li>
                                        <li>• <strong>Resistance:</strong> 1.1100</li>
                                        <li>• <strong>Account:</strong> $1,000</li>
                                      </ul>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <h4 className="text-red-400 font-semibold">🛑 Stop Loss:</h4>
                                    <div className="bg-slate-800/50 p-3 rounded text-sm">
                                      <ul className="text-slate-300 space-y-1">
                                        <li>• <strong>SL Price:</strong> 1.1015</li>
                                        <li>• <strong>Distance:</strong> 35 pips</li>
                                        <li>• <strong>Risk:</strong> $20 (2%)</li>
                                        <li>• <strong>Lot Size:</strong> 0.06</li>
                                        <li><small className="text-cyan-400">SL ใต้ Support 5 pips</small></li>
                                      </ul>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <h4 className="text-green-400 font-semibold">🎯 Take Profit:</h4>
                                    <div className="bg-slate-800/50 p-3 rounded text-sm">
                                      <ul className="text-slate-300 space-y-1">
                                        <li>• <strong>TP Price:</strong> 1.1120</li>
                                        <li>• <strong>Distance:</strong> 70 pips</li>
                                        <li>• <strong>Profit:</strong> $42</li>
                                        <li>• <strong>RRR:</strong> 1:2.1</li>
                                        <li><small className="text-green-400">TP ที่ Resistance + buffer</small></li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Risk/Reward Ratio */}
                            <div className="bg-gradient-to-r from-purple-600/10 to-indigo-600/10 p-6 rounded-xl border border-purple-500/30 mb-8">
                              <h2 className="text-2xl font-bold text-purple-300 mb-6">⚖️ Risk/Reward Ratio (RRR)</h2>
                              
                              <div className="mb-6">
                                <p className="text-slate-300 leading-relaxed mb-4">
                                  <strong className="text-purple-400">Risk/Reward Ratio (RRR)</strong> คือ <strong className="text-cyan-400">อัตราส่วนระหว่างความเสี่ยงกับผลตอบแทน</strong> 
                                  เป็นตัวกำหนดว่าการเทรดของคุณคุ้มค่าหรือไม่
                                </p>
                                
                                <div className="bg-slate-900/50 p-4 rounded-lg mb-4">
                                  <h3 className="text-cyan-400 font-semibold mb-3">📐 สูตรคำนวณ RRR:</h3>
                                  <div className="bg-slate-800/50 p-4 rounded text-center">
                                    <p className="text-lg text-green-400 font-mono">
                                      RRR = <span className="text-cyan-400">Potential Profit</span> ÷ <span className="text-red-400">Potential Loss</span>
                                    </p>
                                    <p className="text-sm text-slate-400 mt-2">
                                      ตัวอย่าง: กำไร 60 pips ÷ ขาดทุน 30 pips = RRR 1:2
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="grid md:grid-cols-3 gap-6 mb-6">
                                {/* RRR Levels */}
                                <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 p-4 rounded-lg border border-red-500/30">
                                  <h4 className="text-red-400 font-bold mb-3">❌ RRR ไม่ดี</h4>
                                  <div className="space-y-3">
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <p className="text-center text-lg font-bold text-red-400">1:1 หรือ น้อยกว่า</p>
                                      <p className="text-xs text-slate-400 text-center">เสี่ยงเท่ากับกำไร</p>
                                    </div>
                                    <ul className="text-slate-300 text-xs space-y-1">
                                      <li>• ต้องถูก 60%+ ถึงจะกำไร</li>
                                      <li>• ไม่คุ้มค่าความเสี่ยง</li>
                                      <li>• แนะนำให้หลีกเลี่ยง</li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="bg-gradient-to-br from-amber-600/20 to-yellow-600/20 p-4 rounded-lg border border-amber-500/30">
                                  <h4 className="text-amber-400 font-bold mb-3">⚠️ RRR พอใช้</h4>
                                  <div className="space-y-3">
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <p className="text-center text-lg font-bold text-amber-400">1:1.5 - 1:2</p>
                                      <p className="text-xs text-slate-400 text-center">กำไรมากกว่าเสี่ยง</p>
                                    </div>
                                    <ul className="text-slate-300 text-xs space-y-1">
                                      <li>• ต้องถูก 50% ถึงจะกำไร</li>
                                      <li>• เริ่มคุ้มค่าแล้ว</li>
                                      <li>• เหมาะมือใหม่</li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 p-4 rounded-lg border border-green-500/30">
                                  <h4 className="text-green-400 font-bold mb-3">✅ RRR ดีเยี่ยม</h4>
                                  <div className="space-y-3">
                                    <div className="bg-slate-900/50 p-3 rounded">
                                      <p className="text-center text-lg font-bold text-green-400">1:3 หรือ มากกว่า</p>
                                      <p className="text-xs text-slate-400 text-center">กำไรเท่าตัวขึ้นไป</p>
                                    </div>
                                    <ul className="text-slate-300 text-xs space-y-1">
                                      <li>• ต้องถูก 33% ก็กำไรแล้ว</li>
                                      <li>• คุ้มค่ามาก</li>
                                      <li>• เป้าหมายของ Pro Trader</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              {/* ตัวอย่างการคำนวณ RRR */}
                              <div className="bg-slate-900/50 p-6 rounded-lg">
                                <h3 className="text-cyan-400 font-semibold mb-4">🧮 ตัวอย่างการคำนวณ RRR:</h3>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <h4 className="text-green-400 font-semibold">📈 Case Study: GBP/USD</h4>
                                    <div className="bg-slate-800/50 p-4 rounded text-sm">
                                      <ul className="text-slate-300 space-y-2">
                                        <li>• <strong>Entry:</strong> 1.2500 (Buy)</li>
                                        <li>• <strong>Stop Loss:</strong> 1.2450 (50 pips)</li>
                                        <li>• <strong>Take Profit:</strong> 1.2650 (150 pips)</li>
                                        <li>• <strong>Account:</strong> $2,000</li>
                                        <li>• <strong>Risk:</strong> 2% = $40</li>
                                      </ul>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <h4 className="text-purple-400 font-semibold">🔢 การคำนวณ:</h4>
                                    <div className="bg-slate-800/50 p-4 rounded text-sm">
                                      <div className="space-y-2 text-slate-300">
                                        <p><strong>Risk:</strong> 50 pips × $0.80 = <span className="text-red-400">$40</span></p>
                                        <p><strong>Reward:</strong> 150 pips × $0.80 = <span className="text-green-400">$120</span></p>
                                        <div className="border-t border-slate-600 my-2 pt-2">
                                          <p><strong>RRR:</strong> $120 ÷ $40 = <span className="text-cyan-400 text-lg font-bold">1:3</span></p>
                                          <p className="text-green-400 text-xs">✅ RRR ดีมาก!</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Win Rate vs RRR */}
                                <div className="mt-6 p-4 bg-purple-600/10 rounded-lg border border-purple-500/20">
                                  <h4 className="text-purple-400 font-semibold mb-3">📊 Win Rate ที่ต้องการตาม RRR:</h4>
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead>
                                        <tr className="border-b border-slate-600">
                                          <th className="text-left p-3 text-cyan-400">RRR</th>
                                          <th className="text-left p-3 text-green-400">Win Rate ที่ต้องการ</th>
                                          <th className="text-left p-3 text-amber-400">ผลตอบแทน/เดือน</th>
                                          <th className="text-left p-3 text-purple-400">ระดับความยาก</th>
                                        </tr>
                                      </thead>
                                      <tbody className="text-slate-300">
                                        <tr className="border-b border-slate-700">
                                          <td className="p-3 font-semibold">1:1</td>
                                          <td className="p-3">60%+</td>
                                          <td className="p-3 text-amber-400">5-10%</td>
                                          <td className="p-3 text-red-400">ยาก</td>
                                        </tr>
                                        <tr className="border-b border-slate-700">
                                          <td className="p-3 font-semibold">1:2</td>
                                          <td className="p-3">50%</td>
                                          <td className="p-3 text-green-400">10-20%</td>
                                          <td className="p-3 text-amber-400">ปานกลาง</td>
                                        </tr>
                                        <tr>
                                          <td className="p-3 font-semibold">1:3</td>
                                          <td className="p-3">33%</td>
                                          <td className="p-3 text-green-400">15-30%</td>
                                          <td className="p-3 text-green-400">ง่าย</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Position Sizing */}
                            <div className="bg-gradient-to-r from-blue-600/10 to-teal-600/10 p-6 rounded-xl border border-blue-500/30 mb-8">
                              <h2 className="text-2xl font-bold text-blue-300 mb-6">📏 Position Sizing - การคำนวณขนาดการเทรด</h2>
                              
                              <div className="mb-6">
                                <p className="text-slate-300 leading-relaxed mb-4">
                                  <strong className="text-blue-400">Position Sizing</strong> คือการคำนวณ <strong className="text-cyan-400">ขนาดเงินลงทุนที่เหมาะสม</strong> 
                                  ในแต่ละการเทรด ให้สอดคล้องกับความเสี่ยงที่ยอมรับได้
                                </p>
                              </div>

                              {/* สูตรการคำนวณ */}
                              <div className="bg-slate-900/50 p-6 rounded-lg mb-6">
                                <h3 className="text-cyan-400 font-semibold mb-4">🧮 สูตรหลักการคำนวณ Position Size:</h3>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div className="bg-slate-800/50 p-4 rounded">
                                    <h4 className="text-green-400 font-semibold mb-3">📐 สูตรแบบ Fixed Risk:</h4>
                                    <div className="text-center bg-green-600/10 p-4 rounded">
                                      <p className="text-green-400 font-mono text-lg mb-2">
                                        Lot Size = <span className="text-cyan-400">Risk Amount ($)</span> ÷ (<span className="text-red-400">SL Distance (Pips)</span> × <span className="text-amber-400">Pip Value</span>)
                                      </p>
                                    </div>
                                    <div className="mt-3 text-xs text-slate-400">
                                      <p><strong>ตัวอย่าง:</strong> Risk $20, SL 30 pips, Pip Value $1</p>
                                      <p>Lot Size = $20 ÷ (30 × $1) = <span className="text-green-400">0.67 Lots</span></p>
                                    </div>
                                  </div>
                                  
                                  <div className="bg-slate-800/50 p-4 rounded">
                                    <h4 className="text-blue-400 font-semibold mb-3">📊 สูตรแบบ Percentage Risk:</h4>
                                    <div className="text-center bg-blue-600/10 p-4 rounded">
                                      <p className="text-blue-400 font-mono text-lg mb-2">
                                        Risk Amount = <span className="text-cyan-400">Account Balance</span> × <span className="text-purple-400">Risk %</span>
                                      </p>
                                    </div>
                                    <div className="mt-3 text-xs text-slate-400">
                                      <p><strong>ตัวอย่าง:</strong> Account $1,000, Risk 2%</p>
                                      <p>Risk Amount = $1,000 × 2% = <span className="text-blue-400">$20</span></p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* ระดับ Risk ที่แนะนำ */}
                              <div className="grid md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 p-4 rounded-lg border border-green-500/30">
                                  <h4 className="text-green-400 font-bold mb-2">🟢 Conservative</h4>
                                  <div className="text-center">
                                    <p className="text-2xl font-bold text-green-400">0.5-1%</p>
                                    <p className="text-xs text-slate-400">เสี่ยงต่อเทรด</p>
                                  </div>
                                  <ul className="text-slate-300 text-xs mt-3 space-y-1">
                                    <li>• เหมาะมือใหม่</li>
                                    <li>• ปลอดภัย</li>
                                    <li>• กำไรช้า</li>
                                  </ul>
                                </div>

                                <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-4 rounded-lg border border-blue-500/30">
                                  <h4 className="text-blue-400 font-bold mb-2">🔵 Moderate</h4>
                                  <div className="text-center">
                                    <p className="text-2xl font-bold text-blue-400">1-2%</p>
                                    <p className="text-xs text-slate-400">เสี่ยงต่อเทรด</p>
                                  </div>
                                  <ul className="text-slate-300 text-xs mt-3 space-y-1">
                                    <li>• แนะนำทั่วไป</li>
                                    <li>• สมดุล</li>
                                    <li>• เหมาะมือกลาง</li>
                                  </ul>
                                </div>

                                <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 p-4 rounded-lg border border-amber-500/30">
                                  <h4 className="text-amber-400 font-bold mb-2">🟡 Aggressive</h4>
                                  <div className="text-center">
                                    <p className="text-2xl font-bold text-amber-400">2-5%</p>
                                    <p className="text-xs text-slate-400">เสี่ยงต่อเทรด</p>
                                  </div>
                                  <ul className="text-slate-300 text-xs mt-3 space-y-1">
                                    <li>• มีประสบการณ์</li>
                                    <li>• กำไรเร็ว</li>
                                    <li>• เสี่ยงสูง</li>
                                  </ul>
                                </div>

                                <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 p-4 rounded-lg border border-red-500/30">
                                  <h4 className="text-red-400 font-bold mb-2">🔴 Very High</h4>
                                  <div className="text-center">
                                    <p className="text-2xl font-bold text-red-400">5%+</p>
                                    <p className="text-xs text-slate-400">เสี่ยงต่อเทรด</p>
                                  </div>
                                  <ul className="text-slate-300 text-xs mt-3 space-y-1">
                                    <li>• ไม่แนะนำ</li>
                                    <li>• อันตราย</li>
                                    <li>• ล้มละลายเร็ว</li>
                                  </ul>
                                </div>
                              </div>

                              {/* ตัวอย่างการคำนวณ Position Size */}
                              <div className="bg-slate-900/50 p-6 rounded-lg">
                                <h3 className="text-cyan-400 font-semibold mb-4">📊 ตัวอย่างการคำนวณ Position Size:</h3>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <h4 className="text-green-400 font-semibold">🎯 สถานการณ์:</h4>
                                    <div className="bg-slate-800/50 p-4 rounded text-sm">
                                      <ul className="text-slate-300 space-y-2">
                                        <li>• <strong>Account Balance:</strong> $5,000</li>
                                        <li>• <strong>Risk Tolerance:</strong> 2%</li>
                                        <li>• <strong>Currency Pair:</strong> EUR/USD</li>
                                        <li>• <strong>Entry Price:</strong> 1.1000</li>
                                        <li>• <strong>Stop Loss:</strong> 1.0950 (50 pips)</li>
                                        <li>• <strong>Take Profit:</strong> 1.1100 (100 pips)</li>
                                      </ul>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <h4 className="text-blue-400 font-semibold">🧮 การคำนวณ:</h4>
                                    <div className="bg-slate-800/50 p-4 rounded text-sm">
                                      <div className="space-y-2 text-slate-300">
                                        <p><strong>Step 1:</strong> Risk Amount = $5,000 × 2% = <span className="text-green-400">$100</span></p>
                                        <p><strong>Step 2:</strong> SL Distance = <span className="text-red-400">50 pips</span></p>
                                        <p><strong>Step 3:</strong> Pip Value = <span className="text-amber-400">$10/pip</span> (สำหรับ 1 Standard Lot)</p>
                                        <div className="border-t border-slate-600 my-2 pt-2">
                                          <p><strong>Lot Size:</strong> $100 ÷ (50 × $10) = <span className="text-cyan-400 text-lg font-bold">0.20 Lots</span></p>
                                          <p><strong>Pip Value:</strong> 0.20 × $10 = <span className="text-blue-400">$2/pip</span></p>
                                        </div>
                                        <div className="bg-green-600/10 p-2 rounded">
                                          <p><strong>Max Risk:</strong> 50 pips × $2 = <span className="text-red-400">$100</span> ✅</p>
                                          <p><strong>Potential Profit:</strong> 100 pips × $2 = <span className="text-green-400">$200</span> 🎯</p>
                                          <p><strong>RRR:</strong> <span className="text-purple-400">1:2</span> 💪</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* การควบคุม Drawdown */}
                            <div className="bg-gradient-to-r from-orange-600/10 to-red-600/10 p-6 rounded-xl border border-orange-500/30 mb-8">
                              <h2 className="text-2xl font-bold text-orange-300 mb-6">📉 การควบคุม Drawdown</h2>
                              
                              <div className="mb-6">
                                <p className="text-slate-300 leading-relaxed mb-4">
                                  <strong className="text-orange-400">Drawdown</strong> คือ <strong className="text-red-400">การลดลงของมูลค่าพอร์ต</strong> จากจุดสูงสุด 
                                  เป็นสิ่งที่หลีกเลี่ยงไม่ได้ในการเทรด แต่ต้องควบคุมให้อยู่ในระดับที่รับได้
                                </p>
                                
                                <div className="bg-slate-900/50 p-4 rounded-lg mb-4">
                                  <h3 className="text-cyan-400 font-semibold mb-3">📐 สูตรคำนวณ Drawdown:</h3>
                                  <div className="bg-slate-800/50 p-4 rounded text-center">
                                    <p className="text-lg text-red-400 font-mono">
                                      Drawdown % = (<span className="text-green-400">Peak Value</span> - <span className="text-red-400">Current Value</span>) ÷ <span className="text-green-400">Peak Value</span> × 100
                                    </p>
                                    <p className="text-sm text-slate-400 mt-2">
                                      ตัวอย่าง: Peak $1,200, Current $1,000 → DD = 16.7%
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="grid md:grid-cols-3 gap-6 mb-6">
                                {/* Drawdown Levels */}
                                <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 p-4 rounded-lg border border-green-500/30">
                                  <h4 className="text-green-400 font-bold mb-3">🟢 Drawdown ปกติ</h4>
                                  <div className="text-center mb-3">
                                    <p className="text-2xl font-bold text-green-400">5-15%</p>
                                    <p className="text-xs text-slate-400">ของพอร์ต</p>
                                  </div>
                                  <ul className="text-slate-300 text-xs space-y-1">
                                    <li>• ปกติในการเทรด</li>
                                    <li>• กลับมาได้เร็ว</li>
                                    <li>• ไม่ต้องกังวล</li>
                                  </ul>
                                </div>

                                <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 p-4 rounded-lg border border-amber-500/30">
                                  <h4 className="text-amber-400 font-bold mb-3">🟡 Drawdown เตือน</h4>
                                  <div className="text-center mb-3">
                                    <p className="text-2xl font-bold text-amber-400">15-30%</p>
                                    <p className="text-xs text-slate-400">ของพอร์ต</p>
                                  </div>
                                  <ul className="text-slate-300 text-xs space-y-1">
                                    <li>• ต้องระวัง</li>
                                    <li>• ลดขนาดเทรด</li>
                                    <li>• ทบทวนกลยุทธ์</li>
                                  </ul>
                                </div>

                                <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 p-4 rounded-lg border border-red-500/30">
                                  <h4 className="text-red-400 font-bold mb-3">🔴 Drawdown อันตราย</h4>
                                  <div className="text-center mb-3">
                                    <p className="text-2xl font-bold text-red-400">30%+</p>
                                    <p className="text-xs text-slate-400">ของพอร์ต</p>
                                  </div>
                                  <ul className="text-slate-300 text-xs space-y-1">
                                    <li>• หยุดเทรด</li>
                                    <li>• ทบทวนระบบ</li>
                                    <li>• Recovery ยาก</li>
                                  </ul>
                                </div>
                              </div>

                              {/* วิธีจัดการ Drawdown */}
                              <div className="bg-slate-900/50 p-6 rounded-lg">
                                <h3 className="text-cyan-400 font-semibold mb-4">🛠️ วิธีจัดการ Drawdown:</h3>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <h4 className="text-green-400 font-semibold">✅ การป้องกัน:</h4>
                                    <div className="bg-green-600/10 p-4 rounded border border-green-500/20">
                                      <ul className="text-slate-300 text-sm space-y-2">
                                        <li>• <strong>Position Sizing:</strong> ไม่เสี่ยงเกิน 1-2% ต่อเทรด</li>
                                        <li>• <strong>Diversification:</strong> ไม่เทรดคู่เงินเดียว</li>
                                        <li>• <strong>Stop Loss:</strong> ต้องตั้งทุกเทรด</li>
                                        <li>• <strong>Daily/Weekly Loss Limit:</strong> หยุดเมื่อขาดทุนถึงลิมิต</li>
                                        <li>• <strong>Risk/Reward:</strong> ใช้ RRR 1:2 ขึ้นไป</li>
                                      </ul>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <h4 className="text-blue-400 font-semibold">🔄 Recovery Strategy:</h4>
                                    <div className="bg-blue-600/10 p-4 rounded border border-blue-500/20">
                                      <ul className="text-slate-300 text-sm space-y-2">
                                        <li>• <strong>ลดขนาดเทรด:</strong> เริ่มด้วย 0.5% แทน 2%</li>
                                        <li>• <strong>Focus Quality:</strong> เทรดแค่ Setup ที่แน่ใจ</li>
                                        <li>• <strong>เพิ่มทีละนิด:</strong> กลับมาช้าๆ อย่าเร่ง</li>
                                        <li>• <strong>Psychology:</strong> จัดการอารมณ์</li>
                                        <li>• <strong>Break Time:</strong> หยุดพักถ้าจำเป็น</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>

                                {/* ตาราง Recovery Time */}
                                <div className="mt-6 p-4 bg-red-600/10 rounded-lg border border-red-500/20">
                                  <h4 className="text-red-400 font-semibold mb-3">⏱️ เวลาในการ Recovery:</h4>
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead>
                                        <tr className="border-b border-slate-600">
                                          <th className="text-left p-3 text-cyan-400">Drawdown %</th>
                                          <th className="text-left p-3 text-green-400">กำไรที่ต้องการเพื่อ Recovery</th>
                                          <th className="text-left p-3 text-amber-400">เวลาโดยประมาณ</th>
                                          <th className="text-left p-3 text-purple-400">ระดับความยาก</th>
                                        </tr>
                                      </thead>
                                      <tbody className="text-slate-300">
                                        <tr className="border-b border-slate-700">
                                          <td className="p-3 font-semibold">-10%</td>
                                          <td className="p-3">+11.1%</td>
                                          <td className="p-3">1-2 เดือน</td>
                                          <td className="p-3 text-green-400">ง่าย</td>
                                        </tr>
                                        <tr className="border-b border-slate-700">
                                          <td className="p-3 font-semibold">-20%</td>
                                          <td className="p-3">+25%</td>
                                          <td className="p-3">2-4 เดือน</td>
                                          <td className="p-3 text-amber-400">ปานกลาง</td>
                                        </tr>
                                        <tr className="border-b border-slate-700">
                                          <td className="p-3 font-semibold">-30%</td>
                                          <td className="p-3">+43%</td>
                                          <td className="p-3">4-8 เดือน</td>
                                          <td className="p-3 text-red-400">ยาก</td>
                                        </tr>
                                        <tr>
                                          <td className="p-3 font-semibold">-50%</td>
                                          <td className="p-3">+100%</td>
                                          <td className="p-3">1+ ปี</td>
                                          <td className="p-3 text-red-400">ยากมาก</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* สรุปและคำแนะนำ */}
                            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 p-6 rounded-xl border border-green-500/30">
                              <h2 className="text-xl font-bold text-green-300 mb-4">💡 สรุปกฎทองการบริหารความเสี่ยง</h2>
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div className="bg-green-600/20 p-4 rounded-lg">
                                    <h3 className="text-green-400 font-semibold mb-2">✅ กฎทอง 10 ข้อ:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• <strong>1%:</strong> เสี่ยงไม่เกิน 1-2% ต่อเทรด</li>
                                      <li>• <strong>SL/TP:</strong> ตั้งทุกเทรด ไม่มีข้อยกเว้น</li>
                                      <li>• <strong>RRR 1:2+:</strong> กำไรต้องมากกว่าเสี่ยง</li>
                                      <li>• <strong>Position Size:</strong> คำนวณก่อนเข้าเทรด</li>
                                      <li>• <strong>Diversify:</strong> ไม่เทรดคู่เงินเดียว</li>
                                    </ul>
                                  </div>
                                  
                                  <div className="bg-blue-600/20 p-4 rounded-lg">
                                    <h3 className="text-blue-400 font-semibold mb-2">📊 เป้าหมายรายเดือน:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• <strong>Conservative:</strong> 3-5% กำไร/เดือน</li>
                                      <li>• <strong>Moderate:</strong> 5-10% กำไร/เดือน</li>
                                      <li>• <strong>Aggressive:</strong> 10-20% กำไร/เดือน</li>
                                      <li>• <strong>Max DD:</strong> ไม่เกิน 20% ต่อปี</li>
                                      <li>• <strong>Win Rate:</strong> 40-60% ก็เพียงพอ</li>
                                    </ul>
                                  </div>
                                </div>
                                
                                <div className="space-y-4">
                                  <div className="bg-red-600/20 p-4 rounded-lg">
                                    <h3 className="text-red-400 font-semibold mb-2">🚫 สิ่งที่ห้ามทำ:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• <strong>Revenge Trading:</strong> เทรดเพื่อคืนทุน</li>
                                      <li>• <strong>Over-leverage:</strong> เสี่ยงเกิน 5%</li>
                                      <li>• <strong>No Stop Loss:</strong> หวังการตลาดกลับ</li>
                                      <li>• <strong>FOMO:</strong> เข้าเทรดแบบไล่ราคา</li>
                                      <li>• <strong>เลื่อน SL:</strong> ออกจากจุดเดิม</li>
                                    </ul>
                                  </div>
                                  
                                  <div className="bg-amber-600/20 p-4 rounded-lg">
                                    <h3 className="text-amber-400 font-semibold mb-2">📚 ขั้นตอนต่อไป:</h3>
                                    <ul className="text-slate-300 space-y-1 text-sm">
                                      <li>• ฝึกคำนวณ Position Size</li>
                                      <li>• ทดสอบในดูโม่ 3-6 เดือน</li>
                                      <li>• บันทึก Trading Journal</li>
                                      <li>• วิเคราะห์ผลการเทรดประจำ</li>
                                      <li>• ปรับปรุงระบบอย่างต่อเนื่อง</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="p-8 border-t border-slate-800/50">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">📚 แหล่งข้อมูลเพิ่มเติม</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📊</span>
                </div>
                <CardTitle className="text-lg text-white">Economic Calendar</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-400 text-sm mb-4">
                  ติดตามข่าวเศรษฐกิจที่ส่งผลต่อตลาด Forex
                </p>
                <Button variant="outline" size="sm" className="border-slate-700 text-slate-400 hover:text-white">
                  เข้าดู
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-purple-500/20 hover:border-purple-400/30 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🔧</span>
                </div>
                <CardTitle className="text-lg text-white">Trading Tools</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-400 text-sm mb-4">
                  เครื่องมือคำนวณและวิเคราะห์ตลาด
                </p>
                <Button variant="outline" size="sm" className="border-slate-700 text-slate-400 hover:text-white">
                  เข้าดู
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-amber-500/20 hover:border-amber-400/30 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💬</span>
                </div>
                <CardTitle className="text-lg text-white">Community</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-400 text-sm mb-4">
                  เข้าร่วมชุมชนนักเทรดและแลกเปลี่ยนประสบการณ์
                </p>
                <Button variant="outline" size="sm" className="border-slate-700 text-slate-400 hover:text-white">
                  เข้าร่วม
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForexBasicsTab;