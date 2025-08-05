import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, Trash2, Eye, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import Header from "@/components/Header";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface PatternChart {
  id: string;
  title: string;
  description: string;
  pattern_type: string;
  timeframe: string;
  image_url: string;
  created_at: string;
  user_id: string;
  profit_loss?: number;
  success_rate?: number;
}

const patternTypes = [
  { value: "bullish", label: "แพทเทิร์นขาขึ้น", icon: TrendingUp, color: "text-green-500" },
  { value: "bearish", label: "แพทเทิร์นขาลง", icon: TrendingDown, color: "text-red-500" },
  { value: "neutral", label: "แพทเทิร์นไซด์เวย์", icon: BarChart3, color: "text-blue-500" },
];

const timeframes = [
  { value: "1m", label: "1 นาที" },
  { value: "5m", label: "5 นาที" },
  { value: "15m", label: "15 นาที" },
  { value: "30m", label: "30 นาที" },
  { value: "1h", label: "1 ชั่วโมง" },
  { value: "4h", label: "4 ชั่วโมง" },
  { value: "1d", label: "1 วัน" },
  { value: "1w", label: "1 สัปดาห์" },
];

const PatternChart = () => {
  const { user } = useAuth();
  const [patterns, setPatterns] = useState<PatternChart[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [patternType, setPatternType] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [profitLoss, setProfitLoss] = useState("");
  const [successRate, setSuccessRate] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    if (user) {
      fetchPatterns();
    }
  }, [user]);

  const fetchPatterns = async () => {
    try {
      const { data, error } = await supabase
        .from('pattern_charts')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPatterns((data as PatternChart[]) || []);
    } catch (error) {
      console.error('Error fetching patterns:', error);
      toast.error("เกิดข้อผิดพลาดในการโหลดแพทเทิร์น");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("ไฟล์รูปภาพต้องมีขนาดไม่เกิน 5MB");
        return;
      }
      
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${user?.id}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('pattern-charts')
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('pattern-charts')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !title.trim() || !patternType || !timeframe) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setUploading(true);
    
    try {
      const imageUrl = await uploadImage(selectedFile);
      
      const { error } = await supabase
        .from('pattern_charts')
        .insert({
          title: title.trim(),
          description: description.trim(),
          pattern_type: patternType,
          timeframe: timeframe,
          image_url: imageUrl,
          user_id: user?.id,
          profit_loss: profitLoss ? parseFloat(profitLoss) : null,
          success_rate: successRate ? parseFloat(successRate) : null
        } as any);

      if (error) throw error;

      toast.success("เพิ่มแพทเทิร์นสำเร็จ!");
      resetForm();
      fetchPatterns();
    } catch (error) {
      console.error('Error uploading pattern:', error);
      toast.error("เกิดข้อผิดพลาดในการเพิ่มแพทเทิร์น");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPatternType("");
    setTimeframe("");
    setProfitLoss("");
    setSuccessRate("");
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const deletePattern = async (id: string, imageUrl: string) => {
    try {
      const { error } = await supabase
        .from('pattern_charts')
        .delete()
        .eq('id', id) as any;

      if (error) throw error;

      // Delete image from storage
      const fileName = imageUrl.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('pattern-charts')
          .remove([`${user?.id}/${fileName}`]);
      }

      toast.success("ลบแพทเทิร์นสำเร็จ!");
      fetchPatterns();
    } catch (error) {
      console.error('Error deleting pattern:', error);
      toast.error("เกิดข้อผิดพลาดในการลบแพทเทิร์น");
    }
  };

  const filteredPatterns = filterType === "all" 
    ? patterns 
    : patterns.filter(pattern => pattern.pattern_type === filterType);

  const getPatternTypeConfig = (type: string) => {
    return patternTypes.find(pt => pt.value === type) || patternTypes[2];
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">กรุณาเข้าสู่ระบบ</h1>
            <p className="text-muted-foreground">เข้าสู่ระบบเพื่อจัดการแพทเทิร์นชาร์ตของคุณ</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Pattern Chart
            </h1>
            <p className="text-xl text-muted-foreground">
              บันทึกและจัดการแพทเทิร์นการเทรดของคุณ
            </p>
          </div>

          {/* Upload Form */}
          <Card className="mb-8 border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                เพิ่มแพทเทิร์นใหม่
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">ชื่อแพทเทิร์น *</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="เช่น Double Bottom, Head and Shoulders..."
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">รายละเอียด</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="อธิบายแพทเทิร์นและการใช้งาน..."
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pattern-type">ประเภทแพทเทิร์น *</Label>
                        <Select value={patternType} onValueChange={setPatternType}>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกประเภท" />
                          </SelectTrigger>
                          <SelectContent>
                            {patternTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center gap-2">
                                  <type.icon className={`w-4 h-4 ${type.color}`} />
                                  {type.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="timeframe">ไทม์เฟรม *</Label>
                        <Select value={timeframe} onValueChange={setTimeframe}>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกไทม์เฟรม" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeframes.map((tf) => (
                              <SelectItem key={tf.value} value={tf.value}>
                                {tf.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="profit-loss">กำไร/ขาดทุน (%)</Label>
                        <Input
                          id="profit-loss"
                          type="number"
                          step="0.01"
                          value={profitLoss}
                          onChange={(e) => setProfitLoss(e.target.value)}
                          placeholder="เช่น 2.5, -1.2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="success-rate">อัตราความสำเร็จ (%)</Label>
                        <Input
                          id="success-rate"
                          type="number"
                          step="0.01"
                          min="0"
                          max="100"
                          value={successRate}
                          onChange={(e) => setSuccessRate(e.target.value)}
                          placeholder="เช่น 75.5"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="image">รูปภาพชาร์ต *</Label>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        required
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        รองรับไฟล์ JPG, PNG, WebP ขนาดไม่เกิน 5MB
                      </p>
                    </div>

                    {previewUrl && (
                      <div className="border rounded-lg overflow-hidden">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-60 object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={uploading || !selectedFile || !title.trim() || !patternType || !timeframe}
                  className="w-full md:w-auto"
                >
                  {uploading ? "กำลังอัปโหลด..." : "เพิ่มแพทเทิร์น"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              onClick={() => setFilterType("all")}
              size="sm"
            >
              ทั้งหมด
            </Button>
            {patternTypes.map((type) => (
              <Button
                key={type.value}
                variant={filterType === type.value ? "default" : "outline"}
                onClick={() => setFilterType(type.value)}
                size="sm"
                className="flex items-center gap-2"
              >
                <type.icon className={`w-4 h-4 ${filterType === type.value ? 'text-white' : type.color}`} />
                {type.label}
              </Button>
            ))}
          </div>

          {/* Patterns Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-video bg-muted rounded-t-lg"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredPatterns.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {filterType === "all" ? "ยังไม่มีแพทเทิร์น" : "ไม่พบแพทเทิร์นประเภทนี้"}
              </h3>
              <p className="text-muted-foreground">
                {filterType === "all" ? "เพิ่มแพทเทิร์นแรกของคุณได้เลย!" : "ลองเปลี่ยนตัวกรองหรือเพิ่มแพทเทิร์นใหม่"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatterns.map((pattern) => {
                const config = getPatternTypeConfig(pattern.pattern_type);
                return (
                  <Card key={pattern.id} className="group border-border/50 bg-card/50 backdrop-blur overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={pattern.image_url}
                        alt={pattern.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <img
                                src={pattern.image_url}
                                alt={pattern.title}
                                className="w-full h-auto rounded-lg"
                              />
                            </DialogContent>
                          </Dialog>
                          
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deletePattern(pattern.id, pattern.image_url)}
                            className="bg-red-500/90 hover:bg-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="absolute top-2 left-2 flex gap-2">
                        <Badge className={`${config.color} bg-background/90`}>
                          <config.icon className="w-3 h-3 mr-1" />
                          {config.label}
                        </Badge>
                        <Badge variant="secondary" className="bg-background/90">
                          {timeframes.find(tf => tf.value === pattern.timeframe)?.label}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-1">{pattern.title}</h3>
                      {pattern.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {pattern.description}
                        </p>
                      )}
                      
                      <div className="flex gap-4 text-xs text-muted-foreground mb-2">
                        {pattern.profit_loss !== null && (
                          <span className={pattern.profit_loss >= 0 ? "text-green-500" : "text-red-500"}>
                            P/L: {pattern.profit_loss > 0 ? '+' : ''}{pattern.profit_loss}%
                          </span>
                        )}
                        {pattern.success_rate !== null && (
                          <span>Success: {pattern.success_rate}%</span>
                        )}
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        {new Date(pattern.created_at).toLocaleDateString('th-TH')}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatternChart;