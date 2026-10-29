import React from 'react';
import ThreeCanvas from './ThreeCanvas';
import { Sparkles, ArrowRight, ShieldCheck, Activity, BrainCircuit } from 'lucide-react';

export default function Hero({ onOpenQuiz }) {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background Soft Radiant Auras */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] aura-gold pointer-events-none opacity-60" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] aura-sage pointer-events-none opacity-40" />
      <div className="absolute top-1/2 right-1/4 w-[550px] h-[550px] aura-lavender pointer-events-none opacity-40" />

      {/* Subtle Background Sacred Geometry Radial Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[850px] h-[850px] rounded-full border border-champagne-300/15 animate-spin-very-slow" />
        <div className="absolute w-[650px] h-[650px] rounded-full border border-dashed border-sage-300/20" />
        <div className="absolute w-[450px] h-[450px] rounded-full border border-champagne-400/15" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Headline & Value Proposition */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          
          {/* Subtle Tag Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-sanctuary border border-champagne-400/40 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-champagne-500 animate-ping" />
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-sanctuary-800">
              4-7 Hz Theta Dalgası & Kuantum Nöro-Analiz
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-light text-sanctuary-950 leading-[1.12] tracking-tight">
            Zihninizin <br className="hidden sm:inline" />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-sanctuary-900 via-champagne-700 to-sanctuary-800">
              Derinliklerinde
            </span> <br />
            Dönüşüm Başlasın.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-sanctuary-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
            Hücresel düzeyde kök inançlarınızı Theta beyin dalgasında serbest bırakın. 
            Yapay zeka destekli bilinçaltı haritalandırması ve kadim şifa teknikleriyle 
            zihinsel sınırlarınızı kalıcı olarak aşın.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={onOpenQuiz}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-sanctuary-950 hover:bg-sanctuary-900 text-white font-medium text-sm tracking-wider uppercase transition-all duration-300 shadow-xl hover:shadow-glow-gold flex items-center justify-center gap-3 group animate-shimmer"
            >
              <Sparkles className="w-4 h-4 text-champagne-300 group-hover:rotate-12 transition-transform" />
              <span>Bilinçaltı Blokajını Keşfet</span>
              <ArrowRight className="w-4 h-4 text-champagne-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#booking"
              className="w-full sm:w-auto px-7 py-4 rounded-full glass-card hover:bg-white text-sanctuary-800 font-medium text-sm tracking-wide transition-all duration-300 border border-sanctuary-300/80 hover:border-champagne-400 flex items-center justify-center gap-2"
            >
              <span>Seans Randevusu Al</span>
            </a>
          </div>

          {/* Verified Metrics Strip */}
          <div className="pt-8 border-t border-sanctuary-200/80 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-medium text-sanctuary-900">1,450+</div>
              <div className="text-xs text-sanctuary-500 font-sans tracking-wide">Dönüşen Danışan</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-medium text-champagne-700">4-7 Hz</div>
              <div className="text-xs text-sanctuary-500 font-sans tracking-wide">Theta Kuantum Frekansı</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-medium text-sage-600">%96.4</div>
              <div className="text-xs text-sanctuary-500 font-sans tracking-wide">Kalıcı Kök İnanç Çözümü</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D WebGL Element */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* Circular Frame Accent */}
          <div className="w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full relative flex items-center justify-center">
            
            {/* Background glowing halo */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-champagne-200/30 via-sage-100/40 to-ethereal-100/40 blur-2xl" />

            {/* 3D WebGL Canvas */}
            <div className="w-full h-full relative z-10">
              <ThreeCanvas />
            </div>

            {/* Floating Status Badges */}
            <div className="absolute -top-2 -right-2 glass-sanctuary px-4 py-2.5 rounded-2xl border border-champagne-400/40 shadow-lg flex items-center gap-3 animate-float-slow">
              <div className="w-8 h-8 rounded-full bg-champagne-500/10 flex items-center justify-center">
                <BrainCircuit className="w-4 h-4 text-champagne-600" />
              </div>
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider text-sanctuary-500">AI Kuantum Analizi</div>
                <div className="text-xs font-semibold text-sanctuary-900">Aktif Bilinçaltı Tarama</div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 glass-sanctuary px-4 py-2.5 rounded-2xl border border-sage-400/40 shadow-lg flex items-center gap-3 animate-float-slow [animation-delay:2s]">
              <div className="w-8 h-8 rounded-full bg-sage-500/10 flex items-center justify-center">
                <Activity className="w-4 h-4 text-sage-600" />
              </div>
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider text-sanctuary-500">Biyo-Rezonans</div>
                <div className="text-xs font-semibold text-sanctuary-900">Theta 5.5 Hz Uyumlu</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Subtle Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-sanctuary-400 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.2em]">Aşağı Kaydırın</span>
        <div className="w-5 h-9 rounded-full border border-sanctuary-300 flex items-start justify-center p-1">
          <div className="w-1.5 h-2 bg-champagne-500 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
