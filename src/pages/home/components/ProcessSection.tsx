import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { processSteps } from '../../../mocks/holzen';

// Helper: build STEPS from i18n + mock images/icons
const useSteps = (t: (k: string) => string) => [
  { n: '01', title: t('process_step1_title'), subtitle: t('process_step1_subtitle'), desc: t('process_step1_desc'), tags: [t('process_step1_tag1'), t('process_step1_tag2')], image: processSteps[0].image },
  { n: '02', title: t('process_step2_title'), subtitle: t('process_step2_subtitle'), desc: t('process_step2_desc'), tags: [t('process_step2_tag1'), t('process_step2_tag2')], image: processSteps[1].image },
  { n: '03', title: t('process_step3_title'), subtitle: t('process_step3_subtitle'), desc: t('process_step3_desc'), tags: [t('process_step3_tag1'), t('process_step3_tag2')], image: processSteps[2].image },
  { n: '04', title: t('process_step4_title'), subtitle: t('process_step4_subtitle'), desc: t('process_step4_desc'), tags: [t('process_step4_tag1'), t('process_step4_tag2')], image: processSteps[3].image },
];

const STEP_ICONS = [
  'ri-plant-line',
  'ri-flask-line',
  'ri-sun-line',
  'ri-shield-check-line',
];

