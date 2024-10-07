import * as cheerio from 'cheerio';
import { makeParsingRequest } from "../services/APIServices";
import { IScore } from '../interfaces/student/IScore';

export async function getAllScoresByDiscipline(disciplineId: number): Promise<IScore[]> {
    const scores: IScore[] = [];
    const html = (await (await makeParsingRequest(`https://campus.kpi.ua/student/index.php?mode=studysheet&action=view&id=${disciplineId}`)).text()).replace(/\\r|\\n|\\t/g, '');
    const $ = cheerio.load(html);

    const table = $('div');
    if (table.length === 0) return scores;

    table.find('tbody tr').each((_i, element) => {
        const date = $(element).find('td').eq(0).text().trim();
        const scoreValue = $(element).find('td').eq(1).text().trim();
        const typeOfControl = $(element).find('td').eq(2).text().trim();
        const teacher = $(element).find('td').eq(3).text().trim();
        const note = $(element).find('td').eq(4).text().trim();

        const score: IScore = { date, scoreValue, typeOfControl, teacher, note };
        if (parseInt(score.scoreValue) < 101) {
            scores.push(score);
        }
    });

    return scores;
}