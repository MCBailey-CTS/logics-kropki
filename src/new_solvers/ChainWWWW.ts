import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { BaseKropkiChain } from "../abstract/BaseKropkiChain";
import { LocSet } from "../LocSet";
import { Edit } from "../Edit";

export class ChainWWWW extends BaseKropkiChain {
  findChains(puzzle: IKropkiPuzzle): Loc[][] {
    const chains: Loc[][] = [];
    for (const loc0 of puzzle.sudokuCellLocs)
      for (const loc1 of puzzle.getSurroundingCellLocs(loc0))
        for (const loc2 of puzzle.getSurroundingCellLocs(loc1))
          for (const loc3 of puzzle.getSurroundingCellLocs(loc2))
            for (const loc4 of puzzle.getSurroundingCellLocs(loc3)) {
              if (new LocSet([loc0, loc1, loc2, loc3, loc4]).size != 5)
                continue;

              chains.push([loc0, loc1, loc2, loc3, loc4]);
            }

    return chains;
  }

  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    const locset = new LocSet(cellChainLocs);

    const iLoc0 = puzzle.getIntersection(cellChainLocs[0], cellChainLocs[1]);

    const iLoc1 = puzzle.getIntersection(cellChainLocs[1], cellChainLocs[2]);

    const iLoc2 = puzzle.getIntersection(cellChainLocs[2], cellChainLocs[3]);

    const iLoc3 = puzzle.getIntersection(cellChainLocs[3], cellChainLocs[4]);

    const iStr0 = puzzle.getCellString(iLoc0);

    const iStr1 = puzzle.getCellString(iLoc1);

    const iStr2 = puzzle.getCellString(iLoc2);

    const iStr3 = puzzle.getCellString(iLoc3);

    if (iStr0 + iStr1 + iStr2 + iStr3 != "wwww") return edits;

    const commonHouses = puzzle.getCommonHouses(cellChainLocs);

    if (commonHouses.length == 0) return edits;

    const tempCandidates = [];

    for (let i = 0; i < cellChainLocs.length; i++)
      tempCandidates.push(...puzzle.getCellCandidates(cellChainLocs[i]));

    const allCandidates = [...new Set<number>(tempCandidates)];

    allCandidates.sort((a, b) => {
      return a - b;
    });

    if (puzzle.length == 9) {
      let minIndex = 4;

      let maxIndex = 4;

      for (const house of commonHouses) {
        for (const loc of house) {
          if (locset.has(loc)) continue;

          for (let m = minIndex; m <= maxIndex; m++)
            if (puzzle.removeCandidate(loc, allCandidates[m]))
              edits.push(new Edit(puzzle, loc, allCandidates[m], this));
        }
      }
    }

    return edits;
  }
}
