import { IKropkiSolver } from "./IKropkiSolver";
import { IEdit } from "./IEdit";
import { Loc } from "./Loc";
import { Edit } from "./Edit";
import { IKropkiPuzzle } from "./IKropkiPuzzle";

export class KropkiBlack2Cells implements IKropkiSolver {
  solveExplicit(puzzle: IKropkiPuzzle, loc: Loc, other: Loc): IEdit | null {
    if (puzzle.id != "004.kropki") return null;

    const candidatesHash = new Set<number>([
      ...puzzle.getCellCandidates(loc),
      ...puzzle.getCellCandidates(other),
    ]);

    if (candidatesHash.size != 3) return null;

    const candidates: number[] = [...candidatesHash];

    candidates.sort((a, b) => {
      return a - b;
    });

    if (candidates.length != 3) return null;

    if (
      !(
        candidates[0] * 2 == candidates[1] && candidates[1] * 2 == candidates[2]
      )
    )
      return null;

    if (loc.row == other.row || loc.col == other.col)
      for (const neighbor of puzzle.getNeighbors(loc)) {
        if (neighbor.equals(other)) continue;

        if (
          (loc.row == other.row &&
            loc.row == neighbor.row &&
            puzzle.removeCandidate(neighbor, candidates[1])) ||
          (loc.col == other.col &&
            loc.col == neighbor.col &&
            puzzle.removeCandidate(neighbor, candidates[1]))
        )
          return new Edit(puzzle, neighbor, candidates[1], this);
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

      if (intersection != "b") continue;

      const edit = this.solveExplicit(puzzle, loc, surrounding);

      if (edit == null) continue;

      return edit;
    }

    return null;
  }

  get id(): string {
    return "KropkiBlack2Cells";
  }
}
