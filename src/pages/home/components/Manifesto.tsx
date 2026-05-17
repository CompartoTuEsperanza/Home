import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const useCountUp = (target: number, active: boolean, duration = 1400) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
};

const CircleStat = ({
  val, prefix = '', suffix, label, maxVal, active,
}: {
  val: number; prefix?: string; suffix: string; label: string; maxVal: number; active: boolean;
}) => {
  const count = useCountUp(val, active);
  const size = 110;
  const stroke = 5;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const progress = active ? Math.min(val / maxVal, 1) : 0;
  const dash = circ * progress;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative flex items-center justify-center rounded-xl border border-cream/10"
        style={{ width: size + 24, height: size + 24, background: 'rgba(30,18,10,0.55)' }}
      >
        <svg
          width={size}
          height={size}
          className="absolute"
          style={{ transform: 'rotate(-90deg)' }}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(201,169,110,0.15)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#c9a96e"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circ}`}
            strokeDashoffset={circ - dash}
            style={{ transition: active ? 'stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)' : 'none' }}
          />
        </svg>
        <span className="font-serif text-gold font-bold relative z-10" style={{ fontSize: '1.5rem' }}>
          {prefix}{count}{suffix}
        </span>
      </div>
      <p className="text-cream/55 font-sans text-[10px] tracking-widest uppercase text-center leading-tight max-w-[100px]">
        {label}
      </p>
    </div>
  );
};

