import React from 'react';
import { useFormState } from '../../context/FormProvider';

const IMAGE_STYLE_OPTIONS = [
  "Photos réelles du cabinet (à vous)",
  "Photos en action / pendant une séance de sport",
  "Photos sobres / médicales",
  "Illustrations modernes",
  "Je ne sais pas encore"
];

export const Step6Branding: React.FC = () => {
  const { formData, setFormData } = useFormState();
  const { branding } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      branding: { ...prev.branding, [name]: value }
    }));
  };

  const handleHasLogo = (has: boolean) => {
    setFormData((prev) => ({
      ...prev,
      branding: { ...prev.branding, hasLogo: has, logoUrl: has ? prev.branding.logoUrl : '' }
    }));
  };

  const handleImageStyleCheckbox = (style: string) => {
    setFormData((prev) => {
      const current = prev.branding.imageStyle;
      const newStyles = current.includes(style)
        ? current.filter((s) => s !== style)
        : [...current, style];
      return { ...prev, branding: { ...prev.branding, imageStyle: newStyles } };
    });
  };

  const addCustomColor = () => {
    setFormData((prev) => ({
      ...prev,
      branding: {
        ...prev.branding,
        couleursPersonnalisees: [...prev.branding.couleursPersonnalisees, { nom: '', hex: '#000000' }]
      }
    }));
  };

  const updateCustomColor = (index: number, field: 'nom' | 'hex', value: string) => {
    setFormData((prev) => {
      const newColors = [...prev.branding.couleursPersonnalisees];
      newColors[index] = { ...newColors[index], [field]: value };
      return { ...prev, branding: { ...prev.branding, couleursPersonnalisees: newColors } };
    });
  };

  const removeCustomColor = (index: number) => {
    setFormData((prev) => {
      const newColors = [...prev.branding.couleursPersonnalisees];
      newColors.splice(index, 1);
      return { ...prev, branding: { ...prev.branding, couleursPersonnalisees: newColors } };
    });
  };

  return (
    <div className="animate-slide-up">
      <h2 className="step-title">Étape 6 : Charte graphique & Visuels</h2>
      <p className="step-description">
        Les couleurs et le style visuel aident à créer une identité qui vous ressemble.
        <br />
        <a href="https://coolors.co" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontSize: '0.875rem' }}>
          (Besoin d'inspiration ? Essayez le générateur coolors.co)
        </a>
      </p>

      <div className="form-field">
        <label>Avez-vous déjà un logo ? *</label>
        <div className="radio-group" style={{ flexDirection: 'row', gap: '2rem' }}>
          <label className="radio-label" style={{ flex: 1, justifyContent: 'center' }}>
            <input
              type="radio"
              name="hasLogo"
              checked={branding.hasLogo === true}
              onChange={() => handleHasLogo(true)}
            />
            Oui
          </label>
          <label className="radio-label" style={{ flex: 1, justifyContent: 'center' }}>
            <input
              type="radio"
              name="hasLogo"
              checked={branding.hasLogo === false}
              onChange={() => handleHasLogo(false)}
            />
            Non
          </label>
        </div>
      </div>

      {branding.hasLogo && (
        <div className="form-field animate-slide-up">
          <label htmlFor="logoUrl">Lien vers votre logo (Drive, WeTransfer...)</label>
          <input
            type="text"
            id="logoUrl"
            name="logoUrl"
            placeholder="Ex : https://drive.google.com/..."
            value={branding.logoUrl || ''}
            onChange={handleChange}
          />
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="form-field" style={{ marginBottom: 0 }}>
          <label htmlFor="primaryColor">Couleur principale</label>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="color"
              id="primaryColor"
              name="primaryColor"
              value={branding.primaryColor}
              onChange={handleChange}
              style={{ width: '40px', height: '40px', padding: 0, border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            />
            <input
              type="text"
              value={branding.primaryColor}
              onChange={(e) => handleChange({ target: { name: 'primaryColor', value: e.target.value } } as any)}
              pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$"
              style={{ flex: 1 }}
            />
          </div>
        </div>

        <div className="form-field" style={{ marginBottom: 0 }}>
          <label htmlFor="secondaryColor">Couleur secondaire</label>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="color"
              id="secondaryColor"
              name="secondaryColor"
              value={branding.secondaryColor}
              onChange={handleChange}
              style={{ width: '40px', height: '40px', padding: 0, border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            />
            <input
              type="text"
              value={branding.secondaryColor}
              onChange={(e) => handleChange({ target: { name: 'secondaryColor', value: e.target.value } } as any)}
              pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$"
              style={{ flex: 1 }}
            />
          </div>
        </div>
      </div>

      <div className="form-field">
        <label>Couleurs personnalisées supplémentaires</label>
        <p className="help-text">Ajoutez autant de couleurs que vous le souhaitez (ex: fond, texte, boutons...).</p>

        {branding.couleursPersonnalisees.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
            {branding.couleursPersonnalisees.map((color, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }} className="animate-slide-up">
                <input
                  type="color"
                  value={color.hex}
                  onChange={(e) => updateCustomColor(idx, 'hex', e.target.value)}
                  style={{ width: '40px', height: '40px', padding: 0, border: 'none', borderRadius: '4px', cursor: 'pointer', flexShrink: 0 }}
                />
                <input
                  type="text"
                  value={color.hex}
                  onChange={(e) => updateCustomColor(idx, 'hex', e.target.value)}
                  pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$"
                  style={{ width: '90px', flexShrink: 0 }}
                  required
                />
                <input
                  type="text"
                  value={color.nom}
                  onChange={(e) => updateCustomColor(idx, 'nom', e.target.value)}
                  placeholder="Ex : Couleur d'accent ou Couleur de fond ou Couleur de texte"
                  style={{ flex: 1 }}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeCustomColor(idx)}
                  className="btn btn-secondary"
                  style={{ padding: '0.5rem 0.75rem', flexShrink: 0 }}
                  title="Supprimer"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={addCustomColor}
          className="btn btn-secondary"
          style={{ width: '100%', borderStyle: 'dashed' }}
        >
          + Ajouter une couleur
        </button>
      </div>

      <div className="form-field">
        <label htmlFor="avoidColors">Y a-t-il des couleurs à éviter absolument ? (optionnel)</label>
        <textarea
          id="avoidColors"
          name="avoidColors"
          rows={2}
          value={branding.avoidColors || ''}
          onChange={handleChange}
          placeholder="Ex : Pas de rouge sang ni de kaki"
        />
      </div>

      <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)' }}>
          Photos & Vidéos
        </h3>

        <div className="form-field">
          <label>Avez-vous des photos de votre cabinet ? *</label>
          <div className="radio-group" style={{ flexDirection: 'row', gap: '2rem' }}>
            <label className="radio-label">
              <input 
                type="radio" 
                name="hasCabinetPhotos" 
                value="yes"
                checked={branding.hasCabinetPhotos === 'yes'}
                onChange={handleChange}
                required
              />
              Oui
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="hasCabinetPhotos" 
                value="no"
                checked={branding.hasCabinetPhotos === 'no'}
                onChange={handleChange}
              />
              Non
            </label>
          </div>
        </div>

        {branding.hasCabinetPhotos === 'yes' && (
          <div className="form-field animate-slide-up">
            <label htmlFor="cabinetPhotosUrl">Lien vers le dossier de photos (Drive, iCloud...)</label>
            <input 
              type="text" 
              id="cabinetPhotosUrl" 
              name="cabinetPhotosUrl" 
              placeholder="Ex : https://drive.google.com/..." 
              value={branding.cabinetPhotosUrl || ''} 
              onChange={handleChange} 
            />
          </div>
        )}

        <div className="form-field">
          <label>Avez-vous des photos de vous en action avec des patients ? *</label>
          <div className="radio-group" style={{ flexDirection: 'row', gap: '2rem' }}>
            <label className="radio-label">
              <input 
                type="radio" 
                name="hasActionPhotos" 
                value="yes"
                checked={branding.hasActionPhotos === 'yes'}
                onChange={handleChange}
                required
              />
              Oui
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="hasActionPhotos" 
                value="no"
                checked={branding.hasActionPhotos === 'no'}
                onChange={handleChange}
              />
              Non
            </label>
          </div>
        </div>

        {branding.hasActionPhotos === 'yes' && (
          <div className="form-field animate-slide-up">
            <label htmlFor="actionPhotosUrl">Lien vers les photos en action</label>
            <input 
              type="text" 
              id="actionPhotosUrl" 
              name="actionPhotosUrl" 
              placeholder="Ex : https://drive.google.com/..." 
              value={branding.actionPhotosUrl || ''} 
              onChange={handleChange} 
            />
          </div>
        )}

        <div className="form-field">
          <label>Présence sur les photos *</label>
          <select 
            name="appearInPhotos" 
            value={branding.appearInPhotos || ''} 
            onChange={handleChange}
            required
          >
            <option value="" disabled>Sélectionnez une préférence</option>
            <option value="comfortable">Je suis à l'aise sur les photos</option>
            <option value="discreet">Je préfère qu'on ne me voie pas trop</option>
            <option value="undecided">Je ne sais pas encore</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="videoUrl">Lien vidéo de présentation (si existante)</label>
          <p className="help-text">Une courte vidéo de vous qui présente le cabinet (Lien YouTube, Vimeo, Drive...)</p>
          <input 
            type="text" 
            id="videoUrl" 
            name="videoUrl" 
            placeholder="Ex : https://youtube.com/watch?v=..." 
            value={branding.videoUrl || ''} 
            onChange={handleChange} 
          />
        </div>
      </div>

      <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)' }}>
          Langues
        </h3>

        <div className="form-field">
          <label htmlFor="languagePreference">Préférence de langue du site *</label>
          <select 
            id="languagePreference" 
            name="languagePreference" 
            value={branding.languagePreference || 'french'} 
            onChange={handleChange}
            required
          >
            <option value="french">Français uniquement</option>
            <option value="english">Anglais uniquement</option>
            <option value="bilingual">Bilingue (Français / Anglais)</option>
          </select>
        </div>
      </div>

      <div className="form-field">
        <label>Quel style d'images préférez-vous ? (Plusieurs choix possibles)</label>
        <div className="checkbox-group">
          {IMAGE_STYLE_OPTIONS.map((style) => (
            <label key={style} className="checkbox-label">
              <input
                type="checkbox"
                checked={branding.imageStyle.includes(style)}
                onChange={() => handleImageStyleCheckbox(style)}
              />
              {style}
            </label>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Step6Branding;
