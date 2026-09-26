import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { IMAGES, BUSINESS_INFO } from '../data/gymData';
import { PageId } from '../components/Navbar';

interface TheForgePageProps {
  onNavigate: (page: PageId) => void;
  onOpenJoin: (interest?: string) => void;
}

export const TheForgePage: React.FC<TheForgePageProps> = ({ onNavigate, onOpenJoin }) => {
  return (
    <div className="min-h-screen bg-[#101417] text-[#F5F7F8] pt-20 sm:pt-24 landscape:pt-14 pb-20 landscape:pb-8">
      {/* Hero Header */}
      <section className="border-b border-[#1B2226] bg-[#141A1E]/60 py-10 sm:py-20 landscape:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <span className="text-xs font-mono tracking-widest text-[#D7FF00] uppercase">
            FACILITY & CULTURE
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-6xl lg:text-7xl landscape:text-2xl uppercase tracking-tight text-[#F5F7F8] mt-2 mb-3">
            THIS IS THE FORGE.
          </h1>
          <p className="text-xs sm:text-base text-[#9BA3A8] max-w-2xl mx-auto leading-relaxed px-2">
            A purposeful, raw training environment designed for focused movement, progressive resistance, and daily discipline.
          </p>
        </div>
      </section>

      {/* Main Sections */}
      <section className="py-10 sm:py-16 landscape:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-24 landscape:space-y-12">
        {/* SECTION 1: THE SPACE */}
        <div>
          <div className="border-b border-[#1B2226] pb-4 mb-8">
            <span className="text-xs font-mono text-[#D7FF00] uppercase tracking-wider">
              FACILITY OVERVIEW
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#F5F7F8] mt-1">
              THE SPACE
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 overflow-hidden bg-[#1B2226] border border-[#263138]">
              <img
                src={IMAGES.hero}
                alt="The Space at The Forge Fitness"
                className="w-full aspect-[16/10] object-cover filter grayscale-[20%] contrast-110"
              />
            </div>
            <div className="lg:col-span-5 space-y-4">
              <h3 className="font-heading font-bold text-2xl uppercase text-[#F5F7F8]">
                Built for Uninterrupted Movement
              </h3>
              <p className="text-sm text-[#9BA3A8] leading-relaxed">
                Located on the first floor in Budh Vihar Phase I, the layout is arranged to support focused training flow. High-density rubber flooring cushions heavy loads while open movement zones accommodate both barbell lifts and conditioning intervals.
              </p>
              <div className="pt-4 border-t border-[#1B2226] flex items-center gap-6 text-xs text-[#9BA3A8] font-mono">
                <div>
                  <span className="text-white font-bold block text-sm">First Floor</span>
                  <span>Budh Vihar Phase I</span>
                </div>
                <div className="w-px h-8 bg-[#263138]" />
                <div>
                  <span className="text-[#D7FF00] font-bold block text-sm">Open Until 12 AM</span>
                  <span>Night Training Hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Spatial photo gallery strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="bg-[#1B2226] border border-[#263138] overflow-hidden">
              <img
                src={IMAGES.crossfit}
                alt="Functional Rig Area"
                className="w-full aspect-video object-cover filter grayscale-[15%]"
              />
              <div className="p-3 text-xs font-mono text-[#9BA3A8]">
                Functional & Conditioning Zone
              </div>
            </div>
            <div className="bg-[#1B2226] border border-[#263138] overflow-hidden">
              <img
                src={IMAGES.weightTraining}
                alt="Free Weight Section"
                className="w-full aspect-video object-cover filter grayscale-[15%]"
              />
              <div className="p-3 text-xs font-mono text-[#9BA3A8]">
                Free-Weight & Barbell Station
              </div>
            </div>
            <div className="bg-[#1B2226] border border-[#263138] overflow-hidden">
              <img
                src={IMAGES.cycling}
                alt="Cycling Zone"
                className="w-full aspect-video object-cover filter grayscale-[15%]"
              />
              <div className="p-3 text-xs font-mono text-[#9BA3A8]">
                Cardiovascular Cycling Zone
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: THE EQUIPMENT */}
        <div className="border-t border-[#1B2226] pt-16">
          <div className="border-b border-[#1B2226] pb-4 mb-8">
            <span className="text-xs font-mono text-[#D7FF00] uppercase tracking-wider">
              APPARATUS & GEAR
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#F5F7F8] mt-1">
              THE EQUIPMENT
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-[#1B2226] border border-[#263138] space-y-4">
              <span className="text-xs font-mono text-[#D7FF00] uppercase">
                DISCIPLINE 01
              </span>
              <h3 className="font-heading font-black text-2xl uppercase text-[#F5F7F8]">
                Weight Training
              </h3>
              <p className="text-sm text-[#9BA3A8] leading-relaxed">
                Dedicated free weights, barbell setups, racks, and plates engineered for classic strength progressions, progressive overload, and resistance work.
              </p>
            </div>

            <div className="p-8 bg-[#1B2226] border border-[#263138] space-y-4">
              <span className="text-xs font-mono text-[#D7FF00] uppercase">
                DISCIPLINE 02
              </span>
              <h3 className="font-heading font-black text-2xl uppercase text-[#F5F7F8]">
                Functional Training
              </h3>
              <p className="text-sm text-[#9BA3A8] leading-relaxed">
                Apparatus configured for functional training, bodyweight resistance, dynamic agility, and high-cadence metabolic conditioning circuits.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: THE ATMOSPHERE */}
        <div className="border-t border-[#1B2226] pt-16">
          <div className="border-b border-[#1B2226] pb-4 mb-8">
            <span className="text-xs font-mono text-[#D7FF00] uppercase tracking-wider">
              VISUAL ENVIRONMENT
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#F5F7F8] mt-1">
              THE ATMOSPHERE
            </h2>
          </div>

          <div className="bg-[#141A1E] border border-[#263138] p-8 sm:p-12">
            <div className="max-w-3xl space-y-4">
              <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase text-[#F5F7F8]">
                Moody Steel, Raw Textures, Zero Distractions
              </h3>
              <p className="text-sm sm:text-base text-[#9BA3A8] leading-relaxed">
                The visual atmosphere is defined by deep charcoal finishes, industrial steel framing, and directional overhead illumination. Rather than loud neon novelties, the setting maintains an intentional, calm, and gritty aesthetic where your focus stays entirely locked on the training task in front of you.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4: THE MINDSET */}
        <div className="border-t border-[#1B2226] pt-16">
          <div className="border-b border-[#1B2226] pb-4 mb-8">
            <span className="text-xs font-mono text-[#D7FF00] uppercase tracking-wider">
              THE CORE CREED
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#F5F7F8] mt-1">
              THE MINDSET
            </h2>
          </div>

          <div className="bg-[#1B2226] border-2 border-[#2d373c] p-6 sm:p-16 text-center relative overflow-hidden">
            {/* Subtle background graphic */}
            <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center font-heading font-black text-9xl text-white select-none">
              FORGE
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="text-xs font-mono text-[#D7FF00] uppercase tracking-widest">
                THE FORGE CODE
              </span>

              <blockquote className="font-heading font-black text-2xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#F5F7F8] leading-tight">
                SHOW UP. PUT IN THE WORK. GET STRONGER.
              </blockquote>

              <p className="text-xs sm:text-sm text-[#9BA3A8] max-w-xl mx-auto px-2">
                No gimmicks or shortcuts. Just honest effort, steady attendance, and continuous physical progression.
              </p>

              <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
                <button
                  onClick={() => onOpenJoin('The Forge Mindset')}
                  className="w-full sm:w-auto bg-[#D7FF00] text-[#101417] px-8 py-3.5 min-h-[46px] text-xs font-heading font-black uppercase tracking-wider hover:bg-[#c6ec00] transition-colors cursor-pointer flex items-center justify-center"
                >
                  JOIN THE FORGE
                </button>
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="w-full sm:w-auto bg-[#101417] border border-[#2d373c] text-[#F5F7F8] px-8 py-3.5 min-h-[46px] text-xs font-heading font-bold uppercase tracking-wider hover:border-[#D7FF00] transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D7FF00]" />
                  <span>Call {BUSINESS_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
