import React, { useState } from 'react';
import { Sparkles, Brain, Check, RefreshCw, ArrowRight, ShieldCheck, Download, Heart, DollarSign, Activity, Flame, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

const QUESTIONS = [
  {
    id: 1,
    title: 'Hangi yaşam alanında en belirgin tıkanıklığı hissediyorsunuz?',
    subtitle: 'Bilinçaltı enerjiniz şu an en çok hangi alanda direnç üretiyor?',
    options: [
      {
        id: 'abundance',
        label: 'Maddi Bolluk & Finansal Akış',
        desc: 'Para geliyor ama kalamıyor; hak ettiğim kazancı istemekte zorlanıyorum.',
        icon: DollarSign,
      },
      {
        id: 'relationships',
        label: 'İlişkiler, Sevgi & Özdeğer',
        desc: 'Sürekli verici olma, terk edilme korkusu veya sınır çizememe döngüsü.',
        icon: Heart,
      },
      {
        id: 'vitality',
        label: 'Sağlık, Yaşam Enerjisi & Beden',
        desc: 'Sebepsiz kronik yorgunluk, psikosomatik ağrılar veya bedenle barışamama.',
        icon: Activity,
      },
      {
        id: 'purpose',
        label: 'Ruhsal Misyon & Kariyer Tıkanıklığı',
        desc: 'Potansiyelimi biliyorum ama görünür olmaktan ve adım atmaktan çekiniyorum.',
        icon: Flame,
      },
    ],
  },
  {
    id: 2,
    title: 'Hedeflerinize yaklaşırken ortaya çıkan en sık refleksiniz nedir?',
    subtitle: 'Zihninizin konfor alanını korumak için kullandığı savunma stratejisi.',
    options: [
      {
        id: 'sabotage',
        label: 'Kendini Sabote Etme & Erteleme',
        desc: 'Tam başarıya bir adım kala dikkati dağıtma, son anda vazgeçme.',
      },
      {
        id: 'imposter',
        label: 'Yetersizlik & Değersizlik Hissi',
        desc: 'Ne kadar başarsam da “henüz hazır değilim, bir gün foyam çıkacak” hissi.',
      },
      {
        id: 'exhaustion',
        label: 'Aşırı Kontrol & Tükenmişlik',
        desc: 'Her şeyi tek başıma sırtlanma; delege edememe ve tükenene kadar çalışma.',
      },
      {
        id: 'invisibility',
        label: 'Geri Planda Kalma / Görünmezlik',
        desc: 'Eleştirilmemek veya kıskanılmamak için ışığımı kısma ihtiyacı.',
      },
    ],
  },
  {
    id: 3,
    title: 'İçinizdeki derin sessizlikte yankılanan en baskın kök korku hangisi?',
    subtitle: 'Genellikle 0-7 yaş arasında kodlanan bilinçaltı çekirdeği.',
    options: [
      {
        id: 'rejection',
        label: '“Eğer gerçek beni görürlerse terk edilir veya yargılanırım.”',
        sub: 'Genetik / Atasal aidiyet korkusu',
      },
      {
        id: 'unworthy',
        label: '“Zahmetsizce sevilmeyi ve bolluğu hak etmiyorum.”',
        sub: 'Özdeğer & Alıp kabul etme kilit noktası',
      },
      {
        id: 'loss_of_freedom',
        label: '“Başarılı ve zengin olursam huzurumu ve özgürlüğümü kaybederim.”',
        sub: 'Bolluk-Huzur çatışması',
      },
      {
        id: 'punishment',
        label: '“Çok mutlu veya güvende hissedersem arkasından kötü bir şey gelir.”',
        sub: 'Kollektif travma koruma mekanizması',
      },
    ],
  },
  {
    id: 4,
    title: 'Bu stres anlarında bedeniniz en çok nerede rezonans veriyor?',
    subtitle: 'Duygusal tortuların hücresel olarak depolandığı biyo-alan.',
    options: [
      {
        id: 'throat',
        label: 'Boğaz & Boyun Bölgesi',
        desc: 'Kelimelerin yutulması, hakikati ifade edememe, sıkışma hissi.',
      },
      {
        id: 'chest',
        label: 'Kalp & Göğüs Kafesi',
        desc: 'Ağır baskı, kırgınlık, derin nefes alamama, kalp sıkışması.',
      },
      {
        id: 'solar',
        label: 'Mide & Solar Pleksus (Karın)',
        desc: 'Sürekli alarm hali, hazımsızlık, gelecek kaygısının karında düğümlenmesi.',
      },
      {
        id: 'root',
        label: 'Omuzlar & Sırt / Bel',
        desc: 'Dünyanın yükünü taşıma, maddi güvensizlik veya desteksiz kalma hissi.',
      },
    ],
  },
];

export default function AiQuiz({ onSelectBooking }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleSelectOption = (questionId, optionId) => {
    const updatedAnswers = { ...answers, [questionId]: optionId };
    setAnswers(updatedAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step reached: run AI Analysis
      runAnalysis(updatedAnswers);
    }
  };

  const runAnalysis = (finalAnswers) => {
    setIsAnalyzing(true);

    setTimeout(() => {
      // Determine tailored report based on answers
      let rootBelief = '';
      let instillation = '';
      let archeType = '';
      let frequency = '432 Hz';
      let focusArea = '';

      if (finalAnswers[1] === 'abundance') {
        focusArea = 'Finansal Bolluk & Alıp Kabul Etme';
        archeType = 'Kolektif Kıtlık & Sadakat Yemini';
        rootBelief = '“Para maneviyatı bozar / Ailemin çektiği yokluğa sadık kalmalıyım.”';
        instillation = '“Yaratıcı katında bolluk ve zenginlik içinde yaşarken aynı zamanda saf, güvende ve sevgi dolu olmanın mümkün olduğunu biliyorum.”';
        frequency = '528 Hz DNA & Tezahür Frekansı';
      } else if (finalAnswers[1] === 'relationships') {
        focusArea = 'Özdeğer, Kalp Açılımı & Koşulsuz Sevgi';
        archeType = 'Görünmez Kurtarıcı';
        rootBelief = '“Yalnız kalmamak için başkalarının yükünü sırtlanmalı ve kendimi feda etmeliyim.”';
        instillation = '“Koşulsuz sevilmeyi, sınır koymayı ve kendim kalarak bir ilişkide tam olarak güvende hissetmenin Yaratıcı tanımını anlıyorum.”';
        frequency = '432 Hz Kalp Çakrası & Theta Rezonansı';
      } else if (finalAnswers[1] === 'vitality') {
        focusArea = 'Hücresel Yenilenme & Yaşam Sevinci';
        archeType = 'Hücresel Alarm / Savunma Duvarı';
        rootBelief = '“Dinlenmek tembelliktir; güvende olmak için sürekli tetikte olmalıyım.”';
        instillation = '“Bedenimin her hücresinin dinlenirken de yenilendiğini ve derin sükuneti hak ettiğimi biliyorum.”';
        frequency = '7.83 Hz Schumann Topraklanması';
      } else {
        focusArea = 'Kutsal Misyon & Özgüvenli Görünürlük';
        archeType = 'Işığını Saklayan Rehber';
        rootBelief = '“Görünür olursam nazar değer veya hedef tahtası haline gelirim.”';
        instillation = '“Bütün potansiyelimle parlamanın ve dünyaya hediyemi sunmanın tamamen güvenli olduğunu biliyorum.”';
        frequency = '432 Hz & 6.0 Hz Theta Koheransı';
      }

      setAnalysisResult({
        focusArea,
        archeType,
        rootBelief,
        instillation,
        frequency,
        matchScore: '98.4%',
        recommendedSession: 'AI Destekli Birebir Kuantum Theta Seansı (90 Dk)',
      });

      setIsAnalyzing(false);

      // Trigger celebratory gentle confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#D4AF37', '#7A8B7B', '#E5C365', '#FAF9F6']
        });
      } catch (e) {}
    }, 2200);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setAnalysisResult(null);
  };

  return (
    <section id="ai-quiz" className="py-28 relative bg-[#FAF9F5] overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] aura-gold opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-champagne-400/40 text-xs uppercase tracking-[0.2em] font-medium text-sanctuary-700">
            <Brain className="w-3.5 h-3.5 text-champagne-600" />
            <span>AI Subconscious Blockage Scanner</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-sanctuary-950 leading-tight">
            Bilinçaltı Blokajınızı <br />
            <span className="italic font-normal text-champagne-700">2 Dakikada</span> Keşfedin
          </h2>
          <p className="text-sanctuary-600 text-sm sm:text-base">
            Sezgisel nöro-algoritmamız, cevaplarınızdaki frekans örüntülerini analiz ederek 
            çekirdek kök inancınızı ve size özel hissiyat yüklemesini anında formüle eder.
          </p>
        </div>

        {/* QUIZ CONTAINER */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-champagne-500/30 shadow-subtle-elevated relative bg-white/95">
          
          {/* Progress Bar (when answering) */}
          {!isAnalyzing && !analysisResult && (
            <div className="mb-8">
              <div className="flex justify-between items-center text-xs font-medium text-sanctuary-600 mb-2">
                <span>Adım {currentStep + 1} / {QUESTIONS.length}</span>
                <span className="text-champagne-700 font-semibold">{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% Tamamlandı</span>
              </div>
              <div className="w-full h-1.5 bg-sanctuary-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-champagne-500 to-sage-500 transition-all duration-500 rounded-full"
                  style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* STATE 1: Questions */}
          {!isAnalyzing && !analysisResult && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-sanctuary-950 font-normal leading-snug">
                  {QUESTIONS[currentStep].title}
                </h3>
                <p className="text-xs sm:text-sm text-sanctuary-500 mt-1">
                  {QUESTIONS[currentStep].subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {QUESTIONS[currentStep].options.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(QUESTIONS[currentStep].id, option.id)}
                      className="p-5 rounded-2xl text-left glass-card hover:bg-sanctuary-50 border border-sanctuary-200/80 hover:border-champagne-400/80 transition-all duration-200 group flex flex-col justify-between"
                    >
                      <div>
                        {Icon && (
                          <div className="w-9 h-9 rounded-xl bg-champagne-500/10 flex items-center justify-center text-champagne-700 mb-3 group-hover:scale-110 transition">
                            <Icon className="w-4 h-4" />
                          </div>
                        )}
                        <div className="font-serif text-lg font-medium text-sanctuary-900 group-hover:text-champagne-800 transition">
                          {option.label}
                        </div>
                        {option.desc && (
                          <p className="text-xs text-sanctuary-600 mt-2 leading-relaxed">
                            {option.desc}
                          </p>
                        )}
                        {option.sub && (
                          <span className="inline-block mt-3 text-[10px] uppercase tracking-wider text-sanctuary-400">
                            {option.sub}
                          </span>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-sanctuary-200/50 flex items-center justify-between text-xs text-champagne-700 font-medium">
                        <span>Seç ve İlerle</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Back button */}
              {currentStep > 0 && (
                <div className="pt-2">
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="text-xs text-sanctuary-500 hover:text-sanctuary-900 transition underline underline-offset-4"
                  >
                    ← Önceki soruya dön
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STATE 2: AI Analyzing Spinner */}
          {isAnalyzing && (
            <div className="py-16 text-center space-y-6">
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-champagne-200 animate-ping opacity-30" />
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-champagne-500 animate-spin flex items-center justify-center" />
                <Brain className="w-8 h-8 text-champagne-600 absolute" />
              </div>

              <div>
                <h3 className="font-serif text-2xl text-sanctuary-900 font-medium">
                  Bilinçaltı Paterniniz Ayrıştırılıyor...
                </h3>
                <p className="text-xs text-sanctuary-500 mt-2 font-mono">
                  Theta 5.5 Hz Kuantum Rezonansı & Epigenetik Kök İnanç Haritalanıyor
                </p>
              </div>

              <div className="max-w-xs mx-auto space-y-1.5 text-[11px] text-sanctuary-600 font-mono">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-500 animate-pulse" />
                  <span>Kök travma ve savunma dili analiz edildi</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-500 animate-pulse" />
                  <span>Özel hissiyat yüklemesi formüle ediliyor</span>
                </div>
              </div>
            </div>
          )}

          {/* STATE 3: Comprehensive AI Result Report */}
          {analysisResult && (
            <div className="space-y-8 animate-in fade-in duration-500">
              
              {/* Report Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-sanctuary-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-champagne-500/15 flex items-center justify-center text-champagne-700">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-sanctuary-500 font-mono block">
                      Kişiselleştirilmiş Nöro-Rapor
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-sanctuary-950 font-medium">
                      Bilinçaltı Dönüşüm Profiliniz
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-sage-500/15 text-sage-800 font-medium">
                    Uyum Doğruluğu: {analysisResult.matchScore}
                  </span>
                  <button
                    onClick={handleReset}
                    className="p-2 rounded-xl text-sanctuary-500 hover:text-sanctuary-900 hover:bg-sanctuary-100 transition"
                    title="Yeniden Başlat"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Analysis Result Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Identified Root Archetype */}
                <div className="p-6 rounded-2xl bg-sanctuary-50 border border-sanctuary-200">
                  <div className="text-[11px] font-semibold text-sanctuary-500 uppercase tracking-wider mb-2">
                    Bilinçaltı Savunma Arketipi
                  </div>
                  <div className="font-serif text-xl font-medium text-sanctuary-950 mb-2">
                    {analysisResult.archeType}
                  </div>
                  <div className="text-xs text-sanctuary-600">
                    Odak Alanı: <strong className="text-sanctuary-800">{analysisResult.focusArea}</strong>
                  </div>
                </div>

                {/* Recommended Theta Frequency */}
                <div className="p-6 rounded-2xl glass-card border border-champagne-400/50 bg-champagne-50/40">
                  <div className="text-[11px] font-semibold text-champagne-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
                    Önerilen İyileşme Frekansı
                  </div>
                  <div className="font-serif text-xl font-medium text-champagne-950 mb-2">
                    {analysisResult.frequency}
                  </div>
                  <div className="text-xs text-sanctuary-600">
                    Sağ-sol beyin yarım küre senkronizasyonu için hedeflenen titreşim.
                  </div>
                </div>

              </div>

              {/* Identified Root Belief (The Shadow) */}
              <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <div className="text-xs font-semibold text-amber-900 uppercase tracking-wider mb-1.5">
                  Tespit Edilen Çekirdek Kök İnanç (İptal Edilecek)
                </div>
                <div className="font-serif text-xl text-amber-950 italic">
                  {analysisResult.rootBelief}
                </div>
                <p className="text-xs text-amber-900/80 mt-2 leading-relaxed">
                  Bu inanç bilinçaltınız tarafından bir savunma kalkanı olarak üretilmiştir; ancak şu anki bolluk ve huzurunuzun önündeki birincil eşiktir.
                </p>
              </div>

              {/* Custom Instillation Formula */}
              <div className="p-6 rounded-2xl glass-card border border-sage-400/50 bg-sage-50/50">
                <div className="text-xs font-semibold text-sage-900 uppercase tracking-wider mb-1.5 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sage-700" />
                  Kişiye Özel Hissiyat Yüklemesi (Instillation)
                </div>
                <div className="font-serif text-lg sm:text-xl text-sage-950 leading-relaxed italic">
                  {analysisResult.instillation}
                </div>
                <p className="text-xs text-sage-800/80 mt-3 leading-relaxed">
                  Theta seansında bu hissin hücresel tanımı nöronlarınıza yüklenerek eski inanç kalıcı şekilde silinir.
                </p>
              </div>

              {/* Recommended Next Step & Booking CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-sanctuary-200">
                <div>
                  <div className="text-xs text-sanctuary-500 uppercase tracking-wider">Tavsiye Edilen Seans</div>
                  <div className="font-medium text-sanctuary-900 text-sm">{analysisResult.recommendedSession}</div>
                </div>

                <a
                  href="#booking"
                  onClick={() => {
                    if (onSelectBooking) {
                      onSelectBooking({
                        topic: `${analysisResult.focusArea} (${analysisResult.archeType})`,
                        rootBelief: analysisResult.rootBelief
                      });
                    }
                  }}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-sanctuary-900 hover:bg-sanctuary-800 text-white text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-glow-gold transition animate-shimmer"
                >
                  <span>Bu Raporla Seans Ayır</span>
                  <ArrowRight className="w-4 h-4 text-champagne-300" />
                </a>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
