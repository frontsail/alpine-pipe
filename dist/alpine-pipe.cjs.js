var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// builds/module.js
var module_exports = {};
__export(module_exports, {
  default: () => module_default
});
module.exports = __toCommonJS(module_exports);

// src/index.js
function src_default(Alpine) {
  const transformers = {
    safe: (value) => _D ? _D.safe(value) : ""
  };
  Alpine.pipe = function(name, transformer) {
    if (transformer) {
      transformers[name] = transformer;
    }
    return transformers[name];
  };
  Alpine.directive("pipe", (el, { modifiers, expression }, { effect, evaluateLater }) => {
    const evaluate = evaluateLater(expression);
    effect(() => {
      evaluate((value) => {
        el.innerHTML = modifiers.map(camelize).reduce(chain, value);
      });
    });
  });
  Alpine.magic("pipe", () => new Proxy(function(value, ...pipes) {
    return pipes.reduce(chain, value);
  }, {
    get(target, property) {
      return target[property];
    }
  }));
  function chain(prev, pipeName) {
    return transformers[pipeName] ? transformers[pipeName](prev) : prev;
  }
  function camelize(s) {
    return s.replace(/-./g, (x) => x[1].toUpperCase());
  }
}

// builds/module.js
var module_default = src_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
