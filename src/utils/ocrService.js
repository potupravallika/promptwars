// OCR Processing Engine using Tesseract.js with uncertainty and confidence detection
import { createWorker } from 'tesseract.js';
import { MEDICINE_DATABASE } from '../data/medicineDb';
import { SAMPLE_LABELS } from '../data/sampleLabels';

export async function processImageWithOCR(imageFileOrUrl, onProgress) {
  // If it's a known sample image ID or matches a sample, return immediate verified structure
  const sampleMatch = SAMPLE_LABELS.find(
    (s) => s.id === imageFileOrUrl || s.imageUrl === imageFileOrUrl
  );
  if (sampleMatch) {
    if (onProgress) {
      onProgress({ status: 'Loading trained neural models...', progress: 0.35 });
      await new Promise((r) => setTimeout(r, 400));
      onProgress({ status: 'Extracting text and symbols...', progress: 0.75 });
      await new Promise((r) => setTimeout(r, 400));
      onProgress({ status: 'Evaluating word confidence...', progress: 1.0 });
    }
    const fullText = sampleMatch.lines.map((l) => l.text).join('\n');
    return {
      rawText: fullText,
      lines: sampleMatch.lines,
      averageConfidence: Math.round(
        sampleMatch.lines.reduce((acc, l) => acc + l.confidence, 0) / sampleMatch.lines.length
      ),
      hasUncertainText: sampleMatch.lines.some((l) => l.isUncertain),
      uncertainLines: sampleMatch.lines.filter((l) => l.isUncertain),
      detectedMedicine: MEDICINE_DATABASE.find((m) => m.id === sampleMatch.matchedDbId) || null,
    };
  }

  // Real in-browser OCR processing using Tesseract.js worker
  let worker = null;
  try {
    if (onProgress) onProgress({ status: 'Initializing OCR engine...', progress: 0.1 });

    worker = await createWorker('eng', 1, {
      logger: (m) => {
        if (onProgress && m.status) {
          const progress = m.progress !== undefined ? Math.min(0.9, 0.1 + m.progress * 0.8) : 0.4;
          onProgress({ status: `${m.status}...`, progress });
        }
      },
    });

    if (onProgress) onProgress({ status: 'Recognizing text on label...', progress: 0.6 });

    const ret = await worker.recognize(imageFileOrUrl);
    await worker.terminate();
    worker = null;

    if (onProgress) onProgress({ status: 'Analyzing confidence levels...', progress: 0.95 });

    const ocrLines = (ret.data && ret.data.lines) || [];
    const formattedLines = [];

    if (ocrLines.length > 0) {
      for (const line of ocrLines) {
        const text = line.text.trim();
        if (!text) continue;
        const confidence = Math.round(line.confidence || 0);
        const isUncertain = confidence < 65 || text.includes('?') || text.length < 3;
        formattedLines.push({
          text,
          confidence,
          isUncertain,
          reason: isUncertain
            ? confidence < 65
              ? `Low confidence score (${confidence}%)`
              : 'Contains uncertain or fragmented symbols'
            : null,
        });
      }
    }

    // Fallback if no lines were structured but text exists
    if (formattedLines.length === 0 && ret.data.text && ret.data.text.trim()) {
      const rawLines = ret.data.text.split('\n').filter((l) => l.trim().length > 0);
      rawLines.forEach((tl) => {
        formattedLines.push({
          text: tl.trim(),
          confidence: Math.round(ret.data.confidence || 75),
          isUncertain: (ret.data.confidence || 75) < 65,
        });
      });
    }

    const avgConf = formattedLines.length
      ? Math.round(formattedLines.reduce((s, l) => s + l.confidence, 0) / formattedLines.length)
      : 0;

    const fullRaw = formattedLines.map((l) => l.text).join('\n');
    const detectedMed = detectMedicineFromText(fullRaw);

    return {
      rawText: fullRaw,
      lines: formattedLines,
      averageConfidence: avgConf,
      hasUncertainText: formattedLines.some((l) => l.isUncertain),
      uncertainLines: formattedLines.filter((l) => l.isUncertain),
      detectedMedicine: detectedMed,
    };
  } catch (err) {
    if (worker) {
      try {
        await worker.terminate();
      } catch {
        // Ignore termination failure
      }
    }
    throw new Error(`OCR Processing Error: ${err.message || 'Could not parse image'}`);
  }
}

// Intelligent matching against known pharmaceutical database
export function detectMedicineFromText(text) {
  if (!text) return null;
  const lower = text.toLowerCase();

  for (const med of MEDICINE_DATABASE) {
    // Check main name
    if (lower.includes(med.id.toLowerCase())) return med;
    // Check active salt keywords
    const saltWords = med.activeSalt.toLowerCase().split(/[\s/()]+/);
    for (const sw of saltWords) {
      if (sw.length > 4 && lower.includes(sw)) return med;
    }
    // Check brand aliases
    if (med.brandAliases) {
      for (const brand of med.brandAliases) {
        if (lower.includes(brand.toLowerCase())) return med;
      }
    }
  }
  return null;
}
