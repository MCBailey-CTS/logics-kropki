import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Edit } from "../Edit";
import { BaseExplicitChainLength } from "../abstract/BaseExplicitChainLength";


export class ChainWW extends BaseExplicitChainLength {
  get chainLength(): number {
    return 3;
  }

  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    const iLoc0 = puzzle.getIntersection(cellChainLocs[0], cellChainLocs[1]);

    const iLoc1 = puzzle.getIntersection(cellChainLocs[1], cellChainLocs[2]);

    const iStr0 = puzzle.getCellString(iLoc0);

    const iStr1 = puzzle.getCellString(iLoc1);

    if (iStr0 + iStr1 != "ww")
      return edits;

    const commonHouses = puzzle.getCommonHouses(cellChainLocs);

    if (commonHouses.length == 0)
      return edits;

    if (puzzle.removeCandidate(cellChainLocs[1], 1))
      edits.push(new Edit(puzzle, cellChainLocs[1], 1, this));

    if (puzzle.removeCandidate(cellChainLocs[1], puzzle.length))
      edits.push(new Edit(puzzle, cellChainLocs[1], puzzle.length, this));

    return edits;
  }
}
