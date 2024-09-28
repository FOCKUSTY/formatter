import { format } from 'date-fns';

import type { Time as TimeType } from '../types/date.types';
import Time from './time';

class DateFormatter extends Time {
    constructor(date?: Date, time?: TimeType) {
        super(date, time);
    };
    
    public Date = (date: string | number | Date, form='dd.MM.yyyy HH:mm:ss'): string => {
        if(!date)
            return 'Error';

        let dateForm: any = new Date(date);
        dateForm = format(dateForm, `${form}`);
        
        return dateForm;
    };

    public Timestamp = (date: [ number, number, number ] | { day: number, month: number, year: number }) => {
        const toSeconds = 3600;

        const getDMY = (_date: [number, number, number]): [ number, number, number ] => {
            return [
                _date[0],
                new Time().getMonthDaysFromJanuary(_date[1]),
                _date[2] - 1970
            ];
        };

        const getOutput = (DMY: [number, number, number]) => {
            const [D, M, Y] = DMY;

            return Y*365 * 24 * toSeconds
                + Y * 6 * toSeconds
                + M * 24 * toSeconds
                + D * 24 * toSeconds;
        };

        const DMY = Array.isArray(date)
            ? getDMY(date)
            : getDMY([date.day, date.month, date.year]);

        return getOutput(DMY);
    };

    get date(): Date {
        return this._date;
    };
};

export default DateFormatter;