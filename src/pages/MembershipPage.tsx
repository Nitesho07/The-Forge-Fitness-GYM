import React from 'react';
import { Check, AlertCircle, Phone, ArrowRight } from 'lucide-react';
import { PRICING_GENERAL, PRICING_WITH_PT, BUSINESS_INFO } from '../data/gymData';
import { PageId } from '../components/Navbar';

interface MembershipPageProps {
  onNavigate: (page: PageId) => void;
  onOpenJoin: (interest?: string) => void;
}

export const MembershipPage: React.FC<MembershipPageProps> = ({ onNavigate, onOpenJoin }) => {
  return (
    <div className="min-h-screen bg-[#101417] text-[#F5F7F8] pt-20 sm:pt-24 landscape:pt-14 pb-20 landscape:pb-8">
      {/* Hero Header */}
      <section className="border-b border-[#1B2226] bg-[#141A1E]/60 py-10 sm:py-20 landscape:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <span className="text-xs font-mono tracking-widest text-[#D7FF00] uppercase">
            MEMBERSHIP TIERS
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-6xl lg:text-7xl landscape:text-2xl uppercase tracking-tight text-[#F5F7F8] mt-2 mb-3">
            CHOOSE YOUR COMMITMENT.
          </h1>
          <p className="text-xs sm:text-base text-[#9BA3A8] max-w-2xl mx-auto leading-relaxed px-2">
            Straightforward pricing with zero complicated contracts. Train on your own schedule or pair with dedicated personal coaching.
          </p>

          {/* Sample Pricing Notice Badge - Bold & Clear */}
          <div className="mt-4 sm:mt-8 inline-flex items-center gap-2 bg-[#1B2226] border border-[#D6A83A]/40 px-3.5 py-1.5 text-xs text-[#D6A83A] font-mono">
            <AlertCircle className="w-4 h-4 text-[#D6A83A] shrink-0" />
            <span>Concept / Sample Pricing</span>
          </div>
        </div>
      </section>

      {/* Main Pricing Groups */}
      <section className="py-10 sm:py-16 landscape:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 sm:space-y-16 landscape:space-y-8">
          {/* GROUP 1: WITHOUT PERSONAL TRAINER */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 pb-4 border-b border-[#1B2226]">
              <div>
                <span className="text-xs font-mono text-[#D7FF00] uppercase tracking-wider">
                  STANDARD GYM ACCESS
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight text-[#F5F7F8] mt-1">
                  WITHOUT PERSONAL TRAINER
                </h2>
              </div>
              <p className="text-xs text-[#9BA3A8] mt-1 sm:mt-0 font-mono">
                Full floor & discipline access · Open daily until 12 AM
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {PRICING_GENERAL.map((plan) => (
                <div
                  key={plan.duration}
                  className={`bg-[#1B2226] border p-6 flex flex-col justify-between relative transition-all ${
                    plan.isPopular
                      ? 'border-[#D7FF00] ring-1 ring-[#D7FF00]/30'
                      : 'border-[#263138] hover:border-[#38464f]'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 right-4 bg-[#D7FF00] text-[#101417] px-2.5 py-0.5 text-[10px] font-heading font-black uppercase tracking-wider">
                      MOST POPULAR
                    </div>
                  )}

                  <div>
                    <span className="text-xs font-mono text-[#9BA3A8] uppercase tracking-widest">
                      MEMBERSHIP
                    </span>
                    <h3 className="font-heading font-black text-2xl uppercase tracking-wide text-[#F5F7F8] mt-1">
                      {plan.duration}
                    </h3>

                    <div className="mt-6 mb-2">
                      <span className="font-heading font-black text-4xl sm:text-5xl text-[#F5F7F8]">
                        {plan.price}
                      </span>
                    </div>

                    <p className="text-xs text-[#9BA3A8] font-mono mb-6">
                      {plan.periodText}
                    </p>

                    <ul className="space-y-2.5 text-xs text-[#9BA3A8] border-t border-[#263138] pt-4">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#D7FF00] shrink-0" />
                        <span>Weight training floor access</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#D7FF00] shrink-0" />
                        <span>CrossFit & cycling zones</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#D7FF00] shrink-0" />
                        <span>Open until 12 AM midnight</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#263138]">
                    <button
                      onClick={() => onOpenJoin(`Without PT - ${plan.duration} (${plan.price})`)}
                      className="w-full bg-[#101417] hover:bg-[#D7FF00] hover:text-[#101417] border border-[#2d373c] hover:border-transparent text-[#F5F7F8] py-3 text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      SELECT {plan.duration.toUpperCase()}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GROUP 2: WITH PERSONAL TRAINER */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 pb-4 border-b border-[#1B2226]">
              <div>
                <span className="text-xs font-mono text-[#D6A83A] uppercase tracking-wider">
                  DEDICATED 1-ON-1 COACHING
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight text-[#F5F7F8] mt-1">
                  WITH PERSONAL TRAINER
                </h2>
              </div>
              <p className="text-xs text-[#9BA3A8] mt-1 sm:mt-0 font-mono">
                Includes personal training programming & technique guidance
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {PRICING_WITH_PT.map((plan) => (
                <div
                  key={plan.duration}
                  className={`bg-[#1B2226] border p-6 flex flex-col justify-between relative transition-all ${
                    plan.isPopular
                      ? 'border-[#D6A83A] ring-1 ring-[#D6A83A]/30'
                      : 'border-[#263138] hover:border-[#38464f]'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 right-4 bg-[#D6A83A] text-[#101417] px-2.5 py-0.5 text-[10px] font-heading font-black uppercase tracking-wider">
                      RECOMMENDED
                    </div>
                  )}

                  <div>
                    <span className="text-xs font-mono text-[#D6A83A] uppercase tracking-widest">
                      PT INCLUDED
                    </span>
                    <h3 className="font-heading font-black text-2xl uppercase tracking-wide text-[#F5F7F8] mt-1">
                      {plan.duration}
                    </h3>

                    <div className="mt-6 mb-2">
                      <span className="font-heading font-black text-4xl sm:text-5xl text-[#F5F7F8]">
                        {plan.price}
                      </span>
                    </div>

                    <p className="text-xs text-[#9BA3A8] font-mono mb-6">
                      {plan.periodText}
                    </p>

                    <ul className="space-y-2.5 text-xs text-[#9BA3A8] border-t border-[#263138] pt-4">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#D6A83A] shrink-0" />
                        <span>Dedicated 1-on-1 trainer</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#D6A83A] shrink-0" />
                        <span>Tailored progressive programming</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#D6A83A] shrink-0" />
                        <span>Form corrections & accountability</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#263138]">
                    <button
                      onClick={() => onOpenJoin(`With PT - ${plan.duration} (${plan.price})`)}
                      className="w-full bg-[#101417] hover:bg-[#D7FF00] hover:text-[#101417] border border-[#2d373c] hover:border-transparent text-[#F5F7F8] py-3 text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      SELECT {plan.duration.toUpperCase()}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer / Concept Notice Box */}
        <div className="mt-16 p-6 bg-[#141A1E] border border-[#263138] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#D6A83A] uppercase tracking-wider">
              PRICING NOTICE & VERIFICATION
            </span>
            <p className="text-xs text-[#9BA3A8] leading-relaxed max-w-2xl">
              Concept / Sample Pricing. ₹800 is the base 1-month rate. Pricing other than ₹800/month is concept/sample pricing and must not be presented as verified official pricing. Contact the front desk for current offers or special seasonal terms.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="bg-[#D7FF00] text-[#101417] px-6 py-3 text-xs font-heading font-black uppercase tracking-wider hover:bg-[#c6ec00] transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
