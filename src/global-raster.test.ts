import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { arfcnToFrequency, frequencyToArfcn, getGlobalRasterParams } from "./global-raster.ts"

describe("arfcnToFrequency", () => {
  it("applies Table 5.4.2.1-1 at every range boundary", () => {
    assert.equal(arfcnToFrequency(0), 0)
    assert.equal(arfcnToFrequency(599999), 2999.995)
    assert.equal(arfcnToFrequency(600000), 3000)
    assert.equal(arfcnToFrequency(2016666), 24249.99)
    assert.equal(arfcnToFrequency(2016667), 24250.08)
    assert.equal(arfcnToFrequency(3279165), 99999.96)
  })

  it("converts common carriers", () => {
    assert.equal(arfcnToFrequency(620000), 3300)
    assert.equal(arfcnToFrequency(428000), 2140)
    assert.equal(arfcnToFrequency(2079167), 28000.08)
  })

  it("rejects non-integers and out-of-range values", () => {
    for (const arfcn of [-1, 3279166, 1.5, Number.NaN, Infinity]) {
      assert.throws(() => arfcnToFrequency(arfcn), RangeError)
    }
  })
})

describe("frequencyToArfcn", () => {
  it("round-trips across all three ranges", () => {
    for (const arfcn of [0, 1, 422000, 599999, 600000, 620000, 2016666, 2016667, 2079167, 3279165]) {
      assert.deepEqual(frequencyToArfcn(arfcnToFrequency(arfcn)), { arfcn, exact: true })
    }
  })

  it("snaps off-grid frequencies to the nearest raster point", () => {
    assert.deepEqual(frequencyToArfcn(3300.01), { arfcn: 620001, exact: false })
    assert.deepEqual(frequencyToArfcn(24250.05), { arfcn: 2016667, exact: false })
    assert.deepEqual(frequencyToArfcn(100000), { arfcn: 3279165, exact: false })
  })

  it("rejects frequencies outside 0–100 GHz", () => {
    for (const mhz of [-0.001, 100000.001, Number.NaN]) {
      assert.throws(() => frequencyToArfcn(mhz), RangeError)
    }
  })
})

describe("getGlobalRasterParams", () => {
  it("returns the range an NR-ARFCN belongs to", () => {
    assert.equal(getGlobalRasterParams(599999).deltaFGlobalKhz, 5)
    assert.equal(getGlobalRasterParams(600000).deltaFGlobalKhz, 15)
    assert.equal(getGlobalRasterParams(2016667).deltaFGlobalKhz, 60)
  })
})
