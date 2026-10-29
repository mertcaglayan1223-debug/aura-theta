import React, { useState } from 'react';
import { Waves, Sparkles, Feather, Dna, Brain, Eye, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function Philosophy() {
  const [activeTab, setActiveTab] = useState('science');

  const pillars = [
    {
      num: '01',
      title: 'Derin Kök İnanç Kazımı (Digging)',
      desc: 'Zihnin bilinçli savunma mekanizmalarını nazikçe aşarak çocukluk ve atasal genetik düzeydeki çekirdek inançları saniyeler içinde açığa çıkarır.',
      icon: Feather,
    },
    {
      num: '02',
      title: 'Hücresel Hafıza & Epigenetik Arınma',
      desc: 'Bilinçaltındaki travmatik tortuları ve duygusal kilitleri 4-7 Hz Theta rezonansında dönüştürerek hücre biyolojisini rahatlatır.',
      icon: Dna,
    },
    {
      num: '03',
      title: 'AI Destekli Nöro-Patern Analizi',
      desc: 'Yapay zeka dil modeliyle danışanın kelime frekansları analiz edilir, gizli direnç noktaları ve kör noktalar haritalandırılır.',
      icon: Brain,
    },
    {
      num: '04',
      title: 'Anında Hissiyat Yüklemeleri (Instillations)',
      desc: '“Bolluk içinde yaşamanın nasıl bir his olduğunu biliyorum”, “Güvendeyim” gibi yeni realite hisleri anında nöronal ağa entegre edilir.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="philosophy" className="py-28 relative overflow-hidden bg-sanctuary-100/40">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 aura-gold opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 aura-sage opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-champagne-400/40 text-xs uppercase tracking-[0.2em] font-medium text-sanctuary-700">
            <Waves className="w-3.5 h-3.5 text-champagne-600" />
            <span>Felsefe & Kuantum Biyoloji</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-sanctuary-950 leading-tight">
            Kadim Şifa Bilgeliği ile <br />
            <span className="italic font-normal text-champagne-700">İleri Nörolojik Yapay Zeka</span> Buluşuyor
          </h2>
          <p className="text-sanctuary-600 text-base sm:text-lg leading-relaxed font-normal">
            Bilinçaltı, kararlarımızın ve hayatımızın %95'ini yönetir. 
            Klasik konuşma terapileri sadece %5'lik bilinçli akla hitap ederken; 
            Theta Healing, doğrudan zihnin kaynak koduna erişir.
          </p>
        </div>

        {/* Master Profile & Philosophy Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          {/* Master Healer Presentation Card */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden glass-card p-4 border border-champagne-500/20 shadow-xl relative">
              {/* Image Aesthetic Frame */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-b from-sanctuary-200 via-sanctuary-100 to-sanctuary-300 flex items-center justify-center group">
                {/* Visual representation of Healer Sanctuary */}
                <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
                <div className="relative z-10 text-center p-8 flex flex-col items-center justify-center">
                  <div className="w-28 h-28 rounded-full border-2 border-champagne-400 p-1 mb-6 shadow-glow-gold bg-white/40 backdrop-blur-md flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-gradient-to-tr from-sage-600 to-champagne-600 flex items-center justify-center text-white text-3xl font-serif">
                      AT
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-sanctuary-900 mb-1">Aura Suvada</h3>
                  <p className="text-xs uppercase tracking-widest text-champagne-700 font-semibold mb-3">
                    Master Theta Healer & Bilişsel Nöro-Koç
                  </p>
                  <p className="text-xs text-sanctuary-600 leading-relaxed max-w-xs italic font-serif">
                    “Karanlıkta kalan hiçbir inanç kalıcı değildir. Işık verildiğinde ve doğru frekans uygulandığında zihin özgürleşmeye mahkumdur.”
                  </p>
                </div>

                {/* Floating Cert Badge */}
                <div className="absolute bottom-4 left-4 right-4 glass-sanctuary px-4 py-2.5 rounded-xl border border-champagne-400/30 flex items-center justify-between">
                  <span className="text-[11px] text-sanctuary-800 font-medium">Think® Uluslararası Akredite</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-sage-500/20 text-sage-800 font-semibold">12+ Yıl Deneyim</span>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy Story Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-champagne-700 font-semibold">
                Neden Theta Beyin Dalgası?
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-sanctuary-950 font-normal leading-snug">
                Bilinç ile Kuantum Alanı Arasındaki Köprü
              </h3>
              <p className="text-sanctuary-600 leading-relaxed text-base">
                Beynimiz derin meditasyon, rüya görme veya hipnotik trans halindeyken 
                <strong className="text-sanctuary-900 font-medium"> 4 ile 7 Hertz</strong> arasında titreşir. 
                Bu eşsiz aralıkta zihinsel sansür, eleştirel filtre ve korku duvarları kalkar.
              </p>
              <p className="text-sanctuary-600 leading-relaxed text-base">
                Biz bu kadim frekansı modern <strong className="text-sanctuary-900 font-medium">biyo-geribildirim algoritmaları ve yapay zeka</strong> ile 
                harmanlayarak geleneksel yöntemlerle aylar süren inanç dönüşümlerini tek bir seansa indirgiyoruz.
              </p>
            </div>

            {/* Comparison Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-sanctuary-200/50 border border-sanctuary-300/60">
                <div className="text-xs font-semibold text-sanctuary-500 uppercase tracking-wider mb-2">
                  Geleneksel Yaklaşımlar
                </div>
                <ul className="text-xs space-y-2 text-sanctuary-600">
                  <li className="flex items-start gap-2">
                    <span className="text-sanctuary-400 mt-0.5">•</span>
                    <span>Sadece %5 bilinçli zihne odaklanır</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sanctuary-400 mt-0.5">•</span>
                    <span>Tekrarlayan konuşmalarla aylar sürebilir</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sanctuary-400 mt-0.5">•</span>
                    <span>Hücresel düzeyde inanç kalıbı değişmeyebilir</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl glass-card border border-champagne-400/40 shadow-sm bg-white/80">
                <div className="text-xs font-semibold text-champagne-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-champagne-500" />
                  <span>Aura Theta & AI Entegrasyonu</span>
                </div>
                <ul className="text-xs space-y-2 text-sanctuary-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-champagne-600 shrink-0 mt-0.5" />
                    <span>%95 bilinçaltı kök belleğe anında erişim</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-champagne-600 shrink-0 mt-0.5" />
                    <span>AI destekli patern keşfi ile kör nokta kalmaz</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-champagne-600 shrink-0 mt-0.5" />
                    <span>Hissiyat yüklemeleri ile hücrede anında kalıcı his</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="glass-card p-7 rounded-2xl border border-sanctuary-200/80 hover:border-champagne-400/60 hover:shadow-subtle-elevated transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-2xl font-light text-champagne-600/70 group-hover:text-champagne-600 transition">
                      {item.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-champagne-500/10 group-hover:bg-champagne-500/20 flex items-center justify-center transition">
                      <Icon className="w-5 h-5 text-champagne-600" />
                    </div>
                  </div>
                  <h4 className="font-serif text-xl font-medium text-sanctuary-900 mb-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-sanctuary-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
