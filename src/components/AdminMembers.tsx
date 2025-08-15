import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Edit, Trash2, Crown, Shield, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: string | null;
  membership_status: string | null;
  created_at: string;
}

interface AuthUser {
  id: string;
  email?: string;
}

const AdminMembers = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    full_name: '',
    role: '',
    membership_status: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching profiles:', error);
        toast({
          title: "ข้อผิดพลาด",
          description: "ไม่สามารถโหลดข้อมูลสมาชิกได้",
          variant: "destructive",
        });
        return;
      }

      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (profile: Profile) => {
    setEditingProfile(profile);
    setEditForm({
      username: profile.username || '',
      full_name: profile.full_name || '',
      role: profile.role || 'user',
      membership_status: profile.membership_status || 'free'
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingProfile) return;

    try {
      console.log('Updating profile:', editingProfile.id, 'with data:', editForm);
      
      const { data, error } = await supabase
        .from('profiles')
        .update(editForm)
        .eq('id', editingProfile.id)
        .select(); // เพิ่ม select เพื่อดูผลลัพธ์

      console.log('Update result:', { data, error });

      if (error) {
        console.error('Error updating profile:', error);
        toast({
          title: "ข้อผิดพลาด",
          description: `ไม่สามารถอัพเดตข้อมูลได้: ${error.message}`,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "สำเร็จ",
        description: "อัพเดตข้อมูลสมาชิกเรียบร้อยแล้ว",
      });

      setEditingProfile(null);
      setIsEditDialogOpen(false);
      fetchProfiles();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "ข้อผิดพลาด",
        description: "เกิดข้อผิดพลาดในการอัพเดตข้อมูล",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (profileId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', profileId);

      if (error) {
        console.error('Error deleting profile:', error);
        toast({
          title: "ข้อผิดพลาด",
          description: "ไม่สามารถลบสมาชิกได้",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "สำเร็จ",
        description: "ลบสมาชิกเรียบร้อยแล้ว",
      });

      fetchProfiles();
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  // ลบฟังก์ชัน getUserEmail เพราะไม่สามารถใช้ auth.admin.listUsers() ได้
  const getUserEmail = (userId: string) => {
    return '-'; // แสดง - แทนเพราะไม่สามารถดึงอีเมลจาก auth.users ได้
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH');
  };
  const getRoleIcon = (role: string | null) => {
    switch (role) {
      case 'admin':
        return <Crown className="w-4 h-4" />;
      case 'moderator':
        return <Shield className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleBadgeVariant = (role: string | null) => {
    switch (role) {
      case 'admin':
        return 'destructive'; // Red/primary color
      case 'moderator':
        return 'default'; // Blue color
      default:
        return 'secondary'; // Gray color
    }
  };

  const getMembershipBadgeVariant = (status: string | null) => {
    switch (status) {
      case 'basic':
      case 'scalping':
      case 'advanced':
      case 'ema':
      case 'premium':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getMembershipStatusText = (status: string | null) => {
    switch (status) {
      case 'basic':
        return '📚 Basic Course';
      case 'scalping':
        return '⚡ Scalping Course';
      case 'advanced':
        return '🎯 Advanced Course';
      case 'ema':
        return '🧠 EMA Course';
      case 'premium':
        return '⭐ Premium (All Courses)';
      default:
        return '🆓 ฟรี';
    }
  };

  if (loading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5" />
            จัดการสมาชิก
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-slate-700">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700 hover:bg-slate-700/50">
                  <TableHead className="text-slate-300">ชื่อ-นามสกุล</TableHead>
                  <TableHead className="text-slate-300">อีเมล</TableHead>
                  <TableHead className="text-slate-300">เบอร์โทร</TableHead>
                  <TableHead className="text-slate-300">บทบาท</TableHead>
                  <TableHead className="text-slate-300">สมาชิก</TableHead>
                  <TableHead className="text-slate-300">วันที่สมัคร</TableHead>
                  <TableHead className="text-slate-300 text-center">จัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profiles.map((profile) => (
                  <TableRow key={profile.id} className="border-slate-700 hover:bg-slate-700/30">
                    <TableCell className="text-white">
                      {profile.full_name || profile.username || 'ไม่ระบุชื่อ'}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {getUserEmail(profile.id)}
                    </TableCell>
                    <TableCell className="text-slate-300">-</TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(profile.role)} className="flex items-center gap-1 w-fit">
                        {getRoleIcon(profile.role)}
                        {profile.role === 'admin' ? 'ผู้ดูแลระบบ' : 
                         profile.role === 'moderator' ? 'ผู้ดูแล' : 'ผู้ใช้'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getMembershipBadgeVariant(profile.membership_status)}>
                        {getMembershipStatusText(profile.membership_status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {formatDate(profile.created_at)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-center">
                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(profile)}
                              className="border-slate-600 text-slate-300 hover:bg-slate-600"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-slate-800 border-slate-700">
                            <DialogHeader>
                              <DialogTitle className="text-white">แก้ไขข้อมูลสมาชิก</DialogTitle>
                              <DialogDescription className="text-slate-400">
                                แก้ไขข้อมูลสมาชิกของระบบ
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="username" className="text-slate-300">ชื่อผู้ใช้</Label>
                                <Input
                                  id="username"
                                  value={editForm.username}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                                  className="bg-slate-700 border-slate-600 text-white"
                                />
                              </div>
                              <div>
                                <Label htmlFor="full_name" className="text-slate-300">ชื่อ-นามสกุล</Label>
                                <Input
                                  id="full_name"
                                  value={editForm.full_name}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                                  className="bg-slate-700 border-slate-600 text-white"
                                />
                              </div>
                              <div>
                                <Label htmlFor="role" className="text-slate-300">บทบาท</Label>
                                <Select value={editForm.role} onValueChange={(value) => setEditForm(prev => ({ ...prev, role: value }))}>
                                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-slate-700 border-slate-600 z-50">
                                    <SelectItem value="user">👤 ผู้ใช้</SelectItem>
                                    <SelectItem value="moderator">🛡️ ผู้ดูแล</SelectItem>
                                    <SelectItem value="admin">👑 แอดมิน</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="membership_status" className="text-slate-300">สถานะสมาชิก</Label>
                                <Select value={editForm.membership_status} onValueChange={(value) => setEditForm(prev => ({ ...prev, membership_status: value }))}>
                                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-slate-700 border-slate-600 z-50">
                                    <SelectItem value="free">🆓 ฟรี</SelectItem>
                                    <SelectItem value="basic">📚 Basic Course</SelectItem>
                                    <SelectItem value="scalping">⚡ Scalping Course</SelectItem>
                                    <SelectItem value="advanced">🎯 Advanced Course</SelectItem>
                                    <SelectItem value="ema">🧠 EMA Course</SelectItem>
                                    <SelectItem value="premium">⭐ Premium (All Courses)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button onClick={handleUpdate} className="w-full bg-blue-600 hover:bg-blue-700">
                                บันทึกการเปลี่ยนแปลง
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-600 text-red-400 hover:bg-red-600/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-slate-800 border-slate-700">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-white">ยืนยันการลบ</AlertDialogTitle>
                              <AlertDialogDescription className="text-slate-400">
                                คุณแน่ใจหรือไม่ที่จะลบสมาชิกคนนี้? การกระทำนี้ไม่สามารถย้อนกลับได้
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600">
                                ยกเลิก
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(profile.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                ลบ
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {profiles.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">ไม่มีข้อมูลสมาชิก</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMembers;