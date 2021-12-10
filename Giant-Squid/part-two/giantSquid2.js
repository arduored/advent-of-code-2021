//TODO: Find the last board the win the bingo game

const fs = require('fs')
const {
    getBoards,
    playBingo
} = require("../part-one/giantSquid1")


function main(){
    console.log("START")
    const [draw, ...boardsData] = fs.readFileSync("../input.txt", "utf-8").split("\n").filter((entry) => entry !== "")
    const boards = getBoards(boardsData)
    const game = playBingo(draw, boards)
    const riggedGame = game.sort((a, b) => {
        if(a.order > b.order) return -1
        if(a.order < b.order) return 1
        return0
    })

    const score = riggedGame[0].score
    console.log(`The last board to have bingo has a score of: ${score}`)
    console.log("END")
}

main()