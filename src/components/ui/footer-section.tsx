'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TrendingUp } from 'lucide-react';

export function FooterSection() {
	return (
		<footer className="relative w-full border-t bg-white px-6 py-12 lg:py-16 selection:bg-black selection:text-white">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col md:flex-row justify-between items-start gap-8">
					<AnimatedContainer className="space-y-4 max-w-md">
						<div className="flex items-center gap-2">
							<div className="w-8 h-8 bg-black flex items-center justify-center">
								<TrendingUp className="size-5 text-aria-orange" />
							</div>
							<span className="font-bold text-xl tracking-tight text-black">Aria Empire</span>
						</div>
						<p className="text-gray-400 text-sm mt-4">
							The high-end marketplace for digital marketers. Scale your digital empire with precision and verified tools.
						</p>
						<p className="text-gray-300 text-xs mt-8">
							© 2026 Aria Empire. All rights reserve
						</p>
					</AnimatedContainer>
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
