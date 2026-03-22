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

  const handlePaymentMethodToggle = (method: string) => {
    setFormData((prev) => {
      const current = prev.paymentMethods || [];
      const updated = current.includes(method)
        ? current.filter((m) => m !== method)
        : [...current, method];
      return { ...prev, paymentMethods: updated };
    });
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
                value={service.formats ? service.formats.join(',') : ''}
                onChange={(e) => handleChange(service.id, 'formats', e.target.value.split(','))}
                placeholder="Ex : Individuel, Petit groupe"
              />
            </div>

            <div className="form-field">
              <label>Lieux de pratique (optionnel)</label>
              <input 
                type="text" 
                value={service.locations ? service.locations.join(',') : ''}
                onChange={(e) => handleChange(service.id, 'locations', e.target.value.split(','))}
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

            <div className="form-field">
              <label>Forfaits / Packs (optionnel)</label>
              <textarea 
                rows={2}
                value={service.packages || ''}
                onChange={(e) => handleChange(service.id, 'packages', e.target.value)}
                placeholder="Ex : Pack 5 séances à 300 €, Bilan + 3 suivis"
              />
            </div>

            <div className="form-field">
              <label>Équipement requis pour le patient (optionnel)</label>
              <input 
                type="text" 
                value={service.requiredEquipment || ''}
                onChange={(e) => handleChange(service.id, 'requiredEquipment', e.target.value)}
                placeholder="Ex : Tenue de sport, chaussures de running, serviette"
              />
            </div>

            <div className="form-field" style={{ marginBottom: 0 }}>
              <label>Contre-indications à préciser (optionnel)</label>
              <textarea 
                rows={2}
                value={service.contraindications || ''}
                onChange={(e) => handleChange(service.id, 'contraindications', e.target.value)}
                placeholder="Ex : Blessure récente non diagnostiquée, pathologie cardiaque non stabilisée"
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)' }}>
          Modalités de paiement (globales)
        </h3>

        <div className="form-field">
          <label>Moyens de paiement acceptés * (plusieurs choix possibles)</label>
          <div className="checkbox-group">
            {['Carte bancaire', 'Espèces', 'Chèque', 'Virement', 'Lydia / PayLib'].map((method) => (
              <label key={method} className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={(formData.paymentMethods || []).includes(method)}
                  onChange={() => handlePaymentMethodToggle(method)}
                />
                {method}
              </label>
            ))}
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <input 
              type="text" 
              placeholder="Autre moyen de paiement..."
              value={formData.paymentMethodOther || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, paymentMethodOther: e.target.value }))}
            />
          </div>
        </div>

        <div className="form-field">
          <label>Proposez-vous un paiement en plusieurs fois ? *</label>
          <div className="radio-group" style={{ flexDirection: 'row', gap: '2rem' }}>
            <label className="radio-label">
              <input 
                type="radio" 
                name="installmentPayment" 
                value="yes"
                checked={formData.installmentPayment === 'yes'}
                onChange={(e) => setFormData(prev => ({ ...prev, installmentPayment: e.target.value }))}
                required
              />
              Oui
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="installmentPayment" 
                value="no"
                checked={formData.installmentPayment === 'no'}
                onChange={(e) => setFormData(prev => ({ ...prev, installmentPayment: e.target.value }))}
              />
              Non
            </label>
          </div>
        </div>

        {formData.installmentPayment === 'yes' && (
          <div className="form-field animate-slide-up">
            <label htmlFor="installmentConditions">Précisez les conditions</label>
            <textarea 
              id="installmentConditions" 
              rows={2} 
              placeholder="Ex : 3x sans frais pour les packs > 200€, 4x avec frais pour > 400€"
              value={formData.installmentConditions || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, installmentConditions: e.target.value }))}
            />
          </div>
        )}

        <div className="form-field">
          <label>Demandez-vous un acompte / arrhes ? *</label>
          <div className="radio-group" style={{ flexDirection: 'row', gap: '2rem' }}>
            <label className="radio-label">
              <input 
                type="radio" 
                name="deposit" 
                value="yes"
                checked={formData.deposit === 'yes'}
                onChange={(e) => setFormData(prev => ({ ...prev, deposit: e.target.value }))}
                required
              />
              Oui
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="deposit" 
                value="no"
                checked={formData.deposit === 'no'}
                onChange={(e) => setFormData(prev => ({ ...prev, deposit: e.target.value }))}
              />
              Non
            </label>
          </div>
        </div>

        {formData.deposit === 'yes' && (
          <div className="form-field animate-slide-up">
            <label htmlFor="depositAmount">Montant ou pourcentage de l'acompte</label>
            <input 
              type="text" 
              id="depositAmount" 
              placeholder="Ex : 30€ ou 30% du total"
              value={formData.depositAmount || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, depositAmount: e.target.value }))}
            />
          </div>
        )}

        <div className="form-field">
          <label>Souhaitez-vous afficher une offre de lancement ? *</label>
          <div className="radio-group" style={{ flexDirection: 'row', gap: '2rem' }}>
            <label className="radio-label">
              <input 
                type="radio" 
                name="launchOffer" 
                value="yes"
                checked={formData.launchOffer === 'yes'}
                onChange={(e) => setFormData(prev => ({ ...prev, launchOffer: e.target.value }))}
                required
              />
              Oui
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="launchOffer" 
                value="no"
                checked={formData.launchOffer === 'no'}
                onChange={(e) => setFormData(prev => ({ ...prev, launchOffer: e.target.value }))}
              />
              Non
            </label>
          </div>
        </div>

        {formData.launchOffer === 'yes' && (
          <div className="animate-slide-up">
            <div className="form-field">
              <label htmlFor="launchOfferDescription">Description de l'offre</label>
              <textarea 
                id="launchOfferDescription" 
                rows={2} 
                placeholder="Ex : -20% sur le bilan initial, Première séance découverte à 40€"
                value={formData.launchOfferDescription || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, launchOfferDescription: e.target.value }))}
              />
            </div>
            <div className="form-field">
              <label htmlFor="launchOfferValidity">Validité de l'offre (date limite)</label>
              <input 
                type="date" 
                id="launchOfferValidity" 
                value={formData.launchOfferValidity || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, launchOfferValidity: e.target.value }))}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step4ServiceDetails;
