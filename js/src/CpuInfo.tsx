import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("cpu-info")
class CpuInfo extends LitElement {
  static get styles() {
    return css`
      .cpus {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-items: center;
      }

      .cpu-title {
        font-size: 0.7rem;
        grid-column: span 2;
        color: white;
        height: 1.6rem;
      }

      .cpu {
        width: 1rem;
        border: solid 1px #313733;
        height: 1rem;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.5rem;
      }
    `;
  }

  render() {
    return html`<div class="cpus">
      <div class="cpu-title">CPU</div>
      <div class="cpu">1</div>
      <div class="cpu">2</div>
    </div>`;
  }
}
