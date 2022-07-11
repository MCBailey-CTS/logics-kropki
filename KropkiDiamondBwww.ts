import { IKropkiSolver } from "./IKropkiSolver";
import { IEdit } from "./IEdit";
import { IKropkiPuzzle } from "./IKropkiPuzzle";
import { Loc } from "./Loc";
import { Edit } from "./Edit";

export class KropkiDiamondBwww implements IKropkiSolver {
  get id(): string {
    return "KropkiDiamondBwww";
  }

  solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | null {
    const diamondCenters = [
      loc.left().up(), // top left center
      loc.right().up(), // top right center
      loc.left().down(), // down left center
      loc.right().down(), // down right center
    ];

    for (const center of diamondCenters) {
      const diamond = [
        center.left().up(), // top left cell,
        center.up(), // top intersection
        center.right().up(), // top right cell
        center.right(), // right intersection
        center.right().down(), // bottom right cell
        center.down(), // bottom intersection,
        center.left().down(), // bottom left cell
        center.left(), // left intersection
      ];

      if (
        !diamond.every((temp) => {
          return (
            temp.row > 0 &&
            temp.col > 0 &&
            temp.row < puzzle.length * 2 - 1 &&
            temp.col < puzzle.length * 2 - 1
          );
        })
      )
        continue;

      for (let j = 0; j < 4; j++) {
        let str = "";

        for (let i = 0; i < diamond.length; i += 2) {
          str += puzzle.getCellString(diamond[i + 1]);
        }

        if (str != "bwww") {
          const cell = diamond.shift();

          const intersecton = diamond.shift();

          if (typeof cell == "undefined" || typeof intersecton == "undefined")
            continue;

          diamond.push(cell);

          diamond.push(intersecton);

          continue;
        }

        const edit: IEdit | null = this.solveDiamond(puzzle, loc, diamond);

        if (edit === null) continue;

        return edit;
      }
    }

    return null;
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
