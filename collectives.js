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

  function Collectives() {
    this.stacks = {}
    this.framePositions = {}
    this.defaults = {}
  }

  Collectives.prototype.default =
    function(name, attributes) {
      this.framePositions[name] = 0
      this.defaults[name] = attributes
      this.stacks[name] = [clone(attributes)]
    }

  function getCollective(stacks, positions, name) {
    return stacks[name][positions[name]]    
  }

  Collectives.prototype.getFrame =
    function(resets) {
      var stacks = this.stacks
      var noResets = !resets || resets.length < 1

      var positions = this.framePositions

      if (noResets) {
        return getCollective.bind(
          null, stacks, positions
        )
      }

      positions = clone(positions)

      for(var i=0; i<resets.length; i++) {
        var name = resets[i]
        var collective = clone(this.defaults[name])
        var newPosition = stacks[name].push(collective) - 1
        positions[name] = newPosition
      }

      return getCollective.bind(
        null, stacks, positions
      )
    }

  return Collectives
})