const Testimonials = () => {
  const testimonials = [
    {
      name: "สมชาย วงศ์สว่าง",
      role: "Full-time Trader",
      image: "https://api.dicebear.com/7.x/notionists/svg?seed=somchai&backgroundColor=c0aede",
      content: "จากคนที่เทรดมั่วมาหลายปี ตอนนี้ผมเทรดเป็นอาชีพหลักได้แล้ว ต้องขอบคุณคอร์สนี้จริงๆ ที่ทำให้ผมเข้าใจระบบการเทรดที่ถูกต้อง มีแผนการเทรดที่ชัดเจน",
      profit: "+285% in 6 months"
    },
    {
      name: "ปิยะนุช สมศรี",
      role: "Part-time Trader",
      image: "https://api.dicebear.com/7.x/lorelei/svg?seed=piyanuch&backgroundColor=ffd5dc",
      content: "เรียนมา 3 เดือน ทำกำไรได้คืนค่าคอร์สแล้ว! ชอบที่เนื้อหาเข้าใจง่าย และกลุ่ม Community ที่ช่วยเหลือกันดีมาก แชร์กลยุทธ์กันตลอด",
      profit: "+150% ROI"
    },
    {
      name: "ธนพล ศรีสุข",
      role: "Crypto Investor",
      image: "https://api.dicebear.com/7.x/lorelei/svg?seed=thanapol&backgroundColor=b6e3f4",
      content: "เนื้อหาละเอียดมาก ตั้งแต่พื้นฐานจนถึงขั้นสูง มี Strategy ให้เลือกใช้หลายแบบ เหมาะกับทุกสไตล์การเทรด ผมใช้แค่ 2 Strategy ก็ทำกำไรได้สม่ำเสมอแล้ว",
      profit: "+420% Portfolio Growth"
    },
    {
      name: "วิภาวี จันทร์เพ็ญ",
      role: "Forex Trader",
      image: "https://api.dicebear.com/7.x/notionists/svg?seed=wipawee&backgroundColor=d1d4f9",
      content: "คอร์สนี้เปลี่ยนชีวิตฉันจริงๆ จากพนักงานออฟฟิศ ตอนนี้เทรดเป็นรายได้เสริม เดือนละ 30,000-50,000 บาท แนะนำเลยค่ะ คุ้มมาก!",
      profit: "฿50K/month average"
    },
    {
      name: "อนุชา ทองคำ",
      role: "Stock & Crypto Trader",
      image: "https://api.dicebear.com/7.x/notionists/svg?seed=anucha&backgroundColor=ffdfbf",
      content: "เรียนคอร์สมาเยอะ แต่คอร์สนี้ดีที่สุด มี Live Trading ให้ดู มี Backtest Results ชัดเจน ไม่ใช่แค่ทฤษฎี แต่ใช้ได้จริง",
      profit: "Consistent 20%/month"
    },
    {
      name: "สุภาพร แก้วใส",
      role: "Beginner Trader",
      image: "https://api.dicebear.com/7.x/lorelei/svg?seed=supaporn&backgroundColor=ffeaa7",
      content: "เพิ่งเริ่มเทรดได้ 2 เดือน จากที่ไม่รู้อะไรเลย ตอนนี้อ่านกราฟเป็น มี Strategy เป็นของตัวเอง ขอบคุณทีมงานที่ดูแลดีมากๆ ค่ะ",
      profit: "First profit in week 3"
    }
  ]

  return (
    <section id="testimonials" className="py-20 px-4 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            เสียงจาก
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"> นักเรียนของเรา</span>
          </h2>
          <p className="text-xl text-gray-400">
            ความสำเร็จที่พิสูจน์ได้จริงจากผู้ที่ผ่านคอร์ส
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 hover:border-yellow-500/30 transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 text-6xl text-yellow-500/20">"</div>

              {/* Profile */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 p-0.5"
                />
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-300 mb-4 leading-relaxed">
                {testimonial.content}
              </p>

              {/* Profit Badge */}
              <div className="inline-flex items-center px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                <span className="text-sm font-semibold text-green-400">
                  {testimonial.profit}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700">
            <svg className="w-8 h-8 mx-auto mb-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <div className="text-lg font-semibold text-white mb-1">เริ่มเรียนได้ทันที</div>
            <div className="text-sm text-gray-400">ไม่ต้องมีพื้นฐาน</div>
          </div>
          <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700">
            <svg className="w-8 h-8 mx-auto mb-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <div className="text-lg font-semibold text-white mb-1">สอนให้เข้าใจ</div>
            <div className="text-sm text-gray-400">ไม่ใช่ท่องจำ</div>
          </div>
          <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700">
            <svg className="w-8 h-8 mx-auto mb-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <div className="text-lg font-semibold text-white mb-1">เรียนซ้ำกี่รอบก็ได้</div>
            <div className="text-sm text-gray-400">จนกว่าจะเข้าใจ</div>
          </div>
          <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700">
            <svg className="w-8 h-8 mx-auto mb-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <div className="text-lg font-semibold text-white mb-1">เรียนได้ทุกอุปกรณ์</div>
            <div className="text-sm text-gray-400">24/7</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials