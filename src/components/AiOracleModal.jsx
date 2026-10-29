import React, { useState } from 'react';
import { X, Sparkles, Send, Brain, Bot, User, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

const SUGGESTIONS = [
  'Parayı elimde tutamıyorum, sürekli yokluk korkusu yaşıyorum.',
  'İlişkilerde hep terk edilme ve sevilmeme endişem var.',
  'Büyük bir potansiyelim var ama görünür olmaktan çok korkuyorum.',
  'Sürekli tükenmiş hissediyorum ve her şeyi ertelemek istiyorum.'
];

export default function AiOracleModal({ isOpen, onClose, onSelectBooking }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hoş geldiniz. Ben Aura AI — Theta Healing kuantum bilinçaltı rehberiyim. Şu anda zihninizde sizi en çok kısıtlayan döngüyü veya içsel hissi paylaşın; kök inancınızı ve size özel hissiyat yüklemesini anında keşfedelim.',
      rootAnalysis: null
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (textToSend) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const userMsg = { role: 'user', content: messageText };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let root = '';
      let instillation = '';
      let freq = '432 Hz';
      let lower = messageText.toLowerCase();

      if (lower.includes('para') || lower.includes('yokluk') || lower.includes('kazanç') || lower.includes('finans')) {
        root = '“Paraya sahip olmak maneviyatımı zedeler / Ailemin yokluğuna sadık kalmalıyım.”';
        instillation = '“Yaratıcı katında hem derin manevi huzurda kalıp hem de sınırsız maddi bolluk içinde yaşamanın nasıl bir his olduğunu biliyorum ve izin veriyorum.”';
        freq = '528 Hz Hücresel Tezahür Frekansı';
      } else if (lower.includes('ilişki') || lower.includes('terk') || lower.includes('sevgi') || lower.includes('sevilme')) {
        root = '“Sevilmek için kendimden vazgeçmeli ve başkalarını kurtarmalıyım.”';
        instillation = '“Koşulsuz sevilmeyi, saygı görmeyi ve kendi sınırlarımı korurken bir ilişkide tam olarak güvende hissetmenin Yaratıcı tanımını anlıyorum.”';
        freq = '432 Hz Kalp & Theta Rezonansı';
      } else if (lower.includes('görünür') || lower.includes('korku') || lower.includes('özgüven') || lower.includes('potansiyel')) {
        root = '“Işığımı parlatırsam kıskanılırım, dışlanırım veya hedef olurum.”';
        instillation = '“Bütün yeteneklerim ve başarımla dünyada parlamanın, güvende olmanın ve sevgiyle kabul görmenin Yaratıcı tanımını biliyorum.”';
        freq = '432 Hz Özdeğer Koheransı';
      } else {
        root = '“Dinlenirsem kontrolü kaybederim; var olmak için sürekli mücadele etmeliyim.”';
        instillation = '“Hayatın akışına güvenmenin, sükunet içinde üretmenin ve mücadele etmeden de başarılı olmanın mümkün olduğunu anlıyorum.”';
        freq = '7.83 Hz Topraklanma Frekansı';
      }

      const aiMsg = {
        role: 'assistant',
        content: 'Zihninizin dile getirdiği bu cümlenin altında güçlü bir epigenetik savunma kalkanı tespit edildi.',
        rootAnalysis: {
          root,
          instillation,
          freq,
          rawTopic: messageText
        }
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sanctuary-950/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl rounded-3xl glass-card bg-white/95 border border-champagne-400/40 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-sanctuary-200/80 flex items-center justify-between bg-sanctuary-50/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-champagne-500/20 text-champagne-800 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-champagne-600" />
            </div>
            <div>
              <div className="font-serif text-lg font-medium text-sanctuary-950">
                Aura AI • Bilinçaltı Oracle
              </div>
              <div className="text-[10px] uppercase tracking-wider text-sanctuary-500 font-mono">
                Theta Kuantum Analiz Asistanı
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-sanctuary-400 hover:text-sanctuary-800 hover:bg-sanctuary-200/60 transition"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-champagne-500/20 text-champagne-700 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-sanctuary-900 text-white rounded-tr-none'
                    : 'glass-card bg-sanctuary-50/90 border border-sanctuary-200 text-sanctuary-900 rounded-tl-none space-y-3'
                }`}
              >
                <p>{m.content}</p>

                {/* If AI message contains root analysis */}
                {m.rootAnalysis && (
                  <div className="space-y-3 pt-2 border-t border-sanctuary-200">
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block mb-1">
                        Çekirdek Kök İnanç:
                      </span>
                      <span className="font-serif text-base italic text-amber-950 block">
                        {m.rootAnalysis.root}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-sage-500/10 border border-sage-500/20">
                      <span className="text-[10px] uppercase font-bold text-sage-800 tracking-wider block mb-1">
                        Şifa Verici Hissiyat Yüklemesi:
                      </span>
                      <span className="font-serif text-base italic text-sage-950 block">
                        {m.rootAnalysis.instillation}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-[11px] text-sanctuary-500">
                        Frekans: <strong className="text-champagne-700">{m.rootAnalysis.freq}</strong>
                      </span>
                      <a
                        href="#booking"
                        onClick={() => {
                          onClose();
                          if (onSelectBooking) {
                            onSelectBooking({
                              topic: m.rootAnalysis.rawTopic,
                              rootBelief: m.rootAnalysis.root
                            });
                          }
                        }}
                        className="px-3 py-1.5 rounded-full bg-sanctuary-900 text-white text-[11px] font-medium hover:bg-sanctuary-800 transition flex items-center gap-1"
                      >
                        <span>Seans Ayır</span>
                        <ArrowRight className="w-3 h-3 text-champagne-300" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-full bg-sanctuary-200 text-sanctuary-800 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center text-xs text-sanctuary-400 pl-10 font-mono">
              <span className="w-2 h-2 rounded-full bg-champagne-500 animate-ping" />
              <span>Aura AI zihinsel frekansı ayrıştırıyor...</span>
            </div>
          )}
        </div>

        {/* Suggestion Chips */}
        {messages.length === 1 && (
          <div className="px-6 py-2 flex flex-wrap gap-2 border-t border-sanctuary-100 bg-sanctuary-50/40">
            <span className="text-[10px] uppercase tracking-wider text-sanctuary-400 font-semibold w-full">
              Hızlı Başlangıç Örnekleri:
            </span>
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSend(s)}
                className="text-[11px] px-3 py-1 rounded-full border border-champagne-400/40 bg-white hover:bg-champagne-50 text-sanctuary-700 transition"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 border-t border-sanctuary-200/80 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Şu an ne hissediyorsunuz? (Örn: 'Kendimi yetersiz hissediyorum...')"
              className="flex-1 px-4 py-3 rounded-2xl bg-sanctuary-50 border border-sanctuary-200 text-xs text-sanctuary-900 focus:outline-none focus:border-champagne-500 transition"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-3 rounded-2xl bg-sanctuary-900 hover:bg-sanctuary-800 text-white disabled:opacity-40 transition"
              aria-label="Gönder"
            >
              <Send className="w-4 h-4 text-champagne-300" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
