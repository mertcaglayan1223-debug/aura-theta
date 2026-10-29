import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, Shield, Clock, Users, Star, BrainCircuit } from 'lucide-react';

const SERVICES = [
  {
    id: 'single_session',
    name: 'Birebir Kuantum Theta Seansı',
    tagline: '90 Dakika Derin Bilinçaltı Yeniden Yapılandırması',
    badge: 'En Çok Tercih Edilen',
    badgeType: 'standard',
    price: '₺4.800',
    duration: '90 Dk',
    format: 'Online (Zoom HD) veya Özel Sanctuary Süiti',
    features: [
      'Kapsamlı Kök İnanç Kazımı (Digging Yöntemi)',
      'Çocukluk & Atasal Genetik Blokaj İptali',
      'Yaratıcı Tanımıyla Hücresel Hissiyat Yüklemeleri',
      'AI Destekli Seans Sonrası Biyo-Rapor & Ev Entegrasyon Planı',
      'Danışana Özel Hazırlanmış 432Hz Frekans Ses Kaydı'
    ],
    ctaText: 'Seans Rezervasyonu Al',
    popular: false,
  },
  {
    id: 'deep_neuro_program',
    name: 'AI Destekli Nöro-Theta Programı',
    tagline: '4 Haftalık Kapsamlı Bilinçaltı & Yaşam Dönüşümü',
    badge: 'Master Program',
    badgeType: 'gold',
    price: '₺16.500',
    duration: '4 Hafta (4 Master Seansı)',
    format: 'Birebir Hibrit & 7/24 AI Desteği',
    features: [
      '4 Adet 90 Dakikalık Birebir Master Theta Seansı',
      '7/24 Aura AI Companion ile Günlük Nöro-Takip',
      'Kişiselleştirilmiş 528Hz DNA Onarım & Subliminal Ses Dosyaları',
      'Bolluk, İlişkiler ve Özdeğer Alanlarında Tam Temizlik',
      'Seanslar Arası Doğrudan WhatsApp Destek Hattı',
      'Ömür Boyu Kütüphane Erişimi & Meditasyon Arşivi'
    ],
    ctaText: 'Programa Katıl',
    popular: true,
  },
  {
    id: 'sound_circle',
    name: '432 Hz Ses & Frekans Çemberi',
    tagline: 'Grup Theta Dalga İmmersiyonu & Canlı Meditasyon',
    badge: 'Topluluk Alanı',
    badgeType: 'sage',
    price: '₺1.200',
    duration: '120 Dk',
    format: 'Aylık Canlı Oturum & Ses Banyosu',
    features: [
      'Saf Kristal Çanaklar & 432Hz Gong Terapisi',
      'Kolektif Bilinçaltı Şifa & Niyet Alanı Aktivasyonu',
      'Canlı Soru-Cevap & Enerji Dengeleme',
      'Kayıt Erişimi (30 Gün Boyunca Sınırsız Dinleme)'
    ],
    ctaText: 'Çembere Katıl',
    popular: false,
  },
  {
    id: 'vip_retreat',
    name: 'The Sanctuary VIP Özel İnziva',
    tagline: 'Kişiye Özel Sessizlik, Lüks Sağaltım & Kuantum Yenilenme',
    badge: 'Sınırlı Kontenjan (8 Kişi)',
    badgeType: 'luxury',
    price: 'Özel Talep',
    duration: '3 Gün / 2 Gece',
    format: 'Ege Kıyıları Butik İnziva Köşkü',
    features: [
      'Günde 2 Özel Birebir Theta & Nöro-Frekans Oturumu',
      'Holistik Gurme Organik Beslenme & Hücresel Detoks',
      'Gündoğumu Nefes ve Gece Yıldız Altı Theta Meditasyonları',
      'Özel Lüks Süit Konaklama & Tam Gizlilik Prensibi'
    ],
    ctaText: 'Bilgi ve Başvuru',
    popular: false,
  }
];

