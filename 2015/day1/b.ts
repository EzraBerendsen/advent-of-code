import * as fs from "fs"
import path from "path"

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf-8')
  .toString()

const parentheses = input.split('')

let parenthesesCount = 0
let level = 0
for (const p of parentheses) {
  parenthesesCount += 1
  if (p === "(") {
    level += 1
  } else {
    level -= 1
  }

  if (level === -1) {
    console.log(parenthesesCount);
    break;
  }
}

