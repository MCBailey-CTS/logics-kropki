import { _BaseKropkiVectorDiamond } from "../abstract/_BaseKropkiVectorDiamond";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";

export class Chain_Debwb extends _BaseKropkiVectorDiamond {
  get expected_kropki_string(): string {
    return "wb.b";
  }

  solveChain(puzzle: IKropkiPuzzle, chain: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    edits.push(...this.remove(puzzle, chain[0], 1));
    edits.push(...this.remove(puzzle, chain[1], 1));

    return edits;
  }
}
