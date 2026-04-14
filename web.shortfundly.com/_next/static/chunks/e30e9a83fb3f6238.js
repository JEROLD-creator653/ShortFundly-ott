(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  45260,
  (e) => {
    "use strict";
    function t(e) {
      return (
        {
          0: "short-films",
          1: "movies",
          2: "short-films",
          3: "web-series",
          4: "shorts",
          5: "movies",
          6: "songs",
          7: "documentaries",
        }[e] || "short-films"
      );
    }
    function r(e) {
      return (
        {
          0: "Short Films",
          1: "Movies",
          2: "Short Films",
          3: "Web Series",
          4: "Shorts",
          5: "Movies",
          6: "Songs",
          7: "Documentaries",
        }[e] || "Short Films"
      );
    }
    function l(e) {
      if (e?.region == null) return;
      let t = e.region;
      if ("number" == typeof t) {
        let e = Number(t);
        return Number.isNaN(e) ? void 0 : e;
      }
      if ("object" == typeof t && null !== t && "id" in t) {
        let e = Number(t.id);
        return Number.isNaN(e) ? void 0 : e;
      }
    }
    e.s([
      "getFilmRegionId",
      () => l,
      "getMediaTypeName",
      () => r,
      "getMediaTypeRoute",
      () => t,
    ]);
  },
  77625,
  (e) => {
    "use strict";
    function t(e) {
      return "string" != typeof e ? "" : e.trim();
    }
    function r(e) {
      let r = t(e);
      if (!r) return !1;
      if (r.startsWith("/") || r.startsWith("data:") || r.startsWith("blob:"))
        return !0;
      try {
        return new URL(r), !0;
      } catch {
        return !1;
      }
    }
    function l(e, i = "/placeholder.svg") {
      let s = t(e);
      return r(s) ? s : i;
    }
    function i(e) {
      let r,
        l,
        i = t(e);
      return (
        !!i &&
        (!!(
          (r = t(i).toLowerCase()) &&
          (r.includes("jwplatform.com") || r.includes("content.jwplatform.com"))
        ) ||
          (!(
            !(l = t(i)) ||
            l.startsWith("/") ||
            l.startsWith("data:") ||
            l.startsWith("blob:")
          ) &&
            (l.startsWith("http://") || l.startsWith("https://"))))
      );
    }
    function s(e) {
      var t;
      let r = [],
        l = e.title?.trim();
      l && "/" !== l && "" !== l && r.push(l);
      let i = e.region?.name?.trim();
      i && "" !== i && r.push(i);
      let s = e.category?.name?.trim();
      s && "" !== s && r.push(s);
      let a =
        null == (t = e.media)
          ? ""
          : {
              0: "Shortfilm",
              1: "Movies",
              2: "Shortfilm",
              3: "Webseries",
              4: "Shorts",
              5: "Movies",
              6: "Songs",
              7: "Documentaries",
            }[t] || "";
      return (a && "" !== a && r.push(a), r.length > 0)
        ? r.join(" - ")
        : "Film poster";
    }
    e.s([
      "getFilmImageTitle",
      () => s,
      "getImageUrlWithFallback",
      () => l,
      "isValidImageUrl",
      () => r,
      "shouldUseUnoptimized",
      () => i,
    ]);
  },
  34528,
  (e) => {
    "use strict";
    function t(e, t) {
      return e
        ? e
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "")
        : t || "untitled";
    }
    e.s(["createSlug", () => t]);
  },
  60588,
  (e) => {
    "use strict";
    var t = e.i(43476),
      r = e.i(71645),
      l = e.i(57688),
      i = e.i(18566),
      s = e.i(34528),
      a = e.i(45260),
      o = e.i(77625),
      n = e.i(50947);
    let c = "/placeholder.svg",
      m = (0, r.memo)(function ({ film: e, fillContainer: m }) {
        let d,
          u = (0, i.useRouter)(),
          [, h] = (0, r.useTransition)(),
          { showLoader: p } = (0, n.useFilmPageLoader)(),
          [f, b] = (0, r.useState)(!1),
          g = (0, r.useRef)(null),
          x = (0, o.getImageUrlWithFallback)(e.poster || e.thumb, c),
          v =
            ((d = e.slug || (0, s.createSlug)(e.title, e.mediaId)),
            `/${(0, a.getMediaTypeRoute)(Number(e.media) || 0)}/${d}`),
          w = () => {
            g.current && (clearTimeout(g.current), (g.current = null));
          };
        return (
          (0, r.useEffect)(() => () => w(), []),
          (0, t.jsx)("div", {
            className: m
              ? "relative w-full min-w-0"
              : "relative flex-none w-[calc((100vw-1rem-2rem)/2.5)] sm:w-[calc((100vw-1rem-3rem)/3.5)] md:w-[calc((100vw-3rem-7.5rem)/5.5)] lg:w-[calc((100vw-3rem-10.5rem)/7.5)] snap-start",
            onMouseEnter: () => {
              u.prefetch(v),
                w(),
                b(!0),
                (g.current = setTimeout(() => {
                  b(!1), (g.current = null);
                }, 500));
            },
            onMouseLeave: () => {
              w(), b(!1);
            },
            children: (0, t.jsx)("div", {
              className:
                "relative z-0 cursor-pointer rounded-xl transition-all duration-300 hover:-translate-y-4 hover:z-10",
              onClick: () => {
                p(), h(() => u.push(v));
              },
              children: (0, t.jsxs)("div", {
                className:
                  "relative aspect-[9/16] w-full bg-zinc-800 rounded-xl overflow-hidden shadow-md",
                children: [
                  f &&
                    (0, t.jsx)("div", {
                      className:
                        "absolute inset-0 z-[5] w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none animate-card-shine",
                      "aria-hidden": !0,
                    }),
                  (0, t.jsx)(l.default, {
                    src: x,
                    alt: (0, o.getFilmImageTitle)(e),
                    title: (0, o.getFilmImageTitle)(e),
                    width: 1080,
                    height: 1920,
                    sizes:
                      "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 180px",
                    className: "w-full h-full object-cover",
                    loading: "lazy",
                    onError: (e) => {
                      let t = e.target;
                      t.src.endsWith(c) || (t.src = c);
                    },
                  }),
                  "PAID" === String(e.release_mode ?? "").toUpperCase() &&
                    (0, t.jsxs)("div", {
                      className:
                        "absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full z-10 flex items-center gap-0.5 shadow-lg shadow-amber-500/30",
                      children: [
                        (0, t.jsx)("span", {
                          className: "text-[8px] sm:text-[10px]",
                          children: "✦",
                        }),
                        "PREMIUM",
                      ],
                    }),
                  "FREE" === String(e.release_mode ?? "").toUpperCase() &&
                    (0, t.jsx)("div", {
                      className:
                        "absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-emerald-500 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full z-10 shadow-lg",
                      children: "FREE",
                    }),
                  e.createdAt &&
                    Date.now() - new Date(e.createdAt).getTime() < 6048e5 &&
                    (0, t.jsx)("div", {
                      className:
                        "absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-emerald-500 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full z-10 shadow-lg",
                      children: "NEW",
                    }),
                  e.continuepercent > 0 &&
                    (0, t.jsx)("div", {
                      className:
                        "absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-10",
                      children: (0, t.jsx)("div", {
                        className: "h-full bg-primary rounded-r-full",
                        style: { width: `${e.continuepercent}%` },
                      }),
                    }),
                ],
              }),
            }),
          })
        );
      });
    e.s(["FilmCardVertical", 0, m]);
  },
  28984,
  (e) => {
    "use strict";
    function t(e) {
      if (null == e || "" === e) return "";
      let t = String(e).trim(),
        r = parseInt(t, 10);
      if (!Number.isNaN(r) && t === String(r)) {
        let e = Math.floor(r / 60),
          t = r % 60;
        return e > 0 ? (t > 0 ? `${e}m ${t}s` : `${e}m`) : `${t}s`;
      }
      return t;
    }
    e.s(["formatDuration", () => t]);
  },
  93915,
  (e) => {
    "use strict";
    var t = e.i(43476),
      r = e.i(71645),
      l = e.i(57688),
      i = e.i(22016),
      s = e.i(75254);
    let a = (0, s.default)("chevron-left", [
        ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }],
      ]),
      o = (0, s.default)("chevron-right", [
        ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }],
      ]);
    var n = e.i(60588),
      c = e.i(34528),
      m = e.i(45260),
      d = e.i(77625),
      u = e.i(28984);
    function h({ films: e, title: s, isVertical: h = !1 }) {
      let p = (0, r.useRef)(null),
        [f, b] = (0, r.useState)(!1),
        [g, x] = (0, r.useState)(!0),
        v = (0, r.useCallback)(() => {
          let e = p.current;
          if (!e) return;
          let { scrollLeft: t, scrollWidth: r, clientWidth: l } = e;
          b(t > 20), x(t < r - l - 30);
        }, []);
      if (
        ((0, r.useEffect)(() => {
          let e = p.current;
          if (!e) return;
          v(), e.addEventListener("scroll", v, { passive: !0 });
          let t = new ResizeObserver(v);
          return (
            t.observe(e),
            () => {
              e.removeEventListener("scroll", v), t.disconnect();
            }
          );
        }, [v, e]),
        !e?.length)
      )
        return null;
      let w = (e) => {
        let t = p.current;
        if (!t) return;
        let r = t.querySelector(".snap-start");
        if (r) {
          let l = window.innerWidth >= 768 ? 24 : 16,
            i = (r.clientWidth + l) * 4;
          t.scrollBy({ left: "left" === e ? -i : i, behavior: "smooth" });
        } else
          t.scrollBy({
            left: "left" === e ? -(0.8 * t.clientWidth) : 0.8 * t.clientWidth,
            behavior: "smooth",
          });
      };
      return h
        ? (0, t.jsxs)("div", {
            className: "relative group/carousel",
            style: { zIndex: 1 },
            children: [
              f &&
                (0, t.jsx)("button", {
                  onClick: () => w("left"),
                  className:
                    "absolute left-0 top-8 bottom-8 w-10 md:w-12 z-[110] flex items-center justify-center cursor-pointer opacity-0 group-hover/carousel:opacity-100 transition-all duration-300",
                  "aria-label": "Scroll left",
                  children: (0, t.jsx)("div", {
                    className:
                      "w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/10 hover:bg-black/80 hover:border-white/30 transition-all",
                    children: (0, t.jsx)(a, {
                      size: 24,
                      className: "text-white",
                      strokeWidth: 3,
                    }),
                  }),
                }),
              g &&
                (0, t.jsx)("button", {
                  onClick: () => w("right"),
                  className:
                    "absolute right-0 top-8 bottom-8 w-10 md:w-12 z-[110] flex items-center justify-center cursor-pointer opacity-0 group-hover/carousel:opacity-100 transition-all duration-300",
                  "aria-label": "Scroll right",
                  children: (0, t.jsx)("div", {
                    className:
                      "w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/10 hover:bg-black/80 hover:border-white/30 transition-all",
                    children: (0, t.jsx)(o, {
                      size: 24,
                      className: "text-white",
                      strokeWidth: 3,
                    }),
                  }),
                }),
              (0, t.jsx)("div", {
                ref: p,
                className:
                  "flex gap-3 sm:gap-4 md:gap-5 overflow-x-auto overflow-y-hidden md:overflow-y-visible scrollbar-hide snap-x snap-mandatory pt-6 pb-1",
                children: e.map((e) =>
                  (0, t.jsx)(
                    n.FilmCardVertical,
                    { film: e },
                    e._id || e.mediaId
                  )
                ),
              }),
            ],
          })
        : (0, t.jsxs)("div", {
            className: "relative mb-4 sm:mb-6 md:mb-8",
            children: [
              s &&
                (0, t.jsx)("h3", {
                  className: "text-xl sm:text-2xl font-bold text-white mb-4",
                  children: s,
                }),
              (0, t.jsxs)("div", {
                className: "relative group/carousel",
                children: [
                  f &&
                    (0, t.jsx)("button", {
                      onClick: () => w("left"),
                      className:
                        "absolute left-0 top-4 bottom-4 w-12 md:w-14 z-[110] flex items-center justify-center cursor-pointer opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 bg-gradient-to-r from-black/80 to-transparent hover:from-black",
                      "aria-label": "Scroll left",
                      children: (0, t.jsx)("div", {
                        className:
                          "w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/10 hover:bg-black/80 hover:border-white/30 transition-all",
                        children: (0, t.jsx)(a, {
                          size: 28,
                          className: "text-white",
                          strokeWidth: 3,
                        }),
                      }),
                    }),
                  g &&
                    (0, t.jsx)("button", {
                      onClick: () => w("right"),
                      className:
                        "absolute right-0 top-4 bottom-4 w-12 md:w-14 z-[110] flex items-center justify-center cursor-pointer opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 bg-gradient-to-l from-black/80 to-transparent hover:from-black",
                      "aria-label": "Scroll right",
                      children: (0, t.jsx)("div", {
                        className:
                          "w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/10 hover:bg-black/80 hover:border-white/30 transition-all",
                        children: (0, t.jsx)(o, {
                          size: 28,
                          className: "text-white",
                          strokeWidth: 3,
                        }),
                      }),
                    }),
                  (0, t.jsx)("div", {
                    ref: p,
                    className:
                      "flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4",
                    children: e.map((e) => {
                      let r = e.slug || (0, c.createSlug)(e.title, e.mediaId),
                        s = `/${(0, m.getMediaTypeRoute)(
                          Number(e.media) || 0
                        )}/${r}`;
                      return (0, t.jsx)(
                        "div",
                        {
                          className: "flex-shrink-0",
                          children: (0, t.jsxs)(i.default, {
                            href: s,
                            title: `Watch ${e.title}`,
                            className:
                              "flex flex-col min-w-[110px] sm:min-w-[150px] md:min-w-[200px] max-w-[200px] group transition-transform hover:-translate-y-1",
                            children: [
                              (0, t.jsxs)("div", {
                                className:
                                  "relative w-full aspect-[9/16] rounded-lg overflow-hidden bg-black mb-2",
                                children: [
                                  (0, d.isValidImageUrl)(e.thumb || e.poster) &&
                                    (0, t.jsx)(l.default, {
                                      src: (0, d.getImageUrlWithFallback)(
                                        e.thumb || e.poster
                                      ),
                                      alt: (0, d.getFilmImageTitle)(e),
                                      title: (0, d.getFilmImageTitle)(e),
                                      width: 300,
                                      height: 450,
                                      loading: "lazy",
                                      className: "w-full h-full object-cover",
                                    }),
                                  (0, u.formatDuration)(e.duration) &&
                                    (0, t.jsx)("span", {
                                      className:
                                        "absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium",
                                      children: (0, u.formatDuration)(
                                        e.duration
                                      ),
                                    }),
                                ],
                              }),
                              (0, t.jsx)("h4", {
                                className:
                                  "text-sm font-medium text-white mb-1 line-clamp-2 group-hover:text-primary transition-colors",
                                children: e.title,
                              }),
                              e.views &&
                                (0, t.jsxs)("span", {
                                  className: "text-xs text-gray-400",
                                  children: [
                                    e.views.toLocaleString(),
                                    " views",
                                  ],
                                }),
                            ],
                          }),
                        },
                        e._id || e.mediaId
                      );
                    }),
                  }),
                ],
              }),
            ],
          });
    }
    e.s(["FilmCarousel", () => h], 93915);
  },
  28436,
  (e) => {
    e.n(e.i(93915));
  },
]);
