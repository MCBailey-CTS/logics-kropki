import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { _BaseDiamondChain } from "../abstract/_BaseDiamondChain";
import {
  _BaseKropkiVector,
} from "../abstract/_BaseKropkiVector";
import { _BaseKropkiVectorDiamond } from "../abstract/_BaseKropkiVectorDiamond";
const BLACK_WHITE = [1, 5, 7, 9]; // -> [2, 3, 4, 6, 8];
const WHITE_EMPTY = [3, 5, 7, 9]; // -> [1, 2, 4, 6, 8];
const EMPTY_BLACK = [5, 7, 9]; // -> [1, 2, 3, 4, 6, 8];
const WHITE_WHITE = [1, 4, 6, 8, 9]; // -> [2, 3, 5, 7];

export class Chain_Debww extends _BaseKropkiVectorDiamond {
  get expected_kropki_string(): string {
    return "ww.b";
  }

  solveChain(puzzle: IKropkiPuzzle, locs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    if (
      !locs.every((loc) => {
        return loc.isValidKropkiLoc(puzzle.length);
      })
    )
      return edits;

    // black -> white
    edits.push(...this.remove(puzzle, locs[0], ...BLACK_WHITE));

    // white -> white
    edits.push(...this.remove(puzzle, locs[1], ...WHITE_WHITE));

    // white -> empty
    edits.push(...this.remove(puzzle, locs[2], ...WHITE_EMPTY));

    // empty -> black
    edits.push(...this.remove(puzzle, locs[3], ...EMPTY_BLACK));

    return edits;
  }
}
