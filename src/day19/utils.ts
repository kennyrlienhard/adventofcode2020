import { getData } from '../utils';

export async function loadData(trainingData = false): Promise<[string[], string[]]> {
  const rules = [];
  const messages = [];

  (await getData(19, trainingData)).forEach((line) => {
    if (line.includes(':')) {
      const [key, rule] = line.replace(/"/g, '').split(': ');
      rules[parseInt(key, 10)] = rule;
    } else {
      messages.push(line);
    }
  });

  return [rules, messages];
}
