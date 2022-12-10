import { splitLines } from "../../../utils.ts";

// This soulution has a couple of bugs and doesn't pass the test case, but the output was still readable enough for me to make out the letters for the final answer.

export async function solution(input: string): Promise<string> {
  const commands = splitLines(input);
  const crtImage: string[] = [""];
  let x = 1;
  let cycle = 0;

  function tickCycle(ticks: number) {
    for (let i = 0; i < ticks; i++) {
      cycle++;
      const rowPos = cycle % 40;
      if (crtImage[crtImage.length - 1].length === 40) {
        crtImage.push("");
      }

      const crtPos = x + 1;

      if (crtPos === rowPos || crtPos + 1 === rowPos || crtPos - 1 === rowPos) {
        crtImage[crtImage.length - 1] += "#";
      } else {
        crtImage[crtImage.length - 1] += " ";
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
  return crtImage.join("\n");
}
