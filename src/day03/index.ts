import { loadData } from './utils';

const IS_TRAINING = false;

function countTrees(trees: string[], right: number, down: number) {
  let result = 0;
  let x = right;

  for (let y = down; y < trees.length; y += down) {
    const adjustedX = x % trees[0].length;
    if (trees[y][adjustedX] === '#') result += 1;
    x += right;
  }

  return result;
}

async function partOne() {
  const DOWN = 1;
  const RIGHT = 3;

  return countTrees(await loadData(IS_TRAINING), RIGHT, DOWN);
}

async function partTwo() {
  const data = await loadData(IS_TRAINING);

  return [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]
    .map(([right, down]) => countTrees(data, right, down))
    .reduce((acc, val) => acc * val, 1);
}

export async function dayThree() {
  return Promise.all([partOne, partTwo].map((puzzle) => puzzle()));
}
