import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Eye, Calendar, CreditCard, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PaymentConfirmation {
  id: string;
  user_id: string;
  plan_name: string;
  amount: number;
  bank_name: string;
  payer_name: string;
  transfer_date: string;
  slip_url: string | null;
  status: string;
  created_at: string;
}

const PaymentConfirmations = () => {
  const [confirmations, setConfirmations] = useState<PaymentConfirmation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlip, setSelectedSlip] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPaymentConfirmations();
  }, []);

  const fetchPaymentConfirmations = async () => {
    try {
      const { data, error } = await supabase
        .from('payment_confirmations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConfirmations(data || []);
    } catch (error) {
      console.error('Error fetching payment confirmations:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหลดข้อมูลการแจ้งชำระได้",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentStatus = async (id: string, newStatus: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('payment_confirmations')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      // หากอนุมัติ ให้อัพเดตสถานะสมาชิกเป็น premium
      if (newStatus === 'approved') {
        const confirmation = confirmations.find(conf => conf.id === id);
        if (confirmation?.user_id) {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({ membership_status: 'premium' })
            .eq('id', confirmation.user_id);
          
          if (profileError) {
            console.error('Error updating membership status:', profileError);
          }
        }
      }

      // Update local state
      setConfirmations(prev => 
        prev.map(conf => 
          conf.id === id ? { ...conf, status: newStatus } : conf
        )
      );

      toast({
        title: "อัพเดทสถานะสำเร็จ",
        description: `${newStatus === 'approved' ? 'อนุมัติ' : 'ไม่อนุมัติ'}การชำระเงินแล้ว${newStatus === 'approved' ? ' และอัพเกรดสมาชิกเป็นพรีเมี่ยมแล้ว' : ''}`,
      });
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถอัพเดทสถานะได้",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-600 hover:bg-green-700">อนุมัติแล้ว</Badge>;
      case 'rejected':
        return <Badge className="bg-red-600 hover:bg-red-700">ไม่อนุมัติ</Badge>;
      case 'pending':
      default:
        return <Badge className="bg-yellow-600 hover:bg-yellow-700">รอดำเนินการ</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  if (loading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="text-slate-400">กำลังโหลด...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            รายการแจ้งชำระเงิน
          </CardTitle>
        </CardHeader>
        <CardContent>
          {confirmations.length === 0 ? (
            <div className="text-center py-8">
              <CreditCard className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">ยังไม่มีรายการแจ้งชำระเงิน</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">ผู้ชำระ</TableHead>
                    <TableHead className="text-slate-300">แพลน</TableHead>
                    <TableHead className="text-slate-300">จำนวนเงิน</TableHead>
                    <TableHead className="text-slate-300">ธนาคาร</TableHead>
                    <TableHead className="text-slate-300">วันที่โอน</TableHead>
                    <TableHead className="text-slate-300">สถานะ</TableHead>
                    <TableHead className="text-slate-300">การจัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {confirmations.map((confirmation) => (
                    <TableRow key={confirmation.id} className="border-slate-700">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="text-white">{confirmation.payer_name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300">{confirmation.plan_name}</TableCell>
                      <TableCell className="text-green-400 font-medium">
                        {formatAmount(confirmation.amount)}
                      </TableCell>
                      <TableCell className="text-slate-300">{confirmation.bank_name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-300">
                            {new Date(confirmation.transfer_date).toLocaleDateString('th-TH')}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(confirmation.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {confirmation.slip_url && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle className="text-white">สลิปการโอนเงิน</DialogTitle>
                                </DialogHeader>
                                <div className="p-4">
                                  <img
                                    src={confirmation.slip_url}
                                    alt="Payment slip"
                                    className="w-full max-h-96 object-contain rounded-lg"
                                  />
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                          
                          {confirmation.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => updatePaymentStatus(confirmation.id, 'approved')}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <CheckCircle className="w-4 h-4" />
                                อนุมัติ
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updatePaymentStatus(confirmation.id, 'rejected')}
                              >
                                <XCircle className="w-4 h-4" />
                                ไม่อนุมัติ
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">สถิติการแจ้งชำระ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {confirmations.filter(c => c.status === 'pending').length}
              </div>
              <div className="text-slate-400 text-sm">รอดำเนินการ</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {confirmations.filter(c => c.status === 'approved').length}
              </div>
              <div className="text-slate-400 text-sm">อนุมัติแล้ว</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                {confirmations.filter(c => c.status === 'rejected').length}
              </div>
              <div className="text-slate-400 text-sm">ไม่อนุมัติ</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentConfirmations;