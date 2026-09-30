import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { CursorShadowText } from './CursorShadowText';

export interface CarouselCardItem {
  id: string;
  number?: string;
  badge?: string;
  title: string;
  subtitle: string;
  image: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export interface InteractiveCardCarouselProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  cards: CarouselCardItem[];
  variant?: 'training' | 'facility';
  className?: string;
}

export const InteractiveCardCarousel: React.FC<InteractiveCardCarouselProps> = ({
  badge = 'INTERACTIVE PREVIEW',
  title,
  titleHighlight,
  subtitle,
  cards,
  variant = 'training',
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Drag / touch gesture references
  const dragStartXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(media.matches);

    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  const totalCards = cards.length;

  const nextCard = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalCards);
  }, [totalCards]);

  const prevCard = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  }, [totalCards]);

  // Autoplay handler (pause during user interaction, resume 4.5s after idle)
  useEffect(() => {
    if (isReducedMotion || isInteracting || totalCards <= 1) return;

    autoplayTimerRef.current = setInterval(() => {
      nextCard();
    }, 4200);

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isInteracting, isReducedMotion, nextCard, totalCards]);

  const handleUserActivityStart = () => {
    setIsInteracting(true);
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  const handleUserActivityEnd = () => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
    // Resume autoplay after 4.5 seconds of no interaction
    resumeTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 4500);
  };

  // Pointer drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    handleUserActivityStart();
    dragStartXRef.current = e.clientX;
    isDraggingRef.current = true;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || dragStartXRef.current === null) return;
    const deltaX = e.clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 55) {
      if (deltaX < 0) {
        nextCard();
      } else {
        prevCard();
      }
      isDraggingRef.current = false;
      dragStartXRef.current = null;
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    dragStartXRef.current = null;
    handleUserActivityEnd();
  };

  // Calculate fan-shaped 3D transform for each card offset relative to active card
  const getCardStyle = (index: number) => {
    // Offset in range [-2, +2] for 5 cards
    let offset = index - activeIndex;
    if (offset < -Math.floor(totalCards / 2)) offset += totalCards;
    if (offset > Math.floor(totalCards / 2)) offset -= totalCards;

    const isHoveredSide = hoveredCardIndex === index && offset !== 0;

    // Reduced motion fallback: Simple flat horizontal cards
    if (isReducedMotion) {
      return {
        transform: `translateX(${offset * 105}%) scale(${offset === 0 ? 1 : 0.9})`,
        opacity: Math.abs(offset) > 1 ? 0 : offset === 0 ? 1 : 0.6,
        zIndex: 20 - Math.abs(offset),
        pointerEvents: offset === 0 ? ('auto' as const) : ('none' as const),
      };
    }

    // Responsive spread factors
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const isTablet = typeof window !== 'undefined' && window.innerWidth >= 640 && window.innerWidth < 1024;

    const baseSpacing = isMobile ? 120 : isTablet ? 190 : 270;
    const farSpacing = isMobile ? 190 : isTablet ? 320 : 460;

    let translateX = 0;
    let translateY = 0;
    let translateZ = 0;
    let rotateY = 0;
    let rotateZ = 0;
    let scale = 1.0;
    let opacity = 1.0;
    let zIndex = 30;

    if (offset === 0) {
      // Center Active Card
      translateX = 0;
      translateY = 0;
      translateZ = 60;
      rotateY = 0;
      rotateZ = 0;
      scale = 1.0;
      opacity = 1.0;
      zIndex = 30;
    } else if (offset === 1) {
      // Immediate Right Card
      translateX = baseSpacing;
      translateY = isMobile ? 10 : 16;
      translateZ = isHoveredSide ? -60 : -100;
      rotateY = isMobile ? -16 : -22;
      rotateZ = isMobile ? 2 : 3.5;
      scale = isMobile ? 0.84 : 0.86;
      opacity = 0.85;
      zIndex = 20;
    } else if (offset === -1) {
      // Immediate Left Card
      translateX = -baseSpacing;
      translateY = isMobile ? 10 : 16;
      translateZ = isHoveredSide ? -60 : -100;
      rotateY = isMobile ? 16 : 22;
      rotateZ = isMobile ? -2 : -3.5;
      scale = isMobile ? 0.84 : 0.86;
      opacity = 0.85;
      zIndex = 20;
    } else if (offset === 2) {
      // Far Right Card
      translateX = farSpacing;
      translateY = isMobile ? 22 : 36;
      translateZ = isHoveredSide ? -160 : -220;
      rotateY = isMobile ? -26 : -34;
      rotateZ = isMobile ? 4 : 6;
      scale = isMobile ? 0.70 : 0.72;
      opacity = isMobile ? 0.25 : 0.6;
      zIndex = 10;
    } else if (offset === -2) {
      // Far Left Card
      translateX = -farSpacing;
      translateY = isMobile ? 22 : 36;
      translateZ = isHoveredSide ? -160 : -220;
      rotateY = isMobile ? 26 : 34;
      rotateZ = isMobile ? -4 : -6;
      scale = isMobile ? 0.70 : 0.72;
      opacity = isMobile ? 0.25 : 0.6;
      zIndex = 10;
    } else {
      // Offscreen wrapping cards
      translateX = offset > 0 ? 600 : -600;
      translateZ = -400;
      scale = 0.5;
      opacity = 0;
      zIndex = 1;
    }

    return {
      transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
      opacity: opacity,
      zIndex: zIndex,
    };
  };

  return (
    <section
      ref={containerRef}
      className={`relative w-full py-16 sm:py-24 overflow-hidden select-none bg-[#101417] border-y border-[#1B2226] ${className}`}
      onMouseEnter={handleUserActivityStart}
      onMouseLeave={handleUserActivityEnd}
      aria-label={`${title} 3D Carousel`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D7FF00]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 pb-6 border-b border-[#1B2226]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D7FF00] animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-[#D7FF00] uppercase font-bold">
                {badge}
              </span>
            </div>
            <CursorShadowText
              as="h2"
              className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#F5F7F8]"
            >
              {title}{' '}
              {titleHighlight && (
                <span className="text-[#D7FF00]">
                  {titleHighlight}
                </span>
              )}
            </CursorShadowText>
            {subtitle && (
              <p className="mt-2 text-xs sm:text-sm text-[#9BA3A8] max-w-xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* Previous / Next Controls */}
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              onClick={() => {
                handleUserActivityStart();
                prevCard();
                handleUserActivityEnd();
              }}
              aria-label="Previous Card"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1B2226] border border-[#263138] hover:border-[#D7FF00] hover:text-[#D7FF00] text-[#F5F7F8] flex items-center justify-center transition-colors cursor-pointer shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D7FF00]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                handleUserActivityStart();
                nextCard();
                handleUserActivityEnd();
              }}
              aria-label="Next Card"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1B2226] border border-[#263138] hover:border-[#D7FF00] hover:text-[#D7FF00] text-[#F5F7F8] flex items-center justify-center transition-colors cursor-pointer shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D7FF00]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D Carousel Stage */}
        <div
          className="relative w-full h-[470px] sm:h-[500px] flex items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing touch-pan-y"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {cards.map((card, index) => {
            const isCenter = index === activeIndex;
            const style = getCardStyle(index);

            return (
              <div
                key={card.id}
                onClick={() => {
                  if (!isCenter) {
                    handleUserActivityStart();
                    setActiveIndex(index);
                    handleUserActivityEnd();
                  }
                }}
                onMouseEnter={() => setHoveredCardIndex(index)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                className={`absolute w-[280px] sm:w-[330px] lg:w-[350px] h-[400px] sm:h-[440px] rounded-2xl bg-[#1B2226] border overflow-hidden select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform shadow-[0_25px_60px_rgba(0,0,0,0.85)] ${
                  isCenter
                    ? 'border-[#D7FF00]/80 ring-1 ring-[#D7FF00]/40 cursor-default'
                    : 'border-[#263138] hover:border-[#3d4c55] cursor-pointer'
                }`}
                style={{
                  ...style,
                  transformOrigin: '50% 50%',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Card Top Accent Edge */}
                <div
                  className="h-1 w-full"
                  style={{
                    backgroundColor: isCenter
                      ? '#D7FF00'
                      : index % 2 === 0
                      ? '#D6A83A'
                      : '#38464f',
                  }}
                />

                {/* Card Image Area */}
                <div className="relative h-[210px] sm:h-[230px] overflow-hidden bg-black">
                  <img
                    src={card.image}
                    alt={card.title}
                    draggable={false}
                    className="w-full h-full object-cover filter grayscale-[20%] contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B2226] via-[#1B2226]/40 to-transparent" />

                  {/* Number Badge */}
                  <div className="absolute top-3 left-3 bg-[#101417]/90 border border-white/10 px-2.5 py-0.5 text-xs font-mono font-bold text-[#D7FF00] backdrop-blur-sm">
                    {card.number || `0${index + 1}`}
                  </div>

                  {/* Active Indicator Pin */}
                  {isCenter && (
                    <div className="absolute top-3 right-3 bg-[#D7FF00] text-[#101417] px-2 py-0.5 rounded-full text-[10px] font-heading font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>ACTIVE</span>
                    </div>
                  )}
                </div>

                {/* Card Content Area */}
                <div className="p-5 sm:p-6 flex flex-col justify-between h-[180px] sm:h-[200px]">
                  <div>
                    <span className="text-[11px] font-mono text-[#D7FF00] uppercase tracking-wider block font-bold mb-1">
                      {card.subtitle}
                    </span>
                    <CursorShadowText
                      as="h3"
                      className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-[#F5F7F8] line-clamp-1"
                    >
                      {card.title}
                    </CursorShadowText>
                    <p className="mt-2 text-xs text-[#9BA3A8] leading-relaxed line-clamp-2">
                      {card.description || 'Specialized training engineered for peak physical performance and conditioning.'}
                    </p>
                  </div>

                  {/* Card Action Button */}
                  <div className="pt-3 border-t border-[#263138] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#9BA3A8]/70 uppercase tracking-widest">
                      DISCIPLINE {card.number || `0${index + 1}`}
                    </span>
                    {isCenter ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (card.onCtaClick) card.onCtaClick();
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-heading font-black uppercase tracking-wider text-[#101417] bg-[#D7FF00] hover:bg-[#c6ec00] px-3.5 py-1.5 rounded transition-colors cursor-pointer shadow-sm"
                      >
                        <span>{card.ctaText || 'EXPLORE'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="text-[11px] font-mono text-[#D7FF00] group-hover:underline">
                        Click to view
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stepper Dots & Drag Hint */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 select-none px-2">
          <p className="text-[11px] font-mono text-[#9BA3A8]/60 uppercase tracking-widest">
            ← Drag or click cards to rotate 3D deck →
          </p>

          <div className="flex items-center gap-2">
            {cards.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => {
                  handleUserActivityStart();
                  setActiveIndex(dotIdx);
                  handleUserActivityEnd();
                }}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  dotIdx === activeIndex
                    ? 'w-7 bg-[#D7FF00]'
                    : 'w-2 bg-[#263138] hover:bg-[#9BA3A8]/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
