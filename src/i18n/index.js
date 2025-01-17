import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi) // Загрузка переводов через HTTP
  .use(LanguageDetector) // Определение языка
  .use(initReactI18next) // Интеграция с React
  .init({
    supportedLngs: ["en", "uk", "pl"], // Доступные языки
    fallbackLng: "en", // Язык по умолчанию
    debug: false,
    backend: {
      loadPath: "/src/locales/{{lng}}/translation.json", // Путь к файлам переводов в public
    },
    detection: {
      order: ["queryString", "cookie", "localStorage", "navigator", "htmlTag"], // Порядок определения языка
      caches: ["cookie"], // Где сохранять выбранный язык
    },
    interpolation: {
      escapeValue: false, // Отключение экранирования для React
    },
  });

export default i18n;
