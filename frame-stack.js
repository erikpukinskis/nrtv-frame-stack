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

  function SingletonFrameStack() {
    this._frame = {}
    this.generators = {}
  }

  SingletonFrameStack.prototype.generator =
    function(name, generator) {
      this.generators[name] = generator
      this._frame[name] = generator()
    }

  function getValue(frame, key) {
    var value = frame[key]
    return value
  }

  SingletonFrameStack.prototype.frame =
    function(resets, callback) {
      if (!callback) {
        callback = resets
        resets = undefined
      }

      var originalFrame = this._frame

      if (!resets) {
        callback(
          getValue.bind(null, originalFrame)
        )
      } else {
        newFrame = clone(this._frame)

        for(var i=0; i<resets.length; i++) {
          var key = resets[i]
          newFrame[key] = this.generators[key]()
        }

        callback(
          getValue.bind(null, newFrame)
        )
      }
    }

  return SingletonFrameStack
})