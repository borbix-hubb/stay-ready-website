import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, CheckCircle, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LocationState {
  planName: string;
  amount: number;
}

const PaymentConfirm = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const state = location.state as LocationState;
  if (!state) {
    navigate('/payment');
    return null;
  }

  const { planName, amount } = state;
  
  const [formData, setFormData] = useState({
    payerName: "",
    transferDate: "",
    bankName: "",
  });
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const bankAccounts = [
    {
      bank: "ไทยพาณิชย์",
      accountName: "บริษัท เทรดดิ้ง โปร จำกัด",
      accountNumber: "123-456-7890",
      color: "from-purple-600 to-pink-600"
    },
    {
      bank: "กสิกรไทย",
      accountName: "บริษัท เทรดดิ้ง โปร จำกัด", 
      accountNumber: "987-654-3210",
      color: "from-green-600 to-emerald-600"
    },
    {
      bank: "กรุงเทพ",
      accountName: "บริษัท เทรดดิ้ง โปร จำกัด",
      accountNumber: "555-888-9999",
      color: "from-blue-600 to-cyan-600"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "ไฟล์ใหญ่เกินไป",
          description: "กรุณาเลือกไฟล์ขนาดไม่เกิน 5MB",
          variant: "destructive",
        });
        return;
      }
      setSlipFile(file);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "คัดลอกแล้ว",
      description: "คัดลอกหมายเลขบัญชีเรียบร้อย",
    });
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "กรุณาเข้าสู่ระบบ",
        description: "คุณต้องเข้าสู่ระบบก่อนแจ้งชำระเงิน",
        variant: "destructive",
      });
      return;
    }

    if (!formData.payerName || !formData.transferDate || !formData.bankName || !slipFile) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        description: "ต้องกรอกข้อมูลทุกช่องและอัพโหลดสลิป",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      // Upload slip to Supabase Storage
      const fileExt = slipFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('payment-slips')
        .upload(fileName, slipFile);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('payment-slips')
        .getPublicUrl(fileName);

      // Save payment confirmation to database
      const { error: dbError } = await supabase
        .from('payment_confirmations')
        .insert({
          user_id: user.id,
          plan_name: planName,
          amount: amount,
          payer_name: formData.payerName,
          transfer_date: formData.transferDate,
          bank_name: formData.bankName,
          slip_url: urlData.publicUrl,
          status: 'pending'
        });

      if (dbError) throw dbError;

      setSubmitted(true);
      toast({
        title: "🎉 แจ้งชำระเงินสำเร็จ!",
        description: "ระบบได้รับการแจ้งชำระเงินแล้ว จะตรวจสอบภายใน 24 ชั่วโมง",
      });

    } catch (error: any) {
      console.error('Error submitting payment:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message || "ไม่สามารถแจ้งชำระเงินได้",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div className="max-w-2xl mx-auto pt-20">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm text-center">
            <CardContent className="p-12">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">✅ แจ้งชำระเงินสำเร็จ!</h1>
              <p className="text-slate-300 mb-6">
                ระบบได้รับการแจ้งชำระเงินของคุณแล้ว<br />
                ทีมงานจะตรวจสอบและอนุมัติภายใน 24 ชั่วโมง
              </p>
              <div className="space-y-4">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-full"
                >
                  กลับสู่แดชบอร์ด
                </Button>
                <p className="text-sm text-slate-400">
                  หากมีคำถาม กรุณาติดต่อทีมสนับสนุนลูกค้า
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto pt-20">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/payment')}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            กลับ
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">💳 แจ้งการชำระเงิน</h1>
            <p className="text-slate-400">กรุณากรอกข้อมูลการโอนเงินและอัพโหลดหลักฐาน</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                📝 ฟอร์มแจ้งชำระเงิน
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-slate-300">ชื่อผู้โอน</Label>
                <Input
                  value={formData.payerName}
                  onChange={(e) => handleInputChange('payerName', e.target.value)}
                  placeholder="กรอกชื่อผู้โอนเงิน"
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">วันที่โอน</Label>
                <Input
                  type="date"
                  value={formData.transferDate}
                  onChange={(e) => handleInputChange('transferDate', e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">ธนาคารที่โอน</Label>
                <Select onValueChange={(value) => handleInputChange('bankName', value)}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="เลือกธนาคาร" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="scb">ไทยพาณิชย์ (SCB)</SelectItem>
                    <SelectItem value="kbank">กสิกรไทย (KBANK)</SelectItem>
                    <SelectItem value="bbl">กรุงเทพ (BBL)</SelectItem>
                    <SelectItem value="krungsri">กรุงศรี (BAY)</SelectItem>
                    <SelectItem value="ktb">กรุงไทย (KTB)</SelectItem>
                    <SelectItem value="tmb">ทหารไทยธนชาต (TTB)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">อัพโหลดสลิปการโอน</Label>
                <div className="relative">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="bg-slate-700/50 border-slate-600 text-white file:bg-purple-600 file:text-white file:border-0 file:rounded file:px-4 file:py-2 file:mr-4"
                  />
                  {slipFile && (
                    <div className="mt-2 text-sm text-green-400">
                      ✅ {slipFile.name}
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-500">รองรับไฟล์ภาพ ขนาดไม่เกิน 5MB</p>
              </div>

              <Button 
                onClick={handleSubmit}
                disabled={uploading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-6"
              >
                {uploading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    กำลังส่งข้อมูล...
                  </div>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    แจ้งชำระเงิน
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">📋 สรุปคำสั่งซื้อ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-600">
                    <span className="text-slate-300">แพ็คเกจ</span>
                    <span className="text-white font-medium">{planName}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-600">
                    <span className="text-slate-300">จำนวนเงิน</span>
                    <span className="text-2xl font-bold text-white">฿{amount.toLocaleString()}</span>
                  </div>
                  <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
                    <p className="text-green-400 text-sm">
                      💡 <strong>ทิป:</strong> กรอกข้อมูลให้ตรงกับสลิปการโอนเพื่อความรวดเร็วในการตรวจสอบ
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bank Accounts */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">🏦 บัญชีสำหรับโอนเงิน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {bankAccounts.map((account, index) => (
                  <div key={index} className={`p-4 rounded-lg bg-gradient-to-r ${account.color} bg-opacity-10 border border-opacity-20`}>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="font-bold text-white">{account.bank}</h4>
                        <p className="text-sm text-slate-300">{account.accountName}</p>
                        <p className="text-lg font-mono text-white">{account.accountNumber}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(account.accountNumber.replace(/-/g, ''))}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-4">
                  <p className="text-amber-400 text-sm">
                    ⚠️ <strong>หมายเหตุ:</strong> โอนเงินจำนวนเต็มตามที่ระบุ และแจ้งภายใน 24 ชั่วโมงหลังโอน
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirm;