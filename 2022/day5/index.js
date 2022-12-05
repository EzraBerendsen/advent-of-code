const path = require('path');
const fs = require('fs/promises')

const getInput = async (test = false) => {
    try {
        return await fs.readFile(path.join(__dirname, `day5input${test ? 'test' : ''}.txt`));
    } catch (e) {
        console.log('Couldn\'t open file, check if in test mode and check file name.');
    }
}

async function day5Part1() {
    const test = true
    const data = await getInput(test)
    const content = Buffer.from(data).toString();
    const contentArr = content.split('\n');

    const arr = Array.from({length: test ? 3 : 9}).map(() => [])

    let isChar = true
    contentArr.forEach((line) => {
        const characters = line.split('')

        characters.forEach((char, index) => {
            if (!isChar) return

            if (!'[] '.split('').includes(char)) {
                let arrPosition = Math.floor(index / 4)

                const parsedChar = parseInt(char);

                if (!isNaN(parsedChar)) {
                    isChar = false

                    return
                }


                arr[arrPosition].push(char)

                console.log({char, index, arrPosition});
            }
        })
    })

    contentArr.forEach((line) => {
        const isMoveLine = line.includes('move')

        if (isMoveLine) {
            const parsedLine = line.replace(/\D/g, '')

            const move = parseInt(parsedLine.substring(parsedLine.length - 2, 0), 10)
            const from = parseInt(parsedLine.substring(parsedLine.length - 1, parsedLine.length - 2), 10) - 1
            const to = parseInt(parsedLine.substring(parsedLine.length, parsedLine.length - 1), 10) - 1

            for (let i = 1; i <= move; i++) {
                const popped = arr[from].shift()
                arr[to].unshift(popped)
            }
        }
    })

    console.log(arr);
}

async function day5Part2() {
    const test = false
    const data = await getInput(test)
    const content = Buffer.from(data).toString();
    const contentArr = content.split('\n');

    const arr = Array.from({length: test ? 3 : 9}).map(() => [])

    let isChar = true
    contentArr.forEach((line, lineIndex) => {
        const characters = line.split('')

        characters.forEach((char, index) => {
            if (!isChar) return

            if (!'[] '.split('').includes(char)) {
                let arrPosition = Math.floor(index / 4)

                const parsedChar = parseInt(char);

                if (!isNaN(parsedChar)) {
                    isChar = false

                    return
                }


                arr[arrPosition].push({
                    char: char,
                    position: lineIndex,
                })
            }
        })
    })

    contentArr.forEach((line, k) => {
        const isMoveLine = line.includes('move')

        if (isMoveLine) {

            const parsedLine = line.replace(/\D/g, '')

            const move = parseInt(parsedLine.substring(parsedLine.length - 2, 0), 10)
            const from = parseInt(parsedLine.substring(parsedLine.length - 1, parsedLine.length - 2), 10) - 1
            const to = parseInt(parsedLine.substring(parsedLine.length, parsedLine.length - 1), 10) - 1

            for (let i = 0; i < arr[from].length; i++) {
                arr[from][i].position = i
            }

            for (let i = 1; i <= move; i++) {
                const {char, position} = arr[from].shift();
                arr[to].splice(position, 0, {char, position});

            }
        }
    })

    let answer = ''
    for (let i = 0; i < arr.length; i++) {
        answer += arr[i][0].char
    }

    console.log(answer);
}

// day5Part1()
day5Part2()
