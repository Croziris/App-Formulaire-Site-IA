import React from 'react';
import { useFormState } from '../../context/FormProvider';

const GOAL_OPTIONS = [
  "Mettre en avant mes coachings sportifs",
  "Recevoir des demandes de bilan (course à pied, cyclisme...)",
  "Promouvoir des cours collectifs (Pilates, yoga...)",
  "Proposer des massages bien-être et de récupération",
  "Autre"
];

const AUDIENCE_OPTIONS = [
  "Coureurs débutants",
  "Coureurs confirmés",
  "Cyclistes",
  "Sédentaires reprenant le sport",
  "Seniors actifs",
  "Entreprises (QVT)",
  "Autre"
];

const ACTION_OPTIONS = [
  "Appel téléphonique",
  "Remplir un formulaire de contact",
  "Réservation en ligne (Doctolib, Calendly...)",
  "M'envoyer un email"
];

export const Step2GoalsAudience: React.FC = () => {
  const { formData, setFormData } = useFormState();
  const { siteGoals, targetAudience } = formData;

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      siteGoals: { ...prev.siteGoals, mainGoal: e.target.value }
    }));
  };

  const handleAudienceCheckbox = (option: string) => {
    setFormData((prev) => {
      const currentAudiences = prev.targetAudience.audiences;
      const newAudiences = currentAudiences.includes(option)
        ? currentAudiences.filter((a) => a !== option)
        : [...currentAudiences, option];
      
      return {
        ...prev,
        targetAudience: { ...prev.targetAudience, audiences: newAudiences }
      };
    });
  };

  const handleAudienceText = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      targetAudience: { ...prev.targetAudience, [name]: value }
    }));
  };

  return (
    <div className="animate-slide-up">
      <h2 className="step-title">Étape 2 : Objectifs & Public cible</h2>
      <p className="step-description">Définissons à qui s'adresse votre page et ce que vous en attendez.</p>
      
      <div className="form-field">
        <label>1. Quel est l'objectif principal de cette page ? *</label>
        <p className="help-text">Choisissez l'activité hors nomenclature que vous souhaitez promouvoir en priorité.</p>
        <div className="radio-group">
          {GOAL_OPTIONS.map((goal) => (
            <label key={goal} className="radio-label">
              <input 
                type="radio" 
                name="mainGoal" 
                value={goal}
                checked={siteGoals.mainGoal === goal}
                onChange={handleGoalChange}
                required
              />
              {goal}
            </label>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label>2. Quel est votre public cible principal ? (Plusieurs choix possibles)</label>
        <div className="checkbox-group">
          {AUDIENCE_OPTIONS.map((audience) => (
            <label key={audience} className="checkbox-label">
              <input 
                type="checkbox" 
                checked={targetAudience.audiences.includes(audience)}
                onChange={() => handleAudienceCheckbox(audience)}
              />
              {audience}
            </label>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="idealPatient">3. Décrivez votre patient idéal (ses douleurs, ses attentes) *</label>
        <p className="help-text">Exemple : "Un profil de coureur amateur qui prépare un marathon mais ressent des douleurs aux genoux et a besoin d'un bilan pour comprendre son geste."</p>
        <textarea 
          id="idealPatient" 
          name="idealPatient" 
          rows={4} 
          value={targetAudience.idealPatient} 
          onChange={handleAudienceText} 
          required 
        />
      </div>

      <div className="form-field">
        <label htmlFor="mainAction">4. Quelle est l'action principale que le visiteur doit réaliser ? *</label>
        <select 
          id="mainAction" 
          name="mainAction" 
          value={targetAudience.mainAction} 
          onChange={handleAudienceText}
          required
        >
          <option value="" disabled>Sélectionnez une action</option>
          {ACTION_OPTIONS.map((action) => (
            <option key={action} value={action}>{action}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Step2GoalsAudience;
