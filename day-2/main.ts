import * as fs from 'fs';

const WIN_POINTS = 6;
const DRAW_POINTS = 3;
const LOSS_POINTS = 0;

enum Choice {
  ROCK = 1,
  PAPER = 2,
  SCISSORS = 3
}

const inputTranslation = {
  'A': 1, // rock
  'X': 1,
  'B': 2, // paper
  'Y': 2,
  'C': 3, // scissors
  'Z': 3
}

type InputType = keyof (typeof inputTranslation);

const playerWins = (playerChoice: Choice, opponentChoice: Choice) => {
  switch (playerChoice) {
    case Choice.ROCK:
      return opponentChoice === Choice.SCISSORS;
    case Choice.PAPER:
      return opponentChoice === Choice.ROCK;
    case Choice.SCISSORS:
      return opponentChoice === Choice.PAPER;
  }
}

const data = fs.readFileSync('day-2/input', 'utf8');
const rounds = data.split('\n').slice(0, -1);

const roundPoints = rounds.map((round) => {
  const [opponentChoice, playerChoice] = (round.split(' ') as [InputType, InputType]).map((choiceInput: InputType) => inputTranslation[choiceInput]);

  if (opponentChoice === playerChoice) {
    return DRAW_POINTS + playerChoice;
  }

  const isWin = playerWins(playerChoice, opponentChoice);

  return playerChoice + (isWin ? WIN_POINTS : LOSS_POINTS);
});

const totalPoints = roundPoints.reduce((acc, current) => acc + current, 0);
console.log(roundPoints);
console.log(totalPoints);

// const totalPerElf = elves.map(elf => {
//   const items = elf.split('\n').map(item => Number(item));
//   return items.reduce((acc, item) => {
//     return acc + item;
//   }, 0);
// });
//
// const maxElf = totalPerElf.reduce((acc, total) => {
//   return Math.max(acc, total);
// }, 0);

// console.log('maxElf', maxElf);

// part 2