const Manifesto = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { key: 'historia', label: t('manifesto_tab_historia'), content: t('manifesto_historia') },
  ];

  const stats = [
    { val: 142, suffix: '', label: t('manifesto_stat_families'), maxVal: 200 },
    { val: 340, suffix: '', label: t('manifesto_stat_children'), maxVal: 400 },
    { val: 48, prefix: '', suffix: 'K€', label: t('manifesto_stat_donated'), maxVal: 60 },
    { val: 38, suffix: '', label: t('manifesto_stat_women'), maxVal: 50 },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setContentVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // useEffect(() => {
  //   const timer = setInterval(() => setActiveTab((p) => (p + 1) % tabs.length), 4500);
  //   return () => clearInterval(timer);
  // }, [tabs.length]);

  
  return (
    <section id="manifesto" ref={sectionRef} className="relative bg-coffee-900 py-16 px-6 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none"
        src="/Home/videos/fondo2.mp4"
      />
      <div className="absolute inset-0 bg-coffee-900/45 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-3 gap-10 items-start">

        {/* LEFT */}
        <div className={`lg:col-span-2 transition-all duration-700 rounded-2xl p-6 ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ background: 'rgba(20,10,5,0.55)', backdropFilter: 'blur(12px)', border: '1px solid rgba(201,168,76,0.15)' }}>
          <h2 className="font-serif text-4xl md:text-5xl text-cream leading-tight mb-8">
            {t('manifesto_title').split('\n').map((line, i, arr) => (
              i === arr.length - 1
                ? <span key={i}>{line} <em className="text-gold italic">{t('manifesto_title_highlight')}</em></span>
                : <span key={i}>{line}<br /></span>
            ))}
          </h2>

          {/* Tab switcher */}
          <div className="flex gap-1 bg-coffee-800 rounded-full p-1 mb-6 w-fit">
            {tabs.map((tab, i) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(i)}
                className={`relative overflow-hidden px-4 py-1.5 rounded-full text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  activeTab === i
                    ? 'bg-gold text-coffee-900 font-semibold'
                    : 'text-cream/50 hover:text-cream'
                }`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {activeTab === i && (
                  <span
                    className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    style={{ animation: 'shimmerSweep 2s ease-in-out infinite' }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="mb-8">
            {tabs.map((tab, i) => {
              const parts = tab.content.split('COMPARTO_TU_ESPERANZA ');
              return (
                <div
                  key={tab.key}
                  className={`transition-all duration-500 ${activeTab === i ? 'opacity-100 block' : 'opacity-0 hidden'}`}
                >
                  <p className="text-cream/70 font-serif text-sm leading-relaxed mb-6">
                    {parts[0]}
                  </p>
                  {parts[1] && (
                    <>
                      <p className="font-serif font-black text-gold leading-tight mb-4" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', letterSpacing: '-0.01em' }}>
                        Comparto tu Esperanza
                      </p>
                      <p className="text-cream/70 font-serif text-sm leading-relaxed">
                        {parts[1]}
                      </p>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quote */}
          <blockquote className="border-l-2 border-gold pl-5 mb-10">
            <p className="font-serif italic text-cream/90 text-lg leading-relaxed whitespace-pre-line">
              {t('manifesto_quote')}
            </p>
          </blockquote>

        </div>

        {/* Image column */}
        <div className="lg:sticky lg:top-20 flex flex-col gap-4">
          <div className="rounded-2xl overflow-hidden w-full" style={{ border: '1px solid rgba(201,168,76,0.2)' }}>
            <img
              src="/Home/images/imagen1.png"
              alt="CompartoTuEsperanza"
              className="w-full h-full object-cover"
              style={{ minHeight: '360px', maxHeight: '480px', width: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Animated Cacao Chuncho SVG */}
          <div className="flex flex-col items-center gap-2 py-2">
            <svg viewBox="0 0 160 200" width="140" height="175" xmlns="http://www.w3.org/2000/svg"
              style={{ filter: 'drop-shadow(0 0 18px rgba(201,168,76,0.35))', animation: 'cacaoFloat 4s ease-in-out infinite' }}>
              {/* Pod body */}
              <ellipse cx="80" cy="115" rx="42" ry="62" fill="#8B4513" stroke="#C9A84C" strokeWidth="1.5"/>
              <ellipse cx="80" cy="115" rx="36" ry="56" fill="#A0522D"/>
              {/* Ridges */}
              {[-22,-11,0,11,22].map((x, i) => (
                <ellipse key={i} cx={80+x} cy="115" rx="5" ry="54" fill="none" stroke="#7A3B10" strokeWidth="1" opacity="0.6"/>
              ))}
              {/* Highlight */}
              <ellipse cx="65" cy="90" rx="8" ry="18" fill="rgba(255,220,150,0.15)" transform="rotate(-15,65,90)"/>
              {/* Stem */}
              <rect x="74" y="48" width="12" height="18" rx="4" fill="#5C3317" stroke="#C9A84C" strokeWidth="1"/>
              {/* Leaf left */}
              <path d="M74 54 Q40 30 35 10 Q55 25 74 54Z" fill="#2D6A2D" stroke="#4a9a4a" strokeWidth="1"/>
              <path d="M54 32 Q48 22 52 14" stroke="#1a4a1a" strokeWidth="0.8" fill="none"/>
              {/* Leaf right */}
              <path d="M86 54 Q120 30 125 10 Q105 25 86 54Z" fill="#2D6A2D" stroke="#4a9a4a" strokeWidth="1"/>
              <path d="M106 32 Q112 22 108 14" stroke="#1a4a1a" strokeWidth="0.8" fill="none"/>
              {/* Golden dots */}
              <circle cx="65" cy="105" r="2" fill="#C9A84C" opacity="0.7">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="80" cy="130" r="2" fill="#C9A84C" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="95" cy="105" r="2" fill="#C9A84C" opacity="0.7">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="1.8s" repeatCount="indefinite"/>
              </circle>
              {/* Label */}
            </svg>
            <span className="font-serif text-xs tracking-widest uppercase" style={{ color: 'rgba(201,168,76,0.6)' }}>
              Cacao Chuncho
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

// shimmerSweep is defined globally in index.css — adding inline fallback
const _shimmerStyle = `
@keyframes shimmerSweep {
  0% { transform: translateX(-100%); }
  60% { transform: translateX(200%); }
  100% { transform: translateX(200%); }
}
@keyframes cacaoFloat {
  0%, 100% { transform: translateY(0px) rotate(-2deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
}
`;

if (typeof document !== 'undefined' && !document.getElementById('manifesto-shimmer')) {
  const s = document.createElement('style');
  s.id = 'manifesto-shimmer';
  s.textContent = _shimmerStyle;
  document.head.appendChild(s);
}

export default Manifesto;
