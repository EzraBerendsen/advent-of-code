import * as fs from "fs"
import path from "path"

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf-8')
  .toString()

const parentheses = input.split('')

const result = parentheses.reduce((acc, curr) => {
  if (curr === "(") {
    return acc + 1
  }
  return acc - 1
}, 0)

console.log(result);
