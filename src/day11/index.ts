import { loadData } from './utils';

const IS_TRAINING = false;

function getNextSeat(grid: string[][], row: number, col: number, tolerance: number, firstSeat: boolean) {
  const getSeatsToTheLeft = (x: number, y: number) => grid[x].slice(0, y + 1).reverse();

  const getSeatsToTheRight = (x: number, y: number) => grid[x].slice(y);

  const getSeatsToTheTop = (x: number, y: number) => {
    const result = [];
    for (let i = x; i >= 0; i -= 1) result.push(grid[i][y]);
    return result;
  };

  const getSeatsToTheBottom = (x: number, y: number) => {
    const result = [];
    for (let i = x; i < grid.length; i += 1) result.push(grid[i][y]);
    return result;
  };

  const getSeatsToTheBottomLeft = (x: number, y: number) => {
    const result = [];
    for (let i = x; i < grid.length; i += 1) {
      result.push(grid[i][y - (i - x)]);
    }
    return result;
  };

  const getSeatsToTheBottomRight = (x: number, y: number) => {
    const result = [];
    for (let i = x; i < grid.length; i += 1) {
      result.push(grid[i][y + (i - x)]);
    }
    return result;
  };

  const getSeatsToTheTopRight = (x: number, y: number) => {
    const result = [];
    for (let i = x; i >= 0; i -= 1) {
      result.push(grid[i][y + (x - i)]);
    }
    return result;
  };

  const getSeatsToTheTopLeft = (x: number, y: number) => {
    const result = [];
    for (let i = x; i >= 0; i -= 1) {
      result.push(grid[i][y - (x - i)]);
    }
    return result;
  };

  const getSeats = (func: (a: number, b: number) => string[], x: number, y: number) => {
    const result = func(x, y);
    return firstSeat ? result.find((seat) => ['L', '#'].includes(seat)) : result[0];
  };

  const countOccupiedSeats = () => {
    const surroundingSeats = [
      getSeats(getSeatsToTheLeft, row, col - 1),
      getSeats(getSeatsToTheRight, row, col + 1),
      getSeats(getSeatsToTheTop, row - 1, col),
      getSeats(getSeatsToTheBottom, row + 1, col),
      getSeats(getSeatsToTheBottomLeft, row + 1, col - 1),
      getSeats(getSeatsToTheBottomRight, row + 1, col + 1),
      getSeats(getSeatsToTheTopRight, row - 1, col + 1),
      getSeats(getSeatsToTheTopLeft, row - 1, col - 1),
    ];

    return surroundingSeats.reduce((acc, seat) => acc + (seat === '#' ? 1 : 0), 0);
  };

  const seat = grid[row][col];
  const occupiedSeats = countOccupiedSeats();

  if (seat === 'L' && occupiedSeats === 0) return '#';
  if (seat === '#' && occupiedSeats >= tolerance) return 'L';
  return seat;
}

function playRound(grid: string[][], tolerance = 4, firstSeat = false): [grid: string[][], changes: number] {
  const nextGrid = grid.map((row) => [...row]);
  let changes = 0;

  for (let row = 0; row < grid.length; row += 1) {
    for (let col = 0; col < grid[row].length; col += 1) {
      const seat = getNextSeat(grid, row, col, tolerance, firstSeat);
      if (seat !== grid[row][col]) changes += 1;
      nextGrid[row][col] = seat;
    }
  }

  return [nextGrid, changes];
}

async function partOne() {
  let grid = await loadData(IS_TRAINING);
  let changes = 0;

  do {
    [grid, changes] = playRound(grid);
  } while (changes > 0);

  return grid.reduce((sum, row) => sum + row.reduce((rowCount, seat) => rowCount + (seat === '#' ? 1 : 0), 0), 0);
}

async function partTwo() {
  let grid = await loadData(IS_TRAINING);
  let changes = 0;

  do {
    [grid, changes] = playRound(grid, 5, true);
  } while (changes > 0);

  return grid.reduce((sum, row) => sum + row.reduce((rowCount, seat) => rowCount + (seat === '#' ? 1 : 0), 0), 0);
}

export default [partOne, partTwo];
