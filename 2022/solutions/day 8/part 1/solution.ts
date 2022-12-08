import { splitLines } from "../../../utils.ts";

function isVisible(tree: number, treesToCheck: number[]): boolean {
  for (const toCheck of treesToCheck) {
    if (toCheck >= tree) {
      return false;
    }
  }
  return true;
}

export async function solution(input: string): Promise<string> {
  const rows = splitLines(input).map((row) =>
    row.split("").map((tree) => Number(tree))
  );

  let visibleTrees = 0;

  checkRows: for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (i === 0 || i === rows.length - 1) {
      visibleTrees += row.length;
      continue checkRows;
    }

    checkTrees: for (let j = 0; j < row.length; j++) {
      const tree = row[j];
      if (j === 0 || j === row.length - 1) {
        visibleTrees++;
        continue checkTrees;
      }

      const left = row.slice(0, j);
      const right = row.slice(j + 1, row.length);
      console.log(tree, i, j, right);
      const up = rows.filter((_, l) => l < i).map((row) => row[j]);
      const down = rows.filter((_, l) => l > i).map((row) => row[j]);
      if (
        isVisible(tree, left) ||
        isVisible(tree, right) ||
        isVisible(tree, up) ||
        isVisible(tree, down)
      ) {
        visibleTrees++;
      }
    }
  }

  return visibleTrees.toString();
}
