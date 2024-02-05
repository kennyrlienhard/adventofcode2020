import { loadData } from './utils';

const IS_TRAINING = false;

function dec2bin(dec: number) {
  const value = (dec >>> 0).toString(2);
  return `${Array(36 - value.length)
    .fill(0)
    .join('')}${value}`;
}

function calcBitmask(value: string, mask: string) {
  const result = mask.split('');

  for (let i = 0; i < mask.length; i += 1) {
    if (!['0', '1'].includes(mask[i])) result[i] = value[i];
  }

  return result.join('');
}

function combinations(n: number) {
  const r = [];
  for (let i = 0; i < 1 << n; i += 1) {
    const c = [];
    for (let j = 0; j < n; j += 1) {
      c.push(i & (1 << j) ? '1' : '0');
    }
    r.push(c);
  }
  return r;
}

function calcBitmaskVersion2(value: string, mask: string) {
  const input = mask.split('');

  for (let i = 0; i < mask.length; i += 1) {
    if (mask[i] === '0') input[i] = value[i];
  }

  const result = [];
  const x = input.reduce((acc, val) => acc + (val === 'X' ? 1 : 0), 0);
  const replaceX = combinations(x);

  for (let i = 0; i < replaceX.length; i += 1) {
    const tmp = [...input];
    let index = 0;

    for (let j = 0; j < input.length; j += 1) {
      if (input[j] === 'X') {
        tmp[j] = replaceX[i][index];
        index += 1;
      }
    }

    result.push(tmp.join(''));
  }

  return result;
}

async function partOne() {
  const data = await loadData(IS_TRAINING);

  const memory = {};
  let bitmask = '';

  for (const item of data) {
    if (item[0] === 'mem') memory[item[1]] = calcBitmask(dec2bin(item[2]), bitmask);
    else if (item[0] === 'mask') bitmask = item[1] as string;
  }

  return Object.keys(memory).reduce((acc, key) => acc + parseInt(memory[key], 2), 0);
}

async function partTwo() {
  const data = await loadData(IS_TRAINING);

  const memory = {} as { [key: string]: number };
  let bitmask = '';

  for (const item of data) {
    if (item[0] === 'mem') {
      calcBitmaskVersion2(dec2bin(item[1] as number), bitmask).forEach((address) => {
        memory[`${parseInt(address, 2)}`] = item[2];
      });
    } else if (item[0] === 'mask') bitmask = item[1] as string;
  }

  return Object.keys(memory).reduce((acc, key) => acc + memory[key], 0);
}

export default [partOne, partTwo];
