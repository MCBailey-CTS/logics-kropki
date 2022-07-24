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

export class Chain_Debwb extends _BaseKropkiVector {
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
    return "wb.b";
  }

  solveChain(chain: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    edits.push(...this.remove(chain._at(0), 1));
    edits.push(...this.remove(chain._at(1), 1));

    const hash0 = this.puzzle.getCellList(chain._at(0));
    const hash1 = this.puzzle.getCellList(chain._at(1));

    let explicit = [2, 3, 4];

    if (!hash0.is_subset_of(explicit) || !hash1.is_subset_of(explicit))
      return edits;

    for (const house of this.puzzle.getCommonHouses(
      new Hash<Loc>([chain._at(2), chain._at(3)])
    )) {
      for (const loc of house) {
        if (loc.equals(chain._at(2))) continue;
        if (loc.equals(chain._at(3))) continue;

        edits.push(...this.remove(loc, 6));
      }
    }

    return edits;
  }
}
