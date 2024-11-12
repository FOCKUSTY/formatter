import path from "node:path";
import fs from "node:fs";

import DateFormatter from "./date/date";
import { Colors } from "./colors";

import type { Time as TimeType } from "./types/date.types";

/**
 * @class Formatter
 * @constructor
 * @param date - current date
 * @param time - current date with type: Time
 *
 * @example
 * import Formatter from "f-formatter";
 * const formatter = new Formatter();
 */

class Formatter {
	private readonly _date: DateFormatter;

	/**
	 * @param date - current date
	 * @param time - current date with type: Time
	 */

	public constructor(date?: Date, time?: TimeType) {
		this._date = new DateFormatter(date, time);
	}

	/**
	 * @requires num
	 * @requires stage
	 *
	 * @param num - current number
	 * @param stage - current words in russian ["one", "few", "many"]
	 *
	 * @returns selected word of your words (string)
	 *
	 * @example
	 * new Formatter().RuWords(5, ["Пельмень", "Пельменя", "Пельменей"]);
	 * // return "Пельменей"
	 */

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

	/**
	 * @requires text
	 * @requires color
	 *
	 * @param text - your text (string)
	 * @param color - your color, what you need (Colors)
	 *
	 * @returns a colored text (string)
	 *
	 * @example
	 * new Formatter().Color("Привет!", Colors.magenta);
	 * // return \u001b[35mПривет!\u001B[0m
	 */

	public Color = (text: string, color: Colors) => color + text + Colors.reset;

	/**
	 * @requires text
	 * @requires colors
	 *
	 * @param text - your text (string)
	 * @param colors - your colors, what you need (Colors[])
	 * @param joiner - join string (string)
	 * @param splitter - split string (string)
	 *
	 * @returns colored text (string)
	 *
	 * @example
	 * new Formatter().Colored("Я говорю", [Colors.magenta, Colors.reset], " ");
	 * // return \u001b[35mЯ\u001B \u001Bговорю\u001B
	 */

	public Colored = (
		text: string,
		colors: Colors[],
		joiner: string = " ",
		splitter: string = " "
	) => {
		const words = text.split(splitter);

		let output: string[] = [];

		for (const index in words) {
			const word = words[index];

			output.push(new Formatter().Color(word, colors[index] || Colors.reset));
		}

		return output.join(joiner);
	};

	/**
	 * @requires number

	 * @param number - current fractional number
	 * 
	 * @returns string with a semicolon (string)
	 * 
	 * @example
	 * input: 1 => output: "1"
	 * input: 0.3 => output: "0,3"
	 * input: "32" => output: "32"
	 * input: "32.1" => output: "32,1"
	*/

	public Comma = (number: string | number) => {
		return `${number}`.replace(".", ",");
	};

	/**
	 * @requires json
	 *
	 * @param json - your readed json file
	 *
	 * @returns json file (object | array | null | undefined)
	 */

	public FromJSON = (json: string): any => {
		let file;
		JSON.stringify(json, (_, value) => {
			eval(`file = ${value}`);
		});
		return file;
	};

	/**
	 * @requires filePath
	 *
	 * @param filePath - your path to json file
	 *
	 * @returns json file (object | array | null | undefined)
	 */

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
