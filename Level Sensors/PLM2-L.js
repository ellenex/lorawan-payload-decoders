import { decodeUplink } from "../coreFunctions/uplink-decoder.cjs"
import {changeSamplingTime} from "../coreFunctions/downlink-encoder.cjs"

/*
*   This section covers how to decode received data for Ellenex Level Sensor - with narrow sensor head (PLM2-L)
*/
const decodePLM2 = function() {
    let sampleReceivedData = {
        fPort: 15,
        bytes: new Uint8Array([0,0,0,0,8,0,0,36])
    }
    let liquidDensity = 1 // Water = 1, Diesel = 0.85 
    let sensorRange = 20 // 20 meters


    console.log("Decoded data from hex: " + sampleReceivedData.bytes.map(x => x.toString(16).padStart(2, '0')).join(''))
    let decodedData = decodeUplink(sampleReceivedData)

    let level = (sensorRange * (decodedData.sensorReading-4000)/16000) / liquidDensity
    console.log("Level: " + level)
    console.log("Battery: " + decodedData.Battery)
}

console.log("==============================================")
decodePLM2()
console.log("==============================================")
console.log("Change Sampling Time to 3 hours (180 minutes):")
console.log(changeSamplingTime(180))
console.log("==============================================")