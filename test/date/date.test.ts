import DateFormatter from "date/date";

import type { TestsType } from "types/test.types";
import type { Time as TimeType } from "types/date.types";

import Test from "test/test.class";

const formatter = new DateFormatter();

describe("DateFormatter", () => {
	const numbers: TimeType = formatter.time;

	(() => {
		const tests: TestsType = [
			[
				Math.floor(formatter.Timestamp(numbers) / 1000),
				Math.floor(formatter.date.getTime() / 1000)
			]
		];

		new Test("Timestamp(...)", tests).execute();
	})();

	(() => {
		const timeDMY = formatter.toLocaleDMY(formatter.time);
		const timeNum = formatter.toLocaleDMY(numbers);

		const tests: TestsType = [];

		for (const key of ["day", "month", "year"]) {
			tests.push([timeDMY[key], timeNum[key]]);
		}

		new Test("toLocaleDMY(...)", tests).execute();
	})();
});
