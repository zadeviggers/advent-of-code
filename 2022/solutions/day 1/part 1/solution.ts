export async function solution(input: string): Promise<string> {
  const split = input.split("\n");
  const elves = [];
  for (const cal of split) {
    if (cal === "") {
      elves.push(0);
    } else {
      const amount = Number(cal);
      elves[elves.length - 1] += amount;
    }
  }
  let biggest = -1;
  for (const elf of elves) {
    if (elf > biggest) {
      biggest = elf;
    }
  }
  return biggest.toString();
}
