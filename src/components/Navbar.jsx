import React, { useState } from 'react';
import {
  ShieldAlert,
  Volume2,
  VolumeX,
  Globe,
  Menu,
  X,
  Pill,
  Clock,
  Scan,
  BookOpen,
  CalendarCheck,
  ShieldCheck,
} from 'lucide-react';
import { LANGUAGES, UI_STRINGS } from '../data/translations';

export default function Navbar({
  currentLang,
  onLanguageChange,
  activeTab,
  onSelectTab,
  onOpenSafetyModal,
  soundEnabled,
  onToggleSound,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = UI_STRINGS[currentLang] || UI_STRINGS.en;

  const navItems = [
    { id: 'dashboard', label: t.nav.dashboard, icon: Pill },
    { id: 'scanner', label: t.nav.scanner, icon: Scan },
    { id: 'explanation', label: t.nav.explanation, icon: BookOpen },
    { id: 'schedule', label: t.nav.schedule, icon: CalendarCheck },
    { id: 'reminders', label: t.nav.reminders, icon: Clock },
    { id: 'safety', label: t.nav.safety, icon: ShieldCheck },
  ];

  return (
    <header className="header-root">
      {/* Top medical safety ticker banner */}
      <div className="safety-ticker">
        <div className="safety-ticker-content">
          <span className="ticker-badge">SAFETY NOTICE</span>
          <span>{t.safetyDisclaimerBanner}</span>
        </div>
        <button
          onClick={onOpenSafetyModal}
          className="emergency-btn-header"
          title="Emergency Help & Poison Control Hotlines"
        >
          <ShieldAlert size={15} />
          <span>{t.emergencyHelp}</span>
        </button>
      </div>

      {/* Main navigation bar */}
      <div className="main-navbar">
        <div className="navbar-container">
          {/* Logo & Tagline */}
          <div
            className="brand-group"
            onClick={() => onSelectTab('dashboard')}
            role="button"
            tabIndex={0}
          >
            <div className="logo-icon-wrap">
              <Pill className="brand-logo-icon" size={26} />
              <div className="logo-pulse"></div>
            </div>
            <div className="brand-text">
              <span className="brand-name">MedBridge <span className="ai-highlight">AI</span></span>
              <span className="brand-tagline">{t.tagline}</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                >
                  <Icon size={17} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Tools: Sound FX & Language Selector */}
          <div className="nav-controls">
            {/* Audio Toggle */}
            <button
              onClick={onToggleSound}
              className={`sound-toggle-btn ${soundEnabled ? 'sound-on' : 'sound-off'}`}
              title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              aria-label="Toggle sound effects"
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>

            {/* Language Selector Dropdown */}
            <div className="language-selector-wrapper">
              <Globe size={18} className="lang-icon" />
              <select
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="language-dropdown"
                aria-label="Select Language"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.native} ({lang.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu-drawer">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
                >
                  <Icon size={19} />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="mobile-emergency-row">
              <button
                onClick={() => {
                  onOpenSafetyModal();
                  setMobileMenuOpen(false);
                }}
                className="mobile-emergency-btn"
              >
                <ShieldAlert size={18} />
                <span>{t.emergencyHotlines} (112 / 1800-116-117)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
