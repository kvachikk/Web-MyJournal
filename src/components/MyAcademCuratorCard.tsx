import * as React from "react";
import { useEffect, useState } from "react";
import { IMyAcademCuratorCard } from "../interfaces/IMyAcademCuratorCard";
import { IAcademCuratorResponse } from "../interfaces/student/IAcademCurator";
import { useTranslation } from "react-i18next";

const MyAcademCuratorCard: React.FC<IMyAcademCuratorCard> = ({ group }) => {
    const { t } = useTranslation();
    const [curatorResponse, setAcademCuratorResponse] = useState<IAcademCuratorResponse>();

    useEffect(() => {
        const getMyAcademCurator = async () => {
            const local = localStorage.getItem("curator");
            if (local) {
                setAcademCuratorResponse(JSON.parse(local));
            } else if (group) {
                const curatorData = (await (await fetch(`https://api.campus.kpi.ua/group/find?name=${group}`)).json())[0];
                setAcademCuratorResponse(curatorData);
                localStorage.setItem("curator", JSON.stringify(curatorData));
            }
        };

        getMyAcademCurator();
    }, [group]);

    return (
        curatorResponse && (
            <div className="card" style={{ margin: "25px", display: "flex", marginTop: "0px" }}>
                <div className="container">
                    <div style={{ width: "170px", height: "170px", borderRadius: "50%", padding: "15px", margin:"10px", background: `url(${curatorResponse.curator.photo}) no-repeat center center`, backgroundSize: "cover" }} />
                </div>
                <div>
                    <h2>{curatorResponse.curator.fullName}</h2>
                    <h3>{curatorResponse.cathedra?.name}</h3>
                    <h4>{t("academic_curator")} {curatorResponse.name}</h4>
                    <a href={curatorResponse.curator.profile} target="_blank" rel="noopener noreferrer">{t("profile")} - Intellect</a>
                </div>
            </div>
        )
    );
};

export default MyAcademCuratorCard;
