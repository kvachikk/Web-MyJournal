import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../default/Header"
import contact from "../assets/icons/contact.svg";
import FindAcademCuratorCard from "../FindAcademCuratorCard";
import { IResourceSectionProps } from "../../interfaces/IResourceSectionProps";

export default function ResourcesList() {
    const { t } = useTranslation();

    const sections: IResourceSectionProps[] = useMemo(() => [
        { title: "Контакти", endpoint: "/contacts", icon: <img src={contact} className="nav-icon" /> },
        { title: t("channels"), endpoint: "/channels", icon: <img src={contact} className="nav-icon" /> },
    ], [t]);

    return (
        <>
            <Header title={t("resources")} isShowSlider={false} />
            <div style={{ margin: "25px" }}>
                <FindAcademCuratorCard />

                <div className="container gap-15 mt-15">
                    <div className="resource-card">
                        <h3>MyJournal - Бот</h3>
                        <h4>Питання, пропозиції, помилки в роботі сайту, або будь-яка інша комунікація: </h4>
                        <p><a target="_blank" href="https:/t.me/MyJournal_Feedback_Bot">@MyJournal_Feedback_Bot</a></p>
                    </div>
                    <div className="resource-card">
                        <h3>MyJournal - Канал</h3>
                        <h4>Інформація щодо роботи сайту, оновлення та багато чого іншого...</h4>
                        <p><a target="_blank" href="https:/t.me/MyJournal_News">@MyJournal_News</a></p>
                    </div>

                    {sections.map(s => (
                        <div className="resource-card">
                            {s.icon}
                            <Link to={s.endpoint} className="card">{s.title}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};