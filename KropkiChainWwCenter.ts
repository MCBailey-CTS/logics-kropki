import { BaseKropkiSolver } from "./BaseKropkiSolver";
import { IEdit } from "./IEdit";
import { IKropkiPuzzle } from "./IKropkiPuzzle";
import { Loc } from "./Loc";
import { Edit } from "./Edit";

export class KropkiChainWwCenter extends BaseKropkiSolver {
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

        // if (str !== "ww")
        //     continue;

        // const leftSet = puzzle.getCellSet(leftCell);

        // const rightSet = puzzle.getCellSet(rightCell);

        // const row = new Set<number>([leftCell.row, loc.row, rightCell.row]);

        // const col = new Set<number>([leftCell.col, loc.col, rightCell.col]);

        // if (row.size == 3 || col.size == 3)
        //     for (const candidate of puzzle.getCellCandidates(loc)) {
        //         if (!leftSet.has(candidate - 1) &&
        //             !rightSet.has(candidate - 1) &&
        //             puzzle.removeCandidate(loc, candidate))
        //             return new Edit(puzzle, loc, candidate, this);

        //         if (!leftSet.has(candidate + 1) &&
        //             !rightSet.has(candidate + 1) &&
        //             puzzle.removeCandidate(loc, candidate))
        //             return new Edit(puzzle, loc, candidate, this);
        //     }

        if (str !== "ww") continue;

        const leftSet = puzzle.getCellSet(leftCell);

        const rightSet = puzzle.getCellSet(rightCell);

        const row = new Set<number>([leftCell.row, loc.row, rightCell.row]);

        const col = new Set<number>([leftCell.col, loc.col, rightCell.col]);

        let fences: Set<string> = new Set<string>();

        if (puzzle.hasFences) {
          fences.add(puzzle.getFence(leftCell));
          fences.add(puzzle.getFence(loc));
          fences.add(puzzle.getFence(rightCell));
        }

        // if (fences.size === 1) {
        //   console.log("fences");

        //   continue;
        // }

        if (
          row.size === 3 ||
          col.size == 3
          //  || fences.size == 1
        ) {
          for (const candidate of puzzle.getCellCandidates(loc)) {
            // console.log(candidate);

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
          }
        }
      }

    return null;
  }
}
