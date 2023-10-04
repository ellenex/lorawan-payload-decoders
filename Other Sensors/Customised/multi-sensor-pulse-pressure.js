import { decodePulseCounterUplink } from "../../coreFunctions/uplink-decoder.cjs"
import {changeSamplingTime} from "../../coreFunctions/downlink-encoder.cjs"

/*
*   This section covers how to decode received data for Ellenex Customised Multi Sensor Device with Pulse and Pressure Output
*/
const decodeData = function(receivedData) {
    let hexStr = Array.from(receivedData.bytes, byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join(' ')
    console.log("Decoded data from hex: " + hexStr)
    let decodedData = decodePulseCounterUplink(receivedData)
    console.log("Total Pulses: " + decodedData.pulseCounts)
    console.log("Flow Switch Spec: 2L per pulse")
    console.log("Total Flow: " + ((decodedData.pulseCounts * 2))+"L")
    console.log("Pressure Reading: " + decodedData.sensorReading)
    console.log("Battery: " + decodedData.Battery + "V")
}

// 80 00 15 00 00 00 13 22  
// 80 16 26 00 00 5b 22 24
let sampleReceivedData = [{
    fPort: 15,
    bytes: new Uint8Array([128, 0, 21, 0, 0, 0, 19, 34])
},{
    fPort: 15,
    bytes: new Uint8Array([128, 22, 38, 0, 0, 91, 34, 36])
}]
sampleReceivedData.forEach((receivedData) => {
    console.log("==============================================")
    decodeData(receivedData)
})

console.log("==============================================")
console.log("Change Sampling Time to 3 hours (180 minutes):")
console.log(changeSamplingTime(180))
console.log("==============================================")
