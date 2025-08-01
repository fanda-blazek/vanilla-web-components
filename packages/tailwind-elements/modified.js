/**
 * Minified by jsDelivr using Terser v5.39.0.
 * Original file: /npm/@tailwindplus/elements@1.0.4/dist/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
/*! @tailwindplus/elements v1.0.4 | Proprietary License | https://tailwindcss.com/plus/license */
var bn = Object.defineProperty,
  vo = (e) => {
    throw TypeError(e);
  },
  vn = (e, t, n) =>
    t in e
      ? bn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  C = (e, t, n) => vn(e, "symbol" != typeof t ? t + "" : t, n),
  ke = (e, t, n) => t.has(e) || vo("Cannot " + n),
  f = (e, t, n) => (
    ke(e, t, "read from private field"),
    n ? n.call(e) : t.get(e)
  ),
  I = (e, t, n) =>
    t.has(e)
      ? vo("Cannot add the same private member more than once")
      : t instanceof WeakSet
        ? t.add(e)
        : t.set(e, n),
  L = (e, t, n, o) => (
    ke(e, t, "write to private field"),
    o ? o.call(e, n) : t.set(e, n),
    n
  ),
  N = (e, t, n) => (ke(e, t, "access private method"), n);
if (typeof globalThis.window < "u") {
  let e = !1;
  document.addEventListener(
    "submit",
    (t) => {
      if (e) return void (e = !1);
      let n = t.target;
      if (n && "dialog" === n.method) {
        let o = n.closest("el-dialog");
        if (!o || !("beforeClose" in o)) return;
        let r = o.beforeClose();
        if (
          !0 === r ||
          (t.preventDefault(), t.stopImmediatePropagation(), !1 === r)
        )
          return;
        r.then((o) => {
          o && ((e = !0), n.dispatchEvent(t));
        }).catch(console.error);
      }
    },
    !0,
  );
}
var se = class extends Event {
    constructor(e, { oldState: t = "", newState: n = "", ...o } = {}) {
      (super(e, o),
        C(this, "oldState"),
        C(this, "newState"),
        (this.oldState = String(t || "")),
        (this.newState = String(n || "")));
    }
  },
  wo = new WeakMap();
function Lo(e, t, n) {
  wo.set(
    e,
    setTimeout(() => {
      wo.has(e) &&
        e.dispatchEvent(
          new se("toggle", { cancelable: !1, oldState: t, newState: n }),
        );
    }, 0),
  );
}
var He = globalThis.ShadowRoot || function () {},
  wn = globalThis.HTMLDialogElement || function () {},
  oe = new WeakMap(),
  Q = new WeakMap(),
  F = new WeakMap(),
  St = new WeakMap();
