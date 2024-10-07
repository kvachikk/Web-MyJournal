import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import NavItem from "./NavItem";
import { INavItemProps } from "../../interfaces/INavItemProps";
import logo from "../assets/icons/logo.svg";
import account from "../assets/icons/account.svg";
import setting from "../assets/icons/setting.svg";
import message from "../assets/icons/message.svg";
import resources from "../assets/icons/resources.svg";
import attestation from "../assets/icons/attestation.svg";
import schedule from "../assets/icons/schedule.svg";
import chart from "../assets/icons/chart.svg";
import alert from "../assets/icons/alert.svg";
import { getSetting, setSetting } from "../../services/SettingsServices";
import "../style.css";

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const [selectedEndpoint, setSelectedEndpoint] = useState<string>();
    const [language, setLanguage] = useState(getSetting('selectedLanguage'));

    useEffect(() => {
        setSelectedEndpoint(getSetting('selectedEndpoint'));
    }, []);

    useEffect(() => {
        const handleLanguageChange = () => {
            setLanguage(getSetting('selectedLanguage'));
        };

        const observer = new MutationObserver(handleLanguageChange);
        const config = { attributes: true, childList: true, subtree: true };

        observer.observe(document.body, config);

        return () => observer.disconnect();
    }, [language]);

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language, i18n]);

    const handleItemClick = (endpoint: string) => {
        setSelectedEndpoint(endpoint);
        setSetting("selectedEndpoint", endpoint);
    };

    const items: INavItemProps[] = useMemo(() => [
        { title: t("profile"), endpoint: "/", icon: <img src={account} className="nav-icon" />, isSelected: selectedEndpoint === "/", onClick: () => handleItemClick("/") },
        { title: t("schedule"), endpoint: "/schedule", icon: <img src={schedule} className="nav-icon" />, isSelected: selectedEndpoint === "/schedule", onClick: () => handleItemClick("/schedule") },
        { title: t("scores"), endpoint: "/scores", icon: <img src={chart} className="nav-icon" />, isSelected: selectedEndpoint === "/scores", onClick: () => handleItemClick("/scores") },
        { title: t("attestation"), endpoint: "/attestations", icon: <img src={attestation} className="nav-icon" />, isSelected: selectedEndpoint === "/attestations", onClick: () => handleItemClick("/attestations") },
        { title: t("session"), endpoint: "/violence", icon: <img src={alert} className="nav-icon" />, isSelected: selectedEndpoint === "/violence", onClick: () => handleItemClick("/violence") },
        { title: t("messages"), endpoint: "/messages", icon: <img src={message} className="nav-icon" />, isSelected: selectedEndpoint === "/messages", onClick: () => handleItemClick("/messages") },
        { title: t("resources"), endpoint: "/resources", icon: <img src={resources} className="nav-icon" />, isSelected: selectedEndpoint === "/resources", onClick: () => handleItemClick("/resources") },
        { title: t("settings"), endpoint: "/settings", icon: <img src={setting} className="nav-icon" />, isSelected: selectedEndpoint === "/settings", onClick: () => handleItemClick("/settings") }
    ], [selectedEndpoint, t]);

    return (
        <nav>
            <div className="logo">
                <img src={logo} alt="logo" />
                <span>MyJournal</span>
            </div>
            <div className="nav-items">
                {items.map((item, i) => (
                    <NavItem key={i} {...item} />
                ))}
            </div>
        </nav>
    );
};