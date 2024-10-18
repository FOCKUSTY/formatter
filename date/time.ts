import type { Date as DateType, Time as TimeType } from '../types/date.types';
import { monthDays } from './month';

class Time {
    protected readonly _date: Date;
    protected readonly _time: TimeType;

    constructor(date?: Date, time?: TimeType|DateType) {
        this._date = date || new Date();
        this._time = Array.isArray(time)
            ? {
                day: time[0],
                month: time[1]+1,
                year: time[2]
            }
            : time || {
                day: this._date.getDate(),
                month: this._date.getMonth()+1,
                year: this._date.getFullYear(),
                
                hour: this._date.getHours(),
                minutes: this._date.getMinutes(),
                seconds: this._date.getSeconds(),
                miliseconds: this._date.getMilliseconds()
            };
    };

    public readonly getMonthDays = (month?: number): number => {
        if(month && month > 12)
            return 0;

        if(!month && this._time.month > 12)
            return 0;

        const days = month
            ? monthDays[month]
            : monthDays[this._time.month];
    
        return days;
    };

    public readonly getMonthDaysFromJanuary = (month?: number): number => {
        if(month && month > 12)
            return 0;

        if(!month && this._time.month > 12)
            return 0;

        const M = month || this._time.month;

        let output: number = 0;

        for(let i = 1; i < M; i++) {
            output += this.getMonthDays(i);
        };

        return output;
    };

    get time() {
        return this._time;
    };
};

export default Time;