function ne(e) {
  return St.get(e) || "hidden";
}
var re = new WeakMap();
function Wt(e) {
  return [...e].pop();
}
function yn(e) {
  let t = e.popoverTargetElement;
  if (!(t instanceof HTMLElement)) return;
  let n = ne(t);
  ("show" === e.popoverTargetAction && "showing" === n) ||
    ("hide" === e.popoverTargetAction && "hidden" === n) ||
    ("showing" === n ? It(t, !0, !0) : mt(t, !1) && (re.set(t, e), Ce(t)));
}
function mt(e, t) {
  return !(
    ("auto" !== e.popover && "manual" !== e.popover && "hint" !== e.popover) ||
    !e.isConnected ||
    (t && "showing" !== ne(e)) ||
    (!t && "hidden" !== ne(e)) ||
    (e instanceof wn && e.hasAttribute("open")) ||
    document.fullscreenElement === e
  );
}
function yo(e) {
  if (!e) return 0;
  let t = Q.get(document) || new Set(),
    n = F.get(document) || new Set();
  return n.has(e)
    ? [...n].indexOf(e) + t.size + 1
    : t.has(e)
      ? [...t].indexOf(e) + 1
      : 0;
}
function En(e) {
  let t = Io(e),
    n = An(e);
  return yo(t) > yo(n) ? t : n;
}
function $t(e) {
  let t,
    n = F.get(e) || new Set(),
    o = Q.get(e) || new Set(),
    r = n.size > 0 ? n : o.size > 0 ? o : null;
  return r ? ((t = Wt(r)), t.isConnected ? t : (r.delete(t), $t(e))) : null;
}
function Eo(e) {
  for (let t of e || []) {
    if (t.isConnected) return t;
    e.delete(t);
  }
  return null;
}
function Lt(e) {
  return "function" == typeof e.getRootNode
    ? e.getRootNode()
    : e.parentNode
      ? Lt(e.parentNode)
      : e;
}
function Io(e) {
  for (; e; ) {
    if (
      e instanceof HTMLElement &&
      "auto" === e.popover &&
      "showing" === St.get(e)
    )
      return e;
    if (
      ((e =
        (e instanceof Element && e.assignedSlot) ||
        e.parentElement ||
        Lt(e)) instanceof He && (e = e.host),
      e instanceof Document)
    )
      return;
  }
}
function An(e) {
  for (; e; ) {
    let t = e.popoverTargetElement;
    if (t instanceof HTMLElement) return t;
    if (
      ((e = e.parentElement || Lt(e)) instanceof He && (e = e.host),
      e instanceof Document)
    )
      return;
  }
}
function Ao(e, t) {
  let n = new Map(),
    o = 0;
  for (let e of t || []) (n.set(e, o), (o += 1));
  (n.set(e, o), (o += 1));
  let r = null;
  return (
    (function (t) {
      if (!t) return;
      let o = !1,
        i = null,
        a = null;
      for (; !o; ) {
        if (((i = Io(t) || null), null === i || !n.has(i))) return;
        (("hint" === e.popover || "auto" === i.popover) && (o = !0),
          o || (t = i.parentElement));
      }
      ((a = n.get(i)), (null === r || n.get(r) < a) && (r = i));
    })(e.parentElement || Lt(e)),
    r
  );
}
function xn(e) {
  return (
    !(
      e.hidden ||
      e instanceof He ||
      ((e instanceof HTMLButtonElement ||
        e instanceof HTMLInputElement ||
        e instanceof HTMLSelectElement ||
        e instanceof HTMLTextAreaElement ||
        e instanceof HTMLOptGroupElement ||
        e instanceof HTMLOptionElement ||
        e instanceof HTMLFieldSetElement) &&
        e.disabled) ||
      (e instanceof HTMLInputElement && "hidden" === e.type) ||
      (e instanceof HTMLAnchorElement && "" === e.href)
    ) &&
    "number" == typeof e.tabIndex &&
    -1 !== e.tabIndex
  );
}
function Tn(e) {
  if (e.shadowRoot && !0 !== e.shadowRoot.delegatesFocus) return null;
  let t = e;
  t.shadowRoot && (t = t.shadowRoot);
  let n = t.querySelector("[autofocus]");
  if (n) return n;
  {
    let e = t.querySelectorAll("slot");
    for (let t of e) {
      let e = t.assignedElements({ flatten: !0 });
      for (let t of e) {
        if (t.hasAttribute("autofocus")) return t;
        if (((n = t.querySelector("[autofocus]")), n)) return n;
      }
    }
  }
  let o = e.ownerDocument.createTreeWalker(t, NodeFilter.SHOW_ELEMENT),
    r = o.currentNode;
  for (; r; ) {
    if (xn(r)) return r;
    r = o.nextNode();
  }
}
function Sn(e) {
  Tn(e)?.focus();
}
var ie = new WeakMap();
function Ce(e) {
  if (!mt(e, !1)) return;
  let t = e.ownerDocument;
  if (
    !e.dispatchEvent(
      new se("beforetoggle", {
        cancelable: !0,
        oldState: "closed",
        newState: "open",
      }),
    ) ||
    !mt(e, !1)
  )
    return;
  let n = !1,
    o = e.popover,
    r = null,
    i = Ao(e, Q.get(t) || new Set()),
    a = Ao(e, F.get(t) || new Set());
  if (
    ("auto" === o &&
      (Me(F.get(t) || new Set(), n, !0), ht(i || t, n, !0), (r = "auto")),
    "hint" === o &&
      (a
        ? (ht(a, n, !0), (r = "hint"))
        : (Me(F.get(t) || new Set(), n, !0),
          i ? (ht(i, n, !0), (r = "auto")) : (r = "hint"))),
    "auto" === o || "hint" === o)
  ) {
    if (o !== e.popover || !mt(e, !1)) return;
    ($t(t) || (n = !0),
      "auto" === r
        ? (Q.has(t) || Q.set(t, new Set()), Q.get(t).add(e))
        : "hint" === r && (F.has(t) || F.set(t, new Set()), F.get(t).add(e)));
  }
  ie.delete(e);
  let l = t.activeElement;
  (e.classList.add(":popover-open"),
    St.set(e, "showing"),
    oe.has(t) || oe.set(t, new Set()),
    oe.get(t).add(e),
    ko(re.get(e), !0),
    Sn(e),
    n && l && "auto" === e.popover && ie.set(e, l),
    Lo(e, "closed", "open"));
}
function It(e, t = !1, n = !1) {
  if (!mt(e, !0)) return;
  let o = e.ownerDocument;
  if (["auto", "hint"].includes(e.popover) && (ht(e, t, n), !mt(e, !0))) return;
  let r = Q.get(o) || new Set(),
    i = r.has(e) && Wt(r) === e;
  if (
    (ko(re.get(e), !1),
    re.delete(e),
    n &&
      (e.dispatchEvent(
        new se("beforetoggle", { oldState: "open", newState: "closed" }),
      ),
      i && Wt(r) !== e && ht(e, t, n),
      !mt(e, !0)))
  )
    return;
  (oe.get(o)?.delete(e),
    r.delete(e),
    F.get(o)?.delete(e),
    e.classList.remove(":popover-open"),
    St.set(e, "hidden"),
    n && Lo(e, "open", "closed"));
  let a = ie.get(e);
  a && (ie.delete(e), t && a.focus());
}
function Ln(e, t = !1, n = !1) {
  let o = $t(e);
  for (; o; ) (It(o, t, n), (o = $t(e)));
}
function Me(e, t = !1, n = !1) {
  let o = Eo(e);
  for (; o; ) (It(o, t, n), (o = Eo(e)));
}
function xo(e, t, n, o) {
  let r = !1,
    i = !1;
  for (; r || !i; ) {
    i = !0;
    let a = null,
      l = !1;
    for (let n of t)
      if (n === e) l = !0;
      else if (l) {
        a = n;
        break;
      }
    if (!a) return;
    for (; "showing" === ne(a) && t.size; ) It(Wt(t), n, o);
    (t.has(e) && Wt(t) !== e && (r = !0), r && (o = !1));
  }
}
function ht(e, t, n) {
  let o = e.ownerDocument || e;
  if (e instanceof Document) return Ln(o, t, n);
  F.get(o)?.has(e)
    ? xo(e, F.get(o), t, n)
    : (Me(F.get(o) || new Set(), t, n),
      Q.get(o)?.has(e) && xo(e, Q.get(o), t, n));
}
var Pe = new WeakMap();
function To(e) {
  if (!e.isTrusted) return;
  let t = e.composedPath()[0];
  if (!t) return;
  let n = t.ownerDocument;
  if (!$t(n)) return;
  let o = En(t);
  if (o && "pointerdown" === e.type) Pe.set(n, o);
  else if ("pointerup" === e.type) {
    let e = Pe.get(n) === o;
    (Pe.delete(n), e && ht(o || n, !1, !0));
  }
}
var Oe = new WeakMap();
function ko(e, t = !1) {
  if (!e) return;
  Oe.has(e) || Oe.set(e, e.getAttribute("aria-expanded"));
  let n = e.popoverTargetElement;
  if (n instanceof HTMLElement && "auto" === n.popover)
    e.setAttribute("aria-expanded", String(t));
  else {
    let t = Oe.get(e);
    t ? e.setAttribute("aria-expanded", t) : e.removeAttribute("aria-expanded");
  }
}
var So = globalThis.ShadowRoot || function () {};
function In() {
  return (
    typeof HTMLElement < "u" &&
    "object" == typeof HTMLElement.prototype &&
    "popover" in HTMLElement.prototype
  );
}
function pt(e, t, n) {
  let o = e[t];
  Object.defineProperty(e, t, {
    value(e) {
      return o.call(this, n(e));
    },
  });
}
var kn = /(^|[^\\]):popover-open\b/g;
function Pn() {
  return "function" == typeof globalThis.CSSLayerBlockRule;
}
function On() {
  let e = Pn();
  return `\n${e ? "@layer popover-polyfill {" : ""}\n  :where([popover]) {\n    position: fixed;\n    z-index: 2147483647;\n    inset: 0;\n    padding: 0.25em;\n    width: fit-content;\n    height: fit-content;\n    border-width: initial;\n    border-color: initial;\n    border-image: initial;\n    border-style: solid;\n    background-color: canvas;\n    color: canvastext;\n    overflow: auto;\n    margin: auto;\n  }\n\n  :where([popover]:not(.\\:popover-open)) {\n    display: none;\n  }\n\n  :where(dialog[popover].\\:popover-open) {\n    display: block;\n  }\n\n  :where(dialog[popover][open]) {\n    display: revert;\n  }\n\n  :where([anchor].\\:popover-open) {\n    inset: auto;\n  }\n\n  :where([anchor]:popover-open) {\n    inset: auto;\n  }\n\n  @supports not (background-color: canvas) {\n    :where([popover]) {\n      background-color: white;\n      color: black;\n    }\n  }\n\n  @supports (width: -moz-fit-content) {\n    :where([popover]) {\n      width: -moz-fit-content;\n      height: -moz-fit-content;\n    }\n  }\n\n  @supports not (inset: 0) {\n    :where([popover]) {\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n    }\n  }\n${e ? "}" : ""}\n`;
}
var Tt = null;
function De(e) {
  let t = On();
  if (null === Tt)
    try {
      (Tt = new CSSStyleSheet()).replaceSync(t);
    } catch {
      Tt = !1;
    }
  if (!1 === Tt) {
    let n = document.createElement("style");
    ((n.textContent = t),
      e instanceof Document ? e.head.prepend(n) : e.prepend(n));
  } else e.adoptedStyleSheets = [Tt, ...e.adoptedStyleSheets];
}
function Dn() {
  if (typeof window > "u") return;
  function e(e) {
    return (
      e?.includes(":popover-open") && (e = e.replace(kn, "$1.\\:popover-open")),
      e
    );
  }
  ((window.ToggleEvent = window.ToggleEvent || se),
    pt(Document.prototype, "querySelector", e),
    pt(Document.prototype, "querySelectorAll", e),
    pt(Element.prototype, "querySelector", e),
    pt(Element.prototype, "querySelectorAll", e),
    pt(Element.prototype, "matches", e),
    pt(Element.prototype, "closest", e),
    pt(DocumentFragment.prototype, "querySelectorAll", e),
    Object.defineProperties(HTMLElement.prototype, {
      popover: {
        enumerable: !0,
        configurable: !0,
        get() {
          if (!this.hasAttribute("popover")) return null;
          let e = (this.getAttribute("popover") || "").toLowerCase();
          return "" === e || "auto" == e
            ? "auto"
            : "hint" == e
              ? "hint"
              : "manual";
        },
        set(e) {
          null === e
            ? this.removeAttribute("popover")
            : this.setAttribute("popover", e);
        },
      },
      showPopover: {
        enumerable: !0,
        configurable: !0,
        value(e = {}) {
          Ce(this);
        },
      },
      hidePopover: {
        enumerable: !0,
        configurable: !0,
        value() {
          It(this, !0, !0);
        },
      },
      togglePopover: {
        enumerable: !0,
        configurable: !0,
        value(e = {}) {
          return (
            "boolean" == typeof e && (e = { force: e }),
            ("showing" === St.get(this) && void 0 === e.force) || !1 === e.force
              ? It(this, !0, !0)
              : (void 0 === e.force || !0 === e.force) && Ce(this),
            "showing" === St.get(this)
          );
        },
      },
    }));
  let t = Element.prototype.attachShadow;
  t &&
    Object.defineProperties(Element.prototype, {
      attachShadow: {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value(e) {
          let n = t.call(this, e);
          return (De(n), n);
        },
      },
    });
  let n = HTMLElement.prototype.attachInternals;
  n &&
    Object.defineProperties(HTMLElement.prototype, {
      attachInternals: {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value() {
          let e = n.call(this);
          return (e.shadowRoot && De(e.shadowRoot), e);
        },
      },
    });
  let o = new WeakMap();
  function r(e) {
    Object.defineProperties(e.prototype, {
      popoverTargetElement: {
        enumerable: !0,
        configurable: !0,
        set(e) {
          if (null === e)
            (this.removeAttribute("popovertarget"), o.delete(this));
          else {
            if (!(e instanceof Element))
              throw new TypeError(
                "popoverTargetElement must be an element or null",
              );
            (this.setAttribute("popovertarget", ""), o.set(this, e));
          }
        },
        get() {
          if (
            ("button" !== this.localName && "input" !== this.localName) ||
            ("input" === this.localName &&
              "reset" !== this.type &&
              "image" !== this.type &&
              "button" !== this.type) ||
            this.disabled ||
            (this.form && "submit" === this.type)
          )
            return null;
          let e = o.get(this);
          if (e && e.isConnected) return e;
          if (e && !e.isConnected) return (o.delete(this), null);
          let t = Lt(this),
            n = this.getAttribute("popovertarget");
          return (
            ((t instanceof Document || t instanceof So) &&
              n &&
              t.getElementById(n)) ||
            null
          );
        },
      },
      popoverTargetAction: {
        enumerable: !0,
        configurable: !0,
        get() {
          let e = (
            this.getAttribute("popovertargetaction") || ""
          ).toLowerCase();
          return "show" === e || "hide" === e ? e : "toggle";
        },
        set(e) {
          this.setAttribute("popovertargetaction", e);
        },
      },
    });
  }
  (r(HTMLButtonElement), r(HTMLInputElement));
  let i = (e) => {
      let t = e.composedPath(),
        n = t[0];
      if (!(n instanceof Element) || n?.shadowRoot) return;
      let o = Lt(n);
      if (!(o instanceof So || o instanceof Document)) return;
      let r = t.find((e) =>
        e.matches?.("[popovertargetaction],[popovertarget]"),
      );
      return r ? (yn(r), void e.preventDefault()) : void 0;
    },
    a = (e) => {
      let t = e.key,
        n = e.target;
      !e.defaultPrevented &&
        n &&
        ("Escape" === t || "Esc" === t) &&
        ht(n.ownerDocument, !0, !0);
    };
  var l;
  ((l = document).addEventListener("click", i),
    l.addEventListener("keydown", a),
    l.addEventListener("pointerdown", To),
    l.addEventListener("pointerup", To),
    De(document));
}
function Po() {
  return (
    typeof HTMLButtonElement < "u" &&
    "command" in HTMLButtonElement.prototype &&
    "source" in ((globalThis.CommandEvent || {}).prototype || {})
  );
}
function Oo() {
  function e(e, t, n = !0) {
    Object.defineProperty(e, t, {
      ...Object.getOwnPropertyDescriptor(e, t),
      enumerable: n,
    });
  }
  function t(e) {
    return e && "function" == typeof e.getRootNode
      ? e.getRootNode()
      : e && e.parentNode
        ? t(e.parentNode)
        : e;
  }
  (document.addEventListener(
    "invoke",
    (e) => {
      "invoke" == e.type &&
        e.isTrusted &&
        (e.stopImmediatePropagation(), e.preventDefault());
    },
    !0,
  ),
    document.addEventListener(
      "command",
      (e) => {
        "command" == e.type &&
          e.isTrusted &&
          (e.stopImmediatePropagation(), e.preventDefault());
      },
      !0,
    ));
  let n = new WeakMap(),
    o = new WeakMap();
  class r extends Event {
    constructor(e, t = {}) {
      super(e, t);
      let { source: r, command: i } = t;
      if (null != r && !(r instanceof Element))
        throw new TypeError("source must be an element");
      (n.set(this, r || null), o.set(this, void 0 !== i ? String(i) : ""));
    }
    get [Symbol.toStringTag]() {
      return "CommandEvent";
    }
    get source() {
      if (!n.has(this)) throw new TypeError("illegal invocation");
      let e = n.get(this);
      if (!(e instanceof Element)) return null;
      let o = t(e);
      return o !== t(this.target || document) ? o.host : e;
    }
    get command() {
      if (!o.has(this)) throw new TypeError("illegal invocation");
      return o.get(this);
    }
    get action() {
      throw new Error(
        "CommandEvent#action was renamed to CommandEvent#command",
      );
    }
    get invoker() {
      throw new Error(
        "CommandEvent#invoker was renamed to CommandEvent#source",
      );
    }
  }
  (e(r.prototype, "source"), e(r.prototype, "command"));
  class i extends Event {
    constructor() {
      throw new Error(
        "InvokeEvent has been deprecated, it has been renamed to `CommandEvent`",
      );
    }
  }
  let a = new WeakMap();
  let l = new WeakMap();
  function s(e) {
    for (let t of e)
      t.oncommand = new Function("event", t.getAttribute("oncommand"));
  }
  Object.defineProperties(HTMLElement.prototype, {
    oncommand: {
      enumerable: !0,
      configurable: !0,
      get() {
        return (u.takeRecords(), l.get(this) || null);
      },
      set(e) {
        let t = l.get(this) || null;
        (t && this.removeEventListener("command", t),
          l.set(
            this,
            "object" == typeof e || "function" == typeof e ? e : null,
          ),
          "function" == typeof e && this.addEventListener("command", e));
      },
    },
  });
  let u = new MutationObserver((e) => {
    for (let t of e) {
      let { target: e } = t;
      "childList" === t.type ? s(e.querySelectorAll("[oncommand]")) : s([e]);
    }
  });
  function c(e) {
    if (e.defaultPrevented || "click" !== e.type) return;
    let t = e.target.closest(
      "button[invoketarget], button[invokeaction], input[invoketarget], input[invokeaction]",
    );
    if (
      t &&
      (console.warn(
        "Elements with `invoketarget` or `invokeaction` are deprecated and should be renamed to use `commandfor` and `command` respectively",
      ),
      t.matches("input"))
    )
      throw new Error("Input elements no longer support `commandfor`");
    let n = e.target.closest("button[commandfor], button[command]");
    if (!n) return;
    if (n.form && "button" !== n.getAttribute("type"))
      throw (
        e.preventDefault(),
        new Error(
          "Element with `commandFor` is a form participant. It should explicitly set `type=button` in order for `commandFor` to work. In order for it to act as a Submit button, it must not have command or commandfor attributes",
        )
      );
    if (n.hasAttribute("command") !== n.hasAttribute("commandfor")) {
      let e = n.hasAttribute("command") ? "command" : "commandfor",
        t = n.hasAttribute("command") ? "commandfor" : "command";
      throw new Error(
        `Element with ${e} attribute must also have a ${t} attribute to function.`,
      );
    }
    if (
      "show-popover" !== n.command &&
      "hide-popover" !== n.command &&
      "toggle-popover" !== n.command &&
      "show-modal" !== n.command &&
      "close" !== n.command &&
      !n.command.startsWith("--")
    )
      return void console.warn(
        `"${n.command}" is not a valid command value. Custom commands must begin with --`,
      );
    let o = n.commandForElement;
    if (!o) return;
    let i = new r("command", { command: n.command, source: n, cancelable: !0 });
    if ((o.dispatchEvent(i), i.defaultPrevented)) return;
    let a = i.command.toLowerCase();
    if (o.popover) {
      let e = !o.matches(":popover-open");
      !e || ("toggle-popover" !== a && "show-popover" !== a)
        ? !e && "hide-popover" === a && o.hidePopover()
        : o.showPopover({ source: n });
    } else if ("dialog" === o.localName) {
      let e = !o.hasAttribute("open");
      e && "show-modal" === a
        ? o.showModal()
        : !e && "close" === a && o.close();
    }
  }
  function d(e) {
    e.addEventListener("click", c, !0);
  }
  var h;
  (u.observe(document, {
    subtree: !0,
    childList: !0,
    attributeFilter: ["oncommand"],
  }),
    s(document.querySelectorAll("[oncommand]")),
    (h = HTMLButtonElement),
    Object.defineProperties(h.prototype, {
      commandForElement: {
        enumerable: !0,
        configurable: !0,
        set(e) {
          if (this.hasAttribute("invokeaction"))
            throw new TypeError(
              "Element has deprecated `invokeaction` attribute, replace with `command`",
            );
          if (this.hasAttribute("invoketarget"))
            throw new TypeError(
              "Element has deprecated `invoketarget` attribute, replace with `commandfor`",
            );
          if (null === e) (this.removeAttribute("commandfor"), a.delete(this));
          else {
            if (!(e instanceof Element))
              throw new TypeError(
                "commandForElement must be an element or null",
              );
            {
              this.setAttribute("commandfor", "");
              let n = t(e);
              t(this) === n || n === this.ownerDocument
                ? a.set(this, e)
                : a.delete(this);
            }
          }
        },
        get() {
          if ("button" !== this.localName) return null;
          if (
            this.hasAttribute("invokeaction") ||
            this.hasAttribute("invoketarget")
          )
            return (
              console.warn(
                "Element has deprecated `invoketarget` or `invokeaction` attribute, use `commandfor` and `command` instead",
              ),
              null
            );
          if (this.disabled) return null;
          if (this.form && "button" !== this.getAttribute("type"))
            return (
              console.warn(
                "Element with `commandFor` is a form participant. It should explicitly set `type=button` in order for `commandFor` to work",
              ),
              null
            );
          let e = a.get(this);
          if (e) return e.isConnected ? e : (a.delete(this), null);
          let n = t(this),
            o = this.getAttribute("commandfor");
          return (
            ((n instanceof Document || n instanceof ShadowRoot) &&
              o &&
              n.getElementById(o)) ||
            null
          );
        },
      },
      command: {
        enumerable: !0,
        configurable: !0,
        get() {
          let e = this.getAttribute("command") || "";
          if (e.startsWith("--")) return e;
          let t = e.toLowerCase();
          switch (t) {
            case "show-modal":
            case "close":
            case "toggle-popover":
            case "hide-popover":
            case "show-popover":
              return t;
          }
          return "";
        },
        set(e) {
          this.setAttribute("command", e);
        },
      },
      invokeAction: {
        enumerable: !1,
        configurable: !0,
        get() {
          throw new Error(
            "invokeAction is deprecated. It has been renamed to command",
          );
        },
        set(e) {
          throw new Error(
            "invokeAction is deprecated. It has been renamed to command",
          );
        },
      },
      invokeTargetElement: {
        enumerable: !1,
        configurable: !0,
        get() {
          throw new Error(
            "invokeTargetElement is deprecated. It has been renamed to command",
          );
        },
        set(e) {
          throw new Error(
            "invokeTargetElement is deprecated. It has been renamed to command",
          );
        },
      },
    }),
    (function (e, t) {
      let n = e.prototype.attachShadow;
      e.prototype.attachShadow = function (e) {
        let o = n.call(this, e);
        return (t(o), o);
      };
      let o = e.prototype.attachInternals;
      e.prototype.attachInternals = function () {
        let e = o.call(this);
        return (e.shadowRoot && t(e.shadowRoot), e);
      };
    })(HTMLElement, (e) => {
      (d(e),
        u.observe(e, { attributeFilter: ["oncommand"] }),
        s(e.querySelectorAll("[oncommand]")));
    }),
    d(document),
    Object.assign(globalThis, { CommandEvent: r, InvokeEvent: i }));
}
function Do() {
  if ("function" != typeof HTMLDialogElement) return !1;
  let e = !1,
    t = document.createElement("dialog");
  return (
    t.addEventListener("beforetoggle", (t) => {
      ((e = !0), t.preventDefault());
    }),
    t.show(),
    e
  );
}
function Co() {
  let e = new WeakMap();
  function t(t) {
    let n = t.open ? "closed" : "open",
      o = t.open ? "open" : "closed";
    if (e.has(t)) {
      let n = e.get(t);
      ((o = n.oldState), clearTimeout(n.id));
    }
    e.set(t, {
      oldState: o,
      id: setTimeout(() => {
        t.dispatchEvent(
          new ToggleEvent("toggle", { newState: n, oldState: o }),
        );
      }),
    });
  }
  let n = HTMLDialogElement.prototype.show,
    o = HTMLDialogElement.prototype.showModal,
    r = HTMLDialogElement.prototype.close;
  function i(e) {
    let n = new ToggleEvent("beforetoggle", {
      newState: "closed",
      oldState: "open",
      cancelable: !1,
    });
    (e.dispatchEvent(n), e.open && t(e));
  }
  (document.addEventListener(
    "submit",
    (e) => {
      let t = e.target;
      if ("dialog" === t.method) {
        let e = t.closest("dialog");
        e instanceof HTMLDialogElement && i(e);
      }
    },
    !0,
  ),
    Object.defineProperties(HTMLDialogElement.prototype, {
      show: {
        value() {
          if (
            this.open ||
            this.matches(":popover-open, :modal") ||
            !this.ownerDocument
          )
            return n.apply(this, arguments);
          let e = new ToggleEvent("beforetoggle", {
            newState: "open",
            oldState: "closed",
            cancelable: !0,
          });
          this.dispatchEvent(e) && (t(this), n.apply(this, arguments));
        },
      },
      showModal: {
        value() {
          if (
            this.open ||
            this.matches(":popover-open, :modal") ||
            !this.isConnected ||
            !this.ownerDocument
          )
            return o.apply(this, arguments);
          let e = new ToggleEvent("beforetoggle", {
            newState: "open",
            oldState: "closed",
            cancelable: !0,
          });
          return this.dispatchEvent(e)
            ? (t(this), o.apply(this, arguments))
            : void 0;
        },
      },
      close: {
        value() {
          return this.open || this.matches(":popover-open, :modal")
            ? (i(this), r.apply(this, arguments))
            : r.apply(this, arguments);
        },
      },
    }));
}
function le(e) {
  function t() {
    "loading" !== document.readyState &&
      (e(), document.removeEventListener("DOMContentLoaded", t));
  }
  typeof window < "u" &&
    typeof document < "u" &&
    (document.addEventListener("DOMContentLoaded", t), t());
}
function kt(e) {
  "focus" in e && e.focus({ focusVisible: ae });
}
(In() || Dn(),
  typeof globalThis.window < "u" &&
    (Po() || Oo(),
    Do() || Co(),
    le(() => {
      let e = document.createElement("style");
      ((e.textContent = "@layer popover-polyfill;"),
        e.setAttribute("suppressHydrationWarning", ""),
        document.documentElement.prepend(e));
    })));
