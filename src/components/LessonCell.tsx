import React from "react";
import { ILessonCellProps } from "../interfaces/ILessonCellProps";
import { ILesson } from "../interfaces/ISchedule";
import { formatDisciplineFullName } from "../services/TextFormatters";

const LessonCell: React.FC<ILessonCellProps> = ({day, timeSlot, isFullDisciplineNameShown}) => {
    const lesson = day.lessons.find((lesson: ILesson) => lesson.startTime === timeSlot);

    if (lesson) {
        return (
            <div>
                {isFullDisciplineNameShown ? ( <span>{lesson.fullName}</span>) : (<span>{formatDisciplineFullName(lesson.fullName)}</span>)}
                <p>{lesson.teacherFullName}</p>
                <span>{lesson.titleLocation}</span>
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default LessonCell;
