'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon, TrendingUp } from 'lucide-react';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Product',
		links: [
			{ title: 'Marketplace', href: '/products' },
			{ title: 'Affiliate Stats', href: '/' },
			{ title: 'Bestsellers', href: '/products' },
			{ title: 'New Arrivals', href: '/products' },
		],
	},
	{
		label: 'Company',
		links: [
			{ title: 'FAQs', href: '#' },
			{ title: 'About Us', href: '#' },
			{ title: 'Privacy Policy', href: '#' },
			{ title: 'Terms of Service', href: '#' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ title: 'Blog', href: '#' },
			{ title: 'Changelog', href: '#' },
			{ title: 'Marketing Kits', href: '#' },
			{ title: 'Help Center', href: '#' },
		],
	},
	{
		label: 'Network',
		links: [
			{ title: 'Facebook', href: '#', icon: FacebookIcon },
			{ title: 'Instagram', href: '#', icon: InstagramIcon },
			{ title: 'Youtube', href: '#', icon: YoutubeIcon },
			{ title: 'LinkedIn', href: '#', icon: LinkedinIcon },
		],
	},
];

export function FooterSection() {
	return (
		<footer className="relative w-full border-t bg-white px-6 py-12 lg:py-16 selection:bg-black selection:text-white">
			<div className="max-w-7xl mx-auto">
				<div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
					<AnimatedContainer className="space-y-4">
						<div className="flex items-center gap-2">
							<div className="w-8 h-8 bg-black flex items-center justify-center">
								<TrendingUp className="size-5 text-aria-orange" />
							</div>
							<span className="font-bold text-xl tracking-tight text-black">Aria Empire</span>
						</div>
						<p className="text-gray-400 text-sm max-w-xs mt-4">
							The high-end marketplace for digital marketers. Scale your digital empire with precision and verified tools.
						</p>
						<p className="text-gray-300 text-xs mt-8">
							© {new Date().getFullYear()} Aria Empire. All rights reserved.
						</p>
					</AnimatedContainer>

					<div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
						{footerLinks.map((section, index) => (
							<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
								<div className="mb-10 md:mb-0">
									<h3 className="text-xs font-bold uppercase tracking-widest text-black mb-6">{section.label}</h3>
									<ul className="text-gray-400 space-y-3 text-sm">
										{section.links.map((link) => (
											<li key={link.title}>
												<a
													href={link.href}
													className="hover:text-black hover:translate-x-1 inline-flex items-center transition-all duration-300"
												>
													{link.icon && <link.icon className="me-2 size-4" />}
													{link.title}
												</a>
											</li>
										))}
									</ul>
								</div>
							</AnimatedContainer>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
};

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: 8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
};
