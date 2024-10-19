import path from "node:path";
import fs from "node:fs";

import DateFormatter from "./date/date";
import { Colors } from "./colors";

import type { Time as TimeType } from "./types/date.types";

class Formatter {
	private readonly _date: DateFormatter;

	constructor(date?: Date, time?: TimeType) {
		this._date = new DateFormatter(date, time);
	}

	public RuWords = (
		num: number,
		stage: [string, string, string] | [string, string]
	) => {
		const txt: string = `${num}`,
			firstChar: number = Number(txt[txt.length - 1]),
			secondChar: number = Number(txt[txt.length - 2]);

		if (num === 1 || (firstChar === 1 && secondChar != 1)) return stage[0];
		else if (
			(firstChar === 1 && secondChar === 1) ||
			firstChar === 0 ||
			secondChar === 1
		)
			return stage[2] || stage[1];
		else if (firstChar < 5) return stage[1];
		else return stage[2] || stage[1];
	};

	public Color = (text: string, color: Colors) => color + text + Colors.reset;

	public Colored = (text: string, colors: Colors[], joiner: string = " ") => {
		const words = text.split(" ");

		let output: string[] = [];

		for (const index in words) {
			const word = words[index];

			output.push(new Formatter().Color(word, colors[index] || Colors.reset));
		}

		return output.join(joiner);
	};

	public Comma = (number: string | number) => {
		return `${number}`.replace(".", ",");
	};

	public FromJSON = (json: string): any => {
		let file;
		JSON.stringify(json, (_, value) => {
			eval(`file = ${value}`);
		});
		return file;
	};

	public FromJSONWithPath = (filePath: string): any => {
		let file: any;
		const json = fs.readFileSync(path.join(filePath), { encoding: "utf-8" });
		JSON.stringify(json, (_, value) => {
			eval(`file = ${value}`);
		});

		return file;
	};

	public get date(): DateFormatter {
		return this._date;
	}
}

export default Formatter;
