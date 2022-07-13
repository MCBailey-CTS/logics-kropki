import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { IKropkiSolver } from "../interfaces/IKropkiSolver";
import { Loc } from "../Loc";


export abstract class BaseKropkiSolveCell implements IKropkiSolver {

  abstract get id(): string;

  solvePuzzle(puzzle: IKropkiPuzzle): IEdit[] {
    const edits = [];

    for (const loc of puzzle.sudokuCellLocs) {
      const edit = this.solveCell(puzzle, loc);

      if (edit === null)
        continue;

      edits.push(edit);
    }

    return edits;
  }

  abstract solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | null;
}
