import { getData } from '../utils';

export async function loadData(trainingData = false): Promise<number[]> {
  const data = await getData(15, trainingData);
  return data[0].split(',').map((val) => parseInt(val, 10));
}
