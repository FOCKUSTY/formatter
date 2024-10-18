import DateFormatter from "date/date";

import type { TestsType } from "types/test.types";
import type { Time as TimeType } from 'types/date.types';

const formatter = new DateFormatter();

describe('DateFormatter', () => {
    const numbers: TimeType = formatter.time;
    
    console.log(formatter.Timestamp(numbers));
    console.log(formatter.date.getTime());

    (() => {
        const tests: TestsType = [
            [Math.floor(formatter.Timestamp(numbers)/100_000), Math.floor(formatter.date.getTime()/100_000_000)]
        ];

        // new Test('Timestamp(...)', tests).execute();
    })();

    (() => {
        const timeDMY = formatter.toLocaleDMY(formatter.time);
        const timeNum = formatter.toLocaleDMY(numbers);

        const tests: TestsType = [];

        for (const key of ['day', 'month', 'year']) {
            tests.push([timeDMY[key], timeNum[key]]);
        };

        // new Test('toLocaleDMY(...)', tests).execute();
    })();
});