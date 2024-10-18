import { format, milliseconds } from 'date-fns';

import type { Date as DateType, Time as TimeType } from '../types/date.types';

import Time from './time';

class DateFormatter extends Time {
    constructor(date?: Date, time?: TimeType|DateType) {
        super(date, time);
    };
    
    public readonly Date = (date: string | number | Date, form='dd.MM.yyyy HH:mm:ss'): string => {
        if(!date)
            return 'Error';

        let dateForm: any = new Date(date);
        dateForm = format(dateForm, `${form}`);
        
        return dateForm;
    };

    public readonly toLocaleDMY = (date: TimeType) => {
        const getDMY = (_date: TimeType): TimeType => {
            const day = _date.day;
            const month = new Time().getMonthDaysFromJanuary(_date.month);
            const year = _date.year - 1970;
            
            return { day, month, year };
        };

        const DMY = getDMY({day: date.day, month: date.month, year: date.year});
    
        return DMY;
    };

    public readonly Timestamp = (date: TimeType) => {
        const toSeconds = 3600;

        const getOutput = (DMY: TimeType) => {
            const { day, month, year } = DMY;

            const summ = (DMY.hour || 0) * toSeconds
                + (DMY.minutes || 0) * toSeconds
                + (DMY.seconds || 0)
                + (DMY.milliseconds || 0);

            return year * 365 * 24 * toSeconds
                + year * 6 * toSeconds
                + month * 24 * toSeconds
                + day * 24 * toSeconds
                + summ;
        };

        const DMY = this.toLocaleDMY(date);

        return getOutput(DMY);
    };

    get date(): Date {
        return this._date;
    };
};

export default DateFormatter;