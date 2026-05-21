import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const LANGUAGES = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'cs', label: 'Čeština', flag: '🇨🇿' },
];

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
}

const Navbar = ({ cartCount, onCartOpen }: NavbarProps) => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (mobileLangRef.current && !mobileLangRef.current.contains(e.target as Node)) setMobileLangOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const links = [
    { key: 'manifesto',  label: t('nav_about') },
    { key: 'historia',   label: t('nav_historia') },
    { key: 'mision',     label: t('nav_mision') },
    { key: 'vision',     label: t('nav_vision') },
    { key: 'farmers',    label: t('nav_farmers') },
    { key: 'process',    label: t('nav_process') },
  ];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setLangOpen(false);
    setMobileLangOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'backdrop-blur-sm border-b border-gold/10' : 'bg-transparent'
        }`}
        style={{ background: scrolled ? 'rgba(60,10,20,0.97)' : 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-end gap-6">

          {/* Links desktop */}
          <ul className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <li key={l.key}>
                <button
                  onClick={() => scrollTo(l.key)}
                  className="text-cream/80 hover:text-gold transition-colors text-xs tracking-widest uppercase font-serif font-bold cursor-pointer whitespace-nowrap"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Banderas desktop */}
          <div className="hidden md:flex items-center gap-2 animate-flag-float">
            <img src="https://flagcdn.com/w40/pe.png" alt="Peru" className="w-9 h-6 rounded-sm object-cover shadow-sm" />
            <img src="https://flagcdn.com/w40/cz.png" alt="Czech Republic" className="w-9 h-6 rounded-sm object-cover shadow-sm" />
          </div>

          {/* Selector idioma desktop */}
          <div ref={langRef} className="relative hidden md:block">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 text-cream/70 hover:text-gold transition-colors text-xs tracking-widest uppercase font-sans border border-cream/20 hover:border-gold/40 px-3 py-1.5 rounded-full cursor-pointer whitespace-nowrap"
            >
              <span>{currentLang.flag}</span>
              <span>{currentLang.code.toUpperCase()}</span>
              <i className={`ri-arrow-down-s-line text-sm transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-coffee-900 border border-gold/20 rounded-lg overflow-hidden shadow-xl min-w-[140px]">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-sans tracking-wide hover:bg-gold/10 transition-colors cursor-pointer whitespace-nowrap text-left ${
                      lang.code === i18n.language ? 'text-gold' : 'text-cream/70'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                    {lang.code === i18n.language && <i className="ri-check-line ml-auto text-gold" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile: banderas + idioma + hamburguesa */}
          <div className="md:hidden flex items-center gap-2">
            <div className="flex items-center gap-1 animate-flag-float">
              <img src="https://flagcdn.com/w40/pe.png" alt="Peru" className="w-6 h-4 rounded-sm object-cover" />
              <img src="https://flagcdn.com/w40/cz.png" alt="Czech" className="w-6 h-4 rounded-sm object-cover" />
            </div>

            <div ref={mobileLangRef} className="relative">
              <button
                onClick={() => setMobileLangOpen((v) => !v)}
                className="flex items-center gap-1 text-cream/70 text-xs font-sans border border-cream/20 px-2.5 py-1.5 rounded-full cursor-pointer"
              >
                <span>{currentLang.flag}</span>
                <span className="uppercase font-semibold">{currentLang.code.toUpperCase()}</span>
                <i className={`ri-arrow-down-s-line text-sm transition-transform ${mobileLangOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileLangOpen && (
                <div className="absolute right-0 top-full mt-2 bg-coffee-900 border border-gold/20 rounded-xl overflow-hidden z-[60]" style={{ minWidth: 130, boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full flex items-center gap-2.5 px-4 py-3 text-xs font-sans hover:bg-gold/10 transition-colors cursor-pointer text-left ${
                        lang.code === i18n.language ? 'text-gold' : 'text-cream/70'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="uppercase font-semibold tracking-widest">{lang.code.toUpperCase()}</span>
                      {lang.code === i18n.language && <i className="ri-check-line ml-auto text-gold" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="w-9 h-9 flex items-center justify-center cursor-pointer" onClick={() => setMobOpen(true)}>
              <i className="ri-menu-line text-cream text-xl" />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 md:hidden ${mobOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-black/60" onClick={() => setMobOpen(false)} />
        <div className={`absolute top-0 right-0 w-72 h-full bg-coffee-800 transition-transform duration-300 ${mobOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col p-8`}>
          <button onClick={() => setMobOpen(false)} className="self-end mb-8 w-9 h-9 flex items-center justify-center cursor-pointer">
            <i className="ri-close-line text-cream text-2xl" />
          </button>
          <div className="flex flex-col gap-6">
            {links.map((l) => (
              <button
                key={l.key}
                onClick={() => { scrollTo(l.key); setMobOpen(false); }}
                className="text-left text-cream/80 hover:text-gold transition-colors text-base tracking-widest uppercase font-serif font-bold cursor-pointer"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
