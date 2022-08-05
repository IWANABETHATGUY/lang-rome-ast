import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { parser, romeAst } from "../dist";
// import { oneDark } from '@codemirror/theme-one-dark';

let doc = `
JsUnknownParameter {
    items: [
        TsTypeAnnotation {
            colon_token: COLON@119..121 ":" [] [Whitespace(" ")],
            ty: TsReferenceType {
                name: JsReferenceIdentifier {
                    value_token: IDENT@121..138 "ErrorsTextOptions" [] [],
                },
                type_arguments: missing (optional),
            },
        },
    ],
}
`;
doc = doc.replace(`"\n"`, `"\\n"`)
new EditorView({
	state: EditorState.create({
		doc,
		extensions: [basicSetup, romeAst(), EditorView.lineWrapping],
	}),
	parent: document.querySelector("#editor"),
});
