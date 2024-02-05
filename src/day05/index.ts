import { loadData } from './utils';

const IS_TRAINING = false;

function getValue(code: string, startMin: number, startMax: number) {
  const LOWER = ['F', 'L'];

  let min = startMin;
  let max = startMax;

  for (const char of code.slice(0, -1)) {
    const currentMin = min;
    const list = Array.from({ length: max - min + 1 }, (_, i) => i + currentMin);
    const half = Math.ceil(list.length / 2);
    const nextList = LOWER.includes(char) ? list.slice(0, half) : list.slice(half);

    min = nextList[0];
    max = nextList.at(-1);
  }

  return LOWER.includes(code.at(-1)) ? min : max;
}

function getSeatId(row: number, column: number) {
  return row * 8 + column;
}

function getSeat(code: string): [number, number, number] {
  const row = getValue(code.slice(0, 7), 0, 127);
  const column = getValue(code.slice(-3), 0, 7);
  return [getSeatId(row, column), row, column];
}

function createSeats() {
  const result = new Set() as Set<string>;
  for (let row = 0; row < 128; row += 1) {
    for (let column = 0; column < 8; column += 1) {
      result.add(`${row}:${column}`);
    }
  }

  return result;
}

async function partOne() {
  const result = [];
  const data = await loadData(IS_TRAINING);

  for (const code of data) {
    result.push(getSeat(code)[0]);
  }

  return result.sort((a, b) => b - a)[0];
}

async function partTwo() {
  const data = await loadData(IS_TRAINING);
  const seats = createSeats();

  for (const code of data) {
    const [, row, column] = getSeat(code);
    seats.delete(`${row}:${column}`);
  }

  const seatIds = Array.from(seats).map((id) => getSeatId(parseInt(id.split(':')[0], 10), parseInt(id.split(':')[1], 10)));

  return seatIds.find((id) => !seatIds.includes(id - 1) && !seatIds.includes(id + 1));
}

export default [partOne, partTwo];
