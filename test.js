requirejs = require("requirejs")
var chai = require("chai")

requirejs(
  ["collectives"],
  function(Collectives) {
    var expect = chai.expect

    var collectives = new Collectives()

    collectives.default("egg", {yolkCounts: []})

    collectives.default("bean", {sproutedCount: 0})

    var firstFrame = collectives.getFrame()

    firstFrame("egg").yolkCounts.push(1)
    firstFrame("egg").yolkCounts.push(1)

    firstFrame("bean").sproutedCount++

    var secondFrame = collectives.getFrame(["bean"])

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
})
