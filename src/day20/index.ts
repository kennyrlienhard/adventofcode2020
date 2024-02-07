import Image from './image';
import Tile from './tile';
import TileScanner from './tileScanner';
import { loadData } from './utils';

async function partOne() {
  const image = new Image((await loadData()).map(([id, rows]) => new Tile(id, rows)));
  return image.corners().reduce((acc, tile) => acc * tile.id, 1);
}

async function partTwo() {
  const CHAR = '#';

  const MONSTER_DATA = ['..................#.', '#....##....##....###', '.#..#..#..#..#..#...'];

  const MONSTER_SIZE = MONSTER_DATA.map((row) => row.split('').filter((c) => c === CHAR).length).reduce(
    (acc, count) => acc + count,
    0
  );

  const image = new Image((await loadData()).map(([id, rows]) => new Tile(id, rows)));
  image.reassemble();

  const imageTile = new Tile(1, image.exportImage());
  const monster = new Tile(2, MONSTER_DATA);
  const scanner = new TileScanner(imageTile, CHAR);

  return imageTile.count(CHAR) - scanner.numImages(monster) * MONSTER_SIZE;
}

export default [partOne, partTwo];
