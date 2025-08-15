import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-start bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-cyan-500/30 hover:border-cyan-400/50 text-cyan-400 hover:text-cyan-300">
                        <BookOpen className="w-4 h-4 mr-2" />
                        เริ่มเรียน - พื้นฐาน Forex ครบครัน 11 บทเรียน
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-7xl max-h-[95vh] p-0 bg-slate-950 border-slate-800">
                      <div className="h-full overflow-hidden">
                        <ForexBasicsCourse />
                      </div>
                    </DialogContent>
                  </Dialog>
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