export type Date = [number, number, number];

export type Time = {
	[key: string]: number | undefined;
	miliseconds?: number;
	seconds?: number;
	minutes?: number;
	hour?: number;
	day: number;
	month: number;
	year: number;
};
