function decodeUplink(input) {
    if(input.fPort != 15) {
        return {
            errors: ['Invalid FPort: Please use FPort 15']
        }
    } else if(input.bytes.length != 8) {
        errors: ['Invalid payload. Paylod must be 8 bytes']
    } else {
        let output = {
            sensorReading: readHex2bytes(input.bytes[3], input.bytes[4]),
            temperatureReading: readHex2bytes(input.bytes[5], input.bytes[6]),
            Battery: (input.bytes[7] * 0.1).toFixed(1)
        }
        return output
    }
}

function decodePulseCounterUplink(input) {
    if(input.fPort != 15) {
        return {
            errors: ['Invalid FPort: Please use FPort 15']
        }
    } else if(input.bytes.length != 8) {
        errors: ['Invalid payload. Paylod must be 8 bytes']
    } else {

        let output = {
            sensorReading: getDecimalValue(input.bytes[1], input.bytes[2]),
            pulseCounts: getDecimalValue(input.bytes[3], input.bytes[4], input.bytes[5], input.bytes[6]),
            Battery: (input.bytes[7] * 0.1).toFixed(1)
        }
        return output
    }
}

/*
    Leaving this in for legacy reasons
*/
function readHex2bytes(byte1, byte2) {
    let result = (byte1 << 8) | byte2;
    let negative = byte1 & 0x80;
    if (negative) {
      result = result - 0x10000;
    }
    return result;
}

function getDecimalValue(...byteArray) {
    byteArray.reverse()
    var num = 0;
    for (var i = 0; i < byteArray.length; i++) {
        num += byteArray[i] * Math.pow(256, i);
    }
    if (num > 0x7FFFFFFF) {
        num -= 0x100000000;
    }

return num;
}

module.exports = {
    decodeUplink, decodePulseCounterUplink
}