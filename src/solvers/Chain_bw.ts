import { _BaseKropkiVector } from "../abstract/_BaseKropkiVector";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";

export class Chain_bw extends _BaseKropkiVector {
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
    return "bw";
  }

  solveChain(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    const commonHouses = puzzle.getCommonHouses(cellChainLocs);

    if (commonHouses.length == 0) return edits;

    if (puzzle.removeCandidate(cellChainLocs[1], 1))
      edits.push(new Edit(puzzle, cellChainLocs[1], 1, this));

    return edits;
  }
}
