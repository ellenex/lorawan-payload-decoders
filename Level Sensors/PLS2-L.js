import { decodeUplink } from "../coreFunctions/uplink-decoder.cjs"
import {changeSamplingTime} from "../coreFunctions/downlink-encoder.cjs"

/*
*   This section covers how to decode received data for Ellenex Level Sensor - Standard Model (PLS2-L)
*/
const decodePLS2 = function() {
    let sampleReceivedData = {
        fPort: 15,
        bytes: new Uint8Array([0,0,0,0,8,0,0,36])
    }
    let liquidDensity = 1 // Water = 1, Diesel = 0.85 
    console.log("Decoded data from hex: " + sampleReceivedData.bytes.map(x => x.toString(16).padStart(2, '0')).join(''))
    let decodedData = decodeUplink(sampleReceivedData)
    console.log("Level: " + (decodedData.sensorReading / liquidDensity))
    console.log("Battery: " + decodedData.Battery)
}

console.log("==============================================")
decodePLS2()
console.log("==============================================")
console.log("Change Sampling Time to 3 hours (180 minutes):")
console.log(changeSamplingTime(180))
console.log("==============================================")