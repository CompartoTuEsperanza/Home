import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function UnidosSection() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [anim, setAnim] = useState(false);

  const cards: string[] = t('unidos_cards', { returnObjects: true }) as string[];
  const total = cards.length;

  const goTo = (idx: number) => {
    const next = (idx + total) % total;
    if (next === active) return;
    setAnim(true);
    setTimeout(() => { setActive(next); setAnim(false); }, 260);
  };

  // 5 posiciones: far-left, left, center, right, far-right
  const visible = [
    (active - 2 + total) % total,
    (active - 1 + total) % total,
    active,
    (active + 1) % total,
    (active + 2) % total,
  ];

  const posStyle = (pos: number): React.CSSProperties => {
    const configs: Record<number, React.CSSProperties> = {
      0: { transform: 'scale(0.72) translateX(-12px)', opacity: 0.35, zIndex: 0 },
      1: { transform: 'scale(0.88)',                   opacity: 0.65, zIndex: 10 },
      2: { transform: 'scale(1)',                       opacity: 1,    zIndex: 20 },
      3: { transform: 'scale(0.88)',                   opacity: 0.65, zIndex: 10 },
      4: { transform: 'scale(0.72) translateX(12px)',  opacity: 0.35, zIndex: 0 },
    };
    return configs[pos] ?? {};
  };

  const isLastCard = active === total - 1;

  return (
    <section
      id="unidos"
      className="relative py-24 overflow-hidden"
      style={{ background: '#0f0805' }}
    >
      {/* Fondo sin overlay */}
      <div
        className="absolute inset-0 bg-center bg-cover pointer-events-none"
        style={{ backgroundImage: 'url(/Home/images/cards.png)' }}
      />
      {/* Overlay mínimo marrón */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(40,18,6,0.18)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          {/* Frase cursiva guinda */}
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontWeight: 800,
            fontSize: 'clamp(1.3rem, 2.8vw, 2.8rem)',
            color: '#7A1D2E',
            lineHeight: 1.25,
            marginBottom: '1.2rem',
            textShadow: '0 1px 6px rgba(0,0,0,0.25)',
          }}>
            {t('unidos_frase')}
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: '#fff8f0',
            lineHeight: 1.15,
          }}>
            {t('unidos_title')}
          </h2>
          <div style={{ height: '2px', width: '60px', background: 'linear-gradient(90deg, #7A1D2E, transparent)', margin: '0.8rem auto 0' }} />

          {/* Botón guinda */}
          <div style={{ marginTop: '1.2rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'linear-gradient(135deg, #5A0D1E 0%, #7A1D2E 100%)',
              color: '#fff',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: '0.78rem',
              letterSpacing: '0.06em',
              padding: '0.45rem 1.2rem',
              borderRadius: '9999px',
              boxShadow: '0 0 14px rgba(122,29,46,0.5)',
            }}>
              <i className="ri-arrow-left-right-line" style={{ fontSize: '0.8rem' }} />
              {t('unidos_press')}
            </span>
          </div>
        </div>

        {/* Carrusel */}
        <div className="relative flex items-center justify-center gap-3" style={{ minHeight: '320px' }}>
          {visible.map((cardIdx, pos) => {
            const isCenter = pos === 2;
            const text = cards[cardIdx];
            const isLastAndCenter = isCenter && cardIdx === total - 1;

            return (
              <div
                key={`${cardIdx}-${pos}`}
                onClick={() => !isCenter && goTo(cardIdx)}
                className="transition-all duration-500"
                style={{
                  ...posStyle(pos),
                  width: isCenter ? 'min(520px, 90vw)' : '200px',
                  flexShrink: 0,
                  cursor: isCenter ? 'default' : 'pointer',
                  display: pos === 0 || pos === 4 ? undefined : undefined,
                }}
              >
                <div
                  style={{
                    background: isCenter ? 'rgba(15,8,3,0.72)' : 'rgba(15,8,3,0.55)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: isCenter ? '1px solid rgba(201,168,76,0.35)' : '1px solid rgba(201,168,76,0.15)',
                    borderRadius: '1.25rem',
                    padding: isCenter ? '2rem' : '1.25rem',
                    minHeight: isCenter ? '220px' : '160px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: isCenter ? '0 8px 40px rgba(0,0,0,0.5)' : 'none',
                    transition: 'opacity 0.26s ease, transform 0.26s ease',
                    opacity: isCenter && anim ? 0 : undefined,
                    transform: isCenter && anim ? 'translateY(8px)' : undefined,
                  }}
                >
                  <div>
                    {isCenter && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <i className="ri-double-quotes-l" style={{ color: 'rgba(201,169,110,0.35)', fontSize: '1.5rem' }} />
                        <span style={{ color: 'rgba(255,248,240,0.35)', fontSize: '0.72rem', fontFamily: 'sans-serif' }}>
                          {active + 1} / {total}
                        </span>
                      </div>
                    )}
                    <p style={{
                      fontFamily: "'Playfair Display', serif",
                      color: isCenter ? 'rgba(255,248,240,0.92)' : 'rgba(255,248,240,0.55)',
                      fontSize: isCenter ? '0.9rem' : '0.72rem',
                      lineHeight: 1.8,
                      display: '-webkit-box',
                      WebkitLineClamp: isCenter ? 999 : 5,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {text}
                      {isLastAndCenter && (
                        <span style={{
                          fontFamily: "'Playfair Display', serif",
                          fontStyle: 'italic',
                          fontWeight: 900,
                          fontSize: '1.15rem',
                          color: '#C9A84C',
                          marginLeft: '0.3rem',
                        }}>
                          {t('unidos_extraordinary')}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controles */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={() => goTo(active - 1)}
            className="w-10 h-10 flex items-center justify-center rounded-full transition-all cursor-pointer"
            style={{ border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(20,10,5,0.6)', color: '#fff8f0' }}
          >
            <i className="ri-arrow-left-s-line text-lg" />
          </button>

          <div className="flex gap-2">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all cursor-pointer"
                style={{
                  width: i === active ? '24px' : '8px',
                  height: '8px',
                  background: i === active ? '#C9A84C' : 'rgba(201,169,110,0.25)',
                  border: 'none',
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(active + 1)}
            className="w-10 h-10 flex items-center justify-center rounded-full transition-all cursor-pointer"
            style={{ border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(20,10,5,0.6)', color: '#fff8f0' }}
          >
            <i className="ri-arrow-right-s-line text-lg" />
          </button>
        </div>
      </div>
    </section>
  );
}
