import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";
import { IKropkiChain } from "../solvers/IKropkiChain";


export abstract class _BaseKropkiChain implements IKropkiChain {
  abstract findChains(puzzle: IKropkiPuzzle): Loc[][];

  get id(): string {
    return this.constructor.name;
  }

  abstract solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[];

  static solve(puzzle: IKropkiPuzzle, solvers: IKropkiChain[]) {
    const edits: IEdit[] = [];

    while (true) {
      const originalLength = edits.length;

      for (const solver of solvers) {
        for (const chain of solver.findChains(puzzle))
          edits.push(...solver.solve(puzzle, chain));
      }

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
