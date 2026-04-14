(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  12447,
  (t, e, i) => {
    e.exports = function (t) {
      var e = typeof t;
      return null != t && ("object" == e || "function" == e);
    };
  },
  236,
  (t, e, i) => {
    e.exports = t.g && t.g.Object === Object && t.g;
  },
  39088,
  (t, e, i) => {
    var n = t.r(236),
      s = "object" == typeof self && self && self.Object === Object && self;
    e.exports = n || s || Function("return this")();
  },
  31926,
  (t, e, i) => {
    var n = t.r(39088);
    e.exports = function () {
      return n.Date.now();
    };
  },
  48891,
  (t, e, i) => {
    var n = /\s/;
    e.exports = function (t) {
      for (var e = t.length; e-- && n.test(t.charAt(e)); );
      return e;
    };
  },
  30364,
  (t, e, i) => {
    var n = t.r(48891),
      s = /^\s+/;
    e.exports = function (t) {
      return t ? t.slice(0, n(t) + 1).replace(s, "") : t;
    };
  },
  30353,
  (t, e, i) => {
    e.exports = t.r(39088).Symbol;
  },
  43436,
  (t, e, i) => {
    var n = t.r(30353),
      s = Object.prototype,
      r = s.hasOwnProperty,
      o = s.toString,
      a = n ? n.toStringTag : void 0;
    e.exports = function (t) {
      var e = r.call(t, a),
        i = t[a];
      try {
        t[a] = void 0;
        var n = !0;
      } catch (t) {}
      var s = o.call(t);
      return n && (e ? (t[a] = i) : delete t[a]), s;
    };
  },
  23243,
  (t, e, i) => {
    var n = Object.prototype.toString;
    e.exports = function (t) {
      return n.call(t);
    };
  },
  77684,
  (t, e, i) => {
    var n = t.r(30353),
      s = t.r(43436),
      r = t.r(23243),
      o = n ? n.toStringTag : void 0;
    e.exports = function (t) {
      return null == t
        ? void 0 === t
          ? "[object Undefined]"
          : "[object Null]"
        : o && o in Object(t)
        ? s(t)
        : r(t);
    };
  },
  77289,
  (t, e, i) => {
    e.exports = function (t) {
      return null != t && "object" == typeof t;
    };
  },
  61884,
  (t, e, i) => {
    var n = t.r(77684),
      s = t.r(77289);
    e.exports = function (t) {
      return "symbol" == typeof t || (s(t) && "[object Symbol]" == n(t));
    };
  },
  73759,
  (t, e, i) => {
    var n = t.r(30364),
      s = t.r(12447),
      r = t.r(61884),
      o = 0 / 0,
      a = /^[-+]0x[0-9a-f]+$/i,
      l = /^0b[01]+$/i,
      h = /^0o[0-7]+$/i,
      u = parseInt;
    e.exports = function (t) {
      if ("number" == typeof t) return t;
      if (r(t)) return o;
      if (s(t)) {
        var e = "function" == typeof t.valueOf ? t.valueOf() : t;
        t = s(e) ? e + "" : e;
      }
      if ("string" != typeof t) return 0 === t ? t : +t;
      t = n(t);
      var i = l.test(t);
      return i || h.test(t) ? u(t.slice(2), i ? 2 : 8) : a.test(t) ? o : +t;
    };
  },
  74009,
  (t, e, i) => {
    var n = t.r(12447),
      s = t.r(31926),
      r = t.r(73759),
      o = Math.max,
      a = Math.min;
    e.exports = function (t, e, i) {
      var l,
        h,
        u,
        c,
        d,
        p,
        m = 0,
        f = !1,
        g = !1,
        v = !0;
      if ("function" != typeof t) throw TypeError("Expected a function");
      function y(e) {
        var i = l,
          n = h;
        return (l = h = void 0), (m = e), (c = t.apply(n, i));
      }
      function x(t) {
        var i = t - p,
          n = t - m;
        return void 0 === p || i >= e || i < 0 || (g && n >= u);
      }
      function w() {
        var t,
          i,
          n,
          r = s();
        if (x(r)) return b(r);
        d = setTimeout(
          w,
          ((t = r - p), (i = r - m), (n = e - t), g ? a(n, u - i) : n)
        );
      }
      function b(t) {
        return ((d = void 0), v && l) ? y(t) : ((l = h = void 0), c);
      }
      function S() {
        var t,
          i = s(),
          n = x(i);
        if (((l = arguments), (h = this), (p = i), n)) {
          if (void 0 === d)
            return (m = t = p), (d = setTimeout(w, e)), f ? y(t) : c;
          if (g) return clearTimeout(d), (d = setTimeout(w, e)), y(p);
        }
        return void 0 === d && (d = setTimeout(w, e)), c;
      }
      return (
        (e = r(e) || 0),
        n(i) &&
          ((f = !!i.leading),
          (u = (g = "maxWait" in i) ? o(r(i.maxWait) || 0, e) : u),
          (v = "trailing" in i ? !!i.trailing : v)),
        (S.cancel = function () {
          void 0 !== d && clearTimeout(d), (m = 0), (l = p = h = d = void 0);
        }),
        (S.flush = function () {
          return void 0 === d ? c : b(s());
        }),
        S
      );
    };
  },
  46932,
  88653,
  (t) => {
    "use strict";
    let e,
      i,
      n,
      s,
      r = [
        "transformPerspective",
        "x",
        "y",
        "z",
        "translateX",
        "translateY",
        "translateZ",
        "scale",
        "scaleX",
        "scaleY",
        "rotate",
        "rotateX",
        "rotateY",
        "rotateZ",
        "skew",
        "skewX",
        "skewY",
      ],
      o = new Set(r),
      a = (t, e, i) => (i > e ? e : i < t ? t : i),
      l = {
        test: (t) => "number" == typeof t,
        parse: parseFloat,
        transform: (t) => t,
      },
      h = { ...l, transform: (t) => a(0, 1, t) },
      u = { ...l, default: 1 },
      c = (t) => Math.round(1e5 * t) / 1e5,
      d = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu,
      p =
        /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
      m = (t, e) => (i) =>
        !!(
          ("string" == typeof i && p.test(i) && i.startsWith(t)) ||
          (e && null != i && Object.prototype.hasOwnProperty.call(i, e))
        ),
      f = (t, e, i) => (n) => {
        if ("string" != typeof n) return n;
        let [s, r, o, a] = n.match(d);
        return {
          [t]: parseFloat(s),
          [e]: parseFloat(r),
          [i]: parseFloat(o),
          alpha: void 0 !== a ? parseFloat(a) : 1,
        };
      },
      g = { ...l, transform: (t) => Math.round(a(0, 255, t)) },
      v = {
        test: m("rgb", "red"),
        parse: f("red", "green", "blue"),
        transform: ({ red: t, green: e, blue: i, alpha: n = 1 }) =>
          "rgba(" +
          g.transform(t) +
          ", " +
          g.transform(e) +
          ", " +
          g.transform(i) +
          ", " +
          c(h.transform(n)) +
          ")",
      },
      y = {
        test: m("#"),
        parse: function (t) {
          let e = "",
            i = "",
            n = "",
            s = "";
          return (
            t.length > 5
              ? ((e = t.substring(1, 3)),
                (i = t.substring(3, 5)),
                (n = t.substring(5, 7)),
                (s = t.substring(7, 9)))
              : ((e = t.substring(1, 2)),
                (i = t.substring(2, 3)),
                (n = t.substring(3, 4)),
                (s = t.substring(4, 5)),
                (e += e),
                (i += i),
                (n += n),
                (s += s)),
            {
              red: parseInt(e, 16),
              green: parseInt(i, 16),
              blue: parseInt(n, 16),
              alpha: s ? parseInt(s, 16) / 255 : 1,
            }
          );
        },
        transform: v.transform,
      },
      x = (t) => ({
        test: (e) =>
          "string" == typeof e && e.endsWith(t) && 1 === e.split(" ").length,
        parse: parseFloat,
        transform: (e) => `${e}${t}`,
      }),
      w = x("deg"),
      b = x("%"),
      S = x("px"),
      j = x("vh"),
      T = x("vw"),
      k = {
        ...b,
        parse: (t) => b.parse(t) / 100,
        transform: (t) => b.transform(100 * t),
      },
      E = {
        test: m("hsl", "hue"),
        parse: f("hue", "saturation", "lightness"),
        transform: ({ hue: t, saturation: e, lightness: i, alpha: n = 1 }) =>
          "hsla(" +
          Math.round(t) +
          ", " +
          b.transform(c(e)) +
          ", " +
          b.transform(c(i)) +
          ", " +
          c(h.transform(n)) +
          ")",
      },
      P = {
        test: (t) => v.test(t) || y.test(t) || E.test(t),
        parse: (t) =>
          v.test(t) ? v.parse(t) : E.test(t) ? E.parse(t) : y.parse(t),
        transform: (t) =>
          "string" == typeof t
            ? t
            : t.hasOwnProperty("red")
            ? v.transform(t)
            : E.transform(t),
        getAnimatableNone: (t) => {
          let e = P.parse(t);
          return (e.alpha = 0), P.transform(e);
        },
      },
      C =
        /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu,
      M = "number",
      A = "color",
      L =
        /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
    function N(t) {
      let e = t.toString(),
        i = [],
        n = { color: [], number: [], var: [] },
        s = [],
        r = 0,
        o = e
          .replace(
            L,
            (t) => (
              P.test(t)
                ? (n.color.push(r), s.push(A), i.push(P.parse(t)))
                : t.startsWith("var(")
                ? (n.var.push(r), s.push("var"), i.push(t))
                : (n.number.push(r), s.push(M), i.push(parseFloat(t))),
              ++r,
              "${}"
            )
          )
          .split("${}");
      return { values: i, split: o, indexes: n, types: s };
    }
    function V({ split: t, types: e }) {
      let i = t.length;
      return (n) => {
        let s = "";
        for (let r = 0; r < i; r++)
          if (((s += t[r]), void 0 !== n[r])) {
            let t = e[r];
            t === M
              ? (s += c(n[r]))
              : t === A
              ? (s += P.transform(n[r]))
              : (s += n[r]);
          }
        return s;
      };
    }
    let R = {
        test: function (t) {
          return (
            isNaN(t) &&
            "string" == typeof t &&
            (t.match(d)?.length || 0) + (t.match(C)?.length || 0) > 0
          );
        },
        parse: function (t) {
          return N(t).values;
        },
        createTransformer: function (t) {
          return V(N(t));
        },
        getAnimatableNone: function (t) {
          let e = N(t);
          return V(e)(
            e.values.map((t, i) =>
              ((t, e) =>
                "number" == typeof t
                  ? e?.trim().endsWith("/")
                    ? t
                    : 0
                  : "number" == typeof t
                  ? 0
                  : P.test(t)
                  ? P.getAnimatableNone(t)
                  : t)(t, e.split[i])
            )
          );
        },
      },
      D = new Set(["brightness", "contrast", "saturate", "opacity"]);
    function F(t) {
      let [e, i] = t.slice(0, -1).split("(");
      if ("drop-shadow" === e) return t;
      let [n] = i.match(d) || [];
      if (!n) return t;
      let s = i.replace(n, ""),
        r = +!!D.has(e);
      return n !== i && (r *= 100), e + "(" + r + s + ")";
    }
    let I = /\b([a-z-]*)\(.*?\)/gu,
      B = {
        ...R,
        getAnimatableNone: (t) => {
          let e = t.match(I);
          return e ? e.map(F).join(" ") : t;
        },
      },
      O = {
        ...R,
        getAnimatableNone: (t) => {
          let e = R.parse(t);
          return R.createTransformer(t)(
            e.map((t) =>
              "number" == typeof t
                ? 0
                : "object" == typeof t
                ? { ...t, alpha: 1 }
                : t
            )
          );
        },
      },
      U = { ...l, transform: Math.round },
      z = {
        borderWidth: S,
        borderTopWidth: S,
        borderRightWidth: S,
        borderBottomWidth: S,
        borderLeftWidth: S,
        borderRadius: S,
        borderTopLeftRadius: S,
        borderTopRightRadius: S,
        borderBottomRightRadius: S,
        borderBottomLeftRadius: S,
        width: S,
        maxWidth: S,
        height: S,
        maxHeight: S,
        top: S,
        right: S,
        bottom: S,
        left: S,
        inset: S,
        insetBlock: S,
        insetBlockStart: S,
        insetBlockEnd: S,
        insetInline: S,
        insetInlineStart: S,
        insetInlineEnd: S,
        padding: S,
        paddingTop: S,
        paddingRight: S,
        paddingBottom: S,
        paddingLeft: S,
        paddingBlock: S,
        paddingBlockStart: S,
        paddingBlockEnd: S,
        paddingInline: S,
        paddingInlineStart: S,
        paddingInlineEnd: S,
        margin: S,
        marginTop: S,
        marginRight: S,
        marginBottom: S,
        marginLeft: S,
        marginBlock: S,
        marginBlockStart: S,
        marginBlockEnd: S,
        marginInline: S,
        marginInlineStart: S,
        marginInlineEnd: S,
        fontSize: S,
        backgroundPositionX: S,
        backgroundPositionY: S,
        rotate: w,
        rotateX: w,
        rotateY: w,
        rotateZ: w,
        scale: u,
        scaleX: u,
        scaleY: u,
        scaleZ: u,
        skew: w,
        skewX: w,
        skewY: w,
        distance: S,
        translateX: S,
        translateY: S,
        translateZ: S,
        x: S,
        y: S,
        z: S,
        perspective: S,
        transformPerspective: S,
        opacity: h,
        originX: k,
        originY: k,
        originZ: S,
        zIndex: U,
        fillOpacity: h,
        strokeOpacity: h,
        numOctaves: U,
      },
      $ = {
        ...z,
        color: P,
        backgroundColor: P,
        outlineColor: P,
        fill: P,
        stroke: P,
        borderColor: P,
        borderTopColor: P,
        borderRightColor: P,
        borderBottomColor: P,
        borderLeftColor: P,
        filter: B,
        WebkitFilter: B,
        mask: O,
        WebkitMask: O,
      },
      W = (t) => $[t],
      _ = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
      H = () => ({ x: _(), y: _() }),
      q = () => ({ min: 0, max: 0 }),
      Y = () => ({ x: q(), y: q() }),
      X = (t) => !!(t && t.getVelocity),
      K = new Set(["width", "height", "top", "left", "right", "bottom", ...r]),
      G = (t) => (e) => e.test(t),
      Z = [l, S, b, w, T, j, { test: (t) => "auto" === t, parse: (t) => t }],
      J = (t) => Z.find(G(t));
    var Q,
      tt = t.i(47167);
    let te = () => {},
      ti = () => {};
    tt.default;
    let tn = (t) => (e) => "string" == typeof e && e.startsWith(t),
      ts = tn("--"),
      tr = tn("var(--"),
      to = (t) => !!tr(t) && ta.test(t.split("/*")[0].trim()),
      ta =
        /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
    function tl(t) {
      return "string" == typeof t && t.split("/*")[0].includes("var(--");
    }
    let th = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u,
      tu = (t) => (180 * t) / Math.PI,
      tc = (t) => tp(tu(Math.atan2(t[1], t[0]))),
      td = {
        x: 4,
        y: 5,
        translateX: 4,
        translateY: 5,
        scaleX: 0,
        scaleY: 3,
        scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
        rotate: tc,
        rotateZ: tc,
        skewX: (t) => tu(Math.atan(t[1])),
        skewY: (t) => tu(Math.atan(t[2])),
        skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2,
      },
      tp = (t) => ((t %= 360) < 0 && (t += 360), t),
      tm = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]),
      tf = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]),
      tg = {
        x: 12,
        y: 13,
        z: 14,
        translateX: 12,
        translateY: 13,
        translateZ: 14,
        scaleX: tm,
        scaleY: tf,
        scale: (t) => (tm(t) + tf(t)) / 2,
        rotateX: (t) => tp(tu(Math.atan2(t[6], t[5]))),
        rotateY: (t) => tp(tu(Math.atan2(-t[2], t[0]))),
        rotateZ: tc,
        rotate: tc,
        skewX: (t) => tu(Math.atan(t[4])),
        skewY: (t) => tu(Math.atan(t[1])),
        skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2,
      };
    function tv(t) {
      return +!!t.includes("scale");
    }
    function ty(t, e) {
      let i, n;
      if (!t || "none" === t) return tv(e);
      let s = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
      if (s) (i = tg), (n = s);
      else {
        let e = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
        (i = td), (n = e);
      }
      if (!n) return tv(e);
      let r = i[e],
        o = n[1].split(",").map(tx);
      return "function" == typeof r ? r(o) : o[r];
    }
    function tx(t) {
      return parseFloat(t.trim());
    }
    let tw = (t) => t === l || t === S,
      tb = new Set(["x", "y", "z"]),
      tS = r.filter((t) => !tb.has(t)),
      tj = {
        width: ({ x: t }, { paddingLeft: e = "0", paddingRight: i = "0" }) =>
          t.max - t.min - parseFloat(e) - parseFloat(i),
        height: ({ y: t }, { paddingTop: e = "0", paddingBottom: i = "0" }) =>
          t.max - t.min - parseFloat(e) - parseFloat(i),
        top: (t, { top: e }) => parseFloat(e),
        left: (t, { left: e }) => parseFloat(e),
        bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
        right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
        x: (t, { transform: e }) => ty(e, "x"),
        y: (t, { transform: e }) => ty(e, "y"),
      };
    (tj.translateX = tj.x), (tj.translateY = tj.y);
    let tT = (t) => t,
      tk = {},
      tE = [
        "setup",
        "read",
        "resolveKeyframes",
        "preUpdate",
        "update",
        "preRender",
        "render",
        "postRender",
      ];
    function tP(t, e) {
      let i = !1,
        n = !0,
        s = { delta: 0, timestamp: 0, isProcessing: !1 },
        r = () => (i = !0),
        o = tE.reduce(
          (t, i) => (
            (t[i] = (function (t, e) {
              let i = new Set(),
                n = new Set(),
                s = !1,
                r = !1,
                o = new WeakSet(),
                a = { delta: 0, timestamp: 0, isProcessing: !1 },
                l = 0;
              function h(e) {
                o.has(e) && (u.schedule(e), t()), l++, e(a);
              }
              let u = {
                schedule: (t, e = !1, r = !1) => {
                  let a = r && s ? i : n;
                  return e && o.add(t), a.has(t) || a.add(t), t;
                },
                cancel: (t) => {
                  n.delete(t), o.delete(t);
                },
                process: (t) => {
                  if (((a = t), s)) {
                    r = !0;
                    return;
                  }
                  (s = !0),
                    ([i, n] = [n, i]),
                    i.forEach(h),
                    e,
                    (l = 0),
                    i.clear(),
                    (s = !1),
                    r && ((r = !1), u.process(t));
                },
              };
              return u;
            })(r, e ? i : void 0)),
            t
          ),
          {}
        ),
        {
          setup: a,
          read: l,
          resolveKeyframes: h,
          preUpdate: u,
          update: c,
          preRender: d,
          render: p,
          postRender: m,
        } = o,
        f = () => {
          let r = tk.useManualTiming ? s.timestamp : performance.now();
          (i = !1),
            tk.useManualTiming ||
              (s.delta = n
                ? 1e3 / 60
                : Math.max(Math.min(r - s.timestamp, 40), 1)),
            (s.timestamp = r),
            (s.isProcessing = !0),
            a.process(s),
            l.process(s),
            h.process(s),
            u.process(s),
            c.process(s),
            d.process(s),
            p.process(s),
            m.process(s),
            (s.isProcessing = !1),
            i && e && ((n = !1), t(f));
        };
      return {
        schedule: tE.reduce((e, r) => {
          let a = o[r];
          return (
            (e[r] = (e, r = !1, o = !1) => (
              !i && ((i = !0), (n = !0), s.isProcessing || t(f)),
              a.schedule(e, r, o)
            )),
            e
          );
        }, {}),
        cancel: (t) => {
          for (let e = 0; e < tE.length; e++) o[tE[e]].cancel(t);
        },
        state: s,
        steps: o,
      };
    }
    let {
        schedule: tC,
        cancel: tM,
        state: tA,
        steps: tL,
      } = tP(
        "undefined" != typeof requestAnimationFrame
          ? requestAnimationFrame
          : tT,
        !0
      ),
      tN = new Set(),
      tV = !1,
      tR = !1,
      tD = !1;
    function tF() {
      if (tR) {
        let t = Array.from(tN).filter((t) => t.needsMeasurement),
          e = new Set(t.map((t) => t.element)),
          i = new Map();
        e.forEach((t) => {
          let e,
            n =
              ((e = []),
              tS.forEach((i) => {
                let n = t.getValue(i);
                void 0 !== n &&
                  (e.push([i, n.get()]), n.set(+!!i.startsWith("scale")));
              }),
              e);
          n.length && (i.set(t, n), t.render());
        }),
          t.forEach((t) => t.measureInitialState()),
          e.forEach((t) => {
            t.render();
            let e = i.get(t);
            e &&
              e.forEach(([e, i]) => {
                t.getValue(e)?.set(i);
              });
          }),
          t.forEach((t) => t.measureEndState()),
          t.forEach((t) => {
            void 0 !== t.suspendedScrollY &&
              window.scrollTo(0, t.suspendedScrollY);
          });
      }
      (tR = !1), (tV = !1), tN.forEach((t) => t.complete(tD)), tN.clear();
    }
    function tI() {
      tN.forEach((t) => {
        t.readKeyframes(), t.needsMeasurement && (tR = !0);
      });
    }
    class tB {
      constructor(t, e, i, n, s, r = !1) {
        (this.state = "pending"),
          (this.isAsync = !1),
          (this.needsMeasurement = !1),
          (this.unresolvedKeyframes = [...t]),
          (this.onComplete = e),
          (this.name = i),
          (this.motionValue = n),
          (this.element = s),
          (this.isAsync = r);
      }
      scheduleResolve() {
        (this.state = "scheduled"),
          this.isAsync
            ? (tN.add(this),
              tV || ((tV = !0), tC.read(tI), tC.resolveKeyframes(tF)))
            : (this.readKeyframes(), this.complete());
      }
      readKeyframes() {
        let {
          unresolvedKeyframes: t,
          name: e,
          element: i,
          motionValue: n,
        } = this;
        if (null === t[0]) {
          let s = n?.get(),
            r = t[t.length - 1];
          if (void 0 !== s) t[0] = s;
          else if (i && e) {
            let n = i.readValue(e, r);
            null != n && (t[0] = n);
          }
          void 0 === t[0] && (t[0] = r), n && void 0 === s && n.set(t[0]);
        }
        for (let e = 1; e < t.length; e++) t[e] ?? (t[e] = t[e - 1]);
      }
      setFinalKeyframe() {}
      measureInitialState() {}
      renderEndStyles() {}
      measureEndState() {}
      complete(t = !1) {
        (this.state = "complete"),
          this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t),
          tN.delete(this);
      }
      cancel() {
        "scheduled" === this.state &&
          (tN.delete(this), (this.state = "pending"));
      }
      resume() {
        "pending" === this.state && this.scheduleResolve();
      }
    }
    let tO = new Set([B, O]);
    function tU(t, e) {
      let i = W(t);
      return (
        tO.has(i) || (i = R),
        i.getAnimatableNone ? i.getAnimatableNone(e) : void 0
      );
    }
    let tz = new Set(["auto", "none", "0"]);
    class t$ extends tB {
      constructor(t, e, i, n, s) {
        super(t, e, i, n, s, !0);
      }
      readKeyframes() {
        let { unresolvedKeyframes: t, element: e, name: i } = this;
        if (!e || !e.current) return;
        super.readKeyframes();
        for (let i = 0; i < t.length; i++) {
          let n = t[i];
          if ("string" == typeof n && to((n = n.trim()))) {
            let s = (function t(e, i, n = 1) {
              ti(
                n <= 4,
                `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`,
                "max-css-var-depth"
              );
              let [s, r] = (function (t) {
                let e = th.exec(t);
                if (!e) return [,];
                let [, i, n, s] = e;
                return [`--${i ?? n}`, s];
              })(e);
              if (!s) return;
              let o = window.getComputedStyle(i).getPropertyValue(s);
              if (o) {
                let t = o.trim();
                return /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t)
                  ? parseFloat(t)
                  : t;
              }
              return to(r) ? t(r, i, n + 1) : r;
            })(n, e.current);
            void 0 !== s && (t[i] = s),
              i === t.length - 1 && (this.finalKeyframe = n);
          }
        }
        if ((this.resolveNoneKeyframes(), !K.has(i) || 2 !== t.length)) return;
        let [n, s] = t,
          r = J(n),
          o = J(s);
        if (tl(n) !== tl(s) && tj[i]) {
          this.needsMeasurement = !0;
          return;
        }
        if (r !== o)
          if (tw(r) && tw(o))
            for (let e = 0; e < t.length; e++) {
              let i = t[e];
              "string" == typeof i && (t[e] = parseFloat(i));
            }
          else tj[i] && (this.needsMeasurement = !0);
      }
      resolveNoneKeyframes() {
        let { unresolvedKeyframes: t, name: e } = this,
          i = [];
        for (let e = 0; e < t.length; e++)
          (null === t[e] ||
            (function (t) {
              if ("number" == typeof t) return 0 === t;
              if (null === t) return !0;
              return "none" === t || "0" === t || /^0[^.\s]+$/u.test(t);
            })(t[e])) &&
            i.push(e);
        i.length &&
          (function (t, e, i) {
            let n,
              s = 0;
            for (; s < t.length && !n; ) {
              let e = t[s];
              "string" == typeof e &&
                !tz.has(e) &&
                N(e).values.length &&
                (n = t[s]),
                s++;
            }
            if (n && i) for (let s of e) t[s] = tU(i, n);
          })(t, i, e);
      }
      measureInitialState() {
        let { element: t, unresolvedKeyframes: e, name: i } = this;
        if (!t || !t.current) return;
        "height" === i && (this.suspendedScrollY = window.pageYOffset),
          (this.measuredOrigin = tj[i](
            t.measureViewportBox(),
            window.getComputedStyle(t.current)
          )),
          (e[0] = this.measuredOrigin);
        let n = e[e.length - 1];
        void 0 !== n && t.getValue(i, n).jump(n, !1);
      }
      measureEndState() {
        let { element: t, name: e, unresolvedKeyframes: i } = this;
        if (!t || !t.current) return;
        let n = t.getValue(e);
        n && n.jump(this.measuredOrigin, !1);
        let s = i.length - 1,
          r = i[s];
        (i[s] = tj[e](
          t.measureViewportBox(),
          window.getComputedStyle(t.current)
        )),
          null !== r &&
            void 0 === this.finalKeyframe &&
            (this.finalKeyframe = r),
          this.removedTransforms?.length &&
            this.removedTransforms.forEach(([e, i]) => {
              t.getValue(e).set(i);
            }),
          this.resolveNoneKeyframes();
      }
    }
    let tW = (t) => 1e3 * t;
    function t_(t, e) {
      -1 === t.indexOf(e) && t.push(e);
    }
    function tH(t, e) {
      let i = t.indexOf(e);
      i > -1 && t.splice(i, 1);
    }
    class tq {
      constructor() {
        this.subscriptions = [];
      }
      add(t) {
        return t_(this.subscriptions, t), () => tH(this.subscriptions, t);
      }
      notify(t, e, i) {
        let n = this.subscriptions.length;
        if (n)
          if (1 === n) this.subscriptions[0](t, e, i);
          else
            for (let s = 0; s < n; s++) {
              let n = this.subscriptions[s];
              n && n(t, e, i);
            }
      }
      getSize() {
        return this.subscriptions.length;
      }
      clear() {
        this.subscriptions.length = 0;
      }
    }
    function tY(t, e, i) {
      e.startsWith("--") ? t.style.setProperty(e, i) : (t.style[e] = i);
    }
    function tX(t) {
      let e;
      return () => (void 0 === e && (e = t()), e);
    }
    let tK = {};
    function tG(t, e) {
      let i = tX(t);
      return () => tK[e] ?? i();
    }
    let tZ = tG(() => void 0 !== window.ScrollTimeline, "scrollTimeline"),
      tJ = (t) => null !== t;
    function tQ(t, { repeat: e, repeatType: i = "loop" }, n, s = 1) {
      let r = t.filter(tJ),
        o = s < 0 || (e && "loop" !== i && e % 2 == 1) ? 0 : r.length - 1;
      return o && void 0 !== n ? n : r[o];
    }
    class t0 {
      constructor() {
        this.updateFinished();
      }
      get finished() {
        return this._finished;
      }
      updateFinished() {
        this._finished = new Promise((t) => {
          this.resolve = t;
        });
      }
      notifyFinished() {
        this.resolve();
      }
      then(t, e) {
        return this.finished.then(t, e);
      }
    }
    let t1 = { layout: 0, mainThread: 0, waapi: 0 },
      t2 = (t) => Array.isArray(t) && "number" == typeof t[0],
      t5 = tG(() => {
        try {
          document
            .createElement("div")
            .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
        } catch (t) {
          return !1;
        }
        return !0;
      }, "linearEasing"),
      t3 = (t, e, i = 10) => {
        let n = "",
          s = Math.max(Math.round(e / i), 2);
        for (let e = 0; e < s; e++)
          n += Math.round(1e4 * t(e / (s - 1))) / 1e4 + ", ";
        return `linear(${n.substring(0, n.length - 2)})`;
      },
      t4 = ([t, e, i, n]) => `cubic-bezier(${t}, ${e}, ${i}, ${n})`,
      t6 = {
        linear: "linear",
        ease: "ease",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
        circIn: t4([0, 0.65, 0.55, 1]),
        circOut: t4([0.55, 0, 1, 0.45]),
        backIn: t4([0.31, 0.01, 0.66, -0.59]),
        backOut: t4([0.33, 1.53, 0.69, 0.99]),
      };
    function t8(t) {
      return "function" == typeof t && "applyToOptions" in t;
    }
    class t7 extends t0 {
      constructor(t) {
        if (
          (super(),
          (this.finishedTime = null),
          (this.isStopped = !1),
          (this.manualStartTime = null),
          !t)
        )
          return;
        const {
          element: e,
          name: i,
          keyframes: n,
          pseudoElement: s,
          allowFlatten: r = !1,
          finalKeyframe: o,
          onComplete: a,
        } = t;
        (this.isPseudoElement = !!s),
          (this.allowFlatten = r),
          (this.options = t),
          ti(
            "string" != typeof t.type,
            'Mini animate() doesn\'t support "type" as a string.',
            "mini-spring"
          );
        const l = (function ({ type: t, ...e }) {
          return t8(t) && t5()
            ? t.applyToOptions(e)
            : (e.duration ?? (e.duration = 300),
              e.ease ?? (e.ease = "easeOut"),
              e);
        })(t);
        (this.animation = (function (
          t,
          e,
          i,
          {
            delay: n = 0,
            duration: s = 300,
            repeat: r = 0,
            repeatType: o = "loop",
            ease: a = "easeOut",
            times: l,
          } = {},
          h
        ) {
          let u = { [e]: i };
          l && (u.offset = l);
          let c = (function t(e, i) {
            if (e)
              return "function" == typeof e
                ? t5()
                  ? t3(e, i)
                  : "ease-out"
                : t2(e)
                ? t4(e)
                : Array.isArray(e)
                ? e.map((e) => t(e, i) || t6.easeOut)
                : t6[e];
          })(a, s);
          Array.isArray(c) && (u.easing = c);
          let d = {
            delay: n,
            duration: s,
            easing: Array.isArray(c) ? "linear" : c,
            fill: "both",
            iterations: r + 1,
            direction: "reverse" === o ? "alternate" : "normal",
          };
          h && (d.pseudoElement = h);
          let p = t.animate(u, d);
          return p;
        })(e, i, n, l, s)),
          !1 === l.autoplay && this.animation.pause(),
          (this.animation.onfinish = () => {
            if (((this.finishedTime = this.time), !s)) {
              let t = tQ(n, this.options, o, this.speed);
              this.updateMotionValue && this.updateMotionValue(t),
                tY(e, i, t),
                this.animation.cancel();
            }
            a?.(), this.notifyFinished();
          });
      }
      play() {
        this.isStopped ||
          ((this.manualStartTime = null),
          this.animation.play(),
          "finished" === this.state && this.updateFinished());
      }
      pause() {
        this.animation.pause();
      }
      complete() {
        this.animation.finish?.();
      }
      cancel() {
        try {
          this.animation.cancel();
        } catch (t) {}
      }
      stop() {
        if (this.isStopped) return;
        this.isStopped = !0;
        let { state: t } = this;
        "idle" !== t &&
          "finished" !== t &&
          (this.updateMotionValue
            ? this.updateMotionValue()
            : this.commitStyles(),
          this.isPseudoElement || this.cancel());
      }
      commitStyles() {
        let t = this.options?.element;
        !this.isPseudoElement &&
          t?.isConnected &&
          this.animation.commitStyles?.();
      }
      get duration() {
        return (
          Number(this.animation.effect?.getComputedTiming?.().duration || 0) /
          1e3
        );
      }
      get iterationDuration() {
        let { delay: t = 0 } = this.options || {};
        return this.duration + t / 1e3;
      }
      get time() {
        return (Number(this.animation.currentTime) || 0) / 1e3;
      }
      set time(t) {
        let e = null !== this.finishedTime;
        (this.manualStartTime = null),
          (this.finishedTime = null),
          (this.animation.currentTime = tW(t)),
          e && this.animation.pause();
      }
      get speed() {
        return this.animation.playbackRate;
      }
      set speed(t) {
        t < 0 && (this.finishedTime = null), (this.animation.playbackRate = t);
      }
      get state() {
        return null !== this.finishedTime
          ? "finished"
          : this.animation.playState;
      }
      get startTime() {
        return this.manualStartTime ?? Number(this.animation.startTime);
      }
      set startTime(t) {
        this.manualStartTime = this.animation.startTime = t;
      }
      attachTimeline({ timeline: t, rangeStart: e, rangeEnd: i, observe: n }) {
        return (this.allowFlatten &&
          this.animation.effect?.updateTiming({ easing: "linear" }),
        (this.animation.onfinish = null),
        t && tZ())
          ? ((this.animation.timeline = t),
            e && (this.animation.rangeStart = e),
            i && (this.animation.rangeEnd = i),
            tT)
          : n(this);
      }
    }
    let t9 = new Set(["opacity", "clipPath", "filter", "transform"]),
      { schedule: et } = tP(queueMicrotask, !1);
    function ee() {
      i = void 0;
    }
    let ei = {
      now: () => (
        void 0 === i &&
          ei.set(
            tA.isProcessing || tk.useManualTiming
              ? tA.timestamp
              : performance.now()
          ),
        i
      ),
      set: (t) => {
        (i = t), queueMicrotask(ee);
      },
    };
    class en {
      constructor(t, e = {}) {
        (this.canTrackVelocity = null),
          (this.events = {}),
          (this.updateAndNotify = (t) => {
            let e = ei.now();
            if (
              (this.updatedAt !== e && this.setPrevFrameValue(),
              (this.prev = this.current),
              this.setCurrent(t),
              this.current !== this.prev &&
                (this.events.change?.notify(this.current), this.dependents))
            )
              for (let t of this.dependents) t.dirty();
          }),
          (this.hasAnimated = !1),
          this.setCurrent(t),
          (this.owner = e.owner);
      }
      setCurrent(t) {
        (this.current = t),
          (this.updatedAt = ei.now()),
          null === this.canTrackVelocity &&
            void 0 !== t &&
            (this.canTrackVelocity = !isNaN(parseFloat(this.current)));
      }
      setPrevFrameValue(t = this.current) {
        (this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt);
      }
      onChange(t) {
        return this.on("change", t);
      }
      on(t, e) {
        this.events[t] || (this.events[t] = new tq());
        let i = this.events[t].add(e);
        return "change" === t
          ? () => {
              i(),
                tC.read(() => {
                  this.events.change.getSize() || this.stop();
                });
            }
          : i;
      }
      clearListeners() {
        for (let t in this.events) this.events[t].clear();
      }
      attach(t, e) {
        (this.passiveEffect = t), (this.stopPassiveEffect = e);
      }
      set(t) {
        this.passiveEffect
          ? this.passiveEffect(t, this.updateAndNotify)
          : this.updateAndNotify(t);
      }
      setWithVelocity(t, e, i) {
        this.set(e),
          (this.prev = void 0),
          (this.prevFrameValue = t),
          (this.prevUpdatedAt = this.updatedAt - i);
      }
      jump(t, e = !0) {
        this.updateAndNotify(t),
          (this.prev = t),
          (this.prevUpdatedAt = this.prevFrameValue = void 0),
          e && this.stop(),
          this.stopPassiveEffect && this.stopPassiveEffect();
      }
      dirty() {
        this.events.change?.notify(this.current);
      }
      addDependent(t) {
        this.dependents || (this.dependents = new Set()),
          this.dependents.add(t);
      }
      removeDependent(t) {
        this.dependents && this.dependents.delete(t);
      }
      get() {
        return e && e.push(this), this.current;
      }
      getPrevious() {
        return this.prev;
      }
      getVelocity() {
        var t;
        let e = ei.now();
        if (
          !this.canTrackVelocity ||
          void 0 === this.prevFrameValue ||
          e - this.updatedAt > 30
        )
          return 0;
        let i = Math.min(this.updatedAt - this.prevUpdatedAt, 30);
        return (
          (t = parseFloat(this.current) - parseFloat(this.prevFrameValue)),
          i ? (1e3 / i) * t : 0
        );
      }
      start(t) {
        return (
          this.stop(),
          new Promise((e) => {
            (this.hasAnimated = !0),
              (this.animation = t(e)),
              this.events.animationStart && this.events.animationStart.notify();
          }).then(() => {
            this.events.animationComplete &&
              this.events.animationComplete.notify(),
              this.clearAnimation();
          })
        );
      }
      stop() {
        this.animation &&
          (this.animation.stop(),
          this.events.animationCancel && this.events.animationCancel.notify()),
          this.clearAnimation();
      }
      isAnimating() {
        return !!this.animation;
      }
      clearAnimation() {
        delete this.animation;
      }
      destroy() {
        this.dependents?.clear(),
          this.events.destroy?.notify(),
          this.clearListeners(),
          this.stop(),
          this.stopPassiveEffect && this.stopPassiveEffect();
      }
    }
    function es(t, e) {
      return new en(t, e);
    }
    let er = [...Z, P, R],
      eo = new WeakMap();
    function ea(t) {
      return null !== t && "object" == typeof t && "function" == typeof t.start;
    }
    function el(t) {
      return "string" == typeof t || Array.isArray(t);
    }
    let eh = [
        "animate",
        "whileInView",
        "whileFocus",
        "whileHover",
        "whileTap",
        "whileDrag",
        "exit",
      ],
      eu = ["initial", ...eh];
    function ec(t) {
      return ea(t.animate) || eu.some((e) => el(t[e]));
    }
    function ed(t) {
      return !!(ec(t) || t.variants);
    }
    let ep = { current: null },
      em = { current: !1 },
      ef = "undefined" != typeof window;
    function eg(t) {
      let e = [{}, {}];
      return (
        t?.values.forEach((t, i) => {
          (e[0][i] = t.get()), (e[1][i] = t.getVelocity());
        }),
        e
      );
    }
    function ev(t, e, i, n) {
      if ("function" == typeof e) {
        let [s, r] = eg(n);
        e = e(void 0 !== i ? i : t.custom, s, r);
      }
      if (
        ("string" == typeof e && (e = t.variants && t.variants[e]),
        "function" == typeof e)
      ) {
        let [s, r] = eg(n);
        e = e(void 0 !== i ? i : t.custom, s, r);
      }
      return e;
    }
    let ey = [
        "AnimationStart",
        "AnimationComplete",
        "Update",
        "BeforeLayoutMeasure",
        "LayoutMeasure",
        "LayoutAnimationStart",
        "LayoutAnimationComplete",
      ],
      ex = {};
    class ew {
      scrapeMotionValuesFromProps(t, e, i) {
        return {};
      }
      constructor(
        {
          parent: t,
          props: e,
          presenceContext: i,
          reducedMotionConfig: n,
          skipAnimations: s,
          blockInitialAnimation: r,
          visualState: o,
        },
        a = {}
      ) {
        (this.current = null),
          (this.children = new Set()),
          (this.isVariantNode = !1),
          (this.isControllingVariants = !1),
          (this.shouldReduceMotion = null),
          (this.shouldSkipAnimations = !1),
          (this.values = new Map()),
          (this.KeyframeResolver = tB),
          (this.features = {}),
          (this.valueSubscriptions = new Map()),
          (this.prevMotionValues = {}),
          (this.hasBeenMounted = !1),
          (this.events = {}),
          (this.propEventSubscriptions = {}),
          (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
          (this.render = () => {
            this.current &&
              (this.triggerBuild(),
              this.renderInstance(
                this.current,
                this.renderState,
                this.props.style,
                this.projection
              ));
          }),
          (this.renderScheduledAt = 0),
          (this.scheduleRender = () => {
            let t = ei.now();
            this.renderScheduledAt < t &&
              ((this.renderScheduledAt = t), tC.render(this.render, !1, !0));
          });
        const { latestValues: l, renderState: h } = o;
        (this.latestValues = l),
          (this.baseTarget = { ...l }),
          (this.initialValues = e.initial ? { ...l } : {}),
          (this.renderState = h),
          (this.parent = t),
          (this.props = e),
          (this.presenceContext = i),
          (this.depth = t ? t.depth + 1 : 0),
          (this.reducedMotionConfig = n),
          (this.skipAnimationsConfig = s),
          (this.options = a),
          (this.blockInitialAnimation = !!r),
          (this.isControllingVariants = ec(e)),
          (this.isVariantNode = ed(e)),
          this.isVariantNode && (this.variantChildren = new Set()),
          (this.manuallyAnimateOnMount = !!(t && t.current));
        const { willChange: u, ...c } = this.scrapeMotionValuesFromProps(
          e,
          {},
          this
        );
        for (const t in c) {
          const e = c[t];
          void 0 !== l[t] && X(e) && e.set(l[t]);
        }
      }
      mount(t) {
        if (this.hasBeenMounted)
          for (let t in this.initialValues)
            this.values.get(t)?.jump(this.initialValues[t]),
              (this.latestValues[t] = this.initialValues[t]);
        (this.current = t),
          eo.set(t, this),
          this.projection &&
            !this.projection.instance &&
            this.projection.mount(t),
          this.parent &&
            this.isVariantNode &&
            !this.isControllingVariants &&
            (this.removeFromVariantTree = this.parent.addVariantChild(this)),
          this.values.forEach((t, e) => this.bindToMotionValue(e, t)),
          "never" === this.reducedMotionConfig
            ? (this.shouldReduceMotion = !1)
            : "always" === this.reducedMotionConfig
            ? (this.shouldReduceMotion = !0)
            : (em.current ||
                (function () {
                  if (((em.current = !0), ef))
                    if (window.matchMedia) {
                      let t = window.matchMedia("(prefers-reduced-motion)"),
                        e = () => (ep.current = t.matches);
                      t.addEventListener("change", e), e();
                    } else ep.current = !1;
                })(),
              (this.shouldReduceMotion = ep.current)),
          (this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1),
          this.parent?.addChild(this),
          this.update(this.props, this.presenceContext),
          (this.hasBeenMounted = !0);
      }
      unmount() {
        for (let t in (this.projection && this.projection.unmount(),
        tM(this.notifyUpdate),
        tM(this.render),
        this.valueSubscriptions.forEach((t) => t()),
        this.valueSubscriptions.clear(),
        this.removeFromVariantTree && this.removeFromVariantTree(),
        this.parent?.removeChild(this),
        this.events))
          this.events[t].clear();
        for (let t in this.features) {
          let e = this.features[t];
          e && (e.unmount(), (e.isMounted = !1));
        }
        this.current = null;
      }
      addChild(t) {
        this.children.add(t),
          this.enteringChildren ?? (this.enteringChildren = new Set()),
          this.enteringChildren.add(t);
      }
      removeChild(t) {
        this.children.delete(t),
          this.enteringChildren && this.enteringChildren.delete(t);
      }
      bindToMotionValue(t, e) {
        let i;
        if (
          (this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)(),
          e.accelerate && t9.has(t) && this.current instanceof HTMLElement)
        ) {
          let {
              factory: i,
              keyframes: n,
              times: s,
              ease: r,
              duration: o,
            } = e.accelerate,
            a = new t7({
              element: this.current,
              name: t,
              keyframes: n,
              times: s,
              ease: r,
              duration: tW(o),
            }),
            l = i(a);
          this.valueSubscriptions.set(t, () => {
            l(), a.cancel();
          });
          return;
        }
        let n = o.has(t);
        n && this.onBindTransform && this.onBindTransform();
        let s = e.on("change", (e) => {
          (this.latestValues[t] = e),
            this.props.onUpdate && tC.preRender(this.notifyUpdate),
            n && this.projection && (this.projection.isTransformDirty = !0),
            this.scheduleRender();
        });
        "undefined" != typeof window &&
          window.MotionCheckAppearSync &&
          (i = window.MotionCheckAppearSync(this, t, e)),
          this.valueSubscriptions.set(t, () => {
            s(), i && i(), e.owner && e.stop();
          });
      }
      sortNodePosition(t) {
        return this.current &&
          this.sortInstanceNodePosition &&
          this.type === t.type
          ? this.sortInstanceNodePosition(this.current, t.current)
          : 0;
      }
      updateFeatures() {
        let t = "animation";
        for (t in ex) {
          let e = ex[t];
          if (!e) continue;
          let { isEnabled: i, Feature: n } = e;
          if (
            (!this.features[t] &&
              n &&
              i(this.props) &&
              (this.features[t] = new n(this)),
            this.features[t])
          ) {
            let e = this.features[t];
            e.isMounted ? e.update() : (e.mount(), (e.isMounted = !0));
          }
        }
      }
      triggerBuild() {
        this.build(this.renderState, this.latestValues, this.props);
      }
      measureViewportBox() {
        return this.current
          ? this.measureInstanceViewportBox(this.current, this.props)
          : Y();
      }
      getStaticValue(t) {
        return this.latestValues[t];
      }
      setStaticValue(t, e) {
        this.latestValues[t] = e;
      }
      update(t, e) {
        (t.transformTemplate || this.props.transformTemplate) &&
          this.scheduleRender(),
          (this.prevProps = this.props),
          (this.props = t),
          (this.prevPresenceContext = this.presenceContext),
          (this.presenceContext = e);
        for (let e = 0; e < ey.length; e++) {
          let i = ey[e];
          this.propEventSubscriptions[i] &&
            (this.propEventSubscriptions[i](),
            delete this.propEventSubscriptions[i]);
          let n = t["on" + i];
          n && (this.propEventSubscriptions[i] = this.on(i, n));
        }
        (this.prevMotionValues = (function (t, e, i) {
          for (let n in e) {
            let s = e[n],
              r = i[n];
            if (X(s)) t.addValue(n, s);
            else if (X(r)) t.addValue(n, es(s, { owner: t }));
            else if (r !== s)
              if (t.hasValue(n)) {
                let e = t.getValue(n);
                !0 === e.liveStyle ? e.jump(s) : e.hasAnimated || e.set(s);
              } else {
                let e = t.getStaticValue(n);
                t.addValue(n, es(void 0 !== e ? e : s, { owner: t }));
              }
          }
          for (let n in i) void 0 === e[n] && t.removeValue(n);
          return e;
        })(
          this,
          this.scrapeMotionValuesFromProps(t, this.prevProps || {}, this),
          this.prevMotionValues
        )),
          this.handleChildMotionValue && this.handleChildMotionValue();
      }
      getProps() {
        return this.props;
      }
      getVariant(t) {
        return this.props.variants ? this.props.variants[t] : void 0;
      }
      getDefaultTransition() {
        return this.props.transition;
      }
      getTransformPagePoint() {
        return this.props.transformPagePoint;
      }
      getClosestVariantNode() {
        return this.isVariantNode
          ? this
          : this.parent
          ? this.parent.getClosestVariantNode()
          : void 0;
      }
      addVariantChild(t) {
        let e = this.getClosestVariantNode();
        if (e)
          return (
            e.variantChildren && e.variantChildren.add(t),
            () => e.variantChildren.delete(t)
          );
      }
      addValue(t, e) {
        let i = this.values.get(t);
        e !== i &&
          (i && this.removeValue(t),
          this.bindToMotionValue(t, e),
          this.values.set(t, e),
          (this.latestValues[t] = e.get()));
      }
      removeValue(t) {
        this.values.delete(t);
        let e = this.valueSubscriptions.get(t);
        e && (e(), this.valueSubscriptions.delete(t)),
          delete this.latestValues[t],
          this.removeValueFromRenderState(t, this.renderState);
      }
      hasValue(t) {
        return this.values.has(t);
      }
      getValue(t, e) {
        if (this.props.values && this.props.values[t])
          return this.props.values[t];
        let i = this.values.get(t);
        return (
          void 0 === i &&
            void 0 !== e &&
            ((i = es(null === e ? void 0 : e, { owner: this })),
            this.addValue(t, i)),
          i
        );
      }
      readValue(t, e) {
        let i =
          void 0 === this.latestValues[t] && this.current
            ? this.getBaseTargetFromProps(this.props, t) ??
              this.readValueFromInstance(this.current, t, this.options)
            : this.latestValues[t];
        if (null != i) {
          let n, s;
          if (
            "string" == typeof i &&
            ((n = i),
            /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n) ||
              ((s = i), /^0[^.\s]+$/u.test(s)))
          )
            i = parseFloat(i);
          else {
            let n;
            (n = i), !er.find(G(n)) && R.test(e) && (i = tU(t, e));
          }
          this.setBaseTarget(t, X(i) ? i.get() : i);
        }
        return X(i) ? i.get() : i;
      }
      setBaseTarget(t, e) {
        this.baseTarget[t] = e;
      }
      getBaseTarget(t) {
        let e,
          { initial: i } = this.props;
        if ("string" == typeof i || "object" == typeof i) {
          let n = ev(this.props, i, this.presenceContext?.custom);
          n && (e = n[t]);
        }
        if (i && void 0 !== e) return e;
        let n = this.getBaseTargetFromProps(this.props, t);
        return void 0 === n || X(n)
          ? void 0 !== this.initialValues[t] && void 0 === e
            ? void 0
            : this.baseTarget[t]
          : n;
      }
      on(t, e) {
        return (
          this.events[t] || (this.events[t] = new tq()), this.events[t].add(e)
        );
      }
      notify(t, ...e) {
        this.events[t] && this.events[t].notify(...e);
      }
      scheduleRenderMicrotask() {
        et.render(this.render);
      }
    }
    class eb extends ew {
      constructor() {
        super(...arguments), (this.KeyframeResolver = t$);
      }
      sortInstanceNodePosition(t, e) {
        return 2 & t.compareDocumentPosition(e) ? 1 : -1;
      }
      getBaseTargetFromProps(t, e) {
        let i = t.style;
        return i ? i[e] : void 0;
      }
      removeValueFromRenderState(t, { vars: e, style: i }) {
        delete e[t], delete i[t];
      }
      handleChildMotionValue() {
        this.childSubscription &&
          (this.childSubscription(), delete this.childSubscription);
        let { children: t } = this.props;
        X(t) &&
          (this.childSubscription = t.on("change", (t) => {
            this.current && (this.current.textContent = `${t}`);
          }));
      }
    }
    function eS(t) {
      return t.replace(/([A-Z])/g, (t) => `-${t.toLowerCase()}`);
    }
    let ej = (t, e) => (e && "number" == typeof t ? e.transform(t) : t),
      eT = {
        x: "translateX",
        y: "translateY",
        z: "translateZ",
        transformPerspective: "perspective",
      },
      ek = r.length;
    function eE(t, e, i) {
      let { style: n, vars: s, transformOrigin: a } = t,
        l = !1,
        h = !1;
      for (let t in e) {
        let i = e[t];
        if (o.has(t)) {
          l = !0;
          continue;
        }
        if (ts(t)) {
          s[t] = i;
          continue;
        }
        {
          let e = ej(i, z[t]);
          t.startsWith("origin") ? ((h = !0), (a[t] = e)) : (n[t] = e);
        }
      }
      if (
        (!e.transform &&
          (l || i
            ? (n.transform = (function (t, e, i) {
                let n = "",
                  s = !0;
                for (let o = 0; o < ek; o++) {
                  let a = r[o],
                    l = t[a];
                  if (void 0 === l) continue;
                  let h = !0;
                  if ("number" == typeof l) h = l === +!!a.startsWith("scale");
                  else {
                    let t = parseFloat(l);
                    h = a.startsWith("scale") ? 1 === t : 0 === t;
                  }
                  if (!h || i) {
                    let t = ej(l, z[a]);
                    if (!h) {
                      s = !1;
                      let e = eT[a] || a;
                      n += `${e}(${t}) `;
                    }
                    i && (e[a] = t);
                  }
                }
                return (
                  (n = n.trim()),
                  i ? (n = i(e, s ? "" : n)) : s && (n = "none"),
                  n
                );
              })(e, t.transform, i))
            : n.transform && (n.transform = "none")),
        h)
      ) {
        let { originX: t = "50%", originY: e = "50%", originZ: i = 0 } = a;
        n.transformOrigin = `${t} ${e} ${i}`;
      }
    }
    let eP = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
      eC = { offset: "strokeDashoffset", array: "strokeDasharray" },
      eM = ["offsetDistance", "offsetPath", "offsetRotate", "offsetAnchor"];
    function eA(
      t,
      {
        attrX: e,
        attrY: i,
        attrScale: n,
        pathLength: s,
        pathSpacing: r = 1,
        pathOffset: o = 0,
        ...a
      },
      l,
      h,
      u
    ) {
      if ((eE(t, a, h), l)) {
        t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
        return;
      }
      (t.attrs = t.style), (t.style = {});
      let { attrs: c, style: d } = t;
      for (let t of (c.transform &&
        ((d.transform = c.transform), delete c.transform),
      (d.transform || c.transformOrigin) &&
        ((d.transformOrigin = c.transformOrigin ?? "50% 50%"),
        delete c.transformOrigin),
      d.transform &&
        ((d.transformBox = u?.transformBox ?? "fill-box"),
        delete c.transformBox),
      eM))
        void 0 !== c[t] && ((d[t] = c[t]), delete c[t]);
      void 0 !== e && (c.x = e),
        void 0 !== i && (c.y = i),
        void 0 !== n && (c.scale = n),
        void 0 !== s &&
          (function (t, e, i = 1, n = 0, s = !0) {
            t.pathLength = 1;
            let r = s ? eP : eC;
            (t[r.offset] = `${-n}`), (t[r.array] = `${e} ${i}`);
          })(c, s, r, o, !1);
    }
    let eL = new Set([
        "baseFrequency",
        "diffuseConstant",
        "kernelMatrix",
        "kernelUnitLength",
        "keySplines",
        "keyTimes",
        "limitingConeAngle",
        "markerHeight",
        "markerWidth",
        "numOctaves",
        "targetX",
        "targetY",
        "surfaceScale",
        "specularConstant",
        "specularExponent",
        "stdDeviation",
        "tableValues",
        "viewBox",
        "gradientTransform",
        "pathLength",
        "startOffset",
        "textLength",
        "lengthAdjust",
      ]),
      eN = (t) => "string" == typeof t && "svg" === t.toLowerCase();
    function eV(t, { style: e, vars: i }, n, s) {
      let r,
        o = t.style;
      for (r in e) o[r] = e[r];
      for (r in (s?.applyProjectionStyles(o, n), i)) o.setProperty(r, i[r]);
    }
    function eR(t, e) {
      return e.max === e.min ? 0 : (t / (e.max - e.min)) * 100;
    }
    let eD = {
        correct: (t, e) => {
          if (!e.target) return t;
          if ("string" == typeof t)
            if (!S.test(t)) return t;
            else t = parseFloat(t);
          let i = eR(t, e.target.x),
            n = eR(t, e.target.y);
          return `${i}% ${n}%`;
        },
      },
      eF = (t, e, i) => t + (e - t) * i,
      eI = {
        borderRadius: {
          ...eD,
          applyTo: [
            "borderTopLeftRadius",
            "borderTopRightRadius",
            "borderBottomLeftRadius",
            "borderBottomRightRadius",
          ],
        },
        borderTopLeftRadius: eD,
        borderTopRightRadius: eD,
        borderBottomLeftRadius: eD,
        borderBottomRightRadius: eD,
        boxShadow: {
          correct: (t, { treeScale: e, projectionDelta: i }) => {
            let n = R.parse(t);
            if (n.length > 5) return t;
            let s = R.createTransformer(t),
              r = +("number" != typeof n[0]),
              o = i.x.scale * e.x,
              a = i.y.scale * e.y;
            (n[0 + r] /= o), (n[1 + r] /= a);
            let l = eF(o, a, 0.5);
            return (
              "number" == typeof n[2 + r] && (n[2 + r] /= l),
              "number" == typeof n[3 + r] && (n[3 + r] /= l),
              s(n)
            );
          },
        },
      };
    function eB(t, { layout: e, layoutId: i }) {
      return (
        o.has(t) ||
        t.startsWith("origin") ||
        ((e || void 0 !== i) && (!!eI[t] || "opacity" === t))
      );
    }
    function eO(t, e, i) {
      let n = t.style,
        s = e?.style,
        r = {};
      if (!n) return r;
      for (let e in n)
        (X(n[e]) ||
          (s && X(s[e])) ||
          eB(e, t) ||
          i?.getValue(e)?.liveStyle !== void 0) &&
          (r[e] = n[e]);
      return r;
    }
    function eU(t, e, i) {
      let n = eO(t, e, i);
      for (let i in t)
        (X(t[i]) || X(e[i])) &&
          (n[
            -1 !== r.indexOf(i)
              ? "attr" + i.charAt(0).toUpperCase() + i.substring(1)
              : i
          ] = t[i]);
      return n;
    }
    class ez extends eb {
      constructor() {
        super(...arguments),
          (this.type = "svg"),
          (this.isSVGTag = !1),
          (this.measureInstanceViewportBox = Y);
      }
      getBaseTargetFromProps(t, e) {
        return t[e];
      }
      readValueFromInstance(t, e) {
        if (o.has(e)) {
          let t = W(e);
          return (t && t.default) || 0;
        }
        return (e = eL.has(e) ? e : eS(e)), t.getAttribute(e);
      }
      scrapeMotionValuesFromProps(t, e, i) {
        return eU(t, e, i);
      }
      build(t, e, i) {
        eA(t, e, this.isSVGTag, i.transformTemplate, i.style);
      }
      renderInstance(t, e, i, n) {
        for (let i in (eV(t, e, void 0, n), e.attrs))
          t.setAttribute(eL.has(i) ? i : eS(i), e.attrs[i]);
      }
      mount(t) {
        (this.isSVGTag = eN(t.tagName)), super.mount(t);
      }
    }
    function e$({ top: t, left: e, right: i, bottom: n }) {
      return { x: { min: e, max: i }, y: { min: t, max: n } };
    }
    function eW(t) {
      return void 0 === t || 1 === t;
    }
    function e_({ scale: t, scaleX: e, scaleY: i }) {
      return !eW(t) || !eW(e) || !eW(i);
    }
    function eH(t) {
      return (
        e_(t) ||
        eq(t) ||
        t.z ||
        t.rotate ||
        t.rotateX ||
        t.rotateY ||
        t.skewX ||
        t.skewY
      );
    }
    function eq(t) {
      var e, i;
      return ((e = t.x) && "0%" !== e) || ((i = t.y) && "0%" !== i);
    }
    function eY(t, e, i, n, s) {
      return void 0 !== s && (t = n + s * (t - n)), n + i * (t - n) + e;
    }
    function eX(t, e = 0, i = 1, n, s) {
      (t.min = eY(t.min, e, i, n, s)), (t.max = eY(t.max, e, i, n, s));
    }
    function eK(t, { x: e, y: i }) {
      eX(t.x, e.translate, e.scale, e.originPoint),
        eX(t.y, i.translate, i.scale, i.originPoint);
    }
    function eG(t, e) {
      (t.min = t.min + e), (t.max = t.max + e);
    }
    function eZ(t, e, i, n, s = 0.5) {
      let r = eF(t.min, t.max, s);
      eX(t, e, i, r, n);
    }
    function eJ(t, e) {
      return "string" == typeof t ? (parseFloat(t) / 100) * (e.max - e.min) : t;
    }
    function eQ(t, e, i) {
      let n = i ?? t;
      eZ(t.x, eJ(e.x, n.x), e.scaleX, e.scale, e.originX),
        eZ(t.y, eJ(e.y, n.y), e.scaleY, e.scale, e.originY);
    }
    function e0(t, e) {
      return e$(
        (function (t, e) {
          if (!e) return t;
          let i = e({ x: t.left, y: t.top }),
            n = e({ x: t.right, y: t.bottom });
          return { top: i.y, left: i.x, bottom: n.y, right: n.x };
        })(t.getBoundingClientRect(), e)
      );
    }
    class e1 extends eb {
      constructor() {
        super(...arguments), (this.type = "html"), (this.renderInstance = eV);
      }
      readValueFromInstance(t, e) {
        if (o.has(e))
          return this.projection?.isProjecting
            ? tv(e)
            : ((t, e) => {
                let { transform: i = "none" } = getComputedStyle(t);
                return ty(i, e);
              })(t, e);
        {
          let i = window.getComputedStyle(t),
            n = (ts(e) ? i.getPropertyValue(e) : i[e]) || 0;
          return "string" == typeof n ? n.trim() : n;
        }
      }
      measureInstanceViewportBox(t, { transformPagePoint: e }) {
        return e0(t, e);
      }
      build(t, e, i) {
        eE(t, e, i.transformTemplate);
      }
      scrapeMotionValuesFromProps(t, e, i) {
        return eO(t, e, i);
      }
    }
    var e2 = t.i(71645);
    let e5 = [
      "animate",
      "circle",
      "defs",
      "desc",
      "ellipse",
      "g",
      "image",
      "line",
      "filter",
      "marker",
      "mask",
      "metadata",
      "path",
      "pattern",
      "polygon",
      "polyline",
      "rect",
      "stop",
      "switch",
      "symbol",
      "svg",
      "text",
      "tspan",
      "use",
      "view",
    ];
    function e3(t) {
      if ("string" != typeof t || t.includes("-"));
      else if (e5.indexOf(t) > -1 || /[A-Z]/u.test(t)) return !0;
      return !1;
    }
    var e4 = t.i(43476);
    let e6 = (0, e2.createContext)({}),
      e8 = (0, e2.createContext)({ strict: !1 }),
      e7 = (0, e2.createContext)({
        transformPagePoint: (t) => t,
        isStatic: !1,
        reducedMotion: "never",
      }),
      e9 = (0, e2.createContext)({});
    function it(t) {
      return Array.isArray(t) ? t.join(" ") : t;
    }
    let ie = () => ({
      style: {},
      transform: {},
      transformOrigin: {},
      vars: {},
    });
    function ii(t, e, i) {
      for (let n in e) X(e[n]) || eB(n, i) || (t[n] = e[n]);
    }
    let is = () => ({ ...ie(), attrs: {} }),
      ir = new Set([
        "animate",
        "exit",
        "variants",
        "initial",
        "style",
        "values",
        "variants",
        "transition",
        "transformTemplate",
        "custom",
        "inherit",
        "onBeforeLayoutMeasure",
        "onAnimationStart",
        "onAnimationComplete",
        "onUpdate",
        "onDragStart",
        "onDrag",
        "onDragEnd",
        "onMeasureDragConstraints",
        "onDirectionLock",
        "onDragTransitionEnd",
        "_dragX",
        "_dragY",
        "onHoverStart",
        "onHoverEnd",
        "onViewportEnter",
        "onViewportLeave",
        "globalTapTarget",
        "propagate",
        "ignoreStrict",
        "viewport",
      ]);
    function io(t) {
      return (
        t.startsWith("while") ||
        (t.startsWith("drag") && "draggable" !== t) ||
        t.startsWith("layout") ||
        t.startsWith("onTap") ||
        t.startsWith("onPan") ||
        t.startsWith("onLayout") ||
        ir.has(t)
      );
    }
    let ia = (t) => !io(t);
    try {
      (Q = (() => {
        let t = Error("Cannot find module '@emotion/is-prop-valid'");
        throw ((t.code = "MODULE_NOT_FOUND"), t);
      })().default),
        "function" == typeof Q &&
          (ia = (t) => (t.startsWith("on") ? !io(t) : Q(t)));
    } catch {}
    function il(t) {
      return X(t) ? t.get() : t;
    }
    let ih = (0, e2.createContext)(null);
    function iu(t) {
      let e = (0, e2.useRef)(null);
      return null === e.current && (e.current = t()), e.current;
    }
    let ic = (t) => (e, i) => {
        let n = (0, e2.useContext)(e9),
          s = (0, e2.useContext)(ih),
          r = () =>
            (function (
              { scrapeMotionValuesFromProps: t, createRenderState: e },
              i,
              n,
              s
            ) {
              return {
                latestValues: (function (t, e, i, n) {
                  let s = {},
                    r = n(t, {});
                  for (let t in r) s[t] = il(r[t]);
                  let { initial: o, animate: a } = t,
                    l = ec(t),
                    h = ed(t);
                  e &&
                    h &&
                    !l &&
                    !1 !== t.inherit &&
                    (void 0 === o && (o = e.initial),
                    void 0 === a && (a = e.animate));
                  let u = !!i && !1 === i.initial,
                    c = (u = u || !1 === o) ? a : o;
                  if (c && "boolean" != typeof c && !ea(c)) {
                    let e = Array.isArray(c) ? c : [c];
                    for (let i = 0; i < e.length; i++) {
                      let n = ev(t, e[i]);
                      if (n) {
                        let { transitionEnd: t, transition: e, ...i } = n;
                        for (let t in i) {
                          let e = i[t];
                          if (Array.isArray(e)) {
                            let t = u ? e.length - 1 : 0;
                            e = e[t];
                          }
                          null !== e && (s[t] = e);
                        }
                        for (let e in t) s[e] = t[e];
                      }
                    }
                  }
                  return s;
                })(i, n, s, t),
                renderState: e(),
              };
            })(t, e, n, s);
        return i ? r() : iu(r);
      },
      id = ic({ scrapeMotionValuesFromProps: eO, createRenderState: ie }),
      ip = ic({ scrapeMotionValuesFromProps: eU, createRenderState: is }),
      im = {
        animation: [
          "animate",
          "variants",
          "whileHover",
          "whileTap",
          "exit",
          "whileInView",
          "whileFocus",
          "whileDrag",
        ],
        exit: ["exit"],
        drag: ["drag", "dragControls"],
        focus: ["whileFocus"],
        hover: ["whileHover", "onHoverStart", "onHoverEnd"],
        tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
        pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
        inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
        layout: ["layout", "layoutId"],
      },
      ig = !1;
    function iv() {
      return (
        !(function () {
          if (ig) return;
          let t = {};
          for (let e in im)
            t[e] = { isEnabled: (t) => im[e].some((e) => !!t[e]) };
          (ex = t), (ig = !0);
        })(),
        ex
      );
    }
    let iy = Symbol.for("motionComponentSymbol"),
      ix = "data-" + eS("framerAppearId"),
      iw = (0, e2.createContext)({});
    function ib(t) {
      return (
        t &&
        "object" == typeof t &&
        Object.prototype.hasOwnProperty.call(t, "current")
      );
    }
    let iS = "undefined" != typeof window ? e2.useLayoutEffect : e2.useEffect;
    function ij(t, { forwardMotionProps: e = !1, type: i } = {}, n, s) {
      n &&
        (function (t) {
          let e = iv();
          for (let i in t) e[i] = { ...e[i], ...t[i] };
          ex = e;
        })(n);
      let r = i ? "svg" === i : e3(t),
        o = r ? ip : id;
      function a(i, n) {
        var a;
        let l,
          h,
          u,
          c = {
            ...(0, e2.useContext)(e7),
            ...i,
            layoutId: (function ({ layoutId: t }) {
              let e = (0, e2.useContext)(e6).id;
              return e && void 0 !== t ? e + "-" + t : t;
            })(i),
          },
          { isStatic: d } = c,
          p = (function (t) {
            let { initial: e, animate: i } = (function (t, e) {
              if (ec(t)) {
                let { initial: e, animate: i } = t;
                return {
                  initial: !1 === e || el(e) ? e : void 0,
                  animate: el(i) ? i : void 0,
                };
              }
              return !1 !== t.inherit ? e : {};
            })(t, (0, e2.useContext)(e9));
            return (0, e2.useMemo)(
              () => ({ initial: e, animate: i }),
              [it(e), it(i)]
            );
          })(i),
          m = o(i, d);
        if (!d && "undefined" != typeof window) {
          (0, e2.useContext)(e8).strict;
          let e = (function (t) {
            let { drag: e, layout: i } = iv();
            if (!e && !i) return {};
            let n = { ...e, ...i };
            return {
              MeasureLayout:
                e?.isEnabled(t) || i?.isEnabled(t) ? n.MeasureLayout : void 0,
              ProjectionNode: n.ProjectionNode,
            };
          })(c);
          (l = e.MeasureLayout),
            (p.visualElement = (function (t, e, i, n, s, r) {
              let { visualElement: o } = (0, e2.useContext)(e9),
                a = (0, e2.useContext)(e8),
                l = (0, e2.useContext)(ih),
                h = (0, e2.useContext)(e7),
                u = h.reducedMotion,
                c = h.skipAnimations,
                d = (0, e2.useRef)(null),
                p = (0, e2.useRef)(!1);
              (n = n || a.renderer),
                !d.current &&
                  n &&
                  ((d.current = n(t, {
                    visualState: e,
                    parent: o,
                    props: i,
                    presenceContext: l,
                    blockInitialAnimation: !!l && !1 === l.initial,
                    reducedMotionConfig: u,
                    skipAnimations: c,
                    isSVG: r,
                  })),
                  p.current &&
                    d.current &&
                    (d.current.manuallyAnimateOnMount = !0));
              let m = d.current,
                f = (0, e2.useContext)(iw);
              m &&
                !m.projection &&
                s &&
                ("html" === m.type || "svg" === m.type) &&
                (function (t, e, i, n) {
                  let {
                    layoutId: s,
                    layout: r,
                    drag: o,
                    dragConstraints: a,
                    layoutScroll: l,
                    layoutRoot: h,
                    layoutCrossfade: u,
                  } = e;
                  (t.projection = new i(
                    t.latestValues,
                    e["data-framer-portal-id"]
                      ? void 0
                      : (function t(e) {
                          if (e)
                            return !1 !== e.options.allowProjection
                              ? e.projection
                              : t(e.parent);
                        })(t.parent)
                  )),
                    t.projection.setOptions({
                      layoutId: s,
                      layout: r,
                      alwaysMeasureLayout: !!o || (a && ib(a)),
                      visualElement: t,
                      animationType: "string" == typeof r ? r : "both",
                      initialPromotionConfig: n,
                      crossfade: u,
                      layoutScroll: l,
                      layoutRoot: h,
                    });
                })(d.current, i, s, f);
              let g = (0, e2.useRef)(!1);
              (0, e2.useInsertionEffect)(() => {
                m && g.current && m.update(i, l);
              });
              let v = i[ix],
                y = (0, e2.useRef)(
                  !!v &&
                    "undefined" != typeof window &&
                    !window.MotionHandoffIsComplete?.(v) &&
                    window.MotionHasOptimisedAnimation?.(v)
                );
              return (
                iS(() => {
                  (p.current = !0),
                    m &&
                      ((g.current = !0),
                      (window.MotionIsMounted = !0),
                      m.updateFeatures(),
                      m.scheduleRenderMicrotask(),
                      y.current &&
                        m.animationState &&
                        m.animationState.animateChanges());
                }),
                (0, e2.useEffect)(() => {
                  m &&
                    (!y.current &&
                      m.animationState &&
                      m.animationState.animateChanges(),
                    y.current &&
                      (queueMicrotask(() => {
                        window.MotionHandoffMarkAsComplete?.(v);
                      }),
                      (y.current = !1)),
                    (m.enteringChildren = void 0));
                }),
                m
              );
            })(t, m, c, s, e.ProjectionNode, r));
        }
        return (0, e4.jsxs)(e9.Provider, {
          value: p,
          children: [
            l && p.visualElement
              ? (0, e4.jsx)(l, { visualElement: p.visualElement, ...c })
              : null,
            (function (t, e, i, { latestValues: n }, s, r = !1, o) {
              let a = (
                  o ?? e3(t)
                    ? function (t, e, i, n) {
                        let s = (0, e2.useMemo)(() => {
                          let i = is();
                          return (
                            eA(i, e, eN(n), t.transformTemplate, t.style),
                            { ...i.attrs, style: { ...i.style } }
                          );
                        }, [e]);
                        if (t.style) {
                          let e = {};
                          ii(e, t.style, t), (s.style = { ...e, ...s.style });
                        }
                        return s;
                      }
                    : function (t, e) {
                        let i,
                          n,
                          s = {},
                          r =
                            ((i = t.style || {}),
                            ii((n = {}), i, t),
                            Object.assign(
                              n,
                              (function ({ transformTemplate: t }, e) {
                                return (0, e2.useMemo)(() => {
                                  let i = ie();
                                  return (
                                    eE(i, e, t),
                                    Object.assign({}, i.vars, i.style)
                                  );
                                }, [e]);
                              })(t, e)
                            ),
                            n);
                        return (
                          t.drag &&
                            !1 !== t.dragListener &&
                            ((s.draggable = !1),
                            (r.userSelect =
                              r.WebkitUserSelect =
                              r.WebkitTouchCallout =
                                "none"),
                            (r.touchAction =
                              !0 === t.drag
                                ? "none"
                                : `pan-${"x" === t.drag ? "y" : "x"}`)),
                          void 0 === t.tabIndex &&
                            (t.onTap || t.onTapStart || t.whileTap) &&
                            (s.tabIndex = 0),
                          (s.style = r),
                          s
                        );
                      }
                )(e, n, s, t),
                l = (function (t, e, i) {
                  let n = {};
                  for (let s in t)
                    ("values" !== s || "object" != typeof t.values) &&
                      (ia(s) ||
                        (!0 === i && io(s)) ||
                        (!e && !io(s)) ||
                        (t.draggable && s.startsWith("onDrag"))) &&
                      (n[s] = t[s]);
                  return n;
                })(e, "string" == typeof t, r),
                h = t !== e2.Fragment ? { ...l, ...a, ref: i } : {},
                { children: u } = e,
                c = (0, e2.useMemo)(() => (X(u) ? u.get() : u), [u]);
              return (0, e2.createElement)(t, { ...h, children: c });
            })(
              t,
              i,
              ((a = p.visualElement),
              (h = (0, e2.useRef)(n)),
              (0, e2.useInsertionEffect)(() => {
                h.current = n;
              }),
              (u = (0, e2.useRef)(null)),
              (0, e2.useCallback)(
                (t) => {
                  t && m.onMount?.(t);
                  let e = h.current;
                  if ("function" == typeof e)
                    if (t) {
                      let i = e(t);
                      "function" == typeof i && (u.current = i);
                    } else u.current ? (u.current(), (u.current = null)) : e(t);
                  else e && (e.current = t);
                  a && (t ? a.mount(t) : a.unmount());
                },
                [a]
              )),
              m,
              d,
              e,
              r
            ),
          ],
        });
      }
      a.displayName = `motion.${
        "string" == typeof t ? t : `create(${t.displayName ?? t.name ?? ""})`
      }`;
      let l = (0, e2.forwardRef)(a);
      return (l[iy] = t), l;
    }
    class iT {
      constructor(t) {
        (this.isMounted = !1), (this.node = t);
      }
      update() {}
    }
    function ik(t, e, i) {
      let n = t.getProps();
      return ev(n, e, void 0 !== i ? i : n.custom, t);
    }
    function iE(t, e) {
      if (t?.inherit && e) {
        let { inherit: i, ...n } = t;
        return { ...e, ...n };
      }
      return t;
    }
    function iP(t, e) {
      let i = t?.[e] ?? t?.default ?? t;
      return i !== t ? iE(i, t) : i;
    }
    let iC = (t) => Array.isArray(t);
    function iM(t, e) {
      let i = t.getValue("willChange");
      if (X(i) && i.add) return i.add(e);
      if (!i && tk.WillChange) {
        let i = new tk.WillChange("auto");
        t.addValue("willChange", i), i.add(e);
      }
    }
    let iA = (t, e) => (i) => e(t(i)),
      iL = (...t) => t.reduce(iA);
    function iN(t, e, i) {
      return (i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6)
        ? t + (e - t) * 6 * i
        : i < 0.5
        ? e
        : i < 2 / 3
        ? t + (e - t) * (2 / 3 - i) * 6
        : t;
    }
    function iV(t, e) {
      return (i) => (i > 0 ? e : t);
    }
    let iR = (t, e, i) => {
        let n = t * t,
          s = i * (e * e - n) + n;
        return s < 0 ? 0 : Math.sqrt(s);
      },
      iD = [y, v, E];
    function iF(t) {
      let e = iD.find((e) => e.test(t));
      if (
        (te(
          !!e,
          `'${t}' is not an animatable color. Use the equivalent color code instead.`,
          "color-not-animatable"
        ),
        !e)
      )
        return !1;
      let i = e.parse(t);
      return (
        e === E &&
          (i = (function ({ hue: t, saturation: e, lightness: i, alpha: n }) {
            (t /= 360), (i /= 100);
            let s = 0,
              r = 0,
              o = 0;
            if ((e /= 100)) {
              let n = i < 0.5 ? i * (1 + e) : i + e - i * e,
                a = 2 * i - n;
              (s = iN(a, n, t + 1 / 3)),
                (r = iN(a, n, t)),
                (o = iN(a, n, t - 1 / 3));
            } else s = r = o = i;
            return {
              red: Math.round(255 * s),
              green: Math.round(255 * r),
              blue: Math.round(255 * o),
              alpha: n,
            };
          })(i)),
        i
      );
    }
    let iI = (t, e) => {
        let i = iF(t),
          n = iF(e);
        if (!i || !n) return iV(t, e);
        let s = { ...i };
        return (t) => (
          (s.red = iR(i.red, n.red, t)),
          (s.green = iR(i.green, n.green, t)),
          (s.blue = iR(i.blue, n.blue, t)),
          (s.alpha = eF(i.alpha, n.alpha, t)),
          v.transform(s)
        );
      },
      iB = new Set(["none", "hidden"]);
    function iO(t, e) {
      return (i) => eF(t, e, i);
    }
    function iU(t) {
      return "number" == typeof t
        ? iO
        : "string" == typeof t
        ? to(t)
          ? iV
          : P.test(t)
          ? iI
          : iW
        : Array.isArray(t)
        ? iz
        : "object" == typeof t
        ? P.test(t)
          ? iI
          : i$
        : iV;
    }
    function iz(t, e) {
      let i = [...t],
        n = i.length,
        s = t.map((t, i) => iU(t)(t, e[i]));
      return (t) => {
        for (let e = 0; e < n; e++) i[e] = s[e](t);
        return i;
      };
    }
    function i$(t, e) {
      let i = { ...t, ...e },
        n = {};
      for (let s in i)
        void 0 !== t[s] && void 0 !== e[s] && (n[s] = iU(t[s])(t[s], e[s]));
      return (t) => {
        for (let e in n) i[e] = n[e](t);
        return i;
      };
    }
    let iW = (t, e) => {
      let i = R.createTransformer(e),
        n = N(t),
        s = N(e);
      if (
        !(
          n.indexes.var.length === s.indexes.var.length &&
          n.indexes.color.length === s.indexes.color.length &&
          n.indexes.number.length >= s.indexes.number.length
        )
      )
        return (
          te(
            !0,
            `Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`,
            "complex-values-different"
          ),
          iV(t, e)
        );
      if ((iB.has(t) && !s.values.length) || (iB.has(e) && !n.values.length))
        return iB.has(t) ? (i) => (i <= 0 ? t : e) : (i) => (i >= 1 ? e : t);
      return iL(
        iz(
          (function (t, e) {
            let i = [],
              n = { color: 0, var: 0, number: 0 };
            for (let s = 0; s < e.values.length; s++) {
              let r = e.types[s],
                o = t.indexes[r][n[r]],
                a = t.values[o] ?? 0;
              (i[s] = a), n[r]++;
            }
            return i;
          })(n, s),
          s.values
        ),
        i
      );
    };
    function i_(t, e, i) {
      return "number" == typeof t &&
        "number" == typeof e &&
        "number" == typeof i
        ? eF(t, e, i)
        : iU(t)(t, e);
    }
    let iH = (t) => {
      let e = ({ timestamp: e }) => t(e);
      return {
        start: (t = !0) => tC.update(e, t),
        stop: () => tM(e),
        now: () => (tA.isProcessing ? tA.timestamp : ei.now()),
      };
    };
    function iq(t) {
      let e = 0,
        i = t.next(e);
      for (; !i.done && e < 2e4; ) (e += 50), (i = t.next(e));
      return e >= 2e4 ? 1 / 0 : e;
    }
    let iY = 0.01,
      iX = 2,
      iK = 0.005,
      iG = 0.5;
    function iZ(t, e) {
      return t * Math.sqrt(1 - e * e);
    }
    let iJ = ["duration", "bounce"],
      iQ = ["stiffness", "damping", "mass"];
    function i0(t, e) {
      return e.some((e) => void 0 !== t[e]);
    }
    function i1(t = 0.3, e = 0.3) {
      let i,
        n,
        s,
        r,
        o,
        l,
        h =
          "object" != typeof t
            ? { visualDuration: t, keyframes: [0, 1], bounce: e }
            : t,
        { restSpeed: u, restDelta: c } = h,
        d = h.keyframes[0],
        p = h.keyframes[h.keyframes.length - 1],
        m = { done: !1, value: d },
        {
          stiffness: f,
          damping: g,
          mass: v,
          duration: y,
          velocity: x,
          isResolvedFromDuration: w,
        } = (function (t) {
          let e = {
            velocity: 0,
            stiffness: 100,
            damping: 10,
            mass: 1,
            isResolvedFromDuration: !1,
            ...t,
          };
          if (!i0(t, iQ) && i0(t, iJ))
            if (((e.velocity = 0), t.visualDuration)) {
              let i = (2 * Math.PI) / (1.2 * t.visualDuration),
                n = i * i,
                s = 2 * a(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(n);
              e = { ...e, mass: 1, stiffness: n, damping: s };
            } else {
              let i = (function ({
                duration: t = 800,
                bounce: e = 0.3,
                velocity: i = 0,
                mass: n = 1,
              }) {
                let s, r;
                te(
                  t <= tW(10),
                  "Spring duration must be 10 seconds or less",
                  "spring-duration-limit"
                );
                let o = 1 - e;
                (o = a(0.05, 1, o)),
                  (t = a(0.01, 10, t / 1e3)),
                  o < 1
                    ? ((s = (e) => {
                        let n = e * o,
                          s = n * t;
                        return 0.001 - ((n - i) / iZ(e, o)) * Math.exp(-s);
                      }),
                      (r = (e) => {
                        let n = e * o * t,
                          r = Math.pow(o, 2) * Math.pow(e, 2) * t,
                          a = Math.exp(-n),
                          l = iZ(Math.pow(e, 2), o);
                        return (
                          ((n * i + i - r) * a * (-s(e) + 0.001 > 0 ? -1 : 1)) /
                          l
                        );
                      }))
                    : ((s = (e) =>
                        -0.001 + Math.exp(-e * t) * ((e - i) * t + 1)),
                      (r = (e) => t * t * (i - e) * Math.exp(-e * t)));
                let l = (function (t, e, i) {
                  let n = i;
                  for (let i = 1; i < 12; i++) n -= t(n) / e(n);
                  return n;
                })(s, r, 5 / t);
                if (((t = tW(t)), isNaN(l)))
                  return { stiffness: 100, damping: 10, duration: t };
                {
                  let e = Math.pow(l, 2) * n;
                  return {
                    stiffness: e,
                    damping: 2 * o * Math.sqrt(n * e),
                    duration: t,
                  };
                }
              })({ ...t, velocity: 0 });
              (e = { ...e, ...i, mass: 1 }).isResolvedFromDuration = !0;
            }
          return e;
        })({ ...h, velocity: -((h.velocity || 0) / 1e3) }),
        b = x || 0,
        S = g / (2 * Math.sqrt(f * v)),
        j = p - d,
        T = Math.sqrt(f / v) / 1e3,
        k = 5 > Math.abs(j);
      if ((u || (u = k ? iY : iX), c || (c = k ? iK : iG), S < 1))
        (s = iZ(T, S)),
          (r = (b + S * T * j) / s),
          (i = (t) =>
            p -
            Math.exp(-S * T * t) * (r * Math.sin(s * t) + j * Math.cos(s * t))),
          (o = S * T * r + j * s),
          (l = S * T * j - r * s),
          (n = (t) =>
            Math.exp(-S * T * t) * (o * Math.sin(s * t) + l * Math.cos(s * t)));
      else if (1 === S) {
        i = (t) => p - Math.exp(-T * t) * (j + (b + T * j) * t);
        let t = b + T * j;
        n = (e) => Math.exp(-T * e) * (T * t * e - b);
      } else {
        let t = T * Math.sqrt(S * S - 1);
        i = (e) => {
          let i = Math.exp(-S * T * e),
            n = Math.min(t * e, 300);
          return (
            p -
            (i * ((b + S * T * j) * Math.sinh(n) + t * j * Math.cosh(n))) / t
          );
        };
        let e = (b + S * T * j) / t,
          s = S * T * e - j * t,
          r = S * T * j - e * t;
        n = (e) => {
          let i = Math.exp(-S * T * e),
            n = Math.min(t * e, 300);
          return i * (s * Math.sinh(n) + r * Math.cosh(n));
        };
      }
      let E = {
        calculatedDuration: (w && y) || null,
        velocity: (t) => tW(n(t)),
        next: (t) => {
          if (!w && S < 1) {
            let e = Math.exp(-S * T * t),
              i = Math.sin(s * t),
              n = Math.cos(s * t),
              a = p - e * (r * i + j * n);
            return (
              (m.done =
                Math.abs(tW(e * (o * i + l * n))) <= u && Math.abs(p - a) <= c),
              (m.value = m.done ? p : a),
              m
            );
          }
          let e = i(t);
          return (
            w
              ? (m.done = t >= y)
              : (m.done = Math.abs(tW(n(t))) <= u && Math.abs(p - e) <= c),
            (m.value = m.done ? p : e),
            m
          );
        },
        toString: () => {
          let t = Math.min(iq(E), 2e4),
            e = t3((e) => E.next(t * e).value, t, 30);
          return t + "ms " + e;
        },
        toTransition: () => {},
      };
      return E;
    }
    function i2(t, e, i) {
      var n, s;
      let r = Math.max(e - 5, 0);
      return (n = i - t(r)), (s = e - r) ? (1e3 / s) * n : 0;
    }
    function i5({
      keyframes: t,
      velocity: e = 0,
      power: i = 0.8,
      timeConstant: n = 325,
      bounceDamping: s = 10,
      bounceStiffness: r = 500,
      modifyTarget: o,
      min: a,
      max: l,
      restDelta: h = 0.5,
      restSpeed: u,
    }) {
      let c,
        d,
        p = t[0],
        m = { done: !1, value: p },
        f = i * e,
        g = p + f,
        v = void 0 === o ? g : o(g);
      v !== g && (f = v - p);
      let y = (t) => -f * Math.exp(-t / n),
        x = (t) => v + y(t),
        w = (t) => {
          let e = y(t),
            i = x(t);
          (m.done = Math.abs(e) <= h), (m.value = m.done ? v : i);
        },
        b = (t) => {
          let e;
          if (
            ((e = m.value), (void 0 !== a && e < a) || (void 0 !== l && e > l))
          ) {
            var i;
            (c = t),
              (d = i1({
                keyframes: [
                  m.value,
                  ((i = m.value),
                  void 0 === a
                    ? l
                    : void 0 === l || Math.abs(a - i) < Math.abs(l - i)
                    ? a
                    : l),
                ],
                velocity: i2(x, t, m.value),
                damping: s,
                stiffness: r,
                restDelta: h,
                restSpeed: u,
              }));
          }
        };
      return (
        b(0),
        {
          calculatedDuration: null,
          next: (t) => {
            let e = !1;
            return (d || void 0 !== c || ((e = !0), w(t), b(t)),
            void 0 !== c && t >= c)
              ? d.next(t - c)
              : (e || w(t), m);
          },
        }
      );
    }
    i1.applyToOptions = (t) => {
      let e = (function (t, e = 100, i) {
        let n = i({ ...t, keyframes: [0, e] }),
          s = Math.min(iq(n), 2e4);
        return {
          type: "keyframes",
          ease: (t) => n.next(s * t).value / e,
          duration: s / 1e3,
        };
      })(t, 100, i1);
      return (
        (t.ease = e.ease),
        (t.duration = tW(e.duration)),
        (t.type = "keyframes"),
        t
      );
    };
    let i3 = (t, e, i) =>
      (((1 - 3 * i + 3 * e) * t + (3 * i - 6 * e)) * t + 3 * e) * t;
    function i4(t, e, i, n) {
      return t === e && i === n
        ? tT
        : (s) =>
            0 === s || 1 === s
              ? s
              : i3(
                  (function (t, e, i, n, s) {
                    let r,
                      o,
                      a = 0;
                    do
                      (r = i3((o = e + (i - e) / 2), n, s) - t) > 0
                        ? (i = o)
                        : (e = o);
                    while (Math.abs(r) > 1e-7 && ++a < 12);
                    return o;
                  })(s, 0, 1, t, i),
                  e,
                  n
                );
    }
    let i6 = i4(0.42, 0, 1, 1),
      i8 = i4(0, 0, 0.58, 1),
      i7 = i4(0.42, 0, 0.58, 1),
      i9 = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2,
      nt = (t) => (e) => 1 - t(1 - e),
      ne = i4(0.33, 1.53, 0.69, 0.99),
      ni = nt(ne),
      nn = i9(ni),
      ns = (t) =>
        (t *= 2) < 1 ? 0.5 * ni(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))),
      nr = (t) => 1 - Math.sin(Math.acos(t)),
      no = nt(nr),
      na = i9(nr),
      nl = {
        linear: tT,
        easeIn: i6,
        easeInOut: i7,
        easeOut: i8,
        circIn: nr,
        circInOut: na,
        circOut: no,
        backIn: ni,
        backInOut: nn,
        backOut: ne,
        anticipate: ns,
      },
      nh = (t) => {
        if (t2(t)) {
          ti(
            4 === t.length,
            "Cubic bezier arrays must contain four numerical values.",
            "cubic-bezier-length"
          );
          let [e, i, n, s] = t;
          return i4(e, i, n, s);
        }
        return "string" == typeof t
          ? (ti(
              void 0 !== nl[t],
              `Invalid easing type '${t}'`,
              "invalid-easing-type"
            ),
            nl[t])
          : t;
      },
      nu = (t, e, i) => {
        let n = e - t;
        return 0 === n ? 1 : (i - t) / n;
      };
    function nc({
      duration: t = 300,
      keyframes: e,
      times: i,
      ease: n = "easeInOut",
    }) {
      var s;
      let r,
        o = Array.isArray(n) && "number" != typeof n[0] ? n.map(nh) : nh(n),
        l = { done: !1, value: e[0] },
        h = (function (t, e, { clamp: i = !0, ease: n, mixer: s } = {}) {
          let r = t.length;
          if (
            (ti(
              r === e.length,
              "Both input and output ranges must be the same length",
              "range-length"
            ),
            1 === r)
          )
            return () => e[0];
          if (2 === r && e[0] === e[1]) return () => e[1];
          let o = t[0] === t[1];
          t[0] > t[r - 1] && ((t = [...t].reverse()), (e = [...e].reverse()));
          let l = (function (t, e, i) {
              let n = [],
                s = i || tk.mix || i_,
                r = t.length - 1;
              for (let i = 0; i < r; i++) {
                let r = s(t[i], t[i + 1]);
                e && (r = iL(Array.isArray(e) ? e[i] || tT : e, r)), n.push(r);
              }
              return n;
            })(e, n, s),
            h = l.length,
            u = (i) => {
              if (o && i < t[0]) return e[0];
              let n = 0;
              if (h > 1) for (; n < t.length - 2 && !(i < t[n + 1]); n++);
              let s = nu(t[n], t[n + 1], i);
              return l[n](s);
            };
          return i ? (e) => u(a(t[0], t[r - 1], e)) : u;
        })(
          ((s =
            i && i.length === e.length
              ? i
              : (!(function (t, e) {
                  let i = t[t.length - 1];
                  for (let n = 1; n <= e; n++) {
                    let s = nu(0, e, n);
                    t.push(eF(i, 1, s));
                  }
                })((r = [0]), e.length - 1),
                r)),
          s.map((e) => e * t)),
          e,
          {
            ease: Array.isArray(o)
              ? o
              : e.map(() => o || i7).splice(0, e.length - 1),
          }
        );
      return {
        calculatedDuration: t,
        next: (e) => ((l.value = h(e)), (l.done = e >= t), l),
      };
    }
    let nd = { decay: i5, inertia: i5, tween: nc, keyframes: nc, spring: i1 };
    function np(t) {
      "string" == typeof t.type && (t.type = nd[t.type]);
    }
    let nm = (t) => t / 100;
    class nf extends t0 {
      constructor(t) {
        super(),
          (this.state = "idle"),
          (this.startTime = null),
          (this.isStopped = !1),
          (this.currentTime = 0),
          (this.holdTime = null),
          (this.playbackSpeed = 1),
          (this.stop = () => {
            let { motionValue: t } = this.options;
            t && t.updatedAt !== ei.now() && this.tick(ei.now()),
              (this.isStopped = !0),
              "idle" !== this.state &&
                (this.teardown(), this.options.onStop?.());
          }),
          t1.mainThread++,
          (this.options = t),
          this.initAnimation(),
          this.play(),
          !1 === t.autoplay && this.pause();
      }
      initAnimation() {
        let { options: t } = this;
        np(t);
        let {
            type: e = nc,
            repeat: i = 0,
            repeatDelay: n = 0,
            repeatType: s,
            velocity: r = 0,
          } = t,
          { keyframes: o } = t,
          a = e || nc;
        a !== nc &&
          "number" != typeof o[0] &&
          ((this.mixKeyframes = iL(nm, i_(o[0], o[1]))), (o = [0, 100]));
        let l = a({ ...t, keyframes: o });
        "mirror" === s &&
          (this.mirroredGenerator = a({
            ...t,
            keyframes: [...o].reverse(),
            velocity: -r,
          })),
          null === l.calculatedDuration && (l.calculatedDuration = iq(l));
        let { calculatedDuration: h } = l;
        (this.calculatedDuration = h),
          (this.resolvedDuration = h + n),
          (this.totalDuration = this.resolvedDuration * (i + 1) - n),
          (this.generator = l);
      }
      updateTime(t) {
        let e = Math.round(t - this.startTime) * this.playbackSpeed;
        null !== this.holdTime
          ? (this.currentTime = this.holdTime)
          : (this.currentTime = e);
      }
      tick(t, e = !1) {
        let {
          generator: i,
          totalDuration: n,
          mixKeyframes: s,
          mirroredGenerator: r,
          resolvedDuration: o,
          calculatedDuration: l,
        } = this;
        if (null === this.startTime) return i.next(0);
        let {
          delay: h = 0,
          keyframes: u,
          repeat: c,
          repeatType: d,
          repeatDelay: p,
          type: m,
          onUpdate: f,
          finalKeyframe: g,
        } = this.options;
        this.speed > 0
          ? (this.startTime = Math.min(this.startTime, t))
          : this.speed < 0 &&
            (this.startTime = Math.min(t - n / this.speed, this.startTime)),
          e ? (this.currentTime = t) : this.updateTime(t);
        let v = this.currentTime - h * (this.playbackSpeed >= 0 ? 1 : -1),
          y = this.playbackSpeed >= 0 ? v < 0 : v > n;
        (this.currentTime = Math.max(v, 0)),
          "finished" === this.state &&
            null === this.holdTime &&
            (this.currentTime = n);
        let x = this.currentTime,
          w = i;
        if (c) {
          let t = Math.min(this.currentTime, n) / o,
            e = Math.floor(t),
            i = t % 1;
          !i && t >= 1 && (i = 1),
            1 === i && e--,
            (e = Math.min(e, c + 1)) % 2 &&
              ("reverse" === d
                ? ((i = 1 - i), p && (i -= p / o))
                : "mirror" === d && (w = r)),
            (x = a(0, 1, i) * o);
        }
        let b = y ? { done: !1, value: u[0] } : w.next(x);
        s && !y && (b.value = s(b.value));
        let { done: S } = b;
        y ||
          null === l ||
          (S =
            this.playbackSpeed >= 0
              ? this.currentTime >= n
              : this.currentTime <= 0);
        let j =
          null === this.holdTime &&
          ("finished" === this.state || ("running" === this.state && S));
        return (
          j && m !== i5 && (b.value = tQ(u, this.options, g, this.speed)),
          f && f(b.value),
          j && this.finish(),
          b
        );
      }
      then(t, e) {
        return this.finished.then(t, e);
      }
      get duration() {
        return this.calculatedDuration / 1e3;
      }
      get iterationDuration() {
        let { delay: t = 0 } = this.options || {};
        return this.duration + t / 1e3;
      }
      get time() {
        return this.currentTime / 1e3;
      }
      set time(t) {
        (t = tW(t)),
          (this.currentTime = t),
          null === this.startTime ||
          null !== this.holdTime ||
          0 === this.playbackSpeed
            ? (this.holdTime = t)
            : this.driver &&
              (this.startTime = this.driver.now() - t / this.playbackSpeed),
          this.driver
            ? this.driver.start(!1)
            : ((this.startTime = 0),
              (this.state = "paused"),
              (this.holdTime = t),
              this.tick(t));
      }
      getGeneratorVelocity() {
        let t = this.currentTime;
        if (t <= 0) return this.options.velocity || 0;
        if (this.generator.velocity) return this.generator.velocity(t);
        let e = this.generator.next(t).value;
        return i2((t) => this.generator.next(t).value, t, e);
      }
      get speed() {
        return this.playbackSpeed;
      }
      set speed(t) {
        let e = this.playbackSpeed !== t;
        e && this.driver && this.updateTime(ei.now()),
          (this.playbackSpeed = t),
          e && this.driver && (this.time = this.currentTime / 1e3);
      }
      play() {
        if (this.isStopped) return;
        let { driver: t = iH, startTime: e } = this.options;
        this.driver || (this.driver = t((t) => this.tick(t))),
          this.options.onPlay?.();
        let i = this.driver.now();
        "finished" === this.state
          ? (this.updateFinished(), (this.startTime = i))
          : null !== this.holdTime
          ? (this.startTime = i - this.holdTime)
          : this.startTime || (this.startTime = e ?? i),
          "finished" === this.state &&
            this.speed < 0 &&
            (this.startTime += this.calculatedDuration),
          (this.holdTime = null),
          (this.state = "running"),
          this.driver.start();
      }
      pause() {
        (this.state = "paused"),
          this.updateTime(ei.now()),
          (this.holdTime = this.currentTime);
      }
      complete() {
        "running" !== this.state && this.play(),
          (this.state = "finished"),
          (this.holdTime = null);
      }
      finish() {
        this.notifyFinished(),
          this.teardown(),
          (this.state = "finished"),
          this.options.onComplete?.();
      }
      cancel() {
        (this.holdTime = null),
          (this.startTime = 0),
          this.tick(0),
          this.teardown(),
          this.options.onCancel?.();
      }
      teardown() {
        (this.state = "idle"),
          this.stopDriver(),
          (this.startTime = this.holdTime = null),
          t1.mainThread--;
      }
      stopDriver() {
        this.driver && (this.driver.stop(), (this.driver = void 0));
      }
      sample(t) {
        return (this.startTime = 0), this.tick(t, !0);
      }
      attachTimeline(t) {
        return (
          this.options.allowFlatten &&
            ((this.options.type = "keyframes"),
            (this.options.ease = "linear"),
            this.initAnimation()),
          this.driver?.stop(),
          t.observe(this)
        );
      }
    }
    let ng = { anticipate: ns, backInOut: nn, circInOut: na };
    class nv extends t7 {
      constructor(t) {
        !(function (t) {
          "string" == typeof t.ease && t.ease in ng && (t.ease = ng[t.ease]);
        })(t),
          np(t),
          super(t),
          void 0 !== t.startTime &&
            !1 !== t.autoplay &&
            (this.startTime = t.startTime),
          (this.options = t);
      }
      updateMotionValue(t) {
        let {
          motionValue: e,
          onUpdate: i,
          onComplete: n,
          element: s,
          ...r
        } = this.options;
        if (!e) return;
        if (void 0 !== t) return void e.set(t);
        let o = new nf({ ...r, autoplay: !1 }),
          l = Math.max(10, ei.now() - this.startTime),
          h = a(0, 10, l - 10),
          u = o.sample(l).value,
          { name: c } = this.options;
        s && c && tY(s, c, u),
          e.setWithVelocity(o.sample(Math.max(0, l - h)).value, u, h),
          o.stop();
      }
    }
    let ny = (t, e) =>
      "zIndex" !== e &&
      !!(
        "number" == typeof t ||
        Array.isArray(t) ||
        ("string" == typeof t &&
          (R.test(t) || "0" === t) &&
          !t.startsWith("url("))
      );
    function nx(t) {
      (t.duration = 0), (t.type = "keyframes");
    }
    let nw = new Set(["opacity", "clipPath", "filter", "transform"]),
      nb = tX(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
    class nS extends t0 {
      constructor({
        autoplay: t = !0,
        delay: e = 0,
        type: i = "keyframes",
        repeat: n = 0,
        repeatDelay: s = 0,
        repeatType: r = "loop",
        keyframes: o,
        name: a,
        motionValue: l,
        element: h,
        ...u
      }) {
        super(),
          (this.stop = () => {
            this._animation && (this._animation.stop(), this.stopTimeline?.()),
              this.keyframeResolver?.cancel();
          }),
          (this.createdAt = ei.now());
        const c = {
            autoplay: t,
            delay: e,
            type: i,
            repeat: n,
            repeatDelay: s,
            repeatType: r,
            name: a,
            motionValue: l,
            element: h,
            ...u,
          },
          d = h?.KeyframeResolver || tB;
        (this.keyframeResolver = new d(
          o,
          (t, e, i) => this.onKeyframesResolved(t, e, c, !i),
          a,
          l,
          h
        )),
          this.keyframeResolver?.scheduleResolve();
      }
      onKeyframesResolved(t, e, i, n) {
        this.keyframeResolver = void 0;
        let {
          name: s,
          type: r,
          velocity: o,
          delay: a,
          isHandoff: l,
          onUpdate: h,
        } = i;
        (this.resolvedAt = ei.now()),
          !(function (t, e, i, n) {
            let s = t[0];
            if (null === s) return !1;
            if ("display" === e || "visibility" === e) return !0;
            let r = t[t.length - 1],
              o = ny(s, e),
              a = ny(r, e);
            return (
              te(
                o === a,
                `You are trying to animate ${e} from "${s}" to "${r}". "${
                  o ? r : s
                }" is not an animatable value.`,
                "value-not-animatable"
              ),
              !!o &&
                !!a &&
                ((function (t) {
                  let e = t[0];
                  if (1 === t.length) return !0;
                  for (let i = 0; i < t.length; i++) if (t[i] !== e) return !0;
                })(t) ||
                  (("spring" === i || t8(i)) && n))
            );
          })(t, s, r, o) &&
            ((tk.instantAnimations || !a) && h?.(tQ(t, i, e)),
            (t[0] = t[t.length - 1]),
            nx(i),
            (i.repeat = 0));
        let u = {
            startTime: n
              ? this.resolvedAt && this.resolvedAt - this.createdAt > 40
                ? this.resolvedAt
                : this.createdAt
              : void 0,
            finalKeyframe: e,
            ...i,
            keyframes: t,
          },
          c =
            !l &&
            (function (t) {
              let {
                motionValue: e,
                name: i,
                repeatDelay: n,
                repeatType: s,
                damping: r,
                type: o,
              } = t;
              if (!(e?.owner?.current instanceof HTMLElement)) return !1;
              let { onUpdate: a, transformTemplate: l } = e.owner.getProps();
              return (
                nb() &&
                i &&
                nw.has(i) &&
                ("transform" !== i || !l) &&
                !a &&
                !n &&
                "mirror" !== s &&
                0 !== r &&
                "inertia" !== o
              );
            })(u),
          d = u.motionValue?.owner?.current,
          p = c ? new nv({ ...u, element: d }) : new nf(u);
        p.finished
          .then(() => {
            this.notifyFinished();
          })
          .catch(tT),
          this.pendingTimeline &&
            ((this.stopTimeline = p.attachTimeline(this.pendingTimeline)),
            (this.pendingTimeline = void 0)),
          (this._animation = p);
      }
      get finished() {
        return this._animation ? this.animation.finished : this._finished;
      }
      then(t, e) {
        return this.finished.finally(t).then(() => {});
      }
      get animation() {
        return (
          this._animation ||
            (this.keyframeResolver?.resume(), (tD = !0), tI(), tF(), (tD = !1)),
          this._animation
        );
      }
      get duration() {
        return this.animation.duration;
      }
      get iterationDuration() {
        return this.animation.iterationDuration;
      }
      get time() {
        return this.animation.time;
      }
      set time(t) {
        this.animation.time = t;
      }
      get speed() {
        return this.animation.speed;
      }
      get state() {
        return this.animation.state;
      }
      set speed(t) {
        this.animation.speed = t;
      }
      get startTime() {
        return this.animation.startTime;
      }
      attachTimeline(t) {
        return (
          this._animation
            ? (this.stopTimeline = this.animation.attachTimeline(t))
            : (this.pendingTimeline = t),
          () => this.stop()
        );
      }
      play() {
        this.animation.play();
      }
      pause() {
        this.animation.pause();
      }
      complete() {
        this.animation.complete();
      }
      cancel() {
        this._animation && this.animation.cancel(),
          this.keyframeResolver?.cancel();
      }
    }
    let nj = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
      nT = { type: "keyframes", duration: 0.8 },
      nk = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
      nE = (t) => null !== t,
      nP =
        (t, e, i, n = {}, s, r) =>
        (a) => {
          let l = iP(n, t) || {},
            h = l.delay || n.delay || 0,
            { elapsed: u = 0 } = n;
          u -= tW(h);
          let c = {
            keyframes: Array.isArray(i) ? i : [null, i],
            ease: "easeOut",
            velocity: e.getVelocity(),
            ...l,
            delay: -u,
            onUpdate: (t) => {
              e.set(t), l.onUpdate && l.onUpdate(t);
            },
            onComplete: () => {
              a(), l.onComplete && l.onComplete();
            },
            name: t,
            motionValue: e,
            element: r ? void 0 : s,
          };
          !(function ({
            when: t,
            delay: e,
            delayChildren: i,
            staggerChildren: n,
            staggerDirection: s,
            repeat: r,
            repeatType: o,
            repeatDelay: a,
            from: l,
            elapsed: h,
            ...u
          }) {
            return !!Object.keys(u).length;
          })(l) &&
            Object.assign(
              c,
              ((t, { keyframes: e }) =>
                e.length > 2
                  ? nT
                  : o.has(t)
                  ? t.startsWith("scale")
                    ? {
                        type: "spring",
                        stiffness: 550,
                        damping: 0 === e[1] ? 2 * Math.sqrt(550) : 30,
                        restSpeed: 10,
                      }
                    : nj
                  : nk)(t, c)
            ),
            c.duration && (c.duration = tW(c.duration)),
            c.repeatDelay && (c.repeatDelay = tW(c.repeatDelay)),
            void 0 !== c.from && (c.keyframes[0] = c.from);
          let d = !1;
          if (
            ((!1 !== c.type && (0 !== c.duration || c.repeatDelay)) ||
              (nx(c), 0 === c.delay && (d = !0)),
            (tk.instantAnimations ||
              tk.skipAnimations ||
              s?.shouldSkipAnimations) &&
              ((d = !0), nx(c), (c.delay = 0)),
            (c.allowFlatten = !l.type && !l.ease),
            d && !r && void 0 !== e.get())
          ) {
            let t = (function (t, { repeat: e, repeatType: i = "loop" }, n) {
              let s = t.filter(nE),
                r = e && "loop" !== i && e % 2 == 1 ? 0 : s.length - 1;
              return s[r];
            })(c.keyframes, l);
            if (void 0 !== t)
              return void tC.update(() => {
                c.onUpdate(t), c.onComplete();
              });
          }
          return l.isSync ? new nf(c) : new nS(c);
        };
    function nC(t, e, { delay: i = 0, transitionOverride: n, type: s } = {}) {
      let { transition: r, transitionEnd: o, ...a } = e,
        l = t.getDefaultTransition();
      r = r ? iE(r, l) : l;
      let h = r?.reduceMotion;
      n && (r = n);
      let u = [],
        c = s && t.animationState && t.animationState.getState()[s];
      for (let e in a) {
        let n = t.getValue(e, t.latestValues[e] ?? null),
          s = a[e];
        if (
          void 0 === s ||
          (c &&
            (function ({ protectedKeys: t, needsAnimating: e }, i) {
              let n = t.hasOwnProperty(i) && !0 !== e[i];
              return (e[i] = !1), n;
            })(c, e))
        )
          continue;
        let o = { delay: i, ...iP(r || {}, e) },
          l = n.get();
        if (
          void 0 !== l &&
          !n.isAnimating &&
          !Array.isArray(s) &&
          s === l &&
          !o.velocity
        )
          continue;
        let d = !1;
        if (window.MotionHandoffAnimation) {
          let i = t.props[ix];
          if (i) {
            let t = window.MotionHandoffAnimation(i, e, tC);
            null !== t && ((o.startTime = t), (d = !0));
          }
        }
        iM(t, e);
        let p = h ?? t.shouldReduceMotion;
        n.start(nP(e, n, s, p && K.has(e) ? { type: !1 } : o, t, d));
        let m = n.animation;
        m && u.push(m);
      }
      if (o) {
        let e = () =>
          tC.update(() => {
            o &&
              (function (t, e) {
                let {
                  transitionEnd: i = {},
                  transition: n = {},
                  ...s
                } = ik(t, e) || {};
                for (let e in (s = { ...s, ...i })) {
                  var r;
                  let i = iC((r = s[e])) ? r[r.length - 1] || 0 : r;
                  t.hasValue(e) ? t.getValue(e).set(i) : t.addValue(e, es(i));
                }
              })(t, o);
          });
        u.length ? Promise.all(u).then(e) : e();
      }
      return u;
    }
    function nM(t, e, i, n = 0, s = 1) {
      let r = Array.from(t)
          .sort((t, e) => t.sortNodePosition(e))
          .indexOf(e),
        o = t.size,
        a = (o - 1) * n;
      return "function" == typeof i ? i(r, o) : 1 === s ? r * n : a - r * n;
    }
    function nA(t, e, i = {}) {
      let n = ik(t, e, "exit" === i.type ? t.presenceContext?.custom : void 0),
        { transition: s = t.getDefaultTransition() || {} } = n || {};
      i.transitionOverride && (s = i.transitionOverride);
      let r = n ? () => Promise.all(nC(t, n, i)) : () => Promise.resolve(),
        o =
          t.variantChildren && t.variantChildren.size
            ? (n = 0) => {
                let {
                  delayChildren: r = 0,
                  staggerChildren: o,
                  staggerDirection: a,
                } = s;
                return (function (t, e, i = 0, n = 0, s = 0, r = 1, o) {
                  let a = [];
                  for (let l of t.variantChildren)
                    l.notify("AnimationStart", e),
                      a.push(
                        nA(l, e, {
                          ...o,
                          delay:
                            i +
                            ("function" == typeof n ? 0 : n) +
                            nM(t.variantChildren, l, n, s, r),
                        }).then(() => l.notify("AnimationComplete", e))
                      );
                  return Promise.all(a);
                })(t, e, n, r, o, a, i);
              }
            : () => Promise.resolve(),
        { when: a } = s;
      if (!a) return Promise.all([r(), o(i.delay)]);
      {
        let [t, e] = "beforeChildren" === a ? [r, o] : [o, r];
        return t().then(() => e());
      }
    }
    let nL = eu.length;
    function nN(t, e) {
      if (!Array.isArray(e)) return !1;
      let i = e.length;
      if (i !== t.length) return !1;
      for (let n = 0; n < i; n++) if (e[n] !== t[n]) return !1;
      return !0;
    }
    let nV = [...eh].reverse(),
      nR = eh.length;
    function nD(t = !1) {
      return {
        isActive: t,
        protectedKeys: {},
        needsAnimating: {},
        prevResolvedValues: {},
      };
    }
    function nF() {
      return {
        animate: nD(!0),
        whileInView: nD(),
        whileHover: nD(),
        whileTap: nD(),
        whileDrag: nD(),
        whileFocus: nD(),
        exit: nD(),
      };
    }
    let nI = 0;
    function nB(t) {
      return [t("x"), t("y")];
    }
    function nO(t, e, i, n = { passive: !0 }) {
      return t.addEventListener(e, i, n), () => t.removeEventListener(e, i);
    }
    let nU = { x: !1, y: !1 };
    function nz(t) {
      return t.max - t.min;
    }
    function n$(t, e, i, n = 0.5) {
      (t.origin = n),
        (t.originPoint = eF(e.min, e.max, t.origin)),
        (t.scale = nz(i) / nz(e)),
        (t.translate = eF(i.min, i.max, t.origin) - t.originPoint),
        ((t.scale >= 0.9999 && t.scale <= 1.0001) || isNaN(t.scale)) &&
          (t.scale = 1),
        ((t.translate >= -0.01 && t.translate <= 0.01) || isNaN(t.translate)) &&
          (t.translate = 0);
    }
    function nW(t, e, i, n) {
      n$(t.x, e.x, i.x, n ? n.originX : void 0),
        n$(t.y, e.y, i.y, n ? n.originY : void 0);
    }
    function n_(t, e, i) {
      (t.min = i.min + e.min), (t.max = t.min + nz(e));
    }
    function nH(t, e, i) {
      (t.min = e.min - i.min), (t.max = t.min + nz(e));
    }
    function nq(t, e, i) {
      nH(t.x, e.x, i.x), nH(t.y, e.y, i.y);
    }
    function nY(t) {
      return "object" == typeof t && null !== t;
    }
    function nX(t) {
      return nY(t) && "ownerSVGElement" in t;
    }
    function nK(t, e, i) {
      if (null == t) return [];
      if (t instanceof EventTarget) return [t];
      if ("string" == typeof t) {
        let n = document;
        e && (n = e.current);
        let s = i?.[t] ?? n.querySelectorAll(t);
        return s ? Array.from(s) : [];
      }
      return Array.from(t).filter((t) => null != t);
    }
    let nG = new WeakMap(),
      nZ = (t, e, i) => (n, s) =>
        s && s[0]
          ? s[0][t + "Size"]
          : nX(n) && "getBBox" in n
          ? n.getBBox()[e]
          : n[i],
      nJ = nZ("inline", "width", "offsetWidth"),
      nQ = nZ("block", "height", "offsetHeight");
    function n0({ target: t, borderBoxSize: e }) {
      nG.get(t)?.forEach((i) => {
        i(t, {
          get width() {
            return nJ(t, e);
          },
          get height() {
            return nQ(t, e);
          },
        });
      });
    }
    function n1(t) {
      t.forEach(n0);
    }
    let n2 = new Set();
    function n5(t, e) {
      let i;
      return "function" == typeof t
        ? (n2.add(t),
          s ||
            ((s = () => {
              let t = {
                get width() {
                  return window.innerWidth;
                },
                get height() {
                  return window.innerHeight;
                },
              };
              n2.forEach((e) => e(t));
            }),
            window.addEventListener("resize", s)),
          () => {
            n2.delete(t),
              n2.size ||
                "function" != typeof s ||
                (window.removeEventListener("resize", s), (s = void 0));
          })
        : (n ||
            ("undefined" != typeof ResizeObserver &&
              (n = new ResizeObserver(n1))),
          (i = nK(t)).forEach((t) => {
            let i = nG.get(t);
            i || ((i = new Set()), nG.set(t, i)), i.add(e), n?.observe(t);
          }),
          () => {
            i.forEach((t) => {
              let i = nG.get(t);
              i?.delete(e), i?.size || n?.unobserve(t);
            });
          });
    }
    let n3 = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]),
      n4 = new Set(["INPUT", "SELECT", "TEXTAREA"]),
      n6 = (t) =>
        "mouse" === t.pointerType
          ? "number" != typeof t.button || t.button <= 0
          : !1 !== t.isPrimary;
    function n8(t) {
      return { point: { x: t.pageX, y: t.pageY } };
    }
    function n7(t, e, i, n) {
      return nO(t, e, (t) => n6(t) && i(t, n8(t)), n);
    }
    let n9 = ({ current: t }) => (t ? t.ownerDocument.defaultView : null),
      st = (t, e) => Math.abs(t - e),
      se = new Set(["auto", "scroll"]);
    class si {
      constructor(
        t,
        e,
        {
          transformPagePoint: i,
          contextWindow: n = window,
          dragSnapToOrigin: s = !1,
          distanceThreshold: r = 3,
          element: o,
        } = {}
      ) {
        if (
          ((this.startEvent = null),
          (this.lastMoveEvent = null),
          (this.lastMoveEventInfo = null),
          (this.lastRawMoveEventInfo = null),
          (this.handlers = {}),
          (this.contextWindow = window),
          (this.scrollPositions = new Map()),
          (this.removeScrollListeners = null),
          (this.onElementScroll = (t) => {
            this.handleScroll(t.target);
          }),
          (this.onWindowScroll = () => {
            this.handleScroll(window);
          }),
          (this.updatePoint = () => {
            var t, e;
            if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
            this.lastRawMoveEventInfo &&
              (this.lastMoveEventInfo = sn(
                this.lastRawMoveEventInfo,
                this.transformPagePoint
              ));
            let i = sr(this.lastMoveEventInfo, this.history),
              n = null !== this.startEvent,
              s =
                ((t = i.offset),
                (e = { x: 0, y: 0 }),
                Math.sqrt(st(t.x, e.x) ** 2 + st(t.y, e.y) ** 2) >=
                  this.distanceThreshold);
            if (!n && !s) return;
            let { point: r } = i,
              { timestamp: o } = tA;
            this.history.push({ ...r, timestamp: o });
            let { onStart: a, onMove: l } = this.handlers;
            n ||
              (a && a(this.lastMoveEvent, i),
              (this.startEvent = this.lastMoveEvent)),
              l && l(this.lastMoveEvent, i);
          }),
          (this.handlePointerMove = (t, e) => {
            (this.lastMoveEvent = t),
              (this.lastRawMoveEventInfo = e),
              (this.lastMoveEventInfo = sn(e, this.transformPagePoint)),
              tC.update(this.updatePoint, !0);
          }),
          (this.handlePointerUp = (t, e) => {
            this.end();
            let {
              onEnd: i,
              onSessionEnd: n,
              resumeAnimation: s,
            } = this.handlers;
            if (
              ((this.dragSnapToOrigin || !this.startEvent) && s && s(),
              !(this.lastMoveEvent && this.lastMoveEventInfo))
            )
              return;
            let r = sr(
              "pointercancel" === t.type
                ? this.lastMoveEventInfo
                : sn(e, this.transformPagePoint),
              this.history
            );
            this.startEvent && i && i(t, r), n && n(t, r);
          }),
          !n6(t))
        )
          return;
        (this.dragSnapToOrigin = s),
          (this.handlers = e),
          (this.transformPagePoint = i),
          (this.distanceThreshold = r),
          (this.contextWindow = n || window);
        const a = sn(n8(t), this.transformPagePoint),
          { point: l } = a,
          { timestamp: h } = tA;
        this.history = [{ ...l, timestamp: h }];
        const { onSessionStart: u } = e;
        u && u(t, sr(a, this.history)),
          (this.removeListeners = iL(
            n7(this.contextWindow, "pointermove", this.handlePointerMove),
            n7(this.contextWindow, "pointerup", this.handlePointerUp),
            n7(this.contextWindow, "pointercancel", this.handlePointerUp)
          )),
          o && this.startScrollTracking(o);
      }
      startScrollTracking(t) {
        let e = t.parentElement;
        for (; e; ) {
          let t = getComputedStyle(e);
          (se.has(t.overflowX) || se.has(t.overflowY)) &&
            this.scrollPositions.set(e, { x: e.scrollLeft, y: e.scrollTop }),
            (e = e.parentElement);
        }
        this.scrollPositions.set(window, {
          x: window.scrollX,
          y: window.scrollY,
        }),
          window.addEventListener("scroll", this.onElementScroll, {
            capture: !0,
          }),
          window.addEventListener("scroll", this.onWindowScroll),
          (this.removeScrollListeners = () => {
            window.removeEventListener("scroll", this.onElementScroll, {
              capture: !0,
            }),
              window.removeEventListener("scroll", this.onWindowScroll);
          });
      }
      handleScroll(t) {
        let e = this.scrollPositions.get(t);
        if (!e) return;
        let i = t === window,
          n = i
            ? { x: window.scrollX, y: window.scrollY }
            : { x: t.scrollLeft, y: t.scrollTop },
          s = { x: n.x - e.x, y: n.y - e.y };
        (0 !== s.x || 0 !== s.y) &&
          (i
            ? this.lastMoveEventInfo &&
              ((this.lastMoveEventInfo.point.x += s.x),
              (this.lastMoveEventInfo.point.y += s.y))
            : this.history.length > 0 &&
              ((this.history[0].x -= s.x), (this.history[0].y -= s.y)),
          this.scrollPositions.set(t, n),
          tC.update(this.updatePoint, !0));
      }
      updateHandlers(t) {
        this.handlers = t;
      }
      end() {
        this.removeListeners && this.removeListeners(),
          this.removeScrollListeners && this.removeScrollListeners(),
          this.scrollPositions.clear(),
          tM(this.updatePoint);
      }
    }
    function sn(t, e) {
      return e ? { point: e(t.point) } : t;
    }
    function ss(t, e) {
      return { x: t.x - e.x, y: t.y - e.y };
    }
    function sr({ point: t }, e) {
      return {
        point: t,
        delta: ss(t, so(e)),
        offset: ss(t, e[0]),
        velocity: (function (t, e) {
          if (t.length < 2) return { x: 0, y: 0 };
          let i = t.length - 1,
            n = null,
            s = so(t);
          for (
            ;
            i >= 0 && ((n = t[i]), !(s.timestamp - n.timestamp > tW(0.1)));

          )
            i--;
          if (!n) return { x: 0, y: 0 };
          n === t[0] &&
            t.length > 2 &&
            s.timestamp - n.timestamp > 2 * tW(0.1) &&
            (n = t[1]);
          let r = (s.timestamp - n.timestamp) / 1e3;
          if (0 === r) return { x: 0, y: 0 };
          let o = { x: (s.x - n.x) / r, y: (s.y - n.y) / r };
          return o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o;
        })(e, 0.1),
      };
    }
    function so(t) {
      return t[t.length - 1];
    }
    function sa(t, e, i) {
      return {
        min: void 0 !== e ? t.min + e : void 0,
        max: void 0 !== i ? t.max + i - (t.max - t.min) : void 0,
      };
    }
    function sl(t, e) {
      let i = e.min - t.min,
        n = e.max - t.max;
      return (
        e.max - e.min < t.max - t.min && ([i, n] = [n, i]), { min: i, max: n }
      );
    }
    function sh(t, e, i) {
      return { min: su(t, e), max: su(t, i) };
    }
    function su(t, e) {
      return "number" == typeof t ? t : t[e] || 0;
    }
    let sc = new WeakMap();
    class sd {
      constructor(t) {
        (this.openDragLock = null),
          (this.isDragging = !1),
          (this.currentDirection = null),
          (this.originPoint = { x: 0, y: 0 }),
          (this.constraints = !1),
          (this.hasMutatedConstraints = !1),
          (this.elastic = Y()),
          (this.latestPointerEvent = null),
          (this.latestPanInfo = null),
          (this.visualElement = t);
      }
      start(t, { snapToCursor: e = !1, distanceThreshold: i } = {}) {
        let { presenceContext: n } = this.visualElement;
        if (n && !1 === n.isPresent) return;
        let s = (t) => {
            e && this.snapToCursor(n8(t).point), this.stopAnimation();
          },
          r = (t, e) => {
            let {
              drag: i,
              dragPropagation: n,
              onDragStart: s,
            } = this.getProps();
            if (
              i &&
              !n &&
              (this.openDragLock && this.openDragLock(),
              (this.openDragLock = (function (t) {
                if ("x" === t || "y" === t)
                  if (nU[t]) return null;
                  else
                    return (
                      (nU[t] = !0),
                      () => {
                        nU[t] = !1;
                      }
                    );
                return nU.x || nU.y
                  ? null
                  : ((nU.x = nU.y = !0),
                    () => {
                      nU.x = nU.y = !1;
                    });
              })(i)),
              !this.openDragLock)
            )
              return;
            (this.latestPointerEvent = t),
              (this.latestPanInfo = e),
              (this.isDragging = !0),
              (this.currentDirection = null),
              this.resolveConstraints(),
              this.visualElement.projection &&
                ((this.visualElement.projection.isAnimationBlocked = !0),
                (this.visualElement.projection.target = void 0)),
              nB((t) => {
                let e = this.getAxisMotionValue(t).get() || 0;
                if (b.test(e)) {
                  let { projection: i } = this.visualElement;
                  if (i && i.layout) {
                    let n = i.layout.layoutBox[t];
                    n && (e = nz(n) * (parseFloat(e) / 100));
                  }
                }
                this.originPoint[t] = e;
              }),
              s && tC.update(() => s(t, e), !1, !0),
              iM(this.visualElement, "transform");
            let { animationState: r } = this.visualElement;
            r && r.setActive("whileDrag", !0);
          },
          o = (t, e) => {
            (this.latestPointerEvent = t), (this.latestPanInfo = e);
            let {
              dragPropagation: i,
              dragDirectionLock: n,
              onDirectionLock: s,
              onDrag: r,
            } = this.getProps();
            if (!i && !this.openDragLock) return;
            let { offset: o } = e;
            if (n && null === this.currentDirection) {
              (this.currentDirection = (function (t, e = 10) {
                let i = null;
                return (
                  Math.abs(t.y) > e
                    ? (i = "y")
                    : Math.abs(t.x) > e && (i = "x"),
                  i
                );
              })(o)),
                null !== this.currentDirection && s && s(this.currentDirection);
              return;
            }
            this.updateAxis("x", e.point, o),
              this.updateAxis("y", e.point, o),
              this.visualElement.render(),
              r && tC.update(() => r(t, e), !1, !0);
          },
          a = (t, e) => {
            (this.latestPointerEvent = t),
              (this.latestPanInfo = e),
              this.stop(t, e),
              (this.latestPointerEvent = null),
              (this.latestPanInfo = null);
          },
          l = () => {
            let { dragSnapToOrigin: t } = this.getProps();
            (t || this.constraints) && this.startAnimation({ x: 0, y: 0 });
          },
          { dragSnapToOrigin: h } = this.getProps();
        this.panSession = new si(
          t,
          {
            onSessionStart: s,
            onStart: r,
            onMove: o,
            onSessionEnd: a,
            resumeAnimation: l,
          },
          {
            transformPagePoint: this.visualElement.getTransformPagePoint(),
            dragSnapToOrigin: h,
            distanceThreshold: i,
            contextWindow: n9(this.visualElement),
            element: this.visualElement.current,
          }
        );
      }
      stop(t, e) {
        let i = t || this.latestPointerEvent,
          n = e || this.latestPanInfo,
          s = this.isDragging;
        if ((this.cancel(), !s || !n || !i)) return;
        let { velocity: r } = n;
        this.startAnimation(r);
        let { onDragEnd: o } = this.getProps();
        o && tC.postRender(() => o(i, n));
      }
      cancel() {
        this.isDragging = !1;
        let { projection: t, animationState: e } = this.visualElement;
        t && (t.isAnimationBlocked = !1), this.endPanSession();
        let { dragPropagation: i } = this.getProps();
        !i &&
          this.openDragLock &&
          (this.openDragLock(), (this.openDragLock = null)),
          e && e.setActive("whileDrag", !1);
      }
      endPanSession() {
        this.panSession && this.panSession.end(), (this.panSession = void 0);
      }
      updateAxis(t, e, i) {
        let { drag: n } = this.getProps();
        if (!i || !sm(t, n, this.currentDirection)) return;
        let s = this.getAxisMotionValue(t),
          r = this.originPoint[t] + i[t];
        this.constraints &&
          this.constraints[t] &&
          (r = (function (t, { min: e, max: i }, n) {
            return (
              void 0 !== e && t < e
                ? (t = n ? eF(e, t, n.min) : Math.max(t, e))
                : void 0 !== i &&
                  t > i &&
                  (t = n ? eF(i, t, n.max) : Math.min(t, i)),
              t
            );
          })(r, this.constraints[t], this.elastic[t])),
          s.set(r);
      }
      resolveConstraints() {
        let { dragConstraints: t, dragElastic: e } = this.getProps(),
          i =
            this.visualElement.projection &&
            !this.visualElement.projection.layout
              ? this.visualElement.projection.measure(!1)
              : this.visualElement.projection?.layout,
          n = this.constraints;
        t && ib(t)
          ? this.constraints ||
            (this.constraints = this.resolveRefConstraints())
          : t && i
          ? (this.constraints = (function (
              t,
              { top: e, left: i, bottom: n, right: s }
            ) {
              return { x: sa(t.x, i, s), y: sa(t.y, e, n) };
            })(i.layoutBox, t))
          : (this.constraints = !1),
          (this.elastic = (function (t = 0.35) {
            return (
              !1 === t ? (t = 0) : !0 === t && (t = 0.35),
              { x: sh(t, "left", "right"), y: sh(t, "top", "bottom") }
            );
          })(e)),
          n !== this.constraints &&
            !ib(t) &&
            i &&
            this.constraints &&
            !this.hasMutatedConstraints &&
            nB((t) => {
              var e, n;
              let s;
              !1 !== this.constraints &&
                this.getAxisMotionValue(t) &&
                (this.constraints[t] =
                  ((e = i.layoutBox[t]),
                  (n = this.constraints[t]),
                  (s = {}),
                  void 0 !== n.min && (s.min = n.min - e.min),
                  void 0 !== n.max && (s.max = n.max - e.min),
                  s));
            });
      }
      resolveRefConstraints() {
        var t;
        let { dragConstraints: e, onMeasureDragConstraints: i } =
          this.getProps();
        if (!e || !ib(e)) return !1;
        let n = e.current;
        ti(
          null !== n,
          "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.",
          "drag-constraints-ref"
        );
        let { projection: s } = this.visualElement;
        if (!s || !s.layout) return !1;
        let r = (function (t, e, i) {
            let n = e0(t, i),
              { scroll: s } = e;
            return s && (eG(n.x, s.offset.x), eG(n.y, s.offset.y)), n;
          })(n, s.root, this.visualElement.getTransformPagePoint()),
          o = ((t = s.layout.layoutBox), { x: sl(t.x, r.x), y: sl(t.y, r.y) });
        if (i) {
          let t = i(
            (function ({ x: t, y: e }) {
              return { top: e.min, right: t.max, bottom: e.max, left: t.min };
            })(o)
          );
          (this.hasMutatedConstraints = !!t), t && (o = e$(t));
        }
        return o;
      }
      startAnimation(t) {
        let {
            drag: e,
            dragMomentum: i,
            dragElastic: n,
            dragTransition: s,
            dragSnapToOrigin: r,
            onDragTransitionEnd: o,
          } = this.getProps(),
          a = this.constraints || {};
        return Promise.all(
          nB((o) => {
            if (!sm(o, e, this.currentDirection)) return;
            let l = (a && a[o]) || {};
            r && (l = { min: 0, max: 0 });
            let h = {
              type: "inertia",
              velocity: i ? t[o] : 0,
              bounceStiffness: n ? 200 : 1e6,
              bounceDamping: n ? 40 : 1e7,
              timeConstant: 750,
              restDelta: 1,
              restSpeed: 10,
              ...s,
              ...l,
            };
            return this.startAxisValueAnimation(o, h);
          })
        ).then(o);
      }
      startAxisValueAnimation(t, e) {
        let i = this.getAxisMotionValue(t);
        return (
          iM(this.visualElement, t),
          i.start(nP(t, i, 0, e, this.visualElement, !1))
        );
      }
      stopAnimation() {
        nB((t) => this.getAxisMotionValue(t).stop());
      }
      getAxisMotionValue(t) {
        let e = `_drag${t.toUpperCase()}`,
          i = this.visualElement.getProps();
        return (
          i[e] ||
          this.visualElement.getValue(
            t,
            (i.initial ? i.initial[t] : void 0) || 0
          )
        );
      }
      snapToCursor(t) {
        nB((e) => {
          let { drag: i } = this.getProps();
          if (!sm(e, i, this.currentDirection)) return;
          let { projection: n } = this.visualElement,
            s = this.getAxisMotionValue(e);
          if (n && n.layout) {
            let { min: i, max: r } = n.layout.layoutBox[e],
              o = s.get() || 0;
            s.set(t[e] - eF(i, r, 0.5) + o);
          }
        });
      }
      scalePositionWithinConstraints() {
        if (!this.visualElement.current) return;
        let { drag: t, dragConstraints: e } = this.getProps(),
          { projection: i } = this.visualElement;
        if (!ib(e) || !i || !this.constraints) return;
        this.stopAnimation();
        let n = { x: 0, y: 0 };
        nB((t) => {
          let e = this.getAxisMotionValue(t);
          if (e && !1 !== this.constraints) {
            var i, s;
            let r,
              o,
              l,
              h = e.get();
            n[t] =
              ((i = { min: h, max: h }),
              (s = this.constraints[t]),
              (r = 0.5),
              (o = nz(i)),
              (l = nz(s)) > o
                ? (r = nu(s.min, s.max - o, i.min))
                : o > l && (r = nu(i.min, i.max - l, s.min)),
              a(0, 1, r));
          }
        });
        let { transformTemplate: s } = this.visualElement.getProps();
        (this.visualElement.current.style.transform = s ? s({}, "") : "none"),
          i.root && i.root.updateScroll(),
          i.updateLayout(),
          (this.constraints = !1),
          this.resolveConstraints(),
          nB((e) => {
            if (!sm(e, t, null)) return;
            let i = this.getAxisMotionValue(e),
              { min: s, max: r } = this.constraints[e];
            i.set(eF(s, r, n[e]));
          }),
          this.visualElement.render();
      }
      addListeners() {
        let t;
        if (!this.visualElement.current) return;
        sc.set(this.visualElement, this);
        let e = this.visualElement.current,
          i = n7(e, "pointerdown", (t) => {
            let { drag: i, dragListener: n = !0 } = this.getProps(),
              s = t.target,
              r = s !== e && (n4.has(s.tagName) || !0 === s.isContentEditable);
            i && n && !r && this.start(t);
          }),
          n = () => {
            var i, n, s;
            let r,
              o,
              { dragConstraints: a } = this.getProps();
            ib(a) &&
              a.current &&
              ((this.constraints = this.resolveRefConstraints()),
              t ||
                ((i = e),
                (n = a.current),
                (r = n5(
                  i,
                  sp((s = () => this.scalePositionWithinConstraints()))
                )),
                (o = n5(n, sp(s))),
                (t = () => {
                  r(), o();
                })));
          },
          { projection: s } = this.visualElement,
          r = s.addEventListener("measure", n);
        s && !s.layout && (s.root && s.root.updateScroll(), s.updateLayout()),
          tC.read(n);
        let o = nO(window, "resize", () =>
            this.scalePositionWithinConstraints()
          ),
          a = s.addEventListener(
            "didUpdate",
            ({ delta: t, hasLayoutChanged: e }) => {
              this.isDragging &&
                e &&
                (nB((e) => {
                  let i = this.getAxisMotionValue(e);
                  i &&
                    ((this.originPoint[e] += t[e].translate),
                    i.set(i.get() + t[e].translate));
                }),
                this.visualElement.render());
            }
          );
        return () => {
          o(), i(), r(), a && a(), t && t();
        };
      }
      getProps() {
        let t = this.visualElement.getProps(),
          {
            drag: e = !1,
            dragDirectionLock: i = !1,
            dragPropagation: n = !1,
            dragConstraints: s = !1,
            dragElastic: r = 0.35,
            dragMomentum: o = !0,
          } = t;
        return {
          ...t,
          drag: e,
          dragDirectionLock: i,
          dragPropagation: n,
          dragConstraints: s,
          dragElastic: r,
          dragMomentum: o,
        };
      }
    }
    function sp(t) {
      let e = !0;
      return () => {
        if (e) {
          e = !1;
          return;
        }
        t();
      };
    }
    function sm(t, e, i) {
      return (!0 === e || e === t) && (null === i || i === t);
    }
    let sf = (t) => (e, i) => {
        t && tC.update(() => t(e, i), !1, !0);
      },
      sg = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
    var sv = e2;
    function sy(t = !0) {
      let e = (0, e2.useContext)(ih);
      if (null === e) return [!0, null];
      let { isPresent: i, onExitComplete: n, register: s } = e,
        r = (0, e2.useId)();
      (0, e2.useEffect)(() => {
        if (t) return s(r);
      }, [t]);
      let o = (0, e2.useCallback)(() => t && n && n(r), [r, n, t]);
      return !i && n ? [!1, o] : [!0];
    }
    let sx = !1;
    class sw extends sv.Component {
      componentDidMount() {
        let {
            visualElement: t,
            layoutGroup: e,
            switchLayoutGroup: i,
            layoutId: n,
          } = this.props,
          { projection: s } = t;
        s &&
          (e.group && e.group.add(s),
          i && i.register && n && i.register(s),
          sx && s.root.didUpdate(),
          s.addEventListener("animationComplete", () => {
            this.safeToRemove();
          }),
          s.setOptions({
            ...s.options,
            layoutDependency: this.props.layoutDependency,
            onExitComplete: () => this.safeToRemove(),
          })),
          (sg.hasEverUpdated = !0);
      }
      getSnapshotBeforeUpdate(t) {
        let {
            layoutDependency: e,
            visualElement: i,
            drag: n,
            isPresent: s,
          } = this.props,
          { projection: r } = i;
        return (
          r &&
            ((r.isPresent = s),
            t.layoutDependency !== e &&
              r.setOptions({ ...r.options, layoutDependency: e }),
            (sx = !0),
            n || t.layoutDependency !== e || void 0 === e || t.isPresent !== s
              ? r.willUpdate()
              : this.safeToRemove(),
            t.isPresent !== s &&
              (s
                ? r.promote()
                : r.relegate() ||
                  tC.postRender(() => {
                    let t = r.getStack();
                    (t && t.members.length) || this.safeToRemove();
                  }))),
          null
        );
      }
      componentDidUpdate() {
        let { projection: t } = this.props.visualElement;
        t &&
          (t.root.didUpdate(),
          et.postRender(() => {
            !t.currentAnimation && t.isLead() && this.safeToRemove();
          }));
      }
      componentWillUnmount() {
        let {
            visualElement: t,
            layoutGroup: e,
            switchLayoutGroup: i,
          } = this.props,
          { projection: n } = t;
        (sx = !0),
          n &&
            (n.scheduleCheckAfterUnmount(),
            e && e.group && e.group.remove(n),
            i && i.deregister && i.deregister(n));
      }
      safeToRemove() {
        let { safeToRemove: t } = this.props;
        t && t();
      }
      render() {
        return null;
      }
    }
    function sb(t) {
      let [e, i] = sy(),
        n = (0, sv.useContext)(e6);
      return (0, e4.jsx)(sw, {
        ...t,
        layoutGroup: n,
        switchLayoutGroup: (0, sv.useContext)(iw),
        isPresent: e,
        safeToRemove: i,
      });
    }
    let sS = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
      sj = sS.length,
      sT = (t) => ("string" == typeof t ? parseFloat(t) : t),
      sk = (t) => "number" == typeof t || S.test(t);
    function sE(t, e) {
      return void 0 !== t[e] ? t[e] : t.borderRadius;
    }
    let sP = sM(0, 0.5, no),
      sC = sM(0.5, 0.95, tT);
    function sM(t, e, i) {
      return (n) => (n < t ? 0 : n > e ? 1 : i(nu(t, e, n)));
    }
    function sA(t, e) {
      (t.min = e.min), (t.max = e.max);
    }
    function sL(t, e) {
      sA(t.x, e.x), sA(t.y, e.y);
    }
    function sN(t, e) {
      (t.translate = e.translate),
        (t.scale = e.scale),
        (t.originPoint = e.originPoint),
        (t.origin = e.origin);
    }
    function sV(t, e, i, n, s) {
      return (
        (t -= e),
        (t = n + (1 / i) * (t - n)),
        void 0 !== s && (t = n + (1 / s) * (t - n)),
        t
      );
    }
    function sR(t, e, [i, n, s], r, o) {
      !(function (t, e = 0, i = 1, n = 0.5, s, r = t, o = t) {
        if (
          (b.test(e) &&
            ((e = parseFloat(e)), (e = eF(o.min, o.max, e / 100) - o.min)),
          "number" != typeof e)
        )
          return;
        let a = eF(r.min, r.max, n);
        t === r && (a -= e),
          (t.min = sV(t.min, e, i, a, s)),
          (t.max = sV(t.max, e, i, a, s));
      })(t, e[i], e[n], e[s], e.scale, r, o);
    }
    let sD = ["x", "scaleX", "originX"],
      sF = ["y", "scaleY", "originY"];
    function sI(t, e, i, n) {
      sR(t.x, e, sD, i ? i.x : void 0, n ? n.x : void 0),
        sR(t.y, e, sF, i ? i.y : void 0, n ? n.y : void 0);
    }
    function sB(t) {
      return 0 === t.translate && 1 === t.scale;
    }
    function sO(t) {
      return sB(t.x) && sB(t.y);
    }
    function sU(t, e) {
      return t.min === e.min && t.max === e.max;
    }
    function sz(t, e) {
      return (
        Math.round(t.min) === Math.round(e.min) &&
        Math.round(t.max) === Math.round(e.max)
      );
    }
    function s$(t, e) {
      return sz(t.x, e.x) && sz(t.y, e.y);
    }
    function sW(t) {
      return nz(t.x) / nz(t.y);
    }
    function s_(t, e) {
      return (
        t.translate === e.translate &&
        t.scale === e.scale &&
        t.originPoint === e.originPoint
      );
    }
    class sH {
      constructor() {
        this.members = [];
      }
      add(t) {
        t_(this.members, t);
        for (let e = this.members.length - 1; e >= 0; e--) {
          let i = this.members[e];
          if (i === t || i === this.lead || i === this.prevLead) continue;
          let n = i.instance;
          (n && !1 !== n.isConnected) ||
            i.snapshot ||
            (tH(this.members, i), i.unmount());
        }
        t.scheduleRender();
      }
      remove(t) {
        if (
          (tH(this.members, t),
          t === this.prevLead && (this.prevLead = void 0),
          t === this.lead)
        ) {
          let t = this.members[this.members.length - 1];
          t && this.promote(t);
        }
      }
      relegate(t) {
        for (let e = this.members.indexOf(t) - 1; e >= 0; e--) {
          let t = this.members[e];
          if (!1 !== t.isPresent && t.instance?.isConnected !== !1)
            return this.promote(t), !0;
        }
        return !1;
      }
      promote(t, e) {
        let i = this.lead;
        if (t !== i && ((this.prevLead = i), (this.lead = t), t.show(), i)) {
          i.updateSnapshot(), t.scheduleRender();
          let { layoutDependency: n } = i.options,
            { layoutDependency: s } = t.options;
          (void 0 === n || n !== s) &&
            ((t.resumeFrom = i),
            e && (i.preserveOpacity = !0),
            i.snapshot &&
              ((t.snapshot = i.snapshot),
              (t.snapshot.latestValues = i.animationValues || i.latestValues)),
            t.root?.isUpdating && (t.isLayoutDirty = !0)),
            !1 === t.options.crossfade && i.hide();
        }
      }
      exitAnimationComplete() {
        this.members.forEach((t) => {
          t.options.onExitComplete?.(),
            t.resumingFrom?.options.onExitComplete?.();
        });
      }
      scheduleRender() {
        this.members.forEach((t) => t.instance && t.scheduleRender(!1));
      }
      removeLeadSnapshot() {
        this.lead?.snapshot && (this.lead.snapshot = void 0);
      }
    }
    let sq = (t, e) => t.depth - e.depth;
    class sY {
      constructor() {
        (this.children = []), (this.isDirty = !1);
      }
      add(t) {
        t_(this.children, t), (this.isDirty = !0);
      }
      remove(t) {
        tH(this.children, t), (this.isDirty = !0);
      }
      forEach(t) {
        this.isDirty && this.children.sort(sq),
          (this.isDirty = !1),
          this.children.forEach(t);
      }
    }
    let sX = ["", "X", "Y", "Z"],
      sK = 0;
    function sG(t, e, i, n) {
      let { latestValues: s } = e;
      s[t] && ((i[t] = s[t]), e.setStaticValue(t, 0), n && (n[t] = 0));
    }
    function sZ({
      attachResizeListener: t,
      defaultParent: e,
      measureScroll: i,
      checkIsScrollRoot: n,
      resetTransform: s,
    }) {
      return class {
        constructor(t = {}, i = e?.()) {
          (this.id = sK++),
            (this.animationId = 0),
            (this.animationCommitId = 0),
            (this.children = new Set()),
            (this.options = {}),
            (this.isTreeAnimating = !1),
            (this.isAnimationBlocked = !1),
            (this.isLayoutDirty = !1),
            (this.isProjectionDirty = !1),
            (this.isSharedProjectionDirty = !1),
            (this.isTransformDirty = !1),
            (this.updateManuallyBlocked = !1),
            (this.updateBlockedByResize = !1),
            (this.isUpdating = !1),
            (this.isSVG = !1),
            (this.needsReset = !1),
            (this.shouldResetTransform = !1),
            (this.hasCheckedOptimisedAppear = !1),
            (this.treeScale = { x: 1, y: 1 }),
            (this.eventHandlers = new Map()),
            (this.hasTreeAnimated = !1),
            (this.layoutVersion = 0),
            (this.updateScheduled = !1),
            (this.scheduleUpdate = () => this.update()),
            (this.projectionUpdateScheduled = !1),
            (this.checkUpdateFailed = () => {
              this.isUpdating &&
                ((this.isUpdating = !1), this.clearAllSnapshots());
            }),
            (this.updateProjection = () => {
              (this.projectionUpdateScheduled = !1),
                this.nodes.forEach(s0),
                this.nodes.forEach(s8),
                this.nodes.forEach(s7),
                this.nodes.forEach(s1);
            }),
            (this.resolvedRelativeTargetAt = 0),
            (this.linkedParentVersion = 0),
            (this.hasProjected = !1),
            (this.isVisible = !0),
            (this.animationProgress = 0),
            (this.sharedNodes = new Map()),
            (this.latestValues = t),
            (this.root = i ? i.root || i : this),
            (this.path = i ? [...i.path, i] : []),
            (this.parent = i),
            (this.depth = i ? i.depth + 1 : 0);
          for (let t = 0; t < this.path.length; t++)
            this.path[t].shouldResetTransform = !0;
          this.root === this && (this.nodes = new sY());
        }
        addEventListener(t, e) {
          return (
            this.eventHandlers.has(t) || this.eventHandlers.set(t, new tq()),
            this.eventHandlers.get(t).add(e)
          );
        }
        notifyListeners(t, ...e) {
          let i = this.eventHandlers.get(t);
          i && i.notify(...e);
        }
        hasListeners(t) {
          return this.eventHandlers.has(t);
        }
        mount(e) {
          if (this.instance) return;
          (this.isSVG = nX(e) && !(nX(e) && "svg" === e.tagName)),
            (this.instance = e);
          let { layoutId: i, layout: n, visualElement: s } = this.options;
          if (
            (s && !s.current && s.mount(e),
            this.root.nodes.add(this),
            this.parent && this.parent.children.add(this),
            this.root.hasTreeAnimated && (n || i) && (this.isLayoutDirty = !0),
            t)
          ) {
            let i,
              n = 0,
              s = () => (this.root.updateBlockedByResize = !1);
            tC.read(() => {
              n = window.innerWidth;
            }),
              t(e, () => {
                let t = window.innerWidth;
                if (t !== n) {
                  let e, r;
                  (n = t),
                    (this.root.updateBlockedByResize = !0),
                    i && i(),
                    (e = ei.now()),
                    (r = ({ timestamp: t }) => {
                      let i = t - e;
                      i >= 250 && (tM(r), s(i - 250));
                    }),
                    tC.setup(r, !0),
                    (i = () => tM(r)),
                    sg.hasAnimatedSinceResize &&
                      ((sg.hasAnimatedSinceResize = !1),
                      this.nodes.forEach(s6));
                }
              });
          }
          i && this.root.registerSharedNode(i, this),
            !1 !== this.options.animate &&
              s &&
              (i || n) &&
              this.addEventListener(
                "didUpdate",
                ({
                  delta: t,
                  hasLayoutChanged: e,
                  hasRelativeLayoutChanged: i,
                  layout: n,
                }) => {
                  if (this.isTreeAnimationBlocked()) {
                    (this.target = void 0), (this.relativeTarget = void 0);
                    return;
                  }
                  let r =
                      this.options.transition || s.getDefaultTransition() || rs,
                    {
                      onLayoutAnimationStart: o,
                      onLayoutAnimationComplete: a,
                    } = s.getProps(),
                    l = !this.targetLayout || !s$(this.targetLayout, n),
                    h = !e && i;
                  if (
                    this.options.layoutRoot ||
                    this.resumeFrom ||
                    h ||
                    (e && (l || !this.currentAnimation))
                  ) {
                    this.resumeFrom &&
                      ((this.resumingFrom = this.resumeFrom),
                      (this.resumingFrom.resumingFrom = void 0));
                    let e = { ...iP(r, "layout"), onPlay: o, onComplete: a };
                    (s.shouldReduceMotion || this.options.layoutRoot) &&
                      ((e.delay = 0), (e.type = !1)),
                      this.startAnimation(e),
                      this.setAnimationOrigin(t, h);
                  } else
                    e || s6(this),
                      this.isLead() &&
                        this.options.onExitComplete &&
                        this.options.onExitComplete();
                  this.targetLayout = n;
                }
              );
        }
        unmount() {
          this.options.layoutId && this.willUpdate(),
            this.root.nodes.remove(this);
          let t = this.getStack();
          t && t.remove(this),
            this.parent && this.parent.children.delete(this),
            (this.instance = void 0),
            this.eventHandlers.clear(),
            tM(this.updateProjection);
        }
        blockUpdate() {
          this.updateManuallyBlocked = !0;
        }
        unblockUpdate() {
          this.updateManuallyBlocked = !1;
        }
        isUpdateBlocked() {
          return this.updateManuallyBlocked || this.updateBlockedByResize;
        }
        isTreeAnimationBlocked() {
          return (
            this.isAnimationBlocked ||
            (this.parent && this.parent.isTreeAnimationBlocked()) ||
            !1
          );
        }
        startUpdate() {
          !this.isUpdateBlocked() &&
            ((this.isUpdating = !0),
            this.nodes && this.nodes.forEach(s9),
            this.animationId++);
        }
        getTransformTemplate() {
          let { visualElement: t } = this.options;
          return t && t.getProps().transformTemplate;
        }
        willUpdate(t = !0) {
          if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
            this.options.onExitComplete && this.options.onExitComplete();
            return;
          }
          if (
            (window.MotionCancelOptimisedAnimation &&
              !this.hasCheckedOptimisedAppear &&
              (function t(e) {
                if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return;
                let { visualElement: i } = e.options;
                if (!i) return;
                let n = i.props[ix];
                if (window.MotionHasOptimisedAnimation(n, "transform")) {
                  let { layout: t, layoutId: i } = e.options;
                  window.MotionCancelOptimisedAnimation(
                    n,
                    "transform",
                    tC,
                    !(t || i)
                  );
                }
                let { parent: s } = e;
                s && !s.hasCheckedOptimisedAppear && t(s);
              })(this),
            this.root.isUpdating || this.root.startUpdate(),
            this.isLayoutDirty)
          )
            return;
          this.isLayoutDirty = !0;
          for (let t = 0; t < this.path.length; t++) {
            let e = this.path[t];
            (e.shouldResetTransform = !0),
              ("string" == typeof e.latestValues.x ||
                "string" == typeof e.latestValues.y) &&
                (e.isLayoutDirty = !0),
              e.updateScroll("snapshot"),
              e.options.layoutRoot && e.willUpdate(!1);
          }
          let { layoutId: e, layout: i } = this.options;
          if (void 0 === e && !i) return;
          let n = this.getTransformTemplate();
          (this.prevTransformTemplateValue = n
            ? n(this.latestValues, "")
            : void 0),
            this.updateSnapshot(),
            t && this.notifyListeners("willUpdate");
        }
        update() {
          if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
            this.unblockUpdate(),
              this.clearAllSnapshots(),
              this.nodes.forEach(s5);
            return;
          }
          if (this.animationId <= this.animationCommitId)
            return void this.nodes.forEach(s3);
          (this.animationCommitId = this.animationId),
            this.isUpdating
              ? ((this.isUpdating = !1),
                this.nodes.forEach(s4),
                this.nodes.forEach(sJ),
                this.nodes.forEach(sQ))
              : this.nodes.forEach(s3),
            this.clearAllSnapshots();
          let t = ei.now();
          (tA.delta = a(0, 1e3 / 60, t - tA.timestamp)),
            (tA.timestamp = t),
            (tA.isProcessing = !0),
            tL.update.process(tA),
            tL.preRender.process(tA),
            tL.render.process(tA),
            (tA.isProcessing = !1);
        }
        didUpdate() {
          this.updateScheduled ||
            ((this.updateScheduled = !0), et.read(this.scheduleUpdate));
        }
        clearAllSnapshots() {
          this.nodes.forEach(s2), this.sharedNodes.forEach(rt);
        }
        scheduleUpdateProjection() {
          this.projectionUpdateScheduled ||
            ((this.projectionUpdateScheduled = !0),
            tC.preRender(this.updateProjection, !1, !0));
        }
        scheduleCheckAfterUnmount() {
          tC.postRender(() => {
            this.isLayoutDirty
              ? this.root.didUpdate()
              : this.root.checkUpdateFailed();
          });
        }
        updateSnapshot() {
          !this.snapshot &&
            this.instance &&
            ((this.snapshot = this.measure()),
            !this.snapshot ||
              nz(this.snapshot.measuredBox.x) ||
              nz(this.snapshot.measuredBox.y) ||
              (this.snapshot = void 0));
        }
        updateLayout() {
          if (
            !this.instance ||
            (this.updateScroll(),
            !(this.options.alwaysMeasureLayout && this.isLead()) &&
              !this.isLayoutDirty)
          )
            return;
          if (this.resumeFrom && !this.resumeFrom.instance)
            for (let t = 0; t < this.path.length; t++)
              this.path[t].updateScroll();
          let t = this.layout;
          (this.layout = this.measure(!1)),
            this.layoutVersion++,
            (this.layoutCorrected = Y()),
            (this.isLayoutDirty = !1),
            (this.projectionDelta = void 0),
            this.notifyListeners("measure", this.layout.layoutBox);
          let { visualElement: e } = this.options;
          e &&
            e.notify(
              "LayoutMeasure",
              this.layout.layoutBox,
              t ? t.layoutBox : void 0
            );
        }
        updateScroll(t = "measure") {
          let e = !!(this.options.layoutScroll && this.instance);
          if (
            (this.scroll &&
              this.scroll.animationId === this.root.animationId &&
              this.scroll.phase === t &&
              (e = !1),
            e && this.instance)
          ) {
            let e = n(this.instance);
            this.scroll = {
              animationId: this.root.animationId,
              phase: t,
              isRoot: e,
              offset: i(this.instance),
              wasRoot: this.scroll ? this.scroll.isRoot : e,
            };
          }
        }
        resetTransform() {
          if (!s) return;
          let t =
              this.isLayoutDirty ||
              this.shouldResetTransform ||
              this.options.alwaysMeasureLayout,
            e = this.projectionDelta && !sO(this.projectionDelta),
            i = this.getTransformTemplate(),
            n = i ? i(this.latestValues, "") : void 0,
            r = n !== this.prevTransformTemplateValue;
          t &&
            this.instance &&
            (e || eH(this.latestValues) || r) &&
            (s(this.instance, n),
            (this.shouldResetTransform = !1),
            this.scheduleRender());
        }
        measure(t = !0) {
          var e;
          let i = this.measurePageBox(),
            n = this.removeElementScroll(i);
          return (
            t && (n = this.removeTransform(n)),
            ra((e = n).x),
            ra(e.y),
            {
              animationId: this.root.animationId,
              measuredBox: i,
              layoutBox: n,
              latestValues: {},
              source: this.id,
            }
          );
        }
        measurePageBox() {
          let { visualElement: t } = this.options;
          if (!t) return Y();
          let e = t.measureViewportBox();
          if (!(this.scroll?.wasRoot || this.path.some(rh))) {
            let { scroll: t } = this.root;
            t && (eG(e.x, t.offset.x), eG(e.y, t.offset.y));
          }
          return e;
        }
        removeElementScroll(t) {
          let e = Y();
          if ((sL(e, t), this.scroll?.wasRoot)) return e;
          for (let i = 0; i < this.path.length; i++) {
            let n = this.path[i],
              { scroll: s, options: r } = n;
            n !== this.root &&
              s &&
              r.layoutScroll &&
              (s.wasRoot && sL(e, t), eG(e.x, s.offset.x), eG(e.y, s.offset.y));
          }
          return e;
        }
        applyTransform(t, e = !1) {
          let i = Y();
          sL(i, t);
          for (let t = 0; t < this.path.length; t++) {
            let n = this.path[t];
            !e &&
              n.options.layoutScroll &&
              n.scroll &&
              n !== n.root &&
              eQ(i, { x: -n.scroll.offset.x, y: -n.scroll.offset.y }),
              eH(n.latestValues) && eQ(i, n.latestValues, n.layout?.layoutBox);
          }
          return (
            eH(this.latestValues) &&
              eQ(i, this.latestValues, this.layout?.layoutBox),
            i
          );
        }
        removeTransform(t) {
          let e = Y();
          sL(e, t);
          for (let t = 0; t < this.path.length; t++) {
            let i,
              n = this.path[t];
            eH(n.latestValues) &&
              (n.instance &&
                (e_(n.latestValues) && n.updateSnapshot(),
                sL((i = Y()), n.measurePageBox())),
              sI(e, n.latestValues, n.snapshot?.layoutBox, i));
          }
          return eH(this.latestValues) && sI(e, this.latestValues), e;
        }
        setTargetDelta(t) {
          (this.targetDelta = t),
            this.root.scheduleUpdateProjection(),
            (this.isProjectionDirty = !0);
        }
        setOptions(t) {
          this.options = {
            ...this.options,
            ...t,
            crossfade: void 0 === t.crossfade || t.crossfade,
          };
        }
        clearMeasurements() {
          (this.scroll = void 0),
            (this.layout = void 0),
            (this.snapshot = void 0),
            (this.prevTransformTemplateValue = void 0),
            (this.targetDelta = void 0),
            (this.target = void 0),
            (this.isLayoutDirty = !1);
        }
        forceRelativeParentToResolveTarget() {
          this.relativeParent &&
            this.relativeParent.resolvedRelativeTargetAt !== tA.timestamp &&
            this.relativeParent.resolveTargetDelta(!0);
        }
        resolveTargetDelta(t = !1) {
          let e = this.getLead();
          this.isProjectionDirty ||
            (this.isProjectionDirty = e.isProjectionDirty),
            this.isTransformDirty ||
              (this.isTransformDirty = e.isTransformDirty),
            this.isSharedProjectionDirty ||
              (this.isSharedProjectionDirty = e.isSharedProjectionDirty);
          let i = !!this.resumingFrom || this !== e;
          if (
            !(
              t ||
              (i && this.isSharedProjectionDirty) ||
              this.isProjectionDirty ||
              this.parent?.isProjectionDirty ||
              this.attemptToResolveRelativeTarget ||
              this.root.updateBlockedByResize
            )
          )
            return;
          let { layout: n, layoutId: s } = this.options;
          if (!this.layout || !(n || s)) return;
          this.resolvedRelativeTargetAt = tA.timestamp;
          let r = this.getClosestProjectingParent();
          if (
            (r &&
              this.linkedParentVersion !== r.layoutVersion &&
              !r.options.layoutRoot &&
              this.removeRelativeTarget(),
            this.targetDelta ||
              this.relativeTarget ||
              (r && r.layout
                ? this.createRelativeTarget(
                    r,
                    this.layout.layoutBox,
                    r.layout.layoutBox
                  )
                : this.removeRelativeTarget()),
            this.relativeTarget || this.targetDelta)
          ) {
            if (
              (this.target ||
                ((this.target = Y()), (this.targetWithTransforms = Y())),
              this.relativeTarget &&
                this.relativeTargetOrigin &&
                this.relativeParent &&
                this.relativeParent.target)
            ) {
              var o, a, l;
              this.forceRelativeParentToResolveTarget(),
                (o = this.target),
                (a = this.relativeTarget),
                (l = this.relativeParent.target),
                n_(o.x, a.x, l.x),
                n_(o.y, a.y, l.y);
            } else
              this.targetDelta
                ? (this.resumingFrom
                    ? (this.target = this.applyTransform(this.layout.layoutBox))
                    : sL(this.target, this.layout.layoutBox),
                  eK(this.target, this.targetDelta))
                : sL(this.target, this.layout.layoutBox);
            this.attemptToResolveRelativeTarget &&
              ((this.attemptToResolveRelativeTarget = !1),
              r &&
              !!r.resumingFrom == !!this.resumingFrom &&
              !r.options.layoutScroll &&
              r.target &&
              1 !== this.animationProgress
                ? this.createRelativeTarget(r, this.target, r.target)
                : (this.relativeParent = this.relativeTarget = void 0));
          }
        }
        getClosestProjectingParent() {
          if (
            !(
              !this.parent ||
              e_(this.parent.latestValues) ||
              eq(this.parent.latestValues)
            )
          )
            if (this.parent.isProjecting()) return this.parent;
            else return this.parent.getClosestProjectingParent();
        }
        isProjecting() {
          return !!(
            (this.relativeTarget ||
              this.targetDelta ||
              this.options.layoutRoot) &&
            this.layout
          );
        }
        createRelativeTarget(t, e, i) {
          (this.relativeParent = t),
            (this.linkedParentVersion = t.layoutVersion),
            this.forceRelativeParentToResolveTarget(),
            (this.relativeTarget = Y()),
            (this.relativeTargetOrigin = Y()),
            nq(this.relativeTargetOrigin, e, i),
            sL(this.relativeTarget, this.relativeTargetOrigin);
        }
        removeRelativeTarget() {
          this.relativeParent = this.relativeTarget = void 0;
        }
        calcProjection() {
          let t = this.getLead(),
            e = !!this.resumingFrom || this !== t,
            i = !0;
          if (
            ((this.isProjectionDirty || this.parent?.isProjectionDirty) &&
              (i = !1),
            e &&
              (this.isSharedProjectionDirty || this.isTransformDirty) &&
              (i = !1),
            this.resolvedRelativeTargetAt === tA.timestamp && (i = !1),
            i)
          )
            return;
          let { layout: n, layoutId: s } = this.options;
          if (
            ((this.isTreeAnimating = !!(
              (this.parent && this.parent.isTreeAnimating) ||
              this.currentAnimation ||
              this.pendingAnimation
            )),
            this.isTreeAnimating ||
              (this.targetDelta = this.relativeTarget = void 0),
            !this.layout || !(n || s))
          )
            return;
          sL(this.layoutCorrected, this.layout.layoutBox);
          let r = this.treeScale.x,
            o = this.treeScale.y;
          !(function (t, e, i, n = !1) {
            let s,
              r,
              o = i.length;
            if (o) {
              e.x = e.y = 1;
              for (let a = 0; a < o; a++) {
                r = (s = i[a]).projectionDelta;
                let { visualElement: o } = s.options;
                (!o ||
                  !o.props.style ||
                  "contents" !== o.props.style.display) &&
                  (n &&
                    s.options.layoutScroll &&
                    s.scroll &&
                    s !== s.root &&
                    eQ(t, { x: -s.scroll.offset.x, y: -s.scroll.offset.y }),
                  r && ((e.x *= r.x.scale), (e.y *= r.y.scale), eK(t, r)),
                  n &&
                    eH(s.latestValues) &&
                    eQ(t, s.latestValues, s.layout?.layoutBox));
              }
              e.x < 1.0000000000001 && e.x > 0.999999999999 && (e.x = 1),
                e.y < 1.0000000000001 && e.y > 0.999999999999 && (e.y = 1);
            }
          })(this.layoutCorrected, this.treeScale, this.path, e),
            t.layout &&
              !t.target &&
              (1 !== this.treeScale.x || 1 !== this.treeScale.y) &&
              ((t.target = t.layout.layoutBox), (t.targetWithTransforms = Y()));
          let { target: a } = t;
          if (!a) {
            this.prevProjectionDelta &&
              (this.createProjectionDeltas(), this.scheduleRender());
            return;
          }
          this.projectionDelta && this.prevProjectionDelta
            ? (sN(this.prevProjectionDelta.x, this.projectionDelta.x),
              sN(this.prevProjectionDelta.y, this.projectionDelta.y))
            : this.createProjectionDeltas(),
            nW(
              this.projectionDelta,
              this.layoutCorrected,
              a,
              this.latestValues
            ),
            (this.treeScale.x === r &&
              this.treeScale.y === o &&
              s_(this.projectionDelta.x, this.prevProjectionDelta.x) &&
              s_(this.projectionDelta.y, this.prevProjectionDelta.y)) ||
              ((this.hasProjected = !0),
              this.scheduleRender(),
              this.notifyListeners("projectionUpdate", a));
        }
        hide() {
          this.isVisible = !1;
        }
        show() {
          this.isVisible = !0;
        }
        scheduleRender(t = !0) {
          if ((this.options.visualElement?.scheduleRender(), t)) {
            let t = this.getStack();
            t && t.scheduleRender();
          }
          this.resumingFrom &&
            !this.resumingFrom.instance &&
            (this.resumingFrom = void 0);
        }
        createProjectionDeltas() {
          (this.prevProjectionDelta = H()),
            (this.projectionDelta = H()),
            (this.projectionDeltaWithTransform = H());
        }
        setAnimationOrigin(t, e = !1) {
          let i,
            n = this.snapshot,
            s = n ? n.latestValues : {},
            r = { ...this.latestValues },
            o = H();
          (this.relativeParent && this.relativeParent.options.layoutRoot) ||
            (this.relativeTarget = this.relativeTargetOrigin = void 0),
            (this.attemptToResolveRelativeTarget = !e);
          let a = Y(),
            l =
              (n ? n.source : void 0) !==
              (this.layout ? this.layout.source : void 0),
            h = this.getStack(),
            u = !h || h.members.length <= 1,
            c = !!(
              l &&
              !u &&
              !0 === this.options.crossfade &&
              !this.path.some(rn)
            );
          (this.animationProgress = 0),
            (this.mixTargetDelta = (e) => {
              let n = e / 1e3;
              if (
                (re(o.x, t.x, n),
                re(o.y, t.y, n),
                this.setTargetDelta(o),
                this.relativeTarget &&
                  this.relativeTargetOrigin &&
                  this.layout &&
                  this.relativeParent &&
                  this.relativeParent.layout)
              ) {
                var h, d, p, m, f, g;
                nq(
                  a,
                  this.layout.layoutBox,
                  this.relativeParent.layout.layoutBox
                ),
                  (p = this.relativeTarget),
                  (m = this.relativeTargetOrigin),
                  (f = a),
                  (g = n),
                  ri(p.x, m.x, f.x, g),
                  ri(p.y, m.y, f.y, g),
                  i &&
                    ((h = this.relativeTarget),
                    (d = i),
                    sU(h.x, d.x) && sU(h.y, d.y)) &&
                    (this.isProjectionDirty = !1),
                  i || (i = Y()),
                  sL(i, this.relativeTarget);
              }
              l &&
                ((this.animationValues = r),
                (function (t, e, i, n, s, r) {
                  s
                    ? ((t.opacity = eF(0, i.opacity ?? 1, sP(n))),
                      (t.opacityExit = eF(e.opacity ?? 1, 0, sC(n))))
                    : r && (t.opacity = eF(e.opacity ?? 1, i.opacity ?? 1, n));
                  for (let s = 0; s < sj; s++) {
                    let r = `border${sS[s]}Radius`,
                      o = sE(e, r),
                      a = sE(i, r);
                    (void 0 !== o || void 0 !== a) &&
                      (o || (o = 0),
                      a || (a = 0),
                      0 === o || 0 === a || sk(o) === sk(a)
                        ? ((t[r] = Math.max(eF(sT(o), sT(a), n), 0)),
                          (b.test(a) || b.test(o)) && (t[r] += "%"))
                        : (t[r] = a));
                  }
                  (e.rotate || i.rotate) &&
                    (t.rotate = eF(e.rotate || 0, i.rotate || 0, n));
                })(r, s, this.latestValues, n, c, u)),
                this.root.scheduleUpdateProjection(),
                this.scheduleRender(),
                (this.animationProgress = n);
            }),
            this.mixTargetDelta(1e3 * !!this.options.layoutRoot);
        }
        startAnimation(t) {
          this.notifyListeners("animationStart"),
            this.currentAnimation?.stop(),
            this.resumingFrom?.currentAnimation?.stop(),
            this.pendingAnimation &&
              (tM(this.pendingAnimation), (this.pendingAnimation = void 0)),
            (this.pendingAnimation = tC.update(() => {
              var e, i, n;
              let s;
              (sg.hasAnimatedSinceResize = !0),
                t1.layout++,
                this.motionValue || (this.motionValue = es(0)),
                this.motionValue.jump(0, !1),
                (this.currentAnimation =
                  ((e = this.motionValue),
                  (i = [0, 1e3]),
                  (n = {
                    ...t,
                    velocity: 0,
                    isSync: !0,
                    onUpdate: (e) => {
                      this.mixTargetDelta(e), t.onUpdate && t.onUpdate(e);
                    },
                    onStop: () => {
                      t1.layout--;
                    },
                    onComplete: () => {
                      t1.layout--,
                        t.onComplete && t.onComplete(),
                        this.completeAnimation();
                    },
                  }),
                  (s = X(e) ? e : es(e)).start(nP("", s, i, n)),
                  s.animation)),
                this.resumingFrom &&
                  (this.resumingFrom.currentAnimation = this.currentAnimation),
                (this.pendingAnimation = void 0);
            }));
        }
        completeAnimation() {
          this.resumingFrom &&
            ((this.resumingFrom.currentAnimation = void 0),
            (this.resumingFrom.preserveOpacity = void 0));
          let t = this.getStack();
          t && t.exitAnimationComplete(),
            (this.resumingFrom =
              this.currentAnimation =
              this.animationValues =
                void 0),
            this.notifyListeners("animationComplete");
        }
        finishAnimation() {
          this.currentAnimation &&
            (this.mixTargetDelta && this.mixTargetDelta(1e3),
            this.currentAnimation.stop()),
            this.completeAnimation();
        }
        applyTransformsToTarget() {
          let t = this.getLead(),
            {
              targetWithTransforms: e,
              target: i,
              layout: n,
              latestValues: s,
            } = t;
          if (e && i && n) {
            if (
              this !== t &&
              this.layout &&
              n &&
              rl(this.options.animationType, this.layout.layoutBox, n.layoutBox)
            ) {
              i = this.target || Y();
              let e = nz(this.layout.layoutBox.x);
              (i.x.min = t.target.x.min), (i.x.max = i.x.min + e);
              let n = nz(this.layout.layoutBox.y);
              (i.y.min = t.target.y.min), (i.y.max = i.y.min + n);
            }
            sL(e, i),
              eQ(e, s),
              nW(this.projectionDeltaWithTransform, this.layoutCorrected, e, s);
          }
        }
        registerSharedNode(t, e) {
          this.sharedNodes.has(t) || this.sharedNodes.set(t, new sH()),
            this.sharedNodes.get(t).add(e);
          let i = e.options.initialPromotionConfig;
          e.promote({
            transition: i ? i.transition : void 0,
            preserveFollowOpacity:
              i && i.shouldPreserveFollowOpacity
                ? i.shouldPreserveFollowOpacity(e)
                : void 0,
          });
        }
        isLead() {
          let t = this.getStack();
          return !t || t.lead === this;
        }
        getLead() {
          let { layoutId: t } = this.options;
          return (t && this.getStack()?.lead) || this;
        }
        getPrevLead() {
          let { layoutId: t } = this.options;
          return t ? this.getStack()?.prevLead : void 0;
        }
        getStack() {
          let { layoutId: t } = this.options;
          if (t) return this.root.sharedNodes.get(t);
        }
        promote({
          needsReset: t,
          transition: e,
          preserveFollowOpacity: i,
        } = {}) {
          let n = this.getStack();
          n && n.promote(this, i),
            t && ((this.projectionDelta = void 0), (this.needsReset = !0)),
            e && this.setOptions({ transition: e });
        }
        relegate() {
          let t = this.getStack();
          return !!t && t.relegate(this);
        }
        resetSkewAndRotation() {
          let { visualElement: t } = this.options;
          if (!t) return;
          let e = !1,
            { latestValues: i } = t;
          if (
            ((i.z ||
              i.rotate ||
              i.rotateX ||
              i.rotateY ||
              i.rotateZ ||
              i.skewX ||
              i.skewY) &&
              (e = !0),
            !e)
          )
            return;
          let n = {};
          i.z && sG("z", t, n, this.animationValues);
          for (let e = 0; e < sX.length; e++)
            sG(`rotate${sX[e]}`, t, n, this.animationValues),
              sG(`skew${sX[e]}`, t, n, this.animationValues);
          for (let e in (t.render(), n))
            t.setStaticValue(e, n[e]),
              this.animationValues && (this.animationValues[e] = n[e]);
          t.scheduleRender();
        }
        applyProjectionStyles(t, e) {
          if (!this.instance || this.isSVG) return;
          if (!this.isVisible) {
            t.visibility = "hidden";
            return;
          }
          let i = this.getTransformTemplate();
          if (this.needsReset) {
            (this.needsReset = !1),
              (t.visibility = ""),
              (t.opacity = ""),
              (t.pointerEvents = il(e?.pointerEvents) || ""),
              (t.transform = i ? i(this.latestValues, "") : "none");
            return;
          }
          let n = this.getLead();
          if (!this.projectionDelta || !this.layout || !n.target) {
            this.options.layoutId &&
              ((t.opacity =
                void 0 !== this.latestValues.opacity
                  ? this.latestValues.opacity
                  : 1),
              (t.pointerEvents = il(e?.pointerEvents) || "")),
              this.hasProjected &&
                !eH(this.latestValues) &&
                ((t.transform = i ? i({}, "") : "none"),
                (this.hasProjected = !1));
            return;
          }
          t.visibility = "";
          let s = n.animationValues || n.latestValues;
          this.applyTransformsToTarget();
          let r = (function (t, e, i) {
            let n = "",
              s = t.x.translate / e.x,
              r = t.y.translate / e.y,
              o = i?.z || 0;
            if (
              ((s || r || o) && (n = `translate3d(${s}px, ${r}px, ${o}px) `),
              (1 !== e.x || 1 !== e.y) &&
                (n += `scale(${1 / e.x}, ${1 / e.y}) `),
              i)
            ) {
              let {
                transformPerspective: t,
                rotate: e,
                rotateX: s,
                rotateY: r,
                skewX: o,
                skewY: a,
              } = i;
              t && (n = `perspective(${t}px) ${n}`),
                e && (n += `rotate(${e}deg) `),
                s && (n += `rotateX(${s}deg) `),
                r && (n += `rotateY(${r}deg) `),
                o && (n += `skewX(${o}deg) `),
                a && (n += `skewY(${a}deg) `);
            }
            let a = t.x.scale * e.x,
              l = t.y.scale * e.y;
            return (
              (1 !== a || 1 !== l) && (n += `scale(${a}, ${l})`), n || "none"
            );
          })(this.projectionDeltaWithTransform, this.treeScale, s);
          i && (r = i(s, r)), (t.transform = r);
          let { x: o, y: a } = this.projectionDelta;
          for (let e in ((t.transformOrigin = `${100 * o.origin}% ${
            100 * a.origin
          }% 0`),
          n.animationValues
            ? (t.opacity =
                n === this
                  ? s.opacity ?? this.latestValues.opacity ?? 1
                  : this.preserveOpacity
                  ? this.latestValues.opacity
                  : s.opacityExit)
            : (t.opacity =
                n === this
                  ? void 0 !== s.opacity
                    ? s.opacity
                    : ""
                  : void 0 !== s.opacityExit
                  ? s.opacityExit
                  : 0),
          eI)) {
            if (void 0 === s[e]) continue;
            let { correct: i, applyTo: o, isCSSVariable: a } = eI[e],
              l = "none" === r ? s[e] : i(s[e], n);
            if (o) {
              let e = o.length;
              for (let i = 0; i < e; i++) t[o[i]] = l;
            } else
              a
                ? (this.options.visualElement.renderState.vars[e] = l)
                : (t[e] = l);
          }
          this.options.layoutId &&
            (t.pointerEvents =
              n === this ? il(e?.pointerEvents) || "" : "none");
        }
        clearSnapshot() {
          this.resumeFrom = this.snapshot = void 0;
        }
        resetTree() {
          this.root.nodes.forEach((t) => t.currentAnimation?.stop()),
            this.root.nodes.forEach(s5),
            this.root.sharedNodes.clear();
        }
      };
    }
    function sJ(t) {
      t.updateLayout();
    }
    function sQ(t) {
      let e = t.resumeFrom?.snapshot || t.snapshot;
      if (t.isLead() && t.layout && e && t.hasListeners("didUpdate")) {
        let { layoutBox: i, measuredBox: n } = t.layout,
          { animationType: s } = t.options,
          r = e.source !== t.layout.source;
        "size" === s
          ? nB((t) => {
              let n = r ? e.measuredBox[t] : e.layoutBox[t],
                s = nz(n);
              (n.min = i[t].min), (n.max = n.min + s);
            })
          : rl(s, e.layoutBox, i) &&
            nB((n) => {
              let s = r ? e.measuredBox[n] : e.layoutBox[n],
                o = nz(i[n]);
              (s.max = s.min + o),
                t.relativeTarget &&
                  !t.currentAnimation &&
                  ((t.isProjectionDirty = !0),
                  (t.relativeTarget[n].max = t.relativeTarget[n].min + o));
            });
        let o = H();
        nW(o, i, e.layoutBox);
        let a = H();
        r
          ? nW(a, t.applyTransform(n, !0), e.measuredBox)
          : nW(a, i, e.layoutBox);
        let l = !sO(o),
          h = !1;
        if (!t.resumeFrom) {
          let n = t.getClosestProjectingParent();
          if (n && !n.resumeFrom) {
            let { snapshot: s, layout: r } = n;
            if (s && r) {
              let o = Y();
              nq(o, e.layoutBox, s.layoutBox);
              let a = Y();
              nq(a, i, r.layoutBox),
                s$(o, a) || (h = !0),
                n.options.layoutRoot &&
                  ((t.relativeTarget = a),
                  (t.relativeTargetOrigin = o),
                  (t.relativeParent = n));
            }
          }
        }
        t.notifyListeners("didUpdate", {
          layout: i,
          snapshot: e,
          delta: a,
          layoutDelta: o,
          hasLayoutChanged: l,
          hasRelativeLayoutChanged: h,
        });
      } else if (t.isLead()) {
        let { onExitComplete: e } = t.options;
        e && e();
      }
      t.options.transition = void 0;
    }
    function s0(t) {
      t.parent &&
        (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty),
        t.isSharedProjectionDirty ||
          (t.isSharedProjectionDirty = !!(
            t.isProjectionDirty ||
            t.parent.isProjectionDirty ||
            t.parent.isSharedProjectionDirty
          )),
        t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
    }
    function s1(t) {
      t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
    }
    function s2(t) {
      t.clearSnapshot();
    }
    function s5(t) {
      t.clearMeasurements();
    }
    function s3(t) {
      t.isLayoutDirty = !1;
    }
    function s4(t) {
      let { visualElement: e } = t.options;
      e &&
        e.getProps().onBeforeLayoutMeasure &&
        e.notify("BeforeLayoutMeasure"),
        t.resetTransform();
    }
    function s6(t) {
      t.finishAnimation(),
        (t.targetDelta = t.relativeTarget = t.target = void 0),
        (t.isProjectionDirty = !0);
    }
    function s8(t) {
      t.resolveTargetDelta();
    }
    function s7(t) {
      t.calcProjection();
    }
    function s9(t) {
      t.resetSkewAndRotation();
    }
    function rt(t) {
      t.removeLeadSnapshot();
    }
    function re(t, e, i) {
      (t.translate = eF(e.translate, 0, i)),
        (t.scale = eF(e.scale, 1, i)),
        (t.origin = e.origin),
        (t.originPoint = e.originPoint);
    }
    function ri(t, e, i, n) {
      (t.min = eF(e.min, i.min, n)), (t.max = eF(e.max, i.max, n));
    }
    function rn(t) {
      return t.animationValues && void 0 !== t.animationValues.opacityExit;
    }
    let rs = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
      rr = (t) =>
        "undefined" != typeof navigator &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().includes(t),
      ro = rr("applewebkit/") && !rr("chrome/") ? Math.round : tT;
    function ra(t) {
      (t.min = ro(t.min)), (t.max = ro(t.max));
    }
    function rl(t, e, i) {
      return (
        "position" === t ||
        ("preserve-aspect" === t && !(0.2 >= Math.abs(sW(e) - sW(i))))
      );
    }
    function rh(t) {
      return t !== t.root && t.scroll?.wasRoot;
    }
    let ru = sZ({
        attachResizeListener: (t, e) => nO(t, "resize", e),
        measureScroll: () => ({
          x:
            document.documentElement.scrollLeft ||
            document.body?.scrollLeft ||
            0,
          y:
            document.documentElement.scrollTop || document.body?.scrollTop || 0,
        }),
        checkIsScrollRoot: () => !0,
      }),
      rc = { current: void 0 },
      rd = sZ({
        measureScroll: (t) => ({ x: t.scrollLeft, y: t.scrollTop }),
        defaultParent: () => {
          if (!rc.current) {
            let t = new ru({});
            t.mount(window),
              t.setOptions({ layoutScroll: !0 }),
              (rc.current = t);
          }
          return rc.current;
        },
        resetTransform: (t, e) => {
          t.style.transform = void 0 !== e ? e : "none";
        },
        checkIsScrollRoot: (t) =>
          "fixed" === window.getComputedStyle(t).position,
      });
    function rp(t, e) {
      let i = nK(t),
        n = new AbortController();
      return [i, { passive: !0, ...e, signal: n.signal }, () => n.abort()];
    }
    function rm(t, e, i) {
      let { props: n } = t;
      t.animationState &&
        n.whileHover &&
        t.animationState.setActive("whileHover", "Start" === i);
      let s = n["onHover" + i];
      s && tC.postRender(() => s(e, n8(e)));
    }
    function rf(t) {
      return nY(t) && "offsetHeight" in t;
    }
    let rg = (t, e) => !!e && (t === e || rg(t, e.parentElement)),
      rv = new WeakSet();
    function ry(t) {
      return (e) => {
        "Enter" === e.key && t(e);
      };
    }
    function rx(t, e) {
      t.dispatchEvent(
        new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 })
      );
    }
    function rw(t) {
      return n6(t) && !(nU.x || nU.y);
    }
    let rb = new WeakSet();
    function rS(t, e, i) {
      let { props: n } = t;
      if (t.current instanceof HTMLButtonElement && t.current.disabled) return;
      t.animationState &&
        n.whileTap &&
        t.animationState.setActive("whileTap", "Start" === i);
      let s = n["onTap" + ("End" === i ? "" : i)];
      s && tC.postRender(() => s(e, n8(e)));
    }
    let rj = new WeakMap(),
      rT = new WeakMap(),
      rk = (t) => {
        let e = rj.get(t.target);
        e && e(t);
      },
      rE = (t) => {
        t.forEach(rk);
      },
      rP = { some: 0, all: 1 },
      rC = (function (t, e) {
        if ("undefined" == typeof Proxy) return ij;
        let i = new Map(),
          n = (i, n) => ij(i, n, t, e);
        return new Proxy((t, e) => n(t, e), {
          get: (s, r) =>
            "create" === r
              ? n
              : (i.has(r) || i.set(r, ij(r, void 0, t, e)), i.get(r)),
        });
      })(
        {
          animation: {
            Feature: class extends iT {
              constructor(t) {
                super(t),
                  t.animationState ||
                    (t.animationState = (function (t) {
                      let e = (e) =>
                          Promise.all(
                            e.map(({ animation: e, options: i }) =>
                              (function (t, e, i = {}) {
                                let n;
                                if (
                                  (t.notify("AnimationStart", e),
                                  Array.isArray(e))
                                )
                                  n = Promise.all(e.map((e) => nA(t, e, i)));
                                else if ("string" == typeof e) n = nA(t, e, i);
                                else {
                                  let s =
                                    "function" == typeof e
                                      ? ik(t, e, i.custom)
                                      : e;
                                  n = Promise.all(nC(t, s, i));
                                }
                                return n.then(() => {
                                  t.notify("AnimationComplete", e);
                                });
                              })(t, e, i)
                            )
                          ),
                        i = nF(),
                        n = !0,
                        s = !1,
                        r = (e) => (i, n) => {
                          let s = ik(
                            t,
                            n,
                            "exit" === e ? t.presenceContext?.custom : void 0
                          );
                          if (s) {
                            let { transition: t, transitionEnd: e, ...n } = s;
                            i = { ...i, ...n, ...e };
                          }
                          return i;
                        };
                      function o(o) {
                        let { props: a } = t,
                          l =
                            (function t(e) {
                              if (!e) return;
                              if (!e.isControllingVariants) {
                                let i = (e.parent && t(e.parent)) || {};
                                return (
                                  void 0 !== e.props.initial &&
                                    (i.initial = e.props.initial),
                                  i
                                );
                              }
                              let i = {};
                              for (let t = 0; t < nL; t++) {
                                let n = eu[t],
                                  s = e.props[n];
                                (el(s) || !1 === s) && (i[n] = s);
                              }
                              return i;
                            })(t.parent) || {},
                          h = [],
                          u = new Set(),
                          c = {},
                          d = 1 / 0;
                        for (let e = 0; e < nR; e++) {
                          var p, m;
                          let f = nV[e],
                            g = i[f],
                            v = void 0 !== a[f] ? a[f] : l[f],
                            y = el(v),
                            x = f === o ? g.isActive : null;
                          !1 === x && (d = e);
                          let w = v === l[f] && v !== a[f] && y;
                          if (
                            (w &&
                              (n || s) &&
                              t.manuallyAnimateOnMount &&
                              (w = !1),
                            (g.protectedKeys = { ...c }),
                            (!g.isActive && null === x) ||
                              (!v && !g.prevProp) ||
                              ea(v) ||
                              "boolean" == typeof v)
                          )
                            continue;
                          if ("exit" === f && g.isActive && !0 !== x) {
                            g.prevResolvedValues &&
                              (c = { ...c, ...g.prevResolvedValues });
                            continue;
                          }
                          let b =
                              ((p = g.prevProp),
                              "string" == typeof (m = v)
                                ? m !== p
                                : !!Array.isArray(m) && !nN(m, p)),
                            S =
                              b ||
                              (f === o && g.isActive && !w && y) ||
                              (e > d && y),
                            j = !1,
                            T = Array.isArray(v) ? v : [v],
                            k = T.reduce(r(f), {});
                          !1 === x && (k = {});
                          let { prevResolvedValues: E = {} } = g,
                            P = { ...E, ...k },
                            C = (e) => {
                              (S = !0),
                                u.has(e) && ((j = !0), u.delete(e)),
                                (g.needsAnimating[e] = !0);
                              let i = t.getValue(e);
                              i && (i.liveStyle = !1);
                            };
                          for (let t in P) {
                            let e = k[t],
                              i = E[t];
                            if (!c.hasOwnProperty(t))
                              (iC(e) && iC(i) ? nN(e, i) : e === i)
                                ? void 0 !== e && u.has(t)
                                  ? C(t)
                                  : (g.protectedKeys[t] = !0)
                                : null != e
                                ? C(t)
                                : u.add(t);
                          }
                          (g.prevProp = v),
                            (g.prevResolvedValues = k),
                            g.isActive && (c = { ...c, ...k }),
                            (n || s) && t.blockInitialAnimation && (S = !1);
                          let M = w && b,
                            A = !M || j;
                          S &&
                            A &&
                            h.push(
                              ...T.map((e) => {
                                let i = { type: f };
                                if (
                                  "string" == typeof e &&
                                  (n || s) &&
                                  !M &&
                                  t.manuallyAnimateOnMount &&
                                  t.parent
                                ) {
                                  let { parent: n } = t,
                                    s = ik(n, e);
                                  if (n.enteringChildren && s) {
                                    let { delayChildren: e } =
                                      s.transition || {};
                                    i.delay = nM(n.enteringChildren, t, e);
                                  }
                                }
                                return { animation: e, options: i };
                              })
                            );
                        }
                        if (u.size) {
                          let e = {};
                          if ("boolean" != typeof a.initial) {
                            let i = ik(
                              t,
                              Array.isArray(a.initial)
                                ? a.initial[0]
                                : a.initial
                            );
                            i && i.transition && (e.transition = i.transition);
                          }
                          u.forEach((i) => {
                            let n = t.getBaseTarget(i),
                              s = t.getValue(i);
                            s && (s.liveStyle = !0), (e[i] = n ?? null);
                          }),
                            h.push({ animation: e });
                        }
                        let f = !!h.length;
                        return (
                          n &&
                            (!1 === a.initial || a.initial === a.animate) &&
                            !t.manuallyAnimateOnMount &&
                            (f = !1),
                          (n = !1),
                          (s = !1),
                          f ? e(h) : Promise.resolve()
                        );
                      }
                      return {
                        animateChanges: o,
                        setActive: function (e, n) {
                          if (i[e].isActive === n) return Promise.resolve();
                          t.variantChildren?.forEach((t) =>
                            t.animationState?.setActive(e, n)
                          ),
                            (i[e].isActive = n);
                          let s = o(e);
                          for (let t in i) i[t].protectedKeys = {};
                          return s;
                        },
                        setAnimateFunction: function (i) {
                          e = i(t);
                        },
                        getState: () => i,
                        reset: () => {
                          (i = nF()), (s = !0);
                        },
                      };
                    })(t));
              }
              updateAnimationControlsSubscription() {
                let { animate: t } = this.node.getProps();
                ea(t) && (this.unmountControls = t.subscribe(this.node));
              }
              mount() {
                this.updateAnimationControlsSubscription();
              }
              update() {
                let { animate: t } = this.node.getProps(),
                  { animate: e } = this.node.prevProps || {};
                t !== e && this.updateAnimationControlsSubscription();
              }
              unmount() {
                this.node.animationState.reset(), this.unmountControls?.();
              }
            },
          },
          exit: {
            Feature: class extends iT {
              constructor() {
                super(...arguments), (this.id = nI++);
              }
              update() {
                if (!this.node.presenceContext) return;
                let { isPresent: t, onExitComplete: e } =
                    this.node.presenceContext,
                  { isPresent: i } = this.node.prevPresenceContext || {};
                if (!this.node.animationState || t === i) return;
                let n = this.node.animationState.setActive("exit", !t);
                e &&
                  !t &&
                  n.then(() => {
                    e(this.id);
                  });
              }
              mount() {
                let { register: t, onExitComplete: e } =
                  this.node.presenceContext || {};
                e && e(this.id), t && (this.unmount = t(this.id));
              }
              unmount() {}
            },
          },
          inView: {
            Feature: class extends iT {
              constructor() {
                super(...arguments),
                  (this.hasEnteredView = !1),
                  (this.isInView = !1);
              }
              startObserver() {
                var t;
                let e;
                this.unmount();
                let { viewport: i = {} } = this.node.getProps(),
                  { root: n, margin: s, amount: r = "some", once: o } = i,
                  a = {
                    root: n ? n.current : void 0,
                    rootMargin: s,
                    threshold: "number" == typeof r ? r : rP[r],
                  },
                  l = (t) => {
                    let { isIntersecting: e } = t;
                    if (
                      this.isInView === e ||
                      ((this.isInView = e), o && !e && this.hasEnteredView)
                    )
                      return;
                    e && (this.hasEnteredView = !0),
                      this.node.animationState &&
                        this.node.animationState.setActive("whileInView", e);
                    let { onViewportEnter: i, onViewportLeave: n } =
                        this.node.getProps(),
                      s = e ? i : n;
                    s && s(t);
                  };
                return (
                  (t = this.node.current),
                  (e = (function ({ root: t, ...e }) {
                    let i = t || document;
                    rT.has(i) || rT.set(i, {});
                    let n = rT.get(i),
                      s = JSON.stringify(e);
                    return (
                      n[s] ||
                        (n[s] = new IntersectionObserver(rE, {
                          root: t,
                          ...e,
                        })),
                      n[s]
                    );
                  })(a)),
                  rj.set(t, l),
                  e.observe(t),
                  () => {
                    rj.delete(t), e.unobserve(t);
                  }
                );
              }
              mount() {
                this.startObserver();
              }
              update() {
                if ("undefined" == typeof IntersectionObserver) return;
                let { props: t, prevProps: e } = this.node;
                ["amount", "margin", "root"].some(
                  (function ({ viewport: t = {} }, { viewport: e = {} } = {}) {
                    return (i) => t[i] !== e[i];
                  })(t, e)
                ) && this.startObserver();
              }
              unmount() {}
            },
          },
          tap: {
            Feature: class extends iT {
              mount() {
                let { current: t } = this.node;
                if (!t) return;
                let { globalTapTarget: e, propagate: i } = this.node.props;
                this.unmount = (function (t, e, i = {}) {
                  let [n, s, r] = rp(t, i),
                    o = (t) => {
                      let n = t.currentTarget;
                      if (!rw(t) || rb.has(t)) return;
                      rv.add(n), i.stopPropagation && rb.add(t);
                      let r = e(n, t),
                        o = (t, e) => {
                          window.removeEventListener("pointerup", a),
                            window.removeEventListener("pointercancel", l),
                            rv.has(n) && rv.delete(n),
                            rw(t) &&
                              "function" == typeof r &&
                              r(t, { success: e });
                        },
                        a = (t) => {
                          o(
                            t,
                            n === window ||
                              n === document ||
                              i.useGlobalTarget ||
                              rg(n, t.target)
                          );
                        },
                        l = (t) => {
                          o(t, !1);
                        };
                      window.addEventListener("pointerup", a, s),
                        window.addEventListener("pointercancel", l, s);
                    };
                  return (
                    n.forEach((t) => {
                      ((i.useGlobalTarget ? window : t).addEventListener(
                        "pointerdown",
                        o,
                        s
                      ),
                      rf(t)) &&
                        (t.addEventListener("focus", (t) =>
                          ((t, e) => {
                            let i = t.currentTarget;
                            if (!i) return;
                            let n = ry(() => {
                              if (rv.has(i)) return;
                              rx(i, "down");
                              let t = ry(() => {
                                rx(i, "up");
                              });
                              i.addEventListener("keyup", t, e),
                                i.addEventListener(
                                  "blur",
                                  () => rx(i, "cancel"),
                                  e
                                );
                            });
                            i.addEventListener("keydown", n, e),
                              i.addEventListener(
                                "blur",
                                () => i.removeEventListener("keydown", n),
                                e
                              );
                          })(t, s)
                        ),
                        n3.has(t.tagName) ||
                          !0 === t.isContentEditable ||
                          t.hasAttribute("tabindex") ||
                          (t.tabIndex = 0));
                    }),
                    r
                  );
                })(
                  t,
                  (t, e) => (
                    rS(this.node, e, "Start"),
                    (t, { success: e }) =>
                      rS(this.node, t, e ? "End" : "Cancel")
                  ),
                  { useGlobalTarget: e, stopPropagation: i?.tap === !1 }
                );
              }
              unmount() {}
            },
          },
          focus: {
            Feature: class extends iT {
              constructor() {
                super(...arguments), (this.isActive = !1);
              }
              onFocus() {
                let t = !1;
                try {
                  t = this.node.current.matches(":focus-visible");
                } catch (e) {
                  t = !0;
                }
                t &&
                  this.node.animationState &&
                  (this.node.animationState.setActive("whileFocus", !0),
                  (this.isActive = !0));
              }
              onBlur() {
                this.isActive &&
                  this.node.animationState &&
                  (this.node.animationState.setActive("whileFocus", !1),
                  (this.isActive = !1));
              }
              mount() {
                this.unmount = iL(
                  nO(this.node.current, "focus", () => this.onFocus()),
                  nO(this.node.current, "blur", () => this.onBlur())
                );
              }
              unmount() {}
            },
          },
          hover: {
            Feature: class extends iT {
              mount() {
                let { current: t } = this.node;
                t &&
                  (this.unmount = (function (t, e, i = {}) {
                    let [n, s, r] = rp(t, i);
                    return (
                      n.forEach((t) => {
                        let i,
                          n = !1,
                          r = !1,
                          o = (e) => {
                            i && (i(e), (i = void 0)),
                              t.removeEventListener("pointerleave", l);
                          },
                          a = (t) => {
                            (n = !1),
                              window.removeEventListener("pointerup", a),
                              window.removeEventListener("pointercancel", a),
                              r && ((r = !1), o(t));
                          },
                          l = (t) => {
                            if ("touch" !== t.pointerType) {
                              if (n) {
                                r = !0;
                                return;
                              }
                              o(t);
                            }
                          };
                        t.addEventListener(
                          "pointerenter",
                          (n) => {
                            if ("touch" === n.pointerType || nU.x || nU.y)
                              return;
                            r = !1;
                            let o = e(t, n);
                            "function" == typeof o &&
                              ((i = o),
                              t.addEventListener("pointerleave", l, s));
                          },
                          s
                        ),
                          t.addEventListener(
                            "pointerdown",
                            () => {
                              (n = !0),
                                window.addEventListener("pointerup", a, s),
                                window.addEventListener("pointercancel", a, s);
                            },
                            s
                          );
                      }),
                      r
                    );
                  })(
                    t,
                    (t, e) => (
                      rm(this.node, e, "Start"), (t) => rm(this.node, t, "End")
                    )
                  ));
              }
              unmount() {}
            },
          },
          pan: {
            Feature: class extends iT {
              constructor() {
                super(...arguments), (this.removePointerDownListener = tT);
              }
              onPointerDown(t) {
                this.session = new si(t, this.createPanHandlers(), {
                  transformPagePoint: this.node.getTransformPagePoint(),
                  contextWindow: n9(this.node),
                });
              }
              createPanHandlers() {
                let {
                  onPanSessionStart: t,
                  onPanStart: e,
                  onPan: i,
                  onPanEnd: n,
                } = this.node.getProps();
                return {
                  onSessionStart: sf(t),
                  onStart: sf(e),
                  onMove: sf(i),
                  onEnd: (t, e) => {
                    delete this.session, n && tC.postRender(() => n(t, e));
                  },
                };
              }
              mount() {
                this.removePointerDownListener = n7(
                  this.node.current,
                  "pointerdown",
                  (t) => this.onPointerDown(t)
                );
              }
              update() {
                this.session &&
                  this.session.updateHandlers(this.createPanHandlers());
              }
              unmount() {
                this.removePointerDownListener(),
                  this.session && this.session.end();
              }
            },
          },
          drag: {
            Feature: class extends iT {
              constructor(t) {
                super(t),
                  (this.removeGroupControls = tT),
                  (this.removeListeners = tT),
                  (this.controls = new sd(t));
              }
              mount() {
                let { dragControls: t } = this.node.getProps();
                t && (this.removeGroupControls = t.subscribe(this.controls)),
                  (this.removeListeners = this.controls.addListeners() || tT);
              }
              update() {
                let { dragControls: t } = this.node.getProps(),
                  { dragControls: e } = this.node.prevProps || {};
                t !== e &&
                  (this.removeGroupControls(),
                  t && (this.removeGroupControls = t.subscribe(this.controls)));
              }
              unmount() {
                this.removeGroupControls(),
                  this.removeListeners(),
                  this.controls.isDragging || this.controls.endPanSession();
              }
            },
            ProjectionNode: rd,
            MeasureLayout: sb,
          },
          layout: { ProjectionNode: rd, MeasureLayout: sb },
        },
        (t, e) =>
          e.isSVG ?? e3(t)
            ? new ez(e)
            : new e1(e, { allowProjection: t !== e2.Fragment })
      );
    t.s(["motion", () => rC], 46932);
    var rM = e2;
    function rA(t, e) {
      if ("function" == typeof t) return t(e);
      null != t && (t.current = e);
    }
    class rL extends rM.Component {
      getSnapshotBeforeUpdate(t) {
        let e = this.props.childRef.current;
        if (
          rf(e) &&
          t.isPresent &&
          !this.props.isPresent &&
          !1 !== this.props.pop
        ) {
          let t = e.offsetParent,
            i = (rf(t) && t.offsetWidth) || 0,
            n = (rf(t) && t.offsetHeight) || 0,
            s = getComputedStyle(e),
            r = this.props.sizeRef.current;
          (r.height = parseFloat(s.height)),
            (r.width = parseFloat(s.width)),
            (r.top = e.offsetTop),
            (r.left = e.offsetLeft),
            (r.right = i - r.width - r.left),
            (r.bottom = n - r.height - r.top);
        }
        return null;
      }
      componentDidUpdate() {}
      render() {
        return this.props.children;
      }
    }
    function rN({
      children: t,
      isPresent: e,
      anchorX: i,
      anchorY: n,
      root: s,
      pop: r,
    }) {
      let o = (0, rM.useId)(),
        a = (0, rM.useRef)(null),
        l = (0, rM.useRef)({
          width: 0,
          height: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }),
        { nonce: h } = (0, rM.useContext)(e7),
        u = (function (...t) {
          return e2.useCallback(
            (function (...t) {
              return (e) => {
                let i = !1,
                  n = t.map((t) => {
                    let n = rA(t, e);
                    return i || "function" != typeof n || (i = !0), n;
                  });
                if (i)
                  return () => {
                    for (let e = 0; e < n.length; e++) {
                      let i = n[e];
                      "function" == typeof i ? i() : rA(t[e], null);
                    }
                  };
              };
            })(...t),
            t
          );
        })(a, t.props?.ref ?? t?.ref);
      return (
        (0, rM.useInsertionEffect)(() => {
          let {
            width: t,
            height: u,
            top: c,
            left: d,
            right: p,
            bottom: m,
          } = l.current;
          if (e || !1 === r || !a.current || !t || !u) return;
          let f = "left" === i ? `left: ${d}` : `right: ${p}`,
            g = "bottom" === n ? `bottom: ${m}` : `top: ${c}`;
          a.current.dataset.motionPopId = o;
          let v = document.createElement("style");
          h && (v.nonce = h);
          let y = s ?? document.head;
          return (
            y.appendChild(v),
            v.sheet &&
              v.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${t}px !important;
            height: ${u}px !important;
            ${f}px !important;
            ${g}px !important;
          }
        `),
            () => {
              y.contains(v) && y.removeChild(v);
            }
          );
        }, [e]),
        (0, e4.jsx)(rL, {
          isPresent: e,
          childRef: a,
          sizeRef: l,
          pop: r,
          children: !1 === r ? t : rM.cloneElement(t, { ref: u }),
        })
      );
    }
    let rV = ({
      children: t,
      initial: e,
      isPresent: i,
      onExitComplete: n,
      custom: s,
      presenceAffectsLayout: r,
      mode: o,
      anchorX: a,
      anchorY: l,
      root: h,
    }) => {
      let u = iu(rR),
        c = (0, e2.useId)(),
        d = !0,
        p = (0, e2.useMemo)(
          () => (
            (d = !1),
            {
              id: c,
              initial: e,
              isPresent: i,
              custom: s,
              onExitComplete: (t) => {
                for (let e of (u.set(t, !0), u.values())) if (!e) return;
                n && n();
              },
              register: (t) => (u.set(t, !1), () => u.delete(t)),
            }
          ),
          [i, u, n]
        );
      return (
        r && d && (p = { ...p }),
        (0, e2.useMemo)(() => {
          u.forEach((t, e) => u.set(e, !1));
        }, [i]),
        e2.useEffect(() => {
          i || u.size || !n || n();
        }, [i]),
        (t = (0, e4.jsx)(rN, {
          pop: "popLayout" === o,
          isPresent: i,
          anchorX: a,
          anchorY: l,
          root: h,
          children: t,
        })),
        (0, e4.jsx)(ih.Provider, { value: p, children: t })
      );
    };
    function rR() {
      return new Map();
    }
    let rD = (t) => t.key || "";
    function rF(t) {
      let e = [];
      return (
        e2.Children.forEach(t, (t) => {
          (0, e2.isValidElement)(t) && e.push(t);
        }),
        e
      );
    }
    let rI = ({
      children: t,
      custom: e,
      initial: i = !0,
      onExitComplete: n,
      presenceAffectsLayout: s = !0,
      mode: r = "sync",
      propagate: o = !1,
      anchorX: a = "left",
      anchorY: l = "top",
      root: h,
    }) => {
      let [u, c] = sy(o),
        d = (0, e2.useMemo)(() => rF(t), [t]),
        p = o && !u ? [] : d.map(rD),
        m = (0, e2.useRef)(!0),
        f = (0, e2.useRef)(d),
        g = iu(() => new Map()),
        v = (0, e2.useRef)(new Set()),
        [y, x] = (0, e2.useState)(d),
        [w, b] = (0, e2.useState)(d);
      iS(() => {
        (m.current = !1), (f.current = d);
        for (let t = 0; t < w.length; t++) {
          let e = rD(w[t]);
          p.includes(e)
            ? (g.delete(e), v.current.delete(e))
            : !0 !== g.get(e) && g.set(e, !1);
        }
      }, [w, p.length, p.join("-")]);
      let S = [];
      if (d !== y) {
        let t = [...d];
        for (let e = 0; e < w.length; e++) {
          let i = w[e],
            n = rD(i);
          p.includes(n) || (t.splice(e, 0, i), S.push(i));
        }
        return "wait" === r && S.length && (t = S), b(rF(t)), x(d), null;
      }
      let { forceRender: j } = (0, e2.useContext)(e6);
      return (0, e4.jsx)(e4.Fragment, {
        children: w.map((t) => {
          let y = rD(t),
            x = (!o || !!u) && (d === w || p.includes(y));
          return (0, e4.jsx)(
            rV,
            {
              isPresent: x,
              initial: (!m.current || !!i) && void 0,
              custom: e,
              presenceAffectsLayout: s,
              mode: r,
              root: h,
              onExitComplete: x
                ? void 0
                : () => {
                    if (v.current.has(y) || (v.current.add(y), !g.has(y)))
                      return;
                    g.set(y, !0);
                    let t = !0;
                    g.forEach((e) => {
                      e || (t = !1);
                    }),
                      t && (j?.(), b(f.current), o && c?.(), n && n());
                  },
              anchorX: a,
              anchorY: l,
              children: t,
            },
            y
          );
        }),
      });
    };
    t.s(["AnimatePresence", () => rI], 88653);
  },
  11458,
  (t) => {
    "use strict";
    var e = t.i(43476),
      i = t.i(71645),
      n = t.i(18566),
      s = t.i(3903),
      r = t.i(72136),
      o = t.i(49768),
      a = t.i(62496),
      l = t.i(22016),
      h = t.i(57688);
    function u() {
      return (0, e.jsx)(l.default, {
        href: "/",
        className: "flex-shrink-0 flex items-center justify-center",
        children: (0, e.jsx)("div", {
          className: "relative w-32 sm:w-28 md:w-36 lg:w-40",
          style: { height: "100%", display: "flex", alignItems: "center" },
          children: (0, e.jsx)(h.default, {
            src: "/assets/img/logo.png",
            alt: "Shortfundly logo",
            width: 160,
            height: 80,
            className:
              "object-contain transition-transform duration-300 hover:scale-105",
            priority: !0,
          }),
        }),
      });
    }
    function c({ show: t, onClose: i }) {
      let s = (0, n.useRouter)(),
        r = () => {
          let t = navigator.userAgent || navigator.vendor || window.opera || "";
          if (/Android/i.test(t)) {
            window.location.href =
              "https://play.google.com/store/apps/details?id=com.shortfundly&pcampaignid=web_share";
            return;
          }
          if (
            /(iPhone|iPad|iPod)/i.test(t) ||
            (/Macintosh/i.test(t) && /Mac OS X/i.test(t))
          ) {
            window.location.href =
              "https://apps.apple.com/us/app/shortfundly-shortfilms/id1200168569";
            return;
          }
          s.push("/get-the-app");
        };
      return t
        ? (0, e.jsx)("div", {
            className:
              "fixed left-0 top-0 z-[51] w-full bg-gradient-to-r from-primary to-red-700",
            children: (0, e.jsxs)("div", {
              className:
                "flex items-center px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 gap-2 sm:gap-3",
              children: [
                (0, e.jsx)("button", {
                  onClick: i,
                  className:
                    "flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-white/20 text-white/80 hover:bg-white/30 hover:text-white transition-all",
                  "aria-label": "Dismiss",
                  children: (0, e.jsx)("svg", {
                    className: "w-2.5 h-2.5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: (0, e.jsx)("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 3,
                      d: "M6 18L18 6M6 6l12 12",
                    }),
                  }),
                }),
                (0, e.jsx)("button", {
                  type: "button",
                  onClick: r,
                  className:
                    "flex-1 min-w-0 flex items-center justify-center gap-1.5 text-white text-[11px] sm:text-xs md:text-sm font-medium cursor-pointer hover:text-white/90",
                  children: (0, e.jsx)("span", {
                    className: "truncate",
                    children:
                      "Get the Shortfundly app on Google Play & App Store",
                  }),
                }),
                (0, e.jsx)("div", {
                  className: "flex-shrink-0",
                  children: (0, e.jsx)("button", {
                    type: "button",
                    onClick: r,
                    title: "Install Shortfundly App",
                    className:
                      "bg-white text-primary font-bold text-[10px] sm:text-[11px] px-3.5 sm:px-4 py-1 rounded-full active:scale-95 transition-all uppercase tracking-wide whitespace-nowrap hover:bg-white/90",
                    children: "Get App",
                  }),
                }),
              ],
            }),
          })
        : null;
    }
    var d = t.i(75254);
    let p = (0, d.default)("user", [
        [
          "path",
          { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" },
        ],
        ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }],
      ]),
      m = (0, d.default)("log-out", [
        ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
        ["path", { d: "M21 12H9", key: "dn1m92" }],
        [
          "path",
          { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" },
        ],
      ]);
    function f({ user: t, onLogout: n }) {
      let [s, r] = (0, i.useState)(!1),
        o = (0, i.useRef)(null);
      (0, i.useEffect)(() => {
        let t = (t) => {
          o.current && !o.current.contains(t.target) && r(!1);
        };
        return (
          document.addEventListener("mousedown", t),
          document.addEventListener("touchstart", t),
          () => {
            document.removeEventListener("mousedown", t),
              document.removeEventListener("touchstart", t);
          }
        );
      }, []);
      let a = t?.avatar || t?.photoUrl || null,
        u = t?.name || t?.email || "User",
        c = u.charAt(0).toUpperCase();
      return (0, e.jsxs)("div", {
        className: "relative",
        ref: o,
        children: [
          (0, e.jsx)("button", {
            className: "flex items-center space-x-2 p-1 md:p-2 cursor-pointer",
            onClick: () => r(!s),
            "aria-label": "User menu",
            "aria-expanded": s,
            children: (0, e.jsx)("div", {
              className:
                "w-8 h-8 md:w-10 md:h-10 relative rounded-full overflow-hidden border border-gray-300",
              children: a
                ? (0, e.jsx)(h.default, {
                    src: a,
                    alt: u,
                    fill: !0,
                    className: "object-cover",
                    sizes: "(max-width: 768px) 32px, 40px",
                  })
                : (0, e.jsx)("div", {
                    className:
                      "w-full h-full bg-gradient-to-br from-primary to-red-700 flex items-center justify-center text-white text-xs font-semibold",
                    children: c,
                  }),
            }),
          }),
          (0, e.jsx)("div", {
            className: `absolute right-0 mt-2 w-48 md:w-56 bg-white rounded-md shadow-lg transform transition-all duration-300 origin-top-right z-50 ${
              s
                ? "opacity-100 scale-100 visible"
                : "opacity-0 scale-95 invisible"
            }`,
            children: (0, e.jsxs)("ul", {
              className: "py-2 text-gray-700 text-sm",
              children: [
                (0, e.jsx)("li", {
                  className: "px-4 py-3 border-b border-gray-100",
                  children: (0, e.jsxs)("div", {
                    className: "flex items-center space-x-2",
                    children: [
                      (0, e.jsx)("div", {
                        className:
                          "w-8 h-8 relative rounded-full overflow-hidden border border-gray-300",
                        children: a
                          ? (0, e.jsx)(h.default, {
                              src: a,
                              alt: u,
                              fill: !0,
                              className: "object-cover",
                              sizes: "32px",
                            })
                          : (0, e.jsx)("div", {
                              className:
                                "w-full h-full bg-gradient-to-br from-primary to-red-700 flex items-center justify-center text-white text-xs font-semibold",
                              children: c,
                            }),
                      }),
                      (0, e.jsxs)("div", {
                        className: "flex-1 min-w-0",
                        children: [
                          (0, e.jsx)("p", {
                            className: "font-medium text-gray-900 truncate",
                            children: u,
                          }),
                          t?.email &&
                            t?.name &&
                            (0, e.jsx)("p", {
                              className: "text-xs text-gray-500 truncate",
                              children: t.email,
                            }),
                        ],
                      }),
                    ],
                  }),
                }),
                (0, e.jsx)("li", {
                  className:
                    "px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm",
                  onClick: () => r(!1),
                  children: (0, e.jsxs)(l.default, {
                    href: "/account/profile",
                    className: "flex items-center space-x-2 w-full",
                    children: [
                      (0, e.jsx)(p, { size: 16 }),
                      (0, e.jsx)("span", { children: "My Account" }),
                    ],
                  }),
                }),
                (0, e.jsx)("li", {
                  className:
                    "px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm",
                  onClick: () => r(!1),
                  children: (0, e.jsxs)(l.default, {
                    href: "/account/watchlist",
                    className: "flex items-center space-x-2 w-full",
                    children: [
                      (0, e.jsx)("svg", {
                        className: "w-4 h-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: (0, e.jsx)("path", {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z",
                        }),
                      }),
                      (0, e.jsx)("span", { children: "Watchlist" }),
                    ],
                  }),
                }),
                (0, e.jsxs)("li", {
                  onClick: () => {
                    r(!1), n();
                  },
                  className:
                    "px-4 py-2 border-t-2 border-red-500 text-red-600 hover:bg-gray-100 cursor-pointer flex items-center space-x-2 text-sm",
                  children: [
                    (0, e.jsx)(m, { size: 16 }),
                    (0, e.jsx)("span", { children: "Logout" }),
                  ],
                }),
              ],
            }),
          }),
        ],
      });
    }
    let g = (0, d.default)("house", [
        [
          "path",
          { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" },
        ],
        [
          "path",
          {
            d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
            key: "r6nss1",
          },
        ],
      ]),
      v = (0, d.default)("wrench", [
        [
          "path",
          {
            d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",
            key: "1ngwbx",
          },
        ],
      ]),
      y = (0, d.default)("ticket", [
        [
          "path",
          {
            d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
            key: "qn84l0",
          },
        ],
        ["path", { d: "M13 5v2", key: "dyzc3o" }],
        ["path", { d: "M13 17v2", key: "1ont0d" }],
        ["path", { d: "M13 11v2", key: "1wjjxi" }],
      ]),
      x = (0, d.default)("clapperboard", [
        ["path", { d: "m12.296 3.464 3.02 3.956", key: "qash78" }],
        [
          "path",
          {
            d: "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z",
            key: "1h7j8b",
          },
        ],
        [
          "path",
          { d: "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", key: "4lm6w1" },
        ],
        ["path", { d: "m6.18 5.276 3.1 3.899", key: "zjj9t3" }],
      ]),
      w = (0, d.default)("circuit-board", [
        [
          "rect",
          { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" },
        ],
        ["path", { d: "M11 9h4a2 2 0 0 0 2-2V3", key: "1ve2rv" }],
        ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
        ["path", { d: "M7 21v-4a2 2 0 0 1 2-2h4", key: "1fwkro" }],
        ["circle", { cx: "15", cy: "15", r: "2", key: "3i40o0" }],
      ]),
      b = (0, d.default)("video", [
        [
          "path",
          {
            d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
            key: "ftymec",
          },
        ],
        [
          "rect",
          { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" },
        ],
      ]),
      S = (0, d.default)("users", [
        [
          "path",
          { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" },
        ],
        ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
        ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
        ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
      ]),
      j = (0, d.default)("package", [
        [
          "path",
          {
            d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
            key: "1a0edw",
          },
        ],
        ["path", { d: "M12 22V12", key: "d0xqtd" }],
        ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
        ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
      ]),
      T = (0, d.default)("cloud-cog", [
        ["path", { d: "m10.852 19.772-.383.924", key: "r7sl7d" }],
        ["path", { d: "m13.148 14.228.383-.923", key: "1d5zpm" }],
        [
          "path",
          {
            d: "M13.148 19.772a3 3 0 1 0-2.296-5.544l-.383-.923",
            key: "1ydik7",
          },
        ],
        [
          "path",
          { d: "m13.53 20.696-.382-.924a3 3 0 1 1-2.296-5.544", key: "1m1vsf" },
        ],
        ["path", { d: "m14.772 15.852.923-.383", key: "660p6e" }],
        ["path", { d: "m14.772 18.148.923.383", key: "hrcpis" }],
        [
          "path",
          {
            d: "M4.2 15.1a7 7 0 1 1 9.93-9.858A7 7 0 0 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2",
            key: "j2q98n",
          },
        ],
        ["path", { d: "m9.228 15.852-.923-.383", key: "1p9ong" }],
        ["path", { d: "m9.228 18.148-.923.383", key: "6558rz" }],
      ]);
    function k({
      src: t = "/dots.png",
      alt: i = "Explore",
      size: n = 10,
      className: s = "",
    }) {
      return (0, e.jsxs)("span", {
        className: `inline-flex items-center justify-center ${s}`,
        "aria-hidden": "true",
        children: [
          (0, e.jsx)(h.default, {
            src: t,
            alt: i,
            width: n,
            height: n,
            className: "object-contain",
          }),
          (0, e.jsx)("span", { className: "sr-only", children: i }),
        ],
      });
    }
    let E = [
      {
        name: "Hub",
        items: [{ name: "Hub", href: "https://hub.shortfundly.com/", icon: w }],
      },
      {
        name: "Connect",
        items: [
          {
            name: "Connect",
            href: "https://connect.shortfundly.com/",
            icon: S,
          },
        ],
      },
      {
        name: "Play",
        items: [
          { name: "Play", href: "https://play.shortfundly.com/", icon: j },
        ],
      },
      {
        name: "OTT SAAS",
        items: [
          {
            name: "OTT SAAS",
            href: "https://ott.shortfundly.com/ott-saas",
            icon: T,
          },
        ],
      },
      {
        name: "Ticket",
        items: [
          { name: "Ticket", href: "https://ticket.shortfundly.com/", icon: y },
        ],
      },
      {
        name: "Rent",
        items: [
          { name: "Rent", href: "https://rent.shortfundly.com/", icon: g },
        ],
      },
      {
        name: "Shorts",
        items: [
          { name: "Shorts", href: "https://shorts.shortfundly.com/", icon: b },
        ],
      },
      {
        name: "Festival",
        items: [
          {
            name: "Festival",
            href: "https://festival.shortfundly.com/",
            icon: x,
          },
        ],
      },
      {
        name: "Tools",
        items: [
          { name: "Tools ", href: "https://tools.shortfundly.com/", icon: v },
        ],
      },
    ];
    function P() {
      let [t, n] = (0, i.useState)(!1),
        s = (0, i.useRef)(null);
      return (
        (0, i.useEffect)(() => {
          function e(t) {
            s.current && (s.current.contains(t.target) || n(!1));
          }
          return (
            t && document.addEventListener("mousedown", e),
            () => document.removeEventListener("mousedown", e)
          );
        }, [t]),
        (0, i.useEffect)(() => {
          function e(t) {
            "Escape" === t.key && n(!1);
          }
          return (
            t && document.addEventListener("keydown", e),
            () => document.removeEventListener("keydown", e)
          );
        }, [t]),
        (0, e.jsxs)("div", {
          className: "relative",
          ref: s,
          children: [
            (0, e.jsx)("button", {
              onClick: () => n((t) => !t),
              "aria-expanded": t,
              "aria-haspopup": "menu",
              className:
                "group flex items-center cursor-pointer ml-2 text-sm font-medium px-4 py-2 text-gray-700 hover:text-red-600 focus:outline-none transition-colors duration-300",
              children: (0, e.jsx)(k, {
                src: "/dots.png",
                alt: "Open explore menu",
                size: 20,
              }),
            }),
            (0, e.jsx)("div", {
              className: `fixed left-0 right-0 mt-5 bg-white shadow-xl z-50 transition-all duration-300 ease-in-out ${
                t
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 -translate-y-2 invisible"
              }`,
              role: "menu",
              "aria-label": "Explore",
              children: (0, e.jsx)("div", {
                className:
                  "max-w-screen-xl ml-6 lg:ml-20 justify-content-center items-center mx-auto px-4 py-8 overflow-x-auto",
                children: (0, e.jsx)("div", {
                  className: "grid grid-cols-2 md:grid-cols-5 gap-6 w-full",
                  children: E.map((t) =>
                    (0, e.jsx)(
                      "div",
                      {
                        className: "w-full min-w-0",
                        children: (0, e.jsx)("ul", {
                          className: "space-y-2 text-gray-600",
                          children: t.items.map((t) =>
                            (0, e.jsx)(
                              "li",
                              {
                                children: (0, e.jsxs)(l.default, {
                                  href: t.href,
                                  title: t.href.startsWith("http")
                                    ? `Go to ${t.name}`
                                    : t.name,
                                  className:
                                    "group flex items-center gap-4 py-1.5 hover:text-red-600 transition-all duration-200 truncate",
                                  onClick: () => n(!1),
                                  children: [
                                    (0, e.jsx)(t.icon, {
                                      className:
                                        "w-6 h-6 text-gray-500 group-hover:text-red-600 transition-colors duration-200",
                                    }),
                                    t.name,
                                  ],
                                }),
                              },
                              t.name
                            )
                          ),
                        }),
                      },
                      t.name
                    )
                  ),
                }),
              }),
            }),
          ],
        })
      );
    }
    let C = (0, d.default)("search", [
      ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
      ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
    ]);
    var M = t.i(74009);
    let A = ["'Short films'", "'Web series'", "'Movies'"],
      L = "Search for ",
      N = ({ searchQuery: t, setSearchQuery: s }) => {
        let r = (0, n.useRouter)(),
          o = (0, n.usePathname)(),
          a = (function (t = 768) {
            let [e, n] = (0, i.useState)(!1);
            return (
              (0, i.useEffect)(() => {
                let e = window.matchMedia(`(max-width: ${t - 1}px)`),
                  i = (t) => n(t.matches);
                return (
                  n(e.matches),
                  e.addEventListener("change", i),
                  () => e.removeEventListener("change", i)
                );
              }, [t]),
              e
            );
          })(),
          [l, h] = (0, i.useState)(t),
          [u, c] = (0, i.useState)(""),
          d = (0, i.useRef)(!0),
          p = (0, i.useRef)(0),
          m = (0, i.useRef)(0),
          f = (0, i.useMemo)(
            () =>
              (0, M.default)((t) => {
                if ((s(t), !a && "/search" === o)) {
                  let e = t
                    ? `/search?text=${encodeURIComponent(t)}`
                    : "/search";
                  r.push(e, { scroll: !1 });
                }
              }, 300),
            [s, r, o, a]
          );
        return (
          (0, i.useEffect)(() => (f(l), () => f.cancel()), [l, f]),
          (0, i.useEffect)(() => {
            h(t);
          }, [t]),
          (0, i.useEffect)(() => {
            let t;
            if (l) return void c("");
            let e = () => {
              let i = A[p.current];
              if (d.current)
                if (m.current < i.length) {
                  let n = m.current + 1;
                  (m.current = n),
                    c(`${L}${i.slice(0, n)}`),
                    (t = setTimeout(e, 100));
                } else (d.current = !1), (t = setTimeout(e, 1e3));
              else if (m.current > 0) {
                let n = m.current - 1;
                (m.current = n),
                  c(`${L}${i.slice(0, n)}`),
                  (t = setTimeout(e, 50));
              } else
                (p.current = (p.current + 1) % A.length),
                  (d.current = !0),
                  (t = setTimeout(e, 300));
            };
            return (
              (t = setTimeout(e, 300)),
              () => {
                clearTimeout(t);
              }
            );
          }, [l]),
          (0, e.jsxs)("div", {
            className: "relative w-full",
            children: [
              (0, e.jsx)("input", {
                type: "text",
                placeholder: u,
                value: l,
                onChange: (t) => h(t.target.value),
                onKeyDown: (t) => {
                  "Enter" === t.key &&
                    l.trim() &&
                    (s(l),
                    a ||
                      "/search" === o ||
                      r.push(`/search?text=${encodeURIComponent(l)}`, {
                        scroll: !1,
                      }));
                },
                onClick: (t) => {
                  t.stopPropagation(),
                    a || "/search" === o || r.push("/search", { scroll: !1 });
                },
                className:
                  "w-full bg-gray-100 py-2.5 pl-10 pr-4 focus:outline-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300",
              }),
              (0, e.jsx)(C, {
                className:
                  "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",
              }),
            ],
          })
        );
      };
    function V({ searchQuery: t, setSearchQuery: i }) {
      return (0, e.jsxs)("div", {
        className: "hidden md:flex items-center justify-center w-full h-full",
        children: [
          (0, e.jsx)("div", { className: "md:w-1/4" }),
          (0, e.jsx)("div", {
            className: "flex-1 flex justify-center items-center h-full",
            children: (0, e.jsx)("div", {
              className: "w-full max-w-2xl px-6",
              children: (0, e.jsx)(N, { searchQuery: t, setSearchQuery: i }),
            }),
          }),
          (0, e.jsx)("div", {
            className:
              "md:w-1/3 flex justify-end items-center h-full space-x-3",
            children: (0, e.jsx)(P, {}),
          }),
        ],
      });
    }
    let R = (0, d.default)("x", [
      ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
      ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
    ]);
    var D = t.i(46932),
      F = t.i(88653);
    let I = [
        {
          name: "Hub",
          items: [
            { name: "Hub", href: "https://hub.shortfundly.com/", icon: w },
          ],
        },
        {
          name: "Connect",
          items: [
            {
              name: "Connect",
              href: "https://connect.shortfundly.com/",
              icon: S,
            },
          ],
        },
        {
          name: "Play",
          items: [
            { name: "Play", href: "https://play.shortfundly.com/", icon: j },
          ],
        },
        {
          name: "OTT SAAS",
          items: [
            {
              name: "OTT SAAS",
              href: "https://ott.shortfundly.com/ott-saas",
              icon: T,
            },
          ],
        },
        {
          name: "Ticket",
          items: [
            {
              name: "Ticket",
              href: "https://ticket.shortfundly.com/",
              icon: y,
            },
          ],
        },
        {
          name: "Rent",
          items: [
            { name: "Rent", href: "https://rent.shortfundly.com/", icon: g },
          ],
        },
        {
          name: "Shorts",
          items: [
            {
              name: "Shorts",
              href: "https://shorts.shortfundly.com/",
              icon: b,
            },
          ],
        },
        {
          name: "Festival",
          items: [
            {
              name: "Festival",
              href: "https://festival.shortfundly.com/",
              icon: x,
            },
          ],
        },
        {
          name: "Tools",
          items: [
            { name: "Tools ", href: "https://tools.shortfundly.com/", icon: v },
          ],
        },
      ],
      B = [
        {
          label: "Hub",
          icon: "/icons/hub.png",
          href: "https://hub.shortfundly.com/",
          description: "Centralized content distribution",
        },
        {
          label: "Connect",
          icon: "/icons/connect.png",
          href: "https://connect.shortfundly.com/",
          description: "Professional networking platform",
        },
        {
          label: "Play",
          icon: "/icons/ott.png",
          href: "https://play.shortfundly.com/",
          description: "Complete OTT solution package",
        },
        {
          label: "OTTSaas",
          icon: "/icons/saas.png",
          href: "https://ott.shortfundly.com/ott-saas/",
          description: "OTT platform as a service",
        },
        {
          label: "Ticket",
          icon: "/icons/ticket.png",
          href: "https://ticket.shortfundly.com/",
          description: "Online ticket scheduling system",
        },
        {
          label: "Rent",
          icon: "/icons/rent.png",
          href: "https://rent.shortfundly.com",
          description: "Studio, Equipment rental platform",
        },
        {
          label: "Shorts",
          icon: "/icons/shorts.png",
          href: "https://shorts.shortfundly.com/",
          description: "Short video sharing platform",
        },
        {
          label: "Festival",
          icon: "/icons/festival.png",
          href: "https://festival.shortfundly.com/",
          description: "Film submission platform",
        },
        {
          label: "Tools",
          icon: "/icons/badge.png",
          href: "https://tools.shortfundly.com/",
          description: "Creative production tools",
        },
      ];
    function O({ sheetVh: t = 85, className: n = "", open: s, onToggle: r }) {
      let [o, a] = (0, i.useState)(!1),
        l = s ?? o,
        u = r ?? a,
        c = (0, i.useRef)(null),
        d = (0, i.useRef)(null);
      return (
        (0, i.useEffect)(() => {
          function t(t) {
            "Escape" === t.key && u(!1);
          }
          return (
            document.addEventListener("keydown", t),
            () => document.removeEventListener("keydown", t)
          );
        }, [u]),
        (0, i.useEffect)(() => {
          function t(t) {
            l &&
              d.current &&
              !d.current.contains(t.target) &&
              c.current &&
              !c.current.contains(t.target) &&
              u(!1);
          }
          return (
            document.addEventListener("mousedown", t),
            () => document.removeEventListener("mousedown", t)
          );
        }, [l, u]),
        (0, e.jsxs)("div", {
          className: `relative ${n}`,
          children: [
            (0, e.jsx)("button", {
              ref: c,
              type: "button",
              "aria-expanded": l,
              "aria-haspopup": "dialog",
              onClick: () => u(!l),
              className:
                "ml-2 p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center z-100",
              title: "Explore",
              children: (0, e.jsx)(k, {
                src: "/dots.png",
                alt: "Explore",
                size: 20,
              }),
            }),
            (0, e.jsx)(F.AnimatePresence, {
              children:
                l &&
                (0, e.jsxs)("div", {
                  className: "fixed inset-0 z-60",
                  children: [
                    (0, e.jsx)(D.motion.div, {
                      initial: { opacity: 0 },
                      animate: { opacity: 0.3 },
                      exit: { opacity: 0 },
                      transition: { duration: 0.2 },
                      className: "absolute inset-0 bg-black",
                      "aria-hidden": !0,
                      onClick: () => u(!1),
                    }),
                    (0, e.jsxs)(D.motion.div, {
                      ref: d,
                      role: "dialog",
                      "aria-label": "Explore products",
                      drag: "y",
                      dragConstraints: { top: 0, bottom: 0 },
                      onDragEnd: function (t, e) {
                        let { offset: i, velocity: n } = e;
                        (i.y > 150 || n.y > 800) && u(!1);
                      },
                      initial: { y: "100%" },
                      animate: { y: 0 },
                      exit: { y: "100%" },
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      },
                      className:
                        "absolute left-0 right-0 z-[65] mx-auto w-full rounded-t-2xl bg-white shadow-2xl flex flex-col",
                      style: {
                        bottom: "58px",
                        maxHeight: "calc(100vh - 158px)",
                      },
                      children: [
                        (0, e.jsxs)("div", {
                          className:
                            "flex-shrink-0 bg-white px-5 pt-5 pb-3 border-b border-gray-100 rounded-t-2xl flex justify-between items-center",
                          children: [
                            (0, e.jsxs)("div", {
                              children: [
                                (0, e.jsx)("h3", {
                                  className:
                                    "text-lg font-bold text-gray-900 leading-tight",
                                  children: "Explore Products",
                                }),
                                (0, e.jsx)("p", {
                                  className: "text-sm text-gray-500 mt-0.5",
                                  children: "Tap a product to open",
                                }),
                              ],
                            }),
                            (0, e.jsx)("button", {
                              "aria-label": "Close",
                              onClick: () => u(!1),
                              className: "p-2 rounded-full hover:bg-gray-100",
                              children: (0, e.jsx)(R, {
                                className: "w-5 h-5 text-gray-700",
                              }),
                            }),
                          ],
                        }),
                        (0, e.jsx)("div", {
                          className:
                            "flex-1 overflow-y-auto scrollbar-hide px-5 py-4 pb-6",
                          children: (0, e.jsx)("div", {
                            className:
                              "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3",
                            children: B.map((t) =>
                              (0, e.jsxs)(
                                "a",
                                {
                                  href: t.href,
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                  onClick: () => u(!1),
                                  className:
                                    "group flex items-start gap-3 rounded-xl px-3 py-3 bg-white border border-transparent hover:border-gray-100 hover:bg-gray-50 transition",
                                  children: [
                                    (0, e.jsx)("div", {
                                      className:
                                        "flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shadow-sm",
                                      children: (0, e.jsx)(h.default, {
                                        src: t.icon,
                                        alt: t.label,
                                        width: 36,
                                        height: 36,
                                        className: "object-contain",
                                      }),
                                    }),
                                    (0, e.jsxs)("div", {
                                      className: "min-w-0 text-left",
                                      children: [
                                        (0, e.jsx)("div", {
                                          className:
                                            "text-sm font-semibold text-gray-900 leading-tight truncate",
                                          children: t.label,
                                        }),
                                        t.description &&
                                          (0, e.jsx)("div", {
                                            className:
                                              "text-[12px] text-gray-500 mt-1 leading-snug",
                                            children: t.description,
                                          }),
                                      ],
                                    }),
                                  ],
                                },
                                t.label
                              )
                            ),
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
            }),
          ],
        })
      );
    }
    function U({
      session: t,
      user: s,
      isLoggedIn: r,
      onLogout: o,
      hasActiveSubscription: a,
      searchQuery: u,
      setSearchQuery: c,
    }) {
      let [d, f] = (0, i.useState)(!1),
        [g, v] = (0, i.useState)(!1),
        y = (0, i.useRef)(null),
        x = (0, n.usePathname)(),
        w = x?.startsWith("/message"),
        b = s?.avatar || s?.photoUrl || t?.user?.image || null,
        S = s?.name || s?.email || t?.user?.name || "User",
        j = s?.email || t?.user?.email || "",
        T = S.charAt(0).toUpperCase();
      return ((0, i.useEffect)(() => {
        function t(t) {
          d && y.current && !y.current.contains(t.target) && f(!1);
        }
        return (
          document.addEventListener("mousedown", t),
          () => document.removeEventListener("mousedown", t)
        );
      }, [d]),
      (0, i.useEffect)(
        () => (
          (document.body.style.overflow = d ? "hidden" : ""),
          () => {
            document.body.style.overflow = "";
          }
        ),
        [d]
      ),
      w)
        ? (0, e.jsxs)("div", {
            className:
              "flex md:hidden items-center space-x-1 absolute top-4 right-4",
            children: [
              (0, e.jsx)(l.default, {
                href: "/search",
                "aria-label": "Open Search",
                className: "p-2 rounded-full hover:bg-gray-100",
                children: (0, e.jsx)(C, { size: 20 }),
              }),
              (0, e.jsx)(O, {}),
            ],
          })
        : (0, e.jsxs)(e.Fragment, {
            children: [
              (0, e.jsxs)("div", {
                className:
                  "flex md:hidden items-center space-x-1 absolute top-4 right-4",
                children: [
                  (0, e.jsx)(l.default, {
                    href: "/search",
                    "aria-label": "Open Search",
                    className:
                      "p-2 rounded-full hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors",
                    children: (0, e.jsx)(C, { size: 20 }),
                  }),
                  (0, e.jsx)(O, {}),
                ],
              }),
              (0, e.jsx)(F.AnimatePresence, {
                children:
                  d &&
                  r &&
                  (0, e.jsxs)("div", {
                    className: "fixed inset-0 z-50",
                    children: [
                      (0, e.jsx)(D.motion.div, {
                        initial: { opacity: 0 },
                        animate: { opacity: 0.4 },
                        exit: { opacity: 0 },
                        transition: { duration: 0.2 },
                        className: "absolute inset-0 bg-black",
                        "aria-hidden": !0,
                        onClick: () => f(!1),
                      }),
                      (0, e.jsxs)(D.motion.div, {
                        ref: y,
                        role: "dialog",
                        "aria-label": "User menu",
                        drag: "y",
                        dragConstraints: { top: 0, bottom: 0 },
                        dragElastic: 0.2,
                        onDragEnd: function (t, e) {
                          let { offset: i, velocity: n } = e;
                          (i.y > 150 || n.y > 800) && f(!1);
                        },
                        initial: { y: "100%" },
                        animate: { y: 0 },
                        exit: { y: "100%" },
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        },
                        className:
                          "absolute left-0 right-0 bottom-0 z-50 mx-auto w-full rounded-t-2xl bg-white shadow-2xl max-h-[85vh] overflow-hidden",
                        children: [
                          (0, e.jsx)("div", {
                            className: "flex justify-center py-2",
                            children: (0, e.jsx)("div", {
                              className: "w-12 h-1 bg-gray-300 rounded-full",
                            }),
                          }),
                          (0, e.jsxs)("div", {
                            className:
                              "px-5 py-4 border-b border-gray-100 flex items-center justify-between",
                            children: [
                              (0, e.jsxs)("div", {
                                className: "flex items-center gap-3",
                                children: [
                                  (0, e.jsx)("div", {
                                    className:
                                      "w-12 h-12 relative rounded-full overflow-hidden border border-gray-300",
                                    children: b
                                      ? (0, e.jsx)(h.default, {
                                          src: b,
                                          alt: S,
                                          fill: !0,
                                          className: "object-cover",
                                          sizes: "48px",
                                        })
                                      : (0, e.jsx)("div", {
                                          className:
                                            "w-full h-full bg-gradient-to-br from-primary to-red-700 flex items-center justify-center text-white text-sm font-semibold",
                                          children: T,
                                        }),
                                  }),
                                  (0, e.jsxs)("div", {
                                    className: "min-w-0",
                                    children: [
                                      (0, e.jsx)("p", {
                                        className:
                                          "font-semibold text-gray-900 truncate",
                                        children: S,
                                      }),
                                      (0, e.jsx)("p", {
                                        className:
                                          "text-sm text-gray-500 truncate",
                                        children: j,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, e.jsx)("button", {
                                "aria-label": "Close",
                                onClick: () => f(!1),
                                className:
                                  "p-2 rounded-full hover:bg-gray-100 transition-colors",
                                children: (0, e.jsx)(R, {
                                  className: "w-5 h-5 text-gray-700",
                                }),
                              }),
                            ],
                          }),
                          (0, e.jsxs)("div", {
                            className:
                              "overflow-y-auto max-h-[calc(85vh-140px)]",
                            children: [
                              (0, e.jsx)("div", {
                                className: "border-b border-gray-100",
                                children: (0, e.jsx)(D.motion.div, {
                                  initial: !1,
                                  animate: g
                                    ? { height: "auto", opacity: 1 }
                                    : { height: 0, opacity: 0 },
                                  transition: { duration: 0.3 },
                                  className: "overflow-hidden",
                                  children: (0, e.jsx)("div", {
                                    className: "px-3 pb-3",
                                    children: I.map((t) =>
                                      (0, e.jsx)(
                                        "div",
                                        {
                                          className:
                                            "mb-3 rounded-lg overflow-hidden border border-gray-100",
                                          children: (0, e.jsx)("ul", {
                                            className:
                                              "divide-y divide-gray-100",
                                            children: t.items.map((t) =>
                                              (0, e.jsx)(
                                                "li",
                                                {
                                                  children: (0, e.jsxs)(
                                                    l.default,
                                                    {
                                                      href: t.href,
                                                      onClick: () => f(!1),
                                                      className:
                                                        "flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-50 transition-colors",
                                                      children: [
                                                        (0, e.jsx)(t.icon, {
                                                          className:
                                                            "w-5 h-5 text-gray-500",
                                                        }),
                                                        (0, e.jsx)("span", {
                                                          className:
                                                            "flex-1 truncate text-sm",
                                                          children: t.name,
                                                        }),
                                                      ],
                                                    }
                                                  ),
                                                },
                                                t.name
                                              )
                                            ),
                                          }),
                                        },
                                        t.name
                                      )
                                    ),
                                  }),
                                }),
                              }),
                              (0, e.jsxs)("ul", {
                                className: "text-gray-700",
                                children: [
                                  (0, e.jsx)("li", {
                                    className: "border-b border-gray-100",
                                    children: (0, e.jsxs)(l.default, {
                                      href: "/account/profile",
                                      className:
                                        "flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors text-sm",
                                      onClick: () => f(!1),
                                      children: [
                                        (0, e.jsx)("span", {
                                          className: "text-gray-500",
                                          children: (0, e.jsx)(p, { size: 16 }),
                                        }),
                                        (0, e.jsx)("span", {
                                          children: "My Account",
                                        }),
                                      ],
                                    }),
                                  }),
                                  (0, e.jsx)("li", {
                                    className: "border-b border-gray-100",
                                    children: (0, e.jsxs)(l.default, {
                                      href: "/account/watchlist",
                                      className:
                                        "flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors text-sm",
                                      onClick: () => f(!1),
                                      children: [
                                        (0, e.jsx)("span", {
                                          className: "text-gray-500",
                                          children: (0, e.jsx)("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: (0, e.jsx)("path", {
                                              strokeLinecap: "round",
                                              strokeLinejoin: "round",
                                              strokeWidth: 2,
                                              d: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z",
                                            }),
                                          }),
                                        }),
                                        (0, e.jsx)("span", {
                                          children: "Watchlist",
                                        }),
                                      ],
                                    }),
                                  }),
                                  (0, e.jsx)("li", {
                                    className: "border-b border-gray-100",
                                    children: (0, e.jsxs)(l.default, {
                                      href: "/subscription",
                                      className:
                                        "flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors text-sm",
                                      onClick: () => f(!1),
                                      children: [
                                        (0, e.jsx)("span", {
                                          className: "text-gray-500",
                                          children: (0, e.jsxs)("svg", {
                                            className: "w-4 h-4",
                                            fill: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: [
                                              (0, e.jsx)("path", {
                                                d: "M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z",
                                              }),
                                              (0, e.jsx)("path", {
                                                d: "M5 19a1 1 0 011-1h12a1 1 0 011 1v1a1 1 0 01-1 1H6a1 1 0 01-1-1v-1z",
                                              }),
                                            ],
                                          }),
                                        }),
                                        (0, e.jsx)("span", {
                                          children: a
                                            ? "Manage Premium"
                                            : "Go Premium",
                                        }),
                                      ],
                                    }),
                                  }),
                                ],
                              }),
                              (0, e.jsx)("div", {
                                className: "border-t border-gray-100",
                                children: (0, e.jsxs)("button", {
                                  onClick: (t) => {
                                    t.preventDefault(), f(!1), o();
                                  },
                                  className:
                                    "flex items-center gap-3 px-5 py-4 text-red-600 hover:bg-red-50 transition-colors text-sm w-full text-left",
                                  children: [
                                    (0, e.jsx)(m, {
                                      size: 16,
                                      className: "text-red-500",
                                    }),
                                    (0, e.jsx)("span", { children: "Logout" }),
                                  ],
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
              }),
            ],
          });
    }
    var z = t.i(24871),
      $ = t.i(83953),
      W = t.i(3349);
    function _() {
      let t = (0, n.useRouter)(),
        l = (0, n.usePathname)(),
        [h, d] = (0, i.useState)(""),
        [p, m] = (0, i.useState)(!1),
        [g, v] = (0, i.useState)(null),
        [y, x] = (0, i.useState)(!0),
        [w, b] = (0, i.useState)(!1),
        [S, j] = (0, i.useState)(!1),
        T = (0, i.useRef)(!1),
        k = (0, i.useRef)(null),
        E = (0, i.useRef)(0);
      (0, i.useEffect)(() => {
        let t = () => {
          let t =
              (0, s.getCookie)("SF_TOKEN") || localStorage.getItem("SF_TOKEN"),
            e =
              (0, s.getCookie)("SF_VERIFICATION") ||
              localStorage.getItem("SF_VERIFICATION");
          t && e
            ? m((t) => {
                let e = (0, r.getClientUser)(),
                  i = null;
                if (e) i = e;
                else {
                  let t = (0, s.getCookie)("SF_USER");
                  if (t)
                    try {
                      i = "string" == typeof t ? JSON.parse(t) : t;
                    } catch {}
                }
                if (i) {
                  v((t) => (JSON.stringify(t) !== JSON.stringify(i) ? i : t));
                  let t = i.id || i._id || i.gid || i.email;
                  if (t) {
                    let e = (0, W.getUserSessionCache)();
                    if (e) b(e.hasSubscription);
                    else {
                      let e = (0, a.getCachedSubscription)(t);
                      null !== e
                        ? b(e)
                        : b((0, a.checkSubscriptionFromUserData)(i));
                    }
                  } else b((0, a.checkSubscriptionFromUserData)(i));
                }
                return !0;
              })
            : (m(!1),
              v(null),
              b(!1),
              (0, W.invalidateUserSessionCache)(),
              (k.current = null),
              (T.current = !1),
              (E.current = 0));
        };
        t();
        let e = setInterval(t, 5e3),
          i = () => t(),
          n = () => t(),
          o = (0, $.subscribeEvent)("auth_changed", () => t()),
          l = (0, $.subscribeEvent)("subscription_updated", () => t());
        return (
          window.addEventListener("storage", i),
          window.addEventListener("auth-changed", n),
          window.addEventListener("focus", t),
          () => {
            clearInterval(e),
              window.removeEventListener("storage", i),
              window.removeEventListener("auth-changed", n),
              window.removeEventListener("focus", t),
              o(),
              l();
          }
        );
      }, []);
      let P = (0, i.useCallback)(
        async (t = !1, e = 0) => {
          if (!p || !g) {
            b(!1), (T.current = !1), (E.current = 0);
            return;
          }
          if (T.current && !t) return;
          let i = g.id || g._id || g.gid || g.email;
          if (!i) return void b(!1);
          let n = (0, W.getUserSessionCache)();
          if (!t && n) return void b(n.hasSubscription);
          if (!t && k.current === i) {
            let t = (0, a.getCachedSubscription)(i);
            if (null !== t) return void b(t);
          }
          let s = (0, a.checkSubscriptionFromUserData)(g);
          !t &&
            s &&
            (b(s),
            (0, a.setCachedSubscription)(i, s),
            (0, W.setUserSessionCache)({
              isAuthenticated: !0,
              hasSubscription: s,
            })),
            (T.current = !0),
            (k.current = i);
          try {
            let t = await o.accountServiceClient.getProfile();
            if (t.error || !1 === t.status || !1 === t.success) {
              if (
                t.error?.code === "HTTP_401" ||
                t.error?.code === "HTTP_403" ||
                t.error?.status === 401 ||
                t.error?.status === 403
              ) {
                b(!1),
                  (0, a.clearCachedSubscription)(i),
                  (T.current = !1),
                  (E.current = 0);
                return;
              }
              let n = (0, a.getCachedSubscription)(i);
              if (
                (null !== n ? b(n) : b((0, a.checkSubscriptionFromUserData)(g)),
                e < 3)
              ) {
                E.current = e + 1;
                let t = Math.min(1e3 * Math.pow(2, e), 5e3);
                setTimeout(() => P(!1, e + 1), t);
                return;
              }
              (T.current = !1), (E.current = 0);
              return;
            }
            let n = t.data || t.payload || t;
            if (n && "object" == typeof n && "email" in n) {
              let t = n.subscription,
                e = !1;
              if (t && t.subscriptionId && "" !== t.subscriptionId) {
                let i = t.expireDate ? new Date(t.expireDate) : null;
                e =
                  (!0 === t.isPaid ||
                    "true" === t.isPaid ||
                    !0 === t.ispaid ||
                    "true" === t.ispaid) &&
                  (!i || new Date() < i);
              } else
                e =
                  !0 === n.isSubscriptionActive ||
                  (t && "Active" === t.active) ||
                  (t && "active" === t.active);
              b(e),
                (0, a.setCachedSubscription)(i, e),
                (0, W.setUserSessionCache)({
                  isAuthenticated: !0,
                  hasSubscription: e,
                }),
                (E.current = 0);
            }
          } catch (n) {
            let t = g.id || g._id || g.gid || g.email,
              i = (0, a.getCachedSubscription)(t || "");
            if (
              (null !== i ? b(i) : b((0, a.checkSubscriptionFromUserData)(g)),
              e < 3)
            ) {
              (E.current = e + 1),
                setTimeout(
                  () => P(!1, e + 1),
                  Math.min(1e3 * Math.pow(2, e), 5e3)
                );
              return;
            }
            (n?.status === 401 || n?.status === 403) &&
              (t && (0, a.clearCachedSubscription)(t), b(!1)),
              (E.current = 0);
          } finally {
            T.current = !1;
          }
        },
        [
          p,
          g,
          a.getCachedSubscription,
          a.setCachedSubscription,
          a.clearCachedSubscription,
          a.checkSubscriptionFromUserData,
        ]
      );
      (0, i.useEffect)(() => {
        if (p && g) {
          let t = g.id || g._id || g.gid || g.email;
          k.current !== t && (k.current = null), P();
        } else b(!1), (k.current = null);
      }, [p, g, P]),
        (0, i.useEffect)(() => {
          let t = () => {
            if (g) {
              let t = g.id || g._id || g.gid || g.email;
              t && (0, a.clearCachedSubscription)(t),
                (k.current = null),
                (E.current = 0),
                P(!0, 0);
            }
          };
          window.addEventListener("subscription-updated", t);
          let e = null;
          return (
            l &&
              !l.includes("/subscription") &&
              p &&
              g &&
              (e = setTimeout(() => {
                let t = g.id || g._id || g.gid || g.email;
                t && (0, a.clearCachedSubscription)(t),
                  (k.current = null),
                  (E.current = 0),
                  P(!0, 0);
              }, 1500)),
            () => {
              window.removeEventListener("subscription-updated", t),
                e && clearTimeout(e);
            }
          );
        }, [l, p, g, P, a.clearCachedSubscription]);
      let C = () => {
        (0, r.clearClientAuth)(),
          "undefined" != typeof document &&
            ((document.cookie =
              "SF_TOKEN=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"),
            (document.cookie =
              "SF_VERIFICATION=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"),
            (document.cookie =
              "SF_USER=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT")),
          m(!1),
          v(null),
          (0, W.invalidateUserSessionCache)(),
          (0, $.emitEvent)("auth_changed", { source: "logout" }),
          (0, z.safeNavigate)(t, "/"),
          t.refresh();
      };
      (0, i.useEffect)(() => {
        j(!1);
      }, [l, p, w]),
        (0, i.useEffect)(() => {
          let t = () => j(!1);
          return (
            window.addEventListener("focus", t),
            window.addEventListener("popstate", t),
            () => {
              window.removeEventListener("focus", t),
                window.removeEventListener("popstate", t);
            }
          );
        }, []);
      let M =
        p && g
          ? {
              user: {
                name: g.name || g.email || null,
                email: g.email || null,
                image: g.avatar || g.photoUrl || null,
              },
            }
          : null;
      return (0, e.jsxs)(e.Fragment, {
        children: [
          (0, e.jsx)(c, { show: y, onClose: () => x(!1) }),
          (0, e.jsx)("nav", {
            className: `fixed left-0 w-full h-16 md:h-20 flex items-center justify-center border-b border-gray-300 shadow-sm bg-white z-50 transition-all duration-300 ${
              y ? "top-[37px] sm:top-[43px]" : "top-0"
            }`,
            children: (0, e.jsxs)("div", {
              className:
                "flex items-center justify-between w-full h-full px-4 sm:px-6 md:px-8 gap-4",
              children: [
                (0, e.jsx)(u, {}),
                (0, e.jsx)(V, {
                  searchQuery: h,
                  setSearchQuery: d,
                  isLoggedIn: p,
                }),
                (0, e.jsxs)("div", {
                  className:
                    "hidden md:flex items-center justify-center h-full space-x-3 relative",
                  children: [
                    (0, e.jsxs)("button", {
                      type: "button",
                      onClick: () => {
                        if (!S) {
                          if ((j(!0), !p)) {
                            let e = l || "/";
                            (0, z.safeNavigate)(
                              t,
                              (0, z.buildSignInUrl)(e, "subscribe")
                            );
                            return;
                          }
                          (0, z.safeNavigate)(t, "/subscription");
                        }
                      },
                      disabled: S,
                      title: w ? "Manage plan" : "Subscribe",
                      className: `group flex items-center gap-1.5 font-semibold px-4 sm:px-5 py-2.5 rounded-lg transition-all duration-200 text-sm sm:text-base active:scale-[0.97] whitespace-nowrap ${
                        w
                          ? "bg-amber-500 hover:bg-amber-600 text-black shadow-md shadow-amber-500/20"
                          : "bg-transparent border border-amber-500/70 text-amber-600 hover:bg-amber-500/10"
                      }`,
                      children: [
                        (0, e.jsxs)("svg", {
                          className: "w-3.5 h-3.5 flex-shrink-0",
                          fill: "currentColor",
                          viewBox: "0 0 24 24",
                          children: [
                            (0, e.jsx)("path", {
                              d: "M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z",
                            }),
                            (0, e.jsx)("path", {
                              d: "M5 19a1 1 0 011-1h12a1 1 0 011 1v1a1 1 0 01-1 1H6a1 1 0 01-1-1v-1z",
                            }),
                          ],
                        }),
                        (0, e.jsx)("span", {
                          className: "truncate",
                          children: w ? "My Plan" : "Subscribe",
                        }),
                      ],
                    }),
                    M?.user ? (0, e.jsx)(f, { user: g, onLogout: C }) : null,
                  ],
                }),
                (0, e.jsx)("div", {
                  className: "flex md:hidden items-center space-x-2",
                  children: (0, e.jsx)("div", {
                    className: "flex md:hidden items-center space-x-2",
                    children: (0, e.jsx)(U, {
                      session: M,
                      user: g,
                      isLoggedIn: p,
                      onLogout: C,
                      hasActiveSubscription: w,
                      searchQuery: h,
                      setSearchQuery: d,
                    }),
                  }),
                }),
              ],
            }),
          }),
          (0, e.jsx)("div", {
            className: `${
              y ? "h-[101px] sm:h-[107px] md:h-[123px]" : "h-[64px] md:h-[80px]"
            } transition-all duration-300`,
          }),
        ],
      });
    }
    t.s(["Navbar", () => _], 11458);
  },
  304,
  (t) => {
    "use strict";
    var e = t.i(43476),
      i = t.i(71645),
      n = t.i(18566),
      s = t.i(22016),
      r = t.i(57688),
      o = t.i(3903),
      a = t.i(72136),
      l = t.i(49768),
      h = t.i(62496),
      u = t.i(46932),
      c = t.i(88653);
    function d() {
      let t = (0, n.usePathname)(),
        d = (0, n.useRouter)(),
        [p, m] = (0, i.useState)(!1),
        [f, g] = (0, i.useState)(null),
        [v, y] = (0, i.useState)(!1),
        [x, w] = (0, i.useState)(!1),
        b = (0, i.useRef)(null);
      (0, i.useEffect)(() => {
        let t = () => {
          let t =
              (0, o.getCookie)("SF_TOKEN") || localStorage.getItem("SF_TOKEN"),
            e =
              (0, o.getCookie)("SF_VERIFICATION") ||
              localStorage.getItem("SF_VERIFICATION"),
            i = (0, a.getClientUser)(),
            n = (0, o.getCookie)("SF_USER"),
            s = i;
          if (!s && n)
            try {
              s = "string" == typeof n ? JSON.parse(n) : null;
            } catch {
              s = null;
            }
          (t && e) || s
            ? (m(!0), g(s), y((0, h.checkSubscriptionFromUserData)(s)))
            : (m(!1), g(null), y(!1));
        };
        t();
        let e = () => t(),
          i = () => t();
        return (
          window.addEventListener("storage", e),
          window.addEventListener("auth-changed", i),
          window.addEventListener("focus", t),
          () => {
            window.removeEventListener("storage", e),
              window.removeEventListener("auth-changed", i),
              window.removeEventListener("focus", t);
          }
        );
      }, []),
        (0, i.useEffect)(() => {
          if (!p || !f) return void y(!1);
          let t = !0;
          return (
            (async function () {
              try {
                let e = await l.accountServiceClient.getProfile(),
                  i = e.data || e.payload || e;
                t && y((0, h.checkSubscriptionFromUserData)(i));
              } catch {
                t && y((0, h.checkSubscriptionFromUserData)(f));
              }
            })(),
            () => {
              t = !1;
            }
          );
        }, [p, f]);
      let S = (e) =>
          "/" === e ? "/home" === t || "/" === t : t?.startsWith(e),
        j = () => w(!1);
      (0, i.useEffect)(() => {
        w(!1);
      }, [t]),
        (0, i.useEffect)(() => {
          if (!x) return;
          let t = (t) => {
            let e = t.target;
            b.current && !b.current.contains(e) && j();
          };
          return (
            document.addEventListener("mousedown", t),
            () => document.removeEventListener("mousedown", t)
          );
        }, [x]);
      let T = f?.name || f?.email || "User",
        k = f?.email || "",
        E = (f?.name || f?.email || "U").toString().charAt(0).toUpperCase(),
        P = f?.avatar || null;
      return (0, e.jsxs)(e.Fragment, {
        children: [
          (0, e.jsx)("nav", {
            className:
              "lg:hidden fixed bottom-0 left-0 right-0 z-[63] bg-[#0a0a0a] border-t border-white/[0.08]",
            style: { paddingBottom: "env(safe-area-inset-bottom, 0px)" },
            children: (0, e.jsxs)("div", {
              className:
                "flex items-center justify-around h-[58px] px-4 sm:px-6 max-w-[100vw]",
              children: [
                (0, e.jsxs)(s.default, {
                  href: "/",
                  title: "Go to home",
                  className: `relative flex flex-col items-center justify-center flex-1 h-full min-w-[52px] transition-colors active:scale-95 ${
                    S("/") ? "text-white" : "text-gray-500"
                  }`,
                  children: [
                    (0, e.jsxs)("svg", {
                      className: "h-6 w-6 mb-1",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: 2,
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      viewBox: "0 0 24 24",
                      "aria-hidden": !0,
                      children: [
                        (0, e.jsx)("path", {
                          d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
                        }),
                        (0, e.jsx)("path", {
                          d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
                        }),
                      ],
                    }),
                    (0, e.jsx)("span", {
                      className: `text-[10px] leading-tight ${
                        S("/") ? "font-semibold" : "font-medium"
                      }`,
                      children: "Home",
                    }),
                  ],
                }),
                p &&
                  (0, e.jsxs)(s.default, {
                    href: "/subscription",
                    title: v
                      ? "Manage Premium subscription"
                      : "Subscribe to Premium",
                    className:
                      "relative flex flex-col items-center justify-center flex-1 h-full min-w-[68px] active:scale-95 transition-transform",
                    children: [
                      (0, e.jsx)("div", {
                        className: `relative flex items-center justify-center w-7 h-7 mb-1 rounded-full shadow-lg ${
                          v
                            ? S("/subscription")
                              ? "bg-amber-500 shadow-amber-500/40"
                              : "bg-amber-500 shadow-amber-500/30"
                            : S("/subscription")
                            ? "bg-transparent border border-amber-500 shadow-amber-500/20"
                            : "bg-transparent border border-amber-500/70 shadow-amber-500/10"
                        }`,
                        children: (0, e.jsxs)("svg", {
                          className: `w-[22px] h-[22px] ${
                            v ? "text-black" : "text-amber-400"
                          }`,
                          fill: "currentColor",
                          viewBox: "0 0 24 24",
                          children: [
                            (0, e.jsx)("path", {
                              d: "M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z",
                            }),
                            (0, e.jsx)("path", {
                              d: "M5 19a1 1 0 011-1h12a1 1 0 011 1v1a1 1 0 01-1 1H6a1 1 0 01-1-1v-1z",
                            }),
                          ],
                        }),
                      }),
                      (0, e.jsx)("span", {
                        className: `mt-0.5 whitespace-nowrap text-[9px] font-bold leading-tight ${
                          S("/subscription")
                            ? "text-amber-400"
                            : "text-amber-500"
                        }`,
                        children: v ? "Premium" : "Subscribe",
                      }),
                    ],
                  }),
                p
                  ? (0, e.jsxs)("button", {
                      type: "button",
                      onClick: () => w(!0),
                      title: "Profile menu",
                      className: `relative flex flex-col items-center justify-center flex-1 h-full min-w-[52px] transition-colors active:scale-95 ${
                        S("/account") || S("/auth")
                          ? "text-white"
                          : "text-gray-500"
                      }`,
                      children: [
                        f
                          ? (0, e.jsx)("div", {
                              className: `w-6 h-6 mb-1 rounded-full overflow-hidden border-2 ${
                                S("/account")
                                  ? "border-primary"
                                  : "border-transparent"
                              }`,
                              children: f.avatar
                                ? (0, e.jsx)(r.default, {
                                    src: f.avatar,
                                    alt: "",
                                    width: 24,
                                    height: 24,
                                    className: "w-full h-full object-cover",
                                    unoptimized: !0,
                                  })
                                : (0, e.jsx)("div", {
                                    className:
                                      "w-full h-full bg-gradient-to-br from-primary to-red-700 flex items-center justify-center text-white text-[10px] font-bold",
                                    children: (f.name || f.email || "U")
                                      .charAt(0)
                                      .toUpperCase(),
                                  }),
                            })
                          : null,
                        (0, e.jsx)("span", {
                          className: `text-[10px] leading-tight ${
                            S("/account") || S("/auth")
                              ? "font-semibold"
                              : "font-medium"
                          }`,
                          children: "Profile",
                        }),
                      ],
                    })
                  : (0, e.jsxs)(s.default, {
                      href: "/auth/signin",
                      title: "Login to Shortfundly",
                      className:
                        "relative flex flex-col items-center justify-center flex-1 h-full min-w-[52px] transition-colors active:scale-95 text-gray-500",
                      children: [
                        (0, e.jsxs)("svg", {
                          className: "h-6 w-6 mb-1",
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: 2,
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          viewBox: "0 0 24 24",
                          "aria-hidden": !0,
                          children: [
                            (0, e.jsx)("path", { d: "m10 17 5-5-5-5" }),
                            (0, e.jsx)("path", { d: "M15 12H3" }),
                            (0, e.jsx)("path", {
                              d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",
                            }),
                          ],
                        }),
                        (0, e.jsx)("span", {
                          className: "text-[10px] leading-tight font-medium",
                          children: "Login",
                        }),
                      ],
                    }),
              ],
            }),
          }),
          (0, e.jsx)(c.AnimatePresence, {
            children:
              x &&
              p &&
              (0, e.jsxs)("div", {
                className: "lg:hidden fixed inset-0 z-[64]",
                children: [
                  (0, e.jsx)(u.motion.div, {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    transition: { duration: 0.2 },
                    className: "absolute inset-0 bg-black/60",
                    "aria-hidden": !0,
                    onClick: j,
                  }),
                  (0, e.jsxs)(u.motion.div, {
                    ref: b,
                    role: "dialog",
                    "aria-label": "Profile menu",
                    drag: "y",
                    dragConstraints: { top: 0, bottom: 0 },
                    dragElastic: 0.2,
                    onDragEnd: (t, e) => {
                      (e.offset.y > 120 || e.velocity.y > 400) && j();
                    },
                    initial: { y: "100%" },
                    animate: { y: 0 },
                    exit: { y: "100%" },
                    transition: { type: "spring", stiffness: 300, damping: 30 },
                    className:
                      "absolute left-0 right-0 bottom-0 z-[65] w-full rounded-t-2xl bg-[#0f0f0f] border-t border-gray-800 shadow-2xl max-h-[85vh] overflow-hidden",
                    children: [
                      (0, e.jsx)("div", {
                        className: "flex justify-center py-2",
                        children: (0, e.jsx)("div", {
                          className: "w-12 h-1 bg-gray-600 rounded-full",
                        }),
                      }),
                      (0, e.jsxs)("div", {
                        className:
                          "px-4 py-4 flex items-center justify-between gap-3 border-b border-gray-800",
                        children: [
                          (0, e.jsxs)("div", {
                            className: "flex items-center gap-3 min-w-0 flex-1",
                            children: [
                              (0, e.jsx)("div", {
                                className:
                                  "w-12 h-12 rounded-full overflow-hidden border border-gray-700 shrink-0 bg-gray-800",
                                children: P
                                  ? (0, e.jsx)(r.default, {
                                      src: P,
                                      alt: "",
                                      width: 48,
                                      height: 48,
                                      className: "w-full h-full object-cover",
                                      unoptimized: !0,
                                    })
                                  : (0, e.jsx)("div", {
                                      className:
                                        "w-full h-full bg-gradient-to-br from-primary to-red-700 flex items-center justify-center text-white text-lg font-bold",
                                      children: E,
                                    }),
                              }),
                              (0, e.jsxs)("div", {
                                className: "min-w-0",
                                children: [
                                  (0, e.jsx)("p", {
                                    className:
                                      "font-semibold text-white truncate",
                                    children: T,
                                  }),
                                  (0, e.jsx)("p", {
                                    className: "text-sm text-gray-400 truncate",
                                    children: k,
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, e.jsx)("button", {
                            type: "button",
                            "aria-label": "Close",
                            onClick: j,
                            className:
                              "p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors shrink-0",
                            children: (0, e.jsx)("svg", {
                              className: "w-5 h-5",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              strokeWidth: 2,
                              children: (0, e.jsx)("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                d: "M6 18L18 6M6 6l12 12",
                              }),
                            }),
                          }),
                        ],
                      }),
                      (0, e.jsx)("div", {
                        className: "px-4 py-3 border-b border-gray-800",
                        children: (0, e.jsxs)(s.default, {
                          href: "/subscription",
                          onClick: j,
                          className:
                            "flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold transition-colors",
                          children: [
                            (0, e.jsxs)("svg", {
                              className: "w-5 h-5",
                              fill: "currentColor",
                              viewBox: "0 0 24 24",
                              children: [
                                (0, e.jsx)("path", {
                                  d: "M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z",
                                }),
                                (0, e.jsx)("path", {
                                  d: "M5 19a1 1 0 011-1h12a1 1 0 011 1v1a1 1 0 01-1 1H6a1 1 0 01-1-1v-1z",
                                }),
                              ],
                            }),
                            "Subscribe",
                          ],
                        }),
                      }),
                      (0, e.jsxs)("div", {
                        className: "overflow-y-auto max-h-[50vh] py-2",
                        children: [
                          (0, e.jsxs)(s.default, {
                            href: "/account/profile",
                            onClick: j,
                            className:
                              "flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white transition-colors",
                            children: [
                              (0, e.jsx)("svg", {
                                className: "w-5 h-5 shrink-0",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                strokeWidth: 2,
                                children: (0, e.jsx)("path", {
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                                }),
                              }),
                              (0, e.jsx)("span", { children: "Profile" }),
                            ],
                          }),
                          (0, e.jsxs)(s.default, {
                            href: "/get-the-app",
                            onClick: j,
                            className:
                              "flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white transition-colors",
                            children: [
                              (0, e.jsx)("svg", {
                                className: "w-5 h-5 shrink-0",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                strokeWidth: 2,
                                children: (0, e.jsx)("path", {
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  d: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
                                }),
                              }),
                              (0, e.jsx)("span", { children: "App" }),
                            ],
                          }),
                          (0, e.jsxs)("button", {
                            type: "button",
                            onClick: () => {
                              (0, a.clearClientAuth)(),
                                "undefined" != typeof document &&
                                  ((document.cookie =
                                    "SF_TOKEN=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"),
                                  (document.cookie =
                                    "SF_VERIFICATION=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"),
                                  (document.cookie =
                                    "SF_USER=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT")),
                                m(!1),
                                g(null),
                                y(!1),
                                j(),
                                window.dispatchEvent(new Event("auth-changed")),
                                d.push("/"),
                                d.refresh();
                            },
                            className:
                              "flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors",
                            children: [
                              (0, e.jsx)("svg", {
                                className: "w-5 h-5 shrink-0",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                strokeWidth: 2,
                                children: (0, e.jsx)("path", {
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  d: "M17 16l4-4m0 0l-4-4m4 4H7m13 4v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2",
                                }),
                              }),
                              (0, e.jsx)("span", { children: "Sign Out" }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
          }),
        ],
      });
    }
    t.s(["BottomNavigation", () => d]);
  },
  2319,
  (t) => {
    "use strict";
    var e = t.i(47167),
      i = t.i(71645),
      n = t.i(35494);
    let s = !1,
      r = !1,
      o = !1;
    function a(t, e, i) {
      if (s) return Promise.resolve();
      s = !0;
      let r = [
          () =>
            new Promise((t) => {
              if ("undefined" == typeof document) return void t();
              let e = window;
              document.getElementById("gtm-script") ||
              (e.dataLayer && e.dataLayer.find((t) => t["gtm.start"]))
                ? t()
                : ((e.dataLayer = e.dataLayer || []),
                  e.dataLayer.push({
                    "gtm.start": new Date().getTime(),
                    event: "gtm.js",
                  }),
                  (0, n.loadScript)(
                    "https://www.googletagmanager.com/gtm.js?id=GTM-M9HDWD",
                    "gtm-script"
                  )
                    .then(() => t())
                    .catch(() => t()));
            }),
          () =>
            new Promise((t) => {
              let e = window;
              if (document.getElementById("ga-script")) return void t();
              let i = "G-51T2C2D8G4";
              (e.dataLayer = e.dataLayer || []),
                e.dataLayer.push(["js", new Date()]),
                e.dataLayer.push(["config", i]),
                (0, n.loadScript)(
                  `https://www.googletagmanager.com/gtag/js?id=${i}`,
                  "ga-script"
                )
                  .then(() => {
                    t();
                  })
                  .catch(() => t());
            }),
        ],
        o = [
          () =>
            new Promise((t) => {
              var e, i, n, s, r;
              if ("undefined" == typeof document) return void t();
              let o = "https:" === window.location.protocol,
                a =
                  "localhost" === window.location.hostname ||
                  "127.0.0.1" === window.location.hostname ||
                  "0.0.0.0" === window.location.hostname;
              if (!o && a) return void t();
              let l = window;
              l.fbq
                ? t()
                : ((e = window),
                  (i = document),
                  (n = null),
                  (s = null),
                  (r = null),
                  e.fbq ||
                    ((n = e.fbq =
                      function () {
                        n.callMethod
                          ? n.callMethod.apply(n, arguments)
                          : n.queue.push(arguments);
                      }),
                    e._fbq || (e._fbq = n),
                    (n.push = n),
                    (n.loaded = !0),
                    (n.version = "2.0"),
                    (n.queue = []),
                    ((s = i.createElement("script")).async = !0),
                    (s.src = "https://connect.facebook.net/en_US/fbevents.js"),
                    (r =
                      i.getElementsByTagName(
                        "script"
                      )[0]).parentNode.insertBefore(s, r)),
                  l.fbq("init", "2030911494325643"),
                  l.fbq("track", "PageView"),
                  t());
            }),
          () =>
            new Promise((t) => {
              var e, i, n, s;
              "undefined" == typeof document || window.hj
                ? t()
                : ((e = window),
                  (i = document),
                  (n = null),
                  (s = null),
                  (e.hj =
                    e.hj ||
                    function () {
                      (e.hj.q = e.hj.q || []).push(arguments);
                    }),
                  (e._hjSettings = { hjid: 6576615, hjsv: 6 }),
                  (n = i.getElementsByTagName("head")[0]),
                  ((s = i.createElement("script")).async = 1),
                  (s.src =
                    "https://static.hotjar.com/c/hotjar-" +
                    e._hjSettings.hjid +
                    ".js?sv=" +
                    e._hjSettings.hjsv),
                  n.appendChild(s),
                  t());
            }),
          () =>
            new Promise((t) => {
              if ("undefined" == typeof document) return void t();
              let e = window;
              e._izq &&
              e._izq.length > 0 &&
              document.querySelector('script[src*="izooto.com"]')
                ? t()
                : ((e._izq = e._izq || []),
                  e._izq.push(["init"]),
                  (0, n.loadScript)(
                    "https://cdn.izooto.com/scripts/0ef9e566d0095bdd080c32c63e368b674e1aa2a9.js",
                    "izooto-script"
                  )
                    .then(() => t())
                    .catch(() => t()));
            }),
          () =>
            new Promise((t) => {
              if ("undefined" == typeof document) return void t();
              let e = window;
              if (e.FB) return void t();
              let i = "https:" === window.location.protocol,
                s =
                  "localhost" === window.location.hostname ||
                  "127.0.0.1" === window.location.hostname ||
                  "0.0.0.0" === window.location.hostname;
              if (!i && s) return void t();
              if (!i && !s) {
                console.warn("Facebook SDK skipped: requires HTTPS"), t();
                return;
              }
              if (!document.getElementById("fb-root")) {
                let t = document.createElement("div");
                (t.id = "fb-root"), document.body.appendChild(t);
              }
              (e.fbAsyncInit = function () {
                if (e.FB)
                  try {
                    e.FB.init({
                      appId: "306339396497354",
                      cookie: !0,
                      xfbml: !0,
                      version: "v21.0",
                    }),
                      e.FB.AppEvents.logPageView();
                  } catch (t) {
                    console.warn("Facebook SDK initialization error:", t);
                  }
              }),
                (0, n.loadScript)(
                  "https://connect.facebook.net/en_US/sdk.js",
                  "facebook-jssdk"
                )
                  .then(() => {
                    if (e.FB && e.fbAsyncInit)
                      try {
                        e.fbAsyncInit();
                      } catch (t) {
                        console.warn("Facebook SDK initialization error:", t);
                      }
                    t();
                  })
                  .catch(() => {
                    t();
                  });
            }),
          () =>
            new Promise((t) => {
              if (
                "undefined" == typeof document ||
                "localhost" === window.location.hostname ||
                "127.0.0.1" === window.location.hostname
              )
                return void t();
              let e = window;
              e.OneSignal
                ? t()
                : (0, n.loadScript)(
                    "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js",
                    "onesignal-script"
                  )
                    .then(() => {
                      (e.OneSignalDeferred = e.OneSignalDeferred || []),
                        e.OneSignalDeferred.push(function (t) {
                          try {
                            t.init({
                              appId: "aed95679-b18c-47c8-8dc0-206a1ed17b7d",
                              allowLocalhostAsSecureOrigin: !1,
                              autoRegister: !1,
                              notifyButton: { enable: !1 },
                            });
                          } catch (t) {}
                        }),
                        t();
                    })
                    .catch(() => t());
            }),
          () =>
            new Promise((t) => {
              if (
                "undefined" == typeof document ||
                "localhost" === window.location.hostname ||
                "127.0.0.1" === window.location.hostname
              )
                return void t();
              let e = window;
              if (e.truepush && e.truepush.Init) return void t();
              let i = (t) => {
                if (
                  t.message &&
                  (t.message.includes("JSON") ||
                    t.message.includes("truepush") ||
                    t.filename?.includes("truepush.com"))
                )
                  return t.preventDefault(), !0;
              };
              window.addEventListener("error", i),
                (0, n.loadScript)(
                  "https://sdki.truepush.com/sdk/v2.0.2/app.js",
                  "truepush-script"
                )
                  .then(() => {
                    try {
                      (e.truepush || []).push(function () {
                        try {
                          e.truepush &&
                            "function" == typeof e.truepush.Init &&
                            e.truepush.Init(
                              { id: "5eccfb93763e39c6c63228e8" },
                              function (t) {
                                t && window.removeEventListener("error", i);
                              }
                            );
                        } catch (t) {}
                      });
                    } catch (t) {}
                    setTimeout(() => {
                      window.removeEventListener("error", i);
                    }, 5e3),
                      t();
                  })
                  .catch(() => {
                    window.removeEventListener("error", i), t();
                  });
            }),
          () =>
            new Promise((t) => {
              if (
                "undefined" == typeof document ||
                "localhost" === window.location.hostname ||
                "127.0.0.1" === window.location.hostname ||
                "0.0.0.0" === window.location.hostname
              )
                return void t();
              let e = window;
              e.adsbygoogle
                ? t()
                : Promise.all([
                    (0, n.loadScript)(
                      "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
                      "adsbygoogle-script-1"
                    ),
                    (0, n.loadScript)(
                      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2902409005871711",
                      "adsbygoogle-script-2"
                    ),
                  ])
                    .then(() => {
                      (e.adsbygoogle = e.adsbygoogle || []), t();
                    })
                    .catch(() => t());
            }),
          () =>
            new Promise((t) => {
              "undefined" == typeof document ||
              document.querySelector('script[src*="addtoany.com"]')
                ? t()
                : (0, n.loadScript)(
                    "https://static.addtoany.com/menu/page.js",
                    "addtoany-script"
                  )
                    .then(() => t())
                    .catch(() => t());
            }),
          t && e && i
            ? () =>
                new Promise((s) => {
                  if ("undefined" == typeof document) return void s();
                  let r = window;
                  r.clevertap && r.clevertap.event
                    ? s()
                    : ((r.clevertap = {
                        event: [],
                        profile: [],
                        account: [],
                        onUserLogin: [],
                        notifications: [],
                        privacy: [],
                      }),
                      "prod" === i
                        ? r.clevertap.account.push({ id: t })
                        : r.clevertap.account.push({ id: e }),
                      r.clevertap.privacy.push({ optOut: !1 }),
                      r.clevertap.privacy.push({ useIP: !1 }),
                      (0, n.loadScript)(
                        ("https:" === document.location.protocol
                          ? "https://d2r1yp2w7bby2u.cloudfront.net"
                          : "https://static.clevertap.com") +
                          "/js/clevertap.min.js",
                        "clevertap-script"
                      )
                        .then(() => s())
                        .catch(() => s()));
                })
            : null,
        ].filter(Boolean);
      return Promise.all(r.map((t) => t()))
        .then(() => {
          if (o.length > 0) {
            let t = 0,
              e = () => {
                if (t >= o.length) return;
                let i = Math.min(t + 2, o.length);
                Promise.all(o.slice(t, i).map((t) => t().catch(() => {}))).then(
                  () => {
                    (t = i) < o.length && requestAnimationFrame(e);
                  }
                );
              };
            requestAnimationFrame(e);
          }
        })
        .catch(() => {});
    }
    function l() {
      return (
        (0, i.useEffect)(() => {
          var t;
          let i,
            n,
            s,
            l = e.default.env.NEXT_PUBLIC_CLEVERTAP_PROD_ID || "468-868-6R6Z",
            h =
              e.default.env.NEXT_PUBLIC_CLEVERTAP_DEV_ID || "TEST-568-868-6R6Z";
          (t = "prod"),
            (n = (i = (function () {
              if ("undefined" == typeof navigator) return !1;
              let t = navigator.hardwareConcurrency || 4,
                e = navigator.deviceMemory || 4,
                i = navigator.connection,
                n =
                  i &&
                  ("slow-2g" === i.effectiveType ||
                    "2g" === i.effectiveType ||
                    "3g" === i.effectiveType),
                s = /Android|iPhone|iPad|iPod|Mobile/i.test(
                  navigator.userAgent
                );
              return t <= 4 || e <= 4 || n || s;
            })())
              ? 5e3
              : 3e3),
            (s = i ? 4e3 : 2e3),
            new Promise((t) => {
              if ("undefined" == typeof document) return void t();
              try {
                let e = new PerformanceObserver((i) => {
                  i
                    .getEntries()
                    .find((t) => "first-contentful-paint" === t.name) &&
                    (e.disconnect(), t());
                });
                e.observe({ entryTypes: ["paint"] }),
                  setTimeout(() => {
                    e.disconnect(), t();
                  }, 1e3);
              } catch (e) {
                setTimeout(() => {
                  t();
                }, 1e3);
              }
            })
              .then(
                () =>
                  new Promise((t) => {
                    if ("undefined" == typeof document || r) return void t();
                    try {
                      let e = new PerformanceObserver((i) => {
                        let n = i.getEntries(),
                          s = n[n.length - 1];
                        s && s.renderTime && ((r = !0), e.disconnect(), t());
                      });
                      e.observe({ entryTypes: ["largest-contentful-paint"] }),
                        setTimeout(() => {
                          r || ((r = !0), e.disconnect(), t());
                        }, 2500);
                    } catch (e) {
                      setTimeout(() => {
                        (r = !0), t();
                      }, 2500);
                    }
                  })
              )
              .then(() =>
                (function (t = 3e3) {
                  return new Promise((e) => {
                    if (o) return void e();
                    let i = () => {
                      o ||
                        ((o = !0),
                        window.removeEventListener("scroll", i, {
                          capture: !0,
                        }),
                        window.removeEventListener("click", i, { capture: !0 }),
                        window.removeEventListener("touchstart", i, {
                          capture: !0,
                        }),
                        e());
                    };
                    window.addEventListener("scroll", i, {
                      once: !0,
                      capture: !0,
                    }),
                      window.addEventListener("click", i, {
                        once: !0,
                        capture: !0,
                      }),
                      window.addEventListener("touchstart", i, {
                        once: !0,
                        capture: !0,
                      }),
                      setTimeout(() => {
                        o ||
                          ((o = !0),
                          window.removeEventListener("scroll", i, {
                            capture: !0,
                          }),
                          window.removeEventListener("click", i, {
                            capture: !0,
                          }),
                          window.removeEventListener("touchstart", i, {
                            capture: !0,
                          }),
                          e());
                      }, t);
                  });
                })(n)
              )
              .then(() => {
                i
                  ? setTimeout(() => {
                      "requestIdleCallback" in window
                        ? window.requestIdleCallback(
                            () => {
                              a(l, h, t);
                            },
                            { timeout: s }
                          )
                        : setTimeout(() => {
                            a(l, h, t);
                          }, s);
                    }, 2e3)
                  : "requestIdleCallback" in window
                  ? window.requestIdleCallback(
                      () => {
                        a(l, h, t);
                      },
                      { timeout: s }
                    )
                  : setTimeout(() => {
                      a(l, h, t);
                    }, s);
              });
        }, []),
        null
      );
    }
    t.s(["ThirdPartyScripts", () => l], 2319);
  },
  62352,
  (t) => {
    "use strict";
    var e = t.i(43476),
      i = t.i(71645),
      n = t.i(18566);
    function s() {
      let t = (0, n.usePathname)(),
        e = (0, n.useSearchParams)(),
        s = (0, i.useRef)(!1);
      return (
        (0, i.useEffect)(() => {
          let i = t + (e?.toString() ? `?${e.toString()}` : ""),
            n = document.title || "Shortfundly",
            r = window;
          (r.dataLayer = r.dataLayer || []),
            r.gtag ||
              (r.gtag = function () {
                r.dataLayer.push(arguments);
              });
          try {
            let t = window.location.href;
            r.gtag("config", "G-51T2C2D8G4", {
              page_path: i,
              page_title: n,
              page_location: t,
            }),
              r.gtag("event", "page_view", {
                page_title: n,
                page_path: i,
                page_location: t,
              });
          } catch (t) {}
          s.current || (s.current = !0);
        }, [t, e]),
        null
      );
    }
    function r() {
      return (0, e.jsx)(i.Suspense, {
        fallback: null,
        children: (0, e.jsx)(s, {}),
      });
    }
    t.s(["GoogleAnalytics", () => r]);
  },
  77387,
  (t) => {
    "use strict";
    var e = t.i(43476),
      i = t.i(71645),
      n = t.i(57688);
    function s() {
      let [t, s] = (0, i.useState)(!1);
      return (
        (0, i.useEffect)(() => {
          let t = () => {
            s(
              (window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0) > 50
            );
          };
          return (
            t(),
            window.addEventListener("scroll", t, { passive: !0 }),
            () => {
              window.removeEventListener("scroll", t);
            }
          );
        }, []),
        (0, e.jsxs)(e.Fragment, {
          children: [
            t &&
              (0, e.jsx)("button", {
                onClick: () => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                },
                className:
                  "fixed bottom-[140px] right-4 lg:bottom-[72px] lg:right-6 z-40 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-colors duration-200 w-[40px] h-[40px] flex items-center justify-center",
                "aria-label": "Scroll to top",
                children: (0, e.jsx)("svg", {
                  width: "20",
                  height: "20",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  viewBox: "0 0 24 24",
                  "aria-hidden": "true",
                  children: (0, e.jsx)("path", { d: "M18 15l-6-6-6 6" }),
                }),
              }),
            (0, e.jsx)("a", {
              href: "https://api.whatsapp.com/send/?phone=9361223155&text=I%27m+inquiring+about+the+short+film+promotion+services+in+shortfundly&type=phone_number&app_absent=0",
              target: "_blank",
              rel: "noopener noreferrer",
              title: "Contact us on WhatsApp",
              className:
                "fixed bottom-[84px] right-4 lg:bottom-6 lg:right-6 z-40 hover:scale-110 transition-transform duration-200 w-[44px] h-[44px]",
              "aria-label": "Contact us on WhatsApp",
              children: (0, e.jsx)(n.default, {
                alt: "WhatsApp",
                title: "WhatsApp",
                width: 50,
                height: 50,
                className: "w-full h-full",
                src: "/assets/images/whatsapp.png",
                unoptimized: !0,
              }),
            }),
          ],
        })
      );
    }
    t.s(["FloatingButtons", () => s]);
  },
]);
