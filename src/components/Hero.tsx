import { useEffect, useRef } from 'react';

export default function Hero() {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        if (blob1Ref.current) {
          blob1Ref.current.style.transform = `translate(${x * 100}px, ${y * 100}px)`;
        }
        if (blob2Ref.current) {
          blob2Ref.current.style.transform = `translate(${x * -80}px, ${y * -80}px)`;
        }
      });
    };

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="hero-section"
      className="relative w-full flex flex-col items-center justify-center min-h-[768px] px-container-padding pt-32 pb-24 text-center z-10 overflow-hidden"
    >
      {/* Ambient gradient mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          ref={blob1Ref}
          className="absolute w-[600px] h-[600px] bg-primary-300/20 rounded-full blur-[120px] transition-transform duration-1000 ease-out"
          style={{ top: '-10%', left: '20%' }}
        />
        <div
          ref={blob2Ref}
          className="absolute w-[500px] h-[500px] bg-secondary-200/20 rounded-full blur-[100px] transition-transform duration-1000 ease-out"
          style={{ bottom: '-10%', right: '10%' }}
        />
      </div>

      <h1 className="font-display text-display-lg text-navy-50 max-w-4xl tracking-tight mb-stack-gap">
        Someone to talk to,
        <br />
        whenever you need it.
      </h1>

      <p className="font-sans text-body-md text-navy-50/70 max-w-2xl mb-8 text-[18px]">
        An AI voice companion for late-night thoughts and quiet moments.
      </p>

      <button
        onClick={() => {
          document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="bg-primary-300 text-primary-700 font-label-sm px-8 py-4 rounded-full hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-[0_0_40px_rgba(255,193,116,0.25)] flex items-center gap-2 group font-medium"
      >
        Join the Waitlist
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </button>
    </section>
  );
}
