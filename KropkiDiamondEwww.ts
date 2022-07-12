import { IEdit } from "./IEdit";
import { IKropkiPuzzle } from "./IKropkiPuzzle";
import { Loc } from "./Loc";
import { Edit } from "./Edit";
import { BaseKropkiDiamond } from "./BaseKropkiDiamond";

export class KropkiDiamondEwww extends BaseKropkiDiamond {
  get intersectionString(): string {
    return ".www";
  }

  get id(): string {
    return "KropkiDiamondEwww";
  }

  solveDiamond(puzzle: IKropkiPuzzle, loc: Loc, diamond: Loc[]): IEdit | null {
    const leftCell = diamond[4];

    const intersection = diamond[1];

    const rightCell = diamond[6];

    if (puzzle.getCellString(intersection) != ".") return null;

    if (
      (leftCell.equals(loc) || rightCell.equals(loc)) &&
      puzzle.removeCandidate(loc, 1)
    )
      return new Edit(puzzle, loc, 1, this);

    if (
      (leftCell.equals(loc) || rightCell.equals(loc)) &&
      puzzle.removeCandidate(loc, puzzle.length)
    )
      return new Edit(puzzle, loc, puzzle.length, this);
    return null;
  }
}
