export function sum(nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}

export function product(nums: number[]): number {
  return nums.reduce((a, b) => a * b, 1);
}

export function isNumber(str: string): boolean {
  return /\d+/.test(str);
}

export function getAdjacentCellCoords<T>(
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
