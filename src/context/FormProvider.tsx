import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { FormData } from '../types/form';

interface FormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
}

const initialFormData: FormData = {
  contact: {
    firstName: '',
    lastName: '',
    email: '',
    practiceName: '',
    address: '',
    phone: '',
    rpps: '',
    adeli: '',
    diplomaYear: undefined,
    siret: '',
    orderDepartment: '',
    schedules: '',
    eveningWeekendAvailable: undefined,
    appointmentDelay: '',
    pmrAccessible: undefined,
    pmrDetails: '',
    parking: undefined,
    doctolibUrl: '',
    instagramUrl: '',
    facebookUrl: '',
    linkedinUrl: '',
    existingWebsite: '',
  },
  siteGoals: { 
    mainGoal: '', 
    objectifAutreDetail: '' 
  },
  targetAudience: { 
    audiences: [], 
    idealPatient: '', 
    mainAction: '', 
    publicCibleAutreDetail: '',
    pageStructure: undefined,
    aboutSection: undefined,
    testimonialsSection: undefined,
    mapSection: undefined,
  },
  services: [],
  experience: { 
    degreesAndTraining: '', 
    experienceDescription: '',
    yearsOfExperience: undefined,
    certifications: '',
    associations: '',
    hasTestimonials: undefined,
    testimonials: [],
  },
  tone: { 
    toneOptions: [], 
    toneFreeText: '' 
  },
  branding: {
    hasLogo: null,
    logoUrl: '',
    primaryColor: '#00afb9',
    secondaryColor: '#fdfcdc',
    avoidColors: '',
    imageStyle: [],
    couleursPersonnalisees: [],
    hasCabinetPhotos: undefined,
    cabinetPhotosUrl: '',
    hasActionPhotos: undefined,
    actionPhotosUrl: '',
    appearInPhotos: undefined,
    videoUrl: '',
    languagePreference: 'french',
  },
  seo: {
    areas: '',
    serviceRadius: undefined,
    targetCities: '',
    outOfZonePatients: undefined,
    searchTerms: '',
    commonQuestions: '',
    mainObjections: '',
  },
  paymentMethods: [],
  paymentMethodOther: '',
  installmentPayment: undefined,
  installmentConditions: '',
  deposit: undefined,
  depositAmount: '',
  launchOffer: undefined,
  launchOfferDescription: '',
  launchOfferValidity: '',
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 8));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const goToStep = (step: number) => setCurrentStep(step);

  return (
    <FormContext.Provider
      value={{ formData, setFormData, currentStep, nextStep, prevStep, goToStep }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormState = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormState must be used within a FormProvider');
  }
  return context;
};
