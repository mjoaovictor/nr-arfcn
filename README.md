# nr-arfcn

Convert between 5G NR-ARFCN and Frequency (MHz), and find which NR operating bands an NR-ARFCN belongs to. Based on 3GPP TS 38.104 V20.1.0 (Release 20). Pure TypeScript with no runtime dependencies.

[Try it online](https://mjoaovictor.dev/tools/5g-nr-arfcn-calculator)

```sh
npm install nr-arfcn
```

```ts
import { arfcnToFrequency, findBands, frequencyToArfcn } from "nr-arfcn"

arfcnToFrequency(620000) // 3300
frequencyToArfcn(3300) // { arfcn: 620000, exact: true }
frequencyToArfcn(3300.01) // { arfcn: 620001, exact: false } (nearest raster point)

findBands(620000)
// [
//   { band: "n77", duplexMode: "TDD", direction: "UL/DL", rasterKhz: 15, step: 1, onRaster: true },
//   { band: "n77", duplexMode: "TDD", direction: "UL/DL", rasterKhz: 30, step: 2, onRaster: true },
//   { band: "n78", ... },
//   { band: "n78", ... },
// ]
```

## API

| Export | Description |
| --- | --- |
| `arfcnToFrequency(arfcn)` | Returns F<sub>REF</sub> in MHz (clause 5.4.2.1). |
| `frequencyToArfcn(mhz)` | Returns the nearest NR-ARFCN. `exact` is `false` when `mhz` falls between raster points. |
| `getGlobalRasterParams(arfcn)` | Returns the Table 5.4.2.1-1 row (ΔF<sub>Global</sub>, F<sub>REF-Offs</sub>, N<sub>REF-Offs</sub>, NR-ARFCN range). |
| `findBands(arfcn)` | Returns every band channel raster whose UL or DL range contains the NR-ARFCN. `onRaster` says whether the NR-ARFCN is on the band's step. |
| `GLOBAL_RASTER`, `CHANNEL_RASTERS` | The raw spec tables. |
| `MIN_ARFCN`, `MAX_ARFCN`, `MIN_FREQUENCY_MHZ`, `MAX_FREQUENCY_MHZ` | Valid input bounds. |

Invalid input throws a `RangeError`: a non-integer NR-ARFCN, or a value outside 0–3279165 or 0–100000 MHz. Frequencies are computed in integer kHz, so the result is free of floating-point drift (`arfcnToFrequency(2016667) === 24250.08`).

## Sources

- Table 5.4.2.1-1: global frequency raster
- Tables 5.2-1 and 5.2-2: duplex mode per band
- Tables 5.4.2.3-1 and 5.4.2.3-2: applicable NR-ARFCN per band in FR1 and FR2
- Table 5.4.2.3-3: n263 per channel bandwidth (`channelBandwidthMhz` is set, `rasterKhz` is not)

## Not Covered

- The 10 kHz enhanced channel raster (Table 5.4.2.3-4)
- Per-bandwidth NR-ARFCN lists for n46, n96 and n102 (notes 1–3 of Table 5.4.2.3-1). These bands are matched on their full table range instead.
- The 3 MHz channel bandwidth restriction for n106 (note 5 of Table 5.4.2.3-1: only NR-ARFCN 179800 and 187600 apply). n106 is matched on its full table range.
- The 7.5 kHz uplink shift (F<sub>REF,shift</sub>)
- The synchronization raster (GSCN)

## Development

```sh
npm test            # node:test, run with Node's native TypeScript support (Node ≥ 23.6)
npm run typecheck
npm run build       # emits dist/ (JS and .d.ts)
```

## License

[MIT](LICENSE). The band and raster values come from 3GPP TS 38.104. This project is not affiliated with or endorsed by 3GPP.
