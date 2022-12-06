import fs from "fs"
import path from "path"

type Point = {
  x: number
  y: number
}

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .toString()
  .trim()

const deliveries: Point[] = []

let x = 0
let y = 0

let visitedHouses = 0

input
  .split("")
  .forEach((move) => {
    switch (move) {
      case "^":
        y += 1
        break
      case "v":
        y -= 1
        break
      case ">":
        x += 1
        break
      case "<":
        x -= 1
        break
    }

    if (!deliveries.find((delivery) => delivery.x === x && delivery.y === y)) {
      visitedHouses += 1
    }

    deliveries.push({ x, y })
  })

console.log(visitedHouses)
