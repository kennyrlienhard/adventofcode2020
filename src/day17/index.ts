/* eslint-disable @typescript-eslint/no-loop-func */
import { Coord, Cube, loadData } from './utils';

const IS_TRAINING = false;

const CYCLES = 6;

function getNeighbours(coord: Coord, cubes: Map<string, Cube>, has4Dimensions = false) {
  const result = [] as Cube[];
  const [x, y, z, w] = coord;
  const id = coord.join(';');

  const addCube = (key: string, values: Coord) => {
    if (key !== id) {
      if (cubes.has(key)) result.push(cubes.get(key));
      else result.push([values, false]);
    }
  };

  for (let i = x - 1; i <= x + 1; i += 1) {
    for (let j = y - 1; j <= y + 1; j += 1) {
      for (let k = z - 1; k <= z + 1; k += 1) {
        if (has4Dimensions) {
          for (let l = w - 1; l <= w + 1; l += 1) addCube([i, j, k, l].join(`;`), [i, j, k, l]);
        } else {
          addCube([i, j, k].join(`;`), [i, j, k]);
        }
      }
    }
  }

  return result;
}

function getState(id: string, active: number, cubes: Map<string, Cube>) {
  if (cubes.has(id) && cubes.get(id)[1]) return active === 2 || active === 3;
  return active === 3;
}

function getMinMaxCoordinates(cubes: Map<string, Cube>) {
  const xValues = [] as number[];
  const yValues = [] as number[];
  const zValues = [] as number[];
  const wValues = [] as number[];

  cubes.forEach((cube) => {
    xValues.push(cube[0][0]);
    yValues.push(cube[0][1]);
    zValues.push(cube[0][2]);
    wValues.push(cube[0][3]);
  });

  return [
    [Math.min(...xValues), Math.max(...xValues)],
    [Math.min(...yValues), Math.max(...yValues)],
    [Math.min(...zValues), Math.max(...zValues)],
    [Math.min(...wValues), Math.max(...wValues)],
  ];
}

async function runProgram(has4Dimensions = false) {
  let cubes = await loadData(IS_TRAINING, has4Dimensions);

  for (let cycle = 0; cycle < CYCLES; cycle += 1) {
    const nextCubes = new Map();
    const [[minX, maxX], [minY, maxY], [minZ, maxZ], [minW, maxW]] = getMinMaxCoordinates(cubes);

    const addCube = (coord: Coord) => {
      const id = coord.join(`;`);
      const neighbours = getNeighbours(coord, cubes, has4Dimensions);
      const activeNeighbours = neighbours.filter((n) => n[1]).length;
      nextCubes.set(id, [coord, getState(id, activeNeighbours, cubes)]);
    };

    for (let x = minX - 1; x <= maxX + 1; x += 1) {
      for (let y = minY - 1; y <= maxY + 1; y += 1) {
        for (let z = minZ - 1; z <= maxZ + 1; z += 1) {
          if (has4Dimensions) {
            for (let w = minW - 1; w <= maxW + 1; w += 1) addCube([x, y, z, w] as Coord);
          } else {
            addCube([x, y, z] as Coord);
          }
        }
      }
    }

    cubes = nextCubes;
  }

  return cubes;
}

async function partOne() {
  const cubes = await runProgram();
  return [...cubes.values()].reduce((acc, cube) => acc + (cube[1] ? 1 : 0), 0);
}

async function partTwo() {
  const cubes = await runProgram(true);
  return [...cubes.values()].reduce((acc, cube) => acc + (cube[1] ? 1 : 0), 0);
}

export default [partOne, partTwo];
