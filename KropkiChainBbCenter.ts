import { IEdit } from "./IEdit";
import { IKropkiPuzzle } from "./IKropkiPuzzle";
import { Loc } from "./Loc";
import { Edit } from "./Edit";
import { IKropkiSolver } from "./IKropkiSolver";
import { LocSet } from "./LocSet";

export class KropkiChainBbCenter implements IKropkiSolver {
  get id(): string {
    return "KropkiChainBbCenter";
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

        if (str !== "bb") continue;

        const hashSet = new LocSet([leftCell, loc, rightCell]);

        if (hashSet.size != 3) continue;

        const row = new Set<number>([leftCell.row, loc.row, rightCell.row]);
        const col = new Set<number>([leftCell.col, loc.col, rightCell.col]);

        if (puzzle.length != 9) continue;

        if (row.size === 1 || col.size === 1) {
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
              (col.size === 1 && loc.col == neighbor.col)
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
