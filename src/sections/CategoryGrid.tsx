import { ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const categories = [
  {
    title: 'Beginner Courses',
    image: '/category_beginner.jpg',
    description: 'Start your journey',
    filter: 'beginner'
  },
  {
    title: 'Advanced Advertising',
    image: '/category_advanced.jpg',
    description: 'Master paid ads',
    filter: 'advertising'
  },
  {
    title: 'Social Media Systems',
    image: '/category_social.jpg',
    description: 'Grow your presence',
    filter: 'social'
  }
];

export function CategoryGrid() {
  const { setCurrentView } = useApp();

  const handleCategoryClick = () => {
    setCurrentView('products');
  };

  return (
    <section className="relative min-h-screen w-full bg-aria-dark overflow-hidden py-24 lg:py-32">
      <div className="w-full px-6 lg:px-12">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-4">
            Choose Your Path
          </h2>
          <button
            onClick={handleCategoryClick}
            className="inline-flex items-center gap-2 text-white/60 hover:text-aria-pink transition-colors font-label text-sm tracking-wider uppercase"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Panels */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category) => (
            <div 
              key={category.title}
              className="group cursor-pointer"
              onClick={handleCategoryClick}
            >
              {/* Image Panel */}
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden mb-4">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-aria-pink/0 group-hover:bg-aria-pink/10 transition-colors duration-300" />
              </div>

              {/* Label */}
              <div>
                <h3 className="font-display font-semibold text-xl text-white group-hover:text-aria-pink transition-colors">
                  {category.title}
                </h3>
                <p className="text-white/50 text-sm mt-1">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
