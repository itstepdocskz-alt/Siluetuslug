import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesProps {
  onOpenInquiry: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenInquiry }) => {
  const serviceList = [
    {
      number: '01',
      title: 'YouTube-шоу и блоги',
      description: 'Монтаж длинных форматов с плотным удержанием аудитории. Проработка драматургии выпуска, вычищение смыслового шума, расстановка смысловых акцентов и многокамерная синхронизация.',
      features: ['Документальные видео', 'Разговорные подкасты', 'Экспертные выпуски', 'Travel & Lifestyle'],
      output: '4K / Full HD · 16:9 · Главы и превью',
    },
    {
      number: '02',
      title: 'Reels, Shorts & TikTok',
      description: 'Кинетический вертикальный монтаж с продуманным визуальным хуком в первые 2 секунды. Точный ритм под звук, плавная динамика, акцентная анимация титров без перегрузки.',
      features: ['Виральные ролики', 'Нарезка из подкастов', 'Fashion & Streetwear', 'Бизнес-рилс'],
      output: '9:16 Full HD · Анимированные субтитры',
    },
    {
      number: '03',
      title: 'Промо, брендинг и реклама',
      description: 'Лаконичный имиджевый монтаж для компаний и брендов. Высокая плотность визуальной эстетики, строгая передача ценностей продукта и филигранный ритм.',
      features: ['Презентации продуктов', 'Имиджевые манифесты', 'Шоурилы и кейсы', 'Таргетированная реклама'],
      output: 'Master ProRes / H.265 · Адаптации 16:9 / 9:16 / 1:1',
    },
    {
      number: '04',
      title: 'Саунд-дизайн и колористика',
      description: 'Создание кинематографичного звукового пространства. Подбор атмосферных фактур, многослойный SFX, реставрация голоса спикера и авторский грейдинг в DaVinci Resolve.',
      features: ['Многослойный SFX', 'Очистка голоса от шумов', 'Сведение и мастеринг', 'Пленочная колористика'],
      output: '24-bit WAV Audio · Спектральная очистка',
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 border-b border-[#2e332d] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-[1.5px] bg-[#D5F45B]" />
            <span className="text-xs font-mono tracking-widest uppercase text-[#B0B5AD]">
              02 / НАПРАВЛЕНИЯ РАБОТЫ
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#F2F1E9] tracking-tight">
            Услуги монтажа
          </h2>
        </div>

        {/* Typographic Lines with Numbers and Hairline Dividers */}
        <div className="divide-y divide-[#2e332d] border-y border-[#2e332d]">
          {serviceList.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="py-12 group hover:bg-[#161817]/60 transition-all duration-300 px-4 -mx-4"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                
                {/* Number & Title */}
                <div className="lg:col-span-5 flex items-start gap-6">
                  <span className="font-mono text-2xl text-[#D5F45B] font-bold tabular-nums group-hover:scale-110 transition-transform duration-200">
                    {service.number}
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F2F1E9] group-hover:text-[#D5F45B] transition-colors duration-200">
                      {service.title}
                    </h3>
                    <div className="mt-2 text-xs font-mono text-[#D5F45B]/80">
                      {service.output}
                    </div>
                  </div>
                </div>

                {/* Description & Features */}
                <div className="lg:col-span-5">
                  <p className="text-sm sm:text-base text-[#B0B5AD] leading-relaxed mb-4">
                    {service.description}
                  </p>
                  
                  {/* Clean unboxed features */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#F2F1E9]/80 font-mono">
                    {service.features.map((feat, i) => (
                      <React.Fragment key={feat}>
                        <span className="hover:text-[#D5F45B] transition-colors">{feat}</span>
                        {i < service.features.length - 1 && (
                          <span className="text-[#363B35]">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Action CTA with Glow */}
                <div className="lg:col-span-2 flex lg:justify-end items-center">
                  <button
                    onClick={onOpenInquiry}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#F2F1E9] bg-[#121413] border border-[#2e332d] group-hover:border-[#D5F45B] group-hover:text-[#D5F45B] transition-all duration-200 shadow-sm group-hover:shadow-[0_0_15px_rgba(213,244,91,0.2)]"
                  >
                    <span>Заказать</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#D5F45B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
