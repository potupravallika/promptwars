// Web Speech API text-to-speech helper with Indian regional language support

class SpeechHelper {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.voices = [];
    this.isSpeaking = false;
    this.loadVoices();

    if (this.synth && this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this.loadVoices();
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  isSupported() {
    return Boolean(this.synth && typeof SpeechSynthesisUtterance !== 'undefined');
  }

  // Language code map to BCP-47 voice tags
  getLangVoiceCodes(langCode) {
    const map = {
      en: ['en-IN', 'en-GB', 'en-US', 'en'],
      te: ['te-IN', 'te'],
      hi: ['hi-IN', 'hi'],
      ta: ['ta-IN', 'ta-LK', 'ta'],
      kn: ['kn-IN', 'kn'],
      ml: ['ml-IN', 'ml'],
      bn: ['bn-IN', 'bn-BD', 'bn'],
      mr: ['mr-IN', 'mr'],
    };
    return map[langCode] || ['en-IN', 'en-US'];
  }

  // Check if a voice exists for this language
  hasVoiceFor(langCode) {
    if (!this.voices || this.voices.length === 0) {
      this.loadVoices();
    }
    const targetCodes = this.getLangVoiceCodes(langCode);
    return this.voices.some((v) =>
      targetCodes.some((code) => v.lang.toLowerCase().replace('_', '-').startsWith(code.toLowerCase()))
    );
  }

  findBestVoice(langCode) {
    const targetCodes = this.getLangVoiceCodes(langCode);
    for (const code of targetCodes) {
      const match = this.voices.find((v) =>
        v.lang.toLowerCase().replace('_', '-').startsWith(code.toLowerCase())
      );
      if (match) return match;
    }
    // Fallback to English India or default voice
    return this.voices.find((v) => v.lang.includes('IN') || v.default) || null;
  }

  speak({ text, langCode = 'en', onStart, onEnd, onError }) {
    if (!this.isSupported() || !text) {
      if (onError) onError('Speech synthesis is not supported on this browser.');
      return;
    }

    this.stop(); // Stop any active speech

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = this.findBestVoice(langCode);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = this.getLangVoiceCodes(langCode)[0] || 'en-IN';
    }

    // Comfortable pacing for clear medical reading
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      this.isSpeaking = false;
      if (onError) onError(e);
    };

    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }
}

export const speechHelper = new SpeechHelper();
