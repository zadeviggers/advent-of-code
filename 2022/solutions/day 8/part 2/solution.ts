import { splitLines } from "../../../utils.ts";

function getVisibleTrees(tree: number, treesToCheck: number[]): number {
  let visibleCount = 0;
  for (const toCheck of treesToCheck) {
    visibleCount++;

    if (toCheck >= tree) {
      break;
    }
  }

  return visibleCount;
}

export async function solution(input: string): Promise<string> {
  const rows = splitLines(input).map((row) =>
    row.split("").map((tree) => Number(tree))
  );

  let highestScenicScore = -1;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (i === 0 || i === rows.length - 1) {
      continue;
    }

    for (let j = 0; j < row.length; j++) {
      const tree = row[j];
      if (j === 0 || j === row.length - 1) {
        continue;
      }

      const left = row.slice(0, j).reverse();
      const right = row.slice(j + 1, row.length);
      const up = rows
        .filter((_, l) => l < i)
        .map((row) => row[j])
        .reverse();
      const down = rows.filter((_, l) => l > i).map((row) => row[j]);
      const scenicScore =
        getVisibleTrees(tree, left) *
        getVisibleTrees(tree, right) *
        getVisibleTrees(tree, up) *
        getVisibleTrees(tree, down);
      if (scenicScore > highestScenicScore) {
        highestScenicScore = scenicScore;
        console.log(scenicScore, tree, i, j, left, right, up, down);
      }
    }
  }

  return highestScenicScore.toString();
}
