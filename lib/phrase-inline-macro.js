const phraseInlineMacro = function () {
  const self = this
  self.positionalAttributes('content')
  self.process((parent, target, attrs) => {
    const text = attrs.content
    const opts = { attributes: attrs, type: target }
    return self.createInline(parent, 'quoted', text, opts)
  })
}

module.exports.register = function register (registry) {
  if (typeof registry.register === 'function') {
    registry.register(function () {
      this.inlineMacro('phrase', phraseInlineMacro)
    })
  } else if (typeof registry.block === 'function') {
    registry.inlineMacro('phrase', phraseInlineMacro)
  }
  return registry
}
