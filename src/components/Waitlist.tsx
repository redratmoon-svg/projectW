import { useState } from 'react';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Status = 'idle' | 'loading' | 'success' | 'error' | 'duplicate';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = email.trim().toLowerCase();

    if (!normalized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const { error } = await supabase
        .from('waitlist_signups')
        .insert({ email: normalized });

      if (error) {
        // 23505 = unique_violation (duplicate email)
        if (error.code === '23505') {
          setStatus('duplicate');
          return;
        }
        throw error;
      }

      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="waitlist" className="w-full max-w-4xl mx-auto px-container-padding mb-[120px] flex flex-col items-center text-center">
      <div className="w-full bg-navy-600/30 rounded-[3rem] p-12 md:p-20 flex flex-col items-center relative overflow-hidden backdrop-blur-xl shadow-2xl">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary-300/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-secondary-200/10 rounded-full blur-[80px] pointer-events-none" />

        <h2 className="font-display text-headline-lg text-navy-50 mb-4 relative z-10">
          Find your space.
        </h2>
        <p className="font-sans text-body-md text-navy-50/70 mb-8 max-w-md relative z-10">
          Early access rolling out weekly
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-md relative flex items-center z-10">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error' || status === 'duplicate') setStatus('idle');
            }}
            placeholder="Enter your email address"
            required
            disabled={status === 'loading'}
            className="w-full bg-navy-800/80 text-navy-50 font-sans text-body-md px-6 py-4 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-300/50 transition-all placeholder:text-navy-50/40 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="absolute right-2 top-2 bottom-2 bg-primary-300 text-primary-700 font-label-sm px-6 rounded-full hover:scale-105 transition-transform shadow-md disabled:opacity-60 disabled:hover:scale-100 font-medium flex items-center justify-center min-w-[72px]"
          >
            {status === 'loading' ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              'Join'
            )}
          </button>
        </form>

        <div className="mt-4 h-6 relative z-10">
          {status === 'success' && (
            <p className="font-label-sm text-success flex items-center gap-2 justify-center">
              <Check size={16} />
              You're on the list. We'll be in touch soon.
            </p>
          )}
          {status === 'duplicate' && (
            <p className="font-label-sm text-primary-300 flex items-center gap-2 justify-center">
              <Check size={16} />
              You're already on the list — we'll reach out soon.
            </p>
          )}
          {status === 'error' && (
            <p className="font-label-sm text-error flex items-center gap-2 justify-center">
              <AlertCircle size={16} />
              Please enter a valid email address.
            </p>
          )}
          {status === 'idle' && (
            <p className="font-label-sm text-navy-50/40">
              No credit card. No spam. Just early access.
            </p>
          )}
          {status === 'loading' && (
            <p className="font-label-sm text-navy-50/40">
              Adding you to the list...
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
