import Tile from './tile';

export default class TileScanner {
  char: string;

  data: string[];

  size: number;

  constructor(tile: Tile, char: string) {
    this.char = char;
    this.data = tile.rows;
    this.size = tile.length();
  }

  coordinates(img: Tile) {
    return img.getRows().flatMap((row, x) => row.split('').flatMap((_, y) => (row[y] === this.char ? [[x, y]] : [])));
  }

  numImages(img: Tile) {
    let numImages = 0;
    for (let i = 0; i < 8; i += 1) {
      numImages = this.scan(new Tile(img.id, img.getRows()));
      if (numImages > 0) break;
      if (i === 3) img.flip();
      else img.rotate();
    }
    return numImages;
  }

  scan(img: Tile) {
    let numImages = 0;

    const coords = this.coordinates(img);

    for (let dx = 0; dx < this.data.length; dx += 1) {
      for (let dy = 0; dy < this.data[dx].length; dy += 1) {
        const match = coords.map(([x1, y1]) => {
          const x = dx + x1;
          const y = dy + y1;

          if (x < 0 || x >= this.data.length || y < 0 || y >= this.data[dx].length) return false;

          if (this.data[dx + x1][dy + y1] !== this.char) return false;

          return true;
        });
        if (match.every((m) => m)) numImages += 1;
      }
    }
    return numImages;
  }
}
