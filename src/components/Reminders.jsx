import React, { useState, useEffect } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Bell,
  Trash2,
  Plus,
  Sun,
  Sunrise,
  Sunset,
  Moon,
  Info,
  Sparkles,
  RotateCcw,
  Pill,
  ShieldAlert,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UI_STRINGS } from '../data/translations';
import {
  getTodayKey,
  requestNotificationPermission,
  sendBrowserNotification,
} from '../utils/reminderStorage';
import { soundFX } from '../utils/audio';

export default function Reminders({
  currentLang,
  schedules = [],
  takenLogs = {},
  onMarkTaken,
  onDeleteSchedule,
  onNavigateToSchedule,
  soundEnabled,
}) {
  const t = UI_STRINGS[currentLang] || UI_STRINGS.en;
  const todayKey = getTodayKey();
  const todayTaken = takenLogs[todayKey] || {};

  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'pending' | 'taken'
  const [notificationStatus, setNotificationStatus] = useState(
    typeof window !== 'undefined' && 'Notification' in window
      ? Notification.permission
      : 'unsupported'
  );

  // Group all daily items by time slot
  const timeGroups = {
    morning: { label: t.reminders.morningGroup, icon: Sunrise, items: [] },
    afternoon: { label: t.reminders.afternoonGroup, icon: Sun, items: [] },
    evening: { label: t.reminders.eveningGroup, icon: Sunset, items: [] },
    night: { label: t.reminders.nightGroup, icon: Moon, items: [] },
  };

  schedules.forEach((sch) => {
    ['morning', 'afternoon', 'evening', 'night'].forEach((slot) => {
      if (sch.timingSlots && sch.timingSlots[slot]) {
        const timeStr = (sch.times && sch.times[slot]) || (
          slot === 'morning' ? '08:00' :
          slot === 'afternoon' ? '13:00' :
          slot === 'evening' ? '18:00' : '21:00'
        );
        const itemKey = `${sch.id}_${slot}`;
        const takenRecord = todayTaken[itemKey];
        const isTaken = Boolean(takenRecord);

        timeGroups[slot].items.push({
          itemKey,
          scheduleId: sch.id,
          medicineName: sch.medicineName,
          form: sch.form || 'Tablet',
          slot,
          timeStr,
          foodTiming: sch.foodTiming,
          specialInstructions: sch.specialInstructions,
          doctorName: sch.doctorName,
          isSample: sch.isSample,
          isTaken,
          takenAt: takenRecord?.takenAt,
        });
      }
    });
  });

  // Handle Mark as Taken with Confetti & Sound
  const handleMarkDose = (itemKey, taken) => {
    onMarkTaken(itemKey, taken);
    if (taken) {
      if (soundEnabled) {
        soundFX.playSuccessSound();
      }
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#0d9488', '#14b8a6', '#0284c7', '#10b981'],
        });
      } catch {
        // Fallback if canvas is unavailable
      }
    }
  };

  const handleRequestNotifications = async () => {
    const res = await requestNotificationPermission();
    if (res.granted) {
      setNotificationStatus('granted');
      sendBrowserNotification(
        'MedBridge AI Reminders Active',
        'You will now receive timely medication dosage notifications.'
      );
    } else {
      setNotificationStatus(res.supported ? 'denied' : 'unsupported');
    }
  };

  // Filter items
  const filterItem = (item) => {
    if (filterMode === 'pending') return !item.isTaken;
    if (filterMode === 'taken') return item.isTaken;
    return true;
  };

  const totalDosesToday = Object.values(timeGroups).reduce(
    (acc, g) => acc + g.items.length,
    0
  );
  const totalTakenToday = Object.values(timeGroups).reduce(
    (acc, g) => acc + g.items.filter((i) => i.isTaken).length,
    0
  );

  return (
    <div className="reminders-root">
      {/* Header */}
      <div className="tab-header-card">
        <div className="tab-header-icon-box bg-emerald-soft">
          <Clock size={24} className="text-emerald" />
        </div>
        <div className="flex-1">
          <h1 className="tab-page-title">{t.reminders.title}</h1>
          <p className="tab-page-subtitle">{t.reminders.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onNavigateToSchedule}
          className="primary-btn"
        >
          <Plus size={17} />
          <span>{t.reminders.addQuick}</span>
        </button>
      </div>

      {/* Browser Notification Controls & Clear Limitations Warning */}
      <div className="notification-manager-card">
        <div className="notif-left">
          <div className="notif-bell-circle">
            <Bell size={20} className="text-teal" />
          </div>
          <div>
            <h4 className="notif-card-title">Browser Medication Notifications</h4>
            <p className="notif-card-sub">
              {notificationStatus === 'granted'
                ? t.reminders.notificationsEnabled
                : 'Receive desktop / phone alerts when a scheduled medicine dose is due.'}
            </p>
          </div>
        </div>

        <div className="notif-right">
          {notificationStatus !== 'granted' ? (
            <button
              type="button"
              onClick={handleRequestNotifications}
              className="primary-btn btn-sm"
            >
              <Bell size={15} />
              <span>{t.reminders.enableNotifications}</span>
            </button>
          ) : (
            <span className="notif-active-badge">
              <CheckCircle2 size={15} /> Active
            </span>
          )}
        </div>
      </div>

      {/* Mandatory Notification Limitation Banner */}
      <div className="browser-limitation-banner">
        <Info size={16} className="text-teal flex-shrink-0" />
        <span className="text-xs">{t.reminders.notificationWarning}</span>
      </div>

      {/* Filter Tabs & Stats Bar */}
      <div className="reminders-toolbar">
        <div className="filter-pill-group">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`filter-btn ${filterMode === 'all' ? 'active' : ''}`}
          >
            {t.reminders.filterAll} ({totalDosesToday})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('pending')}
            className={`filter-btn ${filterMode === 'pending' ? 'active' : ''}`}
          >
            {t.reminders.filterPending} ({totalDosesToday - totalTakenToday})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('taken')}
            className={`filter-btn ${filterMode === 'taken' ? 'active' : ''}`}
          >
            {t.reminders.filterTaken} ({totalTakenToday})
          </button>
        </div>

        <div className="daily-progress-pill">
          <span>Today: <strong>{totalTakenToday}</strong> / {totalDosesToday} completed</span>
        </div>
      </div>

      {/* Time-Grouped Daily Schedule */}
      {totalDosesToday === 0 ? (
        <div className="empty-state-card mt-4">
          <Pill size={42} className="empty-state-icon" />
          <h3 className="empty-state-title">{t.reminders.noReminders}</h3>
          <p className="empty-state-desc">
            Schedule your prescribed medicines with doctor's instructions to start tracking here.
          </p>
          <button
            type="button"
            onClick={onNavigateToSchedule}
            className="primary-btn mt-3"
          >
            <Plus size={16} />
            <span>Add Prescription Schedule</span>
          </button>
        </div>
      ) : (
        <div className="time-groups-stack">
          {Object.entries(timeGroups).map(([slotKey, group]) => {
            const visibleItems = group.items.filter(filterItem);
            if (visibleItems.length === 0 && filterMode !== 'all') return null;

            const SlotIcon = group.icon;

            return (
              <div key={slotKey} className="time-group-block">
                <div className="time-group-header">
                  <div className="flex items-center gap-2">
                    <div className="slot-header-icon-box">
                      <SlotIcon size={18} />
                    </div>
                    <h3 className="time-group-title">{group.label}</h3>
                  </div>
                  <span className="group-count-badge">
                    {group.items.filter((i) => i.isTaken).length}/{group.items.length} taken
                  </span>
                </div>

                {visibleItems.length === 0 ? (
                  <div className="group-empty-subcard">
                    <span className="text-xs text-muted">No medicines scheduled for this time slot.</span>
                  </div>
                ) : (
                  <div className="reminder-cards-grid">
                    {visibleItems.map((item) => (
                      <div
                        key={item.itemKey}
                        className={`reminder-card ${item.isTaken ? 'card-completed' : 'card-pending'}`}
                      >
                        <div className="reminder-card-top">
                          <div className="reminder-clock-chip">
                            <Clock size={14} />
                            <span>{item.timeStr}</span>
                          </div>
                          <span className="reminder-form-chip">{item.form}</span>
                          {item.isSample && (
                            <span className="sample-label-chip">Sample</span>
                          )}
                        </div>

                        <h4 className="reminder-med-title">{item.medicineName}</h4>

                        <div className="reminder-meta-list">
                          {item.foodTiming && (
                            <div className="meta-row">
                              <span className="meta-key">Food:</span>
                              <span className="meta-val font-semibold">
                                {item.foodTiming === 'afterFood'
                                  ? 'After Food'
                                  : item.foodTiming === 'beforeFood'
                                  ? 'Before Food (Empty Stomach)'
                                  : item.foodTiming === 'withFood'
                                  ? 'With Meal'
                                  : 'SOS / As Needed'}
                              </span>
                            </div>
                          )}
                          {item.specialInstructions && (
                            <div className="meta-row">
                              <span className="meta-key">Notes:</span>
                              <span className="meta-val italic truncate">{item.specialInstructions}</span>
                            </div>
                          )}
                        </div>

                        {/* Status & Action Footer */}
                        <div className="reminder-card-actions">
                          {item.isTaken ? (
                            <div className="taken-status-row">
                              <div className="flex items-center gap-1.5 text-emerald font-semibold text-xs">
                                <CheckCircle2 size={16} />
                                <span>{t.reminders.takenStatus} {item.takenAt}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleMarkDose(item.itemKey, false)}
                                className="undo-btn"
                                title="Mark as pending again"
                              >
                                <RotateCcw size={14} />
                                <span>{t.reminders.undoTaken}</span>
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-2 w-full">
                              <button
                                type="button"
                                onClick={() => handleMarkDose(item.itemKey, true)}
                                className="primary-btn btn-sm flex-1 justify-center"
                              >
                                <CheckCircle2 size={16} />
                                <span>{t.reminders.markTaken}</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => onDeleteSchedule(item.scheduleId)}
                                className="delete-icon-btn"
                                title="Delete this medication schedule"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
