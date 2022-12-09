import * as fs from 'fs';

const data = fs.readFileSync('day-9/input', 'utf8');
const lines = data.split('\n').slice(0, -1);

const startingI = 0;
const startingJ = 0;

enum Direction {
  RIGHT = "R",
  UP = "U",
  LEFT = "L",
  DOWN = "D"
}

interface Knot {
  i: number;
  j: number;
  index: number;
}

const knots: Knot[] = new Array(10).fill(undefined).map(u => ({i: startingI, j: startingJ, index: 0}));
knots.forEach((knot, i) => {
  knot.index = i;
});

const instructions = lines.map((line) => {
  const [direction, value] = line.split(' ') as [Direction, string];
  return { direction, value: parseInt(value) };
});

const visited = new Set<string>();
visited.add(`${startingI},${startingJ}`)

const calcTailMove = (targetKnot: Knot, currentKnot: Knot) => {
  if (currentKnot.i - targetKnot.i >= 2) {
    // tail will need to move down
    currentKnot.i -= 1;
    if (currentKnot.j - targetKnot.j >= 1) {
      // move diagonally down-left
      currentKnot.j -= 1;
    } else if (targetKnot.j - currentKnot.j >= 1) {
      // move diagonally down-right
      currentKnot.j += 1;
    }
  }
  if (targetKnot.i - currentKnot.i  >= 2) {
    // tail will need to move up
    currentKnot.i += 1;
    if (currentKnot.j - targetKnot.j >= 1) {
      // move diagonally up-left
      currentKnot.j -= 1;
    } else if (targetKnot.j - currentKnot.j >= 1) {
      // move diagonally up-right
      currentKnot.j += 1;
    }
  }
  if (currentKnot.j - targetKnot.j >= 2) {
    // tail will need to move left
    currentKnot.j -= 1;
    if (currentKnot.i - targetKnot.i >= 1) {
      // move diagonally down-left
      currentKnot.i -= 1;
    } else if (targetKnot.i - currentKnot.i >= 1) {
      // move diagonally up-left
      currentKnot.i += 1;
    }
  }
  if (targetKnot.j - currentKnot.j >= 2) {
    // tail will need to move right
    currentKnot.j += 1;
    if (currentKnot.i - targetKnot.i >= 1) {
      // move diagonally down-right
      currentKnot.i -= 1;
    } else if (targetKnot.i - currentKnot.i >= 1) {
      // move diagonally up-right
      currentKnot.i += 1;
    }
  }
}

instructions.forEach(({direction, value}) => {
  let counter = value;

  while (counter > 0) {
    counter--;

    switch (direction) {
      case Direction.DOWN:
        knots[0].i -= 1;
        break;
      case Direction.UP:
        knots[0].i += 1;
        break;
      case Direction.LEFT:
        knots[0].j -= 1;
        break;
      case Direction.RIGHT:
        knots[0].j += 1;
        break;
    }

    for (let i = 0; i < knots.length - 1; i++) { // skipping the last knot as there are no knots following it
      calcTailMove(knots[i], knots[i + 1]);
    }
    visited.add(`${knots[knots.length - 1].i},${knots[knots.length - 1].j}`); // the tail

    // console.log(knots);
    // testing
    // const grid = new Array(20).fill(new Array(20).fill(0));
    // knots.forEach((knot) => grid[knot.i + 10][knot.j + 10] = grid[knot.i + 10][knot.j + 10]);
    // console.log(grid);
  }
});

console.log('Final head position:', knots[0].i, knots[0].j);
console.log('Final tail position:', knots[knots.length - 1].i, knots[knots.length - 1].j);

console.log(visited);

console.log(visited.size);
