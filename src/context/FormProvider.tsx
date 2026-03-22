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
  },
  siteGoals: { mainGoal: '' },
  targetAudience: { audiences: [], idealPatient: '', mainAction: '' },
  services: [],
  experience: { degreesAndTraining: '', experienceDescription: '' },
  tone: { toneOptions: [], toneFreeText: '' },
  branding: {
    hasLogo: null,
    logoUrl: '',
    primaryColor: '#00afb9',
    secondaryColor: '#fdfcdc',
    avoidColors: '',
    imageStyle: [],
  },
  seo: {
    areas: '',
    searchTerms: '',
    commonQuestions: '',
    mainObjections: '',
  },
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
