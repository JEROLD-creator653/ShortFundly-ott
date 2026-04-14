(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  18542,
  (e) => {
    "use strict";
    var t = e.i(65640),
      r = e.i(28351);
    let a = new (class {
      async getFilms(e = {}) {
        let {
            page: a = 1,
            limit: i = 10,
            filter: l,
            fields: s,
            sort: n = "Newest",
          } = e,
          o = new URLSearchParams({ page: a.toString(), limit: i.toString() });
        l && s && (o.append("filter", l), o.append("fields", s));
        let c = "createdAt",
          d = "-1";
        "Newest" === n
          ? ((c = "createdAt"), (d = "-1"))
          : "Popular" === n
          ? ((c = "views"), (d = "-1"))
          : ((c = "createdAt"), (d = "1")),
          o.append("sort", c),
          o.append("order", d);
        let p = `${r.API.GET_FILMS.replace(
          r.API.BASE_URL,
          ""
        )}?${o.toString()}`;
        return t.apiClientClient.get(p);
      }
      async getFilmDetails(e) {
        return t.apiClientClient.get(
          `${r.API.GET_MEDIA_FILMS.replace(r.API.BASE_URL, "")}${e}`
        );
      }
      async getFilmDetailsBySlug(e) {
        return t.apiClientClient.get(
          `${r.API.GET_FILM_BY_SLUG.replace(r.API.BASE_URL, "")}${e}`
        );
      }
      async getBannerFilms() {
        return t.apiClientClient.get(
          r.API.BANNER_FILMS.replace(r.API.BASE_URL, "")
        );
      }
      async getPremiumFilms(e = 1, a = 10) {
        let i = new URLSearchParams({
          page: e.toString(),
          limit: a.toString(),
        });
        return t.apiClientClient.get(
          `${r.API.PREMIUM_FILMS.replace(r.API.BASE_URL, "")}?${i.toString()}`
        );
      }
      async getTopRatedFilms(e = 1, a = 10) {
        let i = new URLSearchParams({
          page: e.toString(),
          limit: a.toString(),
        });
        return t.apiClientClient.get(
          `${r.API.TOPRATED.replace(r.API.BASE_URL, "")}?${i.toString()}`
        );
      }
      async getLanguageFilms(e) {
        return t.apiClientClient.get(
          `${r.API.FOR_YOU.replace(r.API.BASE_URL, "")}/${e}`
        );
      }
      async getUpcomingFilms(e = 1, a = 10) {
        let i = new URLSearchParams({
          page: e.toString(),
          limit: a.toString(),
        });
        return t.apiClientClient.get(
          `${r.API.UPCOMING_FILMS.replace(r.API.BASE_URL, "")}?${i.toString()}`
        );
      }
      async getAwardedFilms(e = 1, a = 10) {
        let i = new URLSearchParams({
          page: e.toString(),
          limit: a.toString(),
        });
        return t.apiClientClient.get(
          `${r.API.AWARD_FILMS.replace(r.API.BASE_URL, "")}?${i.toString()}`
        );
      }
      async getMovies(e = 1, a = 12) {
        if (r.API.GET_MOVIES) {
          let i = new URLSearchParams({
              page: e.toString(),
              limit: a.toString(),
            }),
            l = await t.apiClientClient.get(
              `${r.API.GET_MOVIES.replace(r.API.BASE_URL, "")}?${i.toString()}`
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
        let i = await this.getFilms({ page: e, limit: 2 * a });
        if (i.status && i.payload?.docs) {
          let e = i.payload.docs.filter((e) => 1 === Number(e.media));
          return {
            ...i,
            payload: {
              docs: e.slice(0, a),
              total: i.payload.total || e.length,
              totalDocs: i.payload.total || e.length,
            },
          };
        }
        return i;
      }
      async getWebSeries(e = 1, a = 12) {
        if (r.API.WEB_SERIES) {
          let i = new URLSearchParams({
              page: e.toString(),
              limit: a.toString(),
            }),
            l = await t.apiClientClient.get(
              `${r.API.WEB_SERIES.replace(r.API.BASE_URL, "")}?${i.toString()}`
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
        let i = await this.getFilms({ page: e, limit: 2 * a });
        if (i.status && i.payload?.docs) {
          let e = i.payload.docs.filter((e) => 3 === Number(e.media));
          return {
            ...i,
            payload: {
              docs: e.slice(0, a),
              total: i.payload.total || e.length,
              totalDocs: i.payload.total || e.length,
            },
          };
        }
        return i;
      }
      async getFreeFilms(e = 1, a = 12, i = "FREE") {
        if (!r.API.GET_FREE_MOVIES)
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
            limit: a.toString(),
            releaseMode: i,
          }),
          s = await t.apiClientClient.get(
            `${r.API.GET_FREE_MOVIES.replace(
              r.API.BASE_URL,
              ""
            )}?${l.toString()}`
          );
        if (s.status) {
          let e = [],
            t = 0,
            r = s.data ?? s.payload;
          if (
            (Array.isArray(r)
              ? ((e = r), (t = r.length))
              : r &&
                "object" == typeof r &&
                Array.isArray(r.docs) &&
                ((e = r.docs), (t = r.total ?? r.totalDocs ?? e.length)),
            e.length > 0 || t > 0)
          )
            return {
              ...s,
              data: { docs: e, total: t, totalDocs: t },
              payload: { docs: e, total: t, totalDocs: t },
            };
        }
        return s;
      }
      async getFilmsByFilter(e = 1, a = 40, i, l, s = "all") {
        let n = new URLSearchParams({
            page: e.toString(),
            limit: a.toString(),
            filter: i,
            fields: l,
            sorttype: s,
          }),
          o = await t.apiClientClient.get(
            `${r.API.GET_FILMS.replace(r.API.BASE_URL, "")}?${n.toString()}`
          );
        return this.normalizeDocsResponse(o);
      }
      async getMoviesByFilter(e = 1, a = 40, i, l, s = "all") {
        if (!r.API.GET_MOVIES)
          return { success: !1, status: !1, error: { code: "NO_ENDPOINT" } };
        let n = new URLSearchParams({
            page: e.toString(),
            limit: a.toString(),
            filter: i,
            fields: l,
            sorttype: s,
          }),
          o = await t.apiClientClient.get(
            `${r.API.GET_MOVIES.replace(r.API.BASE_URL, "")}?${n.toString()}`
          );
        return this.normalizeDocsResponse(o);
      }
      normalizeDocsResponse(e) {
        if (e.status) {
          let t = [],
            r = 0;
          if (
            (e.data
              ? Array.isArray(e.data)
                ? ((t = e.data), (r = e.data.length))
                : "object" == typeof e.data &&
                  null !== e.data &&
                  Array.isArray(e.data.docs) &&
                  ((t = e.data.docs),
                  (r = e.data.total || e.data.totalDocs || t.length))
              : e.payload &&
                (Array.isArray(e.payload)
                  ? ((t = e.payload), (r = e.payload.length))
                  : "object" == typeof e.payload &&
                    null !== e.payload &&
                    ((t = e.payload.docs || []),
                    (r = e.payload.total || e.payload.totalDocs || t.length))),
            t.length > 0 || r > 0)
          )
            return {
              success: e.success,
              status: e.status,
              message: e.message,
              error: e.error,
              payload: { docs: t, total: r, totalDocs: r },
            };
        }
        return e;
      }
      async getFilmsByFilterOld(e = 1, a = 10, i, l, s) {
        let n = new URLSearchParams({
          page: e.toString(),
          limit: a.toString(),
          filter: i.toString(),
          fields: l,
        });
        return (
          s && n.append("sorttype", s),
          t.apiClientClient.get(
            `${r.API.GET_FILMS.replace(r.API.BASE_URL, "")}?${n.toString()}`
          )
        );
      }
      async getRelatedFilms(e = 1, a = 7, i, l) {
        let s = new URLSearchParams({
          page: e.toString(),
          limit: a.toString(),
          catid: i.toString(),
        });
        return (
          null == l || Number.isNaN(l) || s.set("regionid", l.toString()),
          t.apiClientClient.get(
            `${r.API.RELATED.replace(r.API.BASE_URL, "")}?${s.toString()}`
          )
        );
      }
      async getContinueWatchByEmail(e) {
        return t.apiClientClient.get(
          `${r.API.GET_CONT_WATCH.replace(r.API.BASE_URL, "")}${e}`
        );
      }
      async toggleLike(e) {
        return t.apiClientClient.post(
          r.API.TOGGLE_LIKE.replace(r.API.BASE_URL, ""),
          { filmId: e }
        );
      }
      async addToWatchlist(e) {
        return t.apiClientClient.post(r.API.LIKE.replace(r.API.BASE_URL, ""), {
          filmId: e,
          type: "WATCH",
        });
      }
      async removeFromWatchlist(e) {
        return t.apiClientClient.post(r.API.LIKE.replace(r.API.BASE_URL, ""), {
          filmId: e,
          type: "UNWATCH",
        });
      }
      async addToFavorites(e, a) {
        return t.apiClientClient.post(
          `${r.API.FAV_ADD.replace(r.API.BASE_URL, "")}${e}`,
          { userId: a }
        );
      }
      async getWatchlist(e, a = 1, i = 12) {
        return t.apiClientClient.get(
          `${r.API.GET_WATCHLIST.replace(
            r.API.BASE_URL,
            ""
          )}${e}?page=${a}&limit=${i}`
        );
      }
      async deleteWatchlist(e) {
        return t.apiClientClient.delete(
          r.API.DELETE_WATCHLIST.replace(r.API.BASE_URL, ""),
          { filmId: [e] }
        );
      }
    })();
    e.s(["filmServiceClient", 0, a]);
  },
  19306,
  (e) => {
    "use strict";
    var t = e.i(43476),
      r = e.i(71645),
      a = e.i(18566),
      i = e.i(22016),
      l = e.i(3303);
    function s({ clientId: e, onSuccess: a }) {
      let i = (0, r.useRef)(null),
        s = (0, r.useRef)(!1),
        [n, o] = (0, r.useState)(!1),
        [c, d] = (0, r.useState)(!1);
      (0, r.useEffect)(() => {
        window.google && (d(!0), s.current || p());
      }, [e]);
      let p = () => {
          if (!window.google) return;
          let t = window.google;
          if (t.accounts && t.accounts.id)
            try {
              t.accounts.id.initialize({ client_id: e, callback: g }),
                i.current &&
                  t.accounts.id.renderButton(i.current, {
                    type: "standard",
                    theme: "outline",
                    size: "large",
                    text: "sign_in_with",
                    shape: "rectangular",
                    logo_alignment: "left",
                  }),
                (s.current = !0);
            } catch (e) {
              console.error("Error initializing Google Sign In:", e), d(!1);
            }
        },
        g = (e) => {
          o(!1);
          try {
            let t = u(e.credential);
            if (t) {
              let e = {
                name: t.name,
                email: t.email,
                id: t.sub,
                photoUrl: t.picture,
                provider: "GOOGLE",
              };
              a(e);
            } else
              console.error("Invalid user data from Google JWT."),
                alert("Failed to parse Google login information.");
          } catch (e) {
            console.error("Error handling Google credential response:", e),
              alert("An error occurred during Google login."),
              o(!1);
          }
        },
        u = (e) => {
          try {
            let t = e.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"),
              r = decodeURIComponent(
                atob(t)
                  .split("")
                  .map(
                    (e) => "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
                  )
                  .join("")
              );
            return JSON.parse(r);
          } catch (e) {
            return console.error("Failed to parse JWT:", e), null;
          }
        };
      return (0, t.jsxs)(t.Fragment, {
        children: [
          (0, t.jsx)(l.default, {
            src: "https://accounts.google.com/gsi/client",
            strategy: "afterInteractive",
            onLoad: () => {
              d(!0), window.google && p();
            },
            onError: () => {
              console.error("Failed to load Google Identity Services script"),
                d(!1);
            },
          }),
          (0, t.jsx)("div", { ref: i, className: "hidden" }),
          (0, t.jsx)("button", {
            onClick: () => {
              if (!c)
                return void alert(
                  "Google Sign In is still loading. Please wait a moment and try again."
                );
              if (!window.google)
                return void alert(
                  "Google Sign In is not loaded. Please refresh the page."
                );
              let t = window.google;
              if (
                (!t.accounts || !t.accounts.id) &&
                (p(), !t.accounts || !t.accounts.id)
              )
                return void alert(
                  "Google Sign In is not initialized. Please refresh the page."
                );
              if ((o(!0), i.current)) {
                let e = i.current.querySelector('div[role="button"]');
                if (e) return void e.click();
              }
              t.accounts.id.prompt((t) => {
                (t.isNotDisplayed() || t.isSkippedMoment()) &&
                  (() => {
                    let t = window.google;
                    if (!t || !t.accounts || !t.accounts.id) return o(!1);
                    let r = document.createElement("div");
                    (r.style.position = "fixed"),
                      (r.style.top = "-9999px"),
                      (r.style.left = "-9999px"),
                      (r.style.opacity = "0"),
                      (r.style.pointerEvents = "none"),
                      document.body.appendChild(r);
                    try {
                      t.accounts.id.initialize({ client_id: e, callback: g }),
                        t.accounts.id.renderButton(r, {
                          type: "standard",
                          theme: "outline",
                          size: "large",
                          text: "sign_in_with",
                          shape: "rectangular",
                          logo_alignment: "left",
                        }),
                        setTimeout(() => {
                          let e = r.querySelector('div[role="button"]');
                          e && e.click(),
                            setTimeout(() => {
                              document.body.contains(r) &&
                                document.body.removeChild(r);
                            }, 1e3);
                        }, 200);
                    } catch (e) {
                      console.error("Error creating Google button:", e),
                        o(!1),
                        document.body.contains(r) &&
                          document.body.removeChild(r);
                    }
                  })();
              });
            },
            disabled: n || !c,
            className:
              "flex items-center justify-center bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg text-gray-800 text-sm font-medium w-full py-3 px-4 border border-gray-300 transition-colors min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed",
            children: n
              ? (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsxs)("svg", {
                      className: "animate-spin h-5 w-5 text-gray-600 mr-3",
                      fill: "none",
                      viewBox: "0 0 24 24",
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
              : c
              ? (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsxs)("svg", {
                      className: "w-5 h-5 mr-3",
                      viewBox: "0 0 24 24",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: [
                        (0, t.jsx)("path", {
                          fill: "#4285F4",
                          d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
                        }),
                        (0, t.jsx)("path", {
                          fill: "#34A853",
                          d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
                        }),
                        (0, t.jsx)("path", {
                          fill: "#FBBC05",
                          d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
                        }),
                        (0, t.jsx)("path", {
                          fill: "#EA4335",
                          d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
                        }),
                      ],
                    }),
                    "Sign in with Google",
                  ],
                })
              : (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsxs)("svg", {
                      className: "animate-spin h-5 w-5 text-gray-600 mr-3",
                      fill: "none",
                      viewBox: "0 0 24 24",
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
                    "Loading Google Sign In...",
                  ],
                }),
          }),
        ],
      });
    }
    function n({ appId: e, onSuccess: a }) {
      let i = () => {
        let e = "https:" === window.location.protocol,
          t =
            "localhost" === window.location.hostname ||
            "127.0.0.1" === window.location.hostname ||
            "0.0.0.0" === window.location.hostname;
        return e || !t;
      };
      (0, r.useEffect)(() => {
        window.FB && i() && s();
      }, []);
      let s = () => {
          if (!window.FB) return;
          if ("https:" !== window.location.protocol)
            return void console.warn(
              "Facebook SDK requires HTTPS. Skipping initialization on HTTP."
            );
          let t = window.FB;
          try {
            t.init({ appId: e, cookie: !0, xfbml: !0, version: "v18.0" });
          } catch (e) {
            console.warn(
              "Facebook SDK initialization error (requires HTTPS):",
              e
            );
          }
        },
        n = i();
      return (0, t.jsxs)(t.Fragment, {
        children: [
          n &&
            (0, t.jsx)(l.default, {
              src: "https://connect.facebook.net/en_US/sdk.js",
              strategy: "lazyOnload",
              onLoad: () => {
                window.FB && s();
              },
            }),
          (0, t.jsxs)("button", {
            onClick: () => {
              if (!window.FB)
                return void alert(
                  "Facebook SDK not loaded. Please refresh the page."
                );
              if ("https:" !== window.location.protocol)
                return void alert(
                  "Facebook login requires HTTPS. Please use HTTPS in production or test on a production URL."
                );
              let e = window.FB;
              try {
                e.login(
                  (t) => {
                    t.authResponse &&
                      e.api("/me", { fields: "name,email,picture" }, (e) => {
                        if (e && !e.error) {
                          let t = {
                            name: e.name,
                            email: e.email || "",
                            id: e.id,
                            photoUrl: e.picture?.data?.url || "",
                            provider: "FACEBOOK",
                          };
                          a(t);
                        } else
                          console.error(
                            "Error fetching Facebook user info:",
                            e
                          ),
                            alert(
                              "Failed to fetch user information from Facebook."
                            );
                      });
                  },
                  { scope: "email,public_profile" }
                );
              } catch (e) {
                console.error("Facebook login error:", e),
                  alert(
                    "Facebook login failed. Please try again or use HTTPS."
                  );
              }
            },
            className:
              "bg-[#1877F2] hover:bg-[#166FE5] focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg text-white text-sm font-medium w-full py-3 px-4 flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
            disabled: !n,
            title: n
              ? ""
              : "Facebook login requires HTTPS (not available on localhost HTTP)",
            children: [
              (0, t.jsx)("svg", {
                className: "w-5 h-5",
                fill: "currentColor",
                viewBox: "0 0 24 24",
                xmlns: "http://www.w3.org/2000/svg",
                children: (0, t.jsx)("path", {
                  d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                }),
              }),
              "Login with facebook",
            ],
          }),
        ],
      });
    }
    var o = e.i(65640),
      c = e.i(28351);
    let d = new (class {
      async getOTP(e) {
        return o.apiClientClient.post(
          c.API.GET_OTP.replace(c.API.BASE_URL, ""),
          e
        );
      }
      async login(e) {
        return o.apiClientClient.post(
          c.API.SIGNIN.replace(c.API.BASE_URL, ""),
          e
        );
      }
      async verifyOTP(e) {
        return o.apiClientClient.post(
          c.API.SIGNIN_VERIFICATION.replace(c.API.BASE_URL, ""),
          e
        );
      }
      async register(e, t) {
        let r = { ...e };
        if (t) {
          let e = t.trim();
          e && e.length >= 8 && (r.ref = e);
        }
        return (
          e.ref &&
            "string" == typeof e.ref &&
            e.ref.trim().length >= 8 &&
            (r.ref = e.ref.trim()),
          o.apiClientClient.post(c.API.SIGNUP.replace(c.API.BASE_URL, ""), r)
        );
      }
      async confirmEmail(e) {
        return o.apiClientClient.post(
          c.API.VERIFY_EMAIL.replace(c.API.BASE_URL, ""),
          e
        );
      }
      async forgotPassword(e) {
        return o.apiClientClient.post(
          c.API.FORGET_PASSWORD.replace(c.API.BASE_URL, ""),
          e
        );
      }
      async resetPassword(e, t) {
        return o.apiClientClient.post(
          c.API.RESET_PASSWORD.replace(c.API.BASE_URL, ""),
          e,
          { headers: { Authorization: `Bearer ${t}` } }
        );
      }
      async logout() {
        return o.apiClientClient.post(
          c.API.SIGNOUT.replace(c.API.BASE_URL, ""),
          null
        );
      }
    })();
    var p = e.i(49768),
      g = e.i(18542),
      u = e.i(72136),
      h = e.i(24871),
      m = e.i(3903),
      y = e.i(30792),
      f = e.i(83953),
      x = e.i(3349);
    function S(e) {
      if (!e) return !1;
      if (!0 === e.isSubscriptionActive) return !0;
      let t = e.subscription;
      if (t) {
        if ("Active" === t.active || "active" === t.active) return !0;
        if (
          t.subscriptionId &&
          "" !== t.subscriptionId &&
          (!0 === t.isPaid ||
            "true" === t.isPaid ||
            !0 === t.ispaid ||
            "true" === t.ispaid)
        ) {
          let e = t.expireDate ? new Date(t.expireDate) : null;
          if (!e || new Date() < e) return !0;
        }
      }
      return !1;
    }
    function w() {
      let l = (0, a.useRouter)(),
        o = (0, a.useSearchParams)(),
        { showToast: c } = (0, y.useToast)(),
        w = (0, h.readRedirectIntent)(o),
        A = o.get("ref") || "",
        [v, b] = (0, r.useState)(""),
        [I, P] = (0, r.useState)(!1),
        [C, E] = (0, r.useState)(!1),
        [j, R] = (0, r.useState)(""),
        [N, _] = (0, r.useState)(null),
        L = async (e) => {
          if (!(0, h.isMoviePath)(e) && !e.startsWith("/web-series/"))
            return !1;
          let t = e.split("/").pop()?.split("?")[0] || "";
          if (!t) return !1;
          try {
            let e = await g.filmServiceClient.getFilmDetailsBySlug(t),
              r = e?.data ?? e?.payload;
            if (!r) return !1;
            return "FREE" !== String(r.release_mode ?? "").toUpperCase();
          } catch {
            return !1;
          }
        };
      (0, r.useEffect)(() => {
        if ((0, u.isClientAuthenticated)()) {
          let e = (0, h.isValidRedirectPath)(w.redirectPath)
            ? w.redirectPath
            : "/";
          (0, h.safeNavigate)(l, e, { replace: !0 });
        }
      }, [l, w.redirectPath]),
        (0, r.useEffect)(() => {
          if (A) b(A), sessionStorage.setItem("referralCode", A);
          else if (1) {
            let e = sessionStorage.getItem("referralCode");
            e && b(e);
          }
        }, [A]);
      let F = async (e, t) => {
          try {
            let r = null;
            {
              let e = sessionStorage.getItem("referralCode");
              e && e.trim().length >= 8 && (r = e.trim());
            }
            !r &&
              v &&
              v.trim().length >= 8 &&
              ((r = v.trim()), sessionStorage.setItem("referralCode", r)),
              !r &&
                A &&
                A.trim().length >= 8 &&
                ((r = A.trim()), sessionStorage.setItem("referralCode", r));
            let a = {
              name: e.name,
              email: e.email,
              id: e.id,
              avatar: e.photoUrl || e.picture || "",
              provider: t,
              mobile: "",
              invitecode: "",
            };
            r && (a.ref = r);
            let i = await d.register(a, r || void 0);
            if (i.success && i.data) {
              let e,
                r = i.data,
                a = r.user || r,
                s = r.token || "";
              if ("string" == typeof a)
                try {
                  e = JSON.parse(a);
                } catch (e) {
                  console.error("Error parsing user data from API:", e),
                    alert("Invalid response from server. Please try again.");
                  return;
                }
              else e = a;
              (0, m.setCookie)("SF_TOKEN", s, { maxAge: 604800 }),
                (0, m.setCookie)("SF_VERIFICATION", e.verification || "", {
                  maxAge: 604800,
                }),
                (0, m.setCookie)("SF_USER", JSON.stringify(e), {
                  maxAge: 604800,
                }),
                (0, u.setClientAuth)(s, e.verification || "", e),
                sessionStorage.removeItem("referralCode"),
                (0, x.invalidateUserSessionCache)(),
                (0, f.emitEvent)("auth_changed", {
                  source: "signin_success",
                  provider: t,
                }),
                c("Login successful! Welcome back 👋", "success");
              let n = "/",
                o = w.redirectPath,
                d = "play" === w.actionType,
                g = "subscribe" === w.actionType,
                y =
                  d && ((0, h.isMoviePath)(o) || o.startsWith("/web-series/"));
              try {
                let t = await p.accountServiceClient.getProfile(),
                  r = t?.data ?? t?.payload ?? t,
                  a = r && "object" == typeof r && "email" in r ? S(r) : S(e);
                if (g) {
                  let e =
                    (0, h.isValidRedirectPath)(o) && "/subscription" !== o
                      ? o
                      : "/";
                  a
                    ? ((n = e), (0, h.clearRedirectIntent)())
                    : ((0, h.persistRedirectIntent)(e, "subscribe", !0),
                      (n = (0, h.buildSubscriptionUrl)(e, "subscribe", !0)));
                } else
                  y
                    ? (await L(o)) && !a
                      ? ((0, h.persistRedirectIntent)(o, "play", !0),
                        (n = (0, h.buildSubscriptionUrl)(o, "play", !0)))
                      : (0, h.isValidRedirectPath)(o) &&
                        ((n = o),
                        d && (0, h.markAutoPlayOnce)(),
                        (0, h.clearRedirectIntent)())
                    : a || "/subscription" !== o
                    ? (0, h.isValidRedirectPath)(o) &&
                      ((n = o), (0, h.clearRedirectIntent)())
                    : (n = "/subscription");
                (0, x.setUserSessionCache)({
                  isAuthenticated: !0,
                  hasSubscription: a,
                });
              } catch (e) {
                if (g) {
                  let e =
                    (0, h.isValidRedirectPath)(o) && "/subscription" !== o
                      ? o
                      : "/";
                  w.requiresSubscription
                    ? ((0, h.persistRedirectIntent)(e, "subscribe", !0),
                      (n = (0, h.buildSubscriptionUrl)(e, "subscribe", !0)))
                    : ((n = e), (0, h.clearRedirectIntent)());
                } else
                  y
                    ? (await L(o)) && w.requiresSubscription
                      ? ((0, h.persistRedirectIntent)(o, "play", !0),
                        (n = (0, h.buildSubscriptionUrl)(o, "play", !0)))
                      : (0, h.isValidRedirectPath)(o) &&
                        ((n = o),
                        d && (0, h.markAutoPlayOnce)(),
                        (0, h.clearRedirectIntent)())
                    : (0, h.isValidRedirectPath)(o) &&
                      ((n = o), (0, h.clearRedirectIntent)());
              }
              if ("function" == typeof l.prefetch)
                try {
                  l.prefetch(n),
                    n.startsWith("/subscription")
                      ? l.prefetch(w.redirectPath || "/")
                      : l.prefetch("/subscription");
                } catch {}
              (0, h.safeNavigate)(l, n, { replace: !0 }), l.refresh();
            } else
              console.error("Social login failed:", i),
                c(
                  i.error?.message || "Login failed. Please try again.",
                  "error"
                );
          } catch (e) {
            console.error("Social login error:", e),
              c("An error occurred during login. Please try again.", "error");
          }
        },
        B = async () => {
          if (!v || v.trim().length < 8) {
            R("Referral code must be at least 8 characters"), _(!1);
            return;
          }
          E(!0), _(null), R("Validating...");
          try {
            let { referralServiceClient: t } = await e.A(31183),
              r = await t.validateReferralCode(v.trim());
            (r.success || r.status) && r.data
              ? (_(!0),
                R(`Valid! Referred by ${r.data?.inviterName || "user"}`),
                sessionStorage.setItem("referralCode", v.trim()))
              : (_(!1), R(r.message || "Invalid referral code"));
          } catch (e) {
            console.error("Error validating referral code:", e),
              _(!1),
              R("Error validating code. Please try again.");
          } finally {
            E(!1);
          }
        };
      return (0, t.jsx)("div", {
        className:
          "bg-black min-h-screen flex items-center justify-center px-4 py-20",
        children: (0, t.jsxs)("div", {
          className: "w-full max-w-md",
          children: [
            (0, t.jsx)("div", {
              className: "mb-4 sm:mb-5",
              children: (0, t.jsxs)("button", {
                onClick: () => l.back(),
                className:
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-200 bg-white/10 hover:bg-white/15 border border-white/15 transition-all",
                "aria-label": "Back",
                children: [
                  (0, t.jsx)("svg", {
                    className: "w-4 h-4",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 2.5,
                    viewBox: "0 0 24 24",
                    children: (0, t.jsx)("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M15 19l-7-7 7-7",
                    }),
                  }),
                  (0, t.jsx)("span", { children: "Back" }),
                ],
              }),
            }),
            (0, t.jsxs)("div", {
              className:
                "bg-[#141414] rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/60",
              children: [
                (0, t.jsxs)("div", {
                  className: "text-center mb-8",
                  children: [
                    (0, t.jsxs)(i.default, {
                      href: "/",
                      className: "inline-flex items-center gap-2 mb-5",
                      children: [
                        (0, t.jsx)("img", {
                          src: "/assets/images/sf_circle_logo.svg",
                          alt: "Shortfundly",
                          className: "h-8 sm:h-9",
                        }),
                        (0, t.jsx)("span", {
                          className:
                            "text-white text-lg sm:text-xl font-bold tracking-tight",
                          children: "Shortfundly",
                        }),
                      ],
                    }),
                    (0, t.jsx)("h1", {
                      className:
                        "text-2xl sm:text-3xl font-bold text-white mb-2",
                      children: "Welcome back",
                    }),
                    (0, t.jsx)("p", {
                      className: "text-gray-400 text-sm",
                      children: "Sign in to continue watching",
                    }),
                  ],
                }),
                (0, t.jsxs)("div", {
                  className: "space-y-3 mb-6",
                  children: [
                    (0, t.jsx)(s, {
                      clientId:
                        "568557255165-861ideacgls3aq3lpoijuf5brla2rsp6.apps.googleusercontent.com",
                      onSuccess: (e) => F(e, "GOOGLE"),
                    }),
                    (0, t.jsx)(n, {
                      appId: "306339396497354",
                      onSuccess: (e) => F(e, "FACEBOOK"),
                    }),
                  ],
                }),
                (0, t.jsxs)("div", {
                  className: "flex items-center gap-3 mb-6",
                  children: [
                    (0, t.jsx)("div", { className: "flex-1 h-px bg-white/10" }),
                    (0, t.jsx)("span", {
                      className:
                        "text-xs text-gray-500 uppercase tracking-wider",
                      children: "Why sign in?",
                    }),
                    (0, t.jsx)("div", { className: "flex-1 h-px bg-white/10" }),
                  ],
                }),
                (0, t.jsxs)("div", {
                  className: "grid grid-cols-3 gap-3 mb-6",
                  children: [
                    (0, t.jsxs)("div", {
                      className: "text-center p-3 rounded-xl bg-white/[0.03]",
                      children: [
                        (0, t.jsx)("div", {
                          className:
                            "w-9 h-9 mx-auto mb-2 rounded-lg bg-red-500/10 flex items-center justify-center",
                          children: (0, t.jsx)("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "18",
                            height: "18",
                            fill: "#ef4444",
                            viewBox: "0 0 16 16",
                            children: (0, t.jsx)("path", {
                              d: "M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5",
                            }),
                          }),
                        }),
                        (0, t.jsx)("p", {
                          className: "text-[11px] text-gray-400 leading-tight",
                          children: "All devices",
                        }),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      className: "text-center p-3 rounded-xl bg-white/[0.03]",
                      children: [
                        (0, t.jsx)("div", {
                          className:
                            "w-9 h-9 mx-auto mb-2 rounded-lg bg-red-500/10 flex items-center justify-center",
                          children: (0, t.jsxs)("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "18",
                            height: "18",
                            fill: "#ef4444",
                            viewBox: "0 0 16 16",
                            children: [
                              (0, t.jsx)("path", {
                                d: "M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5",
                              }),
                              (0, t.jsx)("path", {
                                d: "M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z",
                              }),
                            ],
                          }),
                        }),
                        (0, t.jsx)("p", {
                          className: "text-[11px] text-gray-400 leading-tight",
                          children: "Download & watch",
                        }),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      className: "text-center p-3 rounded-xl bg-white/[0.03]",
                      children: [
                        (0, t.jsx)("div", {
                          className:
                            "w-9 h-9 mx-auto mb-2 rounded-lg bg-red-500/10 flex items-center justify-center",
                          children: (0, t.jsx)("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "18",
                            height: "18",
                            fill: "#ef4444",
                            viewBox: "0 0 16 16",
                            children: (0, t.jsx)("path", {
                              d: "M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2m6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z",
                            }),
                          }),
                        }),
                        (0, t.jsx)("p", {
                          className: "text-[11px] text-gray-400 leading-tight",
                          children: "Ad-free experience",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, t.jsxs)("div", {
                  className: "mb-5",
                  children: [
                    (0, t.jsxs)("button", {
                      type: "button",
                      onClick: () => P(!I),
                      className:
                        "w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] transition-colors cursor-pointer group",
                      children: [
                        (0, t.jsxs)("span", {
                          className:
                            "flex items-center gap-2.5 text-sm text-gray-400 group-hover:text-gray-300",
                          children: [
                            (0, t.jsx)("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "16",
                              height: "16",
                              fill: "currentColor",
                              viewBox: "0 0 16 16",
                              className: "text-gray-500",
                              children: (0, t.jsx)("path", {
                                d: "M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A3 3 0 0 1 3 2.506z",
                              }),
                            }),
                            "Have a referral code?",
                          ],
                        }),
                        (0, t.jsx)("svg", {
                          className: `w-4 h-4 text-gray-500 transition-transform ${
                            I ? "rotate-180" : ""
                          }`,
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          children: (0, t.jsx)("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M19 9l-7 7-7-7",
                          }),
                        }),
                      ],
                    }),
                    (I || v) &&
                      (0, t.jsxs)("div", {
                        className: "mt-3 space-y-2 px-1",
                        children: [
                          (0, t.jsxs)("div", {
                            className: "flex gap-2 items-center",
                            children: [
                              (0, t.jsxs)("div", {
                                className: "flex-1 relative",
                                children: [
                                  (0, t.jsx)("input", {
                                    id: "signin-referral-code",
                                    type: "text",
                                    value: v,
                                    onChange: (e) => {
                                      b(e.target.value), _(null), R("");
                                    },
                                    placeholder: "Enter referral code",
                                    className: `w-full px-4 py-2.5 bg-white/[0.06] rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 transition-all border ${
                                      !0 === N
                                        ? "border-green-500/50 focus:ring-green-500/30"
                                        : !1 === N
                                        ? "border-red-500/50 focus:ring-red-500/30"
                                        : "border-white/10 focus:ring-red-500/30"
                                    }`,
                                    maxLength: 20,
                                    onKeyDown: (e) => {
                                      "Enter" === e.key &&
                                        (e.preventDefault(), B());
                                    },
                                    disabled: C,
                                  }),
                                  null !== N &&
                                    !C &&
                                    (0, t.jsx)("div", {
                                      className:
                                        "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none",
                                      children: N
                                        ? (0, t.jsx)("svg", {
                                            className: "w-4 h-4 text-green-500",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: (0, t.jsx)("path", {
                                              strokeLinecap: "round",
                                              strokeLinejoin: "round",
                                              strokeWidth: 2,
                                              d: "M5 13l4 4L19 7",
                                            }),
                                          })
                                        : (0, t.jsx)("svg", {
                                            className: "w-4 h-4 text-red-500",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: (0, t.jsx)("path", {
                                              strokeLinecap: "round",
                                              strokeLinejoin: "round",
                                              strokeWidth: 2,
                                              d: "M6 18L18 6M6 6l12 12",
                                            }),
                                          }),
                                    }),
                                ],
                              }),
                              (0, t.jsx)("button", {
                                type: "button",
                                onClick: B,
                                disabled: C,
                                className:
                                  "bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0",
                                children: C ? "..." : "Apply",
                              }),
                            ],
                          }),
                          j &&
                            (0, t.jsx)("p", {
                              className: `text-xs px-1 ${
                                !0 === N
                                  ? "text-green-400"
                                  : !1 === N
                                  ? "text-red-400"
                                  : "text-gray-400"
                              }`,
                              children: j,
                            }),
                          !j &&
                            (0, t.jsx)("p", {
                              className: "text-[11px] text-gray-500 px-1",
                              children:
                                "Enter your friend's code to earn them a free premium month.",
                            }),
                        ],
                      }),
                  ],
                }),
                (0, t.jsxs)("div", {
                  className: "text-center pt-2 border-t border-white/5",
                  children: [
                    (0, t.jsxs)("p", {
                      className: "text-gray-500 text-[11px] leading-relaxed",
                      children: [
                        "By signing in you agree to our",
                        " ",
                        (0, t.jsx)(i.default, {
                          href: "/terms-and-conditions",
                          className:
                            "text-gray-400 hover:text-white transition-colors underline underline-offset-2",
                          children: "Terms",
                        }),
                        " ",
                        "and",
                        " ",
                        (0, t.jsx)(i.default, {
                          href: "/privacy-policy",
                          className:
                            "text-gray-400 hover:text-white transition-colors underline underline-offset-2",
                          children: "Privacy Policy",
                        }),
                      ],
                    }),
                    (0, t.jsx)("p", {
                      className: "text-gray-600 text-[10px] mt-1",
                      children: "Your watch history will sync on login.",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      });
    }
    e.s(["SignInForm", () => w], 19306);
  },
  31183,
  (e) => {
    e.v((t) =>
      Promise.all(
        ["static/chunks/c177a26e05f358f6.js"].map((t) => e.l(t))
      ).then(() => t(23353))
    );
  },
]);
