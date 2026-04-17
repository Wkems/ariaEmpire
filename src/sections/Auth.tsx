import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface AuthProps {
  mode: 'login' | 'signup';
}

export function Auth({ mode }: AuthProps) {
  const { login, signup, setCurrentView } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success'>('error');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      let result;
      if (mode === 'login') {
        result = await login(email, password);
      } else {
        result = await signup(name, email, password);
      }

      if (result.success) {
        if (result.message) {
          setMessage(result.message);
          setMessageType('success');
        } else {
          setCurrentView('products');
        }
      } else {
        setMessage(result.message || 'An unexpected error occurred.');
        setMessageType('error');
      }
    } catch {
      setMessage('An error occurred. Please try again.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const isLogin = mode === 'login';

  return (
    <section className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md px-6">
        {/* Back Button */}
        <button
          onClick={() => setCurrentView('home')}
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="bg-black border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-2xl text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-white/50">
              {isLogin 
                ? 'Sign in to access your dashboard' 
                : 'Start your learning journey today'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/70">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-aria-pink"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/70">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-aria-pink"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/70">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-aria-pink pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-white/30 text-xs">
                Must be at least 6 characters
              </p>
            </div>

            {message && (
              <div className={`p-3 border rounded text-sm transition-colors ${
                messageType === 'error' 
                  ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                  : 'bg-green-500/10 border-green-500/20 text-green-400'
              }`}>
                {message}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-aria-pink hover:bg-aria-pink/90 text-white"
              disabled={isLoading}
            >
              {isLoading 
                ? (isLogin ? 'Signing in...' : 'Creating account...')
                : (isLogin ? 'Sign In' : 'Create Account')
              }
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-white/50 text-sm">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => setCurrentView(isLogin ? 'signup' : 'login')}
                className="ml-1 text-aria-pink hover:text-aria-pink/80 font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
