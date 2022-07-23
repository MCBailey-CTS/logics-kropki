import { Hash } from "../../../Hash";
import { IHash } from "../../../IHash";
import { _BaseKropkiVector } from "../../abstract/_BaseKropkiVector";
import { east, east_north_west, east_south_west, Loc, north, north_east_south, north_west_south, south, south_east_north, south_west_north, west, west_north_east, west_south_east } from "../../Loc";


export abstract class _BaseKropkiVectorString4D extends _BaseKropkiVector {
  get vector_chains(): IHash<Loc>[] {
    return [
      east_north_west,
      east_south_west,
      west_south_east,
      west_north_east,
      north_east_south,
      north_west_south,
      south_east_north,
      south_west_north,
    ].map((locs) => new Hash<Loc>(locs));
  }
}
