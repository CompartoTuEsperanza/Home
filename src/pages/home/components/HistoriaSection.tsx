import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// ── Carrusel genérico ──────────────────────────────────────────────────────────
const Carrusel = ({ cards }: { cards: string[] }) => {
  const [cur, setCur] = useState(0);
  const [anim, setAnim] = useState<'in' | 'out' | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (next: number) => {
    if (next === cur) return;
    setAnim('out');
    setTimeout(() => {
      setCur(next);
      setAnim('in');
      setTimeout(() => setAnim(null), 350);
    }, 280);
  };

  const advance = () => setCur((c) => (c + 1) % cards.length);

  useEffect(() => {
    timerRef.current = setInterval(advance, 6000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [cards.length]);

  const cardStyle: React.CSSProperties = {
    background: 'rgba(15,8,3,0.62)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(201,168,76,0.18)',
    borderRadius: '1rem',
    padding: '1.5rem',
    transition: 'opacity 0.28s ease, transform 0.28s ease',
    opacity: anim === 'out' ? 0 : 1,
    transform: anim === 'out' ? 'translateY(8px)' : 'translateY(0)',
    minHeight: '160px',
  };

  return (
    <div>
      <div style={cardStyle}>
        <i className="ri-double-quotes-l" style={{ color: 'rgba(201,169,110,0.35)', fontSize: '1.5rem', display: 'block', marginBottom: '0.6rem' }} />
        <p style={{ fontFamily: "'Playfair Display', serif", color: 'rgba(255,248,240,0.88)', fontSize: '0.82rem', lineHeight: 1.75 }}>
          {cards[cur]}
        </p>
      </div>

      {/* Dots */}
      {cards.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.9rem' }}>
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                height: '3px',
                width: i === cur ? '40px' : '14px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                background: i === cur ? '#C9A84C' : 'rgba(201,169,110,0.25)',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ── Bloque de subtítulo dorado (COMPARTO / SALKANTAY) ─────────────────────────
const GoldenTitle = ({ text }: { text: string }) => (
  <div style={{ margin: '1.6rem 0 0.9rem' }}>
    <p style={{
      fontFamily: "'Playfair Display', serif",
      fontWeight: 900,
      fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)',
      letterSpacing: '0.06em',
      background: 'linear-gradient(90deg, #C9A84C, #f0d080, #C9A84C)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      lineHeight: 1.2,
    }}>
      {text}
    </p>
    <div style={{ height: '2px', width: '48px', background: 'linear-gradient(90deg, #C9A84C, transparent)', marginTop: '0.4rem' }} />
  </div>
);

// ── Sección principal ──────────────────────────────────────────────────────────
const HistoriaSection = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const cards1: string[] = t('historia_cards1', { returnObjects: true }) as string[];
  const cards2: string[] = t('historia_cards2', { returnObjects: true }) as string[];
  const cards3: string[] = t('historia_cards3', { returnObjects: true }) as string[];

  return (
    <section
      id="historia"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: '600px' }}
    >
      {/* Fondo: video */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <source src="/Home/videos/video4.mp4" type="video/mp4" />
      </video>

      {/* Overlay oscuro */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(160deg, rgba(20,8,3,0.72) 0%, rgba(10,5,2,0.78) 60%, rgba(20,8,3,0.70) 100%)',
          zIndex: 1,
        }}
      />

      {/* Contenido */}
      <div
        className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16"
        style={{ zIndex: 2 }}
      >
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* ── LEFT: texto ── */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-36px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            {/* Eyebrow + Título */}
            <p style={{ color: '#C9A84C', fontSize: '0.7rem', letterSpacing: '0.4em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '0.75rem' }}>
              {t('historia_eyebrow')}
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                color: '#fff8f0',
                lineHeight: 1.15,
                marginBottom: '0.5rem',
                maxWidth: '480px',
              }}
            >
              {t('historia_title_line1')}<br />{t('historia_title_line2')}
            </h2>
            <div style={{ height: '2px', width: '64px', background: 'linear-gradient(90deg, #7A1D2E, transparent)', marginBottom: '1.4rem' }} />

            {/* Bloque 1: historia hasta COMPARTO */}
            <Carrusel cards={cards1} />

            {/* Subtítulo COMPARTO TU ESPERANZA */}
            <GoldenTitle text="COMPARTO TU ESPERANZA" />

            {/* Bloque 2: texto COMPARTO */}
            <Carrusel cards={cards2} />

            {/* Subtítulo SALKANTAY ANDINO */}
            <GoldenTitle text="SALKANTAY ANDINO" />

            {/* Bloque 3: texto SALKANTAY */}
            <Carrusel cards={cards3} />
          </div>

          {/* ── RIGHT: imagen ── */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(36px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
              position: 'sticky',
              top: '6rem',
            }}
          >
            <div
              style={{
                borderRadius: '1.25rem',
                overflow: 'hidden',
                border: '1px solid rgba(201,168,76,0.2)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
              }}
            >
              <img
                src="/Home/images/fondito.png"
                alt="La historia detrás del sueño"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', maxHeight: '680px' }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HistoriaSection;
