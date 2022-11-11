import { solution } from "./solution.ts";

const input = await Deno.readTextFile("./sample-input.txt");

const output = await solution(input);

await Deno.writeTextFile("output.txt", output);
