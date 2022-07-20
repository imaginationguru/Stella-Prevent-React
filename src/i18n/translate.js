import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LOCALES } from '@i18n/constants';
import languageResources from '@i18n/json';
import { storeItem, getItem } from '@utils/AsyncUtils';
import store from '@store/setup';



const defaultLang = languageResources;
const defaultLocales = LOCALES;

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (cb) => cb(getItem('language') != undefined ? getItem('language') : LOCALES.ENGLISH),
  init: () => { },
  cacheUserLanguage: () => { },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    lng: getItem('language') != undefined ? getItem('language') : defaultLocales.ENGLISH,
    fallbackLng: getItem('language') != undefined ? getItem('language') : defaultLocales.ENGLISH,
    // lng: defaultLocales.SPANISH,
    // fallbackLng: defaultLocales.SPANISH,
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
