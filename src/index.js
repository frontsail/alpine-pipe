export default function (Alpine) {
  const transformers = {
    safe: (value) => (_D ? _D.safe(value) : ''),
  }

  Alpine.pipe = function (name, transformer) {
    if (transformer) {
      transformers[name] = transformer
    }

    return transformers[name]
  }

  Alpine.directive('pipe', (el, { modifiers, expression }, { effect, evaluateLater }) => {
    const evaluate = evaluateLater(expression)

    effect(() => {
      evaluate((value) => {
        el.innerHTML = modifiers.map(camelize).reduce(chain, value)
      })
    })
  })

  // Usage examples:
  // $pipe.fromNow('2022-02-22')
  // $pipe('[b]bold[/b]<script>xss()</script', 'bbCode', 'safe')
  Alpine.magic(
    'pipe',
    () =>
      new Proxy(
        function (value, ...pipes) {
          return pipes.reduce(chain, value)
        },
        {
          get(target, property) {
            return target[property]
          },
        },
      ),
  )

  function chain(prev, pipeName) {
    return transformers[pipeName] ? transformers[pipeName](prev) : prev
  }

  /**
   * Transforms an example-string into an exampleString.
   *
   * @param {string} s String to camelize
   * @returns {string} The camelized string
   */
  function camelize(s) {
    return s.replace(/-./g, (x) => x[1].toUpperCase())
  }
}
