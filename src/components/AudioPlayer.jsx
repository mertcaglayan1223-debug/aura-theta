import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, Sliders, ChevronUp, ChevronDown, Waves } from 'lucide-react';

const FREQUENCY_PRESETS = [
  {
    id: 'theta_432',
    name: '432 Hz & Theta (5.5 Hz)',
    subtitle: 'Derin Bilinçaltı & Kalp Rezonansı',
    baseFreq: 432,
    binauralDiff: 5.5,
    tag: 'Tavsiye Edilen'
  },
  {
    id: 'theta_528',
    name: '528 Hz Hücresel Onarım',
    subtitle: 'DNA Frekansı & Yeniden Yapılanma',
    baseFreq: 528,
    binauralDiff: 6.0,
    tag: 'Dönüşüm'
  },
  {
    id: 'schumann_783',
    name: '7.83 Hz Schumann Frekansı',
    subtitle: 'Yeryüzü Titreşimi & Köklenme',
    baseFreq: 194.18, // Earth tone
    binauralDiff: 4.8,
    tag: 'Topraklanma'
  }
];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.28);
  const [selectedPreset, setSelectedPreset] = useState(FREQUENCY_PRESETS[0]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [waveAnimation, setWaveAnimation] = useState([12, 24, 18, 30, 16, 26]);

  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const oscLeftRef = useRef(null);
  const oscRightRef = useRef(null);
  const noiseNodeRef = useRef(null);
  const noiseGainRef = useRef(null);

  // Initialize Web Audio graph
  const initAudio = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Stereo merger for binaural beat
      const merger = ctx.createChannelMerger(2);
      merger.connect(masterGain);

      // Left Channel
      const oscLeft = ctx.createOscillator();
      oscLeft.type = 'sine';
      oscLeft.frequency.setValueAtTime(selectedPreset.baseFreq, ctx.currentTime);

      const gainLeft = ctx.createGain();
      gainLeft.gain.value = 0.5;
      oscLeft.connect(gainLeft);
      gainLeft.connect(merger, 0, 0); // left to channel 0
      oscLeft.start();
      oscLeftRef.current = oscLeft;

      // Right Channel (baseFreq + binauralDiff)
      const oscRight = ctx.createOscillator();
      oscRight.type = 'sine';
      oscRight.frequency.setValueAtTime(selectedPreset.baseFreq + selectedPreset.binauralDiff, ctx.currentTime);

      const gainRight = ctx.createGain();
      gainRight.gain.value = 0.5;
      oscRight.connect(gainRight);
      gainRight.connect(merger, 0, 1); // right to channel 1
      oscRight.start();
      oscRightRef.current = oscRight;

      // Gentle ocean/wind breath pink noise generator
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.04;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, ctx.currentTime);

      noiseSource.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(masterGain);
      noiseSource.start();

      noiseNodeRef.current = noiseSource;
      noiseGainRef.current = noiseGain;
    } catch (e) {
      console.warn('AudioContext init error:', e);
    }
  };

  const togglePlay = async () => {
    if (!audioCtxRef.current) {
      initAudio();
    }

    if (audioCtxRef.current?.state === 'suspended') {
      await audioCtxRef.current.resume();
    }

    if (!masterGainRef.current) return;

    const ctx = audioCtxRef.current;
    if (isPlaying) {
      // Fade out smoothly
      masterGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
      masterGainRef.current.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      setTimeout(() => {
        setIsPlaying(false);
      }, 800);
    } else {
      // Fade in smoothly
      masterGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
      masterGainRef.current.gain.linearRampToValueAtTime(isMuted ? 0 : volume, ctx.currentTime + 1.2);
      setIsPlaying(true);
    }
  };

  // Change preset frequency
  const handlePresetSelect = (preset) => {
    setSelectedPreset(preset);
    if (oscLeftRef.current && oscRightRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      const rampTime = ctx.currentTime + 1.0;
      oscLeftRef.current.frequency.exponentialRampToValueAtTime(Math.max(20, preset.baseFreq), rampTime);
      oscRightRef.current.frequency.exponentialRampToValueAtTime(Math.max(20, preset.baseFreq + preset.binauralDiff), rampTime);
    }
  };

  // Update volume
  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (masterGainRef.current && audioCtxRef.current && isPlaying && !isMuted) {
      masterGainRef.current.gain.setValueAtTime(newVol, audioCtxRef.current.currentTime);
    }
  };

  const toggleMute = () => {
    if (!masterGainRef.current || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (isMuted) {
      masterGainRef.current.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.3);
      setIsMuted(false);
    } else {
      masterGainRef.current.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
      setIsMuted(true);
    }
  };

  // Visual wave bars animation
  useEffect(() => {
    if (!isPlaying || isMuted) {
      setWaveAnimation([4, 4, 4, 4, 4, 4]);
      return;
    }
    const interval = setInterval(() => {
      setWaveAnimation([
        Math.floor(Math.random() * 20 + 8),
        Math.floor(Math.random() * 26 + 10),
        Math.floor(Math.random() * 22 + 6),
        Math.floor(Math.random() * 28 + 12),
        Math.floor(Math.random() * 18 + 8),
        Math.floor(Math.random() * 24 + 10),
      ]);
    }, 180);
    return () => clearInterval(interval);
  }, [isPlaying, isMuted]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Control Drawer */}
      {isExpanded && (
        <div className="mb-3 w-80 rounded-2xl glass-sanctuary p-5 shadow-2xl border border-champagne-500/20 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-sanctuary-200/60 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-champagne-500" />
              <span className="text-xs uppercase tracking-widest font-semibold text-sanctuary-800">
                Theta Meditatif Alan
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-sanctuary-500 hover:text-sanctuary-800 p-1 rounded-full hover:bg-sanctuary-200/40 transition"
              aria-label="Kapat"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-sanctuary-600 mb-4 leading-relaxed">
            Kulaklık ile dinlendiğinde sağ ve sol beyin yarım kürelerini 4-7 Hz Theta bandında senkronize eden saf kuantum frekansları.
          </p>

          {/* Presets List */}
          <div className="space-y-2 mb-4">
            {FREQUENCY_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePresetSelect(preset)}
                className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between text-xs ${
                  selectedPreset.id === preset.id
                    ? 'bg-champagne-500/15 border border-champagne-500/40 text-sanctuary-900 shadow-sm font-medium'
                    : 'bg-sanctuary-100/50 hover:bg-sanctuary-100 border border-transparent text-sanctuary-700'
                }`}
              >
                <div>
                  <div className="font-semibold text-sanctuary-900">{preset.name}</div>
                  <div className="text-[10px] text-sanctuary-500">{preset.subtitle}</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-champagne-500/10 text-champagne-700 font-medium">
                  {preset.tag}
                </span>
              </button>
            ))}
          </div>

          {/* Volume Slider */}
          <div className="space-y-1.5 pt-2 border-t border-sanctuary-200/60">
            <div className="flex justify-between text-[11px] text-sanctuary-600">
              <span className="flex items-center gap-1">
                <Sliders className="w-3 h-3 text-champagne-500" /> Ses Düzeyi
              </span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1.5 bg-sanctuary-200 rounded-lg appearance-none cursor-pointer accent-champagne-500"
            />
          </div>
        </div>
      )}

      {/* Floating Pill Button */}
      <div className="flex items-center gap-2 p-2 rounded-full glass-sanctuary shadow-glow-gold border border-champagne-500/30 backdrop-blur-xl">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-sanctuary-900 text-sanctuary-50 hover:bg-sanctuary-800 transition shadow-sm text-xs font-medium tracking-wide group"
        >
          {isPlaying && !isMuted ? (
            <>
              {/* Dynamic Animated Bars */}
              <div className="flex items-end gap-0.5 h-4 w-4">
                {waveAnimation.slice(0, 3).map((height, i) => (
                  <span
                    key={i}
                    style={{ height: `${height}px` }}
                    className="w-1 bg-champagne-400 rounded-full transition-all duration-150"
                  />
                ))}
              </div>
              <span className="text-champagne-300">432Hz Aktif</span>
            </>
          ) : (
            <>
              <Waves className="w-3.5 h-3.5 text-champagne-400 group-hover:scale-110 transition" />
              <span>Frekansı Başlat</span>
            </>
          )}
        </button>

        {/* Mute / Unmute Button */}
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="p-2 rounded-full text-sanctuary-700 hover:text-sanctuary-900 hover:bg-sanctuary-200/50 transition"
            title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-sanctuary-400" /> : <Volume2 className="w-4 h-4 text-champagne-600" />}
          </button>
        )}

        {/* Drawer Trigger */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-full text-sanctuary-700 hover:text-sanctuary-900 hover:bg-sanctuary-200/50 transition"
          title="Frekans Ayarları"
        >
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
