import * as cheerio from 'cheerio';
import { makeParsingRequest } from "../services/APIServices";
import { IExam } from '../interfaces/student/IExam';

export async function getAllExams(): Promise<IExam[]> {
    const exams: IExam[] = [];
    const $ = cheerio.load((await (await makeParsingRequest("https://campus.kpi.ua/student/index.php?mode=vedomoststud&page=page_1")).text()).replace(/\\r|\\n|\\t/g, ''));

    $('div tr').each((_i, element) => {
        const columns = $(element).find('td');
        if (columns.length > 0) {
            const e: IExam = {
                dateTime: $(columns[1]).text().trim(),
                disciplineTitle: $(columns[2]).text().trim(),
                typeOfExam: $(columns[3]).text().trim(),
                typeOfSession: $(columns[4]).text().trim(),
                examinerFullName: $(columns[5]).text().trim(),
                score: $(columns[6]).text().trim(),
                status: $(columns[7]).text().trim(),
                semester: 0
            };
            if (e.disciplineTitle !== "") exams.push(e);
        }
    });

    return exams;
}