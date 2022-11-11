export async function solution(input: string): Promise<string> {
  const depths = input.split("\n").map((d) => Number(d));

  const windows = Array.from({ length: depths.length - 2 }).map((_) => 0);
  depths.forEach((depth, i) => {
    windows[i] += depth;
    if (windows[i + 1] !== undefined) {
      windows[i + 1] += depth;
    }
    if (windows[i + 2] !== undefined) {
      windows[i + 2] += depth;
    }
  });
  let increasedCount = 0;
  windows.forEach((window, i) => {
    if (i === 0) {
      return;
    }

    const prevWindow = windows[i - 1];
    if (window > prevWindow) {
      increasedCount++;
    }
  });

  return increasedCount.toString();
}
