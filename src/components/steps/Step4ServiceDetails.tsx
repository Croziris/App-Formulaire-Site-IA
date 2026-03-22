import React from 'react';
import { useFormState } from '../../context/FormProvider';
import type { ServiceItem } from '../../types/form';

export const Step4ServiceDetails: React.FC = () => {
  const { formData, setFormData } = useFormState();
  const { services } = formData;

  const handleChange = (id: string, field: keyof ServiceItem, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, [field]: value } : s)
    }));
  };

  if (services.length === 0) {
    return (
      <div className="animate-slide-up">
        <h2 className="step-title">Étape 4 : Détails, formats & tarifs</h2>
        <p className="step-description" style={{ color: 'var(--error-color)', fontWeight: 500 }}>
          Vous n'avez pas ajouté de prestation à l'étape précédente. Veuillez cliquer sur "Précédent" et ajouter au moins une prestation.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <h2 className="step-title">Étape 4 : Détails, formats & tarifs</h2>
      <p className="step-description">
        Précisons les modalités pratiques de vos prestations. (Rappel : il s'agit d'actes non conventionnés).
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {services.map((service, index) => (
          <div key={service.id} style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
              {service.name || `Prestation ${index + 1}`}
            </h3>

            <div className="form-field">
              <label>Durée d'une séance type *</label>
              <input 
                type="text" 
                value={service.duration || ''}
                onChange={(e) => handleChange(service.id, 'duration', e.target.value)}
                placeholder="Ex : 60 minutes"
                required
              />
            </div>

            <div className="form-field">
              <label>Formats de la séance (optionnel)</label>
              <input 
                type="text" 
                value={service.formats ? service.formats.join(', ') : ''}
                onChange={(e) => handleChange(service.id, 'formats', e.target.value.split(',').map(s => s.trim()))}
                placeholder="Ex : Individuel, Petit groupe"
              />
            </div>

            <div className="form-field">
              <label>Lieux de pratique (optionnel)</label>
              <input 
                type="text" 
                value={service.locations ? service.locations.join(', ') : ''}
                onChange={(e) => handleChange(service.id, 'locations', e.target.value.split(',').map(s => s.trim()))}
                placeholder="Ex : Au cabinet, En extérieur, En visio"
              />
            </div>

            <div className="form-field">
              <label>Tarif par séance *</label>
              <input 
                type="text" 
                value={service.price || ''}
                onChange={(e) => handleChange(service.id, 'price', e.target.value)}
                placeholder="Ex : 70 € la séance de 60 minutes"
                required
              />
            </div>

            <div className="form-field" style={{ marginBottom: 0 }}>
              <label>Forfaits / Packs (optionnel)</label>
              <textarea 
                rows={2}
                value={service.packages || ''}
                onChange={(e) => handleChange(service.id, 'packages', e.target.value)}
                placeholder="Ex : Pack 5 séances à 300 €, Bilan + 3 suivis"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step4ServiceDetails;
