import { IHash } from "../../../IHash";
import { _BaseKropkiChain } from "../../abstract/_BaseKropkiChain";
import { Edit } from "../../Edit";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiChain } from "../../interfaces/IKropkiChain";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { IKropkiSolver } from "../../interfaces/IKropkiSolver";
import { Loc } from "../../Loc";
import { cellCandidates } from "../../puzzles/KropkiPuzzle";

export class CrossHatch implements IKropkiChain {
  solve(cellChainLocs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    if (
      this.solveSudokuCrossHatchLocs(
        this.puzzle.grid,
        this.puzzle.length,
        cellChainLocs
      )
    )
      edits.push(new Edit(this.puzzle, new Loc(0, 0), 0, this));

    return edits;
  }

  solveSudokuCrossHatch(_length: number, house: string[]) {
    for (let i = 0; i < _length; i++)
      for (let ii = 0; ii < _length; ii++) {
        if (i == ii) continue;

        const cell = cellCandidates(house[i]);

        if (cell._length != 1) continue;

        house[ii] = house[ii].replace(`${cell._at(0)}`, "_");
      }
  }

  solveSudokuCrossHatchLocs(
    _grid: string[][],
    _length: number,
    locs: IHash<Loc>
  ): boolean {
    const house = Loc.getHouseFromLocs(_grid, locs);

    this.solveSudokuCrossHatch(_length, house);

    let edited = false;

    for (let j = 0; j < _length; j++) {
      const loc = locs._at(j);

      const _length = cellCandidates(_grid[loc.row][loc.col])._length;

      _grid[loc.row][loc.col] = house[j];

      edited =
        _length > cellCandidates(_grid[loc.row][loc.col])._length || edited;
    }

    return edited;
  }
  findChains(): IHash<Loc>[] {
    const chains: IHash<Loc>[] = [];

    for (const house of this.puzzle.getHouses()) chains.push(house);

    return chains;
  }

  __puzzle: IKropkiPuzzle | undefined = undefined;

  get puzzle(): IKropkiPuzzle {
    if (typeof this.__puzzle == "undefined")
      throw Error(`You have not set a puzzle for the solver ${this.id}`);

    return this.__puzzle;
  }

  set puzzle(puzzle: IKropkiPuzzle) {
    if (typeof this.__puzzle != "undefined")
      throw Error(`You can only set a puzzle one time the solver ${this.id}`);

    this.__puzzle = puzzle;
  }

  solvePuzzle(): IEdit[] {
    const edits: IEdit[] = [];

    for (const locs of this.findChains()) edits.push(...this.solve(locs));

    return edits;
  }

  // abstract findChains(): IHash<Loc>[];

  get id(): string {
    return this.constructor.name;
  }

  // abstract solve(cellChainLocs: IHash<Loc>): IEdit[];

  static solve(puzzle: IKropkiPuzzle, solvers: IKropkiSolver[]) {
    const edits: IEdit[] = [];

    for (const solver of solvers) solver.puzzle = puzzle;

    while (true) {
      const originalLength = edits.length;

      for (const solver of solvers) edits.push(...solver.solvePuzzle());

      if (originalLength == edits.length) break;
    }

    return edits;
  }

  getKropkiString(puzzle: IKropkiPuzzle, chain: IHash<Loc>): string {
    let str = "";

    for (let i = 0; i < chain._length - 1; i++) {
      const loc0 = chain._at(i);
      const loc1 = chain._at(i + 1);

      str += puzzle.getCellString(puzzle.getIntersection(loc0, loc1));
    }

    str += puzzle.getCellString(
      puzzle.getIntersection(chain._at(3), chain._at(0))
    );

    return str;
  }

  remove(loc: Loc, ...candidates: number[]): IEdit[] {
    const edits: IEdit[] = [];

    for (const candidate of candidates)
      if (this.puzzle.removeCandidate(loc, candidate))
        edits.push(new Edit(this.puzzle, loc, candidate, this));

    return edits;
  }

  pop_push(chain1: IHash<Loc>) {
    const item = chain1.shift();

    if (typeof item == "undefined") throw Error();

    chain1.push(item);
  }
}
