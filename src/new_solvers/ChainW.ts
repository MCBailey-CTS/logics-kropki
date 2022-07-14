import { Edit } from "../Edit";
import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { NewBaseKropkiChain } from "./NewBaseKropkiChain";

export class ChainW extends NewBaseKropkiChain {
  isValidString(_puzzle: IKropkiPuzzle, kropkiStr: string): boolean {
    return kropkiStr == "w";
  }

  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const loc = cellChainLocs[0];

    const other = cellChainLocs[1];

    const edits: IEdit[] = [];

    const otherHash = puzzle.getCellSet(other);

    for (const candidate of puzzle.getCellCandidates(loc)) {
      if (otherHash.has(candidate + 1)) continue;

      if (otherHash.has(candidate - 1)) continue;

      if (!puzzle.removeCandidate(loc, candidate)) continue;

      edits.push(new Edit(puzzle, loc, candidate, this));
    }

    return edits;
  }
}

export class ChainBB extends NewBaseKropkiChain {
  isValidString(_puzzle: IKropkiPuzzle, kropkiStr: string): boolean {
    return kropkiStr == "w";
  }

  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const loc = cellChainLocs[0];

    const other = cellChainLocs[1];

    const edits: IEdit[] = [];

    const otherHash = puzzle.getCellSet(other);

    for (const candidate of puzzle.getCellCandidates(loc)) {
      if (otherHash.has(candidate + 1)) continue;

      if (otherHash.has(candidate - 1)) continue;

      if (!puzzle.removeCandidate(loc, candidate)) continue;

      edits.push(new Edit(puzzle, loc, candidate, this));
    }

    return edits;
  }
}
