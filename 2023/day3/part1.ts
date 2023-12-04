import fs from "fs";

const possibleGames: number[] = []

fs.readFileSync("input.txt")
    .toString()
    .trim()
    .split('\n')
    .forEach((line, index) => {
        const allSets = line.split(': ')[1]
        const sets = allSets.split('; ')

        const map = {
            red: 0,
            green: 0,
            blue: 0,
        }

        sets.forEach((set) => {
            const cubes = set.split(', ')
            cubes.forEach((cube) => {
                const [value, key] = cube.split(' ')
                map[key] = Math.max(map[key], parseInt(value))
            })
        })

        const power = Object.values(map).reduce((acc, curr) => {
            return acc * curr
        }, 1)
        possibleGames.push(power)
    })

console.log(possibleGames.reduce((acc, curr) => acc + curr, 0))
