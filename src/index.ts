import { parser as romeParser } from "./syntax.grammar";
import {
  LRLanguage,
  LanguageSupport,
  indentNodeProp,
  foldNodeProp,
  foldInside,
  delimitedIndent,
  continuedIndent,
} from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";
import { completeFromList, ifNotIn, snippetCompletion as snip, Completion } from "@codemirror/autocomplete";

export const romeAstLanguage = LRLanguage.define({
  parser: romeParser.configure({
    props: [
      indentNodeProp.add({
      }),
      foldNodeProp.add({
        SyntaxNode(tree) {
          return {
            from: tree.getChild('{')!.from + 1,
            to: tree.getChild('}')!.to -1 
          }
        },
        SyntaxNodeList(tree) {
          return {
            from: tree.getChild('[')!.from + 1,
            to: tree.getChild(']')!.to - 1
          }
        }
      }),
      styleTags({
        Identifier: t.variableName,
        String: t.string,
        "( )": t.paren,
        "{ }": t.bracket,
        "[ ]": t.squareBracket,
        Number: t.number,
      }),
    ],
  }),
  languageData: {
    commentTokens: { line: ";" },
  },
});

// const snippets: readonly Completion[] = [
//   snip("let ${binds} in ${expression}", {
//     label: "let",
//     detail: "Let ... in statement",
//     type: "keyword",
//   }),
//   snip("with ${expression}; ${expression}", {
//     label: "with",
//     detail: "With statement",
//     type: "keyword",
//   }),
// ];

export function romeAst() {
  return new LanguageSupport(romeAstLanguage);
}

export { parser } from "./syntax.grammar";
