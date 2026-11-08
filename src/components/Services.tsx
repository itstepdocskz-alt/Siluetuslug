import React from 'react';
import { ArrowUpRight } from 'lucide-react';

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
    <section id="services" className="py-24 border-b border-[#363B35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-[#D5F45B] rounded-none inline-block" />
            <span className="text-xs font-mono tracking-widest uppercase text-[#B0B5AD]">
              02 / НАПРАВЛЕНИЯ РАБОТЫ
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#F2F1E9] tracking-tight">
            Услуги монтажа
          </h2>
        </div>

        {/* Typographic Lines with Numbers and Hairline Dividers */}
        <div className="divide-y divide-[#363B35] border-y border-[#363B35]">
          {serviceList.map((service) => (
            <div
              key={service.number}
              className="py-10 group hover:bg-[#1E211F]/50 transition-colors duration-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                
                {/* Number & Title */}
                <div className="lg:col-span-5 flex items-start gap-6">
                  <span className="font-mono text-lg sm:text-xl text-[#D5F45B] font-bold tabular-nums">
                    {service.number}
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F2F1E9] group-hover:text-[#D5F45B] transition-colors duration-200">
                      {service.title}
                    </h3>
                    <div className="mt-2 text-xs font-mono text-[#B0B5AD]">
                      {service.output}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="lg:col-span-5">
                  <p className="text-sm sm:text-base text-[#B0B5AD] leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Clean unboxed features */}
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#F2F1E9]/80">
                    {service.features.map((feat, i) => (
                      <React.Fragment key={feat}>
                        <span>{feat}</span>
                        {i < service.features.length - 1 && (
                          <span className="text-[#363B35]" aria-hidden="true">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="lg:col-span-2 flex lg:justify-end items-center">
                  <button
                    onClick={onOpenInquiry}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#F2F1E9] group-hover:text-[#D5F45B] transition-colors duration-180"
                  >
                    <span>Заказать</span>
                    <ArrowUpRight className="w-4 h-4 text-[#D5F45B]" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
