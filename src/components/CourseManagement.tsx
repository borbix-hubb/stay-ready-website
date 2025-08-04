import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, BookOpen, Video, Tag } from "lucide-react";

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

interface Category {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

interface Episode {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  duration_minutes: number | null;
  episode_order: number;
  is_free: boolean;
  created_at: string;
  courses?: {
    title: string;
  };
}

const CourseManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  // Form states
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    thumbnail_url: "",
    instructor: "",
    price_type: "free",
    price_amount: 0,
    tags: "",
    category_id: "",
    duration_hours: 0,
    duration_minutes: 0
  });

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: ""
  });

  const [episodeForm, setEpisodeForm] = useState({
    course_id: "",
    title: "",
    description: "",
    video_url: "",
    duration_minutes: 0,
    episode_order: 1,
    is_free: false
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchCourses(),
        fetchCategories(),
        fetchEpisodes()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        course_categories(name)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    setCourses(data || []);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('course_categories')
      .select('*')
      .order('name');

    if (error) throw error;
    setCategories(data || []);
  };

  const fetchEpisodes = async () => {
    const { data, error } = await supabase
      .from('course_episodes')
      .select(`
        *,
        courses(title)
      `)
      .order('episode_order');

    if (error) throw error;
    setEpisodes(data || []);
  };

  const createCourse = async () => {
    try {
      const { error } = await supabase
        .from('courses')
        .insert({
          ...courseForm,
          tags: courseForm.tags ? courseForm.tags.split(',').map(tag => tag.trim()) : null,
          price_amount: courseForm.price_type === 'free' ? 0 : courseForm.price_amount
        });

      if (error) throw error;

      toast({
        title: "สร้างคอร์สสำเร็จ",
        description: "คอร์สใหม่ถูกเพิ่มแล้ว",
      });

      setCourseForm({
        title: "",
        description: "",
        thumbnail_url: "",
        instructor: "",
        price_type: "free",
        price_amount: 0,
        tags: "",
        category_id: "",
        duration_hours: 0,
        duration_minutes: 0
      });

      fetchCourses();
    } catch (error: any) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const createCategory = async () => {
    try {
      const { error } = await supabase
        .from('course_categories')
        .insert(categoryForm);

      if (error) throw error;

      toast({
        title: "สร้างหมวดหมู่สำเร็จ",
        description: "หมวดหมู่ใหม่ถูกเพิ่มแล้ว",
      });

      setCategoryForm({ name: "", description: "" });
      fetchCategories();
    } catch (error: any) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const createEpisode = async () => {
    try {
      const { error } = await supabase
        .from('course_episodes')
        .insert(episodeForm);

      if (error) throw error;

      toast({
        title: "สร้างตอนใหม่สำเร็จ",
        description: "ตอนใหม่ถูกเพิ่มแล้ว",
      });

      setEpisodeForm({
        course_id: "",
        title: "",
        description: "",
        video_url: "",
        duration_minutes: 0,
        episode_order: 1,
        is_free: false
      });

      fetchEpisodes();
    } catch (error: any) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-crypto-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            จัดการคอร์ส
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            หมวดหมู่
          </TabsTrigger>
          <TabsTrigger value="episodes" className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            ตอนเรียน
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                จัดการคอร์ส
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="crypto-button">
                      <Plus className="w-4 h-4 mr-2" />
                      เพิ่มคอร์ส
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>สร้างคอร์สใหม่</DialogTitle>
                      <DialogDescription>
                        กรอกข้อมูลคอร์สที่ต้องการสร้าง
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>ชื่อคอร์ส</Label>
                        <Input
                          value={courseForm.title}
                          onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                          placeholder="เช่น Bitcoin Trading 101"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>ผู้สอน</Label>
                        <Input
                          value={courseForm.instructor}
                          onChange={(e) => setCourseForm({...courseForm, instructor: e.target.value})}
                          placeholder="ชื่อผู้สอน"
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label>รายละเอียด</Label>
                        <Textarea
                          value={courseForm.description}
                          onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                          placeholder="รายละเอียดคอร์ส"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Thumbnail URL</Label>
                        <Input
                          value={courseForm.thumbnail_url}
                          onChange={(e) => setCourseForm({...courseForm, thumbnail_url: e.target.value})}
                          placeholder="https://..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>หมวดหมู่</Label>
                        <Select
                          value={courseForm.category_id}
                          onValueChange={(value) => setCourseForm({...courseForm, category_id: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกหมวดหมู่" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(cat => (
                              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>ประเภทราคา</Label>
                        <Select
                          value={courseForm.price_type}
                          onValueChange={(value) => setCourseForm({...courseForm, price_type: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="free">ฟรี</SelectItem>
                            <SelectItem value="premium">พรีเมี่ยม</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {courseForm.price_type === 'premium' && (
                        <div className="space-y-2">
                          <Label>ราคา (บาท)</Label>
                          <Input
                            type="number"
                            value={courseForm.price_amount}
                            onChange={(e) => setCourseForm({...courseForm, price_amount: Number(e.target.value)})}
                          />
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label>แท็ค (คั่นด้วยจุลภาค)</Label>
                        <Input
                          value={courseForm.tags}
                          onChange={(e) => setCourseForm({...courseForm, tags: e.target.value})}
                          placeholder="Trading, Technical Analysis, Bitcoin"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>เวลา (ชั่วโมง)</Label>
                        <Input
                          type="number"
                          value={courseForm.duration_hours}
                          onChange={(e) => setCourseForm({...courseForm, duration_hours: Number(e.target.value)})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>เวลา (นาที)</Label>
                        <Input
                          type="number"
                          value={courseForm.duration_minutes}
                          onChange={(e) => setCourseForm({...courseForm, duration_minutes: Number(e.target.value)})}
                        />
                      </div>
                    </div>
                    <Button onClick={createCourse} className="crypto-button w-full">
                      สร้างคอร์ส
                    </Button>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">ผู้สอน: {course.instructor}</p>
                        <p className="text-sm">{course.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant={course.price_type === 'free' ? 'outline' : 'secondary'}>
                            {course.price_type === 'free' ? 'ฟรี' : `${course.price_amount}฿`}
                          </Badge>
                          {course.course_categories && (
                            <Badge variant="outline">{course.course_categories.name}</Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {course.duration_hours}ชม {course.duration_minutes}นาที
                          </span>
                        </div>
                        {course.tags && (
                          <div className="flex gap-1 flex-wrap">
                            {course.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                จัดการหมวดหมู่
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="crypto-button">
                      <Plus className="w-4 h-4 mr-2" />
                      เพิ่มหมวดหมู่
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>สร้างหมวดหมู่ใหม่</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>ชื่อหมวดหมู่</Label>
                        <Input
                          value={categoryForm.name}
                          onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                          placeholder="เช่น การเทรดพื้นฐาน"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>รายละเอียด</Label>
                        <Textarea
                          value={categoryForm.description}
                          onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                          placeholder="รายละเอียดหมวดหมู่"
                        />
                      </div>
                    </div>
                    <Button onClick={createCategory} className="crypto-button w-full">
                      สร้างหมวดหมู่
                    </Button>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id} className="border rounded-lg p-4">
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="episodes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                จัดการตอนเรียน
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="crypto-button">
                      <Plus className="w-4 h-4 mr-2" />
                      เพิ่มตอน
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>สร้างตอนใหม่</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 space-y-2">
                        <Label>คอร์ส</Label>
                        <Select
                          value={episodeForm.course_id}
                          onValueChange={(value) => setEpisodeForm({...episodeForm, course_id: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกคอร์ส" />
                          </SelectTrigger>
                          <SelectContent>
                            {courses.map(course => (
                              <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>ชื่อตอน</Label>
                        <Input
                          value={episodeForm.title}
                          onChange={(e) => setEpisodeForm({...episodeForm, title: e.target.value})}
                          placeholder="ตอนที่ 1: บทนำ"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>ลำดับตอน</Label>
                        <Input
                          type="number"
                          value={episodeForm.episode_order}
                          onChange={(e) => setEpisodeForm({...episodeForm, episode_order: Number(e.target.value)})}
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label>รายละเอียด</Label>
                        <Textarea
                          value={episodeForm.description}
                          onChange={(e) => setEpisodeForm({...episodeForm, description: e.target.value})}
                          placeholder="รายละเอียดตอน"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Video URL</Label>
                        <Input
                          value={episodeForm.video_url}
                          onChange={(e) => setEpisodeForm({...episodeForm, video_url: e.target.value})}
                          placeholder="https://..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>ระยะเวลา (นาที)</Label>
                        <Input
                          type="number"
                          value={episodeForm.duration_minutes}
                          onChange={(e) => setEpisodeForm({...episodeForm, duration_minutes: Number(e.target.value)})}
                        />
                      </div>
                      <div className="col-span-2 flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="is_free"
                          checked={episodeForm.is_free}
                          onChange={(e) => setEpisodeForm({...episodeForm, is_free: e.target.checked})}
                        />
                        <Label htmlFor="is_free">ดูฟรีได้</Label>
                      </div>
                    </div>
                    <Button onClick={createEpisode} className="crypto-button w-full">
                      สร้างตอน
                    </Button>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {episodes.map((episode) => (
                  <div key={episode.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">
                          ตอนที่ {episode.episode_order}: {episode.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          คอร์ส: {episode.courses?.title}
                        </p>
                        <p className="text-sm">{episode.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant={episode.is_free ? 'outline' : 'secondary'}>
                            {episode.is_free ? 'ฟรี' : 'พรีเมี่ยม'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {episode.duration_minutes} นาที
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseManagement;