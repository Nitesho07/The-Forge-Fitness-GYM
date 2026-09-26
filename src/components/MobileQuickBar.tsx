import React from 'react';
import { Phone, Navigation, Zap } from 'lucide-react';
import { BUSINESS_INFO } from '../data/gymData';

interface MobileQuickBarProps {
  onOpenJoin: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onOpenJoin }) => {
  return (
    <aside
      aria-label="Mobile quick actions"
      className="mobile-bottom-dock md:hidden landscape:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#101417]/95 backdrop-blur-md border-t border-[#263138] px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-2xl"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Direct Call Button */}
        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          className="flex flex-col items-center justify-center py-2 px-1 bg-[#1B2226] border border-[#2d373c] text-[#F5F7F8] active:bg-[#252e34] transition-colors rounded-none"
        >
          <Phone className="w-4 h-4 text-[#D7FF00] mb-0.5" />
          <span className="text-[10px] font-heading font-bold uppercase tracking-wider">
            Call Gym
          </span>
        </a>

        {/* Directions Button */}
        <a
          href={BUSINESS_INFO.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 bg-[#1B2226] border border-[#2d373c] text-[#F5F7F8] active:bg-[#252e34] transition-colors rounded-none"
        >
          <Navigation className="w-4 h-4 text-[#D7FF00] mb-0.5" />
          <span className="text-[10px] font-heading font-bold uppercase tracking-wider">
            Directions
          </span>
        </a>

        {/* Primary Join Button */}
        <button
          onClick={onOpenJoin}
          className="flex flex-col items-center justify-center py-2 px-1 bg-[#D7FF00] text-[#101417] active:bg-[#c6ec00] transition-colors font-heading font-black cursor-pointer rounded-none"
        >
          <Zap className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] uppercase tracking-wider">
            JOIN NOW
          </span>
        </button>
      </div>
    </aside>
  );
};
