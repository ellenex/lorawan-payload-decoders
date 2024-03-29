import { decodeUplink } from "../coreFunctions/uplink-decoder.cjs"
import {changeSamplingTime} from "../coreFunctions/downlink-encoder.cjs"

/*
*   This section covers how to decode received data for Ellenex pH Sensor (CPH2-L)
*/
const decodeCPH2 = function() {
    let sampleReceivedData = {
        fPort: 15,
        bytes: new Uint8Array([0,0,0,0,8,7,0,36])
    }
    let hexStr = Array.from(sampleReceivedData.bytes, byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join(' ')
    console.log("Decoded data from hex: " + hexStr)
    let decodedData = decodeUplink(sampleReceivedData)
    console.log("pH: " + decodedData.sensorReading)
    console.log("Temperature: " + decodedData.temperatureReading)
    console.log("Battery: " + decodedData.Battery)
}

console.log("==============================================")
decodeCPH2()
console.log("==============================================")
console.log("Change Sampling Time to 3 hours (180 minutes):")
console.log(changeSamplingTime(180))
console.log("==============================================")