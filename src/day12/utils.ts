import { getData } from '../utils';

export type Turn = 'R' | 'L';

export type Direction = 'N' | 'E' | 'S' | 'W';

export type Command = Turn | Direction | 'F';

export async function loadData(trainingData = false): Promise<[Command, number][]> {
  const data = await getData(12, trainingData);
  return data.map((line) => [line.slice(0, 1) as Command, parseInt(line.slice(1), 10)]);
}
