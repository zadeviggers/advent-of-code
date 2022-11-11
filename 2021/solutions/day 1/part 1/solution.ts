export async function solution(input: string): Promise<string> {
  const depths = input.split("\n").map((d) => Number(d));

  let increasedCount = 0;

  depths.forEach((depth, i) => {
    if (i === 0) {
      return;
    }

    const prevDepth = depths[i - 1];
    if (depth > prevDepth) {
      increasedCount++;
    }
  });

  return increasedCount.toString();
}
