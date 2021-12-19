import * as fs from "fs"
import * as path from "path"

const array = fs
    .readFileSync(path.join(__dirname, "../../inputs/day1.txt"))
    .toString()
    .split("\n")
    .map((n) => Number(n))

function threeSum(array: number[]) {
    const target = 2020

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            for (let k = 0; k < array.length; k++) {
                if (array[i] + array[j] + array[k] == target) {
                    return [array[i], array[j], array[k]]
                }
            }
        }
    }

    return []
}

console.log(
    threeSum(array)
        .reduce((el, acc) => el * acc, 1),
)