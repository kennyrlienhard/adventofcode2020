import { loadData } from './utils';

const IS_TRAINING = false;

function solveAdvancedOperation(input: string) {
  let op = input;
  let m: RegExpExecArray;

  while ((m = /.\+./g.exec(op)) != null) {
    const a = op.slice(0, m.index).split(' ').at(-1);
    const b = op.slice(m.index + m[0].length).split(' ')[0];
    op = `${op.slice(0, m.index - a.length)}${eval(`${a}+${b}`)}${op.slice(m.index + m[0].length + b.length)}`;
  }

  return parseInt(eval(op), 10);
}

function solveOperation(input: string) {
  let op = input.split(' ');

  while (op.includes('+') || op.includes('*')) {
    const res = eval(`${op[0]}${op[1]}${op[2]}`);
    op = [res, ...op.slice(3)];
  }

  return parseInt(op[0], 10);
}

function solve(input: string, advanced = false): number {
  let res = input;
  let m: RegExpExecArray;

  const op = advanced ? solveAdvancedOperation : solveOperation;

  while ((m = /\(([^()]+)\)/g.exec(res)) != null) {
    res = `${res.slice(0, m.index)}${op(m[1])}${res.slice(m.index + m[0].length)}`;
  }

  return op(res);
}

async function partOne() {
  const data = await loadData(IS_TRAINING);
  return data.map((val) => solve(val)).reduce((acc, val) => acc + val, 0);
}

async function partTwo() {
  const data = await loadData(IS_TRAINING);
  return data.map((val) => solve(val, true)).reduce((acc, val) => acc + val, 0);
}

export default [partOne, partTwo];
