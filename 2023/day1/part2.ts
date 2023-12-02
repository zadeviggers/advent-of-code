const regex = /\d/g;

const input = `input here`.split("\n");

let sum = 0;

for (const line of input) {
  let frontLine = "";
  for (const char of line) {
    frontLine += char;
    frontLine = frontLine.replace("one", "1");
    frontLine = frontLine.replace("two", "2");
    frontLine = frontLine.replace("three", "3");
    frontLine = frontLine.replace("four", "4");
    frontLine = frontLine.replace("five", "5");
    frontLine = frontLine.replace("six", "6");
    frontLine = frontLine.replace("seven", "7");
    frontLine = frontLine.replace("eight", "8");
    frontLine = frontLine.replace("nine", "9");
  }
  // Do it backwards
  let backLine = "";
  for (const char of line.split("").toReversed().join("")) {
    backLine = char + backLine;
    backLine = backLine.replace("one", "1");
    backLine = backLine.replace("two", "2");
    backLine = backLine.replace("three", "3");
    backLine = backLine.replace("four", "4");
    backLine = backLine.replace("five", "5");
    backLine = backLine.replace("six", "6");
    backLine = backLine.replace("seven", "7");
    backLine = backLine.replace("eight", "8");
    backLine = backLine.replace("nine", "9");
  }

  console.log(line);

  const frontNums = frontLine.match(regex)!;
  const backNums = backLine.match(regex)!;

  let ns;
  if (frontNums.length < 2 && backNums.length < 2) {
    if (frontNums.length < 2) ns = frontNums[0] + "" + frontNums[0];
    else ns = backNums[0] + "" + backNums[0];
  } else ns = `${frontNums[0]}${backNums[backNums.length - 1]}`;
  console.log(ns);
  const num = Number(ns);
  sum += num;
}
console.log(sum);
