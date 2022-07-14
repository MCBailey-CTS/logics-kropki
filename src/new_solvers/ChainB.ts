import { Edit } from "../Edit";
import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { NewBaseKropkiChain } from "./NewBaseKropkiChain";

export class ChainB extends NewBaseKropkiChain {
  isValidString(puzzle: IKropkiPuzzle, kropkiStr: string): boolean {
    return kropkiStr == "b";
  }

  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const loc = cellChainLocs[0];

    const other = cellChainLocs[1];

    const otherHash = puzzle.getCellSet(other);

    const edits: IEdit[] = [];

    for (const candidate of puzzle.getCellCandidates(loc)) {
      if (otherHash.has(candidate * 2)) continue;

      if (candidate % 2 == 0 && otherHash.has(candidate / 2)) continue;

      if (!puzzle.removeCandidate(loc, candidate)) continue;

      edits.push(new Edit(puzzle, loc, candidate, this));
    }

    return edits;
  }
}
