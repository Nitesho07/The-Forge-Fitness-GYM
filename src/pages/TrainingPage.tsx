import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { SERVICES, BUSINESS_INFO } from '../data/gymData';
import { PageId } from '../components/Navbar';

interface TrainingPageProps {
  onNavigate: (page: PageId) => void;
  onOpenJoin: (interest?: string) => void;
}

export const TrainingPage: React.FC<TrainingPageProps> = ({ onNavigate, onOpenJoin }) => {
  return (
    <div className="min-h-screen bg-[#101417] text-[#F5F7F8] pt-20 sm:pt-24 landscape:pt-14 pb-20 landscape:pb-8">
      {/* Page Header */}
      <section className="border-b border-[#1B2226] bg-[#141A1E]/60 py-10 sm:py-20 landscape:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <span className="text-xs font-mono tracking-widest text-[#D7FF00] uppercase">
            THE FORGE DISCIPLINES
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-6xl lg:text-7xl landscape:text-2xl uppercase tracking-tight text-[#F5F7F8] mt-2 mb-3">
            TRAIN WITH PURPOSE.
          </h1>
          <p className="text-xs sm:text-base text-[#9BA3A8] max-w-2xl mx-auto leading-relaxed px-2">
            Four core disciplines structured for physical conditioning, strength progression, and endurance. Built for those who value consistency over comfort.
          </p>
        </div>
      </section>

      {/* Four Main Service Sections/Cards */}
      <section className="py-10 sm:py-16 landscape:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 sm:space-y-16 landscape:space-y-8">
          {SERVICES.map((service, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={service.id}
                id={service.id}
                className="bg-[#1B2226] border border-[#263138] overflow-hidden"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Image Column */}
                  <div className={`lg:col-span-6 relative aspect-[16/10] lg:aspect-auto overflow-hidden ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover filter grayscale-[20%] contrast-110"
                    />
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#101417]/90 border border-white/10 px-2.5 py-1 font-mono text-xs font-bold text-[#D7FF00]">
                      {service.number}
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`lg:col-span-6 p-5 sm:p-12 flex flex-col justify-between ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div>
                      <div className="flex items-center gap-2.5 text-xs font-mono text-[#D7FF00] uppercase tracking-wider mb-2">
                        <span>{service.number}</span>
                        <span>—</span>
                        <span>{service.tag}</span>
                      </div>

                      <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight text-[#F5F7F8] mb-3">
                        {service.number} — {service.name.toUpperCase()}
                      </h2>

                      <p className="text-xs sm:text-base text-[#9BA3A8] leading-relaxed mb-4 sm:mb-6">
                        {service.shortDesc}
                      </p>

                      <div className="border-t border-[#263138] pt-3 sm:pt-4 mb-4 sm:mb-6">
                        <p className="text-xs text-[#9BA3A8]/80 leading-relaxed font-mono">
                          {service.fullDesc}
                        </p>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="pt-4 sm:pt-6 border-t border-[#263138] flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                      <button
                        onClick={() => onOpenJoin(service.name)}
                        className="bg-[#D7FF00] text-[#101417] px-6 py-3.5 min-h-[46px] text-xs font-heading font-black uppercase tracking-wider hover:bg-[#c6ec00] transition-colors cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>START {service.name.toUpperCase()}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <a
                        href={`tel:${BUSINESS_INFO.phoneRaw}`}
                        className="bg-[#101417] border border-[#2d373c] text-[#F5F7F8] px-5 py-3.5 min-h-[46px] text-xs font-heading font-bold uppercase tracking-wider hover:border-[#D7FF00] transition-colors flex items-center justify-center gap-2"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#D7FF00]" />
                        <span>Inquire by Phone</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commitment Banner */}
        <div className="mt-10 sm:mt-20 landscape:mt-8 p-6 sm:p-12 landscape:p-6 bg-[#141A1E] border border-[#263138] text-center max-w-4xl mx-auto">
          <span className="text-xs font-mono text-[#D7FF00] uppercase tracking-widest">
            READY TO COMMIT?
          </span>
          <h3 className="font-heading font-black text-2xl sm:text-4xl landscape:text-xl uppercase tracking-tight text-[#F5F7F8] mt-2 mb-2 sm:mb-3">
            SEE OUR MEMBERSHIP PLANS
          </h3>
          <p className="text-xs sm:text-sm text-[#9BA3A8] max-w-xl mx-auto mb-4 sm:mb-6">
            Transparent pricing starting at ₹800/month for open facility access.
          </p>
          <button
            onClick={() => {
              onNavigate('membership');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-[#D7FF00] text-[#101417] px-8 py-3.5 text-xs font-heading font-black uppercase tracking-wider hover:bg-[#c6ec00] transition-colors cursor-pointer"
          >
            EXPLORE MEMBERSHIP TIERS
          </button>
        </div>
      </section>
    </div>
  );
};
