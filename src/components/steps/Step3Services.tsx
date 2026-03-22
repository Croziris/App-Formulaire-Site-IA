import React from 'react';
import { useFormState } from '../../context/FormProvider';
import type { ServiceItem } from '../../types/form';

const SERVICE_TYPES = [
  "Coaching individuel",
  "Bilan (course à pied, cyclisme, posture...)",
  "Cours collectif",
  "Massage bien-être / récupération",
  "Atelier / Prévention",
  "Intervention entreprise",
  "Autre"
];

export const Step3Services: React.FC = () => {
  const { formData, setFormData } = useFormState();
  const { services } = formData;

  const addService = () => {
    const newService: ServiceItem = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(7),
      name: '',
      type: '',
      shortDescription: '',
      target: ''
    };
    setFormData((prev) => ({
      ...prev,
      services: [...prev.services, newService]
    }));
  };

  const removeService = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
  };

  const handleChange = (id: string, field: keyof ServiceItem, value: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, [field]: value } : s)
    }));
  };

  return (
    <div className="animate-slide-up">
      <h2 className="step-title">Étape 3 : Vos prestations hors nomenclature</h2>
      <p className="step-description">Listez les actes que vous souhaitez mettre en avant (non remboursés par la sécurité sociale).</p>

      {services.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'white', borderRadius: '8px', border: '1px dashed var(--border-color)', marginBottom: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>Aucune prestation ajoutée pour le moment.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '1.5rem' }}>
          {services.map((service, index) => (
            <div key={service.id} style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid var(--border-color)', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-main)' }}>Prestation {index + 1}</h3>
                <button 
                  type="button" 
                  onClick={() => removeService(service.id)}
                  className="btn btn-danger"
                >
                  Supprimer
                </button>
              </div>

              <div className="form-field">
                <label>Nom de la prestation *</label>
                <input 
                  type="text" 
                  value={service.name}
                  onChange={(e) => handleChange(service.id, 'name', e.target.value)}
                  placeholder="Ex : Bilan de course à pied complet"
                  required
                />
              </div>

              <div className="form-field">
                <label>Type de prestation *</label>
                <select 
                  value={service.type}
                  onChange={(e) => handleChange(service.id, 'type', e.target.value)}
                  required
                >
                  <option value="" disabled>Sélectionnez un type</option>
                  {SERVICE_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>Description courte (orientée bénéfices) *</label>
                <p className="help-text">Ex: "Analyse vidéo de votre foulée pour corriger les défauts et prévenir les blessures."</p>
                <textarea 
                  rows={2}
                  value={service.shortDescription}
                  onChange={(e) => handleChange(service.id, 'shortDescription', e.target.value)}
                  required
                />
              </div>

              <div className="form-field" style={{ marginBottom: 0 }}>
                <label>Pour quel type de patient / sportif ? *</label>
                <input 
                  type="text" 
                  value={service.target}
                  onChange={(e) => handleChange(service.id, 'target', e.target.value)}
                  placeholder="Ex : Coureurs blessés ou souhaitant améliorer leurs perfs"
                  required
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <button 
        type="button" 
        onClick={addService}
        className="btn btn-secondary"
        style={{ width: '100%', borderStyle: 'dashed' }}
      >
        + Ajouter une prestation
      </button>

    </div>
  );
};

export default Step3Services;
