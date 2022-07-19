import { _BaseExplicitChainLength } from "../abstract/_BaseExplicitChainLength";
import { _BaseKropkiVector } from "../abstract/_BaseKropkiVector";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";

export class Chain_e extends _BaseKropkiVector {
  get vector_chains(): Loc[][] {
    const _base = new Loc(0, 0);
    return [[_base.right(2)], [_base.up(2)], [_base.left(2)], [_base.down(2)]];
  }

  get expected_kropki_string(): string {
    return ".";
  }

  solve2(puzzle: IKropkiPuzzle, locs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    for (const candidate of puzzle.getCellCandidates(locs[0])) {
      const kropkiCandidates = [
        ...puzzle.getKropkiCandidates(candidate),
        candidate,
      ];

      const otherHash = puzzle.getCellSet(locs[1]);

      for (const t of kropkiCandidates) otherHash.delete(t);

      if (otherHash.size > 0) continue;

      if (!puzzle.removeCandidate(locs[0], candidate)) continue;

      edits.push(new Edit(puzzle, locs[0], candidate, this));
    }

    return edits;
  }
}
