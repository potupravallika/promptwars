import React from 'react';
import {
  ShieldAlert,
  X,
  PhoneCall,
  AlertTriangle,
  HeartPulse,
  CheckCircle2,
  HelpCircle,
  FileText,
} from 'lucide-react';
import { UI_STRINGS } from '../data/translations';

export default function MedicalSafetyModal({ isOpen, onClose, currentLang }) {
  if (!isOpen) return null;
  const t = UI_STRINGS[currentLang] || UI_STRINGS.en;

  const safetyGuidelines = t.safety?.rules || [
    {
      title: '1. Never Alter Prescribed Doses',
      desc: 'Never change dosage or timing on your own based on packaging text or AI summaries. Only your prescribing physician can adjust doses.',
    },
    {
      title: '2. Photos Cannot Determine Dosage',
      desc: 'Packaging strips do not know your age, kidney function, weight, or medical history. Never guess dosing from photos alone.',
    },
    {
      title: '3. Flagging Unclear Information',
      desc: 'If a strip is cut, smudged, expired, or uncertain, DO NOT TAKE IT. Bring the physical package to a licensed pharmacist.',
    },
    {
      title: '4. Non-Verified Information Disclaimer',
      desc: 'Label recognition and AI explanations are educational. They are not guaranteed official manufacturer endorsements.',
    },
  ];

  return (
    <div className="modal-backdrop">
      <div className="safety-modal-card">
        {/* Header */}
        <div className="safety-modal-header">
          <div className="flex items-center gap-2">
            <div className="safety-badge-icon">
              <ShieldAlert size={22} className="text-white" />
            </div>
            <div>
              <h2 className="safety-modal-title">Medical Safety & Responsibility Guide</h2>
              <span className="text-xs text-white/80">MedBridge AI Clinical Assistance Standards</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="modal-close-btn-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="safety-modal-body">
          {/* Emergency Hotlines Box */}
          <div className="emergency-hotlines-box">
            <div className="flex items-center gap-2 mb-2">
              <PhoneCall size={18} className="text-rose" />
              <strong className="text-sm font-bold text-rose-deep">
                Immediate Emergency & Poison Control Contacts
              </strong>
            </div>
            <div className="hotlines-grid">
              <div className="hotline-card">
                <span className="hotline-number">112</span>
                <span className="hotline-desc">National Emergency Response (All States)</span>
              </div>
              <div className="hotline-card">
                <span className="hotline-number">1800-116-117</span>
                <span className="hotline-desc">National Poison Information Centre (AIIMS)</span>
              </div>
              <div className="hotline-card">
                <span className="hotline-number">108</span>
                <span className="hotline-desc">Emergency Medical & Ambulance Transport</span>
              </div>
            </div>
          </div>

          {/* Core Safety Directives */}
          <div className="safety-rules-list">
            <h3 className="safety-section-heading">Core Medical Directives</h3>
            {safetyGuidelines.map((rule, idx) => (
              <div key={idx} className="safety-rule-item">
                <div className="rule-number-bullet">{idx + 1}</div>
                <div>
                  <h4 className="safety-rule-title">{rule.title}</h4>
                  <p className="safety-rule-desc">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Anaphylaxis / Severe Allergy Warning */}
          <div className="allergy-redflag-box">
            <div className="flex items-start gap-2">
              <AlertTriangle size={20} className="text-rose flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs font-bold text-rose block">
                  RED FLAG: Suspected Severe Drug Allergy (Anaphylaxis)
                </strong>
                <p className="text-xs text-muted mt-1">
                  If you or someone else develops swelling of the lips, tongue, or throat, widespread hives,
                  sudden wheezing, or loss of consciousness after any medicine, seek IMMEDIATE EMERGENCY HOSPITAL CARE (dial 112).
                  Do not wait for an appointment.
                </p>
              </div>
            </div>
          </div>

          {/* Pharmacist Consultation Recommendation */}
          <div className="pharmacist-box">
            <HelpCircle size={18} className="text-teal flex-shrink-0 mt-0.5" />
            <p className="text-xs text-dark">
              When in doubt regarding illegible handwriting, damaged packaging, or missed doses,
              always consult a registered pharmacist or your prescribing doctor.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="safety-modal-footer">
          <button
            type="button"
            onClick={onClose}
            className="primary-btn w-full justify-center"
          >
            <CheckCircle2 size={18} />
            <span>I Understand & Agree to the Medical Safety Protocols</span>
          </button>
        </div>
      </div>
    </div>
  );
}
