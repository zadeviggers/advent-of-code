import { splitLines } from "../../../utils.ts";

const priorities: Record<string, number> = {};
Array.from({ length: 52 })
  .map((_, i) => i + 1)
  .map((n) => {
    if (n <= 26) {
      return String.fromCharCode(n + 96);
    }
    return String.fromCharCode(n - 26 + 64);
  })
  .map((v, i) => (priorities[v] = i + 1));

export async function solution(input: string): Promise<string> {
  const rucksacks = splitLines(input);
  let sumOfPriorities = 0;
  for (const rucksack of rucksacks) {
    const compartmentOne = rucksack.slice(0, rucksack.length / 2);
    const compartmentTwo = rucksack.slice(rucksack.length / 2, rucksack.length);
    const commonItemType = compartmentOne
      .split("")
      .find((itemType) => compartmentTwo.includes(itemType))!;
    sumOfPriorities += priorities[commonItemType];
  }
  return sumOfPriorities.toString();
}
