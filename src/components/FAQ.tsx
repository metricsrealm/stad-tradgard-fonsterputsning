import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '../types';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "Vad ingår i en professionell fönsterputsning?",
      answer: "I vår fönsterputsning ingår noggrann rengöring av fönsterrutor och balkongdörrar på in- och utsida samt avtorkning av karmar och fönsterbänkar. Har du fönster som kan delas putsas de på samtliga fyra sidor."
    },
    {
      question: "Får jag någon garanti på fönsterputsningen?",
      answer: "Självklart! Vi lämnar alltid 100% nöjd-kund-garanti. Skulle du mot förmodan inte vara helt nöjd med resultatet återvänder vi och åtgärdar det kostnadsfritt."
    },
    {
      question: "Hur fungerar RUT-avdraget för fönsterputsning?",
      answer: "Som privatperson får du 50% RUT-avdrag direkt på arbetskostnaden. Vi drar av beloppet direkt på fakturan och sköter all administration med Skatteverket åt dig."
    },
    {
      question: "Behöver jag förbereda något innan ni kommer?",
      answer: "För att vi ska kunna arbeta så smidigt som möjligt ber vi dig plocka bort blommor och föremål från fönsterbänkarna samt dra undan gardiner. Vi tar med oss all nödvändig utrustning och miljövänliga medel."
    }
  ];

  const handleToggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-12 md:py-16 bg-[#F8FAFC] border-b border-gray-200/80" id="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-[560px] mx-auto mb-8 reveal-on-scroll">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1C2833] font-display">
            Vanliga frågor och svar
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#5D6D7E] text-center">
            Här hittar du svar på de vanligaste frågorna inför din bokning.
          </p>
        </div>

        <div className="space-y-4" id="faq-accordions">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300 reveal-on-scroll ${
                  idx === 1 ? 'delay-75' : idx === 2 ? 'delay-150' : idx === 3 ? 'delay-200' : ''
                }`}
              >
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full text-left px-6 py-5 md:px-7 md:py-5 flex items-center justify-between gap-4 font-bold text-gray-900 hover:text-brand transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold font-display text-[#1C2833] leading-tight">
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full bg-red-50/80 flex-shrink-0 text-[#EC4C44] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'rotate-180 bg-red-100' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 py-5 md:px-7 md:py-6 text-sm md:text-base text-gray-600 leading-relaxed bg-white border-t border-gray-100">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

