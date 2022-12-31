import { loadData, Pattern } from './utils';

const IS_TRAINING = false;

function passwordCountIsValid([min, max, letter, password]: Pattern) {
  const count = password.split('').reduce((acc, val) => acc + (val === letter ? 1 : 0), 0);
  return count >= min && count <= max;
}

function passwordPositionIsValid([min, max, letter, password]: Pattern) {
  const a = password[min - 1] === letter;
  const b = password[max - 1] === letter;
  return !((a && b) || (!a && !b));
}

async function partOne() {
  const data = await loadData(IS_TRAINING);
  return data.reduce((acc, pattern) => acc + (passwordCountIsValid(pattern) ? 1 : 0), 0);
}

async function partTwo() {
  const data = await loadData(IS_TRAINING);
  return data.reduce((acc, pattern) => acc + (passwordPositionIsValid(pattern) ? 1 : 0), 0);
}

export async function dayTwo() {
  return Promise.all([partOne, partTwo].map((puzzle) => puzzle()));
}
