import { decodePulseCounterUplink } from "../coreFunctions/uplink-decoder.cjs"
import {changeSamplingTime} from "../coreFunctions/downlink-encoder.cjs"

/*
*   This section covers how to decode received data for Ellenex Tipping Spoon Rain Sensor (MRS2-L)
*/
const decodeMRS2 = function() {
    let sampleReceivedData = {
        fPort: 15,
        bytes: new Uint8Array([0,22,38,0,0,91,34,36])
    }
    let hexStr = Array.from(sampleReceivedData.bytes, byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join(' ')
    console.log("Decoded data from hex: " + hexStr)
    let decodedData = decodePulseCounterUplink(sampleReceivedData)
    console.log("Total Pulses: " + decodedData.pulseCounts)
    console.log("Rain Sensor Specification: 2mm per pulse")
    console.log("Rain Fall: " + ((decodedData.pulseCounts * 2)/10)+"cm")
    console.log("Battery: " + decodedData.Battery)
}

console.log("==============================================")
decodeMRS2()
console.log("==============================================")
console.log("Change Sampling Time to 3 hours (180 minutes):")
console.log(changeSamplingTime(180))
console.log("==============================================")