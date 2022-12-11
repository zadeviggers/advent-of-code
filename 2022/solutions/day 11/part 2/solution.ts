import { splitLines } from "../../../utils.ts";

type MonkeyID = number;

type WorryLevel = bigint;

type Test = {
  divisibleBy: bigint;
  successMonkey: MonkeyID;
  failureMonkey: MonkeyID;
};

type OperationOperand = "old" | bigint;
type OperationOperator = "*" | "+";
type RawOperation = [OperationOperator, OperationOperand, OperationOperand];
type ParsedOperation = [OperationOperator, bigint, bigint];

function getOperation(
  rawOperation: RawOperation,
  worryLevel: WorryLevel
): ParsedOperation {
  return [
    rawOperation[0],
    operandToWorryLevel(rawOperation[1], worryLevel),
    operandToWorryLevel(rawOperation[2], worryLevel),
  ];
}

function operandToWorryLevel(
  operand: OperationOperand,
  previousWorryLevel: WorryLevel
): WorryLevel {
  // console.log(operand);
  if (operand === "old") return previousWorryLevel;
  return BigInt(operand);
}

function testItem(test: Test, item: WorryLevel): MonkeyID {
  const start = Date.now();
  const remainder = item % test.divisibleBy;
  const elapsed = Date.now() - start;
  console.log(`Modulo took ${elapsed}ms`);
  const pass = remainder === 0n;

  if (pass) return test.successMonkey;
  return test.failureMonkey;
}

class Monkey {
  #rawOperation: RawOperation;

  public inspections = 0;

  constructor(
    public monkeys: Monkey[],
    public id: MonkeyID,
    public items: WorryLevel[],
    public test: Test,
    rawOperation: RawOperation
  ) {
    this.#rawOperation = rawOperation;
  }

  inspectItem(item: WorryLevel, lcmOfDivisors: bigint): WorryLevel {
    let newWorryLevel: bigint;

    // Stress from monkeys handling item
    const op = getOperation(this.#rawOperation, item);

    // console.log(this.id, item, op, this.#rawOperation);

    if (op[0] === "+") {
      newWorryLevel = op[1] + op[2];
    } else {
      newWorryLevel = op[1] * op[2];
    }

    // console.log(this.id, item, newWorryLevel);

    // Yes I did try using bigints at first. The reason they're still here is because ti worked with them and I couldn't be bothered to remove.
    // And no, I don't understand the maths theory behind why this works.
    newWorryLevel = newWorryLevel % lcmOfDivisors;

    // We did another inspection!
    this.inspections++;

    return newWorryLevel;
  }

  doTurn(lcmOfDivisors: bigint) {
    if (this.items.length === 0) {
      // console.log("Empty");
      return;
    } else {
      // console.log("Items:", this.items.length);
    }

    // `this.items.length` changes when things are removed, so need to pre-compute it
    const timesToLoop = this.items.length;
    for (let i = 0; i < timesToLoop; i++) {
      const toInspect = this.items[0];

      const item = this.inspectItem(toInspect, lcmOfDivisors);

      // Test to figure out what monkey to throw to
      const monkeyToThrowTo = testItem(this.test, item);

      // console.log(
      //   "to inspect",
      //   toInspect,
      //   i,
      //   this.items.length,
      //   monkeyToThrowTo,
      //   this.id
      // );

      // Throw to monkey
      this.monkeys[monkeyToThrowTo].items.push(item);

      // console.log(item);

      // Remove element from this monkey
      this.items.shift();
    }

    // console.log("Total inspections", this.inspections);
  }
}

function parseInput(input: string): Monkey[] {
  const monkeys: Monkey[] = [];
  const lines = splitLines(input);
  let shouldSkip = 0;
  for (let i = 0; i < lines.length; i++) {
    if (shouldSkip > 0) {
      shouldSkip--;
      continue;
    }
    const line = lines[i];
    // This should always be true
    if (line.startsWith("Monkey")) {
      shouldSkip = 6; // Five lines of content, plus one blank line
      const monkeyID = Number(line.match(/Monkey ([0-9]+)/)![1]);

      const items = lines[i + 1]
        .match(/Starting items: ((?:[0-9]+(?:, )?){1,})/)![1]
        .split(", ")
        .map((v) => BigInt(v));

      const operationMatch = lines[i + 2].match(
        /Operation: new = ((?:old)|[0-9]+) (\+|\*) ((?:old)|[0-9]+)/
      )!;
      const operation = [
        operationMatch[2],
        operationMatch[1],
        operationMatch[3],
      ] as RawOperation;

      const testDivisionCondition = BigInt(
        lines[i + 3].match(/Test: divisible by ([0-9]+)/)![1]
      );
      const testSuccessMonkey: MonkeyID = Number(
        lines[i + 4].match(/If true: throw to monkey ([0-9]+)/)![1]
      );
      const testFailureMonkey: MonkeyID = Number(
        lines[i + 5].match(/If false: throw to monkey ([0-9]+)/)![1]
      );
      const test: Test = {
        divisibleBy: testDivisionCondition,
        successMonkey: testSuccessMonkey,
        failureMonkey: testFailureMonkey,
      };
      const monkey = new Monkey(monkeys, monkeyID, items, test, operation);
      monkeys.push(monkey);
    } else {
      console.log("This should never happen");
    }
  }
  return monkeys;
}

export async function solution(input: string): Promise<string> {
  const monkeys: Monkey[] = parseInput(input);

  const lcmOfDivisors = monkeys
    .map((m) => m.test.divisibleBy)
    .reduce((prev, curr) => prev * curr, 1n);

  // 20 rounds
  console.log(
    "initial",
    monkeys.map((monkey) => monkey.items)
  );
  for (let i = 0; i < 10000; i++) {
    console.log(`round ${i}`);
    // `for (const monkey of monkeys)` might break things
    for (let j = 0; j < monkeys.length; j++) {
      const monkey = monkeys[j];
      monkey.doTurn(lcmOfDivisors);
      // console.log(
      //   "monkeys at iteration",
      //   i,
      //   monkeys.map((monkey) => monkey.items)
      // );
    }
  }

  const sortedMonkeys = monkeys
    .map((monkey) => monkey.inspections)
    .sort((a, b) => b - a);

  console.log("sorted monkeys", sortedMonkeys);

  const monkeyBusinessLevel = sortedMonkeys[0] * sortedMonkeys[1];

  return monkeyBusinessLevel.toString();
}
