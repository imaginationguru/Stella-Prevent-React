import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LOCALES } from '@i18n/constants';
import languageResources from '@i18n/json';
import { useSelector } from 'react-redux';

const defaultLang = languageResources;
const defaultLocales = LOCALES;

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (cb) => cb(LOCALES.ENGLISH),
  init: () => { },
  cacheUserLanguage: () => { },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    lng: defaultLocales.ENGLISH,
    fallbackLng: defaultLocales.ENGLISH,
    resources: { ...defaultLang },
    debug: false,
  });

export const translate = (_key, _values = {}) => {
  return i18n.t(_key, _values);
};

export const changeLanguage = (lang) => {
  i18n.changeLanguage(lang);
};

export default i18n;
