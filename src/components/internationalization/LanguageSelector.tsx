import React, { useEffect, useState } from "react";
import { setSetting, getSettings } from "../../services/SettingsServices";
import i18n from "./index.ts";
import { useTranslation } from "react-i18next";

const languages = [
    { value: "ua", label: "Українська" },
    { value: "en", label: "English" },
    { value: "pl", label: "Polski" },
    { value: "it", label: "Italiano" },
    { value: "gr", label: "Deutsch" },
];

const LanguageSelector = () => {
    const { t } = useTranslation();
    const [settings, setSettingsState] = useState(() => getSettings());

    useEffect(() => {
        setSetting('selectedLanguage', settings.selectedLanguage);
        i18n.changeLanguage(settings.selectedLanguage);
    }, [settings.selectedLanguage]);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(e.target.value);
        setSettingsState({ ...settings, selectedLanguage: e.target.value });
    };

    return (
        <div>
            <h2>{t("language")}</h2>
            <select value={settings.selectedLanguage} onChange={handleLanguageChange} className="dropdown">
                {languages.map(language => (
                    <option key={language.value} value={language.value}>
                        {language.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;