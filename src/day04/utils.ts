import { getData } from '../utils';

export const PASSPORT_KEYS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'];

export interface PassportInterface {
  byr: string;
  iyr: string;
  eyr: string;
  hgt: string;
  hcl: string;
  ecl: string;
  pid: string;
  cid: string;
}

export async function loadData(trainingData = false): Promise<PassportInterface[]> {
  const result = [];

  let passport = {};

  const data = await getData(4, trainingData);

  for (const line of data) {
    if (line) {
      const props = line.split(' ').map((item) => item.split(':'));

      passport = {
        ...passport,
        ...props.reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {}),
      };
    } else {
      result.push(passport);
      passport = {};
    }
  }

  result.push(passport);

  return result;
}
