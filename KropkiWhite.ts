import { IKropkiSolver } from "./IKropkiSolver";
import { IEdit } from "./IEdit";
import { IKropkiPuzzle } from "./IKropkiPuzzle";
import { Loc } from "./Loc";
import { Edit } from "./Edit";

export class KropkiWhite implements IKropkiSolver {
  solveExplicit(puzzle: IKropkiPuzzle, loc: Loc, other: Loc): IEdit | null {
    const otherHash = puzzle.getCellSet(other);

    for (const candidate of puzzle.getCellCandidates(loc)) {
      if (otherHash.has(candidate + 1)) continue;

      if (otherHash.has(candidate - 1)) continue;

      if (!puzzle.removeCandidate(loc, candidate)) continue;

      return new Edit(puzzle, loc, candidate, this);
    }

    return null;
  }

  solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | null {
    const surroundingCells = [
      loc.up(),
      loc.up().up(),
      loc.right(),
      loc.right().right(),
      loc.down(),
      loc.down().down(),
      loc.left(),
      loc.left().left(),
    ];

    for (let i = 0; i < surroundingCells.length; i += 2) {
      const surrounding = surroundingCells[i + 1];

      if (surrounding.row < 0 || surrounding.col < 0) continue;

      if (
        surrounding.row >= puzzle.length * 2 - 1 ||
        surrounding.col >= puzzle.length * 2 - 1
      )
        continue;

      const intersection = puzzle.getCellString(surroundingCells[i]);

      if (intersection != "w") continue;

      const edit = this.solveExplicit(puzzle, loc, surrounding);

      if (edit == null) continue;

      return edit;
    }

    return null;
  }

  get id(): string {
    return "KropkiWhite";
  }
}
