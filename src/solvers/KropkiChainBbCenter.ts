import { BaseKropkiSolveCell } from "../abstract/BaseKropkiSolveCell";
import { Consolidate } from "../Consolidate";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { IKropkiSolver } from "../interfaces/IKropkiSolver";
import { Loc } from "../Loc";
import { LocSet } from "../LocSet";

export class KropkiChainBbCenter extends BaseKropkiSolveCell {
  get id(): string {
    return "KropkiChainBbCenter";
  }

  

  solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | null {
    const leftIntersections = Consolidate.surroundingIntersectionCell(loc);

    for (let i = 0; i < leftIntersections.length; i += 2)
      for (let j = 0; j < leftIntersections.length; j += 2) {
        const leftInt = leftIntersections[i];

        const rightInt = leftIntersections[j];

        const leftCell = leftIntersections[i + 1];

        const rightCell = leftIntersections[j + 1];

        if (
          !leftCell.isValidKropkiLoc(puzzle.length) ||
          !rightCell.isValidKropkiLoc(puzzle.length)
        )
          continue;

        let str =
          puzzle.getCellString(leftInt) + puzzle.getCellString(rightInt);

        if (str !== "bb") continue;

        const hashSet = new LocSet([leftCell, loc, rightCell]);

        if (hashSet.size != 3) continue;

        const row = new Set<number>([leftCell.row, loc.row, rightCell.row]);
        const col = new Set<number>([leftCell.col, loc.col, rightCell.col]);

        let fences = new Set<string>();

        if (puzzle.hasFences) {
          fences.add(puzzle.getFence(leftCell));
          fences.add(puzzle.getFence(loc));
          fences.add(puzzle.getFence(rightCell));
        }

        if (puzzle.length != 9) continue;

        if (row.size === 1 || col.size === 1 || fences.size === 1) {
          for (const candidate of [1, 3, 5, 6, 7, 8, 9])
            if (puzzle.removeCandidate(loc, candidate))
              return new Edit(puzzle, loc, candidate, this);

          for (const neighbor of puzzle.getNeighbors(loc)) {
            if (hashSet.has(neighbor)) {
              for (const candidate of [3, 5, 6, 7, 9])
                if (puzzle.removeCandidate(loc, candidate))
                  return new Edit(puzzle, loc, candidate, this);
            } else if (
              (row.size === 1 && loc.row == neighbor.row) ||
              (col.size === 1 && loc.col == neighbor.col)||
              (fences.size === 1 && puzzle.getFence(loc) == puzzle.getFence(neighbor) )
            ) {
              for (const candidate of [2, 4])
                if (puzzle.removeCandidate(neighbor, candidate))
                  return new Edit(puzzle, neighbor, candidate, this);
            }
          }
        }
      }

    return null;
  }
}
