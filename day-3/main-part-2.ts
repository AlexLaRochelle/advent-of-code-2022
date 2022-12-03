import * as fs from 'fs';

const lowerCasePriorityOrder = 'abcdefghijklmnopqrstuvwxyz';
const priorityOrder = lowerCasePriorityOrder + lowerCasePriorityOrder.toUpperCase();

const data = fs.readFileSync('day-3/input', 'utf8');
const rucksacks = data.split('\n').slice(0, -1);

const elfGroups: string[][] = [];
for (let i = 0; i < rucksacks.length; i += 3) {
  elfGroups.push([rucksacks[i], rucksacks[i+1], rucksacks[i+2]]);
}

const groupBadges = elfGroups.map((group) => {
  const groupArrays = group.map((rucksackString) => rucksackString.split('')); // [['a', 'b', 'c'], ['d']]
  return groupArrays[0].find((char) => groupArrays[1].includes(char) && groupArrays[2].includes(char));
});

const groupBadgesPriorities = groupBadges.map((item: any) => priorityOrder.indexOf(item) + 1);
const badgePrioritiesTotal = groupBadgesPriorities.reduce((acc, current) => acc + current, 0);
console.log(badgePrioritiesTotal);
