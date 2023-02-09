import { loadData } from './utils';

const IS_TRAINING = false;

async function run(rounds: number) {
  const data = await loadData(IS_TRAINING);

  const memory = data.reduce((acc, val, i) => {
    acc.set(val, i + 1);
    return acc;
  }, new Map());

  let turn = data.length + 1;
  let value = data.at(-1);

  while (turn <= rounds) {
    const nextValue = memory.has(value) ? turn - 1 - memory.get(value) : 0;
    memory.set(value, turn - 1);
    value = nextValue;
    turn += 1;
  }

  return value;
}

async function partOne() {
  return run(2020);
}

async function partTwo() {
  return run(30000000);
}

export async function dayFifteen() {
  return Promise.all([partOne, partTwo].map((puzzle) => puzzle()));
}
