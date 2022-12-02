export type AnyDepthNestedArray<T> = Array<T | AnyDepthNestedArray<T>>;

/**
 *
 * Flattens an array of any depth, with full type safety!
 *
 * @example
 * ```ts
 * flatten(1, 2, [3, 4, [[[5]]], 6, 7, 8], 9, [10, 11, [12, [13], 14]])
 * // Returns [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
 * ```
 */
export function flatten<T>(...toFlatten: AnyDepthNestedArray<T>): T[] {
  // Cast Infinity as integer to get around a typescript bug: https://github.com/microsoft/TypeScript/issues/49280
  // TODO: Remove this when Typescript fixes this bug.

  return toFlatten.flat(Infinity as 1) as T[];
}

/**
 *
 * Sums all the numbers passed as arguments.
 *
 * @example
 * ```ts
 * sum(1, 2, [3, 4, [[[5]]], 6, 7, 8], 9, [10, 11, [12, [13], 14]])
 * // Returns 105
 * ```
 */
export function sum(...toSum: AnyDepthNestedArray<number>): number {
  let sum = 0;
  for (const num of flatten<number>(toSum)) {
    sum += num;
  }
  return sum;
}

/**
 *
 * Averages all the numbers passed as arguments.
 *
 * @example
 * ```ts
 * average(1, 2, [3, 4, [[[5]]], 6, 7, 8], 9, [10, 11, [12, [13], 14]])
 * // Returns 7.5
 * ```
 */
export function average(...toAverage: AnyDepthNestedArray<number>): number {
  const toAverageFlat = flatten(toAverage);
  const total = sum(toAverageFlat);
  const avg = total / toAverageFlat.length;
  return avg;
}

/**
 *
 * Splits a string into an array of lines.
 */
export function splitLines(input: string): string[] {
  return input.split("\n");
}
