function solve(input: string[]): number {
  const grid = input.map((line) => line.split(""));
  let sum = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const cell = grid[i][j];
      if (!isNumber(cell)) continue;

      let adjacent = getAdjacentCells(grid, i, j);

      let wholeNumberStr = cell;
      j++;
      for (j; j < grid[i].length; j++) {
        const nextCell = grid[i][j];
        if (!isNumber(nextCell)) break;
        adjacent = [...adjacent, ...getAdjacentCells(grid, i, j)];
        wholeNumberStr += nextCell;
      }
      const wholeNumber = Number(wholeNumberStr);

      let adjacentToSymbol = false;
      for (const cell of adjacent) {
        if (cell === "." || isNumber(cell)) continue;
        adjacentToSymbol = true;
      }
      if (!adjacentToSymbol) continue;

      console.log(i, j, wholeNumber);
      sum += wholeNumber;
    }
  }

  return sum;
}

function isNumber(str: string): boolean {
  return /\d+/.test(str);
}

function getAdjacentCells<T>(grid: T[][], i: number, j: number): T[] {
  const cells: T[] = [];

  if (i > 0) {
    cells.push(grid[i - 1][j]);
    if (j > 0) {
      cells.push(grid[i - 1][j - 1]);
    }
    if (j < grid[0].length - 1) {
      cells.push(grid[i - 1][j + 1]);
    }
  }
  if (i < grid.length - 1) {
    cells.push(grid[i + 1][j]);
    if (j > 0) {
      cells.push(grid[i + 1][j - 1]);
    }
    if (j < grid[0].length - 1) {
      cells.push(grid[i + 1][j + 1]);
    }
  }
  if (j > 0) {
    cells.push(grid[i][j - 1]);
  }
  if (j < grid[0].length - 1) {
    cells.push(grid[i][j + 1]);
  }
  return cells;
}

const rawInput = `input here`;
console.log(solve(rawInput.split("\n")));
