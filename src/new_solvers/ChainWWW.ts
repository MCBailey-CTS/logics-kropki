import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { BaseKropkiChain } from "../abstract/BaseKropkiChain";
import { LocSet } from "../LocSet";
import { Edit } from "../Edit";

export class ChainWWW extends BaseKropkiChain {
  findChains(puzzle: IKropkiPuzzle): Loc[][] {
    const chains: Loc[][] = [];
    for (const loc0 of puzzle.sudokuCellLocs)
      for (const loc1 of puzzle.getSurroundingCellLocs(loc0))
        for (const loc2 of puzzle.getSurroundingCellLocs(loc1))
          for (const loc3 of puzzle.getSurroundingCellLocs(loc2)) {
            if (new LocSet([loc0, loc1, loc2, loc3]).size != 4) continue;

            chains.push([loc0, loc1, loc2, loc3]);
          }

    return chains;
  }

  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    const iLoc0 = puzzle.getIntersection(cellChainLocs[0], cellChainLocs[1]);

    const iLoc1 = puzzle.getIntersection(cellChainLocs[1], cellChainLocs[2]);

    const iLoc2 = puzzle.getIntersection(cellChainLocs[2], cellChainLocs[3]);

    const iStr0 = puzzle.getCellString(iLoc0);

    const iStr1 = puzzle.getCellString(iLoc1);

    const iStr2 = puzzle.getCellString(iLoc2);

    if (iStr0 + iStr1 + iStr2 != "www") return edits;

    const locset = new LocSet(cellChainLocs);

    const commonHouses = puzzle.getCommonHouses(cellChainLocs);

    if (commonHouses.length == 0) return edits;

    const tempCandidates = [];

    for (let i = 0; i < cellChainLocs.length; i++)
      tempCandidates.push(...puzzle.getCellCandidates(cellChainLocs[i]));

    const allCandidates = [...new Set<number>(tempCandidates)];

    allCandidates.sort((a, b) => {
      return a - b;
    });

    let minIndex = allCandidates.length - 4;

    let maxIndex = 3;

    for (const house of commonHouses)
      for (const loc of house) {
        if (locset.has(loc)) continue;

        for (let m = minIndex; m <= maxIndex; m++)
          if (puzzle.removeCandidate(loc, allCandidates[m]))
            edits.push(new Edit(puzzle, loc, allCandidates[m], this));
      }

    // for(let i = cellChainLocs.length - 1; i >= 0; i--)

    return edits;
  }
}
