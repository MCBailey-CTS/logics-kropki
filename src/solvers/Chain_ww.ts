import { _BaseExplicitChainLength } from "../abstract/_BaseExplicitChainLength";
import { _BaseKropkiVector } from "../abstract/_BaseKropkiVector";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";

export class Chain_ww extends _BaseKropkiVector {
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
    return "ww";
  }

  solve2(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

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



