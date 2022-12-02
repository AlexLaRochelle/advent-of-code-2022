import * as fs from 'fs';

const WIN_POINTS = 6;
const DRAW_POINTS = 3;
const LOSS_POINTS = 0;

enum Choice {
  ROCK = 1,
  PAPER = 2,
  SCISSORS = 3
}

const playerChoiceBasedOnOutcome = {
  [Choice.ROCK]: {
    'X': Choice.SCISSORS, // loss
    'Y': Choice.ROCK, // draw
    'Z': Choice.PAPER // win
  },
  [Choice.PAPER]: {
    'X': Choice.ROCK, // loss
    'Y': Choice.PAPER, // draw
    'Z': Choice.SCISSORS // win
  },
  [Choice.SCISSORS]: {
    'X': Choice.PAPER, // loss
    'Y': Choice.SCISSORS, // draw
    'Z': Choice.ROCK // win
  },
}

const opponentInputTranslation = {
  'A': Choice.ROCK,
  'B': Choice.PAPER,
  'C': Choice.SCISSORS
}

type OpponentInput = keyof (typeof opponentInputTranslation);

const outcomeInputTranslation = {
  'X': LOSS_POINTS,
  'Y': DRAW_POINTS,
  'Z': WIN_POINTS
}

type OutcomeInput = keyof (typeof outcomeInputTranslation);

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
  const [opponentChoiceInput, outcome] = (round.split(' ') as [OpponentInput, OutcomeInput]);
  const opponentChoice = opponentInputTranslation[opponentChoiceInput]

  const playerChoice = playerChoiceBasedOnOutcome[opponentChoice][outcome];

  if (opponentChoice === playerChoice) {
    return DRAW_POINTS + playerChoice;
  }

  const isWin = playerWins(playerChoice, opponentChoice);

  return playerChoice + (isWin ? WIN_POINTS : LOSS_POINTS);
});

const totalPoints = roundPoints.reduce((acc, current) => acc + current, 0);
console.log(roundPoints);
console.log(totalPoints);
