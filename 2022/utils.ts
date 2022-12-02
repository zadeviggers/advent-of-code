export type AnyNestedNumberArray =
  | number[]
  | number[][]
  | number[][][]
  | number[][][][]
  | number[][][][][]
  | number[][][][][][];

export function sum(...toSum: AnyNestedNumberArray): number {
  let sum = 0;
  for (const num of toSum.flat(Infinity) as number[]) {
    sum += num;
  }
  return sum;
}

export function average(...toAverage: AnyNestedNumberArray): number {
  const total = sum(toAverage.flat(Infinity) as number[]);
  const avg = total / toAverage.length;
  return avg;
}

export function splitLines(input: string): string[] {
  return input.split("\n");
}
