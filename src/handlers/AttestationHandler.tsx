import * as cheerio from 'cheerio';
import { makeParsingRequest } from "../services/APIServices";
import { IAttestation } from '../interfaces/student/IAttestation';

export async function getAllAttestationResults(): Promise<IAttestation[]> {
    const attestations: IAttestation[] = [];
    const $ = cheerio.load((await (await makeParsingRequest(`https://campus.kpi.ua/tutor/index.php?mode=attestationresults`)).text()).replace(/\\r|\\n|\\t/g, ''));

    const table = $('div');
    table.find('tr').each((_i, element) => {
        const disciplineTitle = $(element).find('td').eq(0).text().trim();
        const teacher = $(element).find('td').eq(1).text().trim();
        
        const results = [
            $(element).find('td').eq(2).text().trim(),
            $(element).find('td').eq(3).text().trim(),
            $(element).find('td').eq(4).text().trim(),
            $(element).find('td').eq(5).text().trim(),
        ];

        results.forEach((result, index) => {
            if (result) {
                const attestation: IAttestation = {
                    disciplineTitle,
                    teacher,
                    result,
                    date: `${Math.floor(index / 2) + 1} семестр, Атестація №${(index % 2) + 1}`
                };
                attestations.push(attestation);
            }
        });
    });

    return attestations;
}