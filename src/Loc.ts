import { IHash } from "../IHash";

export class Loc {
  constructor(row: number, col: number) {
    this._row = row;

    this._col = col;
  }

  private readonly _row: number;

  private readonly _col: number;

  get row(): number {
    return this._row;
  }

  get col(): number {
    return this._col;
  }

  up(offset?: number): Loc {
    if (typeof offset == "undefined") offset = 1;

    return new Loc(this._row - offset, this._col);
  }

  down(offset?: number): Loc {
    if (typeof offset == "undefined") offset = 1;

    return new Loc(this._row + offset, this._col);
  }

  left(offset?: number): Loc {
    if (typeof offset == "undefined") offset = 1;

    return new Loc(this._row, this._col - offset);
  }

  right(offset?: number): Loc {
    if (typeof offset == "undefined") offset = 1;

    return new Loc(this._row, this._col + offset);
  }

  equals(other: Loc): boolean {
    return this._row == other.row && this._col == other.col;
  }

  add_vector(row: number, col: number): Loc {
    return new Loc(this._row + row, this._col + col);
  }

  static getKropkiCellRowHouseLocs(length: number, row: number): Loc[] {
    const rowHouseLocs: Loc[] = [];

    for (let c = 0; c < length; c++) rowHouseLocs.push(new Loc(row * 2, c * 2));

    return rowHouseLocs;
  }

  static getKropkiCellColHouseLocs(length: number, col: number): Loc[] {
    const colHouseLocs: Loc[] = [];

    for (let r = 0; r < length; r++) colHouseLocs.push(new Loc(r * 2, col * 2));

    return colHouseLocs;
  }

  static getFutoshikiCellRowHouseLocs(length: number, row: number): Loc[] {
    const rowHouseLocs: Loc[] = [];

    for (let c = 0; c < length; c++) rowHouseLocs.push(new Loc(row * 2, c * 2));

    return rowHouseLocs;
  }

  static getFutoshikiCellColHouseLocs(length: number, col: number): Loc[] {
    const colHouseLocs: Loc[] = [];

    for (let r = 0; r < length; r++) colHouseLocs.push(new Loc(r * 2, col * 2));

    return colHouseLocs;
  }

  static getSkyscrapersRowHouseLocs(length: number, row: number): Loc[] {
    const rowHouseLocs: Loc[] = [];

    for (let c = 1; c < length + 1; c++) rowHouseLocs.push(new Loc(row + 1, c));

    return rowHouseLocs;
  }

  static getSkyscrapersColHouseLocs(length: number, col: number): Loc[] {
    const colHouseLocs: Loc[] = [];

    for (let r = 1; r < length + 1; r++) colHouseLocs.push(new Loc(r, col + 1));

    return colHouseLocs;
  }

  static getMathraxRowColHouseLocs(length: number): Loc[][] {
    const locs: Loc[][] = [];

    for (let i = 0; i < length; i++) {
      const rowHouseLocs = Loc.getMathraxCellRowHouseLocs(length, i);

      locs.push(rowHouseLocs);

      const colHouseLocs = Loc.getMathraxCellColHouseLocs(length, i);

      locs.push(colHouseLocs);
    }

    return locs;
  }

  static getMathraxCellRowHouseLocs(length: number, row: number): Loc[] {
    const rowHouseLocs: Loc[] = [];

    for (let c = 0; c < length; c++) rowHouseLocs.push(new Loc(row * 2, c));

    return rowHouseLocs;
  }

  static getMathraxCellColHouseLocs(length: number, col: number): Loc[] {
    const colHouseLocs: Loc[] = [];

    for (let r = 0; r < length; r++) colHouseLocs.push(new Loc(r * 2, col));

    return colHouseLocs;
  }

  static getHouseFromLocs(_gridString: string[][], locs: IHash<Loc>): string[] {
    const house: string[] = [];

    for (const loc of locs) house.push(_gridString[loc.row][loc.col]);

    return house;
  }

  static getSudokuCellRowHouseLocs(length: number, row: number): Loc[] {
    const rowHouseLocs: Loc[] = [];

    for (let c = 0; c < length; c++) rowHouseLocs.push(new Loc(row, c));

    return rowHouseLocs;
  }

  static getSudokuCellColHouseLocs(length: number, col: number): Loc[] {
    const colHouseLocs: Loc[] = [];

    for (let r = 0; r < length; r++) colHouseLocs.push(new Loc(r, col));

    return colHouseLocs;
  }

  get isKropkiRowIntersection(): boolean {
    return this._row % 2 == 0 && this._col % 2 != 0;
  }

  get isKropkiColIntersection(): boolean {
    return this._row % 2 != 0 && this._col % 2 == 0;
  }

