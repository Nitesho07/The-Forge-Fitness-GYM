import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger safely for browser environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Hook to check prefers-reduced-motion
export const usePrefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Refresh ScrollTrigger when needed (e.g. after page transitions or dynamic content loads)
export const refreshScrollTriggers = () => {
  if (typeof window !== 'undefined') {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }
};

export type AnimationType = 'fade-up' | 'heading' | 'stagger' | 'image' | 'hero';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  stagger?: number;
  delay?: number;
  duration?: number;
  distance?: number;
  start?: string;
  end?: string;
  once?: boolean;
  className?: string;
  as?: React.ElementType;
  id?: string;
  itemSelector?: string; // Optional child selector for staggering (default targets immediate children or .reveal-item)
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  stagger = 0.1,
  delay = 0,
  duration = 0.85,
  distance,
  start = 'top 80%',
  end = 'bottom 20%',
  className = '',
  as: Component = 'div',
  id,
  itemSelector,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion: if enabled, do not animate and leave elements visible
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !containerRef.current) return;

    // Mobile-adaptive distance: 20-25px on mobile, 40px on desktop
    const isMobile = window.innerWidth < 768;
    const animDistance = distance ?? (isMobile ? 22 : 40);

    // Use GSAP context for 100% clean React Strict Mode cleanup and no memory leaks
    const ctx = gsap.context(() => {
      const el = containerRef.current;
      if (!el) return;

      const isImage = animation === 'image';
      const isStaggered = (animation === 'stagger' || animation === 'heading' || animation === 'hero');

      // Determine animation targets
      let targets: gsap.DOMTarget;
      if (itemSelector) {
        const selected = el.querySelectorAll(itemSelector);
        targets = selected.length > 0 ? selected : el;
      } else if (isStaggered && el.children.length > 0) {
        targets = el.children;
      } else {
        targets = el;
      }

      const initialY = isImage ? (isMobile ? 20 : 30) : animDistance;
      const initialScale = isImage ? 1.05 : 1;
      const targetStagger = isStaggered && targets !== el ? (stagger || 0.1) : 0;

      // Reset to initial hidden state
      const resetState = () => {
        gsap.killTweensOf(targets);
        gsap.set(targets, {
          opacity: 0,
          y: initialY,
          ...(isImage ? { scale: initialScale } : {}),
        });
      };

      // Reveal animation: plays both on scroll down (onEnter) and scroll up (onEnterBack)
      const animateIn = () => {
        gsap.killTweensOf(targets);
        gsap.fromTo(
          targets,
          {
            opacity: 0,
            y: initialY,
            ...(isImage ? { scale: initialScale } : {}),
          },
          {
            opacity: 1,
            y: 0,
            ...(isImage ? { scale: 1 } : {}),
            duration: isImage ? duration + 0.1 : duration,
            delay: delay,
            stagger: targetStagger,
            ease: 'power3.out',
            overwrite: 'auto',
            onComplete: () => {
              // Clear transform/opacity so CSS hovers (e.g. scale-105) and layouts remain uninhibited
              gsap.set(targets, { clearProps: 'transform,opacity' });
            },
          }
        );
      };

      // Initially prepare element in hidden state
      resetState();

      // Create bidirectional ScrollTrigger
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: start, // Default "top 80%"
        end: end,     // Default "bottom 20%"
        // Scroll DOWN: enters viewport -> animate in
        onEnter: () => {
          animateIn();
        },
        // Scroll DOWN: leaves viewport -> reset to hidden state
        onLeave: () => {
          resetState();
        },
        // Scroll UP: enters viewport -> animate in
        onEnterBack: () => {
          animateIn();
        },
        // Scroll UP: leaves viewport -> reset to hidden state
        onLeaveBack: () => {
          resetState();
        },
      });

      // If already within the viewport on initial render (e.g. Hero section at top of page)
      if (trigger.isActive) {
        animateIn();
      }
    }, containerRef);

    return () => {
      ctx.revert(); // Automatically kills all timelines and ScrollTrigger instances on unmount
    };
  }, [animation, delay, distance, duration, end, itemSelector, stagger, start]);

  return (
    <Component ref={containerRef} className={className} id={id}>
      {children}
    </Component>
  );
};
