import { getData } from '../utils';

export async function loadData(trainingData = false): Promise<[time: number, buses: ('x' | number)[]]> {
  const data = await getData(13, trainingData);
  return [parseInt(data[0], 10), data[1].split(',').map((val) => (val === 'x' ? 'x' : parseInt(val, 10))) as ('x' | number)[]];
}
