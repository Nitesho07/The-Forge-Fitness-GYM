import React, { useState, useEffect } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { JoinModal } from './components/JoinModal';
import { MobileQuickBar } from './components/MobileQuickBar';
import { HomePage } from './pages/HomePage';
import { TrainingPage } from './pages/TrainingPage';
import { MembershipPage } from './pages/MembershipPage';
import { TheForgePage } from './pages/TheForgePage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [modalInterest, setModalInterest] = useState<string>('General Membership');

  // Handle URL hash changes for true multi-page bookmarking/navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = ['home', 'training', 'membership', 'the-forge', 'contact'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenJoin = (interest?: string) => {
    if (interest) {
      setModalInterest(interest);
    }
    setIsJoinModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#101417] text-[#F5F7F8] flex flex-col font-sans selection:bg-[#D7FF00] selection:text-[#101417] pb-16 md:pb-0 landscape:pb-0 app-container-pad">
      {/* Navbar with brand identity and primary CTA */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenJoin={handleOpenJoin}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} onOpenJoin={handleOpenJoin} />
        )}
        {currentPage === 'training' && (
          <TrainingPage onNavigate={handleNavigate} onOpenJoin={handleOpenJoin} />
        )}
        {currentPage === 'membership' && (
          <MembershipPage onNavigate={handleNavigate} onOpenJoin={handleOpenJoin} />
        )}
        {currentPage === 'the-forge' && (
          <TheForgePage onNavigate={handleNavigate} onOpenJoin={handleOpenJoin} />
        )}
        {currentPage === 'contact' && (
          <ContactPage onNavigate={handleNavigate} onOpenJoin={handleOpenJoin} />
        )}
      </main>

      {/* Reusable Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Persistent Mobile Quick-Action Dock */}
      <MobileQuickBar onOpenJoin={() => handleOpenJoin('Mobile Quick Bar')} />

      {/* Interactive Join / Contact Modal */}
      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        initialInterest={modalInterest}
      />
    </div>
  );
}
