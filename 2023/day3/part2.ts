import fs from "fs";

const lines = fs.readFileSync("input.txt")
    .toString()
    .trim()
    .split('\n')

const allNumbers: number[] = []

const positions = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1]
]

function isNumber(x: string) {
    return !isNaN(parseInt(x))
}

function isGear(char: string) {
    return char === "*"
}

function isSymbol(x: string) {
    return x !== '.' && !isNumber(x);
}

lines.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
        const char = line[x]

        if (isGear(char)) {
            const numbers = new Set<number>()
            for (const pos of positions) {
                const [posX, posY] = pos
                if (lines[y + posY] === undefined) continue
                if (lines[y + posY][x + posX] === undefined) continue

                if (isNumber(lines[y + posY][x + posX])) {
                    let firstNumberY = y + posY
                    let firstNumberX = x + posX

                    const number: number[] = []

                    while (firstNumberX >= 0 && isNumber(lines[firstNumberY][firstNumberX])) {
                        number.unshift(parseInt(lines[firstNumberY][firstNumberX]))

                        firstNumberX -= 1
                    }

                    firstNumberX = x + posX + 1

                    while (firstNumberX < line.length && isNumber(lines[firstNumberY][firstNumberX])) {
                        number.push(parseInt(lines[firstNumberY][firstNumberX]))

                        firstNumberX += 1
                    }


                    if (isNumber(number.join(''))) {
                        numbers.add(parseInt(number.join(''), 10))
                    }
                }
            }

            if (numbers.size === 2) {
                allNumbers.push(Array.from(numbers).reduce((acc, curr) => acc * curr, 1))
            }
        }
    }
});

console.log(allNumbers.reduce((acc, curr) => acc + curr, 0))
