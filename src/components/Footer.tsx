import { Share, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-navy-900 py-section-margin mt-section-margin">
      <div className="w-full px-container-padding mx-auto flex flex-col md:flex-row justify-between items-center gap-stack-gap">
        <div className="flex items-center gap-1 opacity-80">
          <span className="font-display text-headline-lg text-navy-50 scale-75 origin-left font-semibold">
            Whispr
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-primary-300" />
        </div>
        <div className="font-label-sm text-navy-50/70">
          Designed for late-night reflection. © 2026 Whispr AI.
        </div>
        <div className="flex gap-gutter">
          <Share size={20} className="text-navy-50/70 hover:text-primary-300 cursor-pointer transition-colors" />
          <Mail size={20} className="text-navy-50/70 hover:text-primary-300 cursor-pointer transition-colors" />
        </div>
      </div>
    </footer>
  );
}
