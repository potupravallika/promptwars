import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Languages,
  FileText,
  Sparkles,
  AlertOctagon,
  ShieldAlert,
  Info,
  Thermometer,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Key,
  CalendarCheck,
} from 'lucide-react';
import { LANGUAGES, UI_STRINGS } from '../data/translations';
import { MEDICINE_DATABASE } from '../data/medicineDb';
import { speechHelper } from '../utils/speech';
import { getUserGeminiKey, setUserGeminiKey } from '../utils/reminderStorage';

export default function MultilingualExplanation({
  currentLang,
  onLanguageChange,
  scannedData,
  onNavigateToSchedule,
}) {
  const t = UI_STRINGS[currentLang] || UI_STRINGS.en;

  // Selected medicine for explanation
  const [selectedMedId, setSelectedMedId] = useState(
    scannedData?.medicine?.id || 'paracetamol'
  );
  const [rawScannedText, setRawScannedText] = useState(scannedData?.rawText || '');

  // Speech state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechError, setSpeechError] = useState('');
  const [hasVoice, setHasVoice] = useState(true);

  // Optional AI API key drawer
  const [showAiSettings, setShowAiSettings] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState(getUserGeminiKey());
  const [customAiExplanation, setCustomAiExplanation] = useState(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiError, setAiError] = useState('');
  const [keySavedFeedback, setKeySavedFeedback] = useState(false);

  // Sync if new scanned data arrives
  useEffect(() => {
    if (scannedData?.medicine) {
      setSelectedMedId(scannedData.medicine.id);
    }
    if (scannedData?.rawText) {
      setRawScannedText(scannedData.rawText);
    }
  }, [scannedData]);

  // Check voice availability for selected language
  useEffect(() => {
    const available = speechHelper.hasVoiceFor(currentLang);
    setHasVoice(available);
    speechHelper.stop();
    setIsSpeaking(false);
  }, [currentLang]);

  // Stop speaking on unmount
  useEffect(() => {
    return () => {
      speechHelper.stop();
    };
  }, []);

  const activeMed = MEDICINE_DATABASE.find((m) => m.id === selectedMedId) || MEDICINE_DATABASE[0];
  const medInfo = activeMed.multilingual[currentLang] || activeMed.multilingual.en;

  // Construct text to be read aloud in selected language
  const textToRead = `${activeMed.name}. ${t.explanation.activeIngredient}: ${medInfo.activeSalt}. ${t.explanation.commonUses}: ${medInfo.purpose}. ${t.explanation.storageInstructions}: ${medInfo.storage}. ${t.explanation.manufacturerWarnings}: ${medInfo.packagingWarnings}`;

  const handleToggleSpeak = () => {
    setSpeechError('');
    if (isSpeaking) {
      speechHelper.stop();
      setIsSpeaking(false);
      return;
    }

    speechHelper.speak({
      text: textToRead,
      langCode: currentLang,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: (err) => {
        setIsSpeaking(false);
        setSpeechError(t.explanation.speechNotSupported);
      },
    });
  };

  const handleSaveApiKey = () => {
    setUserGeminiKey(geminiApiKey);
    setKeySavedFeedback(true);
    setTimeout(() => setKeySavedFeedback(false), 3000);
  };

  const handleClearApiKey = () => {
    setGeminiApiKey('');
    setUserGeminiKey('');
    setCustomAiExplanation(null);
    setAiError('');
  };

  // Optional live Gemini AI analysis if user enters personal API key
  const handleRunAiAnalysis = async () => {
    const key = getUserGeminiKey();
    if (!key) {
      setAiError('Please enter your personal Gemini API key first.');
      return;
    }
    setIsGeneratingAi(true);
    setAiError('');
    try {
      const prompt = `You are a medical information assistant for educational clarity.
Explain the following medicine label for a patient in simple ${LANGUAGES.find((l) => l.code === currentLang)?.name || 'English'}.
Safety Rules:
- Never diagnose conditions.
- Never guess or prescribe custom dosage.
- Recommend consulting a prescribing doctor or pharmacist.
- Highlight visible packaging warnings.

Medicine: ${activeMed.name}
Label text:
${rawScannedText || activeMed.standardLabelText}

Format your response in simple paragraphs.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error?.message || `API error (${response.status})`);
      }

      const resData = await response.json();
      const generatedText = resData.candidates?.[0]?.content?.parts?.[0]?.text;
      if (generatedText) {
        setCustomAiExplanation(generatedText);
      } else {
        throw new Error('No explanation returned by AI.');
      }
    } catch (err) {
      setAiError(`AI Integration Notice: ${err.message}`);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div className="explanation-root">
      {/* Top Header Card */}
      <div className="tab-header-card">
        <div className="tab-header-icon-box bg-navy-soft">
          <Languages size={24} className="text-navy" />
        </div>
        <div className="flex-1">
          <h1 className="tab-page-title">{t.explanation.title}</h1>
          <p className="tab-page-subtitle">{t.explanation.subtitle}</p>
        </div>

        {/* Language selector chips for instant switching */}
        <div className="lang-quick-switch-strip">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => onLanguageChange(lang.code)}
              className={`lang-chip ${currentLang === lang.code ? 'active' : ''}`}
            >
              {lang.native}
            </button>
          ))}
        </div>
      </div>

      {/* Medicine Picker / Scanned Info Bar */}
      <div className="explanation-selector-bar">
        <div className="selector-bar-left">
          <span className="selector-label">{t.explanation.selectSampleToExplain}</span>
          <div className="med-buttons-wrap">
            {MEDICINE_DATABASE.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setSelectedMedId(m.id);
                  setRawScannedText('');
                  setCustomAiExplanation(null);
                  speechHelper.stop();
                  setIsSpeaking(false);
                }}
                className={`med-pill-btn ${selectedMedId === m.id ? 'active' : ''}`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        {/* Read Aloud Button */}
        <div className="tts-action-wrap">
          <button
            type="button"
            onClick={handleToggleSpeak}
            className={`tts-button ${isSpeaking ? 'tts-speaking' : ''}`}
            aria-label="Read explanation aloud"
          >
            {isSpeaking ? (
              <>
                <VolumeX size={19} />
                <span>{t.explanation.stopAudio}</span>
                <div className="voice-waves">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </>
            ) : (
              <>
                <Volume2 size={19} />
                <span>{t.explanation.readAloud}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Voice Support Notice if speech synthesis voice is unavailable */}
      {!hasVoice && (
        <div className="speech-notice-banner">
          <Info size={16} />
          <span>
            Browser voice for {LANGUAGES.find((l) => l.code === currentLang)?.name} may not be installed on this OS. Read-aloud will play in fallback voice or display as text below.
          </span>
        </div>
      )}

      {speechError && (
        <div className="speech-notice-banner bg-amber-soft">
          <AlertOctagon size={16} className="text-amber" />
          <span>{speechError}</span>
        </div>
      )}

      {/* Main Dual-Column Comparison: Label vs Educational Explanation */}
      <div className="explanation-columns-grid">
        {/* Card 1: What was found on the Label */}
        <div className="expl-card label-data-card">
          <div className="expl-card-header">
            <div className="badge-chip badge-label">
              <FileText size={14} />
              <span>{t.explanation.badgeLabel}</span>
            </div>
            <span className="text-xs text-muted">Manufacturer Printed Text</span>
          </div>

          <h3 className="expl-section-title">{t.explanation.labelSectionTitle}</h3>
          <p className="expl-section-sub">{t.explanation.labelSectionSubtitle}</p>

          <div className="label-raw-box">
            <pre className="label-pre">
              {rawScannedText || activeMed.standardLabelText}
            </pre>
          </div>

          <div className="label-meta-tags">
            <span className="meta-tag">Dosage Form: <strong>{activeMed.form}</strong></span>
            <span className="meta-tag">Class: <strong>{activeMed.category}</strong></span>
          </div>

          <div className="expl-action-box">
            <button
              type="button"
              onClick={() =>
                onNavigateToSchedule({
                  medicineName: activeMed.name,
                  form: activeMed.form,
                  specialInstructions: medInfo.foodRecommendation,
                })
              }
              className="secondary-btn w-full justify-center"
            >
              <CalendarCheck size={16} />
              <span>{t.scanner.actionSchedule}</span>
            </button>
          </div>
        </div>

        {/* Card 2: Simple Language Medical Explanation */}
        <div className="expl-card medical-expl-card">
          <div className="expl-card-header">
            <div className="badge-chip badge-ai">
              <Sparkles size={14} />
              <span>{t.explanation.badgeAi}</span>
            </div>
            <span className="text-xs text-muted">Educational Summary (Not Prescriptive)</span>
          </div>

          <h3 className="expl-section-title">{t.explanation.generalSectionTitle}</h3>
          <p className="expl-section-sub">{t.explanation.generalSectionSubtitle}</p>

          <div className="expl-items-list">
            {/* Active Salt */}
            <div className="expl-item-box">
              <div className="expl-item-title-row">
                <CheckCircle2 size={16} className="text-teal" />
                <span className="expl-item-title">{t.explanation.activeIngredient}</span>
              </div>
              <p className="expl-item-text">{medInfo.activeSalt}</p>
            </div>

            {/* Common Purpose */}
            <div className="expl-item-box">
              <div className="expl-item-title-row">
                <Info size={16} className="text-blue" />
                <span className="expl-item-title">{t.explanation.commonUses}</span>
              </div>
              <p className="expl-item-text">{medInfo.purpose}</p>
              {medInfo.howItWorks && (
                <p className="expl-item-subtext">{medInfo.howItWorks}</p>
              )}
            </div>

            {/* Packaging & Safety Warnings */}
            <div className="expl-item-box bg-rose-tint">
              <div className="expl-item-title-row text-rose">
                <ShieldAlert size={16} />
                <span className="expl-item-title">{t.explanation.manufacturerWarnings}</span>
              </div>
              <p className="expl-item-text text-dark font-medium">{medInfo.packagingWarnings}</p>
            </div>

            {/* Storage Instructions */}
            <div className="expl-item-box">
              <div className="expl-item-title-row">
                <Thermometer size={16} className="text-teal" />
                <span className="expl-item-title">{t.explanation.storageInstructions}</span>
              </div>
              <p className="expl-item-text">{medInfo.storage}</p>
            </div>

            {/* Relation to Food */}
            <div className="expl-item-box">
              <div className="expl-item-title-row">
                <CheckCircle2 size={16} className="text-emerald" />
                <span className="expl-item-title">Food & Timing Guidelines</span>
              </div>
              <p className="expl-item-text">{medInfo.foodRecommendation}</p>
            </div>

            {/* Red Flag Symptoms */}
            <div className="expl-item-box bg-amber-tint">
              <div className="expl-item-title-row text-amber-deep">
                <AlertOctagon size={16} />
                <span className="expl-item-title">{t.explanation.redFlags}</span>
              </div>
              <p className="expl-item-text">{t.explanation.redFlagsContent}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Gemini AI Integration Drawer */}
      <div className="ai-settings-collapsible">
        <button
          type="button"
          onClick={() => setShowAiSettings(!showAiSettings)}
          className="ai-collapsible-trigger"
        >
          <div className="flex items-center gap-2">
            <Key size={17} className="text-teal" />
            <span className="font-semibold text-sm">{t.explanation.aiSettingsTitle}</span>
          </div>
          {showAiSettings ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {showAiSettings && (
          <div className="ai-settings-drawer-content">
            <p className="ai-drawer-desc">{t.explanation.aiSettingsDesc}</p>
            <div className="ai-key-input-row">
              <input
                type="password"
                placeholder={t.explanation.apiKeyPlaceholder}
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                className="ai-key-input"
              />
              <button
                type="button"
                onClick={handleSaveApiKey}
                className="primary-btn"
              >
                {t.explanation.saveApiKey}
              </button>
              {geminiApiKey && (
                <button
                  type="button"
                  onClick={handleClearApiKey}
                  className="secondary-btn"
                >
                  {t.explanation.clearApiKey}
                </button>
              )}
            </div>

            {keySavedFeedback && (
              <span className="text-xs text-emerald font-semibold block mt-1">
                ✓ {t.explanation.apiKeySaved}
              </span>
            )}

            {geminiApiKey && (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={handleRunAiAnalysis}
                  disabled={isGeneratingAi}
                  className="secondary-btn"
                >
                  <Sparkles size={16} />
                  <span>{isGeneratingAi ? 'Analyzing with Gemini AI...' : 'Generate Live Custom AI Summary'}</span>
                </button>
              </div>
            )}

            {aiError && (
              <div className="error-alert-banner mt-2">
                <AlertOctagon size={16} />
                <span>{aiError}</span>
              </div>
            )}

            {customAiExplanation && (
              <div className="custom-ai-output-box mt-3">
                <div className="flex items-center gap-1 font-semibold text-teal text-sm mb-1">
                  <Sparkles size={15} />
                  <span>Live Gemini AI Medical Breakdown</span>
                </div>
                <div className="ai-markdown-text">{customAiExplanation}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
