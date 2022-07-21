import { Hash } from "../../Hash";
import { IHash } from "../../IHash";
import { _BaseKropkiVector } from "../abstract/_BaseKropkiVector";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";

export class Chain_w extends _BaseKropkiVector {
  get vector_chains(): IHash<Loc>[] {
    const _base = new Loc(0, 0);

    const chains: IHash<Loc>[] = [];

    chains.push(new Hash<Loc>([_base.right(2)]));
    chains.push(new Hash<Loc>([_base.up(2)]));
    chains.push(new Hash<Loc>([_base.left(2)]));
    chains.push(new Hash<Loc>([_base.down(2)]));

    return chains;
  }

  get expected_kropki_string(): string {
    return "w";
  }

  solveChain(puzzle: IKropkiPuzzle, locs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    const loc = locs._at(0);

    const other = locs._at(1);

    const interSectionLoc = puzzle.getIntersection(loc, other);

    const intersectionStr = puzzle.getCellString(interSectionLoc);

    const commonHouses = puzzle.getCommonHouses(locs);

    if (commonHouses.length == 0) return edits;

    const otherHash = puzzle.getCellList(other);

    for (const candidate of puzzle.getCellList(loc)) {
      if (otherHash.has(candidate + 1)) continue;

      if (otherHash.has(candidate - 1)) continue;

      if (!puzzle.removeCandidate(loc, candidate)) continue;

      edits.push(new Edit(puzzle, loc, candidate, this));
    }

    const hash = new Set<number>();

    for (const loc of locs)
      for (const candidate of puzzle.getCellList(loc)) hash.add(candidate);

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
            !loc.equals(locs._at(0)) &&
            !loc.equals(locs._at(1)) &&
            puzzle.removeCandidate(loc, list[1])
          )
            edits.push(new Edit(puzzle, loc, list[1], this));
    }

    return edits;
  }
}
