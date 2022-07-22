import { IHash } from "../../../IHash";
import { _BaseKropkiVectorDiamond } from "../../abstract/_BaseKropkiVectorDiamond";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { Loc } from "../../Loc";
import { _BaseKropkiVectorString4D } from "./_BaseKropkiVectorString4D";

export class Chain_Dewbw extends _BaseKropkiVectorString4D {
  get expected_kropki_string(): string {
    return "wbw.";
  }

  solveChain(puzzle: IKropkiPuzzle, chain: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    edits.push(...this.remove(puzzle, chain._at(1), 1));
    edits.push(...this.remove(puzzle, chain._at(2), 1));

    return edits;
  }
}
