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

  const addTestimonial = () => {
    setFormData((prev) => ({
      ...prev,
      experience: {
        ...prev.experience,
        testimonials: [...(prev.experience.testimonials || []), { name: '', text: '' }]
      }
    }));
  };

  const removeTestimonial = (index: number) => {
    setFormData((prev) => {
      const updated = [...(prev.experience.testimonials || [])];
      updated.splice(index, 1);
      return { ...prev, experience: { ...prev.experience, testimonials: updated } };
    });
  };

  const updateTestimonial = (index: number, field: 'name' | 'text', value: string) => {
    setFormData((prev) => {
      const updated = [...(prev.experience.testimonials || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, experience: { ...prev.experience, testimonials: updated } };
    });
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

      <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)' }}>
          Crédibilité & Preuves sociales
        </h3>

        <div className="form-field">
          <label htmlFor="yearsOfExperience">Nombre d'années d'expérience en tant que kiné *</label>
          <input 
            type="number" 
            id="yearsOfExperience" 
            name="yearsOfExperience" 
            min="0"
            max="60"
            placeholder="Ex : 12" 
            value={experience.yearsOfExperience || ''} 
            onChange={handleExperienceChange as any} 
            required 
          />
          <p className="help-text">Cela permettra d'afficher "12 ans d'expérience" sur la page</p>
        </div>

        <div className="form-field">
          <label htmlFor="certifications">Certifications ou formations spécifiques à valoriser (optionnel)</label>
          <textarea 
            id="certifications" 
            name="certifications" 
            rows={3} 
            placeholder="Ex : DU Biomécanique du coureur (Paris 12), Formation Dry Needling, Méthode Mézières..."
            value={experience.certifications || ''} 
            onChange={handleExperienceChange} 
          />
        </div>

        <div className="form-field">
          <label htmlFor="associations">Membre d'associations professionnelles ? (optionnel)</label>
          <input 
            type="text" 
            id="associations" 
            name="associations" 
            placeholder="Ex : SFMKS, SNKS, Réseau Kiné du Sport" 
            value={experience.associations || ''} 
            onChange={handleExperienceChange as any} 
          />
        </div>

        <div className="form-field">
          <label>Avez-vous des témoignages patients anonymisés à intégrer ? *</label>
          <div className="radio-group" style={{ flexDirection: 'row', gap: '2rem' }}>
            <label className="radio-label">
              <input 
                type="radio" 
                name="hasTestimonials" 
                value="yes"
                checked={experience.hasTestimonials === 'yes'}
                onChange={handleExperienceChange as any}
                required
              />
              Oui
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="hasTestimonials" 
                value="no"
                checked={experience.hasTestimonials === 'no'}
                onChange={handleExperienceChange as any}
              />
              Non, pas encore
            </label>
          </div>
        </div>

        {experience.hasTestimonials === 'yes' && (
          <div className="animate-slide-up" style={{ marginTop: '1rem' }}>
            <p className="help-text" style={{ marginBottom: '1rem' }}>
              Ajoutez 2 à 5 témoignages courts. Format : Prénom fictif + texte bref (2-3 phrases max).
            </p>
            
            {(experience.testimonials || []).length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'white', borderRadius: '8px', border: '1px dashed var(--border-color)', marginBottom: '1rem' }}>
                <p style={{ color: 'var(--text-muted)' }}>Aucun témoignage ajouté.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
                {(experience.testimonials || []).map((testimonial: any, index: number) => (
                  <div key={index} style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid var(--border-color)', position: 'relative' }}>
                    <button 
                      type="button" 
                      onClick={() => removeTestimonial(index)}
                      style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'none', border: 'none', color: 'var(--error-color)', cursor: 'pointer', fontSize: '1.2rem' }}
                      title="Supprimer"
                    >
                      ✕
                    </button>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.75rem' }}>
                      <input 
                        type="text" 
                        placeholder="Prénom (fictif)"
                        value={testimonial.name || ''}
                        onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                        required
                      />
                      <textarea 
                        rows={2}
                        placeholder="Témoignage (2-3 phrases)"
                        value={testimonial.text || ''}
                        onChange={(e) => updateTestimonial(index, 'text', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button 
              type="button" 
              onClick={addTestimonial}
              className="btn btn-secondary"
              style={{ width: '100%', borderStyle: 'dashed' }}
            >
              + Ajouter un témoignage
            </button>
          </div>
        )}
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
