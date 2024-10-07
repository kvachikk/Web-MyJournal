import { useEffect, useState } from "react";
import Header from "./default/Header.tsx";
import { IAttestation } from "../interfaces/student/IAttestation.ts";
import { getSettings, setSetting } from "../services/SettingsServices.tsx";
import { getAllAttestationResults } from "../handlers/AttestationHandler.tsx";
import { formatDisciplineFullName } from "../services/TextFormatters.tsx";
import { useTranslation } from "react-i18next";

export default function Attestations() {
    const { t } = useTranslation();
    const [settings, setSettingsState] = useState(getSettings());
    const [attestations, setAttestations] = useState<IAttestation[]>([]);

    useEffect(() => {
        fetchAttestationResults();
    }, []);

    async function fetchAttestationResults() {
        const results = await getAllAttestationResults();
        setAttestations(results);
    }

    useEffect(() => {
        setSetting("selectedSemester", settings.selectedSemester);
    }, [settings.selectedSemester]);

    const handleSemesterChange = (semester: number) => {
        setSettingsState({ ...settings, selectedSemester: semester });
    };

    const filteredAttestations = attestations.filter(attestation =>
        attestation.date.includes(`${settings.selectedSemester} ${t("semester")}`)
    );

    const attestationMap: { [key: string]: { teacher: string, results: { [key: string]: string } } } = {};

    filteredAttestations.forEach(attestation => {
        if (!attestationMap[attestation.disciplineTitle]) {
            attestationMap[attestation.disciplineTitle] = { teacher: attestation.teacher, results: {} };
        }
        attestationMap[attestation.disciplineTitle].results[attestation.date] = attestation.result;
    });

    return (
        <>
            <Header title={t("attestation_results")} isShowSlider={true} selectedSemester={settings.selectedSemester} setSelectedSemester={handleSemesterChange} />

            <table>
                <thead>
                    <tr>
                        <th>{t("discipline")}</th>
                        <th>{t("teacher")}</th>
                        <th>{`${t("attestation")} №1 ${settings.selectedSemester % 2 === 0 ? t("march") : t("october")}`}</th>
                        <th>{`${t("attestation")} №2 ${settings.selectedSemester % 2 === 0 ? t("may") : t("december")}`}</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(attestationMap).map((disciplineTitle, index) => (
                        <tr key={index}>
                            <td>{settings.isShowFullDisciplineName ? disciplineTitle : formatDisciplineFullName(disciplineTitle)}</td>
                            <td>{attestationMap[disciplineTitle].teacher}</td>
                            <td>{attestationMap[disciplineTitle].results[`${settings.selectedSemester} ${t("semester")}, ${t("attestation")} №1`] || '-'}</td>
                            <td>{attestationMap[disciplineTitle].results[`${settings.selectedSemester} ${t("semester")}, ${t("attestation")} №2`] || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}