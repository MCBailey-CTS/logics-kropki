import { _BaseKropkiChain } from "../abstract/_BaseKropkiChain";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";
import { NewTechniques } from "../NewTechniques";


export class NakedQuad extends _BaseKropkiChain {
  findChains(puzzle: IKropkiPuzzle): Loc[][] {
    const chains: Loc[][] = [];

    for (const house of puzzle.getHouses())
      chains.push(house);

    return chains;
  }

  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    if (NewTechniques.solveSudokuNakedQuadLocs(
      puzzle.grid,
      puzzle.length,
      cellChainLocs
    ))
      edits.push(new Edit(puzzle, new Loc(0, 0), 0, this));

    return edits;
  }
}
