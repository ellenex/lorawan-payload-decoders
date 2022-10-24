import { decodeUplink } from "../coreFunctions/uplink-decoder.cjs"
import {changeSamplingTime} from "../coreFunctions/downlink-encoder.cjs"

/*
*   This section covers how to decode received data for Ellenex Corrosive Resistant Distance and Level Sensor with IP68 rating (DUC3-L)
*/
const decodeDUC3 = function() {
    let sampleReceivedData = {
        fPort: 15,
        bytes: new Uint8Array([0,0,0,0,8,7,0,36])
    }
    let tankHeightInCm = 500
    console.log("Decoded data from hex: " + sampleReceivedData.bytes.map(x => x.toString(16).padStart(2, '0')).join(''))
    let decodedData = decodeUplink(sampleReceivedData)
    console.log("Distance: " + decodedData.sensorReading)
    console.log("Level: " + (tankHeightInCm - decodedData.sensorReading))
    console.log("Battery: " + decodedData.Battery)
}

console.log("==============================================")
decodeDUC3()
console.log("==============================================")
console.log("Change Sampling Time to 3 hours (180 minutes):")
console.log(changeSamplingTime(180))
console.log("==============================================")