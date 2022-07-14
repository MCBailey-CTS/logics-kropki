import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { BaseKropkiChain } from "../abstract/BaseKropkiChain";
import { LocSet } from "../LocSet";
import { Edit } from "../Edit";

export class ChainBB extends BaseKropkiChain {
  findChains(puzzle: IKropkiPuzzle): Loc[][] {
    const chains: Loc[][] = [];
    for (const loc0 of puzzle.sudokuCellLocs)
      for (const loc1 of puzzle.getSurroundingCellLocs(loc0))
        for (const loc2 of puzzle.getSurroundingCellLocs(loc1)) {
          if (new LocSet([loc0, loc1, loc2]).size != 3) continue;

          chains.push([loc0, loc1, loc2]);
        }

    return chains;
  }

  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    if (puzzle.id != "002.kropki") return edits;

    const iLoc0 = puzzle.getIntersection(cellChainLocs[0], cellChainLocs[1]);
    const iLoc1 = puzzle.getIntersection(cellChainLocs[1], cellChainLocs[2]);

    const iStr0 = puzzle.getCellString(iLoc0);
    const iStr1 = puzzle.getCellString(iLoc1);

    if (iStr0 + iStr1 != "bb") return edits;

    let centerCandidates = new Set<number>();

    let edgeCandidates = new Set<number>();

    if (puzzle.length == 9) {
      centerCandidates.add(2);
      centerCandidates.add(4);

      edgeCandidates.add(1);
      edgeCandidates.add(2);
      edgeCandidates.add(4);
      edgeCandidates.add(8);
    }
    else
    {
      centerCandidates.add(2);
     

      edgeCandidates.add(1);
      edgeCandidates.add(4);
    }

    const commonHouses = puzzle.getCommonHouses(cellChainLocs);

    if (commonHouses.length == 0) return edits;

    // center
    for (const candidate of puzzle.expectedCandidates)
      if (
        !centerCandidates.has(candidate) &&
        puzzle.removeCandidate(cellChainLocs[1], candidate)
      )
        edits.push(new Edit(puzzle, cellChainLocs[1], candidate, this));

    // edge
    for (const candidate of puzzle.expectedCandidates)
      if (
        !edgeCandidates.has(candidate) &&
        puzzle.removeCandidate(cellChainLocs[0], candidate)
      )
        edits.push(new Edit(puzzle, cellChainLocs[0], candidate, this));

    for (const house of commonHouses) {
      console.log('common');
      console.log("Length " + cellChainLocs.length);
      console.log(house);



      const locset = new LocSet(cellChainLocs);

      // console.log("/////");
      // console.log(cellChainLocs);
      // console.log(house);

      // for (const loc of cellChainLocs) locset.delete(loc);

      // if(locset.size == )

      for (const loc of house) {

        if (locset.has(loc)) continue;

        console.log(loc);


        // for (const candidate of centerCandidates)
        //   if (puzzle.removeCandidate(loc, candidate))
        //     edits.push(new Edit(puzzle, loc, candidate, this));
      }
    }

    return edits;
  }
}
