import { useEffect, useRef, useState } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const hero = document.getElementById('hero-section');
    heroRef.current = hero;

    if (!hero) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When hero is mostly out of view, switch to solid nav
          setScrolled(!entry.isIntersecting);
        });
      },
      { threshold: 0.1, rootMargin: '-40px 0px 0px 0px' }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-4xl transition-all duration-500 ease-out ${
        scrolled ? 'top-2' : 'top-6'
      }`}
    >
      <div
        className={`rounded-full px-6 flex items-center justify-between border transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-navy-600/80 backdrop-blur-xl py-2 shadow-2xl border-navy-50/10'
            : 'bg-transparent py-3 border-transparent'
        }`}
      >
        <div className="flex items-center gap-1">
          <span className="font-display text-[24px] tracking-tight text-navy-50 font-semibold">
            Whispr
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-primary-300 shadow-[0_0_8px_rgba(255,185,95,0.6)]" />
        </div>

        <nav className="hidden md:flex items-center gap-2">
          <a
            className="font-label-sm text-primary-300 px-4 py-2 rounded-full hover:bg-primary-300/10 transition-colors"
            href="#hero"
          >
            Home
          </a>
          <a
            className="font-label-sm text-navy-50/70 hover:text-navy-50 px-4 py-2 rounded-full hover:bg-navy-400/40 transition-colors"
            href="#personas"
          >
            Personas
          </a>
          <a
            className="font-label-sm text-navy-50/70 hover:text-navy-50 px-4 py-2 rounded-full hover:bg-navy-400/40 transition-colors"
            href="#how-it-works"
          >
            About
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-primary-300 text-primary-700 font-label-sm px-6 py-2 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md font-medium"
          >
            Join Waitlist
          </button>
          <div className="w-8 h-8 rounded-full bg-navy-500 flex items-center justify-center cursor-pointer hover:bg-navy-400 transition-colors">
            <span className="text-navy-50 text-[16px] leading-none">W</span>
          </div>
        </div>
      </div>
    </header>
  );
}
