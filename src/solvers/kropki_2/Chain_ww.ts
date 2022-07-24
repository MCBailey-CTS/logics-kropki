import { Hash } from "../../../Hash";
import { IHash } from "../../../IHash";
import { _BaseKropkiVector } from "../../abstract/_BaseKropkiVector";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { Loc } from "../../Loc";


export class Chain_ww extends _BaseKropkiVector {
  get expected_kropki_string(): string {
    return "ww";
  }

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

  solveChain(locs: IHash<Loc>): IEdit[] {


    const edits: IEdit[] = [];

    const commonHouses = this.puzzle.getCommonHouses(locs);

    if (commonHouses.length == 0) return edits;

    const edgeSet0 = this.puzzle.getCellList(locs._at(0));
    const centerSet = this.puzzle.getCellList(locs._at(1));
    const edgeSet1 = this.puzzle.getCellList(locs._at(2));

    for (const candidate of edgeSet0)
      if (!edgeSet1.has(candidate - 2) && !edgeSet1.has(candidate + 2))
        edits.push(...this.remove(locs._at(0), candidate));

    for (const candidate of edgeSet1)
      if (!edgeSet0.has(candidate - 2) && !edgeSet0.has(candidate + 2))
        edits.push(...this.remove(locs._at(2), candidate));

    for (const candidate of edgeSet0)
      if (!centerSet.has(candidate - 1) && !centerSet.has(candidate + 1))
        edits.push(...this.remove(locs._at(0), candidate));

    for (const candidate of edgeSet1)
      if (!centerSet.has(candidate - 1) && !centerSet.has(candidate + 1))
        edits.push(...this.remove(locs._at(2), candidate));

    return edits;
  }
}
