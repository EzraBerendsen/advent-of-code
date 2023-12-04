import fs from "fs";

const lines = fs.readFileSync("test.txt")
    .toString()
    .trim()
    .split('\n')

const numbers = new Set<number>()

function isNumber(x: string) {
    return !isNaN(parseInt(x))
}

function isSymbol(x: string) {
    return x !== '.' && !isNumber(x);
}

lines.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
        if (isNumber(line[x])) {
            let number = "";
            let j = x;
            while (j < line.length && isNumber(line[j])) {
                number += line[j++];
            }

            if (j !== x) {
                let numberAdded = false;
                // Check adjacent cells for symbols
                for (let dx = -1; dx <= 1 && !numberAdded; dx++) {
                    for (let dy = -1; dy <= 1 && !numberAdded; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        let nx = x + dx;
                        let ny = y + dy;
                        if (ny >= 0 && ny < lines.length && nx >= 0 && nx < lines[ny].length) {
                            if (isSymbol(lines[ny][nx])) {
                                numbers.add(parseInt(number));
                                numberAdded = true;
                            }
                        }
                    }
                }
                x = j - 1; // Skip past the current number
            }
        }
    }
});

console.log(Array.from(numbers).reduce((acc, curr) => acc + curr, 0))