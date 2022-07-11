import { BaseKropkiSolver } from "./BaseKropkiSolver";
import { IKropkiSolver } from "./IKropkiSolver";
import { IEdit } from "./IEdit";
import { IKropkiPuzzle } from "./IKropkiPuzzle";
import { KropkiBlack } from "./KropkiBlack";
import { KropkiEmptyDominate } from "./KropkiEmptyDominate";
import { KropkiDiamondBwww } from "./KropkiDiamondBwww";
import { KropkiDiamondEwww } from "./KropkiDiamondEwww";
import { KropkiWhite } from "./KropkiWhite";
import { KropkiString } from "./KropkiString";
import { Loc } from "./Loc";
import { MainFunction } from "./NewMain";
import { NewPuzzles } from "./NewPuzzles";
import { LocSet } from "./LocSet";
import { Edit } from "./Edit";

export class KropkiChainBw extends BaseKropkiSolver {
  get id(): string {
    throw new Error("Method not implemented.");
  }
  //   solveCell(puzzle: IKropkiPuzzle, startingCell: Loc): IEdit | null {
  //     const surroundingIntersections = [
  //       startingCell.up(),
  //       startingCell.down(),
  //       startingCell.left(),
  //       startingCell.right(),
  //     ];

  //     for (const intersection of surroundingIntersections) {
  //       if (puzzle.getCellString(intersection) != "b") continue;

  //       const surroundingCells = [
  //         intersection.up(),
  //         intersection.down(),
  //         intersection.left(),
  //         intersection.right(),
  //       ];

  //       for (const middleCell of surroundingCells) {
  //         const nextIntersections = [
  //           middleCell.up(),
  //           middleCell.down(),
  //           middleCell.left(),
  //           middleCell.right(),
  //         ];

  //         for (const nextIntersection of nextIntersections) {
  //           if (puzzle.getCellString(nextIntersection) != "w") continue;

  //           const endingCells = [
  //             nextIntersection.up(),
  //             nextIntersection.down(),
  //             nextIntersection.left(),
  //             nextIntersection.right(),
  //           ];

  //           for (const endingCell of endingCells) {
  //             const cellLocs = [
  //               ...new LocSet([startingCell, middleCell, endingCell]).values,
  //             ];

  //             if (cellLocs.length != 3) continue;

  //             if (
  //               cellLocs.every((cellLoc) => {
  //                 return cellLocs[0].row == cellLoc.row;
  //               }) ||
  //               cellLocs.every((cellLoc) => {
  //                 return cellLocs[0].col == cellLoc.col;
  //               })
  //             ) {
  //               if (!puzzle.removeCandidate(middleCell, 1)) continue;

  //               return new Edit(puzzle, loc);
  //             }
  //           }
  //         }
  //       }
  //     }

  //     return null;
  //   }

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
    // .filter((inter) => {
    //   return inter.isValidKropkiLoc(puzzle.length);
    // });

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
    // .filter((inter) => {
    //   return inter.isValidKropkiLoc(puzzle.length);
    // });

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

        if (row.size === 3 || col.size == 3) {
          if (!puzzle.removeCandidate(loc, 1)) continue;

          return new Edit(puzzle, loc, 1, this);
        }
      }

    return null;
  }
}

const solvers: IKropkiSolver[] = [new KropkiChainBw()];

const puzzleStrings = [
  NewPuzzles._Kropki_018,
  NewPuzzles._Kropki_004,
  NewPuzzles._Kropki_003,
  NewPuzzles._Kropki_002,
  NewPuzzles._Kropki_001,
  //   NewPuzzles._Kropki_006,
  NewPuzzles._Kropki_010,
];

for (const str of puzzleStrings) {
  console.log("///////////////");
  const puzzle = new KropkiString(str);

  puzzle.solve(solvers);

  console.log(puzzle.toString());
}
