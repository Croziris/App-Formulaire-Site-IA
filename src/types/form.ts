export interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  practiceName?: string;
  address: string;
  phone?: string;
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
}

export interface ExperienceData {
  degreesAndTraining: string;
  experienceDescription: string;
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
  couleursPersonnalisees: { nom: string; hex: string }[];
}

export interface SeoData {
  areas: string;
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
}
