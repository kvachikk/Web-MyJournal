import { ISettings } from "../interfaces/ISettings";

const SETTINGS_KEY = 'settings';

export function setSettings(settings: ISettings): void {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function getSettings(): ISettings {
    const settings = localStorage.getItem(SETTINGS_KEY);
    return settings ? JSON.parse(settings) : getDefaultSettings();
}

export function getSetting<T extends keyof ISettings>(key: T): ISettings[T] {
    const settings = getSettings();
    return settings[key];
}

export function setSetting<T extends keyof ISettings>(key: T, value: ISettings[T]): void {
    const settings = getSettings();
    settings[key] = value;
    setSettings(settings);
}

function getDefaultSettings(): ISettings {
    return {
        fontSize: 16,
        selectedTheme: 'light',
        selectedSemester: 1,
        selectedEndpoint: '/',
        selectedLanguage: 'ua',
        scheduleGroupName: '',
        isShowFullDisciplineName: false,
    };
}