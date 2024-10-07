import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getSetting } from "../../services/SettingsServices";
import ua from "../../data/translations/ua.json";
import en from "../../data/translations/en.json";
import pl from "../../data/translations/pl.json";
import it from "../../data/translations/it.json";
import gr from "../../data/translations/gr.json";

const resources = {
    ua: { translation: ua },
    en: { translation: en },
    pl: { translation: pl },
    it: { translation: it },
    gr: { translation: gr },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: getSetting("selectedLanguage"),
        debug: true,
        fallbackLng: "ua",
        interpolation: {
            escapeValue: false
        },
        ns: ["translation"],
        defaultNS: "translation"
    });

export default i18n;