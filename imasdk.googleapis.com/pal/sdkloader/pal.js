(function () {
  var n,
    aa =
      typeof Object.create == "function"
        ? Object.create
        : function (a) {
            function b() {}
            b.prototype = a;
            return new b();
          },
    da =
      typeof Object.defineProperties == "function"
        ? Object.defineProperty
        : function (a, b, c) {
            if (a == Array.prototype || a == Object.prototype) return a;
            a[b] = c.value;
            return a;
          };
  function ea(a) {
    a = [
      "object" == typeof globalThis && globalThis,
      a,
      "object" == typeof window && window,
      "object" == typeof self && self,
      "object" == typeof global && global,
    ];
    for (var b = 0; b < a.length; ++b) {
      var c = a[b];
      if (c && c.Math == Math) return c;
    }
    throw Error("Cannot find global object");
  }
  var fa = ea(this);
  function u(a, b) {
    if (b)
      a: {
        var c = fa;
        a = a.split(".");
        for (var d = 0; d < a.length - 1; d++) {
          var e = a[d];
          if (!(e in c)) break a;
          c = c[e];
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d &&
          b != null &&
          da(c, a, { configurable: !0, writable: !0, value: b });
      }
  }
  var ia;
  if (typeof Object.setPrototypeOf == "function") ia = Object.setPrototypeOf;
  else {
    var ja;
    a: {
      var ka = { a: !0 },
        la = {};
      try {
        la.__proto__ = ka;
        ja = la.a;
        break a;
      } catch (a) {}
      ja = !1;
    }
    ia = ja
      ? function (a, b) {
          a.__proto__ = b;
          if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
          return a;
        }
      : null;
  }
  var ma = ia;
  function w(a, b) {
    a.prototype = aa(b.prototype);
    a.prototype.constructor = a;
    if (ma) ma(a, b);
    else
      for (var c in b)
        if (c != "prototype")
          if (Object.defineProperties) {
            var d = Object.getOwnPropertyDescriptor(b, c);
            d && Object.defineProperty(a, c, d);
          } else a[c] = b[c];
    a.ka = b.prototype;
  }
  function na(a) {
    var b = 0;
    return function () {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    };
  }
  function x(a) {
    var b =
      typeof Symbol != "undefined" && Symbol.iterator && a[Symbol.iterator];
    if (b) return b.call(a);
    if (typeof a.length == "number") return { next: na(a) };
    throw Error(String(a) + " is not an iterable or ArrayLike");
  }
  function z(a) {
    if (!(a instanceof Array)) {
      a = x(a);
      for (var b, c = []; !(b = a.next()).done; ) c.push(b.value);
      a = c;
    }
    return a;
  }
  function oa(a) {
    return sa(a, a);
  }
  function sa(a, b) {
    a.raw = b;
    Object.freeze && (Object.freeze(a), Object.freeze(b));
    return a;
  }
  function ta(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }
  var ua =
    typeof Object.assign == "function"
      ? Object.assign
      : function (a, b) {
          if (a == null) throw new TypeError("No nullish arg");
          a = Object(a);
          for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d) for (var e in d) ta(d, e) && (a[e] = d[e]);
          }
          return a;
        };
  u("Object.assign", function (a) {
    return a || ua;
  });
  function va(a) {
    if (!(a instanceof Object))
      throw new TypeError("Iterator result " + a + " is not an object");
  }
  function A() {
    this.I = !1;
    this.D = null;
    this.i = void 0;
    this.j = 1;
    this.B = this.F = 0;
    this.O = this.l = null;
  }
  function wa(a) {
    if (a.I) throw new TypeError("Generator is already running");
    a.I = !0;
  }
  A.prototype.N = function (a) {
    this.i = a;
  };
  function za(a, b) {
    a.l = { Xa: b, Za: !0 };
    a.j = a.F || a.B;
  }
  A.prototype.getNextAddressJsc = function () {
    return this.j;
  };
  A.prototype.getYieldResultJsc = function () {
    return this.i;
  };
  A.prototype.return = function (a) {
    this.l = { return: a };
    this.j = this.B;
  };
  A.prototype["return"] = A.prototype.return;
  A.prototype.la = function (a) {
    this.l = { H: a };
    this.j = this.B;
  };
  A.prototype.jumpThroughFinallyBlocks = A.prototype.la;
  A.prototype.g = function (a, b) {
    this.j = b;
    return { value: a };
  };
  A.prototype.yield = A.prototype.g;
  A.prototype.Ka = function (a, b) {
    a = x(a);
    var c = a.next();
    va(c);
    if (c.done) (this.i = c.value), (this.j = b);
    else return (this.D = a), this.g(c.value, b);
  };
  A.prototype.yieldAll = A.prototype.Ka;
  A.prototype.H = function (a) {
    this.j = a;
  };
  A.prototype.jumpTo = A.prototype.H;
  A.prototype.J = function () {
    this.j = 0;
  };
  A.prototype.jumpToEnd = A.prototype.J;
  A.prototype.C = function (a, b) {
    this.F = a;
    b != void 0 && (this.B = b);
  };
  A.prototype.setCatchFinallyBlocks = A.prototype.C;
  A.prototype.Ja = function (a) {
    this.F = 0;
    this.B = a || 0;
  };
  A.prototype.setFinallyBlock = A.prototype.Ja;
  A.prototype.G = function (a, b) {
    this.j = a;
    this.F = b || 0;
  };
  A.prototype.leaveTryBlock = A.prototype.G;
  A.prototype.A = function (a) {
    this.F = a || 0;
    a = this.l.Xa;
    this.l = null;
    return a;
  };
  A.prototype.enterCatchBlock = A.prototype.A;
  A.prototype.X = function (a, b, c) {
    c ? (this.O[c] = this.l) : (this.O = [this.l]);
    this.F = a || 0;
    this.B = b || 0;
  };
  A.prototype.enterFinallyBlock = A.prototype.X;
  A.prototype.xa = function (a, b) {
    b = this.O.splice(b || 0)[0];
    (b = this.l = this.l || b)
      ? b.Za
        ? (this.j = this.F || this.B)
        : b.H != void 0 && this.B < b.H
        ? ((this.j = b.H), (this.l = null))
        : (this.j = this.B)
      : (this.j = a);
  };
  A.prototype.leaveFinallyBlock = A.prototype.xa;
  A.prototype.ha = function (a) {
    return new Ba(a);
  };
  A.prototype.forIn = A.prototype.ha;
  function Ba(a) {
    this.j = a;
    this.g = [];
    for (var b in a) this.g.push(b);
    this.g.reverse();
  }
  Ba.prototype.i = function () {
    for (; this.g.length > 0; ) {
      var a = this.g.pop();
      if (a in this.j) return a;
    }
    return null;
  };
  Ba.prototype.getNext = Ba.prototype.i;
  function Ca(a) {
    this.g = new A();
    this.i = a;
  }
  function Da(a, b) {
    wa(a.g);
    var c = a.g.D;
    if (c)
      return Ea(
        a,
        "return" in c
          ? c["return"]
          : function (d) {
              return { value: d, done: !0 };
            },
        b,
        a.g.return
      );
    a.g.return(b);
    return Fa(a);
  }
  function Ea(a, b, c, d) {
    try {
      var e = b.call(a.g.D, c);
      va(e);
      if (!e.done) return (a.g.I = !1), e;
      var f = e.value;
    } catch (g) {
      return (a.g.D = null), za(a.g, g), Fa(a);
    }
    a.g.D = null;
    d.call(a.g, f);
    return Fa(a);
  }
  function Fa(a) {
    for (; a.g.j; )
      try {
        var b = a.i(a.g);
        if (b) return (a.g.I = !1), { value: b.value, done: !1 };
      } catch (c) {
        (a.g.i = void 0), za(a.g, c);
      }
    a.g.I = !1;
    if (a.g.l) {
      b = a.g.l;
      a.g.l = null;
      if (b.Za) throw b.Xa;
      return { value: b.return, done: !0 };
    }
    return { value: void 0, done: !0 };
  }
  function Ga(a) {
    this.next = function (b) {
      wa(a.g);
      a.g.D ? (b = Ea(a, a.g.D.next, b, a.g.N)) : (a.g.N(b), (b = Fa(a)));
      return b;
    };
    this.throw = function (b) {
      wa(a.g);
      a.g.D ? (b = Ea(a, a.g.D["throw"], b, a.g.N)) : (za(a.g, b), (b = Fa(a)));
      return b;
    };
    this.return = function (b) {
      return Da(a, b);
    };
    this[Symbol.iterator] = function () {
      return this;
    };
  }
  function Ha(a) {
    function b(d) {
      return a.next(d);
    }
    function c(d) {
      return a.throw(d);
    }
    return new Promise(function (d, e) {
      function f(g) {
        g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e);
      }
      f(a.next());
    });
  }
  function B(a) {
    return Ha(new Ga(new Ca(a)));
  }
  function Ja() {
    for (var a = Number(this), b = [], c = a; c < arguments.length; c++)
      b[c - a] = arguments[c];
    return b;
  }
  u("globalThis", function (a) {
    return a || fa;
  });
  u("Reflect.setPrototypeOf", function (a) {
    return a
      ? a
      : ma
      ? function (b, c) {
          try {
            return ma(b, c), !0;
          } catch (d) {
            return !1;
          }
        }
      : null;
  });
  u("Symbol", function (a) {
    function b(f) {
      if (this instanceof b) throw new TypeError("Symbol is not a constructor");
      return new c(d + (f || "") + "_" + e++, f);
    }
    function c(f, g) {
      this.g = f;
      da(this, "description", { configurable: !0, writable: !0, value: g });
    }
    if (a) return a;
    c.prototype.toString = function () {
      return this.g;
    };
    var d = "jscomp_symbol_" + ((Math.random() * 1e9) >>> 0) + "_",
      e = 0;
    return b;
  });
  u("Symbol.iterator", function (a) {
    if (a) return a;
    a = Symbol("Symbol.iterator");
    da(Array.prototype, a, {
      configurable: !0,
      writable: !0,
      value: function () {
        return Ka(na(this));
      },
    });
    return a;
  });
  function Ka(a) {
    a = { next: a };
    a[Symbol.iterator] = function () {
      return this;
    };
    return a;
  }
  u("Promise", function (a) {
    function b(g) {
      this.g = 0;
      this.j = void 0;
      this.i = [];
      this.C = !1;
      var h = this.l();
      try {
        g(h.resolve, h.reject);
      } catch (k) {
        h.reject(k);
      }
    }
    function c() {
      this.g = null;
    }
    function d(g) {
      return g instanceof b
        ? g
        : new b(function (h) {
            h(g);
          });
    }
    if (a) return a;
    c.prototype.i = function (g) {
      if (this.g == null) {
        this.g = [];
        var h = this;
        this.j(function () {
          h.A();
        });
      }
      this.g.push(g);
    };
    var e = fa.setTimeout;
    c.prototype.j = function (g) {
      e(g, 0);
    };
    c.prototype.A = function () {
      for (; this.g && this.g.length; ) {
        var g = this.g;
        this.g = [];
        for (var h = 0; h < g.length; ++h) {
          var k = g[h];
          g[h] = null;
          try {
            k();
          } catch (l) {
            this.l(l);
          }
        }
      }
      this.g = null;
    };
    c.prototype.l = function (g) {
      this.j(function () {
        throw g;
      });
    };
    b.prototype.l = function () {
      function g(l) {
        return function (m) {
          k || ((k = !0), l.call(h, m));
        };
      }
      var h = this,
        k = !1;
      return { resolve: g(this.J), reject: g(this.A) };
    };
    b.prototype.J = function (g) {
      if (g === this)
        this.A(new TypeError("A Promise cannot resolve to itself"));
      else if (g instanceof b) this.O(g);
      else {
        a: switch (typeof g) {
          case "object":
            var h = g != null;
            break a;
          case "function":
            h = !0;
            break a;
          default:
            h = !1;
        }
        h ? this.I(g) : this.B(g);
      }
    };
    b.prototype.I = function (g) {
      var h = void 0;
      try {
        h = g.then;
      } catch (k) {
        this.A(k);
        return;
      }
      typeof h == "function" ? this.X(h, g) : this.B(g);
    };
    b.prototype.A = function (g) {
      this.D(2, g);
    };
    b.prototype.B = function (g) {
      this.D(1, g);
    };
    b.prototype.D = function (g, h) {
      if (this.g != 0)
        throw Error(
          "Cannot settle(" +
            g +
            ", " +
            h +
            "): Promise already settled in state" +
            this.g
        );
      this.g = g;
      this.j = h;
      this.g === 2 && this.N();
      this.F();
    };
    b.prototype.N = function () {
      var g = this;
      e(function () {
        if (g.G()) {
          var h = fa.console;
          typeof h !== "undefined" && h.error(g.j);
        }
      }, 1);
    };
    b.prototype.G = function () {
      if (this.C) return !1;
      var g = fa.CustomEvent,
        h = fa.Event,
        k = fa.dispatchEvent;
      if (typeof k === "undefined") return !0;
      typeof g === "function"
        ? (g = new g("unhandledrejection", { cancelable: !0 }))
        : typeof h === "function"
        ? (g = new h("unhandledrejection", { cancelable: !0 }))
        : ((g = fa.document.createEvent("CustomEvent")),
          g.initCustomEvent("unhandledrejection", !1, !0, g));
      g.promise = this;
      g.reason = this.j;
      return k(g);
    };
    b.prototype.F = function () {
      if (this.i != null) {
        for (var g = 0; g < this.i.length; ++g) f.i(this.i[g]);
        this.i = null;
      }
    };
    var f = new c();
    b.prototype.O = function (g) {
      var h = this.l();
      g.Ba(h.resolve, h.reject);
    };
    b.prototype.X = function (g, h) {
      var k = this.l();
      try {
        g.call(h, k.resolve, k.reject);
      } catch (l) {
        k.reject(l);
      }
    };
    b.prototype.then = function (g, h) {
      function k(q, t) {
        return typeof q == "function"
          ? function (r) {
              try {
                l(q(r));
              } catch (v) {
                m(v);
              }
            }
          : t;
      }
      var l,
        m,
        p = new b(function (q, t) {
          l = q;
          m = t;
        });
      this.Ba(k(g, l), k(h, m));
      return p;
    };
    b.prototype.catch = function (g) {
      return this.then(void 0, g);
    };
    b.prototype.Ba = function (g, h) {
      function k() {
        switch (l.g) {
          case 1:
            g(l.j);
            break;
          case 2:
            h(l.j);
            break;
          default:
            throw Error("Unexpected state: " + l.g);
        }
      }
      var l = this;
      this.i == null ? f.i(k) : this.i.push(k);
      this.C = !0;
    };
    b.resolve = d;
    b.reject = function (g) {
      return new b(function (h, k) {
        k(g);
      });
    };
    b.race = function (g) {
      return new b(function (h, k) {
        for (var l = x(g), m = l.next(); !m.done; m = l.next())
          d(m.value).Ba(h, k);
      });
    };
    b.all = function (g) {
      var h = x(g),
        k = h.next();
      return k.done
        ? d([])
        : new b(function (l, m) {
            function p(r) {
              return function (v) {
                q[r] = v;
                t--;
                t == 0 && l(q);
              };
            }
            var q = [],
              t = 0;
            do
              q.push(void 0),
                t++,
                d(k.value).Ba(p(q.length - 1), m),
                (k = h.next());
            while (!k.done);
          });
    };
    return b;
  });
  u("Object.setPrototypeOf", function (a) {
    return a || ma;
  });
  u("Symbol.dispose", function (a) {
    return a ? a : Symbol("Symbol.dispose");
  });
  u("Array.prototype.find", function (a) {
    return a
      ? a
      : function (b, c) {
          a: {
            var d = this;
            d instanceof String && (d = String(d));
            for (var e = d.length, f = 0; f < e; f++) {
              var g = d[f];
              if (b.call(c, g, f, d)) {
                b = g;
                break a;
              }
            }
            b = void 0;
          }
          return b;
        };
  });
  u("WeakMap", function (a) {
    function b(k) {
      this.g = (h += Math.random() + 1).toString();
      if (k) {
        k = x(k);
        for (var l; !(l = k.next()).done; ) (l = l.value), this.set(l[0], l[1]);
      }
    }
    function c() {}
    function d(k) {
      var l = typeof k;
      return (l === "object" && k !== null) || l === "function";
    }
    function e(k) {
      if (!ta(k, g)) {
        var l = new c();
        da(k, g, { value: l });
      }
    }
    function f(k) {
      var l = Object[k];
      l &&
        (Object[k] = function (m) {
          if (m instanceof c) return m;
          Object.isExtensible(m) && e(m);
          return l(m);
        });
    }
    if (
      (function () {
        if (!a || !Object.seal) return !1;
        try {
          var k = Object.seal({}),
            l = Object.seal({}),
            m = new a([
              [k, 2],
              [l, 3],
            ]);
          if (m.get(k) != 2 || m.get(l) != 3) return !1;
          m.delete(k);
          m.set(l, 4);
          return !m.has(k) && m.get(l) == 4;
        } catch (p) {
          return !1;
        }
      })()
    )
      return a;
    var g = "$jscomp_hidden_" + Math.random();
    f("freeze");
    f("preventExtensions");
    f("seal");
    var h = 0;
    b.prototype.set = function (k, l) {
      if (!d(k)) throw Error("Invalid WeakMap key");
      e(k);
      if (!ta(k, g)) throw Error("WeakMap key fail: " + k);
      k[g][this.g] = l;
      return this;
    };
    b.prototype.get = function (k) {
      return d(k) && ta(k, g) ? k[g][this.g] : void 0;
    };
    b.prototype.has = function (k) {
      return d(k) && ta(k, g) && ta(k[g], this.g);
    };
    b.prototype.delete = function (k) {
      return d(k) && ta(k, g) && ta(k[g], this.g) ? delete k[g][this.g] : !1;
    };
    return b;
  });
  u("Map", function (a) {
    function b() {
      var h = {};
      return (h.aa = h.next = h.head = h);
    }
    function c(h, k) {
      var l = h[1];
      return Ka(function () {
        if (l) {
          for (; l.head != h[1]; ) l = l.aa;
          for (; l.next != l.head; )
            return (l = l.next), { done: !1, value: k(l) };
          l = null;
        }
        return { done: !0, value: void 0 };
      });
    }
    function d(h, k) {
      var l = k && typeof k;
      l == "object" || l == "function"
        ? f.has(k)
          ? (l = f.get(k))
          : ((l = "" + ++g), f.set(k, l))
        : (l = "p_" + k);
      var m = h[0][l];
      if (m && ta(h[0], l))
        for (h = 0; h < m.length; h++) {
          var p = m[h];
          if ((k !== k && p.key !== p.key) || k === p.key)
            return { id: l, list: m, index: h, entry: p };
        }
      return { id: l, list: m, index: -1, entry: void 0 };
    }
    function e(h) {
      this[0] = {};
      this[1] = b();
      this.size = 0;
      if (h) {
        h = x(h);
        for (var k; !(k = h.next()).done; ) (k = k.value), this.set(k[0], k[1]);
      }
    }
    if (
      (function () {
        if (
          !a ||
          typeof a != "function" ||
          !a.prototype.entries ||
          typeof Object.seal != "function"
        )
          return !1;
        try {
          var h = Object.seal({ x: 4 }),
            k = new a(x([[h, "s"]]));
          if (
            k.get(h) != "s" ||
            k.size != 1 ||
            k.get({ x: 4 }) ||
            k.set({ x: 4 }, "t") != k ||
            k.size != 2
          )
            return !1;
          var l = k.entries(),
            m = l.next();
          if (m.done || m.value[0] != h || m.value[1] != "s") return !1;
          m = l.next();
          return m.done ||
            m.value[0].x != 4 ||
            m.value[1] != "t" ||
            !l.next().done
            ? !1
            : !0;
        } catch (p) {
          return !1;
        }
      })()
    )
      return a;
    var f = new WeakMap();
    e.prototype.set = function (h, k) {
      h = h === 0 ? 0 : h;
      var l = d(this, h);
      l.list || (l.list = this[0][l.id] = []);
      l.entry
        ? (l.entry.value = k)
        : ((l.entry = {
            next: this[1],
            aa: this[1].aa,
            head: this[1],
            key: h,
            value: k,
          }),
          l.list.push(l.entry),
          (this[1].aa.next = l.entry),
          (this[1].aa = l.entry),
          this.size++);
      return this;
    };
    e.prototype.delete = function (h) {
      h = d(this, h);
      return h.entry && h.list
        ? (h.list.splice(h.index, 1),
          h.list.length || delete this[0][h.id],
          (h.entry.aa.next = h.entry.next),
          (h.entry.next.aa = h.entry.aa),
          (h.entry.head = null),
          this.size--,
          !0)
        : !1;
    };
    e.prototype.clear = function () {
      this[0] = {};
      this[1] = this[1].aa = b();
      this.size = 0;
    };
    e.prototype.has = function (h) {
      return !!d(this, h).entry;
    };
    e.prototype.get = function (h) {
      return (h = d(this, h).entry) && h.value;
    };
    e.prototype.entries = function () {
      return c(this, function (h) {
        return [h.key, h.value];
      });
    };
    e.prototype.keys = function () {
      return c(this, function (h) {
        return h.key;
      });
    };
    e.prototype.values = function () {
      return c(this, function (h) {
        return h.value;
      });
    };
    e.prototype.forEach = function (h, k) {
      for (var l = this.entries(), m; !(m = l.next()).done; )
        (m = m.value), h.call(k, m[1], m[0], this);
    };
    e.prototype[Symbol.iterator] = e.prototype.entries;
    var g = 0;
    return e;
  });
  u("Set", function (a) {
    function b(c) {
      this.g = new Map();
      if (c) {
        c = x(c);
        for (var d; !(d = c.next()).done; ) this.add(d.value);
      }
      this.size = this.g.size;
    }
    if (
      (function () {
        if (
          !a ||
          typeof a != "function" ||
          !a.prototype.entries ||
          typeof Object.seal != "function"
        )
          return !1;
        try {
          var c = Object.seal({ x: 4 }),
            d = new a(x([c]));
          if (
            !d.has(c) ||
            d.size != 1 ||
            d.add(c) != d ||
            d.size != 1 ||
            d.add({ x: 4 }) != d ||
            d.size != 2
          )
            return !1;
          var e = d.entries(),
            f = e.next();
          if (f.done || f.value[0] != c || f.value[1] != c) return !1;
          f = e.next();
          return f.done ||
            f.value[0] == c ||
            f.value[0].x != 4 ||
            f.value[1] != f.value[0]
            ? !1
            : e.next().done;
        } catch (g) {
          return !1;
        }
      })()
    )
      return a;
    b.prototype.add = function (c) {
      c = c === 0 ? 0 : c;
      this.g.set(c, c);
      this.size = this.g.size;
      return this;
    };
    b.prototype.delete = function (c) {
      c = this.g.delete(c);
      this.size = this.g.size;
      return c;
    };
    b.prototype.clear = function () {
      this.g.clear();
      this.size = 0;
    };
    b.prototype.has = function (c) {
      return this.g.has(c);
    };
    b.prototype.entries = function () {
      return this.g.entries();
    };
    b.prototype.values = function () {
      return this.g.values();
    };
    b.prototype.keys = b.prototype.values;
    b.prototype[Symbol.iterator] = b.prototype.values;
    b.prototype.forEach = function (c, d) {
      var e = this;
      this.g.forEach(function (f) {
        return c.call(d, f, f, e);
      });
    };
    return b;
  });
  u("Object.values", function (a) {
    return a
      ? a
      : function (b) {
          var c = [],
            d;
          for (d in b) ta(b, d) && c.push(b[d]);
          return c;
        };
  });
  u("Object.is", function (a) {
    return a
      ? a
      : function (b, c) {
          return b === c ? b !== 0 || 1 / b === 1 / c : b !== b && c !== c;
        };
  });
  u("Array.prototype.includes", function (a) {
    return a
      ? a
      : function (b, c) {
          var d = this;
          d instanceof String && (d = String(d));
          var e = d.length;
          c = c || 0;
          for (c < 0 && (c = Math.max(c + e, 0)); c < e; c++) {
            var f = d[c];
            if (f === b || Object.is(f, b)) return !0;
          }
          return !1;
        };
  });
  function La(a, b, c) {
    if (a == null)
      throw new TypeError(
        "The 'this' value for String.prototype." +
          c +
          " must not be null or undefined"
      );
    if (b instanceof RegExp)
      throw new TypeError(
        "First argument to String.prototype." +
          c +
          " must not be a regular expression"
      );
    return a + "";
  }
  u("String.prototype.includes", function (a) {
    return a
      ? a
      : function (b, c) {
          return La(this, b, "includes").indexOf(b, c || 0) !== -1;
        };
  });
  u("Array.from", function (a) {
    return a
      ? a
      : function (b, c, d) {
          c =
            c != null
              ? c
              : function (h) {
                  return h;
                };
          var e = [],
            f =
              typeof Symbol != "undefined" &&
              Symbol.iterator &&
              b[Symbol.iterator];
          if (typeof f == "function") {
            b = f.call(b);
            for (var g = 0; !(f = b.next()).done; )
              e.push(c.call(d, f.value, g++));
          } else
            for (f = b.length, g = 0; g < f; g++) e.push(c.call(d, b[g], g));
          return e;
        };
  });
  u("Object.entries", function (a) {
    return a
      ? a
      : function (b) {
          var c = [],
            d;
          for (d in b) ta(b, d) && c.push([d, b[d]]);
          return c;
        };
  });
  u("Number.isFinite", function (a) {
    return a
      ? a
      : function (b) {
          return typeof b !== "number"
            ? !1
            : !isNaN(b) && b !== Infinity && b !== -Infinity;
        };
  });
  u("Number.MAX_SAFE_INTEGER", function () {
    return 9007199254740991;
  });
  u("Number.MIN_SAFE_INTEGER", function () {
    return -9007199254740991;
  });
  u("Number.isInteger", function (a) {
    return a
      ? a
      : function (b) {
          return Number.isFinite(b) ? b === Math.floor(b) : !1;
        };
  });
  u("Number.isSafeInteger", function (a) {
    return a
      ? a
      : function (b) {
          return Number.isInteger(b) && Math.abs(b) <= Number.MAX_SAFE_INTEGER;
        };
  });
  u("String.prototype.startsWith", function (a) {
    return a
      ? a
      : function (b, c) {
          var d = La(this, b, "startsWith"),
            e = d.length,
            f = b.length;
          c = Math.max(0, Math.min(c | 0, d.length));
          for (var g = 0; g < f && c < e; ) if (d[c++] != b[g++]) return !1;
          return g >= f;
        };
  });
  function Ma(a, b) {
    a instanceof String && (a += "");
    var c = 0,
      d = !1,
      e = {
        next: function () {
          if (!d && c < a.length) {
            var f = c++;
            return { value: b(f, a[f]), done: !1 };
          }
          d = !0;
          return { done: !0, value: void 0 };
        },
      };
    e[Symbol.iterator] = function () {
      return e;
    };
    return e;
  }
  u("Array.prototype.entries", function (a) {
    return a
      ? a
      : function () {
          return Ma(this, function (b, c) {
            return [b, c];
          });
        };
  });
  u("Math.trunc", function (a) {
    return a
      ? a
      : function (b) {
          b = Number(b);
          if (isNaN(b) || b === Infinity || b === -Infinity || b === 0)
            return b;
          var c = Math.floor(Math.abs(b));
          return b < 0 ? -c : c;
        };
  });
  u("Number.isNaN", function (a) {
    return a
      ? a
      : function (b) {
          return typeof b === "number" && isNaN(b);
        };
  });
  u("Array.prototype.keys", function (a) {
    return a
      ? a
      : function () {
          return Ma(this, function (b) {
            return b;
          });
        };
  });
  u("Array.prototype.values", function (a) {
    return a
      ? a
      : function () {
          return Ma(this, function (b, c) {
            return c;
          });
        };
  });
  u("Promise.allSettled", function (a) {
    function b(d) {
      return { status: "fulfilled", value: d };
    }
    function c(d) {
      return { status: "rejected", reason: d };
    }
    return a
      ? a
      : function (d) {
          var e = this;
          d = Array.from(d, function (f) {
            return e.resolve(f).then(b, c);
          });
          return e.all(d);
        };
  }); /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  var Na = Na || {},
    C = this || self;
  function Oa(a, b) {
    var c = Pa("CLOSURE_FLAGS");
    a = c && c[a];
    return a != null ? a : b;
  }
  function Pa(a) {
    a = a.split(".");
    for (var b = C, c = 0; c < a.length; c++)
      if (((b = b[a[c]]), b == null)) return null;
    return b;
  }
  function Qa(a) {
    var b = typeof a;
    return b != "object" ? b : a ? (Array.isArray(a) ? "array" : b) : "null";
  }
  function Ra(a) {
    var b = typeof a;
    return (b == "object" && a != null) || b == "function";
  }
  function Sa(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }
  function Ta(a, b, c) {
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
  function Ua(a, b, c) {
    Ua =
      Function.prototype.bind &&
      Function.prototype.bind.toString().indexOf("native code") != -1
        ? Sa
        : Ta;
    return Ua.apply(null, arguments);
  }
  function Va(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function () {
      var d = c.slice();
      d.push.apply(d, arguments);
      return a.apply(this, d);
    };
  }
  function Xa(a, b) {
    a = a.split(".");
    for (var c = C, d; a.length && (d = a.shift()); )
      a.length || b === void 0
        ? c[d] && c[d] !== Object.prototype[d]
          ? (c = c[d])
          : (c = c[d] = {})
        : (c[d] = b);
  }
  function Ya(a) {
    return a;
  }
  function Za(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.ka = b.prototype;
    a.prototype = new c();
    a.prototype.constructor = a;
    a.qc = function (d, e, f) {
      for (
        var g = Array(arguments.length - 2), h = 2;
        h < arguments.length;
        h++
      )
        g[h - 2] = arguments[h];
      return b.prototype[e].apply(d, g);
    };
  }
  function $a(a, b) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, $a);
    else {
      var c = Error().stack;
      c && (this.stack = c);
    }
    a && (this.message = String(a));
    b !== void 0 && (this.cause = b);
  }
  Za($a, Error);
  $a.prototype.name = "CustomError";
  var ab;
  function cb() {
    throw Error("Invalid UTF8");
  }
  function db(a, b) {
    b = String.fromCharCode.apply(null, b);
    return a == null ? b : a + b;
  }
  var eb = void 0,
    fb,
    gb = typeof TextDecoder !== "undefined",
    hb,
    ib = typeof String.prototype.isWellFormed === "function",
    jb = typeof TextEncoder !== "undefined";
  function kb(a) {
    C.setTimeout(function () {
      throw a;
    }, 0);
  }
  function lb(a) {
    return /^[\s\xa0]*$/.test(a);
  }
  var mb = String.prototype.trim
      ? function (a) {
          return a.trim();
        }
      : function (a) {
          return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
        },
    nb = /&/g,
    ob = /</g,
    pb = />/g,
    qb = /"/g,
    rb = /'/g,
    sb = /\x00/g,
    tb = /[\x00&<>"']/;
  function ub(a, b) {
    return a.toLowerCase().indexOf(b.toLowerCase()) != -1;
  }
  function vb(a, b) {
    var c = 0;
    a = mb(String(a)).split(".");
    b = mb(String(b)).split(".");
    for (var d = Math.max(a.length, b.length), e = 0; c == 0 && e < d; e++) {
      var f = a[e] || "",
        g = b[e] || "";
      do {
        f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
        g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
        if (f[0].length == 0 && g[0].length == 0) break;
        c =
          wb(
            f[1].length == 0 ? 0 : parseInt(f[1], 10),
            g[1].length == 0 ? 0 : parseInt(g[1], 10)
          ) ||
          wb(f[2].length == 0, g[2].length == 0) ||
          wb(f[2], g[2]);
        f = f[3];
        g = g[3];
      } while (c == 0);
    }
    return c;
  }
  function wb(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  var xb = Oa(610401301, !1),
    yb = Oa(748402147, !0);
  function zb() {
    var a = C.navigator;
    return a && (a = a.userAgent) ? a : "";
  }
  var Eb,
    Fb = C.navigator;
  Eb = Fb ? Fb.userAgentData || null : null;
  function D(a) {
    return zb().indexOf(a) != -1;
  }
  function Gb() {
    var a = xb ? !!Eb && Eb.brands.length > 0 : !1;
    return a ? !1 : D("Trident") || D("MSIE");
  }
  var Hb = Array.prototype.indexOf
      ? function (a, b) {
          return Array.prototype.indexOf.call(a, b, void 0);
        }
      : function (a, b) {
          if (typeof a === "string")
            return typeof b !== "string" || b.length != 1
              ? -1
              : a.indexOf(b, 0);
          for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
          return -1;
        },
    Ib = Array.prototype.forEach
      ? function (a, b) {
          Array.prototype.forEach.call(a, b, void 0);
        }
      : function (a, b) {
          for (
            var c = a.length,
              d = typeof a === "string" ? a.split("") : a,
              e = 0;
            e < c;
            e++
          )
            e in d && b.call(void 0, d[e], e, a);
        },
    Jb = Array.prototype.map
      ? function (a, b) {
          return Array.prototype.map.call(a, b, void 0);
        }
      : function (a, b) {
          for (
            var c = a.length,
              d = Array(c),
              e = typeof a === "string" ? a.split("") : a,
              f = 0;
            f < c;
            f++
          )
            f in e && (d[f] = b.call(void 0, e[f], f, a));
          return d;
        },
    Kb = Array.prototype.reduce
      ? function (a, b, c) {
          return Array.prototype.reduce.call(a, b, c);
        }
      : function (a, b, c) {
          var d = c;
          Ib(a, function (e, f) {
            d = b.call(void 0, d, e, f, a);
          });
          return d;
        };
  function Lb(a, b) {
    a: {
      for (
        var c = typeof a === "string" ? a.split("") : a, d = a.length - 1;
        d >= 0;
        d--
      )
        if (d in c && b.call(void 0, c[d], d, a)) {
          b = d;
          break a;
        }
      b = -1;
    }
    return b < 0 ? null : typeof a === "string" ? a.charAt(b) : a[b];
  }
  function Mb(a, b) {
    b = Hb(a, b);
    var c;
    (c = b >= 0) && Array.prototype.splice.call(a, b, 1);
    return c;
  }
  function Nb(a) {
    for (var b = [], c = 0; c < a; c++) b[c] = "";
    return b;
  }
  function Ob(a) {
    Ob[" "](a);
    return a;
  }
  Ob[" "] = function () {};
  var Pb = Gb(),
    Qb = xb && Eb && Eb.platform ? Eb.platform === "macOS" : D("Macintosh"),
    Rb = D("iPad"),
    Sb = (D("iPhone") && !D("iPod") && !D("iPad")) || D("iPad") || D("iPod");
  var Tb = {},
    Ub = null;
  function Vb(a, b) {
    b === void 0 && (b = 0);
    Wb();
    b = Tb[b];
    for (
      var c = Array(Math.floor(a.length / 3)), d = b[64] || "", e = 0, f = 0;
      e < a.length - 2;
      e += 3
    ) {
      var g = a[e],
        h = a[e + 1],
        k = a[e + 2],
        l = b[g >> 2];
      g = b[((g & 3) << 4) | (h >> 4)];
      h = b[((h & 15) << 2) | (k >> 6)];
      k = b[k & 63];
      c[f++] = l + g + h + k;
    }
    l = 0;
    k = d;
    switch (a.length - e) {
      case 2:
        (l = a[e + 1]), (k = b[(l & 15) << 2] || d);
      case 1:
        (a = a[e]), (c[f] = b[a >> 2] + b[((a & 3) << 4) | (l >> 4)] + k + d);
    }
    return c.join("");
  }
  function Xb(a) {
    var b = a.length,
      c = (b * 3) / 4;
    c % 3
      ? (c = Math.floor(c))
      : "=.".indexOf(a[b - 1]) != -1 &&
        (c = "=.".indexOf(a[b - 2]) != -1 ? c - 2 : c - 1);
    var d = new Uint8Array(c),
      e = 0;
    Yb(a, function (f) {
      d[e++] = f;
    });
    return e !== c ? d.subarray(0, e) : d;
  }
  function Yb(a, b) {
    function c(k) {
      for (; d < a.length; ) {
        var l = a.charAt(d++),
          m = Ub[l];
        if (m != null) return m;
        if (!lb(l)) throw Error("Unknown base64 encoding at char: " + l);
      }
      return k;
    }
    Wb();
    for (var d = 0; ; ) {
      var e = c(-1),
        f = c(0),
        g = c(64),
        h = c(64);
      if (h === 64 && e === -1) break;
      b((e << 2) | (f >> 4));
      g != 64 &&
        (b(((f << 4) & 240) | (g >> 2)), h != 64 && b(((g << 6) & 192) | h));
    }
  }
  function Wb() {
    if (!Ub) {
      Ub = {};
      for (
        var a =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(
              ""
            ),
          b = ["+/=", "+/", "-_=", "-_.", "-_"],
          c = 0;
        c < 5;
        c++
      ) {
        var d = a.concat(b[c].split(""));
        Tb[c] = d;
        for (var e = 0; e < d.length; e++) {
          var f = d[e];
          Ub[f] === void 0 && (Ub[f] = e);
        }
      }
    }
  }
  var Zb = typeof Uint8Array !== "undefined",
    $b = !Pb && typeof btoa === "function",
    ac = /[-_.]/g,
    dc = { "-": "+", _: "/", ".": "=" };
  function ec(a) {
    return dc[a] || "";
  }
  function fc(a) {
    if (!$b) return Xb(a);
    a = ac.test(a) ? a.replace(ac, ec) : a;
    a = atob(a);
    for (var b = new Uint8Array(a.length), c = 0; c < a.length; c++)
      b[c] = a.charCodeAt(c);
    return b;
  }
  var hc = {};
  function ic(a, b) {
    jc(b);
    this.g = a;
    if (a != null && a.length === 0)
      throw Error("ByteString should be constructed with non-empty values");
  }
  function kc() {
    return lc || (lc = new ic(null, hc));
  }
  ic.prototype.isEmpty = function () {
    return this.g == null;
  };
  function mc(a) {
    jc(hc);
    var b = a.g;
    b =
      b == null || (Zb && b != null && b instanceof Uint8Array)
        ? b
        : typeof b === "string"
        ? fc(b)
        : null;
    return b == null ? b : (a.g = b);
  }
  var lc;
  function jc(a) {
    if (a !== hc) throw Error("illegal external caller");
  }
  function nc(a, b) {
    a.__closure__error__context__984382 ||
      (a.__closure__error__context__984382 = {});
    a.__closure__error__context__984382.severity = b;
  }
  var oc = void 0;
  function pc(a) {
    a = Error(a);
    nc(a, "warning");
    return a;
  }
  function qc(a, b) {
    if (a != null) {
      var c;
      var d = (c = oc) != null ? c : (oc = {});
      c = d[a] || 0;
      c >= b || ((d[a] = c + 1), (a = Error()), nc(a, "incident"), kb(a));
    }
  }
  function rc() {
    return typeof BigInt === "function";
  }
  var sc = typeof Symbol === "function" && typeof Symbol() === "symbol";
  function tc(a, b, c) {
    return typeof Symbol === "function" && typeof Symbol() === "symbol"
      ? (c === void 0 ? 0 : c) && Symbol.for && a
        ? Symbol.for(a)
        : a != null
        ? Symbol(a)
        : Symbol()
      : b;
  }
  var uc = tc("jas", void 0, !0),
    vc = tc(void 0, "0di"),
    wc = tc(void 0, "1oa"),
    xc = tc(void 0, Symbol()),
    yc = tc(void 0, "0ubs"),
    zc = tc(void 0, "0ubsb"),
    Ac = tc(void 0, "0actk"),
    Bc = tc("m_m", "xc", !0);
  var Cc = { Bb: { value: 0, configurable: !0, writable: !0, enumerable: !1 } },
    Dc = Object.defineProperties,
    E = sc ? uc : "Bb",
    Ec,
    Fc = [];
  F(Fc, 7);
  Ec = Object.freeze(Fc);
  function Gc(a, b) {
    sc || E in a || Dc(a, Cc);
    a[E] |= b;
  }
  function F(a, b) {
    sc || E in a || Dc(a, Cc);
    a[E] = b;
  }
  var Hc = {};
  function Ic(a, b) {
    return b === void 0
      ? a.g !== Jc && !!(2 & (a.u[E] | 0))
      : !!(2 & b) && a.g !== Jc;
  }
  var Jc = {};
  function Kc(a, b) {
    if (a != null)
      if (typeof a === "string") a = a ? new ic(a, hc) : kc();
      else if (a.constructor !== ic)
        if (Zb && a != null && a instanceof Uint8Array)
          a = a.length ? new ic(new Uint8Array(a), hc) : kc();
        else {
          if (!b) throw Error();
          a = void 0;
        }
    return a;
  }
  var Lc = Object.freeze({}),
    Mc = Object.freeze({});
  function Nc(a, b, c) {
    var d = b & 128 ? 0 : -1,
      e = a.length,
      f;
    if ((f = !!e))
      (f = a[e - 1]),
        (f = f != null && typeof f === "object" && f.constructor === Object);
    var g = e + (f ? -1 : 0);
    for (b = b & 128 ? 1 : 0; b < g; b++) c(b - d, a[b]);
    if (f) {
      a = a[e - 1];
      for (var h in a) !isNaN(h) && c(+h, a[h]);
    }
  }
  var Oc = {};
  function Pc(a) {
    a.wc = !0;
    return a;
  }
  var Qc = Pc(function (a) {
      return typeof a === "number";
    }),
    Rc = Pc(function (a) {
      return typeof a === "string";
    }),
    Sc = Pc(function (a) {
      return typeof a === "boolean";
    }),
    Tc = Pc(function (a) {
      return !!a && (typeof a === "object" || typeof a === "function");
    });
  function Uc() {
    return Vc(
      Pc(function (a, b) {
        return a === void 0 ? !0 : Rc(a, b);
      })
    );
  }
  function Vc(a) {
    a.Cb = !0;
    return a;
  }
  var Wc = typeof C.BigInt === "function" && typeof C.BigInt(0) === "bigint";
  function Xc(a) {
    var b = a;
    if (Rc(b)) {
      if (!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(b)) throw Error(String(b));
    } else if (Qc(b) && !Number.isSafeInteger(b)) throw Error(String(b));
    return Wc
      ? BigInt(a)
      : (a = Sc(a) ? (a ? "1" : "0") : Rc(a) ? a.trim() || "0" : String(a));
  }
  var cd = Pc(function (a) {
      return Wc ? a >= Yc && a <= Zc : a[0] === "-" ? $c(a, ad) : $c(a, bd);
    }),
    ad = Number.MIN_SAFE_INTEGER.toString(),
    Yc = Wc ? BigInt(Number.MIN_SAFE_INTEGER) : void 0,
    bd = Number.MAX_SAFE_INTEGER.toString(),
    Zc = Wc ? BigInt(Number.MAX_SAFE_INTEGER) : void 0;
  function $c(a, b) {
    if (a.length > b.length) return !1;
    if (a.length < b.length || a === b) return !0;
    for (var c = 0; c < a.length; c++) {
      var d = a[c],
        e = b[c];
      if (d > e) return !1;
      if (d < e) return !0;
    }
  }
  var dd = typeof Uint8Array.prototype.slice === "function",
    ed = 0,
    fd = 0;
  function gd(a) {
    var b = a >>> 0;
    ed = b;
    fd = ((a - b) / 4294967296) >>> 0;
  }
  function hd(a) {
    if (a < 0) {
      gd(-a);
      var b = x(id(ed, fd));
      a = b.next().value;
      b = b.next().value;
      ed = a >>> 0;
      fd = b >>> 0;
    } else gd(a);
  }
  function jd(a, b) {
    b >>>= 0;
    a >>>= 0;
    if (b <= 2097151) var c = "" + (4294967296 * b + a);
    else
      rc()
        ? (c = "" + ((BigInt(b) << BigInt(32)) | BigInt(a)))
        : ((c = ((a >>> 24) | (b << 8)) & 16777215),
          (b = (b >> 16) & 65535),
          (a = (a & 16777215) + c * 6777216 + b * 6710656),
          (c += b * 8147497),
          (b *= 2),
          a >= 1e7 && ((c += (a / 1e7) >>> 0), (a %= 1e7)),
          c >= 1e7 && ((b += (c / 1e7) >>> 0), (c %= 1e7)),
          (c = b + kd(c) + kd(a)));
    return c;
  }
  function kd(a) {
    a = String(a);
    return "0000000".slice(a.length) + a;
  }
  function ld() {
    var a = ed,
      b = fd;
    b & 2147483648
      ? rc()
        ? (a = "" + ((BigInt(b | 0) << BigInt(32)) | BigInt(a >>> 0)))
        : ((b = x(id(a, b))),
          (a = b.next().value),
          (b = b.next().value),
          (a = "-" + jd(a, b)))
      : (a = jd(a, b));
    return a;
  }
  function id(a, b) {
    b = ~b;
    a ? (a = ~a + 1) : (b += 1);
    return [a, b];
  }
  function md(a) {
    return Array.prototype.slice.call(a);
  }
  var nd = typeof BigInt === "function" ? BigInt.asIntN : void 0,
    od = Number.isSafeInteger,
    pd = Number.isFinite,
    qd = Math.trunc;
  function rd(a) {
    if (a == null || typeof a === "number") return a;
    if (a === "NaN" || a === "Infinity" || a === "-Infinity") return Number(a);
  }
  function sd(a) {
    if (typeof a !== "boolean")
      throw Error("Expected boolean but got " + Qa(a) + ": " + a);
    return a;
  }
  var td = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
  function ud(a) {
    switch (typeof a) {
      case "bigint":
        return !0;
      case "number":
        return pd(a);
      case "string":
        return td.test(a);
      default:
        return !1;
    }
  }
  function vd(a) {
    if (!pd(a)) throw pc("enum");
    return a | 0;
  }
  function wd(a) {
    return a == null ? a : pd(a) ? a | 0 : void 0;
  }
  function xd(a) {
    if (typeof a !== "number") throw pc("int32");
    if (!pd(a)) throw pc("int32");
    return a | 0;
  }
  function yd(a) {
    return a == null ? a : xd(a);
  }
  function zd(a) {
    if (a == null) return a;
    if (typeof a === "string" && a) a = +a;
    else if (typeof a !== "number") return;
    return pd(a) ? a | 0 : void 0;
  }
  function Ad(a) {
    if (a == null) return a;
    if (typeof a === "string" && a) a = +a;
    else if (typeof a !== "number") return;
    return pd(a) ? a >>> 0 : void 0;
  }
  function Bd(a) {
    var b = void 0;
    b != null || (b = 1024);
    if (!ud(a)) throw pc("int64");
    var c = typeof a;
    switch (b) {
      case 512:
        switch (c) {
          case "string":
            return Cd(a);
          case "bigint":
            return String(nd(64, a));
          default:
            return Dd(a);
        }
      case 1024:
        switch (c) {
          case "string":
            return Ed(a);
          case "bigint":
            return Xc(nd(64, a));
          default:
            return Fd(a);
        }
      case 0:
        switch (c) {
          case "string":
            return Cd(a);
          case "bigint":
            return Xc(nd(64, a));
          default:
            return Gd(a);
        }
      default:
        throw Error("Unknown format requested type for int64");
    }
  }
  function Hd(a) {
    return a == null ? a : Bd(a);
  }
  function Id(a) {
    var b = a.length;
    if (
      a[0] === "-"
        ? b < 20 || (b === 20 && a <= "-9223372036854775808")
        : b < 19 || (b === 19 && a <= "9223372036854775807")
    )
      return a;
    if (a.length < 16) hd(Number(a));
    else if (rc())
      (a = BigInt(a)),
        (ed = Number(a & BigInt(4294967295)) >>> 0),
        (fd = Number((a >> BigInt(32)) & BigInt(4294967295)));
    else {
      b = +(a[0] === "-");
      fd = ed = 0;
      for (
        var c = a.length, d = b, e = ((c - b) % 6) + b;
        e <= c;
        d = e, e += 6
      )
        (d = Number(a.slice(d, e))),
          (fd *= 1e6),
          (ed = ed * 1e6 + d),
          ed >= 4294967296 &&
            ((fd += Math.trunc(ed / 4294967296)), (fd >>>= 0), (ed >>>= 0));
      b &&
        ((b = x(id(ed, fd))),
        (a = b.next().value),
        (b = b.next().value),
        (ed = a),
        (fd = b));
    }
    return ld();
  }
  function Gd(a) {
    a = qd(a);
    if (!od(a)) {
      hd(a);
      var b = ed,
        c = fd;
      if ((a = c & 2147483648))
        (b = (~b + 1) >>> 0), (c = ~c >>> 0), b == 0 && (c = (c + 1) >>> 0);
      var d = c * 4294967296 + (b >>> 0);
      b = Number.isSafeInteger(d) ? d : jd(b, c);
      a = typeof b === "number" ? (a ? -b : b) : a ? "-" + b : b;
    }
    return a;
  }
  function Dd(a) {
    a = qd(a);
    od(a) ? (a = String(a)) : (hd(a), (a = ld()));
    return a;
  }
  function Cd(a) {
    var b = qd(Number(a));
    if (od(b)) return String(b);
    b = a.indexOf(".");
    b !== -1 && (a = a.substring(0, b));
    return Id(a);
  }
  function Ed(a) {
    var b = qd(Number(a));
    if (od(b)) return Xc(b);
    b = a.indexOf(".");
    b !== -1 && (a = a.substring(0, b));
    return rc() ? Xc(nd(64, BigInt(a))) : Xc(Id(a));
  }
  function Fd(a) {
    return od(a) ? Xc(Gd(a)) : Xc(Dd(a));
  }
  function Jd(a) {
    var b = typeof a;
    if (a == null) return a;
    if (b === "bigint") return Xc(nd(64, a));
    if (ud(a)) return b === "string" ? Ed(a) : Fd(a);
  }
  function Kd(a) {
    if (typeof a !== "string") throw Error();
    return a;
  }
  function Ld(a) {
    if (a != null && typeof a !== "string") throw Error();
    return a;
  }
  function Md(a) {
    return a == null || typeof a === "string" ? a : void 0;
  }
  function Pd(a, b, c, d) {
    if (a != null && a[Bc] === Hc) return a;
    if (!Array.isArray(a))
      return c ? (d & 2 ? b[vc] || (b[vc] = Qd(b)) : new b()) : void 0;
    c = a[E] | 0;
    d = c | (d & 32) | (d & 2);
    d !== c && F(a, d);
    return new b(a);
  }
  function Qd(a) {
    a = new a();
    Gc(a.u, 34);
    return a;
  }
  function Rd(a) {
    return a;
  }
  function Sd(a) {
    var b = Ya(xc);
    return b ? a[b] : void 0;
  }
  function Td() {}
  function Ud(a, b) {
    for (var c in a) !isNaN(c) && b(a, +c, a[c]);
  }
  function Vd(a) {
    var b = new Td();
    Ud(a, function (c, d, e) {
      b[d] = md(e);
    });
    b.g = a.g;
    return b;
  }
  function Wd(a, b) {
    b < 100 || qc(yc, 1);
  }
  function Xd(a, b, c, d) {
    var e = d !== void 0;
    d = !!d;
    var f = Ya(xc),
      g;
    !e && sc && f && (g = a[f]) && Ud(g, Wd);
    f = [];
    var h = a.length;
    g = 4294967295;
    var k = !1,
      l = !!(b & 64),
      m = l ? (b & 128 ? 0 : -1) : void 0;
    if (!(b & 1)) {
      var p = h && a[h - 1];
      p != null && typeof p === "object" && p.constructor === Object
        ? (h--, (g = h))
        : (p = void 0);
      if (l && !(b & 128) && !e) {
        k = !0;
        var q;
        g = ((q = Yd) != null ? q : Rd)(g - m, m, a, p, void 0) + m;
      }
    }
    b = void 0;
    for (q = 0; q < h; q++) {
      var t = a[q];
      if (t != null && (t = c(t, d)) != null)
        if (l && q >= g) {
          var r = q - m,
            v = void 0;
          ((v = b) != null ? v : (b = {}))[r] = t;
        } else f[q] = t;
    }
    if (p)
      for (var y in p)
        (h = p[y]),
          h != null &&
            (h = c(h, d)) != null &&
            ((q = +y),
            (t = void 0),
            l && !Number.isNaN(q) && (t = q + m) < g
              ? (f[t] = h)
              : ((q = void 0), (((q = b) != null ? q : (b = {}))[y] = h)));
    b && (k ? f.push(b) : (f[g] = b));
    e && Ya(xc) && (a = Sd(a)) && a instanceof Td && (f[xc] = Vd(a));
    return f;
  }
  function Zd(a) {
    switch (typeof a) {
      case "number":
        return Number.isFinite(a) ? a : "" + a;
      case "bigint":
        return cd(a) ? Number(a) : "" + a;
      case "boolean":
        return a ? 1 : 0;
      case "object":
        if (Array.isArray(a)) {
          var b = a[E] | 0;
          return a.length === 0 && b & 1 ? void 0 : Xd(a, b, Zd);
        }
        if (a != null && a[Bc] === Hc) return $d(a);
        if (a instanceof ic) {
          b = a.g;
          if (b == null) a = "";
          else if (typeof b === "string") a = b;
          else {
            if ($b) {
              for (var c = "", d = 0, e = b.length - 10240; d < e; )
                c += String.fromCharCode.apply(
                  null,
                  b.subarray(d, (d += 10240))
                );
              c += String.fromCharCode.apply(null, d ? b.subarray(d) : b);
              b = btoa(c);
            } else b = Vb(b);
            a = a.g = b;
          }
          return a;
        }
        return;
    }
    return a;
  }
  var Yd;
  function $d(a) {
    a = a.u;
    return Xd(a, a[E] | 0, Zd);
  }
  var ae, be;
  function ce(a) {
    switch (typeof a) {
      case "boolean":
        return ae || (ae = [0, void 0, !0]);
      case "number":
        return a > 0
          ? void 0
          : a === 0
          ? be || (be = [0, void 0])
          : [-a, void 0];
      case "string":
        return [0, a];
      case "object":
        return a;
    }
  }
  function de(a, b) {
    return ee(a, b[0], b[1]);
  }
  function G(a, b, c) {
    return ee(a, b, c, 2048);
  }
  function ee(a, b, c, d) {
    d = d === void 0 ? 0 : d;
    if (a == null) {
      var e = 32;
      c ? ((a = [c]), (e |= 128)) : (a = []);
      b && (e = (e & -16760833) | ((b & 1023) << 14));
    } else {
      if (!Array.isArray(a)) throw Error("narr");
      e = a[E] | 0;
      if (yb && 1 & e) throw Error("rfarr");
      2048 & e && !(2 & e) && fe();
      if (e & 256) throw Error("farr");
      if (e & 64) return (e | d) !== e && F(a, e | d), a;
      if (c && ((e |= 128), c !== a[0])) throw Error("mid");
      a: {
        c = a;
        e |= 64;
        var f = c.length;
        if (f) {
          var g = f - 1,
            h = c[g];
          if (h != null && typeof h === "object" && h.constructor === Object) {
            b = e & 128 ? 0 : -1;
            g -= b;
            if (g >= 1024) throw Error("pvtlmt");
            for (var k in h)
              (f = +k), f < g && ((c[f + b] = h[k]), delete h[k]);
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
    F(a, e | 64 | d);
    return a;
  }
  function fe() {
    if (yb) throw Error("carr");
    qc(Ac, 5);
  }
  function ge(a, b) {
    if (typeof a !== "object") return a;
    if (Array.isArray(a)) {
      var c = a[E] | 0;
      a.length === 0 && c & 1
        ? (a = void 0)
        : c & 2 ||
          (!b || 4096 & c || 16 & c
            ? (a = he(a, c, !1, b && !(c & 16)))
            : (Gc(a, 34), c & 4 && Object.freeze(a)));
      return a;
    }
    if (a != null && a[Bc] === Hc)
      return (
        (b = a.u),
        (c = b[E] | 0),
        Ic(a, c) ? a : ie(a, b, c) ? je(a, b) : he(b, c)
      );
    if (a instanceof ic) return a;
  }
  function je(a, b, c) {
    a = new a.constructor(b);
    c && (a.g = Jc);
    a.j = Jc;
    return a;
  }
  function he(a, b, c, d) {
    d != null || (d = !!(34 & b));
    a = Xd(a, b, ge, d);
    d = 32;
    c && (d |= 2);
    b = (b & 16769217) | d;
    F(a, b);
    return a;
  }
  function ke(a) {
    var b = a.u,
      c = b[E] | 0;
    return Ic(a, c)
      ? ie(a, b, c)
        ? je(a, b, !0)
        : new a.constructor(he(b, c, !1))
      : a;
  }
  function le(a) {
    if (a.g !== Jc) return !1;
    var b = a.u;
    b = he(b, b[E] | 0);
    Gc(b, 2048);
    a.u = b;
    a.g = void 0;
    a.j = void 0;
    return !0;
  }
  function me(a) {
    if (!le(a) && Ic(a, a.u[E] | 0)) throw Error();
  }
  function ne(a, b) {
    b === void 0 && (b = a[E] | 0);
    b & 32 && !(b & 4096) && F(a, b | 4096);
  }
  function ie(a, b, c) {
    return c & 2
      ? !0
      : c & 32 && !(c & 4096)
      ? (F(b, c | 2), (a.g = Jc), !0)
      : !1;
  }
  var oe = Xc(0);
  function pe(a, b, c, d) {
    a = qe(a.u, b, c, d);
    if (a !== null) return a;
  }
  function qe(a, b, c, d) {
    if (b === -1) return null;
    var e = b + (c ? 0 : -1),
      f = a.length - 1;
    if (!(f < 1 + (c ? 0 : -1))) {
      if (e >= f) {
        var g = a[f];
        if (g != null && typeof g === "object" && g.constructor === Object) {
          c = g[b];
          var h = !0;
        } else if (e === f) c = g;
        else return;
      } else c = a[e];
      if (d && c != null) {
        d = d(c);
        if (d == null) return d;
        if (!Object.is(d, c)) return h ? (g[b] = d) : (a[e] = d), d;
      }
      return c;
    }
  }
  function H(a, b, c) {
    me(a);
    var d = a.u;
    I(d, d[E] | 0, b, c);
    return a;
  }
  function I(a, b, c, d, e) {
    var f = c + (e ? 0 : -1),
      g = a.length - 1;
    if (g >= 1 + (e ? 0 : -1) && f >= g) {
      var h = a[g];
      if (h != null && typeof h === "object" && h.constructor === Object)
        return (h[c] = d), b;
    }
    if (f <= g) return (a[f] = d), b;
    if (d !== void 0) {
      var k;
      g = (((k = b) != null ? k : (b = a[E] | 0)) >> 14) & 1023 || 536870912;
      c >= g
        ? d != null && ((f = {}), (a[g + (e ? 0 : -1)] = ((f[c] = d), f)))
        : (a[f] = d);
    }
    return b;
  }
  function re(a) {
    return a === Lc ? 2 : 4;
  }
  function se(a, b, c, d, e) {
    var f = a.u,
      g = f[E] | 0;
    d = Ic(a, g) ? 1 : d;
    e = !!e || d === 3;
    d === 2 && le(a) && ((f = a.u), (g = f[E] | 0));
    a = te(f, b);
    var h = a === Ec ? 7 : a[E] | 0,
      k = ue(h, g);
    var l = 4 & k ? !1 : !0;
    if (l) {
      4 & k && ((a = md(a)), (h = 0), (k = ve(k, g)), (g = I(f, g, b, a)));
      for (var m = 0, p = 0; m < a.length; m++) {
        var q = c(a[m]);
        q != null && (a[p++] = q);
      }
      p < m && (a.length = p);
      c = (k | 4) & -513;
      k = c &= -1025;
      k &= -4097;
    }
    k !== h && (F(a, k), 2 & k && Object.freeze(a));
    return (a = we(a, k, f, g, b, d, l, e));
  }
  function we(a, b, c, d, e, f, g, h) {
    var k = b;
    f === 1 || (f !== 4 ? 0 : 2 & b || (!(16 & b) && 32 & d))
      ? xe(b) ||
        ((b |=
          !a.length || (g && !(4096 & b)) || (32 & d && !(4096 & b || 16 & b))
            ? 2
            : 256),
        b !== k && F(a, b),
        Object.freeze(a))
      : (f === 2 &&
          xe(b) &&
          ((a = md(a)), (k = 0), (b = ve(b, d)), (d = I(c, d, e, a))),
        xe(b) || (h || (b |= 16), b !== k && F(a, b)));
    2 & b || !(4096 & b || 16 & b) || ne(c, d);
    return a;
  }
  function te(a, b, c) {
    a = qe(a, b, c);
    return Array.isArray(a) ? a : Ec;
  }
  function ue(a, b) {
    2 & b && (a |= 2);
    return a | 1;
  }
  function xe(a) {
    return (!!(2 & a) && !!(4 & a)) || !!(256 & a);
  }
  function ye(a) {
    return Kc(a, !0);
  }
  function J(a, b) {
    a = pe(a, b, void 0, ye);
    return a == null ? kc() : a;
  }
  function ze(a, b, c, d) {
    me(a);
    var e = a.u;
    I(e, e[E] | 0, b, (d === "0" ? Number(c) === 0 : c === d) ? void 0 : c);
    return a;
  }
  function Ae(a, b, c, d) {
    me(a);
    var e = a.u,
      f = e[E] | 0;
    if (d == null) {
      var g = Be(e);
      if (Ce(g, e, f, c) === b) g.set(c, 0);
      else return a;
    } else {
      g = Be(e);
      var h = Ce(g, e, f, c);
      h !== b && (h && (f = I(e, f, h)), g.set(c, b));
    }
    I(e, f, b, d);
    return a;
  }
  function De(a, b, c) {
    return Ee(a, b) === c ? c : -1;
  }
  function Ee(a, b) {
    a = a.u;
    return Ce(Be(a), a, void 0, b);
  }
  function Be(a) {
    if (sc) {
      var b;
      return (b = a[wc]) != null ? b : (a[wc] = new Map());
    }
    if (wc in a) return a[wc];
    b = new Map();
    Object.defineProperty(a, wc, { value: b });
    return b;
  }
  function Ce(a, b, c, d) {
    var e = a.get(d);
    if (e != null) return e;
    for (var f = (e = 0); f < d.length; f++) {
      var g = d[f];
      qe(b, g) != null && (e !== 0 && (c = I(b, c, e)), (e = g));
    }
    a.set(d, e);
    return e;
  }
  function Fe(a, b, c) {
    var d = a[E] | 0,
      e = d & 128 ? Oc : void 0,
      f = qe(a, c, e);
    if (f != null && f[Bc] === Hc) {
      if (!Ic(f)) return le(f), f.u;
      var g = f.u;
    } else Array.isArray(f) && (g = f);
    if (g) {
      var h = g[E] | 0;
      h & 2 && (g = he(g, h));
    }
    g = de(g, b);
    g !== f && I(a, d, c, g, e);
    return g;
  }
  function Ge(a, b, c, d) {
    var e = !1;
    d = qe(a, d, void 0, function (f) {
      var g = Pd(f, c, !1, b);
      e = g !== f && g != null;
      return g;
    });
    if (d != null) return e && !Ic(d) && ne(a, b), d;
  }
  function He(a) {
    var b = Ie;
    a = a.u;
    return Ge(a, a[E] | 0, b, 4) || b[vc] || (b[vc] = Qd(b));
  }
  function K(a, b, c) {
    var d = a.u,
      e = d[E] | 0;
    b = Ge(d, e, b, c);
    if (b == null) return b;
    e = d[E] | 0;
    if (!Ic(a, e)) {
      var f = ke(b);
      f !== b &&
        (le(a) && ((d = a.u), (e = d[E] | 0)),
        (b = f),
        (e = I(d, e, c, b)),
        ne(d, e));
    }
    return b;
  }
  function Je(a, b, c, d) {
    var e = a.u,
      f = e;
    e = e[E] | 0;
    var g = Ic(a, e),
      h = g ? 1 : d;
    d = h === 3;
    var k = !g;
    (h === 2 || k) && le(a) && ((f = a.u), (e = f[E] | 0));
    a = te(f, c);
    var l = a === Ec ? 7 : a[E] | 0,
      m = ue(l, e);
    if ((g = !(4 & m))) {
      var p = a,
        q = e,
        t = !!(2 & m);
      t && (q |= 2);
      for (var r = !t, v = !0, y = 0, L = 0; y < p.length; y++) {
        var Aa = Pd(p[y], b, !1, q);
        if (Aa instanceof b) {
          if (!t) {
            var bb = Ic(Aa);
            r && (r = !bb);
            v && (v = bb);
          }
          p[L++] = Aa;
        }
      }
      L < y && (p.length = L);
      m |= 4;
      m = v ? m & -4097 : m | 4096;
      m = r ? m | 8 : m & -9;
    }
    m !== l && (F(a, m), 2 & m && Object.freeze(a));
    if (
      k &&
      !(
        8 & m ||
        (!a.length &&
          (h === 1 || (h !== 4 ? 0 : 2 & m || (!(16 & m) && 32 & e))))
      )
    ) {
      xe(m) && ((a = md(a)), (m = ve(m, e)), (e = I(f, e, c, a)));
      b = a;
      k = m;
      for (l = 0; l < b.length; l++)
        (p = b[l]), (m = ke(p)), p !== m && (b[l] = m);
      k |= 8;
      m = k = b.length ? k | 4096 : k & -4097;
      F(a, m);
    }
    return (a = we(a, m, f, e, c, h, g, d));
  }
  function Ke(a) {
    a == null && (a = void 0);
    return a;
  }
  function Le(a, b, c) {
    c = Ke(c);
    H(a, b, c);
    c && !Ic(c) && ne(a.u);
    return a;
  }
  function Me(a, b, c, d) {
    d = Ke(d);
    Ae(a, b, c, d);
    d && !Ic(d) && ne(a.u);
    return a;
  }
  function Ne(a, b, c) {
    me(a);
    var d = a.u,
      e = d[E] | 0;
    if (c == null) return I(d, e, b), a;
    for (
      var f = c === Ec ? 7 : c[E] | 0,
        g = f,
        h = xe(f),
        k = h || Object.isFrozen(c),
        l = !0,
        m = !0,
        p = 0;
      p < c.length;
      p++
    ) {
      var q = c[p];
      h || ((q = Ic(q)), l && (l = !q), m && (m = q));
    }
    h || ((f = l ? 13 : 5), (f = m ? f & -4097 : f | 4096));
    (k && f === g) || ((c = md(c)), (g = 0), (f = ve(f, e)));
    f !== g && F(c, f);
    e = I(d, e, b, c);
    2 & f || !(4096 & f || 16 & f) || ne(d, e);
    return a;
  }
  function ve(a, b) {
    return (a = (2 & b ? a | 2 : a & -3) & -273);
  }
  function Oe(a, b) {
    me(a);
    a = se(a, 4, Md, 2, !0);
    if (Array.isArray(b))
      for (var c = b.length, d = 0; d < c; d++) a.push(Kd(b[d]));
    else
      for (b = x(b), c = b.next(); !c.done; c = b.next()) a.push(Kd(c.value));
  }
  function Pe(a, b) {
    var c = c === void 0 ? !1 : c;
    a = pe(a, b);
    a =
      a == null || typeof a === "boolean"
        ? a
        : typeof a === "number"
        ? !!a
        : void 0;
    return a != null ? a : c;
  }
  function N(a, b) {
    var c = c === void 0 ? 0 : c;
    a = Ad(pe(a, b));
    return a != null ? a : c;
  }
  function Qe(a, b) {
    var c = c === void 0 ? oe : c;
    a = pe(a, b, void 0, Jd);
    return a != null ? a : c;
  }
  function Re(a, b) {
    var c = c === void 0 ? 0 : c;
    a = pe(a, b, void 0, rd);
    return a != null ? a : c;
  }
  function O(a, b) {
    var c = c === void 0 ? "" : c;
    a = Md(pe(a, b));
    return a != null ? a : c;
  }
  function P(a, b) {
    var c = c === void 0 ? 0 : c;
    a = wd(pe(a, b));
    return a != null ? a : c;
  }
  function Se(a, b, c) {
    return P(a, De(a, c, b));
  }
  function Te(a, b, c) {
    if (c != null) {
      if (typeof c !== "number") throw pc("uint32");
      if (!pd(c)) throw pc("uint32");
      c >>>= 0;
    }
    return ze(a, b, c, 0);
  }
  function Ue(a, b, c) {
    return ze(a, b, Kc(c, !1), kc());
  }
  function Ve(a, b, c) {
    return H(a, b, c == null ? c : vd(c));
  }
  function We(a, b, c) {
    return ze(a, b, c == null ? c : vd(c), 0);
  }
  function Xe(a, b, c, d) {
    return Ae(a, b, c, d == null ? d : vd(d));
  }
  function Ye(a, b, c) {
    me(a);
    var d = a.u,
      e = d[E] | 0;
    if (c == null) I(d, e, b);
    else {
      var f = c === Ec ? 7 : c[E] | 0,
        g = f,
        h = xe(f),
        k = h || Object.isFrozen(c);
      h || (f = 0);
      k || ((c = md(c)), (g = 0), (f = ve(f, e)), (k = !1));
      f |= 5;
      h = 4 & f ? (512 & f ? 512 : 1024 & f ? 1024 : 0) : void 0;
      f |= h != null ? h : 1024;
      for (h = 0; h < c.length; h++) {
        var l = c[h],
          m = xd(l);
        Object.is(l, m) ||
          (k && ((c = md(c)), (g = 0), (f = ve(f, e)), (k = !1)), (c[h] = m));
      }
      f !== g && (k && ((c = md(c)), (f = ve(f, e))), F(c, f));
      I(d, e, b, c);
    }
    return a;
  }
  function Ze(a, b, c) {
    this.buffer = a;
    if (c && !b) throw Error();
    this.g = b;
  }
  function $e(a, b) {
    if (typeof a === "string") return new Ze(fc(a), b);
    if (Array.isArray(a)) return new Ze(new Uint8Array(a), b);
    if (a.constructor === Uint8Array) return new Ze(a, !1);
    if (a.constructor === ArrayBuffer)
      return (a = new Uint8Array(a)), new Ze(a, !1);
    if (a.constructor === ic)
      return (b = mc(a) || new Uint8Array(0)), new Ze(b, !0, a);
    if (a instanceof Uint8Array)
      return (
        (a =
          a.constructor === Uint8Array
            ? a
            : new Uint8Array(a.buffer, a.byteOffset, a.byteLength)),
        new Ze(a, !1)
      );
    throw Error();
  }
  function af(a, b, c, d) {
    this.i = null;
    this.A = !1;
    this.g = this.j = this.l = 0;
    this.init(a, b, c, d);
  }
  af.prototype.init = function (a, b, c, d) {
    var e = d === void 0 ? {} : d;
    d = e.za === void 0 ? !1 : e.za;
    e = e.Ia === void 0 ? !1 : e.Ia;
    this.za = d;
    this.Ia = e;
    a &&
      ((a = $e(a, this.Ia)),
      (this.i = a.buffer),
      (this.A = a.g),
      (this.l = b || 0),
      (this.j = c !== void 0 ? this.l + c : this.i.length),
      (this.g = this.l));
  };
  af.prototype.clear = function () {
    this.i = null;
    this.A = !1;
    this.g = this.j = this.l = 0;
    this.za = !1;
  };
  af.prototype.reset = function () {
    this.g = this.l;
  };
  function bf(a, b) {
    a.g = b;
    if (b > a.j) throw Error();
  }
  function cf(a) {
    var b = a.i,
      c = a.g,
      d = b[c++],
      e = d & 127;
    if (
      d & 128 &&
      ((d = b[c++]),
      (e |= (d & 127) << 7),
      d & 128 &&
        ((d = b[c++]),
        (e |= (d & 127) << 14),
        d & 128 &&
          ((d = b[c++]),
          (e |= (d & 127) << 21),
          d & 128 &&
            ((d = b[c++]),
            (e |= d << 28),
            d & 128 &&
              b[c++] & 128 &&
              b[c++] & 128 &&
              b[c++] & 128 &&
              b[c++] & 128 &&
              b[c++] & 128))))
    )
      throw Error();
    bf(a, c);
    return e;
  }
  function df(a, b) {
    if (b < 0) throw Error();
    var c = a.g;
    b = c + b;
    if (b > a.j) throw Error();
    a.g = b;
    return c;
  }
  function ef(a, b) {
    if (b == 0) return kc();
    var c = df(a, b);
    a.za && a.A
      ? (c = a.i.subarray(c, c + b))
      : ((a = a.i),
        (b = c + b),
        (c =
          c === b
            ? new Uint8Array(0)
            : dd
            ? a.slice(c, b)
            : new Uint8Array(a.subarray(c, b))));
    return c.length == 0 ? kc() : new ic(c, hc);
  }
  var ff = [];
  function gf(a, b, c, d) {
    if (ff.length) {
      var e = ff.pop();
      e.init(a, b, c, d);
      a = e;
    } else a = new af(a, b, c, d);
    this.g = a;
    this.l = this.g.g;
    this.i = this.j = -1;
    hf(this, d);
  }
  function hf(a, b) {
    b = b === void 0 ? {} : b;
    a.Oa = b.Oa === void 0 ? !1 : b.Oa;
  }
  function jf(a, b, c, d) {
    if (kf.length) {
      var e = kf.pop();
      hf(e, d);
      e.g.init(a, b, c, d);
      return e;
    }
    return new gf(a, b, c, d);
  }
  function lf(a) {
    a.g.clear();
    a.j = -1;
    a.i = -1;
    kf.length < 100 && kf.push(a);
  }
  gf.prototype.reset = function () {
    this.g.reset();
    this.l = this.g.g;
    this.i = this.j = -1;
  };
  function mf(a) {
    var b = a.g;
    if (b.g == b.j) return !1;
    a.l = a.g.g;
    var c = cf(a.g) >>> 0;
    b = c >>> 3;
    c &= 7;
    if (!(c >= 0 && c <= 5)) throw Error();
    if (b < 1) throw Error();
    a.j = b;
    a.i = c;
    return !0;
  }
  function nf(a) {
    switch (a.i) {
      case 0:
        if (a.i != 0) nf(a);
        else
          a: {
            a = a.g;
            for (var b = a.g, c = b + 10, d = a.i; b < c; )
              if ((d[b++] & 128) === 0) {
                bf(a, b);
                break a;
              }
            throw Error();
          }
        break;
      case 1:
        a = a.g;
        bf(a, a.g + 8);
        break;
      case 2:
        a.i != 2 ? nf(a) : ((b = cf(a.g) >>> 0), (a = a.g), bf(a, a.g + b));
        break;
      case 5:
        a = a.g;
        bf(a, a.g + 4);
        break;
      case 3:
        b = a.j;
        do {
          if (!mf(a)) throw Error();
          if (a.i == 4) {
            if (a.j != b) throw Error();
            break;
          }
          nf(a);
        } while (1);
        break;
      default:
        throw Error();
    }
  }
  function of(a, b, c) {
    var d = a.g.j,
      e = cf(a.g) >>> 0;
    e = a.g.g + e;
    var f = e - d;
    f <= 0 && ((a.g.j = e), c(b, a, void 0, void 0, void 0), (f = e - a.g.g));
    if (f) throw Error();
    a.g.g = e;
    a.g.j = d;
  }
  var kf = [];
  function pf() {
    this.g = [];
  }
  pf.prototype.length = function () {
    return this.g.length;
  };
  pf.prototype.end = function () {
    var a = this.g;
    this.g = [];
    return a;
  };
  function sf(a, b) {
    for (; b > 127; ) a.g.push((b & 127) | 128), (b >>>= 7);
    a.g.push(b);
  }
  function tf() {
    this.j = [];
    this.i = 0;
    this.g = new pf();
  }
  function uf(a, b) {
    b.length !== 0 && (a.j.push(b), (a.i += b.length));
  }
  function vf(a, b) {
    sf(a.g, b * 8 + 2);
    b = a.g.end();
    uf(a, b);
    b.push(a.i);
    return b;
  }
  function wf(a, b) {
    var c = b.pop();
    for (c = a.i + a.g.length() - c; c > 127; )
      b.push((c & 127) | 128), (c >>>= 7), a.i++;
    b.push(c);
    a.i++;
  }
  function xf(a, b, c) {
    sf(a.g, b * 8 + 2);
    sf(a.g, c.length);
    uf(a, a.g.end());
    uf(a, c);
  }
  function yf() {
    function a() {
      throw Error();
    }
    Object.setPrototypeOf(a, a.prototype);
    return a;
  }
  var zf = yf(),
    Af = yf(),
    Bf = yf(),
    Cf = yf(),
    Df = yf();
  function R(a, b, c) {
    this.u = G(a, b, c);
  }
  R.prototype.toJSON = function () {
    return $d(this);
  };
  R.prototype[Bc] = Hc;
  R.prototype.toString = function () {
    return this.u.toString();
  };
  function Ef(a, b, c) {
    this.g = a;
    this.i = b;
    a = Ya(zf);
    this.j = (!!a && c === a) || !1;
  }
  function Ff(a) {
    var b = Gf;
    var c = c === void 0 ? zf : c;
    return new Ef(a, b, c);
  }
  function Gf(a, b, c, d, e) {
    b = Hf(b, d);
    b != null && ((c = vf(a, c)), e(b, a), wf(a, c));
  }
  var If = Ff(function (a, b, c, d, e) {
      if (a.i !== 2) return !1;
      of(a, Fe(b, d, c), e);
      return !0;
    }),
    Jf = Ff(function (a, b, c, d, e) {
      if (a.i !== 2) return !1;
      of(a, Fe(b, d, c), e);
      return !0;
    }),
    Kf = Symbol(),
    Lf = Symbol(),
    Mf = Symbol(),
    Nf = Symbol(),
    Of = Symbol(),
    Pf,
    Qf;
  function Rf(a, b, c, d) {
    var e = d[a];
    if (e) return e;
    e = {};
    e.sb = d;
    e.ua = ce(d[0]);
    var f = d[1],
      g = 1;
    f &&
      f.constructor === Object &&
      ((e.Sa = f),
      (f = d[++g]),
      typeof f === "function" &&
        ((e.ab = !0),
        Pf != null || (Pf = f),
        Qf != null || (Qf = d[g + 1]),
        (f = d[(g += 2)])));
    for (
      var h = {};
      f && Array.isArray(f) && f.length && typeof f[0] === "number" && f[0] > 0;

    ) {
      for (var k = 0; k < f.length; k++) h[f[k]] = f;
      f = d[++g];
    }
    for (k = 1; f !== void 0; ) {
      typeof f === "number" && ((k += f), (f = d[++g]));
      var l = void 0;
      if (f instanceof Ef) var m = f;
      else (m = If), g--;
      f = void 0;
      if ((f = m) == null ? 0 : f.j) {
        f = d[++g];
        l = d;
        var p = g;
        typeof f === "function" && ((f = f()), (l[p] = f));
        l = f;
      }
      f = d[++g];
      p = k + 1;
      typeof f === "number" && f < 0 && ((p -= f), (f = d[++g]));
      for (; k < p; k++) {
        var q = h[k];
        l ? c(e, k, m, l, q) : b(e, k, m, q);
      }
    }
    return (d[a] = e);
  }
  function Sf(a) {
    return Array.isArray(a) ? (a[0] instanceof Ef ? a : [Jf, a]) : [a, void 0];
  }
  function Hf(a, b) {
    if (a instanceof R) return a.u;
    if (Array.isArray(a)) return de(a, b);
  }
  function Tf(a, b, c, d) {
    var e = c.g;
    a[b] = d
      ? function (f, g, h) {
          return e(f, g, h, d);
        }
      : e;
  }
  function Uf(a, b, c, d, e) {
    var f = c.g,
      g,
      h;
    a[b] = function (k, l, m) {
      return f(k, l, m, h || (h = Rf(Lf, Tf, Uf, d).ua), g || (g = Vf(d)), e);
    };
  }
  function Vf(a) {
    var b = a[Mf];
    if (b != null) return b;
    var c = Rf(Lf, Tf, Uf, a);
    b = c.ab
      ? function (d, e) {
          return Pf(d, e, c);
        }
      : function (d, e) {
          for (; mf(e) && e.i != 4; ) {
            var f = e.j,
              g = c[f];
            if (g == null) {
              var h = c.Sa;
              h && (h = h[f]) && ((h = Wf(h)), h != null && (g = c[f] = h));
            }
            if (g == null || !g(e, d, f)) {
              h = e;
              g = h.l;
              nf(h);
              if (h.Oa) var k = void 0;
              else {
                var l = h.g.g - g;
                h.g.g = g;
                k = ef(h.g, l);
              }
              l = h = g = void 0;
              var m = d;
              k &&
                ((g = (h = (l = m[xc]) != null ? l : (m[xc] = new Td()))[f]) !=
                null
                  ? g
                  : (h[f] = [])
                ).push(k);
            }
          }
          if ((d = Sd(d))) d.g = c.sb[Of];
          return !0;
        };
    a[Mf] = b;
    a[Of] = Xf.bind(a);
    return b;
  }
  function Xf(a, b, c, d) {
    var e = this[Lf],
      f = this[Mf],
      g = de(void 0, e.ua),
      h = Sd(a);
    if (h) {
      var k = !1,
        l = e.Sa;
      if (l) {
        e = function (r, v, y) {
          if (y.length !== 0)
            if (l[v])
              for (r = x(y), v = r.next(); !v.done; v = r.next()) {
                v = jf(v.value);
                try {
                  (k = !0), f(g, v);
                } finally {
                  lf(v);
                }
              }
            else d == null || d(a, v, y);
        };
        if (b == null) Ud(h, e);
        else if (h != null) {
          var m = h[b];
          m && e(h, b, m);
        }
        if (k) {
          var p = a[E] | 0;
          if (p & 2 && p & 2048 && (c == null || !c.zc)) throw Error();
          var q = p & 128 ? Oc : void 0,
            t = function (r, v) {
              if (qe(a, r, q) != null)
                switch (c == null ? void 0 : c.yc) {
                  case 1:
                    return;
                  default:
                    throw Error();
                }
              v != null && (p = I(a, p, r, v, q));
              delete h[r];
            };
          b == null
            ? Nc(g, g[E] | 0, function (r, v) {
                t(r, v);
              })
            : t(b, qe(g, b, q));
        }
      }
    }
  }
  function Wf(a) {
    a = Sf(a);
    var b = a[0].g;
    if ((a = a[1])) {
      var c = Vf(a),
        d = Rf(Lf, Tf, Uf, a).ua;
      return function (e, f, g) {
        return b(e, f, g, d, c);
      };
    }
    return b;
  }
  function Yf(a, b, c) {
    a[b] = c.i;
  }
  function Zf(a, b, c, d) {
    var e,
      f,
      g = c.i;
    a[b] = function (h, k, l) {
      return g(h, k, l, f || (f = Rf(Kf, Yf, Zf, d).ua), e || (e = $f(d)));
    };
  }
  function $f(a) {
    var b = a[Nf];
    if (!b) {
      var c = Rf(Kf, Yf, Zf, a);
      b = function (d, e) {
        return ag(d, e, c);
      };
      a[Nf] = b;
    }
    return b;
  }
  function ag(a, b, c) {
    Nc(a, a[E] | 0, function (d, e) {
      if (e != null) {
        var f = bg(c, d);
        f ? f(b, e, d) : d < 500 || qc(zc, 3);
      }
    });
    (a = Sd(a)) &&
      Ud(a, function (d, e, f) {
        uf(b, b.g.end());
        for (d = 0; d < f.length; d++) uf(b, mc(f[d]) || new Uint8Array(0));
      });
  }
  function bg(a, b) {
    var c = a[b];
    if (c) return c;
    if ((c = a.Sa))
      if ((c = c[b])) {
        c = Sf(c);
        var d = c[0].i;
        if ((c = c[1])) {
          var e = $f(c),
            f = Rf(Kf, Yf, Zf, c).ua;
          c = a.ab
            ? Qf(f, e)
            : function (g, h, k) {
                return d(g, h, k, f, e);
              };
        } else c = d;
        return (a[b] = c);
      }
  }
  function cg(a, b, c) {
    return new Ef(a, b, c);
  }
  function dg(a, b, c) {
    I(a, a[E] | 0, b, c, (a[E] | 0) & 128 ? Oc : void 0);
  }
  var eg = cg(
      function (a, b, c) {
        if (a.i !== 2) return !1;
        var d,
          e = cf(a.g) >>> 0;
        a = a.g;
        var f = df(a, e);
        a = a.i;
        if (gb) {
          var g = a;
          (d = fb) || (d = fb = new TextDecoder("utf-8", { fatal: !0 }));
          e = f + e;
          g = f === 0 && e === g.length ? g : g.subarray(f, e);
          try {
            var h = d.decode(g);
          } catch (p) {
            if (eb === void 0) {
              try {
                d.decode(new Uint8Array([128]));
              } catch (q) {}
              try {
                d.decode(new Uint8Array([97])), (eb = !0);
              } catch (q) {
                eb = !1;
              }
            }
            !eb && (fb = void 0);
            throw p;
          }
        } else {
          h = f;
          e = h + e;
          f = [];
          for (var k = null, l, m; h < e; )
            (l = a[h++]),
              l < 128
                ? f.push(l)
                : l < 224
                ? h >= e
                  ? cb()
                  : ((m = a[h++]),
                    l < 194 || (m & 192) !== 128
                      ? (h--, cb())
                      : f.push(((l & 31) << 6) | (m & 63)))
                : l < 240
                ? h >= e - 1
                  ? cb()
                  : ((m = a[h++]),
                    (m & 192) !== 128 ||
                    (l === 224 && m < 160) ||
                    (l === 237 && m >= 160) ||
                    ((d = a[h++]) & 192) !== 128
                      ? (h--, cb())
                      : f.push(((l & 15) << 12) | ((m & 63) << 6) | (d & 63)))
                : l <= 244
                ? h >= e - 2
                  ? cb()
                  : ((m = a[h++]),
                    (m & 192) !== 128 ||
                    ((l << 28) + (m - 144)) >> 30 !== 0 ||
                    ((d = a[h++]) & 192) !== 128 ||
                    ((g = a[h++]) & 192) !== 128
                      ? (h--, cb())
                      : ((l =
                          ((l & 7) << 18) |
                          ((m & 63) << 12) |
                          ((d & 63) << 6) |
                          (g & 63)),
                        (l -= 65536),
                        f.push(((l >> 10) & 1023) + 55296, (l & 1023) + 56320)))
                : cb(),
              f.length >= 8192 && ((k = db(k, f)), (f.length = 0));
          h = db(k, f);
        }
        d = h;
        dg(b, c, d === "" ? void 0 : d);
        return !0;
      },
      function (a, b, c) {
        b = Md(b);
        if (b != null) {
          var d = !1;
          d = d === void 0 ? !1 : d;
          if (jb) {
            if (
              d &&
              (ib
                ? !b.isWellFormed()
                : /(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])/.test(
                    b
                  ))
            )
              throw Error("Found an unpaired surrogate");
            b = (hb || (hb = new TextEncoder())).encode(b);
          } else {
            for (
              var e = 0, f = new Uint8Array(3 * b.length), g = 0;
              g < b.length;
              g++
            ) {
              var h = b.charCodeAt(g);
              if (h < 128) f[e++] = h;
              else {
                if (h < 2048) f[e++] = (h >> 6) | 192;
                else {
                  if (h >= 55296 && h <= 57343) {
                    if (h <= 56319 && g < b.length) {
                      var k = b.charCodeAt(++g);
                      if (k >= 56320 && k <= 57343) {
                        h = (h - 55296) * 1024 + k - 56320 + 65536;
                        f[e++] = (h >> 18) | 240;
                        f[e++] = ((h >> 12) & 63) | 128;
                        f[e++] = ((h >> 6) & 63) | 128;
                        f[e++] = (h & 63) | 128;
                        continue;
                      } else g--;
                    }
                    if (d) throw Error("Found an unpaired surrogate");
                    h = 65533;
                  }
                  f[e++] = (h >> 12) | 224;
                  f[e++] = ((h >> 6) & 63) | 128;
                }
                f[e++] = (h & 63) | 128;
              }
            }
            b = e === f.length ? f : f.subarray(0, e);
          }
          xf(a, c, b);
        }
      },
      Af
    ),
    fg,
    gg = void 0;
  gg = gg === void 0 ? zf : gg;
  fg = new Ef(
    function (a, b, c, d, e) {
      if (a.i !== 2) return !1;
      d = de(void 0, d);
      var f = b[E] | 0;
      if (f & 2) throw Error();
      var g = f & 128 ? Oc : void 0,
        h = te(b, c, g),
        k = h === Ec ? 7 : h[E] | 0,
        l = ue(k, f);
      if (2 & l || xe(l) || 16 & l)
        l === k || xe(l) || F(h, l),
          (h = md(h)),
          (k = 0),
          (l = ve(l, f)),
          I(b, f, c, h, g);
      l &= -13;
      l !== k && F(h, l);
      h.push(d);
      of(a, d, e);
      return !0;
    },
    function (a, b, c, d, e) {
      if (Array.isArray(b)) {
        for (var f = 0; f < b.length; f++) {
          var g = a,
            h = c,
            k = e,
            l = Hf(b[f], d);
          l != null && ((h = vf(g, h)), k(l, g), wf(g, h));
        }
        a = b[E] | 0;
        a & 1 || F(b, a | 1);
      }
    },
    gg
  );
  var hg = cg(
      function (a, b, c) {
        if (a.i !== 2) return !1;
        var d = cf(a.g) >>> 0;
        a = ef(a.g, d);
        dg(b, c, a === kc() ? void 0 : a);
        return !0;
      },
      function (a, b, c) {
        b = b == null || typeof b == "string" || b instanceof ic ? b : void 0;
        b != null && xf(a, c, $e(b, !0).buffer);
      },
      Cf
    ),
    ig = cg(
      function (a, b, c) {
        if (a.i !== 0) return !1;
        a = cf(a.g) >>> 0;
        dg(b, c, a === 0 ? void 0 : a);
        return !0;
      },
      function (a, b, c) {
        b = Ad(b);
        b != null && b != null && (sf(a.g, c * 8), sf(a.g, b));
      },
      Bf
    ),
    jg = cg(
      function (a, b, c) {
        if (a.i !== 0) return !1;
        a = cf(a.g);
        dg(b, c, a === 0 ? void 0 : a);
        return !0;
      },
      function (a, b, c) {
        b = zd(b);
        if (b != null)
          if (
            ((b = parseInt(b, 10)), sf(a.g, c * 8), (a = a.g), (c = b), c >= 0)
          )
            sf(a, c);
          else {
            for (b = 0; b < 9; b++) a.g.push((c & 127) | 128), (c >>= 7);
            a.g.push(1);
          }
      },
      Df
    );
  function kg(a, b) {
    return function (c, d) {
      var e = { Ia: !0 };
      d && Object.assign(e, d);
      c = jf(c, void 0, void 0, e);
      try {
        var f = new a(),
          g = f.u;
        Vf(b)(g, c);
        var h = f;
      } finally {
        lf(c);
      }
      return h;
    };
  }
  function lg(a) {
    this.u = G(a);
  }
  w(lg, R);
  function mg(a, b) {
    var c = c === void 0 ? {} : c;
    this.error = a;
    this.meta = c;
    this.context = b.context;
    this.msg = b.message || "";
    this.id = b.id || "jserror";
  }
  function ng(a, b) {
    if (a)
      for (var c in a)
        Object.prototype.hasOwnProperty.call(a, c) && b(a[c], c, a);
  }
  function og(a) {
    try {
      var b;
      if ((b = !!a && a.location.href != null))
        a: {
          try {
            Ob(a.foo);
            b = !0;
            break a;
          } catch (c) {}
          b = !1;
        }
      return b;
    } catch (c) {
      return !1;
    }
  }
  function pg() {}
  function qg(a) {
    var b = !1,
      c;
    return function () {
      b || ((c = a()), (b = !0));
      return c;
    };
  }
  function rg(a) {
    var b = a;
    return function () {
      if (b) {
        var c = b;
        b = null;
        c();
      }
    };
  }
  function sg(a) {
    function b() {
      d = C.setTimeout(c, 1e3);
      var g = f;
      f = [];
      a.apply(void 0, g);
    }
    function c() {
      d = 0;
      e && ((e = !1), b());
    }
    var d = 0,
      e = !1,
      f = [];
    return function (g) {
      f = arguments;
      d ? (e = !0) : b();
    };
  }
  function tg() {
    return xb && Eb
      ? !Eb.mobile && (D("iPad") || D("Android") || D("Silk"))
      : D("iPad") || (D("Android") && !D("Mobile")) || D("Silk");
  } /*

 Copyright Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
  var ug = globalThis.trustedTypes,
    vg;
  function wg() {
    var a = null;
    if (!ug) return a;
    try {
      var b = function (c) {
        return c;
      };
      a = ug.createPolicy("goog#html", {
        createHTML: b,
        createScript: b,
        createScriptURL: b,
      });
    } catch (c) {}
    return a;
  }
  function xg() {
    vg === void 0 && (vg = wg());
    return vg;
  }
  function yg(a) {
    this.g = a;
  }
  yg.prototype.toString = function () {
    return this.g + "";
  };
  function zg(a) {
    var b = xg();
    a = b ? b.createScriptURL(a) : a;
    return new yg(a);
  }
  function Ag(a) {
    this.g = a;
  }
  Ag.prototype.toString = function () {
    return this.g + "";
  };
  function Bg(a, b) {
    if (b instanceof yg) b = b.g;
    else throw Error("");
    a.src = b;
    var c;
    b = a.ownerDocument;
    b = b === void 0 ? document : b;
    var d;
    b =
      (d = (c = b).querySelector) == null ? void 0 : d.call(c, "script[nonce]");
    (c = b == null ? "" : b.nonce || b.getAttribute("nonce") || "") &&
      a.setAttribute("nonce", c);
  }
  function Cg(a) {
    tb.test(a) &&
      (a.indexOf("&") != -1 && (a = a.replace(nb, "&amp;")),
      a.indexOf("<") != -1 && (a = a.replace(ob, "&lt;")),
      a.indexOf(">") != -1 && (a = a.replace(pb, "&gt;")),
      a.indexOf('"') != -1 && (a = a.replace(qb, "&quot;")),
      a.indexOf("'") != -1 && (a = a.replace(rb, "&#39;")),
      a.indexOf("\x00") != -1 && (a = a.replace(sb, "&#0;")));
    return a;
  }
  function Dg(a) {
    var b, c;
    return (c = (b = /https?:\/\/[^\/]+/.exec(a)) == null ? void 0 : b[0]) !=
      null
      ? c
      : "";
  }
  var Eg = qg(function () {
    return (
      xb && Eb
        ? Eb.mobile
        : !tg() && (D("iPod") || D("iPhone") || D("Android") || D("IEMobile"))
    )
      ? 2
      : tg()
      ? 1
      : 0;
  });
  function Fg() {
    if (!globalThis.crypto) return Math.random();
    try {
      var a = new Uint32Array(1);
      globalThis.crypto.getRandomValues(a);
      return a[0] / 65536 / 65536;
    } catch (b) {
      return Math.random();
    }
  }
  var Gg,
    Hg = 64;
  function Ig() {
    try {
      return (
        Gg != null || (Gg = new Uint32Array(64)),
        Hg >= 64 && (crypto.getRandomValues(Gg), (Hg = 0)),
        Gg[Hg++]
      );
    } catch (a) {
      return Math.floor(Math.random() * 4294967296);
    }
  }
  function Jg() {
    var a = window;
    if (!Qc(a.goog_pvsid))
      try {
        var b = Ig() + (Ig() & 2097151) * 4294967296;
        Object.defineProperty(a, "goog_pvsid", { value: b, configurable: !1 });
      } catch (c) {}
    return Number(a.goog_pvsid) || -1;
  }
  function Kg(a) {
    var b = Ja.apply(1, arguments);
    if (b.length === 0) return zg(a[0]);
    for (var c = a[0], d = 0; d < b.length; d++)
      c += encodeURIComponent(b[d]) + a[d + 1];
    return zg(c);
  }
  function Lg(a, b) {
    b = b === void 0 ? document : b;
    return b.createElement(String(a).toLowerCase());
  }
  var Mg = (function () {
    if (!C.addEventListener || !Object.defineProperty) return !1;
    var a = !1,
      b = Object.defineProperty({}, "passive", {
        get: function () {
          a = !0;
        },
      });
    try {
      var c = function () {};
      C.addEventListener("test", c, b);
      C.removeEventListener("test", c, b);
    } catch (d) {}
    return a;
  })();
  function Ng(a, b, c) {
    for (var d in a) b.call(c, a[d], d, a);
  }
  function Og(a) {
    var b = [],
      c = 0,
      d;
    for (d in a) b[c++] = a[d];
    return b;
  }
  function Pg(a) {
    for (var b in a) delete a[b];
  }
  var Qg =
    "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
      " "
    );
  function Rg(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
      d = arguments[e];
      for (c in d) a[c] = d[c];
      for (var f = 0; f < Qg.length; f++)
        (c = Qg[f]),
          Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    }
  }
  function Sg(a) {
    this.g = a || C.document || document;
  }
  Sg.prototype.contains = function (a, b) {
    if (!a || !b) return !1;
    if (a.contains && b.nodeType == 1) return a == b || a.contains(b);
    if (typeof a.compareDocumentPosition != "undefined")
      return a == b || !!(a.compareDocumentPosition(b) & 16);
    for (; b && a != b; ) b = b.parentNode;
    return b == a;
  };
  function Tg(a, b, c) {
    typeof a.addEventListener === "function" && a.addEventListener(b, c, !1);
  }
  function Ug(a, b, c) {
    typeof a.removeEventListener === "function" &&
      a.removeEventListener(b, c, !1);
  }
  function Vg(a, b, c, d) {
    d = d === void 0 ? !1 : d;
    a.google_image_requests || (a.google_image_requests = []);
    var e = Lg("IMG", a.document);
    if (c) {
      var f = function () {
        c && Mb(a.google_image_requests, e);
        Ug(e, "load", f);
        Ug(e, "error", f);
      };
      Tg(e, "load", f);
      Tg(e, "error", f);
    }
    d && (e.attributionSrc = "");
    e.src = b;
    a.google_image_requests.push(e);
  }
  function Wg(a, b) {
    var c = c === void 0 ? !1 : c;
    var d = "https://pagead2.googlesyndication.com/pagead/gen_204?id=" + b;
    ng(a, function (e, f) {
      if (e || e === 0) d += "&" + f + "=" + encodeURIComponent(String(e));
    });
    Xg(d, c);
  }
  function Xg(a, b) {
    var c = window;
    b = b === void 0 ? !1 : b;
    var d = d === void 0 ? !1 : d;
    c.fetch
      ? ((b = {
          keepalive: !0,
          credentials: "include",
          redirect: "follow",
          method: "get",
          mode: "no-cors",
        }),
        d &&
          ((b.mode = "cors"),
          "setAttributionReporting" in XMLHttpRequest.prototype
            ? (b.attributionReporting = {
                eventSourceEligible: "true",
                triggerEligible: "false",
              })
            : (b.headers = {
                "Attribution-Reporting-Eligible": "event-source",
              })),
        c.fetch(a, b))
      : Vg(c, a, b === void 0 ? !1 : b, d === void 0 ? !1 : d);
  }
  function Yg(a, b) {
    try {
      var c = function (d) {
        var e = {};
        return [((e[d.Qb] = d.Eb), e)];
      };
      return JSON.stringify([
        a
          .filter(function (d) {
            return d.bb;
          })
          .map(c),
        $d(b),
        a
          .filter(function (d) {
            return !d.bb;
          })
          .map(c),
      ]);
    } catch (d) {
      return Zg(d, b), "";
    }
  }
  function Zg(a, b) {
    try {
      var c = a instanceof Error ? a : Error(String(a)),
        d = c.toString();
      c.name && d.indexOf(c.name) == -1 && (d += ": " + c.name);
      c.message && d.indexOf(c.message) == -1 && (d += ": " + c.message);
      if (c.stack)
        a: {
          var e = c.stack;
          a = d;
          try {
            e.indexOf(a) == -1 && (e = a + "\n" + e);
            for (var f; e != f; )
              (f = e),
                (e = e.replace(
                  RegExp("((https?:/..*/)[^/:]*:\\d+(?:.|\n)*)\\2"),
                  "$1"
                ));
            d = e.replace(RegExp("\n *", "g"), "\n");
            break a;
          } catch (g) {
            d = a;
            break a;
          }
          d = void 0;
        }
      Wg({ m: d, b: P(b, 1) || null, v: O(b, 2) || null }, "rcs_internal");
    } catch (g) {}
  }
  function $g(a, b, c) {
    this.A = c;
    c = new lg();
    a = We(c, 1, a);
    this.j = ze(a, 2, Ld(b), "");
  }
  function ah(a) {
    if (a.A) {
      var b = a.j,
        c = [],
        d = c.concat,
        e = Set,
        f = [],
        g = f.concat;
      var h = se(a.j, 3, zd, re());
      c = d.call(c, z(new e(g.call(f, z(h), z(a.A())))));
      Ye(b, 3, c);
    }
    a = a.j;
    b = a.u;
    c = b[E] | 0;
    return Ic(a, c)
      ? a
      : ie(a, b, c)
      ? je(a, b)
      : new a.constructor(he(b, c, !0));
  }
  function bh(a) {
    this.u = G(a);
  }
  w(bh, R);
  function ch(a) {
    this.u = G(a);
  }
  w(ch, R);
  function dh(a, b) {
    return We(a, 1, b);
  }
  function eh(a, b) {
    return We(a, 2, b);
  }
  function fh(a) {
    this.u = G(a);
  }
  w(fh, R);
  var gh = [1, 2];
  function hh(a) {
    this.u = G(a);
  }
  w(hh, R);
  function ih(a, b) {
    return Le(a, 1, b);
  }
  function jh(a, b) {
    return Ne(a, 2, b);
  }
  function kh(a, b) {
    return Ye(a, 4, b);
  }
  function lh(a, b) {
    return Ne(a, 5, b);
  }
  function mh(a, b) {
    return We(a, 6, b);
  }
  function nh(a) {
    this.u = G(a);
  }
  w(nh, R);
  var oh = [1, 2, 3, 4, 6];
  function ph(a) {
    this.u = G(a);
  }
  w(ph, R);
  function qh(a) {
    this.u = G(a);
  }
  w(qh, R);
  var rh = [2, 3, 4];
  function sh(a) {
    this.u = G(a);
  }
  w(sh, R);
  var th = [3, 4, 5],
    uh = [6, 7];
  function vh(a) {
    this.u = G(a);
  }
  w(vh, R);
  var wh = [4, 5];
  function xh(a) {
    this.u = G(a);
  }
  w(xh, R);
  xh.prototype.getTagSessionCorrelator = function () {
    return Qe(this, 2);
  };
  function yh(a) {
    var b = new xh();
    return Me(b, 4, zh, a);
  }
  var zh = [4, 5, 7, 8, 9];
  function Ah(a) {
    this.u = G(a);
  }
  w(Ah, R);
  function Bh(a) {
    this.u = G(a);
  }
  w(Bh, R);
  function Ch() {
    $g.apply(this, arguments);
  }
  w(Ch, $g);
  function Dh() {
    Ch.apply(this, arguments);
  }
  w(Dh, Ch);
  Dh.prototype.Ga = function () {
    this.J.apply(
      this,
      z(
        Ja.apply(0, arguments).map(function (a) {
          return { bb: !0, Qb: 4, Eb: $d(a) };
        })
      )
    );
  };
  function Eh(a, b) {
    if (globalThis.fetch)
      globalThis
        .fetch(a, {
          method: "POST",
          body: b,
          keepalive: b.length < 65536,
          credentials: "omit",
          mode: "no-cors",
          redirect: "follow",
        })
        .catch(function () {});
    else {
      var c = new XMLHttpRequest();
      c.open("POST", a, !0);
      c.send(b);
    }
  }
  function Fh(a, b, c, d, e, f, g, h, k) {
    Dh.call(this, a, b, k);
    this.G = c;
    this.F = d;
    this.I = e;
    this.C = f;
    this.D = g;
    this.l = h;
    this.g = [];
    this.i = null;
    this.B = !1;
  }
  w(Fh, Dh);
  function Gh(a) {
    a.i !== null && (clearTimeout(a.i), (a.i = null));
    if (a.g.length) {
      var b = Yg(a.g, ah(a));
      a.F(a.G + "?e=1", b);
      a.g = [];
    }
  }
  Fh.prototype.J = function () {
    var a = Ja.apply(0, arguments),
      b = this;
    try {
      this.D && Yg(this.g.concat(a), ah(this)).length >= 65536 && Gh(this),
        this.l &&
          !this.B &&
          ((this.B = !0),
          this.l.g(function () {
            Gh(b);
          })),
        this.g.push.apply(this.g, z(a)),
        this.g.length >= this.C && Gh(this),
        this.g.length &&
          this.i === null &&
          (this.i = setTimeout(function () {
            Gh(b);
          }, this.I));
    } catch (c) {
      Zg(c, ah(this));
    }
  };
  function Hh(a, b, c, d, e, f, g) {
    Fh.call(
      this,
      a,
      b,
      "https://pagead2.googlesyndication.com/pagead/ping",
      Eh,
      c === void 0 ? 1e3 : c,
      d === void 0 ? 100 : d,
      (e === void 0 ? !1 : e) && !!globalThis.fetch,
      f,
      g
    );
  }
  w(Hh, Fh);
  function Ih(a) {
    a = a === void 0 ? C : a;
    var b = a.context || a.AMP_CONTEXT_DATA;
    if (!b)
      try {
        b = a.parent.context || a.parent.AMP_CONTEXT_DATA;
      } catch (e) {}
    var c, d;
    return ((c = b) == null ? 0 : c.pageViewId) &&
      ((d = b) == null ? 0 : d.canonicalUrl)
      ? b
      : null;
  }
  function Jh() {
    this.S = {};
  }
  function Kh() {
    var a = Ih(window);
    if (a) {
      if (a) {
        var b = a.pageViewId;
        a = a.clientId;
        Rc(a) && (b += a.replace(/\D/g, "").substring(0, 6));
      } else b = null;
      return +b;
    }
    for (a = b = window; b && b != b.parent; ) (b = b.parent), og(b) && (a = b);
    b = a;
    a = b.google_global_correlator;
    a ||
      (b.google_global_correlator = a =
        1 + Math.floor(Math.random() * 8796093022208));
    return a;
  }
  function Lh(a, b) {
    var c = Mh[7] || "google_ps_7";
    a = a.S;
    var d = a[c];
    return d === void 0 ? ((a[c] = b()), a[c]) : d;
  }
  function Nh(a) {
    var b = Kh();
    return Lh(a, function () {
      return b;
    });
  }
  var Oh = null,
    Ph = {},
    Mh =
      ((Ph[8] = "google_prev_ad_formats_by_region"),
      (Ph[9] = "google_prev_ad_slotnames_by_region"),
      Ph);
  var Sh = oa(["https://pagead2.googlesyndication.com/pagead/js/err_rep.js"]);
  function Th() {
    var a = a === void 0 ? "jserror" : a;
    var b = b === void 0 ? 0.01 : b;
    var c = c === void 0 ? Kg(Sh) : c;
    this.g = a;
    this.j = b;
    this.i = c;
  }
  function Uh(a) {
    var b;
    a.visibilityState
      ? (b = "visibilitychange")
      : a.mozVisibilityState
      ? (b = "mozvisibilitychange")
      : a.webkitVisibilityState && (b = "webkitvisibilitychange");
    return b;
  }
  var Vh = null;
  function Wh() {
    var a = a === void 0 ? window : a;
    if (Vh === null) {
      Vh = "";
      try {
        var b = "";
        try {
          b = a.top.location.hash;
        } catch (d) {
          b = a.location.hash;
        }
        if (b) {
          var c = b.match(/\bdeid=([\d,]+)/);
          Vh = c ? c[1] : "";
        }
      } catch (d) {}
    }
    return Vh;
  }
  function Xh() {
    var a = a === void 0 ? C : a;
    return (a = a.performance) && a.now && a.timing
      ? Math.floor(a.now() + a.timing.navigationStart)
      : Date.now();
  }
  function Yh() {
    var a = a === void 0 ? C : a;
    return (a = a.performance) && a.now ? a.now() : null;
  }
  function Zh(a, b, c, d) {
    this.label = a;
    this.type = b;
    this.value = c;
    this.duration = d === void 0 ? 0 : d;
    this.taskId = this.slotId = void 0;
    this.uniqueId = Math.random();
  }
  var $h = C.performance,
    ai = !!($h && $h.mark && $h.measure && $h.clearMarks),
    bi = qg(function () {
      var a;
      if ((a = ai)) (a = Wh()), (a = !!a.indexOf && a.indexOf("1337") >= 0);
      return a;
    });
  function ci(a, b) {
    this.events = [];
    this.g = b || C;
    var c = null;
    b &&
      ((b.google_js_reporting_queue = b.google_js_reporting_queue || []),
      (this.events = b.google_js_reporting_queue),
      (c = b.google_measure_js_timing));
    this.B = bi() || (c != null ? c : Math.random() < a);
  }
  ci.prototype.I = function () {
    this.B = !1;
    this.events !== this.g.google_js_reporting_queue &&
      (bi() && Ib(this.events, di), (this.events.length = 0));
  };
  ci.prototype.F = function (a) {
    !this.B || this.events.length > 2048 || this.events.push(a);
  };
  function di(a) {
    a &&
      $h &&
      bi() &&
      ($h.clearMarks("goog_" + a.label + "_" + a.uniqueId + "_start"),
      $h.clearMarks("goog_" + a.label + "_" + a.uniqueId + "_end"));
  }
  ci.prototype.start = function (a, b) {
    if (!this.B) return null;
    a = new Zh(a, b, Yh() || Xh());
    b = "goog_" + a.label + "_" + a.uniqueId + "_start";
    $h && bi() && $h.mark(b);
    return a;
  };
  ci.prototype.end = function (a) {
    if (this.B && Qc(a.value)) {
      a.duration = (Yh() || Xh()) - a.value;
      var b = "goog_" + a.label + "_" + a.uniqueId + "_end";
      $h && bi() && $h.mark(b);
      this.F(a);
    }
  };
  function ei(a) {
    a = a._google_rum_ns_ = a._google_rum_ns_ || {};
    return (a.pq = a.pq || []);
  }
  function fi(a, b, c) {
    ng(b, function (d, e) {
      var f = c && c[e];
      (!d && d !== 0) ||
        f ||
        ((a +=
          "&" + encodeURIComponent(e) + "=" + encodeURIComponent(String(d))),
        c && (c[e] = !0));
    });
    return a;
  }
  function gi(a, b, c, d, e, f, g, h) {
    function k() {
      var m = Ja.apply(0, arguments)[0],
        p = m[0];
      m = m[1];
      var q = p.length + m.length + 2;
      l.A + l.i + q > 8e3 && l.j();
      l.J.push([p, m]);
      l.i += q;
      l.A + l.i >= 6e3 && l.j();
      return 0;
    }
    f = f === void 0 ? Infinity : f;
    g = g === void 0 ? !1 : g;
    ci.call(this, a, h);
    var l = this;
    this.Ja = b;
    this.domain = c;
    this.path = d;
    this.mb = e;
    this.D = 0;
    this.C = {};
    this.N = {};
    this.Ka = [];
    this.l = {};
    this.i = 0;
    this.J = [];
    this.O = f;
    a = this.g.navigator;
    this.xa = !(this.domain !== "csi.gstatic.com" || !a || !a.sendBeacon);
    (this.g.performance && this.g.performance.now) || hi(this, "dat", 1);
    a && a.deviceMemory && hi(this, "dmc", a.deviceMemory);
    this.g === this.g.top && hi(this, "top", 1);
    this.la = !g;
    this.X = function () {
      l.g.setTimeout(function () {
        l.j();
      }, 1100);
    };
    this.ha = function () {
      for (var m = x(l.Ka), p = m.next(); !p.done; p = m.next()) {
        p = p.value;
        try {
          p();
        } catch (t) {}
      }
      m = l.g;
      var q = q === void 0 ? {} : q;
      typeof window.CustomEvent === "function"
        ? (p = new CustomEvent("rum_blp", q))
        : ((p = document.createEvent("CustomEvent")),
          p.initCustomEvent("rum_blp", !!q.bubbles, !!q.cancelable, q.detail));
      m.dispatchEvent(p);
      l.j();
    };
    this.nb = sg(function () {
      l.j();
    });
    this.ob = function () {
      var m = l.g.document;
      (m.hidden != null
        ? m.hidden
        : m.mozHidden != null
        ? m.mozHidden
        : m.webkitHidden != null && m.webkitHidden) && l.nb();
    };
    this.G = this.g.setTimeout(function () {
      l.j();
    }, 5e3);
    this.A = b.length + c.length + d.length + e.length + 3;
    Ib(this.events, function (m) {
      ii(l, m);
    });
    b = ei(this.g);
    Ib(b, function (m) {
      return k(m);
    });
    b.length = 0;
    b.push = k;
    hi(this, "puid", (this.D + 1).toString(36) + "~" + Date.now().toString(36));
    ji(this);
  }
  w(gi, ci);
  function ji(a) {
    a.g.document.readyState === "complete"
      ? a.g.setTimeout(function () {
          a.j();
        }, 0)
      : Tg(a.g, "load", a.X);
    var b = Uh(a.g.document);
    typeof b !== "undefined" && Tg(a.g, b, a.ob);
    Tg(a.g, "pagehide", a.ha);
  }
  function hi(a, b, c) {
    c = String(c);
    a.A =
      a.C[b] != null
        ? a.A + (c.length - a.C[b].length)
        : a.A + (b.length + c.length + 2);
    a.C[b] = c;
  }
  function ki(a, b, c, d, e) {
    e = e === void 0 ? "" : e;
    var f =
      a.l[b] == null
        ? b.length + c.length + 2
        : d
        ? c.length + (e === void 0 ? "" : e).length
        : c.length - a.l[b].length;
    a.A + a.i + f > 8e3 && (a.j(), (f = b.length + c.length + 2));
    a.l[b] = d && a.l[b] != null ? a.l[b] + ((e === void 0 ? "" : e) + c) : c;
    a.i += f;
    a.A + a.i >= 6e3 && a.j();
  }
  gi.prototype.j = function () {
    if (this.B && this.la) {
      try {
        this.i && (this.sendBeacon(this.l), this.D === this.O && this.I());
      } catch (e) {
        var a = new Th(),
          b = e;
        var c = c === void 0 ? a.j : c;
        var d = d === void 0 ? a.g : d;
        Math.random() > c ||
          ((b.error && b.meta && b.id) ||
            (b = new mg(b, { context: 358, id: d })),
          (C.google_js_errors = C.google_js_errors || []),
          C.google_js_errors.push(b),
          C.error_rep_loaded ||
            ((c = C.document),
            (b = Lg("SCRIPT", c)),
            Bg(b, a.i),
            (a = c.getElementsByTagName("script")[0]) &&
              a.parentNode &&
              a.parentNode.insertBefore(b, a),
            (C.error_rep_loaded = !0)));
      }
      this.l = {};
      this.i = 0;
      this.events.length = 0;
      this.g.clearTimeout(this.G);
      this.G = 0;
    }
  };
  function li(a, b) {
    var c = a.Ja + "//" + a.domain + a.path + a.mb,
      d = {};
    c = fi(c, a.C, d);
    c = fi(c, b, d);
    b = a.g;
    b.google_timing_params &&
      ((c = fi(c, b.google_timing_params, d)),
      (b.google_timing_params = void 0));
    Ib(a.J, function (e) {
      var f = x(e);
      e = f.next().value;
      f = f.next().value;
      var g = {};
      c = fi(c, ((g[e] = f), g));
    });
    a.J.length = 0;
    return c;
  }
  gi.prototype.sendBeacon = function (a) {
    this.D++;
    a = li(this, a);
    var b = !1;
    try {
      b = !!(
        this.xa &&
        this.g.navigator &&
        this.g.navigator.sendBeacon(a, null)
      );
    } catch (c) {
      this.xa = !1;
    }
    b || Vg(this.g, a, !1, !1);
    hi(this, "puid", (this.D + 1).toString(36) + "~" + Date.now().toString(36));
  };
  function ii(a, b) {
    var c = "met." + b.type,
      d = Qc(b.value) ? Math.round(b.value).toString(36) : b.value,
      e = Math.round(b.duration);
    b =
      b.label +
      (b.slotId != null ? "_" + b.slotId : "") +
      ("." + d) +
      (e > 0 ? "_" + e.toString(36) : "") +
      (b.taskId != null ? "__" + Math.round(b.taskId).toString(36) : "");
    ki(a, c, b, !0, "~");
  }
  gi.prototype.F = function (a) {
    this.B && this.D < this.O && (ci.prototype.F.call(this, a), ii(this, a));
  };
  gi.prototype.I = function () {
    ci.prototype.I.call(this);
    this.g.clearTimeout(this.G);
    this.i = this.G = 0;
    this.l = {};
    Pg(this.N);
    Pg(this.C);
    Ug(this.g, "load", this.X);
    Ug(this.g, "pagehide", this.ha);
  };
  function S(a) {
    var b = "Ua";
    if (a.Ua && a.hasOwnProperty(b)) return a.Ua;
    b = new a();
    return (a.Ua = b);
  }
  function mi() {
    this.g = new gi(
      1,
      "https:",
      "csi.gstatic.com",
      "/csi?v=2&s=",
      "ima",
      void 0,
      !0
    );
    if (Oh) var a = Oh;
    else {
      a =
        ((a = a === void 0 ? Ih() : a)
          ? og(a.master)
            ? a.master
            : null
          : null) || window;
      var b = a.google_persistent_state_async;
      a =
        b != null &&
        typeof b == "object" &&
        b.S != null &&
        typeof b.S == "object"
          ? (Oh = b)
          : (a.google_persistent_state_async = Oh = new Jh());
    }
    a = Nh(a);
    a != null && hi(this.g, "c", a);
    a = Math.floor(Number(this.g.C.c) / 2);
    a != null && hi(this.g, "slotId", a);
  }
  mi.prototype.j = function () {
    var a = this.g;
    a.la = !0;
    a.j();
  };
  function ni(a, b, c) {
    if (c != null) {
      a = a.g;
      var d = b + "=" + c;
      a.N[d] || (ki(a, b, c, !1), d.length < 1e3 && (a.N[d] = !0));
    }
  }
  mi.prototype.recordClick = function (a, b, c, d) {
    for (
      var e = !1, f = "notag";
      d != null && d !== document.documentElement;

    ) {
      var g = void 0,
        h = void 0;
      if (
        ((g = d) == null ? 0 : g.getAttribute("data-ck-navigates")) ||
        ((h = d) == null ? 0 : h.getAttribute("data-ck-tag"))
      ) {
        g = f = void 0;
        e =
          (g =
            (f = d) == null ? void 0 : f.getAttribute("data-ck-navigates")) !=
          null
            ? g
            : !1;
        h = g = void 0;
        f =
          (h = (g = d) == null ? void 0 : g.getAttribute("data-ck-tag")) != null
            ? h
            : "notag";
        break;
      }
      g = void 0;
      d = (g = d.parentElement) != null ? g : void 0;
    }
    d = this.g;
    g = Xh();
    d.B && d.F(new Zh(a + "_" + b + "x" + c + "|" + e + "|" + f, 4, g, 0));
  };
  function oi(a) {
    return /^\s*$/.test(a)
      ? !1
      : /^[\],:{}\s\u2028\u2029]*$/.test(
          a
            .replace(/\\["\\\/bfnrtu]/g, "@")
            .replace(
              /(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g,
              "]"
            )
            .replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, "")
        );
  }
  function pi(a) {
    try {
      return C.JSON.parse(a);
    } catch (b) {}
    a = String(a);
    if (oi(a))
      try {
        return eval("(" + a + ")");
      } catch (b) {}
    throw Error("Invalid JSON string: " + a);
  }
  function qi() {
    this.j = null;
    this.g = "missing-id";
    this.i = !1;
  }
  function ri(a) {
    var b = null;
    try {
      b = document.getElementsByClassName("lima-exp-data");
    } catch (c) {
      return si("missing-element", a.g), null;
    }
    if (b.length > 1) return si("multiple-elements", a.g), null;
    b = b[0];
    return b ? b.innerHTML : (si("missing-element", a.g), null);
  }
  function ti() {
    var a = ui,
      b = ri(a);
    if (b !== null)
      if (oi(b)) {
        var c = JSON.parse(b);
        b = c.experimentIds;
        var d = c.binaryIdentifier;
        c = c.adEventId;
        var e = typeof d === "string";
        if (typeof c == "string") {
          var f = S(mi);
          c != null && hi(f.g, "qqid", c);
        }
        e && (a.g = d);
        typeof b !== "string"
          ? si("missing-flags", a.g)
          : (e || si("missing-binary-id", a.g), (a.j = b));
      } else si("invalid-json", a.g);
  }
  qi.prototype.reset = function () {
    this.j = null;
    this.g = "missing-id";
  };
  function vi(a, b) {
    var c = Je(a, sh, 2, re());
    if (!c.length) return wi(a, b);
    a = P(a, 1);
    if (a === 1) {
      var d = vi(c[0], b);
      return d.success ? { success: !0, value: !d.value } : d;
    }
    c = Jb(c, function (h) {
      return vi(h, b);
    });
    switch (a) {
      case 2:
        var e;
        return (e =
          (d = c.find(function (h) {
            return h.success && !h.value;
          })) != null
            ? d
            : c.find(function (h) {
                return !h.success;
              })) != null
          ? e
          : { success: !0, value: !0 };
      case 3:
        var f, g;
        return (g =
          (f = c.find(function (h) {
            return h.success && h.value;
          })) != null
            ? f
            : c.find(function (h) {
                return !h.success;
              })) != null
          ? g
          : { success: !0, value: !1 };
      default:
        return { success: !1, U: 3 };
    }
  }
  function wi(a, b) {
    var c = Ee(a, th);
    a: {
      switch (c) {
        case 3:
          var d = Se(a, 3, th);
          break a;
        case 4:
          d = Se(a, 4, th);
          break a;
        case 5:
          d = Se(a, 5, th);
          break a;
      }
      d = void 0;
    }
    if (!d) return { success: !1, U: 2 };
    b = (b = b[c]) && b[d];
    if (!b) return { success: !1, qa: d, va: c, U: 1 };
    try {
      var e = b.apply;
      var f = se(a, 8, Md, re());
      var g = e.call(b, null, z(f));
    } catch (h) {
      return { success: !1, qa: d, va: c, U: 2 };
    }
    e = P(a, 1);
    if (e === 4) return { success: !0, value: !!g };
    if (e === 5) return { success: !0, value: g != null };
    if (e === 12) a = O(a, De(a, uh, 7));
    else
      a: {
        switch (c) {
          case 4:
            a = Re(a, De(a, uh, 6));
            break a;
          case 5:
            a = O(a, De(a, uh, 7));
            break a;
        }
        a = void 0;
      }
    if (a == null) return { success: !1, qa: d, va: c, U: 3 };
    if (e === 6) return { success: !0, value: g === a };
    if (e === 9)
      return { success: !0, value: g != null && vb(String(g), a) === 0 };
    if (g == null) return { success: !1, qa: d, va: c, U: 4 };
    switch (e) {
      case 7:
        c = g < a;
        break;
      case 8:
        c = g > a;
        break;
      case 12:
        c = Rc(a) && Rc(g) && new RegExp(a).test(g);
        break;
      case 10:
        c = g != null && vb(String(g), a) === -1;
        break;
      case 11:
        c = g != null && vb(String(g), a) === 1;
        break;
      default:
        return { success: !1, U: 3 };
    }
    return { success: !0, value: c };
  }
  function xi(a, b) {
    return a
      ? b
        ? vi(a, b)
        : { success: !1, U: 1 }
      : { success: !0, value: !0 };
  }
  function Ie(a) {
    this.u = G(a);
  }
  w(Ie, R);
  function yi(a) {
    return se(a, 4, Md, re());
  }
  function zi(a) {
    this.u = G(a);
  }
  w(zi, R);
  zi.prototype.getValue = function () {
    return K(this, Ie, 2);
  };
  function Ai(a) {
    this.u = G(a);
  }
  w(Ai, R);
  function Bi(a) {
    var b = Ie;
    me(a);
    a = a.u;
    var c = a[E] | 0,
      d = qe(a, 4),
      e = void 0 === Mc;
    b = Pd(d, b, !e, c);
    !e || b
      ? ((b = ke(b)), d !== b && ((c = I(a, c, 4, b)), ne(a, c)))
      : (b = void 0);
    return b;
  }
  var Ci = (function (a) {
      return function (b) {
        if (b == null || b == "") b = new a();
        else {
          b = JSON.parse(b);
          if (!Array.isArray(b)) throw Error("dnarr");
          Gc(b, 32);
          b = new a(b);
        }
        return b;
      };
    })(Ai),
    Di = [1, 2, 3, 6, 7, 8];
  function Ei(a, b, c) {
    var d = d === void 0 ? new Hh(6, "unknown", b) : d;
    this.A = a;
    this.l = c;
    this.i = d;
    this.g = [];
    this.j = a > 0 && Fg() < 1 / a;
  }
  function Fi(a, b, c, d, e, f) {
    if (a.j) {
      var g = eh(dh(new ch(), b), c);
      b = mh(jh(ih(lh(kh(new hh(), d), e), g), a.g.slice()), f);
      b = yh(b);
      a.i.Ga(Gi(a, b));
      if (
        f === 1 ||
        f === 3 ||
        (f === 4 &&
          !a.g.some(function (h) {
            return P(h, 1) === P(g, 1) && P(h, 2) === c;
          }))
      )
        a.g.push(g), a.g.length > 100 && a.g.shift();
    }
  }
  function Hi(a, b, c, d) {
    if (a.j) {
      var e = new bh();
      b = H(e, 1, yd(b));
      c = H(b, 2, yd(c));
      d = Ve(c, 3, d);
      c = new xh();
      d = Me(c, 8, zh, d);
      a.i.Ga(Gi(a, d));
    }
  }
  function Ii(a, b, c, d, e) {
    if (a.j) {
      var f = new vh();
      b = Le(f, 1, b);
      c = Ve(b, 2, c);
      d = H(c, 3, yd(d));
      if (e.va === void 0) Xe(d, 4, wh, e.U);
      else
        switch (e.va) {
          case 3:
            c = new qh();
            c = Xe(c, 2, rh, e.qa);
            e = Ve(c, 1, e.U);
            Me(d, 5, wh, e);
            break;
          case 4:
            c = new qh();
            c = Xe(c, 3, rh, e.qa);
            e = Ve(c, 1, e.U);
            Me(d, 5, wh, e);
            break;
          case 5:
            (c = new qh()),
              (c = Xe(c, 4, rh, e.qa)),
              (e = Ve(c, 1, e.U)),
              Me(d, 5, wh, e);
        }
      e = new xh();
      e = Me(e, 9, zh, d);
      a.i.Ga(Gi(a, e));
    }
  }
  function Gi(a, b) {
    var c = Date.now();
    c = Number.isFinite(c) ? Math.round(c) : 0;
    b = ze(b, 1, Hd(c), "0");
    c = Jg();
    b = ze(b, 2, Hd(c), "0");
    return ze(b, 6, Hd(a.A), "0");
  }
  function Ji() {
    var a = {};
    this.V = ((a[3] = {}), (a[4] = {}), (a[5] = {}), a);
  }
  var Ki = /^true$/.test("false");
  function Li(a, b) {
    switch (b) {
      case 1:
        return Se(a, 1, Di);
      case 2:
        return Se(a, 2, Di);
      case 3:
        return Se(a, 3, Di);
      case 6:
        return Se(a, 6, Di);
      case 8:
        return Se(a, 8, Di);
      default:
        return null;
    }
  }
  function Mi(a, b) {
    if (!a) return null;
    switch (b) {
      case 1:
        return Pe(a, 1);
      case 7:
        return O(a, 3);
      case 2:
        return Re(a, 2);
      case 3:
        return O(a, 3);
      case 6:
        return yi(a);
      case 8:
        return yi(a);
      default:
        return null;
    }
  }
  var Ni = qg(function () {
    if (!Ki) return {};
    try {
      var a = a === void 0 ? window : a;
      try {
        var b = a.sessionStorage.getItem("GGDFSSK");
      } catch (c) {
        b = null;
      }
      if (b) return JSON.parse(b);
    } catch (c) {}
    return {};
  });
  function Oi(a, b, c, d) {
    var e = (d = d === void 0 ? 0 : d),
      f,
      g;
    S(Pi).j[e] =
      (g = (f = S(Pi).j[e]) == null ? void 0 : f.add(b)) != null
        ? g
        : new Set().add(b);
    e = Ni();
    if (e[b] != null) return e[b];
    b = Qi(d)[b];
    if (!b) return c;
    b = Ci(JSON.stringify(b));
    b = Ri(b);
    a = Mi(b, a);
    return a != null ? a : c;
  }
  function Ri(a) {
    var b = S(Ji).V;
    if (b && Ee(a, Di) !== 8) {
      var c = Lb(Je(a, zi, 5, re()), function (f) {
        f = xi(K(f, sh, 1), b);
        return f.success && f.value;
      });
      if (c) {
        var d;
        return (d = c.getValue()) != null ? d : null;
      }
    }
    var e;
    return (e = K(a, Ie, 4)) != null ? e : null;
  }
  function Pi() {
    this.i = {};
    this.l = [];
    this.j = {};
    this.g = new Map();
  }
  function Si(a, b, c) {
    return !!Oi(1, a, b === void 0 ? !1 : b, c);
  }
  function Ti(a, b, c) {
    b = b === void 0 ? 0 : b;
    a = Number(Oi(2, a, b, c));
    return isNaN(a) ? b : a;
  }
  function Ui(a, b, c) {
    b = b === void 0 ? "" : b;
    a = Oi(3, a, b, c);
    return Rc(a) ? a : b;
  }
  function Vi(a, b, c) {
    b = b === void 0 ? [] : b;
    a = Oi(6, a, b, c);
    return Array.isArray(a) ? a : b;
  }
  function Wi(a, b, c) {
    b = b === void 0 ? [] : b;
    a = Oi(8, a, b, c);
    return Array.isArray(a) ? a : b;
  }
  function Qi(a) {
    return S(Pi).i[a] || (S(Pi).i[a] = {});
  }
  function Xi(a, b) {
    var c = Qi(b);
    ng(a, function (d, e) {
      if (c[e]) {
        d = Ci(JSON.stringify(d));
        var f = De(d, Di, 8);
        if (wd(pe(d, f)) != null) {
          var g = Ci(JSON.stringify(c[e]));
          f = Bi(d);
          g = yi(He(g));
          Oe(f, g);
        }
        c[e] = $d(d);
      } else c[e] = d;
    });
  }
  function Yi(a, b, c, d, e) {
    e = e === void 0 ? !1 : e;
    var f = [],
      g = [];
    b = x(b);
    for (var h = b.next(); !h.done; h = b.next()) {
      h = h.value;
      for (var k = Qi(h), l = x(a), m = l.next(); !m.done; m = l.next()) {
        m = m.value;
        var p = Ee(m, Di),
          q = Li(m, p);
        if (q) {
          var t = void 0,
            r = void 0,
            v = void 0;
          var y =
            (t =
              (v = S(Pi).g.get(h)) == null
                ? void 0
                : (r = v.get(q)) == null
                ? void 0
                : r.slice(0)) != null
              ? t
              : [];
          a: {
            t = q;
            r = p;
            v = new nh();
            switch (r) {
              case 1:
                Xe(v, 1, oh, t);
                break;
              case 2:
                Xe(v, 2, oh, t);
                break;
              case 3:
                Xe(v, 3, oh, t);
                break;
              case 6:
                Xe(v, 4, oh, t);
                break;
              case 8:
                Xe(v, 6, oh, t);
                break;
              default:
                y = void 0;
                break a;
            }
            Ye(v, 5, y);
            y = v;
          }
          if ((t = y))
            (r = void 0), (t = !((r = S(Pi).j[h]) == null || !r.has(q)));
          t && f.push(y);
          if (p === 8 && k[q])
            (y = Ci(JSON.stringify(k[q]))),
              (p = Bi(m)),
              (y = yi(He(y))),
              Oe(p, y);
          else {
            if ((p = y))
              (t = void 0), (p = !((t = S(Pi).g.get(h)) == null || !t.has(q)));
            p && g.push(y);
          }
          e ||
            ((p = q),
            (y = h),
            (t = d),
            (r = S(Pi)),
            r.g.has(y) || r.g.set(y, new Map()),
            r.g.get(y).has(p) || r.g.get(y).set(p, []),
            t && r.g.get(y).get(p).push(t));
          k[q] = $d(m);
        }
      }
    }
    if (f.length || g.length)
      (a = d != null ? d : void 0),
        c.j &&
          c.l &&
          ((d = new ph()),
          (f = Ne(d, 2, f)),
          (g = Ne(f, 3, g)),
          a && ze(g, 1, yd(a), 0),
          (f = new xh()),
          (g = Me(f, 7, zh, g)),
          c.i.Ga(Gi(c, g)));
  }
  function Zi(a, b) {
    b = Qi(b);
    a = x(a);
    for (var c = a.next(); !c.done; c = a.next()) {
      c = c.value;
      var d = Ci(JSON.stringify(c)),
        e = Ee(d, Di);
      (d = Li(d, e)) && (b[d] || (b[d] = c));
    }
  }
  function $i() {
    return Object.keys(S(Pi).i).map(function (a) {
      return Number(a);
    });
  }
  function aj(a) {
    S(Pi).l.includes(a) || Xi(Qi(4), a);
  }
  function T(a, b, c) {
    c.hasOwnProperty(a) || Object.defineProperty(c, String(a), { value: b });
  }
  function bj(a, b, c) {
    return b[a] || c;
  }
  function cj(a) {
    T(5, Si, a);
    T(6, Ti, a);
    T(7, Ui, a);
    T(8, Vi, a);
    T(17, Wi, a);
    T(13, Zi, a);
    T(15, aj, a);
  }
  function dj(a) {
    T(
      4,
      function (b) {
        S(Ji).V = b;
      },
      a
    );
    T(
      9,
      function (b, c) {
        var d = S(Ji);
        d.V[3][b] == null && (d.V[3][b] = c);
      },
      a
    );
    T(
      10,
      function (b, c) {
        var d = S(Ji);
        d.V[4][b] == null && (d.V[4][b] = c);
      },
      a
    );
    T(
      11,
      function (b, c) {
        var d = S(Ji);
        d.V[5][b] == null && (d.V[5][b] = c);
      },
      a
    );
    T(
      14,
      function (b) {
        for (
          var c = S(Ji), d = x([3, 4, 5]), e = d.next();
          !e.done;
          e = d.next()
        )
          (e = e.value), Object.assign(c.V[e], b[e]);
      },
      a
    );
  }
  function ej(a) {
    a.hasOwnProperty("init-done") ||
      Object.defineProperty(a, "init-done", { value: !0 });
  }
  function fj() {}
  fj.prototype.i = function () {};
  fj.prototype.g = function () {
    return [];
  };
  function gj(a, b, c) {
    a.i = function (d, e) {
      bj(2, b, function () {
        return [];
      })(d, c, e);
    };
    a.g = function (d) {
      return bj(3, b, function () {
        return [];
      })(d != null ? d : c);
    };
  }
  function hj(a, b, c) {
    this.id = a;
    this.o = b;
    this.i = c;
    this.g = !1;
  }
  function ij() {
    this.g = [];
  }
  function jj() {
    this.g = new Map();
    this.i = !1;
    this.l = new ij();
    this.A = new hj(0, 0, !1);
    this.j = [this.l];
  }
  function V(a) {
    var b = kj;
    if (b.i || b.g.has(a.id) || (a.o == null && a.control == null) || a.rc == 0)
      return b.A;
    var c = b.l;
    if (a.control != null)
      for (var d = x(b.j), e = d.next(); !e.done; e = d.next()) {
        if (((e = e.value), e.g.includes(a.control))) {
          c = e;
          break;
        }
      }
    else a.R != null && (c = a.R);
    d = 0;
    a.control != null ? (d = a.control.o) : a.o != null && (d = a.o);
    a = new hj(a.id, d, !!a.sc);
    c.g.push(a);
    b.j.includes(c) || b.j.push(c);
    b.g.set(a.id, a);
    return a;
  }
  function lj() {
    var a = kj;
    a = [].concat(z(a.g.keys())).filter(function (c) {
      c = this.g.get(c);
      return c.g || c.i;
    }, a);
    var b = S(fj).g();
    return [].concat(z(a), z(b));
  }
  function mj(a) {
    var b = kj;
    b.i || (a.g(b.j, b.g), (b.i = !0));
  }
  jj.prototype.reset = function () {
    for (var a = x(this.g), b = a.next(); !b.done; b = a.next())
      (b = x(b.value)), b.next(), (b.next().value.g = !1);
    this.i = !1;
  };
  var kj = new jj();
  function nj() {}
  nj.prototype.g = function (a) {
    a = x(a);
    for (var b = a.next(); !b.done; b = a.next()) {
      var c = 0,
        d = Math.floor(Math.random() * 1e3);
      b = x(b.value.g);
      for (var e = b.next(); !e.done; e = b.next())
        if (((e = e.value), (c += e.o), d < c)) {
          e.g = !0;
          break;
        }
    }
  };
  function oj(a) {
    this.i = a;
  }
  oj.prototype.g = function (a, b) {
    a = x(this.i);
    for (var c = a.next(); !c.done; c = a.next())
      if ((c = b.get(c.value))) c.g = !0;
  };
  function pj(a, b) {
    this.i = a;
    this.j = b;
  }
  w(pj, oj);
  pj.prototype.g = function (a, b) {
    oj.prototype.g.call(this, a, b);
    var c = [];
    a = [];
    for (var d = x(this.i), e = d.next(); !e.done; e = d.next())
      (e = e.value), b.get(e) ? c.push(e) : a.push(e);
    b = c.map(String).join(",") || "0";
    a = a.map(String).join(",") || "0";
    ni(S(mi), "sei", b);
    ni(S(mi), "nsei", a);
    ni(S(mi), "bi", this.j);
  };
  function qj() {
    qi.apply(this, arguments);
  }
  w(qj, qi);
  function si(a, b) {
    var c = S(mi);
    ni(c, "eee", a);
    ni(c, "bi", b);
  }
  function rj() {
    return sj
      .split(",")
      .map(function (a) {
        return parseInt(a, 10);
      })
      .filter(function (a) {
        return !isNaN(a);
      });
  }
  var tj = new ij(),
    uj = new ij(),
    vj = new ij(),
    wj = new ij();
  V({ id: 95342637, o: 0 });
  V({ id: 318475490, o: 0 });
  V({ id: 324123032, o: 0 });
  V({ id: 420706097, o: 10 });
  V({ id: 420706098, o: 10 });
  V({ id: 95342168, o: 10 });
  V({ id: 95342169, o: 10 });
  V({ id: 21062100, o: 0 });
  V({ id: 420706142, o: 0 });
  V({ id: 44745813, o: 0 });
  V({ id: 95355265, o: 0 });
  V({ id: 95382105, o: 0 });
  V({ id: 44746068, o: 0 });
  V({ id: 21064565, o: 0 });
  V({ id: 21064567, o: 0 });
  V({ id: 418572006, o: 10 });
  V({ id: 95338773, o: 10, R: uj });
  V({ id: 95338774, o: 10, R: uj });
  V({ id: 95379566, o: 10 });
  V({ id: 95379567, o: 10 });
  V({ id: 95379969, o: 10 });
  V({ id: 95379970, o: 10 });
  V({ id: 95334214, o: 10 });
  V({ id: 95334215, o: 10 });
  V({ id: 44749839, o: 0 });
  V({ id: 44714743, o: 0 });
  V({ id: 44715336, o: 10 });
  V({ id: 44724516, o: 0 });
  V({ id: 44726389, o: 10 });
  V({ id: 44752711, o: 50 });
  V({ id: 44752052, o: 50 });
  V({ id: 44752657, o: 50 });
  V({ id: 44733246, o: 10 });
  V({ id: 44751889, o: 10 });
  V({ id: 44751890, o: 10 });
  V({ id: 44752995, o: 10 });
  V({ id: 44752996, o: 10 });
  V({ id: 44762627, o: 0 });
  V({ id: 44762628, o: 0 });
  V({ id: 44801479, o: 10, R: tj });
  V({ id: 44801480, o: 10, R: tj });
  V({ id: 44752538, o: 0 });
  V({ id: 44754608, o: 10 });
  V({ id: 44754609, o: 10 });
  V({ id: 44776384, o: 0 });
  V({ id: 44789282, o: 0 });
  V({ id: 95344889, o: 0 });
  V({ id: 95355192, o: 0 });
  V({ id: 95334260, o: 0 });
  V({ id: 95345698, o: 0 });
  V({ id: 95356737, o: 0 });
  V({ id: 75259416, o: 0 });
  V({ id: 75259420, o: 0 });
  V({ id: 318524579, o: 0 });
  V({ id: 75259421, o: 0 });
  V({ id: 45401791, o: 0 });
  V({ id: 44809192, o: 10, R: wj });
  V({ id: 44809193, o: 10, R: wj });
  V({ id: 95320804, o: 10, R: wj });
  V({ id: 95320805, o: 10, R: wj });
  V({ id: 95322027, o: 1e3, R: vj });
  V({ id: 46130031, o: 0 });
  V({ id: 95377441, o: 0 });
  V({ id: 95328713, o: 10 });
  V({ id: 95328714, o: 10 });
  V({ id: 95327848, o: 0 });
  V({ id: 31065644, o: 1 });
  V({ id: 31065645, o: 1 });
  var xj = new ij();
  V({ id: 95331588, o: 0, R: xj });
  V({ id: 95331589, o: 1e3, R: xj });
  V({ id: 95378017, o: 0 });
  V({ id: 95332182, o: 0 });
  V({ id: 95362047, o: 0 });
  V({ id: 95363795, o: 0 });
  var yj = V({ id: 789179015, o: 0 });
  V({ id: 798227501, o: 0 });
  V({ id: 95370886, o: 0 });
  V({ id: 318523523, o: 0 });
  V({ id: 95379050, o: 10 });
  V({ id: 95379051, o: 10 });
  V({ id: 95384695, o: 0 });
  V({ id: 95377619, o: 0 });
  V({ id: 95375469, o: 0 });
  V({ id: 95377624, o: 0 });
  V({ id: 95377999, o: 0 });
  V({ id: 95378020, o: 0 });
  V({ id: 95380703, o: 0 });
  V({ id: 95380704, o: 0 });
  V({ id: 95380705, o: 0 });
  V({ id: 95380706, o: 0 });
  V({ id: 95381228, o: 0 });
  V({ id: 95381292, o: 0 });
  V({ id: 95381710, o: 0 });
  V({ id: 95387020, o: 0 });
  V({ id: 95383022, o: 0 });
  V({ id: 95383023, o: 0 });
  V({ id: 95383131, o: 0 });
  V({ id: 95384180, o: 0 });
  V({ id: 95384591, o: 0 });
  V({ id: 95385927, o: 0 });
  V({ id: 95383286, o: 0 });
  V({ id: 95386938, o: 0 });
  V({ id: 95386939, o: 0 });
  if (
    typeof window !== "undefined" &&
    typeof window.initializeVirtualDom === "undefined"
  ) {
    var ui = S(qj);
    ui.i || (ti(), (ui.i = !0));
    var sj = ui.j,
      zj;
    ui.i || (ti(), (ui.i = !0));
    zj = ui.g;
    if (sj != null) {
      var Aj = new pj(rj(), zj);
      mj(Aj);
    }
  }
  function Bj(a) {
    this.u = G(a);
  }
  w(Bj, R);
  Bj.prototype.getId = function () {
    var a = a === void 0 ? 0 : a;
    var b = zd(pe(this, 1));
    return b != null ? b : a;
  };
  function Cj(a) {
    this.u = G(a);
  }
  w(Cj, R);
  function Dj(a) {
    return Je(a, Bj, 2, re());
  }
  function Ej(a) {
    this.u = G(a);
  }
  w(Ej, R);
  function Fj(a) {
    this.u = G(a);
  }
  w(Fj, R);
  function Gj(a) {
    this.u = G(a);
  }
  w(Gj, R);
  var Hj = (function (a) {
    return function (b) {
      b = JSON.parse(b);
      if (!Array.isArray(b))
        throw Error(
          "Expected jspb data to be an array, got " + Qa(b) + ": " + b
        );
      Gc(b, 34);
      return new a(b);
    };
  })(Gj);
  var Ij;
  function Jj(a) {
    if (a != null) return Kj(a);
  }
  function Kj(a) {
    return cd(a) ? Number(a) : String(a);
  }
  function Lj(a, b) {
    try {
      var c = a.split(".");
      a = C;
      for (var d = 0, e; a != null && d < c.length; d++)
        (e = a), (a = a[c[d]]), typeof a === "function" && (a = e[c[d]]());
      var f = a;
      if (typeof f === b) return f;
    } catch (g) {}
  }
  var Mj = {},
    Nj = {},
    Oj = {},
    Pj = {},
    Qj =
      ((Pj[3] =
        ((Mj[8] = function (a) {
          try {
            return Pa(a) != null;
          } catch (b) {}
        }),
        (Mj[9] = function (a) {
          try {
            var b = Pa(a);
          } catch (c) {
            return;
          }
          if ((a = typeof b === "function"))
            (b = b && b.toString && b.toString()),
              (a = Rc(b) && b.indexOf("[native code]") != -1);
          return a;
        }),
        (Mj[10] = function () {
          return window === window.top;
        }),
        (Mj[6] = function (a, b) {
          b = b ? Number(b) : void 0;
          b = S(fj).g(b);
          return Hb(b, Number(a)) >= 0;
        }),
        (Mj[27] = function (a) {
          a = Lj(a, "boolean");
          return a !== void 0 ? a : void 0;
        }),
        (Mj[60] = function (a) {
          try {
            return !!C.document.querySelector(a);
          } catch (b) {}
        }),
        (Mj[80] = function (a) {
          try {
            return !!C.matchMedia(a).matches;
          } catch (b) {}
        }),
        (Mj[69] = function (a) {
          var b = C.document;
          b = b === void 0 ? document : b;
          var c;
          return !((c = b.featurePolicy) == null || !c.features().includes(a));
        }),
        (Mj[70] = function (a) {
          var b = C.document;
          b = b === void 0 ? document : b;
          var c;
          return !(
            (c = b.featurePolicy) == null || !c.allowedFeatures().includes(a)
          );
        }),
        (Mj[79] = function (a) {
          var b = C.navigator;
          b = b === void 0 ? navigator : b;
          try {
            var c, d;
            var e = !!((c = b.protectedAudience) == null
              ? 0
              : (d = c.queryFeatureSupport) == null
              ? 0
              : d.call(c, a));
          } catch (f) {
            e = !1;
          }
          return e;
        }),
        Mj)),
      (Pj[4] =
        ((Nj[3] = function () {
          return Eg();
        }),
        (Nj[6] = function (a) {
          a = Lj(a, "number");
          return a !== void 0 ? a : void 0;
        }),
        Nj)),
      (Pj[5] =
        ((Oj[2] = function () {
          return window.location.href;
        }),
        (Oj[3] = function () {
          try {
            return window.top.location.hash;
          } catch (a) {
            return "";
          }
        }),
        (Oj[4] = function (a) {
          a = Lj(a, "string");
          return a !== void 0 ? a : void 0;
        }),
        (Oj[12] = function (a) {
          try {
            var b = Lj(a, "string");
            if (b !== void 0) return atob(b);
          } catch (c) {}
        }),
        Oj)),
      Pj);
  function Rj() {
    var a = a === void 0 ? C : a;
    return a.ggeac || (a.ggeac = {});
  }
  function Sj(a) {
    var b = {};
    return Tj(
      ((b[0] = new Map()), (b[1] = new Map()), (b[2] = new Map()), b),
      a
    );
  }
  function Tj(a, b) {
    for (
      var c = new Map(), d = x(a[1].entries()), e = d.next();
      !e.done;
      e = d.next()
    ) {
      var f = x(e.value);
      e = f.next().value;
      f = f.next().value;
      f = f[f.length - 1];
      c.set(e, f.hb + f.cb * f.eb);
    }
    b = x(b);
    for (d = b.next(); !d.done; d = b.next())
      for (
        d = d.value, e = Je(d, Cj, 2, re()), e = x(e), f = e.next();
        !f.done;
        f = e.next()
      )
        if (((f = f.value), Dj(f).length !== 0)) {
          var g = N(f, 8);
          if (P(f, 4) && !P(f, 13) && !P(f, 14)) {
            var h = void 0;
            g = (h = c.get(P(f, 4))) != null ? h : 0;
            h = N(f, 1) * Dj(f).length;
            c.set(P(f, 4), g + h);
          }
          h = [];
          for (var k = 0; k < Dj(f).length; k++) {
            var l = {
              hb: g,
              cb: N(f, 1),
              eb: Dj(f).length,
              Fb: k,
              Ca: P(d, 1),
              Ha: f,
              Y: Dj(f)[k],
            };
            h.push(l);
          }
          Uj(a[2], P(f, 10), h) ||
            Uj(a[1], P(f, 4), h) ||
            Uj(a[0], Dj(f)[0].getId(), h);
        }
    return a;
  }
  function Uj(a, b, c) {
    if (!b) return !1;
    a.has(b) || a.set(b, []);
    var d;
    (d = a.get(b)).push.apply(d, z(c));
    return !0;
  }
  var Vj = RegExp(
    "^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$"
  );
  function Wj(a, b) {
    if (a) {
      a = a.split("&");
      for (var c = 0; c < a.length; c++) {
        var d = a[c].indexOf("="),
          e = null;
        if (d >= 0) {
          var f = a[c].substring(0, d);
          e = a[c].substring(d + 1);
        } else f = a[c];
        b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "");
      }
    }
  }
  var Xj = [12, 13, 20];
  function Yj(a, b, c, d) {
    d = d === void 0 ? {} : d;
    var e = d.Ra === void 0 ? !1 : d.Ra;
    d = d.Lb === void 0 ? [] : d.Lb;
    this.ta = a;
    this.fa = c;
    this.l = {};
    this.Ra = e;
    a = {};
    this.g = ((a[b] = []), (a[4] = []), a);
    this.i = {};
    this.j = {};
    if ((b = Wh()))
      for (b = x(b.split(",") || []), a = b.next(); !a.done; a = b.next())
        (a = Number(a.value)) && (this.i[a] = !0);
    d = x(d);
    for (b = d.next(); !b.done; b = d.next()) this.i[b.value] = !0;
  }
  function Zj(a, b, c, d) {
    var e = [],
      f;
    if ((f = b !== 9)) a.l[b] ? (f = !0) : ((a.l[b] = !0), (f = !1));
    if (f) return Fi(a.fa, b, c, e, [], 4), e;
    f = Xj.includes(b);
    for (
      var g = [], h = [], k = x([0, 1, 2]), l = k.next();
      !l.done;
      l = k.next()
    ) {
      l = l.value;
      for (var m = x(a.ta[l].entries()), p = m.next(); !p.done; p = m.next()) {
        var q = x(p.value);
        p = q.next().value;
        q = q.next().value;
        var t = p,
          r = q;
        p = new fh();
        q = r.filter(function (bb) {
          return bb.Ca === b && a.i[bb.Y.getId()] && ak(a, bb);
        });
        if (q.length)
          for (p = x(q), q = p.next(); !q.done; q = p.next()) h.push(q.value.Y);
        else if (!a.Ra) {
          q = void 0;
          l === 2 ? ((q = d[1]), Xe(p, 2, gh, t)) : (q = d[0]);
          var v = void 0,
            y = void 0;
          q =
            (y = (v = q) == null ? void 0 : v(String(t))) != null
              ? y
              : l === 2 && P(r[0].Ha, 11) === 1
              ? void 0
              : d[0](String(t));
          if (q !== void 0) {
            t = x(r);
            for (r = t.next(); !r.done; r = t.next())
              if (((r = r.value), r.Ca === b)) {
                v = q - r.hb;
                var L = r;
                y = L.cb;
                var Aa = L.eb;
                L = L.Fb;
                v < 0 ||
                  v >= y * Aa ||
                  v % Aa !== L ||
                  !ak(a, r) ||
                  ((v = P(r.Ha, 13)),
                  v !== 0 &&
                    v !== void 0 &&
                    ((y = a.j[String(v)]),
                    y !== void 0 && y !== r.Y.getId()
                      ? Hi(a.fa, a.j[String(v)], r.Y.getId(), v)
                      : (a.j[String(v)] = r.Y.getId())),
                  h.push(r.Y));
              }
            Ee(p, gh) !== 0 && (ze(p, 3, yd(q), 0), g.push(p));
          }
        }
      }
    }
    d = x(h);
    for (h = d.next(); !h.done; h = d.next())
      (h = h.value),
        (k = h.getId()),
        e.push(k),
        bk(a, k, f ? 4 : c),
        Yi(Je(h, Ai, 2, re()), f ? $i() : [c], a.fa, k);
    Fi(a.fa, b, c, e, g, 1);
    return e;
  }
  function bk(a, b, c) {
    a.g[c] || (a.g[c] = []);
    a = a.g[c];
    a.includes(b) || a.push(b);
  }
  function ak(a, b) {
    var c = S(Ji).V,
      d = xi(K(b.Ha, sh, 3), c);
    if (!d.success) return Ii(a.fa, K(b.Ha, sh, 3), b.Ca, b.Y.getId(), d), !1;
    if (!d.value) return !1;
    c = xi(K(b.Y, sh, 3), c);
    return c.success
      ? c.value
        ? !0
        : !1
      : (Ii(a.fa, K(b.Y, sh, 3), b.Ca, b.Y.getId(), c), !1);
  }
  function ck(a, b) {
    b = b
      .map(function (c) {
        return new Ej(c);
      })
      .filter(function (c) {
        return !Xj.includes(P(c, 1));
      });
    a.ta = Tj(a.ta, b);
  }
  function dk(a, b) {
    T(
      1,
      function (c) {
        a.i[c] = !0;
      },
      b
    );
    T(
      2,
      function (c, d, e) {
        return Zj(a, c, d, e);
      },
      b
    );
    T(
      3,
      function (c) {
        return (a.g[c] || []).concat(a.g[4]);
      },
      b
    );
    T(
      12,
      function (c) {
        return void ck(a, c);
      },
      b
    );
    T(
      16,
      function (c, d) {
        return void bk(a, c, d);
      },
      b
    );
  }
  function ek() {
    var a = {};
    this.g = function (b, c) {
      return a[b] != null ? a[b] : c;
    };
    this.i = function (b, c) {
      return a[b] != null ? a[b] : c;
    };
    this.A = function (b, c) {
      return a[b] != null ? a[b] : c;
    };
    this.B = function (b, c) {
      return a[b] != null ? a[b] : c;
    };
    this.l = function (b, c) {
      return a[b] != null ? c.concat(a[b]) : c;
    };
    this.j = function () {};
  }
  function fk(a) {
    return S(ek).g(a.g, a.defaultValue);
  }
  function gk() {
    this.g = function () {};
  }
  function hk(a, b) {
    a.g = bj(14, b, function () {});
  }
  function ik(a) {
    S(gk).g(a);
  }
  var jk, kk, lk, mk, nk, ok;
  function pk(a, b) {
    var c = (b = b === void 0 ? Rj() : b);
    gj(S(fj), c, a);
    qk(b, a);
    a = b;
    hk(S(gk), a);
    S(ek).j();
  }
  function qk(a, b) {
    var c = S(ek);
    c.g = function (d, e) {
      return bj(5, a, function () {
        return !1;
      })(d, e, b);
    };
    c.i = function (d, e) {
      return bj(6, a, function () {
        return 0;
      })(d, e, b);
    };
    c.A = function (d, e) {
      return bj(7, a, function () {
        return "";
      })(d, e, b);
    };
    c.B = function (d, e) {
      return bj(8, a, function () {
        return [];
      })(d, e, b);
    };
    c.l = function (d, e) {
      return bj(17, a, function () {
        return [];
      })(d, e, b);
    };
    c.j = function () {
      bj(15, a, function () {})(b);
    };
  }
  kj.reset();
  mj(new nj());
  var rk =
    Ij ||
    (Ij = Hj(
      "[[[45713128,null,null,[]],[null,745150931,null,[null,1]],[null,749060184,null,[null,128]],[841585769,null,null,[true]],[45761044,null,null,[]],[45722344,null,null,[]],[45706017,null,null,[true]],[45668885,null,null,[]],[45685340,null,null,[]],[45765927,null,null,[]],[45734716,null,null,[]],[45735891,null,null,[]],[45663239,null,null,[]],[45715032,null,null,[true]],[45661356,null,null,[]],[839547366,null,null,[true]],[45676441,null,null,[]],[null,45645574,null,[]],[45688859,null,null,[]],[45656766,null,null,[]],[45710689,null,null,[]],[45710688,null,null,[true]],[45685601,null,null,[]],[null,45685602,null,[null,500]],[null,45767902,null,[null,500]],[45756824,null,null,[]],[45747172,null,null,[]],[775241416,null,null,[]],[781107959,null,null,[]],[781107958,null,null,[]],[792614055,null,null,[]],[781107957,null,null,[]],[45729602,null,null,[]],[45753603,null,null,[]],[45753604,null,null,[]]],[[16,[[1,[[31089630],[31089631,[[45668885,null,null,[true]]]]]],[10,[[31097690],[31097691,[[846355750,null,null,[true]]]]]],[1000,[[95332046]]],[null,[[95332047]]],[10,[[95338769,[[null,45645574,null,[null,1]]]],[95338770,[[null,45645574,null,[null,2]]]]]],[50,[[95345206],[95345207,[[45661356,null,null,[true]]]]]],[1,[[95351425],[95351426,[[45676441,null,null,[true]]]]]],[20,[[95356068],[95356069,[[45685601,null,null,[]],[null,45685602,null,[]]]],[95356070,[[45685601,null,null,[true]],[null,45685602,null,[]]]],[95356071,[[45685601,null,null,[true]],[null,45685602,null,[null,100]]]]]],[1,[[95373378,[[792614055,null,null,[true]]]],[95373379,[[45747172,null,null,[true]],[781107959,null,null,[true]],[792614055,null,null,[true]],[781107957,null,null,[true]]]]]],[10,[[95378629],[95378630,[[45729602,null,null,[true]]]],[95381582,[[45729602,null,null,[true]],[45753603,null,null,[true]]]],[95381583,[[45729602,null,null,[true]],[45753604,null,null,[true]]]]]],[10,[[95382403],[95386528,[[null,45767902,null,[]],[45756824,null,null,[true]]]],[95386532,[[null,45767902,null,[null,100]],[45756824,null,null,[true]]]],[95386533,[[null,45767902,null,[null,300]],[45756824,null,null,[true]]]],[95386534,[[null,45767902,null,[null,500]],[45756824,null,null,[true]]]]]],[null,[[95385117],[95385118,[[45761044,null,null,[true]]]]]],[null,[[95385193],[95385194,[[45765927,null,null,[true]]]]]]]]],null,null,[null,1000,true,1000]]"
    ));
  (function (a) {
    var b = a.ub;
    var c = a.V;
    var d = a.config;
    var e = a.rb === void 0 ? Rj() : a.rb;
    var f = a.Wa === void 0 ? 0 : a.Wa;
    var g =
      a.fa === void 0
        ? new Ei(
            (mk = Jj((jk = K(b, Fj, 5)) == null ? void 0 : Qe(jk, 2))) != null
              ? mk
              : 0,
            (nk = Jj((kk = K(b, Fj, 5)) == null ? void 0 : Qe(kk, 4))) != null
              ? nk
              : 0,
            (ok = (lk = K(b, Fj, 5)) == null ? void 0 : Pe(lk, 3)) != null
              ? ok
              : !1
          )
        : a.fa;
    a = a.ta === void 0 ? Sj(Je(b, Ej, 2, re(Lc))) : a.ta;
    e.hasOwnProperty("init-done")
      ? (bj(12, e, function () {})(
          Je(b, Ej, 2, re()).map(function (h) {
            return $d(h);
          })
        ),
        bj(13, e, function () {})(
          Je(b, Ai, 1, re()).map(function (h) {
            return $d(h);
          }),
          f
        ),
        c && bj(14, e, function () {})(c),
        pk(f, e))
      : (dk(new Yj(a, f, g, d), e),
        cj(e),
        dj(e),
        ej(e),
        pk(f, e),
        Yi(Je(b, Ai, 1, re(Lc)), [f], g, void 0, !0),
        (Ki = Ki || !(!d || !d.uc)),
        ik(Qj),
        c && ik(c));
  })({ ub: ke(rk), Wa: 7 });
  var sk = Jg(),
    tk = {},
    uk =
      ((tk[0] = (function (a) {
        a = a === void 0 ? Fg() : a;
        return function (b) {
          b = b + " + " + a;
          var c = b.length;
          if (c === 0) b = 0;
          else {
            for (var d = 305419896, e = 0; e < c; e++)
              d ^= ((d << 5) + (d >> 2) + b.charCodeAt(e)) & 4294967295;
            b = d > 0 ? d : 4294967296 + d;
          }
          return b % 1e3;
        };
      })(sk)),
      tk);
  S(fj).i(16, uk);
  var vk = document,
    wk = window;
  function xk(a, b) {
    a: {
      var c = vk.querySelector(
        "iframe[src^='//tpc.googlesyndication.com/sodar']"
      );
      try {
        var d;
        if (!(d = c.contentWindow)) {
          if (c.contentDocument) {
            var e = c.contentDocument;
            var f = e ? e.defaultView : window;
          } else f = null;
          d = f;
        }
        var g = d;
        break a;
      } catch (h) {}
      g = null;
    }
    c = {};
    a = ((c["0"] = "3"), (c["10"] = a || ""), (c["11"] = 2), (c["12"] = b), c);
    b =
      (location.protocol.indexOf("https:") == 0 ? "https:" : "http:") +
      "//tpc.googlesyndication.com";
    g && g.postMessage(a, b);
  }
  var yk = oa(["//ep2.adtrafficquality.google/sodar/", ""]),
    zk = oa(["//tpc.googlesyndication.com/sodar/", ""]);
  var Ak = new Date().getTime();
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].reduce(function (
    a,
    b
  ) {
    return a + b;
  });
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].reduce(function (a, b) {
    return a + b;
  });
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].reduce(function (
    a,
    b
  ) {
    return a + b;
  });
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].reduce(function (
    a,
    b
  ) {
    return a + b;
  });
  [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2,
  ].reduce(function (a, b) {
    return a + b;
  });
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].reduce(function (a, b) {
    return a + b;
  });
  Og({
    hc: 0,
    fc: 1,
    bc: 2,
    Wb: 3,
    dc: 4,
    Xb: 5,
    ec: 6,
    Zb: 7,
    ac: 8,
    Vb: 9,
    Yb: 10,
    jc: 11,
  }).map(function (a) {
    return Number(a);
  });
  Og({ lc: 0, mc: 1, kc: 2 }).map(function (a) {
    return Number(a);
  });
  function Bk(a, b) {
    this.g = a;
    this.defaultValue = b === void 0 ? !1 : b;
  }
  var Ck = new Bk(45656766),
    Dk = new Bk(45710689),
    Ek = new Bk(45710688, !0),
    Fk = new Bk(45685601),
    Gk = new (function (a, b) {
      this.g = a;
      this.defaultValue = b === void 0 ? 0 : b;
    })(45685602, 500);
  function Hk() {
    var a = zb();
    return (
      ub(a, "AppleTV") ||
      ub(a, "Apple TV") ||
      ub(a, "CFNetwork") ||
      ub(a, "tvOS")
    );
  }
  function Ik(a) {
    this.j = this.C = this.A = "";
    this.D = null;
    this.l = this.i = "";
    this.B = !1;
    var b;
    a instanceof Ik
      ? ((this.B = a.B),
        Jk(this, a.A),
        (this.C = a.C),
        (this.j = a.j),
        Kk(this, a.D),
        (this.i = a.i),
        Lk(this, Mk(a.g)),
        (this.l = a.l))
      : a && (b = String(a).match(Vj))
      ? ((this.B = !1),
        Jk(this, b[1] || "", !0),
        (this.C = Nk(b[2] || "")),
        (this.j = Nk(b[3] || "", !0)),
        Kk(this, b[4]),
        (this.i = Nk(b[5] || "", !0)),
        Lk(this, b[6] || "", !0),
        (this.l = Nk(b[7] || "")))
      : ((this.B = !1), (this.g = new Ok(null, this.B)));
  }
  Ik.prototype.toString = function () {
    var a = [],
      b = this.A;
    b && a.push(Pk(b, Qk, !0), ":");
    var c = this.j;
    if (c || b == "file")
      a.push("//"),
        (b = this.C) && a.push(Pk(b, Qk, !0), "@"),
        a.push(
          encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")
        ),
        (c = this.D),
        c != null && a.push(":", String(c));
    if ((c = this.i))
      this.j && c.charAt(0) != "/" && a.push("/"),
        a.push(Pk(c, c.charAt(0) == "/" ? Rk : Sk, !0));
    (c = this.g.toString()) && a.push("?", c);
    (c = this.l) && a.push("#", Pk(c, Tk));
    return a.join("");
  };
  Ik.prototype.resolve = function (a) {
    var b = new Ik(this),
      c = !!a.A;
    c ? Jk(b, a.A) : (c = !!a.C);
    c ? (b.C = a.C) : (c = !!a.j);
    c ? (b.j = a.j) : (c = a.D != null);
    var d = a.i;
    if (c) Kk(b, a.D);
    else if ((c = !!a.i)) {
      if (d.charAt(0) != "/")
        if (this.j && !this.i) d = "/" + d;
        else {
          var e = b.i.lastIndexOf("/");
          e != -1 && (d = b.i.slice(0, e + 1) + d);
        }
      e = d;
      if (e == ".." || e == ".") d = "";
      else if (e.indexOf("./") != -1 || e.indexOf("/.") != -1) {
        d = e.lastIndexOf("/", 0) == 0;
        e = e.split("/");
        for (var f = [], g = 0; g < e.length; ) {
          var h = e[g++];
          h == "."
            ? d && g == e.length && f.push("")
            : h == ".."
            ? ((f.length > 1 || (f.length == 1 && f[0] != "")) && f.pop(),
              d && g == e.length && f.push(""))
            : (f.push(h), (d = !0));
        }
        d = f.join("/");
      } else d = e;
    }
    c ? (b.i = d) : (c = a.g.toString() !== "");
    c ? Lk(b, Mk(a.g)) : (c = !!a.l);
    c && (b.l = a.l);
    return b;
  };
  function Jk(a, b, c) {
    a.A = c ? Nk(b, !0) : b;
    a.A && (a.A = a.A.replace(/:$/, ""));
  }
  function Kk(a, b) {
    if (b) {
      b = Number(b);
      if (isNaN(b) || b < 0) throw Error("Bad port number " + b);
      a.D = b;
    } else a.D = null;
  }
  function Lk(a, b, c) {
    b instanceof Ok
      ? ((a.g = b), Uk(a.g, a.B))
      : (c || (b = Pk(b, Vk)), (a.g = new Ok(b, a.B)));
  }
  function Wk(a) {
    return a instanceof Ik ? new Ik(a) : new Ik(a);
  }
  function Nk(a, b) {
    return a
      ? b
        ? decodeURI(a.replace(/%25/g, "%2525"))
        : decodeURIComponent(a)
      : "";
  }
  function Pk(a, b, c) {
    return typeof a === "string"
      ? ((a = encodeURI(a).replace(b, Xk)),
        c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
        a)
      : null;
  }
  function Xk(a) {
    a = a.charCodeAt(0);
    return "%" + ((a >> 4) & 15).toString(16) + (a & 15).toString(16);
  }
  var Qk = /[#\/\?@]/g,
    Sk = /[#\?:]/g,
    Rk = /[#\?]/g,
    Vk = /[#\?@]/g,
    Tk = /#/g;
  function Ok(a, b) {
    this.i = this.g = null;
    this.j = a || null;
    this.l = !!b;
  }
  function Yk(a) {
    a.g ||
      ((a.g = new Map()),
      (a.i = 0),
      a.j &&
        Wj(a.j, function (b, c) {
          a.add(decodeURIComponent(b.replace(/\+/g, " ")), c);
        }));
  }
  n = Ok.prototype;
  n.add = function (a, b) {
    Yk(this);
    this.j = null;
    a = Zk(this, a);
    var c = this.g.get(a);
    c || this.g.set(a, (c = []));
    c.push(b);
    this.i += 1;
    return this;
  };
  function $k(a, b) {
    Yk(a);
    b = Zk(a, b);
    a.g.has(b) && ((a.j = null), (a.i -= a.g.get(b).length), a.g.delete(b));
  }
  n.clear = function () {
    this.g = this.j = null;
    this.i = 0;
  };
  n.isEmpty = function () {
    Yk(this);
    return this.i == 0;
  };
  function al(a, b) {
    Yk(a);
    b = Zk(a, b);
    return a.g.has(b);
  }
  n.forEach = function (a, b) {
    Yk(this);
    this.g.forEach(function (c, d) {
      c.forEach(function (e) {
        a.call(b, e, d, this);
      }, this);
    }, this);
  };
  n.Ta = function (a) {
    Yk(this);
    var b = [];
    if (typeof a === "string")
      al(this, a) && (b = b.concat(this.g.get(Zk(this, a))));
    else {
      a = Array.from(this.g.values());
      for (var c = 0; c < a.length; c++) b = b.concat(a[c]);
    }
    return b;
  };
  n.set = function (a, b) {
    Yk(this);
    this.j = null;
    a = Zk(this, a);
    al(this, a) && (this.i -= this.g.get(a).length);
    this.g.set(a, [b]);
    this.i += 1;
    return this;
  };
  n.get = function (a, b) {
    if (!a) return b;
    a = this.Ta(a);
    return a.length > 0 ? String(a[0]) : b;
  };
  n.toString = function () {
    if (this.j) return this.j;
    if (!this.g) return "";
    for (var a = [], b = Array.from(this.g.keys()), c = 0; c < b.length; c++) {
      var d = b[c],
        e = encodeURIComponent(String(d));
      d = this.Ta(d);
      for (var f = 0; f < d.length; f++) {
        var g = e;
        d[f] !== "" && (g += "=" + encodeURIComponent(String(d[f])));
        a.push(g);
      }
    }
    return (this.j = a.join("&"));
  };
  function Mk(a) {
    var b = new Ok();
    b.j = a.j;
    a.g && ((b.g = new Map(a.g)), (b.i = a.i));
    return b;
  }
  function Zk(a, b) {
    b = String(b);
    a.l && (b = b.toLowerCase());
    return b;
  }
  function Uk(a, b) {
    b &&
      !a.l &&
      (Yk(a),
      (a.j = null),
      a.g.forEach(function (c, d) {
        var e = d.toLowerCase();
        if (d != e && ($k(this, d), $k(this, e), c.length > 0)) {
          this.j = null;
          d = this.g;
          var f = d.set;
          e = Zk(this, e);
          var g = c.length;
          if (g > 0) {
            for (var h = Array(g), k = 0; k < g; k++) h[k] = c[k];
            g = h;
          } else g = [];
          f.call(d, e, g);
          this.i += c.length;
        }
      }, a));
    a.l = b;
  }
  var bl =
      "ad.doubleclick.net bid.g.doubleclick.net ggpht.com google.co.uk google.com googleads.g.doubleclick.net googleads4.g.doubleclick.net googleadservices.com googlesyndication.com googleusercontent.com gstatic.com gvt1.com prod.google.com pubads.g.doubleclick.net s0.2mdn.net static.doubleclick.net surveys.g.doubleclick.net youtube.com ytimg.com".split(
        " "
      ),
    cl = ["c.googlesyndication.com"];
  function dl(a, b) {
    b = b === void 0 ? window.location.protocol : b;
    var c = !1;
    a == null ||
    !a.startsWith("http") ||
    (a == null ? 0 : a.startsWith("https"))
      ? (c = !1)
      : el(a, cl)
      ? (c = !1)
      : b.includes("https") && el(a, bl) && (c = !0);
    return c
      ? ((a = new Ik(a)), ni(S(mi), "htp", "1"), Jk(a, "https"), a.toString())
      : a;
  }
  function el(a, b) {
    return new RegExp(
      "^https?://([a-z0-9-]{1,63}\\.)*(" +
        b.join("|").replace(/\./g, "\\.") +
        ")(:[0-9]+)?([/?#]|$)",
      "i"
    ).test(a);
  }
  var fl =
      "://secure-...imrworldwide.com/ ://cdn.imrworldwide.com/ ://aksecure.imrworldwide.com/ ://[^.]*.moatads.com ://youtube[0-9]+.moatpixel.com ://pm.adsafeprotected.com/youtube ://pm.test-adsafeprotected.com/youtube ://e[0-9]+.yt.srs.doubleverify.com www.google.com/pagead/xsul www.youtube.com/pagead/slav".split(
        " "
      ),
    gl = /\bocr\b/;
  function hl(a) {
    if (lb(a == null ? "" : String(a)) || (Pb && a.length > 2048)) return !1;
    try {
      if (new Ik(a).l.match(gl)) return !0;
    } catch (b) {}
    return (
      fl.find(function (b) {
        return a.match(b) != null;
      }) != null
    );
  }
  function il(a) {
    var b = [""];
    if (!a) return null;
    a = a.toLowerCase().replace("-", "_");
    if (b.includes(a)) return a;
    a = (a = a.match(/^\w{2,3}([-_]|$)/)) ? a[0].replace(/[_-]/g, "") : "";
    return b.includes(a) ? a : null;
  }
  function jl() {
    this.g = Date.now();
  }
  jl.prototype.reset = function () {
    this.g = Date.now();
  };
  function kl(a) {
    a = a.g + 5e3 - Date.now();
    return a > 0 ? a : 0;
  }
  function ll(a) {
    this.url = a;
  }
  function ml(a) {
    switch (a) {
      case 0:
        return "No Error";
      case 1:
        return "Access denied to content document";
      case 2:
        return "File not found";
      case 3:
        return "Firefox silently errored";
      case 4:
        return "Application custom error";
      case 5:
        return "An exception occurred";
      case 6:
        return "Http response at 400 or 500 level";
      case 7:
        return "Request was aborted";
      case 8:
        return "Request timed out";
      case 9:
        return "The resource is not available offline";
      default:
        return "Unrecognized error code";
    }
  }
  function nl(a, b) {
    a = Error.call(this, a);
    this.message = a.message;
    "stack" in a && (this.stack = a.stack);
    this.g = b;
  }
  w(nl, Error);
  function ol(a) {
    a && typeof a.dispose == "function" && a.dispose();
  }
  function pl() {
    this.B = this.B;
    this.A = this.A;
  }
  pl.prototype.B = !1;
  pl.prototype.dispose = function () {
    this.B || ((this.B = !0), this.T());
  };
  pl.prototype[Symbol.dispose] = function () {
    this.dispose();
  };
  function ql(a, b) {
    a.B ? b() : (a.A || (a.A = []), a.A.push(b));
  }
  pl.prototype.T = function () {
    if (this.A) for (; this.A.length; ) this.A.shift()();
  };
  function rl(a, b) {
    this.type = a;
    this.currentTarget = this.target = b;
    this.defaultPrevented = !1;
  }
  rl.prototype.preventDefault = function () {
    this.defaultPrevented = !0;
  };
  function sl(a, b) {
    rl.call(this, a ? a.type : "");
    this.relatedTarget = this.currentTarget = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
    this.key = "";
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.state = null;
    this.pointerId = 0;
    this.pointerType = "";
    this.g = null;
    a && this.init(a, b);
  }
  Za(sl, rl);
  sl.prototype.init = function (a, b) {
    var c = (this.type = a.type),
      d =
        a.changedTouches && a.changedTouches.length
          ? a.changedTouches[0]
          : null;
    this.target = a.target || a.srcElement;
    this.currentTarget = b;
    b = a.relatedTarget;
    b ||
      (c == "mouseover"
        ? (b = a.fromElement)
        : c == "mouseout" && (b = a.toElement));
    this.relatedTarget = b;
    d
      ? ((this.clientX = d.clientX !== void 0 ? d.clientX : d.pageX),
        (this.clientY = d.clientY !== void 0 ? d.clientY : d.pageY),
        (this.screenX = d.screenX || 0),
        (this.screenY = d.screenY || 0))
      : ((this.clientX = a.clientX !== void 0 ? a.clientX : a.pageX),
        (this.clientY = a.clientY !== void 0 ? a.clientY : a.pageY),
        (this.screenX = a.screenX || 0),
        (this.screenY = a.screenY || 0));
    this.button = a.button;
    this.key = a.key || "";
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.pointerId = a.pointerId || 0;
    this.pointerType = a.pointerType;
    this.state = a.state;
    this.g = a;
    a.defaultPrevented && sl.ka.preventDefault.call(this);
  };
  sl.prototype.preventDefault = function () {
    sl.ka.preventDefault.call(this);
    var a = this.g;
    a.preventDefault ? a.preventDefault() : (a.returnValue = !1);
  };
  var tl = "closure_listenable_" + ((Math.random() * 1e6) | 0);
  var ul = 0;
  function vl(a, b, c, d, e) {
    this.listener = a;
    this.proxy = null;
    this.src = b;
    this.type = c;
    this.capture = !!d;
    this.handler = e;
    this.key = ++ul;
    this.wa = this.Aa = !1;
  }
  function wl(a) {
    a.wa = !0;
    a.listener = null;
    a.proxy = null;
    a.src = null;
    a.handler = null;
  }
  function xl(a) {
    this.src = a;
    this.g = {};
    this.i = 0;
  }
  xl.prototype.add = function (a, b, c, d, e) {
    var f = a.toString();
    a = this.g[f];
    a || ((a = this.g[f] = []), this.i++);
    var g = yl(a, b, d, e);
    g > -1
      ? ((b = a[g]), c || (b.Aa = !1))
      : ((b = new vl(b, this.src, f, !!d, e)), (b.Aa = c), a.push(b));
    return b;
  };
  function zl(a, b) {
    var c = b.type;
    c in a.g &&
      Mb(a.g[c], b) &&
      (wl(b), a.g[c].length == 0 && (delete a.g[c], a.i--));
  }
  function yl(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
      var f = a[e];
      if (!f.wa && f.listener == b && f.capture == !!c && f.handler == d)
        return e;
    }
    return -1;
  }
  var Al = "closure_lm_" + ((Math.random() * 1e6) | 0),
    Bl = {},
    Cl = 0;
  function Dl(a, b, c, d, e) {
    if (d && d.once) return El(a, b, c, d, e);
    if (Array.isArray(b)) {
      for (var f = 0; f < b.length; f++) Dl(a, b[f], c, d, e);
      return null;
    }
    c = Fl(c);
    return a && a[tl]
      ? a.listen(b, c, Ra(d) ? !!d.capture : !!d, e)
      : Gl(a, b, c, !1, d, e);
  }
  function Gl(a, b, c, d, e, f) {
    if (!b) throw Error("Invalid event type");
    var g = Ra(e) ? !!e.capture : !!e,
      h = Hl(a);
    h || (a[Al] = h = new xl(a));
    c = h.add(b, c, d, g, f);
    if (c.proxy) return c;
    d = Il();
    c.proxy = d;
    d.src = a;
    d.listener = c;
    if (a.addEventListener)
      Mg || (e = g),
        e === void 0 && (e = !1),
        a.addEventListener(b.toString(), d, e);
    else if (a.attachEvent) a.attachEvent(Jl(b.toString()), d);
    else if (a.addListener && a.removeListener) a.addListener(d);
    else throw Error("addEventListener and attachEvent are unavailable.");
    Cl++;
    return c;
  }
  function Il() {
    function a(c) {
      return b.call(a.src, a.listener, c);
    }
    var b = Kl;
    return a;
  }
  function El(a, b, c, d, e) {
    if (Array.isArray(b)) {
      for (var f = 0; f < b.length; f++) El(a, b[f], c, d, e);
      return null;
    }
    c = Fl(c);
    return a && a[tl]
      ? a.j.add(String(b), c, !0, Ra(d) ? !!d.capture : !!d, e)
      : Gl(a, b, c, !0, d, e);
  }
  function Ll(a, b, c, d, e) {
    if (Array.isArray(b))
      for (var f = 0; f < b.length; f++) Ll(a, b[f], c, d, e);
    else
      ((d = Ra(d) ? !!d.capture : !!d), (c = Fl(c)), a && a[tl])
        ? ((a = a.j),
          (b = String(b).toString()),
          b in a.g &&
            ((f = a.g[b]),
            (c = yl(f, c, d, e)),
            c > -1 &&
              (wl(f[c]),
              Array.prototype.splice.call(f, c, 1),
              f.length == 0 && (delete a.g[b], a.i--))))
        : a &&
          (a = Hl(a)) &&
          ((b = a.g[b.toString()]),
          (a = -1),
          b && (a = yl(b, c, d, e)),
          (c = a > -1 ? b[a] : null) && Ml(c));
  }
  function Ml(a) {
    if (typeof a !== "number" && a && !a.wa) {
      var b = a.src;
      if (b && b[tl]) zl(b.j, a);
      else {
        var c = a.type,
          d = a.proxy;
        b.removeEventListener
          ? b.removeEventListener(c, d, a.capture)
          : b.detachEvent
          ? b.detachEvent(Jl(c), d)
          : b.addListener && b.removeListener && b.removeListener(d);
        Cl--;
        (c = Hl(b))
          ? (zl(c, a), c.i == 0 && ((c.src = null), (b[Al] = null)))
          : wl(a);
      }
    }
  }
  function Jl(a) {
    return a in Bl ? Bl[a] : (Bl[a] = "on" + a);
  }
  function Kl(a, b) {
    if (a.wa) a = !0;
    else {
      b = new sl(b, this);
      var c = a.listener,
        d = a.handler || a.src;
      a.Aa && Ml(a);
      a = c.call(d, b);
    }
    return a;
  }
  function Hl(a) {
    a = a[Al];
    return a instanceof xl ? a : null;
  }
  var Nl = "__closure_events_fn_" + ((Math.random() * 1e9) >>> 0);
  function Fl(a) {
    if (typeof a === "function") return a;
    a[Nl] ||
      (a[Nl] = function (b) {
        return a.handleEvent(b);
      });
    return a[Nl];
  }
  function Ol(a) {
    pl.call(this);
    this.i = a;
    this.g = {};
  }
  Za(Ol, pl);
  var Pl = [];
  Ol.prototype.listen = function (a, b, c, d) {
    Array.isArray(b) || (b && (Pl[0] = b.toString()), (b = Pl));
    for (var e = 0; e < b.length; e++) {
      var f = Dl(a, b[e], c || this.handleEvent, d || !1, this.i || this);
      if (!f) break;
      this.g[f.key] = f;
    }
    return this;
  };
  function Ql(a, b, c, d) {
    Rl(a, b, c, d);
  }
  function Rl(a, b, c, d, e, f) {
    if (Array.isArray(c))
      for (var g = 0; g < c.length; g++) Rl(a, b, c[g], d, e, f);
    else
      (b = El(b, c, d || a.handleEvent, e, f || a.i || a)) && (a.g[b.key] = b);
  }
  function Sl(a) {
    Ng(
      a.g,
      function (b, c) {
        this.g.hasOwnProperty(c) && Ml(b);
      },
      a
    );
    a.g = {};
  }
  Ol.prototype.T = function () {
    Ol.ka.T.call(this);
    Sl(this);
  };
  Ol.prototype.handleEvent = function () {
    throw Error("EventHandler.handleEvent not implemented");
  };
  var Tl =
    typeof AsyncContext !== "undefined" &&
    typeof AsyncContext.Snapshot === "function"
      ? function (a) {
          return a && AsyncContext.Snapshot.wrap(a);
        }
      : function (a) {
          return a;
        };
  function Ul() {
    pl.call(this);
    this.j = new xl(this);
    this.la = this;
    this.N = null;
  }
  Za(Ul, pl);
  Ul.prototype[tl] = !0;
  n = Ul.prototype;
  n.addEventListener = function (a, b, c, d) {
    Dl(this, a, b, c, d);
  };
  n.removeEventListener = function (a, b, c, d) {
    Ll(this, a, b, c, d);
  };
  n.dispatchEvent = function (a) {
    var b,
      c = this.N;
    if (c) for (b = []; c; c = c.N) b.push(c);
    c = this.la;
    var d = a.type || a;
    if (typeof a === "string") a = new rl(a, c);
    else if (a instanceof rl) a.target = a.target || c;
    else {
      var e = a;
      a = new rl(d, c);
      Rg(a, e);
    }
    e = !0;
    var f;
    if (b)
      for (f = b.length - 1; f >= 0; f--) {
        var g = (a.currentTarget = b[f]);
        e = Vl(g, d, !0, a) && e;
      }
    g = a.currentTarget = c;
    e = Vl(g, d, !0, a) && e;
    e = Vl(g, d, !1, a) && e;
    if (b)
      for (f = 0; f < b.length; f++)
        (g = a.currentTarget = b[f]), (e = Vl(g, d, !1, a) && e);
    return e;
  };
  n.T = function () {
    Ul.ka.T.call(this);
    if (this.j) {
      var a = this.j,
        b = 0,
        c;
      for (c in a.g) {
        for (var d = a.g[c], e = 0; e < d.length; e++) ++b, wl(d[e]);
        delete a.g[c];
        a.i--;
      }
    }
    this.N = null;
  };
  n.listen = function (a, b, c, d) {
    return this.j.add(String(a), b, !1, c, d);
  };
  function Vl(a, b, c, d) {
    b = a.j.g[String(b)];
    if (!b) return !0;
    b = b.concat();
    for (var e = !0, f = 0; f < b.length; ++f) {
      var g = b[f];
      if (g && !g.wa && g.capture == c) {
        var h = g.listener,
          k = g.handler || g.src;
        g.Aa && zl(a.j, g);
        e = h.call(k, d) !== !1 && e;
      }
    }
    return e && !d.defaultPrevented;
  }
  function Wl() {
    Ul.call(this);
    this.headers = new Map();
    this.i = !1;
    this.g = null;
    this.J = "";
    this.C = 0;
    this.l = this.I = this.D = this.G = !1;
    this.O = 0;
    this.F = null;
    this.ha = "";
    this.X = !1;
  }
  Za(Wl, Ul);
  var Xl = /^https?$/i,
    Yl = ["POST", "PUT"];
  function Zl(a, b, c, d) {
    if (a.g)
      throw Error(
        "[goog.net.XhrIo] Object is active with another request=" +
          a.J +
          "; newUri=" +
          b
      );
    c = c ? c.toUpperCase() : "GET";
    a.J = b;
    a.C = 0;
    a.G = !1;
    a.i = !0;
    a.g = new XMLHttpRequest();
    a.g.onreadystatechange = Tl(Ua(a.fb, a));
    try {
      (a.I = !0), a.g.open(c, String(b), !0), (a.I = !1);
    } catch (g) {
      $l(a);
      return;
    }
    b = d || "";
    d = new Map(a.headers);
    var e = Array.from(d.keys()).find(function (g) {
        return "content-type" == g.toLowerCase();
      }),
      f = C.FormData && b instanceof C.FormData;
    !(Hb(Yl, c) >= 0) ||
      e ||
      f ||
      d.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
    c = x(d);
    for (d = c.next(); !d.done; d = c.next())
      (e = x(d.value)),
        (d = e.next().value),
        (e = e.next().value),
        a.g.setRequestHeader(d, e);
    a.ha && (a.g.responseType = a.ha);
    "withCredentials" in a.g &&
      a.g.withCredentials !== a.X &&
      (a.g.withCredentials = a.X);
    try {
      am(a),
        a.O > 0 && (a.F = setTimeout(a.Pb.bind(a), a.O)),
        (a.D = !0),
        a.g.send(b),
        (a.D = !1);
    } catch (g) {
      $l(a);
    }
  }
  n = Wl.prototype;
  n.Pb = function () {
    typeof Na != "undefined" &&
      this.g &&
      ((this.C = 8), this.dispatchEvent("timeout"), this.abort(8));
  };
  function $l(a) {
    a.i = !1;
    a.g && ((a.l = !0), a.g.abort(), (a.l = !1));
    a.C = 5;
    bm(a);
    cm(a);
  }
  function bm(a) {
    a.G || ((a.G = !0), a.dispatchEvent("complete"), a.dispatchEvent("error"));
  }
  n.abort = function (a) {
    this.g &&
      this.i &&
      ((this.i = !1),
      (this.l = !0),
      this.g.abort(),
      (this.l = !1),
      (this.C = a || 7),
      this.dispatchEvent("complete"),
      this.dispatchEvent("abort"),
      cm(this));
  };
  n.T = function () {
    this.g &&
      (this.i && ((this.i = !1), (this.l = !0), this.g.abort(), (this.l = !1)),
      cm(this, !0));
    Wl.ka.T.call(this);
  };
  n.fb = function () {
    this.B || (this.I || this.D || this.l ? dm(this) : this.Hb());
  };
  n.Hb = function () {
    dm(this);
  };
  function dm(a) {
    if (a.i && typeof Na != "undefined")
      if (a.D && (a.g ? a.g.readyState : 0) == 4) setTimeout(a.fb.bind(a), 0);
      else if (
        (a.dispatchEvent("readystatechange"), (a.g ? a.g.readyState : 0) == 4)
      ) {
        a.i = !1;
        try {
          var b = em(a);
          a: switch (b) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
              var c = !0;
              break a;
            default:
              c = !1;
          }
          var d;
          if (!(d = c)) {
            var e;
            if ((e = b === 0)) {
              var f = String(a.J).match(Vj)[1] || null;
              !f &&
                C.self &&
                C.self.location &&
                (f = C.self.location.protocol.slice(0, -1));
              e = !Xl.test(f ? f.toLowerCase() : "");
            }
            d = e;
          }
          d
            ? (a.dispatchEvent("complete"), a.dispatchEvent("success"))
            : ((a.C = 6), bm(a));
        } finally {
          cm(a);
        }
      }
  }
  function cm(a, b) {
    if (a.g) {
      am(a);
      var c = a.g;
      a.g = null;
      b || a.dispatchEvent("ready");
      try {
        c.onreadystatechange = null;
      } catch (d) {}
    }
  }
  function am(a) {
    a.F && (clearTimeout(a.F), (a.F = null));
  }
  n.isActive = function () {
    return !!this.g;
  };
  function em(a) {
    try {
      return (a.g ? a.g.readyState : 0) > 2 ? a.g.status : -1;
    } catch (b) {
      return -1;
    }
  }
  function fm(a) {
    if (a.g) {
      a: {
        a = a.g.responseText;
        if (C.JSON)
          try {
            var b = C.JSON.parse(a);
            break a;
          } catch (c) {}
        b = pi(a);
      }
      return b;
    }
  }
  function gm() {}
  gm.prototype.get = function (a) {
    return hm({
      url: a.url,
      timeout: a.timeout,
      withCredentials: a.withCredentials === void 0 ? !0 : a.withCredentials,
      method: "GET",
      headers: a.headers === void 0 ? {} : a.headers,
    });
  };
  function hm(a) {
    var b = a.url;
    var c = a.timeout;
    var d = a.withCredentials;
    var e = a.method;
    var f = a.content === void 0 ? void 0 : a.content;
    var g = a.headers === void 0 ? {} : a.headers;
    return im({
      url: b,
      timeout: c,
      withCredentials: d,
      method: e,
      content: f,
      headers: g,
    }).then(
      function (h) {
        return Promise.resolve(h);
      },
      function (h) {
        return h instanceof Error && h.message == 6 && d
          ? im({
              url: b,
              timeout: c,
              withCredentials: !d,
              method: e,
              content: f,
              headers: g,
            })
          : Promise.reject(h);
      }
    );
  }
  function im(a) {
    var b = a.url;
    var c = a.timeout;
    var d = a.withCredentials;
    var e = a.method;
    var f = a.content === void 0 ? void 0 : a.content;
    a = a.headers === void 0 ? {} : a.headers;
    var g = new Wl();
    g.X = d;
    g.O = Math.max(0, kl(c));
    for (var h in a) g.headers.set(h, a[h]);
    var k = new Ol();
    return new Promise(function (l, m) {
      Ql(k, g, "success", function () {
        a: {
          if (Hk())
            try {
              fm(g);
              var p = "application/json";
              break a;
            } catch (r) {
              p = "application/xml";
              break a;
            }
          g.g && (g.g ? g.g.readyState : 0) == 4
            ? ((p = g.g.getResponseHeader("Content-Type")),
              (p = p === null ? void 0 : p))
            : (p = void 0);
          p = p || "";
        }
        if (p.indexOf("application/json") != -1)
          try {
            l(fm(g) || {});
          } catch (r) {
            m(new nl(5, em(g)));
          }
        else {
          try {
            var q = g.g ? g.g.responseXML : null;
          } catch (r) {
            q = null;
          }
          if (q == null) {
            try {
              var t = g.g ? g.g.responseText : "";
            } catch (r) {
              t = "";
            }
            if (typeof DOMParser != "undefined") {
              q = new DOMParser();
              t = t === null ? "null" : t === void 0 ? "undefined" : t;
              t = (p = xg()) ? p.createHTML(t) : t;
              p = new Ag(t);
              t = q.parseFromString;
              if (p instanceof Ag) p = p.g;
              else throw Error("");
              q = t.call(q, p, "application/xml");
            } else
              throw Error(
                "Your browser does not support loading xml documents"
              );
          }
          l(q);
        }
        k.dispose();
        g.dispose();
      });
      Ql(k, g, ["error", "timeout"], function () {
        m(new nl(g.C, em(g)));
        k.dispose();
        g.dispose();
      });
      Zl(g, dl(b), e, f);
    });
  }
  Xa("google.javascript.ads.imalib.common.UrlLoader", gm);
  function jm() {
    var a = this;
    this.promise = new Promise(function (b, c) {
      a.resolve = b;
      a.reject = c;
    });
  }
  function km(a, b) {
    var c = !1,
      d = !1;
    c = c === void 0 ? !1 : c;
    d = d === void 0 ? !1 : d;
    B(function (e) {
      if (e.j == 1) {
        e.C(2);
        b = d ? dl(b, "https") : dl(b);
        c = c || hl(b);
        if (a.i) e = e.g(lm(a, b, c), 5);
        else {
          var f = e.g;
          var g = b;
          var h = c;
          g = Hk() ? mm(g) : nm(a, g, h);
          e = f.call(e, g, 5);
        }
        return e;
      }
      if (e.j != 2) return e.G(0);
      e.A();
      e.J();
    });
  }
  function om(a) {
    var b = {
      keepalive: !0,
      method: "get",
      redirect: "follow",
      credentials: "include",
    };
    a && (b.referrerPolicy = "no-referrer");
    b.mode = "no-cors";
    return b;
  }
  function lm(a, b, c) {
    var d, e, f, g, h, k;
    return B(function (l) {
      if (l.j == 1)
        return (
          ni(S(mi), "faa", "1"),
          (d = om(c)),
          (e = fetch(b, d).then(
            function (m) {
              ni(S(mi), "fas", "1");
              if ((yj.g || yj.i) && b.includes("/pagead/adview")) {
                var p = window,
                  q = {};
                if ((m = m.headers.get("X-Ad-Event-Value")))
                  try {
                    var t = JSON.parse(m);
                    q.revenueCurrency = t.currency;
                    q.revenueMicros = t.value;
                    var r = p.parent;
                    q.googMsgType = "aevi";
                    r.postMessage(JSON.stringify(q), "*");
                  } catch (v) {}
              }
            },
            function () {
              ni(S(mi), "faf", "1");
              a.i = !1;
              return Hk() ? mm(b) : nm(a, b, c);
            }
          )),
          (f = x),
          l.g(Promise.allSettled([e]), 2)
        );
      g = f(l.i);
      k = h = g.next().value;
      if (k.status === "rejected") throw Error(k.reason);
      l.J();
    });
  }
  function nm(a, b, c) {
    var d = new jm(),
      e = Lg("IMG", window.document),
      f = (a.j++).toString();
    a.g.set(f, e);
    e.addEventListener("load", function () {
      a.g.delete(f);
      d.resolve();
    });
    e.addEventListener("error", function (g) {
      a.g.delete(f);
      d.reject(g);
    });
    c && (e.referrerPolicy = "no-referrer");
    e.src = b;
    return d.promise;
  }
  function mm(a) {
    var b;
    return B(function (c) {
      b = new gm();
      return c.g(b.get({ url: a, timeout: new jl() }), 0);
    });
  }
  var pm = {
    oc: "IABUSPrivacy_String",
    Ub: "IABTCF_gdprApplies",
    nc: "IABTCF_TCString",
    Tb: "IABTCF_AddtlConsent",
    Sb: "IABGPP_HDR_GppString",
    Rb: "IABGPP_GppSID",
  };
  var qm = oa(["https://imasdk.googleapis.com/js/sdkloader/car.js"]);
  Kg(qm);
  var rm = RegExp("^https?://(\\w|-)+\\.cdn\\.ampproject\\.(net|org)(\\?|/|$)");
  function sm(a) {
    a = a || tm();
    for (
      var b = new um(C.location.href, !1), c = null, d = a.length - 1, e = d;
      e >= 0;
      --e
    ) {
      var f = a[e];
      !c && rm.test(f.url) && (c = f);
      if (f.url && !f.g) {
        b = f;
        break;
      }
    }
    e = null;
    f = a.length && a[d].url;
    b.depth !== 0 && f && (e = a[d]);
    return new vm(b, e, c);
  }
  function tm() {
    var a = C,
      b = [],
      c = null;
    do {
      var d = a;
      if (og(d)) {
        var e = d.location.href;
        c = (d.document && d.document.referrer) || null;
      } else (e = c), (c = null);
      b.push(new um(e || ""));
      try {
        a = d.parent;
      } catch (f) {
        a = null;
      }
    } while (a && d !== a);
    d = 0;
    for (a = b.length - 1; d <= a; ++d) b[d].depth = a - d;
    d = C;
    if (
      d.location &&
      d.location.ancestorOrigins &&
      d.location.ancestorOrigins.length === b.length - 1
    )
      for (a = 1; a < b.length; ++a)
        (e = b[a]),
          e.url ||
            ((e.url = d.location.ancestorOrigins[a - 1] || ""), (e.g = !0));
    return b;
  }
  function vm(a, b, c) {
    this.i = a;
    this.j = b;
    this.g = c;
  }
  function um(a, b) {
    this.url = a;
    this.g = !!b;
    this.depth = null;
  }
  function wm(a, b) {
    this.g = a;
    this.depth = b;
  }
  function xm() {
    function a(h, k) {
      return h == null ? k : h;
    }
    var b = tm(),
      c = Math.max(b.length - 1, 0),
      d = sm(b);
    b = d.i;
    var e = d.j,
      f = d.g,
      g = [];
    f && g.push(new wm([f.url, f.g ? 2 : 0], a(f.depth, 1)));
    e && e != f && g.push(new wm([e.url, 2], 0));
    b.url && b != f && g.push(new wm([b.url, 0], a(b.depth, c)));
    d = Jb(g, function (h, k) {
      return g.slice(0, g.length - k);
    });
    !b.url ||
      ((f || e) && b != f) ||
      ((e = Dg(b.url)) && d.push([new wm([e, 1], a(b.depth, c))]));
    d.push([]);
    Jb(d, function (h) {
      return ym(c, h);
    });
  }
  function ym(a, b) {
    var c = Kb(
        b,
        function (e, f) {
          return Math.max(e, f.depth);
        },
        -1
      ),
      d = Nb(c + 2);
    d[0] = a;
    Ib(b, function (e) {
      return (d[e.depth + 1] = e.g);
    });
    return d;
  } /*

Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com
Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/
  var zm =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  function Am() {
    for (var a = Array(36), b = 0, c, d = 0; d < 36; d++)
      d == 8 || d == 13 || d == 18 || d == 23
        ? (a[d] = "-")
        : d == 14
        ? (a[d] = "4")
        : (b <= 2 && (b = (33554432 + Math.random() * 16777216) | 0),
          (c = b & 15),
          (b >>= 4),
          (a[d] = zm[d == 19 ? (c & 3) | 8 : c]));
    return a.join("");
  }
  function Bm() {
    this.g = "always";
    this.l = 4;
    this.ppid = null;
    this.locale = "en";
    this.Ya = this.playerVersion = this.playerType = "";
    this.i = !1;
    this.sessionId = Am();
    this.j = {};
    try {
      xm();
    } catch (a) {}
  }
  function Cm(a) {
    a = a == null ? "" : String(a);
    lb(a) || (a = a.substring(0, 20));
    return a;
  }
  n = Bm.prototype;
  n.setCompanionBackfill = function (a) {
    this.g = a;
  };
  n.getCompanionBackfill = function () {
    return this.g;
  };
  n.setNumRedirects = function (a) {
    this.l = a;
  };
  n.getNumRedirects = function () {
    return this.l;
  };
  n.setPpid = function (a) {
    this.ppid = a;
  };
  n.getPpid = function () {
    return this.ppid;
  };
  n.setVpaidAllowed = function () {};
  n.setVpaidMode = function () {};
  n.setAutoPlayAdBreaks = function () {};
  n.setLocale = function (a) {
    if ((a = il(a))) this.locale = a;
  };
  n.getLocale = function () {
    return this.locale;
  };
  n.setPlayerType = function (a) {
    this.playerType = Cm(a);
  };
  n.getPlayerType = function () {
    return this.playerType;
  };
  n.setPlayerVersion = function (a) {
    this.playerVersion = Cm(a);
  };
  n.getPlayerVersion = function () {
    return this.playerVersion;
  };
  n.setDisableCustomPlaybackForIOS10Plus = function (a) {
    this.i = a;
  };
  n.getDisableCustomPlaybackForIOS10Plus = function () {
    return this.i;
  };
  n.setSessionId = function (a) {
    this.sessionId = a;
  };
  n.setFeatureFlags = function (a) {
    this.j = a;
  };
  n.getFeatureFlags = function () {
    return this.j;
  };
  new Bm();
  function Dm(a) {
    var b = a;
    b: {
      if (b && typeof b === "object") {
        a = x(Object.values(pm));
        for (var c = a.next(); !c.done; c = a.next())
          if (b.hasOwnProperty(c.value)) {
            a = !0;
            break b;
          }
      }
      a = !1;
    }
    if (a) {
      var d, e, f, g, h, k;
      c = {};
      a =
        ((c.uspString = (d = b.IABUSPrivacy_String) != null ? d : null),
        (c.gdprApplies = (e = b.IABTCF_gdprApplies) != null ? e : null),
        (c.tcString = (f = b.IABTCF_TCString) != null ? f : null),
        (c.addtlConsent = (g = b.IABTCF_AddtlConsent) != null ? g : null),
        (c.gppString = (h = b.IABGPP_HDR_GppString) != null ? h : null),
        (c.gppSid = (k = b.IABGPP_GppSID) != null ? k : null),
        c);
    } else a = b;
    b = a.uspString;
    this.uspString = typeof b === "string" ? b : "";
    b = a.tcString;
    this.g = typeof b === "string" ? b : "";
    /^[\.\w_-]*$/.test(this.g) || (this.g = encodeURIComponent(this.g));
    b = a.gppString;
    this.gppString = typeof b === "string" ? b : "";
  }
  function Em(a) {
    a.addtlConsent === void 0 ||
      Rc(a.addtlConsent) ||
      (a.addtlConsent = void 0);
    a.gdprApplies === void 0 || Sc(a.gdprApplies) || (a.gdprApplies = void 0);
    return (a.tcString !== void 0 && !Rc(a.tcString)) ||
      (a.listenerId !== void 0 && !Qc(a.listenerId))
      ? 2
      : a.cmpStatus && a.cmpStatus !== "error"
      ? 0
      : 3;
  }
  function Fm(a, b) {
    b = b === void 0 ? {} : b;
    pl.call(this);
    this.g = null;
    this.l = {};
    this.C = 0;
    this.j = null;
    this.i = a;
    var c;
    this.timeoutMs = (c = b.timeoutMs) != null ? c : 500;
    var d;
    this.ra = (d = b.ra) != null ? d : !1;
  }
  w(Fm, pl);
  Fm.prototype.T = function () {
    this.l = {};
    this.j && (Ug(this.i, "message", this.j), delete this.j);
    delete this.l;
    delete this.i;
    delete this.g;
    pl.prototype.T.call(this);
  };
  function Gm(a, b) {
    var c = { internalErrorState: 0, internalBlockOnErrors: a.ra },
      d = rg(function () {
        b(c);
      }),
      e = 0;
    a.timeoutMs !== -1 &&
      (e = setTimeout(function () {
        e = 0;
        c.tcString = "tcunavailable";
        c.internalErrorState = 1;
        d();
      }, a.timeoutMs));
    Hm(a, "addEventListener", function (f) {
      f &&
        ((c = f),
        (c.internalErrorState = Em(c)),
        (c.internalBlockOnErrors = a.ra),
        Im(c)
          ? (c.internalErrorState !== 0 && (c.tcString = "tcunavailable"),
            Hm(a, "removeEventListener", null, c.listenerId),
            (f = e) && clearTimeout(f),
            d())
          : (c.cmpStatus === "error" || c.internalErrorState !== 0) &&
            (f = e) &&
            clearTimeout(f));
    });
  }
  Fm.prototype.addEventListener = function (a) {
    function b(g, h) {
      clearTimeout(f);
      g
        ? ((d = g),
          (d.internalErrorState = Em(d)),
          (d.internalBlockOnErrors = c.ra),
          (h && d.internalErrorState === 0) ||
            ((d.tcString = "tcunavailable"), h || (d.internalErrorState = 3)))
        : ((d.tcString = "tcunavailable"), (d.internalErrorState = 3));
      a(d);
    }
    var c = this,
      d = { internalBlockOnErrors: this.ra },
      e = rg(function () {
        a(d);
      }),
      f = 0;
    this.timeoutMs !== -1 &&
      (f = setTimeout(function () {
        d.tcString = "tcunavailable";
        d.internalErrorState = 1;
        e();
      }, this.timeoutMs));
    try {
      Hm(this, "addEventListener", b);
    } catch (g) {
      (d.tcString = "tcunavailable"),
        (d.internalErrorState = 3),
        f && (clearTimeout(f), (f = 0)),
        e();
    }
  };
  Fm.prototype.removeEventListener = function (a) {
    a && a.listenerId && Hm(this, "removeEventListener", null, a.listenerId);
  };
  function Jm(a, b) {
    return !(!a || !a[b]);
  }
  function Hm(a, b, c, d) {
    c || (c = function () {});
    var e = a.i;
    typeof e.__tcfapi === "function"
      ? ((a = e.__tcfapi), a(b, 2, c, d))
      : Km(a)
      ? (Lm(a),
        (e = ++a.C),
        (a.l[e] = c),
        a.g &&
          ((c = {}),
          a.g.postMessage(
            ((c.__tcfapiCall = {
              command: b,
              version: 2,
              callId: e,
              parameter: d,
            }),
            c),
            "*"
          )))
      : c({}, !1);
  }
  function Km(a) {
    if (a.g) return a.g;
    a: {
      var b = a.i;
      for (var c = 0; c < 50; ++c) {
        try {
          var d = !(!b.frames || !b.frames.__tcfapiLocator);
        } catch (g) {
          d = !1;
        }
        if (d) break a;
        b: {
          try {
            var e = b.parent;
            if (e && e != b) {
              var f = e;
              break b;
            }
          } catch (g) {}
          f = null;
        }
        if (!(b = f)) break;
      }
      b = null;
    }
    a.g = b;
    return a.g;
  }
  function Lm(a) {
    if (!a.j) {
      var b = function (c) {
        try {
          var d = (Rc(c.data) ? JSON.parse(c.data) : c.data).__tcfapiReturn;
          a.l[d.callId](d.returnValue, d.success);
        } catch (e) {}
      };
      a.j = b;
      Tg(a.i, "message", b);
    }
  }
  function Im(a) {
    if (a.gdprApplies === !1) return !0;
    a.internalErrorState === void 0 && (a.internalErrorState = Em(a));
    return a.cmpStatus === "error" || a.internalErrorState !== 0
      ? a.internalBlockOnErrors
        ? (Wg({ e: String(a.internalErrorState) }, "tcfe"), !1)
        : !0
      : a.cmpStatus !== "loaded" ||
        (a.eventStatus !== "tcloaded" && a.eventStatus !== "useractioncomplete")
      ? !1
      : !0;
  }
  function Mm(a) {
    this.u = G(a);
  }
  w(Mm, R);
  function Nm() {
    var a = a === void 0 ? {} : a;
    var b = b === void 0 ? {} : b;
    a = x(Object.entries(a));
    for (var c = a.next(); !c.done; c = a.next())
      (c = x(c.value)), c.next(), c.next();
    new Dm(b);
  }
  function Om(a) {
    this.u = G(a);
  }
  w(Om, R);
  Om.prototype.getVersion = function () {
    return O(this, 2);
  };
  function Pm(a) {
    this.u = G(a);
  }
  w(Pm, R);
  function Qm(a, b) {
    return H(a, 2, Ld(b));
  }
  function Rm(a, b) {
    return H(a, 3, Ld(b));
  }
  Pm.prototype.getModel = function () {
    return O(this, 4);
  };
  function Sm(a, b) {
    return H(a, 4, Ld(b));
  }
  function Tm(a, b) {
    return H(a, 5, Ld(b));
  }
  function Um(a, b) {
    return H(a, 9, Ld(b));
  }
  function Vm(a, b) {
    return Ne(a, 10, b);
  }
  function Wm(a, b) {
    return H(a, 11, b == null ? b : sd(b));
  }
  function Xm(a, b) {
    return H(a, 1, Ld(b));
  }
  function Ym(a, b) {
    return H(a, 7, b == null ? b : sd(b));
  }
  var Zm =
    "platform platformVersion architecture model uaFullVersion bitness fullVersionList wow64".split(
      " "
    );
  function $m(a) {
    var b;
    return (b = a.google_tag_data) != null ? b : (a.google_tag_data = {});
  }
  function an(a) {
    var b, c;
    return (
      typeof ((b = a.navigator) == null
        ? void 0
        : (c = b.userAgentData) == null
        ? void 0
        : c.getHighEntropyValues) === "function"
    );
  }
  function bn() {
    var a = window;
    if (!an(a)) return null;
    var b = $m(a);
    if (b.uach_promise) return b.uach_promise;
    a = a.navigator.userAgentData.getHighEntropyValues(Zm).then(function (c) {
      b.uach != null || (b.uach = c);
      return c;
    });
    return (b.uach_promise = a);
  }
  function cn(a) {
    var b;
    return Wm(
      Vm(
        Tm(
          Qm(
            Xm(
              Sm(
                Ym(
                  Um(Rm(new Pm(), a.architecture || ""), a.bitness || ""),
                  a.mobile || !1
                ),
                a.model || ""
              ),
              a.platform || ""
            ),
            a.platformVersion || ""
          ),
          a.uaFullVersion || ""
        ),
        ((b = a.fullVersionList) == null
          ? void 0
          : b.map(function (c) {
              var d = new Om();
              d = H(d, 1, Ld(c.brand));
              return H(d, 2, Ld(c.version));
            })) || []
      ),
      a.wow64 || !1
    );
  }
  function dn() {
    var a, b;
    return (b =
      (a = bn()) == null
        ? void 0
        : a.then(function (c) {
            return cn(c);
          })) != null
      ? b
      : null;
  }
  function en() {
    this.appName = null;
    new Nm();
    this.secureSignals = null;
    Am();
    this.deviceId = "";
    this.isLimitedAdTracking = null;
    Jg();
    this.g = this.referrer = this.ppid = null;
    new Bh();
    this.globalPlacementId = null;
    new Ah();
    fn(this);
  }
  function gn() {
    S(en);
    return "h.0.0.0";
  }
  function fn(a) {
    var b = dn();
    b &&
      b.then(function (c) {
        if (c == null) c = null;
        else {
          c = JSON.stringify($d(c));
          for (var d = [], e = 0, f = 0; f < c.length; f++) {
            var g = c.charCodeAt(f);
            g > 255 && ((d[e++] = g & 255), (g >>= 8));
            d[e++] = g;
          }
          c = Vb(d, 3);
        }
        a.g = c;
      });
  }
  function hn(a, b) {
    return a.indexOf(b) == 0 ? a.substr(b.length) : null;
  }
  function jn() {
    var a = window.location.ancestorOrigins;
    return a ? (a.length > 0 ? [].concat(z(a)).join(",") : "") : "";
  }
  function kn(a, b) {
    a.g.set("url", "");
    try {
      var c = 2083 - a.toString().length - 1;
      if (c <= 0) return a.toString();
      for (
        var d = b.slice(0, c), e = encodeURIComponent(d), f = c;
        f > 0 && e.length > c;

      )
        (d = b.slice(0, f--)), (e = encodeURIComponent(d));
      a.g.set("url", d);
    } catch (g) {}
    return a.toString();
  }
  var ln = new (function () {
    this.j = 0;
    this.g = new Map();
    this.i = typeof window !== "undefined" && window.fetch != null;
  })();
  function mn(a) {
    var b = b === void 0 ? ln : b;
    km(b, new ll(a).url);
  }
  function nn() {
    this.j = Math.random() < 0.01;
    this.i = Math.floor(Math.random() * 4503599627370496);
    this.g = null;
  }
  function on(a, b, c) {
    c = c === void 0 ? {} : c;
    if (C.G_testRunner == null && a.j) {
      c.lid = b;
      gn() && (c.sdkv = gn());
      a.g && (c.palv = a.g);
      b = lj().sort().join(",");
      lb(b == null ? "" : String(b)) || (c.e = b);
      c = pn(a, c);
      var d = new Ik("https://pagead2.googlesyndication.com/pagead/gen_204");
      Ng(
        c,
        function (e, f) {
          e != null &&
            d.g.set(
              f,
              e == null ? "" : typeof e === "boolean" ? (e ? "t" : "f") : "" + e
            );
        },
        a
      );
      a = d.toString();
      c = d.g.get("url");
      c != null && Gb() && a.length > 2083 && (a = kn(d, c));
      mn(a);
    }
  }
  function pn(a, b) {
    b.id = "pal_html5";
    var c = window;
    var d = document;
    c = new Ik(c.parent === c ? c.location.href : d.referrer);
    b.c = a.i;
    b.domain = c.j;
    return b;
  }
  function qn(a, b) {
    this.j = a;
    this.l = b;
    this.i = 0;
    this.g = null;
  }
  qn.prototype.get = function () {
    if (this.i > 0) {
      this.i--;
      var a = this.g;
      this.g = a.next;
      a.next = null;
    } else a = this.j();
    return a;
  };
  function rn(a, b) {
    a.l(b);
    a.i < 100 && (a.i++, (b.next = a.g), (a.g = b));
  }
  function sn() {
    this.i = this.g = null;
  }
  sn.prototype.add = function (a, b) {
    var c = tn.get();
    c.set(a, b);
    this.i ? (this.i.next = c) : (this.g = c);
    this.i = c;
  };
  function un() {
    var a = vn,
      b = null;
    a.g && ((b = a.g), (a.g = a.g.next), a.g || (a.i = null), (b.next = null));
    return b;
  }
  var tn = new qn(
    function () {
      return new wn();
    },
    function (a) {
      return a.reset();
    }
  );
  function wn() {
    this.next = this.g = this.i = null;
  }
  wn.prototype.set = function (a, b) {
    this.i = a;
    this.g = b;
    this.next = null;
  };
  wn.prototype.reset = function () {
    this.next = this.g = this.i = null;
  };
  var xn,
    yn = !1,
    vn = new sn();
  function zn(a, b) {
    xn || An();
    yn || (xn(), (yn = !0));
    vn.add(a, b);
  }
  function An() {
    var a = Promise.resolve(void 0);
    xn = function () {
      a.then(On);
    };
  }
  function On() {
    for (var a; (a = un()); ) {
      try {
        a.i.call(a.g);
      } catch (b) {
        kb(b);
      }
      rn(tn, a);
    }
    yn = !1;
  }
  function Pn(a) {
    this.g = 0;
    this.C = void 0;
    this.l = this.i = this.j = null;
    this.A = this.B = !1;
    if (a != pg)
      try {
        var b = this;
        a.call(
          void 0,
          function (c) {
            Qn(b, 2, c);
          },
          function (c) {
            Qn(b, 3, c);
          }
        );
      } catch (c) {
        Qn(this, 3, c);
      }
  }
  function Rn() {
    this.next = this.context = this.i = this.j = this.g = null;
    this.l = !1;
  }
  Rn.prototype.reset = function () {
    this.context = this.i = this.j = this.g = null;
    this.l = !1;
  };
  var Sn = new qn(
    function () {
      return new Rn();
    },
    function (a) {
      a.reset();
    }
  );
  function Tn(a, b, c) {
    var d = Sn.get();
    d.j = a;
    d.i = b;
    d.context = c;
    return d;
  }
  Pn.prototype.then = function (a, b, c) {
    return Un(
      this,
      Tl(typeof a === "function" ? a : null),
      Tl(typeof b === "function" ? b : null),
      c
    );
  };
  Pn.prototype.$goog_Thenable = !0;
  function Vn(a, b) {
    return Un(a, null, Tl(b));
  }
  Pn.prototype.cancel = function (a) {
    if (this.g == 0) {
      var b = new Wn(a);
      zn(function () {
        Xn(this, b);
      }, this);
    }
  };
  function Xn(a, b) {
    if (a.g == 0)
      if (a.j) {
        var c = a.j;
        if (c.i) {
          for (
            var d = 0, e = null, f = null, g = c.i;
            g && (g.l || (d++, g.g == a && (e = g), !(e && d > 1)));
            g = g.next
          )
            e || (f = g);
          e &&
            (c.g == 0 && d == 1
              ? Xn(c, b)
              : (f
                  ? ((d = f),
                    d.next == c.l && (c.l = d),
                    (d.next = d.next.next))
                  : Yn(c),
                Zn(c, e, 3, b)));
        }
        a.j = null;
      } else Qn(a, 3, b);
  }
  function $n(a, b) {
    a.i || (a.g != 2 && a.g != 3) || ao(a);
    a.l ? (a.l.next = b) : (a.i = b);
    a.l = b;
  }
  function Un(a, b, c, d) {
    var e = Tn(null, null, null);
    e.g = new Pn(function (f, g) {
      e.j = b
        ? function (h) {
            try {
              var k = b.call(d, h);
              f(k);
            } catch (l) {
              g(l);
            }
          }
        : f;
      e.i = c
        ? function (h) {
            try {
              var k = c.call(d, h);
              k === void 0 && h instanceof Wn ? g(h) : f(k);
            } catch (l) {
              g(l);
            }
          }
        : g;
    });
    e.g.j = a;
    $n(a, e);
    return e.g;
  }
  Pn.prototype.F = function (a) {
    this.g = 0;
    Qn(this, 2, a);
  };
  Pn.prototype.G = function (a) {
    this.g = 0;
    Qn(this, 3, a);
  };
  function Qn(a, b, c) {
    if (a.g == 0) {
      a === c &&
        ((b = 3), (c = new TypeError("Promise cannot resolve to itself")));
      a.g = 1;
      a: {
        var d = c,
          e = a.F,
          f = a.G;
        if (d instanceof Pn) {
          $n(d, Tn(e || pg, f || null, a));
          var g = !0;
        } else {
          if (d)
            try {
              var h = !!d.$goog_Thenable;
            } catch (l) {
              h = !1;
            }
          else h = !1;
          if (h) d.then(e, f, a), (g = !0);
          else {
            if (Ra(d))
              try {
                var k = d.then;
                if (typeof k === "function") {
                  bo(d, k, e, f, a);
                  g = !0;
                  break a;
                }
              } catch (l) {
                f.call(a, l);
                g = !0;
                break a;
              }
            g = !1;
          }
        }
      }
      g ||
        ((a.C = c),
        (a.g = b),
        (a.j = null),
        ao(a),
        b != 3 || c instanceof Wn || co(a, c));
    }
  }
  function bo(a, b, c, d, e) {
    function f(k) {
      h || ((h = !0), d.call(e, k));
    }
    function g(k) {
      h || ((h = !0), c.call(e, k));
    }
    var h = !1;
    try {
      b.call(a, g, f);
    } catch (k) {
      f(k);
    }
  }
  function ao(a) {
    a.B || ((a.B = !0), zn(a.D, a));
  }
  function Yn(a) {
    var b = null;
    a.i && ((b = a.i), (a.i = b.next), (b.next = null));
    a.i || (a.l = null);
    return b;
  }
  Pn.prototype.D = function () {
    for (var a; (a = Yn(this)); ) Zn(this, a, this.g, this.C);
    this.B = !1;
  };
  function Zn(a, b, c, d) {
    if (c == 3 && b.i && !b.l) for (; a && a.A; a = a.j) a.A = !1;
    if (b.g) (b.g.j = null), eo(b, c, d);
    else
      try {
        b.l ? b.j.call(b.context) : eo(b, c, d);
      } catch (e) {
        fo.call(null, e);
      }
    rn(Sn, b);
  }
  function eo(a, b, c) {
    b == 2 ? a.j.call(a.context, c) : a.i && a.i.call(a.context, c);
  }
  function co(a, b) {
    a.A = !0;
    zn(function () {
      a.A && fo.call(null, b);
    });
  }
  var fo = kb;
  function Wn(a) {
    $a.call(this, a);
  }
  Za(Wn, $a);
  Wn.prototype.name = "cancel";
  function go(a, b) {
    Ul.call(this);
    this.i = a || 1;
    this.g = b || C;
    this.l = Ua(this.Ob, this);
    this.C = Date.now();
  }
  Za(go, Ul);
  n = go.prototype;
  n.enabled = !1;
  n.W = null;
  n.setInterval = function (a) {
    this.i = a;
    this.W && this.enabled
      ? (this.stop(), this.start())
      : this.W && this.stop();
  };
  n.Ob = function () {
    if (this.enabled) {
      var a = Date.now() - this.C;
      a > 0 && a < this.i * 0.8
        ? (this.W = this.g.setTimeout(this.l, this.i - a))
        : (this.W && (this.g.clearTimeout(this.W), (this.W = null)),
          this.dispatchEvent("tick"),
          this.enabled && (this.stop(), this.start()));
    }
  };
  n.start = function () {
    this.enabled = !0;
    this.W ||
      ((this.W = this.g.setTimeout(this.l, this.i)), (this.C = Date.now()));
  };
  n.stop = function () {
    this.enabled = !1;
    this.W && (this.g.clearTimeout(this.W), (this.W = null));
  };
  n.T = function () {
    go.ka.T.call(this);
    this.stop();
    delete this.g;
  };
  function ho(a, b) {
    if (typeof a !== "function")
      if (a && typeof a.handleEvent == "function") a = Ua(a.handleEvent, a);
      else throw Error("Invalid listener argument");
    return Number(b) > 2147483647 ? -1 : C.setTimeout(a, b || 0);
  }
  function io(a) {
    var b = null;
    return Vn(
      new Pn(function (c, d) {
        b = ho(function () {
          c("0");
        }, a);
        b == -1 && d(Error("Failed to schedule timer."));
      }),
      function (c) {
        C.clearTimeout(b);
        throw c;
      }
    );
  }
  function jo(a) {
    var b = Date.now(),
      c = {};
    a = ((c["x-afma-token-requester-type"] = a), c);
    c =
      "https://pubads.g.doubleclick.net/adsid/integrator.json?aos=" +
      encodeURIComponent(jn());
    return new gm()
      .get({ url: c, withCredentials: !0, timeout: new jl(), headers: a })
      .then(function (d) {
        var e = Date.now();
        d = d.newToken || "";
        var f = {};
        on(S(nn), 182, ((f.t = e - b), (f.aos = jn()), f));
        return new ko(d, b, e);
      })
      .catch(function (d) {
        var e = "not instanceof Error";
        d instanceof Error && (e = ml(Number(d.message)));
        d = Date.now();
        var f = {};
        on(S(nn), 182, ((f.except = e), (f.t = d - b), f));
        return Promise.resolve(lo);
      });
  }
  function mo() {
    Ul.call(this);
    this.g = null;
    this.C = new Ol(this);
    ql(this, Va(ol, this.C));
    this.i = new go(72e5);
    this.l = Promise.resolve(lo);
  }
  w(mo, Ul);
  function no(a) {
    function b(d) {
      a.g = d;
      return a.g;
    }
    var c = c === void 0 ? "requester_type_9" : c;
    a.l = jo(c).then(b);
    a.i = new go(72e5);
    a.C.listen(a.i, "tick", function () {
      a.l = jo(c).then(b);
    });
    a.i.start();
    ql(a, function () {
      a.i.stop();
    });
  }
  mo.prototype.getId = function () {
    var a = this;
    return B(function (b) {
      if (b.j == 1) return a.g != null && a.g !== lo ? b.H(2) : b.g(a.l, 3);
      b.j != 2 && (a.g = b.i);
      return b.return(a.g);
    });
  };
  function ko(a, b, c) {
    this.id = a;
    this.i = b;
    this.g = c;
  }
  var lo = new ko("", null, null);
  function oo(a) {
    for (var b = a.length, c = new Uint8Array(b), d = 0; d < b; d++)
      c[d] = a.charCodeAt(d);
    return c;
  }
  var po = [
      94, 40, 63, 58, 104, 116, 116, 112, 115, 63, 58, 41, 63, 47, 47, 105, 109,
      97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105,
      115, 92, 46, 99, 111, 109, 47, 106, 115, 47, 40, 115, 100, 107, 108, 111,
      97, 100, 101, 114, 124, 99, 111, 114, 101, 41, 47,
    ],
    qo = [
      94, 40, 63, 58, 104, 116, 116, 112, 115, 63, 58, 41, 63, 47, 47, 115, 48,
      92, 46, 50, 109, 100, 110, 92, 46, 110, 101, 116, 47, 105, 110, 115, 116,
      114, 101, 97, 109, 47, 104, 116, 109, 108, 53, 47,
    ],
    ro = [
      94, 40, 63, 58, 104, 116, 116, 112, 115, 63, 58, 41, 63, 47, 47, 105, 109,
      97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105,
      115, 92, 46, 99, 111, 109, 47, 112, 97, 108, 47, 115, 100, 107, 108, 111,
      97, 100, 101, 114, 47,
    ],
    so = [
      [105, 109, 97, 51, 92, 46, 106, 115],
      [105, 109, 97, 51, 95, 100, 101, 98, 117, 103, 92, 46, 106, 115],
      [105, 109, 97, 51, 95, 101, 97, 112, 46, 106, 115],
    ],
    to = [
      [
        98, 114, 105, 100, 103, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48,
        45, 57, 92, 46, 93, 43, 41, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93,
        41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116,
        109, 108,
      ],
      [
        98, 114, 105, 100, 103, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48,
        45, 57, 92, 46, 93, 43, 41, 95, 100, 101, 98, 117, 103, 40, 95, 40, 91,
        97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44,
        50, 125, 92, 46, 104, 116, 109, 108,
      ],
      [
        98, 114, 105, 100, 103, 101, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57,
        93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104,
        116, 109, 108,
      ],
    ];
  function uo(a, b, c, d) {
    function e(k) {
      try {
        var l = typeof k.data === "object" ? k.data : JSON.parse(k.data);
        g === l.paw_id &&
          (Ug(a, "message", e),
          l.error ? f.reject(Error(l.error)) : f.resolve(d(l)));
      } catch (m) {}
    }
    var f = new jm(),
      g = "",
      h = vo(a);
    return h
      ? (Tg(a, "message", e), (g = c(h)), f.promise)
      : (c = wo(a))
      ? ((g = String(Math.floor(Fg() * 2147483647))),
        Tg(a, "message", e),
        b(c, g),
        f.promise)
      : null;
  }
  function xo(a) {
    return uo(
      a,
      function (b, c) {
        var d, e;
        return void ((d = (e = b.getGmaQueryInfo) != null ? e : b.getGmaSig) ==
        null
          ? void 0
          : d.postMessage(c));
      },
      function (b) {
        return b.getQueryInfo();
      },
      function (b) {
        return b.signal;
      }
    );
  }
  function yo() {
    var a = window;
    return !!vo(a) || !!wo(a);
  }
  function vo(a) {
    var b;
    if (
      typeof ((b = a.gmaSdk) == null ? void 0 : b.getQueryInfo) === "function"
    )
      return a.gmaSdk;
  }
  function wo(a) {
    var b, c, d, e, f, g;
    if (
      typeof ((b = a.webkit) == null
        ? void 0
        : (c = b.messageHandlers) == null
        ? void 0
        : (d = c.getGmaQueryInfo) == null
        ? void 0
        : d.postMessage) === "function" ||
      typeof ((e = a.webkit) == null
        ? void 0
        : (f = e.messageHandlers) == null
        ? void 0
        : (g = f.getGmaSig) == null
        ? void 0
        : g.postMessage) === "function"
    )
      return a.webkit.messageHandlers;
  }
  (function (a) {
    return Pc(function (b) {
      if (!Tc(b)) return !1;
      for (var c = x(Object.entries(a)), d = c.next(); !d.done; d = c.next()) {
        var e = x(d.value);
        d = e.next().value;
        e = e.next().value;
        if (!(d in b)) {
          if (e.Cb === !0) continue;
          return !1;
        }
        if (!e(b[d])) return !1;
      }
      return !0;
    });
  })(
    { vc: Rc, pn: Rc, eid: Uc(), vnm: Uc(), js: Rc },
    "RawGmaSdkStaticSignalObject"
  );
  function zo() {
    this.timeoutMs = Ao;
    this.i = xo;
    this.signal = null;
    this.g = 0;
  }
  function Bo(a) {
    if (
      !yo() ||
      !(
        Sb ||
        Rb ||
        (Qb && "ontouchstart" in document.documentElement) ||
        fk(Fk)
      )
    )
      return Promise.resolve(null);
    var b;
    return ((b = a.i(window)) != null ? b : Promise.resolve(null)).catch(
      function () {
        return "0";
      }
    );
  }
  function Co(a) {
    var b;
    return B(function (c) {
      if (c.j == 1)
        return (
          (b = Date.now() - a.g), !a.signal || b > 3e5 ? c.g(Do(a), 3) : c.H(2)
        );
      c.j != 2 && ((a.signal = c.i), (a.g = Date.now()));
      return c.return(a.signal);
    });
  }
  function Do(a) {
    return Promise.race([
      Bo(a).then(function (b) {
        if (b == null) return null;
        a.signal = b.length > 1e4 ? "0" : b;
        a.g = Date.now();
        return a.signal;
      }),
      io(a.timeoutMs),
    ]);
  }
  function Eo() {
    this.allowStorage = !1;
  }
  function Fo(a) {
    if (!a) return !1;
    var b;
    return (b = a.gdprApplies) != null ? b : !1;
  }
  var Go = {},
    Ho =
      ((Go["Encryption unavailable."] = 1),
      (Go["Encryption failed."] = 2),
      (Go["Invalid nonce request."] = 3),
      (Go["The generated nonce was too long."] = 4),
      Go),
    Io = Am().toString();
  function Jo(a) {
    return typeof a === "number" ? a.toString() : "";
  } /*

 Copyright 2020 Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
  function X(a) {
    a = Error.call(this, a);
    this.message = a.message;
    "stack" in a && (this.stack = a.stack);
    Object.setPrototypeOf(this, X.prototype);
  }
  w(X, Error);
  X.prototype.name = "SecurityException";
  function Ko(a) {
    this.u = G(a);
  }
  w(Ko, R);
  function Lo(a) {
    this.u = G(a);
  }
  w(Lo, R);
  Lo.prototype.getVersion = function () {
    return N(this, 1);
  };
  function Mo(a) {
    this.u = G(a);
  }
  w(Mo, R);
  function No(a) {
    this.u = G(a);
  }
  w(No, R);
  No.prototype.getVersion = function () {
    return N(this, 1);
  };
  function Oo(a) {
    this.u = G(a);
  }
  w(Oo, R);
  Oo.prototype.getVersion = function () {
    return N(this, 1);
  };
  var Po = [0, ig];
  var Qo = [0, jg, ig];
  var Ro = kg(Oo, [0, ig, [0, ig, Po, hg], [0, ig, Qo, hg]]);
  function So(a) {
    this.u = G(a);
  }
  w(So, R);
  function To(a) {
    this.u = G(a);
  }
  w(To, R);
  To.prototype.getVersion = function () {
    return N(this, 3);
  };
  function Uo(a) {
    this.u = G(a);
  }
  w(Uo, R);
  var Vo = kg(Uo, [0, [0, Po, ig], [0, Qo, ig, -1]]);
  function Wo(a) {
    this.u = G(a);
  }
  w(Wo, R);
  Wo.prototype.getVersion = function () {
    return N(this, 1);
  };
  var Xo = kg(Wo, [0, ig, 1, hg]);
  function Yo(a) {
    this.u = G(a);
  }
  w(Yo, R);
  Yo.prototype.getVersion = function () {
    return N(this, 3);
  };
  var Zo = kg(Yo, [0, 1, ig, -1]);
  function $o(a) {
    this.u = G(a);
  }
  w($o, R);
  $o.prototype.getValue = function () {
    return J(this, 2);
  };
  function ap(a) {
    this.u = G(a);
  }
  w(ap, R);
  var bp = [0, 1, [0, eg, hg, jg]];
  function cp(a) {
    this.u = G(a);
  }
  w(cp, R);
  var dp = [0, jg, -1, 8, hg];
  function ep(a) {
    this.u = G(a);
  }
  w(ep, R);
  var fp = [0, dp, bp, jg];
  function gp(a) {
    this.u = G(a);
  }
  w(gp, R);
  var hp = kg(gp, [0, fp]);
  function ip(a) {
    this.u = G(a);
  }
  w(ip, R);
  ip.prototype.getVersion = function () {
    return N(this, 1);
  };
  var jp = [0, ig, fp, hg, -1];
  function kp(a) {
    this.u = G(a);
  }
  w(kp, R);
  kp.prototype.getVersion = function () {
    return N(this, 1);
  };
  var lp = kg(kp, [0, ig, jp, hg]);
  var mp = kg(ip, jp);
  function np(a) {
    this.u = G(a);
  }
  w(np, R);
  np.prototype.ia = function () {
    return P(this, 3);
  };
  var op = [0, jg, -2];
  function pp(a) {
    this.u = G(a);
  }
  w(pp, R);
  var qp = [0, op];
  pp.prototype.i = (function (a) {
    return function () {
      var b = new tf();
      ag(this.u, b, Rf(Kf, Yf, Zf, a));
      uf(b, b.g.end());
      for (
        var c = new Uint8Array(b.i), d = b.j, e = d.length, f = 0, g = 0;
        g < e;
        g++
      ) {
        var h = d[g];
        c.set(h, f);
        f += h.length;
      }
      b.j = [c];
      return c;
    };
  })(qp);
  var rp = kg(pp, qp);
  function sp(a) {
    this.u = G(a);
  }
  w(sp, R);
  sp.prototype.getVersion = function () {
    return N(this, 1);
  };
  var tp = [0, ig, op, hg];
  function up(a) {
    this.u = G(a);
  }
  w(up, R);
  up.prototype.getVersion = function () {
    return N(this, 1);
  };
  var vp = kg(up, [0, ig, tp, hg]);
  var wp = kg(sp, tp);
  function xp(a) {
    this.u = G(a);
  }
  w(xp, R);
  xp.prototype.getValue = function () {
    return J(this, 2);
  };
  var yp = [0, eg, hg, jg];
  function zp(a) {
    this.u = G(a);
  }
  w(zp, R);
  var Ap = [0, yp, jg, ig, jg];
  function Bp(a) {
    this.u = G(a);
  }
  w(Bp, R);
  function Cp(a) {
    return Je(a, zp, 2, re());
  }
  var Dp = kg(Bp, [0, ig, fg, Ap]);
  function Ep(a) {
    this.g = a;
  }
  Ep.prototype.read = function () {
    try {
      var a = Dp(this.g);
    } catch (b) {
      throw new X(
        "Could not parse the given serialized proto as a keyset proto."
      );
    }
    if (Cp(a).length === 0)
      throw new X(
        "Could not parse the given serialized proto as a keyset proto."
      );
    return a;
  };
  function Y(a) {
    a = Error.call(this, a);
    this.message = a.message;
    "stack" in a && (this.stack = a.stack);
    Object.setPrototypeOf(this, Y.prototype);
  }
  w(Y, Error);
  Y.prototype.name = "InvalidArgumentsException";
  function Fp(a, b) {
    b = [b];
    var c = b.concat;
    if (!Number.isInteger(a) || a < 0 || a >= 4294967296)
      throw new Y("Number has to be unsigned 32-bit integer.");
    for (var d = Array(4), e = 0; e < 4; e++)
      d[e] = 255 & (a >> (8 * (4 - e - 1)));
    b = c.call(b, d);
    return new Uint8Array(b);
  }
  var Gp = new Uint8Array(0);
  function Hp(a, b, c) {
    this.j = a;
    this.g = b;
    this.i = c;
  }
  Hp.prototype.P = function () {
    return this.j;
  };
  function Ip(a) {
    this.j = a;
    this.i = null;
    this.g = new Map();
  }
  Ip.prototype.K = function () {
    return this.j;
  };
  function Jp(a, b) {
    return (a = Kp(a, b)) ? a : [];
  }
  function Kp(a, b) {
    b instanceof Uint8Array && (b = [].concat(z(b)).toString());
    return a.g.get(b);
  } /*

 Copyright 2022 Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
  function Lp(a) {
    return a == null ? void 0 : new Uint8Array(mc(a) || 0);
  }
  function Mp(a) {
    a == null ? (a = void 0) : (a = (a = mc(a)) ? a.length : 0);
    return a;
  }
  function Np() {
    for (var a = 0, b = 0; b < arguments.length; b++) a += arguments[b].length;
    a = new Uint8Array(a);
    for (var c = (b = 0); c < arguments.length; c++)
      a.set(arguments[c], b), (b += arguments[c].length);
    return a;
  }
  function Op(a) {
    if (Number.isNaN(a) || a % 1 !== 0)
      throw new Y("cannot convert non-integer value");
    if (a < 0) throw new Y("cannot convert negative number");
    if (a > Number.MAX_SAFE_INTEGER)
      throw new Y(
        "cannot convert number larger than " + Number.MAX_SAFE_INTEGER
      );
    var b = a % 4294967296;
    a /= 4294967296;
    for (var c = new Uint8Array(8), d = 7; d >= 4; d--)
      (c[d] = b & 255), (b >>>= 8);
    for (b = 3; b >= 0; b--) (c[b] = a & 255), (a >>>= 8);
    return c;
  }
  function Pp(a) {
    for (var b = "", c = 0; c < a.length; c++) {
      var d = a[c].toString(16);
      b += d.length > 1 ? d : "0" + d;
    }
    return b;
  }
  function Qp(a) {
    return Rp(globalThis.atob(a.replace(/-/g, "+").replace(/_/g, "/")));
  }
  function Sp(a) {
    for (var b = "", c = 0; c < a.length; c += 1)
      b += String.fromCharCode(a[c]);
    return globalThis
      .btoa(b)
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  }
  function Rp(a) {
    for (var b = [], c = 0, d = 0; d < a.length; d++) {
      var e = a.charCodeAt(d);
      b[c++] = e;
    }
    return new Uint8Array(b);
  }
  function Tp(a) {
    switch (a) {
      case 1:
        return "P-256";
      case 2:
        return "P-384";
      case 3:
        return "P-521";
    }
  }
  function Up(a) {
    switch (a) {
      case "P-256":
        return 1;
      case "P-384":
        return 2;
      case "P-521":
        return 3;
    }
    throw new Y("unknown curve: " + a);
  }
  function Vp(a, b, c) {
    a = Wp(Up(a));
    switch (b) {
      case 1:
        b = c.x;
        var d = c.y;
        if (b === void 0) throw new Y("x must be provided");
        if (d === void 0) throw new Y("y must be provided");
        c = new Uint8Array(1 + 2 * a);
        d = Qp(d);
        b = Qp(b);
        c.set(d, 1 + 2 * a - d.length);
        c.set(b, 1 + a - b.length);
        c[0] = 4;
        return c;
      case 3:
        b = c.x;
        d = c.y;
        if (b === void 0) throw new Y("x must be provided");
        if (d === void 0) throw new Y("y must be provided");
        c = Qp(b);
        b = Qp(d);
        c.length > a && (c = c.slice(c.length - a, c.length));
        b.length > a && (b = b.slice(b.length - a, b.length));
        d = new Uint8Array(2 * a);
        d.set(c, 0);
        d.set(b, a);
        return d;
      case 2:
        b = c.x;
        d = c.y;
        if (b === void 0) throw new Y("x must be provided");
        if (d === void 0) throw new Y("y must be provided");
        c = Qp(b);
        b = Qp(d);
        c.length > a && (c = c.slice(c.length - a, c.length));
        b.length > a && (b = b.slice(b.length - a, b.length));
        d = new Uint8Array(1 + a);
        d.set(c, 1 + a - c.length);
        d[0] = Xp(BigInt("0x" + Pp(b)), 0) ? 3 : 2;
        return d;
      default:
        throw new X("invalid format");
    }
  }
  function Yp(a) {
    switch (a) {
      case 1:
        return BigInt(
          "115792089210356248762697446949407573530086143415290314195533631308867097853951"
        );
      case 2:
        return BigInt(
          "39402006196394479212279040100143613805079739270465446667948293404245721771496870329047266088258938001861606973112319"
        );
      case 3:
        return BigInt(
          "6864797660130609714981900799081393217269435300143305409394463459185543183397656052122559640661454554977296311391480858037121987999716643812574028291115057151"
        );
      default:
        throw new Y("invalid curve");
    }
  }
  function Zp(a) {
    a = a.toString(16);
    a = a.length % 2 === 0 ? a : "0" + a;
    if (a.length % 2 != 0)
      throw new Y("Hex string length must be multiple of 2");
    for (var b = new Uint8Array(a.length / 2), c = 0; c < a.length; c += 2)
      b[c / 2] = parseInt(a.substring(c, c + 2), 16);
    return b;
  }
  function Xp(a, b) {
    return (a & (BigInt(1) << BigInt(b))) !== BigInt(0);
  }
  function $p(a, b, c) {
    var d = Wp(Up(a));
    switch (b) {
      case 1:
        if (c.length !== 1 + 2 * d || c[0] !== 4) throw new X("invalid point");
        return {
          kty: "EC",
          crv: a,
          x: Sp(new Uint8Array(c.subarray(1, 1 + d))),
          y: Sp(new Uint8Array(c.subarray(1 + d, c.length))),
          ext: !0,
        };
      case 3:
        if (c.length !== 2 * d) throw new X("invalid point");
        return {
          kty: "EC",
          crv: a,
          x: Sp(new Uint8Array(c.subarray(0, d))),
          y: Sp(new Uint8Array(c.subarray(d, c.length))),
          ext: !0,
        };
      case 2:
        if (c.length !== 1 + d)
          throw new X("compressed point has wrong length");
        if (c[0] !== 2 && c[0] !== 3) throw new X("invalid format");
        b = c[0] === 3;
        c = BigInt("0x" + Pp(c.subarray(1, c.length)));
        d = Yp(Up(a));
        if (c < BigInt(0) || c >= d) throw new X("x is out of range");
        d = Yp(Up(a));
        var e = d - BigInt(3);
        a: switch (Up(a)) {
          case 1:
            var f = BigInt(
              "0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"
            );
            break a;
          case 2:
            f = BigInt(
              "0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef"
            );
            break a;
          case 3:
            f = BigInt(
              "0x051953eb9618e1c9a1f929a21a0b68540eea2da725b99b315f3b8b489918ef109e156193951ec7e937b1652c0bd3bb1bf073573df883d2c34f1ef451fd46b503f00"
            );
            break a;
          default:
            throw new Y("invalid curve");
        }
        if (d <= BigInt(0)) throw new Y("p must be positive");
        e = (((c * c + e) * c + f) % d) % d;
        if (Xp(d, 0) && Xp(d, 1)) {
          var g = (d + BigInt(1)) >> BigInt(2);
          if (g === BigInt(0)) f = BigInt(1);
          else {
            f = e;
            g = g.toString(2);
            for (var h = 1; h < g.length; ++h)
              (f = (f * f) % d), g[h] === "1" && (f = (f * e) % d);
          }
          if ((f * f) % d !== e)
            throw new X("could not find a modular square root");
          e = f;
        } else throw new Y("unsupported modulus value");
        b !== Xp(e, 0) && (e = (d - e) % d);
        b = e;
        return { kty: "EC", crv: a, x: Sp(Zp(c)), y: Sp(Zp(b)), ext: !0 };
      default:
        throw new X("invalid format");
    }
  }
  function Wp(a) {
    switch (a) {
      case 1:
        return 32;
      case 2:
        return 48;
      case 3:
        return 66;
    }
  }
  function aq(a, b) {
    var c, d, e, f, g;
    return B(function (h) {
      if (h.j == 1) {
        c = a.algorithm;
        d = c.namedCurve;
        if (!d) throw new Y("namedCurve must be provided");
        e = Object.assign({}, { public: b }, a.algorithm);
        f = 8 * Wp(Up(d));
        return h.g(globalThis.crypto.subtle.deriveBits(e, a, f), 2);
      }
      g = h.i;
      return h.return(new Uint8Array(g));
    });
  }
  function bq(a) {
    var b, c;
    return B(function (d) {
      if (d.j == 1)
        return (
          (b = { name: "ECDH", namedCurve: a }),
          d.g(
            globalThis.crypto.subtle.generateKey(b, !0, [
              "deriveKey",
              "deriveBits",
            ]),
            2
          )
        );
      c = d.i;
      return d.return(c);
    });
  }
  function cq(a) {
    var b;
    return B(function (c) {
      if (c.j == 1) return c.g(globalThis.crypto.subtle.exportKey("jwk", a), 2);
      b = c.i;
      if (b.crv === void 0) throw new Y("crv must be provided");
      var d = Wp(Up(b.crv));
      if (b.x === void 0) throw new Y("x must be provided");
      if (b.y === void 0) throw new Y("y must be provided");
      var e = Qp(b.x);
      if (e.length !== d)
        throw new Y(
          "x-coordinate byte-length is invalid (got: " +
            e.length +
            ", want: " +
            d +
            ")."
        );
      e = Qp(b.y);
      if (e.length !== d)
        throw new Y(
          "y-coordinate byte-length is invalid (got: " +
            e.length +
            ", want: " +
            d +
            ")."
        );
      return c.return(b);
    });
  }
  function dq(a) {
    var b, c, d;
    return B(function (e) {
      if (e.j == 1) {
        b = a;
        c = b.crv;
        if (!c) throw new Y("crv must be provided");
        return e.g(
          globalThis.crypto.subtle.importKey(
            "jwk",
            a,
            { name: "ECDH", namedCurve: c },
            !0,
            []
          ),
          2
        );
      }
      d = e.i;
      return e.return(d);
    });
  }
  function eq(a) {
    var b, c, d;
    return B(function (e) {
      if (e.j == 1) {
        b = a;
        c = b.crv;
        if (!c) throw new Y("crv must be provided");
        return e.g(
          globalThis.crypto.subtle.importKey(
            "jwk",
            a,
            { name: "ECDH", namedCurve: c },
            !0,
            ["deriveKey", "deriveBits"]
          ),
          2
        );
      }
      d = e.i;
      return e.return(d);
    });
  }
  function fq(a, b) {
    var c = a.length;
    if (c < b) return (b = new Uint8Array(b - c)), Np(b, a);
    if (c > b) {
      for (var d = 0; d < c - b; d++)
        if (a[d] != 0)
          throw new X("Number needs more bytes to be represented.");
      return a.slice(c - b, c);
    }
    return a;
  }
  function gq(a) {
    switch (a) {
      case 2:
        return 1;
      case 3:
        return 2;
      case 4:
        return 3;
      default:
        throw new X("Unknown curve type.");
    }
  }
  function hq(a) {
    switch (a) {
      case 1:
        return "SHA-1";
      case 3:
        return "SHA-256";
      case 4:
        return "SHA-512";
      default:
        throw new X("Unknown hash type.");
    }
  }
  function iq(a) {
    switch (a) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      default:
        throw new X("Unknown point format.");
    }
  }
  var jq = new Map(),
    kq = new Map(),
    lq = new Map();
  function mq(a) {
    var b;
    b === void 0 && (b = !0);
    if (!a) throw new X("Key manager cannot be null.");
    var c = a.L();
    if (jq.has(c)) {
      if (!(jq.get(c) instanceof a.constructor))
        throw new X(
          "Key manager for key type " +
            c +
            " has already been registered and cannot be overwritten."
        );
      if (!kq.get(c) && b)
        throw new X(
          "Key manager for key type " +
            c +
            " has already been registered with forbidden new key operation."
        );
      kq.set(c, b);
    }
    jq.set(c, a);
    kq.set(c, b);
  }
  function nq(a) {
    var b = jq.get(a);
    if (!b)
      throw new X(
        "Key manager for key type " + a + " has not been registered."
      );
    return b;
  }
  function oq(a, b, c) {
    var d, e;
    return B(function (f) {
      if (f.j == 1) {
        if (b instanceof xp) {
          if (c && O(b, 1) != c)
            throw new X(
              "Key type is " +
                c +
                ", but it is expected to be " +
                O(b, 1) +
                " or undefined."
            );
          c = O(b, 1);
        }
        if (!c) throw new X("Key type has to be specified.");
        d = nq(c);
        return f.g(d.P(a, b), 2);
      }
      e = f.i;
      if (!(e instanceof a)) throw new TypeError("Unexpected type");
      return f.return(e);
    });
  }
  function pq(a) {
    if (!a) throw new X("primitive wrapper cannot be null");
    var b = a.K();
    if (!b) throw new X("primitive wrapper cannot be undefined");
    if (lq.has(b) && !(lq.get(b) instanceof a.constructor))
      throw new X(
        "primitive wrapper for type " +
          b +
          " has already been registered and cannot be overwritten"
      );
    lq.set(b, a);
  }
  function qq(a) {
    if (!Number.isInteger(a) || a < 0)
      throw new Y("n must be a nonnegative integer");
    a = new Uint8Array(a);
    globalThis.crypto.getRandomValues(a);
    return a;
  }
  function rq(a) {
    if (!a || !Cp(a) || Cp(a).length < 1)
      throw new X(
        "Keyset should be non null and must contain at least one key."
      );
    for (var b = !1, c = Cp(a).length, d = 0; d < c; d++) {
      var e = Cp(a)[d];
      if (!e) throw new X("Key should be non null.");
      if (!K(e, xp, 1))
        throw new X("Key data are missing for key " + N(e, 3) + ".");
      if (P(e, 4) === 0)
        throw new X("Key " + N(e, 3) + " has unknown output prefix type.");
      if (P(e, 2) === 0) throw new X("Key " + N(e, 3) + " has unknown status.");
      if (N(a, 1) === N(e, 3) && P(e, 2) === 1) {
        if (b) throw new X("Primary key has to be unique.");
        b = !0;
      }
    }
    if (!b)
      throw new X("Primary key has to be in the keyset and has to be enabled.");
    this.g = a;
  }
  rq.prototype.P = function (a, b) {
    var c = this,
      d;
    return B(function (e) {
      if (e.j == 1) {
        if (!a) throw new Y("primitive type must be non-null");
        return e.g(sq(c, a, b), 2);
      }
      d = e.i;
      var f = e.return;
      if (!d) throw new X("primitive set cannot be null.");
      var g = d.K(),
        h = lq.get(g);
      if (!h) throw new X("no primitive wrapper found for type " + g);
      h = h.wrap(d);
      if (!(h instanceof g)) throw new TypeError("Unexpected type");
      return f.call(e, h);
    });
  };
  function sq(a, b, c) {
    var d, e, f, g, h, k, l, m;
    return B(function (p) {
      switch (p.j) {
        case 1:
          (d = new Ip(b)), (e = Cp(a.g)), (f = e.length), (g = 0);
        case 2:
          if (!(g < f)) {
            p.H(4);
            break;
          }
          h = e[g];
          if (P(h, 2) !== 1) {
            p.H(3);
            break;
          }
          k = K(h, xp, 1);
          if (!k) throw new X("Key data has to be non null.");
          l = void 0;
          return c && c.L() === O(k, 1) ? p.g(c.P(b, k), 9) : p.g(oq(b, k), 8);
        case 8:
          l = p.i;
          p.H(7);
          break;
        case 9:
          l = p.i;
        case 7:
          var q = d,
            t = l;
          if (!t) throw new X("Primitive has to be non null.");
          if (!h) throw new X("Key has to be non null.");
          a: switch (P(h, 4)) {
            case 2:
            case 4:
              var r = Fp(N(h, 3), 0);
              break a;
            case 1:
              r = Fp(N(h, 3), 1);
              break a;
            case 3:
              r = Gp;
              break a;
            default:
              throw new X("Unsupported key prefix type.");
          }
          t = new Hp(t, r, P(h, 2), P(h, 4));
          r = [].concat(z(t.g)).toString();
          var v = Kp(q, r);
          v ? (v.push(t), q.g.set(r, v)) : q.g.set(r, [t]);
          m = t;
          if (N(h, 3) === N(a.g, 1)) {
            if (!m) throw new X("Primary cannot be set to null.");
            if (m.i != 1) throw new X("Primary has to be enabled.");
            q = Jp(d, m.g);
            t = !1;
            r = q.length;
            for (v = 0; v < r; v++)
              if (q[v].i === 1) {
                t = !0;
                break;
              }
            if (!t)
              throw new X(
                "Primary cannot be set to an entry which is not held by this primitive set."
              );
            d.i = m;
          }
        case 3:
          g++;
          p.H(2);
          break;
        case 4:
          return p.return(d);
      }
    });
  }
  rq.prototype.write = function () {
    return B(function () {
      throw new X("KeysetHandle -- write: Not implemented yet.");
    });
  };
  function tq() {}
  var uq = [16, 32];
  function vq(a) {
    if (!uq.includes(a)) throw new Y("unsupported AES key size: " + a);
  }
  function Z(a) {
    if (a == null || !(a instanceof Uint8Array))
      throw new Y("input must be a non null Uint8Array");
  }
  function wq(a, b) {
    if (a < 0 || a > b)
      throw new X("Version is out of bound, must be between 0 and " + b + ".");
  }
  function xq(a, b) {
    this.key = a;
    this.ea = b;
  }
  xq.prototype.encrypt = function (a) {
    var b = this,
      c,
      d,
      e,
      f;
    return B(function (g) {
      if (g.j == 1)
        return (
          Z(a),
          (c = qq(b.ea)),
          (d = new Uint8Array(16)),
          d.set(c),
          (e = { name: "AES-CTR", counter: d, length: 128 }),
          g.g(globalThis.crypto.subtle.encrypt(e, b.key, a), 2)
        );
      f = g.i;
      return g.return(Np(c, new Uint8Array(f)));
    });
  };
  xq.prototype.decrypt = function (a) {
    var b = this,
      c,
      d,
      e;
    return B(function (f) {
      if (f.j == 1) {
        Z(a);
        if (a.length < b.ea) throw new X("ciphertext too short");
        c = new Uint8Array(16);
        c.set(a.subarray(0, b.ea));
        d = { name: "AES-CTR", counter: c, length: 128 };
        e = Uint8Array;
        return f.g(
          globalThis.crypto.subtle.decrypt(
            d,
            b.key,
            new Uint8Array(a.subarray(b.ea))
          ),
          2
        );
      }
      return f.return(new e(f.i));
    });
  };
  function yq(a, b) {
    var c;
    return B(function (d) {
      if (d.j == 1) {
        if (!Number.isInteger(b))
          throw new X("invalid IV length, must be an integer");
        if (b < 12 || b > 16)
          throw new X("invalid IV length, must be at least 12 and at most 16");
        Z(a);
        vq(a.length);
        return d.g(
          globalThis.crypto.subtle.importKey(
            "raw",
            a,
            { name: "AES-CTR", length: a.length },
            !1,
            ["encrypt", "decrypt"]
          ),
          2
        );
      }
      c = d.i;
      return d.return(new xq(c, b));
    });
  }
  function zq() {}
  function Aq(a, b, c) {
    this.hash = a;
    this.key = b;
    this.ga = c;
  }
  w(Aq, zq);
  function Bq(a, b) {
    var c;
    return B(function (d) {
      if (d.j == 1)
        return (
          Z(b),
          d.g(
            globalThis.crypto.subtle.sign(
              { name: "HMAC", hash: { name: a.hash } },
              a.key,
              b
            ),
            2
          )
        );
      c = d.i;
      return d.return(new Uint8Array(c.slice(0, a.ga)));
    });
  }
  function Cq(a, b, c) {
    var d;
    return B(function (e) {
      if (e.j == 1) return Z(b), Z(c), e.g(Bq(a, c), 2);
      d = e.i;
      if (b.length !== d.length) var f = !1;
      else {
        for (var g = (f = 0); g < b.length; g++) f |= b[g] ^ d[g];
        f = f == 0;
      }
      return e.return(f);
    });
  }
  function Dq(a, b, c) {
    var d;
    return B(function (e) {
      if (e.j == 1) {
        Z(b);
        if (!Number.isInteger(c))
          throw new Y("invalid tag size, must be an integer");
        if (c < 10)
          throw new Y(
            "tag too short, must be at least " + (10).toString() + " bytes"
          );
        switch (a) {
          case "SHA-1":
            if (c > 20)
              throw new Y("tag too long, must not be larger than 20 bytes");
            break;
          case "SHA-256":
            if (c > 32)
              throw new Y("tag too long, must not be larger than 32 bytes");
            break;
          case "SHA-384":
            if (c > 48)
              throw new Y("tag too long, must not be larger than 48 bytes");
            break;
          case "SHA-512":
            if (c > 64)
              throw new Y("tag too long, must not be larger than 64 bytes");
            break;
          default:
            throw new Y(a + " is not supported");
        }
        return e.g(
          globalThis.crypto.subtle.importKey(
            "raw",
            b,
            { name: "HMAC", hash: { name: a }, length: b.length * 8 },
            !1,
            ["sign", "verify"]
          ),
          2
        );
      }
      d = e.i;
      return e.return(new Aq(a, d, c));
    });
  }
  function Eq(a, b, c, d) {
    this.g = a;
    this.ea = b;
    this.i = c;
    this.ga = d;
  }
  w(Eq, tq);
  Eq.prototype.encrypt = function (a, b) {
    b = b === void 0 ? new Uint8Array(0) : b;
    var c = this,
      d,
      e,
      f;
    return B(function (g) {
      if (g.j == 1) return Z(a), g.g(c.g.encrypt(a), 2);
      if (g.j != 3)
        return (
          (d = g.i), Z(b), (e = Op(b.length * 8)), g.g(Bq(c.i, Np(b, d, e)), 3)
        );
      f = g.i;
      if (c.ga != f.length)
        throw new X(
          "invalid tag size, expected " + c.ga + " but got " + f.length
        );
      return g.return(Np(d, f));
    });
  };
  Eq.prototype.decrypt = function (a, b) {
    b = b === void 0 ? new Uint8Array(0) : b;
    var c = this,
      d,
      e,
      f,
      g,
      h;
    return B(function (k) {
      if (k.j == 1) {
        Z(a);
        if (a.length < c.ea + c.ga) throw new X("ciphertext too short");
        d = new Uint8Array(a.subarray(0, a.length - c.ga));
        Z(b);
        e = Op(b.length * 8);
        f = Np(b, d, e);
        g = new Uint8Array(a.subarray(d.length));
        return k.g(Cq(c.i, g, f), 2);
      }
      h = k.i;
      if (!h) throw new X("invalid MAC");
      return k.return(c.g.decrypt(d));
    });
  };
  function Fq(a, b, c, d, e) {
    var f, g;
    return B(function (h) {
      if (h.j == 1) return Z(a), Z(d), h.g(yq(a, b), 2);
      if (h.j != 3) return (f = h.i), h.g(Dq(c, d, e), 3);
      g = h.i;
      return h.return(new Eq(f, b, g, e));
    });
  }
  function Gq() {}
  Gq.prototype.pa = function (a) {
    if (a instanceof Uint8Array) {
      try {
        var b = Vo(a);
      } catch (e) {
        throw new X(
          "Could not parse the given Uint8Array as a serialized proto of type.googleapis.com/google.crypto.tink.AesCtrHmacAeadKey"
        );
      }
      if (!b || !K(b, So, 1) || !K(b, To, 2))
        throw new X(
          "Could not parse the given Uint8Array as a serialized proto of type.googleapis.com/google.crypto.tink.AesCtrHmacAeadKey"
        );
    } else if (a instanceof Uo) b = a;
    else throw new X("Expected AesCtrHmacAeadKeyFormat-proto");
    var c = Hq(K(b, So, 1));
    a = c.qb;
    c = c.ya;
    var d = new Lo();
    d = Te(d, 1, 0);
    a = Le(d, 2, a);
    c = qq(c);
    a = Ue(a, 3, c);
    c = Iq(K(b, To, 2));
    b = c.Ab;
    c = c.zb;
    d = new No();
    d = Te(d, 1, 0);
    b = Le(d, 2, b);
    c = qq(c);
    b = Ue(b, 3, c);
    c = new Oo();
    a = Le(c, 2, a);
    return Le(a, 3, b);
  };
  function Hq(a) {
    if (!a)
      throw new X("Invalid AES CTR HMAC key format: key format undefined");
    var b = N(a, 2);
    vq(b);
    a = K(a, Ko, 1);
    if (!a) throw new X("Invalid AES CTR HMAC key format: params undefined");
    var c = N(a, 1);
    if (c < 12 || c > 16)
      throw new X(
        "Invalid AES CTR HMAC key format: IV size is out of range: " + c
      );
    return { qb: a, ya: b, ea: c };
  }
  function Iq(a) {
    if (!a)
      throw new X("Invalid AES CTR HMAC key format: key format undefined");
    var b = N(a, 2);
    if (b < 16)
      throw new X(
        "Invalid AES CTR HMAC key format: HMAC key is too small: " + N(a, 2)
      );
    a = K(a, Mo, 1);
    if (!a) throw new X("Invalid AES CTR HMAC key format: params undefined");
    var c = N(a, 2);
    if (c < 10)
      throw new X("Invalid HMAC params: tag size " + c + " is too small.");
    if (!Jq.has(P(a, 1))) throw new X("Unknown hash type.");
    if (c > Jq.get(P(a, 1)))
      throw new X("Invalid HMAC params: tag size " + c + " is out of range.");
    switch (P(a, 1)) {
      case 1:
        var d = "SHA-1";
        break;
      case 3:
        d = "SHA-256";
        break;
      case 4:
        d = "SHA-512";
        break;
      default:
        d = "UNKNOWN HASH";
    }
    return { Ab: a, zb: b, yb: d, ga: c };
  }
  var Jq = new Map([
    [1, 20],
    [3, 32],
    [4, 64],
  ]);
  function Kq() {
    this.g = new Gq();
  }
  n = Kq.prototype;
  n.P = function (a, b) {
    var c,
      d,
      e,
      f,
      g,
      h = this,
      k,
      l,
      m,
      p,
      q,
      t;
    return B(function (r) {
      if (r.j == 1) {
        if (a != h.K())
          throw new X(
            "Requested primitive type which is not supported by this key manager."
          );
        if (b instanceof xp) {
          if (!h.ma(O(b, 1)))
            throw new X(
              "Key type " +
                O(b, 1) +
                " is not supported. This key manager supports " +
                h.L() +
                "."
            );
          try {
            k = Ro(b.getValue());
          } catch (Aa) {
            throw new X(
              "Could not parse the key in key data as a serialized proto of type.googleapis.com/google.crypto.tink.AesCtrHmacAeadKey"
            );
          }
          if (k === null || k === void 0)
            throw new X(
              "Could not parse the key in key data as a serialized proto of type.googleapis.com/google.crypto.tink.AesCtrHmacAeadKey"
            );
        } else if (b instanceof Oo) k = b;
        else
          throw new X(
            "Given key type is not supported. This key manager supports " +
              h.L() +
              "."
          );
        var v = K(k, Lo, 2);
        if (!v) throw new X("Invalid AES CTR HMAC key format: key undefined");
        wq(v.getVersion(), h.getVersion());
        var y = new So();
        var L = K(v, Ko, 2);
        y = Le(y, 1, L);
        L = Mp(J(v, 3));
        y = Te(y, 2, L);
        y = Hq(y).ea;
        f = Lp(J(v, 3));
        g = y;
        l = f;
        m = g;
        v = K(k, No, 3);
        if (!v) throw new X("Invalid AES CTR HMAC key format: key undefined");
        wq(v.getVersion(), h.getVersion());
        y = new To();
        L = K(v, Mo, 2);
        y = Le(y, 1, L);
        L = Mp(J(v, 3));
        y = Te(y, 2, L);
        L = Iq(y);
        y = L.yb;
        L = L.ga;
        c = Lp(J(v, 3));
        d = y;
        e = L;
        p = c;
        q = d;
        t = e;
        return r.g(Fq(l, m, q, p, t), 2);
      }
      return r.return(r.i);
    });
  };
  n.ma = function (a) {
    return a === this.L();
  };
  n.L = function () {
    return "type.googleapis.com/google.crypto.tink.AesCtrHmacAeadKey";
  };
  n.K = function () {
    return tq;
  };
  n.getVersion = function () {
    return 0;
  };
  n.oa = function () {
    return this.g;
  };
  function Lq(a) {
    var b = a.key;
    a = a.Z;
    this.key = b;
    this.Z = a;
  }
  Lq.prototype.encrypt = function (a, b, c) {
    var d = this,
      e,
      f;
    return B(function (g) {
      if (g.j == 1) {
        if (a.length !== 12) throw new X("IV must be 12 bytes");
        e = { name: "AES-GCM", iv: a, tagLength: 128 };
        c && (e.additionalData = c);
        return g.g(globalThis.crypto.subtle.encrypt(e, d.key, b), 2);
      }
      f = g.i;
      return g.return(d.Z ? Np(a, new Uint8Array(f)) : new Uint8Array(f));
    });
  };
  Lq.prototype.decrypt = function (a, b, c) {
    var d = this,
      e,
      f,
      g,
      h,
      k;
    return B(function (l) {
      if (l.j == 1) {
        e = d.Z ? 28 : 16;
        if (b.length < e) throw new X("ciphertext too short");
        if (a.length !== 12) throw new X("IV must be 12 bytes");
        f = { name: "AES-GCM", iv: a, tagLength: 128 };
        c && (f.additionalData = c);
        g = d.Z ? new Uint8Array(b.subarray(12)) : b;
        l.C(2);
        h = Uint8Array;
        return l.g(globalThis.crypto.subtle.decrypt(f, d.key, g), 4);
      }
      if (l.j != 2) return l.return(new h(l.i));
      k = l.A();
      throw new X(k.toString());
    });
  };
  function Mq(a) {
    var b = a.key;
    var c = a.Z;
    var d;
    return B(function (e) {
      if (e.j == 1) {
        if (![16, 32].includes(b.length))
          throw new Y("unsupported AES key size: ${n}");
        return e.g(
          globalThis.crypto.subtle.importKey(
            "raw",
            b,
            { name: "AES-GCM", length: b.length },
            !1,
            ["encrypt", "decrypt"]
          ),
          2
        );
      }
      d = e.i;
      return e.return(new Lq({ key: d, Z: c }));
    });
  }
  function Nq(a) {
    this.key = a;
    this.g = new Lq({ key: a, Z: !0 });
  }
  w(Nq, tq);
  Nq.prototype.encrypt = function (a, b) {
    var c = this,
      d;
    return B(function (e) {
      d = qq(12);
      return e.return(c.g.encrypt(d, a, b));
    });
  };
  Nq.prototype.decrypt = function (a, b) {
    var c = this,
      d;
    return B(function (e) {
      d = new Uint8Array(12);
      d.set(a.subarray(0, 12));
      return e.return(c.g.decrypt(d, a, b));
    });
  };
  function Oq(a) {
    var b;
    return B(function (c) {
      if (c.j == 1)
        return (
          vq(a.length),
          c.g(
            globalThis.crypto.subtle.importKey(
              "raw",
              a,
              { name: "AES-GCM", length: a.length },
              !1,
              ["encrypt", "decrypt"]
            ),
            2
          )
        );
      b = c.i;
      return c.return(new Nq(b));
    });
  }
  function Pq() {}
  Pq.prototype.pa = function (a) {
    if (a instanceof Uint8Array) {
      try {
        var b = Zo(a);
      } catch (c) {
        throw new X(
          "Could not parse the input as a serialized proto of type.googleapis.com/google.crypto.tink.AesGcmKey key format."
        );
      }
      if (!N(b, 2))
        throw new X(
          "Could not parse the input as a serialized proto of type.googleapis.com/google.crypto.tink.AesGcmKey key format."
        );
      a = b;
    } else if (!(a instanceof Yo))
      throw new X("Expected AesGcmKeyFormat-proto");
    b = a;
    vq(N(b, 2));
    a = new Wo();
    b = qq(N(b, 2));
    a = Ue(a, 3, b);
    return Te(a, 1, 0);
  };
  function Qq() {
    this.g = new Pq();
  }
  n = Qq.prototype;
  n.P = function (a, b) {
    var c = this,
      d;
    return B(function (e) {
      if (e.j == 1) {
        if (a != c.K())
          throw new X(
            "Requested primitive type which is not supported by this key manager."
          );
        if (b instanceof xp) {
          if (O(b, 1) != "type.googleapis.com/google.crypto.tink.AesGcmKey")
            throw new X(
              "Key type " +
                O(b, 1) +
                " is not supported. This key manager supports type.googleapis.com/google.crypto.tink.AesGcmKey."
            );
          try {
            var f = Xo(b.getValue());
          } catch (g) {
            throw new X(
              "Could not parse the input as a serialized proto of type.googleapis.com/google.crypto.tink.AesGcmKey key."
            );
          }
        } else if (b instanceof Wo) f = b;
        else
          throw new X(
            "Key type is not supported. This key manager supports type.googleapis.com/google.crypto.tink.AesGcmKey."
          );
        d = f;
        vq(Mp(J(d, 3)));
        wq(d.getVersion(), 0);
        return e.g(Oq(Lp(J(d, 3))), 2);
      }
      return e.return(e.i);
    });
  };
  n.ma = function (a) {
    return a === this.L();
  };
  n.L = function () {
    return "type.googleapis.com/google.crypto.tink.AesGcmKey";
  };
  n.K = function () {
    return tq;
  };
  n.getVersion = function () {
    return 0;
  };
  n.oa = function () {
    return this.g;
  };
  function Rq() {}
  function Sq(a) {
    this.g = a;
  }
  w(Sq, Rq);
  Sq.prototype.decrypt = function (a, b) {
    var c = this,
      d,
      e,
      f,
      g,
      h;
    return B(function (k) {
      switch (k.j) {
        case 1:
          if (!a) throw new X("Ciphertext has to be non-null.");
          if (!(a.length > 5)) {
            k.H(2);
            break;
          }
          d = a.subarray(0, 5);
          return k.g(Jp(c.g, d), 3);
        case 3:
          return (
            (e = k.i),
            (f = a.subarray(5, a.length)),
            k.C(4),
            k.g(Tq(e, f, b), 6)
          );
        case 6:
          g = k.i;
          k.G(5);
          break;
        case 4:
          k.A();
        case 5:
          if (g) return k.return(g);
        case 2:
          return k.g(Jp(c.g, Gp), 7);
        case 7:
          return (h = k.i), k.return(Tq(h, a, b));
      }
    });
  };
  function Tq(a, b, c) {
    var d, e, f, g;
    return B(function (h) {
      switch (h.j) {
        case 1:
          (d = a.length), (e = 0);
        case 2:
          if (!(e < d)) {
            h.H(4);
            break;
          }
          if (a[e].i != 1) {
            h.H(3);
            break;
          }
          f = a[e].P();
          g = void 0;
          h.C(5);
          return h.g(f.decrypt(b, c), 7);
        case 7:
          g = h.i;
          h.G(6);
          break;
        case 5:
          h.A();
          h.H(3);
          break;
        case 6:
          return h.return(g);
        case 3:
          e++;
          h.H(2);
          break;
        case 4:
          throw new X("Decryption failed for the given ciphertext.");
      }
    });
  }
  function Uq() {}
  Uq.prototype.wrap = function (a) {
    if (!a) throw new X("Primitive set has to be non-null.");
    return new Sq(a);
  };
  Uq.prototype.K = function () {
    return Rq;
  };
  function Vq(a) {
    var b = null;
    var c = a instanceof kp ? K(a, ip, 2) : a;
    var d = K(c, ep, 2);
    if (!d) throw new X("Params not set");
    d = K(d, cp, 1);
    if (!d) throw new X("KEM params not set");
    d = gq(P(d, 1));
    var e = Wp(d),
      f = fq(Lp(J(c, 3)), e);
    c = fq(Lp(J(c, 4)), e);
    a instanceof kp && (b = fq(Lp(J(a, 3)), e));
    a = b;
    b = { kty: "EC", crv: Tp(d), x: Sp(f), y: Sp(c), ext: !0 };
    a && (b.d = Sp(a));
    return b;
  }
  function Wq(a) {
    var b = K(a, cp, 1);
    if (!b) throw new X("Invalid params - missing KEM params.");
    var c = P(b, 1);
    if (c !== 2 && c !== 3 && c !== 4)
      throw new X("Invalid KEM params - unknown curve type.");
    b = P(b, 2);
    if (b !== 1 && b !== 3 && b !== 2 && b !== 4)
      throw new X("Invalid KEM params - unknown hash type.");
    b = K(a, ap, 2);
    if (!b) throw new X("Invalid params - missing DEM params.");
    if (!K(b, $o, 2))
      throw new X("Invalid DEM params - missing AEAD key template.");
    b = K(b, $o, 2);
    b = O(b, 1);
    if (
      b != "type.googleapis.com/google.crypto.tink.AesCtrHmacAeadKey" &&
      b != "type.googleapis.com/google.crypto.tink.AesGcmKey"
    )
      throw new X(
        "Invalid DEM params - " +
          b +
          " template is not supported by ECIES AEAD HKDF."
      );
    a = P(a, 3);
    if (a !== 1 && a !== 2 && a !== 3)
      throw new X("Invalid key params - unknown EC point format.");
  }
  function Xq(a, b) {
    wq(a.getVersion(), b);
    b = K(a, ep, 2);
    if (!b) throw new X("Invalid public key - missing key params.");
    Wq(b);
    if (!Mp(J(a, 3)) || !Mp(J(a, 4)))
      throw new X("Invalid public key - missing value of X or Y.");
  }
  function Yq() {}
  function Zq(a) {
    var b = O(a, 1);
    switch (b) {
      case "type.googleapis.com/google.crypto.tink.AesCtrHmacAeadKey":
        try {
          var c = Vo(a.getValue());
        } catch (f) {
          throw new X(
            "Could not parse the given Uint8Array as a serialized proto of type.googleapis.com/google.crypto.tink.AesCtrHmacAeadKey."
          );
        }
        if (!K(c, So, 1) || !K(c, To, 2))
          throw new X(
            "Could not parse the given Uint8Array as a serialized proto of type.googleapis.com/google.crypto.tink.AesCtrHmacAeadKey."
          );
        a = c;
        var d = K(a, So, 1);
        if (!d) throw new X("AES-CTR key format not set");
        d = N(d, 2);
        c = K(a, To, 2);
        if (!c) throw new X("HMAC key format not set");
        c = N(c, 2);
        c = d + c;
        break;
      case "type.googleapis.com/google.crypto.tink.AesGcmKey":
        try {
          var e = Zo(a.getValue());
        } catch (f) {
          throw new X(
            "Could not parse the given Uint8Array as a serialized proto of type.googleapis.com/google.crypto.tink.AesGcmKey."
          );
        }
        if (!N(e, 2))
          throw new X(
            "Could not parse the given Uint8Array as a serialized proto of type.googleapis.com/google.crypto.tink.AesGcmKey."
          );
        a = e;
        c = N(a, 2);
        break;
      default:
        throw new X("Key type URL " + b + " is not supported.");
    }
    this.key = nq(b).oa().pa(a);
    this.g = b;
    this.sa = c;
    this.ya = d;
  }
  Zq.prototype.ia = function (a) {
    var b = this,
      c;
    return B(function (d) {
      if (a.length !== b.sa)
        throw new X(
          "Key is not of the correct length, expected length: " +
            b.sa +
            ", but got key of length: " +
            a.length +
            "."
        );
      if (b.g === "type.googleapis.com/google.crypto.tink.AesCtrHmacAeadKey") {
        var e = b.key,
          f = K(e, Lo, 2);
        if (!f) throw new X("AES-CTR key not set");
        Ue(f, 3, a.slice(0, b.ya));
        f = K(e, No, 3);
        if (!f) throw new X("HMAC key not set");
        Ue(f, 3, a.slice(b.ya, b.sa));
        c = e;
      } else {
        if (!(b.key instanceof Wo)) throw new X("Key is not an AES-CTR key");
        c = Ue(b.key, 3, a);
      }
      return d.return(oq(tq, c, b.g));
    });
  };
  function $q(a, b, c, d, e) {
    var f, g, h, k, l, m, p, q, t;
    return B(function (r) {
      switch (r.j) {
        case 1:
          if (!Number.isInteger(a)) throw new Y("size must be an integer");
          if (a <= 0) throw new Y("size must be positive");
          switch (b) {
            case "SHA-1":
              f = 20;
              if (a > 5100) throw new Y("size too large");
              break;
            case "SHA-256":
              f = 32;
              if (a > 8160) throw new Y("size too large");
              break;
            case "SHA-512":
              f = 64;
              if (a > 16320) throw new Y("size too large");
              break;
            default:
              throw new Y(b + " is not supported");
          }
          Z(c);
          Z(d);
          g = e;
          if (e == null || g === void 0 || g.length == 0) g = new Uint8Array(f);
          Z(g);
          return r.g(Dq(b, g, f), 2);
        case 2:
          return (h = r.i), r.g(Bq(h, c), 3);
        case 3:
          return (k = r.i), r.g(Dq(b, k, f), 4);
        case 4:
          (h = r.i),
            (l = 1),
            (m = 0),
            (p = new Uint8Array(0)),
            (q = new Uint8Array(a));
        case 5:
          return (
            (t = new Uint8Array(p.length + d.length + 1)),
            t.set(p, 0),
            t.set(d, p.length),
            (t[t.length - 1] = l),
            r.g(Bq(h, t), 8)
          );
        case 8:
          p = r.i;
          if (m + p.length < a) q.set(p, m), (m += p.length), l++;
          else {
            q.set(p.subarray(0, a - m), m);
            r.H(7);
            break;
          }
          r.H(5);
          break;
        case 7:
          return r.return(q);
      }
    });
  }
  function ar(a) {
    if (!a) throw new X("Recipient public key has to be non-null.");
    if (a.type !== "public" || !a.algorithm)
      throw new X("Expected Crypto key of type: public.");
    this.publicKey = a;
  }
  ar.prototype.Pa = function (a, b, c, d, e) {
    var f = this,
      g,
      h,
      k,
      l,
      m,
      p,
      q,
      t,
      r,
      v;
    return B(function (y) {
      switch (y.j) {
        case 1:
          g = f.publicKey.algorithm;
          h = g.namedCurve;
          if (!h) throw new X("Curve has to be defined.");
          return y.g(bq(h), 2);
        case 2:
          return (k = y.i), y.g(aq(k.privateKey, f.publicKey), 3);
        case 3:
          return (l = y.i), y.g(cq(k.publicKey), 4);
        case 4:
          p = m = y.i;
          q = p.crv;
          if (!q) throw new X("Curve has to be defined.");
          t = Vp(q, b, m);
          r = Np(t, l);
          return y.g($q(a, c, r, d, e), 5);
        case 5:
          return (v = y.i), y.return({ key: v, token: t });
      }
    });
  };
  function br(a) {
    var b;
    return B(function (c) {
      if (c.j == 1) return c.g(dq(a), 2);
      b = c.i;
      return c.return(new ar(b));
    });
  }
  function cr(a, b, c, d, e) {
    if (!a) throw new X("KEM sender has to be non-null.");
    if (!b) throw new X("HMAC algorithm has to be non-null.");
    if (!c) throw new X("Point format has to be non-null.");
    if (!d) throw new X("DEM helper has to be non-null.");
    this.A = a;
    this.i = b;
    this.l = c;
    this.g = d;
    this.j = e;
  }
  w(cr, Yq);
  cr.prototype.encrypt = function (a, b) {
    b = b === void 0 ? new Uint8Array(0) : b;
    var c = this,
      d,
      e,
      f,
      g,
      h;
    return B(function (k) {
      switch (k.j) {
        case 1:
          return (d = c.g.sa), k.g(c.A.Pa(d, c.l, c.i, b, c.j), 2);
        case 2:
          return (e = k.i), k.g(c.g.ia(e.key), 3);
        case 3:
          return (f = k.i), k.g(f.encrypt(a), 4);
        case 4:
          return (g = k.i), (h = e.token), k.return(Np(h, g));
      }
    });
  };
  function dr(a, b, c, d, e) {
    var f;
    return B(function (g) {
      if (g.j == 1) {
        if (!a) throw new X("Recipient public key has to be non-null.");
        if (!b) throw new X("HMAC algorithm has to be non-null.");
        if (!c) throw new X("Point format has to be non-null.");
        if (!d) throw new X("DEM helper has to be non-null.");
        return g.g(br(a), 2);
      }
      f = g.i;
      return g.return(new cr(f, b, c, d, e));
    });
  }
  function er() {}
  er.prototype.pa = function () {
    throw new X(
      "This operation is not supported for public keys. Use EciesAeadHkdfPrivateKeyManager to generate new keys."
    );
  };
  function fr() {
    this.g = new er();
  }
  n = fr.prototype;
  n.P = function (a, b) {
    var c = this,
      d,
      e,
      f,
      g,
      h,
      k,
      l,
      m,
      p,
      q;
    return B(function (t) {
      if (a !== c.K())
        throw new X(
          "Requested primitive type which is not supported by this key manager."
        );
      if (b instanceof xp) {
        if (
          O(b, 1) !==
          "type.googleapis.com/google.crypto.tink.EciesAeadHkdfPublicKey"
        )
          throw new X(
            "Key type " +
              O(b, 1) +
              " is not supported. This key manager supports type.googleapis.com/google.crypto.tink.EciesAeadHkdfPublicKey."
          );
        try {
          var r = mp(b.getValue());
        } catch (v) {
          throw new X(
            "Input cannot be parsed as type.googleapis.com/google.crypto.tink.EciesAeadHkdfPublicKey key-proto."
          );
        }
        if (!K(r, ep, 2) || !J(r, 3) || !J(r, 4))
          throw new X(
            "Input cannot be parsed as type.googleapis.com/google.crypto.tink.EciesAeadHkdfPublicKey key-proto."
          );
      } else if (b instanceof ip) r = b;
      else
        throw new X(
          "Key type is not supported. This key manager supports type.googleapis.com/google.crypto.tink.EciesAeadHkdfPublicKey."
        );
      d = r;
      Xq(d, c.getVersion());
      e = Vq(d);
      f = K(d, ep, 2);
      g = K(f, ap, 2);
      if (!g) throw new X("DEM params not set");
      h = K(g, $o, 2);
      k = new Zq(h);
      l = iq(P(f, 3));
      m = K(f, cp, 1);
      if (!m) throw new X("KEM params not set");
      p = hq(P(m, 2));
      q = Lp(J(m, 11));
      return t.return(dr(e, p, l, k, q));
    });
  };
  n.ma = function (a) {
    return a === this.L();
  };
  n.L = function () {
    return "type.googleapis.com/google.crypto.tink.EciesAeadHkdfPublicKey";
  };
  n.K = function () {
    return Yq;
  };
  n.getVersion = function () {
    return 0;
  };
  n.oa = function () {
    return this.g;
  };
  function gr(a) {
    if (!a) throw new X("Private key has to be non-null.");
    if (a.type !== "private" || !a.algorithm)
      throw new X("Expected crypto key of type: private.");
    this.g = a;
  }
  gr.prototype.Na = function (a, b, c, d, e, f) {
    var g = this,
      h,
      k,
      l,
      m,
      p,
      q,
      t;
    return B(function (r) {
      switch (r.j) {
        case 1:
          h = g.g.algorithm;
          k = h.namedCurve;
          if (!k) throw new X("Curve has to be defined.");
          l = $p(k, c, a);
          return r.g(dq(l), 2);
        case 2:
          return (m = r.i), r.g(aq(g.g, m), 3);
        case 3:
          return (p = r.i), (q = Np(a, p)), r.g($q(b, d, q, e, f), 4);
        case 4:
          return (t = r.i), r.return(t);
      }
    });
  };
  function hr(a) {
    var b;
    return B(function (c) {
      if (c.j == 1) return c.g(eq(a), 2);
      b = c.i;
      return c.return(new gr(b));
    });
  }
  function ir(a, b, c, d, e, f) {
    if (!a) throw new X("Recipient private key has to be non-null.");
    if (!b) throw new X("KEM recipient has to be non-null.");
    if (!c) throw new X("HKDF hash algorithm has to be non-null.");
    if (!d) throw new X("Point format has to be non-null.");
    if (!e) throw new X("DEM helper has to be non-null.");
    a = a.crv;
    if (!a) throw new X("Curve has to be defined.");
    a = Up(a);
    a: {
      switch (d) {
        case 1:
          a = 2 * Wp(a) + 1;
          break a;
        case 2:
          a = Wp(a) + 1;
          break a;
        case 3:
          a = 2 * Wp(a);
          break a;
      }
      a = void 0;
    }
    this.B = b;
    this.j = c;
    this.A = d;
    this.i = e;
    this.g = a;
    this.l = f;
  }
  w(ir, Rq);
  ir.prototype.decrypt = function (a, b) {
    var c = this,
      d,
      e,
      f;
    return B(function (g) {
      if (g.j == 1) {
        if (a.length < c.g) throw new X("Ciphertext is too short.");
        d = a.slice(0, c.g);
        e = a.slice(c.g, a.length);
        return g.g(c.ia(d, b), 2);
      }
      f = g.i;
      return g.return(f.decrypt(e));
    });
  };
  ir.prototype.ia = function (a, b) {
    var c = this,
      d;
    return B(function (e) {
      if (e.j == 1)
        return (
          b || (b = new Uint8Array(0)),
          e.g(c.B.Na(a, c.i.sa, c.A, c.j, b, c.l), 2)
        );
      d = e.i;
      return e.return(c.i.ia(d));
    });
  };
  function jr(a, b, c, d, e) {
    var f;
    return B(function (g) {
      if (g.j == 1) {
        if (!a) throw new X("Recipient private key has to be non-null.");
        if (!b) throw new X("HKDF hash algorithm has to be non-null.");
        if (!c) throw new X("Point format has to be non-null.");
        if (!d) throw new X("DEM helper has to be non-null.");
        if (!a) throw new X("Recipient private key has to be non-null.");
        return g.g(hr(a), 2);
      }
      f = g.i;
      return g.return(new ir(a, f, b, c, d, e));
    });
  }
  function kr() {}
  kr.prototype.pa = function (a) {
    var b, c, d, e, f, g, h, k, l;
    return B(function (m) {
      switch (m.j) {
        case 1:
          if (!a) throw new X("Key format has to be non-null.");
          if (a instanceof Uint8Array) {
            try {
              var p = hp(a);
            } catch (v) {
              throw new X(
                "Input cannot be parsed as type.googleapis.com/google.crypto.tink.EciesAeadHkdfPrivateKey key format proto."
              );
            }
            if (!K(p, ep, 1))
              throw new X(
                "Input cannot be parsed as type.googleapis.com/google.crypto.tink.EciesAeadHkdfPrivateKey key format proto."
              );
          } else if (a instanceof gp) p = a;
          else
            throw new X(
              "Expected type.googleapis.com/google.crypto.tink.EciesAeadHkdfPrivateKey key format proto."
            );
          b = p;
          p = K(b, ep, 1);
          if (!p) throw new X("Invalid key format - missing key params.");
          Wq(p);
          c = K(b, ep, 1);
          if (!c) throw new X("Params not set");
          d = K(c, cp, 1);
          if (!d) throw new X("KEM params not set");
          e = P(d, 1);
          f = gq(e);
          g = Tp(f);
          return m.g(bq(g), 2);
        case 2:
          return (h = m.i), m.g(cq(h.publicKey), 3);
        case 3:
          return (k = m.i), m.g(cq(h.privateKey), 4);
        case 4:
          l = m.i;
          p = m.return;
          var q = k.x;
          var t = k.y;
          if (q === void 0) throw new X("x must be set");
          if (t === void 0) throw new X("y must be set");
          var r = new ip();
          r = Te(r, 1, 0);
          r = Le(r, 2, c);
          q = Qp(q);
          q = Ue(r, 3, q);
          t = Qp(t);
          q = Ue(q, 4, t);
          t = l.d;
          if (t === void 0) throw new X("d must be set");
          r = new kp();
          r = Te(r, 1, 0);
          q = Le(r, 2, q);
          t = Qp(t);
          t = Ue(q, 3, t);
          return p.call(m, t);
      }
    });
  };
  function lr() {
    this.g = new kr();
  }
  n = lr.prototype;
  n.P = function (a, b) {
    var c = this,
      d,
      e,
      f,
      g,
      h,
      k,
      l,
      m,
      p,
      q,
      t;
    return B(function (r) {
      if (a !== c.K())
        throw new X(
          "Requested primitive type which is not supported by this key manager."
        );
      if (b instanceof xp) {
        if (
          O(b, 1) !==
          "type.googleapis.com/google.crypto.tink.EciesAeadHkdfPrivateKey"
        )
          throw new X(
            "Key type " +
              O(b, 1) +
              " is not supported. This key manager supports type.googleapis.com/google.crypto.tink.EciesAeadHkdfPrivateKey."
          );
        var v = b.getValue();
        try {
          var y = lp(v);
        } catch (L) {
          throw new X(
            "Input cannot be parsed as type.googleapis.com/google.crypto.tink.EciesAeadHkdfPrivateKey key-proto."
          );
        }
        if (!K(y, ip, 2) || !J(y, 3))
          throw new X(
            "Input cannot be parsed as type.googleapis.com/google.crypto.tink.EciesAeadHkdfPrivateKey key-proto."
          );
        v = y;
      } else if (b instanceof kp) v = b;
      else
        throw new X(
          "Key type is not supported. This key manager supports type.googleapis.com/google.crypto.tink.EciesAeadHkdfPrivateKey."
        );
      d = v;
      wq(d.getVersion(), 0);
      if (!J(d, 3))
        throw new X("Invalid private key - missing private key value.");
      v = K(d, ip, 2);
      if (!v)
        throw new X("Invalid private key - missing public key information.");
      Xq(v, 0);
      e = Vq(d);
      f = K(d, ip, 2);
      if (!f) throw new X("Public key not set");
      g = K(f, ep, 2);
      if (!g) throw new X("Params not set");
      h = K(g, ap, 2);
      if (!h) throw new X("DEM params not set");
      k = K(h, $o, 2);
      if (!k) throw new X("Key template not set");
      l = new Zq(k);
      m = iq(P(g, 3));
      p = K(g, cp, 1);
      if (!p) throw new X("KEM params not set");
      q = hq(P(p, 2));
      t = Lp(J(p, 11));
      return r.return(jr(e, q, m, l, t));
    });
  };
  n.ma = function (a) {
    return a === this.L();
  };
  n.L = function () {
    return "type.googleapis.com/google.crypto.tink.EciesAeadHkdfPrivateKey";
  };
  n.K = function () {
    return Rq;
  };
  n.getVersion = function () {
    return 0;
  };
  n.oa = function () {
    return this.g;
  };
  function mr(a) {
    this.g = a;
  }
  w(mr, Yq);
  mr.prototype.encrypt = function (a, b) {
    var c = this,
      d,
      e,
      f,
      g;
    return B(function (h) {
      if (h.j == 1) {
        if (!a) throw new X("Plaintext has to be non-null.");
        d = c.g.i;
        if (!d) throw new X("Primary not set.");
        e = d.P();
        return h.g(e.encrypt(a, b), 2);
      }
      f = h.i;
      g = d.g;
      return h.return(Np(g, f));
    });
  };
  function nr() {}
  nr.prototype.wrap = function (a) {
    if (!a) throw new X("Primitive set has to be non-null.");
    if (!a.i) throw new X("Primary has to be non-null.");
    return new mr(a);
  };
  nr.prototype.K = function () {
    return Yq;
  };
  var pr = or(1, 0),
    qr = or(2, 16),
    rr = or(2, 18),
    sr = or(2, 1),
    tr = or(2, 3),
    ur = or(2, 1),
    vr = or(2, 2),
    wr = Rp("KEM"),
    xr = Rp("HPKE"),
    yr = Rp("HPKE-v1");
  function or(a, b) {
    for (var c = new Uint8Array(a), d = 0; d < a; d++)
      c[d] = (b >> (8 * (a - d - 1))) & 255;
    return c;
  }
  function zr(a) {
    var b = a.da;
    var c = a.ca;
    return Np(yr, a.M, Rp(b), c);
  }
  function Ar(a) {
    var b = a.ja;
    var c = a.info;
    var d = a.M;
    return Np(or(2, a.length), yr, d, Rp(b), c);
  }
  function Br(a) {
    switch (a) {
      case 2:
        return 1;
      case 4:
        return 3;
      default:
        throw new Y("Unrecognized NIST HPKE KEM identifier");
    }
  }
  function Cr(a, b) {
    var c;
    return B(function (d) {
      return d.j == 1 ? ((c = $p(a, 1, b)), d.g(dq(c), 2)) : d.return(d.i);
    });
  }
  function Dr(a) {
    var b = a.Ma;
    var c = a.publicKey;
    var d = a.privateKey;
    var e;
    return B(function (f) {
      return f.j == 1
        ? ((e = $p(b, 1, c)), (e.d = Sp(d)), f.g(eq(e), 2))
        : f.return(f.i);
    });
  }
  function Er(a) {
    var b, c;
    return B(function (d) {
      if (d.j == 1) return (b = a.algorithm), d.g(cq(a), 2);
      c = d.i;
      if (!c.crv) throw new X("Curve has to be defined.");
      return d.return(Vp(b.namedCurve, 1, c));
    });
  }
  function Fr(a, b, c, d) {
    this.Qa = a;
    this.key = b;
    this.j = c;
    this.i = d;
    this.g = BigInt(0);
    this.l = (BigInt(1) << BigInt(96)) - BigInt(1);
  }
  Fr.prototype.seal = function (a, b) {
    var c = this,
      d;
    return B(function (e) {
      return e.j == 1
        ? ((d = Gr(c)),
          e.g(c.i.seal({ key: c.key, nonce: d, Ib: a, La: b }), 2))
        : e.return(e.i);
    });
  };
  Fr.prototype.open = function (a, b) {
    var c = this,
      d;
    return B(function (e) {
      d = Gr(c);
      return e.return(c.i.open({ key: c.key, nonce: d, tb: a, La: b }));
    });
  };
  function Gr(a) {
    for (var b = a.g, c = new Uint8Array(12), d = 0; d < 12; d++)
      c[d] = Number(b >> BigInt(8 * (12 - d - 1))) & 255;
    b = a.j;
    if (b.length !== c.length)
      throw new Y("Both byte arrays should be of the same length");
    d = new Uint8Array(b.length);
    for (var e = 0; e < d.length; e++) d[e] = b[e] ^ c[e];
    if (a.g >= a.l) throw new X("message limit reached");
    a.g += BigInt(1);
    return d;
  }
  function Hr(a, b, c, d, e, f) {
    var g, h, k, l, m, p, q, t, r;
    return B(function (v) {
      switch (v.j) {
        case 1:
          a: {
            switch (e.Ea) {
              case 16:
                var y = ur;
                break a;
              case 32:
                y = vr;
                break a;
            }
            y = void 0;
          }
          a: {
            switch (d.Da) {
              case "SHA-256":
                var L = sr;
                break a;
              case "SHA-512":
                L = tr;
                break a;
            }
            L = void 0;
          }
          g = Np(xr, Ir(c), L, y);
          h = Jr(d, { ca: new Uint8Array(0), da: "psk_id_hash", M: g });
          return v.g(Jr(d, { ca: f, da: "info_hash", M: g }), 2);
        case 2:
          return (k = v.i), v.g(h, 3);
        case 3:
          return (
            (l = v.i),
            (m = Np(pr, l, k)),
            v.g(
              Jr(d, { ca: new Uint8Array(0), da: "secret", M: g, salt: b }),
              4
            )
          );
        case 4:
          return (
            (p = v.i),
            (q = Kr(d, { gb: p, info: m, ja: "key", M: g, length: e.Ea })),
            v.g(
              Kr(d, { gb: p, info: m, ja: "base_nonce", M: g, length: 12 }),
              5
            )
          );
        case 5:
          return (t = v.i), v.g(q, 6);
        case 6:
          return (r = v.i), v.return(new Fr(a, r, t, e));
      }
    });
  }
  function Lr(a, b, c, d, e) {
    var f, g, h;
    return B(function (k) {
      return k.j == 1
        ? k.g(b.Pa(a), 2)
        : k.j != 3
        ? ((f = k.i), (g = f.Qa), (h = f.Nb), k.g(Hr(g, h, b, c, d, e), 3))
        : k.return(k.i);
    });
  }
  function Mr(a, b, c, d, e, f) {
    var g;
    return B(function (h) {
      return h.j == 1
        ? h.g(c.Na(a, b), 2)
        : h.j != 3
        ? ((g = h.i), h.g(Hr(a, g, c, d, e, f), 3))
        : h.return(h.i);
    });
  }
  function Nr(a, b) {
    this.privateKey = a;
    this.publicKey = b;
  }
  function Or(a) {
    return B(function (b) {
      return b.j == 1 ? b.g(Er(a.publicKey), 2) : b.return(b.i);
    });
  }
  function Pr(a) {
    var b = a.privateKey;
    var c = a.publicKey;
    var d = a.Ma;
    var e, f;
    return B(function (g) {
      if (g.j == 1) {
        if (!b) throw new Y("KEM private key was null or undefined");
        if (!c) throw new Y("KEM public key was null or undefined");
        return g.g(Cr(Tp(d), c), 2);
      }
      if (g.j != 3)
        return (
          (e = g.i), g.g(Dr({ Ma: Tp(d), publicKey: c, privateKey: b }), 3)
        );
      f = g.i;
      return g.return(new Nr(f, e));
    });
  }
  function Qr(a) {
    return B(function (b) {
      Rr(a.privateKey, "private");
      Rr(a.publicKey, "public");
      return b.return(new Nr(a.privateKey, a.publicKey));
    });
  }
  function Rr(a, b) {
    if (b !== a.type)
      throw new Y("keyPair " + b + " key was of type " + a.type);
    a = a.algorithm;
    if ("ECDH" !== a.name)
      throw new Y("keyPair " + b + " key should be ECDH but found " + a.name);
  }
  function Sr(a) {
    this.Ea = a;
  }
  Sr.prototype.seal = function (a) {
    var b = a.key;
    var c = a.nonce;
    var d = a.Ib;
    var e = a.La;
    var f = this,
      g;
    return B(function (h) {
      if (h.j == 1) {
        if (b.length !== f.Ea)
          throw new X("Unexpected key length: " + b.length.toString());
        return h.g(Mq({ key: b, Z: !1 }), 2);
      }
      return h.j != 3 ? ((g = h.i), h.g(g.encrypt(c, d, e), 3)) : h.return(h.i);
    });
  };
  Sr.prototype.open = function (a) {
    var b = a.key;
    var c = a.nonce;
    var d = a.tb;
    var e = a.La;
    var f = this,
      g;
    return B(function (h) {
      if (h.j == 1) {
        if (b.length !== f.Ea)
          throw new X("Unexpected key length: " + b.length.toString());
        return h.g(Mq({ key: b, Z: !1 }), 2);
      }
      g = h.i;
      return h.return(g.decrypt(c, d, e));
    });
  };
  function Tr(a) {
    this.Da = a;
  }
  function Jr(a, b) {
    var c = b.ca;
    var d = b.da;
    var e = b.M;
    var f = b.salt;
    return B(function (g) {
      return g.j == 1
        ? g.g(Ur(a, zr({ da: d, ca: c, M: e }), f), 2)
        : g.return(g.i);
    });
  }
  function Kr(a, b) {
    var c = b.gb;
    var d = b.info;
    var e = b.ja;
    var f = b.M;
    var g = b.length;
    return B(function (h) {
      return h.j == 1
        ? h.g(a.expand(c, Ar({ ja: e, info: d, M: f, length: g }), g), 2)
        : h.return(h.i);
    });
  }
  function Vr(a, b) {
    var c = b.ca;
    var d = b.da;
    var e = b.info;
    var f = b.ja;
    var g = b.M;
    var h = b.length;
    var k = b.salt;
    var l;
    return B(function (m) {
      return m.j == 1
        ? m.g(Ur(a, zr({ da: d, ca: c, M: g }), k), 2)
        : m.j != 3
        ? ((l = m.i),
          m.g(a.expand(l, Ar({ ja: f, info: e, M: g, length: h }), h), 3))
        : m.return(m.i);
    });
  }
  Tr.prototype.expand = function (a, b, c) {
    var d = this,
      e,
      f,
      g,
      h,
      k,
      l,
      m;
    return B(function (p) {
      switch (p.j) {
        case 1:
          if (!Number.isInteger(c)) throw new X("length must be an integer");
          if (c <= 0) throw new X("length must be positive");
          e = Wr(d);
          if (c > 255 * e) throw new X("length too large");
          Z(b);
          return p.g(Dq(d.Da, a, e), 2);
        case 2:
          (f = p.i),
            (g = 1),
            (h = 0),
            (k = new Uint8Array(0)),
            (l = new Uint8Array(c));
        case 3:
          return (
            (m = new Uint8Array(k.length + b.length + 1)),
            m.set(k, 0),
            m.set(b, k.length),
            (m[m.length - 1] = g),
            p.g(Bq(f, m), 6)
          );
        case 6:
          k = p.i;
          if (h + k.length < c) l.set(k, h), (h += k.length), g++;
          else {
            l.set(k.subarray(0, c - h), h);
            p.H(5);
            break;
          }
          p.H(3);
          break;
        case 5:
          return p.return(l);
      }
    });
  };
  function Ur(a, b, c) {
    var d, e, f, g;
    return B(function (h) {
      if (h.j == 1)
        return (
          Z(b),
          (d = Wr(a)),
          ((e = c) == null ? 0 : e.length) || (c = new Uint8Array(d)),
          Z(c),
          h.g(Dq(a.Da, c, d), 2)
        );
      if (h.j != 3) return (f = h.i), h.g(Bq(f, b), 3);
      g = h.i;
      return h.return(g);
    });
  }
  function Wr(a) {
    switch (a.Da) {
      case "SHA-256":
        return 32;
      case "SHA-512":
        return 64;
    }
  }
  function Xr(a, b) {
    this.j = a;
    this.g = b;
  }
  function Yr(a) {
    switch (a) {
      case 1:
        return new Xr(new Tr("SHA-256"), 1);
      case 3:
        return new Xr(new Tr("SHA-512"), 3);
    }
  }
  Xr.prototype.i = function (a, b, c) {
    var d = this,
      e,
      f;
    return B(function (g) {
      return g.j == 1
        ? ((e = Np(b, c)),
          (f = Np(wr, Ir(d))),
          g.g(
            Vr(d.j, {
              ca: a,
              da: "eae_prk",
              info: e,
              ja: "shared_secret",
              M: f,
              length: Wr(d.j),
            }),
            2
          ))
        : g.return(g.i);
    });
  };
  Xr.prototype.l = function (a, b) {
    var c = this,
      d,
      e,
      f,
      g,
      h,
      k;
    return B(function (l) {
      switch (l.j) {
        case 1:
          return l.g(Cr(Tp(c.g), a), 2);
        case 2:
          return (d = l.i), (e = aq(b.privateKey, d)), l.g(Or(b), 3);
        case 3:
          return (f = l.i), l.g(e, 4);
        case 4:
          return (g = l.i), l.g(c.i(g, f, a), 5);
        case 5:
          return (h = l.i), (k = { Nb: h, Qa: f }), l.return(k);
      }
    });
  };
  Xr.prototype.Pa = function (a) {
    var b = this,
      c,
      d,
      e,
      f;
    return B(function (g) {
      switch (g.j) {
        case 1:
          return g.g(bq(Tp(b.g)), 2);
        case 2:
          return (c = g.i), (d = b), (e = d.l), (f = a), g.g(Qr(c), 4);
        case 4:
          return g.g(e.call(d, f, g.i), 3);
        case 3:
          return g.return(g.i);
      }
    });
  };
  Xr.prototype.Na = function (a, b) {
    var c = this,
      d,
      e,
      f,
      g,
      h,
      k;
    return B(function (l) {
      switch (l.j) {
        case 1:
          return (d = b.privateKey), l.g(Cr(Tp(c.g), a), 2);
        case 2:
          return (e = l.i), l.g(aq(d, e), 3);
        case 3:
          return (f = l.i), (g = c), (h = g.i), (k = a), l.g(Or(b), 4);
        case 4:
          return l.return(h.call(g, f, k, l.i));
      }
    });
  };
  function Ir(a) {
    switch (a.g) {
      case 1:
        return qr;
      case 3:
        return rr;
    }
  } /*

 Copyright 2023 Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
  function Zr(a) {
    switch (P(a, 1)) {
      case 2:
        return Yr(1);
      case 4:
        return Yr(3);
      default:
        throw new Y("Unrecognized HPKE KEM identifier");
    }
  }
  function $r(a) {
    switch (P(a, 2)) {
      case 1:
        return new Tr("SHA-256");
      case 3:
        return new Tr("SHA-512");
      default:
        throw new Y("Unrecognized HPKE KDF identifier");
    }
  }
  function as(a) {
    switch (a.ia()) {
      case 1:
        return new Sr(16);
      case 2:
        return new Sr(32);
      default:
        throw new Y("Unrecognized HPKE AEAD identifier");
    }
  }
  function bs(a, b, c, d, e) {
    if (!a) throw new Y("Recipient private key must be non-null.");
    if (!b) throw new Y("KEM algorithm must be non-null.");
    if (!c) throw new Y("KDF algorithm must be non-null.");
    if (!d) throw new Y("AEAD algorithm must be non-null.");
    this.A = a;
    this.l = b;
    this.j = c;
    this.i = d;
    this.g = e;
  }
  w(bs, Rq);
  function cs(a) {
    var b, c, d, e, f, g, h;
    return B(function (k) {
      if (k.j == 1) {
        if (Lp(J(a, 3)).length === 0)
          throw new Y("Recipient private key is empty.");
        b = K(a, sp, 2);
        if (!b)
          throw new Y("Recipient private key is missing public key field.");
        c = K(b, np, 2);
        if (!c) throw new Y("Public key is missing params field.");
        d = Zr(c);
        e = $r(c);
        f = as(c);
        a: switch (P(c, 1)) {
          case 2:
            var l = 65;
            break a;
          case 4:
            l = 133;
            break a;
          default:
            throw new Y("Unable to determine KEM-encoding length");
        }
        g = l;
        l = k.g;
        a: {
          var m = K(a, sp, 2);
          if (!m) throw new Y("Public key not set");
          var p = K(m, np, 2);
          if (!p) throw new Y("Params not set");
          switch (P(p, 1)) {
            case 2:
            case 4:
              m = Pr({
                privateKey: Lp(J(a, 3)),
                publicKey: Lp(J(m, 3)),
                Ma: Br(P(p, 1)),
              });
              break a;
            default:
              throw new Y("Unrecognized HPKE KEM identifier");
          }
        }
        return l.call(k, m, 2);
      }
      h = k.i;
      return k.return(new bs(h, d, e, f, g));
    });
  }
  bs.prototype.decrypt = function (a, b) {
    var c = this,
      d,
      e,
      f;
    return B(function (g) {
      if (g.j == 1) {
        if (a.length <= c.g) throw new X("Ciphertext is too short.");
        b || (b = new Uint8Array(0));
        d = a.slice(0, c.g);
        e = a.slice(c.g, a.length);
        return g.g(Mr(d, c.A, c.l, c.j, c.i, b), 2);
      }
      f = g.i;
      return g.return(f.open(e, ds));
    });
  };
  var ds = new Uint8Array(0);
  function es(a, b, c, d) {
    if (!a) throw new Y("Recipient public key must be non-null.");
    if (!b) throw new Y("KEM algorithm must be non-null.");
    if (!c) throw new Y("KDF algorithm must be non-null.");
    if (!d) throw new Y("AEAD algorithm must be non-null.");
    this.l = a;
    this.j = b;
    this.i = c;
    this.g = d;
  }
  w(es, Yq);
  function fs(a) {
    var b, c, d, e;
    return B(function (f) {
      if (Lp(J(a, 3)).length === 0)
        throw new Y("Recipient public key is empty.");
      b = K(a, np, 2);
      if (!b) throw new Y("Public key is missing params field.");
      c = Zr(b);
      d = $r(b);
      e = as(b);
      return f.return(new es(a, c, d, e));
    });
  }
  es.prototype.encrypt = function (a, b) {
    var c = this,
      d,
      e,
      f;
    return B(function (g) {
      if (g.j == 1)
        return (
          b || (b = new Uint8Array(0)),
          (d = Lp(J(c.l, 3))),
          g.g(Lr(d, c.j, c.i, c.g, b), 2)
        );
      if (g.j != 3) return (e = g.i), g.g(e.seal(a, gs), 3);
      f = g.i;
      return g.return(Np(e.Qa, f));
    });
  };
  var gs = new Uint8Array(0);
  function hs(a) {
    var b = P(a, 1);
    if (b !== 2 && b !== 4)
      throw new X("Invalid hpke params - unknown KEM identifier.");
    b = P(a, 2);
    if (b !== 1 && b !== 3)
      throw new X("Invalid hpke params - unknown KDF identifier.");
    a = a.ia();
    if (a !== 1 && a !== 2)
      throw new X("Invalid hpke params - unknown AEAD identifier.");
  }
  function is(a, b) {
    wq(a.getVersion(), b);
    b = K(a, np, 2);
    if (!b) throw new X("Invalid public key - missing key params.");
    hs(b);
    if (Mp(J(a, 3)) === 0)
      throw new X("Invalid public key - missing public key value.");
  }
  function js() {}
  js.prototype.pa = function () {
    throw new X(
      "This operation is not supported for public keys. Use HpkePrivateKeyManager to generate new keys."
    );
  };
  function ks() {
    this.g = new js();
  }
  n = ks.prototype;
  n.P = function (a, b) {
    var c = this,
      d;
    return B(function (e) {
      if (a !== c.K())
        throw new X(
          "Requested primitive type which is not supported by this key manager."
        );
      if (b instanceof xp) {
        if (O(b, 1) !== "type.googleapis.com/google.crypto.tink.HpkePublicKey")
          throw new X(
            "Key type " +
              O(b, 1) +
              " is not supported. This key manager supports type.googleapis.com/google.crypto.tink.HpkePublicKey."
          );
        try {
          var f = wp(b.getValue());
        } catch (g) {
          throw new X(
            "Input cannot be parsed as type.googleapis.com/google.crypto.tink.HpkePublicKey key-proto."
          );
        }
        if (!K(f, np, 2) || !J(f, 3))
          throw new X(
            "Input cannot be parsed as type.googleapis.com/google.crypto.tink.HpkePublicKey key-proto."
          );
      } else if (b instanceof sp) f = b;
      else
        throw new X(
          "Key type is not supported. This key manager supports type.googleapis.com/google.crypto.tink.HpkePublicKey."
        );
      d = f;
      is(d, c.getVersion());
      return e.return(fs(d));
    });
  };
  n.ma = function (a) {
    return a === this.L();
  };
  n.L = function () {
    return "type.googleapis.com/google.crypto.tink.HpkePublicKey";
  };
  n.K = function () {
    return Yq;
  };
  n.getVersion = function () {
    return 0;
  };
  n.oa = function () {
    return this.g;
  };
  function ls() {}
  ls.prototype.pa = function (a) {
    var b, c, d, e, f, g, h, k, l, m;
    return B(function (p) {
      switch (p.j) {
        case 1:
          if (!a) throw new X("Key format must be non-null.");
          if (a instanceof Uint8Array) {
            try {
              var q = rp(a);
            } catch (v) {
              throw new X(
                "Input cannot be parsed as type.googleapis.com/google.crypto.tink.HpkePrivateKey key format proto."
              );
            }
            if (!K(q, np, 1))
              throw new X(
                "Input cannot be parsed as type.googleapis.com/google.crypto.tink.HpkePrivateKey key format proto."
              );
          } else if (a instanceof pp) q = a;
          else
            throw new X(
              "Expected type.googleapis.com/google.crypto.tink.HpkePrivateKey key format proto."
            );
          b = q;
          q = K(b, np, 1);
          if (!q) throw new X("Invalid key format - missing key params.");
          hs(q);
          c = K(b, np, 1);
          if (!c) throw new X("Params not set");
          d = Br(P(c, 1));
          e = Tp(d);
          return p.g(bq(e), 2);
        case 2:
          return (f = p.i), p.g(cq(f.privateKey), 3);
        case 3:
          return (g = p.i), p.g(Er(f.publicKey), 4);
        case 4:
          h = p.i;
          q = new sp();
          q = Te(q, 1, 0);
          q = Le(q, 2, c);
          k = Ue(q, 3, h);
          l = g;
          m = l.d;
          if (m === void 0) throw new X("d must be set");
          q = p.return;
          var t = new up();
          t = Te(t, 1, 0);
          t = Le(t, 2, k);
          var r = Qp(m);
          t = Ue(t, 3, r);
          return q.call(p, t);
      }
    });
  };
  function ms() {
    this.g = new ls();
  }
  n = ms.prototype;
  n.P = function (a, b) {
    var c = this,
      d;
    return B(function (e) {
      if (a !== c.K())
        throw new X(
          "Requested primitive type which is not supported by this key manager."
        );
      if (b instanceof xp) {
        if (O(b, 1) !== "type.googleapis.com/google.crypto.tink.HpkePrivateKey")
          throw new X(
            "Key type " +
              O(b, 1) +
              " is not supported. This key manager supports type.googleapis.com/google.crypto.tink.HpkePrivateKey."
          );
        var f = b.getValue();
        try {
          var g = vp(f);
        } catch (h) {
          throw new X(
            "Input cannot be parsed as type.googleapis.com/google.crypto.tink.HpkePrivateKey key-proto."
          );
        }
        if (!K(g, sp, 2) || !J(g, 3))
          throw new X(
            "Input cannot be parsed as type.googleapis.com/google.crypto.tink.HpkePrivateKey key-proto."
          );
        f = g;
      } else if (b instanceof up) f = b;
      else
        throw new X(
          "Key type is not supported. This key manager supports type.googleapis.com/google.crypto.tink.HpkePrivateKey."
        );
      d = f;
      wq(d.getVersion(), 0);
      if (Mp(J(d, 3)) === 0)
        throw new X("Invalid private key - missing private key value.");
      f = K(d, sp, 2);
      if (!f) throw new X("Invalid private key - missing public key field.");
      is(f, 0);
      return e.return(cs(d));
    });
  };
  n.ma = function (a) {
    return a === this.L();
  };
  n.L = function () {
    return "type.googleapis.com/google.crypto.tink.HpkePrivateKey";
  };
  n.K = function () {
    return Rq;
  };
  n.getVersion = function () {
    return 0;
  };
  n.oa = function () {
    return this.g;
  };
  function ns(a, b, c, d) {
    var e = new pp(),
      f = new np();
    a = We(f, 1, a);
    b = We(a, 2, b);
    c = We(b, 3, c);
    e = Le(e, 1, c);
    c = new $o();
    c = ze(
      c,
      1,
      Ld("type.googleapis.com/google.crypto.tink.HpkePrivateKey"),
      ""
    );
    e = e.i();
    e = Ue(c, 2, e);
    We(e, 3, d);
  }
  ns(2, 1, 1, 3);
  ns(2, 1, 1, 1);
  ns(2, 1, 2, 3);
  ns(2, 1, 2, 1);
  ns(4, 3, 2, 3);
  ns(4, 3, 2, 1);
  function os() {
    this.g = ps().catch(function (a) {
      return a;
    });
  }
  os.prototype.encrypt = function (a) {
    var b = this,
      c,
      d,
      e,
      f,
      g,
      h;
    return B(function (k) {
      switch (k.j) {
        case 1:
          return k.g(b.g, 2);
        case 2:
          c = k.i;
          if (c instanceof Error)
            throw Error("Failed to load the encryption keyset.", { cause: c });
          k.C(3);
          d = oo(a);
          return k.g(c.encrypt(d), 5);
        case 5:
          e = k.i;
          if (e.length <= 8192) var l = String.fromCharCode.apply(null, e);
          else {
            l = "";
            for (var m = 0; m < e.length; m += 8192)
              l += String.fromCharCode.apply(
                null,
                Array.prototype.slice.call(e, m, m + 8192)
              );
          }
          f = l;
          g = C.btoa(f);
          g = g.replace(/\//g, "_");
          g = g.replace(/\+/g, "-");
          g = g.replace(/=/g, ".");
          return k.return(g);
        case 3:
          throw ((h = k.A()), Error("Encryption failed.", { cause: h }));
      }
    });
  };
  function ps() {
    var a, b;
    return B(function (c) {
      if (c.j == 1) {
        a = oo(
          C.atob(
            "COSIzGcS3AEK0AEKPXR5cGUuZ29vZ2xlYXBpcy5jb20vZ29vZ2xlLmNyeXB0by50aW5rLkVjaWVzQWVhZEhrZGZQdWJsaWNLZXkSjAESRAoECAIQAxI6EjgKMHR5cGUuZ29vZ2xlYXBpcy5jb20vZ29vZ2xlLmNyeXB0by50aW5rLkFlc0djbUtleRICEBAYARgBGiEAgtXmo1jlpITMM2kj0I961wmys4/z0wul5CNc+wMX3i0iIQCrruWSBbUSbnMk1TOyu/QDpgDflRfOccCpflqAXd/E0hgDEAEY5IjMZyAB"
          )
        );
        if (!a) throw new X("Serialized keyset has to be non-null.");
        var d = new Ep(a);
        if (d === null) throw new X("Reader has to be non-null.");
        d = d.read();
        for (var e = x(Cp(d)), f = e.next(); !f.done; f = e.next()) {
          f = K(f.value, xp, 1);
          if (f == null) throw new X("Key data has to be non null.");
          f = P(f, 3);
          if (f === 0 || f === 1 || f === 2)
            throw new X("Keyset contains secret key material.");
        }
        b = new rq(d);
        return c.g(b.P(Yq), 2);
      }
      return c.return(c.i);
    });
  }
  mq(new Kq());
  mq(new Qq());
  pq(new Uq());
  mq(new lr());
  mq(new fr());
  pq(new nr());
  mq(new ms());
  mq(new ks());
  function qs(a) {
    var b = new os();
    this.g = a;
    this.l = b;
    this.i = Date.now();
    this.j = String(String(Math.floor(Math.random() * 4503599627370496)));
  }
  function rs(a, b) {
    return ss(a, b).catch(function (c) {
      var d = {};
      d = ((d.errcode = Ho[c.message]), d);
      on(S(nn), 2, d);
      return Promise.reject(c);
    });
  }
  function ss(a, b) {
    var c, d, e, f, g, h, k, l, m;
    return B(function (p) {
      switch (p.j) {
        case 1:
          c = Date.now();
          if (!b) throw Error("Invalid nonce request.");
          d = String(Math.floor(Math.random() * 4503599627370496));
          return p.g(ts(a.g, b, a.j, d), 2);
        case 2:
          return (e = p.i), p.C(3), p.g(a.l.encrypt(e), 5);
        case 5:
          f = p.i;
          p.G(4);
          break;
        case 3:
          throw ((g = p.A()), us(g));
        case 4:
          if (f.length > b.nonceLengthLimit)
            throw Error("The generated nonce was too long.");
          h = Date.now();
          k = {};
          l =
            ((k.length = f.length),
            (k.loaderinit = a.i),
            (k.nonreq = c),
            (k.nonload = h),
            k);
          var q = a.g,
            t,
            r,
            v = {};
          var y =
            ((v.srvcstrt = (t = q.g) == null ? void 0 : t.i),
            (v.srvcend = (r = q.g) == null ? void 0 : r.g),
            v);
          l = Object.assign({}, l, y);
          on(S(nn), 1, l);
          if (fk(Ek) || fk(Dk))
            (m = {}), on(S(nn), 11, ((m.nonload = h), (m.exp = fk(Ek)), m));
          return p.return({ nonce: f, Gb: d });
      }
    });
  }
  function us(a) {
    if (!(a instanceof Error)) return Error("Encryption failed.", { cause: a });
    switch (a.message) {
      case "Failed to load the encryption keyset.":
        return Error("Encryption unavailable.", { cause: a });
      case "Encryption failed.":
        return Error("Encryption failed.", { cause: a });
      default:
        return Error("Encryption failed.", { cause: a });
    }
  }
  function vs(a, b) {
    this.i = a;
    this.nonce = b;
    this.g = null;
  }
  function ws(a) {
    a.g
      ? Promise.resolve()
      : ((a.g = setInterval(function () {
          a.i.log(6);
        }, 5e3)),
        a.i.log(5));
  }
  function xs(a, b, c) {
    this.i = c;
    b.length === 0 && (b = [[]]);
    this.g = b.map(function (d) {
      d = a.concat(d);
      for (var e = [], f = 0, g = 0; f < d.length; ) {
        var h = d[f++];
        if (h < 128) e[g++] = String.fromCharCode(h);
        else if (h > 191 && h < 224) {
          var k = d[f++];
          e[g++] = String.fromCharCode(((h & 31) << 6) | (k & 63));
        } else if (h > 239 && h < 365) {
          k = d[f++];
          var l = d[f++],
            m = d[f++];
          h =
            (((h & 7) << 18) | ((k & 63) << 12) | ((l & 63) << 6) | (m & 63)) -
            65536;
          e[g++] = String.fromCharCode(55296 + (h >> 10));
          e[g++] = String.fromCharCode(56320 + (h & 1023));
        } else
          (k = d[f++]),
            (l = d[f++]),
            (e[g++] = String.fromCharCode(
              ((h & 15) << 12) | ((k & 63) << 6) | (l & 63)
            ));
      }
      return new RegExp(e.join(""));
    });
  }
  function ys(a, b) {
    return b
      ? a.g.some(function (c) {
          c = b.match(c);
          return c == null
            ? !1
            : !a.i ||
              (c.length >= 1 && c[1] === "0.0.0") ||
              (c.length >= 2 && c[2] === "0.0.0")
            ? !0
            : !1;
        })
      : !1;
  }
  new xs(po, so, !1);
  new xs(po, to, !0);
  new xs(qo, so, !1);
  new xs(qo, to, !0);
  new xs(
    [
      94, 40, 63, 58, 104, 116, 116, 112, 115, 63, 58, 41, 63, 47, 47, 105, 109,
      97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105,
      115, 92, 46, 99, 111, 109, 47, 112, 114, 101, 114, 101, 108, 101, 97, 115,
      101, 47, 106, 115, 47, 91, 48, 45, 57, 93, 43, 46, 91, 48, 45, 57, 46, 93,
      43, 47,
    ],
    so,
    !1
  );
  new xs(
    [
      94, 40, 63, 58, 104, 116, 116, 112, 115, 63, 58, 41, 63, 47, 47, 40, 112,
      97, 103, 101, 97, 100, 50, 124, 116, 112, 99, 41, 92, 46, 103, 111, 111,
      103, 108, 101, 115, 121, 110, 100, 105, 99, 97, 116, 105, 111, 110, 92,
      46, 99, 111, 109, 47, 112, 97, 103, 101, 97, 100, 47, 40, 103, 97, 100,
      103, 101, 116, 115, 124, 106, 115, 41, 47,
    ],
    [],
    !1
  );
  new xs(
    po,
    [
      [
        100, 97, 105, 95, 105, 102, 114, 97, 109, 101, 40, 91, 48, 45, 57, 93,
        43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 40, 95, 40, 91, 97, 45,
        122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125,
        92, 46, 104, 116, 109, 108,
      ],
      [
        100, 97, 105, 95, 105, 102, 114, 97, 109, 101, 40, 91, 48, 45, 57, 93,
        43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 95, 100, 101, 98, 117,
        103, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51,
        125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108,
      ],
      [
        100, 97, 105, 95, 105, 102, 114, 97, 109, 101, 40, 95, 40, 91, 97, 45,
        122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125,
        92, 46, 104, 116, 109, 108,
      ],
      [
        100, 97, 105, 95, 99, 116, 118, 95, 105, 102, 114, 97, 109, 101, 40, 91,
        48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 40, 95,
        40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123,
        48, 44, 50, 125, 92, 46, 104, 116, 109, 108,
      ],
      [
        100, 97, 105, 95, 99, 116, 118, 95, 105, 102, 114, 97, 109, 101, 40, 91,
        48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 95, 100,
        101, 98, 117, 103, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123,
        50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108,
      ],
      [
        100, 97, 105, 95, 99, 116, 118, 95, 105, 102, 114, 97, 109, 101, 40, 95,
        40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123,
        48, 44, 50, 125, 92, 46, 104, 116, 109, 108,
      ],
    ],
    !0
  );
  var zs = new xs(ro, [[112, 97, 108, 46, 106, 115]], !1);
  new xs(ro, [[99, 97, 115, 116, 95, 112, 97, 108, 46, 106, 115]], !1);
  new xs(
    ro,
    [
      [112, 97, 108, 95, 99, 116, 118, 46, 106, 115],
      [99, 116, 118, 95, 112, 97, 108, 46, 106, 115],
    ],
    !1
  );
  function As() {
    var a = [zs];
    if (
      a.some(function (c) {
        return ys(c, window.location.href);
      })
    )
      return !0;
    var b = Bs(a, document.querySelectorAll("SCRIPT"));
    b == null &&
      document.querySelectorAll &&
      (b = Bs(a, document.querySelectorAll("script")));
    return b != null;
  }
  function Bs(a, b) {
    for (var c = {}, d = 0; d < b.length; c = { Va: void 0 }, d++)
      if (
        ((c.Va = b[d]),
        a.some(
          (function (e) {
            return function (f) {
              return ys(f, e.Va.src);
            };
          })(c)
        ))
      )
        return c.Va;
    return null;
  }
  function Cs(a) {
    pl.call(this);
    this.g = a;
  }
  w(Cs, pl);
  Cs.prototype.log = function (a) {
    var b = this;
    return B(function (c) {
      xk(b.g, a);
      c.J();
    });
  };
  var Ds = {
    Db: function (a, b) {
      var c = a.injector_basename,
        d = a.sodar_query_id,
        e = a.bg_hash_basename,
        f = a.bg_binary;
      a = window;
      var g = g === void 0 ? !1 : g;
      var h = (g === void 0 ? 0 : g)
        ? "//ep1.adtrafficquality.google/bg/" + Cg(e) + ".js"
        : "//pagead2.googlesyndication.com/bg/" + Cg(e) + ".js";
      e = g;
      e = e === void 0 ? !1 : e;
      g = a.document;
      var k = {};
      k._bgu_ = h;
      k._bgp_ = f;
      b && (k._li_ = b);
      d && (k._sid_ = d);
      ((b = a.GoogleTyFxhY) && typeof b.push == "function") ||
        (b = a.GoogleTyFxhY = []);
      b.push(k);
      b = (
        g
          ? new Sg(g.nodeType == 9 ? g : g.ownerDocument || g.document)
          : ab || (ab = new Sg())
      ).g;
      d = "SCRIPT";
      b.contentType === "application/xhtml+xml" && (d = d.toLowerCase());
      b = b.createElement(d);
      b.type = "text/javascript";
      b.async = !0;
      c = (e === void 0 ? 0 : e)
        ? Kg(yk, Cg(c) + ".js")
        : Kg(zk, Cg(c) + ".js");
      Bg(b, c);
      (c = (a.GoogleTyFxhYEET || {})[b.src])
        ? c()
        : g.getElementsByTagName("head")[0].appendChild(b);
    },
  };
  function Es() {
    this.g = !1;
  }
  function Fs(a) {
    var b;
    return B(function (c) {
      switch (c.j) {
        case 1:
          return (
            c.C(2),
            c.g(
              new gm().get({
                url: "//pagead2.googlesyndication.com/getconfig/sodar?tid=pal&tv=v_h.h.3.2.2",
                withCredentials: !1,
                timeout: new jl(),
              }),
              4
            )
          );
        case 4:
          b = c.i;
          c.G(3);
          break;
        case 2:
          return c.A(), c.return(null);
        case 3:
          if (
            !(
              typeof b === "object" &&
              b !== null &&
              "injector_basename" in b &&
              "sodar_query_id" in b &&
              "bg_hash_basename" in b &&
              "bg_binary" in b
            )
          )
            return c.return(null);
          try {
            Ds.Db(b, "v_h.h.3.2.2");
          } catch (d) {
            return c.return(null);
          }
          a.g = !0;
          return c.return(b.sodar_query_id);
      }
    });
  }
  function Gs(a) {
    var b = "";
    a.forEach(function (c, d) {
      lb(c) || ((c = encodeURIComponent(c)), (b += d + "=" + c + "&"));
    });
    return b.slice(0, -1);
  }
  Xa("goog.pal.ConsentSettings", Eo);
  function Hs() {
    this.disableLimitedAdsStorage = this.disableFirstPartyIdentifiers = !1;
  }
  Xa("goog.pal.GoogleAdManagerSettings", Hs);
  function Is(a, b) {
    this.g = new vs(new Cs(b), a);
  }
  n = Is.prototype;
  n.wb = function () {
    return this.g.nonce;
  };
  n.ib = function () {
    this.g.i.log(3);
  };
  n.Mb = function () {};
  n.jb = function () {
    this.g.i.log(4);
  };
  n.lb = function () {
    ws(this.g);
  };
  n.kb = function () {
    var a = this.g;
    a.g ? (clearInterval(a.g), (a.g = null), a.i.log(7)) : Promise.resolve();
  };
  Xa("goog.pal.NonceManager", Is);
  Xa("goog.pal.NonceManager.prototype.getNonce", Is.prototype.wb);
  Xa("goog.pal.NonceManager.prototype.sendAdClick", Is.prototype.ib);
  Xa("goog.pal.NonceManager.prototype.sendAdImpression", Is.prototype.Mb);
  Xa("goog.pal.NonceManager.prototype.sendAdTouch", Is.prototype.jb);
  Xa("goog.pal.NonceManager.prototype.sendPlaybackStart", Is.prototype.lb);
  Xa("goog.pal.NonceManager.prototype.sendPlaybackEnd", Is.prototype.kb);
  function Js(a, b) {
    var c = null;
    (a != null ? a : "").split(":").forEach(function (d) {
      var e = x(d.split("="));
      d = e.next().value;
      e = e.next().value;
      d === "T" && ((d = Number(e)), isNaN(d) || d === 0 || (c = d + b));
    });
    return c;
  }
  function Ks(a) {
    this.u = G(a);
  }
  w(Ks, R);
  Ks.prototype.getValue = function () {
    return O(this, 1);
  };
  function Ls(a, b) {
    return H(a, 1, Ld(b));
  }
  function Ms(a, b) {
    return H(a, 2, Hd(b));
  }
  function Ns(a, b) {
    return H(a, 3, Ld(b));
  }
  function Os(a, b) {
    return H(a, 4, Ld(b));
  }
  Ks.prototype.getVersion = function () {
    return P(this, 5);
  };
  function Ps() {
    this.na = this.gfpCookie = null;
  }
  function Qs(a) {
    var b = a.xb;
    a = a.na;
    if (!b && !a) return Promise.resolve(new Ps());
    b = [b ? "v1" : null, a ? "eo" : null]
      .filter(function (c) {
        return c !== null;
      })
      .join(",");
    return new gm()
      .get({
        url:
          "https://partner.googleadservices.com/gampad/cookie.js?domain=" +
          window.location.hostname +
          "&product=PAL&cookie_types=" +
          b,
        withCredentials: !1,
        timeout: new jl(),
      })
      .then(function (c) {
        var d = new Ps();
        c = x(c._cookies_ || []);
        for (var e = c.next(); !e.done; e = c.next()) {
          e = e.value;
          var f = Os(
            Ns(Ms(Ls(new Ks(), e._value_), e._expires_), e._path_),
            e._domain_
          );
          switch (e._version_) {
            case 1:
              d.gfpCookie = f;
              break;
            case 3:
              d.na = f;
          }
        }
        return d;
      });
  }
  function Rs(a) {
    this.g = a || { cookie: "" };
  }
  n = Rs.prototype;
  n.set = function (a, b, c) {
    var d = !1;
    if (typeof c === "object") {
      var e = c.sameSite;
      d = c.secure || !1;
      var f = c.domain || void 0;
      var g = c.path || void 0;
      var h = c.Fa;
    }
    if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
    if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');
    h === void 0 && (h = -1);
    this.g.cookie =
      a +
      "=" +
      b +
      (f ? ";domain=" + f : "") +
      (g ? ";path=" + g : "") +
      (h < 0
        ? ""
        : h == 0
        ? ";expires=" + new Date(1970, 1, 1).toUTCString()
        : ";expires=" + new Date(Date.now() + h * 1e3).toUTCString()) +
      (d ? ";secure" : "") +
      (e != null ? ";samesite=" + e : "");
  };
  n.get = function (a, b) {
    for (
      var c = a + "=", d = (this.g.cookie || "").split(";"), e = 0, f;
      e < d.length;
      e++
    ) {
      f = mb(d[e]);
      if (f.lastIndexOf(c, 0) == 0) return f.slice(c.length);
      if (f == a) return "";
    }
    return b;
  };
  function Ss(a, b, c, d) {
    a.get(b);
    a.set(b, "", { Fa: 0, path: c, domain: d });
  }
  n.Ta = function () {
    return Ts(this).values;
  };
  n.isEmpty = function () {
    return !this.g.cookie;
  };
  n.clear = function () {
    for (var a = Ts(this).keys, b = a.length - 1; b >= 0; b--) Ss(this, a[b]);
  };
  function Ts(a) {
    a = (a.g.cookie || "").split(";");
    for (var b = [], c = [], d, e, f = 0; f < a.length; f++)
      (e = mb(a[f])),
        (d = e.indexOf("=")),
        d == -1
          ? (b.push(""), c.push(e))
          : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
    return { keys: b, values: c };
  }
  function Us(a, b) {
    return Pe(a, 5) ? Vs("__gads", b) : null;
  }
  var Ws;
  function Xs(a) {
    if (!a.navigator.cookieEnabled) return !1;
    var b = new Rs(a.document);
    if (!b.isEmpty()) return !0;
    b.set("TESTCOOKIESENABLED", "1", {
      Fa: 60,
      sameSite: a.isSecureContext ? "none" : void 0,
      secure: a.isSecureContext || void 0,
    });
    if (b.get("TESTCOOKIESENABLED") !== "1") return !1;
    Ss(b, "TESTCOOKIESENABLED");
    return !0;
  }
  function Vs(a, b) {
    b = b.origin !== "null" ? b.document.cookie : null;
    return b === null ? null : new Rs({ cookie: b }).get(a) || "";
  }
  function Ys(a, b, c, d) {
    d.origin !== "null" &&
      (d.isSecureContext &&
        (c = Object.assign({}, c, { sameSite: "none", secure: !0 })),
      new Rs(d.document).set(a, b, c));
  }
  function Zs() {
    this.g = window;
  }
  function $s(a, b, c) {
    var d = c.Jb;
    c = c.Kb;
    if ((b = Pe(b, 17) && ((!d && Pe(b, 5)) || !c)))
      (a = a.g), Ws || (Ws = a.origin !== "null" ? Xs(a) : !1), (b = Ws);
    return b ? !0 : !1;
  }
  function at() {
    this.g = window;
  }
  function bt(a, b) {
    this.ba = a;
    this.j = b;
    this.i = new at();
    this.g = new Zs();
  }
  function ct(a, b, c) {
    return b
      ? Promise.resolve(b)
      : c
          .then(function (d) {
            if (d.gfpCookie && fk(Ek)) {
              var e = a.i,
                f = d.gfpCookie,
                g = a.ba;
              if (g) {
                var h = Kj(Qe(f, 2)) - Date.now() / 1e3;
                h = {
                  Fa: Math.max(h, 0),
                  path: O(f, 3),
                  domain: O(f, 4),
                  secure: !1,
                };
                f = f.getValue();
                e = e.g;
                Pe(g, 5) && Ys("__gads", f, h, e);
              }
            }
            return d.gfpCookie;
          })
          .catch(function () {
            return null;
          });
  }
  function dt(a, b, c) {
    return b
      ? Promise.resolve(b)
      : c
          .then(function (d) {
            if (d.na) {
              var e = a.g,
                f = d.na,
                g = Kj(Qe(f, 2)) - Date.now() / 1e3;
              g = {
                Fa: Math.max(g, 0),
                path: O(f, 3),
                domain: O(f, 4),
                secure: !1,
              };
              Ys("__eoi", f.getValue(), g, e.g);
            }
            return d.na;
          })
          .catch(function () {
            return null;
          });
  }
  function et(a) {
    return { Jb: !1, Kb: a.j.disableLimitedAdsStorage || !fk(Ck) };
  }
  function ft(a) {
    var b, c;
    B(function (d) {
      switch (d.j) {
        case 1:
          if (!fk(Ek)) return d.return();
          b = "unknownError";
          d.C(2);
          return d.g(a, 4);
        case 4:
          b = "success";
          d.G(3);
          break;
        case 2:
          (c = d.A()),
            (b =
              c instanceof nl
                ? c.message + ":" + c.g
                : c instanceof Error
                ? c.message
                : "unknownError:" + typeof c);
        case 3:
          on(S(nn), 12, { result: b }), d.J();
      }
    });
  }
  var gt = Number("7");
  var Ao = S(ek).i(Gk.g, Gk.defaultValue);
  function ht(a, b, c) {
    var d = this;
    this.l = a;
    this.g = null;
    this.i = it(b).then(function (e) {
      if (Pe(e, 5)) {
        var f = new mo();
        d.g = lo;
        no(f);
      } else f = null;
      return { ba: e, pb: f, Ya: new bt(e, c) };
    });
    this.j = new zo();
  }
  function jt(a, b, c, d) {
    var e,
      f,
      g,
      h,
      k,
      l,
      m,
      p,
      q,
      t,
      r,
      v,
      y,
      L,
      Aa,
      bb,
      Bn,
      Cn,
      Dn,
      qf,
      En,
      Fn,
      Gn,
      Hn,
      Qh,
      Nd,
      In,
      Jn,
      Kn;
    return B(function (xa) {
      switch (xa.j) {
        case 1:
          return xa.g(a.i, 2);
        case 2:
          g = xa.i;
          h = g.Ya;
          k = g.pb;
          l = g.ba;
          if (fk(Ek))
            if (h.j.disableFirstPartyIdentifiers) {
              var ca = h.i;
              var Q = h.ba;
              if (Q && Us(Q, ca.g)) {
                var M = ca.g.location.hostname;
                if (M === "localhost") M = ["localhost"];
                else if (((M = M.split(".")), M.length < 2)) M = [];
                else {
                  for (var Ia = [], ha = 0; ha < M.length - 1; ++ha)
                    Ia.push(M.slice(ha).join("."));
                  M = Ia;
                }
                M = x(M);
                for (ha = M.next(); !ha.done; ha = M.next())
                  (Ia = ca.g),
                    (ha = ha.value),
                    Pe(Q, 5) &&
                      Ia.origin !== "null" &&
                      Ss(new Rs(Ia.document), "__gads", "/", ha);
              }
              ca = null;
            } else
              (ca = h.i),
                (ca = (Q = h.ba) ? Us(Q, ca.g) : null),
                (Q = Js(ca, 33696e3)),
                (M = Date.now() / 1e3),
                (ca =
                  Q === null || Q < M
                    ? null
                    : Os(
                        Ns(Ms(Ls(new Ks(), ca), Q), "/"),
                        window.location.hostname
                      ));
          else ca = null;
          var Wa;
          Q = et(h);
          M = h.g;
          Q = $s(M, h.ba, Q)
            ? (Wa = Vs("__eoi", M.g)) != null
              ? Wa
              : void 0
            : void 0;
          Wa = Q;
          Q = Js(Wa, 15552e3);
          M = Date.now() / 1e3;
          Wa =
            Q === null || Q < M
              ? null
              : Os(Ns(Ms(Ls(new Ks(), Wa), Q), "/"), window.location.hostname);
          Q = Pe(h.ba, 5) && !h.j.disableFirstPartyIdentifiers;
          M = et(h);
          M = $s(h.g, h.ba, M);
          Q = Qs({ xb: ca === null && Q && fk(Ek), na: Wa === null && M });
          ft(Q);
          e = ct(h, ca, Q);
          f = dt(h, Wa, Q);
          m = k ? k.getId() : Promise.resolve(lo);
          p = Co(a.j);
          q = Promise.all([m, p]);
          return xa.g(q, 3);
        case 3:
          return (
            (t = xa.i),
            (r = x(t)),
            (v = r.next().value),
            (y = r.next().value),
            (L = v),
            (Aa = y),
            xa.g(Promise.race([e, null]), 4)
          );
        case 4:
          return (bb = xa.i), xa.g(Promise.race([f, null]), 5);
        case 5:
          return (Bn = xa.i), xa.g(Promise.race([a.l, null]), 6);
        case 6:
          Cn = xa.i;
          qf = {};
          on(
            S(nn),
            8,
            ((qf.ws = yo()), (qf.blob = (Dn = Aa) != null ? Dn : "undef"), qf)
          );
          b.descriptionUrl &&
            ((En = /[:\/"<>#|?=]/),
            (Fn = b.descriptionUrl.match(En)),
            (Hn = ((Gn = Fn) == null ? void 0 : Gn.length) === 0),
            (Qh = {}),
            on(S(nn), 9, ((Qh.durl = Hn), Qh)));
          a.g = L;
          Nd = {};
          on(
            S(nn),
            10,
            ((Nd.aid = !!L.id), (Nd.aidf = !!k), (Nd.hsc = !!Pe(l, 5)), Nd)
          );
          Wa = Map;
          ca = [];
          Q = ca.concat;
          var bc = Map,
            pa = [],
            Ab = pa.concat,
            qa = new Map();
          qa.set("eid", lj().sort().join(","));
          qa.set("aselc", "3");
          qa.set("correlator", c);
          qa.set("pal_v", "1.105.0");
          qa.set("ref", window.document.referrer);
          qa.set("useragent", zb());
          qa.set("sdkv", "h.3.2.2");
          qa = z(qa);
          var U = new Map();
          b.adWillAutoPlay != null &&
            U.set("vpa", b.adWillAutoPlay ? "auto" : "click");
          b.adWillPlayMuted != null &&
            U.set("vpmute", b.adWillPlayMuted ? "1" : "0");
          b.continuousPlayback != null &&
            U.set("vconp", b.continuousPlayback ? "2" : "1");
          U.set("wta", b.iconsSupported ? "1" : "0");
          U.set("pss", b.skippablesSupported ? "1" : "0");
          U.set("video_url_to_fetch", b.descriptionUrl);
          U.set("ppid", b.ppid);
          U.set("mpt", b.playerType);
          U.set("mpv", b.playerVersion);
          U.set("sid", b.sessionId);
          var Bb = b.videoHeight,
            Cb = b.videoWidth;
          if (Bb !== -1 || Cb !== -1) {
            var Db = Bb >= 0 ? Bb.toString() : "0",
              cc = Cb >= 0 ? Cb.toString() : "0",
              Ln = "l";
            Bb > Cb && (Ln = "p");
            U.set("vp_h", Db);
            U.set("vp_w", cc);
            U.set("u_so", Ln);
          }
          if (Hk()) var ba = window.location.href;
          else {
            Db = sm();
            Bb = Db.j;
            Cb = Db.i;
            Db = Db.g;
            cc = null;
            if (Db)
              b: {
                try {
                  ba = Wk(Db.url);
                  var W = ba.i,
                    Od = hn(W, "/v/");
                  Od || (Od = hn(W, "/a/"));
                  if (!Od) throw Error("Can not extract standalone amp url.");
                  var Mn = hn("/" + Od, "/s/"),
                    Rh = Mk(ba.g);
                  $k(Rh, "amp_js_v");
                  $k(Rh, "amp_lite");
                  var Nn = Mn ? Wk("https://" + Mn) : Wk("http://" + Od);
                  Lk(Nn, Rh);
                  cc = Nn.toString();
                  break b;
                } catch (mt) {
                  cc = null;
                  break b;
                }
                cc = void 0;
              }
            ba = cc ? cc : Bb && Bb.url ? Bb.url : Cb && Cb.url ? Cb.url : "";
          }
          W = window.document.domain;
          b.url
            ? (U.set("url", b.url), U.set("top", ba), U.set("loc", W))
            : U.set("url", ba);
          U = z(U);
          ba = new Map();
          W = {};
          W.u_tz = -new Date().getTimezoneOffset();
          try {
            M = wk.history.length;
          } catch (mt) {
            M = 0;
          }
          W.u_his = M;
          W.u_h = (Ia = wk.screen) == null ? void 0 : Ia.height;
          W.u_w = (ha = wk.screen) == null ? void 0 : ha.width;
          var rf;
          W.u_ah = (rf = wk.screen) == null ? void 0 : rf.availHeight;
          var ra;
          W.u_aw = (ra = wk.screen) == null ? void 0 : ra.availWidth;
          var ya;
          W.u_cd = (ya = wk.screen) == null ? void 0 : ya.colorDepth;
          ba.set("u_ah", Jo(W.u_ah));
          ba.set("u_aw", Jo(W.u_aw));
          ba.set("u_cd", Jo(W.u_cd));
          ba.set("u_his", Jo(W.u_his));
          ba.set("nhd", Jo(Math.max(tm().length, 0)));
          ba.set("u_h", Jo(W.u_h));
          ba.set("u_w", Jo(W.u_w));
          ba.set("dt", Jo(Ak));
          ba.set("u_tz", Jo(W.u_tz));
          M = new bc(Ab.call(pa, qa, U, z(ba)));
          M = z(M);
          ya = a.g.id;
          bc = Cn;
          pa = Aa;
          Ab = ((In = bb) == null ? void 0 : In.getValue()) || null;
          qa = ((Jn = Bn) == null ? void 0 : Jn.getValue()) || null;
          Ia = Map;
          ha = [];
          rf = ha.concat;
          ra = new Map();
          ya && ra.set("adsid", ya);
          ra.set("sodar_correlator", d);
          bc && ra.set("sq", bc);
          pa && ra.set("scar", pa);
          Ab && fk(Ek) && ra.set("cookie", Ab);
          qa && ra.set("eo_id_str", qa);
          ya = (window.document.visibilityState || "") === "visible";
          ya != null && ra.set("vis", ya ? "1" : "2");
          ra = z(ra);
          ya = new Map();
          bc = !1;
          pa = b.omidPartnerName;
          Ab = b.omidPartnerVersion;
          (pa == null ? void 0 : pa.length) > 0 &&
            (Ab == null ? void 0 : Ab.length) > 0 &&
            (ya.set("omid_p", pa + "/" + Ab), (bc = !0));
          pa = b.supportedApiFrameworks;
          !pa.includes(gt) && bc && pa.push(gt);
          ya.set("sdk_apis", pa.toString());
          Ia = new Ia(rf.call(ha, ra, z(ya)));
          Kn = new Wa(Q.call(ca, M, z(Ia)));
          return xa.return(Kn);
      }
    });
  }
  function ts(a, b, c, d) {
    var e;
    return B(function (f) {
      if (f.j == 1) return f.g(jt(a, b, c, d), 2);
      e = f.i;
      return f.return(Gs(e));
    });
  }
  function it(a) {
    var b;
    return B(function (c) {
      if (c.j == 1) return c.g(kt(), 2);
      b = c.i;
      var d = c.return,
        e = new Mm(),
        f =
          Fo(b) && b && b.tcString !== "tcunavailable"
            ? b.gdprApplies
              ? b.vendor
                ? b.vendor.disclosedVendors === void 0
                  ? !0
                  : Jm(b.vendor.consents, "755") ||
                    Jm(b.vendor.legitimateInterests, "755") ||
                    Jm(b.vendor.disclosedVendors, "755")
                : !1
              : !0
            : !0;
      if (a.allowStorage)
        if (Fo(b)) {
          var g;
          if ((g = !!b)) {
            var h = h === void 0 ? {} : h;
            if (Im(b))
              if (b.gdprApplies === !1) var k = !0;
              else if (b.tcString === "tcunavailable") k = !h.idpcApplies;
              else if (
                (h.idpcApplies || b.gdprApplies !== void 0 || h.tc) &&
                (h.idpcApplies || (Rc(b.tcString) && b.tcString.length))
              ) {
                k = k === void 0 ? "755" : k;
                b: {
                  if (
                    b.publisher &&
                    b.publisher.restrictions &&
                    ((g = b.publisher.restrictions["1"]), g !== void 0)
                  ) {
                    g = g[k === void 0 ? "755" : k];
                    break b;
                  }
                  g = void 0;
                }
                k =
                  g === 0
                    ? !1
                    : b.purpose && b.vendor
                    ? (k = Jm(b.vendor.consents, k === void 0 ? "755" : k)) &&
                      b.purposeOneTreatment &&
                      b.publisherCC === "CH"
                      ? !0
                      : k && Jm(b.purpose.consents, "1")
                    : !0;
              } else k = !0;
            else k = !1;
            g = k;
          }
          k = g;
        } else k = !0;
      else k = !1;
      k = H(e, 5, k == null ? k : sd(k));
      H(k, 17, f == null ? f : sd(f));
      return d.call(c, e);
    });
  }
  function kt() {
    var a;
    return B(function (b) {
      a = new Fm(window, { timeoutMs: 500 });
      return typeof a.i.__tcfapi === "function" || Km(a) != null
        ? b.return(
            new Promise(function (c) {
              Gm(a, c);
            })
          )
        : b.return(null);
    });
  }
  function lt(a, b) {
    b = b === void 0 ? new Hs() : b;
    if (!As())
      throw Error(
        "IMA SDK is either not loaded from a google domain or is not a supported version."
      );
    S(nn).g = "1.105.0";
    on(S(nn), 7, {
      n: a == null,
      as: a ? a.allowStorage : null,
      fla: a ? !1 : null,
    });
    a || (a = new Eo());
    this.g = new Es();
    var c = Fs(this.g);
    this.l = new ht(c, a, b);
    this.i = new qs(this.l);
  }
  lt.prototype.j = function (a) {
    var b = this,
      c,
      d,
      e;
    return B(function (f) {
      if (f.j == 1) return f.g(rs(b.i, a), 2);
      c = f.i;
      d = c.nonce;
      e = c.Gb;
      if (b.g.g)
        try {
          xk(e, 1);
        } catch (g) {}
      return f.return(new Is(d, e));
    });
  };
  Xa("goog.pal.NonceLoader", lt);
  Xa("goog.pal.NonceLoader.prototype.loadNonceManager", lt.prototype.j);
  function nt() {
    this.continuousPlayback = this.adWillPlayMuted = this.adWillAutoPlay = null;
    this.g = "";
    this.iconsSupported = !1;
    this.nonceLengthLimit = Number.MAX_SAFE_INTEGER;
    this.B = this.A = this.l = this.j = this.i = "";
    this.sessionId = Io;
    this.skippablesSupported = !1;
    this.supportedApiFrameworks = [];
    this.videoWidth = this.videoHeight = -1;
    this.url = "";
  }
  fa.Object.defineProperties(nt.prototype, {
    descriptionUrl: {
      configurable: !0,
      enumerable: !0,
      set: function (a) {
        a.length > 500
          ? console.warn(
              "Description URL is longer than 500 characters. Ignoring."
            )
          : (this.g = a);
      },
      get: function () {
        return this.g;
      },
    },
    omidPartnerName: {
      configurable: !0,
      enumerable: !0,
      set: function (a) {
        a.length > 200
          ? console.warn(
              "OMID partner name is longer than 200 characters. Ignoring."
            )
          : (this.i = a);
      },
      get: function () {
        return this.i;
      },
    },
    omidPartnerVersion: {
      configurable: !0,
      enumerable: !0,
      set: function (a) {
        a.length > 200
          ? console.warn(
              "OMID partner version is longer than 200 characters. Ignoring."
            )
          : (this.j = a);
      },
      get: function () {
        return this.j;
      },
    },
    playerType: {
      configurable: !0,
      enumerable: !0,
      set: function (a) {
        a.length > 200
          ? console.warn("Player type is longer than 200 characters. Ignoring.")
          : (this.l = a);
      },
      get: function () {
        return this.l;
      },
    },
    playerVersion: {
      configurable: !0,
      enumerable: !0,
      set: function (a) {
        a.length > 200
          ? console.warn(
              "Player version is longer than 200 characters. Ignoring."
            )
          : (this.A = a);
      },
      get: function () {
        return this.A;
      },
    },
    ppid: {
      configurable: !0,
      enumerable: !0,
      set: function (a) {
        a.length > 200
          ? console.warn("PPID is longer than 200 characters. Ignoring.")
          : (this.B = a);
      },
      get: function () {
        return this.B;
      },
    },
  });
  Xa("goog.pal.NonceRequest", nt);
}.call(this));