export default function Services({ onSelectService }) {
  return (
    <section id="services" className="py-28 relative bg-[#F9F8F6] overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 aura-gold opacity-25 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 aura-sage opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-champagne-400/40 text-xs uppercase tracking-[0.2em] font-medium text-sanctuary-700">
            <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
            <span>Özel Hizmetler & Programlar</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-sanctuary-950 leading-tight">
            Kişiselleştirilmiş <br />
            <span className="italic font-normal text-champagne-700">Kuantum Dönüşüm</span> Protokolleri
          </h2>
          <p className="text-sanctuary-600 text-base sm:text-lg">
            Tek bir derin blokaj çözümünden 4 haftalık kapsamlı zihinsel yeniden yapılanmaya kadar 
            size en uygun şifa alanını seçin.
          </p>
        </div>

        {/* Pricing & Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            return (
              <div
                key={service.id}
                className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 relative ${
                  service.popular
                    ? 'glass-card-dark text-white shadow-2xl scale-[1.02] border border-champagne-500/50'
                    : 'glass-card hover:bg-white text-sanctuary-900 border border-sanctuary-200/80 hover:border-champagne-400/60 hover:shadow-subtle-elevated'
                }`}
              >
                {/* Top Badge */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${
                        service.popular
                          ? 'bg-champagne-500 text-sanctuary-950 font-bold'
                          : 'bg-champagne-500/10 text-champagne-800'
                      }`}
                    >
                      {service.badge}
                    </span>
                    <span className={`text-xs font-mono ${service.popular ? 'text-champagne-300' : 'text-sanctuary-500'}`}>
                      {service.duration}
                    </span>
                  </div>

                  <h3 className={`font-serif text-2xl font-normal leading-snug mb-2 ${service.popular ? 'text-white' : 'text-sanctuary-950'}`}>
                    {service.name}
                  </h3>

                  <p className={`text-xs leading-relaxed mb-6 ${service.popular ? 'text-sanctuary-300' : 'text-sanctuary-600'}`}>
                    {service.tagline}
                  </p>

                  {/* Price */}
                  <div className="pb-6 mb-6 border-b border-sanctuary-200/40">
                    <div className="flex items-baseline gap-1">
                      <span className={`font-serif text-3xl sm:text-4xl font-medium ${service.popular ? 'text-champagne-400' : 'text-sanctuary-950'}`}>
                        {service.price}
                      </span>
                    </div>
                    <span className={`text-[11px] ${service.popular ? 'text-sanctuary-400' : 'text-sanctuary-500'}`}>
                      {service.format}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <div className={`text-[11px] font-semibold uppercase tracking-wider ${service.popular ? 'text-champagne-300' : 'text-sanctuary-500'}`}>
                      Kapsam & Özellikler:
                    </div>
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs">
                        <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${service.popular ? 'text-champagne-400' : 'text-champagne-600'}`} />
                        <span className={`leading-relaxed ${service.popular ? 'text-sanctuary-200' : 'text-sanctuary-700'}`}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Button */}
                <a
                  href="#booking"
                  onClick={() => {
                    if (onSelectService) {
                      onSelectService(service);
                    }
                  }}
                  className={`w-full py-3.5 rounded-full text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                    service.popular
                      ? 'bg-gradient-to-r from-champagne-500 to-champagne-400 text-sanctuary-950 hover:opacity-95 font-semibold shadow-glow-gold'
                      : 'bg-sanctuary-900 hover:bg-sanctuary-800 text-white'
                  }`}
                >
                  <span>{service.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-16 p-6 rounded-2xl glass-sanctuary border border-champagne-400/30 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-champagne-500/10 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-champagne-600" />
            </div>
            <div>
              <div className="font-serif text-lg font-medium text-sanctuary-900">
                Kozmik & Nörolojik Güven Protokolü
              </div>
              <p className="text-xs text-sanctuary-600">
                Tüm seanslarımız %100 danışan gizliliği ve Think® uluslararası etik standartları çerçevesinde yürütülür.
              </p>
            </div>
          </div>
          <a
            href="#booking"
            className="px-6 py-2.5 rounded-full border border-champagne-500 text-xs font-semibold text-sanctuary-900 hover:bg-champagne-500 hover:text-sanctuary-950 transition tracking-wider uppercase shrink-0"
          >
            Detaylı Bilgi Al
          </a>
        </div>

      </div>
    </section>
  );
}
