const path = require('path');
const fs = require('fs/promises')

async function day2() {
    try {
        const data = await fs.readFile(path.join(__dirname, 'day2input.txt'));
        const content = Buffer.from(data).toString().trim();
        const contentArr = content.split('\n');
        let totalScore = 0;

        const scores = {
            A: {
                X: 3,
                Y: 1 + 3,
                Z: 2 + 6,
            },
            B: {
                X: 1,
                Y: 2 + 3,
                Z: 3 + 6,
            },
            C: {
                X: 2,
                Y: 3 + 3,
                Z: 1 + 6,
            },
        };

        for (const round of contentArr) {
            const [opponent, me] = round.split(' ');
            totalScore += scores[opponent][me];
        }

        console.log(totalScore);
    } catch (error) {
        console.log(error);
    }
}

day2();
