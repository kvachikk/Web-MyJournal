const months = ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"];

export function formatScoreSumTitle(sum: number) {
    if (sum % 10 === 1 && sum % 100 !== 11) return sum + " бал";
    else if ((sum % 10 === 2 || sum % 10 === 3 || sum % 10 === 4) && !(sum % 100 >= 12 && sum % 100 <= 14)) return sum + " бали";
    else return sum + " балів";
}

export function formatDisciplineFullName(text: string) {
    const dotIndex = text.indexOf(".");
    const commaIndex = text.indexOf(",");

    if (dotIndex === -1 && commaIndex === -1) {
        return text;
    }

    return text.substring(0, Math.min(dotIndex !== -1 ? dotIndex : text.length, commaIndex !== -1 ? commaIndex : text.length));
}

export function formatScoringDate(dateOfScoring: string) {
    const scoringDate = new Date(dateOfScoring.split("-").reverse().join("-"));
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const dayBeforeYesterday = new Date(today);
    dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);

    const formatDate = (date: Date) => date.toISOString().split("T")[0];
    const fScoringDate = formatDate(scoringDate);

    if (fScoringDate === formatDate(today)) return "Сьогодні";
    else if (fScoringDate === formatDate(yesterday)) return "Вчора";
    else if (fScoringDate === formatDate(dayBeforeYesterday)) return "Позавчора";
    else return `${scoringDate.getDate()} ${months[scoringDate.getMonth()]} ${scoringDate.getFullYear()}`;
}

export function formatExamDate(dateTime: string) {
    if (dateTime === "") return "Не визначена деканатом";

    const date = new Date(dateTime);
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}

export function formatExamScore(studentScore: string) {
    const numberScore = parseInt(studentScore);
    let scoreWithLetter = "";

    if (numberScore >= 95) scoreWithLetter = `${studentScore}\xa0\xa0A`;
    else if (numberScore >= 85) scoreWithLetter = `${studentScore}\xa0\xa0B`;
    else if (numberScore >= 75) scoreWithLetter = `${studentScore}\xa0\xa0C`;
    else if (numberScore >= 65) scoreWithLetter = `${studentScore}\xa0\xa0D`;
    else if (numberScore >= 60) scoreWithLetter = `${studentScore}\xa0\xa0E`;
    else return studentScore;

    return <span>{scoreWithLetter}</span>;
}