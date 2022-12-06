import fs from "fs"
import path from "path"

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .toString()
  .trim()
const lines = input.split("\n")

const getTotalRibbon = (length: number, width: number, height: number) => {
  const wrap = 2 * Math.min(width + length, width + height, length + height)
  const bow = length * width * height

  return wrap + bow
}

const feet = lines.reduce((acc, line) => {
  const [lengthStr, widthStr, heightStr] = line.split("x")
  const length = parseInt(lengthStr)
  const width = parseInt(widthStr)
  const height = parseInt(heightStr)

  const totalRibbon = getTotalRibbon(length, width, height)

  return acc + totalRibbon
}, 0)

console.log(feet)
