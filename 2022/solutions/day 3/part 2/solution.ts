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
  const elves = splitLines(input);
  const elfGroups = [];
  let shouldSkip = 0;
  for (let i = 0; i < elves.length; i++) {
    if (shouldSkip > 0) {
      shouldSkip--;
      continue;
    }
    shouldSkip = 2;
    const elf1 = elves[i];
    const elf2 = elves[i + 1];
    const elf3 = elves[i + 2];
    elfGroups.push([elf1, elf2, elf3]);
  }
  let sumOfPriorities = 0;
  for (const group of elfGroups) {
    const firstTwoCommonTypes = group[0]
      .split("")
      .filter((itemType) => group[1].includes(itemType));
    const commonItemType = group[2]
      .split("")
      .find((itemType) => firstTwoCommonTypes.includes(itemType))!;
    console.log(commonItemType);
    sumOfPriorities += priorities[commonItemType];
  }
  return sumOfPriorities.toString();
}
