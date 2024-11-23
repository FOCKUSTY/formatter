import { format } from "date-fns";

import { Date as DateType, Time as TimeType } from "../types/date.types";

import Time from "./time";

type Format = "miliseconds" | "seconds";

/**
 * @class DateFormatter
 * @constructor
 *
 * @param date - current date
 * @param time - current date with type: Time
 *
 * ```ts
 * import { DateFormatter } from "f-formatter";
 * const formatter = new DateFormatter();
 * ```
 */

class DateFormatter extends Time {
	constructor(date?: Date, time?: TimeType | DateType) {
		super(date, time);
	}

	private readonly ToDMY = (date: TimeType | Date): TimeType => {
		if (date instanceof Date)
			return {
				day: date.getDay(),
				month: date.getMonth(),
				year: date.getFullYear()
			};

		return date;
	};

	/**
	 * @requires date - string, number or Date
	 *
	 * @param date - current date
	 * @param form - returns format
	 *
	 * @tutorial
	 * dd.MM.yyyy HH:mm:ss;
	 * dd - day;
	 * MM - month;
	 * yyyy - year;
	 * HH - hours;
	 * mm - minutes;
	 * ss - seconds;
	 *
	 * @returns formatted date (string)
	 *
     * ```ts
     * new Formatter().date.Date(1731351600000, "dd.MM.yyyy");
     * // return 12.11.2024
     * ```
	 */

	public readonly Date = (
		date: string | number | Date,
		form: string = "dd.MM.yyyy HH:mm:ss"
	): string => {
		if (!date) return "Error";

		let dateForm: any = new Date(date);
		dateForm = format(dateForm, `${form}`);

		return dateForm;
	};

	/**
	 * @requires date with values: day, month and year or Date
	 *
	 * @param date - current date
	 *
	 * @returns object with keys: day, month, year with type number from 1 January 1970 year (Time)
	 *
     * ```ts
     * new Formatter().date.toLocaleDMY({day: 1, month: 1, year: 2024});
     * // return { day: 1, month: 0, year: 54 }
     * ```
	 */

	public readonly toLocaleDMY = (date: TimeType | Date) => {
		date = this.ToDMY(date);

		const output: TimeType = { ...date };

		output.month = new Time().getMonthDaysFromJanuary(date.month);
		output.year = date.year - 1970;

		return output;
	};

	/**
	 * @requires object with values: day, month and year
	 *
	 * @param date - current date
	 * @param format - returns format, seconds or miliseconds
	 *
	 * @returns time value from 1 January 1970 year in miliseconds or seconds (number)
	 *
     * ```ts
     * new Formatter().date.Timestamp({day: 1, month: 1, year: 2024}, "seconds");
     * // return 1704135600
     * ```
	 */

	public readonly Timestamp = (
		date: TimeType | Date,
		format: Format = "miliseconds"
	): number => {
		date = this.ToDMY(date);

		const leapYear = 6;
		const toDays = 365;
		const toHours = 24;
		const toMinutes = 60;
		const toSeconds = 60;
		const toMiliseconds = 1000;
		const mili = toMinutes * toSeconds * toMiliseconds;
		const miliFromH = toHours * mili;
		const UTCHours = 17;

		const factor = format === "miliseconds" ? 1 : 1000;

		const getOutput = (DMY: TimeType) => {
			const summ =
				(DMY.hour || 0) * mili +
				((DMY.minutes || 0) * mili) / toMinutes +
				(DMY.seconds || 0) * toMiliseconds +
				(DMY.milliseconds || 0);

			return (
				DMY.year * toDays * miliFromH +
				DMY.year * leapYear * mili +
				DMY.month * miliFromH +
				DMY.day * miliFromH +
				summ -
				UTCHours * mili
			);
		};

		const DMY = this.toLocaleDMY(date);

		return getOutput(DMY) / factor;
	};

    /**
     * @returns Date
     * 
     * ```ts
     * new DateFormatter().date;
     * // return Date.now()
     * ```
     */

	get date(): Date {
		return this._date;
	}
}

export default DateFormatter;
