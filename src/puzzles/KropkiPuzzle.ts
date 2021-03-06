import { Hash } from "../../Hash";
import { IHash } from "../../IHash";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { IKropkiSolver } from "../interfaces/IKropkiSolver";
import { Loc } from "../Loc";
import { NewTechniques } from "../NewTechniques";

export function cellCandidates(cell: string): IHash<number> {
  // console.log(`'${cell}'`);

  if (cell == null || typeof cell == "undefined")
    throw Error(`cell is ${cell}`);

  const array = new Hash<number>();

  for (const candidate of cell) {
    if (isNaN(+candidate)) continue;

    array.push(+candidate);
  }

  return array;
}

export class KropkiPuzzle implements IKropkiPuzzle {
  private readonly _edits: IEdit[];

  constructor(puzzle: string) {
    this._edits = [];

    const array = puzzle.split("\n");

    const temp = [];

    for (const t of array) if (t != "") temp.push(t);

    this._grid = [];

    this._id = temp[0].trim();

    this._length = +temp[1].trim();

    for (const t of array) if (t != "") temp.push(t);

    let defaultCell = "";

    for (let candidate = 1; candidate <= this._length; candidate++)
      defaultCell += `${candidate}`;

    const gridLength = this._length * 2 - 1;

    for (let i = 2; i < gridLength + 2; i++) {
      this._grid.push(
        temp[i]
          .trim()
          .replaceAll("  ", " ")
          .replaceAll("  ", " ")
          .replaceAll("  ", " ")
          .replaceAll("  ", " ")
          .replaceAll("  ", " ")
          .replaceAll("  ", " ")
          .replaceAll("  ", " ")
          .replaceAll("  ", " ")
          .replaceAll("  ", " ")
          .split(" ")
      );
    }

    this._edits = [];

    this._hasFences = this._length == 9 && this._grid[0][0].length == 10;

    this._dict = new Map<string, Array<Loc>>();
  }

  // getSurroundingCellLocs(cellLoc: Loc): Loc[] {
  //   if (cellLoc.row % 2 != 0 || cellLoc.col % 2 != 0)
  //     throw Error(`Loc ${cellLoc} is not a valid kropki cell loc.`);

  //   return [
  //     cellLoc.up(2),
  //     cellLoc.right(2),
  //     cellLoc.down(2),
  //     cellLoc.left(2),
  //   ].filter((loc) => {
  //     return loc.isValidKropkiLoc(this.length);
  //   });
  // }

  getFenceLocs(fence: string): IHash<Loc> {
    const locs = new Hash<Loc>();

    for (const loc of this.sudokuCellLocs)
      if (fence === this.getFence(loc)) locs.push(loc);

    return locs;
  }

  getFence(loc: Loc): string {
    return this.getCellString(loc)[this.length];
  }

  get edits(): IEdit[] {
    return this._edits;
  }

  getKropkiCandidates(candidate: number): IHash<number> {
    return new Hash<number>([
      ...this.getKropkiWhiteCandidates(candidate),
      ...this.getKropkiBlackCandidates(candidate),
    ]);
  }

  get expectedCandidates(): IHash<number> {
    const candidates = new Hash<number>();

    for (let i = 1; i <= this.length; i++) candidates.push(i);

    return candidates;
  }

  getKropkiBlackCandidates(candidate: number): IHash<number> {
    const hash = new Hash<number>();

    for (let c = 1; c <= this._length; c++)
      if (candidate * 2 == c || (candidate % 2 == 0 && candidate / 2 == c))
        hash.push(c);

    return hash;
  }

  getCellIntersections(loc: Loc): Loc[] {
    // leftIntersections = [
    //   cellLoc.up(),
    //   cellLoc.up().up(),
    //   cellLoc.down(),
    //   cellLoc.down().down(),
    //   cellLoc.left(),
    //   cellLoc.left().left(),
    //   cellLoc.right(),
    //   cellLoc.right().right(),
    // ];
    return [loc.up(), loc.down(), loc.left(), loc.right()].filter((l) => {});
  }

