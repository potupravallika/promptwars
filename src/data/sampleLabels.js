// Sample packaging presets for instant testing of OCR and flagging features

export const SAMPLE_LABELS = [
  {
    id: 'sample-paracetamol',
    name: 'DOLO-500 Paracetamol Strip',
    type: 'strip',
    badge: 'Analgesic Strip',
    matchedDbId: 'paracetamol',
    imageUrl: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240">
        <defs>
          <linearGradient id="foil" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#cbd5e1" />
            <stop offset="50%" stop-color="#f1f5f9" />
            <stop offset="100%" stop-color="#94a3b8" />
          </linearGradient>
          <filter id="blur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>
        <!-- Blister strip background -->
        <rect width="380" height="220" x="10" y="10" rx="16" fill="url(#foil)" stroke="#64748b" stroke-width="2"/>
        <rect width="360" height="200" x="20" y="20" rx="12" fill="#ffffff" fill-opacity="0.9" />
        
        <!-- Header banner -->
        <rect width="360" height="42" x="20" y="20" rx="12" fill="#0d9488" />
        <text x="35" y="48" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">DOLO-500</text>
        <text x="210" y="46" font-family="sans-serif" font-size="12" fill="#ccfbf1">Paracetamol Tablets I.P. 500mg</text>
        
        <!-- Content lines -->
        <text x="35" y="86" font-family="sans-serif" font-size="13" font-weight="bold" fill="#0f172a">Each uncoated tablet contains: Paracetamol I.P. 500 mg</text>
        <text x="35" y="108" font-family="sans-serif" font-size="12" fill="#334155">Dosage: As directed by the physician.</text>
        <text x="35" y="128" font-family="sans-serif" font-size="11" fill="#b91c1c" font-weight="bold">WARNING: Taking more than daily dose may cause liver damage.</text>
        
        <!-- Smudged / partially uncertain line -->
        <text x="35" y="152" font-family="sans-serif" font-size="11" fill="#64748b" filter="url(#blur)">B.No: DL88241 Mfg: 03/2026 Exp: 02/2029 Lic: M/554/??</text>
        <rect x="300" y="138" width="60" height="18" fill="#fef3c7" stroke="#f59e0b" rx="4"/>
        <text x="306" y="151" font-family="sans-serif" font-size="9" fill="#b45309" font-weight="bold">Smudged</text>

        <text x="35" y="180" font-family="sans-serif" font-size="11" fill="#475569">Store below 30°C in a dry place. Protect from light.</text>
        <text x="35" y="200" font-family="sans-serif" font-size="11" fill="#0f766e" font-weight="bold">Keep all medicines out of reach of children.</text>
      </svg>
    `),
    lines: [
      { text: 'DOLO-500 Paracetamol Tablets I.P. 500mg', confidence: 96, isUncertain: false },
      { text: 'Each uncoated tablet contains: Paracetamol I.P. 500 mg', confidence: 94, isUncertain: false },
      { text: 'Dosage: As directed by the physician.', confidence: 92, isUncertain: false },
      { text: 'WARNING: Taking more than daily dose may cause liver damage.', confidence: 95, isUncertain: false },
      { text: 'B.No: DL88241 Mfg: 03/2026 Exp: 02/2029 Lic: M/554/?? [BLURRED]', confidence: 48, isUncertain: true, reason: 'Smudged manufacturing license code and faint text' },
      { text: 'Store below 30°C in a dry place. Protect from light.', confidence: 89, isUncertain: false },
      { text: 'Keep all medicines out of reach of children.', confidence: 93, isUncertain: false },
    ],
  },
  {
    id: 'sample-metformin',
    name: 'GLYCOMET-500 Metformin Bottle',
    type: 'bottle',
    badge: 'Antidiabetic Bottle',
    matchedDbId: 'metformin',
    imageUrl: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240">
        <defs>
          <linearGradient id="bottleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#e2e8f0" />
            <stop offset="50%" stop-color="#ffffff" />
            <stop offset="100%" stop-color="#cbd5e1" />
          </linearGradient>
        </defs>
        <!-- Bottle silhouette -->
        <rect width="360" height="210" x="20" y="15" rx="20" fill="url(#bottleGrad)" stroke="#94a3b8" stroke-width="2"/>
        <rect width="330" height="175" x="35" y="32" rx="10" fill="#ffffff" stroke="#e2e8f0" />
        
        <!-- Red Schedule H stripe -->
        <rect width="10" height="175" x="35" y="32" fill="#ef4444" />
        
        <text x="60" y="62" font-family="sans-serif" font-size="20" font-weight="bold" fill="#1e3a8a">GLYCOMET-500</text>
        <text x="60" y="82" font-family="sans-serif" font-size="12" font-weight="600" fill="#2563eb">Metformin Hydrochloride Tablets I.P. 500 mg</text>
        <text x="60" y="104" font-family="sans-serif" font-size="12" fill="#334155">Film-coated tablet | 100 Tablets</text>
        
        <text x="60" y="126" font-family="sans-serif" font-size="10" fill="#dc2626" font-weight="bold">SCHEDULE H PRESCRIPTION DRUG: Caution - Not to be sold without prescription.</text>
        <text x="60" y="146" font-family="sans-serif" font-size="11" fill="#0f172a">To be taken with or after meals as directed by Diabetologist.</text>
        
        <!-- Uncertain line -->
        <text x="60" y="168" font-family="sans-serif" font-size="10" fill="#94a3b8">Storage: Store protected from moisture ~25°C [Edge worn]</text>
        <text x="60" y="188" font-family="sans-serif" font-size="10" fill="#475569">Mfg Lic: G/25/1820 | Batch: GM9923 | Exp: 05/2028</text>
      </svg>
    `),
    lines: [
      { text: 'GLYCOMET-500 Metformin Hydrochloride Tablets I.P. 500 mg', confidence: 97, isUncertain: false },
      { text: 'Film-coated tablet | 100 Tablets', confidence: 92, isUncertain: false },
      { text: 'SCHEDULE H PRESCRIPTION DRUG: Caution - Not to be sold without prescription.', confidence: 94, isUncertain: false },
      { text: 'To be taken with or after meals as directed by Diabetologist.', confidence: 93, isUncertain: false },
      { text: 'Storage: Store protected from moisture ~25°C [EDGE WORN / UNREADABLE DIGIT]', confidence: 52, isUncertain: true, reason: 'Worn label edge causing faint numeric temperature' },
      { text: 'Mfg Lic: G/25/1820 | Batch: GM9923 | Exp: 05/2028', confidence: 91, isUncertain: false },
    ],
  },
  {
    id: 'sample-amoxicillin',
    name: 'MOX-500 Amoxicillin Capsule Carton',
    type: 'carton',
    badge: 'Antibiotic Carton',
    matchedDbId: 'amoxicillin',
    imageUrl: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240">
        <!-- Box background -->
        <rect width="370" height="210" x="15" y="15" rx="14" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
        <rect width="370" height="40" x="15" y="15" rx="14" fill="#0284c7" />
        <text x="35" y="42" font-family="sans-serif" font-size="18" font-weight="bold" fill="#ffffff">MOX-500 CAPSULES</text>
        <text x="240" y="40" font-family="sans-serif" font-size="11" fill="#e0f2fe">Amoxicillin 500mg</text>
        
        <!-- Schedule H1 red box -->
        <rect x="35" y="65" width="330" height="34" fill="#fee2e2" stroke="#ef4444" rx="6" />
        <text x="45" y="80" font-family="sans-serif" font-size="10" font-weight="bold" fill="#b91c1c">SCHEDULE H1 PRESCRIPTION DRUG - CAUTION:</text>
        <text x="45" y="94" font-family="sans-serif" font-size="9" fill="#991b1b">Dangerous to take except in accordance with medical advice.</text>
        
        <text x="35" y="122" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0f172a">Each hard gelatin capsule contains: Amoxicillin Trihydrate I.P. eq. 500mg</text>
        <text x="35" y="142" font-family="sans-serif" font-size="11" fill="#0284c7" font-weight="bold">Complete the full prescribed course even if symptoms subside.</text>
        <text x="35" y="162" font-family="sans-serif" font-size="11" fill="#dc2626">WARNING: Contraindicated in patients with Penicillin allergy.</text>
        
        <!-- Bottom batch lines -->
        <text x="35" y="185" font-family="sans-serif" font-size="10" fill="#64748b">Store below 25°C in a dry place. Protect from moisture.</text>
        <text x="35" y="202" font-family="sans-serif" font-size="10" fill="#94a3b8">B.No: MX4011 ?? Exp: 11/2027 MRP: Rs. 108.50</text>
      </svg>
    `),
    lines: [
      { text: 'MOX-500 CAPSULES Amoxicillin 500mg', confidence: 98, isUncertain: false },
      { text: 'SCHEDULE H1 PRESCRIPTION DRUG - CAUTION: Dangerous without medical advice.', confidence: 93, isUncertain: false },
      { text: 'Each hard gelatin capsule contains: Amoxicillin Trihydrate I.P. eq. 500mg', confidence: 95, isUncertain: false },
      { text: 'Complete the full prescribed course even if symptoms subside.', confidence: 91, isUncertain: false },
      { text: 'WARNING: Contraindicated in patients with Penicillin allergy.', confidence: 97, isUncertain: false },
      { text: 'Store below 25°C in a dry place. Protect from moisture.', confidence: 90, isUncertain: false },
      { text: 'B.No: MX4011 ?? Exp: 11/2027 MRP: Rs. 108.50 [PARTIALLY FADED]', confidence: 54, isUncertain: true, reason: 'Faded dot-matrix stamp on batch number' },
    ],
  },
];
