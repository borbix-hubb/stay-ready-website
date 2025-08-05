import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Clock, Users, PlayCircle, Search, Filter, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Course {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  instructor: string;
  price_type: string;
  price_amount: number | null;
  tags: string[] | null;
  category_id: string | null;
  duration_hours: number | null;
  duration_minutes: number | null;
  created_at: string;
  course_categories?: {
    name: string;
  };
}

const Courses = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [courses, searchTerm, selectedCategory, priceFilter]);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          course_categories(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error: any) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหลดคอร์สได้",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = courses;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(course =>
        course.course_categories?.name === selectedCategory
      );
    }

    // Price filter
    if (priceFilter !== "all") {
      if (priceFilter === "free") {
        filtered = filtered.filter(course => course.price_type === "free");
      } else if (priceFilter === "premium") {
        filtered = filtered.filter(course => course.price_type === "premium");
      }
    }

    setFilteredCourses(filtered);
  };

  const formatDuration = (hours: number | null, minutes: number | null) => {
    const totalMinutes = (hours || 0) * 60 + (minutes || 0);
    if (totalMinutes < 60) {
      return `${totalMinutes} นาที`;
    }
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return m > 0 ? `${h} ชม. ${m} นาที` : `${h} ชั่วโมง`;
  };

  const formatPrice = (priceType: string, priceAmount: number | null) => {
    if (priceType === "free") return "ฟรี";
    return `฿${priceAmount?.toLocaleString() || 0}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center pt-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="หมวดหมู่" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทุกหมวดหมู่</SelectItem>
                    <SelectItem value="พื้นฐาน">พื้นฐาน</SelectItem>
                    <SelectItem value="เทรดดิ้ง">เทรดดิ้ง</SelectItem>
                    <SelectItem value="ขั้นสูง">ขั้นสูง</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="ประเภทราคา" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทุกประเภท</SelectItem>
                    <SelectItem value="free">ฟรี</SelectItem>
                    <SelectItem value="premium">พรีเมี่ยม</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold mb-2">ไม่พบคอร์สที่ค้นหา</h3>
                <p className="text-muted-foreground">ลองเปลี่ยนคำค้นหาหรือตัวกรองใหม่</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredCourses.map((course, index) => (
                  <Card 
                    key={course.id} 
                    className="crypto-card hover:scale-105 transition-all duration-300 animate-slide-up group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-4">
                          {course.thumbnail_url ? (
                            <img 
                              src={course.thumbnail_url} 
                              alt={course.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <div className="text-4xl">📚</div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge 
                          variant={course.price_type === 'free' ? 'secondary' : 'default'}
                          className={course.price_type === 'free' ? 'bg-green-500/20 text-green-400' : 'bg-primary/20 text-primary'}
                        >
                          {course.price_type === 'free' ? 'ฟรี' : 'พรีเมี่ยม'}
                        </Badge>
                        {course.course_categories && (
                          <Badge variant="outline">
                            {course.course_categories.name}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {course.title}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {course.description || "คำอธิบายคอร์ส"}
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatDuration(course.duration_hours, course.duration_minutes)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {course.instructor}
                        </div>
                      </div>

                      {course.tags && course.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {course.tags.slice(0, 2).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-primary/20">
                        <div className="text-xl font-bold text-accent">
                          {formatPrice(course.price_type, course.price_amount)}
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
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;