  getRowHouse(loc: Loc): IHash<Loc> {
    return new Hash<Loc>(
      Loc.getKropkiCellRowHouseLocs(this.length, loc.row / 2)
    );
  }

  getColHouse(loc: Loc): IHash<Loc> {
    return new Hash<Loc>(
      Loc.getKropkiCellColHouseLocs(this.length, loc.col / 2)
    );
  }

  getCommonHouses(chain: IHash<Loc>): IHash<Loc>[] {
    const houses: IHash<Loc>[] = [];

    if (
      [...chain].every((loc) => {
        return chain._at(0).row == loc.row;
      })
    ) {
      // console.log(`valid row: ${chain}`);
      houses.push(this.getRowHouse(chain._at(0)));
    }

    if (
      [...chain].every((loc) => {
        return chain._at(0).col == loc.col;
      })
    ) {
      // console.log(`valid col: ${chain}`);

      houses.push(this.getColHouse(chain._at(0)));
    }

    if (
      this.hasFences &&
      [...chain].every((loc) => {
        return this.getFence(chain._at(0)) == this.getFence(loc);
      })
    ) {
      // console.log(`valid fence: ${chain}`);

      houses.push(this.getFenceLocs(this.getFence(chain._at(0))));
    }

    // console.log('////////////////////////')

    return houses;
  }

  getKropkiWhiteCandidates(candidate: number): IHash<number> {
    const hash = new Hash<number>();

    for (let c = 1; c <= this._length; c++)
      if (candidate + 1 == c || candidate - 1 == c) hash.push(c);

    return hash;
  }

  getCellList(r: number | Loc, c?: number): IHash<number> {
    return cellCandidates(this.getCellString(r, c));
  }

  getCellSet(r: number | Loc, c?: number): IHash<number> {
    return new Hash<number>(this.getCellList(r, c));
  }

  getCellString(r: number | Loc, c?: number): string {
    if (typeof r == "number" && typeof c == "number") return this._grid[r][c];

    if (r instanceof Loc) return this._grid[r.row][r.col];

    throw Error("invalid parameters");
  }

  getHouses(): IHash<Loc>[] {
    const houses: IHash<Loc>[] = [];

    for (let i = 0; i < this.length; i++) {
      houses.push(this.getRowHouse(new Loc(i * 2, 0)));
      houses.push(this.getColHouse(new Loc(0, i * 2)));
    }

    if (!this.hasFences) return houses;

    for (const fence of this.fences) houses.push(this.getFenceLocs(fence));

    return houses;
  }

  getIntersection(loc0: Loc, loc1: Loc): Loc {
    const chain = [loc0, loc1];

    if (chain[0].up(2).equals(chain[1])) return chain[0].up();
    if (chain[0].right(2).equals(chain[1])) return chain[0].right();
    if (chain[0].down(2).equals(chain[1])) return chain[0].down();
    if (chain[0].left(2).equals(chain[1])) return chain[0].left();

    throw Error(`Cannot find intersection between ${loc0} and ${loc1}`);
  }

  isIntersectionSolved(c0: number, kropki: string, c1: number): boolean {
    switch (kropki) {
      case "b":
        if (c0 * 2 == c1 || c1 * 2 == c0) return true;
        return false;
      case "w":
        if (c0 + 1 == c1 || c1 + 1 == c0) return true;
        return false;
      case ".":
        if (c0 * 2 == c1) return false;
        if (c1 * 2 == c0) return false;
        if (c0 + 1 == c1) return false;
        if (c1 + 1 == c0) return false;
        return true;
      default:
        return true;
    }
  }

  protected readonly _hasFences: boolean;

  protected readonly _dict: Map<string, Array<Loc>>;

  protected readonly _id: string;

  protected readonly _length: number;

  protected readonly _grid: string[][];

  get length() {
    return this._length;
  }

  get id() {
    return this._id;
  }

  get grid() {
    return this._grid;
  }

  get hasFences(): boolean {
    return this._hasFences;
  }

