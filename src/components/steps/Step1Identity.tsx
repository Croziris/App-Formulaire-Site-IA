import React from 'react';
import { useFormState } from '../../context/FormProvider';

export const Step1Identity: React.FC = () => {
  const { formData, setFormData } = useFormState();
  const { contact } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [name]: value }
    }));
  };

  return (
    <div className="animate-slide-up">
      <h2 className="step-title">Étape 1 : Identité & Contact</h2>
      <p className="step-description">Commençons par faire connaissance pour cibler votre pratique.</p>
      
      <div className="form-field">
        <label htmlFor="firstName">Prénom *</label>
        <input 
          type="text" 
          id="firstName" 
          name="firstName" 
          placeholder="Ex : Marie" 
          value={contact.firstName} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="form-field">
        <label htmlFor="lastName">Nom *</label>
        <input 
          type="text" 
          id="lastName" 
          name="lastName" 
          placeholder="Ex : Dupont" 
          value={contact.lastName} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="form-field">
        <label htmlFor="email">Adresse email *</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          placeholder="Ex : marie.dupont@example.fr" 
          value={contact.email} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="form-field">
        <label htmlFor="practiceName">Nom du cabinet (optionnel)</label>
        <input 
          type="text" 
          id="practiceName" 
          name="practiceName" 
          placeholder="Ex : Cabinet KinéSport Lambesc" 
          value={contact.practiceName || ''} 
          onChange={handleChange} 
        />
      </div>

      <div className="form-field">
        <label htmlFor="address">Adresse complète *</label>
        <textarea 
          id="address" 
          name="address" 
          rows={3} 
          placeholder="Ex : 12 rue des Lilas, 04100 Manosque" 
          value={contact.address} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="form-field">
        <label htmlFor="phone">Téléphone du cabinet (optionnel)</label>
        <input 
          type="text" 
          id="phone" 
          name="phone" 
          placeholder="Ex : 04 42 00 00 00" 
          value={contact.phone || ''} 
          onChange={handleChange} 
        />
      </div>
    </div>
  );
};

export default Step1Identity;
