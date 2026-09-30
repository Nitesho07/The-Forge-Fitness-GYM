import React, { useState, useEffect } from 'react';
import { X, Phone, MessageSquare, Check, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/gymData';
import { CascadeText } from './ui/CascadeText';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialInterest?: string;
}

export const JoinModal: React.FC<JoinModalProps> = ({
  isOpen,
  onClose,
  initialInterest = 'General Membership',
}) => {
  const [selectedPlan, setSelectedPlan] = useState(initialInterest);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedPlan(initialInterest);
      setSubmitted(false);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, initialInterest, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi The Forge Fitness! I am interested in joining (${selectedPlan}). My name is ${name || 'Visitor'}. Could you share enrollment details?`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#141A1E] border border-[#263138] p-5 sm:p-8 shadow-2xl text-[#F5F7F8] max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#9BA3A8] hover:text-white bg-[#1B2226] border border-[#2d373c] transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 bg-[#D7FF00]/10 border border-[#D7FF00] text-[#D7FF00] flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <CascadeText
              as="h3"
              className="font-heading font-bold text-2xl uppercase tracking-wider text-[#F5F7F8]"
              text="Inquiry Received"
            />
            <p className="text-sm text-[#9BA3A8] max-w-sm mx-auto">
              Thank you, {name || 'Athlete'}! You can also call directly or visit our Budh Vihar gym during open hours.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="bg-[#D7FF00] text-[#101417] px-6 py-3 text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call: {BUSINESS_INFO.phone}
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="bg-[#1B2226] border border-[#2d373c] text-[#F5F7F8] px-6 py-3 text-xs font-heading font-bold uppercase tracking-wider hover:bg-[#252e34]"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 border-b border-[#263138] pb-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#D7FF00]">
                START TRAINING
              </span>
              <CascadeText
                as="h2"
                className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-wider mt-1 text-[#F5F7F8]"
                text="JOIN THE FORGE"
              />
              <p className="text-xs text-[#9BA3A8] mt-1">
                Budh Vihar Phase I · Open daily until 12 AM
              </p>
            </div>

            {/* Fast Actions: Call or WhatsApp */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="flex items-center justify-center gap-2 p-3 bg-[#1B2226] border border-[#2d373c] text-xs font-heading font-semibold uppercase tracking-wider hover:border-[#D7FF00] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D7FF00]" />
                <span>Call Gym</span>
              </a>
              <a
                href={`https://wa.me/918130987020?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-[#1B2226] border border-[#2d373c] text-xs font-heading font-semibold uppercase tracking-wider hover:border-[#D7FF00] transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#D7FF00]" />
                <span>WhatsApp</span>
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="join-plan-select" className="block text-xs uppercase font-medium tracking-wider text-[#9BA3A8] mb-1.5">
                  Interested Discipline / Plan
                </label>
                <select
                  id="join-plan-select"
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full bg-[#1B2226] border border-[#2d373c] px-3.5 py-2.5 text-sm text-[#F5F7F8] focus:border-[#D7FF00] focus:outline-none"
                >
                  {![
                    'General Membership (₹800/mo base)',
                    'General Membership',
                    'CrossFit',
                    'Weight Training',
                    'Cycling',
                    'Personal Training',
                    'Quarterly / Half-Year Commitment',
                  ].includes(selectedPlan) && (
                    <option value={selectedPlan}>{selectedPlan}</option>
                  )}
                  <option value="General Membership (₹800/mo base)">General Membership (₹800/mo base)</option>
                  <option value="CrossFit">CrossFit Training</option>
                  <option value="Weight Training">Weight Training</option>
                  <option value="Cycling">Cycling</option>
                  <option value="Personal Training">Personal Training (1-on-1)</option>
                  <option value="Quarterly / Half-Year Commitment">Commitment Plan (3 / 6 / 12 mo)</option>
                </select>
              </div>

              <div>
                <label htmlFor="join-name-input" className="block text-xs uppercase font-medium tracking-wider text-[#9BA3A8] mb-1.5">
                  Your Name
                </label>
                <input
                  id="join-name-input"
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#1B2226] border border-[#2d373c] px-3.5 py-2.5 text-sm text-[#F5F7F8] placeholder-[#9BA3A8]/40 focus:border-[#D7FF00] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="join-phone-input" className="block text-xs uppercase font-medium tracking-wider text-[#9BA3A8] mb-1.5">
                  Phone Number
                </label>
                <input
                  id="join-phone-input"
                  type="tel"
                  required
                  placeholder="e.g. 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#1B2226] border border-[#2d373c] px-3.5 py-2.5 text-sm text-[#F5F7F8] placeholder-[#9BA3A8]/40 focus:border-[#D7FF00] focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#D7FF00] text-[#101417] py-3 text-xs font-heading font-bold uppercase tracking-wider hover:bg-[#c6ec00] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Membership Callback</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <p className="mt-4 text-[11px] text-[#9BA3A8]/60 text-center">
              Walk-ins welcome daily at First Floor, O-34, Block G, Budh Vihar Phase I.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
