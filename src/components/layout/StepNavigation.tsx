import React from 'react';
import { useFormState } from '../../context/FormProvider';

interface StepNavigationProps {
  onNext?: () => void;
  isNextDisabled?: boolean;
  isSubmitting?: boolean;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({ 
  onNext, 
  isNextDisabled = false,
  isSubmitting = false
}) => {
  const { currentStep, prevStep, nextStep } = useFormState();
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === 8;

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      nextStep();
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
      <button 
        type="button" 
        className="btn btn-secondary" 
        onClick={prevStep} 
        disabled={isFirstStep || isSubmitting}
        style={{ visibility: isFirstStep ? 'hidden' : 'visible' }}
      >
        Précedent
      </button>
      
      <button 
        type="button" 
        className="btn btn-primary" 
        onClick={handleNext} 
        disabled={isNextDisabled || isSubmitting}
      >
        {isSubmitting ? 'Envoi en cours...' : (isLastStep ? 'Envoyer mon brief' : 'Suivant')}
      </button>
    </div>
  );
};

export default StepNavigation;
