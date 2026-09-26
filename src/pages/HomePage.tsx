import React from 'react';
import { Star, Phone, ArrowRight, ArrowUpRight, MapPin, Clock } from 'lucide-react';
import { BUSINESS_INFO, IMAGES, SERVICES, PRICING_GENERAL } from '../data/gymData';
import { PageId } from '../components/Navbar';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenJoin: (interest?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenJoin }) => {
  return (
    <div className="min-h-screen bg-[#101417] text-[#F5F7F8]">
      {/* =========================================================
          HERO SECTION
          ========================================================= */}
      <section className="relative min-h-[85vh] sm:min-h-[92vh] landscape:min-h-0 flex items-center justify-center pt-28 sm:pt-36 landscape:pt-16 pb-12 sm:pb-16 landscape:pb-8 overflow-hidden border-b border-[#1B2226]">
        {/* Background Gym Image with dark industrial gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.hero}
            alt="The Forge Fitness Gym Floor"
            className="w-full h-full object-cover object-center filter grayscale-[30%] brightness-[45%] contrast-[115%]"
          />
          {/* Gradients to blend smoothly with #101417 */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#101417] via-[#101417]/70 to-[#101417]/85" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#101417]/40 to-[#101417]/90" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center text-center">
          {/* Subtle Google Rating Block - Clean Unboxed Metadata */}
          <div className="inline-flex items-center gap-2.5 bg-[#1B2226]/90 border border-[#2d373c] px-3.5 py-1.5 mb-6 sm:mb-8 backdrop-blur-sm">
            <div className="flex items-center text-[#D6A83A]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < 4 ? 'fill-[#D6A83A]' : 'fill-[#D6A83A]/40'}`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-[#F5F7F8] tracking-wide">
              {BUSINESS_INFO.rating}/5 Rating
            </span>
            <span className="text-[#9BA3A8]/40">·</span>
            <span className="text-xs text-[#9BA3A8]">
              {BUSINESS_INFO.reviewCount} Reviews
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading font-black text-4xl sm:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.98] sm:leading-[0.95] max-w-5xl text-[#F5F7F8]">
            FORGE YOUR<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F7F8] via-[#F5F7F8] to-[#9BA3A8]">
              STRONGEST SELF.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-4 sm:mt-6 text-xs sm:text-base lg:text-lg font-medium tracking-wide text-[#9BA3A8] max-w-2xl px-2">
            CrossFit • Cycling • Personal Training • Weight Training
          </p>

          {/* Buttons: JOIN THE FORGE & CALL NOW */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto max-w-sm sm:max-w-none">
            <button
              onClick={() => onOpenJoin('Hero')}
              className="w-full sm:w-auto bg-[#D7FF00] text-[#101417] px-8 py-3.5 sm:py-4 min-h-[48px] text-xs sm:text-sm font-heading font-black uppercase tracking-wider hover:bg-[#c6ec00] transition-colors cursor-pointer flex items-center justify-center"
            >
              JOIN THE FORGE
            </button>

            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="w-full sm:w-auto bg-[#1B2226] border border-[#2d373c] text-[#F5F7F8] px-8 py-3.5 sm:py-4 min-h-[48px] text-xs sm:text-sm font-heading font-bold uppercase tracking-wider hover:border-[#D7FF00] transition-colors flex items-center justify-center gap-2.5"
            >
              <Phone className="w-4 h-4 text-[#D7FF00]" />
              <span>CALL NOW</span>
            </a>
          </div>

          {/* Location & Schedule ribbon */}
          <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-white/10 w-full max-w-3xl flex flex-wrap items-center justify-center gap-4 sm:gap-12 text-xs text-[#9BA3A8]">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D7FF00]" />
              <span>Budh Vihar Phase I</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D7FF00]" />
              <span>Closes at 12 AM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#D7FF00] rounded-full" />
              <span>Starting at ₹800/Mo</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION — TRAIN YOUR WAY
          ========================================================= */}
      <section className="py-14 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#1B2226] pb-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#D7FF00] uppercase">
              DISCIPLINES & PROGRAMS
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#F5F7F8] mt-1">
              TRAIN YOUR WAY
            </h2>
          </div>
          <button
            onClick={() => {
              onNavigate('training');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#9BA3A8] hover:text-[#D7FF00] transition-colors"
          >
            <span>View All Disciplines</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Four Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group bg-[#1B2226] border border-[#263138] hover:border-[#38464f] transition-all duration-200 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover filter grayscale-[25%] group-hover:scale-105 group-hover:grayscale-0 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#101417]/90 px-2.5 py-1 text-[11px] font-mono font-semibold text-[#D7FF00] border border-white/10">
                  {service.number}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-2xl uppercase tracking-wide text-[#F5F7F8] group-hover:text-white transition-colors">
                    {service.name}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-[#9BA3A8]">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#263138]/60 flex items-center justify-between">
                  <button
                    onClick={() => {
                      onNavigate('training');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-heading font-semibold uppercase tracking-wider text-[#9BA3A8] group-hover:text-[#D7FF00] transition-colors flex items-center gap-1.5"
                  >
                    <span>Learn Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => onOpenJoin(service.name)}
                    className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#101417] bg-[#D7FF00] px-2.5 py-1 hover:bg-[#c6ec00] transition-colors"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          SECTION — MEMBERSHIP
          ========================================================= */}
      <section className="py-14 sm:py-24 bg-[#141A1E] border-y border-[#1B2226]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8 sm:mb-12">
            <span className="text-xs font-mono tracking-widest text-[#D7FF00] uppercase">
              TRANSPARENT VALUE
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#F5F7F8] mt-1">
              MEMBERSHIP
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#9BA3A8]">
              Flexible commitment tiers built around your training schedule. No hidden registration fees.
            </p>
          </div>

          {/* Simple pricing preview cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {PRICING_GENERAL.map((tier) => (
              <div
                key={tier.duration}
                className={`p-5 sm:p-6 bg-[#1B2226] border flex flex-col justify-between relative transition-all ${
                  tier.isPopular
                    ? 'border-[#D7FF00]/60 ring-1 ring-[#D7FF00]/40'
                    : 'border-[#263138]'
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-3 right-4 bg-[#D7FF00] text-[#101417] px-2.5 py-0.5 text-[10px] font-heading font-black uppercase tracking-wider">
                    POPULAR CHOICE
                  </div>
                )}

                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#9BA3A8]">
                    DURATION
                  </span>
                  <h3 className="font-heading font-black text-xl uppercase tracking-wide text-[#F5F7F8] mt-0.5">
                    {tier.duration}
                  </h3>

                  <div className="mt-3 sm:mt-4 mb-2">
                    <span className="font-heading font-black text-3xl sm:text-4xl text-[#F5F7F8]">
                      {tier.price}
                    </span>
                  </div>

                  <p className="text-xs text-[#9BA3A8] font-mono">
                    {tier.periodText}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#263138]">
                  <button
                    onClick={() => onOpenJoin(`${tier.duration} Plan`)}
                    className="w-full bg-[#101417] hover:bg-[#D7FF00] hover:text-[#101417] border border-[#2d373c] hover:border-transparent text-[#F5F7F8] py-3 text-xs font-heading font-bold uppercase tracking-wider transition-colors min-h-[44px] cursor-pointer"
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action and Disclaimer Note */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#1B2226]">
            <p className="text-xs text-[#9BA3A8]/70 max-w-xl">
              * Note: Pricing other than ₹800/month is concept/sample pricing and must not be presented as verified official pricing.
            </p>

            <button
              onClick={() => {
                onNavigate('membership');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#D7FF00] text-[#101417] px-6 py-3.5 text-xs font-heading font-black uppercase tracking-wider hover:bg-[#c6ec00] transition-colors min-h-[44px] cursor-pointer"
            >
              <span>VIEW MEMBERSHIP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION — FIND THE FORGE
          ========================================================= */}
      <section className="py-14 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#D7FF00] uppercase">
                LOCATION & VISITS
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#F5F7F8] mt-1">
                FIND THE FORGE
              </h2>
            </div>

            {/* Address */}
            <div className="p-5 sm:p-6 bg-[#1B2226] border border-[#263138] space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D7FF00] shrink-0 mt-1" />
                <div>
                  <h4 className="font-heading font-bold text-base uppercase text-[#F5F7F8]">
                    Facility Address
                  </h4>
                  <p className="text-xs sm:text-sm text-[#9BA3A8] leading-relaxed mt-1">
                    First Floor, O-34, Block G,<br />
                    Budh Vihar Phase I,<br />
                    Budh Vihar, New Delhi,<br />
                    Delhi 110085
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#263138]">
                <Phone className="w-5 h-5 text-[#D7FF00] shrink-0" />
                <div>
                  <span className="text-xs uppercase text-[#9BA3A8] block font-mono">
                    Direct Gym Line
                  </span>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="font-heading font-bold text-base sm:text-lg text-[#F5F7F8] hover:text-[#D7FF00] transition-colors py-1 inline-block"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#263138]">
                <Clock className="w-5 h-5 text-[#D7FF00] shrink-0" />
                <div>
                  <span className="text-xs uppercase text-[#9BA3A8] block font-mono">
                    Operating Hours
                  </span>
                  <p className="text-sm text-[#F5F7F8] font-medium">
                    Closes at 12 AM
                  </p>
                </div>
              </div>
            </div>

            {/* CTA: GET DIRECTIONS */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href={BUSINESS_INFO.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#D7FF00] text-[#101417] px-8 py-3.5 min-h-[46px] text-xs font-heading font-black uppercase tracking-wider hover:bg-[#c6ec00] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>GET DIRECTIONS</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-[#1B2226] border border-[#2d373c] text-[#F5F7F8] px-8 py-3.5 min-h-[46px] text-xs font-heading font-bold uppercase tracking-wider hover:border-[#D7FF00] transition-colors inline-flex items-center justify-center cursor-pointer"
              >
                View Contact Page
              </button>
            </div>
          </div>

          {/* Interactive Map Visual Placeholder */}
          <div className="lg:col-span-6">
            <div className="relative aspect-video sm:aspect-[4/3] bg-[#1B2226] border border-[#263138] overflow-hidden group">
              {/* Styled dark grid map layout */}
              <div
                className="w-full h-full relative"
                style={{
                  backgroundImage: `radial-gradient(#2d373c 1px, transparent 1px), radial-gradient(#222b30 1px, #141A1E 1px)`,
                  backgroundSize: '24px 24px',
                  backgroundPosition: '0 0, 12px 12px',
                }}
              >
                {/* Simulated stylized street lines */}
                <svg className="absolute inset-0 w-full h-full opacity-30 stroke-[#4a5861]" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="35%" x2="100%" y2="35%" strokeWidth="4" />
                  <line x1="0" y1="65%" x2="100%" y2="65%" strokeWidth="2" />
                  <line x1="45%" y1="0" x2="45%" y2="100%" strokeWidth="4" />
                  <line x1="75%" y1="0" x2="75%" y2="100%" strokeWidth="2" />
                  <circle cx="45%" cy="35%" r="48" fill="#D7FF00" fillOpacity="0.08" stroke="#D7FF00" strokeWidth="1" strokeDasharray="3 3" />
                </svg>

                {/* Map Pin in Budh Vihar */}
                <div className="absolute top-[35%] left-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="relative">
                    <span className="absolute -inset-2 rounded-full bg-[#D7FF00]/30 animate-ping" />
                    <div className="relative w-10 h-10 bg-[#D7FF00] text-[#101417] flex items-center justify-center font-heading font-black text-sm shadow-xl">
                      TF
                    </div>
                  </div>
                  <div className="mt-2 bg-[#101417]/95 border border-[#2d373c] px-3 py-1 text-[11px] font-heading font-bold uppercase text-[#F5F7F8] whitespace-nowrap shadow-xl">
                    The Forge Fitness · O-34 Block G
                  </div>
                </div>

                {/* Street Tag */}
                <div className="absolute bottom-4 left-4 bg-[#101417]/90 border border-white/10 px-3 py-1 text-[10px] font-mono text-[#9BA3A8]">
                  Budh Vihar Phase I · New Delhi 110085
                </div>

                {/* Hover overlay with button */}
                <div className="absolute inset-0 bg-[#101417]/40 group-hover:bg-[#101417]/60 transition-colors flex items-center justify-center">
                  <a
                    href={BUSINESS_INFO.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-90 group-hover:opacity-100 bg-[#101417] border border-[#D7FF00] text-[#D7FF00] hover:bg-[#D7FF00] hover:text-[#101417] px-5 py-2.5 text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-2xl flex items-center gap-2"
                  >
                    <span>Open in Google Maps</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
