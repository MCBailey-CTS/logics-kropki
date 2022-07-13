import { IKropkiSolver } from "./IKropkiSolver";
import { IEdit } from "./IEdit";
import { IKropkiPuzzle } from "./IKropkiPuzzle";
import { Loc } from "./Loc";

export abstract class BaseKropkiDiamond implements IKropkiSolver {
  abstract get id(): string;

  abstract get intersectionString(): string;

  abstract solveDiamond(
    puzzle: IKropkiPuzzle,
    loc: Loc,
    diamond: Loc[]
  ): IEdit | null;

  abstract solvePuzzle(puzzle: IKropkiPuzzle): IEdit[];

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
          return temp.isValidKropkiLoc(puzzle.length);
        })
      )
        continue;

      for (let j = 0; j < 4; j++) {
        let str = "";

        for (let i = 0; i < diamond.length; i += 2) {
          str += puzzle.getCellString(diamond[i + 1]);
        }

        // if (str != ".www") {
        if (str != this.intersectionString) {
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
}
