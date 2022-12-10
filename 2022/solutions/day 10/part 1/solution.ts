import { splitLines, sum, noop } from "../../../utils.ts";

export async function solution(input: string): Promise<string> {
  const commands = splitLines(input);
  const strengths: number[] = [];
  let x = 1;
  let cycle = 0;

  function tickCycle(ticks: number) {
    for (let i = 0; i < ticks; i++) {
      cycle++;
      if ((cycle - 20) % 40 === 0) {
        strengths.push(cycle * x);
      }
    }
  }

  for (const command of commands) {
    if (command === "noop") {
      tickCycle(1);
    } else if (command.startsWith("addx")) {
      const toAdd = Number(command.match(/addx (-?[0-9]+)/)![1]);
      tickCycle(2);
      x += toAdd;
    }
  }
  return sum(strengths).toString();
}
