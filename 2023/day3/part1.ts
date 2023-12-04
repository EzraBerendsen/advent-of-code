import fs from "fs";

const lines = fs.readFileSync("input.txt")
    .toString()
    .trim()
    .split('\n')

const numbers: number[] = []

const positions = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1]
]

function isNumber(x: string) {
    return !isNaN(parseInt(x))
}

function isSymbol(x: string) {
    return x !== '.' && !isNumber(x);
}

lines.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
        const char = line[x]
        let number = ''

        if (isNumber(char)) {
            let start = x
            let i = x
            while (isNumber(line[i])) {
                number += line[i]
                i += 1
            }
            let end = i - 1
            x = end

            while ((start - 1) < end) {
                if (positions.some((pos) => {
                    const newY = y + pos[1];
                    const newX = start + pos[0];
                    if (newY < 0 || newY >= lines.length) return false;
                    if (newX < 0 || newX >= lines[newY].length) return false;

                    return isSymbol(lines[newY][newX]);
                })) {
                    numbers.push(parseInt(number));
                    break;
                }
                start += 1;
            }
        }
    }
});

console.log(numbers.reduce((acc, curr) => acc + curr, 0))