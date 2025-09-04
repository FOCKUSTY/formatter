import assert from "assert";

class Test {
	private readonly _tests: [any, any][];
	private readonly _name: string;

	constructor(name: string, tests: [any, any][]) {
		this._name = name;
		this._tests = tests;
	}

	public readonly execute = () => {
		describe(this._name, () => {
			for (const test of this._tests) {
				const answer = test[0];
				const programmAnswer = test[1];

				it(`Должен вовзращать "${answer}"`, () => {
					assert.equal(answer, programmAnswer, `Вернул ${programmAnswer}`);
				});
			}
		});
	};
}

export default Test;
