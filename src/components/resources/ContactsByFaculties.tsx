import { useEffect, useState } from "react";
import faculties from "../../data/contacts";
import ContactCard from "../default/ContactCard";

export default function ContactsByFaculties() {
    const [sortedFaculties, setSortedFaculties] = useState(faculties);

    useEffect(() => {
        sortFaculties();

    }, []);

    async function sortFaculties() {
        const authorizedStudent = JSON.parse(localStorage.getItem("asi") || "");

        if (authorizedStudent) {
            const sorted = [...faculties].sort((a, b) => {
                if (a.fullName === authorizedStudent.faculty) return -1;
                if (b.fullName === authorizedStudent.faculty) return 1;
                return 0;
            });
            setSortedFaculties(sorted);
        }
    };

    return (
        <>
            {sortedFaculties.map(f => (
                <ContactCard key={f.shortName} shortName={f.shortName} fullName={f.fullName} tgChannelTag={f.tgChannelTag} tgBotTag={f.tgChannelTag} />
            ))}
        </>
    );
};