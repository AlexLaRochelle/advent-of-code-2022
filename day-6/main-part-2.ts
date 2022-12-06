import * as fs from 'fs';

const data = fs.readFileSync('day-6/input', 'utf8');
const line = data.split('\n').slice(0, -1)[0];

let theIndex = 0;
for (let i = 13; i < line.length; i++) {
  const substr = line.substr(i - 13, 14).split('');
  const repeatingCharacters = substr.filter((char, index) => [
    ...substr.slice(0, Math.max(index - 1, 0)),
    ...substr.slice(Math.min(index + 1, substr.length -1), substr.length - 1)]
    .includes(char));
  console.log(substr);
  console.log(repeatingCharacters);
  if (repeatingCharacters.length === 0) {
    theIndex = i;
  }
}

console.log(theIndex + 1);
