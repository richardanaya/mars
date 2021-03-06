import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { getCurrentNotebookId, setCurrentNotebookId } from "./Notebook";
import anime from "animejs";

@customElement("loading-screen")
class LoadingScreen extends LitElement {
  static get styles() {
    return css`
      :host {
        position: absolute;
        background: black;
        color: #555;
        display: flex;
        align-items: center;
        justify-items: center;
        width: 100%;
        height: -webkit-fill-available;
        z-index: 9999;
        transition: opacity 1s ease-in-out;
        opacity: 1;
      }

      :host > div {
        text-align: center;
        width: 100%;
      }

      .loader,
      .loader:after {
        border-radius: 50%;
        width: 10em;
        height: 10em;
      }
      .loader {
        margin: 60px auto;
        font-size: 10px;
        position: relative;
        text-indent: -9999em;
        border-top: 0.1em solid rgba(255, 255, 255, 0.2);
        border-right: 0.1em solid rgba(255, 255, 255, 0.2);
        border-bottom: 0.1em solid rgba(255, 255, 255, 0.2);
        border-left: 0.1em solid #ffffff;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation: load8 1.1s infinite linear;
        animation: load8 1.1s infinite linear;
      }
      @-webkit-keyframes load8 {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
      @keyframes load8 {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
    `;
  }

  constructor() {
    super();
    (async () => {
      let result = await fetch(
        `http://127.0.0.1:8080/notebook/start`
      ).then((_) => _.json());
      console.log(result);
      setCurrentNotebookId(result.id);
      const intervalHandle = window.setInterval(async () => {
        try {
          let currentId = getCurrentNotebookId();
          if (!currentId) {
            return;
          }
          let result = await fetch(
            `http://127.0.0.1:8080/notebook/${currentId}/ready`
          ).then((_) => _.json());
          if (result.ready) {
            window.clearInterval(intervalHandle);
            anime
              .timeline({
                easing: "easeOutExpo",
                duration: 1000,
              })
              .add({
                targets: this,
                opacity: 0,
              })
              .add({
                targets: document.querySelector(".layout"),
                opacity: 1,
                changeComplete: () => {
                  this.remove();
                },
              });
            return;
          }
        } catch (e) {
          console.log(e);
        }
      }, 1000);
    })();
  }

  render() {
    return html` <div><div class="loader" /></div> `;
  }
}
