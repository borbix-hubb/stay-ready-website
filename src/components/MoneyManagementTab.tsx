import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, TrendingUp, Shield, DollarSign, Target, AlertTriangle, ChartBar, BookOpen, CheckCircle2, XCircle, Info, Lightbulb, Brain, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const MoneyManagementTab = () => {
  // Calculator states
  const [positionCalc, setPositionCalc] = useState({
    accountBalance: '',
    riskPercent: '',
    stopLoss: '',
    pipValue: '10',
    result: null as number | null
  });

  const [riskRewardCalc, setRiskRewardCalc] = useState({
    takeProfit: '',
    stopLoss: '',
    result: null as number | null
  });

  const [winRateCalc, setWinRateCalc] = useState({
    riskRewardRatio: '',
    result: null as number | null
  });

  const [compoundCalc, setCompoundCalc] = useState({
    principal: '',
    returnRate: '',
    periods: '',
    result: null as { final: number; profit: number; profitPercent: number } | null
  });

  // Calculator functions
  const calculatePositionSize = () => {
    const balance = parseFloat(positionCalc.accountBalance);
    const risk = parseFloat(positionCalc.riskPercent);
    const sl = parseFloat(positionCalc.stopLoss);
    const pip = parseFloat(positionCalc.pipValue);

    if (balance && risk && sl && pip) {
      const riskAmount = (balance * risk) / 100;
      const lotSize = riskAmount / (sl * pip);
      setPositionCalc(prev => ({ ...prev, result: lotSize }));
    }
  };

  const calculateRiskReward = () => {
    const tp = parseFloat(riskRewardCalc.takeProfit);
    const sl = parseFloat(riskRewardCalc.stopLoss);

    if (tp && sl) {
      const ratio = tp / sl;
      setRiskRewardCalc(prev => ({ ...prev, result: ratio }));
    }
  };

  const calculateWinRate = () => {
    const ratio = parseFloat(winRateCalc.riskRewardRatio);

    if (ratio) {
      const winRate = (1 / (1 + ratio)) * 100;
      setWinRateCalc(prev => ({ ...prev, result: winRate }));
    }
  };

  const calculateCompound = () => {
    const principal = parseFloat(compoundCalc.principal);
    const rate = parseFloat(compoundCalc.returnRate) / 100;
    const periods = parseFloat(compoundCalc.periods);

    if (principal && rate && periods) {
      const final = principal * Math.pow(1 + rate, periods);
      const profit = final - principal;
      const profitPercent = (profit / principal) * 100;
      setCompoundCalc(prev => ({ 
        ...prev, 
        result: { final, profit, profitPercent } 
      }));
    }
  };
  const riskManagementRules = [
    {
      title: "กฎ 2% Risk Per Trade",
      description: "ไม่ควรเสี่ยงเกิน 2% ของทุนทั้งหมดต่อการเทรด 1 ครั้ง",
      example: "ทุน 100,000 บาท = เสี่ยงได้สูงสุด 2,000 บาท/ออเดอร์",
      icon: Shield,
      color: "text-green-500"
    },
    {
      title: "Risk:Reward Ratio",
      description: "ควรตั้งเป้าหมายกำไรอย่างน้อย 1:2 หรือมากกว่า",
      example: "เสี่ยง 100 pips ควรตั้งเป้ากำไร 200 pips ขึ้นไป",
      icon: Target,
      color: "text-blue-500"
    },
    {
      title: "Maximum Drawdown",
      description: "กำหนด Drawdown สูงสุดที่ยอมรับได้ (แนะนำไม่เกิน 20%)",
      example: "หากขาดทุนถึง 20% ควรหยุดเทรดและทบทวนกลยุทธ์",
      icon: AlertTriangle,
      color: "text-red-500"
    },
    {
      title: "Position Sizing",
      description: "คำนวณขนาด Lot ให้เหมาะสมกับ Stop Loss และทุน",
      example: "ใช้สูตร: Lot Size = (Account Risk ÷ Trade Risk) ÷ Pip Value",
      icon: Calculator,
      color: "text-purple-500"
    }
  ];

  const moneyManagementStrategies = [
    {
      name: "Fixed Fractional",
      description: "เทรดด้วยเปอร์เซ็นต์คงที่ของทุน",
      pros: ["ง่ายต่อการคำนวณ", "ปรับขนาดตามทุนอัตโนมัติ"],
      cons: ["การเติบโตช้าในช่วงแรก"],
      suitable: "เหมาะกับมือใหม่และนักเทรดที่ต้องการความเสี่ยงต่ำ"
    },
    {
      name: "Kelly Criterion",
      description: "คำนวณขนาดการเทรดจาก Win Rate และ R:R Ratio",
      pros: ["เพิ่มผลตอบแทนสูงสุด", "มีหลักทางคณิตศาสตร์"],
      cons: ["ต้องมีข้อมูลสถิติที่แม่นยำ", "อาจเสี่ยงสูงเกินไป"],
      suitable: "เหมาะกับนักเทรดที่มีประสบการณ์และมีสถิติชัดเจน"
    },
    {
      name: "Martingale",
      description: "เพิ่มขนาดการเทรดเป็น 2 เท่าหลังขาดทุน",
      pros: ["กู้คืนการขาดทุนได้เร็ว"],
      cons: ["เสี่ยงสูงมาก", "อาจทำให้บัญชีหมดได้"],
      suitable: "ไม่แนะนำสำหรับ Forex Trading"
    },
    {
      name: "Anti-Martingale",
      description: "เพิ่มขนาดเมื่อชนะ ลดขนาดเมื่อแพ้",
      pros: ["ใช้ประโยชน์จาก Winning Streak", "จำกัดความเสียหาย"],
      cons: ["ต้องมีวินัยสูง", "อาจพลาดโอกาสกู้คืน"],
      suitable: "เหมาะกับนักเทรดที่มีกลยุทธ์ที่มี Win Rate สูง"
    }
  ];

  const calculatorFormulas = [
    {
      title: "Position Size Calculator",
      formula: "Lot Size = (Account Balance × Risk %) ÷ (Stop Loss in Pips × Pip Value)",
      example: "Account: $10,000, Risk: 2%, SL: 50 pips, EURUSD\nLot Size = (10,000 × 0.02) ÷ (50 × 10) = 0.4 lots"
    },
    {
      title: "Risk:Reward Calculator",
      formula: "R:R Ratio = Potential Profit ÷ Potential Loss",
      example: "TP: 100 pips, SL: 50 pips\nR:R = 100 ÷ 50 = 1:2"
    },
    {
      title: "Breakeven Win Rate",
      formula: "Breakeven % = 1 ÷ (1 + Reward/Risk Ratio)",
      example: "R:R = 1:2\nBreakeven = 1 ÷ (1 + 2) = 33.33%"
    },
    {
      title: "Expected Value",
      formula: "EV = (Win Rate × Avg Win) - (Loss Rate × Avg Loss)",
      example: "Win Rate: 60%, Avg Win: $200, Avg Loss: $100\nEV = (0.6 × 200) - (0.4 × 100) = $80"
    }
  ];

  const psychologyTips = [
    {
      title: "อารมณ์และการตัดสินใจ",
      tips: [
        "อย่าเทรดเมื่ออารมณ์ไม่ปกติ (โกรธ, เศร้า, ตื่นเต้นเกินไป)",
        "ตั้ง Daily Loss Limit เพื่อป้องกัน Revenge Trading",
        "พักการเทรดหลังขาดทุนติดต่อกัน 3 ครั้ง",
        "เขียน Trading Journal เพื่อทบทวนการตัดสินใจ"
      ]
    },
    {
      title: "วินัยในการเทรด",
      tips: [
        "ปฏิบัติตาม Trading Plan อย่างเคร่งครัด",
        "ตั้ง Stop Loss ทุกครั้งก่อนเปิดออเดอร์",
        "ไม่เลื่อน Stop Loss ในทิศทางที่เพิ่มความเสี่ยง",
        "ปิดคอมพิวเตอร์เมื่อถึงเป้าหมายรายวัน"
      ]
    },
    {
      title: "การพัฒนาตนเอง",
      tips: [
        "ศึกษาและทดสอบกลยุทธ์ใหม่ด้วย Demo Account",
        "วิเคราะห์ทุกการเทรดทั้งที่กำไรและขาดทุน",
        "เรียนรู้จากความผิดพลาดและปรับปรุงอย่างต่อเนื่อง",
        "หาพี่เลี้ยงหรือกลุ่มนักเทรดเพื่อแลกเปลี่ยนประสบการณ์"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Section with gradient background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-8 mb-8">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 bg-primary/20 rounded-lg">
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Money Management
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            เรียนรู้การบริหารความเสี่ยงและการเงินในการเทรด Forex อย่างมืออาชีพ
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-green-500" />
              <span>ลดความเสี่ยง</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="w-4 h-4 text-blue-500" />
              <span>เพิ่มผลกำไร</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Brain className="w-4 h-4 text-purple-500" />
              <span>พัฒนาวินัย</span>
            </div>
          </div>
        </div>
      </div>

      <Alert className="mb-6 border-amber-500/50 bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        <AlertDescription className="text-sm">
          <strong className="text-amber-500">⚠️ คำเตือนความเสี่ยง:</strong>
          <span className="block mt-1">การเทรด Forex มีความเสี่ยงสูง อาจสูญเสียเงินลงทุนทั้งหมด ควรศึกษาและฝึกฝนอย่างเพียงพอก่อนเทรดด้วยเงินจริง</span>
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="risk" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-muted/50">
          <TabsTrigger value="risk" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Shield className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Risk Management</span>
            <span className="sm:hidden">Risk</span>
          </TabsTrigger>
          <TabsTrigger value="strategies" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <ChartBar className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Strategies</span>
            <span className="sm:hidden">Strategy</span>
          </TabsTrigger>
          <TabsTrigger value="calculator" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Calculator className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Calculator</span>
            <span className="sm:hidden">Calc</span>
          </TabsTrigger>
          <TabsTrigger value="psychology" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Brain className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Psychology</span>
            <span className="sm:hidden">Mind</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                หลักการบริหารความเสี่ยง
              </CardTitle>
              <CardDescription>
                กฎพื้นฐานที่นักเทรดทุกคนควรปฏิบัติตาม
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {riskManagementRules.map((rule, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-gradient-to-br from-background to-muted/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <div className={`p-2 rounded-lg bg-background/50 group-hover:scale-110 transition-transform`}>
                          <rule.icon className={`w-5 h-5 ${rule.color}`} />
                        </div>
                        <span className="font-bold">{rule.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {rule.description}
                      </p>
                      <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 p-4 rounded-lg border border-primary/20">
                        <p className="text-xs text-muted-foreground mb-1">💡 ตัวอย่าง:</p>
                        <p className="text-sm font-mono text-foreground">
                          {rule.example}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ตัวอย่างการคำนวณ Risk Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                <h4 className="font-semibold">สถานการณ์:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>ทุนในบัญชี: 100,000 บาท</li>
                  <li>Risk per trade: 2% = 2,000 บาท</li>
                  <li>คู่เงิน: EURUSD</li>
                  <li>Stop Loss: 50 pips</li>
                </ul>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg space-y-2">
                <h4 className="font-semibold">การคำนวณ:</h4>
                <p className="font-mono text-sm">
                  Lot Size = 2,000 ÷ (50 × 10) = 0.4 lots
                </p>
                <p className="text-sm text-muted-foreground">
                  ดังนั้น ควรเปิดออเดอร์ขนาด 0.4 lots
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartBar className="w-5 h-5" />
                Money Management Strategies
              </CardTitle>
              <CardDescription>
                กลยุทธ์การบริหารเงินแบบต่างๆ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {moneyManagementStrategies.map((strategy, index) => (
                  <Card key={index} className="border-border/50 hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-primary to-purple-500" />
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold">{strategy.name}</CardTitle>
                        {strategy.name === "Martingale" && (
                          <Badge variant="destructive" className="animate-pulse">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            High Risk
                          </Badge>
                        )}
                        {strategy.name === "Fixed Fractional" && (
                          <Badge className="bg-green-500/20 text-green-500 border-green-500/50">
                            <Award className="w-3 h-3 mr-1" />
                            Recommended
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {strategy.description}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 p-3 bg-green-500/5 rounded-lg border border-green-500/20">
                          <h5 className="font-semibold text-green-500 text-sm flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            ข้อดี
                          </h5>
                          <ul className="space-y-1">
                            {strategy.pros.map((pro, i) => (
                              <li key={i} className="text-sm flex items-start gap-2">
                                <span className="text-green-500 mt-1">•</span>
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2 p-3 bg-red-500/5 rounded-lg border border-red-500/20">
                          <h5 className="font-semibold text-red-500 text-sm flex items-center gap-1">
                            <XCircle className="w-4 h-4" />
                            ข้อเสีย
                          </h5>
                          <ul className="space-y-1">
                            {strategy.cons.map((con, i) => (
                              <li key={i} className="text-sm flex items-start gap-2">
                                <span className="text-red-500 mt-1">•</span>
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg border border-blue-500/20">
                        <p className="text-sm flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5" />
                          <span>
                            <strong className="text-blue-500">เหมาะกับ:</strong> {strategy.suitable}
                          </span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">🧮 เครื่องคำนวณ Money Management</h3>
            <p className="text-muted-foreground">คำนวณและวางแผนการเทรดของคุณอย่างมืออาชีพ</p>
          </div>

          {/* Position Size Calculator */}
          <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-purple-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Position Size Calculator
              </CardTitle>
              <CardDescription>คำนวณขนาด Lot ที่เหมาะสมตามความเสี่ยงที่กำหนด</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="account-balance">ยอดเงินในบัญชี (บาท)</Label>
                    <Input
                      id="account-balance"
                      type="number"
                      placeholder="100000"
                      value={positionCalc.accountBalance}
                      onChange={(e) => setPositionCalc(prev => ({ ...prev, accountBalance: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="risk-percent">ความเสี่ยงต่อเทรด (%)</Label>
                    <Input
                      id="risk-percent"
                      type="number"
                      placeholder="2"
                      value={positionCalc.riskPercent}
                      onChange={(e) => setPositionCalc(prev => ({ ...prev, riskPercent: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="stop-loss">Stop Loss (pips)</Label>
                    <Input
                      id="stop-loss"
                      type="number"
                      placeholder="50"
                      value={positionCalc.stopLoss}
                      onChange={(e) => setPositionCalc(prev => ({ ...prev, stopLoss: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pip-value">Pip Value (บาท/pip)</Label>
                    <Input
                      id="pip-value"
                      type="number"
                      placeholder="10"
                      value={positionCalc.pipValue}
                      onChange={(e) => setPositionCalc(prev => ({ ...prev, pipValue: e.target.value }))}
                    />
                  </div>
                  <Button onClick={calculatePositionSize} className="w-full">
                    คำนวณ Position Size
                  </Button>
                </div>
                <div className="space-y-4">
                  {positionCalc.result !== null && (
                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-6 rounded-xl border border-green-500/30">
                      <h4 className="font-bold text-lg mb-4 text-green-400">ผลการคำนวณ</h4>
                      <div className="space-y-2 text-sm">
                        <p>💰 ยอดเงินในบัญชี: <strong>{Number(positionCalc.accountBalance).toLocaleString()} บาท</strong></p>
                        <p>⚠️ ความเสี่ยงต่อเทรด: <strong>{positionCalc.riskPercent}% = {((Number(positionCalc.accountBalance) * Number(positionCalc.riskPercent)) / 100).toLocaleString()} บาท</strong></p>
                        <p>🎯 Stop Loss: <strong>{positionCalc.stopLoss} pips</strong></p>
                        <div className="border-t border-green-500/30 pt-3 mt-3">
                          <p className="text-lg font-bold text-green-400">
                            📊 ขนาด Lot ที่แนะนำ: {positionCalc.result.toFixed(2)} lots
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">💡 วิธีใช้:</h5>
                    <ol className="list-decimal list-inside text-sm space-y-1">
                      <li>ใส่ยอดเงินในบัญชีเทรดของคุณ</li>
                      <li>กำหนดเปอร์เซ็นต์ที่ยอมรับเสี่ยงได้ต่อเทรด (แนะนำ 1-2%)</li>
                      <li>ใส่ระยะ Stop Loss ที่วางแผนไว้</li>
                      <li>ระบบจะคำนวณขนาด Lot ที่เหมาะสมให้</li>
                    </ol>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk:Reward Calculator */}
          <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Risk:Reward Calculator
              </CardTitle>
              <CardDescription>คำนวณอัตราส่วนความเสี่ยงต่อผลตอบแทน</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="take-profit">Take Profit (pips)</Label>
                    <Input
                      id="take-profit"
                      type="number"
                      placeholder="100"
                      value={riskRewardCalc.takeProfit}
                      onChange={(e) => setRiskRewardCalc(prev => ({ ...prev, takeProfit: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rr-stop-loss">Stop Loss (pips)</Label>
                    <Input
                      id="rr-stop-loss"
                      type="number"
                      placeholder="50"
                      value={riskRewardCalc.stopLoss}
                      onChange={(e) => setRiskRewardCalc(prev => ({ ...prev, stopLoss: e.target.value }))}
                    />
                  </div>
                  <Button onClick={calculateRiskReward} className="w-full">
                    คำนวณ Risk:Reward
                  </Button>
                </div>
                <div className="space-y-4">
                  {riskRewardCalc.result !== null && (
                    <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-6 rounded-xl border border-blue-500/30">
                      <h4 className="font-bold text-lg mb-4 text-blue-400">ผลการคำนวณ</h4>
                      <div className="space-y-2 text-sm">
                        <p>🎯 Take Profit: <strong>{riskRewardCalc.takeProfit} pips</strong></p>
                        <p>⛔ Stop Loss: <strong>{riskRewardCalc.stopLoss} pips</strong></p>
                        <div className="border-t border-blue-500/30 pt-3 mt-3">
                          <p className="text-lg font-bold text-blue-400">
                            📈 R:R Ratio = 1:{riskRewardCalc.result.toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {riskRewardCalc.result >= 2 ? "✅ อัตราส่วนที่ดี" : "⚠️ ควรปรับให้มากกว่า 1:2"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">💡 คำแนะนำ:</h5>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>อัตราส่วน 1:2 ขึ้นไปถือว่าดี</li>
                      <li>1:3 หรือสูงกว่าถือว่าดีเยี่ยม</li>
                      <li>หลีกเลี่ยงการเทรดที่มี R:R ต่ำกว่า 1:1.5</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Win Rate Calculator */}
          <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-yellow-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                Breakeven Win Rate Calculator
              </CardTitle>
              <CardDescription>คำนวณเปอร์เซ็นต์การชนะขั้นต่ำที่ต้องการ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="rr-ratio">Risk:Reward Ratio</Label>
                    <Input
                      id="rr-ratio"
                      type="number"
                      step="0.1"
                      placeholder="2"
                      value={winRateCalc.riskRewardRatio}
                      onChange={(e) => setWinRateCalc(prev => ({ ...prev, riskRewardRatio: e.target.value }))}
                    />
                    <p className="text-xs text-muted-foreground mt-1">ใส่ตัวเลขของ Reward เท่านั้น เช่น ถ้า 1:2 ให้ใส่ 2</p>
                  </div>
                  <Button onClick={calculateWinRate} className="w-full">
                    คำนวณ Win Rate
                  </Button>
                </div>
                <div className="space-y-4">
                  {winRateCalc.result !== null && (
                    <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 p-6 rounded-xl border border-orange-500/30">
                      <h4 className="font-bold text-lg mb-4 text-orange-400">ผลการคำนวณ</h4>
                      <div className="space-y-2 text-sm">
                        <p>🎯 Risk:Reward Ratio: <strong>1:{winRateCalc.riskRewardRatio}</strong></p>
                        <div className="border-t border-orange-500/30 pt-3 mt-3">
                          <p className="text-lg font-bold text-orange-400">
                            📊 Breakeven Win Rate: {winRateCalc.result.toFixed(1)}%
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            คุณต้องชนะอย่างน้อย {winRateCalc.result.toFixed(1)}% เพื่อไม่ขาดทุน
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">📈 ตัวอย่าง Breakeven:</h5>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>R:R 1:1 → ต้องชนะ 50%</li>
                      <li>R:R 1:2 → ต้องชนะ 33.3%</li>
                      <li>R:R 1:3 → ต้องชนะ 25%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compound Interest Calculator */}
          <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                Compound Interest Calculator
              </CardTitle>
              <CardDescription>คำนวณผลตอบแทนแบบทบต้น</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="principal">เงินต้น (บาท)</Label>
                    <Input
                      id="principal"
                      type="number"
                      placeholder="100000"
                      value={compoundCalc.principal}
                      onChange={(e) => setCompoundCalc(prev => ({ ...prev, principal: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="return-rate">ผลตอบแทนต่อเดือน (%)</Label>
                    <Input
                      id="return-rate"
                      type="number"
                      step="0.1"
                      placeholder="5"
                      value={compoundCalc.returnRate}
                      onChange={(e) => setCompoundCalc(prev => ({ ...prev, returnRate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="periods">จำนวนเดือน</Label>
                    <Input
                      id="periods"
                      type="number"
                      placeholder="12"
                      value={compoundCalc.periods}
                      onChange={(e) => setCompoundCalc(prev => ({ ...prev, periods: e.target.value }))}
                    />
                  </div>
                  <Button onClick={calculateCompound} className="w-full">
                    คำนวณผลตอบแทน
                  </Button>
                </div>
                <div className="space-y-4">
                  {compoundCalc.result !== null && (
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-xl border border-purple-500/30">
                      <h4 className="font-bold text-lg mb-4 text-purple-400">ผลการคำนวณ</h4>
                      <div className="space-y-2 text-sm">
                        <p>💰 เงินต้น: <strong>{Number(compoundCalc.principal).toLocaleString()} บาท</strong></p>
                        <p>📈 ผลตอบแทน: <strong>{compoundCalc.returnRate}% ต่อเดือน</strong></p>
                        <p>⏱️ ระยะเวลา: <strong>{compoundCalc.periods} เดือน</strong></p>
                        <div className="border-t border-purple-500/30 pt-3 mt-3 space-y-1">
                          <p className="text-lg font-bold text-purple-400">
                            🎯 ยอดรวม: {compoundCalc.result.final.toLocaleString()} บาท
                          </p>
                          <p className="text-green-400 font-semibold">
                            ✨ กำไร: +{compoundCalc.result.profit.toLocaleString()} บาท ({compoundCalc.result.profitPercent.toFixed(1)}%)
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">🚀 พลังของการทบต้น:</h5>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>ผลตอบแทนจะเพิ่มขึ้นแบบเร่งตัว</li>
                      <li>ยิ่งระยะเวลานาน ยิ่งได้ผลมาก</li>
                      <li>การลงทุนสม่ำเสมอเป็นกุญแจสำคัญ</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="psychology" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Trading Psychology
              </CardTitle>
              <CardDescription>
                จิตวิทยาและวินัยในการเทรด
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {psychologyTips.map((section, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <Brain className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-bold text-lg">{section.title}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {section.tips.map((tip, i) => (
                        <div key={i} className="group flex items-start gap-3 bg-gradient-to-r from-muted/50 to-muted/30 p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all hover:shadow-md">
                          <div className="mt-0.5">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                          </div>
                          <p className="text-sm leading-relaxed">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-500/30 bg-gradient-to-br from-red-500/5 to-orange-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-500">
                <AlertTriangle className="w-5 h-5" />
                Common Trading Mistakes
              </CardTitle>
              <CardDescription>ข้อผิดพลาดที่นักเทรดมักทำ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 bg-gradient-to-r from-red-500/10 to-red-500/5 rounded-lg border-l-4 border-red-500">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-500">Overtrading</p>
                      <p className="text-sm text-muted-foreground mt-1">เทรดมากเกินไปเพราะอยากได้กำไรเร็ว</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-orange-500/10 to-orange-500/5 rounded-lg border-l-4 border-orange-500">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-orange-500">Revenge Trading</p>
                      <p className="text-sm text-muted-foreground mt-1">พยายามเทรดเพื่อกู้คืนการขาดทุน</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 rounded-lg border-l-4 border-yellow-500">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-500">Moving Stop Loss</p>
                      <p className="text-sm text-muted-foreground mt-1">เลื่อน SL เพื่อหลีกเลี่ยงการขาดทุน</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-pink-500/10 to-pink-500/5 rounded-lg border-l-4 border-pink-500">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-pink-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-pink-500">FOMO (Fear of Missing Out)</p>
                      <p className="text-sm text-muted-foreground mt-1">เทรดเพราะกลัวพลาดโอกาส</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MoneyManagementTab;