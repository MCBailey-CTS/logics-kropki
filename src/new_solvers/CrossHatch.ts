import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Edit } from "../Edit";
import { BaseKropkiChain } from "../abstract/BaseKropkiChain";
import { NewTechniques } from "../NewTechniques";


export class CrossHatch extends BaseKropkiChain {
  findChains(puzzle: IKropkiPuzzle): Loc[][] {
    const chains: Loc[][] = [];

    for (const house of puzzle.getHouses())
      chains.push(house);

    return chains;
  }

  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    if (NewTechniques.solveSudokuCrossHatchLocs(
      puzzle.grid,
      puzzle.length,
      cellChainLocs
    ))
      edits.push(new Edit(puzzle, new Loc(0, 0), 0, this));

    return edits;
  }
}
