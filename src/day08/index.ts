import { Command, loadData } from './utils';

const IS_TRAINING = false;

function run(instructions: [Command, number][]): [boolean, number] {
  const visited = [] as number[];

  let result = 0;
  let index = 0;
  let terminated = false;

  do {
    const [cmd, value] = instructions[index];

    if (cmd === Command.Acc) {
      result += value;
    }

    visited.push(index);
    terminated = index === instructions.length - 1;
    index += cmd === Command.Jump ? value : 1;
  } while (!visited.includes(index) && !terminated);

  return [terminated, result];
}

function fixInstructions(instructions: [Command, number][], startIndex: number): [number, [Command, number][]] {
  const result = [...instructions];

  for (let i = startIndex; i < instructions.length; i += 1) {
    const [cmd, value] = instructions[i];

    if (cmd === Command.Jump || cmd === Command.NoOperation) {
      result[i] = [cmd === Command.Jump ? Command.NoOperation : Command.Jump, value];
      return [i + 1, result];
    }
  }

  return [result.length - 1, result];
}

async function partOne() {
  const instructions = await loadData(IS_TRAINING);
  return run(instructions)[1];
}

async function partTwo() {
  const data = await loadData(IS_TRAINING);

  let result = 0;
  let terminated = false;
  let index = 0;

  do {
    const [nextIndex, instructions] = fixInstructions(data, index);
    [terminated, result] = run(instructions);
    index = nextIndex;
  } while (!terminated);

  return result;
}

export async function dayEight() {
  return Promise.all([partOne, partTwo].map((puzzle) => puzzle()));
}
