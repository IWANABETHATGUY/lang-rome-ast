import { EditorSelection, EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { parser, romeAst } from "../dist";
// import { oneDark } from '@codemirror/theme-one-dark';

let doc = `

JsUnknownMember {
    items: [
        TsPropertySignatureModifierList [
            TsDeclareModifier {
                modifier_token: DECLARE_KW@12..23 "declare" [Newline("\n"), Whitespace("  ")] [Whitespace(" ")],
            },
            TsReadonlyModifier {
                modifier_token: READONLY_KW@23..32 "readonly" [] [Whitespace(" ")],
            },
        ],
        JsLiteralMemberName {
            value: IDENT@32..37 "test" [] [Whitespace(" ")],
        },
        JsInitializerClause {
            eq_token: EQ@37..39 "=" [] [Whitespace(" ")],
            expression: JsNumberLiteralExpression {
                value_token: JS_NUMBER_LITERAL@39..40 "1" [] [],
            },
        },
        SEMICOLON@40..41 ";" [] [],
    ],
}

`;
doc = doc.replace(`"\n"`, `"\\n"`);
const editor = new EditorView({
  state: EditorState.create({
    doc,
    extensions: [basicSetup, romeAst(), EditorView.lineWrapping],
  }),
  dispatch(dis) {
    console.log(dis);
    editor.update([dis]);
  },
  parent: document.querySelector("#editor"),
});
setTimeout(() => {
  editor.dispatch({
    selection: EditorSelection.create([EditorSelection.range(0, 10), EditorSelection.cursor(10)]),
  });
});
// editor.view
