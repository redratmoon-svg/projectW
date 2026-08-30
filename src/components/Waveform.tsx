import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

const BAR_COUNT = 45;

// Pre-generate deterministic bar configs so the idle pattern is stable
const barConfigs = Array.from({ length: BAR_COUNT }, (_, i) => {
  const centerFactor = Math.sin((i / (BAR_COUNT - 1)) * Math.PI);
  const baseHeight = 10 + (Math.random() * 40 + 50) * centerFactor;
  const idleDuration = 2.2 + Math.random() * 1.4;
  const activeDuration = 0.55 + Math.random() * 0.35;
  const delay = i * 0.05;
  return {
    baseHeight: Math.max(10, Math.min(95, baseHeight)),
    idleDuration,
    activeDuration,
    delay,
  };
});

export default function Waveform() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [ripples, setRipples] = useState<number[]>([]);
  const rippleId = useRef(0);

  // Clear ripples after animation completes
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 1200);
    return () => clearTimeout(timer);
  }, [ripples]);

  const handlePlayClick = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    // Emit a ripple pulse when starting playback
    const id = rippleId.current++;
    setRipples((prev) => [...prev, id]);
    setIsPlaying(true);
  };

  return (
    <section className="w-full bg-navy-900 py-[120px] px-container-padding flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-300/5 via-transparent to-transparent pointer-events-none" />

      <h2 className="font-display text-headline-lg text-navy-50 mb-4">Listen closely.</h2>
      <p className="font-sans text-body-md text-navy-50/70 mb-12 max-w-lg text-center">
        Hyper-realistic vocal models engineered for warmth and emotional resonance.
      </p>

      {/* Audio Visualizer */}
      <div
        className="relative flex items-center justify-center gap-1.5 h-32 mb-12 w-full max-w-2xl px-4 cursor-pointer group"
      >
        {/* Ripple overlays */}
        {ripples.map((id) => (
          <span
            key={id}
            className="absolute left-1/2 top-1/2 w-24 h-24 rounded-full bg-primary-300/20 pointer-events-none"
            style={{ animation: 'ripple-pulse 1.2s ease-out forwards' }}
          />
        ))}

        {barConfigs.map((bar, i) => (
          <div
            key={i}
            className="wave-bar w-1.5 rounded-full bg-navy-300 transition-colors duration-300 group-hover:bg-primary-300/80"
            style={{
              height: `${bar.baseHeight}%`,
              animation: isPlaying
                ? `bar-active ${bar.activeDuration}s ease-in-out ${bar.delay}s infinite`
                : `bar-idle ${bar.idleDuration}s ease-in-out ${bar.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <button
        onClick={handlePlayClick}
        className="bg-navy-400 text-navy-50 font-label-sm px-6 py-3 rounded-full hover:bg-navy-300 transition-colors shadow-lg flex items-center gap-2 font-medium"
      >
        {isPlaying ? (
          <Pause size={18} fill="currentColor" strokeWidth={0} />
        ) : (
          <Play size={18} fill="currentColor" strokeWidth={0} />
        )}
        {isPlaying ? 'Pause Sample' : 'Play Sample'}
      </button>
    </section>
  );
}
