var F,R,I,G,L=globalThis.trustedTypes,Q=L?L.createPolicy("lit-html",{createHTML:r=>r}):void 0,g=`lit$${(Math.random()+"").slice(9)}$`,X="?"+g,_t=`<${X}>`,w=document,E=(r="")=>w.createComment(r),N=r=>r===null||typeof r!="object"&&typeof r!="function",Y=Array.isArray,Ht=r=>{var t;return Y(r)||typeof((t=r)===null||t===void 0?void 0:t[Symbol.iterator])=="function"},T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,tt=/-->/g,et=/>/g,b=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,it=/'/g,st=/"/g,rt=/^(?:script|style|textarea)$/i,Ot=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),f=Ot(1),S=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),ot=new WeakMap,Ut=(r,t,e)=>{var i,s;let n=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:t,o=n._$litPart$;if(o===void 0){let h=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:null;n._$litPart$=o=new C(t.insertBefore(E(),h),h,void 0,e)}return o.I(r),o},x=w.createTreeWalker(w,129,null,!1),jt=(r,t)=>{let e=r.length-1,i=[],s,n=t===2?"<svg>":"",o=T;for(let l=0;l<e;l++){let a=r[l],m,c,d=-1,v=0;for(;v<a.length&&(o.lastIndex=v,c=o.exec(a),c!==null);)v=o.lastIndex,o===T?c[1]==="!--"?o=tt:c[1]!==void 0?o=et:c[2]!==void 0?(rt.test(c[2])&&(s=RegExp("</"+c[2],"g")),o=b):c[3]!==void 0&&(o=b):o===b?c[0]===">"?(o=s??T,d=-1):c[1]===void 0?d=-2:(d=o.lastIndex-c[2].length,m=c[1],o=c[3]===void 0?b:c[3]==='"'?st:it):o===st||o===it?o=b:o===tt||o===et?o=T:(o=b,s=void 0);let j=o===b&&r[l+1].startsWith("/>")?" ":"";n+=o===T?a+_t:d>=0?(i.push(m),a.slice(0,d)+"$lit$"+a.slice(d)+g+j):a+g+(d===-2?(i.push(void 0),l):j)}let h=n+(r[e]||"<?>")+(t===2?"</svg>":"");return[Q!==void 0?Q.createHTML(h):h,i]},$=class{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0,h=t.length-1,l=this.parts,[a,m]=jt(t,e);if(this.el=$.createElement(a,i),x.currentNode=this.el.content,e===2){let c=this.el.content,d=c.firstChild;d.remove(),c.append(...d.childNodes)}for(;(s=x.nextNode())!==null&&l.length<h;){if(s.nodeType===1){if(s.hasAttributes()){let c=[];for(let d of s.getAttributeNames())if(d.endsWith("$lit$")||d.startsWith(g)){let v=m[o++];if(c.push(d),v!==void 0){let j=s.getAttribute(v.toLowerCase()+"$lit$").split(g),A=/([.?@])?(.*)/.exec(v);l.push({type:1,index:n,name:A[2],strings:j,ctor:A[1]==="."?nt:A[1]==="?"?lt:A[1]==="@"?at:_})}else l.push({type:6,index:n})}for(let d of c)s.removeAttribute(d)}if(rt.test(s.tagName)){let c=s.textContent.split(g),d=c.length-1;if(d>0){s.textContent=L?L.emptyScript:"";for(let v=0;v<d;v++)s.append(c[v],E()),x.nextNode(),l.push({type:2,index:++n});s.append(c[d],E())}}}else if(s.nodeType===8)if(s.data===X)l.push({type:2,index:n});else{let c=-1;for(;(c=s.data.indexOf(g,c+1))!==-1;)l.push({type:7,index:n}),c+=g.length-1}n++}}static createElement(t,e){let i=w.createElement("template");return i.innerHTML=t,i}};function P(r,t,e=r,i){var s,n,o,h;if(t===S)return t;let l=i!==void 0?(s=e.\u03A3i)===null||s===void 0?void 0:s[i]:e.\u03A3o,a=N(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==a&&((n=l==null?void 0:l.O)===null||n===void 0||n.call(l,!1),a===void 0?l=void 0:(l=new a(r),l.T(r,e,i)),i!==void 0?((o=(h=e).\u03A3i)!==null&&o!==void 0?o:h.\u03A3i=[])[i]=l:e.\u03A3o=l),l!==void 0&&(t=P(r,l.S(r,t.values),l,i)),t}var ht=class{constructor(t,e){this.l=[],this.N=void 0,this.D=t,this.M=e}u(t){var e;let{el:{content:i},parts:s}=this.D,n=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:w).importNode(i,!0);x.currentNode=n;let o=x.nextNode(),h=0,l=0,a=s[0];for(;a!==void 0;){if(h===a.index){let m;a.type===2?m=new C(o,o.nextSibling,this,t):a.type===1?m=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(m=new ct(o,this,t)),this.l.push(m),a=s[++l]}h!==(a==null?void 0:a.index)&&(o=x.nextNode(),h++)}return n}v(t){let e=0;for(let i of this.l)i!==void 0&&(i.strings!==void 0?(i.I(t,i,e),e+=i.strings.length-2):i.I(t[e])),e++}},C=class{constructor(t,e,i,s){this.type=2,this.N=void 0,this.A=t,this.B=e,this.M=i,this.options=s}setConnected(t){var e;(e=this.P)===null||e===void 0||e.call(this,t)}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,e=this){t=P(this,t,e),N(t)?t===u||t==null||t===""?(this.H!==u&&this.R(),this.H=u):t!==this.H&&t!==S&&this.m(t):t._$litType$!==void 0?this._(t):t.nodeType!==void 0?this.$(t):Ht(t)?this.g(t):this.m(t)}k(t,e=this.B){return this.A.parentNode.insertBefore(t,e)}$(t){this.H!==t&&(this.R(),this.H=this.k(t))}m(t){let e=this.A.nextSibling;e!==null&&e.nodeType===3&&(this.B===null?e.nextSibling===null:e===this.B.previousSibling)?e.data=t:this.$(w.createTextNode(t)),this.H=t}_(t){var e;let{values:i,_$litType$:s}=t,n=typeof s=="number"?this.C(t):(s.el===void 0&&(s.el=$.createElement(s.h,this.options)),s);if(((e=this.H)===null||e===void 0?void 0:e.D)===n)this.H.v(i);else{let o=new ht(n,this),h=o.u(this.options);o.v(i),this.$(h),this.H=o}}C(t){let e=ot.get(t.strings);return e===void 0&&ot.set(t.strings,e=new $(t)),e}g(t){Y(this.H)||(this.H=[],this.R());let e=this.H,i,s=0;for(let n of t)s===e.length?e.push(i=new C(this.k(E()),this.k(E()),this,this.options)):i=e[s],i.I(n),s++;s<e.length&&(this.R(i&&i.B.nextSibling,s),e.length=s)}R(t=this.A.nextSibling,e){var i;for((i=this.P)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this.B;){let s=t.nextSibling;t.remove(),t=s}}},_=class{constructor(t,e,i,s,n){this.type=1,this.H=u,this.N=void 0,this.V=void 0,this.element=t,this.name=e,this.M=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this.H=Array(i.length-1).fill(u),this.strings=i):this.H=u}get tagName(){return this.element.tagName}I(t,e=this,i,s){let n=this.strings,o=!1;if(n===void 0)t=P(this,t,e,0),o=!N(t)||t!==this.H&&t!==S,o&&(this.H=t);else{let h=t,l,a;for(t=n[0],l=0;l<n.length-1;l++)a=P(this,h[i+l],e,l),a===S&&(a=this.H[l]),o||(o=!N(a)||a!==this.H[l]),a===u?t=u:t!==u&&(t+=(a??"")+n[l+1]),this.H[l]=a}o&&!s&&this.W(t)}W(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},nt=class extends _{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===u?void 0:t}},lt=class extends _{constructor(){super(...arguments),this.type=4}W(t){t&&t!==u?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}},at=class extends _{constructor(){super(...arguments),this.type=5}I(t,e=this){var i;if((t=(i=P(this,t,e,0))!==null&&i!==void 0?i:u)===S)return;let s=this.H,n=t===u&&s!==u||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==u&&(s===u||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this.H=t}handleEvent(t){var e,i;typeof this.H=="function"?this.H.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this.H.handleEvent(t)}},ct=class{constructor(t,e,i){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=e,this.options=i}I(t){P(this,t)}};(R=(F=globalThis).litHtmlPlatformSupport)===null||R===void 0||R.call(F,$,C),((I=(G=globalThis).litHtmlVersions)!==null&&I!==void 0?I:G.litHtmlVersions=[]).push("2.0.0-rc.2");var z=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,B=Symbol(),M=class{constructor(t,e){if(e!==B)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return z&&this.t===void 0&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}},At=r=>new M(r+"",B),dt=new Map,k=(r,...t)=>{let e=t.reduce((s,n,o)=>s+(h=>{if(h instanceof M)return h.cssText;if(typeof h=="number")return h;throw Error(`Value passed to 'css' function must be a 'css' function result: ${h}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`)})(n)+r[o+1],r[0]),i=dt.get(e);return i===void 0&&dt.set(e,i=new M(e,B)),i},Lt=(r,t)=>{z?r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{let i=document.createElement("style");i.textContent=e.cssText,r.appendChild(i)})},ut=z?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return At(e)})(r):r;var pt,D,V,mt,q={toAttribute(r,t){switch(t){case Boolean:r=r?"":null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch(i){e=null}}return e}},vt=(r,t)=>t!==r&&(t==t||r==r),W={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:vt},H=class extends HTMLElement{constructor(){super(),this.\u03A0i=new Map,this.\u03A0o=void 0,this.\u03A0l=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.\u03A0h=null,this.u()}static addInitializer(t){var e;(e=this.v)!==null&&e!==void 0||(this.v=[]),this.v.push(t)}static get observedAttributes(){this.finalize();let t=[];return this.elementProperties.forEach((e,i)=>{let s=this.\u03A0p(i,e);s!==void 0&&(this.\u03A0m.set(s,i),t.push(s))}),t}static createProperty(t,e=W){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){let i=typeof t=="symbol"?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){let n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||W}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;let t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.\u03A0m=new Map,this.hasOwnProperty("properties")){let e=this.properties,i=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(let s of i)this.createProperty(s,e[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(ut(s))}else t!==void 0&&e.push(ut(t));return e}static \u03A0p(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}u(){var t;this.\u03A0g=new Promise(e=>this.enableUpdating=e),this.L=new Map,this.\u03A0_(),this.requestUpdate(),(t=this.constructor.v)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,i;((e=this.\u03A0U)!==null&&e!==void 0?e:this.\u03A0U=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var e;(e=this.\u03A0U)===null||e===void 0||e.splice(this.\u03A0U.indexOf(t)>>>0,1)}\u03A0_(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this.\u03A0i.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;let e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Lt(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this.\u03A0U)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostConnected)===null||i===void 0?void 0:i.call(e)}),this.\u03A0l&&(this.\u03A0l(),this.\u03A0o=this.\u03A0l=void 0)}enableUpdating(t){}disconnectedCallback(){var t;(t=this.\u03A0U)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostDisconnected)===null||i===void 0?void 0:i.call(e)}),this.\u03A0o=new Promise(e=>this.\u03A0l=e)}attributeChangedCallback(t,e,i){this.K(t,i)}\u03A0j(t,e,i=W){var s,n;let o=this.constructor.\u03A0p(t,i);if(o!==void 0&&i.reflect===!0){let h=((n=(s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==null&&n!==void 0?n:q.toAttribute)(e,i.type);this.\u03A0h=t,h==null?this.removeAttribute(o):this.setAttribute(o,h),this.\u03A0h=null}}K(t,e){var i,s,n;let o=this.constructor,h=o.\u03A0m.get(t);if(h!==void 0&&this.\u03A0h!==h){let l=o.getPropertyOptions(h),a=l.converter,m=(n=(s=(i=a)===null||i===void 0?void 0:i.fromAttribute)!==null&&s!==void 0?s:typeof a=="function"?a:null)!==null&&n!==void 0?n:q.fromAttribute;this.\u03A0h=h,this[h]=m(e,l.type),this.\u03A0h=null}}requestUpdate(t,e,i){let s=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||vt)(this[t],e)?(this.L.has(t)||this.L.set(t,e),i.reflect===!0&&this.\u03A0h!==t&&(this.\u03A0k===void 0&&(this.\u03A0k=new Map),this.\u03A0k.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this.\u03A0g=this.\u03A0q())}async \u03A0q(){this.isUpdatePending=!0;try{for(await this.\u03A0g;this.\u03A0o;)await this.\u03A0o}catch(e){Promise.reject(e)}let t=this.performUpdate();return t!=null&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.\u03A0i&&(this.\u03A0i.forEach((s,n)=>this[n]=s),this.\u03A0i=void 0);let e=!1,i=this.L;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(t=this.\u03A0U)===null||t===void 0||t.forEach(s=>{var n;return(n=s.hostUpdate)===null||n===void 0?void 0:n.call(s)}),this.update(i)):this.\u03A0$()}catch(s){throw e=!1,this.\u03A0$(),s}e&&this.E(i)}willUpdate(t){}E(t){var e;(e=this.\u03A0U)===null||e===void 0||e.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}\u03A0$(){this.L=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.\u03A0g}shouldUpdate(t){return!0}update(t){this.\u03A0k!==void 0&&(this.\u03A0k.forEach((e,i)=>this.\u03A0j(i,this[i],e)),this.\u03A0k=void 0),this.\u03A0$()}updated(t){}firstUpdated(t){}};H.finalized=!0,H.shadowRootOptions={mode:"open"},(D=(pt=globalThis).reactiveElementPlatformSupport)===null||D===void 0||D.call(pt,{ReactiveElement:H}),((V=(mt=globalThis).reactiveElementVersions)!==null&&V!==void 0?V:mt.reactiveElementVersions=[]).push("1.0.0-rc.1");var Z,ft,J,gt,K,yt;((Z=(yt=globalThis).litElementVersions)!==null&&Z!==void 0?Z:yt.litElementVersions=[]).push("3.0.0-rc.1");var p=class extends H{constructor(){super(...arguments),this.renderOptions={host:this},this.\u03A6t=void 0}createRenderRoot(){var t,e;let i=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=i.firstChild),i}update(t){let e=this.render();super.update(t),this.\u03A6t=Ut(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this.\u03A6t)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.\u03A6t)===null||t===void 0||t.setConnected(!1)}render(){return S}};p.finalized=!0,p._$litElement$=!0,(J=(ft=globalThis).litElementHydrateSupport)===null||J===void 0||J.call(ft,{LitElement:p}),(K=(gt=globalThis).litElementPlatformSupport)===null||K===void 0||K.call(gt,{LitElement:p});var y=r=>t=>typeof t=="function"?((e,i)=>(window.customElements.define(e,i),i))(r,t):((e,i)=>{let{kind:s,elements:n}=i;return{kind:s,elements:n,finisher(o){window.customElements.define(e,o)}}})(r,t);var Nt=Object.defineProperty,Mt=Object.getOwnPropertyDescriptor,Rt=(r,t,e,i)=>{for(var s=i>1?void 0:i?Mt(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&Nt(t,e,s),s},bt=class extends p{createRenderRoot(){return this}render(){let r=this.innerHTML;this.innerHTML="";let t=this.getAttribute("type");if(t==="title")return f`<span style="font-size: 2rem;">${r}</span>`;if(t==="h3")return f`<span style="font-size: 1.2rem;">${r}</span>`}};bt=Rt([y("text-typography")],bt);var wt;function O(){return wt}function St(r){wt=r}var It=Object.defineProperty,zt=Object.getOwnPropertyDescriptor,Bt=(r,t,e,i)=>{for(var s=i>1?void 0:i?zt(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&It(t,e,s),s},Ct=class extends p{static get styles(){return k`
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
    `}constructor(){super();(async()=>{let r=await fetch("http://127.0.0.1:8080/notebook/start").then(e=>e.json());console.log(r),St(r.id);let t=window.setInterval(async()=>{try{let e=O();if(!e)return;if((await fetch(`http://127.0.0.1:8080/notebook/${e}/ready`).then(s=>s.json())).ready){window.clearInterval(t),this.style.opacity="0",window.setTimeout(()=>{let s=document.querySelector(".layout");s&&(s.style.opacity=1),this.remove()},1e3);return}}catch(e){console.log(e)}},1e3)})()}render(){return f` <div><div class="loader" /></div> `}};Ct=Bt([y("loading-screen")],Ct);function xt(r){return new Promise(t=>{window.setTimeout(()=>{t()},r)})}function U(r){if(r==null)throw Error("value was not defined");return r}var Dt=Object.defineProperty,Vt=Object.getOwnPropertyDescriptor,qt=(r,t,e,i)=>{for(var s=i>1?void 0:i?Vt(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&Dt(t,e,s),s},{EditorState:Wt,basicSetup:Zt}=CM["@codemirror/basic-setup"],{EditorView:$t,keymap:Pt}=CM["@codemirror/view"],{defaultTabBinding:Jt}=CM["@codemirror/commands"],{rust:Kt}=CM["@codemirror/lang-rust"],{tags:kt,HighlightStyle:Ft}=CM["@codemirror/highlight"],Gt=Ft.define([{tag:kt.keyword,color:"#fc6"},{tag:kt.comment,color:"#f5d",fontStyle:"italic"}]),Qt=$t.theme({"&":{color:"#929292",backgroundColor:"black"},".cm-content":{caretColor:"#0e9"},"&.cm-focused .cm-cursor":{borderLeftColor:"#0e9"},"&.cm-focused .cm-selectionBackground, ::selection":{backgroundColor:"#074"},".cm-gutters":{backgroundColor:"#3a1100",color:"#e0a877",border:"solid 1px #e0a877"}},{dark:!0}),Et=class extends p{static get styles(){return k`
      .code-cell-output {
        color: #929292;
        padding: 1rem;
      }
    `}createRenderRoot(){return this}render(){return f`<div class="code-cell">
      hey
      <div class="code-cell-editor"></div>
      <div class="code-cell-output" style="color: white"></div>
    </div>`}firstUpdated(){this.editorView=new $t({state:Wt.create({doc:'println!("hello");',extensions:[Zt,Pt.of([{key:"Ctrl-Enter",run:()=>{this.runCodeCell()}}]),Pt.of([Jt]),Kt(),Qt,Gt]}),parent:this.querySelector(".code-cell-editor")}),U(document.querySelector("#run-all")).addEventListener("click",()=>this.runCodeCell())}async load_result(r){let t=0;for(;;){if(t>60)return;let e=await fetch(`http://127.0.0.1:8080/notebook/${O()}/result/`+r).then(s=>s.json()),i=U(this.querySelector(".code-cell-output"));if(e==null)await xt(1e3);else{try{let s=JSON.parse(e.result);s=JSON.parse(s),i.innerHTML="",s.log&&(i.innerHTML+=s.log.replaceAll(`
