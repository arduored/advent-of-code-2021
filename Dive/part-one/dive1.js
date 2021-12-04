// TODO: Get the final horizontal position and depth 
// then multiply it and submit the result

const fs = require('fs')

function getFinalPosition(commands){
    let arrival = { horizontal: 0, depth: 0};

    for(const command of commands){
        const [direction, value] = command.split(' ')
        const numericValue = parseInt(value)
        switch(direction){
            case "forward":
                arrival.horizontal += numericValue;
                break;
            case "up":
                arrival.depth -= numericValue;
                break;
            case "down":
                arrival.depth += numericValue;
                break;
        }
    }
    return arrival
}

function main(){
    console.log("START")
    const data = fs.readFileSync("../input.txt", "utf-8");
    const commands = data.split("\n");
    const arrival = getFinalPosition(commands);

    console.log(`Horizontal x Depth = ${arrival.horizontal * arrival.depth}`)
    console.log("END")
}

main()