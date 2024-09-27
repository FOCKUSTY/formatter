import type { Time as TimeType } from '../types/date.types';
import { monthDays } from './month';

class Time {
    protected readonly _date: Date;
    protected readonly _time: TimeType;

    constructor(date?: Date, time?: TimeType) {
        this._date = date || new Date();
        this._time = time || {
            day: this._date.getDate(),
            month: this._date.getMonth()+1,
            year: this._date.getFullYear(),
            
            hour: this._date.getHours(),
            minutes: this._date.getMinutes(),
            seconds: this._date.getSeconds()
        };
    };

    public readonly getMonthDays = (month?: number): number => {
        const isArray = Array.isArray(this._time);

        if(month && month > 12)
            return 0;

        if(!month && (!isArray && this._time.month > 12))
            return 0;

        const days = month
            ? monthDays[month]
            : monthDays[isArray
                ? this._time[1]
                : this._time.month
            ];
    
        return days;
    };

    public readonly getMonthDaysFromJanuary = (month?: number): number => {
        const isArray = Array.isArray(this._time);

        if(month && month > 12)
            return 0;

        if(!month && (!isArray && this._time.month > 12))
            return 0;

        const M = month
            ? month
            : isArray
                ? this._time[1]
                : this._time.month;

        let output: number = 0;

        for(let i = 1; i < M; i++) {
            output += this.getMonthDays(i);
        };

        return output;
    };
};

export default Time;