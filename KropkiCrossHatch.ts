import { IEdit } from "./IEdit";
import { IKropkiPuzzle } from "./IKropkiPuzzle";
import { Loc } from "./Loc";
import { Edit } from "./Edit";
import { IKropkiSolver } from "./IKropkiSolver";

export class KropkiCrossHatch implements IKropkiSolver {
  get id(): string {
    return "KropkiCrossHatch";
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
    for (const peer of puzzle.getNeighbors(loc)) {
      //   console.log(`Peer: ${peer.toString()}`);

      const peerSet = puzzle.getCellSet(peer);

      if (peerSet.size != 1) continue;

      const candidate = [...peerSet][0];

      if (!puzzle.removeCandidate(loc, candidate)) continue;

      return new Edit(puzzle, loc, candidate, this);
    }

    return null;
  }
}
