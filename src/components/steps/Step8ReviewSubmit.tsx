import React, { useState } from 'react';
import { useFormState } from '../../context/FormProvider';
import StepNavigation from '../layout/StepNavigation';

export const Step8ReviewSubmit: React.FC = () => {
  const { formData, goToStep } = useFormState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.contact.firstName || !formData.contact.lastName || !formData.contact.email) {
      setSubmitError("Veuillez remplir vos informations de contact à l'étape 1.");
      return;
    }
    if (formData.services.length === 0) {
      setSubmitError("Veuillez ajouter au moins une prestation à l'étape 3.");
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    const payload = {
      meta: {
        formVersion: 'v1',
        submittedAt: new Date().toISOString(),
        source: 'landing-brief-kine'
      },
      ...formData,
      objectifAutreDetail: formData.siteGoals.objectifAutreDetail,
      publicCibleAutreDetail: formData.targetAudience.publicCibleAutreDetail,
      couleursPersonnalisees: formData.branding.couleursPersonnalisees
    };

    try {
      const response = await fetch('https://n8n.crozier-pierre.fr/webhook/landing-ia-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l’envoi au serveur.');
      }

      setSubmitSuccess(true);
    } catch (err: any) {
      setSubmitError(err.message || "Une erreur inconnue s'est produite lors de l'envoi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="animate-slide-up" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <div style={{ backgroundColor: '#ccfbf1', color: '#0f766e', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem' }}>
          ✓
        </div>
        <h2 className="step-title" style={{ color: 'var(--primary-color)' }}>Félicitations !</h2>
        <p className="step-description" style={{ marginBottom: '1rem' }}>Votre brief a été envoyé avec succès.</p>
        <p style={{ color: 'var(--text-muted)' }}>Nous reviendrons vers vous très vite avec une proposition pour votre page de présentation. Vous pouvez maintenant fermer cette page.</p>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <h2 className="step-title">Étape 8 : Récapitulatif & Envoi</h2>
      <p className="step-description">Vérifiez les informations avant d'envoyer votre brief de landing page.</p>

      {submitError && (
        <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #fecaca' }}>
          <strong>Erreur : </strong> {submitError}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
        
        <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)' }}>Contact</h3>
            <button type="button" onClick={() => goToStep(1)} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', textDecoration: 'underline' }}>Modifier</button>
          </div>
          <p><strong>Nom :</strong> {formData.contact.firstName} {formData.contact.lastName}</p>
          <p><strong>Email :</strong> {formData.contact.email}</p>
          <p><strong>Cabinet :</strong> {formData.contact.practiceName || '-'}</p>
        </div>

        <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)' }}>Objectifs & Cibles</h3>
            <button type="button" onClick={() => goToStep(2)} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', textDecoration: 'underline' }}>Modifier</button>
          </div>
          <p><strong>Objectif principal :</strong> {formData.siteGoals.mainGoal || '-'}</p>
          <p><strong>Cibles :</strong> {formData.targetAudience.audiences.join(', ') || '-'}</p>
          <p><strong>Action (CTA) :</strong> {formData.targetAudience.mainAction || '-'}</p>
        </div>

        <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)' }}>Prestations ({formData.services.length})</h3>
            <button type="button" onClick={() => goToStep(3)} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', textDecoration: 'underline' }}>Modifier</button>
          </div>
          {formData.services.length === 0 ? (
            <p style={{ color: 'var(--error-color)' }}>Aucune prestation renseignée.</p>
          ) : (
            <ul style={{ paddingLeft: '1.2rem' }}>
              {formData.services.map((s) => (
                <li key={s.id}>
                  <strong>{s.name}</strong> <br/>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{s.price || 'Prix non défini'} - {s.duration || 'Durée non définie'}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
             <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)' }}>Charte graphique</h3>
             <button type="button" onClick={() => goToStep(6)} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', textDecoration: 'underline' }}>Modifier</button>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '24px', height: '24px', backgroundColor: formData.branding.primaryColor, border: '1px solid #ccc', borderRadius: '4px' }}></span>
              Primaire
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '24px', height: '24px', backgroundColor: formData.branding.secondaryColor, border: '1px solid #ccc', borderRadius: '4px' }}></span>
              Secondaire
            </div>
            {formData.branding.couleursPersonnalisees.map((color, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '24px', height: '24px', backgroundColor: color.hex, border: '1px solid #ccc', borderRadius: '4px' }}></span>
                {color.nom || `Couleur ${idx + 1}`}
              </div>
            ))}
          </div>
        </div>

      </div>

      <StepNavigation onNext={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

export default Step8ReviewSubmit;
