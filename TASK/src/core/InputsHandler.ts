import { generateNewCombination, secretCombination } from "./Combination";

let remainingCombinations = secretCombination;

export function updateCombinations(direction: any) {
  if (direction === undefined) {
    generateNewCombination();
    remainingCombinations = secretCombination;
    return false;
  }

  if (remainingCombinations.length <= 0) {
    return false;
  }

  const combination = remainingCombinations.shift();

  if (!combination) {
    return false;
  }

  let count = Number(combination.split(" ")[0]);
  const requiredDirection = combination.split(" ")[1];

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
