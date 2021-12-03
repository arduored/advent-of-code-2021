// TODO: Find the power consumption of the submarine
const fs = require('fs')

function findGammaRate(input){
    const mostCommon = [] //don't forget to reverse the result to read the binary
    for(const binary of input){
        const bits = binary.split("")
        for(let i = 0; i<bits.length; i++){
            if(mostCommon[i]){
                mostCommon[i][bits[i]]++
            }else{
                mostCommon[i] = parseInt(bits[i]) === 0 ? {"0": 1, "1": 0} : {"0": 0, "1": 1}
            }
        }
    }
    const gammaRate = mostCommon.reduce((acc, current) => { 
        current["0"] > current["1"] ? acc.push("0") : acc.push("1")
        return acc
    }, []).join("")

    return gammaRate;
}

function main(){
    console.log("START");
    const data = fs.readFileSync("./input.txt", 'utf-8').split("\n");
    const gamma = findGammaRate(data);
    const epsilon = gamma.split("").map((bit) => bit === "0" ? "1": "0").join("")
    const powerConsumption = parseInt(gamma, 2) * parseInt(epsilon, 2)
    console.log(`Power consumption = ${powerConsumption}`)
    console.log("END");
}

main()