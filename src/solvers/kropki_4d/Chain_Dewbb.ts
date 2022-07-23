import { IHash } from "../../../IHash";
import { _BaseKropkiVectorDiamond } from "../../abstract/_BaseKropkiVectorDiamond";
import { Edit } from "../../Edit";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { Loc } from "../../Loc";
import { _BaseKropkiVectorString4D } from "./_BaseKropkiVectorString4D";

export class Chain_Dewbb extends _BaseKropkiVectorString4D {
  get expected_kropki_string(): string {
    return "w.bb";
  }

  solveChain( chain: IHash<Loc>): IEdit[] {
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
