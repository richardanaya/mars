import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { getCurrentNotebookId } from "./Notebook";
import { defined, sleep } from "./util";
import { Converter } from "showdown";

let converter = new Converter();

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
      fontSize: "8px",
      lineHeight: "18px",
      userSelect: "none",
    },
  },
  { dark: true }
);

@customElement("code-cell")
class CodeCell extends LitElement {
  editorView?: any;

  createRenderRoot() {
    return this;
  }

  render() {
    return html`<div class="code-cell">
      <div class="code-cell-editor"></div>
      <div class="code-cell-output-container" style="display:none">
        <div class="code-cell-menu">
          <div
            class="code-cell-menu-item code-cell-menu-item-output"
            style="display:none"
          >
            output
          </div>
          <div
            class="code-cell-menu-item code-cell-menu-item-html"
            style="display:none"
          >
            html
          </div>
          <div
            class="code-cell-menu-item code-cell-menu-item-text"
            style="display:none"
          >
            text
          </div>
          <div
            class="code-cell-menu-item code-cell-menu-item-markdown"
            style="display:none"
          >
            markdown
          </div>
          <div
            class="code-cell-menu-item code-cell-menu-item-log"
            style="display:none"
          >
            log
          </div>
        </div>
        <div class="code-cell-output-shell">
          <div class="code-cell-minimize">+</div>

          <div class="code-cell-output">
            <div class="code-cell-output-output" style="display:none"></div>
            <div class="code-cell-output-text" style="display:none"></div>
            <div class="code-cell-output-markdown" style="display:none"></div>
            <div class="code-cell-output-html" style="display:none"></div>
            <div class="code-cell-output-log" style="display:none"></div>
          </div>
        </div>
      </div>
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

  async loadResult(handle: number) {
    let c = 0;
    while (true) {
      if (c > 60) {
        return;
      }
      let r = (await fetch(
        `http://127.0.0.1:8080/notebook/${getCurrentNotebookId()}/result/` +
          handle
      ).then((_) => _.json())) as { result: string };
      if (r == null) {
        await sleep(1000);
      } else {
        let o = JSON.parse(r.result);
        try {
          if (typeof o.text === "string") {
            let a = JSON.parse(o.text);
            if(typeof a === "string"){
              a = JSON.parse(a);
              this.handleResult(a);
            } else {
              this.handleResult(o);
            }
          } else {
            this.handleResult(o);
          }
        } catch (e) {
          this.handleResult(o);
        }
        return;
      }
      c++;
    }
  }

  handleResult(a: any) {
    defined(this.querySelector(".code-cell-menu-item-log")).style.display =
      "none";
    defined(this.querySelector(".code-cell-menu-item-html")).style.display =
      "none";
    defined(this.querySelector(".code-cell-menu-item-text")).style.display =
      "none";
    defined(this.querySelector(".code-cell-menu-item-markdown")).style.display =
      "none";
    defined(this.querySelector(".code-cell-output-log")).style.display = "none";
    defined(this.querySelector(".code-cell-output-html")).style.display =
      "none";
    defined(this.querySelector(".code-cell-output-text")).style.display =
      "none";
    defined(this.querySelector(".code-cell-output-markdown")).style.display =
      "none";

    let shown = false;
    if (a.log) {
      defined(this.querySelector(".code-cell-menu-item-log")).style.display =
        "inline-block";
      let o = defined(this.querySelector(".code-cell-output-log"));
      if (!shown) {
        o.style.display = "block";
        shown = true;
      }
      o.innerHTML = a.log.trim().replaceAll("\n", "<br>");
    }
    if (a.markdown) {
      defined(
        this.querySelector(".code-cell-menu-item-markdown")
      ).style.display = "inline-block";
      let o = defined(this.querySelector(".code-cell-output-markdown"));
      if (!shown) {
        o.style.display = "block";
        shown = true;
      }
      o.innerHTML = converter.makeHtml(a.markdown);
    }
    if (a.html) {
      defined(this.querySelector(".code-cell-menu-item-html")).style.display =
        "inline-block";
      let o = defined(this.querySelector(".code-cell-output-html"));
      if (!shown) {
        o.style.display = "block";
        shown = true;
      }
      o.innerHTML = a.html;
    }
    if (a.image) {
      defined(this.querySelector(".code-cell-menu-item-html")).style.display =
        "inline-block";
      let o = defined(this.querySelector(".code-cell-output-html"));
      if (!shown) {
        o.style.display = "block";
        shown = true;
      }
      o.innerHTML = `<img src="${a.image}">`;
    }
    if (a.text) {
      defined(this.querySelector(".code-cell-menu-item-text")).style.display =
        "inline-block";
      let o = defined(this.querySelector(".code-cell-output-text"));
      if (!shown) {
        o.style.display = "block";
        shown = true;
      }
      o.innerHTML = a.text.replaceAll("\n", "<br>");
    }
  }

  async runCodeCell() {
    defined(this.querySelector(".code-cell-output-container")).style.display =
      "block";
    let r = (await fetch(
      `http://127.0.0.1:8080/notebook/${getCurrentNotebookId()}/execute`,
      {
        method: "POST",
        body: defined(this.editorView).state.doc.toString(),
      }
    ).then((_) => _.json())) as { handle?: any; result?: any };
    if (r.handle) {
      this.loadResult(parseFloat(r.handle));
    } else {
      this.handleResult(r.result);
    }
  }
}
