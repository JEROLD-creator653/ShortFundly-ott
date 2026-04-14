(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  18542,
  (e) => {
    "use strict";
    var t = e.i(65640),
      a = e.i(28351);
    let r = new (class {
      async getFilms(e = {}) {
        let {
            page: r = 1,
            limit: i = 10,
            filter: l,
            fields: n,
            sort: s = "Newest",
          } = e,
          o = new URLSearchParams({ page: r.toString(), limit: i.toString() });
        l && n && (o.append("filter", l), o.append("fields", n));
        let c = "createdAt",
          d = "-1";
        "Newest" === s
          ? ((c = "createdAt"), (d = "-1"))
          : "Popular" === s
          ? ((c = "views"), (d = "-1"))
          : ((c = "createdAt"), (d = "1")),
          o.append("sort", c),
          o.append("order", d);
        let u = `${a.API.GET_FILMS.replace(
          a.API.BASE_URL,
          ""
        )}?${o.toString()}`;
        return t.apiClientClient.get(u);
      }
      async getFilmDetails(e) {
        return t.apiClientClient.get(
          `${a.API.GET_MEDIA_FILMS.replace(a.API.BASE_URL, "")}${e}`
        );
      }
      async getFilmDetailsBySlug(e) {
        return t.apiClientClient.get(
          `${a.API.GET_FILM_BY_SLUG.replace(a.API.BASE_URL, "")}${e}`
        );
      }
      async getBannerFilms() {
        return t.apiClientClient.get(
          a.API.BANNER_FILMS.replace(a.API.BASE_URL, "")
        );
      }
      async getPremiumFilms(e = 1, r = 10) {
        let i = new URLSearchParams({
          page: e.toString(),
          limit: r.toString(),
        });
        return t.apiClientClient.get(
          `${a.API.PREMIUM_FILMS.replace(a.API.BASE_URL, "")}?${i.toString()}`
        );
      }
      async getTopRatedFilms(e = 1, r = 10) {
        let i = new URLSearchParams({
          page: e.toString(),
          limit: r.toString(),
        });
        return t.apiClientClient.get(
          `${a.API.TOPRATED.replace(a.API.BASE_URL, "")}?${i.toString()}`
        );
      }
      async getLanguageFilms(e) {
        return t.apiClientClient.get(
          `${a.API.FOR_YOU.replace(a.API.BASE_URL, "")}/${e}`
        );
      }
      async getUpcomingFilms(e = 1, r = 10) {
        let i = new URLSearchParams({
          page: e.toString(),
          limit: r.toString(),
        });
        return t.apiClientClient.get(
          `${a.API.UPCOMING_FILMS.replace(a.API.BASE_URL, "")}?${i.toString()}`
        );
      }
      async getAwardedFilms(e = 1, r = 10) {
        let i = new URLSearchParams({
          page: e.toString(),
          limit: r.toString(),
        });
        return t.apiClientClient.get(
          `${a.API.AWARD_FILMS.replace(a.API.BASE_URL, "")}?${i.toString()}`
        );
      }
      async getMovies(e = 1, r = 12) {
        if (a.API.GET_MOVIES) {
          let i = new URLSearchParams({
              page: e.toString(),
              limit: r.toString(),
            }),
            l = await t.apiClientClient.get(
              `${a.API.GET_MOVIES.replace(a.API.BASE_URL, "")}?${i.toString()}`
            );
          if (l.status) {
            let e = [],
              t = 0;
            if (
              (l.data
                ? Array.isArray(l.data)
                  ? ((e = l.data), (t = l.data.length))
                  : "object" == typeof l.data &&
                    null !== l.data &&
                    Array.isArray(l.data.docs) &&
                    ((e = l.data.docs),
                    (t = l.data.total || l.data.totalDocs || e.length))
                : l.payload &&
                  (Array.isArray(l.payload)
                    ? ((e = l.payload), (t = l.payload.length))
                    : "object" == typeof l.payload &&
                      null !== l.payload &&
                      ((e = l.payload.docs || []),
                      (t =
                        l.payload.total || l.payload.totalDocs || e.length))),
              e.length > 0 || t > 0)
            )
              return { ...l, payload: { docs: e, total: t, totalDocs: t } };
          }
          return l;
        }
        let i = await this.getFilms({ page: e, limit: 2 * r });
        if (i.status && i.payload?.docs) {
          let e = i.payload.docs.filter((e) => 1 === Number(e.media));
          return {
            ...i,
            payload: {
              docs: e.slice(0, r),
              total: i.payload.total || e.length,
              totalDocs: i.payload.total || e.length,
            },
          };
        }
        return i;
      }
      async getWebSeries(e = 1, r = 12) {
        if (a.API.WEB_SERIES) {
          let i = new URLSearchParams({
              page: e.toString(),
              limit: r.toString(),
            }),
            l = await t.apiClientClient.get(
              `${a.API.WEB_SERIES.replace(a.API.BASE_URL, "")}?${i.toString()}`
            );
          if (l.status) {
            let e = [],
              t = 0;
            if (
              (l.data
                ? Array.isArray(l.data)
                  ? ((e = l.data), (t = l.data.length))
                  : "object" == typeof l.data &&
                    null !== l.data &&
                    Array.isArray(l.data.docs) &&
                    ((e = l.data.docs),
                    (t = l.data.total || l.data.totalDocs || e.length))
                : l.payload &&
                  (Array.isArray(l.payload)
                    ? ((e = l.payload), (t = l.payload.length))
                    : "object" == typeof l.payload &&
                      null !== l.payload &&
                      ((e = l.payload.docs || []),
                      (t =
                        l.payload.total || l.payload.totalDocs || e.length))),
              e.length > 0 || t > 0)
            )
              return { ...l, payload: { docs: e, total: t, totalDocs: t } };
          }
          return l;
        }
        let i = await this.getFilms({ page: e, limit: 2 * r });
        if (i.status && i.payload?.docs) {
          let e = i.payload.docs.filter((e) => 3 === Number(e.media));
          return {
            ...i,
            payload: {
              docs: e.slice(0, r),
              total: i.payload.total || e.length,
              totalDocs: i.payload.total || e.length,
            },
          };
        }
        return i;
      }
      async getFreeFilms(e = 1, r = 12, i = "FREE") {
        if (!a.API.GET_FREE_MOVIES)
          return {
            success: !1,
            status: !1,
            error: {
              code: "ENDPOINT_NOT_FOUND",
              message: "GET_FREE_MOVIES endpoint not configured",
            },
          };
        let l = new URLSearchParams({
            page: e.toString(),
            limit: r.toString(),
            releaseMode: i,
          }),
          n = await t.apiClientClient.get(
            `${a.API.GET_FREE_MOVIES.replace(
              a.API.BASE_URL,
              ""
            )}?${l.toString()}`
          );
        if (n.status) {
          let e = [],
            t = 0,
            a = n.data ?? n.payload;
          if (
            (Array.isArray(a)
              ? ((e = a), (t = a.length))
              : a &&
                "object" == typeof a &&
                Array.isArray(a.docs) &&
                ((e = a.docs), (t = a.total ?? a.totalDocs ?? e.length)),
            e.length > 0 || t > 0)
          )
            return {
              ...n,
              data: { docs: e, total: t, totalDocs: t },
              payload: { docs: e, total: t, totalDocs: t },
            };
        }
        return n;
      }
      async getFilmsByFilter(e = 1, r = 40, i, l, n = "all") {
        let s = new URLSearchParams({
            page: e.toString(),
            limit: r.toString(),
            filter: i,
            fields: l,
            sorttype: n,
          }),
          o = await t.apiClientClient.get(
            `${a.API.GET_FILMS.replace(a.API.BASE_URL, "")}?${s.toString()}`
          );
        return this.normalizeDocsResponse(o);
      }
      async getMoviesByFilter(e = 1, r = 40, i, l, n = "all") {
        if (!a.API.GET_MOVIES)
          return { success: !1, status: !1, error: { code: "NO_ENDPOINT" } };
        let s = new URLSearchParams({
            page: e.toString(),
            limit: r.toString(),
            filter: i,
            fields: l,
            sorttype: n,
          }),
          o = await t.apiClientClient.get(
            `${a.API.GET_MOVIES.replace(a.API.BASE_URL, "")}?${s.toString()}`
          );
        return this.normalizeDocsResponse(o);
      }
      normalizeDocsResponse(e) {
        if (e.status) {
          let t = [],
            a = 0;
          if (
            (e.data
              ? Array.isArray(e.data)
                ? ((t = e.data), (a = e.data.length))
                : "object" == typeof e.data &&
                  null !== e.data &&
                  Array.isArray(e.data.docs) &&
                  ((t = e.data.docs),
                  (a = e.data.total || e.data.totalDocs || t.length))
              : e.payload &&
                (Array.isArray(e.payload)
                  ? ((t = e.payload), (a = e.payload.length))
                  : "object" == typeof e.payload &&
                    null !== e.payload &&
                    ((t = e.payload.docs || []),
                    (a = e.payload.total || e.payload.totalDocs || t.length))),
            t.length > 0 || a > 0)
          )
            return {
              success: e.success,
              status: e.status,
              message: e.message,
              error: e.error,
              payload: { docs: t, total: a, totalDocs: a },
            };
        }
        return e;
      }
      async getFilmsByFilterOld(e = 1, r = 10, i, l, n) {
        let s = new URLSearchParams({
          page: e.toString(),
          limit: r.toString(),
          filter: i.toString(),
          fields: l,
        });
        return (
          n && s.append("sorttype", n),
          t.apiClientClient.get(
            `${a.API.GET_FILMS.replace(a.API.BASE_URL, "")}?${s.toString()}`
          )
        );
      }
      async getRelatedFilms(e = 1, r = 7, i, l) {
        let n = new URLSearchParams({
          page: e.toString(),
          limit: r.toString(),
          catid: i.toString(),
        });
        return (
          null == l || Number.isNaN(l) || n.set("regionid", l.toString()),
          t.apiClientClient.get(
            `${a.API.RELATED.replace(a.API.BASE_URL, "")}?${n.toString()}`
          )
        );
      }
      async getContinueWatchByEmail(e) {
        return t.apiClientClient.get(
          `${a.API.GET_CONT_WATCH.replace(a.API.BASE_URL, "")}${e}`
        );
      }
      async toggleLike(e) {
        return t.apiClientClient.post(
          a.API.TOGGLE_LIKE.replace(a.API.BASE_URL, ""),
          { filmId: e }
        );
      }
      async addToWatchlist(e) {
        return t.apiClientClient.post(a.API.LIKE.replace(a.API.BASE_URL, ""), {
          filmId: e,
          type: "WATCH",
        });
      }
      async removeFromWatchlist(e) {
        return t.apiClientClient.post(a.API.LIKE.replace(a.API.BASE_URL, ""), {
          filmId: e,
          type: "UNWATCH",
        });
      }
      async addToFavorites(e, r) {
        return t.apiClientClient.post(
          `${a.API.FAV_ADD.replace(a.API.BASE_URL, "")}${e}`,
          { userId: r }
        );
      }
      async getWatchlist(e, r = 1, i = 12) {
        return t.apiClientClient.get(
          `${a.API.GET_WATCHLIST.replace(
            a.API.BASE_URL,
            ""
          )}${e}?page=${r}&limit=${i}`
        );
      }
      async deleteWatchlist(e) {
        return t.apiClientClient.delete(
          a.API.DELETE_WATCHLIST.replace(a.API.BASE_URL, ""),
          { filmId: [e] }
        );
      }
    })();
    e.s(["filmServiceClient", 0, r]);
  },
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
    function a(e) {
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
    function r(e) {
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
      () => r,
      "getMediaTypeName",
      () => a,
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
    function a(e) {
      let a = t(e);
      if (!a) return !1;
      if (a.startsWith("/") || a.startsWith("data:") || a.startsWith("blob:"))
        return !0;
      try {
        return new URL(a), !0;
      } catch {
        return !1;
      }
    }
    function r(e, i = "/placeholder.svg") {
      let l = t(e);
      return a(l) ? l : i;
    }
    function i(e) {
      let a,
        r,
        i = t(e);
      return (
        !!i &&
        (!!(
          (a = t(i).toLowerCase()) &&
          (a.includes("jwplatform.com") || a.includes("content.jwplatform.com"))
        ) ||
          (!(
            !(r = t(i)) ||
            r.startsWith("/") ||
            r.startsWith("data:") ||
            r.startsWith("blob:")
          ) &&
            (r.startsWith("http://") || r.startsWith("https://"))))
      );
    }
    function l(e) {
      var t;
      let a = [],
        r = e.title?.trim();
      r && "/" !== r && "" !== r && a.push(r);
      let i = e.region?.name?.trim();
      i && "" !== i && a.push(i);
      let l = e.category?.name?.trim();
      l && "" !== l && a.push(l);
      let n =
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
      return (n && "" !== n && a.push(n), a.length > 0)
        ? a.join(" - ")
        : "Film poster";
    }
    e.s([
      "getFilmImageTitle",
      () => l,
      "getImageUrlWithFallback",
      () => r,
      "isValidImageUrl",
      () => a,
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
  28984,
  (e) => {
    "use strict";
    function t(e) {
      if (null == e || "" === e) return "";
      let t = String(e).trim(),
        a = parseInt(t, 10);
      if (!Number.isNaN(a) && t === String(a)) {
        let e = Math.floor(a / 60),
          t = a % 60;
        return e > 0 ? (t > 0 ? `${e}m ${t}s` : `${e}m`) : `${t}s`;
      }
      return t;
    }
    e.s(["formatDuration", () => t]);
  },
  13941,
  (e) => {
    "use strict";
    var t = e.i(43476),
      a = e.i(71645),
      r = e.i(57688),
      i = e.i(18566),
      l = e.i(18542),
      n = e.i(34528),
      s = e.i(45260),
      o = e.i(77625),
      c = e.i(28984),
      d = e.i(31497),
      u = e.i(24871);
    let p = [
      "shortfilm",
      "short film",
      "movie",
      "movies",
      "web series",
      "webseries",
      "documentary",
      "documentaries",
      "song",
      "songs",
    ];
    function m(e) {
      return e.toLowerCase().replace(/\s+/g, " ").trim();
    }
    function g(e) {
      return e.toLowerCase().replace(/[\s_-]/g, "");
    }
    function h(e, t) {
      return e.length <= t ? e : e.slice(0, t) + "...";
    }
    function f({ films: e }) {
      let f = (0, i.useRouter)(),
        [y, b] = (0, a.useTransition)(),
        [x, S] = (0, a.useState)(0),
        [w, A] = (0, a.useState)(!1),
        [j, I] = (0, a.useState)(!1),
        [v, N] = (0, a.useState)(new Set()),
        [E, C] = (0, a.useState)(!1),
        [L, P] = (0, a.useState)(!1),
        [_, R] = (0, a.useState)({}),
        [F, U] = (0, a.useState)({}),
        k = (0, a.useRef)(null),
        T = (0, a.useRef)(0),
        $ = (0, a.useRef)(0),
        M = (0, a.useRef)(void 0),
        B = e[x] || null,
        D = String(B?._id || ""),
        W = !!D && !!_[D];
      (0, a.useEffect)(() => {
        let t = {};
        for (let a of e) a?._id && (t[String(a._id)] = !!a?.isWatchlist);
        R(t);
      }, [e]),
        (0, a.useEffect)(() => {
          "requestIdleCallback" in window
            ? window.requestIdleCallback(() => I(!0), { timeout: 2e3 })
            : setTimeout(() => I(!0), 1e3);
        }, []),
        (0, a.useEffect)(() => {
          if (!(e.length <= 1))
            return (
              k.current && clearInterval(k.current),
              (k.current = setInterval(() => {
                M.current && M.current();
              }, 5e3)),
              () => {
                k.current && clearInterval(k.current);
              }
            );
        }, [e.length]);
      let z = () => {
        e.length <= 1 ||
          w ||
          (A(!0),
          setTimeout(() => {
            S((t) => (t + 1) % e.length), setTimeout(() => A(!1), 10);
          }, 250));
      };
      M.current = z;
      let O = () => {
          e.length <= 1 ||
            w ||
            (A(!0),
            setTimeout(() => {
              S((t) => (t <= 0 ? e.length - 1 : t - 1)),
                setTimeout(() => A(!1), 10);
            }, 250));
        },
        G = (t) => {
          w ||
            t === x ||
            t < 0 ||
            t >= e.length ||
            (A(!0),
            setTimeout(() => {
              S(t), setTimeout(() => A(!1), 10);
            }, 250));
        },
        V = (e) => {
          "left" === e ? O() : z();
        },
        H = () => {
          if (!B || L) return;
          P(!0);
          let e = B.slug || (0, n.createSlug)(B.title, B.mediaId),
            t = Number(B.media) || 0,
            a = (0, s.getMediaTypeRoute)(t),
            r = `/${a}/${e}`,
            i = (0, u.handleContentAccess)({
              isFree: "FREE" === String(B.release_mode ?? "").toUpperCase(),
              slug: e,
              redirectPath: r,
            });
          "redirect" === i.type && i.to
            ? (0, u.safeNavigate)(f, i.to)
            : (C(!0),
              b(() => {
                (0, u.safeNavigate)(f, r);
              }));
        },
        K = async () => {
          if (!B?._id) return;
          let e = String(B._id);
          if (!F[e]) {
            U((t) => ({ ...t, [e]: !0 }));
            try {
              if (_[e]) {
                let t = await l.filmServiceClient.removeFromWatchlist(e);
                (t?.status || t?.success || t?.isSuccess) &&
                  R((t) => ({ ...t, [e]: !1 }));
              } else {
                let t = await l.filmServiceClient.addToWatchlist(e);
                (t?.status || t?.success || t?.isSuccess) &&
                  R((t) => ({ ...t, [e]: !0 }));
              }
            } catch (t) {
              let e = t?.status || t?.error?.status;
              401 === e || 403 === e
                ? (0, u.safeNavigate)(
                    f,
                    (0, u.buildSignInUrl)(window.location.pathname)
                  )
                : console.error("Failed to toggle watchlist from banner:", t);
            } finally {
              U((t) => ({ ...t, [e]: !1 }));
            }
          }
        },
        Y = (e) => {
          if (!e) return;
          let t = e.slug || (0, n.createSlug)(e.title, e.mediaId),
            a = Number(e.media) || 0,
            r = (0, s.getMediaTypeRoute)(a),
            i = `/${r}/${t}`;
          f.prefetch(i);
        },
        q = (e) => {
          if (!e) return null;
          let t = e.pubdate || e.createdAt;
          if (!t) return null;
          try {
            let e = new Date(t);
            if (!isNaN(e.getTime())) return e.getFullYear().toString();
            let a = t.match(/^(\d{4})/);
            if (a) return a[1];
          } catch (e) {}
          return null;
        },
        X = (e) =>
          e ? String(e.certify ?? e.certificate ?? e.age ?? "").trim() : "",
        J = (e) =>
          !!e &&
          !!(
            "PAID" === String(e.release_mode ?? "").toUpperCase() ||
            e.isPaidRental ||
            Number(e.release_pay ?? 0) > 0 ||
            Number(e.ticket_price ?? 0) > 0
          ),
        Q = (e) =>
          (function (e, t = 80) {
            if (!e?.title) return "";
            let a = e.title.trim();
            if (!a.includes("-")) return h(a, t);
            let r = a
              .split(/\s*-\s*/)
              .map((e) => e.trim())
              .filter(Boolean);
            if (r.length < 2) return h(a, t);
            let i = m(String(e.category?.name || "")),
              l = m(String(e.region?.name || "")),
              n = r.slice(1).map(m),
              s = r.slice(1).map(g),
              o = !!(i && n.some((e) => e === i)),
              c = !!(l && n.some((e) => e === l)),
              d = s.some((e) => p.some((t) => e === g(t) || e.includes(g(t))));
            return o || c || d ? h(r[0], t) : h(a, t);
          })(e, 80),
        Z = "/placeholder.jpg",
        ee = (e) => {
          if (!e) return Z;
          let t = e.thumb || e.poster || Z;
          return v.has(t) ? Z : (0, o.getImageUrlWithFallback)(t, Z);
        },
        et = (e, t) => {
          if (e.includes("/placeholder") || t.src.includes("/placeholder")) {
            N((t) => new Set(t).add(e)),
              t.setAttribute("data-placeholder-loaded", "true");
            return;
          }
          if (
            (N((t) => new Set(t).add(e)),
            t.src.includes("/placeholder") ||
              ((t.src = Z), N((e) => new Set(e).add(Z))),
            e.includes("jwplatform.com"))
          ) {
            let t = e.split("?")[0];
            N((a) => {
              let r = new Set(a);
              return r.add(t), r.add(e), r;
            });
          }
        };
      if (!e || 0 === e.length) return null;
      let ea = (t) => (0 === e.length ? 0 : (t + e.length) % e.length),
        er = e.length <= 3 ? e.map((e, t) => t) : [ea(x - 1), x, ea(x + 1)];
      return (0, t.jsxs)("div", {
        children: [
          (0, t.jsxs)("div", {
            className:
              "relative w-full aspect-video md:aspect-auto md:h-[78vh] flex bg-black overflow-hidden",
            onTouchStart: (e) => {
              T.current = e.changedTouches[0].screenX;
            },
            onTouchEnd: (e) => {
              let t;
              ($.current = e.changedTouches[0].screenX),
                (t = T.current - $.current) > 50 ? z() : t < -50 && O();
            },
            onMouseEnter: () => {
              k.current && clearInterval(k.current);
            },
            onMouseLeave: () => {
              e.length <= 1 ||
                (k.current = setInterval(() => {
                  M.current && M.current();
                }, 5e3));
            },
            children: [
              (0, t.jsx)("div", {
                className:
                  "hidden md:block absolute inset-0 z-10 pointer-events-none",
                style: {
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.92) 18%, rgba(0,0,0,0.76) 36%, rgba(0,0,0,0.46) 55%, rgba(0,0,0,0.18) 70%, rgba(0,0,0,0.0) 84%), linear-gradient(180deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.10) 34%, rgba(0,0,0,0.0) 56%, rgba(0,0,0,0.44) 100%)",
                },
              }),
              (0, t.jsx)("div", {
                className:
                  "md:hidden absolute inset-x-0 bottom-0 h-16 z-10 pointer-events-none",
                style: {
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                },
              }),
              (0, t.jsx)("div", {
                className:
                  "hidden md:flex absolute inset-y-0 left-0 z-20 w-[46%] max-w-[680px] flex-col justify-center pl-3 pr-6 sm:pl-4 sm:pr-8 md:pl-6 md:pr-10 lg:pl-8 lg:pr-12 py-8 md:py-10 lg:py-12",
                children: (0, t.jsxs)("div", {
                  className: "relative z-10",
                  children: [
                    (0, t.jsxs)("div", {
                      className: `flex items-center gap-2 mb-3 transition-opacity duration-500 ${
                        w ? "opacity-0" : "opacity-100"
                      }`,
                      children: [
                        J(B) &&
                          (0, t.jsxs)("span", {
                            className:
                              "inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-[11px] font-bold px-2 py-1",
                            children: [
                              (0, t.jsx)("span", {
                                className: "text-[10px]",
                                children: "✦",
                              }),
                              "Premium",
                            ],
                          }),
                        X(B) &&
                          (0, t.jsx)("span", {
                            className:
                              "inline-flex items-center rounded-md border border-white/25 bg-black/35 text-white text-[11px] font-semibold px-2 py-1",
                            children: X(B),
                          }),
                      ],
                    }),
                    (0, t.jsx)("h2", {
                      className: `text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white leading-[1.08] line-clamp-2 tracking-tight transition-opacity duration-500 ${
                        w ? "opacity-0" : "opacity-100"
                      }`,
                      children: Q(B),
                    }),
                    (0, t.jsxs)("div", {
                      className: `flex flex-wrap items-center gap-2 mb-6 text-[13px] md:text-sm text-white/85 transition-opacity duration-500 ${
                        w ? "opacity-0" : "opacity-100"
                      }`,
                      children: [
                        q(B) && (0, t.jsx)("span", { children: q(B) }),
                        q(B) &&
                          ((0, c.formatDuration)(B?.duration) ||
                            B?.category?.name ||
                            B?.region?.name) &&
                          (0, t.jsx)("span", { children: "•" }),
                        (0, c.formatDuration)(B?.duration) &&
                          (0, t.jsx)("span", {
                            children: (0, c.formatDuration)(B?.duration),
                          }),
                        (0, c.formatDuration)(B?.duration) &&
                          (B?.category?.name || B?.region?.name) &&
                          (0, t.jsx)("span", { children: "•" }),
                        B?.category?.name &&
                          (0, t.jsx)("span", { children: B.category.name }),
                        B?.category?.name &&
                          B?.region?.name &&
                          (0, t.jsx)("span", { children: "•" }),
                        B?.region?.name &&
                          (0, t.jsx)("span", { children: B.region.name }),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      className: `flex items-center gap-3 transition-opacity duration-500 ${
                        w ? "opacity-0" : "opacity-100"
                      }`,
                      children: [
                        (0, t.jsx)("button", {
                          onClick: H,
                          onMouseEnter: () => Y(B),
                          disabled: E || y,
                          className:
                            "inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all hover:opacity-90 active:scale-95 focus:outline-none bg-primary text-white shadow-lg shadow-primary/30 border border-primary-dark hover:bg-primary-dark disabled:opacity-70 disabled:cursor-wait",
                          children:
                            E || y
                              ? (0, t.jsxs)(t.Fragment, {
                                  children: [
                                    (0, t.jsxs)("svg", {
                                      className: "w-5 h-5 animate-spin",
                                      viewBox: "0 0 24 24",
                                      fill: "none",
                                      children: [
                                        (0, t.jsx)("circle", {
                                          className: "opacity-25",
                                          cx: "12",
                                          cy: "12",
                                          r: "10",
                                          stroke: "currentColor",
                                          strokeWidth: "4",
                                        }),
                                        (0, t.jsx)("path", {
                                          className: "opacity-75",
                                          fill: "currentColor",
                                          d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
                                        }),
                                      ],
                                    }),
                                    "Loading...",
                                  ],
                                })
                              : (0, t.jsxs)(t.Fragment, {
                                  children: [
                                    (0, t.jsx)("svg", {
                                      className: "w-5 h-5",
                                      viewBox: "0 0 24 24",
                                      fill: "currentColor",
                                      children: (0, t.jsx)("polygon", {
                                        points: "10 8 16 12 10 16",
                                      }),
                                    }),
                                    "Play",
                                  ],
                                }),
                        }),
                        (0, t.jsxs)("button", {
                          onClick: K,
                          disabled: !B?._id || !!F[D],
                          className:
                            "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm bg-white/10 text-white border border-white/20 hover:bg-white/15 active:scale-95",
                          "aria-label": "Add to my list",
                          children: [
                            (0, t.jsx)("svg", {
                              className: "w-4 h-4",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              strokeWidth: 2,
                              children: W
                                ? (0, t.jsx)("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "M5 13l4 4L19 7",
                                  })
                                : (0, t.jsx)("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "M12 4v16m8-8H4",
                                  }),
                            }),
                            W ? "In My List" : "My List",
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              e.length > 1 &&
                (0, t.jsx)("div", {
                  className:
                    "md:hidden absolute bottom-3 left-0 right-0 z-20 flex items-center justify-center gap-1.5",
                  children: e.map((e, a) =>
                    (0, t.jsx)(
                      "button",
                      {
                        onClick: () => G(a),
                        "aria-label": `Go to slide ${a + 1}`,
                        className: `rounded-full transition-all duration-300 ${
                          a === x
                            ? "w-5 h-1.5 bg-primary"
                            : "w-1.5 h-1.5 bg-white/40 hover:bg-white/60"
                        }`,
                      },
                      a
                    )
                  ),
                }),
              (0, t.jsxs)("div", {
                className: "hidden md:block w-full h-full relative z-0",
                style: { aspectRatio: "16/9", minHeight: "78vh" },
                children: [
                  (0, t.jsx)(r.default, {
                    src: ee(B),
                    alt: "",
                    "aria-hidden": "true",
                    fill: !0,
                    priority: !0,
                    fetchPriority: "high",
                    className:
                      "absolute inset-0 w-full h-full object-cover object-right opacity-45 scale-[1.03]",
                    sizes: "100vw",
                    unoptimized:
                      v.has(B?.thumb || B?.poster || Z) ||
                      (0, o.shouldUseUnoptimized)(B?.thumb || B?.poster),
                  }),
                  (0, t.jsx)(r.default, {
                    src: ee(B),
                    alt: B
                      ? (0, o.getFilmImageTitle)(B)
                      : "Featured film poster",
                    title: B
                      ? (0, o.getFilmImageTitle)(B)
                      : "Featured film poster",
                    fill: !0,
                    priority: !0,
                    fetchPriority: "high",
                    className:
                      "absolute inset-0 w-full h-full object-contain object-right bg-black",
                    sizes: "100vw",
                    onError: (e) => {
                      let t = e.target,
                        a = B?.thumb || B?.poster || Z;
                      "true" !== t.getAttribute("data-placeholder-loaded") &&
                        et(a, t);
                    },
                    unoptimized:
                      v.has(B?.thumb || B?.poster || Z) ||
                      (0, o.shouldUseUnoptimized)(B?.thumb || B?.poster),
                  }),
                  (0, t.jsx)("div", {
                    className:
                      "absolute inset-0 z-[12] pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-black/15",
                  }),
                ],
              }),
              (0, t.jsx)("button", {
                type: "button",
                onClick: H,
                onMouseEnter: () => Y(B),
                disabled: E || y,
                className:
                  "md:hidden absolute inset-0 z-[1] cursor-pointer bg-transparent border-0 p-0 focus:outline-none focus:ring-2 focus:ring-primary/50",
                "aria-label": "Watch now",
                children: (0, t.jsx)(r.default, {
                  src: ((e) => {
                    if (!e) return Z;
                    let t = e.thumb || e.poster || Z;
                    return v.has(t) ? Z : (0, o.getImageUrlWithFallback)(t, Z);
                  })(B),
                  alt: B ? (0, o.getFilmImageTitle)(B) : "Featured film poster",
                  fill: !0,
                  priority: !0,
                  fetchPriority: "high",
                  className: "absolute inset-0 w-full h-full object-cover",
                  sizes: "100vw",
                  onError: (e) => {
                    let t = e.target,
                      a = B?.thumb || B?.poster || Z;
                    "true" !== t.getAttribute("data-placeholder-loaded") &&
                      et(a, t);
                  },
                  unoptimized:
                    v.has(B?.thumb || B?.poster || Z) ||
                    (0, o.shouldUseUnoptimized)(B?.thumb || B?.poster),
                }),
              }),
              (E || y) &&
                (0, t.jsx)(d.ShortfundlyLoadingScreen, {
                  message: "Loading film...",
                }),
              j &&
                e.length > 1 &&
                (0, t.jsx)("div", {
                  className:
                    "hidden md:block absolute left-3 sm:left-4 md:left-6 lg:left-8 bottom-7 z-30",
                  children: (0, t.jsxs)("div", {
                    className: "relative w-[360px] h-[92px]",
                    children: [
                      er.map((a, i) => {
                        let l = e[a],
                          n = a === x;
                        return (0, t.jsx)(
                          "button",
                          {
                            onClick: () => G(a),
                            className: `absolute top-1/2 -translate-y-1/2 overflow-hidden rounded-xl aspect-video transition-all duration-300 border ${
                              0 === i
                                ? "left-0 z-10 w-[122px] opacity-85"
                                : 1 === i
                                ? "left-[98px] z-20 w-[170px]"
                                : "left-[236px] z-10 w-[122px] opacity-85"
                            } ${
                              n
                                ? "border-white shadow-[0_0_0_3px_rgba(255,255,255,0.2)]"
                                : "border-white/35 hover:border-white/70"
                            }`,
                            "aria-label": `Go to slide ${a + 1}`,
                            children: (0, t.jsx)(r.default, {
                              src: (0, o.getImageUrlWithFallback)(
                                l.thumb || l.poster
                              ),
                              alt: (0, o.getFilmImageTitle)(l),
                              title: (0, o.getFilmImageTitle)(l),
                              width: 170,
                              height: 96,
                              sizes: "170px",
                              className: "w-full h-full object-cover",
                              loading: "lazy",
                              onError: (e) => {
                                let t = e.target;
                                "true" !==
                                  t.getAttribute("data-placeholder-loaded") &&
                                  et(l.thumb || l.poster || Z, t);
                              },
                              unoptimized:
                                v.has(l.thumb || l.poster || Z) ||
                                (0, o.shouldUseUnoptimized)(
                                  l.thumb || l.poster
                                ),
                            }),
                          },
                          `${l._id || l.mediaId}-${a}`
                        );
                      }),
                      (0, t.jsx)("button", {
                        onClick: () => V("left"),
                        className:
                          "absolute left-[-18px] top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-black/85 border border-white/25 flex items-center justify-center text-white transition-all",
                        "aria-label": "Previous thumbnails",
                        children: (0, t.jsx)("svg", {
                          className: "h-5 w-5",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          "aria-hidden": "true",
                          children: (0, t.jsx)("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M15 19l-7-7 7-7",
                          }),
                        }),
                      }),
                      (0, t.jsx)("button", {
                        onClick: () => V("right"),
                        className:
                          "absolute right-[-18px] top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-black/85 border border-white/25 flex items-center justify-center text-white transition-all",
                        "aria-label": "Next thumbnails",
                        children: (0, t.jsx)("svg", {
                          className: "h-5 w-5",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          "aria-hidden": "true",
                          children: (0, t.jsx)("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M9 5l7 7-7 7",
                          }),
                        }),
                      }),
                    ],
                  }),
                }),
            ],
          }),
          (0, t.jsxs)("div", {
            className: `md:hidden bg-black px-3 sm:px-4 md:px-6 lg:px-8 pt-4 pb-5 transition-opacity duration-500 ${
              w ? "opacity-0" : "opacity-100"
            }`,
            children: [
              J(B) &&
                (0, t.jsxs)("div", {
                  className:
                    "inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full w-fit mb-2",
                  children: [
                    (0, t.jsx)("span", {
                      className: "text-[9px]",
                      children: "✦",
                    }),
                    "PREMIUM",
                  ],
                }),
              X(B) &&
                (0, t.jsx)("div", {
                  className:
                    "inline-flex items-center rounded-full border border-white/25 bg-white/10 text-white text-[10px] font-semibold px-2.5 py-0.5 w-fit mb-2 ml-1",
                  children: X(B),
                }),
              "FREE" === String(B?.release_mode ?? "").toUpperCase() &&
                (0, t.jsx)("div", {
                  className:
                    "inline-flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full w-fit mb-2",
                  children: "FREE",
                }),
              (0, t.jsx)("h2", {
                className:
                  "text-lg sm:text-xl font-bold text-white leading-tight mb-1.5",
                children: Q(B),
              }),
              (0, t.jsxs)("div", {
                className: "flex flex-wrap items-center gap-1.5 mb-2",
                children: [
                  q(B) &&
                    (0, t.jsx)("span", {
                      className:
                        "text-gray-400 text-[11px] px-2 py-0.5 rounded-full bg-white/10",
                      children: q(B),
                    }),
                  (0, c.formatDuration)(B?.duration) &&
                    (0, t.jsx)("span", {
                      className:
                        "text-gray-400 text-[11px] px-2 py-0.5 rounded-full bg-white/10",
                      children: (0, c.formatDuration)(B?.duration),
                    }),
                  B?.category?.name &&
                    (0, t.jsx)("span", {
                      className:
                        "text-gray-400 text-[11px] px-2 py-0.5 rounded-full bg-white/10",
                      children: B.category.name,
                    }),
                  B?.region?.name &&
                    (0, t.jsx)("span", {
                      className:
                        "text-gray-400 text-[11px] px-2 py-0.5 rounded-full bg-white/10",
                      children: B.region.name,
                    }),
                ],
              }),
              (0, t.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [
                  (0, t.jsx)("button", {
                    onClick: H,
                    onMouseEnter: () => Y(B),
                    disabled: E || y,
                    className:
                      "flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all active:scale-95 bg-white text-black disabled:opacity-70",
                    children:
                      E || y
                        ? (0, t.jsxs)(t.Fragment, {
                            children: [
                              (0, t.jsxs)("svg", {
                                className: "w-4 h-4 animate-spin",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                children: [
                                  (0, t.jsx)("circle", {
                                    className: "opacity-25",
                                    cx: "12",
                                    cy: "12",
                                    r: "10",
                                    stroke: "currentColor",
                                    strokeWidth: "4",
                                  }),
                                  (0, t.jsx)("path", {
                                    className: "opacity-75",
                                    fill: "currentColor",
                                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
                                  }),
                                ],
                              }),
                              "Loading...",
                            ],
                          })
                        : (0, t.jsxs)(t.Fragment, {
                            children: [
                              (0, t.jsx)("svg", {
                                className: "w-5 h-5",
                                viewBox: "0 0 24 24",
                                fill: "currentColor",
                                children: (0, t.jsx)("polygon", {
                                  points: "10 8 16 12 10 16",
                                }),
                              }),
                              "Watch Now",
                            ],
                          }),
                  }),
                  (0, t.jsxs)("button", {
                    onClick: K,
                    disabled: !B?._id || !!F[D],
                    className:
                      "flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg font-semibold text-sm bg-white/10 text-white border border-white/20 hover:bg-white/15 active:scale-95",
                    "aria-label": "Add to my list",
                    children: [
                      (0, t.jsx)("svg", {
                        className: "w-4 h-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        strokeWidth: 2,
                        children: W
                          ? (0, t.jsx)("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              d: "M5 13l4 4L19 7",
                            })
                          : (0, t.jsx)("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              d: "M12 4v16m8-8H4",
                            }),
                      }),
                      W ? "In My List" : "My List",
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      });
    }
    e.s(["BannerCarousel", () => f], 13941);
  },
  24593,
  (e) => {
    e.n(e.i(13941));
  },
]);
