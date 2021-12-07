//TODO: find the life support rating
// by multiplying the oxygen generator rating by the CO2 scrubber rating

const fs = require('fs')
const { findBitsOccurrence } = require("../part-one/binaryDiagnostic1")

function findMostCommonBit(index, data){
    return (data[index]["0"] > data[index]["1"]) ? "0" : "1"
}

function findLeastCommonBit(index, data){
    return (data[index]["0"] > data[index]["1"]) ? "1" : "0"
}

function findRating(index, data, findDiscriminant){
    const bitsOccurrence = findBitsOccurrence(data)
    const discriminant = findDiscriminant(index, bitsOccurrence)
    const findings = data.filter((binary) => binary[index] === discriminant)
    
    return findings.length === 1 ? findings[0] : findRating(++index, findings, findDiscriminant)
}

function main(){
    console.log("START")
    const data=  fs.readFileSync("../input.txt", "utf-8").split("\n")
    oxygen = findRating(0, data, findMostCommonBit)
    co2 = findRating(0, data, findLeastCommonBit)
    console.log(`The life support rating in the submarine is : ${parseInt(oxygen, 2) * parseInt(co2, 2)}`)
    console.log("END")
}

main()