import { Hash } from "../../../Hash";
import { IHash } from "../../../IHash";
import { _BaseKropkiVector } from "../../abstract/_BaseKropkiVector";
import { east, Loc, north, south, west } from "../../Loc";


const east_south_west = [east(2), south(2), west(2)];
const east_north_west = [east(2), north(2), west(2)];

const west_south_east = [west(2), south(2), east(2)];
const west_north_east = [west(2), north(2), east(2)];

const north_east_south = [north(2), east(2), south(2)];
const north_west_south = [north(2), west(2), south(2)];

const south_east_north = [south(2), east(2), north(2)];
const south_west_north = [south(2), west(2), north(2)];

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
