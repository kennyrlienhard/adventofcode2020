import { loadData, Tile } from './utils';

const IS_TRAINING = false;

async function partOne() {
  const tiles = await loadData(IS_TRAINING);

  const extractLeft = (tile: string[], reverse = false) => {
    const result = tile.map((line) => line[0]);
    return (reverse ? result.reverse() : result).join('');
  };

  const extractRight = (tile: string[], reverse = false) => {
    const result = tile.map((line) => line.at(-1));
    return (reverse ? result.reverse() : result).join('');
  };

  const findBorders = ([id, tile]: Tile) => {
    const others = tiles
      .filter(([i]) => i !== id)
      .map(
        ([i, t]) =>
          [
            i,
            [
              extractLeft(t),
              extractLeft(t, true),
              extractRight(t),
              extractRight(t, true),
              t[0],
              t[0].split('').reverse().join(''),
              t.at(-1),
              t.at(-1).split('').reverse().join(''),
            ],
          ] as [number, string[]]
      );

    const hasLeft = others.find(([, values]) => values.includes(extractLeft(tile)));
    const hasRight = others.find(([, values]) => values.includes(extractRight(tile)));
    const hasBottom = others.find(([, values]) => values.includes(tile.at(-1)));
    const hasTop = others.find(([, values]) => values.includes(tile[0]));

    return [hasLeft, hasRight, hasBottom, hasTop].reduce((acc, val) => acc + (val ? 1 : 0), 0);
  };

  const borders = tiles.map((t) => [t[0], findBorders(t)]);

  return borders.filter((b) => b[1] === 2).reduce((acc, b) => acc * b[0], 1);
}

async function partTwo() {
  const data = await loadData(IS_TRAINING);

  return 0;
}

export async function dayTwenty() {
  return Promise.all([partOne, partTwo].map((puzzle) => puzzle()));
}
