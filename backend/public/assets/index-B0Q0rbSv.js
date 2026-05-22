function _mergeNamespaces(n2, m2) {
  for (var i2 = 0; i2 < m2.length; i2++) {
    const e2 = m2[i2];
    if (typeof e2 !== "string" && !Array.isArray(e2)) {
      for (const k2 in e2) {
        if (k2 !== "default" && !(k2 in n2)) {
          const d2 = Object.getOwnPropertyDescriptor(e2, k2);
          if (d2) {
            Object.defineProperty(n2, k2, d2.get ? d2 : {
              enumerable: true,
              get: () => e2[k2]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n2, Symbol.toStringTag, { value: "Module" }));
}
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$2 = Symbol.for("react.element"), n$3 = Symbol.for("react.portal"), p$3 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t$1 = Symbol.for("react.provider"), u$2 = Symbol.for("react.context"), v$2 = Symbol.for("react.forward_ref"), w$1 = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
function A$2(a2) {
  if (null === a2 || "object" !== typeof a2) return null;
  a2 = z$1 && a2[z$1] || a2["@@iterator"];
  return "function" === typeof a2 ? a2 : null;
}
var B$1 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$1 = Object.assign, D$2 = {};
function E$1(a2, b2, e2) {
  this.props = a2;
  this.context = b2;
  this.refs = D$2;
  this.updater = e2 || B$1;
}
E$1.prototype.isReactComponent = {};
E$1.prototype.setState = function(a2, b2) {
  if ("object" !== typeof a2 && "function" !== typeof a2 && null != a2) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a2, b2, "setState");
};
E$1.prototype.forceUpdate = function(a2) {
  this.updater.enqueueForceUpdate(this, a2, "forceUpdate");
};
function F$1() {
}
F$1.prototype = E$1.prototype;
function G$2(a2, b2, e2) {
  this.props = a2;
  this.context = b2;
  this.refs = D$2;
  this.updater = e2 || B$1;
}
var H$1 = G$2.prototype = new F$1();
H$1.constructor = G$2;
C$1(H$1, E$1.prototype);
H$1.isPureReactComponent = true;
var I$2 = Array.isArray, J$1 = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
function M$2(a2, b2, e2) {
  var d2, c2 = {}, k2 = null, h2 = null;
  if (null != b2) for (d2 in void 0 !== b2.ref && (h2 = b2.ref), void 0 !== b2.key && (k2 = "" + b2.key), b2) J$1.call(b2, d2) && !L$1.hasOwnProperty(d2) && (c2[d2] = b2[d2]);
  var g2 = arguments.length - 2;
  if (1 === g2) c2.children = e2;
  else if (1 < g2) {
    for (var f2 = Array(g2), m2 = 0; m2 < g2; m2++) f2[m2] = arguments[m2 + 2];
    c2.children = f2;
  }
  if (a2 && a2.defaultProps) for (d2 in g2 = a2.defaultProps, g2) void 0 === c2[d2] && (c2[d2] = g2[d2]);
  return { $$typeof: l$2, type: a2, key: k2, ref: h2, props: c2, _owner: K$1.current };
}
function N$1(a2, b2) {
  return { $$typeof: l$2, type: a2.type, key: b2, ref: a2.ref, props: a2.props, _owner: a2._owner };
}
function O$2(a2) {
  return "object" === typeof a2 && null !== a2 && a2.$$typeof === l$2;
}
function escape(a2) {
  var b2 = { "=": "=0", ":": "=2" };
  return "$" + a2.replace(/[=:]/g, function(a3) {
    return b2[a3];
  });
}
var P$2 = /\/+/g;
function Q$2(a2, b2) {
  return "object" === typeof a2 && null !== a2 && null != a2.key ? escape("" + a2.key) : b2.toString(36);
}
function R$1(a2, b2, e2, d2, c2) {
  var k2 = typeof a2;
  if ("undefined" === k2 || "boolean" === k2) a2 = null;
  var h2 = false;
  if (null === a2) h2 = true;
  else switch (k2) {
    case "string":
    case "number":
      h2 = true;
      break;
    case "object":
      switch (a2.$$typeof) {
        case l$2:
        case n$3:
          h2 = true;
      }
  }
  if (h2) return h2 = a2, c2 = c2(h2), a2 = "" === d2 ? "." + Q$2(h2, 0) : d2, I$2(c2) ? (e2 = "", null != a2 && (e2 = a2.replace(P$2, "$&/") + "/"), R$1(c2, b2, e2, "", function(a3) {
    return a3;
  })) : null != c2 && (O$2(c2) && (c2 = N$1(c2, e2 + (!c2.key || h2 && h2.key === c2.key ? "" : ("" + c2.key).replace(P$2, "$&/") + "/") + a2)), b2.push(c2)), 1;
  h2 = 0;
  d2 = "" === d2 ? "." : d2 + ":";
  if (I$2(a2)) for (var g2 = 0; g2 < a2.length; g2++) {
    k2 = a2[g2];
    var f2 = d2 + Q$2(k2, g2);
    h2 += R$1(k2, b2, e2, f2, c2);
  }
  else if (f2 = A$2(a2), "function" === typeof f2) for (a2 = f2.call(a2), g2 = 0; !(k2 = a2.next()).done; ) k2 = k2.value, f2 = d2 + Q$2(k2, g2++), h2 += R$1(k2, b2, e2, f2, c2);
  else if ("object" === k2) throw b2 = String(a2), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b2 ? "object with keys {" + Object.keys(a2).join(", ") + "}" : b2) + "). If you meant to render a collection of children, use an array instead.");
  return h2;
}
function S$2(a2, b2, e2) {
  if (null == a2) return a2;
  var d2 = [], c2 = 0;
  R$1(a2, d2, "", "", function(a3) {
    return b2.call(e2, a3, c2++);
  });
  return d2;
}
function T$2(a2) {
  if (-1 === a2._status) {
    var b2 = a2._result;
    b2 = b2();
    b2.then(function(b3) {
      if (0 === a2._status || -1 === a2._status) a2._status = 1, a2._result = b3;
    }, function(b3) {
      if (0 === a2._status || -1 === a2._status) a2._status = 2, a2._result = b3;
    });
    -1 === a2._status && (a2._status = 0, a2._result = b2);
  }
  if (1 === a2._status) return a2._result.default;
  throw a2._result;
}
var U$2 = { current: null }, V$2 = { transition: null }, W$2 = { ReactCurrentDispatcher: U$2, ReactCurrentBatchConfig: V$2, ReactCurrentOwner: K$1 };
function X$3() {
  throw Error("act(...) is not supported in production builds of React.");
}
react_production_min.Children = { map: S$2, forEach: function(a2, b2, e2) {
  S$2(a2, function() {
    b2.apply(this, arguments);
  }, e2);
}, count: function(a2) {
  var b2 = 0;
  S$2(a2, function() {
    b2++;
  });
  return b2;
}, toArray: function(a2) {
  return S$2(a2, function(a3) {
    return a3;
  }) || [];
}, only: function(a2) {
  if (!O$2(a2)) throw Error("React.Children.only expected to receive a single React element child.");
  return a2;
} };
react_production_min.Component = E$1;
react_production_min.Fragment = p$3;
react_production_min.Profiler = r;
react_production_min.PureComponent = G$2;
react_production_min.StrictMode = q$1;
react_production_min.Suspense = w$1;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$2;
react_production_min.act = X$3;
react_production_min.cloneElement = function(a2, b2, e2) {
  if (null === a2 || void 0 === a2) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a2 + ".");
  var d2 = C$1({}, a2.props), c2 = a2.key, k2 = a2.ref, h2 = a2._owner;
  if (null != b2) {
    void 0 !== b2.ref && (k2 = b2.ref, h2 = K$1.current);
    void 0 !== b2.key && (c2 = "" + b2.key);
    if (a2.type && a2.type.defaultProps) var g2 = a2.type.defaultProps;
    for (f2 in b2) J$1.call(b2, f2) && !L$1.hasOwnProperty(f2) && (d2[f2] = void 0 === b2[f2] && void 0 !== g2 ? g2[f2] : b2[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2) d2.children = e2;
  else if (1 < f2) {
    g2 = Array(f2);
    for (var m2 = 0; m2 < f2; m2++) g2[m2] = arguments[m2 + 2];
    d2.children = g2;
  }
  return { $$typeof: l$2, type: a2.type, key: c2, ref: k2, props: d2, _owner: h2 };
};
react_production_min.createContext = function(a2) {
  a2 = { $$typeof: u$2, _currentValue: a2, _currentValue2: a2, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a2.Provider = { $$typeof: t$1, _context: a2 };
  return a2.Consumer = a2;
};
react_production_min.createElement = M$2;
react_production_min.createFactory = function(a2) {
  var b2 = M$2.bind(null, a2);
  b2.type = a2;
  return b2;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a2) {
  return { $$typeof: v$2, render: a2 };
};
react_production_min.isValidElement = O$2;
react_production_min.lazy = function(a2) {
  return { $$typeof: y, _payload: { _status: -1, _result: a2 }, _init: T$2 };
};
react_production_min.memo = function(a2, b2) {
  return { $$typeof: x, type: a2, compare: void 0 === b2 ? null : b2 };
};
react_production_min.startTransition = function(a2) {
  var b2 = V$2.transition;
  V$2.transition = {};
  try {
    a2();
  } finally {
    V$2.transition = b2;
  }
};
react_production_min.unstable_act = X$3;
react_production_min.useCallback = function(a2, b2) {
  return U$2.current.useCallback(a2, b2);
};
react_production_min.useContext = function(a2) {
  return U$2.current.useContext(a2);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a2) {
  return U$2.current.useDeferredValue(a2);
};
react_production_min.useEffect = function(a2, b2) {
  return U$2.current.useEffect(a2, b2);
};
react_production_min.useId = function() {
  return U$2.current.useId();
};
react_production_min.useImperativeHandle = function(a2, b2, e2) {
  return U$2.current.useImperativeHandle(a2, b2, e2);
};
react_production_min.useInsertionEffect = function(a2, b2) {
  return U$2.current.useInsertionEffect(a2, b2);
};
react_production_min.useLayoutEffect = function(a2, b2) {
  return U$2.current.useLayoutEffect(a2, b2);
};
react_production_min.useMemo = function(a2, b2) {
  return U$2.current.useMemo(a2, b2);
};
react_production_min.useReducer = function(a2, b2, e2) {
  return U$2.current.useReducer(a2, b2, e2);
};
react_production_min.useRef = function(a2) {
  return U$2.current.useRef(a2);
};
react_production_min.useState = function(a2) {
  return U$2.current.useState(a2);
};
react_production_min.useSyncExternalStore = function(a2, b2, e2) {
  return U$2.current.useSyncExternalStore(a2, b2, e2);
};
react_production_min.useTransition = function() {
  return U$2.current.useTransition();
};
react_production_min.version = "18.3.1";
{
  react.exports = react_production_min;
}
var reactExports = react.exports;
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
const React$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: React
}, [reactExports]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f$1 = reactExports, k = Symbol.for("react.element"), l$1 = Symbol.for("react.fragment"), m$2 = Object.prototype.hasOwnProperty, n$2 = f$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$2 = { key: true, ref: true, __self: true, __source: true };
function q(c2, a2, g2) {
  var b2, d2 = {}, e2 = null, h2 = null;
  void 0 !== g2 && (e2 = "" + g2);
  void 0 !== a2.key && (e2 = "" + a2.key);
  void 0 !== a2.ref && (h2 = a2.ref);
  for (b2 in a2) m$2.call(a2, b2) && !p$2.hasOwnProperty(b2) && (d2[b2] = a2[b2]);
  if (c2 && c2.defaultProps) for (b2 in a2 = c2.defaultProps, a2) void 0 === d2[b2] && (d2[b2] = a2[b2]);
  return { $$typeof: k, type: c2, key: e2, ref: h2, props: d2, _owner: n$2.current };
}
reactJsxRuntime_production_min.Fragment = l$1;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  function f2(a2, b2) {
    var c2 = a2.length;
    a2.push(b2);
    a: for (; 0 < c2; ) {
      var d2 = c2 - 1 >>> 1, e2 = a2[d2];
      if (0 < g2(e2, b2)) a2[d2] = b2, a2[c2] = e2, c2 = d2;
      else break a;
    }
  }
  function h2(a2) {
    return 0 === a2.length ? null : a2[0];
  }
  function k2(a2) {
    if (0 === a2.length) return null;
    var b2 = a2[0], c2 = a2.pop();
    if (c2 !== b2) {
      a2[0] = c2;
      a: for (var d2 = 0, e2 = a2.length, w2 = e2 >>> 1; d2 < w2; ) {
        var m2 = 2 * (d2 + 1) - 1, C2 = a2[m2], n2 = m2 + 1, x2 = a2[n2];
        if (0 > g2(C2, c2)) n2 < e2 && 0 > g2(x2, C2) ? (a2[d2] = x2, a2[n2] = c2, d2 = n2) : (a2[d2] = C2, a2[m2] = c2, d2 = m2);
        else if (n2 < e2 && 0 > g2(x2, c2)) a2[d2] = x2, a2[n2] = c2, d2 = n2;
        else break a;
      }
    }
    return b2;
  }
  function g2(a2, b2) {
    var c2 = a2.sortIndex - b2.sortIndex;
    return 0 !== c2 ? c2 : a2.id - b2.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a2) {
    for (var b2 = h2(t2); null !== b2; ) {
      if (null === b2.callback) k2(t2);
      else if (b2.startTime <= a2) k2(t2), b2.sortIndex = b2.expirationTime, f2(r2, b2);
      else break;
      b2 = h2(t2);
    }
  }
  function H2(a2) {
    B2 = false;
    G2(a2);
    if (!A2) if (null !== h2(r2)) A2 = true, I2(J2);
    else {
      var b2 = h2(t2);
      null !== b2 && K2(H2, b2.startTime - a2);
    }
  }
  function J2(a2, b2) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c2 = y2;
    try {
      G2(b2);
      for (v2 = h2(r2); null !== v2 && (!(v2.expirationTime > b2) || a2 && !M2()); ) {
        var d2 = v2.callback;
        if ("function" === typeof d2) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e2 = d2(v2.expirationTime <= b2);
          b2 = exports.unstable_now();
          "function" === typeof e2 ? v2.callback = e2 : v2 === h2(r2) && k2(r2);
          G2(b2);
        } else k2(r2);
        v2 = h2(r2);
      }
      if (null !== v2) var w2 = true;
      else {
        var m2 = h2(t2);
        null !== m2 && K2(H2, m2.startTime - b2);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c2, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (null !== O2) {
      var a2 = exports.unstable_now();
      Q2 = a2;
      var b2 = true;
      try {
        b2 = O2(true, a2);
      } finally {
        b2 ? S2() : (N2 = false, O2 = null);
      }
    } else N2 = false;
  }
  var S2;
  if ("function" === typeof F2) S2 = function() {
    F2(R2);
  };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else S2 = function() {
    D2(R2, 0);
  };
  function I2(a2) {
    O2 = a2;
    N2 || (N2 = true, S2());
  }
  function K2(a2, b2) {
    L2 = D2(function() {
      a2(exports.unstable_now());
    }, b2);
  }
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a2) {
    a2.callback = null;
  };
  exports.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports.unstable_forceFrameRate = function(a2) {
    0 > a2 || 125 < a2 ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a2 ? Math.floor(1e3 / a2) : 5;
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return h2(r2);
  };
  exports.unstable_next = function(a2) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b2 = 3;
        break;
      default:
        b2 = y2;
    }
    var c2 = y2;
    y2 = b2;
    try {
      return a2();
    } finally {
      y2 = c2;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = function() {
  };
  exports.unstable_runWithPriority = function(a2, b2) {
    switch (a2) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a2 = 3;
    }
    var c2 = y2;
    y2 = a2;
    try {
      return b2();
    } finally {
      y2 = c2;
    }
  };
  exports.unstable_scheduleCallback = function(a2, b2, c2) {
    var d2 = exports.unstable_now();
    "object" === typeof c2 && null !== c2 ? (c2 = c2.delay, c2 = "number" === typeof c2 && 0 < c2 ? d2 + c2 : d2) : c2 = d2;
    switch (a2) {
      case 1:
        var e2 = -1;
        break;
      case 2:
        e2 = 250;
        break;
      case 5:
        e2 = 1073741823;
        break;
      case 4:
        e2 = 1e4;
        break;
      default:
        e2 = 5e3;
    }
    e2 = c2 + e2;
    a2 = { id: u2++, callback: b2, priorityLevel: a2, startTime: c2, expirationTime: e2, sortIndex: -1 };
    c2 > d2 ? (a2.sortIndex = c2, f2(t2, a2), null === h2(r2) && a2 === h2(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c2 - d2))) : (a2.sortIndex = e2, f2(r2, a2), A2 || z2 || (A2 = true, I2(J2)));
    return a2;
  };
  exports.unstable_shouldYield = M2;
  exports.unstable_wrapCallback = function(a2) {
    var b2 = y2;
    return function() {
      var c2 = y2;
      y2 = b2;
      try {
        return a2.apply(this, arguments);
      } finally {
        y2 = c2;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
var schedulerExports = scheduler.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports, ca = schedulerExports;
function p$1(a2) {
  for (var b2 = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c2 = 1; c2 < arguments.length; c2++) b2 += "&args[]=" + encodeURIComponent(arguments[c2]);
  return "Minified React error #" + a2 + "; visit " + b2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a2, b2) {
  ha(a2, b2);
  ha(a2 + "Capture", b2);
}
function ha(a2, b2) {
  ea[a2] = b2;
  for (a2 = 0; a2 < b2.length; a2++) da.add(b2[a2]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(a2) {
  if (ja.call(ma, a2)) return true;
  if (ja.call(la, a2)) return false;
  if (ka.test(a2)) return ma[a2] = true;
  la[a2] = true;
  return false;
}
function pa(a2, b2, c2, d2) {
  if (null !== c2 && 0 === c2.type) return false;
  switch (typeof b2) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d2) return false;
      if (null !== c2) return !c2.acceptsBooleans;
      a2 = a2.toLowerCase().slice(0, 5);
      return "data-" !== a2 && "aria-" !== a2;
    default:
      return false;
  }
}
function qa(a2, b2, c2, d2) {
  if (null === b2 || "undefined" === typeof b2 || pa(a2, b2, c2, d2)) return true;
  if (d2) return false;
  if (null !== c2) switch (c2.type) {
    case 3:
      return !b2;
    case 4:
      return false === b2;
    case 5:
      return isNaN(b2);
    case 6:
      return isNaN(b2) || 1 > b2;
  }
  return false;
}
function v$1(a2, b2, c2, d2, e2, f2, g2) {
  this.acceptsBooleans = 2 === b2 || 3 === b2 || 4 === b2;
  this.attributeName = d2;
  this.attributeNamespace = e2;
  this.mustUseProperty = c2;
  this.propertyName = a2;
  this.type = b2;
  this.sanitizeURL = f2;
  this.removeEmptyString = g2;
}
var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a2) {
  z[a2] = new v$1(a2, 0, false, a2, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a2) {
  var b2 = a2[0];
  z[b2] = new v$1(b2, 1, false, a2[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a2) {
  z[a2] = new v$1(a2, 2, false, a2.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a2) {
  z[a2] = new v$1(a2, 2, false, a2, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a2) {
  z[a2] = new v$1(a2, 3, false, a2.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a2) {
  z[a2] = new v$1(a2, 3, true, a2, null, false, false);
});
["capture", "download"].forEach(function(a2) {
  z[a2] = new v$1(a2, 4, false, a2, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a2) {
  z[a2] = new v$1(a2, 6, false, a2, null, false, false);
});
["rowSpan", "start"].forEach(function(a2) {
  z[a2] = new v$1(a2, 5, false, a2.toLowerCase(), null, false, false);
});
var ra = /[\-:]([a-z])/g;
function sa(a2) {
  return a2[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a2) {
  var b2 = a2.replace(
    ra,
    sa
  );
  z[b2] = new v$1(b2, 1, false, a2, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a2) {
  var b2 = a2.replace(ra, sa);
  z[b2] = new v$1(b2, 1, false, a2, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a2) {
  var b2 = a2.replace(ra, sa);
  z[b2] = new v$1(b2, 1, false, a2, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a2) {
  z[a2] = new v$1(a2, 1, false, a2.toLowerCase(), null, false, false);
});
z.xlinkHref = new v$1("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a2) {
  z[a2] = new v$1(a2, 1, false, a2.toLowerCase(), null, true, true);
});
function ta(a2, b2, c2, d2) {
  var e2 = z.hasOwnProperty(b2) ? z[b2] : null;
  if (null !== e2 ? 0 !== e2.type : d2 || !(2 < b2.length) || "o" !== b2[0] && "O" !== b2[0] || "n" !== b2[1] && "N" !== b2[1]) qa(b2, c2, e2, d2) && (c2 = null), d2 || null === e2 ? oa(b2) && (null === c2 ? a2.removeAttribute(b2) : a2.setAttribute(b2, "" + c2)) : e2.mustUseProperty ? a2[e2.propertyName] = null === c2 ? 3 === e2.type ? false : "" : c2 : (b2 = e2.attributeName, d2 = e2.attributeNamespace, null === c2 ? a2.removeAttribute(b2) : (e2 = e2.type, c2 = 3 === e2 || 4 === e2 && true === c2 ? "" : "" + c2, d2 ? a2.setAttributeNS(d2, b2, c2) : a2.setAttribute(b2, c2)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
var Ia = Symbol.for("react.offscreen");
var Ja = Symbol.iterator;
function Ka(a2) {
  if (null === a2 || "object" !== typeof a2) return null;
  a2 = Ja && a2[Ja] || a2["@@iterator"];
  return "function" === typeof a2 ? a2 : null;
}
var A$1 = Object.assign, La;
function Ma(a2) {
  if (void 0 === La) try {
    throw Error();
  } catch (c2) {
    var b2 = c2.stack.trim().match(/\n( *(at )?)/);
    La = b2 && b2[1] || "";
  }
  return "\n" + La + a2;
}
var Na = false;
function Oa(a2, b2) {
  if (!a2 || Na) return "";
  Na = true;
  var c2 = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b2) if (b2 = function() {
      throw Error();
    }, Object.defineProperty(b2.prototype, "props", { set: function() {
      throw Error();
    } }), "object" === typeof Reflect && Reflect.construct) {
      try {
        Reflect.construct(b2, []);
      } catch (l2) {
        var d2 = l2;
      }
      Reflect.construct(a2, [], b2);
    } else {
      try {
        b2.call();
      } catch (l2) {
        d2 = l2;
      }
      a2.call(b2.prototype);
    }
    else {
      try {
        throw Error();
      } catch (l2) {
        d2 = l2;
      }
      a2();
    }
  } catch (l2) {
    if (l2 && d2 && "string" === typeof l2.stack) {
      for (var e2 = l2.stack.split("\n"), f2 = d2.stack.split("\n"), g2 = e2.length - 1, h2 = f2.length - 1; 1 <= g2 && 0 <= h2 && e2[g2] !== f2[h2]; ) h2--;
      for (; 1 <= g2 && 0 <= h2; g2--, h2--) if (e2[g2] !== f2[h2]) {
        if (1 !== g2 || 1 !== h2) {
          do
            if (g2--, h2--, 0 > h2 || e2[g2] !== f2[h2]) {
              var k2 = "\n" + e2[g2].replace(" at new ", " at ");
              a2.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a2.displayName));
              return k2;
            }
          while (1 <= g2 && 0 <= h2);
        }
        break;
      }
    }
  } finally {
    Na = false, Error.prepareStackTrace = c2;
  }
  return (a2 = a2 ? a2.displayName || a2.name : "") ? Ma(a2) : "";
}
function Pa(a2) {
  switch (a2.tag) {
    case 5:
      return Ma(a2.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a2 = Oa(a2.type, false), a2;
    case 11:
      return a2 = Oa(a2.type.render, false), a2;
    case 1:
      return a2 = Oa(a2.type, true), a2;
    default:
      return "";
  }
}
function Qa(a2) {
  if (null == a2) return null;
  if ("function" === typeof a2) return a2.displayName || a2.name || null;
  if ("string" === typeof a2) return a2;
  switch (a2) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a2) switch (a2.$$typeof) {
    case Ca:
      return (a2.displayName || "Context") + ".Consumer";
    case Ba:
      return (a2._context.displayName || "Context") + ".Provider";
    case Da:
      var b2 = a2.render;
      a2 = a2.displayName;
      a2 || (a2 = b2.displayName || b2.name || "", a2 = "" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
      return a2;
    case Ga:
      return b2 = a2.displayName || null, null !== b2 ? b2 : Qa(a2.type) || "Memo";
    case Ha:
      b2 = a2._payload;
      a2 = a2._init;
      try {
        return Qa(a2(b2));
      } catch (c2) {
      }
  }
  return null;
}
function Ra(a2) {
  var b2 = a2.type;
  switch (a2.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b2.displayName || "Context") + ".Consumer";
    case 10:
      return (b2._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a2 = b2.render, a2 = a2.displayName || a2.name || "", b2.displayName || ("" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b2;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b2);
    case 8:
      return b2 === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b2) return b2.displayName || b2.name || null;
      if ("string" === typeof b2) return b2;
  }
  return null;
}
function Sa(a2) {
  switch (typeof a2) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a2;
    case "object":
      return a2;
    default:
      return "";
  }
}
function Ta(a2) {
  var b2 = a2.type;
  return (a2 = a2.nodeName) && "input" === a2.toLowerCase() && ("checkbox" === b2 || "radio" === b2);
}
function Ua(a2) {
  var b2 = Ta(a2) ? "checked" : "value", c2 = Object.getOwnPropertyDescriptor(a2.constructor.prototype, b2), d2 = "" + a2[b2];
  if (!a2.hasOwnProperty(b2) && "undefined" !== typeof c2 && "function" === typeof c2.get && "function" === typeof c2.set) {
    var e2 = c2.get, f2 = c2.set;
    Object.defineProperty(a2, b2, { configurable: true, get: function() {
      return e2.call(this);
    }, set: function(a3) {
      d2 = "" + a3;
      f2.call(this, a3);
    } });
    Object.defineProperty(a2, b2, { enumerable: c2.enumerable });
    return { getValue: function() {
      return d2;
    }, setValue: function(a3) {
      d2 = "" + a3;
    }, stopTracking: function() {
      a2._valueTracker = null;
      delete a2[b2];
    } };
  }
}
function Va(a2) {
  a2._valueTracker || (a2._valueTracker = Ua(a2));
}
function Wa(a2) {
  if (!a2) return false;
  var b2 = a2._valueTracker;
  if (!b2) return true;
  var c2 = b2.getValue();
  var d2 = "";
  a2 && (d2 = Ta(a2) ? a2.checked ? "true" : "false" : a2.value);
  a2 = d2;
  return a2 !== c2 ? (b2.setValue(a2), true) : false;
}
function Xa(a2) {
  a2 = a2 || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a2) return null;
  try {
    return a2.activeElement || a2.body;
  } catch (b2) {
    return a2.body;
  }
}
function Ya(a2, b2) {
  var c2 = b2.checked;
  return A$1({}, b2, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c2 ? c2 : a2._wrapperState.initialChecked });
}
function Za(a2, b2) {
  var c2 = null == b2.defaultValue ? "" : b2.defaultValue, d2 = null != b2.checked ? b2.checked : b2.defaultChecked;
  c2 = Sa(null != b2.value ? b2.value : c2);
  a2._wrapperState = { initialChecked: d2, initialValue: c2, controlled: "checkbox" === b2.type || "radio" === b2.type ? null != b2.checked : null != b2.value };
}
function ab(a2, b2) {
  b2 = b2.checked;
  null != b2 && ta(a2, "checked", b2, false);
}
function bb(a2, b2) {
  ab(a2, b2);
  var c2 = Sa(b2.value), d2 = b2.type;
  if (null != c2) if ("number" === d2) {
    if (0 === c2 && "" === a2.value || a2.value != c2) a2.value = "" + c2;
  } else a2.value !== "" + c2 && (a2.value = "" + c2);
  else if ("submit" === d2 || "reset" === d2) {
    a2.removeAttribute("value");
    return;
  }
  b2.hasOwnProperty("value") ? cb(a2, b2.type, c2) : b2.hasOwnProperty("defaultValue") && cb(a2, b2.type, Sa(b2.defaultValue));
  null == b2.checked && null != b2.defaultChecked && (a2.defaultChecked = !!b2.defaultChecked);
}
function db(a2, b2, c2) {
  if (b2.hasOwnProperty("value") || b2.hasOwnProperty("defaultValue")) {
    var d2 = b2.type;
    if (!("submit" !== d2 && "reset" !== d2 || void 0 !== b2.value && null !== b2.value)) return;
    b2 = "" + a2._wrapperState.initialValue;
    c2 || b2 === a2.value || (a2.value = b2);
    a2.defaultValue = b2;
  }
  c2 = a2.name;
  "" !== c2 && (a2.name = "");
  a2.defaultChecked = !!a2._wrapperState.initialChecked;
  "" !== c2 && (a2.name = c2);
}
function cb(a2, b2, c2) {
  if ("number" !== b2 || Xa(a2.ownerDocument) !== a2) null == c2 ? a2.defaultValue = "" + a2._wrapperState.initialValue : a2.defaultValue !== "" + c2 && (a2.defaultValue = "" + c2);
}
var eb = Array.isArray;
function fb(a2, b2, c2, d2) {
  a2 = a2.options;
  if (b2) {
    b2 = {};
    for (var e2 = 0; e2 < c2.length; e2++) b2["$" + c2[e2]] = true;
    for (c2 = 0; c2 < a2.length; c2++) e2 = b2.hasOwnProperty("$" + a2[c2].value), a2[c2].selected !== e2 && (a2[c2].selected = e2), e2 && d2 && (a2[c2].defaultSelected = true);
  } else {
    c2 = "" + Sa(c2);
    b2 = null;
    for (e2 = 0; e2 < a2.length; e2++) {
      if (a2[e2].value === c2) {
        a2[e2].selected = true;
        d2 && (a2[e2].defaultSelected = true);
        return;
      }
      null !== b2 || a2[e2].disabled || (b2 = a2[e2]);
    }
    null !== b2 && (b2.selected = true);
  }
}
function gb(a2, b2) {
  if (null != b2.dangerouslySetInnerHTML) throw Error(p$1(91));
  return A$1({}, b2, { value: void 0, defaultValue: void 0, children: "" + a2._wrapperState.initialValue });
}
function hb(a2, b2) {
  var c2 = b2.value;
  if (null == c2) {
    c2 = b2.children;
    b2 = b2.defaultValue;
    if (null != c2) {
      if (null != b2) throw Error(p$1(92));
      if (eb(c2)) {
        if (1 < c2.length) throw Error(p$1(93));
        c2 = c2[0];
      }
      b2 = c2;
    }
    null == b2 && (b2 = "");
    c2 = b2;
  }
  a2._wrapperState = { initialValue: Sa(c2) };
}
function ib(a2, b2) {
  var c2 = Sa(b2.value), d2 = Sa(b2.defaultValue);
  null != c2 && (c2 = "" + c2, c2 !== a2.value && (a2.value = c2), null == b2.defaultValue && a2.defaultValue !== c2 && (a2.defaultValue = c2));
  null != d2 && (a2.defaultValue = "" + d2);
}
function jb(a2) {
  var b2 = a2.textContent;
  b2 === a2._wrapperState.initialValue && "" !== b2 && null !== b2 && (a2.value = b2);
}
function kb(a2) {
  switch (a2) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a2, b2) {
  return null == a2 || "http://www.w3.org/1999/xhtml" === a2 ? kb(b2) : "http://www.w3.org/2000/svg" === a2 && "foreignObject" === b2 ? "http://www.w3.org/1999/xhtml" : a2;
}
var mb, nb = function(a2) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b2, c2, d2, e2) {
    MSApp.execUnsafeLocalFunction(function() {
      return a2(b2, c2, d2, e2);
    });
  } : a2;
}(function(a2, b2) {
  if ("http://www.w3.org/2000/svg" !== a2.namespaceURI || "innerHTML" in a2) a2.innerHTML = b2;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b2.valueOf().toString() + "</svg>";
    for (b2 = mb.firstChild; a2.firstChild; ) a2.removeChild(a2.firstChild);
    for (; b2.firstChild; ) a2.appendChild(b2.firstChild);
  }
});
function ob(a2, b2) {
  if (b2) {
    var c2 = a2.firstChild;
    if (c2 && c2 === a2.lastChild && 3 === c2.nodeType) {
      c2.nodeValue = b2;
      return;
    }
  }
  a2.textContent = b2;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a2) {
  qb.forEach(function(b2) {
    b2 = b2 + a2.charAt(0).toUpperCase() + a2.substring(1);
    pb[b2] = pb[a2];
  });
});
function rb(a2, b2, c2) {
  return null == b2 || "boolean" === typeof b2 || "" === b2 ? "" : c2 || "number" !== typeof b2 || 0 === b2 || pb.hasOwnProperty(a2) && pb[a2] ? ("" + b2).trim() : b2 + "px";
}
function sb(a2, b2) {
  a2 = a2.style;
  for (var c2 in b2) if (b2.hasOwnProperty(c2)) {
    var d2 = 0 === c2.indexOf("--"), e2 = rb(c2, b2[c2], d2);
    "float" === c2 && (c2 = "cssFloat");
    d2 ? a2.setProperty(c2, e2) : a2[c2] = e2;
  }
}
var tb = A$1({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a2, b2) {
  if (b2) {
    if (tb[a2] && (null != b2.children || null != b2.dangerouslySetInnerHTML)) throw Error(p$1(137, a2));
    if (null != b2.dangerouslySetInnerHTML) {
      if (null != b2.children) throw Error(p$1(60));
      if ("object" !== typeof b2.dangerouslySetInnerHTML || !("__html" in b2.dangerouslySetInnerHTML)) throw Error(p$1(61));
    }
    if (null != b2.style && "object" !== typeof b2.style) throw Error(p$1(62));
  }
}
function vb(a2, b2) {
  if (-1 === a2.indexOf("-")) return "string" === typeof b2.is;
  switch (a2) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a2) {
  a2 = a2.target || a2.srcElement || window;
  a2.correspondingUseElement && (a2 = a2.correspondingUseElement);
  return 3 === a2.nodeType ? a2.parentNode : a2;
}
var yb = null, zb = null, Ab = null;
function Bb(a2) {
  if (a2 = Cb(a2)) {
    if ("function" !== typeof yb) throw Error(p$1(280));
    var b2 = a2.stateNode;
    b2 && (b2 = Db(b2), yb(a2.stateNode, a2.type, b2));
  }
}
function Eb(a2) {
  zb ? Ab ? Ab.push(a2) : Ab = [a2] : zb = a2;
}
function Fb() {
  if (zb) {
    var a2 = zb, b2 = Ab;
    Ab = zb = null;
    Bb(a2);
    if (b2) for (a2 = 0; a2 < b2.length; a2++) Bb(b2[a2]);
  }
}
function Gb(a2, b2) {
  return a2(b2);
}
function Hb() {
}
var Ib = false;
function Jb(a2, b2, c2) {
  if (Ib) return a2(b2, c2);
  Ib = true;
  try {
    return Gb(a2, b2, c2);
  } finally {
    if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
  }
}
function Kb(a2, b2) {
  var c2 = a2.stateNode;
  if (null === c2) return null;
  var d2 = Db(c2);
  if (null === d2) return null;
  c2 = d2[b2];
  a: switch (b2) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (d2 = !d2.disabled) || (a2 = a2.type, d2 = !("button" === a2 || "input" === a2 || "select" === a2 || "textarea" === a2));
      a2 = !d2;
      break a;
    default:
      a2 = false;
  }
  if (a2) return null;
  if (c2 && "function" !== typeof c2) throw Error(p$1(231, b2, typeof c2));
  return c2;
}
var Lb = false;
if (ia) try {
  var Mb = {};
  Object.defineProperty(Mb, "passive", { get: function() {
    Lb = true;
  } });
  window.addEventListener("test", Mb, Mb);
  window.removeEventListener("test", Mb, Mb);
} catch (a2) {
  Lb = false;
}
function Nb(a2, b2, c2, d2, e2, f2, g2, h2, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b2.apply(c2, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a2) {
  Ob = true;
  Pb = a2;
} };
function Tb(a2, b2, c2, d2, e2, f2, g2, h2, k2) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a2, b2, c2, d2, e2, f2, g2, h2, k2) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l2 = Pb;
      Ob = false;
      Pb = null;
    } else throw Error(p$1(198));
    Qb || (Qb = true, Rb = l2);
  }
}
function Vb(a2) {
  var b2 = a2, c2 = a2;
  if (a2.alternate) for (; b2.return; ) b2 = b2.return;
  else {
    a2 = b2;
    do
      b2 = a2, 0 !== (b2.flags & 4098) && (c2 = b2.return), a2 = b2.return;
    while (a2);
  }
  return 3 === b2.tag ? c2 : null;
}
function Wb(a2) {
  if (13 === a2.tag) {
    var b2 = a2.memoizedState;
    null === b2 && (a2 = a2.alternate, null !== a2 && (b2 = a2.memoizedState));
    if (null !== b2) return b2.dehydrated;
  }
  return null;
}
function Xb(a2) {
  if (Vb(a2) !== a2) throw Error(p$1(188));
}
function Yb(a2) {
  var b2 = a2.alternate;
  if (!b2) {
    b2 = Vb(a2);
    if (null === b2) throw Error(p$1(188));
    return b2 !== a2 ? null : a2;
  }
  for (var c2 = a2, d2 = b2; ; ) {
    var e2 = c2.return;
    if (null === e2) break;
    var f2 = e2.alternate;
    if (null === f2) {
      d2 = e2.return;
      if (null !== d2) {
        c2 = d2;
        continue;
      }
      break;
    }
    if (e2.child === f2.child) {
      for (f2 = e2.child; f2; ) {
        if (f2 === c2) return Xb(e2), a2;
        if (f2 === d2) return Xb(e2), b2;
        f2 = f2.sibling;
      }
      throw Error(p$1(188));
    }
    if (c2.return !== d2.return) c2 = e2, d2 = f2;
    else {
      for (var g2 = false, h2 = e2.child; h2; ) {
        if (h2 === c2) {
          g2 = true;
          c2 = e2;
          d2 = f2;
          break;
        }
        if (h2 === d2) {
          g2 = true;
          d2 = e2;
          c2 = f2;
          break;
        }
        h2 = h2.sibling;
      }
      if (!g2) {
        for (h2 = f2.child; h2; ) {
          if (h2 === c2) {
            g2 = true;
            c2 = f2;
            d2 = e2;
            break;
          }
          if (h2 === d2) {
            g2 = true;
            d2 = f2;
            c2 = e2;
            break;
          }
          h2 = h2.sibling;
        }
        if (!g2) throw Error(p$1(189));
      }
    }
    if (c2.alternate !== d2) throw Error(p$1(190));
  }
  if (3 !== c2.tag) throw Error(p$1(188));
  return c2.stateNode.current === c2 ? a2 : b2;
}
function Zb(a2) {
  a2 = Yb(a2);
  return null !== a2 ? $b(a2) : null;
}
function $b(a2) {
  if (5 === a2.tag || 6 === a2.tag) return a2;
  for (a2 = a2.child; null !== a2; ) {
    var b2 = $b(a2);
    if (null !== b2) return b2;
    a2 = a2.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(a2) {
  if (lc && "function" === typeof lc.onCommitFiberRoot) try {
    lc.onCommitFiberRoot(kc, a2, void 0, 128 === (a2.current.flags & 128));
  } catch (b2) {
  }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(a2) {
  a2 >>>= 0;
  return 0 === a2 ? 32 : 31 - (pc(a2) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(a2) {
  switch (a2 & -a2) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a2 & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a2 & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a2;
  }
}
function uc(a2, b2) {
  var c2 = a2.pendingLanes;
  if (0 === c2) return 0;
  var d2 = 0, e2 = a2.suspendedLanes, f2 = a2.pingedLanes, g2 = c2 & 268435455;
  if (0 !== g2) {
    var h2 = g2 & ~e2;
    0 !== h2 ? d2 = tc(h2) : (f2 &= g2, 0 !== f2 && (d2 = tc(f2)));
  } else g2 = c2 & ~e2, 0 !== g2 ? d2 = tc(g2) : 0 !== f2 && (d2 = tc(f2));
  if (0 === d2) return 0;
  if (0 !== b2 && b2 !== d2 && 0 === (b2 & e2) && (e2 = d2 & -d2, f2 = b2 & -b2, e2 >= f2 || 16 === e2 && 0 !== (f2 & 4194240))) return b2;
  0 !== (d2 & 4) && (d2 |= c2 & 16);
  b2 = a2.entangledLanes;
  if (0 !== b2) for (a2 = a2.entanglements, b2 &= d2; 0 < b2; ) c2 = 31 - oc(b2), e2 = 1 << c2, d2 |= a2[c2], b2 &= ~e2;
  return d2;
}
function vc(a2, b2) {
  switch (a2) {
    case 1:
    case 2:
    case 4:
      return b2 + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b2 + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a2, b2) {
  for (var c2 = a2.suspendedLanes, d2 = a2.pingedLanes, e2 = a2.expirationTimes, f2 = a2.pendingLanes; 0 < f2; ) {
    var g2 = 31 - oc(f2), h2 = 1 << g2, k2 = e2[g2];
    if (-1 === k2) {
      if (0 === (h2 & c2) || 0 !== (h2 & d2)) e2[g2] = vc(h2, b2);
    } else k2 <= b2 && (a2.expiredLanes |= h2);
    f2 &= ~h2;
  }
}
function xc(a2) {
  a2 = a2.pendingLanes & -1073741825;
  return 0 !== a2 ? a2 : a2 & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a2 = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a2;
}
function zc(a2) {
  for (var b2 = [], c2 = 0; 31 > c2; c2++) b2.push(a2);
  return b2;
}
function Ac(a2, b2, c2) {
  a2.pendingLanes |= b2;
  536870912 !== b2 && (a2.suspendedLanes = 0, a2.pingedLanes = 0);
  a2 = a2.eventTimes;
  b2 = 31 - oc(b2);
  a2[b2] = c2;
}
function Bc(a2, b2) {
  var c2 = a2.pendingLanes & ~b2;
  a2.pendingLanes = b2;
  a2.suspendedLanes = 0;
  a2.pingedLanes = 0;
  a2.expiredLanes &= b2;
  a2.mutableReadLanes &= b2;
  a2.entangledLanes &= b2;
  b2 = a2.entanglements;
  var d2 = a2.eventTimes;
  for (a2 = a2.expirationTimes; 0 < c2; ) {
    var e2 = 31 - oc(c2), f2 = 1 << e2;
    b2[e2] = 0;
    d2[e2] = -1;
    a2[e2] = -1;
    c2 &= ~f2;
  }
}
function Cc(a2, b2) {
  var c2 = a2.entangledLanes |= b2;
  for (a2 = a2.entanglements; c2; ) {
    var d2 = 31 - oc(c2), e2 = 1 << d2;
    e2 & b2 | a2[d2] & b2 && (a2[d2] |= b2);
    c2 &= ~e2;
  }
}
var C = 0;
function Dc(a2) {
  a2 &= -a2;
  return 1 < a2 ? 4 < a2 ? 0 !== (a2 & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a2, b2) {
  switch (a2) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b2.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b2.pointerId);
  }
}
function Tc(a2, b2, c2, d2, e2, f2) {
  if (null === a2 || a2.nativeEvent !== f2) return a2 = { blockedOn: b2, domEventName: c2, eventSystemFlags: d2, nativeEvent: f2, targetContainers: [e2] }, null !== b2 && (b2 = Cb(b2), null !== b2 && Fc(b2)), a2;
  a2.eventSystemFlags |= d2;
  b2 = a2.targetContainers;
  null !== e2 && -1 === b2.indexOf(e2) && b2.push(e2);
  return a2;
}
function Uc(a2, b2, c2, d2, e2) {
  switch (b2) {
    case "focusin":
      return Lc = Tc(Lc, a2, b2, c2, d2, e2), true;
    case "dragenter":
      return Mc = Tc(Mc, a2, b2, c2, d2, e2), true;
    case "mouseover":
      return Nc = Tc(Nc, a2, b2, c2, d2, e2), true;
    case "pointerover":
      var f2 = e2.pointerId;
      Oc.set(f2, Tc(Oc.get(f2) || null, a2, b2, c2, d2, e2));
      return true;
    case "gotpointercapture":
      return f2 = e2.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a2, b2, c2, d2, e2)), true;
  }
  return false;
}
function Vc(a2) {
  var b2 = Wc(a2.target);
  if (null !== b2) {
    var c2 = Vb(b2);
    if (null !== c2) {
      if (b2 = c2.tag, 13 === b2) {
        if (b2 = Wb(c2), null !== b2) {
          a2.blockedOn = b2;
          Ic(a2.priority, function() {
            Gc(c2);
          });
          return;
        }
      } else if (3 === b2 && c2.stateNode.current.memoizedState.isDehydrated) {
        a2.blockedOn = 3 === c2.tag ? c2.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a2.blockedOn = null;
}
function Xc(a2) {
  if (null !== a2.blockedOn) return false;
  for (var b2 = a2.targetContainers; 0 < b2.length; ) {
    var c2 = Yc(a2.domEventName, a2.eventSystemFlags, b2[0], a2.nativeEvent);
    if (null === c2) {
      c2 = a2.nativeEvent;
      var d2 = new c2.constructor(c2.type, c2);
      wb = d2;
      c2.target.dispatchEvent(d2);
      wb = null;
    } else return b2 = Cb(c2), null !== b2 && Fc(b2), a2.blockedOn = c2, false;
    b2.shift();
  }
  return true;
}
function Zc(a2, b2, c2) {
  Xc(a2) && c2.delete(b2);
}
function $c() {
  Jc = false;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a2, b2) {
  a2.blockedOn === b2 && (a2.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a2) {
  function b2(b3) {
    return ad(b3, a2);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a2);
    for (var c2 = 1; c2 < Kc.length; c2++) {
      var d2 = Kc[c2];
      d2.blockedOn === a2 && (d2.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a2);
  null !== Mc && ad(Mc, a2);
  null !== Nc && ad(Nc, a2);
  Oc.forEach(b2);
  Pc.forEach(b2);
  for (c2 = 0; c2 < Qc.length; c2++) d2 = Qc[c2], d2.blockedOn === a2 && (d2.blockedOn = null);
  for (; 0 < Qc.length && (c2 = Qc[0], null === c2.blockedOn); ) Vc(c2), null === c2.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = true;
function ed(a2, b2, c2, d2) {
  var e2 = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 1, fd(a2, b2, c2, d2);
  } finally {
    C = e2, cd.transition = f2;
  }
}
function gd(a2, b2, c2, d2) {
  var e2 = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 4, fd(a2, b2, c2, d2);
  } finally {
    C = e2, cd.transition = f2;
  }
}
function fd(a2, b2, c2, d2) {
  if (dd) {
    var e2 = Yc(a2, b2, c2, d2);
    if (null === e2) hd(a2, b2, d2, id, c2), Sc(a2, d2);
    else if (Uc(e2, a2, b2, c2, d2)) d2.stopPropagation();
    else if (Sc(a2, d2), b2 & 4 && -1 < Rc.indexOf(a2)) {
      for (; null !== e2; ) {
        var f2 = Cb(e2);
        null !== f2 && Ec(f2);
        f2 = Yc(a2, b2, c2, d2);
        null === f2 && hd(a2, b2, d2, id, c2);
        if (f2 === e2) break;
        e2 = f2;
      }
      null !== e2 && d2.stopPropagation();
    } else hd(a2, b2, d2, null, c2);
  }
}
var id = null;
function Yc(a2, b2, c2, d2) {
  id = null;
  a2 = xb(d2);
  a2 = Wc(a2);
  if (null !== a2) if (b2 = Vb(a2), null === b2) a2 = null;
  else if (c2 = b2.tag, 13 === c2) {
    a2 = Wb(b2);
    if (null !== a2) return a2;
    a2 = null;
  } else if (3 === c2) {
    if (b2.stateNode.current.memoizedState.isDehydrated) return 3 === b2.tag ? b2.stateNode.containerInfo : null;
    a2 = null;
  } else b2 !== a2 && (a2 = null);
  id = a2;
  return null;
}
function jd(a2) {
  switch (a2) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md) return md;
  var a2, b2 = ld, c2 = b2.length, d2, e2 = "value" in kd ? kd.value : kd.textContent, f2 = e2.length;
  for (a2 = 0; a2 < c2 && b2[a2] === e2[a2]; a2++) ;
  var g2 = c2 - a2;
  for (d2 = 1; d2 <= g2 && b2[c2 - d2] === e2[f2 - d2]; d2++) ;
  return md = e2.slice(a2, 1 < d2 ? 1 - d2 : void 0);
}
function od(a2) {
  var b2 = a2.keyCode;
  "charCode" in a2 ? (a2 = a2.charCode, 0 === a2 && 13 === b2 && (a2 = 13)) : a2 = b2;
  10 === a2 && (a2 = 13);
  return 32 <= a2 || 13 === a2 ? a2 : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a2) {
  function b2(b3, d2, e2, f2, g2) {
    this._reactName = b3;
    this._targetInst = e2;
    this.type = d2;
    this.nativeEvent = f2;
    this.target = g2;
    this.currentTarget = null;
    for (var c2 in a2) a2.hasOwnProperty(c2) && (b3 = a2[c2], this[c2] = b3 ? b3(f2) : f2[c2]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A$1(b2.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a3 = this.nativeEvent;
    a3 && (a3.preventDefault ? a3.preventDefault() : "unknown" !== typeof a3.returnValue && (a3.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a3 = this.nativeEvent;
    a3 && (a3.stopPropagation ? a3.stopPropagation() : "unknown" !== typeof a3.cancelBubble && (a3.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b2;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a2) {
  return a2.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A$1({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A$1({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a2) {
  return void 0 === a2.relatedTarget ? a2.fromElement === a2.srcElement ? a2.toElement : a2.fromElement : a2.relatedTarget;
}, movementX: function(a2) {
  if ("movementX" in a2) return a2.movementX;
  a2 !== yd && (yd && "mousemove" === a2.type ? (wd = a2.screenX - yd.screenX, xd = a2.screenY - yd.screenY) : xd = wd = 0, yd = a2);
  return wd;
}, movementY: function(a2) {
  return "movementY" in a2 ? a2.movementY : xd;
} }), Bd = rd(Ad), Cd = A$1({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A$1({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A$1({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A$1({}, sd, { clipboardData: function(a2) {
  return "clipboardData" in a2 ? a2.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A$1({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a2) {
  var b2 = this.nativeEvent;
  return b2.getModifierState ? b2.getModifierState(a2) : (a2 = Od[a2]) ? !!b2[a2] : false;
}
function zd() {
  return Pd;
}
var Qd = A$1({}, ud, { key: function(a2) {
  if (a2.key) {
    var b2 = Md[a2.key] || a2.key;
    if ("Unidentified" !== b2) return b2;
  }
  return "keypress" === a2.type ? (a2 = od(a2), 13 === a2 ? "Enter" : String.fromCharCode(a2)) : "keydown" === a2.type || "keyup" === a2.type ? Nd[a2.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a2) {
  return "keypress" === a2.type ? od(a2) : 0;
}, keyCode: function(a2) {
  return "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
}, which: function(a2) {
  return "keypress" === a2.type ? od(a2) : "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
} }), Rd = rd(Qd), Sd = A$1({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A$1({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A$1({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A$1({}, Ad, {
  deltaX: function(a2) {
    return "deltaX" in a2 ? a2.deltaX : "wheelDeltaX" in a2 ? -a2.wheelDeltaX : 0;
  },
  deltaY: function(a2) {
    return "deltaY" in a2 ? a2.deltaY : "wheelDeltaY" in a2 ? -a2.wheelDeltaY : "wheelDelta" in a2 ? -a2.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be$1 = null;
ia && "documentMode" in document && (be$1 = document.documentMode);
var ce = ia && "TextEvent" in window && !be$1, de$1 = ia && (!ae || be$1 && 8 < be$1 && 11 >= be$1), ee$1 = String.fromCharCode(32), fe$1 = false;
function ge$1(a2, b2) {
  switch (a2) {
    case "keyup":
      return -1 !== $d.indexOf(b2.keyCode);
    case "keydown":
      return 229 !== b2.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he$1(a2) {
  a2 = a2.detail;
  return "object" === typeof a2 && "data" in a2 ? a2.data : null;
}
var ie = false;
function je(a2, b2) {
  switch (a2) {
    case "compositionend":
      return he$1(b2);
    case "keypress":
      if (32 !== b2.which) return null;
      fe$1 = true;
      return ee$1;
    case "textInput":
      return a2 = b2.data, a2 === ee$1 && fe$1 ? null : a2;
    default:
      return null;
  }
}
function ke(a2, b2) {
  if (ie) return "compositionend" === a2 || !ae && ge$1(a2, b2) ? (a2 = nd(), md = ld = kd = null, ie = false, a2) : null;
  switch (a2) {
    case "paste":
      return null;
    case "keypress":
      if (!(b2.ctrlKey || b2.altKey || b2.metaKey) || b2.ctrlKey && b2.altKey) {
        if (b2.char && 1 < b2.char.length) return b2.char;
        if (b2.which) return String.fromCharCode(b2.which);
      }
      return null;
    case "compositionend":
      return de$1 && "ko" !== b2.locale ? null : b2.data;
    default:
      return null;
  }
}
var le$1 = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a2) {
  var b2 = a2 && a2.nodeName && a2.nodeName.toLowerCase();
  return "input" === b2 ? !!le$1[a2.type] : "textarea" === b2 ? true : false;
}
function ne$1(a2, b2, c2, d2) {
  Eb(d2);
  b2 = oe$1(b2, "onChange");
  0 < b2.length && (c2 = new td("onChange", "change", null, c2, d2), a2.push({ event: c2, listeners: b2 }));
}
var pe$1 = null, qe = null;
function re$2(a2) {
  se$1(a2, 0);
}
function te(a2) {
  var b2 = ue$1(a2);
  if (Wa(b2)) return a2;
}
function ve$1(a2, b2) {
  if ("change" === a2) return b2;
}
var we = false;
if (ia) {
  var xe$1;
  if (ia) {
    var ye$1 = "oninput" in document;
    if (!ye$1) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye$1 = "function" === typeof ze.oninput;
    }
    xe$1 = ye$1;
  } else xe$1 = false;
  we = xe$1 && (!document.documentMode || 9 < document.documentMode);
}
function Ae$1() {
  pe$1 && (pe$1.detachEvent("onpropertychange", Be), qe = pe$1 = null);
}
function Be(a2) {
  if ("value" === a2.propertyName && te(qe)) {
    var b2 = [];
    ne$1(b2, qe, a2, xb(a2));
    Jb(re$2, b2);
  }
}
function Ce(a2, b2, c2) {
  "focusin" === a2 ? (Ae$1(), pe$1 = b2, qe = c2, pe$1.attachEvent("onpropertychange", Be)) : "focusout" === a2 && Ae$1();
}
function De(a2) {
  if ("selectionchange" === a2 || "keyup" === a2 || "keydown" === a2) return te(qe);
}
function Ee$1(a2, b2) {
  if ("click" === a2) return te(b2);
}
function Fe(a2, b2) {
  if ("input" === a2 || "change" === a2) return te(b2);
}
function Ge(a2, b2) {
  return a2 === b2 && (0 !== a2 || 1 / a2 === 1 / b2) || a2 !== a2 && b2 !== b2;
}
var He = "function" === typeof Object.is ? Object.is : Ge;
function Ie$1(a2, b2) {
  if (He(a2, b2)) return true;
  if ("object" !== typeof a2 || null === a2 || "object" !== typeof b2 || null === b2) return false;
  var c2 = Object.keys(a2), d2 = Object.keys(b2);
  if (c2.length !== d2.length) return false;
  for (d2 = 0; d2 < c2.length; d2++) {
    var e2 = c2[d2];
    if (!ja.call(b2, e2) || !He(a2[e2], b2[e2])) return false;
  }
  return true;
}
function Je(a2) {
  for (; a2 && a2.firstChild; ) a2 = a2.firstChild;
  return a2;
}
function Ke(a2, b2) {
  var c2 = Je(a2);
  a2 = 0;
  for (var d2; c2; ) {
    if (3 === c2.nodeType) {
      d2 = a2 + c2.textContent.length;
      if (a2 <= b2 && d2 >= b2) return { node: c2, offset: b2 - a2 };
      a2 = d2;
    }
    a: {
      for (; c2; ) {
        if (c2.nextSibling) {
          c2 = c2.nextSibling;
          break a;
        }
        c2 = c2.parentNode;
      }
      c2 = void 0;
    }
    c2 = Je(c2);
  }
}
function Le(a2, b2) {
  return a2 && b2 ? a2 === b2 ? true : a2 && 3 === a2.nodeType ? false : b2 && 3 === b2.nodeType ? Le(a2, b2.parentNode) : "contains" in a2 ? a2.contains(b2) : a2.compareDocumentPosition ? !!(a2.compareDocumentPosition(b2) & 16) : false : false;
}
function Me() {
  for (var a2 = window, b2 = Xa(); b2 instanceof a2.HTMLIFrameElement; ) {
    try {
      var c2 = "string" === typeof b2.contentWindow.location.href;
    } catch (d2) {
      c2 = false;
    }
    if (c2) a2 = b2.contentWindow;
    else break;
    b2 = Xa(a2.document);
  }
  return b2;
}
function Ne(a2) {
  var b2 = a2 && a2.nodeName && a2.nodeName.toLowerCase();
  return b2 && ("input" === b2 && ("text" === a2.type || "search" === a2.type || "tel" === a2.type || "url" === a2.type || "password" === a2.type) || "textarea" === b2 || "true" === a2.contentEditable);
}
function Oe(a2) {
  var b2 = Me(), c2 = a2.focusedElem, d2 = a2.selectionRange;
  if (b2 !== c2 && c2 && c2.ownerDocument && Le(c2.ownerDocument.documentElement, c2)) {
    if (null !== d2 && Ne(c2)) {
      if (b2 = d2.start, a2 = d2.end, void 0 === a2 && (a2 = b2), "selectionStart" in c2) c2.selectionStart = b2, c2.selectionEnd = Math.min(a2, c2.value.length);
      else if (a2 = (b2 = c2.ownerDocument || document) && b2.defaultView || window, a2.getSelection) {
        a2 = a2.getSelection();
        var e2 = c2.textContent.length, f2 = Math.min(d2.start, e2);
        d2 = void 0 === d2.end ? f2 : Math.min(d2.end, e2);
        !a2.extend && f2 > d2 && (e2 = d2, d2 = f2, f2 = e2);
        e2 = Ke(c2, f2);
        var g2 = Ke(
          c2,
          d2
        );
        e2 && g2 && (1 !== a2.rangeCount || a2.anchorNode !== e2.node || a2.anchorOffset !== e2.offset || a2.focusNode !== g2.node || a2.focusOffset !== g2.offset) && (b2 = b2.createRange(), b2.setStart(e2.node, e2.offset), a2.removeAllRanges(), f2 > d2 ? (a2.addRange(b2), a2.extend(g2.node, g2.offset)) : (b2.setEnd(g2.node, g2.offset), a2.addRange(b2)));
      }
    }
    b2 = [];
    for (a2 = c2; a2 = a2.parentNode; ) 1 === a2.nodeType && b2.push({ element: a2, left: a2.scrollLeft, top: a2.scrollTop });
    "function" === typeof c2.focus && c2.focus();
    for (c2 = 0; c2 < b2.length; c2++) a2 = b2[c2], a2.element.scrollLeft = a2.left, a2.element.scrollTop = a2.top;
  }
}
var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re$1 = null, Se$1 = null, Te$1 = false;
function Ue(a2, b2, c2) {
  var d2 = c2.window === c2 ? c2.document : 9 === c2.nodeType ? c2 : c2.ownerDocument;
  Te$1 || null == Qe || Qe !== Xa(d2) || (d2 = Qe, "selectionStart" in d2 && Ne(d2) ? d2 = { start: d2.selectionStart, end: d2.selectionEnd } : (d2 = (d2.ownerDocument && d2.ownerDocument.defaultView || window).getSelection(), d2 = { anchorNode: d2.anchorNode, anchorOffset: d2.anchorOffset, focusNode: d2.focusNode, focusOffset: d2.focusOffset }), Se$1 && Ie$1(Se$1, d2) || (Se$1 = d2, d2 = oe$1(Re$1, "onSelect"), 0 < d2.length && (b2 = new td("onSelect", "select", null, b2, c2), a2.push({ event: b2, listeners: d2 }), b2.target = Qe)));
}
function Ve(a2, b2) {
  var c2 = {};
  c2[a2.toLowerCase()] = b2.toLowerCase();
  c2["Webkit" + a2] = "webkit" + b2;
  c2["Moz" + a2] = "moz" + b2;
  return c2;
}
var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
function Ze(a2) {
  if (Xe[a2]) return Xe[a2];
  if (!We[a2]) return a2;
  var b2 = We[a2], c2;
  for (c2 in b2) if (b2.hasOwnProperty(c2) && c2 in Ye) return Xe[a2] = b2[c2];
  return a2;
}
var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a2, b2) {
  df.set(a2, b2);
  fa(b2, [a2]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a2, b2, c2) {
  var d2 = a2.type || "unknown-event";
  a2.currentTarget = c2;
  Ub(d2, b2, void 0, a2);
  a2.currentTarget = null;
}
function se$1(a2, b2) {
  b2 = 0 !== (b2 & 4);
  for (var c2 = 0; c2 < a2.length; c2++) {
    var d2 = a2[c2], e2 = d2.event;
    d2 = d2.listeners;
    a: {
      var f2 = void 0;
      if (b2) for (var g2 = d2.length - 1; 0 <= g2; g2--) {
        var h2 = d2[g2], k2 = h2.instance, l2 = h2.currentTarget;
        h2 = h2.listener;
        if (k2 !== f2 && e2.isPropagationStopped()) break a;
        nf(e2, h2, l2);
        f2 = k2;
      }
      else for (g2 = 0; g2 < d2.length; g2++) {
        h2 = d2[g2];
        k2 = h2.instance;
        l2 = h2.currentTarget;
        h2 = h2.listener;
        if (k2 !== f2 && e2.isPropagationStopped()) break a;
        nf(e2, h2, l2);
        f2 = k2;
      }
    }
  }
  if (Qb) throw a2 = Rb, Qb = false, Rb = null, a2;
}
function D$1(a2, b2) {
  var c2 = b2[of];
  void 0 === c2 && (c2 = b2[of] = /* @__PURE__ */ new Set());
  var d2 = a2 + "__bubble";
  c2.has(d2) || (pf(b2, a2, 2, false), c2.add(d2));
}
function qf(a2, b2, c2) {
  var d2 = 0;
  b2 && (d2 |= 4);
  pf(c2, a2, d2, b2);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a2) {
  if (!a2[rf]) {
    a2[rf] = true;
    da.forEach(function(b3) {
      "selectionchange" !== b3 && (mf.has(b3) || qf(b3, false, a2), qf(b3, true, a2));
    });
    var b2 = 9 === a2.nodeType ? a2 : a2.ownerDocument;
    null === b2 || b2[rf] || (b2[rf] = true, qf("selectionchange", false, b2));
  }
}
function pf(a2, b2, c2, d2) {
  switch (jd(b2)) {
    case 1:
      var e2 = ed;
      break;
    case 4:
      e2 = gd;
      break;
    default:
      e2 = fd;
  }
  c2 = e2.bind(null, b2, c2, a2);
  e2 = void 0;
  !Lb || "touchstart" !== b2 && "touchmove" !== b2 && "wheel" !== b2 || (e2 = true);
  d2 ? void 0 !== e2 ? a2.addEventListener(b2, c2, { capture: true, passive: e2 }) : a2.addEventListener(b2, c2, true) : void 0 !== e2 ? a2.addEventListener(b2, c2, { passive: e2 }) : a2.addEventListener(b2, c2, false);
}
function hd(a2, b2, c2, d2, e2) {
  var f2 = d2;
  if (0 === (b2 & 1) && 0 === (b2 & 2) && null !== d2) a: for (; ; ) {
    if (null === d2) return;
    var g2 = d2.tag;
    if (3 === g2 || 4 === g2) {
      var h2 = d2.stateNode.containerInfo;
      if (h2 === e2 || 8 === h2.nodeType && h2.parentNode === e2) break;
      if (4 === g2) for (g2 = d2.return; null !== g2; ) {
        var k2 = g2.tag;
        if (3 === k2 || 4 === k2) {
          if (k2 = g2.stateNode.containerInfo, k2 === e2 || 8 === k2.nodeType && k2.parentNode === e2) return;
        }
        g2 = g2.return;
      }
      for (; null !== h2; ) {
        g2 = Wc(h2);
        if (null === g2) return;
        k2 = g2.tag;
        if (5 === k2 || 6 === k2) {
          d2 = f2 = g2;
          continue a;
        }
        h2 = h2.parentNode;
      }
    }
    d2 = d2.return;
  }
  Jb(function() {
    var d3 = f2, e3 = xb(c2), g3 = [];
    a: {
      var h3 = df.get(a2);
      if (void 0 !== h3) {
        var k3 = td, n2 = a2;
        switch (a2) {
          case "keypress":
            if (0 === od(c2)) break a;
          case "keydown":
          case "keyup":
            k3 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Fd;
            break;
          case "click":
            if (2 === c2.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Vd;
            break;
          case $e:
          case af:
          case bf:
            k3 = Hd;
            break;
          case cf:
            k3 = Xd;
            break;
          case "scroll":
            k3 = vd;
            break;
          case "wheel":
            k3 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Td;
        }
        var t2 = 0 !== (b2 & 4), J2 = !t2 && "scroll" === a2, x2 = t2 ? null !== h3 ? h3 + "Capture" : null : h3;
        t2 = [];
        for (var w2 = d3, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
          if (J2) break;
          w2 = w2.return;
        }
        0 < t2.length && (h3 = new k3(h3, n2, null, c2, e3), g3.push({ event: h3, listeners: t2 }));
      }
    }
    if (0 === (b2 & 7)) {
      a: {
        h3 = "mouseover" === a2 || "pointerover" === a2;
        k3 = "mouseout" === a2 || "pointerout" === a2;
        if (h3 && c2 !== wb && (n2 = c2.relatedTarget || c2.fromElement) && (Wc(n2) || n2[uf])) break a;
        if (k3 || h3) {
          h3 = e3.window === e3 ? e3 : (h3 = e3.ownerDocument) ? h3.defaultView || h3.parentWindow : window;
          if (k3) {
            if (n2 = c2.relatedTarget || c2.toElement, k3 = d3, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
          } else k3 = null, n2 = d3;
          if (k3 !== n2) {
            t2 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a2 || "pointerover" === a2) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k3 ? h3 : ue$1(k3);
            u2 = null == n2 ? h3 : ue$1(n2);
            h3 = new t2(F2, w2 + "leave", k3, c2, e3);
            h3.target = J2;
            h3.relatedTarget = u2;
            F2 = null;
            Wc(e3) === d3 && (t2 = new t2(x2, w2 + "enter", n2, c2, e3), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
            J2 = F2;
            if (k3 && n2) b: {
              t2 = k3;
              x2 = n2;
              w2 = 0;
              for (u2 = t2; u2; u2 = vf(u2)) w2++;
              u2 = 0;
              for (F2 = x2; F2; F2 = vf(F2)) u2++;
              for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
              for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
              for (; w2--; ) {
                if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                t2 = vf(t2);
                x2 = vf(x2);
              }
              t2 = null;
            }
            else t2 = null;
            null !== k3 && wf(g3, h3, k3, t2, false);
            null !== n2 && null !== J2 && wf(g3, J2, n2, t2, true);
          }
        }
      }
      a: {
        h3 = d3 ? ue$1(d3) : window;
        k3 = h3.nodeName && h3.nodeName.toLowerCase();
        if ("select" === k3 || "input" === k3 && "file" === h3.type) var na = ve$1;
        else if (me(h3)) if (we) na = Fe;
        else {
          na = De;
          var xa = Ce;
        }
        else (k3 = h3.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h3.type || "radio" === h3.type) && (na = Ee$1);
        if (na && (na = na(a2, d3))) {
          ne$1(g3, na, c2, e3);
          break a;
        }
        xa && xa(a2, h3, d3);
        "focusout" === a2 && (xa = h3._wrapperState) && xa.controlled && "number" === h3.type && cb(h3, "number", h3.value);
      }
      xa = d3 ? ue$1(d3) : window;
      switch (a2) {
        case "focusin":
          if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re$1 = d3, Se$1 = null;
          break;
        case "focusout":
          Se$1 = Re$1 = Qe = null;
          break;
        case "mousedown":
          Te$1 = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te$1 = false;
          Ue(g3, c2, e3);
          break;
        case "selectionchange":
          if (Pe) break;
        case "keydown":
        case "keyup":
          Ue(g3, c2, e3);
      }
      var $a;
      if (ae) b: {
        switch (a2) {
          case "compositionstart":
            var ba = "onCompositionStart";
            break b;
          case "compositionend":
            ba = "onCompositionEnd";
            break b;
          case "compositionupdate":
            ba = "onCompositionUpdate";
            break b;
        }
        ba = void 0;
      }
      else ie ? ge$1(a2, c2) && (ba = "onCompositionEnd") : "keydown" === a2 && 229 === c2.keyCode && (ba = "onCompositionStart");
      ba && (de$1 && "ko" !== c2.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e3, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe$1(d3, ba), 0 < xa.length && (ba = new Ld(ba, a2, null, c2, e3), g3.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he$1(c2), null !== $a && (ba.data = $a))));
      if ($a = ce ? je(a2, c2) : ke(a2, c2)) d3 = oe$1(d3, "onBeforeInput"), 0 < d3.length && (e3 = new Ld("onBeforeInput", "beforeinput", null, c2, e3), g3.push({ event: e3, listeners: d3 }), e3.data = $a);
    }
    se$1(g3, b2);
  });
}
function tf(a2, b2, c2) {
  return { instance: a2, listener: b2, currentTarget: c2 };
}
function oe$1(a2, b2) {
  for (var c2 = b2 + "Capture", d2 = []; null !== a2; ) {
    var e2 = a2, f2 = e2.stateNode;
    5 === e2.tag && null !== f2 && (e2 = f2, f2 = Kb(a2, c2), null != f2 && d2.unshift(tf(a2, f2, e2)), f2 = Kb(a2, b2), null != f2 && d2.push(tf(a2, f2, e2)));
    a2 = a2.return;
  }
  return d2;
}
function vf(a2) {
  if (null === a2) return null;
  do
    a2 = a2.return;
  while (a2 && 5 !== a2.tag);
  return a2 ? a2 : null;
}
function wf(a2, b2, c2, d2, e2) {
  for (var f2 = b2._reactName, g2 = []; null !== c2 && c2 !== d2; ) {
    var h2 = c2, k2 = h2.alternate, l2 = h2.stateNode;
    if (null !== k2 && k2 === d2) break;
    5 === h2.tag && null !== l2 && (h2 = l2, e2 ? (k2 = Kb(c2, f2), null != k2 && g2.unshift(tf(c2, k2, h2))) : e2 || (k2 = Kb(c2, f2), null != k2 && g2.push(tf(c2, k2, h2))));
    c2 = c2.return;
  }
  0 !== g2.length && a2.push({ event: b2, listeners: g2 });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a2) {
  return ("string" === typeof a2 ? a2 : "" + a2).replace(xf, "\n").replace(yf, "");
}
function Af(a2, b2, c2) {
  b2 = zf(b2);
  if (zf(a2) !== b2 && c2) throw Error(p$1(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a2, b2) {
  return "textarea" === a2 || "noscript" === a2 || "string" === typeof b2.children || "number" === typeof b2.children || "object" === typeof b2.dangerouslySetInnerHTML && null !== b2.dangerouslySetInnerHTML && null != b2.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a2) {
  return Hf.resolve(null).then(a2).catch(If);
} : Ff;
function If(a2) {
  setTimeout(function() {
    throw a2;
  });
}
function Kf(a2, b2) {
  var c2 = b2, d2 = 0;
  do {
    var e2 = c2.nextSibling;
    a2.removeChild(c2);
    if (e2 && 8 === e2.nodeType) if (c2 = e2.data, "/$" === c2) {
      if (0 === d2) {
        a2.removeChild(e2);
        bd(b2);
        return;
      }
      d2--;
    } else "$" !== c2 && "$?" !== c2 && "$!" !== c2 || d2++;
    c2 = e2;
  } while (c2);
  bd(b2);
}
function Lf(a2) {
  for (; null != a2; a2 = a2.nextSibling) {
    var b2 = a2.nodeType;
    if (1 === b2 || 3 === b2) break;
    if (8 === b2) {
      b2 = a2.data;
      if ("$" === b2 || "$!" === b2 || "$?" === b2) break;
      if ("/$" === b2) return null;
    }
  }
  return a2;
}
function Mf(a2) {
  a2 = a2.previousSibling;
  for (var b2 = 0; a2; ) {
    if (8 === a2.nodeType) {
      var c2 = a2.data;
      if ("$" === c2 || "$!" === c2 || "$?" === c2) {
        if (0 === b2) return a2;
        b2--;
      } else "/$" === c2 && b2++;
    }
    a2 = a2.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a2) {
  var b2 = a2[Of];
  if (b2) return b2;
  for (var c2 = a2.parentNode; c2; ) {
    if (b2 = c2[uf] || c2[Of]) {
      c2 = b2.alternate;
      if (null !== b2.child || null !== c2 && null !== c2.child) for (a2 = Mf(a2); null !== a2; ) {
        if (c2 = a2[Of]) return c2;
        a2 = Mf(a2);
      }
      return b2;
    }
    a2 = c2;
    c2 = a2.parentNode;
  }
  return null;
}
function Cb(a2) {
  a2 = a2[Of] || a2[uf];
  return !a2 || 5 !== a2.tag && 6 !== a2.tag && 13 !== a2.tag && 3 !== a2.tag ? null : a2;
}
function ue$1(a2) {
  if (5 === a2.tag || 6 === a2.tag) return a2.stateNode;
  throw Error(p$1(33));
}
function Db(a2) {
  return a2[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a2) {
  return { current: a2 };
}
function E(a2) {
  0 > Tf || (a2.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G$1(a2, b2) {
  Tf++;
  Sf[Tf] = a2.current;
  a2.current = b2;
}
var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a2, b2) {
  var c2 = a2.type.contextTypes;
  if (!c2) return Vf;
  var d2 = a2.stateNode;
  if (d2 && d2.__reactInternalMemoizedUnmaskedChildContext === b2) return d2.__reactInternalMemoizedMaskedChildContext;
  var e2 = {}, f2;
  for (f2 in c2) e2[f2] = b2[f2];
  d2 && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = b2, a2.__reactInternalMemoizedMaskedChildContext = e2);
  return e2;
}
function Zf(a2) {
  a2 = a2.childContextTypes;
  return null !== a2 && void 0 !== a2;
}
function $f() {
  E(Wf);
  E(H);
}
function ag(a2, b2, c2) {
  if (H.current !== Vf) throw Error(p$1(168));
  G$1(H, b2);
  G$1(Wf, c2);
}
function bg(a2, b2, c2) {
  var d2 = a2.stateNode;
  b2 = b2.childContextTypes;
  if ("function" !== typeof d2.getChildContext) return c2;
  d2 = d2.getChildContext();
  for (var e2 in d2) if (!(e2 in b2)) throw Error(p$1(108, Ra(a2) || "Unknown", e2));
  return A$1({}, c2, d2);
}
function cg(a2) {
  a2 = (a2 = a2.stateNode) && a2.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H.current;
  G$1(H, a2);
  G$1(Wf, Wf.current);
  return true;
}
function dg(a2, b2, c2) {
  var d2 = a2.stateNode;
  if (!d2) throw Error(p$1(169));
  c2 ? (a2 = bg(a2, b2, Xf), d2.__reactInternalMemoizedMergedChildContext = a2, E(Wf), E(H), G$1(H, a2)) : E(Wf);
  G$1(Wf, c2);
}
var eg = null, fg = false, gg = false;
function hg(a2) {
  null === eg ? eg = [a2] : eg.push(a2);
}
function ig(a2) {
  fg = true;
  hg(a2);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a2 = 0, b2 = C;
    try {
      var c2 = eg;
      for (C = 1; a2 < c2.length; a2++) {
        var d2 = c2[a2];
        do
          d2 = d2(true);
        while (null !== d2);
      }
      eg = null;
      fg = false;
    } catch (e2) {
      throw null !== eg && (eg = eg.slice(a2 + 1)), ac(fc, jg), e2;
    } finally {
      C = b2, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a2, b2) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a2;
  ng = b2;
}
function ug(a2, b2, c2) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a2;
  var d2 = rg;
  a2 = sg;
  var e2 = 32 - oc(d2) - 1;
  d2 &= ~(1 << e2);
  c2 += 1;
  var f2 = 32 - oc(b2) + e2;
  if (30 < f2) {
    var g2 = e2 - e2 % 5;
    f2 = (d2 & (1 << g2) - 1).toString(32);
    d2 >>= g2;
    e2 -= g2;
    rg = 1 << 32 - oc(b2) + e2 | c2 << e2 | d2;
    sg = f2 + a2;
  } else rg = 1 << f2 | c2 << e2 | d2, sg = a2;
}
function vg(a2) {
  null !== a2.return && (tg(a2, 1), ug(a2, 1, 0));
}
function wg(a2) {
  for (; a2 === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a2 === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I$1 = false, zg = null;
function Ag(a2, b2) {
  var c2 = Bg(5, null, null, 0);
  c2.elementType = "DELETED";
  c2.stateNode = b2;
  c2.return = a2;
  b2 = a2.deletions;
  null === b2 ? (a2.deletions = [c2], a2.flags |= 16) : b2.push(c2);
}
function Cg(a2, b2) {
  switch (a2.tag) {
    case 5:
      var c2 = a2.type;
      b2 = 1 !== b2.nodeType || c2.toLowerCase() !== b2.nodeName.toLowerCase() ? null : b2;
      return null !== b2 ? (a2.stateNode = b2, xg = a2, yg = Lf(b2.firstChild), true) : false;
    case 6:
      return b2 = "" === a2.pendingProps || 3 !== b2.nodeType ? null : b2, null !== b2 ? (a2.stateNode = b2, xg = a2, yg = null, true) : false;
    case 13:
      return b2 = 8 !== b2.nodeType ? null : b2, null !== b2 ? (c2 = null !== qg ? { id: rg, overflow: sg } : null, a2.memoizedState = { dehydrated: b2, treeContext: c2, retryLane: 1073741824 }, c2 = Bg(18, null, null, 0), c2.stateNode = b2, c2.return = a2, a2.child = c2, xg = a2, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a2) {
  return 0 !== (a2.mode & 1) && 0 === (a2.flags & 128);
}
function Eg(a2) {
  if (I$1) {
    var b2 = yg;
    if (b2) {
      var c2 = b2;
      if (!Cg(a2, b2)) {
        if (Dg(a2)) throw Error(p$1(418));
        b2 = Lf(c2.nextSibling);
        var d2 = xg;
        b2 && Cg(a2, b2) ? Ag(d2, c2) : (a2.flags = a2.flags & -4097 | 2, I$1 = false, xg = a2);
      }
    } else {
      if (Dg(a2)) throw Error(p$1(418));
      a2.flags = a2.flags & -4097 | 2;
      I$1 = false;
      xg = a2;
    }
  }
}
function Fg(a2) {
  for (a2 = a2.return; null !== a2 && 5 !== a2.tag && 3 !== a2.tag && 13 !== a2.tag; ) a2 = a2.return;
  xg = a2;
}
function Gg(a2) {
  if (a2 !== xg) return false;
  if (!I$1) return Fg(a2), I$1 = true, false;
  var b2;
  (b2 = 3 !== a2.tag) && !(b2 = 5 !== a2.tag) && (b2 = a2.type, b2 = "head" !== b2 && "body" !== b2 && !Ef(a2.type, a2.memoizedProps));
  if (b2 && (b2 = yg)) {
    if (Dg(a2)) throw Hg(), Error(p$1(418));
    for (; b2; ) Ag(a2, b2), b2 = Lf(b2.nextSibling);
  }
  Fg(a2);
  if (13 === a2.tag) {
    a2 = a2.memoizedState;
    a2 = null !== a2 ? a2.dehydrated : null;
    if (!a2) throw Error(p$1(317));
    a: {
      a2 = a2.nextSibling;
      for (b2 = 0; a2; ) {
        if (8 === a2.nodeType) {
          var c2 = a2.data;
          if ("/$" === c2) {
            if (0 === b2) {
              yg = Lf(a2.nextSibling);
              break a;
            }
            b2--;
          } else "$" !== c2 && "$!" !== c2 && "$?" !== c2 || b2++;
        }
        a2 = a2.nextSibling;
      }
      yg = null;
    }
  } else yg = xg ? Lf(a2.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a2 = yg; a2; ) a2 = Lf(a2.nextSibling);
}
function Ig() {
  yg = xg = null;
  I$1 = false;
}
function Jg(a2) {
  null === zg ? zg = [a2] : zg.push(a2);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a2, b2, c2) {
  a2 = c2.ref;
  if (null !== a2 && "function" !== typeof a2 && "object" !== typeof a2) {
    if (c2._owner) {
      c2 = c2._owner;
      if (c2) {
        if (1 !== c2.tag) throw Error(p$1(309));
        var d2 = c2.stateNode;
      }
      if (!d2) throw Error(p$1(147, a2));
      var e2 = d2, f2 = "" + a2;
      if (null !== b2 && null !== b2.ref && "function" === typeof b2.ref && b2.ref._stringRef === f2) return b2.ref;
      b2 = function(a3) {
        var b3 = e2.refs;
        null === a3 ? delete b3[f2] : b3[f2] = a3;
      };
      b2._stringRef = f2;
      return b2;
    }
    if ("string" !== typeof a2) throw Error(p$1(284));
    if (!c2._owner) throw Error(p$1(290, a2));
  }
  return a2;
}
function Mg(a2, b2) {
  a2 = Object.prototype.toString.call(b2);
  throw Error(p$1(31, "[object Object]" === a2 ? "object with keys {" + Object.keys(b2).join(", ") + "}" : a2));
}
function Ng(a2) {
  var b2 = a2._init;
  return b2(a2._payload);
}
function Og(a2) {
  function b2(b3, c3) {
    if (a2) {
      var d3 = b3.deletions;
      null === d3 ? (b3.deletions = [c3], b3.flags |= 16) : d3.push(c3);
    }
  }
  function c2(c3, d3) {
    if (!a2) return null;
    for (; null !== d3; ) b2(c3, d3), d3 = d3.sibling;
    return null;
  }
  function d2(a3, b3) {
    for (a3 = /* @__PURE__ */ new Map(); null !== b3; ) null !== b3.key ? a3.set(b3.key, b3) : a3.set(b3.index, b3), b3 = b3.sibling;
    return a3;
  }
  function e2(a3, b3) {
    a3 = Pg(a3, b3);
    a3.index = 0;
    a3.sibling = null;
    return a3;
  }
  function f2(b3, c3, d3) {
    b3.index = d3;
    if (!a2) return b3.flags |= 1048576, c3;
    d3 = b3.alternate;
    if (null !== d3) return d3 = d3.index, d3 < c3 ? (b3.flags |= 2, c3) : d3;
    b3.flags |= 2;
    return c3;
  }
  function g2(b3) {
    a2 && null === b3.alternate && (b3.flags |= 2);
    return b3;
  }
  function h2(a3, b3, c3, d3) {
    if (null === b3 || 6 !== b3.tag) return b3 = Qg(c3, a3.mode, d3), b3.return = a3, b3;
    b3 = e2(b3, c3);
    b3.return = a3;
    return b3;
  }
  function k2(a3, b3, c3, d3) {
    var f3 = c3.type;
    if (f3 === ya) return m2(a3, b3, c3.props.children, d3, c3.key);
    if (null !== b3 && (b3.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b3.type)) return d3 = e2(b3, c3.props), d3.ref = Lg(a3, b3, c3), d3.return = a3, d3;
    d3 = Rg(c3.type, c3.key, c3.props, null, a3.mode, d3);
    d3.ref = Lg(a3, b3, c3);
    d3.return = a3;
    return d3;
  }
  function l2(a3, b3, c3, d3) {
    if (null === b3 || 4 !== b3.tag || b3.stateNode.containerInfo !== c3.containerInfo || b3.stateNode.implementation !== c3.implementation) return b3 = Sg(c3, a3.mode, d3), b3.return = a3, b3;
    b3 = e2(b3, c3.children || []);
    b3.return = a3;
    return b3;
  }
  function m2(a3, b3, c3, d3, f3) {
    if (null === b3 || 7 !== b3.tag) return b3 = Tg(c3, a3.mode, d3, f3), b3.return = a3, b3;
    b3 = e2(b3, c3);
    b3.return = a3;
    return b3;
  }
  function q2(a3, b3, c3) {
    if ("string" === typeof b3 && "" !== b3 || "number" === typeof b3) return b3 = Qg("" + b3, a3.mode, c3), b3.return = a3, b3;
    if ("object" === typeof b3 && null !== b3) {
      switch (b3.$$typeof) {
        case va:
          return c3 = Rg(b3.type, b3.key, b3.props, null, a3.mode, c3), c3.ref = Lg(a3, null, b3), c3.return = a3, c3;
        case wa:
          return b3 = Sg(b3, a3.mode, c3), b3.return = a3, b3;
        case Ha:
          var d3 = b3._init;
          return q2(a3, d3(b3._payload), c3);
      }
      if (eb(b3) || Ka(b3)) return b3 = Tg(b3, a3.mode, c3, null), b3.return = a3, b3;
      Mg(a3, b3);
    }
    return null;
  }
  function r2(a3, b3, c3, d3) {
    var e3 = null !== b3 ? b3.key : null;
    if ("string" === typeof c3 && "" !== c3 || "number" === typeof c3) return null !== e3 ? null : h2(a3, b3, "" + c3, d3);
    if ("object" === typeof c3 && null !== c3) {
      switch (c3.$$typeof) {
        case va:
          return c3.key === e3 ? k2(a3, b3, c3, d3) : null;
        case wa:
          return c3.key === e3 ? l2(a3, b3, c3, d3) : null;
        case Ha:
          return e3 = c3._init, r2(
            a3,
            b3,
            e3(c3._payload),
            d3
          );
      }
      if (eb(c3) || Ka(c3)) return null !== e3 ? null : m2(a3, b3, c3, d3, null);
      Mg(a3, c3);
    }
    return null;
  }
  function y2(a3, b3, c3, d3, e3) {
    if ("string" === typeof d3 && "" !== d3 || "number" === typeof d3) return a3 = a3.get(c3) || null, h2(b3, a3, "" + d3, e3);
    if ("object" === typeof d3 && null !== d3) {
      switch (d3.$$typeof) {
        case va:
          return a3 = a3.get(null === d3.key ? c3 : d3.key) || null, k2(b3, a3, d3, e3);
        case wa:
          return a3 = a3.get(null === d3.key ? c3 : d3.key) || null, l2(b3, a3, d3, e3);
        case Ha:
          var f3 = d3._init;
          return y2(a3, b3, c3, f3(d3._payload), e3);
      }
      if (eb(d3) || Ka(d3)) return a3 = a3.get(c3) || null, m2(b3, a3, d3, e3, null);
      Mg(b3, d3);
    }
    return null;
  }
  function n2(e3, g3, h3, k3) {
    for (var l3 = null, m3 = null, u2 = g3, w2 = g3 = 0, x2 = null; null !== u2 && w2 < h3.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e3, u2, h3[w2], k3);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a2 && u2 && null === n3.alternate && b2(e3, u2);
      g3 = f2(n3, g3, w2);
      null === m3 ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h3.length) return c2(e3, u2), I$1 && tg(e3, w2), l3;
    if (null === u2) {
      for (; w2 < h3.length; w2++) u2 = q2(e3, h3[w2], k3), null !== u2 && (g3 = f2(u2, g3, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I$1 && tg(e3, w2);
      return l3;
    }
    for (u2 = d2(e3, u2); w2 < h3.length; w2++) x2 = y2(u2, e3, w2, h3[w2], k3), null !== x2 && (a2 && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g3 = f2(x2, g3, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a2 && u2.forEach(function(a3) {
      return b2(e3, a3);
    });
    I$1 && tg(e3, w2);
    return l3;
  }
  function t2(e3, g3, h3, k3) {
    var l3 = Ka(h3);
    if ("function" !== typeof l3) throw Error(p$1(150));
    h3 = l3.call(h3);
    if (null == h3) throw Error(p$1(151));
    for (var u2 = l3 = null, m3 = g3, w2 = g3 = 0, x2 = null, n3 = h3.next(); null !== m3 && !n3.done; w2++, n3 = h3.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t3 = r2(e3, m3, n3.value, k3);
      if (null === t3) {
        null === m3 && (m3 = x2);
        break;
      }
      a2 && m3 && null === t3.alternate && b2(e3, m3);
      g3 = f2(t3, g3, w2);
      null === u2 ? l3 = t3 : u2.sibling = t3;
      u2 = t3;
      m3 = x2;
    }
    if (n3.done) return c2(
      e3,
      m3
    ), I$1 && tg(e3, w2), l3;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h3.next()) n3 = q2(e3, n3.value, k3), null !== n3 && (g3 = f2(n3, g3, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I$1 && tg(e3, w2);
      return l3;
    }
    for (m3 = d2(e3, m3); !n3.done; w2++, n3 = h3.next()) n3 = y2(m3, e3, w2, n3.value, k3), null !== n3 && (a2 && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g3 = f2(n3, g3, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a2 && m3.forEach(function(a3) {
      return b2(e3, a3);
    });
    I$1 && tg(e3, w2);
    return l3;
  }
  function J2(a3, d3, f3, h3) {
    "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
    if ("object" === typeof f3 && null !== f3) {
      switch (f3.$$typeof) {
        case va:
          a: {
            for (var k3 = f3.key, l3 = d3; null !== l3; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === ya) {
                  if (7 === l3.tag) {
                    c2(a3, l3.sibling);
                    d3 = e2(l3, f3.props.children);
                    d3.return = a3;
                    a3 = d3;
                    break a;
                  }
                } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && Ng(k3) === l3.type) {
                  c2(a3, l3.sibling);
                  d3 = e2(l3, f3.props);
                  d3.ref = Lg(a3, l3, f3);
                  d3.return = a3;
                  a3 = d3;
                  break a;
                }
                c2(a3, l3);
                break;
              } else b2(a3, l3);
              l3 = l3.sibling;
            }
            f3.type === ya ? (d3 = Tg(f3.props.children, a3.mode, h3, f3.key), d3.return = a3, a3 = d3) : (h3 = Rg(f3.type, f3.key, f3.props, null, a3.mode, h3), h3.ref = Lg(a3, d3, f3), h3.return = a3, a3 = h3);
          }
          return g2(a3);
        case wa:
          a: {
            for (l3 = f3.key; null !== d3; ) {
              if (d3.key === l3) if (4 === d3.tag && d3.stateNode.containerInfo === f3.containerInfo && d3.stateNode.implementation === f3.implementation) {
                c2(a3, d3.sibling);
                d3 = e2(d3, f3.children || []);
                d3.return = a3;
                a3 = d3;
                break a;
              } else {
                c2(a3, d3);
                break;
              }
              else b2(a3, d3);
              d3 = d3.sibling;
            }
            d3 = Sg(f3, a3.mode, h3);
            d3.return = a3;
            a3 = d3;
          }
          return g2(a3);
        case Ha:
          return l3 = f3._init, J2(a3, d3, l3(f3._payload), h3);
      }
      if (eb(f3)) return n2(a3, d3, f3, h3);
      if (Ka(f3)) return t2(a3, d3, f3, h3);
      Mg(a3, f3);
    }
    return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d3 && 6 === d3.tag ? (c2(a3, d3.sibling), d3 = e2(d3, f3), d3.return = a3, a3 = d3) : (c2(a3, d3), d3 = Qg(f3, a3.mode, h3), d3.return = a3, a3 = d3), g2(a3)) : c2(a3, d3);
  }
  return J2;
}
var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
function $g() {
  Zg = Yg = Xg = null;
}
function ah(a2) {
  var b2 = Wg.current;
  E(Wg);
  a2._currentValue = b2;
}
function bh(a2, b2, c2) {
  for (; null !== a2; ) {
    var d2 = a2.alternate;
    (a2.childLanes & b2) !== b2 ? (a2.childLanes |= b2, null !== d2 && (d2.childLanes |= b2)) : null !== d2 && (d2.childLanes & b2) !== b2 && (d2.childLanes |= b2);
    if (a2 === c2) break;
    a2 = a2.return;
  }
}
function ch(a2, b2) {
  Xg = a2;
  Zg = Yg = null;
  a2 = a2.dependencies;
  null !== a2 && null !== a2.firstContext && (0 !== (a2.lanes & b2) && (dh = true), a2.firstContext = null);
}
function eh(a2) {
  var b2 = a2._currentValue;
  if (Zg !== a2) if (a2 = { context: a2, memoizedValue: b2, next: null }, null === Yg) {
    if (null === Xg) throw Error(p$1(308));
    Yg = a2;
    Xg.dependencies = { lanes: 0, firstContext: a2 };
  } else Yg = Yg.next = a2;
  return b2;
}
var fh = null;
function gh(a2) {
  null === fh ? fh = [a2] : fh.push(a2);
}
function hh(a2, b2, c2, d2) {
  var e2 = b2.interleaved;
  null === e2 ? (c2.next = c2, gh(b2)) : (c2.next = e2.next, e2.next = c2);
  b2.interleaved = c2;
  return ih(a2, d2);
}
function ih(a2, b2) {
  a2.lanes |= b2;
  var c2 = a2.alternate;
  null !== c2 && (c2.lanes |= b2);
  c2 = a2;
  for (a2 = a2.return; null !== a2; ) a2.childLanes |= b2, c2 = a2.alternate, null !== c2 && (c2.childLanes |= b2), c2 = a2, a2 = a2.return;
  return 3 === c2.tag ? c2.stateNode : null;
}
var jh = false;
function kh(a2) {
  a2.updateQueue = { baseState: a2.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function lh(a2, b2) {
  a2 = a2.updateQueue;
  b2.updateQueue === a2 && (b2.updateQueue = { baseState: a2.baseState, firstBaseUpdate: a2.firstBaseUpdate, lastBaseUpdate: a2.lastBaseUpdate, shared: a2.shared, effects: a2.effects });
}
function mh(a2, b2) {
  return { eventTime: a2, lane: b2, tag: 0, payload: null, callback: null, next: null };
}
function nh(a2, b2, c2) {
  var d2 = a2.updateQueue;
  if (null === d2) return null;
  d2 = d2.shared;
  if (0 !== (K & 2)) {
    var e2 = d2.pending;
    null === e2 ? b2.next = b2 : (b2.next = e2.next, e2.next = b2);
    d2.pending = b2;
    return ih(a2, c2);
  }
  e2 = d2.interleaved;
  null === e2 ? (b2.next = b2, gh(d2)) : (b2.next = e2.next, e2.next = b2);
  d2.interleaved = b2;
  return ih(a2, c2);
}
function oh(a2, b2, c2) {
  b2 = b2.updateQueue;
  if (null !== b2 && (b2 = b2.shared, 0 !== (c2 & 4194240))) {
    var d2 = b2.lanes;
    d2 &= a2.pendingLanes;
    c2 |= d2;
    b2.lanes = c2;
    Cc(a2, c2);
  }
}
function ph(a2, b2) {
  var c2 = a2.updateQueue, d2 = a2.alternate;
  if (null !== d2 && (d2 = d2.updateQueue, c2 === d2)) {
    var e2 = null, f2 = null;
    c2 = c2.firstBaseUpdate;
    if (null !== c2) {
      do {
        var g2 = { eventTime: c2.eventTime, lane: c2.lane, tag: c2.tag, payload: c2.payload, callback: c2.callback, next: null };
        null === f2 ? e2 = f2 = g2 : f2 = f2.next = g2;
        c2 = c2.next;
      } while (null !== c2);
      null === f2 ? e2 = f2 = b2 : f2 = f2.next = b2;
    } else e2 = f2 = b2;
    c2 = { baseState: d2.baseState, firstBaseUpdate: e2, lastBaseUpdate: f2, shared: d2.shared, effects: d2.effects };
    a2.updateQueue = c2;
    return;
  }
  a2 = c2.lastBaseUpdate;
  null === a2 ? c2.firstBaseUpdate = b2 : a2.next = b2;
  c2.lastBaseUpdate = b2;
}
function qh(a2, b2, c2, d2) {
  var e2 = a2.updateQueue;
  jh = false;
  var f2 = e2.firstBaseUpdate, g2 = e2.lastBaseUpdate, h2 = e2.shared.pending;
  if (null !== h2) {
    e2.shared.pending = null;
    var k2 = h2, l2 = k2.next;
    k2.next = null;
    null === g2 ? f2 = l2 : g2.next = l2;
    g2 = k2;
    var m2 = a2.alternate;
    null !== m2 && (m2 = m2.updateQueue, h2 = m2.lastBaseUpdate, h2 !== g2 && (null === h2 ? m2.firstBaseUpdate = l2 : h2.next = l2, m2.lastBaseUpdate = k2));
  }
  if (null !== f2) {
    var q2 = e2.baseState;
    g2 = 0;
    m2 = l2 = k2 = null;
    h2 = f2;
    do {
      var r2 = h2.lane, y2 = h2.eventTime;
      if ((d2 & r2) === r2) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h2.tag,
          payload: h2.payload,
          callback: h2.callback,
          next: null
        });
        a: {
          var n2 = a2, t2 = h2;
          r2 = b2;
          y2 = c2;
          switch (t2.tag) {
            case 1:
              n2 = t2.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t2.payload;
              r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
              if (null === r2 || void 0 === r2) break a;
              q2 = A$1({}, q2, r2);
              break a;
            case 2:
              jh = true;
          }
        }
        null !== h2.callback && 0 !== h2.lane && (a2.flags |= 64, r2 = e2.effects, null === r2 ? e2.effects = [h2] : r2.push(h2));
      } else y2 = { eventTime: y2, lane: r2, tag: h2.tag, payload: h2.payload, callback: h2.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g2 |= r2;
      h2 = h2.next;
      if (null === h2) if (h2 = e2.shared.pending, null === h2) break;
      else r2 = h2, h2 = r2.next, r2.next = null, e2.lastBaseUpdate = r2, e2.shared.pending = null;
    } while (1);
    null === m2 && (k2 = q2);
    e2.baseState = k2;
    e2.firstBaseUpdate = l2;
    e2.lastBaseUpdate = m2;
    b2 = e2.shared.interleaved;
    if (null !== b2) {
      e2 = b2;
      do
        g2 |= e2.lane, e2 = e2.next;
      while (e2 !== b2);
    } else null === f2 && (e2.shared.lanes = 0);
    rh |= g2;
    a2.lanes = g2;
    a2.memoizedState = q2;
  }
}
function sh(a2, b2, c2) {
  a2 = b2.effects;
  b2.effects = null;
  if (null !== a2) for (b2 = 0; b2 < a2.length; b2++) {
    var d2 = a2[b2], e2 = d2.callback;
    if (null !== e2) {
      d2.callback = null;
      d2 = c2;
      if ("function" !== typeof e2) throw Error(p$1(191, e2));
      e2.call(d2);
    }
  }
}
var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
function xh(a2) {
  if (a2 === th) throw Error(p$1(174));
  return a2;
}
function yh(a2, b2) {
  G$1(wh, b2);
  G$1(vh, a2);
  G$1(uh, th);
  a2 = b2.nodeType;
  switch (a2) {
    case 9:
    case 11:
      b2 = (b2 = b2.documentElement) ? b2.namespaceURI : lb(null, "");
      break;
    default:
      a2 = 8 === a2 ? b2.parentNode : b2, b2 = a2.namespaceURI || null, a2 = a2.tagName, b2 = lb(b2, a2);
  }
  E(uh);
  G$1(uh, b2);
}
function zh() {
  E(uh);
  E(vh);
  E(wh);
}
function Ah(a2) {
  xh(wh.current);
  var b2 = xh(uh.current);
  var c2 = lb(b2, a2.type);
  b2 !== c2 && (G$1(vh, a2), G$1(uh, c2));
}
function Bh(a2) {
  vh.current === a2 && (E(uh), E(vh));
}
var L = Uf(0);
function Ch(a2) {
  for (var b2 = a2; null !== b2; ) {
    if (13 === b2.tag) {
      var c2 = b2.memoizedState;
      if (null !== c2 && (c2 = c2.dehydrated, null === c2 || "$?" === c2.data || "$!" === c2.data)) return b2;
    } else if (19 === b2.tag && void 0 !== b2.memoizedProps.revealOrder) {
      if (0 !== (b2.flags & 128)) return b2;
    } else if (null !== b2.child) {
      b2.child.return = b2;
      b2 = b2.child;
      continue;
    }
    if (b2 === a2) break;
    for (; null === b2.sibling; ) {
      if (null === b2.return || b2.return === a2) return null;
      b2 = b2.return;
    }
    b2.sibling.return = b2.return;
    b2 = b2.sibling;
  }
  return null;
}
var Dh = [];
function Eh() {
  for (var a2 = 0; a2 < Dh.length; a2++) Dh[a2]._workInProgressVersionPrimary = null;
  Dh.length = 0;
}
var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M$1 = null, N = null, O$1 = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
function P$1() {
  throw Error(p$1(321));
}
function Mh(a2, b2) {
  if (null === b2) return false;
  for (var c2 = 0; c2 < b2.length && c2 < a2.length; c2++) if (!He(a2[c2], b2[c2])) return false;
  return true;
}
function Nh(a2, b2, c2, d2, e2, f2) {
  Hh = f2;
  M$1 = b2;
  b2.memoizedState = null;
  b2.updateQueue = null;
  b2.lanes = 0;
  Fh.current = null === a2 || null === a2.memoizedState ? Oh : Ph;
  a2 = c2(d2, e2);
  if (Jh) {
    f2 = 0;
    do {
      Jh = false;
      Kh = 0;
      if (25 <= f2) throw Error(p$1(301));
      f2 += 1;
      O$1 = N = null;
      b2.updateQueue = null;
      Fh.current = Qh;
      a2 = c2(d2, e2);
    } while (Jh);
  }
  Fh.current = Rh;
  b2 = null !== N && null !== N.next;
  Hh = 0;
  O$1 = N = M$1 = null;
  Ih = false;
  if (b2) throw Error(p$1(300));
  return a2;
}
function Sh() {
  var a2 = 0 !== Kh;
  Kh = 0;
  return a2;
}
function Th() {
  var a2 = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === O$1 ? M$1.memoizedState = O$1 = a2 : O$1 = O$1.next = a2;
  return O$1;
}
function Uh() {
  if (null === N) {
    var a2 = M$1.alternate;
    a2 = null !== a2 ? a2.memoizedState : null;
  } else a2 = N.next;
  var b2 = null === O$1 ? M$1.memoizedState : O$1.next;
  if (null !== b2) O$1 = b2, N = a2;
  else {
    if (null === a2) throw Error(p$1(310));
    N = a2;
    a2 = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
    null === O$1 ? M$1.memoizedState = O$1 = a2 : O$1 = O$1.next = a2;
  }
  return O$1;
}
function Vh(a2, b2) {
  return "function" === typeof b2 ? b2(a2) : b2;
}
function Wh(a2) {
  var b2 = Uh(), c2 = b2.queue;
  if (null === c2) throw Error(p$1(311));
  c2.lastRenderedReducer = a2;
  var d2 = N, e2 = d2.baseQueue, f2 = c2.pending;
  if (null !== f2) {
    if (null !== e2) {
      var g2 = e2.next;
      e2.next = f2.next;
      f2.next = g2;
    }
    d2.baseQueue = e2 = f2;
    c2.pending = null;
  }
  if (null !== e2) {
    f2 = e2.next;
    d2 = d2.baseState;
    var h2 = g2 = null, k2 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Hh & m2) === m2) null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d2 = l2.hasEagerState ? l2.eagerState : a2(d2, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        null === k2 ? (h2 = k2 = q2, g2 = d2) : k2 = k2.next = q2;
        M$1.lanes |= m2;
        rh |= m2;
      }
      l2 = l2.next;
    } while (null !== l2 && l2 !== f2);
    null === k2 ? g2 = d2 : k2.next = h2;
    He(d2, b2.memoizedState) || (dh = true);
    b2.memoizedState = d2;
    b2.baseState = g2;
    b2.baseQueue = k2;
    c2.lastRenderedState = d2;
  }
  a2 = c2.interleaved;
  if (null !== a2) {
    e2 = a2;
    do
      f2 = e2.lane, M$1.lanes |= f2, rh |= f2, e2 = e2.next;
    while (e2 !== a2);
  } else null === e2 && (c2.lanes = 0);
  return [b2.memoizedState, c2.dispatch];
}
function Xh(a2) {
  var b2 = Uh(), c2 = b2.queue;
  if (null === c2) throw Error(p$1(311));
  c2.lastRenderedReducer = a2;
  var d2 = c2.dispatch, e2 = c2.pending, f2 = b2.memoizedState;
  if (null !== e2) {
    c2.pending = null;
    var g2 = e2 = e2.next;
    do
      f2 = a2(f2, g2.action), g2 = g2.next;
    while (g2 !== e2);
    He(f2, b2.memoizedState) || (dh = true);
    b2.memoizedState = f2;
    null === b2.baseQueue && (b2.baseState = f2);
    c2.lastRenderedState = f2;
  }
  return [f2, d2];
}
function Yh() {
}
function Zh(a2, b2) {
  var c2 = M$1, d2 = Uh(), e2 = b2(), f2 = !He(d2.memoizedState, e2);
  f2 && (d2.memoizedState = e2, dh = true);
  d2 = d2.queue;
  $h(ai.bind(null, c2, d2, a2), [a2]);
  if (d2.getSnapshot !== b2 || f2 || null !== O$1 && O$1.memoizedState.tag & 1) {
    c2.flags |= 2048;
    bi(9, ci.bind(null, c2, d2, e2, b2), void 0, null);
    if (null === Q$1) throw Error(p$1(349));
    0 !== (Hh & 30) || di(c2, b2, e2);
  }
  return e2;
}
function di(a2, b2, c2) {
  a2.flags |= 16384;
  a2 = { getSnapshot: b2, value: c2 };
  b2 = M$1.updateQueue;
  null === b2 ? (b2 = { lastEffect: null, stores: null }, M$1.updateQueue = b2, b2.stores = [a2]) : (c2 = b2.stores, null === c2 ? b2.stores = [a2] : c2.push(a2));
}
function ci(a2, b2, c2, d2) {
  b2.value = c2;
  b2.getSnapshot = d2;
  ei(b2) && fi(a2);
}
function ai(a2, b2, c2) {
  return c2(function() {
    ei(b2) && fi(a2);
  });
}
function ei(a2) {
  var b2 = a2.getSnapshot;
  a2 = a2.value;
  try {
    var c2 = b2();
    return !He(a2, c2);
  } catch (d2) {
    return true;
  }
}
function fi(a2) {
  var b2 = ih(a2, 1);
  null !== b2 && gi(b2, a2, 1, -1);
}
function hi(a2) {
  var b2 = Th();
  "function" === typeof a2 && (a2 = a2());
  b2.memoizedState = b2.baseState = a2;
  a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a2 };
  b2.queue = a2;
  a2 = a2.dispatch = ii.bind(null, M$1, a2);
  return [b2.memoizedState, a2];
}
function bi(a2, b2, c2, d2) {
  a2 = { tag: a2, create: b2, destroy: c2, deps: d2, next: null };
  b2 = M$1.updateQueue;
  null === b2 ? (b2 = { lastEffect: null, stores: null }, M$1.updateQueue = b2, b2.lastEffect = a2.next = a2) : (c2 = b2.lastEffect, null === c2 ? b2.lastEffect = a2.next = a2 : (d2 = c2.next, c2.next = a2, a2.next = d2, b2.lastEffect = a2));
  return a2;
}
function ji() {
  return Uh().memoizedState;
}
function ki(a2, b2, c2, d2) {
  var e2 = Th();
  M$1.flags |= a2;
  e2.memoizedState = bi(1 | b2, c2, void 0, void 0 === d2 ? null : d2);
}
function li(a2, b2, c2, d2) {
  var e2 = Uh();
  d2 = void 0 === d2 ? null : d2;
  var f2 = void 0;
  if (null !== N) {
    var g2 = N.memoizedState;
    f2 = g2.destroy;
    if (null !== d2 && Mh(d2, g2.deps)) {
      e2.memoizedState = bi(b2, c2, f2, d2);
      return;
    }
  }
  M$1.flags |= a2;
  e2.memoizedState = bi(1 | b2, c2, f2, d2);
}
function mi(a2, b2) {
  return ki(8390656, 8, a2, b2);
}
function $h(a2, b2) {
  return li(2048, 8, a2, b2);
}
function ni(a2, b2) {
  return li(4, 2, a2, b2);
}
function oi(a2, b2) {
  return li(4, 4, a2, b2);
}
function pi(a2, b2) {
  if ("function" === typeof b2) return a2 = a2(), b2(a2), function() {
    b2(null);
  };
  if (null !== b2 && void 0 !== b2) return a2 = a2(), b2.current = a2, function() {
    b2.current = null;
  };
}
function qi(a2, b2, c2) {
  c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
  return li(4, 4, pi.bind(null, b2, a2), c2);
}
function ri() {
}
function si(a2, b2) {
  var c2 = Uh();
  b2 = void 0 === b2 ? null : b2;
  var d2 = c2.memoizedState;
  if (null !== d2 && null !== b2 && Mh(b2, d2[1])) return d2[0];
  c2.memoizedState = [a2, b2];
  return a2;
}
function ti(a2, b2) {
  var c2 = Uh();
  b2 = void 0 === b2 ? null : b2;
  var d2 = c2.memoizedState;
  if (null !== d2 && null !== b2 && Mh(b2, d2[1])) return d2[0];
  a2 = a2();
  c2.memoizedState = [a2, b2];
  return a2;
}
function ui(a2, b2, c2) {
  if (0 === (Hh & 21)) return a2.baseState && (a2.baseState = false, dh = true), a2.memoizedState = c2;
  He(c2, b2) || (c2 = yc(), M$1.lanes |= c2, rh |= c2, a2.baseState = true);
  return b2;
}
function vi(a2, b2) {
  var c2 = C;
  C = 0 !== c2 && 4 > c2 ? c2 : 4;
  a2(true);
  var d2 = Gh.transition;
  Gh.transition = {};
  try {
    a2(false), b2();
  } finally {
    C = c2, Gh.transition = d2;
  }
}
function wi() {
  return Uh().memoizedState;
}
function xi(a2, b2, c2) {
  var d2 = yi(a2);
  c2 = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
  if (zi(a2)) Ai(b2, c2);
  else if (c2 = hh(a2, b2, c2, d2), null !== c2) {
    var e2 = R();
    gi(c2, a2, d2, e2);
    Bi(c2, b2, d2);
  }
}
function ii(a2, b2, c2) {
  var d2 = yi(a2), e2 = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
  if (zi(a2)) Ai(b2, e2);
  else {
    var f2 = a2.alternate;
    if (0 === a2.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b2.lastRenderedReducer, null !== f2)) try {
      var g2 = b2.lastRenderedState, h2 = f2(g2, c2);
      e2.hasEagerState = true;
      e2.eagerState = h2;
      if (He(h2, g2)) {
        var k2 = b2.interleaved;
        null === k2 ? (e2.next = e2, gh(b2)) : (e2.next = k2.next, k2.next = e2);
        b2.interleaved = e2;
        return;
      }
    } catch (l2) {
    } finally {
    }
    c2 = hh(a2, b2, e2, d2);
    null !== c2 && (e2 = R(), gi(c2, a2, d2, e2), Bi(c2, b2, d2));
  }
}
function zi(a2) {
  var b2 = a2.alternate;
  return a2 === M$1 || null !== b2 && b2 === M$1;
}
function Ai(a2, b2) {
  Jh = Ih = true;
  var c2 = a2.pending;
  null === c2 ? b2.next = b2 : (b2.next = c2.next, c2.next = b2);
  a2.pending = b2;
}
function Bi(a2, b2, c2) {
  if (0 !== (c2 & 4194240)) {
    var d2 = b2.lanes;
    d2 &= a2.pendingLanes;
    c2 |= d2;
    b2.lanes = c2;
    Cc(a2, c2);
  }
}
var Rh = { readContext: eh, useCallback: P$1, useContext: P$1, useEffect: P$1, useImperativeHandle: P$1, useInsertionEffect: P$1, useLayoutEffect: P$1, useMemo: P$1, useReducer: P$1, useRef: P$1, useState: P$1, useDebugValue: P$1, useDeferredValue: P$1, useTransition: P$1, useMutableSource: P$1, useSyncExternalStore: P$1, useId: P$1, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a2, b2) {
  Th().memoizedState = [a2, void 0 === b2 ? null : b2];
  return a2;
}, useContext: eh, useEffect: mi, useImperativeHandle: function(a2, b2, c2) {
  c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
  return ki(
    4194308,
    4,
    pi.bind(null, b2, a2),
    c2
  );
}, useLayoutEffect: function(a2, b2) {
  return ki(4194308, 4, a2, b2);
}, useInsertionEffect: function(a2, b2) {
  return ki(4, 2, a2, b2);
}, useMemo: function(a2, b2) {
  var c2 = Th();
  b2 = void 0 === b2 ? null : b2;
  a2 = a2();
  c2.memoizedState = [a2, b2];
  return a2;
}, useReducer: function(a2, b2, c2) {
  var d2 = Th();
  b2 = void 0 !== c2 ? c2(b2) : b2;
  d2.memoizedState = d2.baseState = b2;
  a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a2, lastRenderedState: b2 };
  d2.queue = a2;
  a2 = a2.dispatch = xi.bind(null, M$1, a2);
  return [d2.memoizedState, a2];
}, useRef: function(a2) {
  var b2 = Th();
  a2 = { current: a2 };
  return b2.memoizedState = a2;
}, useState: hi, useDebugValue: ri, useDeferredValue: function(a2) {
  return Th().memoizedState = a2;
}, useTransition: function() {
  var a2 = hi(false), b2 = a2[0];
  a2 = vi.bind(null, a2[1]);
  Th().memoizedState = a2;
  return [b2, a2];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a2, b2, c2) {
  var d2 = M$1, e2 = Th();
  if (I$1) {
    if (void 0 === c2) throw Error(p$1(407));
    c2 = c2();
  } else {
    c2 = b2();
    if (null === Q$1) throw Error(p$1(349));
    0 !== (Hh & 30) || di(d2, b2, c2);
  }
  e2.memoizedState = c2;
  var f2 = { value: c2, getSnapshot: b2 };
  e2.queue = f2;
  mi(ai.bind(
    null,
    d2,
    f2,
    a2
  ), [a2]);
  d2.flags |= 2048;
  bi(9, ci.bind(null, d2, f2, c2, b2), void 0, null);
  return c2;
}, useId: function() {
  var a2 = Th(), b2 = Q$1.identifierPrefix;
  if (I$1) {
    var c2 = sg;
    var d2 = rg;
    c2 = (d2 & ~(1 << 32 - oc(d2) - 1)).toString(32) + c2;
    b2 = ":" + b2 + "R" + c2;
    c2 = Kh++;
    0 < c2 && (b2 += "H" + c2.toString(32));
    b2 += ":";
  } else c2 = Lh++, b2 = ":" + b2 + "r" + c2.toString(32) + ":";
  return a2.memoizedState = b2;
}, unstable_isNewReconciler: false }, Ph = {
  readContext: eh,
  useCallback: si,
  useContext: eh,
  useEffect: $h,
  useImperativeHandle: qi,
  useInsertionEffect: ni,
  useLayoutEffect: oi,
  useMemo: ti,
  useReducer: Wh,
  useRef: ji,
  useState: function() {
    return Wh(Vh);
  },
  useDebugValue: ri,
  useDeferredValue: function(a2) {
    var b2 = Uh();
    return ui(b2, N.memoizedState, a2);
  },
  useTransition: function() {
    var a2 = Wh(Vh)[0], b2 = Uh().memoizedState;
    return [a2, b2];
  },
  useMutableSource: Yh,
  useSyncExternalStore: Zh,
  useId: wi,
  unstable_isNewReconciler: false
}, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
  return Xh(Vh);
}, useDebugValue: ri, useDeferredValue: function(a2) {
  var b2 = Uh();
  return null === N ? b2.memoizedState = a2 : ui(b2, N.memoizedState, a2);
}, useTransition: function() {
  var a2 = Xh(Vh)[0], b2 = Uh().memoizedState;
  return [a2, b2];
}, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
function Ci(a2, b2) {
  if (a2 && a2.defaultProps) {
    b2 = A$1({}, b2);
    a2 = a2.defaultProps;
    for (var c2 in a2) void 0 === b2[c2] && (b2[c2] = a2[c2]);
    return b2;
  }
  return b2;
}
function Di(a2, b2, c2, d2) {
  b2 = a2.memoizedState;
  c2 = c2(d2, b2);
  c2 = null === c2 || void 0 === c2 ? b2 : A$1({}, b2, c2);
  a2.memoizedState = c2;
  0 === a2.lanes && (a2.updateQueue.baseState = c2);
}
var Ei = { isMounted: function(a2) {
  return (a2 = a2._reactInternals) ? Vb(a2) === a2 : false;
}, enqueueSetState: function(a2, b2, c2) {
  a2 = a2._reactInternals;
  var d2 = R(), e2 = yi(a2), f2 = mh(d2, e2);
  f2.payload = b2;
  void 0 !== c2 && null !== c2 && (f2.callback = c2);
  b2 = nh(a2, f2, e2);
  null !== b2 && (gi(b2, a2, e2, d2), oh(b2, a2, e2));
}, enqueueReplaceState: function(a2, b2, c2) {
  a2 = a2._reactInternals;
  var d2 = R(), e2 = yi(a2), f2 = mh(d2, e2);
  f2.tag = 1;
  f2.payload = b2;
  void 0 !== c2 && null !== c2 && (f2.callback = c2);
  b2 = nh(a2, f2, e2);
  null !== b2 && (gi(b2, a2, e2, d2), oh(b2, a2, e2));
}, enqueueForceUpdate: function(a2, b2) {
  a2 = a2._reactInternals;
  var c2 = R(), d2 = yi(a2), e2 = mh(c2, d2);
  e2.tag = 2;
  void 0 !== b2 && null !== b2 && (e2.callback = b2);
  b2 = nh(a2, e2, d2);
  null !== b2 && (gi(b2, a2, d2, c2), oh(b2, a2, d2));
} };
function Fi(a2, b2, c2, d2, e2, f2, g2) {
  a2 = a2.stateNode;
  return "function" === typeof a2.shouldComponentUpdate ? a2.shouldComponentUpdate(d2, f2, g2) : b2.prototype && b2.prototype.isPureReactComponent ? !Ie$1(c2, d2) || !Ie$1(e2, f2) : true;
}
function Gi(a2, b2, c2) {
  var d2 = false, e2 = Vf;
  var f2 = b2.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e2 = Zf(b2) ? Xf : H.current, d2 = b2.contextTypes, f2 = (d2 = null !== d2 && void 0 !== d2) ? Yf(a2, e2) : Vf);
  b2 = new b2(c2, f2);
  a2.memoizedState = null !== b2.state && void 0 !== b2.state ? b2.state : null;
  b2.updater = Ei;
  a2.stateNode = b2;
  b2._reactInternals = a2;
  d2 && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = e2, a2.__reactInternalMemoizedMaskedChildContext = f2);
  return b2;
}
function Hi(a2, b2, c2, d2) {
  a2 = b2.state;
  "function" === typeof b2.componentWillReceiveProps && b2.componentWillReceiveProps(c2, d2);
  "function" === typeof b2.UNSAFE_componentWillReceiveProps && b2.UNSAFE_componentWillReceiveProps(c2, d2);
  b2.state !== a2 && Ei.enqueueReplaceState(b2, b2.state, null);
}
function Ii(a2, b2, c2, d2) {
  var e2 = a2.stateNode;
  e2.props = c2;
  e2.state = a2.memoizedState;
  e2.refs = {};
  kh(a2);
  var f2 = b2.contextType;
  "object" === typeof f2 && null !== f2 ? e2.context = eh(f2) : (f2 = Zf(b2) ? Xf : H.current, e2.context = Yf(a2, f2));
  e2.state = a2.memoizedState;
  f2 = b2.getDerivedStateFromProps;
  "function" === typeof f2 && (Di(a2, b2, f2, c2), e2.state = a2.memoizedState);
  "function" === typeof b2.getDerivedStateFromProps || "function" === typeof e2.getSnapshotBeforeUpdate || "function" !== typeof e2.UNSAFE_componentWillMount && "function" !== typeof e2.componentWillMount || (b2 = e2.state, "function" === typeof e2.componentWillMount && e2.componentWillMount(), "function" === typeof e2.UNSAFE_componentWillMount && e2.UNSAFE_componentWillMount(), b2 !== e2.state && Ei.enqueueReplaceState(e2, e2.state, null), qh(a2, c2, e2, d2), e2.state = a2.memoizedState);
  "function" === typeof e2.componentDidMount && (a2.flags |= 4194308);
}
function Ji(a2, b2) {
  try {
    var c2 = "", d2 = b2;
    do
      c2 += Pa(d2), d2 = d2.return;
    while (d2);
    var e2 = c2;
  } catch (f2) {
    e2 = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a2, source: b2, stack: e2, digest: null };
}
function Ki(a2, b2, c2) {
  return { value: a2, source: null, stack: null != c2 ? c2 : null, digest: null != b2 ? b2 : null };
}
function Li(a2, b2) {
  try {
    console.error(b2.value);
  } catch (c2) {
    setTimeout(function() {
      throw c2;
    });
  }
}
var Mi = "function" === typeof WeakMap ? WeakMap : Map;
function Ni(a2, b2, c2) {
  c2 = mh(-1, c2);
  c2.tag = 3;
  c2.payload = { element: null };
  var d2 = b2.value;
  c2.callback = function() {
    Oi || (Oi = true, Pi = d2);
    Li(a2, b2);
  };
  return c2;
}
function Qi(a2, b2, c2) {
  c2 = mh(-1, c2);
  c2.tag = 3;
  var d2 = a2.type.getDerivedStateFromError;
  if ("function" === typeof d2) {
    var e2 = b2.value;
    c2.payload = function() {
      return d2(e2);
    };
    c2.callback = function() {
      Li(a2, b2);
    };
  }
  var f2 = a2.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c2.callback = function() {
    Li(a2, b2);
    "function" !== typeof d2 && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
    var c3 = b2.stack;
    this.componentDidCatch(b2.value, { componentStack: null !== c3 ? c3 : "" });
  });
  return c2;
}
function Si(a2, b2, c2) {
  var d2 = a2.pingCache;
  if (null === d2) {
    d2 = a2.pingCache = new Mi();
    var e2 = /* @__PURE__ */ new Set();
    d2.set(b2, e2);
  } else e2 = d2.get(b2), void 0 === e2 && (e2 = /* @__PURE__ */ new Set(), d2.set(b2, e2));
  e2.has(c2) || (e2.add(c2), a2 = Ti.bind(null, a2, b2, c2), b2.then(a2, a2));
}
function Ui(a2) {
  do {
    var b2;
    if (b2 = 13 === a2.tag) b2 = a2.memoizedState, b2 = null !== b2 ? null !== b2.dehydrated ? true : false : true;
    if (b2) return a2;
    a2 = a2.return;
  } while (null !== a2);
  return null;
}
function Vi(a2, b2, c2, d2, e2) {
  if (0 === (a2.mode & 1)) return a2 === b2 ? a2.flags |= 65536 : (a2.flags |= 128, c2.flags |= 131072, c2.flags &= -52805, 1 === c2.tag && (null === c2.alternate ? c2.tag = 17 : (b2 = mh(-1, 1), b2.tag = 2, nh(c2, b2, 1))), c2.lanes |= 1), a2;
  a2.flags |= 65536;
  a2.lanes = e2;
  return a2;
}
var Wi = ua.ReactCurrentOwner, dh = false;
function Xi(a2, b2, c2, d2) {
  b2.child = null === a2 ? Vg(b2, null, c2, d2) : Ug(b2, a2.child, c2, d2);
}
function Yi(a2, b2, c2, d2, e2) {
  c2 = c2.render;
  var f2 = b2.ref;
  ch(b2, e2);
  d2 = Nh(a2, b2, c2, d2, f2, e2);
  c2 = Sh();
  if (null !== a2 && !dh) return b2.updateQueue = a2.updateQueue, b2.flags &= -2053, a2.lanes &= ~e2, Zi(a2, b2, e2);
  I$1 && c2 && vg(b2);
  b2.flags |= 1;
  Xi(a2, b2, d2, e2);
  return b2.child;
}
function $i(a2, b2, c2, d2, e2) {
  if (null === a2) {
    var f2 = c2.type;
    if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c2.compare && void 0 === c2.defaultProps) return b2.tag = 15, b2.type = f2, bj(a2, b2, f2, d2, e2);
    a2 = Rg(c2.type, null, d2, b2, b2.mode, e2);
    a2.ref = b2.ref;
    a2.return = b2;
    return b2.child = a2;
  }
  f2 = a2.child;
  if (0 === (a2.lanes & e2)) {
    var g2 = f2.memoizedProps;
    c2 = c2.compare;
    c2 = null !== c2 ? c2 : Ie$1;
    if (c2(g2, d2) && a2.ref === b2.ref) return Zi(a2, b2, e2);
  }
  b2.flags |= 1;
  a2 = Pg(f2, d2);
  a2.ref = b2.ref;
  a2.return = b2;
  return b2.child = a2;
}
function bj(a2, b2, c2, d2, e2) {
  if (null !== a2) {
    var f2 = a2.memoizedProps;
    if (Ie$1(f2, d2) && a2.ref === b2.ref) if (dh = false, b2.pendingProps = d2 = f2, 0 !== (a2.lanes & e2)) 0 !== (a2.flags & 131072) && (dh = true);
    else return b2.lanes = a2.lanes, Zi(a2, b2, e2);
  }
  return cj(a2, b2, c2, d2, e2);
}
function dj(a2, b2, c2) {
  var d2 = b2.pendingProps, e2 = d2.children, f2 = null !== a2 ? a2.memoizedState : null;
  if ("hidden" === d2.mode) if (0 === (b2.mode & 1)) b2.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G$1(ej, fj), fj |= c2;
  else {
    if (0 === (c2 & 1073741824)) return a2 = null !== f2 ? f2.baseLanes | c2 : c2, b2.lanes = b2.childLanes = 1073741824, b2.memoizedState = { baseLanes: a2, cachePool: null, transitions: null }, b2.updateQueue = null, G$1(ej, fj), fj |= a2, null;
    b2.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
    d2 = null !== f2 ? f2.baseLanes : c2;
    G$1(ej, fj);
    fj |= d2;
  }
  else null !== f2 ? (d2 = f2.baseLanes | c2, b2.memoizedState = null) : d2 = c2, G$1(ej, fj), fj |= d2;
  Xi(a2, b2, e2, c2);
  return b2.child;
}
function gj(a2, b2) {
  var c2 = b2.ref;
  if (null === a2 && null !== c2 || null !== a2 && a2.ref !== c2) b2.flags |= 512, b2.flags |= 2097152;
}
function cj(a2, b2, c2, d2, e2) {
  var f2 = Zf(c2) ? Xf : H.current;
  f2 = Yf(b2, f2);
  ch(b2, e2);
  c2 = Nh(a2, b2, c2, d2, f2, e2);
  d2 = Sh();
  if (null !== a2 && !dh) return b2.updateQueue = a2.updateQueue, b2.flags &= -2053, a2.lanes &= ~e2, Zi(a2, b2, e2);
  I$1 && d2 && vg(b2);
  b2.flags |= 1;
  Xi(a2, b2, c2, e2);
  return b2.child;
}
function hj(a2, b2, c2, d2, e2) {
  if (Zf(c2)) {
    var f2 = true;
    cg(b2);
  } else f2 = false;
  ch(b2, e2);
  if (null === b2.stateNode) ij(a2, b2), Gi(b2, c2, d2), Ii(b2, c2, d2, e2), d2 = true;
  else if (null === a2) {
    var g2 = b2.stateNode, h2 = b2.memoizedProps;
    g2.props = h2;
    var k2 = g2.context, l2 = c2.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c2) ? Xf : H.current, l2 = Yf(b2, l2));
    var m2 = c2.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g2.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h2 !== d2 || k2 !== l2) && Hi(b2, g2, d2, l2);
    jh = false;
    var r2 = b2.memoizedState;
    g2.state = r2;
    qh(b2, d2, g2, e2);
    k2 = b2.memoizedState;
    h2 !== d2 || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di(b2, c2, m2, d2), k2 = b2.memoizedState), (h2 = jh || Fi(b2, c2, h2, d2, r2, k2, l2)) ? (q2 || "function" !== typeof g2.UNSAFE_componentWillMount && "function" !== typeof g2.componentWillMount || ("function" === typeof g2.componentWillMount && g2.componentWillMount(), "function" === typeof g2.UNSAFE_componentWillMount && g2.UNSAFE_componentWillMount()), "function" === typeof g2.componentDidMount && (b2.flags |= 4194308)) : ("function" === typeof g2.componentDidMount && (b2.flags |= 4194308), b2.memoizedProps = d2, b2.memoizedState = k2), g2.props = d2, g2.state = k2, g2.context = l2, d2 = h2) : ("function" === typeof g2.componentDidMount && (b2.flags |= 4194308), d2 = false);
  } else {
    g2 = b2.stateNode;
    lh(a2, b2);
    h2 = b2.memoizedProps;
    l2 = b2.type === b2.elementType ? h2 : Ci(b2.type, h2);
    g2.props = l2;
    q2 = b2.pendingProps;
    r2 = g2.context;
    k2 = c2.contextType;
    "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c2) ? Xf : H.current, k2 = Yf(b2, k2));
    var y2 = c2.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g2.getSnapshotBeforeUpdate) || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h2 !== q2 || r2 !== k2) && Hi(b2, g2, d2, k2);
    jh = false;
    r2 = b2.memoizedState;
    g2.state = r2;
    qh(b2, d2, g2, e2);
    var n2 = b2.memoizedState;
    h2 !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b2, c2, y2, d2), n2 = b2.memoizedState), (l2 = jh || Fi(b2, c2, l2, d2, r2, n2, k2) || false) ? (m2 || "function" !== typeof g2.UNSAFE_componentWillUpdate && "function" !== typeof g2.componentWillUpdate || ("function" === typeof g2.componentWillUpdate && g2.componentWillUpdate(d2, n2, k2), "function" === typeof g2.UNSAFE_componentWillUpdate && g2.UNSAFE_componentWillUpdate(d2, n2, k2)), "function" === typeof g2.componentDidUpdate && (b2.flags |= 4), "function" === typeof g2.getSnapshotBeforeUpdate && (b2.flags |= 1024)) : ("function" !== typeof g2.componentDidUpdate || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b2.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b2.flags |= 1024), b2.memoizedProps = d2, b2.memoizedState = n2), g2.props = d2, g2.state = n2, g2.context = k2, d2 = l2) : ("function" !== typeof g2.componentDidUpdate || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b2.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b2.flags |= 1024), d2 = false);
  }
  return jj(a2, b2, c2, d2, f2, e2);
}
function jj(a2, b2, c2, d2, e2, f2) {
  gj(a2, b2);
  var g2 = 0 !== (b2.flags & 128);
  if (!d2 && !g2) return e2 && dg(b2, c2, false), Zi(a2, b2, f2);
  d2 = b2.stateNode;
  Wi.current = b2;
  var h2 = g2 && "function" !== typeof c2.getDerivedStateFromError ? null : d2.render();
  b2.flags |= 1;
  null !== a2 && g2 ? (b2.child = Ug(b2, a2.child, null, f2), b2.child = Ug(b2, null, h2, f2)) : Xi(a2, b2, h2, f2);
  b2.memoizedState = d2.state;
  e2 && dg(b2, c2, true);
  return b2.child;
}
function kj(a2) {
  var b2 = a2.stateNode;
  b2.pendingContext ? ag(a2, b2.pendingContext, b2.pendingContext !== b2.context) : b2.context && ag(a2, b2.context, false);
  yh(a2, b2.containerInfo);
}
function lj(a2, b2, c2, d2, e2) {
  Ig();
  Jg(e2);
  b2.flags |= 256;
  Xi(a2, b2, c2, d2);
  return b2.child;
}
var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
function nj(a2) {
  return { baseLanes: a2, cachePool: null, transitions: null };
}
function oj(a2, b2, c2) {
  var d2 = b2.pendingProps, e2 = L.current, f2 = false, g2 = 0 !== (b2.flags & 128), h2;
  (h2 = g2) || (h2 = null !== a2 && null === a2.memoizedState ? false : 0 !== (e2 & 2));
  if (h2) f2 = true, b2.flags &= -129;
  else if (null === a2 || null !== a2.memoizedState) e2 |= 1;
  G$1(L, e2 & 1);
  if (null === a2) {
    Eg(b2);
    a2 = b2.memoizedState;
    if (null !== a2 && (a2 = a2.dehydrated, null !== a2)) return 0 === (b2.mode & 1) ? b2.lanes = 1 : "$!" === a2.data ? b2.lanes = 8 : b2.lanes = 1073741824, null;
    g2 = d2.children;
    a2 = d2.fallback;
    return f2 ? (d2 = b2.mode, f2 = b2.child, g2 = { mode: "hidden", children: g2 }, 0 === (d2 & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g2) : f2 = pj(g2, d2, 0, null), a2 = Tg(a2, d2, c2, null), f2.return = b2, a2.return = b2, f2.sibling = a2, b2.child = f2, b2.child.memoizedState = nj(c2), b2.memoizedState = mj, a2) : qj(b2, g2);
  }
  e2 = a2.memoizedState;
  if (null !== e2 && (h2 = e2.dehydrated, null !== h2)) return rj(a2, b2, g2, d2, h2, e2, c2);
  if (f2) {
    f2 = d2.fallback;
    g2 = b2.mode;
    e2 = a2.child;
    h2 = e2.sibling;
    var k2 = { mode: "hidden", children: d2.children };
    0 === (g2 & 1) && b2.child !== e2 ? (d2 = b2.child, d2.childLanes = 0, d2.pendingProps = k2, b2.deletions = null) : (d2 = Pg(e2, k2), d2.subtreeFlags = e2.subtreeFlags & 14680064);
    null !== h2 ? f2 = Pg(h2, f2) : (f2 = Tg(f2, g2, c2, null), f2.flags |= 2);
    f2.return = b2;
    d2.return = b2;
    d2.sibling = f2;
    b2.child = d2;
    d2 = f2;
    f2 = b2.child;
    g2 = a2.child.memoizedState;
    g2 = null === g2 ? nj(c2) : { baseLanes: g2.baseLanes | c2, cachePool: null, transitions: g2.transitions };
    f2.memoizedState = g2;
    f2.childLanes = a2.childLanes & ~c2;
    b2.memoizedState = mj;
    return d2;
  }
  f2 = a2.child;
  a2 = f2.sibling;
  d2 = Pg(f2, { mode: "visible", children: d2.children });
  0 === (b2.mode & 1) && (d2.lanes = c2);
  d2.return = b2;
  d2.sibling = null;
  null !== a2 && (c2 = b2.deletions, null === c2 ? (b2.deletions = [a2], b2.flags |= 16) : c2.push(a2));
  b2.child = d2;
  b2.memoizedState = null;
  return d2;
}
function qj(a2, b2) {
  b2 = pj({ mode: "visible", children: b2 }, a2.mode, 0, null);
  b2.return = a2;
  return a2.child = b2;
}
function sj(a2, b2, c2, d2) {
  null !== d2 && Jg(d2);
  Ug(b2, a2.child, null, c2);
  a2 = qj(b2, b2.pendingProps.children);
  a2.flags |= 2;
  b2.memoizedState = null;
  return a2;
}
function rj(a2, b2, c2, d2, e2, f2, g2) {
  if (c2) {
    if (b2.flags & 256) return b2.flags &= -257, d2 = Ki(Error(p$1(422))), sj(a2, b2, g2, d2);
    if (null !== b2.memoizedState) return b2.child = a2.child, b2.flags |= 128, null;
    f2 = d2.fallback;
    e2 = b2.mode;
    d2 = pj({ mode: "visible", children: d2.children }, e2, 0, null);
    f2 = Tg(f2, e2, g2, null);
    f2.flags |= 2;
    d2.return = b2;
    f2.return = b2;
    d2.sibling = f2;
    b2.child = d2;
    0 !== (b2.mode & 1) && Ug(b2, a2.child, null, g2);
    b2.child.memoizedState = nj(g2);
    b2.memoizedState = mj;
    return f2;
  }
  if (0 === (b2.mode & 1)) return sj(a2, b2, g2, null);
  if ("$!" === e2.data) {
    d2 = e2.nextSibling && e2.nextSibling.dataset;
    if (d2) var h2 = d2.dgst;
    d2 = h2;
    f2 = Error(p$1(419));
    d2 = Ki(f2, d2, void 0);
    return sj(a2, b2, g2, d2);
  }
  h2 = 0 !== (g2 & a2.childLanes);
  if (dh || h2) {
    d2 = Q$1;
    if (null !== d2) {
      switch (g2 & -g2) {
        case 4:
          e2 = 2;
          break;
        case 16:
          e2 = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e2 = 32;
          break;
        case 536870912:
          e2 = 268435456;
          break;
        default:
          e2 = 0;
      }
      e2 = 0 !== (e2 & (d2.suspendedLanes | g2)) ? 0 : e2;
      0 !== e2 && e2 !== f2.retryLane && (f2.retryLane = e2, ih(a2, e2), gi(d2, a2, e2, -1));
    }
    tj();
    d2 = Ki(Error(p$1(421)));
    return sj(a2, b2, g2, d2);
  }
  if ("$?" === e2.data) return b2.flags |= 128, b2.child = a2.child, b2 = uj.bind(null, a2), e2._reactRetry = b2, null;
  a2 = f2.treeContext;
  yg = Lf(e2.nextSibling);
  xg = b2;
  I$1 = true;
  zg = null;
  null !== a2 && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a2.id, sg = a2.overflow, qg = b2);
  b2 = qj(b2, d2.children);
  b2.flags |= 4096;
  return b2;
}
function vj(a2, b2, c2) {
  a2.lanes |= b2;
  var d2 = a2.alternate;
  null !== d2 && (d2.lanes |= b2);
  bh(a2.return, b2, c2);
}
function wj(a2, b2, c2, d2, e2) {
  var f2 = a2.memoizedState;
  null === f2 ? a2.memoizedState = { isBackwards: b2, rendering: null, renderingStartTime: 0, last: d2, tail: c2, tailMode: e2 } : (f2.isBackwards = b2, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d2, f2.tail = c2, f2.tailMode = e2);
}
function xj(a2, b2, c2) {
  var d2 = b2.pendingProps, e2 = d2.revealOrder, f2 = d2.tail;
  Xi(a2, b2, d2.children, c2);
  d2 = L.current;
  if (0 !== (d2 & 2)) d2 = d2 & 1 | 2, b2.flags |= 128;
  else {
    if (null !== a2 && 0 !== (a2.flags & 128)) a: for (a2 = b2.child; null !== a2; ) {
      if (13 === a2.tag) null !== a2.memoizedState && vj(a2, c2, b2);
      else if (19 === a2.tag) vj(a2, c2, b2);
      else if (null !== a2.child) {
        a2.child.return = a2;
        a2 = a2.child;
        continue;
      }
      if (a2 === b2) break a;
      for (; null === a2.sibling; ) {
        if (null === a2.return || a2.return === b2) break a;
        a2 = a2.return;
      }
      a2.sibling.return = a2.return;
      a2 = a2.sibling;
    }
    d2 &= 1;
  }
  G$1(L, d2);
  if (0 === (b2.mode & 1)) b2.memoizedState = null;
  else switch (e2) {
    case "forwards":
      c2 = b2.child;
      for (e2 = null; null !== c2; ) a2 = c2.alternate, null !== a2 && null === Ch(a2) && (e2 = c2), c2 = c2.sibling;
      c2 = e2;
      null === c2 ? (e2 = b2.child, b2.child = null) : (e2 = c2.sibling, c2.sibling = null);
      wj(b2, false, e2, c2, f2);
      break;
    case "backwards":
      c2 = null;
      e2 = b2.child;
      for (b2.child = null; null !== e2; ) {
        a2 = e2.alternate;
        if (null !== a2 && null === Ch(a2)) {
          b2.child = e2;
          break;
        }
        a2 = e2.sibling;
        e2.sibling = c2;
        c2 = e2;
        e2 = a2;
      }
      wj(b2, true, c2, null, f2);
      break;
    case "together":
      wj(b2, false, null, null, void 0);
      break;
    default:
      b2.memoizedState = null;
  }
  return b2.child;
}
function ij(a2, b2) {
  0 === (b2.mode & 1) && null !== a2 && (a2.alternate = null, b2.alternate = null, b2.flags |= 2);
}
function Zi(a2, b2, c2) {
  null !== a2 && (b2.dependencies = a2.dependencies);
  rh |= b2.lanes;
  if (0 === (c2 & b2.childLanes)) return null;
  if (null !== a2 && b2.child !== a2.child) throw Error(p$1(153));
  if (null !== b2.child) {
    a2 = b2.child;
    c2 = Pg(a2, a2.pendingProps);
    b2.child = c2;
    for (c2.return = b2; null !== a2.sibling; ) a2 = a2.sibling, c2 = c2.sibling = Pg(a2, a2.pendingProps), c2.return = b2;
    c2.sibling = null;
  }
  return b2.child;
}
function yj(a2, b2, c2) {
  switch (b2.tag) {
    case 3:
      kj(b2);
      Ig();
      break;
    case 5:
      Ah(b2);
      break;
    case 1:
      Zf(b2.type) && cg(b2);
      break;
    case 4:
      yh(b2, b2.stateNode.containerInfo);
      break;
    case 10:
      var d2 = b2.type._context, e2 = b2.memoizedProps.value;
      G$1(Wg, d2._currentValue);
      d2._currentValue = e2;
      break;
    case 13:
      d2 = b2.memoizedState;
      if (null !== d2) {
        if (null !== d2.dehydrated) return G$1(L, L.current & 1), b2.flags |= 128, null;
        if (0 !== (c2 & b2.child.childLanes)) return oj(a2, b2, c2);
        G$1(L, L.current & 1);
        a2 = Zi(a2, b2, c2);
        return null !== a2 ? a2.sibling : null;
      }
      G$1(L, L.current & 1);
      break;
    case 19:
      d2 = 0 !== (c2 & b2.childLanes);
      if (0 !== (a2.flags & 128)) {
        if (d2) return xj(a2, b2, c2);
        b2.flags |= 128;
      }
      e2 = b2.memoizedState;
      null !== e2 && (e2.rendering = null, e2.tail = null, e2.lastEffect = null);
      G$1(L, L.current);
      if (d2) break;
      else return null;
    case 22:
    case 23:
      return b2.lanes = 0, dj(a2, b2, c2);
  }
  return Zi(a2, b2, c2);
}
var zj, Aj, Bj, Cj;
zj = function(a2, b2) {
  for (var c2 = b2.child; null !== c2; ) {
    if (5 === c2.tag || 6 === c2.tag) a2.appendChild(c2.stateNode);
    else if (4 !== c2.tag && null !== c2.child) {
      c2.child.return = c2;
      c2 = c2.child;
      continue;
    }
    if (c2 === b2) break;
    for (; null === c2.sibling; ) {
      if (null === c2.return || c2.return === b2) return;
      c2 = c2.return;
    }
    c2.sibling.return = c2.return;
    c2 = c2.sibling;
  }
};
Aj = function() {
};
Bj = function(a2, b2, c2, d2) {
  var e2 = a2.memoizedProps;
  if (e2 !== d2) {
    a2 = b2.stateNode;
    xh(uh.current);
    var f2 = null;
    switch (c2) {
      case "input":
        e2 = Ya(a2, e2);
        d2 = Ya(a2, d2);
        f2 = [];
        break;
      case "select":
        e2 = A$1({}, e2, { value: void 0 });
        d2 = A$1({}, d2, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e2 = gb(a2, e2);
        d2 = gb(a2, d2);
        f2 = [];
        break;
      default:
        "function" !== typeof e2.onClick && "function" === typeof d2.onClick && (a2.onclick = Bf);
    }
    ub(c2, d2);
    var g2;
    c2 = null;
    for (l2 in e2) if (!d2.hasOwnProperty(l2) && e2.hasOwnProperty(l2) && null != e2[l2]) if ("style" === l2) {
      var h2 = e2[l2];
      for (g2 in h2) h2.hasOwnProperty(g2) && (c2 || (c2 = {}), c2[g2] = "");
    } else "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d2) {
      var k2 = d2[l2];
      h2 = null != e2 ? e2[l2] : void 0;
      if (d2.hasOwnProperty(l2) && k2 !== h2 && (null != k2 || null != h2)) if ("style" === l2) if (h2) {
        for (g2 in h2) !h2.hasOwnProperty(g2) || k2 && k2.hasOwnProperty(g2) || (c2 || (c2 = {}), c2[g2] = "");
        for (g2 in k2) k2.hasOwnProperty(g2) && h2[g2] !== k2[g2] && (c2 || (c2 = {}), c2[g2] = k2[g2]);
      } else c2 || (f2 || (f2 = []), f2.push(
        l2,
        c2
      )), c2 = k2;
      else "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h2 = h2 ? h2.__html : void 0, null != k2 && h2 !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D$1("scroll", a2), f2 || h2 === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c2 && (f2 = f2 || []).push("style", c2);
    var l2 = f2;
    if (b2.updateQueue = l2) b2.flags |= 4;
  }
};
Cj = function(a2, b2, c2, d2) {
  c2 !== d2 && (b2.flags |= 4);
};
function Dj(a2, b2) {
  if (!I$1) switch (a2.tailMode) {
    case "hidden":
      b2 = a2.tail;
      for (var c2 = null; null !== b2; ) null !== b2.alternate && (c2 = b2), b2 = b2.sibling;
      null === c2 ? a2.tail = null : c2.sibling = null;
      break;
    case "collapsed":
      c2 = a2.tail;
      for (var d2 = null; null !== c2; ) null !== c2.alternate && (d2 = c2), c2 = c2.sibling;
      null === d2 ? b2 || null === a2.tail ? a2.tail = null : a2.tail.sibling = null : d2.sibling = null;
  }
}
function S$1(a2) {
  var b2 = null !== a2.alternate && a2.alternate.child === a2.child, c2 = 0, d2 = 0;
  if (b2) for (var e2 = a2.child; null !== e2; ) c2 |= e2.lanes | e2.childLanes, d2 |= e2.subtreeFlags & 14680064, d2 |= e2.flags & 14680064, e2.return = a2, e2 = e2.sibling;
  else for (e2 = a2.child; null !== e2; ) c2 |= e2.lanes | e2.childLanes, d2 |= e2.subtreeFlags, d2 |= e2.flags, e2.return = a2, e2 = e2.sibling;
  a2.subtreeFlags |= d2;
  a2.childLanes = c2;
  return b2;
}
function Ej(a2, b2, c2) {
  var d2 = b2.pendingProps;
  wg(b2);
  switch (b2.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S$1(b2), null;
    case 1:
      return Zf(b2.type) && $f(), S$1(b2), null;
    case 3:
      d2 = b2.stateNode;
      zh();
      E(Wf);
      E(H);
      Eh();
      d2.pendingContext && (d2.context = d2.pendingContext, d2.pendingContext = null);
      if (null === a2 || null === a2.child) Gg(b2) ? b2.flags |= 4 : null === a2 || a2.memoizedState.isDehydrated && 0 === (b2.flags & 256) || (b2.flags |= 1024, null !== zg && (Fj(zg), zg = null));
      Aj(a2, b2);
      S$1(b2);
      return null;
    case 5:
      Bh(b2);
      var e2 = xh(wh.current);
      c2 = b2.type;
      if (null !== a2 && null != b2.stateNode) Bj(a2, b2, c2, d2, e2), a2.ref !== b2.ref && (b2.flags |= 512, b2.flags |= 2097152);
      else {
        if (!d2) {
          if (null === b2.stateNode) throw Error(p$1(166));
          S$1(b2);
          return null;
        }
        a2 = xh(uh.current);
        if (Gg(b2)) {
          d2 = b2.stateNode;
          c2 = b2.type;
          var f2 = b2.memoizedProps;
          d2[Of] = b2;
          d2[Pf] = f2;
          a2 = 0 !== (b2.mode & 1);
          switch (c2) {
            case "dialog":
              D$1("cancel", d2);
              D$1("close", d2);
              break;
            case "iframe":
            case "object":
            case "embed":
              D$1("load", d2);
              break;
            case "video":
            case "audio":
              for (e2 = 0; e2 < lf.length; e2++) D$1(lf[e2], d2);
              break;
            case "source":
              D$1("error", d2);
              break;
            case "img":
            case "image":
            case "link":
              D$1(
                "error",
                d2
              );
              D$1("load", d2);
              break;
            case "details":
              D$1("toggle", d2);
              break;
            case "input":
              Za(d2, f2);
              D$1("invalid", d2);
              break;
            case "select":
              d2._wrapperState = { wasMultiple: !!f2.multiple };
              D$1("invalid", d2);
              break;
            case "textarea":
              hb(d2, f2), D$1("invalid", d2);
          }
          ub(c2, f2);
          e2 = null;
          for (var g2 in f2) if (f2.hasOwnProperty(g2)) {
            var h2 = f2[g2];
            "children" === g2 ? "string" === typeof h2 ? d2.textContent !== h2 && (true !== f2.suppressHydrationWarning && Af(d2.textContent, h2, a2), e2 = ["children", h2]) : "number" === typeof h2 && d2.textContent !== "" + h2 && (true !== f2.suppressHydrationWarning && Af(
              d2.textContent,
              h2,
              a2
            ), e2 = ["children", "" + h2]) : ea.hasOwnProperty(g2) && null != h2 && "onScroll" === g2 && D$1("scroll", d2);
          }
          switch (c2) {
            case "input":
              Va(d2);
              db(d2, f2, true);
              break;
            case "textarea":
              Va(d2);
              jb(d2);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d2.onclick = Bf);
          }
          d2 = e2;
          b2.updateQueue = d2;
          null !== d2 && (b2.flags |= 4);
        } else {
          g2 = 9 === e2.nodeType ? e2 : e2.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a2 && (a2 = kb(c2));
          "http://www.w3.org/1999/xhtml" === a2 ? "script" === c2 ? (a2 = g2.createElement("div"), a2.innerHTML = "<script><\/script>", a2 = a2.removeChild(a2.firstChild)) : "string" === typeof d2.is ? a2 = g2.createElement(c2, { is: d2.is }) : (a2 = g2.createElement(c2), "select" === c2 && (g2 = a2, d2.multiple ? g2.multiple = true : d2.size && (g2.size = d2.size))) : a2 = g2.createElementNS(a2, c2);
          a2[Of] = b2;
          a2[Pf] = d2;
          zj(a2, b2, false, false);
          b2.stateNode = a2;
          a: {
            g2 = vb(c2, d2);
            switch (c2) {
              case "dialog":
                D$1("cancel", a2);
                D$1("close", a2);
                e2 = d2;
                break;
              case "iframe":
              case "object":
              case "embed":
                D$1("load", a2);
                e2 = d2;
                break;
              case "video":
              case "audio":
                for (e2 = 0; e2 < lf.length; e2++) D$1(lf[e2], a2);
                e2 = d2;
                break;
              case "source":
                D$1("error", a2);
                e2 = d2;
                break;
              case "img":
              case "image":
              case "link":
                D$1(
                  "error",
                  a2
                );
                D$1("load", a2);
                e2 = d2;
                break;
              case "details":
                D$1("toggle", a2);
                e2 = d2;
                break;
              case "input":
                Za(a2, d2);
                e2 = Ya(a2, d2);
                D$1("invalid", a2);
                break;
              case "option":
                e2 = d2;
                break;
              case "select":
                a2._wrapperState = { wasMultiple: !!d2.multiple };
                e2 = A$1({}, d2, { value: void 0 });
                D$1("invalid", a2);
                break;
              case "textarea":
                hb(a2, d2);
                e2 = gb(a2, d2);
                D$1("invalid", a2);
                break;
              default:
                e2 = d2;
            }
            ub(c2, e2);
            h2 = e2;
            for (f2 in h2) if (h2.hasOwnProperty(f2)) {
              var k2 = h2[f2];
              "style" === f2 ? sb(a2, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a2, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c2 || "" !== k2) && ob(a2, k2) : "number" === typeof k2 && ob(a2, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D$1("scroll", a2) : null != k2 && ta(a2, f2, k2, g2));
            }
            switch (c2) {
              case "input":
                Va(a2);
                db(a2, d2, false);
                break;
              case "textarea":
                Va(a2);
                jb(a2);
                break;
              case "option":
                null != d2.value && a2.setAttribute("value", "" + Sa(d2.value));
                break;
              case "select":
                a2.multiple = !!d2.multiple;
                f2 = d2.value;
                null != f2 ? fb(a2, !!d2.multiple, f2, false) : null != d2.defaultValue && fb(
                  a2,
                  !!d2.multiple,
                  d2.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e2.onClick && (a2.onclick = Bf);
            }
            switch (c2) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d2 = !!d2.autoFocus;
                break a;
              case "img":
                d2 = true;
                break a;
              default:
                d2 = false;
            }
          }
          d2 && (b2.flags |= 4);
        }
        null !== b2.ref && (b2.flags |= 512, b2.flags |= 2097152);
      }
      S$1(b2);
      return null;
    case 6:
      if (a2 && null != b2.stateNode) Cj(a2, b2, a2.memoizedProps, d2);
      else {
        if ("string" !== typeof d2 && null === b2.stateNode) throw Error(p$1(166));
        c2 = xh(wh.current);
        xh(uh.current);
        if (Gg(b2)) {
          d2 = b2.stateNode;
          c2 = b2.memoizedProps;
          d2[Of] = b2;
          if (f2 = d2.nodeValue !== c2) {
            if (a2 = xg, null !== a2) switch (a2.tag) {
              case 3:
                Af(d2.nodeValue, c2, 0 !== (a2.mode & 1));
                break;
              case 5:
                true !== a2.memoizedProps.suppressHydrationWarning && Af(d2.nodeValue, c2, 0 !== (a2.mode & 1));
            }
          }
          f2 && (b2.flags |= 4);
        } else d2 = (9 === c2.nodeType ? c2 : c2.ownerDocument).createTextNode(d2), d2[Of] = b2, b2.stateNode = d2;
      }
      S$1(b2);
      return null;
    case 13:
      E(L);
      d2 = b2.memoizedState;
      if (null === a2 || null !== a2.memoizedState && null !== a2.memoizedState.dehydrated) {
        if (I$1 && null !== yg && 0 !== (b2.mode & 1) && 0 === (b2.flags & 128)) Hg(), Ig(), b2.flags |= 98560, f2 = false;
        else if (f2 = Gg(b2), null !== d2 && null !== d2.dehydrated) {
          if (null === a2) {
            if (!f2) throw Error(p$1(318));
            f2 = b2.memoizedState;
            f2 = null !== f2 ? f2.dehydrated : null;
            if (!f2) throw Error(p$1(317));
            f2[Of] = b2;
          } else Ig(), 0 === (b2.flags & 128) && (b2.memoizedState = null), b2.flags |= 4;
          S$1(b2);
          f2 = false;
        } else null !== zg && (Fj(zg), zg = null), f2 = true;
        if (!f2) return b2.flags & 65536 ? b2 : null;
      }
      if (0 !== (b2.flags & 128)) return b2.lanes = c2, b2;
      d2 = null !== d2;
      d2 !== (null !== a2 && null !== a2.memoizedState) && d2 && (b2.child.flags |= 8192, 0 !== (b2.mode & 1) && (null === a2 || 0 !== (L.current & 1) ? 0 === T$1 && (T$1 = 3) : tj()));
      null !== b2.updateQueue && (b2.flags |= 4);
      S$1(b2);
      return null;
    case 4:
      return zh(), Aj(a2, b2), null === a2 && sf(b2.stateNode.containerInfo), S$1(b2), null;
    case 10:
      return ah(b2.type._context), S$1(b2), null;
    case 17:
      return Zf(b2.type) && $f(), S$1(b2), null;
    case 19:
      E(L);
      f2 = b2.memoizedState;
      if (null === f2) return S$1(b2), null;
      d2 = 0 !== (b2.flags & 128);
      g2 = f2.rendering;
      if (null === g2) if (d2) Dj(f2, false);
      else {
        if (0 !== T$1 || null !== a2 && 0 !== (a2.flags & 128)) for (a2 = b2.child; null !== a2; ) {
          g2 = Ch(a2);
          if (null !== g2) {
            b2.flags |= 128;
            Dj(f2, false);
            d2 = g2.updateQueue;
            null !== d2 && (b2.updateQueue = d2, b2.flags |= 4);
            b2.subtreeFlags = 0;
            d2 = c2;
            for (c2 = b2.child; null !== c2; ) f2 = c2, a2 = d2, f2.flags &= 14680066, g2 = f2.alternate, null === g2 ? (f2.childLanes = 0, f2.lanes = a2, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g2.childLanes, f2.lanes = g2.lanes, f2.child = g2.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g2.memoizedProps, f2.memoizedState = g2.memoizedState, f2.updateQueue = g2.updateQueue, f2.type = g2.type, a2 = g2.dependencies, f2.dependencies = null === a2 ? null : { lanes: a2.lanes, firstContext: a2.firstContext }), c2 = c2.sibling;
            G$1(L, L.current & 1 | 2);
            return b2.child;
          }
          a2 = a2.sibling;
        }
        null !== f2.tail && B() > Gj && (b2.flags |= 128, d2 = true, Dj(f2, false), b2.lanes = 4194304);
      }
      else {
        if (!d2) if (a2 = Ch(g2), null !== a2) {
          if (b2.flags |= 128, d2 = true, c2 = a2.updateQueue, null !== c2 && (b2.updateQueue = c2, b2.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g2.alternate && !I$1) return S$1(b2), null;
        } else 2 * B() - f2.renderingStartTime > Gj && 1073741824 !== c2 && (b2.flags |= 128, d2 = true, Dj(f2, false), b2.lanes = 4194304);
        f2.isBackwards ? (g2.sibling = b2.child, b2.child = g2) : (c2 = f2.last, null !== c2 ? c2.sibling = g2 : b2.child = g2, f2.last = g2);
      }
      if (null !== f2.tail) return b2 = f2.tail, f2.rendering = b2, f2.tail = b2.sibling, f2.renderingStartTime = B(), b2.sibling = null, c2 = L.current, G$1(L, d2 ? c2 & 1 | 2 : c2 & 1), b2;
      S$1(b2);
      return null;
    case 22:
    case 23:
      return Hj(), d2 = null !== b2.memoizedState, null !== a2 && null !== a2.memoizedState !== d2 && (b2.flags |= 8192), d2 && 0 !== (b2.mode & 1) ? 0 !== (fj & 1073741824) && (S$1(b2), b2.subtreeFlags & 6 && (b2.flags |= 8192)) : S$1(b2), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p$1(156, b2.tag));
}
function Ij(a2, b2) {
  wg(b2);
  switch (b2.tag) {
    case 1:
      return Zf(b2.type) && $f(), a2 = b2.flags, a2 & 65536 ? (b2.flags = a2 & -65537 | 128, b2) : null;
    case 3:
      return zh(), E(Wf), E(H), Eh(), a2 = b2.flags, 0 !== (a2 & 65536) && 0 === (a2 & 128) ? (b2.flags = a2 & -65537 | 128, b2) : null;
    case 5:
      return Bh(b2), null;
    case 13:
      E(L);
      a2 = b2.memoizedState;
      if (null !== a2 && null !== a2.dehydrated) {
        if (null === b2.alternate) throw Error(p$1(340));
        Ig();
      }
      a2 = b2.flags;
      return a2 & 65536 ? (b2.flags = a2 & -65537 | 128, b2) : null;
    case 19:
      return E(L), null;
    case 4:
      return zh(), null;
    case 10:
      return ah(b2.type._context), null;
    case 22:
    case 23:
      return Hj(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Jj = false, U$1 = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V$1 = null;
function Lj(a2, b2) {
  var c2 = a2.ref;
  if (null !== c2) if ("function" === typeof c2) try {
    c2(null);
  } catch (d2) {
    W$1(a2, b2, d2);
  }
  else c2.current = null;
}
function Mj(a2, b2, c2) {
  try {
    c2();
  } catch (d2) {
    W$1(a2, b2, d2);
  }
}
var Nj = false;
function Oj(a2, b2) {
  Cf = dd;
  a2 = Me();
  if (Ne(a2)) {
    if ("selectionStart" in a2) var c2 = { start: a2.selectionStart, end: a2.selectionEnd };
    else a: {
      c2 = (c2 = a2.ownerDocument) && c2.defaultView || window;
      var d2 = c2.getSelection && c2.getSelection();
      if (d2 && 0 !== d2.rangeCount) {
        c2 = d2.anchorNode;
        var e2 = d2.anchorOffset, f2 = d2.focusNode;
        d2 = d2.focusOffset;
        try {
          c2.nodeType, f2.nodeType;
        } catch (F2) {
          c2 = null;
          break a;
        }
        var g2 = 0, h2 = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a2, r2 = null;
        b: for (; ; ) {
          for (var y2; ; ) {
            q2 !== c2 || 0 !== e2 && 3 !== q2.nodeType || (h2 = g2 + e2);
            q2 !== f2 || 0 !== d2 && 3 !== q2.nodeType || (k2 = g2 + d2);
            3 === q2.nodeType && (g2 += q2.nodeValue.length);
            if (null === (y2 = q2.firstChild)) break;
            r2 = q2;
            q2 = y2;
          }
          for (; ; ) {
            if (q2 === a2) break b;
            r2 === c2 && ++l2 === e2 && (h2 = g2);
            r2 === f2 && ++m2 === d2 && (k2 = g2);
            if (null !== (y2 = q2.nextSibling)) break;
            q2 = r2;
            r2 = q2.parentNode;
          }
          q2 = y2;
        }
        c2 = -1 === h2 || -1 === k2 ? null : { start: h2, end: k2 };
      } else c2 = null;
    }
    c2 = c2 || { start: 0, end: 0 };
  } else c2 = null;
  Df = { focusedElem: a2, selectionRange: c2 };
  dd = false;
  for (V$1 = b2; null !== V$1; ) if (b2 = V$1, a2 = b2.child, 0 !== (b2.subtreeFlags & 1028) && null !== a2) a2.return = b2, V$1 = a2;
  else for (; null !== V$1; ) {
    b2 = V$1;
    try {
      var n2 = b2.alternate;
      if (0 !== (b2.flags & 1024)) switch (b2.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (null !== n2) {
            var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b2.stateNode, w2 = x2.getSnapshotBeforeUpdate(b2.elementType === b2.type ? t2 : Ci(b2.type, t2), J2);
            x2.__reactInternalSnapshotBeforeUpdate = w2;
          }
          break;
        case 3:
          var u2 = b2.stateNode.containerInfo;
          1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(p$1(163));
      }
    } catch (F2) {
      W$1(b2, b2.return, F2);
    }
    a2 = b2.sibling;
    if (null !== a2) {
      a2.return = b2.return;
      V$1 = a2;
      break;
    }
    V$1 = b2.return;
  }
  n2 = Nj;
  Nj = false;
  return n2;
}
function Pj(a2, b2, c2) {
  var d2 = b2.updateQueue;
  d2 = null !== d2 ? d2.lastEffect : null;
  if (null !== d2) {
    var e2 = d2 = d2.next;
    do {
      if ((e2.tag & a2) === a2) {
        var f2 = e2.destroy;
        e2.destroy = void 0;
        void 0 !== f2 && Mj(b2, c2, f2);
      }
      e2 = e2.next;
    } while (e2 !== d2);
  }
}
function Qj(a2, b2) {
  b2 = b2.updateQueue;
  b2 = null !== b2 ? b2.lastEffect : null;
  if (null !== b2) {
    var c2 = b2 = b2.next;
    do {
      if ((c2.tag & a2) === a2) {
        var d2 = c2.create;
        c2.destroy = d2();
      }
      c2 = c2.next;
    } while (c2 !== b2);
  }
}
function Rj(a2) {
  var b2 = a2.ref;
  if (null !== b2) {
    var c2 = a2.stateNode;
    switch (a2.tag) {
      case 5:
        a2 = c2;
        break;
      default:
        a2 = c2;
    }
    "function" === typeof b2 ? b2(a2) : b2.current = a2;
  }
}
function Sj(a2) {
  var b2 = a2.alternate;
  null !== b2 && (a2.alternate = null, Sj(b2));
  a2.child = null;
  a2.deletions = null;
  a2.sibling = null;
  5 === a2.tag && (b2 = a2.stateNode, null !== b2 && (delete b2[Of], delete b2[Pf], delete b2[of], delete b2[Qf], delete b2[Rf]));
  a2.stateNode = null;
  a2.return = null;
  a2.dependencies = null;
  a2.memoizedProps = null;
  a2.memoizedState = null;
  a2.pendingProps = null;
  a2.stateNode = null;
  a2.updateQueue = null;
}
function Tj(a2) {
  return 5 === a2.tag || 3 === a2.tag || 4 === a2.tag;
}
function Uj(a2) {
  a: for (; ; ) {
    for (; null === a2.sibling; ) {
      if (null === a2.return || Tj(a2.return)) return null;
      a2 = a2.return;
    }
    a2.sibling.return = a2.return;
    for (a2 = a2.sibling; 5 !== a2.tag && 6 !== a2.tag && 18 !== a2.tag; ) {
      if (a2.flags & 2) continue a;
      if (null === a2.child || 4 === a2.tag) continue a;
      else a2.child.return = a2, a2 = a2.child;
    }
    if (!(a2.flags & 2)) return a2.stateNode;
  }
}
function Vj(a2, b2, c2) {
  var d2 = a2.tag;
  if (5 === d2 || 6 === d2) a2 = a2.stateNode, b2 ? 8 === c2.nodeType ? c2.parentNode.insertBefore(a2, b2) : c2.insertBefore(a2, b2) : (8 === c2.nodeType ? (b2 = c2.parentNode, b2.insertBefore(a2, c2)) : (b2 = c2, b2.appendChild(a2)), c2 = c2._reactRootContainer, null !== c2 && void 0 !== c2 || null !== b2.onclick || (b2.onclick = Bf));
  else if (4 !== d2 && (a2 = a2.child, null !== a2)) for (Vj(a2, b2, c2), a2 = a2.sibling; null !== a2; ) Vj(a2, b2, c2), a2 = a2.sibling;
}
function Wj(a2, b2, c2) {
  var d2 = a2.tag;
  if (5 === d2 || 6 === d2) a2 = a2.stateNode, b2 ? c2.insertBefore(a2, b2) : c2.appendChild(a2);
  else if (4 !== d2 && (a2 = a2.child, null !== a2)) for (Wj(a2, b2, c2), a2 = a2.sibling; null !== a2; ) Wj(a2, b2, c2), a2 = a2.sibling;
}
var X$2 = null, Xj = false;
function Yj(a2, b2, c2) {
  for (c2 = c2.child; null !== c2; ) Zj(a2, b2, c2), c2 = c2.sibling;
}
function Zj(a2, b2, c2) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
    lc.onCommitFiberUnmount(kc, c2);
  } catch (h2) {
  }
  switch (c2.tag) {
    case 5:
      U$1 || Lj(c2, b2);
    case 6:
      var d2 = X$2, e2 = Xj;
      X$2 = null;
      Yj(a2, b2, c2);
      X$2 = d2;
      Xj = e2;
      null !== X$2 && (Xj ? (a2 = X$2, c2 = c2.stateNode, 8 === a2.nodeType ? a2.parentNode.removeChild(c2) : a2.removeChild(c2)) : X$2.removeChild(c2.stateNode));
      break;
    case 18:
      null !== X$2 && (Xj ? (a2 = X$2, c2 = c2.stateNode, 8 === a2.nodeType ? Kf(a2.parentNode, c2) : 1 === a2.nodeType && Kf(a2, c2), bd(a2)) : Kf(X$2, c2.stateNode));
      break;
    case 4:
      d2 = X$2;
      e2 = Xj;
      X$2 = c2.stateNode.containerInfo;
      Xj = true;
      Yj(a2, b2, c2);
      X$2 = d2;
      Xj = e2;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U$1 && (d2 = c2.updateQueue, null !== d2 && (d2 = d2.lastEffect, null !== d2))) {
        e2 = d2 = d2.next;
        do {
          var f2 = e2, g2 = f2.destroy;
          f2 = f2.tag;
          void 0 !== g2 && (0 !== (f2 & 2) ? Mj(c2, b2, g2) : 0 !== (f2 & 4) && Mj(c2, b2, g2));
          e2 = e2.next;
        } while (e2 !== d2);
      }
      Yj(a2, b2, c2);
      break;
    case 1:
      if (!U$1 && (Lj(c2, b2), d2 = c2.stateNode, "function" === typeof d2.componentWillUnmount)) try {
        d2.props = c2.memoizedProps, d2.state = c2.memoizedState, d2.componentWillUnmount();
      } catch (h2) {
        W$1(c2, b2, h2);
      }
      Yj(a2, b2, c2);
      break;
    case 21:
      Yj(a2, b2, c2);
      break;
    case 22:
      c2.mode & 1 ? (U$1 = (d2 = U$1) || null !== c2.memoizedState, Yj(a2, b2, c2), U$1 = d2) : Yj(a2, b2, c2);
      break;
    default:
      Yj(a2, b2, c2);
  }
}
function ak(a2) {
  var b2 = a2.updateQueue;
  if (null !== b2) {
    a2.updateQueue = null;
    var c2 = a2.stateNode;
    null === c2 && (c2 = a2.stateNode = new Kj());
    b2.forEach(function(b3) {
      var d2 = bk.bind(null, a2, b3);
      c2.has(b3) || (c2.add(b3), b3.then(d2, d2));
    });
  }
}
function ck(a2, b2) {
  var c2 = b2.deletions;
  if (null !== c2) for (var d2 = 0; d2 < c2.length; d2++) {
    var e2 = c2[d2];
    try {
      var f2 = a2, g2 = b2, h2 = g2;
      a: for (; null !== h2; ) {
        switch (h2.tag) {
          case 5:
            X$2 = h2.stateNode;
            Xj = false;
            break a;
          case 3:
            X$2 = h2.stateNode.containerInfo;
            Xj = true;
            break a;
          case 4:
            X$2 = h2.stateNode.containerInfo;
            Xj = true;
            break a;
        }
        h2 = h2.return;
      }
      if (null === X$2) throw Error(p$1(160));
      Zj(f2, g2, e2);
      X$2 = null;
      Xj = false;
      var k2 = e2.alternate;
      null !== k2 && (k2.return = null);
      e2.return = null;
    } catch (l2) {
      W$1(e2, b2, l2);
    }
  }
  if (b2.subtreeFlags & 12854) for (b2 = b2.child; null !== b2; ) dk(b2, a2), b2 = b2.sibling;
}
function dk(a2, b2) {
  var c2 = a2.alternate, d2 = a2.flags;
  switch (a2.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      ck(b2, a2);
      ek(a2);
      if (d2 & 4) {
        try {
          Pj(3, a2, a2.return), Qj(3, a2);
        } catch (t2) {
          W$1(a2, a2.return, t2);
        }
        try {
          Pj(5, a2, a2.return);
        } catch (t2) {
          W$1(a2, a2.return, t2);
        }
      }
      break;
    case 1:
      ck(b2, a2);
      ek(a2);
      d2 & 512 && null !== c2 && Lj(c2, c2.return);
      break;
    case 5:
      ck(b2, a2);
      ek(a2);
      d2 & 512 && null !== c2 && Lj(c2, c2.return);
      if (a2.flags & 32) {
        var e2 = a2.stateNode;
        try {
          ob(e2, "");
        } catch (t2) {
          W$1(a2, a2.return, t2);
        }
      }
      if (d2 & 4 && (e2 = a2.stateNode, null != e2)) {
        var f2 = a2.memoizedProps, g2 = null !== c2 ? c2.memoizedProps : f2, h2 = a2.type, k2 = a2.updateQueue;
        a2.updateQueue = null;
        if (null !== k2) try {
          "input" === h2 && "radio" === f2.type && null != f2.name && ab(e2, f2);
          vb(h2, g2);
          var l2 = vb(h2, f2);
          for (g2 = 0; g2 < k2.length; g2 += 2) {
            var m2 = k2[g2], q2 = k2[g2 + 1];
            "style" === m2 ? sb(e2, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e2, q2) : "children" === m2 ? ob(e2, q2) : ta(e2, m2, q2, l2);
          }
          switch (h2) {
            case "input":
              bb(e2, f2);
              break;
            case "textarea":
              ib(e2, f2);
              break;
            case "select":
              var r2 = e2._wrapperState.wasMultiple;
              e2._wrapperState.wasMultiple = !!f2.multiple;
              var y2 = f2.value;
              null != y2 ? fb(e2, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                e2,
                !!f2.multiple,
                f2.defaultValue,
                true
              ) : fb(e2, !!f2.multiple, f2.multiple ? [] : "", false));
          }
          e2[Pf] = f2;
        } catch (t2) {
          W$1(a2, a2.return, t2);
        }
      }
      break;
    case 6:
      ck(b2, a2);
      ek(a2);
      if (d2 & 4) {
        if (null === a2.stateNode) throw Error(p$1(162));
        e2 = a2.stateNode;
        f2 = a2.memoizedProps;
        try {
          e2.nodeValue = f2;
        } catch (t2) {
          W$1(a2, a2.return, t2);
        }
      }
      break;
    case 3:
      ck(b2, a2);
      ek(a2);
      if (d2 & 4 && null !== c2 && c2.memoizedState.isDehydrated) try {
        bd(b2.containerInfo);
      } catch (t2) {
        W$1(a2, a2.return, t2);
      }
      break;
    case 4:
      ck(b2, a2);
      ek(a2);
      break;
    case 13:
      ck(b2, a2);
      ek(a2);
      e2 = a2.child;
      e2.flags & 8192 && (f2 = null !== e2.memoizedState, e2.stateNode.isHidden = f2, !f2 || null !== e2.alternate && null !== e2.alternate.memoizedState || (fk = B()));
      d2 & 4 && ak(a2);
      break;
    case 22:
      m2 = null !== c2 && null !== c2.memoizedState;
      a2.mode & 1 ? (U$1 = (l2 = U$1) || m2, ck(b2, a2), U$1 = l2) : ck(b2, a2);
      ek(a2);
      if (d2 & 8192) {
        l2 = null !== a2.memoizedState;
        if ((a2.stateNode.isHidden = l2) && !m2 && 0 !== (a2.mode & 1)) for (V$1 = a2, m2 = a2.child; null !== m2; ) {
          for (q2 = V$1 = m2; null !== V$1; ) {
            r2 = V$1;
            y2 = r2.child;
            switch (r2.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Pj(4, r2, r2.return);
                break;
              case 1:
                Lj(r2, r2.return);
                var n2 = r2.stateNode;
                if ("function" === typeof n2.componentWillUnmount) {
                  d2 = r2;
                  c2 = r2.return;
                  try {
                    b2 = d2, n2.props = b2.memoizedProps, n2.state = b2.memoizedState, n2.componentWillUnmount();
                  } catch (t2) {
                    W$1(d2, c2, t2);
                  }
                }
                break;
              case 5:
                Lj(r2, r2.return);
                break;
              case 22:
                if (null !== r2.memoizedState) {
                  gk(q2);
                  continue;
                }
            }
            null !== y2 ? (y2.return = r2, V$1 = y2) : gk(q2);
          }
          m2 = m2.sibling;
        }
        a: for (m2 = null, q2 = a2; ; ) {
          if (5 === q2.tag) {
            if (null === m2) {
              m2 = q2;
              try {
                e2 = q2.stateNode, l2 ? (f2 = e2.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h2 = q2.stateNode, k2 = q2.memoizedProps.style, g2 = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h2.style.display = rb("display", g2));
              } catch (t2) {
                W$1(a2, a2.return, t2);
              }
            }
          } else if (6 === q2.tag) {
            if (null === m2) try {
              q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
            } catch (t2) {
              W$1(a2, a2.return, t2);
            }
          } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a2) && null !== q2.child) {
            q2.child.return = q2;
            q2 = q2.child;
            continue;
          }
          if (q2 === a2) break a;
          for (; null === q2.sibling; ) {
            if (null === q2.return || q2.return === a2) break a;
            m2 === q2 && (m2 = null);
            q2 = q2.return;
          }
          m2 === q2 && (m2 = null);
          q2.sibling.return = q2.return;
          q2 = q2.sibling;
        }
      }
      break;
    case 19:
      ck(b2, a2);
      ek(a2);
      d2 & 4 && ak(a2);
      break;
    case 21:
      break;
    default:
      ck(
        b2,
        a2
      ), ek(a2);
  }
}
function ek(a2) {
  var b2 = a2.flags;
  if (b2 & 2) {
    try {
      a: {
        for (var c2 = a2.return; null !== c2; ) {
          if (Tj(c2)) {
            var d2 = c2;
            break a;
          }
          c2 = c2.return;
        }
        throw Error(p$1(160));
      }
      switch (d2.tag) {
        case 5:
          var e2 = d2.stateNode;
          d2.flags & 32 && (ob(e2, ""), d2.flags &= -33);
          var f2 = Uj(a2);
          Wj(a2, f2, e2);
          break;
        case 3:
        case 4:
          var g2 = d2.stateNode.containerInfo, h2 = Uj(a2);
          Vj(a2, h2, g2);
          break;
        default:
          throw Error(p$1(161));
      }
    } catch (k2) {
      W$1(a2, a2.return, k2);
    }
    a2.flags &= -3;
  }
  b2 & 4096 && (a2.flags &= -4097);
}
function hk(a2, b2, c2) {
  V$1 = a2;
  ik(a2);
}
function ik(a2, b2, c2) {
  for (var d2 = 0 !== (a2.mode & 1); null !== V$1; ) {
    var e2 = V$1, f2 = e2.child;
    if (22 === e2.tag && d2) {
      var g2 = null !== e2.memoizedState || Jj;
      if (!g2) {
        var h2 = e2.alternate, k2 = null !== h2 && null !== h2.memoizedState || U$1;
        h2 = Jj;
        var l2 = U$1;
        Jj = g2;
        if ((U$1 = k2) && !l2) for (V$1 = e2; null !== V$1; ) g2 = V$1, k2 = g2.child, 22 === g2.tag && null !== g2.memoizedState ? jk(e2) : null !== k2 ? (k2.return = g2, V$1 = k2) : jk(e2);
        for (; null !== f2; ) V$1 = f2, ik(f2), f2 = f2.sibling;
        V$1 = e2;
        Jj = h2;
        U$1 = l2;
      }
      kk(a2);
    } else 0 !== (e2.subtreeFlags & 8772) && null !== f2 ? (f2.return = e2, V$1 = f2) : kk(a2);
  }
}
function kk(a2) {
  for (; null !== V$1; ) {
    var b2 = V$1;
    if (0 !== (b2.flags & 8772)) {
      var c2 = b2.alternate;
      try {
        if (0 !== (b2.flags & 8772)) switch (b2.tag) {
          case 0:
          case 11:
          case 15:
            U$1 || Qj(5, b2);
            break;
          case 1:
            var d2 = b2.stateNode;
            if (b2.flags & 4 && !U$1) if (null === c2) d2.componentDidMount();
            else {
              var e2 = b2.elementType === b2.type ? c2.memoizedProps : Ci(b2.type, c2.memoizedProps);
              d2.componentDidUpdate(e2, c2.memoizedState, d2.__reactInternalSnapshotBeforeUpdate);
            }
            var f2 = b2.updateQueue;
            null !== f2 && sh(b2, f2, d2);
            break;
          case 3:
            var g2 = b2.updateQueue;
            if (null !== g2) {
              c2 = null;
              if (null !== b2.child) switch (b2.child.tag) {
                case 5:
                  c2 = b2.child.stateNode;
                  break;
                case 1:
                  c2 = b2.child.stateNode;
              }
              sh(b2, g2, c2);
            }
            break;
          case 5:
            var h2 = b2.stateNode;
            if (null === c2 && b2.flags & 4) {
              c2 = h2;
              var k2 = b2.memoizedProps;
              switch (b2.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  k2.autoFocus && c2.focus();
                  break;
                case "img":
                  k2.src && (c2.src = k2.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (null === b2.memoizedState) {
              var l2 = b2.alternate;
              if (null !== l2) {
                var m2 = l2.memoizedState;
                if (null !== m2) {
                  var q2 = m2.dehydrated;
                  null !== q2 && bd(q2);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(p$1(163));
        }
        U$1 || b2.flags & 512 && Rj(b2);
      } catch (r2) {
        W$1(b2, b2.return, r2);
      }
    }
    if (b2 === a2) {
      V$1 = null;
      break;
    }
    c2 = b2.sibling;
    if (null !== c2) {
      c2.return = b2.return;
      V$1 = c2;
      break;
    }
    V$1 = b2.return;
  }
}
function gk(a2) {
  for (; null !== V$1; ) {
    var b2 = V$1;
    if (b2 === a2) {
      V$1 = null;
      break;
    }
    var c2 = b2.sibling;
    if (null !== c2) {
      c2.return = b2.return;
      V$1 = c2;
      break;
    }
    V$1 = b2.return;
  }
}
function jk(a2) {
  for (; null !== V$1; ) {
    var b2 = V$1;
    try {
      switch (b2.tag) {
        case 0:
        case 11:
        case 15:
          var c2 = b2.return;
          try {
            Qj(4, b2);
          } catch (k2) {
            W$1(b2, c2, k2);
          }
          break;
        case 1:
          var d2 = b2.stateNode;
          if ("function" === typeof d2.componentDidMount) {
            var e2 = b2.return;
            try {
              d2.componentDidMount();
            } catch (k2) {
              W$1(b2, e2, k2);
            }
          }
          var f2 = b2.return;
          try {
            Rj(b2);
          } catch (k2) {
            W$1(b2, f2, k2);
          }
          break;
        case 5:
          var g2 = b2.return;
          try {
            Rj(b2);
          } catch (k2) {
            W$1(b2, g2, k2);
          }
      }
    } catch (k2) {
      W$1(b2, b2.return, k2);
    }
    if (b2 === a2) {
      V$1 = null;
      break;
    }
    var h2 = b2.sibling;
    if (null !== h2) {
      h2.return = b2.return;
      V$1 = h2;
      break;
    }
    V$1 = b2.return;
  }
}
var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q$1 = null, Y$1 = null, Z$1 = 0, fj = 0, ej = Uf(0), T$1 = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
function R() {
  return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
}
function yi(a2) {
  if (0 === (a2.mode & 1)) return 1;
  if (0 !== (K & 2) && 0 !== Z$1) return Z$1 & -Z$1;
  if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
  a2 = C;
  if (0 !== a2) return a2;
  a2 = window.event;
  a2 = void 0 === a2 ? 16 : jd(a2.type);
  return a2;
}
function gi(a2, b2, c2, d2) {
  if (50 < yk) throw yk = 0, zk = null, Error(p$1(185));
  Ac(a2, c2, d2);
  if (0 === (K & 2) || a2 !== Q$1) a2 === Q$1 && (0 === (K & 2) && (qk |= c2), 4 === T$1 && Ck(a2, Z$1)), Dk(a2, d2), 1 === c2 && 0 === K && 0 === (b2.mode & 1) && (Gj = B() + 500, fg && jg());
}
function Dk(a2, b2) {
  var c2 = a2.callbackNode;
  wc(a2, b2);
  var d2 = uc(a2, a2 === Q$1 ? Z$1 : 0);
  if (0 === d2) null !== c2 && bc(c2), a2.callbackNode = null, a2.callbackPriority = 0;
  else if (b2 = d2 & -d2, a2.callbackPriority !== b2) {
    null != c2 && bc(c2);
    if (1 === b2) 0 === a2.tag ? ig(Ek.bind(null, a2)) : hg(Ek.bind(null, a2)), Jf(function() {
      0 === (K & 6) && jg();
    }), c2 = null;
    else {
      switch (Dc(d2)) {
        case 1:
          c2 = fc;
          break;
        case 4:
          c2 = gc;
          break;
        case 16:
          c2 = hc;
          break;
        case 536870912:
          c2 = jc;
          break;
        default:
          c2 = hc;
      }
      c2 = Fk(c2, Gk.bind(null, a2));
    }
    a2.callbackPriority = b2;
    a2.callbackNode = c2;
  }
}
function Gk(a2, b2) {
  Ak = -1;
  Bk = 0;
  if (0 !== (K & 6)) throw Error(p$1(327));
  var c2 = a2.callbackNode;
  if (Hk() && a2.callbackNode !== c2) return null;
  var d2 = uc(a2, a2 === Q$1 ? Z$1 : 0);
  if (0 === d2) return null;
  if (0 !== (d2 & 30) || 0 !== (d2 & a2.expiredLanes) || b2) b2 = Ik(a2, d2);
  else {
    b2 = d2;
    var e2 = K;
    K |= 2;
    var f2 = Jk();
    if (Q$1 !== a2 || Z$1 !== b2) uk = null, Gj = B() + 500, Kk(a2, b2);
    do
      try {
        Lk();
        break;
      } catch (h2) {
        Mk(a2, h2);
      }
    while (1);
    $g();
    mk.current = f2;
    K = e2;
    null !== Y$1 ? b2 = 0 : (Q$1 = null, Z$1 = 0, b2 = T$1);
  }
  if (0 !== b2) {
    2 === b2 && (e2 = xc(a2), 0 !== e2 && (d2 = e2, b2 = Nk(a2, e2)));
    if (1 === b2) throw c2 = pk, Kk(a2, 0), Ck(a2, d2), Dk(a2, B()), c2;
    if (6 === b2) Ck(a2, d2);
    else {
      e2 = a2.current.alternate;
      if (0 === (d2 & 30) && !Ok(e2) && (b2 = Ik(a2, d2), 2 === b2 && (f2 = xc(a2), 0 !== f2 && (d2 = f2, b2 = Nk(a2, f2))), 1 === b2)) throw c2 = pk, Kk(a2, 0), Ck(a2, d2), Dk(a2, B()), c2;
      a2.finishedWork = e2;
      a2.finishedLanes = d2;
      switch (b2) {
        case 0:
        case 1:
          throw Error(p$1(345));
        case 2:
          Pk(a2, tk, uk);
          break;
        case 3:
          Ck(a2, d2);
          if ((d2 & 130023424) === d2 && (b2 = fk + 500 - B(), 10 < b2)) {
            if (0 !== uc(a2, 0)) break;
            e2 = a2.suspendedLanes;
            if ((e2 & d2) !== d2) {
              R();
              a2.pingedLanes |= a2.suspendedLanes & e2;
              break;
            }
            a2.timeoutHandle = Ff(Pk.bind(null, a2, tk, uk), b2);
            break;
          }
          Pk(a2, tk, uk);
          break;
        case 4:
          Ck(a2, d2);
          if ((d2 & 4194240) === d2) break;
          b2 = a2.eventTimes;
          for (e2 = -1; 0 < d2; ) {
            var g2 = 31 - oc(d2);
            f2 = 1 << g2;
            g2 = b2[g2];
            g2 > e2 && (e2 = g2);
            d2 &= ~f2;
          }
          d2 = e2;
          d2 = B() - d2;
          d2 = (120 > d2 ? 120 : 480 > d2 ? 480 : 1080 > d2 ? 1080 : 1920 > d2 ? 1920 : 3e3 > d2 ? 3e3 : 4320 > d2 ? 4320 : 1960 * lk(d2 / 1960)) - d2;
          if (10 < d2) {
            a2.timeoutHandle = Ff(Pk.bind(null, a2, tk, uk), d2);
            break;
          }
          Pk(a2, tk, uk);
          break;
        case 5:
          Pk(a2, tk, uk);
          break;
        default:
          throw Error(p$1(329));
      }
    }
  }
  Dk(a2, B());
  return a2.callbackNode === c2 ? Gk.bind(null, a2) : null;
}
function Nk(a2, b2) {
  var c2 = sk;
  a2.current.memoizedState.isDehydrated && (Kk(a2, b2).flags |= 256);
  a2 = Ik(a2, b2);
  2 !== a2 && (b2 = tk, tk = c2, null !== b2 && Fj(b2));
  return a2;
}
function Fj(a2) {
  null === tk ? tk = a2 : tk.push.apply(tk, a2);
}
function Ok(a2) {
  for (var b2 = a2; ; ) {
    if (b2.flags & 16384) {
      var c2 = b2.updateQueue;
      if (null !== c2 && (c2 = c2.stores, null !== c2)) for (var d2 = 0; d2 < c2.length; d2++) {
        var e2 = c2[d2], f2 = e2.getSnapshot;
        e2 = e2.value;
        try {
          if (!He(f2(), e2)) return false;
        } catch (g2) {
          return false;
        }
      }
    }
    c2 = b2.child;
    if (b2.subtreeFlags & 16384 && null !== c2) c2.return = b2, b2 = c2;
    else {
      if (b2 === a2) break;
      for (; null === b2.sibling; ) {
        if (null === b2.return || b2.return === a2) return true;
        b2 = b2.return;
      }
      b2.sibling.return = b2.return;
      b2 = b2.sibling;
    }
  }
  return true;
}
function Ck(a2, b2) {
  b2 &= ~rk;
  b2 &= ~qk;
  a2.suspendedLanes |= b2;
  a2.pingedLanes &= ~b2;
  for (a2 = a2.expirationTimes; 0 < b2; ) {
    var c2 = 31 - oc(b2), d2 = 1 << c2;
    a2[c2] = -1;
    b2 &= ~d2;
  }
}
function Ek(a2) {
  if (0 !== (K & 6)) throw Error(p$1(327));
  Hk();
  var b2 = uc(a2, 0);
  if (0 === (b2 & 1)) return Dk(a2, B()), null;
  var c2 = Ik(a2, b2);
  if (0 !== a2.tag && 2 === c2) {
    var d2 = xc(a2);
    0 !== d2 && (b2 = d2, c2 = Nk(a2, d2));
  }
  if (1 === c2) throw c2 = pk, Kk(a2, 0), Ck(a2, b2), Dk(a2, B()), c2;
  if (6 === c2) throw Error(p$1(345));
  a2.finishedWork = a2.current.alternate;
  a2.finishedLanes = b2;
  Pk(a2, tk, uk);
  Dk(a2, B());
  return null;
}
function Qk(a2, b2) {
  var c2 = K;
  K |= 1;
  try {
    return a2(b2);
  } finally {
    K = c2, 0 === K && (Gj = B() + 500, fg && jg());
  }
}
function Rk(a2) {
  null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
  var b2 = K;
  K |= 1;
  var c2 = ok.transition, d2 = C;
  try {
    if (ok.transition = null, C = 1, a2) return a2();
  } finally {
    C = d2, ok.transition = c2, K = b2, 0 === (K & 6) && jg();
  }
}
function Hj() {
  fj = ej.current;
  E(ej);
}
function Kk(a2, b2) {
  a2.finishedWork = null;
  a2.finishedLanes = 0;
  var c2 = a2.timeoutHandle;
  -1 !== c2 && (a2.timeoutHandle = -1, Gf(c2));
  if (null !== Y$1) for (c2 = Y$1.return; null !== c2; ) {
    var d2 = c2;
    wg(d2);
    switch (d2.tag) {
      case 1:
        d2 = d2.type.childContextTypes;
        null !== d2 && void 0 !== d2 && $f();
        break;
      case 3:
        zh();
        E(Wf);
        E(H);
        Eh();
        break;
      case 5:
        Bh(d2);
        break;
      case 4:
        zh();
        break;
      case 13:
        E(L);
        break;
      case 19:
        E(L);
        break;
      case 10:
        ah(d2.type._context);
        break;
      case 22:
      case 23:
        Hj();
    }
    c2 = c2.return;
  }
  Q$1 = a2;
  Y$1 = a2 = Pg(a2.current, null);
  Z$1 = fj = b2;
  T$1 = 0;
  pk = null;
  rk = qk = rh = 0;
  tk = sk = null;
  if (null !== fh) {
    for (b2 = 0; b2 < fh.length; b2++) if (c2 = fh[b2], d2 = c2.interleaved, null !== d2) {
      c2.interleaved = null;
      var e2 = d2.next, f2 = c2.pending;
      if (null !== f2) {
        var g2 = f2.next;
        f2.next = e2;
        d2.next = g2;
      }
      c2.pending = d2;
    }
    fh = null;
  }
  return a2;
}
function Mk(a2, b2) {
  do {
    var c2 = Y$1;
    try {
      $g();
      Fh.current = Rh;
      if (Ih) {
        for (var d2 = M$1.memoizedState; null !== d2; ) {
          var e2 = d2.queue;
          null !== e2 && (e2.pending = null);
          d2 = d2.next;
        }
        Ih = false;
      }
      Hh = 0;
      O$1 = N = M$1 = null;
      Jh = false;
      Kh = 0;
      nk.current = null;
      if (null === c2 || null === c2.return) {
        T$1 = 1;
        pk = b2;
        Y$1 = null;
        break;
      }
      a: {
        var f2 = a2, g2 = c2.return, h2 = c2, k2 = b2;
        b2 = Z$1;
        h2.flags |= 32768;
        if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
          var l2 = k2, m2 = h2, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Ui(g2);
          if (null !== y2) {
            y2.flags &= -257;
            Vi(y2, g2, h2, f2, b2);
            y2.mode & 1 && Si(f2, l2, b2);
            b2 = y2;
            k2 = l2;
            var n2 = b2.updateQueue;
            if (null === n2) {
              var t2 = /* @__PURE__ */ new Set();
              t2.add(k2);
              b2.updateQueue = t2;
            } else n2.add(k2);
            break a;
          } else {
            if (0 === (b2 & 1)) {
              Si(f2, l2, b2);
              tj();
              break a;
            }
            k2 = Error(p$1(426));
          }
        } else if (I$1 && h2.mode & 1) {
          var J2 = Ui(g2);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Vi(J2, g2, h2, f2, b2);
            Jg(Ji(k2, h2));
            break a;
          }
        }
        f2 = k2 = Ji(k2, h2);
        4 !== T$1 && (T$1 = 2);
        null === sk ? sk = [f2] : sk.push(f2);
        f2 = g2;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b2 &= -b2;
              f2.lanes |= b2;
              var x2 = Ni(f2, k2, b2);
              ph(f2, x2);
              break a;
            case 1:
              h2 = k2;
              var w2 = f2.type, u2 = f2.stateNode;
              if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                f2.flags |= 65536;
                b2 &= -b2;
                f2.lanes |= b2;
                var F2 = Qi(f2, h2, b2);
                ph(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (null !== f2);
      }
      Sk(c2);
    } catch (na) {
      b2 = na;
      Y$1 === c2 && null !== c2 && (Y$1 = c2 = c2.return);
      continue;
    }
    break;
  } while (1);
}
function Jk() {
  var a2 = mk.current;
  mk.current = Rh;
  return null === a2 ? Rh : a2;
}
function tj() {
  if (0 === T$1 || 3 === T$1 || 2 === T$1) T$1 = 4;
  null === Q$1 || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q$1, Z$1);
}
function Ik(a2, b2) {
  var c2 = K;
  K |= 2;
  var d2 = Jk();
  if (Q$1 !== a2 || Z$1 !== b2) uk = null, Kk(a2, b2);
  do
    try {
      Tk();
      break;
    } catch (e2) {
      Mk(a2, e2);
    }
  while (1);
  $g();
  K = c2;
  mk.current = d2;
  if (null !== Y$1) throw Error(p$1(261));
  Q$1 = null;
  Z$1 = 0;
  return T$1;
}
function Tk() {
  for (; null !== Y$1; ) Uk(Y$1);
}
function Lk() {
  for (; null !== Y$1 && !cc(); ) Uk(Y$1);
}
function Uk(a2) {
  var b2 = Vk(a2.alternate, a2, fj);
  a2.memoizedProps = a2.pendingProps;
  null === b2 ? Sk(a2) : Y$1 = b2;
  nk.current = null;
}
function Sk(a2) {
  var b2 = a2;
  do {
    var c2 = b2.alternate;
    a2 = b2.return;
    if (0 === (b2.flags & 32768)) {
      if (c2 = Ej(c2, b2, fj), null !== c2) {
        Y$1 = c2;
        return;
      }
    } else {
      c2 = Ij(c2, b2);
      if (null !== c2) {
        c2.flags &= 32767;
        Y$1 = c2;
        return;
      }
      if (null !== a2) a2.flags |= 32768, a2.subtreeFlags = 0, a2.deletions = null;
      else {
        T$1 = 6;
        Y$1 = null;
        return;
      }
    }
    b2 = b2.sibling;
    if (null !== b2) {
      Y$1 = b2;
      return;
    }
    Y$1 = b2 = a2;
  } while (null !== b2);
  0 === T$1 && (T$1 = 5);
}
function Pk(a2, b2, c2) {
  var d2 = C, e2 = ok.transition;
  try {
    ok.transition = null, C = 1, Wk(a2, b2, c2, d2);
  } finally {
    ok.transition = e2, C = d2;
  }
  return null;
}
function Wk(a2, b2, c2, d2) {
  do
    Hk();
  while (null !== wk);
  if (0 !== (K & 6)) throw Error(p$1(327));
  c2 = a2.finishedWork;
  var e2 = a2.finishedLanes;
  if (null === c2) return null;
  a2.finishedWork = null;
  a2.finishedLanes = 0;
  if (c2 === a2.current) throw Error(p$1(177));
  a2.callbackNode = null;
  a2.callbackPriority = 0;
  var f2 = c2.lanes | c2.childLanes;
  Bc(a2, f2);
  a2 === Q$1 && (Y$1 = Q$1 = null, Z$1 = 0);
  0 === (c2.subtreeFlags & 2064) && 0 === (c2.flags & 2064) || vk || (vk = true, Fk(hc, function() {
    Hk();
    return null;
  }));
  f2 = 0 !== (c2.flags & 15990);
  if (0 !== (c2.subtreeFlags & 15990) || f2) {
    f2 = ok.transition;
    ok.transition = null;
    var g2 = C;
    C = 1;
    var h2 = K;
    K |= 4;
    nk.current = null;
    Oj(a2, c2);
    dk(c2, a2);
    Oe(Df);
    dd = !!Cf;
    Df = Cf = null;
    a2.current = c2;
    hk(c2);
    dc();
    K = h2;
    C = g2;
    ok.transition = f2;
  } else a2.current = c2;
  vk && (vk = false, wk = a2, xk = e2);
  f2 = a2.pendingLanes;
  0 === f2 && (Ri = null);
  mc(c2.stateNode);
  Dk(a2, B());
  if (null !== b2) for (d2 = a2.onRecoverableError, c2 = 0; c2 < b2.length; c2++) e2 = b2[c2], d2(e2.value, { componentStack: e2.stack, digest: e2.digest });
  if (Oi) throw Oi = false, a2 = Pi, Pi = null, a2;
  0 !== (xk & 1) && 0 !== a2.tag && Hk();
  f2 = a2.pendingLanes;
  0 !== (f2 & 1) ? a2 === zk ? yk++ : (yk = 0, zk = a2) : yk = 0;
  jg();
  return null;
}
function Hk() {
  if (null !== wk) {
    var a2 = Dc(xk), b2 = ok.transition, c2 = C;
    try {
      ok.transition = null;
      C = 16 > a2 ? 16 : a2;
      if (null === wk) var d2 = false;
      else {
        a2 = wk;
        wk = null;
        xk = 0;
        if (0 !== (K & 6)) throw Error(p$1(331));
        var e2 = K;
        K |= 4;
        for (V$1 = a2.current; null !== V$1; ) {
          var f2 = V$1, g2 = f2.child;
          if (0 !== (V$1.flags & 16)) {
            var h2 = f2.deletions;
            if (null !== h2) {
              for (var k2 = 0; k2 < h2.length; k2++) {
                var l2 = h2[k2];
                for (V$1 = l2; null !== V$1; ) {
                  var m2 = V$1;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (null !== q2) q2.return = m2, V$1 = q2;
                  else for (; null !== V$1; ) {
                    m2 = V$1;
                    var r2 = m2.sibling, y2 = m2.return;
                    Sj(m2);
                    if (m2 === l2) {
                      V$1 = null;
                      break;
                    }
                    if (null !== r2) {
                      r2.return = y2;
                      V$1 = r2;
                      break;
                    }
                    V$1 = y2;
                  }
                }
              }
              var n2 = f2.alternate;
              if (null !== n2) {
                var t2 = n2.child;
                if (null !== t2) {
                  n2.child = null;
                  do {
                    var J2 = t2.sibling;
                    t2.sibling = null;
                    t2 = J2;
                  } while (null !== t2);
                }
              }
              V$1 = f2;
            }
          }
          if (0 !== (f2.subtreeFlags & 2064) && null !== g2) g2.return = f2, V$1 = g2;
          else b: for (; null !== V$1; ) {
            f2 = V$1;
            if (0 !== (f2.flags & 2048)) switch (f2.tag) {
              case 0:
              case 11:
              case 15:
                Pj(9, f2, f2.return);
            }
            var x2 = f2.sibling;
            if (null !== x2) {
              x2.return = f2.return;
              V$1 = x2;
              break b;
            }
            V$1 = f2.return;
          }
        }
        var w2 = a2.current;
        for (V$1 = w2; null !== V$1; ) {
          g2 = V$1;
          var u2 = g2.child;
          if (0 !== (g2.subtreeFlags & 2064) && null !== u2) u2.return = g2, V$1 = u2;
          else b: for (g2 = w2; null !== V$1; ) {
            h2 = V$1;
            if (0 !== (h2.flags & 2048)) try {
              switch (h2.tag) {
                case 0:
                case 11:
                case 15:
                  Qj(9, h2);
              }
            } catch (na) {
              W$1(h2, h2.return, na);
            }
            if (h2 === g2) {
              V$1 = null;
              break b;
            }
            var F2 = h2.sibling;
            if (null !== F2) {
              F2.return = h2.return;
              V$1 = F2;
              break b;
            }
            V$1 = h2.return;
          }
        }
        K = e2;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
          lc.onPostCommitFiberRoot(kc, a2);
        } catch (na) {
        }
        d2 = true;
      }
      return d2;
    } finally {
      C = c2, ok.transition = b2;
    }
  }
  return false;
}
function Xk(a2, b2, c2) {
  b2 = Ji(c2, b2);
  b2 = Ni(a2, b2, 1);
  a2 = nh(a2, b2, 1);
  b2 = R();
  null !== a2 && (Ac(a2, 1, b2), Dk(a2, b2));
}
function W$1(a2, b2, c2) {
  if (3 === a2.tag) Xk(a2, a2, c2);
  else for (; null !== b2; ) {
    if (3 === b2.tag) {
      Xk(b2, a2, c2);
      break;
    } else if (1 === b2.tag) {
      var d2 = b2.stateNode;
      if ("function" === typeof b2.type.getDerivedStateFromError || "function" === typeof d2.componentDidCatch && (null === Ri || !Ri.has(d2))) {
        a2 = Ji(c2, a2);
        a2 = Qi(b2, a2, 1);
        b2 = nh(b2, a2, 1);
        a2 = R();
        null !== b2 && (Ac(b2, 1, a2), Dk(b2, a2));
        break;
      }
    }
    b2 = b2.return;
  }
}
function Ti(a2, b2, c2) {
  var d2 = a2.pingCache;
  null !== d2 && d2.delete(b2);
  b2 = R();
  a2.pingedLanes |= a2.suspendedLanes & c2;
  Q$1 === a2 && (Z$1 & c2) === c2 && (4 === T$1 || 3 === T$1 && (Z$1 & 130023424) === Z$1 && 500 > B() - fk ? Kk(a2, 0) : rk |= c2);
  Dk(a2, b2);
}
function Yk(a2, b2) {
  0 === b2 && (0 === (a2.mode & 1) ? b2 = 1 : (b2 = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c2 = R();
  a2 = ih(a2, b2);
  null !== a2 && (Ac(a2, b2, c2), Dk(a2, c2));
}
function uj(a2) {
  var b2 = a2.memoizedState, c2 = 0;
  null !== b2 && (c2 = b2.retryLane);
  Yk(a2, c2);
}
function bk(a2, b2) {
  var c2 = 0;
  switch (a2.tag) {
    case 13:
      var d2 = a2.stateNode;
      var e2 = a2.memoizedState;
      null !== e2 && (c2 = e2.retryLane);
      break;
    case 19:
      d2 = a2.stateNode;
      break;
    default:
      throw Error(p$1(314));
  }
  null !== d2 && d2.delete(b2);
  Yk(a2, c2);
}
var Vk;
Vk = function(a2, b2, c2) {
  if (null !== a2) if (a2.memoizedProps !== b2.pendingProps || Wf.current) dh = true;
  else {
    if (0 === (a2.lanes & c2) && 0 === (b2.flags & 128)) return dh = false, yj(a2, b2, c2);
    dh = 0 !== (a2.flags & 131072) ? true : false;
  }
  else dh = false, I$1 && 0 !== (b2.flags & 1048576) && ug(b2, ng, b2.index);
  b2.lanes = 0;
  switch (b2.tag) {
    case 2:
      var d2 = b2.type;
      ij(a2, b2);
      a2 = b2.pendingProps;
      var e2 = Yf(b2, H.current);
      ch(b2, c2);
      e2 = Nh(null, b2, d2, a2, e2, c2);
      var f2 = Sh();
      b2.flags |= 1;
      "object" === typeof e2 && null !== e2 && "function" === typeof e2.render && void 0 === e2.$$typeof ? (b2.tag = 1, b2.memoizedState = null, b2.updateQueue = null, Zf(d2) ? (f2 = true, cg(b2)) : f2 = false, b2.memoizedState = null !== e2.state && void 0 !== e2.state ? e2.state : null, kh(b2), e2.updater = Ei, b2.stateNode = e2, e2._reactInternals = b2, Ii(b2, d2, a2, c2), b2 = jj(null, b2, d2, true, f2, c2)) : (b2.tag = 0, I$1 && f2 && vg(b2), Xi(null, b2, e2, c2), b2 = b2.child);
      return b2;
    case 16:
      d2 = b2.elementType;
      a: {
        ij(a2, b2);
        a2 = b2.pendingProps;
        e2 = d2._init;
        d2 = e2(d2._payload);
        b2.type = d2;
        e2 = b2.tag = Zk(d2);
        a2 = Ci(d2, a2);
        switch (e2) {
          case 0:
            b2 = cj(null, b2, d2, a2, c2);
            break a;
          case 1:
            b2 = hj(null, b2, d2, a2, c2);
            break a;
          case 11:
            b2 = Yi(null, b2, d2, a2, c2);
            break a;
          case 14:
            b2 = $i(null, b2, d2, Ci(d2.type, a2), c2);
            break a;
        }
        throw Error(p$1(
          306,
          d2,
          ""
        ));
      }
      return b2;
    case 0:
      return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : Ci(d2, e2), cj(a2, b2, d2, e2, c2);
    case 1:
      return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : Ci(d2, e2), hj(a2, b2, d2, e2, c2);
    case 3:
      a: {
        kj(b2);
        if (null === a2) throw Error(p$1(387));
        d2 = b2.pendingProps;
        f2 = b2.memoizedState;
        e2 = f2.element;
        lh(a2, b2);
        qh(b2, d2, null, c2);
        var g2 = b2.memoizedState;
        d2 = g2.element;
        if (f2.isDehydrated) if (f2 = { element: d2, isDehydrated: false, cache: g2.cache, pendingSuspenseBoundaries: g2.pendingSuspenseBoundaries, transitions: g2.transitions }, b2.updateQueue.baseState = f2, b2.memoizedState = f2, b2.flags & 256) {
          e2 = Ji(Error(p$1(423)), b2);
          b2 = lj(a2, b2, d2, c2, e2);
          break a;
        } else if (d2 !== e2) {
          e2 = Ji(Error(p$1(424)), b2);
          b2 = lj(a2, b2, d2, c2, e2);
          break a;
        } else for (yg = Lf(b2.stateNode.containerInfo.firstChild), xg = b2, I$1 = true, zg = null, c2 = Vg(b2, null, d2, c2), b2.child = c2; c2; ) c2.flags = c2.flags & -3 | 4096, c2 = c2.sibling;
        else {
          Ig();
          if (d2 === e2) {
            b2 = Zi(a2, b2, c2);
            break a;
          }
          Xi(a2, b2, d2, c2);
        }
        b2 = b2.child;
      }
      return b2;
    case 5:
      return Ah(b2), null === a2 && Eg(b2), d2 = b2.type, e2 = b2.pendingProps, f2 = null !== a2 ? a2.memoizedProps : null, g2 = e2.children, Ef(d2, e2) ? g2 = null : null !== f2 && Ef(d2, f2) && (b2.flags |= 32), gj(a2, b2), Xi(a2, b2, g2, c2), b2.child;
    case 6:
      return null === a2 && Eg(b2), null;
    case 13:
      return oj(a2, b2, c2);
    case 4:
      return yh(b2, b2.stateNode.containerInfo), d2 = b2.pendingProps, null === a2 ? b2.child = Ug(b2, null, d2, c2) : Xi(a2, b2, d2, c2), b2.child;
    case 11:
      return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : Ci(d2, e2), Yi(a2, b2, d2, e2, c2);
    case 7:
      return Xi(a2, b2, b2.pendingProps, c2), b2.child;
    case 8:
      return Xi(a2, b2, b2.pendingProps.children, c2), b2.child;
    case 12:
      return Xi(a2, b2, b2.pendingProps.children, c2), b2.child;
    case 10:
      a: {
        d2 = b2.type._context;
        e2 = b2.pendingProps;
        f2 = b2.memoizedProps;
        g2 = e2.value;
        G$1(Wg, d2._currentValue);
        d2._currentValue = g2;
        if (null !== f2) if (He(f2.value, g2)) {
          if (f2.children === e2.children && !Wf.current) {
            b2 = Zi(a2, b2, c2);
            break a;
          }
        } else for (f2 = b2.child, null !== f2 && (f2.return = b2); null !== f2; ) {
          var h2 = f2.dependencies;
          if (null !== h2) {
            g2 = f2.child;
            for (var k2 = h2.firstContext; null !== k2; ) {
              if (k2.context === d2) {
                if (1 === f2.tag) {
                  k2 = mh(-1, c2 & -c2);
                  k2.tag = 2;
                  var l2 = f2.updateQueue;
                  if (null !== l2) {
                    l2 = l2.shared;
                    var m2 = l2.pending;
                    null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                    l2.pending = k2;
                  }
                }
                f2.lanes |= c2;
                k2 = f2.alternate;
                null !== k2 && (k2.lanes |= c2);
                bh(
                  f2.return,
                  c2,
                  b2
                );
                h2.lanes |= c2;
                break;
              }
              k2 = k2.next;
            }
          } else if (10 === f2.tag) g2 = f2.type === b2.type ? null : f2.child;
          else if (18 === f2.tag) {
            g2 = f2.return;
            if (null === g2) throw Error(p$1(341));
            g2.lanes |= c2;
            h2 = g2.alternate;
            null !== h2 && (h2.lanes |= c2);
            bh(g2, c2, b2);
            g2 = f2.sibling;
          } else g2 = f2.child;
          if (null !== g2) g2.return = f2;
          else for (g2 = f2; null !== g2; ) {
            if (g2 === b2) {
              g2 = null;
              break;
            }
            f2 = g2.sibling;
            if (null !== f2) {
              f2.return = g2.return;
              g2 = f2;
              break;
            }
            g2 = g2.return;
          }
          f2 = g2;
        }
        Xi(a2, b2, e2.children, c2);
        b2 = b2.child;
      }
      return b2;
    case 9:
      return e2 = b2.type, d2 = b2.pendingProps.children, ch(b2, c2), e2 = eh(e2), d2 = d2(e2), b2.flags |= 1, Xi(a2, b2, d2, c2), b2.child;
    case 14:
      return d2 = b2.type, e2 = Ci(d2, b2.pendingProps), e2 = Ci(d2.type, e2), $i(a2, b2, d2, e2, c2);
    case 15:
      return bj(a2, b2, b2.type, b2.pendingProps, c2);
    case 17:
      return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : Ci(d2, e2), ij(a2, b2), b2.tag = 1, Zf(d2) ? (a2 = true, cg(b2)) : a2 = false, ch(b2, c2), Gi(b2, d2, e2), Ii(b2, d2, e2, c2), jj(null, b2, d2, true, a2, c2);
    case 19:
      return xj(a2, b2, c2);
    case 22:
      return dj(a2, b2, c2);
  }
  throw Error(p$1(156, b2.tag));
};
function Fk(a2, b2) {
  return ac(a2, b2);
}
function $k(a2, b2, c2, d2) {
  this.tag = a2;
  this.key = c2;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b2;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d2;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a2, b2, c2, d2) {
  return new $k(a2, b2, c2, d2);
}
function aj(a2) {
  a2 = a2.prototype;
  return !(!a2 || !a2.isReactComponent);
}
function Zk(a2) {
  if ("function" === typeof a2) return aj(a2) ? 1 : 0;
  if (void 0 !== a2 && null !== a2) {
    a2 = a2.$$typeof;
    if (a2 === Da) return 11;
    if (a2 === Ga) return 14;
  }
  return 2;
}
function Pg(a2, b2) {
  var c2 = a2.alternate;
  null === c2 ? (c2 = Bg(a2.tag, b2, a2.key, a2.mode), c2.elementType = a2.elementType, c2.type = a2.type, c2.stateNode = a2.stateNode, c2.alternate = a2, a2.alternate = c2) : (c2.pendingProps = b2, c2.type = a2.type, c2.flags = 0, c2.subtreeFlags = 0, c2.deletions = null);
  c2.flags = a2.flags & 14680064;
  c2.childLanes = a2.childLanes;
  c2.lanes = a2.lanes;
  c2.child = a2.child;
  c2.memoizedProps = a2.memoizedProps;
  c2.memoizedState = a2.memoizedState;
  c2.updateQueue = a2.updateQueue;
  b2 = a2.dependencies;
  c2.dependencies = null === b2 ? null : { lanes: b2.lanes, firstContext: b2.firstContext };
  c2.sibling = a2.sibling;
  c2.index = a2.index;
  c2.ref = a2.ref;
  return c2;
}
function Rg(a2, b2, c2, d2, e2, f2) {
  var g2 = 2;
  d2 = a2;
  if ("function" === typeof a2) aj(a2) && (g2 = 1);
  else if ("string" === typeof a2) g2 = 5;
  else a: switch (a2) {
    case ya:
      return Tg(c2.children, e2, f2, b2);
    case za:
      g2 = 8;
      e2 |= 8;
      break;
    case Aa:
      return a2 = Bg(12, c2, b2, e2 | 2), a2.elementType = Aa, a2.lanes = f2, a2;
    case Ea:
      return a2 = Bg(13, c2, b2, e2), a2.elementType = Ea, a2.lanes = f2, a2;
    case Fa:
      return a2 = Bg(19, c2, b2, e2), a2.elementType = Fa, a2.lanes = f2, a2;
    case Ia:
      return pj(c2, e2, f2, b2);
    default:
      if ("object" === typeof a2 && null !== a2) switch (a2.$$typeof) {
        case Ba:
          g2 = 10;
          break a;
        case Ca:
          g2 = 9;
          break a;
        case Da:
          g2 = 11;
          break a;
        case Ga:
          g2 = 14;
          break a;
        case Ha:
          g2 = 16;
          d2 = null;
          break a;
      }
      throw Error(p$1(130, null == a2 ? a2 : typeof a2, ""));
  }
  b2 = Bg(g2, c2, b2, e2);
  b2.elementType = a2;
  b2.type = d2;
  b2.lanes = f2;
  return b2;
}
function Tg(a2, b2, c2, d2) {
  a2 = Bg(7, a2, d2, b2);
  a2.lanes = c2;
  return a2;
}
function pj(a2, b2, c2, d2) {
  a2 = Bg(22, a2, d2, b2);
  a2.elementType = Ia;
  a2.lanes = c2;
  a2.stateNode = { isHidden: false };
  return a2;
}
function Qg(a2, b2, c2) {
  a2 = Bg(6, a2, null, b2);
  a2.lanes = c2;
  return a2;
}
function Sg(a2, b2, c2) {
  b2 = Bg(4, null !== a2.children ? a2.children : [], a2.key, b2);
  b2.lanes = c2;
  b2.stateNode = { containerInfo: a2.containerInfo, pendingChildren: null, implementation: a2.implementation };
  return b2;
}
function al(a2, b2, c2, d2, e2) {
  this.tag = b2;
  this.containerInfo = a2;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d2;
  this.onRecoverableError = e2;
  this.mutableSourceEagerHydrationData = null;
}
function bl(a2, b2, c2, d2, e2, f2, g2, h2, k2) {
  a2 = new al(a2, b2, c2, h2, k2);
  1 === b2 ? (b2 = 1, true === f2 && (b2 |= 8)) : b2 = 0;
  f2 = Bg(3, null, null, b2);
  a2.current = f2;
  f2.stateNode = a2;
  f2.memoizedState = { element: d2, isDehydrated: c2, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  kh(f2);
  return a2;
}
function cl(a2, b2, c2) {
  var d2 = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa, key: null == d2 ? null : "" + d2, children: a2, containerInfo: b2, implementation: c2 };
}
function dl(a2) {
  if (!a2) return Vf;
  a2 = a2._reactInternals;
  a: {
    if (Vb(a2) !== a2 || 1 !== a2.tag) throw Error(p$1(170));
    var b2 = a2;
    do {
      switch (b2.tag) {
        case 3:
          b2 = b2.stateNode.context;
          break a;
        case 1:
          if (Zf(b2.type)) {
            b2 = b2.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b2 = b2.return;
    } while (null !== b2);
    throw Error(p$1(171));
  }
  if (1 === a2.tag) {
    var c2 = a2.type;
    if (Zf(c2)) return bg(a2, c2, b2);
  }
  return b2;
}
function el(a2, b2, c2, d2, e2, f2, g2, h2, k2) {
  a2 = bl(c2, d2, true, a2, e2, f2, g2, h2, k2);
  a2.context = dl(null);
  c2 = a2.current;
  d2 = R();
  e2 = yi(c2);
  f2 = mh(d2, e2);
  f2.callback = void 0 !== b2 && null !== b2 ? b2 : null;
  nh(c2, f2, e2);
  a2.current.lanes = e2;
  Ac(a2, e2, d2);
  Dk(a2, d2);
  return a2;
}
function fl(a2, b2, c2, d2) {
  var e2 = b2.current, f2 = R(), g2 = yi(e2);
  c2 = dl(c2);
  null === b2.context ? b2.context = c2 : b2.pendingContext = c2;
  b2 = mh(f2, g2);
  b2.payload = { element: a2 };
  d2 = void 0 === d2 ? null : d2;
  null !== d2 && (b2.callback = d2);
  a2 = nh(e2, b2, g2);
  null !== a2 && (gi(a2, e2, g2, f2), oh(a2, e2, g2));
  return g2;
}
function gl(a2) {
  a2 = a2.current;
  if (!a2.child) return null;
  switch (a2.child.tag) {
    case 5:
      return a2.child.stateNode;
    default:
      return a2.child.stateNode;
  }
}
function hl(a2, b2) {
  a2 = a2.memoizedState;
  if (null !== a2 && null !== a2.dehydrated) {
    var c2 = a2.retryLane;
    a2.retryLane = 0 !== c2 && c2 < b2 ? c2 : b2;
  }
}
function il(a2, b2) {
  hl(a2, b2);
  (a2 = a2.alternate) && hl(a2, b2);
}
function jl() {
  return null;
}
var kl = "function" === typeof reportError ? reportError : function(a2) {
  console.error(a2);
};
function ll(a2) {
  this._internalRoot = a2;
}
ml.prototype.render = ll.prototype.render = function(a2) {
  var b2 = this._internalRoot;
  if (null === b2) throw Error(p$1(409));
  fl(a2, b2, null, null);
};
ml.prototype.unmount = ll.prototype.unmount = function() {
  var a2 = this._internalRoot;
  if (null !== a2) {
    this._internalRoot = null;
    var b2 = a2.containerInfo;
    Rk(function() {
      fl(null, a2, null, null);
    });
    b2[uf] = null;
  }
};
function ml(a2) {
  this._internalRoot = a2;
}
ml.prototype.unstable_scheduleHydration = function(a2) {
  if (a2) {
    var b2 = Hc();
    a2 = { blockedOn: null, target: a2, priority: b2 };
    for (var c2 = 0; c2 < Qc.length && 0 !== b2 && b2 < Qc[c2].priority; c2++) ;
    Qc.splice(c2, 0, a2);
    0 === c2 && Vc(a2);
  }
};
function nl(a2) {
  return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType);
}
function ol(a2) {
  return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType && (8 !== a2.nodeType || " react-mount-point-unstable " !== a2.nodeValue));
}
function pl() {
}
function ql(a2, b2, c2, d2, e2) {
  if (e2) {
    if ("function" === typeof d2) {
      var f2 = d2;
      d2 = function() {
        var a3 = gl(g2);
        f2.call(a3);
      };
    }
    var g2 = el(b2, d2, a2, 0, null, false, false, "", pl);
    a2._reactRootContainer = g2;
    a2[uf] = g2.current;
    sf(8 === a2.nodeType ? a2.parentNode : a2);
    Rk();
    return g2;
  }
  for (; e2 = a2.lastChild; ) a2.removeChild(e2);
  if ("function" === typeof d2) {
    var h2 = d2;
    d2 = function() {
      var a3 = gl(k2);
      h2.call(a3);
    };
  }
  var k2 = bl(a2, 0, false, null, null, false, false, "", pl);
  a2._reactRootContainer = k2;
  a2[uf] = k2.current;
  sf(8 === a2.nodeType ? a2.parentNode : a2);
  Rk(function() {
    fl(b2, k2, c2, d2);
  });
  return k2;
}
function rl(a2, b2, c2, d2, e2) {
  var f2 = c2._reactRootContainer;
  if (f2) {
    var g2 = f2;
    if ("function" === typeof e2) {
      var h2 = e2;
      e2 = function() {
        var a3 = gl(g2);
        h2.call(a3);
      };
    }
    fl(b2, g2, a2, e2);
  } else g2 = ql(c2, b2, a2, e2, d2);
  return gl(g2);
}
Ec = function(a2) {
  switch (a2.tag) {
    case 3:
      var b2 = a2.stateNode;
      if (b2.current.memoizedState.isDehydrated) {
        var c2 = tc(b2.pendingLanes);
        0 !== c2 && (Cc(b2, c2 | 1), Dk(b2, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
      }
      break;
    case 13:
      Rk(function() {
        var b3 = ih(a2, 1);
        if (null !== b3) {
          var c3 = R();
          gi(b3, a2, 1, c3);
        }
      }), il(a2, 1);
  }
};
Fc = function(a2) {
  if (13 === a2.tag) {
    var b2 = ih(a2, 134217728);
    if (null !== b2) {
      var c2 = R();
      gi(b2, a2, 134217728, c2);
    }
    il(a2, 134217728);
  }
};
Gc = function(a2) {
  if (13 === a2.tag) {
    var b2 = yi(a2), c2 = ih(a2, b2);
    if (null !== c2) {
      var d2 = R();
      gi(c2, a2, b2, d2);
    }
    il(a2, b2);
  }
};
Hc = function() {
  return C;
};
Ic = function(a2, b2) {
  var c2 = C;
  try {
    return C = a2, b2();
  } finally {
    C = c2;
  }
};
yb = function(a2, b2, c2) {
  switch (b2) {
    case "input":
      bb(a2, c2);
      b2 = c2.name;
      if ("radio" === c2.type && null != b2) {
        for (c2 = a2; c2.parentNode; ) c2 = c2.parentNode;
        c2 = c2.querySelectorAll("input[name=" + JSON.stringify("" + b2) + '][type="radio"]');
        for (b2 = 0; b2 < c2.length; b2++) {
          var d2 = c2[b2];
          if (d2 !== a2 && d2.form === a2.form) {
            var e2 = Db(d2);
            if (!e2) throw Error(p$1(90));
            Wa(d2);
            bb(d2, e2);
          }
        }
      }
      break;
    case "textarea":
      ib(a2, c2);
      break;
    case "select":
      b2 = c2.value, null != b2 && fb(a2, !!c2.multiple, b2, false);
  }
};
Gb = Qk;
Hb = Rk;
var sl = { usingClientEntryPoint: false, Events: [Cb, ue$1, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a2) {
  a2 = Zb(a2);
  return null === a2 ? null : a2.stateNode;
}, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl.isDisabled && vl.supportsFiber) try {
    kc = vl.inject(ul), lc = vl;
  } catch (a2) {
  }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
reactDom_production_min.createPortal = function(a2, b2) {
  var c2 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!nl(b2)) throw Error(p$1(200));
  return cl(a2, b2, null, c2);
};
reactDom_production_min.createRoot = function(a2, b2) {
  if (!nl(a2)) throw Error(p$1(299));
  var c2 = false, d2 = "", e2 = kl;
  null !== b2 && void 0 !== b2 && (true === b2.unstable_strictMode && (c2 = true), void 0 !== b2.identifierPrefix && (d2 = b2.identifierPrefix), void 0 !== b2.onRecoverableError && (e2 = b2.onRecoverableError));
  b2 = bl(a2, 1, false, null, null, c2, false, d2, e2);
  a2[uf] = b2.current;
  sf(8 === a2.nodeType ? a2.parentNode : a2);
  return new ll(b2);
};
reactDom_production_min.findDOMNode = function(a2) {
  if (null == a2) return null;
  if (1 === a2.nodeType) return a2;
  var b2 = a2._reactInternals;
  if (void 0 === b2) {
    if ("function" === typeof a2.render) throw Error(p$1(188));
    a2 = Object.keys(a2).join(",");
    throw Error(p$1(268, a2));
  }
  a2 = Zb(b2);
  a2 = null === a2 ? null : a2.stateNode;
  return a2;
};
reactDom_production_min.flushSync = function(a2) {
  return Rk(a2);
};
reactDom_production_min.hydrate = function(a2, b2, c2) {
  if (!ol(b2)) throw Error(p$1(200));
  return rl(null, a2, b2, true, c2);
};
reactDom_production_min.hydrateRoot = function(a2, b2, c2) {
  if (!nl(a2)) throw Error(p$1(405));
  var d2 = null != c2 && c2.hydratedSources || null, e2 = false, f2 = "", g2 = kl;
  null !== c2 && void 0 !== c2 && (true === c2.unstable_strictMode && (e2 = true), void 0 !== c2.identifierPrefix && (f2 = c2.identifierPrefix), void 0 !== c2.onRecoverableError && (g2 = c2.onRecoverableError));
  b2 = el(b2, null, a2, 1, null != c2 ? c2 : null, e2, false, f2, g2);
  a2[uf] = b2.current;
  sf(a2);
  if (d2) for (a2 = 0; a2 < d2.length; a2++) c2 = d2[a2], e2 = c2._getVersion, e2 = e2(c2._source), null == b2.mutableSourceEagerHydrationData ? b2.mutableSourceEagerHydrationData = [c2, e2] : b2.mutableSourceEagerHydrationData.push(
    c2,
    e2
  );
  return new ml(b2);
};
reactDom_production_min.render = function(a2, b2, c2) {
  if (!ol(b2)) throw Error(p$1(200));
  return rl(null, a2, b2, false, c2);
};
reactDom_production_min.unmountComponentAtNode = function(a2) {
  if (!ol(a2)) throw Error(p$1(40));
  return a2._reactRootContainer ? (Rk(function() {
    rl(null, null, a2, false, function() {
      a2._reactRootContainer = null;
      a2[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Qk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a2, b2, c2, d2) {
  if (!ol(c2)) throw Error(p$1(200));
  if (null == a2 || void 0 === a2._reactInternals) throw Error(p$1(38));
  return rl(a2, b2, c2, false, d2);
};
reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var reactDomExports = reactDom.exports;
var createRoot;
var m$1 = reactDomExports;
{
  createRoot = m$1.createRoot;
  m$1.hydrateRoot;
}
/**
 * @remix-run/router v1.21.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$2() {
  _extends$2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$2.apply(this, arguments);
}
var Action;
(function(Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
const PopStateEventType = "popstate";
function createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createBrowserLocation(window2, globalHistory) {
    let {
      pathname,
      search,
      hash
    } = window2.location;
    return createLocation(
      "",
      {
        pathname,
        search,
        hash
      },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createBrowserHref(window2, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
function invariant(value2, message) {
  if (value2 === false || value2 === null || typeof value2 === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);
    try {
      throw new Error(message);
    } catch (e2) {
    }
  }
}
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
function getHistoryState(location2, index) {
  return {
    usr: location2.state,
    key: location2.key,
    idx: index
  };
}
function createLocation(current, to, state, key) {
  if (state === void 0) {
    state = null;
  }
  let location2 = _extends$2({
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to === "string" ? parsePath(to) : to, {
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  });
  return location2;
}
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  if (options === void 0) {
    options = {};
  }
  let {
    window: window2 = document.defaultView,
    v5Compat = false
  } = options;
  let globalHistory = window2.history;
  let action = Action.Pop;
  let listener = null;
  let index = getIndex();
  if (index == null) {
    index = 0;
    globalHistory.replaceState(_extends$2({}, globalHistory.state, {
      idx: index
    }), "");
  }
  function getIndex() {
    let state = globalHistory.state || {
      idx: null
    };
    return state.idx;
  }
  function handlePop() {
    action = Action.Pop;
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex;
    if (listener) {
      listener({
        action,
        location: history.location,
        delta
      });
    }
  }
  function push(to, state) {
    action = Action.Push;
    let location2 = createLocation(history.location, to, state);
    index = getIndex() + 1;
    let historyState = getHistoryState(location2, index);
    let url2 = history.createHref(location2);
    try {
      globalHistory.pushState(historyState, "", url2);
    } catch (error) {
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      window2.location.assign(url2);
    }
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 1
      });
    }
  }
  function replace(to, state) {
    action = Action.Replace;
    let location2 = createLocation(history.location, to, state);
    index = getIndex();
    let historyState = getHistoryState(location2, index);
    let url2 = history.createHref(location2);
    globalHistory.replaceState(historyState, "", url2);
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 0
      });
    }
  }
  function createURL(to) {
    let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href;
    let href = typeof to === "string" ? to : createPath(to);
    href = href.replace(/ $/, "%20");
    invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
    return new URL(href, base);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window2.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window2.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url2 = createURL(to);
      return {
        pathname: url2.pathname,
        search: url2.search,
        hash: url2.hash
      };
    },
    push,
    replace,
    go(n2) {
      return globalHistory.go(n2);
    }
  };
  return history;
}
var ResultType;
(function(ResultType2) {
  ResultType2["data"] = "data";
  ResultType2["deferred"] = "deferred";
  ResultType2["redirect"] = "redirect";
  ResultType2["error"] = "error";
})(ResultType || (ResultType = {}));
function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }
  return matchRoutesImpl(routes, locationArg, basename, false);
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
  let location2 = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location2.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i2 = 0; matches == null && i2 < branches.length; ++i2) {
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(branches[i2], decoded, allowPartial);
  }
  return matches;
}
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  let flattenRoute = (route, index, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant(meta.relativePath.startsWith(parentPath), 'Absolute route path "' + meta.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.");
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')
      );
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes.forEach((route, index) => {
    var _route$path;
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/")));
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
  branches.sort((a2, b2) => a2.score !== b2.score ? b2.score - a2.score : compareIndexes(a2.routesMeta.map((meta) => meta.childrenIndex), b2.routesMeta.map((meta) => meta.childrenIndex)));
}
const paramRe = /^:[\w-]+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;
const isSplat = (s2) => s2 === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s2) => !isSplat(s2)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a2, b2) {
  let siblings = a2.length === b2.length && a2.slice(0, -1).every((n2, i2) => n2 === b2[i2]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a2[a2.length - 1] - b2[b2.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname, allowPartial) {
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i2 = 0; i2 < routesMeta.length; ++i2) {
    let meta = routesMeta[i2];
    let end = i2 === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    let route = meta.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath({
        path: meta.relativePath,
        caseSensitive: meta.caseSensitive,
        end: false
      }, remainingPathname);
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce((memo, _ref, index) => {
    let {
      paramName,
      isOptional
    } = _ref;
    if (paramName === "*") {
      let splatValue = captureGroups[index] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    const value2 = captureGroups[index];
    if (isOptional && !value2) {
      memo[paramName] = void 0;
    } else {
      memo[paramName] = (value2 || "").replace(/%2F/g, "/");
    }
    return memo;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (_2, paramName, isOptional) => {
    params.push({
      paramName,
      isOptional: isOptional != null
    });
    return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
  });
  if (path.endsWith("*")) {
    params.push({
      paramName: "*"
    });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function decodePath(value2) {
  try {
    return value2.split("/").map((v2) => decodeURIComponent(v2).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(false, 'The URL path "' + value2 + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ")."));
    return value2;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function getPathContributingMatches(matches) {
  return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
function getResolveToMatches(matches, v7_relativeSplatPath) {
  let pathMatches = getPathContributingMatches(matches);
  if (v7_relativeSplatPath) {
    return pathMatches.map((match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase);
  }
  return pathMatches.map((match) => match.pathnameBase);
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = _extends$2({}, toArg);
    invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
const joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
const normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
const normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
const normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
const validMutationMethodsArr = ["post", "put", "patch", "delete"];
new Set(validMutationMethodsArr);
const validRequestMethodsArr = ["get", ...validMutationMethodsArr];
new Set(validRequestMethodsArr);
/**
 * React Router v6.28.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
const DataRouterContext = /* @__PURE__ */ reactExports.createContext(null);
const DataRouterStateContext = /* @__PURE__ */ reactExports.createContext(null);
const NavigationContext = /* @__PURE__ */ reactExports.createContext(null);
const LocationContext = /* @__PURE__ */ reactExports.createContext(null);
const RouteContext = /* @__PURE__ */ reactExports.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
const RouteErrorContext = /* @__PURE__ */ reactExports.createContext(null);
function useHref(to, _temp) {
  let {
    relative
  } = _temp === void 0 ? {} : _temp;
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    basename,
    navigator: navigator2
  } = reactExports.useContext(NavigationContext);
  let {
    hash,
    pathname,
    search
  } = useResolvedPath(to, {
    relative
  });
  let joinedPathname = pathname;
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator2.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}
function useInRouterContext() {
  return reactExports.useContext(LocationContext) != null;
}
function useLocation() {
  !useInRouterContext() ? invariant(false) : void 0;
  return reactExports.useContext(LocationContext).location;
}
function useIsomorphicLayoutEffect(cb2) {
  let isStatic = reactExports.useContext(NavigationContext).static;
  if (!isStatic) {
    reactExports.useLayoutEffect(cb2);
  }
}
function useNavigate() {
  let {
    isDataRoute
  } = reactExports.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  !useInRouterContext() ? invariant(false) : void 0;
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  let {
    basename,
    future,
    navigator: navigator2
  } = reactExports.useContext(NavigationContext);
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    if (!activeRef.current) return;
    if (typeof to === "number") {
      navigator2.go(to);
      return;
    }
    let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
    if (dataRouterContext == null && basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
    }
    (!!options.replace ? navigator2.replace : navigator2.push)(path, options.state, options);
  }, [basename, navigator2, routePathnamesJson, locationPathname, dataRouterContext]);
  return navigate;
}
function useResolvedPath(to, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    future
  } = reactExports.useContext(NavigationContext);
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
  return reactExports.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to, routePathnamesJson, locationPathname, relative]);
}
function useRoutes(routes, locationArg) {
  return useRoutesImpl(routes, locationArg);
}
function useRoutesImpl(routes, locationArg, dataRouterState, future) {
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    navigator: navigator2
  } = reactExports.useContext(NavigationContext);
  let {
    matches: parentMatches
  } = reactExports.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  routeMatch && routeMatch.route;
  let locationFromContext = useLocation();
  let location2;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? invariant(false) : void 0;
    location2 = parsedLocationArg;
  } else {
    location2 = locationFromContext;
  }
  let pathname = location2.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = matchRoutes(routes, {
    pathname: remainingPathname
  });
  let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator2.encodeLocation ? navigator2.encodeLocation(match.pathname).pathname : match.pathname
    ]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator2.encodeLocation ? navigator2.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
    ])
  })), parentMatches, dataRouterState, future);
  if (locationArg && renderedMatches) {
    return /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, {
      value: {
        location: _extends$1({
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default"
        }, location2),
        navigationType: Action.Pop
      }
    }, renderedMatches);
  }
  return renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  };
  let devInfo = null;
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ reactExports.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /* @__PURE__ */ reactExports.createElement("pre", {
    style: preStyles
  }, stack) : null, devInfo);
}
const defaultErrorElement = /* @__PURE__ */ reactExports.createElement(DefaultErrorComponent, null);
class RenderErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("React Router caught the following error during render", error, errorInfo);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ reactExports.createElement(RouteErrorContext.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function RenderedRoute(_ref) {
  let {
    routeContext,
    match,
    children
  } = _ref;
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}
function _renderMatches(matches, parentMatches, dataRouterState, future) {
  var _dataRouterState;
  if (parentMatches === void 0) {
    parentMatches = [];
  }
  if (dataRouterState === void 0) {
    dataRouterState = null;
  }
  if (future === void 0) {
    future = null;
  }
  if (matches == null) {
    var _future;
    if (!dataRouterState) {
      return null;
    }
    if (dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else if ((_future = future) != null && _future.v7_partialHydration && parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = (_dataRouterState = dataRouterState) == null ? void 0 : _dataRouterState.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex((m2) => m2.route.id && (errors == null ? void 0 : errors[m2.route.id]) !== void 0);
    !(errorIndex >= 0) ? invariant(false) : void 0;
    renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterState && future && future.v7_partialHydration) {
    for (let i2 = 0; i2 < renderedMatches.length; i2++) {
      let match = renderedMatches[i2];
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i2;
      }
      if (match.route.id) {
        let {
          loaderData,
          errors: errors2
        } = dataRouterState;
        let needsToRunLoader = match.route.loader && loaderData[match.route.id] === void 0 && (!errors2 || errors2[match.route.id] === void 0);
        if (match.route.lazy || needsToRunLoader) {
          renderFallback = true;
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  return renderedMatches.reduceRight((outlet, match, index) => {
    let error;
    let shouldRenderHydrateFallback = false;
    let errorElement = null;
    let hydrateFallbackElement = null;
    if (dataRouterState) {
      error = errors && match.route.id ? errors[match.route.id] : void 0;
      errorElement = match.route.errorElement || defaultErrorElement;
      if (renderFallback) {
        if (fallbackIndex < 0 && index === 0) {
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = null;
        } else if (fallbackIndex === index) {
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = match.route.hydrateFallbackElement || null;
        }
      }
    }
    let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
    let getChildren = () => {
      let children;
      if (error) {
        children = errorElement;
      } else if (shouldRenderHydrateFallback) {
        children = hydrateFallbackElement;
      } else if (match.route.Component) {
        children = /* @__PURE__ */ reactExports.createElement(match.route.Component, null);
      } else if (match.route.element) {
        children = match.route.element;
      } else {
        children = outlet;
      }
      return /* @__PURE__ */ reactExports.createElement(RenderedRoute, {
        match,
        routeContext: {
          outlet,
          matches: matches2,
          isDataRoute: dataRouterState != null
        },
        children
      });
    };
    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ reactExports.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      revalidation: dataRouterState.revalidation,
      component: errorElement,
      error,
      children: getChildren(),
      routeContext: {
        outlet: null,
        matches: matches2,
        isDataRoute: true
      }
    }) : getChildren();
  }, null);
}
var DataRouterHook$1 = /* @__PURE__ */ function(DataRouterHook2) {
  DataRouterHook2["UseBlocker"] = "useBlocker";
  DataRouterHook2["UseRevalidator"] = "useRevalidator";
  DataRouterHook2["UseNavigateStable"] = "useNavigate";
  return DataRouterHook2;
}(DataRouterHook$1 || {});
var DataRouterStateHook$1 = /* @__PURE__ */ function(DataRouterStateHook2) {
  DataRouterStateHook2["UseBlocker"] = "useBlocker";
  DataRouterStateHook2["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook2["UseActionData"] = "useActionData";
  DataRouterStateHook2["UseRouteError"] = "useRouteError";
  DataRouterStateHook2["UseNavigation"] = "useNavigation";
  DataRouterStateHook2["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook2["UseMatches"] = "useMatches";
  DataRouterStateHook2["UseRevalidator"] = "useRevalidator";
  DataRouterStateHook2["UseNavigateStable"] = "useNavigate";
  DataRouterStateHook2["UseRouteId"] = "useRouteId";
  return DataRouterStateHook2;
}(DataRouterStateHook$1 || {});
function useDataRouterContext(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  !ctx ? invariant(false) : void 0;
  return ctx;
}
function useDataRouterState(hookName) {
  let state = reactExports.useContext(DataRouterStateContext);
  !state ? invariant(false) : void 0;
  return state;
}
function useRouteContext(hookName) {
  let route = reactExports.useContext(RouteContext);
  !route ? invariant(false) : void 0;
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext();
  let thisRoute = route.matches[route.matches.length - 1];
  !thisRoute.route.id ? invariant(false) : void 0;
  return thisRoute.route.id;
}
function useRouteError() {
  var _state$errors;
  let error = reactExports.useContext(RouteErrorContext);
  let state = useDataRouterState(DataRouterStateHook$1.UseRouteError);
  let routeId = useCurrentRouteId(DataRouterStateHook$1.UseRouteError);
  if (error !== void 0) {
    return error;
  }
  return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
}
function useNavigateStable() {
  let {
    router
  } = useDataRouterContext(DataRouterHook$1.UseNavigateStable);
  let id2 = useCurrentRouteId(DataRouterStateHook$1.UseNavigateStable);
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    if (!activeRef.current) return;
    if (typeof to === "number") {
      router.navigate(to);
    } else {
      router.navigate(to, _extends$1({
        fromRouteId: id2
      }, options));
    }
  }, [router, id2]);
  return navigate;
}
const alreadyWarned = {};
function warnOnce(key, message) {
  if (!alreadyWarned[message]) {
    alreadyWarned[message] = true;
    console.warn(message);
  }
}
const logDeprecation = (flag, msg, link) => warnOnce(flag, "⚠️ React Router Future Flag Warning: " + msg + ". " + ("You can use the `" + flag + "` future flag to opt-in early. ") + ("For more information, see " + link + "."));
function logV6DeprecationWarnings(renderFuture, routerFuture) {
  if (!(renderFuture != null && renderFuture.v7_startTransition)) {
    logDeprecation("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition");
  }
  if (!(renderFuture != null && renderFuture.v7_relativeSplatPath) && !routerFuture) {
    logDeprecation("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
  }
}
function Navigate(_ref4) {
  let {
    to,
    replace: replace2,
    state,
    relative
  } = _ref4;
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    future,
    static: isStatic
  } = reactExports.useContext(NavigationContext);
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let navigate = useNavigate();
  let path = resolveTo(to, getResolveToMatches(matches, future.v7_relativeSplatPath), locationPathname, relative === "path");
  let jsonPath = JSON.stringify(path);
  reactExports.useEffect(() => navigate(JSON.parse(jsonPath), {
    replace: replace2,
    state,
    relative
  }), [navigate, jsonPath, relative, replace2, state]);
  return null;
}
function Route(_props) {
  invariant(false);
}
function Router(_ref5) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action.Pop,
    navigator: navigator2,
    static: staticProp = false,
    future
  } = _ref5;
  !!useInRouterContext() ? invariant(false) : void 0;
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = reactExports.useMemo(() => ({
    basename,
    navigator: navigator2,
    static: staticProp,
    future: _extends$1({
      v7_relativeSplatPath: false
    }, future)
  }), [basename, future, navigator2, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let locationContext = reactExports.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, {
    children,
    value: locationContext
  }));
}
function Routes(_ref6) {
  let {
    children,
    location: location2
  } = _ref6;
  return useRoutes(createRoutesFromChildren(children), location2);
}
new Promise(() => {
});
function createRoutesFromChildren(children, parentPath) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  let routes = [];
  reactExports.Children.forEach(children, (element, index) => {
    if (!/* @__PURE__ */ reactExports.isValidElement(element)) {
      return;
    }
    let treePath = [...parentPath, index];
    if (element.type === reactExports.Fragment) {
      routes.push.apply(routes, createRoutesFromChildren(element.props.children, treePath));
      return;
    }
    !(element.type === Route) ? invariant(false) : void 0;
    !(!element.props.index || !element.props.children) ? invariant(false) : void 0;
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children, treePath);
    }
    routes.push(route);
  });
  return routes;
}
/**
 * React Router DOM v6.28.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key = sourceKeys[i2];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
const _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"];
const REACT_ROUTER_VERSION = "6";
try {
  window.__reactRouterVersion = REACT_ROUTER_VERSION;
} catch (e2) {
}
const START_TRANSITION = "startTransition";
const startTransitionImpl = React$1[START_TRANSITION];
function BrowserRouter(_ref4) {
  let {
    basename,
    children,
    future,
    window: window2
  } = _ref4;
  let historyRef = reactExports.useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({
      window: window2,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = reactExports.useState({
    action: history.action,
    location: history.location
  });
  let {
    v7_startTransition
  } = future || {};
  let setState = reactExports.useCallback((newState) => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  reactExports.useLayoutEffect(() => history.listen(setState), [history, setState]);
  reactExports.useEffect(() => logV6DeprecationWarnings(future), [future]);
  return /* @__PURE__ */ reactExports.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history,
    future
  });
}
const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const Link = /* @__PURE__ */ reactExports.forwardRef(function LinkWithRef(_ref7, ref) {
  let {
    onClick,
    relative,
    reloadDocument,
    replace: replace2,
    state,
    target,
    to,
    preventScrollReset,
    viewTransition
  } = _ref7, rest = _objectWithoutPropertiesLoose(_ref7, _excluded);
  let {
    basename
  } = reactExports.useContext(NavigationContext);
  let absoluteHref;
  let isExternal = false;
  if (typeof to === "string" && ABSOLUTE_URL_REGEX.test(to)) {
    absoluteHref = to;
    if (isBrowser) {
      try {
        let currentUrl = new URL(window.location.href);
        let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
        let path = stripBasename(targetUrl.pathname, basename);
        if (targetUrl.origin === currentUrl.origin && path != null) {
          to = path + targetUrl.search + targetUrl.hash;
        } else {
          isExternal = true;
        }
      } catch (e2) {
      }
    }
  }
  let href = useHref(to, {
    relative
  });
  let internalOnClick = useLinkClickHandler(to, {
    replace: replace2,
    state,
    target,
    preventScrollReset,
    relative,
    viewTransition
  });
  function handleClick(event) {
    if (onClick) onClick(event);
    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ reactExports.createElement("a", _extends({}, rest, {
      href: absoluteHref || href,
      onClick: isExternal || reloadDocument ? onClick : handleClick,
      ref,
      target
    }))
  );
});
var DataRouterHook;
(function(DataRouterHook2) {
  DataRouterHook2["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook2["UseSubmit"] = "useSubmit";
  DataRouterHook2["UseSubmitFetcher"] = "useSubmitFetcher";
  DataRouterHook2["UseFetcher"] = "useFetcher";
  DataRouterHook2["useViewTransitionState"] = "useViewTransitionState";
})(DataRouterHook || (DataRouterHook = {}));
var DataRouterStateHook;
(function(DataRouterStateHook2) {
  DataRouterStateHook2["UseFetcher"] = "useFetcher";
  DataRouterStateHook2["UseFetchers"] = "useFetchers";
  DataRouterStateHook2["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook || (DataRouterStateHook = {}));
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative,
    viewTransition
  } = _temp === void 0 ? {} : _temp;
  let navigate = useNavigate();
  let location2 = useLocation();
  let path = useResolvedPath(to, {
    relative
  });
  return reactExports.useCallback((event) => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault();
      let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location2) === createPath(path);
      navigate(to, {
        replace: replace2,
        state,
        preventScrollReset,
        relative,
        viewTransition
      });
    }
  }, [location2, navigate, path, replaceProp, state, target, to, preventScrollReset, relative, viewTransition]);
}
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
const identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = React.useSyncExternalStore(
    api.subscribe,
    () => selector(api.getState()),
    () => selector(api.getInitialState())
  );
  React.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
const { toString: toString$1 } = Object.prototype;
const { getPrototypeOf } = Object;
const kindOf = /* @__PURE__ */ ((cache2) => (thing) => {
  const str = toString$1.call(thing);
  return cache2[str] || (cache2[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
const typeOfTest = (type) => (thing) => typeof thing === type;
const { isArray } = Array;
const isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
const isString = typeOfTest("string");
const isFunction = typeOfTest("function");
const isNumber = typeOfTest("number");
const isObject$1 = (thing) => thing !== null && typeof thing === "object";
const isBoolean = (thing) => thing === true || thing === false;
const isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};
const isDate = kindOfTest("Date");
const isFile = kindOfTest("File");
const isBlob = kindOfTest("Blob");
const isFileList = kindOfTest("FileList");
const isStream = (val) => isObject$1(val) && isFunction(val.pipe);
const isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
};
const isURLSearchParams = kindOfTest("URLSearchParams");
const [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i2;
  let l2;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i2 = 0, l2 = obj.length; i2 < l2; i2++) {
      fn.call(null, obj[i2], i2, obj);
    }
  } else {
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i2 = 0; i2 < len; i2++) {
      key = keys[i2];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i2 = keys.length;
  let _key;
  while (i2-- > 0) {
    _key = keys[i2];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
const _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
const isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
  const { caseless } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };
  for (let i2 = 0, l2 = arguments.length; i2 < l2; i2++) {
    arguments[i2] && forEach(arguments[i2], assignValue);
  }
  return result;
}
const extend = (a2, b2, thisArg, { allOwnKeys } = {}) => {
  forEach(b2, (val, key) => {
    if (thisArg && isFunction(val)) {
      a2[key] = bind(val, thisArg);
    } else {
      a2[key] = val;
    }
  }, { allOwnKeys });
  return a2;
};
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
const inherits = (constructor, superConstructor, props, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i2;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i2 = props.length;
    while (i2-- > 0) {
      prop = props[i2];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
const toArray$1 = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i2 = thing.length;
  if (!isNumber(i2)) return null;
  const arr = new Array(i2);
  while (i2-- > 0) {
    arr[i2] = thing[i2];
  }
  return arr;
};
const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];
  const iterator = generator.call(obj);
  let result;
  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str) => {
  return str.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function replacer(m2, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};
const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
const isRegExp = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors2, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value2 = obj[name];
    if (!isFunction(value2)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value2) => {
      obj[value2] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop = () => {
};
const toFiniteNumber = (value2, defaultValue) => {
  return value2 != null && Number.isFinite(value2 = +value2) ? value2 : defaultValue;
};
const ALPHA = "abcdefghijklmnopqrstuvwxyz";
const DIGIT = "0123456789";
const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};
const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = "";
  const { length } = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length | 0];
  }
  return str;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
}
const toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i2) => {
    if (isObject$1(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (!("toJSON" in source)) {
        stack[i2] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value2, key) => {
          const reducedValue = visit(value2, i2 + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i2] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing) => thing && (isObject$1(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({ source, data }) => {
      if (source === _global && data === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);
    return (cb2) => {
      callbacks.push(cb2);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb2) => setTimeout(cb2);
})(
  typeof setImmediate === "function",
  isFunction(_global.postMessage)
);
const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
const utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject: isObject$1,
  isPlainObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray: toArray$1,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap
};
function AxiosError(message, code, config, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
}
utils$1.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const prototype$1 = AxiosError.prototype;
const descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((code) => {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: true });
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);
  utils$1.toFlatObject(error, axiosError, function filter2(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  AxiosError.call(axiosError, error.message, code, config, request, response);
  axiosError.cause = error;
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
const httpAdapter = null;
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}
function removeBrackets(key) {
  return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i2) {
    token = removeBrackets(token);
    return !dots && i2 ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}
const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new FormData();
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils$1.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
  if (!utils$1.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value2) {
    if (value2 === null) return "";
    if (utils$1.isDate(value2)) {
      return value2.toISOString();
    }
    if (!useBlob && utils$1.isBlob(value2)) {
      throw new AxiosError("Blob is not supported. Use a Buffer instead.");
    }
    if (utils$1.isArrayBuffer(value2) || utils$1.isTypedArray(value2)) {
      return useBlob && typeof Blob === "function" ? new Blob([value2]) : Buffer.from(value2);
    }
    return value2;
  }
  function defaultVisitor(value2, key, path) {
    let arr = value2;
    if (value2 && !path && typeof value2 === "object") {
      if (utils$1.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value2 = JSON.stringify(value2);
      } else if (utils$1.isArray(value2) && isFlatArray(value2) || (utils$1.isFileList(value2) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value2))) {
        key = removeBrackets(key);
        arr.forEach(function each(el2, index) {
          !(utils$1.isUndefined(el2) || el2 === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el2)
          );
        });
        return false;
      }
    }
    if (isVisitable(value2)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value2));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value2, path) {
    if (utils$1.isUndefined(value2)) return;
    if (stack.indexOf(value2) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value2);
    utils$1.forEach(value2, function each(el2, key) {
      const result = !(utils$1.isUndefined(el2) || el2 === null) && visitor.call(
        formData,
        el2,
        utils$1.isString(key) ? key.trim() : key,
        path,
        exposedHelpers
      );
      if (result === true) {
        build(el2, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils$1.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$2(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value2) {
  this._pairs.push([name, value2]);
};
prototype.toString = function toString(encoder) {
  const _encode = encoder ? function(value2) {
    return encoder.call(this, value2, encode$2);
  } : encode$2;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode$1(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL(url2, params, options) {
  if (!params) {
    return url2;
  }
  const _encode = options && options.encode || encode$1;
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url2.indexOf("#");
    if (hashmarkIndex !== -1) {
      url2 = url2.slice(0, hashmarkIndex);
    }
    url2 += (url2.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url2;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id2) {
    if (this.handlers[id2]) {
      this.handlers[id2] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h2) {
      if (h2 !== null) {
        fn(h2);
      }
    });
  }
}
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
const platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
const _navigator = typeof navigator === "object" && navigator || void 0;
const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
const hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
const origin = hasBrowserEnv && window.location.href || "http://localhost";
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv,
  navigator: _navigator,
  origin
}, Symbol.toStringTag, { value: "Module" }));
const platform = {
  ...utils,
  ...platform$1
};
function toURLEncodedForm(data, options) {
  return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value2, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value2)) {
        this.append(key, value2.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}
function parsePropPath(name) {
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i2;
  const len = keys.length;
  let key;
  for (i2 = 0; i2 < len; i2++) {
    key = keys[i2];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value2, target, index) {
    let name = path[index++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value2];
      } else {
        target[name] = value2;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value2, target[name], index);
    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};
    utils$1.forEachEntry(formData, (name, value2) => {
      buildPath(parsePropPath(name), value2, obj, 0);
    });
    return obj;
  }
  return null;
}
function stringifySafely(rawValue, parser2, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser2 || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e2) {
      if (e2.name !== "SyntaxError") {
        throw e2;
      }
    }
  }
  return (0, JSON.stringify)(rawValue);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils$1.isObject(data);
    if (isObjectPayload && utils$1.isHTMLForm(data)) {
      data = new FormData(data);
    }
    const isFormData2 = utils$1.isFormData(data);
    if (isFormData2) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }
    if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (utils$1.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$1.isURLSearchParams(data)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }
      if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData(
          isFileList2 ? { "files[]": data } : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data);
      } catch (e2) {
        if (strictJSONParsing) {
          if (e2.name === "SyntaxError") {
            throw AxiosError.from(e2, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e2;
        }
      }
    }
    return data;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
const ignoreDuplicateOf = utils$1.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
const parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i2;
  rawHeaders && rawHeaders.split("\n").forEach(function parser2(line) {
    i2 = line.indexOf(":");
    key = line.substring(0, i2).trim().toLowerCase();
    val = line.substring(i2 + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
const $internals = Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value2) {
  if (value2 === false || value2 == null) {
    return value2;
  }
  return utils$1.isArray(value2) ? value2.map(normalizeValue) : String(value2);
}
function parseTokens(str) {
  const tokens2 = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens2[match[1]] = match[2];
  }
  return tokens2;
}
const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value2, header, filter2, isHeaderNameFilter) {
  if (utils$1.isFunction(filter2)) {
    return filter2.call(this, value2, header);
  }
  if (isHeaderNameFilter) {
    value2 = header;
  }
  if (!utils$1.isString(value2)) return;
  if (utils$1.isString(filter2)) {
    return value2.indexOf(filter2) !== -1;
  }
  if (utils$1.isRegExp(filter2)) {
    return filter2.test(value2);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w2, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils$1.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$1.isHeaders(header)) {
      for (const [key, value2] of header.entries()) {
        setHeader(value2, key, rewrite);
      }
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser2) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      if (key) {
        const value2 = this[key];
        if (!parser2) {
          return value2;
        }
        if (parser2 === true) {
          return parseTokens(value2);
        }
        if (utils$1.isFunction(parser2)) {
          return parser2.call(this, value2, key);
        }
        if (utils$1.isRegExp(parser2)) {
          return parser2.exec(value2);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils$1.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i2 = keys.length;
    let deleted = false;
    while (i2--) {
      const key = keys[i2];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers = {};
    utils$1.forEach(this, (value2, header) => {
      const key = utils$1.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value2);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value2);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils$1.forEach(this, (value2, header) => {
      value2 != null && value2 !== false && (obj[header] = asStrings && utils$1.isArray(value2) ? value2.join(", ") : value2);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value2]) => header + ": " + value2).join("\n");
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
}
AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils$1.reduceDescriptors(AxiosHeaders.prototype, ({ value: value2 }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value2,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils$1.freezeMethods(AxiosHeaders);
function transformData(fns, response) {
  const config = this || defaults;
  const context = response || config;
  const headers = AxiosHeaders.from(context.headers);
  let data = context.data;
  utils$1.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data;
}
function isCancel(value2) {
  return !!(value2 && value2.__CANCEL__);
}
function CanceledError(message, config, request) {
  AxiosError.call(this, message == null ? "canceled" : message, AxiosError.ERR_CANCELED, config, request);
  this.name = "CanceledError";
}
utils$1.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError(
      "Request failed with status code " + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}
function parseProtocol(url2) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url2);
  return match && match[1] || "";
}
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i2 = tail;
    let bytesCount = 0;
    while (i2 !== head) {
      bytesCount += bytes[i2++];
      i2 = i2 % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn.apply(null, args);
  };
  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return throttle((e2) => {
    const loaded = e2.loaded;
    const total = e2.lengthComputable ? e2.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e2,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data);
  }, freq);
};
const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
};
const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
const isURLSameOrigin = platform.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function standardBrowserEnv() {
    const msie = platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent);
    const urlParsingNode = document.createElement("a");
    let originURL;
    function resolveURL(url2) {
      let href = url2;
      if (msie) {
        urlParsingNode.setAttribute("href", href);
        href = urlParsingNode.href;
      }
      urlParsingNode.setAttribute("href", href);
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
      };
    }
    originURL = resolveURL(window.location.href);
    return function isURLSameOrigin2(requestURL) {
      const parsed = utils$1.isString(requestURL) ? resolveURL(requestURL) : requestURL;
      return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  /* @__PURE__ */ function nonStandardBrowserEnv() {
    return function isURLSameOrigin2() {
      return true;
    };
  }()
);
const cookies = platform.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value2, expires, path, domain, secure) {
      const cookie = [name + "=" + encodeURIComponent(value2)];
      utils$1.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
      utils$1.isString(path) && cookie.push("path=" + path);
      utils$1.isString(domain) && cookie.push("domain=" + domain);
      secure === true && cookie.push("secure");
      document.cookie = cookie.join("; ");
    },
    read(name) {
      const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function isAbsoluteURL(url2) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url2);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
const headersToObject = (thing) => thing instanceof AxiosHeaders ? { ...thing } : thing;
function mergeConfig(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({ caseless }, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a2, b2, caseless) {
    if (!utils$1.isUndefined(b2)) {
      return getMergedValue(a2, b2, caseless);
    } else if (!utils$1.isUndefined(a2)) {
      return getMergedValue(void 0, a2, caseless);
    }
  }
  function valueFromConfig2(a2, b2) {
    if (!utils$1.isUndefined(b2)) {
      return getMergedValue(void 0, b2);
    }
  }
  function defaultToConfig2(a2, b2) {
    if (!utils$1.isUndefined(b2)) {
      return getMergedValue(void 0, b2);
    } else if (!utils$1.isUndefined(a2)) {
      return getMergedValue(void 0, a2);
    }
  }
  function mergeDirectKeys(a2, b2, prop) {
    if (prop in config2) {
      return getMergedValue(a2, b2);
    } else if (prop in config1) {
      return getMergedValue(void 0, a2);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a2, b2) => mergeDeepProperties(headersToObject(a2), headersToObject(b2), true)
  };
  utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge2 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}
const resolveConfig = (config) => {
  const newConfig = mergeConfig({}, config);
  let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
  newConfig.headers = headers = AxiosHeaders.from(headers);
  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url), config.params, config.paramsSerializer);
  if (auth) {
    headers.set(
      "Authorization",
      "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
    );
  }
  let contentType;
  if (utils$1.isFormData(data)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(void 0);
    } else if ((contentType = headers.getContentType()) !== false) {
      const [type, ...tokens2] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
      headers.setContentType([type || "multipart/form-data", ...tokens2].join("; "));
    }
  }
  if (platform.hasStandardBrowserEnv) {
    withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
const xhrAdapter = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request = new XMLHttpRequest();
    request.open(_config.method.toUpperCase(), _config.url, true);
    request.timeout = _config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(function _resolve(value2) {
        resolve(value2);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config, request));
      request = null;
    };
    request.onerror = function handleError() {
      reject(new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request));
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new AxiosError(
        timeoutErrorMessage,
        transitional2.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        config,
        request
      ));
      request = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils$1.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
      request.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
      request.upload.addEventListener("progress", uploadThrottled);
      request.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol2 = parseProtocol(_config.url);
    if (protocol2 && platform.protocols.indexOf(protocol2) === -1) {
      reject(new AxiosError("Unsupported protocol " + protocol2 + ":", AxiosError.ERR_BAD_REQUEST, config));
      return;
    }
    request.send(requestData || null);
  });
};
const composeSignals = (signals, timeout) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout || length) {
    let controller = new AbortController();
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof AxiosError ? err : new CanceledError(err instanceof Error ? err.message : err));
      }
    };
    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError(`timeout ${timeout} of ms exceeded`, AxiosError.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils$1.asap(unsubscribe);
    return signal;
  }
};
const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }
  const reader = stream.getReader();
  try {
    for (; ; ) {
      const { done, value: value2 } = await reader.read();
      if (done) {
        break;
      }
      yield value2;
    }
  } finally {
    await reader.cancel();
  }
};
const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator = readBytes(stream, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e2) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e2);
    }
  };
  return new ReadableStream({
    async pull(controller) {
      try {
        const { done: done2, value: value2 } = await iterator.next();
        if (done2) {
          _onFinish();
          controller.close();
          return;
        }
        let len = value2.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value2));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator.return();
    }
  }, {
    highWaterMark: 2
  });
};
const isFetchSupported = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function";
const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === "function";
const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Response(str).arrayBuffer()));
const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e2) {
    return false;
  }
};
const supportsRequestStream = isReadableStreamSupported && test(() => {
  let duplexAccessed = false;
  const hasContentType = new Request(platform.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      duplexAccessed = true;
      return "half";
    }
  }).headers.has("Content-Type");
  return duplexAccessed && !hasContentType;
});
const DEFAULT_CHUNK_SIZE = 64 * 1024;
const supportsResponseStream = isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
const resolvers = {
  stream: supportsResponseStream && ((res) => res.body)
};
isFetchSupported && ((res) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
    !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? (res2) => res2[type]() : (_2, config) => {
      throw new AxiosError(`Response type '${type}' is not supported`, AxiosError.ERR_NOT_SUPPORT, config);
    });
  });
})(new Response());
const getBodyLength = async (body) => {
  if (body == null) {
    return 0;
  }
  if (utils$1.isBlob(body)) {
    return body.size;
  }
  if (utils$1.isSpecCompliantForm(body)) {
    const _request = new Request(platform.origin, {
      method: "POST",
      body
    });
    return (await _request.arrayBuffer()).byteLength;
  }
  if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
    return body.byteLength;
  }
  if (utils$1.isURLSearchParams(body)) {
    body = body + "";
  }
  if (utils$1.isString(body)) {
    return (await encodeText(body)).byteLength;
  }
};
const resolveBodyLength = async (headers, body) => {
  const length = utils$1.toFiniteNumber(headers.getContentLength());
  return length == null ? getBodyLength(body) : length;
};
const fetchAdapter = isFetchSupported && (async (config) => {
  let {
    url: url2,
    method,
    data,
    signal,
    cancelToken,
    timeout,
    onDownloadProgress,
    onUploadProgress,
    responseType,
    headers,
    withCredentials = "same-origin",
    fetchOptions
  } = resolveConfig(config);
  responseType = responseType ? (responseType + "").toLowerCase() : "text";
  let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
  let request;
  const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
    composedSignal.unsubscribe();
  });
  let requestContentLength;
  try {
    if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
      let _request = new Request(url2, {
        method: "POST",
        body: data,
        duplex: "half"
      });
      let contentTypeHeader;
      if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
        headers.setContentType(contentTypeHeader);
      }
      if (_request.body) {
        const [onProgress, flush] = progressEventDecorator(
          requestContentLength,
          progressEventReducer(asyncDecorator(onUploadProgress))
        );
        data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
      }
    }
    if (!utils$1.isString(withCredentials)) {
      withCredentials = withCredentials ? "include" : "omit";
    }
    const isCredentialsSupported = "credentials" in Request.prototype;
    request = new Request(url2, {
      ...fetchOptions,
      signal: composedSignal,
      method: method.toUpperCase(),
      headers: headers.normalize().toJSON(),
      body: data,
      duplex: "half",
      credentials: isCredentialsSupported ? withCredentials : void 0
    });
    let response = await fetch(request);
    const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
    if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
      const options = {};
      ["status", "statusText", "headers"].forEach((prop) => {
        options[prop] = response[prop];
      });
      const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
      const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
        responseContentLength,
        progressEventReducer(asyncDecorator(onDownloadProgress), true)
      ) || [];
      response = new Response(
        trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
          flush && flush();
          unsubscribe && unsubscribe();
        }),
        options
      );
    }
    responseType = responseType || "text";
    let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](response, config);
    !isStreamResponse && unsubscribe && unsubscribe();
    return await new Promise((resolve, reject) => {
      settle(resolve, reject, {
        data: responseData,
        headers: AxiosHeaders.from(response.headers),
        status: response.status,
        statusText: response.statusText,
        config,
        request
      });
    });
  } catch (err) {
    unsubscribe && unsubscribe();
    if (err && err.name === "TypeError" && /fetch/i.test(err.message)) {
      throw Object.assign(
        new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request),
        {
          cause: err.cause || err
        }
      );
    }
    throw AxiosError.from(err, err && err.code, config, request);
  }
});
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: fetchAdapter
};
utils$1.forEach(knownAdapters, (fn, value2) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value: value2 });
    } catch (e2) {
    }
    Object.defineProperty(fn, "adapterName", { value: value2 });
  }
});
const renderReason = (reason) => `- ${reason}`;
const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
const adapters = {
  getAdapter: (adapters2) => {
    adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
    const { length } = adapters2;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for (let i2 = 0; i2 < length; i2++) {
      nameOrAdapter = adapters2[i2];
      let id2;
      adapter = nameOrAdapter;
      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id2 = String(nameOrAdapter)).toLowerCase()];
        if (adapter === void 0) {
          throw new AxiosError(`Unknown adapter '${id2}'`);
        }
      }
      if (adapter) {
        break;
      }
      rejectedReasons[id2 || "#" + i2] = adapter;
    }
    if (!adapter) {
      const reasons = Object.entries(rejectedReasons).map(
        ([id2, state]) => `adapter ${id2} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
      );
      let s2 = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
      throw new AxiosError(
        `There is no suitable adapter to dispatch the request ` + s2,
        "ERR_NOT_SUPPORT"
      );
    }
    return adapter;
  },
  adapters: knownAdapters
};
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders.from(config.headers);
  config.data = transformData.call(
    config,
    config.transformRequest
  );
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config.adapter || defaults.adapter);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );
    response.headers = AxiosHeaders.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}
const VERSION = "1.7.7";
const validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i2) => {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i2 < 1 ? "n " : " ") + type;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value2, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value2, opt, opts) : true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i2 = keys.length;
  while (i2-- > 0) {
    const opt = keys[i2];
    const validator2 = schema[opt];
    if (validator2) {
      const value2 = options[opt];
      const result = value2 === void 0 || validator2(value2, opt, options);
      if (result !== true) {
        throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1
};
const validators = validator.validators;
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy;
        Error.captureStackTrace ? Error.captureStackTrace(dummy = {}) : dummy = new Error();
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
            err.stack += "\n" + stack;
          }
        } catch (e2) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator.assertOptions(transitional2, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils$1.merge(
      headers.common,
      headers[config.method]
    );
    headers && utils$1.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (method) => {
        delete headers[method];
      }
    );
    config.headers = AxiosHeaders.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i2 = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i2 < len) {
        promise = promise.then(chain[i2++], chain[i2++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    i2 = 0;
    while (i2 < len) {
      const onFulfilled = requestInterceptorChain[i2++];
      const onRejected = requestInterceptorChain[i2++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i2 = 0;
    len = responseInterceptorChain.length;
    while (i2 < len) {
      promise = promise.then(responseInterceptorChain[i2++], responseInterceptorChain[i2++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
}
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios.prototype[method] = function(url2, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url: url2,
      data: (config || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url2, data, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: url2,
        data
      }));
    };
  }
  Axios.prototype[method] = generateHTTPMethod();
  Axios.prototype[method + "Form"] = generateHTTPMethod(true);
});
class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i2 = token._listeners.length;
      while (i2-- > 0) {
        token._listeners[i2](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError(message, config, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c2) {
      cancel = c2;
    });
    return {
      token,
      cancel
    };
  }
}
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
}
const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode).forEach(([key, value2]) => {
  HttpStatusCode[value2] = key;
});
function createInstance(defaultConfig) {
  const context = new Axios(defaultConfig);
  const instance = bind(Axios.prototype.request, context);
  utils$1.extend(instance, Axios.prototype, context, { allOwnKeys: true });
  utils$1.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create2(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };
  return instance;
}
const axios = createInstance(defaults);
axios.Axios = Axios;
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;
axios.AxiosError = AxiosError;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;
axios.isAxiosError = isAxiosError;
axios.mergeConfig = mergeConfig;
axios.AxiosHeaders = AxiosHeaders;
axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters.getAdapter;
axios.HttpStatusCode = HttpStatusCode;
axios.default = axios;
const axiosInstance = axios.create({
  baseURL: typeof window !== "undefined" && window.location.origin.includes("pages.dev") ? "https://Blink.koyeb.app/api" : "/api",
  withCredentials: true
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
let e = { data: "" }, t = (t2) => "object" == typeof window ? ((t2 ? t2.querySelector("#_goober") : window._goober) || Object.assign((t2 || document.head).appendChild(document.createElement("style")), { innerHTML: " ", id: "_goober" })).firstChild : t2 || e, l = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g, a = /\/\*[^]*?\*\/|  +/g, n$1 = /\n+/g, o = (e2, t2) => {
  let r2 = "", l2 = "", a2 = "";
  for (let n2 in e2) {
    let c2 = e2[n2];
    "@" == n2[0] ? "i" == n2[1] ? r2 = n2 + " " + c2 + ";" : l2 += "f" == n2[1] ? o(c2, n2) : n2 + "{" + o(c2, "k" == n2[1] ? "" : t2) + "}" : "object" == typeof c2 ? l2 += o(c2, t2 ? t2.replace(/([^,])+/g, (e3) => n2.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g, (t3) => /&/.test(t3) ? t3.replace(/&/g, e3) : e3 ? e3 + " " + t3 : t3)) : n2) : null != c2 && (n2 = /^--/.test(n2) ? n2 : n2.replace(/[A-Z]/g, "-$&").toLowerCase(), a2 += o.p ? o.p(n2, c2) : n2 + ":" + c2 + ";");
  }
  return r2 + (t2 && a2 ? t2 + "{" + a2 + "}" : a2) + l2;
}, c = {}, s = (e2) => {
  if ("object" == typeof e2) {
    let t2 = "";
    for (let r2 in e2) t2 += r2 + s(e2[r2]);
    return t2;
  }
  return e2;
}, i = (e2, t2, r2, i2, p2) => {
  let u2 = s(e2), d2 = c[u2] || (c[u2] = ((e3) => {
    let t3 = 0, r3 = 11;
    for (; t3 < e3.length; ) r3 = 101 * r3 + e3.charCodeAt(t3++) >>> 0;
    return "go" + r3;
  })(u2));
  if (!c[d2]) {
    let t3 = u2 !== e2 ? e2 : ((e3) => {
      let t4, r3, o2 = [{}];
      for (; t4 = l.exec(e3.replace(a, "")); ) t4[4] ? o2.shift() : t4[3] ? (r3 = t4[3].replace(n$1, " ").trim(), o2.unshift(o2[0][r3] = o2[0][r3] || {})) : o2[0][t4[1]] = t4[2].replace(n$1, " ").trim();
      return o2[0];
    })(e2);
    c[d2] = o(p2 ? { ["@keyframes " + d2]: t3 } : t3, r2 ? "" : "." + d2);
  }
  let f2 = r2 && c.g ? c.g : null;
  return r2 && (c.g = c[d2]), ((e3, t3, r3, l2) => {
    l2 ? t3.data = t3.data.replace(l2, e3) : -1 === t3.data.indexOf(e3) && (t3.data = r3 ? e3 + t3.data : t3.data + e3);
  })(c[d2], t2, i2, f2), d2;
}, p = (e2, t2, r2) => e2.reduce((e3, l2, a2) => {
  let n2 = t2[a2];
  if (n2 && n2.call) {
    let e4 = n2(r2), t3 = e4 && e4.props && e4.props.className || /^go/.test(e4) && e4;
    n2 = t3 ? "." + t3 : e4 && "object" == typeof e4 ? e4.props ? "" : o(e4, "") : false === e4 ? "" : e4;
  }
  return e3 + l2 + (null == n2 ? "" : n2);
}, "");
function u$1(e2) {
  let r2 = this || {}, l2 = e2.call ? e2(r2.p) : e2;
  return i(l2.unshift ? l2.raw ? p(l2, [].slice.call(arguments, 1), r2.p) : l2.reduce((e3, t2) => Object.assign(e3, t2 && t2.call ? t2(r2.p) : t2), {}) : l2, t(r2.target), r2.g, r2.o, r2.k);
}
let d, f, g;
u$1.bind({ g: 1 });
let h$1 = u$1.bind({ k: 1 });
function m(e2, t2, r2, l2) {
  o.p = t2, d = e2, f = r2, g = l2;
}
function j(e2, t2) {
  let r2 = this || {};
  return function() {
    let l2 = arguments;
    function a2(n2, o2) {
      let c2 = Object.assign({}, n2), s2 = c2.className || a2.className;
      r2.p = Object.assign({ theme: f && f() }, c2), r2.o = / *go\d+/.test(s2), c2.className = u$1.apply(r2, l2) + (s2 ? " " + s2 : "");
      let i2 = e2;
      return e2[0] && (i2 = c2.as || e2, delete c2.as), g && i2[0] && g(c2), d(i2, c2);
    }
    return a2;
  };
}
var W = (e2) => typeof e2 == "function", T = (e2, t2) => W(e2) ? e2(t2) : e2;
var U = /* @__PURE__ */ (() => {
  let e2 = 0;
  return () => (++e2).toString();
})(), b = /* @__PURE__ */ (() => {
  let e2;
  return () => {
    if (e2 === void 0 && typeof window < "u") {
      let t2 = matchMedia("(prefers-reduced-motion: reduce)");
      e2 = !t2 || t2.matches;
    }
    return e2;
  };
})();
var Q = 20;
var S = /* @__PURE__ */ new Map(), X$1 = 1e3, $ = (e2) => {
  if (S.has(e2)) return;
  let t2 = setTimeout(() => {
    S.delete(e2), u({ type: 4, toastId: e2 });
  }, X$1);
  S.set(e2, t2);
}, J = (e2) => {
  let t2 = S.get(e2);
  t2 && clearTimeout(t2);
}, v = (e2, t2) => {
  switch (t2.type) {
    case 0:
      return { ...e2, toasts: [t2.toast, ...e2.toasts].slice(0, Q) };
    case 1:
      return t2.toast.id && J(t2.toast.id), { ...e2, toasts: e2.toasts.map((r2) => r2.id === t2.toast.id ? { ...r2, ...t2.toast } : r2) };
    case 2:
      let { toast: o2 } = t2;
      return e2.toasts.find((r2) => r2.id === o2.id) ? v(e2, { type: 1, toast: o2 }) : v(e2, { type: 0, toast: o2 });
    case 3:
      let { toastId: s2 } = t2;
      return s2 ? $(s2) : e2.toasts.forEach((r2) => {
        $(r2.id);
      }), { ...e2, toasts: e2.toasts.map((r2) => r2.id === s2 || s2 === void 0 ? { ...r2, visible: false } : r2) };
    case 4:
      return t2.toastId === void 0 ? { ...e2, toasts: [] } : { ...e2, toasts: e2.toasts.filter((r2) => r2.id !== t2.toastId) };
    case 5:
      return { ...e2, pausedAt: t2.time };
    case 6:
      let a2 = t2.time - (e2.pausedAt || 0);
      return { ...e2, pausedAt: void 0, toasts: e2.toasts.map((r2) => ({ ...r2, pauseDuration: r2.pauseDuration + a2 })) };
  }
}, A = [], P = { toasts: [], pausedAt: void 0 }, u = (e2) => {
  P = v(P, e2), A.forEach((t2) => {
    t2(P);
  });
}, Y = { blank: 4e3, error: 4e3, success: 2e3, loading: 1 / 0, custom: 4e3 }, I = (e2 = {}) => {
  let [t2, o2] = reactExports.useState(P);
  reactExports.useEffect(() => (A.push(o2), () => {
    let a2 = A.indexOf(o2);
    a2 > -1 && A.splice(a2, 1);
  }), [t2]);
  let s2 = t2.toasts.map((a2) => {
    var r2, c2;
    return { ...e2, ...e2[a2.type], ...a2, duration: a2.duration || ((r2 = e2[a2.type]) == null ? void 0 : r2.duration) || (e2 == null ? void 0 : e2.duration) || Y[a2.type], style: { ...e2.style, ...(c2 = e2[a2.type]) == null ? void 0 : c2.style, ...a2.style } };
  });
  return { ...t2, toasts: s2 };
};
var G = (e2, t2 = "blank", o2) => ({ createdAt: Date.now(), visible: true, type: t2, ariaProps: { role: "status", "aria-live": "polite" }, message: e2, pauseDuration: 0, ...o2, id: (o2 == null ? void 0 : o2.id) || U() }), h = (e2) => (t2, o2) => {
  let s2 = G(t2, e2, o2);
  return u({ type: 2, toast: s2 }), s2.id;
}, n = (e2, t2) => h("blank")(e2, t2);
n.error = h("error");
n.success = h("success");
n.loading = h("loading");
n.custom = h("custom");
n.dismiss = (e2) => {
  u({ type: 3, toastId: e2 });
};
n.remove = (e2) => u({ type: 4, toastId: e2 });
n.promise = (e2, t2, o2) => {
  let s2 = n.loading(t2.loading, { ...o2, ...o2 == null ? void 0 : o2.loading });
  return e2.then((a2) => (n.success(T(t2.success, a2), { id: s2, ...o2, ...o2 == null ? void 0 : o2.success }), a2)).catch((a2) => {
    n.error(T(t2.error, a2), { id: s2, ...o2, ...o2 == null ? void 0 : o2.error });
  }), e2;
};
var Z = (e2, t2) => {
  u({ type: 1, toast: { id: e2, height: t2 } });
}, ee = () => {
  u({ type: 5, time: Date.now() });
}, D = (e2) => {
  let { toasts: t2, pausedAt: o2 } = I(e2);
  reactExports.useEffect(() => {
    if (o2) return;
    let r2 = Date.now(), c2 = t2.map((i2) => {
      if (i2.duration === 1 / 0) return;
      let d2 = (i2.duration || 0) + i2.pauseDuration - (r2 - i2.createdAt);
      if (d2 < 0) {
        i2.visible && n.dismiss(i2.id);
        return;
      }
      return setTimeout(() => n.dismiss(i2.id), d2);
    });
    return () => {
      c2.forEach((i2) => i2 && clearTimeout(i2));
    };
  }, [t2, o2]);
  let s2 = reactExports.useCallback(() => {
    o2 && u({ type: 6, time: Date.now() });
  }, [o2]), a2 = reactExports.useCallback((r2, c2) => {
    let { reverseOrder: i2 = false, gutter: d2 = 8, defaultPosition: p2 } = c2 || {}, g2 = t2.filter((m2) => (m2.position || p2) === (r2.position || p2) && m2.height), E2 = g2.findIndex((m2) => m2.id === r2.id), x2 = g2.filter((m2, R2) => R2 < E2 && m2.visible).length;
    return g2.filter((m2) => m2.visible).slice(...i2 ? [x2 + 1] : [0, x2]).reduce((m2, R2) => m2 + (R2.height || 0) + d2, 0);
  }, [t2]);
  return { toasts: t2, handlers: { updateHeight: Z, startPause: ee, endPause: s2, calculateOffset: a2 } };
};
var oe = h$1`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`, re$1 = h$1`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`, se = h$1`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`, _ = j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e2) => e2.primary || "#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${oe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${re$1} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${(e2) => e2.secondary || "#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${se} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`;
var ne = h$1`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`, V = j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${(e2) => e2.secondary || "#e0e0e0"};
  border-right-color: ${(e2) => e2.primary || "#616161"};
  animation: ${ne} 1s linear infinite;
`;
var pe = h$1`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`, de = h$1`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`, w = j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e2) => e2.primary || "#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${pe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${de} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${(e2) => e2.secondary || "#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`;
var ue = j("div")`
  position: absolute;
`, le = j("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`, Te = h$1`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`, fe = j("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Te} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`, M = ({ toast: e2 }) => {
  let { icon: t2, type: o2, iconTheme: s2 } = e2;
  return t2 !== void 0 ? typeof t2 == "string" ? reactExports.createElement(fe, null, t2) : t2 : o2 === "blank" ? null : reactExports.createElement(le, null, reactExports.createElement(V, { ...s2 }), o2 !== "loading" && reactExports.createElement(ue, null, o2 === "error" ? reactExports.createElement(_, { ...s2 }) : reactExports.createElement(w, { ...s2 })));
};
var ye = (e2) => `
0% {transform: translate3d(0,${e2 * -200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`, ge = (e2) => `
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e2 * -150}%,-1px) scale(.6); opacity:0;}
`, he = "0%{opacity:0;} 100%{opacity:1;}", xe = "0%{opacity:1;} 100%{opacity:0;}", be = j("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`, Se = j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`, Ae = (e2, t2) => {
  let s2 = e2.includes("top") ? 1 : -1, [a2, r2] = b() ? [he, xe] : [ye(s2), ge(s2)];
  return { animation: t2 ? `${h$1(a2)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards` : `${h$1(r2)} 0.4s forwards cubic-bezier(.06,.71,.55,1)` };
}, F = reactExports.memo(({ toast: e2, position: t2, style: o2, children: s2 }) => {
  let a2 = e2.height ? Ae(e2.position || t2 || "top-center", e2.visible) : { opacity: 0 }, r2 = reactExports.createElement(M, { toast: e2 }), c2 = reactExports.createElement(Se, { ...e2.ariaProps }, T(e2.message, e2));
  return reactExports.createElement(be, { className: e2.className, style: { ...a2, ...o2, ...e2.style } }, typeof s2 == "function" ? s2({ icon: r2, message: c2 }) : reactExports.createElement(reactExports.Fragment, null, r2, c2));
});
m(reactExports.createElement);
var Ee = ({ id: e2, className: t2, style: o2, onHeightUpdate: s2, children: a2 }) => {
  let r2 = reactExports.useCallback((c2) => {
    if (c2) {
      let i2 = () => {
        let d2 = c2.getBoundingClientRect().height;
        s2(e2, d2);
      };
      i2(), new MutationObserver(i2).observe(c2, { subtree: true, childList: true, characterData: true });
    }
  }, [e2, s2]);
  return reactExports.createElement("div", { ref: r2, className: t2, style: o2 }, a2);
}, Re = (e2, t2) => {
  let o2 = e2.includes("top"), s2 = o2 ? { top: 0 } : { bottom: 0 }, a2 = e2.includes("center") ? { justifyContent: "center" } : e2.includes("right") ? { justifyContent: "flex-end" } : {};
  return { left: 0, right: 0, display: "flex", position: "absolute", transition: b() ? void 0 : "all 230ms cubic-bezier(.21,1.02,.73,1)", transform: `translateY(${t2 * (o2 ? 1 : -1)}px)`, ...s2, ...a2 };
}, ve = u$1`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`, O = 16, Ie = ({ reverseOrder: e2, position: t2 = "top-center", toastOptions: o2, gutter: s2, children: a2, containerStyle: r2, containerClassName: c2 }) => {
  let { toasts: i2, handlers: d2 } = D(o2);
  return reactExports.createElement("div", { style: { position: "fixed", zIndex: 9999, top: O, left: O, right: O, bottom: O, pointerEvents: "none", ...r2 }, className: c2, onMouseEnter: d2.startPause, onMouseLeave: d2.endPause }, i2.map((p2) => {
    let g2 = p2.position || t2, E2 = d2.calculateOffset(p2, { reverseOrder: e2, gutter: s2, defaultPosition: t2 }), x2 = Re(g2, E2);
    return reactExports.createElement(Ee, { id: p2.id, key: p2.id, onHeightUpdate: d2.updateHeight, className: p2.visible ? ve : "", style: x2 }, p2.type === "custom" ? T(p2.message, p2) : a2 ? a2(p2) : reactExports.createElement(F, { toast: p2, position: g2 }));
  }));
};
var _t = n;
const PACKET_TYPES = /* @__PURE__ */ Object.create(null);
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
const PACKET_TYPES_REVERSE = /* @__PURE__ */ Object.create(null);
Object.keys(PACKET_TYPES).forEach((key) => {
  PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
const ERROR_PACKET = { type: "error", data: "parser error" };
const withNativeBlob$1 = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
const withNativeArrayBuffer$2 = typeof ArrayBuffer === "function";
const isView$1 = (obj) => {
  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
};
const encodePacket = ({ type, data }, supportsBinary, callback) => {
  if (withNativeBlob$1 && data instanceof Blob) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64(data, callback);
    }
  } else if (withNativeArrayBuffer$2 && (data instanceof ArrayBuffer || isView$1(data))) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64(new Blob([data]), callback);
    }
  }
  return callback(PACKET_TYPES[type] + (data || ""));
};
const encodeBlobAsBase64 = (data, callback) => {
  const fileReader = new FileReader();
  fileReader.onload = function() {
    const content = fileReader.result.split(",")[1];
    callback("b" + (content || ""));
  };
  return fileReader.readAsDataURL(data);
};
function toArray(data) {
  if (data instanceof Uint8Array) {
    return data;
  } else if (data instanceof ArrayBuffer) {
    return new Uint8Array(data);
  } else {
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  }
}
let TEXT_ENCODER;
function encodePacketToBinary(packet, callback) {
  if (withNativeBlob$1 && packet.data instanceof Blob) {
    return packet.data.arrayBuffer().then(toArray).then(callback);
  } else if (withNativeArrayBuffer$2 && (packet.data instanceof ArrayBuffer || isView$1(packet.data))) {
    return callback(toArray(packet.data));
  }
  encodePacket(packet, false, (encoded) => {
    if (!TEXT_ENCODER) {
      TEXT_ENCODER = new TextEncoder();
    }
    callback(TEXT_ENCODER.encode(encoded));
  });
}
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const lookup$1 = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for (let i2 = 0; i2 < chars.length; i2++) {
  lookup$1[chars.charCodeAt(i2)] = i2;
}
const decode$1 = (base64) => {
  let bufferLength = base64.length * 0.75, len = base64.length, i2, p2 = 0, encoded1, encoded2, encoded3, encoded4;
  if (base64[base64.length - 1] === "=") {
    bufferLength--;
    if (base64[base64.length - 2] === "=") {
      bufferLength--;
    }
  }
  const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
  for (i2 = 0; i2 < len; i2 += 4) {
    encoded1 = lookup$1[base64.charCodeAt(i2)];
    encoded2 = lookup$1[base64.charCodeAt(i2 + 1)];
    encoded3 = lookup$1[base64.charCodeAt(i2 + 2)];
    encoded4 = lookup$1[base64.charCodeAt(i2 + 3)];
    bytes[p2++] = encoded1 << 2 | encoded2 >> 4;
    bytes[p2++] = (encoded2 & 15) << 4 | encoded3 >> 2;
    bytes[p2++] = (encoded3 & 3) << 6 | encoded4 & 63;
  }
  return arraybuffer;
};
const withNativeArrayBuffer$1 = typeof ArrayBuffer === "function";
const decodePacket = (encodedPacket, binaryType) => {
  if (typeof encodedPacket !== "string") {
    return {
      type: "message",
      data: mapBinary(encodedPacket, binaryType)
    };
  }
  const type = encodedPacket.charAt(0);
  if (type === "b") {
    return {
      type: "message",
      data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
    };
  }
  const packetType = PACKET_TYPES_REVERSE[type];
  if (!packetType) {
    return ERROR_PACKET;
  }
  return encodedPacket.length > 1 ? {
    type: PACKET_TYPES_REVERSE[type],
    data: encodedPacket.substring(1)
  } : {
    type: PACKET_TYPES_REVERSE[type]
  };
};
const decodeBase64Packet = (data, binaryType) => {
  if (withNativeArrayBuffer$1) {
    const decoded = decode$1(data);
    return mapBinary(decoded, binaryType);
  } else {
    return { base64: true, data };
  }
};
const mapBinary = (data, binaryType) => {
  switch (binaryType) {
    case "blob":
      if (data instanceof Blob) {
        return data;
      } else {
        return new Blob([data]);
      }
    case "arraybuffer":
    default:
      if (data instanceof ArrayBuffer) {
        return data;
      } else {
        return data.buffer;
      }
  }
};
const SEPARATOR = String.fromCharCode(30);
const encodePayload = (packets, callback) => {
  const length = packets.length;
  const encodedPackets = new Array(length);
  let count = 0;
  packets.forEach((packet, i2) => {
    encodePacket(packet, false, (encodedPacket) => {
      encodedPackets[i2] = encodedPacket;
      if (++count === length) {
        callback(encodedPackets.join(SEPARATOR));
      }
    });
  });
};
const decodePayload = (encodedPayload, binaryType) => {
  const encodedPackets = encodedPayload.split(SEPARATOR);
  const packets = [];
  for (let i2 = 0; i2 < encodedPackets.length; i2++) {
    const decodedPacket = decodePacket(encodedPackets[i2], binaryType);
    packets.push(decodedPacket);
    if (decodedPacket.type === "error") {
      break;
    }
  }
  return packets;
};
function createPacketEncoderStream() {
  return new TransformStream({
    transform(packet, controller) {
      encodePacketToBinary(packet, (encodedPacket) => {
        const payloadLength = encodedPacket.length;
        let header;
        if (payloadLength < 126) {
          header = new Uint8Array(1);
          new DataView(header.buffer).setUint8(0, payloadLength);
        } else if (payloadLength < 65536) {
          header = new Uint8Array(3);
          const view = new DataView(header.buffer);
          view.setUint8(0, 126);
          view.setUint16(1, payloadLength);
        } else {
          header = new Uint8Array(9);
          const view = new DataView(header.buffer);
          view.setUint8(0, 127);
          view.setBigUint64(1, BigInt(payloadLength));
        }
        if (packet.data && typeof packet.data !== "string") {
          header[0] |= 128;
        }
        controller.enqueue(header);
        controller.enqueue(encodedPacket);
      });
    }
  });
}
let TEXT_DECODER;
function totalLength(chunks) {
  return chunks.reduce((acc, chunk) => acc + chunk.length, 0);
}
function concatChunks(chunks, size) {
  if (chunks[0].length === size) {
    return chunks.shift();
  }
  const buffer = new Uint8Array(size);
  let j2 = 0;
  for (let i2 = 0; i2 < size; i2++) {
    buffer[i2] = chunks[0][j2++];
    if (j2 === chunks[0].length) {
      chunks.shift();
      j2 = 0;
    }
  }
  if (chunks.length && j2 < chunks[0].length) {
    chunks[0] = chunks[0].slice(j2);
  }
  return buffer;
}
function createPacketDecoderStream(maxPayload, binaryType) {
  if (!TEXT_DECODER) {
    TEXT_DECODER = new TextDecoder();
  }
  const chunks = [];
  let state = 0;
  let expectedLength = -1;
  let isBinary2 = false;
  return new TransformStream({
    transform(chunk, controller) {
      chunks.push(chunk);
      while (true) {
        if (state === 0) {
          if (totalLength(chunks) < 1) {
            break;
          }
          const header = concatChunks(chunks, 1);
          isBinary2 = (header[0] & 128) === 128;
          expectedLength = header[0] & 127;
          if (expectedLength < 126) {
            state = 3;
          } else if (expectedLength === 126) {
            state = 1;
          } else {
            state = 2;
          }
        } else if (state === 1) {
          if (totalLength(chunks) < 2) {
            break;
          }
          const headerArray = concatChunks(chunks, 2);
          expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
          state = 3;
        } else if (state === 2) {
          if (totalLength(chunks) < 8) {
            break;
          }
          const headerArray = concatChunks(chunks, 8);
          const view = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length);
          const n2 = view.getUint32(0);
          if (n2 > Math.pow(2, 53 - 32) - 1) {
            controller.enqueue(ERROR_PACKET);
            break;
          }
          expectedLength = n2 * Math.pow(2, 32) + view.getUint32(4);
          state = 3;
        } else {
          if (totalLength(chunks) < expectedLength) {
            break;
          }
          const data = concatChunks(chunks, expectedLength);
          controller.enqueue(decodePacket(isBinary2 ? data : TEXT_DECODER.decode(data), binaryType));
          state = 0;
        }
        if (expectedLength === 0 || expectedLength > maxPayload) {
          controller.enqueue(ERROR_PACKET);
          break;
        }
      }
    }
  });
}
const protocol$1 = 4;
function Emitter(obj) {
  if (obj) return mixin(obj);
}
function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}
Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
  this._callbacks = this._callbacks || {};
  (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
  return this;
};
Emitter.prototype.once = function(event, fn) {
  function on2() {
    this.off(event, on2);
    fn.apply(this, arguments);
  }
  on2.fn = fn;
  this.on(event, on2);
  return this;
};
Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
  this._callbacks = this._callbacks || {};
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }
  var callbacks = this._callbacks["$" + event];
  if (!callbacks) return this;
  if (1 == arguments.length) {
    delete this._callbacks["$" + event];
    return this;
  }
  var cb2;
  for (var i2 = 0; i2 < callbacks.length; i2++) {
    cb2 = callbacks[i2];
    if (cb2 === fn || cb2.fn === fn) {
      callbacks.splice(i2, 1);
      break;
    }
  }
  if (callbacks.length === 0) {
    delete this._callbacks["$" + event];
  }
  return this;
};
Emitter.prototype.emit = function(event) {
  this._callbacks = this._callbacks || {};
  var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
  for (var i2 = 1; i2 < arguments.length; i2++) {
    args[i2 - 1] = arguments[i2];
  }
  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i2 = 0, len = callbacks.length; i2 < len; ++i2) {
      callbacks[i2].apply(this, args);
    }
  }
  return this;
};
Emitter.prototype.emitReserved = Emitter.prototype.emit;
Emitter.prototype.listeners = function(event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks["$" + event] || [];
};
Emitter.prototype.hasListeners = function(event) {
  return !!this.listeners(event).length;
};
const nextTick = (() => {
  const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
  if (isPromiseAvailable) {
    return (cb2) => Promise.resolve().then(cb2);
  } else {
    return (cb2, setTimeoutFn) => setTimeoutFn(cb2, 0);
  }
})();
const globalThisShim = (() => {
  if (typeof self !== "undefined") {
    return self;
  } else if (typeof window !== "undefined") {
    return window;
  } else {
    return Function("return this")();
  }
})();
const defaultBinaryType = "arraybuffer";
function createCookieJar() {
}
function pick(obj, ...attr) {
  return attr.reduce((acc, k2) => {
    if (obj.hasOwnProperty(k2)) {
      acc[k2] = obj[k2];
    }
    return acc;
  }, {});
}
const NATIVE_SET_TIMEOUT = globalThisShim.setTimeout;
const NATIVE_CLEAR_TIMEOUT = globalThisShim.clearTimeout;
function installTimerFunctions(obj, opts) {
  if (opts.useNativeTimers) {
    obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim);
    obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim);
  } else {
    obj.setTimeoutFn = globalThisShim.setTimeout.bind(globalThisShim);
    obj.clearTimeoutFn = globalThisShim.clearTimeout.bind(globalThisShim);
  }
}
const BASE64_OVERHEAD = 1.33;
function byteLength(obj) {
  if (typeof obj === "string") {
    return utf8Length(obj);
  }
  return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
}
function utf8Length(str) {
  let c2 = 0, length = 0;
  for (let i2 = 0, l2 = str.length; i2 < l2; i2++) {
    c2 = str.charCodeAt(i2);
    if (c2 < 128) {
      length += 1;
    } else if (c2 < 2048) {
      length += 2;
    } else if (c2 < 55296 || c2 >= 57344) {
      length += 3;
    } else {
      i2++;
      length += 4;
    }
  }
  return length;
}
function randomString() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function encode(obj) {
  let str = "";
  for (let i2 in obj) {
    if (obj.hasOwnProperty(i2)) {
      if (str.length)
        str += "&";
      str += encodeURIComponent(i2) + "=" + encodeURIComponent(obj[i2]);
    }
  }
  return str;
}
function decode(qs) {
  let qry = {};
  let pairs = qs.split("&");
  for (let i2 = 0, l2 = pairs.length; i2 < l2; i2++) {
    let pair = pairs[i2].split("=");
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
}
class TransportError extends Error {
  constructor(reason, description, context) {
    super(reason);
    this.description = description;
    this.context = context;
    this.type = "TransportError";
  }
}
class Transport extends Emitter {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(opts) {
    super();
    this.writable = false;
    installTimerFunctions(this, opts);
    this.opts = opts;
    this.query = opts.query;
    this.socket = opts.socket;
    this.supportsBinary = !opts.forceBase64;
  }
  /**
   * Emits an error.
   *
   * @param {String} reason
   * @param description
   * @param context - the error context
   * @return {Transport} for chaining
   * @protected
   */
  onError(reason, description, context) {
    super.emitReserved("error", new TransportError(reason, description, context));
    return this;
  }
  /**
   * Opens the transport.
   */
  open() {
    this.readyState = "opening";
    this.doOpen();
    return this;
  }
  /**
   * Closes the transport.
   */
  close() {
    if (this.readyState === "opening" || this.readyState === "open") {
      this.doClose();
      this.onClose();
    }
    return this;
  }
  /**
   * Sends multiple packets.
   *
   * @param {Array} packets
   */
  send(packets) {
    if (this.readyState === "open") {
      this.write(packets);
    }
  }
  /**
   * Called upon open
   *
   * @protected
   */
  onOpen() {
    this.readyState = "open";
    this.writable = true;
    super.emitReserved("open");
  }
  /**
   * Called with data.
   *
   * @param {String} data
   * @protected
   */
  onData(data) {
    const packet = decodePacket(data, this.socket.binaryType);
    this.onPacket(packet);
  }
  /**
   * Called with a decoded packet.
   *
   * @protected
   */
  onPacket(packet) {
    super.emitReserved("packet", packet);
  }
  /**
   * Called upon close.
   *
   * @protected
   */
  onClose(details) {
    this.readyState = "closed";
    super.emitReserved("close", details);
  }
  /**
   * Pauses the transport, in order not to lose packets during an upgrade.
   *
   * @param onPause
   */
  pause(onPause) {
  }
  createUri(schema, query = {}) {
    return schema + "://" + this._hostname() + this._port() + this.opts.path + this._query(query);
  }
  _hostname() {
    const hostname = this.opts.hostname;
    return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
  }
  _port() {
    if (this.opts.port && (this.opts.secure && Number(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80)) {
      return ":" + this.opts.port;
    } else {
      return "";
    }
  }
  _query(query) {
    const encodedQuery = encode(query);
    return encodedQuery.length ? "?" + encodedQuery : "";
  }
}
class Polling extends Transport {
  constructor() {
    super(...arguments);
    this._polling = false;
  }
  get name() {
    return "polling";
  }
  /**
   * Opens the socket (triggers polling). We write a PING message to determine
   * when the transport is open.
   *
   * @protected
   */
  doOpen() {
    this._poll();
  }
  /**
   * Pauses polling.
   *
   * @param {Function} onPause - callback upon buffers are flushed and transport is paused
   * @package
   */
  pause(onPause) {
    this.readyState = "pausing";
    const pause = () => {
      this.readyState = "paused";
      onPause();
    };
    if (this._polling || !this.writable) {
      let total = 0;
      if (this._polling) {
        total++;
        this.once("pollComplete", function() {
          --total || pause();
        });
      }
      if (!this.writable) {
        total++;
        this.once("drain", function() {
          --total || pause();
        });
      }
    } else {
      pause();
    }
  }
  /**
   * Starts polling cycle.
   *
   * @private
   */
  _poll() {
    this._polling = true;
    this.doPoll();
    this.emitReserved("poll");
  }
  /**
   * Overloads onData to detect payloads.
   *
   * @protected
   */
  onData(data) {
    const callback = (packet) => {
      if ("opening" === this.readyState && packet.type === "open") {
        this.onOpen();
      }
      if ("close" === packet.type) {
        this.onClose({ description: "transport closed by the server" });
        return false;
      }
      this.onPacket(packet);
    };
    decodePayload(data, this.socket.binaryType).forEach(callback);
    if ("closed" !== this.readyState) {
      this._polling = false;
      this.emitReserved("pollComplete");
      if ("open" === this.readyState) {
        this._poll();
      }
    }
  }
  /**
   * For polling, send a close packet.
   *
   * @protected
   */
  doClose() {
    const close = () => {
      this.write([{ type: "close" }]);
    };
    if ("open" === this.readyState) {
      close();
    } else {
      this.once("open", close);
    }
  }
  /**
   * Writes a packets payload.
   *
   * @param {Array} packets - data packets
   * @protected
   */
  write(packets) {
    this.writable = false;
    encodePayload(packets, (data) => {
      this.doWrite(data, () => {
        this.writable = true;
        this.emitReserved("drain");
      });
    });
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const schema = this.opts.secure ? "https" : "http";
    const query = this.query || {};
    if (false !== this.opts.timestampRequests) {
      query[this.opts.timestampParam] = randomString();
    }
    if (!this.supportsBinary && !query.sid) {
      query.b64 = 1;
    }
    return this.createUri(schema, query);
  }
}
let value = false;
try {
  value = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
} catch (err) {
}
const hasCORS = value;
function empty() {
}
class BaseXHR extends Polling {
  /**
   * XHR Polling constructor.
   *
   * @param {Object} opts
   * @package
   */
  constructor(opts) {
    super(opts);
    if (typeof location !== "undefined") {
      const isSSL = "https:" === location.protocol;
      let port = location.port;
      if (!port) {
        port = isSSL ? "443" : "80";
      }
      this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
    }
  }
  /**
   * Sends data.
   *
   * @param {String} data to send.
   * @param {Function} called upon flush.
   * @private
   */
  doWrite(data, fn) {
    const req = this.request({
      method: "POST",
      data
    });
    req.on("success", fn);
    req.on("error", (xhrStatus, context) => {
      this.onError("xhr post error", xhrStatus, context);
    });
  }
  /**
   * Starts a poll cycle.
   *
   * @private
   */
  doPoll() {
    const req = this.request();
    req.on("data", this.onData.bind(this));
    req.on("error", (xhrStatus, context) => {
      this.onError("xhr poll error", xhrStatus, context);
    });
    this.pollXhr = req;
  }
}
let Request$1 = class Request2 extends Emitter {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(createRequest, uri, opts) {
    super();
    this.createRequest = createRequest;
    installTimerFunctions(this, opts);
    this._opts = opts;
    this._method = opts.method || "GET";
    this._uri = uri;
    this._data = void 0 !== opts.data ? opts.data : null;
    this._create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  _create() {
    var _a;
    const opts = pick(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
    opts.xdomain = !!this._opts.xd;
    const xhr = this._xhr = this.createRequest(opts);
    try {
      xhr.open(this._method, this._uri, true);
      try {
        if (this._opts.extraHeaders) {
          xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
          for (let i2 in this._opts.extraHeaders) {
            if (this._opts.extraHeaders.hasOwnProperty(i2)) {
              xhr.setRequestHeader(i2, this._opts.extraHeaders[i2]);
            }
          }
        }
      } catch (e2) {
      }
      if ("POST" === this._method) {
        try {
          xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch (e2) {
        }
      }
      try {
        xhr.setRequestHeader("Accept", "*/*");
      } catch (e2) {
      }
      (_a = this._opts.cookieJar) === null || _a === void 0 ? void 0 : _a.addCookies(xhr);
      if ("withCredentials" in xhr) {
        xhr.withCredentials = this._opts.withCredentials;
      }
      if (this._opts.requestTimeout) {
        xhr.timeout = this._opts.requestTimeout;
      }
      xhr.onreadystatechange = () => {
        var _a2;
        if (xhr.readyState === 3) {
          (_a2 = this._opts.cookieJar) === null || _a2 === void 0 ? void 0 : _a2.parseCookies(
            // @ts-ignore
            xhr.getResponseHeader("set-cookie")
          );
        }
        if (4 !== xhr.readyState)
          return;
        if (200 === xhr.status || 1223 === xhr.status) {
          this._onLoad();
        } else {
          this.setTimeoutFn(() => {
            this._onError(typeof xhr.status === "number" ? xhr.status : 0);
          }, 0);
        }
      };
      xhr.send(this._data);
    } catch (e2) {
      this.setTimeoutFn(() => {
        this._onError(e2);
      }, 0);
      return;
    }
    if (typeof document !== "undefined") {
      this._index = Request2.requestsCount++;
      Request2.requests[this._index] = this;
    }
  }
  /**
   * Called upon error.
   *
   * @private
   */
  _onError(err) {
    this.emitReserved("error", err, this._xhr);
    this._cleanup(true);
  }
  /**
   * Cleans up house.
   *
   * @private
   */
  _cleanup(fromError) {
    if ("undefined" === typeof this._xhr || null === this._xhr) {
      return;
    }
    this._xhr.onreadystatechange = empty;
    if (fromError) {
      try {
        this._xhr.abort();
      } catch (e2) {
      }
    }
    if (typeof document !== "undefined") {
      delete Request2.requests[this._index];
    }
    this._xhr = null;
  }
  /**
   * Called upon load.
   *
   * @private
   */
  _onLoad() {
    const data = this._xhr.responseText;
    if (data !== null) {
      this.emitReserved("data", data);
      this.emitReserved("success");
      this._cleanup();
    }
  }
  /**
   * Aborts the request.
   *
   * @package
   */
  abort() {
    this._cleanup();
  }
};
Request$1.requestsCount = 0;
Request$1.requests = {};
if (typeof document !== "undefined") {
  if (typeof attachEvent === "function") {
    attachEvent("onunload", unloadHandler);
  } else if (typeof addEventListener === "function") {
    const terminationEvent = "onpagehide" in globalThisShim ? "pagehide" : "unload";
    addEventListener(terminationEvent, unloadHandler, false);
  }
}
function unloadHandler() {
  for (let i2 in Request$1.requests) {
    if (Request$1.requests.hasOwnProperty(i2)) {
      Request$1.requests[i2].abort();
    }
  }
}
const hasXHR2 = function() {
  const xhr = newRequest({
    xdomain: false
  });
  return xhr && xhr.responseType !== null;
}();
class XHR extends BaseXHR {
  constructor(opts) {
    super(opts);
    const forceBase64 = opts && opts.forceBase64;
    this.supportsBinary = hasXHR2 && !forceBase64;
  }
  request(opts = {}) {
    Object.assign(opts, { xd: this.xd }, this.opts);
    return new Request$1(newRequest, this.uri(), opts);
  }
}
function newRequest(opts) {
  const xdomain = opts.xdomain;
  try {
    if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e2) {
  }
  if (!xdomain) {
    try {
      return new globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch (e2) {
    }
  }
}
const isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
class BaseWS extends Transport {
  get name() {
    return "websocket";
  }
  doOpen() {
    const uri = this.uri();
    const protocols = this.opts.protocols;
    const opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
    if (this.opts.extraHeaders) {
      opts.headers = this.opts.extraHeaders;
    }
    try {
      this.ws = this.createSocket(uri, protocols, opts);
    } catch (err) {
      return this.emitReserved("error", err);
    }
    this.ws.binaryType = this.socket.binaryType;
    this.addEventListeners();
  }
  /**
   * Adds event listeners to the socket
   *
   * @private
   */
  addEventListeners() {
    this.ws.onopen = () => {
      if (this.opts.autoUnref) {
        this.ws._socket.unref();
      }
      this.onOpen();
    };
    this.ws.onclose = (closeEvent) => this.onClose({
      description: "websocket connection closed",
      context: closeEvent
    });
    this.ws.onmessage = (ev) => this.onData(ev.data);
    this.ws.onerror = (e2) => this.onError("websocket error", e2);
  }
  write(packets) {
    this.writable = false;
    for (let i2 = 0; i2 < packets.length; i2++) {
      const packet = packets[i2];
      const lastPacket = i2 === packets.length - 1;
      encodePacket(packet, this.supportsBinary, (data) => {
        try {
          this.doWrite(packet, data);
        } catch (e2) {
        }
        if (lastPacket) {
          nextTick(() => {
            this.writable = true;
            this.emitReserved("drain");
          }, this.setTimeoutFn);
        }
      });
    }
  }
  doClose() {
    if (typeof this.ws !== "undefined") {
      this.ws.onerror = () => {
      };
      this.ws.close();
      this.ws = null;
    }
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const schema = this.opts.secure ? "wss" : "ws";
    const query = this.query || {};
    if (this.opts.timestampRequests) {
      query[this.opts.timestampParam] = randomString();
    }
    if (!this.supportsBinary) {
      query.b64 = 1;
    }
    return this.createUri(schema, query);
  }
}
const WebSocketCtor = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
class WS extends BaseWS {
  createSocket(uri, protocols, opts) {
    return !isReactNative ? protocols ? new WebSocketCtor(uri, protocols) : new WebSocketCtor(uri) : new WebSocketCtor(uri, protocols, opts);
  }
  doWrite(_packet, data) {
    this.ws.send(data);
  }
}
class WT extends Transport {
  get name() {
    return "webtransport";
  }
  doOpen() {
    try {
      this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
    } catch (err) {
      return this.emitReserved("error", err);
    }
    this._transport.closed.then(() => {
      this.onClose();
    }).catch((err) => {
      this.onError("webtransport error", err);
    });
    this._transport.ready.then(() => {
      this._transport.createBidirectionalStream().then((stream) => {
        const decoderStream = createPacketDecoderStream(Number.MAX_SAFE_INTEGER, this.socket.binaryType);
        const reader = stream.readable.pipeThrough(decoderStream).getReader();
        const encoderStream = createPacketEncoderStream();
        encoderStream.readable.pipeTo(stream.writable);
        this._writer = encoderStream.writable.getWriter();
        const read = () => {
          reader.read().then(({ done, value: value2 }) => {
            if (done) {
              return;
            }
            this.onPacket(value2);
            read();
          }).catch((err) => {
          });
        };
        read();
        const packet = { type: "open" };
        if (this.query.sid) {
          packet.data = `{"sid":"${this.query.sid}"}`;
        }
        this._writer.write(packet).then(() => this.onOpen());
      });
    });
  }
  write(packets) {
    this.writable = false;
    for (let i2 = 0; i2 < packets.length; i2++) {
      const packet = packets[i2];
      const lastPacket = i2 === packets.length - 1;
      this._writer.write(packet).then(() => {
        if (lastPacket) {
          nextTick(() => {
            this.writable = true;
            this.emitReserved("drain");
          }, this.setTimeoutFn);
        }
      });
    }
  }
  doClose() {
    var _a;
    (_a = this._transport) === null || _a === void 0 ? void 0 : _a.close();
  }
}
const transports = {
  websocket: WS,
  webtransport: WT,
  polling: XHR
};
const re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
const parts = [
  "source",
  "protocol",
  "authority",
  "userInfo",
  "user",
  "password",
  "host",
  "port",
  "relative",
  "path",
  "directory",
  "file",
  "query",
  "anchor"
];
function parse(str) {
  if (str.length > 8e3) {
    throw "URI too long";
  }
  const src = str, b2 = str.indexOf("["), e2 = str.indexOf("]");
  if (b2 != -1 && e2 != -1) {
    str = str.substring(0, b2) + str.substring(b2, e2).replace(/:/g, ";") + str.substring(e2, str.length);
  }
  let m2 = re.exec(str || ""), uri = {}, i2 = 14;
  while (i2--) {
    uri[parts[i2]] = m2[i2] || "";
  }
  if (b2 != -1 && e2 != -1) {
    uri.source = src;
    uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
    uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
    uri.ipv6uri = true;
  }
  uri.pathNames = pathNames(uri, uri["path"]);
  uri.queryKey = queryKey(uri, uri["query"]);
  return uri;
}
function pathNames(obj, path) {
  const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
  if (path.slice(0, 1) == "/" || path.length === 0) {
    names.splice(0, 1);
  }
  if (path.slice(-1) == "/") {
    names.splice(names.length - 1, 1);
  }
  return names;
}
function queryKey(uri, query) {
  const data = {};
  query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
    if ($1) {
      data[$1] = $2;
    }
  });
  return data;
}
const withEventListeners = typeof addEventListener === "function" && typeof removeEventListener === "function";
const OFFLINE_EVENT_LISTENERS = [];
if (withEventListeners) {
  addEventListener("offline", () => {
    OFFLINE_EVENT_LISTENERS.forEach((listener) => listener());
  }, false);
}
class SocketWithoutUpgrade extends Emitter {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(uri, opts) {
    super();
    this.binaryType = defaultBinaryType;
    this.writeBuffer = [];
    this._prevBufferLen = 0;
    this._pingInterval = -1;
    this._pingTimeout = -1;
    this._maxPayload = -1;
    this._pingTimeoutTime = Infinity;
    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = null;
    }
    if (uri) {
      const parsedUri = parse(uri);
      opts.hostname = parsedUri.host;
      opts.secure = parsedUri.protocol === "https" || parsedUri.protocol === "wss";
      opts.port = parsedUri.port;
      if (parsedUri.query)
        opts.query = parsedUri.query;
    } else if (opts.host) {
      opts.hostname = parse(opts.host).host;
    }
    installTimerFunctions(this, opts);
    this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
    if (opts.hostname && !opts.port) {
      opts.port = this.secure ? "443" : "80";
    }
    this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
    this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
    this.transports = [];
    this._transportsByName = {};
    opts.transports.forEach((t2) => {
      const transportName = t2.prototype.name;
      this.transports.push(transportName);
      this._transportsByName[transportName] = t2;
    });
    this.opts = Object.assign({
      path: "/engine.io",
      agent: false,
      withCredentials: false,
      upgrade: true,
      timestampParam: "t",
      rememberUpgrade: false,
      addTrailingSlash: true,
      rejectUnauthorized: true,
      perMessageDeflate: {
        threshold: 1024
      },
      transportOptions: {},
      closeOnBeforeunload: false
    }, opts);
    this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : "");
    if (typeof this.opts.query === "string") {
      this.opts.query = decode(this.opts.query);
    }
    if (withEventListeners) {
      if (this.opts.closeOnBeforeunload) {
        this._beforeunloadEventListener = () => {
          if (this.transport) {
            this.transport.removeAllListeners();
            this.transport.close();
          }
        };
        addEventListener("beforeunload", this._beforeunloadEventListener, false);
      }
      if (this.hostname !== "localhost") {
        this._offlineEventListener = () => {
          this._onClose("transport close", {
            description: "network connection lost"
          });
        };
        OFFLINE_EVENT_LISTENERS.push(this._offlineEventListener);
      }
    }
    if (this.opts.withCredentials) {
      this._cookieJar = createCookieJar();
    }
    this._open();
  }
  /**
   * Creates transport of the given type.
   *
   * @param {String} name - transport name
   * @return {Transport}
   * @private
   */
  createTransport(name) {
    const query = Object.assign({}, this.opts.query);
    query.EIO = protocol$1;
    query.transport = name;
    if (this.id)
      query.sid = this.id;
    const opts = Object.assign({}, this.opts, {
      query,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port
    }, this.opts.transportOptions[name]);
    return new this._transportsByName[name](opts);
  }
  /**
   * Initializes transport to use and starts probe.
   *
   * @private
   */
  _open() {
    if (this.transports.length === 0) {
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    }
    const transportName = this.opts.rememberUpgrade && SocketWithoutUpgrade.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
    this.readyState = "opening";
    const transport = this.createTransport(transportName);
    transport.open();
    this.setTransport(transport);
  }
  /**
   * Sets the current transport. Disables the existing one (if any).
   *
   * @private
   */
  setTransport(transport) {
    if (this.transport) {
      this.transport.removeAllListeners();
    }
    this.transport = transport;
    transport.on("drain", this._onDrain.bind(this)).on("packet", this._onPacket.bind(this)).on("error", this._onError.bind(this)).on("close", (reason) => this._onClose("transport close", reason));
  }
  /**
   * Called when connection is deemed open.
   *
   * @private
   */
  onOpen() {
    this.readyState = "open";
    SocketWithoutUpgrade.priorWebsocketSuccess = "websocket" === this.transport.name;
    this.emitReserved("open");
    this.flush();
  }
  /**
   * Handles a packet.
   *
   * @private
   */
  _onPacket(packet) {
    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
      this.emitReserved("packet", packet);
      this.emitReserved("heartbeat");
      switch (packet.type) {
        case "open":
          this.onHandshake(JSON.parse(packet.data));
          break;
        case "ping":
          this._sendPacket("pong");
          this.emitReserved("ping");
          this.emitReserved("pong");
          this._resetPingTimeout();
          break;
        case "error":
          const err = new Error("server error");
          err.code = packet.data;
          this._onError(err);
          break;
        case "message":
          this.emitReserved("data", packet.data);
          this.emitReserved("message", packet.data);
          break;
      }
    }
  }
  /**
   * Called upon handshake completion.
   *
   * @param {Object} data - handshake obj
   * @private
   */
  onHandshake(data) {
    this.emitReserved("handshake", data);
    this.id = data.sid;
    this.transport.query.sid = data.sid;
    this._pingInterval = data.pingInterval;
    this._pingTimeout = data.pingTimeout;
    this._maxPayload = data.maxPayload;
    this.onOpen();
    if ("closed" === this.readyState)
      return;
    this._resetPingTimeout();
  }
  /**
   * Sets and resets ping timeout timer based on server pings.
   *
   * @private
   */
  _resetPingTimeout() {
    this.clearTimeoutFn(this._pingTimeoutTimer);
    const delay = this._pingInterval + this._pingTimeout;
    this._pingTimeoutTime = Date.now() + delay;
    this._pingTimeoutTimer = this.setTimeoutFn(() => {
      this._onClose("ping timeout");
    }, delay);
    if (this.opts.autoUnref) {
      this._pingTimeoutTimer.unref();
    }
  }
  /**
   * Called on `drain` event
   *
   * @private
   */
  _onDrain() {
    this.writeBuffer.splice(0, this._prevBufferLen);
    this._prevBufferLen = 0;
    if (0 === this.writeBuffer.length) {
      this.emitReserved("drain");
    } else {
      this.flush();
    }
  }
  /**
   * Flush write buffers.
   *
   * @private
   */
  flush() {
    if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
      const packets = this._getWritablePackets();
      this.transport.send(packets);
      this._prevBufferLen = packets.length;
      this.emitReserved("flush");
    }
  }
  /**
   * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
   * long-polling)
   *
   * @private
   */
  _getWritablePackets() {
    const shouldCheckPayloadSize = this._maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1;
    if (!shouldCheckPayloadSize) {
      return this.writeBuffer;
    }
    let payloadSize = 1;
    for (let i2 = 0; i2 < this.writeBuffer.length; i2++) {
      const data = this.writeBuffer[i2].data;
      if (data) {
        payloadSize += byteLength(data);
      }
      if (i2 > 0 && payloadSize > this._maxPayload) {
        return this.writeBuffer.slice(0, i2);
      }
      payloadSize += 2;
    }
    return this.writeBuffer;
  }
  /**
   * Checks whether the heartbeat timer has expired but the socket has not yet been notified.
   *
   * Note: this method is private for now because it does not really fit the WebSocket API, but if we put it in the
   * `write()` method then the message would not be buffered by the Socket.IO client.
   *
   * @return {boolean}
   * @private
   */
  /* private */
  _hasPingExpired() {
    if (!this._pingTimeoutTime)
      return true;
    const hasExpired = Date.now() > this._pingTimeoutTime;
    if (hasExpired) {
      this._pingTimeoutTime = 0;
      nextTick(() => {
        this._onClose("ping timeout");
      }, this.setTimeoutFn);
    }
    return hasExpired;
  }
  /**
   * Sends a message.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @return {Socket} for chaining.
   */
  write(msg, options, fn) {
    this._sendPacket("message", msg, options, fn);
    return this;
  }
  /**
   * Sends a message. Alias of {@link Socket#write}.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @return {Socket} for chaining.
   */
  send(msg, options, fn) {
    this._sendPacket("message", msg, options, fn);
    return this;
  }
  /**
   * Sends a packet.
   *
   * @param {String} type: packet type.
   * @param {String} data.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @private
   */
  _sendPacket(type, data, options, fn) {
    if ("function" === typeof data) {
      fn = data;
      data = void 0;
    }
    if ("function" === typeof options) {
      fn = options;
      options = null;
    }
    if ("closing" === this.readyState || "closed" === this.readyState) {
      return;
    }
    options = options || {};
    options.compress = false !== options.compress;
    const packet = {
      type,
      data,
      options
    };
    this.emitReserved("packetCreate", packet);
    this.writeBuffer.push(packet);
    if (fn)
      this.once("flush", fn);
    this.flush();
  }
  /**
   * Closes the connection.
   */
  close() {
    const close = () => {
      this._onClose("forced close");
      this.transport.close();
    };
    const cleanupAndClose = () => {
      this.off("upgrade", cleanupAndClose);
      this.off("upgradeError", cleanupAndClose);
      close();
    };
    const waitForUpgrade = () => {
      this.once("upgrade", cleanupAndClose);
      this.once("upgradeError", cleanupAndClose);
    };
    if ("opening" === this.readyState || "open" === this.readyState) {
      this.readyState = "closing";
      if (this.writeBuffer.length) {
        this.once("drain", () => {
          if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        });
      } else if (this.upgrading) {
        waitForUpgrade();
      } else {
        close();
      }
    }
    return this;
  }
  /**
   * Called upon transport error
   *
   * @private
   */
  _onError(err) {
    SocketWithoutUpgrade.priorWebsocketSuccess = false;
    if (this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening") {
      this.transports.shift();
      return this._open();
    }
    this.emitReserved("error", err);
    this._onClose("transport error", err);
  }
  /**
   * Called upon transport close.
   *
   * @private
   */
  _onClose(reason, description) {
    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
      this.clearTimeoutFn(this._pingTimeoutTimer);
      this.transport.removeAllListeners("close");
      this.transport.close();
      this.transport.removeAllListeners();
      if (withEventListeners) {
        if (this._beforeunloadEventListener) {
          removeEventListener("beforeunload", this._beforeunloadEventListener, false);
        }
        if (this._offlineEventListener) {
          const i2 = OFFLINE_EVENT_LISTENERS.indexOf(this._offlineEventListener);
          if (i2 !== -1) {
            OFFLINE_EVENT_LISTENERS.splice(i2, 1);
          }
        }
      }
      this.readyState = "closed";
      this.id = null;
      this.emitReserved("close", reason, description);
      this.writeBuffer = [];
      this._prevBufferLen = 0;
    }
  }
}
SocketWithoutUpgrade.protocol = protocol$1;
class SocketWithUpgrade extends SocketWithoutUpgrade {
  constructor() {
    super(...arguments);
    this._upgrades = [];
  }
  onOpen() {
    super.onOpen();
    if ("open" === this.readyState && this.opts.upgrade) {
      for (let i2 = 0; i2 < this._upgrades.length; i2++) {
        this._probe(this._upgrades[i2]);
      }
    }
  }
  /**
   * Probes a transport.
   *
   * @param {String} name - transport name
   * @private
   */
  _probe(name) {
    let transport = this.createTransport(name);
    let failed = false;
    SocketWithoutUpgrade.priorWebsocketSuccess = false;
    const onTransportOpen = () => {
      if (failed)
        return;
      transport.send([{ type: "ping", data: "probe" }]);
      transport.once("packet", (msg) => {
        if (failed)
          return;
        if ("pong" === msg.type && "probe" === msg.data) {
          this.upgrading = true;
          this.emitReserved("upgrading", transport);
          if (!transport)
            return;
          SocketWithoutUpgrade.priorWebsocketSuccess = "websocket" === transport.name;
          this.transport.pause(() => {
            if (failed)
              return;
            if ("closed" === this.readyState)
              return;
            cleanup();
            this.setTransport(transport);
            transport.send([{ type: "upgrade" }]);
            this.emitReserved("upgrade", transport);
            transport = null;
            this.upgrading = false;
            this.flush();
          });
        } else {
          const err = new Error("probe error");
          err.transport = transport.name;
          this.emitReserved("upgradeError", err);
        }
      });
    };
    function freezeTransport() {
      if (failed)
        return;
      failed = true;
      cleanup();
      transport.close();
      transport = null;
    }
    const onerror = (err) => {
      const error = new Error("probe error: " + err);
      error.transport = transport.name;
      freezeTransport();
      this.emitReserved("upgradeError", error);
    };
    function onTransportClose() {
      onerror("transport closed");
    }
    function onclose() {
      onerror("socket closed");
    }
    function onupgrade(to) {
      if (transport && to.name !== transport.name) {
        freezeTransport();
      }
    }
    const cleanup = () => {
      transport.removeListener("open", onTransportOpen);
      transport.removeListener("error", onerror);
      transport.removeListener("close", onTransportClose);
      this.off("close", onclose);
      this.off("upgrading", onupgrade);
    };
    transport.once("open", onTransportOpen);
    transport.once("error", onerror);
    transport.once("close", onTransportClose);
    this.once("close", onclose);
    this.once("upgrading", onupgrade);
    if (this._upgrades.indexOf("webtransport") !== -1 && name !== "webtransport") {
      this.setTimeoutFn(() => {
        if (!failed) {
          transport.open();
        }
      }, 200);
    } else {
      transport.open();
    }
  }
  onHandshake(data) {
    this._upgrades = this._filterUpgrades(data.upgrades);
    super.onHandshake(data);
  }
  /**
   * Filters upgrades, returning only those matching client transports.
   *
   * @param {Array} upgrades - server upgrades
   * @private
   */
  _filterUpgrades(upgrades) {
    const filteredUpgrades = [];
    for (let i2 = 0; i2 < upgrades.length; i2++) {
      if (~this.transports.indexOf(upgrades[i2]))
        filteredUpgrades.push(upgrades[i2]);
    }
    return filteredUpgrades;
  }
}
let Socket$1 = class Socket extends SocketWithUpgrade {
  constructor(uri, opts = {}) {
    const o2 = typeof uri === "object" ? uri : opts;
    if (!o2.transports || o2.transports && typeof o2.transports[0] === "string") {
      o2.transports = (o2.transports || ["polling", "websocket", "webtransport"]).map((transportName) => transports[transportName]).filter((t2) => !!t2);
    }
    super(uri, o2);
  }
};
function url(uri, path = "", loc) {
  let obj = uri;
  loc = loc || typeof location !== "undefined" && location;
  if (null == uri)
    uri = loc.protocol + "//" + loc.host;
  if (typeof uri === "string") {
    if ("/" === uri.charAt(0)) {
      if ("/" === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }
    if (!/^(https?|wss?):\/\//.test(uri)) {
      if ("undefined" !== typeof loc) {
        uri = loc.protocol + "//" + uri;
      } else {
        uri = "https://" + uri;
      }
    }
    obj = parse(uri);
  }
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = "80";
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = "443";
    }
  }
  obj.path = obj.path || "/";
  const ipv6 = obj.host.indexOf(":") !== -1;
  const host = ipv6 ? "[" + obj.host + "]" : obj.host;
  obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
  obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
  return obj;
}
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const isView = (obj) => {
  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
};
const toString2 = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString2.call(Blob) === "[object BlobConstructor]";
const withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString2.call(File) === "[object FileConstructor]";
function isBinary(obj) {
  return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
}
function hasBinary(obj, toJSON2) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  if (Array.isArray(obj)) {
    for (let i2 = 0, l2 = obj.length; i2 < l2; i2++) {
      if (hasBinary(obj[i2])) {
        return true;
      }
    }
    return false;
  }
  if (isBinary(obj)) {
    return true;
  }
  if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }
  return false;
}
function deconstructPacket(packet) {
  const buffers = [];
  const packetData = packet.data;
  const pack = packet;
  pack.data = _deconstructPacket(packetData, buffers);
  pack.attachments = buffers.length;
  return { packet: pack, buffers };
}
function _deconstructPacket(data, buffers) {
  if (!data)
    return data;
  if (isBinary(data)) {
    const placeholder = { _placeholder: true, num: buffers.length };
    buffers.push(data);
    return placeholder;
  } else if (Array.isArray(data)) {
    const newData = new Array(data.length);
    for (let i2 = 0; i2 < data.length; i2++) {
      newData[i2] = _deconstructPacket(data[i2], buffers);
    }
    return newData;
  } else if (typeof data === "object" && !(data instanceof Date)) {
    const newData = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        newData[key] = _deconstructPacket(data[key], buffers);
      }
    }
    return newData;
  }
  return data;
}
function reconstructPacket(packet, buffers) {
  packet.data = _reconstructPacket(packet.data, buffers);
  delete packet.attachments;
  return packet;
}
function _reconstructPacket(data, buffers) {
  if (!data)
    return data;
  if (data && data._placeholder === true) {
    const isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
    if (isIndexValid) {
      return buffers[data.num];
    } else {
      throw new Error("illegal attachments");
    }
  } else if (Array.isArray(data)) {
    for (let i2 = 0; i2 < data.length; i2++) {
      data[i2] = _reconstructPacket(data[i2], buffers);
    }
  } else if (typeof data === "object") {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        data[key] = _reconstructPacket(data[key], buffers);
      }
    }
  }
  return data;
}
const RESERVED_EVENTS$1 = [
  "connect",
  "connect_error",
  "disconnect",
  "disconnecting",
  "newListener",
  "removeListener"
  // used by the Node.js EventEmitter
];
const protocol = 5;
var PacketType;
(function(PacketType2) {
  PacketType2[PacketType2["CONNECT"] = 0] = "CONNECT";
  PacketType2[PacketType2["DISCONNECT"] = 1] = "DISCONNECT";
  PacketType2[PacketType2["EVENT"] = 2] = "EVENT";
  PacketType2[PacketType2["ACK"] = 3] = "ACK";
  PacketType2[PacketType2["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
  PacketType2[PacketType2["BINARY_EVENT"] = 5] = "BINARY_EVENT";
  PacketType2[PacketType2["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (PacketType = {}));
class Encoder {
  /**
   * Encoder constructor
   *
   * @param {function} replacer - custom replacer to pass down to JSON.parse
   */
  constructor(replacer) {
    this.replacer = replacer;
  }
  /**
   * Encode a packet as a single string if non-binary, or as a
   * buffer sequence, depending on packet type.
   *
   * @param {Object} obj - packet object
   */
  encode(obj) {
    if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
      if (hasBinary(obj)) {
        return this.encodeAsBinary({
          type: obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
          nsp: obj.nsp,
          data: obj.data,
          id: obj.id
        });
      }
    }
    return [this.encodeAsString(obj)];
  }
  /**
   * Encode packet as string.
   */
  encodeAsString(obj) {
    let str = "" + obj.type;
    if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
      str += obj.attachments + "-";
    }
    if (obj.nsp && "/" !== obj.nsp) {
      str += obj.nsp + ",";
    }
    if (null != obj.id) {
      str += obj.id;
    }
    if (null != obj.data) {
      str += JSON.stringify(obj.data, this.replacer);
    }
    return str;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(obj) {
    const deconstruction = deconstructPacket(obj);
    const pack = this.encodeAsString(deconstruction.packet);
    const buffers = deconstruction.buffers;
    buffers.unshift(pack);
    return buffers;
  }
}
function isObject(value2) {
  return Object.prototype.toString.call(value2) === "[object Object]";
}
class Decoder extends Emitter {
  /**
   * Decoder constructor
   *
   * @param {function} reviver - custom reviver to pass down to JSON.stringify
   */
  constructor(reviver) {
    super();
    this.reviver = reviver;
  }
  /**
   * Decodes an encoded packet string into packet JSON.
   *
   * @param {String} obj - encoded packet
   */
  add(obj) {
    let packet;
    if (typeof obj === "string") {
      if (this.reconstructor) {
        throw new Error("got plaintext data when reconstructing a packet");
      }
      packet = this.decodeString(obj);
      const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
      if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
        packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
        this.reconstructor = new BinaryReconstructor(packet);
        if (packet.attachments === 0) {
          super.emitReserved("decoded", packet);
        }
      } else {
        super.emitReserved("decoded", packet);
      }
    } else if (isBinary(obj) || obj.base64) {
      if (!this.reconstructor) {
        throw new Error("got binary data when not reconstructing a packet");
      } else {
        packet = this.reconstructor.takeBinaryData(obj);
        if (packet) {
          this.reconstructor = null;
          super.emitReserved("decoded", packet);
        }
      }
    } else {
      throw new Error("Unknown type: " + obj);
    }
  }
  /**
   * Decode a packet String (JSON data)
   *
   * @param {String} str
   * @return {Object} packet
   */
  decodeString(str) {
    let i2 = 0;
    const p2 = {
      type: Number(str.charAt(0))
    };
    if (PacketType[p2.type] === void 0) {
      throw new Error("unknown packet type " + p2.type);
    }
    if (p2.type === PacketType.BINARY_EVENT || p2.type === PacketType.BINARY_ACK) {
      const start = i2 + 1;
      while (str.charAt(++i2) !== "-" && i2 != str.length) {
      }
      const buf = str.substring(start, i2);
      if (buf != Number(buf) || str.charAt(i2) !== "-") {
        throw new Error("Illegal attachments");
      }
      p2.attachments = Number(buf);
    }
    if ("/" === str.charAt(i2 + 1)) {
      const start = i2 + 1;
      while (++i2) {
        const c2 = str.charAt(i2);
        if ("," === c2)
          break;
        if (i2 === str.length)
          break;
      }
      p2.nsp = str.substring(start, i2);
    } else {
      p2.nsp = "/";
    }
    const next = str.charAt(i2 + 1);
    if ("" !== next && Number(next) == next) {
      const start = i2 + 1;
      while (++i2) {
        const c2 = str.charAt(i2);
        if (null == c2 || Number(c2) != c2) {
          --i2;
          break;
        }
        if (i2 === str.length)
          break;
      }
      p2.id = Number(str.substring(start, i2 + 1));
    }
    if (str.charAt(++i2)) {
      const payload = this.tryParse(str.substr(i2));
      if (Decoder.isPayloadValid(p2.type, payload)) {
        p2.data = payload;
      } else {
        throw new Error("invalid payload");
      }
    }
    return p2;
  }
  tryParse(str) {
    try {
      return JSON.parse(str, this.reviver);
    } catch (e2) {
      return false;
    }
  }
  static isPayloadValid(type, payload) {
    switch (type) {
      case PacketType.CONNECT:
        return isObject(payload);
      case PacketType.DISCONNECT:
        return payload === void 0;
      case PacketType.CONNECT_ERROR:
        return typeof payload === "string" || isObject(payload);
      case PacketType.EVENT:
      case PacketType.BINARY_EVENT:
        return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS$1.indexOf(payload[0]) === -1);
      case PacketType.ACK:
      case PacketType.BINARY_ACK:
        return Array.isArray(payload);
    }
  }
  /**
   * Deallocates a parser's resources
   */
  destroy() {
    if (this.reconstructor) {
      this.reconstructor.finishedReconstruction();
      this.reconstructor = null;
    }
  }
}
class BinaryReconstructor {
  constructor(packet) {
    this.packet = packet;
    this.buffers = [];
    this.reconPack = packet;
  }
  /**
   * Method to be called when binary data received from connection
   * after a BINARY_EVENT packet.
   *
   * @param {Buffer | ArrayBuffer} binData - the raw binary data received
   * @return {null | Object} returns null if more binary data is expected or
   *   a reconstructed packet object if all buffers have been received.
   */
  takeBinaryData(binData) {
    this.buffers.push(binData);
    if (this.buffers.length === this.reconPack.attachments) {
      const packet = reconstructPacket(this.reconPack, this.buffers);
      this.finishedReconstruction();
      return packet;
    }
    return null;
  }
  /**
   * Cleans up binary packet reconstruction variables.
   */
  finishedReconstruction() {
    this.reconPack = null;
    this.buffers = [];
  }
}
const parser = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Decoder,
  Encoder,
  get PacketType() {
    return PacketType;
  },
  protocol
}, Symbol.toStringTag, { value: "Module" }));
function on(obj, ev, fn) {
  obj.on(ev, fn);
  return function subDestroy() {
    obj.off(ev, fn);
  };
}
const RESERVED_EVENTS = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
class Socket2 extends Emitter {
  /**
   * `Socket` constructor.
   */
  constructor(io, nsp, opts) {
    super();
    this.connected = false;
    this.recovered = false;
    this.receiveBuffer = [];
    this.sendBuffer = [];
    this._queue = [];
    this._queueSeq = 0;
    this.ids = 0;
    this.acks = {};
    this.flags = {};
    this.io = io;
    this.nsp = nsp;
    if (opts && opts.auth) {
      this.auth = opts.auth;
    }
    this._opts = Object.assign({}, opts);
    if (this.io._autoConnect)
      this.open();
  }
  /**
   * Whether the socket is currently disconnected
   *
   * @example
   * const socket = io();
   *
   * socket.on("connect", () => {
   *   console.log(socket.disconnected); // false
   * });
   *
   * socket.on("disconnect", () => {
   *   console.log(socket.disconnected); // true
   * });
   */
  get disconnected() {
    return !this.connected;
  }
  /**
   * Subscribe to open, close and packet events
   *
   * @private
   */
  subEvents() {
    if (this.subs)
      return;
    const io = this.io;
    this.subs = [
      on(io, "open", this.onopen.bind(this)),
      on(io, "packet", this.onpacket.bind(this)),
      on(io, "error", this.onerror.bind(this)),
      on(io, "close", this.onclose.bind(this))
    ];
  }
  /**
   * Whether the Socket will try to reconnect when its Manager connects or reconnects.
   *
   * @example
   * const socket = io();
   *
   * console.log(socket.active); // true
   *
   * socket.on("disconnect", (reason) => {
   *   if (reason === "io server disconnect") {
   *     // the disconnection was initiated by the server, you need to manually reconnect
   *     console.log(socket.active); // false
   *   }
   *   // else the socket will automatically try to reconnect
   *   console.log(socket.active); // true
   * });
   */
  get active() {
    return !!this.subs;
  }
  /**
   * "Opens" the socket.
   *
   * @example
   * const socket = io({
   *   autoConnect: false
   * });
   *
   * socket.connect();
   */
  connect() {
    if (this.connected)
      return this;
    this.subEvents();
    if (!this.io["_reconnecting"])
      this.io.open();
    if ("open" === this.io._readyState)
      this.onopen();
    return this;
  }
  /**
   * Alias for {@link connect()}.
   */
  open() {
    return this.connect();
  }
  /**
   * Sends a `message` event.
   *
   * This method mimics the WebSocket.send() method.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
   *
   * @example
   * socket.send("hello");
   *
   * // this is equivalent to
   * socket.emit("message", "hello");
   *
   * @return self
   */
  send(...args) {
    args.unshift("message");
    this.emit.apply(this, args);
    return this;
  }
  /**
   * Override `emit`.
   * If the event is in `events`, it's emitted normally.
   *
   * @example
   * socket.emit("hello", "world");
   *
   * // all serializable datastructures are supported (no need to call JSON.stringify)
   * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
   *
   * // with an acknowledgement from the server
   * socket.emit("hello", "world", (val) => {
   *   // ...
   * });
   *
   * @return self
   */
  emit(ev, ...args) {
    var _a, _b, _c;
    if (RESERVED_EVENTS.hasOwnProperty(ev)) {
      throw new Error('"' + ev.toString() + '" is a reserved event name');
    }
    args.unshift(ev);
    if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
      this._addToQueue(args);
      return this;
    }
    const packet = {
      type: PacketType.EVENT,
      data: args
    };
    packet.options = {};
    packet.options.compress = this.flags.compress !== false;
    if ("function" === typeof args[args.length - 1]) {
      const id2 = this.ids++;
      const ack = args.pop();
      this._registerAckCallback(id2, ack);
      packet.id = id2;
    }
    const isTransportWritable = (_b = (_a = this.io.engine) === null || _a === void 0 ? void 0 : _a.transport) === null || _b === void 0 ? void 0 : _b.writable;
    const isConnected = this.connected && !((_c = this.io.engine) === null || _c === void 0 ? void 0 : _c._hasPingExpired());
    const discardPacket = this.flags.volatile && !isTransportWritable;
    if (discardPacket) ;
    else if (isConnected) {
      this.notifyOutgoingListeners(packet);
      this.packet(packet);
    } else {
      this.sendBuffer.push(packet);
    }
    this.flags = {};
    return this;
  }
  /**
   * @private
   */
  _registerAckCallback(id2, ack) {
    var _a;
    const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
    if (timeout === void 0) {
      this.acks[id2] = ack;
      return;
    }
    const timer = this.io.setTimeoutFn(() => {
      delete this.acks[id2];
      for (let i2 = 0; i2 < this.sendBuffer.length; i2++) {
        if (this.sendBuffer[i2].id === id2) {
          this.sendBuffer.splice(i2, 1);
        }
      }
      ack.call(this, new Error("operation has timed out"));
    }, timeout);
    const fn = (...args) => {
      this.io.clearTimeoutFn(timer);
      ack.apply(this, args);
    };
    fn.withError = true;
    this.acks[id2] = fn;
  }
  /**
   * Emits an event and waits for an acknowledgement
   *
   * @example
   * // without timeout
   * const response = await socket.emitWithAck("hello", "world");
   *
   * // with a specific timeout
   * try {
   *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
   * } catch (err) {
   *   // the server did not acknowledge the event in the given delay
   * }
   *
   * @return a Promise that will be fulfilled when the server acknowledges the event
   */
  emitWithAck(ev, ...args) {
    return new Promise((resolve, reject) => {
      const fn = (arg1, arg2) => {
        return arg1 ? reject(arg1) : resolve(arg2);
      };
      fn.withError = true;
      args.push(fn);
      this.emit(ev, ...args);
    });
  }
  /**
   * Add the packet to the queue.
   * @param args
   * @private
   */
  _addToQueue(args) {
    let ack;
    if (typeof args[args.length - 1] === "function") {
      ack = args.pop();
    }
    const packet = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: false,
      args,
      flags: Object.assign({ fromQueue: true }, this.flags)
    };
    args.push((err, ...responseArgs) => {
      if (packet !== this._queue[0]) {
        return;
      }
      const hasError = err !== null;
      if (hasError) {
        if (packet.tryCount > this._opts.retries) {
          this._queue.shift();
          if (ack) {
            ack(err);
          }
        }
      } else {
        this._queue.shift();
        if (ack) {
          ack(null, ...responseArgs);
        }
      }
      packet.pending = false;
      return this._drainQueue();
    });
    this._queue.push(packet);
    this._drainQueue();
  }
  /**
   * Send the first packet of the queue, and wait for an acknowledgement from the server.
   * @param force - whether to resend a packet that has not been acknowledged yet
   *
   * @private
   */
  _drainQueue(force = false) {
    if (!this.connected || this._queue.length === 0) {
      return;
    }
    const packet = this._queue[0];
    if (packet.pending && !force) {
      return;
    }
    packet.pending = true;
    packet.tryCount++;
    this.flags = packet.flags;
    this.emit.apply(this, packet.args);
  }
  /**
   * Sends a packet.
   *
   * @param packet
   * @private
   */
  packet(packet) {
    packet.nsp = this.nsp;
    this.io._packet(packet);
  }
  /**
   * Called upon engine `open`.
   *
   * @private
   */
  onopen() {
    if (typeof this.auth == "function") {
      this.auth((data) => {
        this._sendConnectPacket(data);
      });
    } else {
      this._sendConnectPacket(this.auth);
    }
  }
  /**
   * Sends a CONNECT packet to initiate the Socket.IO session.
   *
   * @param data
   * @private
   */
  _sendConnectPacket(data) {
    this.packet({
      type: PacketType.CONNECT,
      data: this._pid ? Object.assign({ pid: this._pid, offset: this._lastOffset }, data) : data
    });
  }
  /**
   * Called upon engine or manager `error`.
   *
   * @param err
   * @private
   */
  onerror(err) {
    if (!this.connected) {
      this.emitReserved("connect_error", err);
    }
  }
  /**
   * Called upon engine `close`.
   *
   * @param reason
   * @param description
   * @private
   */
  onclose(reason, description) {
    this.connected = false;
    delete this.id;
    this.emitReserved("disconnect", reason, description);
    this._clearAcks();
  }
  /**
   * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
   * the server.
   *
   * @private
   */
  _clearAcks() {
    Object.keys(this.acks).forEach((id2) => {
      const isBuffered = this.sendBuffer.some((packet) => String(packet.id) === id2);
      if (!isBuffered) {
        const ack = this.acks[id2];
        delete this.acks[id2];
        if (ack.withError) {
          ack.call(this, new Error("socket has been disconnected"));
        }
      }
    });
  }
  /**
   * Called with socket packet.
   *
   * @param packet
   * @private
   */
  onpacket(packet) {
    const sameNamespace = packet.nsp === this.nsp;
    if (!sameNamespace)
      return;
    switch (packet.type) {
      case PacketType.CONNECT:
        if (packet.data && packet.data.sid) {
          this.onconnect(packet.data.sid, packet.data.pid);
        } else {
          this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
        }
        break;
      case PacketType.EVENT:
      case PacketType.BINARY_EVENT:
        this.onevent(packet);
        break;
      case PacketType.ACK:
      case PacketType.BINARY_ACK:
        this.onack(packet);
        break;
      case PacketType.DISCONNECT:
        this.ondisconnect();
        break;
      case PacketType.CONNECT_ERROR:
        this.destroy();
        const err = new Error(packet.data.message);
        err.data = packet.data.data;
        this.emitReserved("connect_error", err);
        break;
    }
  }
  /**
   * Called upon a server event.
   *
   * @param packet
   * @private
   */
  onevent(packet) {
    const args = packet.data || [];
    if (null != packet.id) {
      args.push(this.ack(packet.id));
    }
    if (this.connected) {
      this.emitEvent(args);
    } else {
      this.receiveBuffer.push(Object.freeze(args));
    }
  }
  emitEvent(args) {
    if (this._anyListeners && this._anyListeners.length) {
      const listeners = this._anyListeners.slice();
      for (const listener of listeners) {
        listener.apply(this, args);
      }
    }
    super.emit.apply(this, args);
    if (this._pid && args.length && typeof args[args.length - 1] === "string") {
      this._lastOffset = args[args.length - 1];
    }
  }
  /**
   * Produces an ack callback to emit with an event.
   *
   * @private
   */
  ack(id2) {
    const self2 = this;
    let sent = false;
    return function(...args) {
      if (sent)
        return;
      sent = true;
      self2.packet({
        type: PacketType.ACK,
        id: id2,
        data: args
      });
    };
  }
  /**
   * Called upon a server acknowledgement.
   *
   * @param packet
   * @private
   */
  onack(packet) {
    const ack = this.acks[packet.id];
    if (typeof ack !== "function") {
      return;
    }
    delete this.acks[packet.id];
    if (ack.withError) {
      packet.data.unshift(null);
    }
    ack.apply(this, packet.data);
  }
  /**
   * Called upon server connect.
   *
   * @private
   */
  onconnect(id2, pid) {
    this.id = id2;
    this.recovered = pid && this._pid === pid;
    this._pid = pid;
    this.connected = true;
    this.emitBuffered();
    this.emitReserved("connect");
    this._drainQueue(true);
  }
  /**
   * Emit buffered events (received and emitted).
   *
   * @private
   */
  emitBuffered() {
    this.receiveBuffer.forEach((args) => this.emitEvent(args));
    this.receiveBuffer = [];
    this.sendBuffer.forEach((packet) => {
      this.notifyOutgoingListeners(packet);
      this.packet(packet);
    });
    this.sendBuffer = [];
  }
  /**
   * Called upon server disconnect.
   *
   * @private
   */
  ondisconnect() {
    this.destroy();
    this.onclose("io server disconnect");
  }
  /**
   * Called upon forced client/server side disconnections,
   * this method ensures the manager stops tracking us and
   * that reconnections don't get triggered for this.
   *
   * @private
   */
  destroy() {
    if (this.subs) {
      this.subs.forEach((subDestroy) => subDestroy());
      this.subs = void 0;
    }
    this.io["_destroy"](this);
  }
  /**
   * Disconnects the socket manually. In that case, the socket will not try to reconnect.
   *
   * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
   *
   * @example
   * const socket = io();
   *
   * socket.on("disconnect", (reason) => {
   *   // console.log(reason); prints "io client disconnect"
   * });
   *
   * socket.disconnect();
   *
   * @return self
   */
  disconnect() {
    if (this.connected) {
      this.packet({ type: PacketType.DISCONNECT });
    }
    this.destroy();
    if (this.connected) {
      this.onclose("io client disconnect");
    }
    return this;
  }
  /**
   * Alias for {@link disconnect()}.
   *
   * @return self
   */
  close() {
    return this.disconnect();
  }
  /**
   * Sets the compress flag.
   *
   * @example
   * socket.compress(false).emit("hello");
   *
   * @param compress - if `true`, compresses the sending data
   * @return self
   */
  compress(compress) {
    this.flags.compress = compress;
    return this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
   * ready to send messages.
   *
   * @example
   * socket.volatile.emit("hello"); // the server may or may not receive it
   *
   * @returns self
   */
  get volatile() {
    this.flags.volatile = true;
    return this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
   * given number of milliseconds have elapsed without an acknowledgement from the server:
   *
   * @example
   * socket.timeout(5000).emit("my-event", (err) => {
   *   if (err) {
   *     // the server did not acknowledge the event in the given delay
   *   }
   * });
   *
   * @returns self
   */
  timeout(timeout) {
    this.flags.timeout = timeout;
    return this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * @example
   * socket.onAny((event, ...args) => {
   *   console.log(`got ${event}`);
   * });
   *
   * @param listener
   */
  onAny(listener) {
    this._anyListeners = this._anyListeners || [];
    this._anyListeners.push(listener);
    return this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * @example
   * socket.prependAny((event, ...args) => {
   *   console.log(`got event ${event}`);
   * });
   *
   * @param listener
   */
  prependAny(listener) {
    this._anyListeners = this._anyListeners || [];
    this._anyListeners.unshift(listener);
    return this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`got event ${event}`);
   * }
   *
   * socket.onAny(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAny(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAny();
   *
   * @param listener
   */
  offAny(listener) {
    if (!this._anyListeners) {
      return this;
    }
    if (listener) {
      const listeners = this._anyListeners;
      for (let i2 = 0; i2 < listeners.length; i2++) {
        if (listener === listeners[i2]) {
          listeners.splice(i2, 1);
          return this;
        }
      }
    } else {
      this._anyListeners = [];
    }
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAny() {
    return this._anyListeners || [];
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.onAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  onAnyOutgoing(listener) {
    this._anyOutgoingListeners = this._anyOutgoingListeners || [];
    this._anyOutgoingListeners.push(listener);
    return this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.prependAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  prependAnyOutgoing(listener) {
    this._anyOutgoingListeners = this._anyOutgoingListeners || [];
    this._anyOutgoingListeners.unshift(listener);
    return this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`sent event ${event}`);
   * }
   *
   * socket.onAnyOutgoing(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAnyOutgoing(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAnyOutgoing();
   *
   * @param [listener] - the catch-all listener (optional)
   */
  offAnyOutgoing(listener) {
    if (!this._anyOutgoingListeners) {
      return this;
    }
    if (listener) {
      const listeners = this._anyOutgoingListeners;
      for (let i2 = 0; i2 < listeners.length; i2++) {
        if (listener === listeners[i2]) {
          listeners.splice(i2, 1);
          return this;
        }
      }
    } else {
      this._anyOutgoingListeners = [];
    }
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  /**
   * Notify the listeners for each packet sent
   *
   * @param packet
   *
   * @private
   */
  notifyOutgoingListeners(packet) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const listeners = this._anyOutgoingListeners.slice();
      for (const listener of listeners) {
        listener.apply(this, packet.data);
      }
    }
  }
}
function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 1e4;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}
Backoff.prototype.duration = function() {
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand = Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};
Backoff.prototype.reset = function() {
  this.attempts = 0;
};
Backoff.prototype.setMin = function(min) {
  this.ms = min;
};
Backoff.prototype.setMax = function(max) {
  this.max = max;
};
Backoff.prototype.setJitter = function(jitter) {
  this.jitter = jitter;
};
class Manager extends Emitter {
  constructor(uri, opts) {
    var _a;
    super();
    this.nsps = {};
    this.subs = [];
    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = void 0;
    }
    opts = opts || {};
    opts.path = opts.path || "/socket.io";
    this.opts = opts;
    installTimerFunctions(this, opts);
    this.reconnection(opts.reconnection !== false);
    this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
    this.reconnectionDelay(opts.reconnectionDelay || 1e3);
    this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
    this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
    this.backoff = new Backoff({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    });
    this.timeout(null == opts.timeout ? 2e4 : opts.timeout);
    this._readyState = "closed";
    this.uri = uri;
    const _parser = opts.parser || parser;
    this.encoder = new _parser.Encoder();
    this.decoder = new _parser.Decoder();
    this._autoConnect = opts.autoConnect !== false;
    if (this._autoConnect)
      this.open();
  }
  reconnection(v2) {
    if (!arguments.length)
      return this._reconnection;
    this._reconnection = !!v2;
    if (!v2) {
      this.skipReconnect = true;
    }
    return this;
  }
  reconnectionAttempts(v2) {
    if (v2 === void 0)
      return this._reconnectionAttempts;
    this._reconnectionAttempts = v2;
    return this;
  }
  reconnectionDelay(v2) {
    var _a;
    if (v2 === void 0)
      return this._reconnectionDelay;
    this._reconnectionDelay = v2;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v2);
    return this;
  }
  randomizationFactor(v2) {
    var _a;
    if (v2 === void 0)
      return this._randomizationFactor;
    this._randomizationFactor = v2;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v2);
    return this;
  }
  reconnectionDelayMax(v2) {
    var _a;
    if (v2 === void 0)
      return this._reconnectionDelayMax;
    this._reconnectionDelayMax = v2;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v2);
    return this;
  }
  timeout(v2) {
    if (!arguments.length)
      return this._timeout;
    this._timeout = v2;
    return this;
  }
  /**
   * Starts trying to reconnect if reconnection is enabled and we have not
   * started reconnecting yet
   *
   * @private
   */
  maybeReconnectOnOpen() {
    if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
      this.reconnect();
    }
  }
  /**
   * Sets the current transport `socket`.
   *
   * @param {Function} fn - optional, callback
   * @return self
   * @public
   */
  open(fn) {
    if (~this._readyState.indexOf("open"))
      return this;
    this.engine = new Socket$1(this.uri, this.opts);
    const socket = this.engine;
    const self2 = this;
    this._readyState = "opening";
    this.skipReconnect = false;
    const openSubDestroy = on(socket, "open", function() {
      self2.onopen();
      fn && fn();
    });
    const onError = (err) => {
      this.cleanup();
      this._readyState = "closed";
      this.emitReserved("error", err);
      if (fn) {
        fn(err);
      } else {
        this.maybeReconnectOnOpen();
      }
    };
    const errorSub = on(socket, "error", onError);
    if (false !== this._timeout) {
      const timeout = this._timeout;
      const timer = this.setTimeoutFn(() => {
        openSubDestroy();
        onError(new Error("timeout"));
        socket.close();
      }, timeout);
      if (this.opts.autoUnref) {
        timer.unref();
      }
      this.subs.push(() => {
        this.clearTimeoutFn(timer);
      });
    }
    this.subs.push(openSubDestroy);
    this.subs.push(errorSub);
    return this;
  }
  /**
   * Alias for open()
   *
   * @return self
   * @public
   */
  connect(fn) {
    return this.open(fn);
  }
  /**
   * Called upon transport open.
   *
   * @private
   */
  onopen() {
    this.cleanup();
    this._readyState = "open";
    this.emitReserved("open");
    const socket = this.engine;
    this.subs.push(
      on(socket, "ping", this.onping.bind(this)),
      on(socket, "data", this.ondata.bind(this)),
      on(socket, "error", this.onerror.bind(this)),
      on(socket, "close", this.onclose.bind(this)),
      // @ts-ignore
      on(this.decoder, "decoded", this.ondecoded.bind(this))
    );
  }
  /**
   * Called upon a ping.
   *
   * @private
   */
  onping() {
    this.emitReserved("ping");
  }
  /**
   * Called with data.
   *
   * @private
   */
  ondata(data) {
    try {
      this.decoder.add(data);
    } catch (e2) {
      this.onclose("parse error", e2);
    }
  }
  /**
   * Called when parser fully decodes a packet.
   *
   * @private
   */
  ondecoded(packet) {
    nextTick(() => {
      this.emitReserved("packet", packet);
    }, this.setTimeoutFn);
  }
  /**
   * Called upon socket error.
   *
   * @private
   */
  onerror(err) {
    this.emitReserved("error", err);
  }
  /**
   * Creates a new socket for the given `nsp`.
   *
   * @return {Socket}
   * @public
   */
  socket(nsp, opts) {
    let socket = this.nsps[nsp];
    if (!socket) {
      socket = new Socket2(this, nsp, opts);
      this.nsps[nsp] = socket;
    } else if (this._autoConnect && !socket.active) {
      socket.connect();
    }
    return socket;
  }
  /**
   * Called upon a socket close.
   *
   * @param socket
   * @private
   */
  _destroy(socket) {
    const nsps = Object.keys(this.nsps);
    for (const nsp of nsps) {
      const socket2 = this.nsps[nsp];
      if (socket2.active) {
        return;
      }
    }
    this._close();
  }
  /**
   * Writes a packet.
   *
   * @param packet
   * @private
   */
  _packet(packet) {
    const encodedPackets = this.encoder.encode(packet);
    for (let i2 = 0; i2 < encodedPackets.length; i2++) {
      this.engine.write(encodedPackets[i2], packet.options);
    }
  }
  /**
   * Clean up transport subscriptions and packet buffer.
   *
   * @private
   */
  cleanup() {
    this.subs.forEach((subDestroy) => subDestroy());
    this.subs.length = 0;
    this.decoder.destroy();
  }
  /**
   * Close the current socket.
   *
   * @private
   */
  _close() {
    this.skipReconnect = true;
    this._reconnecting = false;
    this.onclose("forced close");
  }
  /**
   * Alias for close()
   *
   * @private
   */
  disconnect() {
    return this._close();
  }
  /**
   * Called when:
   *
   * - the low-level engine is closed
   * - the parser encountered a badly formatted packet
   * - all sockets are disconnected
   *
   * @private
   */
  onclose(reason, description) {
    var _a;
    this.cleanup();
    (_a = this.engine) === null || _a === void 0 ? void 0 : _a.close();
    this.backoff.reset();
    this._readyState = "closed";
    this.emitReserved("close", reason, description);
    if (this._reconnection && !this.skipReconnect) {
      this.reconnect();
    }
  }
  /**
   * Attempt a reconnection.
   *
   * @private
   */
  reconnect() {
    if (this._reconnecting || this.skipReconnect)
      return this;
    const self2 = this;
    if (this.backoff.attempts >= this._reconnectionAttempts) {
      this.backoff.reset();
      this.emitReserved("reconnect_failed");
      this._reconnecting = false;
    } else {
      const delay = this.backoff.duration();
      this._reconnecting = true;
      const timer = this.setTimeoutFn(() => {
        if (self2.skipReconnect)
          return;
        this.emitReserved("reconnect_attempt", self2.backoff.attempts);
        if (self2.skipReconnect)
          return;
        self2.open((err) => {
          if (err) {
            self2._reconnecting = false;
            self2.reconnect();
            this.emitReserved("reconnect_error", err);
          } else {
            self2.onreconnect();
          }
        });
      }, delay);
      if (this.opts.autoUnref) {
        timer.unref();
      }
      this.subs.push(() => {
        this.clearTimeoutFn(timer);
      });
    }
  }
  /**
   * Called upon successful reconnect.
   *
   * @private
   */
  onreconnect() {
    const attempt = this.backoff.attempts;
    this._reconnecting = false;
    this.backoff.reset();
    this.emitReserved("reconnect", attempt);
  }
}
const cache = {};
function lookup(uri, opts) {
  if (typeof uri === "object") {
    opts = uri;
    uri = void 0;
  }
  opts = opts || {};
  const parsed = url(uri, opts.path || "/socket.io");
  const source = parsed.source;
  const id2 = parsed.id;
  const path = parsed.path;
  const sameNamespace = cache[id2] && path in cache[id2]["nsps"];
  const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
  let io;
  if (newConnection) {
    io = new Manager(source, opts);
  } else {
    if (!cache[id2]) {
      cache[id2] = new Manager(source, opts);
    }
    io = cache[id2];
  }
  if (parsed.query && !opts.query) {
    opts.query = parsed.queryKey;
  }
  return io.socket(parsed.path, opts);
}
Object.assign(lookup, {
  Manager,
  Socket: Socket2,
  io: lookup,
  connect: lookup
});
const BASE_URL = typeof window !== "undefined" && window.location.origin.includes("pages.dev") ? "https://Blink.koyeb.app" : window.location.origin;
const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    var _a, _b;
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      set({ authUser: res.data });
      _t.success("Account created successfully");
      get().connectSocket();
      return true;
    } catch (error) {
      const message = ((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Failed to sign up";
      _t.error(message);
      return false;
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    var _a, _b;
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      set({ authUser: res.data });
      _t.success("Logged in successfully");
      get().connectSocket();
      return true;
    } catch (error) {
      const message = ((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Invalid credentials";
      _t.error(message);
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("token");
      set({ authUser: null });
      _t.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      _t.error(error.response.data.message);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      _t.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      _t.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    var _a;
    const { authUser } = get();
    if (!authUser || ((_a = get().socket) == null ? void 0 : _a.connected)) return;
    const socket = lookup(BASE_URL, {
      query: {
        userId: authUser._id
      }
    });
    socket.connect();
    set({ socket });
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    var _a;
    if ((_a = get().socket) == null ? void 0 : _a.connected) get().socket.disconnect();
  }
}));
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => {
    return reactExports.createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
      ...props
    })
  );
  Component.displayName = `${iconName}`;
  return Component;
};
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AtSign = createLucideIcon("AtSign", [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8", key: "7n84p3" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ban = createLucideIcon("Ban", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m4.9 4.9 14.2 14.2", key: "1m5liu" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const BellOff = createLucideIcon("BellOff", [
  ["path", { d: "M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5", key: "o7mx20" }],
  ["path", { d: "M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7", key: "16f1lm" }],
  ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0", key: "qgo35s" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bell = createLucideIcon("Bell", [
  ["path", { d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", key: "1qo2s2" }],
  ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0", key: "qgo35s" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Camera = createLucideIcon("Camera", [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CheckCheck = createLucideIcon("CheckCheck", [
  ["path", { d: "M18 6 7 17l-5-5", key: "116fxf" }],
  ["path", { d: "m22 10-7.5 7.5L13 16", key: "ke71qq" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Check = createLucideIcon("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ChevronLeft = createLucideIcon("ChevronLeft", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CircleAlert = createLucideIcon("CircleAlert", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CircleCheckBig = createLucideIcon("CircleCheckBig", [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Clock3 = createLucideIcon("Clock3", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16.5 12", key: "1aq6pp" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Download = createLucideIcon("Download", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EllipsisVertical = createLucideIcon("EllipsisVertical", [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ExternalLink = createLucideIcon("ExternalLink", [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EyeOff = createLucideIcon("EyeOff", [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eye = createLucideIcon("Eye", [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FileJson = createLucideIcon("FileJson", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  [
    "path",
    { d: "M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1", key: "1oajmo" }
  ],
  [
    "path",
    { d: "M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1", key: "mpwhp6" }
  ]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FileSpreadsheet = createLucideIcon("FileSpreadsheet", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M8 13h2", key: "yr2amv" }],
  ["path", { d: "M14 13h2", key: "un5t4a" }],
  ["path", { d: "M8 17h2", key: "2yhykz" }],
  ["path", { d: "M14 17h2", key: "10kma7" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FileText = createLucideIcon("FileText", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Globe = createLucideIcon("Globe", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Heart = createLucideIcon("Heart", [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Image = createLucideIcon("Image", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Inbox = createLucideIcon("Inbox", [
  ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Info = createLucideIcon("Info", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Laptop = createLucideIcon("Laptop", [
  [
    "path",
    {
      d: "M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16",
      key: "tarvll"
    }
  ]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LoaderCircle = createLucideIcon("LoaderCircle", [
  ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Loader = createLucideIcon("Loader", [
  ["path", { d: "M12 2v4", key: "3427ic" }],
  ["path", { d: "m16.2 7.8 2.9-2.9", key: "r700ao" }],
  ["path", { d: "M18 12h4", key: "wj9ykh" }],
  ["path", { d: "m16.2 16.2 2.9 2.9", key: "1bxg5t" }],
  ["path", { d: "M12 18v4", key: "jadmvz" }],
  ["path", { d: "m4.9 19.1 2.9-2.9", key: "bwix9q" }],
  ["path", { d: "M2 12h4", key: "j09sii" }],
  ["path", { d: "m4.9 4.9 2.9 2.9", key: "giyufr" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lock = createLucideIcon("Lock", [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LogOut = createLucideIcon("LogOut", [
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
  ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mail = createLucideIcon("Mail", [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Menu = createLucideIcon("Menu", [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MessageCircle = createLucideIcon("MessageCircle", [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MessageSquare = createLucideIcon("MessageSquare", [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mic = createLucideIcon("Mic", [
  ["path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z", key: "131961" }],
  ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Moon = createLucideIcon("Moon", [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Paperclip = createLucideIcon("Paperclip", [
  [
    "path",
    {
      d: "m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48",
      key: "1u3ebp"
    }
  ]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PenLine = createLucideIcon("PenLine", [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Phone = createLucideIcon("Phone", [
  [
    "path",
    {
      d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
      key: "foiqr5"
    }
  ]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pin = createLucideIcon("Pin", [
  ["path", { d: "M12 17v5", key: "bb1du9" }],
  [
    "path",
    {
      d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",
      key: "1nkz8b"
    }
  ]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Plus = createLucideIcon("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const RefreshCw = createLucideIcon("RefreshCw", [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Search = createLucideIcon("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Send = createLucideIcon("Send", [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Settings = createLucideIcon("Settings", [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Shield = createLucideIcon("Shield", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Smile = createLucideIcon("Smile", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2", key: "1y1vjs" }],
  ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9", key: "yxxnd0" }],
  ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9", key: "1p4y9e" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Square = createLucideIcon("Square", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sun = createLucideIcon("Sun", [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Trash2 = createLucideIcon("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const UserCheck = createLucideIcon("UserCheck", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["polyline", { points: "16 11 18 13 22 9", key: "1pwet4" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const UserPlus = createLucideIcon("UserPlus", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const UserX = createLucideIcon("UserX", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const User = createLucideIcon("User", [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Users = createLucideIcon("Users", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Video = createLucideIcon("Video", [
  [
    "path",
    {
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WifiOff = createLucideIcon("WifiOff", [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69", key: "1dl1wf" }],
  ["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523", key: "4k23kn" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643", key: "1grhjp" }],
  ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764", key: "z3jwby" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wifi = createLucideIcon("Wifi", [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
]);
/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X = createLucideIcon("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
const useErrorStore = create((set, get) => ({
  currentError: null,
  errorQueue: [],
  // Show an error modal
  showError: (error, onRetry = null) => {
    const errorWithRetry = { error, onRetry, id: Date.now() };
    set({ currentError: errorWithRetry });
  },
  // Clear current error
  clearError: () => {
    set({ currentError: null });
  },
  // Retry the current error's action
  retryCurrentError: () => {
    const { currentError } = get();
    if (currentError == null ? void 0 : currentError.onRetry) {
      currentError.onRetry();
      set({ currentError: null });
    }
  },
  // Enhanced error handler that replaces toast.error
  handleError: (error, customMessage = null, onRetry = null) => {
    console.error("Error handled:", error);
    if ((error == null ? void 0 : error.response) || (error == null ? void 0 : error.request)) {
      get().showError(error, onRetry);
      return;
    }
    if (typeof error === "string") {
      const simpleError = {
        message: customMessage || error,
        isSimpleError: true
      };
      get().showError(simpleError, onRetry);
      return;
    }
    const genericError = {
      message: customMessage || "An unexpected error occurred",
      originalError: error,
      isSimpleError: true
    };
    get().showError(genericError, onRetry);
  },
  // Helper to handle API errors with user-friendly messages
  handleApiError: (error, action = "perform this action", onRetry = null) => {
    var _a, _b;
    const message = ((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || `Failed to ${action}`;
    get().handleError(error, message, onRetry);
  }
}));
const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  searchResults: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  typingUsers: [],
  searchQuery: "",
  messagesRead: {},
  pinnedMessages: [],
  searchMessageResults: [],
  userStatus: {},
  editingMessageId: null,
  replyingToMessage: null,
  selectedMessagesForBulk: [],
  chatSettings: (() => {
    try {
      const raw = localStorage.getItem("chatSettings");
      return raw ? JSON.parse(raw) : {};
    } catch (e2) {
      return {};
    }
  })(),
  lockedChats: [],
  lockedChatPinPrompt: false,
  lockedChatUser: null,
  drafts: {},
  isMoreMessagesAvailable: true,
  // Real Workspace/Server structure
  workspaces: [],
  selectedWorkspace: null,
  selectedChannelId: null,
  workspaceMessages: {},
  workspacePolls: {},
  workspaceResources: {},
  channelTypingUsers: [],
  groups: [
    {
      _id: "group-1",
      name: "Design Squad",
      members: ["Alice", "Mika", "Rahul"],
      latestAnnouncement: "Sprint review starts 10AM.",
      poll: {
        question: "Which hero screen should ship first?",
        options: [
          { id: "a", label: "Launch board", votes: 8 },
          { id: "b", label: "In-app status", votes: 5 },
          { id: "c", label: "Media hub", votes: 3 }
        ]
      },
      media: [
        { id: "m1", url: "/assets/sample-1.jpg", label: "Design board" },
        { id: "m2", url: "/assets/sample-2.jpg", label: "Moodboard" }
      ]
    }
  ],
  communities: [
    {
      _id: "community-1",
      name: "Umbrella Workspace",
      groups: ["Design Squad", "Operations"],
      announcements: [
        { id: "a1", text: "Weekly town hall at 5pm on Friday." },
        { id: "a2", text: "New guidelines for community channels released." }
      ]
    }
  ],
  channels: [
    {
      _id: "channel-1",
      name: "Product Updates",
      description: "Read-only channel for releases and product news.",
      subscribers: 1234,
      isSubscribed: true,
      isAdmin: false,
      posts: [
        { id: "p1", title: "Version 5.3 Released", body: "Async drafts and live poll support are now live." }
      ]
    }
  ],
  selectedGroup: null,
  selectedCommunity: null,
  selectedChannel: null,
  setDraft: (userId, text) => {
    set({
      drafts: {
        ...get().drafts,
        [userId]: text
      }
    });
  },
  setChatSetting: (key, value2) => {
    const next = { ...get().chatSettings || {}, [key]: value2 };
    try {
      localStorage.setItem("chatSettings", JSON.stringify(next));
    } catch (e2) {
    }
    set({ chatSettings: next });
  },
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  searchUsers: async (query) => {
    set({ searchQuery: query });
    if (!query.trim()) {
      set({ searchResults: [] });
      return;
    }
    try {
      const res = await axiosInstance.get(`/messages/search?query=${encodeURIComponent(query)}`);
      set({ searchResults: res.data });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "search users");
    }
  },
  getMessages: async (userId, isLoadMore = false) => {
    var _a, _b, _c;
    if (!isLoadMore) set({ isMessagesLoading: true, isMoreMessagesAvailable: true });
    try {
      const { selectedUser } = get();
      if (!selectedUser || selectedUser._id !== userId) return;
      const { messages } = get();
      const before = isLoadMore && messages.length > 0 ? messages[0].createdAt : null;
      const limit = 30;
      const res = await axiosInstance.get(`/messages/${userId}`, {
        params: { limit, before }
      });
      if (((_a = get().selectedUser) == null ? void 0 : _a._id) !== userId) return;
      const newMessages = res.data;
      if (isLoadMore) {
        set({
          messages: [...newMessages, ...get().messages],
          isMoreMessagesAvailable: newMessages.length === limit
        });
      } else {
        set({
          messages: newMessages,
          isMoreMessagesAvailable: newMessages.length === limit,
          users: get().users.map((u2) => u2._id === userId ? { ...u2, unreadCount: 0 } : u2)
        });
      }
      if (!isLoadMore) {
        try {
          await axiosInstance.patch(`/messages/${userId}/read`);
        } catch (error) {
          console.error("Failed to mark messages as read:", error);
        }
      }
    } catch (error) {
      if (((_b = get().selectedUser) == null ? void 0 : _b._id) === userId) {
        useErrorStore.getState().handleApiError(error, "load messages");
      }
    } finally {
      if (!isLoadMore && ((_c = get().selectedUser) == null ? void 0 : _c._id) === userId) {
        set({ isMessagesLoading: false });
      }
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      let postData;
      const isFormData2 = messageData && typeof messageData.append === "function";
      if (isFormData2) {
        postData = messageData;
      } else {
        const formData = new FormData();
        if (messageData.text) formData.append("text", messageData.text);
        if (messageData.image) formData.append("image", messageData.image);
        if (messageData.file) formData.append("file", messageData.file);
        if (messageData.replyTo) formData.append("replyTo", messageData.replyTo);
        if (messageData.viewOnce) formData.append("viewOnce", messageData.viewOnce);
        if (messageData.expiresAt) formData.append("expiresAt", messageData.expiresAt.toISOString());
        postData = formData;
      }
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, postData);
      set({
        messages: [...messages, res.data],
        replyingToMessage: null,
        users: get().users.map((u2) => u2._id === selectedUser._id ? { ...u2, lastMessage: res.data } : u2)
      });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "send message");
    }
  },
  addReaction: async (messageId, emoji) => {
    try {
      const res = await axiosInstance.post(`/messages/reaction/${messageId}/add`, { emoji });
      set({
        messages: get().messages.map(
          (msg) => {
            var _a;
            return msg._id === messageId ? { ...msg, reactions: ((_a = res.data) == null ? void 0 : _a.reactions) || {} } : msg;
          }
        )
      });
    } catch (error) {
      console.error("Error adding reaction:", error);
      useErrorStore.getState().handleApiError(error, "add reaction");
    }
  },
  removeReaction: async (messageId, emoji) => {
    try {
      const res = await axiosInstance.post(`/messages/reaction/${messageId}/remove`, { emoji });
      set({
        messages: get().messages.map(
          (msg) => {
            var _a;
            return msg._id === messageId ? { ...msg, reactions: ((_a = res.data) == null ? void 0 : _a.reactions) || {} } : msg;
          }
        )
      });
    } catch (error) {
      console.error("Error removing reaction:", error);
      useErrorStore.getState().handleApiError(error, "remove reaction");
    }
  },
  editMessage: async (messageId, newText) => {
    try {
      const res = await axiosInstance.patch(`/messages/edit/${messageId}`, { text: newText });
      set({
        messages: get().messages.map(
          (msg) => msg._id === messageId ? res.data : msg
        ),
        editingMessageId: null
      });
      _t.success("Message edited");
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "edit message");
    }
  },
  deleteMessage: async (messageId) => {
    try {
      const res = await axiosInstance.delete(`/messages/${messageId}`);
      const text = res.data.text || "This message was deleted by You";
      set({
        messages: get().messages.map((msg) => {
          let updatedMsg = msg;
          if (msg._id === messageId) {
            updatedMsg = {
              ...updatedMsg,
              isDeleted: true,
              text,
              image: null,
              file: null,
              replyTo: null,
              reactions: {},
              isPinned: false
            };
          }
          if (msg.replyTo && (msg.replyTo === messageId || msg.replyTo._id === messageId)) {
            updatedMsg = {
              ...updatedMsg,
              replyTo: typeof msg.replyTo === "object" ? { ...msg.replyTo, isDeleted: true } : { _id: msg.replyTo, isDeleted: true }
            };
          }
          return updatedMsg;
        })
      });
      _t.success("Message deleted");
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "delete message");
    }
  },
  togglePinMessage: async (messageId) => {
    try {
      const res = await axiosInstance.patch(`/messages/pin/message/${messageId}`);
      set({
        messages: get().messages.map(
          (msg) => msg._id === messageId ? { ...msg, ...res.data } : msg
        )
      });
    } catch (error) {
      console.error("Error toggling pin:", error);
      useErrorStore.getState().handleApiError(error, "pin message");
    }
  },
  setChatExpiry: async (userId, expiryLabel, expiresAt) => {
    try {
      const res = await axiosInstance.patch(`/messages/settings/disappearing/${userId}`, {
        expiryLabel,
        expiresAt: expiresAt ? expiresAt.toISOString() : null
      });
      set({
        chatSettings: {
          ...get().chatSettings,
          [userId]: res.data
        }
      });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "update chat expiry");
    }
  },
  getLockedChats: async () => {
    try {
      const res = await axiosInstance.get(`/messages/locked`);
      set({ lockedChats: res.data });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "load locked chats");
    }
  },
  lockChat: async (userId, pin) => {
    try {
      await axiosInstance.patch(`/messages/lock/${userId}`, { pin });
      await get().getLockedChats();
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "lock chat");
    }
  },
  unlockChat: async (userId, pin) => {
    try {
      await axiosInstance.post(`/messages/unlock/${userId}`, { pin });
      return true;
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "unlock chat");
      return false;
    }
  },
  markViewOnceOpened: async (messageId) => {
    try {
      const res = await axiosInstance.patch(`/messages/view-once/${messageId}/open`);
      set({
        messages: get().messages.map(
          (msg) => msg._id === messageId ? res.data : msg
        )
      });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "open media");
    }
  },
  getPinnedMessages: async (userId) => {
    try {
      const res = await axiosInstance.get(`/messages/pinned/${userId}`);
      set({ pinnedMessages: res.data });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "load pinned messages");
    }
  },
  searchMessages: async (userId, query, sender) => {
    try {
      const params = new URLSearchParams({ query });
      if (sender) params.append("sender", sender);
      const res = await axiosInstance.get(`/messages/search/${userId}?${params}`);
      set({ searchMessageResults: res.data });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "search messages");
    }
  },
  forwardMessage: async (messageId, receiverId) => {
    try {
      const res = await axiosInstance.post(`/messages/forward/${messageId}`, { receiverId });
      _t.success("Message forwarded");
      return res.data;
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "forward message");
    }
  },
  toggleArchiveChat: async (userId) => {
    try {
      await axiosInstance.patch(`/messages/archive/${userId}`);
      _t.success("Chat archived");
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "archive chat");
    }
  },
  togglePinChat: async (userId) => {
    try {
      await axiosInstance.patch(`/messages/pin/${userId}`);
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "pin chat");
    }
  },
  toggleMuteChat: async (userId) => {
    try {
      await axiosInstance.patch(`/messages/mute/${userId}`);
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "mute chat");
    }
  },
  clearChatHistory: async (userId) => {
    try {
      await axiosInstance.delete(`/messages/clear/${userId}`);
      set({ messages: [] });
      _t.success("Chat history cleared");
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "clear chat");
    }
  },
  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    get().unsubscribeFromMessages();
    socket.on("newMessage", async (newMessage) => {
      const { selectedUser, messages, users } = get();
      const isForActiveChat = selectedUser && (newMessage.senderId === selectedUser._id || newMessage.receiverId === selectedUser._id);
      if (isForActiveChat) {
        set({
          messages: [...messages, newMessage]
        });
        try {
          await axiosInstance.patch(`/messages/${selectedUser._id}/read`);
          socket.emit("messageRead", { senderId: selectedUser._id, receiverId: useAuthStore.getState().authUser._id });
        } catch (error) {
          console.error("Failed to mark message as read:", error);
        }
      } else {
        const sender = users.find((u2) => u2._id === newMessage.senderId);
        const senderName = sender ? sender.fullName : "Someone";
        _t(`New message from ${senderName}`, { icon: "💬" });
      }
      set({
        users: users.map((user) => {
          if (user._id === newMessage.senderId) {
            const isCurrentChat = selectedUser && selectedUser._id === user._id;
            return {
              ...user,
              lastMessage: newMessage,
              unreadCount: isCurrentChat ? 0 : (user.unreadCount || 0) + 1
            };
          }
          return user;
        })
      });
    });
    socket.on("userTyping", (userId) => {
      const { selectedUser } = get();
      if (selectedUser && userId === selectedUser._id) {
        const typingUsers = get().typingUsers;
        if (!typingUsers.includes(userId)) {
          set({ typingUsers: [...typingUsers, userId] });
        }
      }
    });
    socket.on("userStopTyping", (userId) => {
      const { selectedUser } = get();
      if (selectedUser && userId === selectedUser._id) {
        set({ typingUsers: get().typingUsers.filter((id2) => id2 !== userId) });
      }
    });
    socket.on("messagesReadReceipt", (userId) => {
      set({
        messages: get().messages.map(
          (msg) => msg.receiverId === userId ? { ...msg, isRead: true } : msg
        )
      });
    });
    socket.on("messageReactionAdded", (data) => {
      try {
        const { messageId, reactions } = data;
        if (!messageId || !reactions) return;
        set({
          messages: get().messages.map(
            (msg) => msg._id === messageId ? { ...msg, reactions: reactions || {} } : msg
          )
        });
      } catch (error) {
        console.error("Error handling messageReactionAdded:", error);
      }
    });
    socket.on("messageReactionRemoved", (data) => {
      try {
        const { messageId, reactions } = data;
        if (!messageId) return;
        set({
          messages: get().messages.map(
            (msg) => msg._id === messageId ? { ...msg, reactions: reactions || {} } : msg
          )
        });
      } catch (error) {
        console.error("Error handling messageReactionRemoved:", error);
      }
    });
    socket.on("messageEdited", (data) => {
      const { messageId, text, isEdited, editedAt } = data;
      set({
        messages: get().messages.map(
          (msg) => msg._id === messageId ? { ...msg, text, isEdited, editedAt } : msg
        )
      });
    });
    socket.on("messageDeleted", (data) => {
      const { messageId, text } = data;
      set({
        messages: get().messages.map((msg) => {
          let updatedMsg = msg;
          if (msg._id === messageId) {
            updatedMsg = {
              ...updatedMsg,
              isDeleted: true,
              text: text || "This message was deleted by User",
              image: null,
              file: null,
              replyTo: null,
              reactions: {},
              isPinned: false
            };
          }
          if (msg.replyTo && (msg.replyTo === messageId || msg.replyTo._id === messageId)) {
            updatedMsg = {
              ...updatedMsg,
              replyTo: typeof msg.replyTo === "object" ? { ...msg.replyTo, isDeleted: true } : { _id: msg.replyTo, isDeleted: true }
            };
          }
          return updatedMsg;
        })
      });
    });
    socket.on("messagePinToggled", (data) => {
      try {
        const { messageId, isPinned } = data;
        if (!messageId) return;
        set({
          messages: get().messages.map(
            (msg) => msg._id === messageId ? { ...msg, isPinned: Boolean(isPinned) } : msg
          )
        });
      } catch (error) {
        console.error("Error handling messagePinToggled:", error);
      }
    });
    socket.on("userStatusChanged", (data) => {
      set({
        userStatus: {
          ...get().userStatus,
          [data.userId]: { status: data.status, statusMessage: data.statusMessage }
        }
      });
    });
    socket.on("chatCleared", () => {
      set({ messages: [] });
      _t.info("Chat history was cleared");
    });
    socket.on("newWorkspaceMessage", (newMessage) => {
      const { workspaceMessages } = get();
      const channelId = newMessage.channelId;
      const list = workspaceMessages[channelId] || [];
      if (list.some((msg) => msg._id === newMessage._id)) return;
      set({
        workspaceMessages: {
          ...workspaceMessages,
          [channelId]: [...list, newMessage]
        }
      });
    });
    socket.on("workspaceReactionAdded", (data) => {
      const { messageId, reactions, channelId } = data;
      const { workspaceMessages } = get();
      const list = workspaceMessages[channelId] || [];
      set({
        workspaceMessages: {
          ...workspaceMessages,
          [channelId]: list.map((msg) => msg._id === messageId ? { ...msg, reactions } : msg)
        }
      });
    });
    socket.on("workspaceReactionRemoved", (data) => {
      const { messageId, reactions, channelId } = data;
      const { workspaceMessages } = get();
      const list = workspaceMessages[channelId] || [];
      set({
        workspaceMessages: {
          ...workspaceMessages,
          [channelId]: list.map((msg) => msg._id === messageId ? { ...msg, reactions } : msg)
        }
      });
    });
    socket.on("pollCreated", (newPoll) => {
      const { workspacePolls } = get();
      const channelId = newPoll.channelId;
      const list = workspacePolls[channelId] || [];
      if (list.some((p2) => p2._id === newPoll._id)) return;
      set({
        workspacePolls: {
          ...workspacePolls,
          [channelId]: [newPoll, ...list]
        }
      });
    });
    socket.on("pollVoted", (updatedPoll) => {
      const { workspacePolls } = get();
      const channelId = updatedPoll.channelId;
      const list = workspacePolls[channelId] || [];
      set({
        workspacePolls: {
          ...workspacePolls,
          [channelId]: list.map((p2) => p2._id === updatedPoll._id ? updatedPoll : p2)
        }
      });
    });
    socket.on("resourceUploaded", (newRes) => {
      const { workspaceResources } = get();
      const channelId = newRes.channelId;
      const list = workspaceResources[channelId] || [];
      if (list.some((r2) => r2._id === newRes._id)) return;
      set({
        workspaceResources: {
          ...workspaceResources,
          [channelId]: [newRes, ...list]
        }
      });
    });
    socket.on("channelCreated", (data) => {
      const { workspaceId, workspace } = data;
      const { workspaces, selectedWorkspace } = get();
      const updated = workspaces.map((w2) => w2._id === workspaceId ? workspace : w2);
      set({
        workspaces: updated,
        selectedWorkspace: selectedWorkspace && selectedWorkspace._id === workspaceId ? workspace : selectedWorkspace
      });
    });
    socket.on("userJoinedWorkspace", (data) => {
      const { workspaceId, workspace } = data;
      const { workspaces, selectedWorkspace } = get();
      const updated = workspaces.map((w2) => w2._id === workspaceId ? workspace : w2);
      set({
        workspaces: updated,
        selectedWorkspace: selectedWorkspace && selectedWorkspace._id === workspaceId ? workspace : selectedWorkspace
      });
    });
    socket.on("userChannelTyping", (data) => {
      const { userId, channelId } = data;
      const { selectedChannelId, channelTypingUsers } = get();
      if (selectedChannelId === channelId) {
        if (!channelTypingUsers.includes(userId)) {
          set({ channelTypingUsers: [...channelTypingUsers, userId] });
        }
      }
    });
    socket.on("userChannelStopTyping", (data) => {
      const { userId, channelId } = data;
      const { selectedChannelId, channelTypingUsers } = get();
      if (selectedChannelId === channelId) {
        set({ channelTypingUsers: channelTypingUsers.filter((id2) => id2 !== userId) });
      }
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
    socket.off("userTyping");
    socket.off("userStopTyping");
    socket.off("messagesReadReceipt");
    socket.off("messageReactionAdded");
    socket.off("messageReactionRemoved");
    socket.off("messageEdited");
    socket.off("messageDeleted");
    socket.off("messagePinToggled");
    socket.off("userStatusChanged");
    socket.off("chatCleared");
    socket.off("newWorkspaceMessage");
    socket.off("workspaceReactionAdded");
    socket.off("workspaceReactionRemoved");
    socket.off("pollCreated");
    socket.off("pollVoted");
    socket.off("resourceUploaded");
    socket.off("channelCreated");
    socket.off("userJoinedWorkspace");
    socket.off("userChannelTyping");
    socket.off("userChannelStopTyping");
  },
  setSelectedUser: (selectedUser) => {
    set({
      selectedUser,
      messages: [],
      isMoreMessagesAvailable: true,
      searchResults: [],
      searchQuery: "",
      editingMessageId: null,
      replyingToMessage: null
    });
  },
  clearSearch: () => {
    set({ searchQuery: "", searchResults: [] });
  },
  setEditingMessage: (messageId) => {
    set({ editingMessageId: messageId });
  },
  setReplyingToMessage: (message) => {
    set({ replyingToMessage: message });
  },
  toggleBulkSelect: (messageId) => {
    const selected = get().selectedMessagesForBulk;
    const index = selected.findIndex((id2) => id2 === messageId);
    if (index > -1) {
      selected.splice(index, 1);
    } else {
      selected.push(messageId);
    }
    set({ selectedMessagesForBulk: [...selected] });
  },
  clearBulkSelect: () => {
    set({ selectedMessagesForBulk: [] });
  },
  exportChat: async (userId, format = "json", includeDeleted = false) => {
    try {
      const response = await axiosInstance.get(`/messages/export/${userId}`, {
        params: { format, includeDeleted },
        responseType: format === "json" ? "json" : "blob"
      });
      if (format === "json") {
        return response.data;
      } else {
        const blob = new Blob([response.data], {
          type: format === "text" ? "text/plain" : "text/csv"
        });
        const url2 = window.URL.createObjectURL(blob);
        const a2 = document.createElement("a");
        a2.href = url2;
        a2.download = `chat-export.${format === "text" ? "txt" : "csv"}`;
        document.body.appendChild(a2);
        a2.click();
        window.URL.revokeObjectURL(url2);
        document.body.removeChild(a2);
        return true;
      }
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "export chat");
      return false;
    }
  },
  initWorkspaces: async () => {
    try {
      const res = await axiosInstance.get("/workspaces");
      const workspaces = res.data;
      const socket = useAuthStore.getState().socket;
      if (socket) {
        workspaces.forEach((w2) => {
          socket.emit("joinWorkspace", w2._id);
        });
      }
      set({ workspaces });
      if (workspaces.length > 0) {
        const defaultWorkspace = workspaces[0];
        get().setSelectedWorkspace(defaultWorkspace);
      }
    } catch (e2) {
      console.error("Failed to load workspaces:", e2);
      _t.error("Failed to sync workspaces.");
    }
  },
  setSelectedWorkspace: async (workspace) => {
    const defaultChannel = workspace && workspace.channels.length > 0 ? workspace.channels[0]._id : null;
    const socket = useAuthStore.getState().socket;
    if (socket && workspace) {
      socket.emit("joinWorkspace", workspace._id);
    }
    set({
      selectedWorkspace: workspace,
      selectedChannelId: defaultChannel,
      selectedUser: null
    });
    if (workspace && defaultChannel) {
      get().fetchChannelData(workspace._id, defaultChannel);
    }
  },
  setSelectedChannelId: async (channelId) => {
    const workspace = get().selectedWorkspace;
    set({ selectedChannelId: channelId });
    if (workspace && channelId) {
      get().fetchChannelData(workspace._id, channelId);
    }
  },
  fetchChannelData: async (workspaceId, channelId) => {
    const workspace = get().selectedWorkspace;
    if (!workspace) return;
    const channel = workspace.channels.find((c2) => c2._id === channelId);
    if (!channel) return;
    try {
      if (channel.type === "chat" || channel.type === "announcements") {
        const res = await axiosInstance.get(`/workspaces/${workspaceId}/messages/${channelId}`);
        set({
          workspaceMessages: {
            ...get().workspaceMessages,
            [channelId]: res.data
          }
        });
      } else if (channel.type === "polls") {
        const res = await axiosInstance.get(`/workspaces/${workspaceId}/polls/${channelId}`);
        set({
          workspacePolls: {
            ...get().workspacePolls,
            [channelId]: res.data
          }
        });
      } else if (channel.type === "resources") {
        const res = await axiosInstance.get(`/workspaces/${workspaceId}/resources/${channelId}`);
        set({
          workspaceResources: {
            ...get().workspaceResources,
            [channelId]: res.data
          }
        });
      }
    } catch (error) {
      console.error("Failed to fetch channel data:", error);
    }
  },
  createWorkspace: async (name, icon) => {
    try {
      const res = await axiosInstance.post("/workspaces", { name, icon });
      const newWorkspace = res.data;
      const { workspaces } = get();
      const socket = useAuthStore.getState().socket;
      if (socket) {
        socket.emit("joinWorkspace", newWorkspace._id);
      }
      set({
        workspaces: [...workspaces, newWorkspace]
      });
      get().setSelectedWorkspace(newWorkspace);
      _t.success(`Server "${name}" created!`);
    } catch (error) {
      console.error("Failed to create workspace:", error);
      _t.error("Failed to create workspace.");
    }
  },
  createChannel: async (workspaceId, name, type = "chat") => {
    try {
      const res = await axiosInstance.post(`/workspaces/${workspaceId}/channels`, { name, type });
      const { workspace, channel } = res.data;
      const { workspaces } = get();
      const updated = workspaces.map((w2) => w2._id === workspaceId ? workspace : w2);
      set({ workspaces: updated });
      const currentActive = get().selectedWorkspace;
      if (currentActive && currentActive._id === workspaceId) {
        set({
          selectedWorkspace: workspace,
          selectedChannelId: channel._id
        });
        get().fetchChannelData(workspaceId, channel._id);
      }
      _t.success(`Channel #${channel.name} created!`);
    } catch (error) {
      console.error("Failed to create channel:", error);
      _t.error("Failed to create channel.");
    }
  },
  sendChannelMessage: async (workspaceId, channelId, text, file = null) => {
    try {
      const formData = new FormData();
      formData.append("text", text || "");
      if (file) {
        formData.append("file", file);
      }
      const res = await axiosInstance.post(`/workspaces/${workspaceId}/messages/${channelId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      const newMsg = res.data;
      const { workspaceMessages } = get();
      const list = workspaceMessages[channelId] || [];
      if (list.some((msg) => msg._id === newMsg._id)) return;
      set({
        workspaceMessages: {
          ...workspaceMessages,
          [channelId]: [...list, newMsg]
        }
      });
    } catch (error) {
      console.error("Failed to send channel message:", error);
      _t.error("Failed to send message.");
    }
  },
  addChannelReaction: async (channelId, messageId, emoji) => {
    var _a;
    try {
      const { workspaceMessages } = get();
      const list = workspaceMessages[channelId] || [];
      const msg = list.find((m2) => m2._id === messageId);
      if (!msg) return;
      const user = useAuthStore.getState().authUser;
      if (!user) return;
      const userReactions = ((_a = msg.reactions) == null ? void 0 : _a[emoji]) || [];
      const hasReacted = userReactions.includes(user._id);
      const path = hasReacted ? "remove" : "add";
      const res = await axiosInstance.post(`/workspaces/messages/${messageId}/reaction/${path}`, { emoji });
      const updatedMsg = res.data;
      set({
        workspaceMessages: {
          ...workspaceMessages,
          [channelId]: list.map((m2) => m2._id === messageId ? updatedMsg : m2)
        }
      });
    } catch (error) {
      console.error("Failed to toggle reaction:", error);
    }
  },
  createPoll: async (workspaceId, channelId, question, optionLabels) => {
    try {
      const filteredOptions = optionLabels.filter((lbl) => lbl.trim() !== "");
      const res = await axiosInstance.post(`/workspaces/${workspaceId}/polls/${channelId}`, { question, options: filteredOptions });
      const newPoll = res.data;
      const { workspacePolls } = get();
      const list = workspacePolls[channelId] || [];
      set({
        workspacePolls: {
          ...workspacePolls,
          [channelId]: [newPoll, ...list]
        }
      });
      _t.success("Poll launched successfully!");
    } catch (error) {
      console.error("Failed to create poll:", error);
      _t.error("Failed to create poll.");
    }
  },
  voteInPoll: async (workspaceId, channelId, pollId, optionId) => {
    try {
      const res = await axiosInstance.post(`/workspaces/polls/${pollId}/vote`, { optionId });
      const updatedPoll = res.data;
      const { workspacePolls } = get();
      const list = workspacePolls[channelId] || [];
      set({
        workspacePolls: {
          ...workspacePolls,
          [channelId]: list.map((p2) => p2._id === pollId ? updatedPoll : p2)
        }
      });
    } catch (error) {
      console.error("Failed to cast vote:", error);
    }
  },
  uploadResource: async (workspaceId, channelId, file) => {
    try {
      if (!file) return;
      const formData = new FormData();
      formData.append("file", file);
      const res = await axiosInstance.post(`/workspaces/${workspaceId}/resources/${channelId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      const newRes = res.data;
      const { workspaceResources } = get();
      const list = workspaceResources[channelId] || [];
      set({
        workspaceResources: {
          ...workspaceResources,
          [channelId]: [newRes, ...list]
        }
      });
      _t.success(`Uploaded ${file.name} successfully!`);
    } catch (error) {
      console.error("Failed to upload resource file:", error);
      _t.error("Failed to upload resource.");
    }
  }
}));
const StatusUpdateModal = ({ onClose }) => {
  const { updateUserStatus } = useChatStore();
  const [status, setStatus] = reactExports.useState("online");
  const [statusMessage, setStatusMessage] = reactExports.useState("");
  const [isUpdating, setIsUpdating] = reactExports.useState(false);
  const statuses = [
    { value: "online", label: "🟢 Online", color: "text-green-500" },
    { value: "away", label: "🟡 Away", color: "text-yellow-500" },
    { value: "dnd", label: "🔴 Do Not Disturb", color: "text-red-500" },
    { value: "offline", label: "⚫ Offline", color: "text-gray-500" }
  ];
  const handleUpdate = async () => {
    if (!status.trim()) {
      _t.error("Please select a status");
      return;
    }
    try {
      setIsUpdating(true);
      await updateUserStatus(status, statusMessage.trim() || "");
      _t.success("Status updated!");
      onClose();
    } catch (error) {
      console.error("Failed to update status:", error);
      _t.error("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md border border-slate-200/50 dark:border-slate-700/50 p-6 overflow-hidden animate-fadeIn", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-slate-800 dark:text-slate-100", children: "Update Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-slate-400 hover:text-slate-500 dark:hover:text-slate-200 transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2", children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: statuses.map((s2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/40 rounded-xl cursor-pointer transition-all duration-150 border border-slate-100/30 dark:border-slate-700/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "radio",
            name: "status",
            value: s2.value,
            checked: status === s2.value,
            onChange: (e2) => setStatus(e2.target.value),
            className: "w-4 h-4 text-blue-500 border-slate-350 focus:ring-blue-500 dark:focus:ring-blue-400 bg-transparent cursor-pointer"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-slate-700 dark:text-slate-200", children: s2.label })
      ] }, s2.value)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2", children: "Status Message (Optional)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          className: "w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/40 border border-slate-250 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm resize-none h-20",
          placeholder: 'e.g., "In a meeting", "Away for 2 hours"',
          value: statusMessage,
          onChange: (e2) => setStatusMessage(e2.target.value.slice(0, 50)),
          maxLength: 50
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-right text-[11px] text-slate-400 dark:text-slate-500 mt-1", children: [
        statusMessage.length,
        "/50"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2.5 justify-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-xl font-medium transition-all active:scale-[0.98]",
          disabled: isUpdating,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleUpdate,
          className: "px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700 text-sm rounded-xl font-medium flex items-center gap-1.5 transition-all active:scale-[0.98] shadow-sm",
          disabled: isUpdating,
          children: isUpdating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { size: 15, className: "animate-spin" }),
            "Updating..."
          ] }) : "Update"
        }
      )
    ] })
  ] }) });
};
const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i2 = 0; i2 < rawData.length; ++i2) {
    outputArray[i2] = rawData.charCodeAt(i2);
  }
  return outputArray;
};
const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isNotificationsLoading: false,
  page: 1,
  hasMore: true,
  // ... (previous methods kept the same)
  getNotifications: async (unreadOnly = false) => {
    set({ isNotificationsLoading: true });
    try {
      const res = await axiosInstance.get(`/notifications?page=1&unreadOnly=${unreadOnly}`);
      set({ notifications: res.data, page: 1, hasMore: res.data.length === 20 });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "load notifications");
    } finally {
      set({ isNotificationsLoading: false });
    }
  },
  loadMoreNotifications: async (unreadOnly = false) => {
    const { page, notifications, hasMore } = get();
    if (!hasMore) return;
    try {
      const nextPage = page + 1;
      const res = await axiosInstance.get(`/notifications?page=${nextPage}&unreadOnly=${unreadOnly}`);
      set({
        notifications: [...notifications, ...res.data],
        page: nextPage,
        hasMore: res.data.length === 20
      });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "load more notifications");
    }
  },
  getUnreadCount: async () => {
    try {
      const res = await axiosInstance.get("/notifications/unread-count");
      set({ unreadCount: res.data.count });
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  },
  markAsRead: async (id2) => {
    try {
      await axiosInstance.patch(`/notifications/${id2}/read`);
      set({
        notifications: get().notifications.map(
          (n2) => n2._id === id2 ? { ...n2, isRead: true } : n2
        ),
        unreadCount: Math.max(0, get().unreadCount - 1)
      });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "mark notification as read");
    }
  },
  markAllAsRead: async () => {
    try {
      await axiosInstance.patch("/notifications/read-all");
      set({
        notifications: get().notifications.map((n2) => ({ ...n2, isRead: true })),
        unreadCount: 0
      });
      _t.success("All notifications marked as read");
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "mark all as read");
    }
  },
  deleteNotification: async (id2) => {
    try {
      const notification = get().notifications.find((n2) => n2._id === id2);
      await axiosInstance.delete(`/notifications/${id2}`);
      set({
        notifications: get().notifications.filter((n2) => n2._id !== id2),
        unreadCount: notification && !notification.isRead ? Math.max(0, get().unreadCount - 1) : get().unreadCount
      });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "delete notification");
    }
  },
  clearReadNotifications: async () => {
    try {
      await axiosInstance.delete("/notifications/read");
      set({
        notifications: get().notifications.filter((n2) => !n2.isRead)
      });
      _t.success("Cleared read notifications");
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "clear read notifications");
    }
  },
  updatePreferences: async (preferences) => {
    try {
      const res = await axiosInstance.patch("/notifications/preferences", { preferences });
      const authUser = useAuthStore.getState().authUser;
      if (authUser) {
        useAuthStore.setState({
          authUser: { ...authUser, notificationPreferences: res.data }
        });
      }
      _t.success("Notification preferences updated");
      return res.data;
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "update preferences");
    }
  },
  subscribeToPushNotifications: async () => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      _t.error("Push notifications are not supported by your browser.");
      return;
    }
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        _t.error("Notification permission denied. Please enable it in your browser settings.");
        return;
      }
      const keyRes = await axiosInstance.get("/notifications/push/key");
      const publicKey = keyRes.data.publicKey;
      if (!publicKey) {
        throw new Error("VAPID public key not configured on server.");
      }
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
      });
      await axiosInstance.post("/notifications/push/subscribe", subscription);
      _t.success("Push notifications enabled!");
    } catch (error) {
      console.error("Failed to subscribe to push:", error);
      _t.error("Could not enable push notifications.");
    }
  },
  subscribeToNotifications: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.on("notification:new", (notification) => {
      set({
        notifications: [notification, ...get().notifications]
      });
      _t.success(`${notification.title}: ${notification.body}`, {
        icon: "🔔"
      });
    });
    socket.on("notification:count-update", (count) => {
      set({ unreadCount: count });
    });
    socket.on("notification:read", (id2) => {
      set({
        notifications: get().notifications.map(
          (n2) => n2._id === id2 ? { ...n2, isRead: true } : n2
        )
      });
    });
    socket.on("notification:all-read", () => {
      set({
        notifications: get().notifications.map((n2) => ({ ...n2, isRead: true })),
        unreadCount: 0
      });
    });
    socket.on("notification:deleted", (id2) => {
      set({
        notifications: get().notifications.filter((n2) => n2._id !== id2)
      });
    });
  },
  unsubscribeFromNotifications: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("notification:new");
    socket.off("notification:count-update");
    socket.off("notification:read");
    socket.off("notification:all-read");
    socket.off("notification:deleted");
  }
}));
function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}
function formatDistanceToNow(date) {
  const now = /* @__PURE__ */ new Date();
  const diff = now - new Date(date);
  const seconds = Math.floor(diff / 1e3);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
}
const Avatar = ({ src, alt, size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "size-8",
    md: "size-10",
    lg: "size-12",
    xl: "size-16"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: src || "/avatar.png",
      alt: alt || "Avatar",
      className: `rounded-full object-cover border border-border dark:border-border-dark transition-all duration-200 ${sizeClasses[size]} ${className}`
    }
  );
};
const NotificationItem = ({ notification }) => {
  var _a;
  const { markAsRead, deleteNotification } = useNotificationStore();
  const { setSelectedUser, users } = useChatStore();
  const navigate = useNavigate();
  const getIcon = () => {
    switch (notification.type) {
      case "direct_message":
      case "group_message":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "size-3 text-primary" });
      case "friend_request":
      case "friend_accept":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "size-3 text-emerald-500" });
      case "reaction":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "size-3 text-rose-500", fill: "currentColor" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "size-3 text-primary" });
    }
  };
  const handleClick = async () => {
    var _a2;
    if (!notification.isRead) {
      await markAsRead(notification._id);
    }
    if ((_a2 = notification.metadata) == null ? void 0 : _a2.conversationId) {
      const user = users.find((u2) => u2._id === notification.metadata.conversationId);
      if (user) {
        setSelectedUser(user);
        navigate("/");
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `group px-3 py-3 mx-2 rounded-2xl flex gap-3 transition-all duration-200 cursor-pointer relative ${!notification.isRead ? "bg-primary/5 shadow-soft" : "hover:bg-slate-50 dark:hover:bg-slate-800"}`,
      onClick: handleClick,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { src: (_a = notification.actor) == null ? void 0 : _a.profilePic, size: "md" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 -right-1 bg-surface dark:bg-surface-dark rounded-full p-1 border border-border dark:border-border-dark shadow-soft", children: getIcon() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-2 mb-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm leading-tight ${!notification.isRead ? "font-bold text-slate-900 dark:text-slate-100" : "font-semibold text-slate-700 dark:text-slate-300"}`, children: notification.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 font-medium whitespace-nowrap pt-0.5", children: formatDistanceToNow(new Date(notification.createdAt)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 line-clamp-2", children: notification.body })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: async (event) => {
              event.stopPropagation();
              await deleteNotification(notification._id);
            },
            className: "absolute right-3 top-3 text-slate-400 hover:text-rose-500",
            title: "Delete notification",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" })
          }
        ),
        !notification.isRead && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-2 rounded-full bg-primary absolute right-3 top-1/2 -translate-y-1/2 shadow-soft" })
      ]
    }
  );
};
const NotificationPanel = () => {
  const {
    notifications,
    getNotifications,
    markAllAsRead,
    clearReadNotifications,
    isNotificationsLoading,
    loadMoreNotifications,
    hasMore
  } = useNotificationStore();
  const [unreadOnly, setUnreadOnly] = reactExports.useState(false);
  reactExports.useEffect(() => {
    getNotifications(unreadOnly);
  }, [unreadOnly, getNotifications]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full bg-surface dark:bg-surface-dark transition-colors duration-200 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 pt-6 pb-4 flex-shrink-0 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-slate-900 dark:text-slate-100", children: "Notifications" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: "Manage recent alerts and clear read items." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "px-3 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition",
            onClick: clearReadNotifications,
            title: "Clear all read notifications",
            disabled: !notifications.some((n2) => n2.isRead),
            children: "Clear read"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "p-2 rounded-xl text-primary hover:bg-primary/10 transition-colors",
            onClick: markAllAsRead,
            title: "Mark all as read",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 20 })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 px-5 mb-4 flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `px-4 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all ${!unreadOnly ? "bg-primary text-white shadow-soft" : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"}`,
          onClick: () => setUnreadOnly(false),
          children: "All"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `px-4 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all ${unreadOnly ? "bg-primary text-white shadow-soft" : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"}`,
          onClick: () => setUnreadOnly(true),
          children: "Unread"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto pt-2", children: notifications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-16 rounded-full bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "size-8 text-slate-300 dark:text-slate-600" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 dark:text-slate-400 font-semibold", children: "No notifications yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs", children: "Stay tuned for updates!" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2 space-y-1", children: [
      notifications.map((notification) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        NotificationItem,
        {
          notification
        },
        notification._id
      )),
      hasMore && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "px-6 py-2 bg-background dark:bg-background-dark border border-border dark:border-border-dark text-primary text-xs rounded-xl font-bold hover:shadow-soft transition-all active:scale-95",
          onClick: () => loadMoreNotifications(unreadOnly),
          disabled: isNotificationsLoading,
          children: isNotificationsLoading ? "Loading..." : "Load more notifications"
        }
      ) })
    ] }) })
  ] });
};
const NotificationBell = ({ hideText = false, dropdownClass = "right-0 mt-2 origin-top-right" }) => {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const { unreadCount, getUnreadCount, subscribeToNotifications, unsubscribeFromNotifications } = useNotificationStore();
  const { authUser, socket } = useAuthStore();
  const bellRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (authUser && socket) {
      getUnreadCount();
      subscribeToNotifications();
    }
    return () => {
      if (socket) unsubscribeFromNotifications();
    };
  }, [authUser, socket, getUnreadCount, subscribeToNotifications, unsubscribeFromNotifications]);
  reactExports.useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref: bellRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: hideText ? `size-10 flex items-center justify-center rounded-xl bg-slate-200/50 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all duration-200 active:scale-95 ${unreadCount > 0 ? "text-blue-500 dark:text-blue-400" : ""}` : `px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-xl font-medium flex items-center gap-2 transition-all active:scale-[0.98] ${unreadCount > 0 ? "text-blue-500 dark:text-blue-400" : ""}`,
        onClick: () => setIsOpen(!isOpen),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "size-5" }),
            unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1.5 -right-1.5 bg-blue-500 text-white dark:bg-blue-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center animate-pulse", children: unreadCount > 99 ? "99+" : unreadCount })
          ] }),
          !hideText && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Notifications" })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute z-50 animate-in fade-in zoom-in duration-200 ${dropdownClass}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationPanel, { onClose: () => setIsOpen(false) }) })
  ] });
};
const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [showStatusModal, setShowStatusModal] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    showStatusModal && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusUpdateModal, { onClose: () => setShowStatusModal(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "header",
      {
        className: "bg-surface/80 dark:bg-surface-dark/80 border-b border-border dark:border-border-dark fixed w-full top-0 z-40 backdrop-blur-md transition-colors duration-200",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 h-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between h-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5 hover:opacity-80 transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-9 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/blink.svg", alt: "Blink Logo", className: "w-5 h-5 object-contain" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-slate-900 dark:text-slate-100", children: "Blink" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            authUser && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => setShowStatusModal(true),
                  className: "px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-xl font-medium flex items-center gap-2 shadow-soft transition-all active:scale-[0.98]",
                  title: "Update status",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Status" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationBell, {})
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/settings",
                className: "px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-xl font-medium flex items-center gap-2 shadow-soft transition-all active:scale-[0.98]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Settings" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => window.dispatchEvent(new Event("openChatSearch")),
                className: "p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 sm:hidden",
                title: "Search chats",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 18 })
              }
            ),
            authUser && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/profile",
                  className: "px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-xl font-medium flex items-center gap-2 shadow-soft transition-all active:scale-[0.98]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Profile" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  className: "px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-sm rounded-xl font-medium flex items-center gap-2 transition-all active:scale-[0.98]",
                  onClick: logout,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Logout" })
                  ]
                }
              )
            ] })
          ] })
        ] }) })
      }
    )
  ] });
};
const SidebarRail = ({ activeTab = "chats", setActiveTab = () => {
}, forceShow = false }) => {
  const { logout, authUser } = useAuthStore();
  const {
    workspaces,
    selectedWorkspace,
    setSelectedWorkspace,
    createWorkspace
  } = useChatStore();
  const [showCreateModal, setShowCreateModal] = reactExports.useState(false);
  const [newServerName, setNewServerName] = reactExports.useState("");
  const [selectedGradient, setSelectedGradient] = reactExports.useState("linear-gradient(135deg, #a855f7 0%, #ec4899 100%)");
  const gradients = [
    { label: "Indigo Mist", value: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)" },
    { label: "Sunset Glow", value: "linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)" },
    { label: "Ocean Breeze", value: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)" },
    { label: "Emerald Spark", value: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)" },
    { label: "Purple Nebula", value: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)" }
  ];
  const handleCreateServer = (e2) => {
    e2.preventDefault();
    if (!newServerName.trim()) return;
    createWorkspace(newServerName.trim(), selectedGradient);
    setNewServerName("");
    setShowCreateModal(false);
  };
  const getWorkspaceInitials = (name) => {
    return name.split(" ").map((word) => word[0]).slice(0, 2).join("").toUpperCase();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: `${forceShow ? "flex" : "hidden lg:flex"} flex-col items-center py-5 w-16 h-full bg-slate-900 border-r border-slate-800 justify-between flex-shrink-0 z-30 select-none transition-colors duration-200`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              setSelectedWorkspace(null);
              setActiveTab("chats");
            },
            className: "relative group flex items-center justify-center w-full focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-xl",
            "aria-label": "Direct Messages",
            "aria-current": activeTab === "chats" && selectedWorkspace === null,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `absolute left-0 w-1 bg-white rounded-r-md transition-all duration-300 ${activeTab === "chats" && selectedWorkspace === null ? "h-8" : "h-0 group-hover:h-3"}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `size-12 flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden ${activeTab === "chats" && selectedWorkspace === null ? "rounded-xl bg-primary text-white" : "rounded-2xl bg-slate-800 text-slate-400 hover:rounded-xl hover:bg-primary hover:text-white"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 22, fill: activeTab === "chats" ? "currentColor" : "none", "aria-hidden": "true" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Direct Messages" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              setSelectedWorkspace(null);
              setActiveTab("users");
            },
            className: "relative group flex items-center justify-center w-full focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-xl",
            "aria-label": "Friends",
            "aria-current": activeTab === "users",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `absolute left-0 w-1 bg-white rounded-r-md transition-all duration-300 ${activeTab === "users" ? "h-8" : "h-0 group-hover:h-3"}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `size-12 flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden ${activeTab === "users" ? "rounded-xl bg-primary text-white" : "rounded-2xl bg-slate-800 text-slate-400 hover:rounded-xl hover:bg-primary hover:text-white"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 22, fill: activeTab === "users" ? "currentColor" : "none", "aria-hidden": "true" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Friends" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              setSelectedWorkspace(null);
              setActiveTab("notifications");
            },
            className: "relative group flex items-center justify-center w-full focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-xl",
            "aria-label": "Notifications",
            "aria-current": activeTab === "notifications",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `absolute left-0 w-1 bg-white rounded-r-md transition-all duration-300 ${activeTab === "notifications" ? "h-8" : "h-0 group-hover:h-3"}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `size-12 flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden ${activeTab === "notifications" ? "rounded-xl bg-primary text-white" : "rounded-2xl bg-slate-800 text-slate-400 hover:rounded-xl hover:bg-primary hover:text-white"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 22, fill: activeTab === "notifications" ? "currentColor" : "none", "aria-hidden": "true" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Notifications" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-[2px] bg-slate-800 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 w-full items-center overflow-y-auto max-h-[calc(100vh-420px)] scrollbar-none", children: [
          workspaces.map((ws) => {
            const isActive = (selectedWorkspace == null ? void 0 : selectedWorkspace._id) === ws._id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setSelectedWorkspace(ws),
                className: "relative group flex items-center justify-center w-full focus:outline-none",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `absolute left-0 w-1 bg-white rounded-r-md transition-all duration-300 ${isActive ? "h-8" : "h-0 group-hover:h-3"}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: { background: ws.icon || "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)" },
                      className: `size-12 flex items-center justify-center font-bold text-white text-sm shadow-md transition-all duration-300 ${isActive ? "rounded-xl" : "rounded-2xl hover:rounded-xl"}`,
                      children: getWorkspaceInitials(ws.name)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-[70px] px-3 py-1.5 bg-slate-950 text-white text-xs font-semibold rounded-lg shadow-xl border border-slate-800 opacity-0 scale-95 origin-left pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 whitespace-nowrap z-50", children: ws.name })
                ]
              },
              ws._id
            );
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setShowCreateModal(true),
              className: "relative group flex items-center justify-center w-full focus:outline-none",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-12 border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-2xl hover:rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-emerald-600 transition-all duration-300 cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-[70px] px-3 py-1.5 bg-slate-950 text-white text-xs font-semibold rounded-lg shadow-xl border border-slate-800 opacity-0 scale-95 origin-left pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 whitespace-nowrap z-50", children: "Add a Server" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 w-full px-2 mt-auto", children: [
        authUser && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/profile",
            className: "relative rounded-full ring-2 ring-slate-800 hover:ring-primary transition-all duration-200 overflow-hidden size-10 flex-shrink-0",
            title: "View Profile",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: authUser.profilePic || "/avatar.png",
                alt: "profile",
                className: "w-full h-full object-cover"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/settings",
            className: "relative size-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200 group",
            title: "Settings",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-5 h-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-[70px] bg-slate-950 text-white text-xs rounded py-1 px-2 opacity-0 scale-95 origin-left pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 whitespace-nowrap z-50", children: "Settings" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: logout,
            className: "relative size-10 flex items-center justify-center rounded-xl text-red-400/80 hover:text-red-400 hover:bg-red-950/20 transition-all duration-200 group",
            title: "Logout",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-5 h-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-[70px] bg-slate-950 text-white text-xs rounded py-1 px-2 opacity-0 scale-95 origin-left pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 whitespace-nowrap z-50", children: "Logout" })
            ]
          }
        )
      ] })
    ] }),
    showCreateModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "w-full max-w-md bg-surface-dark border border-border-dark rounded-2xl shadow-2xl p-6 relative animate-in zoom-in-95 duration-200",
        role: "dialog",
        "aria-modal": "true",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-slate-100 mb-2", children: "Create Your Server" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm mb-6", children: "Your server is where you and your team communicate. Customize it with a name and a vibrant theme." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCreateServer, className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Server Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  required: true,
                  placeholder: "e.g. Frontend Pioneers",
                  value: newServerName,
                  onChange: (e2) => setNewServerName(e2.target.value),
                  className: "w-full bg-slate-800 border border-slate-700 hover:border-slate-600 focus:border-primary rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                  autoFocus: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Server Theme Gradient" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 flex-wrap", children: gradients.map((grad) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSelectedGradient(grad.value),
                  className: `size-10 rounded-full border-2 transition-all flex items-center justify-center ${selectedGradient === grad.value ? "border-white scale-110 shadow-lg shadow-white/10" : "border-transparent hover:scale-105"}`,
                  style: { background: grad.value },
                  title: grad.label,
                  children: selectedGradient === grad.value && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-2 bg-white rounded-full" })
                },
                grad.label
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowCreateModal(false),
                  className: "px-4 py-2 text-slate-400 hover:text-slate-200 text-sm font-semibold rounded-lg hover:bg-slate-800 transition",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  className: "px-5 py-2.5 bg-primary hover:bg-primary-dark active:opacity-90 text-white text-sm font-semibold rounded-xl shadow-lg shadow-primary/20 transition",
                  children: "Create Server"
                }
              )
            ] })
          ] })
        ]
      }
    ) })
  ] });
};
const useFriendStore = create((set, get) => ({
  friends: [],
  requests: [],
  // incoming pending
  sentRequests: [],
  // outgoing pending
  isFetchingFriends: false,
  isFetchingRequests: false,
  fetchFriends: async () => {
    set({ isFetchingFriends: true });
    try {
      const res = await axiosInstance.get("/friends");
      set({ friends: res.data });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "load friends");
    } finally {
      set({ isFetchingFriends: false });
    }
  },
  fetchRequests: async () => {
    set({ isFetchingRequests: true });
    try {
      const res = await axiosInstance.get("/friends/requests");
      set({
        requests: res.data.incoming || [],
        sentRequests: res.data.outgoing || []
      });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "load requests");
    } finally {
      set({ isFetchingRequests: false });
    }
  },
  sendRequest: async (receiverId) => {
    try {
      const res = await axiosInstance.post("/friends/request", { receiverId });
      _t.success("Friend request sent");
      set((state) => ({
        sentRequests: [...state.sentRequests, res.data]
      }));
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "send friend request");
    }
  },
  acceptRequest: async (requesterId) => {
    try {
      await axiosInstance.post("/friends/accept", { requesterId });
      _t.success("Friend request accepted");
      const acceptedRequest = get().requests.find((req) => {
        var _a;
        return ((_a = req.requesterId) == null ? void 0 : _a._id) === requesterId;
      });
      if (acceptedRequest) {
        set((state) => ({
          requests: state.requests.filter((req) => {
            var _a;
            return ((_a = req.requesterId) == null ? void 0 : _a._id) !== requesterId;
          }),
          friends: [...state.friends, acceptedRequest.requesterId]
        }));
      } else {
        await get().fetchRequests();
        await get().fetchFriends();
      }
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "accept friend request");
    }
  },
  declineRequest: async (requesterId) => {
    try {
      await axiosInstance.post("/friends/decline", { requesterId });
      _t.success("Friend request declined");
      set((state) => ({
        requests: state.requests.filter((req) => {
          var _a;
          return ((_a = req.requesterId) == null ? void 0 : _a._id) !== requesterId;
        })
      }));
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "decline friend request");
    }
  },
  blockUser: async (userId) => {
    try {
      await axiosInstance.post("/friends/block", { userId });
      _t.success("User blocked");
      const authStore = useAuthStore.getState();
      if (authStore.authUser) {
        useAuthStore.setState({
          authUser: {
            ...authStore.authUser,
            blockedUsers: [...authStore.authUser.blockedUsers || [], userId]
          }
        });
      }
      set((state) => ({
        friends: state.friends.filter((f2) => f2._id !== userId),
        requests: state.requests.filter((req) => {
          var _a;
          return ((_a = req.requesterId) == null ? void 0 : _a._id) !== userId;
        }),
        sentRequests: state.sentRequests.filter((req) => {
          var _a;
          return ((_a = req.receiverId) == null ? void 0 : _a._id) !== userId;
        })
      }));
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "block user");
    }
  },
  subscribeToFriendEvents: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.on("friendRequestReceived", (newRequest2) => {
      var _a;
      const exists = get().requests.some((req) => req._id === newRequest2._id);
      if (!exists) {
        set((state) => ({
          requests: [...state.requests, newRequest2]
        }));
        _t.success(`New friend request from ${((_a = newRequest2.requesterId) == null ? void 0 : _a.fullName) || "someone"}`);
      }
    });
    socket.on("friendRequestAccepted", (data) => {
      const exists = get().friends.some((f2) => f2._id === data.user._id);
      if (!exists) {
        set((state) => ({
          friends: [...state.friends, data.user],
          sentRequests: state.sentRequests.filter((req) => req._id !== data.friendshipId)
        }));
        _t.success(`${data.user.fullName} accepted your friend request!`);
      }
    });
    socket.on("friendRequestDeclined", (data) => {
      set((state) => ({
        sentRequests: state.sentRequests.filter((req) => {
          var _a;
          return ((_a = req.receiverId) == null ? void 0 : _a._id) !== data.receiverId;
        }),
        requests: state.requests.filter((req) => {
          var _a;
          return ((_a = req.requesterId) == null ? void 0 : _a._id) !== data.requesterId;
        })
      }));
    });
  },
  unsubscribeFromFriendEvents: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("friendRequestReceived");
    socket.off("friendRequestAccepted");
    socket.off("friendRequestDeclined");
  }
}));
const SidebarSkeleton = () => {
  const skeletonContacts = Array(6).fill(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "h-full w-full lg:w-[300px] border-r border-base-200/80 bg-base-200 dark:bg-base-800/50 flex flex-col transition-all duration-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 pt-6 pb-4 flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-7 w-28 rounded-lg" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton size-8 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton size-8 rounded-full" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 mb-6 flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-3 w-16 mb-3 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton size-11 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-2.5 w-8 rounded" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton size-11 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-2.5 w-8 rounded" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton size-11 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-2.5 w-8 rounded" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-y-auto w-full py-2 space-y-1", children: skeletonContacts.map((_2, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 flex items-center gap-3.5 mx-3 rounded-2xl border border-transparent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton size-12 rounded-full" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left min-w-0 flex-1 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-4 w-28 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-2.5 w-10 rounded" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-3 w-40 rounded" })
      ] })
    ] }, idx)) })
  ] });
};
const FrequentContacts = ({ users, onSelectUser }) => {
  if (!users || users.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border dark:border-border-dark", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold text-slate-400 uppercase tracking-widest mb-3", children: "Frequent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 overflow-x-auto pb-1 scrollbar-none", children: users.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => onSelectUser(user),
        className: "flex flex-col items-center gap-2 group",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { src: user.profilePic, size: "lg", className: "transition-transform group-hover:scale-105" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold text-slate-600 dark:text-slate-400 truncate w-12 text-center", children: user.fullName ? user.fullName.split(" ")[0] : "User" })
        ]
      },
      user._id
    )) })
  ] });
};
const tokens = {
  colors: {
    primary: "bg-blue-600",
    primaryDark: "bg-blue-700",
    primaryText: "text-white",
    text: "text-slate-900",
    surface: "bg-white",
    surfaceDark: "bg-slate-800",
    border: "border-slate-200",
    borderDark: "dark:border-slate-700",
    danger: "bg-red-600",
    success: "bg-emerald-500",
    muted: "text-slate-500"
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px"
  },
  radii: {
    sm: "6px",
    md: "12px",
    lg: "18px"
  },
  typography: {
    body: "14px",
    small: "12px",
    large: "16px"
  },
  elevation: {
    soft: "shadow-soft",
    medium: "shadow-md",
    large: "shadow-2xl"
  }
};
const Button = ({ children, variant = "primary", size = "md", className = "", ...props }) => {
  const base = "inline-flex items-center justify-center rounded-xl font-medium transition-colors disabled:opacity-50";
  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base"
  };
  const variants = {
    primary: `${tokens.colors.primary} text-white hover:${tokens.colors.primaryDark}`,
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200",
    danger: `${tokens.colors.danger} text-white hover:bg-red-700`
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: [base, sizes[size], variants[variant], className].join(" "), ...props, children });
};
const IconButton = ({ children, variant = "ghost", className = "", ...props }) => {
  const base = "inline-flex items-center justify-center rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    ghost: `text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700`,
    active: `${tokens.colors.primary} text-white hover:${tokens.colors.primaryDark}`
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: [base, variants[variant], className].join(" "), ...props, children });
};
const Input = React.forwardRef(({ className = "", error = false, ...props }, ref) => {
  const base = "w-full px-3 py-2 rounded-2xl border transition focus:outline-none";
  const state = error ? "border-red-400 bg-red-50" : `${tokens.colors.border} ${tokens.colors.surface}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      ref,
      className: [base, state, className].join(" "),
      "aria-invalid": error,
      ...props
    }
  );
});
const Badge = ({ count = 0, className = "" }) => {
  if (!count || count <= 0) return null;
  const display = count > 99 ? "99+" : String(count);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: [
    "inline-flex items-center justify-center min-w-[20px] px-2 py-0.5 rounded-full text-xs font-bold",
    tokens.colors.success,
    "text-white",
    className
  ].join(" "), "aria-label": `${display} unread`, children: display });
};
const ConversationList = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
    searchUsers,
    searchResults
  } = useChatStore();
  const { friends, requests, sentRequests, fetchFriends, fetchRequests } = useFriendStore();
  const { onlineUsers, authUser } = useAuthStore();
  const [searchInput, setSearchInput] = reactExports.useState("");
  const searchRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    getUsers();
    fetchFriends();
    fetchRequests();
  }, [getUsers, fetchFriends, fetchRequests]);
  const handleSearch = (e2) => {
    const query = e2.target.value;
    setSearchInput(query);
    searchUsers(query);
  };
  reactExports.useEffect(() => {
    const onKeyDown = (e2) => {
      var _a;
      const key = (e2.key || "").toLowerCase();
      if ((e2.ctrlKey || e2.metaKey) && key === "k") {
        e2.preventDefault();
        (_a = searchRef.current) == null ? void 0 : _a.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    const onOpen = () => {
      var _a;
      return (_a = searchRef.current) == null ? void 0 : _a.focus();
    };
    window.addEventListener("openChatSearch", onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("openChatSearch", onOpen);
    };
  }, []);
  const isRelated = (userId) => {
    if (!userId) return false;
    const uid = String(userId);
    const isFriend = friends.some((f2) => String(f2._id) === uid);
    if (isFriend) return true;
    const hasIncoming = requests.some((r2) => r2.requesterId && String(r2.requesterId._id) === uid);
    if (hasIncoming) return true;
    const hasOutgoing = sentRequests.some((r2) => r2.receiverId && String(r2.receiverId._id) === uid);
    if (hasOutgoing) return true;
    return false;
  };
  const displayUsers = searchInput ? searchResults : users;
  const baseList = displayUsers.filter((user) => searchInput || user.lastMessage || isRelated(user._id)).sort((a2, b2) => {
    const aTime = a2.lastMessage ? new Date(a2.lastMessage.createdAt).getTime() : 0;
    const bTime = b2.lastMessage ? new Date(b2.lastMessage.createdAt).getTime() : 0;
    return bTime - aTime;
  });
  const frequentUsers = friends.slice(0, 5);
  const pinnedUsers = baseList.filter((user) => {
    var _a;
    return (_a = authUser == null ? void 0 : authUser.pinnedChats) == null ? void 0 : _a.includes(user._id);
  });
  const unpinnedUsers = baseList.filter((user) => {
    var _a;
    return !((_a = authUser == null ? void 0 : authUser.pinnedChats) == null ? void 0 : _a.includes(user._id));
  });
  if (isUsersLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarSkeleton, {});
  const renderUserItem = (user) => {
    const isOnline = onlineUsers.includes(user._id);
    const lastMessage = user.lastMessage;
    const isSelected = (selectedUser == null ? void 0 : selectedUser._id) === user._id;
    const lastTime = (lastMessage == null ? void 0 : lastMessage.createdAt) ? formatMessageTime(lastMessage.createdAt) : "";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setSelectedUser(user),
        className: `w-full flex items-center gap-3.5 p-3.5 mx-2 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${isSelected ? "bg-primary/10 shadow-soft" : "hover:bg-slate-50 dark:hover:bg-slate-800"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { src: user.profilePic, size: "md" }),
            isOnline && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-slate-800", "aria-label": "Online" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-slate-900 dark:text-slate-100 truncate text-sm", children: user.fullName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("time", { className: "text-[10px] text-slate-400 font-medium", dateTime: lastMessage == null ? void 0 : lastMessage.createdAt, children: lastTime })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 truncate", children: (lastMessage == null ? void 0 : lastMessage.text) || "..." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { count: user.unreadCount })
            ] })
          ] })
        ]
      },
      user._id
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "h-full w-full lg:w-[320px] bg-surface dark:bg-surface-dark flex flex-col transition-colors duration-200 border-r border-border dark:border-border-dark", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 pt-6 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-slate-900 dark:text-slate-100", children: "Chats" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "p-2 rounded-xl",
          onClick: () => setSearchInput(""),
          title: "New chat",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { size: 18 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "text",
          placeholder: "Search...",
          value: searchInput,
          onChange: handleSearch,
          ref: searchRef,
          "aria-label": "Search chats",
          className: "w-full pl-9 pr-4 py-2 rounded-2xl text-sm"
        }
      )
    ] }) }),
    !searchInput && /* @__PURE__ */ jsxRuntimeExports.jsx(FrequentContacts, { users: frequentUsers, onSelectUser: setSelectedUser }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto space-y-1 pt-2 pb-6", children: pinnedUsers.length === 0 && unpinnedUsers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-10 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-sm", children: "No conversations yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs mt-1", children: "Start by adding friends from the Friends tab!" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      pinnedUsers.map(renderUserItem),
      unpinnedUsers.map(renderUserItem)
    ] }) })
  ] });
};
const DEFAULT_THEME = "system";
const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || DEFAULT_THEME,
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
  toggleTheme: () => {
    set((state) => {
      let nextTheme;
      if (state.theme === "system") {
        nextTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "light" : "dark";
      } else {
        nextTheme = state.theme === "dark" ? "light" : "dark";
      }
      localStorage.setItem("chat-theme", nextTheme);
      return { theme: nextTheme };
    });
  }
}));
const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: toggleTheme,
      className: "size-9 flex items-center justify-center rounded-xl bg-slate-200/50 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all duration-200 active:scale-95",
      title: `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
      children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { size: 18, className: "text-amber-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { size: 18, className: "text-blue-500" })
    }
  );
};
const ExportChatModal = ({ user, onClose }) => {
  const [format, setFormat] = reactExports.useState("json");
  const [includeDeleted, setIncludeDeleted] = reactExports.useState(false);
  const [isExporting, setIsExporting] = reactExports.useState(false);
  const { exportChat } = useChatStore();
  const formatOptions = [
    {
      value: "json",
      label: "JSON",
      description: "Complete data with all metadata",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileJson, { className: "w-5 h-5" })
    },
    {
      value: "text",
      label: "Text",
      description: "Human-readable text format",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5" })
    },
    {
      value: "csv",
      label: "CSV",
      description: "Spreadsheet-compatible format",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { className: "w-5 h-5" })
    }
  ];
  const handleExport = async () => {
    setIsExporting(true);
    try {
      const success = await exportChat(user._id, format, includeDeleted);
      if (success) {
        _t.success(`Chat exported as ${format.toUpperCase()}`);
        onClose();
      }
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 bg-slate-900/60 backdrop-blur-sm",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-xl max-w-md w-full animate-fadeIn overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-slate-800 dark:text-slate-100", children: "Export Chat" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-400 dark:text-slate-500 font-semibold mt-1", children: [
            "Export conversation with ",
            user.fullName
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-500 dark:hover:text-slate-200 transition-colors",
            disabled: isExporting,
            children: "✕"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3", children: "Export Format" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: formatOptions.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: `flex items-center p-3 rounded-xl border cursor-pointer transition-all duration-200 ${format === option.value ? "border-blue-500 bg-blue-500/5 dark:border-blue-400 dark:bg-blue-400/5" : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "radio",
                    name: "format",
                    value: option.value,
                    checked: format === option.value,
                    onChange: (e2) => setFormat(e2.target.value),
                    className: "w-4 h-4 text-blue-500 border-slate-350 dark:border-slate-600 focus:ring-blue-500 focus:ring-1 cursor-pointer mr-3"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-blue-500 dark:text-blue-400 ${format === option.value ? "" : "opacity-60"}`, children: option.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-sm text-slate-800 dark:text-slate-100", children: option.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: option.description })
                  ] })
                ] })
              ]
            },
            option.value
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer select-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: includeDeleted,
              onChange: (e2) => setIncludeDeleted(e2.target.checked),
              className: "w-4 h-4 text-blue-500 border-slate-350 dark:border-slate-600 rounded bg-transparent focus:ring-blue-500 focus:ring-1 cursor-pointer"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-sm text-slate-800 dark:text-slate-100", children: "Include deleted messages" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: "Include messages that have been deleted" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2", children: "What gets exported:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-xs text-slate-500 dark:text-slate-400 space-y-1 font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Message text and timestamps" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Images and file attachments" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Reactions and replies" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Edit history and pinned messages" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Forwarded message information" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end p-6 border-t border-slate-200 dark:border-slate-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-semibold text-xs transition-all active:scale-[0.98]",
            disabled: isExporting,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleExport,
            className: "px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-xl font-semibold text-xs transition-all active:scale-[0.98] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5",
            disabled: isExporting,
            children: isExporting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { className: "w-3.5 h-3.5 mr-1 animate-spin" }),
              "Exporting..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5 mr-1" }),
              "Export Chat"
            ] })
          }
        )
      ] })
    ] })
  ] });
};
const expirationOptions = [
  { label: "Off", value: "off" },
  { label: "24 Hours", value: "24h" },
  { label: "7 Days", value: "7d" },
  { label: "90 Days", value: "90d" }
];
const buildExpiry = (value2) => {
  const now = /* @__PURE__ */ new Date();
  if (value2 === "24h") now.setHours(now.getHours() + 24);
  if (value2 === "7d") now.setDate(now.getDate() + 7);
  if (value2 === "90d") now.setDate(now.getDate() + 90);
  return now;
};
const ChatPrivacyMenu = ({
  open,
  onClose,
  selectedUser,
  chatSettings,
  isLocked,
  onSetChatExpiry,
  onLockChat,
  onUnlockChat
}) => {
  const [expiryOption, setExpiryOption] = reactExports.useState("off");
  const [pin, setPin] = reactExports.useState("");
  const [locked, setLocked] = reactExports.useState(isLocked);
  const [statusMessage, setStatusMessage] = reactExports.useState("");
  reactExports.useEffect(() => {
    setLocked(isLocked);
    if (selectedUser) {
      const settings = chatSettings[selectedUser._id];
      if (settings == null ? void 0 : settings.expiryLabel) {
        setExpiryOption(settings.expiryLabel);
      }
    }
  }, [selectedUser, chatSettings, isLocked]);
  const handleSaveExpiry = async () => {
    if (!selectedUser) return;
    const expiresAt = expiryOption === "off" ? null : buildExpiry(expiryOption);
    await onSetChatExpiry(selectedUser._id, expiryOption, expiresAt);
    setStatusMessage("Disappearing messages updated.");
  };
  const handleLock = async () => {
    if (!selectedUser) return;
    if (!pin || pin.length < 4) {
      setStatusMessage("PIN must be at least 4 digits.");
      return;
    }
    await onLockChat(selectedUser._id, pin);
    setLocked(true);
    setStatusMessage("Chat locked successfully.");
  };
  const handleUnlock = async () => {
    if (!selectedUser) return;
    const ok2 = await onUnlockChat(selectedUser._id, pin);
    if (ok2) {
      setLocked(false);
      setStatusMessage("Chat unlocked.");
    }
  };
  if (!open || !selectedUser) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm sm:p-4 transition-all duration-200",
      onClick: onClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "w-full sm:max-w-md bg-white dark:bg-slate-800 shadow-2xl sm:rounded-3xl border-t sm:border border-slate-200 dark:border-slate-700 overflow-hidden animate-fadeIn mobile-bottom-sheet h-fit max-h-[90dvh] flex flex-col",
          onClick: (e2) => e2.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pt-3 sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500", children: "Privacy Settings" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-slate-800 dark:text-slate-100 truncate max-w-[200px]", children: selectedUser.fullName || selectedUser.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "size-8 flex items-center justify-center bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors",
                  onClick: onClose,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-5 space-y-6 scrollbar-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { size: 18 }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800 dark:text-slate-100 text-sm", children: "Disappearing messages" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-500 dark:text-slate-400 font-medium", children: "Auto-delete messages after a period" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: expirationOptions.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setExpiryOption(option.value),
                    className: `rounded-xl border py-2.5 text-xs font-bold transition-all duration-200 ${expiryOption === option.value ? "border-blue-500 bg-blue-500 text-white shadow-md shadow-blue-500/20" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"}`,
                    children: option.label
                  },
                  option.value
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleSaveExpiry,
                    className: "mt-4 w-full py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-blue-500 dark:hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs transition-all active:scale-[0.98]",
                    children: "Update Preference"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 18 }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800 dark:text-slate-100 text-sm", children: "Chat Lock" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-500 dark:text-slate-400 font-medium", children: "Protect this chat with a secret PIN" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "password",
                    value: pin,
                    onChange: (e2) => setPin(e2.target.value),
                    placeholder: "Enter 4-digit PIN",
                    className: "w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm mb-3"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: locked ? handleUnlock : handleLock,
                      className: "flex-[2] py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-xs transition-all active:scale-[0.98] shadow-md shadow-blue-500/10",
                      children: locked ? "Unlock Conversation" : "Lock Conversation"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setPin(""),
                      className: "flex-1 py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-xs transition-all active:scale-[0.98]",
                      children: "Clear"
                    }
                  )
                ] })
              ] }),
              statusMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 text-center animate-fadeIn", children: statusMessage })
            ] })
          ]
        }
      )
    }
  );
};
const UserProfileModal = ({ open, onClose, user }) => {
  const [portalRoot, setPortalRoot] = reactExports.useState(null);
  const [isMuted, setIsMuted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const element = document.createElement("div");
    document.body.appendChild(element);
    setPortalRoot(element);
    return () => {
      document.body.removeChild(element);
    };
  }, []);
  if (!open || !user || !portalRoot) return null;
  return reactDomExports.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 transition-all duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden animate-fadeIn max-h-[90vh] flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-850 flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest", children: "Contact Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-500 hover:text-slate-700 dark:text-slate-400 rounded-xl transition-all",
            onClick: onClose,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-grow overflow-y-auto scrollbar-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center pt-8 pb-5 px-6 select-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-24 rounded-full border-4 border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: user.profilePic || "/avatar.png",
              alt: user.fullName || user.name,
              className: "w-full h-full object-cover"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-extrabold text-xl text-slate-850 dark:text-slate-100 mt-4 leading-tight", children: user.fullName || user.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-450 dark:text-slate-500 mt-1.5 font-bold", children: user.email || "Active Now" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-2.5 px-6 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex flex-col items-center justify-center p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-150 dark:border-slate-800 rounded-2xl hover:scale-105 active:scale-95 transition-all text-slate-650 dark:text-slate-305", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 18 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-extrabold mt-1.5 uppercase tracking-wider text-slate-450 dark:text-slate-500", children: "Call" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex flex-col items-center justify-center p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-150 dark:border-slate-800 rounded-2xl hover:scale-105 active:scale-95 transition-all text-slate-650 dark:text-slate-305", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { size: 18 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-extrabold mt-1.5 uppercase tracking-wider text-slate-450 dark:text-slate-500", children: "Video" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex flex-col items-center justify-center p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-150 dark:border-slate-800 rounded-2xl hover:scale-105 active:scale-95 transition-all text-slate-650 dark:text-slate-355", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 18 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-extrabold mt-1.5 uppercase tracking-wider text-slate-450 dark:text-slate-500", children: "Search" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setIsMuted(!isMuted),
              className: "flex flex-col items-center justify-center p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-150 dark:border-slate-800 rounded-2xl hover:scale-105 active:scale-95 transition-all text-slate-650 dark:text-slate-355",
              children: [
                isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { size: 18, className: "text-rose-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 18 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-extrabold mt-1.5 uppercase tracking-wider text-slate-450 dark:text-slate-500", children: isMuted ? "Unmute" : "Mute" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[11px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-widest mb-3", children: "Media, Links & Files" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:scale-[1.03] transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=120", className: "w-full h-full object-cover", alt: "Media" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-square rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-1.5 shadow-sm text-center hover:scale-[1.03] transition-all", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 18, className: "text-blue-500 mb-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] font-extrabold text-slate-550 dark:text-slate-400 truncate w-full", children: "project.pdf" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:scale-[1.03] transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=120", className: "w-full h-full object-cover", alt: "Media" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-center font-extrabold text-xs text-slate-500 dark:text-slate-400 shadow-sm hover:scale-[1.03] transition-all select-none", children: "+12" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[11px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-widest mb-3", children: "Profile Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3.5 bg-slate-50/50 dark:bg-slate-800/30 border border-slate-150 dark:border-slate-850 rounded-2xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider", children: "About" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-slate-750 dark:text-slate-200 mt-1 leading-relaxed", children: user.about || "Hey there! I am using Blink." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3.5 bg-slate-50/50 dark:bg-slate-800/30 border border-slate-150 dark:border-slate-850 rounded-2xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider", children: "Joined Blink" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-slate-750 dark:text-slate-200 mt-1", children: user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recently" })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    portalRoot
  );
};
const ChatInfoModal = ({ open, onClose, user, chatSettings }) => {
  const [portalRoot, setPortalRoot] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const element = document.createElement("div");
    document.body.appendChild(element);
    setPortalRoot(element);
    return () => {
      document.body.removeChild(element);
    };
  }, []);
  if (!open || !user || !portalRoot) return null;
  return reactDomExports.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4",
        role: "dialog",
        "aria-modal": "true",
        onClick: onClose,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xl overflow-hidden max-h-[90vh] animate-fadeIn",
            onClick: (e2) => e2.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 px-5 py-4 border-b border-slate-200 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-slate-800 dark:text-slate-100", children: "Conversation Info" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500 mt-0.5", children: user.fullName || user.name })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs rounded-xl font-semibold transition-all active:scale-[0.98] self-start sm:self-auto", onClick: onClose, children: "Close" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4 overflow-y-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: user.profilePic || "/avatar.png", alt: user.fullName || user.name, className: "size-20 rounded-full border border-slate-200 dark:border-slate-700 object-cover flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-slate-800 dark:text-slate-100 text-lg truncate", children: user.fullName || user.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-400 dark:text-slate-500 font-semibold truncate", children: user.email || "No email available" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2", children: "Settings" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-2.5 text-sm sm:grid-cols-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-750 dark:text-slate-200 font-bold text-xs uppercase tracking-wider", children: [
                      "Disappearing: ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500 dark:text-blue-400 ml-1 font-bold", children: (chatSettings == null ? void 0 : chatSettings.expiryLabel) || "Off" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-750 dark:text-slate-200 font-bold text-xs uppercase tracking-wider", children: [
                      "Locked: ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500 dark:text-blue-400 ml-1 font-bold", children: (chatSettings == null ? void 0 : chatSettings.isLocked) ? "Yes" : "No" })
                    ] })
                  ] })
                ] })
              ] })
            ]
          }
        )
      }
    ),
    portalRoot
  );
};
const ChatActionDrawer = ({
  open,
  onClose,
  selectedUser,
  chatSettings,
  lockedChats,
  setChatExpiry,
  lockChat,
  unlockChat,
  onPinnedMessages,
  onSearch
}) => {
  const [activePanel, setActivePanel] = reactExports.useState(null);
  const isLocked = selectedUser ? lockedChats.some((chat) => chat._id === selectedUser._id) : false;
  if (!open) return null;
  const renderPanel = () => {
    switch (activePanel) {
      case "export":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          ExportChatModal,
          {
            user: selectedUser,
            onClose: () => setActivePanel(null)
          }
        );
      case "privacy":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChatPrivacyMenu,
          {
            open: true,
            onClose: () => setActivePanel(null),
            selectedUser,
            chatSettings,
            isLocked,
            onSetChatExpiry: setChatExpiry,
            onLockChat: lockChat,
            onUnlockChat: unlockChat
          }
        );
      case "profile":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          UserProfileModal,
          {
            open: true,
            onClose: () => setActivePanel(null),
            user: selectedUser
          }
        );
      case "chatInfo":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChatInfoModal,
          {
            open: true,
            onClose: () => setActivePanel(null),
            user: selectedUser,
            chatSettings: chatSettings == null ? void 0 : chatSettings[selectedUser == null ? void 0 : selectedUser._id]
          }
        );
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              className: "w-full justify-start gap-3 text-left",
              onClick: () => {
                onPinnedMessages && onPinnedMessages();
                onClose();
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { size: 18, className: "text-slate-500" }),
                "Pinned Messages"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              className: "w-full justify-start gap-3 text-left",
              onClick: () => {
                onSearch && onSearch();
                onClose();
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 18, className: "text-slate-500" }),
                "Search"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              className: "w-full justify-start gap-3 text-left",
              onClick: () => setActivePanel("export"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 18, className: "text-slate-500" }),
                "Export Chat"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              className: "w-full justify-start gap-3 text-left",
              onClick: () => setActivePanel("privacy"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 18, className: "text-slate-500" }),
                "Privacy Settings"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              className: "w-full justify-start gap-3 text-left",
              onClick: () => setActivePanel("profile"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18, className: "text-slate-500" }),
                "View Profile"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              className: "w-full justify-start gap-3 text-left",
              onClick: () => setActivePanel("chatInfo"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 18, className: "text-slate-500" }),
                "Chat Info"
              ]
            }
          )
        ] });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center animate-fadeIn", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full sm:w-80 bg-white dark:bg-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl p-4 max-h-[70vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 px-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-slate-100", children: "Chat Actions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors",
          "aria-label": "Close",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20, className: "text-slate-500" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: renderPanel() })
  ] }) });
};
const ChatHeader = ({ onSearchClick, onPinnedClick, onBurgerClick, onAvatarClick }) => {
  const { selectedUser, setSelectedUser, userStatus, chatSettings, lockedChats, setChatExpiry, lockChat, unlockChat } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showMenu, setShowMenu] = reactExports.useState(false);
  const [showActionDrawer, setShowActionDrawer] = reactExports.useState(false);
  const menuRef = reactExports.useRef(null);
  const status = userStatus[selectedUser == null ? void 0 : selectedUser._id];
  const isOnline = onlineUsers.includes(selectedUser == null ? void 0 : selectedUser._id);
  reactExports.useEffect(() => {
    const handleClickOutside = (e2) => {
      if (menuRef.current && !menuRef.current.contains(e2.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);
  reactExports.useEffect(() => {
    if (showActionDrawer) {
      const handleEscape = (e2) => {
        if (e2.key === "Escape") setShowActionDrawer(false);
      };
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [showActionDrawer]);
  if (!selectedUser) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 flex-shrink-0" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 sm:px-4 py-2 sm:py-3 border-b border-border dark:border-border-dark bg-surface/95 dark:bg-surface-dark/95 backdrop-blur-md flex-shrink-0 z-20 select-none transition-colors duration-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 sm:gap-3 flex-1 min-w-0", children: [
        onBurgerClick && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onBurgerClick,
            className: "size-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 lg:hidden -ml-1 transition-colors focus:ring-2 focus:ring-primary outline-none",
            "aria-label": "Open Workspace Menu",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 20 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setSelectedUser(null),
            className: `size-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 lg:hidden transition-colors focus:ring-2 focus:ring-primary outline-none ${onBurgerClick ? "" : "-ml-1"}`,
            "aria-label": "Back",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 24 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex-shrink-0", onClick: onAvatarClick, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "size-10 sm:size-11 rounded-full relative shadow-sm border border-border dark:border-border-dark overflow-hidden cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: selectedUser.profilePic || "/avatar.png", alt: selectedUser.fullName, className: "object-cover w-full h-full" }),
          isOnline && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-slate-800" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 text-left cursor-pointer", onClick: onAvatarClick, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-[15px] sm:text-[16px] text-slate-900 dark:text-slate-100 leading-tight hover:text-primary transition-colors truncate", children: selectedUser.fullName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
            isOnline ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-emerald-500 font-bold", children: "Active Now" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-slate-400 font-semibold", children: "Offline" }),
            (status == null ? void 0 : status.statusMessage) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-300 dark:text-slate-600", children: "•" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-slate-400 truncate italic font-medium", children: [
                '"',
                status.statusMessage,
                '"'
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5 sm:gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconButton, { type: "button", title: "Voice Call", className: "hidden sm:inline-flex", variant: "ghost", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 18 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconButton, { type: "button", title: "Video Call", className: "hidden sm:inline-flex", variant: "ghost", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { size: 18 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          IconButton,
          {
            type: "button",
            onClick: onSearchClick,
            title: "Search messages",
            className: "hidden sm:inline-flex",
            variant: "ghost",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 18 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", ref: menuRef, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          IconButton,
          {
            type: "button",
            className: "",
            onClick: () => setShowActionDrawer(true),
            "aria-label": "Open chat actions",
            variant: "ghost",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { size: 18 })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedUser(null), className: "size-8 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors hidden lg:inline-flex", title: "Close Chat", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 17 }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ChatActionDrawer,
      {
        open: showActionDrawer,
        onClose: () => setShowActionDrawer(false),
        selectedUser,
        chatSettings,
        lockedChats,
        setChatExpiry,
        lockChat,
        unlockChat,
        onPinnedMessages: onPinnedClick,
        onSearch: onSearchClick
      }
    )
  ] });
};
const HELP_CENTER_EMAIL = "pansiluco@gmail.com";
const EMOJIS = [
  { char: "😀", name: "smile" },
  { char: "😂", name: "joy" },
  { char: "😍", name: "heart_eyes" },
  { char: "👍", name: "thumbsup" },
  { char: "🙌", name: "raised_hands" },
  { char: "🔥", name: "fire" },
  { char: "❤️", name: "heart" },
  { char: "✨", name: "sparkles" },
  { char: "🎉", name: "tada" },
  { char: "😎", name: "sunglasses" },
  { char: "🤔", name: "thinking" },
  { char: "😢", name: "cry" },
  { char: "😮", name: "open_mouth" },
  { char: "👏", name: "clap" },
  { char: "🚀", name: "rocket" },
  { char: "💯", name: "100" },
  { char: "🙏", name: "pray" },
  { char: "✅", name: "check" }
];
const EmojiPicker = ({ onSelect, onClose }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-full mb-3 right-0 sm:right-auto sm:left-0 z-[60] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-3 w-64 animate-fadeIn", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3 px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider", children: "Quick Emojis" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "×" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-6 gap-1", children: EMOJIS.map((emoji) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => {
          onSelect(emoji.char);
          onClose();
        },
        className: "size-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-xl active:scale-90",
        title: emoji.name,
        children: emoji.char
      },
      emoji.name
    )) })
  ] });
};
const MessageInput = () => {
  const [text, setText] = reactExports.useState("");
  const sendOnEnter = useChatStore((state) => {
    var _a;
    return ((_a = state.chatSettings) == null ? void 0 : _a.sendOnEnter) ?? true;
  });
  const setChatSetting = useChatStore((state) => state.setChatSetting);
  const [imagePreview, setImagePreview] = reactExports.useState(null);
  const [filePreview, setFilePreview] = reactExports.useState(null);
  const [isViewOnce, setIsViewOnce] = reactExports.useState(false);
  const [isSending, setIsSending] = reactExports.useState(false);
  const [isRecording, setIsRecording] = reactExports.useState(false);
  const [recordingTime, setRecordingTime] = reactExports.useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = reactExports.useState(false);
  const [emojiSuggestions, setEmojiSuggestions] = reactExports.useState([]);
  const fileInputRef = reactExports.useRef(null);
  const imageInputRef = reactExports.useRef(null);
  const mediaRecorderRef = reactExports.useRef(null);
  const audioChunksRef = reactExports.useRef([]);
  const recordingIntervalRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const { sendMessage, selectedUser, editingMessageId, editMessage, replyingToMessage, drafts, setDraft } = useChatStore();
  const { socket, authUser } = useAuthStore();
  const { friends, requests, sentRequests } = useFriendStore();
  reactExports.useEffect(() => {
    if (selectedUser) {
      const draft = drafts[selectedUser._id] || "";
      setText(draft);
    }
  }, [selectedUser, drafts]);
  const isSelf = (selectedUser == null ? void 0 : selectedUser._id) === (authUser == null ? void 0 : authUser._id);
  const isFriend = friends.some((f2) => String(f2._id) === String(selectedUser == null ? void 0 : selectedUser._id));
  const hasIncoming = requests.some((r2) => r2.requesterId && String(r2.requesterId._id) === String(selectedUser == null ? void 0 : selectedUser._id));
  const hasOutgoing = sentRequests.some((r2) => r2.receiverId && String(r2.receiverId._id) === String(selectedUser == null ? void 0 : selectedUser._id));
  const isHelpCenter = (selectedUser == null ? void 0 : selectedUser.email) === HELP_CENTER_EMAIL || (authUser == null ? void 0 : authUser.email) === HELP_CENTER_EMAIL;
  const canChat = isSelf || isFriend || isHelpCenter;
  const typingTimeoutRef = reactExports.useRef(null);
  const sendingDelayRef = reactExports.useRef(null);
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (e2) => {
        if (e2.data.size > 0) audioChunksRef.current.push(e2.data);
      };
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const audioFile = new File([audioBlob], `voice_${Date.now()}.webm`, { type: "audio/webm" });
        setFilePreview(audioFile);
        stream.getTracks().forEach((track) => track.stop());
      };
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      recordingIntervalRef.current = setInterval(() => setRecordingTime((prev) => prev + 1), 1e3);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      _t.error("Microphone access denied");
    }
  };
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(recordingIntervalRef.current);
    }
  };
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  const handleImageChange = (e2) => {
    const file = e2.target.files[0];
    if (!file.type.startsWith("image/")) {
      _t.error("Please select an image file");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      _t.error("File size must be less than 50MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFilePreview(null);
    };
    reader.readAsDataURL(file);
  };
  const handleFileChange = (e2) => {
    const file = e2.target.files[0];
    if (file.size > 50 * 1024 * 1024) {
      _t.error("File size must be less than 50MB");
      return;
    }
    setFilePreview(file);
    setImagePreview(null);
  };
  const removeAttachment = () => {
    setImagePreview(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (imageInputRef.current) imageInputRef.current.value = "";
  };
  const handleTextChange = (e2) => {
    const newText = e2.target.value;
    setText(newText);
    const lastWord = newText.split(" ").pop();
    if (lastWord.startsWith(":") && lastWord.length > 1) {
      const query = lastWord.substring(1).toLowerCase();
      const matches = EMOJIS.filter((e22) => e22.name.includes(query));
      setEmojiSuggestions(matches.slice(0, 5));
    } else {
      setEmojiSuggestions([]);
    }
    if (selectedUser) {
      setDraft(selectedUser._id, newText);
      socket.emit("typing", selectedUser._id);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => socket.emit("stopTyping", selectedUser._id), 2e3);
    }
  };
  const selectEmoji = (emojiChar) => {
    var _a;
    const words = text.split(" ");
    words.pop();
    const newText = [...words, emojiChar].join(" ") + " ";
    setText(newText);
    setEmojiSuggestions([]);
    if (selectedUser) setDraft(selectedUser._id, newText);
    (_a = inputRef.current) == null ? void 0 : _a.focus();
  };
  const handleSendMessage = async (e2) => {
    e2.preventDefault();
    if (!text.trim() && !imagePreview && !filePreview && !isRecording) return;
    if (isSending) return;
    if (isRecording) {
      stopRecording();
      return;
    }
    if (selectedUser) socket.emit("stopTyping", selectedUser._id);
    try {
      setIsSending(true);
      await new Promise((resolve) => {
        sendingDelayRef.current = setTimeout(resolve, 300);
      });
      const formData = new FormData();
      if (text.trim()) formData.append("text", text.trim());
      if (imagePreview) formData.append("image", imagePreview);
      if (filePreview) formData.append("file", filePreview);
      if (replyingToMessage) formData.append("replyTo", replyingToMessage._id);
      if (editingMessageId) {
        await editMessage(editingMessageId, text.trim());
      } else {
        formData.append("viewOnce", isViewOnce);
        await sendMessage(formData);
      }
      setText("");
      if (selectedUser) setDraft(selectedUser._id, "");
      setImagePreview(null);
      setFilePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (imageInputRef.current) imageInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
      _t.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };
  reactExports.useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (sendingDelayRef.current) clearTimeout(sendingDelayRef.current);
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    };
  }, []);
  if (selectedUser && !canChat) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full px-4 sm:px-6 py-4 bg-surface dark:bg-surface-dark border-t border-border dark:border-border-dark flex-shrink-0 select-none text-center transition-colors duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[800px] w-full mx-auto py-3 px-4 bg-slate-100 dark:bg-slate-900/50 border border-dashed border-border dark:border-border-dark rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-slate-500 dark:text-slate-400", children: hasIncoming ? "Accept their friend request to start chatting!" : hasOutgoing ? "Waiting for them to accept your friend request..." : "You can only chat with users after becoming friends" }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full px-3 sm:px-6 py-3 sm:py-4 bg-surface dark:bg-surface-dark border-t border-border dark:border-border-dark flex-shrink-0 select-none transition-colors duration-200 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[850px] w-full mx-auto relative", children: [
    emojiSuggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-full mb-3 left-0 z-50 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl shadow-soft flex flex-col overflow-hidden animate-fadeIn w-48", children: emojiSuggestions.map((emoji) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => selectEmoji(emoji.char),
        className: "px-3 py-2 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: emoji.char }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 dark:text-slate-500 text-xs", children: [
            ":",
            emoji.name,
            ":"
          ] })
        ]
      },
      emoji.name
    )) }),
    (imagePreview || filePreview) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex flex-col gap-2 animate-fadeIn", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block", children: [
        imagePreview ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: imagePreview, alt: "Preview", className: "w-20 h-20 object-cover rounded-xl border border-border dark:border-border-dark shadow-soft" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-20 h-20 flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-xl border border-border dark:border-border-dark", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { size: 24, className: "text-slate-400 dark:text-slate-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-[10px] truncate max-w-[60px] text-slate-500 dark:text-slate-400", children: filePreview == null ? void 0 : filePreview.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: removeAttachment, className: "absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors shadow-sm", type: "button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3.5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-bold cursor-pointer select-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: isViewOnce, onChange: (e2) => setIsViewOnce(e2.target.checked), className: "w-4 h-4 text-primary border-border dark:border-border-dark rounded bg-transparent focus:ring-primary focus:ring-1 cursor-pointer transition-all" }),
        "View once media"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSendMessage, className: "flex items-center w-full bg-background dark:bg-background-dark border border-border dark:border-border-dark rounded-2xl pl-4 pr-1.5 py-1.5 gap-2 shadow-soft focus-within:border-primary/50 transition-all duration-200", children: [
      isRecording ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center gap-3 px-2 py-1 text-rose-500 font-bold animate-pulse", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-2 rounded-full bg-rose-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
          "Recording ",
          formatTime(recordingTime)
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          ref: inputRef,
          rows: 1,
          className: "flex-1 resize-none bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-[14px] text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 leading-5",
          placeholder: editingMessageId ? "Edit message..." : "Type a message...",
          value: text,
          onChange: handleTextChange,
          onKeyDown: (e2) => {
            var _a;
            if (isSending) return;
            if (sendOnEnter) {
              if (e2.key === "Enter" && !e2.shiftKey) {
                e2.preventDefault();
                const form = e2.currentTarget.closest("form");
                (_a = form == null ? void 0 : form.requestSubmit) == null ? void 0 : _a.call(form);
              }
            }
          },
          disabled: isSending
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", ref: imageInputRef, onChange: handleImageChange, disabled: isSending }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", className: "hidden", ref: fileInputRef, onChange: handleFileChange, disabled: isSending }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            IconButton,
            {
              type: "button",
              onClick: () => setShowEmojiPicker(!showEmojiPicker),
              variant: showEmojiPicker ? "active" : "ghost",
              disabled: isSending || isRecording,
              title: "Open emoji picker",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smile, { size: 19 })
            }
          ),
          showEmojiPicker && /* @__PURE__ */ jsxRuntimeExports.jsx(EmojiPicker, { onSelect: (emoji) => {
            const newText = text + emoji;
            setText(newText);
            if (selectedUser) setDraft(selectedUser._id, newText);
          }, onClose: () => setShowEmojiPicker(false) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            IconButton,
            {
              type: "button",
              title: sendOnEnter ? "Send on Enter: ON" : "Send on Enter: OFF (Shift+Enter for newline)",
              onClick: () => setChatSetting("sendOnEnter", !sendOnEnter),
              variant: sendOnEnter ? "active" : "ghost",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          IconButton,
          {
            type: "button",
            onClick: () => {
              var _a;
              return (_a = imageInputRef.current) == null ? void 0 : _a.click();
            },
            disabled: isSending || isRecording,
            title: "Attach photo",
            variant: imagePreview ? "active" : "ghost",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 19 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          IconButton,
          {
            type: "button",
            onClick: () => {
              var _a;
              return (_a = fileInputRef.current) == null ? void 0 : _a.click();
            },
            disabled: isSending || isRecording,
            title: "Attach file",
            variant: filePreview ? "active" : "ghost",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { size: 19 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          IconButton,
          {
            type: "button",
            onClick: isRecording ? stopRecording : startRecording,
            disabled: isSending || text.trim() && !isRecording,
            title: isRecording ? "Stop recording" : "Record voice message",
            variant: isRecording ? "active" : "ghost",
            children: isRecording ? /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { size: 16, fill: "currentColor" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { size: 19 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            variant: "primary",
            size: "sm",
            className: "ml-1",
            disabled: !text.trim() && !imagePreview && !filePreview && !isRecording || isSending,
            children: isSending ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { size: 16, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 16 })
          }
        )
      ] })
    ] })
  ] }) });
};
const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-6 space-y-4 transition-colors duration-200", children: skeletonMessages.map((_2, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex gap-3 items-start w-full ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse flex-shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex flex-col max-w-[60%] ${idx % 2 === 0 ? "items-start" : "items-end"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 w-16 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-md mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-11 w-[200px] sm:w-[240px] bg-slate-200 dark:bg-slate-700 animate-pulse rounded-2xl ${idx % 2 === 0 ? "rounded-tl-none" : "rounded-tr-none"}` })
    ] })
  ] }, idx)) });
};
const MessageReactions = ({ message }) => {
  const { authUser } = useAuthStore();
  const { addReaction, removeReaction } = useChatStore();
  if (!message || !message.reactions || typeof message.reactions !== "object") {
    return null;
  }
  const reactionsKeys = Object.keys(message.reactions);
  if (reactionsKeys.length === 0) {
    return null;
  }
  const handleReactionClick = (emoji) => {
    var _a;
    try {
      const hasReaction = (_a = message.reactions[emoji]) == null ? void 0 : _a.includes(authUser._id);
      if (hasReaction) {
        removeReaction(message._id, emoji);
      } else {
        addReaction(message._id, emoji);
      }
    } catch (error) {
      console.error("Error handling reaction:", error);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap items-center gap-1", children: reactionsKeys.map((emoji) => {
    try {
      const users = message.reactions[emoji];
      if (!Array.isArray(users)) return null;
      const hasReaction = users == null ? void 0 : users.includes(authUser._id);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => handleReactionClick(emoji),
          className: `px-2 py-1 rounded-full text-sm flex items-center gap-1 transition-colors
                ${hasReaction ? "bg-primary text-primary-content" : "bg-base-200 hover:bg-base-300"}
              `,
          title: users == null ? void 0 : users.map((id2) => id2.substring(0, 4)).join(", "),
          children: [
            emoji,
            users && users.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: users.length > 1 ? users.length : "" })
          ]
        },
        emoji
      );
    } catch (error) {
      console.error("Error rendering reaction:", emoji, error);
      return null;
    }
  }) });
};
const QuotedMessage = ({ replyTo }) => {
  if (!replyTo || replyTo.isDeleted) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-base-200 p-2 rounded-md mb-2 border-l-4 border-primary text-sm opacity-75", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-400 mb-1", children: "Replying to message" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2", children: replyTo.text || (replyTo.image ? "📸 Image" : replyTo.file ? "📎 File" : "No content") })
  ] });
};
const ViewOnceMedia = ({ message, onOpened }) => {
  var _a;
  const [showModal, setShowModal] = reactExports.useState(false);
  const [hasOpened, setHasOpened] = reactExports.useState(message.viewedOnce || false);
  const openModal = () => {
    if (hasOpened) return;
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    if (!hasOpened) {
      setHasOpened(true);
      onOpened();
    }
  };
  const overlayText = hasOpened ? "Opened" : "View once";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: openModal,
        onContextMenu: (e2) => e2.preventDefault(),
        className: "relative w-full max-w-[220px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-left",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white text-xs uppercase tracking-[0.15em]", children: overlayText }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              hasOpened ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-slate-800 dark:text-slate-200", children: "View once media" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Tap to unlock the content one time only." })
          ] })
        ]
      }
    ),
    showModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden animate-fadeIn", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-semibold", children: "One-time view" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-slate-800 dark:text-slate-100", children: ((_a = message.file) == null ? void 0 : _a.name) || "Secure media" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: closeModal, className: "p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-500 dark:hover:text-slate-200 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
        message.image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: message.image,
            alt: "View once",
            className: "w-full rounded-2xl object-contain",
            onContextMenu: (e2) => e2.preventDefault()
          }
        ) : message.file ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-slate-100 dark:bg-slate-900/40 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-slate-800 dark:text-slate-100", children: message.file.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: message.file.type }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-slate-700 dark:text-slate-300", children: "This file will only be visible once." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-slate-100 dark:bg-slate-900/40 p-6 text-center text-sm text-slate-500", children: "No content to display." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500", children: "Right-click and screenshots are discouraged. This content will be marked opened after you close it." })
      ] })
    ] }) })
  ] });
};
const LinkPreview = ({ url: url2, isSelf }) => {
  const [metadata, setMetadata] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const res = await axiosInstance.get(`/messages/link-preview?url=${encodeURIComponent(url2)}`);
        setMetadata(res.data);
      } catch (error) {
        console.error("Failed to fetch link preview:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMetadata();
  }, [url2]);
  if (loading) return null;
  if (!metadata) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "a",
    {
      href: url2,
      target: "_blank",
      rel: "noopener noreferrer",
      className: `block mt-2 rounded-xl overflow-hidden border transition-all hover:scale-[1.01] active:scale-[0.99] ${isSelf ? "bg-white/10 border-white/20 text-white" : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"}`,
      children: [
        metadata.image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: metadata.image, alt: metadata.title, className: "w-full h-32 object-cover border-b border-inherit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold truncate mb-1", children: metadata.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] opacity-75 line-clamp-2 leading-relaxed mb-2", children: metadata.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 opacity-60 text-[9px] font-bold uppercase tracking-wider", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 10 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: new URL(url2).hostname })
          ] })
        ] })
      ]
    }
  );
};
const MessageItem = ({
  message,
  index,
  messagesLength,
  messages,
  messageEndRef,
  selectedUser,
  activeMessageMenu,
  openMessageMenu,
  closeMessageMenu,
  handleLongPressStart = () => {
  },
  handleLongPressEnd = () => {
  },
  addReaction,
  removeReaction,
  markViewOnceOpened
}) => {
  var _a, _b, _c, _d;
  const { authUser } = useAuthStore();
  const isSelf = message.senderId === authUser._id;
  const handleDoubleClick = message.isDeleted ? void 0 : () => {
    var _a2, _b2;
    const hasHeart = (_b2 = (_a2 = message.reactions) == null ? void 0 : _a2["❤️"]) == null ? void 0 : _b2.includes(authUser._id);
    if (hasHeart) {
      removeReaction(message._id, "❤️");
    } else {
      addReaction(message._id, "❤️");
    }
  };
  const handleMenuClick = (e2) => {
    e2.stopPropagation();
    const rect = e2.currentTarget.getBoundingClientRect();
    if (activeMessageMenu === message._id) {
      closeMessageMenu();
    } else {
      openMessageMenu(message._id, rect);
    }
  };
  const isNextSameSender = messages && index < messagesLength - 1 && ((_a = messages[index + 1]) == null ? void 0 : _a.senderId) === message.senderId && !((_b = messages[index + 1]) == null ? void 0 : _b.isDeleted);
  const isPrevSameSender = messages && index > 0 && ((_c = messages[index - 1]) == null ? void 0 : _c.senderId) === message.senderId && !((_d = messages[index - 1]) == null ? void 0 : _d.isDeleted);
  const showAvatar = !isSelf && !isNextSameSender;
  const showNameHeader = !isSelf && (!isPrevSameSender || message.isDeleted);
  const bubbleRoundness = isSelf ? isPrevSameSender && isNextSameSender ? "rounded-2xl" : isPrevSameSender ? "rounded-br-2xl" : isNextSameSender ? "rounded-tr-2xl" : "rounded-br-2xl rounded-tr-none" : isPrevSameSender && isNextSameSender ? "rounded-2xl" : isPrevSameSender ? "rounded-bl-2xl" : isNextSameSender ? "rounded-tl-2xl" : "rounded-bl-2xl rounded-tl-none";
  const commonBubbleClasses = `relative flex flex-col select-text px-4 py-2.5 border shadow-soft transition-all no-callout ${bubbleRoundness} ${message.isDeleted ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-border dark:border-border-dark italic font-normal" : isSelf ? "bg-primary text-white border-transparent" : "bg-surface dark:bg-surface-dark text-slate-900 dark:text-slate-100 border-border dark:border-border-dark"} hover:cursor-pointer`;
  const marginBottom = isNextSameSender ? "mb-0.5" : "mb-0";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: index === messagesLength - 1 ? messageEndRef : null,
      className: `flex flex-col ${isSelf ? "items-end" : "items-start"} w-full message-item group/msg ${marginBottom}`,
      style: {
        animation: `messageEntry 0.25s cubic-bezier(0.16, 1, 0.3, 1) ${Math.min(index * 0.015, 0.3)}s both`
      },
      children: [
        !isSelf && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex gap-2 items-end w-full ${showAvatar ? "" : "ml-[52px]"} msg-bubble-container ${isSelf ? "justify-end" : ""}`, children: [
          showAvatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 select-none mb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: (selectedUser == null ? void 0 : selectedUser.profilePic) || "/avatar.png",
              alt: (selectedUser == null ? void 0 : selectedUser.fullName) || "User",
              className: "size-9 rounded-full object-cover shadow-sm border border-slate-200 dark:border-slate-700"
            }
          ) }) : !isNextSameSender && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-start min-w-0 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            MessageContent,
            {
              isSelf,
              message,
              selectedUser,
              showNameHeader,
              handleDoubleClick,
              handleLongPressStart,
              handleLongPressEnd,
              handleMenuClick,
              markViewOnceOpened,
              commonBubbleClasses
            }
          ) })
        ] }),
        isSelf && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "msg-bubble-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          MessageContent,
          {
            isSelf,
            message,
            selectedUser,
            showNameHeader: false,
            handleDoubleClick,
            handleLongPressStart,
            handleLongPressEnd,
            handleMenuClick,
            markViewOnceOpened,
            commonBubbleClasses
          }
        ) })
      ]
    }
  );
};
const MessageContent = ({
  isSelf,
  message,
  selectedUser,
  showNameHeader,
  handleDoubleClick,
  handleLongPressStart,
  handleLongPressEnd,
  handleMenuClick,
  markViewOnceOpened,
  commonBubbleClasses
}) => {
  const linkify = (text) => {
    if (!text) return "";
    const urlRegex = /(https?:\/\/[^\s<]+[^.,:;"'!)\]\s])/g;
    return text.split(urlRegex).map((part, i2) => {
      if (part.match(urlRegex)) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: part,
            target: "_blank",
            rel: "noopener noreferrer",
            className: `underline decoration-2 underline-offset-2 transition-opacity hover:opacity-80 ${isSelf ? "text-white font-bold" : "text-primary dark:text-primary font-bold"}`,
            onClick: (e2) => e2.stopPropagation(),
            children: part
          },
          i2
        );
      }
      return part;
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    showNameHeader && !message.isDeleted && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 mb-0.5 px-1 text-[11px] text-primary font-bold select-none", children: selectedUser == null ? void 0 : selectedUser.fullName }),
    message.replyTo && !message.isDeleted && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QuotedMessage, { replyTo: message.replyTo }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex gap-1.5 items-end group/bubble ${isSelf ? "justify-end" : ""}`, children: [
      isSelf && !message.isDeleted && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-200 flex-shrink-0 select-none self-end pb-1.5 order-first", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "size-6 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors",
          onClick: handleMenuClick,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { size: 14 })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `${commonBubbleClasses} ${message.isDeleted ? "" : isSelf ? "bubble-tail-self" : "bubble-tail-other"}`,
          onDoubleClick: handleDoubleClick,
          onTouchStart: message.isDeleted ? void 0 : (e2) => {
            e2.stopPropagation();
            handleLongPressStart == null ? void 0 : handleLongPressStart(message._id);
          },
          onTouchEnd: message.isDeleted ? void 0 : handleLongPressEnd,
          onTouchMove: message.isDeleted ? void 0 : handleLongPressEnd,
          title: message.isDeleted ? void 0 : "Double-tap to ❤️",
          children: [
            message.viewOnce && !message.viewedOnce ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              ViewOnceMedia,
              {
                message,
                onOpened: () => markViewOnceOpened(message._id)
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              message.image && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: message.image,
                  alt: "Attachment",
                  loading: "lazy",
                  decoding: "async",
                  className: "max-w-full sm:max-w-[260px] rounded-xl mb-1 object-cover"
                }
              ),
              message.file && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1", children: message.file.type.startsWith("image/") ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: message.file.url,
                  alt: message.file.name,
                  loading: "lazy",
                  decoding: "async",
                  className: "max-w-full sm:max-w-[260px] rounded-xl object-cover"
                }
              ) : message.file.type.startsWith("video/") ? /* @__PURE__ */ jsxRuntimeExports.jsx("video", { controls: true, className: "max-w-full sm:max-w-[260px] rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: message.file.url, type: message.file.type }) }) : message.file.type.startsWith("audio/") ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-2 rounded-xl min-w-[180px] ${isSelf ? "bg-white/10" : "bg-slate-100 dark:bg-slate-800"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("audio", { controls: true, className: "w-full h-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: message.file.url, type: message.file.type }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: message.file.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: `flex items-center gap-2 p-2 rounded-xl transition-colors ${isSelf ? "bg-white/10 hover:bg-white/15 text-white" : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { size: 14 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium truncate max-w-[100px]", children: message.file.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] opacity-75", children: [
                      "(",
                      (message.file.size / 1024 / 1024).toFixed(2),
                      " MB)"
                    ] })
                  ]
                }
              ) }),
              message.text && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[14px] leading-relaxed break-words font-medium", children: [
                  linkify(message.text),
                  message.isEdited && !message.isDeleted && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] opacity-70 ml-1.5 font-normal", children: "edited" })
                ] }),
                !message.isDeleted && (() => {
                  const urlRegex = /(https?:\/\/[^\s<]+[^.,:;"'!)\]\s])/;
                  const match = message.text.match(urlRegex);
                  if (match) {
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(LinkPreview, { url: match[0], isSelf });
                  }
                  return null;
                })()
              ] }),
              message.viewOnce && message.viewedOnce && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-1 text-xs ${isSelf ? "text-white/60" : "text-slate-500 dark:text-slate-400"}`, children: "Opened • View once media" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-1 mt-1 -mb-1 ${isSelf ? "justify-end" : "justify-start"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-medium ${isSelf ? "text-white/60" : "text-slate-500 dark:text-slate-400"}`, children: formatMessageTime(message.createdAt) }),
              message.isPinned && !message.isDeleted && /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { size: 10, className: "text-amber-400" }),
              isSelf && !message.isDeleted && (message.isRead ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { size: 12, className: "text-blue-200" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12, className: "text-white/50" }))
            ] })
          ]
        }
      ),
      !isSelf && !message.isDeleted && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-200 flex-shrink-0 select-none self-end pb-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "size-6 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors",
          onClick: handleMenuClick,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { size: 14 })
        }
      ) })
    ] }),
    !message.isDeleted && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `select-none ${isSelf ? "pl-1" : "pl-1"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageReactions, { message }) })
  ] });
};
const MessageVirtualizer = ({
  items = [],
  renderItem,
  onScrollToTop,
  isMoreAvailable = false,
  isLoadingMore = false,
  overscan = 5,
  defaultHeight = 85
}) => {
  const containerRef = reactExports.useRef(null);
  const sizeMap = reactExports.useRef(/* @__PURE__ */ new Map());
  const [scrollTop, setScrollTop] = reactExports.useState(0);
  const [containerHeight, setContainerHeight] = reactExports.useState(0);
  const [, forceUpdate] = reactExports.useState(0);
  const prevItemsLength = reactExports.useRef(0);
  const prevScrollHeight = reactExports.useRef(0);
  const prevScrollTop = reactExports.useRef(0);
  const isPrepending = reactExports.useRef(false);
  reactExports.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setContainerHeight(entries[0].contentRect.height);
      }
    });
    observer.observe(container);
    setContainerHeight(container.getBoundingClientRect().height);
    setScrollTop(container.scrollTop);
    return () => observer.disconnect();
  }, []);
  reactExports.useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (items.length > prevItemsLength.current) {
      if (prevScrollTop.current < 200 && prevItemsLength.current > 0) {
        isPrepending.current = true;
        const currentScrollHeight = container.scrollHeight;
        const deltaHeight = currentScrollHeight - prevScrollHeight.current;
        container.scrollTop = prevScrollTop.current + deltaHeight;
      }
    }
    prevItemsLength.current = items.length;
    prevScrollHeight.current = container.scrollHeight;
    prevScrollTop.current = container.scrollTop;
  }, [items]);
  const handleScroll = reactExports.useCallback((e2) => {
    const container = e2.currentTarget;
    const currentScrollTop = container.scrollTop;
    setScrollTop(currentScrollTop);
    prevScrollTop.current = currentScrollTop;
    prevScrollHeight.current = container.scrollHeight;
    if (currentScrollTop < 100 && onScrollToTop && isMoreAvailable && !isLoadingMore) {
      onScrollToTop();
    }
  }, [onScrollToTop, isMoreAvailable, isLoadingMore]);
  const measureRef = reactExports.useCallback((id2) => (node) => {
    if (node) {
      const height = node.getBoundingClientRect().height;
      if (sizeMap.current.get(id2) !== height) {
        sizeMap.current.set(id2, height);
        forceUpdate((prev) => prev + 1);
      }
    }
  }, []);
  const offsets = [];
  let totalHeight = 0;
  for (let i2 = 0; i2 < items.length; i2++) {
    const item = items[i2];
    const id2 = item._id || item.id || String(i2);
    const height = sizeMap.current.get(id2) || defaultHeight;
    offsets.push({
      id: id2,
      top: totalHeight,
      height,
      index: i2
    });
    totalHeight += height;
  }
  let startIndex = 0;
  let endIndex = items.length - 1;
  for (let i2 = 0; i2 < offsets.length; i2++) {
    const itemOffset = offsets[i2];
    if (itemOffset.top + itemOffset.height > scrollTop) {
      startIndex = Math.max(0, i2 - overscan);
      break;
    }
  }
  for (let i2 = startIndex; i2 < offsets.length; i2++) {
    const itemOffset = offsets[i2];
    if (itemOffset.top > scrollTop + containerHeight) {
      endIndex = Math.min(items.length - 1, i2 + overscan);
      break;
    }
  }
  const visibleItems = [];
  for (let i2 = startIndex; i2 <= endIndex; i2++) {
    if (items[i2]) {
      visibleItems.push(offsets[i2]);
    }
  }
  const paddingTop = visibleItems.length > 0 ? visibleItems[0].top : 0;
  const paddingBottom = visibleItems.length > 0 ? totalHeight - (visibleItems[visibleItems.length - 1].top + visibleItems[visibleItems.length - 1].height) : 0;
  reactExports.useEffect(() => {
    const container = containerRef.current;
    if (container && items.length > 0 && prevItemsLength.current <= 1) {
      container.scrollTop = container.scrollHeight;
    }
  }, [items.length]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      onScroll: handleScroll,
      className: "flex-1 overflow-y-auto relative w-full h-full scrollbar-thin select-text",
      role: "log",
      "aria-live": "polite",
      "aria-relevant": "additions text",
      style: { contentVisibility: "auto", contain: "layout style" },
      children: [
        isLoadingMore && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-4 bg-transparent w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { size: 18, className: "animate-spin text-blue-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              paddingTop: `${paddingTop}px`,
              paddingBottom: `${paddingBottom}px`,
              position: "relative",
              width: "100%"
            },
            children: visibleItems.map(({ id: id2, index }) => {
              const item = items[index];
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  ref: measureRef(id2),
                  className: "w-full",
                  children: renderItem(item, index)
                },
                id2
              );
            })
          }
        )
      ]
    }
  );
};
const UserProfilePanel = ({ user, onClose, isOpen }) => {
  if (!user || !isOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `fixed inset-y-0 right-0 z-[100] w-full md:w-[350px] bg-surface dark:bg-surface-dark border-l border-border dark:border-border-dark shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex items-center justify-between border-b border-border dark:border-border-dark", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-slate-900 dark:text-slate-100", children: "Contact Info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-6 flex flex-col items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-24 rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-800 mb-4 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: user.profilePic || "/avatar.png", alt: user.fullName, className: "w-full h-full object-cover" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-slate-900 dark:text-slate-100", children: user.fullName }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 mb-6 text-sm", children: user.email }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "flex-1 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold text-sm transition-all shadow-soft", children: "Message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "px-4 py-2 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl text-slate-700 dark:text-slate-300 transition-all hover:bg-slate-50 dark:hover:bg-slate-800", children: "Mute" })
      ] })
    ] })
  ] }) });
};
const isSameDay = (d1, d2) => {
  const a2 = new Date(d1);
  const b2 = new Date(d2);
  return a2.getFullYear() === b2.getFullYear() && a2.getMonth() === b2.getMonth() && a2.getDate() === b2.getDate();
};
const formatDateLabel = (dateStr) => {
  const date = new Date(dateStr);
  const now = /* @__PURE__ */ new Date();
  const diff = now - date;
  const days = Math.floor(diff / (1e3 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return date.toLocaleDateString("en-US", { weekday: "long" });
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};
const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    typingUsers,
    addReaction,
    removeReaction,
    markViewOnceOpened,
    isMoreMessagesAvailable
  } = useChatStore();
  const [showProfile, setShowProfile] = reactExports.useState(false);
  const messageEndRef = reactExports.useRef(null);
  const [activeMessageMenu, setActiveMessageMenu] = reactExports.useState(null);
  const openMessageMenu = (messageId, buttonRect) => {
    const menuWidth = 220;
    const offset = 8;
    buttonRect.top;
    buttonRect.left > window.innerWidth / 2 ? buttonRect.left - menuWidth - offset : buttonRect.left + buttonRect.width + offset;
    setActiveMessageMenu(messageId);
  };
  const closeMessageMenu = () => setActiveMessageMenu(null);
  const renderItem = reactExports.useCallback((message, index) => {
    var _a;
    if (message.isTyping) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[800px] w-full mx-auto px-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2 duration-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-9 rounded-full bg-slate-200 dark:bg-slate-800 flex-shrink-0 shadow-sm", "aria-label": "Typing...", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-primary/10 animate-pulse" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2.5 rounded-2xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 rounded-full bg-slate-400 animate-bounce" })
        ] }) })
      ] }) });
    }
    const showDateSeparator = index === 0 || !isSameDay(message.createdAt, (_a = messages[index - 1]) == null ? void 0 : _a.createdAt);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[800px] w-full mx-auto px-4 py-0.5", children: [
      showDateSeparator && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center my-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 rounded-full bg-slate-200/50 dark:bg-slate-800/50 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest backdrop-blur-sm", children: formatDateLabel(message.createdAt) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MessageItem,
        {
          message,
          index,
          messagesLength: messages.length,
          messages,
          messageEndRef,
          selectedUser,
          activeMessageMenu,
          openMessageMenu,
          closeMessageMenu,
          addReaction,
          removeReaction,
          markViewOnceOpened
        }
      )
    ] });
  }, [messages, selectedUser, activeMessageMenu, addReaction, removeReaction, markViewOnceOpened]);
  reactExports.useEffect(() => {
    if (selectedUser == null ? void 0 : selectedUser._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser == null ? void 0 : selectedUser._id, getMessages]);
  reactExports.useEffect(() => {
    if (messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typingUsers]);
  if (isMessagesLoading && messages.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col h-full bg-background dark:bg-background-dark", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChatHeader, { onAvatarClick: () => setShowProfile(true) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSkeleton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageInput, {})
    ] });
  }
  const virtualItems = [
    ...messages,
    ...typingUsers.length > 0 ? [{ _id: "typing-indicator", isTyping: true }] : []
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col h-full bg-background dark:bg-background-dark overflow-hidden relative transition-colors duration-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChatHeader, { onAvatarClick: () => setShowProfile(true) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-hidden chat-bg-pattern relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MessageVirtualizer,
        {
          items: virtualItems,
          renderItem,
          isMoreAvailable: isMoreMessagesAvailable
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messageEndRef })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-surface dark:bg-surface-dark border-t border-border dark:border-border-dark shadow-soft z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageInput, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      UserProfilePanel,
      {
        user: selectedUser,
        isOpen: showProfile,
        onClose: () => setShowProfile(false)
      }
    ),
    activeMessageMenu && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[9998] bg-black/5 backdrop-blur-[1px]", onClick: closeMessageMenu })
  ] });
};
const NoChatSelected = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-200 dark:bg-base-800/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-4 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center\r\n             justify-center animate-bounce",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-8 h-8 text-primary " })
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Welcome to Blink!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base-content/60", children: "Select a conversation from the sidebar to start chatting" })
  ] }) });
};
const MobileBottomNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "chats", icon: MessageSquare, label: "Chats" },
    { id: "users", icon: Users, label: "Friends" },
    { id: "notifications", icon: Bell, label: "Alerts" },
    { id: "settings", icon: Settings, label: "Settings" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface/90 dark:bg-surface-dark/90 backdrop-blur-lg border-t border-border dark:border-border-dark flex items-center justify-around px-2 z-50", children: tabs.map(({ id: id2, icon: Icon2, label }) => {
    const isActive = activeTab === id2;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setActiveTab(id2),
        className: `flex flex-col items-center gap-1 transition-all duration-200 ${isActive ? "text-primary scale-110" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-1.5 rounded-xl transition-colors ${isActive ? "bg-primary/10" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { size: 22, fill: isActive ? "currentColor" : "none" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider", children: label })
        ]
      },
      id2
    );
  }) });
};
const UsersPanel = ({ setActiveTab }) => {
  const { getUsers, users, isUsersLoading, setSelectedUser } = useChatStore();
  const { authUser } = useAuthStore();
  const {
    friends,
    requests,
    sentRequests,
    sendRequest,
    acceptRequest,
    declineRequest,
    blockUser
  } = useFriendStore();
  const { onlineUsers } = useAuthStore();
  const [searchInput, setSearchInput] = reactExports.useState("");
  const [activeSubTab, setActiveSubTab] = reactExports.useState("explore");
  reactExports.useEffect(() => {
    getUsers();
  }, [getUsers]);
  const isUserBlocked = (userId) => {
    var _a;
    return (_a = authUser == null ? void 0 : authUser.blockedUsers) == null ? void 0 : _a.includes(userId);
  };
  const getRelationshipState = (userId) => {
    if (friends.some((f2) => f2._id === userId)) {
      return "friends";
    }
    if (requests.some((r2) => {
      var _a;
      return ((_a = r2.requesterId) == null ? void 0 : _a._id) === userId;
    })) {
      return "request_received";
    }
    if (sentRequests.some((r2) => {
      var _a;
      return ((_a = r2.receiverId) == null ? void 0 : _a._id) === userId;
    })) {
      return "request_sent";
    }
    return "not_friends";
  };
  let displayUsers = [];
  if (activeSubTab === "explore") {
    displayUsers = users.filter((u2) => u2._id !== (authUser == null ? void 0 : authUser._id) && !isUserBlocked(u2._id));
  } else if (activeSubTab === "friends") {
    displayUsers = friends.filter((u2) => !isUserBlocked(u2._id));
  } else ;
  const filterBySearch = (list) => {
    return list.filter(
      (u2) => u2.fullName.toLowerCase().includes(searchInput.toLowerCase()) || u2.email.toLowerCase().includes(searchInput.toLowerCase())
    );
  };
  const handleMessageClick = (user) => {
    setSelectedUser(user);
    if (setActiveTab) setActiveTab("chats");
  };
  const totalRequestsCount = requests.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full w-full bg-white dark:bg-slate-800 flex flex-col transition-all duration-200 border-r border-slate-200 dark:border-slate-700 select-none animate-fadeIn", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pt-6 pb-4 flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-blue-500" }),
        "People"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5", children: "Find and connect with people on Blink" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Search people...",
            value: searchInput,
            onChange: (e2) => setSearchInput(e2.target.value),
            className: "w-full bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-2.5 w-4 h-4 text-slate-400 dark:text-slate-500" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border-b border-slate-100 dark:border-slate-700/50 mt-4 gap-4 text-sm font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setActiveSubTab("explore"),
            className: `pb-2.5 flex items-center gap-1.5 transition-colors relative ${activeSubTab === "explore" ? "text-blue-500" : "text-slate-400 hover:text-slate-500 dark:hover:text-slate-350"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4" }),
              "Explore",
              activeSubTab === "explore" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setActiveSubTab("friends"),
            className: `pb-2.5 flex items-center gap-1.5 transition-colors relative ${activeSubTab === "friends" ? "text-blue-500" : "text-slate-400 hover:text-slate-500 dark:hover:text-slate-350"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
              "Friends",
              friends.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-350 px-1.5 py-0.5 rounded-full", children: friends.length }),
              activeSubTab === "friends" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setActiveSubTab("requests"),
            className: `pb-2.5 flex items-center gap-1.5 transition-colors relative ${activeSubTab === "requests" ? "text-blue-500" : "text-slate-400 hover:text-slate-500 dark:hover:text-slate-350"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "w-4 h-4" }),
              "Requests",
              totalRequestsCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full font-bold animate-pulse", children: totalRequestsCount }),
              activeSubTab === "requests" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-grow overflow-y-auto px-5 pb-6 space-y-3", children: isUsersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-10 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 font-semibold", children: "Loading people..." })
    ] }) : activeSubTab !== "requests" ? (
      /* Explore and Friends Tab */
      filterBySearch(displayUsers).length > 0 ? filterBySearch(displayUsers).map((user) => {
        const isOnline = onlineUsers.includes(user._id);
        const isHelpCenter = user.email === HELP_CENTER_EMAIL;
        const relState = isHelpCenter ? "friends" : getRelationshipState(user._id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between p-3.5 bg-slate-50/60 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800 rounded-2xl transition-all hover:bg-slate-50 dark:hover:bg-slate-900/40",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: user.profilePic || "/avatar.png",
                      alt: user.fullName,
                      className: "size-11 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    }
                  ),
                  isOnline ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-0 size-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-0 size-3 bg-slate-350 dark:bg-slate-600 rounded-full border-2 border-white dark:border-slate-800" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-bold text-sm text-slate-800 dark:text-slate-100 truncate flex items-center gap-1.5", children: [
                    user.fullName,
                    isHelpCenter && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-blue-500/10 text-blue-500 dark:text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded-full font-bold select-none", children: "Support" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 dark:text-slate-500 truncate font-semibold mt-0.5", children: user.email })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 ml-2 flex-shrink-0", children: [
                relState === "not_friends" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => sendRequest(user._id),
                    className: "px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-[11px] font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-sm active:scale-95",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { size: 13 }),
                      "Add Friend"
                    ]
                  }
                ),
                relState === "request_sent" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    disabled: true,
                    className: "px-3 py-1.5 bg-slate-100 dark:bg-slate-750 text-slate-450 dark:text-slate-500 text-[11px] font-bold rounded-xl flex items-center gap-1.5 cursor-not-allowed border border-slate-200/50 dark:border-slate-700/50",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { size: 13 }),
                      "Requested"
                    ]
                  }
                ),
                relState === "request_received" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => acceptRequest(user._id),
                      className: "p-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all shadow-sm active:scale-95",
                      title: "Accept Request",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { size: 14 })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => declineRequest(user._id),
                      className: "p-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition-all shadow-sm active:scale-95",
                      title: "Decline Request",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { size: 14 })
                    }
                  )
                ] }),
                relState === "friends" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => handleMessageClick(user),
                    className: "px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-[11px] font-bold rounded-xl flex items-center gap-1.5 transition-all active:scale-95",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 13 }),
                      "Message"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => blockUser(user._id),
                    className: "p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-colors",
                    title: "Block User",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { size: 13 })
                  }
                )
              ] })
            ]
          },
          user._id
        );
      }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-10 h-10 text-slate-300 dark:text-slate-655 mb-2.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-slate-400 dark:text-slate-500", children: searchInput ? "No matching profiles found" : "No users found" })
      ] })
    ) : (
      /* Requests Tab */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-3 flex items-center gap-1.5", children: [
            "Incoming Requests (",
            requests.length,
            ")"
          ] }),
          filterBySearch(requests.map((r2) => r2.requesterId)).length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filterBySearch(requests.map((r2) => r2.requesterId)).map((requester) => {
            const isOnline = onlineUsers.includes(requester._id);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between p-3.5 bg-slate-50/60 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800 rounded-2xl",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: requester.profilePic || "/avatar.png",
                          alt: requester.fullName,
                          className: "size-11 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                        }
                      ),
                      isOnline ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-0 size-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-0 size-3 bg-slate-350 dark:bg-slate-600 rounded-full border-2 border-white dark:border-slate-800" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-sm text-slate-800 dark:text-slate-100 truncate", children: requester.fullName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 dark:text-slate-500 truncate font-semibold mt-0.5", children: requester.email })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 ml-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        onClick: () => acceptRequest(requester._id),
                        className: "px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-650 text-white text-[11px] font-bold rounded-xl flex items-center gap-1 transition-all shadow-sm active:scale-95",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { size: 12 }),
                          "Accept"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        onClick: () => declineRequest(requester._id),
                        className: "px-2.5 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-[11px] font-bold rounded-xl flex items-center gap-1 transition-all shadow-sm active:scale-95",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { size: 12 }),
                          "Decline"
                        ]
                      }
                    )
                  ] })
                ]
              },
              requester._id
            );
          }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500 font-semibold italic pl-1", children: "No incoming requests" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-3 flex items-center gap-1.5", children: [
            "Sent Requests (",
            sentRequests.length,
            ")"
          ] }),
          filterBySearch(sentRequests.map((r2) => r2.receiverId)).length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filterBySearch(sentRequests.map((r2) => r2.receiverId)).map((receiver) => {
            const isOnline = onlineUsers.includes(receiver._id);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between p-3.5 bg-slate-50/60 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800 rounded-2xl",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: receiver.profilePic || "/avatar.png",
                          alt: receiver.fullName,
                          className: "size-11 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                        }
                      ),
                      isOnline ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-0 size-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-0 size-3 bg-slate-350 dark:bg-slate-600 rounded-full border-2 border-white dark:border-slate-800" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-sm text-slate-800 dark:text-slate-100 truncate", children: receiver.fullName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 dark:text-slate-500 truncate font-semibold mt-0.5", children: receiver.email })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      disabled: true,
                      className: "px-3 py-1.5 bg-slate-100 dark:bg-slate-750 text-slate-400 dark:text-slate-500 text-[11px] font-bold rounded-xl flex items-center gap-1 border border-slate-200/50 dark:border-slate-700/50 cursor-not-allowed",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { size: 12 }),
                        "Requested"
                      ]
                    }
                  )
                ]
              },
              receiver._id
            );
          }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500 font-semibold italic pl-1", children: "No sent requests" })
        ] })
      ] })
    ) })
  ] });
};
const ChatSendToggle = () => {
  const sendOnEnter = useChatStore((state) => {
    var _a;
    return ((_a = state.chatSettings) == null ? void 0 : _a.sendOnEnter) ?? true;
  });
  const setChatSetting = useChatStore((state) => state.setChatSetting);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: () => setChatSetting("sendOnEnter", !sendOnEnter),
      className: `relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none ${sendOnEnter ? "bg-blue-500" : "bg-slate-200 dark:bg-slate-700"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${sendOnEnter ? "translate-x-5" : "translate-x-0"}`
        }
      )
    }
  );
};
const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true }
];
const SettingsPage = () => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const { theme, setTheme } = useThemeStore();
  const { authUser } = useAuthStore();
  const { updatePreferences } = useNotificationStore();
  const handlePreferenceChange = (key, value2) => {
    const currentPrefs = (authUser == null ? void 0 : authUser.notificationPreferences) || {
      directMessage: true,
      groupMessage: true,
      mention: true,
      friendRequest: true,
      system: true
    };
    updatePreferences({ ...currentPrefs, [key]: value2 });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-screen bg-slate-50 dark:bg-slate-900 pt-20 transition-colors duration-200 overflow-y-auto pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-4xl space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-slate-800 dark:text-slate-100", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold", children: "Customize your Blink chat experience" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2", children: "Appearance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-450 dark:text-slate-500 font-semibold mt-1", children: "Choose your preferred style for the interface" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setTheme("light"),
                className: `flex flex-col items-center justify-between p-4 rounded-2xl border text-left transition-all duration-200 ${theme === "light" ? "border-blue-500 bg-blue-500/5 dark:bg-blue-400/5" : "border-slate-200 dark:border-slate-700 bg-slate-50/50 hover:bg-slate-50 dark:bg-slate-900/10 dark:hover:bg-slate-900/30"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 w-full mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "size-5" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-slate-800 dark:text-slate-100", children: "Light" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 dark:text-slate-500 font-semibold truncate max-w-[80px]", children: "Soft colors" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white border border-slate-200 rounded-xl p-2.5 space-y-1.5 pointer-events-none", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-12 bg-slate-200 rounded" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-full bg-slate-100 rounded" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2/3 bg-slate-150 rounded" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setTheme("dark"),
                className: `flex flex-col items-center justify-between p-4 rounded-2xl border text-left transition-all duration-200 ${theme === "dark" ? "border-blue-500 bg-blue-500/5 dark:bg-blue-400/5" : "border-slate-200 dark:border-slate-700 bg-slate-50/50 hover:bg-slate-50 dark:bg-slate-900/10 dark:hover:bg-slate-900/30"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 w-full mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-slate-850 dark:bg-slate-700 text-blue-400 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "size-5" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-slate-800 dark:text-slate-100", children: "Dark" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 dark:text-slate-500 font-semibold truncate max-w-[80px]", children: "Neon glow" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 space-y-1.5 pointer-events-none", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-12 bg-slate-800 rounded" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-full bg-slate-850 rounded" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2/3 bg-slate-800 rounded" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setTheme("system"),
                className: `flex flex-col items-center justify-between p-4 rounded-2xl border text-left transition-all duration-200 ${theme === "system" ? "border-blue-500 bg-blue-500/5 dark:bg-blue-400/5" : "border-slate-200 dark:border-slate-700 bg-slate-50/50 hover:bg-slate-50 dark:bg-slate-900/10 dark:hover:bg-slate-900/30"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 w-full mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Laptop, { className: "size-5" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-slate-800 dark:text-slate-100", children: "System" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 dark:text-slate-500 font-semibold truncate max-w-[80px]", children: "Sync with OS" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-slate-200 dark:bg-slate-600 border border-slate-300 dark:border-slate-500 rounded-xl p-2.5 space-y-1.5 pointer-events-none relative overflow-hidden", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-white/40 to-black/40" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-12 bg-slate-400 rounded relative z-10" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-full bg-slate-300 dark:bg-slate-500 rounded relative z-10" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2/3 bg-slate-400 rounded relative z-10" })
                  ] })
                ]
              }
            )
          ] })
        ] }),
        authUser && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2", children: "Notifications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-450 dark:text-slate-500 font-semibold mt-1", children: "Configure how you want to be notified" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "size-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-slate-850 dark:text-slate-100", children: "Direct Messages" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500 font-semibold", children: "Notifications for new private messages" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var _a2;
                    return handlePreferenceChange("directMessage", !(((_a2 = authUser.notificationPreferences) == null ? void 0 : _a2.directMessage) ?? true));
                  },
                  className: `relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none ${((_a = authUser.notificationPreferences) == null ? void 0 : _a.directMessage) ?? true ? "bg-blue-500" : "bg-slate-200 dark:bg-slate-700"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${((_b = authUser.notificationPreferences) == null ? void 0 : _b.directMessage) ?? true ? "translate-x-5" : "translate-x-0"}`
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50 pt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-slate-850 dark:text-slate-100", children: "Group Messages" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500 font-semibold", children: "Notifications for new messages in groups" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var _a2;
                    return handlePreferenceChange("groupMessage", !(((_a2 = authUser.notificationPreferences) == null ? void 0 : _a2.groupMessage) ?? true));
                  },
                  className: `relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none ${((_c = authUser.notificationPreferences) == null ? void 0 : _c.groupMessage) ?? true ? "bg-blue-500" : "bg-slate-200 dark:bg-slate-700"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${((_d = authUser.notificationPreferences) == null ? void 0 : _d.groupMessage) ?? true ? "translate-x-5" : "translate-x-0"}`
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50 pt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AtSign, { className: "size-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-slate-850 dark:text-slate-100", children: "Mentions & Replies" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500 font-semibold", children: "When someone mentions you or replies to you" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var _a2;
                    return handlePreferenceChange("mention", !(((_a2 = authUser.notificationPreferences) == null ? void 0 : _a2.mention) ?? true));
                  },
                  className: `relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none ${((_e = authUser.notificationPreferences) == null ? void 0 : _e.mention) ?? true ? "bg-blue-500" : "bg-slate-200 dark:bg-slate-700"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${((_f = authUser.notificationPreferences) == null ? void 0 : _f.mention) ?? true ? "translate-x-5" : "translate-x-0"}`
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50 pt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-slate-850 dark:text-slate-100", children: "System & Security" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500 font-semibold", children: "Important account and security alerts" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var _a2;
                    return handlePreferenceChange("system", !(((_a2 = authUser.notificationPreferences) == null ? void 0 : _a2.system) ?? true));
                  },
                  className: `relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none ${((_g = authUser.notificationPreferences) == null ? void 0 : _g.system) ?? true ? "bg-blue-500" : "bg-slate-200 dark:bg-slate-700"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${((_h = authUser.notificationPreferences) == null ? void 0 : _h.system) ?? true ? "translate-x-5" : "translate-x-0"}`
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50 pt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-slate-850 dark:text-slate-100", children: "Send on Enter" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500 font-semibold", children: "Press Enter to send messages (Shift+Enter for newline)" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChatSendToggle, {})
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-slate-150 dark:border-slate-700 pt-4 mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 border border-slate-200 dark:border-600 text-slate-750 dark:text-slate-200 rounded-xl font-bold text-xs transition-all active:scale-[0.98]",
                onClick: () => useNotificationStore.getState().subscribeToPushNotifications(),
                children: "Enable Push Notifications"
              }
            ) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1", children: "Live Preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-100 dark:bg-slate-900/60 shadow-xl max-w-sm w-full mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200/50 dark:border-slate-850/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-sm", children: "J" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-xs text-slate-800 dark:text-slate-100 leading-tight", children: "John Doe" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-emerald-500 font-bold mt-0.5", children: "Online" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3 min-h-[160px] max-h-[160px] overflow-y-auto bg-slate-100 dark:bg-slate-900", children: PREVIEW_MESSAGES.map((message) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `flex ${message.isSent ? "justify-end" : "justify-start"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `
                            max-w-[80%] rounded-2xl px-3.5 py-2 shadow-sm text-xs font-medium
                            ${message.isSent ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-tr-none" : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/40 dark:border-slate-700 rounded-tl-none"}
                          `,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-relaxed", children: message.content }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: `
                              text-[8px] mt-1 text-right font-bold uppercase tracking-wider
                              ${message.isSent ? "text-white/60" : "text-slate-400 dark:text-slate-500"}
                            `,
                        children: "12:00 PM"
                      }
                    )
                  ]
                }
              )
            },
            message.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                className: "flex-1 text-xs px-3 py-2 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none",
                placeholder: "Type a message...",
                value: "This is a preview",
                readOnly: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "size-8 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-sm", disabled: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 14 }) })
          ] }) })
        ] }) }) })
      ] })
    ] })
  ] }) });
};
const AppLayout = () => {
  const { selectedUser } = useChatStore();
  const [activeTab, setActiveTab] = reactExports.useState("chats");
  const renderSideContent = () => {
    switch (activeTab) {
      case "users":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(UsersPanel, {});
      case "notifications":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationPanel, {});
      case "settings":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsPage, { isEmbedded: true }) });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ConversationList, {});
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-screen w-screen overflow-hidden bg-background dark:bg-background-dark text-slate-900 dark:text-slate-100 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarRail, { activeTab, setActiveTab }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-full md:w-80 flex-shrink-0 border-r border-border dark:border-border-dark flex flex-col h-full bg-surface dark:bg-surface-dark transition-all ${selectedUser ? "hidden md:flex" : "flex"} ${activeTab !== "chats" ? "pb-16 md:pb-0" : "pb-16 md:pb-0"}`, children: renderSideContent() }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: `flex-1 flex-col h-full relative overflow-hidden bg-background dark:bg-background-dark ${selectedUser ? "flex" : "hidden md:flex"}`, children: selectedUser ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChatContainer, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(NoChatSelected, {}) }),
    !selectedUser && /* @__PURE__ */ jsxRuntimeExports.jsx(MobileBottomNav, { activeTab, setActiveTab })
  ] });
};
const AuthImagePattern = ({ title, subtitle }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/60 border-l border-slate-200/80 dark:border-slate-800 p-12 transition-colors duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4 mb-8", children: [...Array(9)].map((_2, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `aspect-square rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 border border-blue-500/5 dark:border-blue-400/10 shadow-sm transition-all duration-300 hover:scale-105 ${i2 % 2 === 0 ? "animate-pulse" : ""}`
      },
      i2
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-slate-800 dark:text-slate-100", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-2 font-semibold leading-relaxed", children: subtitle })
  ] }) });
};
const SignUpPage = () => {
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    fullName: "",
    email: "",
    password: ""
  });
  const { signup, isSigningUp } = useAuthStore();
  const navigate = useNavigate();
  const validateForm = () => {
    if (!formData.fullName.trim()) return "Full name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Invalid email format";
    if (!formData.password) return "Password is required";
    if (formData.password.length < 6) return "Password must be at least 6 characters";
    return null;
  };
  const handleSubmit = async (e2) => {
    e2.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      _t.error(validationError);
      return;
    }
    const success = await signup(formData);
    if (success) {
      navigate("/");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen pt-16 grid lg:grid-cols-2 bg-slate-50 dark:bg-slate-900 transition-colors duration-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col justify-center items-center p-6 sm:p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "size-12 rounded-xl bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center group-hover:bg-blue-500/20 dark:group-hover:bg-blue-400/20 transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "size-6 text-blue-500 dark:text-blue-400" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mt-2 text-slate-800 dark:text-slate-100", children: "Create Account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 font-semibold", children: "Get started with your free account" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-slate-450 dark:text-slate-500 uppercase tracking-wider mb-2", children: "Full Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-5 text-slate-400 dark:text-slate-500" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                className: "w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-sm font-semibold transition-all duration-200",
                placeholder: "John Doe",
                value: formData.fullName,
                onChange: (e2) => setFormData({ ...formData, fullName: e2.target.value })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-slate-450 dark:text-slate-500 uppercase tracking-wider mb-2", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-5 text-slate-400 dark:text-slate-500" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "email",
                className: "w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-sm font-semibold transition-all duration-200",
                placeholder: "you@example.com",
                value: formData.email,
                onChange: (e2) => setFormData({ ...formData, email: e2.target.value })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-slate-455 dark:text-slate-500 uppercase tracking-wider mb-2", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "size-5 text-slate-400 dark:text-slate-500" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: showPassword ? "text" : "password",
                className: "w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-sm font-semibold transition-all duration-200",
                placeholder: "••••••••",
                value: formData.password,
                onChange: (e2) => setFormData({ ...formData, password: e2.target.value })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-305",
                onClick: () => setShowPassword(!showPassword),
                children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "size-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-5" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full py-2.5 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all active:scale-[0.98] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", disabled: isSigningUp, children: isSigningUp ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-5 animate-spin" }),
          "Loading..."
        ] }) : "Create Account" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-500 dark:text-slate-400 text-sm", children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "text-blue-500 dark:text-blue-400 hover:underline font-bold ml-1", children: "Sign in" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AuthImagePattern,
      {
        title: "Join our community",
        subtitle: "Connect with friends, share moments, and stay in touch with your loved ones."
      }
    )
  ] });
};
const LoginPage = () => {
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    email: "",
    password: ""
  });
  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();
  const validateForm = () => {
    if (!formData.email.trim()) return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Please enter a valid email.";
    if (!formData.password) return "Password is required.";
    if (formData.password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };
  const handleSubmit = async (e2) => {
    e2.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      _t.error(errorMessage);
      return;
    }
    const success = await login(formData);
    if (success) navigate("/");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen pt-16 grid lg:grid-cols-2 bg-slate-50 dark:bg-slate-900 transition-colors duration-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col justify-center items-center p-6 sm:p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center group-hover:bg-blue-500/20 dark:group-hover:bg-blue-400/20 transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-6 h-6 text-blue-500 dark:text-blue-400" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mt-2 text-slate-800 dark:text-slate-100", children: "Welcome Back" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 font-semibold", children: "Sign in to your account" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-slate-450 dark:text-slate-500 uppercase tracking-wider mb-2", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-5 w-5 text-slate-400 dark:text-slate-500" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "email",
                className: "w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-sm font-semibold transition-all duration-200",
                placeholder: "you@example.com",
                value: formData.email,
                onChange: (e2) => setFormData({ ...formData, email: e2.target.value })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-slate-455 dark:text-slate-500 uppercase tracking-wider mb-2", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-5 w-5 text-slate-400 dark:text-slate-500" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: showPassword ? "text" : "password",
                className: "w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-sm font-semibold transition-all duration-200",
                placeholder: "••••••••",
                value: formData.password,
                onChange: (e2) => setFormData({ ...formData, password: e2.target.value })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-405",
                onClick: () => setShowPassword(!showPassword),
                children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-5 w-5" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full py-2.5 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all active:scale-[0.98] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", disabled: isLoggingIn, children: isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }),
          "Loading..."
        ] }) : "Sign in" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-500 dark:text-slate-400 text-sm", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", className: "text-blue-500 dark:text-blue-400 hover:underline font-bold ml-1", children: "Create account" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AuthImagePattern,
      {
        title: "Welcome back!",
        subtitle: "Sign in to continue your conversations and catch up with your messages."
      }
    )
  ] });
};
const MAX_FILE_SIZE_MB = 7;
const ProfilePage = () => {
  var _a;
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = reactExports.useState(null);
  const handleImageUpload = async (e2) => {
    const file = e2.target.files[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      _t.error(`Image must be smaller than ${MAX_FILE_SIZE_MB}MB`);
      e2.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-screen pt-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-200 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto p-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl transition-all duration-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-slate-800 dark:text-slate-100", children: "Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold", children: "Your profile information" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: selectedImg || authUser.profilePic || "/avatar.png",
            alt: "Profile",
            className: "size-32 rounded-full object-cover border-4 border-slate-100 dark:border-slate-900 shadow-md"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            htmlFor: "avatar-upload",
            className: `
                  absolute bottom-0 right-0 
                  bg-blue-500 hover:bg-blue-600 text-white hover:scale-105
                  p-2.5 rounded-full cursor-pointer 
                  transition-all duration-200 shadow-md
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-5 h-5 text-white" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "file",
                  id: "avatar-upload",
                  className: "hidden",
                  accept: "image/*",
                  onChange: handleImageUpload,
                  disabled: isUpdatingProfile
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500 font-semibold", children: isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
          "Full Name"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-4 py-2.5 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-100 text-sm", children: authUser == null ? void 0 : authUser.fullName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }),
          "Email Address"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-4 py-2.5 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-100 text-sm", children: authUser == null ? void 0 : authUser.email })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider mb-4", children: "Account Information" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700 text-slate-750 dark:text-slate-200 font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Member Since" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: (_a = authUser.createdAt) == null ? void 0 : _a.split("T")[0] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2 text-slate-750 dark:text-slate-200 font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Account Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-500 dark:text-emerald-450 font-bold", children: "Active" })
        ] })
      ] })
    ] })
  ] }) }) });
};
const ErrorModal = ({ error, onClose, onRetry }) => {
  const [isVisible, setIsVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (error) {
      setIsVisible(true);
    }
  }, [error]);
  if (!error) return null;
  const getErrorDetails = (error2) => {
    if (!navigator.onLine) {
      return {
        title: "Connection Lost",
        message: "You're offline. Please check your internet connection and try again.",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { className: "w-8 h-8 text-rose-500" }),
        type: "network",
        suggestions: [
          "Check your internet connection",
          "Try refreshing the page",
          "Wait a moment and try again"
        ]
      };
    }
    if (error2.response) {
      const status = error2.response.status;
      const data = error2.response.data;
      switch (status) {
        case 400:
          return {
            title: "Invalid Request",
            message: (data == null ? void 0 : data.message) || "The request contains invalid data. Please check your input.",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-amber-500" }),
            type: "validation",
            suggestions: [
              "Check your input data",
              "Make sure all required fields are filled",
              "Try again with corrected information"
            ]
          };
        case 401:
          return {
            title: "Authentication Required",
            message: "You need to log in to continue.",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-rose-500" }),
            type: "auth",
            suggestions: [
              "Log in to your account",
              "Check if your session has expired"
            ]
          };
        case 403:
          return {
            title: "Access Denied",
            message: (data == null ? void 0 : data.message) || "You don't have permission to perform this action.",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-rose-500" }),
            type: "permission",
            suggestions: [
              "Check your account permissions",
              "Contact support if you believe this is an error"
            ]
          };
        case 404:
          return {
            title: "Not Found",
            message: "The requested resource could not be found.",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-amber-500" }),
            type: "not_found",
            suggestions: [
              "Check the URL or link",
              "Try refreshing the page",
              "Go back to the previous page"
            ]
          };
        case 429:
          return {
            title: "Too Many Requests",
            message: "You're making requests too quickly. Please wait a moment.",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-amber-500" }),
            type: "rate_limit",
            suggestions: [
              "Wait a few seconds before trying again",
              "Reduce the frequency of your actions"
            ]
          };
        case 500:
        case 502:
        case 503:
        case 504:
          return {
            title: "Server Error",
            message: "Something went wrong on our end. We're working to fix it.",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-rose-500" }),
            type: "server",
            suggestions: [
              "Try again in a few moments",
              "Check our status page for updates",
              "Contact support if the problem persists"
            ]
          };
        default:
          return {
            title: "Something Went Wrong",
            message: (data == null ? void 0 : data.message) || "An unexpected error occurred.",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-rose-500" }),
            type: "unknown",
            suggestions: [
              "Try again",
              "Refresh the page",
              "Contact support if the problem continues"
            ]
          };
      }
    }
    if (error2.request) {
      return {
        title: "Connection Error",
        message: "Unable to connect to the server. Please check your connection.",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-8 h-8 text-amber-500" }),
        type: "network",
        suggestions: [
          "Check your internet connection",
          "Try again in a moment",
          "Contact support if the problem persists"
        ]
      };
    }
    return {
      title: "Unexpected Error",
      message: error2.message || "An unexpected error occurred.",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-rose-500" }),
      type: "unknown",
      suggestions: [
        "Try refreshing the page",
        "Clear your browser cache",
        "Contact support for help"
      ]
    };
  };
  const errorDetails = getErrorDetails(error);
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
      handleClose();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 bg-slate-900/60 backdrop-blur-sm",
        onClick: handleClose
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-xl max-w-md w-full transform transition-all duration-300 ${isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"} overflow-hidden`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          errorDetails.icon,
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-slate-800 dark:text-slate-100", children: errorDetails.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleClose,
            className: "p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-500 dark:hover:text-slate-200 transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 dark:text-slate-300 text-sm mb-4", children: errorDetails.message }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2", children: "What you can try:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: errorDetails.suggestions.map((suggestion, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500 dark:text-blue-400 mt-1", children: "•" }),
            suggestion
          ] }, index)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end border-t border-slate-100 dark:border-slate-700/50 pt-4 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleClose,
              className: "px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-semibold text-xs transition-all active:scale-[0.98]",
              children: "Close"
            }
          ),
          onRetry && errorDetails.type !== "auth" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: handleRetry,
              className: "px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-xl font-semibold text-xs transition-all active:scale-[0.98] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 mr-1" }),
                "Try Again"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
};
const App = () => {
  const { authUser, checkAuth, isCheckingAuth, socket } = useAuthStore();
  const { theme } = useThemeStore();
  const { currentError, clearError, retryCurrentError } = useErrorStore();
  const location2 = useLocation();
  reactExports.useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  const { fetchFriends, fetchRequests, subscribeToFriendEvents, unsubscribeFromFriendEvents } = useFriendStore();
  const { subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  reactExports.useEffect(() => {
    if (authUser && socket) {
      fetchFriends();
      fetchRequests();
      subscribeToFriendEvents();
      subscribeToMessages();
      return () => {
        unsubscribeFromFriendEvents();
        unsubscribeFromMessages();
      };
    }
  }, [authUser, socket, fetchFriends, fetchRequests, subscribeToFriendEvents, unsubscribeFromFriendEvents, subscribeToMessages, unsubscribeFromMessages]);
  reactExports.useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      const isDark = theme === "dark" || theme === "system" && mediaQuery.matches;
      if (isDark) {
        root.classList.add("dark");
        root.setAttribute("data-theme", "dark");
      } else {
        root.classList.remove("dark");
        root.setAttribute("data-theme", "light");
      }
    };
    applyTheme();
    if (theme === "system") {
      mediaQuery.addEventListener("change", applyTheme);
      return () => mediaQuery.removeEventListener("change", applyTheme);
    }
  }, [theme]);
  if (isCheckingAuth && !authUser)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { className: "size-10 animate-spin text-primary" }) });
  const isHomePage = location2.pathname === "/";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-200", children: [
    !(authUser && isHomePage) && /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: authUser ? /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/signup", element: !authUser ? /* @__PURE__ */ jsxRuntimeExports.jsx(SignUpPage, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/login", element: !authUser ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPage, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/settings", element: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsPage, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/profile", element: authUser ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProfilePage, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Ie, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ErrorModal,
      {
        error: currentError == null ? void 0 : currentError.error,
        onClose: clearError,
        onRetry: (currentError == null ? void 0 : currentError.onRetry) ? retryCurrentError : null
      }
    )
  ] });
};
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    BrowserRouter,
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {})
    }
  ) })
);
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").then(
      (registration) => {
        console.log("Service Worker registered with scope:", registration.scope);
      },
      (error) => {
        console.error("Service Worker registration failed:", error);
      }
    );
  });
}
//# sourceMappingURL=index-B0Q0rbSv.js.map
