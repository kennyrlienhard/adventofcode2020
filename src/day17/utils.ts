import { getData } from '../utils';

export type Coord = [number, number, number, number?];

export type Cube = [Coord, boolean];

export async function loadData(trainingData = false, with4Dimensions = false): Promise<Map<string, Cube>> {
  const result = new Map();

  const data = await getData(17, trainingData);

  data.forEach((line, x) => {
    const states = line.split('');

    states.forEach((state, y) => {
      const coord = [x, y, 0, ...(with4Dimensions ? [0] : [])];
      result.set(coord.join(';'), [coord, state === '#']);
    });
  });

  return result;
}
