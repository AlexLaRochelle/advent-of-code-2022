import * as fs from 'fs';

const data = fs.readFileSync('day-6/input', 'utf8');
const line = data.split('\n').slice(0, -1)[0];

console.log(line.length);
let theIndex = 0;
for (let i = 3; i < line.length; i++) {
  const substr = line.substr(i - 3, 4).split('').sort();
  if (substr[0] !== substr[1] && substr[1] !== substr[2] && substr[2] !== substr[3]) {
    theIndex = i;
    break;
  }
}

console.log(theIndex + 1);
