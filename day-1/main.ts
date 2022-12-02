import * as fs from 'fs';

const data = fs.readFileSync('day-1/input', 'utf8');
const elves = data.split('\n\n');

const totalPerElf = elves.map(elf => {
  const items = elf.split('\n').map(item => Number(item));
  return items.reduce((acc, item) => {
    return acc + item;
  }, 0);
});

const maxElf = totalPerElf.reduce((acc, total) => {
  return Math.max(acc, total);
}, 0);

console.log('maxElf', maxElf);

// part 2

const top3 = totalPerElf.sort((a, b) => b - a).slice(0, 3);

const top3Total = top3.reduce((acc, total) => {
  return acc + total;
}, 0);

console.log('top3Total', top3Total);
