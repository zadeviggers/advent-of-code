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
  elves.sort((a, b) => b - a);
  return (elves[0] + elves[1] + elves[2]).toString();
}
