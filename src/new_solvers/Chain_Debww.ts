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

  solve(puzzle: IKropkiPuzzle, chain: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    let str = this.getKropkiString(puzzle, chain);

    switch (str) {
      case "ww.b":
        return this.solve1(puzzle, chain[0], chain[1], chain[2], chain[3]);
      case "bww.":
        return this.solve1(puzzle, chain[1], chain[2], chain[3], chain[0]);
      case ".bww":
        return this.solve1(puzzle, chain[2], chain[3], chain[0], chain[1]);
      case "w.bw":
        return this.solve1(puzzle, chain[3], chain[0], chain[1], chain[2]);

      case "b.ww":
        return this.solve1(puzzle, chain[0], chain[3], chain[2], chain[1]);
      case "wb.w":
        return this.solve1(puzzle, chain[1], chain[0], chain[3], chain[2]);
      case "wwb.":
        return this.solve1(puzzle, chain[2], chain[1], chain[0], chain[3]);
      case ".wwb":
        return this.solve1(puzzle, chain[3], chain[2], chain[1], chain[0]);

      default:
        return edits;
    }
  }
}
