// _snowpack/pkg/lit.js
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;
var i;
var s;
var e;
var o = globalThis.trustedTypes;
var l = o ? o.createPolicy("lit-html", {createHTML: (t2) => t2}) : void 0;
var n = `lit$${(Math.random() + "").slice(9)}$`;
var h = "?" + n;
var r = `<${h}>`;
var u = document;
var c = (t2 = "") => u.createComment(t2);
var d = (t2) => t2 === null || typeof t2 != "object" && typeof t2 != "function";
var v = Array.isArray;
var a = (t2) => {
  var i2;
  return v(t2) || typeof ((i2 = t2) === null || i2 === void 0 ? void 0 : i2[Symbol.iterator]) == "function";
};
var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g;
var $ = /'/g;
var g = /"/g;
var y = /^(?:script|style|textarea)$/i;
var b = (t2) => (i2, ...s2) => ({_$litType$: t2, strings: i2, values: s2});
var T = b(1);
var w = Symbol.for("lit-noChange");
var A = Symbol.for("lit-nothing");
var P = new WeakMap();
var V = (t2, i2, s2) => {
  var e2, o2;
  const l2 = (e2 = s2 == null ? void 0 : s2.renderBefore) !== null && e2 !== void 0 ? e2 : i2;
  let n3 = l2._$litPart$;
  if (n3 === void 0) {
    const t3 = (o2 = s2 == null ? void 0 : s2.renderBefore) !== null && o2 !== void 0 ? o2 : null;
    l2._$litPart$ = n3 = new C(i2.insertBefore(c(), t3), t3, void 0, s2);
  }
  return n3.I(t2), n3;
};
var E = u.createTreeWalker(u, 129, null, false);
var M = (t2, i2) => {
  const s2 = t2.length - 1, e2 = [];
  let o2, h2 = i2 === 2 ? "<svg>" : "", u2 = f;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let l2, c3, d2 = -1, v2 = 0;
    for (; v2 < s3.length && (u2.lastIndex = v2, c3 = u2.exec(s3), c3 !== null); )
      v2 = u2.lastIndex, u2 === f ? c3[1] === "!--" ? u2 = _ : c3[1] !== void 0 ? u2 = m : c3[2] !== void 0 ? (y.test(c3[2]) && (o2 = RegExp("</" + c3[2], "g")), u2 = p) : c3[3] !== void 0 && (u2 = p) : u2 === p ? c3[0] === ">" ? (u2 = o2 != null ? o2 : f, d2 = -1) : c3[1] === void 0 ? d2 = -2 : (d2 = u2.lastIndex - c3[2].length, l2 = c3[1], u2 = c3[3] === void 0 ? p : c3[3] === '"' ? g : $) : u2 === g || u2 === $ ? u2 = p : u2 === _ || u2 === m ? u2 = f : (u2 = p, o2 = void 0);
    const a2 = u2 === p && t2[i3 + 1].startsWith("/>") ? " " : "";
    h2 += u2 === f ? s3 + r : d2 >= 0 ? (e2.push(l2), s3.slice(0, d2) + "$lit$" + s3.slice(d2) + n + a2) : s3 + n + (d2 === -2 ? (e2.push(void 0), i3) : a2);
  }
  const c2 = h2 + (t2[s2] || "<?>") + (i2 === 2 ? "</svg>" : "");
  return [l !== void 0 ? l.createHTML(c2) : c2, e2];
};
var N = class {
  constructor({strings: t2, _$litType$: i2}, s2) {
    let e2;
    this.parts = [];
    let l2 = 0, r2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [v2, a2] = M(t2, i2);
    if (this.el = N.createElement(v2, s2), E.currentNode = this.el.content, i2 === 2) {
      const t3 = this.el.content, i3 = t3.firstChild;
      i3.remove(), t3.append(...i3.childNodes);
    }
    for (; (e2 = E.nextNode()) !== null && d2.length < u2; ) {
      if (e2.nodeType === 1) {
        if (e2.hasAttributes()) {
          const t3 = [];
          for (const i3 of e2.getAttributeNames())
            if (i3.endsWith("$lit$") || i3.startsWith(n)) {
              const s3 = a2[r2++];
              if (t3.push(i3), s3 !== void 0) {
                const t4 = e2.getAttribute(s3.toLowerCase() + "$lit$").split(n), i4 = /([.?@])?(.*)/.exec(s3);
                d2.push({type: 1, index: l2, name: i4[2], strings: t4, ctor: i4[1] === "." ? I : i4[1] === "?" ? L : i4[1] === "@" ? R : H});
              } else
                d2.push({type: 6, index: l2});
            }
          for (const i3 of t3)
            e2.removeAttribute(i3);
        }
        if (y.test(e2.tagName)) {
          const t3 = e2.textContent.split(n), i3 = t3.length - 1;
          if (i3 > 0) {
            e2.textContent = o ? o.emptyScript : "";
            for (let s3 = 0; s3 < i3; s3++)
              e2.append(t3[s3], c()), E.nextNode(), d2.push({type: 2, index: ++l2});
            e2.append(t3[i3], c());
          }
        }
      } else if (e2.nodeType === 8)
        if (e2.data === h)
          d2.push({type: 2, index: l2});
        else {
          let t3 = -1;
          for (; (t3 = e2.data.indexOf(n, t3 + 1)) !== -1; )
            d2.push({type: 7, index: l2}), t3 += n.length - 1;
        }
      l2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = u.createElement("template");
    return s2.innerHTML = t2, s2;
  }
};
function S(t2, i2, s2 = t2, e2) {
  var o2, l2, n3, h2;
  if (i2 === w)
    return i2;
  let r2 = e2 !== void 0 ? (o2 = s2.\u03A3i) === null || o2 === void 0 ? void 0 : o2[e2] : s2.\u03A3o;
  const u2 = d(i2) ? void 0 : i2._$litDirective$;
  return (r2 == null ? void 0 : r2.constructor) !== u2 && ((l2 = r2 == null ? void 0 : r2.O) === null || l2 === void 0 || l2.call(r2, false), u2 === void 0 ? r2 = void 0 : (r2 = new u2(t2), r2.T(t2, s2, e2)), e2 !== void 0 ? ((n3 = (h2 = s2).\u03A3i) !== null && n3 !== void 0 ? n3 : h2.\u03A3i = [])[e2] = r2 : s2.\u03A3o = r2), r2 !== void 0 && (i2 = S(t2, r2.S(t2, i2.values), r2, e2)), i2;
}
var k = class {
  constructor(t2, i2) {
    this.l = [], this.N = void 0, this.D = t2, this.M = i2;
  }
  u(t2) {
    var i2;
    const {el: {content: s2}, parts: e2} = this.D, o2 = ((i2 = t2 == null ? void 0 : t2.creationScope) !== null && i2 !== void 0 ? i2 : u).importNode(s2, true);
    E.currentNode = o2;
    let l2 = E.nextNode(), n3 = 0, h2 = 0, r2 = e2[0];
    for (; r2 !== void 0; ) {
      if (n3 === r2.index) {
        let i3;
        r2.type === 2 ? i3 = new C(l2, l2.nextSibling, this, t2) : r2.type === 1 ? i3 = new r2.ctor(l2, r2.name, r2.strings, this, t2) : r2.type === 6 && (i3 = new z(l2, this, t2)), this.l.push(i3), r2 = e2[++h2];
      }
      n3 !== (r2 == null ? void 0 : r2.index) && (l2 = E.nextNode(), n3++);
    }
    return o2;
  }
  v(t2) {
    let i2 = 0;
    for (const s2 of this.l)
      s2 !== void 0 && (s2.strings !== void 0 ? (s2.I(t2, s2, i2), i2 += s2.strings.length - 2) : s2.I(t2[i2])), i2++;
  }
};
var C = class {
  constructor(t2, i2, s2, e2) {
    this.type = 2, this.N = void 0, this.A = t2, this.B = i2, this.M = s2, this.options = e2;
  }
  setConnected(t2) {
    var i2;
    (i2 = this.P) === null || i2 === void 0 || i2.call(this, t2);
  }
  get parentNode() {
    return this.A.parentNode;
  }
  get startNode() {
    return this.A;
  }
  get endNode() {
    return this.B;
  }
  I(t2, i2 = this) {
    t2 = S(this, t2, i2), d(t2) ? t2 === A || t2 == null || t2 === "" ? (this.H !== A && this.R(), this.H = A) : t2 !== this.H && t2 !== w && this.m(t2) : t2._$litType$ !== void 0 ? this._(t2) : t2.nodeType !== void 0 ? this.$(t2) : a(t2) ? this.g(t2) : this.m(t2);
  }
  k(t2, i2 = this.B) {
    return this.A.parentNode.insertBefore(t2, i2);
  }
  $(t2) {
    this.H !== t2 && (this.R(), this.H = this.k(t2));
  }
  m(t2) {
    const i2 = this.A.nextSibling;
    i2 !== null && i2.nodeType === 3 && (this.B === null ? i2.nextSibling === null : i2 === this.B.previousSibling) ? i2.data = t2 : this.$(u.createTextNode(t2)), this.H = t2;
  }
  _(t2) {
    var i2;
    const {values: s2, _$litType$: e2} = t2, o2 = typeof e2 == "number" ? this.C(t2) : (e2.el === void 0 && (e2.el = N.createElement(e2.h, this.options)), e2);
    if (((i2 = this.H) === null || i2 === void 0 ? void 0 : i2.D) === o2)
      this.H.v(s2);
    else {
      const t3 = new k(o2, this), i3 = t3.u(this.options);
      t3.v(s2), this.$(i3), this.H = t3;
    }
  }
  C(t2) {
    let i2 = P.get(t2.strings);
    return i2 === void 0 && P.set(t2.strings, i2 = new N(t2)), i2;
  }
  g(t2) {
    v(this.H) || (this.H = [], this.R());
    const i2 = this.H;
    let s2, e2 = 0;
    for (const o2 of t2)
      e2 === i2.length ? i2.push(s2 = new C(this.k(c()), this.k(c()), this, this.options)) : s2 = i2[e2], s2.I(o2), e2++;
    e2 < i2.length && (this.R(s2 && s2.B.nextSibling, e2), i2.length = e2);
  }
  R(t2 = this.A.nextSibling, i2) {
    var s2;
    for ((s2 = this.P) === null || s2 === void 0 || s2.call(this, false, true, i2); t2 && t2 !== this.B; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
};
var H = class {
  constructor(t2, i2, s2, e2, o2) {
    this.type = 1, this.H = A, this.N = void 0, this.V = void 0, this.element = t2, this.name = i2, this.M = e2, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this.H = Array(s2.length - 1).fill(A), this.strings = s2) : this.H = A;
  }
  get tagName() {
    return this.element.tagName;
  }
  I(t2, i2 = this, s2, e2) {
    const o2 = this.strings;
    let l2 = false;
    if (o2 === void 0)
      t2 = S(this, t2, i2, 0), l2 = !d(t2) || t2 !== this.H && t2 !== w, l2 && (this.H = t2);
    else {
      const e3 = t2;
      let n3, h2;
      for (t2 = o2[0], n3 = 0; n3 < o2.length - 1; n3++)
        h2 = S(this, e3[s2 + n3], i2, n3), h2 === w && (h2 = this.H[n3]), l2 || (l2 = !d(h2) || h2 !== this.H[n3]), h2 === A ? t2 = A : t2 !== A && (t2 += (h2 != null ? h2 : "") + o2[n3 + 1]), this.H[n3] = h2;
    }
    l2 && !e2 && this.W(t2);
  }
  W(t2) {
    t2 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 != null ? t2 : "");
  }
};
var I = class extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  W(t2) {
    this.element[this.name] = t2 === A ? void 0 : t2;
  }
};
var L = class extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  W(t2) {
    t2 && t2 !== A ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name);
  }
};
var R = class extends H {
  constructor() {
    super(...arguments), this.type = 5;
  }
  I(t2, i2 = this) {
    var s2;
    if ((t2 = (s2 = S(this, t2, i2, 0)) !== null && s2 !== void 0 ? s2 : A) === w)
      return;
    const e2 = this.H, o2 = t2 === A && e2 !== A || t2.capture !== e2.capture || t2.once !== e2.once || t2.passive !== e2.passive, l2 = t2 !== A && (e2 === A || o2);
    o2 && this.element.removeEventListener(this.name, this, e2), l2 && this.element.addEventListener(this.name, this, t2), this.H = t2;
  }
  handleEvent(t2) {
    var i2, s2;
    typeof this.H == "function" ? this.H.call((s2 = (i2 = this.options) === null || i2 === void 0 ? void 0 : i2.host) !== null && s2 !== void 0 ? s2 : this.element, t2) : this.H.handleEvent(t2);
  }
};
var z = class {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this.N = void 0, this.V = void 0, this.M = i2, this.options = s2;
  }
  I(t2) {
    S(this, t2);
  }
};
(i = (t = globalThis).litHtmlPlatformSupport) === null || i === void 0 || i.call(t, N, C), ((s = (e = globalThis).litHtmlVersions) !== null && s !== void 0 ? s : e.litHtmlVersions = []).push("2.0.0-rc.2");
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1 = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var e$1 = Symbol();
var n$1 = class {
  constructor(t2, n3) {
    if (n3 !== e$1)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2;
  }
  get styleSheet() {
    return t$1 && this.t === void 0 && (this.t = new CSSStyleSheet(), this.t.replaceSync(this.cssText)), this.t;
  }
  toString() {
    return this.cssText;
  }
};
var s$1 = (t2) => new n$1(t2 + "", e$1);
var o$1 = new Map();
var r$1 = (t2, ...s2) => {
  const r2 = s2.reduce((e2, s3, o2) => e2 + ((t3) => {
    if (t3 instanceof n$1)
      return t3.cssText;
    if (typeof t3 == "number")
      return t3;
    throw Error(`Value passed to 'css' function must be a 'css' function result: ${t3}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
  })(s3) + t2[o2 + 1], t2[0]);
  let i2 = o$1.get(r2);
  return i2 === void 0 && o$1.set(r2, i2 = new n$1(r2, e$1)), i2;
};
var i$1 = (e2, n3) => {
  t$1 ? e2.adoptedStyleSheets = n3.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : n3.forEach((t2) => {
    const n4 = document.createElement("style");
    n4.textContent = t2.cssText, e2.appendChild(n4);
  });
};
var S$1 = t$1 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const n3 of t3.cssRules)
    e2 += n3.cssText;
  return s$1(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$2;
var e$2;
var h$1;
var r$2;
var o$2 = {toAttribute(t2, i2) {
  switch (i2) {
    case Boolean:
      t2 = t2 ? "" : null;
      break;
    case Object:
    case Array:
      t2 = t2 == null ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, i2) {
  let s2 = t2;
  switch (i2) {
    case Boolean:
      s2 = t2 !== null;
      break;
    case Number:
      s2 = t2 === null ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        s2 = JSON.parse(t2);
      } catch (t3) {
        s2 = null;
      }
  }
  return s2;
}};
var n$2 = (t2, i2) => i2 !== t2 && (i2 == i2 || t2 == t2);
var l$1 = {attribute: true, type: String, converter: o$2, reflect: false, hasChanged: n$2};
var a$1 = class extends HTMLElement {
  constructor() {
    super(), this.\u03A0i = new Map(), this.\u03A0o = void 0, this.\u03A0l = void 0, this.isUpdatePending = false, this.hasUpdated = false, this.\u03A0h = null, this.u();
  }
  static addInitializer(t2) {
    var i2;
    (i2 = this.v) !== null && i2 !== void 0 || (this.v = []), this.v.push(t2);
  }
  static get observedAttributes() {
    this.finalize();
    const t2 = [];
    return this.elementProperties.forEach((i2, s2) => {
      const e2 = this.\u03A0p(s2, i2);
      e2 !== void 0 && (this.\u03A0m.set(e2, s2), t2.push(e2));
    }), t2;
  }
  static createProperty(t2, i2 = l$1) {
    if (i2.state && (i2.attribute = false), this.finalize(), this.elementProperties.set(t2, i2), !i2.noAccessor && !this.prototype.hasOwnProperty(t2)) {
      const s2 = typeof t2 == "symbol" ? Symbol() : "__" + t2, e2 = this.getPropertyDescriptor(t2, s2, i2);
      e2 !== void 0 && Object.defineProperty(this.prototype, t2, e2);
    }
  }
  static getPropertyDescriptor(t2, i2, s2) {
    return {get() {
      return this[i2];
    }, set(e2) {
      const h2 = this[t2];
      this[i2] = e2, this.requestUpdate(t2, h2, s2);
    }, configurable: true, enumerable: true};
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) || l$1;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t2 = Object.getPrototypeOf(this);
    if (t2.finalize(), this.elementProperties = new Map(t2.elementProperties), this.\u03A0m = new Map(), this.hasOwnProperty("properties")) {
      const t3 = this.properties, i2 = [...Object.getOwnPropertyNames(t3), ...Object.getOwnPropertySymbols(t3)];
      for (const s2 of i2)
        this.createProperty(s2, t3[s2]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i2) {
    const s2 = [];
    if (Array.isArray(i2)) {
      const e2 = new Set(i2.flat(1 / 0).reverse());
      for (const i3 of e2)
        s2.unshift(S$1(i3));
    } else
      i2 !== void 0 && s2.push(S$1(i2));
    return s2;
  }
  static \u03A0p(t2, i2) {
    const s2 = i2.attribute;
    return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t2 == "string" ? t2.toLowerCase() : void 0;
  }
  u() {
    var t2;
    this.\u03A0g = new Promise((t3) => this.enableUpdating = t3), this.L = new Map(), this.\u03A0_(), this.requestUpdate(), (t2 = this.constructor.v) === null || t2 === void 0 || t2.forEach((t3) => t3(this));
  }
  addController(t2) {
    var i2, s2;
    ((i2 = this.\u03A0U) !== null && i2 !== void 0 ? i2 : this.\u03A0U = []).push(t2), this.renderRoot !== void 0 && this.isConnected && ((s2 = t2.hostConnected) === null || s2 === void 0 || s2.call(t2));
  }
  removeController(t2) {
    var i2;
    (i2 = this.\u03A0U) === null || i2 === void 0 || i2.splice(this.\u03A0U.indexOf(t2) >>> 0, 1);
  }
  \u03A0_() {
    this.constructor.elementProperties.forEach((t2, i2) => {
      this.hasOwnProperty(i2) && (this.\u03A0i.set(i2, this[i2]), delete this[i2]);
    });
  }
  createRenderRoot() {
    var t2;
    const s2 = (t2 = this.shadowRoot) !== null && t2 !== void 0 ? t2 : this.attachShadow(this.constructor.shadowRootOptions);
    return i$1(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    var t2;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t2 = this.\u03A0U) === null || t2 === void 0 || t2.forEach((t3) => {
      var i2;
      return (i2 = t3.hostConnected) === null || i2 === void 0 ? void 0 : i2.call(t3);
    }), this.\u03A0l && (this.\u03A0l(), this.\u03A0o = this.\u03A0l = void 0);
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var t2;
    (t2 = this.\u03A0U) === null || t2 === void 0 || t2.forEach((t3) => {
      var i2;
      return (i2 = t3.hostDisconnected) === null || i2 === void 0 ? void 0 : i2.call(t3);
    }), this.\u03A0o = new Promise((t3) => this.\u03A0l = t3);
  }
  attributeChangedCallback(t2, i2, s2) {
    this.K(t2, s2);
  }
  \u03A0j(t2, i2, s2 = l$1) {
    var e2, h2;
    const r2 = this.constructor.\u03A0p(t2, s2);
    if (r2 !== void 0 && s2.reflect === true) {
      const n3 = ((h2 = (e2 = s2.converter) === null || e2 === void 0 ? void 0 : e2.toAttribute) !== null && h2 !== void 0 ? h2 : o$2.toAttribute)(i2, s2.type);
      this.\u03A0h = t2, n3 == null ? this.removeAttribute(r2) : this.setAttribute(r2, n3), this.\u03A0h = null;
    }
  }
  K(t2, i2) {
    var s2, e2, h2;
    const r2 = this.constructor, n3 = r2.\u03A0m.get(t2);
    if (n3 !== void 0 && this.\u03A0h !== n3) {
      const t3 = r2.getPropertyOptions(n3), l2 = t3.converter, a2 = (h2 = (e2 = (s2 = l2) === null || s2 === void 0 ? void 0 : s2.fromAttribute) !== null && e2 !== void 0 ? e2 : typeof l2 == "function" ? l2 : null) !== null && h2 !== void 0 ? h2 : o$2.fromAttribute;
      this.\u03A0h = n3, this[n3] = a2(i2, t3.type), this.\u03A0h = null;
    }
  }
  requestUpdate(t2, i2, s2) {
    let e2 = true;
    t2 !== void 0 && (((s2 = s2 || this.constructor.getPropertyOptions(t2)).hasChanged || n$2)(this[t2], i2) ? (this.L.has(t2) || this.L.set(t2, i2), s2.reflect === true && this.\u03A0h !== t2 && (this.\u03A0k === void 0 && (this.\u03A0k = new Map()), this.\u03A0k.set(t2, s2))) : e2 = false), !this.isUpdatePending && e2 && (this.\u03A0g = this.\u03A0q());
  }
  async \u03A0q() {
    this.isUpdatePending = true;
    try {
      for (await this.\u03A0g; this.\u03A0o; )
        await this.\u03A0o;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.performUpdate();
    return t2 != null && await t2, !this.isUpdatePending;
  }
  performUpdate() {
    var t2;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this.\u03A0i && (this.\u03A0i.forEach((t3, i3) => this[i3] = t3), this.\u03A0i = void 0);
    let i2 = false;
    const s2 = this.L;
    try {
      i2 = this.shouldUpdate(s2), i2 ? (this.willUpdate(s2), (t2 = this.\u03A0U) === null || t2 === void 0 || t2.forEach((t3) => {
        var i3;
        return (i3 = t3.hostUpdate) === null || i3 === void 0 ? void 0 : i3.call(t3);
      }), this.update(s2)) : this.\u03A0$();
    } catch (t3) {
      throw i2 = false, this.\u03A0$(), t3;
    }
    i2 && this.E(s2);
  }
  willUpdate(t2) {
  }
  E(t2) {
    var i2;
    (i2 = this.\u03A0U) === null || i2 === void 0 || i2.forEach((t3) => {
      var i3;
      return (i3 = t3.hostUpdated) === null || i3 === void 0 ? void 0 : i3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  \u03A0$() {
    this.L = new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this.\u03A0g;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this.\u03A0k !== void 0 && (this.\u03A0k.forEach((t3, i2) => this.\u03A0j(i2, this[i2], t3)), this.\u03A0k = void 0), this.\u03A0$();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
a$1.finalized = true, a$1.shadowRootOptions = {mode: "open"}, (e$2 = (s$2 = globalThis).reactiveElementPlatformSupport) === null || e$2 === void 0 || e$2.call(s$2, {ReactiveElement: a$1}), ((h$1 = (r$2 = globalThis).reactiveElementVersions) !== null && h$1 !== void 0 ? h$1 : r$2.reactiveElementVersions = []).push("1.0.0-rc.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var i$2;
var l$2;
var o$3;
var s$3;
var n$3;
var a$2;
((i$2 = (a$2 = globalThis).litElementVersions) !== null && i$2 !== void 0 ? i$2 : a$2.litElementVersions = []).push("3.0.0-rc.1");
var h$2 = class extends a$1 {
  constructor() {
    super(...arguments), this.renderOptions = {host: this}, this.\u03A6t = void 0;
  }
  createRenderRoot() {
    var t2, e2;
    const r2 = super.createRenderRoot();
    return (t2 = (e2 = this.renderOptions).renderBefore) !== null && t2 !== void 0 || (e2.renderBefore = r2.firstChild), r2;
  }
  update(t2) {
    const r2 = this.render();
    super.update(t2), this.\u03A6t = V(r2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t2;
    super.connectedCallback(), (t2 = this.\u03A6t) === null || t2 === void 0 || t2.setConnected(true);
  }
  disconnectedCallback() {
    var t2;
    super.disconnectedCallback(), (t2 = this.\u03A6t) === null || t2 === void 0 || t2.setConnected(false);
  }
  render() {
    return w;
  }
};
h$2.finalized = true, h$2._$litElement$ = true, (o$3 = (l$2 = globalThis).litElementHydrateSupport) === null || o$3 === void 0 || o$3.call(l$2, {LitElement: h$2}), (n$3 = (s$3 = globalThis).litElementPlatformSupport) === null || n$3 === void 0 || n$3.call(s$3, {LitElement: h$2});

// _snowpack/pkg/lit/decorators.js
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n2 = (n3) => (e2) => typeof e2 == "function" ? ((n4, e3) => (window.customElements.define(n4, e3), e3))(n3, e2) : ((n4, e3) => {
  const {kind: t2, elements: i2} = e3;
  return {kind: t2, elements: i2, finisher(e4) {
    window.customElements.define(n4, e4);
  }};
})(n3, e2);

// TextTypography.js
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var TextTypography = class extends h$2 {
  createRenderRoot() {
    return this;
  }
  render() {
    let content = this.innerHTML;
    this.innerHTML = "";
    const t2 = this.getAttribute("type");
    if (t2 === "title") {
      return T`<span style="font-size: 2rem;">${content}</span>`;
    } else if (t2 === "h3") {
      return T`<span style="font-size: 1.2rem;">${content}</span>`;
    }
  }
};
TextTypography = __decorate([
  n2("text-typography")
], TextTypography);

// Notebook.js
var currentNotebook = void 0;
function getCurrentNotebookId() {
  return currentNotebook;
}
function setCurrentNotebookId(id) {
  currentNotebook = id;
}

// _snowpack/pkg/animejs.js
var defaultInstanceSettings = {
  update: null,
  begin: null,
  loopBegin: null,
  changeBegin: null,
  change: null,
  changeComplete: null,
  loopComplete: null,
  complete: null,
  loop: 1,
  direction: "normal",
  autoplay: true,
  timelineOffset: 0
};
var defaultTweenSettings = {
  duration: 1e3,
  delay: 0,
  endDelay: 0,
  easing: "easeOutElastic(1, .5)",
  round: 0
};
var validTransforms = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"];
var cache = {
  CSS: {},
  springs: {}
};
function minMax(val, min, max) {
  return Math.min(Math.max(val, min), max);
}
function stringContains(str, text) {
  return str.indexOf(text) > -1;
}
function applyArguments(func, args) {
  return func.apply(null, args);
}
var is = {
  arr: function(a2) {
    return Array.isArray(a2);
  },
  obj: function(a2) {
    return stringContains(Object.prototype.toString.call(a2), "Object");
  },
  pth: function(a2) {
    return is.obj(a2) && a2.hasOwnProperty("totalLength");
  },
  svg: function(a2) {
    return a2 instanceof SVGElement;
  },
  inp: function(a2) {
    return a2 instanceof HTMLInputElement;
  },
  dom: function(a2) {
    return a2.nodeType || is.svg(a2);
  },
  str: function(a2) {
    return typeof a2 === "string";
  },
  fnc: function(a2) {
    return typeof a2 === "function";
  },
  und: function(a2) {
    return typeof a2 === "undefined";
  },
  nil: function(a2) {
    return is.und(a2) || a2 === null;
  },
  hex: function(a2) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a2);
  },
  rgb: function(a2) {
    return /^rgb/.test(a2);
  },
  hsl: function(a2) {
    return /^hsl/.test(a2);
  },
  col: function(a2) {
    return is.hex(a2) || is.rgb(a2) || is.hsl(a2);
  },
  key: function(a2) {
    return !defaultInstanceSettings.hasOwnProperty(a2) && !defaultTweenSettings.hasOwnProperty(a2) && a2 !== "targets" && a2 !== "keyframes";
  }
};
function parseEasingParameters(string) {
  var match = /\(([^)]+)\)/.exec(string);
  return match ? match[1].split(",").map(function(p2) {
    return parseFloat(p2);
  }) : [];
}
function spring(string, duration) {
  var params = parseEasingParameters(string);
  var mass = minMax(is.und(params[0]) ? 1 : params[0], 0.1, 100);
  var stiffness = minMax(is.und(params[1]) ? 100 : params[1], 0.1, 100);
  var damping = minMax(is.und(params[2]) ? 10 : params[2], 0.1, 100);
  var velocity = minMax(is.und(params[3]) ? 0 : params[3], 0.1, 100);
  var w0 = Math.sqrt(stiffness / mass);
  var zeta = damping / (2 * Math.sqrt(stiffness * mass));
  var wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
  var a2 = 1;
  var b2 = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;
  function solver(t2) {
    var progress = duration ? duration * t2 / 1e3 : t2;
    if (zeta < 1) {
      progress = Math.exp(-progress * zeta * w0) * (a2 * Math.cos(wd * progress) + b2 * Math.sin(wd * progress));
    } else {
      progress = (a2 + b2 * progress) * Math.exp(-progress * w0);
    }
    if (t2 === 0 || t2 === 1) {
      return t2;
    }
    return 1 - progress;
  }
  function getDuration() {
    var cached = cache.springs[string];
    if (cached) {
      return cached;
    }
    var frame = 1 / 6;
    var elapsed = 0;
    var rest = 0;
    while (true) {
      elapsed += frame;
      if (solver(elapsed) === 1) {
        rest++;
        if (rest >= 16) {
          break;
        }
      } else {
        rest = 0;
      }
    }
    var duration2 = elapsed * frame * 1e3;
    cache.springs[string] = duration2;
    return duration2;
  }
  return duration ? solver : getDuration;
}
function steps(steps2) {
  if (steps2 === void 0)
    steps2 = 10;
  return function(t2) {
    return Math.ceil(minMax(t2, 1e-6, 1) * steps2) * (1 / steps2);
  };
}
var bezier = function() {
  var kSplineTableSize = 11;
  var kSampleStepSize = 1 / (kSplineTableSize - 1);
  function A2(aA1, aA2) {
    return 1 - 3 * aA2 + 3 * aA1;
  }
  function B(aA1, aA2) {
    return 3 * aA2 - 6 * aA1;
  }
  function C2(aA1) {
    return 3 * aA1;
  }
  function calcBezier(aT, aA1, aA2) {
    return ((A2(aA1, aA2) * aT + B(aA1, aA2)) * aT + C2(aA1)) * aT;
  }
  function getSlope(aT, aA1, aA2) {
    return 3 * A2(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C2(aA1);
  }
  function binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX, currentT, i2 = 0;
    do {
      currentT = aA + (aB - aA) / 2;
      currentX = calcBezier(currentT, mX1, mX2) - aX;
      if (currentX > 0) {
        aB = currentT;
      } else {
        aA = currentT;
      }
    } while (Math.abs(currentX) > 1e-7 && ++i2 < 10);
    return currentT;
  }
  function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (var i2 = 0; i2 < 4; ++i2) {
      var currentSlope = getSlope(aGuessT, mX1, mX2);
      if (currentSlope === 0) {
        return aGuessT;
      }
      var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }
  function bezier2(mX1, mY1, mX2, mY2) {
    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
      return;
    }
    var sampleValues = new Float32Array(kSplineTableSize);
    if (mX1 !== mY1 || mX2 !== mY2) {
      for (var i2 = 0; i2 < kSplineTableSize; ++i2) {
        sampleValues[i2] = calcBezier(i2 * kSampleStepSize, mX1, mX2);
      }
    }
    function getTForX(aX) {
      var intervalStart = 0;
      var currentSample = 1;
      var lastSample = kSplineTableSize - 1;
      for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize;
      }
      --currentSample;
      var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
      var guessForT = intervalStart + dist * kSampleStepSize;
      var initialSlope = getSlope(guessForT, mX1, mX2);
      if (initialSlope >= 1e-3) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
      } else if (initialSlope === 0) {
        return guessForT;
      } else {
        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
      }
    }
    return function(x) {
      if (mX1 === mY1 && mX2 === mY2) {
        return x;
      }
      if (x === 0 || x === 1) {
        return x;
      }
      return calcBezier(getTForX(x), mY1, mY2);
    };
  }
  return bezier2;
}();
var penner = function() {
  var eases = {linear: function() {
    return function(t2) {
      return t2;
    };
  }};
  var functionEasings = {
    Sine: function() {
      return function(t2) {
        return 1 - Math.cos(t2 * Math.PI / 2);
      };
    },
    Circ: function() {
      return function(t2) {
        return 1 - Math.sqrt(1 - t2 * t2);
      };
    },
    Back: function() {
      return function(t2) {
        return t2 * t2 * (3 * t2 - 2);
      };
    },
    Bounce: function() {
      return function(t2) {
        var pow2, b2 = 4;
        while (t2 < ((pow2 = Math.pow(2, --b2)) - 1) / 11) {
        }
        return 1 / Math.pow(4, 3 - b2) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - t2, 2);
      };
    },
    Elastic: function(amplitude, period) {
      if (amplitude === void 0)
        amplitude = 1;
      if (period === void 0)
        period = 0.5;
      var a2 = minMax(amplitude, 1, 10);
      var p2 = minMax(period, 0.1, 2);
      return function(t2) {
        return t2 === 0 || t2 === 1 ? t2 : -a2 * Math.pow(2, 10 * (t2 - 1)) * Math.sin((t2 - 1 - p2 / (Math.PI * 2) * Math.asin(1 / a2)) * (Math.PI * 2) / p2);
      };
    }
  };
  var baseEasings = ["Quad", "Cubic", "Quart", "Quint", "Expo"];
  baseEasings.forEach(function(name, i2) {
    functionEasings[name] = function() {
      return function(t2) {
        return Math.pow(t2, i2 + 2);
      };
    };
  });
  Object.keys(functionEasings).forEach(function(name) {
    var easeIn = functionEasings[name];
    eases["easeIn" + name] = easeIn;
    eases["easeOut" + name] = function(a2, b2) {
      return function(t2) {
        return 1 - easeIn(a2, b2)(1 - t2);
      };
    };
    eases["easeInOut" + name] = function(a2, b2) {
      return function(t2) {
        return t2 < 0.5 ? easeIn(a2, b2)(t2 * 2) / 2 : 1 - easeIn(a2, b2)(t2 * -2 + 2) / 2;
      };
    };
    eases["easeOutIn" + name] = function(a2, b2) {
      return function(t2) {
        return t2 < 0.5 ? (1 - easeIn(a2, b2)(1 - t2 * 2)) / 2 : (easeIn(a2, b2)(t2 * 2 - 1) + 1) / 2;
      };
    };
  });
  return eases;
}();
function parseEasings(easing, duration) {
  if (is.fnc(easing)) {
    return easing;
  }
  var name = easing.split("(")[0];
  var ease = penner[name];
  var args = parseEasingParameters(easing);
  switch (name) {
    case "spring":
      return spring(easing, duration);
    case "cubicBezier":
      return applyArguments(bezier, args);
    case "steps":
      return applyArguments(steps, args);
    default:
      return applyArguments(ease, args);
  }
}
function selectString(str) {
  try {
    var nodes = document.querySelectorAll(str);
    return nodes;
  } catch (e2) {
    return;
  }
}
function filterArray(arr, callback) {
  var len = arr.length;
  var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
  var result = [];
  for (var i2 = 0; i2 < len; i2++) {
    if (i2 in arr) {
      var val = arr[i2];
      if (callback.call(thisArg, val, i2, arr)) {
        result.push(val);
      }
    }
  }
  return result;
}
function flattenArray(arr) {
  return arr.reduce(function(a2, b2) {
    return a2.concat(is.arr(b2) ? flattenArray(b2) : b2);
  }, []);
}
function toArray(o2) {
  if (is.arr(o2)) {
    return o2;
  }
  if (is.str(o2)) {
    o2 = selectString(o2) || o2;
  }
  if (o2 instanceof NodeList || o2 instanceof HTMLCollection) {
    return [].slice.call(o2);
  }
  return [o2];
}
function arrayContains(arr, val) {
  return arr.some(function(a2) {
    return a2 === val;
  });
}
function cloneObject(o2) {
  var clone = {};
  for (var p2 in o2) {
    clone[p2] = o2[p2];
  }
  return clone;
}
function replaceObjectProps(o1, o2) {
  var o3 = cloneObject(o1);
  for (var p2 in o1) {
    o3[p2] = o2.hasOwnProperty(p2) ? o2[p2] : o1[p2];
  }
  return o3;
}
function mergeObjects(o1, o2) {
  var o3 = cloneObject(o1);
  for (var p2 in o2) {
    o3[p2] = is.und(o1[p2]) ? o2[p2] : o1[p2];
  }
  return o3;
}
function rgbToRgba(rgbValue) {
  var rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
  return rgb ? "rgba(" + rgb[1] + ",1)" : rgbValue;
}
function hexToRgba(hexValue) {
  var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var hex = hexValue.replace(rgx, function(m2, r3, g3, b3) {
    return r3 + r3 + g3 + g3 + b3 + b3;
  });
  var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r2 = parseInt(rgb[1], 16);
  var g2 = parseInt(rgb[2], 16);
  var b2 = parseInt(rgb[3], 16);
  return "rgba(" + r2 + "," + g2 + "," + b2 + ",1)";
}
function hslToRgba(hslValue) {
  var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
  var h2 = parseInt(hsl[1], 10) / 360;
  var s2 = parseInt(hsl[2], 10) / 100;
  var l2 = parseInt(hsl[3], 10) / 100;
  var a2 = hsl[4] || 1;
  function hue2rgb(p3, q2, t2) {
    if (t2 < 0) {
      t2 += 1;
    }
    if (t2 > 1) {
      t2 -= 1;
    }
    if (t2 < 1 / 6) {
      return p3 + (q2 - p3) * 6 * t2;
    }
    if (t2 < 1 / 2) {
      return q2;
    }
    if (t2 < 2 / 3) {
      return p3 + (q2 - p3) * (2 / 3 - t2) * 6;
    }
    return p3;
  }
  var r2, g2, b2;
  if (s2 == 0) {
    r2 = g2 = b2 = l2;
  } else {
    var q = l2 < 0.5 ? l2 * (1 + s2) : l2 + s2 - l2 * s2;
    var p2 = 2 * l2 - q;
    r2 = hue2rgb(p2, q, h2 + 1 / 3);
    g2 = hue2rgb(p2, q, h2);
    b2 = hue2rgb(p2, q, h2 - 1 / 3);
  }
  return "rgba(" + r2 * 255 + "," + g2 * 255 + "," + b2 * 255 + "," + a2 + ")";
}
function colorToRgb(val) {
  if (is.rgb(val)) {
    return rgbToRgba(val);
  }
  if (is.hex(val)) {
    return hexToRgba(val);
  }
  if (is.hsl(val)) {
    return hslToRgba(val);
  }
}
function getUnit(val) {
  var split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
  if (split) {
    return split[1];
  }
}
function getTransformUnit(propName) {
  if (stringContains(propName, "translate") || propName === "perspective") {
    return "px";
  }
  if (stringContains(propName, "rotate") || stringContains(propName, "skew")) {
    return "deg";
  }
}
function getFunctionValue(val, animatable) {
  if (!is.fnc(val)) {
    return val;
  }
  return val(animatable.target, animatable.id, animatable.total);
}
function getAttribute(el, prop) {
  return el.getAttribute(prop);
}
function convertPxToUnit(el, value, unit) {
  var valueUnit = getUnit(value);
  if (arrayContains([unit, "deg", "rad", "turn"], valueUnit)) {
    return value;
  }
  var cached = cache.CSS[value + unit];
  if (!is.und(cached)) {
    return cached;
  }
  var baseline = 100;
  var tempEl = document.createElement(el.tagName);
  var parentEl = el.parentNode && el.parentNode !== document ? el.parentNode : document.body;
  parentEl.appendChild(tempEl);
  tempEl.style.position = "absolute";
  tempEl.style.width = baseline + unit;
  var factor = baseline / tempEl.offsetWidth;
  parentEl.removeChild(tempEl);
  var convertedUnit = factor * parseFloat(value);
  cache.CSS[value + unit] = convertedUnit;
  return convertedUnit;
}
function getCSSValue(el, prop, unit) {
  if (prop in el.style) {
    var uppercasePropName = prop.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    var value = el.style[prop] || getComputedStyle(el).getPropertyValue(uppercasePropName) || "0";
    return unit ? convertPxToUnit(el, value, unit) : value;
  }
}
function getAnimationType(el, prop) {
  if (is.dom(el) && !is.inp(el) && (!is.nil(getAttribute(el, prop)) || is.svg(el) && el[prop])) {
    return "attribute";
  }
  if (is.dom(el) && arrayContains(validTransforms, prop)) {
    return "transform";
  }
  if (is.dom(el) && (prop !== "transform" && getCSSValue(el, prop))) {
    return "css";
  }
  if (el[prop] != null) {
    return "object";
  }
}
function getElementTransforms(el) {
  if (!is.dom(el)) {
    return;
  }
  var str = el.style.transform || "";
  var reg = /(\w+)\(([^)]*)\)/g;
  var transforms = new Map();
  var m2;
  while (m2 = reg.exec(str)) {
    transforms.set(m2[1], m2[2]);
  }
  return transforms;
}
function getTransformValue(el, propName, animatable, unit) {
  var defaultVal = stringContains(propName, "scale") ? 1 : 0 + getTransformUnit(propName);
  var value = getElementTransforms(el).get(propName) || defaultVal;
  if (animatable) {
    animatable.transforms.list.set(propName, value);
    animatable.transforms["last"] = propName;
  }
  return unit ? convertPxToUnit(el, value, unit) : value;
}
function getOriginalTargetValue(target, propName, unit, animatable) {
  switch (getAnimationType(target, propName)) {
    case "transform":
      return getTransformValue(target, propName, animatable, unit);
    case "css":
      return getCSSValue(target, propName, unit);
    case "attribute":
      return getAttribute(target, propName);
    default:
      return target[propName] || 0;
  }
}
function getRelativeValue(to, from) {
  var operator = /^(\*=|\+=|-=)/.exec(to);
  if (!operator) {
    return to;
  }
  var u2 = getUnit(to) || 0;
  var x = parseFloat(from);
  var y2 = parseFloat(to.replace(operator[0], ""));
  switch (operator[0][0]) {
    case "+":
      return x + y2 + u2;
    case "-":
      return x - y2 + u2;
    case "*":
      return x * y2 + u2;
  }
}
function validateValue(val, unit) {
  if (is.col(val)) {
    return colorToRgb(val);
  }
  if (/\s/g.test(val)) {
    return val;
  }
  var originalUnit = getUnit(val);
  var unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
  if (unit) {
    return unitLess + unit;
  }
  return unitLess;
}
function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
function getCircleLength(el) {
  return Math.PI * 2 * getAttribute(el, "r");
}
function getRectLength(el) {
  return getAttribute(el, "width") * 2 + getAttribute(el, "height") * 2;
}
function getLineLength(el) {
  return getDistance({x: getAttribute(el, "x1"), y: getAttribute(el, "y1")}, {x: getAttribute(el, "x2"), y: getAttribute(el, "y2")});
}
function getPolylineLength(el) {
  var points = el.points;
  var totalLength = 0;
  var previousPos;
  for (var i2 = 0; i2 < points.numberOfItems; i2++) {
    var currentPos = points.getItem(i2);
    if (i2 > 0) {
      totalLength += getDistance(previousPos, currentPos);
    }
    previousPos = currentPos;
  }
  return totalLength;
}
function getPolygonLength(el) {
  var points = el.points;
  return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
}
function getTotalLength(el) {
  if (el.getTotalLength) {
    return el.getTotalLength();
  }
  switch (el.tagName.toLowerCase()) {
    case "circle":
      return getCircleLength(el);
    case "rect":
      return getRectLength(el);
    case "line":
      return getLineLength(el);
    case "polyline":
      return getPolylineLength(el);
    case "polygon":
      return getPolygonLength(el);
  }
}
function setDashoffset(el) {
  var pathLength = getTotalLength(el);
  el.setAttribute("stroke-dasharray", pathLength);
  return pathLength;
}
function getParentSvgEl(el) {
  var parentEl = el.parentNode;
  while (is.svg(parentEl)) {
    if (!is.svg(parentEl.parentNode)) {
      break;
    }
    parentEl = parentEl.parentNode;
  }
  return parentEl;
}
function getParentSvg(pathEl, svgData) {
  var svg = svgData || {};
  var parentSvgEl = svg.el || getParentSvgEl(pathEl);
  var rect = parentSvgEl.getBoundingClientRect();
  var viewBoxAttr = getAttribute(parentSvgEl, "viewBox");
  var width = rect.width;
  var height = rect.height;
  var viewBox = svg.viewBox || (viewBoxAttr ? viewBoxAttr.split(" ") : [0, 0, width, height]);
  return {
    el: parentSvgEl,
    viewBox,
    x: viewBox[0] / 1,
    y: viewBox[1] / 1,
    w: width,
    h: height,
    vW: viewBox[2],
    vH: viewBox[3]
  };
}
function getPath(path, percent) {
  var pathEl = is.str(path) ? selectString(path)[0] : path;
  var p2 = percent || 100;
  return function(property) {
    return {
      property,
      el: pathEl,
      svg: getParentSvg(pathEl),
      totalLength: getTotalLength(pathEl) * (p2 / 100)
    };
  };
}
function getPathProgress(path, progress, isPathTargetInsideSVG) {
  function point(offset) {
    if (offset === void 0)
      offset = 0;
    var l2 = progress + offset >= 1 ? progress + offset : 0;
    return path.el.getPointAtLength(l2);
  }
  var svg = getParentSvg(path.el, path.svg);
  var p2 = point();
  var p0 = point(-1);
  var p1 = point(1);
  var scaleX = isPathTargetInsideSVG ? 1 : svg.w / svg.vW;
  var scaleY = isPathTargetInsideSVG ? 1 : svg.h / svg.vH;
  switch (path.property) {
    case "x":
      return (p2.x - svg.x) * scaleX;
    case "y":
      return (p2.y - svg.y) * scaleY;
    case "angle":
      return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
  }
}
function decomposeValue(val, unit) {
  var rgx = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;
  var value = validateValue(is.pth(val) ? val.totalLength : val, unit) + "";
  return {
    original: value,
    numbers: value.match(rgx) ? value.match(rgx).map(Number) : [0],
    strings: is.str(val) || unit ? value.split(rgx) : []
  };
}
function parseTargets(targets) {
  var targetsArray = targets ? flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets)) : [];
  return filterArray(targetsArray, function(item, pos, self2) {
    return self2.indexOf(item) === pos;
  });
}
function getAnimatables(targets) {
  var parsed = parseTargets(targets);
  return parsed.map(function(t2, i2) {
    return {target: t2, id: i2, total: parsed.length, transforms: {list: getElementTransforms(t2)}};
  });
}
function normalizePropertyTweens(prop, tweenSettings) {
  var settings = cloneObject(tweenSettings);
  if (/^spring/.test(settings.easing)) {
    settings.duration = spring(settings.easing);
  }
  if (is.arr(prop)) {
    var l2 = prop.length;
    var isFromTo = l2 === 2 && !is.obj(prop[0]);
    if (!isFromTo) {
      if (!is.fnc(tweenSettings.duration)) {
        settings.duration = tweenSettings.duration / l2;
      }
    } else {
      prop = {value: prop};
    }
  }
  var propArray = is.arr(prop) ? prop : [prop];
  return propArray.map(function(v2, i2) {
    var obj = is.obj(v2) && !is.pth(v2) ? v2 : {value: v2};
    if (is.und(obj.delay)) {
      obj.delay = !i2 ? tweenSettings.delay : 0;
    }
    if (is.und(obj.endDelay)) {
      obj.endDelay = i2 === propArray.length - 1 ? tweenSettings.endDelay : 0;
    }
    return obj;
  }).map(function(k2) {
    return mergeObjects(k2, settings);
  });
}
function flattenKeyframes(keyframes) {
  var propertyNames = filterArray(flattenArray(keyframes.map(function(key) {
    return Object.keys(key);
  })), function(p2) {
    return is.key(p2);
  }).reduce(function(a2, b2) {
    if (a2.indexOf(b2) < 0) {
      a2.push(b2);
    }
    return a2;
  }, []);
  var properties = {};
  var loop = function(i3) {
    var propName = propertyNames[i3];
    properties[propName] = keyframes.map(function(key) {
      var newKey = {};
      for (var p2 in key) {
        if (is.key(p2)) {
          if (p2 == propName) {
            newKey.value = key[p2];
          }
        } else {
          newKey[p2] = key[p2];
        }
      }
      return newKey;
    });
  };
  for (var i2 = 0; i2 < propertyNames.length; i2++)
    loop(i2);
  return properties;
}
function getProperties(tweenSettings, params) {
  var properties = [];
  var keyframes = params.keyframes;
  if (keyframes) {
    params = mergeObjects(flattenKeyframes(keyframes), params);
  }
  for (var p2 in params) {
    if (is.key(p2)) {
      properties.push({
        name: p2,
        tweens: normalizePropertyTweens(params[p2], tweenSettings)
      });
    }
  }
  return properties;
}
function normalizeTweenValues(tween, animatable) {
  var t2 = {};
  for (var p2 in tween) {
    var value = getFunctionValue(tween[p2], animatable);
    if (is.arr(value)) {
      value = value.map(function(v2) {
        return getFunctionValue(v2, animatable);
      });
      if (value.length === 1) {
        value = value[0];
      }
    }
    t2[p2] = value;
  }
  t2.duration = parseFloat(t2.duration);
  t2.delay = parseFloat(t2.delay);
  return t2;
}
function normalizeTweens(prop, animatable) {
  var previousTween;
  return prop.tweens.map(function(t2) {
    var tween = normalizeTweenValues(t2, animatable);
    var tweenValue = tween.value;
    var to = is.arr(tweenValue) ? tweenValue[1] : tweenValue;
    var toUnit = getUnit(to);
    var originalValue = getOriginalTargetValue(animatable.target, prop.name, toUnit, animatable);
    var previousValue = previousTween ? previousTween.to.original : originalValue;
    var from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
    var fromUnit = getUnit(from) || getUnit(originalValue);
    var unit = toUnit || fromUnit;
    if (is.und(to)) {
      to = previousValue;
    }
    tween.from = decomposeValue(from, unit);
    tween.to = decomposeValue(getRelativeValue(to, from), unit);
    tween.start = previousTween ? previousTween.end : 0;
    tween.end = tween.start + tween.delay + tween.duration + tween.endDelay;
    tween.easing = parseEasings(tween.easing, tween.duration);
    tween.isPath = is.pth(tweenValue);
    tween.isPathTargetInsideSVG = tween.isPath && is.svg(animatable.target);
    tween.isColor = is.col(tween.from.original);
    if (tween.isColor) {
      tween.round = 1;
    }
    previousTween = tween;
    return tween;
  });
}
var setProgressValue = {
  css: function(t2, p2, v2) {
    return t2.style[p2] = v2;
  },
  attribute: function(t2, p2, v2) {
    return t2.setAttribute(p2, v2);
  },
  object: function(t2, p2, v2) {
    return t2[p2] = v2;
  },
  transform: function(t2, p2, v2, transforms, manual) {
    transforms.list.set(p2, v2);
    if (p2 === transforms.last || manual) {
      var str = "";
      transforms.list.forEach(function(value, prop) {
        str += prop + "(" + value + ") ";
      });
      t2.style.transform = str;
    }
  }
};
function setTargetsValue(targets, properties) {
  var animatables = getAnimatables(targets);
  animatables.forEach(function(animatable) {
    for (var property in properties) {
      var value = getFunctionValue(properties[property], animatable);
      var target = animatable.target;
      var valueUnit = getUnit(value);
      var originalValue = getOriginalTargetValue(target, property, valueUnit, animatable);
      var unit = valueUnit || getUnit(originalValue);
      var to = getRelativeValue(validateValue(value, unit), originalValue);
      var animType = getAnimationType(target, property);
      setProgressValue[animType](target, property, to, animatable.transforms, true);
    }
  });
}
function createAnimation(animatable, prop) {
  var animType = getAnimationType(animatable.target, prop.name);
  if (animType) {
    var tweens = normalizeTweens(prop, animatable);
    var lastTween = tweens[tweens.length - 1];
    return {
      type: animType,
      property: prop.name,
      animatable,
      tweens,
      duration: lastTween.end,
      delay: tweens[0].delay,
      endDelay: lastTween.endDelay
    };
  }
}
function getAnimations(animatables, properties) {
  return filterArray(flattenArray(animatables.map(function(animatable) {
    return properties.map(function(prop) {
      return createAnimation(animatable, prop);
    });
  })), function(a2) {
    return !is.und(a2);
  });
}
function getInstanceTimings(animations, tweenSettings) {
  var animLength = animations.length;
  var getTlOffset = function(anim) {
    return anim.timelineOffset ? anim.timelineOffset : 0;
  };
  var timings = {};
  timings.duration = animLength ? Math.max.apply(Math, animations.map(function(anim) {
    return getTlOffset(anim) + anim.duration;
  })) : tweenSettings.duration;
  timings.delay = animLength ? Math.min.apply(Math, animations.map(function(anim) {
    return getTlOffset(anim) + anim.delay;
  })) : tweenSettings.delay;
  timings.endDelay = animLength ? timings.duration - Math.max.apply(Math, animations.map(function(anim) {
    return getTlOffset(anim) + anim.duration - anim.endDelay;
  })) : tweenSettings.endDelay;
  return timings;
}
var instanceID = 0;
function createNewInstance(params) {
  var instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
  var tweenSettings = replaceObjectProps(defaultTweenSettings, params);
  var properties = getProperties(tweenSettings, params);
  var animatables = getAnimatables(params.targets);
  var animations = getAnimations(animatables, properties);
  var timings = getInstanceTimings(animations, tweenSettings);
  var id = instanceID;
  instanceID++;
  return mergeObjects(instanceSettings, {
    id,
    children: [],
    animatables,
    animations,
    duration: timings.duration,
    delay: timings.delay,
    endDelay: timings.endDelay
  });
}
var activeInstances = [];
var engine = function() {
  var raf;
  function play() {
    if (!raf && (!isDocumentHidden() || !anime.suspendWhenDocumentHidden) && activeInstances.length > 0) {
      raf = requestAnimationFrame(step);
    }
  }
  function step(t2) {
    var activeInstancesLength = activeInstances.length;
    var i2 = 0;
    while (i2 < activeInstancesLength) {
      var activeInstance = activeInstances[i2];
      if (!activeInstance.paused) {
        activeInstance.tick(t2);
        i2++;
      } else {
        activeInstances.splice(i2, 1);
        activeInstancesLength--;
      }
    }
    raf = i2 > 0 ? requestAnimationFrame(step) : void 0;
  }
  function handleVisibilityChange() {
    if (!anime.suspendWhenDocumentHidden) {
      return;
    }
    if (isDocumentHidden()) {
      raf = cancelAnimationFrame(raf);
    } else {
      activeInstances.forEach(function(instance) {
        return instance._onDocumentVisibility();
      });
      engine();
    }
  }
  if (typeof document !== "undefined") {
    document.addEventListener("visibilitychange", handleVisibilityChange);
  }
  return play;
}();
function isDocumentHidden() {
  return !!document && document.hidden;
}
function anime(params) {
  if (params === void 0)
    params = {};
  var startTime = 0, lastTime = 0, now = 0;
  var children, childrenLength = 0;
  var resolve = null;
  function makePromise(instance2) {
    var promise2 = window.Promise && new Promise(function(_resolve) {
      return resolve = _resolve;
    });
    instance2.finished = promise2;
    return promise2;
  }
  var instance = createNewInstance(params);
  var promise = makePromise(instance);
  function toggleInstanceDirection() {
    var direction = instance.direction;
    if (direction !== "alternate") {
      instance.direction = direction !== "normal" ? "normal" : "reverse";
    }
    instance.reversed = !instance.reversed;
    children.forEach(function(child) {
      return child.reversed = instance.reversed;
    });
  }
  function adjustTime(time) {
    return instance.reversed ? instance.duration - time : time;
  }
  function resetTime() {
    startTime = 0;
    lastTime = adjustTime(instance.currentTime) * (1 / anime.speed);
  }
  function seekChild(time, child) {
    if (child) {
      child.seek(time - child.timelineOffset);
    }
  }
  function syncInstanceChildren(time) {
    if (!instance.reversePlayback) {
      for (var i2 = 0; i2 < childrenLength; i2++) {
        seekChild(time, children[i2]);
      }
    } else {
      for (var i$12 = childrenLength; i$12--; ) {
        seekChild(time, children[i$12]);
      }
    }
  }
  function setAnimationsProgress(insTime) {
    var i2 = 0;
    var animations = instance.animations;
    var animationsLength = animations.length;
    while (i2 < animationsLength) {
      var anim = animations[i2];
      var animatable = anim.animatable;
      var tweens = anim.tweens;
      var tweenLength = tweens.length - 1;
      var tween = tweens[tweenLength];
      if (tweenLength) {
        tween = filterArray(tweens, function(t2) {
          return insTime < t2.end;
        })[0] || tween;
      }
      var elapsed = minMax(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
      var eased = isNaN(elapsed) ? 1 : tween.easing(elapsed);
      var strings = tween.to.strings;
      var round = tween.round;
      var numbers = [];
      var toNumbersLength = tween.to.numbers.length;
      var progress = void 0;
      for (var n3 = 0; n3 < toNumbersLength; n3++) {
        var value = void 0;
        var toNumber = tween.to.numbers[n3];
        var fromNumber = tween.from.numbers[n3] || 0;
        if (!tween.isPath) {
          value = fromNumber + eased * (toNumber - fromNumber);
        } else {
          value = getPathProgress(tween.value, eased * toNumber, tween.isPathTargetInsideSVG);
        }
        if (round) {
          if (!(tween.isColor && n3 > 2)) {
            value = Math.round(value * round) / round;
          }
        }
        numbers.push(value);
      }
      var stringsLength = strings.length;
      if (!stringsLength) {
        progress = numbers[0];
      } else {
        progress = strings[0];
        for (var s2 = 0; s2 < stringsLength; s2++) {
          var a2 = strings[s2];
          var b2 = strings[s2 + 1];
          var n$12 = numbers[s2];
          if (!isNaN(n$12)) {
            if (!b2) {
              progress += n$12 + " ";
            } else {
              progress += n$12 + b2;
            }
          }
        }
      }
      setProgressValue[anim.type](animatable.target, anim.property, progress, animatable.transforms);
      anim.currentValue = progress;
      i2++;
    }
  }
  function setCallback(cb) {
    if (instance[cb] && !instance.passThrough) {
      instance[cb](instance);
    }
  }
  function countIteration() {
    if (instance.remaining && instance.remaining !== true) {
      instance.remaining--;
    }
  }
  function setInstanceProgress(engineTime) {
    var insDuration = instance.duration;
    var insDelay = instance.delay;
    var insEndDelay = insDuration - instance.endDelay;
    var insTime = adjustTime(engineTime);
    instance.progress = minMax(insTime / insDuration * 100, 0, 100);
    instance.reversePlayback = insTime < instance.currentTime;
    if (children) {
      syncInstanceChildren(insTime);
    }
    if (!instance.began && instance.currentTime > 0) {
      instance.began = true;
      setCallback("begin");
    }
    if (!instance.loopBegan && instance.currentTime > 0) {
      instance.loopBegan = true;
      setCallback("loopBegin");
    }
    if (insTime <= insDelay && instance.currentTime !== 0) {
      setAnimationsProgress(0);
    }
    if (insTime >= insEndDelay && instance.currentTime !== insDuration || !insDuration) {
      setAnimationsProgress(insDuration);
    }
    if (insTime > insDelay && insTime < insEndDelay) {
      if (!instance.changeBegan) {
        instance.changeBegan = true;
        instance.changeCompleted = false;
        setCallback("changeBegin");
      }
      setCallback("change");
      setAnimationsProgress(insTime);
    } else {
      if (instance.changeBegan) {
        instance.changeCompleted = true;
        instance.changeBegan = false;
        setCallback("changeComplete");
      }
    }
    instance.currentTime = minMax(insTime, 0, insDuration);
    if (instance.began) {
      setCallback("update");
    }
    if (engineTime >= insDuration) {
      lastTime = 0;
      countIteration();
      if (!instance.remaining) {
        instance.paused = true;
        if (!instance.completed) {
          instance.completed = true;
          setCallback("loopComplete");
          setCallback("complete");
          if (!instance.passThrough && "Promise" in window) {
            resolve();
            promise = makePromise(instance);
          }
        }
      } else {
        startTime = now;
        setCallback("loopComplete");
        instance.loopBegan = false;
        if (instance.direction === "alternate") {
          toggleInstanceDirection();
        }
      }
    }
  }
  instance.reset = function() {
    var direction = instance.direction;
    instance.passThrough = false;
    instance.currentTime = 0;
    instance.progress = 0;
    instance.paused = true;
    instance.began = false;
    instance.loopBegan = false;
    instance.changeBegan = false;
    instance.completed = false;
    instance.changeCompleted = false;
    instance.reversePlayback = false;
    instance.reversed = direction === "reverse";
    instance.remaining = instance.loop;
    children = instance.children;
    childrenLength = children.length;
    for (var i2 = childrenLength; i2--; ) {
      instance.children[i2].reset();
    }
    if (instance.reversed && instance.loop !== true || direction === "alternate" && instance.loop === 1) {
      instance.remaining++;
    }
    setAnimationsProgress(instance.reversed ? instance.duration : 0);
  };
  instance._onDocumentVisibility = resetTime;
  instance.set = function(targets, properties) {
    setTargetsValue(targets, properties);
    return instance;
  };
  instance.tick = function(t2) {
    now = t2;
    if (!startTime) {
      startTime = now;
    }
    setInstanceProgress((now + (lastTime - startTime)) * anime.speed);
  };
  instance.seek = function(time) {
    setInstanceProgress(adjustTime(time));
  };
  instance.pause = function() {
    instance.paused = true;
    resetTime();
  };
  instance.play = function() {
    if (!instance.paused) {
      return;
    }
    if (instance.completed) {
      instance.reset();
    }
    instance.paused = false;
    activeInstances.push(instance);
    resetTime();
    engine();
  };
  instance.reverse = function() {
    toggleInstanceDirection();
    instance.completed = instance.reversed ? false : true;
    resetTime();
  };
  instance.restart = function() {
    instance.reset();
    instance.play();
  };
  instance.remove = function(targets) {
    var targetsArray = parseTargets(targets);
    removeTargetsFromInstance(targetsArray, instance);
  };
  instance.reset();
  if (instance.autoplay) {
    instance.play();
  }
  return instance;
}
function removeTargetsFromAnimations(targetsArray, animations) {
  for (var a2 = animations.length; a2--; ) {
    if (arrayContains(targetsArray, animations[a2].animatable.target)) {
      animations.splice(a2, 1);
    }
  }
}
function removeTargetsFromInstance(targetsArray, instance) {
  var animations = instance.animations;
  var children = instance.children;
  removeTargetsFromAnimations(targetsArray, animations);
  for (var c2 = children.length; c2--; ) {
    var child = children[c2];
    var childAnimations = child.animations;
    removeTargetsFromAnimations(targetsArray, childAnimations);
    if (!childAnimations.length && !child.children.length) {
      children.splice(c2, 1);
    }
  }
  if (!animations.length && !children.length) {
    instance.pause();
  }
}
function removeTargetsFromActiveInstances(targets) {
  var targetsArray = parseTargets(targets);
  for (var i2 = activeInstances.length; i2--; ) {
    var instance = activeInstances[i2];
    removeTargetsFromInstance(targetsArray, instance);
  }
}
function stagger(val, params) {
  if (params === void 0)
    params = {};
  var direction = params.direction || "normal";
  var easing = params.easing ? parseEasings(params.easing) : null;
  var grid = params.grid;
  var axis = params.axis;
  var fromIndex = params.from || 0;
  var fromFirst = fromIndex === "first";
  var fromCenter = fromIndex === "center";
  var fromLast = fromIndex === "last";
  var isRange = is.arr(val);
  var val1 = isRange ? parseFloat(val[0]) : parseFloat(val);
  var val2 = isRange ? parseFloat(val[1]) : 0;
  var unit = getUnit(isRange ? val[1] : val) || 0;
  var start = params.start || 0 + (isRange ? val1 : 0);
  var values = [];
  var maxValue = 0;
  return function(el, i2, t2) {
    if (fromFirst) {
      fromIndex = 0;
    }
    if (fromCenter) {
      fromIndex = (t2 - 1) / 2;
    }
    if (fromLast) {
      fromIndex = t2 - 1;
    }
    if (!values.length) {
      for (var index = 0; index < t2; index++) {
        if (!grid) {
          values.push(Math.abs(fromIndex - index));
        } else {
          var fromX = !fromCenter ? fromIndex % grid[0] : (grid[0] - 1) / 2;
          var fromY = !fromCenter ? Math.floor(fromIndex / grid[0]) : (grid[1] - 1) / 2;
          var toX = index % grid[0];
          var toY = Math.floor(index / grid[0]);
          var distanceX = fromX - toX;
          var distanceY = fromY - toY;
          var value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          if (axis === "x") {
            value = -distanceX;
          }
          if (axis === "y") {
            value = -distanceY;
          }
          values.push(value);
        }
        maxValue = Math.max.apply(Math, values);
      }
      if (easing) {
        values = values.map(function(val3) {
          return easing(val3 / maxValue) * maxValue;
        });
      }
      if (direction === "reverse") {
        values = values.map(function(val3) {
          return axis ? val3 < 0 ? val3 * -1 : -val3 : Math.abs(maxValue - val3);
        });
      }
    }
    var spacing = isRange ? (val2 - val1) / maxValue : val1;
    return start + spacing * (Math.round(values[i2] * 100) / 100) + unit;
  };
}
function timeline(params) {
  if (params === void 0)
    params = {};
  var tl = anime(params);
  tl.duration = 0;
  tl.add = function(instanceParams, timelineOffset) {
    var tlIndex = activeInstances.indexOf(tl);
    var children = tl.children;
    if (tlIndex > -1) {
      activeInstances.splice(tlIndex, 1);
    }
    function passThrough(ins2) {
      ins2.passThrough = true;
    }
    for (var i2 = 0; i2 < children.length; i2++) {
      passThrough(children[i2]);
    }
    var insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params));
    insParams.targets = insParams.targets || params.targets;
    var tlDuration = tl.duration;
    insParams.autoplay = false;
    insParams.direction = tl.direction;
    insParams.timelineOffset = is.und(timelineOffset) ? tlDuration : getRelativeValue(timelineOffset, tlDuration);
    passThrough(tl);
    tl.seek(insParams.timelineOffset);
    var ins = anime(insParams);
    passThrough(ins);
    children.push(ins);
    var timings = getInstanceTimings(children, params);
    tl.delay = timings.delay;
    tl.endDelay = timings.endDelay;
    tl.duration = timings.duration;
    tl.seek(0);
    tl.reset();
    if (tl.autoplay) {
      tl.play();
    }
    return tl;
  };
  return tl;
}
anime.version = "3.2.1";
anime.speed = 1;
anime.suspendWhenDocumentHidden = true;
anime.running = activeInstances;
anime.remove = removeTargetsFromActiveInstances;
anime.get = getOriginalTargetValue;
anime.set = setTargetsValue;
anime.convertPx = convertPxToUnit;
anime.path = getPath;
anime.setDashoffset = setDashoffset;
anime.stagger = stagger;
anime.timeline = timeline;
anime.easing = parseEasings;
anime.penner = penner;
anime.random = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var animejs_default = anime;

// LoadingScreen.js
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __decorate2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc2(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp2(target, key, result);
  return result;
};
var LoadingScreen = class extends h$2 {
  static get styles() {
    return r$1`
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
      let result = await fetch(`http://127.0.0.1:8080/notebook/start`).then((_2) => _2.json());
      console.log(result);
      setCurrentNotebookId(result.id);
      const intervalHandle = window.setInterval(async () => {
        try {
          let currentId = getCurrentNotebookId();
          if (!currentId) {
            return;
          }
          let result2 = await fetch(`http://127.0.0.1:8080/notebook/${currentId}/ready`).then((_2) => _2.json());
          if (result2.ready) {
            window.clearInterval(intervalHandle);
            animejs_default.timeline({
              easing: "easeOutExpo",
              duration: 1e3
            }).add({
              targets: this,
              opacity: 0
            }).add({
              targets: document.querySelector(".layout"),
              opacity: 1,
              changeComplete: () => {
                this.remove();
              }
            });
            return;
          }
        } catch (e2) {
          console.log(e2);
        }
      }, 1e3);
    })();
  }
  render() {
    return T` <div><div class="loader" /></div> `;
  }
};
LoadingScreen = __decorate2([
  n2("loading-screen")
], LoadingScreen);

// util.js
function sleep(t2) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve();
    }, t2);
  });
}
function defined(t2) {
  if (t2 === null || t2 === void 0) {
    throw Error("value was not defined");
  }
  return t2;
}

