import { IKropkiSolver } from "./IKropkiSolver";
import { IEdit } from "./IEdit";
import { IKropkiPuzzle } from "./IKropkiPuzzle";
import { Loc } from "./Loc";
import { Edit } from "./Edit";

export class KropkiDiamondEwww implements IKropkiSolver {
  get id(): string {
    return "KropkiDiamondEwww";
  }

  solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | null {
    const diamondCenters = [
      loc.left().up(),
      loc.right().up(),
      loc.left().down(),
      loc.right().down(), // down right center
    ];

    for (const center of diamondCenters) {
      const diamond = [
        center.left().up(),
        center.up(),
        center.right().up(),
        center.right(),
        center.right().down(),
        center.down(),
        center.left().down(),
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

        if (str != ".www") {
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
    const leftCell = diamond[4];

    const intersection = diamond[1];

    const rightCell = diamond[6];

    if (puzzle.getCellString(intersection) != ".") return null;

    if (
      (leftCell.equals(loc) || rightCell.equals(loc)) &&
      puzzle.removeCandidate(loc, 1)
    )
      return new Edit(puzzle, loc, 1, this);

    if (
      (leftCell.equals(loc) || rightCell.equals(loc)) &&
      puzzle.removeCandidate(loc, puzzle.length)
    )
      return new Edit(puzzle, loc, puzzle.length, this);
    return null;
  }
}
