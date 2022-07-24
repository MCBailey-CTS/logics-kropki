import { IHash } from "../../../IHash";
import { _BaseKropkiChain } from "../../abstract/_BaseKropkiChain";
import { Edit } from "../../Edit";
import { IEdit } from "../../interfaces/IEdit";
import { Loc } from "../../Loc";
import { cellCandidates } from "../../puzzles/KropkiPuzzle";

export class CrossHatch extends _BaseKropkiChain {
  solve(cellChainLocs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    if (
      this.solveSudokuCrossHatchLocs(
        this.puzzle.grid,
        this.puzzle.length,
        cellChainLocs
      )
    )
      edits.push(new Edit(this.puzzle, new Loc(0, 0), 0, this));

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
    locs: IHash<Loc>
  ): boolean {
    const house = Loc.getHouseFromLocs(_grid, locs);

    this.solveSudokuCrossHatch(_length, house);

    let edited = false;

    for (let j = 0; j < _length; j++) {
      const loc = locs._at(j);

      const _length = cellCandidates(_grid[loc.row][loc.col])._length;

      _grid[loc.row][loc.col] = house[j];

      edited =
        _length > cellCandidates(_grid[loc.row][loc.col])._length || edited;
    }

    return edited;
  }
  findChains(): IHash<Loc>[] {
    const chains: IHash<Loc>[] = [];

    for (const house of this.puzzle.getHouses()) chains.push(house);

    return chains;
  }
}
