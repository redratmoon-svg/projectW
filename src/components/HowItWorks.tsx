import { useEffect, useRef, useState } from 'react';
import { UserSearch, MessageCircle, Mic } from 'lucide-react';

type Step = {
  id: string;
  number: string;
  title: string;
  icon: typeof UserSearch;
};

const steps: Step[] = [
  {
    id: 'step-1',
    number: '01',
    title: 'Choose your companion persona',
    icon: UserSearch,
  },
  {
    id: 'step-2',
    number: '02',
    title: 'Start a conversation anytime',
    icon: MessageCircle,
  },
  {
    id: 'step-3',
    number: '03',
    title: 'Whispr listens and responds naturally',
    icon: Mic,
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger reveal: 150ms between steps
            steps.forEach((_, i) => {
              setTimeout(() => {
                setVisibleSteps((prev) => {
                  const next = [...prev];
                  next[i] = true;
                  return next;
                });
              }, i * 150);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto px-container-padding py-section-margin my-section-margin relative z-20"
    >
      <div className="flex flex-col items-center text-center mb-12">
        <h2 className="font-display text-headline-lg text-navy-50">How it works</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isVisible = visibleSteps[index];
          return (
            <div
              key={step.id}
              className={`flex flex-col items-center text-center group transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-navy-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <Icon className="text-primary-300" size={32} strokeWidth={1.5} />
                </div>
                <span className="absolute -top-2 -right-2 bg-primary-300 text-primary-700 font-label-sm text-[10px] w-6 h-6 rounded-full flex items-center justify-center shadow-md font-semibold">
                  {step.number}
                </span>
              </div>
              <h3 className="font-display text-headline-lg-mobile text-navy-50 mb-2 text-[20px]">
                {step.title}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}
