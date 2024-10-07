import * as React from "react";
import { IContactCardProps } from "../../interfaces/IContactCardProps";

const ContactCard: React.FC<IContactCardProps> = ({ shortName, fullName, tgChannelTag, tgBotTag }) => {
    return (
        <div className="container card">
            <h4>{shortName}</h4>
            <h5>{fullName}</h5>

            <div className="container">
                <a style={{ color: "rgb(50,56,63)" }} href={`https://t.me/${tgChannelTag}`}>Канал</a>
                <a style={{ color: "rgb(50,56,63)" }} href={`https://t.me/${tgBotTag}`}>Бот</a>
            </div>
        </div>
    );
};

export default ContactCard;