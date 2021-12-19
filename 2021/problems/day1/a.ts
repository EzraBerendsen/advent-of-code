import * as fs from "fs"
import * as path from "path"

const array = fs
    .readFileSync(path.join(__dirname, "../../inputs/day1.txt"))
    .toString()
    .split("\n")
    .map((el) => Number(el))

let amountOfIncrements = 0;

array.map((element, index) => {
    if (array[index + 1] != null && array[index + 1] > element) {
        amountOfIncrements += 1;
    }
})

console.log(amountOfIncrements)