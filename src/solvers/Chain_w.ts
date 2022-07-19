import { _BaseExplicitChainLength } from "../abstract/_BaseExplicitChainLength";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { _BaseKropkiVector } from "../interfaces/IKropkiSolver";
import { Loc } from "../Loc";

export class Chain_w extends _BaseKropkiVector {
  get vector_chains(): Loc[][] {
    const _base = new Loc(0, 0);
    return [[_base.right(2)], [_base.up(2)], [_base.left(2)], [_base.down(2)]];
  }

  get expected_kropki_string(): string {
    return "w";
  }

  solve2(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    const loc = cellChainLocs[0];

    const other = cellChainLocs[1];

    const interSectionLoc = puzzle.getIntersection(loc, other);

    const intersectionStr = puzzle.getCellString(interSectionLoc);

    const commonHouses = puzzle.getCommonHouses(cellChainLocs);

    if (commonHouses.length == 0) return edits;

    const otherHash = puzzle.getCellSet(other);

    for (const candidate of puzzle.getCellCandidates(loc)) {
      if (otherHash.has(candidate + 1)) continue;

      if (otherHash.has(candidate - 1)) continue;

      if (!puzzle.removeCandidate(loc, candidate)) continue;

      edits.push(new Edit(puzzle, loc, candidate, this));
    }

    const hash = new Set<number>();

    for (const loc of cellChainLocs)
      for (const candidate of puzzle.getCellCandidates(loc))
        hash.add(candidate);

    if (hash.size != 3) return edits;

    const list = [...hash];

    list.sort((a, b) => {
      return a - b;
    });

    if (list[0] + 1 == list[1] && list[1] + 1 == list[2]) {
      // if (puzzle.id != "008.kropki") return edits;

      for (const house of commonHouses)
        for (const loc of house)
          if (
            !loc.equals(cellChainLocs[0]) &&
            !loc.equals(cellChainLocs[1]) &&
            puzzle.removeCandidate(loc, list[1])
          )
            edits.push(new Edit(puzzle, loc, list[1], this));
    }

    return edits;
  }
}
