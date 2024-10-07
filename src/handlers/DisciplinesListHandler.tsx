import * as cheerio from 'cheerio';
import { makeParsingRequest } from "../services/APIServices";
import { IDiscipline } from '../interfaces/student/IDiscipline';

const ONE_HOUR = 60 * 60 * 1000; // one hour

export async function getAllDisciplines(): Promise<IDiscipline[]> {
    const local = localStorage.getItem("disciplinesData");
    
    if (local) {
        const { disciplines, timestamp } = JSON.parse(local);

        if (Date.now() - timestamp < ONE_HOUR) {
            return disciplines;
        }
    }

    const disciplines: IDiscipline[] = [];
    const response = await makeParsingRequest("https://campus.kpi.ua/student/index.php?mode=studysheet");
    const $ = cheerio.load((await response.text()).replace(/\\r|\\n|\\t/g, ''));

    const table = $('div');
    table.find('tbody tr').each((_i, element) => {
        const href = ($(element).find('td a').attr('href'));
        const discipline: IDiscipline = {
            id: (href ? href.split('id=')[1] : '').split("\\")[0],
            title: $(element).find('td a').text().trim(),
            teacher: $(element).find('td').eq(1).text().trim(),
            semester: parseInt(($(element).attr('data-sem') as string).replace(/\\|\"/g, '')),
            year: ($(element).attr('data-year') as string).replace(/\\|\"/g, ''),
        };

        disciplines.push(discipline);
    });

    const dataToStore = {
        disciplines,
        timestamp: Date.now()
    };

    localStorage.setItem("disciplinesData", JSON.stringify(dataToStore));

    return disciplines;
}