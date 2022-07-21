import { IHash } from "../../IHash";
import { _BaseKropkiChain } from "../abstract/_BaseKropkiChain";
import { _BaseKropkiSudokuSolver } from "../abstract/_BaseKropkiSudokuSolver";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";
import { NewTechniques } from "../NewTechniques";

export class CrossHatch extends _BaseKropkiSudokuSolver {
  solve(puzzle: IKropkiPuzzle, cellChainLocs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    if (
      NewTechniques.solveSudokuCrossHatchLocs(
        puzzle.grid,
        puzzle.length,
       [...cellChainLocs]
      )
    )
      edits.push(new Edit(puzzle, new Loc(0, 0), 0, this));

    return edits;
  }
}
