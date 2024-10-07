import { useState } from "react";
import * as React from "react";
import { IScheduleTableProps } from "../interfaces/IScheduleTableProps.ts";
import { IDay, ILesson } from "../interfaces/ISchedule.ts";
import LessonCell from "./LessonCell.tsx";

const ScheduleTable: React.FC<IScheduleTableProps> = ({ week }) => {
    const [isFullDisciplineNameShown] = useState<boolean>(JSON.parse(localStorage.getItem("isFullDisciplineNameShown") || "false"));
    const timeSlots = ["08:30", "10:25", "12:20", "14:15", "16:10", "18:30"];

    const generateTimeSlots = () => {
        return timeSlots;
    };

    return (
        <>
            <table className="schedule-table">
                <thead>
                    <tr>
                        <th style={{ width: "50px" }}></th>
                        {week.days.map((day: IDay, dayIndex: number) => (
                            <th key={dayIndex} style={{ textAlign: "center", verticalAlign: "middle" }}>{day.name}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {generateTimeSlots().map((timeSlot: string, timeIndex: number) => (
                        <tr key={timeIndex}>
                            <td align="center">{timeSlot}</td>
                            {week.days.map((day: IDay, dayIndex: number) => (
                                <td key={dayIndex}>
                                    {day.lessons.find((lesson: ILesson) => lesson.startTime === timeSlot) ? (
                                        <LessonCell day={day} timeSlot={timeSlot} isFullDisciplineNameShown={isFullDisciplineNameShown} />
                                    ) : ("")}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ScheduleTable;