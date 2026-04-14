(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  67585,
  (e, t, a) => {
    "use strict";
    Object.defineProperty(a, "__esModule", { value: !0 }),
      Object.defineProperty(a, "BailoutToCSR", {
        enumerable: !0,
        get: function () {
          return s;
        },
      });
    let r = e.r(32061);
    function s({ reason: e, children: t }) {
      if ("undefined" == typeof window)
        throw Object.defineProperty(
          new r.BailoutToCSRError(e),
          "__NEXT_ERROR_CODE",
          { value: "E394", enumerable: !1, configurable: !0 }
        );
      return t;
    }
  },
  9885,
  (e, t, a) => {
    "use strict";
    function r(e) {
      return e
        .split("/")
        .map((e) => encodeURIComponent(e))
        .join("/");
    }
    Object.defineProperty(a, "__esModule", { value: !0 }),
      Object.defineProperty(a, "encodeURIPath", {
        enumerable: !0,
        get: function () {
          return r;
        },
      });
  },
  52157,
  (e, t, a) => {
    "use strict";
    Object.defineProperty(a, "__esModule", { value: !0 }),
      Object.defineProperty(a, "PreloadChunks", {
        enumerable: !0,
        get: function () {
          return o;
        },
      });
    let r = e.r(43476),
      s = e.r(74080),
      i = e.r(63599),
      l = e.r(9885),
      n = e.r(43369);
    function o({ moduleIds: e }) {
      if ("undefined" != typeof window) return null;
      let t = i.workAsyncStorage.getStore();
      if (void 0 === t) return null;
      let a = [];
      if (t.reactLoadableManifest && e) {
        let r = t.reactLoadableManifest;
        for (let t of e) {
          if (!r[t]) continue;
          let e = r[t].files;
          a.push(...e);
        }
      }
      if (0 === a.length) return null;
      let o = (0, n.getDeploymentIdQueryOrEmptyString)();
      return (0, r.jsx)(r.Fragment, {
        children: a.map((e) => {
          let a = `${t.assetPrefix}/_next/${(0, l.encodeURIPath)(e)}${o}`;
          return e.endsWith(".css")
            ? (0, r.jsx)(
                "link",
                {
                  precedence: "dynamic",
                  href: a,
                  rel: "stylesheet",
                  as: "style",
                  nonce: t.nonce,
                },
                e
              )
            : ((0, s.preload)(a, {
                as: "script",
                fetchPriority: "low",
                nonce: t.nonce,
              }),
              null);
        }),
      });
    }
  },
  69093,
  (e, t, a) => {
    "use strict";
    Object.defineProperty(a, "__esModule", { value: !0 }),
      Object.defineProperty(a, "default", {
        enumerable: !0,
        get: function () {
          return d;
        },
      });
    let r = e.r(43476),
      s = e.r(71645),
      i = e.r(67585),
      l = e.r(52157);
    function n(e) {
      return { default: e && "default" in e ? e.default : e };
    }
    let o = {
        loader: () => Promise.resolve(n(() => null)),
        loading: null,
        ssr: !0,
      },
      d = function (e) {
        let t = { ...o, ...e },
          a = (0, s.lazy)(() => t.loader().then(n)),
          d = t.loading;
        function c(e) {
          let n = d
              ? (0, r.jsx)(d, { isLoading: !0, pastDelay: !0, error: null })
              : null,
            o = !t.ssr || !!t.loading,
            c = o ? s.Suspense : s.Fragment,
            u = t.ssr
              ? (0, r.jsxs)(r.Fragment, {
                  children: [
                    "undefined" == typeof window
                      ? (0, r.jsx)(l.PreloadChunks, { moduleIds: t.modules })
                      : null,
                    (0, r.jsx)(a, { ...e }),
                  ],
                })
              : (0, r.jsx)(i.BailoutToCSR, {
                  reason: "next/dynamic",
                  children: (0, r.jsx)(a, { ...e }),
                });
          return (0, r.jsx)(c, { ...(o ? { fallback: n } : {}), children: u });
        }
        return (c.displayName = "LoadableComponent"), c;
      };
  },
  70703,
  (e, t, a) => {
    "use strict";
    Object.defineProperty(a, "__esModule", { value: !0 }),
      Object.defineProperty(a, "default", {
        enumerable: !0,
        get: function () {
          return s;
        },
      });
    let r = e.r(55682)._(e.r(69093));
    function s(e, t) {
      let a = {};
      "function" == typeof e && (a.loader = e);
      let s = { ...a, ...t };
      return (0, r.default)({ ...s, modules: s.loadableGenerated?.modules });
    }
    ("function" == typeof a.default ||
      ("object" == typeof a.default && null !== a.default)) &&
      void 0 === a.default.__esModule &&
      (Object.defineProperty(a.default, "__esModule", { value: !0 }),
      Object.assign(a.default, a),
      (t.exports = a.default));
  },
  98781,
  (e) => {
    "use strict";
    var t = e.i(43476),
      a = e.i(70703),
      r = e.i(31497);
    function s() {
      return (0, t.jsx)(r.ShortfundlyLoadingScreen, {
        message: "Loading film...",
      });
    }
    function i() {
      return (0, t.jsx)("div", {
        className:
          "w-full h-[160px] sm:h-[200px] md:h-[280px] bg-white/5 rounded-xl flex items-center justify-center",
        children: (0, t.jsx)("div", {
          className: "text-white/40 text-sm",
          children: "Loading...",
        }),
      });
    }
    function l() {
      return (0, t.jsx)("div", {
        className:
          "grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 w-full",
        children: [1, 2, 3, 4, 5, 6].map((e) =>
          (0, t.jsx)(
            "div",
            { className: "aspect-[9/16] bg-white/5 rounded-xl animate-pulse" },
            e
          )
        ),
      });
    }
    let n = (0, a.default)(
        () => e.A(22161).then((e) => ({ default: e.FilmViewClient })),
        {
          loadableGenerated: { modules: [20305] },
          ssr: !1,
          loading: () => (0, t.jsx)(s, {}),
        }
      ),
      o = (0, a.default)(
        () => e.A(14913).then((e) => ({ default: e.WebSeriesViewClient })),
        {
          loadableGenerated: { modules: [92433] },
          ssr: !1,
          loading: () => (0, t.jsx)(s, {}),
        }
      ),
      d = (0, a.default)(
        () => e.A(15417).then((e) => ({ default: e.BannerCarousel })),
        {
          loadableGenerated: { modules: [24593] },
          ssr: !0,
          loading: () =>
            (0, t.jsx)(r.ShortfundlyLoadingScreen, { message: "Loading..." }),
        }
      ),
      c = (0, a.default)(
        () => e.A(92974).then((e) => ({ default: e.FilmCarousel })),
        {
          loadableGenerated: { modules: [28436] },
          ssr: !0,
          loading: () => (0, t.jsx)(i, {}),
        }
      ),
      u = (0, a.default)(
        () => e.A(10137).then((e) => ({ default: e.FilmGridVertical })),
        {
          loadableGenerated: { modules: [58512] },
          ssr: !0,
          loading: () => (0, t.jsx)(l, {}),
        }
      ),
      m = (0, a.default)(
        () => e.A(94586).then((e) => ({ default: e.GenreSection })),
        {
          loadableGenerated: { modules: [49472] },
          ssr: !0,
          loading: () =>
            (0, t.jsx)("div", {
              className: "h-24 bg-white/5 rounded-xl animate-pulse",
            }),
        }
      );
    e.s([
      "DynamicBannerCarousel",
      0,
      d,
      "DynamicFilmCarousel",
      0,
      c,
      "DynamicFilmGridVertical",
      0,
      u,
      "DynamicFilmViewClient",
      0,
      n,
      "DynamicGenreSection",
      0,
      m,
      "DynamicWebSeriesViewClient",
      0,
      o,
    ]);
  },
  2025,
  (e) => {
    "use strict";
    var t = e.i(43476),
      a = e.i(71645);
    function r({
      adClient: e = "ca-pub-2902409005871711",
      adSlot: r = "2481821000",
      adFormat: s = "auto",
      fullWidthResponsive: i = !0,
      style: l,
      className: n = "",
    }) {
      let o = (0, a.useRef)(null),
        d = (0, a.useRef)(!1),
        [c, u] = (0, a.useState)(null);
      return ((0, a.useEffect)(() => {
        if (
          "localhost" === window.location.hostname ||
          "127.0.0.1" === window.location.hostname ||
          "0.0.0.0" === window.location.hostname
        )
          return void u(!1);
        if (d.current) return;
        let t = window,
          a = () => {
            if (!o.current || d.current) return;
            try {
              (t.adsbygoogle = t.adsbygoogle || []),
                t.adsbygoogle.push({}),
                (d.current = !0);
            } catch (e) {
              console.warn("Error initializing Google AdSense:", e), u(!1);
              return;
            }
            let e = 0,
              a = setInterval(() => {
                if ((e++, !o.current)) return void clearInterval(a);
                let t = o.current.querySelector("ins.adsbygoogle");
                if (!t) {
                  clearInterval(a), u(!1);
                  return;
                }
                let r = t.getAttribute("data-ad-status"),
                  s = t.offsetHeight;
                if ("filled" === r || s > 10) {
                  clearInterval(a), u(!0);
                  return;
                }
                ("unfilled" === r || e >= 15) &&
                  (clearInterval(a), u("unfilled" !== r && s > 10));
              }, 500);
          },
          r = setTimeout(() => {
            (() => {
              if (t.adsbygoogle && t.adsbygoogle.loaded) return a();
              let r = document.querySelector(
                'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
              );
              if (r) return r.addEventListener("load", a);
              let s = document.createElement("script");
              (s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${e}`),
                (s.async = !0),
                (s.crossOrigin = "anonymous"),
                (s.onload = a),
                (s.onerror = () => {
                  u(!1);
                }),
                document.head.appendChild(s);
            })();
          }, 100),
          s = null,
          i = setTimeout(() => {
            let e = o.current?.querySelector("ins.adsbygoogle");
            e &&
              (s = new MutationObserver(() =>
                (() => {
                  if (!o.current) return;
                  let e = o.current.querySelector("ins.adsbygoogle");
                  !e ||
                    (("filled" === e.getAttribute("data-ad-status") ||
                      e.offsetHeight > 0) &&
                      u(!0));
                })()
              )).observe(e, { attributes: !0, childList: !0, subtree: !0 });
          }, 200);
        return () => {
          clearTimeout(r), clearTimeout(i), s?.disconnect();
        };
      }, [e, r, s, i]),
      !1 === c)
        ? null
        : (0, t.jsx)("div", {
            ref: o,
            className: `adsbygoogle-container overflow-hidden ${n}`,
            style: { maxWidth: "100%", ...l },
            children: (0, t.jsx)("ins", {
              className: "adsbygoogle",
              style: { display: "block", overflow: "hidden" },
              "data-ad-client": e,
              "data-ad-slot": r,
              "data-ad-format": s,
              "data-full-width-responsive": i ? "true" : "false",
            }),
          });
    }
    function s() {
      return (0, t.jsx)(r, {
        adClient: "ca-pub-2902409005871711",
        adSlot: "2481821000",
        adFormat: "auto",
        fullWidthResponsive: !0,
        className: "w-full",
      });
    }
    e.s(["GoogleAdSense", () => r, "ShortfundlyHorizontalAd", () => s]);
  },
  29861,
  43362,
  (e) => {
    "use strict";
    var t = e.i(43476),
      a = e.i(22016);
    let r = {
      row: {
        root: "min-h-[96px] sm:min-h-[104px]",
        primary: "text-[11px] sm:text-[12px] font-medium",
        secondary: "text-[10px] sm:text-[11px] font-normal",
      },
      grid: {
        root: "min-h-[132px] sm:min-h-[152px]",
        primary: "text-sm sm:text-base font-medium",
        secondary: "text-xs sm:text-sm font-normal",
      },
    };
    function s(e, t) {
      let a = e.trim().length;
      return a > 28
        ? "text-[9px] sm:text-[10px] font-medium leading-snug"
        : a > 18
        ? "text-[10px] sm:text-[11px] font-medium leading-snug"
        : t;
    }
    function i({
      href: e,
      onClick: i,
      primaryText: l,
      secondaryText: n,
      background: o,
      imageUrl: d,
      size: c = "grid",
      className: u = "",
      wrapperClassName: m = "",
    }) {
      let f = r[c],
        h = !!d?.trim(),
        g = "row" === c,
        p = (0, t.jsxs)("div", {
          className: `group relative w-full overflow-hidden rounded-2xl border border-white/15 shadow-md transition-all duration-300 ease-out hover:border-white/30 hover:shadow-xl hover:shadow-black/40 focus-within:border-white/25 active:scale-[0.98] ${u}`,
          children: [
            (0, t.jsx)("div", {
              className: "absolute inset-0 rounded-2xl",
              style: { background: o },
            }),
            (0, t.jsx)("div", {
              className:
                "pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.08] via-transparent to-black/25",
            }),
            (0, t.jsx)("div", {
              className: "pointer-events-none absolute inset-0 z-0 rounded-2xl",
              style: {
                background:
                  "radial-gradient(ellipse 72% 48% at 100% 0%, rgba(255,255,255,0.14) 0%, transparent 52%)",
              },
              "aria-hidden": !0,
            }),
            (0, t.jsx)("div", {
              className: "pointer-events-none absolute inset-0 z-0 rounded-2xl",
              style: {
                background:
                  "radial-gradient(ellipse 55% 40% at 0% 100%, rgba(0,0,0,0.18) 0%, transparent 50%)",
              },
              "aria-hidden": !0,
            }),
            (0, t.jsxs)("div", {
              className: `relative z-[1] flex flex-col ${f.root} ${
                g
                  ? "px-2 pb-2 pt-2 sm:px-2.5 sm:pb-2.5 sm:pt-2.5"
                  : "px-3 py-4 sm:px-4 sm:py-5"
              }`,
              children: [
                (0, t.jsx)("div", {
                  className: `flex min-h-0 flex-1 flex-col items-stretch justify-center ${
                    n ? "pb-1" : ""
                  }`,
                  children: (0, t.jsxs)("div", {
                    className: `flex w-full min-w-0 max-w-full flex-col items-stretch ${
                      g ? "gap-1.5" : "gap-2"
                    }`,
                    children: [
                      (0, t.jsx)("div", {
                        className: `flex w-full min-w-0 max-w-full items-center justify-center rounded-xl bg-white/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.35)] backdrop-blur-[3px] ring-1 ring-white/25 ${
                          h
                            ? "aspect-[5/3] max-h-[4.25rem] sm:max-h-[4.75rem]"
                            : "px-2 py-2 sm:px-2.5 sm:py-2.5"
                        }`,
                        children: h
                          ? (0, t.jsx)("div", {
                              className:
                                "flex h-full w-full items-center justify-center p-1.5",
                              children: (0, t.jsx)("img", {
                                src: d,
                                alt: "",
                                className:
                                  "max-h-full max-w-full object-contain drop-shadow-md",
                              }),
                            })
                          : (0, t.jsx)("span", {
                              className: `block w-full min-w-0 text-center text-white drop-shadow-sm [overflow-wrap:anywhere] [word-break:break-word] leading-snug ${s(
                                l,
                                f.primary
                              )}`,
                              children: l,
                            }),
                      }),
                      h
                        ? (0, t.jsx)("span", {
                            className: `line-clamp-2 w-full text-center text-white drop-shadow-sm ${s(
                              l,
                              f.primary
                            )}`,
                            children: l,
                          })
                        : null,
                    ],
                  }),
                }),
                n
                  ? (0, t.jsx)("div", {
                      className:
                        "mt-auto flex shrink-0 justify-center border-t border-white/10 pt-1.5 text-center sm:pt-2",
                      children: (0, t.jsx)("span", {
                        className: `line-clamp-2 max-w-full text-white/95 drop-shadow-sm [overflow-wrap:anywhere] ${f.secondary}`,
                        children: n,
                      }),
                    })
                  : null,
              ],
            }),
            (0, t.jsx)("div", {
              className:
                "pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
              style: {
                boxShadow: "0 14px 44px -10px rgba(255, 255, 255, 0.1)",
              },
            }),
          ],
        }),
        x =
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black";
      return e?.trim()
        ? (0, t.jsx)("div", {
            className: m,
            children: (0, t.jsx)(a.default, {
              href: e.trim(),
              className: `block ${x} rounded-2xl`,
              children: p,
            }),
          })
        : (0, t.jsx)("div", {
            className: m,
            children: (0, t.jsx)("button", {
              type: "button",
              onClick: i,
              className: `block w-full ${x} rounded-2xl`,
              children: p,
            }),
          });
    }
    e.s(["LanguageGradientCard", () => i], 29861);
    let l = [
      "linear-gradient(132deg, #1e3a8a 0%, #2563eb 44%, #3b82f6 78%, #0ea5e9 100%)",
      "linear-gradient(132deg, #450a0a 0%, #991b1b 38%, #dc2626 62%, #ea580c 82%, #f59e0b 100%)",
      "linear-gradient(132deg, #713f12 0%, #b45309 42%, #d97706 70%, #f59e0b 92%, #fbbf24 100%)",
      "linear-gradient(132deg, #022c22 0%, #065f46 40%, #059669 72%, #10b981 92%, #34d399 100%)",
      "linear-gradient(132deg, #3b0764 0%, #6d28d9 44%, #7c3aed 72%, #a855f7 88%, #c026d3 100%)",
      "linear-gradient(132deg, #831843 0%, #be123c 46%, #e11d48 74%, #f43f5e 92%, #fb7185 100%)",
      "linear-gradient(132deg, #0c4a6e 0%, #075985 42%, #0369a1 70%, #0284c7 88%, #0ea5e9 100%)",
      "linear-gradient(132deg, #701a75 0%, #a21caf 44%, #c026d3 70%, #db2777 86%, #e879f9 100%)",
      "linear-gradient(132deg, #134e4a 0%, #0f766e 42%, #0d9488 70%, #14b8a6 88%, #2dd4bf 100%)",
      "linear-gradient(132deg, #7c2d12 0%, #c2410c 44%, #ea580c 72%, #f97316 90%, #fb923c 100%)",
      "linear-gradient(132deg, #1e1b4b 0%, #3730a3 42%, #4f46e5 70%, #6366f1 86%, #818cf8 100%)",
      "linear-gradient(132deg, #9d174d 0%, #be185d 44%, #db2777 70%, #ec4899 86%, #f472b6 100%)",
      "linear-gradient(132deg, #164e63 0%, #155e75 40%, #0891b2 68%, #06b6d4 84%, #22d3ee 100%)",
      "linear-gradient(132deg, #3f6212 0%, #4d7c0f 42%, #65a30d 72%, #84cc16 90%, #a3e635 100%)",
    ];
    function n(e, t, a) {
      let r = e?.trim();
      return r || l[Math.abs(Number(t) || a) % l.length];
    }
    let o = {
        1: "தமிழ்",
        2: "മലയാളം",
        8: "हिंदी",
        9: "ಕನ್ನಡ",
        21: "తెలుగు",
        23: "English",
      },
      d = {
        tamil: "தமிழ்",
        malayalam: "മലയാളം",
        hindi: "हिंदी",
        kannada: "ಕನ್ನಡ",
        telugu: "తెలుగు",
        bengali: "বাংলা",
        marathi: "मराठी",
        urdu: "اردو",
        punjabi: "ਪੰਜਾਬੀ",
        gujarati: "ગુજરાતી",
        odia: "ଓଡ଼ିଆ",
        oriya: "ଓଡ଼ିଆ",
        assamese: "অসমীয়া",
        sinhala: "සිංහල",
        manipuri: "ꯃꯤꯇꯩꯂꯣꯟ",
        nepali: "नेपाली",
        english: "English",
        german: "Deutsch",
        french: "Français",
        spanish: "Español",
        italian: "Italiano",
        portuguese: "Português",
        dutch: "Nederlands",
        russian: "Русский",
        polish: "Polski",
        ukrainian: "Українська",
        czech: "Čeština",
        swedish: "Svenska",
        norwegian: "Norsk",
        danish: "Dansk",
        finnish: "Suomi",
        greek: "Ελληνικά",
        hungarian: "Magyar",
        romanian: "Română",
        turkish: "Türkçe",
        chinese: "中文",
        mandarin: "普通话",
        cantonese: "粵語",
        japanese: "日本語",
        korean: "한국어",
        thai: "ไทย",
        vietnamese: "Tiếng Việt",
        indonesian: "Bahasa Indonesia",
        indonesia: "Bahasa Indonesia",
        "bahasa indonesia": "Bahasa Indonesia",
        malay: "Bahasa Melayu",
        tagalog: "Filipino",
        filipino: "Filipino",
        philippines: "Filipino",
        philippine: "Filipino",
        javanese: "Basa Jawa",
        burmese: "မြန်မာ",
        khmer: "ខ្មែរ",
        lao: "ລາວ",
        arabic: "العربية",
        persian: "فارسی",
        farsi: "فارسی",
        hebrew: "עברית",
        swahili: "Kiswahili",
        zulu: "isiZulu",
        afrikaans: "Afrikaans",
        "traditional chinese": "繁體中文",
        "simplified chinese": "简体中文",
      };
    function c(e) {
      return e.trim().toLowerCase().replace(/\s+/g, " ");
    }
    let u = {
      "bahasa indonesia": "Indonesian",
      indonesia: "Indonesian",
      indonesian: "Indonesian",
      tagalog: "Filipino",
      filipino: "Filipino",
      philippines: "Filipino",
      philippine: "Filipino",
    };
    function m(e, t) {
      let a = e.trim();
      if (!a) return { primary: "—" };
      let r = c(a.split("(")[0].trim()),
        s = null != t && Number.isFinite(Number(t)) ? o[Number(t)] : void 0,
        i = d[r],
        l = s ?? i;
      if (!l) return { primary: a };
      if (l.trim().toLowerCase() === a.trim().toLowerCase()) {
        let e = u[r] || u[c(a)];
        return e ? { primary: l, secondary: e } : { primary: a };
      }
      return { primary: l, secondary: a };
    }
    e.s(
      ["languageCardBackground", () => n, "resolveLanguageCardLabels", () => m],
      43362
    );
  },
  67055,
  (e) => {
    "use strict";
    var t = e.i(43476),
      a = e.i(71645);
    e.i(47167);
    var r = e.i(18566),
      s = e.i(29861),
      i = e.i(43362);
    function l(e) {
      if (null == e) return "";
      let t = String(e).trim();
      if (!t) return "";
      try {
        if (/^https?:\/\//i.test(t)) {
          let e = new URL(t);
          t = e.pathname + (e.search || "");
        }
      } catch {}
      for (let e = 0; e < 6; e++) {
        let e = t
          .replace(/&#x2f;/gi, "/")
          .replace(/&#47;/g, "/")
          .replace(/&amp;/gi, "&")
          .replace(/&sol;/gi, "/");
        if (e === t) break;
        t = e;
      }
      (t = t.replace(/\s+/g, "")).startsWith("/") || (t = `/${t}`);
      let a = t.toLowerCase(),
        r = {
          "/shortfilms/collections/latest": "/more/latest",
          "/short-films/collections/latest": "/more/latest",
          "/shortfilms/collections/new": "/new",
          "/short-films/collections/new": "/new",
        };
      return r[a]
        ? r[a]
        : (t = (t = (t = t.replace(
            /^\/shortfilms(\/|$)/i,
            "/short-films$1"
          )).replace(/^\/webseries(\/|$)/i, "/web-series$1")).replace(
            /^\/freefilms(\/|$)/i,
            "/free-films$1"
          ));
    }
    function n({ className: e }) {
      return (0, t.jsx)("svg", {
        className: e,
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2.2,
        "aria-hidden": !0,
        children: (0, t.jsx)("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M15 19l-7-7 7-7",
        }),
      });
    }
    function o({ className: e }) {
      return (0, t.jsx)("svg", {
        className: e,
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2.2,
        "aria-hidden": !0,
        children: (0, t.jsx)("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M9 5l7 7-7 7",
        }),
      });
    }
    function d({ tiles: e, title: r = "Language" }) {
      let d = (0, a.useRef)(null),
        [c, u] = (0, a.useState)(!1),
        [m, f] = (0, a.useState)(!1),
        h = (0, a.useCallback)(() => {
          let e = d.current;
          if (!e) return;
          let { scrollLeft: t, scrollWidth: a, clientWidth: r } = e,
            s = a - r;
          u(t > 6), f(s > 6 && t < s - 6);
        }, []);
      (0, a.useEffect)(() => {
        h();
        let e = d.current;
        if (!e) return;
        let t = new ResizeObserver(() => h());
        return t.observe(e), () => t.disconnect();
      }, [e.length, h]);
      let g = (e) => {
        let t = d.current;
        if (!t) return;
        let a = Math.min(Math.floor(0.72 * t.clientWidth), 280);
        t.scrollBy({ left: e * a, behavior: "smooth" });
      };
      return e.length
        ? (0, t.jsxs)("div", {
            className: "w-full min-w-0",
            children: [
              (0, t.jsx)("div", {
                className:
                  "cs__header mb-3 flex items-center justify-between gap-3 sm:mb-4",
                children: (0, t.jsx)("h2", {
                  className:
                    "h1-heading cs__header-title flex min-w-0 flex-1 items-center gap-2 text-base font-bold tracking-tight text-white sm:text-xl md:text-2xl select-text cursor-text",
                  children: r,
                }),
              }),
              (0, t.jsxs)("div", {
                className: "relative w-full min-w-0",
                children: [
                  (0, t.jsxs)("ul", {
                    ref: d,
                    onScroll: h,
                    className:
                      "scrollbar-hide m-0 flex list-none flex-nowrap gap-2.5 overflow-x-auto overscroll-x-contain px-0 pb-1 pt-0.5 snap-x snap-proximity sm:gap-3 md:gap-3.5",
                    tabIndex: 0,
                    "aria-label": "Languages — use arrows or swipe to see more",
                    children: [
                      e.map((e, a) => {
                        let r = l(e.href?.trim() || "") || "/short-films",
                          { primary: n, secondary: o } = (0,
                          i.resolveLanguageCardLabels)(e.label, e.regionId),
                          d = (0, i.languageCardBackground)(
                            e.background,
                            e.regionId ?? null,
                            a
                          ),
                          c = e.imageUrl?.trim();
                        return (0, t.jsx)(
                          "li",
                          {
                            className:
                              "w-[min(38vw,142px)] flex-shrink-0 snap-start sm:w-[156px] md:w-[162px]",
                            children: (0, t.jsx)(s.LanguageGradientCard, {
                              href: r,
                              primaryText: n,
                              secondaryText: o,
                              background: d,
                              imageUrl: c && !o ? c : void 0,
                              size: "row",
                              className: e.isActive
                                ? "ring-2 ring-primary border-primary shadow-lg shadow-primary/30"
                                : "",
                            }),
                          },
                          `${e.label}-${e.regionId ?? a}`
                        );
                      }),
                      (0, t.jsx)("li", {
                        className: "w-2 flex-shrink-0 sm:w-3",
                        "aria-hidden": !0,
                      }),
                    ],
                  }),
                  c
                    ? (0, t.jsxs)(t.Fragment, {
                        children: [
                          (0, t.jsx)("div", {
                            className:
                              "pointer-events-none absolute bottom-0 left-0 top-0 z-[2] w-11 bg-gradient-to-r from-black via-black/85 to-transparent sm:w-14",
                            "aria-hidden": !0,
                          }),
                          (0, t.jsx)("button", {
                            type: "button",
                            "aria-label": "Previous languages",
                            onClick: () => g(-1),
                            className:
                              "absolute left-0.5 top-[42%] z-[3] flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/80 text-white shadow-lg backdrop-blur-sm transition hover:border-white/30 hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:left-1 sm:h-9 sm:w-9",
                            children: (0, t.jsx)(n, {
                              className: "h-4 w-4 sm:h-[18px] sm:w-[18px]",
                            }),
                          }),
                        ],
                      })
                    : null,
                  m
                    ? (0, t.jsxs)(t.Fragment, {
                        children: [
                          (0, t.jsx)("div", {
                            className:
                              "pointer-events-none absolute bottom-0 right-0 top-0 z-[2] w-11 bg-gradient-to-l from-black via-black/85 to-transparent sm:w-14",
                            "aria-hidden": !0,
                          }),
                          (0, t.jsx)("button", {
                            type: "button",
                            "aria-label": "Next languages",
                            onClick: () => g(1),
                            className:
                              "absolute right-0.5 top-[42%] z-[3] flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/80 text-white shadow-lg backdrop-blur-sm transition hover:border-white/30 hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:right-1 sm:h-9 sm:w-9",
                            children: (0, t.jsx)(o, {
                              className: "h-4 w-4 sm:h-[18px] sm:w-[18px]",
                            }),
                          }),
                        ],
                      })
                    : null,
                ],
              }),
            ],
          })
        : null;
    }
    var c = e.i(98781),
      u = e.i(2025),
      m = e.i(19600);
    let f = [
      { id: "all", label: "All" },
      { id: "shortfilms", label: "Short Films" },
      { id: "movies", label: "Movies" },
      { id: "webseries", label: "Web Series" },
      { id: "free", label: "Free" },
    ];
    function h({ onFilterChange: e, activeFilterId: r, className: s = "" }) {
      let [i, l] = (0, a.useState)(r ?? "all"),
        n = (0, a.useRef)(null),
        o = (0, a.useRef)(null);
      return (
        (0, a.useEffect)(() => {
          void 0 !== r && l(r);
        }, [r]),
        (0, a.useEffect)(() => {
          if (o.current && n.current) {
            let e = n.current,
              t = o.current,
              a =
                t.offsetLeft -
                e.offsetLeft -
                e.clientWidth / 2 +
                t.clientWidth / 2;
            e.scrollTo({ left: a, behavior: "smooth" });
          }
        }, [i]),
        (0, t.jsxs)("div", {
          className: `relative mb-4 sm:mb-5 ${s}`,
          children: [
            (0, t.jsx)("div", {
              ref: n,
              className:
                "flex gap-1 overflow-x-auto scrollbar-hide scroll-smooth",
              role: "tablist",
              "aria-label": "Content categories",
              children: f.map((a) => {
                let r = i === a.id;
                return (0, t.jsxs)(
                  "button",
                  {
                    ref: r ? o : void 0,
                    role: "tab",
                    "aria-selected": r,
                    onClick: () => {
                      var t;
                      l((t = a.id)), e?.(t);
                    },
                    className: `
                relative px-4 py-2.5 text-[13px] sm:text-sm font-medium
                whitespace-nowrap flex-shrink-0 transition-all duration-200
                ${r ? "text-white" : "text-gray-500 hover:text-gray-300"}
              `,
                    children: [
                      a.label,
                      r &&
                        (0, t.jsx)("span", {
                          className:
                            "absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full",
                        }),
                    ],
                  },
                  a.id
                );
              }),
            }),
            (0, t.jsx)("div", { className: "h-px bg-white/[0.06]" }),
          ],
        })
      );
    }
    var g = e.i(22016);
    function p({
      title: e,
      href: a = "/short-films",
      badge: r,
      showMoreLink: s = !0,
      moreLabel: i = "View All",
    }) {
      let n = l(a) || "/short-films";
      return (0, t.jsxs)("div", {
        className:
          "cs__header mb-3 flex items-center justify-between gap-3 sm:mb-4",
        children: [
          (0, t.jsxs)("h2", {
            className:
              "h1-heading cs__header-title flex min-w-0 flex-1 items-center gap-2 text-base font-bold tracking-tight text-white sm:text-xl md:text-2xl",
            children: [
              e,
              r
                ? (0, t.jsx)("span", {
                    className:
                      "rounded-full border border-primary/20 bg-primary/15 px-2 py-0.5 text-[9px] font-semibold text-primary sm:text-[10px]",
                    children: r,
                  })
                : null,
            ],
          }),
          s
            ? (0, t.jsxs)(g.default, {
                href: n,
                className:
                  "cs__see-more group flex shrink-0 items-center gap-1.5 text-xs font-medium text-gray-400 transition-colors hover:text-white sm:text-sm",
                "aria-label": `${i}: ${e}`,
                children: [
                  (0, t.jsx)("span", { className: "cs__sm-text", children: i }),
                  (0, t.jsx)("svg", {
                    className:
                      "cs__sm-icon h-4 w-4 transition-transform group-hover:translate-x-0.5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    strokeWidth: 2,
                    "aria-hidden": !0,
                    children: (0, t.jsx)("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M9 5l7 7-7 7",
                    }),
                  }),
                ],
              })
            : null,
        ],
      });
    }
    var x = e.i(50947);
    function b({ bannerFilms: e, homeSections: s, continueWatching: i }) {
      let l = (0, r.useRouter)(),
        n = (0, r.usePathname)(),
        { showLoader: o, hideLoader: f } = (0, x.useFilmPageLoader)();
      (0, a.useEffect)(() => {
        f();
      }, [f]);
      let g = s.filter(
        (e) =>
          "hero_banner" !== e.rowType &&
          (("language_tiles" === e.rowType &&
            !!e.languageTiles &&
            e.languageTiles.length > 0) ||
            !!(e.videos && e.videos.length > 0))
      );
      return (0, t.jsxs)("div", {
        className: "bg-black min-h-screen",
        children: [
          e.length > 0
            ? (0, t.jsx)(c.DynamicBannerCarousel, { films: e })
            : (0, t.jsx)("div", {
                className: "px-4 sm:px-6 md:px-8 pt-8",
                children: (0, t.jsx)("div", {
                  className:
                    "mb-8 p-6 bg-gray-900/80 rounded-lg border border-gray-700",
                  children: (0, t.jsx)("p", {
                    className: "text-gray-400 text-sm text-center",
                    children: "Featured content will appear here soon.",
                  }),
                }),
              }),
          (0, t.jsx)("div", {
            className:
              "w-full flex justify-center px-4 sm:px-6 md:px-8 pt-3 sm:pt-4 pb-1",
            "aria-label": "Advertisement",
            children: (0, t.jsx)(m.ShortfundlyOutstreamAd, {
              className: "min-h-[1px] min-w-[1px]",
              lazyLoad: !0,
            }),
          }),
          (0, t.jsxs)("div", {
            className: "px-4 sm:px-6 md:px-8 pt-4 sm:pt-6",
            children: [
              (0, t.jsx)(h, {
                activeFilterId:
                  n && "/home" !== n && "/" !== n
                    ? n.startsWith("/short-films")
                      ? "shortfilms"
                      : n.startsWith("/movies")
                      ? "movies"
                      : n.startsWith("/web-series")
                      ? "webseries"
                      : n.startsWith("/free-films")
                      ? "free"
                      : "all"
                    : "all",
                onFilterChange: (e) => {
                  let t = ((e) => {
                    switch (e) {
                      case "all":
                      default:
                        return "/";
                      case "shortfilms":
                        return "/short-films";
                      case "movies":
                        return "/movies";
                      case "webseries":
                        return "/web-series";
                      case "free":
                        return "/free-films";
                    }
                  })(e);
                  t && t !== n && (o(), l.push(t));
                },
              }),
              i.length > 0 &&
                (0, t.jsx)("section", {
                  className: "card-section mb-3 sm:mb-5 animate-fadeInUp",
                  children: (0, t.jsxs)("div", {
                    className: "cs__content-container",
                    children: [
                      (0, t.jsx)(p, {
                        title: "Continue Watching",
                        href: "/continue-watching",
                      }),
                      (0, t.jsx)(c.DynamicFilmCarousel, {
                        films: i,
                        isVertical: !0,
                      }),
                    ],
                  }),
                }),
              g.map((e, r) =>
                (0, t.jsxs)(
                  a.Fragment,
                  {
                    children: [
                      (0, t.jsx)("section", {
                        className: "card-section mb-3 sm:mb-5 animate-fadeInUp",
                        style: { animationDelay: `${0.1 + 0.05 * r}s` },
                        children: (0, t.jsxs)("div", {
                          className: "cs__content-container",
                          children: [
                            "language_tiles" !== e.rowType
                              ? (0, t.jsx)(p, {
                                  title: e.title,
                                  href:
                                    (e.moreHref || "").trim() || "/short-films",
                                  badge: e.badge,
                                  showMoreLink: !!(e.moreHref || "").trim(),
                                })
                              : null,
                            "language_tiles" === e.rowType &&
                            e.languageTiles &&
                            e.languageTiles.length > 0
                              ? (0, t.jsx)(d, {
                                  tiles: e.languageTiles,
                                  title: e.title,
                                })
                              : (0, t.jsx)(c.DynamicFilmCarousel, {
                                  films: e.videos,
                                  isVertical: !0,
                                }),
                          ],
                        }),
                      }),
                      2 === r &&
                        (0, t.jsx)("div", {
                          className:
                            "mb-3 sm:mb-5 flex justify-center overflow-hidden rounded-lg",
                          children: (0, t.jsx)(u.ShortfundlyHorizontalAd, {}),
                        }),
                      5 === r &&
                        (0, t.jsx)("div", {
                          className:
                            "mb-3 sm:mb-5 flex justify-center overflow-hidden rounded-lg",
                          children: (0, t.jsx)(u.ShortfundlyHorizontalAd, {}),
                        }),
                    ],
                  },
                  `${e.slug}-${r}`
                )
              ),
            ],
          }),
        ],
      });
    }
    function w(e) {
      let [r, s] = (0, a.useState)(!1);
      return ((0, a.useEffect)(() => {
        s(!0);
      }, []),
      r)
        ? (0, t.jsx)(b, { ...e })
        : (0, t.jsxs)("div", {
            className: "bg-black min-h-screen",
            children: [
              e.bannerFilms.length > 0 &&
                (0, t.jsx)("section", {
                  className:
                    "w-full h-[85svh] sm:h-[85vh] bg-black/50 animate-pulse",
                }),
              (0, t.jsx)("div", {
                className: "px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4",
                children:
                  e.homeSections.some((e) => (e.videos?.length ?? 0) > 0) &&
                  (0, t.jsx)("section", {
                    className: "mb-6 sm:mb-8 md:mb-12",
                    children: (0, t.jsx)("h2", {
                      className:
                        "text-lg sm:text-2xl md:text-3xl font-bold text-white mb-4",
                      children: "Latest Short Films",
                    }),
                  }),
              }),
            ],
          });
    }
    e.s(["HomeContentWrapper", () => w], 67055);
  },
  22161,
  (e) => {
    e.v((t) =>
      Promise.all(
        [
          "static/chunks/c69b173043ea0305.js",
          "static/chunks/34b7b01a5f6bd814.js",
        ].map((t) => e.l(t))
      ).then(() => t(20305))
    );
  },
  14913,
  (e) => {
    e.v((t) =>
      Promise.all(
        [
          "static/chunks/e796202c8ceaa8f6.js",
          "static/chunks/3735f7e52b082337.js",
        ].map((t) => e.l(t))
      ).then(() => t(92433))
    );
  },
  15417,
  (e) => {
    e.v((t) =>
      Promise.all(
        ["static/chunks/9e86e114e92f1e45.js"].map((t) => e.l(t))
      ).then(() => t(24593))
    );
  },
  92974,
  (e) => {
    e.v((t) =>
      Promise.all(
        ["static/chunks/e30e9a83fb3f6238.js"].map((t) => e.l(t))
      ).then(() => t(28436))
    );
  },
  10137,
  (e) => {
    e.v((t) =>
      Promise.all(
        ["static/chunks/983683825cb868cd.js"].map((t) => e.l(t))
      ).then(() => t(58512))
    );
  },
  94586,
  (e) => {
    e.v((t) =>
      Promise.all(
        ["static/chunks/5342fd6ea9c07d1a.js"].map((t) => e.l(t))
      ).then(() => t(49472))
    );
  },
]);
