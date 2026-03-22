export interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  practiceName?: string;
  address: string;
  phone?: string;
  
  // Informations professionnelles
  rpps?: string;
  adeli?: string;
  diplomaYear?: number;
  siret?: string;
  orderDepartment?: string;
  
  // Horaires & Accessibilité
  schedules?: string;
  eveningWeekendAvailable?: 'yes' | 'no' | 'sometimes';
  appointmentDelay?: string;
  pmrAccessible?: 'yes' | 'no' | 'partial';
  pmrDetails?: string;
  parking?: 'free' | 'paid' | 'difficult';
  
  // Présence en ligne
  doctolibUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  existingWebsite?: string;
}

export interface SiteGoalsData {
  mainGoal: string;
  objectifAutreDetail?: string;
}

export interface TargetAudienceData {
  audiences: string[];
  idealPatient: string;
  mainAction: string;
  publicCibleAutreDetail?: string;
  
  // Organisation de la page
  pageStructure?: 'one-page' | 'multi-section' | 'no-preference';
  aboutSection?: 'before' | 'after' | 'no';
  testimonialsSection?: 'yes' | 'integrated' | 'no';
  mapSection?: 'yes' | 'no';
}

export interface ServiceItem {
  id: string;
  name: string;
  type: string;
  shortDescription: string;
  target: string;
  duration?: string;
  formats?: string[];
  locations?: string[];
  price?: string;
  packages?: string;
  requiredEquipment?: string;
  contraindications?: string;
}

export interface ExperienceData {
  degreesAndTraining: string;
  experienceDescription: string;
  
  // Crédibilité
  yearsOfExperience?: number;
  certifications?: string;
  associations?: string;
  hasTestimonials?: 'yes' | 'no';
  testimonials?: Array<{ name: string; text: string }>;
}

export interface ToneData {
  toneOptions: string[];
  toneFreeText?: string;
}

export interface BrandingData {
  hasLogo: boolean | null;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  avoidColors?: string;
  imageStyle: string[];
  couleursPersonnalisees: Array<{ nom: string; hex: string }>;
  
  // Photos & Visuels
  hasCabinetPhotos?: 'yes' | 'no';
  cabinetPhotosUrl?: string;
  hasActionPhotos?: 'yes' | 'no';
  actionPhotosUrl?: string;
  appearInPhotos?: 'comfortable' | 'discreet' | 'undecided';
  videoUrl?: string;
  languagePreference?: 'french' | 'english' | 'bilingual';
}

export interface SeoData {
  areas: string;
  serviceRadius?: '10km' | '20km' | '50km' | 'plus-50km' | 'no-travel';
  targetCities?: string;
  outOfZonePatients?: 'yes' | 'no' | 'conditional';
  outOfZoneConditions?: string;
  searchTerms: string;
  commonQuestions: string;
  mainObjections: string;
}

export interface FormData {
  contact: ContactData;
  siteGoals: SiteGoalsData;
  targetAudience: TargetAudienceData;
  services: ServiceItem[];
  experience: ExperienceData;
  tone: ToneData;
  branding: BrandingData;
  seo: SeoData;
  
  // Modalités de paiement (globales)
  paymentMethods?: string[];
  paymentMethodOther?: string;
  installmentPayment?: 'yes' | 'no';
  installmentConditions?: string;
  deposit?: 'yes' | 'no';
  depositAmount?: string;
  launchOffer?: 'yes' | 'no';
  launchOfferDescription?: string;
  launchOfferValidity?: string;
}
