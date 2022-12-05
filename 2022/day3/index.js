const path = require('path');
const fs = require('fs/promises')

const getInput = async (test = false) => {
    try {
        return await fs.readFile(path.join(__dirname, `day3input${test ? 'test' : ''}.txt`));
    } catch (e) {
        console.log('Couldn\'t open file, check if in test mode and check file name.');
    }
}

function findCommonChar(arr) {
    for (let i = 0; i < arr[0].length; i++) {
        const char = arr[0][i];
        if (arr.every(elem => elem.includes(char))) {
            return char; // the character occurs in all elements of the array
        }
    }
    return null; // no character occurs in all elements of the array
}


async function day3() {
    const data = await getInput()
    const content = Buffer.from(data).toString().trim();
    const contentArr = content.split('\n');
    let totalScore = 0;

    const rucksackGroups = []

    for (let i = 0; i < contentArr.length; i+=3) {
        rucksackGroups.push(contentArr.slice(i, i + 3))
    }

    const UPPER_Z_IN_CHAR_CODE = 90
    rucksackGroups.forEach((rucksackGroup, index) => {

        const sharedLetter = findCommonChar(rucksackGroup);

        const charCode = sharedLetter.charCodeAt(0)

        if (isNaN(charCode)) return

        if (charCode <= UPPER_Z_IN_CHAR_CODE) {
            totalScore += charCode - 38
        } else {
            totalScore += charCode - 96
        }
    })

    console.log(totalScore);
}

day3()
