const regex = /\d/g;

const input = `input here`;

let sum = 0;

for (const line of input.split("\n")) {
  const nums = line.match(regex)!;
  let ns;
  if (nums.length < 2) ns = nums[0] + "" + nums[0];
  else ns = `${nums[0]}${nums[nums.length - 1]}`;
  const num = Number(ns);
  sum += num;
}
console.log(sum);
