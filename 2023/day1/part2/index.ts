import fs from "fs";

const numbersInText: Record<string, number> = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
}

const allNumbers: number[] = []

fs.readFileSync("input.txt")
    .toString()
    .trim()
    .split('\n')
    .forEach((line) => {
        const numbers: number[] = []
        let words: string[] = []

        // two3eightwo
        // loop through string
        // t
        //  wo aha word found, then we can stop go to next letter
        // w
        //  o3eightwo
        // 3
        // e

        for (let i = 0; i < line.length; i++) {
            if (!isNaN(parseInt(line[i]))) {
                numbers.push(parseInt(line[i]))
                continue;
            }
            let str = line[i]
            for (let j = i + 1; j < line.length; j++) {
               str += line[j]

                if (numbersInText[str] !== undefined) {
                    numbers.push(numbersInText[str])
                    break;
                }
            }

            console.log(line, line[i], numbers)
        }

        allNumbers.push(parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`))
    })

console.log('\n\n\nAllNumbers: ', allNumbers)

const answer = allNumbers.reduce((acc, curr) => acc + curr, 0)
console.log(`Answer: ${answer}`)