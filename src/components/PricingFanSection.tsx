import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Star, User, Users, ArrowRight, Sparkles } from 'lucide-react';
import { PRICING_GENERAL, PRICING_WITH_PT, PricingPlan } from '../data/gymData';
import { CardFan } from './ui/CardFan';
import { CardContainer, CardBody, CardItem } from './ui/ThreeDCard';
import { CascadeText } from './ui/CascadeText';
import { CheckoutPlanSelection } from '../utils/payment';

interface PricingFanSectionProps {
  onOpenJoin: (interest?: string) => void;
  onSelectPlan?: (selection: CheckoutPlanSelection) => void;
  showAllTiersLink?: boolean;
  onNavigateMembership?: () => void;
}

export const PricingFanSection: React.FC<PricingFanSectionProps> = ({
  onOpenJoin,
  onSelectPlan,
  showAllTiersLink = false,
  onNavigateMembership,
}) => {
  // Toggle: 'without_pt' vs 'with_pt'
  const [trainerMode, setTrainerMode] = useState<'without_pt' | 'with_pt'>('without_pt');

  // View option: '4_tiers' (All plans) vs '3_tiers' (Starter, Popular, Annual)
  const [tierView, setTierView] = useState<'4_tiers' | '3_tiers'>('4_tiers');

  // Active pricing dataset based on trainer mode
  const activePricingList: PricingPlan[] = trainerMode === 'without_pt' ? PRICING_GENERAL : PRICING_WITH_PT;

  const isWithPT = trainerMode === 'with_pt';
  const primaryAccent = isWithPT ? '#D6A83A' : '#D7FF00';
  const hoverGlow = isWithPT ? 'rgba(214, 168, 58, 0.4)' : 'rgba(215, 255, 0, 0.4)';

  // Build the list of plans to display
  const displayedPlans: PricingPlan[] =
    tierView === '3_tiers'
      ? [
          activePricingList.find((p) => p.duration === '1 Month') || activePricingList[0],
          activePricingList.find((p) => p.duration === '6 Months') || activePricingList[2],
          activePricingList.find((p) => p.duration === '12 Months') || activePricingList[3],
        ]
      : activePricingList;

  // Metadata helper for Forge membership tier features & highlights
  const getTierMeta = (duration: string) => {
    switch (duration) {
      case '1 Month':
        return {
          categoryLabel: isWithPT ? '1-ON-1 STARTER' : 'FLEXIBLE STARTER',
          tagline: 'Ideal for establishing training consistency',
          badgeText: null,
          isPopular: false,
          features: isWithPT
            ? [
                'Dedicated coach 1-on-1 sessions',
                'Personalized movement assessment',
                'Strength baseline programming',
                'Full facility access included',
              ]
            : [
                'Full facility & weights access',
                'CrossFit & cycling studio zones',
                'Open daily until 12 AM midnight',
                'Locker & hydration stations',
              ],
        };
      case '3 Months':
        return {
          categoryLabel: isWithPT ? 'TECHNIQUE FOUNDATION' : 'QUARTERLY PROGRESS',
          tagline: 'Solid baseline for measurable conditioning gains',
          badgeText: null,
          isPopular: false,
          features: isWithPT
            ? [
                '1-on-1 progressive coaching',
                'Form refinement & technique audit',
                'Bi-weekly conditioning review',
                'Full facility access included',
              ]
            : [
                'All discipline floors included',
                'CrossFit & cycling studio access',
                'Steady progression & habit building',
                'Open daily until 12 AM midnight',
              ],
        };
      case '6 Months':
        return {
          categoryLabel: isWithPT ? 'RECOMMENDED COACHING' : 'MOST POPULAR CHOICE',
          tagline: 'Best balance of progression, coaching and value',
          badgeText: isWithPT ? 'RECOMMENDED' : 'MOST POPULAR',
          isPopular: true,
          features: isWithPT
            ? [
                'Continuous 1-on-1 technique coaching',
                'Progressive overload periodization',
                'Form correction & biomechanics',
                'Custom nutritional framework',
                'Complete facility access included',
              ]
            : [
                'All disciplines included',
                'Priority facility slot access',
                'Open 7 days/week until 12 AM',
                'Quarterly fitness check-in',
                'No cancellation penalties',
              ],
        };
      case '12 Months':
      default:
        return {
          categoryLabel: isWithPT ? 'ELITE ANNUAL 1-ON-1' : 'ANNUAL PASS',
          tagline: 'Maximum commitment, lowest monthly equivalent',
          badgeText: 'BEST VALUE',
          isPopular: false,
          features: isWithPT
            ? [
                'Year-long elite dedicated coach',
                'Comprehensive body composition tracking',
                'Macro & competition conditioning',
                'Priority coach time scheduling',
                'Complete facility access included',
              ]
            : [
                'Full year uninterrupted training',
                'Lowest per-month equivalent rate (₹500/mo)',
                'Guest privileges (2 passes/month)',
                'Open 7 days/week until 12 AM',
                'Freeze membership up to 30 days',
              ],
        };
    }
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          TOP CONTROLS:
          1. Trainer Mode Toggle: WITHOUT PERSONAL TRAINER ↔ WITH PERSONAL TRAINER
          2. Tier Count Selector: 4 PLANS ↔ 3 TIERS
          ========================================================================= */}
      <div className="flex flex-col items-center justify-center mb-8 sm:mb-12">
        {/* Toggle Pill Container */}
        <div className="relative flex items-center p-1.5 rounded-full bg-[#141A1E] border border-[#263138] shadow-2xl max-w-full">
          {/* Option 1: WITHOUT PERSONAL TRAINER */}
          <button
            type="button"
            onClick={() => setTrainerMode('without_pt')}
            className={`relative z-10 flex items-center gap-2 px-3.5 sm:px-6 py-2.5 rounded-full text-xs font-heading font-black uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
              !isWithPT ? 'text-[#101417]' : 'text-[#9BA3A8] hover:text-[#F5F7F8]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>WITHOUT PERSONAL TRAINER</span>
          </button>

          {/* Option 2: WITH PERSONAL TRAINER */}
          <button
            type="button"
            onClick={() => setTrainerMode('with_pt')}
            className={`relative z-10 flex items-center gap-2 px-3.5 sm:px-6 py-2.5 rounded-full text-xs font-heading font-black uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
              isWithPT ? 'text-[#101417]' : 'text-[#9BA3A8] hover:text-[#F5F7F8]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>WITH PERSONAL TRAINER</span>
          </button>

          {/* Sliding Animated Active Indicator Pill */}
          <motion.div
            layoutId="pricing-toggle-pill"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className={`absolute top-1.5 bottom-1.5 rounded-full shadow-lg ${
              !isWithPT
                ? 'left-1.5 right-[50%] bg-[#D7FF00] shadow-[#D7FF00]/25'
                : 'left-[50%] right-1.5 bg-[#D6A83A] shadow-[#D6A83A]/25'
            }`}
          />
        </div>

        {/* Dynamic Mode Subtitle */}
        <motion.p
          key={trainerMode}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-3 text-xs font-mono text-[#9BA3A8] text-center"
        >
          {isWithPT ? (
            <span>
              <strong className="text-[#D6A83A]">1-on-1 Dedicated Coaching:</strong> Custom programming, form refinement & nutrition guidance
            </span>
          ) : (
            <span>
              <strong className="text-[#D7FF00]">Open Facility Access:</strong> CrossFit, weights & cycling floor · Open daily until 12 AM
            </span>
          )}
        </motion.p>

        {/* Tier Count View Switcher */}
        <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-[#9BA3A8]">
          <span>Display:</span>
          <button
            type="button"
            onClick={() => setTierView('4_tiers')}
            className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
              tierView === '4_tiers'
                ? 'bg-[#1B2226] text-[#D7FF00] border-[#D7FF00]/60 font-bold'
                : 'bg-transparent text-[#9BA3A8] border-[#263138] hover:text-white'
            }`}
          >
            All 4 Plans
          </button>
          <span className="text-[#38464f]">/</span>
          <button
            type="button"
            onClick={() => setTierView('3_tiers')}
            className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
              tierView === '3_tiers'
                ? 'bg-[#1B2226] text-[#D7FF00] border-[#D7FF00]/60 font-bold'
                : 'bg-transparent text-[#9BA3A8] border-[#263138] hover:text-white'
            }`}
          >
            3 Featured Tiers
          </button>
        </div>
      </div>

      {/* =========================================================================
          PRICING CARDS POWERED BY REUSABLE CardFan CAROUSEL
          - Arranged in exact symmetrical fan on viewport scroll
          - On hover: scale 1.03, elevate -10px, straighten 0deg, zIndex 40, accent glow
          - Smooth reversible scroll reveal
          - Full touch & mobile responsiveness
          ========================================================================= */}
      <div className="relative max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-6">
        <CardFan
          key={`pricing-fan-${tierView}`}
          itemClassName="rounded-2xl"
          hoverGlowColor={hoverGlow}
          gridClassName={
            tierView === '3_tiers'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch'
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch'
          }
        >
          {displayedPlans.map((plan) => {
            const meta = getTierMeta(plan.duration);
            const isHighlight = meta.isPopular || plan.isPopular;

            return (
              <CardContainer
                key={plan.duration}
                maxTilt={8}
                glareColor={isWithPT ? 'rgba(214, 168, 58, 0.16)' : 'rgba(215, 255, 0, 0.16)'}
                containerClassName="h-full"
                className="h-full"
              >
                <CardBody
                  className={`relative flex flex-col justify-between rounded-2xl bg-[#1B2226] border p-6 sm:p-7 select-none transition-all duration-300 h-full ${
                    isHighlight
                      ? isWithPT
                        ? 'border-[#D6A83A]/80 shadow-[0_20px_50px_-15px_rgba(214,168,58,0.25)] ring-1 ring-[#D6A83A]/50'
                        : 'border-[#D7FF00]/80 shadow-[0_20px_50px_-15px_rgba(215,255,0,0.25)] ring-1 ring-[#D7FF00]/50'
                      : 'border-[#263138] shadow-2xl'
                  }`}
                >
                  {/* Popular / Recommended / Best Value Floating Badge */}
                  {meta.badgeText && (
                    <CardItem translateZ={40} className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
                      <div
                        className={`px-3.5 py-0.5 rounded-full text-[10px] font-heading font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap ${
                          isWithPT
                            ? 'bg-[#D6A83A] text-[#101417] shadow-[#D6A83A]/30'
                            : 'bg-[#D7FF00] text-[#101417] shadow-[#D7FF00]/30'
                        }`}
                      >
                        {isHighlight ? (
                          <Star className="w-3 h-3 fill-current" />
                        ) : (
                          <Sparkles className="w-3 h-3" />
                        )}
                        <span>{meta.badgeText}</span>
                      </div>
                    </CardItem>
                  )}

                  {/* Card Top Section */}
                  <div>
                    {/* Category Label */}
                    <CardItem translateZ={25} className="flex items-center justify-between mb-2">
                      <span
                        className="text-[11px] font-mono uppercase tracking-widest font-bold"
                        style={{ color: primaryAccent }}
                      >
                        {meta.categoryLabel}
                      </span>
                      <span className="text-[10px] font-mono text-[#9BA3A8]/70 uppercase">
                        {trainerMode === 'without_pt' ? 'Standard' : 'Trainer'}
                      </span>
                    </CardItem>

                    {/* Plan Duration Title */}
                    <CardItem translateZ={30}>
                      <CascadeText
                        as="h3"
                        cascadeOnParentHover={true}
                        className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-wide text-[#F5F7F8]"
                        text={plan.duration}
                      />
                    </CardItem>

                    <CardItem translateZ={15}>
                      <p className="mt-1 text-xs text-[#9BA3A8] leading-relaxed min-h-[32px]">
                        {meta.tagline}
                      </p>
                    </CardItem>

                    {/* Price Block with Smooth State Transition */}
                    <CardItem translateZ={35} className="my-5 pt-4 border-t border-[#263138]">
                      <div className="flex items-baseline gap-2">
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={`${trainerMode}-${plan.price}`}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="font-heading font-black text-3xl sm:text-4xl tracking-tight text-[#F5F7F8]"
                          >
                            {plan.price}
                          </motion.span>
                        </AnimatePresence>
                      </div>

                      {/* Period Subtitle */}
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={`${trainerMode}-${plan.periodText}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="mt-1 text-xs font-mono text-[#9BA3A8]"
                        >
                          {plan.periodText}
                        </motion.p>
                      </AnimatePresence>
                    </CardItem>

                    {/* Features List */}
                    <CardItem translateZ={20} className="border-t border-[#263138] pt-4 mb-6">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#9BA3A8]/80 block mb-3">
                        INCLUDED IN THIS PASS:
                      </span>
                      <ul className="space-y-2.5 text-xs text-[#9BA3A8]">
                        {meta.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <Check
                              className="w-3.5 h-3.5 shrink-0 mt-0.5"
                              style={{ color: primaryAccent }}
                            />
                            <span className="text-[#D4D8DA] leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </CardItem>
                  </div>

                  {/* Card CTA Button */}
                  <CardItem translateZ={30} className="pt-4 border-t border-[#263138]">
                    <button
                      type="button"
                      onClick={() => {
                        const planCategory: 'Standard Pass' | '1-on-1 Trainer Coaching' =
                          trainerMode === 'without_pt' ? 'Standard Pass' : '1-on-1 Trainer Coaching';
                        if (onSelectPlan) {
                          onSelectPlan({
                            category: planCategory,
                            duration: plan.duration,
                            price: plan.price,
                            priceNum: plan.priceNum,
                          });
                        } else {
                          onOpenJoin(
                            `${trainerMode === 'without_pt' ? 'Without PT' : 'With PT'} - ${
                              plan.duration
                            } (${plan.price})`
                          );
                        }
                      }}
                      className={`w-full py-3.5 px-4 rounded-lg text-xs font-heading font-black uppercase tracking-wider transition-all duration-200 cursor-pointer min-h-[46px] flex items-center justify-center gap-2 shadow-md active:scale-95 ${
                        isHighlight
                          ? isWithPT
                            ? 'bg-[#D6A83A] text-[#101417] hover:bg-[#e0b548] shadow-[#D6A83A]/30'
                            : 'bg-[#D7FF00] text-[#101417] hover:bg-[#c6ec00] shadow-[#D7FF00]/30'
                          : 'bg-[#101417] hover:bg-[#D7FF00] text-[#F5F7F8] hover:text-[#101417] border border-[#2d373c] hover:border-transparent'
                      }`}
                    >
                      <span>SELECT {plan.duration.toUpperCase()}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </CardItem>
                </CardBody>
              </CardContainer>
            );
          })}
        </CardFan>
      </div>

      {/* Link to Full Membership page if shown on Home */}
      {showAllTiersLink && onNavigateMembership && (
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#1B2226]">
          <p className="text-xs text-[#9BA3A8]/70 max-w-xl font-mono">
            * Base gym access starting at ₹800/month. Personal trainer packages include customized workout periodization & movement assessments.
          </p>
          <button
            type="button"
            onClick={onNavigateMembership}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#D7FF00] text-[#101417] px-6 py-3.5 text-xs font-heading font-black uppercase tracking-wider hover:bg-[#c6ec00] transition-colors min-h-[44px] cursor-pointer rounded-lg"
          >
            <span>VIEW ALL MEMBERSHIP DETAILS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
