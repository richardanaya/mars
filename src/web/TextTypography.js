var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import {LitElement, html} from "./_snowpack/pkg/lit.js";
import {customElement} from "./_snowpack/pkg/lit/decorators.js";
let TextTypography = class extends LitElement {
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
};
TextTypography = __decorate([
  customElement("text-typography")
], TextTypography);
