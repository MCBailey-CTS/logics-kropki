import { IHash } from "../../IHash";
import { _BaseKropkiChain } from "../abstract/_BaseKropkiChain";
import { _BaseKropkiSudokuSolver } from "../abstract/_BaseKropkiSudokuSolver";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";

export class HiddenSingle extends _BaseKropkiSudokuSolver {
  solve(puzzle: IKropkiPuzzle, cellChainLocs:IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    if (puzzle.length != cellChainLocs._length) return edits;

    const expected = [];

    for (let i = 1; i <= puzzle.length; i++) expected.push(i);

    for (const candidate of expected) {
      const indexes = [];

      for (let i = 0; i < cellChainLocs._length; i++)
        if (puzzle.getCellList(cellChainLocs._at(i)).has(candidate))
          indexes.push(i);

      if (indexes.length != 1) continue;

      //   console.log(cellChainLocs);
      const loc = cellChainLocs._at(indexes[0]);

      //   console.log(loc);
      const candidates = puzzle.getCellList(loc);

      if (candidates._length == 1) continue;

      for (const temp of candidates)
        if (temp != candidate && puzzle.removeCandidate(loc, temp))
          edits.push(new Edit(puzzle, loc, temp, this));
    }

    return edits;
  }
}
