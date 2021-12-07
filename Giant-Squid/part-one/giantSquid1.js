//TODO: Win a game of bingo

const fs = require("fs")

function getBoards(data){
    const boards = []
    const filtered = data.filter((entry) => entry !== "")
    const numberOfBoard = filtered.length / 5
    for(let i=0; i<numberOfBoard; i++){
        const rawBoard = filtered
            .splice(0, 5)
            .map((row) => row.split(" ")
            .filter((entry) => entry !== ""))
        console.log(rawBoard)
    }
    return boards
}

function main(){
    const [draw, ...boardsData] = fs.readFileSync("../testInput.txt", "utf-8").split("\n")
    const boards = getBoards(boardsData)
}

main()