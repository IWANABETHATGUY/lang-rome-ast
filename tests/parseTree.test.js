import { describe, it, expect } from "vitest";
import { getLezerSyntaxTree } from "lezer-syntax-tree-debug";
import { parser } from "../dist/index";
import * as fs from "fs";
import * as path from "path";

describe("basic", () => {
	fs.readdirSync(path.resolve(__dirname, "./fixtures")).forEach((file) => {
		it(file, () => {
			let source = fs.readFileSync(
				path.resolve(__dirname, "./fixtures", file),
				"utf8",
			);
			let syntaxTree = parser.parse(source);

			let syntaxTreeDebug = getLezerSyntaxTree(syntaxTree.topNode, source);
			expect(syntaxTreeDebug).toMatchSnapshot();
		});
	});
});
