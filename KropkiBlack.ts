import { IEdit, IKropkiPuzzle, IKropkiSolver } from "./IKropkiSolver";
import { Loc } from "./Loc";
import { BaseKropkiSolver } from "./BaseKropkiSolver";
import { Edit } from "./Edit";

export abstract class BaseKropkiEmptyDominateNextTo extends BaseKropkiSolver {
  solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | null {
    // console.log(`Loc: ${loc.toString()}`);

    const topIntersectionLoc = loc.up();
    const rightIntersectionLoc = loc.right();
    const downIntersectionLoc = loc.down();
    const leftIntersectionLoc = loc.left();

    const surroundingCells = [
      loc.up().up(),
      loc.right().right(),
      loc.down().down(),
      loc.left().left(),
    ];

    // console.log("//////");
    // console.log(surroundingCells);

    for (const surrounding of surroundingCells) {

      if (surrounding.row < 0 || surrounding.col < 0) continue;

      if (
        surrounding.row >= puzzle.length * 2 - 1 ||
        surrounding.col >= puzzle.length * 2 - 1
      )
        continue;

      const edit = this.solveExplicit(puzzle, loc, surrounding);

      if (edit == null) continue;

      return edit;
    }

    return null;
  }

  abstract solveExplicit(
    puzzle: IKropkiPuzzle,
    loc: Loc,
    other: Loc
  ): IEdit | null;
}

export class KropkiBlack extends BaseKropkiEmptyDominateNextTo {
  solveExplicit(puzzle: IKropkiPuzzle, loc: Loc, other: Loc): IEdit | null {
    const leftHash = puzzle.getCellSet(other);

    const originalLength = puzzle.getCellSet(loc).size;

    for (const candidate of puzzle.getCellCandidates(loc)) {
      if (leftHash.has(candidate * 2)) continue;

      if (candidate % 2 == 0 && leftHash.has(candidate / 2)) continue;

      if (!puzzle.removeCandidate(loc, candidate)) continue;

      return new Edit(puzzle, loc, candidate, this);
    }

    return null;
  }

  //   solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | undefined {
  //     if (loc.left().left().col >= 0 && puzzle.getCellString(loc.left()) == "b") {
  //       const edit: IEdit | undefined = KropkiBlack.solve(
  //         puzzle,
  //         loc,
  //         loc.left().left(),
  //         this
  //       );

  //       if (typeof edit != "undefined") return edit;
  //     }

  //     if (loc.up().up().row >= 0 && puzzle.getCellString(loc.up()) == "b") {
  //       const edit: IEdit | undefined = KropkiBlack.solve(
  //         puzzle,
  //         loc,
  //         loc.up().up(),
  //         this
  //       );

  //       if (typeof edit != "undefined") return edit;
  //     }

  //     if (
  //       loc.right().right().col < puzzle.length * 2 - 1 &&
  //       puzzle.getCellString(loc.right()) == "b"
  //     ) {
  //       const edit: IEdit | undefined = KropkiBlack.solve(
  //         puzzle,
  //         loc,
  //         loc.right().right(),
  //         this
  //       );

  //       if (typeof edit != "undefined") return edit;
  //     }

  //     if (
  //       loc.down().down().row < puzzle.length * 2 - 1 &&
  //       puzzle.getCellString(loc.down()) == "b"
  //     ) {
  //       const edit: IEdit | undefined = KropkiBlack.solve(
  //         puzzle,
  //         loc,
  //         loc.down().down(),
  //         this
  //       );

  //       if (typeof edit != "undefined") return edit;
  //     }

  //     return undefined;
  //   }

  static solve(
    puzzle: IKropkiPuzzle,
    loc: Loc,
    other: Loc
  ): number | undefined {
    const hash = puzzle.getCellSet(other);

    for (const candidate of puzzle.getCellCandidates(loc)) {
      if (hash.has(candidate * 2)) continue;

      if (candidate % 2 == 0 && hash.has(candidate / 2)) continue;

      if (!puzzle.removeCandidate(loc, candidate)) return undefined;

      return candidate;
    }

    return undefined;
  }

  get id(): string {
    return "KropkiBlack";
  }
}

// export class KropkiWhite extends BaseKropkiSolver {

//   solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | undefined {
//     if (loc.left().left().col >= 0 && puzzle.getCellString(loc.left()) == "b") {
//       const edit: IEdit | undefined = KropkiBlack.solve(
//         puzzle,
//         loc,
//         loc.left().left(),
//         this
//       );

//       if (typeof edit != "undefined") return edit;
//     }

//     if (loc.up().up().row >= 0 && puzzle.getCellString(loc.up()) == "b") {
//       const edit: IEdit | undefined = KropkiWhite.solve(
//         puzzle,
//         loc,
//         loc.up().up(),
//         this
//       );

//       if (typeof edit != "undefined") return edit;
//     }

//     if (
//       loc.right().right().col < puzzle.length * 2 - 1 &&
//       puzzle.getCellString(loc.right()) == "b"
//     ) {
//       const edit: IEdit | undefined = KropkiWhite.solve(
//         puzzle,
//         loc,
//         loc.right().right(),
//         this
//       );

//       if (typeof edit != "undefined") return edit;
//     }

//     if (
//       loc.down().down().row < puzzle.length * 2 - 1 &&
//       puzzle.getCellString(loc.down()) == "b"
//     ) {
//       const edit: IEdit | undefined = KropkiWhite.solve(
//         puzzle,
//         loc,
//         loc.down().down(),
//         this
//       );

//       if (typeof edit != "undefined") return edit;
//     }

//     return undefined;
//   }

//   static solve(
//     puzzle: IKropkiPuzzle,
//     loc: Loc,
//     leftCell: Loc,
//     other: IKropkiSolver
//   ): IEdit | undefined {
//     const leftHash = puzzle.getCellSet(leftCell);

//     const originalLength = puzzle.getCellSet(loc).size;

//     for (const candidate of puzzle.getCellCandidates(loc)) {
//       if (leftHash.has(candidate + 1)) continue;

//       if (leftHash.has(candidate - 1)) continue;

//       if (!puzzle.removeCandidate(loc, candidate)) continue;

//       return new Edit(puzzle, loc, candidate, other);
//     }

//     return undefined;
//   }

//   get id(): string {
//     return "KropkiBlack";
//   }
// }
