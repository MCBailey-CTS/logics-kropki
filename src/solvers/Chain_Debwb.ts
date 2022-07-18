import { _BaseDiamondChain } from "../abstract/_BaseDiamondChain";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";

export class Chain_Debwb extends _BaseDiamondChain {
  get expectedKropkiString(): string {
    return "wb.b";
  }
  solve1(puzzle: IKropkiPuzzle, chain: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    edits.push(...this.remove(puzzle, chain[0], 1));
    edits.push(...this.remove(puzzle, chain[1], 1));

    return edits;
  }
}
