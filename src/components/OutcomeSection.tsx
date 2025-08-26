const OutcomeSection = () => {
  const outcomes = [
    {
      title: "อ่านกราฟได้ด้วยตัวเอง",
      description: "ไม่ต้องง้อใครวิเคราะห์"
    },
    {
      title: "ตีกราฟเป็น เข้าใจโครงสร้างตลาด",
      description: "มองออกว่าแนวโน้มกำลังจะไปทางไหน"
    },
    {
      title: "รู้จุดเข้า–จุดออกชัดเจน",
      description: "ลดการเทรดมั่ว ๆ ที่ทำให้ล้างพอร์ต"
    },
    {
      title: "เริ่มต้นได้แม้มีทุนน้อย",
      description: "สร้างกำไรแบบค่อยเป็นค่อยไป ยั่งยืน ไม่ใช่รวยเร็วแล้วหมดตัว"
    },
    {
      title: "สร้างระบบการเทรดของตัวเอง",
      description: "กลายเป็นเทรดเดอร์ที่พึ่งพาตัวเองได้จริง"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
            สิ่งที่คุณจะได้เรียนรู้
          </h2>
          <p className="text-xl text-gray-300">
            เปลี่ยนจากมือใหม่เป็นเทรดเดอร์ที่พึ่งพาตัวเองได้
          </p>
        </div>

        {/* Outcomes List */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {outcomes.map((outcome, index) => (
            <div
              key={index}
              className="group flex items-start space-x-4 p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-green-500/50 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">
                  {outcome.title}
                </h3>
                <p className="text-gray-400">
                  {outcome.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OutcomeSection