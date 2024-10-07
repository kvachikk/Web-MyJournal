import Header from "./default/Header";
import { useTranslation } from "react-i18next";

export default function Messages() {
    const { t } = useTranslation();

    return (
        <>
            <Header title={t("my_messages")} isShowSlider={false} />
            <h2>resources</h2>
        </>
    );
};
