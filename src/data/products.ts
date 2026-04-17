import type { Product, Testimonial, User } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    title: 'The Digital Edge',
    description: 'A comprehensive guide to modern SaaS marketing strategies that drive growth.',
    price: 49000,
    category: 'toolkit',
    image: '/product_1.jpg',
    rating: 4.9,
    reviews: 128,
    featured: true,
    bestseller: true,
    sellerUrl: 'https://seller-platform.com/course/digital-edge',
    whatsIncluded: ['120-page eBook', 'Marketing templates', 'Checklist PDF', 'Video walkthrough'],
    outcomes: ['Build a complete marketing strategy', 'Generate qualified leads', 'Increase conversion rates']
  },
  {
    id: '2',
    title: 'Social Media Marketing Masterclass',
    description: 'Unlock your brand\'s potential with proven social media strategies.',
    price: 79000,
    category: 'social',
    image: '/product_2.jpg',
    rating: 4.8,
    reviews: 96,
    featured: true,
    bestseller: true,
    whatsIncluded: ['8 video modules', 'Content calendar template', 'Hashtag research guide', 'Analytics tracker'],
    outcomes: ['Grow your following organically', 'Create viral content', 'Convert followers to customers']
  },
  {
    id: '3',
    title: 'Email Marketing Toolkit',
    description: 'Premium SaaS solutions for email campaigns that convert.',
    price: 59000,
    category: 'advertising',
    image: '/product_3.jpg',
    rating: 4.7,
    reviews: 84,
    featured: true,
    whatsIncluded: ['Email sequence templates', 'Subject line formulas', 'A/B testing guide', 'Automation workflows'],
    outcomes: ['Increase open rates', 'Boost click-through rates', 'Maximize ROI from email']
  },
  {
    id: '4',
    title: 'SEO Mastery Course',
    description: 'Unlock search analytics and drive organic growth.',
    price: 89000,
    category: 'advanced',
    image: '/product_4.jpg',
    rating: 4.9,
    reviews: 156,
    bestseller: true,
    whatsIncluded: ['12 video lessons', 'Keyword research tool', 'SEO audit checklist', 'Link building guide'],
    outcomes: ['Rank on page 1 of Google', 'Drive organic traffic', 'Build domain authority']
  },
  {
    id: '5',
    title: 'Copywriting Mastery',
    description: 'Timeless principles for the digital age. Learn to write copy that sells.',
    price: 69000,
    category: 'beginner',
    image: '/product_5.jpg',
    rating: 4.8,
    reviews: 112,
    whatsIncluded: ['Copywriting formulas', 'Swipe file collection', 'Headline templates', 'Sales page blueprint'],
    outcomes: ['Write compelling copy', 'Increase conversions', 'Master persuasion techniques']
  },
  {
    id: '6',
    title: 'Funnel Mastery',
    description: 'Build and automate your sales process for maximum revenue.',
    price: 99000,
    category: 'advanced',
    image: '/product_6.jpg',
    rating: 4.9,
    reviews: 78,
    whatsIncluded: ['Funnel mapping templates', 'Automation guides', 'Conversion optimization', 'Case studies'],
    outcomes: ['Build high-converting funnels', 'Automate your sales', 'Scale your business']
  },
  {
    id: '7',
    title: 'Google Ads Mastery',
    description: 'Unlock your full potential with Google Ads campaigns that deliver ROI.',
    price: 79000,
    category: 'advertising',
    image: '/product_7.jpg',
    rating: 4.7,
    reviews: 92,
    whatsIncluded: ['Campaign setup guide', 'Keyword strategies', 'Bid optimization', 'Tracking templates'],
    outcomes: ['Launch profitable campaigns', 'Reduce cost per acquisition', 'Scale your advertising']
  },
  {
    id: '8',
    title: 'Content Strategy Playbook',
    description: 'Editorial calendar and content planner for consistent growth.',
    price: 39000,
    category: 'beginner',
    image: '/product_8.jpg',
    rating: 4.6,
    reviews: 64,
    whatsIncluded: ['Content calendar template', 'Ideation framework', 'Distribution guide', 'Metrics tracker'],
    outcomes: ['Plan content efficiently', 'Maintain consistency', 'Measure content ROI']
  },
  {
    id: '9',
    title: 'Affiliate Marketing Blueprint',
    description: 'Unlock your digital income stream with affiliate marketing.',
    price: 59000,
    category: 'beginner',
    image: '/product_9.jpg',
    rating: 4.5,
    reviews: 58,
    whatsIncluded: ['Affiliate strategy guide', 'Program directory', 'Promotion templates', 'Commission tracker'],
    outcomes: ['Build passive income', 'Find profitable programs', 'Scale affiliate revenue']
  },
  {
    id: '10',
    title: 'TikTok Masterclass',
    description: 'The ultimate marketing course for TikTok growth and viral content.',
    price: 69000,
    category: 'social',
    image: '/product_10.jpg',
    rating: 4.8,
    reviews: 134,
    bestseller: true,
    whatsIncluded: ['Video creation guide', 'Trend analysis', 'Hashtag strategies', 'Monetization methods'],
    outcomes: ['Create viral videos', 'Grow your TikTok presence', 'Monetize your content']
  },
  {
    id: '11',
    title: 'E-commerce Mastery',
    description: 'Unlock your online business potential with proven strategies.',
    price: 89000,
    category: 'advanced',
    image: '/product_11.jpg',
    rating: 4.7,
    reviews: 87,
    whatsIncluded: ['Store setup guide', 'Product research methods', 'Conversion optimization', 'Scaling strategies'],
    outcomes: ['Launch your store', 'Find winning products', 'Scale to 6 figures']
  },
  {
    id: '12',
    title: 'Analytics & Data Mastery',
    description: 'Google Analytics certification course for data-driven decisions.',
    price: 79000,
    category: 'advanced',
    image: '/product_12.jpg',
    rating: 4.6,
    reviews: 72,
    whatsIncluded: ['GA4 complete guide', 'Dashboard templates', 'Reporting framework', 'Attribution modeling'],
    outcomes: ['Master Google Analytics', 'Make data-driven decisions', 'Prove marketing ROI']
  },
  {
    id: '13',
    title: 'YouTube Video Editing & Growth',
    description: 'Unlock your creative potential with professional video editing skills.',
    price: 69000,
    category: 'social',
    image: '/product_13.jpg',
    rating: 4.8,
    reviews: 103,
    whatsIncluded: ['Editing tutorials', 'Thumbnail design', 'SEO for YouTube', 'Monetization guide'],
    outcomes: ['Create professional videos', 'Grow your channel', 'Earn from YouTube']
  },
  {
    id: '14',
    title: 'LinkedIn B2B Mastery',
    description: 'Unlock business growth with advanced LinkedIn marketing strategies.',
    price: 59000,
    category: 'advertising',
    image: '/product_14.jpg',
    rating: 4.7,
    reviews: 68,
    whatsIncluded: ['Profile optimization', 'Content strategy', 'Lead generation', 'Sales navigator guide'],
    outcomes: ['Generate B2B leads', 'Build authority', 'Close more deals']
  },
  {
    id: '15',
    title: 'Freelancer Starter Kit',
    description: 'Unlock your potential and build your empire as a freelancer.',
    price: 49000,
    category: 'beginner',
    image: '/product_15.jpg',
    rating: 4.9,
    reviews: 145,
    bestseller: true,
    whatsIncluded: ['Portfolio templates', 'Proposal scripts', 'Pricing guide', 'Client management system'],
    outcomes: ['Land your first client', 'Build a portfolio', 'Scale your freelance business']
  },
  {
    id: '16',
    title: 'Branding Mastery Guidelines',
    description: 'Create a powerful brand identity that stands out in the market.',
    price: 69000,
    category: 'toolkit',
    image: '/product_16.jpg',
    rating: 4.6,
    reviews: 56,
    whatsIncluded: ['Brand strategy workbook', 'Logo design guide', 'Color palette tools', 'Brand voice template'],
    outcomes: ['Define your brand', 'Create visual identity', 'Build brand recognition']
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Maya Chen',
    role: 'Freelance Media Buyer',
    quote: 'I went from zero marketing knowledge to landing my first client in 6 weeks. The toolkit paid for itself on day one.',
    rating: 5,
    image: '/testimonial_portrait.jpg'
  },
  {
    id: '2',
    name: 'James Rodriguez',
    role: 'E-commerce Entrepreneur',
    quote: 'The E-commerce Mastery course helped me scale my store to $50k/month in just 4 months. Highly recommended!',
    rating: 5,
    image: '/category_advanced.jpg'
  },
  {
    id: '3',
    name: 'Sarah Kim',
    role: 'Social Media Manager',
    quote: 'The Social Media Masterclass transformed how I approach content. My clients have seen 3x engagement growth.',
    rating: 5,
    image: '/category_social.jpg'
  }
];

export const currentUser: User = {
  id: '1',
  email: 'user@example.com',
  name: 'Alex Johnson',
  purchasedProducts: ['1', '4', '6', '10'],
  hoursLearned: 28
};
