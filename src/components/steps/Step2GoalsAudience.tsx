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
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      siteGoals: { 
        ...prev.siteGoals, 
        mainGoal: value,
        objectifAutreDetail: value === "Autre" ? prev.siteGoals.objectifAutreDetail : ''
      }
    }));
  };

  const handleGoalTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      siteGoals: { ...prev.siteGoals, objectifAutreDetail: e.target.value }
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
        targetAudience: { 
          ...prev.targetAudience, 
          audiences: newAudiences,
          publicCibleAutreDetail: newAudiences.includes("Autre") ? prev.targetAudience.publicCibleAutreDetail : ''
        }
      };
    });
  };

  const handleAudienceText = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>) => {
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
        {siteGoals.mainGoal === "Autre" && (
          <div className="animate-slide-up" style={{ marginTop: '1rem' }}>
            <textarea 
              rows={2} 
              placeholder="Précisez votre objectif..." 
              value={siteGoals.objectifAutreDetail || ''}
              onChange={handleGoalTextChange}
              required
            />
          </div>
        )}
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
        {targetAudience.audiences.includes("Autre") && (
          <div className="animate-slide-up" style={{ marginTop: '1rem' }}>
            <textarea 
              name="publicCibleAutreDetail"
              rows={2} 
              placeholder="Précisez votre public cible..." 
              value={targetAudience.publicCibleAutreDetail || ''}
              onChange={handleAudienceText}
              required
            />
          </div>
        )}
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

      <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)' }}>
          Organisation de la page
        </h3>
        <p className="help-text" style={{ marginBottom: '1.5rem' }}>
          Ces choix nous aident à structurer votre landing page de façon optimale.
        </p>

        <div className="form-field">
          <label>Type de mise en page souhaitée *</label>
          <div className="radio-group">
            <label className="radio-label">
              <input 
                type="radio" 
                name="pageStructure" 
                value="one-page"
                checked={targetAudience.pageStructure === 'one-page'}
                onChange={handleAudienceText}
                required
              />
              One-page scroll (tout sur une seule page qui défile)
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="pageStructure" 
                value="multi-section"
                checked={targetAudience.pageStructure === 'multi-section'}
                onChange={handleAudienceText}
              />
              Multi-sections avec menu fixe et ancres (clic = scroll vers section)
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="pageStructure" 
                value="no-preference"
                checked={targetAudience.pageStructure === 'no-preference'}
                onChange={handleAudienceText}
              />
              Aucune préférence (vous choisissez)
            </label>
          </div>
        </div>

        <div className="form-field">
          <label>Souhaitez-vous une section "À propos / Qui suis-je" ? *</label>
          <div className="radio-group">
            <label className="radio-label">
              <input 
                type="radio" 
                name="aboutSection" 
                value="before"
                checked={targetAudience.aboutSection === 'before'}
                onChange={handleAudienceText}
                required
              />
              Oui, avant les services
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="aboutSection" 
                value="after"
                checked={targetAudience.aboutSection === 'after'}
                onChange={handleAudienceText}
              />
              Oui, après les services
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="aboutSection" 
                value="no"
                checked={targetAudience.aboutSection === 'no'}
                onChange={handleAudienceText}
              />
              Non
            </label>
          </div>
        </div>

        <div className="form-field">
          <label>Souhaitez-vous une section dédiée aux témoignages patients ? *</label>
          <div className="radio-group" style={{ flexDirection: 'row', gap: '2rem' }}>
            <label className="radio-label">
              <input 
                type="radio" 
                name="testimonialsSection" 
                value="yes"
                checked={targetAudience.testimonialsSection === 'yes'}
                onChange={handleAudienceText}
                required
              />
              Oui
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="testimonialsSection" 
                value="integrated"
                checked={targetAudience.testimonialsSection === 'integrated'}
                onChange={handleAudienceText}
              />
              Non, intégrés dans "À propos"
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="testimonialsSection" 
                value="no"
                checked={targetAudience.testimonialsSection === 'no'}
                onChange={handleAudienceText}
              />
              Pas de témoignages
            </label>
          </div>
        </div>

        <div className="form-field">
          <label>Souhaitez-vous afficher une carte / plan du cabinet ? *</label>
          <div className="radio-group" style={{ flexDirection: 'row', gap: '2rem' }}>
            <label className="radio-label">
              <input 
                type="radio" 
                name="mapSection" 
                value="yes"
                checked={targetAudience.mapSection === 'yes'}
                onChange={handleAudienceText}
                required
              />
              Oui (Google Maps intégré)
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="mapSection" 
                value="no"
                checked={targetAudience.mapSection === 'no'}
                onChange={handleAudienceText}
              />
              Non
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2GoalsAudience;
