import { getData } from '../utils';

export type Food = [string[], string[]];

export async function loadData(trainingData = false): Promise<Food[]> {
  const data = await getData(21, trainingData);

  return data.map((line) => {
    const match = /\(([^)]+)\)/.exec(line);
    return [line.split(' (')[0].split(' '), match ? match[1].replace('contains ', '').split(', ') : []];
  });
}
