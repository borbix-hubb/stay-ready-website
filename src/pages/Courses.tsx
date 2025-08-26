import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Star, Clock, Users, PlayCircle, Search, Filter, Plus, ChevronDown, List } from "lucide-react";
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

interface Episode {
  id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  duration_minutes: number | null;
  episode_order: number;
  is_free: boolean;
}

const Courses = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [episodes, setEpisodes] = useState<{ [courseId: string]: Episode[] }>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  useEffect(() => {
    fetchCourses();
    fetchEpisodes();
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

  const fetchEpisodes = async () => {
    try {
      const { data, error } = await supabase
        .from('course_episodes')
        .select('*')
        .order('episode_order', { ascending: true });

      if (error) throw error;
      
      // Group episodes by course_id
      const episodesByCourse = (data || []).reduce((acc, episode) => {
        if (!acc[episode.course_id]) {
          acc[episode.course_id] = [];
        }
        acc[episode.course_id].push(episode);
        return acc;
      }, {} as { [courseId: string]: Episode[] });
      
      setEpisodes(episodesByCourse);
    } catch (error: any) {
      console.error('Error fetching episodes:', error);
    }
  };

  const getFirstEpisodeUrl = (courseId: string) => {
    const courseEpisodes = episodes[courseId];
    if (courseEpisodes && courseEpisodes.length > 0) {
      return courseEpisodes[0].video_url;
    }
    return null;
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-6">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                คอร์สเรียน{" "}
                <span className="gradient-text">ครบครัน</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                เรียนรู้จากผู้เชี่ยวชาญด้วยคอร์สที่ออกแบบมาเพื่อให้คุณเป็นมืออาชีพ
                ไม่ว่าจะเป็นมือใหม่หรือเทรดเดอร์ที่มีประสบการณ์
              </p>
            </div>

            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto">
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
        <section className="py-8">
          <div className="container mx-auto px-4">
            
            {filteredCourses.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">ไม่พบคอร์สที่ค้นหา</h3>
                <p className="text-muted-foreground">ลองเปลี่ยนคำค้นหาหรือตัวกรองใหม่</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredCourses.map((course, index) => (
                  <Card 
                    key={course.id} 
                    className="crypto-card hover:scale-105 transition-all duration-300 animate-slide-up group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="p-0">
                      <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center overflow-hidden relative">
                        {course.thumbnail_url ? (
                          <img 
                            src={course.thumbnail_url} 
                            alt={course.title}
                            className="w-full h-full object-cover rounded-t-lg"
                          />
                        ) : (
                          <div className="text-4xl">📚</div>
                        )}
                      </div>
                      <div className="p-6 pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <Badge 
                            variant={course.price_type === 'free' ? 'secondary' : 'default'}
                            className={course.price_type === 'free' ? 'bg-green-500/20 text-green-400' : 'bg-primary/20 text-primary'}
                          >
                            {course.price_type === 'free' ? 'ฟรี' : 'พรีเมี่ยม'}
                          </Badge>
                          {course.course_categories && (
                            <Badge 
                              variant="outline"
                              className={`
                                ${course.course_categories.name === 'พื้นฐาน' ? 'bg-green-500/20 text-green-400 border-green-500/50' : ''}
                                ${course.course_categories.name === 'เทรดดิ้ง' ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' : ''}
                                ${course.course_categories.name === 'ขั้นสูง' ? 'bg-purple-500/20 text-purple-400 border-purple-500/50' : ''}
                                ${!['พื้นฐาน', 'เทรดดิ้ง', 'ขั้นสูง'].includes(course.course_categories.name) ? 'bg-orange-500/20 text-orange-400 border-orange-500/50' : ''}
                              `}
                            >
                              {course.course_categories.name}
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {course.title}
                        </CardTitle>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 whitespace-pre-line">
                          {course.description || "คำอธิบายคอร์ส"}
                        </p>
                      </div>
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
                            <Badge 
                              key={tagIndex} 
                              variant="outline" 
                              className="text-xs bg-gray-500/10 text-gray-400 border-gray-500/30"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Episodes List */}
                      {episodes[course.id] && episodes[course.id].length > 0 && (
                        <Collapsible>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between p-2 h-auto">
                              <div className="flex items-center gap-2">
                                <List className="w-4 h-4" />
                                <span className="text-sm">บทเรียน ({episodes[course.id].length} ตอน)</span>
                              </div>
                              <ChevronDown className="w-4 h-4" />
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="space-y-2">
                            <div className="max-h-32 overflow-y-auto space-y-1">
                              {episodes[course.id].map((episode, episodeIndex) => (
                                <div 
                                  key={episode.id} 
                                  className="text-xs p-2 bg-muted/30 rounded cursor-pointer hover:bg-muted/50 transition-colors"
                                  onClick={() => episode.video_url && window.open(episode.video_url, '_blank')}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium">
                                      {episodeIndex + 1}. {episode.title}
                                    </span>
                                    {episode.is_free && (
                                      <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400">
                                        ฟรี
                                      </Badge>
                                    )}
                                  </div>
                                  {episode.description && (
                                    <p className="text-muted-foreground mt-1 line-clamp-2">
                                      {episode.description}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      )}

                      <div className="flex items-center justify-center pt-4 border-t border-primary/20">
                        <Button 
                          className="crypto-button group" 
                          size="default"
                          onClick={() => {
                            window.location.href = `/course/${course.id}`;
                          }}
                        >
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