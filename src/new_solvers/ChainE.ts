import { Edit } from "../Edit";
import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { BaseKropkiChain } from "../abstract/BaseKropkiChain";
import { LocSet } from "../LocSet";

export class ChainE extends BaseKropkiChain {
  findChains(puzzle: IKropkiPuzzle): Loc[][] {
    const chains: Loc[][] = [];

    for (const cellLoc of puzzle.sudokuCellLocs)
      for (const other0 of puzzle.getSurroundingCellLocs(cellLoc)) {
        if (new LocSet([cellLoc, other0]).size != 2) continue;

        chains.push([cellLoc, other0]);
      }

    return chains;
  }

  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    const loc = cellChainLocs[0];

    const other = cellChainLocs[1];

    const interSectionLoc = puzzle.getIntersection(loc, other);

    const intersectionStr = puzzle.getCellString(interSectionLoc);

    if (intersectionStr != ".") return edits;

    for (const candidate of puzzle.getCellCandidates(loc)) {
      const kropkiCandidates = [
        ...puzzle.getKropkiCandidates(candidate),
        candidate,
      ];

      const otherHash = puzzle.getCellSet(other);

      for (const t of kropkiCandidates) otherHash.delete(t);

      if (otherHash.size > 0) continue;

      if (!puzzle.removeCandidate(loc, candidate)) continue;

      edits.push(new Edit(puzzle, loc, candidate, this));
    }

    return edits;
  }
}