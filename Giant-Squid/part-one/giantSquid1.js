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

function checkNumOnBoard(num, board){
    board.forEach((row) => {
        const index = row.findIndex((cell) => {
            return cell === num
        })
        if(index > -1){
            row[index] = true
        }
    })
    return board
}

function hasBingo(board){
    for(let i=0; i < board.length; i++){
        const hasWinningRow = board[i].every((cell) => cell === true)
        if(hasWinningRow){
            return true
        }

        const hasWinningCol = board.every((row) => row[i] === true)
        if(hasWinningCol){
            return true
        }
    }
    return false
}

function calculateScore(boardItem){
    let sum = 0
    for(const row of boardItem.board){
        row.forEach((cell) => {
            if(typeof cell === "string"){
                sum += parseInt(cell, 10)
            }
        })
    }
    return sum * boardItem.draw
}

function playBingo(draw, boards){
    const game = boards.reduce((acc, curr) => {
        return acc.concat([
            {bingo: false, board: curr, score: 0, draw: 0,  order: 0}])
    }, [])
    let bingoOrder = 0

    for(let num of draw.split(",")){
        game.forEach((item) => {
            if(!item.bingo){
                item.board = checkNumOnBoard(num, item.board)
                item.bingo = hasBingo(item.board)
                if(item.bingo){
                    bingoOrder++
                    item.order = bingoOrder
                    item.draw = parseInt(num)
                    item.score = calculateScore(item)
                }
            }
        })
    }

    return game
}

function main(){
    console.log("START")
    const [draw, ...boardsData] = fs.readFileSync("../input.txt", "utf-8").split("\n").filter((entry) => entry !== "")
    const boards = getBoards(boardsData)
    const game = playBingo(draw, boards)
    const score = game.find((item) => item.bingo && item.order === 1).score
    console.log(`BINGO! The score is: ${score}`)
    console.log("END")
}


module.exports = {
    getBoards,
    playBingo,
}

main()