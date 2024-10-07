import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ".././style.css";

interface IHeaderProps {
    title: string;
    isShowSlider: boolean;
    selectedSemester?: number;
    setSelectedSemester?: (semester: number) => void;
}

export default function Header({ title, isShowSlider, selectedSemester, setSelectedSemester }: IHeaderProps) {
    const { t } = useTranslation();
    const [studyCourseTitle, setStudyCourseTitle] = useState<string>("");

    useEffect(() => {
        if (selectedSemester !== undefined) {
            calcStudyCourse(selectedSemester);
            updateSliderBackground();
        }
    }, [selectedSemester]);

    const calcStudyCourse = (es: number) => {
        setStudyCourseTitle(`${Math.ceil(es / 2)} ${t("small_course")}, ${(es % 2 === 0) ? 2 : 1} ${t("half_year")}`);
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (setSelectedSemester) {
            setSelectedSemester(value);
        }
        updateSliderBackground();
    };

    const updateSliderBackground = () => {
        if (selectedSemester !== undefined) {
            const slider = document.querySelector(".slider") as HTMLInputElement;
            if (slider) {
                const value = ((selectedSemester - parseInt(slider.min)) / (parseInt(slider.max) - parseInt(slider.min))) * 100;
                slider.style.setProperty("--value", `${value}%`);
            }
        }
    };

    return (
        <div className="header">
            <div>
                <span>{title}</span>
            </div>

            {isShowSlider && selectedSemester !== undefined && setSelectedSemester && (
                <div>
                    {studyCourseTitle}
                    <input type="range" step="1" min="1" max="8" value={selectedSemester} onChange={handleSliderChange} className="slider" />
                </div>
            )}
        </div>
    );
}