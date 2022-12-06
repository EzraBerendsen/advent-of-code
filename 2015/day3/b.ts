import fs from "fs"
import path from "path"

type Move = "^" | "v" | "<" | ">"
type Point = {
  x: number
  y: number
}

const chunk = <T extends any[]>(arr: T, chunkSize: number) => {
  const chunkedArray = []
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunkedArray.push(arr.slice(i, i + chunkSize))
  }
  return chunkedArray
}

const updateSantaLocation = (move: Move) => {
  switch (move) {
    case "^":
      santaY += 1
      break
    case "v":
      santaY -= 1
      break
    case "<":
      santaX -= 1
      break
    case ">":
      santaX += 1
      break
  }
}

const updateRobotSantaLocation = (move: Move) => {
  switch (move) {
    case "^":
      roboSantaY += 1
      break
    case "v":
      roboSantaY -= 1
      break
    case "<":
      roboSantaX -= 1
      break
    case ">":
      roboSantaX += 1
      break
  }
}

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .toString()
  .trim()

const deliveries: Point[] = []

let santaX = 0
let roboSantaX = 0
let santaY = 0
let roboSantaY = 0

let visitedHouses = 0

const moves = chunk(input.split(""), 2)

deliveries.push({x: santaX, y: santaY})
visitedHouses += 1

moves.forEach((moveArray) => {
  const santaMove: Move = moveArray[0]
  const roboSantaMove: Move = moveArray[1]

  updateSantaLocation(santaMove)
  updateRobotSantaLocation(roboSantaMove)

  const hasSantaVisited = deliveries.some((d) => d.x === santaX && d.y === santaY)

  if (!hasSantaVisited) {
    visitedHouses += 1
    deliveries.push({ x: santaX, y: santaY })
  }

  const hasRobotSantaVisited = deliveries.some((d) => d.x === roboSantaX && d.y === roboSantaY)

  if (!hasRobotSantaVisited) {
    visitedHouses += 1
    deliveries.push({ x: roboSantaX, y: roboSantaY })
  }
})

console.log(visitedHouses)
