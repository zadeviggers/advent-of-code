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
 * Sorts an array of numbers in descending order.
 *
 * @example
 * ```ts
 * sort(1, 2, [3, 4, [[[5]]], 6, 7, 8], 9, [10, 11, [12, [13], 14]])
 * // Returns [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
 * ```
 */
export function sort(...toSort: AnyDepthNestedArray<number>): number[] {
  return flatten(toSort).sort((a, b) => b - a);
}

/**
 *
 * Splits a string into an array of lines.
 *
 * @example
 * ```ts
 * splitLines(`a
 *
 * a
 *
 *
 * jfdk
 * `)
 * // Returns ["a", "", "a", "", "", "jfdk", ""]
 */
export function splitLines(input: string): string[] {
  return input.split("\n");
}

/**
 *
 * E**X**clusive logical **OR** gate.
 *
 * @example
 * ```ts
 * XOR(true, true)
 * // Returns false
 * XOR(true, false)
 * // Returns true
 * XOR(false, false)
 * // Returns false
 * ```
 */
export function XOR(a: boolean, b: boolean): boolean {
  // From https://www.howtocreate.co.uk/xor.html
  return a !== b;
}
/**
 *
 * @param cap The number to count up to
 * @param step The amount to increase by each iteration.
 *
 * @example
 * ```ts
 * const r = range(3)
 * r.next()
 * // Returns 0
 * r.next()
 * // Returns 1
 * r.next()
 * // Returns 2
 *  * r.next()
 * // Returns undefined
 *
 * for (const i of range(12, 2)) console.log(i)
 * // Logs 0, 2, 4, 6, 8, 10
 * ```
 */
export function* range(cap: number, step = 1) {
  for (let i = 0; i < cap; i += step) {
    yield i;
  }
}
