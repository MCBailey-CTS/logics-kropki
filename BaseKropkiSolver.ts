import { IKropkiSolver } from "./IKropkiSolver";
import { IEdit } from "./IEdit";
import { IKropkiPuzzle } from "./IKropkiPuzzle";
import { Loc } from "./Loc";

export abstract class BaseKropkiSolver implements IKropkiSolver {
  abstract get id(): string;

  abstract solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | null;

  solvePuzzle(puzzle: IKropkiPuzzle): IEdit[] {
    const edits: IEdit[] = [];

    for (const loc of puzzle.sudokuCellLocs) {
      const edit = this.solveCell(puzzle, loc);

      if (edit === null) continue;

      edits.push(edit);
    }

    return edits;
  }
}
