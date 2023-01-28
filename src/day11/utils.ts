import { getData } from '../utils';

export async function loadData(trainingData = false): Promise<string[][]> {
  const data = await getData(11, trainingData);
  return data.map((line) => line.split(''));
}
