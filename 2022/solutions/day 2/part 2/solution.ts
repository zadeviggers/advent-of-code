import { splitLines } from "../../../utils.ts";

export async function solution(input: string): Promise<string> {
  const rounds = splitLines(input);
  let score = 0;
  for (const round of rounds) {
    let roundScore = 0;
    const [opponent, whatShouldDo] = round.split(" ");
    console.log(whatShouldDo, opponent);
    let state: "loss" | "draw" | "won" = "loss";
    const scores = {
      rock: 1,
      paper: 2,
      scissors: 3,
    };
    switch (whatShouldDo) {
      case "X": {
        // Lose
        state = "loss";
        if (opponent === "A") {
          // Rock
          roundScore += scores.scissors;
        } else if (opponent === "B") {
          // Paper
          roundScore += scores.rock;
        } else if (opponent === "C") {
          // Scissors
          roundScore += scores.paper;
        }
        break;
      }
      case "Y": {
        // Draw
        state = "draw";
        if (opponent === "A") {
          // Rock
          roundScore += scores.rock;
        } else if (opponent === "B") {
          // Paper
          roundScore += scores.paper;
        } else if (opponent === "C") {
          // Scissors
          roundScore += scores.scissors;
        }
        break;
      }
      case "Z": {
        // Win
        state = "won";
        if (opponent === "A") {
          // Rock
          roundScore += scores.paper;
        } else if (opponent === "B") {
          // Paper
          roundScore += scores.scissors;
        } else if (opponent === "C") {
          // Scissors
          roundScore += scores.rock;
        }
        break;
      }
    }

    if (state === "won") roundScore += 6;
    else if (state === "draw") roundScore += 3;

    console.log(roundScore);
    score += roundScore;
  }
  return score.toString();
}
