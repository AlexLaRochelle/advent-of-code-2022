import * as fs from 'fs';

const lowerCasePriorityOrder = 'abcdefghijklmnopqrstuvwxyz';
const priorityOrder = lowerCasePriorityOrder + lowerCasePriorityOrder.toUpperCase();

const data = fs.readFileSync('day-3/input', 'utf8');
const rucksacks = data.split('\n').slice(0, -1);

const misplacedItems = rucksacks.map((rucksack) => {
  const firstHalf = rucksack.substr(0, rucksack.length/2)
  const secondHalf = rucksack.substr(rucksack.length/2, rucksack.length - 1);

  let misplacedItem;
  for (const char of firstHalf) {
    if (secondHalf.includes(char)) {
      misplacedItem = char;
    }
  }

  if (misplacedItem === undefined) throw ('bad');

  return misplacedItem;
});

const misplacedItemPriorities = misplacedItems.map((item) => {
  return priorityOrder.indexOf(item) + 1; // value starts at 1, not 0
})

const itemsPrioritiesTotal = misplacedItemPriorities.reduce((acc, current) => acc + current, 0);

console.log(itemsPrioritiesTotal);
