import { useEffect, useState } from "react";
import { formatDisciplineFullName, formatExamDate, formatExamScore } from "../services/TextFormatters";
import { getAllExams } from "../handlers/ExamsHandler";
import { IExam } from "../interfaces/student/IExam";
import Header from "./default/Header";
import { getSettings, setSetting } from "../services/SettingsServices";
import { useTranslation } from "react-i18next";

export default function Session() {
    const { t } = useTranslation();
    const [settings, setSettingsState] = useState(getSettings());
    const [exams, setExams] = useState<IExam[]>([]);
    const [averageScore, setAverageScore] = useState<number>(0.0);

    useEffect(() => {
        fetchAllExams();
    }, []);

    useEffect(() => {
        setSetting("selectedSemester", settings.selectedSemester);
        calculateAverageScore();
    }, [settings.selectedSemester, exams]);

    async function fetchAllExams() {
        const exams = await getAllExams();
        const sortedExams = sortExamsBySemester(exams);
        setExams(sortedExams);
    }

    function sortExamsBySemester(exams: IExam[]): IExam[] {
        return exams.map(exam => {
            const date = new Date(exam.dateTime);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            let semester: number;
            if (month === 1) semester = (year - 2024) * 2 + 1; // 1 half-year
            else if (month === 6) semester = (year - 2024) * 2 + 2; // 2 half-year
            else semester = 0;

            return { ...exam, semester };
        });
    }

    const handleSemesterChange = (semester: number) => {
        setSettingsState({ ...settings, selectedSemester: semester });
    };

    const filteredExams = exams.filter(exam => exam.semester === settings.selectedSemester);

    function calculateAverageScore() {
        if (filteredExams.length === 0) {
            setAverageScore(0);
            return;
        }

        const totalScore = filteredExams.reduce((sum, exam) => sum + parseInt(exam.score), 0);
        const average = totalScore / filteredExams.length;
        setAverageScore(average);
    }

    return (
        <>
            <Header title={t("session")} isShowSlider={true} selectedSemester={settings.selectedSemester} setSelectedSemester={handleSemesterChange} />
            <table>
                <thead>
                    <tr>
                        <th>{t("type")}</th>
                        <th>{t("discipline")}</th>
                        <th>{t("examiner")}</th>
                        <th>{t("date")}</th>
                        <th>{t("session")}</th>
                        <th>{t("score")}</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(filteredExams) ? (
                        filteredExams.map((e, index) => (
                            <tr key={index}>
                                <td>{e.typeOfExam === t("exam") ? <span color="danger">{t("exam")}</span> : <span>{t("test")}</span>}</td>
                                <td>{settings.isShowFullDisciplineName ? e.disciplineTitle : formatDisciplineFullName(e.disciplineTitle)}</td>
                                <td>{e.examinerFullName}</td>
                                <td>{formatExamDate(e.dateTime)}</td>
                                <td>{e.typeOfSession}</td>
                                <td>{formatExamScore(e.score)}</td>
                            </tr>
                        ))) : (<h2>{t("no_data")}</h2>)}
                </tbody>
            </table>    

            {averageScore &&
                <div className="rounded-container" style={{}}>
                    <h3> {t("average_score")}: {filteredExams.reduce((sum, exam) => sum + parseInt(exam.score), 0)} / {filteredExams.length}  = {averageScore.toFixed(4)}</h3>
                    <p className="subtitle">*без врахування додаткових балів.</p>
                    <p className="subtitle">Дізнатися більше про нарахування додаткових балів можна за цим <a target="_blank" href="https://dnvr.kpi.ua/2023/12/04/8455/">посиланням</a></p>
                </div>
            }
        </>
    );
}
