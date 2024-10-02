export type Date = [
    number,
    number,
    number
];

export type Time = {
    seconds?: number,
    minutes?: number,
    hour?: number,
    day: number,
    month: number,
    year: number
} | Date;