import { getData } from '../utils';

export enum Directions {
  East = 'e',
  Southeast = 'se',
  Southwest = 'sw',
  West = 'w',
  Northwest = 'nw',
  Northeast = 'ne',
}

export enum Color {
  White = 0,
  Black = 1,
}

export async function loadData(trainingData = false): Promise<string[][]> {
  const data = await getData(24, trainingData);
  return data.map((line) => {
    const directions = [];

    while (line) {
      if (Object.values(Directions).includes((line[0] + line[1]) as Directions)) {
        directions.push(line[0] + line[1]);
      } else {
        directions.push(line[0]);
      }

      line = line.substring(directions.at(-1).length);
    }

    return directions;
  });
}
