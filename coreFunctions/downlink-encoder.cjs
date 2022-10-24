function changeSamplingTime(mins) {
    return "Hex: 1001"+mins.toString(16).padStart(4,'0').toUpperCase()
}


module.exports = {
    changeSamplingTime
}