// _snowpack/pkg/showdown.js
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function createCommonjsModule(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire(path, base === void 0 || base === null ? module.path : base);
    }
  }, fn(module, module.exports), module.exports;
}
function commonjsRequire() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var showdown = createCommonjsModule(function(module) {
  (function() {
    function getDefaultOpts(simple) {
      var defaultOptions = {
        omitExtraWLInCodeBlocks: {
          defaultValue: false,
          describe: "Omit the default extra whiteline added to code blocks",
          type: "boolean"
        },
        noHeaderId: {
          defaultValue: false,
          describe: "Turn on/off generated header id",
          type: "boolean"
        },
        prefixHeaderId: {
          defaultValue: false,
          describe: "Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section-' prefix",
          type: "string"
        },
        rawPrefixHeaderId: {
          defaultValue: false,
          describe: 'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)',
          type: "boolean"
        },
        ghCompatibleHeaderId: {
          defaultValue: false,
          describe: "Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)",
          type: "boolean"
        },
        rawHeaderId: {
          defaultValue: false,
          describe: `Remove only spaces, ' and " from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids`,
          type: "boolean"
        },
        headerLevelStart: {
          defaultValue: false,
          describe: "The header blocks level start",
          type: "integer"
        },
        parseImgDimensions: {
          defaultValue: false,
          describe: "Turn on/off image dimension parsing",
          type: "boolean"
        },
        simplifiedAutoLink: {
          defaultValue: false,
          describe: "Turn on/off GFM autolink style",
          type: "boolean"
        },
        excludeTrailingPunctuationFromURLs: {
          defaultValue: false,
          describe: "Excludes trailing punctuation from links generated with autoLinking",
          type: "boolean"
        },
        literalMidWordUnderscores: {
          defaultValue: false,
          describe: "Parse midword underscores as literal underscores",
          type: "boolean"
        },
        literalMidWordAsterisks: {
          defaultValue: false,
          describe: "Parse midword asterisks as literal asterisks",
          type: "boolean"
        },
        strikethrough: {
          defaultValue: false,
          describe: "Turn on/off strikethrough support",
          type: "boolean"
        },
        tables: {
          defaultValue: false,
          describe: "Turn on/off tables support",
          type: "boolean"
        },
        tablesHeaderId: {
          defaultValue: false,
          describe: "Add an id to table headers",
          type: "boolean"
        },
        ghCodeBlocks: {
          defaultValue: true,
          describe: "Turn on/off GFM fenced code blocks support",
          type: "boolean"
        },
        tasklists: {
          defaultValue: false,
          describe: "Turn on/off GFM tasklist support",
          type: "boolean"
        },
        smoothLivePreview: {
          defaultValue: false,
          describe: "Prevents weird effects in live previews due to incomplete input",
          type: "boolean"
        },
        smartIndentationFix: {
          defaultValue: false,
          description: "Tries to smartly fix indentation in es6 strings",
          type: "boolean"
        },
        disableForced4SpacesIndentedSublists: {
          defaultValue: false,
          description: "Disables the requirement of indenting nested sublists by 4 spaces",
          type: "boolean"
        },
        simpleLineBreaks: {
          defaultValue: false,
          description: "Parses simple line breaks as <br> (GFM Style)",
          type: "boolean"
        },
        requireSpaceBeforeHeadingText: {
          defaultValue: false,
          description: "Makes adding a space between `#` and the header text mandatory (GFM Style)",
          type: "boolean"
        },
        ghMentions: {
          defaultValue: false,
          description: "Enables github @mentions",
          type: "boolean"
        },
        ghMentionsLink: {
          defaultValue: "https://github.com/{u}",
          description: "Changes the link generated by @mentions. Only applies if ghMentions option is enabled.",
          type: "string"
        },
        encodeEmails: {
          defaultValue: true,
          description: "Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities",
          type: "boolean"
        },
        openLinksInNewWindow: {
          defaultValue: false,
          description: "Open all links in new windows",
          type: "boolean"
        },
        backslashEscapesHTMLTags: {
          defaultValue: false,
          description: "Support for HTML Tag escaping. ex: <div>foo</div>",
          type: "boolean"
        },
        emoji: {
          defaultValue: false,
          description: "Enable emoji support. Ex: `this is a :smile: emoji`",
          type: "boolean"
        },
        underline: {
          defaultValue: false,
          description: "Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`",
          type: "boolean"
        },
        completeHTMLDocument: {
          defaultValue: false,
          description: "Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags",
          type: "boolean"
        },
        metadata: {
          defaultValue: false,
          description: "Enable support for document metadata (defined at the top of the document between `\xAB\xAB\xAB` and `\xBB\xBB\xBB` or between `---` and `---`).",
          type: "boolean"
        },
        splitAdjacentBlockquotes: {
          defaultValue: false,
          description: "Split adjacent blockquote blocks",
          type: "boolean"
        }
      };
      if (simple === false) {
        return JSON.parse(JSON.stringify(defaultOptions));
      }
      var ret = {};
      for (var opt in defaultOptions) {
        if (defaultOptions.hasOwnProperty(opt)) {
          ret[opt] = defaultOptions[opt].defaultValue;
        }
      }
      return ret;
    }
    function allOptionsOn() {
      var options = getDefaultOpts(true), ret = {};
      for (var opt in options) {
        if (options.hasOwnProperty(opt)) {
          ret[opt] = true;
        }
      }
      return ret;
    }
    var showdown2 = {}, parsers = {}, extensions = {}, globalOptions = getDefaultOpts(true), setFlavor = "vanilla", flavor = {
      github: {
        omitExtraWLInCodeBlocks: true,
        simplifiedAutoLink: true,
        excludeTrailingPunctuationFromURLs: true,
        literalMidWordUnderscores: true,
        strikethrough: true,
        tables: true,
        tablesHeaderId: true,
        ghCodeBlocks: true,
        tasklists: true,
        disableForced4SpacesIndentedSublists: true,
        simpleLineBreaks: true,
        requireSpaceBeforeHeadingText: true,
        ghCompatibleHeaderId: true,
        ghMentions: true,
        backslashEscapesHTMLTags: true,
        emoji: true,
        splitAdjacentBlockquotes: true
      },
      original: {
        noHeaderId: true,
        ghCodeBlocks: false
      },
      ghost: {
        omitExtraWLInCodeBlocks: true,
        parseImgDimensions: true,
        simplifiedAutoLink: true,
        excludeTrailingPunctuationFromURLs: true,
        literalMidWordUnderscores: true,
        strikethrough: true,
        tables: true,
        tablesHeaderId: true,
        ghCodeBlocks: true,
        tasklists: true,
        smoothLivePreview: true,
        simpleLineBreaks: true,
        requireSpaceBeforeHeadingText: true,
        ghMentions: false,
        encodeEmails: true
      },
      vanilla: getDefaultOpts(true),
      allOn: allOptionsOn()
    };
    showdown2.helper = {};
    showdown2.extensions = {};
    showdown2.setOption = function(key, value) {
      globalOptions[key] = value;
      return this;
    };
    showdown2.getOption = function(key) {
      return globalOptions[key];
    };
    showdown2.getOptions = function() {
      return globalOptions;
    };
    showdown2.resetOptions = function() {
      globalOptions = getDefaultOpts(true);
    };
    showdown2.setFlavor = function(name) {
      if (!flavor.hasOwnProperty(name)) {
        throw Error(name + " flavor was not found");
      }
      showdown2.resetOptions();
      var preset = flavor[name];
      setFlavor = name;
      for (var option in preset) {
        if (preset.hasOwnProperty(option)) {
          globalOptions[option] = preset[option];
        }
      }
    };
    showdown2.getFlavor = function() {
      return setFlavor;
    };
    showdown2.getFlavorOptions = function(name) {
      if (flavor.hasOwnProperty(name)) {
        return flavor[name];
      }
    };
    showdown2.getDefaultOptions = function(simple) {
      return getDefaultOpts(simple);
    };
    showdown2.subParser = function(name, func) {
      if (showdown2.helper.isString(name)) {
        if (typeof func !== "undefined") {
          parsers[name] = func;
        } else {
          if (parsers.hasOwnProperty(name)) {
            return parsers[name];
          } else {
            throw Error("SubParser named " + name + " not registered!");
          }
        }
      }
    };
    showdown2.extension = function(name, ext) {
      if (!showdown2.helper.isString(name)) {
        throw Error("Extension 'name' must be a string");
      }
      name = showdown2.helper.stdExtName(name);
      if (showdown2.helper.isUndefined(ext)) {
        if (!extensions.hasOwnProperty(name)) {
          throw Error("Extension named " + name + " is not registered!");
        }
        return extensions[name];
      } else {
        if (typeof ext === "function") {
          ext = ext();
        }
        if (!showdown2.helper.isArray(ext)) {
          ext = [ext];
        }
        var validExtension = validate(ext, name);
        if (validExtension.valid) {
          extensions[name] = ext;
        } else {
          throw Error(validExtension.error);
        }
      }
    };
    showdown2.getAllExtensions = function() {
      return extensions;
    };
    showdown2.removeExtension = function(name) {
      delete extensions[name];
    };
    showdown2.resetExtensions = function() {
      extensions = {};
    };
    function validate(extension, name) {
      var errMsg = name ? "Error in " + name + " extension->" : "Error in unnamed extension", ret = {
        valid: true,
        error: ""
      };
      if (!showdown2.helper.isArray(extension)) {
        extension = [extension];
      }
      for (var i2 = 0; i2 < extension.length; ++i2) {
        var baseMsg = errMsg + " sub-extension " + i2 + ": ", ext = extension[i2];
        if (typeof ext !== "object") {
          ret.valid = false;
          ret.error = baseMsg + "must be an object, but " + typeof ext + " given";
          return ret;
        }
        if (!showdown2.helper.isString(ext.type)) {
          ret.valid = false;
          ret.error = baseMsg + 'property "type" must be a string, but ' + typeof ext.type + " given";
          return ret;
        }
        var type = ext.type = ext.type.toLowerCase();
        if (type === "language") {
          type = ext.type = "lang";
        }
        if (type === "html") {
          type = ext.type = "output";
        }
        if (type !== "lang" && type !== "output" && type !== "listener") {
          ret.valid = false;
          ret.error = baseMsg + "type " + type + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"';
          return ret;
        }
        if (type === "listener") {
          if (showdown2.helper.isUndefined(ext.listeners)) {
            ret.valid = false;
            ret.error = baseMsg + '. Extensions of type "listener" must have a property called "listeners"';
            return ret;
          }
        } else {
          if (showdown2.helper.isUndefined(ext.filter) && showdown2.helper.isUndefined(ext.regex)) {
            ret.valid = false;
            ret.error = baseMsg + type + ' extensions must define either a "regex" property or a "filter" method';
            return ret;
          }
        }
        if (ext.listeners) {
          if (typeof ext.listeners !== "object") {
            ret.valid = false;
            ret.error = baseMsg + '"listeners" property must be an object but ' + typeof ext.listeners + " given";
            return ret;
          }
          for (var ln in ext.listeners) {
            if (ext.listeners.hasOwnProperty(ln)) {
              if (typeof ext.listeners[ln] !== "function") {
                ret.valid = false;
                ret.error = baseMsg + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + ln + " must be a function but " + typeof ext.listeners[ln] + " given";
                return ret;
              }
            }
          }
        }
        if (ext.filter) {
          if (typeof ext.filter !== "function") {
            ret.valid = false;
            ret.error = baseMsg + '"filter" must be a function, but ' + typeof ext.filter + " given";
            return ret;
          }
        } else if (ext.regex) {
          if (showdown2.helper.isString(ext.regex)) {
            ext.regex = new RegExp(ext.regex, "g");
          }
          if (!(ext.regex instanceof RegExp)) {
            ret.valid = false;
            ret.error = baseMsg + '"regex" property must either be a string or a RegExp object, but ' + typeof ext.regex + " given";
            return ret;
          }
          if (showdown2.helper.isUndefined(ext.replace)) {
            ret.valid = false;
            ret.error = baseMsg + '"regex" extensions must implement a replace string or function';
            return ret;
          }
        }
      }
      return ret;
    }
    showdown2.validateExtension = function(ext) {
      var validateExtension = validate(ext, null);
      if (!validateExtension.valid) {
        console.warn(validateExtension.error);
        return false;
      }
      return true;
    };
    if (!showdown2.hasOwnProperty("helper")) {
      showdown2.helper = {};
    }
    showdown2.helper.isString = function(a2) {
      return typeof a2 === "string" || a2 instanceof String;
    };
    showdown2.helper.isFunction = function(a2) {
      var getType = {};
      return a2 && getType.toString.call(a2) === "[object Function]";
    };
    showdown2.helper.isArray = function(a2) {
      return Array.isArray(a2);
    };
    showdown2.helper.isUndefined = function(value) {
      return typeof value === "undefined";
    };
    showdown2.helper.forEach = function(obj, callback) {
      if (showdown2.helper.isUndefined(obj)) {
        throw new Error("obj param is required");
      }
      if (showdown2.helper.isUndefined(callback)) {
        throw new Error("callback param is required");
      }
      if (!showdown2.helper.isFunction(callback)) {
        throw new Error("callback param must be a function/closure");
      }
      if (typeof obj.forEach === "function") {
        obj.forEach(callback);
      } else if (showdown2.helper.isArray(obj)) {
        for (var i2 = 0; i2 < obj.length; i2++) {
          callback(obj[i2], i2, obj);
        }
      } else if (typeof obj === "object") {
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            callback(obj[prop], prop, obj);
          }
        }
      } else {
        throw new Error("obj does not seem to be an array or an iterable object");
      }
    };
    showdown2.helper.stdExtName = function(s2) {
      return s2.replace(/[_?*+\/\\.^-]/g, "").replace(/\s/g, "").toLowerCase();
    };
    function escapeCharactersCallback(wholeMatch, m1) {
      var charCodeToEscape = m1.charCodeAt(0);
      return "\xA8E" + charCodeToEscape + "E";
    }
    showdown2.helper.escapeCharactersCallback = escapeCharactersCallback;
    showdown2.helper.escapeCharacters = function(text, charsToEscape, afterBackslash) {
      var regexString = "([" + charsToEscape.replace(/([\[\]\\])/g, "\\$1") + "])";
      if (afterBackslash) {
        regexString = "\\\\" + regexString;
      }
      var regex = new RegExp(regexString, "g");
      text = text.replace(regex, escapeCharactersCallback);
      return text;
    };
    showdown2.helper.unescapeHTMLEntities = function(txt) {
      return txt.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    };
    var rgxFindMatchPos = function(str, left, right, flags) {
      var f2 = flags || "", g2 = f2.indexOf("g") > -1, x = new RegExp(left + "|" + right, "g" + f2.replace(/g/g, "")), l2 = new RegExp(left, f2.replace(/g/g, "")), pos = [], t2, s2, m2, start, end;
      do {
        t2 = 0;
        while (m2 = x.exec(str)) {
          if (l2.test(m2[0])) {
            if (!t2++) {
              s2 = x.lastIndex;
              start = s2 - m2[0].length;
            }
          } else if (t2) {
            if (!--t2) {
              end = m2.index + m2[0].length;
              var obj = {
                left: {start, end: s2},
                match: {start: s2, end: m2.index},
                right: {start: m2.index, end},
                wholeMatch: {start, end}
              };
              pos.push(obj);
              if (!g2) {
                return pos;
              }
            }
          }
        }
      } while (t2 && (x.lastIndex = s2));
      return pos;
    };
    showdown2.helper.matchRecursiveRegExp = function(str, left, right, flags) {
      var matchPos = rgxFindMatchPos(str, left, right, flags), results = [];
      for (var i2 = 0; i2 < matchPos.length; ++i2) {
        results.push([
          str.slice(matchPos[i2].wholeMatch.start, matchPos[i2].wholeMatch.end),
          str.slice(matchPos[i2].match.start, matchPos[i2].match.end),
          str.slice(matchPos[i2].left.start, matchPos[i2].left.end),
          str.slice(matchPos[i2].right.start, matchPos[i2].right.end)
        ]);
      }
      return results;
    };
    showdown2.helper.replaceRecursiveRegExp = function(str, replacement, left, right, flags) {
      if (!showdown2.helper.isFunction(replacement)) {
        var repStr = replacement;
        replacement = function() {
          return repStr;
        };
      }
      var matchPos = rgxFindMatchPos(str, left, right, flags), finalStr = str, lng = matchPos.length;
      if (lng > 0) {
        var bits = [];
        if (matchPos[0].wholeMatch.start !== 0) {
          bits.push(str.slice(0, matchPos[0].wholeMatch.start));
        }
        for (var i2 = 0; i2 < lng; ++i2) {
          bits.push(replacement(str.slice(matchPos[i2].wholeMatch.start, matchPos[i2].wholeMatch.end), str.slice(matchPos[i2].match.start, matchPos[i2].match.end), str.slice(matchPos[i2].left.start, matchPos[i2].left.end), str.slice(matchPos[i2].right.start, matchPos[i2].right.end)));
          if (i2 < lng - 1) {
            bits.push(str.slice(matchPos[i2].wholeMatch.end, matchPos[i2 + 1].wholeMatch.start));
          }
        }
        if (matchPos[lng - 1].wholeMatch.end < str.length) {
          bits.push(str.slice(matchPos[lng - 1].wholeMatch.end));
        }
        finalStr = bits.join("");
      }
      return finalStr;
    };
    showdown2.helper.regexIndexOf = function(str, regex, fromIndex) {
      if (!showdown2.helper.isString(str)) {
        throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
      }
      if (regex instanceof RegExp === false) {
        throw "InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp";
      }
      var indexOf = str.substring(fromIndex || 0).search(regex);
      return indexOf >= 0 ? indexOf + (fromIndex || 0) : indexOf;
    };
    showdown2.helper.splitAtIndex = function(str, index) {
      if (!showdown2.helper.isString(str)) {
        throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
      }
      return [str.substring(0, index), str.substring(index)];
    };
    showdown2.helper.encodeEmailAddress = function(mail) {
      var encode = [
        function(ch) {
          return "&#" + ch.charCodeAt(0) + ";";
        },
        function(ch) {
          return "&#x" + ch.charCodeAt(0).toString(16) + ";";
        },
        function(ch) {
          return ch;
        }
      ];
      mail = mail.replace(/./g, function(ch) {
        if (ch === "@") {
          ch = encode[Math.floor(Math.random() * 2)](ch);
        } else {
          var r2 = Math.random();
          ch = r2 > 0.9 ? encode[2](ch) : r2 > 0.45 ? encode[1](ch) : encode[0](ch);
        }
        return ch;
      });
      return mail;
    };
    showdown2.helper.padEnd = function padEnd(str, targetLength, padString) {
      targetLength = targetLength >> 0;
      padString = String(padString || " ");
      if (str.length > targetLength) {
        return String(str);
      } else {
        targetLength = targetLength - str.length;
        if (targetLength > padString.length) {
          padString += padString.repeat(targetLength / padString.length);
        }
        return String(str) + padString.slice(0, targetLength);
      }
    };
    if (typeof console === "undefined") {
      console = {
        warn: function(msg) {
          alert(msg);
        },
        log: function(msg) {
          alert(msg);
        },
        error: function(msg) {
          throw msg;
        }
      };
    }
    showdown2.helper.regexes = {
      asteriskDashAndColon: /([*_:~])/g
    };
    showdown2.helper.emojis = {
      "+1": "\u{1F44D}",
      "-1": "\u{1F44E}",
      "100": "\u{1F4AF}",
      "1234": "\u{1F522}",
      "1st_place_medal": "\u{1F947}",
      "2nd_place_medal": "\u{1F948}",
      "3rd_place_medal": "\u{1F949}",
      "8ball": "\u{1F3B1}",
      a: "\u{1F170}\uFE0F",
      ab: "\u{1F18E}",
      abc: "\u{1F524}",
      abcd: "\u{1F521}",
      accept: "\u{1F251}",
      aerial_tramway: "\u{1F6A1}",
      airplane: "\u2708\uFE0F",
      alarm_clock: "\u23F0",
      alembic: "\u2697\uFE0F",
      alien: "\u{1F47D}",
      ambulance: "\u{1F691}",
      amphora: "\u{1F3FA}",
      anchor: "\u2693\uFE0F",
      angel: "\u{1F47C}",
      anger: "\u{1F4A2}",
      angry: "\u{1F620}",
      anguished: "\u{1F627}",
      ant: "\u{1F41C}",
      apple: "\u{1F34E}",
      aquarius: "\u2652\uFE0F",
      aries: "\u2648\uFE0F",
      arrow_backward: "\u25C0\uFE0F",
      arrow_double_down: "\u23EC",
      arrow_double_up: "\u23EB",
      arrow_down: "\u2B07\uFE0F",
      arrow_down_small: "\u{1F53D}",
      arrow_forward: "\u25B6\uFE0F",
      arrow_heading_down: "\u2935\uFE0F",
      arrow_heading_up: "\u2934\uFE0F",
      arrow_left: "\u2B05\uFE0F",
      arrow_lower_left: "\u2199\uFE0F",
      arrow_lower_right: "\u2198\uFE0F",
      arrow_right: "\u27A1\uFE0F",
      arrow_right_hook: "\u21AA\uFE0F",
      arrow_up: "\u2B06\uFE0F",
      arrow_up_down: "\u2195\uFE0F",
      arrow_up_small: "\u{1F53C}",
      arrow_upper_left: "\u2196\uFE0F",
      arrow_upper_right: "\u2197\uFE0F",
      arrows_clockwise: "\u{1F503}",
      arrows_counterclockwise: "\u{1F504}",
      art: "\u{1F3A8}",
      articulated_lorry: "\u{1F69B}",
      artificial_satellite: "\u{1F6F0}",
      astonished: "\u{1F632}",
      athletic_shoe: "\u{1F45F}",
      atm: "\u{1F3E7}",
      atom_symbol: "\u269B\uFE0F",
      avocado: "\u{1F951}",
      b: "\u{1F171}\uFE0F",
      baby: "\u{1F476}",
      baby_bottle: "\u{1F37C}",
      baby_chick: "\u{1F424}",
      baby_symbol: "\u{1F6BC}",
      back: "\u{1F519}",
      bacon: "\u{1F953}",
      badminton: "\u{1F3F8}",
      baggage_claim: "\u{1F6C4}",
      baguette_bread: "\u{1F956}",
      balance_scale: "\u2696\uFE0F",
      balloon: "\u{1F388}",
      ballot_box: "\u{1F5F3}",
      ballot_box_with_check: "\u2611\uFE0F",
      bamboo: "\u{1F38D}",
      banana: "\u{1F34C}",
      bangbang: "\u203C\uFE0F",
      bank: "\u{1F3E6}",
      bar_chart: "\u{1F4CA}",
      barber: "\u{1F488}",
      baseball: "\u26BE\uFE0F",
      basketball: "\u{1F3C0}",
      basketball_man: "\u26F9\uFE0F",
      basketball_woman: "\u26F9\uFE0F&zwj;\u2640\uFE0F",
      bat: "\u{1F987}",
      bath: "\u{1F6C0}",
      bathtub: "\u{1F6C1}",
      battery: "\u{1F50B}",
      beach_umbrella: "\u{1F3D6}",
      bear: "\u{1F43B}",
      bed: "\u{1F6CF}",
      bee: "\u{1F41D}",
      beer: "\u{1F37A}",
      beers: "\u{1F37B}",
      beetle: "\u{1F41E}",
      beginner: "\u{1F530}",
      bell: "\u{1F514}",
      bellhop_bell: "\u{1F6CE}",
      bento: "\u{1F371}",
      biking_man: "\u{1F6B4}",
      bike: "\u{1F6B2}",
      biking_woman: "\u{1F6B4}&zwj;\u2640\uFE0F",
      bikini: "\u{1F459}",
      biohazard: "\u2623\uFE0F",
      bird: "\u{1F426}",
      birthday: "\u{1F382}",
      black_circle: "\u26AB\uFE0F",
      black_flag: "\u{1F3F4}",
      black_heart: "\u{1F5A4}",
      black_joker: "\u{1F0CF}",
      black_large_square: "\u2B1B\uFE0F",
      black_medium_small_square: "\u25FE\uFE0F",
      black_medium_square: "\u25FC\uFE0F",
      black_nib: "\u2712\uFE0F",
      black_small_square: "\u25AA\uFE0F",
      black_square_button: "\u{1F532}",
      blonde_man: "\u{1F471}",
      blonde_woman: "\u{1F471}&zwj;\u2640\uFE0F",
      blossom: "\u{1F33C}",
      blowfish: "\u{1F421}",
      blue_book: "\u{1F4D8}",
      blue_car: "\u{1F699}",
      blue_heart: "\u{1F499}",
      blush: "\u{1F60A}",
      boar: "\u{1F417}",
      boat: "\u26F5\uFE0F",
      bomb: "\u{1F4A3}",
      book: "\u{1F4D6}",
      bookmark: "\u{1F516}",
      bookmark_tabs: "\u{1F4D1}",
      books: "\u{1F4DA}",
      boom: "\u{1F4A5}",
      boot: "\u{1F462}",
      bouquet: "\u{1F490}",
      bowing_man: "\u{1F647}",
      bow_and_arrow: "\u{1F3F9}",
      bowing_woman: "\u{1F647}&zwj;\u2640\uFE0F",
      bowling: "\u{1F3B3}",
      boxing_glove: "\u{1F94A}",
      boy: "\u{1F466}",
      bread: "\u{1F35E}",
      bride_with_veil: "\u{1F470}",
      bridge_at_night: "\u{1F309}",
      briefcase: "\u{1F4BC}",
      broken_heart: "\u{1F494}",
      bug: "\u{1F41B}",
      building_construction: "\u{1F3D7}",
      bulb: "\u{1F4A1}",
      bullettrain_front: "\u{1F685}",
      bullettrain_side: "\u{1F684}",
      burrito: "\u{1F32F}",
      bus: "\u{1F68C}",
      business_suit_levitating: "\u{1F574}",
      busstop: "\u{1F68F}",
      bust_in_silhouette: "\u{1F464}",
      busts_in_silhouette: "\u{1F465}",
      butterfly: "\u{1F98B}",
      cactus: "\u{1F335}",
      cake: "\u{1F370}",
      calendar: "\u{1F4C6}",
      call_me_hand: "\u{1F919}",
      calling: "\u{1F4F2}",
      camel: "\u{1F42B}",
      camera: "\u{1F4F7}",
      camera_flash: "\u{1F4F8}",
      camping: "\u{1F3D5}",
      cancer: "\u264B\uFE0F",
      candle: "\u{1F56F}",
      candy: "\u{1F36C}",
      canoe: "\u{1F6F6}",
      capital_abcd: "\u{1F520}",
      capricorn: "\u2651\uFE0F",
      car: "\u{1F697}",
      card_file_box: "\u{1F5C3}",
      card_index: "\u{1F4C7}",
      card_index_dividers: "\u{1F5C2}",
      carousel_horse: "\u{1F3A0}",
      carrot: "\u{1F955}",
      cat: "\u{1F431}",
      cat2: "\u{1F408}",
      cd: "\u{1F4BF}",
      chains: "\u26D3",
      champagne: "\u{1F37E}",
      chart: "\u{1F4B9}",
      chart_with_downwards_trend: "\u{1F4C9}",
      chart_with_upwards_trend: "\u{1F4C8}",
      checkered_flag: "\u{1F3C1}",
      cheese: "\u{1F9C0}",
      cherries: "\u{1F352}",
      cherry_blossom: "\u{1F338}",
      chestnut: "\u{1F330}",
      chicken: "\u{1F414}",
      children_crossing: "\u{1F6B8}",
      chipmunk: "\u{1F43F}",
      chocolate_bar: "\u{1F36B}",
      christmas_tree: "\u{1F384}",
      church: "\u26EA\uFE0F",
      cinema: "\u{1F3A6}",
      circus_tent: "\u{1F3AA}",
      city_sunrise: "\u{1F307}",
      city_sunset: "\u{1F306}",
      cityscape: "\u{1F3D9}",
      cl: "\u{1F191}",
      clamp: "\u{1F5DC}",
      clap: "\u{1F44F}",
      clapper: "\u{1F3AC}",
      classical_building: "\u{1F3DB}",
      clinking_glasses: "\u{1F942}",
      clipboard: "\u{1F4CB}",
      clock1: "\u{1F550}",
      clock10: "\u{1F559}",
      clock1030: "\u{1F565}",
      clock11: "\u{1F55A}",
      clock1130: "\u{1F566}",
      clock12: "\u{1F55B}",
      clock1230: "\u{1F567}",
      clock130: "\u{1F55C}",
      clock2: "\u{1F551}",
      clock230: "\u{1F55D}",
      clock3: "\u{1F552}",
      clock330: "\u{1F55E}",
      clock4: "\u{1F553}",
      clock430: "\u{1F55F}",
      clock5: "\u{1F554}",
      clock530: "\u{1F560}",
      clock6: "\u{1F555}",
      clock630: "\u{1F561}",
      clock7: "\u{1F556}",
      clock730: "\u{1F562}",
      clock8: "\u{1F557}",
      clock830: "\u{1F563}",
      clock9: "\u{1F558}",
      clock930: "\u{1F564}",
      closed_book: "\u{1F4D5}",
      closed_lock_with_key: "\u{1F510}",
      closed_umbrella: "\u{1F302}",
      cloud: "\u2601\uFE0F",
      cloud_with_lightning: "\u{1F329}",
      cloud_with_lightning_and_rain: "\u26C8",
      cloud_with_rain: "\u{1F327}",
      cloud_with_snow: "\u{1F328}",
      clown_face: "\u{1F921}",
      clubs: "\u2663\uFE0F",
      cocktail: "\u{1F378}",
      coffee: "\u2615\uFE0F",
      coffin: "\u26B0\uFE0F",
      cold_sweat: "\u{1F630}",
      comet: "\u2604\uFE0F",
      computer: "\u{1F4BB}",
      computer_mouse: "\u{1F5B1}",
      confetti_ball: "\u{1F38A}",
      confounded: "\u{1F616}",
      confused: "\u{1F615}",
      congratulations: "\u3297\uFE0F",
      construction: "\u{1F6A7}",
      construction_worker_man: "\u{1F477}",
      construction_worker_woman: "\u{1F477}&zwj;\u2640\uFE0F",
      control_knobs: "\u{1F39B}",
      convenience_store: "\u{1F3EA}",
      cookie: "\u{1F36A}",
      cool: "\u{1F192}",
      policeman: "\u{1F46E}",
      copyright: "\xA9\uFE0F",
      corn: "\u{1F33D}",
      couch_and_lamp: "\u{1F6CB}",
      couple: "\u{1F46B}",
      couple_with_heart_woman_man: "\u{1F491}",
      couple_with_heart_man_man: "\u{1F468}&zwj;\u2764\uFE0F&zwj;\u{1F468}",
      couple_with_heart_woman_woman: "\u{1F469}&zwj;\u2764\uFE0F&zwj;\u{1F469}",
      couplekiss_man_man: "\u{1F468}&zwj;\u2764\uFE0F&zwj;\u{1F48B}&zwj;\u{1F468}",
      couplekiss_man_woman: "\u{1F48F}",
      couplekiss_woman_woman: "\u{1F469}&zwj;\u2764\uFE0F&zwj;\u{1F48B}&zwj;\u{1F469}",
      cow: "\u{1F42E}",
      cow2: "\u{1F404}",
      cowboy_hat_face: "\u{1F920}",
      crab: "\u{1F980}",
      crayon: "\u{1F58D}",
      credit_card: "\u{1F4B3}",
      crescent_moon: "\u{1F319}",
      cricket: "\u{1F3CF}",
      crocodile: "\u{1F40A}",
      croissant: "\u{1F950}",
      crossed_fingers: "\u{1F91E}",
      crossed_flags: "\u{1F38C}",
      crossed_swords: "\u2694\uFE0F",
      crown: "\u{1F451}",
      cry: "\u{1F622}",
      crying_cat_face: "\u{1F63F}",
      crystal_ball: "\u{1F52E}",
      cucumber: "\u{1F952}",
      cupid: "\u{1F498}",
      curly_loop: "\u27B0",
      currency_exchange: "\u{1F4B1}",
      curry: "\u{1F35B}",
      custard: "\u{1F36E}",
      customs: "\u{1F6C3}",
      cyclone: "\u{1F300}",
      dagger: "\u{1F5E1}",
      dancer: "\u{1F483}",
      dancing_women: "\u{1F46F}",
      dancing_men: "\u{1F46F}&zwj;\u2642\uFE0F",
      dango: "\u{1F361}",
      dark_sunglasses: "\u{1F576}",
      dart: "\u{1F3AF}",
      dash: "\u{1F4A8}",
      date: "\u{1F4C5}",
      deciduous_tree: "\u{1F333}",
      deer: "\u{1F98C}",
      department_store: "\u{1F3EC}",
      derelict_house: "\u{1F3DA}",
      desert: "\u{1F3DC}",
      desert_island: "\u{1F3DD}",
      desktop_computer: "\u{1F5A5}",
      male_detective: "\u{1F575}\uFE0F",
      diamond_shape_with_a_dot_inside: "\u{1F4A0}",
      diamonds: "\u2666\uFE0F",
      disappointed: "\u{1F61E}",
      disappointed_relieved: "\u{1F625}",
      dizzy: "\u{1F4AB}",
      dizzy_face: "\u{1F635}",
      do_not_litter: "\u{1F6AF}",
      dog: "\u{1F436}",
      dog2: "\u{1F415}",
      dollar: "\u{1F4B5}",
      dolls: "\u{1F38E}",
      dolphin: "\u{1F42C}",
      door: "\u{1F6AA}",
      doughnut: "\u{1F369}",
      dove: "\u{1F54A}",
      dragon: "\u{1F409}",
      dragon_face: "\u{1F432}",
      dress: "\u{1F457}",
      dromedary_camel: "\u{1F42A}",
      drooling_face: "\u{1F924}",
      droplet: "\u{1F4A7}",
      drum: "\u{1F941}",
      duck: "\u{1F986}",
      dvd: "\u{1F4C0}",
      "e-mail": "\u{1F4E7}",
      eagle: "\u{1F985}",
      ear: "\u{1F442}",
      ear_of_rice: "\u{1F33E}",
      earth_africa: "\u{1F30D}",
      earth_americas: "\u{1F30E}",
      earth_asia: "\u{1F30F}",
      egg: "\u{1F95A}",
      eggplant: "\u{1F346}",
      eight_pointed_black_star: "\u2734\uFE0F",
      eight_spoked_asterisk: "\u2733\uFE0F",
      electric_plug: "\u{1F50C}",
      elephant: "\u{1F418}",
      email: "\u2709\uFE0F",
      end: "\u{1F51A}",
      envelope_with_arrow: "\u{1F4E9}",
      euro: "\u{1F4B6}",
      european_castle: "\u{1F3F0}",
      european_post_office: "\u{1F3E4}",
      evergreen_tree: "\u{1F332}",
      exclamation: "\u2757\uFE0F",
      expressionless: "\u{1F611}",
      eye: "\u{1F441}",
      eye_speech_bubble: "\u{1F441}&zwj;\u{1F5E8}",
      eyeglasses: "\u{1F453}",
      eyes: "\u{1F440}",
      face_with_head_bandage: "\u{1F915}",
      face_with_thermometer: "\u{1F912}",
      fist_oncoming: "\u{1F44A}",
      factory: "\u{1F3ED}",
      fallen_leaf: "\u{1F342}",
      family_man_woman_boy: "\u{1F46A}",
      family_man_boy: "\u{1F468}&zwj;\u{1F466}",
      family_man_boy_boy: "\u{1F468}&zwj;\u{1F466}&zwj;\u{1F466}",
      family_man_girl: "\u{1F468}&zwj;\u{1F467}",
      family_man_girl_boy: "\u{1F468}&zwj;\u{1F467}&zwj;\u{1F466}",
      family_man_girl_girl: "\u{1F468}&zwj;\u{1F467}&zwj;\u{1F467}",
      family_man_man_boy: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F466}",
      family_man_man_boy_boy: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F466}&zwj;\u{1F466}",
      family_man_man_girl: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}",
      family_man_man_girl_boy: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}&zwj;\u{1F466}",
      family_man_man_girl_girl: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}&zwj;\u{1F467}",
      family_man_woman_boy_boy: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}",
      family_man_woman_girl: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}",
      family_man_woman_girl_boy: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}",
      family_man_woman_girl_girl: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}",
      family_woman_boy: "\u{1F469}&zwj;\u{1F466}",
      family_woman_boy_boy: "\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}",
      family_woman_girl: "\u{1F469}&zwj;\u{1F467}",
      family_woman_girl_boy: "\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}",
      family_woman_girl_girl: "\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}",
      family_woman_woman_boy: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F466}",
      family_woman_woman_boy_boy: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}",
      family_woman_woman_girl: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}",
      family_woman_woman_girl_boy: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}",
      family_woman_woman_girl_girl: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}",
      fast_forward: "\u23E9",
      fax: "\u{1F4E0}",
      fearful: "\u{1F628}",
      feet: "\u{1F43E}",
      female_detective: "\u{1F575}\uFE0F&zwj;\u2640\uFE0F",
      ferris_wheel: "\u{1F3A1}",
      ferry: "\u26F4",
      field_hockey: "\u{1F3D1}",
      file_cabinet: "\u{1F5C4}",
      file_folder: "\u{1F4C1}",
      film_projector: "\u{1F4FD}",
      film_strip: "\u{1F39E}",
      fire: "\u{1F525}",
      fire_engine: "\u{1F692}",
      fireworks: "\u{1F386}",
      first_quarter_moon: "\u{1F313}",
      first_quarter_moon_with_face: "\u{1F31B}",
      fish: "\u{1F41F}",
      fish_cake: "\u{1F365}",
      fishing_pole_and_fish: "\u{1F3A3}",
      fist_raised: "\u270A",
      fist_left: "\u{1F91B}",
      fist_right: "\u{1F91C}",
      flags: "\u{1F38F}",
      flashlight: "\u{1F526}",
      fleur_de_lis: "\u269C\uFE0F",
      flight_arrival: "\u{1F6EC}",
      flight_departure: "\u{1F6EB}",
      floppy_disk: "\u{1F4BE}",
      flower_playing_cards: "\u{1F3B4}",
      flushed: "\u{1F633}",
      fog: "\u{1F32B}",
      foggy: "\u{1F301}",
      football: "\u{1F3C8}",
      footprints: "\u{1F463}",
      fork_and_knife: "\u{1F374}",
      fountain: "\u26F2\uFE0F",
      fountain_pen: "\u{1F58B}",
      four_leaf_clover: "\u{1F340}",
      fox_face: "\u{1F98A}",
      framed_picture: "\u{1F5BC}",
      free: "\u{1F193}",
      fried_egg: "\u{1F373}",
      fried_shrimp: "\u{1F364}",
      fries: "\u{1F35F}",
      frog: "\u{1F438}",
      frowning: "\u{1F626}",
      frowning_face: "\u2639\uFE0F",
      frowning_man: "\u{1F64D}&zwj;\u2642\uFE0F",
      frowning_woman: "\u{1F64D}",
      middle_finger: "\u{1F595}",
      fuelpump: "\u26FD\uFE0F",
      full_moon: "\u{1F315}",
      full_moon_with_face: "\u{1F31D}",
      funeral_urn: "\u26B1\uFE0F",
      game_die: "\u{1F3B2}",
      gear: "\u2699\uFE0F",
      gem: "\u{1F48E}",
      gemini: "\u264A\uFE0F",
      ghost: "\u{1F47B}",
      gift: "\u{1F381}",
      gift_heart: "\u{1F49D}",
      girl: "\u{1F467}",
      globe_with_meridians: "\u{1F310}",
      goal_net: "\u{1F945}",
      goat: "\u{1F410}",
      golf: "\u26F3\uFE0F",
      golfing_man: "\u{1F3CC}\uFE0F",
      golfing_woman: "\u{1F3CC}\uFE0F&zwj;\u2640\uFE0F",
      gorilla: "\u{1F98D}",
      grapes: "\u{1F347}",
      green_apple: "\u{1F34F}",
      green_book: "\u{1F4D7}",
      green_heart: "\u{1F49A}",
      green_salad: "\u{1F957}",
      grey_exclamation: "\u2755",
      grey_question: "\u2754",
      grimacing: "\u{1F62C}",
      grin: "\u{1F601}",
      grinning: "\u{1F600}",
      guardsman: "\u{1F482}",
      guardswoman: "\u{1F482}&zwj;\u2640\uFE0F",
      guitar: "\u{1F3B8}",
      gun: "\u{1F52B}",
      haircut_woman: "\u{1F487}",
      haircut_man: "\u{1F487}&zwj;\u2642\uFE0F",
      hamburger: "\u{1F354}",
      hammer: "\u{1F528}",
      hammer_and_pick: "\u2692",
      hammer_and_wrench: "\u{1F6E0}",
      hamster: "\u{1F439}",
      hand: "\u270B",
      handbag: "\u{1F45C}",
      handshake: "\u{1F91D}",
      hankey: "\u{1F4A9}",
      hatched_chick: "\u{1F425}",
      hatching_chick: "\u{1F423}",
      headphones: "\u{1F3A7}",
      hear_no_evil: "\u{1F649}",
      heart: "\u2764\uFE0F",
      heart_decoration: "\u{1F49F}",
      heart_eyes: "\u{1F60D}",
      heart_eyes_cat: "\u{1F63B}",
      heartbeat: "\u{1F493}",
      heartpulse: "\u{1F497}",
      hearts: "\u2665\uFE0F",
      heavy_check_mark: "\u2714\uFE0F",
      heavy_division_sign: "\u2797",
      heavy_dollar_sign: "\u{1F4B2}",
      heavy_heart_exclamation: "\u2763\uFE0F",
      heavy_minus_sign: "\u2796",
      heavy_multiplication_x: "\u2716\uFE0F",
      heavy_plus_sign: "\u2795",
      helicopter: "\u{1F681}",
      herb: "\u{1F33F}",
      hibiscus: "\u{1F33A}",
      high_brightness: "\u{1F506}",
      high_heel: "\u{1F460}",
      hocho: "\u{1F52A}",
      hole: "\u{1F573}",
      honey_pot: "\u{1F36F}",
      horse: "\u{1F434}",
      horse_racing: "\u{1F3C7}",
      hospital: "\u{1F3E5}",
      hot_pepper: "\u{1F336}",
      hotdog: "\u{1F32D}",
      hotel: "\u{1F3E8}",
      hotsprings: "\u2668\uFE0F",
      hourglass: "\u231B\uFE0F",
      hourglass_flowing_sand: "\u23F3",
      house: "\u{1F3E0}",
      house_with_garden: "\u{1F3E1}",
      houses: "\u{1F3D8}",
      hugs: "\u{1F917}",
      hushed: "\u{1F62F}",
      ice_cream: "\u{1F368}",
      ice_hockey: "\u{1F3D2}",
      ice_skate: "\u26F8",
      icecream: "\u{1F366}",
      id: "\u{1F194}",
      ideograph_advantage: "\u{1F250}",
      imp: "\u{1F47F}",
      inbox_tray: "\u{1F4E5}",
      incoming_envelope: "\u{1F4E8}",
      tipping_hand_woman: "\u{1F481}",
      information_source: "\u2139\uFE0F",
      innocent: "\u{1F607}",
      interrobang: "\u2049\uFE0F",
      iphone: "\u{1F4F1}",
      izakaya_lantern: "\u{1F3EE}",
      jack_o_lantern: "\u{1F383}",
      japan: "\u{1F5FE}",
      japanese_castle: "\u{1F3EF}",
      japanese_goblin: "\u{1F47A}",
      japanese_ogre: "\u{1F479}",
      jeans: "\u{1F456}",
      joy: "\u{1F602}",
      joy_cat: "\u{1F639}",
      joystick: "\u{1F579}",
      kaaba: "\u{1F54B}",
      key: "\u{1F511}",
      keyboard: "\u2328\uFE0F",
      keycap_ten: "\u{1F51F}",
      kick_scooter: "\u{1F6F4}",
      kimono: "\u{1F458}",
      kiss: "\u{1F48B}",
      kissing: "\u{1F617}",
      kissing_cat: "\u{1F63D}",
      kissing_closed_eyes: "\u{1F61A}",
      kissing_heart: "\u{1F618}",
      kissing_smiling_eyes: "\u{1F619}",
      kiwi_fruit: "\u{1F95D}",
      koala: "\u{1F428}",
      koko: "\u{1F201}",
      label: "\u{1F3F7}",
      large_blue_circle: "\u{1F535}",
      large_blue_diamond: "\u{1F537}",
      large_orange_diamond: "\u{1F536}",
      last_quarter_moon: "\u{1F317}",
      last_quarter_moon_with_face: "\u{1F31C}",
      latin_cross: "\u271D\uFE0F",
      laughing: "\u{1F606}",
      leaves: "\u{1F343}",
      ledger: "\u{1F4D2}",
      left_luggage: "\u{1F6C5}",
      left_right_arrow: "\u2194\uFE0F",
      leftwards_arrow_with_hook: "\u21A9\uFE0F",
      lemon: "\u{1F34B}",
      leo: "\u264C\uFE0F",
      leopard: "\u{1F406}",
      level_slider: "\u{1F39A}",
      libra: "\u264E\uFE0F",
      light_rail: "\u{1F688}",
      link: "\u{1F517}",
      lion: "\u{1F981}",
      lips: "\u{1F444}",
      lipstick: "\u{1F484}",
      lizard: "\u{1F98E}",
      lock: "\u{1F512}",
      lock_with_ink_pen: "\u{1F50F}",
      lollipop: "\u{1F36D}",
      loop: "\u27BF",
      loud_sound: "\u{1F50A}",
      loudspeaker: "\u{1F4E2}",
      love_hotel: "\u{1F3E9}",
      love_letter: "\u{1F48C}",
      low_brightness: "\u{1F505}",
      lying_face: "\u{1F925}",
      m: "\u24C2\uFE0F",
      mag: "\u{1F50D}",
      mag_right: "\u{1F50E}",
      mahjong: "\u{1F004}\uFE0F",
      mailbox: "\u{1F4EB}",
      mailbox_closed: "\u{1F4EA}",
      mailbox_with_mail: "\u{1F4EC}",
      mailbox_with_no_mail: "\u{1F4ED}",
      man: "\u{1F468}",
      man_artist: "\u{1F468}&zwj;\u{1F3A8}",
      man_astronaut: "\u{1F468}&zwj;\u{1F680}",
      man_cartwheeling: "\u{1F938}&zwj;\u2642\uFE0F",
      man_cook: "\u{1F468}&zwj;\u{1F373}",
      man_dancing: "\u{1F57A}",
      man_facepalming: "\u{1F926}&zwj;\u2642\uFE0F",
      man_factory_worker: "\u{1F468}&zwj;\u{1F3ED}",
      man_farmer: "\u{1F468}&zwj;\u{1F33E}",
      man_firefighter: "\u{1F468}&zwj;\u{1F692}",
      man_health_worker: "\u{1F468}&zwj;\u2695\uFE0F",
      man_in_tuxedo: "\u{1F935}",
      man_judge: "\u{1F468}&zwj;\u2696\uFE0F",
      man_juggling: "\u{1F939}&zwj;\u2642\uFE0F",
      man_mechanic: "\u{1F468}&zwj;\u{1F527}",
      man_office_worker: "\u{1F468}&zwj;\u{1F4BC}",
      man_pilot: "\u{1F468}&zwj;\u2708\uFE0F",
      man_playing_handball: "\u{1F93E}&zwj;\u2642\uFE0F",
      man_playing_water_polo: "\u{1F93D}&zwj;\u2642\uFE0F",
      man_scientist: "\u{1F468}&zwj;\u{1F52C}",
      man_shrugging: "\u{1F937}&zwj;\u2642\uFE0F",
      man_singer: "\u{1F468}&zwj;\u{1F3A4}",
      man_student: "\u{1F468}&zwj;\u{1F393}",
      man_teacher: "\u{1F468}&zwj;\u{1F3EB}",
      man_technologist: "\u{1F468}&zwj;\u{1F4BB}",
      man_with_gua_pi_mao: "\u{1F472}",
      man_with_turban: "\u{1F473}",
      tangerine: "\u{1F34A}",
      mans_shoe: "\u{1F45E}",
      mantelpiece_clock: "\u{1F570}",
      maple_leaf: "\u{1F341}",
      martial_arts_uniform: "\u{1F94B}",
      mask: "\u{1F637}",
      massage_woman: "\u{1F486}",
      massage_man: "\u{1F486}&zwj;\u2642\uFE0F",
      meat_on_bone: "\u{1F356}",
      medal_military: "\u{1F396}",
      medal_sports: "\u{1F3C5}",
      mega: "\u{1F4E3}",
      melon: "\u{1F348}",
      memo: "\u{1F4DD}",
      men_wrestling: "\u{1F93C}&zwj;\u2642\uFE0F",
      menorah: "\u{1F54E}",
      mens: "\u{1F6B9}",
      metal: "\u{1F918}",
      metro: "\u{1F687}",
      microphone: "\u{1F3A4}",
      microscope: "\u{1F52C}",
      milk_glass: "\u{1F95B}",
      milky_way: "\u{1F30C}",
      minibus: "\u{1F690}",
      minidisc: "\u{1F4BD}",
      mobile_phone_off: "\u{1F4F4}",
      money_mouth_face: "\u{1F911}",
      money_with_wings: "\u{1F4B8}",
      moneybag: "\u{1F4B0}",
      monkey: "\u{1F412}",
      monkey_face: "\u{1F435}",
      monorail: "\u{1F69D}",
      moon: "\u{1F314}",
      mortar_board: "\u{1F393}",
      mosque: "\u{1F54C}",
      motor_boat: "\u{1F6E5}",
      motor_scooter: "\u{1F6F5}",
      motorcycle: "\u{1F3CD}",
      motorway: "\u{1F6E3}",
      mount_fuji: "\u{1F5FB}",
      mountain: "\u26F0",
      mountain_biking_man: "\u{1F6B5}",
      mountain_biking_woman: "\u{1F6B5}&zwj;\u2640\uFE0F",
      mountain_cableway: "\u{1F6A0}",
      mountain_railway: "\u{1F69E}",
      mountain_snow: "\u{1F3D4}",
      mouse: "\u{1F42D}",
      mouse2: "\u{1F401}",
      movie_camera: "\u{1F3A5}",
      moyai: "\u{1F5FF}",
      mrs_claus: "\u{1F936}",
      muscle: "\u{1F4AA}",
      mushroom: "\u{1F344}",
      musical_keyboard: "\u{1F3B9}",
      musical_note: "\u{1F3B5}",
      musical_score: "\u{1F3BC}",
      mute: "\u{1F507}",
      nail_care: "\u{1F485}",
      name_badge: "\u{1F4DB}",
      national_park: "\u{1F3DE}",
      nauseated_face: "\u{1F922}",
      necktie: "\u{1F454}",
      negative_squared_cross_mark: "\u274E",
      nerd_face: "\u{1F913}",
      neutral_face: "\u{1F610}",
      new: "\u{1F195}",
      new_moon: "\u{1F311}",
      new_moon_with_face: "\u{1F31A}",
      newspaper: "\u{1F4F0}",
      newspaper_roll: "\u{1F5DE}",
      next_track_button: "\u23ED",
      ng: "\u{1F196}",
      no_good_man: "\u{1F645}&zwj;\u2642\uFE0F",
      no_good_woman: "\u{1F645}",
      night_with_stars: "\u{1F303}",
      no_bell: "\u{1F515}",
      no_bicycles: "\u{1F6B3}",
      no_entry: "\u26D4\uFE0F",
      no_entry_sign: "\u{1F6AB}",
      no_mobile_phones: "\u{1F4F5}",
      no_mouth: "\u{1F636}",
      no_pedestrians: "\u{1F6B7}",
      no_smoking: "\u{1F6AD}",
      "non-potable_water": "\u{1F6B1}",
      nose: "\u{1F443}",
      notebook: "\u{1F4D3}",
      notebook_with_decorative_cover: "\u{1F4D4}",
      notes: "\u{1F3B6}",
      nut_and_bolt: "\u{1F529}",
      o: "\u2B55\uFE0F",
      o2: "\u{1F17E}\uFE0F",
      ocean: "\u{1F30A}",
      octopus: "\u{1F419}",
      oden: "\u{1F362}",
      office: "\u{1F3E2}",
      oil_drum: "\u{1F6E2}",
      ok: "\u{1F197}",
      ok_hand: "\u{1F44C}",
      ok_man: "\u{1F646}&zwj;\u2642\uFE0F",
      ok_woman: "\u{1F646}",
      old_key: "\u{1F5DD}",
      older_man: "\u{1F474}",
      older_woman: "\u{1F475}",
      om: "\u{1F549}",
      on: "\u{1F51B}",
      oncoming_automobile: "\u{1F698}",
      oncoming_bus: "\u{1F68D}",
      oncoming_police_car: "\u{1F694}",
      oncoming_taxi: "\u{1F696}",
      open_file_folder: "\u{1F4C2}",
      open_hands: "\u{1F450}",
      open_mouth: "\u{1F62E}",
      open_umbrella: "\u2602\uFE0F",
      ophiuchus: "\u26CE",
      orange_book: "\u{1F4D9}",
      orthodox_cross: "\u2626\uFE0F",
      outbox_tray: "\u{1F4E4}",
      owl: "\u{1F989}",
      ox: "\u{1F402}",
      package: "\u{1F4E6}",
      page_facing_up: "\u{1F4C4}",
      page_with_curl: "\u{1F4C3}",
      pager: "\u{1F4DF}",
      paintbrush: "\u{1F58C}",
      palm_tree: "\u{1F334}",
      pancakes: "\u{1F95E}",
      panda_face: "\u{1F43C}",
      paperclip: "\u{1F4CE}",
      paperclips: "\u{1F587}",
      parasol_on_ground: "\u26F1",
      parking: "\u{1F17F}\uFE0F",
      part_alternation_mark: "\u303D\uFE0F",
      partly_sunny: "\u26C5\uFE0F",
      passenger_ship: "\u{1F6F3}",
      passport_control: "\u{1F6C2}",
      pause_button: "\u23F8",
      peace_symbol: "\u262E\uFE0F",
      peach: "\u{1F351}",
      peanuts: "\u{1F95C}",
      pear: "\u{1F350}",
      pen: "\u{1F58A}",
      pencil2: "\u270F\uFE0F",
      penguin: "\u{1F427}",
      pensive: "\u{1F614}",
      performing_arts: "\u{1F3AD}",
      persevere: "\u{1F623}",
      person_fencing: "\u{1F93A}",
      pouting_woman: "\u{1F64E}",
      phone: "\u260E\uFE0F",
      pick: "\u26CF",
      pig: "\u{1F437}",
      pig2: "\u{1F416}",
      pig_nose: "\u{1F43D}",
      pill: "\u{1F48A}",
      pineapple: "\u{1F34D}",
      ping_pong: "\u{1F3D3}",
      pisces: "\u2653\uFE0F",
      pizza: "\u{1F355}",
      place_of_worship: "\u{1F6D0}",
      plate_with_cutlery: "\u{1F37D}",
      play_or_pause_button: "\u23EF",
      point_down: "\u{1F447}",
      point_left: "\u{1F448}",
      point_right: "\u{1F449}",
      point_up: "\u261D\uFE0F",
      point_up_2: "\u{1F446}",
      police_car: "\u{1F693}",
      policewoman: "\u{1F46E}&zwj;\u2640\uFE0F",
      poodle: "\u{1F429}",
      popcorn: "\u{1F37F}",
      post_office: "\u{1F3E3}",
      postal_horn: "\u{1F4EF}",
      postbox: "\u{1F4EE}",
      potable_water: "\u{1F6B0}",
      potato: "\u{1F954}",
      pouch: "\u{1F45D}",
      poultry_leg: "\u{1F357}",
      pound: "\u{1F4B7}",
      rage: "\u{1F621}",
      pouting_cat: "\u{1F63E}",
      pouting_man: "\u{1F64E}&zwj;\u2642\uFE0F",
      pray: "\u{1F64F}",
      prayer_beads: "\u{1F4FF}",
      pregnant_woman: "\u{1F930}",
      previous_track_button: "\u23EE",
      prince: "\u{1F934}",
      princess: "\u{1F478}",
      printer: "\u{1F5A8}",
      purple_heart: "\u{1F49C}",
      purse: "\u{1F45B}",
      pushpin: "\u{1F4CC}",
      put_litter_in_its_place: "\u{1F6AE}",
      question: "\u2753",
      rabbit: "\u{1F430}",
      rabbit2: "\u{1F407}",
      racehorse: "\u{1F40E}",
      racing_car: "\u{1F3CE}",
      radio: "\u{1F4FB}",
      radio_button: "\u{1F518}",
      radioactive: "\u2622\uFE0F",
      railway_car: "\u{1F683}",
      railway_track: "\u{1F6E4}",
      rainbow: "\u{1F308}",
      rainbow_flag: "\u{1F3F3}\uFE0F&zwj;\u{1F308}",
      raised_back_of_hand: "\u{1F91A}",
      raised_hand_with_fingers_splayed: "\u{1F590}",
      raised_hands: "\u{1F64C}",
      raising_hand_woman: "\u{1F64B}",
      raising_hand_man: "\u{1F64B}&zwj;\u2642\uFE0F",
      ram: "\u{1F40F}",
      ramen: "\u{1F35C}",
      rat: "\u{1F400}",
      record_button: "\u23FA",
      recycle: "\u267B\uFE0F",
      red_circle: "\u{1F534}",
      registered: "\xAE\uFE0F",
      relaxed: "\u263A\uFE0F",
      relieved: "\u{1F60C}",
      reminder_ribbon: "\u{1F397}",
      repeat: "\u{1F501}",
      repeat_one: "\u{1F502}",
      rescue_worker_helmet: "\u26D1",
      restroom: "\u{1F6BB}",
      revolving_hearts: "\u{1F49E}",
      rewind: "\u23EA",
      rhinoceros: "\u{1F98F}",
      ribbon: "\u{1F380}",
      rice: "\u{1F35A}",
      rice_ball: "\u{1F359}",
      rice_cracker: "\u{1F358}",
      rice_scene: "\u{1F391}",
      right_anger_bubble: "\u{1F5EF}",
      ring: "\u{1F48D}",
      robot: "\u{1F916}",
      rocket: "\u{1F680}",
      rofl: "\u{1F923}",
      roll_eyes: "\u{1F644}",
      roller_coaster: "\u{1F3A2}",
      rooster: "\u{1F413}",
      rose: "\u{1F339}",
      rosette: "\u{1F3F5}",
      rotating_light: "\u{1F6A8}",
      round_pushpin: "\u{1F4CD}",
      rowing_man: "\u{1F6A3}",
      rowing_woman: "\u{1F6A3}&zwj;\u2640\uFE0F",
      rugby_football: "\u{1F3C9}",
      running_man: "\u{1F3C3}",
      running_shirt_with_sash: "\u{1F3BD}",
      running_woman: "\u{1F3C3}&zwj;\u2640\uFE0F",
      sa: "\u{1F202}\uFE0F",
      sagittarius: "\u2650\uFE0F",
      sake: "\u{1F376}",
      sandal: "\u{1F461}",
      santa: "\u{1F385}",
      satellite: "\u{1F4E1}",
      saxophone: "\u{1F3B7}",
      school: "\u{1F3EB}",
      school_satchel: "\u{1F392}",
      scissors: "\u2702\uFE0F",
      scorpion: "\u{1F982}",
      scorpius: "\u264F\uFE0F",
      scream: "\u{1F631}",
      scream_cat: "\u{1F640}",
      scroll: "\u{1F4DC}",
      seat: "\u{1F4BA}",
      secret: "\u3299\uFE0F",
      see_no_evil: "\u{1F648}",
      seedling: "\u{1F331}",
      selfie: "\u{1F933}",
      shallow_pan_of_food: "\u{1F958}",
      shamrock: "\u2618\uFE0F",
      shark: "\u{1F988}",
      shaved_ice: "\u{1F367}",
      sheep: "\u{1F411}",
      shell: "\u{1F41A}",
      shield: "\u{1F6E1}",
      shinto_shrine: "\u26E9",
      ship: "\u{1F6A2}",
      shirt: "\u{1F455}",
      shopping: "\u{1F6CD}",
      shopping_cart: "\u{1F6D2}",
      shower: "\u{1F6BF}",
      shrimp: "\u{1F990}",
      signal_strength: "\u{1F4F6}",
      six_pointed_star: "\u{1F52F}",
      ski: "\u{1F3BF}",
      skier: "\u26F7",
      skull: "\u{1F480}",
      skull_and_crossbones: "\u2620\uFE0F",
      sleeping: "\u{1F634}",
      sleeping_bed: "\u{1F6CC}",
      sleepy: "\u{1F62A}",
      slightly_frowning_face: "\u{1F641}",
      slightly_smiling_face: "\u{1F642}",
      slot_machine: "\u{1F3B0}",
      small_airplane: "\u{1F6E9}",
      small_blue_diamond: "\u{1F539}",
      small_orange_diamond: "\u{1F538}",
      small_red_triangle: "\u{1F53A}",
      small_red_triangle_down: "\u{1F53B}",
      smile: "\u{1F604}",
      smile_cat: "\u{1F638}",
      smiley: "\u{1F603}",
      smiley_cat: "\u{1F63A}",
      smiling_imp: "\u{1F608}",
      smirk: "\u{1F60F}",
      smirk_cat: "\u{1F63C}",
      smoking: "\u{1F6AC}",
      snail: "\u{1F40C}",
      snake: "\u{1F40D}",
      sneezing_face: "\u{1F927}",
      snowboarder: "\u{1F3C2}",
      snowflake: "\u2744\uFE0F",
      snowman: "\u26C4\uFE0F",
      snowman_with_snow: "\u2603\uFE0F",
      sob: "\u{1F62D}",
      soccer: "\u26BD\uFE0F",
      soon: "\u{1F51C}",
      sos: "\u{1F198}",
      sound: "\u{1F509}",
      space_invader: "\u{1F47E}",
      spades: "\u2660\uFE0F",
      spaghetti: "\u{1F35D}",
      sparkle: "\u2747\uFE0F",
      sparkler: "\u{1F387}",
      sparkles: "\u2728",
      sparkling_heart: "\u{1F496}",
      speak_no_evil: "\u{1F64A}",
      speaker: "\u{1F508}",
      speaking_head: "\u{1F5E3}",
      speech_balloon: "\u{1F4AC}",
      speedboat: "\u{1F6A4}",
      spider: "\u{1F577}",
      spider_web: "\u{1F578}",
      spiral_calendar: "\u{1F5D3}",
      spiral_notepad: "\u{1F5D2}",
      spoon: "\u{1F944}",
      squid: "\u{1F991}",
      stadium: "\u{1F3DF}",
      star: "\u2B50\uFE0F",
      star2: "\u{1F31F}",
      star_and_crescent: "\u262A\uFE0F",
      star_of_david: "\u2721\uFE0F",
      stars: "\u{1F320}",
      station: "\u{1F689}",
      statue_of_liberty: "\u{1F5FD}",
      steam_locomotive: "\u{1F682}",
      stew: "\u{1F372}",
      stop_button: "\u23F9",
      stop_sign: "\u{1F6D1}",
      stopwatch: "\u23F1",
      straight_ruler: "\u{1F4CF}",
      strawberry: "\u{1F353}",
      stuck_out_tongue: "\u{1F61B}",
      stuck_out_tongue_closed_eyes: "\u{1F61D}",
      stuck_out_tongue_winking_eye: "\u{1F61C}",
      studio_microphone: "\u{1F399}",
      stuffed_flatbread: "\u{1F959}",
      sun_behind_large_cloud: "\u{1F325}",
      sun_behind_rain_cloud: "\u{1F326}",
      sun_behind_small_cloud: "\u{1F324}",
      sun_with_face: "\u{1F31E}",
      sunflower: "\u{1F33B}",
      sunglasses: "\u{1F60E}",
      sunny: "\u2600\uFE0F",
      sunrise: "\u{1F305}",
      sunrise_over_mountains: "\u{1F304}",
      surfing_man: "\u{1F3C4}",
      surfing_woman: "\u{1F3C4}&zwj;\u2640\uFE0F",
      sushi: "\u{1F363}",
      suspension_railway: "\u{1F69F}",
      sweat: "\u{1F613}",
      sweat_drops: "\u{1F4A6}",
      sweat_smile: "\u{1F605}",
      sweet_potato: "\u{1F360}",
      swimming_man: "\u{1F3CA}",
      swimming_woman: "\u{1F3CA}&zwj;\u2640\uFE0F",
      symbols: "\u{1F523}",
      synagogue: "\u{1F54D}",
      syringe: "\u{1F489}",
      taco: "\u{1F32E}",
      tada: "\u{1F389}",
      tanabata_tree: "\u{1F38B}",
      taurus: "\u2649\uFE0F",
      taxi: "\u{1F695}",
      tea: "\u{1F375}",
      telephone_receiver: "\u{1F4DE}",
      telescope: "\u{1F52D}",
      tennis: "\u{1F3BE}",
      tent: "\u26FA\uFE0F",
      thermometer: "\u{1F321}",
      thinking: "\u{1F914}",
      thought_balloon: "\u{1F4AD}",
      ticket: "\u{1F3AB}",
      tickets: "\u{1F39F}",
      tiger: "\u{1F42F}",
      tiger2: "\u{1F405}",
      timer_clock: "\u23F2",
      tipping_hand_man: "\u{1F481}&zwj;\u2642\uFE0F",
      tired_face: "\u{1F62B}",
      tm: "\u2122\uFE0F",
      toilet: "\u{1F6BD}",
      tokyo_tower: "\u{1F5FC}",
      tomato: "\u{1F345}",
      tongue: "\u{1F445}",
      top: "\u{1F51D}",
      tophat: "\u{1F3A9}",
      tornado: "\u{1F32A}",
      trackball: "\u{1F5B2}",
      tractor: "\u{1F69C}",
      traffic_light: "\u{1F6A5}",
      train: "\u{1F68B}",
      train2: "\u{1F686}",
      tram: "\u{1F68A}",
      triangular_flag_on_post: "\u{1F6A9}",
      triangular_ruler: "\u{1F4D0}",
      trident: "\u{1F531}",
      triumph: "\u{1F624}",
      trolleybus: "\u{1F68E}",
      trophy: "\u{1F3C6}",
      tropical_drink: "\u{1F379}",
      tropical_fish: "\u{1F420}",
      truck: "\u{1F69A}",
      trumpet: "\u{1F3BA}",
      tulip: "\u{1F337}",
      tumbler_glass: "\u{1F943}",
      turkey: "\u{1F983}",
      turtle: "\u{1F422}",
      tv: "\u{1F4FA}",
      twisted_rightwards_arrows: "\u{1F500}",
      two_hearts: "\u{1F495}",
      two_men_holding_hands: "\u{1F46C}",
      two_women_holding_hands: "\u{1F46D}",
      u5272: "\u{1F239}",
      u5408: "\u{1F234}",
      u55b6: "\u{1F23A}",
      u6307: "\u{1F22F}\uFE0F",
      u6708: "\u{1F237}\uFE0F",
      u6709: "\u{1F236}",
      u6e80: "\u{1F235}",
      u7121: "\u{1F21A}\uFE0F",
      u7533: "\u{1F238}",
      u7981: "\u{1F232}",
      u7a7a: "\u{1F233}",
      umbrella: "\u2614\uFE0F",
      unamused: "\u{1F612}",
      underage: "\u{1F51E}",
      unicorn: "\u{1F984}",
      unlock: "\u{1F513}",
      up: "\u{1F199}",
      upside_down_face: "\u{1F643}",
      v: "\u270C\uFE0F",
      vertical_traffic_light: "\u{1F6A6}",
      vhs: "\u{1F4FC}",
      vibration_mode: "\u{1F4F3}",
      video_camera: "\u{1F4F9}",
      video_game: "\u{1F3AE}",
      violin: "\u{1F3BB}",
      virgo: "\u264D\uFE0F",
      volcano: "\u{1F30B}",
      volleyball: "\u{1F3D0}",
      vs: "\u{1F19A}",
      vulcan_salute: "\u{1F596}",
      walking_man: "\u{1F6B6}",
      walking_woman: "\u{1F6B6}&zwj;\u2640\uFE0F",
      waning_crescent_moon: "\u{1F318}",
      waning_gibbous_moon: "\u{1F316}",
      warning: "\u26A0\uFE0F",
      wastebasket: "\u{1F5D1}",
      watch: "\u231A\uFE0F",
      water_buffalo: "\u{1F403}",
      watermelon: "\u{1F349}",
      wave: "\u{1F44B}",
      wavy_dash: "\u3030\uFE0F",
      waxing_crescent_moon: "\u{1F312}",
      wc: "\u{1F6BE}",
      weary: "\u{1F629}",
      wedding: "\u{1F492}",
      weight_lifting_man: "\u{1F3CB}\uFE0F",
      weight_lifting_woman: "\u{1F3CB}\uFE0F&zwj;\u2640\uFE0F",
      whale: "\u{1F433}",
      whale2: "\u{1F40B}",
      wheel_of_dharma: "\u2638\uFE0F",
      wheelchair: "\u267F\uFE0F",
      white_check_mark: "\u2705",
      white_circle: "\u26AA\uFE0F",
      white_flag: "\u{1F3F3}\uFE0F",
      white_flower: "\u{1F4AE}",
      white_large_square: "\u2B1C\uFE0F",
      white_medium_small_square: "\u25FD\uFE0F",
      white_medium_square: "\u25FB\uFE0F",
      white_small_square: "\u25AB\uFE0F",
      white_square_button: "\u{1F533}",
      wilted_flower: "\u{1F940}",
      wind_chime: "\u{1F390}",
      wind_face: "\u{1F32C}",
      wine_glass: "\u{1F377}",
      wink: "\u{1F609}",
      wolf: "\u{1F43A}",
      woman: "\u{1F469}",
      woman_artist: "\u{1F469}&zwj;\u{1F3A8}",
      woman_astronaut: "\u{1F469}&zwj;\u{1F680}",
      woman_cartwheeling: "\u{1F938}&zwj;\u2640\uFE0F",
      woman_cook: "\u{1F469}&zwj;\u{1F373}",
      woman_facepalming: "\u{1F926}&zwj;\u2640\uFE0F",
      woman_factory_worker: "\u{1F469}&zwj;\u{1F3ED}",
      woman_farmer: "\u{1F469}&zwj;\u{1F33E}",
      woman_firefighter: "\u{1F469}&zwj;\u{1F692}",
      woman_health_worker: "\u{1F469}&zwj;\u2695\uFE0F",
      woman_judge: "\u{1F469}&zwj;\u2696\uFE0F",
      woman_juggling: "\u{1F939}&zwj;\u2640\uFE0F",
      woman_mechanic: "\u{1F469}&zwj;\u{1F527}",
      woman_office_worker: "\u{1F469}&zwj;\u{1F4BC}",
      woman_pilot: "\u{1F469}&zwj;\u2708\uFE0F",
      woman_playing_handball: "\u{1F93E}&zwj;\u2640\uFE0F",
      woman_playing_water_polo: "\u{1F93D}&zwj;\u2640\uFE0F",
      woman_scientist: "\u{1F469}&zwj;\u{1F52C}",
      woman_shrugging: "\u{1F937}&zwj;\u2640\uFE0F",
      woman_singer: "\u{1F469}&zwj;\u{1F3A4}",
      woman_student: "\u{1F469}&zwj;\u{1F393}",
      woman_teacher: "\u{1F469}&zwj;\u{1F3EB}",
      woman_technologist: "\u{1F469}&zwj;\u{1F4BB}",
      woman_with_turban: "\u{1F473}&zwj;\u2640\uFE0F",
      womans_clothes: "\u{1F45A}",
      womans_hat: "\u{1F452}",
      women_wrestling: "\u{1F93C}&zwj;\u2640\uFE0F",
      womens: "\u{1F6BA}",
      world_map: "\u{1F5FA}",
      worried: "\u{1F61F}",
      wrench: "\u{1F527}",
      writing_hand: "\u270D\uFE0F",
      x: "\u274C",
      yellow_heart: "\u{1F49B}",
      yen: "\u{1F4B4}",
      yin_yang: "\u262F\uFE0F",
      yum: "\u{1F60B}",
      zap: "\u26A1\uFE0F",
      zipper_mouth_face: "\u{1F910}",
      zzz: "\u{1F4A4}",
      octocat: '<img alt=":octocat:" height="20" width="20" align="absmiddle" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">',
      showdown: `<span style="font-family: 'Anonymous Pro', monospace; text-decoration: underline; text-decoration-style: dashed; text-decoration-color: #3e8b8a;text-underline-position: under;">S</span>`
    };
    showdown2.Converter = function(converterOptions) {
      var options = {}, langExtensions = [], outputModifiers = [], listeners = {}, setConvFlavor = setFlavor, metadata = {
        parsed: {},
        raw: "",
        format: ""
      };
      _constructor();
      function _constructor() {
        converterOptions = converterOptions || {};
        for (var gOpt in globalOptions) {
          if (globalOptions.hasOwnProperty(gOpt)) {
            options[gOpt] = globalOptions[gOpt];
          }
        }
        if (typeof converterOptions === "object") {
          for (var opt in converterOptions) {
            if (converterOptions.hasOwnProperty(opt)) {
              options[opt] = converterOptions[opt];
            }
          }
        } else {
          throw Error("Converter expects the passed parameter to be an object, but " + typeof converterOptions + " was passed instead.");
        }
        if (options.extensions) {
          showdown2.helper.forEach(options.extensions, _parseExtension);
        }
      }
      function _parseExtension(ext, name) {
        name = name || null;
        if (showdown2.helper.isString(ext)) {
          ext = showdown2.helper.stdExtName(ext);
          name = ext;
          if (showdown2.extensions[ext]) {
            console.warn("DEPRECATION WARNING: " + ext + " is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!");
            legacyExtensionLoading(showdown2.extensions[ext], ext);
            return;
          } else if (!showdown2.helper.isUndefined(extensions[ext])) {
            ext = extensions[ext];
          } else {
            throw Error('Extension "' + ext + '" could not be loaded. It was either not found or is not a valid extension.');
          }
        }
        if (typeof ext === "function") {
          ext = ext();
        }
        if (!showdown2.helper.isArray(ext)) {
          ext = [ext];
        }
        var validExt = validate(ext, name);
        if (!validExt.valid) {
          throw Error(validExt.error);
        }
        for (var i2 = 0; i2 < ext.length; ++i2) {
          switch (ext[i2].type) {
            case "lang":
              langExtensions.push(ext[i2]);
              break;
            case "output":
              outputModifiers.push(ext[i2]);
              break;
          }
          if (ext[i2].hasOwnProperty("listeners")) {
            for (var ln in ext[i2].listeners) {
              if (ext[i2].listeners.hasOwnProperty(ln)) {
                listen(ln, ext[i2].listeners[ln]);
              }
            }
          }
        }
      }
      function legacyExtensionLoading(ext, name) {
        if (typeof ext === "function") {
          ext = ext(new showdown2.Converter());
        }
        if (!showdown2.helper.isArray(ext)) {
          ext = [ext];
        }
        var valid = validate(ext, name);
        if (!valid.valid) {
          throw Error(valid.error);
        }
        for (var i2 = 0; i2 < ext.length; ++i2) {
          switch (ext[i2].type) {
            case "lang":
              langExtensions.push(ext[i2]);
              break;
            case "output":
              outputModifiers.push(ext[i2]);
              break;
            default:
              throw Error("Extension loader error: Type unrecognized!!!");
          }
        }
      }
      function listen(name, callback) {
        if (!showdown2.helper.isString(name)) {
          throw Error("Invalid argument in converter.listen() method: name must be a string, but " + typeof name + " given");
        }
        if (typeof callback !== "function") {
          throw Error("Invalid argument in converter.listen() method: callback must be a function, but " + typeof callback + " given");
        }
        if (!listeners.hasOwnProperty(name)) {
          listeners[name] = [];
        }
        listeners[name].push(callback);
      }
      function rTrimInputText(text) {
        var rsp = text.match(/^\s*/)[0].length, rgx = new RegExp("^\\s{0," + rsp + "}", "gm");
        return text.replace(rgx, "");
      }
      this._dispatch = function dispatch(evtName, text, options2, globals) {
        if (listeners.hasOwnProperty(evtName)) {
          for (var ei = 0; ei < listeners[evtName].length; ++ei) {
            var nText = listeners[evtName][ei](evtName, text, this, options2, globals);
            if (nText && typeof nText !== "undefined") {
              text = nText;
            }
          }
        }
        return text;
      };
      this.listen = function(name, callback) {
        listen(name, callback);
        return this;
      };
      this.makeHtml = function(text) {
        if (!text) {
          return text;
        }
        var globals = {
          gHtmlBlocks: [],
          gHtmlMdBlocks: [],
          gHtmlSpans: [],
          gUrls: {},
          gTitles: {},
          gDimensions: {},
          gListLevel: 0,
          hashLinkCounts: {},
          langExtensions,
          outputModifiers,
          converter: this,
          ghCodeBlocks: [],
          metadata: {
            parsed: {},
            raw: "",
            format: ""
          }
        };
        text = text.replace(/¨/g, "\xA8T");
        text = text.replace(/\$/g, "\xA8D");
        text = text.replace(/\r\n/g, "\n");
        text = text.replace(/\r/g, "\n");
        text = text.replace(/\u00A0/g, "&nbsp;");
        if (options.smartIndentationFix) {
          text = rTrimInputText(text);
        }
        text = "\n\n" + text + "\n\n";
        text = showdown2.subParser("detab")(text, options, globals);
        text = text.replace(/^[ \t]+$/mg, "");
        showdown2.helper.forEach(langExtensions, function(ext) {
          text = showdown2.subParser("runExtension")(ext, text, options, globals);
        });
        text = showdown2.subParser("metadata")(text, options, globals);
        text = showdown2.subParser("hashPreCodeTags")(text, options, globals);
        text = showdown2.subParser("githubCodeBlocks")(text, options, globals);
        text = showdown2.subParser("hashHTMLBlocks")(text, options, globals);
        text = showdown2.subParser("hashCodeTags")(text, options, globals);
        text = showdown2.subParser("stripLinkDefinitions")(text, options, globals);
        text = showdown2.subParser("blockGamut")(text, options, globals);
        text = showdown2.subParser("unhashHTMLSpans")(text, options, globals);
        text = showdown2.subParser("unescapeSpecialChars")(text, options, globals);
        text = text.replace(/¨D/g, "$$");
        text = text.replace(/¨T/g, "\xA8");
        text = showdown2.subParser("completeHTMLDocument")(text, options, globals);
        showdown2.helper.forEach(outputModifiers, function(ext) {
          text = showdown2.subParser("runExtension")(ext, text, options, globals);
        });
        metadata = globals.metadata;
        return text;
      };
      this.makeMarkdown = this.makeMd = function(src, HTMLParser) {
        src = src.replace(/\r\n/g, "\n");
        src = src.replace(/\r/g, "\n");
        src = src.replace(/>[ \t]+</, ">\xA8NBSP;<");
        if (!HTMLParser) {
          if (window && window.document) {
            HTMLParser = window.document;
          } else {
            throw new Error("HTMLParser is undefined. If in a webworker or nodejs environment, you need to provide a WHATWG DOM and HTML such as JSDOM");
          }
        }
        var doc = HTMLParser.createElement("div");
        doc.innerHTML = src;
        var globals = {
          preList: substitutePreCodeTags(doc)
        };
        clean(doc);
        var nodes = doc.childNodes, mdDoc = "";
        for (var i2 = 0; i2 < nodes.length; i2++) {
          mdDoc += showdown2.subParser("makeMarkdown.node")(nodes[i2], globals);
        }
        function clean(node) {
          for (var n3 = 0; n3 < node.childNodes.length; ++n3) {
            var child = node.childNodes[n3];
            if (child.nodeType === 3) {
              if (!/\S/.test(child.nodeValue)) {
                node.removeChild(child);
                --n3;
              } else {
                child.nodeValue = child.nodeValue.split("\n").join(" ");
                child.nodeValue = child.nodeValue.replace(/(\s)+/g, "$1");
              }
            } else if (child.nodeType === 1) {
              clean(child);
            }
          }
        }
        function substitutePreCodeTags(doc2) {
          var pres = doc2.querySelectorAll("pre"), presPH = [];
          for (var i3 = 0; i3 < pres.length; ++i3) {
            if (pres[i3].childElementCount === 1 && pres[i3].firstChild.tagName.toLowerCase() === "code") {
              var content = pres[i3].firstChild.innerHTML.trim(), language = pres[i3].firstChild.getAttribute("data-language") || "";
              if (language === "") {
                var classes = pres[i3].firstChild.className.split(" ");
                for (var c2 = 0; c2 < classes.length; ++c2) {
                  var matches = classes[c2].match(/^language-(.+)$/);
                  if (matches !== null) {
                    language = matches[1];
                    break;
                  }
                }
              }
              content = showdown2.helper.unescapeHTMLEntities(content);
              presPH.push(content);
              pres[i3].outerHTML = '<precode language="' + language + '" precodenum="' + i3.toString() + '"></precode>';
            } else {
              presPH.push(pres[i3].innerHTML);
              pres[i3].innerHTML = "";
              pres[i3].setAttribute("prenum", i3.toString());
            }
          }
          return presPH;
        }
        return mdDoc;
      };
      this.setOption = function(key, value) {
        options[key] = value;
      };
      this.getOption = function(key) {
        return options[key];
      };
      this.getOptions = function() {
        return options;
      };
      this.addExtension = function(extension, name) {
        name = name || null;
        _parseExtension(extension, name);
      };
      this.useExtension = function(extensionName) {
        _parseExtension(extensionName);
      };
      this.setFlavor = function(name) {
        if (!flavor.hasOwnProperty(name)) {
          throw Error(name + " flavor was not found");
        }
        var preset = flavor[name];
        setConvFlavor = name;
        for (var option in preset) {
          if (preset.hasOwnProperty(option)) {
            options[option] = preset[option];
          }
        }
      };
      this.getFlavor = function() {
        return setConvFlavor;
      };
      this.removeExtension = function(extension) {
        if (!showdown2.helper.isArray(extension)) {
          extension = [extension];
        }
        for (var a2 = 0; a2 < extension.length; ++a2) {
          var ext = extension[a2];
          for (var i2 = 0; i2 < langExtensions.length; ++i2) {
            if (langExtensions[i2] === ext) {
              langExtensions[i2].splice(i2, 1);
            }
          }
          for (var ii = 0; ii < outputModifiers.length; ++i2) {
            if (outputModifiers[ii] === ext) {
              outputModifiers[ii].splice(i2, 1);
            }
          }
        }
      };
      this.getAllExtensions = function() {
        return {
          language: langExtensions,
          output: outputModifiers
        };
      };
      this.getMetadata = function(raw) {
        if (raw) {
          return metadata.raw;
        } else {
          return metadata.parsed;
        }
      };
      this.getMetadataFormat = function() {
        return metadata.format;
      };
      this._setMetadataPair = function(key, value) {
        metadata.parsed[key] = value;
      };
      this._setMetadataFormat = function(format) {
        metadata.format = format;
      };
      this._setMetadataRaw = function(raw) {
        metadata.raw = raw;
      };
    };
    showdown2.subParser("anchors", function(text, options, globals) {
      text = globals.converter._dispatch("anchors.before", text, options, globals);
      var writeAnchorTag = function(wholeMatch, linkText, linkId, url, m5, m6, title) {
        if (showdown2.helper.isUndefined(title)) {
          title = "";
        }
        linkId = linkId.toLowerCase();
        if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
          url = "";
        } else if (!url) {
          if (!linkId) {
            linkId = linkText.toLowerCase().replace(/ ?\n/g, " ");
          }
          url = "#" + linkId;
          if (!showdown2.helper.isUndefined(globals.gUrls[linkId])) {
            url = globals.gUrls[linkId];
            if (!showdown2.helper.isUndefined(globals.gTitles[linkId])) {
              title = globals.gTitles[linkId];
            }
          } else {
            return wholeMatch;
          }
        }
        url = url.replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
        var result = '<a href="' + url + '"';
        if (title !== "" && title !== null) {
          title = title.replace(/"/g, "&quot;");
          title = title.replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
          result += ' title="' + title + '"';
        }
        if (options.openLinksInNewWindow && !/^#/.test(url)) {
          result += ' rel="noopener noreferrer" target="\xA8E95Eblank"';
        }
        result += ">" + linkText + "</a>";
        return result;
      };
      text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g, writeAnchorTag);
      text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, writeAnchorTag);
      text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, writeAnchorTag);
      text = text.replace(/\[([^\[\]]+)]()()()()()/g, writeAnchorTag);
      if (options.ghMentions) {
        text = text.replace(/(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d.-]+?[a-z\d]+)*))/gmi, function(wm, st, escape, mentions, username) {
          if (escape === "\\") {
            return st + mentions;
          }
          if (!showdown2.helper.isString(options.ghMentionsLink)) {
            throw new Error("ghMentionsLink option must be a string");
          }
          var lnk = options.ghMentionsLink.replace(/\{u}/g, username), target = "";
          if (options.openLinksInNewWindow) {
            target = ' rel="noopener noreferrer" target="\xA8E95Eblank"';
          }
          return st + '<a href="' + lnk + '"' + target + ">" + mentions + "</a>";
        });
      }
      text = globals.converter._dispatch("anchors.after", text, options, globals);
      return text;
    });
    var simpleURLRegex = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi, simpleURLRegex2 = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi, delimUrlRegex = /()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi, simpleMailRegex = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gmi, delimMailRegex = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, replaceLink = function(options) {
      return function(wm, leadingMagicChars, link, m2, m3, trailingPunctuation, trailingMagicChars) {
        link = link.replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
        var lnkTxt = link, append = "", target = "", lmc = leadingMagicChars || "", tmc = trailingMagicChars || "";
        if (/^www\./i.test(link)) {
          link = link.replace(/^www\./i, "http://www.");
        }
        if (options.excludeTrailingPunctuationFromURLs && trailingPunctuation) {
          append = trailingPunctuation;
        }
        if (options.openLinksInNewWindow) {
          target = ' rel="noopener noreferrer" target="\xA8E95Eblank"';
        }
        return lmc + '<a href="' + link + '"' + target + ">" + lnkTxt + "</a>" + append + tmc;
      };
    }, replaceMail = function(options, globals) {
      return function(wholeMatch, b2, mail) {
        var href = "mailto:";
        b2 = b2 || "";
        mail = showdown2.subParser("unescapeSpecialChars")(mail, options, globals);
        if (options.encodeEmails) {
          href = showdown2.helper.encodeEmailAddress(href + mail);
          mail = showdown2.helper.encodeEmailAddress(mail);
        } else {
          href = href + mail;
        }
        return b2 + '<a href="' + href + '">' + mail + "</a>";
      };
    };
    showdown2.subParser("autoLinks", function(text, options, globals) {
      text = globals.converter._dispatch("autoLinks.before", text, options, globals);
      text = text.replace(delimUrlRegex, replaceLink(options));
      text = text.replace(delimMailRegex, replaceMail(options, globals));
      text = globals.converter._dispatch("autoLinks.after", text, options, globals);
      return text;
    });
    showdown2.subParser("simplifiedAutoLinks", function(text, options, globals) {
      if (!options.simplifiedAutoLink) {
        return text;
      }
      text = globals.converter._dispatch("simplifiedAutoLinks.before", text, options, globals);
      if (options.excludeTrailingPunctuationFromURLs) {
        text = text.replace(simpleURLRegex2, replaceLink(options));
      } else {
        text = text.replace(simpleURLRegex, replaceLink(options));
      }
      text = text.replace(simpleMailRegex, replaceMail(options, globals));
      text = globals.converter._dispatch("simplifiedAutoLinks.after", text, options, globals);
      return text;
    });
    showdown2.subParser("blockGamut", function(text, options, globals) {
      text = globals.converter._dispatch("blockGamut.before", text, options, globals);
      text = showdown2.subParser("blockQuotes")(text, options, globals);
      text = showdown2.subParser("headers")(text, options, globals);
      text = showdown2.subParser("horizontalRule")(text, options, globals);
      text = showdown2.subParser("lists")(text, options, globals);
      text = showdown2.subParser("codeBlocks")(text, options, globals);
      text = showdown2.subParser("tables")(text, options, globals);
      text = showdown2.subParser("hashHTMLBlocks")(text, options, globals);
      text = showdown2.subParser("paragraphs")(text, options, globals);
      text = globals.converter._dispatch("blockGamut.after", text, options, globals);
      return text;
    });
    showdown2.subParser("blockQuotes", function(text, options, globals) {
      text = globals.converter._dispatch("blockQuotes.before", text, options, globals);
      text = text + "\n\n";
      var rgx = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;
      if (options.splitAdjacentBlockquotes) {
        rgx = /^ {0,3}>[\s\S]*?(?:\n\n)/gm;
      }
      text = text.replace(rgx, function(bq) {
        bq = bq.replace(/^[ \t]*>[ \t]?/gm, "");
        bq = bq.replace(/¨0/g, "");
        bq = bq.replace(/^[ \t]+$/gm, "");
        bq = showdown2.subParser("githubCodeBlocks")(bq, options, globals);
        bq = showdown2.subParser("blockGamut")(bq, options, globals);
        bq = bq.replace(/(^|\n)/g, "$1  ");
        bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(wholeMatch, m1) {
          var pre = m1;
          pre = pre.replace(/^  /mg, "\xA80");
          pre = pre.replace(/¨0/g, "");
          return pre;
        });
        return showdown2.subParser("hashBlock")("<blockquote>\n" + bq + "\n</blockquote>", options, globals);
      });
      text = globals.converter._dispatch("blockQuotes.after", text, options, globals);
      return text;
    });
    showdown2.subParser("codeBlocks", function(text, options, globals) {
      text = globals.converter._dispatch("codeBlocks.before", text, options, globals);
      text += "\xA80";
      var pattern = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
      text = text.replace(pattern, function(wholeMatch, m1, m2) {
        var codeblock = m1, nextChar = m2, end = "\n";
        codeblock = showdown2.subParser("outdent")(codeblock, options, globals);
        codeblock = showdown2.subParser("encodeCode")(codeblock, options, globals);
        codeblock = showdown2.subParser("detab")(codeblock, options, globals);
        codeblock = codeblock.replace(/^\n+/g, "");
        codeblock = codeblock.replace(/\n+$/g, "");
        if (options.omitExtraWLInCodeBlocks) {
          end = "";
        }
        codeblock = "<pre><code>" + codeblock + end + "</code></pre>";
        return showdown2.subParser("hashBlock")(codeblock, options, globals) + nextChar;
      });
      text = text.replace(/¨0/, "");
      text = globals.converter._dispatch("codeBlocks.after", text, options, globals);
      return text;
    });
    showdown2.subParser("codeSpans", function(text, options, globals) {
      text = globals.converter._dispatch("codeSpans.before", text, options, globals);
      if (typeof text === "undefined") {
        text = "";
      }
      text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(wholeMatch, m1, m2, m3) {
        var c2 = m3;
        c2 = c2.replace(/^([ \t]*)/g, "");
        c2 = c2.replace(/[ \t]*$/g, "");
        c2 = showdown2.subParser("encodeCode")(c2, options, globals);
        c2 = m1 + "<code>" + c2 + "</code>";
        c2 = showdown2.subParser("hashHTMLSpans")(c2, options, globals);
        return c2;
      });
      text = globals.converter._dispatch("codeSpans.after", text, options, globals);
      return text;
    });
    showdown2.subParser("completeHTMLDocument", function(text, options, globals) {
      if (!options.completeHTMLDocument) {
        return text;
      }
      text = globals.converter._dispatch("completeHTMLDocument.before", text, options, globals);
      var doctype = "html", doctypeParsed = "<!DOCTYPE HTML>\n", title = "", charset = '<meta charset="utf-8">\n', lang = "", metadata = "";
      if (typeof globals.metadata.parsed.doctype !== "undefined") {
        doctypeParsed = "<!DOCTYPE " + globals.metadata.parsed.doctype + ">\n";
        doctype = globals.metadata.parsed.doctype.toString().toLowerCase();
        if (doctype === "html" || doctype === "html5") {
          charset = '<meta charset="utf-8">';
        }
      }
      for (var meta in globals.metadata.parsed) {
        if (globals.metadata.parsed.hasOwnProperty(meta)) {
          switch (meta.toLowerCase()) {
            case "doctype":
              break;
            case "title":
              title = "<title>" + globals.metadata.parsed.title + "</title>\n";
              break;
            case "charset":
              if (doctype === "html" || doctype === "html5") {
                charset = '<meta charset="' + globals.metadata.parsed.charset + '">\n';
              } else {
                charset = '<meta name="charset" content="' + globals.metadata.parsed.charset + '">\n';
              }
              break;
            case "language":
            case "lang":
              lang = ' lang="' + globals.metadata.parsed[meta] + '"';
              metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
              break;
            default:
              metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
          }
        }
      }
      text = doctypeParsed + "<html" + lang + ">\n<head>\n" + title + charset + metadata + "</head>\n<body>\n" + text.trim() + "\n</body>\n</html>";
      text = globals.converter._dispatch("completeHTMLDocument.after", text, options, globals);
      return text;
    });
    showdown2.subParser("detab", function(text, options, globals) {
      text = globals.converter._dispatch("detab.before", text, options, globals);
      text = text.replace(/\t(?=\t)/g, "    ");
      text = text.replace(/\t/g, "\xA8A\xA8B");
      text = text.replace(/¨B(.+?)¨A/g, function(wholeMatch, m1) {
        var leadingText = m1, numSpaces = 4 - leadingText.length % 4;
        for (var i2 = 0; i2 < numSpaces; i2++) {
          leadingText += " ";
        }
        return leadingText;
      });
      text = text.replace(/¨A/g, "    ");
      text = text.replace(/¨B/g, "");
      text = globals.converter._dispatch("detab.after", text, options, globals);
      return text;
    });
    showdown2.subParser("ellipsis", function(text, options, globals) {
      text = globals.converter._dispatch("ellipsis.before", text, options, globals);
      text = text.replace(/\.\.\./g, "\u2026");
      text = globals.converter._dispatch("ellipsis.after", text, options, globals);
      return text;
    });
    showdown2.subParser("emoji", function(text, options, globals) {
      if (!options.emoji) {
        return text;
      }
      text = globals.converter._dispatch("emoji.before", text, options, globals);
      var emojiRgx = /:([\S]+?):/g;
      text = text.replace(emojiRgx, function(wm, emojiCode) {
        if (showdown2.helper.emojis.hasOwnProperty(emojiCode)) {
          return showdown2.helper.emojis[emojiCode];
        }
        return wm;
      });
      text = globals.converter._dispatch("emoji.after", text, options, globals);
      return text;
    });
    showdown2.subParser("encodeAmpsAndAngles", function(text, options, globals) {
      text = globals.converter._dispatch("encodeAmpsAndAngles.before", text, options, globals);
      text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;");
      text = text.replace(/<(?![a-z\/?$!])/gi, "&lt;");
      text = text.replace(/</g, "&lt;");
      text = text.replace(/>/g, "&gt;");
      text = globals.converter._dispatch("encodeAmpsAndAngles.after", text, options, globals);
      return text;
    });
    showdown2.subParser("encodeBackslashEscapes", function(text, options, globals) {
      text = globals.converter._dispatch("encodeBackslashEscapes.before", text, options, globals);
      text = text.replace(/\\(\\)/g, showdown2.helper.escapeCharactersCallback);
      text = text.replace(/\\([`*_{}\[\]()>#+.!~=|-])/g, showdown2.helper.escapeCharactersCallback);
      text = globals.converter._dispatch("encodeBackslashEscapes.after", text, options, globals);
      return text;
    });
    showdown2.subParser("encodeCode", function(text, options, globals) {
      text = globals.converter._dispatch("encodeCode.before", text, options, globals);
      text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/([*_{}\[\]\\=~-])/g, showdown2.helper.escapeCharactersCallback);
      text = globals.converter._dispatch("encodeCode.after", text, options, globals);
      return text;
    });
    showdown2.subParser("escapeSpecialCharsWithinTagAttributes", function(text, options, globals) {
      text = globals.converter._dispatch("escapeSpecialCharsWithinTagAttributes.before", text, options, globals);
      var tags2 = /<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi, comments = /<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi;
      text = text.replace(tags2, function(wholeMatch) {
        return wholeMatch.replace(/(.)<\/?code>(?=.)/g, "$1`").replace(/([\\`*_~=|])/g, showdown2.helper.escapeCharactersCallback);
      });
      text = text.replace(comments, function(wholeMatch) {
        return wholeMatch.replace(/([\\`*_~=|])/g, showdown2.helper.escapeCharactersCallback);
      });
      text = globals.converter._dispatch("escapeSpecialCharsWithinTagAttributes.after", text, options, globals);
      return text;
    });
    showdown2.subParser("githubCodeBlocks", function(text, options, globals) {
      if (!options.ghCodeBlocks) {
        return text;
      }
      text = globals.converter._dispatch("githubCodeBlocks.before", text, options, globals);
      text += "\xA80";
      text = text.replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g, function(wholeMatch, delim, language, codeblock) {
        var end = options.omitExtraWLInCodeBlocks ? "" : "\n";
        codeblock = showdown2.subParser("encodeCode")(codeblock, options, globals);
        codeblock = showdown2.subParser("detab")(codeblock, options, globals);
        codeblock = codeblock.replace(/^\n+/g, "");
        codeblock = codeblock.replace(/\n+$/g, "");
        codeblock = "<pre><code" + (language ? ' class="' + language + " language-" + language + '"' : "") + ">" + codeblock + end + "</code></pre>";
        codeblock = showdown2.subParser("hashBlock")(codeblock, options, globals);
        return "\n\n\xA8G" + (globals.ghCodeBlocks.push({text: wholeMatch, codeblock}) - 1) + "G\n\n";
      });
      text = text.replace(/¨0/, "");
      return globals.converter._dispatch("githubCodeBlocks.after", text, options, globals);
    });
    showdown2.subParser("hashBlock", function(text, options, globals) {
      text = globals.converter._dispatch("hashBlock.before", text, options, globals);
      text = text.replace(/(^\n+|\n+$)/g, "");
      text = "\n\n\xA8K" + (globals.gHtmlBlocks.push(text) - 1) + "K\n\n";
      text = globals.converter._dispatch("hashBlock.after", text, options, globals);
      return text;
    });
    showdown2.subParser("hashCodeTags", function(text, options, globals) {
      text = globals.converter._dispatch("hashCodeTags.before", text, options, globals);
      var repFunc = function(wholeMatch, match, left, right) {
        var codeblock = left + showdown2.subParser("encodeCode")(match, options, globals) + right;
        return "\xA8C" + (globals.gHtmlSpans.push(codeblock) - 1) + "C";
      };
      text = showdown2.helper.replaceRecursiveRegExp(text, repFunc, "<code\\b[^>]*>", "</code>", "gim");
      text = globals.converter._dispatch("hashCodeTags.after", text, options, globals);
      return text;
    });
    showdown2.subParser("hashElement", function(text, options, globals) {
      return function(wholeMatch, m1) {
        var blockText = m1;
        blockText = blockText.replace(/\n\n/g, "\n");
        blockText = blockText.replace(/^\n/, "");
        blockText = blockText.replace(/\n+$/g, "");
        blockText = "\n\n\xA8K" + (globals.gHtmlBlocks.push(blockText) - 1) + "K\n\n";
        return blockText;
      };
    });
    showdown2.subParser("hashHTMLBlocks", function(text, options, globals) {
      text = globals.converter._dispatch("hashHTMLBlocks.before", text, options, globals);
      var blockTags = [
        "pre",
        "div",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "blockquote",
        "table",
        "dl",
        "ol",
        "ul",
        "script",
        "noscript",
        "form",
        "fieldset",
        "iframe",
        "math",
        "style",
        "section",
        "header",
        "footer",
        "nav",
        "article",
        "aside",
        "address",
        "audio",
        "canvas",
        "figure",
        "hgroup",
        "output",
        "video",
        "p"
      ], repFunc = function(wholeMatch, match, left, right) {
        var txt = wholeMatch;
        if (left.search(/\bmarkdown\b/) !== -1) {
          txt = left + globals.converter.makeHtml(match) + right;
        }
        return "\n\n\xA8K" + (globals.gHtmlBlocks.push(txt) - 1) + "K\n\n";
      };
      if (options.backslashEscapesHTMLTags) {
        text = text.replace(/\\<(\/?[^>]+?)>/g, function(wm, inside) {
          return "&lt;" + inside + "&gt;";
        });
      }
      for (var i2 = 0; i2 < blockTags.length; ++i2) {
        var opTagPos, rgx1 = new RegExp("^ {0,3}(<" + blockTags[i2] + "\\b[^>]*>)", "im"), patLeft = "<" + blockTags[i2] + "\\b[^>]*>", patRight = "</" + blockTags[i2] + ">";
        while ((opTagPos = showdown2.helper.regexIndexOf(text, rgx1)) !== -1) {
          var subTexts = showdown2.helper.splitAtIndex(text, opTagPos), newSubText1 = showdown2.helper.replaceRecursiveRegExp(subTexts[1], repFunc, patLeft, patRight, "im");
          if (newSubText1 === subTexts[1]) {
            break;
          }
          text = subTexts[0].concat(newSubText1);
        }
      }
      text = text.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, showdown2.subParser("hashElement")(text, options, globals));
      text = showdown2.helper.replaceRecursiveRegExp(text, function(txt) {
        return "\n\n\xA8K" + (globals.gHtmlBlocks.push(txt) - 1) + "K\n\n";
      }, "^ {0,3}<!--", "-->", "gm");
      text = text.replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, showdown2.subParser("hashElement")(text, options, globals));
      text = globals.converter._dispatch("hashHTMLBlocks.after", text, options, globals);
      return text;
    });
    showdown2.subParser("hashHTMLSpans", function(text, options, globals) {
      text = globals.converter._dispatch("hashHTMLSpans.before", text, options, globals);
      function hashHTMLSpan(html) {
        return "\xA8C" + (globals.gHtmlSpans.push(html) - 1) + "C";
      }
      text = text.replace(/<[^>]+?\/>/gi, function(wm) {
        return hashHTMLSpan(wm);
      });
      text = text.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function(wm) {
        return hashHTMLSpan(wm);
      });
      text = text.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function(wm) {
        return hashHTMLSpan(wm);
      });
      text = text.replace(/<[^>]+?>/gi, function(wm) {
        return hashHTMLSpan(wm);
      });
      text = globals.converter._dispatch("hashHTMLSpans.after", text, options, globals);
      return text;
    });
    showdown2.subParser("unhashHTMLSpans", function(text, options, globals) {
      text = globals.converter._dispatch("unhashHTMLSpans.before", text, options, globals);
      for (var i2 = 0; i2 < globals.gHtmlSpans.length; ++i2) {
        var repText = globals.gHtmlSpans[i2], limit = 0;
        while (/¨C(\d+)C/.test(repText)) {
          var num = RegExp.$1;
          repText = repText.replace("\xA8C" + num + "C", globals.gHtmlSpans[num]);
          if (limit === 10) {
            console.error("maximum nesting of 10 spans reached!!!");
            break;
          }
          ++limit;
        }
        text = text.replace("\xA8C" + i2 + "C", repText);
      }
      text = globals.converter._dispatch("unhashHTMLSpans.after", text, options, globals);
      return text;
    });
    showdown2.subParser("hashPreCodeTags", function(text, options, globals) {
      text = globals.converter._dispatch("hashPreCodeTags.before", text, options, globals);
      var repFunc = function(wholeMatch, match, left, right) {
        var codeblock = left + showdown2.subParser("encodeCode")(match, options, globals) + right;
        return "\n\n\xA8G" + (globals.ghCodeBlocks.push({text: wholeMatch, codeblock}) - 1) + "G\n\n";
      };
      text = showdown2.helper.replaceRecursiveRegExp(text, repFunc, "^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^ {0,3}</code>\\s*</pre>", "gim");
      text = globals.converter._dispatch("hashPreCodeTags.after", text, options, globals);
      return text;
    });
    showdown2.subParser("headers", function(text, options, globals) {
      text = globals.converter._dispatch("headers.before", text, options, globals);
      var headerLevelStart = isNaN(parseInt(options.headerLevelStart)) ? 1 : parseInt(options.headerLevelStart), setextRegexH1 = options.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm, setextRegexH2 = options.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
      text = text.replace(setextRegexH1, function(wholeMatch, m1) {
        var spanGamut = showdown2.subParser("spanGamut")(m1, options, globals), hID = options.noHeaderId ? "" : ' id="' + headerId(m1) + '"', hLevel = headerLevelStart, hashBlock = "<h" + hLevel + hID + ">" + spanGamut + "</h" + hLevel + ">";
        return showdown2.subParser("hashBlock")(hashBlock, options, globals);
      });
      text = text.replace(setextRegexH2, function(matchFound, m1) {
        var spanGamut = showdown2.subParser("spanGamut")(m1, options, globals), hID = options.noHeaderId ? "" : ' id="' + headerId(m1) + '"', hLevel = headerLevelStart + 1, hashBlock = "<h" + hLevel + hID + ">" + spanGamut + "</h" + hLevel + ">";
        return showdown2.subParser("hashBlock")(hashBlock, options, globals);
      });
      var atxStyle = options.requireSpaceBeforeHeadingText ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;
      text = text.replace(atxStyle, function(wholeMatch, m1, m2) {
        var hText = m2;
        if (options.customizedHeaderId) {
          hText = m2.replace(/\s?\{([^{]+?)}\s*$/, "");
        }
        var span = showdown2.subParser("spanGamut")(hText, options, globals), hID = options.noHeaderId ? "" : ' id="' + headerId(m2) + '"', hLevel = headerLevelStart - 1 + m1.length, header = "<h" + hLevel + hID + ">" + span + "</h" + hLevel + ">";
        return showdown2.subParser("hashBlock")(header, options, globals);
      });
      function headerId(m2) {
        var title, prefix;
        if (options.customizedHeaderId) {
          var match = m2.match(/\{([^{]+?)}\s*$/);
          if (match && match[1]) {
            m2 = match[1];
          }
        }
        title = m2;
        if (showdown2.helper.isString(options.prefixHeaderId)) {
          prefix = options.prefixHeaderId;
        } else if (options.prefixHeaderId === true) {
          prefix = "section-";
        } else {
          prefix = "";
        }
        if (!options.rawPrefixHeaderId) {
          title = prefix + title;
        }
        if (options.ghCompatibleHeaderId) {
          title = title.replace(/ /g, "-").replace(/&amp;/g, "").replace(/¨T/g, "").replace(/¨D/g, "").replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, "").toLowerCase();
        } else if (options.rawHeaderId) {
          title = title.replace(/ /g, "-").replace(/&amp;/g, "&").replace(/¨T/g, "\xA8").replace(/¨D/g, "$").replace(/["']/g, "-").toLowerCase();
        } else {
          title = title.replace(/[^\w]/g, "").toLowerCase();
        }
        if (options.rawPrefixHeaderId) {
          title = prefix + title;
        }
        if (globals.hashLinkCounts[title]) {
          title = title + "-" + globals.hashLinkCounts[title]++;
        } else {
          globals.hashLinkCounts[title] = 1;
        }
        return title;
      }
      text = globals.converter._dispatch("headers.after", text, options, globals);
      return text;
    });
    showdown2.subParser("horizontalRule", function(text, options, globals) {
      text = globals.converter._dispatch("horizontalRule.before", text, options, globals);
      var key = showdown2.subParser("hashBlock")("<hr />", options, globals);
      text = text.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, key);
      text = text.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, key);
      text = text.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, key);
      text = globals.converter._dispatch("horizontalRule.after", text, options, globals);
      return text;
    });
    showdown2.subParser("images", function(text, options, globals) {
      text = globals.converter._dispatch("images.before", text, options, globals);
      var inlineRegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, crazyRegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g, base64RegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, referenceRegExp = /!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g, refShortcutRegExp = /!\[([^\[\]]+)]()()()()()/g;
      function writeImageTagBase64(wholeMatch, altText, linkId, url, width, height, m5, title) {
        url = url.replace(/\s/g, "");
        return writeImageTag(wholeMatch, altText, linkId, url, width, height, m5, title);
      }
      function writeImageTag(wholeMatch, altText, linkId, url, width, height, m5, title) {
        var gUrls = globals.gUrls, gTitles = globals.gTitles, gDims = globals.gDimensions;
        linkId = linkId.toLowerCase();
        if (!title) {
          title = "";
        }
        if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
          url = "";
        } else if (url === "" || url === null) {
          if (linkId === "" || linkId === null) {
            linkId = altText.toLowerCase().replace(/ ?\n/g, " ");
          }
          url = "#" + linkId;
          if (!showdown2.helper.isUndefined(gUrls[linkId])) {
            url = gUrls[linkId];
            if (!showdown2.helper.isUndefined(gTitles[linkId])) {
              title = gTitles[linkId];
            }
            if (!showdown2.helper.isUndefined(gDims[linkId])) {
              width = gDims[linkId].width;
              height = gDims[linkId].height;
            }
          } else {
            return wholeMatch;
          }
        }
        altText = altText.replace(/"/g, "&quot;").replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
        url = url.replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
        var result = '<img src="' + url + '" alt="' + altText + '"';
        if (title && showdown2.helper.isString(title)) {
          title = title.replace(/"/g, "&quot;").replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
          result += ' title="' + title + '"';
        }
        if (width && height) {
          width = width === "*" ? "auto" : width;
          height = height === "*" ? "auto" : height;
          result += ' width="' + width + '"';
          result += ' height="' + height + '"';
        }
        result += " />";
        return result;
      }
      text = text.replace(referenceRegExp, writeImageTag);
      text = text.replace(base64RegExp, writeImageTagBase64);
      text = text.replace(crazyRegExp, writeImageTag);
      text = text.replace(inlineRegExp, writeImageTag);
      text = text.replace(refShortcutRegExp, writeImageTag);
      text = globals.converter._dispatch("images.after", text, options, globals);
      return text;
    });
    showdown2.subParser("italicsAndBold", function(text, options, globals) {
      text = globals.converter._dispatch("italicsAndBold.before", text, options, globals);
      function parseInside(txt, left, right) {
        return left + txt + right;
      }
      if (options.literalMidWordUnderscores) {
        text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function(wm, txt) {
          return parseInside(txt, "<strong><em>", "</em></strong>");
        });
        text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function(wm, txt) {
          return parseInside(txt, "<strong>", "</strong>");
        });
        text = text.replace(/\b_(\S[\s\S]*?)_\b/g, function(wm, txt) {
          return parseInside(txt, "<em>", "</em>");
        });
      } else {
        text = text.replace(/___(\S[\s\S]*?)___/g, function(wm, m2) {
          return /\S$/.test(m2) ? parseInside(m2, "<strong><em>", "</em></strong>") : wm;
        });
        text = text.replace(/__(\S[\s\S]*?)__/g, function(wm, m2) {
          return /\S$/.test(m2) ? parseInside(m2, "<strong>", "</strong>") : wm;
        });
        text = text.replace(/_([^\s_][\s\S]*?)_/g, function(wm, m2) {
          return /\S$/.test(m2) ? parseInside(m2, "<em>", "</em>") : wm;
        });
      }
      if (options.literalMidWordAsterisks) {
        text = text.replace(/([^*]|^)\B\*\*\*(\S[\s\S]*?)\*\*\*\B(?!\*)/g, function(wm, lead, txt) {
          return parseInside(txt, lead + "<strong><em>", "</em></strong>");
        });
        text = text.replace(/([^*]|^)\B\*\*(\S[\s\S]*?)\*\*\B(?!\*)/g, function(wm, lead, txt) {
          return parseInside(txt, lead + "<strong>", "</strong>");
        });
        text = text.replace(/([^*]|^)\B\*(\S[\s\S]*?)\*\B(?!\*)/g, function(wm, lead, txt) {
          return parseInside(txt, lead + "<em>", "</em>");
        });
      } else {
        text = text.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, function(wm, m2) {
          return /\S$/.test(m2) ? parseInside(m2, "<strong><em>", "</em></strong>") : wm;
        });
        text = text.replace(/\*\*(\S[\s\S]*?)\*\*/g, function(wm, m2) {
          return /\S$/.test(m2) ? parseInside(m2, "<strong>", "</strong>") : wm;
        });
        text = text.replace(/\*([^\s*][\s\S]*?)\*/g, function(wm, m2) {
          return /\S$/.test(m2) ? parseInside(m2, "<em>", "</em>") : wm;
        });
      }
      text = globals.converter._dispatch("italicsAndBold.after", text, options, globals);
      return text;
    });
    showdown2.subParser("lists", function(text, options, globals) {
      function processListItems(listStr, trimTrailing) {
        globals.gListLevel++;
        listStr = listStr.replace(/\n{2,}$/, "\n");
        listStr += "\xA80";
        var rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm, isParagraphed = /\n[ \t]*\n(?!¨0)/.test(listStr);
        if (options.disableForced4SpacesIndentedSublists) {
          rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm;
        }
        listStr = listStr.replace(rgx, function(wholeMatch, m1, m2, m3, m4, taskbtn, checked) {
          checked = checked && checked.trim() !== "";
          var item = showdown2.subParser("outdent")(m4, options, globals), bulletStyle = "";
          if (taskbtn && options.tasklists) {
            bulletStyle = ' class="task-list-item" style="list-style-type: none;"';
            item = item.replace(/^[ \t]*\[(x|X| )?]/m, function() {
              var otp = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
              if (checked) {
                otp += " checked";
              }
              otp += ">";
              return otp;
            });
          }
          item = item.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function(wm2) {
            return "\xA8A" + wm2;
          });
          if (m1 || item.search(/\n{2,}/) > -1) {
            item = showdown2.subParser("githubCodeBlocks")(item, options, globals);
            item = showdown2.subParser("blockGamut")(item, options, globals);
          } else {
            item = showdown2.subParser("lists")(item, options, globals);
            item = item.replace(/\n$/, "");
            item = showdown2.subParser("hashHTMLBlocks")(item, options, globals);
            item = item.replace(/\n\n+/g, "\n\n");
            if (isParagraphed) {
              item = showdown2.subParser("paragraphs")(item, options, globals);
            } else {
              item = showdown2.subParser("spanGamut")(item, options, globals);
            }
          }
          item = item.replace("\xA8A", "");
          item = "<li" + bulletStyle + ">" + item + "</li>\n";
          return item;
        });
        listStr = listStr.replace(/¨0/g, "");
        globals.gListLevel--;
        if (trimTrailing) {
          listStr = listStr.replace(/\s+$/, "");
        }
        return listStr;
      }
      function styleStartNumber(list, listType) {
        if (listType === "ol") {
          var res = list.match(/^ *(\d+)\./);
          if (res && res[1] !== "1") {
            return ' start="' + res[1] + '"';
          }
        }
        return "";
      }
      function parseConsecutiveLists(list, listType, trimTrailing) {
        var olRgx = options.disableForced4SpacesIndentedSublists ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm, ulRgx = options.disableForced4SpacesIndentedSublists ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm, counterRxg = listType === "ul" ? olRgx : ulRgx, result = "";
        if (list.search(counterRxg) !== -1) {
          (function parseCL(txt) {
            var pos = txt.search(counterRxg), style2 = styleStartNumber(list, listType);
            if (pos !== -1) {
              result += "\n\n<" + listType + style2 + ">\n" + processListItems(txt.slice(0, pos), !!trimTrailing) + "</" + listType + ">\n";
              listType = listType === "ul" ? "ol" : "ul";
              counterRxg = listType === "ul" ? olRgx : ulRgx;
              parseCL(txt.slice(pos));
            } else {
              result += "\n\n<" + listType + style2 + ">\n" + processListItems(txt, !!trimTrailing) + "</" + listType + ">\n";
            }
          })(list);
        } else {
          var style = styleStartNumber(list, listType);
          result = "\n\n<" + listType + style + ">\n" + processListItems(list, !!trimTrailing) + "</" + listType + ">\n";
        }
        return result;
      }
      text = globals.converter._dispatch("lists.before", text, options, globals);
      text += "\xA80";
      if (globals.gListLevel) {
        text = text.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function(wholeMatch, list, m2) {
          var listType = m2.search(/[*+-]/g) > -1 ? "ul" : "ol";
          return parseConsecutiveLists(list, listType, true);
        });
      } else {
        text = text.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function(wholeMatch, m1, list, m3) {
          var listType = m3.search(/[*+-]/g) > -1 ? "ul" : "ol";
          return parseConsecutiveLists(list, listType, false);
        });
      }
      text = text.replace(/¨0/, "");
      text = globals.converter._dispatch("lists.after", text, options, globals);
      return text;
    });
    showdown2.subParser("metadata", function(text, options, globals) {
      if (!options.metadata) {
        return text;
      }
      text = globals.converter._dispatch("metadata.before", text, options, globals);
      function parseMetadataContents(content) {
        globals.metadata.raw = content;
        content = content.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
        content = content.replace(/\n {4}/g, " ");
        content.replace(/^([\S ]+): +([\s\S]+?)$/gm, function(wm, key, value) {
          globals.metadata.parsed[key] = value;
          return "";
        });
      }
      text = text.replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/, function(wholematch, format, content) {
        parseMetadataContents(content);
        return "\xA8M";
      });
      text = text.replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/, function(wholematch, format, content) {
        if (format) {
          globals.metadata.format = format;
        }
        parseMetadataContents(content);
        return "\xA8M";
      });
      text = text.replace(/¨M/g, "");
      text = globals.converter._dispatch("metadata.after", text, options, globals);
      return text;
    });
    showdown2.subParser("outdent", function(text, options, globals) {
      text = globals.converter._dispatch("outdent.before", text, options, globals);
      text = text.replace(/^(\t|[ ]{1,4})/gm, "\xA80");
      text = text.replace(/¨0/g, "");
      text = globals.converter._dispatch("outdent.after", text, options, globals);
      return text;
    });
    showdown2.subParser("paragraphs", function(text, options, globals) {
      text = globals.converter._dispatch("paragraphs.before", text, options, globals);
      text = text.replace(/^\n+/g, "");
      text = text.replace(/\n+$/g, "");
      var grafs = text.split(/\n{2,}/g), grafsOut = [], end = grafs.length;
      for (var i2 = 0; i2 < end; i2++) {
        var str = grafs[i2];
        if (str.search(/¨(K|G)(\d+)\1/g) >= 0) {
          grafsOut.push(str);
        } else if (str.search(/\S/) >= 0) {
          str = showdown2.subParser("spanGamut")(str, options, globals);
          str = str.replace(/^([ \t]*)/g, "<p>");
          str += "</p>";
          grafsOut.push(str);
        }
      }
      end = grafsOut.length;
      for (i2 = 0; i2 < end; i2++) {
        var blockText = "", grafsOutIt = grafsOut[i2], codeFlag = false;
        while (/¨(K|G)(\d+)\1/.test(grafsOutIt)) {
          var delim = RegExp.$1, num = RegExp.$2;
          if (delim === "K") {
            blockText = globals.gHtmlBlocks[num];
          } else {
            if (codeFlag) {
              blockText = showdown2.subParser("encodeCode")(globals.ghCodeBlocks[num].text, options, globals);
            } else {
              blockText = globals.ghCodeBlocks[num].codeblock;
            }
          }
          blockText = blockText.replace(/\$/g, "$$$$");
          grafsOutIt = grafsOutIt.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, blockText);
          if (/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(grafsOutIt)) {
            codeFlag = true;
          }
        }
        grafsOut[i2] = grafsOutIt;
      }
      text = grafsOut.join("\n");
      text = text.replace(/^\n+/g, "");
      text = text.replace(/\n+$/g, "");
      return globals.converter._dispatch("paragraphs.after", text, options, globals);
    });
    showdown2.subParser("runExtension", function(ext, text, options, globals) {
      if (ext.filter) {
        text = ext.filter(text, globals.converter, options);
      } else if (ext.regex) {
        var re = ext.regex;
        if (!(re instanceof RegExp)) {
          re = new RegExp(re, "g");
        }
        text = text.replace(re, ext.replace);
      }
      return text;
    });
    showdown2.subParser("spanGamut", function(text, options, globals) {
      text = globals.converter._dispatch("spanGamut.before", text, options, globals);
      text = showdown2.subParser("codeSpans")(text, options, globals);
      text = showdown2.subParser("escapeSpecialCharsWithinTagAttributes")(text, options, globals);
      text = showdown2.subParser("encodeBackslashEscapes")(text, options, globals);
      text = showdown2.subParser("images")(text, options, globals);
      text = showdown2.subParser("anchors")(text, options, globals);
      text = showdown2.subParser("autoLinks")(text, options, globals);
      text = showdown2.subParser("simplifiedAutoLinks")(text, options, globals);
      text = showdown2.subParser("emoji")(text, options, globals);
      text = showdown2.subParser("underline")(text, options, globals);
      text = showdown2.subParser("italicsAndBold")(text, options, globals);
      text = showdown2.subParser("strikethrough")(text, options, globals);
      text = showdown2.subParser("ellipsis")(text, options, globals);
      text = showdown2.subParser("hashHTMLSpans")(text, options, globals);
      text = showdown2.subParser("encodeAmpsAndAngles")(text, options, globals);
      if (options.simpleLineBreaks) {
        if (!/\n\n¨K/.test(text)) {
          text = text.replace(/\n+/g, "<br />\n");
        }
      } else {
        text = text.replace(/  +\n/g, "<br />\n");
      }
      text = globals.converter._dispatch("spanGamut.after", text, options, globals);
      return text;
    });
    showdown2.subParser("strikethrough", function(text, options, globals) {
      function parseInside(txt) {
        if (options.simplifiedAutoLink) {
          txt = showdown2.subParser("simplifiedAutoLinks")(txt, options, globals);
        }
        return "<del>" + txt + "</del>";
      }
      if (options.strikethrough) {
        text = globals.converter._dispatch("strikethrough.before", text, options, globals);
        text = text.replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function(wm, txt) {
          return parseInside(txt);
        });
        text = globals.converter._dispatch("strikethrough.after", text, options, globals);
      }
      return text;
    });
    showdown2.subParser("stripLinkDefinitions", function(text, options, globals) {
      var regex = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm, base64Regex = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm;
      text += "\xA80";
      var replaceFunc = function(wholeMatch, linkId, url, width, height, blankLines, title) {
        linkId = linkId.toLowerCase();
        if (url.match(/^data:.+?\/.+?;base64,/)) {
          globals.gUrls[linkId] = url.replace(/\s/g, "");
        } else {
          globals.gUrls[linkId] = showdown2.subParser("encodeAmpsAndAngles")(url, options, globals);
        }
        if (blankLines) {
          return blankLines + title;
        } else {
          if (title) {
            globals.gTitles[linkId] = title.replace(/"|'/g, "&quot;");
          }
          if (options.parseImgDimensions && width && height) {
            globals.gDimensions[linkId] = {
              width,
              height
            };
          }
        }
        return "";
      };
      text = text.replace(base64Regex, replaceFunc);
      text = text.replace(regex, replaceFunc);
      text = text.replace(/¨0/, "");
      return text;
    });
    showdown2.subParser("tables", function(text, options, globals) {
      if (!options.tables) {
        return text;
      }
      var tableRgx = /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm, singeColTblRgx = /^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm;
      function parseStyles(sLine) {
        if (/^:[ \t]*--*$/.test(sLine)) {
          return ' style="text-align:left;"';
        } else if (/^--*[ \t]*:[ \t]*$/.test(sLine)) {
          return ' style="text-align:right;"';
        } else if (/^:[ \t]*--*[ \t]*:$/.test(sLine)) {
          return ' style="text-align:center;"';
        } else {
          return "";
        }
      }
      function parseHeaders(header, style) {
        var id = "";
        header = header.trim();
        if (options.tablesHeaderId || options.tableHeaderId) {
          id = ' id="' + header.replace(/ /g, "_").toLowerCase() + '"';
        }
        header = showdown2.subParser("spanGamut")(header, options, globals);
        return "<th" + id + style + ">" + header + "</th>\n";
      }
      function parseCells(cell, style) {
        var subText = showdown2.subParser("spanGamut")(cell, options, globals);
        return "<td" + style + ">" + subText + "</td>\n";
      }
      function buildTable(headers, cells) {
        var tb = "<table>\n<thead>\n<tr>\n", tblLgn = headers.length;
        for (var i2 = 0; i2 < tblLgn; ++i2) {
          tb += headers[i2];
        }
        tb += "</tr>\n</thead>\n<tbody>\n";
        for (i2 = 0; i2 < cells.length; ++i2) {
          tb += "<tr>\n";
          for (var ii = 0; ii < tblLgn; ++ii) {
            tb += cells[i2][ii];
          }
          tb += "</tr>\n";
        }
        tb += "</tbody>\n</table>\n";
        return tb;
      }
      function parseTable(rawTable) {
        var i2, tableLines = rawTable.split("\n");
        for (i2 = 0; i2 < tableLines.length; ++i2) {
          if (/^ {0,3}\|/.test(tableLines[i2])) {
            tableLines[i2] = tableLines[i2].replace(/^ {0,3}\|/, "");
          }
          if (/\|[ \t]*$/.test(tableLines[i2])) {
            tableLines[i2] = tableLines[i2].replace(/\|[ \t]*$/, "");
          }
          tableLines[i2] = showdown2.subParser("codeSpans")(tableLines[i2], options, globals);
        }
        var rawHeaders = tableLines[0].split("|").map(function(s2) {
          return s2.trim();
        }), rawStyles = tableLines[1].split("|").map(function(s2) {
          return s2.trim();
        }), rawCells = [], headers = [], styles = [], cells = [];
        tableLines.shift();
        tableLines.shift();
        for (i2 = 0; i2 < tableLines.length; ++i2) {
          if (tableLines[i2].trim() === "") {
            continue;
          }
          rawCells.push(tableLines[i2].split("|").map(function(s2) {
            return s2.trim();
          }));
        }
        if (rawHeaders.length < rawStyles.length) {
          return rawTable;
        }
        for (i2 = 0; i2 < rawStyles.length; ++i2) {
          styles.push(parseStyles(rawStyles[i2]));
        }
        for (i2 = 0; i2 < rawHeaders.length; ++i2) {
          if (showdown2.helper.isUndefined(styles[i2])) {
            styles[i2] = "";
          }
          headers.push(parseHeaders(rawHeaders[i2], styles[i2]));
        }
        for (i2 = 0; i2 < rawCells.length; ++i2) {
          var row = [];
          for (var ii = 0; ii < headers.length; ++ii) {
            if (showdown2.helper.isUndefined(rawCells[i2][ii]))
              ;
            row.push(parseCells(rawCells[i2][ii], styles[ii]));
          }
          cells.push(row);
        }
        return buildTable(headers, cells);
      }
      text = globals.converter._dispatch("tables.before", text, options, globals);
      text = text.replace(/\\(\|)/g, showdown2.helper.escapeCharactersCallback);
      text = text.replace(tableRgx, parseTable);
      text = text.replace(singeColTblRgx, parseTable);
      text = globals.converter._dispatch("tables.after", text, options, globals);
      return text;
    });
    showdown2.subParser("underline", function(text, options, globals) {
      if (!options.underline) {
        return text;
      }
      text = globals.converter._dispatch("underline.before", text, options, globals);
      if (options.literalMidWordUnderscores) {
        text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function(wm, txt) {
          return "<u>" + txt + "</u>";
        });
        text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function(wm, txt) {
          return "<u>" + txt + "</u>";
        });
      } else {
        text = text.replace(/___(\S[\s\S]*?)___/g, function(wm, m2) {
          return /\S$/.test(m2) ? "<u>" + m2 + "</u>" : wm;
        });
        text = text.replace(/__(\S[\s\S]*?)__/g, function(wm, m2) {
          return /\S$/.test(m2) ? "<u>" + m2 + "</u>" : wm;
        });
      }
      text = text.replace(/(_)/g, showdown2.helper.escapeCharactersCallback);
      text = globals.converter._dispatch("underline.after", text, options, globals);
      return text;
    });
    showdown2.subParser("unescapeSpecialChars", function(text, options, globals) {
      text = globals.converter._dispatch("unescapeSpecialChars.before", text, options, globals);
      text = text.replace(/¨E(\d+)E/g, function(wholeMatch, m1) {
        var charCodeToReplace = parseInt(m1);
        return String.fromCharCode(charCodeToReplace);
      });
      text = globals.converter._dispatch("unescapeSpecialChars.after", text, options, globals);
      return text;
    });
    showdown2.subParser("makeMarkdown.blockquote", function(node, globals) {
      var txt = "";
      if (node.hasChildNodes()) {
        var children = node.childNodes, childrenLength = children.length;
        for (var i2 = 0; i2 < childrenLength; ++i2) {
          var innerTxt = showdown2.subParser("makeMarkdown.node")(children[i2], globals);
          if (innerTxt === "") {
            continue;
          }
          txt += innerTxt;
        }
      }
      txt = txt.trim();
      txt = "> " + txt.split("\n").join("\n> ");
      return txt;
    });
    showdown2.subParser("makeMarkdown.codeBlock", function(node, globals) {
      var lang = node.getAttribute("language"), num = node.getAttribute("precodenum");
      return "```" + lang + "\n" + globals.preList[num] + "\n```";
    });
    showdown2.subParser("makeMarkdown.codeSpan", function(node) {
      return "`" + node.innerHTML + "`";
    });
    showdown2.subParser("makeMarkdown.emphasis", function(node, globals) {
      var txt = "";
      if (node.hasChildNodes()) {
        txt += "*";
        var children = node.childNodes, childrenLength = children.length;
        for (var i2 = 0; i2 < childrenLength; ++i2) {
          txt += showdown2.subParser("makeMarkdown.node")(children[i2], globals);
        }
        txt += "*";
      }
      return txt;
    });
    showdown2.subParser("makeMarkdown.header", function(node, globals, headerLevel) {
      var headerMark = new Array(headerLevel + 1).join("#"), txt = "";
      if (node.hasChildNodes()) {
        txt = headerMark + " ";
        var children = node.childNodes, childrenLength = children.length;
        for (var i2 = 0; i2 < childrenLength; ++i2) {
          txt += showdown2.subParser("makeMarkdown.node")(children[i2], globals);
        }
      }
      return txt;
    });
    showdown2.subParser("makeMarkdown.hr", function() {
      return "---";
    });
    showdown2.subParser("makeMarkdown.image", function(node) {
      var txt = "";
      if (node.hasAttribute("src")) {
        txt += "![" + node.getAttribute("alt") + "](";
        txt += "<" + node.getAttribute("src") + ">";
        if (node.hasAttribute("width") && node.hasAttribute("height")) {
          txt += " =" + node.getAttribute("width") + "x" + node.getAttribute("height");
        }
        if (node.hasAttribute("title")) {
          txt += ' "' + node.getAttribute("title") + '"';
        }
        txt += ")";
      }
      return txt;
    });
    showdown2.subParser("makeMarkdown.links", function(node, globals) {
      var txt = "";
      if (node.hasChildNodes() && node.hasAttribute("href")) {
        var children = node.childNodes, childrenLength = children.length;
        txt = "[";
        for (var i2 = 0; i2 < childrenLength; ++i2) {
          txt += showdown2.subParser("makeMarkdown.node")(children[i2], globals);
        }
        txt += "](";
        txt += "<" + node.getAttribute("href") + ">";
        if (node.hasAttribute("title")) {
          txt += ' "' + node.getAttribute("title") + '"';
        }
        txt += ")";
      }
      return txt;
    });
    showdown2.subParser("makeMarkdown.list", function(node, globals, type) {
      var txt = "";
      if (!node.hasChildNodes()) {
        return "";
      }
      var listItems = node.childNodes, listItemsLenght = listItems.length, listNum = node.getAttribute("start") || 1;
      for (var i2 = 0; i2 < listItemsLenght; ++i2) {
        if (typeof listItems[i2].tagName === "undefined" || listItems[i2].tagName.toLowerCase() !== "li") {
          continue;
        }
        var bullet = "";
        if (type === "ol") {
          bullet = listNum.toString() + ". ";
        } else {
          bullet = "- ";
        }
        txt += bullet + showdown2.subParser("makeMarkdown.listItem")(listItems[i2], globals);
        ++listNum;
      }
      txt += "\n<!-- -->\n";
      return txt.trim();
    });
    showdown2.subParser("makeMarkdown.listItem", function(node, globals) {
      var listItemTxt = "";
      var children = node.childNodes, childrenLenght = children.length;
      for (var i2 = 0; i2 < childrenLenght; ++i2) {
        listItemTxt += showdown2.subParser("makeMarkdown.node")(children[i2], globals);
      }
      if (!/\n$/.test(listItemTxt)) {
        listItemTxt += "\n";
      } else {
        listItemTxt = listItemTxt.split("\n").join("\n    ").replace(/^ {4}$/gm, "").replace(/\n\n+/g, "\n\n");
      }
      return listItemTxt;
    });
    showdown2.subParser("makeMarkdown.node", function(node, globals, spansOnly) {
      spansOnly = spansOnly || false;
      var txt = "";
      if (node.nodeType === 3) {
        return showdown2.subParser("makeMarkdown.txt")(node, globals);
      }
      if (node.nodeType === 8) {
        return "<!--" + node.data + "-->\n\n";
      }
      if (node.nodeType !== 1) {
        return "";
      }
      var tagName = node.tagName.toLowerCase();
      switch (tagName) {
        case "h1":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.header")(node, globals, 1) + "\n\n";
          }
          break;
        case "h2":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.header")(node, globals, 2) + "\n\n";
          }
          break;
        case "h3":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.header")(node, globals, 3) + "\n\n";
          }
          break;
        case "h4":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.header")(node, globals, 4) + "\n\n";
          }
          break;
        case "h5":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.header")(node, globals, 5) + "\n\n";
          }
          break;
        case "h6":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.header")(node, globals, 6) + "\n\n";
          }
          break;
        case "p":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.paragraph")(node, globals) + "\n\n";
          }
          break;
        case "blockquote":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.blockquote")(node, globals) + "\n\n";
          }
          break;
        case "hr":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.hr")(node, globals) + "\n\n";
          }
          break;
        case "ol":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.list")(node, globals, "ol") + "\n\n";
          }
          break;
        case "ul":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.list")(node, globals, "ul") + "\n\n";
          }
          break;
        case "precode":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.codeBlock")(node, globals) + "\n\n";
          }
          break;
        case "pre":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.pre")(node, globals) + "\n\n";
          }
          break;
        case "table":
          if (!spansOnly) {
            txt = showdown2.subParser("makeMarkdown.table")(node, globals) + "\n\n";
          }
          break;
        case "code":
          txt = showdown2.subParser("makeMarkdown.codeSpan")(node, globals);
          break;
        case "em":
        case "i":
          txt = showdown2.subParser("makeMarkdown.emphasis")(node, globals);
          break;
        case "strong":
        case "b":
          txt = showdown2.subParser("makeMarkdown.strong")(node, globals);
          break;
        case "del":
          txt = showdown2.subParser("makeMarkdown.strikethrough")(node, globals);
          break;
        case "a":
          txt = showdown2.subParser("makeMarkdown.links")(node, globals);
          break;
        case "img":
          txt = showdown2.subParser("makeMarkdown.image")(node, globals);
          break;
        default:
          txt = node.outerHTML + "\n\n";
      }
      return txt;
    });
    showdown2.subParser("makeMarkdown.paragraph", function(node, globals) {
      var txt = "";
      if (node.hasChildNodes()) {
        var children = node.childNodes, childrenLength = children.length;
        for (var i2 = 0; i2 < childrenLength; ++i2) {
          txt += showdown2.subParser("makeMarkdown.node")(children[i2], globals);
        }
      }
      txt = txt.trim();
      return txt;
    });
    showdown2.subParser("makeMarkdown.pre", function(node, globals) {
      var num = node.getAttribute("prenum");
      return "<pre>" + globals.preList[num] + "</pre>";
    });
    showdown2.subParser("makeMarkdown.strikethrough", function(node, globals) {
      var txt = "";
      if (node.hasChildNodes()) {
        txt += "~~";
        var children = node.childNodes, childrenLength = children.length;
        for (var i2 = 0; i2 < childrenLength; ++i2) {
          txt += showdown2.subParser("makeMarkdown.node")(children[i2], globals);
        }
        txt += "~~";
      }
      return txt;
    });
    showdown2.subParser("makeMarkdown.strong", function(node, globals) {
      var txt = "";
      if (node.hasChildNodes()) {
        txt += "**";
        var children = node.childNodes, childrenLength = children.length;
        for (var i2 = 0; i2 < childrenLength; ++i2) {
          txt += showdown2.subParser("makeMarkdown.node")(children[i2], globals);
        }
        txt += "**";
      }
      return txt;
    });
    showdown2.subParser("makeMarkdown.table", function(node, globals) {
      var txt = "", tableArray = [[], []], headings = node.querySelectorAll("thead>tr>th"), rows = node.querySelectorAll("tbody>tr"), i2, ii;
      for (i2 = 0; i2 < headings.length; ++i2) {
        var headContent = showdown2.subParser("makeMarkdown.tableCell")(headings[i2], globals), allign = "---";
        if (headings[i2].hasAttribute("style")) {
          var style = headings[i2].getAttribute("style").toLowerCase().replace(/\s/g, "");
          switch (style) {
            case "text-align:left;":
              allign = ":---";
              break;
            case "text-align:right;":
              allign = "---:";
              break;
            case "text-align:center;":
              allign = ":---:";
              break;
          }
        }
        tableArray[0][i2] = headContent.trim();
        tableArray[1][i2] = allign;
      }
      for (i2 = 0; i2 < rows.length; ++i2) {
        var r2 = tableArray.push([]) - 1, cols = rows[i2].getElementsByTagName("td");
        for (ii = 0; ii < headings.length; ++ii) {
          var cellContent = " ";
          if (typeof cols[ii] !== "undefined") {
            cellContent = showdown2.subParser("makeMarkdown.tableCell")(cols[ii], globals);
          }
          tableArray[r2].push(cellContent);
        }
      }
      var cellSpacesCount = 3;
      for (i2 = 0; i2 < tableArray.length; ++i2) {
        for (ii = 0; ii < tableArray[i2].length; ++ii) {
          var strLen = tableArray[i2][ii].length;
          if (strLen > cellSpacesCount) {
            cellSpacesCount = strLen;
          }
        }
      }
      for (i2 = 0; i2 < tableArray.length; ++i2) {
        for (ii = 0; ii < tableArray[i2].length; ++ii) {
          if (i2 === 1) {
            if (tableArray[i2][ii].slice(-1) === ":") {
              tableArray[i2][ii] = showdown2.helper.padEnd(tableArray[i2][ii].slice(-1), cellSpacesCount - 1, "-") + ":";
            } else {
              tableArray[i2][ii] = showdown2.helper.padEnd(tableArray[i2][ii], cellSpacesCount, "-");
            }
          } else {
            tableArray[i2][ii] = showdown2.helper.padEnd(tableArray[i2][ii], cellSpacesCount);
          }
        }
        txt += "| " + tableArray[i2].join(" | ") + " |\n";
      }
      return txt.trim();
    });
    showdown2.subParser("makeMarkdown.tableCell", function(node, globals) {
      var txt = "";
      if (!node.hasChildNodes()) {
        return "";
      }
      var children = node.childNodes, childrenLength = children.length;
      for (var i2 = 0; i2 < childrenLength; ++i2) {
        txt += showdown2.subParser("makeMarkdown.node")(children[i2], globals, true);
      }
      return txt.trim();
    });
    showdown2.subParser("makeMarkdown.txt", function(node) {
      var txt = node.nodeValue;
      txt = txt.replace(/ +/g, " ");
      txt = txt.replace(/¨NBSP;/g, " ");
      txt = showdown2.helper.unescapeHTMLEntities(txt);
      txt = txt.replace(/([*_~|`])/g, "\\$1");
      txt = txt.replace(/^(\s*)>/g, "\\$1>");
      txt = txt.replace(/^#/gm, "\\#");
      txt = txt.replace(/^(\s*)([-=]{3,})(\s*)$/, "$1\\$2$3");
      txt = txt.replace(/^( {0,3}\d+)\./gm, "$1\\.");
      txt = txt.replace(/^( {0,3})([+-])/gm, "$1\\$2");
      txt = txt.replace(/]([\s]*)\(/g, "\\]$1\\(");
      txt = txt.replace(/^ {0,3}\[([\S \t]*?)]:/gm, "\\[$1]:");
      return txt;
    });
    var root = this;
    if (module.exports) {
      module.exports = showdown2;
    } else {
      root.showdown = showdown2;
    }
  }).call(commonjsGlobal);
});
var Converter = showdown.Converter;

