import { IKropkiSolver } from "./IKropkiSolver";
import { IEdit } from "./IEdit";
import { IKropkiPuzzle } from "./IKropkiPuzzle";
import { Loc } from "./Loc";
import { Edit } from "./Edit";
import { BaseKropkiDiamond } from "./BaseKropkiDiamond";

export class KropkiDiamondBwww extends BaseKropkiDiamond {
  get id(): string {
    return "KropkiDiamondBwww";
  }

  get intersectionString(): string {
    return "bwww";
  }

  solvePuzzle(puzzle: IKropkiPuzzle): IEdit[] {
    const edits = [];

    for (const loc of puzzle.sudokuCellLocs) {
      const edit = this.solveCell(puzzle, loc);

      if (edit === null) continue;

      edits.push(edit);
    }

    return edits;
  }

  solveDiamond(puzzle: IKropkiPuzzle, loc: Loc, diamond: Loc[]): IEdit | null {
    const leftCell = diamond[0];

    const intersection = diamond[1];

    const rightCell = diamond[2];

    if (puzzle.getCellString(intersection) != "b") return null;

    let edit: IEdit | null = null;

    if (leftCell.equals(loc) || rightCell.equals(loc))
      if (leftCell.equals(loc))
        edit = this.solveDiamondExplicit(puzzle, leftCell, rightCell);
      else edit = this.solveDiamondExplicit(puzzle, rightCell, leftCell);

    return edit;
  }

  solveDiamondExplicit(
    puzzle: IKropkiPuzzle,
    removeLoc: Loc,
    otherLoc: Loc
  ): IEdit | null {
    const otherSet = puzzle.getCellSet(otherLoc);

    for (const candidate of puzzle.getCellCandidates(removeLoc)) {
      switch (candidate) {
        case 2:
          if (otherSet.has(1)) continue;
          break;
        case 4:
        case 8:
          break;
        default:
          continue;
      }

      if (!puzzle.removeCandidate(removeLoc, candidate)) continue;

      return new Edit(puzzle, removeLoc, candidate, this);
    }

    return null;
  }
}
