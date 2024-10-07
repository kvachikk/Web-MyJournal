import { jwtDecode } from "jwt-decode";
import { IStudentInfo } from "../interfaces/student/IStudentInfo";
import { makeParsingRequest } from "../services/APIServices";
import * as cheerio from 'cheerio';

export async function getAllStudentInfo(): Promise<IStudentInfo> {
    const authStudentInfo = localStorage.getItem("asi");

    if (authStudentInfo) return JSON.parse(authStudentInfo);
    else {
        const asc = JSON.parse(localStorage.getItem("asc") || "{}");
        const decodedInfo = jwtDecode<any>(asc.token);

        const $ = cheerio.load(await (await makeParsingRequest("https://campus.kpi.ua/student/index.php?mode=profile")).text());

        const studentInfo: IStudentInfo = {
            id: decodedInfo.id,
            username: decodedInfo.sub ?? "unknown",
            photo: `https://api.campus.kpi.ua/Account/${decodedInfo.id}/photo`,
            fullName: $('th:contains("ПІБ")').next().text().split("\\")[0],
            abbreviatedFullName:$('th:contains("ПІБ")').next().text().split("\\")[0],
            englishFullName: $('th:contains("ПІБ(англійською)")').next().find('span').text(),
            faculty: $('th:contains("Підрозділ")').next().text(),
            group: $('th:contains("Група")').next().text(),
            formOfEducation: $('th:contains("Форма навчання")').next().text(),
            courseOfStudy: $('th:contains("Курс навчання")').next().text(),
            specialty: $('th:contains("Спеціальність")').next().text(),
            status: $('th:contains("Статус")').next().text(),
            
        };

        if (studentInfo.formOfEducation.includes("контракт")) studentInfo.formOfEducation = "Контракт";
        else if (studentInfo.formOfEducation === "" || studentInfo.formOfEducation === " ") studentInfo.formOfEducation = "Бюджет";
        else studentInfo.formOfEducation = "Інформація відсутня";

        if (studentInfo.faculty === "Факультет інформатики та обчислюваної техніки") {
            studentInfo.faculty = "Факультет інформатики та обчислювальної техніки";
        }

        const fullName = studentInfo.abbreviatedFullName.split(" ");
        studentInfo.abbreviatedFullName = `${fullName[0]} ${fullName[1].charAt(0) + "."} ${fullName[2].charAt(0) + "."}`;

        localStorage.setItem("asi", JSON.stringify(studentInfo));

        return studentInfo;
    };
};