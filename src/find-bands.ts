import { CHANNEL_RASTERS, type ArfcnRange, type DuplexMode } from "./bands.ts"
import { assertArfcn } from "./global-raster.ts"

export type LinkDirection = "UL" | "DL" | "UL/DL"

export interface BandMatch {
  band: string
  duplexMode: DuplexMode
  direction: LinkDirection
  rasterKhz?: number
  channelBandwidthMhz?: number
  step: number
  /** True when the NR-ARFCN is one of the band's applicable channel raster entries, not just inside its range. */
  onRaster: boolean
}

export function findBands(arfcn: number): BandMatch[] {
  assertArfcn(arfcn)

  return CHANNEL_RASTERS.flatMap(({
    band,
    duplexMode,
    rasterKhz,
    channelBandwidthMhz,
    uplink,
    downlink
  }) => {
    const inUplink = uplink !== undefined && contains(uplink, arfcn)
    const inDownlink = downlink !== undefined && contains(downlink, arfcn)
    const range = inUplink ? uplink : inDownlink ? downlink : undefined

    if (!range) {
      return []
    }

    const [first, step] = range
    return [{
      band,
      duplexMode,
      direction: inUplink && inDownlink ? "UL/DL" : inUplink ? "UL" : "DL",
      rasterKhz,
      channelBandwidthMhz,
      step,
      onRaster: (arfcn - first) % step === 0,
    }]
  })
}

function contains([first, , last]: ArfcnRange, arfcn: number): boolean {
  return arfcn >= first && arfcn <= last
}
