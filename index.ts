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
import { KropkiChainBwCenter } from "./KropkiChainBwCenter";

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

export class KropkiChainWwRange extends BaseKropkiSolver {
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

export class KropkiChainBbCenter extends BaseKropkiSolver {
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

export class KropkiChainBbRange extends BaseKropkiSolver {
  get id(): string {
    return "KropkiChainBbRange";
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

const solvers: IKropkiSolver[] = [new KropkiChainBwCenter()];

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
