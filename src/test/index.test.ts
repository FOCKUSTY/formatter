import Formatter from "../index";
import Test from "./test.class";

import type { TestsType } from "src/types/test.types";

const formatter = new Formatter();

describe("Formatter", () => {
	(() => {
		const RuWords: [string, string, string] = ["Стена", "Стены", "Стен"];
		const RuWords2: [string, string] = ["Пользователь", "Пользователя"];

		const tests: TestsType = [
			[RuWords2[0], formatter.RuWords(-1, RuWords2)],
			[RuWords2[1], formatter.RuWords(-24, RuWords2)],
			[RuWords2[1], formatter.RuWords(25.5, RuWords2)],

			[RuWords[0], formatter.RuWords(1, RuWords)],
			[RuWords[1], formatter.RuWords(2, RuWords)],
			[RuWords[2], formatter.RuWords(5, RuWords)]
		];

		new Test("RuWords(...)", tests).execute();
	})();

	(() => {
		const tests: TestsType = [
			["10,23", formatter.Comma(10.23)],
			["53,2", formatter.Comma(53.2)],
			["51235512,26617", formatter.Comma(`${51235512.26617}`)]
		];

		new Test("Comma(...)", tests).execute();
	})();
});
