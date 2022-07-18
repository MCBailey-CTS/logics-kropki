import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { BaseDiamondChain } from "../abstract/BaseDiamondChain";
import { Edit } from "../Edit";

const BLACK_WHITE = [1, 5, 7, 9];
const WHITE_EMPTY = [3, 5, 7, 9];
const EMPTY_BLACK = [5, 7, 9];
const WHITE_WHITE = [1, 4, 6, 8, 9];

export class Chain_Debww extends BaseDiamondChain {
  solve1(
    puzzle: IKropkiPuzzle,
    blackWhite: Loc | undefined,
    whiteWhite: Loc | undefined,
    whiteEmpty: Loc | undefined,
    emptyBlack: Loc | undefined
  ): IEdit[] {
    const edits: IEdit[] = [];

    // black -> white
    if (blackWhite)
      edits.push(...this.remove(puzzle, blackWhite, ...BLACK_WHITE));

    // white -> white
    if (whiteWhite)
      edits.push(...this.remove(puzzle, whiteWhite, ...WHITE_WHITE));

    // white -> empty
    if (whiteEmpty)
      edits.push(...this.remove(puzzle, whiteEmpty, ...WHITE_EMPTY));

    // empty -> black
    if (emptyBlack)
      edits.push(...this.remove(puzzle, emptyBlack, ...EMPTY_BLACK));

    return edits;
  }

  solve(puzzle: IKropkiPuzzle, chain: Loc[], reverse?: boolean): IEdit[] {
    if (typeof reverse == "undefined") reverse = true;

    const temp = [...chain];
    const chain1 = [...chain];

    for (let i = 0; i < chain.length; i++) {
      if (this.getKropkiString(puzzle, chain1) == "ww.b")
        return this.solve1(puzzle, chain1[0], chain1[1], chain1[2], chain1[3]);

      this.pop_push(chain1);
    }

    if (!reverse) return new Array<IEdit>();

    temp.reverse();

    return this.solve(puzzle, temp, false);
  }
}
