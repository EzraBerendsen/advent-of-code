import fs from "fs"
import path from "path"

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .trim()

const treeMatrix = input.split("\n").map((line) => {
  return line.split("").map((t) => parseInt(t, 10))
})

const treeScenicScores = []

for (let rows = 0; rows < treeMatrix.length; ++rows) {
  for (let columns = 0; columns < treeMatrix[rows].length; ++columns) {
    treeScenicScores.push(
      [
        getScenicScoreLeftTrees(rows, columns),
        getScenicScoreTopTrees(rows, columns),
        getScenicScoreBottomTrees(rows, columns),
        getScenicScoreRightTrees(rows, columns),
      ].reduce((acc, curr) => acc * curr, 1)
    )
  }
}

function getScenicScoreTopTrees(row: number, column: number) {
  const tree = treeMatrix[row][column]

  let totalDistance = 0

  for (let x = row - 1; x >= 0; --x) {
    totalDistance += 1

    const comparingTree = treeMatrix[x][column]
    if (tree <= comparingTree) {
      return totalDistance
    }
  }

  return totalDistance
}

function getScenicScoreBottomTrees(row: number, column: number) {
  const tree = treeMatrix[row][column]

  let totalDistance = 0

  for (let x = row + 1; x < treeMatrix[row].length; ++x) {
    totalDistance += 1

    const comparingTree = treeMatrix[x][column]
    if (tree <= comparingTree) {
      return totalDistance
    }
  }

  return totalDistance
}

function getScenicScoreLeftTrees(row: number, column: number) {
  const tree = treeMatrix[row][column]

  let totalDistance = 0

  for (let y = column - 1; y >= 0; --y) {
    totalDistance += 1

    const comparingTree = treeMatrix[row][y]
    if (tree <= comparingTree) {
      return totalDistance
    }
  }

  return totalDistance
}

function getScenicScoreRightTrees(row: number, column: number) {
  const tree = treeMatrix[row][column]

  let totalDistance = 0

  for (let y = column + 1; y < treeMatrix.length; ++y) {
    totalDistance += 1

    const comparingTree = treeMatrix[row][y]
    if (tree <= comparingTree) {
      return totalDistance
    }
  }

  return totalDistance
}

console.log("Answer:")
console.log(Math.max(...treeScenicScores))
