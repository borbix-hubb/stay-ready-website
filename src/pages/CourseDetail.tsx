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
            {/* Video Player */}
            <div className="lg:col-span-2">
              <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6">
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
                      <p>ไม่มีวิดิโอสำหรับตอนนี้</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Course Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
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
                  <CardTitle className="text-2xl mb-4">{course.title}</CardTitle>
                  <p className="text-muted-foreground leading-relaxed">
                    {course.description || "คำอธิบายคอร์ส"}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
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
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Episodes List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    บทเรียน ({episodes.length} ตอน)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-96 overflow-y-auto">
                    {episodes.map((episode, index) => (
                      <div 
                        key={episode.id}
                        className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                          currentVideoUrl === episode.video_url ? 'bg-primary/10 border-l-4 border-l-primary' : ''
                        }`}
                        onClick={() => episode.video_url && setCurrentVideoUrl(episode.video_url)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">
                            {index + 1}. {episode.title}
                          </span>
                          {episode.is_free && (
                            <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400">
                              ฟรี
                            </Badge>
                          )}
                        </div>
                        {episode.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {episode.description}
                          </p>
                        )}
                        {episode.duration_minutes && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {episode.duration_minutes} นาที
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Course Price */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-4">
                      {formatPrice(course.price_type, course.price_amount)}
                    </div>
                    <Button className="w-full crypto-button">
                      {course.price_type === 'free' ? 'เริ่มเรียนฟรี' : 'ซื้อคอร์ส'}
                    </Button>
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