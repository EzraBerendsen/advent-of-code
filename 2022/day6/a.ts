import * as fs from "fs"
import * as path from "path"

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()

const DISTINCT_CHARACTERS = 4

for (let i = 0; i < input.length; ++i) {
  const seen: string[] = []
  for (let j = i; j < i + DISTINCT_CHARACTERS; j++) {
    if (!seen.find((s) => s === input[j])) {
      seen.push(input[j])
    }
  }

  if (seen.length === 4) {
    console.log("Answer is:\n" + (i + DISTINCT_CHARACTERS))
    break
  }
}
