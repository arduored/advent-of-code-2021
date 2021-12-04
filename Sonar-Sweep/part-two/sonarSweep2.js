// TODO: count the number of times the sum of measurements in the sliding window increases.

const fs = require('fs')
const { countIncreases } = require("../part-one/sonarSweep1")

function getMeasurement(data) {
    const formattedData = []

    for(let i=0; i<data.length; i++){
        const threeMeasurement = data.slice(i, i+3)
        if(threeMeasurement.length < 3){
            continue
        }
        const measurement = threeMeasurement.reduce((res, current) => res += parseInt(current), 0)
        formattedData.push(measurement)
    }
    
    const sum = countIncreases(formattedData)

    return sum
}

function main() {
    console.log("START")
    const data = fs.readFileSync("../input.txt", "utf-8").split('\n')
    const res = getMeasurement(data)
    console.log(`There are ${res} sums greater than the previous measurement.`)
    console.log("END")
}

main()