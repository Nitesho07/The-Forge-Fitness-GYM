import React from 'react';
import { Check, Star } from 'lucide-react';
import { PricingPlan } from '../../data/gymData';
import { CardContainer, CardBody, CardItem } from './ThreeDCard';
import { CursorShadowText } from './CursorShadowText';

export interface SkewPriceCardProps {
  plan: PricingPlan;
  categoryType?: 'without_pt' | 'with_pt' | 'general';
  categoryLabel?: string;
  badgeText?: string;
  features?: string[];
  ctaText?: string;
  onSelect: () => void;
  className?: string;
}

export const SkewPriceCard: React.FC<SkewPriceCardProps> = ({
  plan,
  categoryType = 'without_pt',
  categoryLabel,
  badgeText,
  features,
  ctaText,
  onSelect,
  className = '',
}) => {
  const isWithPT = categoryType === 'with_pt';
  const isPopular = plan.isPopular;

  const primaryAccent = isWithPT ? '#D6A83A' : '#D7FF00';
  const accentGradient = isPopular
    ? 'linear-gradient(315deg, rgba(215, 255, 0, 0.45) 0%, rgba(214, 168, 58, 0.35) 50%, #1B2226 100%)'
    : isWithPT
    ? 'linear-gradient(315deg, rgba(214, 168, 58, 0.4) 0%, #1B2226 70%, #101417 100%)'
    : 'linear-gradient(315deg, rgba(215, 255, 0, 0.4) 0%, #1B2226 70%, #101417 100%)';

  const secondaryGradient = isWithPT
    ? 'linear-gradient(135deg, rgba(214, 168, 58, 0.2) 0%, #101417 60%, rgba(214, 168, 58, 0.1) 100%)'
    : 'linear-gradient(135deg, rgba(215, 255, 0, 0.2) 0%, #101417 60%, rgba(215, 255, 0, 0.1) 100%)';

  return (
    <CardContainer
      maxTilt={14}
      glareColor={isWithPT ? 'rgba(214, 168, 58, 0.16)' : 'rgba(215, 255, 0, 0.16)'}
      containerClassName={`h-full ${className}`}
      className="h-full rounded-2xl"
    >
      <div className="group relative isolate transition-all duration-300 select-none h-full w-full">
        {/* Layer 0: Ambient Glow */}
        <div
          className="absolute -inset-1.5 rounded-2xl opacity-0 group-hover:opacity-75 blur-xl transition-opacity duration-500 pointer-events-none -z-20"
          style={{
            background: isPopular
              ? 'radial-gradient(circle at 50% 50%, rgba(215, 255, 0, 0.25), rgba(214, 168, 58, 0.2), transparent 70%)'
              : isWithPT
              ? 'radial-gradient(circle at 50% 50%, rgba(214, 168, 58, 0.22), transparent 70%)'
              : 'radial-gradient(circle at 50% 50%, rgba(215, 255, 0, 0.22), transparent 70%)',
          }}
        />

        {/* Layer 1: Skewed Back Panel */}
        <div
          className="absolute inset-0 rounded-xl transition-all duration-500 ease-out -z-10 opacity-70 group-hover:opacity-100 transform sm:-skew-y-2 group-hover:skew-y-0 group-hover:scale-[1.025] shadow-lg shadow-black/60 border"
          style={{
            background: accentGradient,
            borderColor: isPopular
              ? 'rgba(215, 255, 0, 0.6)'
              : isWithPT
              ? 'rgba(214, 168, 58, 0.35)'
              : 'rgba(215, 255, 0, 0.35)',
          }}
        />

        {/* Layer 2: Opposing Subtle Skew Accent Layer */}
        <div
          className="absolute inset-0 rounded-xl transition-all duration-500 ease-out -z-10 opacity-40 group-hover:opacity-80 transform sm:skew-y-2 group-hover:skew-y-0 group-hover:scale-[1.01] pointer-events-none"
          style={{
            background: secondaryGradient,
          }}
        />

        {/* Layer 3: Floating Animated Light Orb */}
        <div
          className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none blur-2xl opacity-15 group-hover:opacity-45 transition-opacity duration-700 -z-10"
          style={{
            backgroundColor: primaryAccent,
          }}
        />

        {/* FRONT CONTENT PANEL */}
        <CardBody
          className={`relative z-10 h-full flex flex-col justify-between p-6 sm:p-7 rounded-xl bg-[#1B2226]/95 backdrop-blur-md border transition-all duration-300 shadow-xl shadow-black/80 ${
            isPopular
              ? isWithPT
                ? 'border-[#D6A83A]/70 ring-1 ring-[#D6A83A]/40'
                : 'border-[#D7FF00]/70 ring-1 ring-[#D7FF00]/40'
              : 'border-[#263138] group-hover:border-[#38464f]'
          }`}
        >
          {/* Popular / Recommended Badge */}
          {badgeText && (
            <CardItem
              translateZ={45}
              className="absolute -top-3 right-4 z-40"
            >
              <div
                className={`px-3 py-0.5 rounded-full text-[10px] font-heading font-black uppercase tracking-wider shadow-md flex items-center gap-1 ${
                  isWithPT
                    ? 'bg-[#D6A83A] text-[#101417]'
                    : 'bg-[#D7FF00] text-[#101417]'
                }`}
              >
                <Star className="w-2.5 h-2.5 fill-current" />
                <span>{badgeText}</span>
              </div>
            </CardItem>
          )}

          <div>
            {/* Category Tag */}
            <CardItem translateZ={25} className="flex items-center justify-between gap-2 mb-1">
              <span
                className="text-[11px] font-mono uppercase tracking-widest block font-bold"
                style={{ color: primaryAccent }}
              >
                {categoryLabel || (isWithPT ? 'PERSONAL COACHING' : 'MEMBERSHIP')}
              </span>
            </CardItem>

            {/* Plan Duration Title */}
            <CardItem translateZ={30}>
              <CursorShadowText
                as="h3"
                className="font-heading font-black text-2xl uppercase tracking-wide text-[#F5F7F8] group-hover:text-white transition-colors"
              >
                {plan.duration}
              </CursorShadowText>
            </CardItem>

            {/* Pricing Display */}
            <CardItem translateZ={50} className="mt-5 mb-1.5 flex items-baseline gap-1.5">
              <span className="font-heading font-black text-4xl sm:text-5xl tracking-tight text-[#F5F7F8] group-hover:scale-[1.02] transition-transform origin-left">
                {plan.price}
              </span>
            </CardItem>

            {/* Period Subtitle */}
            <CardItem translateZ={20}>
              <p className="text-xs text-[#9BA3A8] font-mono mb-6">
                {plan.periodText}
              </p>
            </CardItem>

            {/* Features List (if provided) */}
            {features && features.length > 0 && (
              <CardItem translateZ={25}>
                <ul className="space-y-2.5 text-xs text-[#9BA3A8] border-t border-[#263138]/80 pt-4 mb-4">
                  {features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <Check
                        className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:scale-110"
                        style={{ color: primaryAccent }}
                      />
                      <span className="group-hover:text-[#F5F7F8] transition-colors">{feat}</span>
                    </li>
                  ))}
                </ul>
              </CardItem>
            )}
          </div>

          {/* Action Button */}
          <CardItem translateZ={35} className="mt-6 pt-4 border-t border-[#263138]/80">
            <button
              onClick={onSelect}
              className={`w-full py-3 px-4 rounded-lg text-xs font-heading font-black uppercase tracking-wider transition-all duration-200 cursor-pointer min-h-[44px] flex items-center justify-center shadow-md active:scale-95 ${
                isPopular
                  ? isWithPT
                    ? 'bg-[#D6A83A] text-[#101417] hover:bg-[#e0b548] shadow-[#D6A83A]/20'
                    : 'bg-[#D7FF00] text-[#101417] hover:bg-[#c6ec00] shadow-[#D7FF00]/20'
                  : 'bg-[#101417] hover:bg-[#D7FF00] text-[#F5F7F8] hover:text-[#101417] border border-[#2d373c] hover:border-transparent'
              }`}
            >
              <span>{ctaText || `SELECT ${plan.duration.toUpperCase()}`}</span>
            </button>
          </CardItem>
        </CardBody>
      </div>
    </CardContainer>
  );
};
