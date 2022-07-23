import { Hash } from "../../../Hash";
import { IHash } from "../../../IHash";
import { _BaseKropkiVectorDiamond } from "../../abstract/_BaseKropkiVectorDiamond";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { Loc } from "../../Loc";
import { _BaseKropkiVectorString4D } from "./_BaseKropkiVectorString4D";

export class Chain_Debwb extends _BaseKropkiVectorString4D {
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
