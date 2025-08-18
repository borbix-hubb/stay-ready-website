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
import { Plus, Edit, Trash2, BookOpen, Video, Tag, FileText } from "lucide-react";

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

interface CourseDocument {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  file_url: string | null;
  file_type: string | null;
  file_size: number | null;
  document_order: number;
  is_downloadable: boolean;
  created_at: string;
  updated_at: string;
  courses?: {
    title: string;
  } | null;
}

const CourseManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [documents, setDocuments] = useState<CourseDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<string>("all");

  // Form states
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    thumbnail_url: "",
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

  const [documentForm, setDocumentForm] = useState({
    course_id: "",
    title: "",
    description: "",
    file_url: "",
    file_type: "",
    file_size: 0,
    document_order: 1,
    is_downloadable: true
  });

  const [uploading, setUploading] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 50, y: 50 });
  const [imageZoom, setImageZoom] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingEpisode, setEditingEpisode] = useState<Episode | null>(null);
  const [editingDocument, setEditingDocument] = useState<CourseDocument | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchCourses(),
        fetchCategories(),
        fetchEpisodes(),
        fetchDocuments()
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

  const fetchDocuments = async () => {
    const { data, error } = await supabase
      .from('course_documents')
      .select(`
        *,
        courses(title)
      `)
      .order('document_order');

    if (error) throw error;
    setDocuments((data as any) || []);
  };

  const createCourse = async () => {
    try {
      const { error } = await supabase
        .from('courses')
        .insert({
          title: courseForm.title,
          description: courseForm.description,
          thumbnail_url: courseForm.thumbnail_url,
          instructor: "ผู้สอน", // Default instructor
          price_type: courseForm.price_type,
          price_amount: courseForm.price_type === 'free' ? 0 : courseForm.price_amount,
          tags: courseForm.tags ? courseForm.tags.split(',').map(tag => tag.trim()) : null,
          category_id: courseForm.category_id || null,
          duration_hours: courseForm.duration_hours,
          duration_minutes: courseForm.duration_minutes
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
        price_type: "free",
        price_amount: 0,
        tags: "",
        category_id: "",
        duration_hours: 0,
        duration_minutes: 0
      });
      setImagePosition({ x: 50, y: 50 });

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

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `course-thumbnails/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('course-thumbnails')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('course-thumbnails')
        .getPublicUrl(filePath);

      setCourseForm({ ...courseForm, thumbnail_url: data.publicUrl });

      toast({
        title: "อัปโหลดสำเร็จ",
        description: "ภาพถูกอัปโหลดแล้ว",
      });
    } catch (error: any) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
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

  const deleteCourse = async (courseId: string) => {
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId);

      if (error) throw error;

      toast({
        title: "ลบคอร์สสำเร็จ",
        description: "คอร์สถูกลบแล้ว",
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

  const deleteCategory = async (categoryId: string) => {
    try {
      // First check if there are courses using this category
      const { data: courses, error: checkError } = await supabase
        .from('courses')
        .select('id')
        .eq('category_id', categoryId);

      if (checkError) throw checkError;

      // If there are courses, update them to remove the category reference
      if (courses && courses.length > 0) {
        const { error: updateError } = await supabase
          .from('courses')
          .update({ category_id: null })
          .eq('category_id', categoryId);

        if (updateError) throw updateError;
      }

      // Now delete the category
      const { error } = await supabase
        .from('course_categories')
        .delete()
        .eq('id', categoryId);

      if (error) throw error;

      toast({
        title: "ลบหมวดหมู่สำเร็จ",
        description: courses && courses.length > 0 
          ? `หมวดหมู่ถูกลบแล้ว และคอร์ส ${courses.length} คอร์สถูกอัปเดต`
          : "หมวดหมู่ถูกลบแล้ว",
      });

      fetchCategories();
      fetchCourses(); // Refresh courses list as well
    } catch (error: any) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteEpisode = async (episodeId: string) => {
    try {
      const { error } = await supabase
        .from('course_episodes')
        .delete()
        .eq('id', episodeId);

      if (error) throw error;

      toast({
        title: "ลบตอนเรียนสำเร็จ",
        description: "ตอนเรียนถูกลบแล้ว",
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

  const createDocument = async () => {
    try {
      const { error } = await supabase
        .from('course_documents')
        .insert(documentForm);

      if (error) throw error;

      toast({
        title: "สร้างเอกสารสำเร็จ",
        description: "เอกสารใหม่ถูกเพิ่มแล้ว",
      });

      setDocumentForm({
        course_id: "",
        title: "",
        description: "",
        file_url: "",
        file_type: "",
        file_size: 0,
        document_order: 1,
        is_downloadable: true
      });

      fetchDocuments();
    } catch (error: any) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteDocument = async (documentId: string) => {
    try {
      const { error } = await supabase
        .from('course_documents')
        .delete()
        .eq('id', documentId);

      if (error) throw error;

      toast({
        title: "ลบเอกสารสำเร็จ",
        description: "เอกสารถูกลบแล้ว",
      });

      fetchDocuments();
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
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
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            เอกสารเรียน
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                จัดการคอร์ส
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="crypto-button"
                      onClick={() => {
                        setCourseForm({
                          title: "",
                          description: "",
                          thumbnail_url: "",
                          price_type: "free",
                          price_amount: 0,
                          tags: "",
                          category_id: "",
                          duration_hours: 0,
                          duration_minutes: 0
                        });
                        setImagePosition({ x: 50, y: 50 });
                        setImageZoom(100);
                      }}
                    >
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
                      <div className="col-span-2 space-y-2">
                        <Label>รายละเอียด</Label>
                        <Textarea
                          value={courseForm.description}
                          onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                          placeholder="รายละเอียดคอร์ส"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>อัปโหลดภาพ Thumbnail</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="cursor-pointer"
                        />
                        {courseForm.thumbnail_url && (
                          <div className="mt-2 space-y-2">
                            <div className="w-32 h-32 overflow-hidden rounded border relative">
                              <img 
                                src={courseForm.thumbnail_url} 
                                alt="Preview" 
                                className="object-cover transition-transform duration-200"
                                style={{
                                  objectPosition: `${imagePosition.x}% ${imagePosition.y}%`,
                                  transform: `scale(${imageZoom / 100})`,
                                  width: '100%',
                                  height: '100%'
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="space-y-1">
                                <Label className="text-xs">ปรับตำแหน่งรูป</Label>
                                <div className="flex gap-2">
                                  <div className="flex-1">
                                    <Label className="text-xs">แนวนอน</Label>
                                    <Input
                                      type="range"
                                      min="0"
                                      max="100"
                                      value={imagePosition.x}
                                      onChange={(e) => setImagePosition({...imagePosition, x: Number(e.target.value)})}
                                      className="w-full h-2"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <Label className="text-xs">แนวตั้ง</Label>
                                    <Input
                                      type="range"
                                      min="0"
                                      max="100"
                                      value={imagePosition.y}
                                      onChange={(e) => setImagePosition({...imagePosition, y: Number(e.target.value)})}
                                      className="w-full h-2"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">ขยายรูป ({imageZoom}%)</Label>
                                <Input
                                  type="range"
                                  min="50"
                                  max="200"
                                  value={imageZoom}
                                  onChange={(e) => setImageZoom(Number(e.target.value))}
                                  className="w-full h-2"
                                />
                              </div>
                            </div>
                          </div>
                        )}
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
                      <div className="space-y-2 col-span-2">
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
              <div className="space-y-8">
                {/* Group courses by category */}
                {[...new Set(courses.map(c => c.course_categories?.name || 'ทั่วไป'))].map(categoryName => {
                  const categoryCourses = courses.filter(c => (c.course_categories?.name || 'ทั่วไป') === categoryName);
                  if (categoryCourses.length === 0) return null;
                  
                  return (
                    <div key={categoryName} className="space-y-4">
                      <div className="flex items-center gap-3 border-b pb-2">
                        <h3 className="text-xl font-bold text-primary">
                          {categoryName === 'พื้นฐาน' && '🌱'}
                          {categoryName === 'เทรดดิ้ง' && '📊'}
                          {categoryName === 'ขั้นสูง' && '🚀'}
                          {categoryName === 'ทั่วไป' && '📚'}
                          {!['พื้นฐาน', 'เทรดดิ้ง', 'ขั้นสูง', 'ทั่วไป'].includes(categoryName) && '📌'}
                          {' '}{categoryName}
                        </h3>
                        <Badge 
                          className={`
                            ${categoryName === 'พื้นฐาน' ? 'bg-green-500/20 text-green-400 border-green-500/50' : ''}
                            ${categoryName === 'เทรดดิ้ง' ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' : ''}
                            ${categoryName === 'ขั้นสูง' ? 'bg-purple-500/20 text-purple-400 border-purple-500/50' : ''}
                            ${!['พื้นฐาน', 'เทรดดิ้ง', 'ขั้นสูง'].includes(categoryName) ? 'bg-orange-500/20 text-orange-400 border-orange-500/50' : ''}
                          `}
                        >
                          {categoryCourses.length} คอร์ส
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {categoryCourses.map((course) => (
                          <Card key={course.id} className="overflow-hidden bg-gradient-to-br from-background to-muted/30 border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                    <div className="aspect-square relative overflow-hidden">
                      {course.thumbnail_url ? (
                        <img 
                          src={course.thumbnail_url} 
                          alt={course.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-primary/60" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-3 right-3 flex gap-2">
                        <Button 
                          variant="secondary" 
                          size="sm"
                          className="h-8 w-8 p-0 bg-blue-500 hover:bg-blue-600 text-white shadow-lg border-0"
                          onClick={() => {
                            setEditingCourse(course);
                            setCourseForm({
                              title: course.title,
                              description: course.description || "",
                              thumbnail_url: course.thumbnail_url || "",
                              price_type: course.price_type,
                              price_amount: course.price_amount || 0,
                              tags: course.tags?.join(', ') || "",
                              category_id: course.category_id || "",
                              duration_hours: course.duration_hours || 0,
                              duration_minutes: course.duration_minutes || 0
                            });
                          }}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          className="h-8 w-8 p-0 shadow-lg"
                          onClick={() => deleteCourse(course.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <Badge className="absolute bottom-3 left-3 bg-primary/90 text-primary-foreground shadow-lg">
                        🏷️ {course.course_categories?.name || 'ทั่วไป'}
                      </Badge>
                    </div>
                    <CardContent className="p-3">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-sm leading-tight line-clamp-2">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-muted-foreground">
                            {course.duration_hours}ชม {course.duration_minutes}นาที
                          </span>
                        </div>
                        {course.course_categories && (
                          <Badge variant="outline" className="text-xs">{course.course_categories.name}</Badge>
                        )}
                      </div>
                    </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          {/* Edit Course Dialog */}
          {editingCourse && (
            <Dialog open={!!editingCourse} onOpenChange={() => setEditingCourse(null)}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>แก้ไขคอร์ส</DialogTitle>
                  <DialogDescription>
                    แก้ไขข้อมูลคอร์ส
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
                  <div className="col-span-2 space-y-2">
                    <Label>รายละเอียด</Label>
                    <Textarea
                      value={courseForm.description}
                      onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                      placeholder="รายละเอียดคอร์ส"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>อัปโหลดภาพ Thumbnail</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="cursor-pointer"
                    />
                    {courseForm.thumbnail_url && (
                      <div className="mt-2 space-y-2">
                        <div className="w-32 h-32 overflow-hidden rounded border relative">
                          <img 
                            src={courseForm.thumbnail_url} 
                            alt="Preview" 
                            className="object-cover transition-transform duration-200"
                            style={{
                              objectPosition: `${imagePosition.x}% ${imagePosition.y}%`,
                              transform: `scale(${imageZoom / 100})`,
                              width: '100%',
                              height: '100%'
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="space-y-1">
                            <Label className="text-xs">ปรับตำแหน่งรูป</Label>
                            <div className="flex gap-2">
                              <div className="flex-1">
                                <Label className="text-xs">แนวนอน</Label>
                                <Input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={imagePosition.x}
                                  onChange={(e) => setImagePosition({...imagePosition, x: Number(e.target.value)})}
                                  className="w-full h-2"
                                />
                              </div>
                              <div className="flex-1">
                                <Label className="text-xs">แนวตั้ง</Label>
                                <Input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={imagePosition.y}
                                  onChange={(e) => setImagePosition({...imagePosition, y: Number(e.target.value)})}
                                  className="w-full h-2"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">ขยายรูป ({imageZoom}%)</Label>
                            <Input
                              type="range"
                              min="50"
                              max="200"
                              value={imageZoom}
                              onChange={(e) => setImageZoom(Number(e.target.value))}
                              className="w-full h-2"
                            />
                          </div>
                        </div>
                      </div>
                    )}
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
                  <div className="space-y-2 col-span-2">
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
                <div className="flex gap-2">
                  <Button 
                    onClick={async () => {
                      try {
                         const { error } = await supabase
                           .from('courses')
                           .update({
                             ...courseForm,
                             instructor: "ผู้สอน", // Default instructor
                             category_id: courseForm.category_id || null,
                             tags: courseForm.tags ? courseForm.tags.split(',').map(tag => tag.trim()) : null,
                             price_amount: courseForm.price_type === 'free' ? 0 : courseForm.price_amount
                           })
                           .eq('id', editingCourse.id);

                        if (error) throw error;

                        toast({
                          title: "อัปเดตคอร์สสำเร็จ",
                          description: "คอร์สได้รับการอัปเดตแล้ว",
                        });

                        setEditingCourse(null);
                        fetchCourses();
                      } catch (error: any) {
                        toast({
                          title: "เกิดข้อผิดพลาด",
                          description: error.message,
                          variant: "destructive",
                        });
                      }
                    }}
                    className="crypto-button flex-1"
                  >
                    อัปเดตคอร์ส
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setEditingCourse(null)}
                    className="flex-1"
                  >
                    ยกเลิก
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
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
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setEditingCategory(category);
                            setCategoryForm({
                              name: category.name,
                              description: category.description || ""
                            });
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => deleteCategory(category.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Edit Category Dialog */}
          {editingCategory && (
            <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>แก้ไขหมวดหมู่</DialogTitle>
                  <DialogDescription>
                    แก้ไขข้อมูลหมวดหมู่
                  </DialogDescription>
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
                <div className="flex gap-2">
                  <Button 
                    onClick={async () => {
                      try {
                        const { error } = await supabase
                          .from('course_categories')
                          .update(categoryForm)
                          .eq('id', editingCategory.id);

                        if (error) throw error;

                        toast({
                          title: "อัปเดตหมวดหมู่สำเร็จ",
                          description: "หมวดหมู่ได้รับการอัปเดตแล้ว",
                        });

                        setEditingCategory(null);
                        fetchCategories();
                      } catch (error: any) {
                        toast({
                          title: "เกิดข้อผิดพลาด",
                          description: error.message,
                          variant: "destructive",
                        });
                      }
                    }}
                    className="crypto-button flex-1"
                  >
                    อัปเดตหมวดหมู่
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setEditingCategory(null)}
                    className="flex-1"
                  >
                    ยกเลิก
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>

        <TabsContent value="episodes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                จัดการตอนเรียน
                <div className="flex gap-2">
                  <Select
                    value={selectedCourse}
                    onValueChange={setSelectedCourse}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="เลือกคอร์ส" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทุกคอร์ส</SelectItem>
                      {courses.map(course => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {courses
                  .filter(course => selectedCourse === "all" || course.id === selectedCourse)
                  .map(course => {
                    const courseEpisodes = episodes.filter(ep => ep.course_id === course.id);
                    if (courseEpisodes.length === 0 && selectedCourse !== course.id) return null;
                    return (
                      <div key={course.id} className="space-y-3">
                        <h3 className="font-bold text-lg text-primary border-b pb-2">
                          🎬 {course.title} 
                          <span className="text-sm text-muted-foreground ml-2">({courseEpisodes.length} ตอน)</span>
                        </h3>
                        {courseEpisodes.length === 0 ? (
                          <div className="text-muted-foreground text-sm p-4 border rounded-lg bg-muted/10">
                            ยังไม่มีตอนเรียนในคอร์สนี้
                          </div>
                        ) : (
                          <div className="space-y-2 ml-4">
                            {courseEpisodes.map((episode) => (
                              <div key={episode.id} className="border rounded-lg p-4 hover:bg-muted/5 transition-colors">
                                <div className="flex items-start justify-between">
                                  <div className="space-y-1">
                                    <h3 className="font-semibold">
                                      ตอนที่ {episode.episode_order}: {episode.title}
                                    </h3>
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
                                  <div className="flex gap-2">
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => {
                                        setEditingEpisode(episode);
                                        setEpisodeForm({
                                          course_id: episode.course_id,
                                          title: episode.title,
                                          description: episode.description || "",
                                          video_url: episode.video_url || "",
                                          duration_minutes: episode.duration_minutes || 0,
                                          episode_order: episode.episode_order,
                                          is_free: episode.is_free
                                        });
                                      }}
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button 
                                      variant="destructive" 
                                      size="sm"
                                      onClick={() => deleteEpisode(episode.id)}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
          
          {/* Edit Episode Dialog */}
          {editingEpisode && (
            <Dialog open={!!editingEpisode} onOpenChange={() => setEditingEpisode(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>แก้ไขตอนเรียน</DialogTitle>
                  <DialogDescription>
                    แก้ไขข้อมูลตอนเรียน
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
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
                      placeholder="เช่น บทนำ"
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
                      id="edit_is_free"
                      checked={episodeForm.is_free}
                      onChange={(e) => setEpisodeForm({...episodeForm, is_free: e.target.checked})}
                    />
                    <Label htmlFor="edit_is_free">ดูฟรีได้</Label>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={async () => {
                      try {
                        const { error } = await supabase
                          .from('course_episodes')
                          .update({
                            course_id: episodeForm.course_id,
                            title: episodeForm.title,
                            description: episodeForm.description,
                            video_url: episodeForm.video_url,
                            duration_minutes: episodeForm.duration_minutes,
                            episode_order: episodeForm.episode_order,
                            is_free: episodeForm.is_free
                          })
                          .eq('id', editingEpisode.id);

                        if (error) throw error;

                        toast({
                          title: "อัปเดตตอนเรียนสำเร็จ",
                          description: "ตอนเรียนได้รับการอัปเดตแล้ว",
                        });

                        setEditingEpisode(null);
                        fetchEpisodes();
                      } catch (error: any) {
                        toast({
                          title: "เกิดข้อผิดพลาด",
                          description: error.message,
                          variant: "destructive",
                        });
                      }
                    }}
                    className="crypto-button flex-1"
                  >
                    อัปเดตตอนเรียน
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setEditingEpisode(null)}
                    className="flex-1"
                  >
                    ยกเลิก
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                จัดการเอกสารเรียน
                <div className="flex gap-2">
                  <Select
                    value={selectedCourse}
                    onValueChange={setSelectedCourse}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="เลือกคอร์ส" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทุกคอร์ส</SelectItem>
                      {courses.map(course => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Dialog>
                  <DialogTrigger asChild>
                    <Button className="crypto-button">
                      <Plus className="w-4 h-4 mr-2" />
                      เพิ่มเอกสาร
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>เพิ่มเอกสารใหม่</DialogTitle>
                      <DialogDescription>
                        เพิ่มไฟล์เรียนหรือ Blog Post
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 space-y-2">
                        <Label>คอร์ส</Label>
                        <Select
                          value={documentForm.course_id}
                          onValueChange={(value) => setDocumentForm({...documentForm, course_id: value})}
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
                        <Label>ชื่อเอกสาร</Label>
                        <Input
                          value={documentForm.title}
                          onChange={(e) => setDocumentForm({...documentForm, title: e.target.value})}
                          placeholder="เช่น แนวทางการเทรด PDF"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>ประเภทไฟล์</Label>
                        <Select
                          value={documentForm.file_type}
                          onValueChange={(value) => setDocumentForm({...documentForm, file_type: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกประเภท" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="doc">Word Document</SelectItem>
                            <SelectItem value="blog">Blog Post</SelectItem>
                            <SelectItem value="link">External Link</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label>รายละเอียด</Label>
                        <Textarea
                          value={documentForm.description}
                          onChange={(e) => setDocumentForm({...documentForm, description: e.target.value})}
                          placeholder="รายละเอียดเอกสาร"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>URL/ลิงก์ไฟล์</Label>
                        <Input
                          value={documentForm.file_url}
                          onChange={(e) => setDocumentForm({...documentForm, file_url: e.target.value})}
                          placeholder="https://..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>ลำดับเอกสาร</Label>
                        <Input
                          type="number"
                          value={documentForm.document_order}
                          onChange={(e) => setDocumentForm({...documentForm, document_order: Number(e.target.value)})}
                        />
                      </div>
                      <div className="col-span-2 flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="is_downloadable"
                          checked={documentForm.is_downloadable}
                          onChange={(e) => setDocumentForm({...documentForm, is_downloadable: e.target.checked})}
                        />
                        <Label htmlFor="is_downloadable">ดาวน์โหลดได้</Label>
                      </div>
                    </div>
                    <Button onClick={createDocument} className="crypto-button w-full">
                      เพิ่มเอกสาร
                    </Button>
                  </DialogContent>
                </Dialog>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {courses
                  .filter(course => selectedCourse === "all" || course.id === selectedCourse)
                  .map(course => {
                    const courseDocuments = documents.filter(doc => doc.course_id === course.id);
                    if (courseDocuments.length === 0 && selectedCourse !== course.id) return null;
                    return (
                      <div key={course.id} className="space-y-3">
                        <h3 className="font-bold text-lg text-primary border-b pb-2">
                          📄 {course.title}
                          <span className="text-sm text-muted-foreground ml-2">({courseDocuments.length} เอกสาร)</span>
                        </h3>
                        {courseDocuments.length === 0 ? (
                          <div className="text-muted-foreground text-sm p-4 border rounded-lg bg-muted/10">
                            ยังไม่มีเอกสารในคอร์สนี้
                          </div>
                        ) : (
                          <div className="space-y-2 ml-4">
                            {courseDocuments.map((document) => (
                              <div key={document.id} className="border rounded-lg p-4 hover:bg-muted/5 transition-colors">
                                <div className="flex items-start justify-between">
                                  <div className="space-y-1">
                                    <h3 className="font-semibold flex items-center gap-2">
                                      <FileText className="w-4 h-4" />
                                      {document.title}
                                    </h3>
                                    <p className="text-sm">{document.description}</p>
                                    <div className="flex items-center gap-2">
                                      <Badge variant="outline">
                                        {document.file_type?.toUpperCase() || 'FILE'}
                                      </Badge>
                                      <Badge variant={document.is_downloadable ? 'outline' : 'secondary'}>
                                        {document.is_downloadable ? 'ดาวน์โหลดได้' : 'ดูอย่างเดียว'}
                                      </Badge>
                                      <span className="text-xs text-muted-foreground">
                                        ลำดับ: {document.document_order}
                                      </span>
                                    </div>
                                    {document.file_url && (
                                      <a 
                                        href={document.file_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-500 hover:underline inline-flex items-center gap-1"
                                      >
                                        <FileText className="w-3 h-3" />
                                        ดูเอกสาร
                                      </a>
                                    )}
                                  </div>
                                  <div className="flex gap-2">
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => {
                                        setEditingDocument(document);
                                        setDocumentForm({
                                          course_id: document.course_id,
                                          title: document.title,
                                          description: document.description || "",
                                          file_url: document.file_url || "",
                                          file_type: document.file_type || "",
                                          file_size: document.file_size || 0,
                                          document_order: document.document_order,
                                          is_downloadable: document.is_downloadable
                                        });
                                      }}
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button 
                                      variant="destructive" 
                                      size="sm"
                                      onClick={() => deleteDocument(document.id)}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
          
          {/* Edit Document Dialog */}
          {editingDocument && (
            <Dialog open={!!editingDocument} onOpenChange={() => setEditingDocument(null)}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>แก้ไขเอกสาร</DialogTitle>
                  <DialogDescription>
                    แก้ไขข้อมูลเอกสาร
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label>คอร์ส</Label>
                    <Select
                      value={documentForm.course_id}
                      onValueChange={(value) => setDocumentForm({...documentForm, course_id: value})}
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
                    <Label>ชื่อเอกสาร</Label>
                    <Input
                      value={documentForm.title}
                      onChange={(e) => setDocumentForm({...documentForm, title: e.target.value})}
                      placeholder="เช่น แนวทางการเทรด PDF"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>ประเภทไฟล์</Label>
                    <Select
                      value={documentForm.file_type}
                      onValueChange={(value) => setDocumentForm({...documentForm, file_type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกประเภท" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="doc">Word Document</SelectItem>
                        <SelectItem value="blog">Blog Post</SelectItem>
                        <SelectItem value="link">External Link</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>รายละเอียด</Label>
                    <Textarea
                      value={documentForm.description}
                      onChange={(e) => setDocumentForm({...documentForm, description: e.target.value})}
                      placeholder="รายละเอียดเอกสาร"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>URL/ลิงก์ไฟล์</Label>
                    <Input
                      value={documentForm.file_url}
                      onChange={(e) => setDocumentForm({...documentForm, file_url: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>ลำดับเอกสาร</Label>
                    <Input
                      type="number"
                      value={documentForm.document_order}
                      onChange={(e) => setDocumentForm({...documentForm, document_order: Number(e.target.value)})}
                    />
                  </div>
                  <div className="col-span-2 flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="edit_is_downloadable"
                      checked={documentForm.is_downloadable}
                      onChange={(e) => setDocumentForm({...documentForm, is_downloadable: e.target.checked})}
                    />
                    <Label htmlFor="edit_is_downloadable">ดาวน์โหลดได้</Label>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={async () => {
                      try {
                        const { error } = await supabase
                          .from('course_documents')
                          .update({
                            course_id: documentForm.course_id,
                            title: documentForm.title,
                            description: documentForm.description,
                            file_url: documentForm.file_url,
                            file_type: documentForm.file_type,
                            file_size: documentForm.file_size,
                            document_order: documentForm.document_order,
                            is_downloadable: documentForm.is_downloadable
                          })
                          .eq('id', editingDocument.id);

                        if (error) throw error;

                        toast({
                          title: "อัปเดตเอกสารสำเร็จ",
                          description: "เอกสารได้รับการอัปเดตแล้ว",
                        });

                        setEditingDocument(null);
                        fetchDocuments();
                      } catch (error: any) {
                        toast({
                          title: "เกิดข้อผิดพลาด",
                          description: error.message,
                          variant: "destructive",
                        });
                      }
                    }}
                    className="crypto-button flex-1"
                  >
                    อัปเดตเอกสาร
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setEditingDocument(null)}
                    className="flex-1"
                  >
                    ยกเลิก
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseManagement;