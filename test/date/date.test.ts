import DateFormatter from "date/date";
import Test from "test/test.class";

import type { TestsType } from "types/test.types";

const formatter = new DateFormatter();

describe('DateFormatter', () => {
    (() => {
        const formatted = formatter.Date(formatter.date, 'dd.MM.yyyy').split('.');
        const numbers: [number, number, number] = [
            Number(formatted[0]),
            Number(formatted[1]),
            Number(formatted[2])
        ];

        const timeDMY = formatter.toLocaleDMY(formatter.time);
        const timeNum = formatter.toLocaleDMY(numbers);

        const time: [string, string][] = [];

        for(let i=0; i<3; i++)
            time.push([`${timeDMY[i]}`, `${timeNum[i]}`]);

        const tests: TestsType = [
            [`${Math.floor(formatter.Timestamp(numbers)/100_000)}`, `${Math.floor(formatter.date.getTime()/100_000_000)}`],
            ...time
        ];

        new Test('Timestamp(...)', tests).execute();
    })();
});