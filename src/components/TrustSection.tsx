import { useEffect, useRef, useState } from 'react';
import { Lock, Trash2, Heart } from 'lucide-react';

type TrustCard = {
  id: string;
  title: string;
  description: string;
  icon: typeof Lock;
};

const trustCards: TrustCard[] = [
  {
    id: 'local-first',
    title: 'Local-First Processing',
    description: 'Your voice data stays on your device whenever possible. What you share in the dark, stays in the dark.',
    icon: Lock,
  },
  {
    id: 'ephemeral',
    title: 'Ephemeral Memory',
    description: 'Choose what Whispr remembers. Wipe conversations with a single tap, no questions asked.',
    icon: Trash2,
  },
  {
    id: 'judgment-free',
    title: 'Judgment-Free Zone',
    description: 'Built to empathize, not to solve. A digital sanctuary designed purely for emotional support.',
    icon: Heart,
  },
];

export default function TrustSection() {
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
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-6xl mx-auto px-container-padding py-section-margin my-section-margin"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {trustCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className={`flex flex-col items-center md:items-start transition-all duration-600 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-navy-600 flex items-center justify-center mb-4">
                <Icon className="text-navy-50/70" size={24} strokeWidth={1.5} />
              </div>
              <h4 className="font-display text-headline-lg-mobile text-navy-50 mb-2 text-[20px]">
                {card.title}
              </h4>
              <p className="font-sans text-body-md text-navy-50/70 text-sm">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
