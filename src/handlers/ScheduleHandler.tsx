import cheerio from 'cheerio';
import { ILesson, ISchedule, IWeek } from '../interfaces/ISchedule';
import { APP_ENV } from '../env';

export async function getScheduleForGroup(groupName: string): Promise<ISchedule | null> {
    const local = localStorage.getItem(groupName);
    if (local) {
        return JSON.parse(local) as ISchedule;
    }
    
    const $ = cheerio.load(await (await fetch(`${APP_ENV.BASE_URL}/schedule/group/${groupName}`)).text());

    const weeks: IWeek[] = [];
    const weekNames = ['Перший тиждень', 'Другий тиждень'];

    const timeSlots = ["08:30", "10:25", "12:20", "14:15", "16:10", "18:30"];

    weekNames.forEach(weekName => {
        const week: IWeek = {
            name: weekName,
            days: []
        };

        // Вибір таблиці за тижнем
        const tableId = weekName === 'Перший тиждень' ? '#ctl00_MainContent_FirstScheduleTable' : '#ctl00_MainContent_SecondScheduleTable';
        const rows = $(`${tableId} tr`);

        const dayNames: string[] = [];
        rows.first().find('td').each((index, element) => {
            if (index > 0) {
                dayNames.push($(element).text().trim());
            }
        });

        dayNames.forEach(dayName => {
            week.days.push({ name: dayName, lessons: [] });
        });

        rows.slice(1).each((rowIndex, rowElement) => {
            $(rowElement).find('td').each((colIndex, colElement) => {
                if (colIndex > 0) { // Пропускаємо перший стовпець
                    const lessonsHtml = $(colElement).html();
                    if (lessonsHtml) {
                        const lessonsText = lessonsHtml.split('<br>');
                        if (lessonsText.length > 0) {
                            const lessonIndex = rowIndex;
                            const lesson: ILesson = {
                                numberOfLesson: (lessonIndex + 1).toString(),
                                startTime: timeSlots[lessonIndex] || '',
                                fullName: $(lessonsText[0]).text().trim(),
                                teacherFullName: $(lessonsText[1]).text().trim(),
                                teacherId: $(lessonsText[1]).attr('href') || '',
                                titleLocation: $(lessonsText[2]).text().trim(),
                                googleMapsLocation: $(lessonsText[2]).attr('href') || ''
                            };

                            week.days[colIndex - 1].lessons.push(lesson);
                        }
                    }
                }
            });
        });

        weeks.push(week);
    });

    const schedule: ISchedule = {
        weeks: weeks
    };

    localStorage.setItem(groupName, JSON.stringify(schedule));
    return schedule;
}