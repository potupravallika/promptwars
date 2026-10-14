// LocalStorage manager for prescription schedules, reminders, and taken logs

const STORAGE_KEY_SCHEDULES = 'medbridge_schedules_v1';
const STORAGE_KEY_TAKEN = 'medbridge_taken_log_v1';
const STORAGE_KEY_API_KEY = 'medbridge_user_gemini_key';

// Realistic sample schedules with clear fictional labels
export const INITIAL_SAMPLE_SCHEDULES = [
  {
    id: 'sample-rx-1',
    isSample: true,
    medicineName: 'Paracetamol 500mg (Fictional Sample)',
    form: 'Tablet',
    doctorName: 'Dr. A. Sharma (Cardiologist & General)',
    timingSlots: {
      morning: false,
      afternoon: true,
      evening: false,
      night: true,
    },
    times: {
      afternoon: '14:00',
      night: '21:00',
    },
    foodTiming: 'afterFood',
    specialInstructions: 'Drink full glass of water. Take only if headache/fever persists.',
    durationDays: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sample-rx-2',
    isSample: true,
    medicineName: 'Metformin 500mg (Fictional Sample)',
    form: 'Tablet',
    doctorName: 'Dr. V. Rao (Diabetologist)',
    timingSlots: {
      morning: true,
      afternoon: false,
      evening: false,
      night: true,
    },
    times: {
      morning: '08:30',
      night: '20:30',
    },
    foodTiming: 'withFood',
    specialInstructions: 'Strictly take with breakfast and dinner. Do not skip meals.',
    durationDays: 30,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sample-rx-3',
    isSample: true,
    medicineName: 'Pantoprazole 40mg (Fictional Sample)',
    form: 'Tablet',
    doctorName: 'Dr. S. Mukherjee (Gastroenterologist)',
    timingSlots: {
      morning: true,
      afternoon: false,
      evening: false,
      night: false,
    },
    times: {
      morning: '07:30',
    },
    foodTiming: 'beforeFood',
    specialInstructions: 'Must be taken on an empty stomach 30 mins before breakfast.',
    durationDays: 14,
    createdAt: new Date().toISOString(),
  },
];

export function getStoredSchedules() {
  if (typeof window === 'undefined') return INITIAL_SAMPLE_SCHEDULES;
  try {
    const data = localStorage.getItem(STORAGE_KEY_SCHEDULES);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_SCHEDULES, JSON.stringify(INITIAL_SAMPLE_SCHEDULES));
      return INITIAL_SAMPLE_SCHEDULES;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed reading schedules from localStorage', err);
    return INITIAL_SAMPLE_SCHEDULES;
  }
}

export function saveStoredSchedules(schedules) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_SCHEDULES, JSON.stringify(schedules));
  } catch (err) {
    console.error('Failed writing schedules to localStorage', err);
  }
}

export function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getTakenLogs() {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(STORAGE_KEY_TAKEN);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function markReminderTaken(reminderKey, taken = true) {
  if (typeof window === 'undefined') return;
  try {
    const today = getTodayKey();
    const logs = getTakenLogs();
    if (!logs[today]) logs[today] = {};

    if (taken) {
      logs[today][reminderKey] = {
        takenAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: Date.now(),
      };
    } else {
      delete logs[today][reminderKey];
    }
    localStorage.setItem(STORAGE_KEY_TAKEN, JSON.stringify(logs));
    return logs[today];
  } catch (err) {
    console.error('Failed updating taken log', err);
  }
}

export function getUserGeminiKey() {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(STORAGE_KEY_API_KEY) || '';
}

export function setUserGeminiKey(key) {
  if (typeof window === 'undefined') return;
  if (!key) {
    localStorage.removeItem(STORAGE_KEY_API_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY_API_KEY, key.trim());
  }
}

// Request browser notifications permission
export async function requestNotificationPermission() {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return { supported: false, granted: false };
  }
  if (Notification.permission === 'granted') {
    return { supported: true, granted: true };
  }
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return { supported: true, granted: permission === 'granted' };
  }
  return { supported: true, granted: false };
}

// Send browser notification if supported and granted
export function sendBrowserNotification(title, body) {
  if (typeof window === 'undefined' || !('Notification' in window)) return;
  if (Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%230d9488"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
      });
    } catch (e) {
      console.warn('Browser notification error', e);
    }
  }
}
