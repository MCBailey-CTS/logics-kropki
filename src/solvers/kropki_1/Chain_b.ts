import { Hash } from "../../../Hash";
import { IHash } from "../../../IHash";
import { _BaseKropkiVector } from "../../abstract/_BaseKropkiVector";
import { _BaseKropkiVectorString1 } from "./_BaseKropkiVectorString1";
import { Edit } from "../../Edit";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { Loc } from "../../Loc";

// const base = new Loc(0, 0);

//     return [[base.up(2), base.right(2), base.down(2), base.left(2)]];

export class Chain_b extends _BaseKropkiVectorString1 {
  get expected_kropki_string(): string {
    return "b";
  }

  solveChain(puzzle: IKropkiPuzzle, locs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    const loc = locs._at(0);

    const other = locs._at(1);

    const otherHash = puzzle.getCellList(other);

    for (const candidate of puzzle.getCellList(loc)) {
      if (otherHash.has(candidate * 2)) continue;

      if (candidate % 2 == 0 && otherHash.has(candidate / 2)) continue;

      if (!puzzle.removeCandidate(loc, candidate)) continue;

      edits.push(new Edit(puzzle, loc, candidate, this));
    }

    const commonHouses = puzzle.getCommonHouses(locs);

    if (commonHouses.length == 0) return edits;

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

export class Chain_e extends _BaseKropkiVectorString1 {
  get expected_kropki_string(): string {
    return ".";
  }

  solveChain(puzzle: IKropkiPuzzle, locs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    for (const candidate of puzzle.getCellList(locs._at(0))) {
      const kropkiCandidates = [
        ...puzzle.getKropkiCandidates(candidate),
        candidate,
      ];

      const otherHash = puzzle.getCellList(locs._at(1));

      for (const t of kropkiCandidates) otherHash.delete(t);

      if (otherHash._size > 0) continue;

      if (!puzzle.removeCandidate(locs._at(0), candidate)) continue;

      edits.push(new Edit(puzzle, locs._at(0), candidate, this));
    }

    return edits;
  }
}

export class Chain_w extends _BaseKropkiVectorString1 {
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