import { decodeUplink } from "../coreFunctions/uplink-decoder.cjs"
import {changeSamplingTime} from "../coreFunctions/downlink-encoder.cjs"

/*
*   This section covers how to decode received data for Ellenex Level Sensor - with corrosive resistance (PLC2-L)
*/
const decodePLC2 = function() {
    let sampleReceivedData = {
        fPort: 15,
        bytes: new Uint8Array([0,0,0,0,8,0,0,36])
    }
    let liquidDensity = 1 // Water = 1, Diesel = 0.85 
    let sensorRange = 20 // 20 meters
    const k = 0.01907
    const m = 0.007
    const b = -0.35

    console.log("Decoded data from hex: " + sampleReceivedData.bytes.map(x => x.toString(16).padStart(2, '0')).join(''))
    let decodedData = decodeUplink(sampleReceivedData)

    /*
        Level calculation varies depending upon the type of your sensor. You will receive information about the type along with the EUI of the sensor.
    */
    let L1 = ((decodedData.temperatureReading - 1638.3) * sensorRange) / 13106.4
    let L2 = (k * decodedData.sensorReading * m) + b
    
    let levelCalculationTypeOne = (L1 - (L2*10)) / liquidDensity
    let levelCalculationTypeTwo = (sensorRange * (decodedData.sensorReading-4000)/16000) / liquidDensity
    let levelCalculationTypeThree = (decodedData.sensorReading / liquidDensity)

    console.log("Level: " + levelCalculationTypeThree)

    console.log("Battery: " + decodedData.Battery)
}

console.log("==============================================")
decodePLC2()
console.log("==============================================")
console.log("Change Sampling Time to 3 hours (180 minutes):")
console.log(changeSamplingTime(180))
console.log("==============================================")