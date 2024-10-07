import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IDiscipline } from "../interfaces/student/IDiscipline";
import { formatDisciplineFullName } from "../services/TextFormatters";
import { setSetting, getSettings } from "../services/SettingsServices";
import { getAllDisciplines } from "../handlers/DisciplinesListHandler";
import { logout } from "../services/APIServices";
import Header from "./default/Header";
import LanguageSelector from "./internationalization/LanguageSelector";
import { useTranslation } from "react-i18next";

export default function Settings() {
    const navigator = useNavigate();
    const { t } = useTranslation();
    const [settings, setSettingsState] = useState(getSettings());
    const [disciplines, setDisciplines] = useState<IDiscipline[]>([]);

    useEffect(() => {
        if (!localStorage.getItem("asc")) navigator("/login");
        else {
            fetchDisciplines();
        }
        updateSliderBackground();
    }, []);

    useEffect(() => {
        setSetting('fontSize', settings.fontSize);
        updateFontSize();
        updateSliderBackground();
    }, [settings.fontSize]);

    useEffect(() => {
        setSetting('isShowFullDisciplineName', settings.isShowFullDisciplineName);
    }, [settings.isShowFullDisciplineName]);

    async function fetchDisciplines() {
        setDisciplines(await getAllDisciplines());
    }

    const handleSwitchChange = (value: boolean) => {
        setSettingsState({ ...settings, isShowFullDisciplineName: value });
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettingsState({ ...settings, fontSize: parseInt(e.target.value) });
    };

    const updateSliderBackground = () => {
        const slider = document.querySelector(".slider") as HTMLInputElement;
        if (slider) {
            const value = ((settings.fontSize - parseInt(slider.min)) / (parseInt(slider.max) - parseInt(slider.min))) * 100;
            slider.style.setProperty("--value", `${value}%`);
        }
    };

    const updateFontSize = () => {
        document.documentElement.style.setProperty('--base-font-size', settings.fontSize + 'px');
    };

    const handleLogout = async () => {
        await logout();
        navigator("/login");
    };

    return (
        <>
            <Header title={t("settings")} isShowSlider={false} />
            <div className="rounded-container">
                <div>
                    <h2>{t("font_size")}: {settings.fontSize} {(settings.fontSize === 16) ? t("recomended") : ""}</h2>
                    <input style={{ marginLeft: "0px" }} type="range" step="1" min="10" max="20" value={settings.fontSize} onChange={handleSliderChange} className="slider" />
                </div>

                <LanguageSelector />

                <div>
                    <h2>{t("discipline_name_display")}</h2>
                    <span style={{ marginTop: "-8px" }} className="subtitle">
                        {t("example")}: {disciplines.length > 0 ? (settings.isShowFullDisciplineName ? disciplines[1].title : formatDisciplineFullName(disciplines[1].title)) : t("loading")}
                    </span>

                    <div className="radio-container" style={{ flexDirection: "row" }}>
                        <label className={`radio ${!settings.isShowFullDisciplineName ? 'active' : ''}`}>
                            <input type="radio" name="disciplineNameDisplay" checked={!settings.isShowFullDisciplineName} onChange={() => handleSwitchChange(false)} />
                            <span className="radio-label">{t("short_name")}</span>
                        </label>
                        <label className={`radio ${settings.isShowFullDisciplineName ? 'active' : ''}`}>
                            <input type="radio" name="disciplineNameDisplay" checked={settings.isShowFullDisciplineName} onChange={() => handleSwitchChange(true)} />
                            <span className="radio-label">{t("full_name")}</span>
                        </label>
                    </div>
                </div>

                <div>
                    <button className="logout-button" onClick={handleLogout}>
                        {t("logout")}
                    </button>
                </div>
            </div>
        </>
    );
}
