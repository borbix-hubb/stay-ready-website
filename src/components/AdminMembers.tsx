import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Edit, Trash2, UserPlus, Crown, Shield, User } from "lucide-react";
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

const AdminMembers = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
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
  };

  const handleUpdate = async () => {
    if (!editingProfile) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(editForm)
        .eq('id', editingProfile.id);

      if (error) {
        console.error('Error updating profile:', error);
        toast({
          title: "ข้อผิดพลาด",
          description: "ไม่สามารถอัพเดตข้อมูลได้",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "สำเร็จ",
        description: "อัพเดตข้อมูลสมาชิกเรียบร้อยแล้ว",
      });

      setEditingProfile(null);
      fetchProfiles();
    } catch (error) {
      console.error('Error updating profile:', error);
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
        return 'default'; // Red/primary color
      case 'moderator':
        return 'secondary'; // Blue color
      default:
        return 'outline'; // Gray color
    }
  };

  const getMembershipBadgeVariant = (status: string | null) => {
    return status === 'premium' ? 'default' : 'secondary';
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
          <div className="grid gap-4">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      {getRoleIcon(profile.role)}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">
                        {profile.full_name || profile.username || 'ไม่ระบุชื่อ'}
                      </h3>
                      <p className="text-sm text-slate-400">
                        ID: {profile.id.slice(0, 8)}...
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant={getRoleBadgeVariant(profile.role)}>
                      {profile.role === 'admin' ? '👑 แอดมิน' : 
                       profile.role === 'moderator' ? '🛡️ ผู้ดูแล' : '👤 ผู้ใช้'}
                    </Badge>
                    <Badge variant={getMembershipBadgeVariant(profile.membership_status)}>
                      {profile.membership_status === 'premium' ? '⭐ พรีเมี่ยม' : '🆓 ฟรี'}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Dialog>
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
                            <SelectContent className="bg-slate-700 border-slate-600">
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
                            <SelectContent className="bg-slate-700 border-slate-600">
                              <SelectItem value="free">🆓 ฟรี</SelectItem>
                              <SelectItem value="premium">⭐ พรีเมี่ยม</SelectItem>
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
              </div>
            ))}
          </div>

          {profiles.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">ไม่มีข้อมูลสมาชิก</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMembers;