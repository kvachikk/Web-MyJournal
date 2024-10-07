import { useEffect, useState } from "react";
import { IStudentInfo } from "../interfaces/student/IStudentInfo";
import { getAllStudentInfo } from "../handlers/AccountHandler";
import MyAcademCuratorCard from "./MyAcademCuratorCard";
import Header from "./default/Header";
import { setSetting } from "../services/SettingsServices";
import { useTranslation } from "react-i18next";

export default function Account() {
    const { t } = useTranslation();
    const [student, setStudent] = useState<IStudentInfo>();

    useEffect(() => {
        fetchStudentInfo();
    }, []);

    async function fetchStudentInfo() {
        const s = await getAllStudentInfo();
        setStudent(s);
        if (s.group) {
            setSetting("scheduleGroupName", s.group);
        }
    }

    return (
        <>
            <Header title={t("profile")} isShowSlider={false} />
            {student && (
                <>
                    <div className="account-info">
                        <div className="card" style={{ display: "flex" }}>
                            <img src={student.photo} />
                            <div>
                                <h2>{student.fullName}</h2>
                                <h3>{student.englishFullName}</h3>
                                <h5>{student.username}</h5>
                                <h3>{student.courseOfStudy} {t("small_course")}</h3>
                                <h3>{t("form_of_education")}: {student.formOfEducation}</h3>
                                <h3>{t("status")}: {student.status}</h3>
                            </div>
                        </div>
                        <div className="card" style={{ maxWidth: "37%" }}>
                            <h3>{t("university_name")}</h3>
                            <h3>{student.faculty}</h3>
                            <h3>{t("specialty")}: {student.specialty}</h3>
                            <h3>{t("group")}: {student.group}</h3>
                        </div>
                    </div>
                    <MyAcademCuratorCard group={student.group} />
                </>
            )}
        </>
    );
};