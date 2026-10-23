/** `[first, step, last]` NR-ARFCN range, as written in TS 38.104 (First – <Step size> – Last). */
export type ArfcnRange = readonly [first: number, step: number, last: number]

export type DuplexMode = "FDD" | "TDD" | "SDL" | "SUL"

export interface ChannelRaster {
  band: string
  duplexMode: DuplexMode
  /** ΔFRaster. Absent for n263, whose raster is defined per channel bandwidth instead. */
  rasterKhz?: number
  channelBandwidthMhz?: number
  uplink?: ArfcnRange
  downlink?: ArfcnRange
}

/**
 * Applicable NR-ARFCN per operating band.
 * FR1: TS 38.104 Table 5.4.2.3-1, duplex modes from Table 5.2-1.
 * FR2: TS 38.104 Tables 5.4.2.3-2 and 5.4.2.3-3, duplex modes from Table 5.2-2.
 */
export const CHANNEL_RASTERS: readonly ChannelRaster[] = [
  { band: "n1", duplexMode: "FDD", rasterKhz: 100, uplink: [384000, 20, 396000], downlink: [422000, 20, 434000] },
  { band: "n2", duplexMode: "FDD", rasterKhz: 100, uplink: [370000, 20, 382000], downlink: [386000, 20, 398000] },
  { band: "n3", duplexMode: "FDD", rasterKhz: 100, uplink: [342000, 20, 357000], downlink: [361000, 20, 376000] },
  { band: "n5", duplexMode: "FDD", rasterKhz: 100, uplink: [164800, 20, 169800], downlink: [173800, 20, 178800] },
  { band: "n7", duplexMode: "FDD", rasterKhz: 100, uplink: [500000, 20, 514000], downlink: [524000, 20, 538000] },
  { band: "n8", duplexMode: "FDD", rasterKhz: 100, uplink: [176000, 20, 183000], downlink: [185000, 20, 192000] },
  { band: "n12", duplexMode: "FDD", rasterKhz: 100, uplink: [139800, 20, 143200], downlink: [145800, 20, 149200] },
  { band: "n13", duplexMode: "FDD", rasterKhz: 100, uplink: [155400, 20, 157400], downlink: [149200, 20, 151200] },
  { band: "n14", duplexMode: "FDD", rasterKhz: 100, uplink: [157600, 20, 159600], downlink: [151600, 20, 153600] },
  { band: "n18", duplexMode: "FDD", rasterKhz: 100, uplink: [163000, 20, 166000], downlink: [172000, 20, 175000] },
  { band: "n20", duplexMode: "FDD", rasterKhz: 100, uplink: [166400, 20, 172400], downlink: [158200, 20, 164200] },
  { band: "n24", duplexMode: "FDD", rasterKhz: 100, uplink: [325300, 20, 332100], downlink: [305000, 20, 311800] },
  { band: "n25", duplexMode: "FDD", rasterKhz: 100, uplink: [370000, 20, 383000], downlink: [386000, 20, 399000] },
  { band: "n26", duplexMode: "FDD", rasterKhz: 100, uplink: [162800, 20, 169800], downlink: [171800, 20, 178800] },
  { band: "n28", duplexMode: "FDD", rasterKhz: 100, uplink: [140600, 20, 149600], downlink: [151600, 20, 160600] },
  { band: "n29", duplexMode: "SDL", rasterKhz: 100, downlink: [143400, 20, 145600] },
  { band: "n30", duplexMode: "FDD", rasterKhz: 100, uplink: [461000, 20, 463000], downlink: [470000, 20, 472000] },
  { band: "n31", duplexMode: "FDD", rasterKhz: 100, uplink: [90500, 20, 91500], downlink: [92500, 20, 93500] },
  { band: "n34", duplexMode: "TDD", rasterKhz: 100, uplink: [402000, 20, 405000], downlink: [402000, 20, 405000] },
  { band: "n38", duplexMode: "TDD", rasterKhz: 100, uplink: [514000, 20, 524000], downlink: [514000, 20, 524000] },
  { band: "n39", duplexMode: "TDD", rasterKhz: 100, uplink: [376000, 20, 384000], downlink: [376000, 20, 384000] },
  { band: "n40", duplexMode: "TDD", rasterKhz: 100, uplink: [460000, 20, 480000], downlink: [460000, 20, 480000] },
  { band: "n41", duplexMode: "TDD", rasterKhz: 15, uplink: [499200, 3, 537999], downlink: [499200, 3, 537999] },
  { band: "n41", duplexMode: "TDD", rasterKhz: 30, uplink: [499200, 6, 537996], downlink: [499200, 6, 537996] },
  { band: "n46", duplexMode: "TDD", rasterKhz: 15, uplink: [743334, 1, 795000], downlink: [743334, 1, 795000] },
  { band: "n48", duplexMode: "TDD", rasterKhz: 15, uplink: [636667, 1, 646666], downlink: [636667, 1, 646666] },
  { band: "n48", duplexMode: "TDD", rasterKhz: 30, uplink: [636668, 2, 646666], downlink: [636668, 2, 646666] },
  { band: "n50", duplexMode: "TDD", rasterKhz: 100, uplink: [286400, 20, 303400], downlink: [286400, 20, 303400] },
  { band: "n51", duplexMode: "TDD", rasterKhz: 100, uplink: [285400, 20, 286400], downlink: [285400, 20, 286400] },
  { band: "n53", duplexMode: "TDD", rasterKhz: 100, uplink: [496700, 20, 499000], downlink: [496700, 20, 499000] },
  { band: "n54", duplexMode: "TDD", rasterKhz: 100, uplink: [334000, 20, 335000], downlink: [334000, 20, 335000] },
  { band: "n65", duplexMode: "FDD", rasterKhz: 100, uplink: [384000, 20, 402000], downlink: [422000, 20, 440000] },
  { band: "n66", duplexMode: "FDD", rasterKhz: 100, uplink: [342000, 20, 356000], downlink: [422000, 20, 440000] },
  { band: "n67", duplexMode: "SDL", rasterKhz: 100, downlink: [147600, 20, 151600] },
  { band: "n68", duplexMode: "FDD", rasterKhz: 100, uplink: [139600, 20, 145600], downlink: [150600, 20, 156600] },
  { band: "n70", duplexMode: "FDD", rasterKhz: 100, uplink: [339000, 20, 342000], downlink: [399000, 20, 404000] },
  { band: "n71", duplexMode: "FDD", rasterKhz: 100, uplink: [132600, 20, 139600], downlink: [123400, 20, 130400] },
  { band: "n72", duplexMode: "FDD", rasterKhz: 100, uplink: [90200, 20, 91200], downlink: [92200, 20, 93200] },
  { band: "n74", duplexMode: "FDD", rasterKhz: 100, uplink: [285400, 20, 294000], downlink: [295000, 20, 303600] },
  { band: "n75", duplexMode: "SDL", rasterKhz: 100, downlink: [286400, 20, 303400] },
  { band: "n76", duplexMode: "SDL", rasterKhz: 100, downlink: [285400, 20, 286400] },
  { band: "n77", duplexMode: "TDD", rasterKhz: 15, uplink: [620000, 1, 680000], downlink: [620000, 1, 680000] },
  { band: "n77", duplexMode: "TDD", rasterKhz: 30, uplink: [620000, 2, 680000], downlink: [620000, 2, 680000] },
  { band: "n78", duplexMode: "TDD", rasterKhz: 15, uplink: [620000, 1, 653333], downlink: [620000, 1, 653333] },
  { band: "n78", duplexMode: "TDD", rasterKhz: 30, uplink: [620000, 2, 653332], downlink: [620000, 2, 653332] },
  { band: "n79", duplexMode: "TDD", rasterKhz: 15, uplink: [693334, 1, 733333], downlink: [693334, 1, 733333] },
  { band: "n79", duplexMode: "TDD", rasterKhz: 30, uplink: [693334, 2, 733332], downlink: [693334, 2, 733332] },
  { band: "n80", duplexMode: "SUL", rasterKhz: 100, uplink: [342000, 20, 357000] },
  { band: "n81", duplexMode: "SUL", rasterKhz: 100, uplink: [176000, 20, 183000] },
  { band: "n82", duplexMode: "SUL", rasterKhz: 100, uplink: [166400, 20, 172400] },
  { band: "n83", duplexMode: "SUL", rasterKhz: 100, uplink: [140600, 20, 149600] },
  { band: "n84", duplexMode: "SUL", rasterKhz: 100, uplink: [384000, 20, 396000] },
  { band: "n85", duplexMode: "FDD", rasterKhz: 100, uplink: [139600, 20, 143200], downlink: [145600, 20, 149200] },
  { band: "n86", duplexMode: "SUL", rasterKhz: 100, uplink: [342000, 20, 356000] },
  { band: "n87", duplexMode: "FDD", rasterKhz: 100, uplink: [82000, 20, 83000], downlink: [84000, 20, 85000] },
  { band: "n88", duplexMode: "FDD", rasterKhz: 100, uplink: [82400, 20, 83400], downlink: [84400, 20, 85400] },
  { band: "n89", duplexMode: "SUL", rasterKhz: 100, uplink: [164800, 20, 169800] },
  { band: "n90", duplexMode: "TDD", rasterKhz: 15, uplink: [499200, 3, 537999], downlink: [499200, 3, 537999] },
  { band: "n90", duplexMode: "TDD", rasterKhz: 30, uplink: [499200, 6, 537996], downlink: [499200, 6, 537996] },
  { band: "n90", duplexMode: "TDD", rasterKhz: 100, uplink: [499200, 20, 538000], downlink: [499200, 20, 538000] },
  { band: "n91", duplexMode: "FDD", rasterKhz: 100, uplink: [166400, 20, 172400], downlink: [285400, 20, 286400] },
  { band: "n92", duplexMode: "FDD", rasterKhz: 100, uplink: [166400, 20, 172400], downlink: [286400, 20, 303400] },
  { band: "n93", duplexMode: "FDD", rasterKhz: 100, uplink: [176000, 20, 183000], downlink: [285400, 20, 286400] },
  { band: "n94", duplexMode: "FDD", rasterKhz: 100, uplink: [176000, 20, 183000], downlink: [286400, 20, 303400] },
  { band: "n95", duplexMode: "SUL", rasterKhz: 100, uplink: [402000, 20, 405000] },
  { band: "n96", duplexMode: "TDD", rasterKhz: 15, uplink: [795000, 1, 875000], downlink: [795000, 1, 875000] },
  { band: "n97", duplexMode: "SUL", rasterKhz: 100, uplink: [460000, 20, 480000] },
  { band: "n98", duplexMode: "SUL", rasterKhz: 100, uplink: [376000, 20, 384000] },
  { band: "n99", duplexMode: "SUL", rasterKhz: 100, uplink: [325300, 20, 332100] },
  { band: "n100", duplexMode: "FDD", rasterKhz: 100, uplink: [174880, 20, 176000], downlink: [183880, 20, 185000] },
  { band: "n101", duplexMode: "TDD", rasterKhz: 100, uplink: [380000, 20, 382000], downlink: [380000, 20, 382000] },
  { band: "n102", duplexMode: "TDD", rasterKhz: 15, uplink: [795000, 1, 828333], downlink: [795000, 1, 828333] },
  { band: "n104", duplexMode: "TDD", rasterKhz: 15, uplink: [828334, 1, 875000], downlink: [828334, 1, 875000] },
  { band: "n104", duplexMode: "TDD", rasterKhz: 30, uplink: [828334, 2, 875000], downlink: [828334, 2, 875000] },
  { band: "n105", duplexMode: "FDD", rasterKhz: 100, uplink: [132600, 20, 140600], downlink: [122400, 20, 130400] },
  { band: "n106", duplexMode: "FDD", rasterKhz: 100, uplink: [179200, 20, 180200], downlink: [187000, 20, 188000] },
  { band: "n109", duplexMode: "FDD", rasterKhz: 100, uplink: [140600, 20, 146600], downlink: [286400, 20, 303400] },
  { band: "n110", duplexMode: "FDD", rasterKhz: 100, uplink: [278000, 20, 279000], downlink: [286400, 20, 287000] },
  { band: "n115", duplexMode: "FDD", rasterKhz: 100, uplink: [285580, 20, 292580], downlink: [295180, 20, 302180] },
  { band: "n257", duplexMode: "TDD", rasterKhz: 60, uplink: [2054166, 1, 2104165], downlink: [2054166, 1, 2104165] },
  { band: "n257", duplexMode: "TDD", rasterKhz: 120, uplink: [2054167, 2, 2104165], downlink: [2054167, 2, 2104165] },
  { band: "n258", duplexMode: "TDD", rasterKhz: 60, uplink: [2016667, 1, 2070832], downlink: [2016667, 1, 2070832] },
  { band: "n258", duplexMode: "TDD", rasterKhz: 120, uplink: [2016667, 2, 2070831], downlink: [2016667, 2, 2070831] },
  { band: "n259", duplexMode: "TDD", rasterKhz: 60, uplink: [2270833, 1, 2337499], downlink: [2270833, 1, 2337499] },
  { band: "n259", duplexMode: "TDD", rasterKhz: 120, uplink: [2270833, 2, 2337499], downlink: [2270833, 2, 2337499] },
  { band: "n260", duplexMode: "TDD", rasterKhz: 60, uplink: [2229166, 1, 2279165], downlink: [2229166, 1, 2279165] },
  { band: "n260", duplexMode: "TDD", rasterKhz: 120, uplink: [2229167, 2, 2279165], downlink: [2229167, 2, 2279165] },
  { band: "n261", duplexMode: "TDD", rasterKhz: 60, uplink: [2070833, 1, 2084999], downlink: [2070833, 1, 2084999] },
  { band: "n261", duplexMode: "TDD", rasterKhz: 120, uplink: [2070833, 2, 2084999], downlink: [2070833, 2, 2084999] },
  { band: "n262", duplexMode: "TDD", rasterKhz: 60, uplink: [2399166, 1, 2415832], downlink: [2399166, 1, 2415832] },
  { band: "n262", duplexMode: "TDD", rasterKhz: 120, uplink: [2399167, 2, 2415831], downlink: [2399167, 2, 2415831] },
  ...n263([
    [100, [2564083, 1680, 2564083 + 1680 * 137]],
    [400, [2566603, 6720, 2566603 + 6720 * 33]],
    [800, [2569963, 6720, 2569963 + 6720 * 32]],
    [1600, [2576683, 6720, 2576683 + 6720 * 30]],
    [2000, [2580043, 6720, 2580043 + 6720 * 29]],
    [2000, [2585083, 1, 2585083]],
    [2000, [2655643, 1, 2655643]],
    [2000, [2692603, 1, 2692603]],
    [2000, [2764843, 1, 2764843]],
  ]),
]

function n263(entries: readonly (readonly [channelBandwidthMhz: number, range: ArfcnRange])[]): ChannelRaster[] {
  return entries.map(([channelBandwidthMhz, range]) => ({
    band: "n263",
    duplexMode: "TDD",
    channelBandwidthMhz,
    uplink: range,
    downlink: range,
  }))
}
