import React, { useState, useEffect } from 'react';
import { ArrowRight, Phone, X, Clock, Users, Zap, CheckCircle2, BookOpen } from 'lucide-react';
import { BUSINESS_INFO, IMAGES, SERVICES, ServiceItem } from '../data/gymData';
import { PageId } from '../components/Navbar';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { CardFan } from '../components/ui/CardFan';
import { CardContainer, CardBody, CardItem } from '../components/ui/ThreeDCard';
import { CascadeText } from '../components/ui/CascadeText';

interface TrainingPageProps {
  onNavigate: (page: PageId) => void;
  onOpenJoin: (interest?: string) => void;
}

interface DisciplineDetails {
  duration: string;
  ratio: string;
  intensity: string;
  schedule: string[];
  pillars: string[];
  equipment: string[];
}

const DISCIPLINE_EXTRAS: Record<string, DisciplineDetails> = {
  crossfit: {
    duration: '60 Minutes',
    ratio: '1:12 Coach to Athlete',
    intensity: 'High Intensity (Rx & Scaled)',
    schedule: ['Mon–Sat: 06:00 AM', 'Mon–Fri: 05:30 PM', 'Mon–Fri: 07:00 PM'],
    pillars: [
      'Olympic weightlifting technique (Clean & Jerk, Snatch)',
      'High-cadence metabolic conditioning (MetCon)',
      'Gymnastic fundamentals (Bar muscle-ups, handstand push-ups)',
      'Structured mobility warm-ups & recovery protocols',
    ],
    equipment: ['Eleiko Olympic Barbells', 'Concept2 Rowers & SkiErgs', 'Rogue Rig & Gymnastic Rings', 'Bumper Plates & Kettlebells'],
  },
  'weight-training': {
    duration: '45–75 Minutes',
    ratio: 'Open Floor + Floor Coaches',
    intensity: 'Progressive Overload',
    schedule: ['Daily: 06:00 AM – 10:00 PM (Unrestricted Floor Access)'],
    pillars: [
      'Compound strength foundation (Squat, Bench, Deadlift, Overhead Press)',
      'Hypertrophy periodization for lean muscle retention',
      'Unilateral stability and corrective accessory volume',
      'Form evaluation and auto-regulation mechanics',
    ],
    equipment: ['Heavy-duty Power Cages', 'Calibrated Cast Iron Plates', 'Dumbbells up to 50kg', 'Dual Adjustable Cable Stations'],
  },
  cycling: {
    duration: '45 Minutes',
    ratio: '1:18 Master Instructor',
    intensity: 'Cardiovascular Endurance',
    schedule: ['Tue / Thu / Sat: 06:30 AM', 'Mon / Wed / Fri: 06:00 PM'],
    pillars: [
      'High-RPM cadence drills for aerobic capacity',
      'Steep torque hill climbs simulating outdoor terrain',
      'Target heart-rate zone training & lactate clearance',
      'Post-ride hamstring and hip-flexor release series',
    ],
    equipment: ['Commercial Magnetic Flywheel Cycles', 'Real-time Cadence & Wattage Monitors', 'Surround Sound Audio System'],
  },
  'personal-training': {
    duration: '60 Minutes',
    ratio: '1-on-1 Dedicated',
    intensity: 'Bespoke / Goal-Specific',
    schedule: ['Custom scheduling: 06:00 AM – 09:30 PM (By Appointment)'],
    pillars: [
      'Comprehensive biomechanical movement assessment',
      'Custom macro-cycle programming aligned with personal timelines',
      'Hands-on form cues, tempo control, and safe progression',
      'Nutritional guidance and regular body composition tracking',
    ],
    equipment: ['Dedicated Private Coaching Bay', 'InBody Composition Analyzer', 'Full Forge Equipment Library'],
  },
};

