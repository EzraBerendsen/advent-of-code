import fs from "fs";

let totalPoints = 0

fs.readFileSync("input.txt")
    .toString()
    .trim()
    .split('\n')
    .forEach((line, index) => {
        const cardNumbers = line.split(': ')[1]
        const [winningNumbers, myNumbers] = cardNumbers.split(' | ').map((numLine) =>
            numLine.trim().split(' ')
                .map((num) => num.trim())
                .filter(n => n !== '')
                .map((num) => parseInt(num)))

        let count = 0
        myNumbers.forEach((num) => {
           if (winningNumbers.includes(num)) {
               count += 1
           }
        })

        if (count === 1) {
           totalPoints += 1
        } else if (count > 1) {
            totalPoints += Math.pow(2, count - 1)
        }
    })

console.log(`Answer: ${totalPoints}`)
