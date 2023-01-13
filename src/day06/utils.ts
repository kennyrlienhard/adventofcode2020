import { getData } from '../utils';

export async function loadData(trainingData = false): Promise<string[][][]> {
  const result = [];
  let group = [];

  const data = await getData(6, trainingData);

  for (const line of data) {
    if (line) {
      group.push(line.split(''));
    } else {
      result.push(group);
      group = [];
    }
  }

  result.push(group);

  return result;
}
