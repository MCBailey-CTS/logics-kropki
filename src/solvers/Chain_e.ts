import { _BaseExplicitChainLength } from "../abstract/_BaseExplicitChainLength";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";


export class Chain_e extends _BaseExplicitChainLength {
  get chainLength(): number {
    return 2;
  }

  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    const loc = cellChainLocs[0];

    const other = cellChainLocs[1];

    const interSectionLoc = puzzle.getIntersection(loc, other);

    const intersectionStr = puzzle.getCellString(interSectionLoc);

    if (intersectionStr != ".") return edits;

    for (const candidate of puzzle.getCellCandidates(loc)) {
      const kropkiCandidates = [
        ...puzzle.getKropkiCandidates(candidate),
        candidate,
      ];

      const otherHash = puzzle.getCellSet(other);

      for (const t of kropkiCandidates) otherHash.delete(t);

      if (otherHash.size > 0) continue;

      if (!puzzle.removeCandidate(loc, candidate)) continue;

      edits.push(new Edit(puzzle, loc, candidate, this));
    }

    return edits;
  }
}
