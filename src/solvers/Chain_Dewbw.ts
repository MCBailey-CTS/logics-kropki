import { _BaseDiamondChain } from "../abstract/_BaseDiamondChain";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";


export class Chain_Dewbw extends _BaseDiamondChain {
  get expectedKropkiString(): string {
    return "wbw.";
  }
  solve1(puzzle: IKropkiPuzzle, chain: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    edits.push(...this.remove(puzzle, chain[1], 1));
    edits.push(...this.remove(puzzle, chain[2], 1));

    return edits;
  }
}
