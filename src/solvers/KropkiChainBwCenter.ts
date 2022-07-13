import { BaseKropkiSolveCell } from "../abstract/BaseKropkiSolveCell";
import { Consolidate } from "../Consolidate";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { IKropkiSolver } from "../interfaces/IKropkiSolver";
import { Loc } from "../Loc";

export class KropkiChainBwCenter extends BaseKropkiSolveCell {
  get id(): string {
    return "KropkiChainBwCenter";
  }

  

  solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | null {
    const leftIntersections = Consolidate.surroundingIntersectionCell(loc);
    const rightIntersections = Consolidate.surroundingIntersectionCell(loc);

    

    

    for (let i = 0; i < leftIntersections.length; i += 2)
      for (let j = 0; j < leftIntersections.length; j += 2) {
        const leftInt = leftIntersections[i];

        const rightInt = rightIntersections[j];

        const leftCell = leftIntersections[i + 1];

        const rightCell = rightIntersections[j + 1];

        if (
          !leftCell.isValidKropkiLoc(puzzle.length) ||
          !rightCell.isValidKropkiLoc(puzzle.length)
        )
          continue;

        let str =
          puzzle.getCellString(leftInt) + puzzle.getCellString(rightInt);

        if (str !== "bw" && str !== "wb") continue;

        const row = new Set<number>([leftCell.row, loc.row, rightCell.row]);
        const col = new Set<number>([leftCell.col, loc.col, rightCell.col]);
        let fences: Set<string> = new Set<string>();

        // const locFence = puzzle.getFence(loc);

        // const fenceLocs =

        if (puzzle.hasFences) {
          fences.add(puzzle.getFence(leftCell));
          fences.add(puzzle.getFence(loc));
          fences.add(puzzle.getFence(rightCell));
        }

        if (row.size === 1 || col.size == 1 || fences.size == 1) {
          // console.log([...fences]);

          if (!puzzle.removeCandidate(loc, 1)) continue;

          return new Edit(puzzle, loc, 1, this);
        }
      }

    return null;
  }
}