const ProcessSection = () => {
  const { t } = useTranslation();
  const STEPS = useSteps(t);
  const [active, setActive] = useState(0);

  const prev = useCallback(() => setActive((a) => (a - 1 + STEPS.length) % STEPS.length), []);
  const next = useCallback(() => setActive((a) => (a + 1) % STEPS.length), []);

  return (
    <section id="process" className="relative py-16 md:py-20 overflow-hidden">
      {/* Background base */}
      <div className="absolute inset-0 z-0" style={{ background: '#1C1008' }} />
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src="/Home/videos/fondo.mp4"
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(160deg, rgba(42,24,10,0.58) 0%, rgba(30,18,8,0.62) 50%, rgba(42,24,10,0.56) 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-px" style={{ background: '#7EC820' }} />
            <span className="tracking-[0.35em] uppercase" style={{ color: '#7EC820', fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', filter: 'drop-shadow(0 1px 6px rgba(0,0,0,0.7))' }}>
              {t('process_eyebrow')}
            </span>
            <span className="w-10 h-px" style={{ background: '#7EC820' }} />
          </div>
          <h2
            className="text-3xl md:text-4xl"
            style={{ fontFamily: "'Playfair Display', serif", color: '#F5E6D3', fontWeight: 900 }}
          >
            {t('process_title')} <em style={{ color: '#D4A843', fontStyle: 'italic', filter: 'drop-shadow(0 2px 8px rgba(212,168,67,0.5))', WebkitTextStroke: '0.4px #D4A843', fontWeight: 950 }}>{t('process_title_highlight')}</em>
          </h2>
        </div>

        {/* Carousel row */}
        <div className="relative flex items-center justify-center gap-0">

          {/* Left arrow */}
          <button
            onClick={prev}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 hover:scale-110 mr-4"
            style={{
              background: 'rgba(180,130,40,0.35)',
              border: '1.5px solid rgba(201,168,76,0.6)',
            }}
          >
            <i className="ri-arrow-left-s-line text-xl" style={{ color: '#C9A84C' }} />
          </button>

          {/* Cards */}
          <div className="flex items-center justify-center gap-3 flex-1 overflow-hidden">
            {STEPS.map((step, i) => {
              const isActive = i === active;
              const dist = Math.abs(i - active);
              const opacity = dist === 0 ? 1 : dist === 1 ? 0.65 : 0.35;

              return (
                <button
                  key={step.n}
                  onClick={() => setActive(i)}
                  className={`relative flex-shrink-0 cursor-pointer transition-all duration-500 rounded-2xl overflow-hidden flex flex-col items-center justify-end ${!isActive ? 'hidden md:flex' : 'flex'}`}
                  style={{
                    width: isActive ? 'min(240px, 100%)' : dist === 1 ? '160px' : '130px',
                    height: isActive ? '340px' : dist === 1 ? '230px' : '185px',
                    opacity,
                    border: isActive
                      ? '2px solid rgba(122,29,46,0.95)'
                      : '2px solid rgba(122,29,46,0.2)',
                    boxShadow: isActive
                      ? '0 0 32px rgba(122,29,46,0.55), inset 0 0 0 1px rgba(122,29,46,0.3)'
                      : '0 0 14px rgba(255,255,255,0.18)',
                    background: '#1C1008',
                  }}
                >
                  {/* Background image */}
                  <img
                    src={step.image}
                    alt={step.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                    style={{ transform: isActive ? 'scale(1.04)' : 'scale(1)' }}
                  />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isActive
                        ? 'linear-gradient(to top, rgba(20,10,2,0.95) 0%, rgba(20,10,2,0.4) 50%, rgba(20,10,2,0.1) 100%)'
                        : 'linear-gradient(to top, rgba(20,10,2,0.85) 0%, rgba(20,10,2,0.5) 100%)',
                    }}
                  />

                  {/* Step number badge */}
                  <div
                    className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold z-10"
                    style={{ background: 'linear-gradient(135deg, #B8862A 0%, #C9A84C 50%, #B8862A 100%)', color: '#1a0f05', boxShadow: '0 0 10px rgba(201,168,76,0.5)' }}
                  >
                    {i + 1}
                  </div>

                  {/* Active: circular image highlight */}
                  {isActive && (
                    <div
                      className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full overflow-hidden z-10"
                      style={{
                        border: '2.5px solid rgba(122,29,46,0.85)',
                        boxShadow: '0 0 20px rgba(122,29,46,0.55), 0 0 14px rgba(255,255,255,0.35)',
                      }}
                    >
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Icon (non-active) */}
                  {!isActive && (
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full z-10"
                      style={{
                        background: 'rgba(122,29,46,0.12)',
                        border: '1.5px solid rgba(122,29,46,0.45)',
                      }}
                    >
                      <i className={`${STEP_ICONS[i]} text-xl`} style={{ color: '#7A1D2E' }} />
                    </div>
                  )}

                  {/* Text content */}
                  <div className="relative z-10 w-full px-4 pb-5 text-center">
                    <h4
                      className="mb-2"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: '#F5E6D3',
                        fontSize: isActive ? '18px' : '13px',
                        fontWeight: 800,
                        letterSpacing: '0.02em',
                      }}
                    >
                      {step.title}
                    </h4>
                    {isActive && (
                      <>
                        <p className="text-xs leading-relaxed mb-3" style={{ color: '#D4C4B0', fontFamily: "'Playfair Display', serif", fontWeight: 500 }}>
                          {step.desc}
                        </p>
                        <div className="flex flex-wrap justify-center gap-1.5">
                          {step.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full"
                              style={{
                                background: 'rgba(20,12,2,0.75)',
                                border: '1px solid rgba(201,168,76,0.6)',
                                color: '#C9A84C',
                                fontFamily: "'Playfair Display', serif",
                                fontWeight: 800,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(201,168,76,0.15)',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 hover:scale-110 ml-4"
            style={{
              background: 'rgba(180,130,40,0.35)',
              border: '1.5px solid rgba(201,168,76,0.6)',
            }}
          >
            <i className="ri-arrow-right-s-line text-xl" style={{ color: '#C9A84C' }} />
          </button>
        </div>

        {/* Dot navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="cursor-pointer transition-all duration-300 rounded-full"
              style={{
                width: i === active ? '24px' : '7px',
                height: '7px',
                background: i === active ? 'linear-gradient(135deg, #3F0D17, #7A1D2E, #3F0D17)' : 'rgba(122,29,46,0.3)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
