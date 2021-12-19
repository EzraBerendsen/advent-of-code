import * as fs from "fs"
import * as path from "path"

const array = fs
    .readFileSync(path.join(__dirname, "../../inputs/day2.txt"))
    .toString()
    .split("\n")

let horizontalPosition = 0
let depth = 0

array.map((element) => {
    const commandsX = element.split(' ')

    const command = commandsX[0]
    const x = Number(commandsX[1])

    if (command === "forward") {
        horizontalPosition += x
    } else if (command === "down") {
        depth += x
    } else {
        depth -= x
    }
})

console.log(horizontalPosition * depth)
