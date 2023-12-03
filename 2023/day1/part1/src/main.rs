use std::fs;

fn main() {
    let contents = fs::read_to_string("input.txt")
        .expect("ERROR: could not read from input.txt");

    part1(&contents);
}

fn part1(contents: &String) {
    let mut all_numbers = Vec::new();

    for line in contents.lines() {
        let mut numbers = Vec::new();

        for char in line.chars() {
            if char.is_numeric() {
                numbers.push(char.to_digit(10).expect("ERROR: not a number"));
            };
        }

        let number = format!("{first}{last}",
                             first = numbers.first().unwrap(),
                             last = numbers.last().unwrap()
        ).parse::<i32>().unwrap();

        all_numbers.push(number);
    }

    println!("Answer: {answer}",
             answer = all_numbers.iter().fold(0, |acc, curr| acc + curr)
    )
}

fn part2(contents: String) {
    let mut all_numbers = Vec::new();

    let numbers_in_text = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

    for line in contents.lines() {
        let mut text = Vec::new();

        for char in line.chars() {
            text.push(char);


        }
    }
}