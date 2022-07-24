import { Hash } from "../../../Hash";
import { IHash } from "../../../IHash";
import { _BaseKropkiVector } from "../../abstract/_BaseKropkiVector";

import { Edit } from "../../Edit";
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

export class Chain_Dewbb extends _BaseKropkiVector {
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
    return "w.bb";
  }

  solveChain(chain: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];
    // [0]
    for (const candidate of [1, 3, 5, 6, 7, 9])
      if (this.puzzle.removeCandidate(chain._at(0), candidate))
        edits.push(new Edit(this.puzzle, chain._at(0), candidate, this));

    // [2]
    for (const candidate of [3, 5, 6, 7, 9])
      if (this.puzzle.removeCandidate(chain._at(2), candidate))
        edits.push(new Edit(this.puzzle, chain._at(2), candidate, this));

    // [3]
    for (const candidate of [1, 3, 5, 6, 7, 8, 9])
      if (this.puzzle.removeCandidate(chain._at(3), candidate))
        edits.push(new Edit(this.puzzle, chain._at(3), candidate, this));

    return edits;
  }
}
