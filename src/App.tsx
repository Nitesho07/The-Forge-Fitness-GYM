import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { JoinModal } from './components/JoinModal';
import { CheckoutModal } from './components/CheckoutModal';
import { MobileQuickBar } from './components/MobileQuickBar';
import { HomePage } from './pages/HomePage';
import { TrainingPage } from './pages/TrainingPage';
import { MembershipPage } from './pages/MembershipPage';
import { TheForgePage } from './pages/TheForgePage';
import { ContactPage } from './pages/ContactPage';
import { refreshScrollTriggers } from './components/ui/ScrollReveal';
import { initGlobalMagneticButtons } from './utils/magneticHover';
import { CheckoutPlanSelection, StoredOrder } from './utils/payment';

const VALID_PAGES: PageId[] = ['home', 'training', 'membership', 'the-forge', 'contact'];

export default function App() {
  const getInitialPage = (): PageId => {
    const hash = window.location.hash.replace('#', '') as PageId;
    return VALID_PAGES.includes(hash) ? hash : 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [displayedPage, setDisplayedPage] = useState<PageId>(getInitialPage);
  const [transitionState, setTransitionState] = useState<'active' | 'exiting' | 'entering'>('active');
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [modalInterest, setModalInterest] = useState<string>('General Membership');

  // Checkout modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<CheckoutPlanSelection | null>(null);

  const currentPageRef = useRef<PageId>(currentPage);
  currentPageRef.current = currentPage;

  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to strictly reset scroll position to the very top (0,0) without lag or smooth-scroll drag
  const forceScrollToTop = useCallback(() => {
    if (typeof window === 'undefined') return;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = '';
    });
  }, []);

  // Guarantee that whenever displayed page changes, the viewport is pinned to top
  useEffect(() => {
    forceScrollToTop();
  }, [displayedPage, forceScrollToTop]);

  // Initialize global magnifying & magnetic hover effect across all interactive buttons
  useEffect(() => {
    const cleanup = initGlobalMagneticButtons();
    return () => {
      cleanup();
    };
  }, []);

  // Transition handler
  const transitionToPage = useCallback((targetPage: PageId, updateHistory = true) => {
    // Check user preference for reduced motion
    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If already on the requested page, smoothly scroll to top
    if (targetPage === currentPageRef.current) {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
      return;
    }

    // Immediately update active navbar indicator
    setCurrentPage(targetPage);

    // Update browser history/URL hash if requested
    if (updateHistory) {
      const newHash = targetPage === 'home' ? '' : `#${targetPage}`;
      if (window.location.hash !== newHash) {
        if (targetPage === 'home') {
          history.pushState(null, '', window.location.pathname + window.location.search);
        } else {
          window.location.hash = targetPage;
        }
      }
    }

    // Clear any ongoing transition timer to prevent race conditions
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }

    // If reduced motion is requested, switch instantly without animations
    if (prefersReducedMotion) {
      setDisplayedPage(targetPage);
      setTransitionState('active');
      forceScrollToTop();
      return;
    }

    // Step 1: Smooth Exit (180ms)
    setTransitionState('exiting');

    transitionTimerRef.current = setTimeout(() => {
      // Step 2: Swap page content while invisible & strictly force scroll to top
      setDisplayedPage(targetPage);
      forceScrollToTop();
      setTransitionState('entering');

      // Step 3: Trigger upward movement & fade-in (300ms)
      requestAnimationFrame(() => {
        forceScrollToTop();
        transitionTimerRef.current = setTimeout(() => {
          setTransitionState('active');
          forceScrollToTop();
          refreshScrollTriggers();
        }, 20);
      });
    }, 180);
  }, [forceScrollToTop]);

  // Listen to browser Back / Forward (hashchange)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const targetPage = VALID_PAGES.includes(hash) ? hash : 'home';
      if (targetPage !== currentPageRef.current) {
        transitionToPage(targetPage, false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [transitionToPage]);

  // Clean up any timers on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  // Global smooth scrolling for on-page section anchor links (e.g. #crossfit, #pricing)
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');

      if (href && href.startsWith('#') && href.length > 1) {
        const targetId = href.slice(1);
        // If it's one of the main pages, let the page router handle it
        if (VALID_PAGES.includes(targetId as PageId)) {
          return;
        }

        // Look for the element with this ID on the current page
        const element = document.getElementById(targetId);
        if (element) {
          e.preventDefault();
          const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          const navbarHeight = 80; // Account for sticky navbar height
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: prefersReduced ? 'auto' : 'smooth',
          });

          // Update URL without jumping
          history.pushState(null, '', `#${targetId}`);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  const handleOpenJoin = (interest?: string) => {
    if (interest) {
      setModalInterest(interest);
    }
    setIsJoinModalOpen(true);
  };

  const handleSelectPlan = (selection: CheckoutPlanSelection) => {
    setSelectedPlanForCheckout(selection);
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = (_order: StoredOrder) => {
    // Optionally trigger any global notifications or refresh
  };

  return (
    <div className="min-h-screen bg-[#101417] text-[#F5F7F8] flex flex-col font-sans selection:bg-[#D7FF00] selection:text-[#101417] pb-16 md:pb-0 app-container-pad">
      {/* Navbar with brand identity and active state */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => transitionToPage(page, true)}
        onOpenJoin={handleOpenJoin}
      />

      {/* Main Page Content with Smooth Transition Wrapper */}
      <main
        className={`flex-1 page-transition-container ${
          transitionState === 'exiting'
            ? 'page-transition-exit'
            : transitionState === 'entering'
            ? 'page-transition-enter'
            : 'page-transition-active'
        }`}
        id="main-content"
      >
        {displayedPage === 'home' && (
          <HomePage
            onNavigate={(p) => transitionToPage(p, true)}
            onOpenJoin={handleOpenJoin}
            onSelectPlan={handleSelectPlan}
          />
        )}
        {displayedPage === 'training' && (
          <TrainingPage onNavigate={(p) => transitionToPage(p, true)} onOpenJoin={handleOpenJoin} />
        )}
        {displayedPage === 'membership' && (
          <MembershipPage
            onNavigate={(p) => transitionToPage(p, true)}
            onOpenJoin={handleOpenJoin}
            onSelectPlan={handleSelectPlan}
          />
        )}
        {displayedPage === 'the-forge' && (
          <TheForgePage onNavigate={(p) => transitionToPage(p, true)} onOpenJoin={handleOpenJoin} />
        )}
        {displayedPage === 'contact' && (
          <ContactPage onNavigate={(p) => transitionToPage(p, true)} onOpenJoin={handleOpenJoin} />
        )}
      </main>

      {/* Reusable Footer */}
      <Footer onNavigate={(p) => transitionToPage(p, true)} />

      {/* Persistent Mobile Quick-Action Dock */}
      <MobileQuickBar onOpenJoin={() => handleOpenJoin('Mobile Quick Bar')} />

      {/* Interactive Join / Contact Modal */}
      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        initialInterest={modalInterest}
      />

      {/* Unified Production-Ready Membership Checkout & UPI Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selection={selectedPlanForCheckout}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