  get fences(): string[] {
    const allFences = new Set<string>();

    for (let r = 0; r < this._length; r++)
      for (let c = 0; c < this._length; c++)
        allFences.add(this._grid[r * 2][c * 2][9]);

    return [...allFences];
  }

  get sudokuCellLocs(): Loc[] {
    const locs = [];

    for (let r = 0; r < this._length; r++)
      for (let c = 0; c < this._length; c++) locs.push(new Loc(r * 2, c * 2));

    return locs;
  }

  getLocFence(loc: Loc): string {
    const cell = this.getCellString(loc);

    return cell[9];
  }

  fenceLocs(fence: string): Loc[] {
    const locs: Loc[] = [];

    for (let r = 0; r < this._length; r++)
      for (let c = 0; c < this._length; c++) {
        const temp = this._grid[r * 2][c * 2][9];

        if (temp == fence) locs.push(new Loc(r * 2, c * 2));
      }

    // locs.push(new Loc(r * 2, c * 2));

    // if (typeof locs == "undefined")
    //   throw new Error(`Puzzle does not have fence key: '${fence}'`);

    return locs;
  }

  // // setCellString(value: string, loc_r: Loc | number, c?: number) {
  // //   if (loc_r instanceof Loc && typeof c === "undefined") {
  // //     this._grid[loc_r.row][loc_r.col] = value;

  // //     return;
  // //   }

  //   if (typeof loc_r == "number" && typeof c === "number") {
  //     this.setCellString(value, new Loc(loc_r, c));

  //     return;
  //   }

  //   throw new Error(`Invalid parameters for setCellString`);
  // }

  toCellRowString(r: number, c: number): string {
    if (this.hasFences) {
      let numbers = "";
      let blanks = "";

      for (let i = 0; i < this._length; i++) {
        numbers += `${i + 1}`;
        blanks += "_";
      }

      if (this.getCellString(r, c).includes("_________")) {
      }
      // console.log(`Temp: '${this._grid[r][c]}'`);

      // cell
      if (c % 2 == 0)
        if (this._grid[r][c].startsWith(`${numbers}`))
          return `${blanks}${this._grid[r][c][this._grid[r][c].length - 1]} `;
        else if (this.getCellString(r, c).includes("_________")) {
          return `${"empty".padEnd(this._length)}`;
        } else return `${this._grid[r][c].padEnd(this._length)} `;
      // kropki
      else return `${this._grid[r][c]} `;
    } else {
      let numbers = "";
      let blanks = "";

      for (let i = 0; i < this._length; i++) {
        numbers += `${i + 1}`;
        blanks += "_";
      }

      // cell
      if (c % 2 == 0)
        if (this._grid[r][c] == `${numbers}`) return `${blanks} `;
        else return `${this._grid[r][c].padEnd(this._length)} `;
      // kropki
      else return `${this._grid[r][c]} `;
    }
  }

  toPuzzleString(): string {
    return this.toString();
  }

  // getNeighbors(loc: Loc): Loc[] {
  //   const locs = new LocSet();

  //   for (const houseLocs of this.getRowHouses()) {
  //     if (loc.row == houseLocs[0].row)
  //       for (const houseLoc of houseLocs) locs.add(houseLoc);
  //   }

  //   for (const houseLocs of this.getColHouses())
  //     if (loc.col == houseLocs[0].col)
  //       for (const houseLoc of houseLocs) locs.add(houseLoc);

  //   if (this.hasFences)
  //     for (const fence of this.fences)
  //       if (this.getFence(loc) == fence)
  //         for (const houseLoc of this.getFenceLocs(fence)) locs.add(houseLoc);

  //   locs.delete(loc);

  //   return locs.values;
  // }

  getRowHouses(): IHash<Loc>[] {
    const houses: IHash<Loc>[] = [];

    for (let i = 0; i < this.length; i++) {
      const temp = Loc.getKropkiCellRowHouseLocs(this.length, i);
      houses.push(new Hash<Loc>(temp));
    }

    return houses;
  }

  getColHouses(): IHash<Loc>[] {
    const houses: IHash<Loc>[] = [];

    for (let i = 0; i < this.length; i++)
      houses.push(new Hash<Loc>(Loc.getKropkiCellColHouseLocs(this.length, i)));

    return houses;
  }

