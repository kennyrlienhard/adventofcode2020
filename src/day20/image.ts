import Tile, { Direction } from './tile';

export default class Image {
  tiles: Tile[];

  dimension: number;

  assembledImage: Tile[][];

  seen = new Set<number>();

  constructor(tiles: Tile[]) {
    this.tiles = tiles;

    this.dimension = Math.sqrt(tiles.length);

    this.assembledImage = Array.from({ length: this.dimension }, () => Array.from({ length: this.dimension }));
  }

  reassemble() {
    const corner = this.corners()[0];

    const neighbours = this.neighborsOf(corner);

    const [[se1], [se2]] = neighbours.map((n) => [corner.sharedEdges(n)]);

    for (let i = 0; i < 8; i += 1) {
      if (se1.includes(corner.getEdgeAt(Direction.East)) && se2.includes(corner.getEdgeAt(Direction.South))) break;
      if (i === 3) corner.flip();
      else corner.rotate();
    }

    this.placeTile(corner, 0, 0);

    this.orient(corner, 0, 0);
  }

  orient(tile: Tile, row: number, col: number) {
    if (row >= this.dimension || col >= this.dimension) return;

    this.neighborsOf(tile).forEach((t) => {
      if (!this.seen.has(t.id)) {
        if (t.hasEdge(tile.getEdgeAt(Direction.East))) {
          t.arrange(Direction.West, tile.getEdgeAt(Direction.East));
          this.placeTile(t, row, col + 1);
          this.orient(t, row, col + 1);
        } else if (t.hasEdge(tile.getEdgeAt(Direction.South))) {
          t.arrange(Direction.North, tile.getEdgeAt(Direction.South));
          this.placeTile(t, row + 1, col);
          this.orient(t, row + 1, col);
        }
      }
    });
  }

  placeTile(tile: Tile, row: number, col: number) {
    const reassembledTile = new Tile(tile.id, tile.getRows());
    this.seen.add(tile.id);
    this.assembledImage[row][col] = reassembledTile;
  }

  neighbors() {
    return this.tiles.map((tile) => [tile, this.neighborsOf(tile)]);
  }

  transpose(img: string[][]) {
    return img[0].map((_, i) => img.map((row) => row[i]));
  }

  neighborsOf(tile: Tile) {
    return this.tiles.filter((t) => tile.neighbourOf(t));
  }

  corners() {
    return this.tiles.filter((tile) => {
      const neighbours = this.tiles.filter((t) => tile.neighbourOf(t));

      return neighbours.length === 2;
    });
  }

  exportImage() {
    return this.assembledImage
      .map((row) => row.map((tile) => tile.removeBorders()))
      .flatMap((tile) => this.transpose(tile))
      .map((tile) => tile.join(''));
  }
}
