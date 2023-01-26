import { JOLTS_HIGHER, loadData } from './utils';

const IS_TRAINING = false;

async function partOne() {
  const adapters = await loadData(IS_TRAINING);
  const result = {};

  for (let i = 1; i < adapters.length; i += 1) {
    const diff = adapters[i] - adapters[i - 1];
    result[diff] = (result[diff] || 0) + 1;
  }

  return result['1'] * result['3'];
}

async function partTwo() {
  const countCombinations = (array: number[], memo = {}) => {
    const key = array.join(`,`);
    if (key in memo) return memo[key];

    let result = 1;

    for (let i = 1; i < array.length - 1; i += 1) {
      if (array[i + 1] - array[i - 1] <= JOLTS_HIGHER) {
        result += countCombinations([array[i - 1], ...array.slice(i + 1)], memo);
      }
    }

    memo[key] = result;
    return result;
  };

  return countCombinations(await loadData(IS_TRAINING));
}

export async function dayTen() {
  return Promise.all([partOne, partTwo].map((puzzle) => puzzle()));
}