  toIntersectionRowString(r: number, c: number): string {
    const cellLength = this._grid[0][0].length;

    // console.log(`'${this._grid[0][0]}'`);
    let initialOffset: string;

    let kropkiToNon: string;

    let nonToKropki: string;

    switch (cellLength) {
      case 3:
        initialOffset = " ";
        kropkiToNon = "  ";
        nonToKropki = "  ";
        break;
      case 4:
        initialOffset = " ";
        kropkiToNon = "  ";
        nonToKropki = "  ";
        break;

      case 5:
        initialOffset = " ";
        kropkiToNon = "  ";
        nonToKropki = "  ";
        break;

      case 6:
        initialOffset = "  ";
        kropkiToNon = "   ";
        nonToKropki = "    ";
        break;
      case 7:
        initialOffset = "   ";
        kropkiToNon = "    ";
        nonToKropki = "    ";
        break;
      case 9:
        initialOffset = "    ";
        kropkiToNon = "     ";
        nonToKropki = "     ";
        break;
      case 10:
        initialOffset = "    ";
        kropkiToNon = "     ";
        nonToKropki = "      ";
        break;
      default:
        throw new Error(
          `Unknown length for toIntersectionRowString '${cellLength}' when accessing [${r}, ${c}]`
        );
    }

    let str = "";

    if (c == 0) str += initialOffset;

    if (c % 2 != 0) str += this._grid[r][c] + kropkiToNon;
    else str += this._grid[r][c] + nonToKropki;

    return str;
  }

  toString(): string {
    let str = "";

    for (let r = 0; r < this._length * 2 - 1; r++) {
      for (let c = 0; c < this._length * 2 - 1; c++)
        if (r % 2 == 0) str += this.toCellRowString(r, c);
        else str += this.toIntersectionRowString(r, c);

      str += "\n";
    }

    return `${this._id}\n${this._length}\n${str}\n`;
  }

  removeUpDownLeftRight(loc: Loc, candidate: number): boolean {
    const leftKropkiLoc = loc.left();

    let edited = false;

    if (
      leftKropkiLoc.col >= 0 &&
      this._grid[leftKropkiLoc.row][leftKropkiLoc.col] == "."
    )
      edited = this.removeCandidate(leftKropkiLoc.left(), candidate) || edited;

    const rightKropkiLoc = loc.right();

    if (
      rightKropkiLoc.col < this._length * 2 - 1 &&
      this._grid[rightKropkiLoc.row][rightKropkiLoc.col] == "."
    )
      edited =
        this.removeCandidate(rightKropkiLoc.right(), candidate) || edited;

    const upKropkiLoc = loc.up();

    if (
      upKropkiLoc.row >= 0 &&
      this._grid[upKropkiLoc.row][upKropkiLoc.col] == "."
    )
      edited = this.removeCandidate(upKropkiLoc.up(), candidate) || edited;

    const downKropkiLoc = loc.down();

    if (
      downKropkiLoc.row < this._length * 2 - 1 &&
      this._grid[downKropkiLoc.row][downKropkiLoc.col] == "."
    )
      edited = this.removeCandidate(downKropkiLoc.down(), candidate) || edited;

    return edited;
  }

  removeCandidate(loc: Loc, candidate: number): boolean {
    const r = loc.row;

    const c = loc.col;

    const originalLength = cellCandidates(this._grid[loc.row][loc.col])._length;

    if (
      r < 0 ||
      c < 0 ||
      r >= this._length * 2 - 1 ||
      c >= this._length * 2 - 1
    )
      throw Error(
        `Cannot remove candidate from location ${loc.toString()} on a grid of length ${
          this._length
        } (${this._length * 2 - 1})`
      );

    const cell = this._grid[loc.row][loc.col];

    if (cell === null || typeof cell == "undefined")
      throw Error(`Cell: [${loc.toString()} is ${cell}]`);

    // for (const candidate of candidates)
    this._grid[loc.row][loc.col] = this._grid[loc.row][loc.col].replace(
      `${candidate}`,
      "_"
    );

    return (
      originalLength > cellCandidates(this._grid[loc.row][loc.col])._length
    );
  }

