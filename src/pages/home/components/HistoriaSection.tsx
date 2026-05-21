import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// ── Carrusel manual con flechas ───────────────────────────────────────────────
const Carrusel = ({ cards, pressLabel }: { cards: string[]; pressLabel: string }) => {
  const [cur, setCur] = useState(0);
  const [anim, setAnim] = useState<'out' | null>(null);

  const goTo = (next: number) => {
    const idx = (next + cards.length) % cards.length;
    if (idx === cur) return;
    setAnim('out');
    setTimeout(() => {
      setCur(idx);
      setAnim(null);
    }, 250);
  };

  const cardStyle: React.CSSProperties = {
    background: 'rgba(15,8,3,0.55)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    border: '1px solid rgba(201,168,76,0.18)',
    borderRadius: '1rem',
    padding: '1.5rem',
    transition: 'opacity 0.25s ease, transform 0.25s ease',
    opacity: anim === 'out' ? 0 : 1,
    transform: anim === 'out' ? 'translateY(6px)' : 'translateY(0)',
    minHeight: '160px',
  };

  const btnStyle: React.CSSProperties = {
    width: '2.1rem',
    height: '2.1rem',
    borderRadius: '50%',
    border: '1px solid rgba(201,168,76,0.3)',
    background: 'rgba(20,10,5,0.6)',
    color: '#fff8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '1rem',
    flexShrink: 0,
  };

  return (
    <div>
      {/* Hint button */}
      {cards.length > 1 && (
        <div style={{ marginBottom: '0.7rem' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'linear-gradient(135deg, #5A0D1E 0%, #7A1D2E 100%)',
            color: '#fff',
            fontSize: '0.68rem',
            fontFamily: 'sans-serif',
            letterSpacing: '0.08em',
            padding: '0.3rem 0.85rem',
            borderRadius: '9999px',
            boxShadow: '0 0 12px rgba(122,29,46,0.45)',
          }}>
            <i className="ri-arrow-left-right-line" style={{ fontSize: '0.75rem' }} />
            {pressLabel}
          </span>
        </div>
      )}

      {/* Card */}
      <div style={cardStyle}>
        <i className="ri-double-quotes-l" style={{ color: 'rgba(201,169,110,0.35)', fontSize: '1.5rem', display: 'block', marginBottom: '0.6rem' }} />
        <p style={{ fontFamily: "'Playfair Display', serif", color: 'rgba(255,248,240,0.88)', fontSize: '0.82rem', lineHeight: 1.8 }}>
          {cards[cur]}
        </p>
      </div>

      {/* Flechas + dots */}
      {cards.length > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.8rem' }}>
          <button style={btnStyle} onClick={() => goTo(cur - 1)} aria-label="Anterior">
            <i className="ri-arrow-left-s-line" />
          </button>

          <div style={{ display: 'flex', gap: '0.4rem', flex: 1, justifyContent: 'center' }}>
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  height: '3px',
                  width: i === cur ? '36px' : '12px',
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

          <button style={btnStyle} onClick={() => goTo(cur + 1)} aria-label="Siguiente">
            <i className="ri-arrow-right-s-line" />
          </button>
        </div>
      )}
    </div>
  );
};

// ── Subtítulo dorado ──────────────────────────────────────────────────────────
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

// ── Sección principal ─────────────────────────────────────────────────────────
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
  const pressLabel: string = t('historia_press');

  return (
    <section
      id="historia"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: '600px' }}
    >
      {/* Video fondo */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <source src="/Home/videos/video4.mp4" type="video/mp4" />
      </video>

      {/* Overlay más suave para ver el video */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(160deg, rgba(20,8,3,0.52) 0%, rgba(10,5,2,0.58) 60%, rgba(20,8,3,0.50) 100%)',
          zIndex: 1,
        }}
      />

      {/* Contenido */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16" style={{ zIndex: 2 }}>
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* LEFT: texto */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-36px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}>
            <p style={{ color: '#C9A84C', fontSize: '0.7rem', letterSpacing: '0.4em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '0.75rem' }}>
              {t('historia_eyebrow')}
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              color: '#fff8f0',
              lineHeight: 1.15,
              marginBottom: '0.5rem',
              maxWidth: '480px',
            }}>
              {t('historia_title_line1')}<br />{t('historia_title_line2')}
            </h2>
            <div style={{ height: '2px', width: '64px', background: 'linear-gradient(90deg, #7A1D2E, transparent)', marginBottom: '1.4rem' }} />

            <Carrusel cards={cards1} pressLabel={pressLabel} />
            <GoldenTitle text="COMPARTO TU ESPERANZA" />
            <Carrusel cards={cards2} pressLabel={pressLabel} />
            <GoldenTitle text="SALKANTAY ANDINO" />
            <Carrusel cards={cards3} pressLabel={pressLabel} />
          </div>

          {/* RIGHT: imagen sticky */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(36px)',
            transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            position: 'sticky',
            top: '6rem',
          }}>
            <div style={{
              borderRadius: '1.25rem',
              overflow: 'hidden',
              border: '1px solid rgba(201,168,76,0.2)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
            }}>
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
