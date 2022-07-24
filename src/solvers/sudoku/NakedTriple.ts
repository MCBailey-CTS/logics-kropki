import { _BaseKropkiChain } from "../abstract/_BaseKropkiChain";
import { _BaseKropkiSudokuSolver } from "../abstract/_BaseKropkiSudokuSolver";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";
import { NewTechniques } from "../NewTechniques";

export class NakedTriple extends _BaseKropkiSudokuSolver {
  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    if (
      NewTechniques.solveSudokuNakedTripleLocs(
        puzzle.grid,
        puzzle.length,
        cellChainLocs
      )
    )
      edits.push(new Edit(puzzle, new Loc(0, 0), 0, this));

    return edits;
  }

  findChains(): IHash<Loc>[] {
    const chains: IHash<Loc>[] = [];

    for (const house of this.puzzle.getHouses()) chains.push(house);

    return chains;
  }
}
