import * as React from "react";
import { useState } from "react";
import { IAcademCuratorResponse } from "../interfaces/student/IAcademCurator";
import { useTranslation } from "react-i18next";

const FindAcademCuratorCard = () => {
    const { t } = useTranslation();

    const [response, setFoundAcademCuratorsResponse] = useState<IAcademCuratorResponse[] | null>(null);

    const fetchAcademCuratorByGroup = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (event.target.value.length > 3 && event.target.value.length < 10) {
                const response = await (await fetch(`https://api.campus.kpi.ua/group/find?name=${event.target.value}`)).json();
                setFoundAcademCuratorsResponse(response);
            } else if (event.target.value === "") {
                setFoundAcademCuratorsResponse(null);
            }
        } catch (error) {
            console.error("Error fetching academ curator:", error);
        }
    };

    return (
        <div className="card px-35">
            <div className="container">
                <h2>Академічний куратор групи: </h2>
                <input className="groupname-input" type="text" placeholder={t("group_placeholder")} onChange={fetchAcademCuratorByGroup} style={{ width: "220px", marginTop:"15px" }} />
            </div>

            {response?.map((r, index) => (
                <>
                    <div style={{ display: "flex" }}>
                        <h3 key={index}>{r.name + "\xa0\xa0\xa0"}</h3>
                        <a target="_blank" style={{ color: "rgb(50,56,63)" }} href={r.curator.profile} rel="noreferrer">
                            <p key={index}>{r.curator.fullName}</p>
                        </a>
                    </div>
                </>
            ))}
        </div>
    );
};

export default FindAcademCuratorCard;