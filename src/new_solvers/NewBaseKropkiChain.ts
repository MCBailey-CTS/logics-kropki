import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { IKropkiChain } from "./IKropkiChain";
import { NewTechniques } from "../NewTechniques";
import { cellCandidates } from "../puzzles/KropkiPuzzle";

export abstract class NewBaseKropkiChain implements IKropkiChain {
  solvePuzzle(puzzle: IKropkiPuzzle): IEdit[] {
    throw new Error("Method not implemented.");
  }

  get id(): string {
    return this.constructor.name;
  }

  abstract isValidString(puzzle: IKropkiPuzzle, kropkiStr: string): boolean;

  abstract solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[];

  static solve(puzzle: IKropkiPuzzle, solvers: IKropkiChain[]) {
    const edits: IEdit[] = [];

    while (true) {
      const originalLength = edits.length;

      for (const cellLoc of puzzle.sudokuCellLocs)
        for (const other0 of puzzle.getSurroundingCellLocs(cellLoc)) {
          if (!other0.isValidKropkiLoc(puzzle.length)) continue;

          const intersection0 = puzzle.getIntersection(cellLoc, other0);

          for (const solver of solvers) {
            if (
              !solver.isValidString(puzzle, puzzle.getCellString(intersection0))
            )
              continue;

            edits.push(...solver.solve(puzzle, [cellLoc, other0]));
          }
        }

      for (const house of puzzle.getHouses()) {
        for (const solver of solvers) {
          if (!solver.isValidString(puzzle, "")) continue;

          edits.push(...solver.solve(puzzle, house));
        }
      }

      if (originalLength == edits.length) break;
    }

    return edits;
  }
}