export const TrainingPage: React.FC<TrainingPageProps> = ({ onNavigate, onOpenJoin }) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<ServiceItem | null>(null);

  useEffect(() => {
    if (selectedDiscipline) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedDiscipline(null);
      };
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedDiscipline]);

  const selectedExtras = selectedDiscipline ? DISCIPLINE_EXTRAS[selectedDiscipline.id] : null;

  return (
    <div className="min-h-screen bg-[#101417] text-[#F5F7F8] pb-20">
      {/* Cinematic Hero Header */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden border-b border-[#1B2226]">
        {/* Background Gym Image with dark industrial gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.crossfit}
            alt="The Forge Training Floor"
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
            THE FORGE DISCIPLINES
          </span>
          <CascadeText
            as="h1"
            className="hero-item font-heading font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-[#F5F7F8] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] mt-2 mb-4"
          >
            TRAIN WITH{' '}
            <span className="text-[#D7FF00] drop-shadow-[0_0_35px_rgba(215,255,0,0.3)]">
              PURPOSE.
            </span>
          </CascadeText>
          <p className="hero-item text-sm sm:text-lg text-[#9BA3A8] max-w-2xl mx-auto leading-relaxed px-2 font-medium">
            Four core disciplines structured for physical conditioning, strength progression, and endurance. Built for those who value consistency over comfort.
          </p>
        </ScrollReveal>
      </section>

      {/* Card Fan Carousel of the 4 Disciplines */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="heading" itemSelector=".reveal-item" className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="reveal-item text-xs font-mono tracking-widest text-[#D7FF00] uppercase">
            AT A GLANCE
          </span>
          <CascadeText
            as="h2"
            className="reveal-item font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight text-[#F5F7F8] mt-1"
            text="CORE DISCIPLINES"
          />
          <p className="reveal-item text-xs sm:text-sm text-[#9BA3A8] mt-2">
            Explore syllabus, schedule, and coaching structure for each discipline.
          </p>
        </ScrollReveal>

        <CardFan>
          {SERVICES.map((service) => {
            const extras = DISCIPLINE_EXTRAS[service.id];
            return (
              <CardContainer key={service.id} maxTilt={8} containerClassName="h-full" className="h-full">
                <CardBody className="group bg-[#1B2226] border border-[#263138] hover:border-[#38464f] transition-all duration-200 flex flex-col h-full rounded-xl overflow-hidden shadow-xl">
                  <CardItem translateZ={25} className="relative aspect-[4/3] overflow-hidden bg-black shrink-0">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover filter grayscale-[25%] group-hover:scale-105 group-hover:grayscale-0 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#101417]/90 px-2.5 py-1 text-[11px] font-mono font-semibold text-[#D7FF00] border border-white/10 rounded">
                      {service.number}
                    </div>
                  </CardItem>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <CardItem translateZ={25}>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#D7FF00] block mb-1">
                          {service.tag}
                        </span>
                        <CascadeText
                          as="h3"
                          cascadeOnParentHover={true}
                          className="font-heading font-bold text-xl uppercase tracking-wide text-[#F5F7F8] group-hover:text-[#D7FF00] transition-colors"
                          text={service.name}
                        />
                      </CardItem>
                      <CardItem translateZ={15}>
                        <p className="mt-2 text-xs leading-relaxed text-[#9BA3A8]">
                          {service.shortDesc}
                        </p>
                      </CardItem>

                      {extras && (
                        <CardItem translateZ={20} className="mt-3.5 pt-3 border-t border-[#263138]/60 flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-[#141A1E] text-[#9BA3A8] border border-[#263138] rounded">
                            {extras.duration}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-[#141A1E] text-[#9BA3A8] border border-[#263138] rounded">
                            {extras.ratio}
                          </span>
                        </CardItem>
                      )}
                    </div>

                    <CardItem translateZ={25} className="mt-5 pt-4 border-t border-[#263138] flex items-center justify-between gap-2.5">
                      <button
                        onClick={() => setSelectedDiscipline(service)}
                        className="text-xs font-mono text-[#9BA3A8] hover:text-[#F5F7F8] transition-colors flex items-center gap-1.5 cursor-pointer py-1"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#D7FF00]" />
                        <span>Syllabus</span>
                      </button>

                      <button
                        onClick={() => onOpenJoin(service.name)}
                        className="bg-[#D7FF00] text-[#101417] px-3.5 py-1.5 text-[11px] font-heading font-black uppercase tracking-wider hover:bg-[#c6ec00] transition-colors rounded cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
                      >
                        <span>Inquire</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            );
          })}
        </CardFan>
      </section>

      {/* Interactive Discipline Syllabus & Schedule Modal */}
      {selectedDiscipline && selectedExtras && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedDiscipline(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#141A1E] border border-[#263138] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative aspect-[16/7] overflow-hidden bg-black shrink-0">
              <img
                src={selectedDiscipline.image}
                alt={selectedDiscipline.name}
                className="w-full h-full object-cover filter brightness-75 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141A1E] via-[#141A1E]/60 to-transparent" />

              <button
                onClick={() => setSelectedDiscipline(null)}
                className="absolute top-4 right-4 p-2 bg-[#101417]/80 hover:bg-[#101417] text-[#9BA3A8] hover:text-white rounded-full transition-colors border border-white/10 cursor-pointer"
                aria-label="Close syllabus"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#D7FF00] uppercase tracking-wider mb-1">
                    <span>{selectedDiscipline.number}</span>
                    <span>—</span>
                    <span>{selectedDiscipline.tag}</span>
                  </div>
                  <CascadeText
                    as="h2"
                    className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#F5F7F8]"
                    text={selectedDiscipline.name}
                  />
                </div>
              </div>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <p className="text-xs sm:text-sm text-[#9BA3A8] leading-relaxed">
                  {selectedDiscipline.fullDesc}
                </p>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-[#1B2226] border border-[#263138] rounded-lg">
                  <div className="flex items-center gap-2 text-xs text-[#9BA3A8] mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#D7FF00]" />
                    <span className="font-mono text-[11px] uppercase">Duration</span>
                  </div>
                  <span className="font-heading font-bold text-sm text-[#F5F7F8]">
                    {selectedExtras.duration}
                  </span>
                </div>

                <div className="p-3 bg-[#1B2226] border border-[#263138] rounded-lg">
                  <div className="flex items-center gap-2 text-xs text-[#9BA3A8] mb-1">
                    <Users className="w-3.5 h-3.5 text-[#D7FF00]" />
                    <span className="font-mono text-[11px] uppercase">Coaching Ratio</span>
                  </div>
                  <span className="font-heading font-bold text-sm text-[#F5F7F8]">
                    {selectedExtras.ratio}
                  </span>
                </div>

                <div className="p-3 bg-[#1B2226] border border-[#263138] rounded-lg">
                  <div className="flex items-center gap-2 text-xs text-[#9BA3A8] mb-1">
                    <Zap className="w-3.5 h-3.5 text-[#D7FF00]" />
                    <span className="font-mono text-[11px] uppercase">Intensity</span>
                  </div>
                  <span className="font-heading font-bold text-sm text-[#F5F7F8]">
                    {selectedExtras.intensity}
                  </span>
                </div>
              </div>

              {/* Syllabus Pillars */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#D7FF00] mb-3">
                  SYLLABUS & PROGRESSION
                </h4>
                <div className="space-y-2.5">
                  {selectedExtras.pillars.map((pillar, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#F5F7F8]/90">
                      <CheckCircle2 className="w-4 h-4 text-[#D7FF00] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{pillar}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#D7FF00] mb-3">
                  TIMINGS & SLOTS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExtras.schedule.map((slot, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 bg-[#1B2226] border border-[#263138] rounded text-xs font-mono text-[#9BA3A8]"
                    >
                      {slot}
                    </div>
                  ))}
                </div>
              </div>

              {/* Apparatus / Equipment */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#D7FF00] mb-3">
                  EQUIPMENT USED
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExtras.equipment.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono px-2.5 py-1 bg-[#101417] text-[#9BA3A8] border border-[#263138] rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer CTAs */}
            <div className="p-4 sm:p-6 bg-[#101417] border-t border-[#263138] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="bg-[#1B2226] border border-[#2d373c] text-[#F5F7F8] px-4 py-2.5 text-xs font-heading font-bold uppercase tracking-wider hover:border-[#D7FF00] transition-colors flex items-center justify-center gap-2 rounded-lg"
              >
                <Phone className="w-3.5 h-3.5 text-[#D7FF00]" />
                <span>Call ({BUSINESS_INFO.phone})</span>
              </a>

              <button
                onClick={() => {
                  const disciplineName = selectedDiscipline.name;
                  setSelectedDiscipline(null);
                  onOpenJoin(disciplineName);
                }}
                className="bg-[#D7FF00] text-[#101417] px-6 py-2.5 text-xs font-heading font-black uppercase tracking-wider hover:bg-[#c6ec00] transition-colors cursor-pointer flex items-center justify-center gap-2 rounded-lg shadow-md"
              >
                <span>JOIN {selectedDiscipline.name.toUpperCase()}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Commitment Banner */}
      <section className="py-8 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up" className="max-w-4xl mx-auto">
          <CardContainer maxTilt={7} className="w-full">
            <CardBody className="p-8 sm:p-12 bg-[#141A1E] border border-[#263138] text-center rounded-2xl shadow-xl">
              <CardItem translateZ={25}>
                <span className="text-xs font-mono text-[#D7FF00] uppercase tracking-widest">
                  READY TO COMMIT?
                </span>
              </CardItem>
              <CardItem translateZ={40}>
                <h3 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight text-[#F5F7F8] mt-2 mb-3">
                  SEE OUR MEMBERSHIP PLANS
                </h3>
              </CardItem>
              <CardItem translateZ={20}>
                <p className="text-xs sm:text-sm text-[#9BA3A8] max-w-xl mx-auto mb-6">
                  Transparent pricing starting at ₹800/month for open facility access.
                </p>
              </CardItem>
              <CardItem translateZ={35}>
                <button
                  onClick={() => {
                    onNavigate('membership');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-[#D7FF00] text-[#101417] px-8 py-3.5 text-xs font-heading font-black uppercase tracking-wider hover:bg-[#c6ec00] transition-colors inline-flex items-center gap-2 cursor-pointer rounded-lg shadow-md active:scale-95"
                >
                  <span>EXPLORE MEMBERSHIP TIERS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </CardItem>
            </CardBody>
          </CardContainer>
        </ScrollReveal>
      </section>
    </div>
  );
};
