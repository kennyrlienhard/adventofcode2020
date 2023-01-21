import { getData } from '../utils';

export interface BagInterface {
  name: string;
  bags: [number, string][];
}

export async function loadData(trainingData = false): Promise<BagInterface[]> {
  const parseLine = (line: string) => {
    const bags = [];
    const numbers = line.matchAll(/\d+/g);

    for (const match of numbers) {
      const bagName = line
        .slice(match.index + match[0].length)
        .split(/bag(s)?/)[0]
        .trim();

      bags.push([parseInt(match[0], 10), bagName]);
    }

    return { name: line.split(/bag(s)?/)[0].trim(), bags };
  };

  const data = await getData(7, trainingData);
  return data.map(parseLine);
}
