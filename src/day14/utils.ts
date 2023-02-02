import { getData } from '../utils';

export type Bitmask = [string, string];

export type Memory = [string, number, number];

export async function loadData(trainingData = false): Promise<(Bitmask | Memory)[]> {
  const data = await getData(14, trainingData);

  return data.map((line) => {
    if (line.startsWith('mask')) return line.split(' = ') as [string, string];

    const value = parseInt(line.split(' = ').at(-1), 10);
    return ['mem', parseInt(line.match(/\[(.*?)\]/)[1], 10), value];
  });
}
