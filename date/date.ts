import { format } from 'date-fns';

import type { Time as TimeType } from '../types/date.types';
import type { Date as DateType } from '../types/date.types';

import Time from './time';

class DateFormatter extends Time {
    constructor(date?: Date, time?: TimeType) {
        super(date, time);
    };
    
    // Кодовое название: "Тут нет Дмитрия"
    public readonly Date = (date: string | number | Date, form='dd.MM.yyyy HH:mm:ss'): string => {
        if(!date)
            return 'Error';

        let dateForm: any = new Date(date);
        dateForm = format(dateForm, `${form}`);
        
        return dateForm;
    };

    // Кодовое название: "Взять Дмитрия"
    public readonly toLocaleDMY = (date: TimeType) => {
        const getDMY = (_date: DateType): DateType => {
            const day = _date[0];
            const month = new Time().getMonthDaysFromJanuary(_date[1]);
            const year = _date[2] - 1970;
            
            // Дмитрия разделили на части...
            return [ day, month, year ];
        };

        const DMY = Array.isArray(date)
            ? getDMY(date)
            : getDMY([date.day, date.month, date.year]);
            
        return DMY;
    };

    // Кодовое название: "Перевести Дмитрия"
    public readonly Timestamp = (date: TimeType) => {
        const toSeconds = 3600;

        const getOutput = (DMY: DateType) => {
            // Кодовое название: "Дмитрий"
            const [D, M, Y] = DMY;

            return Y*365 * 24 * toSeconds
                + Y * 6 * toSeconds
                + M * 24 * toSeconds
                + D * 24 * toSeconds;
        };

        const DMY = this.toLocaleDMY(date);

        return getOutput(DMY);
    };

    get date(): Date {
        return this._date;
    };
};

export default DateFormatter;