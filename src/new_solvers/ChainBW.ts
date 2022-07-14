import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { BaseKropkiChain } from "../abstract/BaseKropkiChain";
import { LocSet } from "../LocSet";
import { Edit } from "../Edit";


export class ChainBW extends BaseKropkiChain {
  findChains(puzzle: IKropkiPuzzle): Loc[][] {
    const chains: Loc[][] = [];
    for (const loc0 of puzzle.sudokuCellLocs)
      for (const loc1 of puzzle.getSurroundingCellLocs(loc0))
        for (const loc2 of puzzle.getSurroundingCellLocs(loc1)) {
          if (new LocSet([loc0, loc1, loc2]).size != 3)
            continue;

          chains.push([loc0, loc1, loc2]);
        }

    return chains;
  }

  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    // if (cellChainLocs.length != 3) return edits;
    // if (puzzle.id != "002.kropki") return edits;
    const iLoc0 = puzzle.getIntersection(cellChainLocs[0], cellChainLocs[1]);

    const iLoc1 = puzzle.getIntersection(cellChainLocs[1], cellChainLocs[2]);

    const iStr0 = puzzle.getCellString(iLoc0);

    const iStr1 = puzzle.getCellString(iLoc1);

    if (iStr0 + iStr1 != "bw" && iStr0 + iStr1 != "wb")
      return edits;

    const commonHouses = puzzle.getCommonHouses(cellChainLocs);

    if (commonHouses.length == 0)
      return edits;

    if (puzzle.removeCandidate(cellChainLocs[1], 1))
      edits.push(new Edit(puzzle, cellChainLocs[1], 1, this));

    return edits;
  }
}