`,"<br>"),i.innerHTML+="<hr/>"),s.html?i.innerHTML+=s.html:s.image?i.innerHTML+=`<img src="${s.image}">`:s.text?i.innerHTML+=s.text.replaceAll(`
`,"<br>"):i.innerHTML+=e.result}catch(s){i.innerHTML=e.result}return}t++}}async runCodeCell(){U(this.querySelector(".code-cell-output")).innerHTML="Processing...";let r=await fetch(`http://127.0.0.1:8080/notebook/${O()}/execute`,{method:"POST",body:U(this.editorView).state.doc.toString()}).then(t=>t.text());this.load_result(parseFloat(r))}};Et=qt([y("code-cell")],Et);var Xt=Object.defineProperty,Yt=Object.getOwnPropertyDescriptor,te=(r,t,e,i)=>{for(var s=i>1?void 0:i?Yt(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&Xt(t,e,s),s},Tt=class extends p{static get styles(){return k`
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
    `}render(){return f`<div class="cpus">
      <div class="cpu-title">CPU</div>
      <div class="cpu">1</div>
      <div class="cpu">2</div>
    </div>`}};Tt=te([y("cpu-info")],Tt);document.querySelector("#add-cell")?.addEventListener("click",()=>{document.querySelector(".notebook")?.appendChild(document.createElement("code-cell"))});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
