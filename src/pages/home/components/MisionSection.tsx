import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const IMAGES = [
  '/Home/images/mision1.png',
  '/Home/images/mision2.png',
];

const AUTOPLAY_MS = 4500;



const MisionSection = () => {
  const { t } = useTranslation();
  const [cur, setCur] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => {
    if (transitioning || idx === cur) return;
    setTransitioning(true);
    setTimeout(() => {
      setCur(idx);
      setTransitioning(false);
    }, 400);
  };

  const advance = () => setCur((c) => (c + 1) % IMAGES.length);

  useEffect(() => {
    timerRef.current = setInterval(advance, AUTOPLAY_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="mision"
      ref={sectionRef}
      className="relative w-full bg-coffee-900 overflow-hidden py-16 px-6"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-center bg-cover pointer-events-none"
        style={{ backgroundImage: 'url(/Home/images/hero1.jpg)' }}
      />
      {/* Overlay suave guinda/marrón */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(160deg, rgba(42,24,10,0.52) 0%, rgba(30,18,8,0.56) 60%, rgba(42,24,10,0.50) 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-0 md:px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* LEFT — carousel (imagen + badge) */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-40px)',
            }}
          >
            {/* Header encima del carrusel */}
            <div className="mb-6">
              <p className="text-gold text-xs tracking-[0.4em] uppercase font-sans mb-3">
                {t('mision_eyebrow')}
              </p>
              <h2
                className="font-serif text-4xl md:text-5xl text-cream mb-3 max-w-md"
                style={{ fontWeight: 900, lineHeight: 1.15 }}
              >
                {t('mision_title')}
              </h2>
              <div
                className="h-[2px] w-16"
                style={{ background: 'linear-gradient(90deg, #7A1D2E, transparent)' }}
              />
            </div>

            {/* Badge "Desliza" — entre el título y las fotos */}
            <div className="mb-4">
              <div
                className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-2 rounded-full font-sans text-xs font-semibold tracking-[0.18em] uppercase select-none cursor-default"
                style={{
                  background: 'linear-gradient(135deg, #3F0D17 0%, #7A1D2E 50%, #3F0D17 100%)',
                  color: '#fff8f0',
                  boxShadow: '0 0 18px rgba(122,29,46,0.6), 0 0 10px rgba(201,169,110,0.25)',
                  whiteSpace: 'nowrap',
                }}
              >
                <i className="ri-drag-move-line text-sm" />
                {t('mision_badge_swipe')}
                <span
                  className="absolute top-0 bottom-0 w-1/3 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
                    animation: 'misionShimmer 2.2s ease-in-out infinite',
                  }}
                />
              </div>
            </div>

            {/* Carousel container */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(201,168,76,0.2)', minHeight: '420px', maxHeight: '560px' }}
            >
              {IMAGES.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Misión ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                  style={{
                    opacity: i === cur ? 1 : 0,
                    transform: i === cur ? 'scale(1)' : 'scale(1.03)',
                  }}
                />
              ))}

              {/* Gradient overlay bottom */}
              <div
                className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(15,8,3,0.85), transparent)' }}
              />

              {/* Dots */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                {IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="relative h-[3px] rounded-full overflow-hidden cursor-pointer transition-all duration-300"
                    style={{
                      width: i === cur ? '48px' : '16px',
                      background: 'rgba(201,169,110,0.25)',
                    }}
                  >
                    {i === cur && (
                      <span
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: '#C9A84C',
                          animation: `misionProgress ${AUTOPLAY_MS}ms linear forwards`,
                          transformOrigin: 'left',
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Arrow buttons */}
              <button
                onClick={() => goTo((cur - 1 + IMAGES.length) % IMAGES.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full cursor-pointer transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(20,10,5,0.55)', border: '1px solid rgba(201,168,76,0.25)' }}
              >
                <i className="ri-arrow-left-s-line text-cream text-lg" />
              </button>
              <button
                onClick={() => goTo((cur + 1) % IMAGES.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full cursor-pointer transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(20,10,5,0.55)', border: '1px solid rgba(201,168,76,0.25)' }}
              >
                <i className="ri-arrow-right-s-line text-cream text-lg" />
              </button>
            </div>
          </div>

          {/* RIGHT — frase + dos cuadros con los párrafos de la misión */}
          <div
            className="transition-all duration-700 delay-200 flex flex-col gap-5 lg:pt-36"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
            }}
          >
            {/* Frase tagline — alineada al título izquierdo */}
            <p
              className="font-serif italic font-black leading-snug"
              style={{
                color: '#C9A84C',
                fontSize: 'clamp(1.4rem, 2.8vw, 2.6rem)',
                textShadow: '0 1px 6px rgba(0,0,0,0.4)',
                marginTop: '-8rem',
              }}
            >
              {t('mision_tagline')}
            </p>

            {[t('mision_paragraph_1'), t('mision_paragraph_2')].map((para, i) => (
              <div
                key={i}
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(20,10,5,0.65)',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(201,168,76,0.15)',
                }}
              >
                <i
                  className="ri-double-quotes-l text-gold/40 block mb-3"
                  style={{ fontSize: '1.6rem' }}
                />
                <p className="font-serif text-cream/90 text-xs md:text-sm leading-relaxed">
                  {para}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes misionProgress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes misionShimmer {
          0%   { transform: translateX(-150%); }
          60%  { transform: translateX(250%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </section>
  );
};

export default MisionSection;
