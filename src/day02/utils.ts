import { getData } from '../utils';

export type Pattern = [number, number, string, string];

export async function loadData(trainingData = false): Promise<Pattern[]> {
  const data = await getData(2, trainingData);

  return data.map((line) => {
    const [min, max] = line
      .split(' ')[0]
      .split('-')
      .map((val) => parseInt(val, 10));

    const letter = line.split(':')[0].split(' ').at(-1);

    return [min, max, letter, line.split(':').at(-1).trim()];
  });
}
