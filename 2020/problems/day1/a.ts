import * as fs from "fs"
import * as path from "path"

const array = fs
    .readFileSync(path.join(__dirname, "../../inputs/day1.txt"))
    .toString()
    .split("\n")
    .map((n) => Number(n))

function twoSum(array: number[]) {
    const target = 2020
    const hash: Record<string, number> = {}

    for (let i = 0; i < array.length; i++) {
        const number = array[i]
        if (hash[target - number] != null) {
            return [target - number, number]
        }
        hash[number] = i
    }

    return []
}

console.log(
    twoSum(array)
        .reduce((el, acc) => el * acc, 1),
)