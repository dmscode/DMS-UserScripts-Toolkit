// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * GreasyMonkey 脚本工具类
 * @description 因脚本中一些基础功能函数需要复用，所以写了这个小的工具库。为对用户安全负责，并符合 GreasyFork 审核规则，代码未作压缩，仅用 Parcel 简单过了一下，一方面是为了用 babel 转码，另一方为后期分文件书写不同类别功能做准备。
 * @author 稻米鼠
 * @version 0.0.1
 */
var DMS_Toolkit = /*#__PURE__*/function () {
  // GreasyMonkey Api 对象
  // debug 状态

  /**
   * Tag: 构造函数
   * @param {*} GM GreasyMonkey Api 对象
   */
  function DMS_Toolkit() {
    var GM = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, DMS_Toolkit);

    _defineProperty(this, "GM", {});

    _defineProperty(this, "is_debug", false);

    // 获取需要用到的 API
    for (var key in GM) {
      this[key] = GM[key];
    } // 设定是否是开发状态


    this.is_debug = this.GM_getValue && this.GM_getValue('is_debug', false) ? true : false;
  }
  /**
   * Tag: 日志输出
   * @param {*} by 由谁输出
   * @param  {...any} args 输出内容
   */


  _createClass(DMS_Toolkit, [{
    key: "info",
    value: function info(by) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (args.length > 1) {
        console.groupCollapsed(by + '： ');

        var _iterator = _createForOfIteratorHelper(args),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var arg = _step.value;
            console.info(arg);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        console.groupEnd();
      } else if (args.length === 1) {
        console.info(by + '： ', args[0]);
      }
    }
    /**
     * Debug 输出，仅开发时输出
     * @param  {...any} args 参数同上
     */

  }, {
    key: "dblog",
    value: function dblog() {
      if (this.is_debug) {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        this.info.apply(this, args);
      }
    }
    /**
     * Tag: 徽章输出
     * @param {*} leftText 徽章左侧文字
     * @param {*} rightText 徽章右侧文字
     * @param {*} endText 徽章后描述
     * @param {*} options 徽章配置项
     */

  }, {
    key: "badge",
    value: function badge(leftText, rightText, endText) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var opt = Object.assign({
        type: 'log',
        leftBGColor: '#555555',
        leftColor: '#ededed',
        rightBGColor: '#ffc107',
        rightColor: '#262318'
      }, options);
      console[opt.type]('%c' + leftText + '%c' + rightText + endText ? '%c - ' + endText : '', 'color: ' + opt.leftColor + '; ' + 'background-color: ' + opt.leftBGColor + '; ' + 'border-radius: 3px 0 0 3px;' + 'padding: 0 5px', 'color: ' + opt.rightColor + '; ' + 'background-color: ' + opt.rightBGColor + '; ' + 'border-radius: 0 3px 3px 0;' + 'padding: 0 5px;', '');
    }
  }]);

  return DMS_Toolkit;
}();
},{}]},{},["epB2"], null)
//# sourceMappingURL=/UserScript-Toolkit.user.js.map