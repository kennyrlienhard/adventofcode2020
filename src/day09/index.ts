import { loadData } from './utils';

const IS_TRAINING = false;

const PREAMBLE_SIZE = IS_TRAINING ? 5 : 25;

function pairsContainValues(pairs: [number, number][], values: [number, number]) {
  const result = pairs.find(([a, b]) => a === values[0] && b === values[1]);
  return Boolean(result);
}

function getPairs(preamble: number[], value: number) {
  const result = [] as [number, number][];

  for (const a of preamble) {
    for (const b of preamble) {
      const pair = [a, b].sort((val1, val2) => val1 - val2) as [number, number];

      if (a + b === value && a !== b && !pairsContainValues(result, pair)) {
        result.push(pair);
      }
    }
  }

  return result;
}

function numberIsValid(preamble: number[], value: number) {
  return getPairs(preamble, value).length > 0;
}

function getInvalidNumber(data: number[], preambleSize: number) {
  for (let index = 0; index < data.length; index += 1) {
    const preamble = data.slice(index, preambleSize + index);

    if (!numberIsValid(preamble, data[index + preambleSize])) {
      return data[index + preambleSize];
    }
  }

  return null;
}

function findContigousSet(data: number[], index: number, search: number): [boolean, number[]] {
  const values = [];
  let count = 0;

  for (let i = index; i < data.length; i += 1) {
    count += data[i];
    values.push(data[i]);

    if (count === search) return [true, values];
    else if (count > search) return [false, values];
  }

  return [false, values];
}

async function partOne() {
  const data = await loadData(IS_TRAINING);
  return getInvalidNumber(data, PREAMBLE_SIZE);
}

async function partTwo() {
  const data = await loadData(IS_TRAINING);

  const invalidNumber = getInvalidNumber(data, PREAMBLE_SIZE);

  for (let index = 0; index < data.length; index++) {
    const [isValid, values] = findContigousSet(data, index, invalidNumber);

    if (isValid) {
      const sortedValues = values.sort((a, b) => a - b);
      return sortedValues.at(0) + sortedValues.at(-1);
    }
  }

  return null;
}

export async function dayNine() {
  return Promise.all([partOne, partTwo].map((puzzle) => puzzle()));
}
