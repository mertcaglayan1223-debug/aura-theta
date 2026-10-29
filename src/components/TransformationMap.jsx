import React, { useState } from 'react';
import { Compass, Sparkles, Check, ArrowRight, Activity, Shield, HeartHandshake, Eye } from 'lucide-react';

const STAGES = [
  {
    step: '01',
    title: 'Kısıtlayıcı Kök İnanç & Blokaj',
    hz: '14 - 30 Hz (Stresli Beta)',
    state: 'Savunma & Direnç Modu',
    badge: 'Mevcut Durum',
    summary: 'Bilinçaltında çocukluk veya atasal aktarımlarla kodlanmış sessiz sabotajcılar.',
    coreBelief: '“Başarılı olursam yalnız kalırım” ya da “Sevilmek için kendimden vazgeçmeliyim.”',
    symptoms: ['Sürekli erteleme ve tükenmişlik', 'İlişkilerde değersizlik hissi', 'Para blokajları ve kıtlık korkusu'],
    color: 'from-amber-600/20 to-sanctuary-100',
    iconColor: 'text-amber-700',
    waveFreq: 'Hızlı, düzensiz ve kaotik beyin dalgaları'
  },
  {
    step: '02',
    title: 'Theta Alanına Giriş & İndüksiyon',
    hz: '4 - 7 Hz (Kuantum Theta)',
    state: 'Nöral Sessizlik & Bilinçaltı Kapısı',
    badge: 'Frekans Geçişi',
    summary: 'Zihin eleştirel filtrelerini indirir; parasempatik sistem tam onarım moduna geçer.',
    coreBelief: 'Zihin derin güven alanına açılır; savunma kalkanları sevgiyle çözülür.',
    symptoms: ['Beden ağırlıksızlaşır', 'Nörolojik stres hormonları (kortizol) sıfırlanır', 'Sezgisel algı ve vizyonlar açılır'],
    color: 'from-champagne-500/20 to-sanctuary-100',
    iconColor: 'text-champagne-600',
    waveFreq: 'Derin, akışkan ve senkronize 5.5 Hz dalgalar'
  },
  {
    step: '03',
    title: 'Hücresel Arınma & Hissiyat Yüklemesi',
    hz: 'Kuantum Yeniden Kodlama',
    state: 'Epigenetik İnanç Dönüşümü',
    badge: 'Yeniden Yapılanma',
    summary: 'Eski kök inanç kökünden çekilip Yaradan tanımıyla yeni hisler hücre reseptörlerine tanıtılır.',
    coreBelief: '“Bolluk içinde güvende olmanın, hak ettiğimi bilmenin Yaratıcı tanımını anlıyorum.”',
    symptoms: ['Hücre zarlarında biyokimyasal rahatlama', 'Eski duygusal yükün hafiflemesi', 'Yeni nöronal sinaps bağlantılarının oluşumu'],
    color: 'from-sage-500/20 to-sanctuary-100',
    iconColor: 'text-sage-600',
    waveFreq: 'Harmonik 432 Hz ve 528 Hz hücresel rezonans'
  },
  {
    step: '04',
    title: 'Genişlemiş Bilinç & Bütünlük',
    hz: 'Koherent Gama / Theta Entegrasyonu',
    state: 'Hizalanmış Manyetik Çekim',
    badge: 'Nihai Hedef',
    summary: 'Artık hayatı kurban bilinciyle değil, kendi gerçekliğinin egemen yaratıcısı olarak yaşarsınız.',
    coreBelief: '“Ben hayatın bizzat kendisiyim, akıştayım ve tam olarak tamamlanmış hissediyorum.”',
    symptoms: ['Hızlı niyet tezahürleri', 'Çabasız kararlar ve içsel berraklık', 'Kalıcı sükunet ve yüksek yaşam enerjisi'],
    color: 'from-ethereal-500/20 to-sanctuary-100',
    iconColor: 'text-ethereal-600',
    waveFreq: 'Tam koherans ve berrak kuantum alanı'
  }
];

