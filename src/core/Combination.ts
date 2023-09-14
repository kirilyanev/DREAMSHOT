const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const directions = ["clockwise", "counterclockwise"];

export let secretCombination: string[] = [];

export function generateCombination() {
  for (let i = 0; i < 3; i++) {
    const currentDirection = directions[Math.round(Math.random())];
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const randomNum = numbers[randomIndex];
    secretCombination.push(`${randomNum} ${currentDirection}`);
  }

  console.log(secretCombination.join(", "));
}

export function generateNewCombination() {
  secretCombination = [];
  generateCombination();
}
