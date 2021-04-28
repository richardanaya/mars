import "./TextTypography.js";
import "./LoadingScreen.js";
import {sleep} from "./util.js";
const {EditorState, basicSetup} = CM["@codemirror/basic-setup"];
const {EditorView, keymap} = CM["@codemirror/view"];
const {defaultTabBinding} = CM["@codemirror/commands"];
const {rust} = CM["@codemirror/lang-rust"];
const {tags, HighlightStyle} = CM["@codemirror/highlight"];
const myHighlightStyle = HighlightStyle.define([
  {tag: tags.keyword, color: "#fc6"},
  {tag: tags.comment, color: "#f5d", fontStyle: "italic"}
]);
let myTheme = EditorView.theme({
  "&": {
    color: "#929292",
    backgroundColor: "black"
  },
  ".cm-content": {
    caretColor: "#0e9"
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#0e9"
  },
  "&.cm-focused .cm-selectionBackground, ::selection": {
    backgroundColor: "#074"
  },
  ".cm-gutters": {
    backgroundColor: "#3a1100",
    color: "#e0a877",
    border: "solid 1px #e0a877"
  }
}, {dark: true});
let v = new EditorView({
  state: EditorState.create({
    doc: `println!("hello");`,
    extensions: [
      basicSetup,
      keymap.of([
        {
          key: "Ctrl-Enter",
          run: () => {
            runCodeCell();
          }
        }
      ]),
      keymap.of([defaultTabBinding]),
      rust(),
      myTheme,
      myHighlightStyle
    ]
  }),
  parent: document.querySelector("#editor")
});
async function load_result(handle) {
  let c = 0;
  while (true) {
    if (c > 60) {
      return;
    }
    let r = await fetch("http://127.0.0.1:8080/result/" + handle);
    r = await r.json();
    if (r.result == null) {
      await sleep(1e3);
    } else {
      document.querySelector("#output").innerHTML = r.result;
      return;
    }
    c++;
  }
}
async function runCodeCell() {
  document.querySelector("#output").innerHTML = "Processing...";
  let text = await fetch("http://127.0.0.1:8080/execute", {
    method: "POST",
    body: v.state.doc.toString()
  }).then((_) => _.text());
  load_result(parseFloat(text));
}
document.querySelector("#run-all").addEventListener("click", runCodeCell);
