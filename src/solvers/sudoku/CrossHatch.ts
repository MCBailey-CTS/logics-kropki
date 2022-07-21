import { IHash } from "../../../IHash";
import { _BaseKropkiChain } from "../../abstract/_BaseKropkiChain";
import { _BaseKropkiSudokuSolver } from "../../abstract/_BaseKropkiSudokuSolver";
import { Edit } from "../../Edit";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { Loc } from "../../Loc";
import { NewTechniques } from "../../NewTechniques";
import { cellCandidates } from "../../puzzles/KropkiPuzzle";

export class CrossHatch extends _BaseKropkiSudokuSolver {
  solve(puzzle: IKropkiPuzzle, cellChainLocs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    if (
      this.solveSudokuCrossHatchLocs(
        puzzle.grid,
        puzzle.length,
       [...cellChainLocs]
      )
    )
      edits.push(new Edit(puzzle, new Loc(0, 0), 0, this));

    return edits;
  }

   solveSudokuCrossHatch(_length: number, house: string[]) {
    for (let i = 0; i < _length; i++)
      for (let ii = 0; ii < _length; ii++) {
        if (i == ii) continue;

        const cell = cellCandidates(house[i]);

        if (cell._length != 1) continue;

        house[ii] = house[ii].replace(`${cell._at(0)}`, "_");
      }
  }

  
   solveSudokuCrossHatchLocs(
    _grid: string[][],
    _length: number,
    locs: Loc[]
  ): boolean {
    const house = Loc.getHouseFromLocs(_grid, locs);

    this.solveSudokuCrossHatch(_length, house);

    let edited = false;

    for (let j = 0; j < _length; j++) {
      const loc = locs[j];

      const _length = cellCandidates(_grid[loc.row][loc.col])._length;

      _grid[loc.row][loc.col] = house[j];

      edited =
        _length > cellCandidates(_grid[loc.row][loc.col])._length || edited;
    }

    return edited;
  }
}
