import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { BaseDiamondChain } from "../abstract/BaseDiamondChain";

const BLACK_WHITE = [1, 5, 7, 9];
const WHITE_EMPTY = [3, 5, 7, 9];
const EMPTY_BLACK = [5, 7, 9];
const WHITE_WHITE = [1, 4, 6, 8, 9];

export class Chain_Debww extends BaseDiamondChain {
  get expectedKropkiString(): string {
    return "ww.b";
  }

  solve1(puzzle: IKropkiPuzzle, chain: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    // black -> white
    edits.push(...this.remove(puzzle, chain[0], ...BLACK_WHITE));

    // white -> white
    edits.push(...this.remove(puzzle, chain[1], ...WHITE_WHITE));

    // white -> empty
    edits.push(...this.remove(puzzle, chain[2], ...WHITE_EMPTY));

    // empty -> black
    edits.push(...this.remove(puzzle, chain[3], ...EMPTY_BLACK));

    return edits;
  }
}
