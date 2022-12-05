const path = require('path');
const fs = require('fs/promises')

const getInput = async (test = false) => {
    try {
        return await fs.readFile(path.join(__dirname, `day4input${test ? 'test' : ''}.txt`));
    } catch (e) {
        console.log('Couldn\'t open file, check if in test mode and check file name.');
    }
}

async function day4() {
    const data = await getInput()
    const content = Buffer.from(data).toString().trim();
    const contentArr = content.split('\n');
    let totalScore = 0;

    contentArr.forEach((pair, index) => {
        const splittedPair = pair.split(',')

        const allSections = []

        splittedPair.forEach((single) => {
            const sections = []

            const range = single.split('-')

            const start = parseInt(range[0], 10)
            const end = parseInt(range[1], 10)

            for (let i = start; i <= end; i++) {
                sections.push(i)
            }

            allSections.push(sections)
        })

        const bool1 = allSections[0].some((el) => allSections[1].includes(el))
        const bool2 = allSections[1].some((el) => allSections[0].includes(el))

        if (bool1 || bool2) {
            totalScore += 1
        }

        // allSections.forEach((section) => {
        //     console.log(section);
        // })
    })

    console.log(totalScore);
}

day4()
