import React from 'react';
import { useFormState } from '../../context/FormProvider';

export const Step1Identity: React.FC = () => {
  const { formData, setFormData } = useFormState();
  const { contact } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

      <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)' }}>
          Informations professionnelles obligatoires
        </h3>
        <p className="help-text" style={{ marginBottom: '1.5rem' }}>
          Ces informations sont requises par le Code de déontologie des masseurs-kinésithérapeutes et doivent figurer sur votre site.
        </p>

        <div className="form-field">
          <label htmlFor="rpps">Numéro RPPS (Répertoire Partagé des Professionnels de Santé) *</label>
          <input 
            type="text" 
            id="rpps" 
            name="rpps" 
            placeholder="Ex : 10001234567" 
            value={contact.rpps || ''} 
            onChange={handleChange} 
            required 
            pattern="[0-9]{11}"
          />
          <p className="help-text">11 chiffres. Trouvable sur <a href="https://annuaire.sante.fr" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-color)' }}>annuaire.sante.fr</a></p>
        </div>

        <div className="form-field">
          <label htmlFor="adeli">Numéro ADELI (si vous l'avez encore)</label>
          <input 
            type="text" 
            id="adeli" 
            name="adeli" 
            placeholder="Ex : 049876543" 
            value={contact.adeli || ''} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-field">
          <label htmlFor="diplomaYear">Année d'obtention du Diplôme d'État de Masseur-Kinésithérapeute *</label>
          <input 
            type="number" 
            id="diplomaYear" 
            name="diplomaYear" 
            placeholder="Ex : 2015" 
            min="1950"
            max={new Date().getFullYear()}
            value={contact.diplomaYear || ''} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-field">
          <label htmlFor="siret">Numéro SIRET (si exercice libéral) *</label>
          <input 
            type="text" 
            id="siret" 
            name="siret" 
            placeholder="Ex : 123 456 789 00012" 
            value={contact.siret || ''} 
            onChange={handleChange} 
            pattern="[0-9]{14}|[0-9]{3} [0-9]{3} [0-9]{3} [0-9]{5}"
          />
          <p className="help-text">14 chiffres (avec ou sans espaces)</p>
        </div>

        <div className="form-field">
          <label htmlFor="orderDepartment">Ordre départemental de rattachement (optionnel)</label>
          <input 
            type="text" 
            id="orderDepartment" 
            name="orderDepartment" 
            placeholder="Ex : Ordre des MK des Bouches-du-Rhône" 
            value={contact.orderDepartment || ''} 
            onChange={handleChange} 
          />
        </div>
      </div>

      <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)' }}>
          Horaires & Accessibilité
        </h3>

        <div className="form-field">
          <label htmlFor="schedules">Jours et horaires d'ouverture du cabinet *</label>
          <textarea 
            id="schedules" 
            name="schedules" 
            rows={3} 
            placeholder="Ex : Lun-Ven 9h-12h / 14h-19h, Sam 9h-12h, sur RDV uniquement"
            value={contact.schedules || ''} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-field">
          <label>Acceptez-vous les rendez-vous en soirée ou le week-end ? *</label>
          <div className="radio-group" style={{ flexDirection: 'row', gap: '2rem' }}>
            <label className="radio-label">
              <input
                type="radio"
                name="eveningWeekendAvailable"
                value="yes"
                checked={contact.eveningWeekendAvailable === 'yes'}
                onChange={handleChange}
                required
              />
              Oui
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="eveningWeekendAvailable"
                value="no"
                checked={contact.eveningWeekendAvailable === 'no'}
                onChange={handleChange}
              />
              Non
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="eveningWeekendAvailable"
                value="sometimes"
                checked={contact.eveningWeekendAvailable === 'sometimes'}
                onChange={handleChange}
              />
              Selon disponibilités
            </label>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="appointmentDelay">Délai moyen pour obtenir un rendez-vous (optionnel)</label>
          <input 
            type="text" 
            id="appointmentDelay" 
            name="appointmentDelay" 
            placeholder="Ex : Sous 48h, Sous 1 semaine, Variable selon période" 
            value={contact.appointmentDelay || ''} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-field">
          <label>Cabinet accessible PMR (Personnes à Mobilité Réduite) ? *</label>
          <div className="radio-group" style={{ flexDirection: 'row', gap: '2rem' }}>
            <label className="radio-label">
              <input
                type="radio"
                name="pmrAccessible"
                value="yes"
                checked={contact.pmrAccessible === 'yes'}
                onChange={handleChange}
                required
              />
              Oui
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="pmrAccessible"
                value="no"
                checked={contact.pmrAccessible === 'no'}
                onChange={handleChange}
              />
              Non
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="pmrAccessible"
                value="partial"
                checked={contact.pmrAccessible === 'partial'}
                onChange={handleChange}
              />
              Partiellement
            </label>
          </div>
        </div>

        {contact.pmrAccessible === 'partial' && (
          <div className="form-field animate-slide-up">
            <label htmlFor="pmrDetails">Précisez les conditions d'accessibilité</label>
            <textarea 
              id="pmrDetails" 
              name="pmrDetails" 
              rows={2} 
              placeholder="Ex : Rez-de-chaussée accessible, mais toilettes à l'étage"
              value={contact.pmrDetails || ''} 
              onChange={handleChange} 
            />
          </div>
        )}

        <div className="form-field">
          <label htmlFor="parking">Stationnement à proximité ? *</label>
          <select 
            id="parking" 
            name="parking" 
            value={contact.parking || ''} 
            onChange={handleChange}
            required
          >
            <option value="" disabled>Sélectionnez une option</option>
            <option value="free">Oui, gratuit</option>
            <option value="paid">Oui, payant (zone bleue / parking)</option>
            <option value="difficult">Difficile</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)' }}>
          Présence en ligne (optionnel)
        </h3>
        <p className="help-text" style={{ marginBottom: '1.5rem' }}>
          Si vous avez déjà des profils ou un site existant, nous ajouterons des boutons de lien.
        </p>

        <div className="form-field">
          <label htmlFor="doctolibUrl">Lien vers votre profil Doctolib / Calendly</label>
          <input 
            type="url" 
            id="doctolibUrl" 
            name="doctolibUrl" 
            placeholder="https://www.doctolib.fr/..." 
            value={contact.doctolibUrl || ''} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-field">
          <label htmlFor="instagramUrl">Instagram</label>
          <input 
            type="url" 
            id="instagramUrl" 
            name="instagramUrl" 
            placeholder="https://instagram.com/..." 
            value={contact.instagramUrl || ''} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-field">
          <label htmlFor="facebookUrl">Facebook</label>
          <input 
            type="url" 
            id="facebookUrl" 
            name="facebookUrl" 
            placeholder="https://facebook.com/..." 
            value={contact.facebookUrl || ''} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-field">
          <label htmlFor="linkedinUrl">LinkedIn</label>
          <input 
            type="url" 
            id="linkedinUrl" 
            name="linkedinUrl" 
            placeholder="https://linkedin.com/in/..." 
            value={contact.linkedinUrl || ''} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-field">
          <label htmlFor="existingWebsite">Site web existant (si vous en avez un)</label>
          <input 
            type="url" 
            id="existingWebsite" 
            name="existingWebsite" 
            placeholder="https://..." 
            value={contact.existingWebsite || ''} 
            onChange={handleChange} 
          />
        </div>
      </div>
    </div>
  );
};

export default Step1Identity;
