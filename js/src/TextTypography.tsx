import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("text-typography")
class TextTypography extends LitElement {
  createRenderRoot() {
    return this;
  }
  render() {
    let content = this.innerHTML;
    this.innerHTML = "";
    const t = this.getAttribute("type");
    if (t === "title") {
      return html`<span style="font-size: 2rem;">${content}</span>`;
    } else if (t === "h3") {
      return html`<span style="font-size: 1.2rem;">${content}</span>`;
    }
  }
}
