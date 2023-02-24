import { Color, Directions, loadData } from './utils';

const IS_TRAINING = false;

const move = {
  [Directions.East]: [1, 0],
  [Directions.Southeast]: [1, -1],
  [Directions.Southwest]: [0, -1],
  [Directions.West]: [-1, 0],
  [Directions.Northwest]: [-1, 1],
  [Directions.Northeast]: [0, 1],
};

function installFloor(tiles: string[][]): Set<string> {
  const result = new Set() as Set<string>;

  for (const directions of tiles) {
    const start = [0, 0];

    for (const direction of directions) {
      start[0] += move[direction][0];
      start[1] += move[direction][1];
    }

    const key = start.join(';');
    const color = result.has(key) ? Color.White : Color.Black;

    if (color === Color.Black) result.add(key);
    else if (result.has(key)) result.delete(key);
  }

  return result;
}

async function partOne() {
  const tiles = await loadData(IS_TRAINING);
  return installFloor(tiles).size;
}

async function partTwo() {
  const DAYS = 100;

  const floor = installFloor(await loadData(IS_TRAINING));

  const getColor = (color: Color, countBlack: number) => {
    if (color === Color.Black && (countBlack === 0 || countBlack > 2)) return Color.White;
    if (color === Color.White && countBlack === 2) return Color.Black;

    return color;
  };

  let blackTiles = new Set([...floor.keys()]);

  const blackTilesHas = (coor: [number, number]) => blackTiles.has(coor.join(';'));

  const getNeighbours = (coor: [number, number]) => Object.values(move).map(([dx, dy]) => [coor[0] + dx, coor[1] + dy]);

  for (let i = 0; i < DAYS; i += 1) {
    const newBlackTiles = new Set() as Set<string>;

    const inScope = [...blackTiles.keys()]
      .map((key) => {
        const coor = key.split(';').map((val) => parseInt(val, 10));
        return [coor, ...getNeighbours(coor as [number, number])];
      })
      .flat() as [number, number][];

    for (const coor of inScope) {
      const id = coor.join(';');
      const countBlack = getNeighbours(coor).filter(blackTilesHas).length;
      const color = getColor(blackTiles.has(id) ? Color.Black : Color.White, countBlack);

      if (color === Color.Black) newBlackTiles.add(id);
      else newBlackTiles.delete(id);
    }

    blackTiles = newBlackTiles;
  }

  return blackTiles.size;
}

export async function dayTwentyFour() {
  return Promise.all([partOne, partTwo].map((puzzle) => puzzle()));
}
