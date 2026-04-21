import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function Hero() {
  const { setCurrentView } = useApp();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple fade-in animation on mount
    if (sectionRef.current) {
      sectionRef.current.style.opacity = '0';
      sectionRef.current.style.transform = 'translateY(20px)';
      
      requestAnimationFrame(() => {
        if (sectionRef.current) {
          sectionRef.current.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
          sectionRef.current.style.opacity = '1';
          sectionRef.current.style.transform = 'translateY(0)';
        }
      });
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full bg-aria-dark overflow-hidden pt-16"
    >
      <div className="relative z-10 w-full min-h-screen flex items-center">
        <div className="w-full px-6 lg:px-12 py-12 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="max-w-xl">
              {/* Label */}
              <div className="mb-6">
                <span className="font-label text-xs tracking-[0.2em] uppercase text-white/50">
                  Digital Products Marketplace
                </span>
                <div className="mt-3 w-24 h-px bg-white/20" />
              </div>

              {/* Headline */}
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[0.95] tracking-tight mb-6">
                Master Digital Marketing{' '}
                <span className="text-aria-pink">& Start Earning</span> Online
              </h1>

              {/* Subheadline */}
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Step-by-step courses, proven toolkits, and high-income skill guides—built for beginners ready to grow.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => setCurrentView('products')}
                  size="lg"
                  className="bg-aria-pink hover:bg-aria-pink/90 text-white px-8"
                >
                  Browse Products
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  onClick={() => setCurrentView('products')}
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 px-8"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Learning
                </Button>
              </div>

              {/* Trust Badge */}
              <p className="mt-8 text-white/40 text-sm">
                Instant access • Download anytime • 30-day satisfaction
              </p>
            </div>

            {/* Right Image */}
            <div className="relative lg:h-[70vh] flex items-center justify-center">
              <div className="relative w-full max-w-lg lg:max-w-none aspect-[3/4] lg:h-full rounded-lg overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}hero_workspace.jpg`}
                  alt="Modern workspace"
                  className="w-full h-full object-cover"
                />
                {/* Clean overlay */}
                <div className="absolute inset-0 border border-white/10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clean black background */}
      <div className="absolute inset-0 bg-aria-dark -z-10" />
    </section>
  );
}
