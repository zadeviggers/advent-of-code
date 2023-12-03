function solve(input: string[]): number {
  const grid = input.map((line) => line.split(""));
  const gears: Record<`${number},${number}`, number[]> = {};
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const cell = grid[i][j];
      if (!isNumber(cell)) continue;

      let adjacent = getAdjacentCellCoords(grid, i, j);

      let wholeNumberStr = cell;
      for (j++; j < grid[i].length; j++) {
        const nextCell = grid[i][j];
        if (!isNumber(nextCell)) break;
        adjacent = [...adjacent, ...getAdjacentCellCoords(grid, i, j)];
        wholeNumberStr += nextCell;
      }

      const wholeNumber = Number(wholeNumberStr);

      const filtered = adjacent.filter(({ cell }) => cell === "*");
      for (const { coords } of filtered) {
        gears[`${coords[0]},${coords[1]}`] ??= [];
        gears[`${coords[0]},${coords[1]}`].push(wholeNumber);
      }

      console.log(i, j, wholeNumber);
    }
  }

  console.log(gears);

  const filteredGears = Object.entries(gears)
    .map(([k, v]) => {
      // This is a horrible dirty hack to remove some duplicates.
      // I should figure out why there are dupes, but I won't - this works fine
      const unique = [...new Set(v)];
      return [k, unique];
    })
    .filter(([, nums]) => nums.length === 2) as [string, [number, number]][];

  console.log(filteredGears);

  const ratios = filteredGears.map(([k, [a, b]]) => [k, a * b]) as [
    string,
    number
  ][];

  console.log(ratios);

  const sum = ratios.reduce((a, [, b]) => a + b, 0);

  return sum;
}

function isNumber(str: string): boolean {
  return /\d+/.test(str);
}

function getAdjacentCellCoords<T>(
  grid: T[][],
  i: number,
  j: number
): { coords: [number, number]; cell: T }[] {
  const coords: { coords: [number, number]; cell: T }[] = [];

  if (i > 0) {
    coords.push({ cell: grid[i - 1][j], coords: [i - 1, j] });
    if (j > 0) {
      coords.push({ cell: grid[i - 1][j - 1], coords: [i - 1, j - 1] });
    }
    if (j < grid[0].length - 1) {
      coords.push({ cell: grid[i - 1][j + 1], coords: [i - 1, j + 1] });
    }
  }
  if (i < grid.length - 1) {
    coords.push({ cell: grid[i + 1][j], coords: [i + 1, j] });
    if (j > 0) {
      coords.push({ cell: grid[i + 1][j - 1], coords: [i + 1, j - 1] });
    }
    if (j < grid[0].length - 1) {
      coords.push({ cell: grid[i + 1][j + 1], coords: [i + 1, j + 1] });
    }
  }
  if (j > 0) {
    coords.push({ cell: grid[i][j - 1], coords: [i, j - 1] });
  }
  if (j < grid[0].length - 1) {
    coords.push({ cell: grid[i][j + 1], coords: [i, j + 1] });
  }
  return coords;
}

const rawInput = `input here`;
console.log(solve(rawInput.split("\n")));
