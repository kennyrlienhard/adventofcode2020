import { getData } from '../utils';

export const JOLTS_HIGHER = 3;

export async function loadData(trainingData = false): Promise<number[]> {
  const data = (await getData(10, trainingData)).map((line) => parseInt(line, 10)).sort((a, b) => a - b);
  return [0, ...data, data.at(-1) + JOLTS_HIGHER];
}
