import { BaseKropkiSolveCell } from "../abstract/BaseKropkiSolveCell";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { IKropkiSolver } from "../interfaces/IKropkiSolver";
import { Loc } from "../Loc";
import { LocSet } from "../LocSet";

export class KropkiChainWwCenter extends BaseKropkiSolveCell {
  get id(): string {
    return "KropkiChainWwCenter";
  }

  

  solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | null {
    const leftIntersections = [
      loc.up(),
      loc.up().up(),
      loc.down(),
      loc.down().down(),
      loc.left(),
      loc.left().left(),
      loc.right(),
      loc.right().right(),
    ];

    const rightIntersections = [
      loc.up(),
      loc.up().up(),
      loc.down(),
      loc.down().down(),
      loc.left(),
      loc.left().left(),
      loc.right(),
      loc.right().right(),
    ];

    for (let i = 0; i < leftIntersections.length; i += 2)
      for (let j = 0; j < rightIntersections.length; j += 2) {
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

        if (str !== "ww") continue;

        const leftSet = puzzle.getCellSet(leftCell);

        const rightSet = puzzle.getCellSet(rightCell);

        // if (leftCell.equals(rightCell)) continue;

        const locSet = puzzle.getCellSet(loc);

        if (new LocSet([leftCell, loc, rightCell]).size != 3) continue;

        const row = new Set<number>([leftCell.row, loc.row, rightCell.row]);

        const col = new Set<number>([leftCell.col, loc.col, rightCell.col]);

        let fences: Set<string> = new Set<string>();

        if (puzzle.hasFences) {
          fences.add(puzzle.getFence(leftCell));
          fences.add(puzzle.getFence(loc));
          fences.add(puzzle.getFence(rightCell));
        }

        if (row.size === 1 || col.size == 1 || fences.size == 1) {
          for (const c0 of puzzle.getCellCandidates(leftCell)) {
            if (
              !rightSet.has(c0 - 2) &&
              !rightSet.has(c0 + 2) &&
              puzzle.removeCandidate(leftCell, c0)
            )
              return new Edit(puzzle, leftCell, c0, this);
          }

          for (const c0 of puzzle.getCellCandidates(rightCell)) {
            if (
              !leftSet.has(c0 - 2) &&
              !leftSet.has(c0 + 2) &&
              puzzle.removeCandidate(rightCell, c0)
            )
              return new Edit(puzzle, rightCell, c0, this);
          }

          for (const candidate of puzzle.getCellCandidates(loc)) {
            if (
              !leftSet.has(candidate - 1) &&
              !rightSet.has(candidate - 1) &&
              puzzle.removeCandidate(loc, candidate)
            )
              return new Edit(puzzle, loc, candidate, this);

            if (
              !leftSet.has(candidate + 1) &&
              !rightSet.has(candidate + 1) &&
              puzzle.removeCandidate(loc, candidate)
            )
              return new Edit(puzzle, loc, candidate, this);

            if (
              leftSet.has(candidate - 1) &&
              !leftSet.has(candidate + 1) &&
              rightSet.has(candidate + 1) &&
              rightSet.has(candidate - 1) &&
              !locSet.has(candidate - 2) &&
              puzzle.removeCandidate(rightCell, candidate - 1)
            )
              return new Edit(puzzle, rightCell, candidate - 1, this);

            if (
              !leftSet.has(candidate - 1) &&
              leftSet.has(candidate + 1) &&
              rightSet.has(candidate + 1) &&
              rightSet.has(candidate - 1) &&
              !locSet.has(candidate + 2) &&
              puzzle.removeCandidate(rightCell, candidate + 1)
            )
              return new Edit(puzzle, rightCell, candidate + 1, this);
          }
        }
      }

    return null;
  }
}
