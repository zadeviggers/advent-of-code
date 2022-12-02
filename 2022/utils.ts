export type AnyDepthNestedArray<T> = Array<T | AnyDepthNestedArray<T>>;

/**
 *
 * @example
 * ```ts
 * flatten(1, 2, [3, 4, [[[5]]], 6, 7, 8], 9, [10, 11, [12, [13], 14]])
 * // Returns [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
 * ```
 */
export function flatten<T>(...toFlatten: AnyDepthNestedArray<T>): T[] {
  // Cast Infinity as integer to get around a typescript bug: https://github.com/microsoft/TypeScript/issues/49280
  return toFlatten.flat(Infinity as 1) as T[];
}

/**
 *
 * @example
 * ```ts
 * sum(1, 2, [3, 4, [[[5]]], 6, 7, 8], 9, [10, 11, [12, [13], 14]])
 * // Returns 105
 * ```
 */
export function sum(...toSum: AnyDepthNestedArray<number>): number {
  let sum = 0;
  for (const num of flatten<number>(...toSum)) {
    sum += num;
  }
  return sum;
}

/**
 *
 * @example
 * ```ts
 * average(1, 2, [3, 4, [[[5]]], 6, 7, 8], 9, [10, 11, [12, [13], 14]])
 * // Returns 21
 * ```
 */
export function average(...toAverage: AnyDepthNestedArray<number>): number {
  const total = sum(...toAverage);
  const avg = total / toAverage.length;
  return avg;
}

export function splitLines(input: string): string[] {
  return input.split("\n");
}
