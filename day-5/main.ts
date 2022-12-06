import * as fs from 'fs';

const data = fs.readFileSync('day-5/input', 'utf8');
const lines = data.split('\n').slice(0, -1);

const stacks = [
  ['T', 'V', 'J', 'W', 'N', 'R', 'M', 'S'],
  ['V', 'C', 'P', 'Q', 'J', 'D', 'W', 'B'],
  ['P', 'R', 'D', 'H', 'F', 'J', 'B'],
  ['D', 'N', 'M', 'B', 'P', 'R', 'F'],
  ['B', 'T', 'P', 'R', 'V', 'H'],
  ['T', 'P', 'B', 'C'],
  ['L', 'P', 'R', 'J', 'B'],
  ['W', 'B', 'Z', 'T', 'L', 'S', 'C', 'N'],
  ['G', 'S', 'L']
];
const operations = lines.slice(10);

const splitOperations = operations.map((operation) => {
  const allWords = operation.split(' ');
  return [allWords[1], allWords[3], allWords[5]];
}) as unknown as [string, string, string][]

// splitOperations[0] -> amount
// splitOperations[1] -> from stack
// splitOperations[2] -> to stack

//console.log(stacks);

for (const fullOperation of splitOperations) {
  let amount = Number(fullOperation[0]);
  const fromStack = Number(fullOperation[1]) - 1;
  const toStack = Number(fullOperation[2]) - 1;

  while (amount > 0) {
    amount -= 1;
    // console.log(fromStack);
    // console.log(stacks[fromStack]);
    const crateToMove = stacks[fromStack].shift();
    if (crateToMove === undefined) {
      throw new Error('elo');
    }
    // console.log('crateToMove', crateToMove);
    // console.log('toStack',toStack);
    stacks[toStack].unshift(crateToMove);
  }
}

const topCrates = stacks.map((stack) => stack[0]);
console.log(topCrates);
//console.log(stacks);
