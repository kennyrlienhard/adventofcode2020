import { getData } from '../utils';

export async function loadData(trainingData = false): Promise<[number[], number[]]> {
  const result = [];
  let cards = [];

  const data = await getData(22, trainingData);

  for (const line of data) {
    if (line.includes('Player')) {
      if (cards.length) result.push(cards);
      cards = [];
    } else if (line) {
      cards.push(parseInt(line, 10));
    }
  }

  result.push(cards);

  return result as [number[], number[]];
}
