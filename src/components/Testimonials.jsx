import React, { useState } from 'react';
import { Star, Sparkles, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Derin Kaan S.',
    role: 'Teknoloji Girişimcisi & Kurucu Ortak',
    city: 'Londra / İstanbul',
    program: '4 Haftalık AI Nöro-Theta Programı',
    before: 'Yıllardır süren imposter sendromu ve şirket büyürken gelen panik ataklar.',
    after: '3. haftada çocukluktaki yetersizlik kök inancını iptal ettik; Series A yatırımını büyük bir sükunetle tamamladık.',
    quote: '“Aura Suvada ile yaptığımız tek bir 90 dakikalık seans, 3 yıllık geleneksel terapide açamadığımız kilidi açtı. Zihnimin arka planındaki o gürültü tamamen dindi.”',
    rating: 5,
    tag: 'Finansal Akış & Liderlik'
  },
  {
    id: 2,
    name: 'Ece Vural',
    role: 'Mimar & Tasarım Direktörü',
    city: 'İzmir',
    program: 'Birebir Kuantum Theta Seansı',
    before: 'İlişkilerde sürekli kendini feda etme ve aldatılma/terk edilme korkusu.',
    after: 'Hücresel hissiyat yüklemesiyle sınır koymayı ve hakiki sevgiyi kabul etmeyi deneyimledim. Hayatımın en huzurlu ilişkisindeyim.',
    quote: '“Hücrelerimin gerçekten rahatladığını hissettim. Seans bittiğinde üzerimden tonlarca ağırlık kalkmış gibi derin bir nefes aldım.”',
    rating: 5,
    tag: 'İlişkiler & Özdeğer'
  },
  {
    id: 3,
    name: 'Dr. Mert Altan',
    role: 'Bütüncül Tıp Uzmanı & Fonksiyonel Hekim',
    city: 'İzmir',
    program: 'AI Bilinçaltı Entegrasyon & Theta',
    before: 'Sürekli hastalara şifa verirken kendi tükenmişliğini ve kronik sırt ağrılarını çözememe.',
    after: 'Theta frekansının parasempatik sinir sistemindeki iyileştirici etkisini bizzat biyo-geribildirimle deneyimledim. Ağrım %100 geçti.',
    quote: '“Tıbbi bir zihin olarak ilk başta şüpheciydim. Ancak epigenetik ve nöroplastisitenin Theta 4-7Hz frekansında nasıl anında çalıştığını görmek hayranlık uyandırıcı.”',
    rating: 5,
    tag: 'Hücresel İyileşme'
  },
  {
    id: 4,
    name: 'Leyla Berker',
    role: 'Yazar & Kreatif Direktör',
    city: 'Bodrum',
    program: 'The Sanctuary VIP Özel İnziva',
    before: '2 yıldır tıkanmış yaratıcı akış, yeni kitap yazamama ve görünürlük anksiyetesi.',
    after: 'Atasal koldan gelen ‘dikkat çekersen cezalandırılırsın’ inancı silindi. Kitabım 4 ayda tamamlandı ve yayımlandı.',
    quote: '“Bu sadece bir seans değil, ruhun kendi kaynağına yeniden uyanışı. Kendime verdiğim en kutsal armağandı.”',
    rating: 5,
    tag: 'Ruhsal Misyon'
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-28 relative bg-[#F9F8F6] overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 aura-gold opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-champagne-400/40 text-xs uppercase tracking-[0.2em] font-medium text-sanctuary-700">
            <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
            <span>Kuantum Dönüşüm Hikayeleri</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-sanctuary-950 leading-tight">
            Kök İnançlarından Özgürleşen <br />
            <span className="italic font-normal text-champagne-700">Danışanlarımızın</span> Sesleri
          </h2>
          <p className="text-sanctuary-600 text-base sm:text-lg">
            Sözcüklerin ötesinde; hücre düzeyinde gerçekleşen gerçek ve kalıcı atılımlar.
          </p>
        </div>

        {/* Carousel Presentation */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-champagne-500/30 shadow-subtle-elevated relative bg-white/95">
            <Quote className="w-12 h-12 text-champagne-400/30 absolute top-8 right-8" />

            <div className="space-y-6">
              {/* Rating stars & Tag */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1 text-champagne-500">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-champagne-500 text-champagne-500" />
                  ))}
                  <span className="ml-2 text-xs font-semibold text-sanctuary-800">5.0 / Doğrulanmış Dönüşüm</span>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-champagne-500/10 text-champagne-800 font-medium">
                  {current.tag}
                </span>
              </div>

              {/* Main Quote */}
              <p className="font-serif text-xl sm:text-3xl text-sanctuary-950 font-normal leading-relaxed italic">
                {current.quote}
              </p>

              {/* Before / After Breakthrough Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-sanctuary-50 border border-sanctuary-200/80">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-sanctuary-500 mb-1">
                    Önceki Durum (Kök Blokaj)
                  </div>
                  <p className="text-xs text-sanctuary-700 leading-relaxed">
                    {current.before}
                  </p>
                </div>

                <div className="p-4 rounded-xl glass-card border border-sage-400/40 bg-sage-50/50">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-sage-800 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sage-600" />
                    Theta Sonrası Dönüşüm
                  </div>
                  <p className="text-xs text-sage-900 leading-relaxed font-medium">
                    {current.after}
                  </p>
                </div>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-sanctuary-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-serif text-xl font-medium text-sanctuary-950">
                    {current.name}
                  </div>
                  <div className="text-xs text-sanctuary-500">
                    {current.role} • {current.city}
                  </div>
                  <div className="text-[11px] text-champagne-700 font-medium mt-0.5">
                    {current.program}
                  </div>
                </div>

                {/* Carousel Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="p-3 rounded-full border border-sanctuary-300 hover:border-champagne-500 hover:bg-sanctuary-100 text-sanctuary-700 transition"
                    aria-label="Önceki"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-sanctuary-400 px-2">
                    {currentIndex + 1} / {TESTIMONIALS.length}
                  </span>
                  <button
                    onClick={next}
                    className="p-3 rounded-full border border-sanctuary-300 hover:border-champagne-500 hover:bg-sanctuary-100 text-sanctuary-700 transition"
                    aria-label="Sonraki"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
