import { decodeUplink } from "../coreFunctions/uplink-decoder.cjs"
import {changeSamplingTime} from "../coreFunctions/downlink-encoder.cjs"

/*
*   This section covers how to decode received data for Ellenex Level Sensor - with Built in temperature sensor (PLD2-L)
*/
const decodePLD2 = function() {
    let sampleReceivedData = {
        fPort: 15,
        bytes: new Uint8Array([0,0,0,0,8,8,0,36])
    }
    let liquidDensity = 1 // Water = 1, Diesel = 0.85 
    let sensorRange = 20
    console.log("Decoded data from hex: " + sampleReceivedData.bytes.map(x => x.toString(16).padStart(2, '0')).join(''))
    let decodedData = decodeUplink(sampleReceivedData)
    
    /*
        Level calculation varies depending upon the type of your sensor. You will receive information about the type along with the EUI of the sensor.
    */
    
    let levelCalculationTypeOne = ((decodedData.sensorReading - 1638.3)*sensorRange)/13106.4
    let levelCalculationTypeTwo = decodedData.sensorReading / liquidDensity

    console.log("Level: " + ( levelCalculationTypeTwo / liquidDensity))
    console.log("Temperature: "+decodedData.temperatureReading)
    console.log("Battery: " + decodedData.Battery)
}

console.log("==============================================")
decodePLD2()
console.log("==============================================")
console.log("Change Sampling Time to 3 hours (180 minutes):")
console.log(changeSamplingTime(180))
console.log("==============================================")