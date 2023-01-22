import { getData } from '../utils';

export enum Command {
  Acc = 'acc',
  Jump = 'jmp',
  NoOperation = 'nop',
}

export async function loadData(trainingData = false): Promise<[Command, number][]> {
  const data = await getData(8, trainingData);

  return data.map((line) => {
    const [cmd, value] = line.split(' ');
    return [cmd as Command, parseInt(value, 10)];
  });
}
