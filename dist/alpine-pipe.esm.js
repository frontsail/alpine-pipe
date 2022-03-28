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
export {
  module_default as default
};
