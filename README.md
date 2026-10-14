# 🏥 MedBridge AI
> **"Understand your medicine. In your language."**

**MedBridge AI** is a responsive healthcare web application built with **React**, **Vite**, **JavaScript**, and **CSS**. It bridges the gap between complex pharmaceutical packaging labels and everyday patients by providing in-browser OCR scanning, native multilingual explanations across 8 Indian and global languages, doctor-aligned prescription scheduling, and time-grouped daily reminders with browser notifications.

---

## 🌟 Key Features

### 1. 📷 Medicine Label Scanner (In-Browser OCR)
- **Upload & Drag-and-Drop:** Upload photos of medicine strips, bottles, or carton packaging (JPG, PNG, WEBP).
- **Camera Capture:** Snap pictures directly from your smartphone or laptop webcam.
- **Client-Side OCR with Tesseract.js:** Recognizes text locally in your browser without sending sensitive patient images to an external server.
- **Uncertainty & Confidence Flagging:** Words and lines with confidence below 65% or blurred text are flagged in amber with specific warnings (e.g. *Low confidence score*, *Fragmented characters*).
- **Interactive Review & Edit:** Directly edit recognized text if packaging was smudged or misread.
- **Instant Sample Presets:** Try sample packaging (Paracetamol 500mg Strip, Metformin 500mg Bottle, Amoxicillin 250mg Carton) with one click even if you don't have a medicine photo on hand.

### 2. 🌐 Multilingual Explanation (8 Languages)
- **Supported Languages:**
  1. English
  2. Telugu (తెలుగు)
  3. Hindi (हिन्दी)
  4. Tamil (தமிழ்)
  5. Kannada (ಕನ್ನಡ)
  6. Malayalam (മലയാളം)
  7. Bengali (বাংলা)
  8. Marathi (मराठी)
- **Clear Separation of Data:** Distinct visual cards for **Packaging Label Data** (what the manufacturer printed) vs. **General Medical Explanation** (educational summary of active salt, uses, warnings, and storage).
- **Read Aloud (Text-to-Speech):** Integrated Web Speech API (`window.speechSynthesis`) reads explanations aloud with animated voice waves.
- **Optional Secure Gemini AI Integration:** Users can optionally input their personal Google Gemini API key to query deep AI summaries. The key is stored strictly in the user's browser `localStorage` and never hardcoded or sent to third parties.

### 3. 📝 Prescription Schedule Builder
- **Strict Clinical Rule:** **Never guess dosage or timing from a medicine photo alone.** Prescriptions vary based on age, kidney function, and medical history.
- **Doctor's Prescription Entry:** Enter medicine name, strength, dosage form (Tablet, Capsule, Syrup, Drops, Ointment, Injection), and daily timing slots (Morning, Afternoon, Evening, Night).
- **Custom Clock Times & Food Timing:** Custom time pickers with clear food relationship options (*After Food*, *Before Food*, *With Meal*, *SOS / As Needed*).
- **Mandatory Verification Checkpoint:** A review modal requires users to verify against their doctor's physical prescription slip before saving.

### 4. ⏰ Daily Medication Reminders & Alerts
- **Time-Grouped Daily Schedule:** Doses automatically grouped into:
  - 🌅 Morning
  - ☀️ Afternoon
  - 🌆 Evening
  - 🌙 Night / Bedtime
- **Mark as Taken:** Track medication adherence with celebratory confetti, audio chime feedback, and taken timestamps.
- **In-App Dose Monitor:** Proactively monitors schedule and displays a floating alert toast when a dose is due.
- **Browser Notifications:** Prompts for browser notifications with transparent guidance explaining that notifications pause when device is shut down or browser is closed.
- **LocalStorage Persistence:** All schedules and logs remain saved on your device.

### 5. 🛡️ Medical Safety & Emergency Directives
- **Zero Medical Hallucination:** Never invents dosages or claims unverified identities.
- **Emergency Hotlines:** Instant quick access in the header and modal:
  - **112:** National Emergency Response
  - **1800-116-117:** National Poison Information Centre (AIIMS)
  - **108:** Emergency Medical & Ambulance Transport
- **Anaphylaxis Red-Flag Warnings:** Guidance for severe drug allergy symptoms (facial swelling, wheezing, hives).

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 19 with Vite 8
- **Language:** JavaScript (ES6+ JSX)
- **Styling:** Vanilla CSS (Modern Teal, Navy Blue, and White healthcare design system)
- **Icons:** `lucide-react`
- **OCR Engine:** `tesseract.js` (WebAssembly in-browser worker)
- **Audio & Speech:** Web Audio API (procedural tones) & Web Speech API (Text-to-Speech)
- **Celebration Effects:** `canvas-confetti`
- **Storage:** HTML5 `localStorage`

---

## 🚀 How to Run the App Step-by-Step

### Prerequisites
Make sure you have **Node.js** (version 18 or newer) installed on your computer.

### Step 1: Open Terminal / PowerShell
Open your terminal and navigate to the project directory:
```bash
cd d:\MedBridgeAI
```

### Step 2: Install Dependencies
Run the install command:
```bash
npm install
```

### Step 3: Start the Development Server
Launch the local dev server:
```bash
npm run dev
```

You will see output similar to:
```
  VITE v8.3.4  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 4: Open in Your Browser
Open your favorite browser (Google Chrome, Microsoft Edge, Brave, etc.) and go to:
```
http://localhost:5173/
```

---

## 🧭 Step-by-Step Walkthrough for Beginners

1. **Dashboard Overview:**
   - Look at the top ticker banner with emergency hotlines.
   - Switch languages anytime using the **Language dropdown** in the navbar (e.g. choose *తెలుగు*, *हिन्दी*, or *English*).
   - Review your active medicines and today's completion stats.

2. **Test Medicine Label Scanner:**
   - Click **"Scan Label"** from the navigation.
   - Click the sample preset button: **"Sample: Paracetamol 500mg Strip"** (or upload your own medicine packaging photo).
   - Watch the OCR progress bar analyze the image.
   - Notice how high-confidence text appears in green, while smudged/uncertain lines are flagged in amber with reasons.
   - Click **"Explain in My Language"** or **"Add to Prescription Schedule"**.

3. **Explore Multilingual Explanations:**
   - Switch language chips at the top to see the explanation in Telugu, Hindi, Tamil, Kannada, Malayalam, Bengali, or Marathi.
   - Click the **"Read Aloud"** button to hear the medicine explanation spoken.
   - Review active salt, common uses, packaging warnings, and safe storage instructions.

4. **Add a Prescription Schedule:**
   - Click **"Prescription Schedule"**.
   - Fill in your doctor's prescribed details (e.g., medicine name, dosage form, morning/night slots, after food).
   - Click **"Review & Save Prescription Schedule"**.
   - Check the safety verification box to confirm it matches your doctor's prescription, then click save.

5. **Track Daily Reminders:**
   - Navigate to **"Daily Reminders"**.
   - See your medicines organized by Morning, Afternoon, Evening, and Night.
   - Click **"Mark as Taken"** when you take a dose to see confetti and hear audio confirmation.
   - Click **"Enable Browser Notifications"** to receive desktop reminder alerts.

---

## ⚠️ Medical Disclaimer
*MedBridge AI is an accessibility, translation, and health-literacy tool intended for educational purposes only. It is not a substitute for professional medical diagnosis, advice, or treatment. Never alter prescription dosages or stop medication without direct consultation with your licensed physician or pharmacist.*
