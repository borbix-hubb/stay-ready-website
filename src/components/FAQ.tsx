import { useState } from 'react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "ใครเหมาะกับคอร์สนี้?",
      answer: "คอร์สนี้เหมาะสำหรับทุกคน ไม่ว่าจะเป็นมือใหม่ที่ไม่เคยเทรดเลย หรือคนที่เทรดอยู่แล้วแต่ยังไม่มีระบบที่ชัดเจน เรามีเนื้อหาตั้งแต่พื้นฐานจนถึงขั้นสูง"
    },
    {
      question: "ต้องมีทุนเท่าไหร่ถึงจะเริ่มได้?",
      answer: "คุณสามารถเริ่มได้ด้วยทุนเพียง $100 หรือประมาณ 3,500 บาท แต่เราแนะนำให้เริ่มด้วย Demo Account ก่อนเพื่อฝึกฝนจนมั่นใจ"
    },
    {
      question: "เรียนแล้วทำกำไรได้จริงหรือไม่?",
      answer: "92% ของนักเรียนที่ตั้งใจเรียนและปฏิบัติตาม Strategy ที่สอน สามารถทำกำไรได้ภายใน 1-3 เดือนแรก แต่ผลลัพธ์ขึ้นอยู่กับการฝึกฝนและวินัยของแต่ละคน"
    },
    {
      question: "มีการรับประกันผลกำไรหรือไม่?",
      answer: "เราไม่รับประกันผลกำไร เพราะการเทรดมีความเสี่ยง แต่เรารับประกันคุณภาพของเนื้อหา และมีการคืนเงิน 100% ภายใน 30 วัน หากไม่พอใจ"
    },
    {
      question: "คอร์สมีระยะเวลาเรียนกี่นาน?",
      answer: "คอร์สมีเนื้อหารวมกว่า 100 ชั่วโมง แบ่งเป็นบทเรียนย่อย สามารถเรียนตามความสะดวก โดยเฉลี่ยใช้เวลา 2-3 เดือนในการเรียนจบ"
    },
    {
      question: "หลังเรียนจบแล้วยังได้รับการ Support หรือไม่?",
      answer: "ได้ครับ/ค่ะ เรามีทีม Support 24/7 และ Community Group ที่พร้อมช่วยเหลือตลอด รวมถึงการ Update เนื้อหาใหม่ฟรีตลอดการเป็นสมาชิก"
    },
    {
      question: "เรียนผ่าน Mobile ได้หรือไม่?",
      answer: "ได้ครับ/ค่ะ เรามี Mobile App ทั้ง iOS และ Android รองรับการเรียนทุกที่ทุกเวลา พร้อมระบบ Offline Mode"
    },
    {
      question: "มี Certificate หลังเรียนจบหรือไม่?",
      answer: "มีครับ/ค่ะ เมื่อเรียนจบและผ่านการทดสอบ จะได้รับ Certificate ที่สามารถนำไปใช้อ้างอิงในการสมัครงานหรือเพิ่มความน่าเชื่อถือได้"
    }
  ]

  return (
    <section id="faq" className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            คำถามที่
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"> พบบ่อย</span>
          </h2>
          <p className="text-xl text-gray-400">
            หากมีคำถามเพิ่มเติม สามารถติดต่อทีมงานได้ตลอด 24/7
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-colors duration-300"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-800/30 transition-colors duration-200"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-white text-lg">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-yellow-400 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">ยังมีคำถาม?</p>
          <button className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg font-semibold text-slate-900 hover:shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-0.5 transition-all duration-300">
            ติดต่อทีมงาน
          </button>
        </div>
      </div>
    </section>
  )
}

export default FAQ