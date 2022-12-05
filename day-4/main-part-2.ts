import * as fs from 'fs';

const data = fs.readFileSync('day-4/input', 'utf8');
const assignmentPairs = data.split('\n').slice(0, -1);

const checkForOverlap = (assignmentPair: string) => {
  const [firstAssignment, secondAssignment] = assignmentPair.split(',');
  const [firstId, secondId] = firstAssignment.split('-').map((id) => Number(id));
  const [otherFirstId, otherSecondId] = secondAssignment.split('-').map((id) => Number(id));

  return !(firstId > otherSecondId || secondId < otherFirstId);
}

const totalOverlappingPairs = assignmentPairs.reduce((acc, current) => acc + (checkForOverlap(current) ? 1 : 0), 0)
console.log(totalOverlappingPairs);
