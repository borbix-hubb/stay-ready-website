import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Edit, Save, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProfileSectionProps {
  userRole: string;
  membershipStatus: string;
}

const ProfileSection = ({ userRole, membershipStatus }: ProfileSectionProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    full_name: '',
    username: '',
    avatar_url: '',
    platform: 'ไมโครซอฟต์'
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfileData({
          full_name: data.full_name || '',
          username: data.username || '',
          avatar_url: data.avatar_url || '',
          platform: 'ไมโครซอฟต์'
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profileData.full_name,
          username: profileData.username,
          avatar_url: profileData.avatar_url
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        toast({
          title: "เกิดข้อผิดพลาด",
          description: "ไม่สามารถบันทึกข้อมูลได้",
          variant: "destructive"
        });
        return;
      }

      setIsEditing(false);
      toast({
        title: "บันทึกสำเร็จ",
        description: "ข้อมูลโปรไฟล์ถูกอัพเดทแล้ว",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถบันทึกข้อมูลได้",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchProfile(); // รีเซ็ตข้อมูลกลับเป็นเดิม
  };

  const isAdmin = userRole === 'admin';

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">👋 ข้อมูลผู้ใช้</h3>
                <p className="text-slate-400">จัดการข้อมูลส่วนตัวของคุณ</p>
              </div>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  แก้ไข
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleSave}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    บันทึก
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <X className="w-4 h-4 mr-2" />
                    ยกเลิก
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-sm text-slate-400">
                ชื่อ-นามสกุล
              </Label>
              {isEditing ? (
                <Input
                  id="full_name"
                  value={profileData.full_name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              ) : (
                <p className="text-white font-medium p-2">
                  {profileData.full_name || 'ยังไม่ได้กรอกข้อมูล'}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-slate-400">
                อีเมล
              </Label>
              <p className="text-white font-medium p-2">
                {user?.email || 'ไม่มีข้อมูล'}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm text-slate-400">
                ชื่อผู้ใช้
              </Label>
              {isEditing ? (
                <Input
                  id="username"
                  value={profileData.username}
                  onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              ) : (
                <p className="text-white font-medium p-2">
                  {profileData.username || 'ยังไม่ได้กรอกข้อมูล'}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-400">แพลตฟอร์ม</Label>
              <p className="text-white font-medium p-2">{profileData.platform}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-400">สถานะสมาชิก</Label>
              <div className="flex items-center gap-2 p-2">
                {membershipStatus === 'premium' ? (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                    ⭐ พรีเมี่ยม
                  </Badge>
                ) : (
                  <>
                    <Badge className="bg-slate-600 hover:bg-slate-700 text-white">
                      ฟรี
                    </Badge>
                    {!isAdmin && (
                      <Button
                        onClick={() => navigate('/payment')}
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-xs"
                      >
                        💎 อัพเกรด
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-400">บทบาท</Label>
              <p className="text-white font-medium p-2">
                {userRole === 'admin' ? 'ผู้ดูแลระบบ' : 'ผู้ใช้งาน'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSection;