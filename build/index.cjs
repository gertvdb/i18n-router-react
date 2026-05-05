'use strict';

var react = require('react');
var reactRouter = require('@tanstack/react-router');
var core = require('@lingui/core');
var react$1 = require('@lingui/react');
var jsxRuntime = require('react/jsx-runtime');

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
  __defProp(target, "default", { value: mod, enumerable: true }) ,
  mod
));

// node_modules/moo/moo.js
var require_moo = __commonJS({
  "node_modules/moo/moo.js"(exports, module) {
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define([], factory);
      } else if (typeof module === "object" && module.exports) {
        module.exports = factory();
      } else {
        root.moo = factory();
      }
    })(exports, function() {
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var toString = Object.prototype.toString;
      var hasSticky = typeof new RegExp().sticky === "boolean";
      function isRegExp(o) {
        return o && toString.call(o) === "[object RegExp]";
      }
      __name(isRegExp, "isRegExp");
      function isObject(o) {
        return o && typeof o === "object" && !isRegExp(o) && !Array.isArray(o);
      }
      __name(isObject, "isObject");
      function reEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, function(x) {
          if (x === "-") return "\\x2d";
          return "\\" + x;
        });
      }
      __name(reEscape, "reEscape");
      function reGroups(s) {
        var re = new RegExp("|" + s);
        return re.exec("").length - 1;
      }
      __name(reGroups, "reGroups");
      function reCapture(s) {
        return "(" + s + ")";
      }
      __name(reCapture, "reCapture");
      function reUnion(regexps) {
        if (!regexps.length) return "(?!)";
        var source = regexps.map(function(s) {
          return "(?:" + s + ")";
        }).join("|");
        return "(?:" + source + ")";
      }
      __name(reUnion, "reUnion");
      function regexpOrLiteral(obj) {
        if (typeof obj === "string") {
          return "(?:" + reEscape(obj) + ")";
        } else if (isRegExp(obj)) {
          if (obj.ignoreCase) throw new Error("RegExp /i flag not allowed");
          if (obj.global) throw new Error("RegExp /g flag is implied");
          if (obj.sticky) throw new Error("RegExp /y flag is implied");
          if (obj.multiline) throw new Error("RegExp /m flag is implied");
          return obj.source;
        } else {
          throw new Error("Not a pattern: " + obj);
        }
      }
      __name(regexpOrLiteral, "regexpOrLiteral");
      function pad(s, length) {
        if (s.length > length) {
          return s;
        }
        return Array(length - s.length + 1).join(" ") + s;
      }
      __name(pad, "pad");
      function lastNLines(string, numLines) {
        var position = string.length;
        var lineBreaks = 0;
        while (true) {
          var idx = string.lastIndexOf("\n", position - 1);
          if (idx === -1) {
            break;
          } else {
            lineBreaks++;
          }
          position = idx;
          if (lineBreaks === numLines) {
            break;
          }
          if (position === 0) {
            break;
          }
        }
        var startPosition = lineBreaks < numLines ? 0 : position + 1;
        return string.substring(startPosition).split("\n");
      }
      __name(lastNLines, "lastNLines");
      function objectToRules(object) {
        var keys = Object.getOwnPropertyNames(object);
        var result = [];
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var thing = object[key];
          var rules = [].concat(thing);
          if (key === "include") {
            for (var j = 0; j < rules.length; j++) {
              result.push({ include: rules[j] });
            }
            continue;
          }
          var match = [];
          rules.forEach(function(rule) {
            if (isObject(rule)) {
              if (match.length) result.push(ruleOptions(key, match));
              result.push(ruleOptions(key, rule));
              match = [];
            } else {
              match.push(rule);
            }
          });
          if (match.length) result.push(ruleOptions(key, match));
        }
        return result;
      }
      __name(objectToRules, "objectToRules");
      function arrayToRules(array) {
        var result = [];
        for (var i = 0; i < array.length; i++) {
          var obj = array[i];
          if (obj.include) {
            var include = [].concat(obj.include);
            for (var j = 0; j < include.length; j++) {
              result.push({ include: include[j] });
            }
            continue;
          }
          if (!obj.type) {
            throw new Error("Rule has no type: " + JSON.stringify(obj));
          }
          result.push(ruleOptions(obj.type, obj));
        }
        return result;
      }
      __name(arrayToRules, "arrayToRules");
      function ruleOptions(type, obj) {
        if (!isObject(obj)) {
          obj = { match: obj };
        }
        if (obj.include) {
          throw new Error("Matching rules cannot also include states");
        }
        var options = {
          defaultType: type,
          lineBreaks: !!obj.error || !!obj.fallback,
          pop: false,
          next: null,
          push: null,
          error: false,
          fallback: false,
          value: null,
          type: null,
          shouldThrow: false
        };
        for (var key in obj) {
          if (hasOwnProperty.call(obj, key)) {
            options[key] = obj[key];
          }
        }
        if (typeof options.type === "string" && type !== options.type) {
          throw new Error("Type transform cannot be a string (type '" + options.type + "' for token '" + type + "')");
        }
        var match = options.match;
        options.match = Array.isArray(match) ? match : match ? [match] : [];
        options.match.sort(function(a, b) {
          return isRegExp(a) && isRegExp(b) ? 0 : isRegExp(b) ? -1 : isRegExp(a) ? 1 : b.length - a.length;
        });
        return options;
      }
      __name(ruleOptions, "ruleOptions");
      function toRules(spec) {
        return Array.isArray(spec) ? arrayToRules(spec) : objectToRules(spec);
      }
      __name(toRules, "toRules");
      var defaultErrorRule = ruleOptions("error", { lineBreaks: true, shouldThrow: true });
      function compileRules(rules, hasStates) {
        var errorRule = null;
        var fast = /* @__PURE__ */ Object.create(null);
        var fastAllowed = true;
        var unicodeFlag = null;
        var groups = [];
        var parts = [];
        for (var i = 0; i < rules.length; i++) {
          if (rules[i].fallback) {
            fastAllowed = false;
          }
        }
        for (var i = 0; i < rules.length; i++) {
          var options = rules[i];
          if (options.include) {
            throw new Error("Inheritance is not allowed in stateless lexers");
          }
          if (options.error || options.fallback) {
            if (errorRule) {
              if (!options.fallback === !errorRule.fallback) {
                throw new Error("Multiple " + (options.fallback ? "fallback" : "error") + " rules not allowed (for token '" + options.defaultType + "')");
              } else {
                throw new Error("fallback and error are mutually exclusive (for token '" + options.defaultType + "')");
              }
            }
            errorRule = options;
          }
          var match = options.match.slice();
          if (fastAllowed) {
            while (match.length && typeof match[0] === "string" && match[0].length === 1) {
              var word = match.shift();
              fast[word.charCodeAt(0)] = options;
            }
          }
          if (options.pop || options.push || options.next) {
            if (!hasStates) {
              throw new Error("State-switching options are not allowed in stateless lexers (for token '" + options.defaultType + "')");
            }
            if (options.fallback) {
              throw new Error("State-switching options are not allowed on fallback tokens (for token '" + options.defaultType + "')");
            }
          }
          if (match.length === 0) {
            continue;
          }
          fastAllowed = false;
          groups.push(options);
          for (var j = 0; j < match.length; j++) {
            var obj = match[j];
            if (!isRegExp(obj)) {
              continue;
            }
            if (unicodeFlag === null) {
              unicodeFlag = obj.unicode;
            } else if (unicodeFlag !== obj.unicode && options.fallback === false) {
              throw new Error("If one rule is /u then all must be");
            }
          }
          var pat = reUnion(match.map(regexpOrLiteral));
          var regexp = new RegExp(pat);
          if (regexp.test("")) {
            throw new Error("RegExp matches empty string: " + regexp);
          }
          var groupCount = reGroups(pat);
          if (groupCount > 0) {
            throw new Error("RegExp has capture groups: " + regexp + "\nUse (?: \u2026 ) instead");
          }
          if (!options.lineBreaks && regexp.test("\n")) {
            throw new Error("Rule should declare lineBreaks: " + regexp);
          }
          parts.push(reCapture(pat));
        }
        var fallbackRule = errorRule && errorRule.fallback;
        var flags = hasSticky && !fallbackRule ? "ym" : "gm";
        var suffix = hasSticky || fallbackRule ? "" : "|";
        if (unicodeFlag === true) flags += "u";
        var combined = new RegExp(reUnion(parts) + suffix, flags);
        return { regexp: combined, groups, fast, error: errorRule || defaultErrorRule };
      }
      __name(compileRules, "compileRules");
      function compile(rules) {
        var result = compileRules(toRules(rules));
        return new Lexer({ start: result }, "start");
      }
      __name(compile, "compile");
      function checkStateGroup(g, name, map) {
        var state = g && (g.push || g.next);
        if (state && !map[state]) {
          throw new Error("Missing state '" + state + "' (in token '" + g.defaultType + "' of state '" + name + "')");
        }
        if (g && g.pop && +g.pop !== 1) {
          throw new Error("pop must be 1 (in token '" + g.defaultType + "' of state '" + name + "')");
        }
      }
      __name(checkStateGroup, "checkStateGroup");
      function compileStates(states, start) {
        var all = states.$all ? toRules(states.$all) : [];
        delete states.$all;
        var keys = Object.getOwnPropertyNames(states);
        if (!start) start = keys[0];
        var ruleMap = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          ruleMap[key] = toRules(states[key]).concat(all);
        }
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var rules = ruleMap[key];
          var included = /* @__PURE__ */ Object.create(null);
          for (var j = 0; j < rules.length; j++) {
            var rule = rules[j];
            if (!rule.include) continue;
            var splice = [j, 1];
            if (rule.include !== key && !included[rule.include]) {
              included[rule.include] = true;
              var newRules = ruleMap[rule.include];
              if (!newRules) {
                throw new Error("Cannot include nonexistent state '" + rule.include + "' (in state '" + key + "')");
              }
              for (var k = 0; k < newRules.length; k++) {
                var newRule = newRules[k];
                if (rules.indexOf(newRule) !== -1) continue;
                splice.push(newRule);
              }
            }
            rules.splice.apply(rules, splice);
            j--;
          }
        }
        var map = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          map[key] = compileRules(ruleMap[key], true);
        }
        for (var i = 0; i < keys.length; i++) {
          var name = keys[i];
          var state = map[name];
          var groups = state.groups;
          for (var j = 0; j < groups.length; j++) {
            checkStateGroup(groups[j], name, map);
          }
          var fastKeys = Object.getOwnPropertyNames(state.fast);
          for (var j = 0; j < fastKeys.length; j++) {
            checkStateGroup(state.fast[fastKeys[j]], name, map);
          }
        }
        return new Lexer(map, start);
      }
      __name(compileStates, "compileStates");
      function keywordTransform(map) {
        var isMap = typeof Map !== "undefined";
        var reverseMap = isMap ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
        var types = Object.getOwnPropertyNames(map);
        for (var i = 0; i < types.length; i++) {
          var tokenType = types[i];
          var item = map[tokenType];
          var keywordList = Array.isArray(item) ? item : [item];
          keywordList.forEach(function(keyword) {
            if (typeof keyword !== "string") {
              throw new Error("keyword must be string (in keyword '" + tokenType + "')");
            }
            if (isMap) {
              reverseMap.set(keyword, tokenType);
            } else {
              reverseMap[keyword] = tokenType;
            }
          });
        }
        return function(k) {
          return isMap ? reverseMap.get(k) : reverseMap[k];
        };
      }
      __name(keywordTransform, "keywordTransform");
      var Lexer = /* @__PURE__ */ __name(function(states, state) {
        this.startState = state;
        this.states = states;
        this.buffer = "";
        this.stack = [];
        this.reset();
      }, "Lexer");
      Lexer.prototype.reset = function(data, info) {
        this.buffer = data || "";
        this.index = 0;
        this.line = info ? info.line : 1;
        this.col = info ? info.col : 1;
        this.queuedToken = info ? info.queuedToken : null;
        this.queuedText = info ? info.queuedText : "";
        this.queuedThrow = info ? info.queuedThrow : null;
        this.setState(info ? info.state : this.startState);
        this.stack = info && info.stack ? info.stack.slice() : [];
        return this;
      };
      Lexer.prototype.save = function() {
        return {
          line: this.line,
          col: this.col,
          state: this.state,
          stack: this.stack.slice(),
          queuedToken: this.queuedToken,
          queuedText: this.queuedText,
          queuedThrow: this.queuedThrow
        };
      };
      Lexer.prototype.setState = function(state) {
        if (!state || this.state === state) return;
        this.state = state;
        var info = this.states[state];
        this.groups = info.groups;
        this.error = info.error;
        this.re = info.regexp;
        this.fast = info.fast;
      };
      Lexer.prototype.popState = function() {
        this.setState(this.stack.pop());
      };
      Lexer.prototype.pushState = function(state) {
        this.stack.push(this.state);
        this.setState(state);
      };
      var eat = hasSticky ? function(re, buffer) {
        return re.exec(buffer);
      } : function(re, buffer) {
        var match = re.exec(buffer);
        if (match[0].length === 0) {
          return null;
        }
        return match;
      };
      Lexer.prototype._getGroup = function(match) {
        var groupCount = this.groups.length;
        for (var i = 0; i < groupCount; i++) {
          if (match[i + 1] !== void 0) {
            return this.groups[i];
          }
        }
        throw new Error("Cannot find token type for matched text");
      };
      function tokenToString() {
        return this.value;
      }
      __name(tokenToString, "tokenToString");
      Lexer.prototype.next = function() {
        var index = this.index;
        if (this.queuedGroup) {
          var token = this._token(this.queuedGroup, this.queuedText, index);
          this.queuedGroup = null;
          this.queuedText = "";
          return token;
        }
        var buffer = this.buffer;
        if (index === buffer.length) {
          return;
        }
        var group = this.fast[buffer.charCodeAt(index)];
        if (group) {
          return this._token(group, buffer.charAt(index), index);
        }
        var re = this.re;
        re.lastIndex = index;
        var match = eat(re, buffer);
        var error = this.error;
        if (match == null) {
          return this._token(error, buffer.slice(index, buffer.length), index);
        }
        var group = this._getGroup(match);
        var text = match[0];
        if (error.fallback && match.index !== index) {
          this.queuedGroup = group;
          this.queuedText = text;
          return this._token(error, buffer.slice(index, match.index), index);
        }
        return this._token(group, text, index);
      };
      Lexer.prototype._token = function(group, text, offset) {
        var lineBreaks = 0;
        if (group.lineBreaks) {
          var matchNL = /\n/g;
          var nl = 1;
          if (text === "\n") {
            lineBreaks = 1;
          } else {
            while (matchNL.exec(text)) {
              lineBreaks++;
              nl = matchNL.lastIndex;
            }
          }
        }
        var token = {
          type: typeof group.type === "function" && group.type(text) || group.defaultType,
          value: typeof group.value === "function" ? group.value(text) : text,
          text,
          toString: tokenToString,
          offset,
          lineBreaks,
          line: this.line,
          col: this.col
        };
        var size = text.length;
        this.index += size;
        this.line += lineBreaks;
        if (lineBreaks !== 0) {
          this.col = size - nl + 1;
        } else {
          this.col += size;
        }
        if (group.shouldThrow) {
          var err = new Error(this.formatError(token, "invalid syntax"));
          throw err;
        }
        if (group.pop) this.popState();
        else if (group.push) this.pushState(group.push);
        else if (group.next) this.setState(group.next);
        return token;
      };
      if (typeof Symbol !== "undefined" && Symbol.iterator) {
        var LexerIterator = /* @__PURE__ */ __name(function(lexer) {
          this.lexer = lexer;
        }, "LexerIterator");
        LexerIterator.prototype.next = function() {
          var token = this.lexer.next();
          return { value: token, done: !token };
        };
        LexerIterator.prototype[Symbol.iterator] = function() {
          return this;
        };
        Lexer.prototype[Symbol.iterator] = function() {
          return new LexerIterator(this);
        };
      }
      Lexer.prototype.formatError = function(token, message) {
        if (token == null) {
          var text = this.buffer.slice(this.index);
          var token = {
            text,
            offset: this.index,
            lineBreaks: text.indexOf("\n") === -1 ? 0 : 1,
            line: this.line,
            col: this.col
          };
        }
        var numLinesAround = 2;
        var firstDisplayedLine = Math.max(token.line - numLinesAround, 1);
        var lastDisplayedLine = token.line + numLinesAround;
        var lastLineDigits = String(lastDisplayedLine).length;
        var displayedLines = lastNLines(
          this.buffer,
          this.line - token.line + numLinesAround + 1
        ).slice(0, 5);
        var errorLines = [];
        errorLines.push(message + " at line " + token.line + " col " + token.col + ":");
        errorLines.push("");
        for (var i = 0; i < displayedLines.length; i++) {
          var line = displayedLines[i];
          var lineNo = firstDisplayedLine + i;
          errorLines.push(pad(String(lineNo), lastLineDigits) + "  " + line);
          if (lineNo === token.line) {
            errorLines.push(pad("", lastLineDigits + token.col + 1) + "^");
          }
        }
        return errorLines.join("\n");
      };
      Lexer.prototype.clone = function() {
        return new Lexer(this.states, this.state);
      };
      Lexer.prototype.has = function(tokenType) {
        return true;
      };
      return {
        compile,
        states: compileStates,
        error: Object.freeze({ error: true }),
        fallback: Object.freeze({ fallback: true }),
        keywords: keywordTransform
      };
    });
  }
});

// node_modules/@messageformat/parser/lib/lexer.js
var require_lexer = __commonJS({
  "node_modules/@messageformat/parser/lib/lexer.js"(exports) {
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.lexer = exports.states = void 0;
    var moo_1 = __importDefault(require_moo());
    exports.states = {
      body: {
        doubleapos: { match: "''", value: /* @__PURE__ */ __name(() => "'", "value") },
        quoted: {
          lineBreaks: true,
          match: /'[{}#](?:[^']|'')*'(?!')/u,
          value: /* @__PURE__ */ __name((src) => src.slice(1, -1).replace(/''/g, "'"), "value")
        },
        argument: {
          lineBreaks: true,
          match: /\{\s*[^\p{Pat_Syn}\p{Pat_WS}]+\s*/u,
          push: "arg",
          value: /* @__PURE__ */ __name((src) => src.substring(1).trim(), "value")
        },
        octothorpe: "#",
        end: { match: "}", pop: 1 },
        content: { lineBreaks: true, match: /[^][^{}#']*/u }
      },
      arg: {
        select: {
          lineBreaks: true,
          match: /,\s*(?:plural|select|selectordinal)\s*,\s*/u,
          next: "select",
          value: /* @__PURE__ */ __name((src) => src.split(",")[1].trim(), "value")
        },
        "func-args": {
          lineBreaks: true,
          match: /,\s*[^\p{Pat_Syn}\p{Pat_WS}]+\s*,/u,
          next: "body",
          value: /* @__PURE__ */ __name((src) => src.split(",")[1].trim(), "value")
        },
        "func-simple": {
          lineBreaks: true,
          match: /,\s*[^\p{Pat_Syn}\p{Pat_WS}]+\s*/u,
          value: /* @__PURE__ */ __name((src) => src.substring(1).trim(), "value")
        },
        end: { match: "}", pop: 1 }
      },
      select: {
        offset: {
          lineBreaks: true,
          match: /\s*offset\s*:\s*\d+\s*/u,
          value: /* @__PURE__ */ __name((src) => src.split(":")[1].trim(), "value")
        },
        case: {
          lineBreaks: true,
          match: /\s*(?:=\d+|[^\p{Pat_Syn}\p{Pat_WS}]+)\s*\{/u,
          push: "body",
          value: /* @__PURE__ */ __name((src) => src.substring(0, src.indexOf("{")).trim(), "value")
        },
        end: { match: /\s*\}/u, pop: 1 }
      }
    };
    exports.lexer = moo_1.default.states(exports.states);
  }
});

// node_modules/@messageformat/parser/lib/parser.js
var require_parser = __commonJS({
  "node_modules/@messageformat/parser/lib/parser.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParseError = void 0;
    exports.parse = parse2;
    var lexer_js_1 = require_lexer();
    var getContext = /* @__PURE__ */ __name((lt) => ({
      offset: lt.offset,
      line: lt.line,
      col: lt.col,
      text: lt.text,
      lineBreaks: lt.lineBreaks
    }), "getContext");
    var isSelectType = /* @__PURE__ */ __name((type) => type === "plural" || type === "select" || type === "selectordinal", "isSelectType");
    function strictArgStyleParam(lt, param) {
      let value = "";
      let text = "";
      for (const p of param) {
        const pText = p.ctx.text;
        text += pText;
        switch (p.type) {
          case "content":
            value += p.value;
            break;
          case "argument":
          case "function":
          case "octothorpe":
            value += pText;
            break;
          default:
            throw new ParseError(lt, `Unsupported part in strict mode function arg style: ${pText}`);
        }
      }
      const c = {
        type: "content",
        value: value.trim(),
        ctx: Object.assign({}, param[0].ctx, { text })
      };
      return [c];
    }
    __name(strictArgStyleParam, "strictArgStyleParam");
    var strictArgTypes = [
      "number",
      "date",
      "time",
      "spellout",
      "ordinal",
      "duration"
    ];
    var defaultPluralKeys = ["zero", "one", "two", "few", "many", "other"];
    var _ParseError = class _ParseError extends Error {
      /** @internal */
      constructor(lt, msg) {
        super(lexer_js_1.lexer.formatError(lt, msg));
      }
    };
    __name(_ParseError, "ParseError");
    var ParseError = _ParseError;
    exports.ParseError = ParseError;
    var _Parser = class _Parser {
      constructor(src, opt) {
        var _a, _b, _c, _d;
        this.lexer = lexer_js_1.lexer.reset(src);
        this.cardinalKeys = (_a = opt === null || opt === void 0 ? void 0 : opt.cardinal) !== null && _a !== void 0 ? _a : defaultPluralKeys;
        this.ordinalKeys = (_b = opt === null || opt === void 0 ? void 0 : opt.ordinal) !== null && _b !== void 0 ? _b : defaultPluralKeys;
        this.strict = (_c = opt === null || opt === void 0 ? void 0 : opt.strict) !== null && _c !== void 0 ? _c : false;
        this.strictPluralKeys = (_d = opt === null || opt === void 0 ? void 0 : opt.strictPluralKeys) !== null && _d !== void 0 ? _d : true;
      }
      parse() {
        return this.parseBody(false, true);
      }
      checkSelectKey(lt, type, key) {
        if (key[0] === "=") {
          if (type === "select") {
            throw new ParseError(lt, `The case ${key} is not valid with select`);
          }
        } else if (type !== "select") {
          const keys = type === "plural" ? this.cardinalKeys : this.ordinalKeys;
          if (this.strictPluralKeys && keys.length > 0 && !keys.includes(key)) {
            const msg = `The ${type} case ${key} is not valid in this locale`;
            throw new ParseError(lt, msg);
          }
        }
      }
      parseSelect({ value: arg }, inPlural, ctx, type) {
        const sel = { type, arg, cases: [], ctx };
        if (type === "plural" || type === "selectordinal")
          inPlural = true;
        else if (this.strict)
          inPlural = false;
        for (const lt of this.lexer) {
          switch (lt.type) {
            case "offset":
              if (type === "select") {
                throw new ParseError(lt, "Unexpected plural offset for select");
              }
              if (sel.cases.length > 0) {
                throw new ParseError(lt, "Plural offset must be set before cases");
              }
              sel.pluralOffset = Number(lt.value);
              ctx.text += lt.text;
              ctx.lineBreaks += lt.lineBreaks;
              break;
            case "case": {
              this.checkSelectKey(lt, type, lt.value);
              sel.cases.push({
                key: lt.value,
                tokens: this.parseBody(inPlural),
                ctx: getContext(lt)
              });
              break;
            }
            case "end":
              return sel;
            /* istanbul ignore next: never happens */
            default:
              throw new ParseError(lt, `Unexpected lexer token: ${lt.type}`);
          }
        }
        throw new ParseError(null, "Unexpected message end");
      }
      parseArgToken(lt, inPlural) {
        const ctx = getContext(lt);
        const argType = this.lexer.next();
        if (!argType)
          throw new ParseError(null, "Unexpected message end");
        ctx.text += argType.text;
        ctx.lineBreaks += argType.lineBreaks;
        if (this.strict && (argType.type === "func-simple" || argType.type === "func-args") && !strictArgTypes.includes(argType.value)) {
          const msg = `Invalid strict mode function arg type: ${argType.value}`;
          throw new ParseError(lt, msg);
        }
        switch (argType.type) {
          case "end":
            return { type: "argument", arg: lt.value, ctx };
          case "func-simple": {
            const end = this.lexer.next();
            if (!end)
              throw new ParseError(null, "Unexpected message end");
            if (end.type !== "end") {
              throw new ParseError(end, `Unexpected lexer token: ${end.type}`);
            }
            ctx.text += end.text;
            if (isSelectType(argType.value.toLowerCase())) {
              throw new ParseError(argType, `Invalid type identifier: ${argType.value}`);
            }
            return {
              type: "function",
              arg: lt.value,
              key: argType.value,
              ctx
            };
          }
          case "func-args": {
            if (isSelectType(argType.value.toLowerCase())) {
              const msg = `Invalid type identifier: ${argType.value}`;
              throw new ParseError(argType, msg);
            }
            let param = this.parseBody(this.strict ? false : inPlural);
            if (this.strict && param.length > 0) {
              param = strictArgStyleParam(lt, param);
            }
            return {
              type: "function",
              arg: lt.value,
              key: argType.value,
              param,
              ctx
            };
          }
          case "select":
            if (isSelectType(argType.value)) {
              return this.parseSelect(lt, inPlural, ctx, argType.value);
            } else {
              throw new ParseError(argType, `Unexpected select type ${argType.value}`);
            }
          /* istanbul ignore next: never happens */
          default:
            throw new ParseError(argType, `Unexpected lexer token: ${argType.type}`);
        }
      }
      parseBody(inPlural, atRoot) {
        const tokens = [];
        let content = null;
        for (const lt of this.lexer) {
          if (lt.type === "argument") {
            if (content)
              content = null;
            tokens.push(this.parseArgToken(lt, inPlural));
          } else if (lt.type === "octothorpe" && inPlural) {
            if (content)
              content = null;
            tokens.push({ type: "octothorpe", ctx: getContext(lt) });
          } else if (lt.type === "end" && !atRoot) {
            return tokens;
          } else {
            let value = lt.value;
            if (!inPlural && lt.type === "quoted" && value[0] === "#") {
              if (value.includes("{")) {
                const errMsg = `Unsupported escape pattern: ${value}`;
                throw new ParseError(lt, errMsg);
              }
              value = lt.text;
            }
            if (content) {
              content.value += value;
              content.ctx.text += lt.text;
              content.ctx.lineBreaks += lt.lineBreaks;
            } else {
              content = { type: "content", value, ctx: getContext(lt) };
              tokens.push(content);
            }
          }
        }
        if (atRoot)
          return tokens;
        throw new ParseError(null, "Unexpected message end");
      }
    };
    __name(_Parser, "Parser");
    var Parser = _Parser;
    function parse2(src, options = {}) {
      const parser = new Parser(src, options);
      return parser.parse();
    }
    __name(parse2, "parse");
  }
});
var RouterCoreContext = react.createContext(void 0);

// src/Utils/toLocale.tsx
var toLocale = /* @__PURE__ */ __name(({
  language,
  region
}) => {
  return language.toLowerCase() + "-" + region.toLowerCase();
}, "toLocale");

// src/Utils/createSafeRouterPath.tsx
var createSafeRouterPath = /* @__PURE__ */ __name(({
  localeOrLanguage,
  path
}) => {
  const safePath = path === "/" ? "" : path;
  return "/" + localeOrLanguage.toLowerCase() + safePath.toLowerCase();
}, "createSafeRouterPath");

// src/Utils/extractLanguage.tsx
var extractLanguage = /* @__PURE__ */ __name(({
  locale
}) => {
  return new Intl.Locale(locale).language.toLowerCase();
}, "extractLanguage");

// src/RouterCore.tsx
var _RouterCore = class _RouterCore {
  constructor(config, router, routes) {
    this._isBootstrapped = false;
    this._config = config;
    this._router = router;
    this._routeIds = this._buildPathToIdMap(routes, router);
  }
  static new(config, router, routes) {
    return new _RouterCore(config, router, routes);
  }
  reload() {
    window.location.reload();
  }
  canGoBack() {
    return this._router.history.canGoBack();
  }
  async goBack() {
    this._router.history.back();
  }
  async navigate({
    to,
    from,
    query,
    params,
    hash,
    method = "push",
    state,
    target = "_self"
  }) {
    const toRoute = this._route(to.id, to.localeOrLanguage);
    if (!toRoute) {
      return Promise.reject(
        new Error(
          `Route (to) for id "${to.id}" and locale "${to.localeOrLanguage}" not found.`
        )
      );
    }
    if (target === "_blank") {
      const href = this.href({
        id: to.id,
        locale: to.localeOrLanguage,
        query,
        params,
        hash
      });
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      const replace = method !== "push";
      const options = {
        to: toRoute.fullPath,
        ...from && {
          from
        },
        ...query && { search: query },
        ...params && { params },
        ...hash && { hash },
        replace,
        ...state && { state }
      };
      await this._router.navigate(options);
    }
  }
  path(id, localeOrLanguage, region) {
    let locale;
    if (region !== void 0) {
      locale = toLocale({
        language: localeOrLanguage,
        region
      });
    } else {
      locale = localeOrLanguage;
    }
    const toRoute = this._route(id, locale);
    if (!toRoute) {
      console.warn(
        `Route (to) for id "${id}" and locale "${locale}" not found.`
      );
      return "";
    }
    this._router.buildLocation({ to: toRoute.fullPath });
    return toRoute.fullPath;
  }
  id(id, localeOrLanguage, region) {
    let path;
    if (region !== void 0) {
      path = this.path(id, localeOrLanguage, region);
    } else {
      path = this.path(id, localeOrLanguage);
    }
    return this._routeIds[path];
  }
  href({ id, locale, query, params, hash }) {
    const toRoute = this._route(id, locale);
    if (!toRoute) {
      console.warn(
        `Route (to) for id "${id}" and locale "${locale}" not found.`
      );
      return "";
    }
    const options = {
      to: toRoute.fullPath,
      ...query && { search: query },
      ...params && { params },
      ...hash && { hash }
    };
    const parsedLocation = this._router.buildLocation(options);
    return parsedLocation.href;
  }
  relative({ id, locale, query, params, hash }) {
    return this.href({
      id,
      locale,
      query,
      params,
      hash
    });
  }
  absolute({ baseUrl, id, locale, query, params, hash }) {
    const href = this.href({
      id,
      locale,
      query,
      params,
      hash
    });
    const strippedHref = href.startsWith("/") ? href.slice(1) : href;
    const strippedBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    return `${strippedBaseUrl}/${strippedHref}`;
  }
  /*
      isActive(id: IRouteId, localeOrLanguage: IRouteLocale | IRouteLanguage): boolean {
          const currentLocation = this._router.stores.__store.get().location;
  
          const extractedLocale = extractLocale({pathname: currentLocation.pathname});
          if (extractedLocale === localeOrLanguage) {
              const route = this._route(id, extractedLocale);
              if (route) {
                  return currentLocation.pathname === route.fullPath;
              }
              return false;
          }
  
          const extractedLanguage = extractLanguage({locale: extractedLocale});
          if (extractedLanguage === localeOrLanguage) {
              const regions = this.regionsByLanguage()[extractedLanguage];
              return regions.some(region => {
                  const buildLocale = toLocale({language: extractedLanguage, region: region});
                  const route = this._route(id, buildLocale);
                  return route && currentLocation.pathname === route.fullPath;
              });
          }
  
          return false;
      }*/
  hasRoute(id, locale) {
    const route = this._route(id, locale);
    return !!route;
  }
  defaultLanguage() {
    return extractLanguage({
      locale: this._config.entryRoute.localeOrLanguage
    });
  }
  languages() {
    const languages = this._config.routes.map((route) => route.language);
    return Array.from(new Set(languages));
  }
  regionsByLanguage() {
    const result = {};
    this._config.routes.forEach((route) => {
      const language = route.language;
      const regions2 = route.regions;
      if (!result[language]) {
        result[language] = /* @__PURE__ */ new Set();
      }
      regions2.forEach((region) => result[language].add(region));
    });
    const regions = {};
    for (const language in result) {
      regions[language] = Array.from(result[language]);
    }
    return regions;
  }
  isBootstrapped() {
    if (this._isBootstrapped) {
      return true;
    }
    if (this._router.state.status === "idle") {
      this._isBootstrapped = true;
    }
    return this._isBootstrapped;
  }
  _route(id, localeOrLanguage) {
    const { components, routes } = this._config;
    const routeConfig = components[id] ?? null;
    if (!routeConfig) {
      return null;
    }
    let route = routes.find(
      (route2) => route2.regions.some(
        (region) => route2.id === id && toLocale({ language: route2.language, region }) === localeOrLanguage
      )
    );
    if (!route) {
      route = routes.find(
        (route2) => route2.id === id && route2.language === localeOrLanguage
      );
    }
    if (!route) {
      return null;
    }
    const path = createSafeRouterPath({
      localeOrLanguage,
      path: route.path
    });
    const routesByPath = this._router.routesByPath;
    return routesByPath[path] ?? null;
  }
  _buildPathToIdMap(routes, router) {
    const map = {};
    for (const route of routes) {
      if (route.path) {
        const fullPath = router.buildLocation({
          to: route.id
        }).fullPath;
        map[fullPath] = route.id;
      }
    }
    return map;
  }
};
__name(_RouterCore, "RouterCore");
var RouterCore = _RouterCore;

// src/Utils/createRouterCore.tsx
var createRouterCore = /* @__PURE__ */ __name(({
  config,
  router,
  routes
}) => {
  return RouterCore.new(config, router, routes);
}, "createRouterCore");
var _RouteI18n = class _RouteI18n {
  constructor(i18n) {
    this._loaded = /* @__PURE__ */ new Set();
    this._listeners = /* @__PURE__ */ new Set();
    this._i18n = i18n;
  }
  static new(i18n) {
    return new _RouteI18n(i18n);
  }
  trans(key, variables) {
    return /* @__PURE__ */ jsxRuntime.jsx(react$1.Trans, { id: key, values: variables });
  }
  t(key, variables) {
    return this._i18n._(key, variables);
  }
  activate(language) {
    this._i18n.activate(language);
  }
  current() {
    return this._i18n.locale;
  }
  subscribe(listener) {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }
  _notify() {
    this._listeners.forEach((listener) => listener());
  }
  isLoaded(language) {
    return this._loaded.has(language);
  }
  load(language, messages) {
    this._i18n.load(language, messages);
    this._loaded.add(language);
    this._notify();
  }
};
__name(_RouteI18n, "RouteI18n");
var RouteI18n = _RouteI18n;

// src/Utils/createRouteI18n.tsx
var createRouteI18n = /* @__PURE__ */ __name(({ i18n }) => {
  return RouteI18n.new(i18n);
}, "createRouteI18n");
var RouteI18nContext = react.createContext(
  void 0
);
var useRouteLanguage = /* @__PURE__ */ __name(() => reactRouter.useRouterState({
  select: /* @__PURE__ */ __name((state) => extractLanguage({
    locale: state.location.pathname.split("/")[1]
  }), "select")
}), "useRouteLanguage");
var useRouteI18n = /* @__PURE__ */ __name(() => {
  const context = react.useContext(RouteI18nContext);
  if (!context) {
    throw new Error("useRouteI18n must be used within a <Router> Provider");
  }
  return context;
}, "useRouteI18n");
var RouterOutlet = /* @__PURE__ */ __name(() => {
  const language = useRouteLanguage();
  const i18n = useRouteI18n();
  react.useEffect(() => {
    if (i18n.current() !== language) {
      i18n.activate(language);
    }
  }, [i18n, language]);
  return /* @__PURE__ */ jsxRuntime.jsx(reactRouter.Outlet, {});
}, "RouterOutlet");

// src/Utils/extractLocale.tsx
var extractLocale = /* @__PURE__ */ __name(({
  pathname
}) => {
  return pathname.split("/")[1].toLowerCase();
}, "extractLocale");

// node_modules/@lingui/message-utils/dist/compileMessage.mjs
var import_parser = __toESM(require_parser());

// node_modules/@messageformat/date-skeleton/lib/options.js
var _DateFormatError = class _DateFormatError extends Error {
  /** @internal */
  constructor(msg, token, type) {
    super(msg);
    this.token = token;
    this.type = type || "error";
  }
};
__name(_DateFormatError, "DateFormatError");
var DateFormatError = _DateFormatError;
var alpha = /* @__PURE__ */ __name((width) => width < 4 ? "short" : width === 4 ? "long" : "narrow", "alpha");
var numeric = /* @__PURE__ */ __name((width) => width % 2 === 0 ? "2-digit" : "numeric", "numeric");
function yearOptions(token, onError) {
  switch (token.char) {
    case "y":
      return { year: numeric(token.width) };
    case "r":
      return { calendar: "gregory", year: "numeric" };
    case "u":
    case "U":
    case "Y":
    default:
      onError(`${token.desc} is not supported; falling back to year:numeric`, DateFormatError.WARNING);
      return { year: "numeric" };
  }
}
__name(yearOptions, "yearOptions");
function monthStyle(token, onError) {
  switch (token.width) {
    case 1:
      return "numeric";
    case 2:
      return "2-digit";
    case 3:
      return "short";
    case 4:
      return "long";
    case 5:
      return "narrow";
    default:
      onError(`${token.desc} is not supported with width ${token.width}`);
      return void 0;
  }
}
__name(monthStyle, "monthStyle");
function dayStyle(token, onError) {
  const { char, desc, width } = token;
  if (char === "d") {
    return numeric(width);
  } else {
    onError(`${desc} is not supported`);
    return void 0;
  }
}
__name(dayStyle, "dayStyle");
function weekdayStyle(token, onError) {
  const { char, desc, width } = token;
  if ((char === "c" || char === "e") && width < 3) {
    const msg = `Numeric value is not supported for ${desc}; falling back to weekday:short`;
    onError(msg, DateFormatError.WARNING);
  }
  return alpha(width);
}
__name(weekdayStyle, "weekdayStyle");
function hourOptions(token) {
  const hour = numeric(token.width);
  let hourCycle;
  switch (token.char) {
    case "h":
      hourCycle = "h12";
      break;
    case "H":
      hourCycle = "h23";
      break;
    case "k":
      hourCycle = "h24";
      break;
    case "K":
      hourCycle = "h11";
      break;
  }
  return hourCycle ? { hour, hourCycle } : { hour };
}
__name(hourOptions, "hourOptions");
function timeZoneNameStyle(token, onError) {
  const { char, desc, width } = token;
  switch (char) {
    case "v":
    case "z":
      return width === 4 ? "long" : "short";
    case "V":
      if (width === 4)
        return "long";
      onError(`${desc} is not supported with width ${width}`);
      return void 0;
    case "X":
      onError(`${desc} is not supported`);
      return void 0;
  }
  return "short";
}
__name(timeZoneNameStyle, "timeZoneNameStyle");
function compileOptions(token, onError) {
  switch (token.field) {
    case "era":
      return { era: alpha(token.width) };
    case "year":
      return yearOptions(token, onError);
    case "month":
      return { month: monthStyle(token, onError) };
    case "day":
      return { day: dayStyle(token, onError) };
    case "weekday":
      return { weekday: weekdayStyle(token, onError) };
    case "period":
      return void 0;
    case "hour":
      return hourOptions(token);
    case "min":
      return { minute: numeric(token.width) };
    case "sec":
      return { second: numeric(token.width) };
    case "tz":
      return { timeZoneName: timeZoneNameStyle(token, onError) };
    case "quarter":
    case "week":
    case "sec-frac":
    case "ms":
      onError(`${token.desc} is not supported`);
  }
  return void 0;
}
__name(compileOptions, "compileOptions");
function getDateFormatOptions(tokens, timeZone, onError = (error) => {
  throw error;
}) {
  const options = {
    timeZone
  };
  const fields2 = [];
  for (const token of tokens) {
    const { error, field, str } = token;
    if (error) {
      const dte = new DateFormatError(error.message, token);
      dte.stack = error.stack;
      onError(dte);
    }
    if (str) {
      const msg = `Ignoring string part: ${str}`;
      onError(new DateFormatError(msg, token, DateFormatError.WARNING));
    }
    if (field) {
      if (fields2.indexOf(field) === -1)
        fields2.push(field);
      else
        onError(new DateFormatError(`Duplicate ${field} token`, token));
    }
    const opt = compileOptions(token, (msg, isWarning) => onError(new DateFormatError(msg, token, isWarning)));
    if (opt)
      Object.assign(options, opt);
  }
  return options;
}
__name(getDateFormatOptions, "getDateFormatOptions");

// node_modules/@messageformat/date-skeleton/lib/tokens.js
var fields = {
  G: { field: "era", desc: "Era" },
  y: { field: "year", desc: "Year" },
  Y: { field: "year", desc: 'Year of "Week of Year"' },
  u: { field: "year", desc: "Extended year" },
  U: { field: "year", desc: "Cyclic year name" },
  r: { field: "year", desc: "Related Gregorian year" },
  Q: { field: "quarter", desc: "Quarter" },
  q: { field: "quarter", desc: "Stand-alone quarter" },
  M: { field: "month", desc: "Month in year" },
  L: { field: "month", desc: "Stand-alone month in year" },
  w: { field: "week", desc: "Week of year" },
  W: { field: "week", desc: "Week of month" },
  d: { field: "day", desc: "Day in month" },
  D: { field: "day", desc: "Day of year" },
  F: { field: "day", desc: "Day of week in month" },
  g: { field: "day", desc: "Modified julian day" },
  E: { field: "weekday", desc: "Day of week" },
  e: { field: "weekday", desc: "Local day of week" },
  c: { field: "weekday", desc: "Stand-alone local day of week" },
  a: { field: "period", desc: "AM/PM marker" },
  b: { field: "period", desc: "AM/PM/noon/midnight marker" },
  B: { field: "period", desc: "Flexible day period" },
  h: { field: "hour", desc: "Hour in AM/PM (1~12)" },
  H: { field: "hour", desc: "Hour in day (0~23)" },
  k: { field: "hour", desc: "Hour in day (1~24)" },
  K: { field: "hour", desc: "Hour in AM/PM (0~11)" },
  j: { field: "hour", desc: "Hour in preferred cycle" },
  J: { field: "hour", desc: "Hour in preferred cycle without marker" },
  C: { field: "hour", desc: "Hour in preferred cycle with flexible marker" },
  m: { field: "min", desc: "Minute in hour" },
  s: { field: "sec", desc: "Second in minute" },
  S: { field: "sec-frac", desc: "Fractional second" },
  A: { field: "ms", desc: "Milliseconds in day" },
  z: { field: "tz", desc: "Time Zone: specific non-location" },
  Z: { field: "tz", desc: "Time Zone" },
  O: { field: "tz", desc: "Time Zone: localized" },
  v: { field: "tz", desc: "Time Zone: generic non-location" },
  V: { field: "tz", desc: "Time Zone: ID" },
  X: { field: "tz", desc: "Time Zone: ISO8601 with Z" },
  x: { field: "tz", desc: "Time Zone: ISO8601" }
};
var isLetter = /* @__PURE__ */ __name((char) => char >= "A" && char <= "Z" || char >= "a" && char <= "z", "isLetter");
function readFieldToken(src, pos) {
  const char = src[pos];
  let width = 1;
  while (src[++pos] === char)
    ++width;
  const field = fields[char];
  if (!field) {
    const msg = `The letter ${char} is not a valid field identifier`;
    return { char, error: new Error(msg), width };
  }
  return { char, field: field.field, desc: field.desc, width };
}
__name(readFieldToken, "readFieldToken");
function readQuotedToken(src, pos) {
  let str = src[++pos];
  let width = 2;
  if (str === "'")
    return { char: "'", str, width };
  while (true) {
    const next = src[++pos];
    ++width;
    if (next === void 0) {
      const msg = `Unterminated quoted literal in pattern: ${str || src}`;
      return { char: "'", error: new Error(msg), str, width };
    } else if (next === "'") {
      if (src[++pos] !== "'")
        return { char: "'", str, width };
      else
        ++width;
    }
    str += next;
  }
}
__name(readQuotedToken, "readQuotedToken");
function readToken(src, pos) {
  const char = src[pos];
  if (!char)
    return null;
  if (isLetter(char))
    return readFieldToken(src, pos);
  if (char === "'")
    return readQuotedToken(src, pos);
  let str = char;
  let width = 1;
  while (true) {
    const next = src[++pos];
    if (!next || isLetter(next) || next === "'")
      return { char, str, width };
    str += next;
    width += 1;
  }
}
__name(readToken, "readToken");
function parseDateTokens(src) {
  const tokens = [];
  let pos = 0;
  while (true) {
    const token = readToken(src, pos);
    if (!token)
      return tokens;
    tokens.push(token);
    pos += token.width;
  }
}
__name(parseDateTokens, "parseDateTokens");

// node_modules/@lingui/message-utils/dist/compileMessage.mjs
function processTokens(tokens, mapText) {
  if (!tokens.filter((token) => token.type !== "content").length) {
    return tokens.map((token) => mapText(token.value));
  }
  return tokens.map((token) => {
    if (token.type === "content") {
      return mapText(token.value);
    } else if (token.type === "octothorpe") {
      return "#";
    } else if (token.type === "argument") {
      return [token.arg];
    } else if (token.type === "function") {
      const _param = token?.param?.[0];
      if (token.key === "date" && _param) {
        const opts = compileDateExpression(_param.value.trim(), (e) => {
          throw new Error(`Unable to compile date expression: ${e.message}`);
        });
        return [token.arg, token.key, opts];
      }
      if (_param) {
        return [token.arg, token.key, _param.value.trim()];
      } else {
        return [token.arg, token.key];
      }
    }
    const offset = token.pluralOffset;
    const formatProps = {};
    token.cases.forEach(({ key, tokens: tokens2 }) => {
      const prop = key[0] === "=" ? key.slice(1) : key;
      formatProps[prop] = processTokens(tokens2, mapText);
    });
    return [
      token.arg,
      token.type,
      {
        offset,
        ...formatProps
      }
    ];
  });
}
__name(processTokens, "processTokens");
function compileDateExpression(format, onError) {
  if (/^::/.test(format)) {
    const tokens = parseDateTokens(format.substring(2));
    return getDateFormatOptions(tokens, void 0, onError);
  }
  return format;
}
__name(compileDateExpression, "compileDateExpression");
function compileMessageOrThrow(message, mapText = (v) => v) {
  return processTokens((0, import_parser.parse)(message), mapText);
}
__name(compileMessageOrThrow, "compileMessageOrThrow");
function compileMessage(message, mapText = (v) => v) {
  try {
    return compileMessageOrThrow(message, mapText);
  } catch (e) {
    console.error(`${e.message} 

Message: ${message}`);
    return [message];
  }
}
__name(compileMessage, "compileMessage");

// src/Utils/toCompiledMessages.tsx
function toCompiledMessages(rawMessages) {
  const compiledMessages = {};
  Object.keys(rawMessages).forEach((key) => {
    const message = rawMessages[key];
    compiledMessages[key] = compileMessage(message);
  });
  return compiledMessages;
}
__name(toCompiledMessages, "toCompiledMessages");
var Router = /* @__PURE__ */ __name((props) => {
  const { config, translations, context } = props;
  const {
    routes,
    contexts,
    components,
    entryRoute,
    errorComponent,
    notFoundComponent
  } = config;
  let idRoutes = {};
  let realRoutes = {};
  let redirectRoutes = {};
  const rootRoute = react.useMemo(
    () => reactRouter.createRootRouteWithContext()({
      component: /* @__PURE__ */ __name(() => /* @__PURE__ */ jsxRuntime.jsx(RouterOutlet, {}), "component"),
      notFoundComponent,
      errorComponent,
      context: /* @__PURE__ */ __name(() => context, "context")
    }),
    [notFoundComponent, errorComponent, context]
  );
  contexts.forEach((route) => {
    idRoutes[route.id] = reactRouter.createRoute({
      getParentRoute: /* @__PURE__ */ __name(() => {
        if (route.contextId) {
          return idRoutes[route.contextId];
        }
        return rootRoute;
      }, "getParentRoute"),
      id: route.id,
      beforeLoad: /* @__PURE__ */ __name((opts) => {
        if (route.beforeLoad) {
          return route.beforeLoad({
            ...opts,
            context: opts.context
          });
        }
      }, "beforeLoad"),
      component: /* @__PURE__ */ __name(() => /* @__PURE__ */ jsxRuntime.jsx(RouterOutlet, {}), "component")
    });
  });
  const languageFirstRegion = {};
  routes.forEach((route) => {
    if (!languageFirstRegion[route.language] && route.regions.length > 0) {
      languageFirstRegion[route.language] = route.regions[0];
    }
    const currentRouteConfig = components[route.id];
    if (!currentRouteConfig) {
      return;
    }
    const regions = route.regions;
    if (regions.length === 0) {
      throw new Error(
        "IRoutes config for route: " + route.id + " - " + route.language + " must at least contain one region"
      );
    }
    regions.forEach((region) => {
      const locale = toLocale({ language: route.language, region });
      const isFirstRegion = languageFirstRegion[route.language] === region;
      const path = createSafeRouterPath({
        localeOrLanguage: locale,
        path: route.path
      });
      realRoutes[path] = reactRouter.createRoute({
        getParentRoute: /* @__PURE__ */ __name(() => {
          if (currentRouteConfig.contextId) {
            return idRoutes[currentRouteConfig.contextId];
          }
          return rootRoute;
        }, "getParentRoute"),
        path,
        component: currentRouteConfig.component,
        loader: /* @__PURE__ */ __name(async ({ params, context: context2 }) => {
          if (currentRouteConfig.loader) {
            return currentRouteConfig.loader(
              params,
              { context: context2 },
              route.language,
              region
            );
          }
        }, "loader")
      });
      if (isFirstRegion) {
        const redirectPath = createSafeRouterPath({
          localeOrLanguage: route.language,
          path: route.path
        });
        const targetPath = createSafeRouterPath({
          localeOrLanguage: locale,
          path: route.path
        });
        redirectRoutes[redirectPath] = reactRouter.createRoute({
          getParentRoute: /* @__PURE__ */ __name(() => {
            if (currentRouteConfig.contextId) {
              return idRoutes[currentRouteConfig.contextId];
            }
            return rootRoute;
          }, "getParentRoute"),
          path: redirectPath,
          loader: /* @__PURE__ */ __name(async () => {
            throw reactRouter.redirect({ to: targetPath });
          }, "loader")
        });
      }
      if (entryRoute.id === route.id && entryRoute.language === route.language && entryRoute.region === region) {
        const entryPath = "/";
        const redirectToEntry = createSafeRouterPath({
          localeOrLanguage: route.language,
          path: route.path
        });
        redirectRoutes[entryPath] = reactRouter.createRoute({
          getParentRoute: /* @__PURE__ */ __name(() => {
            if (currentRouteConfig.contextId) {
              return idRoutes[currentRouteConfig.contextId];
            }
            return rootRoute;
          }, "getParentRoute"),
          path: entryPath,
          loader: /* @__PURE__ */ __name(async () => {
            throw reactRouter.redirect({ to: redirectToEntry });
          }, "loader")
        });
      }
    });
  });
  const routeList = [
    ...Object.values(idRoutes),
    ...Object.values(realRoutes),
    ...Object.values(redirectRoutes)
  ];
  const routeTree = react.useMemo(() => {
    return rootRoute.addChildren(routeList);
  }, [rootRoute, routeList]);
  const tanstackRouter = react.useMemo(
    () => reactRouter.createRouter({
      routeTree,
      trailingSlash: "never",
      defaultNotFoundComponent: notFoundComponent,
      defaultErrorComponent: errorComponent,
      context
    }),
    [routeTree, notFoundComponent, errorComponent, context]
  );
  const router = react.useMemo(
    () => createRouterCore({
      config,
      router: tanstackRouter,
      routes: routeList
    }),
    [tanstackRouter, config]
  );
  const linguiI18N = react.useMemo(
    () => new core.I18n({
      missing: /* @__PURE__ */ __name((locale, key) => {
        console.warn(`MISSING TRANSLATION: ${key} in ${locale}`);
        return "";
      }, "missing")
    }),
    []
  );
  const i18n = react.useMemo(
    () => createRouteI18n({ i18n: linguiI18N }),
    [linguiI18N]
  );
  linguiI18N.loadAndActivate({
    locale: router.defaultLanguage(),
    messages: {}
  });
  react.useEffect(() => {
    (async () => {
      const extractedLocale = extractLocale({
        pathname: window.location.pathname
      });
      const lang = extractedLocale ? extractLanguage({ locale: extractedLocale }) : router.defaultLanguage();
      const messages = await translations(lang);
      const compiledMessages = toCompiledMessages(messages);
      linguiI18N.load(lang, compiledMessages);
      linguiI18N.activate(lang);
      i18n.load(lang, compiledMessages);
    })();
  }, [i18n, linguiI18N, translations, router]);
  react.useEffect(() => {
    router.languages().forEach(async (lang) => {
      const messages = await translations(lang);
      const compiledMessages = toCompiledMessages(messages);
      i18n.load(lang, compiledMessages);
    });
  }, [i18n, translations, router]);
  return /* @__PURE__ */ jsxRuntime.jsx(RouteI18nContext.Provider, { value: i18n, children: /* @__PURE__ */ jsxRuntime.jsx(react$1.I18nProvider, { i18n: linguiI18N, children: /* @__PURE__ */ jsxRuntime.jsx(RouterCoreContext.Provider, { value: router, children: /* @__PURE__ */ jsxRuntime.jsx(reactRouter.RouterProvider, { router: tanstackRouter }) }) }) });
}, "Router");
var useRouter = /* @__PURE__ */ __name(() => {
  const context = react.useContext(RouterCoreContext);
  if (!context) {
    throw new Error("useRouter must be used within a <Router> Provider");
  }
  return context;
}, "useRouter");
var useRouteLocale = /* @__PURE__ */ __name(() => reactRouter.useRouterState({
  select: /* @__PURE__ */ __name((state) => extractLocale({ pathname: state.location.pathname }), "select")
}), "useRouteLocale");

// src/Utils/extractRegion.tsx
var extractRegion = /* @__PURE__ */ __name(({
  locale
}) => {
  const region = new Intl.Locale(locale).region;
  if (!region) {
    throw new Error("a locale must contain a region");
  }
  return region.toLowerCase();
}, "extractRegion");

// src/Hooks/useRouteRegion.tsx
var useRouteRegion = /* @__PURE__ */ __name(() => {
  const locale = useRouteLocale();
  if (!locale) {
    return null;
  }
  try {
    return extractRegion({ locale });
  } catch (e) {
    return null;
  }
}, "useRouteRegion");
function useRouteParams({
  router,
  route,
  select
}) {
  const id = react.useMemo(() => {
    if (router.hasRoute(route.id, route.locale)) {
      return router.id(route.id, route.locale);
    }
    return route.id;
  }, [route.id, route.locale, router]);
  if (select) {
    return reactRouter.useParams({ from: id, select });
  }
  return reactRouter.useParams({ from: id });
}
__name(useRouteParams, "useRouteParams");
function useRouteQuery({
  router,
  route,
  select
}) {
  const id = react.useMemo(() => {
    return router.id(route.id, route.locale);
  }, [route.id, route.locale, router]);
  return reactRouter.useSearch({ from: id, select });
}
__name(useRouteQuery, "useRouteQuery");
function useRouteLoaderData({
  router,
  route,
  select
}) {
  const id = react.useMemo(() => {
    if (router.hasRoute(route.id, route.locale)) {
      return router.id(route.id, route.locale);
    }
    return route.id;
  }, [route.id, route.locale, router]);
  if (select) {
    return reactRouter.useLoaderData({ from: id, select });
  }
  return reactRouter.useLoaderData({ from: id });
}
__name(useRouteLoaderData, "useRouteLoaderData");
var useRouteIsTransitioning = /* @__PURE__ */ __name(() => {
  const { isTransitioning } = reactRouter.useRouterState({
    select: /* @__PURE__ */ __name((state) => ({
      isTransitioning: state.isTransitioning
    }), "select")
  });
  return isTransitioning;
}, "useRouteIsTransitioning");
var useTranslationLoaded = /* @__PURE__ */ __name(() => {
  const i18n = useRouteI18n();
  const language = useRouteLanguage();
  return react.useSyncExternalStore(
    (callback) => i18n.subscribe(callback),
    () => i18n.isLoaded(language),
    () => false
  );
}, "useTranslationLoaded");
var useRouterBootstrapped = /* @__PURE__ */ __name(() => {
  const router = useRouter();
  return reactRouter.useRouterState({
    select: /* @__PURE__ */ __name(() => router.isBootstrapped(), "select")
  });
}, "useRouterBootstrapped");

// src/Utils/createRouterConfig.tsx
var createRouterConfig = /* @__PURE__ */ __name(({
  entryRoute,
  components,
  routes,
  contexts,
  notFoundComponent,
  errorComponent
}) => {
  return {
    entryRoute,
    components,
    routes,
    contexts,
    notFoundComponent,
    errorComponent
  };
}, "createRouterConfig");

exports.RouteI18nContext = RouteI18nContext;
exports.Router = Router;
exports.RouterCoreContext = RouterCoreContext;
exports.createRouterConfig = createRouterConfig;
exports.extractLanguage = extractLanguage;
exports.extractRegion = extractRegion;
exports.toLocale = toLocale;
exports.useRouteI18n = useRouteI18n;
exports.useRouteIsTransitioning = useRouteIsTransitioning;
exports.useRouteLanguage = useRouteLanguage;
exports.useRouteLoaderData = useRouteLoaderData;
exports.useRouteLocale = useRouteLocale;
exports.useRouteParams = useRouteParams;
exports.useRouteQuery = useRouteQuery;
exports.useRouteRegion = useRouteRegion;
exports.useRouter = useRouter;
exports.useRouterBootstrapped = useRouterBootstrapped;
exports.useTranslationLoaded = useTranslationLoaded;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map