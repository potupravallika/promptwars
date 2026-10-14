import React, { useState, useEffect } from 'react';
import {
  CalendarCheck,
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  User,
  Pill,
  X,
  Sparkles,
} from 'lucide-react';
import { UI_STRINGS } from '../data/translations';
import { soundFX } from '../utils/audio';

export default function PrescriptionSchedule({
  currentLang,
  prefillData,
  onSaveSchedule,
  soundEnabled,
}) {
  const t = UI_STRINGS[currentLang] || UI_STRINGS.en;

  // Form state
  const [medName, setMedName] = useState('');
  const [formType, setFormType] = useState('Tablet');
  const [doctorName, setDoctorName] = useState('');
  const [timingSlots, setTimingSlots] = useState({
    morning: true,
    afternoon: false,
    evening: false,
    night: true,
  });
  const [customTimes, setCustomTimes] = useState({
    morning: '08:00',
    afternoon: '13:00',
    evening: '18:00',
    night: '21:00',
  });
  const [foodTiming, setFoodTiming] = useState('afterFood');
  const [durationDays, setDurationDays] = useState(7);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Review confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isConfirmedByDoctorCheck, setIsConfirmedByDoctorCheck] = useState(false);
  const [formError, setFormError] = useState('');
  const [successBanner, setSuccessBanner] = useState(false);

  // Prefill if coming from scanner
  useEffect(() => {
    if (prefillData?.medicineName) {
      setMedName(prefillData.medicineName);
    }
    if (prefillData?.form) {
      setFormType(prefillData.form);
    }
    if (prefillData?.specialInstructions) {
      setSpecialInstructions(prefillData.specialInstructions);
    }
  }, [prefillData]);

  const handleSlotToggle = (slotKey) => {
    setTimingSlots((prev) => ({
      ...prev,
      [slotKey]: !prev[slotKey],
    }));
  };

  const handleTimeChange = (slotKey, timeVal) => {
    setCustomTimes((prev) => ({
      ...prev,
      [slotKey]: timeVal,
    }));
  };

  const handleInitiateSave = (e) => {
    e.preventDefault();
    setFormError('');

    if (!medName.trim()) {
      setFormError('Please enter the medicine name and strength.');
      return;
    }

    const hasAnySlot = Object.values(timingSlots).some(Boolean);
    if (!hasAnySlot) {
      setFormError('Please select at least one daily time slot (Morning, Afternoon, Evening, or Night).');
      return;
    }

    // Open mandatory confirmation modal
    setIsConfirmedByDoctorCheck(false);
    setShowConfirmModal(true);
  };

  const handleFinalConfirmSave = () => {
    if (!isConfirmedByDoctorCheck) return;

    const newSchedule = {
      id: `rx-${Date.now()}`,
      isSample: false,
      medicineName: medName.trim(),
      form: formType,
      doctorName: doctorName.trim() || 'Prescribing Doctor',
      timingSlots,
      times: customTimes,
      foodTiming,
      durationDays: Number(durationDays) || 7,
      specialInstructions: specialInstructions.trim(),
      createdAt: new Date().toISOString(),
    };

    onSaveSchedule(newSchedule);

    if (soundEnabled) {
      soundFX.playSuccessSound();
    }

    setShowConfirmModal(false);
    setSuccessBanner(true);

    // Reset form for next entry
    setMedName('');
    setDoctorName('');
    setSpecialInstructions('');
    setTimeout(() => setSuccessBanner(false), 5000);
  };

  return (
    <div className="schedule-root">
      {/* Header */}
      <div className="tab-header-card">
        <div className="tab-header-icon-box bg-indigo-soft">
          <CalendarCheck size={24} className="text-indigo" />
        </div>
        <div>
          <h1 className="tab-page-title">{t.schedule.title}</h1>
          <p className="tab-page-subtitle">{t.schedule.subtitle}</p>
        </div>
      </div>

      {/* Critical Medical Safety Banner */}
      <div className="safety-prominent-callout">
        <div className="callout-icon-circle">
          <ShieldAlert size={22} className="text-amber-deep" />
        </div>
        <div className="callout-text">
          <strong className="block text-dark font-bold text-sm">
            Strict Safety Protocol: Never Guess Dosage from Packaging Photos
          </strong>
          <p className="text-xs text-muted mt-0.5">
            Dosage and frequency depend strictly on your medical diagnosis, age, renal function, and doctor’s prescription.
            Always enter the exact directions provided by your licensed healthcare provider.
          </p>
        </div>
      </div>

      {successBanner && (
        <div className="success-banner-card">
          <CheckCircle2 size={20} className="text-emerald" />
          <span>{t.schedule.successMsg}</span>
        </div>
      )}

      {/* Main Prescription Entry Form */}
      <div className="schedule-form-card">
        <form onSubmit={handleInitiateSave} className="schedule-form">
          {/* Row 1: Medicine Name & Form */}
          <div className="form-grid-2">
            <div className="form-field-group">
              <label className="form-label" htmlFor="med-name">
                <Pill size={15} className="text-teal" />
                <span>{t.schedule.form.medName} *</span>
              </label>
              <input
                id="med-name"
                type="text"
                required
                value={medName}
                onChange={(e) => setMedName(e.target.value)}
                placeholder={t.schedule.form.medNamePlaceholder}
                className="form-input"
              />
            </div>

            <div className="form-field-group">
              <label className="form-label" htmlFor="med-form">
                <span>{t.schedule.form.formType}</span>
              </label>
              <select
                id="med-form"
                value={formType}
                onChange={(e) => setFormType(e.target.value)}
                className="form-select"
              >
                <option value="Tablet">{t.schedule.form.formTablet}</option>
                <option value="Capsule">{t.schedule.form.formCapsule}</option>
                <option value="Syrup">{t.schedule.form.formSyrup}</option>
                <option value="Drops">{t.schedule.form.formDrops}</option>
                <option value="Ointment">{t.schedule.form.formOintment}</option>
                <option value="Injection">{t.schedule.form.formInjection}</option>
              </select>
            </div>
          </div>

          {/* Row 2: Doctor / Clinic Name (Optional) */}
          <div className="form-field-group">
            <label className="form-label" htmlFor="doc-name">
              <User size={15} className="text-teal" />
              <span>{t.schedule.form.doctorName}</span>
            </label>
            <input
              id="doc-name"
              type="text"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              placeholder={t.schedule.form.doctorPlaceholder}
              className="form-input"
            />
          </div>

          {/* Row 3: Daily Timing Slots with Clock Times */}
          <div className="form-timing-section">
            <label className="form-label">
              <Clock size={15} className="text-teal" />
              <span>{t.schedule.form.frequency} (Select prescribed slots & clock time) *</span>
            </label>

            <div className="timing-slots-grid">
              {/* Morning */}
              <div className={`timing-slot-box ${timingSlots.morning ? 'selected' : ''}`}>
                <label className="slot-checkbox-label">
                  <input
                    type="checkbox"
                    checked={timingSlots.morning}
                    onChange={() => handleSlotToggle('morning')}
                  />
                  <span className="font-semibold">{t.schedule.form.morning}</span>
                </label>
                {timingSlots.morning && (
                  <div className="slot-time-input-wrap">
                    <span className="text-xs text-muted">Time:</span>
                    <input
                      type="time"
                      value={customTimes.morning}
                      onChange={(e) => handleTimeChange('morning', e.target.value)}
                      className="slot-time-picker"
                    />
                  </div>
                )}
              </div>

              {/* Afternoon */}
              <div className={`timing-slot-box ${timingSlots.afternoon ? 'selected' : ''}`}>
                <label className="slot-checkbox-label">
                  <input
                    type="checkbox"
                    checked={timingSlots.afternoon}
                    onChange={() => handleSlotToggle('afternoon')}
                  />
                  <span className="font-semibold">{t.schedule.form.afternoon}</span>
                </label>
                {timingSlots.afternoon && (
                  <div className="slot-time-input-wrap">
                    <span className="text-xs text-muted">Time:</span>
                    <input
                      type="time"
                      value={customTimes.afternoon}
                      onChange={(e) => handleTimeChange('afternoon', e.target.value)}
                      className="slot-time-picker"
                    />
                  </div>
                )}
              </div>

              {/* Evening */}
              <div className={`timing-slot-box ${timingSlots.evening ? 'selected' : ''}`}>
                <label className="slot-checkbox-label">
                  <input
                    type="checkbox"
                    checked={timingSlots.evening}
                    onChange={() => handleSlotToggle('evening')}
                  />
                  <span className="font-semibold">{t.schedule.form.evening}</span>
                </label>
                {timingSlots.evening && (
                  <div className="slot-time-input-wrap">
                    <span className="text-xs text-muted">Time:</span>
                    <input
                      type="time"
                      value={customTimes.evening}
                      onChange={(e) => handleTimeChange('evening', e.target.value)}
                      className="slot-time-picker"
                    />
                  </div>
                )}
              </div>

              {/* Night */}
              <div className={`timing-slot-box ${timingSlots.night ? 'selected' : ''}`}>
                <label className="slot-checkbox-label">
                  <input
                    type="checkbox"
                    checked={timingSlots.night}
                    onChange={() => handleSlotToggle('night')}
                  />
                  <span className="font-semibold">{t.schedule.form.night}</span>
                </label>
                {timingSlots.night && (
                  <div className="slot-time-input-wrap">
                    <span className="text-xs text-muted">Time:</span>
                    <input
                      type="time"
                      value={customTimes.night}
                      onChange={(e) => handleTimeChange('night', e.target.value)}
                      className="slot-time-picker"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Row 4: Relation to Food & Duration */}
          <div className="form-grid-2">
            <div className="form-field-group">
              <label className="form-label" htmlFor="food-timing">
                <span>{t.schedule.form.foodTiming}</span>
              </label>
              <select
                id="food-timing"
                value={foodTiming}
                onChange={(e) => setFoodTiming(e.target.value)}
                className="form-select"
              >
                <option value="afterFood">{t.schedule.form.afterFood}</option>
                <option value="beforeFood">{t.schedule.form.beforeFood}</option>
                <option value="withFood">{t.schedule.form.withFood}</option>
                <option value="asNeeded">{t.schedule.form.asNeeded}</option>
              </select>
            </div>

            <div className="form-field-group">
              <label className="form-label" htmlFor="duration-days">
                <span>{t.schedule.form.durationDays}</span>
              </label>
              <input
                id="duration-days"
                type="number"
                min="1"
                max="365"
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Row 5: Special Instructions */}
          <div className="form-field-group">
            <label className="form-label" htmlFor="instructions">
              <span>{t.schedule.form.specialInstructions}</span>
            </label>
            <input
              id="instructions"
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder={t.schedule.form.instructionsPlaceholder}
              className="form-input"
            />
          </div>

          {formError && (
            <div className="error-alert-banner">
              <AlertTriangle size={18} />
              <span>{formError}</span>
            </div>
          )}

          {/* Submit Action */}
          <div className="form-action-row">
            <button type="submit" className="primary-btn btn-lg w-full justify-center">
              <FileCheck size={19} />
              <span>Review & Save Prescription Schedule</span>
            </button>
          </div>
        </form>
      </div>

      {/* Mandatory Review & Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog-card">
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <ShieldAlert size={22} className="text-amber-deep" />
                <h3 className="modal-title">{t.schedule.confirmTitle}</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="modal-close-btn"
              >
                <X size={20} />
              </button>
            </div>

            <p className="modal-subtitle">{t.schedule.confirmDesc}</p>

            {/* Structured Prescription Summary */}
            <div className="confirm-summary-box">
              <div className="summary-item">
                <span className="summary-label">Medicine:</span>
                <span className="summary-val font-bold text-dark">{medName} ({formType})</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Doctor / Clinic:</span>
                <span className="summary-val">{doctorName || 'Prescribed by Doctor'}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Scheduled Slots:</span>
                <span className="summary-val font-semibold">
                  {Object.entries(timingSlots)
                    .filter(([, active]) => active)
                    .map(([slot]) => `${slot.toUpperCase()} (${customTimes[slot]})`)
                    .join(', ')}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Relation to Food:</span>
                <span className="summary-val">
                  {foodTiming === 'afterFood'
                    ? 'After Food'
                    : foodTiming === 'beforeFood'
                    ? 'Before Food (Empty Stomach)'
                    : foodTiming === 'withFood'
                    ? 'With Meal'
                    : 'SOS / As Needed'}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Course Duration:</span>
                <span className="summary-val">{durationDays} days</span>
              </div>
              {specialInstructions && (
                <div className="summary-item">
                  <span className="summary-label">Instructions:</span>
                  <span className="summary-val">{specialInstructions}</span>
                </div>
              )}
            </div>

            {/* Checkbox requirement */}
            <div className="confirm-checkbox-row">
              <label className="confirm-checkbox-label">
                <input
                  type="checkbox"
                  checked={isConfirmedByDoctorCheck}
                  onChange={(e) => setIsConfirmedByDoctorCheck(e.target.checked)}
                />
                <span className="text-sm font-semibold text-dark">
                  {t.schedule.confirmCheck}
                </span>
              </label>
            </div>

            <div className="modal-footer-btns">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="secondary-btn flex-1"
              >
                {t.schedule.cancelBtn}
              </button>
              <button
                type="button"
                disabled={!isConfirmedByDoctorCheck}
                onClick={handleFinalConfirmSave}
                className={`primary-btn flex-1 ${
                  !isConfirmedByDoctorCheck ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <CheckCircle2 size={18} />
                <span>{t.schedule.saveBtn}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