  getCellColHouseLocs(col: number): Loc[] {
    const colHouseLocs: Loc[] = [];

    for (let r = 0; r < this._length; r++)
      colHouseLocs.push(new Loc(r * 2, col * 2));

    return colHouseLocs;
  }

  getCellRowHouseLocs(row: number): Loc[] {
    const rowHouseLocs: Loc[] = [];

    for (let c = 0; c < this._length; c++)
      rowHouseLocs.push(new Loc(row * 2, c * 2));

    return rowHouseLocs;
  }

  isKropkiColsIntersectionsSolved(): boolean {
    for (let c = 0; c < this.length; c++)
      for (let r = 1; r < this.length * 2 - 1; r += 2) {
        const cell0 = this.getCellList(new Loc(r - 1, c * 2));
        const cell1 = this.getCellList(new Loc(r + 1, c * 2));

        if (cell0._length != 1 || cell1._length != 1) return false;

        const c0 = cell0._at(0);

        const c1 = cell1._at(0);

        if (
          !this.isIntersectionSolved(
            c0,
            this.getCellString(new Loc(r, c * 2)),
            c1
          )
        )
          return false;
      }

    return true;
  }

  isKropkiRowsIntersectionsSolved(): boolean {
    for (let r = 0; r < this.length; r++)
      for (let c = 1; c < this.length * 2 - 1; c += 2) {
        const cell0 = this.getCellList(new Loc(r * 2, c - 1));

        const cell1 = this.getCellList(new Loc(r * 2, c + 1));

        if (cell0._length != 1 || cell1._length != 1) return false;

        const c0 = cell0._at(0);

        const c1 = cell1._at(0);

        if (
          !this.isIntersectionSolved(
            c0,
            this.getCellString(new Loc(r * 2, c)),
            c1
          )
        )
          return false;
      }

    return true;
  }

  get isSolved(): boolean {
    for (let i = 0; i < this._length; i++) {
      if (
        !NewTechniques.isSudokuHouseLocsSolved(
          this._grid,
          this.getCellRowHouseLocs(i),
          this._length
        )
      )
        return false;

      if (
        !NewTechniques.isSudokuHouseLocsSolved(
          this._grid,
          this.getCellColHouseLocs(i),
          this._length
        )
      )
        return false;

      const fenceLocs: Loc[] = Loc.getMoreOrLessFenceLocs(
        this._grid,
        this._length,
        i
      );

      if (fenceLocs.length > 0)
        NewTechniques.isSudokuHouseLocsSolved(
          this._grid,
          fenceLocs,
          this._length
        );
    }

    if (!this.isKropkiRowsIntersectionsSolved()) return false;

    if (!this.isKropkiColsIntersectionsSolved()) return false;

    return true;
  }

  // getCellSet(loc: Loc): Set<number> {
  //   return new Set<number>(this.getCellCandidates(loc));
  // }

  getKropkiIntersectionLocs(puzzleLength: number): IHash<Loc> {
    const intersections = new Hash<Loc>();

    for (let r = 0; r < puzzleLength - 1; r++)
      for (let c = 0; c < puzzleLength - 1; c++) {
        const tempLoc = new Loc(r * 2 + 1, c * 2 + 1);

        intersections.add(tempLoc.up());
        intersections.add(tempLoc.down());
        intersections.add(tempLoc.left());
        intersections.add(tempLoc.right());
      }

    return intersections;
  }

  getIntersectionCellLocs(intersection: Loc): Loc[] {
    if (intersection.row % 2 == 0 && intersection.col % 2 != 0)
      return [intersection.left(), intersection.right()];

    if (intersection.row % 2 != 0 && intersection.col % 2 == 0)
      return [intersection.up(), intersection.down()];

    throw Error(
      `Loc ${intersection.toString()} is not a valid kropki intersection location.`
    );
  }

