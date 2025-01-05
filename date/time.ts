import type { Date as DateType, Time as TimeType } from "../types/date.types";
import { monthDays } from "./month";

/**
 * @class Time
 *
 * @param date - current date
 * @param time - current date with type: Time
 *
 * ```ts
 * import { Time } from "f-formatter";
 * const time = new Time();
 * ```
 */

class Time {
	protected readonly _date: Date;
	protected readonly _time: TimeType;

	public constructor(date?: Date, time?: TimeType | DateType) {
		this._date = date || new Date();
		this._time = Array.isArray(time)
			? {
					day: time[0],
					month: time[1] + 1,
					year: time[2]
				}
			: time || {
					day: this._date.getDate(),
					month: this._date.getMonth() + 1,
					year: this._date.getFullYear(),

					hour: this._date.getHours(),
					minutes: this._date.getMinutes(),
					seconds: this._date.getSeconds(),
					miliseconds: this._date.getMilliseconds()
				};
	}

	/**
	 * Note: February has 28 days
	 *
	 * @param month - current month
	 *
	 * @returns days count in current month (28 <= number <= 31)
	 *
	 * ```ts
	 * new Formatter().date.getMonthDays(1);
	 * // return 31
	 * ```
	 */

	public readonly getMonthDays = (month?: number): number => {
		if (month && month > 12) return 0;

		if (!month && this._time.month > 12) return 0;

		const days = month ? monthDays[month] : monthDays[this._time.month];

		return days;
	};

	/**
	 * Note: February has 28 days
	 *
	 * @param month - current month
	 *
	 * @returns days count from 1 January (1 <= number <= 365)
	 *
	 * ```ts
	 * new Formatter().date.getMonthDaysFromJanuary(6);
	 * // return 151
	 * ```
	 */

	public readonly getMonthDaysFromJanuary = (month?: number): number => {
		if (month && month > 12) return 0;

		if (!month && this._time.month > 12) return 0;

		const M = month || this._time.month;

		let output: number = 0;

		for (let i = 1; i < M; i++) {
			output += this.getMonthDays(i);
		}

		return output;
	};

	/**
	 * @returns TimeType
	 *
	 * ```ts
	 * new Formatter().time
	 * // return now: day: number; month: number; year: number;
	 * ```
	 */

	get time() {
		return this._time;
	}
}

export default Time;
