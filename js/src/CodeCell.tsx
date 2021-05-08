import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { getCurrentNotebookId } from "./Notebook";
import { defined, sleep } from "./util";
import { Converter } from "showdown";
import anime from "animejs";

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
      <div class="code-editor-row">
        <div class="code-cell-editor"></div>
        <div class="code-editor-row-end">
          <div class="code-cell-delete" @click=${() => this.remove()}>
            <span
              class="material-icons"
              style="font-size: 12px; 
              margin-top: 4px;"
            >
              close
            </span>
          </div>
        </div>
      </div>
      <div
        class="code-cell-output-container"
        style="opacity: 0; margin: 1rem 0; transition: opacity 1s, margin 1s;"
      >
        <div
          class="code-cell-menu"
          style="display:flex; justify-content: space-around; align-items: center;"
        >
          <div
            class="code-cell-menu-item code-cell-menu-item-html"
            style="overflow:hidden; width: 0;"
          >
            ☲ html
          </div>
          <div
            class="code-cell-menu-item code-cell-menu-item-text"
            style="overflow:hidden; width: 0;"
          >
            ☶ text
          </div>
          <div
            class="code-cell-menu-item code-cell-menu-item-markdown"
            style="overflow:hidden; width: 0;"
          >
            ☷ markdown
          </div>
          <div
            class="code-cell-menu-item code-cell-menu-item-image"
            style="overflow:hidden; width: 0;"
          >
            ☷ image
          </div>
          <div
            class="code-cell-menu-item code-cell-menu-item-log"
            style=" overflow:hidden; width: 0;"
          >
            ☰ log
          </div>
          <div
            class="code-cell-menu-item code-cell-menu-item-log"
            style="color: #e83716;"
            @click=${() => {
              (this.querySelector(
                ".code-cell-output-container"
              ) as HTMLElement).style.display = "none";
            }}
          >
            <span
              class="material-icons"
              style="font-size: 12px; 
          margin-top: 4px;"
            >
              expand_less
            </span>
            clear cell
          </div>
        </div>
        <div class="code-cell-output-shell" style="display: none;">
          <div class="code-cell-minimize">+</div>
          <div class="code-cell-output">
            <div class="code-cell-loading"></div>
            <div class="code-cell-output-text" style="display:none"></div>
            <div class="code-cell-output-image" style="display:none"></div>
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
        doc: `println!("Hello World!");`,
        scrollbarStyle: "native",
        extensions: [
          keymap.of([
            {
              key: "Ctrl-Enter",
              run: () => {
                this.runCodeCell();
              },
            }
          ]),
          basicSetup,
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

    let hide = (selector: string) => {
      let c = defined(this.querySelector(selector)) as HTMLElement;
      c.style.display = "none";
    };

    let toggleVisibility = (selector: string) => {
      hide(".code-cell-output-markdown");
      hide(".code-cell-output-text");
      hide(".code-cell-output-html");
      hide(".code-cell-output-log");
      let c = defined(this.querySelector(selector)) as HTMLElement;
      c.style.display = "block";
    };

    defined(
      this.querySelector(".code-cell-menu-item-markdown") as HTMLElement
    ).addEventListener("click", () => {
      toggleVisibility(".code-cell-output-markdown");
    });
    defined(
      this.querySelector(".code-cell-menu-item-html") as HTMLElement
    ).addEventListener("click", () => {
      toggleVisibility(".code-cell-output-html");
    });
    defined(
      this.querySelector(".code-cell-menu-item-log") as HTMLElement
    ).addEventListener("click", () => {
      toggleVisibility(".code-cell-output-log");
    });
    defined(
      this.querySelector(".code-cell-menu-item-text") as HTMLElement
    ).addEventListener("click", () => {
      toggleVisibility(".code-cell-output-text");
    });
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
            if (typeof a === "string") {
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
    let loader = defined(
      this.querySelector(".code-cell-loading")
    ) as HTMLElement;

    let shown = false;

    const textMenu = defined(
      this.querySelector(".code-cell-menu-item-text")
    ) as HTMLElement;
    const markdownMenu = defined(
      this.querySelector(".code-cell-menu-item-markdown")
    ) as HTMLElement;
    const htmlMenu = defined(
      this.querySelector(".code-cell-menu-item-html")
    ) as HTMLElement;
    const imageMenu = defined(
      this.querySelector(".code-cell-menu-item-image")
    ) as HTMLElement;
    const logMenu = defined(
      this.querySelector(".code-cell-menu-item-log")
    ) as HTMLElement;

    const textOutput = defined(
      this.querySelector(".code-cell-output-text")
    ) as HTMLElement;
    const markdownOutput = defined(
      this.querySelector(".code-cell-output-markdown")
    ) as HTMLElement;
    const htmlOutput = defined(
      this.querySelector(".code-cell-output-html")
    ) as HTMLElement;
    const imageOutput = defined(
      this.querySelector(".code-cell-output-image")
    ) as HTMLElement;
    const logOutput = defined(
      this.querySelector(".code-cell-output-log")
    ) as HTMLElement;

    let firstToShow: HTMLElement | undefined = undefined;
    let menuShowTargets: HTMLElement[] = [];
    let menuHideTargets: HTMLElement[] = [];
    let outputMaker: (() => void)[] = [];

    if (a.text) {
      menuShowTargets.push(textMenu);
      outputMaker.push(() => {
        textOutput.innerHTML = a.text.trim().replaceAll("\n", "<br>");
      });
      if (!shown) {
        firstToShow = textOutput;
        shown = true;
      }
    } else {
      menuHideTargets.push(textMenu);
      outputMaker.push(() => {
        textOutput.innerHTML = "";
      });
    }
    if (a.log) {
      menuShowTargets.push(logMenu);
      outputMaker.push(() => {
        logOutput.innerHTML = a.log.trim().replaceAll("\n", "<br>");
      });
      if (!shown) {
        firstToShow = logOutput;
        shown = true;
      }
    } else {
      menuHideTargets.push(logMenu);
      outputMaker.push(() => {
        logOutput.innerHTML = "";
      });
    }
    if (a.markdown) {
      menuShowTargets.push(markdownMenu);
      outputMaker.push(() => {
        markdownOutput.innerHTML = converter.makeHtml(a.markdown);
      });
      if (!shown) {
        firstToShow = markdownOutput;
        shown = true;
      }
    } else {
      menuHideTargets.push(markdownMenu);
      outputMaker.push(() => {
        markdownOutput.innerHTML = "";
      });
    }
    if (a.html) {
      menuShowTargets.push(htmlMenu);
      outputMaker.push(() => {
        htmlOutput.innerHTML = a.html;
      });
      if (!shown) {
        firstToShow = htmlOutput;
        shown = true;
      }
    } else {
      menuHideTargets.push(htmlMenu);
      outputMaker.push(() => {
        htmlOutput.innerHTML = "";
      });
    }
    if (a.image) {
      menuShowTargets.push(imageMenu);
      outputMaker.push(() => {
        imageOutput.innerHTML = `<img src="${a.image}"/>`;
      });
      if (!shown) {
        firstToShow = imageOutput;
        shown = true;
      }
    } else {
      menuHideTargets.push(imageMenu);
      outputMaker.push(() => {
        imageOutput.innerHTML = "";
      });
    }

    anime
      .timeline({
        easing: "easeOutExpo",
        duration: 1000,

        complete: () => {
          outputMaker.forEach((_) => _());
        },
      })
      .add({
        targets: loader,
        opacity: 0,
        complete: () => {
          loader.style.display = "none";
          anime({
            easing: "easeOutExpo",
            targets: menuHideTargets,
            opacity: 0,
            width: 0,
          });
          anime({
            easing: "easeOutExpo",
            targets: menuShowTargets,
            width: 50,
            opacity: 1,
            begin: () => {
              menuShowTargets.forEach((_) => {
                _.style.opacity = "0";
              });
            },
          });
          if (firstToShow) {
            outputMaker.forEach((_) => _());
            firstToShow.style.display = "block";
            firstToShow.style.opacity = "1";
          }
        },
      });
  }

  async runCodeCell() {
    this.querySelector(".code-cell-output-container").style.display = "block";
    const textOutput = defined(
      this.querySelector(".code-cell-output-text")
    ) as HTMLElement;
    const markdownOutput = defined(
      this.querySelector(".code-cell-output-markdown")
    ) as HTMLElement;
    const htmlOutput = defined(
      this.querySelector(".code-cell-output-html")
    ) as HTMLElement;
    const imageOutput = defined(
      this.querySelector(".code-cell-output-image")
    ) as HTMLElement;
    const logOutput = defined(
      this.querySelector(".code-cell-output-log")
    ) as HTMLElement;
    textOutput.innerHTML = "";
    textOutput.style.display = "none";
    markdownOutput.innerHTML = "";
    markdownOutput.style.display = "none";
    htmlOutput.innerHTML = "";
    htmlOutput.style.display = "none";
    imageOutput.innerHTML = "";
    imageOutput.style.display = "none";
    logOutput.innerHTML = "";
    logOutput.style.display = "none";

    anime({
      targets: [
        this.querySelector(".code-cell-loading"),
        this.querySelector(".code-cell-output-shell"),
      ],
      opacity: 1,
      begin: () => {
        this.querySelector(".code-cell-loading").style.display = "block";
        this.querySelector(".code-cell-output-shell").style.display = "block";
      },
    });

    this.querySelector(".code-cell-output-container").style.display = "block";

    anime({
      targets: this.querySelector(".code-cell-output-container"),
      opacity: 1,
    });

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