  kropkiBlack(loc0: Loc, loc1: Loc): boolean {
    let edited = false;

    for (const strCandidate of this.getCellString(loc0)) {
      if (
        strCandidate == "_" ||
        strCandidate == "a" ||
        strCandidate == "b" ||
        strCandidate == "c" ||
        strCandidate == "d" ||
        strCandidate == "e" ||
        strCandidate == "f" ||
        strCandidate == "g" ||
        strCandidate == "h" ||
        strCandidate == "i"
      )
        continue;

      const candidate = +strCandidate;

      let isValid = false;

      for (const otherCandidate of this.getCellString(loc1)) {
        const other = +otherCandidate;

        if (candidate * 2 == other) isValid = true;

        if (candidate / 2 == other) isValid = true;
      }

      if (isValid) continue;

      const length = this.getCellList(loc0)._length;

      this.removeCandidate(loc0, +strCandidate);

      edited = length > this.getCellList(loc0)._length || edited;
    }

    return edited;
  }

  kropkiWhite(loc0: Loc, loc1: Loc) {
    let edited = false;

    for (const strCandidate of this.getCellString(loc0)) {
      if (
        strCandidate == "_" ||
        strCandidate == "a" ||
        strCandidate == "b" ||
        strCandidate == "c" ||
        strCandidate == "d" ||
        strCandidate == "e" ||
        strCandidate == "f" ||
        strCandidate == "g" ||
        strCandidate == "h" ||
        strCandidate == "i"
      )
        continue;

      const candidate = +strCandidate;

      let isValid = false;

      for (const otherCandidate of this.getCellString(loc1)) {
        const other = +otherCandidate;

        if (candidate + 1 == other) isValid = true;

        if (candidate - 1 == other) isValid = true;
      }

      if (isValid) continue;

      const length = this.getCellList(loc0)._length;

      this.removeCandidate(loc0, +strCandidate);

      edited = length > this.getCellList(loc0)._length;
    }

    return edited;
  }

  kropkiEmpty(loc0: Loc, loc1: Loc): boolean {
    let edited = false;

    const cell = this.getCellList(loc1);

    const length = this.getCellList(loc0)._length;

    if (cell._length != 1) return false;

    const solved = cell._at(0);

    if (solved - 1 >= -1) this.removeCandidate(loc0, solved - 1);

    if (solved + 1 <= 9) this.removeCandidate(loc0, solved + 1);

    if (solved % 2 == 0 && solved / 2 >= -1)
      this.removeCandidate(loc0, solved / 2);

    if (solved * 2 < 10) this.removeCandidate(loc0, solved * 2);

    return length > this.getCellList(loc0)._length || edited;
  }

  static isSubset(original: number[], possibleSubset: number[]): boolean {
    let i = 0;
    let j = 0;
    for (i = 0; i < possibleSubset.length; i++) {
      for (j = 0; j < original.length; j++) {
        if (possibleSubset[i] == original[j]) break;
      }

      /* If the above inner loop was
      not broken at all then arr2[i]
      is not present in arr1[] */
      if (j == original.length) return false;
    }

    /* If we reach here then all
    elements of arr2[] are present
    in arr1[] */
    return true;
  }

  static equalSets(arr1: number[], arr2: number[]) {
    const s0 = new Set<number>(arr1);
    const s1 = new Set<number>(arr2);

    if (s0.size != s1.size) return false;

    for (const item of [...s0]) if (!s1.has(item)) return false;

    return true;
  }

  solveCellIntersection(cellLoc0: Loc, kropkiLoc: Loc, cellLoc1: Loc): boolean {
    switch (this.getCellString(kropkiLoc)) {
      case "b":
        return this.kropkiBlack(cellLoc0, cellLoc1);
      case "w":
        return this.kropkiWhite(cellLoc0, cellLoc1);
      case ".":
        return this.kropkiEmpty(cellLoc0, cellLoc1);
      default:
        throw new Error(
          `Unknown kropki string for Loc ${kropkiLoc.toString()} '${this.getCellString(
            kropkiLoc
          )}'`
        );
    }
  }


}
// 1817
