import {
  average,
  flatten,
  range,
  sort,
  splitLines,
  sum,
  XOR,
} from "./utils.ts";
import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

Deno.test({
  name: "flatten() example",
  fn() {
    const res = flatten(1, 2, [3, 4, [[[5]]], 6, 7, 8], 9, [
      10,
      11,
      [12, [13], 14],
    ]);
    assertEquals(res, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
  },
});

Deno.test({
  name: "sum() example",
  fn() {
    const res = sum(1, 2, [3, 4, [[[5]]], 6, 7, 8], 9, [
      10,
      11,
      [12, [13], 14],
    ]);
    assertEquals(res, 105);
  },
});

Deno.test({
  name: "average() example",
  fn() {
    const res = average(1, 2, [3, 4, [[[5]]], 6, 7, 8], 9, [
      10,
      11,
      [12, [13], 14],
    ]);
    assertEquals(res, 7.5);
  },
});

Deno.test({
  name: "sort() example",
  fn() {
    const res = sort(1, 2, [3, 4, [[[5]]], 6, 7, 8], 9, [
      10,
      11,
      [12, [13], 14],
    ]);
    assertEquals(res, [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
  },
});

Deno.test({
  name: "splitLines() example",
  fn() {
    const res = splitLines(`a

a


jfdk
`);
    assertEquals(res, ["a", "", "a", "", "", "jfdk", ""]);
  },
});

Deno.test({
  name: "XOR() example",
  fn() {
    assertEquals(XOR(true, true), false);

    assertEquals(XOR(true, false), true);

    assertEquals(XOR(false, false), false);
  },
});

Deno.test({
  name: "range() with .next()",
  fn() {
    const res = range(3);
    assertEquals(res.next().value, 0);
    assertEquals(res.next().value, 1);
    assertEquals(res.next().value, 2);

    const final = res.next();
    assertEquals(final.value, undefined);
    assertEquals(final.done, true);
  },
});

Deno.test({
  name: "range() in for...of loop - simple",
  fn() {
    const res = [];
    for (const i of range(2)) res.push(i);
    assertEquals(res, [0, 1]);
  },
});

Deno.test({
  name: "range() in for...of loop - complex",
  fn() {
    const res = [];
    for (const i of range(12, 2)) res.push(i);
    assertEquals(res, [0, 2, 4, 6, 8, 10]);
  },
});
