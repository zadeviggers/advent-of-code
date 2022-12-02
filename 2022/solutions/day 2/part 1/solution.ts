import { splitLines } from "../../../utils.ts";

export async function solution(input: string): Promise<string> {
  const rounds = splitLines(input);
  let score = 0;
  for (const round of rounds) {
    let roundScore = 0;
    const [opponent, you] = round.split(" ");
    console.log(you, opponent);
    switch (you) {
      case "X": {
        // Rock
        roundScore += 1;
        if (opponent == "C") {
          // Scissors
          roundScore += 6;
        } else if (opponent === "A") {
          score += 3;
        }
        break;
      }
      case "Y": {
        // Paper
        roundScore += 2;
        if (opponent == "A") {
          // Rock
          roundScore += 6;
        } else if (opponent === "B") {
          score += 3;
        }
        break;
      }
      case "Z": {
        // Scissors
        roundScore += 3;
        if (opponent == "B") {
          // Paper
          roundScore += 6;
        } else if (opponent === "C") {
          score += 3;
        }
        break;
      }
    }
    console.log(roundScore);
    score += roundScore;
  }
  return score.toString();
}
