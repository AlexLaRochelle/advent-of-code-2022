import * as fs from 'fs';

const data = fs.readFileSync('day-8/input', 'utf8');
const lines = data.split('\n').slice(0, -1);

const treeGrid: number[][] = [];

lines.forEach((line, index) => {
  const trees = line.split('').map((tree) => Number(tree));
  treeGrid.push(trees);
});

const LEFT_TOP_EDGE = 0;
const RIGHT_EDGE = treeGrid[0].length - 1;
const BOTTOM_EDGE = treeGrid.length - 1;

const getTreeScenicScore = (tree: number, i: number, j: number) => {
  // if (i === LEFT_TOP_EDGE || i === BOTTOM_EDGE || j === LEFT_TOP_EDGE || j === RIGHT_EDGE) {
  //   //console.log(`Tree ${tree} at i=${i} and j=${j} is on the edge`);
  // }

  let leftViewingDistance = 0;
  // checking left
  for (let leftIterator = j - 1; leftIterator >= LEFT_TOP_EDGE; leftIterator--) {
    leftViewingDistance += 1;
    if (treeGrid[i][leftIterator] >= tree) {
      //console.log(`Tree ${tree} at i=${i} and j=${j} is blocked from the left at leftIterator=${leftIterator} because of value ${treeGrid[i][leftIterator]}`);
      break;
    }
  }

  let rightViewingDistance = 0;

  // checking right
  for (let rightIterator = j + 1; rightIterator <= RIGHT_EDGE; rightIterator++) {
    rightViewingDistance += 1;
    if (treeGrid[i][rightIterator] >= tree) {
      //console.log(`Tree ${tree} at i=${i} and j=${j} is blocked from the right at rightIterator=${rightIterator} because of value ${treeGrid[i][rightIterator]}`);
      break;
    }
  }

  let topViewingDistance = 0;

  // checking top
  for (let topIterator = i - 1; topIterator >= LEFT_TOP_EDGE; topIterator--) {
    topViewingDistance += 1;
    if (treeGrid[topIterator][j] >= tree) {
      //console.log(`Tree ${tree} at i=${i} and j=${j} is blocked from the top at topIterator=${topIterator} because of value ${treeGrid[topIterator][j]}`);
      break;
    }
  }

  let bottomViewingDistance = 0;

  // checking bottom
  for (let bottomIterator = i + 1; bottomIterator <= BOTTOM_EDGE; bottomIterator++) {
    bottomViewingDistance += 1;
    if (treeGrid[bottomIterator][j] >= tree) {
      //console.log(`Tree ${tree} at i=${i} and j=${j} is blocked from the bottom at bottomIterator=${bottomIterator} because of value ${treeGrid[bottomIterator][j]}`);
      break;
    }
  }

  console.log(`The viewing distances for tree=${tree} at i=${i} and j=${j} are left: ${leftViewingDistance}, right: ${rightViewingDistance}, bottom: ${bottomViewingDistance}, top: ${topViewingDistance}`)

  return leftViewingDistance * rightViewingDistance * bottomViewingDistance * topViewingDistance;
}

const allScores = treeGrid.flatMap((treeRow, i) => treeRow.map((tree, j) => getTreeScenicScore(tree, i, j)));

let max = 0;

allScores.forEach((score) => {
  if (score > 95000) console.log(score);
  if (score > max) {
    max = score;
  }
});

//console.log(max);

console.log(allScores.sort((a, b) => b - a)[0]);

