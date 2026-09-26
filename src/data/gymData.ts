/**
 * Business information and content for The Forge Fitness.
 */
import heroImg from '../assets/images/forge_gym_hero_1790433522145.jpg';
import crossfitImg from '../assets/images/crossfit_area_1790433536005.jpeg';
import weightImg from '../assets/images/weight_training_1790433551866.jpeg';
import cyclingImg from '../assets/images/cycling_studio_1790433563250.jpeg';
import personalImg from '../assets/images/personal_coaching_1790433575612.jpeg';

export const BUSINESS_INFO = {
  name: "The Forge Fitness",
  tagline: "FORGE YOUR STRONGEST SELF.",
  subTagline: "CrossFit • Cycling • Personal Training • Weight Training",
  rating: 4.5,
  reviewCount: 14,
  phone: "81309 87020",
  phoneRaw: "+918130987020",
  hours: "Closes at 12 AM",
  hoursDetail: "Monday – Sunday • Closes at 12:00 AM (Midnight)",
  address: {
    line1: "First Floor, O-34, Block G",
    line2: "Budh Vihar Phase I, Budh Vihar",
    cityStateZip: "New Delhi, Delhi 110085",
    full: "First Floor, O-34, Block G, Budh Vihar Phase I, Budh Vihar, New Delhi, Delhi 110085",
  },
  instagram: {
    handle: "@forgefitness2019",
    url: "https://www.instagram.com/forgefitness2019/",
  },
  directionsUrl: "https://maps.app.goo.gl/FBcieRjKeVtsCYvY7",
};

export const IMAGES = {
  hero: heroImg,
  crossfit: crossfitImg,
  weightTraining: weightImg,
  cycling: cyclingImg,
  personalTraining: personalImg,
};

export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  tag: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "crossfit",
    number: "01",
    name: "CrossFit",
    shortDesc: "High-intensity functional conditioning combining metabolic conditioning, gymnastics, and barbell movements.",
    fullDesc: "Functional conditioning designed to build power, stamina, and cardiovascular resilience across high-intensity interval formats.",
    image: IMAGES.crossfit,
    tag: "Functional Conditioning",
  },
  {
    id: "weight-training",
    number: "02",
    name: "Weight Training",
    shortDesc: "Structured progressive overload resistance training focused on compound movements and hypertrophy.",
    fullDesc: "Dedicated strength work targeting foundational barbell and free-weight lifts for muscular development, bone density, and power.",
    image: IMAGES.weightTraining,
    tag: "Strength & Hypertrophy",
  },
  {
    id: "cycling",
    number: "03",
    name: "Cycling",
    shortDesc: "Intense indoor cycling sessions engineered to maximize cardiovascular endurance and stamina.",
    fullDesc: "Rhythm and resistance-driven indoor cycling structured to test cardiovascular limits and build lower-body endurance.",
    image: IMAGES.cycling,
    tag: "Cardio Endurance",
  },
  {
    id: "personal-training",
    number: "04",
    name: "Personal Training",
    shortDesc: "One-on-one coaching with customized programming tailored to your strength, mobility, and fitness goals.",
    fullDesc: "Individualized instruction focused on movement mechanics, consistent progression, and personalized training adherence.",
    image: IMAGES.personalTraining,
    tag: "1-on-1 Coaching",
  },
];

export interface PricingPlan {
  duration: string;
  price: string;
  priceNum: number;
  periodText: string;
  isPopular?: boolean;
}

export const PRICING_GENERAL: PricingPlan[] = [
  { duration: "1 Month", price: "₹800", priceNum: 800, periodText: "per month" },
  { duration: "3 Months", price: "₹2,100", priceNum: 2100, periodText: "₹700 / mo equivalent" },
  { duration: "6 Months", price: "₹3,600", priceNum: 3600, periodText: "₹600 / mo equivalent", isPopular: true },
  { duration: "12 Months", price: "₹6,000", priceNum: 6000, periodText: "₹500 / mo equivalent" },
];

export const PRICING_WITH_PT: PricingPlan[] = [
  { duration: "1 Month", price: "₹2,500", priceNum: 2500, periodText: "includes 1-on-1 PT" },
  { duration: "3 Months", price: "₹6,500", priceNum: 6500, periodText: "includes 1-on-1 PT" },
  { duration: "6 Months", price: "₹11,000", priceNum: 11000, periodText: "includes 1-on-1 PT", isPopular: true },
  { duration: "12 Months", price: "₹18,000", priceNum: 18000, periodText: "includes 1-on-1 PT" },
];
