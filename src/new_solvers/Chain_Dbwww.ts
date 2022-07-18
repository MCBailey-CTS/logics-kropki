import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { BaseDiamondChain } from "../abstract/BaseDiamondChain";

export class Chain_Dbwww extends BaseDiamondChain {
  get expectedKropkiString(): string {
    return "bwww";
  }

  solve1(puzzle: IKropkiPuzzle, chain: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    edits.push(...this.remove(puzzle, chain[0], 4));
    edits.push(...this.remove(puzzle, chain[1], 4));

    return edits;
  }
}
