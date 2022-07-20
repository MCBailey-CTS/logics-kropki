import { _BaseExplicitChainLength } from "../abstract/_BaseExplicitChainLength";
import { _BaseKropkiVector } from "../abstract/_BaseKropkiVector";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";

export class Chain_bb extends _BaseKropkiVector {
  get vector_chains(): Loc[][] {
    const _base = new Loc(0, 0);
    return [
      [_base.right(2), _base.right(2)],
      [_base.right(2), _base.up(2)],
      [_base.right(2), _base.down(2)],

      [_base.left(2), _base.left(2)],
      [_base.left(2), _base.up(2)],
      [_base.left(2), _base.down(2)],

      [_base.up(2), _base.up(2)],
      [_base.up(2), _base.left(2)],
      [_base.up(2), _base.right(2)],

      [_base.down(2), _base.down(2)],
      [_base.down(2), _base.left(2)],
      [_base.down(2), _base.right(2)],
    ];
  }

  get expected_kropki_string(): string {
    return "bb";
  }

  solveChain(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    const commonHouses = puzzle.getCommonHouses(cellChainLocs);

    if (commonHouses.length == 0) return edits;

    if (puzzle.length == 9) {
      // edge
      for (const candidate of [3, 5, 6, 7, 9])
        if (puzzle.removeCandidate(cellChainLocs[0], candidate))
          edits.push(new Edit(puzzle, cellChainLocs[0], candidate, this));

      // center
      for (const candidate of [1, 3, 5, 6, 7, 8, 9])
        if (puzzle.removeCandidate(cellChainLocs[1], candidate))
          edits.push(new Edit(puzzle, cellChainLocs[1], candidate, this));

      // outsiders
      for (const house of commonHouses) {
        for (const loc of house) {
          if (loc.equals(cellChainLocs[0])) continue;
          if (loc.equals(cellChainLocs[1])) continue;
          if (loc.equals(cellChainLocs[2])) continue;

          if (puzzle.removeCandidate(loc, 2))
            edits.push(new Edit(puzzle, loc, 2, this));
          if (puzzle.removeCandidate(loc, 4))
            edits.push(new Edit(puzzle, loc, 4, this));
        }
      }
    } else {
      // edge
      for (const candidate of [2, 3, 5, 6, 7])
        if (puzzle.removeCandidate(cellChainLocs[0], candidate))
          edits.push(new Edit(puzzle, cellChainLocs[0], candidate, this));

      // center
      for (const candidate of [1, 3, 4, 5, 6, 7])
        if (puzzle.removeCandidate(cellChainLocs[1], candidate))
          edits.push(new Edit(puzzle, cellChainLocs[1], candidate, this));

      // outsiders
      for (const house of commonHouses) {
        // console.log(cellChainLocs);
        // console.log(house);
        for (const loc of house) {
          if (loc.equals(cellChainLocs[0])) continue;
          if (loc.equals(cellChainLocs[1])) continue;
          if (loc.equals(cellChainLocs[2])) continue;
          if (puzzle.removeCandidate(loc, 2))
            edits.push(new Edit(puzzle, loc, 2, this));
        }
      }
    }
    return edits;
  }
}
