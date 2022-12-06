import fs from "fs"
import path from "path"

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .toString()
  .trim()
const lines = input.split("\n")

const getSurfaceArea = (length: number, width: number, height: number) => {
  const a = length * width
  const b = width * height
  const c = height * length

  const smallest = Math.min(a, b, c)

  return ((2 * a) + (2 * b) + (2 * c)) + smallest
}

const feet = lines.reduce((acc, line) => {
  const [lengthStr, widthStr, heightStr] = line.split("x")
  const length = parseInt(lengthStr)
  const width = parseInt(widthStr)
  const height = parseInt(heightStr)

  const surfaceArea = getSurfaceArea(length, width, height)

  return acc + surfaceArea
}, 0)

console.log(feet)
