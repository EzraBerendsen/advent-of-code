import * as fs from "fs"
import * as path from "path"

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n")

// remove 'cd /' command since it's not necessary to keep into account
lines.shift()

const MAX_TOTAL_SIZE = 100_000

let currentDir = "/"
let level = 0

const tree: any = { "/": [] }

lines.forEach((line, index) => {
  const firstChar = line[0]

  if (firstChar === "$") {
    const [_, command, destination] = line.split(" ")

    if (command === "cd") {
      if (destination === "..") {
        const split = currentDir.split("/")
        split.pop()
        currentDir = split.join("/")

        level -= 1
      } else {
        level += 1
        currentDir += `/${destination}`
      }
    } else {
      if (currentDir.startsWith("//")) {
        const split = currentDir.split("")
        split.shift()
        currentDir = split.join("")
      }

      if (tree[currentDir]) {
        tree[currentDir].push(...getAllFiles(index))
      } else {
        tree[currentDir] = getAllFiles(index)
      }
    }
  } else {
    tree[currentDir].push(line)
  }
})

function countSize(dir: any) {
  let size = 0

  tree[dir]?.forEach((file: any) => {
    const info = file.split(" ")

    if (info[0].startsWith("dir")) {
      size += countSize(`${dir}${dir === "/" ? "" : "/"}${info[1]}`)
    } else {
      const fileSize = parseInt(info[0], 10)
      if (!isNaN(fileSize)) {
        size += fileSize
      }
    }
  })

  tree[dir].push({ size })

  return size
}

function getAllFiles(index: number) {
  const arr: any[] = []

  let i = index
  while (lines[i][0] !== "$" && i < lines.length) {
    const lineInfo = lines[i].split(" ")

    arr.push(lineInfo)

    ++i
  }

  return arr
}

countSize("/")

let totalDirectoriesSize = 0
Object.values(tree).forEach((dir: any) => {
  dir.map((entry: any) => {
    if (typeof entry === "object") {
      const dirSize = entry.size

      if (dirSize <= MAX_TOTAL_SIZE) {
        totalDirectoriesSize += dirSize
      }
    }
  })
})

console.log("Answer:\n" + totalDirectoriesSize)
