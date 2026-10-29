import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Menu, X, Compass, Radio } from 'lucide-react';

export default function Navbar({ onOpenOracle }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Felsefe & Bilim', href: '#philosophy' },
    { label: 'Dönüşüm Haritası', href: '#transformation' },
    { label: 'Hizmetler', href: '#services' },
    { label: 'AI Blokaj Keşfi', href: '#ai-quiz', highlight: true },
    { label: 'Danışan Hikayeleri', href: '#testimonials' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'py-3.5 glass-sanctuary shadow-subtle-elevated'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-champagne-500/50 flex items-center justify-center bg-white/70 shadow-sm group-hover:border-champagne-500 transition duration-300">
            <div className="w-5 h-5 rounded-full border border-sage-500/60 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-champagne-500 group-hover:scale-125 transition duration-300" />
            </div>
          </div>
          <div>
            <span className="font-serif text-xl tracking-[0.2em] font-medium text-sanctuary-900 block leading-tight">
              AURA THETA
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-sanctuary-500 block font-sans">
              Quantum Healing & AI
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm tracking-wide transition-colors relative py-1 ${
                link.highlight
                  ? 'text-champagne-700 font-semibold hover:text-champagne-800'
                  : 'text-sanctuary-700 hover:text-sanctuary-950 font-normal'
              }`}
            >
              {link.label}
              {link.highlight && (
                <span className="absolute -top-1 -right-2 w-1.5 h-1.5 rounded-full bg-champagne-500 animate-pulse" />
              )}
            </a>
          ))}
        </nav>

        {/* Desktop CTA actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* AI Oracle trigger */}
          <button
            onClick={onOpenOracle}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-champagne-400/40 bg-champagne-50/50 hover:bg-champagne-100/70 text-xs font-medium text-sanctuary-800 transition"
            title="Aura AI Bilinçaltı Rehberi"
          >
            <Radio className="w-3.5 h-3.5 text-champagne-600 animate-pulse" />
            <span>Aura AI Oracle</span>
          </button>

          {/* Book Session CTA */}
          <a
            href="#booking"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-sanctuary-900 via-sanctuary-850 to-sanctuary-900 hover:from-sanctuary-800 hover:to-sanctuary-800 text-white text-xs tracking-wider uppercase font-medium shadow-md hover:shadow-glow-gold transition duration-300 animate-shimmer"
          >
            <Calendar className="w-3.5 h-3.5 text-champagne-300" />
            <span>Seans Ayır</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-sanctuary-800 hover:bg-sanctuary-200/50 transition"
          aria-label="Menüyü Aç"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-sanctuary border-t border-sanctuary-200/80 px-6 py-6 mt-3 shadow-xl backdrop-blur-2xl">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base text-sanctuary-800 hover:text-champagne-600 py-1 font-medium transition"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-sanctuary-200/60 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOracle();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-champagne-400 bg-champagne-50 text-sanctuary-900 text-sm font-medium"
              >
                <Radio className="w-4 h-4 text-champagne-600" />
                <span>Aura AI Oracle ile Danış</span>
              </button>
              <a
                href="#booking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-sanctuary-900 text-white text-sm font-medium"
              >
                <Calendar className="w-4 h-4 text-champagne-300" />
                <span>Birebir Seans Ayır</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
