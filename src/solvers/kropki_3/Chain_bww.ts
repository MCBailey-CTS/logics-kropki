import { Hash } from "../../../Hash";
import { IHash } from "../../../IHash";
import { _BaseKropkiVector } from "../../abstract/_BaseKropkiVector";
import { Edit } from "../../Edit";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { Loc } from "../../Loc";

export class Chain_bww extends _BaseKropkiVector {
  get vector_chains(): IHash<Loc>[] {
    const _base = new Loc(0, 0);
    return [
      new Hash<Loc>([_base.right(2), _base.right(2), _base.right(2)]),
      new Hash<Loc>([_base.left(2), _base.left(2), _base.left(2)]),
      new Hash<Loc>([_base.down(2), _base.down(2), _base.down(2)]),
      new Hash<Loc>([_base.up(2), _base.up(2), _base.up(2)]),
    ];
  }

  get expected_kropki_string(): string {
    return "bww";
  }

  solveChain(puzzle: IKropkiPuzzle, chain: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    if (puzzle.getCellList(chain._at(0)).has(1)) return edits;

    if (!puzzle.removeCandidate(chain._at(1), 2)) return edits;

    return [new Edit(puzzle, chain._at(1), 2, this)];
  }
}
