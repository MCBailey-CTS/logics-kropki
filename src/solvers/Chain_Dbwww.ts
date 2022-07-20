import { _BaseKropkiVectorDiamond } from "../abstract/_BaseKropkiVectorDiamond";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";

export class Chain_Dbwww extends _BaseKropkiVectorDiamond {
  get expected_kropki_string(): string {
    return "bwww";
  }

  solveChain(puzzle: IKropkiPuzzle, chain: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    edits.push(...this.remove(puzzle, chain[0], 4));
    edits.push(...this.remove(puzzle, chain[1], 4));

    return edits;
  }
}
