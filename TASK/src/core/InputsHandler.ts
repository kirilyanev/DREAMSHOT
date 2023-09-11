import { generateNewCombination, secretCombination } from "./Combination";

let remainingCombinations = secretCombination;

export function updateCombinations(direction) {
  console.log(remainingCombinations);

  if (direction === undefined) {
    generateNewCombination();
    remainingCombinations = secretCombination;
    return false;
  }

  let [count, requiredDirection] = remainingCombinations.shift().split(' ');

  if (requiredDirection !== direction) {
    generateNewCombination();
    remainingCombinations = secretCombination;

    return false;
  }

  count -= 1;

  if (count === 0 && remainingCombinations.length === 0) {
    console.log("OPENING DOOR");
    return "OPEN";
  }

  if (count === 0) {
    return true;
  }
  remainingCombinations.unshift(`${count} ${requiredDirection}`);
  return true;
}
