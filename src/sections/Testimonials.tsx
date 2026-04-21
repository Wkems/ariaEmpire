import { Star, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { testimonials } from '@/data/products';
import { getAssetPath } from '@/lib/utils';

export function Testimonials() {
  const { setCurrentView } = useApp();
  const testimonial = testimonials[0];

  return (
    <section className="relative min-h-screen w-full bg-aria-dark overflow-hidden py-24 lg:py-32">
      <div className="w-full px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]">
          {/* Left - Portrait Image */}
          <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[70vh] rounded-lg overflow-hidden">
            <img
              src={getAssetPath(testimonial.image)}
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border border-white/10" />
          </div>

          {/* Right - Quote */}
          <div className="flex flex-col justify-center">
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl text-white leading-snug mb-8">
              "{testimonial.quote}"
            </blockquote>

            {/* Attribution */}
            <div className="flex items-center gap-4 mb-6">
              <div>
                <div className="font-display font-semibold text-white text-lg">
                  {testimonial.name}
                </div>
                <div className="text-white/50">
                  {testimonial.role}
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('products')}
              className="inline-flex items-center gap-2 text-aria-pink hover:text-aria-pink/80 transition-colors font-label text-sm tracking-wider uppercase"
            >
              Read more stories
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
