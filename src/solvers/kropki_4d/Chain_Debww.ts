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

const BLACK_WHITE = [1, 5, 7, 9]; // -> [2, 3, 4, 6, 8];
const WHITE_EMPTY = [3, 5, 7, 9]; // -> [1, 2, 4, 6, 8];
const EMPTY_BLACK = [5, 7, 9]; // -> [1, 2, 3, 4, 6, 8];
const WHITE_WHITE = [1, 4, 6, 8, 9]; // -> [2, 3, 5, 7];

export class Chain_Debww extends _BaseKropkiVector {
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
    return "ww.b";
  }

  solveChain(chain: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    if (
      ![...chain].every((loc) => {
        return loc.isValidKropkiLoc(this.puzzle.length);
      })
    )
      return edits;

    // black -> white
    edits.push(...this.remove(chain._at(0), ...BLACK_WHITE));

    // white -> white
    edits.push(...this.remove(chain._at(1), ...WHITE_WHITE));

    // white -> empty
    edits.push(...this.remove(chain._at(2), ...WHITE_EMPTY));

    // empty -> black
    edits.push(...this.remove(chain._at(3), ...EMPTY_BLACK));

    return edits;
  }
}
