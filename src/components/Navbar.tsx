import React, { useState, useEffect, useRef } from 'react';
import { House, Dumbbell, CreditCard, Flame, MapPin, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

export type PageId = 'home' | 'training' | 'membership' | 'the-forge' | 'contact';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenJoin: (interest?: string) => void;
}

interface NavItemConfig {
  id: PageId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenJoin }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // References for continuous macOS dock magnification
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const iconWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tooltipRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItemConfig[] = [
    { id: 'home', label: 'Home', icon: House },
    { id: 'training', label: 'Training', icon: Dumbbell },
    { id: 'membership', label: 'Membership', icon: CreditCard },
    { id: 'the-forge', label: 'The Forge', icon: Flame },
    { id: 'contact', label: 'Contact', icon: MapPin },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
  };

  // Continuous macOS Dock Magnification Pointer Handler
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only apply on pointer devices that support real hover (mouse / trackpad)
    if (typeof window === 'undefined') return;
    const isHoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isHoverCapable || prefersReduced) return;

    const mouseX = e.clientX;
    const R = 130; // Radius of influence in pixels
    const maxScale = 1.55; // Peak scale directly under cursor

    itemRefs.current.forEach((btn, index) => {
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - itemCenterX);

      let scale = 1.0;
      if (distance < R) {
        // Smooth cosine bell-curve magnification factor
        const u = distance / R;
        const factor = (1 + Math.cos(u * Math.PI)) / 2;
        scale = 1.0 + (maxScale - 1.0) * factor;
      }

      // Smoothly animate icon scale and subtle macOS upward lift
      const iconWrapper = iconWrapperRefs.current[index];
      if (iconWrapper) {
        gsap.to(iconWrapper, {
          scale: scale,
          y: -(scale - 1) * 9, // Lifts the icon up as it magnifies
          duration: 0.16,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }

      // Smoothly animate macOS tooltip visibility above magnified item
      const tooltip = tooltipRefs.current[index];
      if (tooltip) {
        const targetOpacity = scale > 1.2 ? Math.min(1, (scale - 1.2) / 0.22) : 0;
        gsap.to(tooltip, {
          opacity: targetOpacity,
          y: targetOpacity > 0 ? -(scale - 1) * 11 : 4,
          duration: 0.15,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    });
  };

  // Smooth Reset when pointer leaves the dock area
  const handlePointerLeave = () => {
    if (typeof window === 'undefined') return;
    const isHoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isHoverCapable || prefersReduced) return;

    itemRefs.current.forEach((_, index) => {
      const iconWrapper = iconWrapperRefs.current[index];
      if (iconWrapper) {
        gsap.to(iconWrapper, {
          scale: 1.0,
          y: 0,
          duration: 0.32,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }

      const tooltip = tooltipRefs.current[index];
      if (tooltip) {
        gsap.to(tooltip, {
          opacity: 0,
          y: 4,
          duration: 0.22,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    });
  };

  // Keyboard accessibility focus/blur handling
  const handleFocus = (index: number) => {
    const iconWrapper = iconWrapperRefs.current[index];
    const tooltip = tooltipRefs.current[index];
    if (iconWrapper) {
      gsap.to(iconWrapper, { scale: 1.3, y: -4, duration: 0.2, ease: 'power2.out' });
    }
    if (tooltip) {
      gsap.to(tooltip, { opacity: 1, y: -4, duration: 0.2, ease: 'power2.out' });
    }
  };

  const handleBlur = (index: number) => {
    const iconWrapper = iconWrapperRefs.current[index];
    const tooltip = tooltipRefs.current[index];
    if (iconWrapper) {
      gsap.to(iconWrapper, { scale: 1.0, y: 0, duration: 0.25, ease: 'power2.out' });
    }
    if (tooltip) {
      gsap.to(tooltip, { opacity: 0, y: 4, duration: 0.2, ease: 'power2.out' });
    }
  };

  return (
    <nav
      role="navigation"
      aria-label="Main Floating Navigation Dock"
      className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 pointer-events-none select-none"
    >
      <div
        className={`pointer-events-auto flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-full border border-[#263138]/90 ring-1 ring-white/10 shadow-2xl shadow-black/80 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'bg-[#0E1316]/95 backdrop-blur-2xl py-1 sm:py-1.5 scale-[0.98] sm:scale-95 shadow-black/95'
            : 'bg-[#141A1E]/90 backdrop-blur-xl scale-100'
        }`}
      >
        {/* Brand Mark (Desktop / Tablet) */}
        <button
          onClick={() => handleNavClick('home')}
          className="hidden md:flex items-center gap-2 pl-2 pr-2 py-1.5 rounded-full hover:bg-white/5 transition-all text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D7FF00] cursor-pointer"
          aria-label="The Forge Fitness - Home"
        >
          <div className="w-7 h-7 rounded-full bg-[#1B2226] border border-[#2d373c] group-hover:border-[#D7FF00]/50 flex items-center justify-center font-heading font-black text-xs text-[#D7FF00] tracking-wider transition-colors shadow-sm">
            TF
          </div>
          <span className="font-heading font-black text-xs tracking-wider text-[#F5F7F8] uppercase hidden xl:inline-block pr-1">
            THE FORGE
          </span>
        </button>

        {/* Brand Mark (Mobile Icon Button) */}
        <button
          onClick={() => handleNavClick('home')}
          className="md:hidden flex items-center justify-center w-7 h-7 rounded-full bg-[#1B2226] border border-[#2d373c] text-[#D7FF00] font-heading font-black text-[11px] shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D7FF00]"
          aria-label="The Forge Fitness Home"
        >
          TF
        </button>

        {/* Left Divider */}
        <div className="w-px h-5 bg-[#263138] mx-0.5 sm:mx-1 shrink-0" aria-hidden="true" />

        {/* macOS Magnifying Navigation Dock Strip */}
        <div
          ref={navContainerRef}
          data-dock-strip="true"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="flex items-center gap-1 sm:gap-1.5 relative px-1 py-0.5"
        >
          {navItems.map((item, index) => {
            const isActive = currentPage === item.id;
            const IconComponent = item.icon;

            return (
              <button
                key={item.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                onClick={() => handleNavClick(item.id)}
                onFocus={() => handleFocus(index)}
                onBlur={() => handleBlur(index)}
                aria-current={isActive ? 'page' : undefined}
                aria-label={item.label}
                className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D7FF00] ${
                  isActive
                    ? 'bg-[#D7FF00]/15 text-[#D7FF00] border border-[#D7FF00]/40 shadow-[0_0_12px_rgba(215,255,0,0.22)]'
                    : 'text-[#9BA3A8] hover:text-[#F5F7F8] hover:bg-white/[0.08] border border-transparent'
                }`}
              >
                {/* Scaled Icon Wrapper */}
                <div
                  ref={(el) => {
                    iconWrapperRefs.current[index] = el;
                  }}
                  className="flex items-center justify-center w-full h-full pointer-events-none"
                  style={{ transformOrigin: 'center center' }}
                >
                  <IconComponent
                    className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors ${
                      isActive ? 'text-[#D7FF00]' : ''
                    }`}
                  />
                </div>

                {/* Active Indicator Dot (classic macOS dock style) */}
                {isActive && (
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#D7FF00] shadow-[0_0_6px_#D7FF00] pointer-events-none"
                    aria-hidden="true"
                  />
                )}

                {/* macOS Tooltip Label (Floats above icon when magnified) */}
                <div
                  ref={(el) => {
                    tooltipRefs.current[index] = el;
                  }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0B0E10]/95 border border-[#2d373c] text-[#F5F7F8] px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-heading font-bold uppercase tracking-wider pointer-events-none shadow-2xl opacity-0 whitespace-nowrap z-30 ring-1 ring-white/10"
                >
                  {item.label}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[#0B0E10]" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Divider */}
        <div className="w-px h-5 bg-[#263138] mx-0.5 sm:mx-1 shrink-0" aria-hidden="true" />

        {/* Highlighted Primary CTA: JOIN NOW */}
        <button
          onClick={() => onOpenJoin()}
          className="flex items-center gap-1 sm:gap-1.5 bg-[#D7FF00] text-[#101417] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-heading font-black uppercase tracking-wider hover:bg-[#c6ec00] hover:scale-105 active:scale-95 transition-all shadow-md shadow-[#D7FF00]/20 ml-0.5 group cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <span className="hidden xs:inline">JOIN NOW</span>
          <span className="xs:hidden">JOIN</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </nav>
  );
};
