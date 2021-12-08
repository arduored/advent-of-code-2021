//TODO: Find the last board the win the bingo game

const fs = require('fs')
const {
    getBoards,
    checkNumOnBoard,
    hasBingo, 
    calculateScore
} = require("../part-one/giantSquid1")

function playRiggedBingo(draw, boards){
    let bingoOrder = new Set()
    let lastWinner = null
    for(const num of draw.split(",")){
        boards = checkNumOnBoard(num, boards)
        const winningBoard = hasBingo(boards)
        if(!bingoOrder.has(winningBoard)){
            bingoOrder.add(winningBoard)
            lastWinner = {board: boards[winningBoard], draw: num}
        }
        if(bingoOrder.length === boards.length){
            break
        }
    }
    return calculateScore(lastWinner.board, lastWinner.draw)
}

function main(){
    console.log("START")
    const [draw, ...boardsData] = fs.readFileSync("../testInput.txt", "utf-8").split("\n").filter((entry) => entry !== "")
    const boards = getBoards(boardsData)
    const score = playRiggedBingo(draw, boards)
    console.log(`The last board to have bingo has a score of: ${score}`)
    console.log("END")
}

main()