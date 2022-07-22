import { Hash } from "../../../Hash";
import { IHash } from "../../../IHash";
import { _BaseKropkiVector } from "../../abstract/_BaseKropkiVector";
import { east, Loc, north, south, west } from "../../Loc";

export abstract class _BaseKropkiVectorString4D extends _BaseKropkiVector {
  get vector_chains(): IHash<Loc>[] {
    const loc = new Loc(0, 0);

    return [
      [east(2), south(2), west(2)],
      [east(2), north(2), west(2)],
      [west(2), south(2), east(2)],
      [west(2), north(2), east(2)],

      [north(2), east(2), south(2)],
      [north(2), west(2), south(2)],

      [south(2), east(2), north(2)],
      [south(2), west(2), north(2)],
    ].map((locs) => new Hash<Loc>(locs));
  }
}
