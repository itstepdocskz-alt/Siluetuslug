import React from 'react';

export const Process: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Брифинг и отсмотр материала',
      description: 'Изучаю исходники, сценарий и референсы. Определяем ключевую эмоцию, целевой хронометраж и технические требования к релизу.',
    },
    {
      step: '02',
      title: 'Черновой монтаж и ритм',
      description: 'Выстраиваю каркас истории и драматургический темпоритм. Отсекаю лишнее, согласуем структуру повествования и основные склейки.',
    },
    {
      step: '03',
      title: 'Саунд-дизайн и колористика',
      description: 'Насыщаю монтаж звуком: чистка голоса, фактурный SFX и музыкальные акценты. Выполняю точную цветокоррекцию и грейдинг кадров.',
    },
    {
      step: '04',
      title: 'Финальный мастер и адаптации',
      description: 'Финальный экспорт в максимальном битрейте без артефактов. Подготовка версий под YouTube, Reels и социальные платформы.',
    },
  ];

  return (
    <section id="process" className="py-24 border-b border-[#363B35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-[#D5F45B] rounded-none inline-block" />
            <span className="text-xs font-mono tracking-widest uppercase text-[#B0B5AD]">
              03 / СТРУКТУРА ПРОИЗВОДСТВА
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#F2F1E9] tracking-tight">
            Процесс монтажа
          </h2>
        </div>

        {/* 4 Sequential Steps (Generous whitespace, scale, alignment — no cards inside cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
          
          {/* Subtle horizontal timeline track line across desktop */}
          <div className="hidden lg:block absolute top-7 left-0 right-0 h-[1px] bg-[#363B35] -z-0" />

          {steps.map((item, index) => (
            <div key={item.step} className="relative z-10 flex flex-col justify-between">
              <div>
                {/* Step Marker */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-[#1E211F] border border-[#363B35] flex items-center justify-center font-mono font-bold text-lg text-[#D5F45B] rounded-none">
                    {item.step}
                  </div>
                  {index < steps.length - 1 && (
                    <span className="lg:hidden text-[#363B35] font-mono">→</span>
                  )}
                </div>

                {/* Step Title */}
                <h3 className="font-display font-bold text-lg sm:text-xl text-[#F2F1E9] mb-3 leading-snug">
                  {item.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm text-[#B0B5AD] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Editorial bottom detail */}
              <div className="mt-8 pt-4 border-t border-[#363B35]/40 text-[11px] font-mono text-[#B0B5AD]/70 uppercase tracking-wider">
                Фаза {index + 1} из 4
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};
