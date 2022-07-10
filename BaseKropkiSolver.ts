import { IEdit, IKropkiPuzzle, IKropkiSolver } from "./IKropkiSolver";
import { Loc } from "./Loc";

export abstract class BaseKropkiSolver implements IKropkiSolver {
  abstract get id(): string;

  solvePuzzle(puzzle: IKropkiPuzzle): IEdit[] {
    const edits: IEdit[] = [];

    for (const loc of puzzle.sudokuCellLocs) {
      const edit = this.solveCell(puzzle, loc);

      if (edit === null) continue;

      edits.push(edit);
    }

    return edits;
  }

  abstract solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | null;
}