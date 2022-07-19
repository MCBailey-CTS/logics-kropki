import { _BaseExplicitChainLength } from "../abstract/_BaseExplicitChainLength";
import { _BaseKropkiVector } from "../abstract/_BaseKropkiVector";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";

// const base = new Loc(0, 0);

//     return [[base.up(2), base.right(2), base.down(2), base.left(2)]];

export class Chain_b extends _BaseKropkiVector {
  get vector_chains(): Loc[][] {
    const _base = new Loc(0, 0);
    return [[_base.right(2)], [_base.up(2)], [_base.left(2)], [_base.down(2)]];
  }

  get expected_kropki_string(): string {
    return "b";
  }

  solve2(puzzle: IKropkiPuzzle, locs: Loc[]): IEdit[] {
    
    const edits: IEdit[] = [];

    const loc = locs[0];

    const other = locs[1];

    const otherHash = puzzle.getCellSet(other);

    for (const candidate of puzzle.getCellCandidates(loc)) {
      if (otherHash.has(candidate * 2)) continue;

      if (candidate % 2 == 0 && otherHash.has(candidate / 2)) continue;

      if (!puzzle.removeCandidate(loc, candidate)) continue;

      edits.push(new Edit(puzzle, loc, candidate, this));
    }

    const hash = new Set<number>();

    for (const loc of locs)
      for (const candidate of puzzle.getCellCandidates(loc))
        hash.add(candidate);

    if (hash.size != 3) return edits;

    const list = [...hash];

    list.sort((a, b) => {
      return a - b;
    });

    if (!(list[0] * 2 == list[1] && list[1] * 2 == list[2])) return edits;

    const commonHouses = puzzle.getCommonHouses(locs);

    if (commonHouses.length == 0) return edits;

    for (const house of commonHouses)
      for (const loc of house)
        if (
          !loc.equals(locs[0]) &&
          !loc.equals(locs[1]) &&
          puzzle.removeCandidate(loc, list[1])
        )
          edits.push(new Edit(puzzle, loc, list[1], this));

    return edits;
  }
}
