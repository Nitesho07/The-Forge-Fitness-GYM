import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

export type PageId = 'home' | 'training' | 'membership' | 'the-forge' | 'contact';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenJoin: (interest?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenJoin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 15);

      // On landscape or short viewport screens (height < 550px), auto-hide navbar when scrolling down to give 100% full reading space
      const isShortOrLandscape = window.innerHeight < 550 || window.matchMedia('(orientation: landscape)').matches;
      if (isShortOrLandscape) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
          setIsNavVisible(false);
        } else {
          setIsNavVisible(true);
        }
      } else {
        setIsNavVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'training', label: 'Training' },
    { id: 'membership', label: 'Membership' },
    { id: 'the-forge', label: 'The Forge' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setIsNavVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isNavVisible ? 'translate-y-0' : '-translate-y-full pointer-events-none'
      } ${
        isScrolled
          ? 'bg-[#101417]/95 backdrop-blur-md border-b border-[#1B2226] shadow-2xl shadow-black/60 py-2 sm:py-3 landscape:py-1.5'
          : 'bg-[#101417]/90 backdrop-blur-sm border-b border-[#1B2226] py-3 sm:py-4 landscape:py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo / Text: THE FORGE FITNESS */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D7FF00] shrink-0"
          >
            <span className="font-heading font-black text-lg sm:text-2xl lg:text-3xl landscape:text-lg text-[#F5F7F8] tracking-wider uppercase group-hover:text-white transition-colors block">
              THE FORGE FITNESS
            </span>
          </button>

          {/* Navigation Links (Visible on desktop, tablets, AND landscape phones) */}
          <nav className="hidden sm:flex landscape:flex items-center gap-3 sm:gap-6 lg:gap-8 landscape:gap-4">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs md:text-sm landscape:text-xs font-heading font-semibold tracking-wider uppercase transition-colors relative py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D7FF00] cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-[#F5F7F8]'
                      : 'text-[#9BA3A8] hover:text-[#F5F7F8]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D7FF00]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Primary CTA: JOIN NOW */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => onOpenJoin()}
              className="bg-[#D7FF00] text-[#101417] px-3.5 sm:px-6 py-1.5 sm:py-2.5 landscape:py-1.5 landscape:px-3 text-xs font-heading font-black uppercase tracking-wider hover:bg-[#c6ec00] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98] cursor-pointer shadow-md shadow-[#D7FF00]/10"
            >
              JOIN NOW
            </button>

            {/* Mobile Hamburger toggle (Portrait only, hidden in landscape) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden landscape:hidden p-2 text-[#9BA3A8] hover:text-white bg-[#1B2226] border border-[#2d373c] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Navigation Strip (Only in portrait phone view; in landscape, the header nav above handles it) */}
        <div className="sm:hidden landscape:hidden mt-2 pt-2 border-t border-[#1B2226] flex items-center justify-between gap-1 overflow-x-auto no-scrollbar py-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-[11px] font-heading font-bold uppercase tracking-wider px-2 py-1 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-[#101417] bg-[#D7FF00]'
                    : 'text-[#9BA3A8] hover:text-[#F5F7F8]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Expanded Mobile Menu Drawer (if hamburger is pressed in portrait) */}
      {mobileMenuOpen && (
        <div className="sm:hidden landscape:hidden bg-[#101417] border-b border-[#1B2226] px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-4 py-2.5 text-sm font-heading font-bold uppercase tracking-wider transition-colors border-l-2 ${
                    isActive
                      ? 'border-[#D7FF00] bg-[#1B2226] text-[#F5F7F8]'
                      : 'border-transparent text-[#9BA3A8] hover:bg-[#1B2226]/50 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-[#1B2226]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoin();
              }}
              className="w-full bg-[#D7FF00] text-[#101417] py-3 text-center text-xs font-heading font-black uppercase tracking-wider"
            >
              JOIN NOW
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
