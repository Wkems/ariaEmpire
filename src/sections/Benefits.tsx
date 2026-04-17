import { TrendingUp, Map, GraduationCap } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: 'High-Income Skills',
    description: 'Copywriting, media buying, funnel building—skills businesses pay for.',
  },
  {
    icon: Map,
    title: 'Step-by-Step Roadmap',
    description: 'No guesswork. Follow the plan, do the work, see results.',
  },
  {
    icon: GraduationCap,
    title: 'Beginner → Advanced',
    description: 'Start where you are. Progress at your pace with real projects.',
  },
];

export function Benefits() {
  return (
    <section className="relative w-full bg-background py-24 lg:py-32">
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-black font-bold tracking-tight mb-4">
            Learn. Apply. Earn.
          </h2>
          <p className="text-gray-500 text-lg">
            A clear roadmap from first lesson to first client.
          </p>
        </div>

        {/* Benefit Cards */}
        <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="bento-card p-8 flex flex-col group"
              >
                <div className="w-12 h-12 bg-gray-50 border border-border flex items-center justify-center mb-6 group-hover:border-black transition-colors">
                  <Icon className="w-6 h-6 text-aria-orange" />
                </div>
                <h3 className="font-bold text-xl text-black mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
