import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Users, PlayCircle, BookOpen } from "lucide-react";
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

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>("");

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      
      // Fetch course details
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select(`
          *,
          course_categories(name)
        `)
        .eq('id', courseId)
        .single();

      if (courseError) throw courseError;
      setCourse(courseData);

      // Fetch episodes
      const { data: episodesData, error: episodesError } = await supabase
        .from('course_episodes')
        .select('*')
        .eq('course_id', courseId)
        .order('episode_order', { ascending: true });

      if (episodesError) throw episodesError;
      setEpisodes(episodesData || []);
      
      // Set first episode as current video
      if (episodesData && episodesData.length > 0) {
        setCurrentVideoUrl(episodesData[0].video_url || "");
      }

    } catch (error: any) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหลดข้อมูลคอร์สได้",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-32">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">ไม่พบคอร์สที่ต้องการ</h1>
            <Button onClick={() => navigate('/courses')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              กลับไปหน้าคอร์ส
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/courses')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            กลับไปหน้าคอร์ส
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Player & Course Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Player */}
              <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
                {currentVideoUrl ? (
                  <iframe
                    src={currentVideoUrl}
                    className="w-full h-full"
                    allowFullScreen
                    title="Course Video"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">ไม่มีวิดิโอสำหรับตอนนี้</p>
                      <p className="text-sm opacity-75 mt-2">เลือกตอนเรียนจากรายการด้านขวา</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Course Information */}
              <Card className="shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={course.price_type === 'free' ? 'secondary' : 'default'}
                        className={course.price_type === 'free' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                          : 'bg-primary/20 text-primary border-primary/30'
                        }
                      >
                        {course.price_type === 'free' ? 'ฟรี' : 'พรีเมี่ยม'}
                      </Badge>
                      {course.course_categories && (
                        <Badge variant="outline" className="text-xs">
                          {course.course_categories.name}
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent">
                        {formatPrice(course.price_type, course.price_amount)}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-3xl font-bold mb-3 text-foreground">
                    {course.title}
                  </CardTitle>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {course.description || "คำอธิบายคอร์ส"}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="font-medium">
                        {formatDuration(course.duration_hours, course.duration_minutes)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="font-medium">{course.instructor}</span>
                    </div>
                  </div>

                  {course.tags && course.tags.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-foreground">หัวข้อที่จะได้เรียนรู้:</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs hover:bg-primary/10">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t">
                    <Button 
                      className="w-full crypto-button h-12 text-lg font-semibold"
                      onClick={() => {
                        if (course.price_type === 'free') {
                          toast({
                            title: "เริ่มเรียนแล้ว!",
                            description: "คุณสามารถเรียนคอร์สนี้ฟรีได้เลย",
                          });
                        } else {
                          navigate('/payment', { state: { course } });
                        }
                      }}
                    >
                      {course.price_type === 'free' ? 'เริ่มเรียนฟรี' : 'ซื้อคอร์ส'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Episodes List */}
            <div className="lg:col-span-1">
              <Card className="shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BookOpen className="w-5 h-5" />
                    บทเรียนทั้งหมด ({episodes.length} ตอน)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-[600px] overflow-y-auto">
                    {episodes.length > 0 ? (
                      episodes.map((episode, index) => (
                        <div 
                          key={episode.id}
                          className={`group p-4 border-b border-border last:border-b-0 cursor-pointer transition-all duration-200 ${
                            currentVideoUrl === episode.video_url 
                              ? 'bg-primary/10 border-l-4 border-l-primary' 
                              : 'hover:bg-muted/50'
                          }`}
                          onClick={() => {
                            if (episode.video_url) {
                              setCurrentVideoUrl(episode.video_url);
                              toast({
                                title: "เปลี่ยนวิดิโอแล้ว",
                                description: `กำลังเล่น: ${episode.title}`,
                              });
                            }
                          }}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-xs font-bold px-2 py-1 rounded ${
                                  currentVideoUrl === episode.video_url 
                                    ? 'bg-primary text-primary-foreground' 
                                    : 'bg-muted text-muted-foreground'
                                }`}>
                                  {index + 1}
                                </span>
                                {episode.is_free && (
                                  <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400">
                                    ฟรี
                                  </Badge>
                                )}
                              </div>
                              <h4 className={`font-medium text-sm leading-tight ${
                                currentVideoUrl === episode.video_url ? 'text-primary' : 'text-foreground'
                              }`}>
                                {episode.title}
                              </h4>
                            </div>
                            {episode.video_url && (
                              <PlayCircle className={`w-4 h-4 flex-shrink-0 ml-2 ${
                                currentVideoUrl === episode.video_url 
                                  ? 'text-primary' 
                                  : 'text-muted-foreground group-hover:text-primary'
                              }`} />
                            )}
                          </div>
                          
                          {episode.description && (
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                              {episode.description}
                            </p>
                          )}
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            {episode.duration_minutes && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {episode.duration_minutes} นาที
                              </span>
                            )}
                            {!episode.video_url && (
                              <span className="text-xs text-muted-foreground/60">
                                ไม่มีวิดิโอ
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-muted-foreground">
                        <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="text-sm">ยังไม่มีบทเรียนในคอร์สนี้</p>
                      </div>
                    )}
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

export default CourseDetail;