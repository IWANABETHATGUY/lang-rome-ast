import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { parser, romeAst } from "../dist";
// import { oneDark } from '@codemirror/theme-one-dark';

const doc = `
JsVariableStatement {
    declaration: JsVariableDeclaration {
        kind: LET_KW@0..4 "let" [] [Whitespace(" ")],
        declarators: JsVariableDeclaratorList [
            JsVariableDeclarator {
                id: JsIdentifierBinding {
                    name_token: IDENT@4..6 "a" [] [Whitespace(" ")],
                },
                variable_annotation: missing (optional),
                initializer: JsInitializerClause {
                    eq_token: EQ@6..8 "=" [] [Whitespace(" ")],
                    expression: JsNumberLiteralExpression {
                        value_token: JS_NUMBER_LITERAL@8..9 "3" [] [],
                    },
                },
            },
        ],
    },
    semicolon_token: SEMICOLON@9..10 ";" [] [],
}
`;

new EditorView({
	state: EditorState.create({
		doc,
		extensions: [basicSetup, romeAst(), EditorView.lineWrapping],
	}),
	parent: document.querySelector("#editor"),
});
