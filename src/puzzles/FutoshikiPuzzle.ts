import { Hash } from "../../Hash";
import { IHash } from "../../IHash";
import { IEdit } from "../interfaces/IEdit";
import { IFutoshikiPuzzle } from "../interfaces/IFutoshikiPuzzle";
import { Loc } from "../Loc";
import { LocSet } from "../LocSet";
import { NewTechniques } from "../NewTechniques";
import { cellCandidates, KropkiPuzzle } from "./KropkiPuzzle";

export class FutoshikiPuzzle implements IFutoshikiPuzzle {
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

  getCellHash(r: number | Loc, c?: number): IHash {
    return new Hash(this.getCellList(r, c));
  }

  getSurroundingCellLocs(cellLoc: Loc): Loc[] {
    if (cellLoc.row % 2 != 0 || cellLoc.col % 2 != 0)
      throw Error(`Loc ${cellLoc} is not a valid kropki cell loc.`);

    return [
      cellLoc.up(2),
      cellLoc.right(2),
      cellLoc.down(2),
      cellLoc.left(2),
    ].filter((loc) => {
      return loc.isValidKropkiLoc(this.length);
    });
  }

  getFenceLocs(fence: string): Loc[] {
    const locs = [];

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

  get expectedCandidates(): number[] {
    const candidates = [];

    for (let i = 1; i <= this.length; i++) candidates.push(i);

    return candidates;
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

  getRowHouse(loc: Loc): Loc[] {
    return Loc.getKropkiCellRowHouseLocs(this.length, loc.row / 2);
  }

  getColHouse(loc: Loc): Loc[] {
    return Loc.getKropkiCellColHouseLocs(this.length, loc.col / 2);
  }

  getCommonHouses(chain: Loc[]): Loc[][] {
    const houses: Loc[][] = [];

    if (
      chain.every((loc) => {
        return chain[0].row == loc.row;
      })
    ) {
      // console.log(`valid row: ${chain}`);
      houses.push(this.getRowHouse(chain[0]));
    }

    if (
      chain.every((loc) => {
        return chain[0].col == loc.col;
      })
    ) {
      // console.log(`valid col: ${chain}`);

      houses.push(this.getColHouse(chain[0]));
    }

    if (
      this.hasFences &&
      chain.every((loc) => {
        return this.getFence(chain[0]) == this.getFence(loc);
      })
    ) {
      // console.log(`valid fence: ${chain}`);

      houses.push(this.getFenceLocs(this.getFence(chain[0])));
    }

    // console.log('////////////////////////')

    return houses;
  }

  getCellList(r: number | Loc, c?: number): number[] {
    return cellCandidates(this.getCellString(r, c));
  }

  getCellSet(r: number | Loc, c?: number): Set<number> {
    return new Set<number>(this.getCellList(r, c));
  }

  getCellString(r: number | Loc, c?: number): string {
    if (typeof r == "number" && typeof c == "number") return this._grid[r][c];

    if (r instanceof Loc) return this._grid[r.row][r.col];

    throw Error("invalid parameters");
  }

  getHouses(): Loc[][] {
    const houses: Loc[][] = [];

    for (let i = 0; i < this.length; i++) {
      houses.push(this.getRowHouse(new Loc(i * 2, 0)));
      houses.push(this.getColHouse(new Loc(0, i * 2)));
    }

    if (!this.hasFences) return houses;

    for (const fence of this.fences) houses.push(this.getFenceLocs(fence));

    return houses;
  }

  getRowLocsWithCandidate(row: number | Loc, candidate: number): Loc[] {
    if (typeof row == "number")
      return this.getRowLocsWithCandidate(new Loc(row, 0), candidate).filter(
        (loc) => {
          return this.getCellSet(loc).has(candidate);
        }
      );

    return this.getRowHouse(row).filter((loc) => {
      return this.getCellSet(loc).has(candidate);
    });
  }

  getColLocsWithCandidate(col: number | Loc, candidate: number): Loc[] {
    // console.log(`getColLocsWithCandidate, ${col}, ${candidate} `);

    if (typeof col == "number")
      return this.getColLocsWithCandidate(new Loc(0, col), candidate).filter(
        (loc) => {
          return this.getCellSet(loc).has(candidate);
        }
      );

    return this.getColHouse(col).filter((loc) => {
      return this.getCellSet(loc).has(candidate);
    });
  }

  getFenceLocsWithCandidate(fence: string | Loc, candidate: number): Loc[] {
    if (typeof fence == "string")
      return this.getFenceLocs(fence).filter((loc) => {
        return this.getCellSet(loc).has(candidate);
      });

    return this.getFenceLocsWithCandidate(this.getFence(fence), candidate);
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
    // switch (kropki) {
    //   case "b":
    //     if (c0 * 2 == c1 || c1 * 2 == c0) return true;
    //     return false;
    //   case "w":
    //     if (c0 + 1 == c1 || c1 + 1 == c0) return true;
    //     return false;
    //   case ".":
    //     if (c0 * 2 == c1) return false;
    //     if (c1 * 2 == c0) return false;
    //     if (c0 + 1 == c1) return false;
    //     if (c1 + 1 == c0) return false;
    //     return true;
    //   default:
    //     return true;
    // }
    console.log("Need to implement FutoshikiPuzzle.isIntersectionSolved");
    return false;
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

  getCellCandidates(loc: Loc): number[] {
    return cellCandidates(this.getCellString(loc));
  }

  toCellRowString(r: number, c: number): string {
    return `${this._grid[r][c]} `;
  }

  toPuzzleString(): string {
    return this.toString();
  }

  getNeighbors(loc: Loc): Loc[] {
    const locs = new LocSet();

    for (const houseLocs of this.getRowHouses()) {
      if (loc.row == houseLocs[0].row)
        for (const houseLoc of houseLocs) locs.add(houseLoc);
    }

    for (const houseLocs of this.getColHouses())
      if (loc.col == houseLocs[0].col)
        for (const houseLoc of houseLocs) locs.add(houseLoc);

    if (this.hasFences)
      for (const fence of this.fences)
        if (this.getFence(loc) == fence)
          for (const houseLoc of this.getFenceLocs(fence)) locs.add(houseLoc);

    locs.delete(loc);

    return locs.values;
  }

  getRowHouses(): Loc[][] {
    const houses = [];

    for (let i = 0; i < this.length; i++)
      houses.push(Loc.getKropkiCellRowHouseLocs(this.length, i));

    return houses;
  }

  getColHouses(): Loc[][] {
    const houses = [];

    for (let i = 0; i < this.length; i++)
      houses.push(Loc.getKropkiCellColHouseLocs(this.length, i));

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
        nonToKropki = "   ";
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
        const cell0 = this.getCellCandidates(new Loc(r - 1, c * 2));
        const cell1 = this.getCellCandidates(new Loc(r + 1, c * 2));

        if (cell0.length != 1 || cell1.length != 1) return false;

        const c0 = cell0[0];

        const c1 = cell1[0];

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
        const cell0 = this.getCellCandidates(new Loc(r * 2, c - 1));

        const cell1 = this.getCellCandidates(new Loc(r * 2, c + 1));

        if (cell0.length != 1 || cell1.length != 1) return false;

        const c0 = cell0[0];

        const c1 = cell1[0];

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

  getKropkiIntersectionLocs(puzzleLength: number): Loc[] {
    const intersections = new LocSet();

    for (let r = 0; r < puzzleLength - 1; r++)
      for (let c = 0; c < puzzleLength - 1; c++) {
        const tempLoc = new Loc(r * 2 + 1, c * 2 + 1);

        intersections.add(tempLoc.up());
        intersections.add(tempLoc.down());
        intersections.add(tempLoc.left());
        intersections.add(tempLoc.right());
      }

    return intersections.values;
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
}