export default function TransformationMap() {
  const [activeStageIndex, setActiveStageIndex] = useState(1);
  const current = STAGES[activeStageIndex];

  return (
    <section id="transformation" className="py-28 relative bg-[#FAF9F5] border-y border-sanctuary-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-champagne-400/40 text-xs uppercase tracking-[0.2em] font-medium text-sanctuary-700">
            <Compass className="w-3.5 h-3.5 text-champagne-600" />
            <span>Adım Adım Bilinç Yolculuğu</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-sanctuary-950 leading-tight">
            Kısıtlayıcı İnançlardan <br />
            <span className="italic font-normal text-champagne-700">Genişlemiş Bilince</span> Dönüşüm Haritası
          </h2>
          <p className="text-sanctuary-600 text-base sm:text-lg">
            Bir Theta seansında beyninizin ve hücresel alanınızın adım adım geçtiği nörolojik evreleri keşfedin.
          </p>
        </div>

        {/* Step Tabs Timeline */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {STAGES.map((stage, idx) => {
            const isSelected = activeStageIndex === idx;
            return (
              <button
                key={stage.step}
                onClick={() => setActiveStageIndex(idx)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 relative ${
                  isSelected
                    ? 'glass-card-dark text-white shadow-xl scale-[1.02] border-champagne-500/50'
                    : 'glass-card hover:bg-white text-sanctuary-800 border-sanctuary-200/80'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-mono font-bold tracking-widest ${isSelected ? 'text-champagne-400' : 'text-champagne-700'}`}>
                    AŞAMA {stage.step}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-champagne-500/20 text-champagne-300' : 'bg-sanctuary-200 text-sanctuary-700'}`}>
                    {stage.badge}
                  </span>
                </div>
                <h3 className={`font-serif text-lg font-medium leading-snug mb-1 ${isSelected ? 'text-white' : 'text-sanctuary-900'}`}>
                  {stage.title}
                </h3>
                <div className={`text-xs font-mono ${isSelected ? 'text-champagne-300/80' : 'text-sanctuary-500'}`}>
                  {stage.hz}
                </div>

                {isSelected && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-sanctuary-900 rotate-45 border-r border-b border-champagne-500/50 hidden lg:block" />
                )}
              </button>
            );
          })}
        </div>

        {/* Interactive Detailed Stage View */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-champagne-500/30 shadow-subtle-elevated relative overflow-hidden bg-white/90">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left detail info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-champagne-500/20 text-champagne-800 flex items-center justify-center font-serif font-bold text-sm">
                  {current.step}
                </span>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-sanctuary-950 font-normal">
                    {current.title}
                  </h3>
                  <p className="text-xs text-champagne-700 font-semibold tracking-wider uppercase">
                    Durum: {current.state}
                  </p>
                </div>
              </div>

              <p className="text-sanctuary-700 leading-relaxed text-base">
                {current.summary}
              </p>

              {/* Belief formulation box */}
              <div className="p-5 rounded-2xl bg-sanctuary-50 border border-sanctuary-200">
                <div className="text-[11px] font-semibold text-sanctuary-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
                  Bu Aşamada Zihnin İşlediği Formülasyon
                </div>
                <div className="font-serif text-lg text-sanctuary-900 italic">
                  {current.coreBelief}
                </div>
              </div>

              {/* Symptoms & Neurological Signs */}
              <div>
                <div className="text-xs uppercase tracking-wider text-sanctuary-500 font-semibold mb-3">
                  Nöro-Fizyolojik Belirtiler & Belirteçler
                </div>
                <div className="space-y-2">
                  {current.symptoms.map((symptom, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-sanctuary-800">
                      <div className="w-4 h-4 rounded-full bg-champagne-500/20 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-champagne-700" />
                      </div>
                      <span>{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right EEG & Brainwave Simulator */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-sanctuary-950 text-white relative overflow-hidden shadow-2xl">
              {/* Radial aura inside card */}
              <div className="absolute inset-0 bg-gradient-to-br from-champagne-500/10 via-transparent to-sage-500/10" />

              <div className="w-full flex justify-between items-center pb-4 border-b border-sanctuary-800 mb-6 relative z-10">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-champagne-400 animate-pulse" />
                  <span className="text-xs tracking-widest font-mono text-sanctuary-300">EEG SPEKTRUM</span>
                </div>
                <span className="text-xs font-mono text-champagne-400 font-semibold">
                  {current.hz}
                </span>
              </div>

              {/* Animated Wave SVG */}
              <div className="w-full h-28 flex items-center justify-center relative z-10 mb-6">
                <svg viewBox="0 0 400 100" className="w-full h-full text-champagne-400">
                  <path
                    d={
                      activeStageIndex === 0
                        ? "M 0 50 Q 25 10 50 50 T 100 50 T 150 20 T 200 80 T 250 15 T 300 85 T 350 40 T 400 50"
                        : activeStageIndex === 1
                        ? "M 0 50 Q 50 15 100 50 T 200 50 T 300 50 T 400 50"
                        : activeStageIndex === 2
                        ? "M 0 50 C 70 20, 130 80, 200 50 C 270 20, 330 80, 400 50"
                        : "M 0 50 Q 100 10 200 50 T 400 50"
                    }
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="transition-all duration-700"
                  />
                </svg>
              </div>

              <div className="text-center relative z-10 space-y-2">
                <div className="text-xs font-mono text-sanctuary-400">Frekans Özelliği</div>
                <div className="text-xs text-champagne-200 font-medium">
                  {current.waveFreq}
                </div>
              </div>

              {/* Stage Navigation Buttons */}
              <div className="w-full flex justify-between items-center mt-6 pt-4 border-t border-sanctuary-800 text-xs">
                <button
                  disabled={activeStageIndex === 0}
                  onClick={() => setActiveStageIndex(Math.max(0, activeStageIndex - 1))}
                  className="px-3 py-1.5 rounded-lg bg-sanctuary-900 hover:bg-sanctuary-850 disabled:opacity-30 disabled:cursor-not-allowed transition text-sanctuary-300"
                >
                  ← Önceki Aşama
                </button>
                <span className="text-sanctuary-400 font-mono text-[11px]">
                  {activeStageIndex + 1} / {STAGES.length}
                </span>
                <button
                  disabled={activeStageIndex === STAGES.length - 1}
                  onClick={() => setActiveStageIndex(Math.min(STAGES.length - 1, activeStageIndex + 1))}
                  className="px-3 py-1.5 rounded-lg bg-champagne-500/20 text-champagne-300 hover:bg-champagne-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-1"
                >
                  <span>Sonraki Aşama</span> →
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
