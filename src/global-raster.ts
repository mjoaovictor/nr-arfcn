export interface GlobalRasterParams {
  deltaFGlobalKhz: number
  fRefOffsetMhz: number
  nRefOffset: number
  firstArfcn: number
  lastArfcn: number
}

/** TS 38.104 Table 5.4.2.1-1: NR-ARFCN parameters for the global frequency raster. */
export const GLOBAL_RASTER: readonly GlobalRasterParams[] = [
  { deltaFGlobalKhz: 5, fRefOffsetMhz: 0, nRefOffset: 0, firstArfcn: 0, lastArfcn: 599999 },
  { deltaFGlobalKhz: 15, fRefOffsetMhz: 3000, nRefOffset: 600000, firstArfcn: 600000, lastArfcn: 2016666 },
  { deltaFGlobalKhz: 60, fRefOffsetMhz: 24250.08, nRefOffset: 2016667, firstArfcn: 2016667, lastArfcn: 3279165 },
]

export const MIN_ARFCN = 0
export const MAX_ARFCN = 3279165
export const MIN_FREQUENCY_MHZ = 0
/** The global raster is defined up to 100 GHz (TS 38.104 clause 5.4.2.1). */
export const MAX_FREQUENCY_MHZ = 100000

export function getGlobalRasterParams(arfcn: number): GlobalRasterParams {
  assertArfcn(arfcn)
  const params = GLOBAL_RASTER.find(({ lastArfcn }) => arfcn <= lastArfcn)
  if (!params) throw new RangeError(`NR-ARFCN ${arfcn} is outside the global raster`)
  return params
}

/** F_REF = F_REF-Offs + ΔF_Global × (N_REF − N_REF-Offs), in MHz. */
export function arfcnToFrequency(arfcn: number): number {
  return frequencyKhz(arfcn, getGlobalRasterParams(arfcn)) / 1000
}

export interface ArfcnFromFrequency {
  arfcn: number
  /** False when the frequency falls between raster points and `arfcn` is the nearest one. */
  exact: boolean
}

export function frequencyToArfcn(frequencyMhz: number): ArfcnFromFrequency {
  if (
    !Number.isFinite(frequencyMhz) ||
    frequencyMhz < MIN_FREQUENCY_MHZ ||
    frequencyMhz > MAX_FREQUENCY_MHZ
  ) {
    throw new RangeError(
      `Frequency must be between ${MIN_FREQUENCY_MHZ} and ${MAX_FREQUENCY_MHZ} MHz, got ${frequencyMhz}`,
    )
  }

  const targetKhz = frequencyMhz * 1000
  // Ranges meet between raster points (e.g. 24249.99 vs 24250.08 MHz), so take the nearest point across all of them
  let nearest = { arfcn: MIN_ARFCN, distanceKhz: Infinity }
  for (const params of GLOBAL_RASTER) {
    const steps = Math.round((targetKhz - params.fRefOffsetMhz * 1000) / params.deltaFGlobalKhz)
    const arfcn = Math.min(Math.max(params.nRefOffset + steps, params.firstArfcn), params.lastArfcn)
    const distanceKhz = Math.abs(frequencyKhz(arfcn, params) - targetKhz)
    if (distanceKhz < nearest.distanceKhz) nearest = { arfcn, distanceKhz }
  }

  // Inputs like 3300.015 carry binary rounding error far below 1 Hz
  return { arfcn: nearest.arfcn, exact: nearest.distanceKhz < 1e-6 }
}

export function assertArfcn(arfcn: number): void {
  if (!Number.isInteger(arfcn) || arfcn < MIN_ARFCN || arfcn > MAX_ARFCN) {
    throw new RangeError(`NR-ARFCN must be an integer between ${MIN_ARFCN} and ${MAX_ARFCN}, got ${arfcn}`)
  }
}

// Integer kHz arithmetic keeps offsets like 24250.08 MHz free of floating-point drift
function frequencyKhz(arfcn: number, params: GlobalRasterParams): number {
  return Math.round(params.fRefOffsetMhz * 1000) + params.deltaFGlobalKhz * (arfcn - params.nRefOffset)
}