// CodeCell.js
var __defProp3 = Object.defineProperty;
var __getOwnPropDesc3 = Object.getOwnPropertyDescriptor;
var __decorate3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc3(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp3(target, key, result);
  return result;
};
var converter = new Converter();
var {EditorState, basicSetup} = CM["@codemirror/basic-setup"];
var {EditorView, keymap} = CM["@codemirror/view"];
var {defaultTabBinding} = CM["@codemirror/commands"];
var {rust} = CM["@codemirror/lang-rust"];
var {tags, HighlightStyle} = CM["@codemirror/highlight"];
var myHighlightStyle = HighlightStyle.define([
  {tag: tags.keyword, color: "#fc6"},
  {tag: tags.comment, color: "#f5d", fontStyle: "italic"}
]);
var myTheme = EditorView.theme({
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
    border: "solid 1px #e0a877",
    fontSize: "8px",
    lineHeight: "18px",
    userSelect: "none"
  }
}, {dark: true});
var CodeCell = class extends h$2 {
  createRenderRoot() {
    return this;
  }
  render() {
    return T`<div class="code-cell">
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
      this.querySelector(".code-cell-output-container").style.display = "none";
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
        extensions: [
          basicSetup,
          keymap.of([
            {
              key: "Ctrl-Enter",
              run: () => {
                this.runCodeCell();
              }
            }
          ]),
          keymap.of([defaultTabBinding]),
          rust(),
          myTheme,
          myHighlightStyle
        ]
      }),
      parent: this.querySelector(".code-cell-editor")
    });
    defined(document.querySelector("#run-all")).addEventListener("click", () => this.runCodeCell());
    let hide = (selector) => {
      let c2 = defined(this.querySelector(selector));
      c2.style.display = "none";
    };
    let toggleVisibility = (selector) => {
      hide(".code-cell-output-markdown");
      hide(".code-cell-output-text");
      hide(".code-cell-output-html");
      hide(".code-cell-output-log");
      let c2 = defined(this.querySelector(selector));
      c2.style.display = "block";
    };
    defined(this.querySelector(".code-cell-menu-item-markdown")).addEventListener("click", () => {
      toggleVisibility(".code-cell-output-markdown");
    });
    defined(this.querySelector(".code-cell-menu-item-html")).addEventListener("click", () => {
      toggleVisibility(".code-cell-output-html");
    });
    defined(this.querySelector(".code-cell-menu-item-log")).addEventListener("click", () => {
      toggleVisibility(".code-cell-output-log");
    });
    defined(this.querySelector(".code-cell-menu-item-text")).addEventListener("click", () => {
      toggleVisibility(".code-cell-output-text");
    });
  }
  async loadResult(handle) {
    let c2 = 0;
    while (true) {
      if (c2 > 60) {
        return;
      }
      let r2 = await fetch(`http://127.0.0.1:8080/notebook/${getCurrentNotebookId()}/result/` + handle).then((_2) => _2.json());
      if (r2 == null) {
        await sleep(1e3);
      } else {
        let o2 = JSON.parse(r2.result);
        try {
          if (typeof o2.text === "string") {
            let a2 = JSON.parse(o2.text);
            if (typeof a2 === "string") {
              a2 = JSON.parse(a2);
              this.handleResult(a2);
            } else {
              this.handleResult(o2);
            }
          } else {
            this.handleResult(o2);
          }
        } catch (e2) {
          this.handleResult(o2);
        }
        return;
      }
      c2++;
    }
  }
  handleResult(a2) {
    let loader = defined(this.querySelector(".code-cell-loading"));
    let shown = false;
    const textMenu = defined(this.querySelector(".code-cell-menu-item-text"));
    const markdownMenu = defined(this.querySelector(".code-cell-menu-item-markdown"));
    const htmlMenu = defined(this.querySelector(".code-cell-menu-item-html"));
    const imageMenu = defined(this.querySelector(".code-cell-menu-item-image"));
    const logMenu = defined(this.querySelector(".code-cell-menu-item-log"));
    const textOutput = defined(this.querySelector(".code-cell-output-text"));
    const markdownOutput = defined(this.querySelector(".code-cell-output-markdown"));
    const htmlOutput = defined(this.querySelector(".code-cell-output-html"));
    const imageOutput = defined(this.querySelector(".code-cell-output-image"));
    const logOutput = defined(this.querySelector(".code-cell-output-log"));
    let firstToShow = void 0;
    let menuShowTargets = [];
    let menuHideTargets = [];
    let outputMaker = [];
    if (a2.text) {
      menuShowTargets.push(textMenu);
      outputMaker.push(() => {
        textOutput.innerHTML = a2.text.trim().replaceAll("\n", "<br>");
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
    if (a2.log) {
      menuShowTargets.push(logMenu);
      outputMaker.push(() => {
        logOutput.innerHTML = a2.log.trim().replaceAll("\n", "<br>");
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
    if (a2.markdown) {
      menuShowTargets.push(markdownMenu);
      outputMaker.push(() => {
        markdownOutput.innerHTML = converter.makeHtml(a2.markdown);
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
    if (a2.html) {
      menuShowTargets.push(htmlMenu);
      outputMaker.push(() => {
        htmlOutput.innerHTML = a2.html;
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
    if (a2.image) {
      menuShowTargets.push(imageMenu);
      outputMaker.push(() => {
        imageOutput.innerHTML = a2.html;
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
    animejs_default.timeline({
      easing: "easeOutExpo",
      duration: 1e3,
      complete: () => {
        outputMaker.forEach((_2) => _2());
      }
    }).add({
      targets: loader,
      opacity: 0,
      complete: () => {
        loader.style.display = "none";
        animejs_default({
          easing: "easeOutExpo",
          targets: menuHideTargets,
          opacity: 0,
          width: 0
        });
        animejs_default({
          easing: "easeOutExpo",
          targets: menuShowTargets,
          width: 50,
          opacity: 1,
          begin: () => {
            menuShowTargets.forEach((_2) => {
              _2.style.opacity = "0";
            });
          }
        });
        if (firstToShow) {
          outputMaker.forEach((_2) => _2());
          firstToShow.style.display = "block";
          firstToShow.style.opacity = "1";
        }
      }
    });
  }
  async runCodeCell() {
    this.querySelector(".code-cell-output-container").style.display = "block";
    const textOutput = defined(this.querySelector(".code-cell-output-text"));
    const markdownOutput = defined(this.querySelector(".code-cell-output-markdown"));
    const htmlOutput = defined(this.querySelector(".code-cell-output-html"));
    const imageOutput = defined(this.querySelector(".code-cell-output-image"));
    const logOutput = defined(this.querySelector(".code-cell-output-log"));
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
    animejs_default({
      targets: [
        this.querySelector(".code-cell-loading"),
        this.querySelector(".code-cell-output-shell")
      ],
      opacity: 1,
      begin: () => {
        this.querySelector(".code-cell-loading").style.display = "block";
        this.querySelector(".code-cell-output-shell").style.display = "block";
      }
    });
    this.querySelector(".code-cell-output-container").style.display = "block";
    animejs_default({
      targets: this.querySelector(".code-cell-output-container"),
      opacity: 1
    });
    let r2 = await fetch(`http://127.0.0.1:8080/notebook/${getCurrentNotebookId()}/execute`, {
      method: "POST",
      body: defined(this.editorView).state.doc.toString()
    }).then((_2) => _2.json());
    if (r2.handle) {
      this.loadResult(parseFloat(r2.handle));
    } else {
      this.handleResult(r2.result);
    }
  }
};
CodeCell = __decorate3([
  n2("code-cell")
], CodeCell);

// CpuInfo.js
var __defProp4 = Object.defineProperty;
var __getOwnPropDesc4 = Object.getOwnPropertyDescriptor;
var __decorate4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc4(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp4(target, key, result);
  return result;
};
var CpuInfo = class extends h$2 {
  static get styles() {
    return r$1`
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
    return T`<div class="cpus">
      <div class="cpu-title">CPU</div>
      <div class="cpu">1</div>
      <div class="cpu">2</div>
    </div>`;
  }
};
CpuInfo = __decorate4([
  n2("cpu-info")
], CpuInfo);

// index.js
document.querySelector("#add-cell")?.addEventListener("click", () => {
  document.querySelector(".notebook")?.appendChild(document.createElement("code-cell"));
});
