import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDisciplineFullName, formatScoreSumTitle, formatScoringDate } from "../services/TextFormatters";
import { getAllScoresByDiscipline } from "../handlers/DisciplineScoresHandler";
import { IDiscipline } from "../interfaces/student/IDiscipline";
import { IScore } from "../interfaces/student/IScore";
import Header from "./default/Header";
import { useTranslation } from "react-i18next";

export default function DisciplineScores() {
    const { t } = useTranslation();
    const { disciplineId } = useParams<{ disciplineId: string }>();
    const [scores, setScores] = useState<IScore[]>();
    const [disciplines, setDisciplines] = useState<IDiscipline[]>([]);
    const [disciplineInfo, setSelectedDisciplineInfo] = useState<IDiscipline | null>(null);
    const [sumTitle, setSumTitle] = useState<string>("");

    useEffect(() => {
        const stored = localStorage.getItem("disciplinesData");
        if (stored) {
            setDisciplines(JSON.parse(stored).disciplines);
        }
    }, []);

    // getting info about opened discipline
    useEffect(() => {
        if (disciplines.length > 0 && disciplineId) {
            const found = disciplines.find(d => d.id === disciplineId);
            if (found) {
                setSelectedDisciplineInfo(found);
                fetchDisciplineScores(parseInt(found.id));
            }
        }
    }, [disciplines, disciplineId]);

    useEffect(() => {
        let sum: number = 0.0;
        const list = scores?.map(score => parseFloat(score.scoreValue)) || [];

        list.forEach(score => {
            if (!isNaN(score)) {
                sum += score;
            }
        });

        setSumTitle(formatScoreSumTitle(Number((sum).toFixed(2))));
    }, [scores]);

    async function fetchDisciplineScores(id: number) {
        setScores(await getAllScoresByDiscipline(id));
    };

    return (
        <>
            {disciplineInfo && (
                <>
                    <Header title={formatDisciplineFullName(disciplineInfo.title) + " | " + sumTitle} isShowSlider={false} />
                    <table>
                        <thead>
                            <tr>
                                <th>{t("issued")}</th>
                                <th>{t("score")}</th>
                                <th>{t("type_of_control")}</th>
                                <th>{t("teacher")}</th>
                                <th>{t("note")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(scores) && scores.length > 0 ? (
                                scores.map((score, index) => (
                                    <tr key={index}>
                                        <td>{formatScoringDate(score.date)}</td>
                                        <td>{score.scoreValue}</td>
                                        <td>{score.typeOfControl}</td>
                                        <td>{score.teacher}</td>
                                        <td>{score.note}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td>{t("loading")}...</td></tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
}