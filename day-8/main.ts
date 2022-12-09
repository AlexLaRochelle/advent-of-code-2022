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

const isTreeVisible = (tree: number, i: number, j: number) => {
  if (i === LEFT_TOP_EDGE || i === BOTTOM_EDGE || j === LEFT_TOP_EDGE || j === RIGHT_EDGE) {
    //console.log(`Tree ${tree} at i=${i} and j=${j} is on the edge`);
    return true;
  }

  let visibleSides = [true, true, true, true]; // ugly

  // checking left
  for (let leftIterator = j - 1; leftIterator >= LEFT_TOP_EDGE; leftIterator--) {
    if (treeGrid[i][leftIterator] >= tree) {
      //console.log(`Tree ${tree} at i=${i} and j=${j} is blocked from the left at leftIterator=${leftIterator} because of value ${treeGrid[i][leftIterator]}`);
      visibleSides[0] = false;
    }
  }

  // checking right
  for (let rightIterator = j + 1; rightIterator <= RIGHT_EDGE; rightIterator++) {
    if (treeGrid[i][rightIterator] >= tree) {
      //console.log(`Tree ${tree} at i=${i} and j=${j} is blocked from the right at rightIterator=${rightIterator} because of value ${treeGrid[i][rightIterator]}`);
      visibleSides[1] = false;
    }
  }

  // checking top
  for (let topIterator = i - 1; topIterator >= LEFT_TOP_EDGE; topIterator--) {
    if (treeGrid[topIterator][j] >= tree) {
      //console.log(`Tree ${tree} at i=${i} and j=${j} is blocked from the top at topIterator=${topIterator} because of value ${treeGrid[topIterator][j]}`);
      visibleSides[2] = false;
    }
  }

  // checking bottom
  for (let bottomIterator = i + 1; bottomIterator <= BOTTOM_EDGE; bottomIterator++) {
    if (treeGrid[bottomIterator][j] >= tree) {
      //console.log(`Tree ${tree} at i=${i} and j=${j} is blocked from the bottom at bottomIterator=${bottomIterator} because of value ${treeGrid[bottomIterator][j]}`);
      visibleSides[3] = false;
    }
  }

  return visibleSides.findIndex((value) => value) >= 0;
}

const totalVisisble = treeGrid.flatMap((treeRow, i) => treeRow.map((tree, j) => isTreeVisible(tree, i, j))).reduce((acc, current) => acc + (current ? 1 : 0), 0);
console.log(totalVisisble);
