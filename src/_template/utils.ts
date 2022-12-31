import { getData } from '../utils';

export async function loadData(trainingData = false): Promise<number[][]> {
  const result = [];

  const data = await getData(1, trainingData);

  for (const line of data) {
  }

  return result;
}
