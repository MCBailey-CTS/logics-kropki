import { _BaseExplicitChainLength } from "../abstract/_BaseExplicitChainLength";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";

export class Chain_ww extends _BaseExplicitChainLength {
  get chainLength(): number {
    return 3;
  }

  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    const iLoc0 = puzzle.getIntersection(cellChainLocs[0], cellChainLocs[1]);

    const iLoc1 = puzzle.getIntersection(cellChainLocs[1], cellChainLocs[2]);

    const iStr0 = puzzle.getCellString(iLoc0);

    const iStr1 = puzzle.getCellString(iLoc1);

    if (iStr0 + iStr1 != "ww") return edits;

    const commonHouses = puzzle.getCommonHouses(cellChainLocs);

    if (commonHouses.length == 0) return edits;

    if (puzzle.removeCandidate(cellChainLocs[1], 1))
      edits.push(new Edit(puzzle, cellChainLocs[1], 1, this));

    if (puzzle.removeCandidate(cellChainLocs[1], puzzle.length))
      edits.push(new Edit(puzzle, cellChainLocs[1], puzzle.length, this));

    if (
      !puzzle.getCellSet(cellChainLocs[0]).has(1) &&
      puzzle.getCellSet(cellChainLocs[1]).has(2) &&
      !puzzle.getCellSet(cellChainLocs[2]).has(1) &&
      puzzle.removeCandidate(cellChainLocs[1], 2)
    )
      edits.push(new Edit(puzzle, cellChainLocs[1], 2, this));

    return edits;
  }
}
