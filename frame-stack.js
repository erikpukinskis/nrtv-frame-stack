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

  function FrameStack() {
    this._frame = {}
    this.defaults = {}
  }

  FrameStack.prototype.default =
    function(name, attributes) {
      this.defaults[name] = attributes
      this._frame[name] = clone(attributes)
    }

  function getValue(frame, key) {
    var value = frame[key]
    return value
  }

  FrameStack.prototype.frame =
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
          newFrame[key] = clone(this.defaults[key])
        }

        callback(
          getValue.bind(null, newFrame)
        )
      }
    }

  return FrameStack
})