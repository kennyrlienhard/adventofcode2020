import { loadData } from './utils';

const IS_TRAINING = false;

function countAllAnswers(group: string[][]) {
  return new Set(group.flat()).size;
}

function countUniqueAnswers(group: string[][]) {
  const result = [];

  const answers = Array.from(new Set(group.flat()));

  for (const answer of answers) {
    if (group.filter((person) => person.includes(answer)).length === group.length) {
      result.push(answer);
    }
  }

  return result.length;
}

async function partOne() {
  const data = await loadData(IS_TRAINING);
  return data.map(countAllAnswers).reduce((acc, val) => acc + val, 0);
}

async function partTwo() {
  const data = await loadData(IS_TRAINING);
  return data.map(countUniqueAnswers).reduce((acc, val) => acc + val, 0);
}

export default [partOne, partTwo];
