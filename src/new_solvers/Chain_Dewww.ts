import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { BaseDiamondChain } from "../abstract/BaseDiamondChain";

export class Chain_Dewww extends BaseDiamondChain {
  get expectedKropkiString(): string {
    return "www.";
  }
  solve1(puzzle: IKropkiPuzzle, chain: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    edits.push(...this.remove(puzzle, chain[0], 3));
    edits.push(...this.remove(puzzle, chain[1], 1, 9));
    edits.push(...this.remove(puzzle, chain[2], 1, 9));
    edits.push(...this.remove(puzzle, chain[3], 3));

    return edits;
  }
}
