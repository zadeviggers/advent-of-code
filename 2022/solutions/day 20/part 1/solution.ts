import { splitLines, sum } from "../../../utils.ts";

function getItemAtIndexOfWrappingList<T>(list: Array<T>, i: number): T {
  const actualI = (list.length - 1) % i;
  console.log(actualI);
  return list[actualI];
}

export async function solution(input: string): Promise<string> {
  const nums = splitLines(input).map((l) => Number(l));

  let mixedNumbers = [...nums];

  for (const num of nums) {
    if (num === 0) continue;
    let negative = num < 0;
    const index = mixedNumbers.findIndex((v) => v === num);
    const newIndex = index + num;
    mixedNumbers = 
    for (let i = 0; i < abs; i++) {}
  }

  return sum(
    getItemAtIndexOfWrappingList(mixedNumbers, 1000),
    getItemAtIndexOfWrappingList(mixedNumbers, 2000),
    getItemAtIndexOfWrappingList(mixedNumbers, 3000)
  ).toString();
}
