import { useEffect, useState } from "react";
import { ISchedule } from "../interfaces/ISchedule";
import { getScheduleForGroup } from "../handlers/ScheduleHandler";
import { IGroup } from "../interfaces/IGroup";
import ScheduleTable from "./ScheduleTable";
import { getSetting, setSetting } from "../services/SettingsServices";
import { useTranslation } from "react-i18next";

export default function Schedule() {
    const { t } = useTranslation();
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [suggestions, setSuggestions] = useState<IGroup[]>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1);
    const [schedule, setSchedule] = useState<ISchedule>();

    useEffect(() => {
        fetchAllGroups();
        fetchScheduleForGroup();
    }, []);

    async function fetchScheduleForGroup() {
        const schedule = await getScheduleForGroup(getSetting("scheduleGroupName"));
        if (schedule) {
            setSchedule(schedule);
        }
    };

    async function fetchAllGroups() {
        if (localStorage.getItem("groups")) {
            setGroups(JSON.parse(localStorage.getItem("groups") || ""));
        }
        else {
            const response = await fetch("https://api.campus.kpi.ua/schedule/groups");
            const groups = await response.json();
            setGroups(groups.data);
            localStorage.setItem('groups', JSON.stringify(groups.data));
        }
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSetting("scheduleGroupName", value)

        if (value.length > 1) {
            const filteredSuggestions = groups.filter(group =>
                group.name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
            setActiveSuggestionIndex(-1);
        } else {
            setSuggestions([]);
        }
    }

    function handleSuggestionClick(suggestion: string) {
        setSetting("scheduleGroupName", suggestion);
        setSuggestions([]);
        fetchScheduleForGroup();
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (suggestions.length > 0) {
            if (e.key === "ArrowDown") {
                setActiveSuggestionIndex((prevIndex) =>
                    prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1
                );
            } else if (e.key === "ArrowUp") {
                setActiveSuggestionIndex((prevIndex) =>
                    prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1
                );
            } else if (e.key === "Enter") {
                if (activeSuggestionIndex >= 0) {
                    handleSuggestionClick(suggestions[activeSuggestionIndex].name);
                }
            }
        }
    }

    return (
        <>
            <div className="header">
                <div>
                    <span>{t("schedule_for")}</span>
                    <input className="groupname-input" type="text" value={getSetting("scheduleGroupName")} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder={t("group_placeholder")} />

                    {suggestions.length > 0 && (
                        <ul className="autocomplete-items">
                            {suggestions.map((group, index) => (
                                <li key={index} className={`autocomplete-item ${index === activeSuggestionIndex ? "active" : ""}`} onClick={() => handleSuggestionClick(group.name)}>
                                    {group.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {schedule &&
                <>
                    <ScheduleTable week={schedule.weeks[0]} />
                    <ScheduleTable week={schedule.weeks[1]} />
                </>
            }
        </>
    );
}
