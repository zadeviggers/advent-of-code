enum RockShape {
  Wide,
  Plus,
  ReverseL,
  Tall,
  Square,
}

type MoveDirection = "<" | ">";

enum ChamberCellState {
  Empty,
  Falling,
  Done,
}

const shapes: Record<RockShape, ChamberCellState[][]> = {
  [RockShape.Wide]: [[1, 1, 1, 1]],
  [RockShape.Plus]: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  [RockShape.ReverseL]: [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  [RockShape.Tall]: [[1], [1], [1], [1]],
  [RockShape.Square]: [
    [1, 1],
    [1, 1],
  ],
};

function* rocks(): Generator<[ChamberCellState[][], RockShape]> {
  let i = 0;
  let counter = 0;

  while (i < 2022) {
    yield [shapes[counter as RockShape], counter];
    i++;
    counter++;
    if (counter > 4) counter = 0;
  }
}

function* repeatingCharacterTape(tape: string): Generator<MoveDirection> {
  for (let i = 0; i < tape.length; i++) {
    yield tape[i] as MoveDirection;
    if (i + 1 === tape.length) i = 0;
  }
}

function* iterateOverMultipleGenerators(...generators: Generator[]) {
  let noneDone = true;
  while (noneDone) {
    const generatorResults = generators.map((g) => g.next());
    if (generatorResults.find((g) => g.done)) return;
    yield generatorResults.map((g) => g.value);
  }
}

export async function solution(input: string): Promise<string> {
  const chamber: [
    ChamberCellState,
    ChamberCellState,
    ChamberCellState,
    ChamberCellState,
    ChamberCellState,
    ChamberCellState,
    ChamberCellState
  ][] = [];
  const directions = repeatingCharacterTape(input);
  for (const [layout, shape] of rocks()) {
    const chamberTop: typeof chamber = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
    for (const line of layout) {
      chamberTop.push([
        0,
        0,
        line[0] ?? 0,
        line[1] ?? 0,
        line[2] ?? 0,
        line[3] ?? 0,
        line[4] ?? 0,
      ]);
    }

    let landed = false;

    while (!landed) {
      let leftMostThingy = 8;
      for (const v of chamberTop) {
        const i = v.findIndex((v) => v === ChamberCellState.Falling);
        if (i < leftMostThingy) leftMostThingy = i;
      }

      let rightMostThingy = -1;
      for (const v of chamberTop) {
        const i = v.reverse().findIndex((v) => v === ChamberCellState.Falling);
        if (i > rightMostThingy) rightMostThingy = i;
      }

      const direction = directions.next().value;

      if (direction === "<" && leftMostThingy > 0) {
        chamberTop.map((v) => {
          const newV = [...v];
          newV.shift();
          newV.push(0);
          return newV;
        });
      }
      if (direction === ">" && rightMostThingy < 7) {
        chamberTop.map((v) => {
          const newV = [...v];
          newV.pop();
          newV.unshift(0);
          return newV;
        });
      }
    }

    chamber.push(...chamberTop);
  }
  return input;
}
