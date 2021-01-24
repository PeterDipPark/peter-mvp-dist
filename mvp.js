!function() {
    "use strict";
    function t(t) {
        return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
    }
    function e(t) {
        var e = {
            exports: {}
        };
        return t(e, e.exports), e.exports;
    }
    var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, s = [ "source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor" ], o = function(t) {
        var e = t, o = t.indexOf("["), r = t.indexOf("]");
        -1 != o && -1 != r && (t = t.substring(0, o) + t.substring(o, r).replace(/:/g, ";") + t.substring(r, t.length));
        for (var i, c, a = n.exec(t || ""), h = {}, p = 14; p--; ) h[s[p]] = a[p] || "";
        return -1 != o && -1 != r && (h.source = e, h.host = h.host.substring(1, h.host.length - 1).replace(/;/g, ":"), 
        h.authority = h.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), 
        h.ipv6uri = !0), h.pathNames = function(t, e) {
            var n = /\/{2,9}/g, s = e.replace(n, "/").split("/");
            "/" != e.substr(0, 1) && 0 !== e.length || s.splice(0, 1);
            "/" == e.substr(e.length - 1, 1) && s.splice(s.length - 1, 1);
            return s;
        }(0, h.path), h.queryKey = (i = h.query, c = {}, i.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, (function(t, e, n) {
            e && (c[e] = n);
        })), c), h;
    };
    var r = 1e3, i = 60 * r, c = 60 * i, a = 24 * c, h = 7 * a, p = 365.25 * a, u = function(t, e) {
        e = e || {};
        var n = typeof t;
        if ("string" === n && t.length > 0) return function(t) {
            if ((t = String(t)).length > 100) return;
            var e = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);
            if (!e) return;
            var n = parseFloat(e[1]);
            switch ((e[2] || "ms").toLowerCase()) {
              case "years":
              case "year":
              case "yrs":
              case "yr":
              case "y":
                return n * p;

              case "weeks":
              case "week":
              case "w":
                return n * h;

              case "days":
              case "day":
              case "d":
                return n * a;

              case "hours":
              case "hour":
              case "hrs":
              case "hr":
              case "h":
                return n * c;

              case "minutes":
              case "minute":
              case "mins":
              case "min":
              case "m":
                return n * i;

              case "seconds":
              case "second":
              case "secs":
              case "sec":
              case "s":
                return n * r;

              case "milliseconds":
              case "millisecond":
              case "msecs":
              case "msec":
              case "ms":
                return n;

              default:
                return;
            }
        }(t);
        if ("number" === n && isFinite(t)) return e.long ? function(t) {
            var e = Math.abs(t);
            if (e >= a) return l(t, e, a, "day");
            if (e >= c) return l(t, e, c, "hour");
            if (e >= i) return l(t, e, i, "minute");
            if (e >= r) return l(t, e, r, "second");
            return t + " ms";
        }(t) : function(t) {
            var e = Math.abs(t);
            if (e >= a) return Math.round(t / a) + "d";
            if (e >= c) return Math.round(t / c) + "h";
            if (e >= i) return Math.round(t / i) + "m";
            if (e >= r) return Math.round(t / r) + "s";
            return t + "ms";
        }(t);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(t));
    };
    function l(t, e, n, s) {
        var o = e >= 1.5 * n;
        return Math.round(t / n) + " " + s + (o ? "s" : "");
    }
    var d = function(t) {
        function e(t) {
            let s, o = null;
            function r(...t) {
                if (!r.enabled) return;
                const n = r, o = Number(new Date), i = o - (s || o);
                n.diff = i, n.prev = s, n.curr = o, s = o, t[0] = e.coerce(t[0]), "string" != typeof t[0] && t.unshift("%O");
                let c = 0;
                t[0] = t[0].replace(/%([a-zA-Z%])/g, ((s, o) => {
                    if ("%%" === s) return "%";
                    c++;
                    const r = e.formatters[o];
                    if ("function" == typeof r) {
                        const e = t[c];
                        s = r.call(n, e), t.splice(c, 1), c--;
                    }
                    return s;
                })), e.formatArgs.call(n, t);
                (n.log || e.log).apply(n, t);
            }
            return r.namespace = t, r.useColors = e.useColors(), r.color = e.selectColor(t), 
            r.extend = n, r.destroy = e.destroy, Object.defineProperty(r, "enabled", {
                enumerable: !0,
                configurable: !1,
                get: () => null === o ? e.enabled(t) : o,
                set: t => {
                    o = t;
                }
            }), "function" == typeof e.init && e.init(r), r;
        }
        function n(t, n) {
            const s = e(this.namespace + (void 0 === n ? ":" : n) + t);
            return s.log = this.log, s;
        }
        function s(t) {
            return t.toString().substring(2, t.toString().length - 2).replace(/\.\*\?$/, "*");
        }
        return e.debug = e, e.default = e, e.coerce = function(t) {
            if (t instanceof Error) return t.stack || t.message;
            return t;
        }, e.disable = function() {
            const t = [ ...e.names.map(s), ...e.skips.map(s).map((t => "-" + t)) ].join(",");
            return e.enable(""), t;
        }, e.enable = function(t) {
            let n;
            e.save(t), e.names = [], e.skips = [];
            const s = ("string" == typeof t ? t : "").split(/[\s,]+/), o = s.length;
            for (n = 0; n < o; n++) s[n] && ("-" === (t = s[n].replace(/\*/g, ".*?"))[0] ? e.skips.push(new RegExp("^" + t.substr(1) + "$")) : e.names.push(new RegExp("^" + t + "$")));
        }, e.enabled = function(t) {
            if ("*" === t[t.length - 1]) return !0;
            let n, s;
            for (n = 0, s = e.skips.length; n < s; n++) if (e.skips[n].test(t)) return !1;
            for (n = 0, s = e.names.length; n < s; n++) if (e.names[n].test(t)) return !0;
            return !1;
        }, e.humanize = u, e.destroy = function() {
            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }, Object.keys(t).forEach((n => {
            e[n] = t[n];
        })), e.names = [], e.skips = [], e.formatters = {}, e.selectColor = function(t) {
            let n = 0;
            for (let e = 0; e < t.length; e++) n = (n << 5) - n + t.charCodeAt(e), n |= 0;
            return e.colors[Math.abs(n) % e.colors.length];
        }, e.enable(e.load()), e;
    }, f = e((function(t, e) {
        e.formatArgs = function(e) {
            if (e[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + e[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff), 
            !this.useColors) return;
            const n = "color: " + this.color;
            e.splice(1, 0, n, "color: inherit");
            let s = 0, o = 0;
            e[0].replace(/%[a-zA-Z%]/g, (t => {
                "%%" !== t && (s++, "%c" === t && (o = s));
            })), e.splice(o, 0, n);
        }, e.save = function(t) {
            try {
                t ? e.storage.setItem("debug", t) : e.storage.removeItem("debug");
            } catch (n) {}
        }, e.load = function() {
            let t;
            try {
                t = e.storage.getItem("debug");
            } catch (n) {}
            !t && "undefined" != typeof process && "env" in process && (t = process.env.DEBUG);
            return t;
        }, e.useColors = function() {
            if ("undefined" != typeof window && window.process && ("renderer" === window.process.type || window.process.__nwjs)) return !0;
            if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
            return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
        }, e.storage = function() {
            try {
                return localStorage;
            } catch (t) {}
        }(), e.destroy = (() => {
            let t = !1;
            return () => {
                t || (t = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
            };
        })(), e.colors = [ "#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33" ], 
        e.log = console.debug || console.log || (() => {}), t.exports = d(e);
        const {formatters: n} = t.exports;
        n.j = function(t) {
            try {
                return JSON.stringify(t);
            } catch (e) {
                return "[UnexpectedJSONParseError]: " + e.message;
            }
        };
    })), y = e((function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.url = void 0;
        const n = f("socket.io-client:url");
        e.url = function(t, e) {
            let s = t;
            e = e || "undefined" != typeof location && location, null == t && (t = e.protocol + "//" + e.host), 
            "string" == typeof t && ("/" === t.charAt(0) && (t = "/" === t.charAt(1) ? e.protocol + t : e.host + t), 
            /^(https?|wss?):\/\//.test(t) || (n("protocol-less url %s", t), t = void 0 !== e ? e.protocol + "//" + t : "https://" + t), 
            n("parse %s", t), s = o(t)), s.port || (/^(http|ws)$/.test(s.protocol) ? s.port = "80" : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")), 
            s.path = s.path || "/";
            const r = -1 !== s.host.indexOf(":") ? "[" + s.host + "]" : s.host;
            return s.id = s.protocol + "://" + r + ":" + s.port, s.href = s.protocol + "://" + r + (e && e.port === s.port ? "" : ":" + s.port), 
            s;
        };
    })), m = e((function(t) {
        try {
            t.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest;
        } catch (e) {
            t.exports = !1;
        }
    })), g = "undefined" != typeof self ? self : "undefined" != typeof window ? window : Function("return this")(), b = function(t) {
        const e = t.xdomain, n = t.xscheme, s = t.enablesXDR;
        try {
            if ("undefined" != typeof XMLHttpRequest && (!e || m)) return new XMLHttpRequest;
        } catch (o) {}
        try {
            if ("undefined" != typeof XDomainRequest && !n && s) return new XDomainRequest;
        } catch (o) {}
        if (!e) try {
            return new (g[[ "Active" ].concat("Object").join("X")])("Microsoft.XMLHTTP");
        } catch (o) {}
    };
    const C = Object.create(null);
    C.open = "0", C.close = "1", C.ping = "2", C.pong = "3", C.message = "4", C.upgrade = "5", 
    C.noop = "6";
    const k = Object.create(null);
    Object.keys(C).forEach((t => {
        k[C[t]] = t;
    }));
    var w = {
        PACKET_TYPES: C,
        PACKET_TYPES_REVERSE: k,
        ERROR_PACKET: {
            type: "error",
            data: "parser error"
        }
    };
    const {PACKET_TYPES: v} = w, E = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === Object.prototype.toString.call(Blob), _ = "function" == typeof ArrayBuffer, A = (t, e) => {
        const n = new FileReader;
        return n.onload = function() {
            const t = n.result.split(",")[1];
            e("b" + t);
        }, n.readAsDataURL(t);
    };
    var T = ({type: t, data: e}, n, s) => {
        return E && e instanceof Blob ? n ? s(e) : A(e, s) : _ && (e instanceof ArrayBuffer || (o = e, 
        "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(o) : o && o.buffer instanceof ArrayBuffer)) ? n ? s(e instanceof ArrayBuffer ? e : e.buffer) : A(new Blob([ e ]), s) : s(v[t] + (e || ""));
        var o;
    }, x = e((function(t, e) {
        var n;
        n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", e.encode = function(t) {
            var e, s = new Uint8Array(t), o = s.length, r = "";
            for (e = 0; e < o; e += 3) r += n[s[e] >> 2], r += n[(3 & s[e]) << 4 | s[e + 1] >> 4], 
            r += n[(15 & s[e + 1]) << 2 | s[e + 2] >> 6], r += n[63 & s[e + 2]];
            return o % 3 == 2 ? r = r.substring(0, r.length - 1) + "=" : o % 3 == 1 && (r = r.substring(0, r.length - 2) + "=="), 
            r;
        }, e.decode = function(t) {
            var e, s, o, r, i, c = .75 * t.length, a = t.length, h = 0;
            "=" === t[t.length - 1] && (c--, "=" === t[t.length - 2] && c--);
            var p = new ArrayBuffer(c), u = new Uint8Array(p);
            for (e = 0; e < a; e += 4) s = n.indexOf(t[e]), o = n.indexOf(t[e + 1]), r = n.indexOf(t[e + 2]), 
            i = n.indexOf(t[e + 3]), u[h++] = s << 2 | o >> 4, u[h++] = (15 & o) << 4 | r >> 2, 
            u[h++] = (3 & r) << 6 | 63 & i;
            return p;
        };
    }));
    const {PACKET_TYPES_REVERSE: S, ERROR_PACKET: B} = w;
    let O;
    "function" == typeof ArrayBuffer && (O = x);
    const P = (t, e) => {
        if (O) {
            const n = O.decode(t);
            return N(n, e);
        }
        return {
            base64: !0,
            data: t
        };
    }, N = (t, e) => {
        switch (e) {
          case "blob":
            return t instanceof ArrayBuffer ? new Blob([ t ]) : t;

          case "arraybuffer":
          default:
            return t;
        }
    };
    var R = (t, e) => {
        if ("string" != typeof t) return {
            type: "message",
            data: N(t, e)
        };
        const n = t.charAt(0);
        if ("b" === n) return {
            type: "message",
            data: P(t.substring(1), e)
        };
        return S[n] ? t.length > 1 ? {
            type: S[n],
            data: t.substring(1)
        } : {
            type: S[n]
        } : B;
    };
    const F = String.fromCharCode(30);
    var j = {
        protocol: 4,
        encodePacket: T,
        encodePayload: (t, e) => {
            const n = t.length, s = new Array(n);
            let o = 0;
            t.forEach(((t, r) => {
                T(t, !1, (t => {
                    s[r] = t, ++o === n && e(s.join(F));
                }));
            }));
        },
        decodePacket: R,
        decodePayload: (t, e) => {
            const n = t.split(F), s = [];
            for (let o = 0; o < n.length; o++) {
                const t = R(n[o], e);
                if (s.push(t), "error" === t.type) break;
            }
            return s;
        }
    }, L = e((function(t) {
        function e(t) {
            if (t) return function(t) {
                for (var n in e.prototype) t[n] = e.prototype[n];
                return t;
            }(t);
        }
        t.exports = e, e.prototype.on = e.prototype.addEventListener = function(t, e) {
            return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), 
            this;
        }, e.prototype.once = function(t, e) {
            function n() {
                this.off(t, n), e.apply(this, arguments);
            }
            return n.fn = e, this.on(t, n), this;
        }, e.prototype.off = e.prototype.removeListener = e.prototype.removeAllListeners = e.prototype.removeEventListener = function(t, e) {
            if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, 
            this;
            var n, s = this._callbacks["$" + t];
            if (!s) return this;
            if (1 == arguments.length) return delete this._callbacks["$" + t], this;
            for (var o = 0; o < s.length; o++) if ((n = s[o]) === e || n.fn === e) {
                s.splice(o, 1);
                break;
            }
            return 0 === s.length && delete this._callbacks["$" + t], this;
        }, e.prototype.emit = function(t) {
            this._callbacks = this._callbacks || {};
            for (var e = new Array(arguments.length - 1), n = this._callbacks["$" + t], s = 1; s < arguments.length; s++) e[s - 1] = arguments[s];
            if (n) {
                s = 0;
                for (var o = (n = n.slice(0)).length; s < o; ++s) n[s].apply(this, e);
            }
            return this;
        }, e.prototype.listeners = function(t) {
            return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || [];
        }, e.prototype.hasListeners = function(t) {
            return !!this.listeners(t).length;
        };
    }));
    var D, I = class extends L {
        constructor(t) {
            super(), this.opts = t, this.query = t.query, this.readyState = "", this.socket = t.socket;
        }
        onError(t, e) {
            const n = new Error(t);
            return n.type = "TransportError", n.description = e, this.emit("error", n), this;
        }
        open() {
            return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", 
            this.doOpen()), this;
        }
        close() {
            return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), 
            this.onClose()), this;
        }
        send(t) {
            if ("open" !== this.readyState) throw new Error("Transport not open");
            this.write(t);
        }
        onOpen() {
            this.readyState = "open", this.writable = !0, this.emit("open");
        }
        onData(t) {
            const e = j.decodePacket(t, this.socket.binaryType);
            this.onPacket(e);
        }
        onPacket(t) {
            this.emit("packet", t);
        }
        onClose() {
            this.readyState = "closed", this.emit("close");
        }
    }, M = function(t) {
        var e = "";
        for (var n in t) t.hasOwnProperty(n) && (e.length && (e += "&"), e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
        return e;
    }, q = function(t) {
        for (var e = {}, n = t.split("&"), s = 0, o = n.length; s < o; s++) {
            var r = n[s].split("=");
            e[decodeURIComponent(r[0])] = decodeURIComponent(r[1]);
        }
        return e;
    }, V = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), K = {}, Y = 0, U = 0;
    function H(t) {
        var e = "";
        do {
            e = V[t % 64] + e, t = Math.floor(t / 64);
        } while (t > 0);
        return e;
    }
    function z() {
        var t = H(+new Date);
        return t !== D ? (Y = 0, D = t) : t + "." + H(Y++);
    }
    for (;U < 64; U++) K[V[U]] = U;
    z.encode = H, z.decode = function(t) {
        var e = 0;
        for (U = 0; U < t.length; U++) e = 64 * e + K[t.charAt(U)];
        return e;
    };
    var W = z;
    const X = f("engine.io-client:polling");
    var $ = class extends I {
        get name() {
            return "polling";
        }
        doOpen() {
            this.poll();
        }
        pause(t) {
            const e = this;
            function n() {
                X("paused"), e.readyState = "paused", t();
            }
            if (this.readyState = "pausing", this.polling || !this.writable) {
                let t = 0;
                this.polling && (X("we are currently polling - waiting to pause"), t++, this.once("pollComplete", (function() {
                    X("pre-pause polling complete"), --t || n();
                }))), this.writable || (X("we are currently writing - waiting to pause"), t++, this.once("drain", (function() {
                    X("pre-pause writing complete"), --t || n();
                })));
            } else n();
        }
        poll() {
            X("polling"), this.polling = !0, this.doPoll(), this.emit("poll");
        }
        onData(t) {
            const e = this;
            X("polling got data %s", t);
            j.decodePayload(t, this.socket.binaryType).forEach((function(t, n, s) {
                if ("opening" === e.readyState && "open" === t.type && e.onOpen(), "close" === t.type) return e.onClose(), 
                !1;
                e.onPacket(t);
            })), "closed" !== this.readyState && (this.polling = !1, this.emit("pollComplete"), 
            "open" === this.readyState ? this.poll() : X('ignoring poll - transport state "%s"', this.readyState));
        }
        doClose() {
            const t = this;
            function e() {
                X("writing close packet"), t.write([ {
                    type: "close"
                } ]);
            }
            "open" === this.readyState ? (X("transport open - closing"), e()) : (X("transport not open - deferring close"), 
            this.once("open", e));
        }
        write(t) {
            this.writable = !1, j.encodePayload(t, (t => {
                this.doWrite(t, (() => {
                    this.writable = !0, this.emit("drain");
                }));
            }));
        }
        uri() {
            let t = this.query || {};
            const e = this.opts.secure ? "https" : "http";
            let n = "";
            !1 !== this.opts.timestampRequests && (t[this.opts.timestampParam] = W()), this.supportsBinary || t.sid || (t.b64 = 1), 
            t = M(t), this.opts.port && ("https" === e && 443 !== Number(this.opts.port) || "http" === e && 80 !== Number(this.opts.port)) && (n = ":" + this.opts.port), 
            t.length && (t = "?" + t);
            return e + "://" + (-1 !== this.opts.hostname.indexOf(":") ? "[" + this.opts.hostname + "]" : this.opts.hostname) + n + this.opts.path + t;
        }
    }, J = {
        pick: (t, ...e) => e.reduce(((e, n) => (t.hasOwnProperty(n) && (e[n] = t[n]), e)), {})
    };
    const {pick: G} = J, Z = f("engine.io-client:polling-xhr");
    function Q() {}
    const tt = null != new b({
        xdomain: !1
    }).responseType;
    class et extends L {
        constructor(t, e) {
            super(), this.opts = e, this.method = e.method || "GET", this.uri = t, this.async = !1 !== e.async, 
            this.data = void 0 !== e.data ? e.data : null, this.create();
        }
        create() {
            const t = G(this.opts, "agent", "enablesXDR", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized");
            t.xdomain = !!this.opts.xd, t.xscheme = !!this.opts.xs;
            const e = this.xhr = new b(t), n = this;
            try {
                Z("xhr open %s: %s", this.method, this.uri), e.open(this.method, this.uri, this.async);
                try {
                    if (this.opts.extraHeaders) {
                        e.setDisableHeaderCheck && e.setDisableHeaderCheck(!0);
                        for (let t in this.opts.extraHeaders) this.opts.extraHeaders.hasOwnProperty(t) && e.setRequestHeader(t, this.opts.extraHeaders[t]);
                    }
                } catch (s) {}
                if ("POST" === this.method) try {
                    e.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
                } catch (s) {}
                try {
                    e.setRequestHeader("Accept", "*/*");
                } catch (s) {}
                "withCredentials" in e && (e.withCredentials = this.opts.withCredentials), this.opts.requestTimeout && (e.timeout = this.opts.requestTimeout), 
                this.hasXDR() ? (e.onload = function() {
                    n.onLoad();
                }, e.onerror = function() {
                    n.onError(e.responseText);
                }) : e.onreadystatechange = function() {
                    4 === e.readyState && (200 === e.status || 1223 === e.status ? n.onLoad() : setTimeout((function() {
                        n.onError("number" == typeof e.status ? e.status : 0);
                    }), 0));
                }, Z("xhr data %s", this.data), e.send(this.data);
            } catch (s) {
                return void setTimeout((function() {
                    n.onError(s);
                }), 0);
            }
            "undefined" != typeof document && (this.index = et.requestsCount++, et.requests[this.index] = this);
        }
        onSuccess() {
            this.emit("success"), this.cleanup();
        }
        onData(t) {
            this.emit("data", t), this.onSuccess();
        }
        onError(t) {
            this.emit("error", t), this.cleanup(!0);
        }
        cleanup(t) {
            if (void 0 !== this.xhr && null !== this.xhr) {
                if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = Q : this.xhr.onreadystatechange = Q, 
                t) try {
                    this.xhr.abort();
                } catch (e) {}
                "undefined" != typeof document && delete et.requests[this.index], this.xhr = null;
            }
        }
        onLoad() {
            const t = this.xhr.responseText;
            null !== t && this.onData(t);
        }
        hasXDR() {
            return "undefined" != typeof XDomainRequest && !this.xs && this.enablesXDR;
        }
        abort() {
            this.cleanup();
        }
    }
    if (et.requestsCount = 0, et.requests = {}, "undefined" != typeof document) if ("function" == typeof attachEvent) attachEvent("onunload", nt); else if ("function" == typeof addEventListener) {
        addEventListener("onpagehide" in g ? "pagehide" : "unload", nt, !1);
    }
    function nt() {
        for (let t in et.requests) et.requests.hasOwnProperty(t) && et.requests[t].abort();
    }
    var st = class extends $ {
        constructor(t) {
            if (super(t), "undefined" != typeof location) {
                const e = "https:" === location.protocol;
                let n = location.port;
                n || (n = e ? 443 : 80), this.xd = "undefined" != typeof location && t.hostname !== location.hostname || n !== t.port, 
                this.xs = t.secure !== e;
            }
            const e = t && t.forceBase64;
            this.supportsBinary = tt && !e;
        }
        request(t = {}) {
            return Object.assign(t, {
                xd: this.xd,
                xs: this.xs
            }, this.opts), new et(this.uri(), t);
        }
        doWrite(t, e) {
            const n = this.request({
                method: "POST",
                data: t
            }), s = this;
            n.on("success", e), n.on("error", (function(t) {
                s.onError("xhr post error", t);
            }));
        }
        doPoll() {
            Z("xhr poll");
            const t = this.request(), e = this;
            t.on("data", (function(t) {
                e.onData(t);
            })), t.on("error", (function(t) {
                e.onError("xhr poll error", t);
            })), this.pollXhr = t;
        }
    }, ot = et;
    st.Request = ot;
    const rt = /\n/g, it = /\\n/g;
    let ct;
    function at() {}
    var ht = class extends $ {
        constructor(t) {
            super(t), this.query = this.query || {}, ct || (ct = g.___eio = g.___eio || []), 
            this.index = ct.length;
            const e = this;
            ct.push((function(t) {
                e.onData(t);
            })), this.query.j = this.index, "function" == typeof addEventListener && addEventListener("beforeunload", (function() {
                e.script && (e.script.onerror = at);
            }), !1);
        }
        get supportsBinary() {
            return !1;
        }
        doClose() {
            this.script && (this.script.parentNode.removeChild(this.script), this.script = null), 
            this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), 
            super.doClose();
        }
        doPoll() {
            const t = this, e = document.createElement("script");
            this.script && (this.script.parentNode.removeChild(this.script), this.script = null), 
            e.async = !0, e.src = this.uri(), e.onerror = function(e) {
                t.onError("jsonp poll error", e);
            };
            const n = document.getElementsByTagName("script")[0];
            n ? n.parentNode.insertBefore(e, n) : (document.head || document.body).appendChild(e), 
            this.script = e;
            "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout((function() {
                const t = document.createElement("iframe");
                document.body.appendChild(t), document.body.removeChild(t);
            }), 100);
        }
        doWrite(t, e) {
            const n = this;
            let s;
            if (!this.form) {
                const t = document.createElement("form"), e = document.createElement("textarea"), n = this.iframeId = "eio_iframe_" + this.index;
                t.className = "socketio", t.style.position = "absolute", t.style.top = "-1000px", 
                t.style.left = "-1000px", t.target = n, t.method = "POST", t.setAttribute("accept-charset", "utf-8"), 
                e.name = "d", t.appendChild(e), document.body.appendChild(t), this.form = t, this.area = e;
            }
            function o() {
                r(), e();
            }
            function r() {
                if (n.iframe) try {
                    n.form.removeChild(n.iframe);
                } catch (t) {
                    n.onError("jsonp polling iframe removal error", t);
                }
                try {
                    const t = '<iframe src="javascript:0" name="' + n.iframeId + '">';
                    s = document.createElement(t);
                } catch (t) {
                    s = document.createElement("iframe"), s.name = n.iframeId, s.src = "javascript:0";
                }
                s.id = n.iframeId, n.form.appendChild(s), n.iframe = s;
            }
            this.form.action = this.uri(), r(), t = t.replace(it, "\\\n"), this.area.value = t.replace(rt, "\\n");
            try {
                this.form.submit();
            } catch (i) {}
            this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
                "complete" === n.iframe.readyState && o();
            } : this.iframe.onload = o;
        }
    }, pt = {
        WebSocket: g.WebSocket || g.MozWebSocket,
        usingBrowserWebSocket: !0,
        defaultBinaryType: "arraybuffer"
    };
    const {pick: ut} = J, {WebSocket: lt, usingBrowserWebSocket: dt, defaultBinaryType: ft} = pt, yt = f("engine.io-client:websocket"), mt = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase();
    class gt extends I {
        constructor(t) {
            super(t), this.supportsBinary = !t.forceBase64;
        }
        get name() {
            return "websocket";
        }
        doOpen() {
            if (!this.check()) return;
            const t = this.uri(), e = this.opts.protocols, n = mt ? {} : ut(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
            this.opts.extraHeaders && (n.headers = this.opts.extraHeaders);
            try {
                this.ws = dt && !mt ? e ? new lt(t, e) : new lt(t) : new lt(t, e, n);
            } catch (s) {
                return this.emit("error", s);
            }
            this.ws.binaryType = this.socket.binaryType || ft, this.addEventListeners();
        }
        addEventListeners() {
            const t = this;
            this.ws.onopen = function() {
                t.onOpen();
            }, this.ws.onclose = function() {
                t.onClose();
            }, this.ws.onmessage = function(e) {
                t.onData(e.data);
            }, this.ws.onerror = function(e) {
                t.onError("websocket error", e);
            };
        }
        write(t) {
            const e = this;
            this.writable = !1;
            let n = t.length, s = 0;
            const o = n;
            for (;s < o; s++) !function(t) {
                j.encodePacket(t, e.supportsBinary, (function(s) {
                    const o = {};
                    if (!dt && (t.options && (o.compress = t.options.compress), e.opts.perMessageDeflate)) {
                        ("string" == typeof s ? Buffer.byteLength(s) : s.length) < e.opts.perMessageDeflate.threshold && (o.compress = !1);
                    }
                    try {
                        dt ? e.ws.send(s) : e.ws.send(s, o);
                    } catch (i) {
                        yt("websocket closed before onclose event");
                    }
                    --n || r();
                }));
            }(t[s]);
            function r() {
                e.emit("flush"), setTimeout((function() {
                    e.writable = !0, e.emit("drain");
                }), 0);
            }
        }
        onClose() {
            I.prototype.onClose.call(this);
        }
        doClose() {
            void 0 !== this.ws && this.ws.close();
        }
        uri() {
            let t = this.query || {};
            const e = this.opts.secure ? "wss" : "ws";
            let n = "";
            this.opts.port && ("wss" === e && 443 !== Number(this.opts.port) || "ws" === e && 80 !== Number(this.opts.port)) && (n = ":" + this.opts.port), 
            this.opts.timestampRequests && (t[this.opts.timestampParam] = W()), this.supportsBinary || (t.b64 = 1), 
            t = M(t), t.length && (t = "?" + t);
            return e + "://" + (-1 !== this.opts.hostname.indexOf(":") ? "[" + this.opts.hostname + "]" : this.opts.hostname) + n + this.opts.path + t;
        }
        check() {
            return !(!lt || "__initialize" in lt && this.name === gt.prototype.name);
        }
    }
    var bt = {
        polling: function(t) {
            let e, n = !1, s = !1;
            const o = !1 !== t.jsonp;
            if ("undefined" != typeof location) {
                const e = "https:" === location.protocol;
                let o = location.port;
                o || (o = e ? 443 : 80), n = t.hostname !== location.hostname || o !== t.port, s = t.secure !== e;
            }
            if (t.xdomain = n, t.xscheme = s, e = new b(t), "open" in e && !t.forceJSONP) return new st(t);
            if (!o) throw new Error("JSONP disabled");
            return new ht(t);
        },
        websocket: gt
    };
    const Ct = f("engine.io-client:socket");
    class kt extends L {
        constructor(t, e = {}) {
            super(), t && "object" == typeof t && (e = t, t = null), t ? (t = o(t), e.hostname = t.host, 
            e.secure = "https" === t.protocol || "wss" === t.protocol, e.port = t.port, t.query && (e.query = t.query)) : e.host && (e.hostname = o(e.host).host), 
            this.secure = null != e.secure ? e.secure : "undefined" != typeof location && "https:" === location.protocol, 
            e.hostname && !e.port && (e.port = this.secure ? "443" : "80"), this.hostname = e.hostname || ("undefined" != typeof location ? location.hostname : "localhost"), 
            this.port = e.port || ("undefined" != typeof location && location.port ? location.port : this.secure ? 443 : 80), 
            this.transports = e.transports || [ "polling", "websocket" ], this.readyState = "", 
            this.writeBuffer = [], this.prevBufferLen = 0, this.opts = Object.assign({
                path: "/engine.io",
                agent: !1,
                withCredentials: !1,
                upgrade: !0,
                jsonp: !0,
                timestampParam: "t",
                rememberUpgrade: !1,
                rejectUnauthorized: !0,
                perMessageDeflate: {
                    threshold: 1024
                },
                transportOptions: {}
            }, e), this.opts.path = this.opts.path.replace(/\/$/, "") + "/", "string" == typeof this.opts.query && (this.opts.query = q(this.opts.query)), 
            this.id = null, this.upgrades = null, this.pingInterval = null, this.pingTimeout = null, 
            this.pingTimeoutTimer = null, this.open();
        }
        createTransport(t) {
            Ct('creating transport "%s"', t);
            const e = function(t) {
                const e = {};
                for (let n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                return e;
            }(this.opts.query);
            e.EIO = j.protocol, e.transport = t, this.id && (e.sid = this.id);
            const n = Object.assign({}, this.opts.transportOptions[t], this.opts, {
                query: e,
                socket: this,
                hostname: this.hostname,
                secure: this.secure,
                port: this.port
            });
            return Ct("options: %j", n), new bt[t](n);
        }
        open() {
            let t;
            if (this.opts.rememberUpgrade && kt.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) t = "websocket"; else {
                if (0 === this.transports.length) {
                    const t = this;
                    return void setTimeout((function() {
                        t.emit("error", "No transports available");
                    }), 0);
                }
                t = this.transports[0];
            }
            this.readyState = "opening";
            try {
                t = this.createTransport(t);
            } catch (e) {
                return Ct("error while creating transport: %s", e), this.transports.shift(), void this.open();
            }
            t.open(), this.setTransport(t);
        }
        setTransport(t) {
            Ct("setting transport %s", t.name);
            const e = this;
            this.transport && (Ct("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), 
            this.transport = t, t.on("drain", (function() {
                e.onDrain();
            })).on("packet", (function(t) {
                e.onPacket(t);
            })).on("error", (function(t) {
                e.onError(t);
            })).on("close", (function() {
                e.onClose("transport close");
            }));
        }
        probe(t) {
            Ct('probing transport "%s"', t);
            let e = this.createTransport(t, {
                probe: 1
            }), n = !1;
            const s = this;
            function o() {
                if (s.onlyBinaryUpgrades) {
                    const t = !this.supportsBinary && s.transport.supportsBinary;
                    n = n || t;
                }
                n || (Ct('probe transport "%s" opened', t), e.send([ {
                    type: "ping",
                    data: "probe"
                } ]), e.once("packet", (function(o) {
                    if (!n) if ("pong" === o.type && "probe" === o.data) {
                        if (Ct('probe transport "%s" pong', t), s.upgrading = !0, s.emit("upgrading", e), 
                        !e) return;
                        kt.priorWebsocketSuccess = "websocket" === e.name, Ct('pausing current transport "%s"', s.transport.name), 
                        s.transport.pause((function() {
                            n || "closed" !== s.readyState && (Ct("changing transport and sending upgrade packet"), 
                            p(), s.setTransport(e), e.send([ {
                                type: "upgrade"
                            } ]), s.emit("upgrade", e), e = null, s.upgrading = !1, s.flush());
                        }));
                    } else {
                        Ct('probe transport "%s" failed', t);
                        const n = new Error("probe error");
                        n.transport = e.name, s.emit("upgradeError", n);
                    }
                })));
            }
            function r() {
                n || (n = !0, p(), e.close(), e = null);
            }
            function i(n) {
                const o = new Error("probe error: " + n);
                o.transport = e.name, r(), Ct('probe transport "%s" failed because of error: %s', t, n), 
                s.emit("upgradeError", o);
            }
            function c() {
                i("transport closed");
            }
            function a() {
                i("socket closed");
            }
            function h(t) {
                e && t.name !== e.name && (Ct('"%s" works - aborting "%s"', t.name, e.name), r());
            }
            function p() {
                e.removeListener("open", o), e.removeListener("error", i), e.removeListener("close", c), 
                s.removeListener("close", a), s.removeListener("upgrading", h);
            }
            kt.priorWebsocketSuccess = !1, e.once("open", o), e.once("error", i), e.once("close", c), 
            this.once("close", a), this.once("upgrading", h), e.open();
        }
        onOpen() {
            if (Ct("socket open"), this.readyState = "open", kt.priorWebsocketSuccess = "websocket" === this.transport.name, 
            this.emit("open"), this.flush(), "open" === this.readyState && this.opts.upgrade && this.transport.pause) {
                Ct("starting upgrade probes");
                let t = 0;
                const e = this.upgrades.length;
                for (;t < e; t++) this.probe(this.upgrades[t]);
            }
        }
        onPacket(t) {
            if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (Ct('socket receive: type "%s", data "%s"', t.type, t.data), 
            this.emit("packet", t), this.emit("heartbeat"), t.type) {
              case "open":
                this.onHandshake(JSON.parse(t.data));
                break;

              case "ping":
                this.resetPingTimeout(), this.sendPacket("pong"), this.emit("pong");
                break;

              case "error":
                const e = new Error("server error");
                e.code = t.data, this.onError(e);
                break;

              case "message":
                this.emit("data", t.data), this.emit("message", t.data);
            } else Ct('packet received with socket readyState "%s"', this.readyState);
        }
        onHandshake(t) {
            this.emit("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(t.upgrades), 
            this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.onOpen(), 
            "closed" !== this.readyState && this.resetPingTimeout();
        }
        resetPingTimeout() {
            clearTimeout(this.pingTimeoutTimer), this.pingTimeoutTimer = setTimeout((() => {
                this.onClose("ping timeout");
            }), this.pingInterval + this.pingTimeout);
        }
        onDrain() {
            this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush();
        }
        flush() {
            "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (Ct("flushing %d packets in socket", this.writeBuffer.length), 
            this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, 
            this.emit("flush"));
        }
        write(t, e, n) {
            return this.sendPacket("message", t, e, n), this;
        }
        send(t, e, n) {
            return this.sendPacket("message", t, e, n), this;
        }
        sendPacket(t, e, n, s) {
            if ("function" == typeof e && (s = e, e = void 0), "function" == typeof n && (s = n, 
            n = null), "closing" === this.readyState || "closed" === this.readyState) return;
            (n = n || {}).compress = !1 !== n.compress;
            const o = {
                type: t,
                data: e,
                options: n
            };
            this.emit("packetCreate", o), this.writeBuffer.push(o), s && this.once("flush", s), 
            this.flush();
        }
        close() {
            const t = this;
            function e() {
                t.onClose("forced close"), Ct("socket closing - telling transport to close"), t.transport.close();
            }
            function n() {
                t.removeListener("upgrade", n), t.removeListener("upgradeError", n), e();
            }
            function s() {
                t.once("upgrade", n), t.once("upgradeError", n);
            }
            return "opening" !== this.readyState && "open" !== this.readyState || (this.readyState = "closing", 
            this.writeBuffer.length ? this.once("drain", (function() {
                this.upgrading ? s() : e();
            })) : this.upgrading ? s() : e()), this;
        }
        onError(t) {
            Ct("socket error %j", t), kt.priorWebsocketSuccess = !1, this.emit("error", t), 
            this.onClose("transport error", t);
        }
        onClose(t, e) {
            if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
                Ct('socket close with reason: "%s"', t);
                const n = this;
                clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), 
                this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", 
                this.id = null, this.emit("close", t, e), n.writeBuffer = [], n.prevBufferLen = 0;
            }
        }
        filterUpgrades(t) {
            const e = [];
            let n = 0;
            const s = t.length;
            for (;n < s; n++) ~this.transports.indexOf(t[n]) && e.push(t[n]);
            return e;
        }
    }
    kt.priorWebsocketSuccess = !1, kt.protocol = j.protocol;
    var wt = kt, vt = (t, e) => new wt(t, e), Et = wt, _t = wt.protocol, At = I, Tt = bt, xt = j;
    vt.Socket = Et, vt.protocol = _t, vt.Transport = At, vt.transports = Tt, vt.parser = xt;
    var St = e((function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.hasBinary = e.isBinary = void 0;
        const n = "function" == typeof ArrayBuffer, s = Object.prototype.toString, o = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === s.call(Blob), r = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === s.call(File);
        function i(t) {
            return n && (t instanceof ArrayBuffer || (t => "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(t) : t.buffer instanceof ArrayBuffer)(t)) || o && t instanceof Blob || r && t instanceof File;
        }
        e.isBinary = i, e.hasBinary = function t(e, n) {
            if (!e || "object" != typeof e) return !1;
            if (Array.isArray(e)) {
                for (let n = 0, s = e.length; n < s; n++) if (t(e[n])) return !0;
                return !1;
            }
            if (i(e)) return !0;
            if (e.toJSON && "function" == typeof e.toJSON && 1 === arguments.length) return t(e.toJSON(), !0);
            for (const s in e) if (Object.prototype.hasOwnProperty.call(e, s) && t(e[s])) return !0;
            return !1;
        };
    })), Bt = e((function(t, e) {
        function n(t, e) {
            if (!t) return t;
            if (St.isBinary(t)) {
                const n = {
                    _placeholder: !0,
                    num: e.length
                };
                return e.push(t), n;
            }
            if (Array.isArray(t)) {
                const s = new Array(t.length);
                for (let o = 0; o < t.length; o++) s[o] = n(t[o], e);
                return s;
            }
            if ("object" == typeof t && !(t instanceof Date)) {
                const s = {};
                for (const o in t) t.hasOwnProperty(o) && (s[o] = n(t[o], e));
                return s;
            }
            return t;
        }
        function s(t, e) {
            if (!t) return t;
            if (t && t._placeholder) return e[t.num];
            if (Array.isArray(t)) for (let n = 0; n < t.length; n++) t[n] = s(t[n], e); else if ("object" == typeof t) for (const n in t) t.hasOwnProperty(n) && (t[n] = s(t[n], e));
            return t;
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.reconstructPacket = e.deconstructPacket = void 0, e.deconstructPacket = function(t) {
            const e = [], s = t.data, o = t;
            return o.data = n(s, e), o.attachments = e.length, {
                packet: o,
                buffers: e
            };
        }, e.reconstructPacket = function(t, e) {
            return t.data = s(t.data, e), t.attachments = void 0, t;
        };
    })), Ot = e((function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.Decoder = e.Encoder = e.PacketType = e.protocol = void 0;
        const n = f("socket.io-parser");
        var s;
        e.protocol = 5, function(t) {
            t[t.CONNECT = 0] = "CONNECT", t[t.DISCONNECT = 1] = "DISCONNECT", t[t.EVENT = 2] = "EVENT", 
            t[t.ACK = 3] = "ACK", t[t.CONNECT_ERROR = 4] = "CONNECT_ERROR", t[t.BINARY_EVENT = 5] = "BINARY_EVENT", 
            t[t.BINARY_ACK = 6] = "BINARY_ACK";
        }(s = e.PacketType || (e.PacketType = {}));
        e.Encoder = class {
            encode(t) {
                return n("encoding packet %j", t), t.type !== s.EVENT && t.type !== s.ACK || !St.hasBinary(t) ? [ this.encodeAsString(t) ] : (t.type = t.type === s.EVENT ? s.BINARY_EVENT : s.BINARY_ACK, 
                this.encodeAsBinary(t));
            }
            encodeAsString(t) {
                let e = "" + t.type;
                return t.type !== s.BINARY_EVENT && t.type !== s.BINARY_ACK || (e += t.attachments + "-"), 
                t.nsp && "/" !== t.nsp && (e += t.nsp + ","), null != t.id && (e += t.id), null != t.data && (e += JSON.stringify(t.data)), 
                n("encoded %j as %s", t, e), e;
            }
            encodeAsBinary(t) {
                const e = Bt.deconstructPacket(t), n = this.encodeAsString(e.packet), s = e.buffers;
                return s.unshift(n), s;
            }
        };
        class o extends L {
            constructor() {
                super();
            }
            add(t) {
                let e;
                if ("string" == typeof t) e = this.decodeString(t), e.type === s.BINARY_EVENT || e.type === s.BINARY_ACK ? (this.reconstructor = new r(e), 
                0 === e.attachments && super.emit("decoded", e)) : super.emit("decoded", e); else {
                    if (!St.isBinary(t) && !t.base64) throw new Error("Unknown type: " + t);
                    if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
                    e = this.reconstructor.takeBinaryData(t), e && (this.reconstructor = null, super.emit("decoded", e));
                }
            }
            decodeString(t) {
                let e = 0;
                const r = {
                    type: Number(t.charAt(0))
                };
                if (void 0 === s[r.type]) throw new Error("unknown packet type " + r.type);
                if (r.type === s.BINARY_EVENT || r.type === s.BINARY_ACK) {
                    const n = e + 1;
                    for (;"-" !== t.charAt(++e) && e != t.length; ) ;
                    const s = t.substring(n, e);
                    if (s != Number(s) || "-" !== t.charAt(e)) throw new Error("Illegal attachments");
                    r.attachments = Number(s);
                }
                if ("/" === t.charAt(e + 1)) {
                    const n = e + 1;
                    for (;++e; ) {
                        if ("," === t.charAt(e)) break;
                        if (e === t.length) break;
                    }
                    r.nsp = t.substring(n, e);
                } else r.nsp = "/";
                const i = t.charAt(e + 1);
                if ("" !== i && Number(i) == i) {
                    const n = e + 1;
                    for (;++e; ) {
                        const n = t.charAt(e);
                        if (null == n || Number(n) != n) {
                            --e;
                            break;
                        }
                        if (e === t.length) break;
                    }
                    r.id = Number(t.substring(n, e + 1));
                }
                if (t.charAt(++e)) {
                    const n = function(t) {
                        try {
                            return JSON.parse(t);
                        } catch (e) {
                            return !1;
                        }
                    }(t.substr(e));
                    if (!o.isPayloadValid(r.type, n)) throw new Error("invalid payload");
                    r.data = n;
                }
                return n("decoded %s as %j", t, r), r;
            }
            static isPayloadValid(t, e) {
                switch (t) {
                  case s.CONNECT:
                    return "object" == typeof e;

                  case s.DISCONNECT:
                    return void 0 === e;

                  case s.CONNECT_ERROR:
                    return "string" == typeof e || "object" == typeof e;

                  case s.EVENT:
                  case s.BINARY_EVENT:
                    return Array.isArray(e) && e.length > 0;

                  case s.ACK:
                  case s.BINARY_ACK:
                    return Array.isArray(e);
                }
            }
            destroy() {
                this.reconstructor && this.reconstructor.finishedReconstruction();
            }
        }
        e.Decoder = o;
        class r {
            constructor(t) {
                this.packet = t, this.buffers = [], this.reconPack = t;
            }
            takeBinaryData(t) {
                if (this.buffers.push(t), this.buffers.length === this.reconPack.attachments) {
                    const t = Bt.reconstructPacket(this.reconPack, this.buffers);
                    return this.finishedReconstruction(), t;
                }
                return null;
            }
            finishedReconstruction() {
                this.reconPack = null, this.buffers = [];
            }
        }
    })), Pt = e((function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.on = void 0, e.on = function(t, e, n) {
            return t.on(e, n), function() {
                t.off(e, n);
            };
        };
    })), Nt = e((function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.Socket = void 0;
        const n = f("socket.io-client:socket"), s = Object.freeze({
            connect: 1,
            connect_error: 1,
            disconnect: 1,
            disconnecting: 1,
            newListener: 1,
            removeListener: 1
        });
        e.Socket = class extends L {
            constructor(t, e, n) {
                super(), this.receiveBuffer = [], this.sendBuffer = [], this.ids = 0, this.acks = {}, 
                this.flags = {}, this.io = t, this.nsp = e, this.ids = 0, this.acks = {}, this.receiveBuffer = [], 
                this.sendBuffer = [], this.connected = !1, this.disconnected = !0, this.flags = {}, 
                n && n.auth && (this.auth = n.auth), this.io._autoConnect && this.open();
            }
            subEvents() {
                if (this.subs) return;
                const t = this.io;
                this.subs = [ Pt.on(t, "open", this.onopen.bind(this)), Pt.on(t, "packet", this.onpacket.bind(this)), Pt.on(t, "error", this.onerror.bind(this)), Pt.on(t, "close", this.onclose.bind(this)) ];
            }
            get active() {
                return !!this.subs;
            }
            connect() {
                return this.connected || (this.subEvents(), this.io._reconnecting || this.io.open(), 
                "open" === this.io._readyState && this.onopen()), this;
            }
            open() {
                return this.connect();
            }
            send(...t) {
                return t.unshift("message"), this.emit.apply(this, t), this;
            }
            emit(t, ...e) {
                if (s.hasOwnProperty(t)) throw new Error('"' + t + '" is a reserved event name');
                e.unshift(t);
                const o = {
                    type: Ot.PacketType.EVENT,
                    data: e,
                    options: {}
                };
                o.options.compress = !1 !== this.flags.compress, "function" == typeof e[e.length - 1] && (n("emitting packet with ack id %d", this.ids), 
                this.acks[this.ids] = e.pop(), o.id = this.ids++);
                const r = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
                return this.flags.volatile && (!r || !this.connected) ? n("discard packet as the transport is not currently writable") : this.connected ? this.packet(o) : this.sendBuffer.push(o), 
                this.flags = {}, this;
            }
            packet(t) {
                t.nsp = this.nsp, this.io._packet(t);
            }
            onopen() {
                n("transport is open - connecting"), "function" == typeof this.auth ? this.auth((t => {
                    this.packet({
                        type: Ot.PacketType.CONNECT,
                        data: t
                    });
                })) : this.packet({
                    type: Ot.PacketType.CONNECT,
                    data: this.auth
                });
            }
            onerror(t) {
                this.connected || super.emit("connect_error", t);
            }
            onclose(t) {
                n("close (%s)", t), this.connected = !1, this.disconnected = !0, delete this.id, 
                super.emit("disconnect", t);
            }
            onpacket(t) {
                if (t.nsp === this.nsp) switch (t.type) {
                  case Ot.PacketType.CONNECT:
                    if (t.data && t.data.sid) {
                        const e = t.data.sid;
                        this.onconnect(e);
                    } else super.emit("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                    break;

                  case Ot.PacketType.EVENT:
                  case Ot.PacketType.BINARY_EVENT:
                    this.onevent(t);
                    break;

                  case Ot.PacketType.ACK:
                  case Ot.PacketType.BINARY_ACK:
                    this.onack(t);
                    break;

                  case Ot.PacketType.DISCONNECT:
                    this.ondisconnect();
                    break;

                  case Ot.PacketType.CONNECT_ERROR:
                    const e = new Error(t.data.message);
                    e.data = t.data.data, super.emit("connect_error", e);
                }
            }
            onevent(t) {
                const e = t.data || [];
                n("emitting event %j", e), null != t.id && (n("attaching ack callback to event"), 
                e.push(this.ack(t.id))), this.connected ? this.emitEvent(e) : this.receiveBuffer.push(Object.freeze(e));
            }
            emitEvent(t) {
                if (this._anyListeners && this._anyListeners.length) {
                    const e = this._anyListeners.slice();
                    for (const n of e) n.apply(this, t);
                }
                super.emit.apply(this, t);
            }
            ack(t) {
                const e = this;
                let s = !1;
                return function(...o) {
                    s || (s = !0, n("sending ack %j", o), e.packet({
                        type: Ot.PacketType.ACK,
                        id: t,
                        data: o
                    }));
                };
            }
            onack(t) {
                const e = this.acks[t.id];
                "function" == typeof e ? (n("calling ack %s with %j", t.id, t.data), e.apply(this, t.data), 
                delete this.acks[t.id]) : n("bad ack %s", t.id);
            }
            onconnect(t) {
                n("socket connected with id %s", t), this.id = t, this.connected = !0, this.disconnected = !1, 
                super.emit("connect"), this.emitBuffered();
            }
            emitBuffered() {
                this.receiveBuffer.forEach((t => this.emitEvent(t))), this.receiveBuffer = [], this.sendBuffer.forEach((t => this.packet(t))), 
                this.sendBuffer = [];
            }
            ondisconnect() {
                n("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect");
            }
            destroy() {
                this.subs && (this.subs.forEach((t => t())), this.subs = void 0), this.io._destroy(this);
            }
            disconnect() {
                return this.connected && (n("performing disconnect (%s)", this.nsp), this.packet({
                    type: Ot.PacketType.DISCONNECT
                })), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
            }
            close() {
                return this.disconnect();
            }
            compress(t) {
                return this.flags.compress = t, this;
            }
            get volatile() {
                return this.flags.volatile = !0, this;
            }
            onAny(t) {
                return this._anyListeners = this._anyListeners || [], this._anyListeners.push(t), 
                this;
            }
            prependAny(t) {
                return this._anyListeners = this._anyListeners || [], this._anyListeners.unshift(t), 
                this;
            }
            offAny(t) {
                if (!this._anyListeners) return this;
                if (t) {
                    const e = this._anyListeners;
                    for (let n = 0; n < e.length; n++) if (t === e[n]) return e.splice(n, 1), this;
                } else this._anyListeners = [];
                return this;
            }
            listenersAny() {
                return this._anyListeners || [];
            }
        };
    })), Rt = Ft;
    function Ft(t) {
        t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, 
        this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0;
    }
    Ft.prototype.duration = function() {
        var t = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
            var e = Math.random(), n = Math.floor(e * this.jitter * t);
            t = 0 == (1 & Math.floor(10 * e)) ? t - n : t + n;
        }
        return 0 | Math.min(t, this.max);
    }, Ft.prototype.reset = function() {
        this.attempts = 0;
    }, Ft.prototype.setMin = function(t) {
        this.ms = t;
    }, Ft.prototype.setMax = function(t) {
        this.max = t;
    }, Ft.prototype.setJitter = function(t) {
        this.jitter = t;
    };
    var jt = e((function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.Manager = void 0;
        const n = f("socket.io-client:manager");
        e.Manager = class extends L {
            constructor(t, e) {
                super(), this.nsps = {}, this.subs = [], t && "object" == typeof t && (e = t, t = void 0), 
                (e = e || {}).path = e.path || "/socket.io", this.opts = e, this.reconnection(!1 !== e.reconnection), 
                this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0), this.reconnectionDelay(e.reconnectionDelay || 1e3), 
                this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3), this.randomizationFactor(e.randomizationFactor || .5), 
                this.backoff = new Rt({
                    min: this.reconnectionDelay(),
                    max: this.reconnectionDelayMax(),
                    jitter: this.randomizationFactor()
                }), this.timeout(null == e.timeout ? 2e4 : e.timeout), this._readyState = "closed", 
                this.uri = t;
                const n = e.parser || Ot;
                this.encoder = new n.Encoder, this.decoder = new n.Decoder, this._autoConnect = !1 !== e.autoConnect, 
                this._autoConnect && this.open();
            }
            reconnection(t) {
                return arguments.length ? (this._reconnection = !!t, this) : this._reconnection;
            }
            reconnectionAttempts(t) {
                return void 0 === t ? this._reconnectionAttempts : (this._reconnectionAttempts = t, 
                this);
            }
            reconnectionDelay(t) {
                var e;
                return void 0 === t ? this._reconnectionDelay : (this._reconnectionDelay = t, null === (e = this.backoff) || void 0 === e || e.setMin(t), 
                this);
            }
            randomizationFactor(t) {
                var e;
                return void 0 === t ? this._randomizationFactor : (this._randomizationFactor = t, 
                null === (e = this.backoff) || void 0 === e || e.setJitter(t), this);
            }
            reconnectionDelayMax(t) {
                var e;
                return void 0 === t ? this._reconnectionDelayMax : (this._reconnectionDelayMax = t, 
                null === (e = this.backoff) || void 0 === e || e.setMax(t), this);
            }
            timeout(t) {
                return arguments.length ? (this._timeout = t, this) : this._timeout;
            }
            maybeReconnectOnOpen() {
                !this._reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect();
            }
            open(t) {
                if (n("readyState %s", this._readyState), ~this._readyState.indexOf("open")) return this;
                n("opening %s", this.uri), this.engine = vt(this.uri, this.opts);
                const e = this.engine, s = this;
                this._readyState = "opening", this.skipReconnect = !1;
                const o = Pt.on(e, "open", (function() {
                    s.onopen(), t && t();
                })), r = Pt.on(e, "error", (e => {
                    n("error"), s.cleanup(), s._readyState = "closed", super.emit("error", e), t ? t(e) : s.maybeReconnectOnOpen();
                }));
                if (!1 !== this._timeout) {
                    const t = this._timeout;
                    n("connect attempt will timeout after %d", t), 0 === t && o();
                    const s = setTimeout((() => {
                        n("connect attempt timed out after %d", t), o(), e.close(), e.emit("error", new Error("timeout"));
                    }), t);
                    this.subs.push((function() {
                        clearTimeout(s);
                    }));
                }
                return this.subs.push(o), this.subs.push(r), this;
            }
            connect(t) {
                return this.open(t);
            }
            onopen() {
                n("open"), this.cleanup(), this._readyState = "open", super.emit("open");
                const t = this.engine;
                this.subs.push(Pt.on(t, "ping", this.onping.bind(this)), Pt.on(t, "data", this.ondata.bind(this)), Pt.on(t, "error", this.onerror.bind(this)), Pt.on(t, "close", this.onclose.bind(this)), Pt.on(this.decoder, "decoded", this.ondecoded.bind(this)));
            }
            onping() {
                super.emit("ping");
            }
            ondata(t) {
                this.decoder.add(t);
            }
            ondecoded(t) {
                super.emit("packet", t);
            }
            onerror(t) {
                n("error", t), super.emit("error", t);
            }
            socket(t, e) {
                let n = this.nsps[t];
                return n || (n = new Nt.Socket(this, t, e), this.nsps[t] = n), n;
            }
            _destroy(t) {
                const e = Object.keys(this.nsps);
                for (const s of e) {
                    if (this.nsps[s].active) return void n("socket %s is still active, skipping close", s);
                }
                this._close();
            }
            _packet(t) {
                n("writing packet %j", t), t.query && 0 === t.type && (t.nsp += "?" + t.query);
                const e = this.encoder.encode(t);
                for (let n = 0; n < e.length; n++) this.engine.write(e[n], t.options);
            }
            cleanup() {
                n("cleanup"), this.subs.forEach((t => t())), this.subs.length = 0, this.decoder.destroy();
            }
            _close() {
                n("disconnect"), this.skipReconnect = !0, this._reconnecting = !1, "opening" === this._readyState && this.cleanup(), 
                this.backoff.reset(), this._readyState = "closed", this.engine && this.engine.close();
            }
            disconnect() {
                return this._close();
            }
            onclose(t) {
                n("onclose"), this.cleanup(), this.backoff.reset(), this._readyState = "closed", 
                super.emit("close", t), this._reconnection && !this.skipReconnect && this.reconnect();
            }
            reconnect() {
                if (this._reconnecting || this.skipReconnect) return this;
                const t = this;
                if (this.backoff.attempts >= this._reconnectionAttempts) n("reconnect failed"), 
                this.backoff.reset(), super.emit("reconnect_failed"), this._reconnecting = !1; else {
                    const e = this.backoff.duration();
                    n("will wait %dms before reconnect attempt", e), this._reconnecting = !0;
                    const s = setTimeout((() => {
                        t.skipReconnect || (n("attempting reconnect"), super.emit("reconnect_attempt", t.backoff.attempts), 
                        t.skipReconnect || t.open((e => {
                            e ? (n("reconnect attempt error"), t._reconnecting = !1, t.reconnect(), super.emit("reconnect_error", e)) : (n("reconnect success"), 
                            t.onreconnect());
                        })));
                    }), e);
                    this.subs.push((function() {
                        clearTimeout(s);
                    }));
                }
            }
            onreconnect() {
                const t = this.backoff.attempts;
                this._reconnecting = !1, this.backoff.reset(), super.emit("reconnect", t);
            }
        };
    })), Lt = t(e((function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.Socket = e.io = e.Manager = e.protocol = void 0, Object.defineProperty(e, "Socket", {
            enumerable: !0,
            get: function() {
                return Nt.Socket;
            }
        });
        const n = f("socket.io-client");
        t.exports = e = o;
        const s = e.managers = {};
        function o(t, e) {
            "object" == typeof t && (e = t, t = void 0), e = e || {};
            const o = y.url(t), r = o.source, i = o.id, c = o.path, a = s[i] && c in s[i].nsps;
            let h;
            return e.forceNew || e["force new connection"] || !1 === e.multiplex || a ? (n("ignoring socket cache for %s", r), 
            h = new jt.Manager(r, e)) : (s[i] || (n("new io instance for %s", r), s[i] = new jt.Manager(r, e)), 
            h = s[i]), o.query && !e.query && (e.query = o.query), h.socket(o.path, e);
        }
        e.io = o, Object.defineProperty(e, "protocol", {
            enumerable: !0,
            get: function() {
                return Ot.protocol;
            }
        }), e.connect = o;
        var r = jt;
        Object.defineProperty(e, "Manager", {
            enumerable: !0,
            get: function() {
                return r.Manager;
            }
        });
    })));
    Lt.Manager, function() {
        const t = {
            address: -1 != window.location.origin.indexOf("dc.local") ? "http://192.168.1.170:1331" : "http://peter-bridge.dippark.com:1331",
            init: function() {
                this.address = "http://192.168.1.170:1331", this.connect();
            },
            connect: function(t) {
                const e = Lt(this.address, {
                    reconnectionDelay: 1e3,
                    reconnectionAttempts: 5,
                    transports: [ "websocket" ]
                });
                e.on("connect_error", (t => {
                    console.error("[BRIDGE] disconnected, error", t.toString());
                })).on("connect_timeout", (() => {
                    console.error("[BRIDGE] disconnected by timeout");
                })).on("reconnect_failed", (() => {
                    console.error("[BRIDGE] disconnected by retry_timeout");
                })).on("reconnect_attempt", (t => {
                    console.warn("[BRIDGE] Retry to connect #${count}, Please make sure Bridge is running on ${this.address}");
                })).on("connect", (async () => {
                    console.log("[BRIDGE] connected to", this.address);
                })).on("disconnect", (t => {
                    "io server disconnect" === t ? (console.log("[BRIDGE] disconnected by server. Reconnecting..."), 
                    e.connect()) : console.log("[BRIDGE] disconnected");
                })).on("bridgeMessage", (t => {
                    console.log("[BRIDGE] Receive a message from Connect", t);
                }));
            }
        };
        !function(t, e) {
            t.domReady = function(n, s) {
                e.addEventListener && e.addEventListener("DOMContentLoaded", (function o(r) {
                    e.removeEventListener("DOMContentLoaded", o), e.addEventListener("readystatechange", (function(r) {
                        e.removeEventListener("readystatechange", o), setTimeout((function() {
                            n.call(s || t, r);
                        }), 1);
                    })), setTimeout((function() {
                        n.call(s || t, r);
                    }), 1);
                })) || e.attachEvent && e.attachEvent("onreadystatechange", (function o(r) {
                    "complete" === e.readyState && (e.detachEvent("onreadystatechange", o), setTimeout((function() {
                        n.call(s || t, r);
                    }), 1));
                }));
            };
        }(window, document), window.domReady((function(t) {
            "DOMContentLoaded" === t.type ? this.init() : t.target.readyState;
        }), t);
    }();
}();
