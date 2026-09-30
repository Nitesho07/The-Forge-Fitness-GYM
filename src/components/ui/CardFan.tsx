import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CardFanProps {
  children: React.ReactNode;
  className?: string;
  gridClassName?: string;
  itemClassName?: string;
  hoverGlowColor?: string;
}

// Compute symmetrical fan parameters based on total cards in the section
const getFanConfig = (total: number, index: number) => {
  if (total <= 1) {
    return { rot: 0, x: 0, initX: 0, zIndex: 10 };
  }
  if (total === 2) {
    const configs = [
      { rot: -2, x: -12, initX: 18, zIndex: 10 },
      { rot: 2, x: 12, initX: -18, zIndex: 11 },
    ];
    return configs[index] || configs[0];
  }
  if (total === 3) {
    const configs = [
      { rot: -2.5, x: -14, initX: 20, zIndex: 10 },
      { rot: 0, x: 0, initX: 0, zIndex: 12 },
      { rot: 2.5, x: 14, initX: -20, zIndex: 11 },
    ];
    return configs[index] || configs[0];
  }
  // 4 cards (Exact specification from prompt)
  if (total === 4) {
    const configs = [
      { rot: -3, x: -18, initX: 24, zIndex: 10 },
      { rot: -1, x: -6, initX: 8, zIndex: 11 },
      { rot: 1, x: 6, initX: -8, zIndex: 12 },
      { rot: 3, x: 18, initX: -24, zIndex: 13 },
    ];
    return configs[index] || configs[0];
  }
  // 5+ cards: proportional fan distribution
  const maxRot = 3;
  const maxX = 18;
  const progress = index / (total - 1); // 0 to 1
  const rot = Number((-maxRot + progress * (maxRot * 2)).toFixed(1));
  const x = Math.round(-maxX + progress * (maxX * 2));
  const initX = Math.round(-x * 1.3);
  return { rot, x, initX, zIndex: 10 + index };
};

export const CardFan: React.FC<CardFanProps> = ({
  children,
  className = '',
  gridClassName,
  itemClassName,
  hoverGlowColor,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const childCount = React.Children.count(children);

  // Default responsive grid based on card count
  const defaultGrid =
    childCount === 2
      ? 'grid grid-cols-1 lg:grid-cols-2 gap-6'
      : childCount === 3
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6';

  const activeGridClass = gridClassName || defaultGrid;

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Allow 120ms for DOM layout and route transitions to complete
    const timeoutId = setTimeout(() => {
      const el = containerRef.current;
      if (!el) return;

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      const isDesktop = window.innerWidth >= 640;

      // =======================================================================
      // INITIAL STATE
      // Cards start slightly closer together, slightly reduced scale, slightly reduced opacity
      // =======================================================================
      cards.forEach((card, i) => {
        const config = getFanConfig(cards.length, i);
        gsap.set(card, {
          x: isDesktop ? config.initX : 0,
          y: isDesktop ? 12 : 20,
          rotation: 0,
          scale: 0.94,
          opacity: 0.65,
          zIndex: config.zIndex,
          transformOrigin: '50% 90%',
          force3D: true,
        });
      });

      // =======================================================================
      // FAN OUT ANIMATION TIMELINE
      // Smooth, athletic, controlled fan reveal as the section enters the viewport
      // =======================================================================
      const tl = gsap.timeline({ paused: true });

      cards.forEach((card, i) => {
        const config = getFanConfig(cards.length, i);
        tl.to(
          card,
          {
            x: isDesktop ? config.x : 0,
            y: 0,
            rotation: isDesktop ? config.rot : 0,
            scale: 1,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            force3D: true,
          },
          i * 0.08 // Elegant mechanical stagger
        );
      });

      // =======================================================================
      // REVERSIBLE SCROLLTRIGGER
      // Plays on scroll down, reverses on scroll up, runs every time
      // =======================================================================
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        end: 'bottom 15%',
        onEnter: () => {
          tl.play();
        },
        onEnterBack: () => {
          tl.play();
        },
        onLeaveBack: () => {
          tl.reverse();
        },
        invalidateOnRefresh: true,
      });

      // If already in viewport on mount, trigger immediately
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
      if (inView || trigger.isActive) {
        tl.play();
      }
    }, 120);

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === containerRef.current) {
          st.kill();
        }
      });
    };
  }, [childCount]);

  // Desktop Hover Handlers
  const handleMouseEnter = (index: number) => {
    if (typeof window === 'undefined' || window.innerWidth < 640) return;
    const card = cardRefs.current[index];
    if (!card) return;

    const glow = hoverGlowColor || 'rgba(215, 255, 0, 0.4)';

    gsap.to(card, {
      y: -10,
      scale: 1.03,
      rotation: 0,
      zIndex: 40,
      duration: 0.35,
      ease: 'power2.out',
      boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 0 1px ${glow}`,
      force3D: true,
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = (index: number) => {
    if (typeof window === 'undefined' || window.innerWidth < 640) return;
    const card = cardRefs.current[index];
    if (!card) return;

    const config = getFanConfig(childCount, index);

    gsap.to(card, {
      y: 0,
      scale: 1,
      rotation: config.rot,
      zIndex: config.zIndex,
      duration: 0.35,
      ease: 'power2.out',
      boxShadow: 'none',
      force3D: true,
      overwrite: 'auto',
    });
  };

  return (
    <div ref={containerRef} className={`relative select-none ${className}`}>
      <div className={activeGridClass}>
        {React.Children.map(children, (child, index) => {
          const config = getFanConfig(childCount, index);

          return (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className={`card-fan-item relative will-change-transform h-full ${itemClassName || 'rounded-none'}`}
              style={{
                zIndex: config.zIndex,
                transformOrigin: '50% 90%',
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
};
