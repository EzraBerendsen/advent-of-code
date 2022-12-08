import fs from "fs"
import path from "path"

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .trim()

const treeMatrix = input.split("\n").map((line) => {
  return line.split("").map((t) => parseInt(t, 10))
})

const visibleTrees = []

for (let rows = 0; rows < treeMatrix.length; ++rows) {
  for (let columns = 0; columns < treeMatrix[rows].length; ++columns) {
    const tree = treeMatrix[rows][columns]

    const isVisible = [
      getIsTreeVisibleFromLeft(rows, columns),
      getIsTreeVisibleFromRight(rows, columns),
      getIsTreeVisibleFromTop(rows, columns),
      getIsTreeVisibleFromBottom(rows, columns),
    ].some((visibleTree) => visibleTree)

    if (isVisible) {
      visibleTrees.push(tree)
    }
  }
}

function getIsTreeVisibleFromLeft(row: number, column: number) {
  const tree = treeMatrix[row][column]

  for (let x = row - 1; x >= 0; --x) {
    const comparingTree = treeMatrix[x][column]
    if (tree <= comparingTree) {
      return false
    }
  }

  return true
}

function getIsTreeVisibleFromRight(row: number, column: number) {
  const tree = treeMatrix[row][column]

  for (let x = row + 1; x < treeMatrix[row].length; ++x) {
    const comparingTree = treeMatrix[x][column]
    if (tree <= comparingTree) {
      return false
    }
  }

  return true
}

function getIsTreeVisibleFromTop(row: number, column: number) {
  const tree = treeMatrix[row][column]

  for (let y = column - 1; y >= 0; --y) {
    const comparingTree = treeMatrix[row][y]
    if (tree <= comparingTree) {
      return false
    }
  }

  return true
}

function getIsTreeVisibleFromBottom(row: number, column: number) {
  const tree = treeMatrix[row][column]

  for (let y = column + 1; y < treeMatrix.length; ++y) {
    const comparingTree = treeMatrix[row][y]
    if (tree <= comparingTree) {
      return false
    }
  }

  return true
}

// all the way to the left
// all the way to the top
// all the way to the right
// all the way to the bottom
// if at any point we find visible we push

// function isSmallestTreeLeftSide(index) {}

console.log("Answer:")
console.log(visibleTrees.length)
