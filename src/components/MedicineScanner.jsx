import React, { useState, useRef, useEffect } from 'react';
import {
  UploadCloud,
  Camera,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  ArrowRight,
  CalendarCheck,
  Languages,
  Eye,
  Info,
  Sliders,
} from 'lucide-react';
import { UI_STRINGS } from '../data/translations';
import { SAMPLE_LABELS } from '../data/sampleLabels';
import { processImageWithOCR } from '../utils/ocrService';
import { soundFX } from '../utils/audio';

export default function MedicineScanner({
  currentLang,
  onNavigateToExplain,
  onNavigateToSchedule,
  soundEnabled,
}) {
  const t = UI_STRINGS[currentLang] || UI_STRINGS.en;

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrStatus, setOcrStatus] = useState('');
  const [ocrProgress, setOcrProgress] = useState(0);

  // Result state
  const [extractedText, setExtractedText] = useState('');
  const [linesData, setLinesData] = useState([]);
  const [averageConfidence, setAverageConfidence] = useState(null);
  const [detectedMedicine, setDetectedMedicine] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Camera state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  const stopCameraStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const handleStartCamera = async () => {
    setErrorMsg('');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(t.scanner.cameraNotSupported);
      }
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      setIsCameraActive(false);
      setErrorMsg(err.message || t.scanner.cameraNotSupported);
    }
  };

  const handleCaptureCamera = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    stopCameraStream();
    handleRunOcr(dataUrl, 'camera-capture.jpg');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = (event) => {
      handleRunOcr(event.target.result, file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleSampleSelect = (sample) => {
    setErrorMsg('');
    stopCameraStream();
    handleRunOcr(sample.imageUrl, sample.name, sample.id);
  };

  const handleRunOcr = async (imageSource, imageName, sampleId = null) => {
    setSelectedImage(imageName);
    setImagePreviewUrl(imageSource);
    setIsProcessing(true);
    setOcrProgress(0.1);
    setOcrStatus(t.scanner.scanningInProgress);
    setErrorMsg('');

    try {
      const result = await processImageWithOCR(sampleId || imageSource, (progressInfo) => {
        setOcrStatus(progressInfo.status);
        setOcrProgress(progressInfo.progress);
      });

      setExtractedText(result.rawText);
      setLinesData(result.lines);
      setAverageConfidence(result.averageConfidence);
      setDetectedMedicine(result.detectedMedicine);

      if (result.hasUncertainText && soundEnabled) {
        soundFX.playWarningBeep();
      }
    } catch (err) {
      console.error('OCR failed', err);
      setErrorMsg(err.message || 'Failed to extract text from this image.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    stopCameraStream();
    setSelectedImage(null);
    setImagePreviewUrl(null);
    setExtractedText('');
    setLinesData([]);
    setAverageConfidence(null);
    setDetectedMedicine(null);
    setErrorMsg('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const uncertainCount = linesData.filter((l) => l.isUncertain).length;

  return (
    <div className="scanner-root">
      {/* Header */}
      <div className="tab-header-card">
        <div className="tab-header-icon-box bg-teal-soft">
          <FileText size={24} className="text-teal" />
        </div>
        <div>
          <h1 className="tab-page-title">{t.scanner.title}</h1>
          <p className="tab-page-subtitle">{t.scanner.subtitle}</p>
        </div>
      </div>

      {/* Main Scanner Layout */}
      <div className="scanner-grid">
        {/* Left Column: Image Input & Preview */}
        <div className="scanner-left-col">
          {/* Camera View */}
          {isCameraActive ? (
            <div className="camera-viewport-card">
              <video ref={videoRef} className="camera-video-elem" playsInline autoPlay muted />
              <div className="camera-overlay">
                <div className="scanner-guide-box"></div>
                <p className="camera-hint">Align medicine strip or label within the box</p>
              </div>
              <div className="camera-controls-bar">
                <button
                  type="button"
                  onClick={stopCameraStream}
                  className="camera-cancel-btn"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCaptureCamera}
                  className="camera-snap-btn"
                >
                  <Camera size={20} />
                  <span>Snap Photo</span>
                </button>
              </div>
            </div>
          ) : imagePreviewUrl ? (
            /* Scanned Image Preview */
            <div className="preview-display-card">
              <div className="preview-top-bar">
                <span className="preview-name truncate">{selectedImage || 'Uploaded Label'}</span>
                <button
                  onClick={handleReset}
                  className="btn-text-danger"
                  title="Clear image and re-scan"
                >
                  <RefreshCw size={14} />
                  <span>{t.scanner.clearImage}</span>
                </button>
              </div>
              <div className="preview-img-container">
                <img
                  src={imagePreviewUrl}
                  alt="Scanned Medicine Label"
                  className="preview-img"
                />
              </div>
            </div>
          ) : (
            /* Upload Drop Area */
            <div
              className="dropzone-card"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files && e.dataTransfer.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => handleRunOcr(ev.target.result, file.name);
                  reader.readAsDataURL(file);
                }
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <div className="dropzone-icon-bubble">
                <UploadCloud size={36} />
              </div>
              <h3 className="dropzone-title">{t.scanner.dropPrompt}</h3>
              <p className="dropzone-subtitle">{t.scanner.supportedFormats}</p>

              <div className="dropzone-btn-row">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current && fileInputRef.current.click();
                  }}
                  className="primary-btn"
                >
                  <UploadCloud size={17} />
                  <span>{t.scanner.uploadMode}</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartCamera();
                  }}
                  className="secondary-btn"
                >
                  <Camera size={17} />
                  <span>{t.scanner.cameraMode}</span>
                </button>
              </div>
            </div>
          )}

          {/* Quick Sample Presets */}
          <div className="sample-presets-card">
            <div className="presets-header">
              <Sparkles size={16} className="text-teal" />
              <span className="font-semibold text-sm">{t.scanner.samplePresetsTitle}</span>
            </div>
            <div className="sample-btn-stack">
              {SAMPLE_LABELS.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleSampleSelect(sample)}
                  className="sample-preset-btn"
                >
                  <div className="sample-btn-info">
                    <span className="sample-btn-title">{sample.name}</span>
                    <span className="sample-btn-badge">{sample.badge}</span>
                  </div>
                  <ArrowRight size={15} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: OCR Results & Text Editor */}
        <div className="scanner-right-col">
          {isProcessing ? (
            /* OCR Progress State */
            <div className="ocr-loading-card">
              <div className="loading-spinner-ring"></div>
              <h3 className="ocr-status-title">{ocrStatus}</h3>
              <p className="ocr-status-subtitle">
                Running in-browser computer vision model to isolate characters and words...
              </p>
              <div className="ocr-progress-bar-wrap">
                <div
                  className="ocr-progress-bar-fill"
                  style={{ width: `${Math.round(ocrProgress * 100)}%` }}
                ></div>
              </div>
              <span className="ocr-progress-text">{Math.round(ocrProgress * 100)}% complete</span>
            </div>
          ) : extractedText ? (
            /* OCR Extracted Text Result */
            <div className="ocr-result-card">
              <div className="result-header">
                <div>
                  <h3 className="result-title">{t.scanner.extractedTitle}</h3>
                  <p className="result-subtitle">{t.scanner.extractedSubtitle}</p>
                </div>
                {averageConfidence !== null && (
                  <div
                    className={`confidence-pill ${
                      averageConfidence >= 80 ? 'conf-high' : 'conf-low'
                    }`}
                  >
                    <span>Accuracy: {averageConfidence}%</span>
                  </div>
                )}
              </div>

              {/* Uncertainty Warning Banner if any line is flagged */}
              {uncertainCount > 0 && (
                <div className="uncertain-alert-banner">
                  <div className="uncertain-alert-header">
                    <AlertTriangle size={18} className="text-amber" />
                    <span className="font-semibold text-sm">
                      {uncertainCount} line(s) flagged as uncertain or partially unreadable
                    </span>
                  </div>
                  <p className="uncertain-alert-body">
                    {t.scanner.confidenceLow}
                  </p>
                </div>
              )}

              {/* Detected Medicine Match Banner */}
              {detectedMedicine && (
                <div className="detected-match-banner">
                  <div className="match-icon-box">
                    <CheckCircle2 size={18} className="text-emerald" />
                  </div>
                  <div className="match-details">
                    <span className="match-title">Recognized Active Compound:</span>
                    <strong className="match-name">{detectedMedicine.name}</strong>
                    <span className="match-salt text-xs">({detectedMedicine.activeSalt})</span>
                  </div>
                </div>
              )}

              {/* Line-by-Line Breakdown with Confidence Badges */}
              <div className="line-breakdown-section">
                <h4 className="line-breakdown-title">
                  <Sliders size={15} />
                  <span>Line-by-Line Readability Analysis</span>
                </h4>
                <div className="lines-list">
                  {linesData.map((line, idx) => (
                    <div
                      key={idx}
                      className={`line-item ${line.isUncertain ? 'line-uncertain' : 'line-verified'}`}
                    >
                      <div className="line-number-col">#{idx + 1}</div>
                      <div className="line-text-col">
                        <span className="line-content">{line.text}</span>
                        {line.isUncertain && line.reason && (
                          <span className="line-uncertain-reason">
                            ⚠️ {line.reason}
                          </span>
                        )}
                      </div>
                      <div className="line-conf-col">
                        <span
                          className={`line-conf-badge ${
                            line.confidence >= 80
                              ? 'badge-green'
                              : line.confidence >= 60
                              ? 'badge-amber'
                              : 'badge-red'
                          }`}
                        >
                          {line.confidence}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Editable Text Area for User Review & Correction */}
              <div className="editable-section">
                <div className="editable-header">
                  <label htmlFor="extracted-textarea" className="font-semibold text-sm">
                    Editable Label Content (Review and correct before proceeding):
                  </label>
                  <span className="text-xs text-muted">You can edit text directly</span>
                </div>
                <textarea
                  id="extracted-textarea"
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  className="extracted-textarea"
                  rows={8}
                />
              </div>

              {/* Primary Next Actions */}
              <div className="action-button-row">
                <button
                  type="button"
                  onClick={() =>
                    onNavigateToExplain({
                      rawText: extractedText,
                      medicine: detectedMedicine,
                    })
                  }
                  className="primary-btn btn-lg flex-1"
                >
                  <Languages size={18} />
                  <span>{t.scanner.actionExplain}</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onNavigateToSchedule({
                      medicineName: detectedMedicine ? detectedMedicine.name : extractedText.split('\n')[0] || '',
                      instructions: 'Review doctor prescription for exact timing.',
                    })
                  }
                  className="secondary-btn btn-lg"
                  title="Add to Prescription Schedule"
                >
                  <CalendarCheck size={18} />
                  <span>{t.scanner.actionSchedule}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="scanner-empty-card">
              <div className="scanner-empty-icon">
                <Eye size={44} />
              </div>
              <h3 className="empty-title">Ready to Scan Medicine Packaging</h3>
              <p className="empty-desc">
                Upload a photo or click one of the sample presets on the left. The app will extract visible
                text, evaluate character confidence, flag blurred or uncertain details, and enable multilingual explanation.
              </p>
              <div className="safety-box-mini">
                <Info size={16} className="text-teal flex-shrink-0" />
                <span>
                  Safety note: OCR extracts text as printed on the packaging. It does not replace your doctor's
                  personal prescription.
                </span>
              </div>
            </div>
          )}

          {/* Error Message if any */}
          {errorMsg && (
            <div className="error-alert-banner">
              <AlertTriangle size={18} />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
