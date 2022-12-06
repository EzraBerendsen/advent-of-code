import * as fs from "fs"
import * as path from "path"

const input = fs
    .readFileSync(path.join(__dirname, "input.txt"))
    .toString()

const DISTINCT_CHARACTERS = 14

for (let i = 0; i < input.length; ++i) {
    const seen: string[] = []
    for (let j = i; j < i + DISTINCT_CHARACTERS; j++) {
        if (input[j] !== undefined) {
            if (!seen.find((s) => s === input[j])) {
                seen.push(input[j])
            }
        }
    }
    if (seen.length === DISTINCT_CHARACTERS) {
        console.log("Answer is:\n" + (i + DISTINCT_CHARACTERS))
        break
    }
}
