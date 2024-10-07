import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IDiscipline } from "../interfaces/student/IDiscipline";
import { formatDisciplineFullName } from "../services/TextFormatters";
import { getAllDisciplines } from "../handlers/DisciplinesListHandler";
import Header from "./default/Header";
import { getSettings, setSetting } from "../services/SettingsServices";
import { useTranslation } from "react-i18next";

export default function DisciplinesList() {
    const { t } = useTranslation();
    const [settings, setSettingsState] = useState(getSettings());
    const [disciplines, setDisciplines] = useState<IDiscipline[]>([]);

    useEffect(() => {
        fetchDisciplines();
    }, []);

    useEffect(() => {
        setSetting("selectedSemester", settings.selectedSemester);
    }, [settings.selectedSemester]);

    async function fetchDisciplines() {
        setDisciplines(await getAllDisciplines());
    }

    const filteredDisciplines = disciplines.filter(discipline => discipline.semester === settings.selectedSemester);

    const handleSemesterChange = (semester: number) => {
        setSettingsState({ ...settings, selectedSemester: semester });
    };

    return (
        <>
            <Header title={t("disciplines")} isShowSlider={true} selectedSemester={settings.selectedSemester} setSelectedSemester={handleSemesterChange} />
            <div style={{ margin: "20px", marginBottom: "150px" }}>
                {filteredDisciplines.length > 0 ? (
                    filteredDisciplines.map((discipline, index) => (
                        <Link to={`/scores/${discipline.id}`} key={index} className="link">
                            <div className="discipline-item">
                                <span>{index + 1}</span>
                                <span style={{ marginTop: "6px" }}>{settings.isShowFullDisciplineName ? discipline.title : formatDisciplineFullName(discipline.title)}
                                    <br />
                                    <p>{discipline.teacher}</p>
                                </span>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>{t("no_disciplines")}</p>
                )}
            </div>
        </>
    );
}