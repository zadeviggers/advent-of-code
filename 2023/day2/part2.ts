const input = `input here`.split("\n");

let powerSum = 0;

for (const game of input) {
  const id = Number(game.match(/Game ([0-9]+)/)![1]);
  const rounds = game
    .split(":")[1]
    .trim()
    .split(";")
    .map((r) => r.trim());
  let [redMax, greenMax, blueMax] = [0, 0, 0];
  for (const round of rounds) {
    console.log(round);
    const red = Number(round.match(/([0-9]+) red/)?.[1] ?? "0");
    if (red > redMax) redMax = red;
    const blue = Number(round.match(/([0-9]+) blue/)?.[1] ?? "0");
    if (blue > blueMax) blueMax = blue;

    const green = Number(round.match(/([0-9]+) green/)?.[1] ?? "0");
    if (green > greenMax) greenMax = green;
  }

  //   console.log(id, redMax, blueMax, greenMax);
  powerSum += greenMax * redMax * blueMax;
}

console.log("Possible ids sum", powerSum);
