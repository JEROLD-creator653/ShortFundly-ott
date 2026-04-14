(function (sttc) {
  "use strict";
  var r,
    aa = Object.defineProperty,
    ba = globalThis,
    ca = typeof Symbol === "function" && typeof Symbol("x") === "symbol",
    da = {},
    ea = {};
  function fa(a, b, c) {
    if (!c || a != null) {
      c = ea[b];
      if (c == null) return a[b];
      c = a[c];
      return c !== void 0 ? c : a[b];
    }
  }
  function ha(a, b, c) {
    if (b)
      a: {
        var d = a.split(".");
        a = d.length === 1;
        var e = d[0],
          f;
        !a && e in da ? (f = da) : (f = ba);
        for (e = 0; e < d.length - 1; e++) {
          var g = d[e];
          if (!(g in f)) break a;
          f = f[g];
        }
        d = d[d.length - 1];
        c = ca && c === "es6" ? f[d] : null;
        b = b(c);
        b != null &&
          (a
            ? aa(da, d, { configurable: !0, writable: !0, value: b })
            : b !== c &&
              (ea[d] === void 0 &&
                ((a = (Math.random() * 1e9) >>> 0),
                (ea[d] = ca ? ba.Symbol(d) : "$jscp$" + a + "$" + d)),
              aa(f, ea[d], { configurable: !0, writable: !0, value: b })));
      }
  }
  ha(
    "Symbol.dispose",
    function (a) {
      return a ? a : Symbol("Symbol.dispose");
    },
    "es_next"
  ); /* 
 
 Copyright The Closure Library Authors. 
 SPDX-License-Identifier: Apache-2.0 
*/
  var u = this || self;
  function ia(a, b) {
    a: {
      var c = ["CLOSURE_FLAGS"];
      for (var d = u, e = 0; e < c.length; e++)
        if (((d = d[c[e]]), d == null)) {
          c = null;
          break a;
        }
      c = d;
    }
    a = c && c[a];
    return a != null ? a : b;
  }
  function ja(a) {
    var b = typeof a;
    return b != "object" ? b : a ? (Array.isArray(a) ? "array" : b) : "null";
  }
  function ka(a) {
    var b = ja(a);
    return b == "array" || (b == "object" && typeof a.length == "number");
  }
  function la(a) {
    var b = typeof a;
    return (b == "object" && a != null) || b == "function";
  }
  function x(a) {
    return (
      (Object.prototype.hasOwnProperty.call(a, ma) && a[ma]) || (a[ma] = ++na)
    );
  }
  var ma = "closure_uid_" + ((Math.random() * 1e9) >>> 0),
    na = 0;
  function oa(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }
  function pa(a, b, c) {
    if (!a) throw Error();
    if (arguments.length > 2) {
      var d = Array.prototype.slice.call(arguments, 2);
      return function () {
        var e = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(e, d);
        return a.apply(b, e);
      };
    }
    return function () {
      return a.apply(b, arguments);
    };
  }
  function qa(a, b, c) {
    qa =
      Function.prototype.bind &&
      Function.prototype.bind.toString().indexOf("native code") != -1
        ? oa
        : pa;
    return qa.apply(null, arguments);
  }
  function ra(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function () {
      var d = c.slice();
      d.push.apply(d, arguments);
      return a.apply(this, d);
    };
  }
  var sa;
  function ta(a) {
    u.setTimeout(() => {
      throw a;
    }, 0);
  }
  var ua = ia(610401301, !1),
    va = ia(748402147, !0);
  function wa() {
    var a = u.navigator;
    return a && (a = a.userAgent) ? a : "";
  }
  var xa;
  const ya = u.navigator;
  xa = ya ? ya.userAgentData || null : null;
  function za() {
    if (!ua || !xa) return !1;
    for (let a = 0; a < xa.brands.length; a++) {
      const { brand: b } = xa.brands[a];
      if (b && b.indexOf("Chromium") != -1) return !0;
    }
    return !1;
  }
  function y(a) {
    return wa().indexOf(a) != -1;
  }
  function Aa() {
    return ua ? !!xa && xa.brands.length > 0 : !1;
  }
  function Ba() {
    return Aa()
      ? za()
      : ((y("Chrome") || y("CriOS")) && !(Aa() ? 0 : y("Edge"))) || y("Silk");
  }
  function Ca(a, b) {
    if (typeof a === "string")
      return typeof b !== "string" || b.length != 1 ? -1 : a.indexOf(b, 0);
    for (let c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
    return -1;
  }
  function Da(a, b) {
    const c = a.length,
      d = typeof a === "string" ? a.split("") : a;
    for (let e = 0; e < c; e++) e in d && b.call(void 0, d[e], e, a);
  }
  function Ea(a, b) {
    const c = a.length,
      d = [];
    let e = 0;
    const f = typeof a === "string" ? a.split("") : a;
    for (let g = 0; g < c; g++)
      if (g in f) {
        const k = f[g];
        b.call(void 0, k, g, a) && (d[e++] = k);
      }
    return d;
  }
  function Fa(a, b) {
    const c = a.length,
      d = Array(c),
      e = typeof a === "string" ? a.split("") : a;
    for (let f = 0; f < c; f++) f in e && (d[f] = b.call(void 0, e[f], f, a));
    return d;
  }
  function Ga(a, b) {
    const c = a.length,
      d = typeof a === "string" ? a.split("") : a;
    for (let e = 0; e < c; e++)
      if (e in d && b.call(void 0, d[e], e, a)) return !0;
    return !1;
  }
  function Ha(a, b) {
    return Ca(a, b) >= 0;
  }
  function Ia(a) {
    const b = a.length;
    if (b > 0) {
      const c = Array(b);
      for (let d = 0; d < b; d++) c[d] = a[d];
      return c;
    }
    return [];
  }
  function Ja(a, b) {
    for (let c = 1; c < arguments.length; c++) {
      const d = arguments[c];
      if (ka(d)) {
        const e = a.length || 0,
          f = d.length || 0;
        a.length = e + f;
        for (let g = 0; g < f; g++) a[e + g] = d[g];
      } else a.push(d);
    }
  }
  function Ka(a, b) {
    b = b || Math.random;
    for (let c = a.length - 1; c > 0; c--) {
      const d = Math.floor(b() * (c + 1)),
        e = a[c];
      a[c] = a[d];
      a[d] = e;
    }
  }
  function La(a) {
    La[" "](a);
    return a;
  }
  La[" "] = function () {};
  var Ma =
      y("Gecko") &&
      !(wa().toLowerCase().indexOf("webkit") != -1 && !y("Edge")) &&
      !(y("Trident") || y("MSIE")) &&
      !y("Edge"),
    Na = wa().toLowerCase().indexOf("webkit") != -1 && !y("Edge");
  function Oa(a, b) {
    a.__closure__error__context__984382 ||
      (a.__closure__error__context__984382 = {});
    a.__closure__error__context__984382.severity = b;
  }
  let Pa = void 0,
    Qa;
  function Ra(a) {
    if (Qa) throw Error("");
    Qa = (b) => {
      u.setTimeout(() => {
        a(b);
      }, 0);
    };
  }
  function Sa(a) {
    if (Qa)
      try {
        Qa(a);
      } catch (b) {
        throw ((b.cause = a), b);
      }
  }
  function Ta(a) {
    a = Error(a);
    Oa(a, "warning");
    Sa(a);
    return a;
  }
  function Ua(a, b = !1) {
    return b && Symbol.for && a
      ? Symbol.for(a)
      : a != null
      ? Symbol(a)
      : Symbol();
  }
  var Va = Ua(),
    Wa = Ua(),
    Xa = Ua(),
    Ya = Ua("m_m", !0);
  const A = Ua("jas", !0);
  var Za;
  const $a = [];
  $a[A] = 7;
  Za = Object.freeze($a);
  function ab(a) {
    if (4 & a) return 512 & a ? 512 : 1024 & a ? 1024 : 0;
  }
  var bb = {};
  function cb(a, b) {
    return b === void 0
      ? a.g !== db && !!(2 & (a.Y[A] | 0))
      : !!(2 & b) && a.g !== db;
  }
  const db = {};
  var eb = Object.freeze({}),
    fb = Object.freeze({});
  function gb(a) {
    var b = hb;
    if (!ib(a))
      throw (
        ((b = (typeof b === "function" ? b() : b)?.concat("\n") ?? ""),
        Error(b + String(a)))
      );
    return a;
  }
  function jb(a) {
    a.Ze = !0;
    return a;
  }
  let hb = void 0;
  var kb = jb((a) => typeof a === "number"),
    lb = jb((a) => typeof a === "string"),
    ib = jb((a) => typeof a === "function"),
    mb = jb((a) => Array.isArray(a));
  function nb() {
    return jb((a) => (mb(a) ? a.every((b) => kb(b)) : !1));
  }
  function ob(a) {
    if (lb(a)) {
      if (!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(a)) throw Error(String(a));
    } else if (kb(a) && !Number.isSafeInteger(a)) throw Error(String(a));
    return BigInt(a);
  }
  var rb = jb((a) => a >= pb && a <= qb);
  const pb = BigInt(Number.MIN_SAFE_INTEGER),
    qb = BigInt(Number.MAX_SAFE_INTEGER);
  let sb = 0,
    tb = 0;
  function ub(a) {
    const b = a >>> 0;
    sb = b;
    tb = ((a - b) / 4294967296) >>> 0;
  }
  function vb(a) {
    if (a < 0) {
      ub(-a);
      a = sb;
      var b = tb;
      b = ~b;
      a ? (a = ~a + 1) : (b += 1);
      const [c, d] = [a, b];
      sb = c >>> 0;
      tb = d >>> 0;
    } else ub(a);
  }
  function wb(a, b) {
    b >>>= 0;
    a >>>= 0;
    var c;
    b <= 2097151
      ? (c = "" + (4294967296 * b + a))
      : (c = "" + ((BigInt(b) << BigInt(32)) | BigInt(a)));
    return c;
  }
  const xb = typeof BigInt === "function" ? BigInt.asIntN : void 0,
    yb = Number.isSafeInteger,
    zb = Number.isFinite,
    Ab = Math.trunc,
    Bb = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
  function Cb(a) {
    switch (typeof a) {
      case "bigint":
        return !0;
      case "number":
        return zb(a);
      case "string":
        return Bb.test(a);
      default:
        return !1;
    }
  }
  function Db(a) {
    if (!zb(a)) throw Ta("enum");
    return a | 0;
  }
  function Eb(a) {
    return a == null ? a : Db(a);
  }
  function Fb(a) {
    return a == null ? a : zb(a) ? a | 0 : void 0;
  }
  function Gb(a) {
    if (typeof a !== "number") throw Ta("int32");
    if (!zb(a)) throw Ta("int32");
    return a | 0;
  }
  function Hb(a) {
    return a == null ? a : Gb(a);
  }
  function Ib(a) {
    if (a == null) return a;
    if (typeof a === "string" && a) a = +a;
    else if (typeof a !== "number") return;
    return zb(a) ? a | 0 : void 0;
  }
  function Jb(a) {
    if (!Cb(a)) throw Ta("int64");
    switch (typeof a) {
      case "string":
        return Lb(a);
      case "bigint":
        return ob(xb(64, a));
      default:
        return Mb(a);
    }
  }
  function Lb(a) {
    var b = Ab(Number(a));
    if (yb(b)) return ob(b);
    b = a.indexOf(".");
    b !== -1 && (a = a.substring(0, b));
    return ob(xb(64, BigInt(a)));
  }
  function Mb(a) {
    if (yb(a)) {
      var b = Ab(a);
      if (!yb(b)) {
        vb(b);
        a = sb;
        var c = tb;
        if ((b = c & 2147483648))
          (a = (~a + 1) >>> 0), (c = ~c >>> 0), a == 0 && (c = (c + 1) >>> 0);
        const d = c * 4294967296 + (a >>> 0);
        a = Number.isSafeInteger(d) ? d : wb(a, c);
        b = typeof a === "number" ? (b ? -a : a) : b ? "-" + a : a;
      }
      b = ob(b);
    } else
      (a = Ab(a)),
        yb(a)
          ? (b = String(a))
          : (vb(a),
            (a = sb),
            (c = tb),
            c & 2147483648
              ? (b = "" + ((BigInt(c | 0) << BigInt(32)) | BigInt(a >>> 0)))
              : (b = wb(a, c))),
        (b = ob(b));
    return b;
  }
  function Nb(a) {
    const b = typeof a;
    if (a == null) return a;
    if (b === "bigint") return ob(xb(64, a));
    if (Cb(a)) return b === "string" ? Lb(a) : Mb(a);
  }
  function Ob(a) {
    if (typeof a !== "string") throw Error();
    return a;
  }
  function Pb(a) {
    if (a != null && typeof a !== "string") throw Error();
    return a;
  }
  function Qb(a) {
    return a == null || typeof a === "string" ? a : void 0;
  }
  function Rb(a, b, c, d) {
    if (a != null && a[Ya] === bb) return a;
    if (!Array.isArray(a))
      return c ? (d & 2 ? b[Va] || (b[Va] = Sb(b)) : new b()) : void 0;
    c = a[A] | 0;
    d = c | (d & 32) | (d & 2);
    d !== c && (a[A] = d);
    return new b(a);
  }
  function Sb(a) {
    a = new a();
    var b = a.Y;
    b[A] |= 34;
    return a;
  }
  function Tb(a) {
    return a;
  }
  function Ub(a, b, c, d) {
    var e = d !== void 0;
    d = !!d;
    const f = [];
    var g = a.length;
    let k,
      h = 4294967295,
      m = !1;
    const l = !!(b & 64),
      n = l ? (b & 128 ? 0 : -1) : void 0;
    b & 1 ||
      ((k = g && a[g - 1]),
      k != null && typeof k === "object" && k.constructor === Object
        ? (g--, (h = g))
        : (k = void 0),
      !l ||
        b & 128 ||
        e ||
        ((m = !0), (h = (Vb ?? Tb)(h - n, n, a, k, void 0) + n)));
    b = void 0;
    for (e = 0; e < g; e++) {
      let p = a[e];
      if (p != null && (p = c(p, d)) != null)
        if (l && e >= h) {
          const t = e - n;
          (b ?? (b = {}))[t] = p;
        } else f[e] = p;
    }
    if (k)
      for (let p in k) {
        if (!Object.prototype.hasOwnProperty.call(k, p)) continue;
        a = k[p];
        if (a == null || (a = c(a, d)) == null) continue;
        g = +p;
        let t;
        l && !Number.isNaN(g) && (t = g + n) < h
          ? (f[t] = a)
          : ((b ?? (b = {}))[p] = a);
      }
    b && (m ? f.push(b) : (f[h] = b));
    return f;
  }
  function Wb(a) {
    switch (typeof a) {
      case "number":
        return Number.isFinite(a) ? a : "" + a;
      case "bigint":
        return rb(a) ? Number(a) : "" + a;
      case "boolean":
        return a ? 1 : 0;
      case "object":
        if (Array.isArray(a)) {
          const b = a[A] | 0;
          return a.length === 0 && b & 1 ? void 0 : Ub(a, b, Wb);
        }
        if (a != null && a[Ya] === bb) return Xb(a);
        return;
    }
    return a;
  }
  let Vb;
  function Xb(a) {
    a = a.Y;
    return Ub(a, a[A] | 0, Wb);
  }
  function Yb(a, b, c, d = 0) {
    if (a == null) {
      var e = 32;
      c ? ((a = [c]), (e |= 128)) : (a = []);
      b && (e = (e & -16760833) | ((b & 1023) << 14));
    } else {
      if (!Array.isArray(a)) throw Error("narr");
      e = a[A] | 0;
      if (va && 1 & e) throw Error("rfarr");
      2048 & e && !(2 & e) && Zb();
      if (e & 256) throw Error("farr");
      if (e & 64) return (e | d) !== e && (a[A] = e | d), a;
      if (c && ((e |= 128), c !== a[0])) throw Error("mid");
      a: {
        c = a;
        e |= 64;
        var f = c.length;
        if (f) {
          var g = f - 1;
          const h = c[g];
          if (h != null && typeof h === "object" && h.constructor === Object) {
            b = e & 128 ? 0 : -1;
            g -= b;
            if (g >= 1024) throw Error("pvtlmt");
            for (var k in h) {
              if (!Object.prototype.hasOwnProperty.call(h, k)) continue;
              f = +k;
              if (f < g) (c[f + b] = h[k]), delete h[k];
              else break;
            }
            e = (e & -16760833) | ((g & 1023) << 14);
            break a;
          }
        }
        if (b) {
          k = Math.max(b, f - (e & 128 ? 0 : -1));
          if (k > 1024) throw Error("spvt");
          e = (e & -16760833) | ((k & 1023) << 14);
        }
      }
    }
    a[A] = e | 64 | d;
    return a;
  }
  function Zb() {
    if (va) throw Error("carr");
    if (Xa != null) {
      var a = Pa ?? (Pa = {});
      var b = a[Xa] || 0;
      b >= 5 ||
        ((a[Xa] = b + 1), (a = Error()), Oa(a, "incident"), Qa ? Sa(a) : ta(a));
    }
  }
  function $b(a, b) {
    if (typeof a !== "object") return a;
    if (Array.isArray(a)) {
      var c = a[A] | 0;
      a.length === 0 && c & 1
        ? (a = void 0)
        : c & 2 ||
          (!b || 4096 & c || 16 & c
            ? (a = ac(a, c, !1, b && !(c & 16)))
            : ((a[A] |= 34), c & 4 && Object.freeze(a)));
      return a;
    }
    if (a != null && a[Ya] === bb)
      return (
        (b = a.Y),
        (c = b[A] | 0),
        cb(a, c) ? a : bc(a, b, c) ? cc(a, b) : ac(b, c)
      );
  }
  function cc(a, b, c) {
    a = new a.constructor(b);
    c && (a.g = db);
    a.j = db;
    return a;
  }
  function ac(a, b, c, d) {
    d ?? (d = !!(34 & b));
    a = Ub(a, b, $b, d);
    d = 32;
    c && (d |= 2);
    b = (b & 16769217) | d;
    a[A] = b;
    return a;
  }
  function dc(a) {
    const b = a.Y,
      c = b[A] | 0;
    return cb(a, c)
      ? bc(a, b, c)
        ? cc(a, b, !0)
        : new a.constructor(ac(b, c, !1))
      : a;
  }
  function ec(a) {
    const b = a.Y,
      c = b[A] | 0;
    return cb(a, c)
      ? a
      : bc(a, b, c)
      ? cc(a, b)
      : new a.constructor(ac(b, c, !0));
  }
  function fc(a) {
    if (a.g !== db) return !1;
    var b = a.Y;
    b = ac(b, b[A] | 0);
    b[A] |= 2048;
    a.Y = b;
    a.g = void 0;
    a.j = void 0;
    return !0;
  }
  function hc(a) {
    if (!fc(a) && cb(a, a.Y[A] | 0)) throw Error();
  }
  function ic(a, b) {
    b === void 0 && (b = a[A] | 0);
    b & 32 && !(b & 4096) && (a[A] = b | 4096);
  }
  function bc(a, b, c) {
    return c & 2
      ? !0
      : c & 32 && !(c & 4096)
      ? ((b[A] = c | 2), (a.g = db), !0)
      : !1;
  }
  const jc = ob(0),
    B = {};
  function C(a, b, c, d) {
    b = kc(a.Y, b, void 0, d);
    if (b !== null || (c && a.j !== db)) return b;
  }
  function kc(a, b, c, d) {
    if (b === -1) return null;
    const e = b + (c ? 0 : -1),
      f = a.length - 1;
    let g, k;
    if (!(f < 1 + (c ? 0 : -1))) {
      if (e >= f)
        if (
          ((g = a[f]),
          g != null && typeof g === "object" && g.constructor === Object)
        )
          (c = g[b]), (k = !0);
        else if (e === f) c = g;
        else return;
      else c = a[e];
      if (d && c != null) {
        d = d(c);
        if (d == null) return d;
        if (!Object.is(d, c)) return k ? (g[b] = d) : (a[e] = d), d;
      }
      return c;
    }
  }
  function lc(a, b, c) {
    hc(a);
    const d = a.Y;
    mc(d, d[A] | 0, b, c);
    return a;
  }
  function mc(a, b, c, d) {
    const e = c + -1;
    var f = a.length - 1;
    if (f >= 0 && e >= f) {
      const g = a[f];
      if (g != null && typeof g === "object" && g.constructor === Object)
        return (g[c] = d), b;
    }
    if (e <= f) return (a[e] = d), b;
    d !== void 0 &&
      ((f = ((b ?? (b = a[A] | 0)) >> 14) & 1023 || 536870912),
      c >= f ? d != null && (a[f + -1] = { [c]: d }) : (a[e] = d));
    return b;
  }
  function nc() {
    return void 0 === eb ? 2 : 4;
  }
  function oc(a, b, c, d, e) {
    let f = a.Y,
      g = f[A] | 0;
    d = cb(a, g) ? 1 : d;
    e = !!e || d === 3;
    d === 2 && fc(a) && ((f = a.Y), (g = f[A] | 0));
    a = pc(f, b);
    let k = a === Za ? 7 : a[A] | 0,
      h = qc(k, g);
    var m = 4 & h ? !1 : !0;
    if (m) {
      4 & h && ((a = [...a]), (k = 0), (h = rc(h, g)), (g = mc(f, g, b, a)));
      let l = 0,
        n = 0;
      for (; l < a.length; l++) {
        const p = c(a[l]);
        p != null && (a[n++] = p);
      }
      n < l && (a.length = n);
      c = (h | 4) & -513;
      h = c &= -1025;
      h &= -4097;
    }
    h !== k && ((a[A] = h), 2 & h && Object.freeze(a));
    return (a = sc(a, h, f, g, b, d, m, e));
  }
  function sc(a, b, c, d, e, f, g, k) {
    let h = b;
    f === 1 || (f !== 4 ? 0 : 2 & b || (!(16 & b) && 32 & d))
      ? tc(b) ||
        ((b |=
          !a.length || (g && !(4096 & b)) || (32 & d && !(4096 & b || 16 & b))
            ? 2
            : 256),
        b !== h && (a[A] = b),
        Object.freeze(a))
      : (f === 2 &&
          tc(b) &&
          ((a = [...a]), (h = 0), (b = rc(b, d)), (d = mc(c, d, e, a))),
        tc(b) || (k || (b |= 16), b !== h && (a[A] = b)));
    2 & b || !(4096 & b || 16 & b) || ic(c, d);
    return a;
  }
  function pc(a, b) {
    a = kc(a, b);
    return Array.isArray(a) ? a : Za;
  }
  function qc(a, b) {
    2 & b && (a |= 2);
    return a | 1;
  }
  function tc(a) {
    return (!!(2 & a) && !!(4 & a)) || !!(256 & a);
  }
  function uc(a, b, c, d) {
    hc(a);
    const e = a.Y;
    let f = e[A] | 0;
    if (c == null) return mc(e, f, b), a;
    let g = c === Za ? 7 : c[A] | 0,
      k = g;
    var h = tc(g);
    let m = h || Object.isFrozen(c);
    h || (g = 0);
    m || ((c = [...c]), (k = 0), (g = rc(g, f)), (m = !1));
    g |= 5;
    h = ab(g) ?? 1024;
    g |= h;
    for (let l = 0; l < c.length; l++) {
      const n = c[l],
        p = d(n, h);
      Object.is(n, p) ||
        (m && ((c = [...c]), (k = 0), (g = rc(g, f)), (m = !1)), (c[l] = p));
    }
    g !== k && (m && ((c = [...c]), (g = rc(g, f))), (c[A] = g));
    mc(e, f, b, c);
    return a;
  }
  function vc(a, b, c, d) {
    hc(a);
    const e = a.Y;
    mc(e, e[A] | 0, b, (d === "0" ? Number(c) === 0 : c === d) ? void 0 : c);
    return a;
  }
  function wc(a, b, c, d) {
    hc(a);
    const e = a.Y;
    let f = e[A] | 0;
    if (d == null) {
      const g = xc(e);
      if (yc(g, e, f, c) === b) g.set(c, 0);
      else return a;
    } else f = zc(e, f, c, b);
    mc(e, f, b, d);
    return a;
  }
  function Ac(a, b, c) {
    a = a.Y;
    return yc(xc(a), a, void 0, b) === c ? c : -1;
  }
  function xc(a) {
    return a[Wa] ?? (a[Wa] = new Map());
  }
  function zc(a, b, c, d) {
    const e = xc(a),
      f = yc(e, a, b, c);
    f !== d && (f && (b = mc(a, b, f)), e.set(c, d));
    return b;
  }
  function yc(a, b, c, d) {
    let e = a.get(d);
    if (e != null) return e;
    e = 0;
    for (let f = 0; f < d.length; f++) {
      const g = d[f];
      kc(b, g) != null && (e !== 0 && (c = mc(b, c, e)), (e = g));
    }
    a.set(d, e);
    return e;
  }
  function Bc(a, b, c) {
    hc(a);
    a = a.Y;
    let d = a[A] | 0;
    const e = kc(a, c),
      f = void 0 === fb;
    b = Rb(e, b, !f, d);
    if (!f || b)
      return (b = dc(b)), e !== b && ((d = mc(a, d, c, b)), ic(a, d)), b;
  }
  function Cc(a, b, c, d) {
    let e = !1;
    d = kc(a, d, void 0, (f) => {
      const g = Rb(f, c, !1, b);
      e = g !== f && g != null;
      return g;
    });
    if (d != null) return e && !cb(d) && ic(a, b), d;
  }
  function Dc(a, b, c) {
    let d = a.Y,
      e = d[A] | 0;
    b = Cc(d, e, b, c);
    if (b == null) return b;
    e = d[A] | 0;
    if (!cb(a, e)) {
      const f = dc(b);
      f !== b &&
        (fc(a) && ((d = a.Y), (e = d[A] | 0)),
        (b = f),
        (e = mc(d, e, c, b)),
        ic(d, e));
    }
    return b;
  }
  function Ec(a, b, c) {
    var d = nc(),
      e = a.Y,
      f = e;
    e = e[A] | 0;
    var g = cb(a, e);
    const k = g ? 1 : d;
    d = k === 3;
    var h = !g;
    (k === 2 || h) && fc(a) && ((f = a.Y), (e = f[A] | 0));
    a = pc(f, c);
    var m = a === Za ? 7 : a[A] | 0,
      l = qc(m, e);
    if ((g = !(4 & l))) {
      var n = a,
        p = e;
      const t = !!(2 & l);
      t && (p |= 2);
      let q = !t,
        z = !0,
        F = 0,
        Z = 0;
      for (; F < n.length; F++) {
        const M = Rb(n[F], b, !1, p);
        if (M instanceof b) {
          if (!t) {
            const v = cb(M);
            q && (q = !v);
            z && (z = v);
          }
          n[Z++] = M;
        }
      }
      Z < F && (n.length = Z);
      l |= 4;
      l = z ? l & -4097 : l | 4096;
      l = q ? l | 8 : l & -9;
    }
    l !== m && ((a[A] = l), 2 & l && Object.freeze(a));
    if (
      h &&
      !(
        8 & l ||
        (!a.length &&
          (k === 1 || (k !== 4 ? 0 : 2 & l || (!(16 & l) && 32 & e))))
      )
    ) {
      tc(l) && ((a = [...a]), (l = rc(l, e)), (e = mc(f, e, c, a)));
      b = a;
      h = l;
      for (m = 0; m < b.length; m++)
        (n = b[m]), (l = dc(n)), n !== l && (b[m] = l);
      h |= 8;
      l = h = b.length ? h | 4096 : h & -4097;
      a[A] = l;
    }
    return (a = sc(a, l, f, e, c, k, g, d));
  }
  function Fc(a) {
    a == null && (a = void 0);
    return a;
  }
  function Gc(a, b, c) {
    c = Fc(c);
    lc(a, b, c);
    c && !cb(c) && ic(a.Y);
    return a;
  }
  function Hc(a, b, c, d) {
    d = Fc(d);
    wc(a, b, c, d);
    d && !cb(d) && ic(a.Y);
    return a;
  }
  function rc(a, b) {
    return (a = (2 & b ? a | 2 : a & -3) & -273);
  }
  function Ic(a, b, c) {
    a = C(a, b, c);
    return a == null || typeof a === "boolean"
      ? a
      : typeof a === "number"
      ? !!a
      : void 0;
  }
  function Jc(a, b, c) {
    return Qb(C(a, b, c));
  }
  function Kc(a, b) {
    return C(a, b, void 0, Nb) ?? jc;
  }
  function Lc(a, b, c) {
    a = oc(a, b, Ib, 3, !0);
    if (typeof c !== "number" || c < 0 || c >= a.length) throw Error();
    return a[c];
  }
  function Mc(a, b, c) {
    return vc(a, b, c == null ? c : Jb(c), "0");
  }
  function Nc(a, b, c) {
    return vc(a, b, Pb(c), "");
  }
  function Oc(a) {
    return ec(a);
  }
  var D = class {
    constructor(a) {
      this.Y = Yb(a, void 0, void 0, 2048);
    }
    toJSON() {
      return Xb(this);
    }
  };
  D.prototype[Ya] = bb;
  function Pc(a) {
    return () => a[Va] || (a[Va] = Sb(a));
  }
  function Qc(a) {
    return (b) => {
      if (b == null || b == "") b = new a();
      else {
        b = JSON.parse(b);
        if (!Array.isArray(b)) throw Error("dnarr");
        b[A] |= 32;
        b = new a(b);
      }
      return b;
    };
  }
  function Rc(a, b) {
    if (a)
      for (const c in a)
        Object.prototype.hasOwnProperty.call(a, c) && b(a[c], c, a);
  }
  function Sc(a) {
    const b = [];
    Rc(a, (c) => {
      b.push(c);
    });
    return b;
  }
  function Tc(a) {
    try {
      var b;
      if ((b = !!a && a.location.href != null))
        a: {
          try {
            La(a.foo);
            b = !0;
            break a;
          } catch (c) {}
          b = !1;
        }
      return b;
    } catch {
      return !1;
    }
  }
  function Uc(a) {
    return Tc(a.top) ? a.top : null;
  }
  function Vc() {
    return !1;
  }
  function Wc() {
    return !0;
  }
  function Xc(a) {
    return function () {
      return !a.apply(this, arguments);
    };
  }
  function Yc(a) {
    let b = !1,
      c;
    return function () {
      b || ((c = a()), (b = !0));
      return c;
    };
  }
  function Zc(a) {
    let b = a;
    return function () {
      if (b) {
        const c = b;
        b = null;
        c();
      }
    };
  }
  function $c(a) {
    function b() {
      d = u.setTimeout(c, 100);
      let g = f;
      f = [];
      a.apply(void 0, g);
    }
    function c() {
      d = 0;
      e && ((e = !1), b());
    }
    let d = 0,
      e = !1,
      f = [];
    return function (g) {
      f = arguments;
      d ? (e = !0) : b();
    };
  }
  function ad() {
    return ua && xa
      ? xa.mobile
      : !bd() && (y("iPod") || y("iPhone") || y("Android") || y("IEMobile"));
  }
  function bd() {
    return ua && xa
      ? !xa.mobile && (y("iPad") || y("Android") || y("Silk"))
      : y("iPad") || (y("Android") && !y("Mobile")) || y("Silk");
  } /* 
 
 Copyright Google LLC 
 SPDX-License-Identifier: Apache-2.0 
*/
  let cd = globalThis.trustedTypes,
    dd;
  function ed() {
    let a = null;
    if (!cd) return a;
    try {
      const b = (c) => c;
      a = cd.createPolicy("goog#html", {
        createHTML: b,
        createScript: b,
        createScriptURL: b,
      });
    } catch (b) {}
    return a;
  }
  function fd() {
    dd === void 0 && (dd = ed());
    return dd;
  }
  var gd = class {
    constructor(a) {
      this.g = a;
    }
    toString() {
      return this.g + "";
    }
  };
  function hd(a) {
    const b = fd();
    a = b ? b.createScriptURL(a) : a;
    return new gd(a);
  }
  var id = /^\s*(?!javascript:)(?:[\w+.-]+:|[^:/?#]*(?:[/?#]|$))/i;
  var jd = class {
    constructor(a) {
      this.g = a;
    }
    toString() {
      return this.g + "";
    }
  };
  function kd(a = document) {
    a = a.querySelector?.("script[nonce]");
    return a == null ? "" : a.nonce || a.getAttribute("nonce") || "";
  }
  var ld = class {
    constructor(a) {
      this.g = a;
    }
    toString() {
      return this.g + "";
    }
  };
  function md(a) {
    const b = kd(a.ownerDocument);
    b && a.setAttribute("nonce", b);
  }
  var nd = class {
    constructor(a) {
      this.g = a;
    }
    toString() {
      return this.g;
    }
  };
  function od(a) {
    var b = pd`* { pointer-events: none; }`;
    if (b instanceof nd) b = b.g;
    else throw Error("");
    a.textContent = b;
  }
  function qd(a, b) {
    const c = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"' };
    let d;
    d = b ? b.createElement("div") : u.document.createElement("div");
    return a.replace(rd, function (e, f) {
      var g = c[e];
      if (g) return g;
      f.charAt(0) == "#" &&
        ((f = Number("0" + f.slice(1))),
        isNaN(f) || (g = String.fromCharCode(f)));
      if (!g) {
        g = e + " ";
        g = (f = fd()) ? f.createHTML(g) : g;
        g = new jd(g);
        if (d.nodeType === 1 && /^(script|style)$/i.test(d.tagName))
          throw Error("");
        if (g instanceof jd) g = g.g;
        else throw Error("");
        d.innerHTML = g;
        g = d.firstChild.nodeValue.slice(0, -1);
      }
      return (c[e] = g);
    });
  }
  var rd = /&([^;\s<&]+);?/g;
  function sd(a) {
    let b = 0;
    for (let c = 0; c < a.length; ++c) b = (31 * b + a.charCodeAt(c)) >>> 0;
    return b;
  }
  function td(a) {
    return String(a).replace(/\-([a-z])/g, function (b, c) {
      return c.toUpperCase();
    });
  }
  function ud(a) {
    return a.replace(RegExp("(^|[\\s]+)([a-z])", "g"), function (b, c, d) {
      return c + d.toUpperCase();
    });
  }
  function vd(a) {
    if (Ba() && ad()) {
      var b = Uc(a);
      if (b) {
        a = wd() === 0;
        var c = !!b.document.querySelector(
            'meta[name=viewport][content*="width=device-width"]'
          ),
          d = b.innerWidth;
        b = b.outerWidth;
        if (d === 0) a = 1;
        else {
          var e = Math.round((b / d + Number.EPSILON) * 100) / 100;
          a =
            e === 1
              ? 1
              : a || c
              ? e
              : Math.round((b / d / 0.4 + Number.EPSILON) * 100) / 100;
        }
      } else a = 1;
    } else a = 1;
    return a;
  }
  var wd = Yc(() => (ad() ? 2 : bd() ? 1 : 0));
  function xd() {
    if (!globalThis.crypto) return Math.random();
    try {
      const a = new Uint32Array(1);
      globalThis.crypto.getRandomValues(a);
      return a[0] / 65536 / 65536;
    } catch (a) {
      return Math.random();
    }
  }
  let yd,
    zd = 64;
  function Ad() {
    try {
      return (
        yd ?? (yd = new Uint32Array(64)),
        zd >= 64 && (crypto.getRandomValues(yd), (zd = 0)),
        yd[zd++]
      );
    } catch (a) {
      return Math.floor(Math.random() * 2 ** 32);
    }
  }
  function Bd(a) {
    if (!kb(a.goog_pvsid))
      try {
        const b = Ad() + (Ad() & (2 ** 21 - 1)) * 2 ** 32;
        Object.defineProperty(a, "goog_pvsid", { value: b, configurable: !1 });
      } catch (b) {}
    return Number(a.goog_pvsid) || -1;
  }
  function pd(a) {
    return new nd(a[0]);
  }
  function Cd(a, ...b) {
    if (b.length === 0) return hd(a[0]);
    let c = a[0];
    for (let d = 0; d < b.length; d++) c += encodeURIComponent(b[d]) + a[d + 1];
    return hd(c);
  }
  function Dd(a, b) {
    const c = Ed("SCRIPT", a);
    if (b instanceof gd) b = b.g;
    else throw Error("");
    c.src = b;
    md(c);
    (a = a.getElementsByTagName("script")[0]) &&
      a.parentNode &&
      a.parentNode.insertBefore(c, a);
  }
  function Fd(a, b) {
    return b.getComputedStyle ? b.getComputedStyle(a, null) : a.currentStyle;
  }
  var Gd = /^([0-9.]+)px$/,
    Hd = /^(-?[0-9.]{1,30})$/;
  function Id(a) {
    if (!Hd.test(a)) return null;
    a = Number(a);
    return isNaN(a) ? null : a;
  }
  function Jd(a) {
    return (a = Gd.exec(a)) ? +a[1] : null;
  }
  var E = (a, b) => {
      Rc(b, (c, d) => {
        a.style.setProperty(d, c, "important");
      });
    },
    Kd = (a, b) => {
      for (a = [a]; a.length; ) {
        var c = a.shift();
        b(c) !== !1 &&
          ((c = Ea(c.children || c.childNodes || [], (d) => d.nodeType === 1)),
          c.length && a.unshift(...c));
      }
    },
    Md = (a, b) => {
      if ("length" in a.style) {
        a = a.style;
        const c = a.length;
        for (let d = 0; d < c; d++) {
          const e = a[d];
          b(a[e], e, a);
        }
      } else (a = Ld(a.style.cssText)), Rc(a, b);
    },
    Ld = (a) => {
      const b = {};
      if (a) {
        const c = /\s*:\s*/;
        Da((a || "").split(/\s*;\s*/), (d) => {
          if (d) {
            var e = d.split(c);
            d = e[0];
            e = e[1];
            d && e && (b[d.toLowerCase()] = e);
          }
        });
      }
      return b;
    },
    Nd = (a, b = () => !0) => {
      const c = /!\s*important/i;
      Md(a, (d, e) => {
        !c.test(d) && b(e, d)
          ? a.style.setProperty(e, d, "important")
          : c.test(d) && !b(e, d) && a.style.setProperty(e, d, "");
      });
    };
  const Od = {
      ["http://googleads.g.doubleclick.net"]: !0,
      ["http://pagead2.googlesyndication.com"]: !0,
      ["https://googleads.g.doubleclick.net"]: !0,
      ["https://pagead2.googlesyndication.com"]: !0,
    },
    Pd = /\.proxy\.(googleprod|googlers)\.com(:\d+)?$/,
    Qd = /.*domain\.test$/,
    Rd = /\.prod\.google\.com(:\d+)?$/;
  function Ed(a, b = document) {
    return b.createElement(String(a).toLowerCase());
  }
  function Sd(a) {
    return Array.prototype.reduce.call(
      arguments,
      function (b, c) {
        return b + c;
      },
      0
    );
  }
  function Td(a) {
    return Sd.apply(null, arguments) / arguments.length;
  }
  function Vd(a, b) {
    this.x = a !== void 0 ? a : 0;
    this.y = b !== void 0 ? b : 0;
  }
  r = Vd.prototype;
  r.equals = function (a) {
    return (
      a instanceof Vd &&
      (this == a ? !0 : this && a ? this.x == a.x && this.y == a.y : !1)
    );
  };
  function Wd(a, b) {
    return new Vd(a.x - b.x, a.y - b.y);
  }
  r.ceil = function () {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  };
  r.floor = function () {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  };
  r.round = function () {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  };
  r.scale = function (a, b) {
    this.x *= a;
    this.y *= typeof b === "number" ? b : a;
    return this;
  };
  function Xd(a, b) {
    this.width = a;
    this.height = b;
  }
  r = Xd.prototype;
  r.aspectRatio = function () {
    return this.width / this.height;
  };
  r.isEmpty = function () {
    return !(this.width * this.height);
  };
  r.ceil = function () {
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this;
  };
  r.floor = function () {
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this;
  };
  r.round = function () {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this;
  };
  r.scale = function (a, b) {
    this.width *= a;
    this.height *= typeof b === "number" ? b : a;
    return this;
  };
  function Yd(a) {
    a = a.document;
    a = a.compatMode == "CSS1Compat" ? a.documentElement : a.body;
    return new Xd(a.clientWidth, a.clientHeight);
  }
  function Zd(a) {
    var b = a.document,
      c = 0;
    if (b) {
      c = b.body;
      const d = b.documentElement;
      if (!d || !c) return 0;
      a = Yd(a).height;
      if (b.compatMode == "CSS1Compat" && d.scrollHeight)
        c = d.scrollHeight != a ? d.scrollHeight : d.offsetHeight;
      else {
        b = d.scrollHeight;
        let e = d.offsetHeight;
        d.clientHeight != e && ((b = c.scrollHeight), (e = c.offsetHeight));
        c = b > a ? (b > e ? b : e) : b < e ? b : e;
      }
    }
    return c;
  }
  function $d(a) {
    return a ? a.defaultView : window;
  }
  function ae(a, b) {
    b = String(b);
    a.contentType === "application/xhtml+xml" && (b = b.toLowerCase());
    return a.createElement(b);
  }
  function be(a) {
    a && a.parentNode && a.parentNode.removeChild(a);
  }
  function ce(a, b) {
    return a && b ? a == b || a.contains(b) : !1;
  }
  function de(a) {
    return a.nodeType == 9 ? a : a.ownerDocument || a.document;
  }
  function ee(a, b, c, d) {
    a && !c && (a = a.parentNode);
    for (c = 0; a && (d == null || c <= d); ) {
      if (b(a)) return a;
      a = a.parentNode;
      c++;
    }
    return null;
  }
  function fe(a) {
    this.g = a || u.document || document;
  }
  function ge(a, b) {
    return ae(a.g, b);
  }
  fe.prototype.appendChild = function (a, b) {
    a.appendChild(b);
  };
  function he(a, b, c, d) {
    this.top = a;
    this.right = b;
    this.bottom = c;
    this.left = d;
  }
  r = he.prototype;
  r.getWidth = function () {
    return this.right - this.left;
  };
  r.getHeight = function () {
    return this.bottom - this.top;
  };
  function ie(a) {
    return new he(a.top, a.right, a.bottom, a.left);
  }
  r.ceil = function () {
    this.top = Math.ceil(this.top);
    this.right = Math.ceil(this.right);
    this.bottom = Math.ceil(this.bottom);
    this.left = Math.ceil(this.left);
    return this;
  };
  r.floor = function () {
    this.top = Math.floor(this.top);
    this.right = Math.floor(this.right);
    this.bottom = Math.floor(this.bottom);
    this.left = Math.floor(this.left);
    return this;
  };
  r.round = function () {
    this.top = Math.round(this.top);
    this.right = Math.round(this.right);
    this.bottom = Math.round(this.bottom);
    this.left = Math.round(this.left);
    return this;
  };
  r.scale = function (a, b) {
    b = typeof b === "number" ? b : a;
    this.left *= a;
    this.right *= a;
    this.top *= b;
    this.bottom *= b;
    return this;
  };
  function G(a, b, c) {
    if (typeof b === "string") je(a, c, b);
    else for (const d in b) je(a, b[d], d);
  }
  var ke = /^--.+/;
  function je(a, b, c) {
    (c = le(a, c)) &&
      (ke.test(c) ? a.style.setProperty(c, b) : (a.style[c] = b));
  }
  var me = {};
  function le(a, b) {
    let c = me[b];
    if (!c) {
      var d = td(b);
      c = d;
      a.style[d] === void 0 &&
        ((d = (Na ? "Webkit" : Ma ? "Moz" : null) + ud(d)),
        a.style[d] !== void 0 && (c = d));
      me[b] = c;
    }
    return c;
  }
  function ne(a, b) {
    const c = de(a);
    return c.defaultView &&
      c.defaultView.getComputedStyle &&
      (a = c.defaultView.getComputedStyle(a, null))
      ? a[b] || a.getPropertyValue(b) || ""
      : "";
  }
  function oe(a, b) {
    return (
      ne(a, b) ||
      (a.currentStyle ? a.currentStyle[b] : null) ||
      (a.style && a.style[b])
    );
  }
  function pe(a) {
    try {
      return a.getBoundingClientRect();
    } catch (b) {
      return { left: 0, top: 0, right: 0, bottom: 0 };
    }
  }
  function qe(a) {
    var b = de(a);
    const c = new Vd(0, 0);
    if (a == (b ? de(b) : document).documentElement) return c;
    a = pe(a);
    var d = (b ? new fe(de(b)) : sa || (sa = new fe())).g;
    b = d.scrollingElement
      ? d.scrollingElement
      : Na || d.compatMode != "CSS1Compat"
      ? d.body || d.documentElement
      : d.documentElement;
    d = d.defaultView;
    b = new Vd(d?.pageXOffset || b.scrollLeft, d?.pageYOffset || b.scrollTop);
    c.x = a.left + b.x;
    c.y = a.top + b.y;
    return c;
  }
  function re(a) {
    if (a.nodeType == 1) return (a = pe(a)), new Vd(a.left, a.top);
    a = a.changedTouches ? a.changedTouches[0] : a;
    return new Vd(a.clientX, a.clientY);
  }
  function se(a, b) {
    let c;
    if (b instanceof Xd) (c = b.height), (b = b.width);
    else throw Error("missing height argument");
    a.style.width = te(b, !0);
    a.style.height = te(c, !0);
  }
  function te(a, b) {
    typeof a == "number" && (a = (b ? Math.round(a) : a) + "px");
    return a;
  }
  function ue(a) {
    var b = ve;
    if (oe(a, "display") != "none") return b(a);
    const c = a.style,
      d = c.display,
      e = c.visibility,
      f = c.position;
    c.visibility = "hidden";
    c.position = "absolute";
    c.display = "inline";
    a = b(a);
    c.display = d;
    c.position = f;
    c.visibility = e;
    return a;
  }
  function ve(a) {
    const b = a.offsetWidth,
      c = a.offsetHeight,
      d = Na && !b && !c;
    return (b === void 0 || d) && a.getBoundingClientRect
      ? ((a = pe(a)), new Xd(a.right - a.left, a.bottom - a.top))
      : new Xd(b, c);
  }
  function we(a, b) {
    const c = ne(a, b + "Left"),
      d = ne(a, b + "Right"),
      e = ne(a, b + "Top");
    a = ne(a, b + "Bottom");
    return new he(parseFloat(e), parseFloat(d), parseFloat(a), parseFloat(c));
  }
  var xe = { capture: !0 },
    ye = { passive: !0 },
    ze = Yc(() => {
      let a = !1;
      try {
        const b = Object.defineProperty({}, "passive", {
          get() {
            a = !0;
          },
        });
        u.addEventListener("test", null, b);
      } catch (b) {}
      return a;
    });
  function Ae(a) {
    return a ? (a.passive && ze() ? a : a.capture || !1) : !1;
  }
  function H(a, b, c, d) {
    return typeof a.addEventListener === "function"
      ? (a.addEventListener(b, c, Ae(d)), !0)
      : !1;
  }
  function I(a, b, c, d) {
    return typeof a.removeEventListener === "function"
      ? (a.removeEventListener(b, c, Ae(d)), !0)
      : !1;
  }
  function Be(a) {
    a.preventDefault ? a.preventDefault() : (a.returnValue = !1);
  }
  function Ce(a, b, c = null, d = !1, e = !1) {
    De(a, b, c, d, e);
  }
  function De(a, b, c, d, e = !1) {
    a.google_image_requests || (a.google_image_requests = []);
    const f = Ed("IMG", a.document);
    if (c || d) {
      const g = (k) => {
        c && c(k);
        if (d) {
          k = a.google_image_requests;
          const h = Ca(k, f);
          h >= 0 && Array.prototype.splice.call(k, h, 1);
        }
        I(f, "load", g);
        I(f, "error", g);
      };
      H(f, "load", g);
      H(f, "error", g);
    }
    e && (f.attributionSrc = "");
    f.src = b;
    a.google_image_requests.push(f);
  }
  function Ee(a) {
    let b =
      "https://pagead2.googlesyndication.com/pagead/gen_204?id=rcs_internal";
    Rc(a, (c, d) => {
      if (c || c === 0) b += `&${d}=${encodeURIComponent(String(c))}`;
    });
    Fe(b);
  }
  function Fe(a) {
    var b = window;
    b.fetch
      ? b.fetch(a, {
          keepalive: !0,
          credentials: "include",
          redirect: "follow",
          method: "get",
          mode: "no-cors",
        })
      : Ce(b, a, void 0, !1, !1);
  }
  var Ge = class {
    constructor(a, b) {
      this.error = a;
      this.meta = {};
      this.context = b.context;
      this.msg = b.message || "";
      this.id = b.id || "jserror";
    }
  };
  function He(a) {
    return new Ge(a, { message: Ie(a) });
  }
  function Ie(a) {
    let b = a.toString();
    a.name && b.indexOf(a.name) == -1 && (b += ": " + a.name);
    a.message && b.indexOf(a.message) == -1 && (b += ": " + a.message);
    if (a.stack)
      a: {
        a = a.stack;
        var c = b;
        try {
          a.indexOf(c) == -1 && (a = c + "\n" + a);
          let d;
          for (; a != d; )
            (d = a),
              (a = a.replace(
                RegExp("((https?:/..*/)[^/:]*:\\d+(?:.|\n)*)\\2"),
                "$1"
              ));
          b = a.replace(RegExp("\n *", "g"), "\n");
          break a;
        } catch (d) {
          b = c;
          break a;
        }
        b = void 0;
      }
    return b;
  }
  const Je = RegExp(
    "^https?://(\\w|-)+\\.cdn\\.ampproject\\.(net|org)(\\?|/|$)"
  );
  var Ke = class {
      constructor(a, b) {
        this.g = a;
        this.j = b;
      }
    },
    Le = class {
      constructor(a, b) {
        this.url = a;
        this.g = !!b;
        this.depth = null;
      }
    };
  let Me = null;
  function Ne() {
    const a = u.performance;
    return a && a.now && a.timing
      ? Math.floor(a.now() + a.timing.navigationStart)
      : Date.now();
  }
  function Oe(a = u) {
    return (a = a.performance) && a.now ? a.now() : null;
  }
  function Pe(a, b = u) {
    return b.performance?.timing?.[a] || 0;
  }
  function Qe(a = u) {
    const b = Math.min(
      Pe("domLoading", a) || Infinity,
      Pe("domInteractive", a) || Infinity
    );
    return b === Infinity
      ? Math.max(Pe("responseEnd", a), Pe("navigationStart", a))
      : b;
  }
  var Re = class {
    constructor(a, b) {
      var c = Oe() || Ne();
      this.label = a;
      this.type = b;
      this.value = c;
      this.duration = 0;
      this.taskId = this.slotId = void 0;
      this.uniqueId = Math.random();
    }
  };
  const Se = u.performance,
    Te = !!(Se && Se.mark && Se.measure && Se.clearMarks),
    Ue = Yc(() => {
      var a;
      if ((a = Te)) {
        var b;
        a = window;
        if (Me === null) {
          Me = "";
          try {
            let c = "";
            try {
              c = a.top.location.hash;
            } catch (d) {
              c = a.location.hash;
            }
            c && (Me = (b = c.match(/\bdeid=([\d,]+)/)) ? b[1] : "");
          } catch (c) {}
        }
        b = Me;
        a = !!b.indexOf && b.indexOf("1337") >= 0;
      }
      return a;
    });
  function Ve(a) {
    a &&
      Se &&
      Ue() &&
      (Se.clearMarks(`goog_${a.label}_${a.uniqueId}_start`),
      Se.clearMarks(`goog_${a.label}_${a.uniqueId}_end`));
  }
  function We(a) {
    a.g = !1;
    a.j !== a.l.google_js_reporting_queue &&
      (Ue() && Da(a.j, Ve), (a.j.length = 0));
  }
  var Xe = class {
    constructor(a) {
      this.j = [];
      this.l = a || u;
      let b = null;
      a &&
        ((a.google_js_reporting_queue = a.google_js_reporting_queue || []),
        (this.j = a.google_js_reporting_queue),
        (b = a.google_measure_js_timing));
      this.g = Ue() || (b != null ? b : Math.random() < 1);
    }
    start(a, b) {
      if (!this.g) return null;
      a = new Re(a, b);
      b = `goog_${a.label}_${a.uniqueId}_start`;
      Se && Ue() && Se.mark(b);
      return a;
    }
    end(a) {
      if (this.g && kb(a.value)) {
        a.duration = (Oe() || Ne()) - a.value;
        var b = `goog_${a.label}_${a.uniqueId}_end`;
        Se && Ue() && Se.mark(b);
        !this.g || this.j.length > 2048 || this.j.push(a);
      }
    }
  };
  function Ye(a, b) {
    const c = {};
    c[a] = b;
    return [c];
  }
  function Ze(a, b, c, d, e) {
    const f = [];
    Rc(a, (g, k) => {
      (g = $e(g, b, c, d, e)) && f.push(`${k}=${g}`);
    });
    return f.join(b);
  }
  function $e(a, b, c, d, e) {
    if (a == null) return "";
    b = b || "&";
    c = c || ",$";
    lb(c) && (c = c.split(""));
    if (a instanceof Array) {
      if ((d || (d = 0), d < c.length)) {
        const f = [];
        for (let g = 0; g < a.length; g++) f.push($e(a[g], b, c, d + 1, e));
        return f.join(c[d]);
      }
    } else if (typeof a === "object")
      return (
        e || (e = 0), e < 2 ? encodeURIComponent(Ze(a, b, c, d, e + 1)) : "..."
      );
    return encodeURIComponent(String(a));
  }
  function af(a) {
    let b = 1;
    for (const c in a.j) c.length > b && (b = c.length);
    return 3997 - b - a.l.length - 1;
  }
  function bf(a, b, c) {
    b = "https://" + b + c;
    let d = af(a) - c.length;
    if (d < 0) return "";
    a.g.sort((f, g) => f - g);
    c = null;
    let e = "";
    for (let f = 0; f < a.g.length; f++) {
      const g = a.g[f],
        k = a.j[g];
      for (let h = 0; h < k.length; h++) {
        if (!d) {
          c = c == null ? g : c;
          break;
        }
        let m = Ze(k[h], a.l, ",$");
        if (m) {
          m = e + m;
          if (d >= m.length) {
            d -= m.length;
            b += m;
            e = a.l;
            break;
          }
          c = c == null ? g : c;
        }
      }
    }
    a = "";
    c != null && (a = `${e}trn=${c}`);
    return b + a;
  }
  var cf = class {
    constructor() {
      this.l = "&";
      this.j = {};
      this.A = 0;
      this.g = [];
    }
  };
  const df = RegExp(
    "^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$"
  );
  var gf = class {
    constructor(a = null) {
      this.ea = ef;
      this.g = a;
      this.j = null;
      this.A = !1;
      this.C = this.La;
    }
    l(a) {
      this.j = a;
    }
    B(a) {
      this.A = a;
    }
    Ba(a, b, c) {
      let d, e;
      try {
        this.g && this.g.g
          ? ((e = this.g.start(a.toString(), 3)), (d = b()), this.g.end(e))
          : (d = b());
      } catch (f) {
        b = !0;
        try {
          Ve(e), (b = this.C(a, He(f), void 0, c));
        } catch (g) {
          this.La(217, g);
        }
        if (b) window.console?.error?.(f);
        else throw f;
      }
      return d;
    }
    ca(a, b) {
      return (...c) => this.Ba(a, () => b.apply(void 0, c));
    }
    La(a, b, c, d, e) {
      e = e || "jserror";
      let f = void 0;
      try {
        const w = new cf();
        var g = w;
        g.g.push(1);
        g.j[1] = Ye("context", a);
        (b.error && b.meta && b.id) || (b = He(b));
        g = b;
        if (g.msg) {
          b = w;
          var k = g.msg.substring(0, 512);
          b.g.push(2);
          b.j[2] = Ye("msg", k);
        }
        var h = g.meta || {};
        k = h;
        if (this.j)
          try {
            this.j(k);
          } catch (K) {}
        if (d)
          try {
            d(k);
          } catch (K) {}
        d = w;
        h = [h];
        d.g.push(3);
        d.j[3] = h;
        var m;
        if (!(m = p)) {
          d = u;
          h = [];
          k = null;
          do {
            var l = d;
            if (Tc(l)) {
              var n = l.location.href;
              k = (l.document && l.document.referrer) || null;
            } else (n = k), (k = null);
            h.push(new Le(n || ""));
            try {
              d = l.parent;
            } catch (K) {
              d = null;
            }
          } while (d && l !== d);
          for (let K = 0, Kb = h.length - 1; K <= Kb; ++K) h[K].depth = Kb - K;
          l = u;
          if (
            l.location &&
            l.location.ancestorOrigins &&
            l.location.ancestorOrigins.length === h.length - 1
          )
            for (n = 1; n < h.length; ++n) {
              const K = h[n];
              K.url ||
                ((K.url = l.location.ancestorOrigins[n - 1] || ""), (K.g = !0));
            }
          m = h;
        }
        var p = m;
        let R = new Le(u.location.href, !1);
        m = null;
        const N = p.length - 1;
        for (l = N; l >= 0; --l) {
          var t = p[l];
          !m && Je.test(t.url) && (m = t);
          if (t.url && !t.g) {
            R = t;
            break;
          }
        }
        t = null;
        const X = p.length && p[N].url;
        R.depth !== 0 && X && (t = p[N]);
        f = new Ke(R, t);
        if (f.j) {
          p = w;
          var q = f.j.url || "";
          p.g.push(4);
          p.j[4] = Ye("top", q);
        }
        var z = { url: f.g.url || "" };
        if (f.g.url) {
          const K = f.g.url.match(df);
          var F = K[1],
            Z = K[3],
            M = K[4];
          q = "";
          F && (q += F + ":");
          Z && ((q += "//"), (q += Z), M && (q += ":" + M));
          var v = q;
        } else v = "";
        F = w;
        z = [z, { url: v }];
        F.g.push(5);
        F.j[5] = z;
        ff(this.ea, e, w, this.A, c);
      } catch (w) {
        try {
          ff(
            this.ea,
            e,
            { context: "ecmserr", rctx: a, msg: Ie(w), url: f?.g.url ?? "" },
            this.A,
            c
          );
        } catch (R) {}
      }
      return !0;
    }
  };
  var hf = class extends D {};
  function jf(a, b) {
    try {
      const c = (d) => [{ [d.mc]: d.jc }];
      return JSON.stringify([
        a.filter((d) => d.Hb).map(c),
        Xb(b),
        a.filter((d) => !d.Hb).map(c),
      ]);
    } catch (c) {
      return kf(c, b), "";
    }
  }
  function kf(a, b) {
    try {
      Ee({
        m: Ie(a instanceof Error ? a : Error(String(a))),
        b: (Fb(C(b, 1)) ?? 0) || null,
        v: (Jc(b, 2) ?? "") || null,
      });
    } catch (c) {}
  }
  function lf(a) {
    if (a.A) {
      var b = a.l,
        c = Set;
      var d = oc(a.l, 3, Ib, nc());
      c = [...new c([...d, ...a.A()])];
      uc(b, 3, c, Gb);
    }
    return ec(a.l);
  }
  var mf = class {
    constructor(a, b, c) {
      this.A = c;
      c = new hf();
      a = vc(c, 1, Eb(a), 0);
      this.l = Nc(a, 2, b);
    }
  };
  function nf(a) {
    var b = new of();
    return uc(b, 1, a, Db);
  }
  var of = class extends D {};
  var pf = class extends D {
      getTagSessionCorrelator() {
        return Kc(this, 13);
      }
    },
    qf = [12];
  var rf = class extends D {
      getTagSessionCorrelator() {
        return Kc(this, 1);
      }
      ob(a) {
        return Lc(this, 5, a);
      }
    },
    sf = [3, 4, 6, 7, 8, 9];
  var tf = class extends D {};
  var uf = class extends D {};
  function vf(a) {
    var b = Math,
      c = b.trunc;
    a: {
      if (globalThis.performance) {
        var d = performance.timeOrigin + performance.now();
        if (Number.isFinite(d) && d > 0) break a;
      }
      d = Date.now();
      d = Number.isFinite(d) && d > 0 ? d : 0;
    }
    return Mc(a, 7, c.call(b, d));
  }
  function wf(a) {
    var b = new xf();
    return vc(b, 10, Hb(a), 0);
  }
  var xf = class extends D {
      getTagSessionCorrelator() {
        return Kc(this, 8);
      }
      ob(a) {
        return Lc(this, 12, a);
      }
      getNoShowReasons() {
        return Kc(this, Ac(this, yf, 4));
      }
    },
    yf = [3, 4, 6];
  var zf = class extends D {};
  function Af() {
    var a = Bf();
    a = dc(a);
    return Nc(a, 1, Cf());
  }
  var Df = class extends D {};
  var Ef = class extends D {};
  var Ff = class extends D {
    getTagSessionCorrelator() {
      return Kc(this, 1);
    }
    ob(a) {
      return Lc(this, 2, a);
    }
  };
  var Gf = class extends D {},
    Hf = [1, 7],
    If = [4, 6, 8];
  class Jf extends mf {
    constructor() {
      super(...arguments);
    }
  }
  function Kf(a, ...b) {
    Lf(a, ...b.map((c) => ({ Hb: !0, mc: 3, jc: Xb(c) })));
  }
  function Mf(a, ...b) {
    Lf(a, ...b.map((c) => ({ Hb: !0, mc: 19, jc: Xb(c) })));
  }
  function Nf(a, ...b) {
    Lf(a, ...b.map((c) => ({ Hb: !0, mc: 28, jc: Xb(c) })));
  }
  var Pf = class extends Jf {};
  function Qf(a, b) {
    globalThis
      .fetch(a, {
        method: "POST",
        body: b,
        keepalive: b.length < 65536,
        credentials: "omit",
        mode: "no-cors",
        redirect: "follow",
      })
      .catch(() => {});
  }
  function Lf(a, ...b) {
    try {
      a.g.push(...b),
        a.g.length >= 100 && Rf(a),
        a.g.length &&
          a.j === null &&
          (a.j = setTimeout(() => {
            Rf(a);
          }, a.C));
    } catch (c) {
      kf(c, lf(a));
    }
  }
  function Rf(a) {
    a.j !== null && (clearTimeout(a.j), (a.j = null));
    if (a.g.length) {
      var b = jf(a.g, lf(a));
      a.B("https://pagead2.googlesyndication.com/pagead/ping?e=1", b);
      a.g = [];
    }
  }
  var Tf = class extends Pf {
      constructor(a, b) {
        super(2, a, Sf);
        this.B = Qf;
        this.C = b;
        this.g = [];
        this.j = null;
      }
    },
    Uf = class extends Tf {
      constructor(a, b = 1e3) {
        super(a, b);
      }
    };
  var Vf = (a) => {
    var b = "Zb";
    if (a.Zb && a.hasOwnProperty(b)) return a.Zb;
    b = new a();
    return (a.Zb = b);
  };
  function Wf(a, b, c) {
    return b[a] || c;
  }
  function Xf(a, b) {
    a.g = (c) => Wf(3, b, () => [])(c ?? 1);
  }
  class Yf {
    g() {
      return [];
    }
  }
  function Sf(a) {
    return Vf(Yf).g(a);
  }
  function ff(a, b, c, d = !1, e) {
    if ((d ? a.g : Math.random()) < (e || 0.01))
      try {
        let f;
        c instanceof cf
          ? (f = c)
          : ((f = new cf()),
            Rc(c, (k, h) => {
              var m = f;
              const l = m.A++;
              k = Ye(h, k);
              m.g.push(l);
              m.j[l] = k;
            }));
        const g = bf(f, a.domain, a.path + b + "&");
        g && Ce(u, g);
      } catch (f) {}
  }
  function Zf(a, b) {
    b >= 0 && b <= 1 && (a.g = b);
  }
  var $f = class {
    constructor() {
      this.domain = "pagead2.googlesyndication.com";
      this.path = "/pagead/gen_204?id=";
      this.g = Math.random();
    }
  };
  let ef, ag;
  const bg = new Xe(window);
  (function (a) {
    ef = a ?? new $f();
    typeof window.google_srt !== "number" &&
      (window.google_srt = Math.random());
    Zf(ef, window.google_srt);
    ag = new gf(bg);
    ag.l(() => {});
    ag.B(!0);
    window.document.readyState === "complete"
      ? window.google_measure_js_timing || We(bg)
      : bg.g &&
        H(window, "load", () => {
          window.google_measure_js_timing || We(bg);
        });
  })();
  var cg = (a) => {
    a = a.google_unique_id;
    return kb(a) ? a : 0;
  };
  function dg(a, b) {
    return a.g[eg(b)] !== void 0;
  }
  function fg(a) {
    const b = [];
    for (const c in a.g)
      a.g[c] !== void 0 && a.g.hasOwnProperty(c) && b.push(a.j[c]);
    return b;
  }
  var gg = class {
    constructor() {
      this.g = {};
      this.j = {};
    }
    set(a, b) {
      const c = eg(a);
      this.g[c] = b;
      this.j[c] = a;
    }
    get(a, b) {
      a = eg(a);
      return this.g[a] !== void 0 ? this.g[a] : b;
    }
    Fb() {
      return fg(this).length;
    }
    clear() {
      this.g = {};
      this.j = {};
    }
  };
  function eg(a) {
    return a instanceof Object ? String(x(a)) : a + "";
  }
  var hg = class {
      constructor(a) {
        this.C = a.g != null ? a.g : !0;
        this.B = a.L != null ? a.L : 0;
        this.A = a.B != null ? a.B : 0.9;
        this.j = a.j != null ? a.j : 1.05;
        this.minWidth = a.G != null ? a.G : 0;
        this.G = a.A != null ? a.A : 25;
        this.l = a.l != null ? a.l : 0;
        this.I = a.C != null ? a.C : !1;
        this.L = a.I || null;
        this.g = a.J || null;
      }
    },
    ig = class {
      build() {
        return new hg(this);
      }
    };
  function jg(a, b) {
    return (
      a.left < b.right &&
      b.left < a.right &&
      a.top < b.bottom &&
      b.top < a.bottom
    );
  }
  var kg = 728 * 1.38;
  function lg(a) {
    return a.innerHeight >= a.innerWidth;
  }
  function mg(a) {
    a = a.document;
    let b = {};
    a && (b = a.compatMode == "CSS1Compat" ? a.documentElement : a.body);
    return b || {};
  }
  function J(a) {
    return mg(a).clientWidth ?? void 0;
  }
  function ng(a, b) {
    const c = mg(a);
    return b
      ? c.scrollHeight === mg(a).clientHeight
        ? c.offsetHeight
        : c.scrollHeight
      : c.offsetHeight;
  }
  function og(a, b) {
    return a && a.source ? a.source === b || a.source.parent === b : !1;
  }
  function pg(a) {
    return a.pageYOffset === void 0
      ? (
          a.document.documentElement ||
          a.document.body.parentNode ||
          a.document.body
        ).scrollTop
      : a.pageYOffset;
  }
  function qg(a) {
    return a.pageXOffset === void 0
      ? (
          a.document.documentElement ||
          a.document.body.parentNode ||
          a.document.body
        ).scrollLeft
      : a.pageXOffset;
  }
  function rg(a) {
    const b = {};
    let c;
    Array.isArray(a) ? (c = a) : a && a.key_value && (c = a.key_value);
    if (c)
      for (a = 0; a < c.length; a++) {
        const d = c[a];
        if ("key" in d && "value" in d) {
          const e = d.value;
          b[d.key] = e == null ? null : String(e);
        }
      }
    return b;
  }
  function sg(a) {
    const b = {
      bottom: "auto",
      clear: "none",
      display: "inline",
      float: "none",
      height: "auto",
      left: "auto",
      margin: 0,
      "margin-bottom": 0,
      "margin-left": 0,
      "margin-right": "0",
      "margin-top": 0,
      "max-height": "none",
      "max-width": "none",
      opacity: 1,
      overflow: "visible",
      padding: 0,
      "padding-bottom": 0,
      "padding-left": 0,
      "padding-right": 0,
      "padding-top": 0,
      position: "static",
      right: "auto",
      top: "auto",
      "vertical-align": "baseline",
      visibility: "visible",
      width: "auto",
      "z-index": "auto",
    };
    Da(Object.keys(b), (c) => {
      const d = a.style[td(c)];
      (typeof d !== "undefined" ? d : a.style[le(a, c)]) || G(a, c, b[c]);
    });
    Nd(a);
  }
  function tg(a, b) {
    var c = J(a);
    var d = mg(a).clientHeight;
    if (typeof c !== "number" || typeof d !== "number")
      throw Error("No VP width and/or height.");
    c = new Xd(c, d);
    d = qg(a);
    a = pg(a);
    a = ug(a, c.width + d, c.height + a, d);
    return (
      (jg(b, a)
        ? new he(
            Math.max(b.top, a.top),
            Math.min(b.right, a.right),
            Math.min(b.bottom, a.bottom),
            Math.max(b.left, a.left)
          )
        : null) || ug(0, 0, 0, 0)
    );
  }
  function vg(a, b) {
    const c = qg(b),
      d = pg(b);
    if (a.getBoundingClientRect)
      return (
        (a = a.getBoundingClientRect()),
        wg(a)
          ? ug(a.top + d, a.right + c, a.bottom + d, a.left + c)
          : ug(0, 0, 0, 0)
      );
    b = b.document.createRange();
    b.selectNodeContents(a);
    return b.collapsed
      ? ug(0, 0, 0, 0)
      : b.getBoundingClientRect
      ? ((a = b.getBoundingClientRect()),
        wg(a)
          ? ug(a.top + d, a.right + c, a.bottom + d, a.left + c)
          : ug(0, 0, 0, 0))
      : ug(0, 0, 0, 0);
  }
  function wg(a) {
    return (
      !!a &&
      typeof a.top === "number" &&
      !isNaN(a.top) &&
      typeof a.right === "number" &&
      !isNaN(a.right) &&
      typeof a.bottom === "number" &&
      !isNaN(a.bottom) &&
      typeof a.left === "number" &&
      !isNaN(a.left)
    );
  }
  const ug = (a, b, c, d) =>
    new he(Math.ceil(a), Math.floor(b), Math.floor(c), Math.ceil(d));
  function xg(a, b) {
    yg(a).forEach(b, void 0);
  }
  function yg(a) {
    const b = [],
      c = a.length;
    for (let d = 0; d < c; d++) b.push(a[d]);
    return b;
  }
  function zg(a, b) {
    return dg(a.g, b);
  }
  var Ag = class {
    constructor(a) {
      this.g = new gg();
      if (a) for (let b = 0; b < a.length; ++b) this.add(a[b]);
    }
    add(a) {
      this.g.set(a, !0);
    }
  };
  class Bg {
    constructor(a, b) {
      this.g = a[u.Symbol.iterator]();
      this.j = b;
    }
    [Symbol.iterator]() {
      return this;
    }
    next() {
      const a = this.g.next();
      return {
        value: a.done ? void 0 : this.j.call(void 0, a.value),
        done: a.done,
      };
    }
  }
  function Cg(a, b) {
    return new Bg(a, b);
  }
  function Dg() {}
  Dg.prototype.next = function () {
    return Eg;
  };
  const Eg = { done: !0, value: void 0 };
  Dg.prototype.Oa = function () {
    return this;
  };
  function Fg(a) {
    if (a instanceof Dg) return a;
    if (typeof a.Oa == "function") return a.Oa(!1);
    if (ka(a)) {
      let b = 0;
      const c = new Dg();
      c.next = function () {
        for (;;) {
          if (b >= a.length) return Eg;
          if (b in a) return { value: a[b++], done: !1 };
          b++;
        }
      };
      return c;
    }
    throw Error("Not implemented");
  }
  function Gg(a) {
    a = Fg(a);
    const { done: b, value: c } = a.next();
    return b ? null : c;
  }
  function Hg(a) {
    if (a instanceof Ig || a instanceof Jg || a instanceof Kg) return a;
    if (typeof a.next == "function") return new Ig(() => a);
    if (typeof a[Symbol.iterator] == "function")
      return new Ig(() => a[Symbol.iterator]());
    if (typeof a.Oa == "function") return new Ig(() => a.Oa());
    throw Error("Not an iterator or iterable.");
  }
  class Ig {
    constructor(a) {
      this.g = a;
    }
    Oa() {
      return new Jg(this.g());
    }
    [Symbol.iterator]() {
      return new Kg(this.g());
    }
    j() {
      return new Kg(this.g());
    }
  }
  class Jg extends Dg {
    constructor(a) {
      super();
      this.g = a;
    }
    next() {
      return this.g.next();
    }
    [Symbol.iterator]() {
      return new Kg(this.g);
    }
    j() {
      return new Kg(this.g);
    }
  }
  class Kg extends Ig {
    constructor(a) {
      super(() => a);
      this.l = a;
    }
    next() {
      return this.l.next();
    }
  }
  function Lg(a, b) {
    this.j = {};
    this.g = [];
    this.l = this.size = 0;
    var c = arguments.length;
    if (c > 1) {
      if (c % 2) throw Error("Uneven number of arguments");
      for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1]);
    } else if (a)
      if (a instanceof Lg)
        for (c = Mg(a), d = 0; d < c.length; d++) this.set(c[d], a.get(c[d]));
      else for (d in a) this.set(d, a[d]);
  }
  r = Lg.prototype;
  r.Fb = function () {
    return this.size;
  };
  function Mg(a) {
    Ng(a);
    return a.g.concat();
  }
  r.has = function (a) {
    return Og(this.j, a);
  };
  r.equals = function (a, b) {
    if (this === a) return !0;
    if (this.size != a.Fb()) return !1;
    b = b || Pg;
    Ng(this);
    let c;
    for (let d = 0; (c = this.g[d]); d++)
      if (!b(this.get(c), a.get(c))) return !1;
    return !0;
  };
  function Pg(a, b) {
    return a === b;
  }
  r.isEmpty = function () {
    return this.size == 0;
  };
  r.clear = function () {
    this.j = {};
    this.l = this.size = this.g.length = 0;
  };
  r.delete = function (a) {
    return Og(this.j, a)
      ? (delete this.j[a],
        --this.size,
        this.l++,
        this.g.length > 2 * this.size && Ng(this),
        !0)
      : !1;
  };
  function Ng(a) {
    if (a.size != a.g.length) {
      for (var b = 0, c = 0; b < a.g.length; ) {
        var d = a.g[b];
        Og(a.j, d) && (a.g[c++] = d);
        b++;
      }
      a.g.length = c;
    }
    if (a.size != a.g.length) {
      b = {};
      for (d = c = 0; c < a.g.length; ) {
        const e = a.g[c];
        Og(b, e) || ((a.g[d++] = e), (b[e] = 1));
        c++;
      }
      a.g.length = d;
    }
  }
  r.get = function (a, b) {
    return Og(this.j, a) ? this.j[a] : b;
  };
  r.set = function (a, b) {
    Og(this.j, a) || ((this.size += 1), this.g.push(a), this.l++);
    this.j[a] = b;
  };
  r.forEach = function (a, b) {
    const c = Mg(this);
    for (let d = 0; d < c.length; d++) {
      const e = c[d],
        f = this.get(e);
      a.call(b, f, e, this);
    }
  };
  r.keys = function () {
    return Hg(this.Oa(!0)).j();
  };
  r.values = function () {
    return Hg(this.Oa(!1)).j();
  };
  r.entries = function () {
    const a = this;
    return Cg(this.keys(), function (b) {
      return [b, a.get(b)];
    });
  };
  r.Oa = function (a) {
    Ng(this);
    let b = 0;
    const c = this.l,
      d = this,
      e = new Dg();
    e.next = function () {
      if (c != d.l)
        throw Error("The map has changed since the iterator was created");
      if (b >= d.g.length) return Eg;
      const f = d.g[b++];
      return { value: a ? f : d.j[f], done: !1 };
    };
    return e;
  };
  function Og(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }
  function Qg(a) {
    return a == "transparent" ||
      (a.substring(0, 4) == "rgba" &&
        ((a = a.split(",")), a.length == 4 && parseFloat(a[3]) < 0.5))
      ? !0
      : !1;
  }
  function Rg() {
    Da(Sg, (a) => {
      a.J = null;
      a.G = null;
    });
  }
  function Tg(a) {
    if (!a.H.ownerDocument)
      throw Error("Wrapped node should have an owner document.");
    return a.H.ownerDocument;
  }
  function Ug(a) {
    a = Tg(a);
    return a.defaultView || a.parentWindow;
  }
  function Vg(a) {
    const b = a.l.g(a.l.j);
    return b == a || (b != a && ce(b.H, a.H));
  }
  function Wg(a) {
    return yg(a.H.childNodes)
      .map((b) => a.l.g(b))
      .filter(Xc((b) => b === null));
  }
  function Xg(a) {
    if (!a.g()) return null;
    const b = Wg(a.g());
    a = Ca(b, a);
    if (a == -1) return null;
    for (a += 1; a < b.length; ++a) if (b[a].A() || b[a].ua()) return b[a];
    return null;
  }
  function Yg(a) {
    const b = Xg(a);
    return b ? b : a.g() ? Yg(a.g()) : null;
  }
  function Zg(a, b) {
    b.push(a);
    a = Wg(a);
    for (let c = 0; c < a.length; ++c) Zg(a[c], b);
  }
  function $g(a) {
    var b = a.j();
    if (b.top != 0 || b.right != 0 || b.bottom != 0 || b.left != 0) {
      var c = qg(Ug(a));
      a = pg(Ug(a));
      c = -c;
      a = -a;
      c instanceof Vd
        ? ((b.left += c.x), (b.right += c.x), (b.top += c.y), (b.bottom += c.y))
        : ((b.left += c),
          (b.right += c),
          typeof a === "number" && ((b.top += a), (b.bottom += a)));
    }
    return b;
  }
  function L(a, b) {
    if (a.H.nodeType != 1) return null;
    a.B = a.B || Ug(a).getComputedStyle(a.H);
    return a.B ? a.B[b] || a.B.getPropertyValue(b) || "" : "";
  }
  function ah(a, b, c) {
    if (a.L[b] !== void 0) return a.L[b];
    a.L[b] = bh(a, b, c);
    return a.L[b];
  }
  function ch(a) {
    if (a.M !== void 0) return a.M;
    var b = L(a, "position");
    if (b == "fixed" || b == "sticky") b = a;
    else {
      var c = a.g();
      b =
        c && a.H.tagName != "BODY"
          ? (c = ch(c)) || (b != "absolute" && b != "relative")
            ? c
            : a
          : null;
    }
    a.M = b;
    return a.M;
  }
  function dh(a, b) {
    const c = ch(a);
    if (c && L(c, "position") != "relative")
      if (b != null)
        a: {
          do {
            const d = a.j();
            if ((d.right - d.left) * (d.bottom - d.top) > b) {
              b = !1;
              break a;
            }
            if (a == c) break;
            a = a.g();
          } while (a !== null);
          b = !0;
        }
      else b = !0;
    else b = !1;
    return b;
  }
  function bh(a, b, c) {
    const d = L(a, "position");
    a: switch (b) {
      case 0:
        var e =
          L(a, "overflow") == "hidden" ||
          L(a, "overflow") == "scroll" ||
          L(a, "overflow-x") == "hidden" ||
          L(a, "overflow-x") == "scroll";
        break a;
      case 1:
        e =
          L(a, "overflow") == "hidden" ||
          L(a, "overflow") == "scroll" ||
          L(a, "overflow-y") == "hidden" ||
          L(a, "overflow-y") == "scroll";
        break a;
      default:
        throw Error("Unknown pageAxis: " + b);
    }
    switch (d) {
      case "fixed":
        if (e) return a;
        break;
      case "static":
      case "":
      case null:
        if (e && !c) return a;
        if (a.g()) return ah(a.g(), b, c);
        break;
      case "absolute":
      case "relative":
        if (e) return a;
        if (a.g()) return ah(a.g(), b, d == "absolute");
        break;
      default:
        u.console.error("Unknown position value: " + d);
    }
    return null;
  }
  function eh(a) {
    var b = a.H.scrollHeight;
    const c = a.H.clientHeight,
      d = Tg(a).createElement("div");
    d.style.width = "100%";
    d.style.height = Math.max(b, c) + 100 + "px";
    d.style.clear = "both";
    a.H.appendChild(d);
    b =
      a.H.scrollHeight > a.H.clientHeight &&
      a.H.scrollHeight - b > a.H.clientHeight - c;
    a.H.removeChild(d);
    return b;
  }
  function fh(a) {
    return a.I !== null
      ? a.I
      : L(a, "opacity") != "1" || (a.g() && !fh(a.g()))
      ? (a.I = !1)
      : (a.I = !0);
  }
  function gh(a) {
    a = a.j();
    a = new he(
      Math.max(a.top, 0),
      Math.max(a.right, 0),
      Math.max(a.bottom, 0),
      Math.max(a.left, 0)
    );
    return a.left < a.right && a.top < a.bottom;
  }
  function hh(a) {
    return a.C !== null
      ? a.C
      : (a.g() && hh(a.g())) ||
        L(a, "opacity") == "0" ||
        L(a, "display") == "none" ||
        L(a, "visibility") == "hidden" ||
        (a.H.tagName &&
          a.H.tagName.toLowerCase() == "input" &&
          a.H.type &&
          a.H.type == "hidden")
      ? (a.C = !0)
      : (a.C = !1);
  }
  function ih(a, b) {
    return b(a) ? !0 : a.g() ? ih(a.g(), b) : !1;
  }
  function jh(a) {
    return !ih(a, (b) => L(b, "overflow-y") == "hidden");
  }
  function kh(a) {
    a = L(a, "position");
    return a == "absolute" || a == "relative";
  }
  function lh(a) {
    return a.A() && ((a = parseInt(L(a, "z-index"), 10)), !isNaN(a)) ? a : 0;
  }
  function mh(a, b) {
    return ih(a, (c) => !!c.H.tagName && c.H.tagName == b);
  }
  function nh(a, b) {
    return ih(a, (c) => {
      c = c.H;
      return !!c.id && !!c.id.match && !!c.id.match(b);
    });
  }
  function oh(a, b) {
    return ih(a, (c) => {
      a: {
        c = ph(c);
        for (let d = 0; d < c.length; ++d)
          if (c[d].match(b)) {
            c = !0;
            break a;
          }
        c = !1;
      }
      return c;
    });
  }
  function ph(a) {
    return (a = a.H.className) && typeof a.split === "function"
      ? /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1].split(/\s+/)
      : [];
  }
  function qh(a) {
    return a.H.tagName == "A"
      ? a.H.getAttribute("href")
      : (a = a.g())
      ? qh(a)
      : null;
  }
  function rh(a) {
    if (a.H.nodeType != 1) {
      var b = a.g();
      return b ? rh(b) : 0;
    }
    const c = Tg(a).createTextNode("A");
    a.H.appendChild(c);
    b = a.l.g(c);
    if (!b) throw (a.H.removeChild(c), Error("Unable to insert textnode"));
    a = b.j();
    b.H.parentNode && b.H.parentNode.removeChild(b.H);
    return a.bottom - a.top;
  }
  function sh(a, b) {
    if (b || a.K == null) {
      if (b && !b(a)) return 0;
      let c = 0;
      if (a.ua()) c = a.H.textContent.trim().length;
      else {
        const d = Wg(a);
        for (let e = 0; e < d.length; e++) c += sh(d[e], b);
      }
      b || (a.K = c);
      return c;
    }
    return a.K;
  }
  var th = class {
    constructor(a, b) {
      this.H = a;
      this.l = b;
      this.C = this.I = this.O = this.R = null;
      this.L = {};
      this.B = this.G = this.K = null;
      new Lg();
    }
    g() {
      return this.H != this.l.j && this.H.parentNode
        ? this.l.g(this.H.parentNode)
        : null;
    }
    A() {
      return this.H.nodeType == 1;
    }
    ua() {
      return this.H.nodeType == 3;
    }
    j() {
      if (!this.J) {
        this.G || (this.G = vg(this.H, Ug(this)));
        var a = ie(this.G);
        var b = L(this, "position");
        if (b == "fixed") b = tg(Ug(this), a);
        else if (this.g()) {
          var c = ah(this.g(), 0, b == "absolute");
          if (c) {
            var d = c.j();
            c = d.left;
            d = d.right;
            a =
              a.left >= d || a.right <= c
                ? null
                : ug(
                    a.top,
                    Math.min(a.right, d),
                    a.bottom,
                    Math.max(a.left, c)
                  );
          }
          a &&
            (b = ah(this.g(), 1, b == "absolute")) &&
            ((c = b.j()),
            (b = a),
            (a = c.top),
            (c = c.bottom),
            (a =
              b.top >= c || b.bottom <= a
                ? null
                : ug(
                    Math.max(b.top, a),
                    b.right,
                    Math.min(b.bottom, c),
                    b.left
                  )));
          b =
            a && ch(this) && L(ch(this), "position") == "fixed"
              ? tg(Ug(this), a)
              : a || new he(0, 0, 0, 0);
        } else b = a;
        this.J = b;
      }
      return ie(this.J);
    }
    Va() {
      return !gh(this) || hh(this);
    }
    ac() {
      var a = L(this, "background-color");
      if ((a = a ? Qg(a) : !0))
        (a = L(this, "background-image")), (a = !(a && a != "none"));
      return a;
    }
    toString() {
      switch (this.H.nodeType) {
        case 1:
          const a = this.H;
          let b = a.tagName;
          a.id && (b += "#" + a.id);
          a.className &&
            typeof a.className.split === "function" &&
            (b += "." + a.className.split(/\s+/).join("."));
          return b;
        case 3:
          return "TEXT#" + this.H.textContent.substr(0, 10);
        default:
          return "HtmlNode";
      }
    }
  };
  function uh(a, b) {
    const c = x(b);
    var d = a.A.get(c);
    if (typeof d === "boolean") return d;
    d =
      a.B && b.nodeType == 3
        ? !/\S/.test(b.data)
        : (b.nodeType != 1 && b.nodeType != 3 && b.nodeType != 9) ||
          (b.tagName && (b.tagName == "SCRIPT" || b.tagName == "STYLE"))
        ? !0
        : !1;
    !d && b.parentNode && b != a.j && (d = uh(a, b.parentNode));
    a.A.set(c, d);
    return d;
  }
  var vh = class {
      constructor(a, b) {
        this.j = a;
        this.B = b;
        this.A = new gg();
        this.l = new gg();
      }
      g(a) {
        const b = x(a),
          c = this.l.get(b);
        if (c) return c;
        if (uh(this, a)) return null;
        a = new th(a, this);
        this.l.set(b, a);
        return a;
      }
    },
    Sg = [];
  var xh = class {
    constructor(a, b) {
      this.l = a;
      this.j = b;
    }
    g(a) {
      return zg(wh(this.l, a), this.j);
    }
  };
  function wh(a, b) {
    const c = x(b),
      d = a.j.get(c);
    if (d) return d;
    b = a.g(b);
    a.j.set(c, b);
    return b;
  }
  var yh = class {
    constructor() {
      this.j = new gg();
    }
  };
  function zh(a, b) {
    let c = qh(b);
    if (a.l.g(b) && c !== null) return c;
    b = Wg(b);
    if (b.length < 1) return null;
    c = zh(a, b[0]);
    for (let d = 1; d < b.length; ++d) if (zh(a, b[d]) != c) return null;
    return c;
  }
  var Ah = class extends yh {
    constructor(a) {
      super();
      this.l = a;
    }
    g(a) {
      return new Ag(zh(this, a) !== null ? [1] : []);
    }
  };
  var Bh = class extends yh {
    constructor(a) {
      super();
      this.l = a;
    }
    g(a) {
      a: if (a.H.nodeType == 3) var b = this.l.g(a);
      else {
        b = !1;
        a = Wg(a);
        for (let c of a) {
          if ((a = L(c, "display")) && a != "inline") {
            b = !1;
            break a;
          }
          zg(wh(this, c), 0) && (b = !0);
        }
      }
      return new Ag(b ? [0] : []);
    }
  };
  function Ch(a, b) {
    return sh(b, (c) => !a.l.g(c));
  }
  var Dh = class extends yh {
    constructor(a, b, c) {
      super();
      this.A = a;
      this.l = b;
      this.B = c;
    }
    g(a) {
      if (this.A.g(a) && !this.l.g(a) && !this.B.g(a) && Ch(this, a) >= 50) {
        var b = rh(a);
        a = a.j();
        b = a.bottom - a.top >= 2 * b || !1;
      } else b = !1;
      return new Ag(b ? [3] : []);
    }
  };
  function Eh(a) {
    return a.classList
      ? a.classList.contains("adsbygoogle")
      : Ha(
          a.classList
            ? a.classList
            : (typeof a.className == "string"
                ? a.className
                : (a.getAttribute && a.getAttribute("class")) || ""
              ).match(/\S+/g) || [],
          "adsbygoogle"
        );
  }
  function Fh(a, b) {
    return a.l.g(b)
      ? ih(b, function (c) {
          switch (c.H.tagName) {
            case "H1":
            case "H2":
            case "H3":
            case "H4":
            case "H5":
            case "H6":
              return !0;
          }
          return !1;
        }) ||
        (Gh(b) && sh(b) >= 5)
        ? !0
        : (b = b.g())
        ? zg(wh(a, b), 2)
        : !1
      : !1;
  }
  function Gh(a) {
    a = ph(a);
    for (let b of a)
      if (
        b.match(/title|titulo|hdg|heading|header|^h[1-6]$/) &&
        !b.match(/subtitle/)
      )
        return !0;
    return !1;
  }
  var Hh = class extends yh {
    constructor(a) {
      super();
      this.l = a;
    }
    g(a) {
      return new Ag(Fh(this, a) ? [2] : []);
    }
  };
  function Ih(a) {
    const b = [];
    Da(a, (c) => {
      c.H.nodeType == 1 && (Jh(c, ":before", b), Jh(c, ":after", b));
    });
    return b;
  }
  function Kh(a) {
    a = L(a, "content");
    if (!a || "none" == a || /\(.*\)/.test(a)) return !1;
    /^['"].*['"]$/.test(a) && (a = a.substring(1, a.length - 1));
    return a.trim().length > 0;
  }
  var Lh = class extends th {
    constructor(a, b) {
      super(a.H, a.l);
      this.U = a;
      this.V = b;
      this.B = Ug(a).getComputedStyle(a.H, this.V);
    }
    A() {
      return !1;
    }
    ua() {
      return !1;
    }
    Va() {
      if (!Kh(this) && this.ac()) var a = !0;
      else if (!(a = this.g().Va() || hh(this) || !gh(this))) {
        a = Kh(this);
        const c = L(this, "width");
        var b = L(this, "height");
        b = (a && b == "auto") || parseFloat(b) > 0;
        a = !(((a && c == "auto") || parseFloat(c) > 0) && b);
      }
      return a;
    }
    g() {
      return this.U;
    }
    ac() {
      var a = this.g().H;
      a = oe(a, "backgroundColor");
      const b = L(this, "background-color");
      return b == null || b == a || Qg(b) || L(this, "position") != "fixed";
    }
    j() {
      switch (L(this, "position")) {
        case "absolute":
          var a = this.g().j();
          const b = a.top + parseInt(L(this, "top"), 10);
          a = a.left + parseInt(L(this, "left"), 10);
          let c = parseInt(L(this, "width"), 10),
            d = parseInt(L(this, "height"), 10);
          return new he(b, a + c, b + d, a);
        case "fixed":
          return new he(
            0,
            parseInt(L(this, "width"), 10),
            parseInt(L(this, "height"), 10),
            0
          );
        default:
          return this.g().j();
      }
    }
  };
  const Jh = (a, b, c) => {
    if (b == ":before" || b == ":after") {
      var d = new Lh(a, b);
      if (!d.Va())
        switch ((c.push(d), b)) {
          case ":before":
            a.R = d;
            break;
          case ":after":
            a.O = d;
            break;
          default:
            throw Error("Unsupported pseudo type " + b);
        }
    }
  };
  const Mh = new Ag(
    "IMG AMP-IMG IFRAME AMP-IFRAME HR EMBED OBJECT VIDEO AMP-VIDEO INPUT BUTTON SVG".split(
      " "
    )
  );
  var Nh = class extends yh {
    g(a) {
      var b = a.H,
        c = Tg(a);
      if (b.nodeType == 3) {
        var d = b.data;
        c = d.indexOf("&") != -1 ? qd(d, c) : d;
        c = /\S/.test(c);
      } else c = !1;
      (c = c || (a instanceof Lh ? Kh(a) : !1)) ||
        ((b = b.tagName), (c = !!b && zg(Mh, b.toUpperCase())));
      a = c && !a.Va();
      return new Ag(a ? [6] : []);
    }
  };
  function Oh(a) {
    a.B || (a.B = new Nh());
    return a.B;
  }
  function Ph(a) {
    a.j || (a.j = new Bh(new xh(Oh(a), 6)));
    return a.j;
  }
  function Qh(a) {
    a.l || (a.l = new Hh(new xh(Ph(a), 0)));
    return a.l;
  }
  var Rh = class {
    constructor() {
      this.A = this.l = this.g = this.j = this.B = null;
    }
  };
  var Sh = class {
    constructor() {
      this.g = new Rh();
    }
  };
  function Th(a) {
    const b = [];
    for (const c of a.g) b.push(c);
    return b;
  }
  var Uh = class {
    constructor() {
      this.g = [];
      this.l = new Ag();
    }
  };
  var Vh = class {
    constructor(a, b, c) {
      this.g = a;
      this.j = b;
      this.l = c;
    }
    ra() {
      return this.l;
    }
  };
  const Xh = (a, b, c) => {
      b = Wh(a.R, b, c);
      const d = new Vh(a, 0, b++);
      c.Ca.push(d);
      for (var e of Wg(a)) b = Xh(e, b, c);
      e = new Vh(a, 1, b++);
      c.Ca.push(e);
      c.map.set(x(a), { start: d, end: e });
      return (b = Wh(a.O, b, c));
    },
    Wh = (a, b, c) => {
      if (!a) return b;
      const d = new Vh(a, 0, b++),
        e = new Vh(a, 1, b++);
      c.Ca.push(d);
      c.Ca.push(e);
      c.map.set(x(a), { start: d, end: e });
      return b;
    };
  function Yh(a) {
    if (a instanceof Lh) return !0;
    if (!a.A()) return !1;
    const b = a.H,
      c = L(a, "position");
    if (
      b.tagName == "HTML" ||
      c == "fixed" ||
      (L(a, "z-index") != "auto" && (c == "absolute" || c == "relative"))
    )
      return !0;
    a = L(a, "opacity");
    return a != "1" && a != "" ? !0 : !1;
  }
  function Zh(a) {
    const b = a.g.g();
    return b ? $h(a.j, b) : null;
  }
  var ai = class {
      constructor(a, b) {
        this.g = a;
        this.j = b;
      }
    },
    di = class {
      constructor() {
        this.g = new bi();
      }
      compare(a, b) {
        var c = $h(this.g, a);
        const d = $h(this.g, b);
        c = ci(c, d);
        if (!c) return 0;
        switch (c.Rb) {
          case 0:
            return lh(a) - lh(c.Ob.g);
          case 1:
            return lh(c.Nb.g) - lh(b);
          case 2:
            return lh(c.Nb.g) - lh(c.Ob.g);
          default:
            throw Error("Unhandled adjacency.");
        }
      }
    };
  function $h(a, b) {
    const c = x(b);
    var d = a.g.get(c);
    if (d) return d;
    d = b.g();
    b = !d || Yh(b) ? new ai(b, a) : $h(a, d);
    a.g.set(c, b);
    return b;
  }
  var bi = class {
    constructor() {
      this.g = new gg();
    }
  };
  function ci(a, b) {
    if (a == b) return null;
    const c = new gg();
    var d = b;
    let e;
    for (; (e = Zh(d)); ) {
      if (a == e) return { Nb: a, Rb: 0, Ob: d };
      c.set(x(e), d);
      d = e;
    }
    for (; (e = Zh(a)); ) {
      if (e == b) return { Nb: a, Rb: 1, Ob: b };
      if ((d = c.get(x(e)))) return { Nb: a, Rb: 2, Ob: d };
      a = e;
    }
    throw Error("Contexts not in same DOM.");
  }
  function ei(a, b, c, d = []) {
    a = [].concat(a, d);
    b = new fi(b, c);
    for (let e of a)
      e.ac() || e.Va() || ((c = b), (a = e), c.g.push(a), c.l.add(x(a)));
    return b;
  }
  var fi = class extends Uh {
    constructor(a, b) {
      super();
      this.j = a;
      this.B = b;
    }
    A(a, b = !1) {
      const c = a.j();
      b = b ? Th(this) : this.g.slice(0);
      for (let f = 0; f < b.length; ++f) {
        var d = b[f];
        if (!Vg(d)) continue;
        var e = d.j();
        if (!jg(e, c)) continue;
        const g = this.B.compare(d, a);
        if (!(e = g > 0) && (e = g == 0 && !(d != a && ce(d.H, a.H))))
          a: {
            e = a;
            if (kh(d) && !kh(e)) {
              e = !0;
              break a;
            }
            if (!kh(d) && kh(e)) {
              e = !1;
              break a;
            }
            e = this.j.map.get(x(e));
            d = this.j.map.get(x(d));
            e = e && d && e.end.ra() < d.start.ra() ? !0 : !1;
          }
        if (e) return !0;
      }
      return !1;
    }
  };
  var gi = class {
    constructor(a, b) {
      this.Md = a;
      this.Rd = b;
    }
  };
  function hi(a, b) {
    let c = 0,
      d = null;
    const e = a.g.slice(0);
    for (let f = 0; f < e.length; ++f) {
      const g = a.j.map.get(x(e[f]));
      g.end.ra() < b && g.end.ra() > c && ((d = g), (c = g.end.ra()));
    }
    return d;
  }
  var ii = class extends Uh {
    constructor(a) {
      super();
      this.j = a;
    }
  };
  var ji = class extends ii {
    constructor(a, b) {
      super(a);
      this.B = b;
    }
    A(a, b = !1) {
      const c = a.j(),
        d = dh(a);
      b = b ? Th(this) : this.g.slice(0);
      for (let e = 0; e < b.length; ++e) {
        const f = b[e];
        if (Vg(f) && (d || !(this.B.compare(a, f) > 0)) && jg(b[e].j(), c))
          return !0;
      }
      return !1;
    }
  };
  var ki = class {
    constructor(a, b, c) {
      this.j = a;
      this.l = b;
      this.g = c;
    }
  };
  var li = class {
    constructor(a, b, c, d, e, f, g, k) {
      this.j = a;
      this.B = b;
      this.X = c;
      this.T = d;
      this.A = e;
      this.l = f;
      this.g = g;
      this.C = k;
    }
  };
  var mi = class {
    constructor(a, b, c, d) {
      this.j = a;
      this.A = b;
      this.l = c;
      this.g = d;
    }
  };
  var ni = class {
    constructor(a, b) {
      this.j = a;
      this.l = b;
    }
    g(a) {
      if (!a) return [9];
      a = a.j();
      a = a.right - a.left;
      return this.j <= a && a <= this.l ? [] : [4];
    }
  };
  var oi = class {
    constructor(a, b) {
      this.g = a;
      this.j = b || null;
    }
  };
  function pi(a) {
    if (a.j != 0) throw Error("Already resolved/rejected.");
  }
  var si = class {
    constructor() {
      this.g = new qi(this);
      this.j = 0;
    }
    resolve(a) {
      pi(this);
      this.j = 1;
      this.A = a;
      ri(this.g);
    }
    reject(a) {
      pi(this);
      this.j = 2;
      this.l = a;
      ri(this.g);
    }
  };
  function ri(a) {
    switch (a.g.j) {
      case 0:
        break;
      case 1:
        a.j && a.j(a.g.A);
        break;
      case 2:
        a.l && a.l(a.g.l);
        break;
      default:
        throw Error("Unhandled deferred state.");
    }
  }
  var qi = class {
    constructor(a) {
      this.g = a;
    }
    then(a, b) {
      if (this.j) throw Error("Then functions already set.");
      this.j = a;
      this.l = b;
      ri(this);
    }
  };
  function ti(a, b, c) {
    const d = new si();
    a.g(
      new oi(function () {
        d.resolve(b());
      }, c)
    );
    return d.g;
  }
  function ui(a, b, c, d) {
    a.g(
      new oi(function () {
        b.resolve(c);
      }, d)
    );
  }
  function vi(a, b) {
    a.g(
      new oi(function () {
        b.reject("n");
      }, "rrej")
    );
  }
  var wi = class {};
  var xi = class {
    constructor(a) {
      this.g = a;
    }
  };
  function yi(a, b) {
    const c = new si();
    a.g.g(
      new oi(function () {
        zi(a, b, c);
      }, "idom")
    );
    return c.g;
  }
  function Ai(a) {
    return ti(
      a.g,
      function () {
        return new Sh();
      },
      "icla"
    );
  }
  function Bi(a, b, c) {
    const d = new si();
    Ci(a, b, new xi(c.g)).then(function (e) {
      Di(a, b).then(function (f) {
        Ei(a, b, e).then(function (g) {
          d.resolve(new ki(f, g, e));
        });
      });
    });
    return d.g;
  }
  function Fi(a, b, c) {
    const d = new si();
    yi(a, b).then(function (e) {
      Ai(a).then(function (f) {
        Bi(a, e, f).then(function (g) {
          ui(a.g, d, new mi(e, g, f, c));
        }, d.reject.bind(d));
      }, d.reject.bind(d));
    }, d.reject.bind(d));
    return d.g;
  }
  function zi(a, b, c) {
    const d = b.document.body;
    if (d) {
      var e = b.document.body.getBoundingClientRect().width;
      if (e == null) c.reject("bw");
      else {
        var f = J(b),
          g = mg(b).clientHeight;
        if (f == null || g == null) c.reject("vp");
        else {
          var k = new vh(d, !0).g(d);
          if (k) {
            var h = new di();
            Gi(a, k).then((m) => {
              Sg = m;
              Hi(a, k).then((l) => {
                c.resolve(new li(b, e, f, g, k, m, l, h));
              });
            });
          } else c.reject("nt");
        }
      }
    } else c.reject("b");
  }
  function Gi(a, b) {
    return ti(
      a.g,
      function () {
        const c = [];
        Zg(b, c);
        return c;
      },
      "iflt"
    );
  }
  function Hi(a, b) {
    return ti(
      a.g,
      function () {
        const c = { map: new gg(), Ca: [] };
        Xh(b, 0, c);
        return c;
      },
      "intm"
    );
  }
  function Ci(a, b, c) {
    return ti(
      a.g,
      function () {
        var d = b.l;
        const e = new ji(b.g, b.C),
          f = new xh(Oh(c.g), 6);
        for (let k of d)
          if (f.g(k)) {
            d = e;
            var g = k;
            d.g.push(g);
            d.l.add(x(g));
          }
        return e;
      },
      "ivis"
    );
  }
  function Di(a, b) {
    return ti(
      a.g,
      function () {
        const c = Ih(b.l);
        return ei(b.l, b.g, b.C, c);
      },
      "ibck"
    );
  }
  function Ei(a, b, c) {
    return ti(
      a.g,
      function () {
        var d = b.g;
        const e = new gg();
        var f = 0;
        for (var g = 0; g < d.Ca.length; ++g) {
          var k = d.Ca[g],
            h = k.g,
            m;
          if ((m = k.j == 1))
            (m = L(h, "float")), (m = m == "left" || m == "right");
          m && ((h = h.j().bottom), h > f && (f = h));
          e.set(x(k), f);
        }
        f = new gg();
        g = Number.MAX_VALUE;
        for (k = d.Ca.length - 1; k >= 0; --k)
          (h = d.Ca[k]),
            (m = h.g),
            h.j == 0 && zg(c.l, x(m)) && ((m = m.j().top), m < g && (g = m)),
            f.set(x(h), g);
        d = new gg();
        g = fg(e);
        for (k = 0; k < g.length; ++k) {
          h = e.get(g[k]);
          m = f.get(g[k]);
          if (typeof m !== "number")
            throw Error("No entry in minSubsequentTopBounds for terminal UID!");
          d.set(g[k], new gi(h, m));
        }
        return d;
      },
      "irel"
    );
  }
  var Ii = class {
    constructor(a) {
      this.g = a;
    }
  };
  function Ji(a) {
    const b = [];
    xg(a.getElementsByTagName("p"), function (c) {
      Ki(c) >= 100 && b.push(c);
    });
    return b;
  }
  function Ki(a) {
    if (a.nodeType == 3) return a.length;
    if (a.nodeType != 1 || a.tagName == "SCRIPT") return 0;
    let b = 0;
    xg(a.childNodes, function (c) {
      b += Ki(c);
    });
    return b;
  }
  function Li(a) {
    return a.length == 0 || isNaN(a[0])
      ? a
      : "\\" + (30 + parseInt(a[0], 10)) + " " + a.substring(1);
  }
  function Mi(a, b) {
    if (a.g == null) return b;
    switch (a.g) {
      case 1:
        return b.slice(1);
      case 2:
        return b.slice(0, b.length - 1);
      case 3:
        return b.slice(1, b.length - 1);
      case 0:
        return b;
      default:
        throw Error("Unknown ignore mode: " + a.g);
    }
  }
  var Ni = class {
    constructor(a, b, c, d) {
      this.A = a;
      this.j = b;
      this.l = c;
      this.g = d;
    }
    toString() {
      return JSON.stringify({
        nativeQuery: this.A,
        occurrenceIndex: this.j,
        paragraphIndex: this.l,
        ignoreMode: this.g,
      });
    }
  };
  function Oi(a) {
    if (a.nodeType != 1) var b = !1;
    else if ((b = a.tagName == "INS"))
      a: {
        b = ["adsbygoogle-placeholder"];
        var c = a.className ? a.className.split(/\s+/) : [];
        a = {};
        for (let d = 0; d < c.length; ++d) a[c[d]] = !0;
        for (c = 0; c < b.length; ++c)
          if (!a[b[c]]) {
            b = !1;
            break a;
          }
        b = !0;
      }
    return b;
  }
  var Pi = class {
    constructor(a = 1) {
      this.g = a;
    }
    next() {
      const a = (48271 * this.g) % 2147483647;
      this.g = a * 2147483647 < 0 ? a + 2147483647 : a;
      return this.g / 2147483647;
    }
  };
  function Qi(a, b, c) {
    const d = [];
    for (const e of a.g) b(e) ? d.push(e) : c(e);
    return new Ri(d);
  }
  function Si(a, b = 1) {
    a = a.g.slice(0);
    const c = new Pi(b);
    Ka(a, () => c.next());
    return new Ri(a);
  }
  var Ri = class {
    constructor(a) {
      this.g = a.slice(0);
    }
    forEach(a) {
      this.g.forEach((b, c) => void a(b, c, this));
    }
    filter(a) {
      return new Ri(Ea(this.g, a));
    }
    apply(a) {
      return new Ri(a(this.g.slice(0)));
    }
    sort(a) {
      return new Ri(this.g.slice(0).sort(a));
    }
    get(a) {
      return this.g[a];
    }
    add(a) {
      const b = this.g.slice(0);
      b.push(a);
      return new Ri(b);
    }
  };
  var Ti = class extends D {
    getId() {
      return Jc(this, 3, B);
    }
  };
  var Ui = class {
    constructor(a, { ld: b, Ie: c, Ye: d, be: e }) {
      this.B = a;
      this.j = c;
      this.A = new Ri(b || []);
      this.g = e;
      this.l = d;
    }
  };
  var Vi = (a) => {
      var b = a.split("~").filter((c) => c.length > 0);
      a = new gg();
      for (const c of b)
        (b = c.indexOf(".")),
          b == -1 ? a.set(c, "") : a.set(c.substring(0, b), c.substring(b + 1));
      return a;
    },
    Xi = (a) => {
      var b = Wi(a);
      a = [];
      for (let c of b)
        (b = String(c.kb)),
          a.push(c.Xa + "." + (b.length <= 20 ? b : b.slice(0, 19) + "_"));
      return a.join("~");
    };
  const Wi = (a) => {
      const b = [],
        c = a.A;
      c && c.g.length && b.push({ Xa: "a", kb: Yi(c) });
      a.j != null && b.push({ Xa: "as", kb: a.j });
      a.l != null && b.push({ Xa: "i", kb: String(a.l) });
      a.g != null && b.push({ Xa: "rp", kb: String(a.g) });
      b.sort(function (d, e) {
        return d.Xa.localeCompare(e.Xa);
      });
      b.unshift({ Xa: "t", kb: Zi(a.B) });
      return b;
    },
    Zi = (a) => {
      switch (a) {
        case 0:
          return "aa";
        case 1:
          return "ma";
        default:
          throw Error("Invalid slot type" + a);
      }
    },
    Yi = (a) => {
      a = a.g.slice(0).map($i);
      a = JSON.stringify(a);
      {
        const c = a.length;
        if (c === 0) a = 0;
        else {
          var b = 305419896;
          for (let d = 0; d < c; d++)
            b ^= ((b << 5) + (b >> 2) + a.charCodeAt(d)) & 4294967295;
          a = b > 0 ? b : 4294967296 + b;
        }
      }
      return a;
    },
    $i = (a) => {
      const b = {};
      Jc(a, 7) != null && (b.q = Jc(a, 7, B));
      Ib(C(a, 2)) != null && (b.o = Ib(C(a, 2, B)));
      Ib(C(a, 5)) != null && (b.p = Ib(C(a, 5, B)));
      return b;
    };
  var aj = class extends D {
    setLocation(a) {
      return lc(this, 1, Eb(a));
    }
  };
  function bj(a, b, c) {
    switch (c) {
      case 0:
        b.parentNode && b.parentNode.insertBefore(a, b);
        break;
      case 3:
        if ((c = b.parentNode)) {
          let d = b.nextSibling;
          if (d && d.parentNode != c)
            for (; d && d.nodeType == 8; ) d = d.nextSibling;
          c.insertBefore(a, d);
        }
        break;
      case 1:
        b.insertBefore(a, b.firstChild);
        break;
      case 2:
        b.appendChild(a);
    }
    Oi(b) &&
      (b.setAttribute("data-init-display", b.style.display),
      (b.style.display = "block"));
  }
  function cj(a) {
    if (a && a.parentNode) {
      const b = a.parentNode;
      b.removeChild(a);
      Oi(b) &&
        (b.style.display = b.getAttribute("data-init-display") || "none");
    }
  }
  var O = class {
      constructor(a, b = !1) {
        this.g = a;
        this.defaultValue = b;
      }
    },
    dj = class {
      constructor(a, b = 0) {
        this.g = a;
        this.defaultValue = b;
      }
    };
  var ej = new O(698926295, !0),
    fj = new O(1397),
    gj = new dj(1359),
    hj = new dj(1358),
    ij = new O(1360),
    jj = new dj(1357),
    kj = new dj(1340, 0.2),
    lj = new dj(1339, 0.3),
    mj = new O(1337),
    nj = new dj(728201648, 100),
    oj = new O(1342),
    pj = new dj(1343, 300),
    qj = new O(313),
    rj = new O(752401956, !0),
    sj = new O(45719801),
    tj = new O(789511913, !0),
    uj = new O(823552246),
    vj = new O(730909245),
    wj = new O(730909244),
    xj = new O(755437760),
    yj = new O(730909246),
    zj = new O(730909247),
    Aj = new O(838458490, !0),
    Bj = new O(45753661),
    Cj = new O(45712481),
    Dj = new O(732272249),
    Ej = new O(775698923),
    Fj = new O(732217385),
    Gj = new O(733329085),
    Hj = new dj(732217386, 1e4),
    Ij = new dj(794150639, 5e3),
    Jj = new dj(732217387, 500),
    Kj = new O(791377772),
    Lj = new dj(811376351, 0.5),
    Mj = new dj(733329086, 3e4),
    Nj = new dj(629808663, 100),
    Oj = new dj(550718588, 250),
    Pj = new O(45459826),
    Qj = new O(531007060),
    Rj = new O(45545724),
    Sj = new O(45430975),
    Tj = new O(531582260),
    Uj = new O(886091922, !0),
    Vj = new O(885814544);
  var Yj = class {
    constructor() {
      const a = {};
      this.j = (b, c) => (a[b] != null ? a[b] : c);
      this.l = (b, c) => (a[b] != null ? a[b] : c);
      this.B = (b, c) => (a[b] != null ? a[b] : c);
      this.C = (b, c) => (a[b] != null ? a[b] : c);
      this.A = (b, c) => (a[b] != null ? c.concat(a[b]) : c);
      this.g = () => {};
    }
  };
  function P(a) {
    return Vf(Yj).j(a.g, a.defaultValue);
  }
  function Zj(a) {
    return Vf(Yj).l(a.g, a.defaultValue);
  }
  var bk = (a, b, c) => {
    var d = ak(b, c);
    if (d.init) {
      for (c = b = d.init; (c = d.la(c)); ) b = c;
      d = { anchor: b, position: d.Kb };
    } else d = { anchor: b, position: c };
    a["google-ama-order-assurance"] = 0;
    bj(a, d.anchor, d.position);
  };
  function ak(a, b) {
    const c = (e) => {
        e = ck(e);
        return e == null ? !1 : 0 < e;
      },
      d = (e) => {
        e = ck(e);
        return e == null ? !1 : 0 > e;
      };
    switch (b) {
      case 0:
        return {
          init: dk(a.previousSibling, c),
          la: (e) => dk(e.previousSibling, c),
          Kb: 0,
        };
      case 2:
        return {
          init: dk(a.lastChild, c),
          la: (e) => dk(e.previousSibling, c),
          Kb: 0,
        };
      case 3:
        return {
          init: dk(a.nextSibling, d),
          la: (e) => dk(e.nextSibling, d),
          Kb: 3,
        };
      case 1:
        return {
          init: dk(a.firstChild, d),
          la: (e) => dk(e.nextSibling, d),
          Kb: 3,
        };
    }
    throw Error("Un-handled RelativePosition: " + b);
  }
  function ck(a) {
    return a.hasOwnProperty("google-ama-order-assurance")
      ? a["google-ama-order-assurance"]
      : null;
  }
  function dk(a, b) {
    return a && b(a) ? a : null;
  }
  const ek = { 0: 0, 1: 1, 2: 2, 3: 3 };
  const fk = {
    BODY: { ba: [1, 2], ga: !1, ha: 2, fa: 4 },
    HEADER: { ba: [0, 3, 1, 2], ga: !1, ha: 1, fa: 3 },
    NAV: { ba: [0, 3], ga: !1, ha: 1, fa: 3 },
    H1: { ba: [0], ga: !1, ha: 1, fa: 2 },
    IMG: { ba: [0, 3], ga: !0, ha: 0, fa: 1 },
    DIV: { ba: [0, 3, 1, 2], ga: !0, ha: 0, fa: 1 },
    TABLE: { ba: [0, 3], ga: !0, ha: 0, fa: 1 },
    TD: { ba: [1, 2], ga: !0, ha: 0, fa: 1 },
    ASIDE: { ba: [0, 3, 1, 2], ga: !0, ha: 0, fa: 1 },
    LI: { ba: [1, 2], ga: !0, ha: 0, fa: 1 },
    SECTION: { ba: [0, 3, 1, 2], ga: !0, ha: 0, fa: 1 },
    H2: { ba: [0], ga: !1, ha: 0, fa: 2 },
    H3: { ba: [0], ga: !1, ha: 0, fa: 2 },
    H4: { ba: [0], ga: !1, ha: 0, fa: 2 },
    H5: { ba: [0], ga: !1, ha: 0, fa: 2 },
    H6: { ba: [0], ga: !1, ha: 0, fa: 2 },
    P: { ba: [0], ga: !0, ha: 0, fa: 1 },
    BLOCKQUOTE: { ba: [0, 3], ga: !0, ha: 0, fa: 1 },
    HR: { ba: [0, 3], ga: !1, ha: 0, fa: 1 },
    VIDEO: { ba: [0, 3], ga: !0, ha: 0, fa: 1 },
  };
  var gk = (a) => ({ ba: a.ba.slice(0), ga: a.ga, ha: a.ha, fa: a.fa }),
    hk = (a, b) => {
      const c = gk(a);
      c.ba = Ea(a.ba, (d) => b[d]);
      return c;
    };
  function ik(a) {
    let b = a.length - 1;
    const c = new Dg();
    c.next = function () {
      return b < 0 ? Eg : { value: a[b--], done: !1 };
    };
    return c;
  }
  const jk = { 0: !0, 1: !0 },
    kk = { 2: !0, 3: !0 },
    lk = { 3: !0 };
  var mk = class {
    constructor(a, b, c) {
      this.l = a;
      this.j = b;
      this.g = c;
    }
    la() {
      for (var a = Gg(this.j); a !== null; a = Gg(this.j)) {
        a: {
          var b = a.g;
          if (b.H.nodeType != 1) {
            b = null;
            break a;
          }
          var c = fk[b.H.tagName];
          if (!c) {
            b = null;
            break a;
          }
          a = hk(c, a.j == 0 ? jk : Wg(a.g).length > 0 ? kk : lk);
          b = { node: b, Tb: a, identifier: {} };
        }
        if (
          b &&
          ((a = b.node.j().getWidth()),
          (c = this.l),
          a == null || c == null ? 0 : a >= c * this.g.A && a <= c * this.g.j)
        )
          return (a = new si()), a.resolve(b), a.g;
      }
      b = new si();
      b.reject("na");
      return b.g;
    }
  };
  function nk(a, b) {
    do {
      const c = Fd(a, b);
      if (c && c.position === "fixed") return !1;
    } while ((a = a.parentElement));
    return !0;
  }
  function ok(a, b, c) {
    let d;
    return (
      (a.style && !!a.style[c] && Jd(a.style[c])) ||
      ((d = Fd(a, b)) && !!d[c] && Jd(d[c])) ||
      null
    );
  }
  function pk(a, b) {
    try {
      const c = b.document.documentElement.getBoundingClientRect(),
        d = a.getBoundingClientRect();
      return { x: d.left - c.left, y: d.top - c.top };
    } catch (c) {
      return null;
    }
  }
  function qk(a, b) {
    a = pk(a, b);
    return (a ? a.y : 0) < mg(b).clientHeight - 100;
  }
  function rk(a, b) {
    var c = ok(b, a, "height");
    if (c) return c;
    var d = b.style.height;
    b.style.height = "inherit";
    c = ok(b, a, "height");
    b.style.height = d;
    if (c) return c;
    c = Infinity;
    do
      (d = b.style && Jd(b.style.height)) && (c = Math.min(c, d)),
        (d = ok(b, a, "maxHeight")) && (c = Math.min(c, d));
    while (b.parentElement && (b = b.parentElement) && b.tagName !== "HTML");
    return c;
  }
  function sk(a, b) {
    let c;
    return (a.style && a.style.zIndex) || ((c = Fd(a, b)) && c.zIndex) || null;
  }
  function tk(a, b) {
    for (let c = 0; c < b.length; c++) {
      const d = b[c],
        e = td(d.property);
      a[e] = d.value;
    }
  }
  function uk(a, b, c) {
    var d = [];
    if ((c = c && c.g())) a.mb.className = c.join(" ");
    a = a.Qa;
    a.className = "adsbygoogle";
    a.setAttribute("data-ad-client", b);
    d.length && a.setAttribute("data-ad-channel", d.join("+"));
  }
  function vk(a, b) {
    var c = b.Vb || !1;
    const d = ge(new fe(a), "DIV"),
      e = d.style;
    e.width = "100%";
    e.height = "auto";
    e.clear = c ? "both" : "none";
    c = d.style;
    c.textAlign = "center";
    b.Jb && tk(c, b.Jb);
    a = ge(new fe(a), "INS");
    c = a.style;
    c.display = "block";
    c.margin = "auto";
    c.backgroundColor = "transparent";
    b.lc && (c.marginTop = b.lc);
    b.Ub && (c.marginBottom = b.Ub);
    b.Ab && tk(c, b.Ab);
    d.appendChild(a);
    return { mb: d, Qa: a };
  }
  function wk(a, b = !1) {
    if (a.g) return a.g;
    if ((b = a.L(b))) Rg(), !a.j && b && (a.j = b.j());
    return b;
  }
  function xk(a) {
    return a.J.node || null;
  }
  function yk(a) {
    return (a = xk(a)) && a.A() ? Oi(a.H) : !1;
  }
  function zk(a) {
    return fg(a.K.g)
      .map((b) => {
        switch (b) {
          case 1:
            return "IN ARTICLE";
          case 2:
            return "ABOVE FOOTER";
          case 3:
            return "ABOVE COMMENT";
          case 4:
            return "PEDESTAL";
          case 5:
            return "BELOW CONTENT";
          default:
            return null;
        }
      })
      .filter((b) => b != null)
      .join(", ");
  }
  var Ak = class {
      constructor(a) {
        this.J = a.j;
        this.l = a.A;
        this.j = this.g = null;
        this.B = !1;
        this.K = new Ag(fg(a.g.g));
      }
      G() {}
      L() {}
      I() {}
      A() {}
    },
    Bk = class {
      constructor(a, b) {
        this.j = a;
        this.A = b;
        this.g = new Ag();
        this.l = [];
      }
      build() {}
    };
  var Ck = class {
    constructor(a, b) {
      this.aa = a;
      this.height = b;
    }
  };
  var Dk = class extends Ck {
    g(a) {
      return a > Zj(pj) && this.height > 300
        ? this.aa
        : Math.min(1200, Math.round(a));
    }
    j() {}
  };
  function Ek(a) {
    return (b) => !!(b.Z() & a);
  }
  var Fk = class extends Dk {
    constructor(a, b, c, d = !1) {
      super(a, b);
      this.A = c;
      this.l = d;
    }
    Z() {
      return this.A;
    }
    ec() {
      return this.l;
    }
    j(a, b, c) {
      c.style.height = `${this.height}px`;
      b.rpe = !0;
    }
  };
  const Gk = {
      image_stacked: 1 / 1.91,
      image_sidebyside: 1 / 3.82,
      mobile_banner_image_sidebyside: 1 / 3.82,
      pub_control_image_stacked: 1 / 1.91,
      pub_control_image_sidebyside: 1 / 3.82,
      pub_control_image_card_stacked: 1 / 1.91,
      pub_control_image_card_sidebyside: 1 / 3.74,
      pub_control_text: 0,
      pub_control_text_card: 0,
    },
    Hk = {
      image_stacked: 80,
      image_sidebyside: 0,
      mobile_banner_image_sidebyside: 0,
      pub_control_image_stacked: 80,
      pub_control_image_sidebyside: 0,
      pub_control_image_card_stacked: 85,
      pub_control_image_card_sidebyside: 0,
      pub_control_text: 80,
      pub_control_text_card: 80,
    },
    Ik = {
      pub_control_image_stacked: 100,
      pub_control_image_sidebyside: 200,
      pub_control_image_card_stacked: 150,
      pub_control_image_card_sidebyside: 250,
      pub_control_text: 100,
      pub_control_text_card: 150,
    };
  function Jk(a) {
    var b = 0;
    a.Aa && b++;
    a.ya && b++;
    a.za && b++;
    if (b < 3)
      return {
        Na: "Tags data-matched-content-ui-type, data-matched-content-columns-num and data-matched-content-rows-num should be set together.",
      };
    b = a.Aa.split(",");
    const c = a.za.split(",");
    a = a.ya.split(",");
    if (b.length !== c.length || b.length !== a.length)
      return {
        Na: 'Lengths of parameters data-matched-content-ui-type, data-matched-content-columns-num and data-matched-content-rows-num must match. Example: \n data-matched-content-rows-num="4,2"\ndata-matched-content-columns-num="1,6"\ndata-matched-content-ui-type="image_stacked,image_card_sidebyside"',
      };
    if (b.length > 2)
      return {
        Na: `The parameter length of attribute data-matched-content-ui-type, data-matched-content-columns-num and data-matched-content-rows-num is too long. At most 2 parameters for each attribute are needed: one for mobile and one for desktop, while you are providing ${
          b.length
        } parameters. Example: ${'\n data-matched-content-rows-num="4,2"\ndata-matched-content-columns-num="1,6"\ndata-matched-content-ui-type="image_stacked,image_card_sidebyside"'}.`,
      };
    const d = [],
      e = [];
    for (let g = 0; g < b.length; g++) {
      var f = Number(c[g]);
      if (Number.isNaN(f) || f === 0)
        return {
          Na: `Wrong value '${c[g]}' for data-matched-content-rows-num.`,
        };
      d.push(f);
      f = Number(a[g]);
      if (Number.isNaN(f) || f === 0)
        return {
          Na: `Wrong value '${a[g]}' for data-matched-content-columns-num.`,
        };
      e.push(f);
    }
    return { za: d, ya: e, Kc: b };
  }
  function Kk(a) {
    return a >= 1200
      ? { width: 1200, height: 600 }
      : a >= 850
      ? { width: a, height: Math.floor(a * 0.5) }
      : a >= 550
      ? { width: a, height: Math.floor(a * 0.6) }
      : a >= 468
      ? { width: a, height: Math.floor(a * 0.7) }
      : { width: a, height: Math.floor(a * 3.44) };
  }
  function Lk(a, b) {
    return a * Gk[b] + Hk[b];
  }
  function Mk(a, b, c, d) {
    b = Math.floor(Lk((a - 8 * b - 8) / b, d) * c + 8 * c + 8);
    return a > 1500
      ? { width: 0, height: 0, je: `Calculated slot width is too large: ${a}` }
      : b > 1500
      ? { width: 0, height: 0, je: `Calculated slot height is too large: ${b}` }
      : { width: a, height: b };
  }
  function Nk(a, b) {
    const c = a - 8 - 8;
    --b;
    return {
      width: a,
      height:
        Math.floor(c / 1.91 + 70) +
        Math.floor(Lk(c, "mobile_banner_image_sidebyside") * b + 8 * b + 8),
    };
  }
  var Ok = { rectangle: 1, horizontal: 2, vertical: 4 };
  function Pk(a, b, c, d, e) {
    if (a !== a.top) return Uc(a) ? 3 : 16;
    if (!(J(a) < 488)) return 4;
    if (!lg(a)) return 5;
    const f = J(a);
    if (!f || (f - c) / f > d) a = 6;
    else {
      if ((c = e.google_full_width_responsive !== "true"))
        a: {
          c = b.parentElement;
          for (b = J(a); c; c = c.parentElement) {
            d = Fd(c, a);
            if (!d) continue;
            if ((e = Jd(d.width)) && !(e >= b) && d.overflow !== "visible") {
              c = !0;
              break a;
            }
          }
          c = !1;
        }
      a = c ? 7 : !0;
    }
    return a;
  }
  function Qk(a, b, c) {
    a = a.style;
    b === "rtl" ? (a.marginRight = c) : (a.marginLeft = c);
  }
  function Rk(a, b) {
    if (b.nodeType === 3) return /\S/.test(b.data);
    if (b.nodeType === 1) {
      if (/^(script|style)$/i.test(b.nodeName)) return !1;
      let c;
      try {
        c = Fd(b, a);
      } catch (d) {}
      return (
        !c ||
        (c.display !== "none" &&
          !(
            c.position === "absolute" &&
            (c.visibility === "hidden" || c.visibility === "collapse")
          ))
      );
    }
    return !1;
  }
  function Sk(a, b, c) {
    a = pk(b, a);
    return c === "rtl" ? -a.x : a.x;
  }
  function Tk(a, b) {
    var c;
    c = (c = b.parentElement) ? ((c = Fd(c, a)) ? c.direction : "") : "";
    if (c) {
      var d = b.style;
      d.border =
        d.borderStyle =
        d.outline =
        d.outlineStyle =
        d.transition =
          "none";
      d.borderSpacing = d.padding = "0";
      Qk(b, c, "0px");
      d.width = `${J(a)}px`;
      if (Sk(a, b, c) !== 0) {
        Qk(b, c, "0px");
        var e = Sk(a, b, c);
        Qk(b, c, `${-1 * e}px`);
        a = Sk(a, b, c);
        a !== 0 && a !== e && Qk(b, c, `${(e / (a - e)) * e}px`);
      }
      d.zIndex = "30";
    }
  }
  function Uk(a, b) {
    if (!a) return !1;
    a = a.hash;
    if (!a || !a.indexOf) return !1;
    if (a.indexOf(b) != -1) return !0;
    let c = "";
    for (const d of b.split("_")) c += d.substring(0, 2);
    b = c;
    return b != "go" && a.indexOf(b) != -1 ? !0 : !1;
  }
  const Vk = La("script");
  var Wk = class {
    constructor(
      a,
      b,
      c = null,
      d = null,
      e = null,
      f = null,
      g = null,
      k = null,
      h = null,
      m = null,
      l = null,
      n = null
    ) {
      this.G = a;
      this.Ma = b;
      this.Z = c;
      this.g = d;
      this.L = e;
      this.ka = f;
      this.Ea = g;
      this.A = k;
      this.B = h;
      this.j = m;
      this.l = l;
      this.C = n;
    }
    size() {
      return this.Ma;
    }
  };
  var Xk = class extends Error {
    constructor(a = "") {
      super();
      this.name = "TagError";
      this.message = a ? "adsbygoogle.push() error: " + a : "";
      Error.captureStackTrace
        ? Error.captureStackTrace(this, Xk)
        : (this.stack = Error().stack || "");
    }
  };
  var Yk = class extends Dk {
    constructor(a, b) {
      super(a, b);
    }
    g(a) {
      return Math.min(1200, Math.max(this.aa, Math.round(a)));
    }
  };
  function Zk(a, b) {
    $k(a, b);
    if (b.google_content_recommendation_ui_type === "pedestal" && !P(fj))
      return new Wk(9, new Yk(a, Math.floor(a * 2.189)));
    if (P(ij)) {
      var c = ad(),
        d = Zj(jj),
        e = Zj(hj),
        f = Zj(gj);
      a < 468
        ? c
          ? ((a = Nk(a, d)),
            (a = {
              Ia: a.width,
              Ha: a.height,
              ya: 1,
              za: d,
              Aa: "mobile_banner_image_sidebyside",
            }))
          : ((a = Mk(a, 1, d, "image_sidebyside")),
            (a = {
              Ia: a.width,
              Ha: a.height,
              ya: 1,
              za: d,
              Aa: "image_sidebyside",
            }))
        : ((a = Kk(a)),
          e === 1 && (a.height = Math.floor(a.height * 0.5)),
          (a = {
            Ia: a.width,
            Ha: a.height,
            ya: f,
            za: e,
            Aa: "image_stacked",
          }));
    } else
      P(fj)
        ? ((d = Kk(a)),
          (e = 4),
          (f = 2),
          a < 468 &&
            ((e = 1),
            (f = 6),
            (d = {
              width: a,
              height: Math.floor(Lk(a, "image_stacked") * f + 8 * f + 8),
            })),
          (a = {
            Ia: d.width,
            Ha: d.height,
            ya: e,
            za: f,
            Aa: "image_stacked",
          }))
        : ((d = ad()),
          a < 468
            ? d
              ? ((a = Nk(a, 12)),
                (a = {
                  Ia: a.width,
                  Ha: a.height,
                  ya: 1,
                  za: 12,
                  Aa: "mobile_banner_image_sidebyside",
                }))
              : ((a = Kk(a)),
                (a = {
                  Ia: a.width,
                  Ha: a.height,
                  ya: 1,
                  za: 13,
                  Aa: "image_sidebyside",
                }))
            : ((a = Kk(a)),
              (a = {
                Ia: a.width,
                Ha: a.height,
                ya: 4,
                za: 2,
                Aa: "image_stacked",
              })));
    al(b, a);
    return new Wk(9, new Yk(a.Ia, a.Ha));
  }
  function bl(a, b) {
    $k(a, b);
    {
      const f = Jk({
        za: b.google_content_recommendation_rows_num,
        ya: b.google_content_recommendation_columns_num,
        Aa: b.google_content_recommendation_ui_type,
      });
      if (f.Na)
        a = { Ia: 0, Ha: 0, ya: 0, za: 0, Aa: "image_stacked", Na: f.Na };
      else {
        var c = f.Kc.length === 2 && a >= 468 ? 1 : 0;
        var d = f.Kc[c];
        d = d.indexOf("pub_control_") === 0 ? d : "pub_control_" + d;
        var e = Ik[d];
        let g = f.ya[c];
        for (; a / g < e && g > 1; ) g--;
        e = g;
        c = f.za[c];
        a = Mk(a, e, c, d);
        a = { Ia: a.width, Ha: a.height, ya: e, za: c, Aa: d };
      }
    }
    if (a.Na) throw new Xk(a.Na);
    al(b, a);
    return new Wk(9, new Yk(a.Ia, a.Ha));
  }
  function $k(a, b) {
    if (a <= 0)
      throw new Xk(
        `Invalid responsive width from Matched Content slot ${b.google_ad_slot}: ${a}. Please ensure to put this Matched Content slot into a non-zero width div container.`
      );
  }
  function al(a, b) {
    a.google_content_recommendation_ui_type = b.Aa;
    a.google_content_recommendation_columns_num = b.ya;
    a.google_content_recommendation_rows_num = b.za;
  }
  var cl = class extends Dk {
    constructor(a, b) {
      super(a, b);
    }
    g() {
      return this.aa;
    }
    j(a, b, c) {
      Tk(a, c);
      c.style.height = `${this.height}px`;
      b.rpe = !0;
    }
  };
  const dl = {
    "image-top": (a) => (a <= 600 ? 284 + (a - 250) * 0.414 : 429),
    "image-middle": (a) =>
      a <= 500 ? 196 - (a - 250) * 0.13 : 164 + (a - 500) * 0.2,
    "image-side": (a) =>
      a <= 500 ? 205 - (a - 250) * 0.28 : 134 + (a - 500) * 0.21,
    "text-only": (a) => (a <= 500 ? 187 - 0.228 * (a - 250) : 130),
    "in-article": (a) =>
      a <= 420 ? a / 1.2 : a <= 460 ? a / 1.91 + 130 : a <= 800 ? a / 4 : 200,
  };
  var el = class extends Dk {
    constructor(a, b) {
      super(a, b);
    }
    g() {
      return Math.min(1200, this.aa);
    }
  };
  function fl(a, b, c, d, e) {
    var f = e.google_ad_layout || "image-top";
    if (f === "in-article") {
      var g = a;
      if (e.google_full_width_responsive === "false") a = g;
      else if (((a = Pk(b, c, g, Zj(kj), e)), a !== !0))
        (e.gfwrnwer = a), (a = g);
      else if ((a = J(b)))
        if (((e.google_full_width_responsive_allowed = !0), c.parentElement)) {
          b: {
            g = c;
            for (let k = 0; k < 100 && g.parentElement; ++k) {
              const h = g.parentElement.childNodes;
              for (let m = 0; m < h.length; ++m) {
                const l = h[m];
                if (l !== g && Rk(b, l)) break b;
              }
              g = g.parentElement;
              g.style.width = "100%";
              g.style.height = "auto";
            }
          }
          Tk(b, c);
        } else a = g;
      else a = g;
    }
    if (a < 250)
      throw new Xk(
        `Fluid responsive ads must be at least 250px wide: availableWidth=${a}`
      );
    a = Math.min(1200, Math.floor(a));
    if (d && f !== "in-article") {
      f = Math.ceil(d);
      if (f < 50)
        throw new Xk(
          `Fluid responsive ads must be at least 50px tall: height=${f}`
        );
      return new Wk(11, new Dk(a, f));
    }
    if (f !== "in-article" && (d = e.google_ad_layout_key)) {
      f = `${d}`;
      if ((d = (c = f.match(/([+-][0-9a-z]+)/g)) && c.length))
        for (b = [], e = 0; e < d; e++) b.push(parseInt(c[e], 36) / 1e3);
      else b = null;
      if (!b) throw new Xk(`Invalid data-ad-layout-key value: ${f}`);
      f = (a + -725) / 1e3;
      c = 0;
      d = 1;
      e = b.length;
      for (g = 0; g < e; g++) (c += b[g] * d), (d *= f);
      f = Math.ceil(c * 1e3 - -725 + 10);
      if (isNaN(f)) throw new Xk(`Invalid height: height=${f}`);
      if (f < 50)
        throw new Xk(
          `Fluid responsive ads must be at least 50px tall: height=${f}`
        );
      if (f > 1200)
        throw new Xk(
          `Fluid responsive ads must be at most 1200px tall: height=${f}`
        );
      return new Wk(11, new Dk(a, f));
    }
    d = dl[f];
    if (!d) throw new Xk("Invalid data-ad-layout value: " + f);
    c = qk(c, b);
    b = J(b);
    b =
      f !== "in-article" || c || a !== b
        ? Math.ceil(d(a))
        : Math.ceil(d(a) * 1.25);
    return new Wk(11, f === "in-article" ? new el(a, b) : new Dk(a, b));
  }
  var gl = [
      { aa: 970, height: 90, Z: 2 },
      { aa: 728, height: 90, Z: 2 },
      { aa: 468, height: 60, Z: 2 },
      { aa: 336, height: 280, Z: 1 },
      { aa: 320, height: 100, Z: 2 },
      { aa: 320, height: 50, Z: 2 },
      { aa: 300, height: 600, Z: 4 },
      { aa: 300, height: 250, Z: 1 },
      { aa: 250, height: 250, Z: 1 },
      { aa: 234, height: 60, Z: 2 },
      { aa: 200, height: 200, Z: 1 },
      { aa: 180, height: 150, Z: 1 },
      { aa: 160, height: 600, Z: 4 },
      { aa: 125, height: 125, Z: 1 },
      { aa: 120, height: 600, Z: 4 },
      { aa: 120, height: 240, Z: 4 },
      { aa: 120, height: 120, Z: 1, ec: !0 },
    ].map((a) => new Fk(a.aa, a.height, a.Z, a.ec ?? !1)),
    hl = [6, 12, 3, 0, 7, 14, 1, 8, 10, 4, 15, 2, 11, 5, 13, 9, 16].map(
      (a) => gl[a]
    );
  function Cf() {
    return "m202604100101";
  }
  var il = Pc(zf);
  var Bf = Pc(Df);
  function jl(a, b) {
    return b(a) ? a : void 0;
  }
  function kl(a, b, c, d, e) {
    c = c instanceof Ge ? c.error : c;
    var f = new Gf();
    const g = new Ff();
    try {
      var k = Bd(window);
      Mc(g, 1, k);
    } catch (p) {}
    try {
      var h = Sf();
      uc(g, 2, h, Gb);
    } catch (p) {}
    try {
      Nc(g, 3, window.document.URL);
    } catch (p) {}
    k = Gc(f, 2, g);
    h = new Ef();
    b = vc(h, 1, Eb(b), 0);
    try {
      var m = lb(c?.name) ? c.name : "Unknown error";
      Nc(b, 2, m);
    } catch (p) {}
    try {
      var l = lb(c?.message) ? c.message : `Caught ${c}`;
      Nc(b, 3, l);
    } catch (p) {}
    try {
      var n = lb(c?.stack) ? c.stack : Error().stack;
      n && uc(b, 4, n.split(/\n\s*/), Ob);
    } catch (p) {}
    m = Hc(k, 1, Hf, b);
    if (e) {
      l = 0;
      switch (e.errSrc) {
        case "LCC":
          l = 1;
          break;
        case "PVC":
          l = 2;
      }
      n = Af();
      b = jl(e.shv, lb);
      n = Nc(n, 2, b);
      l = vc(n, 6, Eb(l), 0);
      n = il();
      n = dc(n);
      b = jl(e.es, nb());
      n = uc(n, 1, b, Gb);
      n = ec(n);
      l = Gc(l, 4, n);
      n = jl(e.client, lb);
      l = lc(l, 3, Pb(n));
      n = jl(e.slotname, lb);
      l = Nc(l, 7, n);
      e = jl(e.tag_origin, lb);
      e = Nc(l, 8, e);
      e = ec(e);
    } else e = Oc(Af());
    e = Hc(m, 6, If, e);
    d = Mc(e, 5, d ?? 1);
    Kf(a, d);
  }
  var nl = class {
      constructor() {
        this.g = ll;
      }
      lb(a) {
        return ml(this.g(), a);
      }
    },
    ol = class {
      constructor() {
        this.g = ll();
      }
      lb(a) {
        return ml(this.g, a);
      }
    };
  function ll() {
    return {
      Sd: Ad() + (Ad() & (2 ** 21 - 1)) * 2 ** 32,
      qd: Number.MAX_SAFE_INTEGER,
    };
  }
  function ml(a, b) {
    return b > 0 && a.Sd * b <= a.qd;
  }
  var rl = class {
    constructor(a = !1) {
      var b = pl;
      this.ea = ql;
      this.j = a;
      this.C = b;
      this.g = null;
      this.A = this.La;
    }
    l(a) {
      this.g = a;
    }
    B() {}
    Ba(a, b, c) {
      let d;
      try {
        d = b();
      } catch (e) {
        b = this.j;
        try {
          b = this.A(a, He(e), void 0, c);
        } catch (f) {
          this.La(217, f);
        }
        if (b) window.console?.error?.(e);
        else throw e;
      }
      return d;
    }
    ca(a, b) {
      return (...c) => this.Ba(a, () => b.apply(void 0, c));
    }
    La(a, b, c, d) {
      try {
        const f = c === void 0 ? 1 / this.C : c === 0 ? 0 : 1 / c;
        if (new nl().lb(f)) {
          var e = this.ea;
          c = {};
          if (this.g)
            try {
              this.g(c);
            } catch (g) {}
          if (d)
            try {
              d(c);
            } catch (g) {}
          kl(e, a, b, f, c);
        }
      } catch (f) {}
      return this.j;
    }
  };
  let ql, sl, tl, ul, pl;
  const vl = new Xe(u);
  (function (a, b, c = !0) {
    ({ ae: pl, Fd: tl } = wl());
    sl = a || new $f();
    Zf(sl, tl);
    ql = b || new Uf(Cf(), 1e3);
    ul = new rl(c);
    u.document.readyState === "complete"
      ? u.google_measure_js_timing || We(vl)
      : vl.g &&
        H(u, "load", () => {
          u.google_measure_js_timing || We(vl);
        });
  })();
  function xl(a, b, c) {
    return ul.Ba(a, b, c);
  }
  function yl(a, b) {
    return ul.ca(a, b);
  }
  function zl(a, b, c = 0.01) {
    const d = Sf();
    !b.eid && d.length && (b.eid = d.toString());
    ff(sl, a, b, !0, c);
  }
  function wl() {
    let a, b;
    kb(u.google_srt)
      ? ((b = u.google_srt), (a = u.google_srt === 0 ? 1 : 0.01))
      : ((b = Math.random()), (a = 0.01));
    return { ae: a, Fd: b };
  }
  const Al = 2 / 3;
  function Bl(a) {
    return (b) => b.aa <= a;
  }
  function Cl(a) {
    return (b) => b.height <= a;
  }
  function Dl(a, b) {
    return b.Sb && b.bc ? Math.max(250, mg(a).clientHeight * Al) : 250;
  }
  function El(a, b, c) {
    const d = c.Ld && qk(b, a),
      e = Dl(a, { Sb: c.Sb, bc: c.bc });
    return (f) => !(d && f.height >= e);
  }
  function Fl(a) {
    return (b) => {
      for (let c = a.length - 1; c >= 0; --c) if (!a[c](b)) return !1;
      return !0;
    };
  }
  function Gl(a, b) {
    const c = hl.length;
    let d = null;
    for (let e = 0; e < c; ++e) {
      const f = hl[e];
      if (a(f)) {
        if (b == null || b(f)) return f;
        d === null && (d = f);
      }
    }
    return d;
  }
  function Hl(a, b, c, d, e) {
    e.google_full_width_responsive === "false"
      ? (c = { xa: a, ka: 1 })
      : (b === "autorelaxed" && e.google_full_width_responsive) ||
        b === "auto" ||
        /^((^|,) *(horizontal|vertical|rectangle) *)+$/.test(b) ||
        e.google_ad_resize
      ? ((b = Pk(c, d, a, Zj(lj), e)),
        b !== !0
          ? (e = b)
          : e.google_full_width_responsive === "true" || nk(d, c)
          ? ((e = J(c)),
            (b = e - a),
            (e = e && b >= 0 ? !0 : e ? (b < -10 ? 11 : b < 0 ? 14 : 12) : 10))
          : (e = 9),
        (c = e !== !0 ? { xa: a, ka: e } : { xa: J(c) || a, ka: !0 }))
      : (c = { xa: a, ka: 2 });
    const { xa: f, ka: g } = c;
    return g !== !0
      ? { xa: a, ka: g }
      : d.parentElement
      ? { xa: f, ka: g }
      : { xa: a, ka: g };
  }
  function Il(a, b, c, d, e) {
    const { xa: f, ka: g } = xl(247, () => Hl(a, b, c, d, e));
    var k = g === !0;
    const h = Jd(d.style.width),
      m = Jd(d.style.height),
      { Ma: l, Ea: n, Z: p, Jc: t } = Jl(f, b, c, d, e, k);
    k = Kl(b, p);
    var q;
    const z = (q = ok(d, c, "marginLeft")) ? `${q}px` : "",
      F = (q = ok(d, c, "marginRight")) ? `${q}px` : "";
    q = sk(d, c) || "";
    return new Wk(k, l, p, null, t, g, n, z, F, m, h, q);
  }
  function Jl(a, b, c, d, e, f) {
    b = Ll(c, a, b);
    let g;
    var k = !1;
    let h = !1;
    var m = J(c) < 488;
    if (m) {
      g = nk(d, c);
      var l = qk(d, c);
      k = !l && g;
      h = l && g;
    }
    l = [Bl(a), Ek(b)];
    if (!P(oj)) {
      const q = cg(c) === 0;
      l.push(El(c, d, { Ld: m, Sb: h, bc: q }));
    }
    e.google_max_responsive_height != null &&
      l.push(Cl(e.google_max_responsive_height));
    m = [(q) => !q.ec()];
    if (k || h) (k = rk(c, d)), m.push(Cl(k));
    const n = Gl(Fl(l), Fl(m));
    if (!n) throw new Xk(`No slot size for availableWidth=${a}`);
    const { Ma: p, Ea: t } = xl(248, () => {
      var q;
      a: if (f) {
        if (e.gfwrnh && (q = Jd(e.gfwrnh))) {
          q = { Ma: new cl(a, q), Ea: !0 };
          break a;
        }
        if (
          e.google_resizing_allowed ||
          e.google_full_width_responsive === "true"
        )
          q = Infinity;
        else {
          q = d;
          let F = Infinity;
          do {
            var z = ok(q, c, "height");
            z && (F = Math.min(F, z));
            (z = ok(q, c, "maxHeight")) && (F = Math.min(F, z));
          } while (
            q.parentElement &&
            (q = q.parentElement) &&
            q.tagName !== "HTML"
          );
          q = F;
        }
        !(P(mj) && q <= a * 2) &&
          ((q = Math.min(a, q)), q < a * 0.5 || q < 100) &&
          (q = a);
        q = { Ma: new cl(a, Math.floor(q)), Ea: q < a ? 102 : !0 };
      } else q = { Ma: n, Ea: 100 };
      return q;
    });
    return e.google_ad_layout === "in-article"
      ? { Ma: Ml(a, c, d, p, e), Ea: !1, Z: b, Jc: g }
      : { Ma: p, Ea: t, Z: b, Jc: g };
  }
  function Kl(a, b) {
    if (a === "auto") return 1;
    switch (b) {
      case 2:
        return 2;
      case 1:
        return 3;
      case 4:
        return 4;
      case 3:
        return 5;
      case 6:
        return 6;
      case 5:
        return 7;
      case 7:
        return 8;
      default:
        throw Error("bad mask");
    }
  }
  function Ll(a, b, c) {
    if (c === "auto") (c = Math.min(1200, J(a))), (b = b / c <= 0.25 ? 4 : 3);
    else {
      b = 0;
      for (const d in Ok) c.indexOf(d) !== -1 && (b |= Ok[d]);
    }
    return b;
  }
  function Ml(a, b, c, d, e) {
    const f = e.google_ad_height || ok(c, b, "height");
    b = fl(a, b, c, f, e).size();
    return b.aa * b.height > a * d.height ? new Fk(b.aa, b.height, 1) : d;
  }
  function Nl(a, b, c, d, e) {
    var f;
    (f = J(b))
      ? J(b) < 488
        ? lg(b)
          ? ((e.google_full_width_responsive_allowed = !0),
            Tk(b, c),
            (f = { xa: f, ka: !0 }))
          : (f = { xa: a, ka: 5 })
        : (f = { xa: a, ka: 4 })
      : (f = { xa: a, ka: 10 });
    const { xa: g, ka: k } = f;
    if (k !== !0 || a === g)
      return new Wk(12, new Dk(a, d), null, null, !0, k, 100);
    const { Ma: h, Ea: m, Z: l } = Jl(g, "auto", b, c, e, !0);
    return new Wk(1, h, l, 2, !0, k, m);
  }
  function Ol(a, b, c, d, e) {
    const f = d.google_ad_height || ok(c, e, "height") || 0;
    switch (a) {
      case 5:
        const { xa: g, ka: k } = xl(247, () =>
          Hl(b, d.google_ad_format, e, c, d)
        );
        k === !0 && b !== g && Tk(e, c);
        k === !0
          ? (d.google_full_width_responsive_allowed = !0)
          : ((d.google_full_width_responsive_allowed = !1), (d.gfwrnwer = k));
        return Zk(g, d);
      case 9:
        return P(fj) ? Zk(b, d) : bl(b, d);
      case 8:
        return fl(b, e, c, f, d);
      case 10:
        return Nl(b, e, c, f, d);
    }
  }
  var Pl = class extends Ak {
      constructor(a) {
        super(a);
        this.C = "";
      }
      G() {
        return 1;
      }
      L(a = !1) {
        const b = xk(this);
        if (!b) return null;
        yk(this) && (this.C = b.H.style.display);
        var c = zk(this),
          d = Tg(b),
          e = vk(d, { lc: "10px", Ub: "10px", Vb: this.B });
        e.mb.className = "google-auto-placed";
        var f = e.Qa,
          g = f.style;
        g.display = "inline-block";
        g.boxSizing = "border-box";
        g.width = "100%";
        g.height = a ? "auto" : "100px";
        g.backgroundColor = "#f60";
        g.border = "#000 solid 1px";
        c &&
          ((g = d.createElement("span")),
          (g.style.fontSize = "small"),
          g.appendChild(d.createTextNode(c)),
          f.appendChild(g));
        c = e.mb;
        e = e.Qa;
        d = b.H;
        f = ek[this.l];
        P(qj) ? bk(c, d, f) : bj(c, d, f);
        if (a)
          try {
            this.I(e, $d());
          } catch (k) {
            e.style.height = "100px";
          }
        this.g = b.l.g(c);
        this.g ||
          (c.parentNode.removeChild(c),
          yk(this) && (b.H.style.display = this.C));
        return this.g;
      }
      I(a, b) {
        var c = 1,
          d = { google_ad_format: "auto" },
          e =
            a.offsetWidth ||
            ((d.google_ad_resize || !1) && ok(a, b, "width")) ||
            d.google_ad_width ||
            0;
        c === 4 && ((d.google_ad_format = "auto"), (c = 1));
        var f = (f = Ol(c, e, a, d, b))
          ? f
          : Il(e, d.google_ad_format, b, a, d);
        f.size().j(b, d, a);
        f.Z != null && (d.google_responsive_formats = f.Z);
        f.L != null && (d.google_safe_for_responsive_override = f.L);
        f.ka != null &&
          (f.ka === !0
            ? (d.google_full_width_responsive_allowed = !0)
            : ((d.google_full_width_responsive_allowed = !1),
              (d.gfwrnwer = f.ka)));
        f.Ea != null && f.Ea !== !0 && (d.gfwrnher = f.Ea);
        b = f.l || d.google_ad_width;
        b != null && (d.google_resizing_width = b);
        b = f.j || d.google_ad_height;
        b != null && (d.google_resizing_height = b);
        b = f.size().g(e);
        const g = f.size().height;
        d.google_ad_width = b;
        d.google_ad_height = g;
        var k = f.size();
        e = `${k.g(e)}x${k.height}`;
        d.google_ad_format = e;
        d.google_responsive_auto_format = f.G;
        f.g != null && (d.armr = f.g);
        d.google_ad_resizable = !0;
        d.google_override_format = 1;
        d.google_loader_features_used = 128;
        f.ka === !0 && (d.gfwrnh = `${f.size().height}px`);
        f.A != null && (d.gfwroml = f.A);
        f.B != null && (d.gfwromr = f.B);
        f.j != null && (d.gfwroh = f.j);
        f.l != null && (d.gfwrow = f.l);
        f.C != null && (d.gfwroz = f.C);
        e = Uc(window) || window;
        Uk(e.location, "google_responsive_dummy_ad") &&
          (Ha([1, 2, 3, 4, 5, 6, 7, 8], f.G) || f.g === 1) &&
          f.g !== 2 &&
          ((e = JSON.stringify({
            googMsgType: "adpnt",
            key_value: [{ key: "qid", value: "DUMMY_AD" }],
          })),
          (d.dash = `<${Vk}>window.top.postMessage('${e}', '*'); 
          </${Vk}> 
          <div id="dummyAd" style="width:${b}px;height:${g}px; 
            background:#ddd;border:3px solid #f00;box-sizing:border-box; 
            color:#000;"> 
            <p>Requested size:${b}x${g}</p> 
            <p>Rendered size:${b}x${g}</p> 
          </div>`));
        c !== 1 && ((c = f.size().height), (a.style.height = `${c}px`));
      }
      A() {
        if (this.g) {
          var a = this.g;
          a.H.parentNode && a.H.parentNode.removeChild(a.H);
          this.g = null;
          yk(this) && (xk(this).H.style.display = this.C);
          Rg();
        }
      }
    },
    Ql = class extends Bk {
      build() {
        return new Pl(this);
      }
    };
  new Ag(["comments"]);
  new Ag(["allcomments"]);
  new Ag(["post-container", "post", "type-post"]);
  var Sl = (a, b, c) => {
      const d = [];
      a.map((e) => Rl(e, b, c)).forEach((e) => Ja(d, e));
      return d;
    },
    Rl = (a, b, c) => {
      const d = a.Tb.ba,
        e = a.node;
      if (!e) return [];
      const f = [];
      e.g() && Ha(d, 0) && f.push(0);
      Ha(d, 1) && f.push(1);
      Ha(d, 2) && (!Ha(d, 1) || Wg(e).length > 0) && f.push(2);
      e.g() && Ha(d, 3) && f.push(3);
      return f.map((g) => {
        g = new Ql(a, g);
        b.forEach(g.g.add, g.g);
        g.l.push(...c);
        return g.build();
      });
    },
    Tl = (a, b) => {
      a = xk(b) ? a.map.get(x(xk(b))) : void 0;
      if (!a) return -1;
      switch (b.l) {
        case 0:
          return a.start.ra();
        case 1:
          return a.start.ra() + 1;
        case 2:
          return a.end.ra();
        case 3:
          return a.end.ra() + 1;
      }
      return -1;
    },
    Ul = (a, b) => {
      a = xk(b) ? a.map.get(x(xk(b))) : void 0;
      if (!a) return -1;
      switch (b.l) {
        case 0:
          return a.start.ra() - 0.1;
        case 3:
          return a.end.ra() + 0.1;
        case 1:
          return a.start.ra() + 0.1;
        case 2:
          return a.end.ra() - 0.1;
      }
      return -1;
    };
  function Vl(a, b) {
    b && a.g.push(b);
    return a;
  }
  function Wl(a, b) {
    a.j.push(b);
    return a;
  }
  function Xl(a, b) {
    return ti(
      a.A,
      () => {
        const c = [];
        for (let d = 0; d < a.j.length; ++d) {
          const e = a.j[d].g(b);
          Ja(c, e);
          if (e.length > 0) break;
        }
        return c;
      },
      "flap"
    );
  }
  function Yl(a, b) {
    return ti(
      a.A,
      () => {
        if (a.g.length == 0) var c = [];
        else {
          var d = Math.floor(Ul(a.B, b));
          if (
            (d = d != -1 ? d + b.G() + "|" + b.B + "|10px|10px" : null) &&
            dg(a.l, d)
          )
            c = a.l.get(d);
          else {
            var e = [],
              f = wk(b);
            try {
              for (let g = 0; g < a.g.length; ++g)
                if (((c = a.g[g].g(f)), Ja(e, c), c.length > 0)) {
                  b.A();
                  break;
                }
            } finally {
              b.A();
            }
            d != null && a.l.set(d, e);
            c = e;
          }
        }
        return c;
      },
      "flfa"
    );
  }
  function Zl(a, b) {
    const c = new si();
    Xl(a, b).then((d) => {
      d.length > 0
        ? c.resolve(d)
        : Yl(a, b).then((e) => {
            c.resolve(d.concat(e));
          });
    });
    return c.g;
  }
  var $l = class {
    constructor(a, b) {
      this.A = a;
      this.g = [];
      this.j = [];
      this.B = b;
      this.l = new gg();
    }
  };
  var am = class {
    constructor(a) {
      this.j = a;
    }
    g(a) {
      if (!a) return [];
      for (let b = 0; b < this.j.length; ++b)
        if (this.j[b].A(a, !1)) return [2];
      return [];
    }
  };
  function bm(a, b) {
    Ja(a.l, b);
    return a;
  }
  var cm = class {
      constructor() {
        this.j = [];
        this.l = [];
        this.A = [];
      }
      g(a) {
        if ((a = xk(a))) {
          for (var b = 0; b < this.A.length; ++b)
            if (mh(a, this.A[b])) return [6];
          for (b = 0; b < this.j.length; ++b) if (nh(a, this.j[b])) return [6];
          for (b = 0; b < this.l.length; ++b) if (oh(a, this.l[b])) return [6];
        }
        return [];
      }
    },
    dm = [/cookie/, /(^|(-|_))sticky((-|_)|$)/],
    em = [/(^|(-|_))tab((-|_)|$)/, /(^|(-|_))tabs((-|_)|$)/],
    fm = [/(^|(-|_))slider((-|_)|$)/, /(^|(-|_))swiper((-|_)|$)/],
    gm = [
      /(^|(-|_))taboola((-|_)|$)/,
      /(^|(-|_))OUTBRAIN((-|_)|$)/,
      /(^|(-|_))revcontent((-|_)|$)/,
    ],
    hm = ["A", "FORM", "BUTTON"];
  var im = class {
    constructor(a, b) {
      this.j = a;
      this.l = b;
    }
    g(a) {
      if (!a) return [9];
      const b = ng(this.j, !0);
      return b == null ? [16] : b - a.j().bottom < this.l ? [17] : [];
    }
  };
  var jm = class {
    constructor(a, b) {
      this.j = a;
      this.l = b;
    }
    g(a) {
      for (a = Math.floor(Ul(this.j, a)); a > 0; a--) {
        const b = this.j.Ca[a];
        if (!b.g.Va()) {
          if ((b.j == 0 ? $g(b.g).top : $g(b.g).bottom) <= this.l) break;
          return [];
        }
      }
      return [10];
    }
  };
  var km = class {
    constructor(a, b, c) {
      this.j = a;
      this.g = b;
      this.l = c;
    }
  };
  var lm = class {
    constructor(a) {
      const b = [];
      a = a.g.slice(0);
      for (let c = 0; c < a.length; ++c) b.push(a[c].j());
      this.l = b;
      this.j = new gg();
    }
    g(a) {
      const b = x(a);
      if (dg(this.j, b)) return this.j.get(b);
      a: {
        var c = a.j();
        c = new km(c.left, c.top + a.H.scrollHeight, a.H.scrollWidth);
        for (e of this.l) {
          b: {
            if (c.g >= Math.floor(e.bottom)) {
              var d = !1;
              break b;
            }
            d = Math.ceil(e.left);
            const f = c.j + c.l;
            d = !(Math.floor(e.right) <= c.j || f <= d);
          }
          if (d) {
            var e = !0;
            break a;
          }
        }
        e = !1;
      }
      e = !e && a.H.scrollHeight > a.H.clientHeight && jh(a);
      c = a.g();
      c = !c || this.g(c);
      a = e && c ? !0 : e ? eh(a) : c && !eh(a);
      this.j.set(b, a);
      return a;
    }
  };
  var mm = class {
    constructor(a, b) {
      this.l = a;
      this.j = b;
    }
    g(a) {
      const b = xk(a);
      if (!b) return [];
      switch (a.l) {
        case 0:
        case 3:
          return (a = b.g()), b != this.l && a && this.j.g(a) ? [] : [14];
        case 1:
        case 2:
          return this.j.g(b) ? [] : [14];
        default:
          throw Error("Unhandled position.");
      }
    }
  };
  var nm = class {
    constructor(a) {
      this.j = a;
    }
    g(a) {
      return (a = xk(a)) && dh(a, this.j) ? [11] : [];
    }
  };
  var om = class {};
  function pm(a = null) {
    ({ googletag: a } = a ?? window);
    return a?.apiReady ? a : void 0;
  }
  function qm(a, b) {
    const c = rm(b, ".google-auto-placed"),
      d = rm(b, "ins.adsbygoogle[data-anchor-status]"),
      e = rm(b, "ins.adsbygoogle[data-ad-format=autorelaxed]");
    var f = (sm(b) || rm(b, "div[id^=div-gpt-ad]")).concat(
      rm(b, "iframe[id^=google_ads_iframe]")
    );
    const g = rm(
        b,
        "div.trc_related_container,div.OUTBRAIN,div[id^=rcjsload],div[id^=ligatusframe],div[id^=crt-],iframe[id^=cto_iframe],div[id^=yandex_], div[id^=Ya_sync],iframe[src*=adnxs],div.advertisement--appnexus,div[id^=apn-ad],div[id^=amzn-native-ad],iframe[src*=amazon-adsystem],iframe[id^=ox_],iframe[src*=openx],img[src*=openx],div[class*=adtech],div[id^=adtech],iframe[src*=adtech],div[data-content-ad-placement=true],div.wpcnt div[id^=atatags-]"
      ),
      k = rm(b, "ins.adsbygoogle-ablated-ad-slot"),
      h = rm(b, "div.googlepublisherpluginad"),
      m = rm(b, "html > ins.adsbygoogle");
    var l = [].concat(
        ...rm(b, "iframe[id^=aswift_],iframe[id^=google_ads_frame]"),
        ...rm(b, "body ins.adsbygoogle")
      ),
      n = [];
    a.Qe && (n = n.concat(rm(b, "ins.adsbygoogle[data-ad-hi]")));
    for (const [p, t] of [
      [a.Se, c],
      [a.Hc, d],
      [a.Ve, e],
      [a.Te, f],
      [a.We, g],
      [a.Re, k],
      [a.Ue, h],
      [a.Xe, m],
    ])
      (b = t), p === !1 ? (n = n.concat(b)) : (l = l.concat(b));
    l = tm(l);
    n = tm(n);
    l = l.slice(0);
    for (const p of n)
      for (n = 0; n < l.length; n++)
        (p.contains(l[n]) || l[n].contains(p)) && l.splice(n, 1);
    return a.Ed ? um(l) : l;
  }
  function vm(a) {
    return !!a.className && a.className.indexOf("google-auto-placed") != -1;
  }
  function wm(a) {
    const b = sm($d(de(a))) || [];
    return !!ee(
      a,
      (c) => {
        if (!la(c) || c.nodeType != 1) return !1;
        const d =
          c.matches ||
          c.webkitMatchesSelector ||
          c.mozMatchesSelector ||
          c.msMatchesSelector ||
          c.oMatchesSelector;
        return !d || Ha(b, c) || Ga(Object.values(xm), (e) => d.call(c, e));
      },
      !1,
      20
    );
  }
  function sm(a) {
    const b = pm(a);
    return b
      ? Ea(
          Fa(b.pubads().getSlots(), (c) =>
            a.document.getElementById(c.getSlotElementId())
          ),
          (c) => c != null
        )
      : null;
  }
  const xm = {
    ue: "ins.adsbygoogle-ablated-ad-slot",
    we: "body ins.adsbygoogle",
    ve: "iframe[id^=aswift_],iframe[id^=google_ads_frame]",
    xe: ".google-auto-placed",
    ye: "ins.adsbygoogle[data-anchor-status]",
    Ae: "iframe[id^=google_ads_iframe]",
    De: "div[id^=div-gpt-ad]",
    Fe: "ins.adsbygoogle[data-ad-format=autorelaxed]",
    Ge: "div.trc_related_container,div.OUTBRAIN,div[id^=rcjsload],div[id^=ligatusframe],div[id^=crt-],iframe[id^=cto_iframe],div[id^=yandex_], div[id^=Ya_sync],iframe[src*=adnxs],div.advertisement--appnexus,div[id^=apn-ad],div[id^=amzn-native-ad],iframe[src*=amazon-adsystem],iframe[id^=ox_],iframe[src*=openx],img[src*=openx],div[class*=adtech],div[id^=adtech],iframe[src*=adtech],div[data-content-ad-placement=true],div.wpcnt div[id^=atatags-]",
    Ce: "div.googlepublisherpluginad",
    He: "html > ins.adsbygoogle",
    ze: "div.autors-widget",
    Ee: "ins.adsbygoogle[data-ad-hi]",
  };
  function rm(a, b) {
    return Ia(a.document.querySelectorAll(b));
  }
  function um(a) {
    return a.filter((b) => !b.querySelector('[data-google-ad-efd="true"]'));
  }
  function tm(a) {
    const b = [];
    for (const c of a) {
      a = !0;
      for (let d = 0; d < b.length; d++) {
        const e = b[d];
        if (e.contains(c)) {
          a = !1;
          break;
        }
        if (c.contains(e)) {
          a = !1;
          b[d] = c;
          break;
        }
      }
      a && b.push(c);
    }
    return b;
  }
  var ym = yl(453, qm);
  function zm(a) {
    a = Am(a);
    Bm(a);
    return new Cm(a);
  }
  function Dm(a) {
    return a.g.map((b) => b.box);
  }
  var Cm = class {
    constructor(a) {
      this.g = a.slice(0);
    }
  };
  function Am(a) {
    const b = ym({ Hc: !1, Ed: !1 }, a),
      c = qg(a),
      d = pg(a);
    return b
      .map((e) => {
        const f = e.getBoundingClientRect();
        return (e = vm(e)) || (f.bottom - f.top) * (f.right - f.left) > 1
          ? {
              box: {
                top: f.top + d,
                right: f.right + c,
                bottom: f.bottom + d,
                left: f.left + c,
              },
              Je: e ? 1 : 0,
            }
          : null;
      })
      .filter(Xc((e) => e === null));
  }
  function Bm(a) {
    Fa(a, () => new om());
  }
  var Em = class {
    constructor(a, b, c) {
      this.j = ym({}, c)
        .map(qa(a.g, a))
        .filter(Xc((d) => d === null));
      this.l = b;
    }
    g(a) {
      if (!a) return [9];
      a = a.j();
      for (let d = 0; d < this.j.length; d++) {
        const e = this.j[d].j();
        var b;
        if ((b = (e.bottom - e.top) * (e.right - e.left) > 1)) {
          b = a.top;
          var c = this.l;
          (b = e.top - c < b && b < e.bottom + c) ||
            ((b = a.bottom),
            (c = this.l),
            (b = e.top - c < b && b < e.bottom + c));
        }
        if (b) return [8];
      }
      return [];
    }
  };
  var Fm = class {
    constructor(a, b) {
      this.j = a;
      this.l = b;
    }
    g(a) {
      if (yk(a)) return [];
      a = Ul(this.j.j, a);
      var b = hi(this.j, a);
      if (!b) return [];
      const c = this.l.g(b.start.g);
      b = b.end.ra();
      return c && a - b <= 10 ? [5] : [];
    }
  };
  const Gm = "ASIDE DIV IMG LI SECTION TABLE TD".split(" ");
  var Hm = class {
    g(a) {
      a = xk(a);
      if (!a) return [12];
      if (!Gm.includes(a.H.tagName) || a.H.id) return [];
      const b = ph(a),
        c = Tg(a);
      for (const d of b) if (c.getElementsByClassName(d).length == 1) return [];
      return a.j().getHeight() <= 150 ? [13] : [];
    }
  };
  var Im = class {
    g(a) {
      return a && !a.Va() && fh(a) ? [] : [3];
    }
  };
  function Jm(a, b) {
    return a.g.length > 0 ? (b.resolve(a.g.shift()), !0) : !1;
  }
  var Km = class {
    constructor(a, b) {
      this.j = a;
      this.B = b;
      this.G = [];
      this.A = [];
      this.g = [];
    }
    la() {
      const a = new si();
      this.j.g(new oi(qa(this.l, this, a), "p"));
      return a.g;
    }
    l(a) {
      Jm(this, a) || this.B.la().then(qa(this.C, this, a), a.reject.bind(a));
    }
    C(a, b) {
      b = Sl([b], this.G, this.A);
      Ja(this.g, b);
      Jm(this, a) || this.j.g(new oi(qa(this.l, this, a), "p"));
    }
  };
  var Lm = class {
    constructor(a) {
      this.g = a.filter((b) => yk(b));
      this.j = a.filter((b) => !yk(b));
    }
    la() {
      return this.g.shift() || this.j.shift() || null;
    }
  };
  var Mm = class {};
  function Nm(a, b) {
    a.j.g(
      new oi(() => {
        const c = a.g ? a.g.la() : null;
        c ? Om(a, b, c) : a.B.la().then(qa(a.C, a, b), qa(a.L, a, b));
      }, "r")
    );
  }
  function Om(a, b, c) {
    a.A && a.A.apply(c);
    a.l
      ? Zl(a.l, c).then(function (d) {
          d.length == 0
            ? (a.g.g.length > 0 || (a.g = null), ui(a.j, b, c, "rres"))
            : (a.G.push(new Mm()), Nm(a, b));
        })
      : ui(a.j, b, c, "rres");
  }
  var Pm = class {
    constructor(a, b, c, d) {
      this.j = a;
      this.B = b;
      this.A = c;
      this.l = d;
      this.g = null;
      this.G = [];
    }
    la() {
      const a = new si();
      Nm(this, a);
      return a.g;
    }
    C(a, b) {
      this.g = b;
      Nm(this, a);
    }
    L(a) {
      vi(this.j, a);
    }
  };
  var Qm = class {
    constructor(a) {
      this.g = a;
    }
    la() {
      const a = new si();
      this.g.la().then((b) => {
        a.resolve(new Lm([b]));
      }, a.reject.bind(a));
      return a.g;
    }
  };
  var Rm = class {
    constructor(a, b) {
      this.g = a;
      this.j = b;
    }
    apply(a) {
      var b = Tl(this.g, a);
      b = this.j.get(x(this.g.Ca[b]));
      a.B = b.Md <= b.Rd;
    }
  };
  var Sm = class {
    constructor(a) {
      this.j = a;
    }
    g(a) {
      a: {
        const b = xk(a);
        if (b) {
          switch (a.l) {
            case 0:
            case 3:
              if ((a = b.g())) break a;
              throw Error(
                "An ad placement with BEFORE or AFTER position cannot have an anchor with no parent."
              );
            case 1:
            case 2:
              a = b;
              break a;
          }
          throw Error("Un-handled ad placement position.");
        }
        a = null;
      }
      return a && Ha(this.j, a.H) ? [18] : [];
    }
  };
  var Tm = [{ hostname: /^([a-z]+.)?m.wikihow.com$/, xd: "mw-mf-viewport" }];
  const Um = (a) => {
    if (!a.location || !a.location.hostname) return [];
    const b = a.location.hostname,
      c = [];
    Da(Tm, function (d) {
      b.match(d.hostname) && (d = a.document.getElementById(d.xd)) && c.push(d);
    });
    return c;
  };
  function Vm(a, b) {
    a.j.g(
      new oi(function () {
        if (a.g)
          if (a.l.g(a.g)) {
            var c = a.g;
            a.g = Yg(a.g);
            b.resolve(c);
          } else {
            a: {
              c = a.g;
              const d = Wg(c);
              for (let e = 0; e < d.length; ++e)
                if (d[e].A()) {
                  c = d[e];
                  break a;
                }
              c = Yg(c);
            }
            a.g = c;
            Vm(a, b);
          }
        else b.reject(null);
      }, "fpar")
    );
  }
  var Wm = class {
    constructor(a, b, c) {
      this.j = a;
      this.g = b;
      this.l = c;
    }
    la() {
      const a = new si();
      Vm(this, a);
      return a.g;
    }
  };
  var Xm = class {
    constructor(a) {
      this.j = a;
      this.g = [];
    }
    reset() {
      const a = this.g;
      this.g = [];
      return a;
    }
  };
  const Ym = { ba: [3], ga: !1, ha: 0, fa: 1 },
    Zm = new Ag(["LI", "TR", "TD", "TH"]);
  function $m(a, b) {
    a.j.g(
      new oi(function () {
        a.B.la().then(qa(a.A, a, b), qa(a.l, a, b));
      }, "para")
    );
  }
  var an = class {
    constructor(a, b, c) {
      this.j = a;
      this.B = b;
      this.g = new Xm(c);
    }
    la() {
      const a = new si();
      $m(this, a);
      return a.g;
    }
    A(a, b) {
      var c = this.g;
      if (c.g.length) {
        var d = c.g[c.g.length - 1];
        var e = c.j;
        const f = e.j.map.get(x(b));
        (e = f ? hi(e, f.start.ra()) : null)
          ? ((e = e.start.g), (d = d == e || (d != e && ce(d.H, e.H))))
          : (d = !0);
      } else d = !0;
      d ? c.g.push(b) : (c.g = [b]);
      b = this.g;
      (b = b.g.length >= 3 ? b.g[b.g.length - 3 + 1] : null) &&
      !zg(Zm, b.H.tagName)
        ? a.resolve({ node: b, Tb: gk(Ym), identifier: {} })
        : $m(this, a);
    }
    l(a) {
      a.reject("na");
    }
  };
  var bn = class extends wi {
    constructor() {
      super();
      this.j = [];
      this.l = !1;
    }
    g(a) {
      this.j.push(a);
      if (!this.l) {
        this.l = !0;
        try {
          for (; this.j.length > 0; ) this.j.shift().g();
        } finally {
          this.l = !1;
        }
      }
    }
  };
  var cn = class {
    constructor() {
      this.g = Date.now();
      this.j = Date.now();
    }
  };
  class dn {
    constructor(a, b) {
      this.l = a;
      this.A = b;
      this.j = 0;
      this.g = null;
    }
    get() {
      let a;
      this.j > 0
        ? (this.j--, (a = this.g), (this.g = a.next), (a.next = null))
        : (a = this.l());
      return a;
    }
  }
  function en() {
    var a = fn;
    let b = null;
    a.g && ((b = a.g), (a.g = a.g.next), a.g || (a.j = null), (b.next = null));
    return b;
  }
  class gn {
    constructor() {
      this.j = this.g = null;
    }
    add(a, b) {
      const c = hn.get();
      c.set(a, b);
      this.j ? (this.j.next = c) : (this.g = c);
      this.j = c;
    }
  }
  var hn = new dn(
    () => new jn(),
    (a) => a.reset()
  );
  class jn {
    constructor() {
      this.next = this.g = this.j = null;
    }
    set(a, b) {
      this.j = a;
      this.g = b;
      this.next = null;
    }
    reset() {
      this.next = this.g = this.j = null;
    }
  }
  let kn,
    ln = !1,
    fn = new gn(),
    nn = (a, b) => {
      kn || mn();
      ln || (kn(), (ln = !0));
      fn.add(a, b);
    },
    mn = () => {
      const a = Promise.resolve(void 0);
      kn = () => {
        a.then(on);
      };
    };
  function on() {
    for (var a; (a = en()); ) {
      try {
        a.j.call(a.g);
      } catch (c) {
        ta(c);
      }
      var b = hn;
      b.A(a);
      b.j < 100 && (b.j++, (a.next = b.g), (b.g = a));
    }
    ln = !1;
  }
  var pn = class extends wi {
    constructor(a, b, c) {
      var d = new cn();
      super();
      this.I = a;
      this.j = d;
      this.C = b || null;
      this.A = c || null;
      this.l = [];
      this.B = !1;
      this.J = nn;
    }
    g(a) {
      this.l.push(a);
      this.B || this.J(this.L, this);
    }
    L() {
      this.C ? this.C(qa(this.G, this)) : this.G();
    }
    G() {
      if (!this.B) {
        this.B = !0;
        try {
          for (this.j.g = Date.now(); this.l.length > 0; ) {
            const a = this.l.shift();
            this.j.j = Date.now();
            a.g();
            this.A && this.A.j(Date.now() - this.j.j, a.j);
            if (Date.now() - this.j.g + 10 > 50) break;
          }
          this.l.length > 0 && this.I.setTimeout(qa(this.L, this), 0);
        } finally {
          (this.B = !1), this.A && this.A.g(Date.now() - this.j.g);
        }
      }
    }
  };
  function qn(a, b) {
    const c = new si(),
      d = b.I
        ? new pn(a, ra(xl, b.g ? "lr:apf:" + b.g : "lr:apf"), b.L)
        : new bn();
    d.g(
      new oi(function () {
        Fi(new Ii(d), a, b).then(function (e) {
          const f = e.j,
            g = e.A;
          var k = e.l;
          a: {
            var h = e.j,
              m = e.g.B;
            switch (m) {
              case 2:
                var l = h.A;
                h = e.l.g;
                h.A ||
                  ((m = new xh(Ph(h), 0)),
                  h.g || (h.g = new Ah(new xh(Ph(h), 0))),
                  (h.A = new Dh(m, new xh(h.g, 1), new xh(Qh(h), 2))));
                l = new an(d, new Wm(d, l, new xh(h.A, 3)), e.A.g);
                break a;
              default:
                l = h.B;
                var n = h.g.Ca;
                h = e.g;
                m = m == 1 ? ik(n) : Fg(n);
                l = new mk(l, m, h);
            }
          }
          l = new Qm(new Km(d, l));
          h = new Rm(f.g, g.l);
          m = new $l(d, f.g);
          e.g.C && Wl(m, new jm(f.g, f.T));
          n = Um(f.j);
          k = Wl(
            Wl(Wl(Wl(m, new Sm(n)), new Fm(g.g, new xh(Qh(k.g), 2))), new Hm()),
            new mm(f.A, new lm(g.g))
          );
          n = new cm();
          Ja(n.j, dm);
          n = bm(bm(n, em), fm);
          Ja(n.A, hm);
          Ja(n.j, gm);
          k = Vl(Wl(Wl(k, bm(n, gm)), new nm(f.X * f.T)), new Im());
          var p = e.g,
            t = e.j.B;
          n = Math.max(t * p.A, p.minWidth);
          p = t * p.j;
          n = n !== void 0 ? n : 0;
          p = p !== void 0 ? p : Infinity;
          if (n < 0 || p < 0) throw Error("apf::wf");
          Vl(
            Vl(
              Vl(k, n <= 0 && p === Infinity ? null : new ni(n, p)),
              new Em(f.A.l, e.g.G, f.j)
            ),
            new am([g.g, g.j])
          );
          e.g.l > 0 && Vl(m, new im(f.j, e.g.l));
          ui(d, c, new Pm(d, l, h, m), "itres");
        }, c.reject.bind(c));
      }, "i")
    );
    return c.g;
  }
  var rn = class {
    constructor(a) {
      this.g = new Ag(a);
    }
  };
  var sn = class {
    constructor(a) {
      this.g = a;
    }
    getValue() {
      return this.g.value;
    }
    map(a) {
      return this.g != null
        ? ((a = a(this.getValue())), a instanceof sn ? a : new sn({ value: a }))
        : this;
    }
  };
  function tn(a) {
    return (b) => {
      for (const c of a) c(b);
    };
  }
  var un = class extends D {
    getValue() {
      return Jc(this, 2, B);
    }
  };
  var vn = class extends D {};
  var wn = class extends D {};
  var xn = class extends D {};
  var yn = class extends D {},
    zn = Qc(yn);
  Xi(new Ui(0, {}));
  Xi(new Ui(1, {}));
  var An = class {
    constructor() {
      this.g = Cd`https://pagead2.googlesyndication.com/pagead/js/err_rep.js`;
    }
    La(a, b, c = 0.01, d = "jserror") {
      if (Math.random() > c) return !1;
      (b.error && b.meta && b.id) || (b = new Ge(b, { context: a, id: d }));
      u.google_js_errors = u.google_js_errors || [];
      u.google_js_errors.push(b);
      u.error_rep_loaded || (Dd(u.document, this.g), (u.error_rep_loaded = !0));
      return !1;
    }
    Ba(a, b) {
      try {
        return b();
      } catch (c) {
        if (!this.La(a, c, 0.01, "jserror")) throw c;
      }
    }
    ca(a, b) {
      return (...c) => this.Ba(a, () => b.apply(void 0, c));
    }
  };
  function Bn(a, b) {
    b = b.google_js_reporting_queue = b.google_js_reporting_queue || [];
    b.length < 2048 && b.push(a);
  }
  function Cn(a, b, c) {
    const d = c || window,
      e = typeof queueMicrotask !== "undefined";
    return function (...f) {
      e &&
        queueMicrotask(() => {
          d.google_rum_task_id_counter = d.google_rum_task_id_counter || 1;
          d.google_rum_task_id_counter += 1;
        });
      const g = Oe();
      let k,
        h = 3;
      try {
        k = a.apply(this, f);
      } catch (m) {
        h = 13;
        if (!b) throw m;
        b(754, m);
      } finally {
        d.google_measure_js_timing &&
          g &&
          Bn(
            {
              label: (754).toString(),
              value: g,
              duration: (Oe() || 0) - g,
              type: h,
              ...(e && {
                taskId: (d.google_rum_task_id_counter =
                  d.google_rum_task_id_counter || 1),
              }),
            },
            d
          );
      }
      return k;
    };
  }
  function Dn(a, b) {
    return Cn(
      a,
      (c, d) => {
        new An().La(c, d);
      },
      b
    );
  }
  function En(a, b) {
    return Dn(a, b).apply();
  }
  const Fn = { 1: 1, 2: 2, 3: 3, 0: 0 };
  function Gn(a) {
    return a == null ? a : Fn[a];
  }
  function Hn(a) {
    const b = [];
    for (let c = 0; c < a.length; c++) {
      const d = Jc(a[c], 1, B),
        e = a[c].getValue();
      d && e != null && b.push({ property: d, value: e });
    }
    return b;
  }
  function In(a, b) {
    const c = {};
    a && ((c.lc = Jc(a, 1, B)), (c.Ub = Jc(a, 2, B)), (c.Vb = !!Ic(a, 3, B)));
    b &&
      ((c.Jb = Hn(Ec(b, un, 3).map((d) => dc(d)))),
      (c.Ab = Hn(Ec(b, un, 4).map((d) => dc(d)))));
    return c;
  }
  const Jn = { 1: 0, 2: 1, 3: 2, 4: 3 };
  var Kn = class {
    constructor(a) {
      this.g = a;
    }
    j(a, b, c, d) {
      c = vk(d.document, this.g);
      c.Qa.setAttribute("data-ad-format", "auto");
      uk(c, a, b);
      return c;
    }
  };
  var Ln = class {
    constructor(a) {
      this.g = a;
    }
    j(a, b, c, d) {
      var e = Ec(this.g, vn, 9).length > 0 ? Ec(this.g, vn, 9)[0] : null,
        f = this.g.Y;
      (f = Cc(f, f[A] | 0, wn, 3)) || (f = wn[Va] || (wn[Va] = Sb(wn)));
      f = In(f, e);
      if (!e) return null;
      if ((e = Jc(e, 1, B))) {
        d = d.document;
        var g = c.tagName;
        c = ge(new fe(d), g);
        c.style.clear = f.Vb ? "both" : "none";
        g == "A" && (c.style.display = "block");
        c.style.padding = "0px";
        c.style.margin = "0px";
        f.Jb && tk(c.style, f.Jb);
        d = ge(new fe(d), "INS");
        f.Ab && tk(d.style, f.Ab);
        c.appendChild(d);
        f = { mb: c, Qa: d };
        f.Qa.setAttribute("data-ad-type", "text");
        f.Qa.setAttribute("data-native-settings-key", e);
        uk(f, a, b);
        a = f;
      } else a = null;
      return a;
    }
  };
  var Mn = class {
    constructor(a, b) {
      this.j = a;
      this.g = b;
    }
  };
  function Nn(a) {
    return a.A;
  }
  function On(a, b) {
    dg(a.j, 0) || a.j.set(0, []);
    a.j.get(0).push(b);
  }
  var Pn = class {
    constructor(a, b, c, d, e, f, g, k = null, h = null) {
      this.g = a;
      this.L = b;
      this.I = c;
      this.Mc = d;
      e || new aj();
      this.l = f;
      this.C = g;
      this.B = k;
      (this.G = h) && Dc(h, Ti, 1) && ((a = Dc(h, Ti, 1)), Ib(C(a, 5)));
      this.J = [];
      this.A = !1;
      this.j = new gg();
    }
    ra() {
      return this.C;
    }
  };
  var Qn = (a) => {
    switch (a.Mc) {
      case 0:
      case 1:
        var b = a.G;
        b == null
          ? (a = null)
          : ((a = Dc(b, Ti, 1)),
            a == null
              ? (a = null)
              : ((b = Fb(C(b, 2, B))),
                (a = b == null ? null : new Ui(0, { ld: [a], be: b }))));
        return a != null ? new sn({ value: a }) : new sn(null);
      case 2:
        return new sn(null);
      default:
        return new sn(null);
    }
  };
  function Rn(a, b = window) {
    if (Ic(a, 5) ?? !1)
      try {
        return b.localStorage;
      } catch {}
    return null;
  }
  var Sn = Qc(class extends D {});
  function Tn(a) {
    a && typeof a.dispose == "function" && a.dispose();
  }
  function Q() {
    this.L = this.L;
    this.ua = this.ua;
  }
  Q.prototype.L = !1;
  Q.prototype.dispose = function () {
    this.L || ((this.L = !0), this.jb());
  };
  Q.prototype[fa(Symbol, "dispose")] = function () {
    this.dispose();
  };
  function S(a, b) {
    T(a, ra(Tn, b));
  }
  function T(a, b) {
    a.L ? b() : (a.ua || (a.ua = []), a.ua.push(b));
  }
  Q.prototype.jb = function () {
    if (this.ua) for (; this.ua.length; ) this.ua.shift()();
  };
  function Un(a) {
    return Qn(a.Fa).map((b) => Xi(b));
  }
  function Vn(a) {
    a.j = a.j || Un(a);
    return a.j;
  }
  const Wn = class {
    constructor(a, b, c) {
      this.Fa = a;
      this.g = b;
      this.Wa = c;
      this.j = null;
    }
    fill(a, b) {
      var c = this.Fa;
      if ((a = c.L.j(a, b, this.g, c.l))) {
        b = a.mb;
        if (this.Fa.A) throw Error("AMA:AP:AP");
        c = this.g;
        var d = this.Fa.g.g;
        P(qj) ? bk(b, c, d) : bj(b, c, d);
        c = this.Fa;
        c.A = !0;
        b != null && c.J.push(b);
      }
      return a;
    }
  };
  function Xn(a) {
    switch (a) {
      case 0:
        return 0;
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      default:
        return null;
    }
  }
  function Yn(a, b) {
    return En(() => {
      const c = [],
        d = [];
      try {
        var e = [];
        for (var f = 0; f < a.length; f++) {
          var g = a[f];
          a: {
            var k = g.g.j,
              h = [];
            try {
              h = g.l.document.querySelectorAll(k.A);
            } catch (w) {}
            if (!h.length) {
              var m = [];
              break a;
            }
            let v = Ia(h);
            v = Mi(k, v);
            b: {
              if (typeof k.j !== "number") break b;
              let w = k.j;
              w < 0 && (w += v.length);
              v = w >= 0 && w < v.length ? [v[w]] : [];
            }
            b: {
              h = k;
              var l = v;
              if (typeof h.l !== "number") {
                v = l;
                break b;
              }
              const w = [];
              for (let R = 0; R < l.length; R++) {
                const N = Ji(l[R]);
                let X = h.l;
                X < 0 && (X += N.length);
                X >= 0 && X < N.length && w.push(N[X]);
              }
              v = w;
            }
            m = v;
          }
          h = m;
          var n = h.length > 0 ? h[0] : null;
          n && e.push({ Lb: g, tc: n });
        }
        for (g = 0; g < e.length; g++) {
          m = d;
          var p = m.push;
          {
            var t = e[g];
            const v = t.tc,
              w = t.Lb;
            var q = w.I;
            const R = w.l.document.createElement("div");
            R.className = "google-auto-placed";
            const N = R.style;
            N.textAlign = "center";
            N.width = "100%";
            N.height = "0px";
            N.clear = q ? "both" : "none";
            n = R;
            try {
              k = n;
              f = v;
              var z = w.g.g;
              P(qj) ? bk(k, f, z) : bj(k, f, z);
              var F = n;
            } catch (X) {
              throw (cj(n), X);
            }
          }
          p.call(m, F);
        }
        const Z = pg(b),
          M = qg(b);
        for (p = 0; p < d.length; p++) {
          const v = d[p].getBoundingClientRect(),
            w = e[p];
          c.push(
            new Wn(w.Lb, w.tc, new km(v.left + M, v.top + Z, v.right - v.left))
          );
        }
      } finally {
        for (e = 0; e < d.length; e++) cj(d[e]);
      }
      return c;
    }, b);
  }
  function Zn(a, b) {
    const c = { top: b.g - 25, right: b.j + b.l, bottom: b.g + 25, left: b.j };
    return !Ga(a, (d) => jg(d, c));
  }
  function $n(a) {
    return function (b) {
      return Yn(b, a);
    };
  }
  function ao(a) {
    const b = Dm(zm(a));
    return (c) => Zn(b, c.Wa);
  }
  function bo(a) {
    if (!a.length) return Vc;
    const b = new rn(a);
    return (c) => zg(b.g, c.Mc);
  }
  function co(a, b) {
    if (a <= 0) return Wc;
    const c = mg(b).scrollHeight - a;
    return function (d) {
      return d.Wa.g <= c;
    };
  }
  const eo = (a, b) => b.Wa.g >= a,
    fo = (a, b, c) => {
      c = c.Wa.l;
      return a <= c && c <= b;
    };
  var go = class {
    Ta(a) {
      return ao(a);
    }
    Ua() {
      return 9;
    }
  };
  var ho = class {
    constructor(a) {
      this.g = a;
    }
    Ta(a) {
      return co(this.g, a);
    }
    Ua() {
      return 13;
    }
  };
  var io = class {
    Ta(a) {
      const b = mg(a).clientHeight;
      return b ? ra(eo, b + pg(a)) : Vc;
    }
    Ua() {
      return 12;
    }
  };
  var jo = class {
    constructor(a) {
      this.g = a;
    }
    Ta() {
      return bo(this.g);
    }
    Ua() {
      return 1;
    }
  };
  var ko = class {
    Ta() {
      return Xc(Nn);
    }
    Ua() {
      return 7;
    }
  };
  var lo = class {
    constructor(a, b) {
      this.minWidth = a;
      this.g = b;
    }
    Ta() {
      return ra(fo, this.minWidth, this.g);
    }
    Ua() {
      return 10;
    }
  };
  var mo = class {
    constructor(a) {
      this.A = a.j.slice(0);
      this.j = a.g.slice(0);
      this.l = a.l;
      this.B = a.B;
      this.g = a.A;
    }
  };
  function no(a = 0, b = Infinity) {
    var c = new oo(),
      d = [0];
    c.A = d;
    c.j.push(new jo(d));
    c.j.push(new ko());
    c.g.push(new go());
    c.g.push(new lo(a, b));
    return c;
  }
  function po(a, b = 0) {
    a.g.push(new ho(b));
    return a;
  }
  var oo = class {
    constructor() {
      this.l = 0;
      this.B = !1;
      this.j = [].slice(0);
      this.g = [].slice(0);
    }
    build() {
      return new mo(this);
    }
  };
  function qo(a, b, c) {
    dg(a.g, b) || a.g.set(b, []);
    a.g.get(b).push(c);
  }
  var ro = class {
    constructor() {
      this.g = new gg();
    }
  };
  function so(a, b, c) {
    const d = b.Fa;
    if (!dg(a.g, d)) {
      var e = a.g,
        f = e.set;
      b = Vn(b);
      b.g != null && b.getValue();
      f.call(e, d, new to());
    }
    c(a.g.get(d));
  }
  function uo(a, b) {
    so(a, b, (c) => {
      c.g = !0;
    });
  }
  function vo(a, b) {
    so(a, b, (c) => {
      c.j = !0;
    });
  }
  var wo = class {
    constructor() {
      this.g = new gg();
    }
  };
  class to {
    constructor() {
      this.j = this.g = !1;
    }
  }
  var xo = class {
    constructor(a) {
      this.j = a;
      this.g = -1;
    }
  };
  function yo(a) {
    let b = 0;
    for (; a; )
      (!b || a.previousElementSibling || a.nextElementSibling) && b++,
        (a = a.parentElement);
    return b;
  }
  function zo(a) {
    const b = null.Be.filter((c) =>
      fg(c.Xb).every((d) => c.Xb.get(d) === a.get(d))
    );
    return b.length === 0
      ? (null.kd.push(19), null)
      : b.reduce((c, d) => (c.Xb.Fb() > d.Xb.Fb() ? c : d), b[0]);
  }
  function Ao(a) {
    a = Vn(a);
    if (a.g == null) return null.kd.push(18), null;
    a = a.getValue();
    if (dg(null.Uc, a)) return null.Uc.get(a);
    var b = Vi(a);
    b = zo(b);
    null.Uc.set(a, b);
    return b;
  }
  function Bo(a) {
    return a.g.length == 0
      ? a
      : a.sort(
          (b, c) =>
            (Ao(b)?.Zd ?? Number.MAX_VALUE) - (Ao(c)?.Zd ?? Number.MAX_VALUE)
        );
  }
  function Co(a, b) {
    var c = b.g;
    const d = b.Fa.g.g;
    c =
      b.Wa.g +
      200 * Math.min(20, d == 0 || d == 3 ? yo(c.parentElement) : yo(c));
    a = a.g;
    a.g < 0 && (a.g = mg(a.j).scrollHeight || 0);
    b = a.g - b.Wa.g;
    return c + (b > 1e3 ? 0 : 2 * (1e3 - b));
  }
  function Do(a, b) {
    return b.g.length == 0 ? b : b.sort((c, d) => Co(a, c) - Co(a, d));
  }
  function Eo(a, b) {
    return b.sort((c, d) => {
      const e = c.Fa.B,
        f = d.Fa.B;
      var g;
      e == null || f == null
        ? (g =
            e == null && f == null ? Co(a, c) - Co(a, d) : e == null ? 1 : -1)
        : (g = e - f);
      return g;
    });
  }
  var Fo = class {
    constructor(a) {
      this.g = new xo(a);
    }
  };
  function Go(a, b) {
    var c = a.l;
    for (var d of b.A) c = Qi(c, d.Ta(a.g), Ho(d.Ua()));
    d = c = c.apply($n(a.g));
    for (const e of b.j) d = Qi(d, e.Ta(a.g), tn([Io(e.Ua()), () => {}]));
    switch (b.l) {
      case 1:
        d = Do(a.j, d);
        break;
      case 2:
        d = Eo(a.j, d);
        break;
      case 3:
        const e = Vf(wo);
        d = Bo(d);
        c.forEach((f) => {
          uo(e, f);
        });
        d.forEach((f) => vo(e, f));
    }
    b.B &&
      (d = Si(
        d,
        sd(a.g.location.href + a.g.localStorage.google_experiment_mod)
      ));
    b.g?.length === 1 && qo(a.A, b.g[0], { Ke: c.g.length, ef: d.g.length });
    return d.g.slice(0);
  }
  var Jo = class {
    constructor(a, b) {
      this.l = new Ri(a);
      this.j = new Fo(b);
      this.g = b;
      this.A = new ro();
    }
  };
  const Ho = (a) => (b) => On(b, a),
    Io = (a) => (b) => On(b.Fa, a);
  function Ko(a, b, c, d = null) {
    const e = (g) => {
      let k;
      try {
        k = JSON.parse(g.data);
      } catch (h) {
        return;
      }
      !k ||
        k.googMsgType !== b ||
        (d && /[:|%3A]javascript\(/i.test(g.data) && !d(k, g)) ||
        c(k, g);
    };
    H(a, "message", e);
    let f = !1;
    return () => {
      let g = !1;
      f || ((f = !0), (g = I(a, "message", e)));
      return g;
    };
  }
  function Lo(a, b, c, d, e) {
    if (
      !(e <= 0) &&
      ((c.googMsgType = b), a.postMessage(JSON.stringify(c), d), (a = a.frames))
    )
      for (let f = 0; f < a.length; ++f) e > 1 && Lo(a[f], b, c, d, --e);
  }
  function Mo(a, b, c, d) {
    return Ko(
      a,
      "fullscreen",
      d.ca(952, (e, f) => {
        if (f.source === b) {
          if (!("eventType" in e))
            throw Error(`bad message ${JSON.stringify(e)}`);
          delete e.googMsgType;
          c(e);
        }
      })
    );
  }
  function No(a, b) {
    b.googMsgType = "fullscreen";
    a.postMessage(JSON.stringify(b), "*");
  }
  class Oo {
    constructor() {
      this.promise = new Promise((a, b) => {
        this.resolve = a;
        this.reject = b;
      });
    }
  }
  async function Po(a) {
    return a.l.promise;
  }
  async function Qo(a) {
    return a.g.promise;
  }
  async function Ro(a) {
    return a.j.promise;
  }
  function So(a, b) {
    b.type = "err_st";
    b.slot = a.slotType;
    b.freq = 0.25;
    a.qem && (b.qem = a.qem);
    b.tag_type = a.Qb.ke;
    b.version = a.Qb.version;
    ff(a.ea, "fullscreen_tag", b, !1, 0.25);
  }
  class To extends Q {
    constructor(a, b, c, d, e) {
      super();
      this.slotType = 1;
      this.pubWin = a;
      this.Wb = b;
      this.N = c;
      this.ea = d;
      this.Qb = e;
      this.state = 1;
      this.qem = null;
      this.l = new Oo();
      this.g = new Oo();
      this.j = new Oo();
    }
    init() {
      const a = Mo(
        this.pubWin,
        this.Wb,
        (b) => {
          if (b.eventType === "adError") this.j.resolve(), (this.state = 4);
          else if (b.eventType === "adReady" && this.state === 1)
            (this.qem = b.qem),
              b.slotType !== this.slotType &&
                (So(this, {
                  cur_st: this.state,
                  evt: b.eventType,
                  adp_tp: b.slotType,
                }),
                (this.state = 4)),
              this.l.resolve(),
              (this.state = 2);
          else if (b.eventType === "adClosed" && this.state === 2)
            this.g.resolve(b.result), (this.state = 3);
          else if (b.eventType !== "adClosed" || this.state !== 3)
            b.eventType === "adClosed" &&
              b.closeAfterError &&
              (this.g.resolve(b.result), (this.state = 3)),
              So(this, { cur_st: this.state, evt: b.eventType }),
              (this.state = 4);
        },
        this.N
      );
      T(this, a);
    }
  }
  function Uo(a, b, c, d, e) {
    a = new To(a, b, c, d, e);
    a.init();
    return a;
  }
  function Vo(a) {
    return a
      ? jb((b) => {
          try {
            if (b instanceof a) return !0;
            const c = b?.ownerDocument?.defaultView?.[a.name];
            return ib(c) && b instanceof c;
          } catch {
            return !1;
          }
        })
      : jb(() => !1);
  }
  Vo(Node);
  Vo(globalThis.Element);
  var Wo = Vo(globalThis.HTMLElement);
  Vo(globalThis.SVGElement);
  function Xo(a) {
    return jb((b) => Wo(b) && b.tagName.toLowerCase() === a);
  }
  var Yo = class {
    constructor() {
      this.l = this.A = 1;
      this.j = new Map();
      this.g = new Set();
      this.isDrawerVisible = !1;
    }
    takeNextPageEventIndex() {
      return this.A++;
    }
    takeNextAnnotationEntryId() {
      return this.l++;
    }
    getTermUsageCount(a) {
      return this.j.get(a) ?? 0;
    }
    incrementTermUsageCount(a) {
      const b = this.j.get(a) ?? 0;
      this.j.set(a, b + 1);
    }
    addVisibleAnnotation(a) {
      this.g.add(a);
    }
    removeVisibleAnnotation(a) {
      for (const b of this.g)
        if (b.annotation === a) {
          this.g.delete(b);
          break;
        }
    }
    getVisibleAnnotation(a = () => !0) {
      for (const b of this.g) if (a(b)) return b;
    }
  };
  function U(a) {
    a.google_reactive_ads_global_state
      ? (a.google_reactive_ads_global_state.sideRailProcessedFixedElements ==
          null &&
          (a.google_reactive_ads_global_state.sideRailProcessedFixedElements =
            new Set()),
        a.google_reactive_ads_global_state.sideRailAvailableSpace == null &&
          (a.google_reactive_ads_global_state.sideRailAvailableSpace =
            new Map()),
        a.google_reactive_ads_global_state.sideRailPlasParam == null &&
          (a.google_reactive_ads_global_state.sideRailPlasParam = new Map()),
        a.google_reactive_ads_global_state.sideRailMutationCallbacks == null &&
          (a.google_reactive_ads_global_state.sideRailMutationCallbacks = []),
        a.google_reactive_ads_global_state.adIntentsPageState == null &&
          (a.google_reactive_ads_global_state.adIntentsPageState = new Yo()))
      : (a.google_reactive_ads_global_state = new Zo());
    return a.google_reactive_ads_global_state;
  }
  var Zo = class {
      constructor() {
        this.wasPlaTagProcessed = !1;
        this.wasReactiveAdConfigReceived = {};
        this.adCount = {};
        this.wasReactiveAdVisible = {};
        this.stateForType = {};
        this.reactiveTypeEnabledInAsfe = {};
        this.wasReactiveTagRequestSent = !1;
        this.reactiveTypeDisabledByPublisher = {};
        this.tagSpecificState = {};
        this.messageValidationEnabled = !1;
        this.floatingAdsStacking = new $o();
        this.sideRailProcessedFixedElements = new Set();
        this.sideRailAvailableSpace = new Map();
        this.sideRailPlasParam = new Map();
        this.sideRailMutationCallbacks = [];
        this.g = null;
        this.clickTriggeredInterstitialMayBeDisplayed = !1;
        this.adIntentsPageState = new Yo();
      }
    },
    $o = class {
      constructor() {
        this.maxZIndexRestrictions = {};
        this.nextRestrictionId = 0;
        this.maxZIndexListeners = [];
      }
    };
  function ap(a, b) {
    a = U(a)?.tagSpecificState[1];
    return a == null
      ? null
      : a.debugCard?.getAdType() === b
      ? a.debugCard
      : null;
  }
  function bp(a, b) {
    var c = b.adClient;
    if (lb(c) && c) {
      a.A = c;
      a.B = !!b.adTest;
      c = b.pubVars;
      la(c) && (a.C = c);
      if (Array.isArray(b.fillMessage) && b.fillMessage.length > 0) {
        a.g = {};
        for (d of b.fillMessage) a.g[d.key] = d.value;
      }
      a.l = b.adWidth;
      a.j = b.adHeight;
      a.J = !!b.delayVisibleUntilCreativeReadyMessage;
      (kb(a.l) && a.l > 0 && kb(a.j) && a.j > 0) || zl("rctnosize", b);
      var d = !0;
    } else d = !1;
    return d && a.G(b);
  }
  var cp = class {
    constructor() {
      this.ab = this.I = this.g = this.C = this.B = this.A = null;
      this.j = this.l = 0;
      this.J = !1;
    }
    G() {
      return !0;
    }
  };
  var dp = class extends cp {
    constructor() {
      super();
      this.g = null;
      this.L = !1;
    }
    G(a) {
      a.hasFillMessage || (this.g = null);
      this.L = !!a.blockLocationFallback;
      a.anchorPlusConfig &&
        ((a = a.anchorPlusConfig),
        isFinite(Number(a.maxHeight)) && (this.I = Number(a.maxHeight)),
        isFinite(Number(a.animationSpeedPxPerMillis)) &&
          (this.ab = Number(a.animationSpeedPxPerMillis)));
      return !0;
    }
  };
  function ep(a, b, c, d) {
    a.dataset.adsbygoogleStatus = "reserved";
    a.className += " adsbygoogle-noablate";
    c.adsbygoogle ||
      ((c.adsbygoogle = []),
      Dd(
        c.document,
        Cd`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`
      ));
    c.adsbygoogle.push({ element: a, params: b, ...(d ? { ofxVI: d } : null) });
  }
  const fp = [1, 2];
  function gp(a, b, c) {
    const d = ae(document, "INS");
    d.className = "adsbygoogle";
    b.document.body.appendChild(d);
    const e = c.C || {};
    e.google_ad_client = c.A;
    e.google_ad_width = c.l;
    e.google_ad_height = c.j;
    e.google_reactive_ad_format = a.g;
    c.g && (e.google_reactive_fill_message = c.g);
    c.L && (e.google_reactive_block_location_fallback = !0);
    c.I && (e.google_reactive_anchor_plus_max_height = c.I);
    c.ab &&
      (e.google_reactive_anchor_plus_animation_speed_px_per_millis = c.ab);
    c.B && (e.google_adtest = "on");
    c.J && (e.gdvucrm = c.J);
    ep(d, e, b);
  }
  var hp = class {
    constructor(a) {
      this.g = a;
    }
    verifyAndProcessConfig(a, b) {
      const c = U(a);
      if (c.wasReactiveAdConfigReceived[this.g]) return !1;
      const d = new dp();
      if (!bp(d, b)) return !1;
      fp.forEach((e) => {
        c.wasReactiveAdConfigReceived[e] = !0;
      });
      gp(this, a, d);
      return !0;
    }
  };
  var jp = Yc(ip);
  function ip() {
    let a = "";
    for (const b of kp()) b <= 15 && (a += "0"), (a += b.toString(16));
    return a;
  }
  function kp() {
    if (typeof window.crypto?.getRandomValues === "function") {
      var a = new Uint8Array(16);
      window.crypto.getRandomValues(a);
      return a;
    }
    a = window;
    if (typeof a.msCrypto?.getRandomValues === "function") {
      var b = new Uint8Array(16);
      a.msCrypto.getRandomValues(b);
      return b;
    }
    a = Array(16);
    for (b = 0; b < a.length; b++) a[b] = Math.floor(Math.random() * 255);
    return a;
  }
  function lp(a, b, c) {
    try {
      if (!mp(a, c.origin) || !og(c, a.I.contentWindow)) return;
    } catch (f) {
      return;
    }
    const d = b.msg_type;
    let e = null;
    lb(d) &&
      (e = a.ma[d]) &&
      a.N.Ba(168, () => {
        e.call(a, b, c);
      });
  }
  function mp(a, b) {
    (a = a.qb.includes(b)) ||
      (a = Od[b] || Pd.test(b) || Qd.test(b) || Rd.test(b));
    return a;
  }
  var np = class extends Q {
    constructor(a, b, c, d, e = {}, f = []) {
      super();
      this.j = a;
      this.I = b;
      this.N = c;
      this.ea = d;
      this.qb = f;
      this.ma = {};
      this.ja = [];
      this.wb = this.N.ca(168, (g, k) => void lp(this, g, k));
      this.xb = this.N.ca(169, (g, k) => {
        ff(
          this.ea,
          "ras::xsf",
          {
            c: k.data.substring(0, 500),
            u: this.j.location.href.substring(0, 500),
          },
          !0,
          0.1
        );
        return !0;
      });
      this.init(e);
    }
    init(a) {
      this.U(this.ma, a);
      this.ja.push(Ko(this.j, "sth", this.wb, this.xb));
    }
    jb() {
      for (const a of this.ja) a();
      this.ja.length = 0;
      super.jb();
    }
  };
  var op = class extends np {
    constructor(a, b) {
      var c = ul,
        d = sl;
      var e = P(Dj)
        ? [`https:${`//${jp()}.safeframe.googlesyndication.com`}`]
        : [];
      super(a, b, c, d, {}, e);
    }
  };
  function pp(a) {
    const b = (c) => {
      try {
        const e = JSON.parse(c.data);
        if (e.type === "floating" && e.message === "loaded") {
          var d = a.g;
          d.wb = !0;
          const f = d.g;
          d.Ka &&
            d.wb &&
            f?.setAttribute("data-anchor-status", "ready-to-display");
          qp(a.g, !0);
          a.j.removeEventListener("message", b);
        }
      } catch {}
    };
    a.j.addEventListener("message", b);
    T(a, () => {
      a.j.removeEventListener("message", b);
    });
  }
  var yp = class extends op {
    constructor(a, b, c, d = !1) {
      super(a, b.l);
      a = this.g = b;
      if ((b = a.g) && !a.A) {
        for (var e in rp) !rp.hasOwnProperty(e) || e in c || (c[e] = rp[e]);
        a.qc =
          c.use_manual_view === "true" ||
          a.B === "top" ||
          !!U(a.j).wasReactiveAdConfigReceived[2];
        a.oc = c.use_important === "true";
        if ((e = c.af_l)) a.wa = e === "true";
        a.ja = c.wait_for_scroll === "true" || a.B === "top";
        a.Wc = a.ja && (c.tsec === "true" || a.B === "top");
        a.xb = parseInt(c.lims, 10);
        sp(a, c);
        a.A = tp(a, c);
        c = a.C.height + 5;
        a.B === "bottom" && up(a.j) && (c += 20);
        a.na = new Xd(a.C.width, c);
        a.tb = a.T >= a.Zc;
        c = a.g;
        e = a.A && vp(a.A);
        c &&
          e &&
          (a.B === "top" ? c.appendChild(e) : c.insertBefore(e, c.firstChild));
        wp(a);
        a.ia = !0;
        b.setAttribute("data-anchor-status", "ready-to-display");
      }
      d
        ? ((d = this.g),
          (d.Ka = !0),
          d.g?.removeAttribute("data-anchor-status"),
          pp(this))
        : qp(this.g, !0);
    }
    U(a) {
      a.dismiss = Zc(() => {
        var b = this.g;
        b.A && xp(b.A, !0);
      });
    }
  };
  function zp({ Xc: a, Ac: b, Pc: c, Yc: d, Bc: e, Qc: f }) {
    const g = [];
    for (let n = 0; n < f; n++)
      for (let p = 0; p < c; p++) {
        var k = p,
          h = c - 1,
          m = n,
          l = f - 1;
        g.push({
          x: a + (h === 0 ? 0 : k / h) * (b - a),
          y: d + (l === 0 ? 0 : m / l) * (e - d),
        });
      }
    return g;
  }
  function Ap(a, b) {
    a.hasOwnProperty("_goog_efp_called_") ||
      (a._goog_efp_called_ = a.elementFromPoint(b.x, b.y));
    return a.elementFromPoint(b.x, b.y);
  }
  function Bp(a, b) {
    a: {
      for (const e of b) {
        var c;
        b = a;
        var d = Ap(b.W.document, e);
        if (d) {
          if (!(c = Cp(b, d, e))) {
            c: {
              c = b.W.document;
              for (d = d.offsetParent; d && d !== c.body; d = d.offsetParent) {
                const f = Cp(b, d, e);
                if (f) {
                  b = f;
                  break c;
                }
              }
              b = null;
            }
            c = b;
          }
          b = c || null;
        } else b = null;
        b = !b || b.hasAttribute("google-allow-overlap") ? null : b;
        if (b) {
          a = b;
          break a;
        }
      }
      a = null;
    }
    return a != null;
  }
  function Cp(a, b, c) {
    if (oe(b, "position") !== "fixed") return null;
    var d =
      b.getAttribute("class") === "GoogleActiveViewInnerContainer" ||
      (ue(b).width <= 1 && ue(b).height <= 1) ||
      (a.g.yc && !a.g.yc(b))
        ? !0
        : !1;
    a.g.Dc && a.g.Dc(b, c, d);
    return d ? null : b;
  }
  var Dp = class {
    constructor(a, b = {}) {
      this.W = a;
      this.g = b;
    }
  };
  function Ep(a, b) {
    return Bp(
      Fp(a, (c) => c.getAttribute("google-anchor-overlappable") !== "true"),
      b
    );
  }
  function Fp(a, b) {
    return new Dp(a, { Dc: void 0, yc: b });
  }
  function up(a) {
    const b =
      (a.screen.height === 812 && a.screen.width === 375) ||
      (a.screen.width === 812 && a.screen.height === 375) ||
      (a.screen.width === 414 && a.screen.height === 896) ||
      (a.screen.width === 896 && a.screen.height === 414);
    return (
      (a.navigator &&
        a.navigator.userAgent &&
        a.navigator.userAgent.match(/iPhone OS 1[1-9]|[2-9]\d/)) != null && b
    );
  }
  const Gp = 90 * 1.38;
  var Hp = { rc: !1, Oc: !1, Ec: !1, fc: void 0, Eb: !1, zc: !1 };
  var Kp = class {
      constructor(a, b) {
        this.l = a;
        this.j = !1;
        this.g = b.ca(264, (c) => {
          this.j &&
            (Ip || (c = Date.now()),
            this.l(c),
            Ip ? Jp.call(u, this.g) : u.setTimeout(this.g, 17));
        });
      }
      start() {
        this.j || ((this.j = !0), Ip ? Jp.call(u, this.g) : this.g(0));
      }
      stop() {
        this.j = !1;
      }
    },
    Jp = u.requestAnimationFrame || u.webkitRequestAnimationFrame,
    Ip = !!Jp && !/'iPhone'/.test(u.navigator.userAgent);
  function Lp(a) {
    return a * a * a;
  }
  function Mp(a) {
    a = 1 - a;
    return 1 - a * a * a;
  }
  function Np(a) {
    a.j = !1;
    a.A.start();
  }
  var Op = class {
    constructor(a, b, c, d) {
      this.start = a;
      this.end = b;
      this.time = c;
      this.progress = 0;
      this.startTime = null;
      this.j = !1;
      this.g = [];
      this.l = null;
      this.A = new Kp((e) => {
        if (this.j) this.A.stop();
        else {
          this.startTime === null && (this.startTime = e);
          this.progress = (e - this.startTime) / this.time;
          this.progress >= 1 && (this.progress = 1);
          e = this.l ? this.l(this.progress) : this.progress;
          this.g = [];
          for (let f = 0; f < this.start.length; f++)
            this.g.push((this.end[f] - this.start[f]) * e + this.start[f]);
          this.L();
          this.progress === 1 && (this.A.stop(), this.C());
        }
      }, d);
    }
    C() {}
    L() {}
    stop() {
      this.j = !0;
    }
    reset(a, b, c) {
      this.startTime = null;
      this.start = a;
      this.end = b;
      this.time = c;
      this.progress = 0;
    }
  };
  function V(a) {
    return `${a}px`;
  }
  var Pp = class extends Op {
    constructor(a, b, c, d, e, f, g = null, k = null, h = !1) {
      super([b], [c], d, f);
      this.element = a;
      this.I = e;
      this.G = g;
      this.l = k;
      this.B = h && d === 0;
    }
    L() {
      this.B && G(this.element, "display", "none");
      const a = {};
      a[this.I] = V(this.g[0]);
      G(this.element, a);
    }
    C() {
      this.B && G(this.element, "display", "block");
      this.G && this.G();
    }
  };
  function Qp(a) {
    a.element && I(a.element, a.event, a.handler, xe);
  }
  class Rp extends Q {
    constructor(a, b, c) {
      super();
      this.element = a;
      this.event = b;
      this.handler = this.handler = c;
      H(this.element, this.event, this.handler, xe);
      T(this, () => void Qp(this));
    }
  }
  class Sp {
    constructor(a) {
      this.g = a;
      this.history = [];
      this.index = 0;
      this.reset();
    }
    add(a) {
      const b = Date.now();
      this.history.push({ time: b, coords: a });
      for (a = this.index; a < this.history.length; ++a)
        if (b - this.history[a].time >= this.g) delete this.history[a];
        else break;
      this.index = a;
      a >= this.history.length && this.reset();
    }
    reset() {
      this.history = [];
      this.index = 0;
    }
  }
  function Tp(a, b) {
    a.B && a.stop();
    a.B = !0;
    a.l = a.M();
    a.j = Up(b);
    a.g = a.j;
    a.A = new Sp(a.na);
    a.A.add(a.j);
    a.I = new Rp(a.document, "mousemove", (c) => {
      Vp(a, c);
    });
    S(a, a.I);
    a.K = new Rp(a.document, "touchmove", (c) => {
      Vp(a, c);
    });
    S(a, a.K);
    a.G = new Rp(a.document, "mouseup", (c) => {
      Wp(a, c);
    });
    S(a, a.G);
    a.J = new Rp(a.document, "touchend", (c) => {
      Wp(a, c);
    });
    S(a, a.J);
  }
  function Up(a) {
    a = (a.touches && a.touches[0]) || a;
    return new Vd(a.clientX, a.clientY);
  }
  function Vp(a, b) {
    if (a.B)
      if ((b.preventDefault(), (a.g = Up(b)), a.A.add(a.g), a.C)) a.U();
      else {
        var c = a.j,
          d = a.g;
        b = c.x - d.x;
        c = c.y - d.y;
        Math.sqrt(b * b + c * c) >= 10 && (a.U(), (a.C = !0));
      }
  }
  function Wp(a, b) {
    a.C ? (b.preventDefault(), (a.g = Up(b)), a.V()) : (a.O = !0);
    a.stop();
  }
  var Xp = class extends Q {
    constructor(a, b, c = b, d = 100) {
      super();
      this.document = a;
      this.target = b;
      this.handle = c;
      this.na = d;
      this.C = this.B = this.O = !1;
      this.A =
        this.g =
        this.j =
        this.l =
        this.J =
        this.G =
        this.K =
        this.I =
          null;
      this.va = new Rp(this.handle, "mousedown", (e) => {
        e.button === 0 && Tp(this, e);
      });
      S(this, this.va);
      this.wa = new Rp(this.handle, "touchstart", (e) => {
        Tp(this, e);
      });
      S(this, this.wa);
      this.pa = new Rp(this.handle, "click", (e) => {
        this.O ? (this.onClick(), (this.O = !1)) : e.stopPropagation();
      });
      S(this, this.pa);
    }
    U() {
      if (this.l && this.j && this.g) {
        var a = this.l,
          b = Wd(this.g, this.j);
        var c = new Vd(a.x + b.x, a.y + b.y);
        a = this.target;
        c instanceof Vd ? ((b = c.x), (c = c.y)) : ((b = c), (c = void 0));
        a.style.left = te(b, !1);
        a.style.top = te(c, !1);
      }
    }
    V() {}
    onClick() {}
    M() {
      var a = this.target,
        b = a.parentElement || null;
      var c = re(a);
      b = re(b);
      c = new Vd(c.x - b.x, c.y - b.y);
      a = we(a, "margin");
      return Wd(c, new Vd(a.left, a.top));
    }
    stop() {
      this.C = this.B = !1;
      this.A = this.g = this.j = this.l = null;
      this.I && Qp(this.I);
      this.K && Qp(this.K);
      this.G && Qp(this.G);
      this.J && Qp(this.J);
    }
  };
  function Yp(a) {
    const b = Zp(a);
    Da(a.floatingAdsStacking.maxZIndexListeners, (c) => c(b));
  }
  function Zp(a) {
    a = Sc(a.floatingAdsStacking.maxZIndexRestrictions);
    return a.length ? Math.min.apply(null, a) : null;
  }
  function $p(a, b) {
    a.floatingAdsStacking.maxZIndexListeners.push(b);
    b(Zp(a));
  }
  var aq = class {
      constructor(a) {
        this.floatingAdsStacking = U(a).floatingAdsStacking;
      }
    },
    bq = class {
      constructor(a) {
        this.controller = a;
        this.g = null;
      }
    };
  function cq(a, b) {
    var c = a.ownerDocument;
    const d = c.createElementNS("http://www.w3.org/2000/svg", "line");
    d.setAttribute("x1", b ? "32" : "22");
    d.setAttribute("y1", "18");
    d.setAttribute("x2", b ? "38" : "28");
    d.setAttribute("y2", "12");
    a.appendChild(d);
    c = c.createElementNS("http://www.w3.org/2000/svg", "line");
    c.setAttribute("x1", b ? "38" : "28");
    c.setAttribute("y1", "12");
    c.setAttribute("x2", b ? "44" : "34");
    c.setAttribute("y2", "18");
    a.appendChild(c);
  }
  function dq(a, b) {
    var c = a.ownerDocument;
    const d = c.createElementNS("http://www.w3.org/2000/svg", "line");
    d.setAttribute("x1", b ? "32" : "22");
    d.setAttribute("y1", "12");
    d.setAttribute("x2", b ? "38" : "28");
    d.setAttribute("y2", "18");
    a.appendChild(d);
    c = c.createElementNS("http://www.w3.org/2000/svg", "line");
    c.setAttribute("x1", b ? "38" : "28");
    c.setAttribute("y1", "18");
    c.setAttribute("x2", b ? "44" : "34");
    c.setAttribute("y2", "12");
    a.appendChild(c);
  }
  function xp(a, b) {
    if (!a.B && a.j) {
      var c = parseInt(a.j.style[a.g], 10),
        d = -(a.A === 4 ? a.l.maxHeight + 5 : a.G.height) - (b ? 30 : 0),
        e = (c - d) / eq(a);
      a.g === "bottom" &&
        up(a.W) &&
        a.N.Ba(405, () => {
          fq(a, "21px", e, "ease-in");
        });
      b || gq(a, !0);
      c === d
        ? b || (a.A = 0)
        : a.wa()
        ? ((a.B = !0),
          Np(
            new Pp(
              a.j,
              c,
              d,
              e,
              a.g,
              a.N,
              () => {
                a.B = !1;
                b ? a.Da() : ((a.A = 0), gq(a, !0));
                a.j.setAttribute("data-anchor-status", "dismissed");
              },
              Lp,
              a.K.Eb
            )
          ))
        : gq(a, !1);
    }
  }
  function hq(a, b) {
    sg(b);
    const c = {
      "background-color": "#FAFAFA",
      display: "block",
      position: "relative",
      "z-index": "1",
      height: V(5),
      "box-shadow": iq(a),
    };
    jq(a) &&
      Object.assign(
        c,
        a.g === "bottom"
          ? { "border-top-left-radius": V(5), "border-top-right-radius": V(5) }
          : {
              "border-bottom-left-radius": V(5),
              "border-bottom-right-radius": V(5),
            }
      );
    E(b, c);
    a.g === "top" &&
      E(a.C ?? b, {
        position: "absolute",
        top: V(a.l ? a.l.maxHeight + 5 : a.G.height),
        width: "100%",
      });
    if (a.O) {
      const d = Ed("SPAN", a.W.document);
      d.appendChild(kq(a));
      const e = (f) => {
        f.target === d &&
          (f.preventDefault && f.preventDefault(),
          f.stopImmediatePropagation && f.stopImmediatePropagation(),
          f.stopPropagation && f.stopPropagation());
      };
      H(d, "click", e);
      T(a, () => {
        I(d, "click", e);
      });
      lq(a, d);
      b.className = "ee";
      b.appendChild(d);
    }
  }
  function jq(a) {
    return a.K.fc ?? (!ad() && !bd());
  }
  function iq(a) {
    return a.g === "top"
      ? jq(a)
        ? "rgba(0, 0, 0, 0.5) 0px 4px 12px -4px, rgba(0, 0, 0, 0.3) 0px -4px 8px -3px"
        : "rgba(0, 0, 0, 0.2) 0px 1px 5px -1px, rgba(0, 0, 0, 0.1) 0px -1px 2px -1px"
      : jq(a)
      ? "rgba(0, 0, 0, 0.5) 0px -4px 12px -4px, rgba(0, 0, 0, 0.3) 0px 4px 8px -3px"
      : "rgba(0, 0, 0, 0.2) 0px -1px 5px -1px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px";
  }
  function mq(a, b) {
    a.g === "top" && E(a.C ?? a.J, { top: V(b) });
  }
  function kq(a) {
    var b = "";
    let c = "";
    var d = "";
    let e = "",
      f = () => {};
    switch (a.g) {
      case "top":
        b = "dropShadowBottom";
        c = jq(a)
          ? "M10,4 L10,22 A6,6 0 0,0 16,28 L60,28 A6,6 0 0,0 66,22 L66,10 66,4 Z"
          : "M0,4 L0,22 A6,6 0 0,0 6,28 L50,28 A6,6 0 0,0 56,22 L56,10 A6,6 0 0,1 61,4 Z";
        d = "0";
        e = "up";
        f = (p) => {
          cq(p, jq(a));
        };
        break;
      case "bottom":
        (b = "dropShadowTop"),
          (c = jq(a)
            ? "M10,26 L10,6 A6,6 0 0,1 16,1 L60,1 A6,6 0 0,1 66,6 L66,20 66,26 Z"
            : "M0,26 L0,6 A6,6 0 0,1 6,1 L50,1 A6,6 0 0,1 56,6 L56,20 A6,6 0 0,0 62,26 Z"),
          (d = "25"),
          (e = "down"),
          (f = (p) => {
            dq(p, jq(a));
          });
    }
    const g = a.W.document,
      k = g.createElementNS("http://www.w3.org/2000/svg", "svg");
    k.style.setProperty("margin", "0 0 0 0px", "important");
    k.style.setProperty("position", "absolute", "important");
    k.style.setProperty(a.g, "0", "important");
    k.style.setProperty("left", "0%", "important");
    k.style.setProperty("display", "block", "important");
    k.style.setProperty("width", "80px", "important");
    k.style.setProperty("height", "30px", "important");
    k.style.setProperty("transform", "none", "important");
    k.style.setProperty("pointer-events", "initial", "important");
    var h = g.createElementNS("http://www.w3.org/2000/svg", "defs");
    const m = g.createElementNS("http://www.w3.org/2000/svg", "filter");
    m.setAttribute("id", b);
    m.setAttribute("filterUnits", "userSpaceOnUse");
    m.setAttribute("color-interpolation-filters", "sRGB");
    var l = g.createElementNS(
      "http://www.w3.org/2000/svg",
      "feComponentTransfer"
    );
    l.setAttribute("in", "SourceAlpha");
    l.setAttribute("result", "TransferredAlpha");
    var n = g.createElementNS("http://www.w3.org/2000/svg", "feFuncR");
    n.setAttribute("type", "discrete");
    n.setAttribute("tableValues", "0.5");
    l.appendChild(n);
    n = g.createElementNS("http://www.w3.org/2000/svg", "feFuncG");
    n.setAttribute("type", "discrete");
    n.setAttribute("tableValues", "0.5");
    l.appendChild(n);
    n = g.createElementNS("http://www.w3.org/2000/svg", "feFuncB");
    n.setAttribute("type", "discrete");
    n.setAttribute("tableValues", "0.5");
    l.appendChild(n);
    m.appendChild(l);
    l = g.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
    l.setAttribute("in", "TransferredAlpha");
    l.setAttribute("stdDeviation", "2");
    m.appendChild(l);
    l = g.createElementNS("http://www.w3.org/2000/svg", "feOffset");
    l.setAttribute("dx", "0");
    l.setAttribute("dy", "0");
    l.setAttribute("result", "offsetblur");
    m.appendChild(l);
    l = g.createElementNS("http://www.w3.org/2000/svg", "feMerge");
    l.appendChild(
      g.createElementNS("http://www.w3.org/2000/svg", "feMergeNode")
    );
    n = g.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
    n.setAttribute("in", "SourceGraphic");
    l.appendChild(n);
    m.appendChild(l);
    h.appendChild(m);
    k.appendChild(h);
    h = g.createElementNS("http://www.w3.org/2000/svg", "path");
    h.setAttribute("d", c);
    h.setAttribute("stroke", "#FAFAFA");
    h.setAttribute("stroke-width", "1");
    h.setAttribute("fill", "#FAFAFA");
    h.style.setProperty("filter", `url(#${b})`);
    k.appendChild(h);
    b = g.createElementNS("http://www.w3.org/2000/svg", "rect");
    b.setAttribute("x", "0");
    b.setAttribute("y", d);
    b.setAttribute("width", "80");
    b.setAttribute("height", "5");
    b.style.setProperty("fill", "#FAFAFA");
    k.appendChild(b);
    d = g.createElementNS("http://www.w3.org/2000/svg", "g");
    d.setAttribute("class", e);
    d.setAttribute("stroke", "#616161");
    d.setAttribute("stroke-width", "2px");
    d.setAttribute("stroke-linecap", "square");
    f(d, jq(a));
    k.appendChild(d);
    return k;
  }
  function lq(a, b) {
    const c = {
      display: "block",
      width: "80px",
      height: "45px",
      [a.g]: "0",
      left: "0%",
      marginLeft: "0px",
      "pointer-events": "none",
    };
    jq(a) &&
      ((c.position = "absolute"),
      (c.left = "50%"),
      (c.transform = "translateX(-50%)"));
    a = b.getElementsByTagName("svg")[0];
    E(b, c);
    Nd(a);
  }
  function nq(a, b = a.V) {
    switch (a.A) {
      case 1:
        a.M();
        break;
      case 2:
        oq(a);
        break;
      case 0:
        a.l ? oq(a) : a.M();
        break;
      case 3:
        xp(a, b);
        break;
      case 4:
        a.M();
    }
  }
  function vp(a) {
    return a.C ?? a.J;
  }
  function gq(a, b) {
    if (a.O) {
      var c = a.J.getElementsByTagName("svg")[0].getElementsByTagName("g")[0];
      let d;
      for (; (d = c.firstChild); ) c.removeChild(d);
      switch (a.g) {
        case "top":
          (b ? dq : cq)(c, jq(a));
          break;
        case "bottom":
          (b ? cq : dq)(c, jq(a));
      }
    } else (a = a.J.firstElementChild) && be(a);
  }
  function pq(a, b, c, d) {
    b = {
      i: b,
      dc: a.A === 0 ? "1" : "0",
      fdc: c ? "1" : "0",
      ds: a.V ? "1" : "0",
      expId: a.Ka,
      sc: a.na ? "1" : "0",
      off: d,
      vw: J(a.W),
      req: a.I.src,
      tp: a.g,
      h: a.G.height,
      w: a.G.width,
      qemId: a.Ja,
    };
    ff(a.ea, "flgr", b, !0, 1);
  }
  function oq(a) {
    if (!a.B) {
      qq(a);
      var b = parseInt(a.j.style[a.g], 10),
        c = () => {
          a.B = !1;
          a.A = 4;
          rq(a);
          a.j.setAttribute("data-anchor-status", "displayed");
          a.j.setAttribute("data-anchor-shown", "true");
          gq(a, !1);
        };
      if (b) {
        a.B = !0;
        const d = -b / eq(a);
        sq(a, d);
        gq(a, !1);
        b = new Pp(a.j, b, 0, d, a.g, a.N, c, Mp, !0);
        a.ja();
        Np(b);
      } else c();
    }
  }
  function qq(a) {
    const b = a.l.maxHeight,
      c = a.l.maxHeight + 5;
    a.A !== 4 &&
      (a.j.style[a.g] = `-${
        b - (parseInt(a.j.style.height, 10) + parseInt(a.j.style[a.g], 10))
      }px`);
    a.j.style.height = `${c}px`;
    a.I.parentElement.style.height = `${b}px`;
    a.I.style.height = `${b}px`;
    a.I.style.maxHeight = "none";
    a.I.height = "100%";
    mq(a, c);
    a.U?.ma(c);
  }
  function fq(a, b, c, d) {
    G(a.I, {
      transition: `${c / 1e3}s`,
      "transition-timing-function": d,
      "margin-top": b,
    });
  }
  function sq(a, b) {
    a.g === "bottom" &&
      up(a.W) &&
      a.N.Ba(404, () => {
        fq(a, "0px", b, "ease-out");
      });
  }
  function rq(a) {
    a.oa();
    a.oa = () => {};
  }
  function eq(a) {
    return a.G.height >=
      Math.floor(a.W.document.documentElement.clientHeight * 0.3)
      ? Infinity
      : a.l
      ? a.l.ab
        ? a.l.ab
        : Infinity
      : 0.1;
  }
  function tq(a, b) {
    if (a.g !== "bottom" && a.g !== "top")
      throw Error("unsupported reactive type");
    const c = (f) => {
      a.onClick(f);
    };
    H(a.J, "click", c);
    T(a, () => {
      I(a.J, "click", c);
    });
    a.C &&
      (H(a.C, "click", c),
      T(a, () => {
        a.C && I(a.C, "click", c);
      }));
    G(b, { opacity: 1 });
    var d = a.W.document;
    if (d) {
      a.j = b;
      var e = a.l ? a.l.maxHeight + 5 : a.G.height;
      a.Ra &&
        ((a.U = new (a.g === "top" ? uq : vq)(a, d, e, b, a.J)), S(a, a.U));
      d = { position: "fixed", left: V(0) };
      jq(a) &&
        ((d.left = "50%"),
        (d.transform = "translateX(-50%)"),
        (d["box-shadow"] = iq(a)),
        (d["border-radius"] = "5px"));
      d[a.g] = V(-e - 30);
      G(b, d);
      E(b, { overflow: "visible", background: "#FAFAFA" });
      $p(a.va, (f) => {
        const g = a.pa === null ? 2147483647 : a.pa;
        G(b, { zIndex: f === null ? g : Math.min(f, g) });
      });
      nq(a);
    }
  }
  var wq = class extends Q {
    constructor(
      a,
      b,
      c,
      d,
      e,
      f = () => {},
      g = () => {},
      k,
      h,
      m,
      l,
      n,
      p = Hp,
      t = !1
    ) {
      super();
      this.config = a;
      this.W = b;
      this.I = c;
      this.G = d;
      this.g = e;
      this.Da = f;
      this.oa = g;
      this.N = k;
      this.ea = h;
      this.wa = m;
      this.ja = l;
      this.l = n;
      this.K = p;
      this.ma = t;
      this.C = null;
      this.B = !1;
      this.R = 0;
      this.ia = !1;
      this.j = this.U = null;
      this.A = n ? 2 : 1;
      T(this, () => {
        xp(this, !0);
      });
      this.J = Ed("INS", b.document);
      typeof HTMLElement.prototype.attachShadow !== "function" ||
        this.N.Ba(1013, () => {
          this.C = Ed("DIV", b.document);
          this.C.className = "grippy-host";
          this.C.attachShadow({ mode: "closed" }).appendChild(this.J);
          T(this, () => {
            this.C = null;
          });
          return !0;
        }) ||
        (this.C = null);
      this.T = b.innerHeight;
      this.na = this.config.scroll_detached === "true";
      this.V = this.config.dismissable === "true";
      this.Ra =
        (this.O = !(this.K.Oc || this.ma) || !!this.l) &&
        (this.config.draggable === "true" || this.g !== "top");
      this.Ka = this.config.expId || "";
      this.Ja = this.config.qemId || "";
      a = parseInt(this.config.z_index_override, 10);
      this.pa = isNaN(a) ? null : a;
      this.va = new aq(b);
      !this.V &&
        u.navigator.userAgent.match(/iPhone OS 7/) &&
        b.setInterval(() => {
          const q = this.W.innerHeight;
          if (Math.abs(q - 460) < 2 || Math.abs(q - 529) < 2)
            q < this.T &&
              Math.abs(pg(this.W) - this.R - 68) < 2 &&
              ((this.ia = !0), this.A === 0 && nq(this)),
              (this.T = q);
        }, 300);
      hq(this, this.J);
    }
    onClick(a) {
      this.O &&
        (a.preventDefault(),
        this.B || ((this.ia = !0), nq(this), pq(this, "c", this.A !== 0, 0)));
    }
    M() {
      if (!this.B) {
        var a = this.l && parseInt(this.j.style.height, 10) > this.G.height;
        (this.K.Oc || this.ma) && a && (this.O = !1);
        var b = parseInt(this.j.style[this.g], 10);
        if (b || a) {
          var c = () => {
            this.A = 3;
            if (a) {
              const f = this.G.height;
              this.j.style[this.g] = "0";
              this.j.style.height = `${f}px`;
              this.I.parentElement.style.height = `${f}px`;
              this.I.height = `${f}`;
              this.I.style.height = `${f}px`;
              this.I.style.maxHeight = "30vh";
              mq(this, f);
              this.U?.ma(f);
            }
            this.B = !1;
            rq(this);
            this.j.setAttribute("data-anchor-status", "displayed");
            this.j.setAttribute("data-anchor-shown", "true");
            gq(this, !1);
          };
          this.B = !0;
          if (b && !a) {
            var d = -b / eq(this);
            sq(this, d);
            gq(this, !1);
            b = new Pp(this.j, b, 0, d, this.g, this.N, c, Mp, this.K.Eb);
            this.ja();
            Np(b);
          } else if (a) {
            var e = this.l.maxHeight + 5;
            d = this.G.height - e;
            e = ((e + b > this.G.height ? -1 : 1) * (d - b)) / eq(this);
            sq(this, e);
            b === d
              ? c()
              : ((b = new Pp(
                  this.j,
                  b,
                  d,
                  e,
                  this.g,
                  this.N,
                  c,
                  Mp,
                  this.K.Eb
                )),
                this.ja(),
                Np(b));
          }
        }
      }
    }
    Sa() {
      return this.A === 4;
    }
  };
  class xq extends Xp {
    constructor(a, b, c, d, e) {
      super(b, d, e);
      this.oa = a;
      this.R = c;
    }
    ma(a) {
      this.R = a;
    }
    V() {
      var a = this.oa;
      if (!a.B) {
        const b = parseInt(a.j.style[a.g], 10),
          c = b + parseInt(a.j.style.height, 10),
          d = a.G.height / 2;
        c >= (a.l ? (a.l.maxHeight + 5) / 2 : Number.MAX_SAFE_INTEGER)
          ? (oq(a), pq(a, "d", !1, b))
          : c >= d
          ? (a.M(), pq(a, "d", !1, b))
          : (xp(a, a.V), pq(a, "d", !0, b));
      }
    }
    U() {
      if (this.l !== null && this.j !== null && this.g !== null) {
        var a = this.ia(this.l.y, Wd(this.g, this.j).y);
        a > 0 && (a = 0);
        a < -this.R && (a = -this.R);
        var b = {};
        b[this.ja()] = V(a);
        G(this.target, b);
      }
    }
  }
  class uq extends xq {
    M() {
      return new Vd(0, parseInt(this.target.style.top, 10));
    }
    ia(a, b) {
      return b - a;
    }
    ja() {
      return "top";
    }
  }
  class vq extends xq {
    M() {
      return new Vd(0, parseInt(this.target.style.bottom, 10));
    }
    ia(a, b) {
      return a - b;
    }
    ja() {
      return "bottom";
    }
  }
  function yq(a) {
    try {
      a.setItem("__storage_test__", "__storage_test__");
      const b = a.getItem("__storage_test__");
      a.removeItem("__storage_test__");
      return b === "__storage_test__";
    } catch (b) {
      return !1;
    }
  }
  function zq(a, b = []) {
    const c = Date.now();
    return Ea(b, (d) => c - d < a * 1e3);
  }
  function Aq(a, b, c) {
    try {
      const d = a.getItem(c);
      if (!d) return [];
      let e;
      try {
        e = JSON.parse(d);
      } catch (f) {}
      if (!Array.isArray(e) || Ga(e, (f) => !Number.isInteger(f)))
        return a.removeItem(c), [];
      e = zq(b, e);
      e.length || a?.removeItem(c);
      return e;
    } catch (d) {
      return null;
    }
  }
  function Bq(a, b, c) {
    return b <= 0 || a == null || !yq(a) ? null : Aq(a, b, c);
  }
  function Cq(a, b, c, d = !1) {
    if (!a.ma) {
      a.ma = [];
      for (var e = a.l.parentElement; e; ) {
        a.ma.push(e);
        if (a.Ja(e)) break;
        e = e.parentNode && e.parentNode.nodeType === 1 ? e.parentNode : null;
      }
    }
    e = a.ma.slice();
    !c && a.Ja(e[e.length - 1]) && e.pop();
    let f;
    if (d) for (c = e.length - 1; c >= 0; --c) (f = e[c]) && b.call(a, f, c, e);
    else for (c = 0; c < e.length; ++c) (f = e[c]) && b.call(a, f, c, e);
  }
  var Dq = class extends Q {
    constructor(a, b, c) {
      super();
      this.l = a;
      this.j = b;
      this.g = c;
      this.ma = null;
      T(this, () => (this.ma = null));
    }
    Ja(a) {
      return this.g === a;
    }
  };
  function Eq(a) {
    return a.prerendering
      ? 3
      : { visible: 1, hidden: 2, prerender: 3, preview: 4, unloaded: 5, "": 0 }[
          a.visibilityState ||
            a.webkitVisibilityState ||
            a.mozVisibilityState ||
            ""
        ] ?? 0;
  }
  function Fq(a, b, c) {
    b !== null &&
      Id(a.getAttribute("width")) !== null &&
      a.setAttribute("width", String(b));
    c !== null &&
      Id(a.getAttribute("height")) !== null &&
      a.setAttribute("height", String(c));
    b !== null && (a.style.width = V(b));
    c !== null && (a.style.height = V(c));
  }
  function qp(a, b = !1) {
    a.rb || W(a, b, 9);
    a.rb = !0;
    if (a.K || !Gq(a, b) || (!a.va && a.wa)) !a.va && a.wa && W(a, b, 12);
    else {
      var c = a.g;
      c
        ? (Cq(
            a,
            (d) => {
              sg(d);
            },
            !0
          ),
          Hq(a),
          tq(a.A, c),
          Iq(a) && Jq(a),
          Kq(a),
          W(a, !0, 14),
          (a.K = !0),
          (b = a.l.contentWindow) && Lo(b, "ig", { rr: "vis-aa" }, "*", 2),
          Lq(a),
          Mq(a, a.O.rc),
          Nq(a),
          Oq(a))
        : W(a, b, 13);
    }
  }
  function Pq(a) {
    Qq(a);
    const b = a.j.innerWidth;
    a = ue(a.l).height || +a.l.height || 0;
    return new Xd(b, a);
  }
  function Rq(a) {
    if (a.oa) {
      var b = a.g;
      b && (b.style.display = "none");
      Sq(a, a.pa, !0, !0);
      a.oa = !1;
    }
  }
  function Tq(a) {
    a.V = "touchcancel";
    u.setTimeout(
      a.N.ca(274, () => {
        a.V === "touchcancel" && ((a.M = 0), (a.U = !1), Uq(a));
      }),
      1e3
    );
  }
  function Vq(a, b) {
    if (b && b.touches) {
      a.V = "touchend";
      var c = b.touches.length;
      c < 2
        ? u.setTimeout(
            a.N.ca(256, () => {
              a.V === "touchend" && ((a.M = c), (a.U = !1), Uq(a));
            }),
            1e3
          )
        : ((a.M = c), Uq(a));
    }
  }
  function Wq(a) {
    const b = a.j;
    I(b, "orientationchange", a.Rc);
    I(b, "resize", a.Tc);
    I(b, "scroll", a.dd);
    I(b, "touchcancel", a.ed);
    I(b, "touchend", a.fd);
    I(b, "touchmove", a.gd);
    I(b, "touchstart", a.hd);
  }
  function wp(a) {
    const b = a.j;
    H(b, "orientationchange", a.Rc);
    H(b, "resize", a.Tc);
    H(b, "scroll", a.dd);
    H(b, "touchcancel", a.ed);
    H(b, "touchend", a.fd);
    H(b, "touchmove", a.gd);
    H(b, "touchstart", a.hd);
    T(a, () => {
      Wq(a);
    });
  }
  function sp(a, b) {
    const c = parseInt(b.ht, 10),
      d = c > 0 ? c : null;
    b = parseInt(b.wd, 10);
    const e = b > 0 ? b : null;
    d !== null && (a.C.height = d);
    e !== null && (a.C.width = e);
    Cq(
      a,
      (f) => {
        Fq(f, e, d);
      },
      !1,
      !0
    );
    Fq(a.l, e, d);
  }
  function tp(a, b) {
    b = new wq(
      b,
      a.j,
      a.l,
      a.C,
      a.B,
      () => {
        if (!a.Da) {
          a.Da = !0;
          Wq(a);
          var c = a.g;
          be(c);
          Sq(a, a.pa, !0, !0);
          c && (c.style.display = "none");
        }
      },
      () => void Xq(a),
      a.N,
      a.ea,
      () => {
        a.R || ((a.R = !0), Yq(a, null));
        return !0;
      },
      () => {
        a.R && ((a.R = !1), Yq(a, null));
        return !0;
      },
      a.G,
      a.O,
      !1
    );
    S(a, b);
    return b;
  }
  function Xq(a) {
    a.qc &&
      !a.cd &&
      ((a.cd = !0),
      a.N.Ba(257, () => {
        const b = { msg_type: "manual-send-view" },
          c = a.l.contentWindow;
        c && c.postMessage(JSON.stringify(b), "*");
      }));
  }
  function W(a, b, c) {
    b && !a.K && a.Ra && a.Ra.hc({ D: c });
  }
  function Gq(a, b = !1) {
    W(a, b, 20);
    if (!a.qb()) return W(a, b, 21), !1;
    if (a.Ka && !a.wb) return W(a, b, 22), !1;
    if (!a.K && a.ja) {
      a.xb &&
        setTimeout(() => {
          if (!a.K) {
            a.ja = !1;
            W(a, b, 24);
            qp(a, !0);
            const d = ie(a.I);
            d.top = Zq(a, a.R);
            Sq(a, d, !0);
          }
        }, a.xb);
      a.Wc && (a.J += Math.max(pg(a.j) - a.Sa, 0));
      let c = !1;
      switch (a.B) {
        case "bottom":
          return (c = a.J >= a.jd || a.tb) || W(a, b, 27), c;
        case "top":
          return (c = a.J > Zq(a)) || W(a, b, 29), c;
        default:
          return !0;
      }
    }
    W(a, b, 31);
    return !0;
  }
  function Hq(a) {
    const b = a.g;
    if (b && a.l.parentElement && a.na) {
      se(b, a.na);
      var c = Iq(a),
        d = mg(a.j).scrollWidth,
        e = a.j.innerWidth;
      b.style.width =
        a.O.fc ?? (!ad() && !bd()) ? "auto" : d > e ? V(e) : "100%";
      $q(a, c ? 1 : 0);
      a.G &&
        E(a.l.parentElement, {
          height: `${a.G.maxHeight}px`,
          display: "inline-block",
        });
    }
  }
  function Iq(a) {
    if (!a.O.zc || ad() || bd()) a = !1;
    else {
      var b = Number(a.l.width) || a.C.width,
        c = a.C.height;
      a =
        b <= 0 || c <= 0
          ? 0
          : b <= Math.min(a.j.innerWidth * 0.4, 600) && b / c <= 3
          ? 1
          : 0;
      a = a === 1;
    }
    return a;
  }
  function Jq(a) {
    (a = a.g) && E(a, { right: "0", left: "auto", transform: "none" });
  }
  function Kq(a) {
    const b = a.g;
    if (b) {
      var c = a.A,
        d = c.W,
        e = pg(d);
      if (!(Math.abs(e - c.R) < 10)) {
        var f = e < 10;
        d = e + 10 + mg(d).clientHeight > ng(d);
        f = f || d;
        c.na ||
          c.ia ||
          c.B ||
          (c.A === 0 || f ? c.A === 0 && f && nq(c) : nq(c, !1));
        c.R = e;
      }
      a.oa ||
        ((c = Sq),
        Qq(a),
        (e = we(a.j.document.body, "padding")),
        a.B === "bottom" && (e.bottom += a.na.height + 25),
        c(a, e),
        (b.style.display = "block"),
        (a.oa = !0));
    }
  }
  function Lq(a) {
    var b =
      a.C.height >= Math.floor(a.j.document.documentElement.clientHeight * 0.5);
    const c =
      a.O.Ec &&
      a.C.height >= Math.floor(a.j.document.documentElement.clientHeight * 0.3);
    if (a.G || b || c)
      if ((b = Bq(a.nb, 604800, "__lsa__")))
        b.push(Date.now()), a.nb?.setItem("__lsa__", JSON.stringify(b));
  }
  function Mq(a, b) {
    a.G &&
      (a.l.onload = () => {
        if (a.G) {
          var c = a.l,
            d = c.parentElement,
            e = d.style.display;
          E(d, { height: `${a.G.maxHeight + 1}px`, display: "inline-block" });
          b && E(c, { height: `${a.G.maxHeight + 1}px` });
          setTimeout(() => {
            a.G &&
              (E(d, { height: `${a.G.maxHeight}px`, display: e }),
              b && E(c, { height: `${a.G.maxHeight}px` }));
          }, 100);
        }
      });
  }
  function Nq(a) {
    if (a.G) {
      var b = Ed("div");
      b.id = "click-protector";
      b.style.position = "relative";
      b.style.width = "65px";
      b.style.height = "25px";
      b.style.left = "0";
      b.style.top = a.B === "bottom" ? "-100%" : "-25px";
      a.g.appendChild(b);
      b.addEventListener("click", (c) => {
        c.stopPropagation();
        c.preventDefault();
      });
    }
  }
  function Oq(a) {
    if (a.G)
      var b = 100,
        c = setInterval(() => {
          a.j.document.getElementsByClassName("fc-message-root").length
            ? (a.A?.Sa() && (a.A?.M(), a.nb?.removeItem("__lsa__")),
              a.Ra?.hc({ D: 32 }),
              clearInterval(c))
            : --b <= 0 && clearInterval(c);
        }, 100);
  }
  function Sq(a, b, c = !0, d = !1) {
    const e = a.I.top - b.top,
      f = pg(a.j);
    (f < e && !d) ||
      ((d = a.j.document.body),
      (d.style.paddingTop = V(b.top)),
      (d.style.paddingRight = V(b.right)),
      (d.style.paddingBottom = V(b.bottom)),
      (d.style.paddingLeft = V(b.left)),
      (a.I = b),
      c && a.j.scrollTo(0, f - e));
  }
  function $q(a, b = 0) {
    Cq(
      a,
      (d) => {
        a.O.fc ?? (!ad() && !bd())
          ? (d.style.height = te(a.C.height, !0))
          : (se(d, a.C), (d.style.width = "100%"));
      },
      !1,
      !0
    );
    const c = a.l;
    c.style.display = "block";
    c.style.margin = b === 1 ? "0 0 0 auto" : "0 auto";
    if (a.oc) {
      const d = a.g;
      Kd(d, (e) => {
        Nd(e, (f) => (e === d && /display|bottom/i.test(f) ? !1 : !0));
        if (e.nodeName === "svg") return !1;
      });
    }
  }
  function Qq(a) {
    if (a.B !== "bottom" && a.B !== "top")
      throw Error(`Unexpected position: ${a.B}`);
  }
  function Uq(a, b = !1) {
    W(a, b, 15);
    a.ia ? (a.Da ? W(a, b, 17) : a.M >= 2 && a.U && W(a, b, 18)) : W(a, b, 16);
    !a.ia || a.Da || (a.M >= 2 && a.U) || !Gq(a, b)
      ? Rq(a)
      : (W(a, b, 19), qp(a, b), Kq(a));
  }
  function Yq(a, b) {
    const c = a.oa ? Zq(a, a.R) : a.pa.top;
    if (
      a.B === "top" &&
      a.j.document.body &&
      a.ia &&
      a.A &&
      a.K &&
      a.I.top !== c &&
      b !== 0
    ) {
      var d = ie(a.I);
      b === null
        ? ((d.top = c), Sq(a, d))
        : (b > 0 &&
            a.I.top > c &&
            ((d.top = Math.max(c, a.I.top - b)), Sq(a, d, !1)),
          b < 0 &&
            a.I.top < c &&
            ((d.top = Math.min(c, a.I.top - b)), Sq(a, d, !1)));
    }
  }
  function Zq(a, b = !1) {
    return b ? a.pa.top + 30 : a.pa.top + 30 + a.na.height - 5;
  }
  var ar = class extends Dq {
      constructor(a, b, c, d, e, f, g, k = null, h = Hp, m = null) {
        super(a, b, f);
        this.N = d;
        this.ea = e;
        this.nb = g;
        this.G = k;
        this.O = h;
        this.Ra = m;
        this.J = this.sb = this.Sa = 0;
        this.Da = this.nc = !1;
        this.A = null;
        this.U = this.ia = !1;
        this.V = null;
        this.M = 0;
        this.rb = this.K = !1;
        this.oa = !0;
        this.na = null;
        this.ja = this.wa = this.va = this.cd = this.oc = this.qc = !1;
        this.xb = 0;
        this.Wc = this.R = this.tb = this.wb = this.Ka = !1;
        this.pa = we(b.document.body, "padding");
        this.I = we(b.document.body, "padding");
        this.B = c;
        this.C = Pq(this);
        this.jd = Yd(b || window).height / 2;
        this.T = Yd(b || window).height;
        this.Zc = Zd(b);
        Rq(this);
        this.Rc = this.N.ca(266, () => {
          W(this, !0, 33);
          Uq(this, !0);
        });
        this.Tc = this.N.ca(267, () => {
          W(this, !0, 34);
          Uq(this, !0);
        });
        this.dd = this.N.ca(268, () => {
          if (this.K && this.g && this.A) {
            var l = this.A;
            l.R = pg(l.W);
          }
          l = pg(this.j);
          const n = l - this.Sa;
          Yq(this, n);
          this.ja &&
            (n > 0 && (this.J += n),
            (this.tb = this.Zc - l <= this.T),
            (this.Sa = l));
          Uq(this);
        });
        this.ed = this.N.ca(269, () => {
          Tq(this);
        });
        this.fd = this.N.ca(270, (l) => {
          Vq(this, l);
        });
        this.gd = this.N.ca(271, (l) => {
          if (l && l.touches) {
            this.V = "touchmove";
            this.M = l.touches.length;
            this.U = !0;
            Uq(this);
            if (
              !this.nc &&
              l.touches &&
              l.touches.length !== 0 &&
              l.touches[0]
            ) {
              l = l.touches[0].pageY;
              var n = l - this.sb;
              this.sb = l;
              l = n;
            } else l = 0;
            l > 0 && (this.J += l);
            Yq(this, l);
          }
        });
        this.hd = this.N.ca(272, (l) => {
          l &&
            l.touches &&
            l.touches[0] &&
            ((this.V = "touchstart"),
            (this.M = l.touches.length),
            (this.U = !1),
            Uq(this),
            (this.sb = l.touches[0].pageY),
            (this.nc =
              (l = l.target) &&
              this.B === "top" &&
              this.ia &&
              this.A &&
              vp(this.A) &&
              l.nodeType === 1
                ? ce(vp(this.A), l)
                : !1));
        });
        this.ub = this.N.ca(273, () => {
          this.pb();
        });
        H(a, "load", this.ub);
        T(this, () => {
          I(a, "load", this.ub);
        });
      }
      pb() {
        if (this.va) return !1;
        this.va = !0;
        I(this.l, "load", this.ub);
        if (this.wa && !this.rb) return !1;
        Uq(this, !0);
        return !0;
      }
      qb() {
        return lg(this.j);
      }
    },
    rp = {
      ui: "gr",
      gvar: "ar",
      scroll_detached: "true",
      dismissable: "false",
    };
  var br = class extends ar {
    constructor(a, b, c, d, e, f, g, k = null) {
      var h = ul,
        m = sl,
        l = { rc: P(ej), Ec: P(Cj), Eb: P(Aj), zc: P(Bj) };
      c = Rn(f, c);
      super(a, b, d, h, m, e, c, g, l, k);
    }
    Ja(a) {
      return Eh(a);
    }
    pb() {
      if (!super.pb()) return !1;
      const a = ap(this.j, this.B === "top" ? 3 : 2);
      a && a.displayAdLoadedContent(!this.ja && !this.Ka);
      return !0;
    }
    qb() {
      if (this.C.width > kg) {
        var a = this.j;
        var b = this.C.width;
        const c = vd(a);
        a = a.innerWidth * c >= b && a.innerHeight * c >= (b > kg ? 450 : 0);
      } else a = super.qb();
      return a;
    }
  };
  var cr = class extends D {},
    dr = Qc(cr);
  function er(a) {
    fr(a, !1);
    const b = a.g;
    Cq(
      a,
      (c) => {
        E(c, gr);
        sg(c);
      },
      !0
    );
    a.l.setAttribute("width", "");
    a.l.setAttribute("height", "");
    G(a.l, gr);
    G(a.l, hr);
    G(b, ir);
    sg(b);
    sg(a.l);
  }
  function fr(a, b) {
    const c = a.g;
    b
      ? jr(a, c)
      : (E(c, { display: "none" }),
        a.A && E(a.A, { display: "none" }),
        a.C && (u.clearInterval(a.C), (a.C = 0)),
        kr(a));
  }
  function lr(a, b) {
    const c = a.g;
    if (!b) return !1;
    var d = xk(b);
    if (!d || !d.A()) return !1;
    d = d.H;
    if (!d) return !1;
    a.A = a.j.document.createElement("ins");
    E(a.A, { display: "inline-block", width: "100%" });
    var e = a.A;
    b = ek[b.l];
    P(qj) ? bk(e, d, b) : bj(e, d, b);
    a.G();
    E(c, { position: "absolute" });
    fr(a, !0);
    return !0;
  }
  function jr(a, b) {
    E(b, { display: "block" });
    a.C = u.setInterval(() => a.G, 250);
  }
  function kr(a) {
    a.I != null && (a.B.body.style.overflow = a.I);
    a.J != null && (a.B.documentElement.style.overflow = a.J);
  }
  function mr(a) {
    const b = a.g,
      c = a.j.innerHeight;
    E(b, { height: `${c}px` });
    a.j.scrollTo(0, qe(a.A).y);
    b &&
      (E(b, { top: "0" }),
      a.A && E(a.A, { height: `${c}px` }),
      E(b, { position: "fixed" }),
      a.B.body &&
        a.B.body.style.overflow !== "hidden" &&
        ((a.I = a.B.body.style.overflow),
        (a.J = a.B.documentElement.style.overflow),
        (a.B.body.style.overflow = "hidden"),
        (a.B.documentElement.style.overflow = "hidden")));
  }
  var nr = class extends Dq {
      constructor(a, b, c) {
        super(a, b, c);
        this.I = null;
        this.C = 0;
        this.J = null;
        this.K = 0;
        this.A = null;
        this.M = 0;
        this.B = b.document;
        er(this);
      }
      G() {
        if (
          this.B.body.style.overflow !== "hidden" &&
          this.B.body.style.position !== "fixed"
        ) {
          var a = this.g;
          const b = this.j.innerHeight;
          if (this.M < b) {
            const c = { height: `${b}px` };
            E(a, c);
            this.A && E(this.A, c);
            this.M = b;
          }
          (a = this.g) &&
            this.A &&
            ((this.K = qe(this.A).y),
            a.style.top !== `${this.K}px` && E(a, { top: `${this.K}px` }));
        }
      }
    },
    ir = {
      backgroundColor: "white",
      opacity: "1",
      position: "fixed",
      left: "0px",
      top: "0px",
      display: "none !important",
      zIndex: "2147483646",
    },
    gr = { width: "100%", height: "100%", zIndex: "2147483646" },
    hr = { left: "0", position: "absolute", top: "0" };
  function or(a, b) {
    var c = a.document.body;
    if (!c || !b) return zl("sci_evt", { amacerr: 1 }, 0.1), null;
    b = Ec(b, xn, 1);
    var d = [];
    for (let q = 0; q < b.length; q++) {
      a: {
        var e = b[q];
        var f = q,
          g = a,
          k = Dc(e, Ti, 1);
        if (!k) {
          e = null;
          break a;
        }
        b: {
          var h = k;
          if (!h) {
            var m = null;
            break b;
          }
          m = Jc(h, 7, B);
          if (Jc(h, 1, B) || h.getId() || oc(h, 4, Qb, nc()).length > 0) {
            var l = h.getId(),
              n = Jc(h, 1, B),
              p = oc(h, 4, Qb, nc());
            m = Ib(C(h, 2, B));
            var t = Ib(C(h, 5, B));
            h = Gn(Fb(C(h, 6, B)));
            let z = "";
            n && (z += n);
            l && (z += "#" + Li(l));
            if (p) for (l = 0; l < p.length; l++) z += "." + Li(p[l]);
            m = (p = z) ? new Ni(p, m, t, h) : null;
          } else
            m = m
              ? new Ni(m, Ib(C(h, 2, B)), Ib(C(h, 5, B)), Gn(Fb(C(h, 6, B))))
              : null;
        }
        t = m;
        if (!t) {
          e = null;
          break a;
        }
        m = Fb(C(e, 2, B));
        m = Jn[m];
        p = m === void 0 ? null : m;
        if (p === null) {
          e = null;
          break a;
        }
        m = (m = Dc(e, wn, 3)) ? Ic(m, 3, B) : null;
        t = new Mn(t, p);
        p = oc(e, 10, Fb, nc()).slice(0);
        Ib(C(k, 5)) != null && p.push(1);
        k = Ib(C(e, 12, B));
        p = e.Y;
        p = Cc(p, p[A] | 0, aj, 4) !== void 0 ? Dc(e, aj, 4) : null;
        e =
          Fb(C(e, 8)) == 1
            ? new Pn(t, new Kn(In(Dc(e, wn, 3), null)), m, 0, p, g, f, k, e)
            : Fb(C(e, 8)) == 2
            ? new Pn(t, new Ln(e), m, 1, p, g, f, k, e)
            : null;
      }
      e !== null && d.push(e);
    }
    b = new Jo(d, a);
    d = a.innerHeight;
    a = a.innerWidth;
    a = po(no(0.85 * a, a), d);
    a.g.push(new io());
    a.l = 1;
    a = a.build();
    a = Go(b, a)[0] || null;
    if (!a) return null;
    c = { node: new vh(c, !1).g(a.g) || void 0, Tb: void 0, identifier: {} };
    if (!c.node) throw Error("amac:n");
    b = Xn(a.Fa.g.g);
    if (b === null) throw Error("amac:p");
    return (c = new Ql(c, b).build()) ? { Lb: c, te: a.Wa.g } : null;
  }
  function pr(a) {
    var b = new ig();
    b.g = !0;
    b.B = 0.85;
    b.j = 1;
    b.A = 25;
    b.l = a.innerHeight;
    b.C = !0;
    b = b.build();
    return qn(a, b);
  }
  function qr(a) {
    const b = ng(a, !0),
      c = mg(a).scrollWidth,
      d = mg(a).scrollHeight;
    let e = "unknown";
    a && a.document && a.document.readyState && (e = a.document.readyState);
    var f = pg(a);
    const g = [];
    var k = [];
    const h = [],
      m = [];
    var l = [],
      n = [],
      p = [];
    let t = 0,
      q = 0,
      z = Infinity,
      F = Infinity,
      Z = null;
    var M = qm({ Hc: !1 }, a);
    for (const N of M) {
      M = N.getBoundingClientRect();
      const X = b - (M.bottom + f);
      var v = void 0,
        w = void 0;
      if (
        N.className &&
        N.className.indexOf("adsbygoogle-ablated-ad-slot") != -1
      ) {
        v = N.getAttribute("google_element_uid");
        let K;
        if ((w = a.fqjyf)) {
          if ((v && w[v] && (K = w[v].LmpfC), !K)) continue;
        } else continue;
        a: {
          v = Number(K.google_ad_width);
          w = Number(K.google_ad_height);
          if (!(v > 0 && w > 0)) {
            b: {
              try {
                const Ud = String(K.google_ad_format);
                if (Ud && Ud.match) {
                  const Of = Ud.match(/(\d+)x(\d+)/i);
                  if (Of) {
                    const Wj = parseInt(Of[1], 10),
                      Xj = parseInt(Of[2], 10);
                    if (Wj > 0 && Xj > 0) {
                      var R = { width: Wj, height: Xj };
                      break b;
                    }
                  }
                }
              } catch (Ud) {}
              R = null;
            }
            const Kb = R;
            if (!Kb) {
              v = null;
              break a;
            }
            v = v > 0 ? v : Kb.width;
            w = w > 0 ? w : Kb.height;
          }
          v = { width: v, height: w };
        }
        v = (w = v) ? w.height : 0;
        w = w ? w.width : 0;
      } else if (
        ((v = M.bottom - M.top), (w = M.right - M.left), v <= 1 || w <= 1)
      )
        continue;
      g.push(v);
      h.push(w);
      m.push(v * w);
      vm(N)
        ? ((q += 1),
          N.className &&
            N.className.indexOf("pedestal_container") != -1 &&
            (Z = v))
        : ((z = Math.min(z, X)), n.push(M), (t += 1), k.push(v), l.push(v * w));
      F = Math.min(F, X);
      p.push(M);
    }
    z = z === Infinity ? null : z;
    F = F === Infinity ? null : F;
    f = rr(n);
    p = rr(p);
    k = sr(b, k);
    n = sr(b, g);
    l = sr(b * c, l);
    R = sr(b * c, m);
    return new tr(a, {
      vd: e,
      Sc: b,
      Wd: c,
      Vd: d,
      Nc: t,
      uc: q,
      vc: ur(g),
      pd: ur(h),
      od: ur(m),
      Qd: f,
      Pd: p,
      Od: z,
      Nd: F,
      td: k,
      rd: n,
      nd: l,
      md: R,
      Xd: Z,
    });
  }
  function vr(a, b = 0) {
    a = qr(a);
    return ((a.g.vc || 0) * (a.g.Nc + a.g.uc) + b) / (a.g.Sc + b);
  }
  function wr(a, b) {
    var c = ad() && !(J(a.j) >= 900);
    const d = Ea([], (e) => Ha(a.l, e)).join(",");
    b = {
      wpc: "",
      su: b,
      eid: d,
      doc: a.g.vd ?? null,
      pg_h: Y(a.g.Sc),
      pg_w: Y(a.g.Wd),
      pg_hs: Y(a.g.Vd),
      c: Y(a.g.Nc),
      aa_c: Y(a.g.uc),
      av_h: Y(a.g.vc),
      av_w: Y(a.g.pd),
      av_a: Y(a.g.od),
      s: Y(a.g.Qd),
      all_s: Y(a.g.Pd),
      b: Y(a.g.Od),
      all_b: Y(a.g.Nd),
      d: Y(a.g.td),
      all_d: Y(a.g.rd),
      ard: Y(a.g.nd),
      all_ard: Y(a.g.md),
      pd_h: Y(a.g.Xd),
      dt: c ? "m" : "d",
    };
    c = {};
    for (const e of Object.keys(b)) b[e] !== null && (c[e] = b[e]);
    return c;
  }
  var tr = class {
    constructor(a, b) {
      this.l = [];
      this.j = a;
      this.g = b;
    }
  };
  function ur(a) {
    return (
      Td.apply(
        null,
        Ea(a, (b) => b > 0)
      ) || null
    );
  }
  function sr(a, b) {
    return a <= 0 ? null : Sd.apply(null, b) / a;
  }
  function rr(a) {
    let b = Infinity;
    for (let e = 0; e < a.length - 1; e++)
      for (let f = e + 1; f < a.length; f++) {
        var c = a[e],
          d = a[f];
        c = Math.max(
          Math.max(0, c.left - d.right, d.left - c.right),
          Math.max(0, c.top - d.bottom, d.top - c.bottom)
        );
        c > 0 && (b = Math.min(c, b));
      }
    return b !== Infinity ? b : null;
  }
  function Y(a) {
    return a == null ? null : Number.isInteger(a) ? a.toString() : a.toFixed(3);
  }
  function xr(a, b, c) {
    a.g = Bq(b, c, "__lsv__");
    return !!a.g && a.g?.length === 0;
  }
  function yr(a, b) {
    var c = zr();
    try {
      if (!a || !xr(c, a, b)) return !1;
      c.g.push(Date.now());
      const d = JSON.stringify(c.g);
      a.setItem("__lsv__", d);
      return a.getItem("__lsv__") === d;
    } catch (d) {
      return !1;
    }
  }
  var Ar = class {
    constructor() {
      this.g = null;
    }
  };
  function zr() {
    Br || (Br = new Cr());
    return Br;
  }
  var Cr = class extends Ar {},
    Br = null;
  function Dr(a, b) {
    if (a.oa) Promise.resolve(!1);
    else {
      a.oa = !0;
      b = rg(b);
      a.V = b["i-fvs"] === "true";
      var c = b.i_expid;
      c && (a.K = c);
      b.qid && (a.Pa = b.qid);
      a.C = parseFloat(b.den_lim) || 0;
      b = parseInt(b.sti_lt, 10);
      isNaN(b) || (a.O = b);
      a.G = !0;
      if (Er(a)) Promise.resolve(!1);
      else {
        var d = new Oo(),
          e = () => {
            const g = ng(a.j, !0);
            Fr(
              a,
              {
                nip: 1,
                ph: g,
                vh: a.j.innerHeight,
                iplt: Date.now() - a.M,
                ama: a.J.toString(),
                url: a.j.location ? a.j.location.href : "",
              },
              0.1
            );
            d.resolve(!1);
          },
          f = (g, k) => {
            Fr(a, { iplt: Date.now() - a.M, ama: a.J.toString(), y: k }, 0.01);
            d.resolve(Gr(a, g));
          };
        a.M = Date.now();
        a.J
          ? (b = or(a.j, a.Da)) && a.G && !Er(a)
            ? f(b.Lb, b.te)
            : (Fr(a, { amacerr: 1 }, 0.1), e())
          : pr(a.j).then((g) => {
              a.G &&
                !Er(a) &&
                g.la().then((k) => {
                  if (k.j) var h = k.j;
                  else
                    k.g || (wk(k, !1), k.A()),
                      (h = k.g),
                      !k.j && h && (k.j = h.j()),
                      (h = k.j);
                  f(k, h ? h.top : -1);
                }, e);
              d.resolve(!1);
            });
      }
    }
  }
  function Er(a) {
    return a.V
      ? !1
      : U(a.j).wasReactiveAdVisible[8]
      ? (Fr(a, { vigs: 1 }, 0.1), !0)
      : !1;
  }
  function Fr(a, b, c) {
    b = b || {};
    a.Pa && (b.qid = a.Pa);
    a.K && (b.eid = a.K);
    a.ta && (b.tsl = Date.now() - a.ta);
    a.R && ((b.tslo = Date.now() - a.R), (b.tl = a.va));
    a.I.src && (b.req = a.I.src);
    zl("sci_evt", b, c);
  }
  function Gr(a, b) {
    Hr(a) &&
      Ir(a) &&
      lr(a.g, b) &&
      ((a.ta = Date.now()),
      Jr(a),
      a.V
        ? Kr(a)
        : a.requestAnimationFrame.call(a.j, () => {
            Lr(a);
          }));
    return !!a.ta;
  }
  function Mr(a) {
    a.Za = !0;
    a.l = !1;
    fr(a.g, !1);
    a.A && (I(a.j, "orientationchange", a.A), (a.A = null));
    a.B && (I(a.j, "resize", a.B), (a.B = null));
  }
  function Hr(a) {
    var b = a.j.innerHeight;
    if (!b) return !1;
    const c = !lg(a.j);
    var d = a.j;
    const e = J(d);
    d = mg(d).scrollWidth <= e;
    let f;
    if (c) return Fr(a, { lnd: 1 }, 0.1), !1;
    if (a.C && (f = vr(a.j, b)) > a.C)
      return (
        (b = wr(qr(a.j), a.j.location.hostname)),
        Fr(a, { den: f, lim: a.C, ...b }, 1),
        !1
      );
    d || Fr(a, { pwev: 1 }, 0.1);
    return !0;
  }
  function Ir(a) {
    if (a.ia) return !0;
    a = Rn(a.na, a.pubWin);
    return xr(zr(), a, 3600);
  }
  function Jr(a) {
    a.A = yl(519, () => {
      !a.Za &&
        a.l &&
        Fr(a, { tto: Date.now() - a.ta, por: lg(a.j) ? 1 : 0 }, 0.1);
    });
    H(a.j, "orientationchange", a.A);
    a.B = yl(520, () => {
      a.Za || (a.g.G(), a.l && Fr(a, { ttre: Date.now() - a.ta }, 0.1));
    });
    H(a.j, "resize", a.B);
  }
  function Kr(a) {
    a.pa ||
      (a.I.contentWindow.postMessage(
        JSON.stringify({ msg_type: "i-view" }),
        "https://googleads.g.doubleclick.net"
      ),
      (a.pa = !0));
  }
  function Lr(a) {
    if (!a.Za)
      if (Er(a)) Mr(a);
      else {
        var b = a.g.g.getBoundingClientRect().top,
          c = a.j.innerHeight;
        a.g.G();
        (c - b) / c >= 0.5 && Kr(a);
        if (b < c) {
          U(a.j).wasReactiveAdVisible[9] = !0;
          if (!a.ia) {
            const d = Rn(a.na, a.pubWin);
            yr(d, 3600);
          }
          a.wa = !0;
        }
        b <= 0
          ? (a.O >= 0 && Nr(a), Fr(a, { sice: "true", vh: c, gvto: b }, 0.1))
          : a.requestAnimationFrame &&
            a.requestAnimationFrame.call(a.j, () => {
              Lr(a);
            });
      }
  }
  function Nr(a) {
    a.R = Date.now();
    a.l = !0;
    a.va++;
    mr(a.g);
    u.setTimeout(() => {
      if (a.l) {
        a.l = !1;
        var b = a.g;
        const c = b.g;
        E(c, { top: `${qe(b.A).y}px` });
        E(c, { position: "absolute" });
        kr(b);
      }
    }, Math.max(0, a.O));
  }
  var Or = class extends op {
    constructor(a, b, c, d, e, f, g) {
      super(a, c);
      this.pubWin = b;
      this.ia = e;
      this.na = g;
      this.Za = !1;
      this.K = null;
      this.l = this.V = this.G = this.oa = !1;
      this.va = this.R = this.ta = 0;
      this.B = this.A = this.Pa = null;
      this.wa = this.pa = !1;
      this.C = this.M = this.O = 0;
      this.requestAnimationFrame =
        u.requestAnimationFrame ||
        u.webkitRequestAnimationFrame ||
        u.mozRequestAnimationFrame ||
        u.oRequestAnimationFrame ||
        u.msRequestAnimationFrame;
      this.g = new nr(c, a, f);
      this.J = Ic(d, 1) ?? !1;
      this.Da = Dc(d, yn, 2) ?? null;
    }
    U(a) {
      a["sti-fill"] = (b) => {
        Dr(this, b);
      };
      a["i-no"] = () => {
        this.G = !1;
        !this.wa && this.ta && Mr(this);
      };
    }
  };
  var Pr = class extends cp {
    constructor() {
      super(...arguments);
      this.K = !1;
      this.L = null;
    }
    G(a) {
      this.K = !!a.enableAma;
      if ((a = a.amaConfig))
        try {
          var b = zn(a);
        } catch (c) {
          b = null;
        }
      else b = null;
      this.L = b;
      return !0;
    }
  };
  var Qr = class {
    verifyAndProcessConfig(a, b, c) {
      var d = U(a);
      if (d.wasReactiveAdConfigReceived[9]) return !1;
      const e = new Pr();
      if (!bp(e, b)) return !1;
      d.wasReactiveAdConfigReceived[9] = !0;
      if (!e.B && !xr(zr(), c, 3600)) return !1;
      b = ae(document, "INS");
      b.className = "adsbygoogle";
      E(b, { display: "none" });
      a.document.documentElement.appendChild(b);
      c = e.C || {};
      c.google_ad_client = e.A;
      c.google_ad_height = mg(a).clientHeight || 0;
      c.google_ad_width = J(a) || 0;
      c.google_reactive_ad_format = 9;
      d = new cr();
      var f = e.K;
      if (f != null && typeof f !== "boolean")
        throw Error(`Expected boolean but got ${ja(f)}: ${f}`);
      d = lc(d, 1, f);
      e.L && Gc(d, 2, e.L);
      d = JSON.stringify(Xb(d));
      c.google_rasc = d;
      e.B && (c.google_adtest = "on");
      ep(b, c, a);
      return !0;
    }
  };
  var Rr = class {
    constructor(a) {
      this.g = a;
      this.j = 0;
      this.ea = new Uf(Cf());
      this.hb = new ol();
    }
    hc(a) {
      var b = Zj(nj);
      if (this.hb.lb(b)) {
        var c = this.g.Yd,
          d = this.g.Cb,
          e = this.g.zb;
        a = a.D;
        var f = new pf();
        a = wc(f, 12, qf, Eb(a));
        e = lc(a, 9, Pb(e));
        e = lc(e, 10, Hb(b));
        d = lc(e, 11, Pb(d));
        e = c == null ? c : Jb(c);
        lc(d, 13, e);
        d = Bc(a, of, 5);
        hc(d);
        d = oc(d, 1, Fb, 2, !0);
        d.push(Db(9, ab(d === Za ? 7 : d[A] | 0) ?? 1024));
        d = new rf();
        c = Mc(d, 1, c);
        b = Mc(c, 2, b);
        b = Hc(b, 6, sf, a);
        a: {
          hc(b);
          if (void 0 === fb) {
            if (Ac(b, sf, 6) !== 6) {
              c = void 0;
              break a;
            }
          } else zc(b.Y, void 0, sf, 6);
          c = Bc(b, pf, 6);
        }
        a = this.j++;
        lc(c, 1, Hb(a));
        Nf(this.ea, b);
      }
    }
  };
  function Sr(a, b) {
    var { Kd: c } = a.g();
    if (a.hb.lb(c)) {
      var d = a.params.bd,
        e = a.params.Cb,
        f = a.params.yb,
        g = a.params.zb,
        k = a.params.ob,
        h = b.Pa,
        m = b.ne;
      b = a.ea;
      c = wf(c);
      a = a.j++;
      a = vc(c, 1, Hb(a), 0);
      a = vf(a);
      e = Nc(a, 11, e);
      d = Mc(e, 8, d);
      f = Oc(nf([f]));
      f = Gc(d, 5, f);
      g = Nc(f, 9, g);
      k = k();
      k = uc(g, 12, k, Gb);
      g = new uf();
      h = Nc(g, 2, h);
      g = new tf();
      m = lc(g, 1, Eb(m));
      m = ec(m);
      m = Gc(h, 1, m);
      m = ec(m);
      m = Hc(k, 6, yf, m);
      Mf(b, ec(m));
    }
  }
  var Ur = class {
    constructor(a, b, c) {
      var d = Tr;
      this.ea = a;
      this.hb = b;
      this.params = c;
      this.g = d;
      this.j = 0;
    }
    F(a) {
      var { fe: b } = this.g();
      if (this.hb.lb(b)) {
        var c = this.params.bd,
          d = this.params.Cb,
          e = this.params.yb,
          f = this.params.zb,
          g = this.params.ob,
          k = a.D;
        a = this.ea;
        b = wf(b);
        var h = this.j++;
        b = vc(b, 1, Hb(h), 0);
        b = vf(b);
        k = wc(b, 3, yf, Eb(k));
        d = Nc(k, 11, d);
        c = Mc(d, 8, c);
        e = Oc(nf([e]));
        e = Gc(c, 5, e);
        f = Nc(e, 9, f);
        g = g();
        g = uc(f, 12, g, Gb);
        Mf(a, ec(g));
      }
    }
  };
  var Vr = class extends Ur {
    constructor(a) {
      if (b == null) {
        var b = new ol();
        b = { ea: new Uf(a.zb), hb: b };
      }
      super(b.ea, b.hb, a);
    }
  };
  function Tr() {
    return { fe: Zj(Nj), Kd: 0 };
  }
  var Yr = class extends op {
    constructor(a, b) {
      super(a, b.l);
      this.g = b;
    }
    U(a) {
      a.dismiss = () => {
        var b = this.g;
        Wr(b, -30);
        Xr(b, "dismissed");
      };
    }
  };
  function Zr(a, b) {
    const c = Ed("STYLE", a);
    od(c);
    a?.head.appendChild(c);
    setTimeout(() => {
      a?.head.removeChild(c);
    }, b);
  }
  function $r(a, b, c) {
    if (!a.body) return null;
    const d = new as();
    d.apply(a, b);
    return () => {
      var e = c || 0;
      e > 0 && Zr(b.document, e);
      G(a.body, {
        filter: d.g,
        webkitFilter: d.g,
        overflow: d.l,
        position: d.A,
        top: d.B,
      });
      b.scrollTo(0, d.j);
    };
  }
  class as {
    constructor() {
      this.g = this.B = this.A = this.l = null;
      this.j = 0;
    }
    apply(a, b) {
      this.l = a.body.style.overflow;
      this.A = a.body.style.position;
      this.B = a.body.style.top;
      this.g = a.body.style.filter
        ? a.body.style.filter
        : a.body.style.webkitFilter;
      this.j = pg(b);
      G(a.body, "top", `${-this.j}px`);
    }
  }
  function bs(a, b) {
    const c = a.g;
    if (c)
      if (b) {
        b = a.G;
        if (b.g == null) {
          var d = b.controller;
          const e = d.floatingAdsStacking.nextRestrictionId++;
          d.floatingAdsStacking.maxZIndexRestrictions[e] = 2147483646;
          Yp(d);
          b.g = e;
        }
        E(c, { display: "block" });
        a.B.body && !a.A && (a.A = $r(a.B, a.j, a.I));
        c.setAttribute("tabindex", "0");
        c.setAttribute("aria-hidden", "false");
        a.B.body.setAttribute("aria-hidden", "true");
      } else
        (b = a.G),
          b.g != null &&
            ((d = b.controller),
            delete d.floatingAdsStacking.maxZIndexRestrictions[b.g],
            Yp(d),
            (b.g = null)),
          E(c, { display: "none" }),
          a.A && (a.A(), (a.A = null)),
          a.B.body.setAttribute("aria-hidden", "false"),
          c.setAttribute("aria-hidden", "true");
  }
  function cs(a) {
    bs(a, !1);
    const b = a.g;
    if (b) {
      var c = ds(a.C);
      Cq(
        a,
        (d) => {
          E(d, c);
          sg(d);
        },
        !0
      );
      a.l.setAttribute("width", "");
      a.l.setAttribute("height", "");
      G(a.l, c);
      G(a.l, es);
      G(b, fs);
      G(b, { background: "transparent" });
      E(b, { display: "none", position: "fixed" });
      sg(b);
      sg(a.l);
      vd(a.C) <= 1 ||
        (G(b, { overflow: "scroll", "max-width": "100vw" }), Nd(b));
    }
  }
  var gs = class extends Dq {
      constructor(a, b, c) {
        var d = Zj(Oj);
        super(a, b, c);
        this.C = b;
        this.I = d;
        this.A = null;
        this.B = b.document;
        a = new aq(b);
        this.G = new bq(a);
      }
    },
    fs = {
      backgroundColor: "white",
      opacity: "1",
      position: "fixed",
      left: "0px",
      top: "0px",
      margin: "0px",
      padding: "0px",
      display: "none",
      zIndex: "2147483647",
    },
    es = { left: "0", position: "absolute", top: "0" };
  function ds(a) {
    a = vd(a);
    a = 100 * (a < 1 ? 1 : a);
    return { width: `${a}vw`, height: `${a}vh` };
  }
  var hs = class extends gs {
    constructor(a, b, c) {
      super(b, a, c);
      cs(this);
    }
    Ja(a) {
      return Eh(a);
    }
  };
  function is() {
    const { promise: a, resolve: b } = new Oo();
    return {
      ie: (c, d) => {
        d?.ports.length && b(new js(d.ports[0]));
      },
      he: a,
    };
  }
  var js = class extends Q {
    constructor(a) {
      super();
      const { promise: b, resolve: c } = new Oo();
      this.promise = b;
      a.onmessage = () => c();
      T(this, () => {
        a.close();
      });
    }
  };
  const ks =
    "youtube.com youtube-nocookie.com vimeo.com dailymotion.com twitch.tv kick.com rumble.com".split(
      " "
    );
  function ls(a, b) {
    a = a.getComputedStyle(b);
    return (
      b.offsetWidth > 0 &&
      b.offsetHeight > 0 &&
      a.display !== "none" &&
      a.visibility !== "hidden" &&
      a.opacity !== "0"
    );
  }
  function ms(a) {
    return (
      Array.from(a.document.querySelectorAll("video")).some(
        (b) => ls(a, b) && !(!b.currentSrc && !b.src)
      ) ||
      Array.from(a.document.querySelectorAll("iframe")).some((b) => ns(a, b))
    );
  }
  function ns(a, b) {
    return ls(a, b) && ks.some((c) => b.src?.includes(c));
  }
  const os = ["mousemove", "mousedown", "scroll", "keydown"];
  function ps(a, b = 3e4) {
    return new qs(a, b);
  }
  function rs(a) {
    let b = null,
      c = null;
    const d = (f) => {
      if (b && f.timeStamp - b > a.Yb) {
        if (ms(a.g)) {
          a.dispose();
          return;
        }
        var g = { ib: f.timeStamp, Jd: f.timeStamp - b, se: c };
        for (const k of a.j)
          try {
            k(g);
          } catch (h) {}
      }
      b = f.timeStamp;
    };
    for (const f of os) a.g.addEventListener(f, d);
    let e = null;
    a.g.navigator?.userActivation &&
      a.g.performance?.now &&
      (e = a.g.setInterval(() => {
        a.g.navigator.userActivation.isActive && (c = a.g.performance.now());
      }, 1e3));
    T(a, () => {
      for (const f of os) a.g.removeEventListener(f, d);
      e && a.g.clearInterval(e);
    });
  }
  var qs = class extends Q {
    constructor(a, b) {
      super();
      this.g = a;
      this.Yb = b;
      this.j = [];
      this.l = Zc(() => {
        rs(this);
      });
    }
    listen(a) {
      this.l();
      this.j.push(a);
    }
  };
  const ss = Array.from({ length: 11 }, (a, b) => b / 10);
  function ts(a) {
    const b = (d) => {
        d.isTrusted && ((a.B = !0), a.j(d.timeStamp));
      },
      c = (d) => {
        d.isTrusted && ((a.B = !1), a.j(d.timeStamp));
      };
    H(a.g, "focus", b);
    H(a.g, "blur", c);
    T(a, () => void a.g.removeEventListener("focus", b));
    T(a, () => void a.g.removeEventListener("blur", c));
    a.B = a.g.document.hasFocus();
  }
  function us(a) {
    const b = (c) => {
      c.isTrusted &&
        ((a.A = Eq(a.g.document) === 1 ? !0 : !1), a.j(c.timeStamp));
    };
    H(a.g.document, "visibilitychange", b);
    T(a, () => void a.g.document.removeEventListener("visibilitychange", b));
    a.A = Eq(a.g.document) === 1;
  }
  function vs(a) {
    const b = a.g.document.body.getBoundingClientRect().top + 10,
      c = (d) => {
        d.isTrusted && ((a.C = d.clientY < b ? !0 : !1), a.j(d.timeStamp));
      };
    H(a.g.document.body, "mouseleave", c);
    H(a.g.document.body, "mouseenter", c);
    T(a, () => void a.g.document.body.removeEventListener("mouseleave", c));
    T(a, () => void a.g.document.body.removeEventListener("mouseenter", c));
    a.C = !1;
  }
  function ws(a) {
    const b = a.g.document.querySelectorAll("article");
    if (b.length) {
      var c = new IntersectionObserver(
        (d) => {
          for (const e of d)
            e.boundingClientRect.bottom <= a.g.innerHeight &&
              (a.j(e.time), c.unobserve(e.target));
        },
        { root: null, threshold: ss }
      );
      for (const d of b) c.observe(d);
      T(a, () => void c.disconnect());
    }
  }
  function xs(a) {
    let b = a.g.scrollY;
    const c = (d) => {
      d.isTrusted &&
        ((a.R = a.g.scrollY - b), (b = a.g.scrollY), a.j(d.timeStamp));
    };
    H(a.g, "scroll", c);
    T(a, () => void a.g.removeEventListener("scroll", c));
  }
  function ys(a) {
    const b = a.g.navigation;
    if (
      b &&
      (Ba() || (Aa() ? 0 : y("Edge")) || (Aa() ? 0 : y("Opera"))) &&
      !b.canGoForward &&
      ib(a.g.history.pushState)
    ) {
      var c = (d) => {
        d.navigationType === "traverse"
          ? (!a.Db || a.g.history.state?.Gd) &&
            d.intercept({
              async handler() {
                a.M = !0;
                a.j(d.timeStamp);
              },
            })
          : a.I ||
            d.navigationType !== "push" ||
            d.destination.url !== a.g.location.href ||
            d.intercept({ async handler() {} });
      };
      H(b, "navigate", c);
      T(a, () => void b.removeEventListener("navigate", c));
      a.g.history.pushState(a.Db ? { Gd: !0 } : {}, "", a.g.location.href);
      a.I = !0;
    }
  }
  function zs(a) {
    const b = a.g.navigation;
    if (b && (Ba() || (Aa() ? 0 : y("Edge")) || (Aa() ? 0 : y("Opera")))) {
      var c = (d) => {
        d.formData ||
          (d.sourceElement && d.sourceElement.tagName === "A") ||
          d.destination.url === a.g.location.href ||
          d.destination.url.includes("#google_vignette") ||
          !d.canIntercept ||
          ((a.J = a.g.location.href),
          d.intercept({
            handler: async () => {
              a.j(d.timeStamp);
              b.removeEventListener("navigate", c);
            },
          }));
      };
      H(b, "navigate", c);
      T(a, () => void b.removeEventListener("navigate", c));
    }
  }
  var As = class extends Q {
    constructor(a, b, c = !1) {
      super();
      this.g = a;
      this.Db = c;
      this.I = this.M = this.C = this.B = this.A = !1;
      this.R = 0;
      this.J = null;
      if (Oe(a))
        for (const d of b)
          switch (d) {
            case 0:
              ts(this);
              break;
            case 1:
              us(this);
              break;
            case 2:
              vs(this);
              break;
            case 3:
              ws(this);
              break;
            case 4:
              xs(this);
              break;
            case 5:
              ys(this);
              break;
            case 6:
              zs(this);
          }
      else this.dispose();
    }
    init() {
      this.L || this.j(Oe(this.g));
    }
    ja() {
      return this.J;
    }
  };
  function Bs(a, b) {
    a.sa ? a.ia(b) : (a.O.resolve(b), a.dispose());
  }
  var Cs = class extends As {
    constructor(a, b, c, d = !1, e = !1) {
      super(a, c, e);
      this.ia = b;
      this.sa = d;
      this.O = new Oo();
      this.l = this.O.promise;
    }
  };
  var Ds = class extends Cs {
    constructor(a, b, c = !1) {
      super(a, b, [0, 1, 2], c);
      this.G = 0;
      this.init();
    }
    j(a) {
      switch (this.G) {
        case 0:
          this.B && !this.C && (this.G = 1);
          break;
        case 1:
          if (!this.B && this.A && this.C) {
            this.G = 2;
            const b = setTimeout(() => {
              this.j(a);
            }, 200);
            T(this, () => void clearTimeout(b));
          }
          break;
        case 2:
          !this.B && this.A && this.C ? Bs(this, a) : (this.G = 1);
      }
    }
  };
  function Es(a) {
    let b = !1;
    const c = ({ isTrusted: e }) => {
        e && (b = !0);
      },
      d = ({ timeStamp: e, isTrusted: f }) => {
        if ((f = f && !b))
          f =
            (f = a.g.document.referrer) && typeof URL === "function"
              ? new URL(f).origin === a.g.location.origin
              : !1;
        if (f) {
          e = { ib: e };
          for (const g of a.j)
            try {
              g(e);
            } catch (k) {}
        }
      };
    a.g.addEventListener("focus", d);
    a.g.addEventListener("blur", c);
    T(a, () => {
      a.g.removeEventListener("focus", d);
      a.g.removeEventListener("blur", c);
    });
  }
  var Fs = class extends Q {
    constructor(a) {
      super();
      this.g = a;
      this.j = [];
      this.l = Zc(() => {
        Es(this);
      });
    }
    listen(a) {
      this.l();
      this.j.push(a);
    }
  };
  function Gs(a) {
    let b = null;
    const c = ({ timeStamp: e, isTrusted: f }) => {
        f && (b = e);
      },
      d = ({ timeStamp: e, isTrusted: f }) => {
        if (f) {
          e = { ib: e, ...(b ? { me: e - b } : null) };
          for (const g of a.j)
            try {
              g(e);
            } catch (k) {}
        }
      };
    a.g.addEventListener("focus", d);
    a.g.addEventListener("blur", c);
    T(a, () => {
      a.g.removeEventListener("focus", d);
      a.g.removeEventListener("blur", c);
    });
  }
  var Hs = class extends Q {
    constructor(a) {
      super();
      this.g = a;
      this.j = [];
      this.l = Zc(() => {
        Gs(this);
      });
    }
    listen(a) {
      this.l();
      this.j.push(a);
    }
  };
  var Is = class extends Cs {
    constructor(a, b, c = !1) {
      super(a, b, [1], c);
      this.init();
    }
    j(a) {
      this.G ?? (this.G = 0);
      switch (this.G) {
        case 0:
          this.A && (this.G = 1);
          break;
        case 1:
          this.A || ((this.G = 2), (this.U = a));
          break;
        case 2:
          this.A && ((this.K = a - this.U), Bs(this, a));
      }
    }
  };
  var Js = class extends Q {
    constructor(a, b, c, d, e, f = !1) {
      super();
      this.ea = c;
      this.l = d;
      this.yb = 9;
      this.j = Math.floor(xd() * 2147483647);
      this.g = (g, k, h = {}) => {
        g = Object.assign(
          { etc: this.j, e: g, t: Math.round(k), qqid: this.l, ptt: this.yb },
          h
        );
        ff(this.ea, "eit", g, !0, 1);
      };
      this.g(1, b);
      for (const g of e)
        switch (g) {
          case 101:
            b = (h) => void this.g(g, h);
            c = new Ds(a, b, f);
            f || c.l.then(b);
            S(this, c);
            break;
          case 102:
            b = (h) => void this.g(g, h, { tbd: Math.round(k.K || -1) });
            const k = new Is(a, b, f);
            f || k.l.then(b);
            S(this, k);
            break;
          case 103:
            b = new Hs(a);
            b.listen((h) => {
              this.g(g, h.ib, { tsb: h.me ?? -1 });
            });
            S(this, b);
            break;
          case 104:
            b = ps(a);
            b.listen((h) => {
              this.g(g, h.ib, { it: h.Jd, ualta: h.se ?? -1 });
            });
            S(this, b);
            break;
          case 105:
            (b = new Fs(a)),
              b.listen((h) => {
                this.g(g, h.ib);
              }),
              S(this, b);
        }
    }
  };
  var Ks = class extends Cs {
    constructor(a, b, c = !1, d = !1) {
      super(a, b, [5], c, d);
      this.init();
    }
    j(a) {
      this.M && Bs(this, a);
    }
  };
  var Ls = class {
    constructor(a, b) {
      this.j = b;
      this.g = a.document.documentElement;
      this.body = a.document.body;
      this.C = this.g.style.height;
      this.G = this.g.style.overflowY;
      this.l = this.body.style.height;
      this.A = this.body.style.overflow;
      this.B = this.body.style.position;
    }
    start() {
      E(this.g, { height: `${this.j}px`, "overflow-y": "auto" });
      E(this.body, {
        height: `${this.j}px`,
        overflow: "hidden",
        position: "relative",
      });
    }
    stop() {
      E(this.g, { height: this.C, "overflow-y": this.G });
      E(this.body, { height: this.l, overflow: this.A, position: this.B });
    }
  };
  function Ms(a, b, c, d, e) {
    const f = a.document.createElement("div");
    f.id = "goog-continue-reading-wrapper";
    b = {
      position: "absolute",
      top: `${b}px`,
      left: `${c}px`,
      transform: "translateX(-50%)",
      "z-index": "2147483647",
      width: `${d}px`,
      height: `${e}px`,
    };
    Object.assign(b, {});
    E(f, b);
    b = f.attachShadow({ mode: "open" });
    c = a.document.createElement("button");
    c.textContent = "Continue reading";
    c.id = "goog-continue-reading-btn";
    a = a.document.createElement("style");
    a.textContent =
      "\n    :host {\n      display: block;\n      width: 100%;\n      height: 100%;\n    }\n    button {\n      background-color: #1a73e8; /* Google blue 600 */\n      color: white;\n      border: none;\n      padding: 10px 16px;\n      text-align: center;\n      font-family: 'Google Sans';\n      text-decoration: none;\n      display: flex; /* Use flex to center content */\n      align-items: center;\n      justify-content: center;\n      font-size: 14px;\n      line-height: normal; /* Adjust line-height */\n      cursor: pointer;\n      border-radius: 20px;\n      height: 100%; /* Fill wrapper */\n      width: 100%; /* Fill wrapper */\n      box-sizing: border-box;\n      overflow: visible;\n    }\n  ";
    b.appendChild(a);
    b.appendChild(c);
    return f;
  }
  function Ns(a, b, c, d = {}) {
    a = a.document.createElement("div");
    b = {
      position: "absolute",
      top: `${b}px`,
      left: "0px",
      width: "100%",
      height: `${c}px`,
      "-webkit-backdrop-filter": "blur(16px)",
      "backdrop-filter": "blur(16px)",
      filter: "blur(8px)",
      "z-index": "2147483646",
    };
    Object.assign(b, d);
    a.id = "goog-content-pause-scrim";
    E(a, b);
    return a;
  }
  function Os(a) {
    a.g.document.body.style.overflowY = a.U;
    a.g.document.documentElement.style.overflowY = a.R;
  }
  function Ps(a) {
    a.g.document.body.style.overflowY = "hidden";
    a.g.document.documentElement.style.overflowY = "hidden";
  }
  var Qs = class {
    constructor(a) {
      this.g = a;
      this.U = this.g.document.body.style.overflowY;
      this.R = this.g.document.documentElement.style.overflowY;
      this.V = this.g.document.documentElement.style.scrollbarGutter;
      this.l = 0;
      this.ua = (b) => {
        this.I(b);
      };
      this.O = (b) => {
        this.K(b);
      };
      this.M = (b) => {
        this.L(b);
      };
      this.G = (b) => {
        this.l = b.touches[0].clientY;
      };
      this.C = (b) => {
        this.J(b);
      };
      this.B = () => {
        this.l = 0;
      };
      this.A = () => {};
    }
    start() {
      this.g.document.documentElement.style.scrollbarGutter = "stable";
      this.g.addEventListener("scroll", this.ua, { passive: !1 });
      this.g.addEventListener("wheel", this.O, { passive: !1 });
      this.g.addEventListener("keydown", this.M, { passive: !1 });
      this.g.addEventListener("touchstart", this.G, { passive: !1 });
      this.g.addEventListener("touchmove", this.C, { passive: !1 });
      this.g.addEventListener("touchend", this.B, { passive: !1 });
      this.g.addEventListener("resize", this.A, { passive: !1 });
    }
    stop() {
      this.g.document.documentElement.style.scrollbarGutter = this.V;
      Os(this);
      this.g.removeEventListener("scroll", this.ua);
      this.g.removeEventListener("wheel", this.O);
      this.g.removeEventListener("keydown", this.M);
      this.g.removeEventListener("touchstart", this.G);
      this.g.removeEventListener("touchmove", this.C);
      this.g.removeEventListener("touchend", this.B);
      this.g.removeEventListener("resize", this.A);
    }
    I() {}
    K() {}
    L() {}
    J() {}
  };
  var Rs = class extends Qs {
    constructor(a, b) {
      super(a);
      this.j = b;
    }
    I(a) {
      var b = this.g.scrollX,
        c = Math.min(this.g.scrollY, this.j);
      a.preventDefault();
      a.stopImmediatePropagation();
      this.g.scrollTo(b, c);
      c >= this.j ? Ps(this) : Os(this);
    }
    K(a) {
      var b = this.g.scrollX + a.deltaX,
        c = Math.min(this.g.scrollY + a.deltaY, this.j);
      a.preventDefault();
      a.stopImmediatePropagation();
      this.g.scrollTo(b, c);
      c >= this.j ? Ps(this) : Os(this);
    }
    L(a) {
      (a.key !== "ArrowUp" && a.key !== "PageUp") || Os(this);
    }
    J(a) {
      const b = a.touches[0].clientY - this.l;
      b <= 0 && this.g.scrollY >= this.j
        ? (Ps(this),
          a.cancelable && (a.preventDefault(), a.stopImmediatePropagation()))
        : b > 0 && Os(this);
    }
  };
  function Ss(a, b, c, d = null) {
    return new Ts(a, b, c, d);
  }
  function Us(a) {
    if (!a.G && Vs(a))
      if (((a.G = !0), a.j.Oe)) {
        const b = a.g.setInterval(() => {
          a.g.document.querySelector(
            '[data-anchor-status="displayed"],[data-anchor-status="ready-to-display"]'
          ) || (a.g.clearInterval(b), Ws(a));
        }, 200);
        T(a, () => {
          a.g.clearInterval(b);
        });
      } else Ws(a);
  }
  function Vs(a) {
    a.l.F({ D: 114 });
    if (
      a.g.scrollY + a.g.innerHeight >=
      a.g.document.documentElement.scrollHeight
    )
      return a.l.F({ D: 115 }), !1;
    if (!xr(zr(), a.localStorage, a.j.Le)) return a.l.F({ D: 116 }), !1;
    a.l.F({ D: 117 });
    return !0;
  }
  function Ws(a) {
    const b = a.g.scrollY + a.g.innerHeight,
      c = a.g.document.documentElement.scrollHeight - b;
    a.button = Ms(a.g, b + a.j.Pb, a.g.innerWidth / 2, a.j.Ne, a.j.wc);
    a.A = Ns(a.g, b, c, {
      "webkit-mask-image": `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 5px, rgba(0, 0, 0, 1) ${a.j.Pb}px, rgba(0, 0, 0, 1) 100%)`,
      "webkit-mask-repeat": "no-repeat",
      "webkit-mask-size": "cover",
      "mask-image": `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 5px, rgba(0, 0, 0, 1) ${a.j.Pb}px, rgba(0, 0, 0, 1) 100%)`,
      "mask-repeat": "no-repeat",
      "mask-size": "cover",
    });
    a.B = a.j.bf
      ? new Ls(a.g, b + a.j.wc + a.j.Pb + a.j.de)
      : new Rs(a.g, a.g.scrollY + a.j.wc + a.j.Pb + a.j.de);
    a.g.document.body.appendChild(a.button);
    a.g.document.body.appendChild(a.A);
    a.B.start();
    a.l.F({ D: 118 });
    const d = new IntersectionObserver(
      (f) => {
        for (const g of f) {
          if (!g.isIntersecting) break;
          a.l.F({ D: 119 });
          d.disconnect();
        }
      },
      { root: null, threshold: 0 }
    );
    d.observe(a.button);
    const e = () => {
      Xs(a);
      var f = { ib: a.g.performance.now() };
      for (const g of a.C)
        try {
          g(f);
        } catch (k) {}
      a.l.F({ D: 120 });
    };
    a.button.addEventListener("click", e);
    T(a, () => {
      Xs(a);
      a.button?.removeEventListener("click", e);
    });
  }
  function Xs(a) {
    a.button?.remove();
    a.A?.remove();
    a.B?.stop();
  }
  var Ts = class extends Q {
    constructor(a, b, c, d = null) {
      super();
      this.g = a;
      this.j = b;
      this.l = c;
      this.localStorage = d;
      this.C = [];
      this.B = this.A = this.button = null;
      this.G = !1;
    }
    listen(a) {
      Us(this);
      this.C.push(a);
    }
    I() {
      Xs(this);
    }
  };
  var Ys = class extends Cs {
    constructor(a, b, c, d, e, f, g = !1) {
      super(a, b, [4], g);
      this.V = c;
      this.ma = d;
      this.K = 0;
      this.U = null;
      this.G = [];
      const k = a.document.body.scrollHeight;
      k < a.innerHeight
        ? this.dispose()
        : ((b = a.document.querySelectorAll("article")),
          e && b.length !== 1
            ? this.dispose()
            : ((this.G = [...b].filter((h) => {
                const {
                  height: m,
                  top: l,
                  bottom: n,
                } = h.getBoundingClientRect();
                return n > 0 && n < a.innerHeight && l > 0 ? !1 : m / k >= f;
              })),
              this.G.length === 0 ? this.dispose() : this.init()));
    }
    j(a) {
      switch (this.K) {
        case 0:
          for (const b of this.G) {
            const { bottom: c } = b.getBoundingClientRect();
            c > 0 &&
              c < this.g.innerHeight &&
              ((this.U = setTimeout(() => {
                Bs(this, a + this.V);
              }, this.V)),
              (this.K = 1));
          }
          break;
        case 1:
          this.R > -this.ma || (clearTimeout(this.U), Bs(this, a));
      }
    }
  };
  var Zs = class extends Cs {
    constructor(a, b, c = !1) {
      super(a, b, [6], c);
      this.init();
    }
    j(a) {
      this.J !== null && Bs(this, a);
    }
  };
  var $s = class extends Cs {
    constructor(a, b, c) {
      super(a, b, [], !1);
      this.G = c;
      this.init();
    }
    j(a) {
      this.G(a) && Bs(this, a);
    }
  };
  var at = class extends Q {
    constructor(a, b, c, d, e, f, g = null) {
      super();
      this.l = !1;
      this.g = this.j = void 0;
      c.promise.then(() => void this.dispose());
      const k = (h) => {
        d(h) && this.dispose();
      };
      for (const h of b)
        switch (h) {
          case 2:
            b = new Is(a, () => void k(h), e.sa);
            S(this, b);
            e.sa || b.l.then(() => void c.resolve(h));
            break;
          case 3:
            if (wd() !== 0) break;
            b = new Ds(a, () => void k(h), e.sa);
            S(this, b);
            e.sa || b.l.then(() => void c.resolve(h));
            break;
          case 4:
            b = new Fs(a);
            S(this, b);
            b.listen(e.sa ? () => void k(h) : () => void c.resolve(h));
            break;
          case 5:
            b = ps(a, e.Yb);
            S(this, b);
            b.listen(e.sa ? () => void k(h) : () => void c.resolve(h));
            break;
          case 6:
            b = new Ys(a, () => void k(h), e.Dd, e.Bd, e.Cd, e.zd ?? -1, e.sa);
            S(this, b);
            e.sa || b.l.then(() => void c.resolve(h));
            break;
          case 8:
            b = new $s(a, () => void k(h), e.af);
            S(this, b);
            b.l.then(() => void c.resolve(h));
            break;
          case 9:
            b = new Ks(a, () => void k(h), e.sa, e.Db);
            S(this, b);
            e.sa || b.l.then(() => void c.resolve(h));
            this.l = b.I;
            break;
          case 10:
            this.j = new Zs(a, () => void k(h), e.sa);
            S(this, this.j);
            e.sa || this.j.l.then(() => void c.resolve(h));
            break;
          case 11:
            (this.g = Ss(a, e.Me, f, g)),
              S(this, this.g),
              this.g.listen(e.sa ? () => void k(h) : () => void c.resolve(h));
        }
    }
    C() {
      return this.l;
    }
    B() {
      return this.j?.ja();
    }
    A() {
      this.g?.I();
    }
  };
  const bt = {
      SCRIPT: 1,
      STYLE: 1,
      HEAD: 1,
      IFRAME: 1,
      OBJECT: 1,
      NOSCRIPT: 1,
    },
    ct = { IMG: " ", BR: "\n" };
  function dt(a, b, c, d) {
    if (!(a.nodeName in bt))
      if (a.nodeType === 3)
        c
          ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, ""))
          : b.push(a.nodeValue);
      else if (a.nodeName in ct)
        d &&
          a.nodeName === "IMG" &&
          a.hasAttribute("alt") &&
          b.push(" " + a.getAttribute("alt")),
          b.push(ct[a.nodeName]);
      else for (a = a.firstChild; a; ) dt(a, b, c, d), (a = a.nextSibling);
  }
  var et = / \xAD /g,
    ft = /\xAD/g,
    gt = /\u200B/g,
    ht = / +/g,
    it = /^\s*/;
  function jt(a) {
    const b = new Set();
    a.forEach((c) => {
      switch (c) {
        case 1:
          b.add(1);
          break;
        case 2:
          b.add(2);
          break;
        case 3:
          b.add(3);
          break;
        case 5:
          b.add(5);
          break;
        case 6:
          b.add(6);
          break;
        case 8:
          b.add(8);
          break;
        case 9:
          b.add(9);
          break;
        case 10:
          b.add(10);
          break;
        case 11:
          b.add(11);
          break;
        case 12:
          b.add(4);
          break;
        case 13:
          b.add(12);
          break;
        case 14:
          b.add(13);
          break;
        case 15:
          b.add(14);
      }
    });
    return b;
  }
  function kt(a) {
    switch (a) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      case 5:
        return 5;
      case 6:
        return 6;
      case 8:
        return 8;
      case 9:
        return 9;
      case 10:
        return 10;
      case 11:
        return 11;
      case 4:
        return 12;
      case 12:
        return 13;
      case 13:
        return 14;
      case 14:
        return 15;
      default:
        return 0;
    }
  }
  function lt(a) {
    a = a.match(df);
    const b = a[6];
    return (a[5] || "") + (b ? "?" + b : "") || "/";
  }
  function mt(a, b) {
    b
      ? (a.j = new RegExp("\\b(" + b.join("|").toLowerCase() + ")\\b", "ig"))
      : (a.j = null);
  }
  function nt(a, b, c, d, e) {
    if (!c) return a.g?.F({ D: 83 }), !1;
    switch (b.target) {
      case "_top":
      case "_parent":
        break;
      case "":
      case "_self":
        if (e) return a.g?.F({ D: 84 }), !1;
        break;
      default:
        return a.g?.F({ D: 85 }), !1;
    }
    return d
      ? !a.B && ot(a, d) && lt(c) === a.C
        ? (a.g?.F({ D: 70 }), !1)
        : !0
      : (a.g?.F({ D: 86 }), !1);
  }
  function ot(a, b) {
    return b.replace(pt, "") === a.hostname.replace(pt, "");
  }
  function qt(a, b, c) {
    if (
      Ga(
        ["data-google-vignette", "data-google-interstitial"],
        (f) => b.getAttribute(f) === "false" || !1
      )
    )
      return a.g?.F({ D: 82 }), !1;
    const d = b.href,
      e = d && (d.match(df)[3] || null);
    if (!nt(a, b, d, e, c)) return !1;
    a.l = !!e && ot(a, e);
    c =
      !c &&
      !wm(b) &&
      /^https?:\/\//i.test(d) &&
      !/((facebook|whatsapp|youtube|google)\.com)|\/ads?\//i.test(d);
    if (!a.A && a.l) return a.g?.F({ D: 123 }), !1;
    a.l || c || a.g?.F({ D: 87 });
    return a.l || c;
  }
  function rt(a, b) {
    if (!b || !a.j) return [];
    var c = [];
    dt(b, c, !0, !0);
    b = c.join("");
    b = b.replace(et, " ").replace(ft, "");
    b = b.replace(gt, "");
    b = b.replace(ht, " ");
    b !== " " && (b = b.replace(it, ""));
    if (!b) return [];
    a = b.match(a.j);
    b = [];
    for (c = 0; a && c < a.length; c++) {
      const d = a[c].toLowerCase();
      Ca(b, d) >= 0 || b.push(d);
    }
    return b;
  }
  var st = class {
      constructor(a, b, c, d = !0) {
        this.g = b;
        this.B = c;
        this.A = d;
        this.j = null;
        this.l = !1;
        this.hostname = a.match(df)[3] || "";
        this.C = lt(a);
      }
    },
    pt = /^(www\.|m\.|mobile\.)*/i;
  function tt(a) {
    a.J && a.J.dispose();
    const b = Uo(a.j, a.I.contentWindow, a.N, a.ea, a.B.Qb);
    S(a, b);
    Po(b).then(() => {
      a.ia.g?.setAttribute("data-vignette-loaded", "true");
      a.G.Lc || (a.G.Lc = Ne());
    });
    Qo(b).then(() => void ut(a));
    Ro(b).then(() => {
      a.g.F({ D: 23 });
      a.G.Ic = !0;
    });
    return b;
  }
  function vt(a) {
    a.g.F({ D: 41 });
    if (a.l.Ga) a.g.F({ D: 42 });
    else {
      a.l.Ga = a.N.ca(527, (c) => {
        if (a.B.Ya)
          if ((a.g.F({ D: 44 }), c))
            if (c.isTrusted)
              if (a.A.ta) a.g.F({ D: 50 });
              else if (a.L) a.g.F({ D: 47 });
              else if (a.l.da) a.g.F({ D: 74 });
              else {
                var d = wt(a, c);
                d
                  ? xt(a, d)
                    ? ((a.l.da = d),
                      c.stopImmediatePropagation(),
                      c.preventDefault(),
                      a.B.ge &&
                        (U(a.j).clickTriggeredInterstitialMayBeDisplayed = !0),
                      yt(a, 1),
                      a.g.F({ D: 53 }))
                    : a.g.F({ D: 49 })
                  : a.g.F({ D: 48 });
              }
            else a.g.F({ D: 73 });
          else a.g.F({ D: 45 });
        else zt(a, c);
      });
      if (a.l.Ga !== null) {
        const c = a.l.Ga;
        H(
          a.j.document,
          "click",
          (d) => {
            c(d);
          },
          xe
        );
      }
      var b = a.j.frames;
      for (let c = 0; c < b.length; c++)
        try {
          a.Ja(b[c].frameElement) || H(b[c].document, "click", a.l.Ga, xe);
        } catch (d) {}
      a.g.F({ D: 43 });
    }
  }
  function yt(a, b) {
    a.g.F({ D: 28 });
    switch (b) {
      case 1:
        a.g.F({ D: 66 });
        break;
      case 2:
        a.g.F({ D: 67 });
        break;
      case 3:
        a.g.F({ D: 68 });
        break;
      case 4:
        a.g.F({ D: 69 });
        break;
      case 5:
        a.g.F({ D: 71 });
        break;
      case 6:
        a.g.F({ D: 72 });
        break;
      case 8:
        a.g.F({ D: 89 });
        break;
      case 9:
        a.g.F({ D: 103 });
        break;
      case 10:
        a.g.F({ D: 106 });
        break;
      case 11:
        a.g.F({ D: 109 });
        break;
      case 12:
        a.g.F({ D: 112 });
        break;
      case 13:
        a.g.F({ D: 113 });
        break;
      case 14:
        a.g.F({ D: 121 });
    }
    if (!xt(a)) return a.g.F({ D: 29 }), !1;
    const c = a.B.Ya ? b === 1 && Xo("a")(a.l.da) : b === 1;
    a.O = b === 9;
    a.R = b === 10;
    let d;
    (d = a.A).Bb || (d.Bb = !(c || a.O || a.R));
    if (!a.Ka())
      return (
        a.g.F({ D: 30 }),
        c && a.l.qa
          ? (a.g.F({ D: 31 }), At(a, a.l.qa.href))
          : c &&
            a.l.da &&
            (a.g.F({ D: 75 }), a.l.da.click(), (a.l.da = void 0)),
        !1
      );
    a.A.ta = Date.now();
    U(a.j).wasReactiveAdVisible[8] = !0;
    a.R && (a.A.Ib = a.j.location.href);
    c && a.l.qa && (a.A.Ib = a.l.qa.href);
    a.B.ce &&
      No(a.J.Wb, { eventType: "triggerType", payload: { triggerType: kt(b) } });
    a.sb || u.IntersectionObserver || No(a.J.Wb, { eventType: "visible" });
    a.l.qa
      ? Bt(a, a.l.qa.href)
      : a.l.da && Xo("a")(a.l.da) && (Bt(a, a.l.da.href), a.g.F({ D: 76 }));
    Ct(a);
    H(
      a.j,
      "pagehide",
      a.N.ca(528, () => {
        Dt(a);
      })
    );
    c && a.ub?.(a.A.ta);
    bs(a.ia, !0);
    Sr(a.g, { ne: kt(b), Pa: a.Pa });
    a.K?.dispose();
    a.g.F({ D: 32 });
    return !0;
  }
  function ut(a) {
    a.g.F({ D: 33 });
    a.A.Bb
      ? (Et(a) ? (a.g.F({ D: 34 }), Ft(a)) : (a.g.F({ D: 35 }), Dt(a)),
        a.B.Ya &&
          a.l.da &&
          (a.l.da.click(),
          Xo("input")(a.l.da) && a.l.da.focus(),
          (a.l.da = void 0)),
        a.g.F({ D: 36 }))
      : (u.setTimeout(() => {
          Dt(a);
        }, 1e3),
        a.O && (a.j.history.back(), a.j.history.back()),
        a.B.Ya && a.l.da
          ? (a.A.Mb && (a.A.Gb = !1),
            a.B.pe && Et(a) && a.j.history.back(),
            a.l.da.click(),
            (a.l.da = void 0))
          : a.A.Ib
          ? (a.A.Mb && (a.A.Gb = !1), At(a, a.A.Ib))
          : a.g.F({ D: 37 }));
  }
  function Et(a) {
    return a.j.location.hash.indexOf("google_vignette") !== -1;
  }
  function Ft(a) {
    const b = a.j.location.href;
    b.includes("about:blank#google_vignette")
      ? a.g.F({ D: 79 })
      : (a.g.F({ D: 77 }),
        a.j.history.replaceState(
          a.j.history.state,
          "",
          b.replace("#google_vignette", "")
        ));
    Dt(a);
  }
  function Dt(a) {
    a.g.F({ D: 38 });
    a.A.ta || (a.g.F({ D: 39 }), (a.J = tt(a)));
    a.A.Za = !0;
    a.l.Ga && (I(a.j.document, "click", a.l.Ga), (a.l.Ga = void 0));
    a.A.gb &&
      a.A.gb.parentNode &&
      (a.A.gb.parentNode.removeChild(a.A.gb), (a.A.gb = void 0));
    a.A.fb &&
      a.A.fb.parentNode &&
      (a.A.fb.parentNode.removeChild(a.A.fb), (a.A.fb = void 0));
    bs(a.ia, !1);
    a.Da();
    a.K?.A();
    a.g.F({ D: 40 });
  }
  function At(a, b) {
    a = a.j.location;
    b = id.test(b) ? b : void 0;
    b !== void 0 && a.replace(b);
  }
  function Ct(a) {
    if (!Et(a)) {
      const b = new URL(a.j.location.href);
      b.hash = "google_vignette";
      !a.K?.C() || a.O || a.j.location.href.includes("about:blank")
        ? a.B.re && !a.j.location.href.includes("about:blank")
          ? history.pushState(a.j.history.state, "", b)
          : (a.j.location.hash = "google_vignette")
        : history.replaceState(a.j.history.state, "", b);
    }
    a.A.Mb = a.N.ca(526, () => {
      a.g.F({ D: 62 });
      if (a.A.Gb) {
        if (Et(a))
          a.g.F({ D: 64 }),
            a.B.Ya
              ? a.l.da && (a.l.da.click(), (a.l.da = void 0))
              : At(a, a.l.qa.href);
        else {
          const b = a.K?.B();
          !a.va && a.R && b && (At(a, b), (a.va = !0));
          a.A.Fc || a.g.F({ D: 80 });
          a.A.Fc = !1;
          Dt(a);
        }
        a.g.F({ D: 65 });
      } else a.g.F({ D: 63 });
    });
    u.setTimeout(ra(H, a.j, "hashchange", a.A.Mb), 0);
  }
  function xt(a, b) {
    a.g.F({ D: 10 });
    var c = Ne();
    const d = U(a.j).wasReactiveAdVisible[9];
    b = b ? rt(a.C, b) : [];
    var e;
    if (!(e = a.B.Id)) {
      var f = a.j;
      e = J(f);
      f = f.innerWidth;
      e = Math.abs((e && f ? e / f : 0) - 1) < 0.05;
    }
    f = a.requestedSize.width < a.requestedSize.height === lg(a.j);
    if (c - a.pb >= a.xc * 60 * 1e3) return a.g.F({ D: 11 }), !1;
    a: switch (a.oa.tag) {
      case 0:
        c = !0;
        break a;
      case 1:
        c = !1;
        break a;
      default:
        c = !1;
    }
    if (!c) return a.g.F({ D: 12 }), !1;
    if (a.G.Ic) return a.g.F({ D: 13 }), !1;
    if (Et(a)) return a.g.F({ D: 14 }), !1;
    if (!a.G.Lc) return a.g.F({ D: 15 }), !1;
    if (!a.pa && d) return a.g.F({ D: 16 }), !1;
    a.pa && a.g.F({ D: 17 });
    d && a.g.F({ D: 18 });
    if (b.length) return a.g.F({ D: 19 }), !1;
    if (!e) return a.g.F({ D: 20 }), !1;
    if (!f) return a.g.F({ D: 21 }), !1;
    if (U(a.j).adIntentsPageState.isDrawerVisible) return a.g.F({ D: 124 }), !1;
    if (
      a.B.ud &&
      a.j.document.getElementsByClassName("fc-monetization-dialog-container")
        .length > 0
    )
      return a.g.F({ D: 125 }), !1;
    a.g.F({ D: 22 });
    return !0;
  }
  function Gt(a, b, c) {
    a = Ed("LINK", a.j.document);
    a.setAttribute("rel", c);
    a.setAttribute("href", b);
    return a;
  }
  function Bt(a, b) {
    var c;
    if (!(c = !a.B.Pe)) {
      a: {
        try {
          if (
            !HTMLScriptElement.supports?.("speculationrules") ||
            new URL(b).origin !== a.j.origin
          ) {
            var d = !1;
            break a;
          }
          const k = a.j.document.createElement("script");
          k.type = "speculationrules";
          c = k;
          const h = JSON.stringify({ prerender: [{ urls: [b] }] }).replace(
              /</g,
              "\\u003C"
            ),
            m = fd();
          var e = m ? m.createScript(h) : h;
          var f = new ld(e);
          if (f instanceof ld) var g = f.g;
          else throw Error("");
          c.textContent = g;
          md(c);
          a.j.document.body.append(k);
          d = !0;
          break a;
        } catch (k) {
          a.N.La(1334, k);
          d = !1;
          break a;
        }
        d = void 0;
      }
      c = !d;
    }
    c &&
      ((a.A.gb = Gt(a, b, "prerender")),
      (a.A.fb = Gt(a, b, "prefetch")),
      a.j.document.body.appendChild(a.A.gb),
      a.j.document.body.appendChild(a.A.fb));
  }
  function wt(a, b) {
    for (b = b.target; b; ) {
      if ("nodeName" in b && b.nodeName === "A") {
        if (qt(a.C, b, b.ownerDocument !== a.j.document)) return b;
        break;
      } else {
        if (a.B.oe && Xo("button")(b)) return b;
        if (a.B.qe && Xo("input")(b)) return b;
      }
      b = "parentElement" in b ? b.parentElement : null;
    }
    return null;
  }
  function zt(a, b) {
    a.g.F({ D: 44 });
    if (b)
      if (a.B.yd && !b.isTrusted) a.g.F({ D: 73 });
      else if (b.defaultPrevented) a.g.F({ D: 46 });
      else if (a.A.ta) a.g.F({ D: 50 });
      else if (a.A.Ib) a.g.F({ D: 51 });
      else if (a.L) a.g.F({ D: 47 });
      else if (a.l.qa) a.g.F({ D: 52 });
      else {
        var c = wt(a, b);
        c
          ? xt(a, c)
            ? ((a.l.qa = c),
              Be(b),
              (b.preventDefault = () => b && (b.preventDefaultTriggered = !0)),
              u.setTimeout(qa(a.tb, a, b), 0),
              a.B.ge && (U(a.j).clickTriggeredInterstitialMayBeDisplayed = !0),
              a.g.F({ D: 53 }))
            : a.g.F({ D: 49 })
          : a.g.F({ D: 48 });
      }
    else a.g.F({ D: 45 });
  }
  var Ht = class extends np {
    constructor(a, b, c, d, e, f, g, k, h, m) {
      super(a, b, c, e, { heavyAdInterventionResponse: k.Hd });
      this.ia = d;
      this.requestedSize = f;
      this.B = k;
      this.g = m;
      this.localStorage = null;
      this.pb = Ne();
      this.pa = g["i-fvs"] === "true";
      this.Pa = g.qid;
      this.C = new st(
        a.location.href,
        this.g,
        this.B.Ya,
        h.has(1) || h.has(13)
      );
      this.xc = k.xc || 1440;
      this.sb = g.iobs === "true" && "IntersectionObserver" in this.j;
      mt(this.C, g.stop_word?.split(";") ?? null);
      this.G = { Ic: !1 };
      this.l = {};
      this.oa = { tag: 0 };
      this.A = { cf: !0, Za: !1, Bb: !1, Gb: !0, Fc: !1 };
      this.va = this.R = this.O = !1;
      this.J = tt(this);
      vt(this);
      if (h.size) {
        b = new Oo();
        b.promise.then((l) => {
          this.A.ta || this.L || yt(this, l);
        });
        this.K = new at(
          a,
          h,
          b,
          (l) => (this.A.ta || this.L ? !1 : yt(this, l)),
          k,
          this.g,
          this.localStorage
        );
        S(this, this.K);
        for (const l of h)
          switch (l) {
            case 1:
              this.g.F({ D: 91 });
              break;
            case 2:
              this.g.F({ D: 92 });
              break;
            case 3:
              this.g.F({ D: 93 });
              break;
            case 4:
              this.g.F({ D: 94 });
              break;
            case 5:
              this.g.F({ D: 95 });
              break;
            case 6:
              this.g.F({ D: 96 });
              break;
            case 8:
              this.g.F({ D: 98 });
              break;
            case 9:
              this.g.F({ D: 104 });
              break;
            case 10:
              this.g.F({ D: 105 });
              break;
            case 11:
              this.g.F({ D: 108 });
              break;
            case 12:
              this.g.F({ D: 110 });
              break;
            case 13:
              this.g.F({ D: 111 });
              break;
            case 14:
              this.g.F({ D: 122 });
          }
      }
      if (k.Cc?.length && (h = Oe(a))) {
        const l = new Js(a, h, e, this.Pa, k.Cc, k.sa);
        S(this, l);
        this.ub = (n) => {
          l.g(2, n - Qe(a));
        };
      }
    }
    U(a, b) {
      a["i-blur"] = () => {
        this.g.F({ D: 27 });
        this.A.Bb = !0;
        this.A.Mb && (this.A.Gb = !0);
      };
      a["i-no"] = (c) => {
        this.g.F({ D: 26 });
        this.oa = { tag: 1, df: c.i_tslv ? c.i_tslv : void 0 };
      };
      if (b.heavyAdInterventionResponse) {
        const c = gb(b.heavyAdInterventionResponse);
        if (c) {
          const { ie: d, he: e } = is();
          a["i-hai-aux"] = d;
          e.then((f) => {
            S(this, f);
            f.promise.then(() => c());
          });
        }
      }
    }
    jb() {
      this.g.F({ D: 24 });
      super.jb();
      Et(this) &&
        (this.B.Ya
          ? this.l.da && (this.l.da.click(), (this.l.da = void 0))
          : this.l.qa && At(this, this.l.qa.href),
        Dt(this));
      this.l.Ga &&
        (I(this.j.document, "click", this.l.Ga), (this.l.Ga = void 0));
      this.g.F({ D: 25 });
    }
    Da() {}
    Ja() {
      return !1;
    }
    tb(a) {
      this.g.F({ D: 54 });
      this.A.ta
        ? this.g.F({ D: 56 })
        : this.L
        ? this.g.F({ D: 57 })
        : this.l.qa
        ? a.preventDefaultTriggered
          ? (this.g.F({ D: 59 }), (this.l.qa = void 0))
          : qt(this.C, this.l.qa, this.l.qa.ownerDocument !== this.j.document)
          ? xt(this)
            ? (yt(this, 1), this.g.F({ D: 61 }))
            : (this.g.F({ D: 60 }), At(this, this.l.qa.href))
          : (this.g.F({ D: 55 }), At(this, this.l.qa.href))
        : this.g.F({ D: 58 });
    }
    Ka() {
      return !0;
    }
  };
  function It(a, b) {
    b = b || a.j.document;
    if (!b.getElementById("vignette-style-id")) {
      var c = ge(b ? new fe(de(b)) : sa || (sa = new fe()), "STYLE");
      c.id = "vignette-style-id";
      c.textContent =
        "a.google_vignette_inst {border:1px solid #000;color:#6c12b9}";
      b.head.appendChild(c);
      a.M.push(c);
    }
  }
  function Jt(a, b, c) {
    let d = 0;
    for (let e = b.links.length; e >= 0; e--) {
      const f = b.links[e];
      f &&
        (f.classList.remove("google_vignette_inst"),
        qt(a.C, f, c) &&
          !rt(a.C, f).length &&
          (d++, f.classList.add("google_vignette_inst")));
    }
    return d;
  }
  var Kt = class extends Ht {
    constructor(a, b, c, d, e, f, g, k, h, m, l, n) {
      const p = [];
      P(Qj) && wd() === 0 && p.push(101);
      P(Tj) && p.push(102);
      P(Sj) && p.push(103);
      P(Pj) && p.push(104);
      P(Rj) && p.push(105);
      super(
        a,
        c,
        f,
        new hs(a, c, g),
        sl,
        e,
        m,
        {
          Cc: p,
          Qb: { ke: 1, version: Cf() },
          Id: !0,
          Hd: null,
          Ya: P(wj) || n.has(14),
          yd: P(rj),
          pe: P(xj),
          oe: P(vj),
          qe: P(yj),
          re: P(zj),
          Dd: wd() !== 0 ? Zj(Ij) : Zj(Hj),
          Bd: Zj(Jj),
          Cd: P(Kj),
          zd: Zj(Lj),
          Yb: Zj(Mj),
          ce: !0,
          ud: P(Uj),
          Db: P(Vj),
        },
        n,
        l
      );
      this.nb = b;
      this.Ra = d;
      this.Sa = k;
      this.rb = h;
      this.M = [];
      this.V = 0;
      l.F({ D: 88 });
      if ((this.wa = Uk(this.j.location, "google_ia_debug")))
        this.na(), (this.V = u.setInterval(qa(this.na, this), 5e3));
    }
    Da() {
      if (this.wa) {
        for (let b = 0; b < this.M.length; ++b) {
          var a = this.M[b];
          be(a.ownerNode || a.owningElement || a);
        }
        this.M = [];
        this.V && u.clearInterval(this.V);
      }
    }
    na() {
      let a = Jt(this, this.j.document, !1);
      It(this);
      var b = this.j.frames;
      for (let c = 0; c < b.length; c++)
        try {
          (a += Jt(this, b[c].document, !0)), It(this, b[c].document);
        } catch (d) {}
      b = ap(this.j, 1);
      b != null && b.setLinksInstrumented(a);
    }
    Ka() {
      const a = Rn(this.Sa, this.nb),
        b = !!a && yq(a);
      return this.Ra || !b || yr(a, this.rb);
    }
    Ja(a) {
      return /aswift_[0-9]+/.test(a.id);
    }
  };
  function Lt(a) {
    const b = a.j.document.createElement("span"),
      c = Math.round((Mt(a) - 50) / 2);
    E(b, {
      background: "#FAFAFA",
      position: "absolute",
      left: V(c),
      right: V(c),
      top: V(Nt(a) + 5),
      "box-shadow":
        "rgba(0, 0, 0, 0.5) 0px 1px 5px -1px, rgba(0, 0, 0, 0.1) 0px -1px 2px -1px",
    });
    b.className = `${a.l}-side-rail-dismiss-btn`;
    b.appendChild(Ot(a));
    const d = () => {
      a.G();
    };
    H(b, "click", d);
    T(a, () => I(b, "click", d));
    return b;
  }
  function Nt(a) {
    return Number(ue(a.g).height || a.g.height);
  }
  function Mt(a) {
    return Number(ue(a.g).width || a.g.width);
  }
  function Ot(a) {
    var b = a.j.document;
    const c = b.createElementNS("http://www.w3.org/2000/svg", "svg");
    E(c, {
      position: "absolute",
      top: "0px",
      display: "block",
      width: V(50),
      height: V(30),
      "margin-top": "-5px",
      transform: "none",
      "pointer-events": "initial",
    });
    var d = b.createElementNS("http://www.w3.org/2000/svg", "defs"),
      e = b.createElementNS("http://www.w3.org/2000/svg", "filter");
    a = `${a.l}-side-rail-drop-shadow`;
    e.setAttribute("id", a);
    e.setAttribute("filterUnits", "userSpaceOnUse");
    e.setAttribute("color-interpolation-filters", "sRGB");
    var f = b.createElementNS(
      "http://www.w3.org/2000/svg",
      "feComponentTransfer"
    );
    f.setAttribute("in", "SourceAlpha");
    f.setAttribute("result", "TransferredAlpha");
    var g = b.createElementNS("http://www.w3.org/2000/svg", "feFuncR");
    g.setAttribute("type", "discrete");
    g.setAttribute("tableValues", "0.5");
    f.appendChild(g);
    g = b.createElementNS("http://www.w3.org/2000/svg", "feFuncG");
    g.setAttribute("type", "discrete");
    g.setAttribute("tableValues", "0.5");
    f.appendChild(g);
    g = b.createElementNS("http://www.w3.org/2000/svg", "feFuncB");
    g.setAttribute("type", "discrete");
    g.setAttribute("tableValues", "0.5");
    f.appendChild(g);
    e.appendChild(f);
    f = b.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
    f.setAttribute("in", "TransferredAlpha");
    f.setAttribute("stdDeviation", "2");
    e.appendChild(f);
    f = b.createElementNS("http://www.w3.org/2000/svg", "feOffset");
    f.setAttribute("dx", "0");
    f.setAttribute("dy", "0");
    f.setAttribute("result", "offsetblur");
    e.appendChild(f);
    f = b.createElementNS("http://www.w3.org/2000/svg", "feMerge");
    f.appendChild(
      b.createElementNS("http://www.w3.org/2000/svg", "feMergeNode")
    );
    g = b.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
    g.setAttribute("in", "SourceGraphic");
    f.appendChild(g);
    e.appendChild(f);
    d.appendChild(e);
    c.appendChild(d);
    d = b.createElementNS("http://www.w3.org/2000/svg", "path");
    d.setAttribute(
      "d",
      "M5,5 L5,17 A8,8 0 0,0 13,25 L37,25 A8,8 0 0,0 45,17 L45,5 Z"
    );
    d.setAttribute("stroke", "#FAFAFA");
    d.setAttribute("stroke-width", "1");
    d.setAttribute("fill", "#FAFAFA");
    d.style.setProperty("filter", `url(#${a})`);
    c.appendChild(d);
    d = b.createElementNS("http://www.w3.org/2000/svg", "rect");
    d.setAttribute("x", "0");
    d.setAttribute("y", "0");
    d.setAttribute("width", "50");
    d.setAttribute("height", "5");
    d.style.setProperty("fill", "#FAFAFA");
    c.appendChild(d);
    d = b.createElementNS("http://www.w3.org/2000/svg", "g");
    d.setAttribute("stroke", "#616161");
    d.setAttribute("stroke-width", "2px");
    d.setAttribute("stroke-linecap", "square");
    e = b.createElementNS("http://www.w3.org/2000/svg", "line");
    e.setAttribute("x1", "18");
    e.setAttribute("y1", "18");
    e.setAttribute("x2", "25");
    e.setAttribute("y2", "12");
    d.appendChild(e);
    b = b.createElementNS("http://www.w3.org/2000/svg", "line");
    b.setAttribute("x1", "25");
    b.setAttribute("y1", "12");
    b.setAttribute("x2", "32");
    b.setAttribute("y2", "18");
    d.appendChild(b);
    c.appendChild(d);
    return c;
  }
  var Pt = class extends Q {
    constructor(a, b, c, d, e) {
      super();
      this.g = a;
      this.j = b;
      this.A = c;
      this.l = d;
      this.G = e;
      a = this.j.document.createElement("span");
      a.className = `${this.l}-side-rail-edge`;
      E(a, {
        background: "#FAFAFA",
        position: "absolute",
        left: "0px",
        top: V(Nt(this)),
        width: V(Mt(this)),
        height: V(5),
        "box-shadow":
          "rgba(0, 0, 0, 0.5) 0px 1px 5px -1px, rgba(0, 0, 0, 0.1) 0px -1px 2px -1px",
      });
      this.B = a;
      this.C = Lt(this);
      this.A.appendChild(this.B);
      this.A.appendChild(this.C);
    }
  };
  const Qt = ["body", "html"];
  function Rt(a, b) {
    return (
      ee(a, (c) => c.nodeType === Node.ELEMENT_NODE && b.has(c), !0) !== null
    );
  }
  function St(a) {
    return (
      ee(
        a,
        (b) =>
          b.nodeType === Node.ELEMENT_NODE &&
          b.hasAttribute("google-side-rail-overlap"),
        !0
      )?.getAttribute("google-side-rail-overlap") || null
    );
  }
  function Tt(a, b) {
    return ee(
      a,
      (c) =>
        c.nodeType === Node.ELEMENT_NODE &&
        b.getComputedStyle(c, null).position === "fixed",
      !0
    );
  }
  function Ut(a) {
    const b = [];
    for (const c of a.document.querySelectorAll("*")) {
      const d = a.getComputedStyle(c, null);
      d.position === "fixed" &&
        d.display !== "none" &&
        d.visibility !== "hidden" &&
        b.push(c);
    }
    return b;
  }
  function Vt(a, b) {
    const { top: c, left: d, bottom: e, right: f } = b.getBoundingClientRect();
    return c >= 0 && d >= 0 && e <= a.innerHeight && f <= a.innerWidth;
  }
  function Wt(a, b, c = !1) {
    var d = St(a);
    if (d === "true") return !0;
    if (d === "false" || (c && !b.flags.Td && !b.flags.Vc)) return !1;
    if (b.flags.Ud && Qt.includes(a.tagName.toLowerCase())) return !0;
    if (b.flags.Vc) {
      const { width: e, height: f, top: g } = a.getBoundingClientRect();
      a = f >= b.T * 0.25;
      d = e >= b.X * 0.9;
      return c
        ? d && a
        : d
        ? a
          ? !0
          : g + (b.W.scrollY || b.W.pageYOffset) > b.T * 0.15
        : !1;
    }
    c = a.offsetHeight >= b.T * 0.25;
    return a.offsetWidth >= b.X * 0.9 && c;
  }
  function Xt(a) {
    return Math.round(Math.round(a / 10) * 10);
  }
  function Yt(a) {
    return `${a.position}-${Xt(a.X)}x${Xt(a.T)}-${Xt(a.scrollY + a.eb)}Y`;
  }
  function Zt(a) {
    return `f-${Yt({
      position: a.position,
      eb: a.eb,
      scrollY: 0,
      X: a.X,
      T: a.T,
    })}`;
  }
  function $t(a, b) {
    a = Math.min(a ?? Infinity, b ?? Infinity);
    return a !== Infinity ? a : 0;
  }
  function au(a, b, c) {
    const d = U(c.W).sideRailProcessedFixedElements;
    if (!d.has(a)) {
      var e = a.getBoundingClientRect();
      if (e) {
        var f = Math.max(e.top - 10, 0),
          g = Math.min(e.bottom + 10, c.T),
          k = Math.max(e.left - 10, 0);
        e = Math.min(e.right + 10, c.X);
        for (var h = c.X * 0.3; f <= g; f += 10) {
          if (e > 0 && k < h) {
            var m = Zt({ position: "left", eb: f, X: c.X, T: c.T });
            b.set(m, $t(b.get(m), k));
          }
          if (k < c.X && e > c.X - h) {
            m = Zt({ position: "right", eb: f, X: c.X, T: c.T });
            const l = c.X - e;
            b.set(m, $t(b.get(m), l));
          }
        }
        d.add(a);
      }
    }
  }
  function bu(a, b) {
    const c = b.W,
      d = b.flags;
    var e = `f-${Xt(b.X)}x${Xt(b.T)}`;
    a.has(e) ||
      (a.set(e, 0),
      (e = Ut(c)),
      d.Gc || d.kc
        ? (cu(
            a,
            b,
            e.filter((f) => Vt(c, f))
          ),
          du(
            c,
            e
              .filter((f) => !Vt(c, f))
              .concat(
                d.kc
                  ? Array.from(
                      c.document.querySelectorAll(
                        "[google-side-rail-overlap=false]"
                      )
                    )
                  : []
              )
          ))
        : cu(a, b, e));
  }
  function cu(a, b, c) {
    var d = b.bb;
    const e = b.W;
    U(e).sideRailProcessedFixedElements.clear();
    d = new Set([
      ...Array.from(
        e.document.querySelectorAll(
          "[data-anchor-status],[data-side-rail-status]"
        )
      ),
      ...d,
    ]);
    for (const f of c) Rt(f, d) || Wt(f, b, !0) || au(f, a, b);
  }
  function eu(a) {
    if (a.X < 1200 || a.T < 650) return null;
    var b = U(a.W).sideRailAvailableSpace;
    bu(b, { W: a.W, X: a.X, T: a.T, bb: a.bb, flags: a.flags });
    const c = [];
    var d = a.T * 0.9,
      e = pg(a.W),
      f = (a.T - d) / 2,
      g = f,
      k = d / 7;
    for (var h = 0; h < 8; h++) {
      var m = c,
        l = m.push;
      a: {
        var n = g;
        var p = a.position,
          t = b,
          q = { W: a.W, X: a.X, T: a.T, bb: a.bb, flags: a.flags };
        const F = Zt({ position: p, eb: n, X: q.X, T: q.T }),
          Z = Yt({ position: p, eb: n, scrollY: e, X: q.X, T: q.T });
        if (t.has(Z)) {
          n = $t(t.get(F), t.get(Z));
          break a;
        }
        const M = p === "left" ? 20 : q.X - 20;
        let v = M;
        p = ((q.X * 0.3) / 5) * (p === "left" ? 1 : -1);
        let w = 0,
          R = !1;
        for (let N = 0; N < 6; N++) {
          var z = Ap(q.W.document, { x: Math.round(v), y: Math.round(n) });
          const X = Tt(z, q.W),
            K = Rt(z, q.bb);
          z = Wt(z, q) || K;
          if (X === null || K)
            if (z) w = Math.round(Math.abs(v - M) + 20);
            else if (v !== M) (v -= p), (p /= 2);
            else {
              w = 0;
              break;
            }
          else {
            t.delete(Z);
            R = !0;
            if (!X || !Wt(X, q, !0)) {
              au(X, t, q);
              w = t.get(F) ?? 0;
              break;
            }
            w = Math.round(Math.abs(v - M) + 20);
          }
          v += p;
        }
        R || t.set(Z, w);
        n = w;
      }
      l.call(m, n);
      g += k;
    }
    b = a.ee;
    e = a.position;
    d = Math.round(d / 8);
    f = Math.round(f);
    g = a.minWidth;
    a = a.minHeight;
    l = [];
    k = Array(c.length).fill(0);
    for (m = 0; m < c.length; m++) {
      for (; l.length !== 0 && c[l[l.length - 1]] >= c[m]; ) l.pop();
      k[m] = l.length === 0 ? 0 : l[l.length - 1] + 1;
      l.push(m);
    }
    l = [];
    h = c.length - 1;
    m = Array(c.length).fill(0);
    for (n = h; n >= 0; n--) {
      for (; l.length !== 0 && c[l[l.length - 1]] >= c[n]; ) l.pop();
      m[n] = l.length === 0 ? h : l[l.length - 1] - 1;
      l.push(n);
    }
    l = null;
    for (h = 0; h < c.length; h++)
      if (
        ((n = {
          position: e,
          width: Math.round(c[h]),
          height: Math.round((m[h] - k[h] + 1) * d),
          offsetY: f + k[h] * d,
        }),
        (t = n.width >= g && n.height >= a),
        b === 0 && t)
      ) {
        l = n;
        break;
      } else
        b === 1 &&
          t &&
          (!l || n.width * n.height > l.width * l.height) &&
          (l = n);
    return l;
  }
  function du(a, b) {
    const c = U(a);
    if (b.length && !c.g) {
      var d = new MutationObserver(() => {
        setTimeout(() => {
          fu(a);
          for (const e of c.sideRailMutationCallbacks) e();
        }, 500);
      });
      for (const e of b) d.observe(e, { attributes: !0 });
      c.g = d;
    }
  }
  function gu(a, b) {
    U(a).sideRailMutationCallbacks.push(b);
  }
  function fu(a) {
    ({ sideRailAvailableSpace: a } = U(a));
    const b = Array.from(a.keys()).filter((c) => c.startsWith("f-"));
    for (const c of b) a.delete(c);
  }
  function hu(a) {
    if (a.N) return a.N.Ba(1228, () => eu(a)) || null;
    try {
      return eu(a);
    } catch {}
    return null;
  }
  function Xr(a, b) {
    a.state !== "dismissed" &&
      ((a.state = b), a.g.setAttribute("data-side-rail-status", a.state));
  }
  function iu(a, b) {
    if (a.state === "dismissed") var c = !1;
    else {
      c = a.g;
      var d = hu({
        W: a.j,
        ee: 0,
        position: a.position,
        X: a.j.innerWidth,
        T: a.j.innerHeight,
        bb: new Set([c]),
        minWidth: a.B.width + 15,
        minHeight: a.B.height + 5 + 30,
        N: a.N,
        flags: a.flags,
      });
      if (d) {
        var e = Math.round(d.width - a.B.width - 15);
        a.A = Math.min(a.A ?? e, e);
        a.offsetY = Math.round(d.offsetY);
        E(c, {
          margin: V(0),
          padding: V(0),
          position: "fixed",
          [a.position]: V(a.A),
          top: V(a.offsetY),
          transition: "all 500ms ease-in",
          overflow: "visible",
        });
        a.G || E(c, { "z-index": "2147483647" });
        c = !0;
      } else c = !1;
    }
    c ? ju(a, b) : Wr(a, b);
  }
  function Wr(a, b = 0) {
    a.state === "displayed" &&
      (E(a.g, {
        transition: "all 500ms ease-in",
        opacity: "0",
        top: V(a.offsetY + b),
      }),
      clearTimeout(a.C),
      (a.C = setTimeout(() => {
        Xr(a, "idle");
        E(a.g, { display: "none" });
      }, 500)));
  }
  function ju(a, b = 0) {
    a.state === "idle" &&
      (E(a.g, {
        transition: "",
        display: "block",
        opacity: "0",
        top: V(a.offsetY - b),
      }),
      clearTimeout(a.C),
      (a.C = setTimeout(() => {
        Xr(a, "displayed");
        E(a.g, {
          transition: "all 500ms ease-in",
          opacity: "1",
          top: V(a.offsetY),
        });
      }, 10)));
  }
  var ku = class extends Dq {
    constructor(a, b, c, d, e, f, g) {
      var k = { Gc: !0, kc: !0, Ud: P(tj), Td: P(sj), Vc: P(uj) };
      super(a, b, c);
      this.B = e;
      this.N = f;
      this.G = g;
      this.flags = k;
      this.state = "idle";
      this.offsetY = this.C = 0;
      this.A = null;
      this.I = 0;
      this.position = d === 3 ? "left" : "right";
      this.J = new Pt(a, b, c, this.position, () => {
        Wr(this, -30);
        Xr(this, "dismissed");
      });
      S(this, this.J);
      Xr(this, "idle");
      E(c, { display: "none" });
      const h = f.ca(273, () => {
        iu(this);
      });
      H(a, "load", h);
      T(this, () => I(a, "load", h));
      const m = f.ca(267, () => {
        this.A = null;
        iu(this);
      });
      H(b, "resize", m);
      T(this, () => I(b, "resize", m));
      const l = f.ca(
        268,
        $c(() => {
          const n = pg(this.j);
          iu(this, (this.B.height / 3) * Math.sign(this.I - n));
          this.I = n;
        })
      );
      H(b, "scroll", l, ye);
      T(this, () => I(b, "scroll", l));
      this.G &&
        $p(this.G, (n) => {
          E(c, { "z-index": String(n || 2147483647) });
        });
      if (this.flags.Gc || this.flags.kc)
        gu(b, () => void iu(this)),
          T(this, () => {
            const n = U(b);
            n.g?.disconnect();
            n.g = null;
            n.sideRailMutationCallbacks.length = 0;
          });
    }
  };
  var lu = class {
    constructor(a) {
      this.g = a;
    }
    verifyAndProcessConfig(a, b) {
      if (this.g !== 3 && this.g !== 4) return !1;
      const c = new cp();
      if (!bp(c, b)) return !1;
      b = a.document.createElement("ins");
      b.className = "adsbygoogle";
      a.document.body.appendChild(b);
      const d = c.C || {};
      d.google_ad_client = c.A;
      d.google_ad_width = c.l;
      d.google_ad_height = c.j;
      d.google_reactive_ad_format = this.g;
      ep(b, d, a);
      return !0;
    }
  };
  var mu = class extends cp {
    constructor() {
      super(...arguments);
      this.K = 86400;
      this.L = new Set();
    }
    G(a) {
      a.capIntervalMinutes && (this.K = a.capIntervalMinutes * 60);
      a = a.triggers;
      Array.isArray(a) && ((a = new Set(a.map((b) => b))), (this.L = jt(a)));
      return !0;
    }
  };
  var nu = class {
    verifyAndProcessConfig(a, b) {
      var c = U(a);
      if (c.wasReactiveAdConfigReceived[8]) return !1;
      var d = new mu();
      if (!bp(d, b)) return !1;
      c.wasReactiveAdConfigReceived[8] = !0;
      b = Ed("INS");
      b.className = "adsbygoogle";
      E(b, { display: "none" });
      a.document.documentElement.appendChild(b);
      c = d.C || {};
      c.google_ad_client = d.A;
      c.google_ad_width = d.l;
      c.google_ad_height = d.j;
      c.google_reactive_ad_format = 8;
      c.vfcs = d.K;
      d.g && (c.google_reactive_fill_message = d.g);
      d.B && (c.google_adtest = "on");
      d = d.L;
      P(Fj) && d.add(6);
      P(Gj) && d.add(5);
      P(Ej) && d.add(9);
      d = Array.from(d);
      ep(b, c, a, { bPXfr: { hvlaW: d } });
      return !0;
    }
  };
  var ou = class {
    configProcessorForAdFormat(a) {
      switch (a) {
        case 1:
        case 2:
          return new hp(a);
        case 3:
        case 4:
          return new lu(a);
        case 8:
          return Vf(nu);
        case 9:
          return Vf(Qr);
        default:
          return null;
      }
    }
    createAdSlot(a, b, c, d, e, f, g) {
      a: {
        e = Sn(e);
        var k = b.google_reactive_ad_format;
        switch (k) {
          case 1:
          case 2:
            var h = k;
            g = b.google_reactive_block_location_fallback === !0;
            k = a && Uk(a.location, "google_anchor_debug");
            if (h === 2 || k)
              (h = zp({
                Xc: 0,
                Ac: a.innerWidth,
                Pc: 3,
                Yc: 0,
                Bc: Math.min(Math.round((a.innerWidth / 320) * 50), Gp) + 15,
                Qc: 3,
              })),
                (g = Ep(a, h) && !g ? "bottom" : "top");
            else {
              h = a.innerWidth;
              k = a.innerHeight;
              var m = Math.min(Math.round((a.innerWidth / 320) * 50), Gp) + 15;
              const l = zp({ Xc: 0, Ac: h, Pc: 3, Yc: k - m, Bc: k, Qc: 3 });
              m > 25 && l.push({ x: h - 25, y: k - 25 });
              g = Ep(a, l) && !g ? "top" : "bottom";
            }
            h = b.google_reactive_anchor_plus_max_height;
            k = b.google_reactive_anchor_plus_animation_speed_px_per_millis;
            h !== void 0 && (c.style.height = "");
            m = new Rr({
              Cb: window.location.href,
              yb: 9,
              Yd: Bd(a),
              zb: Cf(),
            });
            m.hc({ D: 8 });
            c = new br(
              c,
              a,
              f,
              g,
              d,
              e,
              h ? { maxHeight: h, ab: k } : void 0,
              m
            );
            new yp(a, c, b.google_reactive_fill_message, b.gdvucrm);
            break a;
          case 3:
          case 4:
            new Yr(
              a,
              new ku(
                c,
                a,
                d,
                k,
                new Xd(b.google_ad_width, b.google_ad_height),
                ul,
                new aq(a)
              )
            );
            break a;
          case 8:
            h = new Set();
            g.OSwJs === 1 && (g = g.mqAVR?.bPXfr?.hvlaW) && (h = new Set(g));
            new Kt(
              a,
              f,
              c,
              b.google_adtest === "on",
              new Xd(b.google_ad_width, b.google_ad_height),
              ul,
              d,
              e,
              b.vfcs,
              b.google_reactive_fill_message,
              new Vr({
                bd: Bd(a),
                Cb: window.location.href,
                yb: 9,
                zb: Cf(),
                ob: Sf,
              }),
              h
            );
            break a;
          case 9:
            g = b.google_rasc;
            if (g === void 0 || g === null) h = null;
            else
              try {
                h = dr(g);
              } catch (l) {
                zl("rasf_fsi_ama", {}, 0.1), (h = null);
              }
            g = h || new cr();
            new Or(a, f, c, g, b.google_adtest === "on", d, e);
        }
      }
    }
  };
  function pu() {
    var a = window;
    return u.google_adtest === "on" ||
      u.google_adbreak_test === "on" ||
      a.location.host.endsWith("h5games.usercontent.goog") ||
      a.location.host === "gamesnacks.com"
      ? a.document
          .querySelector('meta[name="h5-games-eids"]')
          ?.getAttribute("content")
          ?.split(",")
          .map((b) => Math.floor(Number(b)))
          .filter((b) => !isNaN(b) && b > 0) || []
      : [];
  }
  class qu {}
  function ru() {
    var a = u.ggeac || (u.ggeac = {});
    Xf(Vf(Yf), a);
    su(a);
    Vf(qu);
    Vf(Yj).g();
  }
  function su(a) {
    const b = Vf(Yj);
    b.j = (c, d) => Wf(5, a, () => !1)(c, d, 1);
    b.l = (c, d) => Wf(6, a, () => 0)(c, d, 1);
    b.B = (c, d) => Wf(7, a, () => "")(c, d, 1);
    b.C = (c, d) => Wf(8, a, () => [])(c, d, 1);
    b.A = (c, d) => Wf(17, a, () => [])(c, d, 1);
    b.g = () => {
      Wf(15, a, () => {})(1);
    };
  }
  function tu() {
    var a = uu().jTCuI;
    ul.l((b) => {
      b.shv = String(a);
      b.mjsv = Cf();
      const c = Sf(),
        d = pu();
      b.eid = c.concat(d).join(",");
    });
  }
  function uu() {
    var a = window;
    return a.adsbygoogle &&
      "pageState" in a.adsbygoogle &&
      a.adsbygoogle.pageState
      ? a.adsbygoogle.pageState
      : {
          stavq: 0,
          jTCuI: "",
          OmOVT: !1,
          xujKL: !1,
          AyxaY: void 0,
          SLqBY: "",
          xVQAt: "",
          OSCLM: { UWEfJ: !1, YguOd: !1, SVQEK: !1 },
          jzoix: { PygXN: [] },
          FJPve: !1,
          GLnKw: !1,
          tYcft: Promise.resolve(void 0),
          EGzMj: Promise.resolve(!0),
          uNjDc: !1,
        };
  }
  function vu() {
    var a = new ou();
    {
      u.google_llp || (u.google_llp = {});
      var b = u.google_llp;
      let c = b[1];
      if (!c) {
        const { promise: d, resolve: e } = new Oo();
        c = { promise: d, resolve: e };
        b[1] = c;
      }
      b = c;
    }
    b.resolve(a);
  }
  xl(210, () => {
    const a = new Uf(Cf());
    try {
      Ra((b) => {
        kl(a, 1195, b);
      });
    } catch (b) {}
    tu();
    ru();
    vu();
  });
}.call(this, ""));
