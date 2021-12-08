//TODO: Win a game of bingo

const fs = require("fs")

function getBoards(data){
    const boards = []
    const numberOfBoard = data.length / 5
    for(let i=0; i<numberOfBoard; i++){
        const rawBoard = data
            .splice(0, 5)
            .map((row) => row.split(" ")
            .filter((entry) => entry !== ""))
        boards.push(rawBoard)
    }
    return boards
}

function checkNumOnBoard(num, boards){
    for(const board of boards){
        board.forEach((row) => {
            const index = row.findIndex((cell) => {
                return cell === num
            })
            if(index > -1){
                row[index] = true
            }
        })
    }
    return boards
}

function hasBingo(boards){
    let winningBoard = null
    
    for(const [index, board] of boards.entries()){
        for(let i=0; i < board.length; i++){
            const hasWinningRow = board[i].every((cell) => cell === true)
            if(hasWinningRow){
            winningBoard = index
            break
            }

            const hasWinningCol = board.every((row) => row[i] === true)
            if(hasWinningCol){
                winningBoard = index
                break
            }
        }

        if(winningBoard){
            break
        }
    }
    return winningBoard
}

function calculateScore(board, lastDraw){
    let sum = 0
    console.log(board)
    for(const row of board){
        row.forEach((cell) => {
            if(typeof cell === "string"){
                sum += parseInt(cell, 10)
            }
        })
    }
    return sum * parseInt(lastDraw)
}

function playBingo(draw, boards){
    let score = 0
    for(let num of draw.split(",")){
        boards = checkNumOnBoard(num, boards)
        const winningBoard = hasBingo(boards)
        if(winningBoard){
            score = calculateScore(boards[winningBoard], num)
            break
        }
    }
    return score
}

function main(){
    console.log("START")
    const [draw, ...boardsData] = fs.readFileSync("../input.txt", "utf-8").split("\n").filter((entry) => entry !== "")
    const boards = getBoards(boardsData)
    const score = playBingo(draw, boards)
    console.log(`BINGO! The score is: ${score}`)
    console.log("END")
}


module.exports = {
    getBoards,
    checkNumOnBoard,
    hasBingo,
    calculateScore
}

// main()