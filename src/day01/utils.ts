import { getData } from '../utils';

export async function loadData(trainingData = false): Promise<number[]> {
  const data = await getData(1, trainingData);
  return data.map((line) => parseInt(line, 10));
}
