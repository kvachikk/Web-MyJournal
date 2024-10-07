import {IDay} from "./ISchedule.ts";

export interface ILessonCellProps {
    day: IDay;
    timeSlot: string;
    isFullDisciplineNameShown: boolean;
}