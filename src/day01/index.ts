import { loadData } from './utils';

const IS_TRAINING = false;

const TARGET = 2020;

function getUniqueCombos(arr: number[], len: number) {
  const base = arr.length;
  const counter = Array(len).fill(base === 1 ? arr[0] : 0);
  if (base === 1) return [counter];
  const combos = [];
  const increment = (i: number) => {
    if (counter[i] === base - 1) {
      counter[i] = 0;
      increment(i - 1);
    } else {
      counter[i]++;
    }
  };

  for (let i = base ** len; i--; ) {
    const combo = [];
    for (let j = 0; j < counter.length; j += 1) {
      combo.push(arr[counter[j]]);
    }
    combos.push(combo);
    increment(counter.length - 1);
  }

  return combos.filter((values) => new Set(values).size === len);
}

async function partOne() {
  const data = await loadData(IS_TRAINING);
  const result = getUniqueCombos(data, 2).find((item) => item[0] + item[1] === TARGET);
  return result[0] * result[1];
}

async function partTwo() {
  const data = await loadData(IS_TRAINING);
  const result = getUniqueCombos(data, 3).find((item) => item[0] + item[1] + item[2] === TARGET);
  return result[0] * result[1] * result[2];
}

export async function dayOne() {
  return Promise.all([partOne, partTwo].map((puzzle) => puzzle()));
}
