// import { parser } from "@lezer/javascript";
import { parser, romeAst } from "./dist/index.js";

let ast = parser.parse(`
JsUnknownMember {
  items: [
      JsInitializerClause {
          eq_token: EQ@37..39 "=" [] [Whitespace(" ")],
          expression: JsNumberLiteralExpression {
              value_token: JS_NUMBER_LITERAL@39..40 "1" [] [],
          },
      },
      SEMICOLON@40..41 ";" [] [],
  ],
}

`);

ast.iterate({
  enter(node) {
    if (node.type.name === "SyntaxToken") {
      console.log(node.type.);
    }
  },
});
