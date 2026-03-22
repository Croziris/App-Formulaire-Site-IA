import React from 'react';
import { FormProvider, useFormState } from './context/FormProvider';
import ProgressBar from './components/layout/ProgressBar';
import StepNavigation from './components/layout/StepNavigation';
import Step1Identity from './components/steps/Step1Identity';
import Step2GoalsAudience from './components/steps/Step2GoalsAudience';
import Step3Services from './components/steps/Step3Services';
import Step4ServiceDetails from './components/steps/Step4ServiceDetails';
import Step5ExperienceStyle from './components/steps/Step5ExperienceStyle';
import Step6Branding from './components/steps/Step6Branding';
import Step7SeoFaq from './components/steps/Step7SeoFaq';
import Step8ReviewSubmit from './components/steps/Step8ReviewSubmit';
import './App.css';

const FormWizard: React.FC = () => {
  const { currentStep } = useFormState();

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1Identity />;
      case 2: return <Step2GoalsAudience />;
      case 3: return <Step3Services />;
      case 4: return <Step4ServiceDetails />;
      case 5: return <Step5ExperienceStyle />;
      case 6: return <Step6Branding />;
      case 7: return <Step7SeoFaq />;
      case 8: return <Step8ReviewSubmit />;
      default: 
        return (
          <div className="animate-slide-up">
            <h2 className="step-title">Étape {currentStep}</h2>
            <p className="step-description">En cours de développement...</p>
          </div>
        );
    }
  };

  return (
    <div className="wizard-container">
      <ProgressBar totalSteps={8} />
      <div className="wizard-content">
        {renderStep()}
      </div>
      {currentStep !== 8 && <StepNavigation />}
    </div>
  );
};

function App() {
  return (
    <FormProvider>
      <main className="app-main">
        <header className="app-header">
          <h1>Brief Landing Page Kiné</h1>
          <p>Créez la page de présentation parfaite pour vos actes hors nomenclature</p>
        </header>
        <FormWizard />
      </main>
    </FormProvider>
  );
}

export default App;