var ae = !1;
if (typeof globalThis.window < "u") {
  let e;
  (((e) => {
    ((e[(e.Keyboard = 0)] = "Keyboard"), (e[(e.Mouse = 1)] = "Mouse"));
  })(e || (e = {})),
    document.addEventListener(
      "keydown",
      (e) => {
        e.metaKey ||
          e.altKey ||
          e.ctrlKey ||
          ((ae = !0), (document.documentElement.dataset.focusVisible = ""));
      },
      !0,
    ),
    document.addEventListener(
      "click",
      (e) => {
        1 === e.detail
          ? ((ae = !1), delete document.documentElement.dataset.focusVisible)
          : 0 === e.detail &&
            ((ae = !0), (document.documentElement.dataset.focusVisible = ""));
      },
      !0,
    ));
}
typeof globalThis.HTMLElement > "u" && (globalThis.HTMLElement = class {});
var gt,
  Kt,
  rt,
  x = class extends HTMLElement {
    constructor() {
      (super(...arguments),
        I(this, gt, new AbortController()),
        I(this, Kt, !1),
        I(this, rt, !1));
    }
    connectedCallback() {
      if (
        "observedAttributes" in this.constructor &&
        "object" == typeof this.constructor.observedAttributes &&
        Array.isArray(this.constructor.observedAttributes)
      )
        for (let e of this.constructor.observedAttributes)
          "string" == typeof e &&
            (e in this ||
              Object.defineProperty(this, e, {
                get() {
                  return this.getAttribute(e);
                },
                set(t) {
                  null != t && !1 !== t
                    ? this.setAttribute(e, t.toString())
                    : this.removeAttribute(e);
                },
              }));
      (L(this, Kt, !0),
        queueMicrotask(() => {
          if (!f(this, gt).signal.aborted)
            try {
              this.mount?.(f(this, gt).signal);
            } catch (e) {
              console.error(e);
            }
        }));
    }
    disconnectedCallback() {
      (f(this, gt).abort(), L(this, gt, new AbortController()));
    }
    setAttributeNoCallbacks(e, t) {
      try {
        (L(this, rt, !0), this.setAttribute(e, t));
      } finally {
        L(this, rt, !1);
      }
    }
    removeAttributeNoCallbacks(e) {
      try {
        (L(this, rt, !0), this.removeAttribute(e));
      } finally {
        L(this, rt, !1);
      }
    }
    attributeChangedCallback(e, t, n) {
      f(this, Kt) &&
        (f(this, rt) || (t !== n && this.onAttributeChange?.(e, t, n)));
    }
  };
function T(e, t) {
  typeof globalThis.customElements > "u" ||
    customElements.get(e) === t ||
    customElements.define(e, t);
}
function X() {
  let e = [],
    t = {
      addEventListener: (e, n, o, r) => (
        e.addEventListener(n, o, r),
        t.add(() => e.removeEventListener(n, o, r))
      ),
      requestAnimationFrame(...e) {
        let n = requestAnimationFrame(...e);
        return t.add(() => cancelAnimationFrame(n));
      },
      nextFrame: (...e) =>
        t.requestAnimationFrame(() => t.requestAnimationFrame(...e)),
      setTimeout(...e) {
        let n = setTimeout(...e);
        return t.add(() => clearTimeout(n));
      },
      microTask(...e) {
        let n = { current: !0 };
        return (
          queueMicrotask(() => {
            n.current && e[0]();
          }),
          t.add(() => {
            n.current = !1;
          })
        );
      },
      style(e, t, n) {
        let o = e.style.getPropertyValue(t);
        return (
          t.startsWith("--")
            ? e.style.setProperty(t, n)
            : Object.assign(e.style, { [t]: n }),
          this.add(() => {
            t.startsWith("--")
              ? e.style.setProperty(t, o)
              : Object.assign(e.style, { [t]: o });
          })
        );
      },
      add: (t) => (
        e.includes(t) || e.push(t),
        () => {
          let n = e.indexOf(t);
          if (n >= 0) for (let t of e.splice(n, 1)) t();
        }
      ),
      dispose() {
        for (let t of e.splice(0)) t();
      },
    };
  return t;
}
function Pt(e, t = () => []) {
  let n = !1,
    o = null,
    r = X();
  return {
    start(i, a) {
      let l = [e, ...t()];
      ((n = !n && null !== o && o !== i), (o = i));
      for (let e of l)
        Cn(
          e,
          () => {
            n ||
              ("in" === i
                ? ((e.dataset.transition = ""),
                  (e.dataset.enter = ""),
                  (e.dataset.closed = ""),
                  delete e.dataset.leave)
                : "out" === i &&
                  ((e.dataset.transition = ""),
                  (e.dataset.leave = ""),
                  delete e.dataset.enter));
          },
          null !== o,
        );
      r.nextFrame(() => {
        for (let e of l)
          n
            ? "in" === i
              ? (delete e.dataset.enter,
                delete e.dataset.closed,
                (e.dataset.leave = ""))
              : "out" === i &&
                (delete e.dataset.leave,
                (e.dataset.enter = ""),
                (e.dataset.closed = ""))
            : "in" === i
              ? delete e.dataset.closed
              : "out" === i && (e.dataset.closed = "");
        r.requestAnimationFrame(() => {
          r.add(
            Mn(e, () => {
              if (
                !(
                  n &&
                  "function" == typeof e.getAnimations &&
                  e.getAnimations({ subtree: !0 }).length > 0
                )
              ) {
                for (let e of l)
                  (delete e.dataset.transition,
                    delete e.dataset.enter,
                    delete e.dataset.closed,
                    delete e.dataset.leave);
                ((o = null), a?.());
              }
            }),
          );
        });
      });
    },
    abort() {
      (r.dispose(), (n = !1), (o = null));
    },
  };
}
function Cn(e, t, n = !1) {
  if (n) return void t();
  let o = e.style.transition;
  ((e.style.transition = "none"),
    t(),
    e.offsetHeight,
    (e.style.transition = o));
}
function Mn(e, t) {
  let n = X();
  if (!e) return n.dispose;
  let o = !1;
  n.add(() => {
    o = !0;
  });
  let r =
    e
      .getAnimations?.({ subtree: !0 })
      .filter((e) => e instanceof CSSTransition) ?? [];
  return 0 === r.length
    ? (t(), n.dispose)
    : (Promise.allSettled(r.map((e) => e.finished)).then(() => {
        o || t();
      }),
      n.dispose);
}
((gt = new WeakMap()), (Kt = new WeakMap()), (rt = new WeakMap()));
var Ot = Math.min,
  J = Math.max,
  _t = Math.round,
  jt = Math.floor,
  $ = (e) => ({ x: e, y: e }),
  Hn = { left: "right", right: "left", bottom: "top", top: "bottom" },
  Rn = { start: "end", end: "start" };
function Re(e, t, n) {
  return J(e, Ot(t, n));
}
function ce(e, t) {
  return "function" == typeof e ? e(t) : e;
}
function bt(e) {
  return e.split("-")[0];
}
function fe(e) {
  return e.split("-")[1];
}
function Be(e) {
  return "x" === e ? "y" : "x";
}
function Ne(e) {
  return "y" === e ? "height" : "width";
}
function it(e) {
  return ["top", "bottom"].includes(bt(e)) ? "y" : "x";
}
function Fe(e) {
  return Be(it(e));
}
function Mo(e, t, n) {
  void 0 === n && (n = !1);
  let o = fe(e),
    r = Fe(e),
    i = Ne(r),
    a =
      "x" === r
        ? o === (n ? "end" : "start")
          ? "right"
          : "left"
        : "start" === o
          ? "bottom"
          : "top";
  return (t.reference[i] > t.floating[i] && (a = Ut(a)), [a, Ut(a)]);
}
function Ho(e) {
  let t = Ut(e);
  return [ue(e), t, ue(t)];
}
function ue(e) {
  return e.replace(/start|end/g, (e) => Rn[e]);
}
function Bn(e, t, n) {
  let o = ["left", "right"],
    r = ["right", "left"],
    i = ["top", "bottom"],
    a = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? (t ? r : o) : t ? o : r;
    case "left":
    case "right":
      return t ? i : a;
    default:
      return [];
  }
}
function Ro(e, t, n, o) {
  let r = fe(e),
    i = Bn(bt(e), "start" === n, o);
  return (
    r && ((i = i.map((e) => e + "-" + r)), t && (i = i.concat(i.map(ue)))),
    i
  );
}
function Ut(e) {
  return e.replace(/left|right|bottom|top/g, (e) => Hn[e]);
}
function Nn(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function Bo(e) {
  return "number" != typeof e
    ? Nn(e)
    : { top: e, right: e, bottom: e, left: e };
}
function vt(e) {
  let { x: t, y: n, width: o, height: r } = e;
  return {
    width: o,
    height: r,
    top: n,
    left: t,
    right: t + o,
    bottom: n + r,
    x: t,
    y: n,
  };
}
function No(e, t, n) {
  let o,
    { reference: r, floating: i } = e,
    a = it(t),
    l = Fe(t),
    s = Ne(l),
    u = bt(t),
    c = "y" === a,
    d = r.x + r.width / 2 - i.width / 2,
    h = r.y + r.height / 2 - i.height / 2,
    p = r[s] / 2 - i[s] / 2;
  switch (u) {
    case "top":
      o = { x: d, y: r.y - i.height };
      break;
    case "bottom":
      o = { x: d, y: r.y + r.height };
      break;
    case "right":
      o = { x: r.x + r.width, y: h };
      break;
    case "left":
      o = { x: r.x - i.width, y: h };
      break;
    default:
      o = { x: r.x, y: r.y };
  }
  switch (fe(t)) {
    case "start":
      o[l] -= p * (n && c ? -1 : 1);
      break;
    case "end":
      o[l] += p * (n && c ? -1 : 1);
  }
  return o;
}
var Fo = async (e, t, n) => {
  let {
      placement: o = "bottom",
      strategy: r = "absolute",
      middleware: i = [],
      platform: a,
    } = n,
    l = i.filter(Boolean),
    s = await (null == a.isRTL ? void 0 : a.isRTL(t)),
    u = await a.getElementRects({ reference: e, floating: t, strategy: r }),
    { x: c, y: d } = No(u, o, s),
    h = o,
    p = {},
    f = 0;
  for (let n = 0; n < l.length; n++) {
    let { name: i, fn: m } = l[n],
      {
        x: g,
        y: b,
        data: v,
        reset: w,
      } = await m({
        x: c,
        y: d,
        initialPlacement: o,
        placement: h,
        strategy: r,
        middlewareData: p,
        rects: u,
        platform: a,
        elements: { reference: e, floating: t },
      });
    ((c = g ?? c),
      (d = b ?? d),
      (p = { ...p, [i]: { ...p[i], ...v } }),
      w &&
        f <= 50 &&
        (f++,
        "object" == typeof w &&
          (w.placement && (h = w.placement),
          w.rects &&
            (u =
              !0 === w.rects
                ? await a.getElementRects({
                    reference: e,
                    floating: t,
                    strategy: r,
                  })
                : w.rects),
          ({ x: c, y: d } = No(u, h, s))),
        (n = -1)));
  }
  return { x: c, y: d, placement: h, strategy: r, middlewareData: p };
};
async function qe(e, t) {
  var n;
  void 0 === t && (t = {});
  let { x: o, y: r, platform: i, rects: a, elements: l, strategy: s } = e,
    {
      boundary: u = "clippingAncestors",
      rootBoundary: c = "viewport",
      elementContext: d = "floating",
      altBoundary: h = !1,
      padding: p = 0,
    } = ce(t, e),
    f = Bo(p),
    m = l[h ? ("floating" === d ? "reference" : "floating") : d],
    g = vt(
      await i.getClippingRect({
        element:
          null == (n = await (null == i.isElement ? void 0 : i.isElement(m))) ||
          n
            ? m
            : m.contextElement ||
              (await (null == i.getDocumentElement
                ? void 0
                : i.getDocumentElement(l.floating))),
        boundary: u,
        rootBoundary: c,
        strategy: s,
      }),
    ),
    b =
      "floating" === d
        ? { x: o, y: r, width: a.floating.width, height: a.floating.height }
        : a.reference,
    v = await (null == i.getOffsetParent
      ? void 0
      : i.getOffsetParent(l.floating)),
    w = ((await (null == i.isElement ? void 0 : i.isElement(v))) &&
      (await (null == i.getScale ? void 0 : i.getScale(v)))) || { x: 1, y: 1 },
    y = vt(
      i.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: l,
            rect: b,
            offsetParent: v,
            strategy: s,
          })
        : b,
    );
  return {
    top: (g.top - y.top + f.top) / w.y,
    bottom: (y.bottom - g.bottom + f.bottom) / w.y,
    left: (g.left - y.left + f.left) / w.x,
    right: (y.right - g.right + f.right) / w.x,
  };
}
var qo = function (e) {
    return (
      void 0 === e && (e = {}),
      {
        name: "flip",
        options: e,
        async fn(t) {
          var n, o;
          let {
              placement: r,
              middlewareData: i,
              rects: a,
              initialPlacement: l,
              platform: s,
              elements: u,
            } = t,
            {
              mainAxis: c = !0,
              crossAxis: d = !0,
              fallbackPlacements: h,
              fallbackStrategy: p = "bestFit",
              fallbackAxisSideDirection: f = "none",
              flipAlignment: m = !0,
              ...g
            } = ce(e, t);
          if (null != (n = i.arrow) && n.alignmentOffset) return {};
          let b = bt(r),
            v = it(l),
            w = bt(l) === l,
            y = await (null == s.isRTL ? void 0 : s.isRTL(u.floating)),
            A = h || (w || !m ? [Ut(l)] : Ho(l)),
            E = "none" !== f;
          !h && E && A.push(...Ro(l, m, f, y));
          let x = [l, ...A],
            T = await qe(t, g),
            k = [],
            I = (null == (o = i.flip) ? void 0 : o.overflows) || [];
          if ((c && k.push(T[b]), d)) {
            let e = Mo(r, a, y);
            k.push(T[e[0]], T[e[1]]);
          }
          if (
            ((I = [...I, { placement: r, overflows: k }]),
            !k.every((e) => e <= 0))
          ) {
            var L, S;
            let e = ((null == (L = i.flip) ? void 0 : L.index) || 0) + 1,
              t = x[e];
            if (
              t &&
              ("alignment" !== d ||
                v === it(t) ||
                I.every((e) => e.overflows[0] > 0 && it(e.placement) === v))
            )
              return {
                data: { index: e, overflows: I },
                reset: { placement: t },
              };
            let n =
              null ==
              (S = I.filter((e) => e.overflows[0] <= 0).sort(
                (e, t) => e.overflows[1] - t.overflows[1],
              )[0])
                ? void 0
                : S.placement;
            if (!n)
              switch (p) {
                case "bestFit": {
                  var P;
                  let e =
                    null ==
                    (P = I.filter((e) => {
                      if (E) {
                        let t = it(e.placement);
                        return t === v || "y" === t;
                      }
                      return !0;
                    })
                      .map((e) => [
                        e.placement,
                        e.overflows
                          .filter((e) => e > 0)
                          .reduce((e, t) => e + t, 0),
                      ])
                      .sort((e, t) => e[1] - t[1])[0])
                      ? void 0
                      : P[0];
                  e && (n = e);
                  break;
                }
                case "initialPlacement":
                  n = l;
              }
            if (r !== n) return { reset: { placement: n } };
          }
          return {};
        },
      }
    );
  },
  Vo = function (e) {
    return (
      void 0 === e && (e = {}),
      {
        name: "shift",
        options: e,
        async fn(t) {
          let { x: n, y: o, placement: r } = t,
            {
              mainAxis: i = !0,
              crossAxis: a = !1,
              limiter: l = {
                fn: (e) => {
                  let { x: t, y: n } = e;
                  return { x: t, y: n };
                },
              },
              ...s
            } = ce(e, t),
            u = { x: n, y: o },
            c = await qe(t, s),
            d = it(bt(r)),
            h = Be(d),
            p = u[h],
            f = u[d];
          if (i) {
            let e = "y" === h ? "bottom" : "right";
            p = Re(p + c["y" === h ? "top" : "left"], p, p - c[e]);
          }
          if (a) {
            let e = "y" === d ? "bottom" : "right";
            f = Re(f + c["y" === d ? "top" : "left"], f, f - c[e]);
          }
          let m = l.fn({ ...t, [h]: p, [d]: f });
          return {
            ...m,
            data: { x: m.x - n, y: m.y - o, enabled: { [h]: i, [d]: a } },
          };
        },
      }
    );
  };
