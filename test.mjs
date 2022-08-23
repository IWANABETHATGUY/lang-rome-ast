// import { parser } from "@lezer/javascript";
import { parser, romeAst } from "./dist/index.js";

let source = `
JsModule {
    interpreter_token: missing (optional),
    directives: JsDirectiveList [],
    items: JsModuleItemList [
        JsVariableStatement {
            declaration: JsVariableDeclaration {
                kind: LET_KW@0..6 "let" [Whitespace("  ")] [Whitespace(" ")],
                declarators: JsVariableDeclaratorList [
                    JsVariableDeclarator {
                        id: JsIdentifierBinding {
                            name_token: IDENT@6..8 "a" [] [Whitespace(" ")],
                        },
                        variable_annotation: missing (optional),
                        initializer: JsInitializerClause {
                            eq_token: EQ@8..10 "=" [] [Whitespace(" ")],
                            expression: JsFunctionExpression {
                                async_token: missing (optional),
                                function_token: FUNCTION_KW@10..18 "function" [] [],
                                star_token: missing (optional),
                                id: missing (optional),
                                type_parameters: missing (optional),
                                parameters: JsParameters {
                                    l_paren_token: L_PAREN@18..19 "(" [] [],
                                    items: JsParameterList [],
                                    r_paren_token: R_PAREN@19..21 ")" [] [Whitespace(" ")],
                                },
                                return_type_annotation: missing (optional),
                                body: JsFunctionBody {
                                    l_curly_token: L_CURLY@21..22 "{" [] [],
                                    directives: JsDirectiveList [],
                                    statements: JsStatementList [
                                        JsVariableStatement {
                                            declaration: JsVariableDeclaration {
                                                kind: LET_KW@22..31 "let" [Newline("\n"), Whitespace("    ")] [Whitespace(" ")],
                                                declarators: JsVariableDeclaratorList [
                                                    JsVariableDeclarator {
                                                        id: JsIdentifierBinding {
                                                            name_token: IDENT@31..33 "b" [] [Whitespace(" ")],
                                                        },
                                                        variable_annotation: missing (optional),
                                                        initializer: JsInitializerClause {
                                                            eq_token: EQ@33..35 "=" [] [Whitespace(" ")],
                                                            expression: JsNumberLiteralExpression {
                                                                value_token: JS_NUMBER_LITERAL@35..36 "3" [] [],
                                                            },
                                                        },
                                                    },
                                                ],
                                            },
                                            semicolon_token: SEMICOLON@36..37 ";" [] [],
                                        },
                                    ],
                                    r_curly_token: R_CURLY@37..41 "}" [Newline("\n"), Whitespace("  ")] [],
                                },
                            },
                        },
                    },
                ],
            },
            semicolon_token: missing (optional),
        },
    ],
    eof_token: EOF@41..41 "" [] [],
}

`;
let ast = parser.parse(source);
// console.log(ast.topNode.type.isError)
ast.iterate({
  enter(node) {
    if (node.type.name === "SyntaxToken") {
      console.log(node.type.isError);
      let range = node.node.getChild("Range");
      // console.log(range.type.)
      let current = range.firstChild
      while (current) {
        if (current.type.isError){
          return;
        }
        current = current.nextSibling;
      }

      const children = range.node.getChildren("Number");
      // console.log(children.at(1));
      let first = children.at(0)?.node;
      let second = children.at(1)?.node;
      if (first && second) {
        let start = source.slice(first.from, first.to);
        let end = source.slice(second.from, second.to);
        console.log(`${start}..${end}`)
      }
      // // const lastChild = range.node.getChild('Number');
      // firstChild.from
      // console.log(range.node.getChild(3))
    }
  },
});
