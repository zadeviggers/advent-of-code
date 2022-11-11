const day = Deno.args[0];
const part = Deno.args[1];

const dayPath = `./solutions/day ${day}`;
const partPath = `${dayPath}/part ${part}`;

const solutionPath = `${partPath}/solution.ts`;
const exampleOutputPath = `${partPath}/example-output.txt`;
const exampleInputPath = `${dayPath}/example-input.txt`;

const { solution } = await import(solutionPath);

const exampleInput = await Deno.readTextFile(exampleInputPath);
const exampleOutput = await Deno.readTextFile(exampleOutputPath);

const output = await solution(exampleInput);

console.log(output);

console.log(`Matches: ${output === exampleOutput}`);
