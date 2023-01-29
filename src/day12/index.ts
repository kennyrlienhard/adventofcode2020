import { Direction, Turn, loadData } from './utils';

const IS_TRAINING = false;

function updateDirection(direction: Direction, turn: Turn, degrees: number): Direction {
  const DIRECTIONS = ['N', 'E', 'S', 'W'] as Direction[];

  let result = direction;

  for (let i = 0; i < degrees / 90; i += 1) {
    let nextIndex = DIRECTIONS.indexOf(result) + (turn === 'R' ? 1 : -1);
    if (nextIndex < 0) nextIndex = DIRECTIONS.length - 1;
    else if (nextIndex === DIRECTIONS.length) nextIndex = 0;

    result = DIRECTIONS[nextIndex];
  }

  return result;
}

async function partOne() {
  const instructions = await loadData(IS_TRAINING);

  let direction = 'E' as Direction;
  const position = { E: 0, N: 0, S: 0, W: 0 };

  for (const cmd of instructions) {
    if (['E', 'N', 'S', 'W'].includes(cmd[0])) {
      position[cmd[0]] += cmd[1];
    } else if (cmd[0] === 'F') {
      position[direction] += cmd[1];
    } else if (['R', 'L'].includes(cmd[0])) {
      direction = updateDirection(direction, cmd[0] as Turn, cmd[1]);
    }
  }

  return Math.abs(position.E - position.W) + Math.abs(position.N - position.S);
}

function rotateWaypoint(waypoint: { E: number; N: number }, turn: Turn, degrees: number) {
  let result = { ...waypoint };

  for (let i = 0; i < degrees / 90; i += 1) {
    result = { E: (turn === 'L' ? -1 : 1) * result.N, N: (turn === 'L' ? 1 : -1) * result.E };
  }

  return result;
}

async function partTwo() {
  const instructions = await loadData(IS_TRAINING);

  const ship = { E: 0, N: 0 };
  let waypoint = { E: 10, N: 1 };

  for (const cmd of instructions) {
    if (['E', 'N', 'S', 'W'].includes(cmd[0])) {
      waypoint[['N', 'S'].includes(cmd[0]) ? 'N' : 'E'] += (['E', 'N'].includes(cmd[0]) ? 1 : -1) * cmd[1];
    } else if (cmd[0] === 'F') {
      ship.E += cmd[1] * waypoint.E;
      ship.N += cmd[1] * waypoint.N;
    } else if (['R', 'L'].includes(cmd[0])) {
      waypoint = rotateWaypoint(waypoint, cmd[0] as Turn, cmd[1]);
    }
  }

  return Math.abs(ship.E) + Math.abs(ship.N);
}

export async function dayTwelve() {
  return Promise.all([partOne, partTwo].map((puzzle) => puzzle()));
}
