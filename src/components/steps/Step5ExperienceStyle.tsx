import React from 'react';
import { useFormState } from '../../context/FormProvider';

const TONE_OPTIONS = [
  "Professionnel & médical",
  "Dynamique & sportif",
  "Bienveillant & rassurant",
  "Pédagogique & vulgarisateur",
  "Simple & direct"
];

export const Step5ExperienceStyle: React.FC = () => {
  const { formData, setFormData } = useFormState();
  const { experience, tone } = formData;

  const handleExperienceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      experience: { ...prev.experience, [name]: value }
    }));
  };

  const handleToneCheckbox = (option: string) => {
    setFormData((prev) => {
      const current = prev.tone.toneOptions;
      const newOptions = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      return { ...prev, tone: { ...prev.tone, toneOptions: newOptions } };
    });
  };

  const handleToneFreeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      tone: { ...prev.tone, toneFreeText: e.target.value }
    }));
  };

  return (
    <div className="animate-slide-up">
      <h2 className="step-title">Étape 5 : Expérience & Style</h2>
      <p className="step-description">Mettez en avant votre crédibilité et choisissez la "voix" de votre page.</p>

      <div className="form-field">
        <label htmlFor="degreesAndTraining">Diplômes et formations *</label>
        <p className="help-text">Ex : DE Masseur-Kinésithérapeute (2018), Formation La Clinique du Coureur 1.0 et 1.1...</p>
        <textarea 
          id="degreesAndTraining" 
          name="degreesAndTraining" 
          rows={3} 
          value={experience.degreesAndTraining} 
          onChange={handleExperienceChange} 
          required 
        />
      </div>

      <div className="form-field">
        <label htmlFor="experienceDescription">Expérience & pratique personnelle *</label>
        <p className="help-text">Ex : J'accompagne des sportifs depuis 5 ans. Je suis moi-même marathonien amateur (RP 3h15), je connais bien les contraintes de l'entraînement.</p>
        <textarea 
          id="experienceDescription" 
          name="experienceDescription" 
          rows={4} 
          value={experience.experienceDescription} 
          onChange={handleExperienceChange} 
          required 
        />
      </div>

      <div className="form-field">
        <label>Ton de communication * (Plusieurs choix possibles)</label>
        <div className="checkbox-group">
          {TONE_OPTIONS.map((option) => (
            <label key={option} className="checkbox-label">
              <input 
                type="checkbox" 
                checked={tone.toneOptions.includes(option)}
                onChange={() => handleToneCheckbox(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="toneFreeText">Précisions supplémentaires sur le ton (optionnel)</label>
        <p className="help-text">Ex : Je veux du tutoiement, ou je préfère garder une certaine distance médicale.</p>
        <textarea 
          id="toneFreeText" 
          name="toneFreeText" 
          rows={2} 
          value={tone.toneFreeText || ''} 
          onChange={handleToneFreeText} 
        />
      </div>
    </div>
  );
};

export default Step5ExperienceStyle;
