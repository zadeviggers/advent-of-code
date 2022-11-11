const day = Deno.args[0];
const part = Deno.args[1];

const dayPath = `./solutions/day ${day}`;
const partPath = `${dayPath}/part ${part}`;

const solutionPath = `${partPath}/solution.ts`;
const inputPath = `${dayPath}/input.txt`;
const outputPath = `${partPath}/output.txt`;

const { solution } = await import(solutionPath);

const input = await Deno.readTextFile(inputPath);

const output = await solution(input);

await Deno.writeTextFile(outputPath, output);
