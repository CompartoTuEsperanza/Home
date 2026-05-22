import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// ── Carrusel manual ───────────────────────────────────────────────────────────
const Carrusel = ({ cards, pressLabel }: { cards: string[]; pressLabel: string }) => {
  const [cur, setCur] = useState(0);
  const [anim, setAnim] = useState(false);

  const goTo = (next: number) => {
    const idx = (next + cards.length) % cards.length;
    if (idx === cur) return;
    setAnim(true);
    setTimeout(() => { setCur(idx); setAnim(false); }, 230);
  };

  const cardStyle: React.CSSProperties = {
    background: 'rgba(15,8,3,0.50)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    border: '1px solid rgba(201,168,76,0.18)',
    borderRadius: '1rem',
    padding: '1.25rem',
    transition: 'opacity 0.23s ease, transform 0.23s ease',
    opacity: anim ? 0 : 1,
    transform: anim ? 'translateY(6px)' : 'translateY(0)',
    minHeight: '120px',
  };

  const arrowBtn: React.CSSProperties = {
    width: '2rem', height: '2rem', borderRadius: '50%',
    border: '1px solid rgba(201,168,76,0.3)',
    background: 'rgba(20,10,5,0.55)',
    color: '#fff8f0', display: 'flex', alignItems: 'center',
    justifyContent: 'center', cursor: 'pointer', fontSize: '1rem', flexShrink: 0,
  };

  return (
    <div>
      {cards.length > 1 && (
        <div style={{ marginBottom: '0.6rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: 'linear-gradient(135deg,#5A0D1E 0%,#7A1D2E 100%)',
            color: '#fff', fontSize: '0.72rem', fontFamily: "'Playfair Display', serif", fontWeight: 700,
            letterSpacing: '0.07em', padding: '0.28rem 0.8rem',
            borderRadius: '9999px', boxShadow: '0 0 10px rgba(122,29,46,0.4)',
          }}>
            <i className="ri-arrow-left-right-line" style={{ fontSize: '0.72rem' }} />
            {pressLabel}
          </span>
        </div>
      )}

      <div style={cardStyle}>
        <i className="ri-double-quotes-l" style={{ color: 'rgba(201,169,110,0.32)', fontSize: '1.3rem', display: 'block', marginBottom: '0.5rem' }} />
        <p style={{ fontFamily: "'Playfair Display',serif", color: 'rgba(255,248,240,0.88)', fontSize: '0.8rem', lineHeight: 1.8 }}>
          {cards[cur]}
        </p>
      </div>

      {cards.length > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.65rem' }}>
          <button style={arrowBtn} onClick={() => goTo(cur - 1)}><i className="ri-arrow-left-s-line" /></button>
          <div style={{ display: 'flex', gap: '0.35rem', flex: 1, justifyContent: 'center' }}>
            {cards.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{
                height: '3px', width: i === cur ? '32px' : '10px',
                borderRadius: '9999px', border: 'none', cursor: 'pointer',
                background: i === cur ? '#C9A84C' : 'rgba(201,169,110,0.25)',
                transition: 'all 0.3s ease', padding: 0,
              }} />
            ))}
          </div>
          <button style={arrowBtn} onClick={() => goTo(cur + 1)}><i className="ri-arrow-right-s-line" /></button>
        </div>
      )}
    </div>
  );
};

// ── Subtítulo dorado más grande y más amarillo ────────────────────────────────
const GoldenTitle = ({ text }: { text: string }) => (
  <div style={{ margin: '1.2rem 0 0.7rem' }}>
    <p style={{
      fontFamily: "'Playfair Display',serif", fontWeight: 900,
      fontSize: 'clamp(1.2rem, 2.6vw, 1.7rem)', letterSpacing: '0.06em',
      background: 'linear-gradient(90deg,#FFD700,#FFE44D,#FFD700)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      backgroundClip: 'text', lineHeight: 1.2,
    }}>{text}</p>
    <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg,#FFD700,transparent)', marginTop: '0.3rem' }} />
  </div>
);

// ── Sección principal ─────────────────────────────────────────────────────────
const HistoriaSection = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const cards1: string[] = t('historia_cards1', { returnObjects: true }) as string[];
  const cards2: string[] = t('historia_cards2', { returnObjects: true }) as string[];
  const cards3: string[] = t('historia_cards3', { returnObjects: true }) as string[];
  const pressLabel: string = t('historia_press');

  const fadeLeft: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0)' : 'translateX(-30px)',
    transition: 'opacity 0.7s ease, transform 0.7s ease',
  };
  const fadeRight: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0)' : 'translateX(30px)',
    transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
  };

  return (
    <section id="historia" ref={sectionRef} className="relative w-full overflow-hidden" style={{ minHeight: '600px' }}>

      {/* Fondo */}
      <div className="absolute inset-0 bg-center bg-cover pointer-events-none"
        style={{ backgroundImage: 'url(/Home/images/fondos.jpg)', zIndex: 0 }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(160deg,rgba(15,5,2,0.38) 0%,rgba(8,3,1,0.44) 60%,rgba(15,5,2,0.36) 100%)',
        zIndex: 1,
      }} />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16" style={{ zIndex: 2 }}>

        {/* ── Fila superior: bloque historia (izq) + COMPARTO (der) ── */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* LEFT: eyebrow + título + carrusel historia */}
          <div style={fadeLeft}>
            <p style={{ color: '#C9A84C', fontSize: '0.85rem', letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: "'Playfair Display', serif", fontWeight: 800, marginBottom: '0.7rem', textShadow: '0 1px 6px rgba(0,0,0,0.3)' }}>
              {t('historia_eyebrow')}
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display',serif", fontWeight: 900,
              fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: '#fff8f0',
              lineHeight: 1.15, marginBottom: '0.4rem', maxWidth: '480px',
            }}>
              {t('historia_title_line1')}<br />{t('historia_title_line2')}
            </h2>
            <div style={{ height: '2px', width: '60px', background: 'linear-gradient(90deg,#7A1D2E,transparent)', marginBottom: '1.2rem' }} />
            <Carrusel cards={cards1} pressLabel={pressLabel} />
          </div>

          {/* RIGHT: COMPARTO TU ESPERANZA — alineado al botón guinda izquierdo */}
          <div style={{ ...fadeRight, paddingTop: 'calc(0.7rem + 1.1em + 0.4rem + clamp(1.8rem,3.5vw,2.8rem) * 2.4 + 1.2rem + 2.4rem)' }}>
            <GoldenTitle text="COMPARTO TU ESPERANZA" />
            <Carrusel cards={cards2} pressLabel={pressLabel} />
          </div>

        </div>

        {/* ── Fila inferior: SALKANTAY centrado ── */}
        <div className="flex flex-col items-center mt-10" style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.7s ease 0.3s',
        }}>
          <div style={{ width: '100%', maxWidth: '620px' }}>
            <GoldenTitle text="SALKANTAY ANDINO" />
            <Carrusel cards={cards3} pressLabel={pressLabel} />
          </div>
        </div>

        {/* Frase final */}
        <div style={{ textAlign: 'center', marginTop: '3rem', paddingBottom: '1rem' }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic', fontWeight: 700,
            fontSize: 'clamp(1.2rem, 2.8vw, 2rem)',
            color: 'rgba(255,248,240,0.92)',
            letterSpacing: '0.03em', lineHeight: 1.3,
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
          }}>
            "{t('historia_frase')}"
          </p>
        </div>

      </div>
    </section>
  );
};

export default HistoriaSection;
