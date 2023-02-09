import { getData } from '../utils';

export type Ticket = number[];

export type Rule = [string, [number, number], [number, number]];

export async function loadData(trainingData = false): Promise<[Rule[], Ticket[]]> {
  const rules = [];
  const tickets = [];
  let parseRules = true;

  const data = await getData(16, trainingData);

  for (const line of data) {
    if (!line || line.includes('your ticket') || line.includes('nearby tickets')) {
      parseRules = false;
      continue;
    }

    if (parseRules) {
      const [name, values] = line.split(': ');
      const [rule1, rule2] = values.split(' or ');
      rules.push([name, rule1.split('-').map((v) => parseInt(v, 10)), rule2.split('-').map((v) => parseInt(v, 10))]);
    } else {
      tickets.push(line.split(',').map((v) => parseInt(v, 10)));
    }
  }

  return [rules, tickets];
}
