import React from 'react';
import {
  Scan,
  BookOpen,
  CalendarCheck,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Pill,
} from 'lucide-react';
import { UI_STRINGS } from '../data/translations';
import { getTodayKey } from '../utils/reminderStorage';

export default function Dashboard({
  currentLang,
  onNavigate,
  schedules = [],
  takenLogs = {},
  onOpenSafetyModal,
}) {
  const t = UI_STRINGS[currentLang] || UI_STRINGS.en;
  const todayKey = getTodayKey();
  const todayTaken = takenLogs[todayKey] || {};

  // Calculate stats
  const totalActiveMeds = schedules.length;
  const takenCount = Object.keys(todayTaken).length;

  // Find next due dose
  let nextDueText = t.dashboard.quickStats.noDueToday;
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTimeVal = currentHours * 60 + currentMinutes;

  let upcomingDoses = [];
  schedules.forEach((sch) => {
    const slots = ['morning', 'afternoon', 'evening', 'night'];
    slots.forEach((slot) => {
      if (sch.timingSlots && sch.timingSlots[slot]) {
        const timeStr = (sch.times && sch.times[slot]) || (
          slot === 'morning' ? '08:00' :
          slot === 'afternoon' ? '13:00' :
          slot === 'evening' ? '18:00' : '21:00'
        );
        const [h, m] = timeStr.split(':').map(Number);
        const doseTimeVal = h * 60 + m;
        const key = `${sch.id}_${slot}`;
        const isTaken = Boolean(todayTaken[key]);

        upcomingDoses.push({
          key,
          medicineName: sch.medicineName,
          slot,
          timeStr,
          doseTimeVal,
          isTaken,
        });
      }
    });
  });

  // Sort upcoming
  upcomingDoses.sort((a, b) => a.doseTimeVal - b.doseTimeVal);
  const nextPending = upcomingDoses.find((d) => !d.isTaken && d.doseTimeVal >= currentTimeVal)
    || upcomingDoses.find((d) => !d.isTaken);

  if (nextPending) {
    nextDueText = `${nextPending.medicineName.split(' ')[0]} at ${nextPending.timeStr}`;
  }

  const cards = [
    {
      id: 'scanner',
      title: t.dashboard.cards.scanner.title,
      desc: t.dashboard.cards.scanner.desc,
      action: t.dashboard.cards.scanner.action,
      icon: Scan,
      badge: 'In-Browser OCR',
      colorClass: 'card-teal',
      targetTab: 'scanner',
    },
    {
      id: 'explanation',
      title: t.dashboard.cards.explanation.title,
      desc: t.dashboard.cards.explanation.desc,
      action: t.dashboard.cards.explanation.action,
      icon: BookOpen,
      badge: '8 Languages & TTS',
      colorClass: 'card-navy',
      targetTab: 'explanation',
    },
    {
      id: 'schedule',
      title: t.dashboard.cards.schedule.title,
      desc: t.dashboard.cards.schedule.desc,
      action: t.dashboard.cards.schedule.action,
      icon: CalendarCheck,
      badge: 'Doctor Prescription',
      colorClass: 'card-indigo',
      targetTab: 'schedule',
    },
    {
      id: 'reminders',
      title: t.dashboard.cards.reminders.title,
      desc: t.dashboard.cards.reminders.desc,
      action: t.dashboard.cards.reminders.action,
      icon: Clock,
      badge: 'Time-Grouped Alerts',
      colorClass: 'card-emerald',
      targetTab: 'reminders',
    },
  ];

  return (
    <div className="dashboard-root">
      {/* Welcome Banner */}
      <section className="welcome-banner">
        <div className="welcome-content">
          <div className="welcome-tag">
            <Sparkles size={16} />
            <span>Healthcare Intelligence & Accessibility</span>
          </div>
          <h1 className="welcome-title">{t.dashboard.welcome}</h1>
          <p className="welcome-subtitle">{t.dashboard.subtitle}</p>

          <div className="quick-stats-row">
            <div className="stat-pill">
              <span className="stat-label">{t.dashboard.quickStats.medicinesActive}</span>
              <span className="stat-number">{totalActiveMeds}</span>
            </div>
            <div className="stat-pill">
              <span className="stat-label">{t.dashboard.quickStats.takenToday}</span>
              <span className="stat-number stat-taken">{takenCount}</span>
            </div>
            <div className="stat-pill stat-pill-highlight">
              <span className="stat-label">{t.dashboard.quickStats.dueNext}</span>
              <span className="stat-due-text">{nextDueText}</span>
            </div>
          </div>
        </div>

        {/* Safety Quick Callout */}
        <div className="banner-safety-card">
          <div className="safety-card-header">
            <ShieldCheck size={20} className="text-teal" />
            <span className="font-semibold text-sm">Medical Safety First</span>
          </div>
          <p className="safety-card-body">{t.dashboard.safetyTip}</p>
          <button
            onClick={onOpenSafetyModal}
            className="safety-link-btn"
          >
            <span>Learn safety rules & emergency contacts</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* Main 4 Action Cards Grid */}
      <section className="action-cards-grid">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className={`action-card ${card.colorClass}`}
              onClick={() => onNavigate(card.targetTab)}
              role="button"
              tabIndex={0}
            >
              <div className="card-top">
                <div className="card-icon-bubble">
                  <Icon size={26} />
                </div>
                <span className="card-feature-badge">{card.badge}</span>
              </div>
              <h2 className="card-title">{card.title}</h2>
              <p className="card-desc">{card.desc}</p>
              <div className="card-footer">
                <span className="card-action-text">{card.action}</span>
                <div className="card-arrow-circle">
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Today's Medication Timeline Snapshot */}
      <section className="dashboard-section">
        <div className="section-header-row">
          <div>
            <h3 className="section-title">Today's Schedule Overview</h3>
            <p className="section-subtitle">Real-time status of your prescribed medicines for today.</p>
          </div>
          <button
            onClick={() => onNavigate('reminders')}
            className="secondary-outline-btn"
          >
            Manage All Reminders
          </button>
        </div>

        {upcomingDoses.length === 0 ? (
          <div className="empty-state-card">
            <Pill size={40} className="empty-state-icon" />
            <h4 className="empty-state-title">No medicines currently scheduled</h4>
            <p className="empty-state-desc">
              Add your doctor's prescription under the Prescription Schedule tab to activate daily reminders.
            </p>
            <button
              onClick={() => onNavigate('schedule')}
              className="primary-btn mt-3"
            >
              Add Prescription Schedule
            </button>
          </div>
        ) : (
          <div className="timeline-mini-grid">
            {upcomingDoses.slice(0, 4).map((item) => (
              <div
                key={item.key}
                className={`timeline-mini-card ${item.isTaken ? 'is-taken' : 'is-pending'}`}
              >
                <div className="timeline-card-time">
                  <Clock size={15} />
                  <span>{item.timeStr} ({item.slot})</span>
                </div>
                <div className="timeline-card-name">{item.medicineName}</div>
                <div className="timeline-card-status">
                  {item.isTaken ? (
                    <span className="status-badge status-taken">
                      <CheckCircle2 size={13} /> Taken
                    </span>
                  ) : (
                    <span className="status-badge status-pending">
                      <AlertCircle size={13} /> Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Emergency Contacts Strip */}
      <section className="emergency-strip">
        <div className="emergency-strip-left">
          <PhoneCall size={22} className="emergency-icon" />
          <div>
            <h4 className="emergency-strip-title">Need immediate medical assistance?</h4>
            <p className="emergency-strip-sub">Always dial official emergency services when experiencing severe symptoms.</p>
          </div>
        </div>
        <div className="emergency-strip-numbers">
          <a href="tel:112" className="emergency-chip">
            <strong>112</strong> National Emergency
          </a>
          <a href="tel:1800116117" className="emergency-chip">
            <strong>1800-116-117</strong> Poison Control
          </a>
        </div>
      </section>
    </div>
  );
}
