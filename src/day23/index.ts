const IS_TRAINING = true;

const INPUT = IS_TRAINING ? '389125467' : '156794823';

function executePartOne(cups: number[], moves = 100) {
  const n = cups.length;
  let currentCupValue = cups[0];

  const sortedCups = [...cups].sort((a, b) => a - b);
  const [lowestValue] = sortedCups;
  const highestValue = sortedCups[sortedCups.length - 1];

  const pickUp = (startFrom: number) => {
    const result = [];

    for (let i = 0; i < 3; i += 1) {
      let index = startFrom % n;
      if (index >= cups.length) index = 0;
      result.push(cups.splice(index, 1)[0]);
    }

    return result;
  };

  const selectDestinationIndex = (currentCupIndex: number): number => {
    let destinationValue = cups[currentCupIndex] - 1;
    if (destinationValue < lowestValue) destinationValue = highestValue;

    let result = cups.indexOf(destinationValue);

    while (result < 0) {
      destinationValue -= 1;
      if (destinationValue < 1) destinationValue = 9;
      result = cups.indexOf(destinationValue);
    }

    return result;
  };

  const createResult = (exclude: number) => {
    const result = [];
    const index = cups.indexOf(exclude);
    let i = (index + 1) % n;

    while (i !== index) {
      result.push(cups[i]);
      i = (i + 1) % n;
    }

    return result.join('');
  };

  for (let i = 0; i < moves; i += 1) {
    const picked = pickUp(cups.indexOf(currentCupValue) + 1);
    const currentCupIndex = cups.indexOf(currentCupValue);

    cups.splice(selectDestinationIndex(currentCupIndex) + 1, 0, ...picked);

    currentCupValue = cups[(cups.indexOf(currentCupValue) + 1) % n];
  }

  return createResult(1);
}

function partOne() {
  const cups = INPUT.split('').map((val) => parseInt(val, 10));
  return executePartOne(cups);
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function executePartTwo(cups: number[], moves = 100, cupcount = 9) {
  // lookup table storing the next cup;
  const lookup = range(1, cupcount + 1);
  lookup[0] = lookup[lookup.length - 1] = cups[0];

  for (let i = 0; i < cups.length - 1; i += 1) {
    lookup[cups[i]] = cups[i + 1];
  }

  lookup[cups[cups.length - 1]] = Math.max(...cups) + 1;
  let cur = 0;

  for (let c = 0; c <= moves; c++) {
    cur = lookup[cur];
    let ins = cur !== 1 ? cur - 1 : cupcount;
    const p1 = lookup[cur];
    const p2 = lookup[p1];
    const p3 = lookup[p2];

    while (ins === p1 || ins === p2 || ins === p3) {
      ins -= 1;
    }

    if (ins < 1) ins += cupcount;

    [lookup[p3], lookup[ins], lookup[cur]] = [lookup[ins], lookup[cur], lookup[p3]];
  }

  return lookup[1] * lookup[lookup[1]];
}

async function partTwo() {
  const input = INPUT.split('').map((val) => parseInt(val, 10));
  return executePartTwo(input, 1, input.length);
}

export async function dayTwentyThree() {
  return Promise.all([partOne, partTwo].map((puzzle) => puzzle()));
}
