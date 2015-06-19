if (typeof define !== 'function') {
  var define = require('amdefine')(
    module)}

function clone(attributes) {
  var object = {}
  for(key in attributes) {
    object[key] = attributes[key]
  }
  return object
}

define(function() {

  function SingletonFrame(generators, frame) {
    this.frame = frame || {}
    this.generators = generators || {}
  }

  SingletonFrame.prototype.describe =
    function(name, generator) {
      this.generators[name] = generator
      this.frame[name] = generator()
    }

  SingletonFrame.prototype.get =
    function(name) {
      return this.frame[name]
    }

  SingletonFrame.prototype.reset =
    function(resets) {
      var noResets = !resets || resets.length == []

      if (noResets) {
        return this
      } else {
        newFrame = clone(this.frame)

        for(var i=0; i<resets.length; i++) {
          var key = resets[i]
          newFrame[key] = this.generators[key]()
        }

        return new SingletonFrame(
          this.generators,
          newFrame
        )
      }
    }

  return SingletonFrame
})