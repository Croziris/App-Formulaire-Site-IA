import React from 'react';
import { useFormState } from '../../context/FormProvider';

export const ProgressBar: React.FC<{ totalSteps: number }> = ({ totalSteps }) => {
  const { currentStep } = useFormState();
  // If we want step 1 to show a little bit of progress, we can do currentStep / totalSteps
  // If we want step 1 to be 0%, we do (currentStep - 1) / (totalSteps - 1)
  const progressPercentage = Math.max(5, (currentStep / totalSteps) * 100);

  return (
    <div className="progress-container" style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>
        <span>Étape {currentStep} sur {totalSteps}</span>
      </div>
      <div style={{ height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
        <div 
          style={{ 
            height: '100%', 
            width: `${progressPercentage}%`, 
            backgroundColor: 'var(--primary-color)',
            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
