const EDGE_LABELS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const EDGE_STATES = [
  ['a', 'b', 'c', 'd', 'e', 'd', 'g', 'b'], // 0°
  ['h', 'a', 'f', 'c', 'd', 'c', 'b', 'a'], // rotate, 90°
  ['g', 'h', 'e', 'f', 'c', 'f', 'a', 'h'], // rotate, 180°
  ['b', 'g', 'd', 'e', 'f', 'e', 'h', 'g'], // rotate 270°
];

const NUM_SIDES = 4;

export enum Direction {
  North = 'N',
  East = 'E',
  South = 'S',
  West = 'W',
}

const SIDES = { [Direction.North]: 0, [Direction.East]: 1, [Direction.South]: 2, [Direction.West]: 3 };

export default class Tile {
  id: number;

  rows: string[];

  flipped = false;

  rotations = 0;

  constructor(id: number, rows: string[]) {
    this.id = id;
    this.rows = rows;
  }

  getEdges() {
    const edges = [
      this.rows[0],
      this.rows.map((r) => r[r.length - 1]).join(''),
      this.rows[this.rows.length - 1],
      this.rows.map((r) => r[0]).join(''),
    ];

    return [...edges, ...edges.map((e) => e.split('').reverse().join(''))];
  }

  edgeFor(label: string) {
    const index = EDGE_LABELS.indexOf(label);
    return this.getEdges()[index];
  }

  hasEdge(edge: string) {
    return this.getEdges().includes(edge);
  }

  getEdgeAt(dir: Direction) {
    const i = this.flipped ? SIDES[dir] + NUM_SIDES : SIDES[dir];
    return this.edgeFor(EDGE_STATES[this.rotations][i]);
  }

  sharedEdges(tile: Tile) {
    return this.getEdges().filter((edge) => tile.getEdges().includes(edge));
  }

  neighbourOf(other: Tile) {
    if (this.id === other.id) return false;
    return this.getEdges().some((edge) => other.getEdges().includes(edge));
  }

  rotate() {
    this.rotations = (this.rotations + 1) % NUM_SIDES;
  }

  flip() {
    this.flipped = !this.flipped;
  }

  count(char: string) {
    return this.rows.map((row) => row.split('').filter((c) => c === char).length).reduce((acc, count) => acc + count, 0);
  }

  length() {
    return this.rows.length;
  }

  width() {
    return this.rows[0].length;
  }

  arrange(dir: Direction, edge: string) {
    if (!this.hasEdge(edge)) return false;

    for (let i = 0; i < 8; i += 1) {
      if (this.getEdgeAt(dir) === edge) return true;
      if (i === NUM_SIDES - 1) this.flip();
      else this.rotate();
    }
  }

  removeBorders() {
    return this.rows.slice(1, -1).map((row) => row.slice(1, -1));
  }

  getRows() {
    let rows = this.rows.map((row) => row.split(''));
    for (let i = 0; i < this.rotations; i += 1) {
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      rows = rows[0].map((_, j) => rows.map((row) => row[j]).reverse());
    }
    if (this.flipped) rows = rows.map((row) => row.reverse());
    return rows.map((row) => row.join(''));
  }
}
