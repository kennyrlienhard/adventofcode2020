import { getData } from '../utils';

export type Tile = [number, string[]];

export async function loadData(trainingData = false): Promise<Tile[]> {
  const result = [];

  let id = 0;
  let tile = [];

  const data = await getData(20, trainingData);

  for (const line of data) {
    if (line.includes('Tile')) {
      if (id) result.push([id, tile]);
      id = parseInt(line.split(' ')[1].replace(':', ''), 10);
      tile = [];
    } else if (line) {
      tile.push(line);
    }
  }

  result.push([id, tile]);

  return result;
}
