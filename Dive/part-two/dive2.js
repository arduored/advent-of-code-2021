// TODO: multiply final horizontal positioh by depth with new variable: aim

const fs = require('fs')

function getFinalPosition(commands){
    const arrival = {aim: 0, horizontal: 0, depth: 0}

    for(const command of commands){
        const [direction, value] = command.split(' ')
        const numericValue = parseInt(value)
        switch(direction){
            case "forward":
                arrival.horizontal += numericValue;
                arrival.depth += numericValue * arrival.aim;
                break;
            case "up":
                arrival.aim -= numericValue;
                break;
            case "down":
                arrival.aim += numericValue;
                break;
        }
    }
    return arrival

}

function main() {
    console.log("START")
    const commands = fs.readFileSync("../input.txt", "utf-8").split("\n")
    const arrival = getFinalPosition(commands);
    console.log(`Horizontal x Depth = ${arrival.horizontal * arrival.depth}`)
    console.log("END")
}

main()