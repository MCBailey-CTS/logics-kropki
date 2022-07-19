import { _BaseKropkiVector } from "../abstract/_BaseKropkiVector";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";

export class Chain_bww extends _BaseKropkiVector {
  get vector_chains(): Loc[][] {
    const _base = new Loc(0, 0);
    return [
      [_base.right(2), _base.right(2), _base.right(2)],
      [_base.left(2), _base.left(2), _base.left(2)],
      [_base.down(2), _base.down(2), _base.down(2)],
      [_base.up(2), _base.up(2), _base.up(2)],
    ];
  }

  get expected_kropki_string(): string {
    return "bww";
  }

  solve2(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    if (puzzle.id != "008.kropki") return edits;

    if (puzzle.getCellSet(cellChainLocs[0]).has(1)) return edits;

    if (!puzzle.removeCandidate(cellChainLocs[1], 2)) return edits;

    return [new Edit(puzzle, cellChainLocs[1], 2, this)];
  }
}
