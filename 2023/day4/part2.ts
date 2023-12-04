import fs from "fs";

const scratchcards: number[] = []
let totalScratchcards = 0

function processCardLine(line: string, index: number) {
    const currentCard = index + 1
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

    totalScratchcards += 1

    while (count > 0) {
        scratchcards.push(currentCard + count)
        count -= 1
    }
}

const lines = fs.readFileSync("input.txt")
    .toString()
    .trim()
    .split('\n')

lines.forEach((line, index) => {
    processCardLine(line, index)

    while (scratchcards.length > 0) {
        const index = scratchcards.pop()!
        processCardLine(lines[index - 1], index - 1)
    }
})


console.log(`Answer: ${totalScratchcards}`)
