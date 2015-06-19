requirejs = require("requirejs")
var chai = require("chai")

requirejs(
  ["frame-stack"],
  function(SingletonFrame) {
    var expect = chai.expect

    var firstFrame = new SingletonFrame()

    firstFrame.describe("egg",
      function() {
        return {yolkCounts: []}
      }
    )

    firstFrame.describe("bean",
      function() {
        return {sproutedCount: 0}
      }
    )

    firstFrame.get("egg").yolkCounts.push(1)
    firstFrame.get("egg").yolkCounts.push(1)

    firstFrame.get("bean").sproutedCount++

    secondFrame = firstFrame.reset(["bean"])

    firstFrame.get("egg").yolkCounts.push(2)

    expect(firstFrame.get("egg").yolkCounts)
    .to.deep.equal([1,1,2])

    expect(secondFrame.get("egg").yolkCounts)
    .to.deep.equal([1,1,2])

    expect(firstFrame.get("bean").sproutedCount).to.equal(1)

    expect(secondFrame.get("bean").sproutedCount).to.equal(0)

    secondFrame.get("egg").yolkCounts.push(1)

    expect(firstFrame.get("egg").yolkCounts)
    .to.deep.equal([1,1,2,1])

    expect(secondFrame.get("egg").yolkCounts)
    .to.deep.equal([1,1,2,1])

    console.log("aw yiss")

})
