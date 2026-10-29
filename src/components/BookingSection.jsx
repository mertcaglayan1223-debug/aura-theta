import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Video, MapPin, CheckCircle, Sparkles, Send, User, Mail, Phone, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

const TIME_SLOTS = [
  { time: '10:30', period: 'Sabah', available: true },
  { time: '13:00', period: 'Öğle', available: true },
  { time: '15:30', period: 'Öğleden Sonra', available: false },
  { time: '17:00', period: 'Akşamüstü', available: true },
  { time: '19:30', period: 'Akşam (VIP)', available: true },
];

export default function BookingSection({ prefilledData, selectedService }) {
  // Available days generator (next 7 days)
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i + 1);
    return {
      date: d,
      dayNumber: d.getDate(),
      dayName: d.toLocaleDateString('tr-TR', { weekday: 'short' }),
      monthName: d.toLocaleDateString('tr-TR', { month: 'short' }),
      fullString: d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
    };
  });

  const [selectedDay, setSelectedDay] = useState(days[0]);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0].time);
  const [sessionFormat, setSessionFormat] = useState('online'); // 'online' or 'in_person'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: prefilledData?.topic || '',
    notes: prefilledData?.rootBelief ? `Tespit Edilen Kök İnanç: ${prefilledData.rootBelief}` : '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync if prefilledData updates
  React.useEffect(() => {
    if (prefilledData) {
      setFormData((prev) => ({
        ...prev,
        topic: prefilledData.topic || prev.topic,
        notes: prefilledData.rootBelief ? `Tespit Edilen Kök İnanç: ${prefilledData.rootBelief}` : prev.notes,
      }));
    }
  }, [prefilledData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#7A8B7B', '#E5C365', '#FAF9F6']
        });
      } catch (err) {}
    }, 1200);
  };

  return (
    <section id="booking" className="py-28 relative bg-[#FAF9F5] border-t border-sanctuary-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-champagne-400/40 text-xs uppercase tracking-[0.2em] font-medium text-sanctuary-700">
            <CalendarIcon className="w-3.5 h-3.5 text-champagne-600" />
            <span>Frictionless Rezervasyon</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-sanctuary-950 leading-tight">
            Dönüşümünüz İçin <br />
            <span className="italic font-normal text-champagne-700">Kutsal Zaman Diliminizi</span> Belirleyin
          </h2>
          <p className="text-sanctuary-600 text-base sm:text-lg">
            Takvimden size en uygun günü ve saati seçin. Seansınız öncesinde niyetiniz analiz edilerek alan hazırlanır.
          </p>
        </div>

        {/* BOOKING CONTAINER */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-champagne-500/30 shadow-subtle-elevated bg-white/95 max-w-5xl mx-auto">
          
          {isSubmitted ? (
            <div className="py-12 text-center space-y-6 animate-in fade-in duration-500">
              <div className="w-20 h-20 rounded-full bg-sage-500/20 text-sage-800 flex items-center justify-center mx-auto shadow-glow-sage">
                <CheckCircle className="w-10 h-10 text-sage-600" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-champagne-700 font-semibold block mb-2">
                  Rezervasyon Talebiniz Onaylandı
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-sanctuary-950 font-normal">
                  Kutsal Alanınız Hazırlandı, Sn. {formData.name || 'Danışanımız'}
                </h3>
                <p className="text-sanctuary-600 max-w-md mx-auto text-sm mt-3 leading-relaxed">
                  Randevu onayınız ve seans hazırlık meditasyon rehberi <strong>{formData.email || 'e-posta adresinize'}</strong> gönderildi. 
                  WhatsApp üzerinden asistanımız seans öncesi hatırlatma sağlayacaktır.
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-sanctuary-50 border border-sanctuary-200 text-left text-xs space-y-2.5">
                <div className="flex justify-between pb-2 border-b border-sanctuary-200/80">
                  <span className="text-sanctuary-500">Tarih & Saat:</span>
                  <strong className="text-sanctuary-900">{selectedDay.fullString} — {selectedTime}</strong>
                </div>
                <div className="flex justify-between pb-2 border-b border-sanctuary-200/80">
                  <span className="text-sanctuary-500">Seans Formatı:</span>
                  <strong className="text-sanctuary-900">{sessionFormat === 'online' ? 'Online (Zoom HD Frekans Odası)' : 'Sanctuary Özel Süiti (Nişantaşı)'}</strong>
                </div>
                {formData.topic && (
                  <div className="flex justify-between pb-2 border-b border-sanctuary-200/80">
                    <span className="text-sanctuary-500">Odak Konusu:</span>
                    <strong className="text-sanctuary-900">{formData.topic}</strong>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sanctuary-500">Hizmet:</span>
                  <strong className="text-champagne-800">{selectedService?.name || 'Birebir Kuantum Theta Seansı'}</strong>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-8 py-3 rounded-full border border-sanctuary-300 text-xs font-medium text-sanctuary-700 hover:bg-sanctuary-100 transition"
                >
                  Yeni Bir Rezervasyon Yap
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Step 1: Format & Location Selection */}
              <div>
                <label className="block text-xs uppercase tracking-widest font-semibold text-sanctuary-500 mb-3">
                  1. Seans Formatını Seçin
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setSessionFormat('online')}
                    className={`p-4 rounded-2xl border text-left flex items-start gap-4 transition-all ${
                      sessionFormat === 'online'
                        ? 'border-champagne-500 bg-champagne-500/10 shadow-sm'
                        : 'border-sanctuary-200 hover:border-sanctuary-300 bg-sanctuary-50/50'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-champagne-500/20 text-champagne-700 flex items-center justify-center shrink-0">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-serif text-lg font-medium text-sanctuary-950">Online Frekans Odası (Zoom HD)</div>
                      <p className="text-xs text-sanctuary-600 mt-1">
                        Kendi evinizin huzurunda kulaklıkla derin Theta rezonansı. Dünyanın her yerinden bağlanın.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSessionFormat('in_person')}
                    className={`p-4 rounded-2xl border text-left flex items-start gap-4 transition-all ${
                      sessionFormat === 'in_person'
                        ? 'border-champagne-500 bg-champagne-500/10 shadow-sm'
                        : 'border-sanctuary-200 hover:border-sanctuary-300 bg-sanctuary-50/50'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-sage-500/20 text-sage-700 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-serif text-lg font-medium text-sanctuary-950">Özel Sanctuary Süiti (Yüz Yüze)</div>
                      <p className="text-xs text-sanctuary-600 mt-1">
                        Nişantaşı / İstanbul özel tasarım akustik şifa odasında kristal çanaklar eşliğinde.
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Step 2: Date Selector (7 upcoming days) */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs uppercase tracking-widest font-semibold text-sanctuary-500">
                    2. Tarih Belirleyin
                  </label>
                  <span className="text-xs text-champagne-700 font-medium">
                    Seçilen: {selectedDay.fullString}
                  </span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {days.map((day) => {
                    const isSelected = selectedDay.dayNumber === day.dayNumber;
                    return (
                      <button
                        key={day.dayNumber}
                        type="button"
                        onClick={() => setSelectedDay(day)}
                        className={`p-3 rounded-2xl text-center border transition-all ${
                          isSelected
                            ? 'bg-sanctuary-900 text-white border-sanctuary-900 shadow-md'
                            : 'bg-sanctuary-50/80 hover:bg-sanctuary-100 text-sanctuary-800 border-sanctuary-200'
                        }`}
                      >
                        <div className={`text-[10px] uppercase font-semibold ${isSelected ? 'text-champagne-300' : 'text-sanctuary-400'}`}>
                          {day.dayName}
                        </div>
                        <div className="font-serif text-xl sm:text-2xl font-bold my-0.5">
                          {day.dayNumber}
                        </div>
                        <div className={`text-[10px] ${isSelected ? 'text-sanctuary-300' : 'text-sanctuary-500'}`}>
                          {day.monthName}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Time Slot Picker */}
              <div>
                <label className="block text-xs uppercase tracking-widest font-semibold text-sanctuary-500 mb-3">
                  3. Saat Dilimi Seçin (90 Dakikalık Blok)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTime === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          !slot.available
                            ? 'opacity-40 cursor-not-allowed bg-sanctuary-100 border-sanctuary-200'
                            : isSelected
                            ? 'bg-champagne-500 text-sanctuary-950 font-semibold border-champagne-500 shadow-sm'
                            : 'bg-white hover:bg-champagne-50/50 border-sanctuary-200 text-sanctuary-800'
                        }`}
                      >
                        <div className="text-xs font-mono font-bold">{slot.time}</div>
                        <div className="text-[10px] mt-0.5 opacity-80">
                          {slot.available ? slot.period : 'Dolu'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Client Intake Fields */}
              <div className="pt-4 border-t border-sanctuary-200 space-y-4">
                <label className="block text-xs uppercase tracking-widest font-semibold text-sanctuary-500 mb-2">
                  4. Danışan Ön Bilgilendirme Formu
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-sanctuary-600 block mb-1">Adınız & Soyadınız *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-sanctuary-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Örn: Selin Demir"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-sanctuary-50 border border-sanctuary-200 text-xs text-sanctuary-900 focus:outline-none focus:border-champagne-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-sanctuary-600 block mb-1">E-posta Adresiniz *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-sanctuary-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="selin@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-sanctuary-50 border border-sanctuary-200 text-xs text-sanctuary-900 focus:outline-none focus:border-champagne-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-sanctuary-600 block mb-1">Telefon / WhatsApp *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-sanctuary-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+90 5XX XXX XX XX"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-sanctuary-50 border border-sanctuary-200 text-xs text-sanctuary-900 focus:outline-none focus:border-champagne-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-sanctuary-600 block mb-1">Odaklanmak İstenen Yaşam Alanı</label>
                    <input
                      type="text"
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      placeholder="Örn: Finansal bolluk, ilişki tıkanıklığı, erteleme..."
                      className="w-full px-4 py-3 rounded-xl bg-sanctuary-50 border border-sanctuary-200 text-xs text-sanctuary-900 focus:outline-none focus:border-champagne-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-sanctuary-600 block mb-1">Seans Öncesi Eklemek İstediğiniz Not</label>
                    <input
                      type="text"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Daha önce Theta seansı aldınız mı veya özel bir durum var mı?"
                      className="w-full px-4 py-3 rounded-xl bg-sanctuary-50 border border-sanctuary-200 text-xs text-sanctuary-900 focus:outline-none focus:border-champagne-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-6 border-t border-sanctuary-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-sanctuary-500">
                  Rezervasyonunuz sonrası seans hazırlık kılavuzu anında iletilecektir.
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-9 py-4 rounded-full bg-sanctuary-950 hover:bg-sanctuary-900 text-white font-medium text-xs tracking-widest uppercase transition-all duration-300 shadow-xl hover:shadow-glow-gold flex items-center justify-center gap-2 animate-shimmer"
                >
                  {isSubmitting ? (
                    <span>Rezervasyon Hazırlanıyor...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-champagne-300" />
                      <span>Rezervasyonu Tamamla</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
