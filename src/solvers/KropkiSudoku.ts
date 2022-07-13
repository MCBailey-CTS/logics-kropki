import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { IKropkiSolver } from "../interfaces/IKropkiSolver";
import { Loc } from "../Loc";
import { NewTechniques } from "../NewTechniques";

export class KropkiSudoku implements IKropkiSolver {
  get id(): string {
    return "KropkiSudoku";
  }

  solvePuzzle(puzzle: IKropkiPuzzle): IEdit[] {
    const edits = [];

    for (const loc of puzzle.sudokuCellLocs) {
      const edit = this.solveCell(puzzle, loc);

      if (edit === null) continue;

      edits.push(edit);
    }

    return edits;
  }

  solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | null {
    if (!loc.equals(new Loc(0, 0))) return null;

    for (let i = 0; i < puzzle.length; i++) {
      const rowLocs = Loc.getKropkiCellRowHouseLocs(puzzle.length, i);

      const colLocs = Loc.getKropkiCellColHouseLocs(puzzle.length, i);

      if (
        KropkiSudoku.solveSudokuLocs(puzzle.grid, puzzle.length, rowLocs) ||
        KropkiSudoku.solveSudokuLocs(puzzle.grid, puzzle.length, colLocs)
      )
        return new Edit(puzzle, loc, 0, this);
    }

    if (puzzle.hasFences) {
      // if (puzzle.id == "009.kropki")
      {
        // console.log("Made it here");
        for (const fence of puzzle.fences) {
          const locs = puzzle.getFenceLocs(fence);

          if (KropkiSudoku.solveSudokuLocs(puzzle.grid, puzzle.length, locs))
            return new Edit(puzzle, loc, 0, this);
        }
      }
    }

    return null;
  }

  static solveSudokuLocs(
    _grid: string[][],
    _length: number,
    locs: Loc[]
  ): boolean {
    if (_length != locs.length)
      throw new Error(`Invalid number of locs vs length`);

    if (NewTechniques.solveSudokuCrossHatchLocs(_grid, _length, locs))
      return true;

    if (NewTechniques.solveSudokuNakedPairLocs(_grid, _length, locs))
      return true;

    if (NewTechniques.solveSudokuHiddenSingleLocs(_grid, _length, locs))
      return true;

    // if (NewTechniques.solveSudokuNakedTripleLocs(_grid, _length, locs))
    //   return true;

    // if (NewTechniques.solveSudokuNakedQuadLocs(_grid, _length, locs))
    //   return true;

    return false;
  }
}
