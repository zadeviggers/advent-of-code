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

  fn: async (t) => {
    await t.step("Simple", () => {
      const res = flatten([
        [567, 890],
        [0, -1],
        [8, 6],
      ]);
      assertEquals(res, [567, 890, 0, -1, 8, 6]);
    });

    await t.step("Complex array", () => {
      const res = flatten(1, 2, [3, 4, [[[5]]], 6, 7, 8], 9, [
        10,
        11,
        [12, [13], 14],
      ]);
      assertEquals(res, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
    });

    await t.step("Already flattened", () => {
      const res = flatten([[567, 890, 0, -1, 8, 6]]);
      assertEquals(res, [567, 890, 0, -1, 8, 6]);
    });
  },
});

Deno.test({
  name: "sum()",
  fn: async (t) => {
    await t.step("Simple", () => {
      const res = sum([567, 890, 0, -1, 8]);
      assertEquals(res, 1464);
    });

    await t.step("Complex array", () => {
      const res = sum(1, 2, [3, 4, [[[5]]], 6, 7, 8], 9, [
        10,
        11,
        [12, [13], 14],
      ]);
      assertEquals(res, 105);
    });
  },
});

Deno.test({
  name: "average()",
  fn: async (t) => {
    await t.step("Simple", () => {
      const res = average([567, 890, 0, -1, 8]);
      assertEquals(res, 292.8);
    });

    await t.step("Complex array", () => {
      const res = average(1, 2, [3, 4, [[[5]]], 6, 7, 8], 9, [
        10,
        11,
        [12, [13], 14],
      ]);
      assertEquals(res, 7.5);
    });
  },
});

Deno.test({
  name: "sort()",
  fn: async (t) => {
    await t.step("Simple", () => {
      const res = sort([567, 890, 0, -1, 8]);
      assertEquals(res, [890, 567, 8, 0, -1]);
    });

    await t.step("Complex array", () => {
      const res = sort(1, 2, [3, 4, [[[5]]], 6, 7, 8], 9, [
        10,
        11,
        [12, [13], 14],
      ]);
      assertEquals(res, [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
    });
  },
});

Deno.test({
  name: "splitLines()",
  fn() {
    const res = splitLines(`a

a


jfdk
`);
    assertEquals(res, ["a", "", "a", "", "", "jfdk", ""]);
  },
});

Deno.test({
  name: "XOR()",
  fn: async (t) => {
    await t.step("Both true", () => assertEquals(XOR(true, true), false));

    await t.step("Both false", () => assertEquals(XOR(false, false), false));

    await t.step("One true, one false", () =>
      assertEquals(XOR(true, false), true)
    );
  },
});

Deno.test({
  name: "range()",
  fn: async (t) => {
    await t.step("With .next()", async (t) => {
      const res = range(3);

      await t.step("Correct values returned", () => {
        assertEquals(res.next().value, 0);
        assertEquals(res.next().value, 1);
        assertEquals(res.next().value, 2);
      });

      await t.step("Finishes correctly", () => {
        const final = res.next();
        assertEquals(final.value, undefined);
        assertEquals(final.done, true);
      });
    });

    await t.step("In a for...of loop", async (t) => {
      await t.step("Simple", () => {
        const res = [];
        for (const i of range(2)) res.push(i);
        assertEquals(res, [0, 1]);
      });

      await t.step("Complex", () => {
        const res = [];
        for (const i of range(12, 2)) res.push(i);
        assertEquals(res, [0, 2, 4, 6, 8, 10]);
      });
    });
  },
});
