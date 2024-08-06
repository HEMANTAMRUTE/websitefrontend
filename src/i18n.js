import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './local/english/Home.json'
import frTranslations from './local/english/French.json'
import ChTranslations from './local/english/Chinese.json'
import HiTranslations from './local/english/Hindi.json'
import SpTranslations from './local/english/Spanish.json'
import PoTranslations from './local/english/Portugese.json'
// Initialize i18n
i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      fr:{
        translation: frTranslations,
      },
      ch:{
        translation: ChTranslations,
      },
      hi:{
        translation: HiTranslations,
      },
      
        sp:{
          translation: SpTranslations,
        },
        po:{
          translation: PoTranslations,
        }
      
      
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18n;
