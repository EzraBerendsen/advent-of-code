const path = require('path');
const fs = require('fs/promises')

async function day1() {
    try {
        const data = await fs.readFile(path.join(__dirname, 'day1input.txt'));

        const content = Buffer.from(data).toString().trim();

        const contentArr = content.split('\n');

        const map = {};
        let index = 0;

        contentArr.forEach((value) => {
            if (value === '') {
                index += 1;

                return;
            }

            if (map[index]) {
                map[index].push(value)
            } else {
                map[index] = [value];
            }
        })

        const numbers = []

        Object.keys(map).forEach((key) => {
            const numb = map[key].reduce((acc, curr) => {
                return acc + parseInt(curr)
            }, 0)

            numbers.push(numb)
        })

        numbers.sort((a, z) => z - a);

        let answer = 0

        for (let i = 0; i <= 2; i++) {
            answer += numbers[i]
        }

        console.log(answer);
    } catch (error) {
        console.log(error);
    }
}

day1();
