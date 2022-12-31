import { join } from 'path';
import readline from 'readline';
import { createReadStream } from 'fs';

export async function getData(day: number, trainingData = false): Promise<string[]> {
  const filename = join(__dirname, '..', `day${day < 10 ? `0${day}` : day}`, `data${trainingData ? '_training' : ''}.txt`);
  const myInterface = readline.createInterface({ input: createReadStream(filename) });

  const result = [];

  return new Promise((resolve) => {
    myInterface
      .on('line', (line: string) => {
        result.push(line);
      })
      .on('close', () => {
        resolve(result);
      });
  });
}
