import * as fs from "fs"
import * as path from "path"

const array = fs
    .readFileSync(path.join(__dirname, "../../inputs/day3.txt"))
    .toString()
    .split("\n")
