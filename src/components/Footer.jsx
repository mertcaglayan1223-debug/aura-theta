import React, { useState } from 'react';
import { Sparkles, Send, MapPin, Mail, Phone, ArrowUp } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-sanctuary-950 text-sanctuary-200 pt-20 pb-12 relative overflow-hidden">
      {/* Background radial gold aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] aura-gold opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Newsletter Card */}
        <div className="rounded-3xl glass-card-dark p-8 sm:p-12 border border-champagne-500/20 mb-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 text-champagne-400 text-xs uppercase tracking-widest font-mono">
                <Sparkles className="w-4 h-4" />
                <span>Haftalık 432 Hz Kuantum Bülteni</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl text-white font-normal leading-snug">
                Zihninizi Her Pazartesi <br />
                <span className="italic text-champagne-300">Yüksek Frekansa</span> Ayarlayın
              </h3>
              <p className="text-sanctuary-400 text-xs sm:text-sm leading-relaxed max-w-lg">
                Her hafta yeni bir kök inanç çözümü, meditasyon ses frekansı ve Theta hissiyat yüklemesi doğrudan gelen kutunuzda.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-4 rounded-2xl bg-sage-500/20 border border-sage-500/40 text-sage-200 text-xs flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-champagne-400" />
                  <span>Kutsal bültenimize hoş geldiniz. İlk 432Hz ses hediyeniz e-postanıza iletildi.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="E-posta adresiniz..."
                      className="flex-1 px-4 py-3.5 rounded-full bg-sanctuary-900 border border-sanctuary-800 text-white placeholder-sanctuary-500 text-xs focus:outline-none focus:border-champagne-500 transition"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3.5 rounded-full bg-champagne-500 hover:bg-champagne-400 text-sanctuary-950 font-semibold text-xs tracking-wider uppercase transition shadow-md flex items-center gap-2"
                    >
                      <span>Katıl</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[10px] text-sanctuary-500">
                    Spamsız, saf şifa içeriği. İstediğiniz an tek tıkla ayrılabilirsiniz.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Links & Info Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-sanctuary-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-champagne-500/50 flex items-center justify-center bg-sanctuary-900">
                <div className="w-2 h-2 rounded-full bg-champagne-400" />
              </div>
              <div>
                <span className="font-serif text-xl tracking-[0.2em] font-medium text-white block">
                  AURA THETA
                </span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-sanctuary-400 font-sans">
                  Quantum Healing Sanctuary
                </span>
              </div>
            </div>

            <p className="text-xs text-sanctuary-400 leading-relaxed max-w-sm">
              Epigenetik inanç dönüşümü, 4-7 Hz Theta beyin dalgası ve yapay zeka destekli nörolojik koçluk protokolleriyle insan bilincinin en yüksek potansiyeline açılan kapı.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-sanctuary-900 border border-sanctuary-800 flex items-center justify-center text-sanctuary-400 hover:text-champagne-400 hover:border-champagne-500/50 transition" title="Instagram">
                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-sanctuary-900 border border-sanctuary-800 flex items-center justify-center text-sanctuary-400 hover:text-champagne-400 hover:border-champagne-500/50 transition" title="YouTube">
                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                  <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-sanctuary-900 border border-sanctuary-800 flex items-center justify-center text-sanctuary-400 hover:text-champagne-400 hover:border-champagne-500/50 transition" title="LinkedIn">
                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-champagne-400 font-semibold">
              Kuantum Alanı
            </h4>
            <ul className="space-y-2 text-xs text-sanctuary-400">
              <li><a href="#philosophy" className="hover:text-white transition">Theta Felsefesi & Bilim</a></li>
              <li><a href="#transformation" className="hover:text-white transition">4 Aşamalı Dönüşüm Haritası</a></li>
              <li><a href="#ai-quiz" className="hover:text-white transition">Bilinçaltı Blokaj Testi</a></li>
              <li><a href="#services" className="hover:text-white transition">Birebir Seanslar & Programlar</a></li>
              <li><a href="#testimonials" className="hover:text-white transition">Danışan Başarı Hikayeleri</a></li>
            </ul>
          </div>

          {/* Ethics & Protocol */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-champagne-400 font-semibold">
              Etik & Standartlar
            </h4>
            <ul className="space-y-2 text-xs text-sanctuary-400">
              <li><a href="#" className="hover:text-white transition">Think® Akreditasyonu</a></li>
              <li><a href="#" className="hover:text-white transition">Danışan Gizlilik İlkesi</a></li>
              <li><a href="#" className="hover:text-white transition">Nöro-Etik Prensipleri</a></li>
              <li><a href="#" className="hover:text-white transition">Yasal Aydınlatma Metni</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-champagne-400 font-semibold">
              Sanctuary Lokasyonları
            </h4>
            <div className="space-y-2.5 text-xs text-sanctuary-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-champagne-500 shrink-0 mt-0.5" />
                <span>Kıbrıs Şehitleri Cad. No: 42, Alsancak / İzmir</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sage-400 shrink-0 mt-0.5" />
                <span>Alaçatı Sanctuary Koyu, Çeşme / İzmir (Yaz Dönemi)</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Mail className="w-4 h-4 text-champagne-500 shrink-0" />
                <span>concierge@auratheta.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-champagne-500 shrink-0" />
                <span>+90 (212) 890 42 70</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sanctuary-500">
          <div>
            © {new Date().getFullYear()} AURA THETA Healing & Quantum AI. Tüm hakları saklıdır.
          </div>

          <div className="text-[11px] text-sanctuary-500 text-center sm:text-right max-w-md">
            * ThetaHealing® tıbbi bir tedavi yöntemi olmayıp tamamlayıcı bir zihinsel dönüşüm felsefesidir.
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-sanctuary-900 hover:bg-sanctuary-800 text-sanctuary-400 hover:text-white transition"
            aria-label="Yukarı Çık"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
