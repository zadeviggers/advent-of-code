import { splitLines } from "../../../utils.ts";

export async function solution(input: string): Promise<string> {
  let fullyContainedCount = 0;
  const pairs = splitLines(input);

  for (const pair of pairs) {
    const [elf1, elf2] = pair
      .split(",")
      .map((elf) => elf.split("-").map((v) => Number(v)));

    if (
      ((elf1[0] >= elf2[0] && elf1[1] <= elf2[1]) ||
        (elf2[0] >= elf1[0] && elf2[1] <= elf1[1]) ||
        (elf1[1] >= elf2[0] && elf1[1] <= elf2[1]) ||
        (elf1[0] <= elf2[1] && elf1[0] >= elf1[0])) &&
      !(elf1[1] < elf2[0]) &&
      !(elf1[0] > elf2[1])
    ) {
      console.log(elf1, elf2);
      fullyContainedCount++;
    }
  }

  return fullyContainedCount.toString();
}
