requirejs = require("requirejs")
var chai = require("chai")

requirejs(
  ["frame-stack"],
  function(FrameStack) {
    var expect = chai.expect

    function stackEggsAndBeans() {
      var food = new FrameStack()

      food.default("egg", {yolkCounts: []})

      food.default("bean", {sproutedCount: 0})

      var firstFrame
      var secondFrame

      food.frame(eggsAndASprout)      
    }

    function eggsAndASprout(frame) {
      firstFrame = frame

      firstFrame("egg").yolkCounts.push(1)
      firstFrame("egg").yolkCounts.push(1)

      firstFrame("bean").sproutedCount++

      food.frame(["bean"], funkyYolks)
    }

    function funkyYolks(frame) {
      secondFrame = frame

      firstFrame("egg").yolkCounts.push(2)

      expect(firstFrame("egg").yolkCounts)
      .to.deep.equal([1,1,2])

      expect(secondFrame("egg").yolkCounts)
      .to.deep.equal([1,1,2])

      expect(firstFrame("bean").sproutedCount).to.equal(1)

      expect(secondFrame("bean").sproutedCount).to.equal(0)

      secondFrame("egg").yolkCounts.push(1)

      expect(firstFrame("egg").yolkCounts)
      .to.deep.equal([1,1,2,1])

      expect(secondFrame("egg").yolkCounts)
      .to.deep.equal([1,1,2,1])

      console.log("durrrrr")
    }

})
