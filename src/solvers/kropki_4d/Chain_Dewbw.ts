import { Hash } from "../../../Hash";
import { IHash } from "../../../IHash";
import { _BaseKropkiVector } from "../../abstract/_BaseKropkiVector";

import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import {
  east_north_west,
  east_south_west,
  Loc,
  north_east_south,
  north_west_south,
  south_east_north,
  south_west_north,
  west_north_east,
  west_south_east,
} from "../../Loc";

export class Chain_Dewbw extends _BaseKropkiVector {
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
  get expected_kropki_string(): string {
    return "wbw.";
  }

  solveChain(chain: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    edits.push(...this.remove(chain._at(1), 1));
    edits.push(...this.remove(chain._at(2), 1));

    return edits;
  }
}
