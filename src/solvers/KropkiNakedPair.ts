import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { IKropkiSolver } from "../interfaces/IKropkiSolver";
import { Loc } from "../Loc";

export class KropkiNakedPair implements IKropkiSolver {
  get id(): string {
    return "KropkiNakedPair";
  }

  solvePuzzle(puzzle: IKropkiPuzzle): IEdit[] {
    const edits = [];

    for (const loc of puzzle.sudokuCellLocs) {
      const edit = this.solveCell(puzzle, loc);

      if (edit === null) continue;

      edits.push(edit);
    }

    return edits;
  }

  solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | null {
    if (puzzle.length != 9) return null;

    const locSet = puzzle.getCellSet(loc);

    if (locSet.size != 2) return null;

    for (const peer of puzzle.getNeighbors(loc)) {
      if (loc.row == peer.row || loc.col == peer.col) {
        const locString = puzzle.getCellString(loc).substring(0, puzzle.length);

        const peerString = puzzle
          .getCellString(peer)
          .substring(0, puzzle.length);

        if (locString != peerString) continue;

        for (const neighbor of puzzle.getNeighbors(loc)) {
          if (neighbor.equals(peer)) continue;

          if (loc.row == peer.row && loc.row == neighbor.row)
            for (const candidate of puzzle.getCellCandidates(loc))
              if (puzzle.removeCandidate(neighbor, candidate))
                return new Edit(puzzle, neighbor, candidate, this);

          if (loc.col == peer.col && loc.col == neighbor.col)
            for (const candidate of puzzle.getCellCandidates(loc))
              if (puzzle.removeCandidate(neighbor, candidate))
                return new Edit(puzzle, neighbor, candidate, this);
        }
      }
    }

    return null;
  }
}
