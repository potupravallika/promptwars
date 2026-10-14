import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import MedicineScanner from './components/MedicineScanner';
import MultilingualExplanation from './components/MultilingualExplanation';
import PrescriptionSchedule from './components/PrescriptionSchedule';
import Reminders from './components/Reminders';
import MedicalSafetyModal from './components/MedicalSafetyModal';
import {
  getStoredSchedules,
  saveStoredSchedules,
  getTakenLogs,
  markReminderTaken,
  getTodayKey,
  sendBrowserNotification,
} from './utils/reminderStorage';
import { soundFX } from './utils/audio';
import { Bell, CheckCircle2, X } from 'lucide-react';
import './App.css';

export default function App() {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('medbridge_lang') || 'en';
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [schedules, setSchedules] = useState(getStoredSchedules);
  const [takenLogs, setTakenLogs] = useState(getTakenLogs);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [safetyModalOpen, setSafetyModalOpen] = useState(false);

  // Cross-tab data sharing
  const [scannedPayload, setScannedPayload] = useState(null);
  const [schedulePrefill, setSchedulePrefill] = useState(null);

  // In-app alert for currently due medication
  const [activeDueAlert, setActiveDueAlert] = useState(null);

  // Save language preference
  const handleLanguageChange = (langCode) => {
    setCurrentLang(langCode);
    try {
      localStorage.setItem('medbridge_lang', langCode);
    } catch {
      // Ignore
    }
  };

  // Save new schedule
  const handleSaveSchedule = (newSchedule) => {
    const updated = [newSchedule, ...schedules];
    setSchedules(updated);
    saveStoredSchedules(updated);
    setActiveTab('reminders');
  };

  // Delete schedule
  const handleDeleteSchedule = (scheduleId) => {
    const updated = schedules.filter((s) => s.id !== scheduleId);
    setSchedules(updated);
    saveStoredSchedules(updated);
  };

  // Mark dose taken/pending
  const handleMarkTaken = (itemKey, taken) => {
    const updatedToday = markReminderTaken(itemKey, taken);
    setTakenLogs({
      ...takenLogs,
      [getTodayKey()]: updatedToday,
    });
    // Dismiss due banner if it matches
    if (activeDueAlert && activeDueAlert.itemKey === itemKey && taken) {
      setActiveDueAlert(null);
    }
  };

  // Navigation callbacks
  const handleNavigateToExplain = (data) => {
    setScannedPayload(data);
    setActiveTab('explanation');
  };

  const handleNavigateToSchedule = (prefill) => {
    setSchedulePrefill(prefill);
    setActiveTab('schedule');
  };

  // Real-time dose monitor: checks every 30 seconds for upcoming or due doses
  useEffect(() => {
    const checkDueMedicines = () => {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${currentHours}:${currentMinutes}`;
      const todayKey = getTodayKey();
      const todayTaken = takenLogs[todayKey] || {};

      for (const sch of schedules) {
        for (const slot of ['morning', 'afternoon', 'evening', 'night']) {
          if (sch.timingSlots && sch.timingSlots[slot]) {
            const timeStr = (sch.times && sch.times[slot]) || (
              slot === 'morning' ? '08:00' :
              slot === 'afternoon' ? '13:00' :
              slot === 'evening' ? '18:00' : '21:00'
            );
            const itemKey = `${sch.id}_${slot}`;

            // If time matches within current minute and not already taken
            if (timeStr === currentTimeStr && !todayTaken[itemKey]) {
              setActiveDueAlert({
                itemKey,
                medicineName: sch.medicineName,
                timeStr,
                instructions: sch.specialInstructions || 'Take with water as prescribed.',
              });

              if (soundEnabled) {
                soundFX.playReminderChime();
              }

              sendBrowserNotification(
                `Medicine Due Now: ${sch.medicineName}`,
                `Scheduled for ${timeStr}. ${sch.specialInstructions || 'Please take as prescribed.'}`
              );
              return;
            }
          }
        }
      }
    };

    checkDueMedicines();
    const interval = setInterval(checkDueMedicines, 30000);
    return () => clearInterval(interval);
  }, [schedules, takenLogs, soundEnabled]);

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenSafetyModal={() => setSafetyModalOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Floating In-App Reminder Due Banner */}
      {activeDueAlert && (
        <div className="in-app-due-toast">
          <div className="due-toast-left">
            <div className="due-icon-pulse">
              <Bell size={18} />
            </div>
            <div>
              <span className="due-toast-title">Medication Due Now! ({activeDueAlert.timeStr})</span>
              <p className="due-toast-sub">
                <strong>{activeDueAlert.medicineName}</strong> - {activeDueAlert.instructions}
              </p>
            </div>
          </div>
          <div className="due-toast-right">
            <button
              onClick={() => handleMarkTaken(activeDueAlert.itemKey, true)}
              className="primary-btn btn-sm"
            >
              <CheckCircle2 size={15} />
              <span>Mark Taken</span>
            </button>
            <button
              onClick={() => setActiveDueAlert(null)}
              className="toast-close-btn"
              title="Dismiss for now"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Main Tab Content */}
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <Dashboard
            currentLang={currentLang}
            onNavigate={setActiveTab}
            schedules={schedules}
            takenLogs={takenLogs}
            onOpenSafetyModal={() => setSafetyModalOpen(true)}
          />
        )}

        {activeTab === 'scanner' && (
          <MedicineScanner
            currentLang={currentLang}
            onNavigateToExplain={handleNavigateToExplain}
            onNavigateToSchedule={handleNavigateToSchedule}
            soundEnabled={soundEnabled}
          />
        )}

        {activeTab === 'explanation' && (
          <MultilingualExplanation
            currentLang={currentLang}
            onLanguageChange={handleLanguageChange}
            scannedData={scannedPayload}
            onNavigateToSchedule={handleNavigateToSchedule}
          />
        )}

        {activeTab === 'schedule' && (
          <PrescriptionSchedule
            currentLang={currentLang}
            prefillData={schedulePrefill}
            onSaveSchedule={handleSaveSchedule}
            soundEnabled={soundEnabled}
          />
        )}

        {activeTab === 'reminders' && (
          <Reminders
            currentLang={currentLang}
            schedules={schedules}
            takenLogs={takenLogs}
            onMarkTaken={handleMarkTaken}
            onDeleteSchedule={handleDeleteSchedule}
            onNavigateToSchedule={() => setActiveTab('schedule')}
            soundEnabled={soundEnabled}
          />
        )}

        {activeTab === 'safety' && (
          <div className="safety-page-view">
            <div className="tab-header-card">
              <h1 className="tab-page-title">Medical Safety Standards & Clinical Guidelines</h1>
              <p className="tab-page-subtitle">
                MedBridge AI is committed to preventing medication errors and fostering patient safety.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSafetyModalOpen(true)}
              className="primary-btn mt-4"
            >
              Open Safety Guidelines & Emergency Numbers
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer-root">
        <div className="footer-container">
          <div className="footer-left">
            <strong className="text-teal font-bold">MedBridge AI</strong>
            <span className="footer-pipe">|</span>
            <span className="text-muted">Understand your medicine. In your language.</span>
          </div>
          <div className="footer-right">
            <button
              onClick={() => setSafetyModalOpen(true)}
              className="footer-safety-link"
            >
              Medical Safety Guidelines
            </button>
            <span className="footer-pipe">|</span>
            <span className="text-xs text-muted">
              Emergency Helpline: <strong>112</strong> • Poison Control: <strong>1800-116-117</strong>
            </span>
          </div>
        </div>
      </footer>

      {/* Medical Safety Modal */}
      <MedicalSafetyModal
        isOpen={safetyModalOpen}
        onClose={() => setSafetyModalOpen(false)}
        currentLang={currentLang}
      />
    </div>
  );
}
