import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { IKropkiSolver } from "../interfaces/IKropkiSolver";
import { Loc } from "../Loc";
import { IKropkiChain } from "../interfaces/IKropkiChain";
import { IFutoshikiPuzzle } from "../interfaces/IFutoshikiPuzzle";
import { IFutoshikiSolver } from "../interfaces/IFutoshikiSolver";

export abstract class _BaseKropkiChain implements IKropkiChain {
  solvePuzzle(puzzle: IKropkiPuzzle): IEdit[] {
    const edits: IEdit[] = [];

    for (const locs of this.findChains(puzzle))
      edits.push(...this.solve(puzzle, locs));

    return edits;
  }

  abstract findChains(puzzle: IKropkiPuzzle): Loc[][];

  get id(): string {
    return this.constructor.name;
  }

  abstract solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[];

  static solve(puzzle: IKropkiPuzzle, solvers: IKropkiSolver[]) {
    const edits: IEdit[] = [];

    while (true) {
      const originalLength = edits.length;

      for (const solver of solvers) edits.push(...solver.solvePuzzle(puzzle));

      if (originalLength == edits.length) break;
    }

    return edits;
  }

  static solveFutoshiki(puzzle: IFutoshikiPuzzle, solvers: IFutoshikiSolver[]) {
    const edits: IEdit[] = [];

    while (true) {
      const originalLength = edits.length;

      for (const solver of solvers) edits.push(...solver.solvePuzzle(puzzle));

      if (originalLength == edits.length) break;
    }

    return edits;
  }

  getKropkiString(puzzle: IKropkiPuzzle, chain: Loc[]): string {
    let str = "";

    for (let i = 0; i < chain.length - 1; i++) {
      const loc0 = chain[i];
      const loc1 = chain[i + 1];

      str += puzzle.getCellString(puzzle.getIntersection(loc0, loc1));
    }

    str += puzzle.getCellString(puzzle.getIntersection(chain[3], chain[0]));

    return str;
  }

  remove(puzzle: IKropkiPuzzle, loc: Loc, ...candidates: number[]): IEdit[] {
    const edits: IEdit[] = [];

    for (const candidate of candidates)
      if (puzzle.removeCandidate(loc, candidate))
        edits.push(new Edit(puzzle, loc, candidate, this));

    return edits;
  }

  pop_push(chain1: Loc[]) {
    const item = chain1.shift();

    if (typeof item == "undefined") throw Error();

    chain1.push(item);
  }
}
