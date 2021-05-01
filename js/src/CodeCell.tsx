import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { getCurrentNotebookId } from "./Notebook";
import { defined, sleep } from "./util";

const { EditorState, basicSetup } = CM["@codemirror/basic-setup"];
const { EditorView, keymap } = CM["@codemirror/view"];
const { defaultTabBinding } = CM["@codemirror/commands"];
const { rust } = CM["@codemirror/lang-rust"];
const { tags, HighlightStyle } = CM["@codemirror/highlight"];

const myHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: "#fc6" },
  { tag: tags.comment, color: "#f5d", fontStyle: "italic" },
]);

let myTheme = EditorView.theme(
  {
    "&": {
      color: "#929292",
      backgroundColor: "black",
    },
    ".cm-content": {
      caretColor: "#0e9",
    },
    "&.cm-focused .cm-cursor": {
      borderLeftColor: "#0e9",
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "#074",
    },
    ".cm-gutters": {
      backgroundColor: "#3a1100",
      color: "#e0a877",
      border: "solid 1px #e0a877",
    },
  },
  { dark: true }
);

@customElement("code-cell")
class CodeCell extends LitElement {
  editorView?: any;
  static get styles() {
    return css`
      .code-cell-output {
        color: #929292;
        padding: 1rem;
      }
    `;
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`<div class="code-cell">
      hey
      <div class="code-cell-editor"></div>
      <div class="code-cell-output" style="color: white"></div>
    </div>`;
  }

  firstUpdated() {
    this.editorView = new EditorView({
      state: EditorState.create({
        doc: `println!("hello");`,
        extensions: [
          basicSetup,
          keymap.of([
            {
              key: "Ctrl-Enter",
              run: () => {
                this.runCodeCell();
              },
            },
          ]),
          keymap.of([defaultTabBinding]),
          rust(),
          myTheme,
          myHighlightStyle,
        ],
      }),
      parent: this.querySelector(".code-cell-editor"),
    });
    defined(document.querySelector("#run-all")).addEventListener("click", () =>
      this.runCodeCell()
    );
  }

  async load_result(handle: number) {
    let c = 0;
    while (true) {
      if (c > 60) {
        return;
      }
      let r = (await fetch(
        `http://127.0.0.1:8080/notebook/${getCurrentNotebookId()}/result/` +
          handle
      ).then((_) => _.json())) as { result: string };
      let outputCell = defined(this.querySelector(".code-cell-output"));
      if (r == null) {
        await sleep(1000);
      } else {
        try {
          let a = JSON.parse(r.result);
          a = JSON.parse(a);
          outputCell.innerHTML = "";
          if (a.log) {
            outputCell.innerHTML += a.log.replaceAll("\n", "<br>");
            outputCell.innerHTML += "<hr/>";
          }
          if (a.html) {
            outputCell.innerHTML += a.html;
          } else if (a.image) {
            outputCell.innerHTML += `<img src="${a.image}">`;
          } else if (a.text) {
            outputCell.innerHTML += a.text.replaceAll("\n", "<br>");
          } else {
            outputCell.innerHTML += r.result;
          }
        } catch (e) {
          outputCell.innerHTML = r.result;
        }
        return;
      }
      c++;
    }
  }

  async runCodeCell() {
    defined(this.querySelector(".code-cell-output")).innerHTML =
      "Processing...";
    let text = await fetch(
      `http://127.0.0.1:8080/notebook/${getCurrentNotebookId()}/execute`,
      {
        method: "POST",
        body: defined(this.editorView).state.doc.toString(),
      }
    ).then((_) => _.text());
    this.load_result(parseFloat(text));
  }
}
