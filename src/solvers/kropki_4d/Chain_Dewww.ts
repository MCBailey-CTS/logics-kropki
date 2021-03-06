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

export class Chain_Dewww extends _BaseKropkiVector {
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
    return "www.";
  }
  solveChain(chain: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    edits.push(...this.remove(chain._at(0), 3));
    edits.push(...this.remove(chain._at(1), 1, 9));
    edits.push(...this.remove(chain._at(2), 1, 9));
    edits.push(...this.remove(chain._at(3), 3));

    for (const candidate of this.puzzle.getCellList(chain._at(1))) {
      const beforeSet = this.puzzle.getCellList(chain._at(0));

      const afterSet = this.puzzle.getCellList(chain._at(2));

      const lowerC = candidate - 1;

      const upperC = candidate + 1;

      if (
        (!beforeSet.has(lowerC) && !afterSet.has(lowerC)) ||
        (!beforeSet.has(upperC) && !afterSet.has(upperC))
      )
        edits.push(...this.remove(chain._at(1), candidate));
    }

    for (const candidate1 of this.puzzle.getCellList(chain._at(0))) {
      if (
        this.puzzle.getCellList(chain._at(1)).has(candidate1 + 1) &&
        !this.puzzle.getCellList(chain._at(1)).has(candidate1 - 1) &&
        !this.puzzle.getCellList(chain._at(2)).has(candidate1 + 2)
      )
        edits.push(...this.remove(chain._at(0), candidate1));
    }

    return edits;
  }
}
