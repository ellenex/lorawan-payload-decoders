import { decodeUplink } from "../coreFunctions/uplink-decoder.cjs"
import {changeSamplingTime} from "../coreFunctions/downlink-encoder.cjs"

/*
*   This section covers how to decode received data for Single Channel Sensor Interface (RS1-L)
*/
const decodeRS1 = function() {
    let sampleReceivedData = {
        fPort: 15,
        bytes: new Uint8Array([0,0,0,0,8,7,0,36])
    }
    let hexStr = Array.from(sampleReceivedData.bytes, byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join(' ')
    console.log("Decoded data from hex: " + hexStr)
    let decodedData = decodeUplink(sampleReceivedData)
    console.log("Sensor Reading: " + decodedData.sensorReading)
    console.log("Temperature: " + decodedData.temperatureReading)
    console.log("Battery: " + decodedData.Battery)
}

console.log("==============================================")
decodeRS1()
console.log("==============================================")
console.log("Change Sampling Time to 3 hours (180 minutes):")
console.log(changeSamplingTime(180))
console.log("==============================================")