import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { findBands } from "./find-bands.ts"

const summarize = (arfcn: number) =>
  findBands(arfcn).map(({ band, direction, rasterKhz, step, onRaster }) =>
    `${band} ${direction} ${rasterKhz} <${step}> ${onRaster ? "on" : "off"}`,
  )

describe("findBands", () => {
  it("matches n77 and n78 at both rasters for 3300 MHz", () => {
    assert.deepEqual(summarize(620000), [
      "n77 UL/DL 15 <1> on",
      "n77 UL/DL 30 <2> on",
      "n78 UL/DL 15 <1> on",
      "n78 UL/DL 30 <2> on",
    ])
  })

  it("flags NR-ARFCNs inside a band but off its raster step", () => {
    assert.deepEqual(summarize(620001), [
      "n77 UL/DL 15 <1> on",
      "n77 UL/DL 30 <2> off",
      "n78 UL/DL 15 <1> on",
      "n78 UL/DL 30 <2> off",
    ])
  })

  it("reports whether each band uses the NR-ARFCN for UL or DL", () => {
    assert.deepEqual(summarize(390000), [
      "n1 UL 100 <20> on",
      "n2 DL 100 <20> on",
      "n25 DL 100 <20> on",
      "n65 UL 100 <20> on",
      "n84 UL 100 <20> on",
    ])
    assert.deepEqual(summarize(428000), ["n1 DL 100 <20> on", "n65 DL 100 <20> on", "n66 DL 100 <20> on"])
  })

  it("handles SDL and SUL bands", () => {
    assert.deepEqual(findBands(144000).find(({ band }) => band === "n29")?.direction, "DL")
    assert.deepEqual(findBands(342000).find(({ band }) => band === "n80")?.duplexMode, "SUL")
  })

  it("matches n263 per channel bandwidth", () => {
    const matches = findBands(2580043 + 6720)
    assert.deepEqual(
      matches.map(({ band, channelBandwidthMhz, onRaster }) => [band, channelBandwidthMhz, onRaster]),
      [["n263", 100, false], ["n263", 400, true], ["n263", 800, false], ["n263", 1600, false], ["n263", 2000, true]],
    )
  })

  it("returns nothing outside every band", () => {
    assert.deepEqual(findBands(0), [])
  })
})
