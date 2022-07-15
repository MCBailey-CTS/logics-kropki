import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { IKropkiChain } from "../new_solvers/IKropkiChain";
import { NewTechniques } from "../NewTechniques";
import { cellCandidates } from "../puzzles/KropkiPuzzle";

export abstract class BaseKropkiChain implements IKropkiChain {
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
}


