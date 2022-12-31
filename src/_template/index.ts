import { loadData } from './utils';

const IS_TRAINING = true;

async function partOne() {
  const data = await loadData(IS_TRAINING);

  console.log(data);

  return 0;
}

async function partTwo() {
  const data = await loadData(IS_TRAINING);

  return 0;
}

export async function dayOne() {
  return Promise.all([partOne, partTwo].map((puzzle) => puzzle()));
}
