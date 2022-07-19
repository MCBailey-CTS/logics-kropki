import { _BaseKropkiChain } from "../abstract/_BaseKropkiChain";
import { _BaseKropkiSudokuSolver } from "../abstract/_BaseKropkiSudokuSolver";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";
import { NewTechniques } from "../NewTechniques";

export class NakedQuad extends _BaseKropkiSudokuSolver {
  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    if (
      NewTechniques.solveSudokuNakedQuadLocs(
        puzzle.grid,
        puzzle.length,
        cellChainLocs
      )
    )
      edits.push(new Edit(puzzle, new Loc(0, 0), 0, this));

    return edits;
  }
}
