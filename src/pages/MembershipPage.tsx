import React from 'react';
import { AlertCircle, Phone } from 'lucide-react';
import { BUSINESS_INFO, IMAGES } from '../data/gymData';
import { PageId } from '../components/Navbar';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { PricingFanSection } from '../components/PricingFanSection';
import { CardContainer, CardBody, CardItem } from '../components/ui/ThreeDCard';
import { CascadeText } from '../components/ui/CascadeText';
import { CheckoutPlanSelection } from '../utils/payment';

interface MembershipPageProps {
  onNavigate: (page: PageId) => void;
  onOpenJoin: (interest?: string) => void;
  onSelectPlan?: (selection: CheckoutPlanSelection) => void;
}

export const MembershipPage: React.FC<MembershipPageProps> = ({
  onNavigate,
  onOpenJoin,
  onSelectPlan,
}) => {
  return (
    <div className="min-h-screen bg-[#101417] text-[#F5F7F8] pb-20">
      {/* Cinematic Hero Header */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden border-b border-[#1B2226]">
        {/* Background Gym Image with dark industrial gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.personalTraining}
            alt="The Forge Membership Training"
            className="w-full h-full object-cover object-center filter grayscale-[35%] brightness-[35%] contrast-[115%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101417] via-[#101417]/75 to-[#101417]/90" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#101417]/50 to-[#101417]/95" />
        </div>

        <ScrollReveal
          animation="hero"
          itemSelector=".hero-item"
          stagger={0.12}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl"
        >
          <span className="hero-item inline-block text-xs font-mono tracking-widest text-[#D7FF00] uppercase bg-[#1B2226]/80 border border-[#2d373c] px-3.5 py-1 mb-4 backdrop-blur-sm">
            MEMBERSHIP TIERS
          </span>
          <CascadeText
            as="h1"
            className="hero-item font-heading font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-[#F5F7F8] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] mt-2 mb-4"
          >
            CHOOSE YOUR{' '}
            <span className="text-[#D7FF00] drop-shadow-[0_0_35px_rgba(215,255,0,0.3)]">
              COMMITMENT.
            </span>
          </CascadeText>
          <p className="hero-item text-sm sm:text-lg text-[#9BA3A8] max-w-2xl mx-auto leading-relaxed px-2 font-medium">
            Straightforward pricing with zero complicated contracts. Train on your own schedule or pair with dedicated personal coaching.
          </p>

          {/* Sample Pricing Notice Badge */}
          <div className="hero-item mt-6 inline-flex items-center gap-2 bg-[#1B2226]/90 border border-[#D6A83A]/60 px-4 py-1.5 text-xs text-[#D6A83A] font-mono shadow-md backdrop-blur-sm">
            <AlertCircle className="w-4 h-4 text-[#D6A83A] shrink-0" />
            <span>Concept / Sample Pricing</span>
          </div>
        </ScrollReveal>
      </section>

      {/* Main Pricing Section: Card Fan & Trainer Toggle */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PricingFanSection onOpenJoin={onOpenJoin} onSelectPlan={onSelectPlan} />

        {/* Pricing Disclaimer Note */}
        <div className="mt-12 sm:mt-16">
          <ScrollReveal animation="fade-up">
            <CardContainer maxTilt={5} className="w-full">
              <CardBody className="p-6 bg-[#141A1E] border border-[#263138] text-xs text-[#9BA3A8] space-y-2 font-mono rounded-xl shadow-lg">
                <CardItem translateZ={15}>
                  <p className="font-bold text-white uppercase tracking-wider">
                    Important Pricing Transparency Notice:
                  </p>
                </CardItem>
                <CardItem translateZ={10}>
                  <p>
                    * The standard facility membership fee is ₹800/month. The extended duration plans and Personal Training options shown above are sample/concept pricing structures for illustrative purposes and subject to direct facility confirmation.
                  </p>
                </CardItem>
                <CardItem translateZ={12}>
                  <p>
                    For precise active batch rates, personal trainer availability, and special packages, please call us directly at{' '}
                    <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-[#D7FF00] underline font-bold">
                      {BUSINESS_INFO.phone}
                    </a>{' '}
                    or visit our reception on the First Floor, Block G, Budh Vihar Phase I.
                  </p>
                </CardItem>
              </CardBody>
            </CardContainer>
          </ScrollReveal>
        </div>

        {/* Bottom Consultation Box */}
        <div className="mt-10 sm:mt-12">
          <ScrollReveal animation="fade-up">
            <CardContainer maxTilt={7} className="w-full">
              <CardBody className="p-8 sm:p-12 bg-[#1B2226] border border-[#263138] flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl shadow-2xl">
                <div>
                  <CardItem translateZ={25}>
                    <span className="text-xs font-mono text-[#D7FF00] uppercase tracking-wider">
                      NEED ADVICE?
                    </span>
                  </CardItem>
                  <CardItem translateZ={40}>
                    <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#F5F7F8] mt-1">
                      Not sure which plan fits your goals?
                    </h3>
                  </CardItem>
                  <CardItem translateZ={20}>
                    <p className="text-xs sm:text-sm text-[#9BA3A8] mt-1 max-w-xl">
                      Speak directly with our trainers at the front desk. We can assess your conditioning background and suggest the right training path.
                    </p>
                  </CardItem>
                </div>

                <CardItem translateZ={35} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                  <button
                    onClick={() => onOpenJoin('Plan Consultation')}
                    className="bg-[#D7FF00] text-[#101417] px-6 py-3.5 text-xs font-heading font-black uppercase tracking-wider hover:bg-[#c6ec00] transition-colors cursor-pointer text-center rounded-lg shadow-md active:scale-95"
                  >
                    REQUEST CONSULTATION
                  </button>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="bg-[#101417] border border-[#2d373c] text-[#F5F7F8] px-6 py-3.5 text-xs font-heading font-bold uppercase tracking-wider hover:border-[#D7FF00] transition-colors flex items-center justify-center gap-2 rounded-lg active:scale-95"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D7FF00]" />
                    <span>Call {BUSINESS_INFO.phone}</span>
                  </a>
                </CardItem>
              </CardBody>
            </CardContainer>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
