import { IHash } from "../../../IHash";
import { _BaseKropkiVectorDiamond } from "../../abstract/_BaseKropkiVectorDiamond";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { Loc } from "../../Loc";
import { _BaseKropkiVectorString4D } from "./_BaseKropkiVectorString4D";

export class Chain_Dbbww extends _BaseKropkiVectorString4D {
  get expected_kropki_string(): string {
    return "bbww";
  }

  solveChain( chain: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    if (
      this.puzzle.getCellList(chain._at(0)).has(1) &&
      !this.puzzle.getCellList(chain._at(2)).has(1)
    )
      edits.push(...this.remove( chain._at(0), 1));

    if (
      this.puzzle.getCellList(chain._at(2)).has(1) &&
      !this.puzzle.getCellList(chain._at(0)).has(1)
    )
      edits.push(...this.remove( chain._at(2), 1));

    return edits;
  }
}
