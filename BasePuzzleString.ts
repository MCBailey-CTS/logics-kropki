import { Loc } from "./Loc";
import { GRID } from "./Types";
import { NewTechniques } from "./NewTechniques";
import { cellCandidates } from "./PuzzleString";
import { LocSet } from "./LocSet";

export abstract class BasePuzzleString {
  abstract solveIntersections(): boolean;

  abstract isIntersectionSolved(
    c0: number,
    intersection: string,
    c1: number
  ): boolean;

  constructor(puzzle: string) {
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

    for (let r = 0; r < this._length; r++)
      for (let c = 0; c < this._length; c++) {
        if (this._grid[r * 2][c * 2].length > 1) continue;

        if (this._grid[r * 2][c * 2] == "_") {
          this.setCellString(defaultCell, r * 2, c * 2);
          // this._grid[r * 2][c * 2] = defaultCell;
          continue;
        }

        let cell = "";

        for (let j = 0; j < this._length; j++) {
          if (this._grid[r * 2][c * 2][0] == `${j + 1}`) cell += `${j + 1}`;
          else cell += "_";
        }
        this._grid[r * 2][c * 2] = cell;
      }

    // check if this puzzle has fences.
    // for must be length of 9, and the first cell must have a length of 10

    this._hasFences = this._length == 9 && this._grid[0][0].length == 10;

    this._dict = new Map<string, Array<Loc>>();

    if (!this._hasFences) return;

    for (let r = 0; r < this._length; r++)
      for (let c = 0; c < this._length; c++) {
        const fence = this._grid[r * 2][c * 2][9];

        if (typeof this._dict.get(fence) == "undefined")
          this._dict.set(fence, new Array<Loc>());

        this._dict.get(fence)?.push(new Loc(r * 2, c * 2));
      }
  }

  private readonly _hasFences: boolean;

  private readonly _dict: Map<string, Array<Loc>>;

  private readonly _id: string;

  private readonly _length: number;

  private readonly _grid: GRID;

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
    return [...this._dict.keys()];
  }

  getLocFence(loc: Loc): string {
    const cell = this.getCellString(loc);

    return cell[9];
  }

  fenceLocs(fence: string): Loc[] {
    const locs = this._dict.get(fence);

    if (typeof locs == "undefined")
      throw new Error(`Puzzle does not have fence key: '${fence}'`);

    return locs;
  }

  setCellString(value: string, loc_r: Loc | number, c?: number) {
    if (loc_r instanceof Loc && typeof c === "undefined") {
      this._grid[loc_r.row][loc_r.col] = value;

      return;
    }

    if (typeof loc_r == "number" && typeof c === "number") {
      this.setCellString(value, new Loc(loc_r, c));

      return;
    }

    throw new Error(`Invalid parameters for setCellString`);
  }

  getCellString(loc: Loc): string {
    try {
      return this._grid[loc.row][loc.col];
    } catch (err) {
      throw new Error(
        `Error occurred when trying to getCellString for Loc: ${loc.toString()}.`
      );
    }
  }

  getCellCandidates(loc: Loc): number[] {
    return cellCandidates(this.getCellString(loc));
  }

  toCellRowString(r: number, c: number): string {
    // cell
    if (c % 2 == 0)
      if (this._length == 9 && this._grid[r][c] == "123456789")
        return `_________ `;
      else return `${this._grid[r][c].padEnd(this._length)} `;
    // kropki
    else return `${this._grid[r][c]} `;
  }

  toIntersectionRowString(r: number, c: number): string {
    const cellLength = this._grid[0][0].length;

    let initialOffset: string;

    let kropkiToNon: string;

    let nonToKropki: string;

    switch (cellLength) {
      case 3:
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
          `Unknown length for toIntersectionRowString '${cellLength}'`
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

  removeCandidate(loc: Loc, ...candidates: number[]): boolean {
    const r = loc.row;

    const c = loc.col;

    const originalLength = cellCandidates(this._grid[loc.row][loc.col]).length;

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

    for (const candidate of candidates)
      this._grid[loc.row][loc.col] = this._grid[loc.row][loc.col].replace(
        `${candidate}`,
        "_"
      );

    return originalLength > cellCandidates(this._grid[loc.row][loc.col]).length;
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

  isSolved(): boolean {
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

  getCellSet(loc: Loc): Set<number> {
    return new Set<number>(this.getCellCandidates(loc));
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

  solvePuzzle(): boolean {
    let edited = false;

    let overall = false;

    while (true) {
      overall = edited || overall;

      edited = false;

      for (let r = 0; r < this._length; r++)
        for (let c = 0; c < this._length; c++)
          edited = this.solveCellIntersections(new Loc(r * 2, c * 2)) || edited;

      // for (const loc of this.getKropkiIntersectionLocs(this.length))
      //   edited = this.solveIntersection(loc) || edited;

      if (edited) continue;

      for (let i = 0; i < this._length; i++) {
        edited =
          NewTechniques.solveSudokuLocs(
            this._grid,
            this._length,
            this.getCellRowHouseLocs(i)
          ) || edited;

        edited =
          NewTechniques.solveSudokuLocs(
            this._grid,
            this._length,
            this.getCellColHouseLocs(i)
          ) || edited;

        // if (this.hasFences) {
        //   for (const fence of this.fences) {
        //     const locs = this.fenceLocs(fence);

        //     edited =
        //       NewTechniques.solveSudokuLocs(this._grid, this._length, locs) ||
        //       edited;
        //   }
        // }

        const fenceLocs: Loc[] = Loc.getMoreOrLessFenceLocs(
          this._grid,
          this._length,
          i
        );

        if (fenceLocs.length > 0)
          edited =
            NewTechniques.solveSudokuLocs(
              this._grid,
              this._length,
              fenceLocs
            ) || edited;
      }

      if (edited) continue;

      break;
    }

    return overall;
  }

  abstract solveCellIntersections(cellLoc: Loc): boolean;
}