  get isKropkiIntersection(): boolean {
    return this.isKropkiRowIntersection || this.isKropkiColIntersection;
  }

  otherIsBelow(other: Loc): boolean {
    return other.row > this._row;
  }

  otherIsRight(other: Loc): boolean {
    return other.col > this._col;
  }

  // isValidKropkiRowIntersection(length: number): boolean {

  //   const gridLength = length * 2 - 1;

  //   return this._row;
  // }

  static getKropkiRowIntersectionLocs(length: number): Loc[] {
    const intersectionLocs: Loc[] = [];

    for (let r = 0; r < length; r++)
      for (let c = 0; c < length - 1; c++)
        intersectionLocs.push(new Loc(r * 2, c * 2 + 1));

    return intersectionLocs;
  }

  static getKropkiColIntersectionLocs(length: number): Loc[] {
    const intersectionLocs: Loc[] = [];

    for (let r = 0; r < length - 1; r++)
      for (let c = 0; c < length; c++)
        intersectionLocs.push(new Loc(r * 2 + 1, c));

    return intersectionLocs;
  }

  static getKropkiIntersectionLocs(length: number): Loc[] {
    const intersectionLocs: Loc[] = [];

    intersectionLocs.push(...Loc.getKropkiRowIntersectionLocs(length));

    intersectionLocs.push(...Loc.getKropkiColIntersectionLocs(length));

    return intersectionLocs;
  }

  static getMoreOrLessFenceLocs(
    _gridString: string[][],
    length: number,
    fence: number
  ): Loc[] {
    const fenceLocs: Loc[] = [];

    for (let r = 0; r < length; r++)
      for (let c = 0; c < length; c++)
        if (
          _gridString[r * 2][c * 2].includes(
            String.fromCharCode(fence + 65).toLowerCase()
          )
        )
          fenceLocs.push(new Loc(r * 2, c * 2));

    return fenceLocs;
  }

  static getSudokuCellFenceHouseLocs(
    _gridString: string[][],
    length: number,
    fence: string
  ): Loc[] {
    const fenceLocs: Loc[] = [];

    for (let r = 0; r < length; r++)
      for (let c = 0; c < length; c++)
        if (_gridString[r][c].includes(fence)) fenceLocs.push(new Loc(r, c));

    return fenceLocs;
  }

  static getSudokuLocs(length: number): Loc[] {
    const locs: Loc[] = [];

    for (let r = 0; r < length; r++)
      for (let c = 0; c < length; c++) locs.push(new Loc(r, c));

    return locs;
  }

  getSurroundingLocs(length: number): Loc[] {
    const locs: Loc[] = [];

    for (let r = this._row - 1; r <= this._row + 1; r++)
      for (let c = this._col - 1; c <= this._col + 1; c++) {
        if (this.equals(new Loc(r, c))) continue;

        if (r < 0 || c < 0) continue;

        if (r >= length || c >= length) continue;

        locs.push(new Loc(r, c));
      }

    return locs;
  }

  toString(): string {
    return `[${this._row},${this._col}]`;
  }

  isNextTo(other: Loc): boolean {
    if (this.inSameRow(other) && Math.abs(this._col - other.col) == 1)
      return true;

    if (this.inSameCol(other) && Math.abs(this._row - other.row) == 1)
      return true;

    return false;
  }

  inSameRow(other: Loc): boolean {
    return this._row == other.row;
  }

  inSameCol(other: Loc): boolean {
    return this._col == other.col;
  }

  isValidKropkiLoc(length: number): boolean {
    if (this._row < 0) return false;

    if (this._col < 0) return false;

    const actualLength = length * 2 - 1;

    if (this._row >= actualLength) return false;

    if (this._col >= actualLength) return false;

    return true;
  }
}


export function north(offset?: number): Loc {
  if (typeof offset == "undefined") offset = 1;

  return new Loc(-offset, 0);
}

export function south(offset?: number): Loc {
  if (typeof offset == "undefined") offset = 1;

  return new Loc(offset, 0);
}

export function west(offset?: number): Loc {
  if (typeof offset == "undefined") offset = 1;

  return new Loc(0, -offset);
}

export function east(offset?: number): Loc {
  if (typeof offset == "undefined") offset = 1;

  return new Loc(0, offset);
}

export const east_south_west = [east(2), south(2), west(2)];
export const east_north_west = [east(2), north(2), west(2)];

export const west_south_east = [west(2), south(2), east(2)];
export const west_north_east = [west(2), north(2), east(2)];

export const north_east_south = [north(2), east(2), south(2)];
export const north_west_south = [north(2), west(2), south(2)];

export const south_east_north = [south(2), east(2), north(2)];
export const south_west_north = [south(2), west(2), north(2)];