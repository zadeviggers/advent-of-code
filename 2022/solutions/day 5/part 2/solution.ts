import { splitLines } from "../../../utils.ts";

export async function solution(input: string): Promise<string> {
  const cratesStacks: string[][] = [];
  // let lineNumber = 0;
  for (const line of splitLines(input)) {
    if (line.startsWith(" ") || line.startsWith("[")) {
      // Crates section
      if (cratesStacks.length === 0) {
        // Generate stacks to push onto
        const numberOfCrates = Math.floor(line.length / 4 + 1);
        for (let i = 0; i < numberOfCrates; i++) {
          cratesStacks.push([]);
        }
      }
      let shouldSkip = 0;
      let crateCounter = 0;
      for (const character of line) {
        if (shouldSkip > 0) {
          shouldSkip--;
          continue;
        }
        if (character === " ") {
          // Empty crate spot
          crateCounter++;
          shouldSkip = 3;
          continue;
        }
        if (character === "[") continue;
        if (character === "]") {
          // End of a crate
          crateCounter++;
          shouldSkip = 1;
          continue;
        }

        if (/^[A-Z]$/.test(character)) {
          // Need to stick it at the start since we're moving down
          cratesStacks[crateCounter].unshift(character);
        }
      }
    } else if (line.startsWith("move")) {
      // Moving instructions section
      const [, ...values] = line.match(
        /^move ([0-9]+) from ([0-9]+) to ([0-9]+)$/
      )!;
      const [amount, from, to] = values.map((v) => Number(v));
      const movingStack = [];
      for (let i = 0; i < amount; i++) {
        movingStack.unshift(cratesStacks[from - 1].pop()!);
      }
      cratesStacks[to - 1].push(...movingStack);
    } else if (line === "") continue;
  }
  console.log(cratesStacks);
  return cratesStacks.map((stack) => stack.at(-1)).join("");
}
