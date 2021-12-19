import * as fs from "fs"
import * as path from "path"

const array = fs
    .readFileSync(path.join(__dirname, "../../inputs/day1.txt"))
    .toString()
    .split("\n")
    .map((el) => Number(el))

let amountOfIncrements = 0;
let lastCounted = 0;

array.map((element, index) => {
    if (index >= 3 && element + array[index - 1] + array[index - 2] > array[index - 1] + array[index - 2] + array[index - 3]) {
        amountOfIncrements += 1
    }
})

console.log(amountOfIncrements)