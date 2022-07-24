import { Hash } from "../../../Hash";
import { IHash } from "../../../IHash";
import { _BaseKropkiVector } from "../../abstract/_BaseKropkiVector";
import { Edit } from "../../Edit";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { Loc } from "../../Loc";


export class Chain_bw extends _BaseKropkiVector {

  get vector_chains(): IHash<Loc>[] {
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
    ].map((array) => new Hash<Loc>(array));
  }
  get expected_kropki_string(): string {
    return "bw";
  }

  solveChain( cellChainLocs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    const commonHouses = this.puzzle.getCommonHouses(cellChainLocs);

    if (commonHouses.length == 0) return edits;

    if (this.puzzle.removeCandidate(cellChainLocs._at(1), 1))
      edits.push(new Edit(this.puzzle, cellChainLocs._at(1), 1, this));

    return edits;
  }
}
