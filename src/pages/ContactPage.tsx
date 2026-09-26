import React, { useState } from 'react';
import { MapPin, Phone, Clock, Instagram, ArrowUpRight, Check, Send, Navigation } from 'lucide-react';
import { BUSINESS_INFO } from '../data/gymData';
import { PageId } from '../components/Navbar';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  onOpenJoin: (interest?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onOpenJoin }) => {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#101417] text-[#F5F7F8] pt-20 sm:pt-24 landscape:pt-14 pb-20 landscape:pb-8">
      {/* Hero Header */}
      <section className="border-b border-[#1B2226] bg-[#141A1E]/60 py-10 sm:py-20 landscape:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <span className="text-xs font-mono tracking-widest text-[#D7FF00] uppercase">
            VISIT & REACH US
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-6xl lg:text-7xl landscape:text-2xl uppercase tracking-tight text-[#F5F7F8] mt-2 mb-3">
            FIND YOUR WAY TO THE FORGE.
          </h1>
          <p className="text-xs sm:text-base text-[#9BA3A8] max-w-2xl mx-auto leading-relaxed px-2">
            Conveniently situated in Budh Vihar Phase I. Reach us by phone, drop by for an in-person facility walkthrough, or get live turn-by-turn directions.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 sm:py-16 landscape:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Col 1: Business Details & Action Buttons */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="bg-[#1B2226] border border-[#263138] p-5 sm:p-8 space-y-5 sm:space-y-6">
              <div className="border-b border-[#263138] pb-4">
                <span className="text-xs font-mono text-[#D7FF00] uppercase tracking-wider">
                  OFFICIAL LOCATION
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-wide text-[#F5F7F8] mt-1">
                  {BUSINESS_INFO.name}
                </h2>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 bg-[#101417] border border-[#2d373c] flex items-center justify-center shrink-0 text-[#D7FF00]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#9BA3A8] block mb-1">
                    Address
                  </span>
                  <address className="not-italic text-xs sm:text-base text-[#F5F7F8] leading-relaxed">
                    {BUSINESS_INFO.address.line1}<br />
                    {BUSINESS_INFO.address.line2}<br />
                    {BUSINESS_INFO.address.cityStateZip}
                  </address>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 sm:gap-4 pt-4 border-t border-[#263138]">
                <div className="w-10 h-10 bg-[#101417] border border-[#2d373c] flex items-center justify-center shrink-0 text-[#D7FF00]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#9BA3A8] block mb-1">
                    Phone
                  </span>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="font-heading font-black text-xl sm:text-2xl text-[#F5F7F8] hover:text-[#D7FF00] transition-colors py-0.5 inline-block"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 sm:gap-4 pt-4 border-t border-[#263138]">
                <div className="w-10 h-10 bg-[#101417] border border-[#2d373c] flex items-center justify-center shrink-0 text-[#D7FF00]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#9BA3A8] block mb-1">
                    Hours
                  </span>
                  <p className="font-heading font-bold text-base sm:text-lg text-[#F5F7F8]">
                    {BUSINESS_INFO.hours}
                  </p>
                  <p className="text-xs text-[#9BA3A8] mt-0.5">
                    {BUSINESS_INFO.hoursDetail}
                  </p>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-3 sm:gap-4 pt-4 border-t border-[#263138]">
                <div className="w-10 h-10 bg-[#101417] border border-[#2d373c] flex items-center justify-center shrink-0 text-[#D7FF00]">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#9BA3A8] block mb-1">
                    Instagram
                  </span>
                  <a
                    href={BUSINESS_INFO.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-semibold text-[#F5F7F8] hover:text-[#D7FF00] inline-flex items-center gap-1.5 transition-colors break-all"
                  >
                    <span>{BUSINESS_INFO.instagram.url}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#D7FF00] shrink-0" />
                  </a>
                </div>
              </div>

              {/* Primary Buttons: CALL NOW & GET DIRECTIONS */}
              <div className="pt-6 border-t border-[#263138] flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="w-full sm:w-auto bg-[#D7FF00] text-[#101417] px-8 py-3.5 min-h-[46px] text-xs font-heading font-black uppercase tracking-wider hover:bg-[#c6ec00] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>CALL NOW</span>
                </a>

                <a
                  href={BUSINESS_INFO.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#101417] border border-[#2d373c] text-[#F5F7F8] px-8 py-3.5 min-h-[46px] text-xs font-heading font-bold uppercase tracking-wider hover:border-[#D7FF00] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-[#D7FF00]" />
                  <span>GET DIRECTIONS</span>
                </a>
              </div>
            </div>

            {/* Quick Visit Tips */}
            <div className="bg-[#141A1E] border border-[#263138] p-6 text-xs text-[#9BA3A8] space-y-2">
              <span className="font-heading font-bold text-sm text-[#F5F7F8] uppercase block">
                Visitor Information
              </span>
              <p>
                First-time athletes are invited to visit any day during regular floor hours. First Floor, O-34, Block G, Budh Vihar Phase I.
              </p>
              <p className="font-mono text-[#D7FF00] pt-1">
                Base Membership: ₹800/month
              </p>
            </div>
          </div>

          {/* Col 2: Simple Map Placeholder & Direct Note */}
          <div className="lg:col-span-6 space-y-8">
            {/* Map Placeholder */}
            <div className="bg-[#1B2226] border border-[#263138] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#263138] flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-sm uppercase text-[#F5F7F8]">
                    Budh Vihar Phase I Map View
                  </h3>
                  <p className="text-[11px] font-mono text-[#9BA3A8]">
                    Coordinates: 28.7180° N, 77.0789° E
                  </p>
                </div>
                <a
                  href={BUSINESS_INFO.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#D7FF00] hover:underline flex items-center gap-1"
                >
                  <span>Google Maps</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              {/* Map Canvas Placeholder */}
              <div
                className="relative aspect-video sm:aspect-[4/3] w-full"
                style={{
                  backgroundImage: `radial-gradient(#2d373c 1px, transparent 1px), radial-gradient(#222b30 1px, #12171A 1px)`,
                  backgroundSize: '24px 24px',
                  backgroundPosition: '0 0, 12px 12px',
                }}
              >
                {/* Visual streets map grid */}
                <svg className="absolute inset-0 w-full h-full opacity-35 stroke-[#4a5861]" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="40%" x2="100%" y2="40%" strokeWidth="4" />
                  <line x1="0" y1="70%" x2="100%" y2="70%" strokeWidth="2" />
                  <line x1="50%" y1="0" x2="50%" y2="100%" strokeWidth="4" />
                  <line x1="20%" y1="0" x2="20%" y2="100%" strokeWidth="2" />
                  <line x1="80%" y1="0" x2="80%" y2="100%" strokeWidth="2" />
                  <circle cx="50%" cy="40%" r="56" fill="#D7FF00" fillOpacity="0.08" stroke="#D7FF00" strokeWidth="1" strokeDasharray="4 4" />
                </svg>

                {/* Marker */}
                <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="relative">
                    <span className="absolute -inset-2 rounded-full bg-[#D7FF00]/40 animate-ping" />
                    <div className="relative w-12 h-12 bg-[#D7FF00] text-[#101417] flex items-center justify-center font-heading font-black text-base shadow-2xl">
                      TF
                    </div>
                  </div>
                  <div className="mt-2 bg-[#101417] border border-[#2d373c] px-3 py-1.5 text-xs font-heading font-bold uppercase text-[#F5F7F8] shadow-2xl">
                    The Forge Fitness
                  </div>
                  <div className="text-[10px] font-mono text-[#9BA3A8] bg-[#101417]/80 px-2 py-0.5 mt-0.5">
                    First Floor, O-34, Block G
                  </div>
                </div>

                {/* Bottom Overlay Link */}
                <div className="absolute bottom-4 right-4">
                  <a
                    href={BUSINESS_INFO.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#101417]/95 border border-[#D7FF00] text-[#D7FF00] hover:bg-[#D7FF00] hover:text-[#101417] px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 shadow-xl"
                  >
                    <span>Launch Navigation</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="bg-[#1B2226] border border-[#263138] p-6 sm:p-8">
              <h3 className="font-heading font-bold text-xl uppercase tracking-wide text-[#F5F7F8] mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-[#9BA3A8] mb-6">
                Have questions about CrossFit, personal training, or hours? Drop a note below.
              </p>

              {sent ? (
                <div className="p-6 bg-[#141A1E] border border-[#D7FF00]/40 text-center space-y-3">
                  <div className="w-10 h-10 bg-[#D7FF00]/10 border border-[#D7FF00] text-[#D7FF00] flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading font-bold text-lg uppercase text-[#F5F7F8]">
                    Message Sent
                  </h4>
                  <p className="text-xs text-[#9BA3A8]">
                    Thank you! We will get in touch shortly, or you can call us directly at {BUSINESS_INFO.phone}.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-xs font-mono text-[#D7FF00] underline uppercase"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-[#9BA3A8] mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full bg-[#101417] border border-[#2d373c] px-3.5 py-2.5 text-sm text-[#F5F7F8] placeholder-[#9BA3A8]/40 focus:border-[#D7FF00] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-[#9BA3A8] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 81309 XXXXX"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full bg-[#101417] border border-[#2d373c] px-3.5 py-2.5 text-sm text-[#F5F7F8] placeholder-[#9BA3A8]/40 focus:border-[#D7FF00] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-[#9BA3A8] mb-1">
                      Message / Question
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Ask about training hours, batch timings, or membership..."
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full bg-[#101417] border border-[#2d373c] px-3.5 py-2.5 text-sm text-[#F5F7F8] placeholder-[#9BA3A8]/40 focus:border-[#D7FF00] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D7FF00] text-[#101417] py-3 text-xs font-heading font-black uppercase tracking-wider hover:bg-[#c6ec00] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Send Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
