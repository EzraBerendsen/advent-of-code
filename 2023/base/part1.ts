import fs from "fs";

fs.readFileSync("test.txt")
    .toString()
    .trim()
    .split('\n')
    .forEach((line, index) => {
    })

