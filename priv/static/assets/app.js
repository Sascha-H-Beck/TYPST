(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // vendor/topbar.js
  var require_topbar = __commonJS({
    "vendor/topbar.js"(exports, module) {
      (function(window2, document2) {
        "use strict";
        (function() {
          var lastTime = 0;
          var vendors = ["ms", "moz", "webkit", "o"];
          for (var x = 0; x < vendors.length && !window2.requestAnimationFrame; ++x) {
            window2.requestAnimationFrame = window2[vendors[x] + "RequestAnimationFrame"];
            window2.cancelAnimationFrame = window2[vendors[x] + "CancelAnimationFrame"] || window2[vendors[x] + "CancelRequestAnimationFrame"];
          }
          if (!window2.requestAnimationFrame)
            window2.requestAnimationFrame = function(callback, element) {
              var currTime = (/* @__PURE__ */ new Date()).getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window2.setTimeout(function() {
                callback(currTime + timeToCall);
              }, timeToCall);
              lastTime = currTime + timeToCall;
              return id;
            };
          if (!window2.cancelAnimationFrame)
            window2.cancelAnimationFrame = function(id) {
              clearTimeout(id);
            };
        })();
        var canvas, currentProgress, showing, progressTimerId = null, fadeTimerId = null, delayTimerId = null, addEvent = function(elem, type, handler) {
          if (elem.addEventListener)
            elem.addEventListener(type, handler, false);
          else if (elem.attachEvent)
            elem.attachEvent("on" + type, handler);
          else
            elem["on" + type] = handler;
        }, options = {
          autoRun: true,
          barThickness: 3,
          barColors: {
            0: "rgba(26,  188, 156, .9)",
            ".25": "rgba(52,  152, 219, .9)",
            ".50": "rgba(241, 196, 15,  .9)",
            ".75": "rgba(230, 126, 34,  .9)",
            "1.0": "rgba(211, 84,  0,   .9)"
          },
          shadowBlur: 10,
          shadowColor: "rgba(0,   0,   0,   .6)",
          className: null
        }, repaint = function() {
          canvas.width = window2.innerWidth;
          canvas.height = options.barThickness * 5;
          var ctx = canvas.getContext("2d");
          ctx.shadowBlur = options.shadowBlur;
          ctx.shadowColor = options.shadowColor;
          var lineGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
          for (var stop in options.barColors)
            lineGradient.addColorStop(stop, options.barColors[stop]);
          ctx.lineWidth = options.barThickness;
          ctx.beginPath();
          ctx.moveTo(0, options.barThickness / 2);
          ctx.lineTo(
            Math.ceil(currentProgress * canvas.width),
            options.barThickness / 2
          );
          ctx.strokeStyle = lineGradient;
          ctx.stroke();
        }, createCanvas = function() {
          canvas = document2.createElement("canvas");
          var style = canvas.style;
          style.position = "fixed";
          style.top = style.left = style.right = style.margin = style.padding = 0;
          style.zIndex = 100001;
          style.display = "none";
          if (options.className)
            canvas.classList.add(options.className);
          document2.body.appendChild(canvas);
          addEvent(window2, "resize", repaint);
        }, topbar2 = {
          config: function(opts) {
            for (var key in opts)
              if (options.hasOwnProperty(key))
                options[key] = opts[key];
          },
          show: function(delay) {
            if (showing)
              return;
            if (delay) {
              if (delayTimerId)
                return;
              delayTimerId = setTimeout(() => topbar2.show(), delay);
            } else {
              showing = true;
              if (fadeTimerId !== null)
                window2.cancelAnimationFrame(fadeTimerId);
              if (!canvas)
                createCanvas();
              canvas.style.opacity = 1;
              canvas.style.display = "block";
              topbar2.progress(0);
              if (options.autoRun) {
                (function loop() {
                  progressTimerId = window2.requestAnimationFrame(loop);
                  topbar2.progress(
                    "+" + 0.05 * Math.pow(1 - Math.sqrt(currentProgress), 2)
                  );
                })();
              }
            }
          },
          progress: function(to) {
            if (typeof to === "undefined")
              return currentProgress;
            if (typeof to === "string") {
              to = (to.indexOf("+") >= 0 || to.indexOf("-") >= 0 ? currentProgress : 0) + parseFloat(to);
            }
            currentProgress = to > 1 ? 1 : to;
            repaint();
            return currentProgress;
          },
          hide: function() {
            clearTimeout(delayTimerId);
            delayTimerId = null;
            if (!showing)
              return;
            showing = false;
            if (progressTimerId != null) {
              window2.cancelAnimationFrame(progressTimerId);
              progressTimerId = null;
            }
            (function loop() {
              if (topbar2.progress("+.1") >= 1) {
                canvas.style.opacity -= 0.05;
                if (canvas.style.opacity <= 0.05) {
                  canvas.style.display = "none";
                  fadeTimerId = null;
                  return;
                }
              }
              fadeTimerId = window2.requestAnimationFrame(loop);
            })();
          }
        };
        if (typeof module === "object" && typeof module.exports === "object") {
          module.exports = topbar2;
        } else if (typeof define === "function" && define.amd) {
          define(function() {
            return topbar2;
          });
        } else {
          this.topbar = topbar2;
        }
      }).call(exports, window, document);
    }
  });

  // ../deps/phoenix_html/priv/static/phoenix_html.js
  (function() {
    var PolyfillEvent = eventConstructor();
    function eventConstructor() {
      if (typeof window.CustomEvent === "function")
        return window.CustomEvent;
      function CustomEvent2(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: void 0 };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      }
      CustomEvent2.prototype = window.Event.prototype;
      return CustomEvent2;
    }
    function buildHiddenInput(name, value) {
      var input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      return input;
    }
    function handleClick(element, targetModifierKey) {
      var to = element.getAttribute("data-to"), method = buildHiddenInput("_method", element.getAttribute("data-method")), csrf = buildHiddenInput("_csrf_token", element.getAttribute("data-csrf")), form = document.createElement("form"), submit = document.createElement("input"), target = element.getAttribute("target");
      form.method = element.getAttribute("data-method") === "get" ? "get" : "post";
      form.action = to;
      form.style.display = "none";
      if (target)
        form.target = target;
      else if (targetModifierKey)
        form.target = "_blank";
      form.appendChild(csrf);
      form.appendChild(method);
      document.body.appendChild(form);
      submit.type = "submit";
      form.appendChild(submit);
      submit.click();
    }
    window.addEventListener("click", function(e) {
      var element = e.target;
      if (e.defaultPrevented)
        return;
      while (element && element.getAttribute) {
        var phoenixLinkEvent = new PolyfillEvent("phoenix.link.click", {
          "bubbles": true,
          "cancelable": true
        });
        if (!element.dispatchEvent(phoenixLinkEvent)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return false;
        }
        if (element.getAttribute("data-method") && element.getAttribute("data-to")) {
          handleClick(element, e.metaKey || e.shiftKey);
          e.preventDefault();
          return false;
        } else {
          element = element.parentNode;
        }
      }
    }, false);
    window.addEventListener("phoenix.link.click", function(e) {
      var message = e.target.getAttribute("data-confirm");
      if (message && !window.confirm(message)) {
        e.preventDefault();
      }
    }, false);
  })();

  // ../deps/phoenix/priv/static/phoenix.mjs
  var closure = (value) => {
    if (typeof value === "function") {
      return value;
    } else {
      let closure22 = function() {
        return value;
      };
      return closure22;
    }
  };
  var globalSelf = typeof self !== "undefined" ? self : null;
  var phxWindow = typeof window !== "undefined" ? window : null;
  var global = globalSelf || phxWindow || global;
  var DEFAULT_VSN = "2.0.0";
  var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
  var MAX_LONGPOLL_BATCH_SIZE = 100;
  var DEFAULT_TIMEOUT = 1e4;
  var WS_CLOSE_NORMAL = 1e3;
  var CHANNEL_STATES = {
    closed: "closed",
    errored: "errored",
    joined: "joined",
    joining: "joining",
    leaving: "leaving"
  };
  var CHANNEL_EVENTS = {
    close: "phx_close",
    error: "phx_error",
    join: "phx_join",
    reply: "phx_reply",
    leave: "phx_leave"
  };
  var TRANSPORTS = {
    longpoll: "longpoll",
    websocket: "websocket"
  };
  var XHR_STATES = {
    complete: 4
  };
  var Push = class {
    constructor(channel, event, payload, timeout) {
      this.channel = channel;
      this.event = event;
      this.payload = payload || function() {
        return {};
      };
      this.receivedResp = null;
      this.timeout = timeout;
      this.timeoutTimer = null;
      this.recHooks = [];
      this.sent = false;
    }
    /**
     *
     * @param {number} timeout
     */
    resend(timeout) {
      this.timeout = timeout;
      this.reset();
      this.send();
    }
    /**
     *
     */
    send() {
      if (this.hasReceived("timeout")) {
        return;
      }
      this.startTimeout();
      this.sent = true;
      this.channel.socket.push({
        topic: this.channel.topic,
        event: this.event,
        payload: this.payload(),
        ref: this.ref,
        join_ref: this.channel.joinRef()
      });
    }
    /**
     *
     * @param {*} status
     * @param {*} callback
     */
    receive(status, callback) {
      if (this.hasReceived(status)) {
        callback(this.receivedResp.response);
      }
      this.recHooks.push({ status, callback });
      return this;
    }
    /**
     * @private
     */
    reset() {
      this.cancelRefEvent();
      this.ref = null;
      this.refEvent = null;
      this.receivedResp = null;
      this.sent = false;
    }
    /**
     * @private
     */
    matchReceive({ status, response, _ref }) {
      this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
    }
    /**
     * @private
     */
    cancelRefEvent() {
      if (!this.refEvent) {
        return;
      }
      this.channel.off(this.refEvent);
    }
    /**
     * @private
     */
    cancelTimeout() {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
    /**
     * @private
     */
    startTimeout() {
      if (this.timeoutTimer) {
        this.cancelTimeout();
      }
      this.ref = this.channel.socket.makeRef();
      this.refEvent = this.channel.replyEventName(this.ref);
      this.channel.on(this.refEvent, (payload) => {
        this.cancelRefEvent();
        this.cancelTimeout();
        this.receivedResp = payload;
        this.matchReceive(payload);
      });
      this.timeoutTimer = setTimeout(() => {
        this.trigger("timeout", {});
      }, this.timeout);
    }
    /**
     * @private
     */
    hasReceived(status) {
      return this.receivedResp && this.receivedResp.status === status;
    }
    /**
     * @private
     */
    trigger(status, response) {
      this.channel.trigger(this.refEvent, { status, response });
    }
  };
  var Timer = class {
    constructor(callback, timerCalc) {
      this.callback = callback;
      this.timerCalc = timerCalc;
      this.timer = null;
      this.tries = 0;
    }
    reset() {
      this.tries = 0;
      clearTimeout(this.timer);
    }
    /**
     * Cancels any previous scheduleTimeout and schedules callback
     */
    scheduleTimeout() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.tries = this.tries + 1;
        this.callback();
      }, this.timerCalc(this.tries + 1));
    }
  };
  var Channel = class {
    constructor(topic, params, socket) {
      this.state = CHANNEL_STATES.closed;
      this.topic = topic;
      this.params = closure(params || {});
      this.socket = socket;
      this.bindings = [];
      this.bindingRef = 0;
      this.timeout = this.socket.timeout;
      this.joinedOnce = false;
      this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
      this.pushBuffer = [];
      this.stateChangeRefs = [];
      this.rejoinTimer = new Timer(() => {
        if (this.socket.isConnected()) {
          this.rejoin();
        }
      }, this.socket.rejoinAfterMs);
      this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset()));
      this.stateChangeRefs.push(
        this.socket.onOpen(() => {
          this.rejoinTimer.reset();
          if (this.isErrored()) {
            this.rejoin();
          }
        })
      );
      this.joinPush.receive("ok", () => {
        this.state = CHANNEL_STATES.joined;
        this.rejoinTimer.reset();
        this.pushBuffer.forEach((pushEvent) => pushEvent.send());
        this.pushBuffer = [];
      });
      this.joinPush.receive("error", () => {
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.onClose(() => {
        this.rejoinTimer.reset();
        if (this.socket.hasLogger())
          this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
        this.state = CHANNEL_STATES.closed;
        this.socket.remove(this);
      });
      this.onError((reason) => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `error ${this.topic}`, reason);
        if (this.isJoining()) {
          this.joinPush.reset();
        }
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.joinPush.receive("timeout", () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout);
        let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), this.timeout);
        leavePush.send();
        this.state = CHANNEL_STATES.errored;
        this.joinPush.reset();
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
        this.trigger(this.replyEventName(ref), payload);
      });
    }
    /**
     * Join the channel
     * @param {integer} timeout
     * @returns {Push}
     */
    join(timeout = this.timeout) {
      if (this.joinedOnce) {
        throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
      } else {
        this.timeout = timeout;
        this.joinedOnce = true;
        this.rejoin();
        return this.joinPush;
      }
    }
    /**
     * Hook into channel close
     * @param {Function} callback
     */
    onClose(callback) {
      this.on(CHANNEL_EVENTS.close, callback);
    }
    /**
     * Hook into channel errors
     * @param {Function} callback
     */
    onError(callback) {
      return this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
    }
    /**
     * Subscribes on channel events
     *
     * Subscription returns a ref counter, which can be used later to
     * unsubscribe the exact event listener
     *
     * @example
     * const ref1 = channel.on("event", do_stuff)
     * const ref2 = channel.on("event", do_other_stuff)
     * channel.off("event", ref1)
     * // Since unsubscription, do_stuff won't fire,
     * // while do_other_stuff will keep firing on the "event"
     *
     * @param {string} event
     * @param {Function} callback
     * @returns {integer} ref
     */
    on(event, callback) {
      let ref = this.bindingRef++;
      this.bindings.push({ event, ref, callback });
      return ref;
    }
    /**
     * Unsubscribes off of channel events
     *
     * Use the ref returned from a channel.on() to unsubscribe one
     * handler, or pass nothing for the ref to unsubscribe all
     * handlers for the given event.
     *
     * @example
     * // Unsubscribe the do_stuff handler
     * const ref1 = channel.on("event", do_stuff)
     * channel.off("event", ref1)
     *
     * // Unsubscribe all handlers from event
     * channel.off("event")
     *
     * @param {string} event
     * @param {integer} ref
     */
    off(event, ref) {
      this.bindings = this.bindings.filter((bind) => {
        return !(bind.event === event && (typeof ref === "undefined" || ref === bind.ref));
      });
    }
    /**
     * @private
     */
    canPush() {
      return this.socket.isConnected() && this.isJoined();
    }
    /**
     * Sends a message `event` to phoenix with the payload `payload`.
     * Phoenix receives this in the `handle_in(event, payload, socket)`
     * function. if phoenix replies or it times out (default 10000ms),
     * then optionally the reply can be received.
     *
     * @example
     * channel.push("event")
     *   .receive("ok", payload => console.log("phoenix replied:", payload))
     *   .receive("error", err => console.log("phoenix errored", err))
     *   .receive("timeout", () => console.log("timed out pushing"))
     * @param {string} event
     * @param {Object} payload
     * @param {number} [timeout]
     * @returns {Push}
     */
    push(event, payload, timeout = this.timeout) {
      payload = payload || {};
      if (!this.joinedOnce) {
        throw new Error(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
      }
      let pushEvent = new Push(this, event, function() {
        return payload;
      }, timeout);
      if (this.canPush()) {
        pushEvent.send();
      } else {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
      }
      return pushEvent;
    }
    /** Leaves the channel
     *
     * Unsubscribes from server events, and
     * instructs channel to terminate on server
     *
     * Triggers onClose() hooks
     *
     * To receive leave acknowledgements, use the `receive`
     * hook to bind to the server ack, ie:
     *
     * @example
     * channel.leave().receive("ok", () => alert("left!") )
     *
     * @param {integer} timeout
     * @returns {Push}
     */
    leave(timeout = this.timeout) {
      this.rejoinTimer.reset();
      this.joinPush.cancelTimeout();
      this.state = CHANNEL_STATES.leaving;
      let onClose = () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `leave ${this.topic}`);
        this.trigger(CHANNEL_EVENTS.close, "leave");
      };
      let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), timeout);
      leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
      leavePush.send();
      if (!this.canPush()) {
        leavePush.trigger("ok", {});
      }
      return leavePush;
    }
    /**
     * Overridable message hook
     *
     * Receives all events for specialized message handling
     * before dispatching to the channel callbacks.
     *
     * Must return the payload, modified or unmodified
     * @param {string} event
     * @param {Object} payload
     * @param {integer} ref
     * @returns {Object}
     */
    onMessage(_event, payload, _ref) {
      return payload;
    }
    /**
     * @private
     */
    isMember(topic, event, payload, joinRef) {
      if (this.topic !== topic) {
        return false;
      }
      if (joinRef && joinRef !== this.joinRef()) {
        if (this.socket.hasLogger())
          this.socket.log("channel", "dropping outdated message", { topic, event, payload, joinRef });
        return false;
      } else {
        return true;
      }
    }
    /**
     * @private
     */
    joinRef() {
      return this.joinPush.ref;
    }
    /**
     * @private
     */
    rejoin(timeout = this.timeout) {
      if (this.isLeaving()) {
        return;
      }
      this.socket.leaveOpenTopic(this.topic);
      this.state = CHANNEL_STATES.joining;
      this.joinPush.resend(timeout);
    }
    /**
     * @private
     */
    trigger(event, payload, ref, joinRef) {
      let handledPayload = this.onMessage(event, payload, ref, joinRef);
      if (payload && !handledPayload) {
        throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
      }
      let eventBindings = this.bindings.filter((bind) => bind.event === event);
      for (let i = 0; i < eventBindings.length; i++) {
        let bind = eventBindings[i];
        bind.callback(handledPayload, ref, joinRef || this.joinRef());
      }
    }
    /**
     * @private
     */
    replyEventName(ref) {
      return `chan_reply_${ref}`;
    }
    /**
     * @private
     */
    isClosed() {
      return this.state === CHANNEL_STATES.closed;
    }
    /**
     * @private
     */
    isErrored() {
      return this.state === CHANNEL_STATES.errored;
    }
    /**
     * @private
     */
    isJoined() {
      return this.state === CHANNEL_STATES.joined;
    }
    /**
     * @private
     */
    isJoining() {
      return this.state === CHANNEL_STATES.joining;
    }
    /**
     * @private
     */
    isLeaving() {
      return this.state === CHANNEL_STATES.leaving;
    }
  };
  var Ajax = class {
    static request(method, endPoint, accept, body, timeout, ontimeout, callback) {
      if (global.XDomainRequest) {
        let req = new global.XDomainRequest();
        return this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
      } else {
        let req = new global.XMLHttpRequest();
        return this.xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback);
      }
    }
    static xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
      req.timeout = timeout;
      req.open(method, endPoint);
      req.onload = () => {
        let response = this.parseJSON(req.responseText);
        callback && callback(response);
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.onprogress = () => {
      };
      req.send(body);
      return req;
    }
    static xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
      req.open(method, endPoint, true);
      req.timeout = timeout;
      req.setRequestHeader("Content-Type", accept);
      req.onerror = () => callback && callback(null);
      req.onreadystatechange = () => {
        if (req.readyState === XHR_STATES.complete && callback) {
          let response = this.parseJSON(req.responseText);
          callback(response);
        }
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.send(body);
      return req;
    }
    static parseJSON(resp) {
      if (!resp || resp === "") {
        return null;
      }
      try {
        return JSON.parse(resp);
      } catch (e) {
        console && console.log("failed to parse JSON response", resp);
        return null;
      }
    }
    static serialize(obj, parentKey) {
      let queryStr = [];
      for (var key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
          continue;
        }
        let paramKey = parentKey ? `${parentKey}[${key}]` : key;
        let paramVal = obj[key];
        if (typeof paramVal === "object") {
          queryStr.push(this.serialize(paramVal, paramKey));
        } else {
          queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
        }
      }
      return queryStr.join("&");
    }
    static appendParams(url, params) {
      if (Object.keys(params).length === 0) {
        return url;
      }
      let prefix = url.match(/\?/) ? "&" : "?";
      return `${url}${prefix}${this.serialize(params)}`;
    }
  };
  var arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };
  var LongPoll = class {
    constructor(endPoint) {
      this.endPoint = null;
      this.token = null;
      this.skipHeartbeat = true;
      this.reqs = /* @__PURE__ */ new Set();
      this.awaitingBatchAck = false;
      this.currentBatch = null;
      this.currentBatchTimer = null;
      this.batchBuffer = [];
      this.onopen = function() {
      };
      this.onerror = function() {
      };
      this.onmessage = function() {
      };
      this.onclose = function() {
      };
      this.pollEndpoint = this.normalizeEndpoint(endPoint);
      this.readyState = SOCKET_STATES.connecting;
      setTimeout(() => this.poll(), 0);
    }
    normalizeEndpoint(endPoint) {
      return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
    }
    endpointURL() {
      return Ajax.appendParams(this.pollEndpoint, { token: this.token });
    }
    closeAndRetry(code, reason, wasClean) {
      this.close(code, reason, wasClean);
      this.readyState = SOCKET_STATES.connecting;
    }
    ontimeout() {
      this.onerror("timeout");
      this.closeAndRetry(1005, "timeout", false);
    }
    isActive() {
      return this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting;
    }
    poll() {
      this.ajax("GET", "application/json", null, () => this.ontimeout(), (resp) => {
        if (resp) {
          var { status, token, messages } = resp;
          this.token = token;
        } else {
          status = 0;
        }
        switch (status) {
          case 200:
            messages.forEach((msg) => {
              setTimeout(() => this.onmessage({ data: msg }), 0);
            });
            this.poll();
            break;
          case 204:
            this.poll();
            break;
          case 410:
            this.readyState = SOCKET_STATES.open;
            this.onopen({});
            this.poll();
            break;
          case 403:
            this.onerror(403);
            this.close(1008, "forbidden", false);
            break;
          case 0:
          case 500:
            this.onerror(500);
            this.closeAndRetry(1011, "internal server error", 500);
            break;
          default:
            throw new Error(`unhandled poll status ${status}`);
        }
      });
    }
    // we collect all pushes within the current event loop by
    // setTimeout 0, which optimizes back-to-back procedural
    // pushes against an empty buffer
    send(body) {
      if (typeof body !== "string") {
        body = arrayBufferToBase64(body);
      }
      if (this.currentBatch) {
        this.currentBatch.push(body);
      } else if (this.awaitingBatchAck) {
        this.batchBuffer.push(body);
      } else {
        this.currentBatch = [body];
        this.currentBatchTimer = setTimeout(() => {
          this.batchSend(this.currentBatch);
          this.currentBatch = null;
        }, 0);
      }
    }
    batchSend(messages, offset = 0) {
      this.awaitingBatchAck = true;
      const next = offset + MAX_LONGPOLL_BATCH_SIZE;
      const batch = messages.slice(offset, next);
      this.ajax("POST", "application/x-ndjson", batch.join("\n"), () => this.onerror("timeout"), (resp) => {
        if (!resp || resp.status !== 200) {
          this.awaitingBatchAck = false;
          this.onerror(resp && resp.status);
          this.closeAndRetry(1011, "internal server error", false);
        } else if (next < messages.length) {
          this.batchSend(messages, next);
        } else if (this.batchBuffer.length > 0) {
          this.batchSend(this.batchBuffer);
          this.batchBuffer = [];
        } else {
          this.awaitingBatchAck = false;
        }
      });
    }
    close(code, reason, wasClean) {
      for (let req of this.reqs) {
        req.abort();
      }
      this.readyState = SOCKET_STATES.closed;
      let opts = Object.assign({ code: 1e3, reason: void 0, wasClean: true }, { code, reason, wasClean });
      this.batchBuffer = [];
      clearTimeout(this.currentBatchTimer);
      this.currentBatchTimer = null;
      if (typeof CloseEvent !== "undefined") {
        this.onclose(new CloseEvent("close", opts));
      } else {
        this.onclose(opts);
      }
    }
    ajax(method, contentType, body, onCallerTimeout, callback) {
      let req;
      let ontimeout = () => {
        this.reqs.delete(req);
        onCallerTimeout();
      };
      req = Ajax.request(method, this.endpointURL(), contentType, body, this.timeout, ontimeout, (resp) => {
        this.reqs.delete(req);
        if (this.isActive()) {
          callback(resp);
        }
      });
      this.reqs.add(req);
    }
  };
  var serializer_default = {
    HEADER_LENGTH: 1,
    META_LENGTH: 4,
    KINDS: { push: 0, reply: 1, broadcast: 2 },
    encode(msg, callback) {
      if (msg.payload.constructor === ArrayBuffer) {
        return callback(this.binaryEncode(msg));
      } else {
        let payload = [msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload];
        return callback(JSON.stringify(payload));
      }
    },
    decode(rawPayload, callback) {
      if (rawPayload.constructor === ArrayBuffer) {
        return callback(this.binaryDecode(rawPayload));
      } else {
        let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
        return callback({ join_ref, ref, topic, event, payload });
      }
    },
    // private
    binaryEncode(message) {
      let { join_ref, ref, event, topic, payload } = message;
      let metaLength = this.META_LENGTH + join_ref.length + ref.length + topic.length + event.length;
      let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
      let view = new DataView(header);
      let offset = 0;
      view.setUint8(offset++, this.KINDS.push);
      view.setUint8(offset++, join_ref.length);
      view.setUint8(offset++, ref.length);
      view.setUint8(offset++, topic.length);
      view.setUint8(offset++, event.length);
      Array.from(join_ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(topic, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(event, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      var combined = new Uint8Array(header.byteLength + payload.byteLength);
      combined.set(new Uint8Array(header), 0);
      combined.set(new Uint8Array(payload), header.byteLength);
      return combined.buffer;
    },
    binaryDecode(buffer) {
      let view = new DataView(buffer);
      let kind = view.getUint8(0);
      let decoder = new TextDecoder();
      switch (kind) {
        case this.KINDS.push:
          return this.decodePush(buffer, view, decoder);
        case this.KINDS.reply:
          return this.decodeReply(buffer, view, decoder);
        case this.KINDS.broadcast:
          return this.decodeBroadcast(buffer, view, decoder);
      }
    },
    decodePush(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let topicSize = view.getUint8(2);
      let eventSize = view.getUint8(3);
      let offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: joinRef, ref: null, topic, event, payload: data };
    },
    decodeReply(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let refSize = view.getUint8(2);
      let topicSize = view.getUint8(3);
      let eventSize = view.getUint8(4);
      let offset = this.HEADER_LENGTH + this.META_LENGTH;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let ref = decoder.decode(buffer.slice(offset, offset + refSize));
      offset = offset + refSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      let payload = { status: event, response: data };
      return { join_ref: joinRef, ref, topic, event: CHANNEL_EVENTS.reply, payload };
    },
    decodeBroadcast(buffer, view, decoder) {
      let topicSize = view.getUint8(1);
      let eventSize = view.getUint8(2);
      let offset = this.HEADER_LENGTH + 2;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: null, ref: null, topic, event, payload: data };
    }
  };
  var Socket = class {
    constructor(endPoint, opts = {}) {
      this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] };
      this.channels = [];
      this.sendBuffer = [];
      this.ref = 0;
      this.timeout = opts.timeout || DEFAULT_TIMEOUT;
      this.transport = opts.transport || global.WebSocket || LongPoll;
      this.primaryPassedHealthCheck = false;
      this.longPollFallbackMs = opts.longPollFallbackMs;
      this.fallbackTimer = null;
      this.sessionStore = opts.sessionStorage || global && global.sessionStorage;
      this.establishedConnections = 0;
      this.defaultEncoder = serializer_default.encode.bind(serializer_default);
      this.defaultDecoder = serializer_default.decode.bind(serializer_default);
      this.closeWasClean = false;
      this.disconnecting = false;
      this.binaryType = opts.binaryType || "arraybuffer";
      this.connectClock = 1;
      if (this.transport !== LongPoll) {
        this.encode = opts.encode || this.defaultEncoder;
        this.decode = opts.decode || this.defaultDecoder;
      } else {
        this.encode = this.defaultEncoder;
        this.decode = this.defaultDecoder;
      }
      let awaitingConnectionOnPageShow = null;
      if (phxWindow && phxWindow.addEventListener) {
        phxWindow.addEventListener("pagehide", (_e) => {
          if (this.conn) {
            this.disconnect();
            awaitingConnectionOnPageShow = this.connectClock;
          }
        });
        phxWindow.addEventListener("pageshow", (_e) => {
          if (awaitingConnectionOnPageShow === this.connectClock) {
            awaitingConnectionOnPageShow = null;
            this.connect();
          }
        });
      }
      this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 3e4;
      this.rejoinAfterMs = (tries) => {
        if (opts.rejoinAfterMs) {
          return opts.rejoinAfterMs(tries);
        } else {
          return [1e3, 2e3, 5e3][tries - 1] || 1e4;
        }
      };
      this.reconnectAfterMs = (tries) => {
        if (opts.reconnectAfterMs) {
          return opts.reconnectAfterMs(tries);
        } else {
          return [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][tries - 1] || 5e3;
        }
      };
      this.logger = opts.logger || null;
      if (!this.logger && opts.debug) {
        this.logger = (kind, msg, data) => {
          console.log(`${kind}: ${msg}`, data);
        };
      }
      this.longpollerTimeout = opts.longpollerTimeout || 2e4;
      this.params = closure(opts.params || {});
      this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
      this.vsn = opts.vsn || DEFAULT_VSN;
      this.heartbeatTimeoutTimer = null;
      this.heartbeatTimer = null;
      this.pendingHeartbeatRef = null;
      this.reconnectTimer = new Timer(() => {
        this.teardown(() => this.connect());
      }, this.reconnectAfterMs);
    }
    /**
     * Returns the LongPoll transport reference
     */
    getLongPollTransport() {
      return LongPoll;
    }
    /**
     * Disconnects and replaces the active transport
     *
     * @param {Function} newTransport - The new transport class to instantiate
     *
     */
    replaceTransport(newTransport) {
      this.connectClock++;
      this.closeWasClean = true;
      clearTimeout(this.fallbackTimer);
      this.reconnectTimer.reset();
      if (this.conn) {
        this.conn.close();
        this.conn = null;
      }
      this.transport = newTransport;
    }
    /**
     * Returns the socket protocol
     *
     * @returns {string}
     */
    protocol() {
      return location.protocol.match(/^https/) ? "wss" : "ws";
    }
    /**
     * The fully qualified socket url
     *
     * @returns {string}
     */
    endPointURL() {
      let uri = Ajax.appendParams(
        Ajax.appendParams(this.endPoint, this.params()),
        { vsn: this.vsn }
      );
      if (uri.charAt(0) !== "/") {
        return uri;
      }
      if (uri.charAt(1) === "/") {
        return `${this.protocol()}:${uri}`;
      }
      return `${this.protocol()}://${location.host}${uri}`;
    }
    /**
     * Disconnects the socket
     *
     * See https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes for valid status codes.
     *
     * @param {Function} callback - Optional callback which is called after socket is disconnected.
     * @param {integer} code - A status code for disconnection (Optional).
     * @param {string} reason - A textual description of the reason to disconnect. (Optional)
     */
    disconnect(callback, code, reason) {
      this.connectClock++;
      this.disconnecting = true;
      this.closeWasClean = true;
      clearTimeout(this.fallbackTimer);
      this.reconnectTimer.reset();
      this.teardown(() => {
        this.disconnecting = false;
        callback && callback();
      }, code, reason);
    }
    /**
     *
     * @param {Object} params - The params to send when connecting, for example `{user_id: userToken}`
     *
     * Passing params to connect is deprecated; pass them in the Socket constructor instead:
     * `new Socket("/socket", {params: {user_id: userToken}})`.
     */
    connect(params) {
      if (params) {
        console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
        this.params = closure(params);
      }
      if (this.conn && !this.disconnecting) {
        return;
      }
      if (this.longPollFallbackMs && this.transport !== LongPoll) {
        this.connectWithFallback(LongPoll, this.longPollFallbackMs);
      } else {
        this.transportConnect();
      }
    }
    /**
     * Logs the message. Override `this.logger` for specialized logging. noops by default
     * @param {string} kind
     * @param {string} msg
     * @param {Object} data
     */
    log(kind, msg, data) {
      this.logger && this.logger(kind, msg, data);
    }
    /**
     * Returns true if a logger has been set on this socket.
     */
    hasLogger() {
      return this.logger !== null;
    }
    /**
     * Registers callbacks for connection open events
     *
     * @example socket.onOpen(function(){ console.info("the socket was opened") })
     *
     * @param {Function} callback
     */
    onOpen(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.open.push([ref, callback]);
      return ref;
    }
    /**
     * Registers callbacks for connection close events
     * @param {Function} callback
     */
    onClose(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.close.push([ref, callback]);
      return ref;
    }
    /**
     * Registers callbacks for connection error events
     *
     * @example socket.onError(function(error){ alert("An error occurred") })
     *
     * @param {Function} callback
     */
    onError(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.error.push([ref, callback]);
      return ref;
    }
    /**
     * Registers callbacks for connection message events
     * @param {Function} callback
     */
    onMessage(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.message.push([ref, callback]);
      return ref;
    }
    /**
     * Pings the server and invokes the callback with the RTT in milliseconds
     * @param {Function} callback
     *
     * Returns true if the ping was pushed or false if unable to be pushed.
     */
    ping(callback) {
      if (!this.isConnected()) {
        return false;
      }
      let ref = this.makeRef();
      let startTime = Date.now();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref });
      let onMsgRef = this.onMessage((msg) => {
        if (msg.ref === ref) {
          this.off([onMsgRef]);
          callback(Date.now() - startTime);
        }
      });
      return true;
    }
    /**
     * @private
     */
    transportConnect() {
      this.connectClock++;
      this.closeWasClean = false;
      this.conn = new this.transport(this.endPointURL());
      this.conn.binaryType = this.binaryType;
      this.conn.timeout = this.longpollerTimeout;
      this.conn.onopen = () => this.onConnOpen();
      this.conn.onerror = (error) => this.onConnError(error);
      this.conn.onmessage = (event) => this.onConnMessage(event);
      this.conn.onclose = (event) => this.onConnClose(event);
    }
    getSession(key) {
      return this.sessionStore && this.sessionStore.getItem(key);
    }
    storeSession(key, val) {
      this.sessionStore && this.sessionStore.setItem(key, val);
    }
    connectWithFallback(fallbackTransport, fallbackThreshold = 2500) {
      clearTimeout(this.fallbackTimer);
      let established = false;
      let primaryTransport = true;
      let openRef, errorRef;
      let fallback = (reason) => {
        this.log("transport", `falling back to ${fallbackTransport.name}...`, reason);
        this.off([openRef, errorRef]);
        primaryTransport = false;
        this.replaceTransport(fallbackTransport);
        this.transportConnect();
      };
      if (this.getSession(`phx:fallback:${fallbackTransport.name}`)) {
        return fallback("memorized");
      }
      this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
      errorRef = this.onError((reason) => {
        this.log("transport", "error", reason);
        if (primaryTransport && !established) {
          clearTimeout(this.fallbackTimer);
          fallback(reason);
        }
      });
      this.onOpen(() => {
        established = true;
        if (!primaryTransport) {
          if (!this.primaryPassedHealthCheck) {
            this.storeSession(`phx:fallback:${fallbackTransport.name}`, "true");
          }
          return this.log("transport", `established ${fallbackTransport.name} fallback`);
        }
        clearTimeout(this.fallbackTimer);
        this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
        this.ping((rtt) => {
          this.log("transport", "connected to primary after", rtt);
          this.primaryPassedHealthCheck = true;
          clearTimeout(this.fallbackTimer);
        });
      });
      this.transportConnect();
    }
    clearHeartbeats() {
      clearTimeout(this.heartbeatTimer);
      clearTimeout(this.heartbeatTimeoutTimer);
    }
    onConnOpen() {
      if (this.hasLogger())
        this.log("transport", `${this.transport.name} connected to ${this.endPointURL()}`);
      this.closeWasClean = false;
      this.disconnecting = false;
      this.establishedConnections++;
      this.flushSendBuffer();
      this.reconnectTimer.reset();
      this.resetHeartbeat();
      this.stateChangeCallbacks.open.forEach(([, callback]) => callback());
    }
    /**
     * @private
     */
    heartbeatTimeout() {
      if (this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
        if (this.hasLogger()) {
          this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
        }
        this.triggerChanError();
        this.closeWasClean = false;
        this.teardown(() => this.reconnectTimer.scheduleTimeout(), WS_CLOSE_NORMAL, "heartbeat timeout");
      }
    }
    resetHeartbeat() {
      if (this.conn && this.conn.skipHeartbeat) {
        return;
      }
      this.pendingHeartbeatRef = null;
      this.clearHeartbeats();
      this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
    }
    teardown(callback, code, reason) {
      if (!this.conn) {
        return callback && callback();
      }
      let connectClock = this.connectClock;
      this.waitForBufferDone(() => {
        if (connectClock !== this.connectClock) {
          return;
        }
        if (this.conn) {
          if (code) {
            this.conn.close(code, reason || "");
          } else {
            this.conn.close();
          }
        }
        this.waitForSocketClosed(() => {
          if (connectClock !== this.connectClock) {
            return;
          }
          if (this.conn) {
            this.conn.onopen = function() {
            };
            this.conn.onerror = function() {
            };
            this.conn.onmessage = function() {
            };
            this.conn.onclose = function() {
            };
            this.conn = null;
          }
          callback && callback();
        });
      });
    }
    waitForBufferDone(callback, tries = 1) {
      if (tries === 5 || !this.conn || !this.conn.bufferedAmount) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForBufferDone(callback, tries + 1);
      }, 150 * tries);
    }
    waitForSocketClosed(callback, tries = 1) {
      if (tries === 5 || !this.conn || this.conn.readyState === SOCKET_STATES.closed) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForSocketClosed(callback, tries + 1);
      }, 150 * tries);
    }
    onConnClose(event) {
      let closeCode = event && event.code;
      if (this.hasLogger())
        this.log("transport", "close", event);
      this.triggerChanError();
      this.clearHeartbeats();
      if (!this.closeWasClean && closeCode !== 1e3) {
        this.reconnectTimer.scheduleTimeout();
      }
      this.stateChangeCallbacks.close.forEach(([, callback]) => callback(event));
    }
    /**
     * @private
     */
    onConnError(error) {
      if (this.hasLogger())
        this.log("transport", error);
      let transportBefore = this.transport;
      let establishedBefore = this.establishedConnections;
      this.stateChangeCallbacks.error.forEach(([, callback]) => {
        callback(error, transportBefore, establishedBefore);
      });
      if (transportBefore === this.transport || establishedBefore > 0) {
        this.triggerChanError();
      }
    }
    /**
     * @private
     */
    triggerChanError() {
      this.channels.forEach((channel) => {
        if (!(channel.isErrored() || channel.isLeaving() || channel.isClosed())) {
          channel.trigger(CHANNEL_EVENTS.error);
        }
      });
    }
    /**
     * @returns {string}
     */
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case SOCKET_STATES.connecting:
          return "connecting";
        case SOCKET_STATES.open:
          return "open";
        case SOCKET_STATES.closing:
          return "closing";
        default:
          return "closed";
      }
    }
    /**
     * @returns {boolean}
     */
    isConnected() {
      return this.connectionState() === "open";
    }
    /**
     * @private
     *
     * @param {Channel}
     */
    remove(channel) {
      this.off(channel.stateChangeRefs);
      this.channels = this.channels.filter((c) => c !== channel);
    }
    /**
     * Removes `onOpen`, `onClose`, `onError,` and `onMessage` registrations.
     *
     * @param {refs} - list of refs returned by calls to
     *                 `onOpen`, `onClose`, `onError,` and `onMessage`
     */
    off(refs) {
      for (let key in this.stateChangeCallbacks) {
        this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(([ref]) => {
          return refs.indexOf(ref) === -1;
        });
      }
    }
    /**
     * Initiates a new channel for the given topic
     *
     * @param {string} topic
     * @param {Object} chanParams - Parameters for the channel
     * @returns {Channel}
     */
    channel(topic, chanParams = {}) {
      let chan = new Channel(topic, chanParams, this);
      this.channels.push(chan);
      return chan;
    }
    /**
     * @param {Object} data
     */
    push(data) {
      if (this.hasLogger()) {
        let { topic, event, payload, ref, join_ref } = data;
        this.log("push", `${topic} ${event} (${join_ref}, ${ref})`, payload);
      }
      if (this.isConnected()) {
        this.encode(data, (result) => this.conn.send(result));
      } else {
        this.sendBuffer.push(() => this.encode(data, (result) => this.conn.send(result)));
      }
    }
    /**
     * Return the next message ref, accounting for overflows
     * @returns {string}
     */
    makeRef() {
      let newRef = this.ref + 1;
      if (newRef === this.ref) {
        this.ref = 0;
      } else {
        this.ref = newRef;
      }
      return this.ref.toString();
    }
    sendHeartbeat() {
      if (this.pendingHeartbeatRef && !this.isConnected()) {
        return;
      }
      this.pendingHeartbeatRef = this.makeRef();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
      this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
    }
    flushSendBuffer() {
      if (this.isConnected() && this.sendBuffer.length > 0) {
        this.sendBuffer.forEach((callback) => callback());
        this.sendBuffer = [];
      }
    }
    onConnMessage(rawMessage) {
      this.decode(rawMessage.data, (msg) => {
        let { topic, event, payload, ref, join_ref } = msg;
        if (ref && ref === this.pendingHeartbeatRef) {
          this.clearHeartbeats();
          this.pendingHeartbeatRef = null;
          this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
        }
        if (this.hasLogger())
          this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
        for (let i = 0; i < this.channels.length; i++) {
          const channel = this.channels[i];
          if (!channel.isMember(topic, event, payload, join_ref)) {
            continue;
          }
          channel.trigger(event, payload, ref, join_ref);
        }
        for (let i = 0; i < this.stateChangeCallbacks.message.length; i++) {
          let [, callback] = this.stateChangeCallbacks.message[i];
          callback(msg);
        }
      });
    }
    leaveOpenTopic(topic) {
      let dupChannel = this.channels.find((c) => c.topic === topic && (c.isJoined() || c.isJoining()));
      if (dupChannel) {
        if (this.hasLogger())
          this.log("transport", `leaving duplicate topic "${topic}"`);
        dupChannel.leave();
      }
    }
  };

  // ../deps/phoenix_live_view/priv/static/phoenix_live_view.esm.js
  var CONSECUTIVE_RELOADS = "consecutive-reloads";
  var MAX_RELOADS = 10;
  var RELOAD_JITTER_MIN = 5e3;
  var RELOAD_JITTER_MAX = 1e4;
  var FAILSAFE_JITTER = 3e4;
  var PHX_EVENT_CLASSES = [
    "phx-click-loading",
    "phx-change-loading",
    "phx-submit-loading",
    "phx-keydown-loading",
    "phx-keyup-loading",
    "phx-blur-loading",
    "phx-focus-loading",
    "phx-hook-loading"
  ];
  var PHX_DROP_TARGET_ACTIVE_CLASS = "phx-drop-target-active";
  var PHX_COMPONENT = "data-phx-component";
  var PHX_VIEW_REF = "data-phx-view";
  var PHX_LIVE_LINK = "data-phx-link";
  var PHX_TRACK_STATIC = "track-static";
  var PHX_LINK_STATE = "data-phx-link-state";
  var PHX_REF_LOADING = "data-phx-ref-loading";
  var PHX_REF_SRC = "data-phx-ref-src";
  var PHX_REF_LOCK = "data-phx-ref-lock";
  var PHX_PENDING_REFS = "phx-pending-refs";
  var PHX_TRACK_UPLOADS = "track-uploads";
  var PHX_UPLOAD_REF = "data-phx-upload-ref";
  var PHX_PREFLIGHTED_REFS = "data-phx-preflighted-refs";
  var PHX_DONE_REFS = "data-phx-done-refs";
  var PHX_DROP_TARGET = "drop-target";
  var PHX_ACTIVE_ENTRY_REFS = "data-phx-active-refs";
  var PHX_LIVE_FILE_UPDATED = "phx:live-file:updated";
  var PHX_SKIP = "data-phx-skip";
  var PHX_MAGIC_ID = "data-phx-id";
  var PHX_PRUNE = "data-phx-prune";
  var PHX_CONNECTED_CLASS = "phx-connected";
  var PHX_LOADING_CLASS = "phx-loading";
  var PHX_ERROR_CLASS = "phx-error";
  var PHX_CLIENT_ERROR_CLASS = "phx-client-error";
  var PHX_SERVER_ERROR_CLASS = "phx-server-error";
  var PHX_PARENT_ID = "data-phx-parent-id";
  var PHX_MAIN = "data-phx-main";
  var PHX_ROOT_ID = "data-phx-root-id";
  var PHX_VIEWPORT_TOP = "viewport-top";
  var PHX_VIEWPORT_BOTTOM = "viewport-bottom";
  var PHX_VIEWPORT_OVERRUN_TARGET = "viewport-overrun-target";
  var PHX_TRIGGER_ACTION = "trigger-action";
  var PHX_HAS_FOCUSED = "phx-has-focused";
  var FOCUSABLE_INPUTS = [
    "text",
    "textarea",
    "number",
    "email",
    "password",
    "search",
    "tel",
    "url",
    "date",
    "time",
    "datetime-local",
    "color",
    "range"
  ];
  var CHECKABLE_INPUTS = ["checkbox", "radio"];
  var PHX_HAS_SUBMITTED = "phx-has-submitted";
  var PHX_SESSION = "data-phx-session";
  var PHX_VIEW_SELECTOR = `[${PHX_SESSION}]`;
  var PHX_STICKY = "data-phx-sticky";
  var PHX_STATIC = "data-phx-static";
  var PHX_READONLY = "data-phx-readonly";
  var PHX_DISABLED = "data-phx-disabled";
  var PHX_DISABLE_WITH = "disable-with";
  var PHX_DISABLE_WITH_RESTORE = "data-phx-disable-with-restore";
  var PHX_HOOK = "hook";
  var PHX_DEBOUNCE = "debounce";
  var PHX_THROTTLE = "throttle";
  var PHX_UPDATE = "update";
  var PHX_STREAM = "stream";
  var PHX_STREAM_REF = "data-phx-stream";
  var PHX_PORTAL = "data-phx-portal";
  var PHX_TELEPORTED_REF = "data-phx-teleported";
  var PHX_TELEPORTED_SRC = "data-phx-teleported-src";
  var PHX_RUNTIME_HOOK = "data-phx-runtime-hook";
  var PHX_LV_PID = "data-phx-pid";
  var PHX_KEY = "key";
  var PHX_PRIVATE = "phxPrivate";
  var PHX_AUTO_RECOVER = "auto-recover";
  var PHX_NO_UNUSED_FIELD = "no-unused-field";
  var PHX_LV_DEBUG = "phx:live-socket:debug";
  var PHX_LV_PROFILE = "phx:live-socket:profiling";
  var PHX_LV_LATENCY_SIM = "phx:live-socket:latency-sim";
  var PHX_LV_HISTORY_POSITION = "phx:nav-history-position";
  var PHX_PROGRESS = "progress";
  var PHX_MOUNTED = "mounted";
  var PHX_RELOAD_STATUS = "__phoenix_reload_status__";
  var LOADER_TIMEOUT = 1;
  var MAX_CHILD_JOIN_ATTEMPTS = 3;
  var BEFORE_UNLOAD_LOADER_TIMEOUT = 200;
  var DISCONNECTED_TIMEOUT = 500;
  var BINDING_PREFIX = "phx-";
  var PUSH_TIMEOUT = 3e4;
  var DEBOUNCE_TRIGGER = "debounce-trigger";
  var THROTTLED = "throttled";
  var DEBOUNCE_PREV_KEY = "debounce-prev-key";
  var DEFAULTS = {
    debounce: 300,
    throttle: 300
  };
  var PHX_PENDING_ATTRS = [PHX_REF_LOADING, PHX_REF_SRC, PHX_REF_LOCK];
  var STATIC = "s";
  var ROOT = "r";
  var COMPONENTS = "c";
  var KEYED = "k";
  var KEYED_COUNT = "kc";
  var EVENTS = "e";
  var REPLY = "r";
  var TITLE = "t";
  var TEMPLATES = "p";
  var STREAM = "stream";
  var EntryUploader = class {
    constructor(entry, config, liveSocket2) {
      const { chunk_size, chunk_timeout } = config;
      this.liveSocket = liveSocket2;
      this.entry = entry;
      this.offset = 0;
      this.chunkSize = chunk_size;
      this.chunkTimeout = chunk_timeout;
      this.chunkTimer = null;
      this.errored = false;
      this.uploadChannel = liveSocket2.channel(`lvu:${entry.ref}`, {
        token: entry.metadata()
      });
    }
    error(reason) {
      if (this.errored) {
        return;
      }
      this.uploadChannel.leave();
      this.errored = true;
      this.chunkTimer != null && clearTimeout(this.chunkTimer);
      this.entry.error(reason);
    }
    upload() {
      this.uploadChannel.onError((reason) => this.error(reason));
      this.uploadChannel.join().receive("ok", (_data) => this.readNextChunk()).receive("error", ({ reason }) => this.error(reason));
    }
    isDone() {
      return this.offset >= this.entry.file.size;
    }
    readNextChunk() {
      const reader = new window.FileReader();
      const blob = this.entry.file.slice(
        this.offset,
        this.chunkSize + this.offset
      );
      reader.onload = (e) => {
        var _a, _b;
        if (((_a = e.target) == null ? void 0 : _a.error) === null) {
          this.offset += /** @type {ArrayBuffer} */
          e.target.result.byteLength;
          this.pushChunk(
            /** @type {ArrayBuffer} */
            e.target.result
          );
        } else {
          return logError("Read error: " + ((_b = e.target) == null ? void 0 : _b.error));
        }
      };
      reader.readAsArrayBuffer(blob);
    }
    pushChunk(chunk) {
      if (!this.uploadChannel.isJoined()) {
        return;
      }
      this.uploadChannel.push("chunk", chunk, this.chunkTimeout).receive("ok", () => {
        this.entry.progress(this.offset / this.entry.file.size * 100);
        if (!this.isDone()) {
          this.chunkTimer = setTimeout(
            () => this.readNextChunk(),
            this.liveSocket.getLatencySim() || 0
          );
        }
      }).receive("error", ({ reason }) => this.error(reason));
    }
  };
  var logError = (msg, obj) => console.error && console.error(msg, obj);
  var ensureSameOrigin = (href, kind) => {
    let url;
    try {
      url = new URL(href, window.location.href);
    } catch (e) {
      throw new Error(
        `expected ${kind} destination to be a valid URL, got: ${href}`
      );
    }
    if (url.origin !== window.location.origin) {
      throw new Error(
        `cannot ${kind} to "${href}" because its origin does not match the current origin "${window.location.origin}". Use window.location directly for cross-origin navigation.`
      );
    }
  };
  var isCid = (cid) => {
    const type = typeof cid;
    return type === "number" || type === "string" && /^(0|[1-9]\d*)$/.test(cid);
  };
  function detectDuplicateIds() {
    const ids = /* @__PURE__ */ new Set();
    const elems = document.querySelectorAll("*[id]");
    for (let i = 0, len = elems.length; i < len; i++) {
      if (ids.has(elems[i].id)) {
        console.error(
          `Multiple IDs detected: ${elems[i].id}. Ensure unique element ids.`
        );
      } else {
        ids.add(elems[i].id);
      }
    }
  }
  function detectInvalidStreamInserts(inserts) {
    const errors = /* @__PURE__ */ new Set();
    Object.keys(inserts).forEach((id) => {
      const streamEl = document.getElementById(id);
      if (streamEl && streamEl.parentElement && streamEl.parentElement.getAttribute("phx-update") !== "stream") {
        errors.add(
          `The stream container with id "${streamEl.parentElement.id}" is missing the phx-update="stream" attribute. Ensure it is set for streams to work properly.`
        );
      }
    });
    errors.forEach((error) => console.error(error));
  }
  var debug = (view, kind, msg, obj) => {
    if (view.liveSocket.isDebugEnabled()) {
      console.log(`${view.id} ${kind}: ${msg} - `, obj);
    }
  };
  var closure2 = (val) => typeof val === "function" ? val : function() {
    return val;
  };
  var clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };
  var closestPhxBinding = (startEl, binding, borderEl) => {
    let el = startEl;
    do {
      if (el.matches(`[${binding}]`) && !("disabled" in el && el.disabled)) {
        return el;
      }
      el = el.parentElement;
    } while (el !== null && el.nodeType === 1 && !(borderEl && borderEl.isSameNode(el) || el.matches(PHX_VIEW_SELECTOR)));
    return null;
  };
  var isObject = (obj) => {
    return obj !== null && typeof obj === "object" && !(obj instanceof Array);
  };
  var isEqualObj = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
  var isEmpty = (obj) => {
    for (const x in obj) {
      return false;
    }
    return true;
  };
  var maybe = (el, callback) => el && callback(el);
  var channelUploader = function(entries, onError, resp, liveSocket2) {
    entries.forEach((entry) => {
      const entryUploader = new EntryUploader(entry, resp.config, liveSocket2);
      entryUploader.upload();
    });
  };
  var eventContainsFiles = (e) => {
    if (e.dataTransfer.types) {
      for (let i = 0; i < e.dataTransfer.types.length; i++) {
        if (e.dataTransfer.types[i] === "Files") {
          return true;
        }
      }
    }
    return false;
  };
  var Browser = {
    canPushState() {
      return typeof history.pushState !== "undefined";
    },
    dropLocal(localStorage, namespace, subkey) {
      return localStorage.removeItem(this.localKey(namespace, subkey));
    },
    updateLocal(localStorage, namespace, subkey, initial, func) {
      const current = this.getLocal(localStorage, namespace, subkey);
      const key = this.localKey(namespace, subkey);
      const newVal = current === null ? initial : func(current);
      localStorage.setItem(key, JSON.stringify(newVal));
      return newVal;
    },
    getLocal(localStorage, namespace, subkey) {
      return JSON.parse(localStorage.getItem(this.localKey(namespace, subkey)));
    },
    updateCurrentState(callback) {
      if (!this.canPushState()) {
        return;
      }
      history.replaceState(
        callback(history.state || {}),
        "",
        window.location.href
      );
    },
    pushState(kind, meta, to) {
      if (this.canPushState()) {
        if (to !== window.location.href) {
          if (meta.type == "redirect" && meta.scroll) {
            const currentState = history.state || {};
            currentState.scroll = meta.scroll;
            history.replaceState(currentState, "", window.location.href);
          }
          delete meta.scroll;
          history[kind + "State"](meta, "", to || null);
          window.requestAnimationFrame(() => {
            const hashEl = this.getHashTargetEl(window.location.hash);
            if (hashEl) {
              hashEl.scrollIntoView();
            } else if (meta.type === "redirect") {
              window.scroll(0, 0);
            }
          });
        }
      } else if (to) {
        this.redirect(to);
      }
    },
    setCookie(name, value, maxAgeSeconds) {
      const expires = typeof maxAgeSeconds === "number" ? ` max-age=${maxAgeSeconds};` : "";
      document.cookie = `${name}=${value};${expires} path=/`;
    },
    getCookie(name) {
      return document.cookie.replace(
        new RegExp(`(?:(?:^|.*;s*)${name}s*=s*([^;]*).*$)|^.*$`),
        "$1"
      );
    },
    deleteCookie(name) {
      document.cookie = `${name}=; max-age=-1; path=/`;
    },
    redirect(toURL, flash = null, navigate = (url) => {
      window.location.href = url;
    }) {
      if (flash) {
        this.setCookie("__phoenix_flash__", flash, 60);
      }
      navigate(toURL);
    },
    localKey(namespace, subkey) {
      return `${namespace}-${subkey}`;
    },
    getHashTargetEl(maybeHash) {
      const hash = maybeHash.toString().substring(1);
      if (hash === "") {
        return;
      }
      return document.getElementById(hash) || document.querySelector(`a[name="${hash}"]`);
    }
  };
  var browser_default = Browser;
  var DOM = {
    byId(id) {
      return document.getElementById(id) || logError(`no id found for ${id}`);
    },
    elementFromTarget(target) {
      if (!(target instanceof Node)) {
        return null;
      }
      if (target.nodeType === Node.ELEMENT_NODE) {
        return target;
      } else {
        return target.parentElement;
      }
    },
    removeClass(el, className) {
      el.classList.remove(className);
      if (el.classList.length === 0) {
        el.removeAttribute("class");
      }
    },
    all(node, query, callback) {
      if (!node) {
        return [];
      }
      const array = Array.from(node.querySelectorAll(query));
      if (callback) {
        array.forEach(callback);
      }
      return array;
    },
    childNodeLength(html) {
      const template = document.createElement("template");
      template.innerHTML = html;
      return template.content.childElementCount;
    },
    isUploadInput(el) {
      return el.type === "file" && el.getAttribute(PHX_UPLOAD_REF) !== null;
    },
    isAutoUpload(inputEl) {
      return inputEl.hasAttribute("data-phx-auto-upload");
    },
    findUploadInputs(node) {
      const formId = node.id;
      const inputsOutsideForm = this.all(
        document,
        `input[type="file"][${PHX_UPLOAD_REF}][form="${formId}"]`
      );
      return this.all(node, `input[type="file"][${PHX_UPLOAD_REF}]`).concat(
        inputsOutsideForm
      );
    },
    findComponent(viewId, cid, doc2 = document) {
      return doc2.querySelector(
        `[${PHX_VIEW_REF}="${viewId}"][${PHX_COMPONENT}="${cid}"]`
      );
    },
    getComponent(viewId, cid, doc2 = document) {
      const el = this.findComponent(viewId, cid, doc2);
      if (!el) {
        throw new Error(
          `no component found matching viewId ${viewId} and cid ${cid}`
        );
      }
      return el;
    },
    isPhxDestroyed(node) {
      return node.id && DOM.private(node, "destroyed") ? true : false;
    },
    wantsNewTab(e) {
      const wantsNewTab = e.ctrlKey || e.shiftKey || e.metaKey || e.button && e.button === 1;
      const isDownload = e.target instanceof HTMLAnchorElement && e.target.hasAttribute("download");
      const isTargetBlank = e.target.hasAttribute("target") && e.target.getAttribute("target").toLowerCase() === "_blank";
      const isTargetNamedTab = e.target.hasAttribute("target") && !e.target.getAttribute("target").startsWith("_");
      return wantsNewTab || isTargetBlank || isDownload || isTargetNamedTab;
    },
    isUnloadableFormSubmit(e) {
      const isDialogSubmit = e.target && e.target.getAttribute("method") === "dialog" || e.submitter && e.submitter.getAttribute("formmethod") === "dialog";
      if (isDialogSubmit) {
        return false;
      } else {
        return !e.defaultPrevented && !this.wantsNewTab(e);
      }
    },
    isNewPageClick(e, currentLocation) {
      const href = e.target instanceof HTMLAnchorElement ? e.target.getAttribute("href") : null;
      let url;
      if (e.defaultPrevented || href === null || this.wantsNewTab(e)) {
        return false;
      }
      if (href.startsWith("mailto:") || href.startsWith("tel:")) {
        return false;
      }
      if (e.target.isContentEditable) {
        return false;
      }
      try {
        url = new URL(href);
      } catch (e2) {
        try {
          url = new URL(href, currentLocation);
        } catch (e3) {
          return true;
        }
      }
      if (url.host === currentLocation.host && url.protocol === currentLocation.protocol) {
        if (url.pathname === currentLocation.pathname && url.search === currentLocation.search) {
          return url.hash === "" && !url.href.endsWith("#");
        }
      }
      return url.protocol.startsWith("http");
    },
    markPhxChildDestroyed(el) {
      if (this.isPhxChild(el)) {
        el.setAttribute(PHX_SESSION, "");
      }
      this.putPrivate(el, "destroyed", true);
    },
    findPhxChildrenInFragment(html, parentId) {
      const template = document.createElement("template");
      template.innerHTML = html;
      return this.findPhxChildren(template.content, parentId);
    },
    isIgnored(el, phxUpdate) {
      return (el.getAttribute(phxUpdate) || el.getAttribute("data-phx-update")) === "ignore";
    },
    isPhxUpdate(el, phxUpdate, updateTypes) {
      return el.getAttribute && updateTypes.indexOf(el.getAttribute(phxUpdate)) >= 0;
    },
    findPhxSticky(el) {
      return this.all(el, `[${PHX_STICKY}]`);
    },
    findPhxChildren(el, parentId) {
      return this.all(el, `${PHX_VIEW_SELECTOR}[${PHX_PARENT_ID}="${parentId}"]`);
    },
    findExistingParentCIDs(viewId, cids) {
      const parentCids = /* @__PURE__ */ new Set();
      const childrenCids = /* @__PURE__ */ new Set();
      cids.forEach((cid) => {
        this.all(
          document,
          `[${PHX_VIEW_REF}="${viewId}"][${PHX_COMPONENT}="${cid}"]`
        ).forEach((parent) => {
          parentCids.add(cid);
          this.all(parent, `[${PHX_VIEW_REF}="${viewId}"][${PHX_COMPONENT}]`).map((el) => parseInt(el.getAttribute(PHX_COMPONENT))).forEach((childCID) => childrenCids.add(childCID));
        });
      });
      childrenCids.forEach((childCid) => parentCids.delete(childCid));
      return parentCids;
    },
    private(el, key) {
      return el[PHX_PRIVATE] && el[PHX_PRIVATE][key];
    },
    deletePrivate(el, key) {
      el[PHX_PRIVATE] && delete el[PHX_PRIVATE][key];
    },
    putPrivate(el, key, value) {
      if (!el[PHX_PRIVATE]) {
        el[PHX_PRIVATE] = {};
      }
      el[PHX_PRIVATE][key] = value;
    },
    updatePrivate(el, key, defaultVal, updateFunc) {
      const existing = this.private(el, key);
      if (existing === void 0) {
        this.putPrivate(el, key, updateFunc(defaultVal));
      } else {
        this.putPrivate(el, key, updateFunc(existing));
      }
    },
    syncPendingAttrs(fromEl, toEl) {
      if (!fromEl.hasAttribute(PHX_REF_SRC)) {
        return;
      }
      PHX_EVENT_CLASSES.forEach((className) => {
        fromEl.classList.contains(className) && toEl.classList.add(className);
      });
      PHX_PENDING_ATTRS.filter((attr) => fromEl.hasAttribute(attr)).forEach(
        (attr) => {
          toEl.setAttribute(attr, fromEl.getAttribute(attr));
        }
      );
    },
    copyPrivates(target, source) {
      if (source[PHX_PRIVATE]) {
        target[PHX_PRIVATE] = source[PHX_PRIVATE];
      }
    },
    putTitle(str) {
      const titleEl = document.querySelector("title");
      if (titleEl) {
        const { prefix, suffix, default: defaultTitle } = titleEl.dataset;
        const isEmpty2 = typeof str !== "string" || str.trim() === "";
        if (isEmpty2 && typeof defaultTitle !== "string") {
          return;
        }
        const inner = isEmpty2 ? defaultTitle : str;
        document.title = `${prefix || ""}${inner || ""}${suffix || ""}`;
      } else {
        document.title = str;
      }
    },
    debounce(el, event, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, asyncFilter, callback) {
      let debounce = el.getAttribute(phxDebounce);
      let throttle = el.getAttribute(phxThrottle);
      if (debounce === "") {
        debounce = defaultDebounce;
      }
      if (throttle === "") {
        throttle = defaultThrottle;
      }
      const value = debounce || throttle;
      switch (value) {
        case null:
          return callback();
        case "blur":
          this.incCycle(el, "debounce-blur-cycle", () => {
            if (asyncFilter()) {
              callback();
            }
          });
          if (this.once(el, "debounce-blur")) {
            el.addEventListener(
              "blur",
              () => this.triggerCycle(el, "debounce-blur-cycle")
            );
          }
          return;
        default:
          const timeout = parseInt(value);
          const trigger = () => throttle ? this.deletePrivate(el, THROTTLED) : callback();
          const currentCycle = this.incCycle(el, DEBOUNCE_TRIGGER, trigger);
          if (isNaN(timeout)) {
            return logError(`invalid throttle/debounce value: ${value}`);
          }
          if (throttle) {
            let newKeyDown = false;
            if (event.type === "keydown") {
              const prevKey = this.private(el, DEBOUNCE_PREV_KEY);
              this.putPrivate(el, DEBOUNCE_PREV_KEY, event.key);
              newKeyDown = prevKey !== event.key;
            }
            if (!newKeyDown && this.private(el, THROTTLED)) {
              return false;
            } else {
              callback();
              const t = setTimeout(() => {
                if (asyncFilter()) {
                  this.triggerCycle(el, DEBOUNCE_TRIGGER);
                }
              }, timeout);
              this.putPrivate(el, THROTTLED, t);
            }
          } else {
            setTimeout(() => {
              if (asyncFilter()) {
                this.triggerCycle(el, DEBOUNCE_TRIGGER, currentCycle);
              }
            }, timeout);
          }
          const form = el.form;
          if (form && this.once(form, "bind-debounce")) {
            form.addEventListener("submit", () => {
              Array.from(new FormData(form).entries(), ([name]) => {
                const namedItem = form.elements.namedItem(name);
                const input = namedItem instanceof RadioNodeList ? namedItem[0] : namedItem;
                if (input) {
                  this.incCycle(input, DEBOUNCE_TRIGGER);
                  this.deletePrivate(input, THROTTLED);
                }
              });
            });
          }
          if (this.once(el, "bind-debounce")) {
            el.addEventListener("blur", () => {
              clearTimeout(this.private(el, THROTTLED));
              if (asyncFilter()) {
                this.triggerCycle(el, DEBOUNCE_TRIGGER);
              }
            });
          }
      }
    },
    triggerCycle(el, key, currentCycle) {
      const [cycle, trigger] = this.private(el, key);
      if (!currentCycle) {
        currentCycle = cycle;
      }
      if (currentCycle === cycle) {
        this.incCycle(el, key);
        trigger();
      }
    },
    once(el, key) {
      if (this.private(el, key) === true) {
        return false;
      }
      this.putPrivate(el, key, true);
      return true;
    },
    incCycle(el, key, trigger = function() {
    }) {
      let [currentCycle] = this.private(el, key) || [0, trigger];
      currentCycle++;
      this.putPrivate(el, key, [currentCycle, trigger]);
      return currentCycle;
    },
    // maintains or adds privately used hook information
    // fromEl and toEl can be the same element in the case of a newly added node
    // fromEl and toEl can be any HTML node type, so we need to check if it's an element node
    maintainPrivateHooks(fromEl, toEl, phxViewportTop, phxViewportBottom) {
      if (fromEl.hasAttribute && fromEl.hasAttribute("data-phx-hook") && !toEl.hasAttribute("data-phx-hook")) {
        toEl.setAttribute("data-phx-hook", fromEl.getAttribute("data-phx-hook"));
      }
      if (toEl.hasAttribute && (toEl.hasAttribute(phxViewportTop) || toEl.hasAttribute(phxViewportBottom))) {
        toEl.setAttribute("data-phx-hook", "Phoenix.InfiniteScroll");
      }
    },
    putCustomElHook(el, hook) {
      if (el.isConnected) {
        el.setAttribute("data-phx-hook", "");
      } else {
        console.error(`
        hook attached to non-connected DOM element
        ensure you are calling createHook within your connectedCallback. ${el.outerHTML}
      `);
      }
      this.putPrivate(el, "custom-el-hook", hook);
    },
    getCustomElHook(el) {
      return this.private(el, "custom-el-hook");
    },
    isUsedInput(el) {
      return el.nodeType === Node.ELEMENT_NODE && (this.private(el, PHX_HAS_FOCUSED) || this.private(el, PHX_HAS_SUBMITTED));
    },
    resetForm(form) {
      Array.from(form.elements).forEach((input) => {
        this.deletePrivate(input, PHX_HAS_FOCUSED);
        this.deletePrivate(input, PHX_HAS_SUBMITTED);
      });
    },
    isPhxChild(node) {
      return node.getAttribute && node.getAttribute(PHX_PARENT_ID);
    },
    isPhxSticky(node) {
      return node.getAttribute && node.getAttribute(PHX_STICKY) !== null;
    },
    isChildOfAny(el, parents) {
      return !!parents.find((parent) => parent.contains(el));
    },
    firstPhxChild(el) {
      return this.isPhxChild(el) ? el : this.all(el, `[${PHX_PARENT_ID}]`)[0];
    },
    isPortalTemplate(el) {
      return el.tagName === "TEMPLATE" && el.hasAttribute(PHX_PORTAL);
    },
    closestViewEl(el) {
      const portalOrViewEl = el.closest(
        `[${PHX_TELEPORTED_REF}],${PHX_VIEW_SELECTOR}`
      );
      if (!portalOrViewEl) {
        return null;
      }
      if (portalOrViewEl.hasAttribute(PHX_TELEPORTED_REF)) {
        return this.byId(portalOrViewEl.getAttribute(PHX_TELEPORTED_REF));
      } else if (portalOrViewEl.hasAttribute(PHX_SESSION)) {
        return portalOrViewEl;
      }
      return null;
    },
    dispatchEvent(target, name, opts = {}) {
      let defaultBubble = true;
      const isUploadTarget = target.nodeName === "INPUT" && target.type === "file";
      if (isUploadTarget && name === "click") {
        defaultBubble = false;
      }
      const bubbles = opts.bubbles === void 0 ? defaultBubble : !!opts.bubbles;
      const eventOpts = {
        bubbles,
        cancelable: true,
        detail: opts.detail || {}
      };
      const event = name === "click" ? new MouseEvent("click", eventOpts) : new CustomEvent(name, eventOpts);
      target.dispatchEvent(event);
    },
    cloneNode(node, html) {
      if (typeof html === "undefined") {
        return node.cloneNode(true);
      } else {
        const cloned = node.cloneNode(false);
        cloned.innerHTML = html;
        return cloned;
      }
    },
    // merge attributes from source to target
    // if an element is ignored, we only merge data attributes
    // including removing data attributes that are no longer in the source
    mergeAttrs(target, source, opts = {}) {
      var _a;
      const exclude = new Set(opts.exclude || []);
      const isIgnored = opts.isIgnored;
      const sourceAttrs = source.attributes;
      for (let i = sourceAttrs.length - 1; i >= 0; i--) {
        const name = sourceAttrs[i].name;
        if (!exclude.has(name)) {
          const sourceValue = source.getAttribute(name);
          if (target.getAttribute(name) !== sourceValue && (!isIgnored || isIgnored && name.startsWith("data-"))) {
            target.setAttribute(name, sourceValue);
          }
        } else {
          if (name === "value") {
            const sourceValue = (_a = source.value) != null ? _a : source.getAttribute(name);
            if (target.value === sourceValue) {
              target.setAttribute("value", source.getAttribute(name));
            }
          }
        }
      }
      const targetAttrs = target.attributes;
      for (let i = targetAttrs.length - 1; i >= 0; i--) {
        const name = targetAttrs[i].name;
        if (isIgnored) {
          if (name.startsWith("data-") && !source.hasAttribute(name) && !PHX_PENDING_ATTRS.includes(name)) {
            target.removeAttribute(name);
          }
        } else {
          if (!source.hasAttribute(name)) {
            target.removeAttribute(name);
          }
        }
      }
    },
    mergeFocusedInput(target, source) {
      if (!(target instanceof HTMLSelectElement)) {
        DOM.mergeAttrs(target, source, { exclude: ["value"] });
      }
      if (source.readOnly) {
        target.setAttribute("readonly", true);
      } else {
        target.removeAttribute("readonly");
      }
    },
    hasSelectionRange(el) {
      return el.setSelectionRange && (el.type === "text" || el.type === "textarea");
    },
    restoreFocus(focused, selectionStart, selectionEnd) {
      if (focused instanceof HTMLSelectElement) {
        focused.focus();
      }
      if (!DOM.isTextualInput(focused)) {
        return;
      }
      const wasFocused = focused.matches(":focus");
      if (!wasFocused) {
        focused.focus();
      }
      if (this.hasSelectionRange(focused)) {
        focused.setSelectionRange(selectionStart, selectionEnd);
      }
    },
    /**
     * Returns true if the element is an input that can be focused and edited by the user,
     * so we can skip patching it if it has focus.
     */
    isEditableInput(el) {
      return this.isFormAssociated(el) && !(el instanceof HTMLButtonElement) && !(el instanceof HTMLInputElement && el.type === "button");
    },
    isFormAssociated(el) {
      if (!(el instanceof HTMLElement))
        return false;
      if (el.localName) {
        const customEl = customElements.get(el.localName);
        if (customEl) {
          return customEl.formAssociated === true;
        }
      }
      return el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement || el instanceof HTMLButtonElement;
    },
    syncAttrsToProps(el) {
      if (el instanceof HTMLInputElement && CHECKABLE_INPUTS.indexOf(el.type.toLocaleLowerCase()) >= 0) {
        el.checked = el.getAttribute("checked") !== null;
      }
    },
    isTextualInput(el) {
      return FOCUSABLE_INPUTS.indexOf(el.type) >= 0;
    },
    isNowTriggerFormExternal(el, phxTriggerExternal) {
      return el.getAttribute && el.getAttribute(phxTriggerExternal) !== null && document.body.contains(el);
    },
    cleanChildNodes(container, phxUpdate) {
      if (DOM.isPhxUpdate(container, phxUpdate, ["append", "prepend", PHX_STREAM])) {
        const toRemove = [];
        container.childNodes.forEach((childNode) => {
          if (!("id" in childNode) || !childNode.id) {
            const isEmptyTextNode = childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue && childNode.nodeValue.trim() === "";
            if (!isEmptyTextNode && childNode.nodeType !== Node.COMMENT_NODE) {
              logError(
                `only HTML element tags with an id are allowed inside containers with phx-update.

removing illegal node: "${("outerHTML" in childNode && childNode.outerHTML || childNode.nodeValue || "").trim()}"

`
              );
            }
            toRemove.push(childNode);
          }
        });
        toRemove.forEach((childNode) => childNode.remove());
      }
    },
    replaceRootContainer(container, tagName, attrs) {
      const retainedAttrs = /* @__PURE__ */ new Set([
        "id",
        PHX_SESSION,
        PHX_STATIC,
        PHX_MAIN,
        PHX_ROOT_ID
      ]);
      if (container.tagName.toLowerCase() === tagName.toLowerCase()) {
        Array.from(container.attributes).filter((attr) => !retainedAttrs.has(attr.name.toLowerCase())).forEach((attr) => container.removeAttribute(attr.name));
        Object.keys(attrs).filter((name) => !retainedAttrs.has(name.toLowerCase())).forEach((attr) => container.setAttribute(attr, attrs[attr]));
        return container;
      } else {
        const newContainer = document.createElement(tagName);
        Object.keys(attrs).forEach(
          (attr) => newContainer.setAttribute(attr, attrs[attr])
        );
        retainedAttrs.forEach((attr) => {
          const value = container.getAttribute(attr);
          if (value !== null) {
            newContainer.setAttribute(attr, value);
          }
        });
        newContainer.innerHTML = container.innerHTML;
        container.replaceWith(newContainer);
        return newContainer;
      }
    },
    getSticky(el, name, defaultVal) {
      const op = (DOM.private(el, "sticky") || []).find(
        ([existingName]) => name === existingName
      );
      if (op) {
        const [_name, _op, stashedResult] = op;
        return stashedResult;
      } else {
        return typeof defaultVal === "function" ? defaultVal() : defaultVal;
      }
    },
    deleteSticky(el, name) {
      this.updatePrivate(el, "sticky", [], (ops) => {
        return ops.filter(([existingName, _]) => existingName !== name);
      });
    },
    putSticky(el, name, op) {
      const stashedResult = op(el);
      this.updatePrivate(el, "sticky", [], (ops) => {
        const existingIndex = ops.findIndex(
          ([existingName]) => name === existingName
        );
        if (existingIndex >= 0) {
          ops[existingIndex] = [name, op, stashedResult];
        } else {
          ops.push([name, op, stashedResult]);
        }
        return ops;
      });
    },
    applyStickyOperations(el) {
      const ops = DOM.private(el, "sticky");
      if (!ops) {
        return;
      }
      ops.forEach(([name, op, _stashed]) => this.putSticky(el, name, op));
    },
    isLocked(el) {
      return el.hasAttribute && el.hasAttribute(PHX_REF_LOCK);
    },
    attributeIgnored(attribute, ignoredAttributes) {
      return ignoredAttributes.some(
        (toIgnore) => attribute.name == toIgnore || toIgnore === "*" || toIgnore.includes("*") && attribute.name.match(toIgnore) != null
      );
    }
  };
  var dom_default = DOM;
  var UploadEntry = class {
    static isActive(fileEl, file) {
      const isNew = file._phxRef === void 0;
      const activeRefs = fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
      const isActive = activeRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
      return file.size > 0 && (isNew || isActive);
    }
    static isPreflighted(fileEl, file) {
      const preflightedRefs = fileEl.getAttribute(PHX_PREFLIGHTED_REFS).split(",");
      const isPreflighted = preflightedRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
      return isPreflighted && this.isActive(fileEl, file);
    }
    static isPreflightInProgress(file) {
      return file._preflightInProgress === true;
    }
    static markPreflightInProgress(file) {
      file._preflightInProgress = true;
    }
    constructor(fileEl, file, view, autoUpload) {
      this.ref = LiveUploader.genFileRef(file);
      this.fileEl = fileEl;
      this.file = file;
      this.view = view;
      this.meta = null;
      this._isCancelled = false;
      this._isDone = false;
      this._progress = 0;
      this._lastProgressSent = -1;
      this._onDone = function() {
      };
      this._onElUpdated = this.onElUpdated.bind(this);
      this.fileEl.addEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
      this.autoUpload = autoUpload;
    }
    metadata() {
      return this.meta;
    }
    progress(progress) {
      this._progress = Math.floor(progress);
      if (this._progress > this._lastProgressSent) {
        if (this._progress >= 100) {
          this._progress = 100;
          this._lastProgressSent = 100;
          this._isDone = true;
          this.view.pushFileProgress(this.fileEl, this.ref, 100, () => {
            LiveUploader.untrackFile(this.fileEl, this.file);
            this._onDone();
          });
        } else {
          this._lastProgressSent = this._progress;
          this.view.pushFileProgress(this.fileEl, this.ref, this._progress);
        }
      }
    }
    isCancelled() {
      return this._isCancelled;
    }
    cancel() {
      this.file._preflightInProgress = false;
      this._isCancelled = true;
      this._isDone = true;
      this._onDone();
    }
    isDone() {
      return this._isDone;
    }
    error(reason = "failed") {
      this.fileEl.removeEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
      this.view.pushFileProgress(this.fileEl, this.ref, { error: reason });
      if (!this.isAutoUpload()) {
        LiveUploader.clearFiles(this.fileEl);
      }
    }
    isAutoUpload() {
      return this.autoUpload;
    }
    //private
    onDone(callback) {
      this._onDone = () => {
        this.fileEl.removeEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
        callback();
      };
    }
    onElUpdated() {
      const activeRefs = this.fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
      if (activeRefs.indexOf(this.ref) === -1) {
        LiveUploader.untrackFile(this.fileEl, this.file);
        this.cancel();
      }
    }
    toPreflightPayload() {
      return {
        last_modified: this.file.lastModified,
        name: this.file.name,
        relative_path: this.file.webkitRelativePath,
        size: this.file.size,
        type: this.file.type,
        ref: this.ref,
        meta: typeof this.file.meta === "function" ? this.file.meta() : void 0
      };
    }
    uploader(uploaders) {
      if (this.meta.uploader) {
        const callback = uploaders[this.meta.uploader] || logError(`no uploader configured for ${this.meta.uploader}`);
        return { name: this.meta.uploader, callback };
      } else {
        return { name: "channel", callback: channelUploader };
      }
    }
    zipPostFlight(resp) {
      this.meta = resp.entries[this.ref];
      if (!this.meta) {
        logError(`no preflight upload response returned with ref ${this.ref}`, {
          input: this.fileEl,
          response: resp
        });
      }
    }
  };
  var liveUploaderFileRef = 0;
  var LiveUploader = class _LiveUploader {
    static genFileRef(file) {
      const ref = file._phxRef;
      if (ref !== void 0) {
        return ref;
      } else {
        file._phxRef = (liveUploaderFileRef++).toString();
        return file._phxRef;
      }
    }
    static getEntryDataURL(inputEl, ref) {
      const file = this.activeFiles(inputEl).find(
        (file2) => this.genFileRef(file2) === ref
      );
      if (!file)
        return null;
      return URL.createObjectURL(file);
    }
    static hasUploadsInProgress(formEl) {
      let active = 0;
      dom_default.findUploadInputs(formEl).forEach((input) => {
        if (input.getAttribute(PHX_PREFLIGHTED_REFS) !== input.getAttribute(PHX_DONE_REFS)) {
          active++;
        }
      });
      return active > 0;
    }
    static serializeUploads(inputEl) {
      const files = this.activeFiles(inputEl);
      const fileData = {};
      files.forEach((file) => {
        const entry = { path: inputEl.name };
        const uploadRef = inputEl.getAttribute(PHX_UPLOAD_REF);
        fileData[uploadRef] = fileData[uploadRef] || [];
        entry.ref = this.genFileRef(file);
        entry.last_modified = file.lastModified;
        entry.name = file.name || entry.ref;
        entry.relative_path = file.webkitRelativePath;
        entry.type = file.type;
        entry.size = file.size;
        if (typeof file.meta === "function") {
          entry.meta = file.meta();
        }
        fileData[uploadRef].push(entry);
      });
      return fileData;
    }
    static clearFiles(inputEl) {
      inputEl.value = null;
      inputEl.removeAttribute(PHX_UPLOAD_REF);
      dom_default.putPrivate(inputEl, "files", []);
    }
    static untrackFile(inputEl, file) {
      dom_default.putPrivate(
        inputEl,
        "files",
        dom_default.private(inputEl, "files").filter((f) => !Object.is(f, file))
      );
    }
    /**
     * @param {HTMLInputElement} inputEl
     * @param {Array<File|Blob>} files
     * @param {DataTransfer} [dataTransfer]
     */
    static trackFiles(inputEl, files, dataTransfer) {
      if (inputEl.getAttribute("multiple") !== null) {
        const newFiles = files.filter(
          (file) => !this.activeFiles(inputEl).find((f) => Object.is(f, file))
        );
        dom_default.updatePrivate(
          inputEl,
          "files",
          [],
          (existing) => existing.concat(newFiles)
        );
        inputEl.value = "";
      } else {
        if (dataTransfer && dataTransfer.files.length > 0) {
          inputEl.files = dataTransfer.files;
        }
        dom_default.putPrivate(inputEl, "files", files);
      }
    }
    static activeFileInputs(formEl) {
      const fileInputs = dom_default.findUploadInputs(formEl);
      return Array.from(fileInputs).filter(
        (el) => el.files && this.activeFiles(el).length > 0
      );
    }
    static activeFiles(input) {
      return (dom_default.private(input, "files") || []).filter(
        (f) => UploadEntry.isActive(input, f)
      );
    }
    static inputsAwaitingPreflight(formEl) {
      const fileInputs = dom_default.findUploadInputs(formEl);
      return Array.from(fileInputs).filter(
        (input) => this.filesAwaitingPreflight(input).length > 0
      );
    }
    static filesAwaitingPreflight(input) {
      return this.activeFiles(input).filter(
        (f) => !UploadEntry.isPreflighted(input, f) && !UploadEntry.isPreflightInProgress(f)
      );
    }
    static markPreflightInProgress(entries) {
      entries.forEach((entry) => UploadEntry.markPreflightInProgress(entry.file));
    }
    constructor(inputEl, view, onComplete) {
      this.autoUpload = dom_default.isAutoUpload(inputEl);
      this.view = view;
      this.onComplete = onComplete;
      this._entries = Array.from(
        _LiveUploader.filesAwaitingPreflight(inputEl) || []
      ).map((file) => new UploadEntry(inputEl, file, view, this.autoUpload));
      _LiveUploader.markPreflightInProgress(this._entries);
      this.numEntriesInProgress = this._entries.length;
    }
    isAutoUpload() {
      return this.autoUpload;
    }
    entries() {
      return this._entries;
    }
    initAdapterUpload(resp, onError, liveSocket2) {
      this._entries = this._entries.map((entry) => {
        if (entry.isCancelled()) {
          this.numEntriesInProgress--;
          if (this.numEntriesInProgress === 0) {
            this.onComplete();
          }
        } else {
          entry.zipPostFlight(resp);
          entry.onDone(() => {
            this.numEntriesInProgress--;
            if (this.numEntriesInProgress === 0) {
              this.onComplete();
            }
          });
        }
        return entry;
      });
      const groupedEntries = this._entries.reduce((acc, entry) => {
        if (!entry.meta) {
          return acc;
        }
        const { name, callback } = entry.uploader(liveSocket2.uploaders);
        acc[name] = acc[name] || { callback, entries: [] };
        acc[name].entries.push(entry);
        return acc;
      }, {});
      for (const name in groupedEntries) {
        const { callback, entries } = groupedEntries[name];
        callback(entries, onError, resp, liveSocket2);
      }
    }
  };
  var ARIA = {
    anyOf(instance, classes) {
      return classes.some((name) => instance instanceof name);
    },
    isFocusable(el, interactiveOnly = false) {
      return el instanceof HTMLAnchorElement && el.rel !== "ignore" || el instanceof HTMLAreaElement && el.href !== void 0 || !("disabled" in el && el.disabled) && this.anyOf(el, [
        HTMLInputElement,
        HTMLSelectElement,
        HTMLTextAreaElement,
        HTMLButtonElement
      ]) || el instanceof HTMLIFrameElement || el instanceof HTMLElement && el.tabIndex >= 0 && el.getAttribute("aria-hidden") !== "true" || !interactiveOnly && el.getAttribute("tabindex") !== null && el.getAttribute("aria-hidden") !== "true";
    },
    attemptFocus(el, interactiveOnly = false) {
      if (this.isFocusable(el, interactiveOnly)) {
        try {
          el.focus();
        } catch (e) {
        }
      }
      return !!document.activeElement && document.activeElement.isSameNode(el);
    },
    focusFirstInteractive(el) {
      let child = el.firstElementChild;
      while (child) {
        if (this.attemptFocus(child, true) || this.focusFirstInteractive(child)) {
          return true;
        }
        child = child.nextElementSibling;
      }
      return false;
    },
    focusFirst(el) {
      let child = el.firstElementChild;
      while (child) {
        if (this.attemptFocus(child) || this.focusFirst(child)) {
          return true;
        }
        child = child.nextElementSibling;
      }
      return false;
    },
    focusLast(el) {
      let child = el.lastElementChild;
      while (child) {
        if (this.attemptFocus(child) || this.focusLast(child)) {
          return true;
        }
        child = child.previousElementSibling;
      }
      return false;
    }
  };
  var aria_default = ARIA;
  var findScrollContainer = (el) => {
    if (["HTML", "BODY"].indexOf(el.nodeName.toUpperCase()) >= 0)
      return null;
    if (["scroll", "auto"].indexOf(getComputedStyle(el).overflowY) >= 0)
      return el;
    return findScrollContainer(el.parentElement);
  };
  var scrollTop = (scrollContainer) => {
    if (scrollContainer) {
      return scrollContainer.scrollTop;
    } else {
      return document.documentElement.scrollTop || document.body.scrollTop;
    }
  };
  var bottom = (scrollContainer) => {
    if (scrollContainer) {
      return scrollContainer.getBoundingClientRect().bottom;
    } else {
      return window.innerHeight || document.documentElement.clientHeight;
    }
  };
  var top = (scrollContainer) => {
    if (scrollContainer) {
      return scrollContainer.getBoundingClientRect().top;
    } else {
      return 0;
    }
  };
  var isAtViewportTop = (el, scrollContainer) => {
    const rect = el.getBoundingClientRect();
    return Math.ceil(rect.top) >= top(scrollContainer) && Math.floor(rect.top) <= bottom(scrollContainer);
  };
  var isAtViewportBottom = (el, scrollContainer) => {
    const rect = el.getBoundingClientRect();
    return Math.ceil(rect.bottom) >= top(scrollContainer) && Math.floor(rect.bottom) <= bottom(scrollContainer);
  };
  var isWithinViewport = (el, scrollContainer) => {
    const rect = el.getBoundingClientRect();
    return Math.ceil(rect.top) >= top(scrollContainer) && Math.floor(rect.top) <= bottom(scrollContainer);
  };
  var InfiniteScroll = {
    mounted() {
      this.scrollContainer = findScrollContainer(this.el);
      let scrollBefore = scrollTop(this.scrollContainer);
      let topOverran = false;
      const throttleInterval = 500;
      let pendingOp = null;
      const onTopOverrun = this.throttle(
        throttleInterval,
        (topEvent, firstChild) => {
          pendingOp = () => true;
          this.liveSocket.js().push(this.el, topEvent, {
            value: { id: firstChild.id, _overran: true },
            callback: () => {
              pendingOp = null;
            }
          });
        }
      );
      const onFirstChildAtTop = this.throttle(
        throttleInterval,
        (topEvent, firstChild) => {
          pendingOp = () => firstChild.scrollIntoView({ block: "start" });
          this.liveSocket.js().push(this.el, topEvent, {
            value: { id: firstChild.id },
            callback: () => {
              pendingOp = null;
              window.requestAnimationFrame(() => {
                if (!isWithinViewport(firstChild, this.scrollContainer)) {
                  firstChild.scrollIntoView({ block: "start" });
                }
              });
            }
          });
        }
      );
      const onLastChildAtBottom = this.throttle(
        throttleInterval,
        (bottomEvent, lastChild) => {
          pendingOp = () => lastChild.scrollIntoView({ block: "end" });
          this.liveSocket.js().push(this.el, bottomEvent, {
            value: { id: lastChild.id },
            callback: () => {
              pendingOp = null;
              window.requestAnimationFrame(() => {
                if (!isWithinViewport(lastChild, this.scrollContainer)) {
                  lastChild.scrollIntoView({ block: "end" });
                }
              });
            }
          });
        }
      );
      this.onScroll = (_e) => {
        const scrollNow = scrollTop(this.scrollContainer);
        if (pendingOp) {
          scrollBefore = scrollNow;
          return pendingOp();
        }
        const rect = this.findOverrunTarget();
        const topEvent = this.el.getAttribute(
          this.liveSocket.binding("viewport-top")
        );
        const bottomEvent = this.el.getAttribute(
          this.liveSocket.binding("viewport-bottom")
        );
        const lastChild = this.el.lastElementChild;
        const firstChild = this.el.firstElementChild;
        const isScrollingUp = scrollNow < scrollBefore;
        const isScrollingDown = scrollNow > scrollBefore;
        if (isScrollingUp && topEvent && !topOverran && rect.top >= 0) {
          topOverran = true;
          onTopOverrun(topEvent, firstChild);
        } else if (isScrollingDown && topOverran && rect.top <= 0) {
          topOverran = false;
        }
        if (topEvent && isScrollingUp && firstChild && isAtViewportTop(firstChild, this.scrollContainer)) {
          onFirstChildAtTop(topEvent, firstChild);
        } else if (bottomEvent && isScrollingDown && lastChild && isAtViewportBottom(lastChild, this.scrollContainer)) {
          onLastChildAtBottom(bottomEvent, lastChild);
        }
        scrollBefore = scrollNow;
      };
      if (this.scrollContainer) {
        this.scrollContainer.addEventListener("scroll", this.onScroll);
      } else {
        window.addEventListener("scroll", this.onScroll);
      }
    },
    updated() {
      if (this.scrollContainer && !this.scrollContainer.isConnected) {
        this.destroyed();
        this.mounted();
      }
    },
    destroyed() {
      if (this.scrollContainer) {
        this.scrollContainer.removeEventListener("scroll", this.onScroll);
      } else {
        window.removeEventListener("scroll", this.onScroll);
      }
    },
    throttle(interval, callback) {
      let lastCallAt = 0;
      let timer;
      return (...args) => {
        const now = Date.now();
        const remainingTime = interval - (now - lastCallAt);
        if (remainingTime <= 0 || remainingTime > interval) {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          lastCallAt = now;
          callback(...args);
        } else if (!timer) {
          timer = setTimeout(() => {
            lastCallAt = Date.now();
            timer = null;
            callback(...args);
          }, remainingTime);
        }
      };
    },
    findOverrunTarget() {
      let rect;
      const overrunTarget = this.el.getAttribute(
        this.liveSocket.binding(PHX_VIEWPORT_OVERRUN_TARGET)
      );
      if (overrunTarget) {
        const overrunEl = document.getElementById(overrunTarget);
        if (overrunEl) {
          rect = overrunEl.getBoundingClientRect();
        } else {
          throw new Error("did not find element with id " + overrunTarget);
        }
      } else {
        rect = this.el.getBoundingClientRect();
      }
      return rect;
    }
  };
  var LiveFileUpload = {
    activeRefs() {
      return this.el.getAttribute(PHX_ACTIVE_ENTRY_REFS);
    },
    preflightedRefs() {
      return this.el.getAttribute(PHX_PREFLIGHTED_REFS);
    },
    mounted() {
      this.js().ignoreAttributes(this.el, ["value"]);
      this.preflightedWas = this.preflightedRefs();
    },
    updated() {
      const newPreflights = this.preflightedRefs();
      if (this.preflightedWas !== newPreflights) {
        this.preflightedWas = newPreflights;
        if (newPreflights === "") {
          this.__view().cancelSubmit(this.el.form);
        }
      }
      if (this.activeRefs() === "") {
        this.el.value = "";
      }
      this.el.dispatchEvent(new CustomEvent(PHX_LIVE_FILE_UPDATED));
    }
  };
  var LiveImgPreview = {
    mounted() {
      this.ref = this.el.getAttribute("data-phx-entry-ref");
      this.inputEl = document.getElementById(
        this.el.getAttribute(PHX_UPLOAD_REF)
      );
      this.url = LiveUploader.getEntryDataURL(this.inputEl, this.ref);
      this.el.src = this.url;
    },
    destroyed() {
      URL.revokeObjectURL(this.url);
    }
  };
  var Hooks = {
    LiveFileUpload,
    LiveImgPreview,
    FocusWrap: {
      mounted() {
        this.focusStart = this.el.firstElementChild;
        this.focusEnd = this.el.lastElementChild;
        this.focusStart.addEventListener("focus", (e) => {
          if (!e.relatedTarget || !this.el.contains(e.relatedTarget)) {
            const nextFocus = e.target.nextElementSibling;
            aria_default.attemptFocus(nextFocus) || aria_default.focusFirst(nextFocus);
          } else {
            aria_default.focusLast(this.el);
          }
        });
        this.focusEnd.addEventListener("focus", (e) => {
          if (!e.relatedTarget || !this.el.contains(e.relatedTarget)) {
            const nextFocus = e.target.previousElementSibling;
            aria_default.attemptFocus(nextFocus) || aria_default.focusLast(nextFocus);
          } else {
            aria_default.focusFirst(this.el);
          }
        });
        if (!this.el.contains(document.activeElement)) {
          this.el.addEventListener("phx:show-end", () => this.el.focus());
          if (window.getComputedStyle(this.el).display !== "none") {
            aria_default.focusFirst(this.el);
          }
        }
      }
    },
    InfiniteScroll
  };
  var hooks_default = Hooks;
  var ElementRef = class {
    static onUnlock(el, callback) {
      if (!dom_default.isLocked(el) && !el.closest(`[${PHX_REF_LOCK}]`)) {
        return callback();
      }
      const closestLock = el.closest(`[${PHX_REF_LOCK}]`);
      const ref = closestLock.closest(`[${PHX_REF_LOCK}]`).getAttribute(PHX_REF_LOCK);
      closestLock.addEventListener(
        `phx:undo-lock:${ref}`,
        () => {
          callback();
        },
        { once: true }
      );
    }
    constructor(el) {
      this.el = el;
      this.loadingRef = el.hasAttribute(PHX_REF_LOADING) ? parseInt(el.getAttribute(PHX_REF_LOADING), 10) : null;
      this.lockRef = el.hasAttribute(PHX_REF_LOCK) ? parseInt(el.getAttribute(PHX_REF_LOCK), 10) : null;
    }
    // public
    maybeUndo(ref, phxEvent, eachCloneCallback) {
      if (!this.isWithin(ref)) {
        dom_default.updatePrivate(this.el, PHX_PENDING_REFS, [], (pendingRefs) => {
          pendingRefs.push(ref);
          return pendingRefs;
        });
        return;
      }
      this.undoLocks(ref, phxEvent, eachCloneCallback);
      this.undoLoading(ref, phxEvent);
      dom_default.updatePrivate(this.el, PHX_PENDING_REFS, [], (pendingRefs) => {
        return pendingRefs.filter((pendingRef) => {
          let opts = {
            detail: { ref: pendingRef, event: phxEvent },
            bubbles: true,
            cancelable: false
          };
          if (this.loadingRef && this.loadingRef > pendingRef) {
            this.el.dispatchEvent(
              new CustomEvent(`phx:undo-loading:${pendingRef}`, opts)
            );
          }
          if (this.lockRef && this.lockRef > pendingRef) {
            this.el.dispatchEvent(
              new CustomEvent(`phx:undo-lock:${pendingRef}`, opts)
            );
          }
          return pendingRef > ref;
        });
      });
      if (this.isFullyResolvedBy(ref)) {
        this.el.removeAttribute(PHX_REF_SRC);
      }
    }
    // private
    isWithin(ref) {
      return !(this.loadingRef !== null && this.loadingRef > ref && this.lockRef !== null && this.lockRef > ref);
    }
    // Check for cloned PHX_REF_LOCK element that has been morphed behind
    // the scenes while this element was locked in the DOM.
    // When we apply the cloned tree to the active DOM element, we must
    //
    //   1. execute pending mounted hooks for nodes now in the DOM
    //   2. undo any ref inside the cloned tree that has since been ack'd
    undoLocks(ref, phxEvent, eachCloneCallback) {
      if (!this.isLockUndoneBy(ref)) {
        return;
      }
      const clonedTree = dom_default.private(this.el, PHX_REF_LOCK);
      if (clonedTree) {
        eachCloneCallback(clonedTree);
        dom_default.deletePrivate(this.el, PHX_REF_LOCK);
      }
      this.el.removeAttribute(PHX_REF_LOCK);
      const opts = {
        detail: { ref, event: phxEvent },
        bubbles: true,
        cancelable: false
      };
      this.el.dispatchEvent(
        new CustomEvent(`phx:undo-lock:${this.lockRef}`, opts)
      );
    }
    undoLoading(ref, phxEvent) {
      if (!this.isLoadingUndoneBy(ref)) {
        if (this.canUndoLoading(ref) && this.el.classList.contains("phx-submit-loading")) {
          this.el.classList.remove("phx-change-loading");
        }
        return;
      }
      if (this.canUndoLoading(ref)) {
        this.el.removeAttribute(PHX_REF_LOADING);
        const disabledVal = this.el.getAttribute(PHX_DISABLED);
        const readOnlyVal = this.el.getAttribute(PHX_READONLY);
        if (readOnlyVal !== null && "readOnly" in this.el) {
          this.el.readOnly = readOnlyVal === "true" ? true : false;
          this.el.removeAttribute(PHX_READONLY);
        }
        if (disabledVal !== null && "disabled" in this.el) {
          this.el.disabled = disabledVal === "true" ? true : false;
          this.el.removeAttribute(PHX_DISABLED);
        }
        const disableRestore = this.el.getAttribute(PHX_DISABLE_WITH_RESTORE);
        if (disableRestore !== null) {
          this.el.textContent = disableRestore;
          this.el.removeAttribute(PHX_DISABLE_WITH_RESTORE);
        }
        const opts = {
          detail: { ref, event: phxEvent },
          bubbles: true,
          cancelable: false
        };
        this.el.dispatchEvent(
          new CustomEvent(`phx:undo-loading:${this.loadingRef}`, opts)
        );
      }
      PHX_EVENT_CLASSES.forEach((name) => {
        if (name !== "phx-submit-loading" || this.canUndoLoading(ref)) {
          dom_default.removeClass(this.el, name);
        }
      });
    }
    isLoadingUndoneBy(ref) {
      return this.loadingRef === null ? false : this.loadingRef <= ref;
    }
    /** @internal */
    isLockUndoneBy(ref) {
      return this.lockRef === null ? false : this.lockRef <= ref;
    }
    isFullyResolvedBy(ref) {
      return (this.loadingRef === null || this.loadingRef <= ref) && (this.lockRef === null || this.lockRef <= ref);
    }
    // only remove the phx-submit-loading class if we are not locked
    canUndoLoading(ref) {
      return this.lockRef === null || this.lockRef <= ref;
    }
  };
  var DOMPostMorphRestorer = class {
    constructor(containerBefore, containerAfter, updateType) {
      const idsBefore = /* @__PURE__ */ new Set();
      const idsAfter = new Set(
        [...containerAfter.children].map((child) => child.id)
      );
      const elementsToModify = [];
      Array.from(containerBefore.children).forEach((child) => {
        if (child.id) {
          idsBefore.add(child.id);
          if (idsAfter.has(child.id)) {
            const previousElementId = child.previousElementSibling && child.previousElementSibling.id;
            elementsToModify.push({
              elementId: child.id,
              previousElementId
            });
          }
        }
      });
      this.containerId = containerAfter.id;
      this.updateType = updateType;
      this.elementsToModify = elementsToModify;
      this.elementIdsToAdd = [...idsAfter].filter((id) => !idsBefore.has(id));
    }
    // We do the following to optimize append/prepend operations:
    //   1) Track ids of modified elements & of new elements
    //   2) All the modified elements are put back in the correct position in the DOM tree
    //      by storing the id of their previous sibling
    //   3) New elements are going to be put in the right place by morphdom during append.
    //      For prepend, we move them to the first position in the container
    perform() {
      const container = dom_default.byId(this.containerId);
      if (!container) {
        return;
      }
      this.elementsToModify.forEach((elementToModify) => {
        if (elementToModify.previousElementId) {
          maybe(
            document.getElementById(elementToModify.previousElementId),
            (previousElem) => {
              maybe(
                document.getElementById(elementToModify.elementId),
                (elem) => {
                  const isInRightPlace = elem.previousElementSibling && elem.previousElementSibling.id == previousElem.id;
                  if (!isInRightPlace) {
                    previousElem.insertAdjacentElement("afterend", elem);
                  }
                }
              );
            }
          );
        } else {
          maybe(document.getElementById(elementToModify.elementId), (elem) => {
            const isInRightPlace = elem.previousElementSibling == null;
            if (!isInRightPlace) {
              container.insertAdjacentElement("afterbegin", elem);
            }
          });
        }
      });
      if (this.updateType == "prepend") {
        this.elementIdsToAdd.reverse().forEach((elemId) => {
          maybe(
            document.getElementById(elemId),
            (elem) => container.insertAdjacentElement("afterbegin", elem)
          );
        });
      }
    }
  };
  var DOCUMENT_FRAGMENT_NODE = 11;
  function morphAttrs(fromNode, toNode) {
    var toNodeAttrs = toNode.attributes;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;
    if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE || fromNode.nodeType === DOCUMENT_FRAGMENT_NODE) {
      return;
    }
    for (var i = toNodeAttrs.length - 1; i >= 0; i--) {
      attr = toNodeAttrs[i];
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;
      attrValue = attr.value;
      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);
        if (fromValue !== attrValue) {
          if (attr.prefix === "xmlns") {
            attrName = attr.name;
          }
          fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
        }
      } else {
        fromValue = fromNode.getAttribute(attrName);
        if (fromValue !== attrValue) {
          fromNode.setAttribute(attrName, attrValue);
        }
      }
    }
    var fromNodeAttrs = fromNode.attributes;
    for (var d = fromNodeAttrs.length - 1; d >= 0; d--) {
      attr = fromNodeAttrs[d];
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;
      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        if (!toNode.hasAttributeNS(attrNamespaceURI, attrName)) {
          fromNode.removeAttributeNS(attrNamespaceURI, attrName);
        }
      } else {
        if (!toNode.hasAttribute(attrName)) {
          fromNode.removeAttribute(attrName);
        }
      }
    }
  }
  var range;
  var NS_XHTML = "http://www.w3.org/1999/xhtml";
  var doc = typeof document === "undefined" ? void 0 : document;
  var HAS_TEMPLATE_SUPPORT = !!doc && "content" in doc.createElement("template");
  var HAS_RANGE_SUPPORT = !!doc && doc.createRange && "createContextualFragment" in doc.createRange();
  function createFragmentFromTemplate(str) {
    var template = doc.createElement("template");
    template.innerHTML = str;
    return template.content.childNodes[0];
  }
  function createFragmentFromRange(str) {
    if (!range) {
      range = doc.createRange();
      range.selectNode(doc.body);
    }
    var fragment = range.createContextualFragment(str);
    return fragment.childNodes[0];
  }
  function createFragmentFromWrap(str) {
    var fragment = doc.createElement("body");
    fragment.innerHTML = str;
    return fragment.childNodes[0];
  }
  function toElement(str) {
    str = str.trim();
    if (HAS_TEMPLATE_SUPPORT) {
      return createFragmentFromTemplate(str);
    } else if (HAS_RANGE_SUPPORT) {
      return createFragmentFromRange(str);
    }
    return createFragmentFromWrap(str);
  }
  function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;
    var fromCodeStart, toCodeStart;
    if (fromNodeName === toNodeName) {
      return true;
    }
    fromCodeStart = fromNodeName.charCodeAt(0);
    toCodeStart = toNodeName.charCodeAt(0);
    if (fromCodeStart <= 90 && toCodeStart >= 97) {
      return fromNodeName === toNodeName.toUpperCase();
    } else if (toCodeStart <= 90 && fromCodeStart >= 97) {
      return toNodeName === fromNodeName.toUpperCase();
    } else {
      return false;
    }
  }
  function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ? doc.createElement(name) : doc.createElementNS(namespaceURI, name);
  }
  function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
      var nextChild = curChild.nextSibling;
      toEl.appendChild(curChild);
      curChild = nextChild;
    }
    return toEl;
  }
  function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
      fromEl[name] = toEl[name];
      if (fromEl[name]) {
        fromEl.setAttribute(name, "");
      } else {
        fromEl.removeAttribute(name);
      }
    }
  }
  var specialElHandlers = {
    OPTION: function(fromEl, toEl) {
      var parentNode = fromEl.parentNode;
      if (parentNode) {
        var parentName = parentNode.nodeName.toUpperCase();
        if (parentName === "OPTGROUP") {
          parentNode = parentNode.parentNode;
          parentName = parentNode && parentNode.nodeName.toUpperCase();
        }
        if (parentName === "SELECT" && !parentNode.hasAttribute("multiple")) {
          if (fromEl.hasAttribute("selected") && !toEl.selected) {
            fromEl.setAttribute("selected", "selected");
            fromEl.removeAttribute("selected");
          }
          parentNode.selectedIndex = -1;
        }
      }
      syncBooleanAttrProp(fromEl, toEl, "selected");
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function(fromEl, toEl) {
      syncBooleanAttrProp(fromEl, toEl, "checked");
      syncBooleanAttrProp(fromEl, toEl, "disabled");
      if (fromEl.value !== toEl.value) {
        fromEl.value = toEl.value;
      }
      if (!toEl.hasAttribute("value")) {
        fromEl.removeAttribute("value");
      }
    },
    TEXTAREA: function(fromEl, toEl) {
      var newValue = toEl.value;
      if (fromEl.value !== newValue) {
        fromEl.value = newValue;
      }
      var firstChild = fromEl.firstChild;
      if (firstChild) {
        var oldValue = firstChild.nodeValue;
        if (oldValue == newValue || !newValue && oldValue == fromEl.placeholder) {
          return;
        }
        firstChild.nodeValue = newValue;
      }
    },
    SELECT: function(fromEl, toEl) {
      if (!toEl.hasAttribute("multiple")) {
        var selectedIndex = -1;
        var i = 0;
        var curChild = fromEl.firstChild;
        var optgroup;
        var nodeName;
        while (curChild) {
          nodeName = curChild.nodeName && curChild.nodeName.toUpperCase();
          if (nodeName === "OPTGROUP") {
            optgroup = curChild;
            curChild = optgroup.firstChild;
            if (!curChild) {
              curChild = optgroup.nextSibling;
              optgroup = null;
            }
          } else {
            if (nodeName === "OPTION") {
              if (curChild.hasAttribute("selected")) {
                selectedIndex = i;
                break;
              }
              i++;
            }
            curChild = curChild.nextSibling;
            if (!curChild && optgroup) {
              curChild = optgroup.nextSibling;
              optgroup = null;
            }
          }
        }
        fromEl.selectedIndex = selectedIndex;
      }
    }
  };
  var ELEMENT_NODE = 1;
  var DOCUMENT_FRAGMENT_NODE$1 = 11;
  var TEXT_NODE = 3;
  var COMMENT_NODE = 8;
  function noop() {
  }
  function defaultGetNodeKey(node) {
    if (node) {
      return node.getAttribute && node.getAttribute("id") || node.id;
    }
  }
  function morphdomFactory(morphAttrs2) {
    return function morphdom2(fromNode, toNode, options) {
      if (!options) {
        options = {};
      }
      if (typeof toNode === "string") {
        if (fromNode.nodeName === "#document" || fromNode.nodeName === "HTML") {
          var toNodeHtml = toNode;
          toNode = doc.createElement("html");
          toNode.innerHTML = toNodeHtml;
        } else if (fromNode.nodeName === "BODY") {
          var toNodeBody = toNode;
          toNode = doc.createElement("html");
          toNode.innerHTML = toNodeBody;
          var bodyElement = toNode.querySelector("body");
          if (bodyElement) {
            toNode = bodyElement;
          }
        } else {
          toNode = toElement(toNode);
        }
      } else if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
        toNode = toNode.firstElementChild;
      }
      var getNodeKey = options.getNodeKey || defaultGetNodeKey;
      var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
      var onNodeAdded = options.onNodeAdded || noop;
      var onBeforeElUpdated = options.onBeforeElUpdated || noop;
      var onElUpdated = options.onElUpdated || noop;
      var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
      var onNodeDiscarded = options.onNodeDiscarded || noop;
      var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
      var skipFromChildren = options.skipFromChildren || noop;
      var addChild = options.addChild || function(parent, child) {
        return parent.appendChild(child);
      };
      var childrenOnly = options.childrenOnly === true;
      var fromNodesLookup = /* @__PURE__ */ Object.create(null);
      var keyedRemovalList = [];
      function addKeyedRemoval(key) {
        keyedRemovalList.push(key);
      }
      function walkDiscardedChildNodes(node, skipKeyedNodes) {
        if (node.nodeType === ELEMENT_NODE) {
          var curChild = node.firstChild;
          while (curChild) {
            var key = void 0;
            if (skipKeyedNodes && (key = getNodeKey(curChild))) {
              addKeyedRemoval(key);
            } else {
              onNodeDiscarded(curChild);
              if (curChild.firstChild) {
                walkDiscardedChildNodes(curChild, skipKeyedNodes);
              }
            }
            curChild = curChild.nextSibling;
          }
        }
      }
      function removeNode(node, parentNode, skipKeyedNodes) {
        if (onBeforeNodeDiscarded(node) === false) {
          return;
        }
        if (parentNode) {
          parentNode.removeChild(node);
        }
        onNodeDiscarded(node);
        walkDiscardedChildNodes(node, skipKeyedNodes);
      }
      function indexTree(node) {
        if (node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
          var curChild = node.firstChild;
          while (curChild) {
            var key = getNodeKey(curChild);
            if (key) {
              fromNodesLookup[key] = curChild;
            }
            indexTree(curChild);
            curChild = curChild.nextSibling;
          }
        }
      }
      indexTree(fromNode);
      function handleNodeAdded(el) {
        onNodeAdded(el);
        var curChild = el.firstChild;
        while (curChild) {
          var nextSibling = curChild.nextSibling;
          var key = getNodeKey(curChild);
          if (key) {
            var unmatchedFromEl = fromNodesLookup[key];
            if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
              curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
              morphEl(unmatchedFromEl, curChild);
            } else {
              handleNodeAdded(curChild);
            }
          } else {
            handleNodeAdded(curChild);
          }
          curChild = nextSibling;
        }
      }
      function cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey) {
        while (curFromNodeChild) {
          var fromNextSibling = curFromNodeChild.nextSibling;
          if (curFromNodeKey = getNodeKey(curFromNodeChild)) {
            addKeyedRemoval(curFromNodeKey);
          } else {
            removeNode(
              curFromNodeChild,
              fromEl,
              true
              /* skip keyed nodes */
            );
          }
          curFromNodeChild = fromNextSibling;
        }
      }
      function morphEl(fromEl, toEl, childrenOnly2) {
        var toElKey = getNodeKey(toEl);
        if (toElKey) {
          delete fromNodesLookup[toElKey];
        }
        if (!childrenOnly2) {
          var beforeUpdateResult = onBeforeElUpdated(fromEl, toEl);
          if (beforeUpdateResult === false) {
            return;
          } else if (beforeUpdateResult instanceof HTMLElement) {
            fromEl = beforeUpdateResult;
            indexTree(fromEl);
          }
          morphAttrs2(fromEl, toEl);
          onElUpdated(fromEl);
          if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
            return;
          }
        }
        if (fromEl.nodeName !== "TEXTAREA") {
          morphChildren(fromEl, toEl);
        } else {
          specialElHandlers.TEXTAREA(fromEl, toEl);
        }
      }
      function morphChildren(fromEl, toEl) {
        var skipFrom = skipFromChildren(fromEl, toEl);
        var curToNodeChild = toEl.firstChild;
        var curFromNodeChild = fromEl.firstChild;
        var curToNodeKey;
        var curFromNodeKey;
        var fromNextSibling;
        var toNextSibling;
        var matchingFromEl;
        outer:
          while (curToNodeChild) {
            toNextSibling = curToNodeChild.nextSibling;
            curToNodeKey = getNodeKey(curToNodeChild);
            while (!skipFrom && curFromNodeChild) {
              fromNextSibling = curFromNodeChild.nextSibling;
              if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
                continue outer;
              }
              curFromNodeKey = getNodeKey(curFromNodeChild);
              var curFromNodeType = curFromNodeChild.nodeType;
              var isCompatible = void 0;
              if (curFromNodeType === curToNodeChild.nodeType) {
                if (curFromNodeType === ELEMENT_NODE) {
                  if (curToNodeKey) {
                    if (curToNodeKey !== curFromNodeKey) {
                      if (matchingFromEl = fromNodesLookup[curToNodeKey]) {
                        if (fromNextSibling === matchingFromEl) {
                          isCompatible = false;
                        } else {
                          fromEl.insertBefore(matchingFromEl, curFromNodeChild);
                          if (curFromNodeKey) {
                            addKeyedRemoval(curFromNodeKey);
                          } else {
                            removeNode(
                              curFromNodeChild,
                              fromEl,
                              true
                              /* skip keyed nodes */
                            );
                          }
                          curFromNodeChild = matchingFromEl;
                          curFromNodeKey = getNodeKey(curFromNodeChild);
                        }
                      } else {
                        isCompatible = false;
                      }
                    }
                  } else if (curFromNodeKey) {
                    isCompatible = false;
                  }
                  isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                  if (isCompatible) {
                    morphEl(curFromNodeChild, curToNodeChild);
                  }
                } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                  isCompatible = true;
                  if (curFromNodeChild.nodeValue !== curToNodeChild.nodeValue) {
                    curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                  }
                }
              }
              if (isCompatible) {
                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
                continue outer;
              }
              if (curFromNodeKey) {
                addKeyedRemoval(curFromNodeKey);
              } else {
                removeNode(
                  curFromNodeChild,
                  fromEl,
                  true
                  /* skip keyed nodes */
                );
              }
              curFromNodeChild = fromNextSibling;
            }
            if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
              if (!skipFrom) {
                addChild(fromEl, matchingFromEl);
              }
              morphEl(matchingFromEl, curToNodeChild);
            } else {
              var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
              if (onBeforeNodeAddedResult !== false) {
                if (onBeforeNodeAddedResult) {
                  curToNodeChild = onBeforeNodeAddedResult;
                }
                if (curToNodeChild.actualize) {
                  curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                }
                addChild(fromEl, curToNodeChild);
                handleNodeAdded(curToNodeChild);
              }
            }
            curToNodeChild = toNextSibling;
            curFromNodeChild = fromNextSibling;
          }
        cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey);
        var specialElHandler = specialElHandlers[fromEl.nodeName];
        if (specialElHandler) {
          specialElHandler(fromEl, toEl);
        }
      }
      var morphedNode = fromNode;
      var morphedNodeType = morphedNode.nodeType;
      var toNodeType = toNode.nodeType;
      if (!childrenOnly) {
        if (morphedNodeType === ELEMENT_NODE) {
          if (toNodeType === ELEMENT_NODE) {
            if (!compareNodeNames(fromNode, toNode)) {
              onNodeDiscarded(fromNode);
              morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
            }
          } else {
            morphedNode = toNode;
          }
        } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) {
          if (toNodeType === morphedNodeType) {
            if (morphedNode.nodeValue !== toNode.nodeValue) {
              morphedNode.nodeValue = toNode.nodeValue;
            }
            return morphedNode;
          } else {
            morphedNode = toNode;
          }
        }
      }
      if (morphedNode === toNode) {
        onNodeDiscarded(fromNode);
      } else {
        if (toNode.isSameNode && toNode.isSameNode(morphedNode)) {
          return;
        }
        morphEl(morphedNode, toNode, childrenOnly);
        if (keyedRemovalList) {
          for (var i = 0, len = keyedRemovalList.length; i < len; i++) {
            var elToRemove = fromNodesLookup[keyedRemovalList[i]];
            if (elToRemove) {
              removeNode(elToRemove, elToRemove.parentNode, false);
            }
          }
        }
      }
      if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
        if (morphedNode.actualize) {
          morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
        }
        fromNode.parentNode.replaceChild(morphedNode, fromNode);
      }
      return morphedNode;
    };
  }
  var morphdom = morphdomFactory(morphAttrs);
  var morphdom_esm_default = morphdom;
  var DOMPatch = class {
    constructor(view, container, html, streams, targetCID, opts = {}) {
      var _a;
      this.view = view;
      this.liveSocket = view.liveSocket;
      this.container = container;
      this.rootID = view.root.id;
      this.html = html;
      this.streams = streams;
      this.streamInserts = {};
      this.streamComponentRestore = {};
      this.targetCID = targetCID;
      this.pendingRemoves = [];
      this.phxRemove = this.liveSocket.binding("remove");
      this.targetContainer = targetCID ? dom_default.getComponent(this.view.id, targetCID) : container;
      this.beforeUpdatedCallbacks = [];
      this.afterAddedCallbacks = [];
      this.afterUpdatedCallbacks = [];
      this.afterPhxChildAddedCallbacks = [];
      this.afterDiscardedCallbacks = [];
      this.afterTransitionsDiscardedCallbacks = [];
      this.withChildren = opts.withChildren || opts.undoRef !== void 0 || false;
      this.undoRef = (_a = opts.undoRef) != null ? _a : null;
    }
    beforeUpdated(callback) {
      this.beforeUpdatedCallbacks.push(callback);
    }
    afterAdded(callback) {
      this.afterAddedCallbacks.push(callback);
    }
    afterUpdated(callback) {
      this.afterUpdatedCallbacks.push(callback);
    }
    afterPhxChildAdded(callback) {
      this.afterPhxChildAddedCallbacks.push(callback);
    }
    afterDiscarded(callback) {
      this.afterDiscardedCallbacks.push(callback);
    }
    afterTransitionsDiscarded(callback) {
      this.afterTransitionsDiscardedCallbacks.push(callback);
    }
    markPrunableContentForRemoval() {
      const phxUpdate = this.liveSocket.binding(PHX_UPDATE);
      dom_default.all(
        this.container,
        `[${phxUpdate}=append] > *, [${phxUpdate}=prepend] > *`,
        (el) => {
          el.setAttribute(PHX_PRUNE, "");
        }
      );
    }
    perform(isJoinPatch) {
      const { view, liveSocket: liveSocket2, html, container } = this;
      let targetContainer = this.targetContainer;
      if (this.targetCID) {
        const closestLock = targetContainer.closest(`[${PHX_REF_LOCK}]`);
        if (closestLock && !closestLock.isSameNode(targetContainer)) {
          const clonedTree = dom_default.private(closestLock, PHX_REF_LOCK);
          if (clonedTree) {
            targetContainer = clonedTree.querySelector(
              `[data-phx-component="${this.targetCID}"]`
            );
            if (!targetContainer)
              return;
          }
        }
      }
      const focused = liveSocket2.getActiveElement();
      const { selectionStart, selectionEnd } = focused && dom_default.hasSelectionRange(focused) ? focused : {};
      const phxUpdate = liveSocket2.binding(PHX_UPDATE);
      const phxViewportTop = liveSocket2.binding(PHX_VIEWPORT_TOP);
      const phxViewportBottom = liveSocket2.binding(PHX_VIEWPORT_BOTTOM);
      const phxTriggerExternal = liveSocket2.binding(PHX_TRIGGER_ACTION);
      const added = [];
      const updates = [];
      const appendPrependUpdates = [];
      let portalCallbacks = [];
      let externalFormTriggered = null;
      const morph = (targetContainer2, source, withChildren = this.withChildren) => {
        const morphCallbacks = {
          // normally, we are running with childrenOnly, as the patch HTML for a LV
          // does not include the LV attrs (data-phx-session, etc.)
          // when we are patching a live component, we do want to patch the root element as well;
          // another case is the recursive patch of a stream item that was kept on reset (-> onBeforeNodeAdded)
          childrenOnly: targetContainer2.getAttribute(PHX_COMPONENT) === null && !withChildren,
          getNodeKey: (node) => {
            if (!(node instanceof Element))
              return null;
            if (dom_default.isPhxDestroyed(node)) {
              return null;
            }
            if (isJoinPatch) {
              return node.id;
            }
            if (dom_default.private(node, "clientsideIdAttribute")) {
              return node.getAttribute(PHX_MAGIC_ID);
            }
            return node.id || node.getAttribute(PHX_MAGIC_ID);
          },
          // skip indexing from children when container is stream
          skipFromChildren: (from) => {
            return from.getAttribute(phxUpdate) === PHX_STREAM;
          },
          // tell morphdom how to add a child
          addChild: (parent, child) => {
            const { ref, streamAt } = this.getStreamInsert(child);
            if (ref === void 0) {
              return parent.appendChild(child);
            }
            this.setStreamRef(child, ref);
            if (streamAt === 0) {
              parent.insertAdjacentElement("afterbegin", child);
            } else if (streamAt === -1) {
              const lastChild = parent.lastElementChild;
              if (lastChild && !lastChild.hasAttribute(PHX_STREAM_REF)) {
                const nonStreamChild = Array.from(parent.children).find(
                  (c) => !c.hasAttribute(PHX_STREAM_REF)
                );
                parent.insertBefore(child, nonStreamChild != null ? nonStreamChild : null);
              } else {
                parent.appendChild(child);
              }
            } else if (streamAt > 0) {
              const sibling = Array.from(parent.children)[streamAt];
              parent.insertBefore(child, sibling);
            }
          },
          onBeforeNodeAdded: (el) => {
            var _a;
            if (!(el instanceof Element)) {
              return el;
            }
            if (((_a = this.getStreamInsert(el)) == null ? void 0 : _a.updateOnly) && !this.streamComponentRestore[el.id]) {
              return false;
            }
            dom_default.maintainPrivateHooks(el, el, phxViewportTop, phxViewportBottom);
            let morphedEl = el;
            if (this.streamComponentRestore[el.id]) {
              morphedEl = this.streamComponentRestore[el.id];
              delete this.streamComponentRestore[el.id];
              morph(morphedEl, el, true);
            }
            return morphedEl;
          },
          onNodeAdded: (el) => {
            if (!(el instanceof Element)) {
              added.push(el);
              return;
            }
            this.maybeReOrderStream(el, true);
            if (dom_default.isPortalTemplate(el)) {
              portalCallbacks.push(() => this.teleport(el, morph));
            }
            if (el instanceof HTMLImageElement && el.srcset) {
              el.srcset = el.srcset;
            } else if (el instanceof HTMLVideoElement && el.autoplay) {
              el.play();
            }
            if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
              externalFormTriggered = el;
            }
            if (dom_default.isPhxChild(el) && view.ownsElement(el) || dom_default.isPhxSticky(el) && view.ownsElement(el.parentNode)) {
              this.trackAfterPhxChildAdded(el);
            }
            if (el.nodeName === "SCRIPT" && el.hasAttribute(PHX_RUNTIME_HOOK)) {
              this.handleRuntimeHook(el, source);
            }
            added.push(el);
          },
          onNodeDiscarded: (el) => this.onNodeDiscarded(el),
          onBeforeNodeDiscarded: (el) => {
            var _a;
            if (!(el instanceof Element)) {
              return true;
            }
            if (el.getAttribute(PHX_PRUNE) !== null) {
              return true;
            }
            if (el.parentElement !== null && el.id && dom_default.isPhxUpdate(el.parentElement, phxUpdate, [
              PHX_STREAM,
              "append",
              "prepend"
            ])) {
              return false;
            }
            if (el.getAttribute(PHX_TELEPORTED_REF)) {
              return false;
            }
            if (this.maybePendingRemove(el)) {
              return false;
            }
            if (this.skipCIDSibling(el)) {
              return false;
            }
            if (dom_default.isPortalTemplate(el)) {
              const teleportedEl = document.getElementById(
                ((_a = el.content.firstElementChild) == null ? void 0 : _a.id) || ""
              );
              if (teleportedEl) {
                teleportedEl.remove();
                morphCallbacks.onNodeDiscarded(teleportedEl);
                this.view.dropPortalElementId(teleportedEl.id);
              }
            }
            return true;
          },
          onElUpdated: (el) => {
            if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
              externalFormTriggered = el;
            }
            updates.push(el);
            this.maybeReOrderStream(el, false);
          },
          onBeforeElUpdated: (fromEl, toEl) => {
            if (fromEl.id && fromEl.isSameNode(targetContainer2) && fromEl.id !== toEl.id) {
              morphCallbacks.onNodeDiscarded(fromEl);
              fromEl.replaceWith(toEl);
              return morphCallbacks.onNodeAdded(toEl);
            }
            dom_default.syncPendingAttrs(fromEl, toEl);
            dom_default.maintainPrivateHooks(
              fromEl,
              toEl,
              phxViewportTop,
              phxViewportBottom
            );
            dom_default.cleanChildNodes(toEl, phxUpdate);
            const isFocusedFormEl = focused && fromEl.isSameNode(focused) && dom_default.isEditableInput(fromEl);
            const focusedSelectChanged = isFocusedFormEl && this.isChangedSelect(fromEl, toEl);
            if (this.skipCIDSibling(toEl)) {
              this.maybeCloneLockedElement(fromEl, isFocusedFormEl);
              this.copyNestedPrivateLock(fromEl, toEl);
              this.maybeReOrderStream(fromEl);
              return false;
            }
            if (dom_default.isPhxSticky(fromEl)) {
              [PHX_SESSION, PHX_STATIC, PHX_ROOT_ID].map((attr) => [
                attr,
                fromEl.getAttribute(attr),
                toEl.getAttribute(attr)
              ]).forEach(([attr, fromVal, toVal]) => {
                if (toVal && fromVal !== toVal) {
                  fromEl.setAttribute(attr, toVal);
                }
              });
              return false;
            }
            if (dom_default.isIgnored(fromEl, phxUpdate) || fromEl.form && fromEl.form.isSameNode(externalFormTriggered)) {
              this.trackBeforeUpdated(fromEl, toEl);
              dom_default.mergeAttrs(fromEl, toEl, {
                isIgnored: dom_default.isIgnored(fromEl, phxUpdate)
              });
              updates.push(fromEl);
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            if (fromEl.type === "number" && fromEl.validity && fromEl.validity.badInput) {
              return false;
            }
            fromEl = this.maybeCloneLockedElement(fromEl, isFocusedFormEl);
            if (dom_default.isPhxChild(toEl)) {
              const prevSession = fromEl.getAttribute(PHX_SESSION);
              dom_default.mergeAttrs(fromEl, toEl, { exclude: [PHX_STATIC] });
              if (prevSession !== "") {
                fromEl.setAttribute(PHX_SESSION, prevSession);
              }
              fromEl.setAttribute(PHX_ROOT_ID, this.rootID);
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            this.copyNestedPrivateLock(fromEl, toEl);
            dom_default.copyPrivates(toEl, fromEl);
            if (dom_default.isPortalTemplate(toEl)) {
              portalCallbacks.push(() => this.teleport(toEl, morph));
              fromEl.content.replaceChildren(toEl.content.cloneNode(true));
              return false;
            }
            if (isFocusedFormEl && fromEl.type !== "hidden" && !focusedSelectChanged) {
              this.trackBeforeUpdated(fromEl, toEl);
              dom_default.mergeFocusedInput(fromEl, toEl);
              dom_default.syncAttrsToProps(fromEl);
              updates.push(fromEl);
              dom_default.applyStickyOperations(fromEl);
              return false;
            } else {
              if (focusedSelectChanged) {
                fromEl.blur();
              }
              if (dom_default.isPhxUpdate(toEl, phxUpdate, ["append", "prepend"])) {
                appendPrependUpdates.push(
                  new DOMPostMorphRestorer(
                    fromEl,
                    toEl,
                    toEl.getAttribute(phxUpdate)
                  )
                );
              }
              dom_default.syncAttrsToProps(toEl);
              dom_default.applyStickyOperations(toEl);
              this.trackBeforeUpdated(fromEl, toEl);
              return fromEl;
            }
          }
        };
        morphdom_esm_default(targetContainer2, source, morphCallbacks);
      };
      this.trackBeforeUpdated(container, container);
      liveSocket2.time("morphdom", () => {
        this.streams.forEach(([ref, inserts, deleteIds, reset]) => {
          inserts.forEach(([key, streamAt, limit, updateOnly]) => {
            this.streamInserts[key] = { ref, streamAt, limit, reset, updateOnly };
          });
          if (reset !== void 0) {
            dom_default.all(document, `[${PHX_STREAM_REF}="${ref}"]`, (child) => {
              this.removeStreamChildElement(child);
            });
          }
          deleteIds.forEach((id) => {
            const child = document.getElementById(id);
            if (child) {
              this.removeStreamChildElement(child);
            }
          });
        });
        if (isJoinPatch) {
          dom_default.all(this.container, `[${phxUpdate}=${PHX_STREAM}]`).filter((el) => this.view.ownsElement(el)).forEach((el) => {
            Array.from(el.children).forEach((child) => {
              this.removeStreamChildElement(child, true);
            });
          });
        }
        morph(targetContainer, html);
        let teleportCount = 0;
        while (portalCallbacks.length > 0 && teleportCount < 5) {
          const copy = portalCallbacks.slice();
          portalCallbacks = [];
          copy.forEach((callback) => callback());
          teleportCount++;
        }
        this.view.portalElementIds.forEach((id) => {
          const el = document.getElementById(id);
          if (el) {
            const srcId = el.getAttribute(PHX_TELEPORTED_SRC);
            if (srcId) {
              const source = document.getElementById(srcId);
              if (!source) {
                el.remove();
                this.onNodeDiscarded(el);
                this.view.dropPortalElementId(id);
              }
            }
          }
        });
      });
      if (liveSocket2.isDebugEnabled()) {
        detectDuplicateIds();
        detectInvalidStreamInserts(this.streamInserts);
        Array.from(document.querySelectorAll("input[name=id]")).forEach(
          (node) => {
            if (node instanceof HTMLInputElement && node.form) {
              console.error(
                'Detected an input with name="id" inside a form! This will cause problems when patching the DOM.\n',
                node
              );
            }
          }
        );
      }
      if (appendPrependUpdates.length > 0) {
        liveSocket2.time("post-morph append/prepend restoration", () => {
          appendPrependUpdates.forEach((update) => update.perform());
        });
      }
      liveSocket2.silenceEvents(
        () => dom_default.restoreFocus(focused, selectionStart, selectionEnd)
      );
      dom_default.dispatchEvent(document, "phx:update");
      added.forEach((el) => this.trackAfterAdded(el));
      updates.forEach((el) => this.trackAfterUpdated(el));
      this.transitionPendingRemoves();
      if (externalFormTriggered) {
        liveSocket2.unload();
        const submitter = dom_default.private(externalFormTriggered, "submitter");
        if (submitter && submitter.name && targetContainer.contains(submitter)) {
          const input = document.createElement("input");
          input.type = "hidden";
          const formId = submitter.getAttribute("form");
          if (formId) {
            input.setAttribute("form", formId);
          }
          input.name = submitter.name;
          input.value = submitter.value;
          submitter.parentElement.insertBefore(input, submitter);
        }
        Object.getPrototypeOf(externalFormTriggered).submit.call(
          externalFormTriggered
        );
      }
      return true;
    }
    trackBeforeUpdated(fromEl, toEl) {
      this.beforeUpdatedCallbacks.forEach((cb) => cb(fromEl, toEl));
    }
    trackAfterAdded(el) {
      this.afterAddedCallbacks.forEach((cb) => cb(el));
    }
    trackAfterUpdated(el) {
      this.afterUpdatedCallbacks.forEach((cb) => cb(el));
    }
    trackAfterPhxChildAdded(el) {
      this.afterPhxChildAddedCallbacks.forEach((cb) => cb(el));
    }
    trackAfterDiscarded(el) {
      this.afterDiscardedCallbacks.forEach((cb) => cb(el));
    }
    trackAfterTransitionsDiscarded(els) {
      this.afterTransitionsDiscardedCallbacks.forEach((cb) => cb(els));
    }
    onNodeDiscarded(el) {
      if (dom_default.isPhxChild(el) || dom_default.isPhxSticky(el)) {
        this.liveSocket.destroyViewByEl(el);
      }
      this.trackAfterDiscarded(el);
    }
    maybePendingRemove(node) {
      if (node.getAttribute && node.getAttribute(this.phxRemove) !== null) {
        this.pendingRemoves.push(node);
        return true;
      } else {
        return false;
      }
    }
    removeStreamChildElement(child, force = false) {
      if (!force && !this.view.ownsElement(child)) {
        return;
      }
      if (this.streamInserts[child.id]) {
        this.streamComponentRestore[child.id] = child;
        child.remove();
      } else {
        if (!this.maybePendingRemove(child)) {
          child.remove();
          this.onNodeDiscarded(child);
        }
      }
    }
    getStreamInsert(el) {
      const insert = el.id ? this.streamInserts[el.id] : {};
      return insert || {};
    }
    setStreamRef(el, ref) {
      dom_default.putSticky(
        el,
        PHX_STREAM_REF,
        (el2) => el2.setAttribute(PHX_STREAM_REF, ref)
      );
    }
    maybeReOrderStream(el, isNew = false) {
      const { ref, streamAt, reset } = this.getStreamInsert(el);
      if (streamAt === void 0) {
        return;
      }
      this.setStreamRef(el, ref);
      if (!reset && !isNew) {
        return;
      }
      if (!el.parentElement) {
        return;
      }
      if (streamAt === 0) {
        this.moveOrInsertBefore(
          el.parentElement,
          el,
          el.parentElement.firstElementChild
        );
      } else if (streamAt > 0) {
        const children = Array.from(el.parentElement.children);
        const oldIndex = children.indexOf(el);
        if (streamAt >= children.length - 1) {
          this.moveOrInsertBefore(el.parentElement, el, null);
        } else {
          const sibling = children[streamAt];
          if (oldIndex > streamAt) {
            this.moveOrInsertBefore(el.parentElement, el, sibling);
          } else {
            this.moveOrInsertBefore(
              el.parentElement,
              el,
              sibling.nextElementSibling
            );
          }
        }
      }
      this.maybeLimitStream(el);
    }
    // Reorder a child within its parent. When supported, use the atomic
    // moveBefore (https://developer.mozilla.org/en-US/docs/Web/API/Node/moveBefore)
    // so connected custom elements (and other state-bearing nodes like iframes)
    // are not disconnected and reconnected by the move. Falls back to
    // insertBefore otherwise. Passing `ref === null` moves to the end.
    // See also https://github.com/phoenixframework/phoenix_live_view/issues/4212.
    moveOrInsertBefore(parent, child, ref) {
      if (typeof parent.moveBefore === "function") {
        try {
          parent.moveBefore(child, ref);
          return;
        } catch (e) {
        }
      }
      parent.insertBefore(child, ref);
    }
    maybeLimitStream(el) {
      const { limit } = this.getStreamInsert(el);
      if (limit !== null) {
        const children = Array.from(el.parentElement.children);
        if (limit < 0 && children.length > limit * -1) {
          children.slice(0, children.length + limit).forEach((child) => this.removeStreamChildElement(child));
        } else if (limit >= 0 && children.length > limit) {
          children.slice(limit).forEach((child) => this.removeStreamChildElement(child));
        }
      }
    }
    transitionPendingRemoves() {
      const { pendingRemoves, liveSocket: liveSocket2 } = this;
      if (pendingRemoves.length > 0) {
        liveSocket2.transitionRemoves(pendingRemoves, this.view, () => {
          pendingRemoves.forEach((el) => {
            const child = dom_default.firstPhxChild(el);
            if (child) {
              liveSocket2.destroyViewByEl(child);
            }
            el.remove();
          });
          this.trackAfterTransitionsDiscarded(pendingRemoves);
        });
      }
    }
    isChangedSelect(fromEl, toEl) {
      if (!(fromEl instanceof HTMLSelectElement) || fromEl.multiple) {
        return false;
      }
      if (fromEl.options.length !== toEl.options.length) {
        return true;
      }
      toEl.value = fromEl.value;
      return !fromEl.isEqualNode(toEl);
    }
    skipCIDSibling(el) {
      return el.nodeType === Node.ELEMENT_NODE && el.hasAttribute(PHX_SKIP);
    }
    maybeCloneLockedElement(fromEl, isFocusedFormEl) {
      if (!fromEl.hasAttribute(PHX_REF_SRC))
        return fromEl;
      const ref = new ElementRef(fromEl);
      if (!fromEl.hasAttribute(PHX_REF_LOCK) || this.undoRef !== null && ref.isLockUndoneBy(this.undoRef)) {
        return fromEl;
      }
      dom_default.applyStickyOperations(fromEl);
      const clone2 = fromEl.hasAttribute(PHX_REF_LOCK) ? dom_default.private(fromEl, PHX_REF_LOCK) || fromEl.cloneNode(true) : null;
      if (!clone2)
        return fromEl;
      dom_default.putPrivate(fromEl, PHX_REF_LOCK, clone2);
      return isFocusedFormEl ? fromEl : clone2;
    }
    copyNestedPrivateLock(fromEl, toEl) {
      if (this.undoRef === null || !dom_default.private(toEl, PHX_REF_LOCK))
        return;
      dom_default.putPrivate(fromEl, PHX_REF_LOCK, dom_default.private(toEl, PHX_REF_LOCK));
    }
    indexOf(parent, child) {
      return Array.from(parent.children).indexOf(child);
    }
    teleport(el, morph) {
      const targetSelector = el.getAttribute(PHX_PORTAL);
      const portalContainer = document.querySelector(targetSelector);
      if (!portalContainer) {
        throw new Error(
          "portal target with selector " + targetSelector + " not found"
        );
      }
      const toTeleport = el.content.firstElementChild;
      if (this.skipCIDSibling(toTeleport)) {
        return;
      }
      if (!(toTeleport == null ? void 0 : toTeleport.id)) {
        throw new Error(
          "phx-portal template must have a single root element with ID!"
        );
      }
      const existing = document.getElementById(toTeleport.id);
      let portalTarget;
      if (existing) {
        if (!portalContainer.contains(existing)) {
          portalContainer.appendChild(existing);
        }
        portalTarget = existing;
      } else {
        portalTarget = document.createElement(toTeleport.tagName);
        portalContainer.appendChild(portalTarget);
      }
      toTeleport.setAttribute(PHX_TELEPORTED_REF, this.view.id);
      toTeleport.setAttribute(PHX_TELEPORTED_SRC, el.id);
      morph(portalTarget, toTeleport, true);
      toTeleport.removeAttribute(PHX_TELEPORTED_REF);
      toTeleport.removeAttribute(PHX_TELEPORTED_SRC);
      this.view.pushPortalElementId(toTeleport.id);
    }
    handleRuntimeHook(el, source) {
      var _a, _b;
      const name = el.getAttribute(PHX_RUNTIME_HOOK);
      let nonce = el.hasAttribute("nonce") ? el.getAttribute("nonce") : null;
      if (el.hasAttribute("nonce")) {
        const template = document.createElement("template");
        template.innerHTML = source;
        nonce = (_b = (_a = template.content.querySelector(`script[${PHX_RUNTIME_HOOK}="${CSS.escape(name)}"]`)) == null ? void 0 : _a.getAttribute("nonce")) != null ? _b : null;
      }
      const script = document.createElement("script");
      script.textContent = el.textContent;
      dom_default.mergeAttrs(script, el, { isIgnored: false });
      if (nonce) {
        script.nonce = nonce;
      }
      el.replaceWith(script);
      el = script;
    }
  };
  var VOID_TAGS = /* @__PURE__ */ new Set([
    "area",
    "base",
    "br",
    "col",
    "command",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ]);
  var quoteChars = /* @__PURE__ */ new Set(["'", '"']);
  var modifyRoot = (html, attrs, clearInnerHTML) => {
    let i = 0;
    let insideComment = false;
    let beforeTag, afterTag, tag, tagNameEndsAt, id, newHTML;
    const lookahead = html.match(/^(\s*(?:<!--.*?-->\s*)*)<([^\s\/>]+)/);
    if (lookahead === null) {
      throw new Error(`malformed html ${html}`);
    }
    i = lookahead[0].length;
    beforeTag = lookahead[1];
    tag = lookahead[2];
    tagNameEndsAt = i;
    for (i; i < html.length; i++) {
      if (html.charAt(i) === ">") {
        break;
      }
      if (html.charAt(i) === "=") {
        const isId = html.slice(i - 3, i) === " id";
        i++;
        const char = html.charAt(i);
        if (quoteChars.has(char)) {
          const attrStartsAt = i;
          i++;
          for (i; i < html.length; i++) {
            if (html.charAt(i) === char) {
              break;
            }
          }
          if (isId) {
            id = html.slice(attrStartsAt + 1, i);
            break;
          }
        }
      }
    }
    let closeAt = html.length - 1;
    insideComment = false;
    while (closeAt >= beforeTag.length + tag.length) {
      const char = html.charAt(closeAt);
      if (insideComment) {
        if (char === "-" && html.slice(closeAt - 3, closeAt) === "<!-") {
          insideComment = false;
          closeAt -= 4;
        } else {
          closeAt -= 1;
        }
      } else if (char === ">" && html.slice(closeAt - 2, closeAt) === "--") {
        insideComment = true;
        closeAt -= 3;
      } else if (char === ">") {
        break;
      } else {
        closeAt -= 1;
      }
    }
    afterTag = html.slice(closeAt + 1, html.length);
    const attrsStr = Object.keys(attrs).map((attr) => attrs[attr] === true ? attr : `${attr}="${attrs[attr]}"`).join(" ");
    if (clearInnerHTML) {
      const idAttrStr = id ? ` id="${id}"` : "";
      if (VOID_TAGS.has(tag)) {
        newHTML = `<${tag}${idAttrStr}${attrsStr === "" ? "" : " "}${attrsStr}/>`;
      } else {
        newHTML = `<${tag}${idAttrStr}${attrsStr === "" ? "" : " "}${attrsStr}></${tag}>`;
      }
    } else {
      const rest = html.slice(tagNameEndsAt, closeAt + 1);
      newHTML = `<${tag}${attrsStr === "" ? "" : " "}${attrsStr}${rest}`;
    }
    return [newHTML, beforeTag, afterTag];
  };
  var Rendered = class {
    static extract(diff) {
      const { [REPLY]: reply, [EVENTS]: events, [TITLE]: title } = diff;
      delete diff[REPLY];
      delete diff[EVENTS];
      delete diff[TITLE];
      return { diff, title, reply: reply || null, events: events || [] };
    }
    constructor(viewId, rendered) {
      this.viewId = viewId;
      this.rendered = {};
      this.magicId = 0;
      this.mergeDiff(rendered);
    }
    parentViewId() {
      return this.viewId;
    }
    toString(onlyCids) {
      const { buffer: str, streams } = this.recursiveToString(
        this.rendered,
        this.rendered[COMPONENTS],
        onlyCids,
        true,
        {}
      );
      return { buffer: str, streams };
    }
    recursiveToString(rendered, components = rendered[COMPONENTS], onlyCids, changeTracking, rootAttrs) {
      onlyCids = onlyCids ? new Set(onlyCids) : null;
      const output = {
        buffer: "",
        components,
        onlyCids,
        streams: /* @__PURE__ */ new Set()
      };
      this.toOutputBuffer(rendered, null, output, changeTracking, rootAttrs);
      return { buffer: output.buffer, streams: output.streams };
    }
    componentCIDs(diff) {
      return Object.keys(diff[COMPONENTS] || {}).map((i) => parseInt(i));
    }
    isComponentOnlyDiff(diff) {
      if (!diff[COMPONENTS]) {
        return false;
      }
      return Object.keys(diff).length === 1;
    }
    getComponent(diff, cid) {
      return diff[COMPONENTS][cid];
    }
    resetRender(cid) {
      if (this.rendered[COMPONENTS][cid]) {
        this.rendered[COMPONENTS][cid].reset = true;
      }
    }
    mergeDiff(diff) {
      const newc = diff[COMPONENTS];
      const cache = {};
      delete diff[COMPONENTS];
      this.rendered = this.mutableMerge(this.rendered, diff);
      this.rendered[COMPONENTS] = this.rendered[COMPONENTS] || {};
      if (newc) {
        const oldc = this.rendered[COMPONENTS];
        for (const cid in newc) {
          newc[cid] = this.cachedFindComponent(cid, newc[cid], oldc, newc, cache);
        }
        for (const cid in newc) {
          oldc[cid] = newc[cid];
        }
        diff[COMPONENTS] = newc;
      }
    }
    cachedFindComponent(cid, cdiff, oldc, newc, cache) {
      if (cache[cid]) {
        return cache[cid];
      } else {
        let ndiff, stat, scid = cdiff[STATIC];
        if (isCid(scid)) {
          let tdiff;
          if (scid > 0) {
            tdiff = this.cachedFindComponent(scid, newc[scid], oldc, newc, cache);
          } else {
            tdiff = oldc[-scid];
          }
          stat = tdiff[STATIC];
          ndiff = this.cloneMerge(tdiff, cdiff, true);
          ndiff[STATIC] = stat;
        } else {
          ndiff = cdiff[STATIC] !== void 0 || oldc[cid] === void 0 ? cdiff : this.cloneMerge(oldc[cid], cdiff, false);
        }
        cache[cid] = ndiff;
        return ndiff;
      }
    }
    mutableMerge(target, source) {
      if (source[STATIC] !== void 0) {
        return source;
      } else {
        this.doMutableMerge(target, source);
        return target;
      }
    }
    doMutableMerge(target, source) {
      if (source[KEYED]) {
        this.mergeKeyed(target, source);
      } else {
        for (const key in source) {
          const val = source[key];
          const targetVal = target[key];
          const isObjVal = isObject(val);
          if (isObjVal && val[STATIC] === void 0 && isObject(targetVal)) {
            this.doMutableMerge(targetVal, val);
          } else {
            target[key] = val;
          }
        }
      }
      if (target[ROOT]) {
        target.newRender = true;
      }
    }
    clone(diff) {
      if ("structuredClone" in window) {
        return structuredClone(diff);
      } else {
        return JSON.parse(JSON.stringify(diff));
      }
    }
    // keyed comprehensions
    mergeKeyed(target, source) {
      const clonedTarget = this.clone(target);
      Object.entries(source[KEYED]).forEach(([i, entry]) => {
        if (i === KEYED_COUNT) {
          return;
        }
        if (Array.isArray(entry)) {
          const [old_idx, diff] = entry;
          target[KEYED][i] = clonedTarget[KEYED][old_idx];
          this.doMutableMerge(target[KEYED][i], diff);
        } else if (typeof entry === "number") {
          const old_idx = entry;
          target[KEYED][i] = clonedTarget[KEYED][old_idx];
        } else if (typeof entry === "object") {
          if (!target[KEYED][i]) {
            target[KEYED][i] = {};
          }
          this.doMutableMerge(target[KEYED][i], entry);
        }
      });
      if (source[KEYED][KEYED_COUNT] < target[KEYED][KEYED_COUNT]) {
        for (let i = source[KEYED][KEYED_COUNT]; i < target[KEYED][KEYED_COUNT]; i++) {
          delete target[KEYED][i];
        }
      }
      target[KEYED][KEYED_COUNT] = source[KEYED][KEYED_COUNT];
      if (source[STREAM]) {
        target[STREAM] = source[STREAM];
      }
      if (source[TEMPLATES]) {
        target[TEMPLATES] = source[TEMPLATES];
      }
    }
    // Merges cid trees together, copying statics from source tree.
    //
    // The `pruneMagicId` is passed to control pruning the magicId of the
    // target. We must always prune the magicId when we are sharing statics
    // from another component. If not pruning, we replicate the logic from
    // mutableMerge, where we set newRender to true if there is a root
    // (effectively forcing the new version to be rendered instead of skipped)
    //
    cloneMerge(target, source, pruneMagicId) {
      let merged;
      if (source[KEYED]) {
        merged = this.clone(target);
        this.mergeKeyed(merged, source);
      } else {
        merged = __spreadValues(__spreadValues({}, target), source);
        for (const key in merged) {
          const val = source[key];
          const targetVal = target[key];
          if (isObject(val) && val[STATIC] === void 0 && isObject(targetVal)) {
            merged[key] = this.cloneMerge(targetVal, val, pruneMagicId);
          } else if (val === void 0 && isObject(targetVal)) {
            merged[key] = this.cloneMerge(targetVal, {}, pruneMagicId);
          }
        }
      }
      if (pruneMagicId) {
        delete merged.magicId;
        delete merged.newRender;
      } else if (target[ROOT]) {
        merged.newRender = true;
      }
      return merged;
    }
    componentToString(cid) {
      const { buffer: str, streams } = this.recursiveCIDToString(
        this.rendered[COMPONENTS],
        cid,
        null
      );
      const [strippedHTML, _before, _after] = modifyRoot(str, {});
      return { buffer: strippedHTML, streams };
    }
    pruneCIDs(cids) {
      cids.forEach((cid) => delete this.rendered[COMPONENTS][cid]);
    }
    // private
    get() {
      return this.rendered;
    }
    isNewFingerprint(diff = {}) {
      return !!diff[STATIC];
    }
    templateStatic(part, templates) {
      if (typeof part === "number") {
        return templates[part];
      } else {
        return part;
      }
    }
    nextMagicID() {
      this.magicId++;
      return `m${this.magicId}-${this.parentViewId()}`;
    }
    // Converts rendered tree to output buffer.
    //
    // changeTracking controls if we can apply the PHX_SKIP optimization.
    toOutputBuffer(rendered, templates, output, changeTracking, rootAttrs = {}) {
      if (rendered[KEYED]) {
        return this.comprehensionToBuffer(
          rendered,
          templates,
          output,
          changeTracking
        );
      }
      if (rendered[TEMPLATES]) {
        templates = rendered[TEMPLATES];
        delete rendered[TEMPLATES];
      }
      let { [STATIC]: statics } = rendered;
      statics = this.templateStatic(statics, templates);
      rendered[STATIC] = statics;
      const isRoot = rendered[ROOT];
      const prevBuffer = output.buffer;
      if (isRoot) {
        output.buffer = "";
      }
      if (changeTracking && isRoot && !rendered.magicId) {
        rendered.newRender = true;
        rendered.magicId = this.nextMagicID();
      }
      output.buffer += statics[0];
      for (let i = 1; i < statics.length; i++) {
        this.dynamicToBuffer(rendered[i - 1], templates, output, changeTracking);
        output.buffer += statics[i];
      }
      if (isRoot) {
        let skip = false;
        let attrs;
        if (changeTracking || rendered.magicId) {
          skip = changeTracking && !rendered.newRender;
          attrs = __spreadValues({ [PHX_MAGIC_ID]: rendered.magicId }, rootAttrs);
        } else {
          attrs = rootAttrs;
        }
        if (skip) {
          attrs[PHX_SKIP] = true;
        }
        const [newRoot, commentBefore, commentAfter] = modifyRoot(
          output.buffer,
          attrs,
          skip
        );
        rendered.newRender = false;
        output.buffer = prevBuffer + commentBefore + newRoot + commentAfter;
      }
    }
    comprehensionToBuffer(rendered, templates, output, changeTracking) {
      const keyedTemplates = templates || rendered[TEMPLATES];
      const statics = this.templateStatic(rendered[STATIC], templates);
      rendered[STATIC] = statics;
      delete rendered[TEMPLATES];
      for (let i = 0; i < rendered[KEYED][KEYED_COUNT]; i++) {
        output.buffer += statics[0];
        for (let j = 1; j < statics.length; j++) {
          this.dynamicToBuffer(
            rendered[KEYED][i][j - 1],
            keyedTemplates,
            output,
            changeTracking
          );
          output.buffer += statics[j];
        }
      }
      if (rendered[STREAM]) {
        const stream = rendered[STREAM];
        const [_ref, _inserts, deleteIds, reset] = stream || [null, {}, [], null];
        if (stream !== void 0 && (rendered[KEYED][KEYED_COUNT] > 0 || deleteIds.length > 0 || reset)) {
          delete rendered[STREAM];
          rendered[KEYED] = {
            [KEYED_COUNT]: 0
          };
          output.streams.add(stream);
        }
      }
    }
    dynamicToBuffer(rendered, templates, output, changeTracking) {
      if (typeof rendered === "number") {
        const { buffer: str, streams } = this.recursiveCIDToString(
          output.components,
          rendered,
          output.onlyCids
        );
        output.buffer += str;
        output.streams = /* @__PURE__ */ new Set([...output.streams, ...streams]);
      } else if (isObject(rendered)) {
        this.toOutputBuffer(rendered, templates, output, changeTracking, {});
      } else {
        output.buffer += rendered;
      }
    }
    recursiveCIDToString(components, cid, onlyCids) {
      const component = components[cid] || logError(`no component for CID ${cid}`, components);
      const attrs = { [PHX_COMPONENT]: cid, [PHX_VIEW_REF]: this.viewId };
      const skip = onlyCids && !onlyCids.has(cid);
      component.newRender = !skip;
      component.magicId = `c${cid}-${this.parentViewId()}`;
      const changeTracking = !component.reset;
      const { buffer: html, streams } = this.recursiveToString(
        component,
        components,
        onlyCids,
        changeTracking,
        attrs
      );
      delete component.reset;
      return { buffer: html, streams };
    }
  };
  var focusStack = [];
  var default_transition_time = 200;
  var JS = {
    // private
    exec(e, eventType, phxEvent, view, sourceEl, defaults) {
      const [defaultKind, defaultArgs] = defaults || [
        null,
        { callback: defaults && defaults.callback }
      ];
      const commands = Array.isArray(phxEvent) ? phxEvent : typeof phxEvent === "string" && phxEvent.startsWith("[") ? JSON.parse(phxEvent) : [[defaultKind, defaultArgs]];
      commands.forEach(([kind, args]) => {
        if (kind === defaultKind) {
          args = __spreadValues(__spreadValues({}, defaultArgs), args);
          args.callback = args.callback || defaultArgs.callback;
        }
        this.filterToEls(view.liveSocket, sourceEl, args).forEach((el) => {
          this[`exec_${kind}`](e, eventType, phxEvent, view, sourceEl, el, args);
        });
      });
    },
    isVisible(el) {
      return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length > 0);
    },
    // returns true if any part of the element is inside the viewport
    isInViewport(el) {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;
      return rect.right > 0 && rect.bottom > 0 && rect.left < windowWidth && rect.top < windowHeight;
    },
    // private
    // commands
    exec_exec(e, eventType, phxEvent, view, sourceEl, el, { attr, to }) {
      const encodedJS = el.getAttribute(attr);
      if (!encodedJS) {
        throw new Error(`expected ${attr} to contain JS command on "${to}"`);
      }
      view.liveSocket.execJS(el, encodedJS, eventType);
    },
    exec_dispatch(e, eventType, phxEvent, view, sourceEl, el, { event, detail, bubbles, blocking }) {
      detail = detail || {};
      detail.dispatcher = sourceEl;
      if (blocking) {
        const promise = new Promise((resolve, _reject) => {
          detail.done = resolve;
        });
        view.liveSocket.asyncTransition(promise);
      }
      dom_default.dispatchEvent(el, event, { detail, bubbles });
    },
    exec_push(e, eventType, phxEvent, view, sourceEl, el, args) {
      const {
        event,
        data,
        target,
        page_loading,
        loading,
        value,
        dispatcher,
        callback
      } = args;
      const pushOpts = {
        loading,
        value,
        target,
        page_loading: !!page_loading,
        originalEvent: e
      };
      const targetSrc = eventType === "change" && dispatcher ? dispatcher : sourceEl;
      const phxTarget = target || targetSrc.getAttribute(view.binding("target")) || targetSrc;
      const handler = (targetView, targetCtx) => {
        if (!targetView.isConnected()) {
          return;
        }
        if (eventType === "change") {
          let { newCid, _target } = args;
          _target = _target || (dom_default.isFormAssociated(sourceEl) ? sourceEl.name : void 0);
          if (_target) {
            pushOpts._target = _target;
          }
          targetView.pushInput(
            sourceEl,
            targetCtx,
            newCid,
            event || phxEvent,
            pushOpts,
            callback
          );
        } else if (eventType === "submit") {
          const { submitter } = args;
          targetView.submitForm(
            sourceEl,
            targetCtx,
            event || phxEvent,
            submitter,
            pushOpts,
            callback
          );
        } else {
          targetView.pushEvent(
            eventType,
            sourceEl,
            targetCtx,
            event || phxEvent,
            data,
            pushOpts,
            callback
          );
        }
      };
      if (args.targetView && args.targetCtx) {
        handler(args.targetView, args.targetCtx);
      } else {
        view.withinTargets(phxTarget, handler);
      }
    },
    exec_navigate(e, eventType, phxEvent, view, sourceEl, el, { href, replace }) {
      view.liveSocket.historyRedirect(
        e,
        href,
        replace ? "replace" : "push",
        null,
        sourceEl
      );
    },
    exec_patch(e, eventType, phxEvent, view, sourceEl, el, { href, replace }) {
      view.liveSocket.pushHistoryPatch(
        e,
        href,
        replace ? "replace" : "push",
        sourceEl
      );
    },
    exec_focus(e, eventType, phxEvent, view, sourceEl, el) {
      aria_default.attemptFocus(el);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => aria_default.attemptFocus(el));
      });
    },
    exec_focus_first(e, eventType, phxEvent, view, sourceEl, el) {
      aria_default.focusFirstInteractive(el) || aria_default.focusFirst(el);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(
          () => aria_default.focusFirstInteractive(el) || aria_default.focusFirst(el)
        );
      });
    },
    exec_push_focus(e, eventType, phxEvent, view, sourceEl, el) {
      focusStack.push(el || sourceEl);
    },
    exec_pop_focus(_e, _eventType, _phxEvent, _view, _sourceEl, _el) {
      const el = focusStack.pop();
      if (el) {
        el.focus();
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => el.focus());
        });
      }
    },
    exec_add_class(e, eventType, phxEvent, view, sourceEl, el, { names, transition, time, blocking }) {
      this.addOrRemoveClasses(el, names, [], transition, time, view, blocking);
    },
    exec_remove_class(e, eventType, phxEvent, view, sourceEl, el, { names, transition, time, blocking }) {
      this.addOrRemoveClasses(el, [], names, transition, time, view, blocking);
    },
    exec_toggle_class(e, eventType, phxEvent, view, sourceEl, el, { names, transition, time, blocking }) {
      this.toggleClasses(el, names, transition, time, view, blocking);
    },
    exec_toggle_attr(e, eventType, phxEvent, view, sourceEl, el, { attr: [attr, val1, val2] }) {
      this.toggleAttr(el, attr, val1, val2);
    },
    exec_ignore_attrs(e, eventType, phxEvent, view, sourceEl, el, { attrs }) {
      this.ignoreAttrs(el, attrs);
    },
    exec_transition(e, eventType, phxEvent, view, sourceEl, el, { time, transition, blocking }) {
      this.addOrRemoveClasses(el, [], [], transition, time, view, blocking);
    },
    exec_toggle(e, eventType, phxEvent, view, sourceEl, el, { display, ins, outs, time, blocking }) {
      this.toggle(eventType, view, el, display, ins, outs, time, blocking);
    },
    exec_show(e, eventType, phxEvent, view, sourceEl, el, { display, transition, time, blocking }) {
      this.show(eventType, view, el, display, transition, time, blocking);
    },
    exec_hide(e, eventType, phxEvent, view, sourceEl, el, { display, transition, time, blocking }) {
      this.hide(eventType, view, el, display, transition, time, blocking);
    },
    exec_set_attr(e, eventType, phxEvent, view, sourceEl, el, { attr: [attr, val] }) {
      this.setOrRemoveAttrs(el, [[attr, val]], []);
    },
    exec_remove_attr(e, eventType, phxEvent, view, sourceEl, el, { attr }) {
      this.setOrRemoveAttrs(el, [], [attr]);
    },
    ignoreAttrs(el, attrs) {
      dom_default.putPrivate(el, "JS:ignore_attrs", {
        apply: (fromEl, toEl) => {
          let fromAttributes = Array.from(fromEl.attributes);
          let fromAttributeNames = fromAttributes.map((attr) => attr.name);
          Array.from(toEl.attributes).filter((attr) => {
            return !fromAttributeNames.includes(attr.name);
          }).forEach((attr) => {
            if (dom_default.attributeIgnored(attr, attrs)) {
              toEl.removeAttribute(attr.name);
            }
          });
          fromAttributes.forEach((attr) => {
            if (dom_default.attributeIgnored(attr, attrs)) {
              toEl.setAttribute(attr.name, attr.value);
            }
          });
        }
      });
    },
    onBeforeElUpdated(fromEl, toEl) {
      const ignoreAttrs = dom_default.private(fromEl, "JS:ignore_attrs");
      if (ignoreAttrs) {
        ignoreAttrs.apply(fromEl, toEl);
      }
    },
    // utils for commands
    show(eventType, view, el, display, transition, time, blocking) {
      if (!this.isVisible(el)) {
        this.toggle(
          eventType,
          view,
          el,
          display,
          transition,
          null,
          time,
          blocking
        );
      }
    },
    hide(eventType, view, el, display, transition, time, blocking) {
      if (this.isVisible(el)) {
        this.toggle(
          eventType,
          view,
          el,
          display,
          null,
          transition,
          time,
          blocking
        );
      }
    },
    toggle(eventType, view, el, display, ins, outs, time, blocking) {
      time = time || default_transition_time;
      const [inClasses, inStartClasses, inEndClasses] = ins || [[], [], []];
      const [outClasses, outStartClasses, outEndClasses] = outs || [[], [], []];
      if (inClasses.length > 0 || outClasses.length > 0) {
        if (this.isVisible(el)) {
          const onStart = () => {
            this.addOrRemoveClasses(
              el,
              outStartClasses,
              inClasses.concat(inStartClasses).concat(inEndClasses)
            );
            window.requestAnimationFrame(() => {
              this.addOrRemoveClasses(el, outClasses, []);
              window.requestAnimationFrame(
                () => this.addOrRemoveClasses(el, outEndClasses, outStartClasses)
              );
            });
          };
          const onEnd = () => {
            this.addOrRemoveClasses(el, [], outClasses.concat(outEndClasses));
            dom_default.putSticky(
              el,
              "toggle",
              (currentEl) => currentEl.style.display = "none"
            );
            el.dispatchEvent(new Event("phx:hide-end"));
          };
          el.dispatchEvent(new Event("phx:hide-start"));
          if (blocking === false) {
            onStart();
            setTimeout(onEnd, time);
          } else {
            view.transition(time, onStart, onEnd);
          }
        } else {
          if (eventType === "remove") {
            return;
          }
          const onStart = () => {
            this.addOrRemoveClasses(
              el,
              inStartClasses,
              outClasses.concat(outStartClasses).concat(outEndClasses)
            );
            const stickyDisplay = display || this.defaultDisplay(el);
            window.requestAnimationFrame(() => {
              this.addOrRemoveClasses(el, inClasses, []);
              window.requestAnimationFrame(() => {
                dom_default.putSticky(
                  el,
                  "toggle",
                  (currentEl) => currentEl.style.display = stickyDisplay
                );
                this.addOrRemoveClasses(el, inEndClasses, inStartClasses);
              });
            });
          };
          const onEnd = () => {
            this.addOrRemoveClasses(el, [], inClasses.concat(inEndClasses));
            el.dispatchEvent(new Event("phx:show-end"));
          };
          el.dispatchEvent(new Event("phx:show-start"));
          if (blocking === false) {
            onStart();
            setTimeout(onEnd, time);
          } else {
            view.transition(time, onStart, onEnd);
          }
        }
      } else {
        if (this.isVisible(el)) {
          window.requestAnimationFrame(() => {
            el.dispatchEvent(new Event("phx:hide-start"));
            dom_default.putSticky(
              el,
              "toggle",
              (currentEl) => currentEl.style.display = "none"
            );
            el.dispatchEvent(new Event("phx:hide-end"));
          });
        } else {
          window.requestAnimationFrame(() => {
            el.dispatchEvent(new Event("phx:show-start"));
            const stickyDisplay = display || this.defaultDisplay(el);
            dom_default.putSticky(
              el,
              "toggle",
              (currentEl) => currentEl.style.display = stickyDisplay
            );
            el.dispatchEvent(new Event("phx:show-end"));
          });
        }
      }
    },
    toggleClasses(el, classes, transition, time, view, blocking) {
      window.requestAnimationFrame(() => {
        const [prevAdds, prevRemoves] = dom_default.getSticky(el, "classes", [[], []]);
        const newAdds = classes.filter(
          (name) => prevAdds.indexOf(name) < 0 && !el.classList.contains(name)
        );
        const newRemoves = classes.filter(
          (name) => prevRemoves.indexOf(name) < 0 && el.classList.contains(name)
        );
        this.addOrRemoveClasses(
          el,
          newAdds,
          newRemoves,
          transition,
          time,
          view,
          blocking
        );
      });
    },
    toggleAttr(el, attr, val1, val2) {
      if (el.hasAttribute(attr)) {
        if (val2 !== void 0) {
          if (el.getAttribute(attr) === val1) {
            this.setOrRemoveAttrs(el, [[attr, val2]], []);
          } else {
            this.setOrRemoveAttrs(el, [[attr, val1]], []);
          }
        } else {
          this.setOrRemoveAttrs(el, [], [attr]);
        }
      } else {
        this.setOrRemoveAttrs(el, [[attr, val1]], []);
      }
    },
    addOrRemoveClasses(el, adds, removes, transition, time, view, blocking) {
      time = time || default_transition_time;
      const [transitionRun, transitionStart, transitionEnd] = transition || [
        [],
        [],
        []
      ];
      if (transitionRun.length > 0) {
        const onStart = () => {
          this.addOrRemoveClasses(
            el,
            transitionStart,
            [].concat(transitionRun).concat(transitionEnd)
          );
          window.requestAnimationFrame(() => {
            this.addOrRemoveClasses(el, transitionRun, []);
            window.requestAnimationFrame(
              () => this.addOrRemoveClasses(el, transitionEnd, transitionStart)
            );
          });
        };
        const onDone = () => this.addOrRemoveClasses(
          el,
          adds.concat(transitionEnd),
          removes.concat(transitionRun).concat(transitionStart)
        );
        if (blocking === false) {
          onStart();
          setTimeout(onDone, time);
        } else {
          view.transition(time, onStart, onDone);
        }
        return;
      }
      window.requestAnimationFrame(() => {
        const [prevAdds, prevRemoves] = dom_default.getSticky(el, "classes", [[], []]);
        const keepAdds = adds.filter(
          (name) => prevAdds.indexOf(name) < 0 && !el.classList.contains(name)
        );
        const keepRemoves = removes.filter(
          (name) => prevRemoves.indexOf(name) < 0 && el.classList.contains(name)
        );
        const newAdds = prevAdds.filter((name) => removes.indexOf(name) < 0).concat(keepAdds);
        const newRemoves = prevRemoves.filter((name) => adds.indexOf(name) < 0).concat(keepRemoves);
        dom_default.putSticky(el, "classes", (currentEl) => {
          currentEl.classList.remove(...newRemoves);
          currentEl.classList.add(...newAdds);
          return [newAdds, newRemoves];
        });
      });
    },
    setOrRemoveAttrs(el, sets, removes) {
      const [prevSets, prevRemoves] = dom_default.getSticky(el, "attrs", [[], []]);
      const alteredAttrs = sets.map(([attr, _val]) => attr).concat(removes);
      const newSets = prevSets.filter(([attr, _val]) => !alteredAttrs.includes(attr)).concat(sets);
      const newRemoves = prevRemoves.filter((attr) => !alteredAttrs.includes(attr)).concat(removes);
      if (sets.some(([attr, _val]) => attr === "id")) {
        dom_default.putPrivate(el, "clientsideIdAttribute", true);
      }
      dom_default.putSticky(el, "attrs", (currentEl) => {
        newRemoves.forEach((attr) => currentEl.removeAttribute(attr));
        newSets.forEach(([attr, val]) => currentEl.setAttribute(attr, val));
        return [newSets, newRemoves];
      });
    },
    hasAllClasses(el, classes) {
      return classes.every((name) => el.classList.contains(name));
    },
    isToggledOut(el, outClasses) {
      return !this.isVisible(el) || this.hasAllClasses(el, outClasses);
    },
    filterToEls(liveSocket2, sourceEl, { to }) {
      const defaultQuery = () => {
        if (typeof to === "string") {
          return document.querySelectorAll(to);
        } else if (to.closest) {
          const toEl = sourceEl.closest(to.closest);
          return toEl ? [toEl] : [];
        } else if (to.inner) {
          return sourceEl.querySelectorAll(to.inner);
        }
      };
      return to ? liveSocket2.jsQuerySelectorAll(sourceEl, to, defaultQuery) : [sourceEl];
    },
    defaultDisplay(el) {
      return { tr: "table-row", td: "table-cell" }[el.tagName.toLowerCase()] || "block";
    },
    transitionClasses(val) {
      if (!val) {
        return null;
      }
      let [trans, tStart, tEnd] = Array.isArray(val) ? val : [val.split(" "), [], []];
      trans = Array.isArray(trans) ? trans : trans.split(" ");
      tStart = Array.isArray(tStart) ? tStart : tStart.split(" ");
      tEnd = Array.isArray(tEnd) ? tEnd : tEnd.split(" ");
      return [trans, tStart, tEnd];
    }
  };
  var js_default = JS;
  var js_commands_default = (liveSocket2, eventType) => {
    return {
      exec(el, encodedJS) {
        liveSocket2.execJS(el, encodedJS, eventType);
      },
      show(el, opts = {}) {
        const owner = liveSocket2.owner(el);
        js_default.show(
          eventType,
          owner,
          el,
          opts.display,
          js_default.transitionClasses(opts.transition),
          opts.time,
          opts.blocking
        );
      },
      hide(el, opts = {}) {
        const owner = liveSocket2.owner(el);
        js_default.hide(
          eventType,
          owner,
          el,
          null,
          js_default.transitionClasses(opts.transition),
          opts.time,
          opts.blocking
        );
      },
      toggle(el, opts = {}) {
        const owner = liveSocket2.owner(el);
        const inTransition = js_default.transitionClasses(opts.in);
        const outTransition = js_default.transitionClasses(opts.out);
        js_default.toggle(
          eventType,
          owner,
          el,
          opts.display,
          inTransition,
          outTransition,
          opts.time,
          opts.blocking
        );
      },
      addClass(el, names, opts = {}) {
        const classNames = Array.isArray(names) ? names : names.split(" ");
        const owner = liveSocket2.owner(el);
        js_default.addOrRemoveClasses(
          el,
          classNames,
          [],
          js_default.transitionClasses(opts.transition),
          opts.time,
          owner,
          opts.blocking
        );
      },
      removeClass(el, names, opts = {}) {
        const classNames = Array.isArray(names) ? names : names.split(" ");
        const owner = liveSocket2.owner(el);
        js_default.addOrRemoveClasses(
          el,
          [],
          classNames,
          js_default.transitionClasses(opts.transition),
          opts.time,
          owner,
          opts.blocking
        );
      },
      toggleClass(el, names, opts = {}) {
        const classNames = Array.isArray(names) ? names : names.split(" ");
        const owner = liveSocket2.owner(el);
        js_default.toggleClasses(
          el,
          classNames,
          js_default.transitionClasses(opts.transition),
          opts.time,
          owner,
          opts.blocking
        );
      },
      transition(el, transition, opts = {}) {
        const owner = liveSocket2.owner(el);
        js_default.addOrRemoveClasses(
          el,
          [],
          [],
          js_default.transitionClasses(transition),
          opts.time,
          owner,
          opts.blocking
        );
      },
      setAttribute(el, attr, val) {
        js_default.setOrRemoveAttrs(el, [[attr, val]], []);
      },
      removeAttribute(el, attr) {
        js_default.setOrRemoveAttrs(el, [], [attr]);
      },
      toggleAttribute(el, attr, val1, val2) {
        js_default.toggleAttr(el, attr, val1, val2);
      },
      push(el, type, opts = {}) {
        liveSocket2.withinOwners(el, (view) => {
          const data = opts.value || {};
          delete opts.value;
          let e = new CustomEvent("phx:exec", { detail: { sourceElement: el } });
          js_default.exec(e, eventType, type, view, el, ["push", __spreadValues({ data }, opts)]);
        });
      },
      navigate(href, opts = {}) {
        ensureSameOrigin(href, "navigate");
        const customEvent = new CustomEvent("phx:exec");
        liveSocket2.historyRedirect(
          customEvent,
          href,
          opts.replace ? "replace" : "push",
          null,
          null
        );
      },
      patch(href, opts = {}) {
        ensureSameOrigin(href, "patch");
        const customEvent = new CustomEvent("phx:exec");
        liveSocket2.pushHistoryPatch(
          customEvent,
          href,
          opts.replace ? "replace" : "push",
          null
        );
      },
      ignoreAttributes(el, attrs) {
        js_default.ignoreAttrs(el, Array.isArray(attrs) ? attrs : [attrs]);
      }
    };
  };
  var HOOK_ID = "hookId";
  var DEAD_HOOK = "deadHook";
  var viewHookID = 1;
  var ViewHook = class _ViewHook {
    get liveSocket() {
      return this.__liveSocket();
    }
    /** @internal */
    static makeID() {
      return viewHookID++;
    }
    /** @internal */
    static elementID(el) {
      return dom_default.private(el, HOOK_ID);
    }
    /** @internal */
    static deadHook(el) {
      return dom_default.private(el, DEAD_HOOK) === true;
    }
    /** @internal */
    constructor(view, el, callbacks) {
      this.el = el;
      this.__attachView(view);
      this.__listeners = /* @__PURE__ */ new Set();
      this.__isDisconnected = false;
      dom_default.putPrivate(this.el, HOOK_ID, _ViewHook.makeID());
      if (view && view.isDead) {
        dom_default.putPrivate(this.el, DEAD_HOOK, true);
      }
      if (callbacks) {
        const protectedProps = /* @__PURE__ */ new Set([
          "el",
          "liveSocket",
          "__view",
          "__listeners",
          "__isDisconnected",
          "constructor",
          // Standard object properties
          // Core ViewHook API methods
          "js",
          "pushEvent",
          "pushEventTo",
          "handleEvent",
          "removeHandleEvent",
          "upload",
          "uploadTo",
          // Internal lifecycle callers
          "__mounted",
          "__updated",
          "__beforeUpdate",
          "__destroyed",
          "__reconnected",
          "__disconnected",
          "__cleanup__"
        ]);
        for (const key in callbacks) {
          if (Object.prototype.hasOwnProperty.call(callbacks, key)) {
            this[key] = callbacks[key];
            if (protectedProps.has(key)) {
              console.warn(
                `Hook object for element #${el.id} overwrites core property '${key}'!`
              );
            }
          }
        }
        const lifecycleMethods = [
          "mounted",
          "beforeUpdate",
          "updated",
          "destroyed",
          "disconnected",
          "reconnected"
        ];
        lifecycleMethods.forEach((methodName) => {
          if (callbacks[methodName] && typeof callbacks[methodName] === "function") {
            this[methodName] = callbacks[methodName];
          }
        });
      }
    }
    /** @internal */
    __attachView(view) {
      if (view) {
        this.__view = () => view;
        this.__liveSocket = () => view.liveSocket;
      } else {
        this.__view = () => {
          throw new Error(
            `hook not yet attached to a live view: ${this.el.outerHTML}`
          );
        };
        this.__liveSocket = () => {
          throw new Error(
            `hook not yet attached to a live view: ${this.el.outerHTML}`
          );
        };
      }
    }
    // Default lifecycle methods
    mounted() {
    }
    beforeUpdate() {
    }
    updated() {
    }
    destroyed() {
    }
    disconnected() {
    }
    reconnected() {
    }
    // Internal lifecycle callers - called by the View
    /** @internal */
    __mounted() {
      this.mounted();
    }
    /** @internal */
    __updated() {
      this.updated();
    }
    /** @internal */
    __beforeUpdate() {
      this.beforeUpdate();
    }
    /** @internal */
    __destroyed() {
      this.destroyed();
      dom_default.deletePrivate(this.el, HOOK_ID);
    }
    /** @internal */
    __reconnected() {
      if (this.__isDisconnected) {
        this.__isDisconnected = false;
        this.reconnected();
      }
    }
    /** @internal */
    __disconnected() {
      this.__isDisconnected = true;
      this.disconnected();
    }
    js() {
      return __spreadProps(__spreadValues({}, js_commands_default(this.__view().liveSocket, "hook")), {
        exec: (encodedJS) => {
          this.__view().liveSocket.execJS(this.el, encodedJS, "hook");
        }
      });
    }
    pushEvent(event, payload, onReply) {
      const promise = this.__view().pushHookEvent(
        this.el,
        null,
        event,
        payload || {}
      );
      if (onReply === void 0) {
        return promise.then(({ reply }) => reply);
      }
      promise.then(
        ({ reply, ref }) => onReply(reply, ref)
      ).catch(() => {
      });
    }
    pushEventTo(selectorOrTarget, event, payload, onReply) {
      if (onReply === void 0) {
        const targetPair = [];
        this.__view().withinTargets(
          selectorOrTarget,
          (view, targetCtx) => {
            targetPair.push({ view, targetCtx });
          }
        );
        const promises = targetPair.map(({ view, targetCtx }) => {
          return view.pushHookEvent(
            this.el,
            targetCtx,
            event,
            payload || {}
          );
        });
        return Promise.allSettled(promises);
      }
      this.__view().withinTargets(
        selectorOrTarget,
        (view, targetCtx) => {
          view.pushHookEvent(this.el, targetCtx, event, payload || {}).then(
            ({ reply, ref }) => onReply(reply, ref)
          ).catch(() => {
          });
        }
      );
    }
    handleEvent(event, callback) {
      const callbackRef = {
        event,
        callback: (customEvent) => callback(customEvent.detail)
      };
      window.addEventListener(
        `phx:${event}`,
        callbackRef.callback
      );
      this.__listeners.add(callbackRef);
      return callbackRef;
    }
    removeHandleEvent(ref) {
      window.removeEventListener(
        `phx:${ref.event}`,
        ref.callback
      );
      this.__listeners.delete(ref);
    }
    upload(name, files) {
      return this.__view().dispatchUploads(null, name, files);
    }
    uploadTo(selectorOrTarget, name, files) {
      return this.__view().withinTargets(
        selectorOrTarget,
        (view, targetCtx) => {
          view.dispatchUploads(targetCtx, name, files);
        }
      );
    }
    /** @internal */
    __cleanup__() {
      this.__listeners.forEach(
        (callbackRef) => this.removeHandleEvent(callbackRef)
      );
    }
  };
  var prependFormDataKey = (key, prefix) => {
    const isArray = key.endsWith("[]");
    let baseKey = isArray ? key.slice(0, -2) : key;
    baseKey = baseKey.replace(/([^\[\]]+)(\]?$)/, `${prefix}$1$2`);
    if (isArray) {
      baseKey += "[]";
    }
    return baseKey;
  };
  var View = class _View {
    static closestView(el) {
      const liveViewEl = el.closest(PHX_VIEW_SELECTOR);
      return liveViewEl ? dom_default.private(liveViewEl, "view") : null;
    }
    constructor(el, liveSocket2, parentView, flash = null, liveReferer = null) {
      this.rendered = null;
      this.isDead = false;
      this.liveSocket = liveSocket2;
      this.flash = flash;
      this.parent = parentView;
      this.root = parentView ? parentView.root : this;
      this.el = el;
      const boundView = dom_default.private(this.el, "view");
      if (boundView !== void 0 && boundView.isDead !== true) {
        logError(
          `The DOM element for this view has already been bound to a view.

        An element can only ever be associated with a single view!
        Please ensure that you are not trying to initialize multiple LiveSockets on the same page.
        This could happen if you're accidentally trying to render your root layout more than once.
        Ensure that the template set on the LiveView is different than the root layout.
      `,
          { view: boundView }
        );
        throw new Error("Cannot bind multiple views to the same DOM element.");
      }
      dom_default.putPrivate(this.el, "view", this);
      this.id = this.el.id;
      this.el.setAttribute(PHX_ROOT_ID, this.root.id);
      this.ref = 0;
      this.lastAckRef = null;
      this.childJoins = 0;
      this.loaderTimer = null;
      this.disconnectedTimer = null;
      this.pendingDiffs = [];
      this.pendingForms = /* @__PURE__ */ new Set();
      this.redirect = false;
      this.href = null;
      this.joinCount = this.parent ? this.parent.joinCount - 1 : 0;
      this.joinAttempts = 0;
      this.joinPending = true;
      this.destroyed = false;
      this.joinCallback = function(onDone) {
        onDone && onDone();
      };
      this.stopCallback = function() {
      };
      this.pendingJoinOps = [];
      this.viewHooks = {};
      this.formSubmits = [];
      this.children = this.parent ? null : {};
      this.root.children[this.id] = {};
      this.formsForRecovery = {};
      this.channel = this.liveSocket.channel(`lv:${this.id}`, () => {
        var _a;
        const url = this.href && this.expandURL(this.href);
        return {
          redirect: this.redirect ? url : void 0,
          url: this.redirect ? void 0 : url || void 0,
          params: this.connectParams(liveReferer),
          session: this.getSession(),
          static: this.getStatic(),
          flash: (_a = this.flash) != null ? _a : void 0,
          sticky: this.el.hasAttribute(PHX_STICKY)
        };
      });
      this.portalElementIds = /* @__PURE__ */ new Set();
    }
    setHref(href) {
      this.href = href;
    }
    setRedirect(href) {
      this.redirect = true;
      this.href = href;
    }
    isMain() {
      return this.el.hasAttribute(PHX_MAIN);
    }
    connectParams(liveReferer) {
      const params = this.liveSocket.params(this.el);
      const manifest = dom_default.all(document, `[${this.binding(PHX_TRACK_STATIC)}]`).map(
        (node) => "src" in node && node.src || "href" in node && node.href
      ).filter((url) => typeof url === "string");
      if (manifest.length > 0) {
        params["_track_static"] = manifest;
      }
      params["_mounts"] = this.joinCount;
      params["_mount_attempts"] = this.joinAttempts;
      params["_live_referer"] = liveReferer != null ? liveReferer : void 0;
      this.joinAttempts++;
      return params;
    }
    isConnected() {
      return this.channel.canPush();
    }
    getSession() {
      return this.el.getAttribute(PHX_SESSION);
    }
    getStatic() {
      const val = this.el.getAttribute(PHX_STATIC);
      return val === "" ? null : val;
    }
    destroy(callback = function() {
    }) {
      this.destroyAllChildren();
      this.destroyPortalElements();
      this.destroyed = true;
      dom_default.deletePrivate(this.el, "view");
      delete this.root.children[this.id];
      if (this.parent) {
        delete this.root.children[this.parent.id][this.id];
      }
      this.loaderTimer != null && clearTimeout(this.loaderTimer);
      const onFinished = () => {
        callback();
        for (const id in this.viewHooks) {
          this.destroyHook(this.viewHooks[id]);
        }
      };
      dom_default.markPhxChildDestroyed(this.el);
      this.log("destroyed", () => ["the child has been removed from the parent"]);
      this.channel.leave().receive("ok", onFinished).receive("error", onFinished).receive("timeout", onFinished);
    }
    setContainerClasses(...classes) {
      this.el.classList.remove(
        PHX_CONNECTED_CLASS,
        PHX_LOADING_CLASS,
        PHX_ERROR_CLASS,
        PHX_CLIENT_ERROR_CLASS,
        PHX_SERVER_ERROR_CLASS
      );
      this.el.classList.add(...classes);
    }
    showLoader(timeout) {
      this.loaderTimer != null && clearTimeout(this.loaderTimer);
      if (timeout) {
        this.loaderTimer = setTimeout(() => this.showLoader(), timeout);
      } else {
        for (const id in this.viewHooks) {
          this.viewHooks[id].__disconnected();
        }
        this.setContainerClasses(PHX_LOADING_CLASS);
      }
    }
    execAll(binding) {
      dom_default.all(
        this.el,
        `[${binding}]`,
        (el) => this.liveSocket.execJS(el, el.getAttribute(binding))
      );
    }
    hideLoader() {
      this.loaderTimer != null && clearTimeout(this.loaderTimer);
      this.disconnectedTimer != null && clearTimeout(this.disconnectedTimer);
      this.setContainerClasses(PHX_CONNECTED_CLASS);
      this.execAll(this.binding("connected"));
    }
    triggerReconnected() {
      for (const id in this.viewHooks) {
        this.viewHooks[id].__reconnected();
      }
    }
    log(kind, msgCallback) {
      this.liveSocket.log(this, kind, msgCallback);
    }
    transition(time, onStart, onDone = function() {
    }) {
      this.liveSocket.transition(time, onStart, onDone);
    }
    // calls the callback with the view and target element for the given phxTarget
    // targets can be:
    //  * an element itself, then it is simply passed to liveSocket.owner;
    //  * a CID (Component ID), then we first search the component's element in the DOM
    //  * a selector, then we search the selector in the DOM and call the callback
    //    for each element found with the corresponding owner view
    withinTargets(phxTarget, callback, dom = document) {
      if (phxTarget instanceof HTMLElement || phxTarget instanceof SVGElement) {
        return this.liveSocket.owner(
          phxTarget,
          (view) => callback(view, phxTarget)
        );
      }
      if (isCid(phxTarget)) {
        const target = dom_default.findComponent(this.id, phxTarget, dom);
        if (!target) {
          logError(`no component found matching phx-target of ${phxTarget}`);
        } else {
          callback(
            this,
            typeof phxTarget === "number" ? phxTarget : parseInt(phxTarget)
          );
        }
      } else {
        const targets = Array.from(dom.querySelectorAll(phxTarget));
        if (targets.length === 0) {
          logError(
            `nothing found matching the phx-target selector "${phxTarget}"`
          );
        }
        targets.forEach(
          (target) => this.liveSocket.owner(target, (view) => callback(view, target))
        );
      }
    }
    applyDiff(type, rawDiff, callback) {
      this.log(type, () => ["", clone(rawDiff)]);
      const { diff, reply, events, title } = Rendered.extract(rawDiff);
      const ev = events.reduce(
        (acc, args) => {
          if (args.length === 3 && args[2] == true) {
            acc.pre.push(args.slice(0, -1));
          } else {
            acc.post.push(args);
          }
          return acc;
        },
        { pre: [], post: [] }
      );
      this.liveSocket.dispatchEvents(ev.pre);
      const update = () => {
        callback({ diff, reply, events: ev.post });
        if (typeof title === "string" || type == "mount" && this.isMain()) {
          window.requestAnimationFrame(() => dom_default.putTitle(title));
        }
      };
      if ("onDocumentPatch" in this.liveSocket.domCallbacks) {
        this.liveSocket.triggerDOM("onDocumentPatch", [update]);
      } else {
        update();
      }
    }
    onJoin(resp) {
      const { rendered, container, liveview_version, pid } = resp;
      if (container) {
        const [tag, attrs] = container;
        this.el = dom_default.replaceRootContainer(this.el, tag, attrs);
        dom_default.putPrivate(this.el, "view", this);
      }
      this.childJoins = 0;
      this.joinPending = true;
      this.flash = null;
      if (this.root === this) {
        this.formsForRecovery = this.getFormsForRecovery();
      }
      if (this.isMain() && window.history.state === null) {
        browser_default.pushState("replace", {
          type: "patch",
          id: this.id,
          position: this.liveSocket.currentHistoryPosition
        });
      }
      if (liveview_version !== this.liveSocket.version()) {
        console.warn(
          `LiveView asset version mismatch. JavaScript version ${this.liveSocket.version()} vs. server ${liveview_version}. To avoid issues, please ensure that your assets use the same version as the server.`
        );
      }
      if (pid) {
        this.el.setAttribute(PHX_LV_PID, pid);
      }
      browser_default.dropLocal(
        this.liveSocket.localStorage,
        window.location.pathname,
        CONSECUTIVE_RELOADS
      );
      this.applyDiff("mount", rendered, ({ diff, events }) => {
        this.rendered = new Rendered(this.id, diff);
        const [html, streams] = this.renderContainer(null, "join");
        this.dropPendingRefs();
        this.joinCount++;
        this.joinAttempts = 0;
        this.maybeRecoverForms(html, () => {
          this.onJoinComplete(resp, html, streams, events);
        });
      });
    }
    dropPendingRefs() {
      dom_default.all(document, `[${PHX_REF_SRC}="${this.refSrc()}"]`, (el) => {
        el.removeAttribute(PHX_REF_LOADING);
        el.removeAttribute(PHX_REF_SRC);
        el.removeAttribute(PHX_REF_LOCK);
      });
    }
    onJoinComplete({ live_patch }, html, streams, events) {
      if (this.joinCount > 1 || this.parent && !this.parent.isJoinPending()) {
        return this.applyJoinPatch(live_patch, html, streams, events);
      }
      const newChildren = dom_default.findPhxChildrenInFragment(html, this.id).filter(
        (toEl) => {
          const fromEl = toEl.id && this.el.querySelector(`[id="${toEl.id}"]`);
          const phxStatic = fromEl && fromEl.getAttribute(PHX_STATIC);
          if (phxStatic) {
            toEl.setAttribute(PHX_STATIC, phxStatic);
          }
          if (fromEl) {
            fromEl.setAttribute(PHX_ROOT_ID, this.root.id);
          }
          return this.joinChild(toEl);
        }
      );
      if (newChildren.length === 0) {
        if (this.parent) {
          this.root.pendingJoinOps.push([
            this,
            () => this.applyJoinPatch(live_patch, html, streams, events)
          ]);
          this.parent.ackJoin(this);
        } else {
          this.onAllChildJoinsComplete();
          this.applyJoinPatch(live_patch, html, streams, events);
        }
      } else {
        this.root.pendingJoinOps.push([
          this,
          () => this.applyJoinPatch(live_patch, html, streams, events)
        ]);
      }
    }
    attachTrueDocEl() {
      const el = dom_default.byId(this.id);
      if (!el) {
        throw new Error("unable to find root element for view");
      }
      this.el = el;
      dom_default.putPrivate(this.el, "view", this);
      this.el.setAttribute(PHX_ROOT_ID, this.root.id);
    }
    // this is invoked for dead and live views, so we must filter by
    // by owner to ensure we aren't duplicating hooks across disconnect
    // and connected states. This also handles cases where hooks exist
    // in a root layout with a LV in the body
    execNewMounted(parent = document) {
      let phxViewportTop = this.binding(PHX_VIEWPORT_TOP);
      let phxViewportBottom = this.binding(PHX_VIEWPORT_BOTTOM);
      this.all(
        parent,
        `[${phxViewportTop}], [${phxViewportBottom}]`,
        (hookEl) => {
          dom_default.maintainPrivateHooks(
            hookEl,
            hookEl,
            phxViewportTop,
            phxViewportBottom
          );
          this.maybeAddNewHook(hookEl);
        }
      );
      this.all(
        parent,
        `[${this.binding(PHX_HOOK)}], [data-phx-${PHX_HOOK}]`,
        (hookEl) => {
          this.maybeAddNewHook(hookEl);
        }
      );
      this.all(parent, `[${this.binding(PHX_MOUNTED)}]`, (el) => {
        this.maybeMounted(el);
      });
    }
    all(parent, selector, callback) {
      dom_default.all(parent, selector, (el) => {
        if (this.ownsElement(el)) {
          callback(el);
        }
      });
    }
    applyJoinPatch(live_patch, html, streams, events) {
      if (this.joinCount > 1) {
        if (this.pendingJoinOps.length) {
          this.pendingJoinOps.forEach((cb) => typeof cb === "function" && cb());
          this.pendingJoinOps = [];
        }
      }
      this.attachTrueDocEl();
      const patch = new DOMPatch(this, this.el, html, streams, null);
      patch.markPrunableContentForRemoval();
      this.performPatch(patch, false, true);
      this.joinNewChildren();
      this.execNewMounted();
      this.joinPending = false;
      this.liveSocket.dispatchEvents(events);
      this.applyPendingUpdates();
      if (live_patch) {
        const { kind, to } = live_patch;
        this.liveSocket.historyPatch(to, kind);
      }
      this.hideLoader();
      if (this.joinCount > 1) {
        this.triggerReconnected();
      }
      this.stopCallback();
    }
    triggerBeforeUpdateHook(fromEl, toEl) {
      this.liveSocket.triggerDOM("onBeforeElUpdated", [fromEl, toEl]);
      const hook = this.getHook(fromEl);
      const isIgnored = hook && dom_default.isIgnored(fromEl, this.binding(PHX_UPDATE));
      if (hook && !fromEl.isEqualNode(toEl) && !(isIgnored && isEqualObj(fromEl.dataset, toEl.dataset))) {
        hook.__beforeUpdate();
        return hook;
      }
    }
    maybeMounted(el) {
      const phxMounted = el.getAttribute(this.binding(PHX_MOUNTED));
      const hasBeenInvoked = phxMounted && dom_default.private(el, "mounted");
      if (phxMounted && !hasBeenInvoked) {
        this.liveSocket.execJS(el, phxMounted);
        dom_default.putPrivate(el, "mounted", true);
      }
    }
    maybeAddNewHook(el) {
      const newHook = this.addHook(el);
      if (newHook) {
        newHook.__mounted();
      }
    }
    performPatch(patch, pruneCids, isJoinPatch = false) {
      const removedEls = [];
      let phxChildrenAdded = false;
      const updatedHookIds = /* @__PURE__ */ new Set();
      this.liveSocket.triggerDOM("onPatchStart", [patch.targetContainer]);
      patch.afterAdded((el) => {
        this.liveSocket.triggerDOM("onNodeAdded", [el]);
        const phxViewportTop = this.binding(PHX_VIEWPORT_TOP);
        const phxViewportBottom = this.binding(PHX_VIEWPORT_BOTTOM);
        dom_default.maintainPrivateHooks(el, el, phxViewportTop, phxViewportBottom);
        this.maybeAddNewHook(el);
        if (el.getAttribute) {
          this.maybeMounted(el);
        }
      });
      patch.afterPhxChildAdded((el) => {
        if (dom_default.isPhxSticky(el)) {
          this.liveSocket.joinRootViews();
        } else {
          phxChildrenAdded = true;
        }
      });
      patch.beforeUpdated((fromEl, toEl) => {
        const hook = this.triggerBeforeUpdateHook(fromEl, toEl);
        if (hook) {
          updatedHookIds.add(fromEl.id);
        }
        js_default.onBeforeElUpdated(fromEl, toEl);
      });
      patch.afterUpdated((el) => {
        if (updatedHookIds.has(el.id)) {
          const hook = this.getHook(el);
          hook && hook.__updated();
        }
      });
      patch.afterDiscarded((el) => {
        if (el.nodeType === Node.ELEMENT_NODE) {
          removedEls.push(el);
        }
      });
      patch.afterTransitionsDiscarded(
        (els) => this.afterElementsRemoved(els, pruneCids)
      );
      patch.perform(isJoinPatch);
      this.afterElementsRemoved(removedEls, pruneCids);
      this.liveSocket.triggerDOM("onPatchEnd", [patch.targetContainer]);
      return phxChildrenAdded;
    }
    afterElementsRemoved(elements, pruneCids) {
      const destroyedCIDs = [];
      elements.forEach((parent) => {
        const components = dom_default.all(
          parent,
          `[${PHX_VIEW_REF}="${this.id}"][${PHX_COMPONENT}]`
        );
        const hooks = dom_default.all(
          parent,
          `[${this.binding(PHX_HOOK)}], [data-phx-hook]`
        );
        components.concat(parent).forEach((el) => {
          const cid = this.componentID(el);
          if (isCid(cid) && destroyedCIDs.indexOf(cid) === -1 && el.getAttribute(PHX_VIEW_REF) === this.id) {
            destroyedCIDs.push(cid);
          }
        });
        hooks.concat(parent).forEach((hookEl) => {
          const hook = this.getHook(hookEl);
          hook && this.destroyHook(hook);
        });
      });
      if (pruneCids) {
        this.maybePushComponentsDestroyed(destroyedCIDs);
      }
    }
    joinNewChildren() {
      dom_default.findPhxChildren(document, this.id).forEach((el) => this.joinChild(el));
    }
    maybeRecoverForms(html, callback) {
      var _a;
      const phxChange = this.binding("change");
      const oldForms = this.root.formsForRecovery;
      const template = document.createElement("template");
      template.innerHTML = html;
      if (!template.content.firstElementChild) {
        return;
      }
      dom_default.all(template.content, `[${PHX_PORTAL}]`).forEach((portalTemplate) => {
        var _a2;
        if (!(portalTemplate instanceof HTMLTemplateElement)) {
          return;
        }
        (_a2 = template.content.firstElementChild) == null ? void 0 : _a2.appendChild(
          portalTemplate.content.firstElementChild
        );
      });
      const rootEl = template.content.firstElementChild;
      rootEl.id = this.id;
      rootEl.setAttribute(PHX_ROOT_ID, this.root.id);
      rootEl.setAttribute(PHX_SESSION, this.getSession());
      rootEl.setAttribute(PHX_STATIC, (_a = this.getStatic()) != null ? _a : "");
      this.parent && rootEl.setAttribute(PHX_PARENT_ID, this.parent.id);
      dom_default.putPrivate(rootEl, "view", this);
      const formsToRecover = (
        // we go over all forms in the new DOM; because this is only the HTML for the current
        // view, we can be sure that all forms are owned by this view:
        dom_default.all(template.content, "form").filter((newForm) => newForm.id && oldForms[newForm.id]).filter((newForm) => !this.pendingForms.has(newForm.id)).filter(
          (newForm) => oldForms[newForm.id].getAttribute(phxChange) === newForm.getAttribute(phxChange)
        ).map((newForm) => {
          return [oldForms[newForm.id], newForm];
        })
      );
      if (formsToRecover.length === 0) {
        return callback();
      }
      formsToRecover.forEach(([oldForm, newForm], i) => {
        this.pendingForms.add(newForm.id);
        this.pushFormRecovery(
          oldForm,
          newForm,
          template.content.firstElementChild,
          () => {
            this.pendingForms.delete(newForm.id);
            if (i === formsToRecover.length - 1) {
              callback();
            }
          }
        );
      });
    }
    getChildById(id) {
      return this.root.children[this.id][id];
    }
    getDescendentByEl(el) {
      var _a;
      if (el.id === this.id) {
        return this;
      } else {
        return this.children && ((_a = this.children[el.getAttribute(PHX_PARENT_ID)]) == null ? void 0 : _a[el.id]);
      }
    }
    destroyDescendent(id) {
      for (const parentId in this.root.children) {
        for (const childId in this.root.children[parentId]) {
          if (childId === id) {
            return this.root.children[parentId][childId].destroy();
          }
        }
      }
    }
    joinChild(el) {
      const child = this.getChildById(el.id);
      if (!child) {
        const view = new _View(el, this.liveSocket, this);
        this.root.children[this.id][view.id] = view;
        view.join();
        this.childJoins++;
        return true;
      }
    }
    isJoinPending() {
      return this.joinPending;
    }
    ackJoin(_child) {
      this.childJoins--;
      if (this.childJoins === 0) {
        if (this.parent) {
          this.parent.ackJoin(this);
        } else {
          this.onAllChildJoinsComplete();
        }
      }
    }
    onAllChildJoinsComplete() {
      this.pendingForms.clear();
      this.formsForRecovery = {};
      this.joinCallback(() => {
        this.pendingJoinOps.forEach(([view, op]) => {
          if (!view.isDestroyed()) {
            op();
          }
        });
        this.pendingJoinOps = [];
      });
    }
    update(diff, events, isPending = false) {
      if (this.isJoinPending() || this.liveSocket.hasPendingLink() && this.root.isMain()) {
        if (!isPending) {
          this.pendingDiffs.push({ diff, events });
        }
        return false;
      }
      this.rendered.mergeDiff(diff);
      let phxChildrenAdded = false;
      if (this.rendered.isComponentOnlyDiff(diff)) {
        this.liveSocket.time("component patch complete", () => {
          const parentCids = dom_default.findExistingParentCIDs(
            this.id,
            this.rendered.componentCIDs(diff)
          );
          parentCids.forEach((parentCID) => {
            if (this.componentPatch(
              this.rendered.getComponent(diff, parentCID),
              parentCID
            )) {
              phxChildrenAdded = true;
            }
          });
        });
      } else if (!isEmpty(diff)) {
        this.liveSocket.time("full patch complete", () => {
          const [html, streams] = this.renderContainer(diff, "update");
          const patch = new DOMPatch(this, this.el, html, streams, null);
          phxChildrenAdded = this.performPatch(patch, true);
        });
      }
      this.liveSocket.dispatchEvents(events);
      if (phxChildrenAdded) {
        this.joinNewChildren();
      }
      return true;
    }
    renderContainer(diff, kind) {
      return this.liveSocket.time(`toString diff (${kind})`, () => {
        const tag = this.el.tagName;
        const cids = diff ? this.rendered.componentCIDs(diff) : null;
        const { buffer: html, streams } = this.rendered.toString(cids);
        return [`<${tag}>${html}</${tag}>`, streams];
      });
    }
    componentPatch(diff, cid) {
      if (isEmpty(diff))
        return false;
      const { buffer: html, streams } = this.rendered.componentToString(cid);
      const patch = new DOMPatch(this, this.el, html, streams, cid);
      const childrenAdded = this.performPatch(patch, true);
      return childrenAdded;
    }
    getHook(el) {
      return this.viewHooks[ViewHook.elementID(el)];
    }
    addHook(el) {
      const hookElId = ViewHook.elementID(el);
      if (el.getAttribute && !this.ownsElement(el)) {
        return;
      }
      if (hookElId && !this.viewHooks[hookElId]) {
        if (ViewHook.deadHook(el)) {
          return;
        }
        const hook = dom_default.getCustomElHook(el) || logError(`no hook found for custom element: ${el.id}`);
        this.viewHooks[hookElId] = hook;
        hook.__attachView(this);
        return hook;
      } else if (hookElId || !el.getAttribute) {
        return;
      } else {
        const hookName = el.getAttribute(`data-phx-${PHX_HOOK}`) || el.getAttribute(this.binding(PHX_HOOK));
        if (!hookName) {
          return;
        }
        const hookDefinition = this.liveSocket.getHookDefinition(hookName);
        if (hookDefinition) {
          if (!el.id) {
            logError(
              `no DOM ID for hook "${hookName}". Hooks require a unique ID on each element.`,
              el
            );
            return;
          }
          let hookInstance;
          try {
            if (typeof hookDefinition === "function" && hookDefinition.prototype instanceof ViewHook) {
              hookInstance = new hookDefinition(this, el);
            } else if (typeof hookDefinition === "object" && hookDefinition !== null) {
              hookInstance = new ViewHook(this, el, hookDefinition);
            } else {
              logError(
                `Invalid hook definition for "${hookName}". Expected a class extending ViewHook or an object definition.`,
                el
              );
              return;
            }
          } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            logError(`Failed to create hook "${hookName}": ${errorMessage}`, el);
            return;
          }
          this.viewHooks[ViewHook.elementID(hookInstance.el)] = hookInstance;
          return hookInstance;
        } else if (hookName !== null) {
          logError(`unknown hook found for "${hookName}"`, el);
        }
      }
    }
    destroyHook(hook) {
      const hookId = ViewHook.elementID(hook.el);
      hook.__destroyed();
      hook.__cleanup__();
      delete this.viewHooks[hookId];
    }
    applyPendingUpdates() {
      this.pendingDiffs = this.pendingDiffs.filter(
        ({ diff, events }) => !this.update(diff, events, true)
      );
      this.eachChild((child) => child.applyPendingUpdates());
    }
    eachChild(callback) {
      const children = this.root.children[this.id] || {};
      for (const id in children) {
        callback(this.getChildById(id));
      }
    }
    onChannel(event, cb) {
      this.liveSocket.onChannel(this.channel, event, (resp) => {
        if (this.isJoinPending()) {
          if (this.joinCount > 1) {
            this.pendingJoinOps.push(() => cb(resp));
          } else {
            this.root.pendingJoinOps.push([this, () => cb(resp)]);
          }
        } else {
          this.liveSocket.requestDOMUpdate(() => cb(resp));
        }
      });
    }
    bindChannel() {
      this.liveSocket.onChannel(this.channel, "diff", (rawDiff) => {
        this.liveSocket.requestDOMUpdate(() => {
          this.applyDiff(
            "update",
            rawDiff,
            ({ diff, events }) => this.update(diff, events)
          );
        });
      });
      this.onChannel(
        "redirect",
        ({ to, flash }) => this.onRedirect({ to, flash })
      );
      this.onChannel("live_patch", (redir) => this.onLivePatch(redir));
      this.onChannel("live_redirect", (redir) => this.onLiveRedirect(redir));
      this.channel.onError((reason) => this.onError(reason));
      this.channel.onClose((reason) => this.onClose(reason));
    }
    destroyAllChildren() {
      this.eachChild((child) => child.destroy());
    }
    onLiveRedirect(redir) {
      const { to, kind, flash } = redir;
      const url = this.expandURL(to);
      const e = new CustomEvent("phx:server-navigate", {
        detail: { to, kind, flash }
      });
      this.liveSocket.historyRedirect(e, url, kind, flash);
    }
    onLivePatch(redir) {
      const { to, kind } = redir;
      this.href = this.expandURL(to);
      this.liveSocket.historyPatch(to, kind);
    }
    expandURL(to) {
      return to.startsWith("/") ? `${window.location.protocol}//${window.location.host}${to}` : to;
    }
    onRedirect({
      to,
      flash,
      reloadToken
    }) {
      this.liveSocket.redirect(to, flash != null ? flash : null, reloadToken != null ? reloadToken : null);
    }
    isDestroyed() {
      return this.destroyed;
    }
    joinDead() {
      this.isDead = true;
    }
    join(callback) {
      this.showLoader(this.liveSocket.loaderTimeout);
      this.bindChannel();
      if (this.isMain()) {
        this.stopCallback = this.liveSocket.withPageLoading({
          to: this.href,
          kind: "initial"
        });
      }
      this.joinCallback = (onDone) => {
        onDone = onDone || function() {
        };
        callback ? callback(this.joinCount, onDone) : onDone();
      };
      this.wrapPush(() => this.channel.join(), {
        ok: (resp) => this.liveSocket.requestDOMUpdate(() => this.onJoin(resp)),
        error: (error) => this.onJoinError(error),
        timeout: () => this.onJoinError({ reason: "timeout" })
      });
    }
    onJoinError(resp) {
      if (resp.events) {
        this.liveSocket.dispatchEvents(resp.events);
      }
      if (resp.reason === "reload") {
        this.log("error", () => [
          `failed mount with ${resp.status}. Falling back to page reload`,
          resp
        ]);
        this.onRedirect({
          to: this.liveSocket.main.href,
          reloadToken: resp.token
        });
        return;
      } else if (resp.reason === "unauthorized" || resp.reason === "stale") {
        this.log("error", () => [
          "unauthorized live_redirect. Falling back to page request",
          resp
        ]);
        this.onRedirect({ to: this.liveSocket.main.href, flash: this.flash });
        return;
      }
      if (resp.redirect || resp.live_redirect) {
        this.joinPending = false;
        this.channel.leave();
      }
      if (resp.redirect) {
        return this.onRedirect(resp.redirect);
      }
      if (resp.live_redirect) {
        return this.onLiveRedirect(resp.live_redirect);
      }
      this.log("error", () => ["unable to join", resp]);
      if (this.isMain()) {
        this.displayError(
          [PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS],
          { unstructuredError: resp, errorKind: "server" }
        );
        if (this.liveSocket.isConnected()) {
          this.liveSocket.reloadWithJitter(this);
        }
      } else {
        if (this.joinAttempts >= MAX_CHILD_JOIN_ATTEMPTS) {
          this.root.displayError(
            [PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS],
            { unstructuredError: resp, errorKind: "server" }
          );
          this.log("error", () => [
            `giving up trying to mount after ${MAX_CHILD_JOIN_ATTEMPTS} tries`,
            resp
          ]);
          this.destroy();
        }
        const trueChildEl = dom_default.byId(this.el.id);
        if (trueChildEl) {
          dom_default.mergeAttrs(trueChildEl, this.el);
          this.displayError(
            [PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS],
            { unstructuredError: resp, errorKind: "server" }
          );
          this.el = trueChildEl;
        } else {
          this.destroy();
        }
      }
    }
    onClose(reason) {
      if (this.isDestroyed()) {
        return;
      }
      if (this.isMain() && this.liveSocket.hasPendingLink() && reason !== "leave") {
        return this.liveSocket.reloadWithJitter(this);
      }
      this.destroyAllChildren();
      this.liveSocket.dropActiveElement(this);
      if (this.liveSocket.isUnloaded()) {
        this.showLoader(BEFORE_UNLOAD_LOADER_TIMEOUT);
      }
    }
    onError(reason) {
      this.onClose(reason);
      if (this.liveSocket.isConnected()) {
        this.log("error", () => ["view crashed", reason]);
      }
      if (!this.liveSocket.isUnloaded()) {
        if (this.liveSocket.isConnected()) {
          this.displayError(
            [PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS],
            { unstructuredError: reason, errorKind: "server" }
          );
        } else {
          this.displayError(
            [PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_CLIENT_ERROR_CLASS],
            { unstructuredError: reason, errorKind: "client" }
          );
        }
      }
    }
    displayError(classes, details = {}) {
      if (this.isMain()) {
        dom_default.dispatchEvent(window, "phx:page-loading-start", {
          detail: __spreadValues({ to: this.href, kind: "error" }, details)
        });
      }
      this.showLoader();
      this.setContainerClasses(...classes);
      this.delayedDisconnected();
    }
    delayedDisconnected() {
      this.disconnectedTimer = setTimeout(() => {
        this.execAll(this.binding("disconnected"));
      }, this.liveSocket.disconnectedTimeout);
    }
    wrapPush(callerPush, receives) {
      const latency = this.liveSocket.getLatencySim();
      const withLatency = latency ? (cb) => setTimeout(() => !this.isDestroyed() && cb(), latency) : (cb) => !this.isDestroyed() && cb();
      withLatency(() => {
        callerPush().receive(
          "ok",
          (resp) => withLatency(() => receives.ok && receives.ok(resp))
        ).receive(
          "error",
          (reason) => withLatency(() => receives.error && receives.error(reason))
        ).receive(
          "timeout",
          () => withLatency(() => receives.timeout && receives.timeout())
        );
      });
    }
    pushWithReply(refGenerator, event, payload) {
      if (!this.isConnected()) {
        return Promise.reject(new Error("no connection"));
      }
      const [ref, [el], opts] = refGenerator ? refGenerator({ payload }) : [null, [], {}];
      const oldJoinCount = this.joinCount;
      let onLoadingDone = function() {
      };
      if (opts.page_loading) {
        onLoadingDone = this.liveSocket.withPageLoading({
          kind: "element",
          target: el
        });
      }
      if (typeof payload.cid !== "number") {
        delete payload.cid;
      }
      return new Promise((resolve, reject) => {
        this.wrapPush(() => this.channel.push(event, payload, PUSH_TIMEOUT), {
          ok: (resp) => {
            if (ref !== null) {
              this.lastAckRef = ref;
            }
            const finish = (hookReply) => {
              if (resp.redirect) {
                this.onRedirect(resp.redirect);
              }
              if (resp.live_patch) {
                this.onLivePatch(resp.live_patch);
              }
              if (resp.live_redirect) {
                this.onLiveRedirect(resp.live_redirect);
              }
              onLoadingDone();
              resolve({ resp, reply: hookReply, ref });
            };
            if (resp.diff) {
              this.liveSocket.requestDOMUpdate(() => {
                this.applyDiff("update", resp.diff, ({ diff, reply, events }) => {
                  if (ref !== null) {
                    this.undoRefs(ref, payload.event);
                  }
                  this.update(diff, events);
                  finish(reply);
                });
              });
            } else {
              if (ref !== null) {
                this.undoRefs(ref, payload.event);
              }
              finish(null);
            }
          },
          error: (reason) => reject(new Error(`failed with reason: ${JSON.stringify(reason)}`)),
          timeout: () => {
            reject(new Error("timeout"));
            if (this.joinCount === oldJoinCount) {
              this.liveSocket.reloadWithJitter(this, () => {
                this.log("timeout", () => [
                  "received timeout while communicating with server. Falling back to hard refresh for recovery"
                ]);
              });
            }
          }
        });
      });
    }
    undoRefs(ref, phxEvent, onlyEls) {
      if (!this.isConnected()) {
        return;
      }
      const selector = `[${PHX_REF_SRC}="${this.refSrc()}"]`;
      if (onlyEls) {
        onlyEls = new Set(onlyEls);
        dom_default.all(document, selector, (parent) => {
          if (onlyEls && !onlyEls.has(parent)) {
            return;
          }
          dom_default.all(
            parent,
            selector,
            (child) => this.undoElRef(child, ref, phxEvent)
          );
          this.undoElRef(parent, ref, phxEvent);
        });
      } else {
        dom_default.all(document, selector, (el) => this.undoElRef(el, ref, phxEvent));
      }
    }
    undoElRef(el, ref, phxEvent) {
      const elRef = new ElementRef(el);
      elRef.maybeUndo(ref, phxEvent, (clonedTree) => {
        const patch = new DOMPatch(this, el, clonedTree, /* @__PURE__ */ new Set(), null, {
          undoRef: ref
        });
        const phxChildrenAdded = this.performPatch(patch, true);
        dom_default.all(
          el,
          `[${PHX_REF_SRC}="${this.refSrc()}"]`,
          (child) => this.undoElRef(child, ref, phxEvent)
        );
        if (phxChildrenAdded) {
          this.joinNewChildren();
        }
      });
    }
    refSrc() {
      return this.el.id;
    }
    putRef(elements, phxEvent, eventType, opts = {}) {
      const newRef = this.ref++;
      const disableWith = this.binding(PHX_DISABLE_WITH);
      if (opts.loading) {
        const loadingEls = dom_default.all(document, opts.loading).map((el) => {
          return { el, lock: true, loading: true };
        });
        elements = elements.concat(loadingEls);
      }
      for (const { el, lock, loading } of elements) {
        if (!lock && !loading) {
          throw new Error("putRef requires lock or loading");
        }
        el.setAttribute(PHX_REF_SRC, this.refSrc());
        if (loading) {
          el.setAttribute(PHX_REF_LOADING, newRef.toString());
        }
        if (lock) {
          el.setAttribute(PHX_REF_LOCK, newRef.toString());
        }
        if (!loading || opts.submitter && !(el === opts.submitter || el === opts.form)) {
          continue;
        }
        const lockCompletePromise = new Promise((resolve) => {
          el.addEventListener(`phx:undo-lock:${newRef}`, () => resolve(detail), {
            once: true
          });
        });
        const loadingCompletePromise = new Promise((resolve) => {
          el.addEventListener(
            `phx:undo-loading:${newRef}`,
            () => resolve(detail),
            { once: true }
          );
        });
        el.classList.add(`phx-${eventType}-loading`);
        const disableText = el.getAttribute(disableWith);
        if (disableText !== null) {
          if (!el.getAttribute(PHX_DISABLE_WITH_RESTORE)) {
            el.setAttribute(PHX_DISABLE_WITH_RESTORE, el.textContent || "");
          }
          if (disableText !== "") {
            el.textContent = disableText;
          }
          el.setAttribute(
            PHX_DISABLED,
            el.getAttribute(PHX_DISABLED) || ("disabled" in el ? String(el.disabled) : "")
          );
          el.setAttribute("disabled", "");
        }
        const detail = {
          event: phxEvent,
          eventType,
          ref: newRef,
          isLoading: loading,
          isLocked: lock,
          lockElements: elements.filter(({ lock: lock2 }) => lock2).map(({ el: el2 }) => el2),
          loadingElements: elements.filter(({ loading: loading2 }) => loading2).map(({ el: el2 }) => el2),
          unlock: (els) => {
            els = Array.isArray(els) ? els : [els];
            this.undoRefs(newRef, phxEvent, els);
          },
          lockComplete: lockCompletePromise,
          loadingComplete: loadingCompletePromise,
          lock: (lockEl) => {
            return new Promise((resolve) => {
              if (this.isAcked(newRef)) {
                return resolve(detail);
              }
              lockEl.setAttribute(PHX_REF_LOCK, newRef);
              lockEl.setAttribute(PHX_REF_SRC, this.refSrc());
              lockEl.addEventListener(
                `phx:lock-stop:${newRef}`,
                () => resolve(detail),
                { once: true }
              );
            });
          }
        };
        if (opts.payload) {
          detail["payload"] = opts.payload;
        }
        if (opts.target) {
          detail["target"] = opts.target;
        }
        if (opts.originalEvent) {
          detail["originalEvent"] = opts.originalEvent;
        }
        el.dispatchEvent(
          new CustomEvent("phx:push", {
            detail,
            bubbles: true,
            cancelable: false
          })
        );
        if (phxEvent) {
          el.dispatchEvent(
            new CustomEvent(`phx:push:${phxEvent}`, {
              detail,
              bubbles: true,
              cancelable: false
            })
          );
        }
      }
      return [newRef, elements.map(({ el }) => el), opts];
    }
    isAcked(ref) {
      return this.lastAckRef !== null && this.lastAckRef >= ref;
    }
    componentID(el) {
      const cid = el.getAttribute && el.getAttribute(PHX_COMPONENT);
      return cid ? parseInt(cid) : null;
    }
    targetComponentID(target, targetCtx, opts = {}) {
      if (isCid(targetCtx)) {
        return targetCtx;
      }
      const cidOrSelector = opts.target || target.getAttribute(this.binding("target"));
      if (isCid(cidOrSelector)) {
        return typeof cidOrSelector === "number" ? cidOrSelector : parseInt(cidOrSelector);
      } else if (targetCtx && (cidOrSelector !== null || opts.target)) {
        return this.closestComponentID(targetCtx);
      } else {
        return null;
      }
    }
    closestComponentID(targetCtx) {
      if (isCid(targetCtx)) {
        return targetCtx;
      } else if (targetCtx) {
        return maybe(
          // We either use the closest data-phx-component binding, or -
          // in case of portals - continue with the portal source.
          // This is necessary if teleporting an element outside of its LiveComponent.
          targetCtx.closest(`[${PHX_COMPONENT}],[${PHX_TELEPORTED_SRC}]`),
          (el) => {
            if (el.hasAttribute(PHX_COMPONENT)) {
              return this.ownsElement(el) && this.componentID(el);
            }
            if (el.hasAttribute(PHX_TELEPORTED_SRC)) {
              const portalParent = dom_default.byId(el.getAttribute(PHX_TELEPORTED_SRC));
              return this.closestComponentID(portalParent);
            }
          }
        );
      } else {
        return null;
      }
    }
    pushHookEvent(el, targetCtx, event, payload) {
      if (!this.isConnected()) {
        this.log("hook", () => [
          "unable to push hook event. LiveView not connected",
          event,
          payload
        ]);
        return Promise.reject(
          new Error("unable to push hook event. LiveView not connected")
        );
      }
      const refGenerator = () => this.putRef([{ el, loading: true, lock: true }], event, "hook", {
        payload,
        target: targetCtx
      });
      return this.pushWithReply(refGenerator, "event", {
        type: "hook",
        event,
        value: payload,
        cid: this.closestComponentID(targetCtx)
      }).then(
        ({ resp: _resp, reply, ref }) => ({ reply, ref })
      );
    }
    extractMeta(el, meta, value) {
      const prefix = this.binding("value-");
      for (let i = 0; i < el.attributes.length; i++) {
        if (!meta) {
          meta = {};
        }
        const name = el.attributes[i].name;
        if (name.startsWith(prefix)) {
          meta[name.replace(prefix, "")] = el.getAttribute(name);
        }
      }
      if (el.value !== void 0 && !(el instanceof HTMLFormElement)) {
        if (!meta) {
          meta = {};
        }
        meta.value = el.value;
        if (el.tagName === "INPUT" && CHECKABLE_INPUTS.indexOf(el.type) >= 0 && !el.checked) {
          delete meta.value;
        }
      }
      if (value) {
        if (!meta) {
          meta = {};
        }
        for (const key in value) {
          meta[key] = value[key];
        }
      }
      return meta;
    }
    serializeForm(form, opts = {}, onlyNames = []) {
      const { submitter } = opts;
      let injectedElement;
      if (submitter && submitter.name) {
        const input = document.createElement("input");
        input.type = "hidden";
        const formId = submitter.getAttribute("form");
        if (formId) {
          input.setAttribute("form", formId);
        }
        input.name = submitter.name;
        input.value = submitter.value;
        submitter.parentElement.insertBefore(input, submitter);
        injectedElement = input;
      }
      const formData = new FormData(form);
      const toRemove = [];
      formData.forEach((val, key, _index) => {
        if (val instanceof File) {
          toRemove.push(key);
        }
      });
      toRemove.forEach((key) => formData.delete(key));
      const params = new URLSearchParams();
      const { inputsUnused, onlyHiddenInputs } = Array.from(form.elements).reduce(
        (acc, input) => {
          if (!dom_default.isFormAssociated(input)) {
            return acc;
          }
          const { inputsUnused: inputsUnused2, onlyHiddenInputs: onlyHiddenInputs2 } = acc;
          const key = input.name;
          if (!key) {
            return acc;
          }
          if (inputsUnused2[key] === void 0) {
            inputsUnused2[key] = true;
          }
          if (onlyHiddenInputs2[key] === void 0) {
            onlyHiddenInputs2[key] = true;
          }
          const inputSkipUnusedField = input.hasAttribute(
            this.binding(PHX_NO_UNUSED_FIELD)
          );
          const isUsed = dom_default.private(input, PHX_HAS_FOCUSED) || dom_default.private(input, PHX_HAS_SUBMITTED) || inputSkipUnusedField;
          const isHidden = input.type === "hidden";
          inputsUnused2[key] = inputsUnused2[key] && !isUsed;
          onlyHiddenInputs2[key] = onlyHiddenInputs2[key] && isHidden;
          return acc;
        },
        { inputsUnused: {}, onlyHiddenInputs: {} }
      );
      const formSkipUnusedFields = form.hasAttribute(
        this.binding(PHX_NO_UNUSED_FIELD)
      );
      for (const [key, val] of formData.entries()) {
        if (onlyNames.length === 0 || onlyNames.indexOf(key) >= 0) {
          const isUnused = inputsUnused[key];
          const hidden = onlyHiddenInputs[key];
          const skipUnusedCheck = formSkipUnusedFields;
          if (!skipUnusedCheck && isUnused && !(submitter && submitter.name == key) && !hidden) {
            params.append(prependFormDataKey(key, "_unused_"), "");
          }
          if (typeof val === "string") {
            params.append(key, val);
          }
        }
      }
      if (submitter && injectedElement) {
        submitter.parentElement.removeChild(injectedElement);
      }
      return params.toString();
    }
    pushEvent(type, el, targetCtx, phxEvent, meta, opts = {}, onReply) {
      this.pushWithReply(
        (maybePayload) => this.putRef([{ el, loading: true, lock: true }], phxEvent, type, __spreadProps(__spreadValues({}, opts), {
          payload: maybePayload == null ? void 0 : maybePayload.payload
        })),
        "event",
        {
          type,
          event: phxEvent,
          value: this.extractMeta(el, meta, opts.value),
          cid: this.targetComponentID(el, targetCtx, opts)
        }
      ).then(({ reply }) => onReply && onReply(reply)).catch((error) => logError("Failed to push event", error));
    }
    pushFileProgress(fileEl, entryRef, progress, onReply = function() {
    }) {
      this.liveSocket.withinOwners(fileEl.form, (view, targetCtx) => {
        view.pushWithReply(null, "progress", {
          event: fileEl.getAttribute(view.binding(PHX_PROGRESS)),
          ref: fileEl.getAttribute(PHX_UPLOAD_REF),
          entry_ref: entryRef,
          progress,
          cid: view.targetComponentID(fileEl.form, targetCtx)
        }).then(() => onReply()).catch((error) => logError("Failed to push file progress", error));
      });
    }
    pushInput(inputEl, targetCtx, forceCid, phxEvent, opts, callback) {
      if (!inputEl.form) {
        throw new Error("form events require the input to be inside a form");
      }
      let uploads;
      const cid = isCid(forceCid) ? forceCid : this.targetComponentID(inputEl.form, targetCtx, opts);
      const refGenerator = (maybePayload) => {
        return this.putRef(
          [
            { el: inputEl, loading: true, lock: true },
            { el: inputEl.form, loading: true, lock: true }
          ],
          phxEvent,
          "change",
          __spreadProps(__spreadValues({}, opts), { payload: maybePayload == null ? void 0 : maybePayload.payload })
        );
      };
      let formData;
      const meta = this.extractMeta(inputEl.form, {}, opts.value);
      const serializeOpts = {};
      if (inputEl instanceof HTMLButtonElement) {
        serializeOpts.submitter = inputEl;
      }
      if (inputEl.getAttribute(this.binding("change"))) {
        formData = this.serializeForm(inputEl.form, serializeOpts, [
          inputEl.name
        ]);
      } else {
        formData = this.serializeForm(inputEl.form, serializeOpts);
      }
      if (dom_default.isUploadInput(inputEl) && inputEl.files && inputEl.files.length > 0) {
        LiveUploader.trackFiles(inputEl, Array.from(inputEl.files));
      }
      uploads = LiveUploader.serializeUploads(inputEl);
      const event = {
        type: "form",
        event: phxEvent,
        value: formData,
        meta: __spreadValues({
          // no target was implicitly sent as "undefined" in LV <= 1.0.5, therefore
          // we have to keep it. In 1.0.6 we switched from passing meta as URL encoded data
          // to passing it directly in the event, but the JSON encode would drop keys with
          // undefined values.
          _target: opts._target || "undefined"
        }, meta),
        uploads,
        cid
      };
      this.pushWithReply(refGenerator, "event", event).then(({ resp }) => {
        if (dom_default.isUploadInput(inputEl) && dom_default.isAutoUpload(inputEl)) {
          ElementRef.onUnlock(inputEl, () => {
            if (LiveUploader.filesAwaitingPreflight(inputEl).length > 0) {
              const [ref, _els] = refGenerator();
              this.undoRefs(ref, phxEvent, [inputEl.form]);
              this.uploadFiles(
                inputEl.form,
                phxEvent,
                targetCtx,
                ref,
                cid,
                (_uploads) => {
                  callback && callback(resp);
                  this.triggerAwaitingSubmit(inputEl.form, phxEvent);
                  this.undoRefs(ref, phxEvent);
                }
              );
            }
          });
        } else {
          callback && callback(resp);
        }
      }).catch((error) => logError("Failed to push input event", error));
    }
    triggerAwaitingSubmit(formEl, phxEvent) {
      const awaitingSubmit = this.getScheduledSubmit(formEl);
      if (awaitingSubmit) {
        const [_el, _ref, _opts, callback] = awaitingSubmit;
        this.cancelSubmit(formEl, phxEvent);
        callback();
      }
    }
    getScheduledSubmit(formEl) {
      return this.formSubmits.find(
        ([el, _ref, _opts, _callback]) => el.isSameNode(formEl)
      );
    }
    scheduleSubmit(formEl, ref, opts, callback) {
      if (this.getScheduledSubmit(formEl)) {
        return true;
      }
      this.formSubmits.push([formEl, ref, opts, callback]);
    }
    cancelSubmit(formEl, phxEvent) {
      this.formSubmits = this.formSubmits.filter(
        ([el, ref, _opts, _callback]) => {
          if (el.isSameNode(formEl)) {
            this.undoRefs(ref, phxEvent);
            return false;
          } else {
            return true;
          }
        }
      );
    }
    disableForm(formEl, phxEvent, opts = {}) {
      const filterIgnored = (el) => {
        const userIgnored = closestPhxBinding(
          el,
          `${this.binding(PHX_UPDATE)}=ignore`,
          el.form
        );
        return !(userIgnored || closestPhxBinding(el, "data-phx-update=ignore", el.form));
      };
      const filterDisables = (el) => {
        return el.hasAttribute(this.binding(PHX_DISABLE_WITH));
      };
      const filterButton = (el) => el.tagName == "BUTTON";
      const filterInput = (el) => ["INPUT", "TEXTAREA"].includes(el.tagName);
      const formElements = Array.from(formEl.elements);
      const disables = formElements.filter(filterDisables);
      const buttons = formElements.filter(filterButton).filter(filterIgnored);
      const inputs = formElements.filter(filterInput).filter(filterIgnored);
      buttons.forEach((button) => {
        button.setAttribute(PHX_DISABLED, button.disabled.toString());
        button.disabled = true;
      });
      inputs.forEach((input) => {
        input.setAttribute(PHX_READONLY, input.readOnly.toString());
        input.readOnly = true;
        if (input instanceof HTMLInputElement && input.files) {
          input.setAttribute(PHX_DISABLED, input.disabled.toString());
          input.disabled = true;
        }
      });
      const formEls = disables.concat(buttons).concat(inputs).map((el) => {
        return { el, loading: true, lock: true };
      });
      const els = [
        { el: formEl, loading: true, lock: false },
        ...formEls
      ].reverse();
      return this.putRef(els, phxEvent, "submit", opts);
    }
    pushFormSubmit(formEl, targetCtx, phxEvent, submitter, opts, onReply) {
      const refGenerator = (maybePayload) => this.disableForm(formEl, phxEvent, __spreadProps(__spreadValues({}, opts), {
        form: formEl,
        payload: maybePayload == null ? void 0 : maybePayload.payload,
        submitter
      }));
      dom_default.putPrivate(formEl, "submitter", submitter);
      const cid = this.targetComponentID(formEl, targetCtx);
      if (LiveUploader.hasUploadsInProgress(formEl)) {
        const [ref, _els] = refGenerator();
        const push = () => this.pushFormSubmit(
          formEl,
          targetCtx,
          phxEvent,
          submitter,
          opts,
          onReply
        );
        return this.scheduleSubmit(formEl, ref, opts, push);
      } else if (LiveUploader.inputsAwaitingPreflight(formEl).length > 0) {
        const [ref, els] = refGenerator();
        const proxyRefGen = () => [ref, els, opts];
        this.uploadFiles(formEl, phxEvent, targetCtx, ref, cid, (_uploads) => {
          if (LiveUploader.inputsAwaitingPreflight(formEl).length > 0) {
            return this.undoRefs(ref, phxEvent);
          }
          const meta = this.extractMeta(formEl, {}, opts.value);
          const formData = this.serializeForm(formEl, { submitter });
          this.pushWithReply(proxyRefGen, "event", {
            type: "form",
            event: phxEvent,
            value: formData,
            meta,
            cid
          }).then(({ resp }) => onReply(resp)).catch((error) => logError("Failed to push form submit", error));
        });
      } else if (!(formEl.hasAttribute(PHX_REF_SRC) && formEl.classList.contains("phx-submit-loading"))) {
        const meta = this.extractMeta(formEl, {}, opts.value);
        const formData = this.serializeForm(formEl, { submitter });
        this.pushWithReply(refGenerator, "event", {
          type: "form",
          event: phxEvent,
          value: formData,
          meta,
          cid
        }).then(({ resp }) => onReply(resp)).catch((error) => logError("Failed to push form submit", error));
      }
    }
    uploadFiles(formEl, phxEvent, targetCtx, ref, cid, onComplete) {
      const joinCountAtUpload = this.joinCount;
      const inputEls = LiveUploader.activeFileInputs(formEl);
      let numFileInputsInProgress = inputEls.length;
      inputEls.forEach((inputEl) => {
        const uploader = new LiveUploader(inputEl, this, () => {
          numFileInputsInProgress--;
          if (numFileInputsInProgress === 0) {
            onComplete();
          }
        });
        const entries = uploader.entries().map((entry) => entry.toPreflightPayload());
        if (entries.length === 0) {
          numFileInputsInProgress--;
          return;
        }
        const payload = {
          ref: inputEl.getAttribute(PHX_UPLOAD_REF),
          entries,
          cid: this.targetComponentID(inputEl.form, targetCtx)
        };
        this.log("upload", () => ["sending preflight request", payload]);
        this.pushWithReply(null, "allow_upload", payload).then(({ resp }) => {
          this.log("upload", () => ["got preflight response", resp]);
          uploader.entries().forEach((entry) => {
            if (resp.entries && !resp.entries[entry.ref]) {
              this.handleFailedEntryPreflight(
                entry.ref,
                "failed preflight",
                uploader
              );
            }
          });
          if (resp.error || Object.keys(resp.entries).length === 0) {
            this.undoRefs(ref, phxEvent);
            const errors = resp.error || [];
            errors.map(([entry_ref, reason]) => {
              this.handleFailedEntryPreflight(entry_ref, reason, uploader);
            });
          } else {
            const onError = (callback) => {
              this.channel.onError(() => {
                if (this.joinCount === joinCountAtUpload) {
                  callback();
                }
              });
            };
            uploader.initAdapterUpload(resp, onError, this.liveSocket);
          }
        }).catch((error) => logError("Failed to push upload", error));
      });
    }
    handleFailedEntryPreflight(uploadRef, reason, uploader) {
      if (uploader.isAutoUpload()) {
        const entry = uploader.entries().find((entry2) => entry2.ref === uploadRef.toString());
        if (entry) {
          entry.cancel();
        }
      } else {
        uploader.entries().map((entry) => entry.cancel());
      }
      this.log("upload", () => [`error for entry ${uploadRef}`, reason]);
    }
    dispatchUploads(targetCtx, name, filesOrBlobs) {
      const targetElement = this.targetCtxElement(targetCtx) || this.el;
      const inputs = dom_default.findUploadInputs(targetElement).filter(
        (el) => el.name === name
      );
      if (inputs.length === 0) {
        logError(`no live file inputs found matching the name "${name}"`);
      } else if (inputs.length > 1) {
        logError(`duplicate live file inputs found matching the name "${name}"`);
      } else {
        dom_default.dispatchEvent(inputs[0], PHX_TRACK_UPLOADS, {
          detail: { files: filesOrBlobs }
        });
      }
    }
    targetCtxElement(targetCtx) {
      if (isCid(targetCtx)) {
        const target = dom_default.findComponent(this.id, targetCtx);
        return target;
      } else if (targetCtx) {
        return targetCtx;
      } else {
        return null;
      }
    }
    pushFormRecovery(oldForm, newForm, templateDom, callback) {
      const phxChange = this.binding("change");
      const phxTarget = newForm.getAttribute(this.binding("target")) || newForm;
      const phxEvent = newForm.getAttribute(this.binding(PHX_AUTO_RECOVER)) || newForm.getAttribute(this.binding("change"));
      const inputs = Array.from(oldForm.elements).filter(
        (el) => dom_default.isFormAssociated(el) && el.name && !el.hasAttribute(phxChange)
      );
      if (inputs.length === 0) {
        callback();
        return;
      }
      inputs.forEach(
        (input2) => input2.hasAttribute(PHX_UPLOAD_REF) && LiveUploader.clearFiles(input2)
      );
      const input = inputs.find((el) => el.type !== "hidden") || inputs[0];
      let pending = 0;
      this.withinTargets(
        phxTarget,
        (targetView, targetCtx) => {
          const cid = this.targetComponentID(newForm, targetCtx);
          pending++;
          let e = new CustomEvent("phx:form-recovery", {
            detail: { sourceElement: oldForm }
          });
          js_default.exec(e, "change", phxEvent, this, input, [
            "push",
            {
              _target: input.name,
              targetView,
              targetCtx,
              newCid: cid,
              callback: () => {
                pending--;
                if (pending === 0) {
                  callback();
                }
              }
            }
          ]);
        },
        templateDom
      );
    }
    pushLinkPatch(e, href, targetEl, callback) {
      const linkRef = this.liveSocket.setPendingLink(href);
      const loading = e.isTrusted && e.type !== "popstate";
      const refGen = targetEl ? () => this.putRef(
        [{ el: targetEl, loading, lock: true }],
        null,
        "click"
      ) : null;
      const fallback = () => this.liveSocket.redirect(window.location.href, null, null);
      const url = href.startsWith("/") ? `${location.protocol}//${location.host}${href}` : href;
      this.pushWithReply(refGen, "live_patch", { url }).then(
        ({ resp }) => {
          this.liveSocket.requestDOMUpdate(() => {
            if (resp.link_redirect) {
              this.liveSocket.replaceMain(href, null, callback, linkRef);
            } else if (resp.redirect) {
              return;
            } else {
              if (this.liveSocket.commitPendingLink(linkRef)) {
                this.href = href;
              }
              this.applyPendingUpdates();
              callback && callback(linkRef);
            }
          });
        },
        ({ error: _error, timeout: _timeout }) => fallback()
      );
    }
    getFormsForRecovery() {
      if (this.joinCount === 0) {
        return {};
      }
      const phxChange = this.binding("change");
      return dom_default.all(
        document,
        `#${CSS.escape(this.id)} form[${phxChange}], [${PHX_TELEPORTED_REF}="${CSS.escape(this.id)}"] form[${phxChange}]`
      ).filter((form) => form instanceof HTMLFormElement).filter((form) => form.id).filter((form) => form.elements.length > 0).filter(
        (form) => form.getAttribute(this.binding(PHX_AUTO_RECOVER)) !== "ignore"
      ).map((form) => {
        const clonedForm = form.cloneNode(true);
        morphdom_esm_default(clonedForm, form, {
          onBeforeElUpdated: (fromEl, toEl) => {
            dom_default.copyPrivates(fromEl, toEl);
            if (fromEl.getAttribute("form") === form.id && fromEl.parentNode) {
              fromEl.parentNode.removeChild(fromEl);
              return false;
            }
            return true;
          }
        });
        const externalElements = document.querySelectorAll(
          `[form="${CSS.escape(form.id)}"]`
        );
        Array.from(externalElements).forEach((el) => {
          const clonedEl = el.cloneNode(true);
          morphdom_esm_default(clonedEl, el);
          dom_default.copyPrivates(clonedEl, el);
          clonedEl.removeAttribute("form");
          clonedForm.appendChild(clonedEl);
        });
        return clonedForm;
      }).reduce((acc, form) => {
        acc[form.id] = form;
        return acc;
      }, {});
    }
    maybePushComponentsDestroyed(destroyedCIDs) {
      let willDestroyCIDs = destroyedCIDs.filter((cid) => {
        return dom_default.findComponent(this.id, cid) === null;
      });
      const onError = (error) => {
        if (!this.isDestroyed()) {
          logError("Failed to push components destroyed", error);
        }
      };
      if (willDestroyCIDs.length > 0) {
        willDestroyCIDs.forEach((cid) => this.rendered.resetRender(cid));
        this.pushWithReply(null, "cids_will_destroy", { cids: willDestroyCIDs }).then(() => {
          this.liveSocket.requestDOMUpdate(() => {
            let completelyDestroyCIDs = willDestroyCIDs.filter((cid) => {
              return dom_default.findComponent(this.id, cid) === null;
            });
            if (completelyDestroyCIDs.length > 0) {
              this.pushWithReply(null, "cids_destroyed", {
                cids: completelyDestroyCIDs
              }).then(({ resp }) => {
                this.rendered.pruneCIDs(resp.cids);
              }).catch(onError);
            }
          });
        }).catch(onError);
      }
    }
    ownsElement(el) {
      let parentViewEl = dom_default.closestViewEl(el);
      return el.getAttribute(PHX_PARENT_ID) === this.id || parentViewEl && parentViewEl.id === this.id || !parentViewEl && this.isDead;
    }
    submitForm(form, targetCtx, phxEvent, submitter, opts = {}) {
      dom_default.putPrivate(form, PHX_HAS_SUBMITTED, true);
      const inputs = Array.from(form.elements);
      inputs.forEach((input) => dom_default.putPrivate(input, PHX_HAS_SUBMITTED, true));
      this.liveSocket.blurActiveElement();
      this.pushFormSubmit(form, targetCtx, phxEvent, submitter, opts, () => {
        this.liveSocket.restorePreviouslyActiveFocus();
      });
    }
    binding(kind) {
      return this.liveSocket.binding(kind);
    }
    // phx-portal
    pushPortalElementId(id) {
      this.portalElementIds.add(id);
    }
    dropPortalElementId(id) {
      this.portalElementIds.delete(id);
    }
    destroyPortalElements() {
      if (!this.liveSocket.unloaded) {
        this.portalElementIds.forEach((id) => {
          const el = document.getElementById(id);
          if (el) {
            el.remove();
          }
        });
      }
    }
  };
  var LiveSocket = class {
    /**
     * Creates a new LiveSocket instance.
     */
    constructor(url, phxSocket, opts = {}) {
      this.unloaded = false;
      if (!phxSocket || phxSocket.constructor.name === "Object") {
        throw new Error(`
      a phoenix Socket must be provided as the second argument to the LiveSocket constructor. For example:

          import {Socket} from "phoenix"
          import {LiveSocket} from "phoenix_live_view"
          let liveSocket = new LiveSocket("/live", Socket, {...})
      `);
      }
      this.socket = new phxSocket(url, opts);
      this.bindingPrefix = opts.bindingPrefix || BINDING_PREFIX;
      this.params = closure2(opts.params || {});
      this.viewLogger = opts.viewLogger;
      this.metadataCallbacks = opts.metadata || {};
      this.defaults = Object.assign(clone(DEFAULTS), opts.defaults || {});
      this.prevActive = null;
      this.silenced = false;
      this.main = null;
      this.outgoingMainEl = null;
      this.clickStartedAtTarget = null;
      this.linkRef = 1;
      this.roots = {};
      this.href = window.location.href;
      this.pendingLink = null;
      this.currentLocation = clone(window.location);
      this.hooks = opts.hooks || {};
      this.uploaders = opts.uploaders || {};
      this.loaderTimeout = opts.loaderTimeout || LOADER_TIMEOUT;
      this.disconnectedTimeout = opts.disconnectedTimeout || DISCONNECTED_TIMEOUT;
      this.reloadWithJitterTimer = null;
      this.maxReloads = opts.maxReloads || MAX_RELOADS;
      this.reloadJitterMin = opts.reloadJitterMin || RELOAD_JITTER_MIN;
      this.reloadJitterMax = opts.reloadJitterMax || RELOAD_JITTER_MAX;
      this.failsafeJitter = opts.failsafeJitter || FAILSAFE_JITTER;
      this.localStorage = opts.localStorage || window.localStorage;
      this.sessionStorage = opts.sessionStorage || window.sessionStorage;
      this.boundTopLevelEvents = false;
      this.boundEventNames = /* @__PURE__ */ new Set();
      this.blockPhxChangeWhileComposing = opts.blockPhxChangeWhileComposing || false;
      this.serverCloseRef = null;
      this.domCallbacks = Object.assign(
        {
          jsQuerySelectorAll: null,
          onPatchStart: closure2(),
          onPatchEnd: closure2(),
          onNodeAdded: closure2(),
          onBeforeElUpdated: closure2()
        },
        opts.dom || {}
      );
      this.transitions = new TransitionSet();
      this.currentHistoryPosition = parseInt(this.sessionStorage.getItem(PHX_LV_HISTORY_POSITION) || "0") || 0;
      window.addEventListener("pagehide", (_e) => {
        this.unloaded = true;
      });
      this.socket.onOpen(() => {
        if (this.isUnloaded()) {
          window.location.reload();
        }
      });
    }
    // public
    /**
     * Returns the version of the LiveView client.
     */
    version() {
      return "1.2.3";
    }
    /**
     * Returns true if profiling is enabled. See {@link enableProfiling} and {@link disableProfiling}.
     */
    isProfileEnabled() {
      return this.sessionStorage.getItem(PHX_LV_PROFILE) === "true";
    }
    /**
     * Returns true if debugging is enabled. See {@link enableDebug} and {@link disableDebug}.
     */
    isDebugEnabled() {
      return this.sessionStorage.getItem(PHX_LV_DEBUG) === "true";
    }
    /**
     * Returns true if debugging is disabled. See {@link enableDebug} and {@link disableDebug}.
     */
    isDebugDisabled() {
      return this.sessionStorage.getItem(PHX_LV_DEBUG) === "false";
    }
    /**
     * Enables debugging.
     *
     * When debugging is enabled, the LiveView client will log debug information to the console.
     * See [Debugging client events](https://phoenix-live-view.hexdocs.pm/js-interop.html#debugging-client-events) for more information.
     */
    enableDebug() {
      this.sessionStorage.setItem(PHX_LV_DEBUG, "true");
    }
    /**
     * Enables profiling.
     *
     * When profiling is enabled, the LiveView client will log profiling information to the console.
     */
    enableProfiling() {
      this.sessionStorage.setItem(PHX_LV_PROFILE, "true");
    }
    /**
     * Disables debugging.
     */
    disableDebug() {
      this.sessionStorage.setItem(PHX_LV_DEBUG, "false");
    }
    /**
     * Disables profiling.
     */
    disableProfiling() {
      this.sessionStorage.removeItem(PHX_LV_PROFILE);
    }
    /**
     * Enables latency simulation.
     *
     * When latency simulation is enabled, the LiveView client will add a delay to requests and responses from the server.
     * See [Simulating Latency](https://phoenix-live-view.hexdocs.pm/js-interop.html#simulating-latency) for more information.
     */
    enableLatencySim(upperBoundMs) {
      this.enableDebug();
      console.log(
        "latency simulator enabled for the duration of this browser session. Call disableLatencySim() to disable"
      );
      this.sessionStorage.setItem(PHX_LV_LATENCY_SIM, upperBoundMs.toString());
    }
    /**
     * Disables latency simulation.
     */
    disableLatencySim() {
      this.sessionStorage.removeItem(PHX_LV_LATENCY_SIM);
    }
    /**
     * Returns the current latency simulation upper bound.
     */
    getLatencySim() {
      const str = this.sessionStorage.getItem(PHX_LV_LATENCY_SIM);
      return str ? parseInt(str) : null;
    }
    /**
     * Returns the Phoenix Socket instance.
     */
    getSocket() {
      return this.socket;
    }
    /**
     * Connects to the LiveView server.
     */
    connect() {
      if (window.location.hostname === "localhost" && !this.isDebugDisabled()) {
        this.enableDebug();
      }
      const doConnect = () => {
        this.resetReloadStatus();
        if (this.joinRootViews()) {
          this.bindTopLevelEvents();
          this.socket.connect();
        } else if (this.main) {
          this.socket.connect();
        } else {
          this.bindTopLevelEvents({ dead: true });
        }
        this.joinDeadView();
      };
      if (["complete", "loaded", "interactive"].indexOf(document.readyState) >= 0) {
        doConnect();
      } else {
        document.addEventListener("DOMContentLoaded", () => doConnect());
      }
    }
    /**
     * Disconnects from the LiveView server.
     */
    disconnect(callback) {
      this.reloadWithJitterTimer != null && clearTimeout(this.reloadWithJitterTimer);
      if (this.serverCloseRef) {
        this.socket.off([this.serverCloseRef]);
        this.serverCloseRef = null;
      }
      this.socket.disconnect(callback);
    }
    /**
     * Can be used to replace the transport used by the underlying Phoenix Socket.
     */
    replaceTransport(transport) {
      this.reloadWithJitterTimer != null && clearTimeout(this.reloadWithJitterTimer);
      this.socket.replaceTransport(transport);
      this.connect();
    }
    /**
     * Executes an encoded JS command, targeting the given element.
     *
     * See [`Phoenix.LiveView.JS`](https://phoenix-live-view.hexdocs.pm/Phoenix.LiveView.JS.html) for more information.
     */
    execJS(el, encodedJS, eventType = null) {
      const e = new CustomEvent("phx:exec", { detail: { sourceElement: el } });
      this.owner(el, (view) => js_default.exec(e, eventType, encodedJS, view, el));
    }
    /**
     * Returns an object with methods to manipulate the DOM and execute JavaScript.
     * The applied changes integrate with server DOM patching.
     *
     * See [JavaScript interoperability](https://phoenix-live-view.hexdocs.pm/js-interop.html) for more information.
     */
    js() {
      return js_commands_default(this, "js");
    }
    // private
    /** @internal */
    unload() {
      if (this.unloaded) {
        return;
      }
      if (this.main && this.isConnected()) {
        this.log(this.main, "socket", () => ["disconnect for page nav"]);
      }
      this.unloaded = true;
      this.destroyAllViews();
      this.disconnect();
    }
    /** @internal */
    triggerDOM(kind, args) {
      this.domCallbacks[kind](...args);
    }
    /** @internal */
    time(name, func) {
      if (!this.isProfileEnabled() || !console.time) {
        return func();
      }
      console.time(name);
      const result = func();
      console.timeEnd(name);
      return result;
    }
    /** @internal */
    log(view, kind, msgCallback) {
      if (this.viewLogger) {
        const [msg, obj] = msgCallback();
        this.viewLogger(view, kind, msg, obj);
      } else if (this.isDebugEnabled()) {
        const [msg, obj] = msgCallback();
        debug(view, kind, msg, obj);
      }
    }
    /** @internal */
    requestDOMUpdate(callback) {
      this.transitions.after(callback);
    }
    /** @internal */
    asyncTransition(promise) {
      this.transitions.addAsyncTransition(promise);
    }
    /** @internal */
    transition(time, onStart, onDone = function() {
    }) {
      this.transitions.addTransition(time, onStart, onDone);
    }
    /** @internal */
    onChannel(channel, event, cb) {
      channel.on(event, (data) => {
        const latency = this.getLatencySim();
        if (!latency) {
          cb(data);
        } else {
          setTimeout(() => cb(data), latency);
        }
      });
    }
    /** @internal */
    reloadWithJitter(view, log) {
      this.reloadWithJitterTimer != null && clearTimeout(this.reloadWithJitterTimer);
      this.disconnect();
      const minMs = this.reloadJitterMin;
      const maxMs = this.reloadJitterMax;
      let afterMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
      const tries = browser_default.updateLocal(
        this.localStorage,
        window.location.pathname,
        CONSECUTIVE_RELOADS,
        0,
        (count) => count + 1
      );
      if (tries >= this.maxReloads) {
        afterMs = this.failsafeJitter;
      }
      this.reloadWithJitterTimer = setTimeout(() => {
        if (view.isDestroyed() || view.isConnected()) {
          return;
        }
        view.destroy();
        log ? log() : this.log(view, "join", () => [
          `encountered ${tries} consecutive reloads`
        ]);
        if (tries >= this.maxReloads) {
          this.log(view, "join", () => [
            `exceeded ${this.maxReloads} consecutive reloads. Entering failsafe mode`
          ]);
        }
        if (this.pendingLink !== null) {
          window.location.href = this.pendingLink;
        } else {
          window.location.reload();
        }
      }, afterMs);
    }
    /** @internal */
    getHookDefinition(name) {
      if (!name) {
        return;
      }
      return this.maybeInternalHook(name) || this.hooks[name] || this.maybeRuntimeHook(name);
    }
    /** @internal */
    maybeInternalHook(name) {
      return name && name.startsWith("Phoenix.") && hooks_default[name.split(".")[1]];
    }
    /** @internal */
    maybeRuntimeHook(name) {
      const runtimeHook = document.querySelector(
        `script[${PHX_RUNTIME_HOOK}="${CSS.escape(name)}"]`
      );
      if (!runtimeHook) {
        return;
      }
      let callbacks = window[`phx_hook_${name}`];
      if (!callbacks || typeof callbacks !== "function") {
        logError("a runtime hook must be a function", runtimeHook);
        return;
      }
      const hookDefiniton = callbacks();
      if (hookDefiniton && (typeof hookDefiniton === "object" || typeof hookDefiniton === "function")) {
        return hookDefiniton;
      }
      logError(
        "runtime hook must return an object with hook callbacks or an instance of ViewHook",
        runtimeHook
      );
    }
    /** @internal */
    isUnloaded() {
      return this.unloaded;
    }
    /** @internal */
    isConnected() {
      return this.socket.isConnected();
    }
    /** @internal */
    getBindingPrefix() {
      return this.bindingPrefix;
    }
    /** @internal */
    binding(kind) {
      return `${this.getBindingPrefix()}${kind}`;
    }
    /** @internal */
    channel(topic, params) {
      return this.socket.channel(topic, params);
    }
    /** @internal */
    joinDeadView() {
      const body = document.body;
      if (body && !this.isPhxView(body) && !this.isPhxView(document.firstElementChild)) {
        const view = this.newRootView(body);
        view.setHref(this.getHref());
        view.joinDead();
        if (!this.main) {
          this.main = view;
        }
        window.requestAnimationFrame(() => {
          var _a;
          view.execNewMounted();
          this.maybeScroll((_a = history.state) == null ? void 0 : _a.scroll);
        });
      }
    }
    /** @internal */
    joinRootViews() {
      let rootsFound = false;
      dom_default.all(
        document,
        `${PHX_VIEW_SELECTOR}:not([${PHX_PARENT_ID}])`,
        (rootEl) => {
          if (!this.getRootById(rootEl.id)) {
            const view = this.newRootView(rootEl);
            if (!dom_default.isPhxSticky(rootEl)) {
              view.setHref(this.getHref());
            }
            view.join();
            if (rootEl.hasAttribute(PHX_MAIN)) {
              this.main = view;
            }
          }
          rootsFound = true;
        }
      );
      return rootsFound;
    }
    /** @internal */
    redirect(to, flash, reloadToken) {
      if (reloadToken) {
        browser_default.setCookie(PHX_RELOAD_STATUS, reloadToken, 60);
      }
      this.unload();
      browser_default.redirect(to, flash);
    }
    /** @internal */
    replaceMain(href, flash, callback = null, linkRef = this.setPendingLink(href)) {
      if (!this.main) {
        return;
      }
      const liveReferer = this.currentLocation.href;
      this.outgoingMainEl = this.outgoingMainEl || this.main.el;
      const stickies = dom_default.findPhxSticky(document) || [];
      const removeEls = dom_default.all(
        this.outgoingMainEl,
        `[${this.binding("remove")}]`
      ).filter((el) => !dom_default.isChildOfAny(el, stickies));
      const newMainEl = dom_default.cloneNode(this.outgoingMainEl, "");
      const oldMainView = this.main;
      oldMainView.showLoader(this.loaderTimeout);
      oldMainView.destroy();
      this.main = this.newRootView(newMainEl, flash, liveReferer);
      this.main.setRedirect(href);
      this.transitionRemoves(removeEls, oldMainView);
      this.main.join((joinCount, onDone) => {
        if (joinCount === 1 && this.commitPendingLink(linkRef)) {
          this.requestDOMUpdate(() => {
            removeEls.forEach((el) => el.remove());
            stickies.forEach((el) => newMainEl.appendChild(el));
            this.outgoingMainEl.replaceWith(newMainEl);
            this.outgoingMainEl = null;
            callback && callback(linkRef);
            onDone();
          });
        }
      });
    }
    /** @internal */
    transitionRemoves(elements, view, callback) {
      const removeAttr = this.binding("remove");
      const silenceEvents = (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
      };
      elements.forEach((el) => {
        for (const event of this.boundEventNames) {
          el.addEventListener(event, silenceEvents, true);
        }
        const e = new CustomEvent("phx:exec", { detail: { sourceElement: el } });
        js_default.exec(e, "remove", el.getAttribute(removeAttr), view, el);
      });
      this.requestDOMUpdate(() => {
        elements.forEach((el) => {
          for (const event of this.boundEventNames) {
            el.removeEventListener(event, silenceEvents, true);
          }
        });
        callback && callback();
      });
    }
    /** @internal */
    isPhxView(el) {
      return el.getAttribute && el.getAttribute(PHX_SESSION) !== null;
    }
    /** @internal */
    newRootView(el, flash, liveReferer) {
      const view = new View(el, this, null, flash, liveReferer);
      this.roots[view.id] = view;
      return view;
    }
    /** @internal */
    owner(childEl, callback) {
      let view;
      const viewEl = dom_default.closestViewEl(childEl);
      if (viewEl) {
        view = dom_default.private(viewEl, "view");
      } else {
        if (!childEl.isConnected) {
          return null;
        }
        view = this.main;
      }
      return view && callback ? callback(view) : view;
    }
    /** @internal */
    withinOwners(childEl, callback) {
      this.owner(childEl, (view) => callback(view, childEl));
    }
    /** @internal */
    getViewByEl(el) {
      const rootId = el.getAttribute(PHX_ROOT_ID);
      return maybe(
        this.getRootById(rootId),
        (root) => root.getDescendentByEl(el)
      );
    }
    /** @internal */
    getRootById(id) {
      return this.roots[id];
    }
    /** @internal */
    destroyAllViews() {
      for (const id in this.roots) {
        this.roots[id].destroy();
        delete this.roots[id];
      }
      this.main = null;
    }
    /** @internal */
    destroyViewByEl(el) {
      const root = this.getRootById(el.getAttribute(PHX_ROOT_ID));
      if (root && root.id === el.id) {
        root.destroy();
        delete this.roots[root.id];
      } else if (root) {
        root.destroyDescendent(el.id);
      }
    }
    /** @internal */
    getActiveElement() {
      return document.activeElement;
    }
    /** @internal */
    dropActiveElement(view) {
      if (this.prevActive && view.ownsElement(this.prevActive)) {
        this.prevActive = null;
      }
    }
    /** @internal */
    restorePreviouslyActiveFocus() {
      if (this.prevActive && this.prevActive !== document.body && this.prevActive instanceof HTMLElement) {
        this.prevActive.focus();
      }
    }
    /** @internal */
    blurActiveElement() {
      this.prevActive = this.getActiveElement();
      if (this.prevActive !== document.body && this.prevActive instanceof HTMLElement) {
        this.prevActive.blur();
      }
    }
    /** @internal */
    bindTopLevelEvents({ dead } = {}) {
      if (this.boundTopLevelEvents) {
        return;
      }
      this.boundTopLevelEvents = true;
      this.serverCloseRef = this.socket.onClose((event) => {
        if (event && event.code === 1e3 && this.main) {
          return this.reloadWithJitter(this.main);
        }
      });
      document.body.addEventListener("click", function() {
      });
      window.addEventListener(
        "pageshow",
        (e) => {
          if (e.persisted) {
            this.getSocket().disconnect();
            this.withPageLoading({ to: window.location.href, kind: "redirect" });
            window.location.reload();
          }
        },
        true
      );
      if (!dead) {
        this.bindNav();
      }
      this.bindClicks();
      if (!dead) {
        this.bindForms();
      }
      this.bind(
        { keyup: "keyup", keydown: "keydown" },
        (e, type, view, targetEl, phxEvent, _phxTarget) => {
          const matchKey = targetEl.getAttribute(this.binding(PHX_KEY));
          const pressedKey = e.key && e.key.toLowerCase();
          if (matchKey && matchKey.toLowerCase() !== pressedKey) {
            return;
          }
          const data = __spreadValues({ key: e.key }, this.eventMeta(type, e, targetEl));
          js_default.exec(e, type, phxEvent, view, targetEl, ["push", { data }]);
        }
      );
      this.bind(
        { blur: "focusout", focus: "focusin" },
        (e, type, view, targetEl, phxEvent, phxTarget) => {
          if (!phxTarget) {
            const data = __spreadValues({}, this.eventMeta(type, e, targetEl));
            js_default.exec(e, type, phxEvent, view, targetEl, ["push", { data }]);
          }
        }
      );
      this.bind(
        { blur: "blur", focus: "focus" },
        (e, type, view, targetEl, phxEvent, phxTarget) => {
          if (phxTarget === "window") {
            const data = this.eventMeta(type, e, targetEl);
            js_default.exec(e, type, phxEvent, view, targetEl, ["push", { data }]);
          }
        }
      );
      this.on("dragover", (e) => e.preventDefault());
      this.on("dragenter", (e) => {
        let target = e.target && dom_default.elementFromTarget(e.target);
        if (!target) {
          return;
        }
        const dropzone = closestPhxBinding(target, this.binding(PHX_DROP_TARGET));
        if (!dropzone || !(dropzone instanceof HTMLElement)) {
          return;
        }
        if (eventContainsFiles(e)) {
          this.js().addClass(dropzone, PHX_DROP_TARGET_ACTIVE_CLASS);
        }
      });
      this.on("dragleave", (e) => {
        let target = e.target && dom_default.elementFromTarget(e.target);
        if (!target) {
          return;
        }
        const dropzone = closestPhxBinding(target, this.binding(PHX_DROP_TARGET));
        if (!dropzone || !(dropzone instanceof HTMLElement)) {
          return;
        }
        const rect = dropzone.getBoundingClientRect();
        if (e.clientX <= rect.left || e.clientX >= rect.right || e.clientY <= rect.top || e.clientY >= rect.bottom) {
          this.js().removeClass(dropzone, PHX_DROP_TARGET_ACTIVE_CLASS);
        }
      });
      this.on("drop", (e) => {
        let target = e.target && dom_default.elementFromTarget(e.target);
        if (!target) {
          return;
        }
        e.preventDefault();
        const dropzone = closestPhxBinding(target, this.binding(PHX_DROP_TARGET));
        if (!dropzone || !(dropzone instanceof HTMLElement)) {
          return;
        }
        this.js().removeClass(dropzone, PHX_DROP_TARGET_ACTIVE_CLASS);
        if (!e.dataTransfer) {
          return;
        }
        const dropTargetId = dropzone.getAttribute(this.binding(PHX_DROP_TARGET));
        const dropTarget = dropTargetId && document.getElementById(dropTargetId);
        const files = Array.from(e.dataTransfer.files || []);
        if (!dropTarget || !(dropTarget instanceof HTMLInputElement) || dropTarget.disabled || files.length === 0 || !(dropTarget.files instanceof FileList)) {
          return;
        }
        LiveUploader.trackFiles(dropTarget, files, e.dataTransfer);
        dropTarget.dispatchEvent(new Event("input", { bubbles: true }));
      });
      this.on(PHX_TRACK_UPLOADS, (e) => {
        const uploadTarget = e.target && dom_default.elementFromTarget(e.target);
        if (!dom_default.isUploadInput(uploadTarget)) {
          return;
        }
        const files = Array.from(e.detail.files || []).filter(
          (f) => f instanceof File || f instanceof Blob
        );
        LiveUploader.trackFiles(uploadTarget, files);
        uploadTarget.dispatchEvent(new Event("input", { bubbles: true }));
      });
    }
    /** @internal */
    eventMeta(eventName, e, targetEl) {
      const callback = this.metadataCallbacks[eventName];
      return callback ? callback(e, targetEl) : {};
    }
    /** @internal */
    setPendingLink(href) {
      this.linkRef++;
      this.pendingLink = href;
      this.resetReloadStatus();
      return this.linkRef;
    }
    /**
     * @internal
     * anytime we are navigating or connecting, drop reload cookie in case
     * we issue the cookie but the next request was interrupted and the server never dropped it
     */
    resetReloadStatus() {
      browser_default.deleteCookie(PHX_RELOAD_STATUS);
    }
    /** @internal */
    commitPendingLink(linkRef) {
      if (this.linkRef !== linkRef) {
        return false;
      }
      if (this.pendingLink !== null) {
        this.href = this.pendingLink;
        this.pendingLink = null;
      }
      return true;
    }
    /** @internal */
    getHref() {
      return this.href;
    }
    /** @internal */
    hasPendingLink() {
      return !!this.pendingLink;
    }
    /** @internal */
    bind(events, callback) {
      for (const event in events) {
        const browserEventName = events[event];
        this.on(browserEventName, (e) => {
          const binding = this.binding(event);
          const windowBinding = this.binding(`window-${event}`);
          const targetPhxEvent = e.target instanceof Element && e.target.getAttribute(binding);
          if (!(e.target instanceof Element)) {
            return;
          }
          if (targetPhxEvent) {
            this.debounce(e.target, e, browserEventName, () => {
              this.withinOwners(e.target, (view) => {
                callback(
                  e,
                  event,
                  view,
                  e.target,
                  targetPhxEvent,
                  null
                );
              });
            });
          } else {
            dom_default.all(document, `[${windowBinding}]`, (el) => {
              const phxEvent = el.getAttribute(windowBinding);
              this.debounce(el, e, browserEventName, () => {
                this.withinOwners(el, (view) => {
                  callback(
                    e,
                    event,
                    view,
                    el,
                    phxEvent,
                    "window"
                  );
                });
              });
            });
          }
        });
      }
    }
    /** @internal */
    bindClicks() {
      this.on("mousedown", (e) => this.clickStartedAtTarget = e.target);
      this.bindClick();
    }
    /** @internal */
    bindClick() {
      const click = this.binding("click");
      window.addEventListener(
        "click",
        (e) => {
          let target = e.target && dom_default.elementFromTarget(e.target);
          if (!target) {
            return;
          }
          if (e.detail === 0)
            this.clickStartedAtTarget = target;
          const clickStartedAtTarget = this.clickStartedAtTarget || target;
          target = closestPhxBinding(target, click);
          this.dispatchClickAway(e, clickStartedAtTarget);
          this.clickStartedAtTarget = null;
          if (!target) {
            return;
          }
          const phxEvent = target.getAttribute(click);
          if (!phxEvent) {
            if (dom_default.isNewPageClick(e, window.location)) {
              this.unload();
            }
            return;
          }
          if (target.getAttribute("href") === "#") {
            e.preventDefault();
          }
          if (target.hasAttribute(PHX_REF_SRC)) {
            return;
          }
          this.debounce(target, e, "click", () => {
            this.withinOwners(target, (view) => {
              js_default.exec(e, "click", phxEvent, view, target, [
                "push",
                { data: this.eventMeta("click", e, target) }
              ]);
            });
          });
        },
        false
      );
    }
    /** @internal */
    dispatchClickAway(e, clickStartedAt) {
      const phxClickAway = this.binding("click-away");
      const portal = clickStartedAt.closest(`[${PHX_TELEPORTED_SRC}]`);
      const portalStartedAt = portal && dom_default.byId(portal.getAttribute(PHX_TELEPORTED_SRC));
      dom_default.all(document, `[${phxClickAway}]`, (el) => {
        let startedAt = clickStartedAt;
        if (portal && !portal.contains(el)) {
          startedAt = portalStartedAt;
        }
        if (!(el.isSameNode(startedAt) || el.contains(startedAt) || // When clicking a link with custom method,
        // phoenix_html triggers a click on a submit button
        // of a hidden form appended to the body. For such cases
        // where the clicked target is hidden, we skip click-away.
        //
        // Also, when we have a portal, we don't want to check the visibility
        // of the portal source, as it's a <template> that is always not visible.
        // Instead, check the visibility of the original click target.
        !js_default.isVisible(clickStartedAt))) {
          this.withinOwners(el, (view) => {
            const phxEvent = el.getAttribute(phxClickAway);
            if (js_default.isVisible(el) && js_default.isInViewport(el)) {
              js_default.exec(e, "click", phxEvent, view, el, [
                "push",
                { data: this.eventMeta("click", e, e.target) }
              ]);
            }
          });
        }
      });
    }
    /** @internal */
    bindNav() {
      if (!browser_default.canPushState()) {
        return;
      }
      if (history.scrollRestoration) {
        history.scrollRestoration = "manual";
      }
      let scrollTimer = null;
      window.addEventListener("scroll", (_e) => {
        scrollTimer != null && clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          browser_default.updateCurrentState(
            (state) => Object.assign(state, { scroll: window.scrollY })
          );
        }, 100);
      });
      window.addEventListener(
        "popstate",
        (event) => {
          if (!this.registerNewLocation(window.location)) {
            return;
          }
          const { type, backType, id, scroll, position } = event.state || {};
          const href = window.location.href;
          const isForward = position > this.currentHistoryPosition;
          const navType = isForward ? type : backType || type;
          this.currentHistoryPosition = position || 0;
          this.sessionStorage.setItem(
            PHX_LV_HISTORY_POSITION,
            this.currentHistoryPosition.toString()
          );
          dom_default.dispatchEvent(window, "phx:navigate", {
            detail: {
              href,
              patch: navType === "patch",
              pop: true,
              direction: isForward ? "forward" : "backward"
            }
          });
          this.requestDOMUpdate(() => {
            const callback = () => {
              this.maybeScroll(scroll);
            };
            if (this.main && this.main.isConnected() && navType === "patch" && id === this.main.id) {
              this.main.pushLinkPatch(event, href, null, callback);
            } else {
              this.replaceMain(href, null, callback);
            }
          });
        },
        false
      );
      window.addEventListener(
        "click",
        (e) => {
          let el = e.target && dom_default.elementFromTarget(e.target);
          if (!el) {
            return;
          }
          const target = closestPhxBinding(
            el,
            PHX_LIVE_LINK
          );
          const type = target && target.getAttribute(PHX_LIVE_LINK);
          if (!type || !this.isConnected() || !this.main || dom_default.wantsNewTab(e)) {
            return;
          }
          const href = target.href instanceof SVGAnimatedString ? target.href.baseVal : target.href;
          const linkState = target.getAttribute(PHX_LINK_STATE);
          if (linkState !== "replace" && linkState !== "push") {
            throw new Error(
              `expected ${PHX_LINK_STATE} to be "replace" or "push", got: ${linkState}`
            );
          }
          e.preventDefault();
          e.stopImmediatePropagation();
          if (this.pendingLink === href) {
            return;
          }
          this.requestDOMUpdate(() => {
            if (type === "patch") {
              this.pushHistoryPatch(e, href, linkState, target);
            } else if (type === "redirect") {
              this.historyRedirect(e, href, linkState, null, target);
            } else {
              throw new Error(
                `expected ${PHX_LIVE_LINK} to be "patch" or "redirect", got: ${type}`
              );
            }
            const phxClick = target.getAttribute(this.binding("click"));
            if (phxClick) {
              this.requestDOMUpdate(() => this.execJS(target, phxClick, "click"));
            }
          });
        },
        false
      );
    }
    /** @internal */
    maybeScroll(scroll) {
      if (typeof scroll === "number") {
        requestAnimationFrame(() => {
          window.scrollTo(0, scroll);
        });
      }
    }
    /** @internal */
    dispatchEvent(event, payload = {}) {
      dom_default.dispatchEvent(window, `phx:${event}`, { detail: payload });
    }
    /** @internal */
    dispatchEvents(events) {
      events.forEach(([event, payload]) => this.dispatchEvent(event, payload));
    }
    /** @internal */
    withPageLoading(info, callback) {
      dom_default.dispatchEvent(window, "phx:page-loading-start", { detail: info });
      const done = () => dom_default.dispatchEvent(window, "phx:page-loading-stop", { detail: info });
      return callback ? callback(done) : done;
    }
    /** @internal */
    pushHistoryPatch(e, href, linkState, targetEl) {
      if (!this.isConnected() || !(this.main && this.main.isMain())) {
        return browser_default.redirect(href);
      }
      this.withPageLoading({ to: href, kind: "patch" }, (done) => {
        this.main.pushLinkPatch(e, href, targetEl, (linkRef) => {
          this.historyPatch(href, linkState, linkRef);
          done();
        });
      });
    }
    /** @internal */
    historyPatch(href, linkState, linkRef = this.setPendingLink(href)) {
      if (!this.commitPendingLink(linkRef)) {
        return;
      }
      this.currentHistoryPosition++;
      this.sessionStorage.setItem(
        PHX_LV_HISTORY_POSITION,
        this.currentHistoryPosition.toString()
      );
      browser_default.updateCurrentState((state) => __spreadProps(__spreadValues({}, state), { backType: "patch" }));
      browser_default.pushState(
        linkState,
        {
          type: "patch",
          id: this.main.id,
          position: this.currentHistoryPosition
        },
        href
      );
      dom_default.dispatchEvent(window, "phx:navigate", {
        detail: { patch: true, href, pop: false, direction: "forward" }
      });
      this.registerNewLocation(window.location);
    }
    /** @internal */
    historyRedirect(e, href, linkState, flash, targetEl) {
      const clickLoading = targetEl && e.isTrusted && e.type !== "popstate";
      if (clickLoading) {
        targetEl.classList.add("phx-click-loading");
      }
      if (!this.isConnected() || !(this.main && this.main.isMain())) {
        return browser_default.redirect(href, flash);
      }
      if (/^\/$|^\/[^\/]+.*$/.test(href)) {
        const { protocol, host } = window.location;
        href = `${protocol}//${host}${href}`;
      }
      const scroll = window.scrollY;
      this.withPageLoading({ to: href, kind: "redirect" }, (done) => {
        this.replaceMain(href, flash, (linkRef) => {
          if (linkRef === this.linkRef) {
            this.currentHistoryPosition++;
            this.sessionStorage.setItem(
              PHX_LV_HISTORY_POSITION,
              this.currentHistoryPosition.toString()
            );
            browser_default.updateCurrentState((state) => __spreadProps(__spreadValues({}, state), {
              backType: "redirect"
            }));
            browser_default.pushState(
              linkState,
              {
                type: "redirect",
                id: this.main.id,
                scroll,
                position: this.currentHistoryPosition
              },
              href
            );
            dom_default.dispatchEvent(window, "phx:navigate", {
              detail: { href, patch: false, pop: false, direction: "forward" }
            });
            this.registerNewLocation(window.location);
          }
          if (clickLoading) {
            targetEl.classList.remove("phx-click-loading");
          }
          done();
        });
      });
    }
    /** @internal */
    registerNewLocation(newLocation) {
      const { pathname, search } = this.currentLocation;
      if (pathname + search === newLocation.pathname + newLocation.search) {
        return false;
      } else {
        this.currentLocation = clone(newLocation);
        return true;
      }
    }
    /** @internal */
    bindForms() {
      let iterations = 0;
      let externalFormSubmitted = false;
      this.on("submit", (e) => {
        if (!(e.target instanceof HTMLFormElement))
          return;
        const phxSubmit = e.target.getAttribute(this.binding("submit"));
        const phxChange = e.target.getAttribute(this.binding("change"));
        if (!externalFormSubmitted && phxChange && !phxSubmit) {
          externalFormSubmitted = true;
          e.preventDefault();
          this.withinOwners(e.target, (view) => {
            view.disableForm(e.target);
            window.requestAnimationFrame(() => {
              if (dom_default.isUnloadableFormSubmit(e)) {
                this.unload();
              }
              e.target.submit();
            });
          });
        }
      });
      this.on("submit", (e) => {
        if (!(e.target instanceof HTMLFormElement))
          return;
        const phxEvent = e.target.getAttribute(this.binding("submit"));
        if (!phxEvent) {
          if (dom_default.isUnloadableFormSubmit(e)) {
            this.unload();
          }
          return;
        }
        e.preventDefault();
        e.target.disabled = true;
        this.withinOwners(e.target, (view) => {
          js_default.exec(e, "submit", phxEvent, view, e.target, [
            "push",
            { submitter: e.submitter }
          ]);
        });
      });
      for (const type of ["change", "input"]) {
        this.on(type, (e) => {
          if (!dom_default.isFormAssociated(e.target)) {
            return;
          }
          if (e instanceof CustomEvent && e.target.form === void 0) {
            if (e.detail && e.detail.dispatcher) {
              throw new Error(
                `dispatching a custom ${type} event is only supported on input elements inside a form`
              );
            }
            return;
          }
          const input = e.target;
          const phxChange = this.binding("change");
          if (this.blockPhxChangeWhileComposing && e instanceof InputEvent && e.isComposing) {
            const key = `composition-listener-${type}`;
            if (!dom_default.private(input, key)) {
              dom_default.putPrivate(input, key, true);
              input.addEventListener(
                "compositionend",
                () => {
                  input.dispatchEvent(new Event(type, { bubbles: true }));
                  dom_default.deletePrivate(input, key);
                },
                { once: true }
              );
            }
            return;
          }
          const inputEvent = input.getAttribute(phxChange);
          const formEvent = input.form && input.form.getAttribute(phxChange);
          const phxEvent = inputEvent || formEvent;
          if (!phxEvent) {
            return;
          }
          if (input.type === "number" && input.validity && input.validity.badInput) {
            return;
          }
          const dispatcher = inputEvent ? input : input.form;
          const currentIterations = iterations;
          iterations++;
          const { at, type: lastType } = dom_default.private(input, "prev-iteration") || {};
          if (at === currentIterations - 1 && type === "change" && lastType === "input") {
            return;
          }
          dom_default.putPrivate(input, "prev-iteration", {
            at: currentIterations,
            type
          });
          this.debounce(input, e, type, () => {
            this.withinOwners(dispatcher, (view) => {
              dom_default.putPrivate(input, PHX_HAS_FOCUSED, true);
              js_default.exec(e, "change", phxEvent, view, input, [
                "push",
                { _target: input.name, dispatcher }
              ]);
            });
          });
        });
      }
      this.on("reset", (e) => {
        const form = e.target;
        dom_default.resetForm(form);
        const input = Array.from(form.elements).find(
          (el) => "type" in el && el.type === "reset"
        );
        if (input) {
          window.requestAnimationFrame(() => {
            input.dispatchEvent(
              new Event("input", { bubbles: true, cancelable: false })
            );
          });
        }
      });
    }
    /** @internal */
    debounce(el, event, eventType, callback) {
      if (eventType === "blur" || eventType === "focusout") {
        return callback();
      }
      const phxDebounce = this.binding(PHX_DEBOUNCE);
      const phxThrottle = this.binding(PHX_THROTTLE);
      const defaultDebounce = this.defaults.debounce.toString();
      const defaultThrottle = this.defaults.throttle.toString();
      this.withinOwners(el, (view) => {
        const asyncFilter = () => !view.isDestroyed() && document.body.contains(el);
        dom_default.debounce(
          el,
          event,
          phxDebounce,
          defaultDebounce,
          phxThrottle,
          defaultThrottle,
          asyncFilter,
          () => {
            callback();
          }
        );
      });
    }
    /** @internal */
    silenceEvents(callback) {
      this.silenced = true;
      callback();
      this.silenced = false;
    }
    /** @internal */
    on(event, callback) {
      this.boundEventNames.add(event);
      window.addEventListener(event, (e) => {
        if (!this.silenced) {
          callback(e);
        }
      });
    }
    /** @internal */
    jsQuerySelectorAll(sourceEl, query, defaultQuery) {
      const all = this.domCallbacks.jsQuerySelectorAll;
      return all ? all(sourceEl, query, defaultQuery) : defaultQuery();
    }
  };
  var TransitionSet = class {
    constructor() {
      this.transitions = /* @__PURE__ */ new Set();
      this.promises = /* @__PURE__ */ new Set();
      this.pendingOps = [];
    }
    reset() {
      this.transitions.forEach((timer) => {
        clearTimeout(timer);
        this.transitions.delete(timer);
      });
      this.promises.clear();
      this.flushPendingOps();
    }
    after(callback) {
      if (this.size() === 0) {
        callback();
      } else {
        this.pushPendingOp(callback);
      }
    }
    addTransition(time, onStart, onDone) {
      onStart();
      const timer = setTimeout(() => {
        this.transitions.delete(timer);
        onDone();
        this.flushPendingOps();
      }, time);
      this.transitions.add(timer);
    }
    addAsyncTransition(promise) {
      this.promises.add(promise);
      promise.then(() => {
        this.promises.delete(promise);
        this.flushPendingOps();
      });
    }
    pushPendingOp(op) {
      this.pendingOps.push(op);
    }
    size() {
      return this.transitions.size + this.promises.size;
    }
    flushPendingOps() {
      if (this.size() > 0) {
        return;
      }
      const op = this.pendingOps.shift();
      if (op) {
        op();
        this.flushPendingOps();
      }
    }
  };

  // js/app.js
  var import_topbar = __toESM(require_topbar());

  // ../deps/leaf/priv/static/assets/leaf.js
  (function() {
    "use strict";
    if (window.LeafEditorLoaded)
      return;
    window.LeafEditorLoaded = true;
    window.LeafHooks = window.LeafHooks || {};
    document.addEventListener("click", function(e) {
      var node = e.target;
      while (node && node !== document.body) {
        if (node.nodeType === 1 && node.classList && node.classList.contains("leaf-spoiler") && !node.classList.contains("leaf-spoiler-revealed")) {
          if (node.closest && node.closest("[data-editor-visual]"))
            return;
          e.preventDefault();
          node.classList.add("leaf-spoiler-revealed");
          return;
        }
        node = node.parentNode;
      }
    });
    var EDITOR_CSS = [
      // Placeholder
      ".content-editor-visual:empty::before {",
      "  content: attr(data-placeholder);",
      "  color: color-mix(in oklab, var(--color-base-content, #1f2937) 35%, transparent);",
      "  pointer-events: none;",
      "  position: absolute;",
      "}",
      ".content-editor-visual { position: relative; -webkit-user-select: text; user-select: text; }",
      // Typography
      ".content-editor-visual h1 { font-size: 2em; font-weight: 700; margin: 0.67em 0; line-height: 1.2; }",
      ".content-editor-visual h2 { font-size: 1.5em; font-weight: 600; margin: 0.6em 0; line-height: 1.3; }",
      ".content-editor-visual h3 { font-size: 1.25em; font-weight: 600; margin: 0.5em 0; line-height: 1.4; }",
      ".content-editor-visual h4 { font-size: 1.1em; font-weight: 600; margin: 0.4em 0; line-height: 1.4; }",
      ".content-editor-visual p { margin: 0.5em 0; }",
      ".content-editor-visual p:first-child, .content-editor-visual h1:first-child,",
      "  .content-editor-visual h2:first-child, .content-editor-visual h3:first-child { margin-top: 0; }",
      // Inline
      ".content-editor-visual strong, .content-editor-visual b { font-weight: 700; }",
      ".content-editor-visual em, .content-editor-visual i { font-style: italic; }",
      ".content-editor-visual s, .content-editor-visual del, .content-editor-visual strike { text-decoration: line-through; }",
      ".content-editor-visual u { text-decoration: underline; }",
      ".content-editor-visual code {",
      "  background: var(--color-base-200, #e5e7eb); border-radius: 0.25rem;",
      "  padding: 0.1em 0.35em; font-family: monospace; font-size: 0.9em;",
      "}",
      // Code blocks
      ".content-editor-visual pre {",
      "  background: var(--color-base-200, #e5e7eb); border-radius: 0.5rem;",
      "  padding: 0.75rem 1rem; margin: 0.75em 0; overflow-x: auto;",
      "  font-family: monospace; font-size: 0.875rem; line-height: 1.6;",
      "}",
      ".content-editor-visual pre code { background: none; padding: 0; border-radius: 0; font-size: inherit; }",
      // Blockquote
      ".content-editor-visual blockquote {",
      "  border-left: 3px solid color-mix(in oklab, var(--color-base-content, #1f2937) 25%, transparent);",
      "  padding-left: 1rem; margin: 0.75em 0;",
      "  color: color-mix(in oklab, var(--color-base-content, #1f2937) 70%, transparent);",
      "}",
      // Lists
      ".content-editor-visual ul { list-style-type: disc; padding-left: 1.5rem; margin: 0.5em 0; }",
      ".content-editor-visual ol { list-style-type: decimal; padding-left: 1.5rem; margin: 0.5em 0; }",
      ".content-editor-visual li { margin: 0.2em 0; }",
      ".content-editor-visual li > p { margin: 0; }",
      // Tables
      ".content-editor-visual table { border-collapse: collapse; table-layout: fixed; width: 100%; margin: 0.75em 0; }",
      ".content-editor-visual th, .content-editor-visual td {",
      "  border: 1px solid color-mix(in oklab, var(--color-base-content, #1f2937) 20%, transparent);",
      "  padding: 0.4rem 0.75rem; text-align: left;",
      "  overflow-wrap: anywhere;",
      "}",
      ".content-editor-visual th {",
      "  font-weight: 600;",
      "  background: color-mix(in oklab, var(--color-base-content, #1f2937) 5%, transparent);",
      "}",
      // Links
      ".content-editor-visual a { color: var(--color-primary, #3b82f6); text-decoration: underline; cursor: text; }",
      ".content-editor-visual a:hover { opacity: 0.8; }",
      // Images
      ".content-editor-visual img {",
      "  max-width: 100%; height: auto; border-radius: 0.5rem; margin: 0.75em 0;",
      "  cursor: pointer;",
      "}",
      ".content-editor-visual img.leaf-img-selected {",
      "  outline: 2px solid var(--color-primary, #3b82f6);",
      "  outline-offset: 2px;",
      "}",
      // Atomic preserved blocks (custom/unknown tags) — rendered as a
      // non-editable chip so the underlying XML can't be corrupted in place.
      ".content-editor-visual .leaf-atomic {",
      "  display: inline-block; vertical-align: middle; user-select: all;",
      "  padding: 0.15em 0.55em; margin: 0.1em 0; border-radius: 0.375rem;",
      "  border: 1px dashed var(--color-base-300, #d1d5db);",
      "  background: color-mix(in oklab, var(--color-base-content, #1f2937) 6%, transparent);",
      "  font: 600 0.8em ui-monospace, monospace; cursor: default;",
      "}",
      ".content-editor-visual .leaf-atomic-label::before { content: '\u29C9 '; opacity: 0.6; }",
      // GFM callouts / admonitions
      ".content-editor-visual blockquote.leaf-callout {",
      "  border-left: 4px solid var(--cl, #3b82f6); border-radius: 0.375rem;",
      "  background: color-mix(in oklab, var(--cl, #3b82f6) 8%, transparent);",
      "  padding: 0.5rem 0.85rem; margin: 0.75em 0;",
      "}",
      ".content-editor-visual blockquote.leaf-callout .leaf-callout-title {",
      "  font-weight: 700; font-size: 0.85em; text-transform: uppercase;",
      "  letter-spacing: 0.03em; color: var(--cl, #3b82f6); margin: 0 0 0.25em;",
      "  user-select: none;",
      "}",
      ".content-editor-visual blockquote.leaf-callout-note { --cl: #3b82f6; }",
      ".content-editor-visual blockquote.leaf-callout-tip { --cl: #22c55e; }",
      ".content-editor-visual blockquote.leaf-callout-important { --cl: #a855f7; }",
      ".content-editor-visual blockquote.leaf-callout-warning { --cl: #f59e0b; }",
      ".content-editor-visual blockquote.leaf-callout-caution { --cl: #ef4444; }",
      // GFM task lists
      ".content-editor-visual li.leaf-task { list-style: none; margin-left: -1.25em; }",
      ".content-editor-visual .leaf-task-box {",
      "  display: inline-block; width: 1em; height: 1em; vertical-align: -0.15em;",
      "  margin-right: 0.45em; border: 1.5px solid currentColor; border-radius: 0.25em;",
      "  position: relative; cursor: pointer; opacity: 0.65; box-sizing: border-box;",
      "}",
      ".content-editor-visual li.leaf-task[data-checked='true'] .leaf-task-box {",
      "  background: currentColor; opacity: 0.85;",
      "}",
      ".content-editor-visual li.leaf-task[data-checked='true'] .leaf-task-box::after {",
      "  content: ''; position: absolute; left: 0.28em; top: 0.08em;",
      "  width: 0.28em; height: 0.55em; border: solid var(--color-base-100, #fff);",
      "  border-width: 0 2px 2px 0; transform: rotate(45deg);",
      "}",
      ".content-editor-visual li.leaf-task[data-checked='true'] { opacity: 0.65; }",
      // Collapsible details / accordion blocks
      ".content-editor-visual details {",
      "  border: 1px solid var(--color-base-300, #d1d5db); border-radius: 0.5rem;",
      "  padding: 0.5rem 0.75rem; margin: 0.75em 0;",
      "}",
      ".content-editor-visual summary {",
      "  cursor: pointer; font-weight: 600; outline: none;",
      "}",
      // Image / figure alignment + captions
      ".content-editor-visual figure { margin: 0.75em 0; }",
      ".content-editor-visual figure img { margin: 0; }",
      ".content-editor-visual figcaption {",
      "  font-size: 0.85em; opacity: 0.7; text-align: center; margin-top: 0.3em;",
      "}",
      ".content-editor-visual img[data-align='center'],",
      ".content-editor-visual figure[data-align='center'] {",
      "  display: block; margin-left: auto; margin-right: auto;",
      "}",
      ".content-editor-visual img[data-align='left'],",
      ".content-editor-visual figure[data-align='left'] {",
      "  float: left; margin-right: 1rem; max-width: 50%;",
      "}",
      ".content-editor-visual img[data-align='right'],",
      ".content-editor-visual figure[data-align='right'] {",
      "  float: right; margin-left: 1rem; max-width: 50%;",
      "}",
      // Image resize handles
      ".leaf-resize-handle {",
      "  position: absolute; width: 10px; height: 10px;",
      "  background: var(--color-base-100, #fff);",
      "  border: 2px solid var(--color-primary, #3b82f6);",
      "  border-radius: 2px; z-index: 51;",
      "}",
      ".leaf-resize-handle--nw { cursor: nw-resize; }",
      ".leaf-resize-handle--ne { cursor: ne-resize; }",
      ".leaf-resize-handle--sw { cursor: sw-resize; }",
      ".leaf-resize-handle--se { cursor: se-resize; }",
      // Drag-and-drop indicator
      ".leaf-drop-indicator {",
      "  position: absolute; left: 0; right: 0; height: 3px;",
      "  background: var(--color-primary, #3b82f6);",
      "  border-radius: 2px; pointer-events: none; z-index: 50;",
      "  transition: top 0.05s ease-out;",
      "}",
      ".leaf-dragging {",
      "  opacity: 0.35 !important;",
      "  outline: 2px dashed var(--color-primary, #3b82f6) !important;",
      "  outline-offset: 2px;",
      "}",
      // Block drag handle
      ".leaf-drag-handle {",
      "  position: absolute; z-index: 52;",
      "  display: flex; align-items: center; justify-content: center;",
      "  width: 28px; height: 28px;",
      "  cursor: grab; border-radius: 6px;",
      "  color: color-mix(in oklab, var(--color-base-content, #1f2937) 30%, transparent);",
      "  background: transparent;",
      "  transition: color 0.1s, background 0.1s;",
      "  user-select: none; -webkit-user-select: none;",
      "}",
      ".leaf-drag-handle:hover {",
      "  color: color-mix(in oklab, var(--color-base-content, #1f2937) 60%, transparent);",
      "  background: color-mix(in oklab, var(--color-base-content, #1f2937) 8%, transparent);",
      "}",
      ".leaf-drag-handle:active { cursor: grabbing; }",
      ".leaf-drag-handle svg { width: 18px; height: 18px; pointer-events: none; }",
      // Selection
      ".content-editor-visual ::selection { background-color: Highlight !important; color: HighlightText !important; }",
      ".content-editor-visual *::selection { background-color: Highlight !important; color: HighlightText !important; }",
      // Link popover — floating island
      ".leaf-link-popover {",
      "  position: absolute; z-index: 50;",
      "  display: flex; align-items: center; gap: 0.5rem;",
      "  background: var(--color-base-200, #e5e7eb); color: var(--color-base-content, #1f2937);",
      "  border: 1px solid var(--color-base-300, #d1d5db);",
      "  border-radius: 9999px; padding: 0.4rem 0.5rem 0.4rem 0.75rem;",
      "  box-shadow: 0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08);",
      "  font-size: 0.8125rem; line-height: 1;",
      "  animation: leaf-popover-in 0.15s ease-out;",
      "  white-space: nowrap;",
      "}",
      "@keyframes leaf-popover-in { from { opacity: 0; transform: translateY(6px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }",
      ".leaf-link-popover a {",
      "  color: var(--color-primary, #3b82f6); text-decoration: none; max-width: 220px;",
      "  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; cursor: pointer;",
      "}",
      ".leaf-link-popover a:hover { text-decoration: underline; }",
      ".leaf-link-popover .leaf-popover-actions {",
      "  display: flex; align-items: center; gap: 0.125rem;",
      "  background: color-mix(in oklab, var(--color-base-content, #1f2937) 8%, transparent);",
      "  border-radius: 9999px; padding: 0.125rem;",
      "}",
      ".leaf-link-popover button {",
      "  background: none; border: none; cursor: pointer; padding: 0.3rem;",
      "  border-radius: 9999px; color: color-mix(in oklab, var(--color-base-content, #1f2937) 50%, transparent);",
      "  display: flex; align-items: center;",
      "  transition: background 0.1s, color 0.1s;",
      "}",
      ".leaf-link-popover button:hover {",
      "  background: color-mix(in oklab, var(--color-base-content, #1f2937) 12%, transparent);",
      "  color: var(--color-base-content, #1f2937);",
      "}",
      ".leaf-link-popover .leaf-popover-divider {",
      "  width: 1px; height: 0.875rem;",
      "  background: color-mix(in oklab, var(--color-base-content, #1f2937) 15%, transparent);",
      "}",
      // Selection toolbar — floating bubble that appears above a non-
      // collapsed selection on touch devices. Bold / italic / code /
      // link, the four most common inline formats. Hidden by default;
      // positioned via JS, animated on entry.
      "[data-toolbar-layout='floating'] [data-visual-toolbar-buttons] { display: none !important; }",
      ".leaf-selection-toolbar {",
      "  position: absolute; z-index: 60;",
      "  display: flex; align-items: center; gap: 0.125rem;",
      "  background: var(--color-base-content, #1f2937); color: var(--color-base-100, #fff);",
      "  border-radius: 9999px; padding: 0.25rem;",
      "  box-shadow: 0 6px 20px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.10);",
      "  animation: leaf-popover-in 0.12s ease-out;",
      "  user-select: none; -webkit-user-select: none;",
      "}",
      ".leaf-selection-toolbar button {",
      "  background: none; border: none; cursor: pointer;",
      "  min-width: 36px; min-height: 36px; padding: 0.4rem 0.6rem;",
      "  border-radius: 9999px; color: inherit;",
      "  display: flex; align-items: center; justify-content: center;",
      "  font-size: 0.875rem; font-weight: 600; line-height: 1;",
      "  transition: background 0.1s;",
      "}",
      ".leaf-selection-toolbar button:hover,",
      ".leaf-selection-toolbar button:active {",
      "  background: rgba(255,255,255,0.15);",
      "}",
      ".leaf-selection-toolbar button.is-active {",
      "  background: rgba(255,255,255,0.22);",
      "}",
      ".leaf-selection-toolbar svg {",
      "  width: 1.05rem; height: 1.05rem;",
      "}",
      // Image URL dialog
      ".leaf-image-url-backdrop {",
      "  position: fixed; inset: 0; z-index: 99999;",
      "  background: rgba(0,0,0,0.15);",
      "}",
      ".leaf-image-url-dialog {",
      "  position: fixed; z-index: 100000;",
      "  background: var(--color-base-200, #e5e7eb); color: var(--color-base-content, #1f2937);",
      "  border: 1px solid var(--color-base-300, #d1d5db);",
      "  border-radius: 0.5rem; padding: 0.75rem;",
      "  box-shadow: 0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08);",
      "  font-size: 0.8125rem; line-height: 1;",
      "  animation: leaf-popover-in 0.15s ease-out;",
      "  display: flex; flex-direction: column; gap: 0.5rem;",
      "  width: 300px;",
      "}",
      ".leaf-image-url-dialog input {",
      "  width: 100%; padding: 0.375rem 0.5rem; font-size: 0.8125rem;",
      "  border: 1px solid var(--color-base-300, #d1d5db); border-radius: 0.375rem;",
      "  background: var(--color-base-100, #fff); color: var(--color-base-content, #1f2937);",
      "  outline: none;",
      "}",
      ".leaf-image-url-dialog input:focus {",
      "  border-color: var(--color-primary, #3b82f6);",
      "  box-shadow: 0 0 0 1px var(--color-primary, #3b82f6);",
      "}",
      ".leaf-image-url-dialog label {",
      "  font-size: 0.75rem; font-weight: 500;",
      "  color: color-mix(in oklab, var(--color-base-content, #1f2937) 70%, transparent);",
      "}",
      ".leaf-image-url-dialog .leaf-image-url-actions {",
      "  display: flex; justify-content: flex-end; gap: 0.375rem; margin-top: 0.25rem;",
      "}",
      ".leaf-image-url-dialog .leaf-image-url-actions button {",
      "  padding: 0.375rem 0.75rem; font-size: 0.75rem; font-weight: 500;",
      "  border-radius: 0.375rem; border: none; cursor: pointer;",
      "  transition: background 0.1s, color 0.1s;",
      "}",
      ".leaf-image-url-dialog .leaf-image-url-cancel {",
      "  background: color-mix(in oklab, var(--color-base-content, #1f2937) 10%, transparent);",
      "  color: var(--color-base-content, #1f2937);",
      "}",
      ".leaf-image-url-dialog .leaf-image-url-cancel:hover {",
      "  background: color-mix(in oklab, var(--color-base-content, #1f2937) 18%, transparent);",
      "}",
      ".leaf-image-url-dialog .leaf-image-url-insert {",
      "  background: var(--color-primary, #3b82f6); color: #fff;",
      "}",
      ".leaf-image-url-dialog .leaf-image-url-insert:hover { opacity: 0.9; }",
      // Spoiler (||text||) — censored block; click to reveal. Hidden by default
      // wherever it's rendered (consumer output, preview panes, etc.).
      ".leaf-spoiler {",
      "  background: var(--color-base-content, #1f2937);",
      "  color: transparent;",
      "  border-radius: 3px;",
      "  padding: 0 2px;",
      "  cursor: pointer;",
      "  user-select: none;",
      "  transition: color 0.15s ease, background 0.15s ease;",
      "}",
      ".leaf-spoiler.leaf-spoiler-revealed {",
      "  color: inherit;",
      "  background: color-mix(in oklab, var(--color-base-content, #1f2937) 12%, transparent);",
      "  user-select: text;",
      "}",
      // Inside the editor, spoilers are always shown so the writer can see and
      // edit what they typed. A subtle background hint keeps the spoiler-ness
      // visible at a glance.
      "[data-editor-visual] .leaf-spoiler {",
      "  background: color-mix(in oklab, var(--color-base-content, #1f2937) 12%, transparent);",
      "  color: inherit;",
      "  user-select: text;",
      "  cursor: text;",
      "}",
      // (Toolbar alignment rules live in the server-side inline <style>
      // block — see loading_state_css/1 in lib/leaf.ex — so they apply on
      // first paint, before this CSS is injected by mounted().)
      // Sticky toolbar
      "[data-visual-toolbar].leaf-toolbar-sticky {",
      "  position: fixed;",
      "  z-index: 10000;",
      "  box-sizing: border-box;",
      "}",
      ".leaf-toolbar-placeholder { visibility: hidden; }",
      // Fullscreen mode — triggered via the browser Fullscreen API (see
      // `_toggleFullscreen` in the hook). The host element fills the screen
      // at OS level; these CSS rules then flex the inner layout (toolbar +
      // body + footer) so the editor body absorbs the new height instead of
      // staying at its configured `:height`. The `data-leaf-fullscreen='true'`
      // attribute is reflected from `fullscreenchange`, so F11/Escape/API
      // exit all keep the inner layout in sync.
      "[data-leaf-fullscreen='true'] {",
      "  position: fixed !important; inset: 0 !important;",
      "  width: 100vw !important; height: 100vh !important;",
      "  z-index: 9999;",
      "  background: var(--color-base-100, #ffffff);",
      "  padding: 0.75rem 1rem;",
      "  display: flex !important; flex-direction: column !important;",
      "  align-items: stretch !important;",
      "  overflow: hidden;",
      "  box-sizing: border-box;",
      "}",
      // Force every direct child to take the full row regardless of any
      // ancestor / Tailwind constraints (`min-w-0`, parent transforms, etc.)
      // that might have collapsed them to min-content width.
      "[data-leaf-fullscreen='true'] > * {",
      "  width: 100% !important;",
      "  max-width: 100% !important;",
      "  box-sizing: border-box;",
      "}",
      // Editor body: ignore the configured `:height` inline style and grow
      // to fill whatever the parent flex column hands it. `flex-basis: 0`
      // (instead of `auto`) starts the item at zero so subsequent
      // `flex-grow: 1` decides its size from the remaining space alone —
      // `auto` basis would re-introduce the inline `height: 480px` and
      // collapse the editor back to its baseline.
      "[data-leaf-fullscreen='true'] [data-editor-visual],",
      "[data-leaf-fullscreen='true'] [data-markdown-wrapper] textarea,",
      "[data-leaf-fullscreen='true'] [data-html-wrapper] textarea {",
      "  flex: 1 1 0 !important;",
      "  height: auto !important;",
      "  min-height: 0 !important;",
      "  resize: none !important;",
      "}",
      // The border-wrapper holds the editor body + footer. Tagged with a
      // data attribute so the selector survives template reshuffles and
      // doesn't break if a 4th top-level child gets added to the host.
      // Drop any `height: …` — flex-basis: 0 + flex-grow: 1 owns sizing
      // here, and an explicit height can fight the basis (especially in
      // Safari) and collapse the row.
      "[data-leaf-fullscreen='true'] [data-leaf-body-wrapper] {",
      "  flex: 1 1 0 !important;",
      "  min-height: 0 !important;",
      "  display: flex !important;",
      "  flex-direction: column !important;",
      "}",
      "[data-leaf-fullscreen='true'] [data-leaf-content] {",
      "  flex: 1 1 0 !important;",
      "  min-height: 0 !important;",
      "  display: flex !important;",
      "  flex-direction: column !important;",
      "}",
      "[data-leaf-fullscreen='true'] [data-visual-wrapper]:not(.hidden),",
      "[data-leaf-fullscreen='true'] [data-markdown-wrapper]:not(.hidden),",
      "[data-leaf-fullscreen='true'] [data-html-wrapper]:not(.hidden) {",
      "  flex: 1 1 0 !important;",
      "  min-height: 0 !important;",
      "  display: flex !important;",
      "  flex-direction: column !important;",
      "}",
      // The toolbar shouldn't grow at all — its content height is the
      // whole height it should ever take in fullscreen. Without this it
      // can absorb leftover space from the flex column instead of the
      // editor body.
      "[data-leaf-fullscreen='true'] [data-visual-toolbar] {",
      "  flex: 0 0 auto !important;",
      "}",
      // Resize-grip tooltip (shown when the mouse is over the bottom-right
      // resize grip; hint that double-click auto-fits height to content).
      ".leaf-grip-tooltip {",
      "  position: fixed; pointer-events: none; z-index: 100000;",
      "  background: rgba(17, 24, 39, 0.92); color: #f9fafb;",
      "  padding: 4px 8px; border-radius: 4px;",
      "  font: 500 11px/1.3 ui-sans-serif, system-ui, -apple-system, sans-serif;",
      "  white-space: nowrap;",
      "  opacity: 0; transform: translateY(2px);",
      "  transition: opacity 0.12s ease-out, transform 0.12s ease-out;",
      "  box-shadow: 0 2px 8px rgba(0,0,0,0.18);",
      "}",
      ".leaf-grip-tooltip.leaf-grip-tooltip-visible {",
      "  opacity: 1; transform: translateY(0);",
      "}"
    ].join("\n");
    function injectStyles() {
      if (document.getElementById("leaf-content-editor-css"))
        return;
      var style = document.createElement("style");
      style.id = "leaf-content-editor-css";
      style.textContent = EDITOR_CSS;
      document.head.appendChild(style);
    }
    function htmlToMarkdown(html) {
      var container = document.createElement("div");
      container.innerHTML = html;
      return nodeToMarkdown(container).replace(/\n{3,}/g, "\n\n").trim();
    }
    function nodeToMarkdown(node) {
      var result = "";
      var prevWasBr = false;
      for (var i = 0; i < node.childNodes.length; i++) {
        var child = node.childNodes[i];
        var emit = convertNode(child);
        if (prevWasBr && child.nodeType === Node.TEXT_NODE) {
          emit = emit.replace(/^[\n\r\t]+/, "");
        }
        prevWasBr = child.nodeType === Node.ELEMENT_NODE && child.tagName && child.tagName.toLowerCase() === "br";
        result += emit;
      }
      return result;
    }
    function hasSourceMarkerChild(node) {
      if (!node || !node.childNodes)
        return false;
      for (var i = 0; i < node.childNodes.length; i++) {
        var c = node.childNodes[i];
        if (c.nodeType === Node.ELEMENT_NODE && c.classList && c.classList.contains("leaf-source-marker")) {
          return true;
        }
      }
      return false;
    }
    function wrapInline(text, marker) {
      if (!text)
        return marker + marker;
      var leading = text.match(/^(\s*)/)[0];
      var trailing = text.match(/(\s*)$/)[0];
      var trimmed = text.substring(leading.length, text.length - trailing.length);
      if (!trimmed)
        return leading + trailing;
      return leading + marker + trimmed + marker + trailing;
    }
    function convertNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.replace(/​/g, "").replace(/\u00a0/g, " ");
      }
      if (node.nodeType !== Node.ELEMENT_NODE) {
        return "";
      }
      if (node.classList && node.classList.contains("leaf-atomic")) {
        return node.getAttribute("data-leaf-raw") || "";
      }
      var tag = node.tagName.toLowerCase();
      var inner = nodeToMarkdown(node);
      switch (tag) {
        case "h1":
          return "\n# " + inner.trim() + "\n\n";
        case "h2":
          return "\n## " + inner.trim() + "\n\n";
        case "h3":
          return "\n### " + inner.trim() + "\n\n";
        case "h4":
          return "\n#### " + inner.trim() + "\n\n";
        case "h5":
          return "\n##### " + inner.trim() + "\n\n";
        case "h6":
          return "\n###### " + inner.trim() + "\n\n";
        case "p":
          return inner.trim() + "\n\n";
        case "br":
          if (node.hasAttribute && node.hasAttribute("data-leaf-filler")) {
            return "";
          }
          return "\n";
        case "strong":
        case "b":
          return wrapInline(inner, "**");
        case "em":
        case "i":
          return wrapInline(inner, "*");
        case "s":
        case "del":
        case "strike":
          return wrapInline(inner, "~~");
        case "code":
          if (node.parentElement && node.parentElement.tagName.toLowerCase() === "pre") {
            return inner;
          }
          return "`" + inner + "`";
        case "pre":
          var preLang = node.getAttribute("data-language") || "";
          if (!preLang) {
            var preCode = node.querySelector("code");
            if (preCode) {
              var langMatch = preCode.className.match(/language-(\S+)/);
              if (langMatch)
                preLang = langMatch[1];
            }
          }
          return "\n```" + preLang + "\n" + inner.trim() + "\n```\n\n";
        case "a":
          if (hasSourceMarkerChild(node)) {
            return inner;
          }
          var href = node.getAttribute("href") || "";
          return "[" + inner + "](" + href + ")";
        case "img":
          var src = node.getAttribute("src") || "";
          var alt = node.getAttribute("alt") || "";
          var w = node.getAttribute("width");
          var h = node.getAttribute("height");
          var imgAlign = node.getAttribute("data-align");
          if (w || h || imgAlign) {
            var tag = '<img src="' + src + '" alt="' + alt + '"';
            if (w)
              tag += ' width="' + w + '"';
            if (h)
              tag += ' height="' + h + '"';
            if (imgAlign)
              tag += ' data-align="' + imgAlign + '"';
            tag += " />";
            return tag;
          }
          return "![" + alt + "](" + src + ")";
        case "figure":
          var fimg = node.querySelector("img");
          if (!fimg)
            return inner;
          var fAlign = node.getAttribute("data-align") || fimg.getAttribute("data-align");
          var fcap = node.querySelector("figcaption");
          var capText = fcap ? fcap.textContent : "";
          var out = "\n<figure" + (fAlign ? ' data-align="' + fAlign + '"' : "") + ">";
          out += '<img src="' + (fimg.getAttribute("src") || "") + '"';
          out += ' alt="' + (fimg.getAttribute("alt") || "") + '"';
          if (fimg.getAttribute("width"))
            out += ' width="' + fimg.getAttribute("width") + '"';
          if (fimg.getAttribute("height"))
            out += ' height="' + fimg.getAttribute("height") + '"';
          out += " />";
          if (capText)
            out += "<figcaption>" + capText + "</figcaption>";
          out += "</figure>\n\n";
          return out;
        case "details":
          return "\n" + node.outerHTML.replace(/\s*contenteditable="[^"]*"/gi, "") + "\n\n";
        case "blockquote":
          var callout = node.getAttribute("data-callout");
          var bqInner;
          if (callout) {
            var coParts = [];
            for (var coi = 0; coi < node.childNodes.length; coi++) {
              var coChild = node.childNodes[coi];
              if (coChild.nodeType === Node.ELEMENT_NODE && coChild.classList && coChild.classList.contains("leaf-callout-title")) {
                continue;
              }
              coParts.push(convertNode(coChild));
            }
            bqInner = "[!" + callout.toUpperCase() + "]\n" + coParts.join("").trim();
          } else {
            bqInner = inner.trim();
          }
          return "\n" + bqInner.split("\n").map(function(line) {
            return "> " + line;
          }).join("\n") + "\n\n";
        case "ul":
          return "\n" + convertList(node, "ul") + "\n\n";
        case "ol":
          return "\n" + convertList(node, "ol") + "\n\n";
        case "li":
          return inner;
        case "hr":
          return "\n---\n\n";
        case "table":
          return "\n" + convertTable(node) + "\n";
        case "thead":
        case "tbody":
        case "tr":
        case "th":
        case "td":
          return inner;
        case "div":
          return inner + "\n";
        case "span":
          if (node.classList && node.classList.contains("leaf-syntax-decoration")) {
            return "";
          }
          if (node.classList && node.classList.contains("leaf-spoiler")) {
            return "||" + inner + "||";
          }
          return inner;
        default:
          return inner;
      }
    }
    function convertList(listNode, type) {
      var items = [];
      var index = 1;
      for (var i = 0; i < listNode.children.length; i++) {
        var child = listNode.children[i];
        if (child.tagName.toLowerCase() === "li") {
          var content = nodeToMarkdown(child).trim();
          var prefix;
          if (child.classList && child.classList.contains("leaf-task")) {
            var checked = child.getAttribute("data-checked") === "true";
            prefix = "- [" + (checked ? "x" : " ") + "] ";
          } else {
            prefix = type === "ol" ? index + ". " : "- ";
          }
          items.push(prefix + content);
          index++;
        }
      }
      return items.join("\n");
    }
    function convertTable(tableNode) {
      var rows = tableNode.querySelectorAll("tr");
      if (!rows.length)
        return "";
      var lines = [];
      var aligns = [];
      for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].querySelectorAll("th, td");
        var parts = [];
        for (var j = 0; j < cells.length; j++) {
          parts.push(nodeToMarkdown(cells[j]).trim().replace(/\|/g, "\\|"));
          if (i === 0) {
            var a = cells[j].getAttribute("data-align") || "";
            if (!a) {
              var st = cells[j].getAttribute("style") || "";
              var m = st.match(/text-align:\s*(left|center|right)/);
              if (m)
                a = m[1];
            }
            aligns.push(a);
          }
        }
        lines.push("| " + parts.join(" | ") + " |");
        if (i === 0) {
          var sep = [];
          for (var k = 0; k < parts.length; k++) {
            var al = aligns[k];
            if (al === "center")
              sep.push(":---:");
            else if (al === "left")
              sep.push(":---");
            else if (al === "right")
              sep.push("---:");
            else
              sep.push("---");
          }
          lines.push("| " + sep.join(" | ") + " |");
        }
      }
      return lines.join("\n") + "\n";
    }
    function cleanPastedHtml(html) {
      var container = document.createElement("div");
      container.innerHTML = html;
      container.querySelectorAll("[style]").forEach(function(el) {
        el.removeAttribute("style");
      });
      container.querySelectorAll("[class]").forEach(function(el) {
        el.removeAttribute("class");
      });
      container.querySelectorAll("span").forEach(function(span) {
        var parent = span.parentNode;
        while (span.firstChild) {
          parent.insertBefore(span.firstChild, span);
        }
        parent.removeChild(span);
      });
      container.querySelectorAll("meta, style, link, script, title, xml").forEach(function(el) {
        el.remove();
      });
      container.querySelectorAll("[id]").forEach(function(el) {
        el.removeAttribute("id");
      });
      return container.innerHTML;
    }
    function markdownFormat(textarea, before, after, pushFn) {
      var start = textarea.selectionStart;
      var end = textarea.selectionEnd;
      var text = textarea.value;
      var selected = text.substring(start, end);
      textarea.value = text.substring(0, start) + before + selected + after + text.substring(end);
      textarea.selectionStart = start + before.length;
      textarea.selectionEnd = end + before.length;
      textarea.focus();
      if (pushFn)
        pushFn(textarea.value);
    }
    function markdownLinePrefix(textarea, prefix, pushFn) {
      var start = textarea.selectionStart;
      var text = textarea.value;
      var lineStart = text.lastIndexOf("\n", start - 1) + 1;
      var lineEnd = text.indexOf("\n", start);
      if (lineEnd === -1)
        lineEnd = text.length;
      var line = text.substring(lineStart, lineEnd);
      if (line.startsWith(prefix)) {
        textarea.value = text.substring(0, lineStart) + line.substring(prefix.length) + text.substring(lineEnd);
        textarea.selectionStart = start - prefix.length;
        textarea.selectionEnd = start - prefix.length;
      } else {
        var cleaned = line.replace(/^#{1,6}\s|^[-*+]\s|^\d+\.\s|^>\s/, "");
        textarea.value = text.substring(0, lineStart) + prefix + cleaned + text.substring(lineEnd);
        var offset = prefix.length + cleaned.length - line.length;
        textarea.selectionStart = start + offset;
        textarea.selectionEnd = start + offset;
      }
      textarea.focus();
      if (pushFn)
        pushFn(textarea.value);
    }
    function markdownIndent(textarea, direction, pushFn) {
      var start = textarea.selectionStart;
      var end = textarea.selectionEnd;
      var text = textarea.value;
      var lineStart = text.lastIndexOf("\n", start - 1) + 1;
      var lineEnd = text.indexOf("\n", end);
      if (lineEnd === -1)
        lineEnd = text.length;
      var block = text.substring(lineStart, lineEnd);
      var lines = block.split("\n");
      var indent = "  ";
      var delta = 0;
      var firstDelta = 0;
      var result = lines.map(function(line, i) {
        if (direction === "indent") {
          if (i === 0)
            firstDelta = indent.length;
          delta += indent.length;
          return indent + line;
        } else {
          if (line.startsWith(indent)) {
            if (i === 0)
              firstDelta = -indent.length;
            delta -= indent.length;
            return line.substring(indent.length);
          } else if (line.startsWith(" ")) {
            if (i === 0)
              firstDelta = -1;
            delta -= 1;
            return line.substring(1);
          }
          return line;
        }
      });
      textarea.value = text.substring(0, lineStart) + result.join("\n") + text.substring(lineEnd);
      textarea.selectionStart = Math.max(lineStart, start + firstDelta);
      textarea.selectionEnd = end + delta;
      textarea.focus();
      if (pushFn)
        pushFn(textarea.value);
    }
    function markdownLink(textarea, pushFn) {
      var start = textarea.selectionStart;
      var end = textarea.selectionEnd;
      var text = textarea.value;
      var selected = text.substring(start, end);
      var url = prompt("Enter URL:", "https://");
      if (url === null)
        return;
      var linkText = selected || "link text";
      var md = "[" + linkText + "](" + url + ")";
      textarea.value = text.substring(0, start) + md + text.substring(end);
      textarea.selectionStart = start + 1;
      textarea.selectionEnd = start + 1 + linkText.length;
      textarea.focus();
      if (pushFn)
        pushFn(textarea.value);
    }
    function markdownInsert(textarea, snippet, pushFn) {
      var start = textarea.selectionStart;
      var text = textarea.value;
      textarea.value = text.substring(0, start) + snippet + text.substring(start);
      textarea.selectionStart = start + snippet.length;
      textarea.selectionEnd = start + snippet.length;
      textarea.focus();
      if (pushFn)
        pushFn(textarea.value);
    }
    window.LeafHooks.Leaf = {
      mounted() {
        injectStyles();
        this.el.dataset.leafMountState = "ready";
        this._editorId = this.el.dataset.editorId;
        this._mode = this.el.dataset.mode || "visual";
        this._debounceMs = parseInt(this.el.dataset.debounce || "400", 10);
        this._readonly = this.el.dataset.readonly === "true";
        this._hasUpload = this.el.dataset.hasUpload === "true";
        this._syncInputName = this.el.dataset.syncInputName || "";
        this._denyLinks = this.el.dataset.denyLinks === "true";
        this._denyImages = this.el.dataset.denyImages === "true";
        this._denyVideo = this.el.dataset.denyVideo === "true";
        this._denyMarkdownMode = this.el.dataset.denyMarkdownMode === "true";
        this._denyHtmlMode = this.el.dataset.denyHtmlMode === "true";
        this._debounceTimer = null;
        this._markdownDebounceTimer = null;
        this._htmlDebounceTimer = null;
        this._flushOnBlur = this.el.dataset.flushOnBlur !== "false";
        this._emitEvents = this.el.dataset.emitEvents === "true";
        this._preserveTags = (this.el.dataset.preserveTags || "").split(",").filter(Boolean);
        this._savedContent = this.el.dataset.initialMarkdown || "";
        this._hasEditorFocus = false;
        this._selectionTimer = null;
        this._maxlength = parseInt(this.el.dataset.maxlength || "0", 10) || 0;
        this._smartTypography = this.el.dataset.smartTypography === "true";
        this._protectNavigation = this.el.dataset.protectNavigation === "true";
        this._autoGrow = (this.el.dataset.height || "") === "auto";
        this._sourceBlock = null;
        this._visualEl = this.el.querySelector("[data-editor-visual]");
        this._visualWrapper = this.el.querySelector("[data-visual-wrapper]");
        this._markdownWrapper = this.el.querySelector(
          "[data-markdown-wrapper]"
        );
        this._htmlWrapper = this.el.querySelector("[data-html-wrapper]");
        this._syncFormInput(this.el.dataset.initialMarkdown || "");
        if (this._visualEl) {
          this._stripInterBlockWhitespace(this._visualEl);
          this._unwrapLooseListItems(this._visualEl);
          document.execCommand("defaultParagraphSeparator", false, "p");
          this._visualEl.addEventListener(
            "input",
            this._onVisualInput.bind(this)
          );
          this._visualEl.addEventListener(
            "keydown",
            this._onVisualKeydown.bind(this)
          );
          this._visualEl.addEventListener("paste", this._onPaste.bind(this));
          if (this._visualEl.innerHTML.trim() === "" || this._visualEl.innerHTML === "<br>") {
            this._visualEl.innerHTML = "<p><br></p>";
          }
        }
        this._setupToolbar();
        this._setupStickyToolbar();
        this._setupModeSwitcher();
        this._setupResponsiveToolbar();
        this._setupLinkPopover();
        this._toolbarLayout = this.el.dataset.toolbarLayout || "fixed";
        if (this._toolbarLayout === "floating" || this._toolbarLayout === "both") {
          this._setupSelectionToolbar();
        }
        this._setupImageDragAndDrop();
        this._setupCodeBlockTools();
        this._setupTaskLists();
        this._setupMaxlength();
        this._setupAutoGrow();
        this._setupNavigationGuard();
        this._registerMarkdownHelpers();
        this._setupMarkdownTextarea();
        this._setupHtmlTextarea();
        this._setupGripDoubleClick();
        this._wordCountEl = this.el.querySelector("[data-word-count]");
        this._charCountEl = this.el.querySelector("[data-char-count]");
        this._readingTimeEl = this.el.querySelector("[data-reading-time]");
        this._maxlengthCountEl = this.el.querySelector("[data-maxlength-count]");
        this._updateCounts();
        if (window.visualViewport) {
          this._onVisualViewportResize = function() {
            if (document.activeElement === this._visualEl && this._visualEl) {
              this._scrollCaretIntoView();
            }
          }.bind(this);
          window.visualViewport.addEventListener(
            "resize",
            this._onVisualViewportResize
          );
        }
        this._setupHostEvents();
        this.handleEvent(
          "leaf-command:" + this._editorId,
          this._handleCommand.bind(this)
        );
        this.handleEvent(
          "leaf-set-html:" + this._editorId,
          function(payload) {
            if (this._visualEl && payload.html !== void 0) {
              this._visualEl.innerHTML = payload.html || "<p><br></p>";
              this._stripInterBlockWhitespace(this._visualEl);
              this._unwrapLooseListItems(this._visualEl);
              this._dragHandleBlock = null;
            }
          }.bind(this)
        );
        this.handleEvent(
          "leaf-set-html-textarea:" + this._editorId,
          function(payload) {
            var ta = this._getHtmlTextarea();
            if (ta && payload.html !== void 0) {
              ta.value = payload.html;
            }
          }.bind(this)
        );
        this._fullscreenChangeHandler = this._syncFullscreenState.bind(this);
        document.addEventListener(
          "fullscreenchange",
          this._fullscreenChangeHandler
        );
        document.addEventListener(
          "webkitfullscreenchange",
          this._fullscreenChangeHandler
        );
      },
      updated() {
        this.el.dataset.leafMountState = "ready";
        if (!this._visualEl)
          return;
        var newReadonly = this.el.dataset.readonly === "true";
        if (newReadonly !== this._readonly) {
          this._readonly = newReadonly;
          this._visualEl.contentEditable = !newReadonly;
        }
        var newHasUpload = this.el.dataset.hasUpload === "true";
        if (newHasUpload !== this._hasUpload) {
          this._hasUpload = newHasUpload;
        }
        this._denyLinks = this.el.dataset.denyLinks === "true";
        this._denyImages = this.el.dataset.denyImages === "true";
        this._denyVideo = this.el.dataset.denyVideo === "true";
        this._denyMarkdownMode = this.el.dataset.denyMarkdownMode === "true";
        this._denyHtmlMode = this.el.dataset.denyHtmlMode === "true";
        if (!this._isModeAllowed(this._mode)) {
          var visualTab = this.el.querySelector('[data-mode-tab="visual"]');
          if (visualTab)
            visualTab.click();
        }
        if (this._visualWrapper) {
          var newHandle = this._visualWrapper.querySelector("[data-drag-handle]");
          if (newHandle && newHandle !== this._dragHandle) {
            this._dragHandle = newHandle;
            this._dragHandleBlock = null;
          }
        }
        if (this._imagePopoverTarget && this._imagePopoverEl && !this._imagePopoverEl.parentNode) {
          var imgTarget = this._imagePopoverTarget;
          this._imagePopoverEl = null;
          this._resizeHandles = null;
          this._showImagePopover(imgTarget);
        }
        if (this._stickyPlaceholder && !this._stickyPlaceholder.parentNode && this._stickyToolbarEl) {
          this._stickyToolbarEl.parentNode.insertBefore(
            this._stickyPlaceholder,
            this._stickyToolbarEl
          );
        }
        if (this._syncResponsiveToolbar) {
          this._syncResponsiveToolbar();
        }
      },
      destroyed() {
        if (this._debounceTimer) {
          clearTimeout(this._debounceTimer);
        }
        if (this._markdownDebounceTimer) {
          clearTimeout(this._markdownDebounceTimer);
        }
        if (this._htmlDebounceTimer) {
          clearTimeout(this._htmlDebounceTimer);
        }
        if (this._selectionTimer) {
          clearTimeout(this._selectionTimer);
          this._selectionTimer = null;
        }
        if (this._onSelectionChange) {
          document.removeEventListener(
            "selectionchange",
            this._onSelectionChange
          );
          this._onSelectionChange = null;
        }
        if (this._beforeUnloadHandler) {
          window.removeEventListener("beforeunload", this._beforeUnloadHandler);
          this._beforeUnloadHandler = null;
        }
        this._cleanupDrag();
        this._closeBlockMenu();
        if (this._imgObserver) {
          this._imgObserver.disconnect();
          this._imgObserver = null;
        }
        this._cleanupStickyToolbar();
        if (this._toolbarResizeObserver) {
          this._toolbarResizeObserver.disconnect();
          this._toolbarResizeObserver = null;
        }
        if (this._toolbarResizeRaf) {
          cancelAnimationFrame(this._toolbarResizeRaf);
          this._toolbarResizeRaf = null;
        }
        if (this._toolbarResizeHandler) {
          window.removeEventListener("resize", this._toolbarResizeHandler);
          this._toolbarResizeHandler = null;
        }
        this._closeEmojiPicker();
        this._closeSymbolPicker();
        this._dismissLinkPopover();
        this._dismissImageUrlDialog();
        this._teardownSelectionToolbar();
        if (this._onVisualViewportResize && window.visualViewport) {
          window.visualViewport.removeEventListener(
            "resize",
            this._onVisualViewportResize
          );
          this._onVisualViewportResize = null;
        }
        if (this._gripTooltipCleanup) {
          this._gripTooltipCleanup();
          this._gripTooltipCleanup = null;
        }
        if (this._imageDropdownMenu) {
          this._imageDropdownMenu.remove();
          this._imageDropdownMenu = null;
        }
        if (this._imageDropdownBackdrop) {
          this._imageDropdownBackdrop.remove();
          this._imageDropdownBackdrop = null;
        }
        if (this._onDocClickForPopover) {
          document.removeEventListener("mousedown", this._onDocClickForPopover);
        }
        if (this._fullscreenChangeHandler) {
          document.removeEventListener(
            "fullscreenchange",
            this._fullscreenChangeHandler
          );
          document.removeEventListener(
            "webkitfullscreenchange",
            this._fullscreenChangeHandler
          );
          this._fullscreenChangeHandler = null;
        }
        var gid = this._editorId.replace(/-/g, "_") + "_markdown";
        delete window["markdownFormat_" + gid];
        delete window["markdownLinePrefix_" + gid];
        delete window["markdownLink_" + gid];
        delete window["markdownEditorInsert_" + gid];
        delete window["markdownIndent_" + gid];
      },
      // -- Markdown textarea setup --
      _registerMarkdownHelpers: function() {
        var self2 = this;
        var gid = this._editorId.replace(/-/g, "_") + "_markdown";
        var pushFn = function(value) {
          self2._debouncedPushMarkdownChange(value);
        };
        window["markdownFormat_" + gid] = function(before, after) {
          var ta = self2._getMarkdownTextarea();
          if (ta)
            markdownFormat(ta, before, after, pushFn);
        };
        window["markdownLinePrefix_" + gid] = function(prefix) {
          var ta = self2._getMarkdownTextarea();
          if (ta)
            markdownLinePrefix(ta, prefix, pushFn);
        };
        window["markdownLink_" + gid] = function() {
          var ta = self2._getMarkdownTextarea();
          if (ta)
            markdownLink(ta, pushFn);
        };
        window["markdownEditorInsert_" + gid] = function(snippet) {
          var ta = self2._getMarkdownTextarea();
          if (ta)
            markdownInsert(ta, snippet, pushFn);
        };
        window["markdownIndent_" + gid] = function(direction) {
          var ta = self2._getMarkdownTextarea();
          if (ta)
            markdownIndent(ta, direction, pushFn);
        };
      },
      _setupMarkdownTextarea: function() {
        var self2 = this;
        var textarea = this._getMarkdownTextarea();
        if (!textarea)
          return;
        this._markdownInputHandler = function() {
          self2._debouncedPushMarkdownChange(textarea.value);
          self2._updateCounts();
        };
        textarea.addEventListener("input", this._markdownInputHandler);
      },
      _debouncedPushMarkdownChange: function(content) {
        this._syncFormInput(content);
        if (this._markdownDebounceTimer)
          clearTimeout(this._markdownDebounceTimer);
        var self2 = this;
        this._markdownDebounceTimer = setTimeout(function() {
          self2.pushEventTo(self2.el, "markdown_content_changed", {
            editor_id: self2._editorId,
            content,
            dirty: self2._computeDirty(content)
          });
        }, this._debounceMs);
      },
      // -- HTML textarea setup --
      _setupHtmlTextarea: function() {
        var self2 = this;
        var textarea = this._getHtmlTextarea();
        if (!textarea)
          return;
        textarea.addEventListener("input", function() {
          self2._debouncedPushHtmlChange(textarea.value);
          self2._updateCounts();
        });
      },
      _getHtmlTextarea: function() {
        return document.getElementById(
          this._editorId + "-html-textarea"
        );
      },
      _setupGripDoubleClick: function() {
        var self2 = this;
        var minHeight = parseInt(this.el.dataset.height || "480", 10);
        var GRIP_PX = 18;
        var tooltip = null;
        var ensureTooltip = function() {
          if (tooltip)
            return tooltip;
          tooltip = document.createElement("div");
          tooltip.className = "leaf-grip-tooltip";
          tooltip.textContent = "Drag to resize \xB7 Double-click to fit content";
          document.body.appendChild(tooltip);
          return tooltip;
        };
        var hideTooltip = function() {
          if (tooltip)
            tooltip.classList.remove("leaf-grip-tooltip-visible");
        };
        var showTooltipFor = function(el) {
          var rect = el.getBoundingClientRect();
          var tt = ensureTooltip();
          tt.classList.add("leaf-grip-tooltip-visible");
          var ttRect = tt.getBoundingClientRect();
          tt.style.left = Math.max(4, rect.right - ttRect.width - 4) + "px";
          tt.style.top = rect.bottom - GRIP_PX - ttRect.height - 6 + "px";
        };
        var fitToContent = function(el) {
          var prev = el.style.height;
          el.style.height = "auto";
          var natural = el.scrollHeight;
          if (!natural) {
            el.style.height = prev;
            return;
          }
          el.style.height = Math.max(minHeight, natural) + "px";
        };
        var attach = function(el) {
          if (!el)
            return;
          el.addEventListener("dblclick", function(e) {
            var rect = el.getBoundingClientRect();
            var inGripArea = e.clientX > rect.right - GRIP_PX && e.clientY > rect.bottom - GRIP_PX;
            if (!inGripArea)
              return;
            e.preventDefault();
            fitToContent(el);
          });
          el.addEventListener("mousemove", function(e) {
            var rect = el.getBoundingClientRect();
            var inGripArea = e.clientX > rect.right - GRIP_PX && e.clientY > rect.bottom - GRIP_PX;
            if (inGripArea) {
              showTooltipFor(el);
            } else {
              hideTooltip();
            }
          });
          el.addEventListener("mouseleave", hideTooltip);
        };
        attach(this._visualEl);
        attach(this._getMarkdownTextarea());
        attach(this._getHtmlTextarea());
        this._gripTooltipCleanup = function() {
          if (tooltip && tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
          }
          tooltip = null;
        };
      },
      _debouncedPushHtmlChange: function(content) {
        this._syncFormInput(htmlToMarkdown(content || ""));
        if (this._htmlDebounceTimer)
          clearTimeout(this._htmlDebounceTimer);
        var self2 = this;
        var hmd = htmlToMarkdown(content || "");
        this._htmlDebounceTimer = setTimeout(function() {
          self2.pushEventTo(self2.el, "html_content_changed", {
            editor_id: self2._editorId,
            content,
            dirty: self2._computeDirty(hmd)
          });
        }, this._debounceMs);
      },
      // -- Footer counts --
      _updateCounts: function() {
        if (!this._wordCountEl || !this._charCountEl)
          return;
        var text = "";
        if (this._mode === "visual") {
          text = this._visualEl ? this._visualEl.innerText : "";
        } else if (this._mode === "hybrid") {
          text = this._visualEl ? this._readPlainTextWithoutDecorations() : "";
        } else if (this._mode === "markdown") {
          var ta = this._getMarkdownTextarea();
          text = ta ? ta.value : "";
        } else if (this._mode === "html") {
          var ta = this._getHtmlTextarea();
          text = ta ? ta.value : "";
        }
        var trimmed = text.trim();
        var words = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
        var chars = trimmed.length;
        this._wordCountEl.textContent = words + (words === 1 ? " word" : " words");
        this._charCountEl.textContent = chars + (chars === 1 ? " char" : " chars");
        if (this._readingTimeEl) {
          var mins = words === 0 ? 0 : Math.max(1, Math.ceil(words / 200));
          this._readingTimeEl.textContent = mins + " min read";
        }
        if (this._maxlengthCountEl && this._maxlength) {
          this._maxlengthCountEl.textContent = chars + " / " + this._maxlength;
        }
      },
      // -- Event handlers --
      _onVisualInput: function() {
        if (this._mode !== "visual" && this._mode !== "hybrid")
          return;
        this._dismissLinkPopover();
        if (this._smartTypography)
          this._maybeSmartTypography();
        if (this._mode === "hybrid") {
          this._refreshSourceBlock();
          this._maybeAutoFormatList();
          this._maybeAutoFormatBlockquote();
        }
        this._debouncedPushVisualChange();
        this._updateCounts();
      },
      _onVisualKeydown: function(e) {
        if (this._readonly)
          return;
        var mod = e.ctrlKey || e.metaKey;
        if (mod && e.shiftKey && (e.key === "v" || e.key === "V")) {
          this._pasteAsPlainText = true;
        }
        if (this._mode === "hybrid" && !mod && (e.key === "Backspace" || e.key === "Delete") && this._sourceBlock && this._sourceBlock.isConnected) {
          if (this._maybeHandleSourceDelete(e.key === "Backspace")) {
            e.preventDefault();
            return;
          }
        }
        if (this._mode === "hybrid" && !mod && !e.shiftKey && e.key === "ArrowLeft" && this._sourceBlock && this._sourceBlock.isConnected && this._sourceBlock.tagName && this._sourceBlock.tagName.toLowerCase() === "li") {
          var alSel = window.getSelection();
          if (alSel.rangeCount && alSel.getRangeAt(0).collapsed) {
            var alRange = alSel.getRangeAt(0);
            if (this._sourceBlock.contains(alRange.startContainer)) {
              var alOffset = this._textOffsetInBlock(
                this._sourceBlock,
                alRange.startContainer,
                alRange.startOffset
              );
              var alSrc = (this._sourceBlock.textContent || "").replace(
                /\u00a0/g,
                " "
              );
              var alM = alSrc.match(/^(- |\d+\. )(\[[ xX]\] )?/);
              var alMarkerLen = alM ? alM[0].length : 0;
              if (alMarkerLen > 0 && alOffset === alMarkerLen && !this._sourceBlock.classList.contains("leaf-marker-active")) {
                e.preventDefault();
                this._sourceBlock.classList.add("leaf-marker-active");
                var alMarker = this._sourceBlock.querySelector(".leaf-list-marker");
                var alTextNode = alMarker ? alMarker.firstChild : null;
                if (alTextNode && alTextNode.nodeType === Node.TEXT_NODE) {
                  var alNewRange = document.createRange();
                  alNewRange.setStart(
                    alTextNode,
                    Math.min(alMarkerLen - 1, alTextNode.textContent.length)
                  );
                  alNewRange.collapse(true);
                  alSel.removeAllRanges();
                  alSel.addRange(alNewRange);
                  this._refreshSourceBlock();
                }
                return;
              }
            }
          }
        }
        if ((this._mode === "visual" || this._mode === "hybrid") && !mod && e.key === "Backspace") {
          var bsBlock = this._getCurrentBlock();
          if (bsBlock && bsBlock.tagName && bsBlock.tagName.toLowerCase() === "li") {
            var bsLiText = (bsBlock.textContent || "").replace(/[​ ]/g, "").trim();
            if (bsLiText === "") {
              e.preventDefault();
              var bsList = bsBlock.parentNode;
              var prevLi = bsBlock.previousElementSibling;
              if (prevLi && prevLi.tagName && prevLi.tagName.toLowerCase() === "li") {
                bsList.removeChild(bsBlock);
                var bsRange = document.createRange();
                var lastNode = prevLi.lastChild;
                while (lastNode && lastNode.nodeType === Node.ELEMENT_NODE && lastNode.firstChild) {
                  lastNode = lastNode.lastChild;
                }
                if (lastNode && lastNode.nodeType === Node.TEXT_NODE) {
                  bsRange.setStart(lastNode, lastNode.textContent.length);
                } else {
                  bsRange.setStart(prevLi, prevLi.childNodes.length);
                }
                bsRange.collapse(true);
                var bsSel = window.getSelection();
                bsSel.removeAllRanges();
                bsSel.addRange(bsRange);
                this._visualEl.dispatchEvent(
                  new Event("input", { bubbles: true })
                );
                return;
              }
              var bsListParent = bsList && bsList.parentNode;
              if (bsListParent) {
                var bsP = document.createElement("p");
                bsP.appendChild(document.createElement("br"));
                bsListParent.replaceChild(bsP, bsList);
                var bsRange2 = document.createRange();
                bsRange2.setStart(bsP, 0);
                bsRange2.collapse(true);
                var bsSel2 = window.getSelection();
                bsSel2.removeAllRanges();
                bsSel2.addRange(bsRange2);
                this._visualEl.dispatchEvent(
                  new Event("input", { bubbles: true })
                );
              }
              return;
            }
          }
        }
        if (this._mode === "hybrid" && !mod && !e.shiftKey && e.key === "Enter" && this._sourceBlock && this._sourceBlock.isConnected) {
          if (this._maybeHandleSourceEnter()) {
            e.preventDefault();
            return;
          }
        }
        if (this._mode === "hybrid" && !mod && e.key && e.key.length === 1) {
          if (this._maybeRedirectPastTrailingBlock(e.key)) {
            e.preventDefault();
            return;
          }
        }
        if ((this._mode === "visual" || this._mode === "hybrid") && !mod && !e.shiftKey && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
          if (this._maybeArrowIntoHr(e.key)) {
            e.preventDefault();
            return;
          }
        }
        if (mod && (e.key === "b" || e.key === "i" || e.shiftKey && e.key === "x")) {
          e.preventDefault();
          if (e.key === "b" && this._isInsideHeading())
            return;
          var preSnapshot = this._snapshotFormattingElements();
          var cmd = e.key === "b" ? "bold" : e.key === "i" ? "italic" : "strikeThrough";
          document.execCommand(cmd, false, null);
          this._updateToolbarState();
          if (!this._refreshHybridSourceBlockAfterToolbarAction()) {
            this._deferredSyntaxRefresh(preSnapshot);
          }
          return;
        }
        if (mod && e.key === "u") {
          e.preventDefault();
          document.execCommand("underline", false, null);
          return;
        }
        if (mod && e.key === "k") {
          e.preventDefault();
          if (!this._denyLinks)
            this._insertLink();
          return;
        }
        if (e.key === "Tab" && !mod) {
          if (document.queryCommandState("insertUnorderedList") || document.queryCommandState("insertOrderedList")) {
            e.preventDefault();
            if (e.shiftKey) {
              document.execCommand("outdent", false, null);
            } else {
              document.execCommand("indent", false, null);
            }
            return;
          }
        }
        if ((e.key === "ArrowRight" || e.key === "ArrowLeft") && !mod && !e.shiftKey && this._mode !== "hybrid") {
          var arrowSel = window.getSelection();
          if (arrowSel && arrowSel.rangeCount && arrowSel.isCollapsed) {
            var arrowRange = arrowSel.getRangeAt(0);
            var arrowEl = this._inlineFormattingAncestor(arrowRange.endContainer);
            if (arrowEl) {
              var sPrefix = document.createRange();
              sPrefix.selectNodeContents(arrowEl);
              sPrefix.setEnd(arrowRange.endContainer, arrowRange.endOffset);
              var sLen = sPrefix.toString().length;
              var sTotal = arrowEl.textContent.length;
              var visualEl = this._visualEl;
              var landCursor = function(newRange2) {
                newRange2.collapse(true);
                arrowSel.removeAllRanges();
                arrowSel.addRange(newRange2);
                visualEl.dispatchEvent(new Event("input", { bubbles: true }));
              };
              if (e.key === "ArrowRight" && sLen === sTotal) {
                e.preventDefault();
                var nextSib = arrowEl.nextSibling;
                var afterRange = document.createRange();
                if (nextSib && nextSib.nodeType === Node.TEXT_NODE && nextSib.textContent.length > 0) {
                  afterRange.setStart(
                    nextSib,
                    Math.min(1, nextSib.textContent.length)
                  );
                } else {
                  var spaceR = document.createTextNode("\xA0");
                  arrowEl.parentNode.insertBefore(
                    spaceR,
                    arrowEl.nextSibling
                  );
                  afterRange.setStart(spaceR, 1);
                }
                landCursor(afterRange);
                return;
              }
              if (e.key === "ArrowLeft" && sLen === 0) {
                e.preventDefault();
                var prevSib = arrowEl.previousSibling;
                var beforeRange = document.createRange();
                if (prevSib && prevSib.nodeType === Node.TEXT_NODE && prevSib.textContent.length > 0) {
                  beforeRange.setStart(prevSib, prevSib.textContent.length);
                } else {
                  var spaceL = document.createTextNode("\xA0");
                  arrowEl.parentNode.insertBefore(spaceL, arrowEl);
                  beforeRange.setStart(spaceL, 0);
                }
                landCursor(beforeRange);
                return;
              }
            }
          }
        }
        if (e.key === "Enter" && !e.shiftKey) {
          var sel = window.getSelection();
          if (sel && sel.rangeCount && sel.isCollapsed) {
            var fmt = this._inlineFormattingAncestor(sel.anchorNode);
            if (fmt) {
              var blockOfFmt = this._getCurrentBlock();
              if (blockOfFmt && blockOfFmt.parentNode) {
                e.preventDefault();
                var newP = document.createElement("p");
                newP.appendChild(document.createElement("br"));
                blockOfFmt.parentNode.insertBefore(
                  newP,
                  blockOfFmt.nextSibling
                );
                var nr = document.createRange();
                nr.setStart(newP, 0);
                nr.collapse(true);
                sel.removeAllRanges();
                sel.addRange(nr);
                this._visualEl.dispatchEvent(
                  new Event("input", { bubbles: true })
                );
                return;
              }
            }
          }
          var block = this._getCurrentBlock();
          var bqQuote = null;
          if (block && block.tagName && block.tagName.toLowerCase() === "blockquote") {
            bqQuote = block;
          } else if (block && block.parentNode && block.parentNode.tagName && block.parentNode.tagName.toLowerCase() === "blockquote") {
            bqQuote = block.parentNode;
          }
          if (bqQuote) {
            var bqInnerBlock = bqQuote === block ? bqQuote : block;
            var bqInnerEmpty = (bqInnerBlock.textContent || "").replace(/[​ ]/g, "").trim() === "";
            if (bqInnerEmpty) {
              e.preventDefault();
              var bqAfter = document.createElement("p");
              bqAfter.appendChild(document.createElement("br"));
              if (bqQuote.parentNode) {
                bqQuote.parentNode.insertBefore(bqAfter, bqQuote.nextSibling);
              }
              if (bqInnerBlock !== bqQuote && bqInnerBlock.parentNode) {
                bqInnerBlock.parentNode.removeChild(bqInnerBlock);
              }
              if (!bqQuote.firstChild) {
                bqQuote.parentNode.removeChild(bqQuote);
              }
              var bqRange = document.createRange();
              bqRange.setStart(bqAfter, 0);
              bqRange.collapse(true);
              var bqSel = window.getSelection();
              bqSel.removeAllRanges();
              bqSel.addRange(bqRange);
              this._visualEl.dispatchEvent(
                new Event("input", { bubbles: true })
              );
              return;
            }
          }
          if (block && block.tagName && block.tagName.toLowerCase() === "li") {
            var liParent = block.parentNode;
            var isTaskLi = block.classList && block.classList.contains("leaf-task");
            var liText = (block.textContent || "").replace(/[​ ]/g, "").trim();
            if (liText === "") {
              e.preventDefault();
              var liGrandparent = liParent && liParent.parentNode;
              if (liGrandparent && liParent) {
                var trailingItems = [];
                var trailSib = block.nextSibling;
                while (trailSib) {
                  var trailNext = trailSib.nextSibling;
                  trailingItems.push(trailSib);
                  trailSib = trailNext;
                }
                liParent.removeChild(block);
                var exitRange = document.createRange();
                var exitP = document.createElement("p");
                exitP.appendChild(document.createElement("br"));
                liGrandparent.insertBefore(exitP, liParent.nextSibling);
                if (trailingItems.length) {
                  var splitList = document.createElement(
                    liParent.tagName.toLowerCase()
                  );
                  for (var si = 0; si < trailingItems.length; si++) {
                    splitList.appendChild(trailingItems[si]);
                  }
                  liGrandparent.insertBefore(splitList, exitP.nextSibling);
                }
                exitRange.setStart(exitP, 0);
                if (!liParent.firstChild) {
                  liGrandparent.removeChild(liParent);
                }
                exitRange.collapse(true);
                var exitSel = window.getSelection();
                exitSel.removeAllRanges();
                exitSel.addRange(exitRange);
                this._visualEl.dispatchEvent(
                  new Event("input", { bubbles: true })
                );
              }
              return;
            }
            e.preventDefault();
            var liSel = window.getSelection();
            var liRange = liSel.getRangeAt(0);
            var newLi = document.createElement("li");
            if (isTaskLi) {
              newLi.className = "leaf-task";
              newLi.setAttribute("data-checked", "false");
              var newTaskBox = document.createElement("span");
              newTaskBox.className = "leaf-task-box";
              newTaskBox.setAttribute("contenteditable", "false");
              newLi.appendChild(newTaskBox);
            }
            var afterRange = document.createRange();
            afterRange.setStart(liRange.startContainer, liRange.startOffset);
            afterRange.setEndAfter(block.lastChild || block);
            var afterFragment = afterRange.extractContents();
            newLi.appendChild(afterFragment);
            var liNeedsPlaceholder = isTaskLi ? !this._firstTextDescendant(newLi) : !newLi.firstChild;
            if (liNeedsPlaceholder) {
              newLi.appendChild(document.createTextNode("\u200B"));
            }
            liParent.insertBefore(newLi, block.nextSibling);
            if (!block.firstChild) {
              block.appendChild(document.createElement("br"));
            }
            var liNewRange = document.createRange();
            var firstText = this._firstTextDescendant(newLi);
            if (firstText) {
              var offsetInText = firstText.textContent === "\u200B" ? 1 : 0;
              liNewRange.setStart(firstText, offsetInText);
            } else {
              liNewRange.setStart(newLi, 0);
            }
            liNewRange.collapse(true);
            liSel.removeAllRanges();
            liSel.addRange(liNewRange);
            this._visualEl.dispatchEvent(
              new Event("input", { bubbles: true })
            );
            return;
          }
        }
        if (e.key === "Enter" && e.shiftKey) {
          e.preventDefault();
          var sel = window.getSelection();
          if (!sel || !sel.rangeCount)
            return;
          var range2 = sel.getRangeAt(0);
          range2.deleteContents();
          var block = this._getCurrentBlock();
          var atEndOfBlock = false;
          if (block) {
            var prefix = document.createRange();
            prefix.selectNodeContents(block);
            prefix.setEnd(range2.endContainer, range2.endOffset);
            atEndOfBlock = prefix.toString().length === block.textContent.length;
          }
          var br = document.createElement("br");
          range2.insertNode(br);
          if (atEndOfBlock) {
            var filler = document.createElement("br");
            filler.setAttribute("data-leaf-filler", "");
            br.parentNode.insertBefore(filler, br.nextSibling);
          }
          var newRange = document.createRange();
          newRange.setStartAfter(br);
          newRange.collapse(true);
          sel.removeAllRanges();
          sel.addRange(newRange);
          this._visualEl.dispatchEvent(new Event("input", { bubbles: true }));
          return;
        }
      },
      _onPaste: function(e) {
        var clipboardData = e.clipboardData || window.clipboardData;
        if (!clipboardData)
          return;
        var imageFile = this._clipboardImageFile(clipboardData);
        if (imageFile) {
          e.preventDefault();
          this._handlePastedImage(imageFile);
          return;
        }
        if (this._pasteAsPlainText) {
          this._pasteAsPlainText = false;
          var plain = clipboardData.getData("text/plain");
          if (plain) {
            e.preventDefault();
            document.execCommand("insertText", false, plain);
            return;
          }
        }
        var html = clipboardData.getData("text/html");
        if (html) {
          e.preventDefault();
          var cleaned = cleanPastedHtml(html);
          var container = document.createElement("div");
          container.innerHTML = cleaned;
          if (this._denyLinks) {
            container.querySelectorAll("a").forEach(function(anchor) {
              var parent = anchor.parentNode;
              while (anchor.firstChild) {
                parent.insertBefore(anchor.firstChild, anchor);
              }
              parent.removeChild(anchor);
            });
          }
          if (this._denyImages) {
            container.querySelectorAll("img").forEach(function(img) {
              img.remove();
            });
          }
          document.execCommand("insertHTML", false, container.innerHTML);
          return;
        }
        var text = clipboardData.getData("text/plain");
        if (text && (this._mode === "visual" || this._mode === "hybrid") && this._maybePasteTabular(text)) {
          e.preventDefault();
          return;
        }
        if (text && /^https?:\/\/\S+$/.test(text.trim())) {
          var url = text.trim();
          e.preventDefault();
          var sel = window.getSelection();
          if (sel && !sel.isCollapsed && this._visualEl && this._visualEl.contains(sel.anchorNode)) {
            document.execCommand("createLink", false, url);
          } else {
            var safe = url.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            document.execCommand(
              "insertHTML",
              false,
              '<a href="' + safe + '">' + safe + "</a>"
            );
          }
          return;
        }
      },
      // Find an image File on the clipboard, or null. Covers both the
      // `items` (Chrome/Safari screenshots) and `files` access paths.
      _clipboardImageFile: function(clipboardData) {
        if (clipboardData.items) {
          for (var i = 0; i < clipboardData.items.length; i++) {
            var item = clipboardData.items[i];
            if (item.kind === "file" && item.type.indexOf("image/") === 0) {
              var f = item.getAsFile();
              if (f)
                return f;
            }
          }
        }
        if (clipboardData.files && clipboardData.files.length) {
          for (var j = 0; j < clipboardData.files.length; j++) {
            if (clipboardData.files[j].type.indexOf("image/") === 0) {
              return clipboardData.files[j];
            }
          }
        }
        return null;
      },
      // Read a pasted image to a data URL, then either hand it to the host
      // (so its upload_handler can persist it and swap in a real URL via
      // send_update(:insert_image)) or insert it inline as a fallback.
      _handlePastedImage: function(file) {
        var self2 = this;
        var reader = new FileReader();
        reader.onload = function() {
          var dataUrl = reader.result;
          if (self2._hasUpload && self2._emitEvents) {
            self2.pushEventTo(self2.el, "paste_image", {
              editor_id: self2._editorId,
              data_url: dataUrl,
              name: file.name || "pasted-image",
              mime: file.type || "image/png"
            });
          } else if (self2._visualEl) {
            self2._visualEl.focus();
            document.execCommand(
              "insertHTML",
              false,
              '<img src="' + dataUrl + '" alt="" draggable="true" />'
            );
            self2._debouncedPushVisualChange();
          }
        };
        reader.readAsDataURL(file);
      },
      // -- Push content to LiveView --
      _debouncedPushVisualChange: function() {
        if (this._debounceTimer)
          clearTimeout(this._debounceTimer);
        if (this._visualEl) {
          this._syncFormInput(htmlToMarkdown(this._visualEl.innerHTML));
        }
        this._debounceTimer = setTimeout(
          function() {
            if (!this._visualEl)
              return;
            var html = this._visualEl.innerHTML;
            var markdown = htmlToMarkdown(html);
            this._syncFormInput(markdown);
            this.pushEventTo(this.el, "content_changed", {
              editor_id: this._editorId,
              html,
              markdown,
              dirty: this._computeDirty(markdown)
            });
          }.bind(this),
          this._debounceMs
        );
      },
      _syncFormInput: function(markdown) {
        if (!this._syncInputName)
          return;
        var form = this.el.closest("form");
        if (!form)
          return;
        var input = form.querySelector(
          'input[type="hidden"][data-leaf-sync-input="' + this._editorId + '"]'
        );
        if (!input) {
          input = document.createElement("input");
          input.type = "hidden";
          input.name = this._syncInputName;
          input.dataset.leafSyncInput = this._editorId;
          form.appendChild(input);
        }
        input.value = markdown || "";
      },
      // -- Host integration: focus / blur / selection / flush / dirty --
      _setupHostEvents: function() {
        var self2 = this;
        this._savedContent = this._currentMarkdown();
        this._onFocusIn = function() {
          if (!self2._hasEditorFocus) {
            self2._hasEditorFocus = true;
            if (self2._emitEvents) {
              self2.pushEventTo(self2.el, "focus", { editor_id: self2._editorId });
            }
          }
        };
        this._onFocusOut = function() {
          setTimeout(function() {
            if (!self2.el || !self2.el.isConnected)
              return;
            if (self2.el.contains(document.activeElement))
              return;
            if (!self2._hasEditorFocus)
              return;
            self2._hasEditorFocus = false;
            if (self2._flushOnBlur)
              self2._flushPending();
            if (self2._emitEvents) {
              self2.pushEventTo(self2.el, "blur", { editor_id: self2._editorId });
            }
          }, 0);
        };
        this.el.addEventListener("focusin", this._onFocusIn);
        this.el.addEventListener("focusout", this._onFocusOut);
        if (this._emitEvents) {
          this._onSelectionChange = function() {
            if (!self2._hasEditorFocus)
              return;
            if (self2._selectionTimer)
              return;
            self2._selectionTimer = setTimeout(function() {
              self2._selectionTimer = null;
              self2._emitSelectionChanged();
            }, 120);
          };
          document.addEventListener("selectionchange", this._onSelectionChange);
        }
      },
      _emitSelectionChanged: function() {
        var info = this._getSelectionInfo();
        if (!info)
          return;
        this.pushEventTo(this.el, "selection_changed", {
          editor_id: this._editorId,
          text: info.text,
          range: info.range
        });
      },
      // Returns { text, range } for the current selection, or null when the
      // selection isn't inside this editor. `range` is { start, end } char
      // offsets for the textarea surfaces and null for the contenteditable
      // (where a flat integer offset isn't meaningful).
      _getSelectionInfo: function() {
        if (this._mode === "markdown" || this._mode === "html") {
          var ta = this._mode === "markdown" ? this._getMarkdownTextarea() : this._getHtmlTextarea();
          if (!ta || document.activeElement !== ta)
            return null;
          var start = ta.selectionStart;
          var end = ta.selectionEnd;
          return {
            text: ta.value.substring(start, end),
            range: { start, end }
          };
        }
        if (!this._visualEl)
          return null;
        var sel = window.getSelection();
        if (!sel || sel.rangeCount === 0)
          return null;
        var range2 = sel.getRangeAt(0);
        if (!this._visualEl.contains(range2.commonAncestorContainer))
          return null;
        return { text: sel.toString(), range: null };
      },
      // Force any pending debounced change to fire immediately for the
      // surface that matches the current mode. Pushing only the active
      // surface avoids clobbering server content with a stale inactive one.
      _flushPending: function() {
        var id = this._editorId;
        if (this._mode === "markdown") {
          if (this._markdownDebounceTimer) {
            clearTimeout(this._markdownDebounceTimer);
            this._markdownDebounceTimer = null;
          }
          var mta = this._getMarkdownTextarea();
          if (mta) {
            this._syncFormInput(mta.value);
            this.pushEventTo(this.el, "markdown_content_changed", {
              editor_id: id,
              content: mta.value,
              dirty: this._computeDirty(mta.value)
            });
          }
        } else if (this._mode === "html") {
          if (this._htmlDebounceTimer) {
            clearTimeout(this._htmlDebounceTimer);
            this._htmlDebounceTimer = null;
          }
          var hta = this._getHtmlTextarea();
          if (hta) {
            var hmd = htmlToMarkdown(hta.value || "");
            this._syncFormInput(hmd);
            this.pushEventTo(this.el, "html_content_changed", {
              editor_id: id,
              content: hta.value,
              dirty: this._computeDirty(hmd)
            });
          }
        } else if (this._visualEl) {
          if (this._debounceTimer) {
            clearTimeout(this._debounceTimer);
            this._debounceTimer = null;
          }
          var html = this._visualEl.innerHTML;
          var markdown = htmlToMarkdown(html);
          this._syncFormInput(markdown);
          this.pushEventTo(this.el, "content_changed", {
            editor_id: id,
            html,
            markdown,
            dirty: this._computeDirty(markdown)
          });
        }
      },
      _computeDirty: function(markdown) {
        return (markdown || "") !== (this._savedContent || "");
      },
      // The current content as markdown, read from the active surface.
      _currentMarkdown: function() {
        if (this._mode === "markdown") {
          var mta = this._getMarkdownTextarea();
          return mta ? mta.value : this._savedContent || "";
        }
        if (this._mode === "html") {
          var hta = this._getHtmlTextarea();
          return hta ? htmlToMarkdown(hta.value || "") : this._savedContent || "";
        }
        return this._visualEl ? htmlToMarkdown(this._visualEl.innerHTML) : this._savedContent || "";
      },
      // Insert text at the caret of a textarea, collapsing any selection.
      _insertAtTextarea: function(ta, text) {
        var start = ta.selectionStart;
        var end = ta.selectionEnd;
        var v = ta.value;
        ta.value = v.substring(0, start) + text + v.substring(end);
        var pos = start + text.length;
        ta.selectionStart = ta.selectionEnd = pos;
        ta.focus();
      },
      // If `text` is exactly one preserved custom tag (<Hero .../> or
      // <CTA>…</CTA> whose name is in preserve_tags), return the atomic-chip
      // HTML so it can be inserted as a finished chip in visual/hybrid mode;
      // otherwise null (insert as plain text).
      _maybeAtomicChip: function(text) {
        if (!this._preserveTags || this._preserveTags.length === 0)
          return null;
        var trimmed = (text || "").trim();
        var m = trimmed.match(/^<([A-Za-z][\w-]*)\b/);
        if (!m)
          return null;
        var name = m[1];
        if (this._preserveTags.indexOf(name.toLowerCase()) === -1)
          return null;
        var whole = new RegExp(
          "^<" + name + "\\b[^>]*?(?:/>|>[\\s\\S]*</" + name + ">)$"
        );
        if (!whole.test(trimmed))
          return null;
        var raw = trimmed.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        return '<span class="leaf-atomic" contenteditable="false" data-leaf-raw="' + raw + '"><span class="leaf-atomic-label">' + name + "</span></span>";
      },
      // -- Character limit (maxlength) --
      _setupMaxlength: function() {
        if (!this._maxlength || !this._visualEl)
          return;
        var self2 = this;
        this._visualEl.addEventListener("beforeinput", function(e) {
          if (!self2._maxlength)
            return;
          if (e.inputType && e.inputType.indexOf("delete") === 0)
            return;
          var len = (self2._visualEl.innerText || "").length;
          if (len >= self2._maxlength && /^(insertText|insertParagraph|insertFromPaste|insertCompositionText|insertLineBreak)$/.test(
            e.inputType || ""
          )) {
            e.preventDefault();
          }
        });
      },
      // -- Auto-grow (height="auto") --
      _setupAutoGrow: function() {
        if (!this._autoGrow)
          return;
        var self2 = this;
        var attach = function(ta) {
          if (!ta)
            return;
          ta.style.resize = "none";
          ta.addEventListener("input", function() {
            self2._growTextarea(ta);
          });
          self2._growTextarea(ta);
        };
        attach(this._getMarkdownTextarea());
        attach(this._getHtmlTextarea());
      },
      _growTextarea: function(ta) {
        if (!ta)
          return;
        ta.style.height = "auto";
        ta.style.height = ta.scrollHeight + "px";
      },
      // -- Unsaved-changes navigation guard --
      _setupNavigationGuard: function() {
        if (!this._protectNavigation)
          return;
        var self2 = this;
        this._beforeUnloadHandler = function(e) {
          if (self2._computeDirty(self2._currentMarkdown())) {
            e.preventDefault();
            e.returnValue = "";
            return "";
          }
        };
        window.addEventListener("beforeunload", this._beforeUnloadHandler);
      },
      // -- Smart typography (opt-in) --
      // Replace the just-typed sequence before the caret with its typographic
      // form (-- → em dash, ... → ellipsis, straight → curly quotes). Skips
      // code/pre so samples stay literal. Called from _onVisualInput.
      _maybeSmartTypography: function() {
        if (!this._smartTypography)
          return;
        var sel = window.getSelection();
        if (!sel || !sel.rangeCount)
          return;
        var range2 = sel.getRangeAt(0);
        var node = range2.startContainer;
        if (node.nodeType !== Node.TEXT_NODE)
          return;
        if (node.parentElement && node.parentElement.closest("code, pre"))
          return;
        var offset = range2.startOffset;
        var text = node.textContent;
        var before = text.slice(0, offset);
        var repl = null;
        var cut = 0;
        if (/\.\.\.$/.test(before)) {
          repl = "\u2026";
          cut = 3;
        } else if (/--$/.test(before)) {
          repl = "\u2014";
          cut = 2;
        } else if (before.charAt(offset - 1) === '"') {
          var p = before.charAt(offset - 2);
          repl = p === "" || /\s/.test(p) ? "\u201C" : "\u201D";
          cut = 1;
        } else if (before.charAt(offset - 1) === "'") {
          var p2 = before.charAt(offset - 2);
          repl = p2 === "" || /\s/.test(p2) ? "\u2018" : "\u2019";
          cut = 1;
        }
        if (!repl)
          return;
        var newBefore = before.slice(0, offset - cut) + repl;
        node.textContent = newBefore + text.slice(offset);
        var r = document.createRange();
        r.setStart(node, newBefore.length);
        r.collapse(true);
        sel.removeAllRanges();
        sel.addRange(r);
      },
      // -- Export / copy (#54) --
      _currentHtml: function() {
        if (this._mode === "html") {
          var hta = this._getHtmlTextarea();
          return hta ? hta.value : "";
        }
        return this._visualEl ? this._visualEl.innerHTML : "";
      },
      _downloadMarkdown: function() {
        var md = this._currentMarkdown();
        var blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = (this._editorId || "document") + ".md";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function() {
          URL.revokeObjectURL(url);
        }, 1e3);
      },
      // -- Mode switching --
      _setupResponsiveToolbar: function() {
        var toolbar = this.el.querySelector("[data-visual-toolbar]");
        var inlineModes = this.el.querySelector('[data-mode-switcher="inline"]');
        var compactModes = this.el.querySelector("[data-mode-switcher-compact]");
        var fullscreenSection = this.el.querySelector('[data-toolbar-section="fullscreen"]');
        if (!toolbar || !inlineModes || !compactModes)
          return;
        var self2 = this;
        this._toolbarResizeRaf = null;
        this._syncResponsiveToolbar = function() {
          if (self2._toolbarResizeRaf) {
            cancelAnimationFrame(self2._toolbarResizeRaf);
          }
          self2._toolbarResizeRaf = requestAnimationFrame(function() {
            self2._toolbarResizeRaf = null;
            if (!toolbar.isConnected)
              return;
            var toolbarWidth = toolbar.getBoundingClientRect().width;
            var previousWidth = self2._responsiveToolbarWidth;
            self2._responsiveToolbarWidth = toolbarWidth;
            var isShrinking = previousWidth !== void 0 && toolbarWidth < previousWidth;
            var shouldCompactModes = toolbarWidth <= 640;
            if (toolbar.dataset.compactModes === "true") {
              if (isShrinking || toolbarWidth <= 640) {
                shouldCompactModes = true;
              } else if (previousWidth !== void 0 && Math.abs(toolbarWidth - previousWidth) < 1) {
                return;
              } else {
                delete toolbar.dataset.compactModes;
              }
            }
            var rowTop = null;
            var maxTop = null;
            toolbar.querySelectorAll("button, summary").forEach(function(el) {
              var inMenu = el.closest("ul");
              if (inlineModes.contains(el) || compactModes.contains(el) || fullscreenSection && fullscreenSection.contains(el) || inMenu && toolbar.contains(inMenu) || el.offsetParent === null) {
                return;
              }
              var top2 = el.getBoundingClientRect().top;
              if (rowTop === null || top2 < rowTop)
                rowTop = top2;
              if (maxTop === null || top2 > maxTop)
                maxTop = top2;
            });
            if (rowTop === null)
              rowTop = toolbar.getBoundingClientRect().top;
            var modeTop = inlineModes.getBoundingClientRect().top;
            var fullscreenTop = fullscreenSection && fullscreenSection.offsetParent !== null ? fullscreenSection.getBoundingClientRect().top : rowTop;
            if (modeTop > rowTop + 2 || fullscreenTop > rowTop + 2 || maxTop !== null && maxTop > rowTop + 2) {
              shouldCompactModes = true;
            }
            if (!shouldCompactModes) {
              delete toolbar.dataset.compactModes;
              delete toolbar.dataset.toolbarOverflowLevel;
              self2._toolbarCompactStartWidth = null;
              return;
            }
            toolbar.dataset.compactModes = "true";
            if (self2._toolbarCompactStartWidth === null || self2._toolbarCompactStartWidth === void 0 || toolbarWidth > self2._toolbarCompactStartWidth) {
              self2._toolbarCompactStartWidth = toolbarWidth;
            }
            var overflowStep = 30;
            var overflowLevel = Math.floor(
              (self2._toolbarCompactStartWidth - toolbarWidth) / overflowStep
            );
            if (overflowLevel <= 0) {
              delete toolbar.dataset.toolbarOverflowLevel;
            } else {
              toolbar.dataset.toolbarOverflowLevel = String(
                Math.min(overflowLevel, 10)
              );
            }
          });
        };
        if (window.ResizeObserver) {
          this._toolbarResizeObserver = new ResizeObserver(function() {
            self2._syncResponsiveToolbar();
          });
          this._toolbarResizeObserver.observe(toolbar);
        } else {
          this._toolbarResizeHandler = function() {
            self2._syncResponsiveToolbar();
          };
          window.addEventListener("resize", this._toolbarResizeHandler);
        }
        this._syncResponsiveToolbar();
      },
      _setupModeSwitcher: function() {
        var self2 = this;
        var tabs = this.el.querySelectorAll("[data-mode-tab]");
        tabs.forEach(function(tab) {
          tab.addEventListener("click", function(e) {
            e.preventDefault();
            var newMode = tab.dataset.modeTab;
            if (!self2._isModeAllowed(newMode))
              return;
            if (newMode === self2._mode)
              return;
            self2._dismissLinkPopover();
            var oldMode = self2._mode;
            self2._syncModes(oldMode, newMode);
            self2._mode = newMode;
            self2._applyModeVisibility(newMode);
            tabs.forEach(function(t) {
              if (t.dataset.modeTab === newMode) {
                t.classList.add("btn-active");
                t.classList.remove("btn-ghost");
              } else {
                t.classList.remove("btn-active");
                t.classList.add("btn-ghost");
              }
            });
            var compactMenu = tab.closest("[data-mode-switcher-compact]");
            if (compactMenu)
              compactMenu.removeAttribute("open");
            var currentMarkdown = "";
            var ta = self2._getMarkdownTextarea();
            if (ta)
              currentMarkdown = ta.value;
            self2.pushEventTo(self2.el, "mode_changed", {
              editor_id: self2._editorId,
              mode: newMode,
              content: currentMarkdown
            });
            self2._updateCounts();
          });
        });
      },
      _isModeAllowed: function(mode) {
        if (mode === "markdown" && this._denyMarkdownMode)
          return false;
        if (mode === "html" && this._denyHtmlMode)
          return false;
        return true;
      },
      _applyModeVisibility: function(mode) {
        var wrappers = [
          { el: this._visualWrapper, mode: "visual" },
          { el: this._markdownWrapper, mode: "markdown" },
          { el: this._htmlWrapper, mode: "html" }
        ];
        wrappers.forEach(function(w) {
          if (!w.el)
            return;
          var visible = w.mode === mode || w.mode === "visual" && mode === "hybrid";
          if (visible) {
            w.el.classList.remove("hidden");
          } else {
            w.el.classList.add("hidden");
          }
        });
        var toolbarButtons = this.el.querySelector("[data-visual-toolbar-buttons]");
        if (toolbarButtons) {
          if (mode === "html") {
            toolbarButtons.classList.add("hidden");
            toolbarButtons.classList.remove("contents");
          } else {
            toolbarButtons.classList.remove("hidden");
            toolbarButtons.classList.add("contents");
          }
        }
        if (this._autoGrow) {
          if (mode === "markdown")
            this._growTextarea(this._getMarkdownTextarea());
          else if (mode === "html")
            this._growTextarea(this._getHtmlTextarea());
        }
      },
      _syncModes: function(from, to) {
        var self2 = this;
        if (from === "visual" || from === "hybrid") {
          if (from === "hybrid")
            this._exitAllSourceMode();
          var visualHtml = this._visualEl ? this._visualEl.innerHTML : "";
          if (to === "markdown") {
            var mdTa = this._getMarkdownTextarea();
            if (mdTa)
              mdTa.value = htmlToMarkdown(visualHtml);
          } else if (to === "html") {
            var htmlTa = this._getHtmlTextarea();
            if (htmlTa) {
              htmlTa.value = this._stripDecorationSpans(visualHtml);
            }
          }
        } else if (from === "markdown") {
          var mdTa = this._getMarkdownTextarea();
          var markdown = mdTa ? mdTa.value : "";
          if (to === "visual" || to === "hybrid") {
            this.pushEventTo(this.el, "sync_markdown_to_visual", {
              editor_id: this._editorId,
              markdown
            });
          } else if (to === "html") {
            this.pushEventTo(this.el, "convert_markdown_to_html", {
              editor_id: this._editorId,
              markdown
            });
          }
        } else if (from === "html") {
          var htmlTa = this._getHtmlTextarea();
          var rawHtml = htmlTa ? htmlTa.value : "";
          if (to === "visual" || to === "hybrid") {
            if (this._visualEl) {
              this._visualEl.innerHTML = rawHtml || "<p><br></p>";
            }
          } else if (to === "markdown") {
            var mdTa = this._getMarkdownTextarea();
            if (mdTa)
              mdTa.value = htmlToMarkdown(rawHtml);
          }
        }
      },
      _stripDecorationSpans: function(html) {
        var tmp = document.createElement("div");
        tmp.innerHTML = html;
        var spans = tmp.querySelectorAll(".leaf-syntax-decoration");
        for (var i = 0; i < spans.length; i++) {
          if (spans[i].parentNode) {
            spans[i].parentNode.removeChild(spans[i]);
          }
        }
        return tmp.innerHTML.replace(/​/g, "");
      },
      // Hybrid → visual transition: remove every cursor-anchoring decoration
      // span from the live contenteditable in-place. Resets the tracking
      // state so a later switch back to hybrid starts clean.
      _stripDecorationSpansFromVisualEl: function() {
        if (!this._visualEl)
          return;
        this._syntaxMutating = true;
        try {
          var spans = this._visualEl.querySelectorAll(
            ".leaf-syntax-decoration"
          );
          for (var i = 0; i < spans.length; i++) {
            if (spans[i].parentNode) {
              spans[i].parentNode.removeChild(spans[i]);
            }
          }
          var walker = document.createTreeWalker(
            this._visualEl,
            NodeFilter.SHOW_TEXT,
            null
          );
          var text;
          while (text = walker.nextNode()) {
            if (text.nodeValue && text.nodeValue.indexOf("\u200B") !== -1) {
              text.nodeValue = text.nodeValue.replace(/​/g, "");
            }
          }
        } finally {
          this._syntaxMutating = false;
        }
        this._decoratedAncestors = [];
        this._decoratedHeading = null;
      },
      // Non-destructive read of the contenteditable's text with hybrid-only
      // decoration spans (and their cursor-anchoring ZWSPs) filtered out.
      // Used for footer word/char counting so the numbers reflect the
      // user-perceived content, independent of where the cursor sits.
      _readPlainTextWithoutDecorations: function() {
        if (!this._visualEl)
          return "";
        var clone2 = this._visualEl.cloneNode(true);
        var spans = clone2.querySelectorAll(".leaf-syntax-decoration");
        for (var i = 0; i < spans.length; i++) {
          if (spans[i].parentNode) {
            spans[i].parentNode.removeChild(spans[i]);
          }
        }
        var text = clone2.innerText || clone2.textContent || "";
        return text.replace(/​/g, "");
      },
      _getMarkdownTextarea: function() {
        return document.getElementById(
          this._editorId + "-markdown-textarea"
        );
      },
      // -- Toolbar --
      _setupToolbar: function() {
        var self2 = this;
        this.el.addEventListener("mousedown", function(e) {
          var target = e.target;
          if (self2._visualEl && self2._visualEl.contains(target))
            return;
          if (target && target.tagName) {
            var tag = target.tagName.toLowerCase();
            if (tag === "input" || tag === "textarea" || tag === "select") {
              return;
            }
          }
          e.preventDefault();
        });
        var buttons = this.el.querySelectorAll("[data-toolbar-action]");
        buttons.forEach(function(btn) {
          btn.addEventListener("mousedown", function(e) {
            e.preventDefault();
          });
          btn.addEventListener("click", function(e) {
            e.preventDefault();
            var action = btn.dataset.toolbarAction;
            self2._execToolbarAction(action);
          });
        });
        var hostButtons = this.el.querySelectorAll("[data-host-action]");
        hostButtons.forEach(function(btn) {
          btn.addEventListener("mousedown", function(e) {
            e.preventDefault();
          });
          btn.addEventListener("click", function(e) {
            e.preventDefault();
            var info = self2._getSelectionInfo() || { text: "", range: null };
            self2.pushEventTo(self2.el, "toolbar_action", {
              editor_id: self2._editorId,
              id: btn.dataset.hostAction,
              text: info.text,
              range: info.range
            });
          });
        });
        var dropdowns = [
          { trigger: "[data-heading-trigger]", menu: "[data-heading-menu]" },
          { trigger: "[data-inline-more-trigger]", menu: "[data-inline-more-menu]" },
          { trigger: "[data-table-trigger]", menu: "[data-table-menu]" },
          { trigger: "[data-insert-more-trigger]", menu: "[data-insert-more-menu]" }
        ];
        var compactMenu = self2.el.querySelector("[data-mode-switcher-compact]");
        var compactMenuSummary = compactMenu ? compactMenu.querySelector("summary") : null;
        var extraDetailsMenus = Array.prototype.slice.call(
          self2.el.querySelectorAll("[data-mobile-tools-menu], [data-mobile-options-menu]")
        );
        var closeImageDropdown = function() {
          if (self2._imageDropdownMenu) {
            self2._imageDropdownMenu.classList.add("hidden");
          }
          if (self2._imageDropdownBackdrop) {
            self2._imageDropdownBackdrop.remove();
            self2._imageDropdownBackdrop = null;
          }
        };
        var closeToolbarMenus = function(exceptMenu, keepImageDropdown) {
          dropdowns.forEach(function(other) {
            var otherMenu = self2.el.querySelector(other.menu);
            if (otherMenu && otherMenu !== exceptMenu) {
              otherMenu.classList.add("hidden");
            }
          });
          if (exceptMenu !== compactMenu && compactMenu) {
            compactMenu.removeAttribute("open");
          }
          extraDetailsMenus.forEach(function(details) {
            if (details !== exceptMenu)
              details.removeAttribute("open");
          });
          if (!keepImageDropdown)
            closeImageDropdown();
        };
        dropdowns.forEach(function(cfg) {
          var trigger = self2.el.querySelector(cfg.trigger);
          var menu = self2.el.querySelector(cfg.menu);
          if (!trigger || !menu)
            return;
          trigger.addEventListener("mousedown", function(e) {
            e.preventDefault();
          });
          menu.addEventListener("mousedown", function(e) {
            e.preventDefault();
          });
          trigger.addEventListener("click", function(e) {
            e.preventDefault();
            closeToolbarMenus(menu);
            menu.classList.toggle("hidden");
          });
          menu.querySelectorAll("[data-toolbar-action]").forEach(function(btn) {
            btn.addEventListener("click", function() {
              menu.classList.add("hidden");
            });
          });
          document.addEventListener("mousedown", function(e) {
            if (!trigger.contains(e.target) && !menu.contains(e.target)) {
              menu.classList.add("hidden");
            }
          });
        });
        if (compactMenu && compactMenuSummary) {
          compactMenuSummary.addEventListener("mousedown", function(e) {
            e.preventDefault();
          });
          compactMenu.addEventListener("mousedown", function(e) {
            e.preventDefault();
          });
          compactMenuSummary.addEventListener("click", function(e) {
            e.preventDefault();
            var willOpen = !compactMenu.hasAttribute("open");
            closeToolbarMenus(compactMenu);
            if (willOpen)
              compactMenu.setAttribute("open", "");
          });
          compactMenu.querySelectorAll("[data-toolbar-action], [data-mode-tab]").forEach(function(btn) {
            btn.addEventListener("click", function() {
              compactMenu.removeAttribute("open");
            });
          });
          document.addEventListener("mousedown", function(e) {
            if (!compactMenu.contains(e.target)) {
              compactMenu.removeAttribute("open");
            }
          });
        }
        extraDetailsMenus.forEach(function(details) {
          var summary = details.querySelector("summary");
          if (!summary)
            return;
          summary.addEventListener("mousedown", function(e) {
            e.preventDefault();
          });
          details.addEventListener("mousedown", function(e) {
            e.preventDefault();
          });
          summary.addEventListener("click", function(e) {
            e.preventDefault();
            var willOpen = !details.hasAttribute("open");
            closeToolbarMenus(details);
            if (willOpen)
              details.setAttribute("open", "");
          });
          details.querySelectorAll("[data-toolbar-action], [data-mode-tab]").forEach(function(btn) {
            btn.addEventListener("click", function() {
              details.removeAttribute("open");
            });
          });
          document.addEventListener("mousedown", function(e) {
            if (!details.contains(e.target)) {
              details.removeAttribute("open");
            }
          });
        });
        var imgTrigger = self2.el.querySelector("[data-image-dropdown-trigger]");
        var imgMenu = self2.el.querySelector("[data-image-dropdown-menu]");
        if (imgTrigger && imgMenu) {
          imgMenu.remove();
          imgMenu.style.position = "fixed";
          imgMenu.style.zIndex = "100000";
          document.body.appendChild(imgMenu);
          this._imageDropdownMenu = imgMenu;
          imgTrigger.addEventListener("mousedown", function(e) {
            e.preventDefault();
          });
          imgMenu.addEventListener("mousedown", function(e) {
            e.preventDefault();
          });
          imgTrigger.addEventListener("click", function(e) {
            e.preventDefault();
            closeToolbarMenus(null, true);
            if (imgMenu.classList.contains("hidden")) {
              var backdrop = document.createElement("div");
              backdrop.className = "leaf-image-url-backdrop";
              backdrop.addEventListener("click", function() {
                imgMenu.classList.add("hidden");
                backdrop.remove();
                self2._imageDropdownBackdrop = null;
              });
              document.body.appendChild(backdrop);
              self2._imageDropdownBackdrop = backdrop;
              var rect = imgTrigger.getBoundingClientRect();
              imgMenu.style.left = rect.left + "px";
              imgMenu.style.top = rect.bottom + 2 + "px";
              imgMenu.classList.remove("hidden");
            } else {
              imgMenu.classList.add("hidden");
              if (self2._imageDropdownBackdrop) {
                self2._imageDropdownBackdrop.remove();
                self2._imageDropdownBackdrop = null;
              }
            }
          });
          imgMenu.querySelectorAll("[data-toolbar-action]").forEach(function(btn) {
            btn.addEventListener("click", function() {
              imgMenu.classList.add("hidden");
              if (self2._imageDropdownBackdrop) {
                self2._imageDropdownBackdrop.remove();
                self2._imageDropdownBackdrop = null;
              }
            });
          });
        }
        if (this._visualEl) {
          this._visualEl.addEventListener("mousedown", function(e) {
            if (self2._mode !== "visual" && self2._mode !== "hybrid")
              return;
            var hr = self2._hrAtClick(e);
            if (hr) {
              e.preventDefault();
              self2._showHrSource(hr);
            }
          });
        }
        document.addEventListener("selectionchange", function() {
          if ((self2._mode === "visual" || self2._mode === "hybrid") && self2._visualEl) {
            var sel = window.getSelection();
            if (sel.rangeCount > 0 && self2._visualEl.contains(sel.anchorNode)) {
              self2._updateToolbarState();
              self2._updateSourceBlock();
            } else if (document.activeElement !== self2._visualEl) {
              self2._exitAllSourceMode();
            }
          } else {
            self2._exitAllSourceMode();
          }
        });
      },
      _updateSyntaxDecorations: function() {
        if (this._mode !== "hybrid") {
          this._clearSyntaxDecoration();
          return;
        }
        if (this._syntaxMutating)
          return;
        var sel = window.getSelection();
        if (!sel.rangeCount) {
          this._clearSyntaxDecoration();
          return;
        }
        var newChain = this._findFormattingChainForCursor(sel);
        var oldChain = this._decoratedAncestors || [];
        if (this._chainsEqual(oldChain, newChain))
          return;
        var savedRange = sel.getRangeAt(0).cloneRange();
        this._syntaxMutating = true;
        try {
          for (var i = 0; i < oldChain.length; i++) {
            if (newChain.indexOf(oldChain[i]) === -1) {
              this._removeDelimitersFrom(oldChain[i]);
            }
          }
          for (var j = 0; j < newChain.length; j++) {
            if (oldChain.indexOf(newChain[j]) === -1) {
              this._addDelimitersTo(newChain[j]);
            }
          }
          this._decoratedAncestors = newChain;
          var newRange = null;
          if (newChain.length > 0) {
            var innermost = newChain[0];
            var delim = this._delimiterFor(innermost);
            if (delim && !innermost.contains(savedRange.startContainer) && innermost !== savedRange.startContainer) {
              var ancRange = document.createRange();
              ancRange.selectNode(innermost);
              var fromLeft = savedRange.compareBoundaryPoints(
                Range.START_TO_START,
                ancRange
              ) <= 0;
              newRange = document.createRange();
              if (fromLeft) {
                newRange.setStart(innermost, delim.length);
              } else {
                newRange.setStart(
                  innermost,
                  innermost.childNodes.length - delim.length
                );
              }
              newRange.collapse(true);
            }
          }
          try {
            sel.removeAllRanges();
            sel.addRange(newRange || savedRange);
          } catch (_e) {
          }
        } finally {
          this._syntaxMutating = false;
        }
      },
      _findFormattingChainForCursor: function(sel) {
        if (!sel || !sel.rangeCount)
          return [];
        var range2 = sel.getRangeAt(0);
        var walkUp = this._collectFormattingAncestors(sel.anchorNode);
        var outermost = walkUp.length > 0 ? walkUp[walkUp.length - 1] : null;
        if (!outermost) {
          var candidate = this._findBoundaryFormattingCandidate(range2);
          if (candidate) {
            var ups = this._collectFormattingAncestors(candidate);
            if (ups.length > 0)
              outermost = ups[ups.length - 1];
          }
        }
        if (!outermost)
          return [];
        return this._descendChainAll(outermost);
      },
      _findBoundaryFormattingCandidate: function(range2) {
        var node = range2.endContainer;
        var offset = range2.endOffset;
        var candidate = null;
        var fromLeft = true;
        if (node.nodeType === Node.TEXT_NODE) {
          if (offset === node.textContent.length && node.nextSibling) {
            candidate = node.nextSibling;
            fromLeft = true;
          } else if (offset === 0 && node.previousSibling) {
            candidate = node.previousSibling;
            fromLeft = false;
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.childNodes[offset]) {
            candidate = node.childNodes[offset];
            fromLeft = true;
          } else if (offset > 0 && node.childNodes[offset - 1]) {
            candidate = node.childNodes[offset - 1];
            fromLeft = false;
          }
        }
        while (candidate && this._isDecorationSpan(candidate)) {
          candidate = fromLeft ? candidate.nextSibling : candidate.previousSibling;
        }
        if (candidate && candidate.nodeType === Node.ELEMENT_NODE && this._isFormattingElement(candidate)) {
          return candidate;
        }
        return null;
      },
      _descendChainAll: function(root) {
        var result = [];
        var self2 = this;
        function walk(node) {
          var children = node.children;
          for (var i = 0; i < children.length; i++) {
            var c = children[i];
            if (c.classList && c.classList.contains("leaf-syntax-decoration")) {
              continue;
            }
            walk(c);
          }
          if (self2._isFormattingElement(node)) {
            result.push(node);
          }
        }
        walk(root);
        return result;
      },
      _collectFormattingAncestors: function(node) {
        var chain = [];
        var n = node;
        while (n && n !== this._visualEl) {
          if (this._isFormattingElement(n)) {
            chain.push(n);
          }
          n = n.parentNode;
        }
        return chain;
      },
      _chainsEqual: function(a, b) {
        if (a === b)
          return true;
        if (!a || !b || a.length !== b.length)
          return false;
        for (var i = 0; i < a.length; i++) {
          if (a[i] !== b[i])
            return false;
        }
        return true;
      },
      _isFormattingElement: function(node) {
        if (!node || node.nodeType !== Node.ELEMENT_NODE)
          return false;
        var tag = node.tagName ? node.tagName.toLowerCase() : "";
        var tags = [
          "b",
          "strong",
          "i",
          "em",
          "s",
          "del",
          "strike",
          "code",
          "u",
          "sub",
          "sup",
          "mark",
          "a"
        ];
        if (tags.indexOf(tag) !== -1)
          return true;
        if (node.classList && node.classList.contains("leaf-spoiler"))
          return true;
        return false;
      },
      _formattingSelector: "b, strong, i, em, s, del, strike, code, u, sub, sup, mark, a, .leaf-spoiler",
      _snapshotFormattingElements: function() {
        if (!this._visualEl)
          return null;
        var nodes = this._visualEl.querySelectorAll(this._formattingSelector);
        var set = /* @__PURE__ */ new Set();
        for (var i = 0; i < nodes.length; i++)
          set.add(nodes[i]);
        return set;
      },
      // Re-run decoration on the next tick. Chrome leaves the selection in a
      // transient state immediately after execCommand, and any selectionchange
      // events queued by the DOM mutation fire async — running on the next
      // tick lets all of that settle before we look up the formatting ancestor.
      // `preSnapshot` is a Set of formatting elements present before the
      // action; we compare against the post-action set to find the newly
      // inserted wrapper, which is the most reliable signal — selection state
      // after execCommand can't always be trusted across browsers.
      _deferredSyntaxRefresh: function(preSnapshot) {
        if (this._mode !== "hybrid")
          return;
        var self2 = this;
        setTimeout(function() {
          self2._clearSyntaxDecoration();
          var sel = window.getSelection();
          var chain = sel.rangeCount > 0 ? self2._findFormattingChainForCursor(sel) : [];
          if (chain.length === 0 && preSnapshot) {
            var newFormatting = self2._findNewFormatting(preSnapshot);
            if (newFormatting) {
              chain = self2._collectFormattingAncestors(newFormatting);
            }
          }
          if (chain.length === 0)
            return;
          self2._syntaxMutating = true;
          try {
            for (var i = 0; i < chain.length; i++) {
              self2._addDelimitersTo(chain[i]);
            }
            self2._decoratedAncestors = chain;
          } finally {
            self2._syntaxMutating = false;
          }
        }, 0);
      },
      _refreshHybridSourceBlockAfterToolbarAction: function() {
        if (this._mode !== "hybrid")
          return false;
        if (!this._sourceBlock || !this._sourceBlock.isConnected)
          return false;
        var sel = window.getSelection();
        if (!sel.rangeCount)
          return false;
        var range2 = sel.getRangeAt(0);
        if (!this._sourceBlock.contains(range2.startContainer) && !this._sourceBlock.contains(range2.endContainer)) {
          return false;
        }
        this._clearSyntaxDecoration();
        this._lastSourceStateKey = null;
        this._refreshSourceBlock();
        return true;
      },
      _findNewFormatting: function(preSnapshot) {
        if (!this._visualEl)
          return null;
        if (preSnapshot) {
          var post = this._visualEl.querySelectorAll(this._formattingSelector);
          for (var i = 0; i < post.length; i++) {
            if (!preSnapshot.has(post[i]))
              return post[i];
          }
        }
        var sel = window.getSelection();
        if (sel.rangeCount > 0) {
          var byCursor = this._activeFormattingForCursor(sel);
          if (byCursor)
            return byCursor;
        }
        return null;
      },
      // After a contenteditable input event in hybrid mode, scan the text node
      // around the cursor for a completed markdown-delimiter pattern that ends
      // exactly at the cursor (e.g. the user just typed the closing `**` of
      // `**hello**`). If one matches, splice the text node and replace the
      // matched run with the corresponding wrapper element, then decorate
      // it inline so the existing chain logic takes over.
      _maybeAutoFormat: function() {
        var sel = window.getSelection();
        if (!sel.rangeCount)
          return;
        var range2 = sel.getRangeAt(0);
        if (!range2.collapsed)
          return;
        var node = range2.startContainer;
        if (node.nodeType !== Node.TEXT_NODE)
          return;
        var parent = node.parentNode;
        if (!parent)
          return;
        if (this._decoratedAncestors && this._decoratedAncestors.length > 0) {
          for (var di = 0; di < this._decoratedAncestors.length; di++) {
            if (this._decoratedAncestors[di].contains(node))
              return;
          }
        }
        var offset = range2.startOffset;
        var before = "";
        var runNodes = [];
        var cursorGlobalOffset = -1;
        var c = parent.firstChild;
        while (c) {
          if (c === node) {
            cursorGlobalOffset = before.length + offset;
            before += node.textContent.slice(0, offset);
            runNodes.push(node);
            break;
          }
          if (c.nodeType === Node.TEXT_NODE) {
            before += c.textContent;
            runNodes.push(c);
          } else {
            before = "";
            runNodes = [];
          }
          c = c.nextSibling;
        }
        if (cursorGlobalOffset < 0)
          return;
        var patterns = this._autoFormatPatterns;
        for (var i = 0; i < patterns.length; i++) {
          var m = before.match(patterns[i].regexAt);
          if (m) {
            var beforeMatch = before.slice(0, before.length - m[0].length);
            if (this._hasUnclosedOuterDelim(beforeMatch, patterns[i])) {
              return;
            }
            this._applyAutoFormat(
              runNodes,
              node,
              offset,
              cursorGlobalOffset,
              m,
              patterns[i]
            );
            return;
          }
        }
      },
      // Order: 3-char first (`***...***`), then 2-char delimiters, then
      // 1-char. Italic uses lookbehind/lookahead to avoid matching either
      // half of `**bold**`. `[^DELIM\n]+?` keeps each pattern self-contained.
      // `regexAt` is anchored at end-of-string for the cursor-end check;
      // `regexAny` is the same pattern without `$` so the recursive inner
      // builder can find it anywhere in the matched content.
      _autoFormatPatterns: [
        {
          regexAt: /\*\*\*([^*\n]+?)\*\*\*$/,
          regexAny: /\*\*\*([^*\n]+?)\*\*\*/,
          type: "boldItalic"
        },
        {
          // Lookbehind/lookahead so `**...**` doesn't match the inner part
          // of `***...***` (triple → bold-italic) before the user finishes
          // the closing pair. `(?<!\*)` keeps the opening `**` from being
          // adjacent to another `*`; `(?!\*)` keeps the closing `**` from
          // being followed by one.
          regexAt: new RegExp("(?<!\\*)\\*\\*([^*\\n]+?)\\*\\*(?!\\*)$"),
          regexAny: new RegExp("(?<!\\*)\\*\\*([^*\\n]+?)\\*\\*(?!\\*)"),
          tag: "strong",
          delim: "**"
        },
        {
          regexAt: /~~([^~\n]+?)~~$/,
          regexAny: /~~([^~\n]+?)~~/,
          tag: "del",
          delim: "~~"
        },
        {
          regexAt: /\|\|([^|\n]+?)\|\|$/,
          regexAny: /\|\|([^|\n]+?)\|\|/,
          tag: "span",
          delim: "||",
          isSpoiler: true
        },
        {
          regexAt: new RegExp("(?<!\\*)\\*([^*\\n]+?)\\*$"),
          regexAny: new RegExp("(?<!\\*)\\*([^*\\n]+?)\\*(?!\\*)"),
          tag: "em",
          delim: "*"
        },
        {
          regexAt: /`([^`\n]+?)`$/,
          regexAny: /`([^`\n]+?)`/,
          tag: "code",
          delim: "`"
        },
        {
          // Link: `[text](url)`. Asymmetric — opening marker is just `[`
          // (1 char), closing marker is `](url)` (variable length).
          // `delim` is left unset so the symmetric-delim code paths skip
          // this pattern; the dedicated link branches in
          // `_scanInlineMatches`, `_buildSourceFragment`, and
          // `_buildFormattedFragment` populate `<a href="...">` instead.
          regexAt: /\[([^\]\n]+?)\]\(([^)\s\n]+)\)$/,
          regexAny: /\[([^\]\n]+?)\]\(([^)\s\n]+)\)/,
          type: "link"
        }
      ],
      _hasUnclosedOuterDelim: function(textBeforeMatch, currentPattern) {
        var checks = [
          { delim: "**", regex: /\*\*/g },
          { delim: "~~", regex: /~~/g },
          { delim: "||", regex: /\|\|/g },
          { delim: "`", regex: /`/g }
        ];
        for (var i = 0; i < checks.length; i++) {
          if (checks[i].delim === currentPattern.delim)
            continue;
          var matches = textBeforeMatch.match(checks[i].regex);
          if (matches && matches.length % 2 === 1)
            return true;
        }
        return false;
      },
      _createAutoFormatWrapper: function(pattern) {
        if (pattern.type === "boldItalic") {
          var emEl = document.createElement("em");
          var strongEl = document.createElement("strong");
          strongEl.appendChild(emEl);
          return strongEl;
        }
        if (pattern.isSpoiler) {
          var span = document.createElement("span");
          span.classList.add("leaf-spoiler");
          return span;
        }
        return document.createElement(pattern.tag);
      },
      _buildFormattedFragment: function(text) {
        if (!text)
          return [];
        var earliest = null;
        var earliestPattern = null;
        var patterns = this._autoFormatPatterns;
        for (var i = 0; i < patterns.length; i++) {
          var re = new RegExp(
            patterns[i].regexAny.source,
            patterns[i].regexAny.flags
          );
          var m = re.exec(text);
          if (m && (earliest === null || m.index < earliest.index)) {
            earliest = m;
            earliestPattern = patterns[i];
          }
        }
        if (!earliest) {
          return [document.createTextNode(text)];
        }
        var beforeText = text.slice(0, earliest.index);
        var afterText = text.slice(earliest.index + earliest[0].length);
        var innerText = earliest[1];
        var wrapper;
        if (earliestPattern.type === "link") {
          wrapper = document.createElement("a");
          wrapper.setAttribute("href", earliest[2] || "");
        } else {
          wrapper = this._createAutoFormatWrapper(earliestPattern);
        }
        var innerHost = earliestPattern.type === "boldItalic" ? wrapper.firstChild : wrapper;
        var innerNodes = this._buildFormattedFragment(innerText);
        for (var j = 0; j < innerNodes.length; j++) {
          innerHost.appendChild(innerNodes[j]);
        }
        var result = [];
        if (beforeText) {
          result = result.concat(this._buildFormattedFragment(beforeText));
        }
        result.push(wrapper);
        if (afterText) {
          result = result.concat(this._buildFormattedFragment(afterText));
        }
        return result;
      },
      // Convert a plain `<p>` to the matching `<h1>`–`<h6>` when its text
      // starts with 1–6 `#` chars followed by a space. The `# ` prefix is
      // consumed so the heading begins empty (or with whatever the user
      // typed after the space, if it was pasted as a chunk).
      _maybeAutoFormatHeading: function() {
        var sel = window.getSelection();
        if (!sel.rangeCount)
          return;
        var range2 = sel.getRangeAt(0);
        if (!range2.collapsed)
          return;
        var block = this._getCurrentBlock();
        if (!block || !block.tagName)
          return;
        if (block.tagName.toLowerCase() !== "p")
          return;
        var text = block.textContent;
        var m = text.match(/^(#{1,6})[  ]/);
        if (!m)
          return;
        var newTag = "h" + m[1].length;
        var prefixLen = m[0].length;
        this._syntaxMutating = true;
        try {
          var heading = document.createElement(newTag);
          while (block.firstChild) {
            heading.appendChild(block.firstChild);
          }
          block.parentNode.replaceChild(heading, block);
          this._trimLeadingTextChars(heading, prefixLen);
          if (!heading.firstChild || heading.childNodes.length === 1 && heading.firstChild.nodeType === Node.TEXT_NODE && heading.firstChild.textContent === "") {
            heading.innerHTML = "<br>";
          }
          var caret = document.createRange();
          var firstText = this._firstTextDescendant(heading);
          if (firstText) {
            caret.setStart(firstText, 0);
          } else {
            caret.setStart(heading, 0);
          }
          caret.collapse(true);
          try {
            sel.removeAllRanges();
            sel.addRange(caret);
          } catch (_e) {
          }
        } finally {
          this._syntaxMutating = false;
        }
        this._updateHeadingDecoration();
      },
      // Toolbar HR insert. We build the DOM by hand instead of using
      // `document.execCommand("insertHorizontalRule")` because the latter
      // produces inconsistent structure across browsers (HR sometimes left
      // wrapped inside the original `<p>`, no trailing paragraph created,
      // stray `<br>` siblings) which then fails to round-trip through
      // `htmlToMarkdown` cleanly. This is the same shape `_maybeAutoFormatHr`
      // builds in hybrid mode, which we know serializes correctly.
      _insertHorizontalRule: function() {
        if (!this._visualEl)
          return;
        var sel = window.getSelection();
        if (!sel.rangeCount)
          return;
        var block = this._getCurrentBlock();
        if (!block || !block.parentNode) {
          block = this._visualEl.lastElementChild;
          if (!block) {
            block = document.createElement("p");
            block.innerHTML = "<br>";
            this._visualEl.appendChild(block);
          }
        }
        var parent = block.parentNode;
        var hr = document.createElement("hr");
        var trailing = document.createElement("p");
        trailing.innerHTML = "<br>";
        parent.insertBefore(hr, block.nextSibling);
        parent.insertBefore(trailing, hr.nextSibling);
        var caret = document.createRange();
        caret.setStart(trailing, 0);
        caret.collapse(true);
        try {
          sel.removeAllRanges();
          sel.addRange(caret);
        } catch (_e) {
        }
      },
      // `---` (3+ dashes) on its own line auto-formats to a real `<hr>`,
      // mirroring the toolbar's "Insert horizontal rule" button. A fresh
      // `<p>` is created right after the rule and the cursor is moved
      // there so the user can keep typing.
      _maybeAutoFormatHr: function() {
        if (this._syntaxMutating)
          return;
        var sel = window.getSelection();
        if (!sel.rangeCount)
          return;
        var range2 = sel.getRangeAt(0);
        if (!range2.collapsed)
          return;
        var block = this._getCurrentBlock();
        if (!block || !block.tagName)
          return;
        if (block.tagName.toLowerCase() !== "p")
          return;
        if (block.hasAttribute("data-leaf-hr-source"))
          return;
        var text = block.textContent.replace(/ /g, "");
        if (!/^-{3,}$/.test(text))
          return;
        var parent = block.parentNode;
        if (!parent)
          return;
        this._syntaxMutating = true;
        try {
          var hr = document.createElement("hr");
          var nextP = document.createElement("p");
          nextP.innerHTML = "<br>";
          parent.insertBefore(hr, block);
          parent.insertBefore(nextP, block);
          parent.removeChild(block);
          var caret = document.createRange();
          caret.setStart(nextP, 0);
          caret.collapse(true);
          try {
            sel.removeAllRanges();
            sel.addRange(caret);
          } catch (_e) {
          }
        } finally {
          this._syntaxMutating = false;
        }
      },
      // Typing `- ` / `* ` / `+ ` at the start of an empty (or just-started)
      // paragraph swaps the `<p>` for a `<ul><li>…</li></ul>`; `1. ` / `5. ` /
      // etc. swap to `<ol><li>…</li></ol>`. Mirrors the heading auto-format
      // path: trigger on the space, strip the marker prefix, drop the cursor
      // at the start of the new `<li>`. Consecutive list paragraphs get
      // merged into a single list rather than producing one list per item.
      _maybeAutoFormatList: function() {
        if (this._syntaxMutating)
          return;
        var sel = window.getSelection();
        if (!sel.rangeCount)
          return;
        var range2 = sel.getRangeAt(0);
        if (!range2.collapsed)
          return;
        var block = this._getCurrentBlock();
        if (!block || !block.tagName)
          return;
        if (block.tagName.toLowerCase() !== "p")
          return;
        if (block.hasAttribute("data-leaf-hr-source"))
          return;
        var text = block.textContent.replace(/\u00a0/g, " ");
        var um = text.match(/^([-*+]) /);
        var om = !um && text.match(/^(\d+)\. /);
        if (!um && !om)
          return;
        var listTag = um ? "ul" : "ol";
        var prefixLen = um ? 2 : om[1].length + 2;
        var startNum = om ? parseInt(om[1], 10) : 1;
        var parent = block.parentNode;
        if (!parent)
          return;
        this._syntaxMutating = true;
        try {
          var li = document.createElement("li");
          while (block.firstChild)
            li.appendChild(block.firstChild);
          this._trimLeadingTextChars(li, prefixLen);
          var afFirst = this._firstTextDescendant(li);
          if (afFirst) {
            var afTask = afFirst.textContent.replace(/ /g, " ").match(/^\[([ xX]?)\] /);
            if (afTask) {
              li.classList.add("leaf-task");
              li.setAttribute(
                "data-checked",
                afTask[1] === "x" || afTask[1] === "X" ? "true" : "false"
              );
              afFirst.textContent = afFirst.textContent.slice(afTask[0].length);
              var afBox = document.createElement("span");
              afBox.className = "leaf-task-box";
              afBox.setAttribute("contenteditable", "false");
              li.insertBefore(afBox, li.firstChild);
            }
          }
          if (!li.firstChild || li.childNodes.length === 1 && li.firstChild.nodeType === Node.TEXT_NODE && li.firstChild.textContent === "") {
            li.innerHTML = "<br>";
          }
          var prev = block.previousElementSibling;
          var list;
          var appending = false;
          if (prev && prev.tagName && prev.tagName.toLowerCase() === listTag) {
            list = prev;
            appending = true;
          } else {
            list = document.createElement(listTag);
            if (om && startNum !== 1) {
              list.setAttribute("start", String(startNum));
            }
          }
          list.appendChild(li);
          if (!appending)
            parent.insertBefore(list, block);
          parent.removeChild(block);
          if (this._sourceBlock === block) {
            this._sourceBlock = null;
            this._lastSourceStateKey = null;
            this._activeMatchKey = null;
          }
          var caret = document.createRange();
          var firstText = this._firstTextDescendant(li);
          if (firstText) {
            caret.setStart(firstText, 0);
          } else {
            caret.setStart(li, 0);
          }
          caret.collapse(true);
          try {
            sel.removeAllRanges();
            sel.addRange(caret);
          } catch (_e) {
          }
        } finally {
          this._syntaxMutating = false;
        }
        if (this._mode === "hybrid" && li.isConnected) {
          var enteredLi = this._enterSourceMode(li);
          if (enteredLi) {
            this._sourceBlock = enteredLi;
            try {
              if (this._visualEl && document.activeElement !== this._visualEl) {
                this._visualEl.focus();
              }
              var afEndRange = document.createRange();
              afEndRange.selectNodeContents(enteredLi);
              afEndRange.collapse(false);
              var afSel = window.getSelection();
              afSel.removeAllRanges();
              afSel.addRange(afEndRange);
            } catch (_afErr) {
            }
          }
        }
      },
      // Typing `> ` at the start of a paragraph swaps the `<p>` for a
      // `<blockquote><p>…</p></blockquote>`. Mirrors `_maybeAutoFormatList`
      // — strip the marker prefix, drop the cursor at the start of the
      // new inner `<p>`. Consecutive blockquote paragraphs merge into a
      // single `<blockquote>` instead of producing one wrapper per line.
      _maybeAutoFormatBlockquote: function() {
        if (this._syntaxMutating)
          return;
        var sel = window.getSelection();
        if (!sel.rangeCount)
          return;
        var range2 = sel.getRangeAt(0);
        if (!range2.collapsed)
          return;
        var block = this._getCurrentBlock();
        if (!block || !block.tagName)
          return;
        if (block.tagName.toLowerCase() !== "p")
          return;
        if (block.hasAttribute("data-leaf-hr-source"))
          return;
        if (block.parentNode && block.parentNode.tagName && block.parentNode.tagName.toLowerCase() === "blockquote") {
          return;
        }
        var text = block.textContent.replace(/\u00a0/g, " ");
        var bm = text.match(/^> /);
        if (!bm)
          return;
        var parent = block.parentNode;
        if (!parent)
          return;
        this._syntaxMutating = true;
        try {
          var inner = document.createElement("p");
          while (block.firstChild)
            inner.appendChild(block.firstChild);
          this._trimLeadingTextChars(inner, 2);
          if (!inner.firstChild || inner.childNodes.length === 1 && inner.firstChild.nodeType === Node.TEXT_NODE && inner.firstChild.textContent === "") {
            inner.innerHTML = "<br>";
          }
          var quote = document.createElement("blockquote");
          quote.appendChild(inner);
          parent.insertBefore(quote, block);
          parent.removeChild(block);
          if (this._sourceBlock === block) {
            this._sourceBlock = null;
            this._lastSourceStateKey = null;
            this._activeMatchKey = null;
          }
          var caret = document.createRange();
          var firstText = this._firstTextDescendant(inner);
          if (firstText) {
            caret.setStart(firstText, 0);
          } else {
            caret.setStart(inner, 0);
          }
          caret.collapse(true);
          try {
            sel.removeAllRanges();
            sel.addRange(caret);
          } catch (_e) {
          }
        } finally {
          this._syntaxMutating = false;
        }
      },
      // Detect an Arrow Down/Up keystroke about to cross an `<hr>`
      // boundary. If the next/previous block sibling is an `<hr>`, swap
      // it to source-edit mode and place the cursor inside; the
      // selectionchange listener swaps it back when the cursor leaves.
      _maybeArrowIntoHr: function(key) {
        var sel = window.getSelection();
        if (!sel.rangeCount)
          return false;
        var range2 = sel.getRangeAt(0);
        if (!range2.collapsed)
          return false;
        var block = this._getCurrentBlock();
        if (!block || !block.parentNode)
          return false;
        if (key === "ArrowDown") {
          var next = block.nextElementSibling;
          if (!next || !next.tagName || next.tagName.toLowerCase() !== "hr") {
            return false;
          }
          if (!this._isCursorOnLastLineOfBlock(range2, block))
            return false;
          this._showHrSource(next);
          return true;
        }
        if (key === "ArrowUp") {
          var prev = block.previousElementSibling;
          if (!prev || !prev.tagName || prev.tagName.toLowerCase() !== "hr") {
            return false;
          }
          if (!this._isCursorOnFirstLineOfBlock(range2, block))
            return false;
          this._showHrSource(prev);
          return true;
        }
        return false;
      },
      // Rect-based "cursor is on the first/last visual line of this block"
      // checks. We can't use `Range.compareBoundaryPoints` against a
      // `selectNodeContents`-collapsed range because (block, 0) and (firstChild,
      // 0) aren't considered equal even though they're at the same visual spot,
      // and trailing `<br>` fillers throw the end-side comparison off too.
      // Comparing client rects sidesteps both problems and naturally handles
      // multi-line wrapping.
      _isCursorOnFirstLineOfBlock: function(range2, block) {
        if (this._cursorTextOffsetInBlock(range2, block) === 0)
          return true;
        var lineHeight = parseFloat(getComputedStyle(block).lineHeight) || 20;
        if (block.getBoundingClientRect().height < lineHeight * 1.6) {
          return true;
        }
        var caretRect = this._caretRect(range2);
        if (!caretRect)
          return false;
        var blockRect = block.getBoundingClientRect();
        return caretRect.top - blockRect.top < lineHeight * 0.6;
      },
      _isCursorOnLastLineOfBlock: function(range2, block) {
        var totalText = (block.textContent || "").length;
        if (this._cursorTextOffsetInBlock(range2, block) === totalText) {
          return true;
        }
        var lineHeight = parseFloat(getComputedStyle(block).lineHeight) || 20;
        if (block.getBoundingClientRect().height < lineHeight * 1.6) {
          return true;
        }
        var caretRect = this._caretRect(range2);
        if (!caretRect)
          return false;
        var blockRect = block.getBoundingClientRect();
        return blockRect.bottom - caretRect.bottom < lineHeight * 0.6;
      },
      // Count text characters between the start of `block` and the
      // collapsed `range`'s start position. Element-offset cursors map
      // to the position right before the indexed child. Returns -1 if
      // the range start isn't inside `block`.
      _cursorTextOffsetInBlock: function(range2, block) {
        if (!block.contains(range2.startContainer) && range2.startContainer !== block) {
          return -1;
        }
        var offset = 0;
        var target = range2.startContainer;
        var targetOffset = range2.startOffset;
        var found = false;
        function walk(node) {
          if (found)
            return;
          if (node.nodeType === Node.TEXT_NODE) {
            if (node === target) {
              offset += targetOffset;
              found = true;
            } else {
              offset += node.textContent.length;
            }
            return;
          }
          if (node.nodeType !== Node.ELEMENT_NODE)
            return;
          var children = node.childNodes;
          for (var i = 0; i < children.length; i++) {
            if (node === target && targetOffset === i) {
              found = true;
              return;
            }
            walk(children[i]);
            if (found)
              return;
          }
          if (node === target && targetOffset === children.length) {
            found = true;
          }
        }
        walk(block);
        return found ? offset : -1;
      },
      // A collapsed range often returns a zero-sized rect — especially in
      // `<p><br></p>` or right next to a `<br>`. Fall back to inserting a
      // temporary zero-width-space span, measuring it, and removing it. The
      // `_syntaxMutating` flag is asserted around the mutation so the input
      // pipeline can't re-enter while we're probing.
      _caretRect: function(range2) {
        var rect = range2.getBoundingClientRect();
        if (rect && (rect.top || rect.bottom || rect.left || rect.right)) {
          return rect;
        }
        var marker = document.createElement("span");
        marker.appendChild(document.createTextNode("\u200B"));
        var probe = range2.cloneRange();
        var prevMutating = this._syntaxMutating;
        this._syntaxMutating = true;
        try {
          probe.insertNode(marker);
          rect = marker.getBoundingClientRect();
        } catch (_e) {
          rect = null;
        } finally {
          if (marker.parentNode)
            marker.parentNode.removeChild(marker);
          var sel = window.getSelection();
          try {
            sel.removeAllRanges();
            sel.addRange(range2);
          } catch (_e) {
          }
          this._syntaxMutating = prevMutating;
        }
        return rect;
      },
      // Mobile soft-keyboard helper: scroll the editor (and the page,
      // if needed) so the caret sits above the on-screen keyboard. Uses
      // the cheap `range.getBoundingClientRect()` first; falls back to
      // the temp-marker `_caretRect` if the range itself reports zero.
      // Called from the `visualViewport.resize` handler in `mounted()`.
      _scrollCaretIntoView: function() {
        if (!this._visualEl)
          return;
        var sel = window.getSelection();
        if (!sel || !sel.rangeCount)
          return;
        var range2 = sel.getRangeAt(0);
        if (!this._visualEl.contains(range2.startContainer))
          return;
        var rect = this._caretRect(range2);
        if (!rect)
          return;
        var vv = window.visualViewport;
        var viewBottom = vv ? vv.height + vv.offsetTop : window.innerHeight;
        var viewTop = vv ? vv.offsetTop : 0;
        var margin = 32;
        if (rect.bottom > viewBottom - margin) {
          var delta = rect.bottom - (viewBottom - margin);
          this._visualEl.scrollBy({ top: delta, behavior: "smooth" });
          window.scrollBy({ top: delta, behavior: "smooth" });
        } else if (rect.top < viewTop + margin) {
          var deltaUp = viewTop + margin - rect.top;
          this._visualEl.scrollBy({ top: -deltaUp, behavior: "smooth" });
          window.scrollBy({ top: -deltaUp, behavior: "smooth" });
        }
      },
      // Returns the `<hr>` at the mousedown coordinates if any. Checks
      // `e.target` first, then falls back to the topmost few elements via
      // `elementsFromPoint` so a near-miss on the thin rule line still
      // counts. Without this, a tiny HR is essentially unclickable.
      _hrAtClick: function(e) {
        if (e.target && e.target.tagName && e.target.tagName.toLowerCase() === "hr") {
          return e.target;
        }
        if (typeof document.elementsFromPoint === "function" && typeof e.clientX === "number" && typeof e.clientY === "number") {
          var stack = document.elementsFromPoint(e.clientX, e.clientY);
          for (var i = 0; i < stack.length && i < 6; i++) {
            if (stack[i].tagName && stack[i].tagName.toLowerCase() === "hr") {
              return stack[i];
            }
          }
        }
        return null;
      },
      // Replace a rendered `<hr>` with a `<p data-leaf-hr-source>---</p>`
      // and put the cursor inside, so the user can edit (or delete) the
      // rule. The selectionchange listener calls `_maybeRestoreHrFromSource`
      // when the cursor leaves to swap the placeholder back to an `<hr>`.
      _showHrSource: function(hr) {
        if (this._syntaxMutating)
          return;
        this._syntaxMutating = true;
        try {
          var p = document.createElement("p");
          p.setAttribute("data-leaf-hr-source", "");
          p.textContent = "---";
          hr.parentNode.replaceChild(p, hr);
          var sel = window.getSelection();
          var caret = document.createRange();
          if (p.firstChild && p.firstChild.nodeType === Node.TEXT_NODE) {
            caret.setStart(p.firstChild, p.firstChild.textContent.length);
          } else {
            caret.setStart(p, 0);
          }
          caret.collapse(true);
          try {
            sel.removeAllRanges();
            sel.addRange(caret);
          } catch (_e) {
          }
        } finally {
          this._syntaxMutating = false;
        }
      },
      _maybeRestoreHrFromSource: function() {
        if (!this._visualEl)
          return;
        var sources = this._visualEl.querySelectorAll(
          "p[data-leaf-hr-source]"
        );
        if (!sources.length)
          return;
        var sel = window.getSelection();
        var anchor = sel.rangeCount > 0 ? sel.anchorNode : null;
        for (var i = 0; i < sources.length; i++) {
          var p = sources[i];
          if (anchor && p.contains(anchor))
            continue;
          var text = p.textContent.replace(/ /g, "");
          this._syntaxMutating = true;
          try {
            if (/^-{3,}$/.test(text)) {
              var hr = document.createElement("hr");
              p.parentNode.replaceChild(hr, p);
            } else {
              p.removeAttribute("data-leaf-hr-source");
            }
          } finally {
            this._syntaxMutating = false;
          }
        }
      },
      _trimLeadingTextChars: function(root, count) {
        while (count > 0) {
          var first = this._firstTextDescendant(root);
          if (!first)
            return;
          var len = first.textContent.length;
          if (len === 0) {
            if (first.parentNode)
              first.parentNode.removeChild(first);
            continue;
          }
          if (len <= count) {
            count -= len;
            if (first.parentNode)
              first.parentNode.removeChild(first);
          } else {
            first.textContent = first.textContent.slice(count);
            return;
          }
        }
      },
      // Remove whitespace-only text nodes that sit between the block
      // children of structural containers (the editor root, `<ul>`/`<ol>`,
      // table groups, blockquotes). Server-rendered markdown→HTML is
      // pretty-printed, so these stray nodes appear between every `<li>`,
      // `<tr>`, etc. In a contenteditable they're a cursor trap: a click
      // near a list item can land the caret in a text node that's a direct
      // child of the `<ul>`, so `_getCurrentBlock` resolves to the `<ul>`
      // (not an `<li>`) and Enter/Backspace can't act on the item — the
      // bullet looks permanently stuck. These nodes carry no meaning inside
      // these containers (only element children are valid there), so
      // dropping them is safe and leaves the markdown unchanged.
      _stripInterBlockWhitespace: function(root) {
        if (!root)
          return;
        var containers = [root];
        var nested = root.querySelectorAll(
          "ul, ol, menu, table, thead, tbody, tfoot, tr, blockquote"
        );
        for (var i = 0; i < nested.length; i++)
          containers.push(nested[i]);
        for (var c = 0; c < containers.length; c++) {
          var parent = containers[c];
          var child = parent.firstChild;
          while (child) {
            var next = child.nextSibling;
            if (child.nodeType === Node.TEXT_NODE && !/\S/.test(child.textContent)) {
              parent.removeChild(child);
            }
            child = next;
          }
        }
      },
      // Unwrap "loose" list items. CommonMark renders a list whose items
      // are separated by blank lines as `<li><p>text</p></li>` instead of
      // `<li>text</li>`. The hybrid editor expects inline content directly
      // in the `<li>`: with a `<p>` inside, a click lands the caret in that
      // `<p>`, so `_getCurrentBlock` returns the `<p>` (not the `<li>`) and
      // Enter inserts a nested paragraph inside the item instead of starting
      // a new list item — the bullet gets stuck and can't be left. Unwrap
      // the common single-paragraph case so list items behave tightly; a
      // genuinely multi-paragraph item is left as-is.
      _unwrapLooseListItems: function(root) {
        if (!root)
          return;
        var items = root.querySelectorAll("li");
        for (var i = 0; i < items.length; i++) {
          var li = items[i];
          var directPs = [];
          for (var k = 0; k < li.children.length; k++) {
            if (li.children[k].tagName.toLowerCase() === "p") {
              directPs.push(li.children[k]);
            }
          }
          if (directPs.length === 1) {
            var p = directPs[0];
            while (p.firstChild)
              li.insertBefore(p.firstChild, p);
            li.removeChild(p);
          }
          var child = li.firstChild;
          while (child) {
            var next = child.nextSibling;
            if (child.nodeType === Node.TEXT_NODE && !/\S/.test(child.textContent) && (child === li.firstChild || child === li.lastChild)) {
              li.removeChild(child);
            }
            child = next;
          }
        }
      },
      _firstTextDescendant: function(root) {
        var c = root.firstChild;
        while (c) {
          if (c.nodeType === Node.TEXT_NODE)
            return c;
          if (c.nodeType === Node.ELEMENT_NODE) {
            var f = this._firstTextDescendant(c);
            if (f)
              return f;
          }
          c = c.nextSibling;
        }
        return null;
      },
      _lastTextDescendant: function(root) {
        var c = root.lastChild;
        while (c) {
          if (c.nodeType === Node.TEXT_NODE)
            return c;
          if (c.nodeType === Node.ELEMENT_NODE) {
            var f = this._lastTextDescendant(c);
            if (f)
              return f;
          }
          c = c.previousSibling;
        }
        return null;
      },
      _applyAutoFormat: function(runNodes, cursorNode, cursorOffset, cursorGlobalOffset, match, pattern) {
        var inner = match[1];
        if (!inner)
          return;
        var matchLen = match[0].length;
        var matchStartGlobal = cursorGlobalOffset - matchLen;
        var startNode = null;
        var startOffset = 0;
        var acc = 0;
        for (var k = 0; k < runNodes.length; k++) {
          var rn = runNodes[k];
          var rlen = rn === cursorNode ? cursorOffset : rn.textContent.length;
          if (acc + rlen >= matchStartGlobal) {
            startNode = rn;
            startOffset = matchStartGlobal - acc;
            break;
          }
          acc += rlen;
        }
        if (!startNode)
          return;
        var wrapper = this._createAutoFormatWrapper(pattern);
        var innerHost = pattern.type === "boldItalic" ? wrapper.firstChild : wrapper;
        var innerNodes = this._buildFormattedFragment(inner);
        for (var bf = 0; bf < innerNodes.length; bf++) {
          innerHost.appendChild(innerNodes[bf]);
        }
        this._syntaxMutating = true;
        try {
          if (this._decoratedAncestors) {
            for (var p = 0; p < this._decoratedAncestors.length; p++) {
              if (this._decoratedAncestors[p].isConnected) {
                this._removeDelimitersFrom(this._decoratedAncestors[p]);
              }
            }
          }
          var spliceRange = document.createRange();
          spliceRange.setStart(startNode, startOffset);
          spliceRange.setEnd(cursorNode, cursorOffset);
          spliceRange.deleteContents();
          spliceRange.insertNode(wrapper);
          if (wrapper.previousSibling && wrapper.previousSibling.nodeType === Node.TEXT_NODE && wrapper.previousSibling.textContent === "") {
            wrapper.previousSibling.parentNode.removeChild(
              wrapper.previousSibling
            );
          }
          if (wrapper.nextSibling && wrapper.nextSibling.nodeType === Node.TEXT_NODE && wrapper.nextSibling.textContent === "") {
            wrapper.nextSibling.parentNode.removeChild(wrapper.nextSibling);
          }
          var chain = this._descendChainAll(wrapper);
          for (var j = 0; j < chain.length; j++) {
            this._addDelimitersTo(chain[j]);
          }
          this._decoratedAncestors = chain;
          var caret = document.createRange();
          var innermost = chain[0];
          var innerDelim = innermost ? this._delimiterFor(innermost) : null;
          var lastTrailing = null;
          if (innerDelim) {
            var spans = Array.prototype.filter.call(
              innermost.children,
              function(c) {
                return c.classList && c.classList.contains("leaf-syntax-decoration");
              }
            );
            if (spans.length === 2 * innerDelim.length) {
              lastTrailing = spans[spans.length - 1];
            }
          }
          if (lastTrailing) {
            caret.setStartAfter(lastTrailing);
          } else {
            caret.setStartAfter(wrapper);
          }
          caret.collapse(true);
          var sel = window.getSelection();
          try {
            sel.removeAllRanges();
            sel.addRange(caret);
          } catch (_e) {
          }
        } finally {
          this._syntaxMutating = false;
        }
      },
      // After a contenteditable input event in hybrid mode, verify the active
      // decorated wrapper still represents valid formatting:
      //   - if the leading or trailing delimiter run is broken (chars edited
      //     or deleted), the wrapper is unwrapped entirely;
      //   - if there are stragglers BEFORE the leading run or AFTER the
      //     trailing run (the user typed at an edge position that landed
      //     inside the wrapper), those nodes are relocated outside the
      //     wrapper so the formatting boundary stays in sync with the
      //     decoration spans.
      _maybeUnwrapTamperedFormatting: function() {
        if (!this._decoratedAncestors || this._decoratedAncestors.length === 0) {
          return;
        }
        var snapshot = this._decoratedAncestors.slice();
        for (var i = 0; i < snapshot.length; i++) {
          var wrapper = snapshot[i];
          if (!wrapper.isConnected)
            continue;
          this._processWrapperIntegrity(wrapper);
        }
        this._updateSyntaxDecorations();
      },
      _processWrapperIntegrity: function(wrapper) {
        var delim = this._delimiterFor(wrapper);
        if (!delim)
          return;
        this._syntaxMutating = true;
        var normalized;
        try {
          normalized = this._normalizeDecorationSpans(wrapper, delim);
        } finally {
          this._syntaxMutating = false;
        }
        if (!normalized) {
          this._unwrapTamperedFormatting(wrapper);
          return;
        }
        var n = delim.length;
        var allSpans = Array.prototype.filter.call(
          wrapper.children,
          function(c) {
            return c.classList && c.classList.contains("leaf-syntax-decoration");
          }
        );
        if (allSpans.length !== 2 * n) {
          this._unwrapTamperedFormatting(wrapper);
          return;
        }
        for (var i = 0; i < 2 * n; i++) {
          var expected = i < n ? delim[i] : delim[i - n];
          if (allSpans[i].textContent !== expected) {
            this._unwrapTamperedFormatting(wrapper);
            return;
          }
        }
        var children = Array.prototype.slice.call(wrapper.childNodes);
        var idxFirstLeading = children.indexOf(allSpans[0]);
        var idxLastLeading = children.indexOf(allSpans[n - 1]);
        var idxFirstTrailing = children.indexOf(allSpans[n]);
        var idxLastTrailing = children.indexOf(allSpans[2 * n - 1]);
        var beforeStragglers = [];
        var afterStragglers = [];
        for (var k = 0; k < idxFirstLeading; k++) {
          beforeStragglers.push(children[k]);
        }
        for (var k2 = idxFirstLeading + 1; k2 < idxLastLeading; k2++) {
          if (!this._isDecorationSpan(children[k2])) {
            beforeStragglers.push(children[k2]);
          }
        }
        for (var k3 = idxFirstTrailing + 1; k3 < idxLastTrailing; k3++) {
          if (!this._isDecorationSpan(children[k3])) {
            afterStragglers.push(children[k3]);
          }
        }
        for (var k4 = idxLastTrailing + 1; k4 < children.length; k4++) {
          afterStragglers.push(children[k4]);
        }
        if (beforeStragglers.length === 0 && afterStragglers.length === 0) {
          return;
        }
        var parent = wrapper.parentNode;
        if (!parent)
          return;
        this._syntaxMutating = true;
        try {
          for (var b = 0; b < beforeStragglers.length; b++) {
            parent.insertBefore(beforeStragglers[b], wrapper);
          }
          var afterAnchor = wrapper.nextSibling;
          for (var a = 0; a < afterStragglers.length; a++) {
            if (afterAnchor) {
              parent.insertBefore(afterStragglers[a], afterAnchor);
            } else {
              parent.appendChild(afterStragglers[a]);
            }
          }
        } finally {
          this._syntaxMutating = false;
        }
      },
      _isDecorationSpan: function(node) {
        return node && node.nodeType === Node.ELEMENT_NODE && node.classList && node.classList.contains("leaf-syntax-decoration");
      },
      // Called from keydown for printable-character keys in hybrid mode.
      // If the cursor is past the bolded body (inside the trailing decoration
      // block or at the wrapper's tail), insert the typed character outside
      // the wrapper ourselves and tell the caller to preventDefault. Returns
      // true if it did the insertion, false otherwise.
      _maybeRedirectPastTrailingBlock: function(key) {
        var sel = window.getSelection();
        if (!sel.rangeCount)
          return false;
        var range2 = sel.getRangeAt(0);
        if (!range2.collapsed)
          return false;
        var wrapper = this._findRedirectWrapper(range2);
        if (!wrapper || !wrapper.isConnected)
          return false;
        var parent = wrapper.parentNode;
        if (!parent)
          return false;
        var insertedChar = key === " " ? "\xA0" : key;
        var afterAnchor = wrapper.nextSibling;
        this._syntaxMutating = true;
        try {
          var textNode;
          if (afterAnchor && afterAnchor.nodeType === Node.TEXT_NODE) {
            textNode = afterAnchor;
            textNode.insertData(0, insertedChar);
          } else {
            textNode = document.createTextNode(insertedChar);
            if (afterAnchor) {
              parent.insertBefore(textNode, afterAnchor);
            } else {
              parent.appendChild(textNode);
            }
          }
          var caret = document.createRange();
          caret.setStart(textNode, insertedChar.length);
          caret.collapse(true);
          try {
            sel.removeAllRanges();
            sel.addRange(caret);
          } catch (_e) {
          }
        } finally {
          this._syntaxMutating = false;
        }
        this._maybeAutoFormat();
        this._debouncedPushVisualChange();
        this._updateCounts();
        return true;
      },
      _findRedirectWrapper: function(range2) {
        if (this._decoratedAncestors && this._decoratedAncestors.length > 0) {
          var innermost = this._decoratedAncestors[0];
          var outermost = this._decoratedAncestors[this._decoratedAncestors.length - 1];
          if (innermost.isConnected && outermost.isConnected) {
            var delim = this._delimiterFor(innermost);
            if (delim) {
              var allSpans = Array.prototype.filter.call(
                innermost.children,
                function(c) {
                  return c.classList && c.classList.contains("leaf-syntax-decoration");
                }
              );
              var n = delim.length;
              if (allSpans.length === 2 * n) {
                var firstTrailing = allSpans[n];
                var probe = document.createRange();
                probe.setStartBefore(firstTrailing);
                probe.collapse(true);
                var pastBody = range2.compareBoundaryPoints(
                  Range.START_TO_START,
                  probe
                ) > 0;
                if (pastBody) {
                  var afterOutermost = document.createRange();
                  afterOutermost.setStartAfter(outermost);
                  afterOutermost.collapse(true);
                  var pastWrapper = range2.compareBoundaryPoints(
                    Range.START_TO_START,
                    afterOutermost
                  ) > 0;
                  if (!pastWrapper)
                    return outermost;
                }
              }
            }
          }
        }
        var startContainer = range2.startContainer;
        if (startContainer.nodeType === Node.TEXT_NODE && range2.startOffset === 0 && startContainer.previousSibling && this._isFormattingElement(startContainer.previousSibling)) {
          return startContainer.previousSibling;
        }
        return null;
      },
      _normalizeDecorationSpans: function(wrapper, delim) {
        var delimChar = delim[0];
        var sel = window.getSelection();
        var rangeContainer = null;
        var rangeOffset = 0;
        if (sel.rangeCount > 0) {
          var r = sel.getRangeAt(0);
          rangeContainer = r.startContainer;
          rangeOffset = r.startOffset;
        }
        var rangeMoved = false;
        var spans = Array.prototype.filter.call(
          wrapper.children,
          function(c) {
            return c.classList && c.classList.contains("leaf-syntax-decoration");
          }
        );
        for (var i = 0; i < spans.length; i++) {
          var span = spans[i];
          var text = span.textContent;
          if (text === delimChar)
            continue;
          if (text.length === 0)
            return false;
          var startsWithDelim = text[0] === delimChar;
          var endsWithDelim = text[text.length - 1] === delimChar;
          if (!startsWithDelim && !endsWithDelim)
            return false;
          var cursorInSpan = rangeContainer === span;
          var cursorOff = cursorInSpan ? rangeOffset : -1;
          if (startsWithDelim) {
            var extraTextStart = text.slice(1);
            span.textContent = delimChar;
            var afterNode = document.createTextNode(extraTextStart);
            if (span.nextSibling) {
              span.parentNode.insertBefore(afterNode, span.nextSibling);
            } else {
              span.parentNode.appendChild(afterNode);
            }
            if (cursorInSpan && cursorOff > 1) {
              rangeContainer = afterNode;
              rangeOffset = Math.min(cursorOff - 1, extraTextStart.length);
              rangeMoved = true;
            } else if (cursorInSpan) {
              rangeOffset = Math.min(cursorOff, 1);
            }
          } else {
            var extraTextEnd = text.slice(0, -1);
            span.textContent = delimChar;
            var beforeNode = document.createTextNode(extraTextEnd);
            span.parentNode.insertBefore(beforeNode, span);
            if (cursorInSpan) {
              if (cursorOff <= extraTextEnd.length) {
                rangeContainer = beforeNode;
                rangeOffset = cursorOff;
              } else {
                rangeContainer = span;
                rangeOffset = 1;
              }
              rangeMoved = true;
            }
          }
        }
        if (rangeMoved && rangeContainer) {
          try {
            var newRange = document.createRange();
            newRange.setStart(rangeContainer, rangeOffset);
            newRange.collapse(true);
            sel.removeAllRanges();
            sel.addRange(newRange);
          } catch (_e) {
          }
        }
        return true;
      },
      _unwrapTamperedFormatting: function(wrapper) {
        var parent = wrapper.parentNode;
        if (!parent)
          return;
        this._syntaxMutating = true;
        try {
          var child = wrapper.firstChild;
          while (child) {
            var next = child.nextSibling;
            if (!(child.nodeType === Node.ELEMENT_NODE && child.classList && child.classList.contains("leaf-syntax-decoration"))) {
              parent.insertBefore(child, wrapper);
            }
            child = next;
          }
          parent.removeChild(wrapper);
          if (this._decoratedAncestors) {
            var idx = this._decoratedAncestors.indexOf(wrapper);
            if (idx !== -1)
              this._decoratedAncestors.splice(idx, 1);
          }
        } finally {
          this._syntaxMutating = false;
        }
      },
      _clearSyntaxDecoration: function() {
        if (!this._decoratedAncestors || this._decoratedAncestors.length === 0) {
          return;
        }
        this._syntaxMutating = true;
        try {
          for (var i = 0; i < this._decoratedAncestors.length; i++) {
            this._removeDelimitersFrom(this._decoratedAncestors[i]);
          }
        } finally {
          this._syntaxMutating = false;
        }
        this._decoratedAncestors = [];
      },
      // Heading decoration: when the cursor sits inside a `<h1>`–`<h6>`,
      // prepend leading `# `…`###### ` decoration spans so the markdown
      // shorthand is visible the same way `**bold**` markers are. Only the
      // leading delimiter is shown — markdown headings have no closing.
      _updateHeadingDecoration: function() {
        if (this._mode !== "hybrid") {
          this._clearHeadingDecoration();
          return;
        }
        var sel = window.getSelection();
        if (!sel.rangeCount) {
          this._clearHeadingDecoration();
          return;
        }
        if (this._syntaxMutating)
          return;
        var node = sel.anchorNode;
        var heading = null;
        while (node && node !== this._visualEl) {
          if (node.nodeType === Node.ELEMENT_NODE && node.tagName && /^h[1-6]$/i.test(node.tagName)) {
            heading = node;
            break;
          }
          node = node.parentNode;
        }
        if (this._decoratedHeading === heading)
          return;
        this._syntaxMutating = true;
        try {
          if (this._decoratedHeading && this._decoratedHeading.isConnected) {
            this._removeHeadingDecorationFrom(this._decoratedHeading);
          }
          if (heading) {
            this._addHeadingDecorationTo(heading);
          }
          this._decoratedHeading = heading || null;
        } finally {
          this._syntaxMutating = false;
        }
      },
      _clearHeadingDecoration: function() {
        if (!this._decoratedHeading)
          return;
        this._syntaxMutating = true;
        try {
          if (this._decoratedHeading.isConnected) {
            this._removeHeadingDecorationFrom(this._decoratedHeading);
          }
        } finally {
          this._syntaxMutating = false;
        }
        this._decoratedHeading = null;
      },
      _addHeadingDecorationTo: function(heading) {
        var level = parseInt(heading.tagName.slice(1), 10);
        if (!level || level < 1 || level > 6)
          return;
        var prefix = "";
        for (var n = 0; n < level; n++)
          prefix += "#";
        prefix += " ";
        for (var i = prefix.length - 1; i >= 0; i--) {
          var span = document.createElement("span");
          span.className = "leaf-syntax-decoration";
          span.setAttribute("data-leaf-syntax-decoration", "");
          span.textContent = prefix[i];
          heading.insertBefore(span, heading.firstChild);
        }
        var sel = window.getSelection();
        if (sel.rangeCount > 0) {
          var range2 = sel.getRangeAt(0);
          if (range2.collapsed && range2.startContainer === heading && range2.startOffset === 0) {
            var anchorNode = heading.childNodes[prefix.length] || null;
            var placeholder = document.createTextNode("\u200B");
            if (anchorNode) {
              heading.insertBefore(placeholder, anchorNode);
            } else {
              heading.appendChild(placeholder);
            }
            var newRange = document.createRange();
            newRange.setStart(placeholder, 1);
            newRange.collapse(true);
            try {
              sel.removeAllRanges();
              sel.addRange(newRange);
            } catch (_e) {
            }
          }
        }
      },
      _removeHeadingDecorationFrom: function(heading) {
        var children = Array.prototype.slice.call(heading.children);
        for (var i = 0; i < children.length; i++) {
          var c = children[i];
          if (c.classList && c.classList.contains("leaf-syntax-decoration")) {
            heading.removeChild(c);
          }
        }
      },
      // When the user edits the `# ` decoration block of a heading (adds
      // or removes hash chars), retag the heading to the matching level.
      // Counts `#` chars in the leading sequence (decoration spans + any
      // typed text) up to the first space; that count becomes the new
      // level (clamped 1–6).
      _maybeAdjustHeadingLevel: function() {
        if (!this._decoratedHeading || !this._decoratedHeading.isConnected) {
          return;
        }
        if (this._syntaxMutating)
          return;
        var heading = this._decoratedHeading;
        var match = heading.tagName ? heading.tagName.toLowerCase().match(/^h([1-6])$/) : null;
        if (!match)
          return;
        var oldLevel = parseInt(match[1], 10);
        var hashCount = 0;
        var leadingChildren = [];
        var done = false;
        var c = heading.firstChild;
        while (c && !done) {
          var nodeText = null;
          if (c.nodeType === Node.TEXT_NODE) {
            nodeText = c.textContent;
          } else if (c.nodeType === Node.ELEMENT_NODE && this._isDecorationSpan(c)) {
            nodeText = c.textContent;
          }
          if (nodeText === null)
            break;
          var allConsumed = true;
          for (var i = 0; i < nodeText.length; i++) {
            var ch = nodeText[i];
            if (ch === "#") {
              hashCount++;
            } else if (ch === " ") {
              done = true;
              break;
            } else {
              allConsumed = false;
              break;
            }
          }
          if (allConsumed || done) {
            leadingChildren.push(c);
            c = c.nextSibling;
          } else {
            break;
          }
        }
        if (hashCount === 0)
          return;
        var newLevel = Math.min(hashCount, 6);
        if (newLevel === oldLevel)
          return;
        this._retagHeading(heading, "h" + newLevel, leadingChildren);
      },
      _retagHeading: function(oldHeading, newTag, leadingChildren) {
        this._syntaxMutating = true;
        try {
          var newHeading = document.createElement(newTag);
          var newLevel = parseInt(newTag.slice(1), 10) || 1;
          for (var i = 0; i < leadingChildren.length; i++) {
            if (leadingChildren[i].parentNode === oldHeading) {
              oldHeading.removeChild(leadingChildren[i]);
            }
          }
          while (oldHeading.firstChild) {
            newHeading.appendChild(oldHeading.firstChild);
          }
          oldHeading.parentNode.replaceChild(newHeading, oldHeading);
          this._decoratedHeading = newHeading;
          this._addHeadingDecorationTo(newHeading);
          var sel = window.getSelection();
          var lastHashSpan = newHeading.children[newLevel - 1];
          if (lastHashSpan && lastHashSpan.firstChild && lastHashSpan.firstChild.nodeType === Node.TEXT_NODE) {
            var caret = document.createRange();
            caret.setStart(
              lastHashSpan.firstChild,
              lastHashSpan.firstChild.textContent.length
            );
            caret.collapse(true);
            try {
              sel.removeAllRanges();
              sel.addRange(caret);
            } catch (_e) {
            }
          }
        } finally {
          this._syntaxMutating = false;
        }
      },
      _delimiterFor: function(el) {
        if (!el || !el.tagName)
          return null;
        var tag = el.tagName.toLowerCase();
        if (tag === "strong" || tag === "b")
          return "**";
        if (tag === "em" || tag === "i")
          return "*";
        if (tag === "s" || tag === "del" || tag === "strike")
          return "~~";
        if (tag === "code")
          return "`";
        if (tag === "span" && el.classList && el.classList.contains("leaf-spoiler")) {
          return "||";
        }
        return null;
      },
      // True when `el` has at least one direct child carrying the
      // `.leaf-source-marker` class — i.e. it's a wrapper built by
      // `_buildSourceFragment` whose marker text is already in the DOM
      // and shouldn't be synthesized again by the inline serializer.
      _hasMarkerChildren: function(el) {
        if (!el || !el.childNodes)
          return false;
        for (var i = 0; i < el.childNodes.length; i++) {
          var c = el.childNodes[i];
          if (c.nodeType === Node.ELEMENT_NODE && c.classList && c.classList.contains("leaf-source-marker")) {
            return true;
          }
        }
        return false;
      },
      // -- Hybrid source-block engine --
      //
      // Replaces the old decoration-span approach. The model now is:
      //   - The DOM stores rendered HTML for every block EXCEPT the one
      //     currently containing the cursor (in hybrid mode).
      //   - The cursor's block carries its markdown source as literal text
      //     inside a `<p data-leaf-source="origTag">` wrapper. The user
      //     edits the source freely; broken syntax (`#$ header`, half-
      //     stripped `*test**`) stays as text and round-trips through
      //     `htmlToMarkdown` as a plain `<p>`.
      //   - On cursor-leave, the source text is parsed client-side and the
      //     block is swapped back to its rendered form.
      //
      // Only one block at a time is in source mode (`this._sourceBlock`).
      // Called from selectionchange.
      // Editable blocks: paragraphs and headings carry text the user can
      // edit as markdown source. Lists / blockquotes / pre / table cells
      // are deferred for now and stay in rendered form even when the
      // cursor is inside them.
      _isSourceModeBlock: function(block) {
        if (!block || !block.tagName)
          return false;
        if (block.querySelector && block.querySelector(".leaf-atomic"))
          return false;
        var tag = block.tagName.toLowerCase();
        return tag === "p" || tag === "h1" || tag === "h2" || tag === "h3" || tag === "h4" || tag === "h5" || tag === "h6" || tag === "li";
      },
      _updateSourceBlock: function() {
        if (this._mode !== "hybrid") {
          this._exitAllSourceMode();
          return;
        }
        if (this._syntaxMutating)
          return;
        var sel = window.getSelection();
        if (!sel.rangeCount) {
          this._exitAllSourceMode();
          return;
        }
        var anchor = sel.anchorNode;
        if (!anchor || !this._visualEl.contains(anchor))
          return;
        var block = this._getCurrentBlock();
        if (block && block === this._sourceBlock) {
          this._refreshSourceBlock();
          return;
        }
        if (this._sourceBlock && this._sourceBlock.isConnected) {
          this._exitSourceMode(this._sourceBlock);
        }
        this._sourceBlock = null;
        this._lastSourceStateKey = null;
        this._activeMatchKey = null;
        if (block && this._isSourceModeBlock(block)) {
          if (block.hasAttribute("data-leaf-source")) {
            this._sourceBlock = block;
            this._lastSourceStateKey = null;
            this._activeMatchKey = null;
            this._refreshSourceBlock();
          } else {
            var newBlock = this._enterSourceMode(block);
            if (newBlock)
              this._sourceBlock = newBlock;
          }
        }
      },
      // Source-mode Backspace / Delete: delete one char of the block's
      // source string at the cursor's text-offset, then let
      // `_refreshSourceBlock` rebuild the marker / wrapper structure from
      // the new source. Returns true if it consumed the keystroke.
      // Non-collapsed selections fall through so the browser's default
      // selection delete still works (covers most click+drag delete).
      _maybeHandleSourceDelete: function(backspace) {
        var sel = window.getSelection();
        if (!sel.rangeCount)
          return false;
        var range2 = sel.getRangeAt(0);
        if (!range2.collapsed)
          return false;
        if (!this._sourceBlock.contains(range2.startContainer))
          return false;
        var cursorOffset = this._textOffsetInBlock(
          this._sourceBlock,
          range2.startContainer,
          range2.startOffset
        );
        var sourceText = this._sourceBlock.textContent || "";
        if (sourceText.length === 0 && this._maybeRemoveEmptySourceListOrQuoteBlock(backspace)) {
          return true;
        }
        var newSource;
        var newCursor;
        if (backspace) {
          if (cursorOffset <= 0) {
            if (sourceText.length === 0 && !this._sourceBlock.previousElementSibling && !this._sourceBlock.nextElementSibling) {
              return true;
            }
            return false;
          }
          newSource = sourceText.slice(0, cursorOffset - 1) + sourceText.slice(cursorOffset);
          newCursor = cursorOffset - 1;
        } else {
          if (cursorOffset >= sourceText.length) {
            var delHostBlock = this._sourceBlock;
            var delContextParent = delHostBlock.parentNode;
            var delHostTag = delHostBlock.tagName.toLowerCase();
            var delInList = delHostTag === "li";
            var delInBlockquote = delHostTag === "p" && delContextParent && delContextParent.tagName && delContextParent.tagName.toLowerCase() === "blockquote";
            if (delInList || delInBlockquote) {
              var delNext = delHostBlock.nextElementSibling;
              if (delNext && delNext.tagName && delNext.tagName.toLowerCase() === delHostTag) {
                this._syntaxMutating = true;
                try {
                  var delMergedSource = sourceText + (delNext.textContent || "");
                  while (this._sourceBlock.firstChild) {
                    this._sourceBlock.removeChild(this._sourceBlock.firstChild);
                  }
                  if (delMergedSource.length === 0) {
                    this._sourceBlock.innerHTML = "<br>";
                  } else {
                    this._sourceBlock.appendChild(
                      document.createTextNode(delMergedSource)
                    );
                  }
                  delNext.parentNode.removeChild(delNext);
                  var delMergedRange = document.createRange();
                  if (this._sourceBlock.firstChild && this._sourceBlock.firstChild.nodeType === Node.TEXT_NODE) {
                    var delClamped = Math.max(
                      0,
                      Math.min(
                        cursorOffset,
                        this._sourceBlock.firstChild.textContent.length
                      )
                    );
                    delMergedRange.setStart(
                      this._sourceBlock.firstChild,
                      delClamped
                    );
                  } else {
                    delMergedRange.setStart(this._sourceBlock, 0);
                  }
                  delMergedRange.collapse(true);
                  sel.removeAllRanges();
                  sel.addRange(delMergedRange);
                } finally {
                  this._syntaxMutating = false;
                }
                this._lastSourceStateKey = null;
                this._activeMatchKey = null;
                this._refreshSourceBlock();
                this._debouncedPushVisualChange();
                this._updateCounts();
                return true;
              }
            }
            return false;
          }
          newSource = sourceText.slice(0, cursorOffset) + sourceText.slice(cursorOffset + 1);
          newCursor = cursorOffset;
        }
        this._syntaxMutating = true;
        try {
          while (this._sourceBlock.firstChild) {
            this._sourceBlock.removeChild(this._sourceBlock.firstChild);
          }
          if (newSource.length === 0) {
            this._sourceBlock.innerHTML = "<br>";
          } else {
            this._sourceBlock.appendChild(document.createTextNode(newSource));
          }
          var newRange = document.createRange();
          if (this._sourceBlock.firstChild && this._sourceBlock.firstChild.nodeType === Node.TEXT_NODE) {
            var clamped = Math.max(
              0,
              Math.min(newCursor, this._sourceBlock.firstChild.textContent.length)
            );
            newRange.setStart(this._sourceBlock.firstChild, clamped);
          } else {
            newRange.setStart(this._sourceBlock, 0);
          }
          newRange.collapse(true);
          sel.removeAllRanges();
          sel.addRange(newRange);
        } finally {
          this._syntaxMutating = false;
        }
        this._lastSourceStateKey = null;
        this._activeMatchKey = null;
        this._refreshSourceBlock();
        this._debouncedPushVisualChange();
        this._updateCounts();
        return true;
      },
      _maybeRemoveEmptySourceListOrQuoteBlock: function(backspace) {
        var block = this._sourceBlock;
        if (!block || !block.parentNode)
          return false;
        var tag = block.tagName ? block.tagName.toLowerCase() : "";
        var parent = block.parentNode;
        var parentTag = parent.tagName ? parent.tagName.toLowerCase() : "";
        var inList = tag === "li" && (parentTag === "ul" || parentTag === "ol");
        var inBlockquote = tag === "p" && parentTag === "blockquote";
        if (!inList && !inBlockquote)
          return false;
        var prev = block.previousElementSibling;
        var next = block.nextElementSibling;
        var container = parent;
        var grandparent = container.parentNode;
        if (!grandparent)
          return false;
        var target = null;
        var placeAtEnd = false;
        if (backspace && prev) {
          target = prev;
          placeAtEnd = true;
        } else if (next) {
          target = next;
        } else if (prev) {
          target = prev;
          placeAtEnd = true;
        }
        this._syntaxMutating = true;
        try {
          container.removeChild(block);
          if (!target) {
            target = document.createElement("p");
            target.appendChild(document.createElement("br"));
            grandparent.replaceChild(target, container);
          } else if (!container.firstChild) {
            grandparent.removeChild(container);
          }
          var range2 = document.createRange();
          var textNode = placeAtEnd ? this._lastTextDescendant(target) : this._firstTextDescendant(target);
          if (textNode) {
            range2.setStart(
              textNode,
              placeAtEnd ? textNode.textContent.length : 0
            );
          } else {
            range2.setStart(target, placeAtEnd ? target.childNodes.length : 0);
          }
          range2.collapse(true);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range2);
          this._sourceBlock = null;
          this._lastSourceStateKey = null;
          this._activeMatchKey = null;
        } finally {
          this._syntaxMutating = false;
        }
        this._debouncedPushVisualChange();
        this._updateCounts();
        return true;
      },
      // Source-mode Enter: split the block's source string at the cursor
      // offset. The first half stays in the original block which then
      // exits source mode (rendered to HTML); the second half goes into
      // a new `<p data-leaf-source>` inserted right after, which becomes
      // the new active source block. Cursor lands at the start of the
      // new block.
      _maybeHandleSourceEnter: function() {
        var sel = window.getSelection();
        if (!sel.rangeCount)
          return false;
        var range2 = sel.getRangeAt(0);
        if (!range2.collapsed)
          return false;
        if (!this._sourceBlock.contains(range2.startContainer))
          return false;
        var cursorOffset = this._textOffsetInBlock(
          this._sourceBlock,
          range2.startContainer,
          range2.startOffset
        );
        var sourceText = this._sourceBlock.textContent || "";
        var firstHalf = sourceText.slice(0, cursorOffset);
        var secondHalf = sourceText.slice(cursorOffset);
        var oldBlock = this._sourceBlock;
        var parent = oldBlock.parentNode;
        if (!parent)
          return false;
        var isLi = oldBlock.tagName.toLowerCase() === "li";
        var liMarkerPrefix = "";
        var liContentEmpty = false;
        if (isLi) {
          var liNormFirst = firstHalf.replace(/\u00a0/g, " ");
          var liNormFull = sourceText.replace(/\u00a0/g, " ");
          var markerM = liNormFirst.match(/^(- |(\d+)\. )/);
          if (markerM) {
            liMarkerPrefix = markerM[2] ? parseInt(markerM[2], 10) + 1 + ". " : "- ";
            if (/^\[[ xX]?\] /.test(liNormFirst.slice(markerM[0].length))) {
              liMarkerPrefix += "[ ] ";
            }
          } else {
            liMarkerPrefix = "- ";
          }
          var liContentRest = liNormFull.replace(/^(- |\d+\. )/, "").replace(/^\[([ xX]?)\] /, "");
          liContentEmpty = liContentRest.length === 0;
        }
        if (isLi && liContentEmpty && parent.tagName && (parent.tagName.toLowerCase() === "ul" || parent.tagName.toLowerCase() === "ol")) {
          var liExitList = parent;
          var liExitGrandparent = liExitList.parentNode;
          if (liExitGrandparent) {
            this._syntaxMutating = true;
            try {
              var liTrailing = [];
              var liNext = oldBlock.nextElementSibling;
              while (liNext) {
                var liAfterNext = liNext.nextElementSibling;
                liTrailing.push(liNext);
                liNext = liAfterNext;
              }
              liExitList.removeChild(oldBlock);
              var liExitP = document.createElement("p");
              liExitP.appendChild(document.createElement("br"));
              liExitGrandparent.insertBefore(liExitP, liExitList.nextSibling);
              if (liTrailing.length > 0) {
                var liSecondList = document.createElement(liExitList.tagName);
                for (var lt = 0; lt < liTrailing.length; lt++) {
                  liSecondList.appendChild(liTrailing[lt]);
                }
                liExitGrandparent.insertBefore(
                  liSecondList,
                  liExitP.nextSibling
                );
              }
              if (!liExitList.firstChild) {
                liExitGrandparent.removeChild(liExitList);
              }
              var liExitRange = document.createRange();
              liExitRange.setStart(liExitP, 0);
              liExitRange.collapse(true);
              sel.removeAllRanges();
              sel.addRange(liExitRange);
              this._sourceBlock = null;
              this._lastSourceStateKey = null;
              this._activeMatchKey = null;
            } finally {
              this._syntaxMutating = false;
            }
            this._debouncedPushVisualChange();
            this._updateCounts();
            return true;
          }
        }
        if (sourceText.length === 0 && oldBlock.tagName.toLowerCase() === "p" && parent.tagName && parent.tagName.toLowerCase() === "blockquote") {
          var bqExitQuote = parent;
          var bqExitGrandparent = bqExitQuote.parentNode;
          if (bqExitGrandparent) {
            this._syntaxMutating = true;
            try {
              var bqTrailing = [];
              var bqNext = oldBlock.nextSibling;
              while (bqNext) {
                var bqAfterNext = bqNext.nextSibling;
                bqTrailing.push(bqNext);
                bqNext = bqAfterNext;
              }
              bqExitQuote.removeChild(oldBlock);
              var bqExitP = document.createElement("p");
              bqExitP.appendChild(document.createElement("br"));
              bqExitGrandparent.insertBefore(
                bqExitP,
                bqExitQuote.nextSibling
              );
              if (bqTrailing.length > 0) {
                var bqSecond = document.createElement("blockquote");
                for (var bt = 0; bt < bqTrailing.length; bt++) {
                  bqSecond.appendChild(bqTrailing[bt]);
                }
                bqExitGrandparent.insertBefore(
                  bqSecond,
                  bqExitP.nextSibling
                );
              }
              if (!bqExitQuote.firstChild) {
                bqExitGrandparent.removeChild(bqExitQuote);
              }
              var bqExitRange = document.createRange();
              bqExitRange.setStart(bqExitP, 0);
              bqExitRange.collapse(true);
              sel.removeAllRanges();
              sel.addRange(bqExitRange);
              this._sourceBlock = null;
              this._lastSourceStateKey = null;
              this._activeMatchKey = null;
            } finally {
              this._syntaxMutating = false;
            }
            this._debouncedPushVisualChange();
            this._updateCounts();
            return true;
          }
        }
        this._syntaxMutating = true;
        try {
          var renderedOld;
          if (isLi) {
            renderedOld = this._renderListItemFromSource(firstHalf);
          } else {
            renderedOld = this._renderBlockFromSource(firstHalf);
          }
          parent.replaceChild(renderedOld, oldBlock);
          var newBlock = document.createElement(isLi ? "li" : "p");
          newBlock.setAttribute("data-leaf-source", isLi ? "li" : "p");
          var newSourceText = isLi ? liMarkerPrefix + secondHalf : secondHalf;
          var newCaretOffset = isLi ? liMarkerPrefix.length : 0;
          if (newSourceText.length === 0) {
            newBlock.innerHTML = "<br>";
          } else {
            newBlock.appendChild(document.createTextNode(newSourceText));
          }
          parent.insertBefore(newBlock, renderedOld.nextSibling);
          var newRange = document.createRange();
          if (newBlock.firstChild && newBlock.firstChild.nodeType === Node.TEXT_NODE) {
            newRange.setStart(
              newBlock.firstChild,
              Math.min(newCaretOffset, newBlock.firstChild.textContent.length)
            );
          } else {
            newRange.setStart(newBlock, 0);
          }
          newRange.collapse(true);
          sel.removeAllRanges();
          sel.addRange(newRange);
          this._sourceBlock = newBlock;
          this._lastSourceStateKey = null;
          this._activeMatchKey = null;
        } finally {
          this._syntaxMutating = false;
        }
        this._refreshSourceBlock();
        this._debouncedPushVisualChange();
        this._updateCounts();
        return true;
      },
      _exitAllSourceMode: function() {
        if (this._sourceBlock && this._sourceBlock.isConnected) {
          this._exitSourceMode(this._sourceBlock);
        }
        this._sourceBlock = null;
        this._lastSourceStateKey = null;
        this._activeMatchKey = null;
      },
      // Convert `block` (rendered HTML) → `<p data-leaf-source="origTag">`
      // containing its markdown source as plain text. Preserves the
      // cursor's logical position by walking the block, accumulating
      // source text, and recording the source-offset when we pass the
      // cursor node.
      _enterSourceMode: function(block) {
        if (this._syntaxMutating)
          return null;
        var sel = window.getSelection();
        if (!sel.rangeCount)
          return null;
        var range2 = sel.getRangeAt(0);
        var origTag = block.tagName.toLowerCase();
        var blockPrefix = this._blockSourcePrefix(origTag);
        var isTaskLi = origTag === "li" && block.classList && block.classList.contains("leaf-task");
        var liMarker = "";
        if (origTag === "li") {
          var listParent = block.parentNode;
          if (listParent && listParent.tagName && listParent.tagName.toLowerCase() === "ol") {
            var liIndex = Array.prototype.indexOf.call(listParent.children, block) + 1;
            liMarker = liIndex + ". ";
          } else {
            liMarker = "- ";
          }
          if (isTaskLi) {
            liMarker += block.getAttribute("data-checked") === "true" ? "[x] " : "[ ] ";
          }
        }
        var trace = this._serializeBlockInline(
          block,
          range2.startContainer,
          range2.startOffset
        );
        var sourceText = blockPrefix + liMarker + trace.source;
        var caretOffset = blockPrefix.length + liMarker.length + trace.cursorOffset;
        var sourceBlock = document.createElement(origTag === "li" ? "li" : "p");
        sourceBlock.setAttribute("data-leaf-source", origTag);
        if (isTaskLi) {
          sourceBlock.classList.add("leaf-task");
          sourceBlock.setAttribute(
            "data-checked",
            block.getAttribute("data-checked") || "false"
          );
        }
        if (sourceText.length === 0) {
          sourceBlock.innerHTML = "<br>";
        } else {
          sourceBlock.appendChild(document.createTextNode(sourceText));
        }
        this._syntaxMutating = true;
        try {
          block.parentNode.replaceChild(sourceBlock, block);
          var newRange = document.createRange();
          if (sourceBlock.firstChild && sourceBlock.firstChild.nodeType === Node.TEXT_NODE) {
            var clamped = Math.max(
              0,
              Math.min(caretOffset, sourceBlock.firstChild.textContent.length)
            );
            newRange.setStart(sourceBlock.firstChild, clamped);
          } else {
            newRange.setStart(sourceBlock, 0);
          }
          newRange.collapse(true);
          sel.removeAllRanges();
          sel.addRange(newRange);
        } finally {
          this._syntaxMutating = false;
        }
        this._sourceBlock = sourceBlock;
        this._lastSourceStateKey = null;
        this._refreshSourceBlock();
        return sourceBlock;
      },
      // Build the children of a source block from a flat source string
      // plus marker ranges. Plain runs become text nodes; marker runs
      // become `<span class="leaf-source-marker">` so CSS can fade them.
      // Returns a `{ node, offset }` pointing at the DOM position that
      // corresponds to `caretOffset` in the source string.
      // Build the source-block's children from a source string + scan
      // info + the index of the "active" inline match (cursor is inside
      // it). The DOM structure is identical for active and inactive
      // inline matches: each match becomes its formatted element
      // (`<strong>`, `<em>`, …) wrapping `<span class="leaf-source-marker">`
      // opening marker + body text + closing marker. CSS keys on the
      // `.leaf-source-active` class to fade-in the markers for the
      // active match and hide them for the inactive ones — so the
      // source text (including `**`) is always present in textContent,
      // and the formatting (`<strong>`) is always present in the DOM.
      // Returns the caret target inside the new DOM.
      _buildSourceFragment: function(parent, sourceText, scan, caretOffset) {
        var caretTarget = null;
        var self2 = this;
        function noteCaret(node, offset) {
          if (caretTarget === null)
            caretTarget = { node, offset };
        }
        function appendPlain(host, text, sourceStart) {
          if (text.length === 0)
            return;
          var node = document.createTextNode(text);
          host.appendChild(node);
          if (caretTarget === null && caretOffset >= sourceStart && caretOffset <= sourceStart + text.length) {
            noteCaret(node, caretOffset - sourceStart);
          }
        }
        function appendMarker(host, text, sourceStart, extraClass) {
          if (text.length === 0)
            return;
          var span = document.createElement("span");
          span.className = "leaf-source-marker" + (extraClass ? " " + extraClass : "");
          var textNode2 = document.createTextNode(text);
          span.appendChild(textNode2);
          host.appendChild(span);
          if (caretTarget === null && caretOffset >= sourceStart && caretOffset <= sourceStart + text.length) {
            noteCaret(textNode2, caretOffset - sourceStart);
          }
        }
        if (scan.blockPrefixLen > 0) {
          if (scan.listMarker) {
            if (scan.isTask) {
              var taskBox = document.createElement("span");
              taskBox.className = "leaf-task-box";
              taskBox.setAttribute("contenteditable", "false");
              parent.appendChild(taskBox);
            }
            appendMarker(
              parent,
              sourceText.slice(0, scan.blockPrefixLen),
              0,
              "leaf-list-marker"
            );
          } else {
            appendMarker(parent, sourceText.slice(0, scan.blockPrefixLen), 0);
          }
        }
        function appendSegment(host, segText, segOffset, ancestorActive) {
          var matches = self2._scanInlineMatches(segText);
          var pos = 0;
          for (var i = 0; i < matches.length; i++) {
            var match = matches[i];
            if (match.start > pos) {
              appendPlain(host, segText.slice(pos, match.start), segOffset + pos);
            }
            var p = match.pattern;
            if (p.type === "boldItalic") {
              var biAbsStart = segOffset + match.start;
              var biAbsEnd = segOffset + match.end;
              var biActive = ancestorActive || caretOffset >= biAbsStart && caretOffset <= biAbsEnd;
              var biStrong = document.createElement("strong");
              var biEm = document.createElement("em");
              if (biActive) {
                biStrong.classList.add("leaf-source-active");
                biEm.classList.add("leaf-source-active");
              }
              appendMarker(
                biStrong,
                segText.slice(match.start, match.start + 2),
                segOffset + match.start
              );
              biStrong.appendChild(biEm);
              appendMarker(
                biEm,
                segText.slice(match.start + 2, match.start + 3),
                segOffset + match.start + 2
              );
              appendSegment(
                biEm,
                segText.slice(match.start + 3, match.end - 3),
                segOffset + match.start + 3,
                biActive
              );
              appendMarker(
                biEm,
                segText.slice(match.end - 3, match.end - 2),
                segOffset + match.end - 3
              );
              appendMarker(
                biStrong,
                segText.slice(match.end - 2, match.end),
                segOffset + match.end - 2
              );
              host.appendChild(biStrong);
              pos = match.end;
              continue;
            }
            var wrapper;
            var bodyHost;
            if (p.type === "link") {
              wrapper = document.createElement("a");
              wrapper.setAttribute("href", match.href || "");
              bodyHost = wrapper;
            } else if (p.isSpoiler) {
              wrapper = document.createElement("span");
              wrapper.classList.add("leaf-spoiler");
              bodyHost = wrapper;
            } else {
              wrapper = document.createElement(p.tag);
              bodyHost = wrapper;
            }
            var absStart = segOffset + match.start;
            var absEnd = segOffset + match.end;
            var isActive = ancestorActive || caretOffset >= absStart && caretOffset <= absEnd;
            if (isActive) {
              wrapper.classList.add("leaf-source-active");
            }
            var openLen = match.openLen != null ? match.openLen : match.delim.length;
            var closeLen = match.closeLen != null ? match.closeLen : match.delim.length;
            var openEnd = match.start + openLen;
            var closeStart = match.end - closeLen;
            appendMarker(
              wrapper,
              segText.slice(match.start, openEnd),
              segOffset + match.start
            );
            if (bodyHost !== wrapper)
              wrapper.appendChild(bodyHost);
            appendSegment(
              bodyHost,
              segText.slice(openEnd, closeStart),
              segOffset + openEnd,
              isActive
            );
            appendMarker(
              wrapper,
              segText.slice(closeStart, match.end),
              segOffset + closeStart
            );
            host.appendChild(wrapper);
            pos = match.end;
          }
          if (pos < segText.length) {
            appendPlain(host, segText.slice(pos), segOffset + pos);
          }
        }
        appendSegment(
          parent,
          sourceText.slice(scan.blockPrefixLen),
          scan.blockPrefixLen,
          false
        );
        if (caretTarget === null && parent.lastChild) {
          var last = parent.lastChild;
          var textNode = last.nodeType === Node.TEXT_NODE ? last : last.firstChild && last.firstChild.nodeType === Node.TEXT_NODE ? last.firstChild : null;
          if (textNode) {
            caretTarget = {
              node: textNode,
              offset: textNode.textContent.length
            };
          }
        }
        var lastTail = this._lastTextDescendant(parent);
        if (lastTail && /\u0020$/.test(lastTail.textContent)) {
          lastTail.textContent = lastTail.textContent.replace(
            /\u0020+$/,
            function(run) {
              return run.replace(/\u0020/g, "\xA0");
            }
          );
        }
        return caretTarget;
      },
      // Build a rendered `<li>` from a list-item source string. Strips the
      // revealed `- ` / `N. ` list marker (the <li>'s position in its
      // <ul>/<ol> already carries it — a rendered <li> must NEVER hold the
      // literal marker, or each re-entry into source mode would prepend
      // another one and accumulate `- - - …`). A `[ ] ` / `[x] ` marker
      // re-forms the checkbox box; an edited (broken) marker falls through
      // to plain text so the user can break a checkbox by editing its
      // source. Used by both `_exitSourceMode` and the Enter-split path so
      // the strip happens on every source→rendered transition.
      _renderListItemFromSource: function(sourceText) {
        var li = document.createElement("li");
        var src = sourceText || "";
        var normalized = src.replace(/\u00a0/g, " ");
        var bodyStart = 0;
        var markerM = normalized.match(/^(- |\d+\. )/);
        if (markerM) {
          bodyStart = markerM[0].length;
          var taskM = normalized.slice(bodyStart).match(/^\[([ xX]?)\] /);
          if (taskM) {
            li.className = "leaf-task";
            li.setAttribute(
              "data-checked",
              taskM[1] === "x" || taskM[1] === "X" ? "true" : "false"
            );
            var box = document.createElement("span");
            box.className = "leaf-task-box";
            box.setAttribute("contenteditable", "false");
            li.appendChild(box);
            bodyStart += taskM[0].length;
          }
        }
        var text = this._preserveSpaces(src.slice(bodyStart));
        var nodes = this._buildFormattedFragment(text);
        for (var i = 0; i < nodes.length; i++) {
          li.appendChild(nodes[i]);
        }
        if (!li.firstChild) {
          li.innerHTML = "<br>";
        }
        return li;
      },
      // Pin spaces that HTML would otherwise collapse \u2014 a leading run, and any
      // run of two or more \u2014 as NBSP, so they render at their typed width.
      // Single inter-word spaces stay regular so normal line-wrapping works.
      _preserveSpaces: function(text) {
        return text.replace(/^[\u0020\u00a0]+/, function(run) {
          return run.replace(/\u0020/g, "\xA0");
        }).replace(/[\u0020\u00a0]{2,}/g, function(run) {
          return run.replace(/\u0020/g, "\xA0");
        });
      },
      _exitSourceMode: function(sourceBlock) {
        if (!sourceBlock || !sourceBlock.parentNode)
          return;
        if (this._syntaxMutating)
          return;
        var sourceText = sourceBlock.textContent || "";
        sourceText = sourceText.replace(/​/g, "");
        var origTag = sourceBlock.getAttribute("data-leaf-source") || "";
        if (origTag === "li") {
          var liNormalized = sourceText.replace(/\u00a0/g, " ");
          var hasMarker = /^(- |\d+\. )/.test(liNormalized);
          var liList = sourceBlock.parentNode;
          var liListTag = liList && liList.tagName ? liList.tagName.toLowerCase() : "";
          if (!hasMarker && (liListTag === "ul" || liListTag === "ol") && liList.parentNode) {
            this._exitListItemToParagraph(sourceBlock, liNormalized, liList);
            return;
          }
          if (hasMarker) {
            var liContent = liNormalized.replace(/^(- |\d+\. )/, "").replace(/^\[([ xX]?)\] /, "");
            if (liContent.trim() === "" && (liListTag === "ul" || liListTag === "ol")) {
              this._syntaxMutating = true;
              try {
                liList.removeChild(sourceBlock);
                if (!liList.firstElementChild && liList.parentNode) {
                  liList.parentNode.removeChild(liList);
                }
              } finally {
                this._syntaxMutating = false;
              }
              return;
            }
          }
        }
        var rendered;
        if (origTag === "li") {
          rendered = this._renderListItemFromSource(sourceText);
        } else {
          rendered = this._renderBlockFromSource(sourceText);
        }
        this._syntaxMutating = true;
        try {
          sourceBlock.parentNode.replaceChild(rendered, sourceBlock);
        } finally {
          this._syntaxMutating = false;
        }
      },
      // Live counterpart to `_exitListItemToParagraph`: the user deleted a
      // list item's marker WHILE editing it. Convert the source `<li>` to a
      // source `<p>` in place — splitting the `<ul>`/`<ol>` if mid-list — and
      // keep the caret, so the bullet and list indent vanish immediately and
      // editing continues in the paragraph. The refresh at the end re-scans
      // the `<p>` and rebuilds its inline formatting.
      _breakSourceListItemToParagraph: function(sourceText, cursorOffset) {
        var li = this._sourceBlock;
        var list = li.parentNode;
        var grandparent = list ? list.parentNode : null;
        if (!grandparent)
          return;
        var p = document.createElement("p");
        p.setAttribute("data-leaf-source", "p");
        this._syntaxMutating = true;
        try {
          var trailing = [];
          var next = li.nextElementSibling;
          while (next) {
            var after = next.nextElementSibling;
            trailing.push(next);
            next = after;
          }
          list.removeChild(li);
          grandparent.insertBefore(p, list.nextSibling);
          if (trailing.length > 0) {
            var second = document.createElement(list.tagName);
            for (var i = 0; i < trailing.length; i++) {
              second.appendChild(trailing[i]);
            }
            grandparent.insertBefore(second, p.nextSibling);
          }
          if (!list.firstChild) {
            grandparent.removeChild(list);
          }
          if (sourceText.length === 0) {
            p.innerHTML = "<br>";
          } else {
            p.appendChild(document.createTextNode(sourceText));
          }
          var range2 = document.createRange();
          if (p.firstChild && p.firstChild.nodeType === Node.TEXT_NODE) {
            range2.setStart(
              p.firstChild,
              Math.min(cursorOffset, p.firstChild.textContent.length)
            );
          } else {
            range2.setStart(p, 0);
          }
          range2.collapse(true);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range2);
        } finally {
          this._syntaxMutating = false;
        }
        this._sourceBlock = p;
        this._lastSourceStateKey = null;
        this._activeMatchKey = null;
        this._refreshSourceBlock();
        this._debouncedPushVisualChange();
      },
      // Lift a marker-less `<li>` out of its `<ul>`/`<ol>` into a sibling
      // `<p>` carrying the item's (marker-less) content. Items that sat
      // AFTER it move into a fresh list of the same kind placed below the
      // paragraph, so the result is list / `<p>` / list rather than leaking
      // the tail into a sibling-less paragraph. Does not move the cursor.
      _exitListItemToParagraph: function(li, contentText, list) {
        var grandparent = list.parentNode;
        var p = document.createElement("p");
        var pNodes = this._buildFormattedFragment(contentText);
        for (var i = 0; i < pNodes.length; i++) {
          p.appendChild(pNodes[i]);
        }
        if (!p.firstChild) {
          p.innerHTML = "<br>";
        }
        this._syntaxMutating = true;
        try {
          var trailing = [];
          var next = li.nextElementSibling;
          while (next) {
            var afterNext = next.nextElementSibling;
            trailing.push(next);
            next = afterNext;
          }
          list.removeChild(li);
          grandparent.insertBefore(p, list.nextSibling);
          if (trailing.length > 0) {
            var secondList = document.createElement(list.tagName);
            for (var t = 0; t < trailing.length; t++) {
              secondList.appendChild(trailing[t]);
            }
            grandparent.insertBefore(secondList, p.nextSibling);
          }
          if (!list.firstChild) {
            grandparent.removeChild(list);
          }
        } finally {
          this._syntaxMutating = false;
        }
      },
      // Live re-evaluation of the currently-open source block. Called on
      // every input AND on cursor moves within the block, so the block:
      //   1. Retags itself (`data-leaf-source="h2"` etc.) the instant the
      //      leading `#`s change — heading styles update live.
      //   2. Shows source markers (`**`, `*`, …) ONLY for the inline range
      //      the cursor is currently inside; other inline ranges render
      //      as their formatted element (`<strong>`, `<em>`, …) just
      //      like they will after exit.
      // Skips the rebuild when nothing user-visible would change (same
      // text, same active range) so cursor moves within a single
      // text-segment don't churn the DOM.
      _refreshSourceBlock: function() {
        if (this._syntaxMutating)
          return;
        if (!this._sourceBlock || !this._sourceBlock.isConnected)
          return;
        var sel = window.getSelection();
        if (!sel.rangeCount)
          return;
        var range2 = sel.getRangeAt(0);
        if (!this._sourceBlock.contains(range2.startContainer))
          return;
        var trace = this._serializeBlockInline(
          this._sourceBlock,
          range2.startContainer,
          range2.startOffset
        );
        var sourceText = trace.source;
        var cursorOffset = trace.cursorOffset;
        var scan;
        if (this._sourceBlock.tagName.toLowerCase() === "li") {
          var liM = sourceText.replace(/ /g, " ").match(/^(- |\d+\. )(\[([ xX])\] )?/);
          var liMarkerLen = liM ? liM[0].length : 0;
          var liIsTask = !!(liM && liM[2]);
          var liChecked = liIsTask && (liM[3] === "x" || liM[3] === "X");
          var liBodyMatches = this._scanInlineMatches(
            sourceText.slice(liMarkerLen)
          );
          for (var lim = 0; lim < liBodyMatches.length; lim++) {
            liBodyMatches[lim].start += liMarkerLen;
            liBodyMatches[lim].end += liMarkerLen;
          }
          scan = {
            kind: "li",
            blockPrefixLen: liMarkerLen,
            inlineMatches: liBodyMatches,
            listMarker: liMarkerLen > 0,
            isTask: liIsTask,
            checked: liChecked
          };
        } else {
          scan = this._scanSource(sourceText);
        }
        if (scan.kind === "li" && !scan.listMarker && this._sourceBlock.parentNode && this._sourceBlock.parentNode.tagName && /^(ul|ol)$/i.test(this._sourceBlock.parentNode.tagName)) {
          this._breakSourceListItemToParagraph(sourceText, cursorOffset);
          return;
        }
        var activePath = this._findActiveInlinePath(
          sourceText.slice(scan.blockPrefixLen),
          scan.blockPrefixLen,
          cursorOffset
        );
        var outermost = activePath.length > 0 ? activePath[0] : null;
        var activeKey = outermost ? outermost.start + "-" + outermost.end : "";
        if (activePath.length > 0 && activeKey !== this._activeMatchKey) {
          var innermost = activePath[activePath.length - 1];
          var innerOpen = innermost.openLen != null ? innermost.openLen : innermost.delim.length;
          var innerClose = innermost.closeLen != null ? innermost.closeLen : innermost.delim.length;
          var bs = innermost.start + innerOpen;
          var be = innermost.end - innerClose;
          if (cursorOffset === bs) {
            cursorOffset = outermost.start;
          } else if (cursorOffset === be) {
            cursorOffset = outermost.end;
          }
        }
        this._activeMatchKey = activeKey;
        var stateKey = scan.kind + "|" + activeKey + "|" + sourceText;
        var willRebuild = stateKey !== this._lastSourceStateKey;
        if (scan.kind === "li") {
          this._sourceBlock.classList.toggle("leaf-task", !!scan.isTask);
          if (scan.isTask) {
            this._sourceBlock.setAttribute(
              "data-checked",
              scan.checked ? "true" : "false"
            );
          }
          var markerActive = !!scan.listMarker && (cursorOffset < scan.blockPrefixLen || sourceText.length <= scan.blockPrefixLen);
          this._sourceBlock.classList.toggle("leaf-marker-active", markerActive);
          this._sourceBlock.classList.toggle(
            "leaf-marker-broken",
            !scan.listMarker
          );
        }
        if (!willRebuild)
          return;
        this._lastSourceStateKey = stateKey;
        this._syntaxMutating = true;
        try {
          this._sourceBlock.setAttribute("data-leaf-source", scan.kind);
          while (this._sourceBlock.firstChild) {
            this._sourceBlock.removeChild(this._sourceBlock.firstChild);
          }
          if (sourceText.length === 0) {
            this._sourceBlock.innerHTML = "<br>";
          } else {
            var caretTarget = this._buildSourceFragment(
              this._sourceBlock,
              sourceText,
              scan,
              cursorOffset
            );
            if (caretTarget && caretTarget.node) {
              var newRange = document.createRange();
              newRange.setStart(caretTarget.node, caretTarget.offset);
              newRange.collapse(true);
              sel.removeAllRanges();
              sel.addRange(newRange);
            }
          }
        } finally {
          this._syntaxMutating = false;
        }
      },
      // Compute the character offset within a block element that
      // corresponds to (cursorNode, cursorOffset). Counts text characters
      // depth-first; element-offset cursors map to the position right
      // before the indexed child.
      _textOffsetInBlock: function(block, cursorNode, cursorOffset) {
        var offset = 0;
        var found = false;
        function walk(node) {
          if (found)
            return;
          if (node.nodeType === Node.TEXT_NODE) {
            if (node === cursorNode) {
              offset += cursorOffset;
              found = true;
            } else {
              offset += node.textContent.length;
            }
            return;
          }
          if (node.nodeType !== Node.ELEMENT_NODE)
            return;
          var children = node.childNodes;
          for (var i = 0; i < children.length; i++) {
            if (node === cursorNode && cursorOffset === i) {
              found = true;
              return;
            }
            walk(children[i]);
            if (found)
              return;
          }
          if (node === cursorNode && cursorOffset === children.length) {
            found = true;
          }
        }
        walk(block);
        return offset;
      },
      // Scan a source string and return `{ kind, markers }`. `kind` is the
      // block-level tag ("p", "h1"–"h6"); `markers` is an array of
      // `[start, end)` ranges marking the source-text positions that
      // should be rendered as faded markers (block prefix + balanced
      // inline delimiters).
      _scanSource: function(text) {
        text = text.replace(/\u00a0/g, " ");
        var kind = "p";
        var blockPrefixLen = 0;
        var headingMatch = text.match(/^(#{1,6})(?!#)( ?)/);
        if (headingMatch) {
          kind = "h" + headingMatch[1].length;
          blockPrefixLen = headingMatch[0].length;
        }
        var inlineMatches = this._scanInlineMatches(text.slice(blockPrefixLen));
        for (var i = 0; i < inlineMatches.length; i++) {
          inlineMatches[i].start += blockPrefixLen;
          inlineMatches[i].end += blockPrefixLen;
        }
        return {
          kind,
          blockPrefixLen,
          inlineMatches
        };
      },
      // Walk the inline-match tree the cursor sits in, outermost-first.
      // For nesting like `~~**bold**~~` with the cursor on "bold" this
      // returns [{del…}, {strong…}] so callers can build the active key,
      // snap to the outermost boundary on arrow-key entry, etc. Each
      // path entry carries absolute `start`/`end` positions (inside the
      // full source string) plus `delim` and `pattern` from the scan.
      _findActiveInlinePath: function(text, startOffset, caretOffset) {
        var path = [];
        var self2 = this;
        function recurse(segText, segOffset) {
          var matches = self2._scanInlineMatches(segText);
          for (var i = 0; i < matches.length; i++) {
            var m = matches[i];
            var absStart = segOffset + m.start;
            var absEnd = segOffset + m.end;
            if (caretOffset >= absStart && caretOffset <= absEnd) {
              var openLen = m.openLen != null ? m.openLen : m.delim.length;
              var closeLen = m.closeLen != null ? m.closeLen : m.delim.length;
              path.push({
                start: absStart,
                end: absEnd,
                delim: m.delim,
                openLen,
                closeLen,
                pattern: m.pattern
              });
              var bodyStart = segOffset + m.start + openLen;
              var bodyText = segText.slice(
                m.start + openLen,
                m.end - closeLen
              );
              recurse(bodyText, bodyStart);
              return;
            }
          }
        }
        recurse(text, startOffset);
        return path;
      },
      // Find every balanced inline-delimiter match (`**bold**`, `*it*`,
      // `~~strike~~`, `||spoiler||`, `` `code` ``, `***bi***`) inside
      // `text`. Returns non-overlapping match records sorted by start
      // position. Each record carries enough info (delim, pattern, body)
      // to render the match either as source-with-markers (when active)
      // or as the formatted element (when inactive).
      _scanInlineMatches: function(text) {
        var candidates = [];
        var patterns = this._autoFormatPatterns;
        for (var i = 0; i < patterns.length; i++) {
          var p = patterns[i];
          if (p.type === "link") {
            var lFlags = p.regexAny.flags;
            if (lFlags.indexOf("g") === -1)
              lFlags += "g";
            var lre = new RegExp(p.regexAny.source, lFlags);
            var lm;
            while ((lm = lre.exec(text)) !== null) {
              if (lm[0].length === 0) {
                lre.lastIndex++;
                continue;
              }
              var closeLen = lm[0].length - 1 - lm[1].length;
              candidates.push({
                start: lm.index,
                end: lm.index + lm[0].length,
                delim: "[",
                openLen: 1,
                closeLen,
                pattern: p,
                body: lm[1],
                href: lm[2]
              });
            }
            continue;
          }
          var delim = p.type === "boldItalic" ? "***" : p.delim;
          if (!delim)
            continue;
          var flags = p.regexAny.flags;
          if (flags.indexOf("g") === -1)
            flags += "g";
          var re = new RegExp(p.regexAny.source, flags);
          var m;
          while ((m = re.exec(text)) !== null) {
            if (m[0].length === 0) {
              re.lastIndex++;
              continue;
            }
            candidates.push({
              start: m.index,
              end: m.index + m[0].length,
              delim,
              openLen: delim.length,
              closeLen: delim.length,
              pattern: p,
              body: m[1]
            });
          }
        }
        candidates.sort(function(a, b) {
          if (a.start !== b.start)
            return a.start - b.start;
          return b.delim.length - a.delim.length;
        });
        var out = [];
        var lastEnd = 0;
        for (var k = 0; k < candidates.length; k++) {
          if (candidates[k].start >= lastEnd) {
            out.push(candidates[k]);
            lastEnd = candidates[k].end;
          }
        }
        return out;
      },
      // Markdown prefix for a block-level tag — heading hashes, etc. Empty
      // for paragraphs since they have no leading marker.
      _blockSourcePrefix: function(tag) {
        if (tag === "h1")
          return "# ";
        if (tag === "h2")
          return "## ";
        if (tag === "h3")
          return "### ";
        if (tag === "h4")
          return "#### ";
        if (tag === "h5")
          return "##### ";
        if (tag === "h6")
          return "###### ";
        return "";
      },
      // Walk a block's children depth-first, emitting markdown source for
      // inline content (text, `**bold**`, `*italic*`, `~~strike~~`,
      // `` `code` ``, `||spoiler||`, `[link](url)`, soft-break `<br>` as
      // `\n`). Tracks a cursor location: when we pass `cursorNode` at
      // `cursorOffset`, record the corresponding source-text offset.
      // Returns `{ source, cursorOffset }`. cursorOffset is the source
      // offset (or `source.length` if the cursor wasn't found).
      _serializeBlockInline: function(block, cursorNode, cursorOffset) {
        var source = "";
        var markers = [];
        var cursorAt = -1;
        var self2 = this;
        function noteCursor(absOffset) {
          if (cursorAt < 0)
            cursorAt = absOffset;
        }
        function pushMarker(text) {
          var start = source.length;
          source += text;
          markers.push([start, source.length]);
        }
        function walk(node) {
          var isElementCursor = node === cursorNode && node.nodeType === Node.ELEMENT_NODE;
          var children = node.childNodes;
          for (var i = 0; i < children.length; i++) {
            if (isElementCursor && cursorOffset === i) {
              noteCursor(source.length);
            }
            var c = children[i];
            if (c.nodeType === Node.TEXT_NODE) {
              if (c === cursorNode) {
                noteCursor(source.length + cursorOffset);
              }
              source += c.textContent.replace(/​/g, "");
              continue;
            }
            if (c.nodeType !== Node.ELEMENT_NODE)
              continue;
            var tag = c.tagName.toLowerCase();
            if (c.classList && c.classList.contains("leaf-syntax-decoration")) {
              continue;
            }
            if (tag === "br") {
              var isPlaceholder = node === block && children.length === 1;
              if (isPlaceholder) {
                continue;
              }
              if (c.hasAttribute && c.hasAttribute("data-leaf-filler")) {
                continue;
              }
              source += "\n";
              continue;
            }
            if (tag === "a") {
              var href = c.getAttribute("href") || "";
              if (self2._hasMarkerChildren(c)) {
                walk(c);
              } else {
                pushMarker("[");
                walk(c);
                pushMarker("](" + href + ")");
              }
              continue;
            }
            var delim = self2._delimiterFor(c);
            if (delim) {
              if (self2._hasMarkerChildren(c)) {
                walk(c);
              } else {
                pushMarker(delim);
                walk(c);
                pushMarker(delim);
              }
              continue;
            }
            walk(c);
          }
          if (isElementCursor && cursorOffset === children.length) {
            noteCursor(source.length);
          }
        }
        walk(block);
        if (cursorAt < 0)
          cursorAt = source.length;
        return {
          source,
          markers,
          cursorOffset: cursorAt
        };
      },
      // Parse a markdown source line back into a rendered block element.
      // Detects leading `#{1,6} ` for headings, `---` for HR, otherwise
      // returns a `<p>` with inline markdown parsed via the existing
      // `_buildFormattedFragment`. Broken syntax (no closing delim, weird
      // prefix like `#$ `) just stays as plain text inside a `<p>` — no
      // healing.
      _renderBlockFromSource: function(sourceText) {
        var text = sourceText.replace(/\u00a0/g, " ");
        var tagName = "p";
        var headingMatch = text.match(/^(#{1,6})(?!#) ?(.*)$/);
        if (headingMatch) {
          tagName = "h" + headingMatch[1].length;
          text = headingMatch[2];
        }
        if (sourceText.match(/^-{3,}$/)) {
          return document.createElement("hr");
        }
        var block = document.createElement(tagName);
        var nodes = this._buildFormattedFragment(text);
        for (var i = 0; i < nodes.length; i++)
          block.appendChild(nodes[i]);
        if (!block.firstChild) {
          block.innerHTML = "<br>";
        }
        return block;
      },
      _addDelimitersTo: function(el) {
        var delim = this._delimiterFor(el);
        if (!delim)
          return;
        for (var i = delim.length - 1; i >= 0; i--) {
          var leading = document.createElement("span");
          leading.className = "leaf-syntax-decoration";
          leading.setAttribute("data-leaf-syntax-decoration", "");
          leading.textContent = delim[i];
          el.insertBefore(leading, el.firstChild);
        }
        for (var j = 0; j < delim.length; j++) {
          var trailing = document.createElement("span");
          trailing.className = "leaf-syntax-decoration";
          trailing.setAttribute("data-leaf-syntax-decoration", "");
          trailing.textContent = delim[j];
          el.appendChild(trailing);
        }
      },
      _removeDelimitersFrom: function(el) {
        if (!el)
          return;
        var spans = el.querySelectorAll(".leaf-syntax-decoration");
        for (var k = 0; k < spans.length; k++) {
          var s = spans[k];
          if (s.parentNode)
            s.parentNode.removeChild(s);
        }
      },
      // -- Sticky toolbar --
      _getStickyTopOffset: function() {
        var maxBottom = 0;
        var candidates = document.querySelectorAll(
          "header, nav, [data-navbar], .navbar"
        );
        for (var i = 0; i < candidates.length; i++) {
          var el = candidates[i];
          var style = window.getComputedStyle(el);
          var pos = style.position;
          if ((pos === "fixed" || pos === "sticky") && parseInt(style.top, 10) <= 0) {
            var bottom2 = el.getBoundingClientRect().bottom;
            if (bottom2 > maxBottom)
              maxBottom = bottom2;
          }
        }
        return maxBottom;
      },
      _setupStickyToolbar: function() {
        var self2 = this;
        this._stickyToolbarEl = this.el.querySelector("[data-visual-toolbar]");
        if (!this._stickyToolbarEl)
          return;
        this._stickyPlaceholder = document.createElement("div");
        this._stickyPlaceholder.className = "leaf-toolbar-placeholder";
        this._stickyPlaceholder.style.display = "none";
        this._stickyToolbarEl.parentNode.insertBefore(
          this._stickyPlaceholder,
          this._stickyToolbarEl
        );
        this._stickyScrollHandler = function() {
          var toolbar = self2._stickyToolbarEl;
          var placeholder = self2._stickyPlaceholder;
          var editorRect = self2.el.getBoundingClientRect();
          var toolbarHeight = toolbar.offsetHeight;
          var topOffset = self2._getStickyTopOffset();
          var isSticky = toolbar.classList.contains("leaf-toolbar-sticky");
          var refRect = isSticky ? placeholder.getBoundingClientRect() : toolbar.getBoundingClientRect();
          if (refRect.top < topOffset && editorRect.bottom > toolbarHeight + topOffset) {
            if (!isSticky) {
              placeholder.style.height = toolbarHeight + "px";
              placeholder.style.display = "block";
              toolbar.style.width = self2.el.offsetWidth + "px";
              toolbar.style.top = topOffset + "px";
              toolbar.classList.add("leaf-toolbar-sticky");
            } else {
              toolbar.style.width = self2.el.offsetWidth + "px";
              toolbar.style.top = topOffset + "px";
            }
          } else {
            if (isSticky) {
              toolbar.classList.remove("leaf-toolbar-sticky");
              toolbar.style.width = "";
              toolbar.style.top = "";
              placeholder.style.display = "none";
            }
          }
        };
        window.addEventListener("scroll", this._stickyScrollHandler, {
          passive: true
        });
        window.addEventListener("resize", this._stickyScrollHandler, {
          passive: true
        });
      },
      _cleanupStickyToolbar: function() {
        if (this._stickyScrollHandler) {
          window.removeEventListener("scroll", this._stickyScrollHandler);
          window.removeEventListener("resize", this._stickyScrollHandler);
          this._stickyScrollHandler = null;
        }
        if (this._stickyPlaceholder && this._stickyPlaceholder.parentNode) {
          this._stickyPlaceholder.parentNode.removeChild(this._stickyPlaceholder);
          this._stickyPlaceholder = null;
        }
        if (this._stickyToolbarEl) {
          this._stickyToolbarEl.classList.remove("leaf-toolbar-sticky");
          this._stickyToolbarEl.style.width = "";
          this._stickyToolbarEl.style.top = "";
          this._stickyToolbarEl = null;
        }
      },
      // -- Fullscreen toggle --
      //
      // Uses the browser Fullscreen API (`element.requestFullscreen`) so the
      // host fills the screen at OS level — browser chrome (tabs, address
      // bar, OS task bar) hides, exactly like Fresco's nav button. Escape
      // and OS-level exit gestures are handled natively by the browser.
      //
      // Source of truth is `document.fullscreenElement`. The `fullscreenchange`
      // listener (attached in `mounted`) reflects browser state into the
      // `data-leaf-fullscreen='true'` attribute, which drives the CSS that
      // flexes the inner toolbar/body/footer layout so the editor body
      // absorbs the new height. F11, Escape, the button, and any external
      // `exitFullscreen()` call all keep our UI in sync because they all
      // route through the same change event.
      _toggleFullscreen: function() {
        if (this._fullscreenElement() === this.el) {
          this._exitFullscreen();
        } else {
          this._requestFullscreen(this.el);
        }
      },
      // Fullscreen API wrappers with Safari webkit prefix fallbacks. The
      // request is a user-gesture-only API; click handlers always satisfy
      // that, so a rejection in practice means the document or iframe
      // disallows it. We swallow errors silently — falling back to the
      // old CSS-pin path is possible but not warranted yet.
      _requestFullscreen: function(el) {
        var fn = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
        if (fn) {
          try {
            return fn.call(el);
          } catch (_) {
          }
        }
      },
      _exitFullscreen: function() {
        var fn = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
        if (fn) {
          try {
            return fn.call(document);
          } catch (_) {
          }
        }
      },
      _fullscreenElement: function() {
        return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
      },
      // Reflect `document.fullscreenElement` into our DOM. Called from the
      // `fullscreenchange` listener attached in `mounted`.
      _syncFullscreenState: function() {
        var on = this._fullscreenElement() === this.el;
        var btn = this.el.querySelector("[data-leaf-fullscreen-btn]");
        var enterIcon = btn && btn.querySelector("[data-leaf-fullscreen-enter]");
        var exitIcon = btn && btn.querySelector("[data-leaf-fullscreen-exit]");
        if (on) {
          this.el.setAttribute("data-leaf-fullscreen", "true");
          if (btn)
            btn.title = "Exit fullscreen";
          if (enterIcon)
            enterIcon.style.display = "none";
          if (exitIcon)
            exitIcon.style.display = "";
        } else {
          this.el.removeAttribute("data-leaf-fullscreen");
          if (btn)
            btn.title = "Toggle fullscreen";
          if (enterIcon)
            enterIcon.style.display = "";
          if (exitIcon)
            exitIcon.style.display = "none";
        }
      },
      _execToolbarAction: function(action) {
        if (action === "fullscreen") {
          this._toggleFullscreen();
          return;
        }
        if (action === "copyMarkdown") {
          this._copyText(this._currentMarkdown());
          return;
        }
        if (action === "copyHtml") {
          this._copyText(this._currentHtml());
          return;
        }
        if (action === "downloadMarkdown") {
          this._downloadMarkdown();
          return;
        }
        if (this._readonly)
          return;
        if (this._mode === "markdown") {
          this._execMarkdownToolbarAction(action);
          return;
        }
        if (!this._visualEl)
          return;
        this._visualEl.focus({ preventScroll: true });
        var preSnapshot = this._snapshotFormattingElements();
        switch (action) {
          case "bold":
            if (!this._isInsideHeading())
              document.execCommand("bold", false, null);
            break;
          case "italic":
            document.execCommand("italic", false, null);
            break;
          case "strike":
            document.execCommand("strikeThrough", false, null);
            break;
          case "superscript":
            document.execCommand("superscript", false, null);
            break;
          case "subscript":
            document.execCommand("subscript", false, null);
            break;
          case "code":
            this._wrapSelectionWith("code");
            break;
          case "spoiler":
            this._toggleSpoiler();
            break;
          case "heading1":
            this._toggleHeading("h1");
            break;
          case "heading2":
            this._toggleHeading("h2");
            break;
          case "heading3":
            this._toggleHeading("h3");
            break;
          case "heading4":
            this._toggleHeading("h4");
            break;
          case "heading5":
            this._toggleHeading("h5");
            break;
          case "heading6":
            this._toggleHeading("h6");
            break;
          case "bulletList":
            document.execCommand("insertUnorderedList", false, null);
            break;
          case "orderedList":
            document.execCommand("insertOrderedList", false, null);
            break;
          case "indent":
            document.execCommand("indent", false, null);
            break;
          case "outdent":
            document.execCommand("outdent", false, null);
            break;
          case "blockquote":
            this._toggleBlockquote();
            break;
          case "codeBlock":
            this._insertCodeBlock();
            break;
          case "detailsBlock":
            this._insertDetailsBlock();
            break;
          case "taskList":
            this._insertTaskList();
            break;
          case "callout":
            this._insertCallout("note");
            break;
          case "horizontalRule":
            this._insertHorizontalRule();
            break;
          case "table":
            this._insertTable();
            break;
          case "tableAddRow":
            this._tableAddRow();
            break;
          case "tableRemoveRow":
            this._tableRemoveRow();
            break;
          case "tableAddCol":
            this._tableAddCol();
            break;
          case "tableRemoveCol":
            this._tableRemoveCol();
            break;
          case "tableAlignLeft":
            this._tableSetAlign("left");
            break;
          case "tableAlignCenter":
            this._tableSetAlign("center");
            break;
          case "tableAlignRight":
            this._tableSetAlign("right");
            break;
          case "tableToggleHeader":
            this._tableToggleHeader();
            break;
          case "link":
            if (!this._denyLinks)
              this._insertLink();
            break;
          case "emoji":
            this._openEmojiPicker();
            return;
          case "symbols":
            this._openSymbolPicker();
            return;
          case "insert-image":
            if (this._denyImages)
              break;
            if (this._hasUpload) {
              this.pushEventTo(this.el, "insert_request", {
                editor_id: this._editorId,
                type: "image"
              });
            } else {
              this._openImageUrlDialog();
              return;
            }
            break;
          case "insert-image-upload":
            if (this._denyImages)
              break;
            this.pushEventTo(this.el, "insert_request", {
              editor_id: this._editorId,
              type: "image"
            });
            break;
          case "insert-image-url":
            if (!this._denyImages) {
              this._openImageUrlDialog();
              return;
            }
            break;
          case "insert-video":
            if (!this._denyVideo) {
              this.pushEventTo(this.el, "insert_request", {
                editor_id: this._editorId,
                type: "video"
              });
            }
            break;
          case "undo":
            document.execCommand("undo", false, null);
            break;
          case "redo":
            document.execCommand("redo", false, null);
            break;
          case "removeFormat":
            document.execCommand("removeFormat", false, null);
            document.execCommand("formatBlock", false, "p");
            break;
        }
        this._updateToolbarState();
        this._debouncedPushVisualChange();
        if (!this._refreshHybridSourceBlockAfterToolbarAction()) {
          this._deferredSyntaxRefresh(preSnapshot);
        }
      },
      _execMarkdownToolbarAction: function(action) {
        var gid = this._editorId.replace(/-/g, "_") + "_markdown";
        var fmt = window["markdownFormat_" + gid];
        var pfx = window["markdownLinePrefix_" + gid];
        var lnk = window["markdownLink_" + gid];
        var ins = window["markdownEditorInsert_" + gid];
        switch (action) {
          case "bold":
            if (fmt)
              fmt("**", "**");
            break;
          case "italic":
            if (fmt)
              fmt("*", "*");
            break;
          case "strike":
            if (fmt)
              fmt("~~", "~~");
            break;
          case "superscript":
            if (fmt)
              fmt("<sup>", "</sup>");
            break;
          case "subscript":
            if (fmt)
              fmt("<sub>", "</sub>");
            break;
          case "code":
            if (fmt)
              fmt("`", "`");
            break;
          case "spoiler":
            if (fmt)
              fmt("||", "||");
            break;
          case "heading1":
            if (pfx)
              pfx("# ");
            break;
          case "heading2":
            if (pfx)
              pfx("## ");
            break;
          case "heading3":
            if (pfx)
              pfx("### ");
            break;
          case "heading4":
            if (pfx)
              pfx("#### ");
            break;
          case "heading5":
            if (pfx)
              pfx("##### ");
            break;
          case "heading6":
            if (pfx)
              pfx("###### ");
            break;
          case "bulletList":
            if (pfx)
              pfx("- ");
            break;
          case "orderedList":
            if (pfx)
              pfx("1. ");
            break;
          case "indent": {
            var ind = window["markdownIndent_" + gid];
            if (ind)
              ind("indent");
            break;
          }
          case "outdent": {
            var ind = window["markdownIndent_" + gid];
            if (ind)
              ind("outdent");
            break;
          }
          case "blockquote":
            if (pfx)
              pfx("> ");
            break;
          case "codeBlock":
            if (fmt)
              fmt("```\n", "\n```");
            break;
          case "horizontalRule":
            if (ins)
              ins("\n---\n");
            break;
          case "detailsBlock":
            if (ins)
              ins("\n<details>\n<summary>Summary</summary>\n\nContent\n\n</details>\n");
            break;
          case "taskList":
            if (pfx)
              pfx("- [ ] ");
            break;
          case "callout":
            if (ins)
              ins("\n> [!NOTE]\n> \n");
            break;
          case "table":
            if (ins)
              ins("\n| Header 1 | Header 2 |\n| --- | --- |\n| Cell 1 | Cell 2 |\n| Cell 3 | Cell 4 |\n");
            break;
          case "link":
            if (lnk && !this._denyLinks)
              lnk();
            break;
          case "emoji":
            this._openEmojiPicker();
            break;
          case "symbols":
            this._openSymbolPicker();
            break;
          case "insert-image":
            if (this._denyImages)
              break;
            if (this._hasUpload) {
              this.pushEventTo(this.el, "insert_request", { editor_id: this._editorId, type: "image" });
            } else {
              this._openImageUrlDialog();
            }
            break;
          case "insert-image-upload":
            if (this._denyImages)
              break;
            this.pushEventTo(this.el, "insert_request", { editor_id: this._editorId, type: "image" });
            break;
          case "insert-image-url":
            if (!this._denyImages)
              this._openImageUrlDialog();
            break;
          case "insert-video":
            if (!this._denyVideo)
              this.pushEventTo(this.el, "insert_request", { editor_id: this._editorId, type: "video" });
            break;
          case "removeFormat":
            break;
          case "undo":
            break;
          case "redo":
            break;
        }
      },
      _toggleHeading: function(tag) {
        var block = this._getCurrentBlock();
        if (block && block.tagName && block.tagName.toLowerCase() === tag) {
          document.execCommand("formatBlock", false, "p");
        } else {
          document.execCommand("formatBlock", false, tag);
        }
      },
      _toggleBlockquote: function() {
        var block = this._getCurrentBlock();
        if (block && block.tagName && block.tagName.toLowerCase() === "blockquote") {
          document.execCommand("formatBlock", false, "p");
        } else {
          document.execCommand("formatBlock", false, "blockquote");
        }
      },
      // Insert a code block (one click, no prompt — same as before). The
      // language is set afterwards via the hover overlay's language button,
      // stored as `data-language`, and round-trips as a ```lang fence.
      _insertCodeBlock: function() {
        document.execCommand("formatBlock", false, "pre");
      },
      // -- Task lists (GFM checkboxes) --
      _setupTaskLists: function() {
        if (!this._visualEl)
          return;
        var self2 = this;
        this._visualEl.addEventListener("mousedown", function(e) {
          if (self2._readonly)
            return;
          var li = e.target.closest && e.target.closest("li.leaf-task");
          if (!li)
            return;
          var box = li.querySelector(".leaf-task-box");
          if (!box)
            return;
          if (e.target.closest(".leaf-task-box")) {
            e.preventDefault();
            e.stopPropagation();
            li.setAttribute(
              "data-checked",
              li.getAttribute("data-checked") === "true" ? "false" : "true"
            );
            self2._debouncedPushVisualChange();
            return;
          }
          var pos = self2._caretFromPoint(e.clientX, e.clientY);
          if (!pos)
            return;
          var stranded = pos.node === box || box.contains(pos.node) || pos.node === li && pos.offset === 0;
          if (!stranded)
            return;
          e.preventDefault();
          self2._visualEl.focus({ preventScroll: true });
          var r = document.createRange();
          var after = box.nextSibling;
          if (after && after.nodeType === Node.TEXT_NODE)
            r.setStart(after, 0);
          else
            r.setStartAfter(box);
          r.collapse(true);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(r);
        });
      },
      // Resolve the caret position the browser would pick for a viewport
      // point, across the two standard APIs. Returns { node, offset } or null.
      _caretFromPoint: function(x, y) {
        if (document.caretRangeFromPoint) {
          var rng = document.caretRangeFromPoint(x, y);
          return rng ? { node: rng.startContainer, offset: rng.startOffset } : null;
        }
        if (document.caretPositionFromPoint) {
          var p = document.caretPositionFromPoint(x, y);
          return p ? { node: p.offsetNode, offset: p.offset } : null;
        }
        return null;
      },
      _insertTaskList: function() {
        if (!this._visualEl)
          return;
        this._visualEl.focus();
        document.execCommand(
          "insertHTML",
          false,
          '<ul><li class="leaf-task" data-checked="false" data-task-new="1"><span class="leaf-task-box" contenteditable="false"></span>\u200B</li></ul>'
        );
        var li = this._visualEl.querySelector('li[data-task-new="1"]');
        if (li) {
          li.removeAttribute("data-task-new");
          var range2 = document.createRange();
          range2.selectNodeContents(li);
          range2.collapse(false);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range2);
        }
        this._debouncedPushVisualChange();
      },
      // -- Callouts / admonitions --
      _insertCallout: function(type) {
        type = type || "note";
        var title = type.charAt(0).toUpperCase() + type.slice(1);
        var html = '<blockquote class="leaf-callout leaf-callout-' + type + '" data-callout="' + type + '"><p class="leaf-callout-title" contenteditable="false">' + title + "</p><p>\u200B</p></blockquote><p><br></p>";
        document.execCommand("insertHTML", false, html);
      },
      // Insert a collapsible <details> block with an editable summary + body.
      _insertDetailsBlock: function() {
        var html = "<details open><summary>Summary</summary><p><br></p></details><p><br></p>";
        document.execCommand("insertHTML", false, html);
      },
      // -- Emoji Picker --
      _emojiCategories: [
        { name: "Smileys", emojis: ["\u{1F600}", "\u{1F603}", "\u{1F604}", "\u{1F601}", "\u{1F606}", "\u{1F605}", "\u{1F923}", "\u{1F602}", "\u{1F642}", "\u{1F643}", "\u{1F609}", "\u{1F60A}", "\u{1F607}", "\u{1F970}", "\u{1F60D}", "\u{1F929}", "\u{1F618}", "\u{1F617}", "\u{1F61A}", "\u{1F619}", "\u{1F972}", "\u{1F60B}", "\u{1F61B}", "\u{1F61C}", "\u{1F92A}", "\u{1F61D}", "\u{1F911}", "\u{1F917}", "\u{1F92D}", "\u{1F92B}", "\u{1F914}", "\u{1FAE1}", "\u{1F910}", "\u{1F928}", "\u{1F610}", "\u{1F611}", "\u{1F636}", "\u{1FAE5}", "\u{1F60F}", "\u{1F612}", "\u{1F644}", "\u{1F62C}", "\u{1F925}", "\u{1F60C}", "\u{1F614}", "\u{1F62A}", "\u{1F924}", "\u{1F634}", "\u{1F637}", "\u{1F912}", "\u{1F915}", "\u{1F922}", "\u{1F92E}", "\u{1F974}", "\u{1F635}", "\u{1F92F}", "\u{1F973}", "\u{1F978}", "\u{1F60E}", "\u{1F913}", "\u{1F9D0}"] },
        { name: "Gestures", emojis: ["\u{1F44B}", "\u{1F91A}", "\u{1F590}", "\u270B", "\u{1F596}", "\u{1FAF1}", "\u{1FAF2}", "\u{1FAF3}", "\u{1FAF4}", "\u{1F44C}", "\u{1F90C}", "\u{1F90F}", "\u270C\uFE0F", "\u{1F91E}", "\u{1FAF0}", "\u{1F91F}", "\u{1F918}", "\u{1F919}", "\u{1F448}", "\u{1F449}", "\u{1F446}", "\u{1F595}", "\u{1F447}", "\u261D\uFE0F", "\u{1FAF5}", "\u{1F44D}", "\u{1F44E}", "\u270A", "\u{1F44A}", "\u{1F91B}", "\u{1F91C}", "\u{1F44F}", "\u{1F64C}", "\u{1FAF6}", "\u{1F450}", "\u{1F932}", "\u{1F91D}", "\u{1F64F}"] },
        { name: "Hearts", emojis: ["\u2764\uFE0F", "\u{1F9E1}", "\u{1F49B}", "\u{1F49A}", "\u{1F499}", "\u{1F49C}", "\u{1F5A4}", "\u{1F90D}", "\u{1F90E}", "\u{1F494}", "\u2764\uFE0F\u200D\u{1F525}", "\u2764\uFE0F\u200D\u{1FA79}", "\u2763\uFE0F", "\u{1F495}", "\u{1F49E}", "\u{1F493}", "\u{1F497}", "\u{1F496}", "\u{1F498}", "\u{1F49D}", "\u{1F49F}"] },
        { name: "Animals", emojis: ["\u{1F436}", "\u{1F431}", "\u{1F42D}", "\u{1F439}", "\u{1F430}", "\u{1F98A}", "\u{1F43B}", "\u{1F43C}", "\u{1F43B}\u200D\u2744\uFE0F", "\u{1F428}", "\u{1F42F}", "\u{1F981}", "\u{1F42E}", "\u{1F437}", "\u{1F438}", "\u{1F435}", "\u{1F414}", "\u{1F427}", "\u{1F426}", "\u{1F424}", "\u{1F986}", "\u{1F985}", "\u{1F989}", "\u{1F987}", "\u{1F43A}", "\u{1F417}", "\u{1F434}", "\u{1F984}", "\u{1F41D}", "\u{1F41B}", "\u{1F98B}", "\u{1F40C}", "\u{1F41E}"] },
        { name: "Food", emojis: ["\u{1F34E}", "\u{1F350}", "\u{1F34A}", "\u{1F34B}", "\u{1F34C}", "\u{1F349}", "\u{1F347}", "\u{1F353}", "\u{1FAD0}", "\u{1F348}", "\u{1F352}", "\u{1F351}", "\u{1F96D}", "\u{1F34D}", "\u{1F965}", "\u{1F95D}", "\u{1F345}", "\u{1F951}", "\u{1F355}", "\u{1F354}", "\u{1F35F}", "\u{1F32D}", "\u{1F37F}", "\u{1F9C1}", "\u{1F370}", "\u{1F382}", "\u{1F369}", "\u{1F36A}", "\u{1F36B}", "\u{1F36C}", "\u2615", "\u{1F375}", "\u{1F964}", "\u{1F37A}", "\u{1F377}"] },
        { name: "Travel", emojis: ["\u{1F697}", "\u{1F695}", "\u{1F68C}", "\u{1F3CE}", "\u{1F691}", "\u{1F692}", "\u2708\uFE0F", "\u{1F680}", "\u{1F6F8}", "\u{1F681}", "\u26F5", "\u{1F6A2}", "\u{1F3E0}", "\u{1F3E2}", "\u{1F3E5}", "\u{1F3EB}", "\u26EA", "\u{1F54C}", "\u{1F5FC}", "\u{1F5FD}", "\u26F2", "\u{1F30B}", "\u{1F3D4}", "\u{1F3D6}", "\u{1F3D5}"] },
        { name: "Objects", emojis: ["\u231A", "\u{1F4F1}", "\u{1F4BB}", "\u2328\uFE0F", "\u{1F5A5}", "\u{1F5A8}", "\u{1F5B1}", "\u{1F4BE}", "\u{1F4BF}", "\u{1F4F7}", "\u{1F4F9}", "\u{1F3A5}", "\u{1F4FA}", "\u{1F4FB}", "\u{1F399}", "\u23F0", "\u{1F50B}", "\u{1F50C}", "\u{1F4A1}", "\u{1F526}", "\u{1F56F}", "\u{1F4B0}", "\u{1F4B3}", "\u{1F48E}", "\u{1F527}", "\u{1F528}", "\u{1F529}", "\u2699\uFE0F", "\u{1F4CE}", "\u{1F4CC}", "\u2702\uFE0F", "\u{1F511}", "\u{1F5DD}", "\u{1F512}", "\u{1F513}"] },
        { name: "Symbols", emojis: ["\u2705", "\u274C", "\u2753", "\u2757", "\u{1F4AF}", "\u{1F525}", "\u2B50", "\u{1F31F}", "\u2728", "\u{1F4AB}", "\u{1F4A5}", "\u{1F4A2}", "\u{1F4A4}", "\u{1F3B5}", "\u{1F3B6}", "\u{1F514}", "\u{1F515}", "\u{1F4E3}", "\u{1F4AC}", "\u{1F4AD}", "\u{1F3C1}", "\u{1F6A9}", "\u{1F3AF}", "\u267B\uFE0F", "\u26A0\uFE0F", "\u{1F6AB}", "\u274E", "\u2733\uFE0F", "\u2747\uFE0F", "\u{1F534}", "\u{1F7E0}", "\u{1F7E1}", "\u{1F7E2}", "\u{1F535}", "\u{1F7E3}", "\u26AB", "\u26AA"] }
      ],
      // Search keywords per emoji (space-separated, lowercase). Covers the
      // common/searchable ones; emojis absent here are still browsable by
      // category and still match when their category name matches the query.
      _emojiKeywords: {
        "\u{1F600}": "grinning happy smile",
        "\u{1F603}": "happy smile joy",
        "\u{1F604}": "happy smile laugh",
        "\u{1F601}": "grin smile happy",
        "\u{1F606}": "laugh haha",
        "\u{1F605}": "sweat laugh nervous",
        "\u{1F923}": "rofl laugh haha funny",
        "\u{1F602}": "joy laugh cry funny tears",
        "\u{1F642}": "slight smile",
        "\u{1F643}": "upside down silly",
        "\u{1F609}": "wink",
        "\u{1F60A}": "blush smile happy",
        "\u{1F607}": "angel innocent halo",
        "\u{1F970}": "love hearts adore",
        "\u{1F60D}": "love heart eyes",
        "\u{1F929}": "star struck wow excited",
        "\u{1F618}": "kiss love",
        "\u{1F60B}": "yum tasty tongue",
        "\u{1F61B}": "tongue silly",
        "\u{1F61C}": "wink tongue silly",
        "\u{1F92A}": "crazy zany silly",
        "\u{1F911}": "money mouth rich",
        "\u{1F917}": "hug",
        "\u{1F914}": "thinking hmm",
        "\u{1F910}": "zipper quiet secret",
        "\u{1F610}": "neutral meh",
        "\u{1F611}": "expressionless meh",
        "\u{1F636}": "no mouth quiet",
        "\u{1F60F}": "smirk",
        "\u{1F612}": "unamused meh",
        "\u{1F644}": "eye roll",
        "\u{1F62C}": "grimace awkward",
        "\u{1F634}": "sleep tired zzz",
        "\u{1F637}": "mask sick",
        "\u{1F912}": "sick thermometer ill",
        "\u{1F915}": "hurt injured bandage",
        "\u{1F922}": "sick nausea gross",
        "\u{1F92E}": "vomit sick puke",
        "\u{1F974}": "woozy drunk dizzy",
        "\u{1F635}": "dizzy dead knockout",
        "\u{1F92F}": "mind blown explode",
        "\u{1F973}": "party celebrate birthday",
        "\u{1F60E}": "cool sunglasses",
        "\u{1F913}": "nerd geek glasses",
        "\u{1F9D0}": "monocle inspect",
        "\u{1F44B}": "wave hello hi bye",
        "\u270B": "hand stop raised",
        "\u{1F44C}": "ok perfect",
        "\u270C\uFE0F": "peace victory",
        "\u{1F91E}": "fingers crossed luck",
        "\u{1F91F}": "love you hand",
        "\u{1F918}": "rock horns",
        "\u{1F919}": "call me shaka",
        "\u{1F448}": "point left",
        "\u{1F449}": "point right",
        "\u{1F446}": "point up",
        "\u{1F447}": "point down",
        "\u261D\uFE0F": "point up one",
        "\u{1F44D}": "thumbs up like yes good approve",
        "\u{1F44E}": "thumbs down dislike no bad",
        "\u270A": "fist raised power",
        "\u{1F44A}": "fist bump punch",
        "\u{1F44F}": "clap applause",
        "\u{1F64C}": "raise hands celebrate praise",
        "\u{1F64F}": "pray thanks please",
        "\u{1F91D}": "handshake deal agree",
        "\u2764\uFE0F": "heart love red",
        "\u{1F9E1}": "orange heart",
        "\u{1F49B}": "yellow heart",
        "\u{1F49A}": "green heart",
        "\u{1F499}": "blue heart",
        "\u{1F49C}": "purple heart",
        "\u{1F5A4}": "black heart",
        "\u{1F90D}": "white heart",
        "\u{1F494}": "broken heart",
        "\u{1F495}": "hearts love",
        "\u{1F496}": "sparkle heart love",
        "\u{1F497}": "growing heart love",
        "\u{1F436}": "dog puppy",
        "\u{1F431}": "cat kitten",
        "\u{1F42D}": "mouse",
        "\u{1F439}": "hamster",
        "\u{1F430}": "rabbit bunny",
        "\u{1F98A}": "fox",
        "\u{1F43B}": "bear",
        "\u{1F43C}": "panda",
        "\u{1F428}": "koala",
        "\u{1F42F}": "tiger",
        "\u{1F981}": "lion",
        "\u{1F42E}": "cow",
        "\u{1F437}": "pig",
        "\u{1F438}": "frog",
        "\u{1F435}": "monkey",
        "\u{1F414}": "chicken",
        "\u{1F427}": "penguin",
        "\u{1F426}": "bird",
        "\u{1F986}": "duck",
        "\u{1F985}": "eagle",
        "\u{1F989}": "owl",
        "\u{1F984}": "unicorn",
        "\u{1F41D}": "bee",
        "\u{1F98B}": "butterfly",
        "\u{1F40C}": "snail",
        "\u{1F41E}": "ladybug",
        "\u{1F34E}": "apple red fruit",
        "\u{1F350}": "pear",
        "\u{1F34A}": "orange tangerine",
        "\u{1F34B}": "lemon",
        "\u{1F34C}": "banana",
        "\u{1F349}": "watermelon",
        "\u{1F347}": "grapes",
        "\u{1F353}": "strawberry",
        "\u{1F351}": "peach",
        "\u{1F96D}": "mango",
        "\u{1F34D}": "pineapple",
        "\u{1F965}": "coconut",
        "\u{1F95D}": "kiwi",
        "\u{1F345}": "tomato",
        "\u{1F951}": "avocado",
        "\u{1F355}": "pizza",
        "\u{1F354}": "burger hamburger",
        "\u{1F35F}": "fries chips",
        "\u{1F32D}": "hot dog",
        "\u{1F37F}": "popcorn",
        "\u{1F9C1}": "cupcake",
        "\u{1F370}": "cake slice",
        "\u{1F382}": "birthday cake",
        "\u{1F369}": "donut doughnut",
        "\u{1F36A}": "cookie",
        "\u{1F36B}": "chocolate",
        "\u{1F36C}": "candy sweet",
        "\u2615": "coffee tea hot",
        "\u{1F375}": "tea green",
        "\u{1F964}": "soda drink cup",
        "\u{1F37A}": "beer",
        "\u{1F377}": "wine",
        "\u{1F697}": "car auto",
        "\u{1F695}": "taxi cab",
        "\u{1F68C}": "bus",
        "\u{1F691}": "ambulance",
        "\u{1F692}": "fire truck",
        "\u2708\uFE0F": "plane flight travel",
        "\u{1F680}": "rocket launch space",
        "\u{1F6F8}": "ufo alien",
        "\u{1F681}": "helicopter",
        "\u26F5": "sailboat boat",
        "\u{1F6A2}": "ship",
        "\u{1F3E0}": "house home",
        "\u{1F3E2}": "office building",
        "\u{1F3E5}": "hospital",
        "\u{1F3EB}": "school",
        "\u26EA": "church",
        "\u{1F5FC}": "tower",
        "\u{1F5FD}": "statue liberty",
        "\u{1F30B}": "volcano",
        "\u{1F3D4}": "mountain",
        "\u{1F3D6}": "beach",
        "\u{1F3D5}": "camping tent",
        "\u231A": "watch time",
        "\u{1F4F1}": "phone mobile",
        "\u{1F4BB}": "laptop computer",
        "\u2328\uFE0F": "keyboard",
        "\u{1F5A5}": "desktop monitor",
        "\u{1F5A8}": "printer",
        "\u{1F4F7}": "camera photo",
        "\u{1F4F9}": "video camera",
        "\u{1F3A5}": "movie film",
        "\u{1F4FA}": "tv television",
        "\u23F0": "alarm clock time",
        "\u{1F50B}": "battery",
        "\u{1F50C}": "plug power",
        "\u{1F4A1}": "idea light bulb",
        "\u{1F526}": "flashlight torch",
        "\u{1F4B0}": "money bag cash",
        "\u{1F4B3}": "credit card",
        "\u{1F48E}": "diamond gem",
        "\u{1F527}": "wrench tool",
        "\u{1F528}": "hammer tool",
        "\u2699\uFE0F": "gear settings cog",
        "\u{1F4CE}": "paperclip attach",
        "\u{1F4CC}": "pin",
        "\u2702\uFE0F": "scissors cut",
        "\u{1F511}": "key",
        "\u{1F512}": "lock locked secure",
        "\u{1F513}": "unlock open",
        "\u2705": "check tick done yes correct",
        "\u274C": "cross x no wrong cancel",
        "\u2753": "question",
        "\u2757": "exclamation",
        "\u{1F4AF}": "hundred percent perfect",
        "\u{1F525}": "fire hot lit flame",
        "\u2B50": "star",
        "\u{1F31F}": "star glowing",
        "\u2728": "sparkles shiny",
        "\u{1F4A5}": "explosion boom",
        "\u{1F4A4}": "sleep zzz",
        "\u{1F3B5}": "music note",
        "\u{1F3B6}": "music notes",
        "\u{1F514}": "bell notification",
        "\u{1F4AC}": "speech bubble chat comment",
        "\u{1F4AD}": "thought bubble",
        "\u{1F6A9}": "flag red",
        "\u{1F3AF}": "target dart bullseye",
        "\u267B\uFE0F": "recycle",
        "\u26A0\uFE0F": "warning caution",
        "\u{1F6AB}": "no prohibited forbidden",
        "\u{1F534}": "red circle",
        "\u{1F7E0}": "orange circle",
        "\u{1F7E1}": "yellow circle",
        "\u{1F7E2}": "green circle",
        "\u{1F535}": "blue circle",
        "\u{1F7E3}": "purple circle",
        "\u26AB": "black circle",
        "\u26AA": "white circle"
      },
      _openEmojiPicker: function() {
        var self2 = this;
        if (this._emojiPicker) {
          this._closeEmojiPicker();
          return;
        }
        var sel = window.getSelection();
        if (sel.rangeCount > 0) {
          this._savedRange = sel.getRangeAt(0).cloneRange();
        }
        var btn = this.el.querySelector('[data-toolbar-action="emoji"]');
        if (!btn)
          return;
        var picker = document.createElement("div");
        picker.className = "leaf-emoji-picker";
        picker.style.cssText = "position:absolute;z-index:50;background:var(--color-base-200, #e5e7eb);color:var(--color-base-content, #1f2937);border:1px solid var(--color-base-300, #d1d5db);border-radius:0.5rem;box-shadow:0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08);padding:0.5rem;width:320px;max-height:360px;display:flex;flex-direction:column;";
        var searchWrap = document.createElement("div");
        searchWrap.style.cssText = "margin-bottom:0.375rem;";
        var searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.placeholder = "Search emoji...";
        searchInput.className = "input input-xs input-bordered w-full";
        searchInput.style.cssText = "font-size:0.8rem;";
        searchWrap.appendChild(searchInput);
        picker.appendChild(searchWrap);
        var tabsWrap = document.createElement("div");
        tabsWrap.style.cssText = "display:flex;gap:2px;margin-bottom:0.375rem;overflow-x:auto;flex-shrink:0;padding:0.25rem 0.125rem;border-bottom:1px solid var(--color-base-300, #d1d5db);";
        picker.appendChild(tabsWrap);
        var gridWrap = document.createElement("div");
        gridWrap.style.cssText = "overflow-y:auto;flex:1;";
        picker.appendChild(gridWrap);
        var categories = this._emojiCategories;
        var activeCategory = 0;
        function renderGrid(emojis) {
          gridWrap.innerHTML = "";
          var grid = document.createElement("div");
          grid.style.cssText = "display:grid;grid-template-columns:repeat(8,1fr);gap:2px;";
          emojis.forEach(function(emoji) {
            var span = document.createElement("span");
            span.textContent = emoji;
            span.style.cssText = "cursor:pointer;font-size:1.25rem;text-align:center;padding:3px;border-radius:4px;line-height:1;";
            span.addEventListener("mouseover", function() {
              span.style.background = "color-mix(in oklab, var(--color-base-content, #1f2937) 8%, transparent)";
            });
            span.addEventListener("mouseout", function() {
              span.style.background = "";
            });
            span.addEventListener("click", function(e) {
              e.preventDefault();
              e.stopPropagation();
              self2._insertEmoji(emoji);
            });
            grid.appendChild(span);
          });
          gridWrap.appendChild(grid);
        }
        function renderTabs() {
          tabsWrap.innerHTML = "";
          categories.forEach(function(cat, i) {
            var tab = document.createElement("button");
            tab.type = "button";
            tab.textContent = cat.emojis[0];
            tab.title = cat.name;
            tab.style.cssText = "cursor:pointer;font-size:1.125rem;padding:4px 6px;border-radius:6px;border:none;background:" + (i === activeCategory ? "color-mix(in oklab, var(--color-base-content, #1f2937) 12%, transparent)" : "none") + ";line-height:1;transition:background 0.1s;";
            tab.addEventListener("click", function(e) {
              e.preventDefault();
              e.stopPropagation();
              activeCategory = i;
              searchInput.value = "";
              renderTabs();
              renderGrid(categories[i].emojis);
            });
            tabsWrap.appendChild(tab);
          });
        }
        searchInput.addEventListener("input", function() {
          var q = searchInput.value.toLowerCase().trim();
          if (!q) {
            tabsWrap.style.display = "";
            renderTabs();
            renderGrid(categories[activeCategory].emojis);
            return;
          }
          tabsWrap.style.display = "none";
          var matches = [];
          var seen = {};
          categories.forEach(function(cat) {
            var catMatch = cat.name.toLowerCase().indexOf(q) !== -1;
            cat.emojis.forEach(function(em) {
              if (seen[em])
                return;
              var kw = self2._emojiKeywords[em] || "";
              if (catMatch || kw.indexOf(q) !== -1) {
                matches.push(em);
                seen[em] = true;
              }
            });
          });
          if (matches.length === 0) {
            gridWrap.innerHTML = '<div style="padding:1rem;text-align:center;opacity:0.6;font-size:0.8rem;">No emoji found</div>';
          } else {
            renderGrid(matches);
          }
        });
        picker.addEventListener("mousedown", function(e) {
          e.preventDefault();
        });
        renderTabs();
        renderGrid(categories[0].emojis);
        var rect = btn.getBoundingClientRect();
        var toolbarRect = btn.closest("[data-visual-toolbar]").getBoundingClientRect();
        picker.style.left = Math.max(0, rect.left - toolbarRect.left) + "px";
        picker.style.top = rect.bottom - toolbarRect.top + 4 + "px";
        btn.closest("[data-visual-toolbar]").style.position = "relative";
        btn.closest("[data-visual-toolbar]").appendChild(picker);
        this._emojiPicker = picker;
        var closeHandler = function(e) {
          if (!picker.contains(e.target) && e.target !== btn) {
            self2._closeEmojiPicker();
          }
        };
        setTimeout(function() {
          document.addEventListener("click", closeHandler);
        }, 0);
        this._emojiCloseHandler = closeHandler;
        searchInput.focus();
      },
      _closeEmojiPicker: function() {
        if (this._emojiPicker) {
          this._emojiPicker.remove();
          this._emojiPicker = null;
        }
        if (this._emojiCloseHandler) {
          document.removeEventListener("click", this._emojiCloseHandler);
          this._emojiCloseHandler = null;
        }
      },
      // -- Special characters / date-time picker (#31) --
      _symbols: [
        "\u2014",
        "\u2013",
        "\u2026",
        "\xA9",
        "\xAE",
        "\u2122",
        "\xB0",
        "\xA7",
        "\xB6",
        "\u2022",
        "\xB7",
        "\xAB",
        "\xBB",
        "\u201C",
        "\u201D",
        "\u2018",
        "\u2019",
        "\xD7",
        "\xF7",
        "\xB1",
        "\u2248",
        "\u2260",
        "\u2264",
        "\u2265",
        "\u2192",
        "\u2190",
        "\u2191",
        "\u2193",
        "\u21D2",
        "\u221E",
        "\xB5",
        "\xBD",
        "\xBC",
        "\xBE",
        "\u20AC",
        "\xA3",
        "\xA5",
        "\xA2",
        "\u2713",
        "\u2717",
        "\u2605",
        "\u2606",
        "\u2666",
        "\u2192",
        "\u2116",
        "\u2103",
        "\u2109",
        "\u2714",
        "\u2718",
        "\u2261"
      ],
      _openSymbolPicker: function() {
        var self2 = this;
        if (this._symbolPicker) {
          this._closeSymbolPicker();
          return;
        }
        var sel = window.getSelection();
        if (sel.rangeCount > 0)
          this._savedRange = sel.getRangeAt(0).cloneRange();
        var anchor = this.el.querySelector("[data-insert-more-trigger]") || this.el.querySelector('[data-toolbar-action="symbols"]');
        var toolbar = this.el.querySelector("[data-visual-toolbar]");
        if (!anchor || !toolbar)
          return;
        var picker = document.createElement("div");
        picker.style.cssText = "position:absolute;z-index:50;background:var(--color-base-200,#e5e7eb);color:var(--color-base-content,#1f2937);border:1px solid var(--color-base-300,#d1d5db);border-radius:0.5rem;box-shadow:0 4px 16px rgba(0,0,0,0.12),0 1px 4px rgba(0,0,0,0.08);padding:0.5rem;width:300px;";
        var dtRow = document.createElement("div");
        dtRow.style.cssText = "display:flex;gap:4px;margin-bottom:0.4rem;";
        [
          ["Insert date", function() {
            return (/* @__PURE__ */ new Date()).toLocaleDateString();
          }],
          ["Insert time", function() {
            return (/* @__PURE__ */ new Date()).toLocaleTimeString();
          }]
        ].forEach(function(d) {
          var b = document.createElement("button");
          b.type = "button";
          b.textContent = d[0];
          b.style.cssText = "flex:1;font-size:0.72rem;padding:0.25rem;border:1px solid var(--color-base-300,#d1d5db);border-radius:0.3rem;cursor:pointer;background:none;color:inherit;";
          b.addEventListener("mousedown", function(e) {
            e.preventDefault();
          });
          b.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            self2._insertEmoji(d[1]());
            self2._closeSymbolPicker();
          });
          dtRow.appendChild(b);
        });
        picker.appendChild(dtRow);
        var grid = document.createElement("div");
        grid.style.cssText = "display:grid;grid-template-columns:repeat(10,1fr);gap:2px;";
        this._symbols.forEach(function(s) {
          var span = document.createElement("span");
          span.textContent = s;
          span.style.cssText = "cursor:pointer;text-align:center;padding:4px;border-radius:4px;font-size:1rem;line-height:1;";
          span.addEventListener("mouseover", function() {
            span.style.background = "color-mix(in oklab, var(--color-base-content,#1f2937) 8%, transparent)";
          });
          span.addEventListener("mouseout", function() {
            span.style.background = "";
          });
          span.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            self2._insertEmoji(s);
            self2._closeSymbolPicker();
          });
          grid.appendChild(span);
        });
        picker.appendChild(grid);
        picker.addEventListener("mousedown", function(e) {
          e.preventDefault();
        });
        var rect = anchor.getBoundingClientRect();
        var tbRect = toolbar.getBoundingClientRect();
        toolbar.style.position = "relative";
        picker.style.left = Math.max(0, Math.min(rect.left - tbRect.left, tbRect.width - 300)) + "px";
        picker.style.top = rect.bottom - tbRect.top + 4 + "px";
        toolbar.appendChild(picker);
        this._symbolPicker = picker;
        var closeHandler = function(e) {
          if (!picker.contains(e.target))
            self2._closeSymbolPicker();
        };
        setTimeout(function() {
          document.addEventListener("click", closeHandler);
        }, 0);
        this._symbolCloseHandler = closeHandler;
      },
      _closeSymbolPicker: function() {
        if (this._symbolPicker) {
          this._symbolPicker.remove();
          this._symbolPicker = null;
        }
        if (this._symbolCloseHandler) {
          document.removeEventListener("click", this._symbolCloseHandler);
          this._symbolCloseHandler = null;
        }
      },
      _insertEmoji: function(emoji) {
        if (this._mode === "markdown") {
          var gid = this._editorId.replace(/-/g, "_") + "_markdown";
          var ins = window["markdownEditorInsert_" + gid];
          if (ins)
            ins(emoji);
          return;
        }
        if (this._visualEl) {
          this._visualEl.focus();
          if (this._savedRange) {
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(this._savedRange);
            this._savedRange = null;
          }
          document.execCommand("insertText", false, emoji);
          this._debouncedPushVisualChange();
        }
      },
      _isInsideHeading: function() {
        var block = this._getCurrentBlock();
        if (!block || !block.tagName)
          return false;
        return /^h[1-6]$/i.test(block.tagName);
      },
      _getCurrentBlock: function() {
        var sel = window.getSelection();
        if (!sel.rangeCount)
          return null;
        var node = sel.anchorNode;
        while (node && node !== this._visualEl) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            var display = window.getComputedStyle(node).display;
            if (display === "block" || display === "list-item") {
              return node;
            }
          }
          node = node.parentNode;
        }
        return null;
      },
      _insertLink: function() {
        var selection = window.getSelection();
        var currentHref = "";
        if (selection.rangeCount > 0) {
          var node = selection.anchorNode;
          while (node && node !== this._visualEl) {
            if (node.tagName && node.tagName.toLowerCase() === "a") {
              currentHref = node.getAttribute("href") || "";
              break;
            }
            node = node.parentNode;
          }
        }
        var url = prompt("Enter URL:", currentHref || "https://");
        if (url === null)
          return;
        if (url === "") {
          document.execCommand("unlink", false, null);
        } else {
          document.execCommand("createLink", false, url);
        }
      },
      _wrapSelectionWith: function(tagName) {
        var selection = window.getSelection();
        if (!selection.rangeCount)
          return;
        var range2 = selection.getRangeAt(0);
        var selectedText = range2.toString();
        if (selectedText.length === 0)
          return;
        var parent = range2.commonAncestorContainer;
        if (parent.nodeType === Node.TEXT_NODE)
          parent = parent.parentElement;
        if (parent && parent.tagName && parent.tagName.toLowerCase() === tagName) {
          var text = document.createTextNode(parent.textContent);
          parent.parentNode.replaceChild(text, parent);
          return;
        }
        try {
          var el = document.createElement(tagName);
          range2.surroundContents(el);
        } catch (_e) {
          var escaped = selectedText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          document.execCommand(
            "insertHTML",
            false,
            "<" + tagName + ">" + escaped + "</" + tagName + ">"
          );
        }
      },
      _spoilerAncestor: function(node) {
        while (node && node !== this._visualEl) {
          if (node.nodeType === Node.ELEMENT_NODE && node.classList && node.classList.contains("leaf-spoiler")) {
            return node;
          }
          node = node.parentNode;
        }
        return null;
      },
      // Like _inlineFormattingAncestor but also catches the boundary case:
      // when the cursor is between a plain text node and a formatting sibling,
      // Chrome puts the anchor in the parent — so the standard ancestor walk
      // misses the formatting until the cursor steps one character in.
      _activeFormattingForCursor: function(sel) {
        if (!sel || !sel.rangeCount)
          return null;
        var inside = this._inlineFormattingAncestor(sel.anchorNode);
        if (inside)
          return inside;
        var range2 = sel.getRangeAt(0);
        var node = range2.endContainer;
        var offset = range2.endOffset;
        if (node.nodeType === Node.TEXT_NODE) {
          if (offset === node.textContent.length && node.nextSibling) {
            var nextAncestor = this._inlineFormattingAncestor(node.nextSibling);
            if (nextAncestor)
              return nextAncestor;
          }
          if (offset === 0 && node.previousSibling) {
            var prevAncestor = this._inlineFormattingAncestor(
              node.previousSibling
            );
            if (prevAncestor)
              return prevAncestor;
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          var children = node.childNodes;
          var afterChild = children[offset];
          var beforeChild = children[offset - 1];
          if (afterChild) {
            var afterAncestor = this._inlineFormattingAncestor(afterChild);
            if (afterAncestor)
              return afterAncestor;
          }
          if (beforeChild) {
            var beforeAncestor = this._inlineFormattingAncestor(beforeChild);
            if (beforeAncestor)
              return beforeAncestor;
          }
        }
        return null;
      },
      // Closest inline-formatting wrapper around `node` that the user might
      // want to escape from when arrowing past its boundary or pressing Enter
      // inside it. Includes the spoiler span as a class match.
      _inlineFormattingAncestor: function(node) {
        var tags = [
          "b",
          "strong",
          "i",
          "em",
          "s",
          "del",
          "strike",
          "code",
          "u",
          "sub",
          "sup",
          "mark",
          "a"
        ];
        while (node && node !== this._visualEl) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            var tag = node.tagName ? node.tagName.toLowerCase() : "";
            if (tags.indexOf(tag) !== -1)
              return node;
            if (node.classList && node.classList.contains("leaf-spoiler")) {
              return node;
            }
          }
          node = node.parentNode;
        }
        return null;
      },
      _toggleSpoiler: function() {
        var sel = window.getSelection();
        if (!sel.rangeCount)
          return;
        var range2 = sel.getRangeAt(0);
        var existing = this._spoilerAncestor(range2.commonAncestorContainer);
        if (existing) {
          var text = document.createTextNode(existing.textContent);
          existing.parentNode.replaceChild(text, existing);
          return;
        }
        var selected = range2.toString();
        if (!selected.length)
          return;
        try {
          var span = document.createElement("span");
          span.className = "leaf-spoiler";
          range2.surroundContents(span);
        } catch (_e) {
          var escaped = selected.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          document.execCommand(
            "insertHTML",
            false,
            '<span class="leaf-spoiler">' + escaped + "</span>"
          );
        }
      },
      _insertTable: function() {
        var html = "<table><thead><tr><th>Header 1</th><th>Header 2</th></tr></thead><tbody><tr><td>Cell 1</td><td>Cell 2</td></tr><tr><td>Cell 3</td><td>Cell 4</td></tr></tbody></table><p><br></p>";
        document.execCommand("insertHTML", false, html);
      },
      _getTableContext: function() {
        var sel = window.getSelection();
        if (!sel.rangeCount)
          return null;
        var node = sel.anchorNode;
        if (node && node.nodeType === Node.TEXT_NODE)
          node = node.parentElement;
        var cell = node ? node.closest("td, th") : null;
        if (!cell)
          return null;
        var row = cell.parentElement;
        var table = cell.closest("table");
        if (!table || !this._visualEl.contains(table))
          return null;
        var colIndex = Array.prototype.indexOf.call(row.children, cell);
        return { table, row, cell, colIndex };
      },
      _tableAddRow: function() {
        var ctx = this._getTableContext();
        if (!ctx)
          return;
        var cols = ctx.row.children.length;
        var newRow = document.createElement("tr");
        for (var i = 0; i < cols; i++) {
          var td = document.createElement("td");
          td.innerHTML = "<br>";
          newRow.appendChild(td);
        }
        if (ctx.row.parentElement.tagName.toLowerCase() === "thead") {
          var tbody = ctx.table.querySelector("tbody");
          if (!tbody) {
            tbody = document.createElement("tbody");
            ctx.table.appendChild(tbody);
          }
          tbody.insertBefore(newRow, tbody.firstChild);
        } else {
          ctx.row.parentNode.insertBefore(newRow, ctx.row.nextSibling);
        }
      },
      // Align the current column (markdown alignment is per-column, encoded in
      // the header row, so we stamp every cell and let the serializer read the
      // header). Pass "" to clear.
      _tableSetAlign: function(align) {
        var ctx = this._getTableContext();
        if (!ctx)
          return;
        var rows = ctx.table.querySelectorAll("tr");
        for (var i = 0; i < rows.length; i++) {
          var cells = rows[i].querySelectorAll("th, td");
          var cell = cells[ctx.colIndex];
          if (!cell)
            continue;
          if (align) {
            cell.setAttribute("data-align", align);
            cell.style.textAlign = align;
          } else {
            cell.removeAttribute("data-align");
            cell.style.textAlign = "";
          }
        }
        this._debouncedPushVisualChange();
      },
      // Toggle the first row between header (<th>) and body (<td>) cells.
      // Markdown always treats row 0 as the header, so this is the
      // round-trip-safe interpretation of a header toggle.
      _tableToggleHeader: function() {
        var ctx = this._getTableContext();
        if (!ctx)
          return;
        var firstRow = ctx.table.querySelector("tr");
        if (!firstRow)
          return;
        var isHeader = !!firstRow.querySelector("th");
        var cells = firstRow.querySelectorAll("th, td");
        for (var i = 0; i < cells.length; i++) {
          var old = cells[i];
          var tag = isHeader ? "td" : "th";
          var repl = document.createElement(tag);
          repl.innerHTML = old.innerHTML;
          if (old.getAttribute("data-align")) {
            repl.setAttribute("data-align", old.getAttribute("data-align"));
            repl.style.textAlign = old.style.textAlign;
          }
          old.parentNode.replaceChild(repl, old);
        }
        this._debouncedPushVisualChange();
      },
      // Parse pasted TSV/CSV text into a table. Returns true if it handled the
      // paste. Tabs win as the delimiter when present (spreadsheet copy);
      // otherwise commas. A single cell with no delimiter is left to normal
      // paste handling.
      _maybePasteTabular: function(text) {
        if (!text)
          return false;
        var rawLines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
        while (rawLines.length && rawLines[rawLines.length - 1] === "") {
          rawLines.pop();
        }
        if (rawLines.length === 0)
          return false;
        var delim = text.indexOf("	") !== -1 ? "	" : null;
        var grid;
        var cols;
        if (delim) {
          grid = rawLines.map(function(ln) {
            return ln.split(delim);
          });
          cols = grid.reduce(function(m, r2) {
            return Math.max(m, r2.length);
          }, 0);
          if (cols < 2)
            return false;
        } else {
          if (rawLines.length < 2)
            return false;
          grid = rawLines.map(function(ln) {
            return ln.split(",");
          });
          var first = grid[0].length;
          if (first < 3)
            return false;
          var consistent = grid.every(function(r2) {
            return r2.length === first;
          });
          if (!consistent)
            return false;
          cols = first;
        }
        function esc(s) {
          return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }
        var html = "<table><thead><tr>";
        for (var c = 0; c < cols; c++) {
          html += "<th>" + (esc(grid[0][c]) || "<br>") + "</th>";
        }
        html += "</tr></thead><tbody>";
        for (var r = 1; r < grid.length; r++) {
          html += "<tr>";
          for (var c2 = 0; c2 < cols; c2++) {
            html += "<td>" + (esc(grid[r][c2]) || "<br>") + "</td>";
          }
          html += "</tr>";
        }
        html += "</tbody></table><p><br></p>";
        document.execCommand("insertHTML", false, html);
        this._debouncedPushVisualChange();
        return true;
      },
      _tableRemoveRow: function() {
        var ctx = this._getTableContext();
        if (!ctx)
          return;
        var allRows = ctx.table.querySelectorAll("tr");
        if (allRows.length <= 1) {
          ctx.table.parentNode.removeChild(ctx.table);
          return;
        }
        if (ctx.row.parentElement.tagName.toLowerCase() === "thead")
          return;
        ctx.row.parentNode.removeChild(ctx.row);
      },
      _tableAddCol: function() {
        var ctx = this._getTableContext();
        if (!ctx)
          return;
        var rows = ctx.table.querySelectorAll("tr");
        var insertAt = ctx.colIndex + 1;
        for (var i = 0; i < rows.length; i++) {
          var isHeader = rows[i].parentElement.tagName.toLowerCase() === "thead";
          var newCell = document.createElement(isHeader ? "th" : "td");
          newCell.innerHTML = "<br>";
          var cells = rows[i].children;
          if (insertAt < cells.length) {
            rows[i].insertBefore(newCell, cells[insertAt]);
          } else {
            rows[i].appendChild(newCell);
          }
        }
      },
      _tableRemoveCol: function() {
        var ctx = this._getTableContext();
        if (!ctx)
          return;
        var rows = ctx.table.querySelectorAll("tr");
        var colCount = rows[0] ? rows[0].children.length : 0;
        if (colCount <= 1) {
          ctx.table.parentNode.removeChild(ctx.table);
          return;
        }
        for (var i = 0; i < rows.length; i++) {
          var cell = rows[i].children[ctx.colIndex];
          if (cell)
            rows[i].removeChild(cell);
        }
      },
      _updateToolbarState: function() {
        var self2 = this;
        var block = this._getCurrentBlock();
        var blockTag = block && block.tagName ? block.tagName.toLowerCase() : "";
        var buttons = this.el.querySelectorAll("[data-toolbar-action]");
        buttons.forEach(function(btn) {
          var action = btn.dataset.toolbarAction;
          var active = false;
          switch (action) {
            case "bold":
              active = self2._isInsideTag("b") || self2._isInsideTag("strong");
              break;
            case "italic":
              active = document.queryCommandState("italic");
              break;
            case "strike":
              active = document.queryCommandState("strikeThrough");
              break;
            case "superscript":
              active = document.queryCommandState("superscript");
              break;
            case "subscript":
              active = document.queryCommandState("subscript");
              break;
            case "orderedList":
              active = document.queryCommandState("insertOrderedList");
              break;
            case "bulletList":
              active = document.queryCommandState("insertUnorderedList");
              break;
            case "heading1":
              active = blockTag === "h1";
              break;
            case "heading2":
              active = blockTag === "h2";
              break;
            case "heading3":
              active = blockTag === "h3";
              break;
            case "heading4":
              active = blockTag === "h4";
              break;
            case "blockquote":
              active = blockTag === "blockquote";
              break;
            case "codeBlock":
              active = blockTag === "pre";
              break;
            case "link":
              active = self2._isInsideTag("a");
              break;
            case "code":
              active = self2._isInsideTag("code");
              break;
            case "spoiler":
              var sel = window.getSelection();
              active = sel.rangeCount > 0 && !!self2._spoilerAncestor(sel.anchorNode);
              break;
          }
          if (active) {
            btn.classList.add("btn-active");
          } else {
            btn.classList.remove("btn-active");
          }
        });
        var headingTrigger = this.el.querySelector("[data-heading-trigger]");
        if (headingTrigger) {
          var label = headingTrigger.querySelector("[data-heading-trigger-label]");
          var headingMatch = /^h([1-6])$/.exec(blockTag);
          if (headingMatch) {
            if (label)
              label.textContent = "H" + headingMatch[1];
            headingTrigger.classList.add("btn-active");
          } else {
            if (label)
              label.textContent = "H";
            headingTrigger.classList.remove("btn-active");
          }
        }
      },
      _isInsideTag: function(tagName) {
        var sel = window.getSelection();
        if (!sel.rangeCount)
          return false;
        var node = sel.anchorNode;
        while (node && node !== this._visualEl) {
          if (node.tagName && node.tagName.toLowerCase() === tagName) {
            return true;
          }
          node = node.parentNode;
        }
        return false;
      },
      // -- Selection toolbar (touch only) --
      //
      // A floating bubble that appears above any non-collapsed selection
      // inside the visual / hybrid editor on touch devices. Replaces the
      // need to reach for the (often-offscreen) top toolbar on a phone.
      // Four buttons: Bold, Italic, Code, Link — the most common inline
      // formats. Block-level stuff is reachable via the auto-format
      // prefixes (`# `, `- `, `> `, etc.).
      _setupSelectionToolbar: function() {
        if (!this._visualEl)
          return;
        var self2 = this;
        this._selectionToolbarEl = null;
        this._onSelectionForToolbar = function() {
          self2._updateSelectionToolbar();
        };
        document.addEventListener("selectionchange", this._onSelectionForToolbar);
        this._onScrollForSelectionToolbar = function() {
          self2._updateSelectionToolbar();
        };
        window.addEventListener("scroll", this._onScrollForSelectionToolbar, true);
      },
      // The selection toolbar is a "narrow editor" affordance — once
      // the top toolbar has slimmed down (container width ≤ 640px) we
      // surface the bubble so inline formats are one tap away. On a
      // wide layout the full toolbar is right there, so the bubble
      // would just be visual noise. Editor `id` host carries the
      // `container-type` so we measure its actual rendered width.
      _selectionToolbarEnabled: function() {
        if (!this.el)
          return false;
        return this._toolbarLayout === "floating" || this._toolbarLayout === "both";
      },
      _teardownSelectionToolbar: function() {
        if (this._onSelectionForToolbar) {
          document.removeEventListener(
            "selectionchange",
            this._onSelectionForToolbar
          );
          this._onSelectionForToolbar = null;
        }
        if (this._onScrollForSelectionToolbar) {
          window.removeEventListener(
            "scroll",
            this._onScrollForSelectionToolbar,
            true
          );
          this._onScrollForSelectionToolbar = null;
        }
        this._dismissSelectionToolbar();
      },
      _updateSelectionToolbar: function() {
        var sel = window.getSelection();
        if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
          this._dismissSelectionToolbar();
          return;
        }
        if (this._mode !== "visual" && this._mode !== "hybrid") {
          this._dismissSelectionToolbar();
          return;
        }
        if (!this._selectionToolbarEnabled()) {
          this._dismissSelectionToolbar();
          return;
        }
        var range2 = sel.getRangeAt(0);
        if (!this._visualEl || !this._visualEl.contains(range2.startContainer)) {
          this._dismissSelectionToolbar();
          return;
        }
        this._showSelectionToolbar(range2);
      },
      _showSelectionToolbar: function(range2) {
        if (!this._selectionToolbarEl) {
          this._selectionToolbarEl = this._buildSelectionToolbar();
          document.body.appendChild(this._selectionToolbarEl);
        }
        this._syncSelectionToolbarState();
        var tb = this._selectionToolbarEl;
        var rect = range2.getBoundingClientRect();
        if (!rect.width && !rect.height) {
          this._dismissSelectionToolbar();
          return;
        }
        tb.style.visibility = "hidden";
        tb.style.left = "0px";
        tb.style.top = "0px";
        var tbRect = tb.getBoundingClientRect();
        var pageScrollX = window.scrollX || window.pageXOffset || 0;
        var pageScrollY = window.scrollY || window.pageYOffset || 0;
        var left = rect.left + rect.width / 2 - tbRect.width / 2;
        var minLeft = 8;
        var maxLeft = window.innerWidth - tbRect.width - 8;
        if (left < minLeft)
          left = minLeft;
        if (left > maxLeft)
          left = maxLeft;
        var top2 = rect.top - tbRect.height - 8;
        if (top2 < 8) {
          top2 = rect.bottom + 8;
        }
        tb.style.left = left + pageScrollX + "px";
        tb.style.top = top2 + pageScrollY + "px";
        tb.style.visibility = "visible";
      },
      _dismissSelectionToolbar: function() {
        if (this._selectionToolbarEl) {
          this._selectionToolbarEl.remove();
          this._selectionToolbarEl = null;
        }
      },
      _buildSelectionToolbar: function() {
        var self2 = this;
        var tb = document.createElement("div");
        tb.className = "leaf-selection-toolbar";
        function makeBtn(action, label, svg) {
          var btn = document.createElement("button");
          btn.type = "button";
          btn.setAttribute("aria-label", label);
          btn.setAttribute("data-selection-action", action);
          btn.innerHTML = svg;
          btn.addEventListener("mousedown", function(e) {
            e.preventDefault();
          });
          btn.addEventListener("touchstart", function(e) {
            e.preventDefault();
          }, { passive: false });
          btn.addEventListener("click", function(e) {
            e.preventDefault();
            self2._execSelectionAction(action);
          });
          tb.appendChild(btn);
          return btn;
        }
        makeBtn(
          "bold",
          "Bold",
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M6.5 3.5h4.25a3.25 3.25 0 0 1 1.83 5.94 3.5 3.5 0 0 1-1.83 6.56H6.5a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5Zm1.5 5.25h2.75a1.75 1.75 0 1 0 0-3.5H8v3.5Zm0 5.75h3a2 2 0 1 0 0-4H8v4Z"/></svg>'
        );
        makeBtn(
          "italic",
          "Italic",
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M8.5 4h7a.5.5 0 0 1 0 1h-2.6l-2.4 10h2a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h2.6l2.4-10h-2a.5.5 0 0 1 0-1Z"/></svg>'
        );
        makeBtn(
          "code",
          "Inline code",
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M7.78 6.22a.75.75 0 0 1 0 1.06L5.06 10l2.72 2.72a.75.75 0 1 1-1.06 1.06l-3.25-3.25a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Zm4.44 0a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 1 1-1.06-1.06L14.94 10l-2.72-2.72a.75.75 0 0 1 0-1.06Z"/></svg>'
        );
        makeBtn(
          "link",
          "Link",
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M11.13 7.05a.75.75 0 0 1 1.06 0 3.75 3.75 0 0 1 0 5.3l-2.5 2.5a3.75 3.75 0 1 1-5.3-5.3l1.1-1.1a.75.75 0 1 1 1.06 1.06l-1.1 1.1a2.25 2.25 0 1 0 3.18 3.18l2.5-2.5a2.25 2.25 0 0 0 0-3.18.75.75 0 0 1 0-1.06Zm-2.26 5.9a.75.75 0 0 1-1.06 0 3.75 3.75 0 0 1 0-5.3l2.5-2.5a3.75 3.75 0 1 1 5.3 5.3l-1.1 1.1a.75.75 0 1 1-1.06-1.06l1.1-1.1a2.25 2.25 0 1 0-3.18-3.18l-2.5 2.5a2.25 2.25 0 0 0 0 3.18.75.75 0 0 1 0 1.06Z"/></svg>'
        );
        return tb;
      },
      _syncSelectionToolbarState: function() {
        if (!this._selectionToolbarEl)
          return;
        var tb = this._selectionToolbarEl;
        try {
          var bold = document.queryCommandState("bold");
          var italic = document.queryCommandState("italic");
          tb.querySelectorAll("[data-selection-action]").forEach(function(btn) {
            var action = btn.dataset.selectionAction;
            var active = false;
            if (action === "bold")
              active = bold;
            else if (action === "italic")
              active = italic;
            btn.classList.toggle("is-active", active);
          });
        } catch (_e) {
        }
      },
      _execSelectionAction: function(action) {
        var self2 = this;
        if (action === "bold") {
          document.execCommand("bold", false, null);
        } else if (action === "italic") {
          document.execCommand("italic", false, null);
        } else if (action === "code") {
          this._wrapSelectionWith("code");
        } else if (action === "link") {
          var url = prompt("Enter URL:", "https://");
          if (url === null || url === "")
            return;
          document.execCommand("createLink", false, url);
        }
        this._syncSelectionToolbarState();
        if (this._visualEl) {
          this._visualEl.dispatchEvent(new Event("input", { bubbles: true }));
        }
      },
      // -- Link popover --
      _setupLinkPopover: function() {
        if (!this._visualEl)
          return;
        var self2 = this;
        this._linkPopoverEl = null;
        this._linkPopoverAnchor = null;
        this._imagePopoverEl = null;
        this._imagePopoverTarget = null;
        this._visualEl.addEventListener("click", function(e) {
          if (self2._readonly)
            return;
          var target = e.target;
          if (target.tagName && target.tagName.toLowerCase() === "img") {
            e.preventDefault();
            self2._dismissLinkPopover();
            self2._showImagePopover(target);
            return;
          }
          var node = target;
          var anchor = null;
          while (node && node !== self2._visualEl) {
            if (node.tagName && node.tagName.toLowerCase() === "a") {
              anchor = node;
              break;
            }
            node = node.parentNode;
          }
          if (anchor) {
            if (self2._mode !== "visual") {
              if (!e.metaKey && !e.ctrlKey) {
                e.preventDefault();
              }
              self2._dismissLinkPopover();
              self2._dismissImagePopover();
              return;
            }
            e.preventDefault();
            self2._dismissImagePopover();
            self2._showLinkPopover(anchor);
          } else {
            self2._dismissLinkPopover();
            self2._dismissImagePopover();
          }
        });
        this._onDocClickForPopover = function(e) {
          if (self2._linkPopoverEl && !self2._linkPopoverEl.contains(e.target) && !self2._visualEl.contains(e.target)) {
            self2._dismissLinkPopover();
          }
          if (self2._imagePopoverEl && !self2._imagePopoverEl.contains(e.target) && !self2._visualEl.contains(e.target)) {
            self2._dismissImagePopover();
          }
        };
        document.addEventListener("mousedown", this._onDocClickForPopover);
      },
      _showLinkPopover: function(anchorEl) {
        this._dismissLinkPopover();
        this._linkPopoverAnchor = anchorEl;
        var href = anchorEl.getAttribute("href") || "";
        var self2 = this;
        var pop = document.createElement("div");
        pop.className = "leaf-link-popover";
        var linkIcon = document.createElement("span");
        linkIcon.style.cssText = "display:flex;align-items:center;opacity:0.5;flex-shrink:0;";
        linkIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="13" height="13"><path fill-rule="evenodd" d="M8.914 6.025a.75.75 0 0 1 1.06 0 3.5 3.5 0 0 1 0 4.95l-2 2a3.5 3.5 0 0 1-5.396-4.402.75.75 0 0 1 1.251.827 2 2 0 0 0 3.085 2.514l2-2a2 2 0 0 0 0-2.828.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.086 9.975a.75.75 0 0 1-1.06 0 3.5 3.5 0 0 1 0-4.95l2-2a3.5 3.5 0 0 1 5.396 4.402.75.75 0 0 1-1.251-.827 2 2 0 0 0-3.085-2.514l-2 2a2 2 0 0 0 0 2.828.75.75 0 0 1 0 1.06Z" clip-rule="evenodd"/></svg>';
        pop.appendChild(linkIcon);
        var urlLink = document.createElement("a");
        urlLink.href = href;
        urlLink.target = "_blank";
        urlLink.rel = "noopener";
        urlLink.textContent = href || "(no url)";
        urlLink.title = href;
        pop.appendChild(urlLink);
        var actions = document.createElement("span");
        actions.className = "leaf-popover-actions";
        var editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.title = "Edit link";
        editBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="13" height="13"><path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L3.05 10.476a.75.75 0 0 0-.188.335l-.95 3.507a.75.75 0 0 0 .92.92l3.507-.95a.75.75 0 0 0 .335-.188l7.963-7.963a1.75 1.75 0 0 0 0-2.475l-.149-.149ZM11.72 3.22a.25.25 0 0 1 .354 0l.149.149a.25.25 0 0 1 0 .354L5.106 10.84l-1.575.427.427-1.575 7.11-7.11.652-.362Z"/></svg>';
        editBtn.addEventListener("mousedown", function(e) {
          e.preventDefault();
        });
        editBtn.addEventListener("click", function(e) {
          e.preventDefault();
          e.stopPropagation();
          var newUrl = prompt("Edit URL:", href);
          if (newUrl === null)
            return;
          if (newUrl === "") {
            self2._unwrapLink(anchorEl);
            self2._dismissLinkPopover();
          } else {
            anchorEl.setAttribute("href", newUrl);
            urlLink.href = newUrl;
            urlLink.textContent = newUrl;
            urlLink.title = newUrl;
            href = newUrl;
          }
          self2._debouncedPushVisualChange();
        });
        actions.appendChild(editBtn);
        var d1 = document.createElement("span");
        d1.className = "leaf-popover-divider";
        actions.appendChild(d1);
        var removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.title = "Remove link";
        removeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="13" height="13"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L6.94 8l-1.72 1.72a.75.75 0 1 0 1.06 1.06L8 9.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L9.06 8l1.72-1.72a.75.75 0 0 0-1.06-1.06L8 6.94 6.28 5.22Z"/></svg>';
        removeBtn.addEventListener("mousedown", function(e) {
          e.preventDefault();
        });
        removeBtn.addEventListener("click", function(e) {
          e.preventDefault();
          e.stopPropagation();
          self2._unwrapLink(anchorEl);
          self2._dismissLinkPopover();
          self2._debouncedPushVisualChange();
        });
        actions.appendChild(removeBtn);
        pop.appendChild(actions);
        this.el.style.position = "relative";
        var editorRect = this.el.getBoundingClientRect();
        var anchorRect = anchorEl.getBoundingClientRect();
        pop.style.left = anchorRect.left - editorRect.left + "px";
        pop.style.top = anchorRect.bottom - editorRect.top + 8 + "px";
        this.el.appendChild(pop);
        this._linkPopoverEl = pop;
      },
      _dismissLinkPopover: function() {
        if (this._linkPopoverEl) {
          this._linkPopoverEl.remove();
          this._linkPopoverEl = null;
          this._linkPopoverAnchor = null;
        }
      },
      _unwrapLink: function(anchorEl) {
        var parent = anchorEl.parentNode;
        while (anchorEl.firstChild) {
          parent.insertBefore(anchorEl.firstChild, anchorEl);
        }
        parent.removeChild(anchorEl);
      },
      // -- Image URL dialog --
      _openImageUrlDialog: function() {
        this._dismissImageUrlDialog();
        var self2 = this;
        var savedRange = null;
        if (this._mode === "visual" && this._visualEl) {
          var sel = window.getSelection();
          if (sel.rangeCount > 0) {
            savedRange = sel.getRangeAt(0).cloneRange();
          }
        }
        var dialog = document.createElement("div");
        dialog.className = "leaf-image-url-dialog";
        var urlLabel = document.createElement("label");
        urlLabel.textContent = "Image URL";
        dialog.appendChild(urlLabel);
        var urlInput = document.createElement("input");
        urlInput.type = "text";
        urlInput.placeholder = "https://example.com/image.jpg";
        urlInput.addEventListener("mousedown", function(e) {
          e.stopPropagation();
        });
        dialog.appendChild(urlInput);
        var altLabel = document.createElement("label");
        altLabel.textContent = "Alt text (optional)";
        dialog.appendChild(altLabel);
        var altInput = document.createElement("input");
        altInput.type = "text";
        altInput.placeholder = "Describe the image";
        altInput.addEventListener("mousedown", function(e) {
          e.stopPropagation();
        });
        dialog.appendChild(altInput);
        var actions = document.createElement("div");
        actions.className = "leaf-image-url-actions";
        var cancelBtn = document.createElement("button");
        cancelBtn.type = "button";
        cancelBtn.className = "leaf-image-url-cancel";
        cancelBtn.textContent = "Cancel";
        cancelBtn.addEventListener("click", function() {
          self2._dismissImageUrlDialog();
        });
        actions.appendChild(cancelBtn);
        var insertBtn = document.createElement("button");
        insertBtn.type = "button";
        insertBtn.className = "leaf-image-url-insert";
        insertBtn.textContent = "Insert";
        insertBtn.addEventListener("click", function() {
          var url = urlInput.value.trim();
          if (!url)
            return;
          var alt = altInput.value.trim();
          self2._dismissImageUrlDialog();
          self2._insertImageByUrl(url, alt, savedRange);
        });
        actions.appendChild(insertBtn);
        dialog.appendChild(actions);
        var handleKey = function(e) {
          if (e.key === "Enter") {
            e.preventDefault();
            insertBtn.click();
          } else if (e.key === "Escape") {
            e.preventDefault();
            self2._dismissImageUrlDialog();
          }
        };
        urlInput.addEventListener("keydown", handleKey);
        altInput.addEventListener("keydown", handleKey);
        var splitBtn = this.el.querySelector("[data-image-split-btn]");
        if (splitBtn) {
          var btnRect = splitBtn.getBoundingClientRect();
          dialog.style.left = btnRect.left + "px";
          dialog.style.top = btnRect.bottom + 4 + "px";
        }
        var backdrop = document.createElement("div");
        backdrop.className = "leaf-image-url-backdrop";
        backdrop.addEventListener("click", function() {
          self2._dismissImageUrlDialog();
        });
        document.body.appendChild(backdrop);
        this._imageUrlBackdrop = backdrop;
        this.pushEventTo(this.el, "media_ui_opened", { editor_id: this._editorId });
        document.body.appendChild(dialog);
        this._imageUrlDialog = dialog;
        urlInput.focus();
      },
      _dismissImageUrlDialog: function() {
        if (this._imageUrlDialog) {
          this._imageUrlDialog.remove();
          this._imageUrlDialog = null;
        }
        if (this._imageUrlBackdrop) {
          this._imageUrlBackdrop.remove();
          this._imageUrlBackdrop = null;
        }
        this.pushEventTo(this.el, "media_ui_closed", { editor_id: this._editorId });
      },
      _insertImageByUrl: function(url, alt, savedRange) {
        var escapedAlt = (alt || "").replace(/"/g, "&quot;");
        if (this._mode === "visual" && this._visualEl) {
          this._visualEl.focus();
          if (savedRange) {
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(savedRange);
          }
          var imgHtml = '<img src="' + url + '" alt="' + escapedAlt + '" draggable="true" />';
          document.execCommand("insertHTML", false, imgHtml);
          this._debouncedPushVisualChange();
        } else if (this._mode === "markdown") {
          var gid = this._editorId.replace(/-/g, "_") + "_markdown";
          var ins = window["markdownEditorInsert_" + gid];
          if (ins) {
            var md = "![" + (alt || "") + "](" + url + ")";
            ins(md);
          }
        }
      },
      // -- Image selection + resize + popover --
      // Alignment lives on the <figure> when the image is captioned, else
      // directly on the <img>; both serialize as a data-align attribute.
      _imageAlignTarget: function(imgEl) {
        var fig = imgEl.closest && imgEl.closest("figure");
        return fig || imgEl;
      },
      _setImageAlign: function(imgEl, align) {
        var t = this._imageAlignTarget(imgEl);
        if (align)
          t.setAttribute("data-align", align);
        else
          t.removeAttribute("data-align");
      },
      _imageCaption: function(imgEl) {
        var fig = imgEl.closest && imgEl.closest("figure");
        if (!fig)
          return "";
        var cap = fig.querySelector("figcaption");
        return cap ? cap.textContent : "";
      },
      // Set (or clear) a caption, wrapping/unwrapping a <figure> as needed and
      // carrying any alignment across the boundary.
      _setImageCaption: function(imgEl, text) {
        text = text || "";
        var fig = imgEl.closest && imgEl.closest("figure");
        if (text.trim()) {
          if (!fig) {
            fig = document.createElement("figure");
            var align = imgEl.getAttribute("data-align");
            if (align) {
              fig.setAttribute("data-align", align);
              imgEl.removeAttribute("data-align");
            }
            if (imgEl.parentNode) {
              imgEl.parentNode.insertBefore(fig, imgEl);
              fig.appendChild(imgEl);
            }
          }
          var cap = fig.querySelector("figcaption");
          if (!cap) {
            cap = document.createElement("figcaption");
            fig.appendChild(cap);
          }
          cap.textContent = text;
        } else if (fig) {
          var falign = fig.getAttribute("data-align");
          if (falign)
            imgEl.setAttribute("data-align", falign);
          if (fig.parentNode)
            fig.parentNode.insertBefore(imgEl, fig);
          fig.remove();
        }
        this._debouncedPushVisualChange();
      },
      _showImagePopover: function(imgEl) {
        this._dismissImagePopover(true);
        this._imagePopoverTarget = imgEl;
        var src = imgEl.getAttribute("src") || "";
        var alt = imgEl.getAttribute("alt") || "";
        var self2 = this;
        imgEl.classList.add("leaf-img-selected");
        this._resizeHandles = [];
        var corners = ["nw", "ne", "sw", "se"];
        corners.forEach(function(corner) {
          var handle = document.createElement("div");
          handle.className = "leaf-resize-handle leaf-resize-handle--" + corner;
          handle.setAttribute("data-corner", corner);
          handle.addEventListener("mousedown", function(e) {
            e.preventDefault();
            e.stopPropagation();
            self2._startResize(e, imgEl, corner);
          });
          self2.el.appendChild(handle);
          self2._resizeHandles.push(handle);
        });
        this._positionResizeHandles(imgEl);
        var pop = document.createElement("div");
        pop.className = "leaf-link-popover";
        var imgIcon = document.createElement("span");
        imgIcon.style.cssText = "display:flex;align-items:center;opacity:0.5;flex-shrink:0;";
        imgIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="13" height="13"><path fill-rule="evenodd" d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm10.5 5.707L10.354 7.56a.5.5 0 0 0-.708 0L6.5 10.707 5.354 9.56a.5.5 0 0 0-.708 0L3.5 10.707V4a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v5.707ZM11 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clip-rule="evenodd"/></svg>';
        pop.appendChild(imgIcon);
        var altInput = document.createElement("input");
        altInput.type = "text";
        altInput.value = alt;
        altInput.placeholder = "Alt text...";
        altInput.title = "Image alt text";
        altInput.style.cssText = [
          "background: color-mix(in oklab, var(--color-base-content, #1f2937) 8%, transparent);",
          "border: none; border-radius: 0.25rem; padding: 0.2rem 0.4rem;",
          "font-size: 0.8125rem; color: inherit; outline: none; width: 160px;"
        ].join("");
        altInput.addEventListener("mousedown", function(e) {
          e.stopPropagation();
        });
        altInput.addEventListener("input", function() {
          imgEl.setAttribute("alt", altInput.value);
        });
        altInput.addEventListener("keydown", function(e) {
          if (e.key === "Escape") {
            self2._dismissImagePopover();
          }
        });
        pop.appendChild(altInput);
        var capInput = document.createElement("input");
        capInput.type = "text";
        capInput.value = self2._imageCaption(imgEl);
        capInput.placeholder = "Caption...";
        capInput.title = "Image caption";
        capInput.style.cssText = [
          "background: color-mix(in oklab, var(--color-base-content, #1f2937) 8%, transparent);",
          "border: none; border-radius: 0.25rem; padding: 0.2rem 0.4rem;",
          "font-size: 0.8125rem; color: inherit; outline: none; width: 130px;"
        ].join("");
        capInput.addEventListener("mousedown", function(e) {
          e.stopPropagation();
        });
        capInput.addEventListener("input", function() {
          self2._setImageCaption(imgEl, capInput.value);
        });
        capInput.addEventListener("keydown", function(e) {
          if (e.key === "Escape")
            self2._dismissImagePopover();
        });
        pop.appendChild(capInput);
        var alignWrap = document.createElement("span");
        alignWrap.style.cssText = "display:inline-flex;gap:2px;";
        [["left", "L"], ["center", "C"], ["right", "R"]].forEach(function(a) {
          var ab = document.createElement("button");
          ab.type = "button";
          ab.title = "Align " + a[0];
          ab.textContent = a[1];
          ab.style.cssText = "border:none;background:none;cursor:pointer;color:inherit;font-size:0.7rem;font-weight:700;padding:0.125rem 0.3rem;border-radius:0.25rem;";
          ab.addEventListener("mousedown", function(e) {
            e.preventDefault();
          });
          ab.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            var t = self2._imageAlignTarget(imgEl);
            var cur = t.getAttribute("data-align");
            self2._setImageAlign(imgEl, cur === a[0] ? "" : a[0]);
            self2._debouncedPushVisualChange();
          });
          alignWrap.appendChild(ab);
        });
        pop.appendChild(alignWrap);
        var actions = document.createElement("span");
        actions.className = "leaf-popover-actions";
        var openBtn = document.createElement("button");
        openBtn.type = "button";
        openBtn.title = "Open image";
        openBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="13" height="13"><path d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06l2.97-2.97H3.75a.75.75 0 0 1 0-1.5h7.44L8.22 4.03a.75.75 0 0 1 0-1.06Z"/></svg>';
        openBtn.addEventListener("mousedown", function(e) {
          e.preventDefault();
        });
        openBtn.addEventListener("click", function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (src)
            window.open(src, "_blank");
        });
        actions.appendChild(openBtn);
        var editSrcBtn = document.createElement("button");
        editSrcBtn.type = "button";
        editSrcBtn.title = "Edit image URL";
        editSrcBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="13" height="13"><path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L3.05 10.476a.75.75 0 0 0-.188.335l-.95 3.507a.75.75 0 0 0 .92.92l3.507-.95a.75.75 0 0 0 .335-.188l7.963-7.963a1.75 1.75 0 0 0 0-2.475l-.149-.149ZM11.72 3.22a.25.25 0 0 1 .354 0l.149.149a.25.25 0 0 1 0 .354L5.106 10.84l-1.575.427.427-1.575 7.11-7.11.652-.362Z"/></svg>';
        editSrcBtn.addEventListener("mousedown", function(e) {
          e.preventDefault();
        });
        editSrcBtn.addEventListener("click", function(e) {
          e.preventDefault();
          e.stopPropagation();
          var newSrc = prompt("Edit image URL:", src);
          if (newSrc === null) {
            self2._showImagePopover(imgEl);
            return;
          }
          newSrc = newSrc.trim();
          if (newSrc) {
            imgEl.setAttribute("src", newSrc);
            src = newSrc;
          }
          self2._showImagePopover(imgEl);
        });
        actions.appendChild(editSrcBtn);
        var d1 = document.createElement("span");
        d1.className = "leaf-popover-divider";
        actions.appendChild(d1);
        var removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.title = "Remove image";
        removeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="13" height="13"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L6.94 8l-1.72 1.72a.75.75 0 1 0 1.06 1.06L8 9.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L9.06 8l1.72-1.72a.75.75 0 0 0-1.06-1.06L8 6.94 6.28 5.22Z"/></svg>';
        removeBtn.addEventListener("mousedown", function(e) {
          e.preventDefault();
        });
        removeBtn.addEventListener("click", function(e) {
          e.preventDefault();
          e.stopPropagation();
          imgEl.remove();
          self2._dismissImagePopover();
          self2._debouncedPushVisualChange();
        });
        actions.appendChild(removeBtn);
        pop.appendChild(actions);
        this.el.style.position = "relative";
        var editorRect = this.el.getBoundingClientRect();
        var imgRect = imgEl.getBoundingClientRect();
        pop.style.left = imgRect.left - editorRect.left + "px";
        pop.style.top = imgRect.bottom - editorRect.top + 8 + "px";
        this.el.appendChild(pop);
        this._imagePopoverEl = pop;
        setTimeout(function() {
          altInput.focus();
          altInput.select();
        }, 50);
      },
      _positionResizeHandles: function(imgEl) {
        if (!this._resizeHandles || !imgEl)
          return;
        var editorRect = this.el.getBoundingClientRect();
        var imgRect = imgEl.getBoundingClientRect();
        var ox = imgRect.left - editorRect.left;
        var oy = imgRect.top - editorRect.top;
        var w = imgRect.width;
        var h = imgRect.height;
        var hs = 5;
        var positions = {
          nw: { left: ox - hs, top: oy - hs },
          ne: { left: ox + w - hs, top: oy - hs },
          sw: { left: ox - hs, top: oy + h - hs },
          se: { left: ox + w - hs, top: oy + h - hs }
        };
        this._resizeHandles.forEach(function(handle) {
          var corner = handle.getAttribute("data-corner");
          var pos = positions[corner];
          handle.style.left = pos.left + "px";
          handle.style.top = pos.top + "px";
        });
      },
      _startResize: function(e, imgEl, corner) {
        var self2 = this;
        var startX = e.clientX;
        var startY = e.clientY;
        var startW = imgEl.offsetWidth;
        var startH = imgEl.offsetHeight;
        var aspect = startW / startH;
        function onMove(ev) {
          ev.preventDefault();
          var dx = ev.clientX - startX;
          var dy = ev.clientY - startY;
          var newW;
          if (corner === "se") {
            newW = Math.max(50, startW + dx);
          } else if (corner === "sw") {
            newW = Math.max(50, startW - dx);
          } else if (corner === "ne") {
            newW = Math.max(50, startW + dx);
          } else {
            newW = Math.max(50, startW - dx);
          }
          var newH = newW / aspect;
          imgEl.style.width = newW + "px";
          imgEl.style.height = newH + "px";
          imgEl.setAttribute("width", Math.round(newW));
          imgEl.setAttribute("height", Math.round(newH));
          self2._positionResizeHandles(imgEl);
          if (self2._imagePopoverEl) {
            var editorRect = self2.el.getBoundingClientRect();
            var imgRect = imgEl.getBoundingClientRect();
            self2._imagePopoverEl.style.left = imgRect.left - editorRect.left + "px";
            self2._imagePopoverEl.style.top = imgRect.bottom - editorRect.top + 8 + "px";
          }
        }
        function onUp() {
          document.removeEventListener("mousemove", onMove);
          document.removeEventListener("mouseup", onUp);
        }
        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
      },
      // -- Block & image drag-and-drop reordering --
      _setupImageDragAndDrop: function() {
        if (!this._visualEl)
          return;
        var self2 = this;
        this._dragIndicator = null;
        this._dragSourceBlock = null;
        this._dragDropTarget = null;
        this._dragHandle = null;
        this._dragHandleBlock = null;
        var imgs = this._visualEl.querySelectorAll("img");
        for (var i = 0; i < imgs.length; i++) {
          imgs[i].setAttribute("draggable", "true");
        }
        this._imgObserver = new MutationObserver(function(mutations) {
          mutations.forEach(function(m) {
            m.addedNodes.forEach(function(node) {
              if (node.nodeType !== Node.ELEMENT_NODE)
                return;
              if (node.tagName && node.tagName.toLowerCase() === "img") {
                node.setAttribute("draggable", "true");
              }
              var childImgs = node.querySelectorAll && node.querySelectorAll("img");
              if (childImgs) {
                for (var j = 0; j < childImgs.length; j++) {
                  childImgs[j].setAttribute("draggable", "true");
                }
              }
            });
          });
        });
        this._imgObserver.observe(this._visualEl, { childList: true, subtree: true });
        var handle = this._visualWrapper.querySelector("[data-drag-handle]");
        this._dragHandle = handle;
        this._visualEl.addEventListener("mousemove", function(e) {
          if (self2._readonly || self2._dragSourceBlock)
            return;
          var block = self2._getHoveredBlock(e.target);
          if (!block)
            return;
          if (block !== self2._dragHandleBlock || !self2._dragHandleBlock.parentNode) {
            self2._dragHandleBlock = block;
            self2._positionDragHandle(block);
          }
        });
        this._visualWrapper.addEventListener("mousemove", function(e) {
          if (self2._readonly || self2._dragSourceBlock)
            return;
          var hoveredBlock = self2._getHoveredBlock(e.target);
          if (hoveredBlock)
            return;
          if (e.target.closest("[data-drag-handle]"))
            return;
          var wrapperRect = self2._visualWrapper.getBoundingClientRect();
          var mouseY = e.clientY - wrapperRect.top;
          var nearestBlock = self2._findBlockAtY(mouseY);
          if (nearestBlock && nearestBlock !== self2._dragHandleBlock) {
            self2._dragHandleBlock = nearestBlock;
            self2._positionDragHandle(nearestBlock);
          }
        });
        this._visualWrapper.addEventListener("mouseleave", function(e) {
          if (e.relatedTarget && e.relatedTarget.matches("[data-drag-handle]"))
            return;
          if (!self2._dragSourceBlock && !self2._imagePopoverTarget) {
            self2._dragHandleBlock = null;
            self2._dragHandle.style.display = "none";
          }
        });
        this._visualWrapper.addEventListener("mousedown", function(e) {
          if (!e.target.closest("[data-drag-handle]"))
            return;
          var block = self2._dragHandleBlock;
          if (!block || self2._readonly)
            return;
          e.preventDefault();
          e.stopPropagation();
          self2._dismissImagePopover();
          self2._dismissLinkPopover();
          var startX = e.clientX;
          var startY = e.clientY;
          var moved = false;
          self2._dragSourceBlock = block;
          block.classList.add("leaf-dragging");
          self2._dragHandle.style.cursor = "grabbing";
          self2._createDropIndicator();
          function onMouseMove(ev) {
            ev.preventDefault();
            if (!moved && (Math.abs(ev.clientY - startY) > 4 || Math.abs(ev.clientX - startX) > 4)) {
              moved = true;
            }
            var target = self2._findDropTarget(ev.clientY);
            if (target) {
              self2._dragDropTarget = target;
              self2._positionDropIndicator(target);
            }
          }
          function onMouseUp(ev) {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            self2._dragHandle.style.cursor = "";
            if (!moved) {
              self2._cleanupDrag();
              self2._openBlockMenu(block);
              return;
            }
            if (self2._dragSourceBlock && self2._dragDropTarget) {
              var sourceEl = self2._dragSourceBlock;
              var targetEl = self2._dragDropTarget.element;
              var position = self2._dragDropTarget.position;
              var refNext = targetEl.nextSibling;
              var refParent = targetEl.parentNode;
              var targetIsSource = sourceEl === targetEl;
              sourceEl.remove();
              if (targetIsSource) {
                if (refNext && refNext.parentNode) {
                  refParent.insertBefore(sourceEl, refNext);
                } else if (refParent) {
                  refParent.appendChild(sourceEl);
                }
              } else if (!targetEl.parentNode) {
                if (refNext && refNext.parentNode) {
                  refParent.insertBefore(sourceEl, refNext);
                } else if (refParent) {
                  refParent.appendChild(sourceEl);
                }
              } else if (position === "before") {
                targetEl.parentNode.insertBefore(sourceEl, targetEl);
              } else {
                if (targetEl.nextSibling) {
                  targetEl.parentNode.insertBefore(sourceEl, targetEl.nextSibling);
                } else {
                  targetEl.parentNode.appendChild(sourceEl);
                }
              }
              self2._debouncedPushVisualChange();
            }
            self2._cleanupDrag();
          }
          document.addEventListener("mousemove", onMouseMove);
          document.addEventListener("mouseup", onMouseUp);
        });
        this._visualEl.addEventListener("dragstart", function(e) {
          var img = e.target;
          if (!img || img.tagName.toLowerCase() !== "img")
            return;
          if (self2._readonly) {
            e.preventDefault();
            return;
          }
          if (self2._imagePopoverTarget === img) {
            e.preventDefault();
            return;
          }
          self2._dismissImagePopover();
          self2._dismissLinkPopover();
          var block = self2._getContainingBlock(img);
          self2._dragSourceBlock = block || img;
          (block || img).classList.add("leaf-dragging");
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("text/plain", "leaf-image-drag");
          self2._createDropIndicator();
        });
        this._visualEl.addEventListener("dragover", function(e) {
          if (!self2._dragSourceBlock)
            return;
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
          var target = self2._findDropTarget(e.clientY);
          if (target) {
            self2._dragDropTarget = target;
            self2._positionDropIndicator(target);
          }
        });
        this._visualEl.addEventListener("dragleave", function(e) {
          if (!self2._visualEl.contains(e.relatedTarget)) {
            if (self2._dragIndicator)
              self2._dragIndicator.style.display = "none";
            self2._dragDropTarget = null;
          }
        });
        this._visualEl.addEventListener("drop", function(e) {
          e.preventDefault();
          if (!self2._dragSourceBlock || !self2._dragDropTarget) {
            self2._cleanupDrag();
            return;
          }
          var sourceEl = self2._dragSourceBlock;
          var targetEl = self2._dragDropTarget.element;
          var position = self2._dragDropTarget.position;
          var refNext = targetEl.nextSibling;
          var refParent = targetEl.parentNode;
          var targetIsSource = sourceEl === targetEl;
          sourceEl.remove();
          if (targetIsSource) {
            if (refNext && refNext.parentNode) {
              refParent.insertBefore(sourceEl, refNext);
            } else if (refParent) {
              refParent.appendChild(sourceEl);
            }
          } else if (!targetEl.parentNode) {
            if (refNext && refNext.parentNode) {
              refParent.insertBefore(sourceEl, refNext);
            } else if (refParent) {
              refParent.appendChild(sourceEl);
            }
          } else if (position === "before") {
            targetEl.parentNode.insertBefore(sourceEl, targetEl);
          } else {
            if (targetEl.nextSibling) {
              targetEl.parentNode.insertBefore(sourceEl, targetEl.nextSibling);
            } else {
              targetEl.parentNode.appendChild(sourceEl);
            }
          }
          self2._cleanupDrag();
          self2._debouncedPushVisualChange();
        });
        this._visualEl.addEventListener("dragend", function() {
          self2._cleanupDrag();
        });
      },
      _getHoveredBlock: function(target) {
        var node = target;
        while (node && node.parentNode !== this._visualEl) {
          node = node.parentNode;
        }
        if (!node || node.nodeType !== Node.ELEMENT_NODE)
          return null;
        if (!this._isBlockTag(node))
          return null;
        return node;
      },
      _getContainingBlock: function(node) {
        var current = node;
        while (current && current.parentNode !== this._visualEl) {
          current = current.parentNode;
        }
        return current;
      },
      _isBlockTag: function(el) {
        var BLOCK_TAGS = {
          p: true,
          h1: true,
          h2: true,
          h3: true,
          h4: true,
          h5: true,
          h6: true,
          blockquote: true,
          pre: true,
          ul: true,
          ol: true,
          hr: true,
          img: true,
          div: true,
          figure: true,
          table: true
        };
        return el && el.tagName && BLOCK_TAGS[el.tagName.toLowerCase()];
      },
      _findBlockAtY: function(y) {
        var children = this._visualEl.childNodes;
        var best = null;
        var bestDist = Infinity;
        var wrapperRect = this._visualWrapper.getBoundingClientRect();
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          if (child.nodeType !== Node.ELEMENT_NODE)
            continue;
          if (!this._isBlockTag(child))
            continue;
          var rect = child.getBoundingClientRect();
          var marginTop = parseFloat(window.getComputedStyle(child).marginTop) || 0;
          var blockTop = rect.top - wrapperRect.top - marginTop;
          var blockBottom = rect.bottom - wrapperRect.top;
          if (y >= blockTop && y <= blockBottom) {
            return child;
          }
          var dist = y < blockTop ? blockTop - y : y - blockBottom;
          if (dist < bestDist) {
            bestDist = dist;
            best = child;
          }
        }
        return best;
      },
      _positionDragHandle: function(block) {
        if (!this._dragHandle)
          return;
        var wrapperRect = this._visualWrapper.getBoundingClientRect();
        var blockRect = block.getBoundingClientRect();
        var handleHeight = this._dragHandle.offsetHeight || 28;
        var top2 = blockRect.top - wrapperRect.top;
        if (blockRect.height < handleHeight) {
          top2 += (blockRect.height - handleHeight) / 2;
        }
        var left = blockRect.left - wrapperRect.left - 30;
        this._dragHandle.style.top = top2 + "px";
        this._dragHandle.style.left = Math.max(0, left) + "px";
        this._dragHandle.style.display = "flex";
      },
      _createDropIndicator: function() {
        if (this._dragIndicator)
          this._dragIndicator.remove();
        var indicator = document.createElement("div");
        indicator.className = "leaf-drop-indicator";
        indicator.style.display = "none";
        this._visualWrapper.appendChild(indicator);
        this._dragIndicator = indicator;
      },
      // -- Code block tools (language label + copy button) --
      _setupCodeBlockTools: function() {
        if (!this._visualEl || !this._visualWrapper)
          return;
        var self2 = this;
        this._visualEl.addEventListener("mouseover", function(e) {
          var pre = e.target.closest && e.target.closest("pre");
          if (pre && self2._visualEl.contains(pre))
            self2._showCodeTools(pre);
        });
        this._visualEl.addEventListener("mouseleave", function() {
          self2._hideCodeTools();
        });
      },
      _ensureCodeTools: function() {
        if (this._codeTools)
          return this._codeTools;
        var self2 = this;
        var bar = document.createElement("div");
        bar.className = "leaf-code-tools";
        bar.setAttribute("contenteditable", "false");
        bar.style.cssText = "position:absolute;z-index:20;display:none;align-items:center;gap:0.375rem;padding:0.125rem 0.25rem;border-radius:0.375rem;background:color-mix(in oklab, var(--color-base-content,#1f2937) 8%, transparent);font-size:0.7rem;user-select:none;";
        var label = document.createElement("button");
        label.type = "button";
        label.title = "Set language";
        label.style.cssText = "border:none;background:none;cursor:pointer;color:inherit;opacity:0.7;text-transform:uppercase;letter-spacing:0.03em;font-size:0.7rem;padding:0;";
        label.addEventListener("mousedown", function(e) {
          e.preventDefault();
        });
        label.addEventListener("click", function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (!self2._codeToolsPre)
            return;
          var cur = self2._codeToolsPre.getAttribute("data-language") || "";
          var lang = window.prompt("Language (e.g. javascript):", cur);
          if (lang === null)
            return;
          lang = lang.trim();
          if (lang)
            self2._codeToolsPre.setAttribute("data-language", lang);
          else
            self2._codeToolsPre.removeAttribute("data-language");
          label.textContent = lang || "code";
          self2._debouncedPushVisualChange();
        });
        bar.appendChild(label);
        var copy = document.createElement("button");
        copy.type = "button";
        copy.textContent = "Copy";
        copy.style.cssText = "border:none;background:none;cursor:pointer;color:inherit;font-size:0.7rem;padding:0.125rem 0.25rem;border-radius:0.25rem;";
        copy.addEventListener("mousedown", function(e) {
          e.preventDefault();
        });
        copy.addEventListener("click", function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (self2._codeToolsPre) {
            self2._copyText(self2._codeToolsPre.textContent || "");
            copy.textContent = "Copied";
            setTimeout(function() {
              copy.textContent = "Copy";
            }, 1200);
          }
        });
        bar.appendChild(copy);
        bar.addEventListener("mouseover", function(e) {
          e.stopPropagation();
        });
        this._visualWrapper.appendChild(bar);
        this._codeToolsLabel = label;
        this._codeTools = bar;
        return bar;
      },
      _showCodeTools: function(pre) {
        var bar = this._ensureCodeTools();
        this._codeToolsPre = pre;
        var lang = pre.getAttribute("data-language") || "";
        if (!lang) {
          var c = pre.querySelector("code");
          if (c) {
            var m = c.className.match(/language-(\S+)/);
            if (m)
              lang = m[1];
          }
        }
        this._codeToolsLabel.textContent = lang || "code";
        var wrapperRect = this._visualWrapper.getBoundingClientRect();
        var preRect = pre.getBoundingClientRect();
        this._visualWrapper.style.position = "relative";
        bar.style.display = "flex";
        bar.style.top = preRect.top - wrapperRect.top + 4 + "px";
        bar.style.left = Math.max(
          0,
          preRect.right - wrapperRect.left - bar.offsetWidth - 8
        ) + "px";
      },
      _hideCodeTools: function() {
        if (this._codeTools)
          this._codeTools.style.display = "none";
        this._codeToolsPre = null;
      },
      _copyText: function(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).catch(function() {
          });
          return;
        }
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
        } catch (e) {
        }
        document.body.removeChild(ta);
      },
      _findDropTarget: function(clientY) {
        var children = this._visualEl.childNodes;
        var blocks = [];
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          if (child.nodeType !== Node.ELEMENT_NODE)
            continue;
          if (this._isBlockTag(child)) {
            blocks.push(child);
          }
        }
        if (blocks.length === 0)
          return null;
        var best = null;
        var bestDist = Infinity;
        for (var j = 0; j < blocks.length; j++) {
          var block = blocks[j];
          if (block === this._dragSourceBlock)
            continue;
          var rect = block.getBoundingClientRect();
          var distTop = Math.abs(clientY - rect.top);
          if (distTop < bestDist) {
            bestDist = distTop;
            best = { element: block, position: "before" };
          }
          var distBottom = Math.abs(clientY - rect.bottom);
          if (distBottom < bestDist) {
            bestDist = distBottom;
            best = { element: block, position: "after" };
          }
        }
        for (var k = 0; k < blocks.length; k++) {
          if (blocks[k] !== this._dragSourceBlock) {
            var firstRect = blocks[k].getBoundingClientRect();
            if (clientY < firstRect.top) {
              return { element: blocks[k], position: "before" };
            }
            break;
          }
        }
        for (var l = blocks.length - 1; l >= 0; l--) {
          if (blocks[l] !== this._dragSourceBlock) {
            var lastRect = blocks[l].getBoundingClientRect();
            if (clientY > lastRect.bottom) {
              return { element: blocks[l], position: "after" };
            }
            break;
          }
        }
        return best;
      },
      _positionDropIndicator: function(target) {
        if (!this._dragIndicator || !target)
          return;
        var wrapperRect = this._visualWrapper.getBoundingClientRect();
        var blockRect = target.element.getBoundingClientRect();
        var y;
        if (target.position === "before") {
          y = blockRect.top - wrapperRect.top - 2;
        } else {
          y = blockRect.bottom - wrapperRect.top + 1;
        }
        y = Math.max(0, Math.min(y, this._visualWrapper.offsetHeight));
        this._dragIndicator.style.top = y + "px";
        this._dragIndicator.style.display = "block";
      },
      _cleanupDrag: function() {
        var movedBlock = this._dragSourceBlock;
        if (movedBlock) {
          movedBlock.classList.remove("leaf-dragging");
          this._dragSourceBlock = null;
        }
        if (this._dragIndicator) {
          this._dragIndicator.remove();
          this._dragIndicator = null;
        }
        this._dragDropTarget = null;
        if (movedBlock && movedBlock.parentNode === this._visualEl) {
          this._dragHandleBlock = movedBlock;
          this._positionDragHandle(movedBlock);
        } else {
          this._dragHandleBlock = null;
          if (this._dragHandle) {
            this._dragHandle.style.display = "none";
          }
        }
      },
      // -- Block handle menu (convert type / duplicate / delete) --
      _openBlockMenu: function(block) {
        this._closeBlockMenu();
        if (!block || !this._dragHandle || !this._visualWrapper)
          return;
        var self2 = this;
        var menu = document.createElement("div");
        menu.className = "leaf-block-menu";
        menu.style.cssText = "position:absolute;z-index:60;background:var(--color-base-100,#fff);color:var(--color-base-content,#1f2937);border:1px solid var(--color-base-300,#d1d5db);border-radius:0.5rem;box-shadow:0 6px 20px rgba(0,0,0,0.18),0 1px 4px rgba(0,0,0,0.10);padding:0.25rem;min-width:160px;font-size:0.8rem;";
        var items = [
          { label: "Text", fn: function() {
            self2._convertBlock(block, "p");
          } },
          { label: "Heading 1", fn: function() {
            self2._convertBlock(block, "h1");
          } },
          { label: "Heading 2", fn: function() {
            self2._convertBlock(block, "h2");
          } },
          { label: "Heading 3", fn: function() {
            self2._convertBlock(block, "h3");
          } },
          { label: "Quote", fn: function() {
            self2._convertBlock(block, "blockquote");
          } },
          { label: "Code block", fn: function() {
            self2._convertBlock(block, "pre");
          } },
          { divider: true },
          { label: "Duplicate", fn: function() {
            self2._duplicateBlock(block);
          } },
          { label: "Delete", danger: true, fn: function() {
            self2._deleteBlock(block);
          } }
        ];
        items.forEach(function(item) {
          if (item.divider) {
            var hr = document.createElement("div");
            hr.style.cssText = "height:1px;background:var(--color-base-300,#d1d5db);margin:0.25rem 0;";
            menu.appendChild(hr);
            return;
          }
          var b = document.createElement("button");
          b.type = "button";
          b.textContent = item.label;
          b.style.cssText = "display:block;width:100%;text-align:left;padding:0.3rem 0.5rem;border:none;background:none;border-radius:0.3rem;cursor:pointer;color:" + (item.danger ? "var(--color-error,#dc2626)" : "inherit") + ";";
          b.addEventListener("mouseover", function() {
            b.style.background = "color-mix(in oklab, var(--color-base-content,#1f2937) 8%, transparent)";
          });
          b.addEventListener("mouseout", function() {
            b.style.background = "";
          });
          b.addEventListener("mousedown", function(e) {
            e.preventDefault();
          });
          b.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            item.fn();
            self2._closeBlockMenu();
            self2._debouncedPushVisualChange();
            self2._updateCounts();
          });
          menu.appendChild(b);
        });
        menu.addEventListener("mousedown", function(e) {
          e.preventDefault();
        });
        var hRect = this._dragHandle.getBoundingClientRect();
        var wRect = this._visualWrapper.getBoundingClientRect();
        this._visualWrapper.style.position = "relative";
        menu.style.left = Math.max(0, hRect.right - wRect.left + 2) + "px";
        menu.style.top = Math.max(0, hRect.top - wRect.top) + "px";
        this._visualWrapper.appendChild(menu);
        this._blockMenu = menu;
        var closeHandler = function(e) {
          if (!menu.contains(e.target))
            self2._closeBlockMenu();
        };
        setTimeout(function() {
          document.addEventListener("mousedown", closeHandler);
        }, 0);
        this._blockMenuCloseHandler = closeHandler;
      },
      _closeBlockMenu: function() {
        if (this._blockMenu) {
          this._blockMenu.remove();
          this._blockMenu = null;
        }
        if (this._blockMenuCloseHandler) {
          document.removeEventListener("mousedown", this._blockMenuCloseHandler);
          this._blockMenuCloseHandler = null;
        }
      },
      // Replace a block element with a new tag, carrying its content across.
      _convertBlock: function(block, tag) {
        if (!block || !block.parentNode)
          return;
        var cur = block.tagName.toLowerCase();
        if (cur === tag)
          return;
        var el;
        if (tag === "blockquote") {
          el = document.createElement("blockquote");
          var p = document.createElement("p");
          p.innerHTML = cur === "pre" ? block.textContent : block.innerHTML;
          el.appendChild(p);
        } else if (tag === "pre") {
          el = document.createElement("pre");
          var code = document.createElement("code");
          code.textContent = block.textContent || "";
          el.appendChild(code);
        } else {
          el = document.createElement(tag);
          if (cur === "blockquote") {
            el.innerHTML = block.innerHTML.replace(/<\/?p[^>]*>/gi, "");
          } else if (cur === "pre") {
            el.textContent = block.textContent || "";
          } else {
            el.innerHTML = block.innerHTML;
          }
        }
        if (el.innerHTML.trim() === "")
          el.innerHTML = "<br>";
        block.parentNode.replaceChild(el, block);
        this._dragHandleBlock = null;
      },
      _duplicateBlock: function(block) {
        if (!block || !block.parentNode)
          return;
        var clone2 = block.cloneNode(true);
        clone2.classList.remove("leaf-dragging");
        if (block.nextSibling) {
          block.parentNode.insertBefore(clone2, block.nextSibling);
        } else {
          block.parentNode.appendChild(clone2);
        }
      },
      _deleteBlock: function(block) {
        if (!block || !block.parentNode)
          return;
        block.remove();
        this._dragHandleBlock = null;
        if (this._dragHandle)
          this._dragHandle.style.display = "none";
        if (this._visualEl && this._visualEl.innerHTML.trim() === "") {
          this._visualEl.innerHTML = "<p><br></p>";
        }
      },
      _dismissImagePopover: function(skipPush) {
        if (this._imagePopoverTarget) {
          this._imagePopoverTarget.classList.remove("leaf-img-selected");
        }
        if (this._resizeHandles) {
          this._resizeHandles.forEach(function(h) {
            h.remove();
          });
          this._resizeHandles = null;
        }
        if (this._imagePopoverEl) {
          this._imagePopoverEl.remove();
          this._imagePopoverEl = null;
        }
        if (this._imagePopoverTarget) {
          this._imagePopoverTarget = null;
          if (!skipPush)
            this._debouncedPushVisualChange();
        }
      },
      // -- Commands from parent --
      _handleCommand: function(payload) {
        switch (payload.action) {
          case "insert_image":
            if (this._visualEl && payload.url) {
              this._visualEl.focus();
              var imgHtml = '<img src="' + payload.url + '" alt="' + (payload.alt || "").replace(/"/g, "&quot;") + '" draggable="true" />';
              document.execCommand("insertHTML", false, imgHtml);
              this._debouncedPushVisualChange();
            }
            break;
          case "set_content":
            var content = payload.content || "";
            var html = payload.html || "<p><br></p>";
            if (this._visualEl) {
              this._visualEl.innerHTML = html;
            }
            var markdownTextarea = this._getMarkdownTextarea();
            if (markdownTextarea) {
              markdownTextarea.value = content;
            }
            var htmlTextarea = this._getHtmlTextarea();
            if (htmlTextarea) {
              htmlTextarea.value = html;
            }
            this._sourceBlock = null;
            this._dragHandleBlock = null;
            this._syncFormInput(content);
            this._updateCounts();
            break;
          case "set_mode":
            if (payload.mode && payload.mode !== this._mode) {
              if (!this._isModeAllowed(payload.mode))
                break;
              var tab = this.el.querySelector(
                '[data-mode-tab="' + payload.mode + '"]'
              );
              if (tab)
                tab.click();
            }
            break;
          case "insert_markdown":
            var text = payload.text || "";
            if (this._mode === "markdown") {
              var insMd = this._getMarkdownTextarea();
              if (insMd) {
                this._insertAtTextarea(insMd, text);
                this._debouncedPushMarkdownChange(insMd.value);
                this._updateCounts();
              }
            } else if (this._mode === "html") {
              var insHtml = this._getHtmlTextarea();
              if (insHtml) {
                this._insertAtTextarea(insHtml, text);
                this._debouncedPushHtmlChange(insHtml.value);
                this._updateCounts();
              }
            } else if (this._visualEl) {
              this._visualEl.focus();
              var chip = this._maybeAtomicChip(text);
              if (chip) {
                document.execCommand("insertHTML", false, chip);
              } else {
                document.execCommand("insertText", false, text);
                if (this._mode === "hybrid")
                  this._refreshSourceBlock();
              }
              this._debouncedPushVisualChange();
              this._updateCounts();
            }
            break;
          case "flush":
            this._flushPending();
            break;
          case "mark_saved":
            this._savedContent = this._currentMarkdown();
            break;
        }
      }
    };
  })();

  // js/app.js
  var Hooks2 = {};
  if (window.LeafHooks) {
    Hooks2.Leaf = window.LeafHooks.Leaf;
  }
  var csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
  var liveSocket = new LiveSocket("/live", Socket, {
    longPollFallbackMs: 2500,
    params: { _csrf_token: csrfToken },
    hooks: Hooks2
  });
  import_topbar.default.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" });
  window.addEventListener("phx:page-loading-start", (_info) => import_topbar.default.show(300));
  window.addEventListener("phx:page-loading-stop", (_info) => import_topbar.default.hide());
  liveSocket.connect();
  window.liveSocket = liveSocket;
})();
/**
 * @license MIT
 * topbar 2.0.0, 2023-02-04
 * https://buunguyen.github.io/topbar
 * Copyright (c) 2021 Buu Nguyen
 */
