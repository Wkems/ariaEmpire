import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function CTA() {
  const { setCurrentView } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="relative w-full bg-background py-24 lg:py-32 selection:bg-black selection:text-white">
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-black font-bold tracking-tight mb-4">
            Start your earning journey today.
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            Get the toolkit. Follow the system. Deliver results.
          </p>

          {/* CTA Button */}
          <Button
            onClick={() => setCurrentView('products')}
            size="lg"
            className="bg-[#FF4F00] hover:bg-black text-white px-10 h-14 font-bold text-base transition-all rounded-none mb-12"
          >
            Get Instant Access
            <ArrowRight className="w-5 h-5 ml-3" />
          </Button>

          {/* Newsletter */}
          <div className="border-t border-border pt-12">
            <p className="text-gray-400 text-sm mb-6 uppercase font-bold tracking-widest">
              Get free marketing tips weekly.
            </p>
            
            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-[#00C853] font-bold">
                <Check className="w-5 h-5" />
                <span>Thanks for subscribing!</span>
              </div>
            ) : (
              <form 
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto"
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="flex-1 bg-white border-border text-black placeholder:text-gray-300 focus:border-black rounded-none h-12"
                  required
                />
                <Button
                  type="submit"
                  className="bg-black hover:bg-[#FF4F00] text-white font-bold h-12 rounded-none px-8 transition-colors"
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
