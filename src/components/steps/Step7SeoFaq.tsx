import React from 'react';
import { useFormState } from '../../context/FormProvider';

export const Step7SeoFaq: React.FC = () => {
  const { formData, setFormData } = useFormState();
  const { seo } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      seo: { ...prev.seo, [name]: value }
    }));
  };

  return (
    <div className="animate-slide-up">
      <h2 className="step-title">Étape 7 : Référencement (SEO), FAQ & Freins</h2>
      <p className="step-description">Ces informations nous aideront à bien positionner votre page sur Google et à rassurer vos futurs patients.</p>

      <div className="form-field">
        <label htmlFor="areas">Zones géographiques visées *</label>
        <p className="help-text">Ex : Lambesc, Aix-en-Provence, Salon-de-Provence...</p>
        <input 
          type="text" 
          id="areas" 
          name="areas" 
          value={seo.areas} 
          onChange={handleChange} 
          placeholder="Ex : Lambesc et 15km autour"
          required 
        />
      </div>

      <div className="form-field">
        <label htmlFor="searchTerms">Idées de requêtes Google *</label>
        <p className="help-text">Que taperaient vos patients sur Google pour vous trouver ? Ex : "Kiné du sport Lambesc", "Bilan course à pied Aix", "Analyse posturale cyclisme"...</p>
        <textarea 
          id="searchTerms" 
          name="searchTerms" 
          rows={3} 
          value={seo.searchTerms} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="form-field">
        <label htmlFor="commonQuestions">Questions fréquentes des patients (FAQ) *</label>
        <p className="help-text">Quelles sont les questions qu'on vous pose le plus souvent sur ces actes ? Ex : "Faut-il une ordonnance ?", "Comment s'habiller pour le bilan ?"</p>
        <textarea 
          id="commonQuestions" 
          name="commonQuestions" 
          rows={4} 
          value={seo.commonQuestions} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="form-field">
        <label htmlFor="mainObjections">Freins principaux à la réservation *</label>
        <p className="help-text">Pourquoi un patient hésiterait-il à prendre rendez-vous ? Ex : "C'est cher car non remboursé", "J'ai peur que ce soit trop technique".</p>
        <textarea 
          id="mainObjections" 
          name="mainObjections" 
          rows={3} 
          value={seo.mainObjections} 
          onChange={handleChange} 
          required 
        />
      </div>
    </div>
  );
};

export default Step7SeoFaq;