function de() {
  return typeof window < "u";
}
function wt(e) {
  return $o(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function H(e) {
  var t;
  return (
    (null == e || null == (t = e.ownerDocument) ? void 0 : t.defaultView) ||
    window
  );
}
function K(e) {
  var t;
  return null == (t = ($o(e) ? e.ownerDocument : e.document) || window.document)
    ? void 0
    : t.documentElement;
}
function $o(e) {
  return !!de() && (e instanceof Node || e instanceof H(e).Node);
}
function q(e) {
  return !!de() && (e instanceof Element || e instanceof H(e).Element);
}
function U(e) {
  return !!de() && (e instanceof HTMLElement || e instanceof H(e).HTMLElement);
}
function Wo(e) {
  return (
    !(!de() || typeof ShadowRoot > "u") &&
    (e instanceof ShadowRoot || e instanceof H(e).ShadowRoot)
  );
}
function Ct(e) {
  let { overflow: t, overflowX: n, overflowY: o, display: r } = V(e);
  return (
    /auto|scroll|overlay|hidden|clip/.test(t + o + n) &&
    !["inline", "contents"].includes(r)
  );
}
function Ko(e) {
  return ["table", "td", "th"].includes(wt(e));
}
function zt(e) {
  return [":popover-open", ":modal"].some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
function pe(e) {
  let t = me(),
    n = q(e) ? V(e) : e;
  return (
    ["transform", "translate", "scale", "rotate", "perspective"].some(
      (e) => !!n[e] && "none" !== n[e],
    ) ||
    (!!n.containerType && "normal" !== n.containerType) ||
    (!t && !!n.backdropFilter && "none" !== n.backdropFilter) ||
    (!t && !!n.filter && "none" !== n.filter) ||
    ["transform", "translate", "scale", "rotate", "perspective", "filter"].some(
      (e) => (n.willChange || "").includes(e),
    ) ||
    ["paint", "layout", "strict", "content"].some((e) =>
      (n.contain || "").includes(e),
    )
  );
}
function Uo(e) {
  let t = Z(e);
  for (; U(t) && !yt(t); ) {
    if (pe(t)) return t;
    if (zt(t)) return null;
    t = Z(t);
  }
  return null;
}
function me() {
  return (
    !(typeof CSS > "u" || !CSS.supports) &&
    CSS.supports("-webkit-backdrop-filter", "none")
  );
}
function yt(e) {
  return ["html", "body", "#document"].includes(wt(e));
}
function V(e) {
  return H(e).getComputedStyle(e);
}
function Gt(e) {
  return q(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Z(e) {
  if ("html" === wt(e)) return e;
  let t = e.assignedSlot || e.parentNode || (Wo(e) && e.host) || K(e);
  return Wo(t) ? t.host : t;
}
function _o(e) {
  let t = Z(e);
  return yt(t)
    ? e.ownerDocument
      ? e.ownerDocument.body
      : e.body
    : U(t) && Ct(t)
      ? t
      : _o(t);
}
function Dt(e, t, n) {
  var o;
  (void 0 === t && (t = []), void 0 === n && (n = !0));
  let r = _o(e),
    i = r === (null == (o = e.ownerDocument) ? void 0 : o.body),
    a = H(r);
  if (i) {
    let e = he(a);
    return t.concat(
      a,
      a.visualViewport || [],
      Ct(r) ? r : [],
      e && n ? Dt(e) : [],
    );
  }
  return t.concat(r, Dt(r, [], n));
}
function he(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Go(e) {
  let t = V(e),
    n = parseFloat(t.width) || 0,
    o = parseFloat(t.height) || 0,
    r = U(e),
    i = r ? e.offsetWidth : n,
    a = r ? e.offsetHeight : o,
    l = _t(n) !== i || _t(o) !== a;
  return (l && ((n = i), (o = a)), { width: n, height: o, $: l });
}
function We(e) {
  return q(e) ? e : e.contextElement;
}
function Mt(e) {
  let t = We(e);
  if (!U(t)) return $(1);
  let n = t.getBoundingClientRect(),
    { width: o, height: r, $: i } = Go(t),
    a = (i ? _t(n.width) : n.width) / o,
    l = (i ? _t(n.height) : n.height) / r;
  return (
    (!a || !Number.isFinite(a)) && (a = 1),
    (!l || !Number.isFinite(l)) && (l = 1),
    { x: a, y: l }
  );
}
var Fn = $(0);
function Yo(e) {
  let t = H(e);
  return me() && t.visualViewport
    ? { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop }
    : Fn;
}
function qn(e, t, n) {
  return (void 0 === t && (t = !1), !(!n || (t && n !== H(e))) && t);
}
function Et(e, t, n, o) {
  (void 0 === t && (t = !1), void 0 === n && (n = !1));
  let r = e.getBoundingClientRect(),
    i = We(e),
    a = $(1);
  t && (o ? q(o) && (a = Mt(o)) : (a = Mt(e)));
  let l = qn(i, n, o) ? Yo(i) : $(0),
    s = (r.left + l.x) / a.x,
    u = (r.top + l.y) / a.y,
    c = r.width / a.x,
    d = r.height / a.y;
  if (i) {
    let e = H(i),
      t = o && q(o) ? H(o) : o,
      n = e,
      r = he(n);
    for (; r && o && t !== n; ) {
      let e = Mt(r),
        t = r.getBoundingClientRect(),
        o = V(r),
        i = t.left + (r.clientLeft + parseFloat(o.paddingLeft)) * e.x,
        a = t.top + (r.clientTop + parseFloat(o.paddingTop)) * e.y;
      ((s *= e.x),
        (u *= e.y),
        (c *= e.x),
        (d *= e.y),
        (s += i),
        (u += a),
        (n = H(r)),
        (r = he(n)));
    }
  }
  return vt({ width: c, height: d, x: s, y: u });
}
function $e(e, t) {
  let n = Gt(e).scrollLeft;
  return t ? t.left + n : Et(K(e)).left + n;
}
function Qo(e, t, n) {
  void 0 === n && (n = !1);
  let o = e.getBoundingClientRect();
  return {
    x: o.left + t.scrollLeft - (n ? 0 : $e(e, o)),
    y: o.top + t.scrollTop,
  };
}
function Vn(e) {
  let { elements: t, rect: n, offsetParent: o, strategy: r } = e,
    i = "fixed" === r,
    a = K(o),
    l = !!t && zt(t.floating);
  if (o === a || (l && i)) return n;
  let s = { scrollLeft: 0, scrollTop: 0 },
    u = $(1),
    c = $(0),
    d = U(o);
  if ((d || (!d && !i)) && (("body" !== wt(o) || Ct(a)) && (s = Gt(o)), U(o))) {
    let e = Et(o);
    ((u = Mt(o)), (c.x = e.x + o.clientLeft), (c.y = e.y + o.clientTop));
  }
  let h = !a || d || i ? $(0) : Qo(a, s, !0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - s.scrollLeft * u.x + c.x + h.x,
    y: n.y * u.y - s.scrollTop * u.y + c.y + h.y,
  };
}
function Wn(e) {
  return Array.from(e.getClientRects());
}
function $n(e) {
  let t = K(e),
    n = Gt(e),
    o = e.ownerDocument.body,
    r = J(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth),
    i = J(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight),
    a = -n.scrollLeft + $e(e),
    l = -n.scrollTop;
  return (
    "rtl" === V(o).direction && (a += J(t.clientWidth, o.clientWidth) - r),
    { width: r, height: i, x: a, y: l }
  );
}
function Kn(e, t) {
  let n = H(e),
    o = K(e),
    r = n.visualViewport,
    i = o.clientWidth,
    a = o.clientHeight,
    l = 0,
    s = 0;
  if (r) {
    ((i = r.width), (a = r.height));
    let e = me();
    (!e || (e && "fixed" === t)) && ((l = r.offsetLeft), (s = r.offsetTop));
  }
  return { width: i, height: a, x: l, y: s };
}
function Un(e, t) {
  let n = Et(e, !0, "fixed" === t),
    o = n.top + e.clientTop,
    r = n.left + e.clientLeft,
    i = U(e) ? Mt(e) : $(1);
  return {
    width: e.clientWidth * i.x,
    height: e.clientHeight * i.y,
    x: r * i.x,
    y: o * i.y,
  };
}
function jo(e, t, n) {
  let o;
  if ("viewport" === t) o = Kn(e, n);
  else if ("document" === t) o = $n(K(e));
  else if (q(t)) o = Un(t, n);
  else {
    let n = Yo(e);
    o = { x: t.x - n.x, y: t.y - n.y, width: t.width, height: t.height };
  }
  return vt(o);
}
function Xo(e, t) {
  let n = Z(e);
  return (
    !(n === t || !q(n) || yt(n)) && ("fixed" === V(n).position || Xo(n, t))
  );
}
function _n(e, t) {
  let n = t.get(e);
  if (n) return n;
  let o = Dt(e, [], !1).filter((e) => q(e) && "body" !== wt(e)),
    r = null,
    i = "fixed" === V(e).position,
    a = i ? Z(e) : e;
  for (; q(a) && !yt(a); ) {
    let t = V(a),
      n = pe(a);
    (!n && "fixed" === t.position && (r = null),
      (
        i
          ? !n && !r
          : (!n &&
              "static" === t.position &&
              r &&
              ["absolute", "fixed"].includes(r.position)) ||
            (Ct(a) && !n && Xo(e, a))
      )
        ? (o = o.filter((e) => e !== a))
        : (r = t),
      (a = Z(a)));
  }
  return (t.set(e, o), o);
}
function jn(e) {
  let { element: t, boundary: n, rootBoundary: o, strategy: r } = e,
    i = [
      ...("clippingAncestors" === n
        ? zt(t)
          ? []
          : _n(t, this._c)
        : [].concat(n)),
      o,
    ],
    a = i[0],
    l = i.reduce(
      (e, n) => {
        let o = jo(t, n, r);
        return (
          (e.top = J(o.top, e.top)),
          (e.right = Ot(o.right, e.right)),
          (e.bottom = Ot(o.bottom, e.bottom)),
          (e.left = J(o.left, e.left)),
          e
        );
      },
      jo(t, a, r),
    );
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top,
  };
}
function zn(e) {
  let { width: t, height: n } = Go(e);
  return { width: t, height: n };
}
function Gn(e, t, n) {
  let o = U(t),
    r = K(t),
    i = "fixed" === n,
    a = Et(e, !0, i, t),
    l = { scrollLeft: 0, scrollTop: 0 },
    s = $(0);
  function u() {
    s.x = $e(r);
  }
  if (o || (!o && !i))
    if ((("body" !== wt(t) || Ct(r)) && (l = Gt(t)), o)) {
      let e = Et(t, !0, i, t);
      ((s.x = e.x + t.clientLeft), (s.y = e.y + t.clientTop));
    } else r && u();
  i && !o && r && u();
  let c = !r || o || i ? $(0) : Qo(r, l);
  return {
    x: a.left + l.scrollLeft - s.x - c.x,
    y: a.top + l.scrollTop - s.y - c.y,
    width: a.width,
    height: a.height,
  };
}
function Ve(e) {
  return "static" === V(e).position;
}
function zo(e, t) {
  if (!U(e) || "fixed" === V(e).position) return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return (K(e) === n && (n = n.ownerDocument.body), n);
}
function Jo(e, t) {
  let n = H(e);
  if (zt(e)) return n;
  if (!U(e)) {
    let t = Z(e);
    for (; t && !yt(t); ) {
      if (q(t) && !Ve(t)) return t;
      t = Z(t);
    }
    return n;
  }
  let o = zo(e, t);
  for (; o && Ko(o) && Ve(o); ) o = zo(o, t);
  return o && yt(o) && Ve(o) && !pe(o) ? n : o || Uo(e) || n;
}
var Yn = async function (e) {
  let t = this.getOffsetParent || Jo,
    n = this.getDimensions,
    o = await n(e.floating);
  return {
    reference: Gn(e.reference, await t(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: o.width, height: o.height },
  };
};
function Qn(e) {
  return "rtl" === V(e).direction;
}
var Xn = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Vn,
  getDocumentElement: K,
  getClippingRect: jn,
  getOffsetParent: Jo,
  getElementRects: Yn,
  getClientRects: Wn,
  getDimensions: zn,
  getScale: Mt,
  isElement: q,
  isRTL: Qn,
};
function Zo(e, t) {
  return (
    e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
  );
}
function Jn(e, t) {
  let n,
    o = null,
    r = K(e);
  function i() {
    var e;
    (clearTimeout(n), null == (e = o) || e.disconnect(), (o = null));
  }
  return (
    (function a(l, s) {
      (void 0 === l && (l = !1), void 0 === s && (s = 1), i());
      let u = e.getBoundingClientRect(),
        { left: c, top: d, width: h, height: p } = u;
      if ((l || t(), !h || !p)) return;
      let f = {
          rootMargin:
            -jt(d) +
            "px " +
            -jt(r.clientWidth - (c + h)) +
            "px " +
            -jt(r.clientHeight - (d + p)) +
            "px " +
            -jt(c) +
            "px",
          threshold: J(0, Ot(1, s)) || 1,
        },
        m = !0;
      function g(t) {
        let o = t[0].intersectionRatio;
        if (o !== s) {
          if (!m) return a();
          o
            ? a(!1, o)
            : (n = setTimeout(() => {
                a(!1, 1e-7);
              }, 1e3));
        }
        (1 === o && !Zo(u, e.getBoundingClientRect()) && a(), (m = !1));
      }
      try {
        o = new IntersectionObserver(g, { ...f, root: r.ownerDocument });
      } catch {
        o = new IntersectionObserver(g, f);
      }
      o.observe(e);
    })(!0),
    i
  );
}
function tn(e, t, n, o) {
  void 0 === o && (o = {});
  let {
      ancestorScroll: r = !0,
      ancestorResize: i = !0,
      elementResize: a = "function" == typeof ResizeObserver,
      layoutShift: l = "function" == typeof IntersectionObserver,
      animationFrame: s = !1,
    } = o,
    u = We(e),
    c = r || i ? [...(u ? Dt(u) : []), ...Dt(t)] : [];
  c.forEach((e) => {
    (r && e.addEventListener("scroll", n, { passive: !0 }),
      i && e.addEventListener("resize", n));
  });
  let d = u && l ? Jn(u, n) : null,
    h = -1,
    p = null;
  a &&
    ((p = new ResizeObserver((e) => {
      let [o] = e;
      (o &&
        o.target === u &&
        p &&
        (p.unobserve(t),
        cancelAnimationFrame(h),
        (h = requestAnimationFrame(() => {
          var e;
          null == (e = p) || e.observe(t);
        }))),
        n());
    })),
    u && !s && p.observe(u),
    p.observe(t));
  let f,
    m = s ? Et(e) : null;
  return (
    s &&
      (function t() {
        let o = Et(e);
        (m && !Zo(m, o) && n(), (m = o), (f = requestAnimationFrame(t)));
      })(),
    n(),
    () => {
      var e;
      (c.forEach((e) => {
        (r && e.removeEventListener("scroll", n),
          i && e.removeEventListener("resize", n));
      }),
        d?.(),
        null == (e = p) || e.disconnect(),
        (p = null),
        s && cancelAnimationFrame(f));
    }
  );
}
var en = Vo,
  on = qo,
  nn = (e, t, n) => {
    let o = new Map(),
      r = { platform: Xn, ...n },
      i = { ...r.platform, _c: o };
    return Fo(e, t, { ...r, platform: i });
  },
  st = 4;
function sn(e, t) {
  let n = () => {};
  return function (o) {
    if ((n(), !o)) return;
    let r = t();
    if (!r || !e.hasAttribute("anchor")) return;
    let i = e.getAttribute("anchor"),
      a = e.getAttribute("anchor-strategy") || "absolute";
    ("absolute" !== a &&
      "fixed" !== a &&
      (console.warn(
        `[createAnchorUpdater] Invalid anchor strategy "${a}" for element:`,
        e,
      ),
      (a = "absolute")),
      (n = tn(r, e, () => {
        let t = rn(
            window.getComputedStyle(e).getPropertyValue("--anchor-gap"),
            e,
          ),
          n = rn(
            window.getComputedStyle(e).getPropertyValue("--anchor-offset"),
            e,
          ),
          o = {};
        switch (i.split(" ")[0]) {
          case "top":
          case "bottom":
            o = {
              top: t + st,
              left: -1 * n + st,
              right: n + st,
              bottom: t + st,
            };
            break;
          case "left":
          case "right":
            o = {
              top: -1 * n + st,
              bottom: n + st,
              left: t + st,
              right: t + st,
            };
        }
        nn(r, e, {
          strategy: a,
          placement: i.replace(" ", "-"),
          middleware: [on({ padding: o }), en({ padding: o })],
        }).then(({ x: t, y: n, placement: o }) => {
          if (!Zn() && "absolute" === a) {
            let o = null;
            for (let t = e.parentElement; t; t = t.parentElement) {
              let e = getComputedStyle(t).position;
              if (
                "relative" === e ||
                "absolute" === e ||
                "fixed" === e ||
                "sticky" === e
              ) {
                o = t;
                break;
              }
            }
            if (o) {
              let e = o.getBoundingClientRect();
              ((t -= e.left + window.scrollX), (n -= e.top + window.scrollY));
            }
          }
          let r = `${t}px`,
            i = `${n}px`;
          switch (o.split("-")[0]) {
            case "top":
              ((i = `calc(${n}px - var(--anchor-gap, 0px))`),
                (r = `calc(${t}px + var(--anchor-offset, 0px))`));
              break;
            case "right":
              ((r = `calc(${t}px + var(--anchor-gap, 0px))`),
                (i = `calc(${n}px + var(--anchor-offset, 0px))`));
              break;
            case "bottom":
              ((i = `calc(${n}px + var(--anchor-gap, 0px))`),
                (r = `calc(${t}px + var(--anchor-offset, 0px))`));
              break;
            case "left":
              ((r = `calc(${t}px - var(--anchor-gap, 0px))`),
                (i = `calc(${n}px + var(--anchor-offset, 0px))`));
          }
          Object.assign(e.style, { left: r, top: i, position: a });
        });
      })));
  };
}
function Zn() {
  return (
    "showPopover" in HTMLElement.prototype &&
    HTMLElement.prototype.showPopover.toString().includes("[native code]")
  );
}
function rn(e, t) {
  let n = document.createElement("div");
  (t.appendChild(n),
    n.style.setProperty("margin-top", "0px", "important"),
    n.style.setProperty("margin-top", e, "important"));
  let o = parseFloat(window.getComputedStyle(n).marginTop) || 0;
  return (t.removeChild(n), o);
}
function Yt(e) {
  return Ke(e) && "tabIndex" in e;
}
function Ke(e) {
  return tr(e) && "tagName" in e;
}
function Ue(e) {
  return Ke(e) && "accessKey" in e;
}
function tr(e) {
  return "object" == typeof e && null !== e && "nodeType" in e;
}
function ln(e) {
  return Ke(e) && "style" in e;
}
function an(e) {
  return Ue(e) && "INPUT" === e.nodeName;
}
function R(e) {
  let t = e.getBoundingClientRect();
  return !(
    (0 === t.x && 0 === t.y && 0 === t.width && 0 === t.height) ||
    "hidden" ===
      (e.ownerDocument.defaultView || window).getComputedStyle(e).visibility
  );
}
function lt(e, t, n) {
  function o() {
    if (!R(e)) {
      for (let t of e.children) if (R(t)) return;
      n();
    }
  }
  if (typeof ResizeObserver < "u") {
    let n = new ResizeObserver(o);
    (n.observe(e), t.addEventListener("abort", () => n.disconnect()));
  }
  if (typeof IntersectionObserver < "u") {
    let n = new IntersectionObserver(o);
    (n.observe(e), t.addEventListener("abort", () => n.disconnect()));
  }
}
var Qt = !1,
  _e = !1;
typeof navigator < "u" &&
  ((Qt = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)),
  (_e = navigator.userAgent.toLowerCase().includes("firefox")));
var je = !1;
function Ht(e, t, n, o, r, i) {
  or(e.ownerDocument);
  let a = Pt(e),
    l = sn(e, n),
    s = X();
  e.setAttribute("popover", "");
  let u = t();
  function c() {
    e.hasAttribute("open") && e.hidePopover();
  }
  (u &&
    (u.setAttribute("type", "button"),
    u.setAttribute("aria-haspopup", "true"),
    u.setAttribute("aria-controls", e.id),
    u.setAttribute("aria-expanded", "false"),
    u.id && e.setAttribute("aria-labelledby", u.id)),
    e.hasAttribute("open") && queueMicrotask(() => e.showPopover()),
    e.addEventListener(
      "beforetoggle",
      (t) => {
        let n = t;
        l("open" === n.newState);
        let o = e.hasAttribute("open");
        ("open" !== n.newState || o
          ? "closed" === n.newState && o && e.removeAttributeNoCallbacks("open")
          : e.setAttributeNoCallbacks("open", ""),
          "open" === n.newState
            ? (u?.setAttribute("aria-expanded", "true"),
              r?.(),
              (je = "" === e.getAttribute("popover")))
            : (u?.setAttribute("aria-expanded", "false"), i?.(), (je = !1)),
          "closed" === n.oldState && "open" === n.newState
            ? (Qt && (s.dispose(), (s = X())), a.start("in"))
            : "open" === n.oldState &&
              "closed" === n.newState &&
              (Qt && s.style(e, "transition-property", "none"),
              a.start("out")));
      },
      { signal: o },
    ),
    lt(e, o, c),
    u && lt(u, o, c),
    o.addEventListener("abort", () => a.abort()));
}
var un = new WeakSet();
function or(e) {
  if (un.has(e)) return;
  un.add(e);
  let t = null;
  e.addEventListener(
    "mousedown",
    () => {
      _e ||
        Qt ||
        !je ||
        (e.body.setAttribute("tabindex", "-1"),
        t && clearTimeout(t),
        (t = setTimeout(() => e.body.removeAttribute("tabindex"))));
    },
    { capture: !0 },
  );
}
function _(e, t, n, o) {
  function r() {
    let n = e.getBoundingClientRect();
    o.style.setProperty(t, n.width + "px");
  }
  let i = e.ownerDocument,
    a = new ResizeObserver(r);
  (a.observe(e),
    i.addEventListener("transitionend", r, { signal: n }),
    n.addEventListener("abort", () => a.disconnect()));
}
var nr = 0;
function k(e) {
  return `${e}-${nr++}`;
}
var rr = 200;
function at(e, t, n, o) {
  (ir(),
    e.addEventListener(
      t,
      (e) => {
        (null !== ze && Date.now() - ze < rr) || o(e);
      },
      { passive: !0, signal: n },
    ));
}
var ze = null,
  fn = !1;
function ir() {
  fn ||
    ((fn = !0),
    document.addEventListener(
      "keydown",
      () => {
        ze = Date.now();
      },
      { capture: !0 },
    ));
}
var ge = class extends Map {
    constructor(e) {
      (super(), (this.factory = e));
    }
    get(e) {
      let t = super.get(e);
      return (void 0 === t && ((t = this.factory(e, this)), this.set(e, t)), t);
    }
  },
  dn = new ge(() => ({ referenceCounter: 0, d: X() }));
function be(e) {
  let t = dn.get(e);
  if ((t.referenceCounter++, 1 === t.referenceCounter)) {
    let n = [ur(), lr(), sr()];
    (n.forEach(({ before: n }) => n({ doc: e, d: t.d })),
      n.forEach(({ after: n }) => n({ doc: e, d: t.d })));
  }
  let n = !1;
  return () => {
    n ||
      ((n = !0),
      t.referenceCounter--,
      !(t.referenceCounter > 0) && (t.d.dispose(), dn.delete(e)));
  };
}
function sr() {
  return {
    before({ doc: e, d: t }) {
      t.style(e.documentElement, "overflow", "hidden");
    },
    after() {},
  };
}
function lr() {
  let e;
  return {
    before({ doc: t }) {
      let n = t.documentElement,
        o = t.defaultView ?? window;
      ((e = Math.max(0, o.innerWidth - n.clientWidth)),
        n.style.setProperty("--el-top-layer-scrollbar-offset", "0px"));
    },
    after({ doc: t, d: n }) {
      let o = t.documentElement,
        r = Math.max(0, o.clientWidth - o.offsetWidth),
        i = Math.max(0, e - r);
      (n.style(o, "paddingRight", `${i}px`),
        n.add(() => {
          o.style.setProperty("--el-top-layer-scrollbar-offset", `-${i}px`);
        }));
    },
  };
}
function ar() {
  return (
    /iPhone/gi.test(window.navigator.platform) ||
    (/Mac/gi.test(window.navigator.platform) &&
      window.navigator.maxTouchPoints > 0)
  );
}
function ur() {
  return ar()
    ? {
        before({ doc: e, d: t }) {
          function n(e) {
            return !!e.closest("[popover], dialog > *");
          }
          t.microTask(() => {
            if (
              "auto" !==
              window.getComputedStyle(e.documentElement).scrollBehavior
            ) {
              let n = X();
              (n.style(e.documentElement, "scrollBehavior", "auto"),
                t.add(() => t.microTask(() => n.dispose())));
            }
            let o = window.scrollY ?? window.pageYOffset,
              r = null;
            (t.addEventListener(
              e,
              "click",
              (t) => {
                if (Yt(t.target))
                  try {
                    let o = t.target.closest("a");
                    if (!o) return;
                    let { hash: i } = new URL(o.href),
                      a = e.querySelector(i);
                    Yt(a) && !n(a) && (r = a);
                  } catch {}
              },
              !0,
            ),
              t.addEventListener(e, "touchstart", (e) => {
                if (Yt(e.target) && ln(e.target))
                  if (n(e.target)) {
                    let o = e.target;
                    for (; o.parentElement && n(o.parentElement); )
                      o = o.parentElement;
                    t.style(o, "overscrollBehavior", "contain");
                  } else t.style(e.target, "touchAction", "none");
              }),
              t.addEventListener(
                e,
                "touchmove",
                (e) => {
                  if (Yt(e.target)) {
                    if (an(e.target)) return;
                    if (n(e.target)) {
                      let t = e.target;
                      for (
                        ;
                        t.parentElement &&
                        "" !== t.dataset.tailwindplusPortal &&
                        !(
                          t.scrollHeight > t.clientHeight ||
                          t.scrollWidth > t.clientWidth
                        );

                      )
                        t = t.parentElement;
                      "" === t.dataset.tailwindplusPortal && e.preventDefault();
                    } else e.preventDefault();
                  }
                },
                { passive: !1 },
              ),
              t.add(() => {
                let e = window.scrollY ?? window.pageYOffset;
                (o !== e && window.scrollTo(0, o),
                  r &&
                    r.isConnected &&
                    (r.scrollIntoView({ block: "nearest" }), (r = null)));
              }));
          });
        },
        after() {},
      }
    : { before() {}, after() {} };
}
function ve(e, t) {
  let n = null;
  (e.addEventListener(
    "toggle",
    (t) => {
      "open" === t.newState
        ? n || (n = be(e.ownerDocument))
        : n && (n(), (n = null));
    },
    { signal: t },
  ),
    t.addEventListener("abort", () => {
      n && (n(), (n = null));
    }));
}
var ut = [
  "[contentEditable=true]",
  "[tabindex]",
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "iframe",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
]
  .map((e) => `${e}:not([tabindex='-1'])`)
  .join(",");
function G(e, t, n) {
  let o = t ? e.indexOf(t) : null;
  switch ((-1 === o && (o = null), n)) {
    case 0:
      for (let t = 0; t < e.length; t++) if (R(e[t])) return e[t];
      return null;
    case 1:
      for (let t = e.length - 1; t >= 0; t--) if (R(e[t])) return e[t];
      return null;
    case 2:
      if (null === o) return G(e, t, 1);
      for (let t = o - 1; t >= 0; t--) if (R(e[t])) return e[t];
      return null;
    case 3:
      if (null === o) return G(e, t, 0);
      for (let t = o + 1; t < e.length; t++) if (R(e[t])) return e[t];
      return null;
    case 4:
      return null;
  }
}
var B,
  Xt,
  Ge = class extends x {
    constructor() {
      (super(...arguments), I(this, B, []), I(this, Xt, null));
    }
    mount(e) {
      let t = this.getInput(),
        n = this.getButton(),
        o = this.getOptions();
      (t.id || (t.id = k("autocomplete-input")),
        n && (n.id || (n.id = k("autocomplete-button"))),
        o.id || (o.id = k("autocomplete-listbox")),
        Ht(
          o,
          () => this.getButton(),
          () => this.getInput(),
          e,
          () => this.onBeforeOpen(),
          () => this.onBeforeClose(),
        ),
        ve(o, e),
        t.setAttribute("role", "combobox"),
        t.setAttribute("aria-autocomplete", "list"),
        t.setAttribute("aria-expanded", "false"),
        t.setAttribute("aria-controls", o.id),
        t.setAttribute("aria-activedescendant", ""),
        t.setAttribute("autocomplete", "off"),
        n &&
          (n.setAttribute("type", "button"),
          n.setAttribute("tabindex", "-1"),
          n.setAttribute("aria-expanded", "false"),
          n.setAttribute("aria-haspopup", "listbox"),
          n.setAttribute("popovertarget", o.id)),
        o.setAttribute("role", "listbox"),
        o.setAttribute("popover", "manual"));
      let r = { passive: !0, signal: e },
        i = this;
      function a() {
        for (let t of o.getItems())
          "option" !== t.getAttribute("role") &&
            (t.id || (t.id = k("option")),
            t.setAttribute("role", "option"),
            t.setAttribute("aria-selected", "false"),
            t.setAttribute("tabIndex", "-1"),
            t.addEventListener("click", () => i.selectOption(t), r),
            at(t, "mouseover", e, () => i.setActiveItem(t, !1)),
            at(t, "mouseout", e, () => i.clearActiveItem()));
        i.filterOptions();
      }
      a();
      let l = new MutationObserver(a);
      (l.observe(this, { attributes: !1, childList: !0, subtree: !0 }),
        n && _(n, "--button-width", e, this),
        _(t, "--input-width", e, this),
        t.addEventListener(
          "input",
          () => {
            t.matches(":disabled") ||
              (this.filterOptions(),
              f(this, B).length > 0
                ? o.hasAttribute("open") || o.showPopover()
                : o.hidePopover());
          },
          { signal: e },
        ));
      let s = () => {
        t.matches(":disabled") ||
          (t.focus(),
          o.hasAttribute("open")
            ? o.hidePopover()
            : (this.filterOptions(), f(this, B).length > 0 && o.showPopover()));
      };
      (t.addEventListener("pointerdown", s, { signal: e }),
        n &&
          (n.addEventListener(
            "pointerdown",
            (e) => {
              (e.preventDefault(), s());
            },
            { signal: e },
          ),
          n.addEventListener(
            "click",
            (e) => {
              (e.preventDefault(), e.stopImmediatePropagation());
            },
            { signal: e },
          )),
        t.addEventListener(
          "blur",
          ({ relatedTarget: e }) => {
            (e && this.contains(e)) || o.hidePopover();
          },
          { signal: e },
        ),
        t.addEventListener(
          "keydown",
          (e) => {
            if (!t.matches(":disabled"))
              switch (e.key) {
                case "ArrowDown":
                  (e.preventDefault(),
                    o.hasAttribute("open") ||
                      (0 === f(this, B).length && this.filterOptions(),
                      f(this, B).length > 0 && o.showPopover()),
                    this.goToItem(3));
                  break;
                case "ArrowUp":
                  (e.preventDefault(),
                    o.hasAttribute("open") ||
                      (0 === f(this, B).length && this.filterOptions(),
                      f(this, B).length > 0 && o.showPopover()),
                    this.goToItem(2));
                  break;
                case "Home":
                case "PageUp":
                  return o.hasAttribute("open")
                    ? (e.preventDefault(),
                      e.stopPropagation(),
                      this.goToItem(0))
                    : void 0;
                case "End":
                case "PageDown":
                  return o.hasAttribute("open")
                    ? (e.preventDefault(),
                      e.stopPropagation(),
                      this.goToItem(1))
                    : void 0;
                case "Enter": {
                  let t = this.getActiveItem();
                  (t && (e.preventDefault(), this.selectOption(t)),
                    o.hasAttribute("open") &&
                      (e.preventDefault(), o.hidePopover()));
                  break;
                }
                case "Escape":
                  if (!o.hasAttribute("open")) return;
                  (e.preventDefault(), o.hidePopover());
                  break;
                case "Tab":
                  o.hidePopover();
              }
          },
          { signal: e },
        ));
      let u = Array.from(o.querySelectorAll("el-option[disabled]"));
      for (let e of u)
        (e.setAttribute("aria-disabled", "true"),
          e.setAttribute("aria-selected", "false"));
      e.addEventListener("abort", () => {
        l.disconnect();
      });
    }
    getInput() {
      let e = this.querySelector("input");
      if (!e)
        throw new Error("`<el-autocomplete>` must contain an input element.");
      return e;
    }
    getButton() {
      return this.querySelector("button");
    }
    getOptions() {
      let e = this.querySelector("el-options");
      if (!e)
        throw new Error(
          "`<el-autocomplete>` must contain a `<el-options>` element.",
        );
      return e;
    }
    filterOptions() {
      let e = this.getInput().value.toLowerCase();
      (f(this, Xt) !== e && (this.clearActiveItem(), L(this, Xt, e)),
        L(this, B, []));
      for (let t of this.getOptions().getItems()) {
        let n = t.getAttribute("value")?.toLowerCase() || "";
        "" === e || n.includes(e)
          ? (f(this, B).push(t),
            t.removeAttribute("hidden"),
            t.removeAttribute("aria-hidden"))
          : (t.setAttribute("hidden", ""),
            t.setAttribute("aria-hidden", "true"));
      }
    }
    getActiveItem() {
      let e = this.getInput().getAttribute("aria-activedescendant");
      return e ? document.getElementById(e) : null;
    }
    goToItem(e) {
      if (0 === f(this, B).length) return;
      let t = this.getActiveItem(),
        n = G(f(this, B), t, e);
      n && this.setActiveItem(n);
    }
    setActiveItem(e, t = !0) {
      let n = this.getInput(),
        o = this.getActiveItem();
      (null !== o && o.setAttribute("aria-selected", "false"),
        e.setAttribute("aria-selected", "true"),
        n.setAttribute("aria-activedescendant", e.id),
        t && e.scrollIntoView({ block: "nearest" }));
    }
    clearActiveItem() {
      let e = this.getInput(),
        t = this.getActiveItem();
      (null !== t && t.setAttribute("aria-selected", "false"),
        e.setAttribute("aria-activedescendant", ""));
    }
    selectOption(e) {
      let t = this.getInput(),
        n = e.getAttribute("value");
      n &&
        ((t.value = n),
        t.dispatchEvent(new Event("input", { bubbles: !0, cancelable: !0 })),
        t.dispatchEvent(new Event("change", { bubbles: !0, cancelable: !0 })),
        this.getOptions().hidePopover());
    }
    onBeforeOpen() {
      let e = this.getInput(),
        t = this.getButton();
      (e.setAttribute("aria-expanded", "true"),
        t?.setAttribute("aria-expanded", "true"));
    }
    onBeforeClose() {
      let e = this.getInput(),
        t = this.getButton();
      (e.setAttribute("aria-expanded", "false"),
        t?.setAttribute("aria-expanded", "false"),
        this.clearActiveItem());
    }
  };
((B = new WeakMap()), (Xt = new WeakMap()), T("el-autocomplete", Ge));
var pn =
  /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
function mn(e) {
  let t = e.innerText ?? "",
    n = e.cloneNode(!0);
  if (!Ue(n)) return t;
  let o = !1;
  for (let e of n.querySelectorAll('[hidden],[aria-hidden],[role="img"]'))
    (e.remove(), (o = !0));
  let r = o ? (n.innerText ?? "") : t;
  return (pn.test(r) && (r = r.replace(pn, "")), r);
}
function hn(e) {
  let t = e.getAttribute("aria-label");
  if ("string" == typeof t) return t.trim();
  let n = e.getAttribute("aria-labelledby");
  if (n) {
    let e = n
      .split(" ")
      .map((e) => {
        let t = document.getElementById(e);
        if (t) {
          let e = t.getAttribute("aria-label");
          return "string" == typeof e ? e.trim() : mn(t).trim();
        }
        return null;
      })
      .filter(Boolean);
    if (e.length > 0) return e.join(", ");
  }
  return mn(e).trim();
}
var j,
  Jt,
  Zt,
  tt,
  we,
  Xe,
  Qe = class extends x {
    constructor() {
      (super(...arguments),
        I(this, tt),
        I(this, j, []),
        I(this, Jt, null),
        I(this, Zt, ({ query: e, content: t }) =>
          t.toLocaleLowerCase().includes(e.toLocaleLowerCase().trim()),
        ));
    }
    mount(e) {
      let t = this.getInput(),
        n = this.getItems();
      (t.id || (t.id = k("command-input")),
        n.id || (n.id = k("command-items")),
        t.setAttribute("role", "combobox"),
        t.setAttribute("aria-autocomplete", "list"),
        t.setAttribute("autocomplete", "off"),
        t.setAttribute("aria-controls", n.id),
        n.setAttribute("role", "listbox"));
      let o = this;
      function r() {
        var t;
        for (let t of n.getItems())
          "option" !== t.getAttribute("role") &&
            (t.id || (t.id = k("item")),
            t.setAttribute("role", "option"),
            t.setAttribute("tabIndex", "-1"),
            t.setAttribute("aria-selected", "false"),
            t.hasAttribute("disabled") &&
              t.setAttribute("aria-disabled", "true"),
            at(t, "mouseover", e, () => {
              var e;
              return N((e = o), tt, Xe).call(e, t, !1);
            }));
        N((t = o), tt, we).call(t, !0);
      }
      r();
      let i = new MutationObserver(r);
      (i.observe(this, { attributes: !1, childList: !0, subtree: !0 }),
        _(t, "--input-width", e, this),
        t.addEventListener("input", () => N(this, tt, we).call(this), {
          signal: e,
        }),
        t.addEventListener(
          "keydown",
          (e) => {
            switch (e.key) {
              case "ArrowDown":
                (e.preventDefault(), this.goToItem(3));
                break;
              case "ArrowUp":
                (e.preventDefault(), this.goToItem(2));
                break;
              case "Home":
              case "PageUp":
                return (
                  e.preventDefault(),
                  e.stopPropagation(),
                  this.goToItem(0)
                );
              case "End":
              case "PageDown":
                return (
                  e.preventDefault(),
                  e.stopPropagation(),
                  this.goToItem(1)
                );
              case "Enter": {
                let t = this.getActiveItem();
                t && (e.preventDefault(), t.click());
                break;
              }
            }
          },
          { signal: e },
        ),
        e.addEventListener("abort", () => {
          i.disconnect();
        }));
    }
    getInput() {
      let e = this.querySelector("input");
      if (!e)
        throw new Error(
          "`<el-command-palette>` must contain an input element.",
        );
      return e;
    }
    getItems() {
      let e = this.querySelector("el-command-list");
      if (!e)
        throw new Error(
          "`<el-command-palette>` must contain a `<el-command-list>` element.",
        );
      return e;
    }
    getGroups() {
      return this.getItems().querySelectorAll("el-command-group");
    }
    getSuggestions() {
      return this.querySelector("el-defaults");
    }
    getActiveItem() {
      let e = this.getInput().getAttribute("aria-activedescendant");
      return e ? document.getElementById(e) : null;
    }
    goToItem(e) {
      if (0 === f(this, j).length) return;
      let t = this.getActiveItem(),
        n = G(f(this, j), t, e);
      n && N(this, tt, Xe).call(this, n);
    }
    clearActiveItem() {
      let e = this.getInput(),
        t = this.getActiveItem();
      if (null !== t) {
        t.setAttribute("aria-selected", "false");
        let e = this.querySelector(`el-command-preview[for="${t.id}"]`);
        e && e.setAttribute("hidden", "");
      }
      (e.removeAttribute("aria-activedescendant"),
        this.dispatchEvent(
          new CustomEvent("change", {
            detail: { relatedTarget: null },
            bubbles: !1,
            cancelable: !1,
          }),
        ));
    }
    reset() {
      let e = this.getInput();
      ((e.value = ""),
        e.dispatchEvent(new Event("input", { bubbles: !0, cancelable: !0 })),
        e.dispatchEvent(new Event("change", { bubbles: !0, cancelable: !0 })),
        N(this, tt, we).call(this, !0),
        this.clearActiveItem());
    }
    setFilterCallback(e) {
      L(this, Zt, e);
    }
  };
((j = new WeakMap()),
  (Jt = new WeakMap()),
  (Zt = new WeakMap()),
  (tt = new WeakSet()),
  (we = function (e = !1) {
    let t = this.getItems(),
      n = this.getInput().value ?? "";
    L(this, j, []);
    for (let e of t.getItems()) {
      if (e.closest("el-defaults")) continue;
      let t = hn(e) ?? "";
      "" !== n && f(this, Zt).call(this, { query: n, node: e, content: t })
        ? (f(this, j).push(e),
          e.removeAttribute("hidden"),
          e.removeAttribute("aria-hidden"))
        : (e.setAttribute("hidden", ""), e.setAttribute("aria-hidden", "true"));
    }
    for (let e of this.getGroups())
      e.getItems().some((e) => !e.hasAttribute("hidden"))
        ? e.removeAttribute("hidden")
        : e.setAttribute("hidden", "");
    let o = this.getSuggestions();
    o &&
      ("" === n
        ? (o.removeAttribute("hidden"), L(this, j, o.getItems()))
        : o.setAttribute("hidden", ""));
    let r = this.querySelector("el-no-results");
    (r &&
      ("" === n || f(this, j).length > 0
        ? r.setAttribute("hidden", "")
        : r.removeAttribute("hidden")),
      0 === f(this, j).length
        ? t.setAttribute("hidden", "")
        : t.removeAttribute("hidden"),
      (!e || "" !== n) &&
        (0 === f(this, j).length
          ? this.clearActiveItem()
          : f(this, Jt) !== n && this.goToItem(0),
        L(this, Jt, n)));
  }),
  (Xe = function (e, t = !0) {
    let n = this.getInput(),
      o = this.getActiveItem();
    if (e === o) return;
    if (null !== o) {
      o.setAttribute("aria-selected", "false");
      let e = this.querySelector(`el-command-preview[for="${o.id}"]`);
      e && e.setAttribute("hidden", "");
    }
    (e.setAttribute("aria-selected", "true"),
      n.setAttribute("aria-activedescendant", e.id));
    let r = this.querySelector(`el-command-preview[for="${e.id}"]`);
    (r && r.removeAttribute("hidden"),
      t && e.scrollIntoView({ block: "nearest" }),
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: { relatedTarget: e },
          bubbles: !1,
          cancelable: !1,
        }),
      ));
  }));
var Je = class extends x {
    getItems() {
      return Array.from(this.querySelectorAll(`${ut},[role="option"]`));
    }
  },
  Ze = class extends x {
    getItems() {
      return Array.from(this.querySelectorAll(`${ut},[role="option"]`));
    }
  },
  to = class extends x {},
  eo = class extends x {},
  oo = class extends x {
    getItems() {
      return Array.from(this.querySelectorAll(`${ut},[role="option"]`));
    }
  };
(T("el-command-palette", Qe),
  T("el-command-list", Je),
  T("el-defaults", Ze),
  T("el-no-results", to),
  T("el-command-group", oo),
  T("el-command-preview", eo));
var z = [];
le(() => {
  function e(e) {
    if (e.target === document.body || z[0] === e.target) return;
    let t = e.target;
    t &&
      "closest" in t &&
      ((t = t.closest(ut)),
      z.unshift(t ?? e.target),
      (z = z.filter((e) => null != e && e.isConnected)).splice(10));
  }
  (window.addEventListener("click", e, { capture: !0 }),
    window.addEventListener("pointerdown", e, { capture: !0 }),
    window.addEventListener("focus", e, { capture: !0 }),
    document.body.addEventListener("click", e, { capture: !0 }),
    document.body.addEventListener("pointerdown", e, { capture: !0 }),
    document.body.addEventListener("focus", e, { capture: !0 }));
});
var Rt = null;
typeof globalThis.window < "u" &&
  ((Rt = HTMLDialogElement.prototype.close),
  Object.defineProperties(HTMLDialogElement.prototype, {
    close: {
      value() {
        let e = this.closest("el-dialog");
        if (!(e instanceof Bt)) return Rt?.apply(this, arguments);
        let t = e.beforeClose();
        if (!0 === t) return Rt?.apply(this, arguments);
        !1 !== t &&
          t
            .then((e) => (e ? Rt?.apply(this, arguments) : null))
            .catch(console.error);
      },
    },
  }),
  document.addEventListener(
    "command",
    (e) => {
      let t = e.target;
      if (
        !(
          t instanceof HTMLDialogElement &&
          "command" in e &&
          "close" === e.command
        )
      )
        return;
      let n = t.closest("el-dialog");
      if (!(n instanceof Bt)) return;
      let o = n.beforeClose();
      !0 !== o &&
        (e.stopImmediatePropagation(),
        e.preventDefault(),
        !1 !== o &&
          o.then((e) => (e ? Rt?.apply(t) : null)).catch(console.error));
    },
    !0,
  ));
var Y,
  et,
  Nt,
  At,
  te,
  no,
  Bt = class extends x {
    constructor() {
      (super(...arguments),
        I(this, te),
        I(this, Y, null),
        I(this, et, null),
        I(this, Nt, !0),
        I(
          this,
          At,
          Pt(this, () =>
            Array.from(
              this.querySelectorAll("el-dialog-panel,el-dialog-backdrop"),
            ),
          ),
        ));
    }
    mount(e) {
      let t = this.getNativeDialog();
      t.style.setProperty("right", "var(--el-top-layer-scrollbar-offset, 0px)");
      let n = this.hasAttribute("open");
      for (let e of N(this, te, no).call(this))
        e.setAttribute("aria-expanded", n.toString());
      (fr(t, e, (e) => {
        e.preventDefault();
        let n = new Event("cancel", { bubbles: !1, cancelable: !0 });
        !this.dispatchEvent(n) || t.close();
      }),
        lt(this.querySelector("el-dialog-panel") ?? t, e, () => {
          this.hasAttribute("open") && t.close();
        }));
      let o = null;
      (t.addEventListener(
        "beforetoggle",
        (e) => {
          let t = e;
          "open" === t.newState && "closed" === t.oldState && this.beforeOpen();
          let n = this.hasAttribute("open");
          if (
            ("open" !== t.newState || n
              ? "closed" === t.newState &&
                n &&
                (this.dispatchEvent(
                  new CustomEvent("close", { bubbles: !1, cancelable: !1 }),
                ),
                this.removeAttribute("open"))
              : (this.dispatchEvent(
                  new CustomEvent("open", { bubbles: !1, cancelable: !1 }),
                ),
                this.setAttribute("open", "")),
            "open" === t.newState && "closed" === t.oldState)
          )
            z.length > 0 && !o && (o = z[0]);
          else if ("closed" === t.newState && "open" === t.oldState) {
            let e = f(this, Nt);
            setTimeout(() => {
              e
                ? (o && o !== document.activeElement && o.isConnected && kt(o),
                  (o = null))
                : o &&
                  o === document.activeElement &&
                  o.isConnected &&
                  "blur" in o &&
                  "function" == typeof o.blur &&
                  o.blur();
            });
          }
        },
        { signal: e },
      ),
        e.addEventListener("abort", () => {
          var e;
          (f(this, At).abort(), null == (e = f(this, et)) || e.call(this));
        }),
        this.hasAttribute("open") && t.showModal());
    }
    onAttributeChange(e, t, n) {
      switch (e) {
        case "open": {
          let e = this.getNativeDialog();
          for (let e of N(this, te, no).call(this))
            e.setAttribute("aria-expanded", null !== n ? "true" : "false");
          null === n ? e.close() : e.showModal();
          break;
        }
      }
    }
    getNativeDialog() {
      let e = this.querySelector("dialog");
      if (!e) throw new Error("[ElDialog] No `<dialog>` element found");
      return e;
    }
    beforeOpen() {
      (L(this, Nt, !0),
        f(this, Y) && (f(this, Y).abort(), L(this, Y, null)),
        f(this, et) || L(this, et, be(this.ownerDocument)),
        f(this, At) && f(this, At).start("in"));
    }
    beforeClose() {
      if (
        (f(this, et) && (f(this, et).call(this), L(this, et, null)), f(this, Y))
      )
        return !1;
      L(this, Y, new AbortController());
      let e = f(this, Y).signal;
      return new Promise((t) => {
        f(this, At)?.start("out", () => {
          e.aborted ||
            (L(this, Y, null),
            requestAnimationFrame(() => {
              let e = this.getNativeDialog(),
                t = e.style.cssText;
              ((e.style.cssText = t + "transition-duration: 0 !important;"),
                Rt?.apply(e),
                requestAnimationFrame(() => {
                  e.style.cssText = t;
                }));
            }),
            t(!0));
        });
      });
    }
    show() {
      this.getNativeDialog().showModal();
    }
    hide({ restoreFocus: e = !0 } = {}) {
      (L(this, Nt, e), this.getNativeDialog().close());
    }
  };
((Y = new WeakMap()),
  (et = new WeakMap()),
  (Nt = new WeakMap()),
  (At = new WeakMap()),
  (te = new WeakSet()),
  (no = function () {
    return document.querySelectorAll(
      `[commandfor="${this.getNativeDialog().id}"]`,
    );
  }),
  C(Bt, "observedAttributes", ["open"]));
var ro = class extends x {
    mount(e) {
      cr(this, e, () => {
        let e = this.getDialog(),
          t = e.getNativeDialog();
        if (!t.hasAttribute("open")) return;
        let n = new Event("cancel", { bubbles: !1, cancelable: !0 });
        !e.dispatchEvent(n) || t.close();
      });
    }
    getDialog() {
      let e = this.closest("el-dialog");
      if (!e) throw new Error("[ElDialogPanel] No `<el-dialog>` parent found");
      return e;
    }
  },
  io = class extends x {
    mount() {
      this.setAttribute("inert", "");
    }
  };
function cr(e, t, n) {
  document.addEventListener(
    "click",
    (t) => {
      if (t.target === e) {
        let { clientX: o, clientY: r } = t,
          i = e.getBoundingClientRect();
        if (o >= i.left && o <= i.right && r >= i.top && r <= i.bottom) return;
        return void n(t);
      }
      let o = e.closest("dialog");
      o && o.contains(t.target) && !e.contains(t.target)
        ? n(t)
        : t.target !== t.target.ownerDocument.documentElement || n(t);
    },
    { signal: t, capture: !0 },
  );
}
function fr(e, t, n) {
  e.addEventListener(
    "keydown",
    (e) => {
      "Escape" === e.key && (e.defaultPrevented || n(e));
    },
    { signal: t },
  );
}
(T("el-dialog", Bt), T("el-dialog-panel", ro), T("el-dialog-backdrop", io));
var Ft,
  ee,
  so,
  ye = class extends x {
    constructor() {
      (super(...arguments), I(this, ee), I(this, Ft, Pt(this)));
    }
    mount(e) {
      (this.id || (this.id = k("disclosure")),
        this.hasAttribute("hidden")
          ? this.removeAttributeNoCallbacks("open")
          : this.setAttributeNoCallbacks("open", ""));
      let t = () => {
          this.hasAttribute("open") && this.hide();
        },
        n = !this.hasAttribute("hidden");
      for (let o of N(this, ee, so).call(this))
        (lt(o, e, t),
          o.setAttribute("aria-expanded", n.toString()),
          o.setAttribute("aria-controls", this.id));
      (this.addEventListener(
        "command",
        (e) => {
          if (e.target instanceof HTMLElement && "command" in e)
            switch (e.command) {
              case "--show":
                (this.show(), e.preventDefault());
                break;
              case "--hide":
                (this.hide(), e.preventDefault());
                break;
              case "--toggle":
                (this.toggle(), e.preventDefault());
            }
        },
        { signal: e },
      ),
        lt(this, e, t),
        e.addEventListener("abort", () => f(this, Ft).abort()));
    }
    onAttributeChange(e, t, n) {
      switch (e) {
        case "hidden":
          null === n
            ? this.setAttributeNoCallbacks("open", "")
            : this.removeAttributeNoCallbacks("open");
          for (let e of N(this, ee, so).call(this))
            e.setAttribute("aria-expanded", null === n ? "true" : "false");
          null === n ? f(this, Ft).start("in") : f(this, Ft).start("out");
          break;
        case "open":
          null === n ? this.hide() : this.show();
      }
    }
    show() {
      this.removeAttribute("hidden");
    }
    hide() {
      this.setAttribute("hidden", "");
    }
    toggle() {
      this.hasAttribute("hidden") ? this.show() : this.hide();
    }
  };
function Ee(e, t, n, o, r) {
  let i = null;
  for (let n of t)
    n.addEventListener(
      "pointerdown",
      (t) => {
        0 === t.button &&
          e.classList.contains(":popover-open") &&
          (i = Date.now() + 100);
      },
      { signal: o, capture: !0 },
    );
  e.ownerDocument.addEventListener(
    "focusin",
    (o) => {
      if (!n.hasAttribute("open")) return;
      let a = o.target,
        l = o.relatedTarget;
      null !== a &&
        ((i && Date.now() < i) ||
          e.contains(a) ||
          t.some((e) => e.contains(a)) ||
          r(l));
    },
    { signal: o },
  );
}
((Ft = new WeakMap()),
  (ee = new WeakSet()),
  (so = function () {
    return document.querySelectorAll(`[commandfor="${this.id}"]`);
  }),
  C(ye, "observedAttributes", ["hidden", "open"]),
  T("el-disclosure", ye));
var dr = 200;
function Ae(e, t, n) {
  let o = null,
    r = "",
    i = null,
    a = null;
  e.id || (e.id = k(t.role));
  let l = t.getButton();
  function s() {
    let e = t.getItems(),
      o = { passive: !0, signal: n },
      r = "menu" === t.role ? "menuitem" : "option";
    for (let i of e)
      i.getAttribute("role") !== r &&
        (i.id || (i.id = k("item")),
        i.setAttribute("role", r),
        i.setAttribute("tabIndex", "-1"),
        i.addEventListener("click", () => t.onItemClick(i), o),
        at(i, "mouseover", n, () => p(i, !1)),
        at(i, "mouseout", n, () => f()));
  }
  (l.id || (l.id = k(`${t.role}-button`)),
    Ht(
      e,
      () => t.getButton(),
      () => t.getButton(),
      n,
      () => t.onBeforeOpen(),
      () => {
        (t.onBeforeClose(), f(), (r = ""), i && (clearTimeout(i), (i = null)));
      },
    ),
    ve(e, n),
    e.setAttribute("popover", "manual"),
    e.setAttribute("role", t.role),
    l.setAttribute("popovertarget", e.id),
    l.setAttribute("aria-haspopup", t.role),
    s());
  let u = new MutationObserver(s);
  (u.observe(e, { attributes: !1, childList: !0, subtree: !0 }),
    Ee(e, [l], e, n, (t) => {
      (null === t && (a = Date.now() + 100), e.hidePopover());
    }));
  let c = null,
    d = !1;
  (l.addEventListener(
    "pointerdown",
    (t) => {
      if (0 === t.button && !l.matches(":disabled")) {
        if ("touch" === t.pointerType) return void (d = !0);
        (e.togglePopover(), (c = Date.now()));
      }
    },
    { signal: n },
  ),
    document.addEventListener(
      "pointerup",
      (t) => {
        if (
          0 === t.button &&
          !l.matches(":disabled") &&
          e.hasAttribute("open")
        ) {
          if (Date.now() - (c ?? 0) > dr) {
            let n = t.composedPath();
            if (n.includes(e)) {
              if (null !== c) {
                let e = m();
                e && e.click();
              }
              return;
            }
            for (let t of n)
              if (
                t instanceof Element &&
                (t.getAttribute("commandfor") ||
                  t.getAttribute("popovertarget")) === e.id
              )
                return;
            e.hidePopover();
          }
          c = null;
        }
      },
      { signal: n, capture: !0 },
    ),
    l.addEventListener(
      "click",
      (e) => {
        d ? (d = !1) : (e.preventDefault(), e.stopPropagation());
      },
      { signal: n },
    ));
  let h = null;
  function p(t, n = !0) {
    let r = m();
    (null !== r && r.setAttribute("tabIndex", "-1"),
      e.removeAttribute("tabIndex"),
      t.setAttribute("tabIndex", "0"),
      t.focus({ preventScroll: !0 }),
      (o = t),
      n && t.scrollIntoView({ block: "nearest" }));
  }
  function f() {
    let t = m();
    (null !== t && t.setAttribute("tabIndex", "-1"),
      (o = null),
      e.hasAttribute("open") && (e.setAttribute("tabIndex", "0"), e.focus()));
  }
  function m() {
    return o;
  }
  function g(e, n = !1) {
    if ("" === e) return null;
    let o = t.getItems(),
      r = e.toLowerCase(),
      i = m(),
      a = i ? o.indexOf(i) : -1;
    if (
      !n &&
      i &&
      -1 !== a &&
      R(i) &&
      (i.textContent?.trim().toLowerCase() || "").startsWith(r)
    )
      return i;
    for (let e = a + 1; e < o.length; e++)
      if (
        (o[e].textContent?.trim().toLowerCase() || "").startsWith(r) &&
        R(o[e])
      )
        return o[e];
    for (let e = 0; e <= a; e++)
      if (
        (o[e].textContent?.trim().toLowerCase() || "").startsWith(r) &&
        R(o[e])
      )
        return o[e];
    return null;
  }
  return (
    e.addEventListener(
      "beforetoggle",
      (e) => {
        let t = e;
        "open" === t.newState &&
          "closed" === t.oldState &&
          z.length > 0 &&
          !h &&
          (h = z[0]);
      },
      { signal: n },
    ),
    e.addEventListener(
      "toggle",
      (t) => {
        let n = t;
        "closed" === n.newState &&
          "open" === n.oldState &&
          setTimeout(() => {
            (!e.contains(document.activeElement) &&
              document.activeElement !== document.body) ||
              (a && Date.now() < a) ||
              (h && h !== document.activeElement && h.isConnected && kt(h),
              (h = null));
          });
      },
      { signal: n },
    ),
    n.addEventListener("abort", () => {
      (i && (clearTimeout(i), (i = null)), u.disconnect());
    }),
    {
      ignoreNextFocusRestoration: () => (a = Date.now() + 100),
      setActiveItem: p,
      clearActiveItem: f,
      getActiveItem: m,
      findItemBySearchQuery: g,
      handleSearchKey: function (e) {
        let t = "" === r;
        (i && (clearTimeout(i), (i = null)), (r += e.toLowerCase()));
        let n = g(r, t);
        (n && p(n, !0),
          (i = setTimeout(() => {
            ((r = ""), (i = null));
          }, 350)));
      },
      hasActiveSearchQuery: function () {
        return "" !== r;
      },
    }
  );
}
var xt,
  qt,
  P,
  xe = class extends x {
    constructor() {
      (super(...arguments),
        I(this, xt, this.attachInternals()),
        I(this, qt, ""),
        I(this, P, null));
    }
    mount(e) {
      let t = this.getOptions();
      this.value = this.getAttribute("value") ?? this.value ?? "";
      let n = this.getButton();
      (n.id || (n.id = k("select-button")),
        _(n, "--button-width", e, this),
        n.addEventListener(
          "keydown",
          (e) => {
            if (!n.matches(":disabled"))
              switch (e.key) {
                case "ArrowUp":
                case "ArrowDown":
                  (t.showPopover(),
                    this.goToItem("selected"),
                    e.preventDefault());
                  break;
                case "Enter":
                  (e.preventDefault(),
                    f(this, xt).form && f(this, xt).form.requestSubmit());
                  break;
                case " ":
                  if (
                    t.hasAttribute("open") &&
                    f(this, P) &&
                    f(this, P).hasActiveSearchQuery()
                  ) {
                    (e.preventDefault(),
                      e.stopPropagation(),
                      f(this, P).handleSearchKey(e.key));
                    break;
                  }
                  (e.preventDefault(),
                    t.hasAttribute("open")
                      ? t.hidePopover()
                      : (t.showPopover(), this.goToItem("selected")));
                  break;
                default:
                  t.hasAttribute("open") &&
                    1 === e.key.length &&
                    !e.ctrlKey &&
                    !e.altKey &&
                    !e.metaKey &&
                    (e.preventDefault(),
                    e.stopPropagation(),
                    this.handleSearchKey(e.key));
              }
          },
          { signal: e },
        ));
      for (let e of f(this, xt).labels) e.setAttribute("for", n.id);
      (L(
        this,
        P,
        Ae(
          t,
          {
            role: "listbox",
            getItems: () => this.getItems(),
            onItemClick: (e) => this.setSelectedOption(e),
            getButton: () => this.getButton(),
            onBeforeOpen: () => this.onBeforeOpen(),
            onBeforeClose: () => this.onBeforeClose(),
          },
          e,
        ),
      ),
        t.addEventListener(
          "keydown",
          (e) => {
            switch (e.key) {
              case "ArrowDown":
                return (
                  e.preventDefault(),
                  e.stopPropagation(),
                  this.goToItem(3)
                );
              case "ArrowUp":
                return (
                  e.preventDefault(),
                  e.stopPropagation(),
                  this.goToItem(2)
                );
              case "Home":
              case "PageUp":
                return (
                  e.preventDefault(),
                  e.stopPropagation(),
                  this.goToItem(0)
                );
              case "End":
              case "PageDown":
                return (
                  e.preventDefault(),
                  e.stopPropagation(),
                  this.goToItem(1)
                );
              case " ":
                if (f(this, P) && f(this, P).hasActiveSearchQuery())
                  return (
                    e.preventDefault(),
                    e.stopPropagation(),
                    void f(this, P).handleSearchKey(e.key)
                  );
              case "Enter": {
                (e.preventDefault(), e.stopPropagation());
                let n = this.getActiveItem();
                return void (n ? n.click() : t.hidePopover());
              }
              case "Tab":
                f(this, P) && f(this, P).ignoreNextFocusRestoration();
                break;
              case "Escape":
                (e.preventDefault(),
                  e.stopPropagation(),
                  t.hidePopover(),
                  n.focus());
                break;
              default:
                1 === e.key.length &&
                  !e.ctrlKey &&
                  !e.altKey &&
                  !e.metaKey &&
                  (e.preventDefault(),
                  e.stopPropagation(),
                  f(this, P) && f(this, P).handleSearchKey(e.key));
            }
          },
          { signal: e },
        ),
        t.addEventListener(
          "toggle",
          (e) => {
            "open" === e.newState && this.onOpen();
          },
          { signal: e },
        ));
      let o = Array.from(t.querySelectorAll("el-option[disabled]"));
      for (let e of o)
        (e.setAttribute("aria-disabled", "true"),
          e.setAttribute("aria-selected", "false"));
    }
    onAttributeChange(e, t, n) {
      if ("value" === e) null !== n && (this.value = n);
    }
    getButton() {
      let e = this.querySelector("button");
      if (!e) throw new Error("`<el-select>` must contain a button element.");
      return e;
    }
    getOptions() {
      let e = this.querySelector("el-options");
      if (!e)
        throw new Error("`<el-select>` must contain a `<el-options>` element.");
      return e;
    }
    setSelectedOption(e) {
      ((this.value = e.getAttribute("value")),
        this.dispatchEvent(new Event("input", { bubbles: !0, cancelable: !0 })),
        this.dispatchEvent(
          new Event("change", { bubbles: !0, cancelable: !0 }),
        ),
        this.getOptions().hidePopover());
    }
    getOptionByName(e) {
      return this.getOptions().getOptionByName(e);
    }
    getItems() {
      return this.getOptions().getItems();
    }
    getActiveItem() {
      return f(this, P)?.getActiveItem();
    }
    getSelectedOption() {
      return this.getOptionByName(f(this, qt));
    }
    goToItem(e = 4) {
      let t = this.getItems();
      if (0 === t.length) return;
      let n = this.getActiveItem();
      if (null === n && (2 === e || 3 === e))
        return void this.goToItem("selected");
      if ("selected" === e) {
        let e = this.getSelectedOption();
        return void (e && R(e) ? this.setActiveItem(e) : this.goToItem(0));
      }
      let o = G(t, n, e);
      o && this.setActiveItem(o);
    }
    setActiveItem(e) {
      f(this, P) && f(this, P).setActiveItem(e);
    }
    clearActiveItem() {
      f(this, P) && f(this, P).clearActiveItem();
    }
    onBeforeOpen() {
      let e = this.getButton(),
        t = e.dataset.originalTabIndex;
      (t && (e.dataset.originalTabIndex = t), e.setAttribute("tabIndex", "-1"));
    }
    onOpen() {
      null === this.getActiveItem() && this.goToItem("selected");
    }
    onBeforeClose() {
      let e = this.getButton(),
        t = e.dataset.originalTabIndex;
      (delete e.dataset.originalTabIndex,
        void 0 !== t
          ? e.setAttribute("tabIndex", t)
          : e.removeAttribute("tabIndex"));
      let n = this.getActiveItem();
      null !== n && n.setAttribute("tabIndex", "-1");
    }
    handleSearchKey(e) {
      f(this, P) && f(this, P).handleSearchKey(e);
    }
    set value(e) {
      (L(this, qt, e), f(this, xt).setFormValue(e));
      let t = this.getSelectedOption();
      if (t) {
        for (let e of this.getItems()) e.setAttribute("aria-selected", "false");
        t.setAttribute("aria-selected", "true");
        try {
          this.querySelectorAll("el-selectedcontent").forEach((e) =>
            e.update(),
          );
        } catch {}
      }
    }
    get value() {
      return f(this, qt);
    }
  };
((xt = new WeakMap()),
  (qt = new WeakMap()),
  (P = new WeakMap()),
  C(xe, "formAssociated", !0));
var lo = class extends x {
  mount() {
    this.update();
  }
  update() {
    let e = this.getSelect().getSelectedOption();
    if (!e) return;
    let t = document.createDocumentFragment();
    for (let n of e.childNodes) t.append(n.cloneNode(!0));
    this.replaceChildren(t);
  }
  getSelect() {
    let e = this.closest("el-select");
    if (!e)
      throw new Error(
        "`<el-selectedcontent>` must be inside of a `<el-select>` element.",
      );
    return e;
  }
};
(T("el-select", xe), T("el-selectedcontent", lo));
var O,
  ao = class extends x {
    getButton() {
      let e = this.querySelector("button");
      if (!e) throw new Error("[ElDropdown] No `<button>` element found");
      return e;
    }
    mount(e) {
      let t = this.getButton();
      (t.id || (t.id = k("dropdown-button")), _(t, "--button-width", e, this));
      let n = this.querySelectorAll("label");
      for (let e of n) e.setAttribute("for", t.id);
    }
  },
  Te = class extends x {
    constructor() {
      (super(...arguments), I(this, O, null));
    }
    mount(e) {
      L(
        this,
        O,
        Ae(
          this,
          {
            role: "menu",
            getItems: () => this.getItems(),
            onItemClick: () => this.hidePopover(),
            getButton: () => this.getDropdown().getButton(),
            onBeforeOpen: () => this.onBeforeOpen(),
            onBeforeClose: () => this.onBeforeClose(),
          },
          e,
        ),
      );
      let t = this.getDropdown().getButton();
      (t.addEventListener(
        "keydown",
        (e) => {
          if (!t.disabled)
            switch (e.key) {
              case "ArrowDown":
                (this.showPopover(), this.goToItem(0), e.preventDefault());
                break;
              case "ArrowUp":
                (this.showPopover(), this.goToItem(1), e.preventDefault());
                break;
              case " ":
                if (
                  this.hasAttribute("open") &&
                  f(this, O) &&
                  f(this, O).hasActiveSearchQuery()
                ) {
                  (e.preventDefault(),
                    e.stopPropagation(),
                    f(this, O).handleSearchKey(e.key));
                  break;
                }
              case "Enter":
                (e.preventDefault(),
                  this.hasAttribute("open")
                    ? this.hidePopover()
                    : (this.showPopover(), this.goToItem(0)));
                break;
              default:
                this.hasAttribute("open") &&
                  1 === e.key.length &&
                  !e.ctrlKey &&
                  !e.altKey &&
                  !e.metaKey &&
                  (e.preventDefault(),
                  e.stopPropagation(),
                  f(this, O) && f(this, O).handleSearchKey(e.key));
            }
        },
        { signal: e },
      ),
        this.addEventListener(
          "keydown",
          (e) => {
            switch (e.key) {
              case "ArrowDown":
                return (
                  e.preventDefault(),
                  e.stopPropagation(),
                  this.goToItem(3)
                );
              case "ArrowUp":
                return (
                  e.preventDefault(),
                  e.stopPropagation(),
                  this.goToItem(2)
                );
              case "Home":
              case "PageUp":
                return (
                  e.preventDefault(),
                  e.stopPropagation(),
                  this.goToItem(0)
                );
              case "End":
              case "PageDown":
                return (
                  e.preventDefault(),
                  e.stopPropagation(),
                  this.goToItem(1)
                );
              case " ":
                if (f(this, O) && f(this, O).hasActiveSearchQuery())
                  return (
                    e.preventDefault(),
                    e.stopPropagation(),
                    void f(this, O).handleSearchKey(e.key)
                  );
              case "Enter": {
                (e.preventDefault(), e.stopPropagation());
                let t = this.getActiveItem();
                return void (t ? t.click() : this.hidePopover());
              }
              case "Tab":
                f(this, O) && f(this, O).ignoreNextFocusRestoration();
                break;
              case "Escape":
                (e.preventDefault(),
                  e.stopPropagation(),
                  this.hidePopover(),
                  t.focus());
                break;
              default:
                1 === e.key.length &&
                  !e.ctrlKey &&
                  !e.altKey &&
                  !e.metaKey &&
                  (e.preventDefault(),
                  e.stopPropagation(),
                  f(this, O) && f(this, O).handleSearchKey(e.key));
            }
          },
          { signal: e },
        ));
    }
    onBeforeOpen() {
      let e = this.getDropdown().getButton(),
        t = e.dataset.originalTabIndex;
      (t && (e.dataset.originalTabIndex = t),
        e.setAttribute("tabIndex", "-1"),
        null === this.getActiveItem() &&
          (this.setAttribute("tabIndex", "0"),
          setTimeout(() => this.focus({ preventScroll: !0 }))));
    }
    onBeforeClose() {
      let e = this.getDropdown().getButton(),
        t = e.dataset.originalTabIndex;
      (delete e.dataset.originalTabIndex,
        void 0 !== t
          ? e.setAttribute("tabIndex", t)
          : e.removeAttribute("tabIndex"));
      let n = this.getActiveItem();
      null !== n && n.setAttribute("tabIndex", "-1");
    }
    goToItem(e = 4) {
      let t = this.getItems();
      if (0 === t.length) return;
      let n = G(t, this.getActiveItem(), e);
      n && this.setActiveItem(n);
    }
    setActiveItem(e) {
      f(this, O) && f(this, O).setActiveItem(e);
    }
    clearActiveItem() {
      f(this, O) && f(this, O).clearActiveItem();
    }
    getDropdown() {
      let e = this.closest("el-dropdown");
      if (!e) throw new Error("[ElMenu] No `<el-dropdown>` element found");
      return e;
    }
    getItems() {
      return Array.from(this.querySelectorAll(`${ut},[role="menuitem"]`));
    }
    getActiveItem() {
      return f(this, O)?.getActiveItem() || null;
    }
    onAttributeChange(e, t, n) {
      if ("open" === e) null === n ? this.hidePopover() : this.showPopover();
    }
  };
((O = new WeakMap()),
  C(Te, "observedAttributes", ["anchor", "open"]),
  T("el-menu", Te),
  T("el-dropdown", ao));
var Se = class extends x {
  onAttributeChange(e, t, n) {
    if ("open" === e) null === n ? this.hidePopover() : this.showPopover();
  }
  getOptionByName(e) {
    return this.querySelector(`el-option[value="${e}"]`) || null;
  }
  getItems() {
    return Array.from(this.querySelectorAll("el-option:not([disabled])"));
  }
};
C(Se, "observedAttributes", ["anchor", "open"]);
var uo = class extends x {};
(T("el-options", Se), T("el-option", uo));
var co = class extends x {
    getPopovers() {
      return Array.from(this.querySelectorAll("* > el-popover"));
    }
  },
  Le = class extends x {
    mount(e) {
      if (!this.id)
        throw new Error(
          "[ElPopover] No id found for popover (ensure `id` is set)",
        );
      let t = this.getButton();
      (t.id || (t.id = k("popover-button")),
        Ht(
          this,
          () => this.getButton(),
          () => this.getButton(),
          e,
        ),
        _(t, "--button-width", e, this),
        this.setAttribute("tabindex", "-1"),
        t.addEventListener(
          "keydown",
          (e) => {
            ("Enter" === e.key || " " === e.key) &&
              (e.preventDefault(), this.togglePopover());
          },
          { signal: e },
        ));
      let n = this,
        o = this.closest("el-popover-group");
      (o && o.getPopovers().includes(this) && (n = o),
        Ee(n, [t], this, e, () => this.hidePopover()),
        this.addEventListener(
          "toggle",
          (e) => {
            let n = e;
            "closed" === n.newState &&
              "open" === n.oldState &&
              setTimeout(() => {
                (!this.contains(document.activeElement) &&
                  document.activeElement !== document.body) ||
                  (t && t !== document.activeElement && t.isConnected && kt(t));
              });
          },
          { signal: e },
        ));
    }
    getButton() {
      let e = this.id,
        t = document.querySelector(`[popovertarget="${e}"]`);
      if (!t)
        throw new Error(
          '[ElPopover] No button found for popover (ensure you add a `<button popovertarget="${id}">` on the page)',
        );
      return t;
    }
    onAttributeChange(e, t, n) {
      if ("open" === e) null === n ? this.hidePopover() : this.showPopover();
    }
  };
(C(Le, "observedAttributes", ["anchor", "open"]),
  T("el-popover", Le),
  T("el-popover-group", co));
var fo = class extends x {
    mount(e) {
      let t = this.getList(),
        n = this.getPanels(),
        o = t.getTabButtons(),
        r = n.getPanels();
      if (o.length !== r.length)
        return void console.warn(
          "[ElTabGroup] Mismatch between number of tabs and panels",
        );
      for (let e = 0; e < r.length; e++) {
        let t = r[e],
          n = o[e];
        (n.id || (n.id = k("tailwindplus-tab")),
          t.id || (t.id = k("tailwindplus-tab-panel")),
          t.setAttribute("aria-labelledby", n.id),
          n.setAttribute("aria-controls", t.id),
          n.setAttribute("role", "tab"));
      }
      let i = this.getActiveTab();
      (-1 === i && (i = 0),
        t.setActiveTab(i),
        n.setActivePanel(i),
        t.addEventListener(
          "keydown",
          (e) => {
            switch (e.key) {
              case "ArrowLeft": {
                e.preventDefault();
                let t = this.getActiveTab() - 1;
                (t < 0 && (t = o.length - 1),
                  this.setActiveTab(t),
                  o[t].focus());
                break;
              }
              case "ArrowRight": {
                e.preventDefault();
                let t = this.getActiveTab() + 1;
                (t >= o.length && (t = 0), this.setActiveTab(t), o[t].focus());
                break;
              }
              case "Home":
              case "PageUp":
                (e.preventDefault(), this.setActiveTab(0), o[0].focus());
                break;
              case "End":
              case "PageDown":
                (e.preventDefault(),
                  this.setActiveTab(o.length - 1),
                  o[o.length - 1].focus());
            }
          },
          { signal: e },
        ));
      for (let t = 0; t < o.length; t++)
        o[t].addEventListener(
          "click",
          (e) => {
            (e.preventDefault(), this.setActiveTab(t));
          },
          { signal: e },
        );
    }
    getActiveTab() {
      let e = this.querySelector("el-tab-panels"),
        t = e.getPanels().find((e) => !e.hasAttribute("hidden"));
      return t ? e.getPanels().indexOf(t) : -1;
    }
    getList() {
      let e = this.querySelector("el-tab-list");
      if (!e) throw new Error("[ElTabGroup] No `<el-tab-list>` element found");
      return e;
    }
    getPanels() {
      let e = this.querySelector("el-tab-panels");
      if (!e)
        throw new Error("[ElTabGroup] No `<el-tab-panels>` element found");
      return e;
    }
    setActiveTab(e) {
      if (this.getActiveTab() === e) return;
      let t = this.getList(),
        n = this.getPanels(),
        o = t.getTabButtons();
      e < 0 || e >= o.length || (t.setActiveTab(e), n.setActivePanel(e));
    }
  },
  po = class extends x {
    mount() {
      (this.setAttribute("role", "tablist"),
        this.setAttribute("aria-orientation", "horizontal"));
    }
    getTabButtons() {
      let e = this.querySelectorAll("button");
      return Array.from(e);
    }
    setActiveTab(e) {
      this.getTabButtons().forEach((t, n) => {
        let o = n === e;
        (t.setAttribute("tabindex", o ? "0" : "-1"),
          t.setAttribute("aria-selected", o ? "true" : "false"));
      });
    }
  },
  mo = class extends x {
    mount() {
      let e = this.getTabGroup().getList(),
        t = this.getPanels(),
        n = new MutationObserver((n) => {
          for (let o of n) {
            let n = o.target;
            if ("hidden" === o.attributeName)
              if (!n.hasAttribute(o.attributeName)) {
                let o = t.indexOf(n);
                (e.setActiveTab(o), this.setActivePanel(o));
              }
          }
        });
      for (let e of t)
        (e.setAttribute("role", "tabpanel"),
          e.setAttribute("tabindex", "0"),
          n.observe(e, { attributeFilter: ["hidden"], attributes: !0 }));
    }
    getTabGroup() {
      let e = this.closest("el-tab-group");
      if (!e)
        throw new Error(
          "`<el-tab-panels>` must be inside of a `<el-tab-group>` element.",
        );
      return e;
    }
    getPanels() {
      return Array.from(this.children);
    }
    setActivePanel(e) {
      this.getPanels().forEach((t, n) => {
        t.toggleAttribute("hidden", n !== e);
      });
    }
  };
(T("el-tab-list", po),
  T("el-tab-panels", mo),
  T("el-tab-group", fo),
  typeof globalThis.window < "u" &&
    setTimeout(() => window.dispatchEvent(new Event("elements:ready"))));
//# sourceMappingURL=/sm/a7b3ad0e753499cbb77143fcfe936cf33961506ebe01db2c6c780b051e806c54.map
