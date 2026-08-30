import { useEffect, useRef, useState } from 'react';
import { Leaf, Zap, Compass } from 'lucide-react';

type Persona = {
  id: string;
  title: string;
  description: string;
  icon: typeof Leaf;
  hoverClasses: string;
  glowClasses: string;
  iconBg: string;
  iconColor: string;
  offsetClass: string;
};

const personas: Persona[] = [
  {
    id: 'calm-listener',
    title: 'The Calm Listener',
    description: 'Non-judgmental, gentle, and present. Perfect for untangling late-night thoughts.',
    icon: Leaf,
    hoverClasses: 'hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(196,204,230,0.25)]',
    glowClasses: 'group-hover:from-accent-200/15',
    iconBg: 'bg-navy-500',
    iconColor: 'text-accent-200',
    offsetClass: 'md:mt-0',
  },
  {
    id: 'energetic-friend',
    title: 'The Energetic Friend',
    description: 'Upbeat, curious, and witty. A perfect match for banishing loneliness and sparking joy.',
    icon: Zap,
    hoverClasses: 'hover:-translate-y-3 hover:shadow-[0_24px_70px_-15px_rgba(255,193,116,0.35)]',
    glowClasses: 'group-hover:from-primary-300/15',
    iconBg: 'bg-navy-500',
    iconColor: 'text-secondary-300',
    offsetClass: 'md:mt-8',
  },
  {
    id: 'motivational-coach',
    title: 'The Motivational Coach',
    description: 'Direct, inspiring, and focused. Designed to help you reflect on your goals and push forward.',
    icon: Compass,
    hoverClasses: 'hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(196,204,230,0.25)]',
    glowClasses: 'group-hover:from-accent-300/15',
    iconBg: 'bg-navy-500',
    iconColor: 'text-accent-300',
    offsetClass: 'md:mt-16',
  },
];

export default function Personas() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="personas"
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto px-container-padding mb-section-margin relative z-20 -mt-16"
    >
      <div
        className={`flex flex-col items-center text-center mb-12 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <span className="font-label-sm text-primary-300 tracking-widest uppercase mb-4">
          Personas
        </span>
        <h2 className="font-display text-headline-lg text-navy-50">Meet Your Companions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {personas.map((persona, index) => {
          const Icon = persona.icon;
          return (
            <div
              key={persona.id}
              className={`bg-navy-600/60 backdrop-blur-2xl rounded-[2rem] p-8 shadow-xl transition-all duration-500 group relative overflow-hidden flex flex-col items-start text-left cursor-pointer ${persona.hoverClasses} ${persona.offsetClass} ${
                visible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${visible ? index * 150 : 0}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${persona.glowClasses} via-transparent to-transparent transition-colors duration-500`}
              />
              <div
                className={`w-14 h-14 rounded-full ${persona.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-md`}
              >
                <Icon className={persona.iconColor} size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-headline-lg-mobile text-navy-50 mb-2">
                {persona.title}
              </h3>
              <p className="font-sans text-body-md text-navy-50/70">
                {persona.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
