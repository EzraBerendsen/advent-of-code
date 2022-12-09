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

function movePoint(point: Point, direction: Direction) {
  const STEP_COUNT = 1

  switch (direction) {
    case "L":
      point.x -= STEP_COUNT
      break
    case "U":
      point.y += STEP_COUNT
      break
    case "R":
      point.x += STEP_COUNT
      break
    case "D":
      point.y -= STEP_COUNT
      break
  }
}

function movePointDiagonally(
  point: Point,
  differenceX: number,
  differenceY: number
) {
  if (differenceX >= 1) {
    point.x += 1
  }
  if (differenceX <= -1) {
    point.x -= 1
  }
  if (differenceY >= 1) {
    point.y += 1
  }
  if (differenceY <= -1) {
    point.y -= 1
  }
}

function calculatePositionAndMove(head: Point, current: Point) {
  const pointDistance = Math.max(
    Math.abs(current.x - head.x),
    Math.abs(current.y - head.y)
  )
  if (pointDistance > 1) {
    const directionX = head.x - current.x
    const directionY = head.y - current.y

    current.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX
    current.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY
  }
}

const positions: Point[] = Array.from({ length: 10 }).map((_) => ({
  x: 0,
  y: 0,
}))

const headPosition: Point = positions[0]
const tailPosition: Point = positions[positions.length - 1]

const uniqueTailPositions: Point[] = [{ x: 0, y: 0 }]

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .trim()

const lines = input.split("\n")

lines.forEach((line) => {
  const [direction, steps] = parseLine(line as Line)

  for (let i = 0; i < steps; i++) {
    movePoint(headPosition, direction)

    for (let j = 1; j < positions.length - 1; ++j) {
      const head = positions[j - 1]
      const current = positions[j]

      calculatePositionAndMove(head, current)
    }

    const penultimatePosition = positions[positions.length - 2]
    calculatePositionAndMove(penultimatePosition, tailPosition)

    const position = { ...tailPosition }

    const isUniqueTailPosition = uniqueTailPositions.find(
      (p) => p.x === position.x && p.y === position.y
    )

    if (!isUniqueTailPosition) {
      // Make copy, because otherwise we directly update the reference.
      uniqueTailPositions.push(position)
    }
  }
})

console.log("\n\nAnswer")
console.log(uniqueTailPositions.length)
