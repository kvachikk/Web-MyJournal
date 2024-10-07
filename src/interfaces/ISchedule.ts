export interface ISchedule {
	weeks: IWeek[];
}

export interface IWeek {
	name: string;
	days: IDay[];
}

export interface IDay {
	name: string;
	lessons: ILesson[];
}

export interface ILesson {
	numberOfLesson: string;
	startTime: string;
	fullName: string;
	teacherFullName: string;
	teacherId: string;
	titleLocation: string;
	googleMapsLocation: string;
}