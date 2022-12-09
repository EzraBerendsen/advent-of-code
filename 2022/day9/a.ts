import fs from "fs"
import path from "path"

type Point = {
  x: number
  y: number
}

type Direction = "L" | "U" | "R" | "D"

type Line = `${Direction} ${number}`

function parseLine(line: Line): [Direction, number] {
  const split = line.split(" ")
  const direction = split[0] as Direction
  const steps = parseInt(split[1], 10)

  return [direction, steps]
}

function updatePosition(point: Point, direction: Direction, step: number) {
  switch (direction) {
    case "L":
      point.x -= step
      break
    case "U":
      point.y += step
      break
    case "R":
      point.x += step
      break
    case "D":
      point.y -= step
      break
  }
}

const uniqueTailPositions: Point[] = [
  { x: 0, y: 0 }
]

const headPosition: Point = { x: 0, y: 0 }
const tailPosition: Point = { x: 0, y: 0 }

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .trim()

const lines = input.split("\n")

lines.forEach((line) => {
  const [direction, steps] = parseLine(line as Line)

  for (let i = 1; i <= steps; i++) {
    updatePosition(headPosition, direction, 1)

    const [currentHeadX, currentHeadY] = [headPosition.x, headPosition.y]
    const [currentTailX, currentTailY] = [tailPosition.x, tailPosition.y]

    const differenceX = currentHeadX - currentTailX
    const differenceY = currentHeadY - currentTailY

    const absDifferenceX = Math.abs(differenceX)
    const absDifferenceY = Math.abs(differenceY)

    const isTouchingDiagonally = absDifferenceY === 1 && absDifferenceX === 1

    const inSameRowOrColumn = (currentHeadX === currentTailX) || (currentHeadY === currentTailY)

    if ((absDifferenceX > 1 || absDifferenceY > 1) && inSameRowOrColumn) {
      updatePosition(tailPosition, direction, 1)
    }
    if (!inSameRowOrColumn && !isTouchingDiagonally) {
      if (differenceY >= 1) {
        tailPosition.y += 1
      }
      if (differenceY <= -1) {
        tailPosition.y -= 1
      }
      if (differenceX >= 1) {
        tailPosition.x += 1
      }
      if (differenceX <= -1) {
        tailPosition.x -= 1
      }
    }

    if (!uniqueTailPositions.find((p) => p.x === tailPosition.x && p.y === tailPosition.y)) {
      // Make copy, because otherwise we directly update the reference.
      const position = { ...tailPosition }
      uniqueTailPositions.push(position)
    }
  }
})

console.log("\n\nAnswer")
console.log(uniqueTailPositions.length)
