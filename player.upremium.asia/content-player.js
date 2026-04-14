(() => {
  "use strict";
  var e = {
      638: (e) => {
        var t = "%[a-f0-9]{2}",
          r = new RegExp("(" + t + ")|([^%]+?)", "gi"),
          i = new RegExp("(" + t + ")+", "gi");
        function o(e, t) {
          try {
            return [decodeURIComponent(e.join(""))];
          } catch (e) {}
          if (1 === e.length) return e;
          t = t || 1;
          var r = e.slice(0, t),
            i = e.slice(t);
          return Array.prototype.concat.call([], o(r), o(i));
        }
        function n(e) {
          try {
            return decodeURIComponent(e);
          } catch (n) {
            for (var t = e.match(r) || [], i = 1; i < t.length; i++)
              t = (e = o(t, i).join("")).match(r) || [];
            return e;
          }
        }
        e.exports = function (e) {
          if ("string" != typeof e)
            throw new TypeError(
              "Expected `encodedURI` to be of type `string`, got `" +
                typeof e +
                "`"
            );
          try {
            return (e = e.replace(/\+/g, " ")), decodeURIComponent(e);
          } catch (t) {
            return (function (e) {
              for (
                var t = { "%FE%FF": "��", "%FF%FE": "��" }, r = i.exec(e);
                r;

              ) {
                try {
                  t[r[0]] = decodeURIComponent(r[0]);
                } catch (e) {
                  var o = n(r[0]);
                  o !== r[0] && (t[r[0]] = o);
                }
                r = i.exec(e);
              }
              t["%C2"] = "�";
              for (var s = Object.keys(t), a = 0; a < s.length; a++) {
                var c = s[a];
                e = e.replace(new RegExp(c, "g"), t[c]);
              }
              return e;
            })(e);
          }
        };
      },
      759: (e) => {
        e.exports = function (e, t) {
          for (
            var r = {}, i = Object.keys(e), o = Array.isArray(t), n = 0;
            n < i.length;
            n++
          ) {
            var s = i[n],
              a = e[s];
            (o ? -1 !== t.indexOf(s) : t(s, a, e)) && (r[s] = a);
          }
          return r;
        };
      },
      570: (e, t, r) => {
        const i = r(624),
          o = r(638),
          n = r(414),
          s = r(759),
          a = Symbol("encodeFragmentIdentifier");
        function c(e) {
          if ("string" != typeof e || 1 !== e.length)
            throw new TypeError(
              "arrayFormatSeparator must be single character string"
            );
        }
        function v(e, t) {
          return t.encode ? (t.strict ? i(e) : encodeURIComponent(e)) : e;
        }
        function u(e, t) {
          return t.decode ? o(e) : e;
        }
        function l(e) {
          return Array.isArray(e)
            ? e.sort()
            : "object" == typeof e
            ? l(Object.keys(e))
                .sort((e, t) => Number(e) - Number(t))
                .map((t) => e[t])
            : e;
        }
        function p(e) {
          const t = e.indexOf("#");
          return -1 !== t && (e = e.slice(0, t)), e;
        }
        function d(e) {
          const t = (e = p(e)).indexOf("?");
          return -1 === t ? "" : e.slice(t + 1);
        }
        function h(e, t) {
          return (
            t.parseNumbers &&
            !Number.isNaN(Number(e)) &&
            "string" == typeof e &&
            "" !== e.trim()
              ? (e = Number(e))
              : !t.parseBooleans ||
                null === e ||
                ("true" !== e.toLowerCase() && "false" !== e.toLowerCase()) ||
                (e = "true" === e.toLowerCase()),
            e
          );
        }
        function m(e, t) {
          c(
            (t = Object.assign(
              {
                decode: !0,
                sort: !0,
                arrayFormat: "none",
                arrayFormatSeparator: ",",
                parseNumbers: !1,
                parseBooleans: !1,
              },
              t
            )).arrayFormatSeparator
          );
          const r = (function (e) {
              let t;
              switch (e.arrayFormat) {
                case "index":
                  return (e, r, i) => {
                    (t = /\[(\d*)\]$/.exec(e)),
                      (e = e.replace(/\[\d*\]$/, "")),
                      t
                        ? (void 0 === i[e] && (i[e] = {}), (i[e][t[1]] = r))
                        : (i[e] = r);
                  };
                case "bracket":
                  return (e, r, i) => {
                    (t = /(\[\])$/.exec(e)),
                      (e = e.replace(/\[\]$/, "")),
                      t
                        ? void 0 !== i[e]
                          ? (i[e] = [].concat(i[e], r))
                          : (i[e] = [r])
                        : (i[e] = r);
                  };
                case "comma":
                case "separator":
                  return (t, r, i) => {
                    const o =
                        "string" == typeof r &&
                        r.includes(e.arrayFormatSeparator),
                      n =
                        "string" == typeof r &&
                        !o &&
                        u(r, e).includes(e.arrayFormatSeparator);
                    r = n ? u(r, e) : r;
                    const s =
                      o || n
                        ? r.split(e.arrayFormatSeparator).map((t) => u(t, e))
                        : null === r
                        ? r
                        : u(r, e);
                    i[t] = s;
                  };
                case "bracket-separator":
                  return (t, r, i) => {
                    const o = /(\[\])$/.test(t);
                    if (((t = t.replace(/\[\]$/, "")), !o))
                      return void (i[t] = r ? u(r, e) : r);
                    const n =
                      null === r
                        ? []
                        : r.split(e.arrayFormatSeparator).map((t) => u(t, e));
                    void 0 !== i[t] ? (i[t] = [].concat(i[t], n)) : (i[t] = n);
                  };
                default:
                  return (e, t, r) => {
                    void 0 !== r[e] ? (r[e] = [].concat(r[e], t)) : (r[e] = t);
                  };
              }
            })(t),
            i = Object.create(null);
          if ("string" != typeof e) return i;
          if (!(e = e.trim().replace(/^[?#&]/, ""))) return i;
          for (const o of e.split("&")) {
            if ("" === o) continue;
            let [e, s] = n(t.decode ? o.replace(/\+/g, " ") : o, "=");
            (s =
              void 0 === s
                ? null
                : ["comma", "separator", "bracket-separator"].includes(
                    t.arrayFormat
                  )
                ? s
                : u(s, t)),
              r(u(e, t), s, i);
          }
          for (const e of Object.keys(i)) {
            const r = i[e];
            if ("object" == typeof r && null !== r)
              for (const e of Object.keys(r)) r[e] = h(r[e], t);
            else i[e] = h(r, t);
          }
          return !1 === t.sort
            ? i
            : (!0 === t.sort
                ? Object.keys(i).sort()
                : Object.keys(i).sort(t.sort)
              ).reduce((e, t) => {
                const r = i[t];
                return (
                  Boolean(r) && "object" == typeof r && !Array.isArray(r)
                    ? (e[t] = l(r))
                    : (e[t] = r),
                  e
                );
              }, Object.create(null));
        }
        (t.extract = d),
          (t.parse = m),
          (t.stringify = (e, t) => {
            if (!e) return "";
            c(
              (t = Object.assign(
                {
                  encode: !0,
                  strict: !0,
                  arrayFormat: "none",
                  arrayFormatSeparator: ",",
                },
                t
              )).arrayFormatSeparator
            );
            const r = (r) =>
                (t.skipNull && null == e[r]) ||
                (t.skipEmptyString && "" === e[r]),
              i = (function (e) {
                switch (e.arrayFormat) {
                  case "index":
                    return (t) => (r, i) => {
                      const o = r.length;
                      return void 0 === i ||
                        (e.skipNull && null === i) ||
                        (e.skipEmptyString && "" === i)
                        ? r
                        : null === i
                        ? [...r, [v(t, e), "[", o, "]"].join("")]
                        : [
                            ...r,
                            [v(t, e), "[", v(o, e), "]=", v(i, e)].join(""),
                          ];
                    };
                  case "bracket":
                    return (t) => (r, i) =>
                      void 0 === i ||
                      (e.skipNull && null === i) ||
                      (e.skipEmptyString && "" === i)
                        ? r
                        : null === i
                        ? [...r, [v(t, e), "[]"].join("")]
                        : [...r, [v(t, e), "[]=", v(i, e)].join("")];
                  case "comma":
                  case "separator":
                  case "bracket-separator": {
                    const t =
                      "bracket-separator" === e.arrayFormat ? "[]=" : "=";
                    return (r) => (i, o) =>
                      void 0 === o ||
                      (e.skipNull && null === o) ||
                      (e.skipEmptyString && "" === o)
                        ? i
                        : ((o = null === o ? "" : o),
                          0 === i.length
                            ? [[v(r, e), t, v(o, e)].join("")]
                            : [[i, v(o, e)].join(e.arrayFormatSeparator)]);
                  }
                  default:
                    return (t) => (r, i) =>
                      void 0 === i ||
                      (e.skipNull && null === i) ||
                      (e.skipEmptyString && "" === i)
                        ? r
                        : null === i
                        ? [...r, v(t, e)]
                        : [...r, [v(t, e), "=", v(i, e)].join("")];
                }
              })(t),
              o = {};
            for (const t of Object.keys(e)) r(t) || (o[t] = e[t]);
            const n = Object.keys(o);
            return (
              !1 !== t.sort && n.sort(t.sort),
              n
                .map((r) => {
                  const o = e[r];
                  return void 0 === o
                    ? ""
                    : null === o
                    ? v(r, t)
                    : Array.isArray(o)
                    ? 0 === o.length && "bracket-separator" === t.arrayFormat
                      ? v(r, t) + "[]"
                      : o.reduce(i(r), []).join("&")
                    : v(r, t) + "=" + v(o, t);
                })
                .filter((e) => e.length > 0)
                .join("&")
            );
          }),
          (t.parseUrl = (e, t) => {
            t = Object.assign({ decode: !0 }, t);
            const [r, i] = n(e, "#");
            return Object.assign(
              { url: r.split("?")[0] || "", query: m(d(e), t) },
              t && t.parseFragmentIdentifier && i
                ? { fragmentIdentifier: u(i, t) }
                : {}
            );
          }),
          (t.stringifyUrl = (e, r) => {
            r = Object.assign({ encode: !0, strict: !0, [a]: !0 }, r);
            const i = p(e.url).split("?")[0] || "",
              o = t.extract(e.url),
              n = t.parse(o, { sort: !1 }),
              s = Object.assign(n, e.query);
            let c = t.stringify(s, r);
            c && (c = `?${c}`);
            let u = (function (e) {
              let t = "";
              const r = e.indexOf("#");
              return -1 !== r && (t = e.slice(r)), t;
            })(e.url);
            return (
              e.fragmentIdentifier &&
                (u = `#${
                  r[a] ? v(e.fragmentIdentifier, r) : e.fragmentIdentifier
                }`),
              `${i}${c}${u}`
            );
          }),
          (t.pick = (e, r, i) => {
            i = Object.assign({ parseFragmentIdentifier: !0, [a]: !1 }, i);
            const {
              url: o,
              query: n,
              fragmentIdentifier: c,
            } = t.parseUrl(e, i);
            return t.stringifyUrl(
              { url: o, query: s(n, r), fragmentIdentifier: c },
              i
            );
          }),
          (t.exclude = (e, r, i) => {
            const o = Array.isArray(r)
              ? (e) => !r.includes(e)
              : (e, t) => !r(e, t);
            return t.pick(e, o, i);
          });
      },
      414: (e) => {
        e.exports = (e, t) => {
          if ("string" != typeof e || "string" != typeof t)
            throw new TypeError(
              "Expected the arguments to be of type `string`"
            );
          if ("" === t) return [e];
          const r = e.indexOf(t);
          return -1 === r ? [e] : [e.slice(0, r), e.slice(r + t.length)];
        };
      },
      624: (e) => {
        e.exports = (e) =>
          encodeURIComponent(e).replace(
            /[!'()*]/g,
            (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`
          );
      },
    },
    t = {};
  function r(i) {
    var o = t[i];
    if (void 0 !== o) return o.exports;
    var n = (t[i] = { exports: {} });
    return e[i](n, n.exports, r), n.exports;
  }
  (r.d = (e, t) => {
    for (var i in t)
      r.o(t, i) &&
        !r.o(e, i) &&
        Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
  }),
    (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t));
  var i = {};
  (() => {
    r.d(i, { default: () => h });
    var e = r(570);
    try {
      window.top, window.top.document;
    } catch (e) {
      try {
        window.parent, window.parent.document;
      } catch (e) {
        window, window.document;
      }
    }
    var t = function (e, t, r) {
        t.childNodes.forEach(function (t, i) {
          o(e, t, r);
        });
      },
      o = function (e, r, i) {
        var o = null;
        switch (r.nodeType) {
          case 1:
            (o = document.createElement(r.tagName)),
              "script" === r.tagName.toLowerCase() && (o.async = r.async),
              Array.prototype.slice.call(r.attributes).forEach(function (e) {
                o.setAttribute(e.name, e.value);
              }),
              t(o, r);
            break;
          case 2:
            break;
          case 3:
            o = document.createTextNode(r.textContent);
            break;
          case 8:
            o = document.createComment(r.textContent);
            break;
          default:
            o = r;
        }
        return "after" === i ? n(o, e) : e.appendChild(o), o;
      },
      n = function (e, t) {
        var r = t.nextSibling;
        try {
          r ? r.parentNode.insertBefore(e, r) : t.parentNode.appendChild(e);
        } catch (e) {}
      };
    function s(e) {
      return (
        (s =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        s(e)
      );
    }
    function a(e, t) {
      for (var r = 0; r < t.length; r++) {
        var i = t[r];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          "value" in i && (i.writable = !0),
          Object.defineProperty(e, c(i.key), i);
      }
    }
    function c(e) {
      var t = (function (e) {
        if ("object" != s(e) || !e) return e;
        var t = e[Symbol.toPrimitive];
        if (void 0 !== t) {
          var r = t.call(e, "string");
          if ("object" != s(r)) return r;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(e);
      })(e);
      return "symbol" == s(t) ? t : t + "";
    }
    try {
      var v = window.top,
        u = window.top.document;
    } catch (e) {
      try {
        (v = window.parent), (u = window.parent.document);
      } catch (e) {
        (v = window), (u = window.document);
      }
    }
    var l = ["dev-player.urekamedia.vn", "dev-player.upremium.asia"],
      p = function () {
        var e,
          t = !1;
        return (
          (e = navigator.userAgent || navigator.vendor || window.opera),
          (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
            e
          ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
              e.substr(0, 4)
            )) &&
            (t = !0),
          (window.uk_isMBTabletDevice = t),
          t
        );
      },
      d = (function () {
        return (
          (r = function e(t) {
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, e),
              (this.config = t),
              (this.ureka_ucp = null),
              (this.exportOutIframe = !0);
          }),
          (i = [
            {
              key: "init",
              value: function () {
                var t = this;
                this.config.timestamp_init = Date.now();
                (this.version = "v3.1.252"),
                  (this.version = "v3.1.253"),
                  (this.version = "v3.1.254"),
                  (this.version = "v3.1.255"),
                  (this.version = "v3.1.256"),
                  (this.version = "v3.1.257"),
                  (this.version = "v3.1.258"),
                  (this.version = "v3.1.259"),
                  (this.version = "v3.1.260"),
                  (this.version = "v3.1.261"),
                  (this.version = "v3.1.262"),
                  (this.version = "v3.1.263"),
                  (this.version = "v3.1.264"),
                  (this.version = "v3.1.265"),
                  (this.version = "v3.1.266"),
                  (this.version = "v3.1.267"),
                  (this.version = "v3.1.268"),
                  (this.version = "v3.1.269"),
                  (this.version = "v3.1.270"),
                  (this.version = "v3.1.271"),
                  (this.version = "v3.1.272"),
                  (this.version = "v3.1.273"),
                  (this.version = "v3.1.274"),
                  (this.version = "v3.1.275"),
                  (this.version = "v3.1.276"),
                  (this.version = "v3.1.277"),
                  (this.version = "v3.1.278"),
                  (this.version = "v3.1.279"),
                  (this.version = "v3.1.280"),
                  (this.version = "v3.1.281"),
                  (this.version = "v3.1.282"),
                  (this.version = "v3.1.283"),
                  (this.version = "v3.1.284"),
                  (this.version = "v3.1.285"),
                  (this.version = "v3.1.286"),
                  (this.version = "v3.1.287"),
                  (this.version = "v3.1.288"),
                  (this.version = "v3.1.289"),
                  (this.version = "v3.1.290"),
                  (this.version = "v3.1.291"),
                  (this.version = "v3.1.292"),
                  (this.version = "v3.1.293"),
                  (this.version = "v3.1.294"),
                  (this.version = "v3.1.295"),
                  (this.version = "v3.1.296"),
                  (this.version = "v3.1.297"),
                  (this.version = "v3.1.298"),
                  (this.version = "v3.1.299"),
                  (this.version = "v3.1.300"),
                  (this.version = "v3.1.301"),
                  (this.version = "v3.1.302"),
                  (this.version = "v3.1.303"),
                  (this.version = "v3.1.304"),
                  (this.version = "v3.1.305"),
                  (this.version = "v3.1.306"),
                  (this.version = "v3.1.307"),
                  (this.version = "v3.1.308"),
                  (this.version = "v3.1.309"),
                  (this.version = "v3.1.340"),
                  (this.version = "v3.1.341"),
                  (this.version = "v3.1.342"),
                  (this.version = "v3.1.343"),
                  (this.version = "v3.1.344"),
                  (this.version = "v3.1.345"),
                  (this.version = "v3.1.346"),
                  (this.version = "v3.1.347"),
                  (this.version = "v3.1.348"),
                  (this.version = "v3.1.349"),
                  (this.version = "v3.1.350"),
                  (this.version = "v3.1.351"),
                  (this.version = "v3.1.352"),
                  (this.version = "v3.1.353"),
                  (this.version = "v3.1.354"),
                  (this.version = "v3.1.355"),
                  (this.version = "v3.1.356"),
                  (this.version = "v3.1.357"),
                  (this.version = "v3.1.358"),
                  (this.version = "v3.1.359"),
                  (this.version = "v3.1.360"),
                  (this.version = "v3.1.361"),
                  (this.version = "v3.1.362"),
                  (this.version = "v3.1.363"),
                  (this.version = "v3.1.364"),
                  (this.version = "v3.1.365"),
                  (this.version = "v3.1.366"),
                  (this.version = "v3.1.367"),
                  (this.version = "v3.1.368"),
                  (this.version = "v3.1.369"),
                  (this.version = "v3.1.370"),
                  (this.version = "v3.1.371"),
                  (this.version = "v3.1.372"),
                  (this.version = "v3.1.373"),
                  (this.version = "v3.1.374"),
                  (this.version = "v3.1.375"),
                  (this.version = "v3.1.376"),
                  (this.version = "v3.1.377"),
                  (this.version = "v3.1.378"),
                  (this.version = "v3.1.379"),
                  (this.version = "v3.1.380"),
                  (this.version = "v3.1.381"),
                  (this.version = "v3.1.382"),
                  (this.version = "v3.1.383"),
                  (this.version = "v3.1.384"),
                  (this.version = "v3.1.385"),
                  (this.version = "v3.1.386"),
                  (this.version = "v3.1.390"),
                  (this.version = "v3.1.391"),
                  (this.version = "v3.1.392"),
                  (this.version = "v3.1.393"),
                  (this.version = "v3.1.394"),
                  (this.version = "v3.1.395"),
                  (this.version = "v3.1.396"),
                  (this.version = "v3.1.397"),
                  (this.version = "v3.1.398"),
                  (this.version = "v3.1.399"),
                  (this.version = "v3.1.400"),
                  (this.version = "v3.1.401"),
                  (this.version = "v3.1.402"),
                  (this.version = "v3.1.403"),
                  (this.version = "v3.1.404"),
                  (this.version = "v3.1.405"),
                  (this.version = "v3.1.406"),
                  (this.version = "v3.1.407"),
                  (this.version = "v3.1.408"),
                  (this.version = "v3.1.409"),
                  l.map(function (e) {
                    -1 != window.location.host.indexOf(e) &&
                      (t.version = "v3.1.409");
                  }),
                  this.config.version && (this.version = this.config.version);
                var r = e.parse(v.location.search).ucp_version;
                r && (this.version = r),
                  (this.script = document.createElement("script")),
                  (this.script.src =
                    "//player.upremium.asia/" +
                    "dist/ucp/".concat(
                      this.version,
                      "/libs-content-player.js"
                    )),
                  "boolean" == typeof this.config.exportOutIframe &&
                    (this.exportOutIframe = this.config.exportOutIframe),
                  (this.config.useV2API = !0),
                  this.config.window && (this.exportOutIframe = !1),
                  this.exportOutIframe && this.customForSite(),
                  this.checkTechWebsite(),
                  this.autoplacementDiv(),
                  this.checkPlayerInit(),
                  this.collectDataLocation();
              },
            },
            {
              key: "collectDataLocation",
              value: function () {
                var e,
                  r,
                  i = !1;
                if (
                  ([
                    "thanhnien.vn",
                    "tienphong.vn",
                    "home.vn",
                    "docnhanh.vn",
                    "bongda.com.vn",
                    "thethao247.vn",
                    "thuvienphapluat.vn",
                    "luatvietnam.vn",
                    "chogia.vn",
                    "bongda24h.vn",
                    "ghienbongda.vn",
                    "tiin.vn",
                    "motosaigon.vn",
                  ].map(function (e) {
                    -1 !== v.location.hostname.indexOf(e) && (i = !0);
                  }),
                  i)
                ) {
                  var o = document.createElement("div");
                  v.document.body.appendChild(o),
                    (e = o),
                    ((r = document.createElement("ins")).innerHTML =
                      "\n                <script async src=\"https://securepubads.g.doubleclick.net/tag/js/gpt.js\" crossorigin=\"anonymous\"></script>\n                <script>\n                window.googletag = window.googletag || {cmd: []};\n                googletag.cmd.push(function() {\n                    googletag.defineSlot('/182251254/UCP_TargetLocation', [1, 1], 'div-gpt-ad-1757932280349-0').addService(googletag.pubads());\n                    googletag.pubads().enableSingleRequest();\n                    googletag.enableServices();\n                });\n                </script>\n                \x3c!-- /182251254/UCP_TargetLocation --\x3e\n                <div id='div-gpt-ad-1757932280349-0'>\n                <script>\n                    googletag.cmd.push(function() { googletag.display('div-gpt-ad-1757932280349-0'); });\n                </script>\n                </div>"),
                    t(e, r);
                }
              },
            },
            {
              key: "autoplacementDiv",
              value: function () {
                try {
                  var e = document.createElement("div");
                  if (((e.id = "ureka-ucp-autoplacement"), frameElement)) {
                    var t = null;
                    (t = window.parent.name
                      ? window.top.document.getElementById(window.parent.name)
                      : window.top.document.getElementById(window.name)) &&
                      (t = t.parentNode).parentNode.insertBefore(
                        e,
                        t.nextSibling
                      );
                  }
                } catch (e) {
                  console.log(e), console.log("error auto making div.");
                }
              },
            },
            { key: "checkTechWebsite", value: function () {} },
            {
              key: "checkPlayerInit",
              value: function () {
                var e = this;
                u.querySelector('[uk_item="'.concat(this.config.item, '"]')) &&
                u.querySelector(
                  '[uk_category="'.concat(this.config.category, '"]')
                )
                  ? console.log(
                      'ucp uk_item="'.concat(this.config.item, '" was init !')
                    )
                  : this.exportOutIframe
                  ? (this.script.addEventListener("load", function () {
                      (e.ureka_ucp = new v.uk_librabryPlayer(e.config)),
                        console.log("Ureka Content Player - " + e.version),
                        e.ureka_ucp.init(),
                        (v.ureka_ucp = e.ureka_ucp);
                    }),
                    u.getElementsByTagName("head")[0].appendChild(this.script))
                  : (this.script.addEventListener("load", function () {
                      (e.ureka_ucp = new window.uk_librabryPlayer(e.config)),
                        console.log("Ureka Content Player - " + e.version),
                        console.log("init in ucp iframe"),
                        e.ureka_ucp.init(),
                        (window.ureka_ucp = e.ureka_ucp);
                    }),
                    document
                      .getElementsByTagName("head")[0]
                      .appendChild(this.script));
              },
            },
            {
              key: "customForSite",
              value: function () {
                var e = this,
                  t = v.location.hostname;
                if (
                  ((window.top.uk_player = this),
                  "20d85fdea6f67d9b3039cf" == this.config.category &&
                    (console.log("suckhoeviet.org.vn"),
                    p()
                      ? (console.log("Mobile"),
                        (this.config = {
                          category: "20d85fdea6f67d9b3039cf",
                          item: "4eb66525085ac5af028be2",
                        }))
                      : (this.config = {
                          category: "20d85fdea6f67d9b3039cf",
                          item: "b513a2d828bb734311dbe6",
                        })),
                  t.indexOf("ureka-player.loc"),
                  "96ef008ae557f3c4c9bd6b" == this.config.category ||
                    "e83f742cc0df1798f3beb5" == this.config.category)
                ) {
                  var r = document.createElement("div");
                  r.style.setProperty("position", "relative", "important"),
                    r.style.setProperty(
                      "text-align",
                      "-webkit-center",
                      "important"
                    );
                  var i = document.createElement("div");
                  (i.innerHTML = "Xem tiếp nội dung sau video quảng cáo"),
                    i.style.setProperty("color", "#a7a6a6", "important"),
                    i.style.setProperty("font-size", "12px", "important"),
                    i.style.setProperty("width", "240px", "important"),
                    i.style.setProperty("text-align", "center", "important"),
                    i.style.setProperty("position", "relative", "important"),
                    i.style.setProperty("z-index", "1", "important"),
                    i.style.setProperty("background", "#fff", "important");
                  var o = document.createElement("span");
                  o.style.setProperty("display", "block", "important"),
                    o.style.setProperty("content", '""', "important"),
                    o.style.setProperty("background", "#ccc", "important"),
                    o.style.setProperty("position", "absolute", "important"),
                    o.style.setProperty("height", "1px", "important"),
                    o.style.setProperty("width", "100%", "important"),
                    o.style.setProperty("top", "50%", "important"),
                    r.appendChild(i),
                    r.appendChild(o),
                    (this.config.customDivLabel = r);
                }
                "3008f6457366b1b84dc717" == this.config.category &&
                  ((this.config.noSpaceMargin = !0),
                  (this.config.noLimitRequestAds = !0)),
                  "623aafb53262585a0c5fc5" == this.config.category &&
                    (console.log("musicasparamissa.com.br"),
                    p()
                      ? (console.log("Mobile"),
                        (this.config = {
                          category: "623aafb53262585a0c5fc5",
                          item: "f5f3a4afd430dfdc87ee8a",
                        }))
                      : (this.config = {
                          category: "623aafb53262585a0c5fc5",
                          item: "ead457700209159efbb5ed",
                        })),
                  "cbab62b9fcd69b1fb13040" == this.config.category &&
                    (console.log("Koooralive.online"),
                    p()
                      ? (console.log("Mobile"),
                        (this.config = {
                          category: "cbab62b9fcd69b1fb13040",
                          item: "d4aaf0fc412c5fd3da9181",
                        }))
                      : (this.config = {
                          category: "cbab62b9fcd69b1fb13040",
                          item: "0b9ba03241b2e352ec2e49",
                        })),
                  -1 !== t.indexOf("fustany.com") &&
                    (console.log("uk-custom-090923"),
                    (v.current_url = window.top.location.href),
                    (v.interval_ukcp = setInterval(function () {
                      window.top.location.href != v.current_url &&
                        (v.document
                          .querySelectorAll("[id^='ureka-div-player']")
                          .forEach(function (e) {
                            return e.remove();
                          }),
                        (v.current_url = v.location.href),
                        (e.ureka_ucp = new v.uk_librabryPlayer(e.config)),
                        console.log("Ureka Content Player - " + e.version),
                        e.ureka_ucp.init());
                    }, 1e3)));
              },
            },
            {
              key: "changePosition",
              value: function (e) {
                this.ureka_ucp.changePosition(e);
              },
            },
            {
              key: "playPlayer",
              value: function () {
                this.ureka_ucp.playPlayer();
              },
            },
            {
              key: "pausePlayer",
              value: function () {
                this.ureka_ucp.pausePlayer();
              },
            },
            {
              key: "unmutePlayer",
              value: function () {
                this.ureka_ucp.unmutePlayer();
              },
            },
            {
              key: "mutePlayer",
              value: function () {
                this.ureka_ucp.mutePlayer();
              },
            },
            {
              key: "setStopFloating",
              value: function (e) {
                this.ureka_ucp.setStopFloating(e);
              },
            },
            {
              key: "resizePlayer",
              value: function (e, t) {
                this.ureka_ucp.resizePlayer(e, t);
              },
            },
            {
              key: "requestClosePlayer",
              value: function () {
                this.ureka_ucp.requestClosePlayer();
              },
            },
          ]),
          i && a(r.prototype, i),
          Object.defineProperty(r, "prototype", { writable: !1 }),
          r
        );
        var r, i;
      })();
    const h = d;
    function m() {
      window.urekatag &&
        0 != window.urekatag.cmd.length &&
        window.urekatag.cmd.map(function (e, t) {
          try {
            e(), window.urekatag.cmd.splice(t, 1);
          } catch (e) {}
        });
    }
    var f, y, g;
    (window.urekatag = window.urekatag || { cmd: [] }),
      (window.urekatag.defineUCP = function (e) {
        urekatag[e.item]
          ? console.log(e.item + " was define !")
          : ((urekatag[e.item] = new d(e)), urekatag[e.item].init());
      }),
      m(),
      (f = window.urekatag.cmd),
      (y = function (e) {
        m();
      }),
      ["push"].forEach(function (e) {
        f[e] = function () {
          var t = Array.prototype[e].apply(f, arguments);
          return y.apply(f, arguments), t;
        };
      }),
      p(),
      ((g = document.createElement("iframe")).src =
        "https://player.upremium.asia/demo/3rdpartycookiecheck/start.html"),
      (g.style.display = "none"),
      document.body.appendChild(g),
      window.addEventListener(
        "message",
        function (e) {
          "UK:3PCunsupported" === e.data
            ? (v.isThirdPartyBlocked = !0)
            : "UK:3PCsupported" === e.data && (v.isThirdPartyBlocked = !1);
        },
        !1
      );
  })(),
    (window.uk_videoPlayer = i.default);
})();
