import { Hash } from "../../../Hash";
import { IHash } from "../../../IHash";
import { _BaseKropkiVector } from "../../abstract/_BaseKropkiVector";
import { Loc } from "../../Loc";

export abstract class _BaseKropkiVectorString4D extends _BaseKropkiVector {
  get vector_chains(): IHash<Loc>[] {
    const loc = new Loc(0, 0);

    return [
      [loc.right(2), loc.down(2), loc.left(2)],
      [loc.right(2), loc.up(2), loc.left(2)],
      [loc.left(2), loc.down(2), loc.right(2)],
      [loc.left(2), loc.up(2), loc.right(2)],

      [loc.up(2), loc.right(2), loc.down(2)],
      [loc.up(2), loc.left(2), loc.down(2)],

      [loc.down(2), loc.right(2), loc.up(2)],
      [loc.down(2), loc.left(2), loc.up(2)],
    ].map((locs) => new Hash<Loc>(locs));
  }
}
