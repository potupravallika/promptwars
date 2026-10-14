// Curated MedBridge AI medical database with verified translations across 8 languages
// Note: This provides strictly educational summaries and packaging guidelines.

export const MEDICINE_DATABASE = [
  {
    id: 'paracetamol',
    name: 'Paracetamol 500mg',
    brandAliases: ['Crocin', 'Dolo 650', 'Calpol', 'Pacimol', 'Tylenol', 'Acetaminophen'],
    activeSalt: 'Paracetamol / Acetaminophen (500mg)',
    category: 'Analgesic & Antipyretic (Pain & Fever Reliever)',
    form: 'Tablet',
    standardLabelText: `DOLO-500
Paracetamol Tablets I.P. 500 mg
Each uncoated tablet contains:
Paracetamol I.P. 500 mg
Excipients: q.s.
Colour: Sunset Yellow FCF
Mfg. Lic. No.: M/554/2012
Batch No.: DL88241
Mfg. Date: 03/2026  Exp. Date: 02/2029
Dosage: As directed by the Physician.
WARNING: Taking more than daily dose of Paracetamol may cause serious liver damage or allergic reactions.
Keep out of reach of children.
Store in a dry place below 30°C. Protect from direct sunlight.`,
    multilingual: {
      en: {
        activeSalt: 'Paracetamol (Acetaminophen) 500mg',
        purpose: 'Used for temporary relief of mild-to-moderate fever, headache, body aches, muscle pain, and toothache.',
        howItWorks: 'Reduces prostaglandins in the brain that trigger pain signals and helps reset the hypothalamic heat-regulating center.',
        storage: 'Store in a dry, cool place below 30°C. Protect from moisture and direct sunlight. Keep out of reach of children.',
        packagingWarnings: 'CRITICAL: Do not exceed the doctor-prescribed maximum daily dose. Overdose can cause severe liver damage. Avoid alcohol while taking paracetamol.',
        foodRecommendation: 'Can be taken before or after food with a glass of water. Taking after a light meal reduces stomach discomfort.',
        consultDoctorIf: 'Fever persists beyond 3 days or pain worsens. If taking other cold/cough syrups, ensure they do not also contain paracetamol.',
      },
      te: {
        activeSalt: 'పారాసెటమాల్ (అసిటమినోఫెన్) 500mg',
        purpose: 'సాధారణ జ్వరం, తలనొప్పి, ఒళ్లు నొప్పులు, పంటి నొప్పి మరియు కండరాల నొప్పులను తాత్కాలికంగా తగ్గించడానికి వాడతారు.',
        howItWorks: 'మెదడులోని నొప్పి సంకేతాలను మరియు శరీర ఉష్ణోగ్రతను నియంత్రించే కేంద్రంపై పనిచేసి జ్వరాన్ని తగ్గిస్తుంది.',
        storage: 'తేమ లేని పొడి ప్రదేశంలో 30°C కంటే తక్కువ ఉష్ణోగ్రత వద్ద భద్రపరచండి. పిల్లలకు దూరంగా ఉంచండి.',
        packagingWarnings: 'ముఖ్య హెచ్చరిక: డాక్టర్ సూచించిన పరిమితి కంటే ఎక్కువ మోతాదు వాడరాదు. అధిక మోతాదు కాలేయం (లివర్) పై తీవ్ర ప్రభావం చూపుతుంది.',
        foodRecommendation: 'భోజనం తర్వాత లేదా ముందు నీటితో తీసుకోవచ్చు. ఆహారం తర్వాత తీసుకోవడం కడుపుకు మంచిది.',
        consultDoctorIf: 'జ్వరం 3 రోజులకు మించి తగ్గకపోతే లేదా తీవ్రమైన కడుపు నొప్పి ఉంటే వెంటనే డాక్టర్‌ను సంప్రదించండి.',
      },
      hi: {
        activeSalt: 'पैरासिटामोल (एसिटामिनोफेन) 500mg',
        purpose: 'हल्के से मध्यम बुखार, सिरदर्द, बदन दर्द, दांत दर्द और मांसपेशियों के दर्द में आराम के लिए उपयोग किया जाता है।',
        howItWorks: 'मस्तिष्क में दर्द और बुखार पैदा करने वाले संकेतों को कम करता है।',
        storage: 'सूखी जगह पर 30°C से कम तापमान पर रखें। धूप और नमी से बचाएं। बच्चों की पहुंच से दूर रखें।',
        packagingWarnings: 'महत्वपूर्ण चेतावनी: निर्धारित मात्रा से अधिक खुराक कभी न लें। अत्यधिक खुराक से लिवर को गंभीर नुकसान हो सकता है। शराब से बचें।',
        foodRecommendation: 'भोजन के बाद या पहले एक गिलास पानी के साथ ले सकते हैं। भोजन के बाद लेना पेट के लिए बेहतर है।',
        consultDoctorIf: 'यदि बुखार 3 दिन से अधिक समय तक रहे या दर्द बढ़े तो तुरंत डॉक्टर से संपर्क करें।',
      },
      ta: {
        activeSalt: 'பாராசிட்டமால் 500mg',
        purpose: 'லேசான முதல் மிதமான காய்ச்சல், தலைவலி, உடல் வலி மற்றும் பல் வலியைத் தணிக்க பயன்படுகிறது.',
        howItWorks: 'மூளையில் உள்ள வலி சமிக்ஞைகளை கட்டுப்படுத்தி உடல் வெப்பநிலையைக் குறைக்கிறது.',
        storage: 'ஈரப்பதமில்லாத உலர்ந்த இடத்தில் 30°C-க்குக் கீழ் வைக்கவும். குழந்தைகளுக்கு எட்டாதவாறு வைக்கவும்.',
        packagingWarnings: 'முக்கிய எச்சரிக்கை: மருத்துவர் பரிந்துரைத்த அளவை விட அதிகமாக உட்கொள்ளக் கூடாது. அதிக அளவு கல்லீரலைப் பாதிக்கலாம்.',
        foodRecommendation: 'உணவுக்குப் பின் ஒரு டம்ளர் தண்ணீருடன் உட்கொள்வது வயிற்றுக்கு நல்லது.',
        consultDoctorIf: 'காய்ச்சல் 3 நாட்களுக்கு மேல் நீடித்தால் மருத்துவரை அணுகவும்.',
      },
      kn: {
        activeSalt: 'ಪ್ಯಾರಾಸಿಟಮಾಲ್ 500mg',
        purpose: 'ಜ್ವರ, ತಲೆನೋವು, ಮೈ-ಕೈ ನೋವು ಮತ್ತು ಹಲ್ಲುನೋವಿನಿಂದ ಶಮನ ಪಡೆಯಲು ಬಳಸಲಾಗುತ್ತದೆ.',
        howItWorks: 'ಮೆದುಳಿನಲ್ಲಿನ ನೋವಿನ ಸಂಕೇತಗಳನ್ನು ಕಡಿಮೆ ಮಾಡಿ ದೇಹದ ಉಷ್ಣತೆಯನ್ನು ಸಮತೋಲನಗೊಳಿಸುತ್ತದೆ.',
        storage: '30°C ಗಿಂತ ಕಡಿಮೆ ತಾಪಮಾನದಲ್ಲಿ, ತೇವಾಂಶವಿಲ್ಲದ ಒಣ ಜಾಗದಲ್ಲಿ ಇರಿಸಿ. ಮಕ್ಕಳಿಗೆ ಸಿಗದಂತೆ ಇಡಿ.',
        packagingWarnings: 'ಪ್ರಮುಖ ಎಚ್ಚರಿಕೆ: ನಿಗದಿತ ಪ್ರಮಾಣಕ್ಕಿಂತ ಹೆಚ್ಚು ಸೇವಿಸಬೇಡಿ. ಅಧಿಕ ಡೋಸ್ ಯಕೃತ್ತಿಗೆ (ಲಿವರ್) ಹಾನಿ ಮಾಡಬಹುದು.',
        foodRecommendation: 'ಆಹಾರ ಸೇವಿಸಿದ ನಂತರ ನೀರೊಂದಿಗೆ ಸೇವಿಸುವುದು ಹೊಟ್ಟೆಗೆ ಒಳ್ಳೆಯದು.',
        consultDoctorIf: 'ಜ್ವರ 3 ದಿನಗಳಿಗಿಂತ ಹೆಚ್ಚು ಮುಂದುವರಿದರೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
      },
      ml: {
        activeSalt: 'പാരസെറ്റമോൾ 500mg',
        purpose: 'പനി, തലവേദന, ശരീരവേദന, പല്ലുവേദന എന്നിവയ്ക്ക് താൽക്കാലിക ആശ്വാസം നൽകുന്നു.',
        howItWorks: 'തലച്ചോറിലെ വേദന സംവേദനങ്ങളെ നിയന്ത്രിക്കുകയും ശരീര താപനില കുറയ്ക്കുകയും ചെയ്യുന്നു.',
        storage: '30°C-ൽ താഴെ ഈർപ്പമില്ലാത്ത സ്ഥലത്ത് സൂക്ഷിക്കുക. കുട്ടികൾക്ക് ലഭ്യമാകാതെ സൂക്ഷിക്കുക.',
        packagingWarnings: 'പ്രധാന മുന്നറിയിപ്പ്: ഡോക്ടർ നിർദ്ദേശിച്ച അളവിൽ കൂടുതൽ കഴിക്കരുത്. അമിത അളവ് കരളിന് ദോഷകരമാണ്.',
        foodRecommendation: 'ഭക്ഷണത്തിന് ശേഷം വെള്ളത്തോടൊപ്പം കഴിക്കുന്നത് വയറിന്റെ സുരക്ഷിതത്വത്തിന് നല്ലതാണ്.',
        consultDoctorIf: 'പനി 3 ദിവസത്തിൽ കൂടുതൽ നീണ്ടുനിൽക്കുകയാണെങ്കിൽ ഉടൻ ഡോക്ടറെ കാണുക.',
      },
      bn: {
        activeSalt: 'প্যারাসিটামল 500mg',
        purpose: 'সাধারণ জ্বর, মাথাব্যথা, গা-হাত-পা ব্যথা ও দাঁতের ব্যথায় উপশমের জন্য ব্যবহৃত হয়।',
        howItWorks: 'মস্তিষ্কে ব্যথার সংকেত কমিয়ে শরীরের তাপমাত্রা স্বাভাবিক করতে সাহায্য করে।',
        storage: '৩০ ডিগ্রি সেলসিয়াসের নিচে শুষ্ক স্থানে রাখুন। শিশুদের নাগালের বাইরে রাখুন।',
        packagingWarnings: 'সতর্কতা: নির্ধারিত মাত্রার অতিরিক্ত সেবন লিভারের মারাত্মক ক্ষতি করতে পারে। অ্যালকোহল পরিহার করুন।',
        foodRecommendation: 'খাবারের পর এক গ্লাস জল দিয়ে সেবন করা পেটের জন্য ভালো।',
        consultDoctorIf: 'জ্বর ৩ দিনের বেশি স্থায়ী হলে ডাক্তারের সাথে যোগাযোগ করুন।',
      },
      mr: {
        activeSalt: 'पॅरासिटामॉल 500mg',
        purpose: 'ताप, डोकेदुखी, अंगदुखी आणि दातदुखी कमी करण्यासाठी वापरले जाते.',
        howItWorks: 'मेंदूतील वेदनेचे संकेत कमी करून शरीराचे तापमान नियंत्रित करते.',
        storage: '३०°C पेक्षा कमी तापमानात कोरड्या जागी ठेवा. लहान मुलांपासून दूर ठेवा.',
        packagingWarnings: 'महत्त्वाची सूचना: ठरवून दिलेल्या प्रमाणापेक्षा जास्त डोस घेऊ नका. जास्त डोसमुळे यकृताला (लिव्हर) इजा होऊ शकते.',
        foodRecommendation: 'जेवणानंतर भरपूर पाण्यासोबत घेणे पोटासाठी सुरक्षित मानले जाते.',
        consultDoctorIf: 'ताप ३ दिवसांपेक्षा जास्त राहिल्यास तात्काळ डॉक्टरांना दाखवा.',
      },
    },
  },
  {
    id: 'metformin',
    name: 'Metformin Hydrochloride 500mg',
    brandAliases: ['Glycomet', 'Glucophage', 'Obimet', 'Formin'],
    activeSalt: 'Metformin Hydrochloride (500mg)',
    category: 'Oral Antidiabetic Medication (Biguanide)',
    form: 'Tablet',
    standardLabelText: `GLYCOMET-500
Metformin Hydrochloride Tablets I.P. 500 mg
Each film-coated tablet contains:
Metformin Hydrochloride I.P. 500 mg
Colour: Titanium Dioxide I.P.
Dosage: As directed by the Diabetologist / Physician.
SCHEDULE H PRESCRIPTION DRUG - CAUTION:
Not to be sold by retail without the prescription of a Registered Medical Practitioner.
Store protected from moisture at a temperature not exceeding 25°C.
Keep the container tightly closed.
Warning: To be taken with or after meals to minimize gastrointestinal discomfort.`,
    multilingual: {
      en: {
        activeSalt: 'Metformin Hydrochloride 500mg',
        purpose: 'Helps control blood sugar levels in adults with Type 2 Diabetes alongside diet and physical exercise.',
        howItWorks: 'Decreases glucose production by the liver, lowers intestinal absorption of glucose, and improves insulin sensitivity.',
        storage: 'Store protected from moisture below 25°C. Keep bottle tightly capped.',
        packagingWarnings: 'Take strictly as prescribed. Do not crush sustained-release tablets. Inform doctor immediately if experiencing unusual fatigue, muscle cramps, or severe breathlessness.',
        foodRecommendation: 'Always take with meals or immediately after food. Taking it with food substantially minimizes stomach upset or nausea.',
        consultDoctorIf: 'You are scheduled for any X-ray/CT scan with contrast dye, or if you develop symptoms of dehydration or diarrhea.',
      },
      te: {
        activeSalt: 'మెట్‌ఫార్మిన్ హైడ్రోక్లోరైడ్ 500mg',
        purpose: 'టైప్ 2 డయాబెటిస్ (మధుమేహం) ఉన్నవారిలో రక్తంలో చక్కెర శాతాన్ని నియంత్రించడానికి వాడతారు.',
        howItWorks: 'కాలేయం నుండి తయారయ్యే గ్లూకోజ్ పరిమాణాన్ని తగ్గించి, ఇన్సులిన్ పనితీరును మెరుగుపరుస్తుంది.',
        storage: '25°C కంటే తక్కువ ఉష్ణోగ్రత వద్ద, తేమ తగలకుండా భద్రపరచండి. మూత గట్టిగా మూసి ఉంచండి.',
        packagingWarnings: 'డాక్టర్ సలహా లేకుండా మందు ఆపవద్దు లేదా మోతాదు మార్చవద్దు. తీవ్రమైన నీరసం లేదా శ్వాస ఇబ్బంది ఉంటే డాక్టర్‌కు తెలపండి.',
        foodRecommendation: 'తప్పనిసరిగా భోజనంతో పాటు లేదా భోజనం చేసిన వెంటనే వేసుకోవాలి. దీనివల్ల కడుపులో వికారం రాకుండా ఉంటుంది.',
        consultDoctorIf: 'ఏదైనా స్కానింగ్ లేదా ఆపరేషన్ ఉన్నట్లయితే ఈ మందు తీసుకుంటున్నట్లు డాక్టర్‌కు ముందే చెప్పండి.',
      },
      hi: {
        activeSalt: 'मेटफॉर्मिन हाइड्रोक्लोराइड 500mg',
        purpose: 'टाइप 2 डायबिटीज में ब्लड शुगर (रक्त शर्करा) के स्तर को नियंत्रित करने में सहायक है।',
        howItWorks: 'लिवर में ग्लूकोज बनने को कम करता है और इंसुलिन की कार्यक्षमता को बढ़ाता है।',
        storage: '25°C से कम तापमान पर नमी से बचाकर रखें। डिब्बे का ढक्कन कसकर बंद रखें।',
        packagingWarnings: 'केवल डॉक्टर के पर्चे पर लें। गोली को चबाएं या तोड़ें नहीं। अत्यधिक थकान या मांसपेशियों में दर्द होने पर डॉक्टर को बताएं।',
        foodRecommendation: 'हमेशा भोजन के साथ या भोजन के तुरंत बाद लें ताकि पेट में गैस या मतली की समस्या न हो।',
        consultDoctorIf: 'यदि कोई सीटी स्कैन या सर्जरी होनी हो तो अपने डॉक्टर को इस दवा के बारे में पहले बताएं।',
      },
      ta: {
        activeSalt: 'மெட்ஃபோர்மின் 500mg',
        purpose: 'வகை 2 சர்க்கரை நோயில் ரத்த சர்க்கரை அளவை கட்டுப்படுத்த பயன்படுகிறது.',
        howItWorks: 'கல்லீரல் உற்பத்தி செய்யும் குளுக்கோஸைக் குறைத்து இன்சுலின் திறனை மேம்படுத்துகிறது.',
        storage: '25°C-க்குக் கீழ் ஈரப்பதமில்லாமல் வைக்கவும். மூடியை இறுக்கமாக மூடவும்.',
        packagingWarnings: 'மருத்துவர் ஆலோசனைப்படி மட்டுமே உட்கொள்ளவும். மாத்திரையை நசுக்கவோ மெல்லவோ வேண்டாம்.',
        foodRecommendation: 'எப்போதும் உணவுடன் அல்லது உணவுக்குப் பின் உடனடியாக உட்கொள்ளவும்.',
        consultDoctorIf: 'திடீர் மயக்கம் அல்லது மூச்சுத் திணறல் ஏற்பட்டால் மருத்துவரை உடனே தொடர்பு கொள்ளவும்.',
      },
      kn: {
        activeSalt: 'ಮೆಟ್‌ಫಾರ್ಮಿನ್ ಹೈಡ್ರೋಕ್ಲೋರೈಡ್ 500mg',
        purpose: 'ಟೈಪ್ 2 ಮಧುಮೇಹದಲ್ಲಿ ರಕ್ತದಲ್ಲಿನ ಸಕ್ಕರೆ ಪ್ರಮಾಣವನ್ನು ನಿಯಂತ್ರಿಸಲು ಬಳಸಲಾಗುತ್ತದೆ.',
        howItWorks: 'ಯಕೃತ್ತು ಸಕ್ಕರೆ ಉತ್ಪಾದಿಸುವುದನ್ನು ಕಡಿಮೆ ಮಾಡಿ ಇನ್ಸುಲಿನ್ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.',
        storage: '25°C ಗಿಂತ ಕಡಿಮೆ ತಾಪಮಾನದಲ್ಲಿ ತೇವಾಂಶವಿಲ್ಲದಂತೆ ಇರಿಸಿ.',
        packagingWarnings: 'ವೈದ್ಯರ ಸಲಹೆಯಿಲ್ಲದೆ ಡೋಸ್ ಬದಲಿಸಬೇಡಿ. ಮಾತ್ರೆಗಳನ್ನು ಪುಡಿ ಮಾಡಬೇಡಿ.',
        foodRecommendation: 'ಯಾವಾಗಲೂ ಊಟದ ಜೊತೆಗೆ ಅಥವಾ ಊಟವಾದ ತಕ್ಷಣ ಸೇವಿಸಿ.',
        consultDoctorIf: 'ಯಾವುದೇ ಸ್ಕ್ಯಾನಿಂಗ್ ಅಥವಾ ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ ಇದ್ದರೆ ವೈದ್ಯರಿಗೆ ತಿಳಿಸಿ.',
      },
      ml: {
        activeSalt: 'മെറ്റ്ഫോർമിൻ 500mg',
        purpose: 'ടൈപ്പ് 2 പ്രമേഹമുള്ളവരിൽ രക്തത്തിലെ പഞ്ചസാരയുടെ അളവ് നിയന്ത്രിക്കാൻ സഹായിക്കുന്നു.',
        howItWorks: 'കരൾ ഗ്ലൂക്കോസ് ഉൽപ്പാദിപ്പിക്കുന്നത് കുറയ്ക്കുകയും ഇൻസുലിൻ പ്രവർത്തനം മെച്ചപ്പെടുത്തുകയും ചെയ്യുന്നു.',
        storage: '25°C-ൽ താഴെ ഈർപ്പമില്ലാതെ സൂക്ഷിക്കുക.',
        packagingWarnings: 'ഗുളിക ചവച്ചരച്ച് കഴിക്കരുത്. ഡോക്ടറുടെ നിർദ്ദേശമില്ലാതെ നിർത്തരുത്.',
        foodRecommendation: 'ഭക്ഷണത്തോടൊപ്പം അല്ലെങ്കിൽ ഭക്ഷണത്തിന് തൊട്ടുപിന്നാലെ കഴിക്കുക.',
        consultDoctorIf: 'തീവ്രമായ ക്ഷീണമോ ശ്വാസതടസ്സമോ ഉണ്ടായാൽ ഉടൻ ഡോക്ടറെ കാണുക.',
      },
      bn: {
        activeSalt: 'মেটফর্মিন হাইড্রোক্লোরাইড 500mg',
        purpose: 'টাইপ ২ ডায়াবেটিসে রক্তের শর্করার মাত্রা নিয়ন্ত্রণে সাহায্য করে।',
        howItWorks: 'লিভারে গ্লুকোজ তৈরি কমায় এবং ইনসুলিনের কার্যকারিতা বৃদ্ধি করে।',
        storage: '২৫ ডিগ্রি সেলসিয়াসের নিচে আর্দ্রতামুক্ত স্থানে রাখুন।',
        packagingWarnings: 'ট্যাবলেট চিবিয়ে খাবেন না। ডাক্তারের পরামর্শ ছাড়া বন্ধ করবেন না।',
        foodRecommendation: 'সর্বদা খাবারের সাথে বা খাবারের পরপরই গ্রহণ করুন।',
        consultDoctorIf: 'অতিরিক্ত দুর্বলতা বা অস্বস্তি লাগলে ডাক্তারের পরামর্শ নিন।',
      },
      mr: {
        activeSalt: 'मेटफॉर्मिन हायड्रोक्लोराइड 500mg',
        purpose: 'टाइप २ मधुमेहामध्ये रक्तातील साखर नियंत्रित ठेवण्यासाठी वापरले जाते.',
        howItWorks: 'यकृतातील ग्लुकोज निर्मिती कमी करून इन्सुलिनची संवेदनशीलता वाढवते.',
        storage: '२५°C पेक्षा कमी तापमानात कोरड्या जागी ठेवा.',
        packagingWarnings: 'गोळी चावून खाऊ नये. डॉक्टरांच्या सल्ल्याशिवाय बंद करू नका.',
        foodRecommendation: 'नेहमी जेवणासोबत किंवा जेवणानंतर लगेच घ्यावी.',
        consultDoctorIf: 'कोणतीही शस्त्रक्रिया किंवा स्कॅन असल्यास डॉक्टरांना पूर्वकल्पना द्या.',
      },
    },
  },
  {
    id: 'amoxicillin',
    name: 'Amoxicillin 250mg / 500mg',
    brandAliases: ['Mox 500', 'Novamox', 'Amoxil', 'Almox'],
    activeSalt: 'Amoxicillin Trihydrate (250mg/500mg)',
    category: 'Antibiotic (Penicillin class)',
    form: 'Capsule',
    standardLabelText: `MOX-500 CAPSULES
Each hard gelatin capsule contains:
Amoxicillin Trihydrate I.P. equivalent to Amoxicillin 500 mg
Approved colours used in capsule shells.
SCHEDULE H1 PRESCRIPTION DRUG:
It is dangerous to take this preparation except in accordance with medical advice.
Not to be sold by retail without the prescription of a Registered Medical Practitioner.
DIRECTIONS: Complete the full course prescribed by your physician even if symptoms subside.
Store below 25°C in a dry place. Protect from light.
WARNING: Contraindicated in patients with known Penicillin allergy.`,
    multilingual: {
      en: {
        activeSalt: 'Amoxicillin Trihydrate 500mg',
        purpose: 'Prescribed to treat bacterial infections such as chest infections, ear, nose, throat, dental, and urinary tract infections.',
        howItWorks: 'Kills bacteria by preventing them from forming their protective cell walls.',
        storage: 'Store in a cool, dry place below 25°C. Protect from moisture and direct light.',
        packagingWarnings: 'DANGER: Do not take if you have a known Penicillin allergy! Always finish the complete course of antibiotics even if feeling better, to prevent antibiotic resistance.',
        foodRecommendation: 'Can be taken with or without food. Drink plenty of water throughout the day.',
        consultDoctorIf: 'You develop rash, hives, swelling, or severe watery diarrhea during or after the course.',
      },
      te: {
        activeSalt: 'అమోక్సిసిలిన్ ట్రైహైడ్రేట్ 500mg',
        purpose: 'గొంతు, చెవి, పంటి ఇన్ఫెక్షన్లు, ఛాతీ మరియు మూత్రనాళ బ్యాక్టీరియల్ ఇన్ఫెక్షన్లను నయం చేయడానికి వాడతారు.',
        howItWorks: 'బాక్టీరియా చుట్టూ రక్షణ గోడలు ఏర్పడకుండా అడ్డుకుని వాటిని నాశనం చేస్తుంది.',
        storage: '25°C కంటే తక్కువ ఉష్ణోగ్రత వద్ద, కాంతి మరియు తేమ తగలకుండా భద్రపరచండి.',
        packagingWarnings: 'హెచ్చరిక: పెన్సిలిన్ అలర్జీ ఉన్నవారు ఈ మందు వాడకూడదు! జబ్బు తగ్గినట్లు అనిపించినా డాక్టర్ చెప్పిన అన్ని రోజులు కోర్సు పూర్తి చేయాలి.',
        foodRecommendation: 'ఆహారంతో పాటు లేదా ఆహారం తర్వాత తీసుకోవచ్చు. రోజులో సరిపడా నీరు త్రాగండి.',
        consultDoctorIf: 'చర్మంపై దద్దుర్లు, దురద లేదా విరేచనాలు వస్తే వెంటనే డాక్టర్‌ను సంప్రదించండి.',
      },
      hi: {
        activeSalt: 'अमोक्सिसिलिन 500mg',
        purpose: 'गले, कान, दांत, छाती और मूत्र मार्ग के जीवाणु (बैक्टीरियल) संक्रमण के इलाज के लिए दी जाने वाली एंटीबायोटिक।',
        howItWorks: 'बैक्टीरिया की सुरक्षात्मक परत को नष्ट करके संक्रमण को खत्म करती है।',
        storage: '25°C से कम तापमान पर सूखी जगह में रखें। प्रकाश से बचाएं।',
        packagingWarnings: 'सावधानी: पेनिसिलिन से एलर्जी होने पर यह दवा न लें! आराम महसूस होने पर भी डॉक्टर द्वारा बताया गया पूरा कोर्स समाप्त करें।',
        foodRecommendation: 'भोजन के साथ या बाद में ले सकते हैं। दिनभर पर्याप्त पानी पिएं।',
        consultDoctorIf: 'यदि चकत्ते, खुजली या गंभीर दस्त हों तो तुरंत डॉक्टर से संपर्क करें।',
      },
      ta: {
        activeSalt: 'அமோக்சிசிலின் 500mg',
        purpose: 'தொண்டை, காது, பல் மற்றும் மார்பு தொற்று போன்ற பாக்டீரியா தொற்றுகளை குணப்படுத்த பயன்படுகிறது.',
        howItWorks: 'பாக்டீரியாக்களை அழித்து உடலை தொற்றிலிருந்து பாதுகாக்கிறது.',
        storage: '25°C-க்குக் கீழ் உலர்ந்த இடத்தில் பாதுகாக்கவும்.',
        packagingWarnings: 'பெனிசிலின் ஒவ்வாமை உள்ளவர்கள் உட்கொள்ளக் கூடாது! முழு கால அளவையும் கட்டாயம் முடிக்க வேண்டும்.',
        foodRecommendation: 'உணவுடனோ அல்லது உணவுக்குப் பின்போ உட்கொள்ளலாம். நிறைய தண்ணீர் குடிக்கவும்.',
        consultDoctorIf: 'அரிப்பு அல்லது தோலில் சிவப்பு புள்ளிகள் தோன்றினால் உடனே மருத்துவரிடம் செல்லவும்.',
      },
      kn: {
        activeSalt: 'ಅಮೋಕ್ಸಿಸಿಲಿನ್ 500mg',
        purpose: 'ಗಂಟಲು, ಕಿವಿ, ಹಲ್ಲು ಹಾಗೂ ಎದೆ ಸೋಂಕು ಸೇರಿದಂತೆ ಬ್ಯಾಕ್ಟೀರಿಯಾ ಸೋಂಕು ನಿವಾರಿಸಲು ಬಳಸುವ ಆಂಟಿಬಯೋಟಿಕ್.',
        howItWorks: 'ಬ್ಯಾಕ್ಟೀರಿಯಾಗಳನ್ನು ನಾಶಪಡಿಸಿ ಸೋಂಕನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ.',
        storage: '25°C ಗಿಂತ ಕಡಿಮೆ ತಾಪಮಾನದಲ್ಲಿ ಇರಿಸಿ.',
        packagingWarnings: 'ಪೆನಿಸಿಲಿನ್ ಅಲರ್ಜಿ ಇದ್ದರೆ ಈ ಔಷಧಿ ತೆಗೆದುಕೊಳ್ಳಬೇಡಿ! ವೈದ್ಯರು ಹೇಳಿದ ಸಂಪೂರ್ಣ ಕೋರ್ಸ್ ಮುಗಿಸಿ.',
        foodRecommendation: 'ಊಟದ ನಂತರ ಸಾಕಷ್ಟು ನೀರು ಕುಡಿದು ಸೇವಿಸಿ.',
        consultDoctorIf: 'ಚರ್ಮದ ಮೇಲೆ ದದ್ದು ಅಥವಾ ತುರಿಕೆ ಬಂದರೆ ವೈದ್ಯರನ್ನು ಕಾಣಿ.',
      },
      ml: {
        activeSalt: 'അമോക്സിസിലിൻ 500mg',
        purpose: 'തൊണ്ട, ചെവി, പല്ല്, മൂത്രാശയം എന്നിവയിലെ ബാക്ടീരിയൽ അണുബാധകൾക്ക് ചികിത്സിക്കാൻ ഉപയോഗിക്കുന്നു.',
        howItWorks: 'ബാക്ടീരിയകളെ നശിപ്പിച്ച് അണുബാധ സുഖപ്പെടുത്തുന്നു.',
        storage: '25°C-ൽ താഴെ തണുപ്പുള്ള സ്ഥലത്ത് സൂക്ഷിക്കുക.',
        packagingWarnings: 'പെൻസിലിൻ അലർജിയുള്ളവർ കഴിക്കരുത്! ഡോക്ടർ പറഞ്ഞ കോഴ്സ് പൂർണ്ണമായും പൂർത്തിയാക്കണം.',
        foodRecommendation: 'ഭക്ഷണത്തിന് ശേഷം ധാരാളം വെള്ളം കുടിച്ച് കഴിക്കുക.',
        consultDoctorIf: 'ശരീരത്തിൽ തടിപ്പോ ചൊറിച്ചിലോ ഉണ്ടായാൽ ഡോക്ടറെ സമീപിക്കുക.',
      },
      bn: {
        activeSalt: 'অ্যামোক্সিসিলিন 500mg',
        purpose: 'গলা, কান, দাঁত এবং মূত্রনালীর ব্যাকটেরিয়া সংক্রমণের চিকিৎসার জন্য একটি অ্যান্টিবায়োটিক।',
        howItWorks: 'ব্যাকটেরিয়া ধ্বংস করে সংক্রমণ নিরাময় করে।',
        storage: '২৫ ডিগ্রি সেলসিয়াসের নিচে আলো থেকে দূরে রাখুন।',
        packagingWarnings: 'পেনিসিলিন অ্যালার্জি থাকলে এটি গ্রহণ করবেন না! পুরো কোর্স শেষ করুন।',
        foodRecommendation: 'খাবারের পর প্রচুর জল সহ গ্রহণ করুন।',
        consultDoctorIf: 'ত্বকে ফুসকুড়ি বা র‍্যাশ দেখা দিলে ডাক্তারকে জানান।',
      },
      mr: {
        activeSalt: 'अमॉक्सिसिलिन 500mg',
        purpose: 'घसा, कान, दात आणि छातीच्या बॅक्टेरिया संसर्गावर उपचार करण्यासाठी वापरले जाणारे अँटीबायोटिक.',
        howItWorks: 'बॅक्टेरियांचा नाश करून संसर्ग दूर करते.',
        storage: '२५°C पेक्षा कमी तापमानात कोरड्या जागी ठेवा.',
        packagingWarnings: 'पेनिसिलिनची ऍलर्जी असल्यास घेऊ नका! संपूर्ण कोर्स पूर्ण करणे अनिवार्य आहे.',
        foodRecommendation: 'जेवणानंतर भरपूर पाण्यासोबत घ्यावी.',
        consultDoctorIf: 'अंगावर खाज किंवा पुरळ उठल्यास त्वरित डॉक्टरांशी संपर्क साधा.',
      },
    },
  },
  {
    id: 'pantoprazole',
    name: 'Pantoprazole 40mg',
    brandAliases: ['Pan 40', 'Pantocid', 'Pantodac', 'Protonix'],
    activeSalt: 'Pantoprazole Sodium Gastro-resistant (40mg)',
    category: 'Proton Pump Inhibitor (Antacid / Anti-reflux)',
    form: 'Tablet',
    standardLabelText: `PAN-40
Pantoprazole Gastro-resistant Tablets I.P. 40 mg
Each gastro-resistant tablet contains:
Pantoprazole Sodium Sesquihydrate I.P. equivalent to Pantoprazole 40 mg
Colour: Ferric Oxide Yellow USP-NF
Dosage: As directed by the Physician.
Swallow whole with liquid. Do not chew or crush.
Keep out of reach of children.
Store below 25°C in a dry place. Protect from light & moisture.
Take in the morning on an empty stomach at least 30 to 60 minutes before breakfast.`,
    multilingual: {
      en: {
        activeSalt: 'Pantoprazole Sodium 40mg',
        purpose: 'Relieves acidity, heartburn, gastroesophageal reflux disease (GERD), and prevents stomach ulcers.',
        howItWorks: 'Blocks the proton pump in the stomach lining, significantly decreasing excess stomach acid secretion.',
        storage: 'Store in a dry place below 25°C. Protect from moisture. Keep out of reach of children.',
        packagingWarnings: 'Do not crush or chew the tablet. Swallow whole with water. Not intended for immediate relief of sudden heartburn.',
        foodRecommendation: 'IMPORTANT: Best taken once daily in the morning on an EMPTY STOMACH, at least 30-60 minutes before breakfast.',
        consultDoctorIf: 'Chest pain radiates to your arm, neck, or shoulder, or if vomiting blood or having dark tarry stools.',
      },
      te: {
        activeSalt: 'పాంటోప్రజోల్ సోడియం 40mg',
        purpose: 'కడుపులో మంట, ఎసిడిటీ, గ్యాస్ మరియు అల్సర్ల నివారణకు వాడతారు.',
        howItWorks: 'కడుపులో అధిక ఆమ్ల (యాసిడ్) ఉత్పత్తిని గణనీయంగా తగ్గిస్తుంది.',
        storage: '25°C కంటే తక్కువ ఉష్ణోగ్రత వద్ద, తేమ తగలకుండా ఉంచండి.',
        packagingWarnings: 'ఈ మాత్రను నమలరాదు లేదా విరవరాదు. నీటితో అలాగే మింగాలి.',
        foodRecommendation: 'ముఖ్యమైన సూచన: ఉదయం పూట ఖాళీ కడుపుతో, అల్పాహారానికి 30-60 నిమిషాల ముందు వేసుకోవాలి.',
        consultDoctorIf: 'ఛాతీ నొప్పి చేతులు లేదా దవడ వైపు వ్యాపిస్తే లేదా వాంతులు అవుతుంటే వెంటనే డాక్టర్‌ను సంప్రదించండి.',
      },
      hi: {
        activeSalt: 'पैंटोप्रजोल सोडियम 40mg',
        purpose: 'एसिडिटी, सीने में जलन, पेट में गैस और अल्सर के इलाज में उपयोगी।',
        howItWorks: 'पेट में अतिरिक्त एसिड के निर्माण को रोकता है।',
        storage: '25°C से कम तापमान पर नमी से बचाकर रखें।',
        packagingWarnings: 'गोली को चबाएं या तोड़ें नहीं, पानी के साथ पूरी निगलें।',
        foodRecommendation: 'महत्वपूर्ण: सुबह नाश्ते से 30-60 मिनट पहले खाली पेट लेना सबसे अधिक असरदार होता है।',
        consultDoctorIf: 'सीने का दर्द कंधे या बांह तक फैले तो तुरंत चिकित्सक को दिखाएं।',
      },
      ta: {
        activeSalt: 'பான்டோபிரசோல் 40mg',
        purpose: 'நெஞ்செரிச்சல், அசிடிட்டி, வயிற்றுப்புண் மற்றும் வாயு பிரச்சனையை குணப்படுத்த உதவுகிறது.',
        howItWorks: 'வயிற்றில் சுரக்கும் அதிகப்படியான அமிலத்தைக் குறைக்கிறது.',
        storage: '25°C-க்குக் கீழ் பாதுகாப்பாக வைக்கவும்.',
        packagingWarnings: 'மாத்திரையை நசுக்காமல் முழுதாக விழுங்க வேண்டும்.',
        foodRecommendation: 'காலை உணவுக்கு 30-60 நிமிடங்களுக்கு முன் வெறும் வயிற்றில் உட்கொள்வது சிறந்தது.',
        consultDoctorIf: 'நெஞ்சு வலி அதிகமாக இருந்தால் மருத்துவரை அணுகவும்.',
      },
      kn: {
        activeSalt: 'ಪ್ಯಾಂಟೊಪ್ರಜೋಲ್ 40mg',
        purpose: 'ಎದೆಯುರಿ, ಅಸಿಡಿಟಿ ಮತ್ತು ಗ್ಯಾಸ್ಟ್ರಿಕ್ ಸಮಸ್ಯೆಗೆ ಪರಿಹಾರ ನೀಡುತ್ತದೆ.',
        howItWorks: 'ಹೊಟ್ಟೆಯಲ್ಲಿ ಆಮ್ಲದ ಉತ್ಪಾದನೆಯನ್ನು ತಗ್ಗಿಸುತ್ತದೆ.',
        storage: '25°C ಗಿಂತ ಕಡಿಮೆ ತಾಪಮಾನದಲ್ಲಿ ಇರಿಸಿ.',
        packagingWarnings: 'ಮಾತ್ರೆಯನ್ನು ಜಗಿಯಬಾರದು, ಹಾಗೆಯೇ ನುಂಗಬೇಕು.',
        foodRecommendation: 'ಬೆಳಗ್ಗೆ ಉಪಾಹಾರಕ್ಕೆ 30 ರಿಂದ 60 ನಿಮಿಷಗಳ ಮೊದಲು ಖಾಲಿ ಹೊಟ್ಟೆಯಲ್ಲಿ ತೆಗೆದುಕೊಳ್ಳಿ.',
        consultDoctorIf: 'ಎದೆನೋವು ತೀವ್ರವಾಗಿದ್ದರೆ ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಿ.',
      },
      ml: {
        activeSalt: 'പാൻ്റോപ്രസോൾ 40mg',
        purpose: 'നെഞ്ചെരിച്ചിൽ, അസിഡിറ്റി, ഗ്യാസ് എന്നിവയ്ക്ക് പരിഹാരം നൽകുന്നു.',
        howItWorks: 'വയറ്റിലെ അമിത ആസിഡ് ഉൽപ്പാദനം തടയുന്നു.',
        storage: '25°C-ൽ താഴെ ഈർപ്പമില്ലാത്ത സ്ഥലത്ത് സൂക്ഷിക്കുക.',
        packagingWarnings: 'ഗുളിക പൊടിക്കാതെ വിഴുങ്ങുക.',
        foodRecommendation: 'രാവിലെ പ്രാതലിന് അരമണിക്കൂർ മുമ്പ് വെറുംവയറ്റിൽ കഴിക്കുക.',
        consultDoctorIf: 'നെഞ്ചുവേദന കഠിനമാണെങ്കിൽ ഉടൻ ഡോക്ടറെ കാണുക.',
      },
      bn: {
        activeSalt: 'প্যান্টোপ্রাজল 40mg',
        purpose: 'গ্যাসের সমস্যা, অম্বল ও বুকজ্বালা কমাতে সহায়ক।',
        howItWorks: 'পেটে অতিরিক্ত অ্যাসিড উৎপাদন বন্ধ করে।',
        storage: '২৫ ডিগ্রি সেলসিয়াসের নিচে শুষ্ক স্থানে রাখুন।',
        packagingWarnings: 'ট্যাবলেটটি চিবাবেন না, পুরোটা জল দিয়ে গিলবেন।',
        foodRecommendation: 'সকালে খালি পেটে প্রাতরাশের ৩০-৬০ মিনিট আগে খাওয়া উচিত।',
        consultDoctorIf: 'বুকে তীব্র যন্ত্রণা হলে অবিলম্বে হাসপাতালে যান।',
      },
      mr: {
        activeSalt: 'पँटोप्राझोल 40mg',
        purpose: 'ऍसिडिटी, छातीत जळजळ आणि पोटात गॅस होण्यावर आराम देते.',
        howItWorks: 'पोटातील अति आम्ल निर्मिती कमी करते.',
        storage: '२५°C पेक्षा कमी तापमानात ठेवा.',
        packagingWarnings: 'गोळी चावू नका, थेट गिळावी.',
        foodRecommendation: 'सकाळी नाश्त्यापूर्वी ३०-६० मिनिटे उपाशी पोटी घेणे उत्तम.',
        consultDoctorIf: 'छातीत तीव्र दुखत असल्यास डॉक्टरांकडे जावे.',
      },
    },
  },
  {
    id: 'cetirizine',
    name: 'Cetirizine Hydrochloride 10mg',
    brandAliases: ['Cetzine', 'Alerid', 'Zyrtec', 'Okacet'],
    activeSalt: 'Cetirizine Hydrochloride (10mg)',
    category: 'Antihistamine (Allergy Reliever)',
    form: 'Tablet',
    standardLabelText: `CETZINE-10
Cetirizine Hydrochloride Tablets I.P. 10 mg
Each film-coated tablet contains:
Cetirizine Hydrochloride I.P. 10 mg
Colour: Titanium Dioxide I.P.
Dosage: As directed by the Physician.
WARNING: May cause drowsiness. Avoid driving or operating machinery after consumption.
Store in a cool, dark and dry place. Protect from moisture.
Keep out of reach of children.`,
    multilingual: {
      en: {
        activeSalt: 'Cetirizine Hydrochloride 10mg',
        purpose: 'Relieves allergy symptoms like runny nose, sneezing, itchy/watery eyes, skin itching, and hives.',
        howItWorks: 'Blocks histamine, a chemical substance produced by the immune system during allergic reactions.',
        storage: 'Store in a cool, dry place away from heat and moisture.',
        packagingWarnings: 'May cause drowsiness or dizziness. Avoid alcohol, driving, or handling machinery after taking.',
        foodRecommendation: 'Can be taken with or without food. Usually preferred at night/bedtime due to mild sedative effects.',
        consultDoctorIf: 'Difficulty urinating or severe dry mouth occurs, or symptoms do not improve after a week.',
      },
      te: {
        activeSalt: 'సెటిరిజైన్ హైడ్రోక్లోరైడ్ 10mg',
        purpose: 'ముక్కు కారడం, తుమ్ములు, కళ్లు దురద, చర్మంపై దద్దుర్లు వంటి అలర్జీ లక్షణాలను తగ్గిస్తుంది.',
        howItWorks: 'అలర్జీ కలిగించే హిస్టామిన్ అనే రసాయనాన్ని అడ్డుకుంటుంది.',
        storage: 'చల్లని, పొడి ప్రదేశంలో భద్రపరచండి.',
        packagingWarnings: 'ఈ మందు వేసుకుంటే నిద్రమత్తు రావచ్చు. డ్రైవింగ్ లేదా బరువైన యంత్రాలు నడపడం నివారించండి.',
        foodRecommendation: 'ఆహారంతో సంబంధం లేకుండా తీసుకోవచ్చు. నిద్రమత్తు వల్ల రాత్రి పడుకునే ముందు తీసుకోవడం మంచిది.',
        consultDoctorIf: 'తీవ్రమైన గొంతు వాపు లేదా శ్వాసలో ఇబ్బంది ఉంటే వెంటనే అత్యవసర చికిత్స తీసుకోండి.',
      },
      hi: {
        activeSalt: 'सिटिरिजिन 10mg',
        purpose: 'एलर्जी के लक्षण जैसे छींक आना, नाक बहना, आंखों में खुजली और त्वचा पर चकत्ते में राहत देती है।',
        howItWorks: 'शरीर में एलर्जी पैदा करने वाले हिस्टामाइन रसायन को रोकती है।',
        storage: 'ठंडी और सूखी जगह पर रखें।',
        packagingWarnings: 'इस दवा से नींद या सुस्ती आ सकती है। गाड़ी चलाने या भारी मशीनरी से बचें।',
        foodRecommendation: 'खाने के साथ या बिना ले सकते हैं। आमतौर पर रात में सोने से पहले लेना बेहतर होता है।',
        consultDoctorIf: 'यदि लक्षण 7 दिनों में ठीक न हों तो डॉक्टर से परामर्श करें।',
      },
      ta: {
        activeSalt: 'செட்டிரிசின் 10mg',
        purpose: 'தும்மல், மூக்கு ஒழுகுதல், கண் அரிப்பு மற்றும் ஒவ்வாமைக்கு பயன்படுகிறது.',
        howItWorks: 'ஒவ்வாமை ஏற்படுத்தும் ஹிஸ்டமைனை தடுக்கிறது.',
        storage: 'குளிர்ந்த, உலர்ந்த இடத்தில் வைக்கவும்.',
        packagingWarnings: 'தூக்கக் கலக்கம் வரலாம். வாகனம் ஓட்டுவதைத் தவிர்க்கவும்.',
        foodRecommendation: 'இரவு படுக்கைக்குச் செல்லும் முன் உட்கொள்வது நல்லது.',
        consultDoctorIf: 'ஒவ்வாமை அதிகமானால் மருத்துவரை அணுகவும்.',
      },
      kn: {
        activeSalt: 'ಸೆಟಿರಿಜಿನ್ 10mg',
        purpose: 'ಸೀನು, ನೆಗಡಿ, ಕಣ್ಣು ತುರಿಕೆ ಹಾಗೂ ಅಲರ್ಜಿ ನಿವಾರಣೆಗೆ ಬಳಸಲಾಗುತ್ತದೆ.',
        howItWorks: 'ಅಲರ್ಜಿ ಉಂಟುಮಾಡುವ ರಾಸಾಯನಿಕವನ್ನು ತಡೆಯುತ್ತದೆ.',
        storage: 'ತಂಪಾದ, ಒಣ ಜಾಗದಲ್ಲಿ ಇರಿಸಿ.',
        packagingWarnings: 'ತೂಕಡಿಕೆ ಬರಬಹುದು. ವಾಹನ ಚಾಲನೆ ಮಾಡಬೇಡಿ.',
        foodRecommendation: 'ರಾತ್ರಿ ಮಲಗುವ ಮುನ್ನ ತೆಗೆದುಕೊಳ್ಳುವುದು ಉತ್ತಮ.',
        consultDoctorIf: 'ಉಸಿರಾಟದ ತೊಂದರೆಯಾದರೆ ತಕ್ಷಣ ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಿ.',
      },
      ml: {
        activeSalt: 'സെറ്റിരിസിൻ 10mg',
        purpose: 'തുമ്മൽ, ജലദോഷം, കണ്ണിലെ ചൊറിച്ചിൽ, അലർജി എന്നിവയ്ക്ക് ഉപയോഗിക്കുന്നു.',
        howItWorks: 'അലർജി ലക്ഷണങ്ങൾ ഉണ്ടാക്കുന്ന പദാർത്ഥത്തെ തടയുന്നു.',
        storage: 'തണുപ്പുള്ള ഉണങ്ങിയ സ്ഥലത്ത് സൂക്ഷിക്കുക.',
        packagingWarnings: 'മയക്കം ഉണ്ടാക്കാം. വണ്ടിയോടിക്കുന്നത് ഒഴിവാക്കുക.',
        foodRecommendation: 'രാത്രി ഉറങ്ങുന്നതിന് മുമ്പ് കഴിക്കുന്നത് നല്ലതാണ്.',
        consultDoctorIf: 'ലക്ഷണങ്ങൾ കുറയുന്നില്ലെങ്കിൽ ഡോക്ടറെ കാണുക.',
      },
      bn: {
        activeSalt: 'সিটিরিজিন 10mg',
        purpose: 'হাঁচি, সর্দি, চুলকানি ও অ্যালার্জির উপশমে ব্যবহৃত হয়।',
        howItWorks: 'শরীরের অ্যালার্জিক প্রতিক্রিয়া সৃষ্টিকারী পদার্থকে নিষ্ক্রিয় করে।',
        storage: 'ঠান্ডা ও শুষ্ক জায়গায় রাখুন।',
        packagingWarnings: 'ঘুম বা ঝিমুনি আসতে পারে। গাড়ি চালানো পরিহার করুন।',
        foodRecommendation: 'রাতে শোবার আগে সেবন করা উত্তম।',
        consultDoctorIf: 'অতিরিক্ত শ্বাসকষ্ট হলে চিকিৎসকের সাহায্য নিন।',
      },
      mr: {
        activeSalt: 'सिटिरिझिन 10mg',
        purpose: 'शिंका येणे, नाक वाहणे, डोळ्यांना खाज आणि ऍलर्जीच्या त्रासावर गुणकारी.',
        howItWorks: 'ऍलर्जी निर्माण करणाऱ्या हिस्टामाइनला रोखते.',
        storage: 'थंड आणि कोरड्या जागी ठेवा.',
        packagingWarnings: 'या औषधामुळे गुंगी येऊ शकते. वाहन चालवणे टाळावे.',
        foodRecommendation: 'रात्री झोपण्यापूर्वी घेणे सोयीचे ठरते.',
        consultDoctorIf: 'त्रास कमी न झाल्यास डॉक्टरांचा सल्ला घ्या.',
      },
    },
  },
];
