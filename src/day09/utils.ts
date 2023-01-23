import { getData } from '../utils';

export async function loadData(trainingData = false): Promise<number[]> {
  const data = await getData(9, trainingData);
  return data.map((value) => parseInt(value, 10));
}
