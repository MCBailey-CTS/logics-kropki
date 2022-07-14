import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Edit } from "../Edit";
import { NewBaseKropkiChain } from "./NewBaseKropkiChain";

export class HiddenSingle extends NewBaseKropkiChain {
  isValidString(_puzzle: IKropkiPuzzle, _kropkiStr: string): boolean {
    return true;
  }

  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    if (puzzle.length != cellChainLocs.length) return edits;

    const expected = [];

    for (let i = 1; i <= puzzle.length; i++) expected.push(i);

    for (const candidate of expected) {
      const indexes = [];

      for (let i = 0; i < cellChainLocs.length; i++)
        if (puzzle.getCellSet(cellChainLocs[i]).has(candidate)) indexes.push(i);

      if (indexes.length != 1) continue;

      //   console.log(cellChainLocs);
      const loc = cellChainLocs[indexes[0]];

      //   console.log(loc);
      const candidates = puzzle.getCellCandidates(loc);

      if (candidates.length == 1) continue;

      for (const temp of candidates)
        if (temp != candidate && puzzle.removeCandidate(loc, temp))
          edits.push(new Edit(puzzle, loc, temp, this));
    }

    return edits;
  }
}
