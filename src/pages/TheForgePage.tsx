import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { IMAGES, BUSINESS_INFO } from '../data/gymData';
import { PageId } from '../components/Navbar';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { CardFan } from '../components/ui/CardFan';
import { CardContainer, CardBody, CardItem } from '../components/ui/ThreeDCard';
import { CascadeText } from '../components/ui/CascadeText';

interface TheForgePageProps {
  onNavigate: (page: PageId) => void;
  onOpenJoin: (interest?: string) => void;
}

export const TheForgePage: React.FC<TheForgePageProps> = ({ onNavigate, onOpenJoin }) => {
  return (
    <div className="min-h-screen bg-[#101417] text-[#F5F7F8] pb-20">
      {/* Cinematic Hero Header */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden border-b border-[#1B2226]">
        {/* Background Gym Image with dark industrial gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.weightTraining}
            alt="The Forge Facility"
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
            FACILITY & CULTURE
          </span>
          <CascadeText
            as="h1"
            className="hero-item font-heading font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-[#F5F7F8] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] mt-2 mb-4"
          >
            THIS IS{' '}
            <span className="text-[#D7FF00] drop-shadow-[0_0_35px_rgba(215,255,0,0.3)]">
              THE FORGE.
            </span>
          </CascadeText>
          <p className="hero-item text-sm sm:text-lg text-[#9BA3A8] max-w-2xl mx-auto leading-relaxed px-2 font-medium">
            A purposeful, raw training environment designed for focused movement, progressive resistance, and daily discipline.
          </p>
        </ScrollReveal>
      </section>

      {/* Main Sections */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* SECTION 1: THE SPACE */}
        <div>
          <ScrollReveal animation="heading" itemSelector=".reveal-item" className="border-b border-[#1B2226] pb-4 mb-8">
            <span className="reveal-item text-xs font-mono text-[#D7FF00] uppercase tracking-wider">
              FACILITY OVERVIEW
            </span>
            <CascadeText
              as="h2"
              className="reveal-item font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#F5F7F8] mt-1"
              text="THE SPACE"
            />
          </ScrollReveal>

          <ScrollReveal animation="fade-up">
            <CardContainer maxTilt={6} className="w-full">
              <CardBody className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#141A1E] border border-[#263138] p-6 sm:p-8 rounded-2xl shadow-xl">
                <CardItem translateZ={25} className="lg:col-span-7 overflow-hidden bg-[#1B2226] border border-[#263138] rounded-xl">
                  <img
                    src={IMAGES.hero}
                    alt="The Space at The Forge Fitness"
                    className="w-full aspect-[16/10] object-cover filter grayscale-[20%] contrast-110"
                  />
                </CardItem>
                <div className="lg:col-span-5 space-y-4">
                  <CardItem translateZ={30}>
                    <CascadeText
                      as="h3"
                      className="font-heading font-bold text-2xl uppercase text-[#F5F7F8]"
                      text="Built for Uninterrupted Movement"
                    />
                  </CardItem>
                  <CardItem translateZ={15}>
                    <p className="text-sm text-[#9BA3A8] leading-relaxed">
                      Located on the first floor in Budh Vihar Phase I, the layout is arranged to support focused training flow. High-density rubber flooring cushions heavy loads while open movement zones accommodate both barbell lifts and conditioning intervals.
                    </p>
                  </CardItem>
                  <CardItem translateZ={20} className="pt-4 border-t border-[#1B2226] flex items-center gap-6 text-xs text-[#9BA3A8] font-mono">
                    <div>
                      <span className="text-white font-bold block text-sm">First Floor</span>
                      <span>Budh Vihar Phase I</span>
                    </div>
                    <div className="w-px h-8 bg-[#263138]" />
                    <div>
                      <span className="text-[#D7FF00] font-bold block text-sm">Open Until 12 AM</span>
                      <span>Night Training Hours</span>
                    </div>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </ScrollReveal>

          {/* Spatial photo gallery strip — Card Fan Animation (All 4 facility cards preserved) */}
          <CardFan className="mt-8">
            <CardContainer maxTilt={8} containerClassName="h-full" className="h-full">
              <CardBody className="gallery-item bg-[#1B2226] border border-[#263138] overflow-hidden flex flex-col h-full rounded-xl">
                <CardItem translateZ={20} className="w-full">
                  <img
                    src={IMAGES.crossfit}
                    alt="Functional Rig Area"
                    className="w-full aspect-video object-cover filter grayscale-[15%]"
                  />
                </CardItem>
                <CardItem translateZ={15} className="p-3 text-xs font-mono text-[#9BA3A8]">
                  Functional & Conditioning Zone
                </CardItem>
              </CardBody>
            </CardContainer>

            <CardContainer maxTilt={8} containerClassName="h-full" className="h-full">
              <CardBody className="gallery-item bg-[#1B2226] border border-[#263138] overflow-hidden flex flex-col h-full rounded-xl">
                <CardItem translateZ={20} className="w-full">
                  <img
                    src={IMAGES.weightTraining}
                    alt="Free Weight Section"
                    className="w-full aspect-video object-cover filter grayscale-[15%]"
                  />
                </CardItem>
                <CardItem translateZ={15} className="p-3 text-xs font-mono text-[#9BA3A8]">
                  Free-Weight & Barbell Station
                </CardItem>
              </CardBody>
            </CardContainer>

            <CardContainer maxTilt={8} containerClassName="h-full" className="h-full">
              <CardBody className="gallery-item bg-[#1B2226] border border-[#263138] overflow-hidden flex flex-col h-full rounded-xl">
                <CardItem translateZ={20} className="w-full">
                  <img
                    src={IMAGES.cycling}
                    alt="Cycling Zone"
                    className="w-full aspect-video object-cover filter grayscale-[15%]"
                  />
                </CardItem>
                <CardItem translateZ={15} className="p-3 text-xs font-mono text-[#9BA3A8]">
                  Cardiovascular Cycling Zone
                </CardItem>
              </CardBody>
            </CardContainer>

            <CardContainer maxTilt={8} containerClassName="h-full" className="h-full">
              <CardBody className="gallery-item bg-[#1B2226] border border-[#263138] overflow-hidden flex flex-col h-full rounded-xl">
                <CardItem translateZ={20} className="w-full">
                  <img
                    src={IMAGES.personalTraining}
                    alt="Personal Coaching Pods"
                    className="w-full aspect-video object-cover filter grayscale-[15%]"
                  />
                </CardItem>
                <CardItem translateZ={15} className="p-3 text-xs font-mono text-[#9BA3A8]">
                  Personal Coaching & Assessment Pods
                </CardItem>
              </CardBody>
            </CardContainer>
          </CardFan>
        </div>

        {/* SECTION 2: THE EQUIPMENT */}
        <div className="border-t border-[#1B2226] pt-16">
          <ScrollReveal animation="heading" itemSelector=".reveal-item" className="border-b border-[#1B2226] pb-4 mb-8">
            <span className="reveal-item text-xs font-mono text-[#D7FF00] uppercase tracking-wider">
              APPARATUS & GEAR
            </span>
            <CascadeText
              as="h2"
              className="reveal-item font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#F5F7F8] mt-1"
              text="THE EQUIPMENT"
            />
          </ScrollReveal>

          <CardFan gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CardContainer maxTilt={8} containerClassName="h-full" className="h-full">
              <CardBody className="equip-item p-6 sm:p-8 bg-[#1B2226] border border-[#263138] space-y-4 h-full flex flex-col justify-between rounded-xl">
                <div>
                  <CardItem translateZ={20}>
                    <span className="text-xs font-mono text-[#D7FF00] uppercase block mb-1">
                      DISCIPLINE 01
                    </span>
                    <CascadeText
                      as="h3"
                      className="font-heading font-black text-xl sm:text-2xl uppercase text-[#F5F7F8]"
                      text="Weight Training"
                    />
                  </CardItem>
                  <CardItem translateZ={15}>
                    <p className="text-xs sm:text-sm text-[#9BA3A8] leading-relaxed mt-2">
                      Dedicated free weights, barbell setups, racks, and plates engineered for classic strength progressions, progressive overload, and resistance work.
                    </p>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>

            <CardContainer maxTilt={8} containerClassName="h-full" className="h-full">
              <CardBody className="equip-item p-6 sm:p-8 bg-[#1B2226] border border-[#263138] space-y-4 h-full flex flex-col justify-between rounded-xl">
                <div>
                  <CardItem translateZ={20}>
                    <span className="text-xs font-mono text-[#D7FF00] uppercase block mb-1">
                      DISCIPLINE 02
                    </span>
                    <CascadeText
                      as="h3"
                      className="font-heading font-black text-xl sm:text-2xl uppercase text-[#F5F7F8]"
                      text="CrossFit Zone"
                    />
                  </CardItem>
                  <CardItem translateZ={15}>
                    <p className="text-xs sm:text-sm text-[#9BA3A8] leading-relaxed mt-2">
                      Rig frameworks, pull-up stations, kettlebells, and functional equipment designed for metabolic conditioning and high-power interval protocols.
                    </p>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>

            <CardContainer maxTilt={8} containerClassName="h-full" className="h-full">
              <CardBody className="equip-item p-6 sm:p-8 bg-[#1B2226] border border-[#263138] space-y-4 h-full flex flex-col justify-between rounded-xl">
                <div>
                  <CardItem translateZ={20}>
                    <span className="text-xs font-mono text-[#D7FF00] uppercase block mb-1">
                      DISCIPLINE 03
                    </span>
                    <CascadeText
                      as="h3"
                      className="font-heading font-black text-xl sm:text-2xl uppercase text-[#F5F7F8]"
                      text="Cycling Arena"
                    />
                  </CardItem>
                  <CardItem translateZ={15}>
                    <p className="text-xs sm:text-sm text-[#9BA3A8] leading-relaxed mt-2">
                      Ergonomic indoor training bikes arranged for high-cadence endurance intervals, stamina building, and zero-impact cardiovascular work.
                    </p>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>

            <CardContainer maxTilt={8} containerClassName="h-full" className="h-full">
              <CardBody className="equip-item p-6 sm:p-8 bg-[#1B2226] border border-[#263138] space-y-4 h-full flex flex-col justify-between rounded-xl">
                <div>
                  <CardItem translateZ={20}>
                    <span className="text-xs font-mono text-[#D7FF00] uppercase block mb-1">
                      DISCIPLINE 04
                    </span>
                    <CascadeText
                      as="h3"
                      className="font-heading font-black text-xl sm:text-2xl uppercase text-[#F5F7F8]"
                      text="Personal Coaching Pods"
                    />
                  </CardItem>
                  <CardItem translateZ={15}>
                    <p className="text-xs sm:text-sm text-[#9BA3A8] leading-relaxed mt-2">
                      Dedicated floor spaces designated for form correction, customized technique training, and 1-on-1 instruction without distraction.
                    </p>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </CardFan>
        </div>

        {/* SECTION 3: THE MINDSET */}
        <div className="border-t border-[#1B2226] pt-16">
          <ScrollReveal animation="heading" itemSelector=".reveal-item" className="border-b border-[#1B2226] pb-4 mb-8">
            <span className="reveal-item text-xs font-mono text-[#D7FF00] uppercase tracking-wider">
              PHILOSOPHY
            </span>
            <CascadeText
              as="h2"
              className="reveal-item font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#F5F7F8] mt-1"
              text="THE MINDSET"
            />
          </ScrollReveal>

          <ScrollReveal animation="fade-up">
            <CardContainer maxTilt={7} className="w-full">
              <CardBody className="bg-[#1B2226] border-2 border-[#2d373c] p-6 sm:p-16 text-center relative overflow-hidden rounded-2xl shadow-2xl">
                {/* Subtle background graphic */}
                <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center font-heading font-black text-9xl text-white select-none">
                  FORGE
                </div>

                <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                  <CardItem translateZ={25}>
                    <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#D7FF00]">
                      THE FORGE CODE
                    </span>
                  </CardItem>

                  <CardItem translateZ={45}>
                    <blockquote className="font-heading font-black text-2xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#F5F7F8] leading-tight">
                      <CascadeText text="SHOW UP. PUT IN THE WORK. GET STRONGER." />
                    </blockquote>
                  </CardItem>

                  <CardItem translateZ={25}>
                    <p className="text-xs sm:text-sm text-[#9BA3A8] max-w-xl mx-auto px-2">
                      No gimmicks or shortcuts. Just honest effort, steady attendance, and continuous physical progression.
                    </p>
                  </CardItem>

                  <CardItem translateZ={35} className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
                    <button
                      onClick={() => onOpenJoin('The Forge Mindset')}
                      className="w-full sm:w-auto bg-[#D7FF00] text-[#101417] px-8 py-3.5 min-h-[46px] text-xs font-heading font-black uppercase tracking-wider hover:bg-[#c6ec00] transition-colors cursor-pointer flex items-center justify-center shadow-md active:scale-95 rounded-lg"
                    >
                      JOIN THE FORGE
                    </button>
                    <a
                      href={`tel:${BUSINESS_INFO.phoneRaw}`}
                      className="w-full sm:w-auto bg-[#101417] border border-[#2d373c] text-[#F5F7F8] px-8 py-3.5 min-h-[46px] text-xs font-heading font-bold uppercase tracking-wider hover:border-[#D7FF00] transition-colors flex items-center justify-center gap-2 active:scale-95 rounded-lg"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#D7FF00]" />
                      <span>Call {BUSINESS_INFO.phone}</span>
                    </a>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
