import { assertEquals } from "https://deno.land/std@0.163.0/testing/asserts.ts";
import { solution } from "./solution.ts";

Deno.test("Example 1 test", async () => {
  const exampleInput = await Deno.readTextFile("./example-input.txt");
  const exampleOutput = await Deno.readTextFile("./example-output.txt");

  const solutionOutput = await solution(exampleInput);

  assertEquals(solutionOutput, exampleOutput);
});
