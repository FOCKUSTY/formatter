import { format, milliseconds } from "date-fns";

import type { Date as DateType, Time as TimeType } from "../types/date.types";

import Time from "./time";

class DateFormatter extends Time {
	constructor(date?: Date, time?: TimeType | DateType) {
		super(date, time);
	}

	public readonly Date = (
		date: string | number | Date,
		form = "dd.MM.yyyy HH:mm:ss"
	): string => {
		if (!date) return "Error";

		let dateForm: any = new Date(date);
		dateForm = format(dateForm, `${form}`);

		return dateForm;
	};

	public readonly toLocaleDMY = (date: TimeType) => {
		const output: TimeType = { ...date };

		output.month = new Time().getMonthDaysFromJanuary(date.month);
		output.year = date.year - 1970;

		return output;
	};

	public readonly Timestamp = (date: TimeType) => {
		const leapYear = 6;
		const toDays = 365;
		const toHours = 24;
		const toMinutes = 60;
		const toSeconds = 60;
		const toMiliseconds = 1000;
		const mili = toMinutes * toSeconds * toMiliseconds;
		const miliFromH = toHours * mili;
		const UTCHours = 17;

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

		return getOutput(DMY);
	};

	get date(): Date {
		return this._date;
	}
}

export default DateFormatter;
