import { IHash } from "../../../IHash";
import { _BaseKropkiVectorDiamond } from "../../abstract/_BaseKropkiVectorDiamond";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { Loc } from "../../Loc";
import { _BaseKropkiVectorString4D } from "./_BaseKropkiVectorString4D";

export class Chain_Dbwww extends _BaseKropkiVectorString4D {
  get expected_kropki_string(): string {
    return "bwww";
  }

  solveChain(chain: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    edits.push(...this.remove(chain._at(0), 4));
    edits.push(...this.remove(chain._at(1), 4));

    return edits;
  }
}
