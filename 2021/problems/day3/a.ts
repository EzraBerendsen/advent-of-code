import * as fs from "fs"
import * as path from "path"

const array = fs
    .readFileSync(path.join(__dirname, "../../inputs/day3.txt"))
    .toString()
    .split("\n")

const positiveIntegers: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
const negativeIntegers: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

array.map((element) => {
    element
        .split("")
        .map((char, index) => {
            if (char === "0") {
                negativeIntegers[index] += 1
            } else {
                positiveIntegers[index] += 1
            }
        })
})

let most: number|string = ""
let least: number|string = ""
positiveIntegers.map((integer, index) => {
    if (positiveIntegers[index] > negativeIntegers[index]) {
        most += "1"
        least += "0"
    } else {
        most += "0"
        least += "1"
    }
})

most = parseInt(most, 2)
least = parseInt(least, 2)

console.log(most * least)