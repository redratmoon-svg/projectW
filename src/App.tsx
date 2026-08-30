import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Personas from '@/components/Personas';
import HowItWorks from '@/components/HowItWorks';
import Waveform from '@/components/Waveform';
import TrustSection from '@/components/TrustSection';
import Waitlist from '@/components/Waitlist';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="grain-overlay min-h-screen bg-navy-800 text-navy-50 font-sans">
      <Navigation />
      <main className="w-full relative">
        <Hero />
        <Personas />
        <HowItWorks />
        <Waveform />
        <TrustSection />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}
