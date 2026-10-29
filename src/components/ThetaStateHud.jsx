import React, { useState, useEffect } from 'react';
import { Activity, Sparkles, ChevronRight, Waves } from 'lucide-react';

const THETA_PHASES = [
  {
    range: [0, 0.22],
    hz: '7.0 Hz',
    name: '7. Varoluş Alanı',
    sub: 'Kuantum Çekirdek & Niyet',
    targetId: 'hero',
    color: '#D4AF37'
  },
  {
    range: [0.22, 0.48],
    hz: '5.5 Hz',
    name: 'Biyo-Uyum Dalgaları',
    sub: 'Felsefe & Epigenetik',
    targetId: 'philosophy',
    color: '#7A8B7B'
  },
  {
    range: [0.48, 0.72],
    hz: '4.8 Hz',
    name: 'Kök İnanç Çözünmesi',
    sub: 'Nöral Yeniden Yapılanma',
    targetId: 'transformation',
    color: '#D4AF37'
  },
  {
    range: [0.72, 1.0],
    hz: '4.0 Hz',
    name: 'Genişlemiş Bilinç',
    sub: 'Hücresel Tezahür & Bütünlük',
    targetId: 'booking',
    color: '#8F7BAE'
  }
];

export default function ThetaStateHud() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(THETA_PHASES[0]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      setScrollProgress(progress);

      const matched = THETA_PHASES.find(
        (p) => progress >= p.range[0] && (progress < p.range[1] || p.range[1] === 1.0)
      );
      if (matched) {
        setCurrentPhase(matched);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Theta Frekans Durum Paneli"
      className="fixed left-6 bottom-6 z-40 hidden md:block"
    >
      <div className="glass-sanctuary rounded-2xl border border-champagne-500/25 p-3 shadow-glow-gold backdrop-blur-xl transition-all duration-300">
        
        {/* Compact Telemetry Pill */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-3 cursor-pointer group select-none"
          title="Theta Bilinç Fazları — Tıklayarak detayları görüntüleyin"
        >
          {/* Animated Wave Indicator Icon */}
          <div className="w-8 h-8 rounded-xl bg-champagne-500/10 flex items-center justify-center text-champagne-600 group-hover:scale-105 transition">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>

          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-sanctuary-500">
                THETA 3D GEÇİŞ
              </span>
              <span
                style={{ color: currentPhase.color }}
                className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-champagne-500/10"
              >
                {currentPhase.hz}
              </span>
            </div>
            <div className="text-xs font-semibold text-sanctuary-900 group-hover:text-champagne-700 transition">
              {currentPhase.name}
            </div>
          </div>

          {/* Tiny Circular Progress Bar */}
          <div className="ml-2 relative w-6 h-6 flex items-center justify-center">
            <svg className="w-6 h-6 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-sanctuary-200"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-champagne-500 transition-all duration-150"
                strokeDasharray={`${scrollProgress * 100}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-[8px] font-mono font-bold text-sanctuary-600">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>

        {/* Expanded Navigation Drawer */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-sanctuary-200/80 space-y-1.5 animate-in fade-in duration-200">
            <div className="text-[10px] uppercase tracking-wider text-sanctuary-400 font-mono mb-2">
              Bilinç Seviyesine Git:
            </div>
            {THETA_PHASES.map((p, idx) => {
              const isActive = currentPhase.hz === p.hz;
              return (
                <button
                  key={idx}
                  onClick={() => scrollToSection(p.targetId)}
                  className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-champagne-500/15 text-sanctuary-950 font-semibold border border-champagne-500/30'
                      : 'hover:bg-sanctuary-100/60 text-sanctuary-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: p.color }}
                    />
                    <div>
                      <div>{p.name}</div>
                      <div className="text-[9px] text-sanctuary-400 font-mono">{p.sub}</div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-champagne-700">{p.hz}</span>
                </button>
              );
            })}
          </div>
        )}

      </div>
    </aside>
  );
}
