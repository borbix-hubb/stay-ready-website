import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { User, Shield, Users, Settings } from "lucide-react";

interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string;
}

const UserManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    role: 'user'
  });

  useEffect(() => {
    fetchProfiles();
    fetchCurrentProfile();
  }, [user]);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหลดข้อมูลผู้ใช้ได้",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setCurrentProfile(data);
      setFormData({
        username: data.username || '',
        full_name: data.full_name || '',
        role: data.role || 'user'
      });
    } catch (error) {
      console.error('Error fetching current profile:', error);
    }
  };

  const updateProfile = async () => {
    if (!user) return;
    
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: formData.username || null,
          full_name: formData.full_name || null,
          role: formData.role
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "อัปเดตสำเร็จ",
        description: "ข้อมูลโปรไฟล์ได้รับการอัปเดตแล้ว",
      });

      fetchCurrentProfile();
      fetchProfiles();
    } catch (error: any) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message || "ไม่สามารถอัปเดตข้อมูลได้",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "อัปเดตสำเร็จ",
        description: "เปลี่ยนสิทธิ์ผู้ใช้แล้ว",
      });

      fetchProfiles();
    } catch (error: any) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message || "ไม่สามารถเปลี่ยนสิทธิ์ได้",
        variant: "destructive",
      });
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'instructor': return 'secondary';
      default: return 'outline';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'แอดมิน';
      case 'instructor': return 'ผู้สอน';
      default: return 'ผู้ใช้';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-crypto-primary"></div>
      </div>
    );
  }

  const isAdmin = currentProfile?.role === 'admin';

  return (
    <div className="space-y-6">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            โปรไฟล์ของฉัน
          </TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              จัดการผู้ใช้
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                แก้ไขโปรไฟล์
              </CardTitle>
              <CardDescription>
                จัดการข้อมูลส่วนตัวและสิทธิ์การใช้งาน
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">ชื่อผู้ใช้</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="กรอกชื่อผู้ใช้"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="full_name">ชื่อเต็ม</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="กรอกชื่อเต็ม"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">สิทธิ์การใช้งาน</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">ผู้ใช้ทั่วไป</SelectItem>
                    <SelectItem value="instructor">ผู้สอน</SelectItem>
                    <SelectItem value="admin">แอดมิน</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={getRoleBadgeVariant(formData.role)}>
                  <Shield className="w-3 h-3 mr-1" />
                  {getRoleLabel(formData.role)}
                </Badge>
              </div>

              <Button 
                onClick={updateProfile} 
                disabled={updating}
                className="crypto-button"
              >
                {updating ? "กำลังอัปเดต..." : "บันทึกการเปลี่ยนแปลง"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {isAdmin && (
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  จัดการผู้ใช้ทั้งหมด
                </CardTitle>
                <CardDescription>
                  เปลี่ยนสิทธิ์และจัดการบัญชีผู้ใช้
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profiles.map((profile) => (
                    <div key={profile.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">
                          {profile.full_name || profile.username || "ไม่มีชื่อ"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {profile.username && `@${profile.username}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(profile.created_at).toLocaleDateString('th-TH')}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge variant={getRoleBadgeVariant(profile.role)}>
                          {getRoleLabel(profile.role)}
                        </Badge>
                        
                        {profile.id !== user?.id && (
                          <Select
                            value={profile.role}
                            onValueChange={(value) => updateUserRole(profile.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">ผู้ใช้</SelectItem>
                              <SelectItem value="instructor">ผู้สอน</SelectItem>
                              <SelectItem value="admin">แอดมิน</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default UserManagement;