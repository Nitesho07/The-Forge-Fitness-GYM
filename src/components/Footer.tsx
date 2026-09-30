import React from 'react';
import { Star, MapPin, Phone, Clock, Instagram, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO, SERVICES, IMAGES } from '../data/gymData';
import { PageId } from './Navbar';
import { ScrollReveal } from './ui/ScrollReveal';
import { CascadeText } from './ui/CascadeText';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0b0e10] border-t border-[#1B2226] text-[#9BA3A8] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal
          animation="stagger"
          itemSelector=".footer-col"
          stagger={0.08}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
        >
          {/* Col 1: Brand & Identity */}
          <div className="footer-col space-y-4">
            <div className="flex items-center gap-3">
              <CascadeText
                as="span"
                className="font-heading font-black text-xl text-[#F5F7F8] tracking-wider uppercase"
                text="THE FORGE FITNESS"
              />
            </div>
            
            <p className="text-sm leading-relaxed text-[#9BA3A8]">
              A disciplined, modern training ground for serious strength, endurance, and physical resilience in Budh Vihar.
            </p>

            {/* Google Rating Block */}
            <div className="pt-2 flex items-center gap-3 text-xs">
              <div className="flex items-center text-[#D6A83A]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < 4 ? 'fill-[#D6A83A]' : 'fill-[#D6A83A]/40'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-[#F5F7F8]">{BUSINESS_INFO.rating}/5 Rating</span>
              <span className="text-[#9BA3A8]/60">·</span>
              <span className="text-[#9BA3A8]">{BUSINESS_INFO.reviewCount} Google Reviews</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="footer-col">
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-[#F5F7F8] mb-5 border-l-2 border-[#D7FF00] pl-2.5">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#F5F7F8] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('training')}
                  className="hover:text-[#F5F7F8] transition-colors cursor-pointer"
                >
                  Training Disciplines
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('membership')}
                  className="hover:text-[#F5F7F8] transition-colors cursor-pointer"
                >
                  Membership Plans
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('the-forge')}
                  className="hover:text-[#F5F7F8] transition-colors cursor-pointer"
                >
                  The Forge Facility & Mindset
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#F5F7F8] transition-colors cursor-pointer"
                >
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Training Disciplines */}
          <div className="footer-col">
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-[#F5F7F8] mb-5 border-l-2 border-[#D7FF00] pl-2.5">
              Disciplines
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.map((s) => (
                <li key={s.id} className="flex items-center justify-between">
                  <span className="text-[#9BA3A8]">{s.name}</span>
                  <span className="text-xs text-[#9BA3A8]/40 font-mono">{s.number}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-[#1B2226]">
              <a
                href={BUSINESS_INFO.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9BA3A8] hover:text-[#D7FF00] transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram: {BUSINESS_INFO.instagram.handle}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 4: Facility Info & Hours */}
          <div className="footer-col space-y-4">
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-[#F5F7F8] mb-5 border-l-2 border-[#D7FF00] pl-2.5">
              Location & Hours
            </h4>

            <div className="flex items-start gap-2.5 text-sm">
              <MapPin className="w-4 h-4 text-[#D7FF00] shrink-0 mt-0.5" />
              <address className="not-italic leading-relaxed">
                {BUSINESS_INFO.address.line1}<br />
                {BUSINESS_INFO.address.line2}<br />
                {BUSINESS_INFO.address.cityStateZip}
              </address>
            </div>

            <div className="flex items-center gap-2.5 text-sm">
              <Clock className="w-4 h-4 text-[#D7FF00] shrink-0" />
              <div>
                <span className="font-semibold text-[#F5F7F8]">Hours: </span>
                <span>{BUSINESS_INFO.hours}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-sm">
              <Phone className="w-4 h-4 text-[#D7FF00] shrink-0" />
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="text-[#F5F7F8] hover:text-[#D7FF00] transition-colors font-medium"
              >
                {BUSINESS_INFO.phone}
              </a>
            </div>

            <a
              href={BUSINESS_INFO.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-wider text-[#101417] bg-[#D7FF00] px-3.5 py-2 mt-2 hover:bg-[#c6ec00] transition-colors"
            >
              Get Directions
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </ScrollReveal>

        {/* Concept Notice & Copyright */}
        <div className="pt-8 border-t border-[#1B2226] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#9BA3A8]/70">
          <div>
            <p>© {new Date().getFullYear()} The Forge Fitness. All rights reserved.</p>
            <p className="mt-1 text-[11px] text-[#9BA3A8]/50">
              * Note: Pricing other than ₹800/month is concept/sample pricing and must not be presented as verified official pricing.
            </p>
          </div>

          <div className="flex items-center gap-6 text-[11px] font-mono tracking-wider">
            <span>BUDH VIHAR PHASE I</span>
            <span>·</span>
            <span>DELHI 110085</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
