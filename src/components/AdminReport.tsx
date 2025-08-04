import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Users, DollarSign, UserCheck, UserX, TrendingUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ReportData {
  totalMembers: number;
  freeMembers: number;
  premiumMembers: number;
  totalApprovedAmount: number;
  totalPayments: number;
  recentMembers: number;
}

const AdminReport = () => {
  const [reportData, setReportData] = useState<ReportData>({
    totalMembers: 0,
    freeMembers: 0,
    premiumMembers: 0,
    totalApprovedAmount: 0,
    totalPayments: 0,
    recentMembers: 0
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
    endDate: new Date().toISOString().split('T')[0] // today
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchReportData();
  }, [dateRange]);

  const fetchReportData = async () => {
    try {
      setLoading(true);

      // ดึงข้อมูลสมาชิก
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .gte('created_at', `${dateRange.startDate}T00:00:00.000Z`)
        .lte('created_at', `${dateRange.endDate}T23:59:59.999Z`);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        toast({
          title: "ข้อผิดพลาด",
          description: "ไม่สามารถโหลดข้อมูลสมาชิกได้",
          variant: "destructive",
        });
        return;
      }

      // ดึงข้อมูลการชำระเงินที่อนุมัติแล้ว
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('payment_confirmations')
        .select('*')
        .eq('status', 'approved')
        .gte('created_at', `${dateRange.startDate}T00:00:00.000Z`)
        .lte('created_at', `${dateRange.endDate}T23:59:59.999Z`);

      if (paymentsError) {
        console.error('Error fetching payments:', paymentsError);
        toast({
          title: "ข้อผิดพลาด", 
          description: "ไม่สามารถโหลดข้อมูลการชำระเงินได้",
          variant: "destructive",
        });
        return;
      }

      // ดึงข้อมูลสมาชิกทั้งหมด (ไม่จำกัดวันที่)
      const { data: allProfilesData, error: allProfilesError } = await supabase
        .from('profiles')
        .select('*');

      if (allProfilesError) {
        console.error('Error fetching all profiles:', allProfilesError);
        return;
      }

      // คำนวณสถิติ
      const totalMembers = allProfilesData?.length || 0;
      const freeMembers = allProfilesData?.filter(profile => 
        profile.membership_status === 'free' || !profile.membership_status
      ).length || 0;
      const premiumMembers = allProfilesData?.filter(profile => 
        profile.membership_status === 'premium'
      ).length || 0;

      const totalApprovedAmount = paymentsData?.reduce((sum, payment) => 
        sum + (parseFloat(payment.amount?.toString() || '0') || 0), 0
      ) || 0;

      const totalPayments = paymentsData?.length || 0;
      const recentMembers = profilesData?.length || 0;

      setReportData({
        totalMembers,
        freeMembers,
        premiumMembers,
        totalApprovedAmount,
        totalPayments,
        recentMembers
      });

    } catch (error) {
      console.error('Error fetching report data:', error);
      toast({
        title: "ข้อผิดพลาด",
        description: "เกิดข้อผิดพลาดในการโหลดข้อมูล",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (field: 'startDate' | 'endDate', value: string) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
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
      {/* Date Range Filter */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            ช่วงเวลาที่ต้องการดู
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label htmlFor="startDate" className="text-slate-300">วันที่เริ่มต้น</Label>
              <Input
                id="startDate"
                type="date"
                value={dateRange.startDate}
                onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="endDate" className="text-slate-300">วันที่สิ้นสุด</Label>
              <Input
                id="endDate"
                type="date"
                value={dateRange.endDate}
                onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <Button
              onClick={fetchReportData}
              className="bg-blue-600 hover:bg-blue-700"
            >
              อัพเดตข้อมูล
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Members */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">จำนวนสมาชิกทั้งหมด</p>
                <p className="text-3xl font-bold text-white">{reportData.totalMembers}</p>
                <p className="text-xs text-slate-500">สมาชิกในระบบ</p>
              </div>
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Free Members */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">สมาชิกฟรี</p>
                <p className="text-3xl font-bold text-white">{reportData.freeMembers}</p>
                <Badge variant="secondary" className="mt-1">
                  {reportData.totalMembers > 0 ? 
                    Math.round((reportData.freeMembers / reportData.totalMembers) * 100) : 0
                  }%
                </Badge>
              </div>
              <div className="w-12 h-12 bg-gray-600/20 rounded-lg flex items-center justify-center">
                <UserX className="h-6 w-6 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Premium Members */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">สมาชิกพรีเมี่ยม</p>
                <p className="text-3xl font-bold text-white">{reportData.premiumMembers}</p>
                <Badge className="mt-1 bg-gradient-to-r from-yellow-500 to-orange-500">
                  {reportData.totalMembers > 0 ? 
                    Math.round((reportData.premiumMembers / reportData.totalMembers) * 100) : 0
                  }%
                </Badge>
              </div>
              <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Approved Amount */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">ยอดเงินที่อนุมัติ</p>
                <p className="text-3xl font-bold text-white">
                  {formatCurrency(reportData.totalApprovedAmount)}
                </p>
                <p className="text-xs text-slate-500">ในช่วงเวลาที่เลือก</p>
              </div>
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Payments */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">จำนวนการชำระเงิน</p>
                <p className="text-3xl font-bold text-white">{reportData.totalPayments}</p>
                <p className="text-xs text-slate-500">ที่อนุมัติแล้ว</p>
              </div>
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Members */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">สมาชิกใหม่</p>
                <p className="text-3xl font-bold text-white">{reportData.recentMembers}</p>
                <p className="text-xs text-slate-500">ในช่วงเวลาที่เลือก</p>
              </div>
              <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-indigo-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Card */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">📊 สรุปภาพรวม</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">สถิติสมาชิก</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">สมาชิกฟรี:</span>
                  <Badge variant="secondary">{reportData.freeMembers} คน</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">สมาชิกพรีเมี่ยม:</span>
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">
                    {reportData.premiumMembers} คน
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">รวมทั้งหมด:</span>
                  <Badge variant="outline" className="border-blue-500 text-blue-400">
                    {reportData.totalMembers} คน
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">สถิติการเงิน</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">ยอดเงินรวม:</span>
                  <span className="text-green-400 font-semibold">
                    {formatCurrency(reportData.totalApprovedAmount)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">จำนวนธุรกรรม:</span>
                  <span className="text-blue-400 font-semibold">
                    {reportData.totalPayments} รายการ
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">เฉลี่ยต่อรายการ:</span>
                  <span className="text-purple-400 font-semibold">
                    {reportData.totalPayments > 0 ? 
                      formatCurrency(reportData.totalApprovedAmount / reportData.totalPayments) : 
                      formatCurrency(0)
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReport;