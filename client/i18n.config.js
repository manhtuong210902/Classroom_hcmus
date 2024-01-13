import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranlation from "./public/locales/en/common.json";
import viTranlation from "./public/locales/vi/common.json";

const resources = {
    en: {
        translation: enTranlation,
    },
    vi: {
        translation: viTranlation,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
